// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animation on scroll (simple fade in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .screenshot-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Download button click tracking
document.querySelectorAll('.btn-download, .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add analytics or tracking here if needed
        console.log('Download initiated');
    });
});

// Feature pills animation
const featurePills = document.querySelectorAll('.feature-pill');
featurePills.forEach((pill, index) => {
    pill.style.animationDelay = `${index * 0.1}s`;
    pill.classList.add('fade-in-up');
});

// Merge DOMContentLoaded listeners for modal and image loading
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality for screenshots
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalPdf = document.getElementById('modalPdf');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    screenshotItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const iframe = this.querySelector('iframe');
            const title = this.querySelector('h3') ? this.querySelector('h3').textContent : '';
            const description = this.querySelector('p') ? this.querySelector('p').textContent : '';
            if (img) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalImage.style.display = 'block';
                modalPdf.style.display = 'none';
            } else if (iframe) {
                modalPdf.src = iframe.src;
                modalPdf.style.display = 'block';
                modalImage.style.display = 'none';
            }
            modalCaption.innerHTML = `<strong>${title}</strong><br>${description}`;
            modal.style.display = 'block';
            modal.style.opacity = '0';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        });
    });
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalImage.src = '';
            modalPdf.src = '';
            modalImage.style.display = 'none';
            modalPdf.style.display = 'none';
        }, 300);
    }

    // Professional loading states for screenshot images
    const screenshotImages = document.querySelectorAll('.screenshot-item img');
    screenshotImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'blur(0)';
        });
        img.addEventListener('loadstart', function() {
            this.style.opacity = '0.7';
            this.style.filter = 'blur(2px)';
        });
    });

    // Demo video modal
    const demoBtn = document.querySelector('.btn-secondary[href="#features"]');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const modalDemoVideo = document.getElementById('modalDemoVideo');
    if (demoBtn && videoModal && closeVideoModal && modalDemoVideo) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            videoModal.style.display = 'block';
            videoModal.style.opacity = '0';
            document.body.style.overflow = 'hidden';
            modalDemoVideo.currentTime = 0;
            modalDemoVideo.play();
            setTimeout(() => {
                videoModal.style.opacity = '1';
            }, 10);
        });
        closeVideoModal.addEventListener('click', function() {
            videoModal.style.opacity = '0';
            setTimeout(() => {
                videoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                modalDemoVideo.pause();
            }, 300);
        });
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal.click();
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.style.display === 'block') {
                closeVideoModal.click();
            }
        });
    }
});