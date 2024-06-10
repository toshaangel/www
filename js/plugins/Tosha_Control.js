/*:
 * @target MZ
 * @plugindesc Расширенное управление персонажем: WASD и Геймпад.
 * @author ToshaAngel
 * @version v1.0.1
 *
 * @param Button 0
 * @text Кнопка 0 (A)
 * @desc Назначение для кнопки 0 (обычно A)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default ok
 * 
 * @param Button 1
 * @text Кнопка 1 (B)
 * @desc Назначение для кнопки 1 (обычно B)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default cancel
 * 
 *
 * @param Button 2
 * @text Кнопка 2 (X)
 * @desc Назначение для кнопки 2 (обычно X)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default none
 * 
 * @param Button 3
 * @text Кнопка 3 (Y)
 * @desc Назначение для кнопки 3 (обычно Y)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default menu
 *
 * 
 * @param Button 4
 * @text Кнопка 4 (LB)
 * @desc Назначение для кнопки 4 (обычно LB)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default pageup
 * 
 * 
 * @param Button 5
 * @text Кнопка 5 (RB)
 * @desc Назначение для кнопки 5 (обычно RB)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default pagedown
 * 
 * 
 * @param Button 6
 * @text Кнопка 6 (LT)
 * @desc Назначение для кнопки 6 (обычно LT)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default shift
 * 
 * 
 * @param Button 7
 * @text Кнопка 7 (RT)
 * @desc Назначение для кнопки 7 (обычно RT)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default none
 * 
 * 
 * @param Button 8
 * @text Кнопка 8 (select)
 * @desc Назначение для кнопки 8 (обычно select)
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option shift
 * @option jump
 * @option escape
 * @option pageup
 * @option pagedown
 * @option none
 * @default none
 * 
 * 
 *  
 * 
 * @help
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
 * Этот плагин позволяет игроку использовать клавиши WASD для передвижения персонажа,
 * клавишу F для активации событий перед персонажем, пробел для прыжка через клетку,
 * если это возможно, и управление с помощью геймпада, включая диагональное движение.
 *
 * Для настройки кнопок геймпада используйте параметры плагина в редакторе.
 */

(function() {
	    var parameters = PluginManager.parameters('Tosha_Control');

    // Настройка маппинга кнопок геймпада
    for (var i = 0; i <= 15; i++) {
        if (parameters[`Button ${i}`]) {
            Input.gamepadMapper[i] = parameters[`Button ${i}`];
        }
    }
    // Переназначение управления для передвижения
    Input.keyMapper[87] = 'up';    // W
    Input.keyMapper[65] = 'left';  // A
    Input.keyMapper[83] = 'down';  // S
    Input.keyMapper[68] = 'right'; // D
    Input.keyMapper[70] = 'ok';    // F
    Input.keyMapper[32] = 'jump';  // Пробел (Space)

    // Расширение update для Game_Player
    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        this.updateAnalogMove();
        this.updateDiagonalMovement();
    };

// Обновление для поддержки диагонального движения с клавиатуры
Game_Player.prototype.updateDiagonalMovement = function() {
    if (this.isMoving() || $gameMap.isEventRunning()) {
        return;
    }
    if (Input.isPressed('down') && Input.isPressed('left')) {
        this.moveDiagonally(4, 2);
    } else if (Input.isPressed('down') && Input.isPressed('right')) {
        this.moveDiagonally(6, 2);
    } else if (Input.isPressed('up') && Input.isPressed('left')) {
        this.moveDiagonally(4, 8);
    } else if (Input.isPressed('up') && Input.isPressed('right')) {
        this.moveDiagonally(6, 8);
    }
};

    // Обновление для поддержки аналогового движения
Game_Player.prototype.updateAnalogMove = function() {
    if (this.isMoving() || $gameMap.isEventRunning()) {
        return;
    }

    if (navigator.getGamepads) {
        var gamepad = navigator.getGamepads()[0];
        if (gamepad) {
            var deadZone = 0.15;
            var x = gamepad.axes[0];
            var y = gamepad.axes[1];

            if (x > deadZone && y < -deadZone) {
                this.moveDiagonally(6, 8);
            } else if (x > deadZone && y > deadZone) {
                this.moveDiagonally(6, 2);
            } else if (x < -deadZone && y < -deadZone) {
                this.moveDiagonally(4, 8);
            } else if (x < -deadZone && y > deadZone) {
                this.moveDiagonally(4, 2);
            }
        }
    }
};
    // Функция прыжка
    Game_Player.prototype.jumpForward = function() {
        // Логика прыжка
    };

    // Расширение update для Scene_Map
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.processJump();
        if (Input.isTriggered('callQuest') && !$gameMap.isEventRunning()) {
            SceneManager.push(Scene_Quest); // Вызов сцены заданий
        }
    };

    // Обработка ввода для прыжка
    Scene_Map.prototype.processJump = function() {
        if (Input.isTriggered('jump') && !$gamePlayer.isJumping()) {
            $gamePlayer.jumpForward();
        }
    };

    // Функция для определения координат перед персонажем
    Game_Player.prototype.frontCoordinates = function() {
        // Логика определения координат перед персонажем
    };
})();
