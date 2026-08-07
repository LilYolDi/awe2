/* =====================================
   Y-FETISH
   profile.js
===================================== */

const params = new URLSearchParams(window.location.search);
const profileId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {

    if (!profileId) {
        location.href = "index.html";
        return;
    }

    loadProfile();
});

/* ================================
   Загрузка анкеты
================================ */

async function loadProfile() {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .single();

    if (error || !data) {

        document.body.innerHTML = `
            <h1 style="text-align:center;margin-top:80px;">
                Анкета не найдена
            </h1>
        `;

        return;
    }

    document.title = data.title + " | Y-FETISH";

    document.getElementById("title").textContent = data.title;
    document.getElementById("description").textContent = data.description;
    document.getElementById("country").textContent = data.country;
    document.getElementById("city").textContent = data.city;
    document.getElementById("age").textContent = data.age;
    document.getElementById("gender").textContent = data.gender;
    document.getElementById("goal").textContent = data.goal;

    if(document.getElementById("views")){
        document.getElementById("views").textContent =
            data.views || 0;
    }

    const tg=document.getElementById("telegramBtn");

    if(tg){

        tg.href="https://t.me/"+

            data.telegram.replace("@","");

    }

    loadGallery(data.photos);

    updateViews(data.views || 0);

    loadSimilar(data.goal,data.id);

}

/* ================================
   Галерея
================================ */

function loadGallery(photos){

    const gallery=document.getElementById("gallery");

    gallery.innerHTML="";

    if(!photos || photos.length===0){

        gallery.innerHTML=`

        <img

        src="img/no-photo.jpg"

        class="gallery-image"

        >

        `;

        return;

    }

    photos.forEach(photo=>{

        const img=document.createElement("img");

        img.src=photo;

        img.className="gallery-image";

        img.onclick=()=>{

            window.open(photo,"_blank");

        };

        gallery.appendChild(img);

    });

}

/* ================================
   Просмотры
================================ */

async function updateViews(current){

    await supabase

    .from("profiles")

    .update({

        views:current+1

    })

    .eq("id",profileId);

}

/* ================================
   Похожие анкеты
================================ */

async function loadSimilar(goal,currentId){

    const {data,error}=await supabase

    .from("profiles")

    .select("*")

    .eq("goal",goal)

    .neq("id",currentId)

    .limit(6);

    if(error) return;

    const container=document.getElementById("similarAds");

    if(!container) return;

    container.innerHTML="";

    data.forEach(profile=>{

        let image="img/no-photo.jpg";

        if(profile.photos){

            if(profile.photos.length>0){

                image=profile.photos[0];

            }

        }

        container.innerHTML+=`

        <div class="ad-card">

            <img

            src="${image}"

            class="ad-photo">

            <div class="ad-info">

            <h2>${profile.title}</h2>

            <div>

            📍 ${profile.city}

            </div>

            <div>

            ❤️ ${profile.goal}

            </div>

            <a

            href="profile.html?id=${profile.id}"

            class="view-btn">

            Смотреть

            </a>

            </div>

        </div>

        `;

    });

}