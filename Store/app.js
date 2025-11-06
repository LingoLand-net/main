// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    window.shoppingCart = new ShoppingCart();
    window.shoppingCart.init();

    document.dispatchEvent(new CustomEvent('shoppingcart:ready', {
        detail: window.shoppingCart
    }));

    window.productCatalog = new ProductCatalog(window.shoppingCart);
    window.productCatalog.init();

    document.dispatchEvent(new CustomEvent('productcatalog:ready', {
        detail: window.productCatalog
    }));

    window.checkout = () => window.shoppingCart.checkout();
});