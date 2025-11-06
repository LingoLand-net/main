class ShoppingCart {
    static STORAGE_KEY = 'lingoland-cart-v1';

    constructor() {
        this.storageKey = ShoppingCart.STORAGE_KEY;
        this.items = [];
        this.dom = {
            toggle: null,
            panel: null,
            items: null,
            subtotal: null,
            counter: null,
            checkout: null,
            closeButtons: []
        };
    }

    init() {
        this.cacheDom();
        this.items = Utils.loadFromStorage(this.storageKey, []);
        this.bindEvents();
        this.render();
        window.addEventListener('storage', () => this.syncFromStorage());
    }

    cacheDom() {
        this.dom.toggle = document.getElementById('cart-toggle');
        this.dom.panel = document.getElementById('cart-panel');
        this.dom.items = document.getElementById('cart-items');
        this.dom.subtotal = document.getElementById('cart-subtotal');
        this.dom.counter = document.getElementById('cart-count');
        this.dom.checkout = document.getElementById('checkout-btn');
        this.dom.closeButtons = Array.from(this.dom.panel?.querySelectorAll('[data-cart-close]') || []);
    }

    bindEvents() {
        this.dom.toggle?.addEventListener('click', () => this.togglePanel(true));

        this.dom.closeButtons.forEach((button) => {
            button.addEventListener('click', () => this.togglePanel(false));
        });

        this.dom.panel?.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.togglePanel(false);
            }
        });

        this.dom.panel?.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement && event.target.hasAttribute('data-cart-close')) {
                this.togglePanel(false);
            }
        });

        this.dom.items?.addEventListener('click', (event) => {
            const button = event.target.closest('[data-action]');
            if (!button) return;

            const productId = button.dataset.id;
            if (!productId) return;

            switch (button.dataset.action) {
                case 'increase':
                    this.updateQuantity(productId, this.getQuantity(productId) + 1);
                    break;
                case 'decrease':
                    this.updateQuantity(productId, this.getQuantity(productId) - 1);
                    break;
                case 'remove':
                    this.removeItem(productId);
                    break;
                default:
                    break;
            }
        });

        this.dom.checkout?.addEventListener('click', () => this.checkout());
    }

    syncFromStorage() {
        this.items = Utils.loadFromStorage(this.storageKey, []);
        this.render();
    }

    togglePanel(show) {
        if (!this.dom.panel) return;
        this.dom.panel.classList.toggle('active', show);
        document.body.classList.toggle('cart-open', show);
        if (show) {
            this.dom.panel.setAttribute('aria-hidden', 'false');
            this.dom.panel.focus?.();
        } else {
            this.dom.panel.setAttribute('aria-hidden', 'true');
        }
    }

    addItem(product) {
        const existing = this.items.find((item) => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        this.persist();
        this.render();
        this.showToast(`${product.name}  added to cart.`);
    }

    removeItem(productId) {
        this.items = this.items.filter((item) => item.id !== productId);
        this.persist();
        this.render();
    }

    getQuantity(productId) {
        return this.items.find((item) => item.id === productId)?.quantity ?? 0;
    }

    updateQuantity(productId, nextQuantity) {
        if (nextQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        const item = this.items.find((entry) => entry.id === productId);
        if (!item) return;
        item.quantity = Math.min(nextQuantity, 12);
        this.persist();
        this.render();
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    render() {
        if (this.dom.counter) {
            this.dom.counter.textContent = String(this.getTotalItems());
        }

        if (!this.dom.items) return;

        if (!this.items.length) {
            this.dom.items.innerHTML = `
                <div class="empty-state text-center text-sm text-slate-500">
                    <p>Your cart is waiting for premium learning resources.</p>
                </div>
            `;
        } else {
            this.dom.items.innerHTML = this.items.map((item) => this.renderLineItem(item)).join('');
        }

        if (this.dom.subtotal) {
            this.dom.subtotal.textContent = Utils.formatPrice(this.getSubtotal());
        }

        document.dispatchEvent(new CustomEvent('shoppingcart:updated', {
            detail: {
                items: this.getItems(),
                subtotal: this.getSubtotal(),
                totalItems: this.getTotalItems()
            }
        }));
    }

    renderLineItem(item) {
        const thumbnail = item.image || item.images?.[0] || '../assets/img/logo.png';
        return `
            <div class="cart-line-item flex gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm" data-id="${item.id}">
                <div class="flex h-20 w-20 flex-none overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <img src="${thumbnail}" alt="${item.name}" class="h-full w-full object-cover"
                        onerror="this.onerror=null;this.src='../assets/img/logo.png';">
                </div>
                <div class="flex min-w-0 flex-1 flex-col gap-3">
                    <div class="flex items-start justify-between gap-2">
                        <div>
                            <p class="text-sm font-semibold text-slate-900">${item.name}</p>
                            <p class="text-xs font-medium uppercase tracking-[0.3em] text-teal-500">${(item.grade ?? 'Resource').toString().toUpperCase()}</p>
                        </div>
                        <button class="text-xs font-semibold text-rose-500 transition hover:text-rose-600" data-action="remove" data-id="${item.id}">Remove</button>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <button class="quantity-chip" data-action="decrease" data-id="${item.id}">-</button>
                            <span class="text-sm font-semibold text-slate-900">${item.quantity}</span>
                            <button class="quantity-chip" data-action="increase" data-id="${item.id}">+</button>
                        </div>
                        <span class="text-sm font-bold text-teal-600">${Utils.formatPrice(item.price * item.quantity)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    checkout() {
        if (!this.items.length) {
            this.showToast('Your cart is empty, add a resource first.', 'warning');
            return;
        }
        this.togglePanel(false);
        window.location.href = 'cart-checkout.html';
    }

    persist() {
        Utils.saveToStorage(this.storageKey, this.items);
    }

    getItems() {
        return this.items.map((item) => ({ ...item }));
    }

    showToast(message, icon = 'success') {
        Swal.fire({
            toast: true,
            icon,
            title: message,
            timer: 1600,
            showConfirmButton: false,
            position: 'bottom',
            background: icon === 'warning' ? '#fef3c7' : '#00aca8',
            color: icon === 'warning' ? '#92400e' : '#ffffff',
            timerProgressBar: true,
        });
    }

    clear() {
        this.items = [];
        this.persist();
        this.render();
    }

    sendProductToGoogleSheets(name, email, phone, country, personaladdress, products) {
        // Show loading state - hide the layout, show the loader
        const checkoutLayout = document.querySelector('.checkout-layout');
        const loadingIndicator = document.querySelector('.checkout-loading');
        const checkoutSummary = document.querySelector('.checkout-summary');
        const checkoutFormCard = document.querySelector('.checkout-form-card');
        
        if (checkoutLayout && loadingIndicator && checkoutSummary && checkoutFormCard) {
            // Hide the summary and form sections
            checkoutSummary.style.display = 'none';
            checkoutFormCard.style.display = 'none';
            // Show the loading indicator
            loadingIndicator.classList.remove('hidden');
            loadingIndicator.classList.add('flex');
        }

        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxfuDX3Ltlz24opTbUeU2JZfh4A2CV-wqvK3lQ7wL5JTYCrWL-G8ptKooAiHVGVNZnDow/exec';
        const xhr = new XMLHttpRequest();

        xhr.open('POST', scriptUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Success - show success message
                    if (loadingIndicator && checkoutFormCard) {
                        // Hide loading indicator
                        loadingIndicator.classList.add('hidden');
                        loadingIndicator.classList.remove('flex');
                        
                        // Show form card and replace with success message
                        checkoutFormCard.style.display = 'block';
                        checkoutFormCard.innerHTML = `
                            <div class="success-message text-center py-8">
                                <div class="success-content">
                                    <div class="mb-4">
                                        <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Order received!</h2>
                                    <p class="text-gray-600">Thank you. Our team will call you to confirm delivery.</p>
                                </div>
                            </div>
                        `;
                        checkoutSummary.style.display = 'block';
                    }
                    
                    // Clear the cart after successful submission
                    this.clear();
                } else {
                    // Error - show error and restore everything
                    if (loadingIndicator && checkoutSummary && checkoutFormCard) {
                        // Hide loading indicator
                        loadingIndicator.classList.add('hidden');
                        loadingIndicator.classList.remove('flex');
                        // Show summary and form sections again
                        checkoutSummary.style.display = 'block';
                        checkoutFormCard.style.display = 'block';
                    }
                    
                    Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text: 'Please try again or contact us directly. We will also receive an alert.',
                        icon: 'error',
                        confirmButtonText: 'Close',
                        background: '#ffffff',
                        color: '#0f172a'
                    });
                }
                
                // Re-enable submit button
                const submitBtn = document.getElementById('checkout-submit');
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            }
        };

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('country', country);
        formData.append('personaladdress', personaladdress);
        formData.append('products', JSON.stringify(products));

        xhr.send(formData);
    }
}

window.ShoppingCart = ShoppingCart;
