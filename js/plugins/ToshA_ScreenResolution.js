/*:
 * @plugindesc ToshA_ScreenResolution.js - Плагин для автоматической настройки разрешения экрана и соотношения сторон без черных полос.
 * @target MZ
 * @author ToshA
 *
 * @help
 * Этот плагин автоматически определяет разрешение экрана и соотношение сторон,
 * растягивая изображение на весь экран без черных полос.
 */

(() => {
    const updateResolution = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Устанавливаем новое разрешение экрана
        SceneManager._screenWidth = screenWidth;
        SceneManager._screenHeight = screenHeight;
        SceneManager._boxWidth = screenWidth;
        SceneManager._boxHeight = screenHeight;

        // Изменяем размер canvas для правильного отображения
        Graphics.resize(screenWidth, screenHeight);

        // Переопределяем метод для настройки соотношения сторон без черных полос
        const ratioX = screenWidth / Graphics.width;
        const ratioY = screenHeight / Graphics.height;

        if (ratioX > ratioY) {
            Graphics.scale = ratioX;
            Graphics._canvas.style.width = `${screenWidth}px`;
            Graphics._canvas.style.height = `${screenWidth * (Graphics.height / Graphics.width)}px`;
        } else {
            Graphics.scale = ratioY;
            Graphics._canvas.style.width = `${screenHeight * (Graphics.width / Graphics.height)}px`;
            Graphics._canvas.style.height = `${screenHeight}px`;
        }

        Graphics._updateAllElements();

        // Обновляем сцену для корректного отображения интерфейса
        if (SceneManager._scene) {
            SceneManager._scene.children.forEach(child => {
                if (child.resize) {
                    child.resize(screenWidth, screenHeight);
                }
            });
        }
    };

    // Вызываем метод для обновления разрешения при изменении размера окна
    window.addEventListener('resize', updateResolution);

    // Инициализация графики и установка нового размера окна при запуске
    const originalInitialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        originalInitialize.call(this);
        updateResolution();
    };

    // Обновляем разрешение при загрузке каждой новой сцены
    const originalOnSceneCreate = SceneManager.onSceneCreate;
    SceneManager.onSceneCreate = function() {
        originalOnSceneCreate.call(this);
        updateResolution();
    };
})();
