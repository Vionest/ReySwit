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

    if (nextBtn && prevBtn && track) {
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
    }

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
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
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
    }

    // Handle window resize for carousel
    window.addEventListener('resize', () => {
        currentIndex = 0;
        if (track) updateCarousel();
    });

    // Modal Logic
    const modal = document.getElementById('modal-citas');
    const botonesCita = document.querySelectorAll('.btn-agendar');
    const botonCerrar = document.querySelector('.modal-cerrar');
    const bookingForm = document.getElementById('appointmentForm');

    if (!modal) {
        console.error("Error: No se encontró el contenedor con el id 'modal-citas'");
    } else {
        // Escuchar el clic en cada botón de Agendar Cita
        botonesCita.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault(); // Detiene el comportamiento por defecto y el javascript:void
                modal.style.display = 'flex'; // Muestra el formulario emergente
            });
        });

        // Escuchar el clic en la X para cerrar
        if (botonCerrar) {
            botonCerrar.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Cerrar al hacer clic en el fondo oscuro fuera del formulario
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic animation/feedback
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Mock submission delay
            setTimeout(() => {
                alert("¡Gracias! Tu solicitud ha sido enviada. Un asesor de Rey Suit's se contactará contigo pronto.");
                bookingForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }, 1500);
        });
    }
});
