/*:
 * @target MZ
 * @plugindesc Простая игра в Hnefatafl с интерактивным игровым полем 11х11.
 *
* @command startHnefatafl
* @text Начать Hnefatafl
* @desc Начинает новую игру в Hnefatafl.
*
* @arg difficulty
* @text Уровень сложности
* @desc Выберите уровень сложности игры.
* @type select
* @option Легкий
* @value easy
* @option Средний
* @value medium
* @option Сложный
* @value hard
* @default medium
*
* @arg winVariable
* @text Переменная победы
* @desc Переменная, которая будет установлена при победе.
* @type variable
*
* @arg loseVariable
* @text Переменная поражения
* @desc Переменная, которая будет установлена при поражении.
* @type variable
*
* @arg winSwitch
* @text Переключатель победы
* @desc Переключатель, который будет активирован при победе.
* @type switch
*
* @arg loseSwitch
* @text Переключатель поражения
* @desc Переключатель, который будет активирован при поражении.
* @type switch
*
* @arg backgroundMusic
* @text Фоновая музыка
* @desc Выберите файл фоновой музыки, который будет воспроизводиться во время игры.
* @type file
* @dir audio/bgm
*
* @arg musicVolume
* @text Громкость музыки
* @desc Укажите громкость фоновой музыки (0-100).
* @type number
* @min 0
* @max 100
* @default 90
*
* @arg musicPitch
* @text Высота тона музыки
* @desc Укажите высоту тона фоновой музыки (50-150).
* @type number
* @min 50
* @max 150
* @default 100
*
* @arg musicPan
* @text Панорамирование музыки
* @desc Укажите панорамирование фоновой музыки (-100 до 100).
* @type number
* @min -100
* @max 100
* @default 0

 *
 * @param BoardSettings
 * @text Настройки доски
 * @desc Настройки всех элементов и параметров игровой доски.
 * @type struct<BoardSettings>
 *
 *
 * @param StartSettings
 * @text Настройки старта
 * @desc Настройки изображения и звука начала игры
 * @type struct<StartSettings>
 *
 * @param AttackerSettings
 * @text Настройки атакующих
 * @desc Настройки изображения и звука перемещения атакующих
 * @type struct<AttackerSettings>
 *
 * @param DefenderSettings
 * @text Настройки защитников
 * @desc Настройки изображения и звука перемещения защитников
 * @type struct<DefenderSettings>
 *
 * @param KingSettings
 * @text Настройки короля
 * @desc Настройки изображения и звука перемещения короля
 * @type struct<KingSettings>
*
 * @param CaptureAttackerSettings
 * @text Настройки захвата атакующего
 * @desc Настройки изображения и звука захвата атакующего
 * @type struct<CaptureAttackerSettings>
 *
 * @param CaptureDefenderSettings
 * @text Настройки захвата защитника
 * @desc Настройки изображения и звука захвата защитника
 * @type struct<CaptureDefenderSettings>
 *
 * @param HighlightImage
 * @text Изображение для подсветки
 * @desc Укажите имя файла для изображения подсветки (разместите файл в папке img/pictures)
 * @default hnefatafl/HighlightImage
 * @dir img/pictures/
 * @type file
 *
 * @param SelectedHighlightImage
 * @text Изображение для подсветки выбранной фигуры
 * @desc Укажите имя файла для изображения подсветки выбранной фигуры (разместите файл в папке img/pictures)
 * @default hnefatafl/SelectedHighlightImage
 * @dir img/pictures/
 * @type file
 *
 * @param WinSettings
 * @text Настройки победы
 * @desc Настройки изображения и звука для события победы.
 * @type struct<WinSettings>
 *
 * @param LoseSettings
 * @text Настройки поражения
 * @desc Настройки изображения и звука для события поражения.
 * @type struct<LoseSettings>
 *
 *
 * @param ScoreSettings
 * @text Настройки оценок
 * @desc Настройки оценок для различных стратегических действий в игре.
 * @type struct<ScoreSettings>
 *
 *

 * @help
 *
 * Нет дополнительных параметров или настроек.
 */
 /*~struct~StartSettings:
 * @param StartImage
 * @text Изображение начала игры
 * @desc Имя файла изображения, которое будет отображаться в начале игры (разместите в папке img/pictures)
 * @default hnefatafl/StartImage
 * @type file
 * @dir img/pictures
 *
 * @param StartSound
 * @text Звук начала игры
 * @desc Имя файла звукового эффекта, который будет воспроизводиться при начале игры (разместите в папке audio/se)
 * @default hnefatafl/StartSound
 * @type file
 * @dir audio/se
 *
 * @param StartSoundVolume
 * @text Громкость звука начала
 * @desc Громкость звука начала игры (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param StartSoundPitch
 * @text Высота тона звука начала
 * @desc Высота тона звука начала игры (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param StartSoundPan
 * @text Панорамирование звука начала
 * @desc Панорамирование звука начала игры (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */
 /*~struct~AttackerSettings:
 * @param AttackerImage
 * @text Изображение атакующих
 * @desc Имя файла изображения атакующих (разместите в папке img/pictures)
 * @default hnefatafl/AttackerImage
 * @type file
 * @dir img/pictures
 *
 * @param MoveSound
 * @text Звук перемещения атакующих
 * @desc Имя файла звукового эффекта для перемещения атакующих (разместите в папке audio/se)
 * @default hnefatafl/MoveSound
 * @type file
 * @dir audio/se
 *
 * @param MoveSoundVolume
 * @text Громкость звука перемещения
 * @desc Громкость звука перемещения атакующих (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param MoveSoundPitch
 * @text Высота тона звука перемещения
 * @desc Высота тона звука перемещения атакующих (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param MoveSoundPan
 * @text Панорамирование звука перемещения
 * @desc Панорамирование звука перемещения атакующих (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */
 /*~struct~DefenderSettings:
 * @param DefenderImage
 * @text Изображение защитников
 * @desc Имя файла изображения защитников (разместите в папке img/pictures)
 * @default hnefatafl/DefenderImage
 * @type file
 * @dir img/pictures
 *
 * @param MoveSound
 * @text Звук перемещения защитников
 * @desc Имя файла звукового эффекта для перемещения защитников (разместите в папке audio/se)
 * @default hnefatafl/MoveSound
 * @type file
 * @dir audio/se
 *
 * @param MoveSoundVolume
 * @text Громкость звука перемещения
 * @desc Громкость звука перемещения защитников (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param MoveSoundPitch
 * @text Высота тона звука перемещения
 * @desc Высота тона звука перемещения защитников (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param MoveSoundPan
 * @text Панорамирование звука перемещения
 * @desc Панорамирование звука перемещения защитников (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */
