const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('overlay');
body.appendChild(overlay);

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
});

// Close menu when clicking nav links
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
});

// Function to handle animations
function handleHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    
    // Create an observer for the hero section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset animations by removing and re-adding the elements
                const h1 = heroContent.querySelector('h1');
                const p = heroContent.querySelector('p');
                const button = heroContent.querySelector('.cta-button');
                
                h1.style.animation = 'none';
                p.style.animation = 'none';
                button.style.animation = 'none';
                
                // Trigger reflow
                void h1.offsetWidth;
                void p.offsetWidth;
                void button.offsetWidth;
                
                // Re-add animations
                h1.style.animation = 'fadeInUp 0.8s ease forwards';
                p.style.animation = 'fadeInUp 0.8s ease forwards 0.2s';
                button.style.animation = 'fadeInUp 0.8s ease forwards 0.4s';
            }
        });
    }, { threshold: 0.1 });
    
    // Start observing the hero content
    observer.observe(heroContent);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', handleHeroAnimations);

document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.dataset.category;

            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Add this function to handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    form.reset(); // Reset the form
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.className = 'form-status error';
            } finally {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                formStatus.style.display = 'block';
                
                // Hide the message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// Optional: Add client-side phone number validation
document.getElementById('phone').addEventListener('input', function(e) {
    // Remove any non-digit characters
    let phone = e.target.value.replace(/\D/g, '');
    
    // Format the number as needed
    if (phone.length > 0) {
        phone = phone.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    
    e.target.value = phone;
}); 