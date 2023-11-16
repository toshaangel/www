/*
 * License
 * Creative Commons 4.0 Attribution, Share Alike
 * <https://creativecommons.org/licenses/by-sa/4.0/>
 *
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
 */

/*:
 * @plugindesc (v.1.3)[PRO] Mobile controls: Joystick, Buttons, UI
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/mobile-controls
 *
 * 
 * @help
 *
 * Add simple mobile controls: joystick for movement and custom screen buttons
 * for common events calls.
 *
 * =====================================================
 *
 * Special script calls for buttons:
 * ( write them in Script Call On Click in button settings)
 *
 *  PKD_MobileControls.simulateAction();  - simulate Enter key press
 *  PKD_MobileControls.simulateCancel(); - simualte Esc key press
 *  PKD_MobileControls.simulateJump(); - Jump (1 forward)
 *
 *  For conditions: Is Button is Pressed?
 *  IsMCButtonIsPressed(INDEX); - return TRUE if button with INDEX is pressed
 *
 * =====================================================
 * Plugin Commands [MV]:
 * 
 * MC Joystick COMMAND
 * 
 * MC Button INDEX COMMAND
 * 
 * Where:
 * COMMAND - enable, disable, hide, show
 * INDEX - button index (from 1) from Buttons plugin parameter
 *
 * Examples:
 * MC Joystick hide
 * MC Button 1 disable
 *
 * =====================================================
 * Plugin Command [MZ]:
 * Plugin have commands for control joystick and buttons.
 * You can change visibility during game or enable or disable
 * items.
 *
 * =====================================================
 * Quick Question Window:
 *
 *  Description:
 *      Custom question window with extra question (optional) and two buttons
 *          - First button always OK option
 *          - Second button always CANCEL option 
 *      !!! Works only for Choices with only 2 variants
 *              and cancel option should be enabled
 *
 * How to use:
 * ------------------------------------------------------
 *  In RPG Maker MZ you can use Plugin Command: Quick Question
 *
 * Alternative way (and for RPG Maker MV):
 *
 *  Script call: QuickQuestion("question text");
 *  (next Show Choice command will be as Quick Question)
 *
 * You can customize Quick Question window, adding Script calls (below!):
 *
 *   - SetQuickQButtons(OK_BUTTON_IMAGE_NAME, CANCEL_BUTTON_IMAGE_NAME);
 *
 *      You should two files per image (in picture folder):
 *      "IMAGE_NAME_00.png"
 *      "IMAGE_NAME_01.png" (for hover state)
 *
 *      Example: SetQuickQButtons("mcButtonYes", "mcButtonNo");
 *
 *  - SetQuickQBackground(IMAGE_NAME);
 *
 *     Image should be in Pictures folder
 *     Example: SetQuickQBackground("customBackgroundImage");
 *
 *
 *
 * !!! SetQuickQButtons and SetQuickQBackground should be
 *          BELOW QuickQuestion script call
 *
 * !!! QuickQuestion script call always reset settings to
 *          DEFAULT (as in Plugin Parameters)
 * =====================================================
  *
 *
 * Visit plugin web page for more information, also you can find Demo project.
 * 
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who support me!
 * 
 
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 * 
 * @requiredAssets img/pictures/JoystickBase
 * @requiredAssets img/pictures/JoystickBase_00
 * @requiredAssets img/pictures/JoystickBase_Arrows
 * @requiredAssets img/pictures/JoystickBase_Arrows_00
 * @requiredAssets img/pictures/JoystickBase_Arrows_D
 * @requiredAssets img/pictures/JoystickBase_Arrows_L
 * @requiredAssets img/pictures/JoystickBase_Arrows_R
 * @requiredAssets img/pictures/JoystickBase_Arrows_U
 * @requiredAssets img/pictures/JoystickMain
 * @requiredAssets img/pictures/JoystickMain_00
 * @requiredAssets img/pictures/mcButtonCancel_00
 * @requiredAssets img/pictures/mcButtonCancel_01
  * @requiredAssets img/pictures/mcButtonCancel2_00
 * @requiredAssets img/pictures/mcButtonNo_00
  * @requiredAssets img/pictures/mcButtonNo_01
 * @requiredAssets img/pictures/mcButtonOK_00
  * @requiredAssets img/pictures/mcButtonOK_01
 * @requiredAssets img/pictures/mcButtonOk2_00
  * @requiredAssets img/pictures/mcButtonYes_00
 * @requiredAssets img/pictures/mcButtonYes_01
  * @requiredAssets img/pictures/mcQuickQuestionBackgroundExample
 * @requiredAssets img/pictures/mcQuickQuestionWindowDefaultBackground
   * @requiredAssets img/pictures/mcSwitchButton_OFF
 * @requiredAssets img/pictures/mcSwitchButton_ON
 * @param Joystick:s
 * @text Joystick
 * @type struct<LJoystick>
 * @default {"visible:b":"true","joyType:i":"0","position:s":"{\"x\":\"10\",\"y\":\"Graphics.height - 196\"}","is4WayDirection:b":"true","isHideWhenMessage:b":"true","dashingOnEdge:b":"true","extraMoveOutOfEdge:i":"10"}
 * @desc Joystick settings
 * 
 * @param Buttons:structA
 * @text Buttons
 * @type struct<CUButton>[]
 * @default ["{\"visible:bool\":\"true\",\"position:s\":\"{\\\"x\\\":\\\"Graphics.width - 170\\\",\\\"y\\\":\\\"Graphics.height - 100\\\"}\",\"states:s\":\"{\\\"main\\\":\\\"JButton_A_00\\\",\\\"hover\\\":\\\"JButton_A_01\\\",\\\"disabled\\\":\\\"JButton_A_03\\\"}\",\"isHideWhenMessage:b\":\"true\",\"click:int\":\"0\",\"clickE\":\"PKD_MobileControls.simulateAction()\"}","{\"visible:bool\":\"true\",\"position:s\":\"{\\\"x\\\":\\\"Graphics.width - 120\\\",\\\"y\\\":\\\"Graphics.height - 190\\\"}\",\"states:s\":\"{\\\"main\\\":\\\"JButton_B_00\\\",\\\"hover\\\":\\\"JButton_B_01\\\",\\\"disabled\\\":\\\"JButton_B_03\\\"}\",\"isHideWhenMessage:b\":\"true\",\"click:int\":\"0\",\"clickE\":\"PKD_MobileControls.simulateCancel()\"}"]
 * @desc Screen buttons
 * 
 * @param switchButtons:structA
 * @text Switch Buttons
 * @type struct<SwitchButtonConfig>[]
 * @default []
 * @desc Screen Switch buttons
 * 
 * @param isUseAlternativeJoystick:b
 * @text Is Use Alt. Joystick?
 * @type boolean
 * @default false
 * @desc Use alternative, html based Joystick
 * 
 * @param alternativeJoystickConfig:struct
 * @parent isUseAlternativeJoystick:b
 * @text Configuration
 * @type struct<AltJoySettings>
 * @default {"isHideWithMessages:b":"true","cssText":"position:absolute;bottom:10px;left:10px;width:250px;height:250px;","visSetGroup":"","internalLineWidth:i":"6","externalLineWidth:i":"4","internalFillColor":"#757575","internalStrokeColor":"#d9b61c","externalStrokeColor":"#3d3d3d"}
 * @desc Configuration
 * 
 * @param MapTouchInput:bool
 * @text Map Touch Movement?
 * @type boolean
 * @default false
 * @desc Allow player movement by map touch (mouse click on map)?
 * 
 * @param 8wayMovement:bool
 * @text Diagonal movement?
 * @type boolean
 * @default false
 * @desc Simple 8-way diagonal movement, works with Joystick, don't works with DPad
 * 
 * @param useMenuButtons:bool
 * @text Extra Touch buttons?
 * @type boolean
 * @default true
 * @desc [MV only] Added Menu button and Back button (as in RPG Maker MZ)
 * 
 * @param callMenu:bool
 * @text Two fingers menu call?
 * @type boolean
 * @default true
 * @desc If the menu is annoying called when the joystick and one of the buttons are pressed set to FALSE
 * 
 * @param diagonalEventStart:bool
 * @parent 8wayMovement:bool
 * @text Diagonal Event Touch
 * @type boolean
 * @default false
 * @desc Starts events when player touch them diagonally, can be helpfull in mobile games
 * 
 * @param windowQQ:s
 * @text Quick Question Window
 * @type struct<str18> 
 * @desc Quick question window visual settings
 * @default {"windowSize:s":"{\"w:int\":\"600\",\"h:int\":\"240\"}","windowPosition:s":"{\"x\":\"Graphics.width / 2 - 300\",\"y\":\"Graphics.height / 2 - 200\"}","textPosition:s":"{\"x:int\":\"10\",\"y:int\":\"10\"}","textSize:s":"{\"w:int\":\"580\",\"h:int\":\"120\"}","textFontSize:i":"34","buttonYesPosition:s":"{\"x:int\":\"120\",\"y:int\":\"146\"}","buttonNoPosition:s":"{\"x:int\":\"320\",\"y:int\":\"146\"}","defaultText:str":"Are you sure?"}
 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command JoyStickState
 * @text Joystick State
 * @desc Deactivate or activate joystick
 * 
 * @arg active
 * @text Is Disabled?
 * @type boolean
 * @default false
 * 
 * 
 * @command JoyStickVisible
 * @text Joystick Visibility
 * @desc Hide or show joystick
 * 
 * @arg hidden
 * @text Is Hidden?
 * @type boolean
 * @default false
 * 
 * 
 * @command ButtonState
 * @text Button State
 * @desc Deactivate or activate any button
 * 
 * @arg buttonId
 * @text Index
 * @type text
 * @default 1
 * @desc Button index (from 1) in Plugin Parameter Buttons OR button Name
 * 
 * @arg active
 * @text Is Disabled?
 * @type boolean
 * @default false
 * 
 * 
 * 
 * @command ButtonVisible
 * @text Button Visibility
 * @desc Hide or Show any button
 * 
 * @arg buttonId
 * @text Index
 * @type text
 * @default 1
 * @desc Button index (from 1) in Plugin Parameter Buttons OR button Name
 * 
 * 
 * @arg hidden
 * @text Is Hidden?
 * @type boolean
 * @default false
 * 
 * @command ButtonImage
 * @text Button Image
 * @desc Change button images
 * 
 * @arg buttonId
 * @text Index
 * @type text
 * @default 1
 * @desc Button index (from 1) in Plugin Parameter Buttons OR button Name
 * 
 * @arg states
 * @text New Images
 * @type struct<ButtonStates>
 * @default
 * @desc New Images for button states. Leave empty to return to default ones.
 * 
 * @command QuickQuestion
 * @text Quick Question
 * @desc Next Show Choices command will be Quick Question
 * 
 * @arg questionText
 * @text Question
 * @default Are you sure?
 * @desc Question text, supports control characters
 * 
 * @arg buttonYes
 * @text Button Yes
 * @default mcButtonOK_00
 * @type file
 * @dir img\pictures
 * @require 1
 * @desc Image for Yes button
 * 
 * @arg buttonNo
 * @text Button No
 * @default mcButtonCancel_00
 * @type file
 * @dir img\pictures
 * @require 1
 * @desc Image for No button
 * 
 * @arg background
 * @text Background
 * @default mcQuickQuestionWindowDefaultBackground
 * @type file
 * @dir img\pictures
 * @require 1
 * @desc Image for background. Keep empty to set default window (no background image)
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.3)[PRO] Управление для мобильных устройств
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/mobile-controls
 *
 * 
 * @help
 *
 * Добавьте простые мобильные элементы управления:
 *  - джойстик для перемещения
 *  - кнопки для вызовов общих событий
 *
 * =====================================================
 *
 * Специальный вызовы скриптов (для кнопок):
 * ( прописываются в поле Script Call On Click в настройках кнопки)
 *
 *  PKD_MobileControls.simulateAction();  - симуляция нажатия ENTER
 *  PKD_MobileControls.simulateCancel(); - симуляция нажатия ESC
 *  PKD_MobileControls.simulateJump(); - Прыжок (на 1 клетку вперёд)
 *
 *  Для поля условия (Is Button is Pressed?):
 *  IsMCButtonIsPressed(INDEX); - возвращает TRUE (истину) если кнопка с INDEX (индекс) нажата
 *
 * =====================================================
 * Команды плагина для RPG Maker MV:
 * 
 * MC Joystick COMMAND
 * 
 * MC Button INDEX COMMAND
 * 
 * Где:
 * COMMAND - enable, disable, hide, show
 * (включить, отключить, спрятать, показать)
 *
 * INDEX - номер кнопки (с 1) из Buttons параметра плагина
 *
 * Примеры:
 * MC Joystick hide
 * MC Button 1 disable
 *
 * =====================================================
 * Команды плагина для RPG Maker MZ:
 *
 * В плагине есть команды для управления джойстиком и кнопками.
 * Вы можете изменить видимость во время игры, активировать или деактивировать
 * элементы.
 *
 * =====================================================
 * Окно Quick Question (быстрый вопрос):
 *
 *  Описание:
 *      Пользовательское окно с вопросом и двумя кнопками
 *          - Первая кнопка всегда означает ДА
 *          - Вторая кнопка всегда означает НЕТ
 *      !!! Работает только для выбора с 2 вариантами
 *              и возможность отмены должна быть включена
 *
 * Как использовать:
 * ------------------------------------------------------
 *  В RPG Maker MZ вы можете использовать команду плагина: Quick Question
 *
 * Альтернативый режим (и для RPG Maker MV):
 *
 *  Вызов скрипта: QuickQuestion("текст вопроса");
 *  (следующая команда события Show Choice (показать выбор) будет как Quick Question)
 *
 * Для настройки, добавьте СНИЗУ следующие вызовы скриптов:
 *
 *   - SetQuickQButtons(OK_BUTTON_IMAGE_NAME, CANCEL_BUTTON_IMAGE_NAME);
 *          (задать изображения для кнопок ДА и НЕТ)
 *
 *      У каждого изображения должно быть два файла (в папке Pictures):
 *      "IMAGE_NAME_00.png"
 *      "IMAGE_NAME_01.png" (выделена)
 *
 *      Примем: SetQuickQButtons("mcButtonYes", "mcButtonNo");
 *
 *  - SetQuickQBackground(IMAGE_NAME);
 *      (задать изображение фона)
 *
 *     Изображение (файл) должен быть в папке Pictures
 *
 *     Пример: SetQuickQBackground("customBackgroundImage");
 *
 *
 *
 * !!! SetQuickQButtons и SetQuickQBackground должны быть
 *          НИЖЕ вызова скрипта QuickQuestion
 *
 * !!! QuickQuestion script call always reset settings to
 *          DEFAULT (as in Plugin Parameters)
 * =====================================================
  *
 *
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * 
 * @requiredAssets img/pictures/JoystickBase
 * @requiredAssets img/pictures/JoystickBase_00
 * @requiredAssets img/pictures/JoystickBase_Arrows
 * @requiredAssets img/pictures/JoystickBase_Arrows_00
 * @requiredAssets img/pictures/JoystickBase_Arrows_D
 * @requiredAssets img/pictures/JoystickBase_Arrows_L
 * @requiredAssets img/pictures/JoystickBase_Arrows_R
 * @requiredAssets img/pictures/JoystickBase_Arrows_U
 * @requiredAssets img/pictures/JoystickMain
 * @requiredAssets img/pictures/JoystickMain_00
 * @requiredAssets img/pictures/mcButtonCancel_00
 * @requiredAssets img/pictures/mcButtonCancel_01
  * @requiredAssets img/pictures/mcButtonCancel2_00
 * @requiredAssets img/pictures/mcButtonNo_00
  * @requiredAssets img/pictures/mcButtonNo_01
 * @requiredAssets img/pictures/mcButtonOK_00
  * @requiredAssets img/pictures/mcButtonOK_01
 * @requiredAssets img/pictures/mcButtonOk2_00
  * @requiredAssets img/pictures/mcButtonYes_00
 * @requiredAssets img/pictures/mcButtonYes_01
  * @requiredAssets img/pictures/mcQuickQuestionBackgroundExample
 * @requiredAssets img/pictures/mcQuickQuestionWindowDefaultBackground
* @requiredAssets img/pictures/mcSwitchButton_OFF
 * @requiredAssets img/pictures/mcSwitchButton_ON
 * @param Joystick:s
 * @text Joystick
 * @type struct<LJoystick>
 * @default {"visible:b":"true","joyType:i":"0","position:s":"{\"x\":\"10\",\"y\":\"Graphics.height - 196\"}","is4WayDirection:b":"true","isHideWhenMessage:b":"true","dashingOnEdge:b":"true","extraMoveOutOfEdge:i":"10"}
 * @desc Настройки джойстика
 * 
 * @param Buttons:structA
 * @text Buttons
 * @type struct<CUButton>[]
 * @default ["{\"visible:bool\":\"true\",\"position:s\":\"{\\\"x\\\":\\\"Graphics.width - 170\\\",\\\"y\\\":\\\"Graphics.height - 100\\\"}\",\"states:s\":\"{\\\"main\\\":\\\"JButton_A_00\\\",\\\"hover\\\":\\\"JButton_A_01\\\",\\\"disabled\\\":\\\"JButton_A_03\\\"}\",\"isHideWhenMessage:b\":\"true\",\"click:int\":\"0\",\"clickE\":\"PKD_MobileControls.simulateAction()\"}","{\"visible:bool\":\"true\",\"position:s\":\"{\\\"x\\\":\\\"Graphics.width - 120\\\",\\\"y\\\":\\\"Graphics.height - 190\\\"}\",\"states:s\":\"{\\\"main\\\":\\\"JButton_B_00\\\",\\\"hover\\\":\\\"JButton_B_01\\\",\\\"disabled\\\":\\\"JButton_B_03\\\"}\",\"isHideWhenMessage:b\":\"true\",\"click:int\":\"0\",\"clickE\":\"PKD_MobileControls.simulateCancel()\"}"]
 * @desc Кнопки на экране
 * 
 * @param switchButtons:structA
 * @text Switch Buttons
 * @type struct<SwitchButtonConfig>[]
 * @default []
 * @desc Кнопки (переключатели) на экране
 * 
 * @param isUseAlternativeJoystick:b
 * @text Is Use Alt. Joystick?
 * @type boolean
 * @default false
 * @desc Использовать алтернативный джойстик? (HTML)
 * 
 * @param alternativeJoystickConfig:struct
 * @parent isUseAlternativeJoystick:b
 * @text Configuration
 * @type struct<AltJoySettings>
 * @default {"isHideWithMessages:b":"true","cssText":"position:absolute;bottom:10px;left:10px;width:250px;height:250px;","visSetGroup":"","internalLineWidth:i":"6","externalLineWidth:i":"4","internalFillColor":"#757575","internalStrokeColor":"#d9b61c","externalStrokeColor":"#3d3d3d"}
 * @desc Настройки
 * 
 * @param MapTouchInput:bool
 * @text Map Touch Movement?
 * @type boolean
 * @default false
 * @desc Позволить игроку передвигаться по нажатию по экрану?
 * 
 * @param 8wayMovement:bool
 * @text Diagonal movement?
 * @type boolean
 * @default false
 * @desc Диагональное движение в 8 направлениях (работает с джойстиком)
 * 
 * @param useMenuButtons:bool
 * @text Extra Touch buttons?
 * @type boolean
 * @default true
 * @desc [Только MV] Добавить кнопки меню и назад на карту и в сцены меню
 * 
 * @param callMenu:bool
 * @text Two fingers menu call?
 * @type boolean
 * @default true
 * @desc Вызывать меню при касании двумя пальцами по экрану?
 * 
 * @param diagonalEventStart:bool
 * @parent 8wayMovement:bool
 * @text Diagonal Event Touch
 * @type boolean
 * @default false
 * @desc Запускать события при касании их (игроком) по диагонали?
 * 
 * @param windowQQ:s
 * @text Quick Question Window
 * @type struct<str18> 
 * @desc Настройки для Quick question окна
 * @default {"windowSize:s":"{\"w:int\":\"600\",\"h:int\":\"240\"}","windowPosition:s":"{\"x\":\"Graphics.width / 2 - 300\",\"y\":\"Graphics.height / 2 - 200\"}","textPosition:s":"{\"x:int\":\"10\",\"y:int\":\"10\"}","textSize:s":"{\"w:int\":\"580\",\"h:int\":\"120\"}","textFontSize:i":"34","buttonYesPosition:s":"{\"x:int\":\"120\",\"y:int\":\"146\"}","buttonNoPosition:s":"{\"x:int\":\"320\",\"y:int\":\"146\"}","defaultText:str":"Are you sure?"}
 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command JoyStickState
 * @text Joystick State
 * @desc Активировать или деактивировать джойстик
 * 
 * @arg active
 * @text Отключена?
 * @type boolean
 * @default false
 * 
 * 
 * @command JoyStickVisible
 * @text Joystick Visibility
 * @desc Показать или спрятать джойстик
 * 
 * @arg hidden
 * @text Спрятана?
 * @type boolean
 * @default false
 * 
 * 
 * @command ButtonState
 * @text Button State
 * @desc Активировать или деактивировать кнопку
 * 
 * @arg buttonId
 * @text Индекс
 * @type text
 * @default 1
 * @desc Индекс кнопки (с 1) из Параметров плагина Buttons или имя кнопки
 * 
 * @arg active
 * @text Отключена?
 * @type boolean
 * @default false
 * 
 * 
 * 
 * @command ButtonVisible
 * @text Button Visibility
 * @desc Показать или спрятать кнопку
 * 
 * @arg buttonId
 * @text Индекс
 * @type text
 * @default 1
 * @desc Индекс кнопки (с 1) из Параметров плагина Buttons или имя кнопки
 * 
 * 
 * @arg hidden
 * @text Спрятана?
 * @type boolean
 * @default false
 * 
 * @command ButtonImage
 * @text Картинка
 * @desc Изменить изображение кнопки
 * 
 * @arg buttonId
 * @text Индекс
 * @type text
 * @default 1
 * @desc Индекс кнопки (с 1) из Параметров плагина Buttons или имя кнопки
 * 
 * @arg states
 * @text New Images
 * @type struct<ButtonStates>
 * @default
 * @desc New Images for button states. Leave empty to return to default ones.
 * 
 * @command QuickQuestion
 * @text Quick Question
 * @desc Следующая команда выбора ответа будет быстрым ответом (Quick Question)
 * 
 * @arg questionText
 * @text Вопрос
 * @default Вы уверены?
 * @desc Текст вопроса
 * 
 * @arg buttonYes
 * @text Кнопка ДА
 * @default mcButtonOK_00
 * @type file
 * @dir img\pictures
 * @require 1
 * @desc Изображение для кнопки ДА
 * 
 * @arg buttonNo
 * @text Кнопка НЕТ
 * @default mcButtonCancel_00
 * @type file
 * @dir img\pictures
 * @require 1
 * @desc Изображение для кнопки НЕТ
 * 
 * @arg background
 * @text Фоновая картинка
 * @default mcQuickQuestionWindowDefaultBackground
 * @type file
 * @dir img\pictures
 * @require 1
 * @desc Опционально. Изображение для фона
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~LJoystick:
    @param visible:b
    @text Is Active?
    @type boolean
    @default true
    @desc Use joystick in game?

   @param joyType:i
   @text Joystick Type
   @type select
   @option Joystick
   @value 0
   @option DPad
   @value 1
   @default 0
   @desc DPad supports only 4-way movement

    @param position:s
    @text Position
    @type struct<XY2>
    @default
    @desc Position on screen

    @param is4WayDirection:b
    @text 4 way Direction?
    @type boolean
    @on 4 way
    @off 8 way
    @default true
    @desc Moving 4 way or 8 way direction? If 8 way, then Diagonal movement - should be ON

    @param isHideWhenMessage:b
    @text Fade when game message?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Joystick will change opacity when any game message is visible

    @param dashingOnEdge:b
    @text Dashing with joystick?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc When the joystick is in the out of edges position player will dash

    @param extraMoveOutOfEdge:i
    @text Out of edges distance
    @type number
    @min 1
    @max 50
    @default 10
    @desc How far you can move center of joystick out of edges when moving

    @param pressDelay:i
    @text Delay
    @type number
    @min 0
    @max 60
    @default 0
    @desc Delay in FRAMES before start recognize touch (starts moving). You can set joystick sensitivity for avoid accidental touch
 */

