const hamburger = document.querySelector('.hamburger'); //Return first element of class hamburger from DOM
const navbar = document.querySelector('#navbar'); //Return element with id navbar from DOM

// Adding the event listener to the hamburger icon
hamburger.addEventListener('click', () => {
    //Toggle the active class on hamburger menu and navbar
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
});

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