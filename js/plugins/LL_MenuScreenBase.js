//=============================================================================
// RPGMakerMZ - LL_MenuScreenBase.js v1.0.2
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
// Блог Переводчика
// https://vk.com/club178485439
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Общий базовый плагин для настройки положения изображений меню.
 * @author Lulu's Church, 
 * @url https://nine-yusha.com/plugin-menuscreen/
 *
 * @help LL_OriginalMenuScreen.js
 *
 * Это общий базовый плагин для настройки списка изображений.
 * Этот плагин определяет постоянный список для каждого персонажа.
 *
 * Вы можете задать несколько изображений, которые будут отображаться при 
 * определенном состоянии и включаться следующим образом.
 * Например:
 *   ・ когда переключатель 1 включен 
 *   ・ когда переключатель 1 включен + состояние.
 *   ・ состоянии яда (или другое)
 *   ・ Обычное состояние (минимум настроек)
 *
 * Интеграция плагина :
 *   LL_StandingPictureBattle можно связать со списком в бою。
 *
 * Команды плагинов отсутствуют.
 *
* Условия использования:
 * Уведомление об авторских правах не требуется.
 * Нет требований к отчетности за использование.
 * Нет никаких ограничений на использование сайта в коммерческих или 
 * некоммерческих целях.
 * Нет ограничений на использование игр R18.
 * Вы можете свободно изменять его в соответствии с вашей игрой.
 * Перераспространение в качестве подключаемого материала 
 * (в том числе после модификации) запрещено.
 *
 * Автор: Lulu's Church
 * Создано: 17/6/2021
 * Перевод: Kouta555
 * Блог Переводчика
 * https://vk.com/club178485439
 *
 * @param menuPictures
 * @text Список изображений
 * @desc изображение, которое будет отображаться на экране.
 * Вы можете задать несколько картинок для определенного состояния или переключателя.
 * @default []
 * @type struct<menuPictures>[]
 *
 * @param onSpbPlugin
 * @text Интергация в бою
 * @desc не используется
 *
 * @param onSpbPluginEnable
 * @text список изображений
 * @desc работает со списком LL_StandingPictureBattle
 * Если true, то настройки списка будут игнорироваться.
 * @default false
 * @type boolean
 * @parent onSpbPlugin
 */

/*~struct~menuPictures:
 *
 * @param actorId
 * @text ID Героя
 * @desc Идентификатор героя
 * @type actor
 *
 * @param stateId
 * @text ID Состояния
 * @desc изображение при состояния героя
 * Яд, конфуз, паралич и т.д.
 * @type state
 *
 * @param switchId
 * @text ID переключателя
 * @desc Изображение при ВКЛ переключателе
 * @type switch
 *
 * @param imageName
 * @text Имя файла изображения
 * @desc Выберите файл изображения для отображения
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param x
 * @text X-координаты
 * @desc положения по оси (X) 
 * + вправо, - влево (по умолчанию: 0)
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param y
 * @text Y-координаты
 * @desc положения по оси (Y) 
 * + вправо, - влево (по умолчанию: 0)
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleX
 * @text Увеличение по оси Х
 * @desc Размер изображения по оси Х
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Увеличение по оси Y
 * @desc азмер изображения по оси Y
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param pinchPercentage
 * @text Порог защемления
 * @desc Укажите порог защемления в HP%.
 * Для отключения, введите 0.
 * @default 25
 * @type number
 * @min 0
 * @max 100
 *
 * @param pinchImageName
 * @text Имя файла изображения
 * @desc файл изображения, который будет отображаться при нажатии.
 * @dir img/pictures
 * @type file
 * @require 1
 * @parent pinchPercentage
 */