/*~struct~CUButton:

  * @param NameButton
  * @text Name
  * @desc Button Name (used for change button image via plugin command)
  * @default 

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this button visible?
 
    @param position:s
    @text Position
    @type struct<XY2>
    @default
    @desc Position on screen

    @param states:s
    @text Images
    @type struct<ButtonStates>
    @default
    @desc Images for button states

    @param isHideWhenMessage:b
    @text Fade when game message?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Button will change opacity when any game message is visible

 *
 * @param click:int
 * @text CE On Click
 * @desc This common event starts when button is clicked
 * @type common_event
 * @default 1
 *
 * @param clickE
 * @text Script Call On Click
 * @desc Script call when button is clicked, override CE On Click!
 * @default 
 *
*/

/*~struct~ButtonStates:
 * @param main
 * @text Main Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Button main image, required!
 * 
 * @param hover
 * @text Hover Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Button hover image (when you hover by mouse or press button), required!
 *  
 * @param disabled
 * @text Disabled Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Button image when button is disabled [optional]
 */

/*~struct~XY2:
 * @param x
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */

 /*~struct~str0:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
*/

/*~struct~str2:

 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000

*/

/*~struct~str18:

 @param windowSize:s
 @text Window Size
 @type struct<str0> 
 @desc 
 @default {} 


 @param windowPosition:s
 @text Window Position
 @type struct<XY2> 
 @desc 
 @default {} 


 @param textPosition:s
 @text Text Position
 @type struct<str2> 
 @desc Text position relative window
 @default {} 


 @param textSize:s
 @text Text Size
 @type struct<str0> 
 @desc Text box size
 @default {} 


 @param textFontSize:i
 @text Font Size
 @type number 
 @min 4
 @desc Text font size
 @default 34 


 @param buttonYesPosition:s
 @text Button Yes
 @type struct<str2> 
 @desc Position of YES button (OK)
 @default {} 


 @param buttonNoPosition:s
 @text Button No
 @type struct<str2> 
 @desc Position of NO button (cancel)
 @default {} 

 @param defaultText:str
 @text Default Text
 @type text
 @desc Default quick question window text (if text not specified via script call)
 @default Are you sure? 

*/


/*~struct~AltJoySettings:

@param isHideWithMessages:b
@text Hide when game message?
@type boolean
@on Yes
@off No
@default true
@desc Joystick will be hidden when any game message is visible

@param cssText
@text CSS Config
@default position:absolute;bottom:10px;left:10px;width:250px;height:250px;
@desc CSS configuration of Joystick screen position and size

@param visSetGroup
@text Visual Settings

 @param internalLineWidth:i
 @parent visSetGroup
 @text Internal Line Width
 @type number 
 @min 0
 @default 6

 @param externalLineWidth:i
 @parent visSetGroup
 @text External Line Width
 @type number 
 @min 0
 @default 4

 @param internalFillColor
 @parent visSetGroup
 @text Internal Fill Color
 @default #757575
 @desc Color in HEX format

 @param internalStrokeColor
 @parent visSetGroup
 @text Internal Stroke Color
 @default #d9b61c
 @desc Color in HEX format

 @param externalStrokeColor
 @parent visSetGroup
 @text External Stroke Color
 @default #3d3d3d
 @desc Color in HEX format

*/


/*~struct~SwitchButtonConfig:

 @param switchId:i
 @text Controlled switch
 @type switch 
 @desc Required! You will control state of this switch by this Switch Button
 @default 1

 @param enabledSwitchId:i
 @text Enabled Switch
 @type switch 
 @desc When this Switch is ON, you will see this element. 0 - always visible
 @default 0

 @param position:struct
 @text Position
 @type struct<XY2>
 @default {"x":"0","y":"0"}
 @desc Position of element on screen

 @param onImage
 @text ON image
 @type file
 @dir img/pictures/
 @require 1
 @default mcSwitchButton_ON
 @desc Required! Image when switch is ON

 @param offImage
 @text OFF image
 @type file
 @dir img/pictures/
 @require 1
 @default mcSwitchButton_OFF
 @desc Required! Image when switch is OFF

@param isHideWhenMessage:b
@text Fade when game message?
@type boolean
@on Yes
@off No
@default true
@desc Button will change opacity when any game message is visible

@param keyboardKey
@text Keyboard Key
@default
@desc Keyboard key for switch this Switch Button state

 @param commonEventOnSwitch:int
 @text Common Event
 @type common_event
 @default 0
 @desc Optional. Common Event when switch state changed

 @param switchSE
 @text Sound SE
 @type file
 @dir audio/se/
 @require 1
 @default
 @desc Sound effect (SE) when switch button is clicked

 @param labelImage:struct
 @text Label
 @type struct<SwitchButtonLabel>
 @default {"name":"","marginX:int":"0","marginY:int":"0"}
 @desc Optional. Label image for Switch Button

*/


/*~struct~SwitchButtonLabel:


 @param name
 @text Image
 @type file
 @dir img/pictures/
 @require 1
 @default
 @desc Label image

 * @param marginX:int
 * @text Margin X
 * @type number
 * @default 0
 * @desc Margin by X relative Switch Button
 * @min -1000
 *
 * @param marginY:int
 * @text Margin Y
 * @type number
 * @default 0
 * @desc Margin by Y relative Switch Button
 * @min -1000

*/


var Imported = Imported || {};
Imported.PKD_MobileControls = true;

var PKD_MobileControls = {};
PKD_MobileControls.Version = 130;

PKD_MobileControls.link = function (library) {
    this[library.name] = library;
};

PKD_MobileControls.MCHUI = {};

