document.addEventListener('DOMContentLoaded', () => {
    /* -----------------------------------------------------
       1. SMOOTH SCROLLING 
    ----------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -----------------------------------------------------
       2. MOBILE BURGER MENU
    ----------------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });

        // Fermer le menu si on clique sur un lien (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        });
    }

    /* -----------------------------------------------------
       3. ANIMATIONS AU DEFILEMENT (Intersection Observer)
    ----------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Déclenchement à 15% de visibilité de l'élément
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optionnel : ne jouer l'animation qu'une seule fois
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Cibler tous les éléments avec la classe .animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });

    /* -----------------------------------------------------
       4. EFFET NAVBAR AU SCROLL (Changera l'apparence au défilement)
    ----------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
