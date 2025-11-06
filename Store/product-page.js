(function () {
    const selectors = {
        contentSection: document.getElementById('product-content'),
        descriptionSection: document.getElementById('product-description-section'),
        emptyState: document.getElementById('product-empty'),
        breadcrumbName: document.getElementById('product-breadcrumb-name'),
        imageMain: document.getElementById('product-image-main'),
        thumbnails: document.getElementById('product-thumbnails'),
        grade: document.getElementById('product-grade'),
        name: document.getElementById('product-name'),
        summary: document.getElementById('product-summary'),
        price: document.getElementById('product-price'),
        sku: document.getElementById('product-sku'),
        tags: document.getElementById('product-tags'),
        highlights: document.getElementById('product-highlights'),
        includes: document.getElementById('product-includes-list'),
        description: document.getElementById('product-description'),
        shipping: document.getElementById('product-shipping'),
        addToCart: document.getElementById('product-add-to-cart')
    };

    let activeProduct = null;
    let shoppingCartInstance = null;
    let initialized = false;

    // Price formatting fallback if Utils is not available
    const formatPrice = (price) => {
        if (typeof window.Utils?.formatPrice === 'function') {
            return window.Utils.formatPrice(price);
        }
        // Fallback price formatting
        if (typeof price !== 'number') return '0 د.ت';
        return `${price.toFixed(2)} د.ت`;
    };

    function getProductFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        if (!productId) return null;
        
        const catalog = Array.isArray(window.STORE_PRODUCTS) ? window.STORE_PRODUCTS : [];
        return catalog.find((product) => product.id === productId);
    }

    function renderThumbnails(images) {
        const container = selectors.thumbnails;
        if (!container) return;
        container.innerHTML = '';

        // Ensure we have at least one image
        const imageList = images && images.length ? images : ['../assets/img/logo.png'];

        imageList.forEach((image, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'product-thumb';
            if (index === 0) {
                button.classList.add('active');
            }
            button.innerHTML = `
                <img src="${image}" alt="Product preview ${index + 1}" onerror="this.onerror=null;this.src='../assets/img/logo.png';">
            `;
            button.addEventListener('click', () => {
                setMainImage(image);
                // Remove active class from all thumbnails
                Array.from(container.children).forEach((child) => child.classList.remove('active'));
                // Add active class to clicked thumbnail
                button.classList.add('active');
            });
            container.appendChild(button);
        });
    }

    function setMainImage(source) {
        if (!selectors.imageMain) return;
        selectors.imageMain.src = source;
    }

    function renderHighlights(highlights) {
        const list = selectors.highlights;
        if (!list) return;
        list.innerHTML = '';
        
        if (!Array.isArray(highlights) || !highlights.length) return;
        
        highlights.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<span></span><p>${item}</p>`;
            list.appendChild(li);
        });
    }

    function renderIncludes(includes) {
        const list = selectors.includes;
        if (!list) return;
        list.innerHTML = '';
        
        if (!Array.isArray(includes) || !includes.length) return;
        
        includes.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }

    function renderTags(tags) {
        const wrapper = selectors.tags;
        if (!wrapper) return;
        wrapper.innerHTML = '';
        
        if (!Array.isArray(tags) || !tags.length) return;
        
        tags.forEach((tag) => {
            const span = document.createElement('span');
            span.className = 'product-tag';
            span.textContent = tag;
            wrapper.appendChild(span);
        });
    }

    function showProduct(product) {
        // Hide empty state and show content
        if (selectors.emptyState) selectors.emptyState.style.display = 'none';
        if (selectors.contentSection) selectors.contentSection.style.display = '';
        if (selectors.descriptionSection) selectors.descriptionSection.style.display = '';

        const gradeLabel = product.gradeLabel || product.grade || 'Resource';
        const primaryImage = product.images?.[0] || '../assets/img/logo.png';
        const productImages = Array.isArray(product.images) ? product.images : [primaryImage];

        // Update page title and breadcrumb
        document.title = `${product.name} | LingoLand Store`;
        if (selectors.breadcrumbName) selectors.breadcrumbName.textContent = product.name;

        // Update product details
        if (selectors.grade) selectors.grade.textContent = `Grade ${gradeLabel}`;
        if (selectors.name) selectors.name.textContent = product.name;
        if (selectors.summary) selectors.summary.textContent = product.summary || '';
        if (selectors.price) selectors.price.textContent = formatPrice(product.price);
        if (selectors.sku) selectors.sku.textContent = product.sku ? `SKU: ${product.sku}` : '';
        if (selectors.description) selectors.description.textContent = product.description || '';
        if (selectors.shipping) selectors.shipping.textContent = product.shippingNote || '';

        // Render images and content
        setMainImage(primaryImage);
        renderThumbnails(productImages);
        renderHighlights(product.highlights);
        renderIncludes(product.includes);
        renderTags(product.tags);
    }

    function showNotFound() {
        if (selectors.emptyState) selectors.emptyState.style.display = '';
        if (selectors.contentSection) selectors.contentSection.style.display = 'none';
        if (selectors.descriptionSection) selectors.descriptionSection.style.display = 'none';
    }

    function handleAddToCart() {
        if (!selectors.addToCart || !shoppingCartInstance || !activeProduct) return;
        
        // Remove existing event listeners to prevent duplicates
        selectors.addToCart.replaceWith(selectors.addToCart.cloneNode(true));
        const newAddToCart = document.getElementById('product-add-to-cart');
        
        newAddToCart.addEventListener('click', () => {
            if (!activeProduct) return;
            
            shoppingCartInstance.addItem({
                id: activeProduct.id,
                name: activeProduct.name,
                price: activeProduct.price,
                grade: activeProduct.grade,
                image: activeProduct.images?.[0] || '../assets/img/logo.png'
            });
            
            // Optional: Show feedback to user
            if (window.Swal) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added to cart!',
                    text: `${activeProduct.name} has been added to your cart`,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    }

    function init(cartInstance) {
        if (initialized) return;
        initialized = true;
        shoppingCartInstance = cartInstance;

        activeProduct = getProductFromQuery();
        if (!activeProduct) {
            showNotFound();
            return;
        }

        showProduct(activeProduct);
        handleAddToCart();
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Listen for cart ready event or use existing cart
            document.addEventListener('shoppingcart:ready', (event) => {
                init(event.detail);
            });

            if (window.shoppingCart) {
                init(window.shoppingCart);
            } else {
                // If no cart is available after DOM load, show product anyway
                activeProduct = getProductFromQuery();
                if (activeProduct) {
                    showProduct(activeProduct);
                } else {
                    showNotFound();
                }
            }
        });
    } else {
        // DOM already loaded
        document.addEventListener('shoppingcart:ready', (event) => {
            init(event.detail);
        });

        if (window.shoppingCart) {
            init(window.shoppingCart);
        } else {
            activeProduct = getProductFromQuery();
            if (activeProduct) {
                showProduct(activeProduct);
            } else {
                showNotFound();
            }
        }
    }
})();