// Receipt and Emotional Insights System

// Emotional meanings and descriptions
const emotionalMeanings = {
    happy: {
        icon: '😊',
        title: 'Happy',
        description: 'Happiness is a positive emotional state characterized by joy, contentment, and satisfaction. It reminds us that life has beautiful moments worth celebrating. Embrace these feelings and share them with others.'
    },
    sad: {
        icon: '😢',
        title: 'Sad',
        description: 'Sadness is a natural emotional response to loss, disappointment, or difficult situations. It teaches us to value what we have and process our experiences. Allow yourself to feel and heal at your own pace.'
    },
    calm: {
        icon: '😌',
        title: 'Calm',
        description: 'Calmness is a state of peace and tranquility. It allows you to think clearly, make better decisions, and find balance in chaos. This emotion is your anchor in the storm.'
    },
    anxious: {
        icon: '😰',
        title: 'Anxious',
        description: 'Anxiety is your mind\'s way of preparing for potential challenges. While it can feel overwhelming, it shows you care about outcomes. Remember to breathe, ground yourself, and take things one step at a time.'
    },
    angry: {
        icon: '😠',
        title: 'Angry',
        description: 'Anger signals that something important to you has been violated or threatened. It can be a powerful motivator for change when channeled constructively. Acknowledge it, understand it, then choose your response wisely.'
    },
    excited: {
        icon: '🤩',
        title: 'Excited',
        description: 'Excitement is anticipation mixed with joy. It energizes you and makes you feel alive. This emotion reminds you that there are things in life worth looking forward to. Ride this wave of positive energy!'
    },
    nostalgic: {
        icon: '🥺',
        title: 'Nostalgic',
        description: 'Nostalgia connects you to your past and the memories that shaped you. It can bring both sweetness and longing. These feelings honor your journey and remind you how far you\'ve come.'
    },
    hopeful: {
        icon: '🌟',
        title: 'Hopeful',
        description: 'Hope is the belief that better things are possible. It\'s the light that guides you through darkness and the courage to keep going. This emotion is your strength, showing you haven\'t given up on your dreams.'
    }
};

// Encouragement messages based on emotions
const encouragementMessages = {
    happy: [
        'Your joy is contagious! Keep spreading that beautiful smile.',
        'Happiness looks wonderful on you. Cherish these moments!',
        'You deserve all the happiness in the world. Keep shining!'
    ],
    sad: [
        'It\'s okay to not be okay. You\'re stronger than you know.',
        'This too shall pass. You\'re brave for feeling your emotions.',
        'Tomorrow is a new day. Be gentle with yourself today.'
    ],
    calm: [
        'Your peace is powerful. Stay centered and trust yourself.',
        'In stillness, you find strength. Keep nurturing your inner peace.',
        'You\'re doing amazing by taking time to be calm.'
    ],
    anxious: [
        'You\'ve gotten through 100% of your anxious days so far. You\'ve got this!',
        'Breathe. You are safe. This feeling will pass.',
        'Your feelings are valid. Take it one moment at a time.'
    ],
    angry: [
        'Your anger is valid. Channel it into positive change.',
        'Feel it, acknowledge it, but don\'t let it control you.',
        'This fire inside you can fuel greatness. You\'re in control.'
    ],
    excited: [
        'Your enthusiasm is inspiring! Keep that energy flowing.',
        'The world needs more people like you who get excited about life!',
        'Your excitement is a gift. Share it with the world!'
    ],
    nostalgic: [
        'Your memories are treasures. They made you who you are today.',
        'It\'s beautiful that you can cherish the past while embracing the present.',
        'The best memories are the ones that make you smile through tears.'
    ],
    hopeful: [
        'Your hope is your superpower. Never stop believing!',
        'The future is bright because you\'re working toward it.',
        'Keep hoping, keep dreaming, keep moving forward!'
    ]
};

