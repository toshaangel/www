// vkbridge.js
console.log("VK Bridge script loaded.");

vkBridge.send('VKWebAppInit').then(() => {
  console.log("VK Bridge initialized successfully.");
}).catch(error => {
  console.error("VK Bridge initialization failed: ", error);
});

// Функция для получения информации о пользователе
const getUserInfo = () => {
  vkBridge.send('VKWebAppGetUserInfo')
    .then(data => {
      // Данные пользователя
      console.log("User Info received: ", data);
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

// Функция для авторизации и получения токена
const authorize = () => {
  vkBridge.send('VKWebAppGetAuthToken', {
    app_id: YOUR_APP_ID, // Замените на ваш app_id
    scope: 'friends,status'
  })
  .then(data => {
    console.log("Auth Token received: ", data.access_token);
    // Сохраните токен для дальнейшего использования
    const token = data.access_token;
  })
  .catch(error => {
    console.error("Token request failed: ", error);
  });
};

// Вызов функций при загрузке страницы
window.onload = () => {
  console.log("Window loaded, initializing VK Bridge and getting user info.");
  getUserInfo();
  authorize();
};
