/**
 * Hide images that fail to load.
 *
 * Many images referenced by this site (marketplace badges, client logos, some
 * team photos) are not present in the repository. Without this, every one of
 * them renders as a broken-image icon plus its alt text, which breaks the
 * footer/grid layout.
 *
 * The real `src` values are left untouched in the markup, so dropping the
 * correct file into place makes the image reappear with no code change.
 */
(function () {
    'use strict';

    function hide(img) {
        // Hide the innermost meaningful container so no empty gap is left behind.
        var host = null;

        if (img.closest) {
            host = img.closest('li');
            if (!host) { host = img.closest('a.image_btn'); }
        }
        if (!host) { host = img.parentElement; }

        if (host && host !== img && host !== document.body && host.nodeName !== 'BODY') {
            host.style.display = 'none';
        }
        img.style.display = 'none';
    }

    function sweep() {
        var images = document.querySelectorAll('img');

        for (var i = 0; i < images.length; i++) {
            var img = images[i];

            // Skip lazy-loaded images that have not started yet.
            if (!img.getAttribute('src') && !img.getAttribute('data-src') && !img.getAttribute('srcset')) {
                continue;
            }

            img.addEventListener('error', function (e) { hide(e.target); });

            // Already finished loading before this script ran (and failed).
            if (img.complete && img.naturalWidth === 0) {
                hide(img);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sweep);
    } else {
        sweep();
    }
})();
