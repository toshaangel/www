// vkbridge.js
console.log("VK Bridge script loaded.");

vkBridge.send('VKWebAppInit');

// Функция для получения информации о пользователе
const getUserInfo = () => {
  vkBridge.send('VKWebAppGetUserInfo')
    .then(data => {
      // Данные пользователя
      console.log("User Info: ", data);
      // Сохраните данные пользователя для использования в игре
      const playerName = data.first_name;
      const playerAvatar = data.photo_200;
      // Отобразите имя и аватар в интерфейсе игры
      console.log(`Player Name: ${playerName}`);
      console.log(`Player Avatar: ${playerAvatar}`);
    })
    .catch(error => {
      console.error("Error getting user info: ", error);
    });
};

// Вызов функции при загрузке страницы
window.onload = () => {
  console.log("Window loaded, getting user info.");
  getUserInfo();
};
