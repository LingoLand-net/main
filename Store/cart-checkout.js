(function () {
    const elements = {
        items: document.getElementById('checkout-cart-items'),
        subtotal: document.getElementById('checkout-subtotal'),
        total: document.getElementById('checkout-total'),
        form: document.getElementById('checkout-form'),
        submit: document.getElementById('checkout-submit')
    };

    let cartInstance = null;
    let waitingForClear = false;
    let initialized = false;

    function renderCart(items, subtotal) {
        if (!elements.items) return;

        if (!Array.isArray(items) || !items.length) {
            elements.items.innerHTML = `
                <div class="checkout-empty">
                    Your cart is empty. <a href="/Store/" style="color:#007f83;font-weight:700;">Browse the store</a> to add resources.
                </div>
            `;
            disableSubmit(true);
        } else {
            elements.items.innerHTML = items.map((item) => {
                const image = item.image || '../assets/img/logo.png';
                const quantityLine = `${item.quantity} × ${Utils.formatPrice(item.price)}`;
                const lineTotal = Utils.formatPrice(item.price * item.quantity);
                return `
                    <div class="checkout-item">
                        <img src="${image}" alt="${item.name}" onerror="this.onerror=null;this.src='../assets/img/logo.png';">
                        <div>
                            <h3>${item.name}</h3>
                            <p>${quantityLine}</p>
                        </div>
                        <span>${lineTotal}</span>
                    </div>
                `;
            }).join('');
            disableSubmit(false);
        }

        if (elements.subtotal) {
            elements.subtotal.textContent = Utils.formatPrice(subtotal || 0);
        }
        if (elements.total) {
            elements.total.textContent = Utils.formatPrice(subtotal || 0);
        }
    }

    function disableSubmit(state) {
        if (!elements.submit) return;
        elements.submit.disabled = state;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!cartInstance) return;

        const items = cartInstance.getItems();
        if (!items.length) {
            cartInstance.showToast?.('Add a product before checking out.', 'warning');
            return;
        }

        const formData = new FormData(elements.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const country = formData.get('country');
        const address = formData.get('personaladdress') || '';
        const notes = (formData.get('notes') || '').toString().trim();
        const combinedAddress = notes ? `${address}\nNotes: ${notes}` : address;

        waitingForClear = true;
        disableSubmit(true);

        cartInstance.sendProductToGoogleSheets(
            name,
            email,
            phone,
            country,
            combinedAddress,
            items
        );

        setTimeout(() => {
            if (!waitingForClear) {
                disableSubmit(false);
            }
        }, 3200);
    }

    function attachFormHandlers() {
        if (!elements.form) return;
        elements.form.addEventListener('submit', handleSubmit);
    }

    function bootstrap(cart) {
        if (initialized) return;
        initialized = true;
        cartInstance = cart;
        attachFormHandlers();
        renderCart(cartInstance.getItems(), cartInstance.getSubtotal());
    }

    document.addEventListener('shoppingcart:ready', (event) => {
        bootstrap(event.detail);
    });

    document.addEventListener('shoppingcart:updated', (event) => {
        if (!cartInstance) return;
        const detail = event.detail || { items: [], subtotal: 0 };
        renderCart(detail.items, detail.subtotal);

        if (waitingForClear && detail.items.length === 0) {
            elements.form?.reset();
            waitingForClear = false;
            disableSubmit(true);
        }
    });

    if (window.shoppingCart) {
        bootstrap(window.shoppingCart);
    }
})();
