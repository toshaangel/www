/*:
 * @target MZ
 * @plugindesc [v1.2.0] Adds a system of Dynamic Switches that are managed over real time.
 * @author Undermax | Maxii1996
 * @url https://undermax.itch.io/
 * @help
 * 
 * _________________________________________________________
 * 
 *  Plugin Version:          1.2.0
 *  Developed by:            Undermax | Maxii1996
 *  Web:                     https://undermax.itch.io/
 * _________________________________________________________
 * 
 *        _____                                        _          
 *       |  __ \                                      (_)         
 *       | |  | |  _   _   _ __     __ _   _ __ ___    _    ___   
 *       | |  | | | | | | | '_ \   / _` | | '_ ` _ \  | |  / __|  
 *       | |__| | | |_| | | | | | | (_| | | | | | | | | | | (__   
 *       |_____/   \__, | |_| |_|  \__,_| |_| |_| |_| |_|  \___|  
 *         _____    __/ |     _   _            _                  
 *        / ____|  |___/     (_) | |          | |                 
 *       | (___   __      __  _  | |_    ___  | |__     ___   ___ 
 *        \___ \  \ \ /\ / / | | | __|  / __| | '_ \   / _ \ / __|
 *        ____) |  \ V  V /  | | | |_  | (__  | | | | |  __/ \__ \
 *       |_____/    \_/\_/   |_|  \__|  \___| |_| |_|  \___| |___/
 * 
 * 
 *  ============================= CHANGE LOG =============================
 *
 *    (v1.2.0)
 * 
 *    This medium-sized update introduces several new
 *    features and changes that are crucial compared
 *    to previous versions of the plugin. We recommend
 *    reviewing the attached example for proper event
 *    configuration.
 *
 *    Dynamic Switches functionality has been slightly
 *    modified. They no longer turn off automatically
 *    and must be manually deactivated, offering
 *    greater control over events with the new
 *    features in this version.
 *
 *    Unset Dynamic Switch command now deactivates the
 *    switch but allows you to choose its state upon
 *    deactivation (By default, it reactivates for
 *    reuse, but you can opt to keep it off for manual
 *    reactivation). 
 *
 *    Get Time Remaining for Switch command has been
 *    revised to return either a numeric value or text
 *    (previously only text), improving time variable
 *    management (Always returns remaining time in
 *    seconds for Numeric method).
 *
 *    Show Progress Bar in Event: A major update with
 *    rewritten code sections allowing for multiple
 *    progress bars creation (Previously limited to 1).
 *
 *    Entering "0" in "Event ID" for Show Progress Bar
 *    in Events now retrieves the current event ID
 *    you're interacting with, or you can enter the
 *    Event ID manually as before.
 *
 *    Enhancements in progress bar position and size.
 *
 *    Improved timer customization, color, and font
 *    size. Note: Using a large font might pixelate
 *    the timer, so choose a size appropriate to the
 *    bar height (e.g., font size < 16 for a bar height
 *    of 5).
 *
 *    Set Progress Bar Visibility: Altered to
 *    temporarily show or hide progress bars due to
 *    the new multiple bar system.
 *
 *    Removed plugin command for hiding a specific
 *    event's progress bar due to the new multiple bar
 *    system.
 *
 *    The system prioritizes internet time; if
 *    unavailable, defaults to local system time for
 *    dynamic switches.
 *
 *    New plugin command: "Check Online Status" easily
 *    checks internet connectivity, returning "1" in a
 *    chosen variable if online, otherwise a different
 *    value. This allows events to verify internet time
 *    usage and restrict certain events to online
 *    connectivity.
 *
 *    Additional optimizations and various code changes
 *    have been made.
 *
 *    IMPORTANT:
 *
 *    If upgrading from a previous version, the changes
 *    in this update may require game modifications and
 *    updates to adapt to the new plugin logic. We
 *    apologize for any inconvenience caused.
 *
 * 
 * 
 *    (v1.1.0)
 * 
 *      - Added the Individual and Global Dynamic Switches system.
 * 
 *      - Added a new plugin command to check if a switch was executed 
 *      with online time. If it was, it saves true in a variable, otherwise 
 *      it returns false.
 *
 *          In events, in the conditions you can use "Script"
 *
 *                  $gameVariables.value(x) === true
 *
 *       to compare true = true or false = true and act accordingly.
 *
 *      This command can also be used to know whether or not there is time 
 *      left for the switch to activate. (I mean, if it is in cooldown)
 * 
 * 
 *      (v1.0.0)
 * 
 *      Initial Release
 * 
 * ============================ INTRODUCTION ============================
 * 
 *   This plugin enables the game to set dynamic switches, which can be 
 *   activated after a certain amount of real-time, even when the game is 
 *   not running.
 * 
 *   For instance, this can be used to make an event or mini-game that can 
 *   only be played or executed once a day.
 * 
 *   The operation is straightforward:
 * 
 *   The selected switches will remain in the off state and will be locked. 
 *   (This means that they cannot be modified manually, either by events or 
 *   by debug mode.)
 * 
 *   Once the time has expired, the switch will be in the "ON" state, 
 *   signaling it's "Available" or "Time has already ended." It's up to you 
 *   to decide what you want to do next. (Changed in v1.2.0)
 * 
 *   v1.2.0, now: 
 *   The Dynamic Switch will remain off and disabled until you use the 
 *   "Unset Dynamic Switch" command.
 * 
 *   The plugin prioritizes Internet connection to determine whether the 
 *   time has passed or not. If there's no internet, local time is used. 
 *   This is to prevent the player from modifying their system's date and 
 *   time to fast-forward time.
 * 
 *   Usage is simple: Start by setting the "Parameters" in the plugin. 
 *   You will find "Lock Switches" and "Initialize Active Switches" 
 *   which are crucial for setup.
 * 
 *   Lock Switches prevent the user from modifying the state of the switch 
 *   in any way. The Switch will always remain OFF and cannot be modified, 
 *   except by using "Initialize Active Switches", which will allow the 
 *   selected switch to be initialized to "True" at the start of the game.
 * 
 *   Remember, every time you start a new game it will have its own switch 
 *   initializations. If you are in the RPG Maker editor and you use the 
 *   "Skip title screen" function, do not forget that you are creating a 
 *   new game each time, you are not loading the game.
 * 
 *   The rest of the functionality is used with Plugin commands, either to 
 *   set or to remove a Dynamic Switch. A small and simple scene is also 
 *   included to show the remaining time for each of the activated and 
 *   running Dynamic Switches, intended more for Debug.
 * 
 *   <<<<< Dynamic Switches Types >>>>>
 * 
 *   - Global: Switches will affect all saved games. (Not recommended)
 *  
 *   -  Individual (Recommended): The dynamic switches are for each save 
 *    slot separately.
 * 
 * ============================ ProgressBar ==========================
 * 
 *   The `showProgressBarInEvent` command is used to visually display a 
 *   progress bar on a specific event, representing the remaining time for 
 *   a dynamic switch. Here's how to use it:
 * 
 *   1. **Parameter Setup:**
 *      Before using the command, ensure the parameters like `eventId`, 
 *      `switchId`, `backgroundColor`, `barColor`, `width`, `height`, 
 *      `offsetX`, `offsetY`, and `showTime` are correctly set up.
 * 
 *   2. **Command Execution:**
 *      Execute the `showProgressBarInEvent` command in an event, providing 
 *      the correct parameters. This will display the progress bar on the 
 *      specified event.
 * 
 *   3. **Progress Bar Display:**
 *      The progress bar will appear on the specified event, showing the 
 *      remaining time for the associated dynamic switch.
 * 
 *   Using with `setDynamicSwitch`:
 * 
 *   When using `showProgressBarInEvent` immediately after `setDynamicSwitch`, 
 *   it is crucial to add a wait of at least 10 frames between the two commands 
 *   to ensure correct execution:
 * 
 *   1. **Execute `setDynamicSwitch`:**
 *      First, execute the `setDynamicSwitch` command to set up the dynamic 
 *      switch with the desired time.
 * 
 *   2. **Add Wait:**
 *      Before executing `showProgressBarInEvent`, insert a wait command of 
 *      at least 10 frames. This can be done manually in the RPG Maker event 
 *      editor, using the "Wait" event command.
 * 
 *   3. **Execute `showProgressBarInEvent`:**
 *      After the wait, execute the `showProgressBarInEvent` command with the 
 *      appropriate parameters.
 * 
 * 
 * 
 * ========================== END OF DOCUMENTATION ==========================
 * 
 * @param lockSwitches
 * @text Lock Switches
 * @type switch[]
 * @desc Identifies switches that cannot be manually modified in-game.
 * 
 * @param initActiveSwitches
 * @text Initialize Active Switches
 * @type switch[]
 * @desc Select switches to initialize as active when the game starts.
 * 
 * @command setDynamicSwitch
 * @text Set Dynamic Switch
 * @desc Activates a dynamic switch that will be deactivated after a specified time period.
 *
 * @arg switchId
 * @text Switch ID
 * @type number
 * @desc ID of the switch to be deactivated.
 *
 * @arg unit
 * @text Time Unit
 * @type select
 * @option Seconds
 * @option Minutes
 * @option Hours
 * @option Days
 * @desc Unit of time to wait before the switch is activated.
 *
 * @arg amount
 * @text Amount
 * @type number
 * @desc Amount of time to wait before the switch is activated.
 *
 * @command unsetDynamicSwitch
 * @text Unset Dynamic Switch
 * @desc Deactivates a dynamic switch and determines its end state.
 *
 * @arg switchId
 * @text Switch ID
 * @type number
 * @desc ID of the switch to be deactivated.
 * 
 * @arg endAction
 * @text End Action of the Dynamic Switch
 * @type select
 * @option Turn On
 * @value TurnOn
 * @default TurnOn
 * @option Turn Off
 * @value TurnOff
 * @option Do Nothing
 * @value DoNothing
 * @desc Determines the final action taken on the switch: Turn On, Turn Off, or Do Nothing.
 * 
 * @command showSwitchStatus
 * @text Show Switch Status
 * @desc Displays a scene with the status of all pending switches.
 *
 * @command resetAllDynamicSwitches
 * @text Reset All Dynamic Switches
 * @desc Resets all dynamic switches to true, maintaining the locked logic from the plugin configuration.
 *
 * @command getTimeRemainingForSwitch
 * @text Get Time Remaining for Switch
 * @desc Retrieves the remaining time for a switch and stores it in a variable.
 *
 * @arg switchId
 * @text Switch ID
 * @type number
 * @desc ID of the switch for which to get the remaining time.
 *
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @desc ID of the game variable where the remaining time will be stored.
 * 
 * @arg format
 * @text Output Format
 * @type select
 * @option Text Format
 * @value text
 * @option Numeric Format (Seconds)
 * @value numeric
 * @desc Choose the format in which the remaining time will be returned: as text (e.g., "5 seconds") or numeric (e.g., 5).
 * @default numeric
 *
 * @command showProgressBarInEvent
 * @text Show Progress Bar in Event
 * @desc Displays a progress bar in a specific event. If used after setting a switch, a delay of at least 10 frames is recommended.
 *
 * @arg eventId
 * @text Event ID
 * @type number
 * @desc ID of the event where the progress bar will be displayed. Currently Only a Progress Bar by Map!
 *
 * @arg switchId
 * @text Dynamic Switch ID
 * @type number
 * @desc ID of the dynamic switch from which the information will be retrieved.
 *
 * @arg backgroundColor
 * @text Background Color
 * @type text
 * @default #00275288
 * @desc Background color of the progress bar.
 *
 * @arg barColor
 * @text Bar Color
 * @type text
 * @default #4797ff
 * @desc Color of the progress bar.
 *
 * @arg width
 * @text Width
 * @type number
 * @min 1
 * @default 75
 * @desc Width of the progress bar.
 *
 * @arg height
 * @text Height
 * @type number
 * @min 1
 * @default 5
 * @desc Height of the progress bar.
 *
 * @arg offsetX
 * @text Offset X
 * @type number
 * @default 0
 * @desc Horizontal offset of the progress bar from the event's position.
 *
 * @arg offsetY
 * @text Offset Y
 * @type number
 * @default -40
 * @desc Vertical offset of the progress bar from the event's position.
 *
 * @arg showTime
 * @text Display Timer on Bar?
 * @type boolean
 * @default false
 * @desc Shows the remaining time above the bar.
 * 
 * @arg timeFontSize
 * @text Time Font Size
 * @desc The font size of the remaining time text.
 * @type number
 * @default 16
 *
 * @arg timeFontColor
 * @text Time Font Color
 * @desc The color of the remaining time text.
 * @type text
 * @default #FFFFFF
 * 
 * @command setProgressBarVisibility
 * @text Set Progress Bar Visibility
 * @desc Temporarily hides progress bars. They are displayed again if a new Dynamic Switch is established again.
 *
 * @arg visibility
 * @text Visibility
 * @type boolean
 * @default true
 * @desc Sets the visibility of the progress bar. True to display the progress bar, false to hide it.
 * @on Show Bars
 * @off Hide Bars
 * 
 * @param dynamicSwitchMethod
 * @text Dynamic Switch Method
 * @type select
 * @option Global
 * @option Individual
 * @desc Choose the method for dynamic switches: Global or Individual (Recommended).
 * @default Individual
 * 
 * @command checkSwitchOnline
 * @text Check if Switch is Online
 * @desc Checks if a switch was obtained online and stores the result in a variable.
 *
 * @arg switchId
 * @text Switch ID
 * @type number
 * @min 1
 * @desc The ID of the switch you want to check.
 *
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @desc The ID of the variable where you want to save the result.
 * 
 * @command checkOnlineStatus
 * @text Check Online Status
 * @desc Checks if the game can connect to Internet and stores the result in a variable. Must Use a wait after use this command.
 *
 * @arg variableId
 * @text Variable ID
 * @desc The ID of the variable to store the result of the check. (1 = Available | Other Value = Error). 
 * @type variable
 *
 * 
*/


