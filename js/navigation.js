/*==================================================
    COCOBLU BI
    Navigation V2
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    Sidebar.init();

});

const Sidebar = {

    sidebar: null,

    overlay: null,

    toggleButton: null,

    menuGroups: [],

    submenuLinks: [],

    init() {

        this.cacheDOM();

        this.bindEvents();

        this.restoreSidebarState();

        this.restoreActiveMenu();

    },

    cacheDOM() {

        this.sidebar = document.getElementById("sidebar");

        this.overlay = document.querySelector(".sidebar-overlay");

        this.toggleButton = document.getElementById("toggleSidebar");

        this.menuGroups = document.querySelectorAll(".menu-group");

        this.submenuLinks = document.querySelectorAll(".submenu a");

    },

    bindEvents() {

        /*=========================
            Sidebar Toggle
        =========================*/

        if(this.toggleButton){

            this.toggleButton.addEventListener("click",()=>{

                this.toggleSidebar();

            });

        }

        /*=========================
            Overlay Close
        =========================*/

        if(this.overlay){

            this.overlay.addEventListener("click",()=>{

                this.closeMobileSidebar();

            });

        }

        /*=========================
            Menu Click
        =========================*/

        this.menuGroups.forEach(group=>{

            const button = group.querySelector(".menu-btn");

            if(!button) return;

            button.addEventListener("click",()=>{

                this.toggleMenu(group);

            });

        });

        /*=========================
            Active Link
        =========================*/

        this.submenuLinks.forEach(link=>{

            link.addEventListener("click",(e)=>{

                e.preventDefault();

                this.activateLink(link);

            });

        });

    },
    /*==========================================
            DESKTOP / MOBILE TOGGLE
    ==========================================*/

    toggleSidebar() {

        if (window.innerWidth <= 992) {

            this.openMobileSidebar();
            return;

        }

        this.sidebar.classList.toggle("collapsed");

        localStorage.setItem(

            "sidebarState",

            this.sidebar.classList.contains("collapsed")
                ? "collapsed"
                : "expanded"

        );

    },

    /*==========================================
            MOBILE OPEN
    ==========================================*/

    openMobileSidebar() {

        this.sidebar.classList.add("show");

        if (this.overlay) {

            this.overlay.classList.add("show");

        }

    },

    /*==========================================
            MOBILE CLOSE
    ==========================================*/

    closeMobileSidebar() {

        this.sidebar.classList.remove("show");

        if (this.overlay) {

            this.overlay.classList.remove("show");

        }

    },

    /*==========================================
            RESTORE SIDEBAR
    ==========================================*/

    restoreSidebarState() {

        if (window.innerWidth <= 992) return;

        const state = localStorage.getItem("sidebarState");

        if (state === "collapsed") {

            this.sidebar.classList.add("collapsed");

        } else {

            this.sidebar.classList.remove("collapsed");

        }

    },

    /*==========================================
            WINDOW RESIZE
    ==========================================*/

    handleResize() {

        if (window.innerWidth > 992) {

            this.sidebar.classList.remove("show");

            if (this.overlay) {

                this.overlay.classList.remove("show");

            }

            this.restoreSidebarState();

        }

    }
    /*==========================================
            ENTERPRISE ACCORDION MENU
    ==========================================*/

    toggleMenu(currentGroup) {

        /* Close all other menus */

        this.menuGroups.forEach(group => {

            if (group !== currentGroup) {

                group.classList.remove("open");

                const btn = group.querySelector(".menu-btn");

                if (btn) {

                    btn.classList.remove("active");

                }

            }

        });

        /* Toggle current */

        currentGroup.classList.toggle("open");

        const currentButton = currentGroup.querySelector(".menu-btn");

        currentButton.classList.toggle("active");

        /* Save opened menu */

        const menuName = currentButton.textContent.trim();

        localStorage.setItem("openMenu", menuName);

    },

    /*==========================================
            ACTIVE LINK
    ==========================================*/

    activateLink(link) {

        this.submenuLinks.forEach(item => {

            item.classList.remove("active");

        });

        link.classList.add("active");

        /* Save active page */

        localStorage.setItem(

            "activePage",

            link.dataset.page

        );

        /* Load Page */

        if (window.Router) {

            Router.load(link.dataset.page);

        }

        /* Mobile Close */

        if (window.innerWidth <= 992) {

            this.closeMobileSidebar();

        }

    },

    /*==========================================
            RESTORE MENU
    ==========================================*/

    restoreActiveMenu() {

        const openMenu = localStorage.getItem("openMenu");

        const activePage = localStorage.getItem("activePage");

        let menuFound = false;

        this.menuGroups.forEach(group => {

            const btn = group.querySelector(".menu-btn");

            const links = group.querySelectorAll(".submenu a");

            if (!btn) return;

            const menuTitle = btn.textContent.trim();

            if (menuTitle === openMenu) {

                group.classList.add("open");

                btn.classList.add("active");

                menuFound = true;

            }

            links.forEach(link => {

                if (link.dataset.page === activePage) {

                    link.classList.add("active");

                }

            });

        });

        /* Default Dashboard */

        if (!menuFound) {

            const firstGroup = this.menuGroups[0];

            if (firstGroup) {

                firstGroup.classList.add("open");

                const btn = firstGroup.querySelector(".menu-btn");

                if (btn) {

                    btn.classList.add("active");

                }

            }

        }

    }
    /*==========================================
            KEYBOARD SHORTCUTS
    ==========================================*/

    bindKeyboardShortcuts() {

        document.addEventListener("keydown", (e) => {

            /* Ctrl + B = Toggle Sidebar */

            if (e.ctrlKey && e.key.toLowerCase() === "b") {

                e.preventDefault();

                this.toggleSidebar();

            }

            /* ESC = Close Mobile Sidebar */

            if (e.key === "Escape") {

                this.closeMobileSidebar();

            }

        });

    },

    /*==========================================
            INITIAL PAGE
    ==========================================*/

    loadInitialPage() {

        const activePage = localStorage.getItem("activePage") || "home";

        if (window.Router) {

            Router.load(activePage);

        }

    }

};

/*==================================================
        START APPLICATION
==================================================*/

window.addEventListener("load", () => {

    Sidebar.bindKeyboardShortcuts();

    Sidebar.loadInitialPage();

});

/*==================================================
        RESPONSIVE FIX
==================================================*/

window.addEventListener("resize", () => {

    Sidebar.handleResize();

});

/*==================================================
        END OF FILE
==================================================*/