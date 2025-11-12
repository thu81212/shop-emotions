// Emotion Detection using face-api.js
let videoElement;
let canvas;
let stream;
let modelsLoaded = false;
let isDetecting = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    videoElement = document.getElementById('videoElement');
    canvas = document.getElementById('overlayCanvas');

    const detectBtn = document.getElementById('detectEmotionBtn');
    const closeBtn = document.getElementById('closeEmotionModal');
    const emotionModal = document.getElementById('emotionModal');

    detectBtn.addEventListener('click', openEmotionDetection);
    closeBtn.addEventListener('click', closeEmotionDetection);

    // Close modal when clicking outside
    emotionModal.addEventListener('click', (e) => {
        if (e.target === emotionModal) {
            closeEmotionDetection();
        }
    });
});

async function openEmotionDetection() {
    const modal = document.getElementById('emotionModal');
    const statusEl = document.getElementById('detectionStatus');

    modal.classList.add('active');
    statusEl.innerHTML = '<p>Loading AI models...</p>';

    try {
        // Load face-api.js models if not already loaded
        if (!modelsLoaded) {
            await loadModels();
        }

        // Start camera
        await startCamera();

        statusEl.innerHTML = '<p>Position your face in the camera and smile, frown, or show your emotion!</p>';

        // Start emotion detection
        detectEmotion();
    } catch (error) {
        console.error('Error starting emotion detection:', error);
        statusEl.innerHTML = '<p style="color: red;">Error: Could not access camera. Please allow camera permissions.</p>';
    }
}

async function loadModels() {
    const statusEl = document.getElementById('detectionStatus');
    statusEl.innerHTML = '<p>Loading AI models (this may take a moment)...</p>';

    try {
        // Load models from CDN
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';

        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

        modelsLoaded = true;
        console.log('Face-api.js models loaded successfully');
    } catch (error) {
        console.error('Error loading models:', error);
        throw new Error('Failed to load AI models');
    }
}

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            }
        });

        videoElement.srcObject = stream;

        // Wait for video to be ready
        return new Promise((resolve) => {
            videoElement.onloadedmetadata = () => {
                // Set canvas dimensions to match video
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                resolve();
            };
        });
    } catch (error) {
        console.error('Error accessing camera:', error);
        throw new Error('Could not access camera');
    }
}

async function detectEmotion() {
    if (!videoElement || !modelsLoaded) return;

    isDetecting = true;
    const detectionOptions = new faceapi.TinyFaceDetectorOptions({
        inputSize: 224,
        scoreThreshold: 0.5
    });

    const detectInterval = setInterval(async () => {
        if (!isDetecting) {
            clearInterval(detectInterval);
            return;
        }

        try {
            // Detect face with expressions
            const detection = await faceapi
                .detectSingleFace(videoElement, detectionOptions)
                .withFaceExpressions();

            if (detection) {
                // Draw detection on canvas
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Get the dominant emotion
                const expressions = detection.expressions;
                const dominantEmotion = getDominantEmotion(expressions);

                // Draw face box
                const box = detection.detection.box;
                ctx.strokeStyle = '#4caf50';
                ctx.lineWidth = 3;
                ctx.strokeRect(box.x, box.y, box.width, box.height);

                // Display detected emotion
                ctx.fillStyle = '#4caf50';
                ctx.font = '20px Arial';
                ctx.fillText(`Feeling: ${dominantEmotion}`, box.x, box.y - 10);

                // Check if we have a confident detection
                if (expressions[dominantEmotion] > 0.6) {
                    // Stop detection
                    isDetecting = false;
                    clearInterval(detectInterval);

                    // Map face-api emotion to our emotions
                    const mappedEmotion = mapEmotionToShop(dominantEmotion);

                    // Show result
                    await showDetectionResult(mappedEmotion);

                    // Add products to cart
                    await addProductsToCart(mappedEmotion);
                }
            }
        } catch (error) {
            console.error('Detection error:', error);
        }
    }, 100); // Check every 100ms
}

function getDominantEmotion(expressions) {
    let maxEmotion = 'neutral';
    let maxValue = 0;

    for (const [emotion, value] of Object.entries(expressions)) {
        if (value > maxValue) {
            maxValue = value;
            maxEmotion = emotion;
        }
    }

    return maxEmotion;
}

function mapEmotionToShop(faceApiEmotion) {
    // Map face-api.js emotions to our shop emotions
    const emotionMap = {
        'happy': 'happy',
        'sad': 'sad',
        'angry': 'angry',
        'fearful': 'anxious',
        'disgusted': 'angry',
        'surprised': 'excited',
        'neutral': 'calm'
    };

    return emotionMap[faceApiEmotion] || 'calm';
}

async function showDetectionResult(emotion) {
    const statusEl = document.getElementById('detectionStatus');
    const resultEl = document.getElementById('detectionResult');
    const emotionSpan = document.getElementById('detectedEmotion');

    statusEl.style.display = 'none';
    emotionSpan.textContent = emotion;
    resultEl.style.display = 'block';
}

async function addProductsToCart(emotion) {
    // Get products with this emotion
    const matchingProducts = products.filter(p => p.emotions.includes(emotion));

    if (matchingProducts.length === 0) {
        console.log('No products found for emotion:', emotion);
        return;
    }

    // Select 2 random products
    const shuffled = matchingProducts.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 2);

    // Add to cart
    selectedProducts.forEach(product => {
        addToCart(product.id);
    });

    // Wait a moment then close modal and show cart
    setTimeout(() => {
        closeEmotionDetection();
        document.getElementById('cartBtn').click();
    }, 2500);
}

function closeEmotionDetection() {
    const modal = document.getElementById('emotionModal');
    const statusEl = document.getElementById('detectionStatus');
    const resultEl = document.getElementById('detectionResult');

    // Stop detection
    isDetecting = false;

    // Stop camera
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    // Reset UI
    modal.classList.remove('active');
    statusEl.style.display = 'block';
    statusEl.innerHTML = '<p>Position your face in the camera...</p>';
    resultEl.style.display = 'none';

    // Clear canvas
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
