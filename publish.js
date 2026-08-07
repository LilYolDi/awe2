/* ==========================================
   Y-FETISH
   publish.js
========================================== */

const publishForm = document.getElementById("publishForm");
const publishButton = document.getElementById("publishButton");
const publishMessage = document.getElementById("publishMessage");

if (publishForm) {

    publishForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        publishButton.disabled = true;
        publishButton.textContent = "Публикуем...";
        publishMessage.textContent = "";

        try {

            const title = document
                .getElementById("title")
                .value
                .trim();

            const description = document
                .getElementById("description")
                .value
                .trim();

            const city = document
                .getElementById("city")
                .value
                .trim();

            const category = document
                .getElementById("category")
                .value;

            // Проверяем заполнение формы
            if (!title  !description  !city || !category) {
                throw new Error("Заполните все поля");
            }

            // Получаем пользователя, если он авторизован
            const user = await getCurrentUser();

            const userId = user ? user.id : null;

            // Сохраняем объявление в Supabase
            const { data, error } = await window.ySupabase
                .from("ads")
                .insert({
                    user_id: userId,
                    title: title,
                    description: description,
                    city: city,
                    category: category
                })
                .select();

            if (error) {
                console.error("Ошибка Supabase:", error);
                throw new Error(error.message);
            }

            console.log("Объявление создано:", data);

            publishMessage.textContent =
                "✅ Объявление успешно опубликовано!";

            publishForm.reset();

        } catch (error) {

            console.error("Ошибка публикации:", error);

            publishMessage.textContent =
                "❌ Ошибка: " + error.message;

        } finally {

            publishButton.disabled = false;
            publishButton.textContent = "Опубликовать";

        }

    });

}