const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const baseGamePath = path.dirname(window.location.pathname).replace(/^\/|\/$/g, '');
const filePath = path.join(baseGamePath, 'js', 'gameData.dat');
const keyPath = path.join(baseGamePath, 'js', 'gameConfig.dat');
const iv = crypto.randomBytes(16);

let secretKey;
if (fs.existsSync(keyPath)) {
    secretKey = fs.readFileSync(keyPath, 'utf8');
} else {
    secretKey = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync(keyPath, secretKey, 'utf8');
}

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(text) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

(() => {

    const pluginParameters = PluginManager.parameters('DynamicSwitch');
    const initialLockedSwitches = JSON.parse(pluginParameters.lockSwitches || '[]').map(Number);
    const initActiveSwitches = JSON.parse(pluginParameters.initActiveSwitches || '[]').map(Number);
    const dynamicSwitchMethod = pluginParameters.dynamicSwitchMethod || 'Global';

    let isNewGame = false;
    let individualDynamicSwitches = [];
    let currentCachedTime = new Date().getTime();
    let lastTimeUpdate = new Date().getTime();


    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _DataManager_setupNewGame.call(this);
        isNewGame = true;
        if (dynamicSwitchMethod === 'Individual') {
            individualDynamicSwitches = {};
        }
    };

    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        if (dynamicSwitchMethod === 'Individual') {
            $gameSystem.individualDynamicSwitches = individualDynamicSwitches;
        }
    };

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        _Game_Map_setup.call(this, mapId);
        if (isNewGame) {
            this.initializeSwitches();
            isNewGame = false;
        }
    };

    Game_Map.prototype.initializeSwitches = function () {

        if (dynamicSwitchMethod === 'Global') {
            $gameSwitches._allowingSet = true;
            initActiveSwitches.forEach(switchId => {
                $gameSwitches.setValue(switchId, true);
            });
            $gameSwitches._allowingSet = false;
        } else if (dynamicSwitchMethod === 'Individual') {
            $gameSystem.individualDynamicSwitches = individualDynamicSwitches;
            $gameSwitches._allowingSet = true;
            initActiveSwitches.forEach(switchId => {
                $gameSwitches.setValue(switchId, true);
            });
            $gameSwitches._allowingSet = false;
        }
    };

    class DynamicSwitch {
        constructor(switchId, activationTime, onlineObtained) {
            this.switchId = switchId;
            this.activationTime = activationTime;
            this.onlineObtained = onlineObtained;
        }
    }

    let dynamicSwitches = [];
    try {
        if (fs.existsSync(filePath)) {
            const savedData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const iv = Buffer.from(savedData.iv, 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
            let decrypted = decipher.update(savedData.data, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            try {
                dynamicSwitches = JSON.parse(decrypted);
                if (!Array.isArray(dynamicSwitches)) {
                    dynamicSwitches = [];
                }
            } catch (error) {
                dynamicSwitches = [];
            }
        }
    } catch (error) {
        dynamicSwitches = [];
    }

    const _Game_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function (switchId, value) {
        if (Array.isArray(dynamicSwitches)) {
            if (!this._allowingSet && (initialLockedSwitches.includes(switchId) || dynamicSwitches.some(ds => ds.switchId === switchId))) return;
        } else {
        }
        _Game_Switches_setValue.call(this, switchId, value);
    };

    PluginManager.registerCommand('DynamicSwitch', 'setDynamicSwitch', async args => {
        //  console.log("Setting dynamic switch with args:", args);
        let onlineObtained = false;
        let currentTime;
        try {
            // console.log("Attempting to get current time online");
            currentTime = await getCurrentTime(true);
            onlineObtained = true;
            //  console.log("Online time obtained: ", currentTime);
        } catch (error) {
            //   console.log("Falling back to local time due to error.");
            onlineObtained = false;
            currentTime = new Date().getTime();
        }

        try {
            const switchId = Number(args.switchId);
            let existingSwitch;
            if (dynamicSwitchMethod === 'Global') {
                existingSwitch = dynamicSwitches.find(ds => ds.switchId === switchId);
            } else if (dynamicSwitchMethod === 'Individual') {
                existingSwitch = $gameSystem.individualDynamicSwitches[switchId];
            }

            if (existingSwitch) return;

            const unit = args.unit;
            const amount = Number(args.amount);
            let multiplier;
            switch (unit) {
                case 'Seconds': multiplier = 1000; break;
                case 'Minutes': multiplier = 1000 * 60; break;
                case 'Hours': multiplier = 1000 * 60 * 60; break;
                case 'Days': multiplier = 1000 * 60 * 60 * 24; break;
                default: throw new Error('Invalid time unit');
            }

            const activationTime = currentTime + (amount * multiplier);
            $gameSwitches._allowingSet = true;
            $gameSwitches.setValue(switchId, false);
            $gameSwitches._allowingSet = false;
            const newDynamicSwitch = new DynamicSwitch(switchId, activationTime, onlineObtained);

            if (dynamicSwitchMethod === 'Global') {
                dynamicSwitches.push(newDynamicSwitch);
            } else if (dynamicSwitchMethod === 'Individual') {
                if (!$gameSystem.individualDynamicSwitches) $gameSystem.individualDynamicSwitches = {};
                $gameSystem.individualDynamicSwitches[switchId] = newDynamicSwitch;
            }

            saveDynamicSwitches();

        } catch (error) {
        }
    });

    Scene_Map.prototype.removeProgressBar = function (switchId) {
        this._progressBars = this._progressBars.filter(bar => {
            if (bar.switchId === switchId) {
                this.removeChild(bar);
                return false;
            }
            return true;
        });
    };

    PluginManager.registerCommand('DynamicSwitch', 'unsetDynamicSwitch', args => {
        const switchId = Number(args.switchId);
        const endAction = args.endAction;

        if (dynamicSwitchMethod === 'Global') {
            dynamicSwitches = dynamicSwitches.filter(ds => {
                if (ds.switchId === switchId) {
                    switch (endAction) {
                        case 'TurnOn':
                            $gameSwitches._allowingSet = true;
                            $gameSwitches.setValue(switchId, true);
                            break;
                        case 'TurnOff':
                            $gameSwitches._allowingSet = true;
                            $gameSwitches.setValue(switchId, false);
                            break;
                        case 'DoNothing':
                            break;
                    }
                    $gameSwitches._allowingSet = false;
                    return false;
                }
                return true;
            });
        } else if (dynamicSwitchMethod === 'Individual') {
            if ($gameSystem.individualDynamicSwitches[switchId]) {
                switch (endAction) {
                    case 'TurnOn':
                        $gameSwitches._allowingSet = true;
                        $gameSwitches.setValue(switchId, true);
                        break;
                    case 'TurnOff':
                        $gameSwitches._allowingSet = true;
                        $gameSwitches.setValue(switchId, false);
                        break;
                    case 'DoNothing':
                        break;
                }
                $gameSwitches._allowingSet = false;
                delete $gameSystem.individualDynamicSwitches[switchId];
            }
        }

        const scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
            scene.removeProgressBar(switchId);
        }
    });

    PluginManager.registerCommand('DynamicSwitch', 'resetAllDynamicSwitches', args => {
        if (dynamicSwitchMethod === 'Global') {
            dynamicSwitches.forEach(ds => {
                $gameSwitches._allowingSet = true;
                $gameSwitches.setValue(ds.switchId, true);
                $gameSwitches._allowingSet = false;
            });
            dynamicSwitches = [];
            localStorage.setItem('dynamicSwitches', JSON.stringify(dynamicSwitches));
        } else if (dynamicSwitchMethod === 'Individual') {
            for (const switchId in $gameSystem.individualDynamicSwitches) {
                $gameSwitches._allowingSet = true;
                $gameSwitches.setValue(Number(switchId), true);
                $gameSwitches._allowingSet = false;
            }
            $gameSystem.individualDynamicSwitches = {};
        }
    });

    async function getCurrentTime(forceUpdate = false) {
        if (!forceUpdate && currentCachedTime && (new Date().getTime() - lastTimeUpdate < 300000)) {
            return currentCachedTime;
        }

        // console.log("Fetching current time from worldtimeapi.org");
        return fetch('http://worldtimeapi.org/api/timezone/Etc/UTC')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                //    console.log("Current time data: ", data);
                currentCachedTime = new Date(data.datetime).getTime();
                lastTimeUpdate = new Date().getTime();
                return currentCachedTime;
            })
            .catch(error => {
                //   console.error("Error fetching current time, falling back to local time: ", error);
                currentCachedTime = new Date().getTime();
                lastTimeUpdate = new Date().getTime();
                return currentCachedTime;
            });
    }


    async function checkOnlineStatus(variableId) {
        let attempt = 0;
        const maxAttempts = 2; // Intenta hasta 2 veces (6 segundos en total con reintentos cada 3000ms)

        function attemptConnection(resolve, reject) {
            fetch('http://worldtimeapi.org/api/timezone/Etc/UTC', { method: 'HEAD' })
                .then(response => {
                    if (response.ok) resolve(1); // Conexión exitosa
                    else reject(); // La respuesta no fue ok, intenta nuevamente
                })
                .catch(error => {
                    if (attempt < maxAttempts) {
                        attempt++;
                        setTimeout(() => attemptConnection(resolve, reject), 3000); // Reintento después de 3000ms
                    } else {
                        reject(); // Se superaron los intentos sin éxito
                    }
                });
        }

        return new Promise(attemptConnection);
    }


    PluginManager.registerCommand('DynamicSwitch', 'checkOnlineStatus', async args => {
        const variableId = Number(args.variableId); // Asigna el ID de la variable donde se guardará el resultado

        try {
            const status = await checkOnlineStatus(variableId);
            $gameVariables.setValue(variableId, status); // Conexión exitosa, guarda 1 en la variable
        } catch (error) {
            $gameVariables.setValue(variableId, 404); // Falló la conexión, guarda 404 en la variable
        }
    });


    function saveDynamicSwitches() {
        try {
            // console.log("Saving dynamic switches");

            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);

            let switchesToSave;
            if (dynamicSwitchMethod === 'Global') {
                switchesToSave = dynamicSwitches;
            } else if (dynamicSwitchMethod === 'Individual') {
                switchesToSave = $gameSystem.individualDynamicSwitches || {};
            }

            let encrypted = cipher.update(JSON.stringify(switchesToSave), 'utf8', 'hex');
            encrypted += cipher.final('hex');
            const dataToSave = JSON.stringify({ iv: iv.toString('hex'), data: encrypted });
            fs.writeFileSync(filePath, dataToSave, 'utf8');
        } catch (error) {
            //  console.error('Error saving dynamic switches:', error);
        }
    }

    const _Original_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = async function () {
        _Original_Scene_Map_update.call(this);
        // console.log("Updating dynamic switches based on current time");
        const currentTime = await getCurrentTime();

        let switchesToCheck;
        if (dynamicSwitchMethod === 'Global') {
            if (!Array.isArray(dynamicSwitches)) {
                throw new Error('Parameter Change Detected:\n\n' +
                    'The game has already been configured with Individual parameters.\n' +
                    'Changing to Global is not allowed.\n' +
                    'If you want to change this, you will need to delete the "gameConfig.dat" and "gameData.dat" files to reset the configuration.\n' +
                    'All timers have been stopped and reset for security reasons');
            }
            switchesToCheck = dynamicSwitches;
        } else if (dynamicSwitchMethod === 'Individual') {
            switchesToCheck = Object.values($gameSystem.individualDynamicSwitches || {});
        }

        switchesToCheck.forEach(ds => {
            if (ds.activationTime <= currentTime) {
                $gameSwitches._allowingSet = true;
                $gameSwitches.setValue(ds.switchId, true);
                $gameSwitches._allowingSet = false;
            }
        });

        switchesToCheck = switchesToCheck.filter(ds => ds.activationTime > currentTime);

        if (dynamicSwitchMethod === 'Global') {
            dynamicSwitches = switchesToCheck;
        } else if (dynamicSwitchMethod === 'Individual') {
            $gameSystem.individualDynamicSwitches = Object.fromEntries(switchesToCheck.map(ds => [ds.switchId, ds]));
        }

        saveDynamicSwitches();

        if (this._progressBars) {
            this._progressBars.forEach(bar => {
                bar.update();
                const event = $gameMap.event(bar.eventId);
                if (event) {
                    const screenX = event.screenX() + bar._settings.offsetX;
                    bar.x = screenX - (bar._maxWidth / 2);
                    bar.y = (event.screenY() + bar._settings.offsetY - bar._height) - 10;
                }
                if (bar._remainingTime <= 0) {
                    this.removeChild(bar);
                    this._progressBars = this._progressBars.filter(otherBar => otherBar !== bar);
                }
            });
        }
    };

    class ProgressBar extends Sprite {
        constructor(switchId, settings) {
            super();
            this.switchId = switchId;
            this.eventId = settings.eventId;
            this._settings = settings;
            this._maxWidth = settings.width || 100;
            this._height = settings.height || 10;
            this._backgroundColor = settings.backgroundColor || 'gray';
            this._barColor = settings.barColor || 'green';
            this._showTime = settings.showTime || false;
            this._timeFontSize = settings.timeFontSize || 18;
            this._timeFontColor = settings.timeFontColor || '#FFFFFF';
            this.barBitmap = new Bitmap(this._maxWidth, this._height);
            this.timeBitmap = new Bitmap(this._maxWidth, 20);
            this.addChild(new Sprite(this.barBitmap));
            const timeSprite = new Sprite(this.timeBitmap);
            timeSprite.y = -25;
            this.addChild(timeSprite);
            this._initializeTime();
        }


        _initializeTime() {
            let dynamicSwitch;
            if (dynamicSwitchMethod === 'Global') {
                dynamicSwitch = dynamicSwitches.find(ds => ds.switchId === this.switchId);
            } else if (dynamicSwitchMethod === 'Individual') {
                dynamicSwitch = $gameSystem.individualDynamicSwitches[this.switchId];
            }
            if (dynamicSwitch) {
                this.activationTime = dynamicSwitch.activationTime;
                this.startTime = dynamicSwitch.startTime;
                if (!this.startTime) {
                    this.startTime = new Date().getTime();
                    dynamicSwitch.startTime = this.startTime;
                }
                this._totalTime = this.activationTime - this.startTime;
                this._remainingTime = this.activationTime - new Date().getTime();
            } else {
                this.visible = false;
            }
        };

        updateSettings(settings) {
            this._maxWidth = settings.width || 100;
            this._height = settings.height || 10;
            this._backgroundColor = settings.backgroundColor || 'gray';
            this._barColor = settings.barColor || 'green';
            this._showTime = settings.showTime || false;
            this._initializeTime();
        }

        update() {
            super.update();
            if (!this.visible) return;

            const currentTime = new Date().getTime();
            this._remainingTime = this.activationTime - currentTime;

            if (this._remainingTime <= 0) {
                if (this.parent) this.parent.removeChild(this);
                return;
            }

            this._drawProgressBar();
            if (this._showTime) {
                this._drawRemainingTime();
            }
        }

        _drawProgressBar() {
            const percentage = this._remainingTime / this._totalTime;
            const width = this._maxWidth * percentage;
            this.barBitmap.clear();
            this.barBitmap.fillRect(0, 0, this._maxWidth, this._height, this._backgroundColor);
            this.barBitmap.fillRect(0, 0, width, this._height, this._barColor);
        }

        _drawRemainingTime() {
            const fontSize = this._timeFontSize;
            const fontColor = this._timeFontColor;
            let delta = this._remainingTime;
            delta = delta < 0 ? 0 : delta;
            const hours = Math.floor(delta / (1000 * 60 * 60));
            delta -= hours * (1000 * 60 * 60);
            const minutes = Math.floor(delta / (1000 * 60));
            delta -= minutes * (1000 * 60);
            const seconds = Math.floor(delta / 1000);
            const timeText = `${hours > 0 ? hours + ":" : ""}${minutes > 0 ? String(minutes).padStart(2, '0') + ":" : "00:"}${String(seconds).padStart(2, '0')}`;
            const textWidth = this._maxWidth;
            const textHeight = fontSize + 4;
            const remainingTimeMs = this.activationTime - new Date().getTime();
            this._remainingTime = Math.max(0, remainingTimeMs);

            if (this.timeBitmap.width < textWidth || this.timeBitmap.height < textHeight) {
                this.timeBitmap.resize(textWidth, textHeight);
            }

            this.timeBitmap.clear();
            this.timeBitmap.fontSize = fontSize;
            this.timeBitmap.textColor = fontColor;
            this.timeBitmap.drawText(timeText, 0, 0, textWidth, textHeight, 'center');
        }
    }

    let progressBarInfo = [];

    PluginManager.registerCommand('DynamicSwitch', 'showProgressBarInEvent', args => {
        const eventId = Number(args.eventId) === 0 ? $gameMap._interpreter.eventId() : Number(args.eventId);
        const switchId = Number(args.switchId);
        let dynamicSwitch;
        if (dynamicSwitchMethod === 'Global') {
            dynamicSwitch = dynamicSwitches.find(ds => ds.switchId === switchId);
        } else if (dynamicSwitchMethod === 'Individual') {
            dynamicSwitch = $gameSystem.individualDynamicSwitches[switchId];
        }

        if (!dynamicSwitch) return;

        const currentTime = new Date().getTime();
        let delta = dynamicSwitch.activationTime - currentTime;
        delta = delta < 0 ? 0 : delta;
        if (delta === 0) return;

        const progressBarData = {
            eventId,
            switchId,
            maxTime: delta,
            startTime: new Date().getTime(),
            totalTime: delta,
            backgroundColor: args.backgroundColor || 'gray',
            barColor: args.barColor || 'green',
            width: Number(args.width) || 100,
            height: Number(args.height) || 10,
            offsetX: Number(args.offsetX) || 0,
            offsetY: Number(args.offsetY) || -40,
            showTime: args.showTime === 'true',
            timeFontSize: Number(args.timeFontSize) || 18,
            timeFontColor: args.timeFontColor || '#FFFFFF'
        };

        let existingInfoIndex = progressBarInfo.findIndex(info => info.switchId === switchId);
        if (existingInfoIndex !== -1) {
            progressBarInfo[existingInfoIndex] = progressBarData;
        } else {
            progressBarInfo.push(progressBarData);
        }

        const scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
            scene._createProgressBar();
        }
    });

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function () {
        _Scene_Map_createDisplayObjects.call(this);
        this._createProgressBar();
    };

    Scene_Map.prototype._createProgressBar = function () {
        this._progressBars = this._progressBars || [];
        this._progressBars.forEach(bar => {
            if (this._progressBars.includes(bar)) {
                this.removeChild(bar);
            }
        });
        this._progressBars = [];

        progressBarInfo.forEach(info => {
            let newBar = new ProgressBar(info.switchId, info);
            this._progressBars.push(newBar);
            this.addChild(newBar);
        });
    };


    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = _DataManager_makeSaveContents.call(this);
        contents.progressBarInfo = progressBarInfo;
        return contents;
    };


    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        progressBarInfo = contents.progressBarInfo || [];
        requestAnimationFrame(() => {
            const scene = SceneManager._scene;

            if (scene instanceof Scene_Map) {
                scene._createProgressBar();
            }
        });
    };

    class Window_SwitchStatus extends Window_Selectable {
        constructor(rect) {
            super(rect);
            this.refresh();
            this._lastUpdate = 0;
        }
        maxItems() {
            return this.dynamicSwitches.length;
        }
        drawItem(index) {
            const switchInfo = this.dynamicSwitches[index];
            if (!switchInfo) return;
            const rect = this.itemLineRect(index);
            this.contents.fontSize = 18;
            const onlineObtained = switchInfo.onlineObtained ? 'True' : 'False';
            const remainingTime = this.calculateRemainingTime(switchInfo.activationTime);
            const idText = `ID: ${switchInfo.switchId}`;
            const onlineText = `Online: ${onlineObtained}`;
            this.drawText(idText, rect.x, rect.y, 120, 'left');
            this.drawText(onlineText, rect.x + 130, rect.y, 150, 'left');
            this.drawText(remainingTime, rect.x + 290, rect.y, rect.width - 290, 'left');
        }
        calculateRemainingTime(activationTime) {
            //  console.log("Calculating remaining time for activationTime:", activationTime);
            const currentTime = new Date().getTime();
            let delta = activationTime - currentTime;
            //  console.log("Delta time (ms):", delta);
            delta = delta < 0 ? 0 : delta;
            const days = Math.floor(delta / (1000 * 60 * 60 * 24));
            delta -= days * (1000 * 60 * 60 * 24);
            const hours = Math.floor(delta / (1000 * 60 * 60));
            delta -= hours * (1000 * 60 * 60);
            const minutes = Math.floor(delta / (1000 * 60));
            delta -= minutes * (1000 * 60);
            const seconds = Math.floor(delta / 1000);
            return `${days > 0 ? days + " days, " : ""}${hours > 0 ? hours + " hours, " : ""}${minutes > 0 ? minutes + " minutes, " : ""}${seconds} seconds`;
        }
        refresh() {
            this.dynamicSwitches = dynamicSwitchMethod === 'Global' ? dynamicSwitches : Object.values($gameSystem.individualDynamicSwitches || {});
            super.refresh();
        }
        update() {
            super.update();
            if (Date.now() - this._lastUpdate >= 1000) {
                this._lastUpdate = Date.now();
                this.refresh();
            }
        }
    }

    class Scene_SwitchStatus extends Scene_MenuBase {
        async create() {
            super.create();
            await getCurrentTime(true);
            const screenWidth = Graphics.boxWidth;
            const screenHeight = Graphics.boxHeight;
            const rect = new Rectangle(0, 0, screenWidth, screenHeight);
            this._statusWindow = new Window_SwitchStatus(rect);
            this.addWindow(this._statusWindow);
            this._statusWindow.refresh();
        }

        update() {
            super.update();
            if (Input.isTriggered('cancel')) {
                this.popScene();
            }
        }
    }

    PluginManager.registerCommand('DynamicSwitch', 'showSwitchStatus', args => {
        SceneManager.push(Scene_SwitchStatus);
    });

    PluginManager.registerCommand('DynamicSwitch', 'checkSwitchOnline', args => {
        const switchId = Number(args.switchId);
        const variableId = Number(args.variableId);

        let dynamicSwitch;
        if (dynamicSwitchMethod === 'Global') {
            dynamicSwitch = dynamicSwitches.find(ds => ds.switchId === switchId);
        } else if (dynamicSwitchMethod === 'Individual') {
            dynamicSwitch = $gameSystem.individualDynamicSwitches[switchId];
        }

        if (dynamicSwitch) {
            $gameVariables.setValue(variableId, dynamicSwitch.onlineObtained ? true : false);
        } else {
            $gameVariables.setValue(variableId, false);
        }
    });

    let progressBarVisibility = true;
    PluginManager.registerCommand('DynamicSwitch', 'setProgressBarVisibility', args => {
        progressBarVisibility = args.visibility === 'true';
        localStorage.setItem('progressBarVisibility', progressBarVisibility.toString());

        const scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._progressBars) {
            scene._progressBars.forEach(bar => {
                bar.visible = progressBarVisibility;
            });
        }
    });

    window.addEventListener('load', () => {
        const storedVisibility = localStorage.getItem('progressBarVisibility');
        if (storedVisibility !== null) {
            progressBarVisibility = storedVisibility === 'true';
        }
    });

    PluginManager.registerCommand('DynamicSwitch', 'getTimeRemainingForSwitch', args => {
        const switchId = Number(args.switchId);
        const variableId = Number(args.variableId);
        const format = args.format || 'text';

        let dynamicSwitch;
        if (dynamicSwitchMethod === 'Global') {
            dynamicSwitch = dynamicSwitches.find(ds => ds.switchId === switchId);
        } else if (dynamicSwitchMethod === 'Individual') {
            dynamicSwitch = $gameSystem.individualDynamicSwitches[switchId];
        }

        let timeRemaining = "0 seconds";
        let timeInSeconds = 0;
        if (dynamicSwitch) {
            const currentTime = new Date().getTime();
            let delta = dynamicSwitch.activationTime - currentTime;
            delta = delta < 0 ? 0 : delta;

            timeInSeconds = Math.floor(delta / 1000);

            if (format === 'text') {
                const days = Math.floor(delta / (1000 * 60 * 60 * 24));
                delta -= days * (1000 * 60 * 60 * 24);
                const hours = Math.floor(delta / (1000 * 60 * 60));
                delta -= hours * (1000 * 60 * 60);
                const minutes = Math.floor(delta / (1000 * 60));
                delta -= minutes * (1000 * 60);
                const seconds = Math.floor(delta / 1000);
                const parts = [];
                if (days > 0) parts.push(`${days} days`);
                if (hours > 0) parts.push(`${hours} hours`);
                if (minutes > 0) parts.push(`${minutes} minutes`);
                if (seconds > 0 || parts.length === 0) parts.push(`${seconds} seconds`);
                timeRemaining = parts.join(', ');
                $gameVariables.setValue(variableId, timeRemaining);
            } else if (format === 'numeric') {
                $gameVariables.setValue(variableId, timeInSeconds);
            }
        } else {
            if (format === 'text') {
                $gameVariables.setValue(variableId, "0 seconds");
            } else if (format === 'numeric') {
                $gameVariables.setValue(variableId, 0);
            }
        }
    });

})();