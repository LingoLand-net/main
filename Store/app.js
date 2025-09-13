// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize shopping cart
    window.shoppingCart = new ShoppingCart();
    window.shoppingCart.init();
    
    // Initialize product manager
    ProductManager.init();
    
    // Set up global checkout function
    window.checkout = () => window.shoppingCart.checkout();
});