/*
 * Name          : joy.js
 * @author       : Roberto D'Amico (Bobboteck)
 * Last modified : 09.06.2020
 * Revision      : 1.1.6
 *
 * Modification History:
 * Date         Version     Modified By     Description
 * 2021-12-21   2.0.0       Roberto D'Amico New version of the project that integrates the callback functions, while 
 *                                          maintaining compatibility with previous versions. Fixed Issue #27 too, 
 *                                          thanks to @artisticfox8 for the suggestion.
 * 2020-06-09   1.1.6       Roberto D'Amico Fixed Issue #10 and #11
 * 2020-04-20   1.1.5       Roberto D'Amico Correct: Two sticks in a row, thanks to @liamw9534 for the suggestion
 * 2020-04-03               Roberto D'Amico Correct: InternalRadius when change the size of canvas, thanks to 
 *                                          @vanslipon for the suggestion
 * 2020-01-07   1.1.4       Roberto D'Amico Close #6 by implementing a new parameter to set the functionality of 
 *                                          auto-return to 0 position
 * 2019-11-18   1.1.3       Roberto D'Amico Close #5 correct indication of East direction
 * 2019-11-12   1.1.2       Roberto D'Amico Removed Fix #4 incorrectly introduced and restored operation with touch 
 *                                          devices
 * 2019-11-12   1.1.1       Roberto D'Amico Fixed Issue #4 - Now JoyStick work in any position in the page, not only 
 *                                          at 0,0
 * 
 * The MIT License (MIT)
 *
 *  This file is part of the JoyStick Project (https://github.com/bobboteck/JoyStick).
 *	Copyright (c) 2015 Roberto D'Amico (Bobboteck).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

let StickStatus =
{
    xPosition: 0,
    yPosition: 0,
    x: 0,
    y: 0,
    cardinalDirection: "C"
};

/**
 * @desc Principal object that draw a joystick, you only need to initialize the object and suggest the HTML container
 * @costructor
 * @param container {String} - HTML object that contains the Joystick
 * @param parameters (optional) - object with following keys:
 *  title {String} (optional) - The ID of canvas (Default value is 'joystick')
 *  width {Int} (optional) - The width of canvas, if not specified is setted at width of container object (Default value is the width of container object)
 *  height {Int} (optional) - The height of canvas, if not specified is setted at height of container object (Default value is the height of container object)
 *  internalFillColor {String} (optional) - Internal color of Stick (Default value is '#00AA00')
 *  internalLineWidth {Int} (optional) - Border width of Stick (Default value is 2)
 *  internalStrokeColor {String}(optional) - Border color of Stick (Default value is '#003300')
 *  externalLineWidth {Int} (optional) - External reference circonference width (Default value is 2)
 *  externalStrokeColor {String} (optional) - External reference circonference color (Default value is '#008000')
 *  autoReturnToCenter {Bool} (optional) - Sets the behavior of the stick, whether or not, it should return to zero position when released (Default value is True and return to zero)
 * @param callback {StickStatus} - 
 */
var JoyStick = (function(container, parameters, callback)
{
    parameters = parameters || {};
    var title = (typeof parameters.title === "undefined" ? "joystick" : parameters.title),
        width = (typeof parameters.width === "undefined" ? 0 : parameters.width),
        height = (typeof parameters.height === "undefined" ? 0 : parameters.height),
        internalFillColor = (typeof parameters.internalFillColor === "undefined" ? "#00AA00" : parameters.internalFillColor),
        internalLineWidth = (typeof parameters.internalLineWidth === "undefined" ? 2 : parameters.internalLineWidth),
        internalStrokeColor = (typeof parameters.internalStrokeColor === "undefined" ? "#003300" : parameters.internalStrokeColor),
        externalLineWidth = (typeof parameters.externalLineWidth === "undefined" ? 2 : parameters.externalLineWidth),
        externalStrokeColor = (typeof parameters.externalStrokeColor ===  "undefined" ? "#008000" : parameters.externalStrokeColor),
        autoReturnToCenter = (typeof parameters.autoReturnToCenter === "undefined" ? true : parameters.autoReturnToCenter);

    callback = callback || function(StickStatus) {};

    // Create Canvas element and add it in the Container object
    var objContainer = document.getElementById(container);
    
    // Fixing Unable to preventDefault inside passive event listener due to target being treated as passive in Chrome [Thanks to https://github.com/artisticfox8 for this suggestion]
    objContainer.style.touchAction = "none";

    var canvas = document.createElement("canvas");
    canvas.id = title;
    if(width === 0) { width = objContainer.clientWidth; }
    if(height === 0) { height = objContainer.clientHeight; }
    canvas.width = width;
    canvas.height = height;
    objContainer.appendChild(canvas);
    var context=canvas.getContext("2d");

    var pressed = 0; // Bool - 1=Yes - 0=No
    var circumference = 2 * Math.PI;
    var internalRadius = ((canvas.width-((canvas.width/2)+10))/2) - 10;
    var maxMoveStick = internalRadius + 5;
    var externalRadius = internalRadius + 30 + 10;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var directionHorizontalLimitPos = canvas.width / 10;
    var directionHorizontalLimitNeg = directionHorizontalLimitPos * -1;
    var directionVerticalLimitPos = canvas.height / 10;
    var directionVerticalLimitNeg = directionVerticalLimitPos * -1;
    // Used to save current position of stick
    var movedX=centerX;
    var movedY=centerY;

    // Check if the device support the touch or not
    if("ontouchstart" in document.documentElement)
    {
        canvas.addEventListener("touchstart", onTouchStart, false);
        document.addEventListener("touchmove", onTouchMove, false);
        document.addEventListener("touchend", onTouchEnd, false);
    }
    else
    {
        canvas.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mousemove", onMouseMove, false);
        document.addEventListener("mouseup", onMouseUp, false);
    }
    // Draw the object
    drawExternal();
    drawInternal();

    /******************************************************
     * Private methods
     *****************************************************/

    /**
     * @desc Draw the external circle used as reference position
     */
    function drawExternal()
    {
        context.beginPath();
        context.arc(centerX, centerY, externalRadius, 0, circumference, false);
        context.lineWidth = externalLineWidth;
        context.strokeStyle = externalStrokeColor;
        context.stroke();
    }

    /**
     * @desc Draw the internal stick in the current position the user have moved it
     */
    function drawInternal()
    {
        context.beginPath();
        if(movedX<internalRadius) { movedX=maxMoveStick; }
        if((movedX+internalRadius) > canvas.width) { movedX = canvas.width-(maxMoveStick); }
        if(movedY<internalRadius) { movedY=maxMoveStick; }
        if((movedY+internalRadius) > canvas.height) { movedY = canvas.height-(maxMoveStick); }
        context.arc(movedX, movedY, internalRadius, 0, circumference, false);
        // create radial gradient
        var grd = context.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
        // Light color
        grd.addColorStop(0, internalFillColor);
        // Dark color
        grd.addColorStop(1, internalStrokeColor);
        context.fillStyle = grd;
        context.fill();
        context.lineWidth = internalLineWidth;
        context.strokeStyle = internalStrokeColor;
        context.stroke();
    }

    /**
     * @desc Events for manage touch
     */
    function onTouchStart(event) 
    {
        pressed = 1;
    }

    function onTouchMove(event)
    {
        if(pressed === 1 && event.targetTouches[0].target === canvas)
        {
            movedX = event.targetTouches[0].pageX;
            movedY = event.targetTouches[0].pageY;
            // Manage offset
            if(canvas.offsetParent.tagName.toUpperCase() === "BODY")
            {
                movedX -= canvas.offsetLeft;
                movedY -= canvas.offsetTop;
            }
            else
            {
                movedX -= canvas.offsetParent.offsetLeft;
                movedY -= canvas.offsetParent.offsetTop;
            }
            // Delete canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Redraw object
            drawExternal();
            drawInternal();

            // Set attribute of callback
            StickStatus.xPosition = movedX;
            StickStatus.yPosition = movedY;
            StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
            StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
            StickStatus.cardinalDirection = getCardinalDirection();
            callback(StickStatus);
        }
    } 

    function onTouchEnd(event) 
    {
        pressed = 0;
        // If required reset position store variable
        if(autoReturnToCenter)
        {
            movedX = centerX;
            movedY = centerY;
        }
        // Delete canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw object
        drawExternal();
        drawInternal();

        // Set attribute of callback
        StickStatus.xPosition = movedX;
        StickStatus.yPosition = movedY;
        StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
        StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
        StickStatus.cardinalDirection = getCardinalDirection();
        callback(StickStatus);
    }

    /**
     * @desc Events for manage mouse
     */
    function onMouseDown(event) 
    {
        pressed = 1;
    }

    /* To simplify this code there was a new experimental feature here: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX , but it present only in Mouse case not metod presents in Touch case :-( */
    function onMouseMove(event) 
    {
        if(pressed === 1)
        {
            movedX = event.pageX;
            movedY = event.pageY;
            // Manage offset
            if(canvas.offsetParent.tagName.toUpperCase() === "BODY")
            {
                movedX -= canvas.offsetLeft;
                movedY -= canvas.offsetTop;
            }
            else
            {
                movedX -= canvas.offsetParent.offsetLeft;
                movedY -= canvas.offsetParent.offsetTop;
            }
            // Delete canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Redraw object
            drawExternal();
            drawInternal();

            // Set attribute of callback
            StickStatus.xPosition = movedX;
            StickStatus.yPosition = movedY;
            StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
            StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
            StickStatus.cardinalDirection = getCardinalDirection();
            callback(StickStatus);
        }
    }

    function onMouseUp(event) 
    {
        pressed = 0;
        // If required reset position store variable
        if(autoReturnToCenter)
        {
            movedX = centerX;
            movedY = centerY;
        }
        // Delete canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw object
        drawExternal();
        drawInternal();

        // Set attribute of callback
        StickStatus.xPosition = movedX;
        StickStatus.yPosition = movedY;
        StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
        StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
        StickStatus.cardinalDirection = getCardinalDirection();
        callback(StickStatus);
    }

    function getCardinalDirection()
    {
        let result = "";
        let orizontal = movedX - centerX;
        let vertical = movedY - centerY;
        
        if(vertical >= directionVerticalLimitNeg && vertical <= directionVerticalLimitPos)
        {
            result = "C";
        }
        if(vertical < directionVerticalLimitNeg)
        {
            result = "N";
        }
        if(vertical > directionVerticalLimitPos)
        {
            result = "S";
        }
        
        if(orizontal < directionHorizontalLimitNeg)
        {
            if(result === "C")
            { 
                result = "W";
            }
            else
            {
                result += "W";
            }
        }
        if(orizontal > directionHorizontalLimitPos)
        {
            if(result === "C")
            { 
                result = "E";
            }
            else
            {
                result += "E";
            }
        }
        
        return result;
    }

    /******************************************************
     * Public methods
     *****************************************************/

    /**
     * @desc The width of canvas
     * @return Number of pixel width 
     */
    this.GetWidth = function () 
    {
        return canvas.width;
    };

    /**
     * @desc The height of canvas
     * @return Number of pixel height
     */
    this.GetHeight = function () 
    {
        return canvas.height;
    };

    /**
     * @desc The X position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    this.GetPosX = function ()
    {
        return movedX;
    };

    /**
     * @desc The Y position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    this.GetPosY = function ()
    {
        return movedY;
    };

    /**
     * @desc Normalizzed value of X move of stick
     * @return Integer from -100 to +100
     */
    this.GetX = function ()
    {
        return (100*((movedX - centerX)/maxMoveStick)).toFixed();
    };

    /**
     * @desc Normalizzed value of Y move of stick
     * @return Integer from -100 to +100
     */
    this.GetY = function ()
    {
        return ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
    };

    /**
     * @desc Get the direction of the cursor as a string that indicates the cardinal points where this is oriented
     * @return String of cardinal point N, NE, E, SE, S, SW, W, NW and C when it is placed in the center
     */
    this.GetDir = function()
    {
        return getCardinalDirection();
    };


    // * ========================================================================= * //
    // * EXTRA CODE BY PHEONIX KAGEDESU * //

    this.GetRPGMakerDir = function() {
        var cardinal = this.GetDir();
        switch (cardinal) {
            case "N":
                return 8;
            case "NW":
                return 7;
            case "NE":
                return 9;
            case "W":
                return 4;
            case "SW":
                return 1;
            case "S":
                return 2;
            case "SE":
                return 3;
            case "E":
                return 6;
            default:
                return 0;
        }
    };

    this.IsPressed = function() {
        return pressed == 1;
    };
});


