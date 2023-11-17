//=============================================================================
// RPGツクールMZ - LL_MenuScreenShop.js v1.0.2
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL ниже для получения подробной информации о лицензии.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Отображает на экране магазина изображение продавца.
 * @author Lulu's Church
 * @url https://nine-yusha.com/plugin-menuscreenshop/
 * @base LL_MenuScreenBase
 * @orderAfter LL_MenuScreenBase
 *
 * @help LL_MenuScreenShop.js
 *
 * При выборе экипировки на экране покупки в магазине.
 * Когда экипировка выбрана на экране покупки магазина, автоматически 
 * отображается стоящее изображение выбранного персонажа.
 * Вы можете настроить "LL_MenuScreenBaseMV" для установки списка 
 * отображаемых изображений.
 *
 * О позиции отображения стоящих изображений персонажей:
 * Изображения персонажей отображаются в координатах X и Y, уже 
 * установленных в LL_MenuScreenBaseMV.
 * (X и Y координаты картинки в бою, если она связана с картинкой в 
 * боевом плагине)
 * Позицию отображения можно настроить с помощью 
 * "X Координат" и "Y Координат" 
 * на правой стороне.
 *
* Об отображении стенда продавца:
 * В "Списке настроек продавца" можно настроить изображение и диалог 
 * продавца.
 * (Вы также можете установить только изображение на стенде, только 
 * диалог, только фоновое изображение и т.д.)
 * Сотрудников магазина можно менять для каждого магазина с помощью 
 * переменных, установленных в разделе "Переменные сотрудника магазина".
 *
 * Если вы расширили категории элементов с помощью других плагинов:
 * Возможно, вы получите конфликт, включив опцию "Показывать 
 * категории стандартной ширины".
 * В этом случае, пожалуйста, поместите "LL_MenuScreenShopMV" ниже 
 * других плагинов.
 *
 * Команды плагина отсутствуют.
 *
 * Условия использования:
 * Не требуется уведомление об авторских правах.
 * Нет необходимости сообщать о своем использовании.
 * Нет никаких ограничений на использование этого сайта для 
 * коммерческого или некоммерческого использования.
 * Нет ограничений на использование для произведений R18.
 * Нет никаких ограничений на использование этого материала в играх R18.
 *  Вы можете свободно модифицировать его под свою игру.
 * Перераспространение в качестве подключаемого материала 
 * (в том числе после модификации) запрещено.
 *
 * Автор: Lulu's Church
 * Перевод с японского: Kouta555
 * 作成日: 2021/7/20
 *
 * @param actorSettings
 * @text Настройка отображаемых изображений
 * @desc Нет настроек.
 *
 * @param shopWindowPictureX
 * @text X Координата
 * @desc Отображение персонажа (X) Значение положения. 
 * (По умолчанию: 0)
 * Используйте + для смещения вправо и - для смещения влево.
 * @default 0
 * @min -9999
 * @type number
 * @parent actorSettings
 *
 * @param shopWindowPictureY
 * @text Y Координата 
 * @desc  * @desc Отображение персонажа (Y)Значение положения.
 * (По умолчанию: 0) 
 * Используйте + для смещения вверх и - для смещения вниз.
 * @default 0
 * @min -9999
 * @type number
 * @parent actorSettings
 *
 * @param shopSettings
 * @text Отображение продавца
 * @desc Нет настроек
 *
 * @param shopLists
 * @text Список продавцов
 * @desc Перечень отображаемых магазинов
 * @default []
 * @type struct<shopLists>[]
 * @parent shopSettings
 *
 * @param shopNumberVariable
 * @text Переменная
 * @desc Переменная отвечающая за показ продавца
 * Переменная будет отображать нужного продавца из списка.
 * @type variable
 * @parent shopSettings
 *
 * @param itemCategoryWindowDefault
 * @text Отображение категорий вещей по умолчанию
 * @desc Эта настройка предназначена для конфликтов с другими плагинами.
 * (Обычно его можно не включать).
 * @default false
 * @type boolean
 */

