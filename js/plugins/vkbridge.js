// vkbridge.js
vkBridge.send('VKWebAppInit');

// Функция для получения информации о пользователе
const getUserInfo = () => {
  vkBridge.send('VKWebAppGetUserInfo')
    .then(data => {
      // Данные пользователя
      console.log(data);
      // Сохраните данные пользователя для использования в игре
      const playerName = data.first_name;
      const playerAvatar = data.photo_200;
      // Отобразите имя и аватар в интерфейсе игры
      console.log(`Player Name: ${playerName}`);
      console.log(`Player Avatar: ${playerAvatar}`);
    })
    .catch(error => {
      console.log(error);
    });
};

// Вызов функции при загрузке страницы
window.onload = () => {
  getUserInfo();
};
