
/*==================================================
    COCOBLU BI ENTERPRISE
    app.js
==================================================*/

const App = {

    version: "1.0.0",

    initialized: false,

    init() {

        console.log("================================");

        console.log("Cocoblu BI Enterprise");

        console.log("Version :", this.version);

        console.log("================================");

        this.initializeModules();

        this.bindGlobalEvents();

        this.startClock();

        this.initialized = true;

    },

    /*==================================
            MODULES
    ==================================*/

    initializeModules() {

        if (window.Sidebar) {

            Sidebar.init();

        }

        if (window.Router) {

            Router.init();

        }

    },

    /*==================================
            GLOBAL EVENTS
    ==================================*/

    bindGlobalEvents() {

        document.addEventListener("keydown", (e) => {

            /* CTRL + SHIFT + R */

            if (

                e.ctrlKey &&

                e.shiftKey &&

                e.key.toLowerCase() === "r"

            ) {

                e.preventDefault();

                Router.reload();

            }

        });

        window.addEventListener("online", () => {

            if (window.showToast)

                showToast("Internet Connected");

        });

        window.addEventListener("offline", () => {

            if (window.showToast)

                showToast(

                    "Internet Disconnected",

                    "error"

                );

        });

    },

    /*==================================
            CLOCK
    ==================================*/

    startClock() {

        const sync =

            document.getElementById("lastSyncTime");

        if (!sync) return;

        setInterval(() => {

            const now = new Date();

            sync.innerHTML =

                now.toLocaleTimeString();

        }, 1000);

    },
/*==========================================
        THEME STARTUP
==========================================*/

    applySavedTheme(){

        const theme =

            localStorage.getItem("theme");

        if(theme==="dark"){

            document.body.classList.add("dark");

        }

    },

/*==========================================
        AUTO REFRESH
==========================================*/

    startAutoRefresh(){

        setInterval(()=>{

            if(window.Router){

                Router.reload();

            }

        },300000); // 5 Minutes

    },

/*==========================================
        AUTO DATA SYNC
==========================================*/

    startAutoSync(){

        setInterval(()=>{

            console.log("Auto Sync Started");

            if(window.showToast){

                showToast(

                    "Dashboard Synced",

                    "success"

                );

            }

        },600000); //10 Minutes

    },

/*==========================================
        ERROR HANDLER
==========================================*/

    handleError(error){

        console.error(

            "Application Error :",

            error

        );

        if(window.showToast){

            showToast(

                "Unexpected Error",

                "error"

            );

        }

    },

/*==========================================
        LOGGER
==========================================*/

    log(message){

        console.log(

            "[COCOBLU]",

            message

        );

    }

};

/*==========================================
        GLOBAL INITIALIZER
==========================================*/

window.initializeDashboard = function(page){

    console.log(

        "Dashboard Initialized :",

        page

    );

};

/*==========================================
        START APPLICATION
==========================================*/

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        try{

            App.init();

            App.applySavedTheme();

            App.startAutoRefresh();

            App.startAutoSync();

            App.log(

                "Application Started Successfully"

            );

        }

        catch(error){

            App.handleError(error);

        }

    }

);

/*==========================================
        GLOBAL ACCESS
==========================================*/

window.App = App;

/*==========================================
        END OF APP.JS
==========================================*/
