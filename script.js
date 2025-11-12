document.addEventListener('DOMContentLoaded', () => {
    // --- Loading Screen ---
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => loadingScreen.remove(), 500);
        }, 1000);
    }

    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        header.classList.toggle('scrolled', currentScroll > 50);

        // Optional: Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // --- 2. Mobile Navigation with Hamburger Animation ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-links a');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll');
            hamburger.classList.toggle('is-active');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
                hamburger.classList.remove('is-active');
            });
        });
    }

    // --- 3. Enhanced Reveal on Scroll (Staggered) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(elem => revealObserver.observe(elem));

    // --- 4. Enhanced Impact Number Counter ---
    const counter = document.querySelector('.impact-figure');
    if (counter) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            const [entry] = entries;
            if (!entry.isIntersecting) return;

            const target = +counter.getAttribute('data-target-number');
            const duration = 2500;
            const startTime = Date.now();

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

            const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = Math.floor(easedProgress * target);

                counter.innerText = '$' + current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = '$' + target.toLocaleString();
                }
            };

            requestAnimationFrame(updateCounter);
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

    // --- 7. Enhanced Hero Parallax Effect ---
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollValue = window.scrollY;
                    heroBackground.style.transform = `translateY(${scrollValue * 0.5}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // --- 8. Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 9. Card Tilt Effect (Subtle 3D) ---
    const cards = document.querySelectorAll('.ride-card, .news-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // --- 10. Lazy Loading for Images ---
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // --- 11. Add Magnetic Effect to Buttons (excluding ride card buttons) ---
    const buttons = document.querySelectorAll('.btn:not(.ride-card .btn)');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-4px) scale(1.02)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // --- 12. Add Progress Bar on Scroll ---
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-yellow), var(--primary-red));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // --- 13. Contact Form Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, var(--accent-yellow), #ffed4e);
                color: var(--dark-bg);
                padding: 30px 50px;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 10000;
                font-size: 1.2rem;
                font-weight: 700;
                text-align: center;
                animation: fadeInUp 0.5s ease;
            `;
            successMessage.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-red); margin-bottom: 15px; display: block;"></i>
                Thank you for your message!<br>
                <span style="font-size: 0.9rem; font-weight: 400;">We'll get back to you soon.</span>
            `;

            document.body.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);

            // Log form data (in production, you'd send this to a server)
            console.log('Form submitted:', formData);
        });
    }
});