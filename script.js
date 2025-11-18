// Emotion Detection with face-api.js
let modelsLoaded = false;
let videoStream = null;
let detectionInterval = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const detectButton = document.querySelector('.detect-button');
    const cartContainer = document.querySelector('.cart-container');
    const emotionModal = document.getElementById('emotionModal');
    const emotionClose = document.querySelector('.emotion-close');
    const videoElement = document.getElementById('videoElement');
    const overlayCanvas = document.getElementById('overlayCanvas');
    const statusText = document.getElementById('statusText');
    const emotionResult = document.getElementById('emotionResult');
    const captureBtn = document.getElementById('captureBtn');

    // Load face-api.js models
    async function loadModels() {
        if (modelsLoaded) return true;

        try {
            statusText.textContent = 'Loading AI models...';
            const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';

            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]);

            modelsLoaded = true;
            statusText.textContent = 'Models loaded! Starting camera...';
            return true;
        } catch (error) {
            console.error('Error loading models:', error);
            statusText.textContent = 'Error loading AI models. Using simplified detection.';
            return false;
        }
    }

    // Start camera
    async function startCamera() {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 640,
                    height: 480,
                    facingMode: 'user'
                }
            });
            videoElement.srcObject = videoStream;

            // Wait for video to be ready
            await new Promise((resolve) => {
                videoElement.onloadedmetadata = () => {
                    resolve();
                };
            });

            // Set canvas size to match video
            overlayCanvas.width = videoElement.videoWidth;
            overlayCanvas.height = videoElement.videoHeight;

            statusText.textContent = 'Camera ready! Position your face in the frame.';
            captureBtn.disabled = false;

            // Start real-time detection
            startRealTimeDetection();

        } catch (error) {
            console.error('Camera access error:', error);
            if (error.name === 'NotAllowedError') {
                statusText.textContent = 'Camera access denied. Please allow camera access.';
            } else if (error.name === 'NotFoundError') {
                statusText.textContent = 'No camera found on your device.';
            } else {
                statusText.textContent = 'Error accessing camera: ' + error.message;
            }
        }
    }

    // Real-time emotion detection
    async function startRealTimeDetection() {
        if (!modelsLoaded) return;

        const detectEmotions = async () => {
            const detections = await faceapi
                .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            const canvas = overlayCanvas;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (detections) {
                // Draw face box
                const box = detections.detection.box;
                ctx.strokeStyle = '#c5504b';
                ctx.lineWidth = 3;
                ctx.strokeRect(box.x, box.y, box.width, box.height);

                // Get dominant emotion
                const expressions = detections.expressions;
                const dominantEmotion = Object.entries(expressions).reduce((a, b) =>
                    expressions[a[0]] > expressions[b[0]] ? a : b
                );

                // Display emotion
                const emotionName = dominantEmotion[0];
                const confidence = (dominantEmotion[1] * 100).toFixed(0);

                ctx.fillStyle = '#c5504b';
                ctx.font = 'bold 20px Arial';
                ctx.fillText(`${emotionName} (${confidence}%)`, box.x, box.y - 10);
            }
        };

        // Run detection every 100ms
        detectionInterval = setInterval(detectEmotions, 100);
    }

    // Stop camera
    function stopCamera() {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
        }
        if (detectionInterval) {
            clearInterval(detectionInterval);
            detectionInterval = null;
        }
    }

    // Map face-api emotions to our product emotions
    function mapEmotionToProducts(faceApiEmotion) {
        const emotionMap = {
            'happy': ['happy', 'energetic', 'confident'],
            'sad': ['sad', 'calm', 'comfort'],
            'angry': ['stressed', 'energetic'],
            'fearful': ['anxious', 'calm', 'comfort'],
            'disgusted': ['stressed', 'comfort'],
            'surprised': ['energetic', 'excited'],
            'neutral': ['calm', 'neutral']
        };

        return emotionMap[faceApiEmotion] || ['calm'];
    }

    // Get sample products for demo (since products.js might not be loaded)
    function getSampleProducts(emotions) {
        // Sample products for emotion detection
        const sampleProducts = [
            { id: 1, name: 'Comfort Tea', price: 12.99, emotions: ['calm', 'comfort', 'sad'] },
            { id: 2, name: 'Energy Drink', price: 4.99, emotions: ['energetic', 'excited', 'happy'] },
            { id: 3, name: 'Relaxation Candle', price: 18.99, emotions: ['calm', 'stressed', 'anxious'] },
            { id: 4, name: 'Happy Journal', price: 15.99, emotions: ['happy', 'confident'] },
            { id: 5, name: 'Stress Ball', price: 8.99, emotions: ['stressed', 'angry'] },
            { id: 6, name: 'Meditation Cushion', price: 34.99, emotions: ['calm', 'neutral'] }
        ];

        // Filter products that match any of the emotions
        return sampleProducts.filter(product =>
            product.emotions.some(emotion => emotions.includes(emotion))
        ).slice(0, 2); // Return top 2 products
    }

    // Capture and detect emotion
    async function captureEmotion() {
        captureBtn.disabled = true;
        statusText.textContent = 'Analyzing your emotion...';

        try {
            if (!modelsLoaded) {
                // Fallback: simple random emotion for demo
                const emotions = ['happy', 'calm', 'energetic'];
                const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
                showEmotionResult(randomEmotion, 'detected');
                return;
            }

            const detections = await faceapi
                .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detections) {
                const expressions = detections.expressions;
                const dominantEmotion = Object.entries(expressions).reduce((a, b) =>
                    expressions[a[0]] > expressions[b[0]] ? a : b
                );

                const emotionName = dominantEmotion[0];
                showEmotionResult(emotionName, 'detected');
            } else {
                statusText.textContent = 'No face detected. Please try again.';
                captureBtn.disabled = false;
            }
        } catch (error) {
            console.error('Detection error:', error);
            statusText.textContent = 'Detection error. Please try again.';
            captureBtn.disabled = false;
        }
    }

    // Show emotion result and add products
    function showEmotionResult(emotion, source) {
        const emotionEmojis = {
            'happy': '😊',
            'sad': '😢',
            'angry': '😠',
            'fearful': '😨',
            'disgusted': '🤢',
            'surprised': '😲',
            'neutral': '😐',
            'calm': '😌',
            'energetic': '⚡'
        };

        const emoji = emotionEmojis[emotion] || '😊';
        emotionResult.innerHTML = `${emoji} ${emotion.toUpperCase()}`;

        // Get product emotions
        const productEmotions = mapEmotionToProducts(emotion);

        // Get recommended products
        const recommendedProducts = getSampleProducts(productEmotions);

        // Add products to cart
        statusText.innerHTML = `Adding products for your <strong>${emotion}</strong> mood...`;

        setTimeout(() => {
            if (recommendedProducts.length > 0) {
                // Add to cart (using the global cart from script.js or app.js)
                recommendedProducts.forEach(product => {
                    if (typeof cart !== 'undefined') {
                        const existingItem = cart.find(item => item.id === product.id);
                        if (!existingItem) {
                            cart.push({ ...product, quantity: 1 });
                        }
                    }
                });

                // Save and update cart if functions exist
                if (typeof saveCart === 'function') saveCart();
                if (typeof updateCartUI === 'function') updateCartUI();

                const productNames = recommendedProducts.map(p => p.name).join(', ');
                statusText.innerHTML = `✅ Added to cart: <strong>${productNames}</strong>`;

                // Show success message
                setTimeout(() => {
                    emotionResult.innerHTML += '<br><small>Products added to your cart!</small>';
                }, 500);

                // Close modal after 2 seconds
                setTimeout(() => {
                    closeModal();
                }, 2500);
            } else {
                statusText.textContent = 'No products found for this emotion.';
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }
        }, 1000);
    }

    // Open modal
    async function openModal() {
        emotionModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset UI
        emotionResult.innerHTML = '';
        captureBtn.disabled = true;

        // Load models and start camera
        await loadModels();
        await startCamera();
    }

    // Close modal
    function closeModal() {
        emotionModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopCamera();

        // Reset UI
        statusText.textContent = 'Initializing camera...';
        emotionResult.innerHTML = '';
        captureBtn.disabled = true;
    }

    // Event Listeners
    detectButton.addEventListener('click', function() {
        openModal();
    });

    emotionClose.addEventListener('click', closeModal);

    emotionModal.addEventListener('click', function(e) {
        if (e.target === emotionModal) {
            closeModal();
        }
    });

    captureBtn.addEventListener('click', captureEmotion);

    // Shopping Cart Click Handler
    cartContainer.addEventListener('click', function() {
        alert('Shopping cart clicked! This would typically open your cart.');
    });

    // Add smooth scroll effect for double-down arrow
    const doubleDown = document.querySelector('.double-down');
    if (doubleDown) {
        doubleDown.addEventListener('click', function() {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });

        doubleDown.style.cursor = 'pointer';
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emotionModal.classList.contains('active')) {
            closeModal();
        }
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
        const count = this.items.length;
        console.log(`Cart has ${count} items`);
    }

    showNotification(message) {
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
