/*:
 * @target MZ
 * @plugindesc Расширенное управление персонажем: WASD для передвижения, F для активации событий, пробел для прыжка, поддержка геймпада.
 * @author ToshaAngel
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
 * Этот плагин позволяет игроку использовать клавиши WASD для передвижения персонажа, клавишу F для активации событий перед персонажем,
 * пробел для прыжка через клетку, если это возможно, и управление с помощью геймпада, включая диагональное движение.
 * 
 * Управление геймпадом:
 * - Левый аналог и крестовина для движения (включая диагональное)
 * - A для подтверждения / активации
 * - B для отмены / возврата
 * - Start для вызова меню
 * - LB для дополнительных действий (аналог shift)
 *
 * Нет необходимости в дополнительных параметрах или командах плагина.
 */

(function() {
    // Переназначение управления для передвижения
    Input.keyMapper[87] = 'up';    // W
    Input.keyMapper[65] = 'left';  // A
    Input.keyMapper[83] = 'down';  // S
    Input.keyMapper[68] = 'right'; // D
    Input.keyMapper[70] = 'ok';    // F
    Input.keyMapper[32] = 'jump';  // Пробел (Space)

    // Переопределение управления геймпада
    Input.gamepadMapper = {
        0: 'ok',        // A
        1: 'cancel',    // B
        2: 'shift',     // X (Не используется, можно настроить под другое действие)
        3: 'menu',      // Y (Не используется, можно настроить под другое действие)
        4: 'pageup',    // LB
        5: 'pagedown',  // RB (Не используется, можно настроить под другое действие)
        9: 'escape',    // Start
        12: 'up',       // Крестовина вверх
        13: 'down',     // Крестовина вниз
        14: 'left',     // Крестовина влево
        15: 'right',    // Крестовина вправо
    };

    // Расширение update для обработки диагонального движения через геймпад
    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        this.updateAnalogMove();
        this.updateDiagonalMovement();
    };

    // Обновление для поддержки диагонального движения с клавиатуры
    Game_Player.prototype.updateDiagonalMovement = function() {
        if (this.isMoving()) {
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
	Game_Player.prototype.updateAnalogMove = function() {
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

    // Добавление функции прыжка для Game_Player
    Game_Player.prototype.jumpForward = function() {
        var x1 = this.x;
        var y1 = this.y;
        var x2 = this.x; // Координаты второй клетки перед персонажем
        var y2 = this.y; // Координаты второй клетки перед персонажем

        switch (this.direction()) {
            case 2: // вниз
                y1 += 1;
                y2 += 2;
                break;
            case 4: // влево
                x1 -= 1;
                x2 -= 2;
                break;
            case 6: // вправо
                x1 += 1;
                x2 += 2;
                break;
            case 8: // вверх
                y1 -= 1;
                y2 -= 2;
                break;
        }

        // Проверяем, свободна ли вторая клетка для перемещения
        if (!$gameMap.isPassable(x2, y2, this.direction())) {
            // Если вторая клетка непроходима, прыжок не выполняется
            return;
        }

        // Проверяем, есть ли препятствие на первой клетке
        if ($gameMap.isPassable(x1, y1, this.direction())) {
            // Если первая клетка проходима, совершаем прыжок на 2 клетки вперед
            this.jump(x2 - this.x, y2 - this.y);
        } else {
            // Если первая клетка непроходима, но вторая проходима, совершаем прыжок
            this.jump(x2 - this.x, y2 - this.y);
        }
    };

    // Расширение updateScene для обработки прыжка
    const _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        _Scene_Map_updateScene.call(this);
        this.processJump();
    };

    // Обработка ввода для прыжка
    Scene_Map.prototype.processJump = function() {
        if (Input.isTriggered('jump') && !$gamePlayer.isJumping()) {
            $gamePlayer.jumpForward();
        }
    };

    // Обработка нажатия клавиши F и активации события перед игроком
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.checkActionTrigger();
    };

    Scene_Map.prototype.checkActionTrigger = function() {
        if (Input.isTriggered('ok')) {
            var front = $gamePlayer.frontCoordinates();
            if ($gameMap.eventsXy(front.x, front.y).length > 0) {
                $gameMap.eventsXy(front.x, front.y).forEach(function(event) {
                    if (event.isTriggerIn([0,1,2])) {
                        event.start();
                    }
                });
            }
        }
    };

    // Функция для определения координат перед персонажем
    Game_Player.prototype.frontCoordinates = function() {
        var x = this.x;
        var y = this.y;
        switch (this.direction()) {
            case 2: // вниз
                y += 1;
                break;
            case 4: // влево
                x -= 1;
                break;
            case 6: // вправо
                x += 1;
                break;
            case 8: // вверх
                y -= 1;
                break;
        }
        return { x: x, y: y };
    };
})();