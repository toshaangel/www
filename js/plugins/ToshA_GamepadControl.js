//=============================================================================
// ToshA_GamepadControl.js
//=============================================================================

/*:
 *
 * @target MZ
 * @plugindesc Adds Xbox 360 controller support to RPG Maker MZ games.
 * @author ToshaAngel
 *
 * @help ToshA_GamepadControl.js
 * This plugin adds support for the Xbox 360 controller to RPG Maker MZ games.
 * Terms of Use:
 * This plugin can be used in free or commercial games.
*/
(function() {
    var is360 = false;
    if (navigator.getGamepads) {
        var gamepads = navigator.getGamepads();
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i] && gamepads[i].id === "Xbox 360 Controller (XInput STANDARD GAMEPAD)") {
                is360 = true;
                break;
            }
        }
    }
    if (!is360) {
        return;
    }

    Input.gamepadMapper = {
        0: 'ok',        // A
        1: 'cancel',    // B
        2: 'shift',     // X
        3: 'menu',      // Y
        4: 'pageup',    // LB
        5: 'pagedown',  // RB
        12: 'up',       // D-pad up
        13: 'down',     // D-pad down
        14: 'left',     // D-pad left
        15: 'right',    // D-pad right
        16: 'escape',   // Xbox button
        17: 'control'   // Left stick click
    };

	var alias_Gamepad_onAxisChange = Gamepad.prototype.onAxisChange;
	Gamepad.prototype.onAxisChange = function(axisId, value) {
    alias_Gamepad_onAxisChange.call(this, axisId, value);
    if (axisId === 0) {
        // Horizontal axis
        if (value > 0.5) {
            // Analog stick moved right
            Input._currentState['right'] = true;
            Input._currentState['left'] = false;
        } else if (value < -0.5) {
            // Analog stick moved left
            Input._currentState['left'] = true;
            Input._currentState['right'] = false;
        } else {
            // Analog stick released horizontally
            Input._currentState['left'] = false;
            Input._currentState['right'] = false;
        }
    } else if (axisId === 1) {
        // Vertical axis
        if (value > 0.5) {
            // Analog stick moved down
            Input._currentState['down'] = true;
            Input._currentState['up'] = false;
        } else if (value < -0.5) {
            // Analog stick moved up
            Input._currentState['up'] = true;
            Input._currentState['down'] = false;
        } else {
            // Analog stick released vertically
            Input._currentState['up'] = false;
            Input._currentState['down'] = false;
        }
    }

    // Check for diagonal movement
    var diagonal = false;
    for (var i = 0; i < 2; i++) {
        if (Math.abs(this._axes[i]) > 0.5) {
            diagonal = true;
            break;
        }
    }
    if (diagonal) {
        // Check for diagonal up-left movement
        if (this._axes[1] < -0.5 && this._axes[0] < -0.5) {
            Input._currentState['up'] = true;
            Input._currentState['left'] = true;
        }
        // Check for diagonal up-right movement
        else if (this._axes[1] < -0.5 && this._axes[0] > 0.5) {
            Input._currentState['up'] = true;
            Input._currentState['right'] = true;
        }
        // Check for diagonal down-left movement
        else if (this._axes[1] > 0.5 && this._axes[0] < -0.5) {
            Input._currentState['down'] = true;
            Input._currentState['left'] = true;
        }
        // Check for diagonal down-right movement
        else if (this._axes[1] > 0.5 && this._axes[0] > 0.5) {
            Input._currentState['down'] = true;
            Input._currentState['right'] = true;
        }
    }
};

})();