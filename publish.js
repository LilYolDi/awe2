/* =====================================
   Y-FETISH
   publish.js
===================================== */

const form = document.getElementById("publishForm");
const photoInput = document.getElementById("photos");
const preview = document.getElementById("preview");

/* =====================================
   Предпросмотр фотографий
===================================== */

photoInput.addEventListener("change", () => {

    preview.innerHTML = "";

    const files = [...photoInput.files];

    if(files.length > 10){

        alert("Можно загрузить максимум 10 фотографий.");

        photoInput.value = "";

        return;

    }

    files.forEach(file => {

        const reader = new FileReader();

        reader.onload = function(e){

            const img = document.createElement("img");

            img.src = e.target.result;

            preview.appendChild(img);

        }

        reader.readAsDataURL(file);

    });

});

/* =====================================
   Публикация анкеты
===================================== */

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const btn = document.querySelector(".publish-btn");

    btn.disabled = true;
    btn.innerHTML = "Публикация...";

    try{

        let photoUrls = [];

        /* ==========================
           Загрузка фотографий
        ========================== */

        for(const file of photoInput.files){

            const fileName =
                Date.now() +
                "_" +
                Math.random().toString(36).substring(2) +
                "_" +
                file.name;

            const { error: uploadError } = await supabase
                .storage
                .from("photos")
                .upload(fileName,file);

            if(uploadError){

                throw uploadError;

            }

            const { data } = supabase
                .storage
                .from("photos")
                .getPublicUrl(fileName);

            photoUrls.push(data.publicUrl);

        }

        /* ==========================
           Сохранение анкеты
        ========================== */

        const profile = {

            title: document.getElementById("title").value,

            age: Number(document.getElementById("age").value),

            gender: document.getElementById("gender").value,

            country: document.getElementById("country").value,

            city: document.getElementById("city").value,

            goal: document.getElementById("goal").value,

            telegram: document.getElementById("telegram").value,

            description: document.getElementById("description").value,

            photos: photoUrls,

            vip: false,

            views: 0,

            created_at: new Date()

        };

        const { error } = await supabase

            .from("profiles")

            .insert(profile);

        if(error){

            throw error;

        }

        alert("Анкета успешно опубликована!");

        location.href = "index.html";

    }

    catch(err){

        console.error(err);

        alert("Ошибка публикации:\n" + err.message);

        btn.disabled = false;

        btn.innerHTML = "Опубликовать анкету";

    }

});







/* ==========================================
   Y-FETISH
   js/publish.js
========================================== */

const publishForm = document.getElementById("publishForm");
const publishButton = document.getElementById("publishButton");
const publishMessage = document.getElementById("publishMessage");


publishForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    publishButton.disabled = true;
    publishButton.textContent = "Публикуем...";

    publishMessage.textContent = "";


    try {

        // Получаем данные формы

        const title =
            document.getElementById("title").value.trim();

        const description =
            document.getElementById("description").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const category =
            document.getElementById("category").value;


        // Проверяем данные

        if (!title || !description || !city || !category) {

            throw new Error(
                "Заполните все поля"
            );

        }


        // Получаем текущего пользователя

        const user =
            await getCurrentUser();


        // Если пользователь авторизован,
        // записываем его ID

        const userId =
            user ? user.id : null;


        // Добавляем объявление в Supabase

        const { data, error } = await supabase

            .from("ads")

            .insert({

                user_id: userId,

                title: title,

                description: description,

                city: city,

                category: category

            })

            .select();


        // Проверяем ошибку

        if (error) {

            console.error(
                "Ошибка Supabase:",
                error
            );

            throw new Error(
                error.message
            );

        }


        console.log(
            "Объявление создано:",
            data
        );


        // Успешное сообщение

        publishMessage.textContent =
            "✅ Объявление успешно опубликовано!";


        publishForm.reset();


    }

    catch (error) {

        console.error(error);

        publishMessage.textContent =
            "❌ Ошибка: " + error.message;

    }


    finally {

        publishButton.disabled = false;

        publishButton.textContent =
            "Опубликовать";

    }

});