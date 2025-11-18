// Cart functionality
let cartCount = 0;
const cartButton = document.querySelector('.cart-button');
const addButtons = document.querySelectorAll('.add-button');

// Initialize cart display
function updateCartDisplay() {
    if (cartCount > 0) {
        if (!document.querySelector('.cart-badge')) {
            const badge = document.createElement('div');
            badge.className = 'cart-badge';
            badge.textContent = cartCount;
            cartButton.appendChild(badge);
            
            // Add badge styles
            const style = document.createElement('style');
            style.textContent = `
                .cart-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #000;
                    color: #F5F1E8;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                    font-family: 'DM Sans', sans-serif;
                }
            `;
            document.head.appendChild(style);
        } else {
            document.querySelector('.cart-badge').textContent = cartCount;
        }
    } else {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.remove();
        }
    }
}

// Add to cart functionality
addButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        updateCartDisplay();
        
        // Visual feedback
        button.style.background = '#2d5016';
        button.textContent = '✓';
        
        setTimeout(() => {
            button.style.background = '#C5504B';
            button.textContent = '+';
        }, 1000);
        
        // Create floating animation
        const card = button.closest('.product-card');
        const rect = card.getBoundingClientRect();
        const cartRect = cartButton.getBoundingClientRect();
        
        const floatingIcon = document.createElement('div');
        floatingIcon.textContent = '😊';
        floatingIcon.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 30px;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        document.body.appendChild(floatingIcon);
        
        setTimeout(() => {
            floatingIcon.style.left = `${cartRect.left + cartRect.width / 2}px`;
            floatingIcon.style.top = `${cartRect.top + cartRect.height / 2}px`;
            floatingIcon.style.opacity = '0';
            floatingIcon.style.transform = 'scale(0.5)';
        }, 10);
        
        setTimeout(() => {
            floatingIcon.remove();
        }, 900);
    });
});

// Cart button click
cartButton.addEventListener('click', () => {
    if (cartCount > 0) {
        alert(`You have ${cartCount} item${cartCount > 1 ? 's' : ''} in your cart!`);
    } else {
        alert('Your cart is empty. Add some emotions!');
    }
});

// Smooth scroll for scroll down button
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight - 100,
            behavior: 'smooth'
        });
    });
}

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
        card.style.boxShadow = '0 10px 30px rgba(197, 80, 75, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Animate emoticons on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

productCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'c' || e.key === 'C') {
        cartButton.click();
    }
});

console.log('🎭 Shop Your Emotions - Ready to shop!');