/*~struct~shopLists:
 *
 * @param number
 * @text Значение переменной
 * @desc начение выбранной переменной для отображения из списка.
 * Создайте список с непересекающимися номерами.
 * @max 2000
 * @min 1
 * @type number
 *
 * @param staffImageName
 * @text Изображение проджавца
 * @desc Выберите изображения для продавца.
 * Нет настроек.
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param staffThanksImageName
 * @text Изображение продавца (После покупки)
 * @desc Выберите изображение кторое будет меняться после покупики.
 * Оставьте пустым, если не хотите, чтоб изображение менялось
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param x
 * @text X-Координата
 * @desc Место положение изображение по Оси Х.
 * @default 464
 * @min -9999
 * @type number
 *
 * @param y
 * @text Y-Координата
 * @desc Место положение изображение по Оси Y
 * @default 96
 * @min -9999
 * @type number
 *
 * @param commandMessage
 * @text Текст приветствия
 * @desc Отобраемый текст при открытия магазина
 * Нет настроек
 * @type multiline_string
 *
 * @param buyMessage
 * @text Текст покупки
 * @desc Текст отображаемый при открытии окна "Купить"  (Ширина 1/2)
 * Нет настроек.
 * @type multiline_string
 *
 * @param sellMessage
 * @text Текст продажи
 * @desc Текст отображаемый при открытии окна "Продать"  (Ширина 1/2)
 * Нет настроек.
 * @type multiline_string
 *
 * @param thanksMessage
 * @text Tекст сделки
 * @desc Текст отображаемый при совершении сделки (Ширина 1/2)
 * Нет настроек.
 * @type multiline_string
 *
 * @param backgroundImage
 * @text Задний фон
 * @desc Выберите отображаемый задний фон для магазина
 * @dir img/pictures
 * @type file
 * @require 1
 */

