//==============================================================================
// Kill Counter
// by Shaz
// Last Updated: 2016.02.15
//==============================================================================

/*:
 * @plugindesc Allows you to track number of enemies killed
 * @author Shaz
 *
 * @help
 * This plugin allows you to track, in a variable, the number of a certain
 * type of enemy killed.  It only increments to the maximum number of enemies
 * required.
 *
 * Plugin Commands:
 * StartKillCounter enemyId variableId maxRequired - tracks kills in specified variable
 * EndKillCounter enemyId - stops counting kills
 *
 * enemyId - the id (no leading zeros) of the enemy to be counted
 * variableId - the id (no leading zeros) of the variable to hold the kill count
 * maxRequired - how many enemies are required, in total - default is 0, which
 *               means no limit
 */

(function() {
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    switch(command.toUpperCase()) {
      case 'STARTKILLCOUNTER':
        $gameParty.startKillCounter(eval(args[0]), eval(args[1]), eval(args[2] || 0));
        break;
      case 'ENDKILLCOUNTER':
        $gameParty.endKillCounter(eval(args[0]));
        break;
      default:
        _Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };

  var _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this._killCounter = [];
  };

  Game_Party.prototype.startKillCounter = function(enemyId, variableId, maxRequired) {
    if (!this._killCounter)
      this._killCounter = [];

    if (!maxRequired)
      maxRequired = 0;

    if (enemyId > 0)
      this._killCounter[enemyId] = [variableId, maxRequired];
  };

  Game_Party.prototype.endKillCounter = function(enemyId) {
    if (this._killCounter && enemyId > 0)
      this._killCounter[enemyId] = null;
  };

  Game_Party.prototype.incrementKillCounter = function(enemyId) {
    if (this._killCounter && enemyId > 0 && this._killCounter[enemyId]) {
      killVar = this._killCounter[enemyId][0];
      killLimit = this._killCounter[enemyId][1];
      if (killVar && (killLimit === 0 || killLimit > $gameVariables.value(killVar)))
        $gameVariables.setValue(killVar, $gameVariables.value(killVar) + 1);
    }
  }

  var _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
  Game_Enemy.prototype.performCollapse = function() {
    _Game_Enemy_performCollapse.call(this);
    $gameParty.incrementKillCounter(this._enemyId);
  }

})();