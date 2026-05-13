document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    
    let currentIndex = 0;
    
    function getVisibleCards() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function updateCarousel() {
        const cardWidth = document.querySelector('.product-card').offsetWidth;
        const gap = 30; // matches CSS gap
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const totalCards = document.querySelectorAll('.product-card').length;
        const visibleCards = getVisibleCards();
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            updateCarousel();
        } else {
            currentIndex = 0; // Loop back
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            const totalCards = document.querySelectorAll('.product-card').length;
            const visibleCards = getVisibleCards();
            currentIndex = totalCards - visibleCards; // Go to end
            updateCarousel();
        }
    });

    // Sticky Header Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(4, 57, 39, 0.95)';
        } else {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(4, 57, 39, 0.85)';
        }
    });

    // Mobile Menu Toggle (Simplified)
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-menu');
    
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Add CSS for .nav-menu.active if needed or just use this for basic interaction
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(4, 57, 39, 0.95)';
            nav.style.padding = '20px';
        }
    });

    // Handle window resize for carousel
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });

    // Modal Logic
    const modal = document.getElementById('bookingModal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('appointmentForm');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic animation/feedback
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        // Mock submission delay
        setTimeout(() => {
            alert('¡Gracias! Tu solicitud ha sido enviada. Un asesor de Rey Swit se contactará contigo pronto.');
            bookingForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            closeModal();
        }, 1500);
    });
});
