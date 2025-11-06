const Utils = {
    formatPrice(value) {
        const amount = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, ''));
        if (!Number.isFinite(amount)) {
            return '0 د.ت';
        }
        return `${amount.toFixed(3)} د.ت`;
    },

    debounce(fn, wait = 200) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(null, args), wait);
        };
    },

    loadFromStorage(key, fallback) {
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            console.error('Failed to load from storage', error);
            return fallback;
        }
    },

    saveToStorage(key, value) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save to storage', error);
        }
    }
};

window.Utils = Utils;
