// Cart functionality
let cart = [];
const cartButton = document.querySelector('.cart-button');
const addButtons = document.querySelectorAll('.add-button');
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

// Initialize cart display
function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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

// Calculate cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Add to cart functionality
addButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Get product data from card
        const card = button.closest('.product-card');
        const productId = card.getAttribute('data-id');
        const productName = card.getAttribute('data-name');
        const productPrice = parseFloat(card.getAttribute('data-price'));

        // Add to cart or update quantity
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCartDisplay();

        // Visual feedback
        button.style.background = '#2d5016';
        button.textContent = '✓';

        setTimeout(() => {
            button.style.background = '#C5504B';
            button.textContent = '+';
        }, 1000);

        // Create floating animation
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
    if (cart.length > 0) {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartTotal = getCartTotal();

        let cartDetails = `🛒 Your Cart (${itemCount} item${itemCount > 1 ? 's' : ''})\n\n`;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartDetails += `${item.name}\n`;
            cartDetails += `  ${item.quantity} x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}\n\n`;
        });

        cartDetails += `\nTotal: $${cartTotal.toFixed(2)}`;

        alert(cartDetails);
    } else {
        alert('Your cart is empty. Add some emotions!');
    }
});

// Emotion Filter Functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get selected emotion
        const selectedEmotion = button.getAttribute('data-emotion');

        // Filter products
        productCards.forEach(card => {
            if (selectedEmotion === 'all') {
                // Show all products
                card.closest('.product-card').classList.remove('hidden');
            } else {
                // Check if product has the selected emotion
                const emotions = JSON.parse(card.getAttribute('data-emotions'));

                if (emotions.includes(selectedEmotion)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });

        // Animate visible cards
        const visibleCards = document.querySelectorAll('.product-card:not(.hidden)');
        visibleCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            }, 10);
        });
    });
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