/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 11.10.23
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.9';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[3.2.7] since
    _.getIndexIn2DArrayByIJ = function(row, col, cols) {
      return row * cols + col;
    };
    //@[3.2.7] since
    // * row - строка
    // * col - столбец
    _.getIJByIndexIn2DArray = function(index, cols) {
      var col, e, row;
      try {
        row = Math.floor(index / cols);
        col = index % cols;
        return [row, col];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0, 0];
      }
    };
    //@[3.2.7] since
    _.isSwitchIsTRUE = function(switchId) {
      var e;
      if (switchId == null) {
        return true;
      }
      if (switchId <= 0) {
        return true;
      }
      try {
        return $gameSwitches.value(switchId) === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      moveWithAnimation(dx, dy, duration = 30, easingType = 2) {
        var e;
        try {
          this._moveAnimationItem = new Game_Picture();
          this._moveAnimationItem._x = this.x;
          this._moveAnimationItem._y = this.y;
          this._moveAnimationItem.move(0, this.x + dx, this.y + dy, 1, 1, 255, 0, duration, easingType);
          this.updateMovingAnimation = this.updateMovingAnimationBody;
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      //@[DYNAMIC]
      updateMovingAnimation() {} // * EMPTY

      updateMovingAnimationBody() {
        var e;
        try {
          if (this._moveAnimationItem == null) {
            return;
          }
          this._moveAnimationItem.update();
          this.x = this._moveAnimationItem._x;
          this.y = this._moveAnimationItem._y;
          if (this._moveAnimationItem._duration <= 0) {
            this._moveAnimationItem = null;
            this.updateMovingAnimation = function() {};
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          this.updateMovingAnimation = function() {};
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        this.updateTooltip();
        if (this.updateMovingAnimation != null) {
          this.updateMovingAnimation();
        }
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isUnderMouse()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        clearFilters() {
          return this.filters = [];
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return ((ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0) && this.isFullVisible();
        }

        // * Полностью ли виден объект? (включае всех его родителей)
        isFullVisible() {
          return this.visible === true && this.allParentsIsVisible();
        }

        // * Все ли родители объекта видимы
        allParentsIsVisible() {
          var e, p;
          if (!this.visible) {
            return false;
          }
          try {
            if (this.parent != null) {
              p = this.parent;
              while (p != null) {
                if (p.visible === true) {
                  p = p.parent;
                } else {
                  return false;
                }
              }
              return true;
            } else {
              return this.visible === true;
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            return true;
          }
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      if (this.params.visible != null) {
        this.visible = this.params.visible;
      }
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        if (isFinite(x) && isFinite(y)) {
          x = Number(x);
          y = Number(y);
        } else {
          x = Number(eval(x));
          y = Number(eval(y));
        }
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.move(0, 0);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //TODO: ROOT IMAGE FOLDER AS PARAMETER!!!
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss(),
          // ? can be Null or not exists
          shadow: {
            color: "#000",
            opacity: 200,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 11.10.2023

// * Загрузка и обработка параметров плагина
(function(){
    
    PKD_MobileControls.LoadPluginSettings = () => {

        PKD_MobileControls.PARAMS = new KDCore.ParamLoader("Joystick:s");
        PKD_MobileControls.JOYSTICK = PKD_MobileControls.PARAMS.getParam(
            "Joystick",
            {
                visible: true,
                position: [10, "Graphics.height - 196"],
                joyType: 0,
                is4WayDirection: true,
                isHideWhenMessage: true,
                dashingOnEdge: true,
                extraMoveOutOfEdge: 10,
                pressDelay: 0
            }
        );

        PKD_MobileControls.BUTTONS = PKD_MobileControls.PARAMS.getParam(
            "Buttons", []
        );

        PKD_MobileControls.MAP_TOUCH = PKD_MobileControls.PARAMS.getParam(
            "MapTouchInput", false
        );

        PKD_MobileControls.DIAG = PKD_MobileControls.PARAMS.getParam(
            "8wayMovement", false
        );

        PKD_MobileControls.DIAG_EV_START = PKD_MobileControls.PARAMS.getParam(
            "diagonalEventStart", false
        );

        PKD_MobileControls.PRESS_DELAY = PKD_MobileControls.JOYSTICK.pressDelay;

        PKD_MobileControls.CALL_MENU = PKD_MobileControls.PARAMS.getParam(
            "callMenu", true
        );

        PKD_MobileControls.IS_ALT_JOY = PKD_MobileControls.PARAMS.getParam(
            "isUseAlternativeJoystick", false 
        );

        PKD_MobileControls.SWITCH_BUTTONS = PKD_MobileControls.PARAMS.getParam(
            "switchButtons", [] 
        );

        PKD_MobileControls.ALT_JOY_CONFIG = PKD_MobileControls.PARAMS.getParam(
            "alternativeJoystickConfig", {
                isHideWithMessages: true,
                cssText: "position:absolute;bottom:10px;left:10px;width:250px;height:250px;",
                internalFillColor: "#757575",
                internalStrokeColor: "#d9b61c",
                internalLineWidth: 6,
                externalStrokeColor: "#3d3d3d",
                externalLineWidth: 4
            }
        );

        PKD_MobileControls.Window_QQ = PKD_MobileControls.PARAMS.getParam(
            "windowQQ", {
                windowSize: {
                    w: 600,
                    h: 240
                },
                windowPosition: {
                    x: "Graphics.width / 2 - 300",
                    y: "Graphics.height / 2 - 200"
                },
                textPosition: {
                    x: 10,
                    y: 10
                },
                textSize: {
                    w: 580,
                    h: 120
                },
                textFontSize: 34,
                buttonYesPosition: {
                    x: 120,
                    y: 146
                },
                buttonNoPosition: {
                    x: 320,
                    y: 146
                },
                buttonYesQkey: "y",
                buttonNoQKey: "n",
                buttonYesQKeyG: "A",
                buttonNoQKeyG: "B",
                defaultText: "Are you sure?"
            }
        );

        if(PKD_MobileControls.DIAG == true) {
            PKD_MobileControls.ActivateDiagonalMovement();
            if(PKD_MobileControls.DIAG_EV_START == true) {
                PKD_MobileControls.ActivateDiagonalEventStart();
            }
        }

        if(KDCore.isMZ())
            RegisterPluginCommnadsMZ_MC();
        else {
            RegisterPluginCommandsMV_MC();
            ExtendInputMV_MC();
            if(PKD_MobileControls.PARAMS.getParam("useMenuButtons", false)) {
                PKD_MobileControls.UseMenuButtons();
            }
        }
        
        ConfigurateClasses();
    
    };

    convertButtonIndex = (indexOrName) => {
        if(isFinite(indexOrName)) {
            return parseInt(indexOrName);
        } else {
            // * Надо найти кнопку по имени и вернуть её индекс
            //TODO: Тут остановился
        }
    };

    convertIndexToButtonName = (indexOrName) => {
        //TODO: Тут надо наоборот, INDEX в имя преобразовать
    };

    RegisterPluginCommnadsMZ_MC = () => {

        PluginManager.registerCommand("PKD_MobileControls", 'JoyStickState', args => {
            try {
                let isActive = eval(args.active);
                $gameSystem.pSetMobileControlsSettings(0, 1, !isActive);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'JoyStickVisible', args => {
            try {
                let isHidden = eval(args.hidden);
                $gameSystem.pSetMobileControlsSettings(0, 0, !isHidden);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'ButtonState', args => {
            try {
                let index = convertButtonIndex(args.buttonId);
                let isActive = eval(args.active);
                $gameSystem.pSetMobileControlsSettings(index, 1, !isActive);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'ButtonVisible', args => {
            try {
                let index = convertButtonIndex(args.buttonId);
                let isHidden = eval(args.hidden);
                $gameSystem.pSetMobileControlsSettings(index, 0, !isHidden);
                PKD_MobileControls.refresh();
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'QuickQuestion', args => {
            try {
                QuickQuestion(args.questionText);
                SetQuickQButtons(args.buttonYes, args.buttonNo);
                SetQuickQBackground(args.background);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MobileControls", 'ButtonImage', args => {
            try {
                //TODO: ТУТ ОСТАНОВИЛСЯ
            } catch (e) {
                console.warn(e);
            }
        });

    };

    RegisterPluginCommandsMV_MC = () => {

        executeMCCommand = (index, cmd) => {

            switch (cmd) {
                case "hide":
                    $gameSystem.pSetMobileControlsSettings(index, 0, false);
                    break;
            
                case "show":
                    $gameSystem.pSetMobileControlsSettings(index, 0, true);
                    break;

                case "disable":
                    $gameSystem.pSetMobileControlsSettings(index, 1, false);
                    break;

                case "enable":
                    $gameSystem.pSetMobileControlsSettings(index, 1, true);
                    break;
            }
            PKD_MobileControls.refresh();

        };

        //@[ALIAS]
        var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            _Game_Interpreter_pluginCommand_3434.call(this, command, args);
            if (command === 'MC') {
                try {

                    switch (args[0]) {
                        case "Joystick":
                            let cmd = args[1];
                            executeMCCommand(0, cmd);
                            break;
                        case "Button":
                            let cmd2 = args[2];
                            let index = parseInt(args[1]);
                            executeMCCommand(index, cmd2);
                            break;

                        default:
                            break;
                    }

                } catch (e) {
                    console.warn(e);
                }
            }
        };

    };

    ExtendInputMV_MC = () => {

        let alias_input_clear = Input.clear;
        Input.clear = function() {
            alias_input_clear.call(this);
            this._virtualButton = null;
        };

        let alias_input_update = Input.update;
        Input.update = function() {
            alias_input_update.call(this);
            if (this._virtualButton) {
                this._latestButton = this._virtualButton;
                this._pressedTime = 0;
                this._virtualButton = null;
            }
        };

        Input.virtualClick = function(buttonName) {
            this._virtualButton = buttonName;
        };

    };

    ConfigurateClasses = () => {
        if(PKD_MobileControls.JOYSTICK.dashingOnEdge === true)
            Game_Player.prototype.updateDashing = Game_Player.prototype._updateDashingJoystick;
    };

})();

(function(){

    //?[NEW]
    //?[DYNAMIC]
    Game_Player.prototype._updateDashingJoystick = function () {
        if (this.isMoving()) {
                return;
            }
        if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
            this._dashing = Input.mJoyDash || this.isDashButtonPressed();
        } else {
            this._dashing = false;
        }
    };

})();

(function(){
    
    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_MobileControls.LoadPluginSettings();
        if(PKD_MobileControls.IS_ALT_JOY == true)
            PKD_MobileControls.MCHUI.init();
        _alias_DataManager_loadDatabase.call(this);
    };

})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
PKD_MobileControls.ActivateDiagonalEventStart = (function(){

    //@[ALIAS]
    var _alias_Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
    Game_Player.prototype.triggerTouchAction = function () {
        if(this._diagonalDir) {
            if(this.canStartLocalEvents()) {
                this.checkEventTriggerThere([0, 1, 2]);
                if($gameMap.isEventRunning()) {
                    this._diagonalDir = 0;
                    return true;
                }
            }
            return false;
        } else
            return _alias_Game_Player_triggerTouchAction.call(this);
    };

    //@[ALIAS]
    var _alias_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function (triggers) {
        if(this.canStartLocalEvents() && this._diagonalDir) {
            var horz = ((this._diagonalDir === 1 || this._diagonalDir === 7) ? 4 : 6);
            var vert = ((this._diagonalDir === 1 || this._diagonalDir === 3) ? 2 : 8);
            var x2 = $gameMap.roundXWithDirection(this.x, horz);
            var y2 = $gameMap.roundYWithDirection(this.y, vert);
            this.startMapEvent(x2, y2, triggers, true);
        } else
            return _alias_Game_Player_checkEventTriggerThere.call(this, triggers);
    };

});
// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

PKD_MobileControls.UseMenuButtons = function () {

    if (KDCore.isMZ()) return;

    TouchInput.isHovered = function () {
        return true;
    };

    //-----------------------------------------------------------------------------
    // Sprite_Clickable
    //
    // The sprite class with click handling functions.

    function Sprite_Clickable() {
        this.initialize(...arguments);
    }

    Sprite_Clickable.prototype = Object.create(Sprite.prototype);
    Sprite_Clickable.prototype.constructor = Sprite_Clickable;

    Sprite_Clickable.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
        this._pressed = false;
        this._hovered = false;
    };

    Sprite_Clickable.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.processTouch();
    };

    Sprite_Clickable.prototype.processTouch = function () {
        if (this.isClickEnabled()) {
            if (this.isBeingTouched()) {
                if (!this._hovered && TouchInput.isHovered()) {
                    this._hovered = true;
                    this.onMouseEnter();
                }
                if (TouchInput.isTriggered()) {
                    this._pressed = true;
                    this.onPress();
                }
            } else {
                if (this._hovered) {
                    this.onMouseExit();
                }
                this._pressed = false;
                this._hovered = false;
            }
            if (this._pressed && TouchInput.isReleased()) {
                this._pressed = false;
                this.onClick();
            }
        } else {
            this._pressed = false;
            this._hovered = false;
        }
    };

    Sprite_Clickable.prototype.isPressed = function () {
        return this._pressed;
    };

    Sprite_Clickable.prototype.isClickEnabled = function () {
        return this.worldVisible;
    };

    Sprite_Clickable.prototype.isBeingTouched = function () {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        return this.hitTest(localPos.x, localPos.y);
    };

    Sprite_Clickable.prototype.hitTest = function (x, y) {
        const rect = new Rectangle(
            -this.anchor.x * this.width,
            -this.anchor.y * this.height,
            this.width,
            this.height
        );
        return rect.contains(x, y);
    };

    Sprite_Clickable.prototype.onMouseEnter = function () {
        //
    };

    Sprite_Clickable.prototype.onMouseExit = function () {
        //
    };

    Sprite_Clickable.prototype.onPress = function () {
        //
    };

    Sprite_Clickable.prototype.onClick = function () {
        //
    };

    //-----------------------------------------------------------------------------
    // Sprite_ButtonMZ
    //
    // The sprite for displaying a button.

    function Sprite_ButtonMZ() {
        this.initialize(...arguments);
    }

    window.Sprite_ButtonMZ = Sprite_ButtonMZ;

    Sprite_ButtonMZ.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_ButtonMZ.prototype.constructor = Sprite_ButtonMZ;

    Sprite_ButtonMZ.prototype.initialize = function (buttonType) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._buttonType = buttonType;
        this._clickHandler = null;
        this._coldFrame = null;
        this._hotFrame = null;
        this.setupFrames();
    };

    Sprite_ButtonMZ.prototype.setupFrames = function () {
        const data = this.buttonData();
        const x = data.x * this.blockWidth();
        const width = data.w * this.blockWidth();
        const height = this.blockHeight();
        this.loadButtonImage();
        this.setColdFrame(x, 0, width, height);
        this.setHotFrame(x, height, width, height);
        this.updateFrame();
        this.updateOpacity();
    };

    Sprite_ButtonMZ.prototype.blockWidth = function () {
        return 48;
    };

    Sprite_ButtonMZ.prototype.blockHeight = function () {
        return 48;
    };

    Sprite_ButtonMZ.prototype.loadButtonImage = function () {
        this.bitmap = ImageManager.loadSystem("ButtonSetForMV");
    };

    Sprite_ButtonMZ.prototype.buttonData = function () {
        const buttonTable = {
            cancel: {
                x: 0,
                w: 2
            },
            pageup: {
                x: 2,
                w: 1
            },
            pagedown: {
                x: 3,
                w: 1
            },
            down: {
                x: 4,
                w: 1
            },
            up: {
                x: 5,
                w: 1
            },
            down2: {
                x: 6,
                w: 1
            },
            up2: {
                x: 7,
                w: 1
            },
            ok: {
                x: 8,
                w: 2
            },
            menu: {
                x: 10,
                w: 1
            }
        };
        return buttonTable[this._buttonType];
    };

    Sprite_ButtonMZ.prototype.update = function () {
        Sprite_Clickable.prototype.update.call(this);
        this.checkBitmap();
        this.updateFrame();
        this.updateOpacity();
        this.processTouch();
    };

    Sprite_ButtonMZ.prototype.checkBitmap = function () {
        if (this.bitmap.isReady() && this.bitmap.width < this.blockWidth() * 11) {
            // Probably MV image is used
            throw new Error("ButtonSet image is too small");
        }
    };

    Sprite_ButtonMZ.prototype.updateFrame = function () {
        const frame = this.isPressed() ? this._hotFrame : this._coldFrame;
        if (frame) {
            this.setFrame(frame.x, frame.y, frame.width, frame.height);
        }
    };

    Sprite_ButtonMZ.prototype.updateOpacity = function () {
        this.opacity = this._pressed ? 255 : 192;
    };

    Sprite_ButtonMZ.prototype.setColdFrame = function (x, y, width, height) {
        this._coldFrame = new Rectangle(x, y, width, height);
    };

    Sprite_ButtonMZ.prototype.setHotFrame = function (x, y, width, height) {
        this._hotFrame = new Rectangle(x, y, width, height);
    };

    Sprite_ButtonMZ.prototype.setClickHandler = function (method) {
        this._clickHandler = method;
    };

    Sprite_ButtonMZ.prototype.onClick = function () {
        if (this._clickHandler) {
            this._clickHandler();
        } else {
            Input.virtualClick(this._buttonType);
        }
    };

    // Generated by CoffeeScript 2.5.1
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_MenuBase.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    (function () {
        var ALIAS__create, _;
        //@[DEFINES]
        _ = Scene_MenuBase.prototype;
        //@[ALIAS]
        ALIAS__create = _.create;
        _.create = function () {
            ALIAS__create.call(this);
            return this._createButtons();
        };
        _._createButtons = function () {
            this._cancelButton = new Sprite_ButtonMZ("cancel");
            this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
            this._cancelButton.y = 2;
            return this.addWindow(this._cancelButton);
        };
    })();

    (function () { // ■ END Scene_MenuBase.coffee
        //---------------------------------------------------------------------------

        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Scene_map.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var ALIAS__createDisplayObjects, ALIAS__initialize, ALIAS__isMapTouchOk, ALIAS__terminate, ALIAS__update, _;
        //@[DEFINES]
        _ = Scene_Map.prototype;
        //@[ALIAS]
        ALIAS__initialize = _.initialize;
        _.initialize = function () {
            ALIAS__initialize.call(this);
            return this._menuEnabled = false;
        };
        //@[ALIAS]
        ALIAS__createDisplayObjects = _.createDisplayObjects;
        _.createDisplayObjects = function () {
            ALIAS__createDisplayObjects.call(this);
            return this._createButtons();
        };
        _._createButtons = function () {
            this._menuButton = new Sprite_ButtonMZ("menu");
            this._menuButton.x = Graphics.boxWidth - this._menuButton.width - 4;
            this._menuButton.y = 2;
            this._menuButton.visible = false;
            return this.addWindow(this._menuButton);
        };
        _.updateMenuButton = function () {
            var menuEnabled;
            if (this._menuButton == null) {
                return;
            }
            menuEnabled = this.isMenuEnabled();
            if (menuEnabled === this._menuEnabled) {
                return this._menuButton.visible = this._menuEnabled;
            } else {
                return this._menuEnabled = menuEnabled;
            }
        };
        _.hideMenuButton = function () {
            var ref;
            if ((ref = this._menuButton) != null) {
                ref.visible = false;
            }
            return this._menuEnabled = false;
        };
        _.isAnyButtonPressed = function () {
            var ref;
            return (ref = this._menuButton) != null ? ref.isPressed() : void 0;
        };
        //@[ALIAS]
        ALIAS__terminate = _.terminate;
        _.terminate = function () {
            if (!SceneManager.isNextScene(Scene_Battle)) {
                this.hideMenuButton();
            }
            return ALIAS__terminate.call(this);
        };
        //@[ALIAS]
        ALIAS__update = _.update;
        _.update = function () {
            this._menuButton.update();
            this.updateMenuButton();
            return ALIAS__update.call(this);
        };
        //@[ALIAS]
        ALIAS__isMapTouchOk = _.isMapTouchOk;
        _.isMapTouchOk = function () {
            if (this.isAnyButtonPressed()) {
                return false;
            }
            return ALIAS__isMapTouchOk.call(this);
        };
    })();

    (function () { // ■ END Scene_map.coffee
        //---------------------------------------------------------------------------

        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Scene_Battle.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var ALIAS__createDisplayObjects, ALIAS__updateVisibility, _;
        //@[DEFINES]
        _ = Scene_Battle.prototype;
        //@[ALIAS]
        ALIAS__createDisplayObjects = _.createDisplayObjects;
        _.createDisplayObjects = function () {
            ALIAS__createDisplayObjects.call(this);
            return this._createButtons();
        };
        _._createButtons = function () {
            this._cancelButton = new Sprite_ButtonMZ("cancel");
            this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
            this._cancelButton.y = 2;
            return this.addWindow(this._cancelButton);
        };
        _.updateCancelButton = function () {
            if (this._cancelButton == null) {
                return;
            }
            return this._cancelButton.visible = this.isAnyInputWindowActive() && !this._partyCommandWindow.active;
        };
        //@[ALIAS]
        ALIAS__updateVisibility = _.update;
        _.update = function () {
            ALIAS__updateVisibility.call(this);
            return this.updateCancelButton();
        };
    })();

    // ■ END Scene_Battle.coffee
    //---------------------------------------------------------------------------

};

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Graphics.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___updateCanvas, _;
  //@[DEFINES]
  _ = Graphics;
  //@[ALIAS]
  ALIAS___updateCanvas = _._updateCanvas;
  _._updateCanvas = function() {
    var e;
    ALIAS___updateCanvas.call(this);
    try {
      if (MCAltJoy.IsActiveInGame()) {
        return PKD_MobileControls.MCHUI.updateCanvasHtmlElements();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Graphics.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  // * Сделать следующий выбор - QQ
  window.QuickQuestion = function(text) {
    var e;
    try {
      SetQuickQ(text); // can be NULL (default)
      // * Reset defaults
      SetQuickQButtons(null, null);
      SetQuickQBackground(null);
      $gameTemp._mcRequestQQWindowForChoice = true;
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  // * Для проверки условия нажатия кнопки
  window.IsMCButtonIsPressed = function(index) {
    if ($gameTemp._mcPressedButtonIndex === index) {
      return true;
    } else {
      return false;
    }
  };
  // * Для кастомного текста окна вопроса
  window.SetQuickQ = function(text) {
    return $gameSystem._mcQuickQuestionText = text;
  };
  // * Для кастомных изображений кнопок
  window.SetQuickQButtons = function(yesButtonName, noButtonName) {
    if (!String.any(yesButtonName)) {
      yesButtonName = "mcButtonOK";
    }
    if (!String.any(noButtonName)) {
      noButtonName = "mcButtonCancel";
    }
    // * Через команду плагина мы задаём файл (т.е. с _00)
    if (yesButtonName.contains("_00")) {
      yesButtonName = yesButtonName.replace("_00", "");
    }
    if (noButtonName.contains("_00")) {
      noButtonName = noButtonName.replace("_00", "");
    }
    $gameSystem._mcQQButtons = [yesButtonName, noButtonName];
  };
  // * Для кастомного фона окна
  window.SetQuickQBackground = function(name) {
    $gameSystem._mcQuickQuestionBackImg = name;
  };
  PKD_MobileControls.IsInputInJoystick = function() {
    if (MCAltJoy.IsActiveInGame()) {
      return MCAltJoy.IsPressed();
    } else {
      return (typeof $gameTemp !== "undefined" && $gameTemp !== null) && ($gameTemp._pkdJoyStick != null) && $gameTemp._pkdJoyStick.isPressed();
    }
  };
  PKD_MobileControls.refresh = function() {
    return PKD_MobileControls.mcUI.refreshUserSettings();
  };
  PKD_MobileControls.openQuickMenu = function() {
    SceneManager.push(Scene_MC_QuickMenu);
  };
  PKD_MobileControls.simulateAction = function() {
    Input.virtualClick('ok');
  };
  PKD_MobileControls.simulateCancel = function() {
    Input.virtualClick('escape');
  };
  PKD_MobileControls.simulateJump = function() {
    var d, jx, jy;
    if (!$gamePlayer.canMove()) {
      return;
    }
    jx = 0;
    jy = 0;
    d = $gamePlayer.direction();
    switch (d) {
      case 2:
        jx = 0;
        jy = 1;
        break;
      case 4:
        jx = -1;
        jy = 0;
        break;
      case 6:
        jx = 1;
        jy = 0;
        break;
      case 8:
        jx = 0;
        jy = -1;
    }
    $gamePlayer.jump(jx, jy);
  };
  PKD_MobileControls.simulateIndex = function(index) {
    //"SIMULATE".p(index)
    $gameTemp._mcPressedButtonIndex = index;
    if ($gameTemp._mcPressedOutThread != null) {
      clearTimeout($gameTemp._mcPressedOutThread);
    }
    $gameTemp._mcPressedOutThread = setTimeout((function() {
      $gameTemp._mcPressedButtonIndex = null;
      //"RESET".p()
      return $gameTemp._mcPressedOutThread = null;
    }), 100);
  };
})();


// Generated by CoffeeScript 2.6.1
window.MCAltJoy = {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ MCAltJoy.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _, threshold;
  //https://github.com/bobboteck/JoyStick/tree/master
  threshold = 0.6;
  //@[DEFINES]
  _ = window.MCAltJoy;
  _.Show = function() {
    var e;
    try {
      if (!$gameSystem.pIsAltJoystickHiddenBySettings()) {
        return PKD_MobileControls.MCHUI.ShowJoyStick();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Hide = function() {
    return PKD_MobileControls.MCHUI.HideJoyStick();
  };
  _.JoyStick = function() {
    return PKD_MobileControls.MCHUI.joyStickObj;
  };
  _.IsPressed = function() {
    var ref;
    return (ref = this.JoyStick()) != null ? ref.IsPressed() : void 0;
  };
  _.IsActiveInGame = function() {
    return PKD_MobileControls.IS_ALT_JOY === true;
  };
  _.IsHideWithMessage = function() {
    return PKD_MobileControls.ALT_JOY_CONFIG.isHideWithMessages === true;
  };
  _.GetDir = function() {
    var ref;
    return ((ref = this.JoyStick()) != null ? ref.GetRPGMakerDir() : void 0) || 0;
  };
  _.GetSignX = function() {
    var dx;
    if (this.JoyStick() != null) {
      dx = this.JoyStick().GetX() / 100;
      if (dx > threshold) {
        return 1;
      } else if (dx < -threshold) {
        return -1;
      }
    }
    return 0;
  };
  _.GetSignY = function() {
    var dx;
    if (this.JoyStick() != null) {
      dx = this.JoyStick().GetY() / -100;
      if (dx > threshold) {
        return 1;
      } else if (dx < -threshold) {
        return -1;
      }
    }
    return 0;
  };
})();

// ■ END MCAltJoy.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_MobileControls.MCHUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MobileControls.MCHUI;
  _.init = function() {
    var e;
    try {
      this._createRelativeParent();
      return Graphics._disableContextMenu();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createRelativeParent = function() {
    var e;
    try {
      this._canvasRelativeElements = document.createElement("div");
      this._canvasRelativeElements.id = "mobileControlsCanvasElements";
      this.updateCanvasHtmlElements();
      document.body.appendChild(this._canvasRelativeElements);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._canvasRelativeElements = null;
    }
  };
  _.updateCanvasHtmlElements = function() {
    var e;
    if (this._canvasRelativeElements == null) {
      return;
    }
    try {
      Graphics._centerElement(this._canvasRelativeElements);
      this._canvasRelativeElements.style.zIndex = 15;
      this._canvasRelativeElements.style.width = Graphics._canvas.style.width;
      this._canvasRelativeElements.style.height = Graphics._canvas.style.height;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.ShowJoyStick = function() {
    var config, e;
    try {
      if (this._joyStickDiv != null) {
        this._joyStickDiv.style.visibility = "visible";
        return;
      }
      config = PKD_MobileControls.ALT_JOY_CONFIG;
      this._joyStickDiv = document.createElement("div");
      this._joyStickDiv.id = "joyDiv";
      this._joyStickDiv.style.cssText = config.cssText;
      this._canvasRelativeElements.appendChild(this._joyStickDiv);
      this.joyStickObj = new JoyStick('joyDiv', config);
      return this._joyStickDiv;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.HideJoyStick = function() {
    var e;
    try {
      if (this._joyStickDiv == null) {
        return;
      }
      this._joyStickDiv.style.visibility = "hidden";
      return this._joyStickDiv;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_MobileControls.MCHUI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Общий класс для всех UI элементов
//?rev 13.10.20
(function() {
  var Sprite_UIElement;
  Sprite_UIElement = (function() {
    // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
    //@[ABSTRACT]
    class Sprite_UIElement extends KDCore.Sprite {
      constructor(params) {
        super();
        this.params = params;
        this._init();
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true
        };
      }

      // * Общий метод (есть у всех элементов)
      // * По умолчанию вызывает drawText, но потомки могут переопределить
      draw() {
        return this.drawText(...arguments);
      }

      // * Общий метод
      drawText() {} // * EMPTY

      
        // * Если изначально невидимый (из параметров), то не активный вообще
      isActive() {
        return this.params.visible === true;
      }

      rootImageFolder() {
        return Sprite_UIElement.RootImageFolder;
      }

      // * Сделать чёрно белым
      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      // * Общий метод (можно ли редактировать визуально)
      isCanBeEdited() {
        return false;
      }

      // * Общий метод (надо ли скрывать при игровом сообщнии)
      isHaveHideWithMessageFlag() {
        return false;
      }

      // * Общий метод (находится ли объект под мышкой)
      isUnderMouse() {
        var ref;
        return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
      }

      // * Параметры первого элемента (если он есть)
      realWidth() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof AA.Sprite_UIElement) {
            return child.realWidth();
          } else {
            return child.width;
          }
        }
        return 0;
      }

      realHeight() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof AA.Sprite_UIElement) {
            return child.realHeight();
          } else {
            return child.height;
          }
        }
        return 0;
      }

      // * Первый "физический" элемент (спрайт)
      zeroChild() {
        return this.children[0];
      }

      // * Метод восстановления значения на стандартные настройки
      reset(property) {
        var e;
        try {
          switch (property) {
            case "position":
              this._resetPosition();
              break;
            default:
              this[property] = this.params[property];
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

    };

    // * Корневая директория для изображений
    Sprite_UIElement.RootImageFolder = "pictures";

    return Sprite_UIElement;

  }).call(this);
  PKD_MobileControls.link(Sprite_UIElement);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_MobileControls.Sprite_UIElement.prototype;
  _._init = function() {
    var e;
    this._prepare();
    try {
      return this._createContent();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если при создании произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  
  // * Подготовка элемента (проверка параметров)
  _._prepare = function() {
    if (this.params == null) {
      this.params = this.defaultParams();
    }
    return this.visible = this.params.visible;
  };
  // * Наследники создают свои элементы в этом методе
  _._createContent = function() {}; // * EMPTY
  
  // * Сброс позиции
  _._resetPosition = function() {
    var x, y;
    ({x, y} = this.params.position);
    this.move(x, y);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Joystick.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Sprite_PKDJoystick;

Sprite_PKDJoystick = class Sprite_PKDJoystick extends PKD_MobileControls.Sprite_UIElement {
  // * TYPE = 0 - circle, 1 - arrows
  constructor() {
    super();
    this.moveOnPosition();
  }

  
    // * Стандартный набор настроек
  defaultParams() {
    return PKD_MobileControls.JOYSTICK;
  }

  enable() {
    return this._isDisabled = false;
  }

  disable() {
    return this._isDisabled = true;
  }

  show() {
    return this.visible = true;
  }

  hide() {
    this.visible = false;
    return this._resetMoving();
  }

  isPressed() {
    return this.visible === true && this.mainFore.visible === true;
  }

  moveOnPosition() {
    var pos;
    pos = KDCore.Utils.jsonPosXY(this.params.position);
    return this.move(pos);
  }

  isHaveHideWithMessageFlag() {
    return this.params.isHideWhenMessage === true;
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_PKDJoystick.prototype;
  _.update = function() {
    PKD_MobileControls.Sprite_UIElement.prototype.update.call(this);
    if (this._isDisabled === true) {
      return;
    }
    if (this.visible === false) {
      return;
    }
    if ($gameMessage.isBusy()) {
      return;
    }
    this._updateTouchInput();
    if (this.params.dashingOnEdge === true) {
      Input.mJoyDash = this._isRunning;
    } else {
      Input.mJoyDash = false;
    }
  };
  _._createContent = function() {
    this._initValues();
    return this._createParts();
  };
  _._initValues = function() {
    this.joyType = this.params.joyType;
    this._isBeenPressed = false;
    this._isRunning = false;
    this._isDisabled = false;
    this.precission = 10;
    this.pressDelay = PKD_MobileControls.PRESS_DELAY || 0;
  };
  _._createParts = function() {
    if (this.joyType === 0) {
      return this._createPartsBase();
    } else {
      return this._createPartsArrows();
    }
  };
  _._createPartsBase = function() {
    this.base = new Sprite(ImageManager.loadPicture('JoystickBase_00'));
    this.baseFore = new Sprite(ImageManager.loadPicture('JoystickBase'));
    this.base.addChild(this.baseFore);
    this.baseFore.visible = false;
    this.addChild(this.base);
    this.main = new Sprite(ImageManager.loadPicture('JoystickMain_00'));
    this.main.anchor.x = 0.5;
    this.main.anchor.y = 0.5;
    this.mainFore = new Sprite(ImageManager.loadPicture('JoystickMain'));
    this.main.addChild(this.mainFore);
    this.mainFore.anchor.x = 0.5;
    this.mainFore.anchor.y = 0.5;
    this.mainFore.visible = false;
    this.addChild(this.main);
    this.base.bitmap.addLoadListener(this._afterCreateParts.bind(this));
    return this._afterCreateParts();
  };
  _._createPartsArrows = function() {
    this.base = new Sprite(ImageManager.loadPicture('JoystickBase_Arrows_00'));
    this.baseFore = new Sprite(ImageManager.loadPicture('JoystickBase_Arrows'));
    this.base.addChild(this.baseFore);
    this.baseFore.visible = false;
    this.addChild(this.base);
    this.main = new Sprite();
    this.main.anchor.x = 0.5;
    this.main.anchor.y = 0.5;
    this.mainFore = new Sprite();
    this.main.addChild(this.mainFore);
    this.mainFore.anchor.x = 0.5;
    this.mainFore.anchor.y = 0.5;
    this.mainFore.visible = false;
    this.addChild(this.main);
    this.arrowHighlitghts = [
      null,
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_D'), // 2
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_L'), // 4
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_R'), // 6
      null,
      ImageManager.loadPicture('JoystickBase_Arrows_U') // 8
    ];
    this.base.bitmap.addLoadListener(this._afterCreateParts.bind(this));
    return this._afterCreateParts();
  };
  _._afterCreateParts = function() {
    if (this.base.bitmap.width === 0) {
      return;
    }
    this._resetMainPosition();
    return this.half = this.base.bitmap.width / 2;
  };
  _._resetMainPosition = function() {
    this.main.x = this.base.bitmap.width / 2;
    return this.main.y = this.base.bitmap.height / 2;
  };
  _._resetMoving = function() {
    this.pressDelay = PKD_MobileControls.PRESS_DELAY || 0;
    $gameTemp.clearDestination();
    Input.mJoyX = 0;
    Input.mJoyY = 0;
    return this._isRunning = false;
  };
  _.inPosition = function(point, extraSize) {
    var inRect, rx, ry;
    rx = KDCore.SDK.canvasToLocalX(this, point.x);
    ry = KDCore.SDK.canvasToLocalY(this, point.y);
    inRect = rx + extraSize >= 0 && ry + extraSize >= 0 && rx < this.baseFore.width + extraSize && ry < this.baseFore.height + extraSize;
    return inRect;
  };
  _._updateTouchInput = function() {
    if (TouchInput.isPressed()) {
      if (this._isBeenPressed === true) {
        if (!this.isTouchInProperZoneBigger()) {
          return;
        }
      } else {
        if (!this.isTouchInProperZone()) {
          return;
        }
      }
      this._isBeenPressed = true;
      this._moveMainToTouch();
    } else {
      if (this._isBeenPressed === true) {
        this._resetMoving();
        this._resetMainPosition();
        this._isBeenPressed = false;
      }
    }
    this.baseFore.visible = this._isBeenPressed;
    this.mainFore.visible = this._isBeenPressed;
  };
  _.isTouchInProperZone = function() {
    return this.inPosition(TouchInput, 0);
  };
  _.isTouchInProperZoneBigger = function() {
    return this.inPosition(TouchInput, this.params.extraMoveOutOfEdge);
  };
  _._moveMainToTouch = function() {
    var lx, ly;
    if (this.pressDelay > 0) {
      this.pressDelay--;
    }
    if (this.pressDelay > 0) {
      return;
    }
    lx = TouchInput.x;
    ly = TouchInput.y;
    lx -= this.x;
    ly -= this.y;
    this.main.move(lx, ly);
    if (this.params.is4WayDirection === true || this.joyType === 1) {
      this._onMoved4();
    } else {
      this._onMoved8();
    }
  };
  _._onMoved8 = function() {
    this._isRunning = false;
    Input.mJoyX = this.getMovingXValue();
    Input.mJoyY = this.getMovingYValue();
  };
  _._onMoved4 = function() {
    var section;
    this._isRunning = false;
    // * FOR DASHING
    if (this.params.dashingOnEdge === true) {
      this.getMovingXValue();
      this.getMovingYValue();
    }
    section = this.getSection();
    this.highlightArrowSectionFor4(section);
    switch (section) {
      case 2: // * DOWN
        Input.mJoyX = 0;
        Input.mJoyY = 1;
        break;
      case 4: // * LEFT
        Input.mJoyX = -1;
        Input.mJoyY = 0;
        break;
      case 6: // * RIGHT
        Input.mJoyX = 1;
        Input.mJoyY = 0;
        break;
      case 8: // * UP
        Input.mJoyX = 0;
        Input.mJoyY = -1;
        break;
      default:
        this.highlightArrowSectionFor4(-1);
        Input.mJoyX = 0;
        Input.mJoyY = 0;
        break;
    }
  };
  _.highlightArrowSectionFor4 = function(sectionNumber) {
    if (this.joyType !== 1) {
      return;
    }
    if (sectionNumber < 0) {
      this.baseFore.bitmap = ImageManager.loadPicture('JoystickBase_Arrows');
    } else {
      if (this.arrowHighlitghts[sectionNumber] != null) {
        this.baseFore.bitmap = this.arrowHighlitghts[sectionNumber];
      }
    }
  };
  _.getMovingXValue = function() {
    var deltaX, x;
    deltaX = this.main.x - this.half;
    x = 0;
    if (deltaX < -this.precission) {
      x--;
      if (this.main.x <= this.base.x) {
        this._isRunning = true;
      }
    } else if (deltaX > this.precission) {
      x++;
      if (this.main.x >= (this.base.x + this.base.width - this.precission * 2)) {
        this._isRunning = true;
      }
    }
    return x;
  };
  _.getMovingYValue = function() {
    var deltaY, y;
    deltaY = this.main.y - this.half;
    y = 0;
    if (deltaY < -this.precission) {
      y--;
      if (this.main.y <= this.base.y) {
        this._isRunning = true;
      }
    } else if (deltaY > this.precission) {
      y++;
      if (this.main.y >= (this.base.y + this.base.height - this.precission * 2)) {
        this._isRunning = true;
      }
    }
    return y;
  };
  _.getSection = function() {
    var deltaX, deltaY, half, maxIndex;
    half = this.base.bitmap.width / 2;
    deltaX = this.main.x - half;
    deltaY = this.main.y - half;
    maxIndex = 0;
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      maxIndex = 1;
    }
    if (maxIndex === 0) {
      // * LEFT OR RIGHT
      if (deltaX < 0) {
        return 4;
      } else {
        return 6;
      }
    } else {
      if (deltaY < 0) {
        return 8;
      } else {
        return 2;
      }
    }
    return 0;
  };
})();

// ■ END Sprite_Joystick.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//rev 30.12.21
(function() {
  var Sprite_UIText;
  Sprite_UIText = class Sprite_UIText extends PKD_MobileControls.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        visible: true,
        size: {
          w: 60,
          h: 20
        },
        alignment: "center",
        font: {
          face: null,
          size: 18,
          italic: false
        },
        margins: {
          x: 0,
          y: 0
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#FFFFFF".toCss()
      };
    }

    //?DYNAMIC
    // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
    drawText(text) {
      return this._drawTextWhenReady(text);
    }

    // * Сборка текста с учётом формата
    drawTextWithFormat(/*format string, arguments parameters... */) {
      var text;
      text = this._convertFormatedString(...arguments);
      this.drawText(text);
    }

    // * Пишет текст с определённым цветом (один раз)
    drawTextColor(text, colorCss) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.b().textColor = colorCss;
      this.drawText(text);
      this._textSpr.b().textColor = this.params.textColor;
    }

  };
  PKD_MobileControls.link(Sprite_UIText);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_MobileControls.Sprite_UIText.prototype;
  //$[OVER]
  _._createContent = function() {
    return this._createTextSprite();
  };
  _._createTextSprite = function() {
    this._textSpr = KDCore.Sprite.FromParams(this.params);
    this._textSpr.onReady(this._onReady.bind(this));
    return this.add(this._textSpr);
  };
  // * Выполнить по готовности
  _._onReady = function() {
    // * Переключить метод, так как уже готов
    this.drawText = this._drawText;
    // * Написать то что нужно было до готовности (если есть)
    if (this._drawOnReady == null) {
      return;
    }
    this.drawText(this._drawOnReady);
    this._drawOnReady = null;
  };
  _._drawText = function(text) {
    if (this._textSpr == null) {
      return;
    }
    this._textSpr.clear();
    if (text != null) {
      this._textSpr.drawTextFull(text);
    }
  };
  // * Написать текст когда будет готов
  _._drawTextWhenReady = function(text) {
    this._drawOnReady = text;
    return this._drawText(text);
  };
  
  // * Заменить вхождения %1, %2 на значения параметров
  _._convertFormatedString = function(/*text, args...*/) {
    var e, i, j, ref, text;
    try {
      text = arguments[0];
      for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
        try {
          if (arguments[i] == null) {
            continue;
          }
          text = text.replace("%" + i, arguments[i]);
        } catch (error) {
          e = error;
          //AA.warning e
          text = "[wrong format text input]";
        }
      }
      return text;
    } catch (error) {
      e = error;
      //AA.warning e
      return "[wrong format text input]";
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//rev 30.12.21
(function() {
  var Sprite_UITextExt;
  Sprite_UITextExt = class Sprite_UITextExt extends PKD_MobileControls.Sprite_UIText {
    constructor() {
      super(...arguments);
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        visible: true,
        size: {
          w: 200,
          h: 60
        },
        font: {
          face: null,
          size: 14,
          italic: false
        },
        margins: {
          x: 0,
          y: 0
        },
        // * новые параметры (KDCore 2.7)
        //?null могут быть
        singleLine: false,
        forceCentered: false
      };
    }

    //$[OVER]
    // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
    drawTextColor() {
      return this.drawText(...arguments);
    }

  };
  PKD_MobileControls.link(Sprite_UITextExt);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_MobileControls.Sprite_UITextExt.prototype;
  //$[OVER]
  _._createTextSprite = function() {
    var rect;
    rect = new PIXI.Rectangle(0, 0, this.params.size.w, this.params.size.h);
    this._textSpr = new PKD_MobileControls.Window_ExtTextLineBase(rect, this.params.font);
    this._textSpr.x = this.params.margins.x || 0;
    this._textSpr.y = this.params.margins.y || 0;
    this.add(this._textSpr);
    // * На следующий кадр, чтобы не было потери текста (опасно)
    //setTimeout (=> @_onReady() ), 10
    this._onReady(); // * Сразу
  };
  
  //$[OVER]
  _._drawText = function(text) {
    if (this._textSpr == null) {
      return;
    }
    this._textSpr.contents.clear();
    if (this.params.forceCentered === true) {
      this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
    } else {
      if (this.params.singleLine === true) {
        this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
      } else {
        // * По умолчанию
        this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
      }
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Пользовательская кнопка на экране
(function() {
  var Sprite_UIUButton;
  // * Кнопка на экране, можно нажимать
  Sprite_UIUButton = class Sprite_UIUButton extends KDCore.UI.Sprite_UIElement {
    constructor() {
      super(...arguments);
      this._resetPosition();
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        name: "",
        visible: true,
        states: {
          main: "",
          hover: "",
          disabled: ""
        },
        isHideWhenMessage: true,
        click: 0,
        position: {
          x: "0",
          y: "0"
        }
      };
    }

    rootImageFolder() {
      return "pictures";
    }

    isHaveHideWithMessageFlag() {
      return this.params.isHideWhenMessage === true;
    }

    // * Кнопка не поддерживает перерисовку
    draw() {} // * EMPTY

    disable() {
      var ref;
      return (ref = this.button) != null ? ref.disable() : void 0;
    }

    enable() {
      var ref;
      return (ref = this.button) != null ? ref.enable() : void 0;
    }

    show() {
      var ref;
      this.visible = true;
      return (ref = this.button) != null ? ref.visible = true : void 0;
    }

    hide() {
      var ref;
      this.visible = false;
      return (ref = this.button) != null ? ref.visible = false : void 0;
    }

    setState(isEnabled) {
      if (isEnabled) {
        return this.enable();
      } else {
        return this.disable();
      }
    }

    
      // * Просто вызов метода
    call() {
      var ref;
      return (ref = this.button) != null ? ref.click() : void 0;
    }

    // * Вызов метода с симуляцией нажатия
    click() {
      var ref, ref1;
      if ((ref = this.button) != null) {
        ref.click();
      }
      return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
    }

    registerInputIndex(index) {
      return this._registerClickMethodI(index); // * Index
    }

    
      // * Данный метод вызывается когда нужно пересоздать кнопку
    // * (при смене изображений кнопки)
    reCreate() {
      this.removeChild(this.button);
      this.button = null;
      this._createContent();
    }

  };
  PKD_MobileControls.link(Sprite_UIUButton);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_MobileControls.Sprite_UIUButton.prototype;
  //$[OVER]
  _._createContent = function() {
    var images;
    images = this._getButtonImages();
    if (images.main.isEmpty()) {
      KDCore.warning('You try create Button without Main Image');
      return;
    }
    this.button = new KDCore.ButtonMU(images, true, this.rootImageFolder());
    // * Чтобы нельзя было нажать
    this.button.visible = this.params.visible;
    this.add(this.button);
    this._registerClickMethod(); // * Common Event
    this._registerClickMethodE(); // * Script Call
  };
  _._getButtonImages = function() {
    var e, extraImages, images;
    images = this.params.states;
    try {
      extraImages = $gameSystem.pGetMobileControlsButtonsSettings()[this.params.name];
      if (extraImages != null) {
        images = extraImages;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      images = this.params.states;
    }
    return images;
  };
  _._registerClickMethod = function() {
    var commonEventId, e, method, ref;
    if (this.params.click == null) {
      return;
    }
    if (this.params.click === 0) {
      return;
    }
    method = null;
    try {
      // * Если число, то значит общее событие
      if (isFinite(this.params.click)) {
        commonEventId = this.params.click;
        if (commonEventId > 0 && ($dataCommonEvents[commonEventId] != null)) {
          method = function() {
            return $gameTemp.reserveCommonEvent(commonEventId);
          };
          return this.button.addClickHandler(method);
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
    }
  };
  _._registerClickMethodE = function() {
    var codeLine, e, method, ref;
    if (!String.any(this.params.clickE)) {
      return;
    }
    try {
      codeLine = this.params.clickE;
      method = function() {
        return eval(codeLine);
      };
      this.button.addClickHandler(method);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      if ((ref = this.button) != null) {
        ref.clearClickHandler();
      }
    }
  };
  _._registerClickMethodI = function(index) {
    var currentMethod, method;
    currentMethod = this.button._handler;
    method = function() {
      PKD_MobileControls.simulateIndex(index);
      return currentMethod();
    };
    this.button.addClickHandler(method);
  };
  //$[OVER]
  _._resetPosition = function() {
    var pos;
    pos = KDCore.Utils.jsonPosXY(this.params.position);
    this.move(pos);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DiagonalMovement
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
PKD_MobileControls.ActivateDiagonalMovement = function() {
  var get4Dir, get8Dir;
  get8Dir = function(d) {
    switch (d) {
      case 1:
        return [4, 2];
      case 3:
        return [6, 2];
      case 7:
        return [4, 8];
      case 9:
        return [6, 8];
      default:
        return [0, 0];
    }
  };
  get4Dir = function(horz, vert) {
    if (horz === 4 && vert === 2) {
      return 1;
    }
    if (horz === 6 && vert === 2) {
      return 3;
    }
    if (horz === 4 && vert === 8) {
      return 7;
    }
    if (horz === 6 && vert === 8) {
      return 9;
    }
    return 0;
  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_CharacterBase.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__moveStraight, ALIAS__realMoveSpeed, ALIAS__setDirection, _;
    
    //@[DEFINES]
    _ = Game_CharacterBase.prototype;
    
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      this._diagonalDir = false;
      return ALIAS__moveStraight.call(this, d);
    };
    
    //@[ALIAS]
    ALIAS__setDirection = _.setDirection;
    _.setDirection = function(d) {
      if (this._diagStraigten === true) {
        this._diagonalDir = false;
      }
      return ALIAS__setDirection.call(this, d);
    };
    
    //@[ALIAS]
    ALIAS__realMoveSpeed = _.realMoveSpeed;
    _.realMoveSpeed = function() {
      var speed;
      speed = ALIAS__realMoveSpeed.call(this);
      if (this._diagonalDir) {
        return speed * 0.8;
      } else {
        return speed;
      }
    };
    _.moveDiagonally = function(horz, vert) {
      var diag, norm;
      diag = this.canPassDiagonally(this._x, this._y, horz, vert);
      norm = this.canPass(this._x, this._y, horz) || this.canPass(this._x, this._y, vert);
      if (diag) {
        this._diagonalDir = get4Dir(horz, vert);
        this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
      } else if (norm) {
        this._diagonalDir = false;
        this.moveStraight(this.getOtherDirection(horz, vert));
      }
      this._diagStraigten = false;
      if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
      }
      if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
      }
      this._diagStraigten = true;
    };
    _.getOtherDirection = function(horz, vert) {
      if (this.canPass(this._x, this._y, horz)) {
        return horz;
      } else {
        return vert;
      }
    };
  })();
  (function() {    // ■ END Game_CharacterBase.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Player.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__executeMove, _;
    
    //@[DEFINES]
    _ = Game_Player.prototype;
    
    //$[OVER]
    _.canPassDiagonally = function(x, y, horz, vert) {
      var x2, y2;
      x2 = $gameMap.roundXWithDirection(x, horz);
      y2 = $gameMap.roundYWithDirection(y, vert);
      if (this.canPass(x, y, vert) && this.canPass(x, y2, horz) && this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
        return true;
      }
      return false;
    };
    
    //$[OVER]
    _.getInputDirection = function() {
      return Input.dir8;
    };
    
    //@[ALIAS]
    ALIAS__executeMove = _.executeMove;
    _.executeMove = function(direction) {
      var horz, vert;
      if (direction % 2 === 0) {
        return ALIAS__executeMove.call(this, direction);
      } else if (Math.abs(direction % 2) === 1) {
        [horz, vert] = get8Dir(direction);
        return this.moveDiagonally(horz, vert);
      }
    };
  })();
  (function() {    // ■ END Game_Player.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Player.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__findDirectionTo, _;
    
    //@[DEFINES]
    _ = Game_Player.prototype;
    ALIAS__findDirectionTo = _.findDirectionTo;
    _.findDirectionTo = function(goalX, goalY) {
      return this._findDirectionToDiagonal(goalX, goalY);
    };
    _._findDirectionToDiagonal = function(goalX, goalY) {
      var best, bestIndex, closedList, current, deltaX1, deltaX2, deltaY1, deltaY2, diag, direction, g1, g2, goaled, horz, i, index2, j, mapWidth, neighbor, node, nodeList, openList, pos1, pos2, searchLimit, start, vert, x1, x2, y1, y2;
      searchLimit = 16;
      mapWidth = $gameMap.width();
      nodeList = [];
      openList = [];
      closedList = [];
      start = {};
      best = start;
      if (this.x === goalX && this.y === goalY) {
        return 0;
      }
      start.parent = null;
      start.x = this.x;
      start.y = this.y;
      start.g = 0;
      start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
      nodeList.push(start);
      openList.push(start.y * mapWidth + start.x);
      while (nodeList.length > 0) {
        bestIndex = 0;
        i = 0;
        while (i < nodeList.length) {
          if (nodeList[i].f < nodeList[bestIndex].f) {
            bestIndex = i;
          }
          i++;
        }
        current = nodeList[bestIndex];
        x1 = current.x;
        y1 = current.y;
        pos1 = y1 * mapWidth + x1;
        g1 = current.g;
        nodeList.splice(bestIndex, 1);
        openList.splice(openList.indexOf(pos1), 1);
        closedList.push(pos1);
        if (current.x === goalX && current.y === goalY) {
          best = current;
          goaled = true;
          break;
        }
        if (g1 >= searchLimit) {
          continue;
        }
        j = 0;
        while (j < 9) {
          direction = 1 + j;
          if (direction === 5) {
            j++;
            continue;
          }
          diag = Math.abs(direction % 2) === 1;
          [horz, vert] = get8Dir(direction);
          if (diag && this.canPassDiagonally(x1, y1, horz, vert) && (this.canPass(x1, y1, horz) || this.canPass(x1, y1, vert))) {
            x2 = $gameMap.roundXWithDirection(x1, horz);
            y2 = $gameMap.roundYWithDirection(y1, vert);
          } else if (this.canPass(x1, y1, direction)) {
            x2 = $gameMap.roundXWithDirection(x1, direction);
            y2 = $gameMap.roundYWithDirection(y1, direction);
          } else {
            j++;
            continue;
          }
          pos2 = y2 * mapWidth + x2;
          if (closedList.contains(pos2)) {
            j++;
            continue;
          }
          g2 = g1 + 1;
          index2 = openList.indexOf(pos2);
          if (index2 < 0 || g2 < nodeList[index2].g) {
            if (index2 >= 0) {
              neighbor = nodeList[index2];
            } else {
              neighbor = {};
              nodeList.push(neighbor);
              openList.push(pos2);
            }
            neighbor.parent = current;
            neighbor.x = x2;
            neighbor.y = y2;
            neighbor.g = g2;
            neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
            if (!best || neighbor.f - neighbor.g < best.f - best.g) {
              best = neighbor;
            }
          }
          j++;
        }
      }
      node = best;
      while (node.parent && node.parent !== start) {
        node = node.parent;
      }
      deltaX1 = $gameMap.deltaX(node.x, start.x);
      deltaY1 = $gameMap.deltaY(node.y, start.y);
      if (deltaY1 > 0 && deltaX1 > 0) {
        return 3;
      } else if (deltaY1 > 0 && deltaX1 < 0) {
        return 1;
      } else if (deltaY1 < 0 && deltaX1 < 0) {
        return 7;
      } else if (deltaY1 < 0 && deltaX1 > 0) {
        return 9;
      }
      if (deltaY1 > 0) {
        return 2;
      } else if (deltaX1 < 0) {
        return 4;
      } else if (deltaX1 > 0) {
        return 6;
      } else if (deltaY1 < 0) {
        return 8;
      }
      deltaX2 = this.deltaXFrom(goalX);
      deltaY2 = this.deltaYFrom(goalY);
      if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
        if (deltaX2 > 0) {
          return 4;
        } else {
          return 6;
        }
      } else if (deltaY2 !== 0) {
        if (deltaY2 > 0) {
          return 8;
        } else {
          return 2;
        }
      }
      return 0;
    };
  })();
  (function() {    // ■ END Game_Player.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Follower.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Game_Follower.prototype;
    
    //$[OVER]
    _.realMoveSpeed = function() {
      return $gamePlayer.realMoveSpeed();
    };
  })();
};

// ■ END DiagonalMovement
//---------------------------------------------------------------------------
// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------
// * NOT USED
//@[ALIAS]
/*ALIAS__command108 = _.command108
_.command108 = (params) ->
    if KDCore.isMV()
        @mcCheckQQComment(this._params[0])
    else
        @mcCheckQQComment(params[0])
    return ALIAS__command108.call(@, params)

#quick:TEXT
_.mcCheckQQComment = (comment) ->
    try
        return unless comment.contains("quick")
        return unless @nextEventCode() == 102
        if comment.contains("quick:")
            text = comment.split(":")[1]
            SetQuickQ(text) if String.any(text)
        $gameTemp._mcRequestQQWindowForChoice = true
    catch e
        console.warn e */


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  _.pGetMobileControlsSettings = function() {
    if (this._pMCS == null) {
      this._pMCS = [];
    }
    return this._pMCS;
  };
  _.pSetMobileControlsSettings = function(index, settingIndex, value) {
    this.pGetMobileControlsSettings(); // * initialize
    if (this._pMCS[index] == null) {
      // * index - 0 - joystick, 1..X - buttons
      this._pMCS[index] = [];
    }
    // * settingIndex: 0 - visible, 1 - disable
    this._pMCS[index][settingIndex] = value;
  };
  _.pIsAltJoystickHiddenBySettings = function() {
    var e, s;
    try {
      s = this.pGetMobileControlsSettings();
      if ((s[0] != null) && (s[0][0] != null)) {
        return s[0][0] !== true;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  // * Для смены изображения кнопки
  _.pGetMobileControlsButtonsSettings = function() {
    if (this._pMCS2 == null) {
      this._pMCS2 = {};
    }
    return this._pMCS2;
  };
  // * Тут мы обращяемся по имени кнопки
  _.pSetExtraButtonImages = function(name, images) {
    if (images == null) {
      return;
    }
    if (!String.any(images.main)) {
      return;
    }
    this.pGetMobileControlsButtonsSettings();
    if (images != null) {
      this._pMCS2[name] = images;
    } else {
      this._pMCS2[name] = null;
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Input.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___signX, ALIAS___signY, _;
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS___signY = _._signY;
  _._signY = function() {
    if (PKD_MobileControls.IsInputInJoystick()) {
      if (MCAltJoy.IsActiveInGame()) {
        return MCAltJoy.GetSignY();
      } else {
        return Input.mJoyY;
      }
    } else {
      return ALIAS___signY.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS___signX = _._signX;
  _._signX = function() {
    if (PKD_MobileControls.IsInputInJoystick()) {
      if (MCAltJoy.IsActiveInGame()) {
        return MCAltJoy.GetSignX();
      } else {
        return Input.mJoyX;
      }
    } else {
      return ALIAS___signX.call(this, ...arguments);
    }
  };
})();

// ■ END Input.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__hideAllWindows, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  if (KDCore.isMZ()) {
    return;
  }
  // * Фикс вылета игры с плагином Olivia_VictorSequenceUI
  //@[ALIAS]
  ALIAS__hideAllWindows = _.hideAllWindows;
  _.hideAllWindows = function() {
    var e;
    try {
      return ALIAS__hideAllWindows.call(this);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__isMenuCalled, ALIAS__processMapTouch, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  // * Создаём интерфейс мобильного управления
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    this._mcUI = new Spriteset_MobileControls();
    this.addChild(this._mcUI);
    PKD_MobileControls.mcUI = this._mcUI;
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    var e, ref;
    ALIAS__stop.call(this);
    try {
      MCAltJoy.Hide();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    if ((ref = this._mcUI) != null) {
      ref.terminate();
    }
  };
  //@[ALIAS]
  ALIAS__processMapTouch = _.processMapTouch;
  _.processMapTouch = function() {
    if (PKD_MobileControls.IsInputInJoystick() || PKD_MobileControls.MAP_TOUCH === false) {

    } else {
      return ALIAS__processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isMenuCalled = _.isMenuCalled;
  _.isMenuCalled = function() {
    if (PKD_MobileControls.CALL_MENU === false) {
      return Input.isTriggered("menu");
    } else {
      return ALIAS__isMenuCalled.call(this);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  // * Показать окно вариантов выбора (всегда сверху получается)
  _.mcShowModalQQ = function() {
    var e, e2, h, p, w, x, y;
    try {
      if (this._qqWindow != null) {
        return;
      }
      p = PKD_MobileControls.Window_QQ;
      ({w, h} = p.windowSize);
      ({x, y} = p.windowPosition);
      try {
        x = eval(x);
        y = eval(y);
      } catch (error) {
        e2 = error;
        console.warn(e2);
        x = y = 0;
      }
      this._qqWindow = new Window_MC_QQ(new Rectangle(x, y, w, h));
      this.addChild(this._qqWindow);
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.mcCloseModalQQ = function() {
    var e;
    try {
      if (this._qqWindow == null) {
        return;
      }
      this._qqWindow.close();
      this.removeChild(this._qqWindow);
      this._qqWindow = null;
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MC_QuickMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Scene_MC_QuickMenu;

Scene_MC_QuickMenu = class Scene_MC_QuickMenu extends Scene_MenuBase {
  constructor() {
    super();
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Scene_MC_QuickMenu.prototype;
})();

// ■ END Scene_MC_QuickMenu.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Sprite_MCSwitchButton;

Sprite_MCSwitchButton = class Sprite_MCSwitchButton extends KDCore.Sprite {
  constructor(config) {
    super();
    this.config = config;
    this._create();
    this._updatePlacement();
    this._prepareData();
    return;
  }

  isHaveHideWithMessageFlag() {
    return this.config.isHideWhenMessage === true;
  }

  isActive() {
    return this.visible && this.opacity > 50;
  }

  getValue() {
    return $gameSwitches.value(this.config.switchId);
  }

  update() {
    super.update();
    this._updateEnabledState();
    return this._updateButtonControl();
  }

  _updateEnabledState() {
    var e;
    if (this._enSwitchId <= 0) {
      return;
    }
    try {
      this._enSwitchThread.update();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._enSwitchId = 0;
    }
  }

  _updateButtonControl() {
    if (!this.isActive()) {
      return;
    }
    if (Input.isTriggered(this._activationButton)) {
      this.switchValue();
    }
  }

  _checkButtonState() {
    if ($gameSwitches.value(this._enSwitchId) === true) {
      return this.visible = true;
    } else {
      return this.visible = false;
    }
  }

  switchValue() {
    var currentValue, newValue;
    if (!this.isActive()) {
      return;
    }
    KDCore.Utils.playSE(this.config.switchSE);
    currentValue = this.getValue();
    newValue = !currentValue;
    this.setValue(newValue);
    KDCore.Utils.startCE(this.config.commonEventOnSwitch);
  }

  setValue(value) {
    $gameSwitches.setValue(this.config.switchId, value);
    return this._refreshState();
  }

  _create() {
    this._createLabel();
    this._buttonSprOn = new KDCore.ButtonMU({
      main: this.config.onImage,
      hover: this.config.onImage
    }, false, 'pictures');
    this._buttonSprOn.addClickHandler(this.switchValue.bind(this));
    this._buttonSprOff = new KDCore.ButtonMU({
      main: this.config.offImage,
      hover: this.config.offImage
    }, false, 'pictures');
    this._buttonSprOff.addClickHandler(this.switchValue.bind(this));
    this.addChild(this._buttonSprOn);
    this.addChild(this._buttonSprOff);
    this._refreshState();
  }

  _createLabel() {
    var e, spr;
    try {
      if (this.config.labelImage == null) {
        return;
      }
      if (!String.any(this.config.labelImage.name)) {
        return;
      }
      spr = new Sprite(ImageManager.loadPicture(this.config.labelImage.name));
      this.addChild(spr);
      spr.x = this.config.labelImage.marginX;
      return spr.y = this.config.labelImage.marginY;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _refreshState() {
    var value;
    value = this.getValue();
    if (value === true) {
      this._buttonSprOn.visible = true;
    } else {
      this._buttonSprOn.visible = false;
    }
    this._buttonSprOff.visible = !this._buttonSprOn.visible;
  }

  _updatePlacement() {
    var e, x, y;
    if (this.config.position == null) {
      return;
    }
    if (this.config.position.x == null) {
      return;
    }
    try {
      x = eval(this.config.position.x);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      x = 0;
    }
    try {
      y = eval(this.config.position.y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      y = 0;
    }
    return this.move(x, y);
  }

  _prepareData() {
    var e;
    this._enSwitchId = this.config.enabledSwitchId;
    try {
      this._activationButton = this.config.keyboardKey.toLowerCase();
    } catch (error) {
      e = error;
      this._activationButton = null;
    }
    if (!String.any(this._activationButton)) {
      this._updateButtonControl = function() {}; // * EMPTY
    }
    if (this._enSwitchId > 0) {
      return this._enSwitchThread = new KDCore.TimedUpdate(5, this._checkButtonState.bind(this));
    } else {
      return this._updateEnabledState = function() {}; // * EMPTY
    }
  }

};


// Generated by CoffeeScript 2.6.1
var Spriteset_MobileControls;

Spriteset_MobileControls = class Spriteset_MobileControls extends Sprite {
  constructor() {
    super();
    this._init();
    this.refreshUserSettings();
  }

  onGameMessageStart() {
    var e;
    this.getElementsWithMessageFlag().forEach(function(e) {
      return e != null ? e.opacity = 50 : void 0;
    });
    try {
      if (MCAltJoy.IsHideWithMessage()) {
        return MCAltJoy.Hide();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  onGameMessageEnd() {
    var e;
    this.getElementsWithMessageFlag().forEach(function(e) {
      return e != null ? e.opacity = 255 : void 0;
    });
    try {
      if (MCAltJoy.IsActiveInGame()) {
        if (MCAltJoy.IsHideWithMessage()) {
          return MCAltJoy.Show();
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  terminate() {
    var e, i, len, ref, results;
    ref = this.elements;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e != null) {
        results.push(e.visible = false);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  // * Данный метод "собирает" один раз
  getElementsWithMessageFlag() {
    if (this._elementsWithMessageFlag == null) {
      this._collectElementsWithMessageFlag();
    }
    return this._elementsWithMessageFlag;
  }

  refreshUserSettings() {
    var i, index, item, len, settings;
    settings = $gameSystem.pGetMobileControlsSettings();
    for (index = i = 0, len = settings.length; i < len; index = ++i) {
      item = settings[index];
      if (item == null) {
        continue;
      }
      if (this.elements[index] == null) {
        continue;
      }
      if ((item != null) && (item[0] != null)) {
        if (item[0] === true) {
          this.elements[index].show();
        } else {
          this.elements[index].hide();
        }
      }
      if ((item != null) && (item[1] != null)) {
        if (item[1] === true) {
          this.elements[index].enable();
        } else {
          this.elements[index].disable();
        }
      }
    }
    this._exRefreshAltJoystick();
  }

  _exRefreshAltJoystick() {
    var e;
    try {
      if (!MCAltJoy.IsActiveInGame()) {
        return;
      }
      if ($gameSystem.pIsAltJoystickHiddenBySettings()) {
        return MCAltJoy.Hide();
      } else {
        return MCAltJoy.Show();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Spriteset_MobileControls.prototype;
  _._collectElementsWithMessageFlag = function() {
    var e;
    try {
      this._elementsWithMessageFlag = this.elements.filter(function(e) {
        return (e != null) && e.isHaveHideWithMessageFlag();
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._elementsWithMessageFlag = null;
    }
  };
  _._init = function() {
    $gameTemp._pkdJoyStick = null;
    this.elements = [];
    if (MCAltJoy.IsActiveInGame()) {
      setTimeout((function() {
        return MCAltJoy.Show();
      }), 200);
    }
    if (PKD_MobileControls.JOYSTICK.visible === true) {
      this._createJoyStick();
    } else {
      // * Кнопки должны начинаться с 1, поэтому всё равно первое место занимаем
      this.elements.push(null);
    }
    this._createButtons();
    this._createSwitchButtons();
  };
  //?[DYNAMIC]
  _._createJoyStick = function() {
    var joy;
    joy = new Sprite_PKDJoystick();
    this.addChild(joy);
    $gameTemp._pkdJoyStick = joy;
    this.elements.push(joy);
  };
  //?[VERSION]
  _._createButtons = function() {};
  _._createSwitchButtons = function() {
    var buttonSpr, e, i, len, results, settings, switchButtons;
    try {
      switchButtons = PKD_MobileControls.SWITCH_BUTTONS;
      results = [];
      for (i = 0, len = switchButtons.length; i < len; i++) {
        settings = switchButtons[i];
        buttonSpr = new Sprite_MCSwitchButton(settings);
        this.elements.push(buttonSpr);
        results.push(this.addChild(buttonSpr));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__callCancelHandler, ALIAS__callOkHandler, ALIAS__processCursorMove, ALIAS__start, ALIAS__updatePlacement, _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    // * Работает только если 2 варианта ответа
    if (this.mcIsQQ()) {
      if ($gameMessage.choices().length !== 2) {
        this.mcResetQQ();
      }
      if (!this.isCancelEnabled()) {
        this.mcResetQQ();
      }
    }
    ALIAS__start.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__processCursorMove = _.processCursorMove;
  _.processCursorMove = function() {
    if (this.mcIsQQ()) { // * NO cursor MOVE
      return;
    }
    ALIAS__processCursorMove.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__updatePlacement = _.updatePlacement;
  _.updatePlacement = function() {
    ALIAS__updatePlacement.call(this, ...arguments);
    if (this.mcIsQQ()) {
      this.mcStartQQ();
    }
  };
  //@[ALIAS]
  ALIAS__callOkHandler = _.callOkHandler;
  _.callOkHandler = function() {
    ALIAS__callOkHandler.call(this, ...arguments);
    if (this.mcIsQQ()) {
      return this.mcStopQQ();
    }
  };
  
  //@[ALIAS]
  ALIAS__callCancelHandler = _.callCancelHandler;
  _.callCancelHandler = function() {
    ALIAS__callCancelHandler.call(this, ...arguments);
    if (this.mcIsQQ()) {
      return this.mcStopQQ();
    }
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  _.mcStartQQ = function() {
    // * Move out from screen
    this.x = Graphics.width + 10000;
    this.y = Graphics.height + 10000;
    // * Shom window QQ
    SceneManager._scene.mcShowModalQQ();
  };
  _.mcIsQQ = function() {
    return $gameTemp._mcRequestQQWindowForChoice === true;
  };
  _.mcResetQQ = function() {
    return $gameTemp._mcRequestQQWindowForChoice = null;
  };
  _.mcStopQQ = function() {
    this.mcResetQQ();
    SceneManager._scene.mcCloseModalQQ();
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Данное окно используется как основа для Sprite_UITextExt

//rev 07.10.21
(function() {
  var Window_ExtTextLineBase;
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  PKD_MobileControls.link(Window_ExtTextLineBase);
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MC_QQ.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_MC_QQ;

Window_MC_QQ = class Window_MC_QQ extends Window_Base {
  constructor() {
    super(...arguments);
    //? Эта функция пока не используется из-за необходимости
    //@_loadHotKeys()
    this._drawBackground();
    this._createQQContent();
    this._drawWindowTitle();
  }

  getSettings() {
    return PKD_MobileControls.Window_QQ;
  }

  drawText() {
    return this.textSpr.drawText(...arguments);
  }

  close() {
    this.textSpr.visible = false;
    this.btnYes.visible = false;
    this.btnNo.visible = false;
    Window_Base.prototype.close.call(this);
    $gameTemp.kdButtonUnderMouse = null;
    setTimeout((function() {
      return $gameTemp.kdButtonUnderMouse = null;
    }), 100);
  }

  update() {
    return super.update();
  }

};

(function() {  //? Эта функция пока не используется из-за необходимости
  //@_updateHotKeys() if @isOpen()
  var _;
  //@[DEFINES]
  _ = Window_MC_QQ.prototype;
  _._loadHotKeys = function() {
    var p;
    p = this.getSettings();
    this.hotKeyYes = p.buttonYesQkey.toLowerCase();
    this.hotKeyNo = p.buttonNoQKey.toLowerCase();
    this.hotKeyYesGP = this._parseGPHotKey(p.buttonYesQKeyG);
    this.hotKeyNoGP = this._parseGPHotKey(p.buttonNoQKeyG);
  };
  _._parseGPHotKey = function(rawHotkey) {
    switch (rawHotkey) {
      case 'A':
        return "ok";
      case 'B':
        return "cancel";
      case 'X':
        return "shift";
      case 'Y':
        return "menu";
      case 'LB':
        return "pageup";
      case 'RB':
        return "pagedown";
      default:
        return "";
    }
  };
  _._drawBackground = function() {
    var backBitmap, backgroundName;
    if ($gameSystem._mcQuickQuestionBackImg == null) {
      $gameSystem._mcQuickQuestionBackImg = "mcQuickQuestionWindowDefaultBackground"; // * Если именно null
    }
    backgroundName = $gameSystem._mcQuickQuestionBackImg;
    if (backgroundName.isEmpty()) { // * Если пустая строка ""
      return;
    }
    backBitmap = ImageManager.loadPicture(backgroundName);
    this.backSprite = new Sprite(backBitmap);
    this.addChild(this.backSprite);
  };
  _._createQQContent = function() {
    this._createQQText();
    return this._createQQButtons();
  };
  _._createQQText = function() {
    var h, p, s, w, x, y;
    s = this.getSettings();
    ({w, h} = s.textSize);
    ({x, y} = s.textPosition);
    p = {
      visible: true,
      size: {w, h},
      font: {
        face: null,
        size: s.textFontSize,
        italic: false
      },
      margins: {x, y},
      forceCentered: true,
      singleLine: true
    };
    this.textSpr = new PKD_MobileControls.Sprite_UITextExt(p);
    return this.addChild(this.textSpr);
  };
  _._createQQButtons = function() {
    var p;
    p = this.getSettings();
    if ($gameSystem._mcQQButtons == null) {
      window.SetQuickQButtons("", ""); // * default
    }
    this.btnYes = new KDCore.ButtonM($gameSystem._mcQQButtons[0], false, "pictures");
    this.btnYes.addClickHandler(this._onBtnYesClick.bind(this));
    this.btnYes.move(p.buttonYesPosition);
    this.addChild(this.btnYes);
    this.btnNo = new KDCore.ButtonM($gameSystem._mcQQButtons[1], false, "pictures");
    this.btnNo.addClickHandler(this._onBtnNoClick.bind(this));
    this.btnNo.move(p.buttonNoPosition);
    this.addChild(this.btnNo);
  };
  _._onBtnYesClick = function() {
    this._onClickCommon();
    return Input.virtualClick('ok');
  };
  _._onClickCommon = function() {
    // * Закрывается окно из Window_ChoiceList, поэтому тут нету CLOSE
    return SoundManager.playCursor();
  };
  _._onBtnNoClick = function() {
    this._onClickCommon();
    return Input.virtualClick('escape');
  };
  _._drawWindowTitle = function() {
    if ($gameSystem._mcQuickQuestionText == null) {
      $gameSystem._mcQuickQuestionText = PKD_MobileControls.Window_QQ.defaultText;
    }
    this.drawText($gameSystem._mcQuickQuestionText);
  };
  _._updateHotKeys = function() {
    if (Input.isTriggered(this.hotKeyYes) || Input.isTriggered(this.hotKeyYesGP)) {
      this._onBtnYesClick();
      return;
    }
    if (Input.isTriggered(this.hotKeyNo) || Input.isTriggered(this.hotKeyNoGP)) {
      this._onBtnNoClick();
    }
  };
})();

// ■ END Window_MC_QQ.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    var ref;
    ALIAS__startMessage.call(this);
    return (ref = PKD_MobileControls.mcUI) != null ? ref.onGameMessageStart() : void 0;
  };
  
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return setTimeout((function() {
      var e, ref;
      try {
        if (!$gameMessage.isBusy()) {
          return (ref = PKD_MobileControls.mcUI) != null ? ref.onGameMessageEnd() : void 0;
        }
      } catch (error) {
        e = error;
      }
    }), 200);
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_MobileControls.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_MobileControls.prototype;
  _._createButtons = function() {
    var btn, buttonSpr, buttons, i, index, len;
    buttons = PKD_MobileControls.BUTTONS;
    for (index = i = 0, len = buttons.length; i < len; index = ++i) {
      btn = buttons[index];
      buttonSpr = new PKD_MobileControls.Sprite_UIUButton(btn);
      buttonSpr.registerInputIndex(index + 1);
      this.elements.push(buttonSpr);
      this.addChild(buttonSpr);
    }
  };
})();

// ■ END Spriteset_MobileControls.coffee
//---------------------------------------------------------------------------

//Plugin PKD_MobileControls builded by PKD PluginBuilder 2.2 - 07.11.2023