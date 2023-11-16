/*:
 * @target MZ
 * @plugindesc Enemy Kill Counter MZ v1.1.0 - A plugin to count the number of enemies killed in RPG Maker MZ.
 * @author ToshaAngel
 *
 * @help ToshA_KillCounterMZ.js
 *
 * This plugin provides a way to count the number of enemies killed in your game.
 *
 * Plugin Commands:
 *
 * SetEnemyVariable <enemyId> <variableId>
 * - Associates an enemy with a variable to increment when the enemy is killed.
 *
 * ResetEnemyVariable <variableId>
 * - Resets the value of the specified variable to 0.
 *
 * Usage:
 *
 * 1. Use the SetEnemyVariable plugin command to associate an enemy with a variable to increment when the enemy is killed.
 * 2. When the player kills an enemy, the plugin will automatically increment the associated variable by 1.
 * 3. Use the ResetEnemyVariable plugin command to reset the value of the specified variable to 0.
 *
 * This plugin does not provide any plugin commands for displaying the value of the variables.
 *
 * Plugin Parameters:
 *
 * None
 *
 * @command SetEnemyVariable
 * @text Set Enemy Variable
 * @desc Associates an enemy with a variable to increment when the enemy is killed.
 *
 * @arg enemyId
 * @type enemy
 * @default 1
 * @text Enemy ID
 * @desc ID of the enemy to associate with the specified variable.
 *
 * @arg variableId
 * @type variable
 * @default 1
 * @text Variable ID
 * @desc ID of the variable to increment when the enemy is killed.
 *
 * @command ResetEnemyVariable
 * @text Reset Enemy Variable
 * @desc Resets the value of the specified variable to 0.
 *
 * @arg variableId
 * @type variable
 * @default 1
 * @text Variable ID
 * @desc ID of the variable to reset to 0.
 */

(function() {
    var pluginName = 'EnemyKillCounterMZ';

    PluginManager.registerCommand(pluginName, 'SetEnemyVariable', function(args) {
        var enemyId = Number(args.enemyId);
        var variableId = Number(args.variableId);
        var gameVariables = $gameVariables;

        var enemyVariableMap = gameVariables.enemyVariableMap || {};
        enemyVariableMap[enemyId] = variableId;
        gameVariables.enemyVariableMap = enemyVariableMap;
    });

    PluginManager.registerCommand(pluginName, 'ResetEnemyVariable', function(args) {
        var variableId = Number(args.variableId);
        var gameVariables = $gameVariables;

        gameVariables.setValue(variableId, 0);
    });

    function updateEnemyVariable(enemy) {
        if (enemy.isDead()) {
            var enemyId = enemy.enemyId();
            var gameVariables = $gameVariables;
            var enemyVariableMap = gameVariables.enemyVariableMap || {};
            var variableId = enemyVariableMap[enemyId];

            if (variableId) {
                var killVariable = gameVariables.value(variableId);
                killVariable++;
                gameVariables.setValue(variableId, killVariable);
            }
        }
    };

    var _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function() {
        updateEnemyVariable(this);
        _Game_Enemy_performCollapse.call(this);
    };

})();
