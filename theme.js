(function () {
    var SUN_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line></svg>';
    var MOON_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    function getPreferredTheme() {
        try {
            var stored = localStorage.getItem("theme");
            if (stored === "light" || stored === "dark") return stored;
        } catch (e) {}
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyIcon(theme) {
        var btn = document.getElementById("theme-toggle");
        if (!btn) return;
        // Icon shows what clicking it switches to: moon while light, sun while dark.
        btn.innerHTML = theme === "dark" ? SUN_ICON : MOON_ICON;
        btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    var theme = getPreferredTheme();
    // Set the attribute immediately (script is render-blocking) so the page never flashes the wrong theme.
    document.documentElement.setAttribute("data-theme", theme);

    document.addEventListener("DOMContentLoaded", function () {
        applyIcon(theme);
        var btn = document.getElementById("theme-toggle");
        if (!btn) return;
        btn.addEventListener("click", function () {
            theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
            try {
                localStorage.setItem("theme", theme);
            } catch (e) {}
            document.documentElement.setAttribute("data-theme", theme);
            applyIcon(theme);
        });
    });
})();
