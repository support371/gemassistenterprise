(function () {
    'use strict';

    function initVercelAnalytics() {
        if (typeof window === 'undefined') return;
        var isVercel = window.location.hostname.endsWith('.vercel.app') ||
            document.querySelector('meta[name="x-vercel-deployment-url"]') !== null;
        if (!isVercel) return;

        import('@vercel/analytics').then(function (module) {
            if (module.inject && typeof module.inject === 'function') {
                module.inject();
            }
        }).catch(function () {});
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVercelAnalytics);
    } else {
        initVercelAnalytics();
    }
})();
