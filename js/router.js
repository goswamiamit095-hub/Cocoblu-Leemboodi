/*==================================================
    COCOBLU BI ENTERPRISE
    router.js
==================================================*/

const Router = {

    pageContainer: null,

    currentPage: "home",

    routes: {

        home: "pages/home.html",

        "monthly-summary": "pages/monthly-summary.html",

        "daily-summary": "pages/daily-summary.html",

        "asin-sales": "pages/asin-sales.html",

        "monthly-brand": "pages/monthly-brand.html",

        "daily-brand": "pages/daily-brand.html",

        category: "pages/category.html",

        status: "pages/status.html",

        growth: "pages/growth.html",

        "monthly-ads": "pages/monthly-ads.html",

        "daily-ads": "pages/daily-ads.html",

        campaign: "pages/campaign.html",

        "asin-ads": "pages/asin-ads.html",

        "search-term": "pages/search-term.html",

        analysis: "pages/analysis.html",

        "po-recommendation": "pages/po.html",

        projection: "pages/projection.html",

        "daily-stock": "pages/stock.html",

        invoice: "pages/payment.html",

        payment: "pages/payment.html",

        deduction: "pages/payment.html",

        "monthly-return": "pages/returns.html",

        "daily-return": "pages/returns.html",

        "asin-return": "pages/returns.html",

        "brand-return": "pages/returns.html",

        "category-return": "pages/returns.html",

        settings: "pages/settings.html"

    },

    init(){

        this.pageContainer =

            document.getElementById("pageContainer");

        this.load("home");

    },

    async load(page){

        this.currentPage = page;

        if(window.showLoader){

            showLoader();

        }

        try{

            const file =

                this.routes[page];

            if(!file){

                throw new Error("Page Not Found");

            }

            const response =

                await fetch(file);

            const html =

                await response.text();

            this.pageContainer.innerHTML = html;

        }

        catch(error){

            console.error(error);

            this.pageContainer.innerHTML =

            `
            <div class="empty-state">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h2>

                    Page Not Found

                </h2>

                <p>

                    ${page}

                </p>

            </div>
            `;

        }

        finally{

            if(window.hideLoader){

                hideLoader();

            }

        }

    },
/*==========================================
        RELOAD CURRENT PAGE
==========================================*/

    reload(){

        this.load(this.currentPage);

    },

/*==========================================
        URL HASH ROUTING
==========================================*/

    loadFromHash(){

        let hash =

            window.location.hash.replace("#","");

        if(hash === ""){

            hash = "home";

        }

        this.load(hash);

    },

/*==========================================
        CHANGE ROUTE
==========================================*/

    navigate(page){

        window.location.hash = page;

    },

/*==========================================
        PAGE TITLE
==========================================*/

    updateTitle(page){

        const titles={

            home:"Business Overview",

            "monthly-summary":"Monthly Summary",

            "daily-summary":"Daily Summary",

            "asin-sales":"ASIN Sales",

            "monthly-brand":"Monthly Brand Metrics",

            "daily-brand":"Daily Brand Metrics",

            category:"Category",

            status:"Status",

            growth:"Growth",

            "monthly-ads":"Monthly Ads",

            "daily-ads":"Daily Ads",

            campaign:"Campaign Performance",

            "asin-ads":"ASIN Ads Performance",

            "search-term":"Search Term",

            analysis:"Ads Analysis",

            "po-recommendation":"PO Recommendation",

            projection:"Projection",

            "daily-stock":"Daily Stock",

            payment:"Payment",

            invoice:"Invoice",

            deduction:"Return Deduction",

            "monthly-return":"Monthly Return",

            "daily-return":"Daily Return",

            "asin-return":"ASIN Return",

            "brand-return":"Brand Return",

            "category-return":"Category Return",

            settings:"Settings"

        };

        const title =

            titles[page] || page;

        const titleEl = document.getElementById("pageTitle");
const breadEl = document.getElementById("breadcrumbPage");

if (titleEl) titleEl.textContent = title;
if (breadEl) breadEl.textContent = title;

        document.title =

            title + " | Cocoblu BI Enterprise";

    },

/*==========================================
        AFTER PAGE LOAD
==========================================*/

    afterLoad(page){

        this.updateTitle(page);

        if(window.initializeDashboard){

            initializeDashboard(page);

        }

        if(window.showToast){

            showToast(

                page.replaceAll("-"," ") +

                " Loaded",

                "success"

            );

        }

    }

};

/*==========================================
        INITIALIZE ROUTER
==========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Router.init();

        Router.loadFromHash();

    }

);

/*==========================================
        HASH CHANGE
==========================================*/

window.addEventListener(

    "hashchange",

    ()=>{

        Router.loadFromHash();

    }

);

/*==========================================
        PATCH LOAD
==========================================*/

const oldLoad = Router.load.bind(Router);

Router.load = async function(page){

    await oldLoad(page);

    this.afterLoad(page);

};

/*==========================================
        END OF FILE
==========================================*/
