document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const rawCat = params.get('cat') || 'Products';
    const category = decodeURIComponent(rawCat).replace(/\+/g, ' ').trim();

    const titleEl = document.getElementById('category-title');
    const subEl = document.getElementById('category-sub');

    if (titleEl) titleEl.textContent = category;
    if (subEl) subEl.textContent = `Images of "${category}" — sourced from our catalog`;

    // IMPORTANT: get DOM elements (were missing)
    const grid = document.getElementById('remote-grid');
    const loadMoreBtn = document.getElementById('load-more');

    if (!grid) {
        console.error('category.js: #remote-grid not found in DOM');
        return;
    }

    // normalize category to file-prefix: e.g. "Smart Phones" -> "smartphones"
    const prefix = category.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9\-]/g, '');

    // configuration
    const exts = ['jpg','jpeg','png','webp'];
    const batchSize = 12;
    const maxIndex = 200;
    const maxConsecutiveMisses = 2;

    let nextIndex = 1;
    let loading = false;

    function makeImageItem(src, alt) {
        const a = document.createElement('a');
        a.href = src;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'product-img-container';
        a.style.borderRadius = '10px';
        a.style.overflow = 'hidden';
        a.style.display = 'block';
        a.style.height = '0';
        a.style.paddingBottom = '66%';
        a.style.position = 'relative';
        a.style.background = '#eee';

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.position = 'absolute';
        img.style.left = '0';
        img.style.top = '0';

        a.appendChild(img);
        return a;
    }

    async function urlExists(url) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            return res.ok;
        } catch (e) {
            // HEAD may be blocked on some servers; try GET as fallback
            try {
                const res2 = await fetch(url, { method: 'GET' });
                return res2.ok;
            } catch (e2) {
                return false;
            }
        }
    }

    async function findNextImages(count) {
        const found = [];
        let consecutiveMisses = 0;

        while (found.length < count && nextIndex <= maxIndex && consecutiveMisses < maxConsecutiveMisses) {
            let foundThisIndex = false;
            for (const ext of exts) {
                const candidate = `../assets/images/${prefix}-${nextIndex}.${ext}`;
                if (await urlExists(candidate)) {
                    found.push(candidate);
                    foundThisIndex = true;
                    break;
                }
            }

            if (foundThisIndex) {
                consecutiveMisses = 0;
            } else {
                consecutiveMisses += 1;
            }
            nextIndex += 1;
        }
        if(found.length === 0){
            const btn = document.getElementById("load-more");
            btn.style.display = "none";
        }
        return found;
    }

    async function loadImages() {
        if (loading) return;
        loading = true;
        if (loadMoreBtn) loadMoreBtn.disabled = true;

        try {
            const imgs = await findNextImages(batchSize);

            if (imgs.length === 0 && grid.children.length === 0) {
                const p = document.createElement('p');
                p.textContent = `No images found for "${category}".`;
                p.style.textAlign = 'center';
                p.style.color = '#666';
                grid.appendChild(p);
            } else {
                const frag = document.createDocumentFragment();
                imgs.forEach((src, i) => {
                    frag.appendChild(makeImageItem(src, `${category} ${nextIndex - imgs.length + i}`));
                });
                grid.appendChild(frag);
            }
        } catch (err) {
            console.error('Error loading images', err);
        } finally {
            if (loadMoreBtn) loadMoreBtn.disabled = false;
            loading = false;
        }
    }

    // initial load
    loadImages();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadImages);
    }

    //For click on load more button
    document.querySelectorAll('[data-href]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const href = el.dataset.href; //To get the data from the element and store its value
            if (!href) return;
            // if you want to open in same tab:
            window.location.href = href;
            // or to replace history entry:
            // window.location.replace(href);
            // or open in new tab:
            // window.open(href, '_blank');
        });
    });
});