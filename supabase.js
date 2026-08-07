/* ==========================================
   Y-FETISH
   js/supabase.js
========================================== */

// URL проекта
const SUPABASE_URL = "https://cfdopweyymgwcgfynmbx.supabase.co";

// Anon Public Key
const SUPABASE_ANON_KEY =
"sb_publishable_XE4slOiVMH1PLfM9spTo6g_brjnFQa6";

// Создаем подключение
const supabase = window.supabase.createClient(

    SUPABASE_URL,

    SUPABASE_ANON_KEY,

    {

        auth:{

            autoRefreshToken:true,

            persistSession:true,

            detectSessionInUrl:true

        },

        global:{

            headers:{

                "X-Client-Info":"Y-FETISH"

            }

        }

    }

);

/* ==========================================
   Проверка соединения
========================================== */

async function checkConnection(){

    try{

        const { error } = await supabase

        .from("profiles")

        .select("id")

        .limit(1);

        if(error){

            console.error(

                "Ошибка подключения:",

                error.message

            );

            return false;

        }

        console.log(

            "✔ Supabase подключен"

        );

        return true;

    }

    catch(e){

        console.error(e);

        return false;

    }

}

/* ==========================================
   Получить текущего пользователя
========================================== */

async function getCurrentUser(){

    const {

        data,

        error

    } = await supabase.auth.getUser();

    if(error){

        console.log(error);

        return null;

    }

    return data.user;

}

/* ==========================================
   Проверить авторизацию
========================================== */

async function isLoggedIn(){

    const user = await getCurrentUser();

    return user !== null;

}

/* ==========================================
   Получить ID пользователя
========================================== */

async function getUserId(){

    const user = await getCurrentUser();

    if(!user){

        return null;

    }

    return user.id;

}

/* ==========================================
   Форматирование даты
========================================== */

function formatDate(date){

    return new Date(date)

    .toLocaleDateString(

        "ru-RU",

        {

            year:"numeric",

            month:"long",

            day:"numeric"

        }

    );

}

/* ==========================================
   Форматирование возраста
========================================== */

function calculateAge(birthday){

    const birth = new Date(birthday);

    const today = new Date();

    let age =

    today.getFullYear()

    -

    birth.getFullYear();

    const month =

    today.getMonth()

    -

    birth.getMonth();

    if(

        month<0 ||

        (

            month===0 &&

            today.getDate()<birth.getDate()

        )

    ){

        age--;

    }

    return age;

}

/* ==========================================
   Генерация имени файла
========================================== */

function createFileName(file){

    const ext=file.name

    .split(".")

    .pop();

    return

    Date.now()

    +

    "_"

    +

    Math.random()

    .toString(36)

    .substring(2)

    +

    "."

    +

    ext;

}

/* ==========================================
   Сообщение
========================================== */

function toast(text){

    alert(text);

}

/* ==========================================
   Проверка соединения при загрузке
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        checkConnection();

    }

);