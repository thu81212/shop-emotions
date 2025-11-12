// Product Database with Emotion Tags
const products = [
    {
        id: 1,
        name: "Pure Joy",
        price: 79.99,
        description: "An unbridled burst of happiness and light",
        emotions: ["happy", "excited"],
        emoji: "✨",
        image: ""
    },
    {
        id: 2,
        name: "Gentle Melancholy",
        price: 49.99,
        description: "A soft sadness that wraps around you like a blanket",
        emotions: ["sad", "calm"],
        emoji: "🌧️",
        image: ""
    },
    {
        id: 3,
        name: "Rising Dawn",
        price: 129.99,
        description: "The feeling of possibilities stretching before you",
        emotions: ["hopeful", "excited"],
        emoji: "🌅",
        image: ""
    },
    {
        id: 4,
        name: "Yesterday's Echo",
        price: 89.99,
        description: "Bittersweet memories that make you smile and ache",
        emotions: ["nostalgic", "happy"],
        emoji: "📻",
        image: ""
    },
    {
        id: 5,
        name: "Inner Peace",
        price: 39.99,
        description: "The quiet stillness found deep within",
        emotions: ["calm", "anxious"],
        emoji: "🕊️",
        image: ""
    },
    {
        id: 6,
        name: "Electric Euphoria",
        price: 34.99,
        description: "When happiness becomes a full-body experience",
        emotions: ["excited", "happy"],
        emoji: "⚡",
        image: ""
    },
    {
        id: 7,
        name: "Restless Mind",
        price: 64.99,
        description: "The storm of thoughts that won't quiet down",
        emotions: ["anxious", "calm"],
        emoji: "🌀",
        image: ""
    },
    {
        id: 8,
        name: "Golden Hour Glow",
        price: 119.99,
        description: "That perfect moment when everything feels just right",
        emotions: ["nostalgic", "happy"],
        emoji: "🌤️",
        image: ""
    },
    {
        id: 9,
        name: "Tomorrow's Promise",
        price: 29.99,
        description: "Hope dressed in patience and possibility",
        emotions: ["hopeful", "calm"],
        emoji: "🌱",
        image: ""
    },
    {
        id: 10,
        name: "Quiet Tears",
        price: 29.99,
        description: "The gentle release of sorrow in solitude",
        emotions: ["calm", "sad"],
        emoji: "💧",
        image: ""
    },
    {
        id: 11,
        name: "Wild Abandon",
        price: 199.99,
        description: "Throwing caution to the wind and living fully",
        emotions: ["excited", "happy"],
        emoji: "🎪",
        image: ""
    },
    {
        id: 12,
        name: "Faded Photographs",
        price: 24.99,
        description: "Moments frozen in time, softened by years",
        emotions: ["nostalgic", "calm"],
        emoji: "📸",
        image: ""
    },
    {
        id: 13,
        name: "New Beginnings",
        price: 89.99,
        description: "The courage to start fresh and dream again",
        emotions: ["hopeful", "excited"],
        emoji: "🗝️",
        image: ""
    },
    {
        id: 14,
        name: "Silver Lining",
        price: 44.99,
        description: "Finding light in the darkest clouds",
        emotions: ["hopeful", "calm"],
        emoji: "☁️",
        image: ""
    },
    {
        id: 15,
        name: "Burning Rage",
        price: 79.99,
        description: "Fire and fury demanding to be released",
        emotions: ["angry", "excited"],
        emoji: "🔥",
        image: ""
    },
    {
        id: 16,
        name: "Racing Thoughts",
        price: 69.99,
        description: "When your mind won't stop spinning in circles",
        emotions: ["anxious", "calm"],
        emoji: "💭",
        image: ""
    },
    {
        id: 17,
        name: "Brave Dreams",
        price: 34.99,
        description: "Aspirations that make your heart beat faster",
        emotions: ["hopeful", "excited"],
        emoji: "🎯",
        image: ""
    },
    {
        id: 18,
        name: "Time Capsule",
        price: 49.99,
        description: "Emotions preserved from a world that no longer exists",
        emotions: ["nostalgic", "sad"],
        emoji: "⏳",
        image: ""
    },
    {
        id: 19,
        name: "Edge of Worry",
        price: 34.99,
        description: "Standing at the precipice of what-ifs",
        emotions: ["anxious", "calm"],
        emoji: "🌊",
        image: ""
    },
    {
        id: 20,
        name: "Heavy Heart",
        price: 39.99,
        description: "When sadness weighs you down like gravity",
        emotions: ["sad", "happy"],
        emoji: "💔",
        image: ""
    },
    {
        id: 21,
        name: "Volcanic Temper",
        price: 99.99,
        description: "Anger erupting from deep beneath the surface",
        emotions: ["angry", "excited"],
        emoji: "🌋",
        image: ""
    },
    {
        id: 22,
        name: "Nervous Energy",
        price: 44.99,
        description: "Anxiety buzzing through your veins like electricity",
        emotions: ["anxious", "calm"],
        emoji: "⚠️",
        image: ""
    },
    {
        id: 23,
        name: "Sweet Memories",
        price: 29.99,
        description: "The taste of simpler, sweeter times",
        emotions: ["nostalgic", "happy"],
        emoji: "🍯",
        image: ""
    },
    {
        id: 24,
        name: "Blooming Hope",
        price: 54.99,
        description: "Optimism growing slowly but surely",
        emotions: ["hopeful", "calm"],
        emoji: "🌸",
        image: ""
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
