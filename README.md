# Shop Emotions - E-Commerce Website

An innovative e-commerce website where you can shop based on your emotions! Find products that match your mood and enhance your emotional well-being.

## Features

### Emotion-Based Shopping
- Filter products by 7 different emotions:
  - Happy
  - Calm
  - Excited
  - Romantic
  - Energetic
  - Cozy
  - Adventurous

### Product Catalog
- 24 curated products across various categories
- Each product tagged with relevant emotions
- Beautiful emoji-based product images
- Detailed product descriptions

### Shopping Cart
- Add products to cart with one click
- Adjust quantities easily
- Remove items from cart
- Real-time cart total calculation
- Persistent cart (saves to local storage)

### User Experience
- Modern, responsive design
- Smooth animations and transitions
- Mobile-friendly interface
- Sorting options (price, name)
- Keyboard shortcuts (ESC to close cart)

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Node.js and npm for local development server

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thu81212/shop-emotions.git
cd shop-emotions
```

2. Open `index.html` in your browser, or use a local server:

**Option A: Using Python**
```bash
python3 -m http.server 8080
```

**Option B: Using Node.js**
```bash
npm install -g http-server
npm start
```

3. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
shop-emotions/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── app.js             # Application logic and cart functionality
├── products.js        # Product database
├── package.json       # Project metadata
├── .gitignore        # Git ignore file
└── README.md         # This file
```

## How It Works

### Emotion Filtering
Click on any emotion button at the top of the page to filter products that match that mood. The product catalog will instantly update to show only relevant items.

### Adding to Cart
1. Browse products by emotion or view all products
2. Click "Add to Cart" on any product
3. View your cart by clicking the cart button in the header
4. Adjust quantities or remove items as needed
5. Click "Proceed to Checkout" to complete your purchase

### Sorting Products
Use the sort dropdown to organize products by:
- Price: Low to High
- Price: High to Low
- Name: A to Z

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Interactive functionality
- **Local Storage API**: Persistent cart storage

## Features in Detail

### Responsive Design
The website is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

### Color Scheme
- Primary: Indigo (#6366f1)
- Secondary: Pink (#ec4899)
- Background: Light gray (#f8fafc)
- Text: Dark slate (#1e293b)

### Accessibility
- Semantic HTML elements
- High contrast colors
- Keyboard navigation support
- Clear visual feedback

## Future Enhancements

Potential features for future versions:
- User authentication and accounts
- Product reviews and ratings
- Wishlist functionality
- Multiple payment methods
- Order history
- Product recommendations based on emotion patterns
- Advanced search functionality
- Social sharing features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by the concept of emotional intelligence in shopping
- Built with love and emotions ❤️

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Happy Shopping! 🛍️**

*Remember: Shop with your emotions, not just your wallet.*
