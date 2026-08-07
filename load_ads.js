/* =====================================
   Y-FETISH
   load_ads.js
===================================== */

const adsContainer = document.getElementById("adsContainer");
const vipContainer = document.getElementById("vipContainer");

/* ---------- Загрузка ---------- */

window.addEventListener("DOMContentLoaded", () => {

    loadVIP();

    loadProfiles();

});

/* ---------- VIP ---------- */

async function loadVIP(){

    if(!vipContainer) return;

    vipContainer.innerHTML="<p>Загрузка VIP...</p>";

    const { data, error } = await supabase

        .from("profiles")

        .select("*")

        .eq("vip",true)

        .order("created_at",{ascending:false});

    if(error){

        vipContainer.innerHTML="";

        console.error(error);

        return;

    }

    vipContainer.innerHTML="";

    if(data.length===0){

        vipContainer.innerHTML="<p>VIP анкет пока нет.</p>";

        return;

    }

    data.forEach(profile=>{

        vipContainer.appendChild(

            createCard(profile)

        );

    });

}

/* ---------- Все анкеты ---------- */

async function loadProfiles(){

    if(!adsContainer) return;

    adsContainer.innerHTML="<p>Загрузка анкет...</p>";

    const { data, error } = await supabase

        .from("profiles")

        .select("*")

        .order("created_at",{ascending:false});

    if(error){

        adsContainer.innerHTML="Ошибка загрузки.";

        console.error(error);

        return;

    }

    adsContainer.innerHTML="";

    if(data.length===0){

        adsContainer.innerHTML="<h2>Анкет пока нет.</h2>";

        return;

    }

    data.forEach(profile=>{

        adsContainer.appendChild(

            createCard(profile)

        );

    });

}

/* ---------- Карточка ---------- */

function createCard(profile){

    const card=document.createElement("div");

    card.className="ad-card";

    card.dataset.country=profile.country||"";

    card.dataset.gender=profile.gender||"";

    card.dataset.date=profile.created_at||"";

    let image="img/no-photo.jpg";

    if(profile.photos){

        if(Array.isArray(profile.photos)){

            if(profile.photos.length>0){

                image=profile.photos[0];

            }

        }

    }

    card.innerHTML=`

    ${profile.vip?'<div class="vip">VIP</div>':''}

    <img
        src="${image}"
        class="ad-photo"
        alt="${profile.title}"
    >

    <div class="ad-info">

        <h2>${profile.title}</h2>

        <div class="location">

            📍 ${profile.country},
            ${profile.city}

        </div>

        <div class="age">

            🎂 ${profile.age} лет

        </div>

        <div class="gender">

            👤 ${profile.gender}

        </div>

        <div class="goal">

            ❤️ ${profile.goal}

        </div>

        <p>

        ${shortText(profile.description)}

        </p>

        <a

        href="profile.html?id=${profile.id}"

        class="view-btn">

        Смотреть анкету

        </a>

    </div>

    `;

    return card;

}

/* ---------- Короткий текст ---------- */

function shortText(text){

    if(!text) return "";

    if(text.length<130){

        return text;

    }

    return text.substring(0,130)+"...";

}

/* ---------- Обновление ---------- */

async function refreshAds(){

    await loadVIP();

    await loadProfiles();

}

/* ---------- Автообновление ---------- */

setInterval(()=>{

    refreshAds();

},60000);