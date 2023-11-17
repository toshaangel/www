//=============================================================================
// MyDynamicSwitchControl.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Плагин позволяет игре устанавливать динамические переключатели,
 * которые можно активировать через определенное количество времени (реальное время),
 * даже когда игра не запущена. Это можно использовать, например, для создания
 * событий или мини-игр, которые можно играть или выполнять только один раз в день.
 * @author ToshaAngel
 *
 * @param lockSwitches
 * @text Заблокированные переключатели
 * @type switch[]
 * @desc Здесь определите переключатели, которые нельзя изменять в игре.
 *
 * @param initActiveSwitches
 * @text Инициализация активных переключателей
 * @type switch[]
 * @desc Выберите переключатели для их инициализации при запуске игры.
 *
 * @command setDynamicSwitch
 * @text Установить динамический переключатель
 * @desc Устанавливает динамический переключатель, который деактивируется после заданного
 * количества времени.
 *
 * @arg switchId
 * @text ID переключателя
 * @type number
 * @desc ID переключателя, который должен быть деактивирован.
 *
 * @arg unit
 * @text Единица времени
 * @type select
 * @option Секунды
 * @option Минуты
 * @option Часы
 * @option Дни
 * @desc Единица времени, которую нужно подождать, прежде чем переключатель будет активирован.
 *
 * @arg amount
 * @text Количество
 * @type number
 * @desc Количество времени, которое нужно подождать, прежде чем переключатель будет активирован.
 *
 * @command unsetDynamicSwitch
 * @text Отменить динамический переключатель
 * @desc Отменяет динамический переключатель, удаляя его из списка активированных переключателей.
 *
 * @arg switchId
 * @text ID переключателя
 * @type number
 * @desc ID переключателя, который должен быть деактивирован.
 * 
 * @command showSwitchStatus
 * @text Показать состояние переключателей
 * @desc Открывает экран со статусом всех ожидающих переключателей.
 *
 * @command resetAllDynamicSwitches
 * @text Сбросить все динамические переключатели
 * @desc Сбрасывает все динамические переключатели в true, сохраняя логику блокировки из настроек плагина.
 */

