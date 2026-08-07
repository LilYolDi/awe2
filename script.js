/* ======================================
   Y-FETISH
   script.js
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    initMenu();
    initSearch();
    initFilters();
    initSort();
    initScrollTop();
    initLanguage();

});

/* ======================================
   MENU
====================================== */

function initMenu(){

    const menuBtn = document.querySelector(".menu-btn");
    const sideMenu = document.querySelector(".side-menu");
    const closeBtn = document.querySelector(".close-menu");

    if(!menuBtn || !sideMenu) return;

    menuBtn.addEventListener("click",()=>{

        sideMenu.classList.add("active");

    });

    if(closeBtn){

        closeBtn.addEventListener("click",()=>{

            sideMenu.classList.remove("active");

        });

    }

    document.addEventListener("click",(e)=>{

        if(
            sideMenu.classList.contains("active") &&
            !sideMenu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ){

            sideMenu.classList.remove("active");

        }

    });

}

/* ======================================
   SEARCH
====================================== */

function initSearch(){

    const input=document.getElementById("search");

    if(!input) return;

    input.addEventListener("input",filterCards);

}

/* ======================================
   FILTERS
====================================== */

function initFilters(){

    const country=document.getElementById("countryFilter");
    const gender=document.getElementById("genderFilter");

    if(country){

        country.addEventListener("change",filterCards);

    }

    if(gender){

        gender.addEventListener("change",filterCards);

    }

}

/* ======================================
   FILTER LOGIC
====================================== */

function filterCards(){

    const search=(document.getElementById("search")?.value||"")
        .toLowerCase();

    const country=(document.getElementById("countryFilter")?.value||"")
        .toLowerCase();

    const gender=(document.getElementById("genderFilter")?.value||"")
        .toLowerCase();

    document.querySelectorAll(".ad-card").forEach(card=>{

        const text=card.innerText.toLowerCase();

        const cardCountry=(card.dataset.country||"").toLowerCase();

        const cardGender=(card.dataset.gender||"").toLowerCase();

        const searchOk=text.includes(search);

        const countryOk=
            country==="" ||
            cardCountry===country;

        const genderOk=
            gender==="" ||
            cardGender===gender;

        card.style.display=
            searchOk &&
            countryOk &&
            genderOk
            ? ""
            : "none";

    });

}

/* ======================================
   SORT
====================================== */

function initSort(){

    const sort=document.getElementById("sort");

    if(!sort) return;

    sort.addEventListener("change",()=>{

        const container=document.getElementById("adsContainer");

        if(!container) return;

        const cards=[...container.querySelectorAll(".ad-card")];

        cards.sort((a,b)=>{

            const dateA=new Date(a.dataset.date||0);

            const dateB=new Date(b.dataset.date||0);

            if(sort.value==="old"){

                return dateA-dateB;

            }

            return dateB-dateA;

        });

        cards.forEach(card=>container.appendChild(card));

    });

}

/* ======================================
   SCROLL TO TOP
====================================== */

function initScrollTop(){

    const btn=document.getElementById("topButton");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            btn.style.display="block";

        }else{

            btn.style.display="none";

        }

    });

    btn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}



/* ======================================
   LANGUAGE
====================================== */

function initLanguage(){

    const select=document.getElementById("language");

    if(!select) return;

    const saved=localStorage.getItem("language");

    if(saved){

        select.value=saved;

    }

    select.addEventListener("change",()=>{

        localStorage.setItem(

            "language",

            select.value

        );

        location.reload();

    });

}

/* ======================================
   SIMPLE NOTIFICATION
====================================== */

function showMessage(text){

    const msg=document.createElement("div");

    msg.className="toast";

    msg.innerText=text;

    document.body.appendChild(msg);

    setTimeout(()=>{

        msg.classList.add("show");

    },100);

    setTimeout(()=>{

        msg.classList.remove("show");

        setTimeout(()=>{

            msg.remove();

        },300);

    },3000);

}

/* ======================================
   LOADING
====================================== */

function showLoading(){

    document.body.classList.add("loading");

}

function hideLoading(){

    document.body.classList.remove("loading");

}