(() => {
	"use strict";
	const pluginName = "LL_MenuScreenShop";

	const parameters = PluginManager.parameters(pluginName);
	const shopWindowPictureX = Number(parameters["shopWindowPictureX"] || 0);
	const shopWindowPictureY = Number(parameters["shopWindowPictureY"] || 0);
	const shopNumberVariable = Number(parameters["shopNumberVariable"] || 0);
	const shopListArrays = JSON.parse(parameters["shopLists"] || "null");
	const itemCategoryWindowDefault = eval(parameters["itemCategoryWindowDefault"] || "false");
	let shopLists = [];
	if (shopListArrays) {
		shopListArrays.forEach((elm) => {
			shopLists.push(JSON.parse(elm));
		});
	}

	let shopSettings = null;
	let callUpdateMessageWithPicture = false;


	//-----------------------------------------------------------------------------
	// Scene_Shop
	//
	// The scene class of the shop screen.

	const _Scene_Shop_initialize = Scene_Shop.prototype.initialize;
	Scene_Shop.prototype.initialize = function() {
		_Scene_Shop_initialize.apply(this, arguments);

		// ショップ設定の読み込み
		this.loadShopExSettings();
	};

	Scene_Shop.prototype.loadShopExSettings = function() {
		shopSettings = shopLists.find(function(item) {
			if (Number(item.number) == $gameVariables.value(shopNumberVariable)) return true;
		});
		if (!shopSettings) {
			shopSettings = {
				backgroundImage: "",
				buyMessage: "",
				commandMessage: "",
				number: -1,
				sellMessage: "",
				staffImageName: "",
				staffThanksImageName: "",
				thanksMessage: "",
				x: 0,
				y: 0
			};
		}
	};

	const _Scene_Shop_update = Scene_Shop.prototype.update;
	Scene_Shop.prototype.update = function() {
		_Scene_Shop_update.apply(this, arguments);

		this.updateStandingPicture();
	};

	const _Scene_Shop_create = Scene_Shop.prototype.create;
	Scene_Shop.prototype.create = function() {
		_Scene_Shop_create.apply(this, arguments);

		this.createMessageWindow();
		this.createStandingPicture();
		this.reserveStandingPictures();
		this.refreshActor();
		this.updateMessageWithPicture();

		this._dummyWindow.opacity = 0;
		if (this._pageupButton && this._pagedownButton) {
			this._pageupButton.visible = false;
			this._pagedownButton.visible = false;
		}
	};

	Scene_Shop.prototype.createStandingPicture = function() {
		// 店員立ち絵
		this._staffPicture = new Sprite();
		this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
		this._staffPicture.x = Number(shopSettings.x);
		this._staffPicture.y = Number(shopSettings.y);
		this.addChildAt(this._staffPicture, this.children.indexOf(this._windowLayer));
		// 対象アクター立ち絵
		this._actorPicture = new Sprite();
		this._actorPicture.bitmap = ImageManager.loadPicture("");
		this._actorPicture.x = 0;
		this._actorPicture.y = 0;
		this.addChildAt(this._actorPicture, this.children.indexOf(this._windowLayer));
	};

	const _Scene_Shop_createBackground = Scene_Shop.prototype.createBackground;
	Scene_Shop.prototype.createBackground = function() {
		if (shopSettings.backgroundImage) {
			// 独自の背景画像を表示
			this._backgroundSprite = new Sprite();
			this._backgroundSprite.bitmap = ImageManager.loadPicture(String(shopSettings.backgroundImage));
			this.addChild(this._backgroundSprite);
			return;
		}
		_Scene_Shop_createBackground.apply(this, arguments);
	};

	Scene_Shop.prototype.dummyWindowRect = function() {
		const wx = 0;
		const wy = this._commandWindow.y + this._commandWindow.height;
		const ww = Graphics.boxWidth / 2;
		const wh = this.mainAreaHeight() - this._commandWindow.height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.statusWindowRect = function() {
		const ww = this.statusWidth();
		const wh = this.statusHeight();
		const wx = 0;
		const wy = this._dummyWindow.y + this.buyWindowRect().height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.buyWindowRect = function() {
		const wx = 0;
		const wy = this._dummyWindow.y;
		const ww = this._dummyWindow.width;
		const wh = this._dummyWindow.height - this.statusHeight();
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.createCategoryWindow = function() {
		const rect = this.categoryWindowRect();
		this._categoryWindow = new Window_ShopItemCategory(rect);
		this._categoryWindow.setHelpWindow(this._helpWindow);
		this._categoryWindow.hide();
		this._categoryWindow.deactivate();
		this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
		this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
		this.addWindow(this._categoryWindow);
	};

	const _Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
	Scene_Shop.prototype.categoryWindowRect = function() {
		if (itemCategoryWindowDefault) {
			return _Scene_Shop_categoryWindowRect.apply(this, arguments);
		}

		const wx = 0;
		const wy = this._dummyWindow.y;
		const ww = this._dummyWindow.width;
		const wh = this.calcWindowHeight(2, true);
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.sellWindowRect = function() {
		const wx = 0;
		const wy = this._categoryWindow.y + this._categoryWindow.height;
		const ww = this._dummyWindow.width;
		const wh =
			this.mainAreaHeight() -
			this._commandWindow.height -
			this._categoryWindow.height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.statusWidth = function() {
		return Graphics.boxWidth / 2;
	};

	Scene_Shop.prototype.statusHeight = function() {
		return 160;
	};

	const _Scene_Shop_activateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
	Scene_Shop.prototype.activateBuyWindow = function() {
		_Scene_Shop_activateBuyWindow.apply(this, arguments);

		this.updateMessageWithPicture();
	};

	const _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
	Scene_Shop.prototype.commandSell = function() {
		_Scene_Shop_commandSell.apply(this, arguments);

		this.updateMessageWithPicture();
	};

	const _Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
	Scene_Shop.prototype.onBuyOk = function() {
		_Scene_Shop_onBuyOk.apply(this, arguments);

		this._statusWindow.hide();
		this.updateMessageWithPicture("buy");
	};

	const _Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
	Scene_Shop.prototype.onBuyCancel = function() {
		_Scene_Shop_onBuyCancel.apply(this, arguments);

		this._messageWindow.show();
		this.updateMessageWithPicture();
	};

	const _Scene_Shop_onCategoryCancel = Scene_Shop.prototype.onCategoryCancel;
	Scene_Shop.prototype.onCategoryCancel = function() {
		_Scene_Shop_onCategoryCancel.apply(this, arguments);

		this.updateMessageWithPicture();
	};

	const _Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
	Scene_Shop.prototype.onSellOk = function() {
		_Scene_Shop_onSellOk.apply(this, arguments);

		this._statusWindow.hide();
		this.updateMessageWithPicture("sell");
	};

	const _Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
	Scene_Shop.prototype.onSellCancel = function() {
		_Scene_Shop_onSellCancel.apply(this, arguments);

		this.updateMessageWithPicture("sell");
	};

	const _Scene_Shop_onNumberOk = Scene_Shop.prototype.onNumberOk;
	Scene_Shop.prototype.onNumberOk = function() {
		_Scene_Shop_onNumberOk.apply(this, arguments);

		this.updateMessageWithPicture("thanks");
	};

	Scene_Shop.prototype.createBuyWindow = function() {
		const rect = this.buyWindowRect();
		this._buyWindow = new Window_ShopBuy(rect);
		this._buyWindow.setupGoods(this._goods);
		this._buyWindow.setHelpWindow(this._helpWindow);
		this._buyWindow.setStatusWindow(this._statusWindow);
		this._buyWindow.hide();
		this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
		this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
		this._buyWindow.setHandler("pagedown", this.nextActor.bind(this));
		this._buyWindow.setHandler("pageup", this.previousActor.bind(this));
		this.addWindow(this._buyWindow);
	};

	Scene_Shop.prototype.createMessageWindow = function() {
		const rect = this.messageWindowRect();
		this._messageWindow = new Window_ShopMessage(rect);
		this.addWindow(this._messageWindow);
	};

	Scene_Shop.prototype.messageWindowRect = function() {
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(4, false) + 8;
		const wx = 0;
		const wy = Graphics.boxHeight - wh - this._helpWindow.height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.needsPageButtons = function() {
		return true;
	};

	Scene_Shop.prototype.arePageButtonsEnabled = function() {
		return (this._buyWindow && this._buyWindow.active);
	};

	Scene_Shop.prototype.onActorChange = function() {
		Scene_MenuBase.prototype.onActorChange.call(this);
		this.refreshActor();
		this.activateBuyWindow();
	};

	Scene_Shop.prototype.refreshActor = function() {
		const actor = this.actor();
		this._statusWindow.setActor(actor);
	};

	Scene_Shop.prototype.updateStandingPicture = function() {
		if (callUpdateMessageWithPicture) {
			this.updateMessageWithPicture();
			callUpdateMessageWithPicture = false;
		}

		if (this._buyWindow && this._buyWindow.active) {
			const item = this._buyWindow.item();
			if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
				const actor = this.actor();
				const equipPicture = ExMenuScreenBase.getImageName(actor.actorId());
				if (equipPicture) {
					// ピンチ判定 (旧Ver.)
					if (ExMenuScreenBase.getHpRate(actor._actorId) > Number(equipPicture.pinchPercentage) || !equipPicture.pinchImageName) {
						// 通常
						this._actorPicture.bitmap = ImageManager.loadPicture(equipPicture.imageName);
					} else {
						// ピンチ
						this._actorPicture.bitmap = ImageManager.loadPicture(equipPicture.pinchImageName);
					}
					this._actorPicture.x = Number(equipPicture.x) + shopWindowPictureX;
					this._actorPicture.y = Number(equipPicture.y) + shopWindowPictureY;
					this._actorPicture.scale.x = Number(equipPicture.scaleX) / 100;
					this._actorPicture.scale.y = Number(equipPicture.scaleY) / 100;
					this._actorPicture.opacity = 255;
					this._staffPicture.opacity = 0;
					this._messageWindow.hide();
					return;
				}
			}
		}

		this._actorPicture.opacity = 0;
		this._staffPicture.opacity = 255;
		if (this._messageWindow._text) this._messageWindow.show();
	};

	Scene_Shop.prototype.updateMessageWithPicture = function(messageType) {
		if (!messageType) {
			if (this._commandWindow && this._commandWindow.active) {
				messageType = "command";
			}
			if (this._buyWindow && this._buyWindow.active) {
				messageType = "buy";
			}
			if (this._categoryWindow && this._categoryWindow.active) {
				messageType = "sell";
			}
			if (this._sellWindow && this._sellWindow.active) {
				messageType = "sell";
			}
		}

		switch (messageType) {
			case "command":
				this._messageWindow.setText(String(shopSettings.commandMessage));
				this._messageWindow.width = Graphics.boxWidth;
				this._messageWindow.height = this.calcWindowHeight(4, false) + 8;
				this._messageWindow.x = (Graphics.boxWidth - this._messageWindow.width) / 2;
				this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height;
				this._messageWindow.show();
				this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
				break;
			case "buy":
				this._messageWindow.setText(String(shopSettings.buyMessage));
				this._messageWindow.width = Graphics.boxWidth / 2;
				this._messageWindow.height = this._statusWindow.height;
				this._messageWindow.x = this._buyWindow.width;
				this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height - this._helpWindow.height;
				this._messageWindow._text ? this._messageWindow.show() : this._messageWindow.hide();
				this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
				break;
			case "sell":
				this._messageWindow.setText(String(shopSettings.sellMessage));
				this._messageWindow.width = Graphics.boxWidth / 2;
				this._messageWindow.height = this._statusWindow.height;
				this._messageWindow.x = this._buyWindow.width;
				this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height - this._helpWindow.height;
				this._messageWindow._text ? this._messageWindow.show() : this._messageWindow.hide();
				this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
				break;
			case "thanks":
				if (shopSettings.thanksMessage) {
					this._messageWindow.setText(String(shopSettings.thanksMessage));
					this._messageWindow.width = Graphics.boxWidth / 2;
					this._messageWindow.height = this._statusWindow.height;
					this._messageWindow.x = this._buyWindow.width;
					this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height - this._helpWindow.height;
					this._messageWindow._text ? this._messageWindow.show() : this._messageWindow.hide();
				}
				if (shopSettings.staffThanksImageName) {
					this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffThanksImageName));
				}
				break;
		}
	}

	Scene_Shop.prototype.reserveStandingPictures = function() {
		if (shopSettings.staffImageName) ImageManager.loadPicture(String(shopSettings.staffImageName));
		if (shopSettings.staffThanksImageName) ImageManager.loadPicture(String(shopSettings.staffThanksImageName));

		$gameParty.members().forEach(function(actor) {
			const picture = ExMenuScreenBase.getImageName(actor._actorId);
			if (picture) {
				ImageManager.loadPicture(picture.imageName);
				// ピンチ時立ち絵 (旧Ver.)
				if (picture.pinchImageName) {
					ImageManager.loadPicture(picture.pinchImageName);
				}
			}
		}, this);
	};


	//-----------------------------------------------------------------------------
	// Window_ShopMessage
	//

	function Window_ShopMessage() {
		this.initialize(...arguments);
	}

	Window_ShopMessage.prototype = Object.create(Window_Base.prototype);
	Window_ShopMessage.prototype.constructor = Window_ShopMessage;

	Window_ShopMessage.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
		this._text = "";
	};

	Window_ShopMessage.prototype.setText = function(text) {
		if (this._text !== text) {
			this._text = text;
			this.refresh();
		}
	};

	Window_ShopMessage.prototype.clear = function() {
		this.setText("");
	};

	Window_ShopMessage.prototype.refresh = function() {
		const rect = this.baseTextRect();
		this.contents.clear();
		this.drawTextEx(this._text, rect.x, rect.y, rect.width);
	};

	//-----------------------------------------------------------------------------
	// Window_ShopStatus
	//
	// The window for displaying number of items in possession and the actor's
	// equipment on the shop screen.

	const _Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
	Window_ShopStatus.prototype.initialize = function(rect) {
		_Window_ShopStatus_initialize.apply(this, arguments, rect);

		this._actor = null;
		this._arrowCursorAnimation = 0;
		this.createArrowCursors();
	};

	const _Window_ShopStatus_update = Window_ShopStatus.prototype.update;
	Window_ShopStatus.prototype.update = function() {
		_Window_ShopStatus_update.apply(this, arguments);

		this.updateArrowCursor();
	};

	Window_ShopStatus.prototype.createArrowCursors = function() {
		const w = this._width;
		const h = this._height;
		const p = 24;
		const q = p / 2;
		const sx = 84 + p;
		const sy = 12 + p;
		this._rightArrowSprite = new Sprite();
		this.addChild(this._rightArrowSprite);
		this._rightArrowSprite.bitmap = this._windowskin;
		this._rightArrowSprite.anchor.x = 0.5;
		this._rightArrowSprite.anchor.y = 0.5;
		this._rightArrowSprite.setFrame(sx + q + 36, sy, q, p);
		this._rightArrowSprite.move(w - q / 2, h / 2 + 24);
		this._leftArrowSprite = new Sprite();
		this.addChild(this._leftArrowSprite);
		this._leftArrowSprite.bitmap = this._windowskin;
		this._leftArrowSprite.anchor.x = 0.5;
		this._leftArrowSprite.anchor.y = 0.5;
		this._leftArrowSprite.setFrame(sx + q, sy, q, p);
		this._leftArrowSprite.move(0 + q / 2, h / 2 + 24);
	}

	Window_ShopStatus.prototype.updateArrowCursor = function() {
		if (this._item && this._rightArrowSprite && this._leftArrowSprite) {
			if (this.isEquipItem() && $gameParty.size() > 1 && this._arrowCursorAnimation < 25) {
				this._rightArrowSprite.visible = true;
				this._leftArrowSprite.visible = true;
			} else {
				this._rightArrowSprite.visible = false;
				this._leftArrowSprite.visible = false;
			}
		}
		this._arrowCursorAnimation++;
		if (this._arrowCursorAnimation > 48) this._arrowCursorAnimation = 0;
	};

	Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
		const actor = this._actor;
		if (actor) {
			this.drawActorEquipInfo(x, y, actor);
		}
	};

	Window_ShopStatus.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_ShopStatus.prototype.isPageChangeEnabled = function() {
		return false;
	};


	//-----------------------------------------------------------------------------
	// Window_ShopBuy
	//
	// The window for selecting an item to buy on the shop screen.

	const _Window_ShopBuy_update = Window_ShopBuy.prototype.update;
	Window_ShopBuy.prototype.update = function() {
		const lastIndex = this.index();

		_Window_ShopBuy_update.apply(this, arguments);

		if (this.index() !== lastIndex) {
			callUpdateMessageWithPicture = true;
		}
	};

	const _Window_ShopBuy_cursorRight = Window_ShopBuy.prototype.cursorRight;
	Window_ShopBuy.prototype.cursorRight = function() {
		_Window_ShopBuy_cursorRight.apply(this, arguments);

		const item = this.item();
		const isEquipItem = DataManager.isWeapon(item) || DataManager.isArmor(item);
		if (isEquipItem) {
			this.processPagedown();
		}
	};

	const _Window_ShopBuy_cursorLeft = Window_ShopBuy.prototype.cursorLeft;
	Window_ShopBuy.prototype.cursorLeft = function() {
		_Window_ShopBuy_cursorLeft.apply(this, arguments);

		const item = this.item();
		const isEquipItem = DataManager.isWeapon(item) || DataManager.isArmor(item);
		if (isEquipItem) {
			this.processPageup();
		}
	};


	//-----------------------------------------------------------------------------
	// Window_ShopSell
	//
	// The window for selecting an item to sell on the shop screen.

	Window_ShopSell.prototype.maxCols = function() {
		return 1;
	};

	const _Window_ShopSell_update = Window_ShopSell.prototype.update;
	Window_ShopSell.prototype.update = function() {
		const lastIndex = this.index();

		_Window_ShopSell_update.apply(this, arguments);

		if (this.index() !== lastIndex) {
			callUpdateMessageWithPicture = true;
		}
	};


	//-----------------------------------------------------------------------------
	// Window_ShopItemCategory
	//

	function Window_ShopItemCategory() {
		this.initialize(...arguments);
	}

	Window_ShopItemCategory.prototype = Object.create(Window_ItemCategory.prototype);
	Window_ShopItemCategory.prototype.constructor = Window_ShopItemCategory;

	const _Window_ShopItemCategory_maxCols = Window_ShopItemCategory.prototype.maxCols;
	Window_ShopItemCategory.prototype.maxCols = function() {
		if (itemCategoryWindowDefault) {
			return _Window_ShopItemCategory_maxCols.apply(this, arguments);
		}

		return 2;
	};

})();
