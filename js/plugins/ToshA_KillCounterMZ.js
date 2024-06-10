/*:
 * @target MZ
 * @plugindesc Счетчик убийств врагов Подсчет и реакция на количество убитых врагов в RPG Maker MZ.
 * @author ToshaAngel
 * @version v1.2.1
 *
 * @command SetEnemyVariable
 * @text Назначить переменную врага
 * @desc Связывает врага с переменной, которая увеличивается при его убийстве.
 *
 * @arg enemyId
 * @type enemy
 * @default 1
 * @text ID врага
 * @desc ID врага, который будет связан с переменной.
 *
 * @arg variableId
 * @type variable
 * @default 1
 * @text ID переменной
 * @desc ID переменной, которая увеличивается при убийстве врага.
 *
 * @arg threshold
 * @type number
 * @default 10
 * @text Порог
 * @desc Значение переменной, при достижении которого срабатывает событие.
 *
 * @arg action
 * @type select
 * @option Ничего не делать
 * @value none
 * @option Запустить событие
 * @value event
 * @option Увеличить переменную
 * @value increaseVariable
 * @option Включить переключатель
 * @value switch
 * @default none
 * @text Действие
 * @desc Действие, которое выполняется при достижении порога.
 *
 * @arg eventId
 * @type number
 * @default 1
 * @text ID события
 * @desc ID общего события, которое будет запущено.
 * @parent action
 *
 * @arg increaseVariableId
 * @type variable
 * @default 1
 * @text ID переменной для увеличения
 * @desc Переменная, которая увеличивается при достижении порога.
 * @parent action
 *
 * @arg switchId
 * @type switch
 * @default 1
 * @text ID переключателя
 * @desc Переключатель, который включается при достижении порога.
 * @parent action
 *
 * @arg resetAfterTrigger
 * @text Сброс после выполнения
 * @desc Сбросить и удалить настройку после достижения порога?
 * @type boolean
 * @default false
 * @on Сбросить
 * @off Не сбрасывать
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
 * Используйте команду плагина "Назначить переменную врага" для связывания врага с переменной.
 * Когда игрок убивает врага, плагин автоматически увеличит соответствующую переменную.
 * Если переменная достигает заданного порога, сработает выбранное вами действие.
 */

(function() {
    var pluginName = 'ToshA_KillCounterMZ';

    var pendingActions = [];

    PluginManager.registerCommand(pluginName, 'SetEnemyVariable', function(args) {
        var enemyId = Number(args.enemyId);
        var variableId = Number(args.variableId);
        var threshold = Number(args.threshold);
        var action = args.action;
        var resetAfterTrigger = args.resetAfterTrigger === 'true';

        var gameVariables = $gameVariables;
        var enemyVariableMap = gameVariables.enemyVariableMap || {};
        
        enemyVariableMap[enemyId] = { variableId, threshold, action, args, resetAfterTrigger };
        gameVariables.enemyVariableMap = enemyVariableMap;
    });

function updateEnemyVariable(enemy) {
    if (enemy.isDead()) {
        var enemyId = enemy.enemyId();
        var gameVariables = $gameVariables;
        var enemyVariableMap = gameVariables.enemyVariableMap || {};
        var enemyData = enemyVariableMap[enemyId];

        if (enemyData) {
            var variableId = enemyData.variableId;
            var killVariable = gameVariables.value(variableId) + 1;
            gameVariables.setValue(variableId, killVariable);

            // Проверяем, достигнуто ли заданное количество убийств
            if (killVariable >= enemyData.threshold) {
                // Если в бою, добавляем действие в очередь, иначе выполняем сразу
                if ($gameParty.inBattle()) {
                    pendingActions.push({ 
                        type: enemyData.action, 
                        args: enemyData.args, 
                        variableId: variableId, 
                        resetAfterTrigger: enemyData.resetAfterTrigger 
                    });
                } else {
                    executeAction(enemyData.action, enemyData.args, variableId, enemyData.resetAfterTrigger);
                }
            }
        }
    }
}

    function executeAction(action, args, variableId, resetAfterTrigger) {
        switch (action) {
            case 'event':
                $gameTemp.reserveCommonEvent(Number(args.eventId));
                break;
            case 'increaseVariable':
                $gameVariables.setValue(Number(args.increaseVariableId), $gameVariables.value(Number(args.increaseVariableId)) + 1);
                break;
            case 'switch':
                $gameSwitches.setValue(Number(args.switchId), true);
                break;
        }

        if (resetAfterTrigger) {
            $gameVariables.setValue(variableId, 0);
            delete $gameVariables.enemyVariableMap[args.enemyId];
        }
    }

    var _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.call(this, result);
        if (pendingActions.length > 0) {
            executePendingActions();
        }
    };

    function executePendingActions() {
        while (pendingActions.length > 0) {
            var action = pendingActions.shift();
            executeAction(action.type, action.args, action.variableId, action.resetAfterTrigger);
        }
    }

    var _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function() {
        updateEnemyVariable(this);
        _Game_Enemy_performCollapse.call(this);
    };

})();
