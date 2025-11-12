// State Management
let currentEmotion = 'all';
let currentSort = 'default';
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const emotionButtons = document.querySelectorAll('.emotion-btn');
const sortSelect = document.getElementById('sortSelect');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsTitle = document.getElementById('productsTitle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayProducts();
    updateCartUI();
});

// Display Products
function displayProducts() {
    let filteredProducts = [...products];

    // Filter by emotion
    if (currentEmotion !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.emotions.includes(currentEmotion)
        );
    }

    // Sort products
    switch(currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    // Update products title
    const emotionName = currentEmotion === 'all' ? 'All' :
        currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1);
    productsTitle.textContent = `${emotionName} Products`;

    // Clear and populate grid
    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="loading">
                <p>No products found for this emotion 😔</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Try selecting a different emotion!</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.05}s`;
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const emotionTags = product.emotions.map(emotion =>
        `<span class="emotion-tag">${emotion}</span>`
    ).join('');

    // Create a shape representation instead of emoji
    const shapeHTML = `
        <div class="product-shape">
            <div class="shape-face">
                <div class="shape-eyes">
                    <div class="shape-eye"></div>
                    <div class="shape-eye"></div>
                </div>
                <div class="shape-mouth"></div>
            </div>
        </div>
    `;

    card.innerHTML = `
        <div class="product-image">${shapeHTML}</div>
        <div class="product-info">
            <div class="product-emotions">${emotionTags}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    return card;
}

// Emotion Filter
emotionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        emotionButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update current emotion and display
        currentEmotion = btn.dataset.emotion;
        displayProducts();
    });
});

// Sort Products
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    displayProducts();
});

// Shopping Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Add some products to get started!</p>
            </div>
        `;
        totalAmount.textContent = '$0.00';
        checkoutBtn.disabled = true;
        return;
    }

    // Display cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <div class="cart-shape">
                    <div class="cart-shape-eyes">
                        <div class="cart-shape-eye"></div>
                        <div class="cart-shape-eye"></div>
                    </div>
                    <div class="cart-shape-mouth"></div>
                </div>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
}

function showCartNotification() {
    const btn = cartBtn;
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Cart Modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    alert(`🎉 Checkout Complete!\n\nTotal Items: ${itemCount}\nTotal Amount: $${total.toFixed(2)}\n\nThank you for shopping with your emotions! ❤️`);

    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Local Storage
function saveCart() {
    localStorage.setItem('shopEmotionsCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('shopEmotionsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal.classList.contains('active')) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
