// Product Database with Emotion Tags
const products = [
    {
        id: 1,
        name: "Sunshine Yellow Dress",
        price: 79.99,
        description: "Bright and cheerful dress perfect for spreading joy",
        emotions: ["happy", "energetic"],
        emoji: "👗",
        image: ""
    },
    {
        id: 2,
        name: "Cozy Knit Blanket",
        price: 49.99,
        description: "Soft and warm blanket for ultimate comfort",
        emotions: ["cozy", "calm"],
        emoji: "🧶",
        image: ""
    },
    {
        id: 3,
        name: "Adventure Hiking Boots",
        price: 129.99,
        description: "Durable boots for your next outdoor expedition",
        emotions: ["adventurous", "energetic"],
        emoji: "🥾",
        image: ""
    },
    {
        id: 4,
        name: "Romantic Rose Perfume",
        price: 89.99,
        description: "Enchanting fragrance for special moments",
        emotions: ["romantic", "happy"],
        emoji: "🌹",
        image: ""
    },
    {
        id: 5,
        name: "Meditation Cushion Set",
        price: 39.99,
        description: "Find your inner peace with this comfortable set",
        emotions: ["calm"],
        emoji: "🧘",
        image: ""
    },
    {
        id: 6,
        name: "Party LED Light Strip",
        price: 34.99,
        description: "Transform any space into a celebration",
        emotions: ["excited", "happy", "energetic"],
        emoji: "💡",
        image: ""
    },
    {
        id: 7,
        name: "Luxury Spa Gift Set",
        price: 64.99,
        description: "Pamper yourself with premium spa products",
        emotions: ["calm", "cozy", "romantic"],
        emoji: "🧴",
        image: ""
    },
    {
        id: 8,
        name: "Vintage Polaroid Camera",
        price: 119.99,
        description: "Capture memories with retro charm",
        emotions: ["happy", "romantic", "adventurous"],
        emoji: "📷",
        image: ""
    },
    {
        id: 9,
        name: "Energy Smoothie Maker",
        price: 59.99,
        description: "Blend your way to a healthier lifestyle",
        emotions: ["energetic", "happy"],
        emoji: "🥤",
        image: ""
    },
    {
        id: 10,
        name: "Fireplace Scented Candles",
        price: 29.99,
        description: "Create a warm and inviting atmosphere",
        emotions: ["cozy", "calm", "romantic"],
        emoji: "🕯️",
        image: ""
    },
    {
        id: 11,
        name: "Concert VIP Tickets",
        price: 199.99,
        description: "Experience live music like never before",
        emotions: ["excited", "energetic", "happy"],
        emoji: "🎫",
        image: ""
    },
    {
        id: 12,
        name: "Love Letter Stationery Kit",
        price: 24.99,
        description: "Express your feelings with elegant paper",
        emotions: ["romantic", "calm"],
        emoji: "💌",
        image: ""
    },
    {
        id: 13,
        name: "Travel Backpack Pro",
        price: 89.99,
        description: "Your perfect companion for world exploration",
        emotions: ["adventurous", "excited"],
        emoji: "🎒",
        image: ""
    },
    {
        id: 14,
        name: "Premium Coffee Collection",
        price: 44.99,
        description: "Wake up to the finest coffee blends",
        emotions: ["energetic", "cozy"],
        emoji: "☕",
        image: ""
    },
    {
        id: 15,
        name: "Wireless Dance Speaker",
        price: 79.99,
        description: "Feel the rhythm with powerful sound",
        emotions: ["excited", "energetic", "happy"],
        emoji: "🔊",
        image: ""
    },
    {
        id: 16,
        name: "Silk Pajama Set",
        price: 69.99,
        description: "Sleep in luxurious comfort",
        emotions: ["cozy", "calm"],
        emoji: "👔",
        image: ""
    },
    {
        id: 17,
        name: "Mountain Bike Elite",
        price: 599.99,
        description: "Conquer trails with confidence",
        emotions: ["adventurous", "energetic", "excited"],
        emoji: "🚵",
        image: ""
    },
    {
        id: 18,
        name: "Heart-Shaped Jewelry Box",
        price: 34.99,
        description: "Store your precious memories safely",
        emotions: ["romantic", "happy"],
        emoji: "💎",
        image: ""
    },
    {
        id: 19,
        name: "Yoga Mat Premium",
        price: 54.99,
        description: "Find balance and flexibility",
        emotions: ["calm", "energetic"],
        emoji: "🧘‍♀️",
        image: ""
    },
    {
        id: 20,
        name: "Gourmet Chocolate Box",
        price: 39.99,
        description: "Indulge in artisanal sweetness",
        emotions: ["happy", "romantic", "cozy"],
        emoji: "🍫",
        image: ""
    },
    {
        id: 21,
        name: "Gaming Headset RGB",
        price: 99.99,
        description: "Immersive audio for epic gaming sessions",
        emotions: ["excited", "energetic"],
        emoji: "🎮",
        image: ""
    },
    {
        id: 22,
        name: "Aromatherapy Diffuser",
        price: 44.99,
        description: "Fill your space with soothing scents",
        emotions: ["calm", "cozy"],
        emoji: "🌸",
        image: ""
    },
    {
        id: 23,
        name: "Champagne & Glasses Set",
        price: 79.99,
        description: "Celebrate life's special moments",
        emotions: ["romantic", "excited", "happy"],
        emoji: "🍾",
        image: ""
    },
    {
        id: 24,
        name: "Rock Climbing Gear Kit",
        price: 149.99,
        description: "Reach new heights safely",
        emotions: ["adventurous", "excited"],
        emoji: "🧗",
        image: ""
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
