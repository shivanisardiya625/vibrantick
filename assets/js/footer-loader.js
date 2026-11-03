/**
 * Vibrantick Infotech Solutions - Global Footer Auto-Loader
 * Automatically loads 'footer.html' into any element with:
 * id="global-footer", id="site-footer", or [data-include-footer]
 */
(function () {
  function loadGlobalFooter() {
    var targets = document.querySelectorAll(
      "#global-footer, #site-footer, [data-include-footer], .global-footer-placeholder"
    );
    if (!targets.length) return;

    // Detect if running on file:// or http(s)://
    var isHttp = window.location.protocol.indexOf("http") === 0;

    if (isHttp && window.fetch) {
      fetch("footer.html")
        .then(function (response) {
          if (!response.ok) throw new Error("Status " + response.status);
          return response.text();
        })
        .then(function (html) {
          targets.forEach(function (el) {
            el.outerHTML = html;
          });
        })
        .catch(function () {
          fallbackJquery(targets);
        });
    } else {
      fallbackJquery(targets);
    }
  }

  function fallbackJquery(targets) {
    if (window.jQuery) {
      window.jQuery(targets).each(function () {
        var $el = window.jQuery(this);
        $el.load("footer.html", function (response, status) {
          if (status === "success") {
            $el.children().unwrap();
          }
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadGlobalFooter);
  } else {
    loadGlobalFooter();
  }
})();
