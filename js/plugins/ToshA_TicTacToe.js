/*:
 * @target MZ
 * @plugindesc Игра в крестики-нолики для RPG Maker MZ
 * @author ToshaAngel
 * @version v1.0.0
 *
 * @param XImage
 * @text Изображение для X
 * @desc Укажите имя файла для изображения X (разместите файл в папке img/pictures)
 * @default X_Image
 * @dir img/pictures/tictactoe/
 * @type file
 *
 * @param XSound
 * @text Звук для X
 * @desc Укажите имя файла для звука X (разместите файл в папке audio/se)
 * @default X_Sound
 * @dir audio/se/tictactoe/
 * @type file
 *
 * @param OImage
 * @text Изображение для O
 * @desc Укажите имя файла для изображения O (разместите файл в папке img/pictures)
 * @default O_Image
 * @dir img/pictures/tictactoe/
 * @type file
  *
 * @param OSound
 * @text Звук для O
 * @desc Укажите имя файла для звука O (разместите файл в папке audio/se)
 * @default O_Sound
 * @dir audio/se/tictactoe/
 * @type file
 *
 * @param HighlightImage
 * @text Изображение для подсветки
 * @desc Укажите имя файла для изображения подсветки (разместите файл в папке img/pictures)
 * @default Highlight_Image
 * @dir img/pictures/tictactoe/
 * @type file
 *
 * @param BackgroundImage
 * @text Фоновое изображение
 * @desc Укажите имя файла для фонового изображения (разместите файл в папке img/pictures)
 * @default Background_Image
 * @dir img/pictures/tictactoe/
 * @type file
 *
 * @param WinSwitch
 * @text Переключатель победы
 * @desc Переключатель, который будет активирован при победе игрока.
 * @type switch
 *
 * @param LoseSwitch
 * @text Переключатель проигрыша
 * @desc Переключатель, который будет активирован при проигрыше игрока.
 * @type switch
 *
 * @param TieSwitch
 * @text Переключатель ничьей
 * @desc Переключатель, который будет активирован при ничьей.
 * @type switch
 *
 * @param BoardOpacity
 * @text Прозрачность поля
 * @desc Укажите прозрачность игрового поля от 0 до 255.
 * @default 255
 * @type number
 * @min 0
 * @max 255
 *
 * @command StartTicTacToe
 * @text Запустить крестики-нолики
 * @desc Запускает игру в крестики-нолики.
 *
 * @arg BGM
 * @text Фоновая музыка
 * @desc Укажите фоновую музыку для игры.
 * @default
 * @dir audio/bgm/
 * @type file
 *
 * @arg ShowEndGameMessage
 * @text Показывать сообщение в конце игры
 * @desc Если установлено true, в конце игры будет показано сообщение.
 * @type boolean
 * @default true
 *
 * @arg WinMessage
 * @text Сообщение о победе
 * @desc Сообщение, которое будет показано при победе игрока.
 * @type string
 * @default Вы выиграли!
 *
 * @arg LoseMessage
 * @text Сообщение о проигрыше
 * @desc Сообщение, которое будет показано при проигрыше игрока.
 * @type string
 * @default Вы проиграли!
 *
 * @arg TieMessage
 * @text Сообщение о ничьей
 * @desc Сообщение, которое будет показано при ничьей.
 * @type string
 * @default Ничья!
 *
* @help
*
*
 * ___________          .__              
 * \__    ___/___  _____|  |__ _____     
 *   |    | /  _ \/  ___/  |  \\__  \    
 *   |    |(  <_> )___ \|   Y  \/ __ \_  
 *   |____| \____/____  >___|  (____  /  
 *                    \/     \/     \/   
 *    _____                        .__   
 *   /  _  \   ____    ____   ____ |  |  
 *  /  /_\  \ /    \  / ___\_/ __ \|  |  
 * /    |    \   |  \/ /_/  >  ___/|  |__
 * \____|__  /___|  /\___  / \___  >____/
 *         \/     \//_____/      \/   
 * 
 *
* ToshA_TicTacToe.js предоставляет расширенную мини-игру крестики-нолики для RPG Maker MZ,
* добавляя новый уровень интерактивности в ваш проект. С этим плагином вы можете
* интегрировать крестики-нолики непосредственно в вашу игру, настроить визуальные
* и аудио аспекты игры, и использовать результаты игры для влияния на события в вашем мире.
* 
* Особенности:
* - Полностью настраиваемые изображения для X и O, позволяющие интегрировать игру в любой арт-стиль.
* - Настраиваемые звуковые эффекты для хода игрока и AI, улучшая аудио опыт.
* - Возможность установки фоновой музыки для создания атмосферы во время игры.
* - Контроль прозрачности игрового поля.
* - Настраиваемые переключатели (WinSwitch, LoseSwitch, TieSwitch), которые могут быть
*   активированы в зависимости от исхода игры, позволяя вам триггерить различные события в вашем проекте.
* - Поддержка сообщений в конце игры для победы, проигрыша или ничьей.
* 
* Примеры использования:
* 1. Мини-игра в таверне, где игрок может сыграть в крестики-нолики с NPC.
* 2. Загадка в подземелье, где игрок должен выиграть у AI в крестики-нолики, чтобы открыть секретную дверь.
* 3. Событие в игре, где результат крестиков-ноликов влияет на дальнейший сюжет или отношения с другими персонажами.

 */