/*~struct~KingSettings:
 * @param KingImage
 * @text Изображение короля
 * @desc Имя файла изображения короля (разместите в папке img/pictures)
 * @default hnefatafl/KingImage
 * @type file
 * @dir img/pictures
 *
 * @param MoveSound
 * @text Звук перемещения короля
 * @desc Имя файла звукового эффекта для перемещения короля (разместите в папке audio/se)
 * @default hnefatafl/MoveSound
 * @type file
 * @dir audio/se
 *
 * @param MoveSoundVolume
 * @text Громкость звука перемещения
 * @desc Громкость звука перемещения короля (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param MoveSoundPitch
 * @text Высота тона звука перемещения
 * @desc Высота тона звука перемещения короля (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param MoveSoundPan
 * @text Панорамирование звука перемещения
 * @desc Панорамирование звука перемещения короля (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */
/*~struct~CaptureAttackerSettings:
 * @param CaptureImage
 * @text Изображение захвата атакующего
 * @desc Имя файла для изображения, отображаемого при захвате атакующей фигуры.
 * @default hnefatafl/CaptureAttackerImage
 * @dir img/pictures/
 * @type file
 *
 * @param CaptureSound
 * @text Звук захвата атакующего
 * @desc Имя файла звукового эффекта для захвата атакующей фигуры (разместите в папке audio/se)
 * @default hnefatafl/CaptureAttackerSound
 * @type file
 * @dir audio/se
 *
 * @param CaptureSoundVolume
 * @text Громкость звука захвата
 * @desc Громкость звука захвата атакующего (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param CaptureSoundPitch
 * @text Высота тона звука захвата
 * @desc Высота тона звука захвата атакующего (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param CaptureSoundPan
 * @text Панорамирование звука захвата
 * @desc Панорамирование звука захвата атакующего (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */
/*~struct~CaptureDefenderSettings:
 * @param CaptureImage
 * @text Изображение захвата защитника
 * @desc Имя файла для изображения, отображаемого при захвате защитной фигуры.
 * @default hnefatafl/CaptureDefenderImage
 * @dir img/pictures/
 * @type file
 *
 * @param CaptureSound
 * @text Звук захвата защитника
 * @desc Имя файла звукового эффекта для захвата защитной фигуры (разместите в папке audio/se)
 * @default hnefatafl/CaptureAttackerSound
 * @type file
 * @dir audio/se
 *
 * @param CaptureSoundVolume
 * @text Громкость звука захвата
 * @desc Громкость звука захвата защитника (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param CaptureSoundPitch
 * @text Высота тона звука захвата
 * @desc Высота тона звука захвата защитника (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param CaptureSoundPan
 * @text Панорамирование звука захвата
 * @desc Панорамирование звука захвата защитника (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */
 /*~struct~ScoreSettings:
 * @param CaptureScore
 * @text Оценка захвата
 * @desc Оценка добавляемая к счету за возможность захвата фигуры.
 * @type number
 * @default 10
 *
 * @param PositioningScore
 * @text Оценка позиционирования
 * @desc Оценка добавляемая к счету за стратегическое позиционирование.
 * @type number
 * @default 50
 *
 * @param ThreatCreationScore
 * @text Оценка создания угрозы
 * @desc Оценка добавляемая к счету за создание угрозы.
 * @type number
 * @default 60
 *
 * @param EnhancedCaptureScore
 * @text Расширенная оценка захвата
 * @desc Оценка добавляемая за расширенные возможности захвата.
 * @type number
 * @default 70
 *
 * @param KingCaptureScore
 * @text Оценка захвата короля
 * @desc Оценка добавляемая за возможность захвата короля.
 * @type number
 * @default 110
 *
 * @param KingAccessibilityScore
 * @text Оценка доступности короля
 * @desc Оценка добавляемая за улучшение доступа к королю.
 * @type number
 * @default 110
 *
 * @param KingSurroundingScore
 * @text Оценка окружения короля
 * @desc Оценка добавляемая за улучшение окружения короля.
 * @type number
 * @default 100
 *
 * @param KingEscapeBlockingScore
 * @text Оценка блокировки побега короля
 * @desc Оценка добавляемая за блокировку путей побега короля.
 * @type number
 * @default 95
 */
 /*~struct~BoardSettings:
 * @param backgroundImage
 * @text Фоновое изображение
 * @desc Имя файла фонового изображения (разместите в папке img/pictures/hnefatafl)
 * @default hnefatafl/backgroundImage
 * @type file
 * @dir img/pictures
 *
 * @param InvalidMoveImage
 * @text Изображение при неверном ходе
 * @desc Имя файла для изображения, которое будет отображаться при неверном ходе
 * @default hnefatafl/InvalidMoveImage
 * @type file
 * @dir img/pictures
 *
 * @param InvalidMoveSound
 * @text Звук при неверном ходе
 * @desc Имя файла звукового эффекта, который будет воспроизводиться при неверном ходе
 * @default hnefatafl/InvalidMoveSound
 * @type file
 * @dir audio/se
 *
 * @param InvalidMoveSoundVolume
 * @text Громкость звука при неверном ходе
 * @desc Громкость звукового эффекта при неверном ходе (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param InvalidMoveSoundPitch
 * @text Высота тона звука при неверном ходе
 * @desc Высота тона звукового эффекта при неверном ходе (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param InvalidMoveSoundPan
 * @text Панорамирование звука при неверном ходе
 * @desc Панорамирование звукового эффекта при неверном ходе (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 *
 *
 * @param BoardX
 * @text X координата доски
 * @type number
 * @default 337
 * @desc X координата верхнего левого угла игровой доски.
 *
 * @param BoardY
 * @text Y координата доски
 * @type number
 * @default 9
 * @desc Y координата верхнего левого угла игровой доски.
 *
 * @param CellWidth
 * @text Ширина клетки
 * @type number
 * @default 64
 * @desc Ширина одной клетки на игровой доске.
 *
 * @param CellHeight
 * @text Высота клетки
 * @type number
 * @default 64
 * @desc Высота одной клетки на игровой доске.
 *
 * @param BoardOpacity
 * @text Прозрачность доски
 * @type number
 * @default 0
 * @min 0
 * @max 255
 * @desc Укажите прозрачность игровой доски от 0 до 255.
 */
 /*~struct~WinSettings:
 * @param WinImage
 * @text Изображение победы
 * @desc Имя файла изображения, которое будет отображаться при победе игрока.
 * @default hnefatafl/WinImage
 * @type file
 * @dir img/pictures
 *
 * @param WinSound
 * @text Звук победы
 * @desc Имя файла звукового эффекта, который будет воспроизводиться при победе игрока.
 * @default hnefatafl/WinSound
 * @type file
 * @dir audio/se
 *
 * @param WinSoundVolume
 * @text Громкость звука победы
 * @desc Громкость звукового эффекта победы (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param WinSoundPitch
 * @text Высота тона звука победы
 * @desc Высота тона звукового эффекта победы (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param WinSoundPan
 * @text Панорамирование звука победы
 * @desc Панорамирование звукового эффекта победы (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */
