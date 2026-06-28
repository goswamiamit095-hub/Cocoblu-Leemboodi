
/*==================================================
    COCOBLU BI ENTERPRISE
    navigation.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    Navigation.init();

});

const Navigation = {

    sidebar: null,

    toggleBtn: null,

    menuGroups: [],

    submenuLinks: [],

    pageTitle: null,

    breadcrumb: null,

    themeBtn: null,

    scrollBtn: null,

    init() {

        this.cacheDOM();

        this.bindEvents();

        this.restoreTheme();

        this.restoreSidebar();

    },

    cacheDOM() {

        this.sidebar = document.querySelector(".sidebar");

        this.toggleBtn = document.getElementById("toggleSidebar");

        this.menuGroups = document.querySelectorAll(".menu-group");

        this.submenuLinks = document.querySelectorAll(".submenu a");

        this.pageTitle = document.getElementById("pageTitle");

        this.breadcrumb = document.getElementById("breadcrumbPage");

        this.themeBtn = document.getElementById("themeToggle");

        this.scrollBtn = document.getElementById("scrollTopBtn");

    },

    bindEvents() {

        /* Sidebar Toggle */

        if (this.toggleBtn) {

            this.toggleBtn.addEventListener("click", () => {

                this.toggleSidebar();

            });

        }

        /* Menu */

        this.menuGroups.forEach(group => {

            const btn = group.querySelector(".menu-btn");

            if (!btn) return;

            btn.addEventListener("click", () => {

                this.toggleMenu(group);

            });

        });

        /* Links */

        this.submenuLinks.forEach(link => {

            link.addEventListener("click", (e) => {

                e.preventDefault();

                this.activateLink(link);

            });

        });

        /* Theme */

        if (this.themeBtn) {

            this.themeBtn.addEventListener("click", () => {

                this.toggleTheme();

            });

        }

        /* Scroll */

        window.addEventListener("scroll", () => {

            this.handleScroll();

        });

        if (this.scrollBtn) {

            this.scrollBtn.addEventListener("click", () => {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            });

        }

    },
    /*====================================
            SIDEBAR
    ====================================*/

    toggleSidebar() {

        this.sidebar.classList.toggle("collapsed");

        localStorage.setItem(

            "sidebar",

            this.sidebar.classList.contains("collapsed")

                ? "collapsed"

                : "expanded"

        );

    },

    restoreSidebar() {

        const state = localStorage.getItem("sidebar");

        if (state === "collapsed") {

            this.sidebar.classList.add("collapsed");

        }

    },

    /*====================================
            MENU
    ====================================*/

    toggleMenu(currentGroup) {

        /* Only One Menu Open */

        this.menuGroups.forEach(group => {

            if (group !== currentGroup) {

                group.classList.remove("open");

                const btn = group.querySelector(".menu-btn");

                if (btn) {

                    btn.classList.remove("active");

                }

            }

        });

        currentGroup.classList.toggle("open");

        const currentBtn = currentGroup.querySelector(".menu-btn");

        currentBtn.classList.toggle("active");

    },

    /*====================================
            ACTIVE LINK
    ====================================*/

    activateLink(link) {

        this.submenuLinks.forEach(item => {

            item.classList.remove("active");

        });

        link.classList.add("active");

        const title = link.textContent.trim();

        if (this.pageTitle) {

            this.pageTitle.innerText = title;

        }

        if (this.breadcrumb) {

            this.breadcrumb.innerText = title;

        }

        /* Future Router */

        const page = link.dataset.page;

        if (window.Router) {

            Router.load(page);

        }

    },

    /*====================================
            THEME
    ====================================*/

    toggleTheme() {

        document.body.classList.toggle("dark");

        const mode = document.body.classList.contains("dark")

            ? "dark"

            : "light";

        localStorage.setItem("theme", mode);

        this.updateThemeIcon();

    },

    restoreTheme() {

        const theme = localStorage.getItem("theme");

        if (theme === "dark") {

            document.body.classList.add("dark");

        }
        /*====================================
            SCROLL BUTTON
    ====================================*/

    handleScroll() {

        if (!this.scrollBtn) return;

        if (window.scrollY > 250) {

            this.scrollBtn.style.display = "flex";

        } else {

            this.scrollBtn.style.display = "none";

        }

    },

    /*====================================
            PAGE LOADER
    ====================================*/

    showLoader() {

        const loader = document.getElementById("pageLoader");

        if (!loader) return;

        loader.style.display = "flex";

    },

    hideLoader() {

        const loader = document.getElementById("pageLoader");

        if (!loader) return;

        loader.style.display = "none";

    },

    /*====================================
            TOAST
    ====================================*/

    toast(message = "Success", type = "success") {

        const toast = document.getElementById("toast");

        const text = document.getElementById("toastMessage");

        if (!toast || !text) return;

        toast.className = "toast " + type + " show";

        text.innerHTML = message;

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    },

    /*====================================
            MOBILE SIDEBAR
    ====================================*/

    closeMobileSidebar() {

        if (window.innerWidth > 992) return;

        this.sidebar.classList.remove("show");

        const overlay = document.querySelector(".sidebar-overlay");

        if (overlay) {

            overlay.classList.remove("show");

        }

    },

    openMobileSidebar() {

        if (window.innerWidth > 992) return;

        this.sidebar.classList.add("show");

        const overlay = document.querySelector(".sidebar-overlay");

        if (overlay) {

            overlay.classList.add("show");

        }

    },

    /*====================================
            UTILITIES
    ====================================*/

    setTitle(title) {

        if (this.pageTitle)

            this.pageTitle.innerHTML = title;

        if (this.breadcrumb)

            this.breadcrumb.innerHTML = title;

    },

    getCurrentPage() {

        const active = document.querySelector(".submenu a.active");

        if (!active) return "home";

        return active.dataset.page;

    }

};

/*=========================================
        GLOBAL SHORTCUTS
=========================================*/

window.showLoader = () => Navigation.showLoader();

window.hideLoader = () => Navigation.hideLoader();

window.showToast = (msg, type = "success") =>
    Navigation.toast(msg, type);

/*=========================================
        AUTO HIDE LOADER
=========================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        Navigation.hideLoader();

    }, 700);

});

/*=========================================
        RESPONSIVE CHECK
=========================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        Navigation.sidebar.classList.remove("show");

        const overlay = document.querySelector(".sidebar-overlay");

        if (overlay)

            overlay.classList.remove("show");

    }

});

/*=========================================
        END OF FILE
=========================================*/