const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('aperto');
});

document.querySelectorAll('.nav-links .link a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.remove('aperto');

        const target = link.getAttribute('href');
        if (target === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        }
    });
});