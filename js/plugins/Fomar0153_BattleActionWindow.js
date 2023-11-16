//=============================================================================
// RPG Maker MZ - Battle Action Window
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Replaces the log window with a simple action window.
 * @author Fomar0153
 *
 * @param X Alignment
 * @type select
 * @option center
 * @option left
 * @option right
 * @desc Where would you like the Battle Action Window to appear on screen?
 * @default center
 *
 * @param X Offset
 * @type integer
 * @desc Where would you like the Battle Action Window to appear on screen?
 * @default 0
 *
 * @param Y Position
 * @type integer
 * @desc Where would you like the Battle Action Window to appear on screen?
 * @default 50
 *
 * @param Width
 * @type integer
 * @desc How wide do you want the Battle Action Window to be?
 * @default 300
 *
 * @param Height
 * @type integer
 * @desc How tall would you like the Battle Action Window to be?
 * @default 68
 *
 * @param Minimum Display Time
 * @type integer
 * @desc This is the minimum time the Battle Action Window will be displayed for.
 * @default 60
 *
 *
 * @help Fomar0153_BattleActionWindow.js
 *
 * This plugin creates a Battle Action Window and hides the log window.
 * You can customise the Battle Action Window with the parameters.
 *
 */

var Fomar = Fomar || {};
Fomar.BattleActionWindow = {};

Fomar.BattleActionWindow.parameters = PluginManager.parameters('Fomar0153_BattleActionWindow');

Fomar.BattleActionWindow.alignment = Fomar.BattleActionWindow.parameters["X Alignment"];
Fomar.BattleActionWindow.x = parseInt(Fomar.BattleActionWindow.parameters["X Offset"]);
Fomar.BattleActionWindow.y = parseInt(Fomar.BattleActionWindow.parameters["Y Position"]);
Fomar.BattleActionWindow.width = parseInt(Fomar.BattleActionWindow.parameters["Width"]);
Fomar.BattleActionWindow.height = parseInt(Fomar.BattleActionWindow.parameters["Height"]);
Fomar.BattleActionWindow.wait = parseInt(Fomar.BattleActionWindow.parameters["Minimum Display Time"]);

(() => {

  function Window_BattleAction() {
    this.initialize(...arguments);
  }

  Window_BattleAction.prototype = Object.create(Window_Selectable.prototype);
  Window_BattleAction.prototype.constructor = Window_BattleAction;

  Window_BattleAction.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._waitCount = 0;
    this.refresh(null);
    this.hide();
  };

  Window_BattleAction.prototype.messageSpeed = function() {
    return Fomar.BattleActionWindow.wait; // 16
  };

  Window_BattleAction.prototype.wait = function() {
    this._waitCount = this.messageSpeed();
  };

  Window_BattleAction.prototype.isBusy = function() {
    return this._waitCount > 0;
  };

  Window_BattleAction.prototype.update = function() {
    if (this._waitCount > 0) {
      this._waitCount -= this.isFastForward() ? 3 : 1;
      if (this._waitCount < 0) {
        this._waitCount = 0;
      }
    }
  };

  Window_BattleAction.prototype.isFastForward = function() {
    return (
      Input.isLongPressed("ok") ||
      Input.isPressed("shift") ||
      TouchInput.isLongPressed()
    );
  };

  Window_BattleAction.prototype.refresh = function(item) {
    this.contents.clear();
    if (item) {
      const rect = this.itemLineRect(0);
      var iw = 0;
      if (item.iconIndex > 0) {
        iw = ImageManager.iconWidth + 4;
      }
      const tw = this.textWidth(item.name);
      const width = tw;
      const height = rect.height;
      const x = rect.x + rect.width / 2 - tw / 2 + iw / 2;
      const y = rect.y;
      const ix = x - iw;
      this.drawIcon(item.iconIndex, ix, y);
      this.contents.drawText(item.name, x, y, width, height, "left");
      this.show();
      this.wait();
    }
  };

  Window_BattleLog.prototype.addText = function(text) {};

  BattleManager.setBattleActionWindow = function(battleActionWindow) {
    this._battleActionWindow = battleActionWindow;
  };

  Fomar.BattleActionWindow.BattleManager_isBusy = BattleManager.isBusy;
  BattleManager.isBusy = function() {
    return Fomar.BattleActionWindow.BattleManager_isBusy.call(this) || this._battleActionWindow.isBusy();
  };

  BattleManager.startAction = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    const targets = action.makeTargets();
    this._phase = "action";
    this._action = action;
    this._targets = targets;
    subject.useItem(action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(subject, action, targets);

    this._battleActionWindow.refresh(subject.currentAction().item());
  };

  Fomar.BattleActionWindow.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function() {
    Fomar.BattleActionWindow.Scene_Battle_createAllWindows.call(this);
    this.createBattleActionWindow();
  };

  Scene_Battle.prototype.createBattleActionWindow = function() {
    const rect = this.battleActionWindowRect();
    this._battleActionWindow = new Window_BattleAction(rect);
    this.addWindow(this._battleActionWindow);
  };

  Scene_Battle.prototype.battleActionWindowRect = function() {
    var wx = Fomar.BattleActionWindow.x;
    switch (Fomar.BattleActionWindow.alignment) {
      case "center":
        wx += (Graphics.boxWidth - Fomar.BattleActionWindow.width) / 2;
        break;
      case "right":
        wx += Graphics.boxWidth - Fomar.BattleActionWindow.width;
        break;
    }
    return new Rectangle(wx, Fomar.BattleActionWindow.y, Fomar.BattleActionWindow.width, Fomar.BattleActionWindow.height);
  };

  Fomar.BattleActionWindow.Scene_Battle_logWindowRect = Scene_Battle.prototype.logWindowRect;
  Scene_Battle.prototype.logWindowRect = function() {
    const rect = Fomar.BattleActionWindow.Scene_Battle_logWindowRect.call(this);
    rect.x += 2 * Graphics.boxWidth;
    // I'm sure Graphics.boxWidth would have been enough but just in case.
    return rect;
  };

  Fomar.BattleActionWindow.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function() {
    Fomar.BattleActionWindow.Scene_Battle_createDisplayObjects.call(this);
    BattleManager.setBattleActionWindow(this._battleActionWindow);
  };

  Fomar.BattleActionWindow.Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
  Scene_Battle.prototype.updateVisibility = function() {
    Fomar.BattleActionWindow.Scene_Battle_updateVisibility.call(this);
    this.updateBattleActionWindowVisibility();
  };

  Scene_Battle.prototype.updateBattleActionWindowVisibility = function() {
    if (this._battleActionWindow.visible) {
      this._battleActionWindow.visible = this._spriteset.isBusy() || this._battleActionWindow.isBusy();
    }
  };

})();
