document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- 2. Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-links a');
    
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('is-open');
        document.body.classList.toggle('no-scroll');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- 3. Reveal on Scroll (Staggered) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.reveal');
                if(children.length > 0) {
                    children.forEach((child, index) => {
                        setTimeout(() => child.classList.add('active'), index * 150);
                    });
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(elem => revealObserver.observe(elem));

    // --- 4. Impact Number Counter ---
    const counter = document.querySelector('.impact-figure');
    if (counter) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            const [entry] = entries;
            if (!entry.isIntersecting) return;

            const target = +counter.getAttribute('data-target-number');
            const duration = 2000;
            
            let current = 0;
            const step = () => {
                const increment = Math.ceil(target / (duration / 20)); // Animate in ~20 steps
                current += increment;
                if (current >= target) {
                    counter.innerText = '$' + target.toLocaleString();
                } else {
                    counter.innerText = '$' + current.toLocaleString();
                    requestAnimationFrame(step); // Use requestAnimationFrame for smoother animation
                }
            };
            requestAnimationFrame(step);
            observer.unobserve(counter);
        }, { threshold: 0.5 });
        counterObserver.observe(counter);
    }

    // --- 5. News Modal ---
    const modal = document.getElementById('news-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', () => {
            modal.classList.add('is-open');
            document.body.classList.add('no-scroll');
        });
    });

    const closeModal = () => {
        modal.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    }
    if(modal) {
        modalCloseBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    // --- 6. Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('is-visible', window.scrollY > 500);
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 7. Hero Parallax Effect ---
    const heroBackground = document.querySelector('.hero-background');
    if(heroBackground) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            // The 0.3 factor determines how fast the parallax effect is. Lower is slower.
            heroBackground.style.transform = `translateY(${scrollValue * 0.3}px)`;
        });
    }
});