(() => {
	"use strict";
	const pluginName = "LL_MenuScreenBase";

	const parameters = PluginManager.parameters(pluginName);
	const menuPictures = JSON.parse(parameters["menuPictures"] || "null");
	const onSpbPluginEnable = eval(parameters["onSpbPluginEnable"] || "true");
	let menuPictureLists = [];
	if (menuPictures) {
		menuPictures.forEach((elm) => {
			menuPictureLists.push(JSON.parse(elm || "null"));
		});
	}

	//-----------------------------------------------------------------------------
	// список изображений для плагина In-Battle
	// On LL_StandingPictureBattle Plugin
	//-----------------------------------------------------------------------------
	const spbPluginName = "LL_StandingPictureBattle";
	const spbParameters = PluginManager.parameters(spbPluginName);
	const spbCommandPictures = JSON.parse(spbParameters["sbCommandPictures"] || "null");
	let spbCommandPictureLists = [];
	if (spbCommandPictures) {
		spbCommandPictures.forEach((elm) => {
			spbCommandPictureLists.push(JSON.parse(elm || "null"));
		});
	}

	//-----------------------------------------------------------------------------
	// Ex Menu Screen Base Class
	//
	// Определяет дополнительный пользовательский класс для настройки изображения экрана меню.

	class ExMenuScreenBase {

		//-----------------------------------------------------------------------------
		// Получение имени файла изображения
		//
		// *Правила порядка поиска для файлов изображений (если дубликаты совпадают, вызывается самое верхнее стоящее изображение)
		// 1. соответствует как ID состояния, так и ID коммутатора
		// 2. соответствует только идентификатору государства
		// 3. совпадения только ID переключателя
		// 4. нормальное положение (ни ID состояния, ни ID переключателя не совпадают)
		//-----------------------------------------------------------------------------
		static getImageName (actorId) {
			// Получите список 
			const pictureLists = this.getPictureLists();
			// Получение информации о состоянии героев
			let actorStates = [];
			if (actorId) actorStates = $gameActors.actor(actorId)._states;
			let specificPicture = null;
			// проверка в состоянии?
			if (actorStates.length) {
				// Поиск постоянных списков с действительным ID и переключателем
				specificPicture = pictureLists.filter(function(item, index) {
					if (Number(item.actorId) == actorId && actorStates.indexOf(Number(item.stateId)) !== -1 && $gameSwitches.value(Number(item.switchId))) {
						return true;
					}
				});
				if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
				// ステートIDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item, index) {
					if (Number(item.actorId) == actorId && actorStates.indexOf(Number(item.stateId)) !== -1 && (Number(item.switchId) === 0 || !item.switchId)) {
						return true;
					}
				});
				if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
			}

			// スイッチIDが有効な立ち絵リストを検索
			specificPicture = pictureLists.filter(function(item, index) {
				if (Number(item.actorId) == actorId && (Number(item.stateId) === 0 || !item.stateId) && $gameSwitches.value(Number(item.switchId))) {
					return true;
				}
			});
			if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);

			// 上記で見つからなかった場合、通常の立ち絵を検索
			let normalPicture = pictureLists.filter(function(item, index) {
				if (Number(item.actorId) == actorId && (Number(item.stateId) === 0 || !item.stateId) && (Number(item.switchId) === 0 || !item.switchId)) return true;
			});
			if (normalPicture.length) return this.checkHpPercentage(actorId, normalPicture);
		}

		static checkHpPercentage (actorId, pictureLists) {
			// アクターの残HP％を取得
			let hpRate = this.getHpRate(actorId);
			// 最もHP%が低い立ち絵を適用する
			let minHpRate = 100;
			let result = null;
			pictureLists.forEach(function(item) {
				if (hpRate <= Number(item.hpPercentage) && minHpRate >= Number(item.hpPercentage)) {
					result = item;
					minHpRate = Number(item.hpPercentage);
				} else if (!item.hpPercentage && minHpRate >= 100) {
					// プラグインパラメータが更新されていない場合、便宜的に100として扱う
					result = item;
					minHpRate = Number(item.hpPercentage);
				}
			});
			return result;
		}

		static getPictureLists () {
			return onSpbPluginEnable ? spbCommandPictureLists : menuPictureLists;
		}

		static onSpbPluginEnable () {
			return onSpbPluginEnable;
		}

		// アクターのHPレートを取得
		static getHpRate (actorId) {
			if (!$gameActors.actor(actorId)) return 0;
			return $gameActors.actor(actorId).mhp > 0 ? $gameActors.actor(actorId).hp / $gameActors.actor(actorId).mhp * 100 : 0;
		}
	}

	window.ExMenuScreenBase = ExMenuScreenBase;
})();
