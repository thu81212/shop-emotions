// Product Database with Emotion Tags
const products = [
    {
        id: 1,
        name: "Sunshine Yellow Dress",
        price: 79.99,
        description: "Bright and cheerful dress perfect for spreading joy",
        emotions: ["happy", "excited"],
        emoji: "👗",
        image: ""
    },
    {
        id: 2,
        name: "Comfort Knit Blanket",
        price: 49.99,
        description: "Soft blanket for wrapping yourself in warmth",
        emotions: ["sad", "calm"],
        emoji: "🧶",
        image: ""
    },
    {
        id: 3,
        name: "Trail Running Shoes",
        price: 129.99,
        description: "Push your limits and explore new paths",
        emotions: ["hopeful", "excited"],
        emoji: "🥾",
        image: ""
    },
    {
        id: 4,
        name: "Memory Photo Album",
        price: 89.99,
        description: "Preserve cherished moments from the past",
        emotions: ["nostalgic", "happy"],
        emoji: "📷",
        image: ""
    },
    {
        id: 5,
        name: "Meditation Cushion Set",
        price: 39.99,
        description: "Find your inner peace and reduce stress",
        emotions: ["calm", "anxious"],
        emoji: "🧘",
        image: ""
    },
    {
        id: 6,
        name: "Party LED Light Strip",
        price: 34.99,
        description: "Transform any space into a celebration",
        emotions: ["excited", "happy"],
        emoji: "💡",
        image: ""
    },
    {
        id: 7,
        name: "Stress Relief Bath Set",
        price: 64.99,
        description: "Soothe your worries away with aromatherapy",
        emotions: ["calm", "anxious"],
        emoji: "🧴",
        image: ""
    },
    {
        id: 8,
        name: "Vintage Record Player",
        price: 119.99,
        description: "Relive the golden era of music",
        emotions: ["nostalgic", "happy"],
        emoji: "🎵",
        image: ""
    },
    {
        id: 9,
        name: "Motivational Journal",
        price: 29.99,
        description: "Write your way to a brighter tomorrow",
        emotions: ["hopeful", "calm"],
        emoji: "📓",
        image: ""
    },
    {
        id: 10,
        name: "Calming Scented Candles",
        price: 29.99,
        description: "Create a peaceful atmosphere at home",
        emotions: ["calm", "sad"],
        emoji: "🕯️",
        image: ""
    },
    {
        id: 11,
        name: "Concert VIP Tickets",
        price: 199.99,
        description: "Experience live music like never before",
        emotions: ["excited", "happy"],
        emoji: "🎫",
        image: ""
    },
    {
        id: 12,
        name: "Vintage Letter Set",
        price: 24.99,
        description: "Write letters like the old days",
        emotions: ["nostalgic", "calm"],
        emoji: "💌",
        image: ""
    },
    {
        id: 13,
        name: "Adventure Travel Kit",
        price: 89.99,
        description: "Ready for your next journey of discovery",
        emotions: ["hopeful", "excited"],
        emoji: "🎒",
        image: ""
    },
    {
        id: 14,
        name: "Premium Coffee Beans",
        price: 44.99,
        description: "Start your day with hope and energy",
        emotions: ["hopeful", "calm"],
        emoji: "☕",
        image: ""
    },
    {
        id: 15,
        name: "Boxing Training Set",
        price: 79.99,
        description: "Release your frustration through fitness",
        emotions: ["angry", "excited"],
        emoji: "🥊",
        image: ""
    },
    {
        id: 16,
        name: "Weighted Blanket",
        price: 69.99,
        description: "Ease anxiety and sleep better",
        emotions: ["anxious", "calm"],
        emoji: "🛏️",
        image: ""
    },
    {
        id: 17,
        name: "Goal Planner 2025",
        price: 34.99,
        description: "Map out your dreams and make them real",
        emotions: ["hopeful", "excited"],
        emoji: "📅",
        image: ""
    },
    {
        id: 18,
        name: "Old Movie Collection",
        price: 49.99,
        description: "Classic films that take you back in time",
        emotions: ["nostalgic", "sad"],
        emoji: "🎬",
        image: ""
    },
    {
        id: 19,
        name: "Anxiety Relief Tea Set",
        price: 34.99,
        description: "Calming herbal blends for peace of mind",
        emotions: ["anxious", "calm"],
        emoji: "🍵",
        image: ""
    },
    {
        id: 20,
        name: "Comfort Food Bundle",
        price: 39.99,
        description: "Indulge when you need it most",
        emotions: ["sad", "happy"],
        emoji: "🍫",
        image: ""
    },
    {
        id: 21,
        name: "Rage Room Session",
        price: 99.99,
        description: "Smash things safely and let it all out",
        emotions: ["angry", "excited"],
        emoji: "💢",
        image: ""
    },
    {
        id: 22,
        name: "Mindfulness App Subscription",
        price: 44.99,
        description: "Guided meditation for worried minds",
        emotions: ["anxious", "calm"],
        emoji: "🧠",
        image: ""
    },
    {
        id: 23,
        name: "Childhood Candy Box",
        price: 29.99,
        description: "Sweet treats from your youth",
        emotions: ["nostalgic", "happy"],
        emoji: "🍬",
        image: ""
    },
    {
        id: 24,
        name: "Self-Care Starter Kit",
        price: 54.99,
        description: "Tools for building a better tomorrow",
        emotions: ["hopeful", "calm"],
        emoji: "💆",
        image: ""
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
