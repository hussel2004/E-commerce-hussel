document.addEventListener('DOMContentLoaded', () => {
    // simple navigation for elements that use data-href
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