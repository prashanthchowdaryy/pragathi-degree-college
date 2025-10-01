document.addEventListener('DOMContentLoaded', () => {
    // --- RESPONSIVE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // --- MOBILE DROPDOWN LOGIC (Handles multiple levels) ---
    const dropdownToggles = document.querySelectorAll('.nav-menu .dropdown > a, .nav-menu .sub-dropdown > a');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Check if we are in mobile view
            if (window.innerWidth <= 768) {
                // Check if the link has a sub-menu as its next sibling
                const nextEl = this.nextElementSibling;
                if (nextEl && (nextEl.classList.contains('dropdown-content') || nextEl.classList.contains('sub-dropdown-content'))) {
                    e.preventDefault(); // Prevent link from navigating only if it has a sub-menu
                    
                    nextEl.classList.toggle('open');
                    this.classList.toggle('toggled');
                }
            }
        });
    });

    // --- FOOTER CURRENT YEAR ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // --- OTHER SCRIPTS ---
    // (Add lightbox, form submission, etc. scripts here if needed)
});
document.addEventListener('DOMContentLoaded', function() {

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    const sources = Array.from(galleryItems).map(item => item.getAttribute('href'));

    if (!lightbox) return;

    function showLightbox(index) {
        currentIndex = index;
        const src = sources[currentIndex];
        
        // Clear previous content
        lightboxContent.innerHTML = ''; 

        // Check if it's a video or image
        if (src.endsWith('.mp4') || src.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            lightboxContent.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            lightboxContent.appendChild(img);
        }

        lightbox.style.display = 'flex';
        document.body.classList.add('lightbox-open');
    }

    function hideLightbox() {
        lightbox.style.display = 'none';
        document.body.classList.remove('lightbox-open');
        // Stop video from playing in the background
        lightboxContent.innerHTML = ''; 
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % sources.length;
        showLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + sources.length) % sources.length;
        showLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
    
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'Escape') {
                hideLightbox();
            }
        }
    });

    // Update footer year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