(function () {
  const parameters = PluginManager.parameters("ToshA_TicTacToe");
  const xImage = parameters["XImage"];
  const oImage = parameters["OImage"];
  const backgroundImage = parameters["BackgroundImage"];
  const winSwitch = Number(parameters["WinSwitch"]);
  const loseSwitch = Number(parameters["LoseSwitch"]);
  const tieSwitch = Number(parameters["TieSwitch"]);
  const winMessage = parameters["WinMessage"];
  const loseMessage = parameters["LoseMessage"];
  const tieMessage = parameters["TieMessage"];
  const xSound = parameters["XSound"];
const oSound = parameters["OSound"];


PluginManager.registerCommand("ToshA_TicTacToe", "StartTicTacToe", args => {
    SceneManager.push(Scene_TicTacToe);
    Scene_TicTacToe.prototype.showEndGameMessage = args.ShowEndGameMessage === "true";
    Scene_TicTacToe.prototype.customWinMessage = args.WinMessage;
    Scene_TicTacToe.prototype.customLoseMessage = args.LoseMessage;
    Scene_TicTacToe.prototype.customTieMessage = args.TieMessage;
    Scene_TicTacToe.prototype.bgm = args.BGM; // Добавляем фоновую музыку
});


  class Scene_TicTacToe extends Scene_Base {
start() {
    super.start();
    this.savedBgm = AudioManager.saveBgm(); // Сохраняем текущую BGM
    this.savedBgs = AudioManager.saveBgs(); // Сохраняем текущий BGS
    AudioManager.stopBgs(); // Останавливаем воспроизведение BGS

    if (this.bgm) {
        AudioManager.playBgm({name: this.bgm, volume: 100, pitch: 100, pan: 0});
    }
}


terminate() {
    super.terminate();
    if (this.savedBgm) {
        AudioManager.replayBgm(this.savedBgm); // Воспроизводим сохранённую BGM
    }
    if (this.savedBgs) {
        AudioManager.replayBgs(this.savedBgs); // Воспроизводим сохранённый BGS
    }
}


    constructor() {
      super();
      this._cursorX = 0; // Текущий столбец курсора
      this._cursorY = 0; // Текущая строка курсора
      this.gameOver = false; // Добавляем флаг окончания игры
    }
    createBoardWindows() {
      this.boardWindows = [];
      const cellWidth = 162; // Ширина клетки
      const cellHeight = 114; // Высота клетки

      // Определяем cellPositions как свойство класса
      this.cellPositions = [
        [
          { x: 120, y: 55 },
          { x: 360, y: 65 },
          { x: 595, y: 62 },
        ],
        [
          { x: 80, y: 225 },
          { x: 310, y: 230 },
          { x: 545, y: 235 },
        ],
        [
          { x: 30, y: 385 },
          { x: 270, y: 390 },
          { x: 510, y: 400 },
        ],
      ];

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const pos = cellPositions[i][j];
          const window = new Window_Base(
            new Rectangle(pos.x, pos.y, cellWidth, cellHeight),
          );
          window.opacity = Number(parameters["BoardOpacity"]);
          this.addWindow(window);
          this.boardWindows.push(window);
        }
      }
    }
makeMove(x, y) {
    if (!this.board[y][x]) {
        this.board[y][x] = this.currentPlayer;

    // Воспроизведение звука
    const soundName = this.currentPlayer === "X" ? xSound : oSound;
    if (soundName) {
        AudioManager.playSe({name: soundName, pan: 0, pitch: 100, volume: 90});
    }

    // Дополнительная логика...
    if (this.checkWin()) {
      this.endGame(`${this.currentPlayer} wins!`);
    } else if (this.checkTie()) {
      this.endGame(`It's a tie!`);
    } else {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
  }
}

    processMouseInput() {
      if (TouchInput.isTriggered()) {
        const x = TouchInput.x;
        const y = TouchInput.y;

        for (let i = 0; i < this.cellPositions.length; i++) {
          for (let j = 0; j < this.cellPositions[i].length; j++) {
            const cell = this.cellPositions[i][j];
            if (
              x >= cell.x &&
              x <= cell.x + 162 &&
              y >= cell.y &&
              y <= cell.y + 114
            ) {
              // 162 и 114 - ширина и высота клетки
              this._cursorX = j;
              this._cursorY = i;
              this.updateHighlightPosition();
              if (!this.board[i][j] && this.currentPlayer === "X") {
                this.makeMove(j, i);
              }
              return;
            }
          }
        }
      }
    }

    initialize() {
      super.initialize();
      this.backgroundImageName = backgroundImage;
      this.createBackground();
      this.createBoard();
      this.currentPlayer = "X";
      this.isComputerThinking = false;
      this.boardSprites = [];
      this._cursorX = 0;
      this._cursorY = 0;
      this.highlightImageName = parameters["HighlightImage"];
      // Инициализация cellPositions
      this.cellPositions = [
        [
          { x: 421, y: 117 },
          { x: 655, y: 121 },
          { x: 885, y: 129 },
        ],
        [
          { x: 372, y: 275 },
          { x: 612, y: 281 },
          { x: 846, y: 285 },
        ],
        [
          { x: 322, y: 438 },
          { x: 562, y: 441 },
          { x: 798, y: 450 },
        ],
      ];
      this.createHighlightSprite(); // Создаем спрайт подсветки один раз
    }

    createHighlightSprite() {
      this.highlightSprite = new Sprite();
      this.highlightSprite.bitmap = ImageManager.loadPicture(
        this.highlightImageName,
      );
      this.addChild(this.highlightSprite); // Добавляем спрайт на сцену
      this.updateHighlightPosition(); // Обновляем позицию подсветки
    }

updateHighlightPosition() {
  // Убедимся, что cellPositions инициализирован и индексы в допустимых пределах
  if (
    this.cellPositions &&
    this._cursorY < this.cellPositions.length &&
    this._cursorX < this.cellPositions[this._cursorY].length
  ) {
    const pos = this.cellPositions[this._cursorY][this._cursorX];

    // Добавляем проверку на существование highlightSprite и его bitmap перед доступом к их свойствам
    if (this.highlightSprite && this.highlightSprite.bitmap) {
      this.highlightSprite.x = pos.x;
      this.highlightSprite.y = pos.y;
    }
  }
}


    create() {
      super.create();
      this.createWindowLayer();
      this.createBoardWindows();
    }

    createBackground() {
      this.backgroundSprite = new Sprite();
      this.backgroundSprite.bitmap = ImageManager.loadPicture(
        this.backgroundImageName,
      );
      this.backgroundSprite.bitmap.addLoadListener(() => {
        this.backgroundSprite.x =
          (Graphics.width - this.backgroundSprite.width) / 2;
        this.backgroundSprite.y =
          (Graphics.height - this.backgroundSprite.height) / 2;
      });
      this.addChild(this.backgroundSprite);
    }

update() {
  super.update();

  if (this.gameOver) {
    return; // Прекращаем обновление, если игра завершена
  }

  if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
    this.onCancel();
  }

      this.processCursorMovement();
      this.processMouseInput();
      this.updateBoardWindows();
      this.updateHighlightPosition();

      if (this.currentPlayer === "X" && !this.isComputerThinking) {
        this.processMouseInput(); // Обрабатывать ввод мыши только когда игрок может совершить ход
        if (this.checkWin()) {
          this.endGame("win");
        } else if (this.checkTie()) {
          this.endGame("tie");
        }
      }

      if (this.currentPlayer === "O" && !this.isComputerThinking) {
        this.isComputerThinking = true;
        setTimeout(() => {
          this.computerMove();
          this.updateBoardWindows();
          this.isComputerThinking = false;
          if (this.checkWin()) {
            this.endGame("lose");
          } else if (this.checkTie()) {
            this.endGame("tie");
          } else {
            this.currentPlayer = "X"; // Смена игрока
          }
        }, 1000);
      }
    }

onCancel() {

  // Устанавливаем значения переключателей в false при выходе
  $gameSwitches.setValue(winSwitch, false);
  $gameSwitches.setValue(loseSwitch, false);
  $gameSwitches.setValue(tieSwitch, false);

  // Возвращаемся на предыдущую сцену или на указанную сцену
  SceneManager.goto(Scene_Map); // Или любую другую сцену, на которую вы хотите перейти
}

    processCursorMovement() {
      if (Input.isRepeated("down")) {
        this.moveCursor(0, 1);
      } else if (Input.isRepeated("up")) {
        this.moveCursor(0, -1);
      } else if (Input.isRepeated("right")) {
        this.moveCursor(1, 0);
      } else if (Input.isRepeated("left")) {
        this.moveCursor(-1, 0);
      }

      if (Input.isTriggered("ok") && this.currentPlayer === "X") {
        this.selectCell();
      }
    }

    moveCursor(x, y) {
      this._cursorX = (this._cursorX + x + 3) % 3;
      this._cursorY = (this._cursorY + y + 3) % 3;
      this.updateHighlightPosition(); // Обновляем позицию подсветки после перемещения курсора
    }

    selectCell() {
      if (
        !this.board[this._cursorY][this._cursorX] &&
        this.currentPlayer === "X"
      ) {
        this.makeMove(this._cursorX, this._cursorY);
      }
    }

computerMove() {
  if (this.gameOver) {
    return; // Останавливаем ход AI, если игра завершена
  }
  let move = this.findWinningMove("O");
  if (!move) {
    move = this.findWinningMove("X");
    if (!move) {
      if (!this.board[1][1]) {
        move = { x: 1, y: 1 };
      } else {
        move = this.getRandomMove();
      }
    }
  }

  if (move) {
    this.board[move.y][move.x] = "O";

    // Воспроизведение звука для O
    if (oSound) {
        AudioManager.playSe({name: oSound, pan: 0, pitch: 100, volume: 90});
    }
  }
}


    findWinningMove(player) {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          if (!this.board[y][x]) {
            this.board[y][x] = player;
            if (this.checkWin()) {
              this.board[y][x] = null;
              return { x, y };
            }
            this.board[y][x] = null;
          }
        }
      }
      return null;
    }

    getRandomMove() {
      let availableMoves = [];
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          if (!this.board[y][x]) {
            availableMoves.push({ x, y });
          }
        }
      }
      if (availableMoves.length > 0) {
        return availableMoves[
          Math.floor(Math.random() * availableMoves.length)
        ];
      }
      return null;
    }

    createBoard() {
      this.board = Array(3)
        .fill()
        .map(() => Array(3).fill(null));
    }

    createBoardWindows() {
      this.boardWindows = [];
      const cellWidth = 162; // Ширина клетки
      const cellHeight = 114; // Высота клетки

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const pos = this.cellPositions[i][j];
          const window = new Window_Base(
            new Rectangle(pos.x, pos.y, cellWidth, cellHeight),
          );
          window.opacity = Number(parameters["BoardOpacity"]);
          this.addWindow(window);
          this.boardWindows.push(window);
        }
      }
    }

    clearBoardSprites() {
      if (this.boardSprites) {
        this.boardSprites.forEach((sprite) => sprite.destroy());
      }
      this.boardSprites = [];
    }