(function () {
    const localStorageKey = 'dynamicSwitches';
    
    const pluginParams = PluginManager.parameters('MyDynamicSwitchControl');
    const lockedSwitches = JSON.parse(pluginParams.lockSwitches || '[]').map(Number);
    const initActiveSwitches = JSON.parse(pluginParams.initActiveSwitches || '[]').map(Number);
    let gameDataInitialized = false;

    const originalDataManagerSetup = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        originalDataManagerSetup.call(this);
        gameDataInitialized = true;
    };

    const originalGameMapUpdate = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        originalGameMapUpdate.call(this, sceneActive);
        if (!gameDataInitialized) {
            this.initializeSwitches();
            gameDataInitialized = false;
        }
    };

    Game_Map.prototype.initializeSwitches = function () {
        $gameSwitches._allowingSet = true;
        initActiveSwitches.forEach(function (switchId) {
            $gameSwitches.setValue(switchId, true);
        });
        $gameSwitches._allowingSet = false;
    };

    class DynamicSwitch {
        constructor(switchId, activationTime, onlineObtained) {
            this.switchId = switchId;
            this.activationTime = activationTime;
            this.onlineObtained = onlineObtained;
        }
    }

    let dynamicSwitches = loadDynamicSwitches();

    function loadDynamicSwitches() {
        const data = localStorage.getItem(localStorageKey);
        return data ? JSON.parse(data) : [];
    }

    function saveDynamicSwitches(data) {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
    }

    const originalGameSwitchesSet = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function (switchId, value) {
        if (!this._allowingSet && (lockedSwitches.includes(switchId) || dynamicSwitches.some((dynamicSwitch) => dynamicSwitch.switchId === switchId))) {
            return;
        }
        originalGameSwitchesSet.call(this, switchId, value);
    };

    Game_Switches.prototype.processDynamicSwitches = function () {
        for (let i = dynamicSwitches.length - 1; i >= 0; i--) {
            const dynamicSwitch = dynamicSwitches[i];
            if (dynamicSwitch.activationTime <= Date.now()) {
                $gameSwitches.setValue(dynamicSwitch.switchId, true);
                dynamicSwitches.splice(i, 1);
            }
        }
        saveDynamicSwitches(dynamicSwitches);
    };

    const originalGameInterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        originalGameInterpreterPluginCommand.call(this, command, args);
        if (command === 'setDynamicSwitch') {
            const switchId = parseInt(args[0]);
            const unit = args[1];
            const amount = parseInt(args[2]);
            const now = Date.now();
            let activationTime = now;

            if (unit === 'Секунды') {
                activationTime += amount * 1000;
            } else if (unit === 'Минуты') {
                activationTime += amount * 60 * 1000;
            } else if (unit === 'Часы') {
                activationTime += amount * 60 * 60 * 1000;
            } else if (unit === 'Дни') {
                activationTime += amount * 24 * 60 * 60 * 1000;
            }

            dynamicSwitches.push(new DynamicSwitch(switchId, activationTime, false));
            $gameSwitches._allowingSet = true;
            $gameSwitches.setValue(switchId, false);
            $gameSwitches._allowingSet = false;
            saveDynamicSwitches(dynamicSwitches);
        } else if (command === 'unsetDynamicSwitch') {
            const switchId = parseInt(args[0]);
            const switchIndex = dynamicSwitches.findIndex((dynamicSwitch) => dynamicSwitch.switchId === switchId);
            if (switchIndex !== -1) {
                dynamicSwitches.splice(switchIndex, 1);
                saveDynamicSwitches(dynamicSwitches);
            }
        } else if (command === 'showSwitchStatus') {
            SceneManager.push(Scene_SwitchStatus);
        } else if (command === 'resetAllDynamicSwitches') {
            dynamicSwitches = dynamicSwitches.filter((dynamicSwitch) => lockedSwitches.includes(dynamicSwitch.switchId));
            saveDynamicSwitches(dynamicSwitches);
        }
    };

    const originalSceneMapUpdate = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        $gameSwitches.processDynamicSwitches();
        originalSceneMapUpdate.call(this);
    };

    class Scene_SwitchStatus extends Scene_MenuBase {
        create() {
            super.create();
            this.createHelpWindow();
            this.createSwitchWindow();
        }

        start() {
            super.start();
            this._switchWindow.refresh();
            this._switchWindow.select(0);
        }

        createHelpWindow() {
            this._helpWindow = new Window_Help();
            this.addWindow(this._helpWindow);
        }

        createSwitchWindow() {
            const rect = this.switchWindowRect();
            this._switchWindow = new Window_SwitchStatus(rect);
            this._switchWindow.setHandler('ok', this.onSwitchOk.bind(this));
            this._switchWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._switchWindow);
        }

        switchWindowRect() {
            const wx = 0;
            const wy = this._helpWindow.height;
            const ww = Graphics.boxWidth;
            const wh = Graphics.boxHeight - wy;
            return new Rectangle(wx, wy, ww, wh);
        }

        onSwitchOk() {
            this.executeSwitchOk();
        }

        executeSwitchOk() {
            const dynamicSwitch = this._switchWindow.currentDynamicSwitch();
            if (dynamicSwitch) {
                const switchId = dynamicSwitch.switchId;
                $gameSwitches._allowingSet = true;
                $gameSwitches.setValue(switchId, true);
                $gameSwitches._allowingSet = false;
                dynamicSwitches = dynamicSwitches.filter((ds) => ds !== dynamicSwitch);
                saveDynamicSwitches(dynamicSwitches);
                this._switchWindow.refresh();
                this._switchWindow.activate();
            }
        }
    }

    class Window_SwitchStatus extends Window_Selectable {
        constructor(rect) {
            super(rect);
        }

        initialize(rect) {
            super.initialize(rect);
            this._dynamicSwitches = [];
            this._dynamicSwitches.push(...dynamicSwitches);
            this.refresh();
        }

        maxItems() {
            return this._dynamicSwitches.length;
        }

        currentDynamicSwitch() {
            return this._dynamicSwitches[this.index()];
        }

        refresh() {
            this.createContents();
            this.drawAllItems();
        }

        drawAllItems() {
            for (const dynamicSwitch of this._dynamicSwitches) {
                const switchName = $dataSystem.switches[dynamicSwitch.switchId];
                if (switchName) {
                    const rect = this.itemRect(this._dynamicSwitches.indexOf(dynamicSwitch));
                    this.drawItemName(switchName, rect.x, rect.y, rect.width);
                }
            }
        }
    }

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        $gameSwitches.processDynamicSwitches();
    };
})();