function showReceipt(cartItems) {
    const modal = document.getElementById('receiptModal');
    const dateEl = document.getElementById('receiptDate');
    const itemsEl = document.getElementById('receiptItems');
    const totalEl = document.getElementById('receiptTotalAmount');
    const meaningsEl = document.getElementById('emotionalMeanings');
    const encouragementEl = document.getElementById('encouragementMessage');

    // Set date
    const now = new Date();
    dateEl.textContent = `${now.toLocaleDateString()} • ${now.toLocaleTimeString()}`;

    // Render receipt items
    let total = 0;
    const allEmotions = new Set();

    itemsEl.innerHTML = cartItems.map(item => {
        total += item.price * item.quantity;
        item.emotions.forEach(e => allEmotions.add(e));

        return `
            <div class="receipt-item">
                <div class="receipt-item-details">
                    <div class="receipt-item-name">${item.name}</div>
                    <div class="receipt-item-description">${item.description}</div>
                    <div class="receipt-item-emotions">
                        ${item.emotions.map(e => `<span class="receipt-emotion-tag">${e}</span>`).join('')}
                    </div>
                </div>
                <div class="receipt-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
    }).join('');

    totalEl.textContent = `$${total.toFixed(2)}`;

    // Generate emotional meanings
    meaningsEl.innerHTML = Array.from(allEmotions).map(emotion => {
        const meaning = emotionalMeanings[emotion];
        if (!meaning) return '';

        return `
            <div class="emotion-meaning">
                <div class="emotion-meaning-title">
                    <span>${meaning.icon}</span>
                    <span>${meaning.title}</span>
                </div>
                <div class="emotion-meaning-text">${meaning.description}</div>
            </div>
        `;
    }).join('');

    // Generate encouragement message
    const dominantEmotion = getDominantEmotion(allEmotions);
    const messages = encouragementMessages[dominantEmotion];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    encouragementEl.innerHTML = `
        <div class="encouragement-message">
            <strong>You are valued and your feelings matter.</strong>
            ${randomMessage}
        </div>
    `;

    // Show modal
    modal.classList.add('active');
}

function getDominantEmotion(emotions) {
    // If only one emotion, return it
    if (emotions.size === 1) return Array.from(emotions)[0];

    // Priority order for mixed emotions
    const priority = ['hopeful', 'happy', 'excited', 'calm', 'nostalgic', 'anxious', 'sad', 'angry'];

    for (const emotion of priority) {
        if (emotions.has(emotion)) return emotion;
    }

    return Array.from(emotions)[0];
}

function closeReceipt() {
    const modal = document.getElementById('receiptModal');
    modal.classList.remove('active');
}

async function saveReceipt() {
    const receiptContent = document.getElementById('receiptContent');
    const saveBtn = document.getElementById('saveReceiptBtn');

    // Change button text
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Generating...';
    saveBtn.disabled = true;

    try {
        // Use html2canvas to capture the receipt
        const canvas = await html2canvas(receiptContent, {
            backgroundColor: '#fff9f0',
            scale: 2,
            logging: false
        });

        // Convert to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 10);
            link.download = `emotional-receipt-${timestamp}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            // Reset button
            saveBtn.textContent = '✓ Saved!';
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.disabled = false;
            }, 2000);
        });
    } catch (error) {
        console.error('Error saving receipt:', error);
        saveBtn.textContent = 'Error - Try Again';
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }, 2000);
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const closeReceiptBtn = document.getElementById('closeReceipt');
    const saveReceiptBtn = document.getElementById('saveReceiptBtn');
    const newShoppingBtn = document.getElementById('newShoppingBtn');
    const receiptModal = document.getElementById('receiptModal');

    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener('click', closeReceipt);
    }

    if (saveReceiptBtn) {
        saveReceiptBtn.addEventListener('click', saveReceipt);
    }

    if (newShoppingBtn) {
        newShoppingBtn.addEventListener('click', () => {
            closeReceipt();
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Close on outside click
    if (receiptModal) {
        receiptModal.addEventListener('click', (e) => {
            if (e.target === receiptModal) {
                closeReceipt();
            }
        });
    }
});