updateBoardWindows() {
    this.clearBoardSprites(); // Удаляем старые спрайты

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const windowIndex = y * 3 + x;
            const window = this.boardWindows[windowIndex];

            if (this.board[y][x]) { // Проверяем, что в клетке есть значение
                const sprite = new Sprite();
                const imageName = this.board[y][x] === "X" ? xImage : oImage;
                sprite.bitmap = ImageManager.loadPicture(imageName);
                sprite.bitmap.addLoadListener(() => {
                    if (sprite && sprite.bitmap) {
                        sprite.x = window.x + (window.width - sprite.bitmap.width) / 2;
                        sprite.y = window.y + (window.height - sprite.bitmap.height) / 2;
                        this.addChild(sprite);
                    }
                });

                this.boardSprites.push(sprite);
            }
        }
    }
}


    checkWin() {
      const lines = [
        [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
        [
          [1, 0],
          [1, 1],
          [1, 2],
        ],
        [
          [2, 0],
          [2, 1],
          [2, 2],
        ],
        [
          [0, 0],
          [1, 0],
          [2, 0],
        ],
        [
          [0, 1],
          [1, 1],
          [2, 1],
        ],
        [
          [0, 2],
          [1, 2],
          [2, 2],
        ],
        [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
        [
          [0, 2],
          [1, 1],
          [2, 0],
        ],
      ];

      for (const line of lines) {
        const [a, b, c] = line;
        if (
          this.board[a[0]][a[1]] &&
          this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
          this.board[a[0]][a[1]] === this.board[c[0]][c[1]]
        ) {
          return true;
        }
      }
      return false;
    }

    checkTie() {
      return this.board.flat().every((cell) => cell != null);
    }

endGame(result) {
    this.gameOver = true; // Устанавливаем флаг окончания игры
    let message = "";

    switch (result) {
        case "win":
            message = this.customWinMessage || winMessage;
            $gameSwitches.setValue(winSwitch, true);
            $gameSwitches.setValue(loseSwitch, false);
            $gameSwitches.setValue(tieSwitch, false);
            break;
        case "lose":
            message = this.customLoseMessage || loseMessage;
            $gameSwitches.setValue(winSwitch, false);
            $gameSwitches.setValue(loseSwitch, true);
            $gameSwitches.setValue(tieSwitch, false);
            break;
        case "tie":
            message = this.customTieMessage || tieMessage;
            $gameSwitches.setValue(winSwitch, false);
            $gameSwitches.setValue(loseSwitch, false);
            $gameSwitches.setValue(tieSwitch, true);
            break;
    }

    if (this.showEndGameMessage) {
        $gameMessage.add(message);
    }

    // Задержка перед переходом на другую сцену
    setTimeout(() => {
        SceneManager.goto(Scene_Map); // Или любую другую целевую сцену
    }, 500);
}



  }
})();