/*~struct~LoseSettings:
 * @param LoseImage
 * @text Изображение проигрыша
 * @desc Имя файла изображения, которое будет отображаться при поражении игрока.
 * @default hnefatafl/LoseImage
 * @type file
 * @dir img/pictures
 *
 * @param LoseSound
 * @text Звук проигрыша
 * @desc Имя файла звукового эффекта, который будет воспроизводиться при поражении игрока.
 * @default hnefatafl/WinSound
 * @type file
 * @dir audio/se
 *
 * @param LoseSoundVolume
 * @text Громкость звука проигрыша
 * @desc Громкость звукового эффекта проигрыша (0-100)
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param LoseSoundPitch
 * @text Высота тона звука проигрыша
 * @desc Высота тона звукового эффекта проигрыша (50-150)
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param LoseSoundPan
 * @text Панорамирование звука проигрыша
 * @desc Панорамирование звукового эффекта проигрыша (-100 до 100)
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */

(() => {
    PluginManager.parameters("SimpleHnefatafl");
    PluginManager.registerCommand("SimpleHnefatafl", "startHnefatafl", a => {
        console.log("Starting Hnefatafl with args:", a);
        const {
            difficulty: b,
            winVariable: c,
            loseVariable: e,
            winSwitch: d,
            loseSwitch: f,
            backgroundMusic: g,
            musicVolume: h,
            musicPitch: l,
            musicPan: n
        } = a;
        console.log("Difficulty:", b);
        $gameSystem.hnefataflDifficulty = b || "medium";
        $gameSystem.hnefataflSettings = {
            winVariable: c,
            loseVariable: e,
            winSwitch: d,
            loseSwitch: f,
            backgroundMusic: g,
            musicVolume: Number(h ||
                90),
            musicPitch: Number(l || 100),
            musicPan: Number(n || 0)
        };
        console.log("Settings applied:", $gameSystem.hnefataflSettings);
        SceneManager.push(y);
        console.log("Scene Hnefatafl pushed to stack")
    });
    PluginManager.registerCommand("SimpleHnefatafl", "cancel", a => {
        SceneManager.goto(Scene_Map)
    });
    class z {
        constructor(a, b, c, e, d, f, g, h) {
            this.x = a;
            this.y = b;
            this.type = c;
            this.sprite = new Sprite;
            this.sprite.bitmap = ImageManager.loadPicture(e);
            this.sprite.anchor.x = .5;
            this.sprite.anchor.y = 1;
            this.sprite.x = d + this.x * g + g / 2;
            this.sprite.y =
                f + this.y * h + h
        }
        updatePosition(a, b, c, e, d, f) {
            this.x = a;
            this.y = b;
            this.sprite.x = c + a * d + d / 2;
            this.sprite.y = e + b * f + f
        }
        addToScene(a) {
            a.addChild(this.sprite)
        }
        draw() {}
    }
    class y extends Scene_Base {
        constructor() {
            super();
            this._allowPlayerActions = !0;
            this.gameOver = !1;
            this.delayCounter = 0;
            this.isAIMoveReady = !1
        }
        initialize() {
            super.initialize();
            const a = JSON.parse(PluginManager.parameters("SimpleHnefatafl").BoardSettings),
                b = JSON.parse(PluginManager.parameters("SimpleHnefatafl").WinSettings),
                c = JSON.parse(PluginManager.parameters("SimpleHnefatafl").LoseSettings);
            this.boardX = Number(a.BoardX || 0);
            this.boardY = Number(a.BoardY || 0);
            this.cellWidth = Number(a.CellWidth || 64);
            this.cellHeight = Number(a.CellHeight || 64);
            this.boardOpacity = Number(a.BoardOpacity || 255);
            this.winSprite = new Sprite;
            this.winSprite.bitmap = ImageManager.loadPicture(b.WinImage);
            this.winSprite.visible = !1;
            this.addChild(this.winSprite);
            this.loseSprite = new Sprite;
            this.loseSprite.bitmap = ImageManager.loadPicture(c.LoseImage);
            this.loseSprite.visible = !1;
            this.addChild(this.loseSprite);
            this.isLoaded = !1;
            this.selectedHighlightSprite =
                null;
            this.board = [];
            this.boardWindows = [];
            this.selectedPiece = null;
            this.currentPlayer = "attackers";
            this.visualPieces = [];
            this.isAnimating = !1;
            this.animatingPiece = null;
            this.highlightImageName = PluginManager.parameters("SimpleHnefatafl").HighlightImage;
            this.invalidMoveTimer = 0;
            this.cursorY = this.cursorX = 5;
            this.blinkDuration = 30;
            this.blinkTimer = 0;
            this.aiMoveDelay = 200;
            this.aiMoveTimer = 0;
            this.isAIMoveReady = !1;
            this.difficulty = $gameSystem.hnefataflDifficulty || "medium"
        }
        start() {
            super.start();
			            AudioManager.stopBgm();
						AudioManager.stopBgs();
            this.createBackground();
            this.initializeBoard(this.difficulty);
            this.createBoardWindows();
            this.createStartImage()
        }
        createBackground() {
            const a = JSON.parse(PluginManager.parameters("SimpleHnefatafl").BoardSettings).backgroundImage;
            a && (this.backgroundSprite = new Sprite, this.backgroundSprite.bitmap = ImageManager.loadPicture(a), this.addChild(this.backgroundSprite))
        }
        createBoardWindows() {
            for (let a = 0; 11 > a; a++)
                for (let b = 0; 11 > b; b++) {
                    const c = new Window_Base(new Rectangle(this.boardX + b * this.cellWidth, this.boardY + a * this.cellHeight, this.cellWidth,
                        this.cellHeight));
                    c.opacity = this.boardOpacity;
                    this.addChild(c);
                    this.boardWindows.push(c)
                }
        }
        initializeBoard(a) {
            for (var b = 0; 11 > b; b++) {
                this.board[b] = [];
                for (var c = 0; 11 > c; c++) this.board[b][c] = null
            }
            this.board[5][5] = "king";
            b = [];
            c = [];
            switch (a) {
                case "easy":
                    b = [
                        [5, 4],
                        [5, 3],
                        [5, 6],
                        [5, 7],
                        [4, 5],
                        [3, 5],
                        [6, 5],
                        [7, 5],
                        [4, 4],
                        [4, 6],
                        [6, 4],
                        [6, 6],
                        [3, 4],
                        [3, 6],
                        [7, 4],
                        [7, 6]
                    ];
                    c = [
                        [0, 4],
                        [0, 5],
                        [0, 6],
                        [1, 5],
                        [10, 4],
                        [10, 5],
                        [10, 6],
                        [9, 5],
                        [4, 0],
                        [5, 0],
                        [6, 0],
                        [5, 1],
                        [4, 10],
                        [5, 10],
                        [6, 10],
                        [5, 9]
                    ];
                    break;
                case "medium":
                    b = [
                        [5, 4],
                        [5, 3],
                        [5, 6],
                        [5, 7],
                        [4,
                            5
                        ],
                        [3, 5],
                        [6, 5],
                        [7, 5],
                        [4, 4],
                        [4, 6],
                        [6, 4],
                        [6, 6]
                    ];
                    c = [
                        [0, 3],
                        [0, 4],
                        [0, 5],
                        [0, 6],
                        [0, 7],
                        [1, 5],
                        [10, 3],
                        [10, 4],
                        [10, 5],
                        [10, 6],
                        [10, 7],
                        [9, 5],
                        [3, 0],
                        [4, 0],
                        [5, 0],
                        [6, 0],
                        [7, 0],
                        [5, 1],
                        [3, 10],
                        [4, 10],
                        [5, 10],
                        [6, 10],
                        [7, 10],
                        [5, 9]
                    ];
                    break;
                case "hard":
                    b = [
                        [5, 4],
                        [5, 3],
                        [5, 6],
                        [5, 7],
                        [4, 5],
                        [3, 5],
                        [6, 5],
                        [7, 5],
                        [4, 4],
                        [4, 6],
                        [6, 4],
                        [6, 6]
                    ], c = [
                        [0, 2],
                        [0, 3],
                        [0, 4],
                        [0, 5],
                        [0, 6],
                        [0, 7],
                        [0, 8],
                        [10, 2],
                        [10, 3],
                        [10, 4],
                        [10, 5],
                        [10, 6],
                        [10, 7],
                        [10, 8],
                        [2, 0],
                        [3, 0],
                        [4, 0],
                        [5, 0],
                        [6, 0],
                        [7, 0],
                        [8, 0],
                        [2, 10],
                        [3, 10],
                        [4, 10],
                        [5, 10],
                        [6, 10],
                        [7, 10],
                        [8, 10],
                        [1, 3],
                        [1, 7],
                        [9, 3],
                        [9, 7],
                        [3, 1],
                        [7, 1],
                        [3, 9],
                        [7, 9]
                    ]
            }
            b.forEach(([e, d]) => {
                this.board[d][e] = "defender"
            });
            c.forEach(([e, d]) => {
                this.board[d][e] = "attacker"
            })
        }
        createVisualPieces() {
            for (let b = 0; b < this.board.length; b++)
                for (let c = 0; c < this.board[b].length; c++) {
                    var a = this.board[b][c];
                    if (a) {
                        let e = this.getImageForPieceType(a);
                        a = new z(c, b, a, e, this.boardX, this.boardY, this.cellWidth, this.cellHeight);
                        this.visualPieces.push(a);
                        a.addToScene(this)
                    }
                }
        }
        startGame() {
            this.savedBgm = AudioManager.saveBgm();
            var a = $gameSystem.hnefataflSettings.backgroundMusic ? {
                name: $gameSystem.hnefataflSettings.backgroundMusic,
                volume: $gameSystem.hnefataflSettings.musicVolume,
                pitch: $gameSystem.hnefataflSettings.musicPitch,
                pan: $gameSystem.hnefataflSettings.musicPan
            } : null;
            a && AudioManager.playBgm(a);
            this.updateBoardWindows();
            this.createVisualPieces();
            a = PluginManager.parameters("SimpleHnefatafl").SelectedHighlightImage;
            this.selectedHighlightSprite = new Sprite;
            this.selectedHighlightSprite.bitmap = ImageManager.loadPicture(a);
            this.selectedHighlightSprite.visible = !1;
            this.addChild(this.selectedHighlightSprite);
            this.createHighlightSprite();
            this.invalidMoveSprite = new Sprite;
            this.invalidMoveSprite.bitmap = ImageManager.loadPicture(PluginManager.parameters("SimpleHnefatafl").InvalidMoveImage);
            this.invalidMoveSprite.visible = !1;
            this.addChild(this.invalidMoveSprite);
            this.addChild(this.winSprite);
            this.addChild(this.loseSprite);
            this.isLoaded = !0
        }
        createStartImage() {
            var a = JSON.parse(PluginManager.parameters("SimpleHnefatafl").StartSettings);
            const b = a.StartImage,
                c = a.StartSound,
                e = Number(a.StartSoundVolume || 90),
                d = Number(a.StartSoundPitch ||
                    100);
            a = Number(a.StartSoundPan || 0);
            b && (this.startImageSprite = new Sprite, this.startImageSprite.bitmap = ImageManager.loadPicture(b), this.startImageSprite.x = 0, this.startImageSprite.y = 0, this.addChild(this.startImageSprite), c && AudioManager.playSe({
                name: c,
                volume: e,
                pitch: d,
                pan: a
            }), setTimeout(() => {
                this.startImageSprite && (this.removeChild(this.startImageSprite), this.startImageSprite = null, this.startGame())
            }, 3E3))
        }
        createHighlightSprite() {
            this.highlightSprite = new Sprite;
            this.highlightSprite.bitmap = ImageManager.loadPicture(this.highlightImageName);
            this.highlightSprite.visible = !1;
            this.addChild(this.highlightSprite);
            this.highlightSprite.opacity = 0
        }
        updateHighlightPosition() {
            void 0 !== this.cursorX && void 0 !== this.cursorY ? (this.highlightSprite.x = this.boardX + this.cursorX * this.cellWidth, this.highlightSprite.y = this.boardY + this.cursorY * this.cellHeight, this.highlightSprite.visible = !0) : this.highlightSprite.visible = !1
        }
        update() {
            super.update();
            Input.isTriggered("cancel") && this.isLoaded && this.exitGame();
            this.gameOver && 0 < this.delayCounter ? (this.delayCounter--,
                0 >= this.delayCounter && ($gameSystem.hnefataflDifficulty = void 0, SceneManager.goto(Scene_Map))) : this.isAnimating && this.animatingPiece ? this.updateAnimatingPiece() : "defenders" === this.currentPlayer ? (this.processKeyboardInput(), this.processCursorMovement(), this.updateHighlightBlink(), this.updateSelectedHighlight()) : "attackers" !== this.currentPlayer || this.isAIMoveReady || (this.aiMoveTimer++, this.aiMoveTimer >= this.aiMoveDelay && (this.aiMoveTimer = 0, this.isAIMoveReady = !0));
            this.isAIMoveReady && (this.makeAIMove(),
                this.isAIMoveReady = !1);
            0 < this.invalidMoveTimer && (this.invalidMoveTimer--, 0 === this.invalidMoveTimer && (this.invalidMoveSprite.visible = !1, this._allowPlayerActions = !0))
        }
        exitGame() {
            this.savedBgm ? AudioManager.replayBgm(this.savedBgm) : AudioManager.stopBgm();
            SceneManager.goto(Scene_Map)
        }
        processKeyboardInput() {
            this._allowPlayerActions && (Input.isRepeated("down") && (this.cursorY = Math.min(this.cursorY + 1, 10), this.updateHighlightPosition()), Input.isRepeated("up") && (this.cursorY = Math.max(this.cursorY - 1, 0), this.updateHighlightPosition()),
                Input.isRepeated("right") && (this.cursorX = Math.min(this.cursorX + 1, 10), this.updateHighlightPosition()), Input.isRepeated("left") && (this.cursorX = Math.max(this.cursorX - 1, 0), this.updateHighlightPosition()), Input.isTriggered("ok") && this.handleSelection())
        }
        processCursorMovement() {
            if (this._allowPlayerActions && TouchInput.isTriggered()) {
                const a = Math.floor((TouchInput.x - this.boardX) / this.cellWidth),
                    b = Math.floor((TouchInput.y - this.boardY) / this.cellHeight);
                0 <= a && 11 > a && 0 <= b && 11 > b && ("defenders" === this.currentPlayer &&
                    this.handlePieceSelection(a, b), this.cursorX = a, this.cursorY = b, this.updateHighlightPosition())
            }
        }
        handleSelection() {
            "defenders" === this.currentPlayer && this.handlePieceSelection(this.cursorX, this.cursorY)
        }
        updateSelectedHighlight() {
            this.selectedPiece ? (this.selectedHighlightSprite.x = this.boardX + this.selectedPiece.x * this.cellWidth, this.selectedHighlightSprite.y = this.boardY + this.selectedPiece.y * this.cellHeight, this.selectedHighlightSprite.visible = !0) : this.selectedHighlightSprite.visible = !1
        }
        updateHighlightBlink() {
            this.selectedPiece ?
                (this.blinkTimer = (this.blinkTimer + 1) % (2 * this.blinkDuration), this.highlightSprite.opacity = this.blinkTimer < this.blinkDuration ? 255 : 0) : this.highlightSprite.opacity = 255
        }
        updateAnimatingPiece() {
            const a = this.animatingPiece;
            a && (a.x += .1 * (a.targetX - a.x), a.y += .1 * (a.targetY - a.y), a.updatePosition(a.x, a.y, this.boardX, this.boardY, this.cellWidth, this.cellHeight), .01 > Math.abs(a.x - a.targetX) && .01 > Math.abs(a.y - a.targetY) && (a.x = a.targetX, a.y = a.targetY, this.isAnimating = !1, 0 <= a.targetY && a.targetY < this.board.length && 0 <=
                a.targetX && a.targetX < this.board[a.targetY].length && (this.board[a.targetY][a.targetX] = this.board[a.fromY][a.fromX]), 0 <= a.fromY && a.fromY < this.board.length && 0 <= a.fromX && a.fromX < this.board[a.fromY].length && (this.board[a.fromY][a.fromX] = null), this.updateBoardWindows(), this.checkForCapture(a.targetX, a.targetY, this.currentPlayer), this.checkGameState(), this.switchPlayer()))
        }
        updateBoardWindows() {
            for (let a = 0; a < this.boardWindows.length; a++) this.boardWindows[a].contents.clear()
        }
        makeMove(a, b, c, e) {
            if (this.animatingPiece =
                this.findVisualPiece(a, b)) {
                let d;
                switch (this.animatingPiece.type) {
                    case "attacker":
                        d = JSON.parse(PluginManager.parameters("SimpleHnefatafl").AttackerSettings);
                        break;
                    case "defender":
                        d = JSON.parse(PluginManager.parameters("SimpleHnefatafl").DefenderSettings);
                        break;
                    case "king":
                        d = JSON.parse(PluginManager.parameters("SimpleHnefatafl").KingSettings)
                }
                d && AudioManager.playSe({
                    name: d.MoveSound,
                    volume: Number(d.MoveSoundVolume || 90),
                    pitch: Number(d.MoveSoundPitch || 100) * (.8 + .4 * Math.random()),
                    pan: Number(d.MoveSoundPan ||
                        0)
                });
                this.animatingPiece.targetX = c;
                this.animatingPiece.targetY = e;
                this.animatingPiece.fromX = a;
                this.animatingPiece.fromY = b;
                this.isAnimating = !0
            }
            this.selectedPiece = null
        }
        handlePieceSelection(a, b) {
            if ("defenders" === this.currentPlayer)
                if (this.selectedPiece) a === this.selectedPiece.x && b === this.selectedPiece.y ? this.selectedPiece = null : "defender" === this.board[b][a] || "king" === this.board[b][a] ? this.selectedPiece = {
                    x: a,
                    y: b
                } : this.isValidMove(this.selectedPiece.x, this.selectedPiece.y, a, b) ? (this.makeMove(this.selectedPiece.x,
                    this.selectedPiece.y, a, b), this.selectedPiece = null) : this.showInvalidMoveImage();
                else if ("defender" === this.board[b][a] || "king" === this.board[b][a]) this.selectedPiece = {
                x: a,
                y: b
            }
        }
        isValidMove(a, b, c, e) {
            var d = "king" === this.board[b][a];
            if (0 > c || 11 <= c || 0 > e || 11 <= e || 5 === c && 5 === e && (!d || d && null !== this.board[e][c]) || 5 === c && 5 === e && !d || a !== c && b !== e) return !1;
            if (a === c)
                for (d = Math.min(b, e) + 1; d < Math.max(b, e); d++) {
                    if (null !== this.board[d][a]) return !1
                } else if (b === e)
                    for (d = Math.min(a, c) + 1; d < Math.max(a, c); d++)
                        if (null !== this.board[b][d]) return !1;
            return null !== this.board[e][c] ? !1 : !0
        }
        showInvalidMoveImage() {
            const a = JSON.parse(PluginManager.parameters("SimpleHnefatafl").BoardSettings),
                b = a.InvalidMoveSound,
                c = Number(a.InvalidMoveSoundVolume || 90),
                e = Number(a.InvalidMoveSoundPitch || 100),
                d = Number(a.InvalidMoveSoundPan || 0);
            this.invalidMoveSprite.bitmap = ImageManager.loadPicture(a.InvalidMoveImage);
            b && AudioManager.playSe({
                name: b,
                volume: c,
                pitch: e,
                pan: d
            });
            this._allowPlayerActions = !1;
            this.invalidMoveSprite.visible = !0;
            this.invalidMoveSprite.x = (Graphics.width -
                this.invalidMoveSprite.width) / 2;
            this.invalidMoveSprite.y = (Graphics.height - this.invalidMoveSprite.height) / 2;
            this.invalidMoveTimer = 120
        }
        switchPlayer() {
            this.currentPlayer = "defenders" === this.currentPlayer ? "attackers" : "defenders";
            "attackers" === this.currentPlayer && this.makeAIMove()
        }
        makeAIMove() {
            let a = this.findKing(this.board);
            if (a) {
                var b = this.findKingPaths(a),
                    c = [];
                this.board.forEach((d, f) => {
                    d.forEach((g, h) => {
                        "attacker" === g && this.checkPossibleMoves(h, f, c)
                    })
                });
                c = c.filter(d => this.isValidMove(d.fromX, d.fromY,
                    d.toX, d.toY));
                c.forEach(d => {
                    d.score = this.evaluateMove(d, b, a)
                });
                var e = c.filter(d => d.score === Math.max(...c.map(f => f.score)));
                0 < e.length && (e = e[Math.floor(Math.random() * e.length)], this.makeMove(e.fromX, e.fromY, e.toX, e.toY))
            }
        }
        checkPossibleMoves(a, b, c) {
            this.addMovesInDirection(a, b, 0, -1, c);
            this.addMovesInDirection(a, b, 0, 1, c);
            this.addMovesInDirection(a, b, -1, 0, c);
            this.addMovesInDirection(a, b, 1, 0, c)
        }
        addMovesInDirection(a, b, c, e, d) {
            let f = a + c,
                g = b + e;
            for (; 0 <= f && 11 > f && 0 <= g && 11 > g && null === this.board[g][f];) d.push({
                fromX: a,
                fromY: b,
                toX: f,
                toY: g
            }), f += c, g += e
        }
        findVisualPiece(a, b) {
            return this.visualPieces.find(c => c.x === a && c.y === b)
        }
        findKing() {
            for (let a = 0; a < this.board.length; a++)
                for (let b = 0; b < this.board[a].length; b++)
                    if ("king" === this.board[a][b]) return {
                        x: b,
                        y: a
                    };
            return null
        }
        isKingApproachingTunnelExit(a, b) {
            let c = !1;
            [
                [0, 0],
                [0, 10],
                [10, 0],
                [10, 10]
            ].forEach(([e, d]) => {
                if (b.toX === e && a.x !== e || b.toY === d && a.y !== d) c = !0
            });
            return c
        }
        findKingPaths(a) {
            let b = {
                up: a.y,
                down: 11 - a.y - 1,
                left: a.x,
                right: 11 - a.x - 1
            };
            const c = [5, 5],
                e = [
                    [0, 0],
                    [0, 10],
                    [10, 0],
                    [10, 10]
                ];
            for (let d = a.x + 1; 11 > d; d++)
                if (null !== this.board[a.y][d] || d === c[0] && a.y === c[1] && "king" !== this.board[5][5] || e.some(f => f[0] === d && f[1] === a.y)) {
                    b.right = d - a.x - 1;
                    break
                } for (let d = a.x - 1; 0 <= d; d--)
                if (null !== this.board[a.y][d] || d === c[0] && a.y === c[1] && "king" !== this.board[5][5] || e.some(f => f[0] === d && f[1] === a.y)) {
                    b.left = a.x - d - 1;
                    break
                } for (let d = a.y - 1; 0 <= d; d--)
                if (null !== this.board[d][a.x] || a.x === c[0] && d === c[1] && "king" !== this.board[5][5] || e.some(f => f[0] === a.x && f[1] === d)) {
                    b.up = a.y - d - 1;
                    break
                } for (let d = a.y + 1; 11 >
                d; d++)
                if (null !== this.board[d][a.x] || a.x === c[0] && d === c[1] && "king" !== this.board[5][5] || e.some(f => f[0] === a.x && f[1] === d)) {
                    b.down = d - a.y - 1;
                    break
                } return b
        }
        findKingEscapeRoutes(a) {
            const b = [];
            [{
                dx: 1,
                dy: 0
            }, {
                dx: -1,
                dy: 0
            }, {
                dx: 0,
                dy: 1
            }, {
                dx: 0,
                dy: -1
            }].forEach(c => {
                let e = 1;
                for (;;) {
                    const d = a.x + c.dx * e,
                        f = a.y + c.dy * e;
                    if (!this.isValidPosition(d, f) || null !== this.board[f][d]) break;
                    b.push({
                        x: d,
                        y: f
                    });
                    e++
                }
            });
            return b
        }
        evaluateMove(a) {
            const b = JSON.parse(PluginManager.parameters("SimpleHnefatafl").ScoreSettings);
            let c;
            c = 0 + (this.canCaptureAfterMove(a.toX,
                a.toY, "attacker") ? Number(b.CaptureScore) : 0);
            c += this.evaluatePositioning(a.toX, a.toY) ? Number(b.PositioningScore) : 0;
            c += this.evaluateThreatCreation(a.toX, a.toY) ? Number(b.ThreatCreationScore) : 0;
            c += this.enhancedCaptureEvaluation(a.toX, a.toY) ? Number(b.EnhancedCaptureScore) : 0;
            c += this.evaluateKingCapture(a.toX, a.toY) ? Number(b.KingCaptureScore) : 0;
            c += this.evaluateKingAccessibility(a) ? Number(b.KingAccessibilityScore) : 0;
            c += this.evaluateKingSurrounding(a) ? Number(b.KingSurroundingScore) : 0;
            return c += this.evaluateKingEscapeBlocking(a) ?
                Number(b.KingEscapeBlockingScore) : 0
        }
        evaluateKingEscapeBlocking(a) {
            let b = this.findKing();
            if (!b) return 0;
            let c = 0,
                e = this.getKingMovementDirection(b);
            [{
                x: 0,
                y: 0,
                block: [{
                    x: 1,
                    y: 0
                }, {
                    x: 0,
                    y: 1
                }]
            }, {
                x: 0,
                y: 10,
                block: [{
                    x: 1,
                    y: 10
                }, {
                    x: 0,
                    y: 9
                }]
            }, {
                x: 10,
                y: 0,
                block: [{
                    x: 9,
                    y: 0
                }, {
                    x: 10,
                    y: 1
                }]
            }, {
                x: 10,
                y: 10,
                block: [{
                    x: 9,
                    y: 10
                }, {
                    x: 10,
                    y: 9
                }]
            }].forEach(d => {
                d.block.some(f => f.x === a.toX && f.y === a.toY) && e === this.determineDirectionTowards(d, b) && (c += 500)
            });
            return c
        }
        getKingMovementDirection(a) {
            return this.lastKingPosition ? a.x > this.lastKingPosition.x ?
                "right" : a.x < this.lastKingPosition.x ? "left" : a.y > this.lastKingPosition.y ? "down" : a.y < this.lastKingPosition.y ? "up" : "none" : "none"
        }
        determineDirectionTowards(a, b) {
            return b.x < a.x && b.y === a.y ? "right" : b.x > a.x && b.y === a.y ? "left" : b.y < a.y && b.x === a.x ? "down" : b.y > a.y && b.x === a.x ? "up" : "none"
        }
        evaluateKingCapture(a, b) {
            const c = this.findKing();
            if (!c) return 0;
            let e = 0;
            [{
                dx: 1,
                dy: 0
            }, {
                dx: -1,
                dy: 0
            }, {
                dx: 0,
                dy: 1
            }, {
                dx: 0,
                dy: -1
            }].forEach(({
                dx: d,
                dy: f
            }) => {
                d = c.x + d;
                f = c.y + f;
                this.isValidPosition(d, f) && "attacker" === this.board[f][d] && e++
            });
            return 4 === e ? 1E3 : 0
        }
        evaluateKingAccessibility(a) {
            let b = this.findKing();
            if (!b) return 0;
            let c = 0;
            [{
                dx: 1,
                dy: 0
            }, {
                dx: -1,
                dy: 0
            }, {
                dx: 0,
                dy: 1
            }, {
                dx: 0,
                dy: -1
            }].forEach(e => {
                let d = b.x + e.dx;
                e = b.y + e.dy;
                !this.isValidPosition(d, e) || null !== this.board[e][d] && "attacker" !== this.board[e][d] || a.toX === d && a.toY === e && (c += 200)
            });
            return c
        }
        evaluateKingSurrounding(a) {
            let b = this.findKing();
            if (!b) return 0;
            let c = a = 0;
            [{
                dx: 1,
                dy: 0
            }, {
                dx: -1,
                dy: 0
            }, {
                dx: 0,
                dy: 1
            }, {
                dx: 0,
                dy: -1
            }].forEach(e => {
                let d = b.x + e.dx;
                e = b.y + e.dy;
                this.isValidPosition(d, e) && "attacker" !==
                    this.board[e][d] || c++
            });
            0 < c && 4 > c && (a += 300 * c);
            4 === c && (a += 1E3);
            return a
        }
        assessKingThreat(a, b) {
            let c = this.findKing();
            if (!c) return {
                threatExists: !1,
                threatScore: 0
            };
            let e = 0,
                d = !1;
            [{
                dx: 1,
                dy: 0
            }, {
                dx: -1,
                dy: 0
            }, {
                dx: 0,
                dy: 1
            }, {
                dx: 0,
                dy: -1
            }].forEach(f => {
                let g = a + f.dx,
                    h = b + f.dy;
                for (; this.isValidPosition(g, h);) {
                    if (g === c.x && h === c.y) {
                        d = !0;
                        e += 200;
                        break
                    }
                    if (this.board[h][g]) break;
                    g += f.dx;
                    h += f.dy
                }
            });
            return {
                threatExists: d,
                threatScore: e
            }
        }
        evaluateThreatCreation(a, b) {
            let c = 0;
            [{
                dx: 1,
                dy: 0
            }, {
                dx: -1,
                dy: 0
            }, {
                dx: 0,
                dy: 1
            }, {
                dx: 0,
                dy: -1
            }].forEach(e => {
                let d = a + e.dx,
                    f = b + e.dy;
                for (; this.isValidPosition(d, f) && null === this.board[f][d];) d += e.dx, f += e.dy;
                !this.isValidPosition(d, f) || "king" !== this.board[f][d] && "defender" !== this.board[f][d] || c++
            });
            return 200 * c
        }
        enhancedCaptureEvaluation(a, b) {
            let c;
            c = this.canCaptureAfterMove(a, b, "attacker") ? 20 : 0;
            return c += this.predictFutureCaptures(a, b, "attacker") ? 30 : 0
        }
        predictFutureCaptures(a, b, c) {
            let e = 0;
            [{
                dx: 1,
                dy: 0
            }, {
                dx: -1,
                dy: 0
            }, {
                dx: 0,
                dy: 1
            }, {
                dx: 0,
                dy: -1
            }].forEach(d => {
                const f = a + d.dx,
                    g = b + d.dy;
                var h = a - d.dx;
                d = b - d.dy;
                this.isValidPosition(f,
                    g) && this.isValidPosition(h, d) && (h = this.board[d][h], h = h === c || null === h, this.board[g][f] === ("attacker" === c ? "defender" : "attacker") && h && e++)
            });
            return e
        }
        checkForCapture(a, b, c) {
            const e = "defenders" === c ? "attacker" : "defender";
            let d;
            d = "defenders" === c ? ["defender", "king"] : "attacker";
            c = JSON.parse(PluginManager.parameters("SimpleHnefatafl")["attacker" === e ? "CaptureAttackerSettings" : "CaptureDefenderSettings"]);
            const f = c.CaptureImage,
                g = c.CaptureSound,
                h = Number(c.CaptureSoundVolume),
                l = Number(c.CaptureSoundPitch),
                n = Number(c.CaptureSoundPan),
                A = [
                    [0, 0],
                    [0, 10],
                    [10, 0],
                    [10, 10]
                ],
                w = [5, 5],
                B = "king" === this.board[w[1]][w[0]];
            [
                [0, -1],
                [1, 0],
                [0, 1],
                [-1, 0]
            ].forEach(([m, p]) => {
                const q = a + m,
                    r = b + p,
                    t = q + m,
                    u = r + p;
                m = A.some(([v, k]) => v === t && k === u);
                p = t === w[0] && u === w[1] && null === this.board[u][t] && !B;
                if (this.isValidPosition(q, r) && (this.isValidPosition(t, u) || m || p) && (m = Array.isArray(d) ? d.includes(this.board[u][t]) || m || p : this.board[u][t] === d || m || p, this.board[r][q] === e && m)) {
                    this.board[r][q] = null;
                    const v = this.findVisualPiece(q, r);
                    if (v) {
                        const k = new Sprite;
                        k.bitmap = ImageManager.loadPicture(f);
                        AudioManager.playSe({
                            name: g,
                            volume: h,
                            pitch: l,
                            pan: n
                        });
                        const x = () => {
                            k.bitmap.isReady() ? (k.x = this.boardX + q * this.cellWidth + this.cellWidth / 2 - k.bitmap.width / 2, k.y = this.boardY + r * this.cellHeight + this.cellHeight / 2 - k.bitmap.height / 2, this.addChild(k), setTimeout(() => {
                                this.removeChild(k)
                            }, 800)) : setTimeout(x, 10)
                        };
                        x();
                        this.removeChild(v.sprite);
                        this.visualPieces = this.visualPieces.filter(C => C !== v)
                    }
                    this.checkGameState()
                }
            })
        }
        canCaptureAfterMove(a, b, c) {
            const e = "king" === this.board[5][5];
            let d = !1;
            [{
                    dx: 1,
                    dy: 0
                }, {
                    dx: -1,
                    dy: 0
                },
                {
                    dx: 0,
                    dy: 1
                }, {
                    dx: 0,
                    dy: -1
                }
            ].forEach(f => {
                const g = a + f.dx,
                    h = b + f.dy;
                var l = a + 2 * f.dx;
                const n = b + 2 * f.dy;
                this.isValidPosition(g, h) && this.isValidPosition(l, n) && (f = this.board[n][l], l = 5 === l && 5 === n && !e, this.board[h][g] !== ("attacker" === c ? "defender" : "attacker") || f !== c && !l || (d = !0))
            });
            return d
        }
        isValidPosition(a, b) {
            return 0 <= a && a < this.board.length && 0 <= b && b < this.board[0].length
        }
        isKingNextToWall(a) {
            return 0 === a.x || a.x === this.board[0].length - 1 || 0 === a.y || a.y === this.board.length - 1
        }
        evaluatePositioning(a, b) {
            let c = 0;
            var e = this.findKing();
            if (!e) return 0;
            c += Math.max(0, 10 - (Math.abs(e.x - a) + Math.abs(e.y - b)));
            e = [this.board.length / 2, this.board[0].length / 2];
            c += Math.max(0, 10 - (Math.abs(e[0] - a) + Math.abs(e[1] - b)));
            this.canCaptureAfterMove(a, b, "attacker") && (c += 20);
            return c
        }
        noAttackersLeft() {
            for (let a = 0; a < this.board.length; a++)
                for (let b = 0; b < this.board[a].length; b++)
                    if ("attacker" === this.board[a][b]) return !1;
            return !0
        }
        checkGameState() {
            const a = this.findKing(this.board);
            a && (this.isKingAtFortress(a) ? this.endGame("Defenders") : this.isKingSurrounded(a) ?
                this.endGame("Attackers") : this.noAttackersLeft() && this.endGame("Defenders"))
        }
        isKingAtFortress(a) {
            return [
                [0, 0],
                [0, 10],
                [10, 0],
                [10, 10]
            ].some(([b, c]) => b === a.x && c === a.y)
        }
        isKingSurrounded(a) {
            let b = 0;
            [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0]
            ].forEach(([c, e]) => {
                c = a.x + c;
                e = a.y + e;
                (!this.isValidPosition(c, e) || "attacker" === this.board[e][c] || this.isThrone(c, e) && !this.isKingOnThrone(a)) && b++
            });
            return 0 === a.x || 10 === a.x || 0 === a.y || 10 === a.y ? 3 <= b : 4 === b
        }
        evaluateFortressControl(a) {
            let b = 0;
            [{
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 0
            }, {
                x: 10,
                y: 10
            }].forEach(c => {
                c = Math.abs(c.x - a.toX) + Math.abs(c.y - a.toY);
                3 >= c && (b += 100 * (4 - c))
            });
            return b
        }
        isThrone(a, b) {
            return 5 === a && 5 === b
        }
        isKingOnThrone(a) {
            return 5 === a.x && 5 === a.y
        }
        endGame(a) {
            const b = $gameSystem.hnefataflSettings;
            "Defenders" === a ? (this.showWinImage(), $gameSwitches.setValue(b.winSwitch, !0), b.winVariable && (a = $gameVariables.value(b.winVariable), $gameVariables.setValue(b.winVariable, a + 1))) : "Attackers" === a && (this.showLoseImage(), $gameSwitches.setValue(b.loseSwitch, !0), b.loseVariable && (a = $gameVariables.value(b.loseVariable),
                $gameVariables.setValue(b.loseVariable, a + 1)));
            this.gameOver = !0;
            this.delayCounter = 300;
            setTimeout(() => {
                this.savedBgm ? AudioManager.replayBgm(this.savedBgm) : AudioManager.stopBgm();
                this.exitGame()
            }, 3E3)
        }
        showWinImage() {
            const a = JSON.parse(PluginManager.parameters("SimpleHnefatafl").WinSettings);
            a.WinSound && AudioManager.playSe({
                name: a.WinSound,
                volume: Number(a.WinSoundVolume || 90),
                pitch: Number(a.WinSoundPitch || 100),
                pan: Number(a.WinSoundPan || 0)
            });
            this.winSprite.x = (Graphics.width - this.winSprite.width) / 2;
            this.winSprite.y =
                (Graphics.height - this.winSprite.height) / 2;
            this.winSprite.visible = !0
        }
        showLoseImage() {
            const a = JSON.parse(PluginManager.parameters("SimpleHnefatafl").LoseSettings);
            a.LoseSound && AudioManager.playSe({
                name: a.LoseSound,
                volume: Number(a.LoseSoundVolume || 90),
                pitch: Number(a.LoseSoundPitch || 100),
                pan: Number(a.LoseSoundPan || 0)
            });
            this.loseSprite.x = (Graphics.width - this.loseSprite.width) / 2;
            this.loseSprite.y = (Graphics.height - this.loseSprite.height) / 2;
            this.loseSprite.visible = !0
        }
        hideWinImage() {
            this.winSprite.visible = !1
        }
        hideLoseImage() {
            this.loseSprite.visible = !1
        }
        getImageForPieceType(a) {
            switch (a) {
                case "attacker":
                    return JSON.parse(PluginManager.parameters("SimpleHnefatafl").AttackerSettings).AttackerImage || "attacker";
                case "defender":
                    return JSON.parse(PluginManager.parameters("SimpleHnefatafl").DefenderSettings).DefenderImage || "defender";
                case "king":
                    return JSON.parse(PluginManager.parameters("SimpleHnefatafl").KingSettings).KingImage || "king";
                default:
                    return ""
            }
        }
    }
})();
