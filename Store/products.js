class ProductCatalog {
    constructor(cart) {
        this.cart = cart;
        this.products = (Array.isArray(window.STORE_PRODUCTS) ? window.STORE_PRODUCTS : []).map((product) => ({
            ...product,
            image: product.images?.[0] ?? '../assets/img/logo.png'
        }));
        this.filteredProducts = [...this.products];
        this.activeFilter = 'all';
        this.searchTerm = '';
        this.dom = {
            grid: null,
            filters: [],
            searchInput: null,
            scrollButton: null
        };
    }

    init() {
        this.cacheDom();
        this.bindEvents();
        this.renderProducts();
    }

    cacheDom() {
        this.dom.grid = document.getElementById('products-grid');
        this.dom.filters = Array.from(document.querySelectorAll('[data-filter]'));
        this.dom.searchInput = document.getElementById('search-input');
        this.dom.scrollButton = document.getElementById('scroll-to-products');
    }

    bindEvents() {
        if (this.dom.scrollButton) {
            this.dom.scrollButton.addEventListener('click', () => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            });
        }

        if (this.dom.searchInput) {
            const handler = Utils.debounce((event) => {
                this.searchTerm = event.target.value.trim().toLowerCase();
                this.renderProducts();
            }, 220);
            this.dom.searchInput.addEventListener('input', handler);
        }

        this.dom.filters.forEach((button) => {
            button.addEventListener('click', () => {
                this.setActiveFilter(button.dataset.filter);
            });
        });

        this.dom.grid?.addEventListener('click', (event) => {
            const actionButton = event.target.closest('[data-action]');
            if (!actionButton) return;

            const productId = actionButton.dataset.id;
            const product = this.getProductById(productId);
            if (!product) return;

            if (actionButton.dataset.action === 'add') {
                this.cart.addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    grade: product.grade,
                    image: product.image
                });
            }

        });
    }

    setActiveFilter(filterValue) {
        this.activeFilter = filterValue;
        this.dom.filters.forEach((button) => {
            button.classList.toggle('active', button.dataset.filter === filterValue);
        });
        this.renderProducts();
    }

    renderProducts() {
        if (!this.dom.grid) return;

        const products = this.getFilteredProducts();
        if (!products.length) {
            this.dom.grid.innerHTML = this.renderEmptyState();
            return;
        }

        this.dom.grid.innerHTML = products.map((product) => this.renderCard(product)).join('');
    }

    renderCard(product) {
        const thumbnail = product.image;
        const badgeCopy = this.buildPrimaryBadge(product);
        const features = (product.highlights || []).slice(0, 3);
        return `
            <article class="product-card group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div class="relative mb-5 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <img src="${thumbnail}"
                        alt="${product.name}"
                        class="aspect-[4/5] w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                        onerror="this.onerror=null;this.src='../assets/img/logo.png';">
                    <div class="absolute left-4 top-4 flex flex-wrap gap-2">
                        ${badgeCopy}
                    </div>
                </div>
                <div class="flex flex-1 flex-col">
                    <div class="space-y-2">
                        <h3 class="text-lg font-semibold text-slate-900">${product.name}</h3>
                        <p class="text-sm text-slate-600">${product.summary}</p>
                    </div>
<div class="mt-4 flex items-center justify-between bg-white rounded-lg p-3 border border-slate-200">
    <span class="text-xl font-bold text-teal-600">
        ${typeof Utils !== 'undefined' && typeof Utils.formatPrice === 'function' ? Utils.formatPrice(product.price ?? 0) : (product.price ?? '')}
    </span>
    <span class="text-xs font-bold uppercase tracking-widest text-slate-600 border border-slate-300 px-2 py-1 rounded">
        ${product.gradeLabel ?? ''}
    </span>
</div>
                    <ul class="mt-4 space-y-2 text-xs text-slate-600">
                        ${features.map((feature) => `<li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-teal-400"></span>${feature}</li>`).join('')}
                    </ul>
                    <div class="mt-6 flex flex-col gap-3">
                        <button class="rounded-full bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
                            data-action="add"
                            data-id="${product.id}">
                            Add to cart
                        </button>
                        <a class="inline-flex items-center justify-center rounded-full border border-teal-500 px-4 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-50"
                            href="product.html?id=${product.id}">
                            View details
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    renderEmptyState() {
        return `
            <div class="empty-state col-span-full">
                <div class="mb-3 flex justify-center">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 3h2l.4 2m0 0H21l-2.18 8.73a2 2 0 01-1.94 1.52H8.12m-2.72-12L4 7m4.12 8.25a2 2 0 102.76 2.76m7.24-5.01a2 2 0 102.76 2.76" />
                        </svg>
                    </div>
                </div>
                <h4 class="text-lg font-semibold text-slate-900">No resources match your search.</h4>
                <p class="mt-2 text-sm text-slate-600">Try another keyword or reset the grade filter to see the full collection.</p>
            </div>
        `;
    }

    buildPrimaryBadge(product) {
        const gradeBadge = `<span class="inline-flex items-center rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-600">Grade <span class="ml-1">${product.gradeLabel}</span></span>`;
        const typeBadge = product.type === 'bundle'
            ? '<span class="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-600">Bundle</span>'
            : '';
        const bestsellerBadge = product.bestseller
            ? '<span class="inline-flex items-center rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-600">Teacher pick</span>'
            : '';
        return [gradeBadge, typeBadge, bestsellerBadge].filter(Boolean).join('');
    }

    getFilteredProducts() {
        const keyword = this.searchTerm;
        return this.products.filter((product) => {
            const matchesFilter = this.activeFilter === 'all'
                ? true
                : this.activeFilter === 'bundle'
                    ? product.type === 'bundle'
                    : product.grade === this.activeFilter;

            const haystack = [
                product.name,
                product.summary,
                ...(product.tags || []),
                ...(product.highlights || [])
            ].join(' ').toLowerCase();

            const matchesSearch = keyword ? haystack.includes(keyword) : true;

            return matchesFilter && matchesSearch;
        });
    }

    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }
}

window.ProductCatalog = ProductCatalog;