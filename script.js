// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const detectButton = document.querySelector('.detect-button');
    const cartContainer = document.querySelector('.cart-container');
    
    // Detect My Emotion Button Click Handler
    detectButton.addEventListener('click', function() {
        // Add a visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Check if browser supports getUserMedia (camera access)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            detectEmotion();
        } else {
            alert('Camera access is not supported in your browser. Please try a modern browser like Chrome, Firefox, or Edge.');
        }
    });
    
    // Shopping Cart Click Handler
    cartContainer.addEventListener('click', function() {
        alert('Shopping cart clicked! This would typically open your cart.');
        // You can add more functionality here, like:
        // - Opening a cart modal
        // - Navigating to a cart page
        // - Showing cart items count
    });
    
    // Function to handle emotion detection
    function detectEmotion() {
        // Request camera access
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Camera access granted
                alert('Camera access granted! In a full implementation, this would:\n\n' +
                      '1. Capture your image\n' +
                      '2. Use AI/ML to analyze your facial expression\n' +
                      '3. Detect your current emotion\n' +
                      '4. Recommend products based on your mood\n\n' +
                      'Stopping camera...');
                
                // Stop the camera stream
                stream.getTracks().forEach(track => track.stop());
                
                // In a real implementation, you would:
                // - Show a camera preview
                // - Capture an image
                // - Send to an emotion detection API
                // - Display results and product recommendations
            })
            .catch(function(error) {
                console.error('Camera access error:', error);
                if (error.name === 'NotAllowedError') {
                    alert('Camera access was denied. Please allow camera access to detect emotions.');
                } else if (error.name === 'NotFoundError') {
                    alert('No camera found on your device.');
                } else {
                    alert('Error accessing camera: ' + error.message);
                }
            });
    }
    
    // Add smooth scroll effect for double-down arrow
    const doubleDown = document.querySelector('.double-down');
    if (doubleDown) {
        doubleDown.addEventListener('click', function() {
            // Smooth scroll down (you can adjust this based on your page structure)
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
        
        // Make it clickable
        doubleDown.style.cursor = 'pointer';
    }
    
    // Optional: Add parallax effect to decorative ellipses
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const ellipses = document.querySelectorAll('.ellipse');
        
        ellipses.forEach((ellipse, index) => {
            const speed = 0.5 + (index * 0.1); // Different speeds for different ellipses
            const yPos = -(scrolled * speed);
            ellipse.style.transform += ` translateY(${yPos}px)`;
        });
    });
});

// Optional: Cart functionality example
class ShoppingCart {
    constructor() {
        this.items = [];
        this.updateCartCount();
    }
    
    addItem(item) {
        this.items.push(item);
        this.updateCartCount();
        this.showNotification(`${item.name} added to cart!`);
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.updateCartCount();
    }
    
    updateCartCount() {
        // You could add a badge to show item count
        const count = this.items.length;
        console.log(`Cart has ${count} items`);
        // Add visual indicator here if needed
    }
    
    showNotification(message) {
        // Simple notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #c5504b;
            color: #f5f1e8;
            padding: 15px 25px;
            border-radius: 25px;
            font-family: 'Bagel Fat One', cursive;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
