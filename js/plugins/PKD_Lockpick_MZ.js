/*
 * Copyright (c) 2020 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 */

 // * CHANGELOG ===================
 // v1.0.1 (27.01.2021)
 //    - Added VisuMZ_0_CoreEngine plugin support
 //
 // v1.0 (25.01.2021)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.0.1)[BASIC] Lockpicking mini-game
 * @author Pheonix KageDesu
 * @target MZ
 * @url http://kdworkshop.net/plugins/lockpicking
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * 1) Set plugin parameters Lockpick Item and Result Switch
 *
 * 2) For start lockpicking mini-game, use plugin command
 *
 * 3) After plugin command add condition branch and check switch
 * that you put in 'Result Switch' parameter.
 *
 * When player lockpicking sucess - switch = TRUE after game
 * When player lockpicking fail - switch = FALSE after game
 * If player cancel lockpicking - switch = FALSE
 *
 * ! If player don't have any Lockpick item (at least 1), that you set in
 * 'Lockpick Item' parameter, lockpicking mini-game don't starts !
 * ---------------------------------------------------------------------------
  *
  * This is BASIC plugin version and have some restrictions: *    - You can create only 3 locks profiles *    - Locks can have maximum 4 lock items *    - Plugin usage allowed only in Non-Commercial project *  *  PRO version of plugin don't have this restrictions!
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * 
 
 * @param LockpickItemId:i
 * @text Lockpick Item
 * @type item
 * @default 1
 * @desc You should at least one lockpick in inventory to start lockpicing mini game
 * 
 * @param ResultSwitchId:i
 * @text Result Switch
 * @type switch
 * @default 1
 * @desc This switch will keep lockpicking mini game result. If true - lockpick is success.
 * 
 * @param LocksData:structA
 * @text Locks profiles
 * @type struct<LLockProfile>[]
 * @default ["{\"backgroundImage\":\"\",\"lockpickBackImg\":\"LockBack\",\"lockpickForeImg\":\"LockFore\",\"lockBarImg\":\"Lockbar\",\"lockBarMargin:struct\":\"{\\\"x:int\\\":\\\"-20\\\",\\\"y:int\\\":\\\"308\\\"}\",\"lockPickMargin:struct\":\"{\\\"x:int\\\":\\\"-80\\\",\\\"y:int\\\":\\\"380\\\"}\",\"lockItemsMargin:struct\":\"{\\\"x:int\\\":\\\"174\\\",\\\"y:int\\\":\\\"200\\\"}\",\"helpKeyImagePosition:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"420\\\"}\",\"helpImagePosition:struct\":\"{\\\"x:int\\\":\\\"76\\\",\\\"y:int\\\":\\\"50\\\"}\",\"notifyMessagePosition:struct\":\"{\\\"x:int\\\":\\\"250\\\",\\\"y:int\\\":\\\"300\\\"}\",\"items:structA\":\"[\\\"{\\\\\\\"img\\\\\\\":\\\\\\\"LockItem_A\\\\\\\",\\\\\\\"speed:int\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"fallSpeed:int\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"damage:int\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"lockTime:int\\\\\\\":\\\\\\\"60\\\\\\\",\\\\\\\"stepPx:int\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"img\\\\\\\":\\\\\\\"LockItem_A\\\\\\\",\\\\\\\"speed:int\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"fallSpeed:int\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"damage:int\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"lockTime:int\\\\\\\":\\\\\\\"60\\\\\\\",\\\\\\\"stepPx:int\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"img\\\\\\\":\\\\\\\"LockItem_B\\\\\\\",\\\\\\\"speed:int\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"fallSpeed:int\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"damage:int\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"lockTime:int\\\\\\\":\\\\\\\"50\\\\\\\",\\\\\\\"stepPx:int\\\\\\\":\\\\\\\"12\\\\\\\"}\\\",\\\"{\\\\\\\"img\\\\\\\":\\\\\\\"LockItem_B\\\\\\\",\\\\\\\"speed:int\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"fallSpeed:int\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"damage:int\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"lockTime:int\\\\\\\":\\\\\\\"40\\\\\\\",\\\\\\\"stepPx:int\\\\\\\":\\\\\\\"12\\\\\\\"}\\\",\\\"{\\\\\\\"img\\\\\\\":\\\\\\\"LockItem_B\\\\\\\",\\\\\\\"speed:int\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"fallSpeed:int\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"damage:int\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"lockTime:int\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"stepPx:int\\\\\\\":\\\\\\\"16\\\\\\\"}\\\"]\"}"]
 * @desc Different locks profiles with visual and game difficulty settings
 * 
 * @param spacer|Sounds @text‏‏‎ ‎@desc ===============================================
 * 
 * @param Sounds
 * @text Game Sound settings
 * 
 * @param LockItemHitSound:str
 * @parent Sounds
 * @text On Item Hit
 * @desc When lock item hitted by lockpick
 * @type file
 * @requre 1
 * @dir audio/se/
 * @default Cursor1
 * 
 * @param ItemLockedSound:str
 * @parent Sounds
 * @text On Lock Position
 * @desc When lock item on top position (locked)
 * @type file
 * @requre 1
 * @dir audio/se/
 * @default Door1
 * 
 * @param LockpickBrokeSound:str
 * @parent Sounds
 * @text On Broken
 * @desc When lockpick is broken
 * @type file
 * @requre 1
 * @dir audio/se/
 * @default Absorb1
 * 
 * @param LockItemLockedByBarSound:str
 * @parent Sounds
 * @text On Locked
 * @desc When lock item locked  by lock bar
 * @type file
 * @requre 1
 * @dir audio/se/
 * @default Close2
 * 
 * @param GameResultBadSound:str
 * @parent Sounds
 * @text On Fail
 * @desc When you fail lockpicking (all lockpics are broken)
 * @type file
 * @requre 1
 * @dir audio/se/
 * @default
 * 
 * @param GameResultGoodSound:str
 * @parent Sounds
 * @text On Win
 * @desc When lockpicking is success
 * @type file
 * @requre 1
 * @dir audio/se/
 * @default
 * 
 * @param spacer|Visuals @text‏‏‎ ‎@desc ===============================================
 * 
 * @param Visuals
 * @text Visual settings
 * 
 * @param showAnimatedHelpKey:bool
 * @parent Visuals
 * @text Show OK key help image?
 * @type boolean
 * @on Show
 * @off No
 * @default true
 * @desc Show HelpKeyAnimation image when player should be hit Ok button for lock lockbar
 * 
 * @param helpKeyAnimationSpeed:int
 * @parent showAnimatedHelpKey:bool
 * @text OK Help Image animation delay
 * @type number
 * @min 1
 * @default 8
 * @desc Delay between animation frame change, less value - more faster animation
 * 
 * @param showHelpTextLine:b
 * @parent Visuals
 * @text Show help text line?
 * @type boolean
 * @on Show
 * @off No
 * @default true
 * @desc Show Help.png image with how exit game instructions
 * 
 * @param LockBarText:struct
 * @parent Visuals
 * @text LockBar Health Text
 * @type struct<CText>
 * @desc LockBar remaing health (in percantage) text style settings
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"60\",\"h:int\":\"22\"}","margins:struct":"{\"x:int\":\"2\",\"y:int\":\"9\"}","alignment:str":"center","outline:struct":"{\"color:css\":\"#000000\",\"width:int\":\"2\"}","font:struct":"{\"face:str\":\"\",\"size:int\":\"16\",\"italic:bool\":\"false\"}","textColor:css":"#FFFFFF"}
 * 
 * @param LockBarGauge:struct
 * @parent Visuals
 * @text LockBar Health Gauge
 * @type struct<CGauge>
 * @desc LockBar remaing health gauge style settings
 * @default {"visible:bool":"true","margins:struct":"{\"x:int\":\"4\",\"y:int\":\"11\"}","vertical:bool":"false","fill":"LockBarGauge","foreground":"","mask":"","backColor:css":"#000000","backOpacity:int":"190"}
 * 
 * @param LockPickText:struct
 * @parent Visuals
 * @text Lockpicks Count Text
 * @type struct<CText>
 * @desc Remaining lockpics count text style settings
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"60\",\"h:int\":\"40\"}","margins:struct":"{\"x:int\":\"304\",\"y:int\":\"146\"}","alignment:str":"left","outline:struct":"{\"color:css\":\"#000000\",\"width:int\":\"2\"}","font:struct":"{\"face:str\":\"\",\"size:int\":\"24\",\"italic:bool\":\"false\"}","textColor:css":"#FFFFFF"}
 * 
 * 


 * @command StartLockpicking
 * @text Start Lockpicking
 * @desc Starting lockpick minigame. Must be at least one lockpick item in the inventory!
 * 
 * @arg profileIndex
 * @text Lock profile index
 * @type number
 * @min 1
 * @default 1
 * @desc Lock settings index from Locks profiles parameter
 * 
 * 
 * 


 */

/*~struct~LLockProfile:

 * @param backgroundImage
 * @text Background Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default
 * @desc Background for whole mini-game scene [optional]

 * @param lockpickBackImg
 * @text Lock Back Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default LockBack
 * @desc Background part of Lock
 
 * @param lockpickForeImg
 * @text Foreground Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default LockFore
 * @desc Foreground part of Lock

 * @param lockBarImg
 * @text LockBar Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default Lockbar
 * @desc Lock bar image

 * @param lockBarMargin:struct
 * @text LockBar Margins
 * @type struct<XY>
 * @default {"x:int":"-20","y:int":"308"}
 * @desc Position of LockBar, relative Lock Back Image

 * @param lockPickMargin:struct
 * @text Lockpick Margins
 * @type struct<XY>
 * @default {"x:int":"-80","y:int":"380"}
 * @desc Position of Lockpick, relative Lock Back Image

 * @param lockItemsMargin:struct
 * @text Lock Items Margins
 * @type struct<XY>
 * @default {"x:int":"174","y:int":"200"}
 * @desc Position of Lock items, relative Lock Back Image

 * @param helpKeyImagePosition:struct
 * @text Help Key Margins
 * @type struct<XY>
 * @default {"x:int":"170","y:int":"420"}
 * @desc Position of Help Key image, relative Foreground Image

 * @param helpImagePosition:struct
 * @text Help Margins
 * @type struct<XY>
 * @default {"x:int":"76","y:int":"50"}
 * @desc Position of Help Image, relative Foreground Image

 * @param notifyMessagePosition:struct
 * @text Game End Notify Margins
 * @type struct<XY>
 * @default {"x:int":"250","y:int":"300"}
 * @desc Position of Game End Notify Image, relative Foreground Image

@param items:structA
@text Lock Items
@type struct<LLockItem>[]
@default ["{\"img\":\"LockItem_A\",\"speed:int\":\"1\",\"fallSpeed:int\":\"2\",\"damage:int\":\"1\",\"lockTime:int\":\"60\",\"stepPx:int\":\"10\"}","{\"img\":\"LockItem_A\",\"speed:int\":\"3\",\"fallSpeed:int\":\"2\",\"damage:int\":\"2\",\"lockTime:int\":\"60\",\"stepPx:int\":\"10\"}","{\"img\":\"LockItem_B\",\"speed:int\":\"4\",\"fallSpeed:int\":\"3\",\"damage:int\":\"2\",\"lockTime:int\":\"50\",\"stepPx:int\":\"12\"}","{\"img\":\"LockItem_B\",\"speed:int\":\"4\",\"fallSpeed:int\":\"3\",\"damage:int\":\"2\",\"lockTime:int\":\"40\",\"stepPx:int\":\"12\"}","{\"img\":\"LockItem_B\",\"speed:int\":\"5\",\"fallSpeed:int\":\"4\",\"damage:int\":\"3\",\"lockTime:int\":\"20\",\"stepPx:int\":\"16\"}"]
@desc Lock Items difficulty settings

*/

/*~struct~LLockItem:

 * @param img
 * @text Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default LockItem_A
 * @desc Lock item Image

 * @param speed:int
 * @type number
 * @min 1
 * @max 10
 * @text Up speed
 * @default 1
 * @desc How fast item moving UP when hitted

 * @param fallSpeed:int
 * @type number
 * @min 1
 * @max 10
 * @text Down speed
 * @default 2
 * @desc How fast item moving Down

 * @param damage:int
 * @type number
 * @min 1
 * @max 100
 * @text Damage
 * @default 1
 * @desc Amount of damage to LockBar each second when item is locked

 * @param lockTime:int
 * @type number
 * @min 1
 * @max 1000
 * @text Delay
 * @default 60
 * @desc How long items will be delayed in top position, in frames. 60 = 1 second, 30 = 0.5 seconds

 * @param stepPx:int
 * @type number
 * @min 10
 * @max 40
 * @text Threshold
 * @default 20
 * @desc Threshold in PX. Lower value - more accuracy is need for lock item in top by click

*/

/*~struct~CGauge:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this gauge visible?
 *
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 *
 * @param vertical:bool
 * @text Is Vertical?
 * @type boolean
 * @default false
 * @desc Gauge will use vertical fill?
 * 
 * @param fill
 * @text Fill Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default
 * @desc Gaguge fill image, required!
 * 
 * @param foreground
 * @text Foreground Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default
 * @desc Image above gauge fill, optional
 * 
 * @param mask
 * @text Mask Image
 * @type file
 * @dir img/pLockpick/
 * @require 1
 * @default
 * @desc Whole gauge image mask, optional
 * 
 * @param backColor:css
 * @type string
 * @text Background Color
 * @default #000000
 * @desc Text color in HEX format (#000000)
 * 
 * @param backOpacity:int
 * @type number
 * @min 0
 * @max 255
 * @text Background Opacity
 * @default 255
 * @desc from 0 to 255, 0 - transparent, 255 - opaque
 */
/*~struct~CText:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this text visible?
 * 
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 * 
 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment
 * 
 * @param outline:struct
 * @text Text Outline
 * @type struct<Outline>
 * @default
 * @desc Text outline settings
 * 
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param textColor:css
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)
 * 
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */
/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
 */
/*~struct~Font:
 * @param face:str
 * @text Face
 * @desc Font name, or empty for default
 * @default
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
 */
/*~struct~Outline:
 * @param color:css
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px
 */

var Imported = Imported || {};
Imported.PKD_Lockpick = true;


var PKD_Lockpick = {};
PKD_Lockpick.LIBS = {};
PKD_Lockpick.register = function (library) {
    this.LIBS[library.name] = library;
};

ImageManager.loadPKDLockpickImage = function (filename) {
    return this.loadBitmap('img/pLockpick/', filename, 0, false);
};
// Generated by CoffeeScript 2.5.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 12.01.21
var KDCore;

KDCore = KDCore || {};

if ((KDCore.Version != null) && KDCore.Version > '2.4.6') {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ
  console.log('XDev KDCore missed');
} else {
  KDCore.Version = '2.4.6';
  KDCore.VersionCode = 246;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  console.warn("XDev KDCore is loaded " + KDCore.Version);
  (function() {
    var BitmapSrc, Color, DevLog, Point, SDK, __TMP_LOGS__, ___Sprite_alias_Move_KDCORE_2, __alias_Bitmap_fillAll, i, j, l, m;
    // * Array Extension
    //------------------------------------------------------------------------------
    Array.prototype.delete = function() {
      var L, a, ax, what;
      what = void 0;
      a = arguments;
      L = a.length;
      ax = void 0;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };
    Array.prototype.sample = function() {
      if (this.length === 0) {
        return [];
      }
      return this[SDK.rand(0, this.length - 1)];
    };
    Array.prototype.first = function() {
      return this[0];
    };
    Array.prototype.last = function() {
      return this[this.length - 1];
    };
    Array.prototype.shuffle = function() {
      var k, n, v;
      n = this.length;
      while (n > 1) {
        n--;
        k = SDK.rand(0, n + 1);
        v = this[k];
        this[k] = this[n];
        this[n] = v;
      }
    };
    Array.prototype.count = function() {
      return this.length;
    };
    Array.prototype.isEmpty = function() {
      return this.length === 0;
    };
    // * Number Extension
    //------------------------------------------------------------------------------
    Number.prototype.do = function(method) {
      return SDK.times(this, method);
    };
    Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
    };
    Number.prototype.any = function(number) {
      return (number != null) && number > 0;
    };
    // * String Extension
    //------------------------------------------------------------------------------
    String.prototype.toCss = function() {
      return KDCore.Color.FromHex(this).CSS;
    };
    String.prototype.toCSS = function() {
      return this.toCss();
    };
    String.prototype.isEmpty = function() {
      return this.length === 0 || !this.trim();
    };
    String.isNullOrEmpty = function(str) {
      return (str == null) || str.isEmpty();
    };
    String.any = function(str) {
      return !String.isNullOrEmpty(str);
    };
    // * Sprite Extension
    //------------------------------------------------------------------------------
    Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
      return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
    };
    Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
      this.x -= Math.round(this.width * floatX);
      this.y -= Math.round(this.height * floatY);
    };
    Sprite.prototype.moveToParentCenter = function() {
      if (!this.parent) {
        return;
      }
      return this.move(this.parent.width / 2, this.parent.height / 2);
    };
    ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
    Sprite.prototype.move = function(x, y) {
      if (x instanceof Array) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
      } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
      } else if ((x != null) && (x._x != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
      } else {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
      }
    };
    Sprite.prototype.isContainsPoint = function(point) {
      var rect, rx, ry;
      if (this.width === 0 || this.height === 0) {
        return false;
      }
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this.width, this.height);
      return rect.contains(point.x, point.y);
    };
    Sprite.prototype.fillAll = function(color) {
      if (color != null) {
        return this.bitmap.fillAll(color);
      } else {
        return this.fillAll(KDCore.Color.WHITE);
      }
    };
    Sprite.prototype.removeFromParent = function() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    };
    // * Bitmap Extension
    //------------------------------------------------------------------------------
    __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
    Bitmap.prototype.fillAll = function(color) {
      if (color instanceof KDCore.Color) {
        return this.fillRect(0, 0, this.width, this.height, color.CSS);
      } else {
        return __alias_Bitmap_fillAll.call(this, color);
      }
    };
    Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
      var bitmap;
      bitmap = null;
      if (icon instanceof Bitmap) {
        bitmap = icon;
      } else {
        bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
      }
      return this.drawOnMe(bitmap, x, y, size, size);
    };
    Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
      if (sw <= 0) {
        sw = bitmap.width;
      }
      if (sh <= 0) {
        sh = bitmap.height;
      }
      this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
    };
    Bitmap.prototype.drawInMe = function(bitmap) {
      return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
    };
    Bitmap.prototype.drawTextFull = function(text, position = 'center') {
      return this.drawText(text, 0, 0, this.width, this.height, position);
    };
    // * String Extenstion
    //------------------------------------------------------------------------------
    String.prototype.replaceAll = function(search, replacement) {
      var target;
      target = this;
      return target.split(search).join(replacement);
    };
    // * Input Extension
    //------------------------------------------------------------------------------

    //TODO: Gamepad support
    Input.KeyMapperPKD = {};
//Numbers
    for (i = j = 48; j <= 57; i = ++j) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i);
    }
//Letters Upper
    for (i = l = 65; l <= 90; i = ++l) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
//Letters Lower (for key code events)
    for (i = m = 97; m <= 122; i = ++m) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
    (function() {
      var _input_onKeyDown, _input_onKeyUp;
      
      //@[ALIAS]
      _input_onKeyDown = Input._onKeyDown;
      Input._onKeyDown = function(event) {
        _input_onKeyDown.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode);
      };
      //@[ALIAS]
      _input_onKeyUp = Input._onKeyUp;
      Input._onKeyUp = function(event) {
        _input_onKeyUp.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode, false);
      };
      //?NEW
      Input._setStateWithMapperPKD = function(keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperPKD[keyCode];
        if (symbol != null) {
          return this._currentState[symbol] = state;
        }
      };
      //?NEW
      Input.isCancel = function() {
        return Input.isTriggered('cancel') || TouchInput.isCancelled();
      };
      //?NEW
      TouchInput.toPoint = function() {
        return new KDCore.Point(TouchInput.x, TouchInput.y);
      };
    })();
    // * SDK
    //------------------------------------------------------------------------------
    SDK = function() {
      throw new Error('This is a static class');
    };
    SDK.rand = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    };
    SDK.setConstantToObject = function(object, constantName, constantValue) {
      object[constantName] = constantValue;
      if (typeof object[constantName] === 'object') {
        Object.freeze(object[constantName]);
      }
      Object.defineProperty(object, constantName, {
        writable: false
      });
    };
    SDK.convertBitmapToBase64Data = function(bitmap) {
      return bitmap._canvas.toDataURL('image/png');
    };
    SDK.times = function(times, method) {
      var results;
      i = 0;
      results = [];
      while (i < times) {
        method(i);
        results.push(i++);
      }
      return results;
    };
    SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
      var node, t;
      t = layer[coordSymbol];
      node = layer;
      while (node) {
        t -= node[coordSymbol];
        node = node.parent;
      }
      return (t * -1) + layer[coordSymbol];
    };
    SDK.canvasToLocalX = function(layer, x) {
      while (layer) {
        x -= layer.x;
        layer = layer.parent;
      }
      return x;
    };
    SDK.canvasToLocalY = function(layer, y) {
      while (layer) {
        y -= layer.y;
        layer = layer.parent;
      }
      return y;
    };
    SDK.isInt = function(n) {
      return Number(n) === n && n % 1 === 0;
    };
    SDK.isFloat = function(n) {
      return Number(n) === n && n % 1 !== 0;
    };
    SDK.checkSwitch = function(switchValue) {
      if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
        return true;
      }
      return false;
    };
    SDK.toNumber = function(string, none = 0) {
      var number;
      if (string == null) {
        return none;
      }
      number = Number(string);
      if (isNaN(number)) {
        return none;
      }
      return number;
    };
    // * Color
    //------------------------------------------------------------------------------
    Color = class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = SDK.rand(1, 254);
        b = SDK.rand(1, 254);
        c = SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };
    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });
    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
    BitmapSrc = (function() {
      
        //BitmapSrc
      //------------------------------------------------------------------------------
      class BitmapSrc {
        constructor() {
          this.bitmap = null;
        }

        static LoadFromIconIndex(iconIndex) {
          var bs, icon_bitmap, iconset, ph, pw, sx, sy;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[iconIndex] == null) {
            iconset = ImageManager.loadSystem('IconSet');
            if (KDCore.isMV()) {
              pw = Window_Base._iconWidth;
              ph = Window_Base._iconHeight;
            } else {
              pw = ImageManager.iconWidth;
              ph = ImageManager.iconHeight;
            }
            sx = iconIndex % 16 * pw;
            sy = Math.floor(iconIndex / 16) * ph;
            icon_bitmap = new Bitmap(pw, ph);
            icon_bitmap.addLoadListener(function() {
              icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
            });
            BitmapSrc.CACHE[iconIndex] = icon_bitmap;
          }
          bs.bitmap = BitmapSrc.CACHE[iconIndex];
          return bs;
        }

        static LoadFromImageFolder(filename) {
          var bs;
          bs = new BitmapSrc();
          bs.bitmap = ImageManager.loadPicture(filename);
          return bs;
        }

        static LoadFromBase64(data, name) {
          var bs;
          bs = new BitmapSrc();
          if (name != null) {
            if (BitmapSrc.CACHE[name] != null) {
              bs.bitmap = BitmapSrc.CACHE[name];
            } else {
              BitmapSrc.CACHE[name] = Bitmap.load(data);
              bs.bitmap = BitmapSrc.CACHE[name];
            }
          } else {
            bs.bitmap = Bitmap.load(data);
          }
          return bs;
        }

        static LoadFromMemory(symbol) {
          var bs;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[symbol] != null) {
            bs.bitmap = BitmapSrc.CACHE[symbol];
          } else {
            bs.bitmap = ImageManager.loadEmptyBitmap();
          }
          return bs;
        }

      };

      BitmapSrc.CACHE = {};

      return BitmapSrc;

    }).call(this);
    // * DevLog
    //------------------------------------------------------------------------------
    __TMP_LOGS__ = [];
    DevLog = class DevLog {
      constructor(prefix = "") {
        this.prefix = prefix;
        this._isShow = typeof DEV !== 'undefined';
        this._color = Color.BLACK;
        this._backColor = Color.WHITE;
        __TMP_LOGS__.push(this);
      }

      on() {
        this._isShow = true;
        return this;
      }

      off() {
        this._isShow = false;
        return this;
      }

      applyRandomColors() {
        this.applyRandomWithoutBackgroundColors();
        this.setBackColor(Color.Random());
        return this;
      }

      applyRandomWithoutBackgroundColors() {
        this.setColor(Color.Random());
        return this;
      }

      setColor(color) {
        this._color = color;
        return this;
      }

      setBackColor(backColor) {
        this._backColor = backColor;
        return this;
      }

      applyLibraryColors() {
        this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
        return this;
      }

      setColors(color, backColor) {
        this.setColor(color);
        this.setBackColor(backColor);
        return this;
      }

      applyExtensionColors() {
        this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
        return this;
      }

      applyWarningColors() {
        this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
        return this;
      }

      p(text) {
        if (!this._isShow) {
          return;
        }
        if (text == null) {
          console.log("");
        }
        this._printText(text);
      }

      _printText(text) {
        text = this.prefix + " : " + text;
        if (this._isUsingColor()) {
          return this._printTextWithColors(text);
        } else {
          return console.log(text);
        }
      }

      _isUsingColor() {
        return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
      }

      _printTextWithColors(text) {
        var args;
        args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
        return window.console.log.apply(console, args);
      }

      static CreateForLib(library) {
        var dlog;
        dlog = new DevLog(library.name);
        dlog.applyLibraryColors();
        return dlog;
      }

      static EnableAllLogs() {
        return __TMP_LOGS__.forEach(function(log) {
          return log.on();
        });
      }

    };
    // * ParametersManager
    //------------------------------------------------------------------------------
    PluginManager.getPluginParametersByRoot = function(rootName) {
      var pluginParameters, property;
      for (property in this._parameters) {
        if (this._parameters.hasOwnProperty(property)) {
          pluginParameters = this._parameters[property];
          if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
            return pluginParameters;
          }
        }
      }
      return PluginManager.parameters(rootName);
    };
    PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
      return pluginParameters[key] != null;
    };
    //@[AUTO EXTEND]
    //?[DEPRECATED]
    KDCore.ParametersManager = class ParametersManager {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this._cache = {};
        this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
      }

      isLoaded() {
        return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
      }

      isHasParameter(name) {
        return this._parameters[name] != null;
      }

      getString(name) {
        return this._parameters[name];
      }

      convertField(object, fieldName) {
        var e;
        try {
          object[fieldName] = JSON.parse(object[fieldName] || 'false');
        } catch (error1) {
          e = error1;
          console.error('Error while convert field ' + e.name);
          object[fieldName] = false;
        }
        return object;
      }

      convertImage(object, fieldName) {
        return object[fieldName] = this.loadImage(object[fieldName]);
      }

      loadImage(filename, smooth) {
        var e, path;
        try {
          if (filename) {
            path = filename.split('/');
            filename = path.last();
            path = path.first() + '/';
            return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
          } else {
            return ImageManager.loadEmptyBitmap();
          }
        } catch (error1) {
          e = error1;
          console.error(e);
          return ImageManager.loadEmptyBitmap();
        }
      }

      getFromCacheOrInit(name, func) {
        var object;
        if (!this.isInCache(name)) {
          if (func != null) {
            object = func.call(this);
            this.putInCache(name, object);
          }
        }
        return this.getFromCache(name);
      }

      isInCache(name) {
        return this._cache.hasOwnProperty(name);
      }

      putInCache(name, object) {
        return this._cache[name] = object;
      }

      getFromCache(name) {
        return this._cache[name];
      }

      getNumber(name) {
        var number;
        number = this.getObject(name);
        if (SDK.isInt(number)) {
          return number;
        }
        return 0;
      }

      getObject(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || '{}');
        } else {
          return {};
        }
      }

      getBoolean(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || false);
        } else {
          return false;
        }
      }

      getBooleanFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getBooleanFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getNumberFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getNumberFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getStringFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getStringFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getBooleanFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getBoolean(name);
        });
      }

      getNumberFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getNumber(name);
        });
      }

      getStringFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getString(name);
        });
      }

    };
    // * ParamLoader (ParametersManager alternative)

      //@[AUTO EXTEND]
    KDCore.ParamLoader = class ParamLoader {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
        this.params = this.parseParameters(this.paramsRaw);
      }

      parseParameters(paramSet) {
        var clearKey, key, params, typeKey, value;
        params = {};
        for (key in paramSet) {
          value = paramSet[key];
          clearKey = this.parseKey(key);
          typeKey = this.parseKeyType(key);
          params[clearKey] = this.parseParamItem(typeKey, value);
        }
        return params;
      }

      parseKey(keyRaw) {
        return keyRaw.split(":")[0];
      }

      parseKeyType(keyRaw) {
        return keyRaw.split(":")[1];
      }

      // * Проверка, загружены ли параметры плагина
      isLoaded() {
        return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
      }

      // * Имя параметра без ключа
      isHasParameter(paramName) {
        return this.params[paramName] != null;
      }

      
        // * Возвращает значение параметра (def - по умолчанию, если не найден)
      getParam(paramName, def) {
        if (this.isHasParameter(paramName)) {
          return this.params[paramName];
        } else {
          return def;
        }
      }

      // * Данные ключи должны идти после названия параметра через :
      // * Пример: @param ShowDelay:int, @param TestBool:bool
      // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
      parseParamItem(type, item) {
        var e;
        if (type == null) {
          return item;
        }
        try {
          switch (type) {
            case "int":
            case "i":
              return parseInt(item);
            case "intA": // * массив чисел
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("int", e);
                });
              } else {
                return [];
              }
              break;
            case "bool":
            case "b":
            case "e":
              return eval(item);
            case "struct":
            case "s":
              if (String.any(item)) {
                return this.parseParameters(JsonEx.parse(item));
              } else {
                return null;
              }
              break;
            case "structA": // * массив структур
              return JsonEx.parse(item).map((e) => {
                return this.parseParameters(JsonEx.parse(e));
              });
            case "str":
              return item;
            case "strA":
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("str", e);
                });
              } else {
                return [];
              }
              break;
            case "note": // * если несколько строк в тексте
              return JsonEx.parse(item);
            case "css":
              return item.toCss();
            case "color":
              return KDCore.Color.FromHex(item);
            default:
              return item;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return item;
        }
      }

    };
    Point = (function() {
      // * Point
      //------------------------------------------------------------------------------
      class Point {
        constructor(_x = 0, _y = 0) {
          this._x = _x;
          this._y = _y;
        }

        clone() {
          return new Point(this._x, this._y);
        }

        toString() {
          return "[" + this._x + " ; " + this._y + "]";
        }

        isSame(anotherPoint) {
          return this.x === anotherPoint.x && this.y === anotherPoint.y;
        }

        convertToCanvas() {
          return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
        }

        convertToMap() {
          return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
        }

        convertToScreen() {
          return new Point(this.screenX(), this.screenY());
        }

        screenX() {
          var t, tw;
          t = $gameMap.adjustX(this._x);
          tw = $gameMap.tileWidth();
          return Math.round(t * tw + tw / 2);
        }

        screenY() {
          var t, th;
          t = $gameMap.adjustY(this._y);
          th = $gameMap.tileHeight();
          return Math.round(t * th + th);
        }

        round() {
          return new Point(Math.round(this._x), Math.round(this._y));
        }

        floor() {
          return new Point(Math.floor(this._x), Math.floor(this._y));
        }

        mapPointOnScreen() {
          var nx, ny;
          nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
          ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
          return new Point(nx, ny);
        }

        multiplyBy(val) {
          return new Point(this._x * val, this._y * val);
        }

        simple() {
          return new PIXI.Point(this.x, this.y);
        }

        delta(point) {
          var dx, dy;
          dx = point.x - this._x;
          dy = point.y - this._y;
          return new KDCore.Point(dx, dy);
        }

        static _getEmpty() {
          if (Point._emptyPoint == null) {
            Point._emptyPoint = new Point(0, 0);
          }
          return Point._emptyPoint;
        }

      };

      Object.defineProperties(Point.prototype, {
        x: {
          get: function() {
            return this._x;
          },
          configurable: true
        },
        y: {
          get: function() {
            return this._y;
          },
          configurable: true
        }
      });

      Object.defineProperties(Point, {
        Empty: {
          get: function() {
            return Point._getEmpty();
          },
          configurable: false
        }
      });

      Array.prototype.toPoint = function() {
        return new Point(this[0], this[1]);
      };

      Sprite.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      Game_CharacterBase.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      return Point;

    }).call(this);
    // * Utils
    //------------------------------------------------------------------------------
    KDCore.Utils = {};
    (function() {
      var _;
      _ = KDCore.Utils;
      _.getJDataById = function(id, source) {
        var d, len, o;
        for (o = 0, len = source.length; o < len; o++) {
          d = source[o];
          if (d.id === id) {
            return d;
          }
        }
        return null;
      };
      _.hasMeta = function(symbol, obj) {
        return (obj.meta != null) && (obj.meta[symbol] != null);
      };
      _.getValueFromMeta = function(symbol, obj) {
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        return obj.meta[symbol];
      };
      _.getNumberFromMeta = function(symbol, obj) {
        var value;
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        if (obj.meta[symbol] === true) {
          return 0;
        } else {
          value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
        }
        return value;
      };
      _.isSceneMap = function() {
        try {
          return SceneManager._scene instanceof Scene_Map;
        } catch (error1) {
          return false;
        }
      };
      _.isSceneBattle = function() {
        try {
          return SceneManager._scene instanceof Scene_Battle;
        } catch (error1) {
          return false;
        }
      };
      _.getEventCommentValue = function(commentCode, list) {
        var comment, e, item;
        try {
          if (list && list.length > 1) {
            i = 0;
            while (i < list.length) {
              item = list[i++];
              if (!item) {
                continue;
              }
              if (item.code === 108) {
                comment = item.parameters[0];
                if (comment.contains(commentCode)) {
                  return comment;
                }
              }
            }
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
        }
        return null;
      };
      _.getPositionPointFromJSON = function(jsonSettings) {
        return _.convertPositionPointFromJSON(jsonSettings.position);
      };
      _.convertPositionPointFromJSON = function(position) {
        var e, x, y;
        try {
          x = position[0];
          y = position[1];
          if (!KDCore.SDK.isInt(x)) {
            x = eval(x);
          }
          if (!KDCore.SDK.isInt(y)) {
            y = eval(y);
          }
          return new KDCore.Point(x, y);
        } catch (error1) {
          e = error1;
          console.warn('Utils.getPositionPointFromJSON', e);
          return KDCore.Point.Empty;
        }
      };
      _.jsonPos = function(jsonPosition) {
        return _.convertPositionPointFromJSON(jsonPosition);
      };
      _.jsonPosXY = function(jsonPosition) {
        var e, x, y;
        try {
          ({x, y} = jsonPosition);
          return new KDCore.Point(eval(x), eval(y));
        } catch (error1) {
          e = error1;
          console.warn('Utils.jsonPosXY', e);
          return KDCore.Point.Empty;
        }
      };
      _.getVar = function(id) {
        return $gameVariables.value(id);
      };
      _.setVar = function(id, value) {
        return $gameVariables.setValue(id, value);
      };
      _.addToVar = function(id, value) {
        var prevVal;
        prevVal = _.getVar(id);
        return _.setVar(id, prevVal + value);
      };
      _.playSE = function(seFileName, pitch = 100, volume = 100) {
        var sound;
        if (seFileName == null) {
          return;
        }
        if (seFileName === "") {
          return;
        }
        sound = {
          name: seFileName,
          pan: 0,
          pitch: pitch,
          volume: volume
        };
        AudioManager.playStaticSe(sound);
      };
      _.getItemTypeId = function(item) {
        if (DataManager.isWeapon(item)) {
          return 1;
        } else if (DataManager.isArmor(item)) {
          return 2;
        }
        return 0;
      };
      _.getItemByType = function(itemId, typeId) {
        var data;
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      };
      _.loadFont = function(name) {
        if (!KDCore.isMZ()) {
          return;
        }
        if (String.isNullOrEmpty(name)) {
          return;
        }
        if (FontManager._states[name] != null) {
          return;
        }
        FontManager.load(name, name + ".ttf");
      };
      _.convertTimeShort = function(seconds) {
        var e;
        try {
          if (seconds > 59) {
            return Math.floor(seconds / 60) + 'm';
          } else {
            return seconds;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return seconds;
        }
      };
      _.isPointInScreen = function(point, margin = 10) {
        var maxH, maxW, screenMargin, x, y;
        ({x, y} = point);
        maxW = Graphics.width;
        maxH = Graphics.height;
        // * Граница от краёв экрана
        screenMargin = margin;
        if (x < screenMargin) {
          return false;
        }
        if (y < screenMargin) {
          return false;
        }
        if (x > (maxW - screenMargin)) {
          return false;
        }
        if (y > (maxH - screenMargin)) {
          return false;
        }
        return true;
      };
      // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
      // * Пример использования loadImageAsync(a, b).then(метод)
      // в метод будет передан bitmap первым аргументом
      _.loadImageAsync = async function(folder, filename) {
        var promise;
        promise = new Promise(function(resolve, reject) {
          var b;
          b = ImageManager.loadBitmap("img/" + folder + "/", filename);
          return b.addLoadListener(function() {
            return resolve(b);
          });
        });
        return (await promise);
      };
    })();
    // * TimedUpdate
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    KDCore.TimedUpdate = class TimedUpdate {
      constructor(interval, method1) {
        this.interval = interval;
        this.method = method1;
        this._timer = 0;
        this._once = false;
      }

      update() {
        if (this.interval == null) {
          return;
        }
        if (this._timer++ >= this.interval) {
          this.call();
          this._timer = 0;
          if (this._once === true) {
            return this.stop();
          }
        }
      }

      once() {
        return this._once = true;
      }

      onUpdate(method1) {
        this.method = method1;
      }

      stop() {
        return this.interval = null;
      }

      isAlive() {
        return this.interval != null;
      }

      // * Рандомизировать интервал @interval (-min, +max)
      applyTimeRange(min, max) {
        var value;
        if (!this.isAlive()) {
          return;
        }
        value = SDK.rand(min, max);
        return this.interval += value;
      }

      call() {
        if (this.method != null) {
          return this.method();
        }
      }

    };
    // * Button (Sprite_XButton)
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    //?DEPRECATED
    KDCore.Button = class Button extends Sprite {
      constructor() {
        super();
        this._mouseIn = false;
        this._touching = false;
        this._slowUpdateActive = false;
        this._localMode = false;
        this._images = [];
        this._checkAlpha = false;
        this._textSprite = null;
        this._textPosition = 0;
        this._override = false; // * TouchClick in game messages not work anymore if TRUE
        this._clickHandlers = [];
        this._manualHided = false;
        this._manualDisabled = false;
        this._condition = null; // * Условие для Visible
        this._condition2 = null; // * Условие для Enable \ Disable
        this._disabled = false;
        this._infoData = null;
        this._isNeedShowText = false;
      }

      isMouseInButton() {
        return this._mouseIn === true;
      }

      isActive() {
        return this.visible === true;
      }

      activateSlowUpdate() {
        return this._slowUpdateActive = true;
      }

      setLocalMode() {
        this._realX = this.x;
        this._realY = this.y;
        return this._localMode = true;
      }

      setAlphaMode() {
        return this._checkAlpha = true;
      }

      // * above, below
      setTextPosition(position) {
        return this._textPosition = position;
      }

      setHelpText(text, size) {
        return this._createText(text, size);
      }

      setInfoData(data) {
        return this._infoData = data;
      }

      setOverrideMode() {
        return this._override = true;
      }

      isOverride() {
        return this._override === true && this.isActive() && this.touchInButton();
      }

      isDisabled() {
        return this._disabled === true;
      }

      isEnabled() {
        return !this.isDisabled();
      }

      isNeedShowText() {
        return this._isNeedShowText === true;
      }

      addClickHandler(method) {
        return this._clickHandlers.push(method);
      }

      clearClickHandlers() {
        return this._clickHandlers = [];
      }

      isLocalMode() {
        return this._localMode === true;
      }

      setCondition(method) {
        return this._condition = method;
      }

      setConditionForDisable(method) {
        return this._condition2 = method;
      }

      getInfoData() {
        return this._infoData;
      }

      simulateClick() { //?NEW
        return this.applyClickedState();
      }

      simulateClickManual() { //?NEW
        this.simulateClick();
        return setTimeout((() => {
          try {
            return this.applyNormalState();
          } catch (error1) {

          }
        }), 50);
      }

      prepare() { //?NEW
        return this.slowUpdate();
      }

      realX() {
        if (this.isLocalMode()) {
          return this._realX;
        } else {
          return this.x;
        }
      }

      realY() {
        if (this.isLocalMode()) {
          return this._realY;
        } else {
          return this.y;
        }
      }

      show() {
        this.visible = true;
        return this._manualHided = false;
      }

      hide() {
        this.visible = false;
        return this._manualHided = true;
      }

      disable() {
        this._disabled = true;
        this._manualDisabled = true;
        this.refreshEnDisState();
        return this._mouseIn = false;
      }

      enable() {
        this._disabled = false;
        this._manualDisabled = false;
        return this.refreshEnDisState();
      }

      update() {
        super.update();
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseClick();
        this.updatePosition();
        if (!this._slowUpdateActive) {
          this.slowUpdate();
        }
        return this.updateComplexTextVisible();
      }

      slowUpdate() {
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseTracking();
        this.updateConditionForVisible();
        return this.updateConditionForEnabling();
      }

      updateMouseTracking() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.cursorInButton()) {
          this._onMouseEnter();
          return this._mouseIn = true;
        } else {
          this._onMouseLeave();
          return this._mouseIn = false;
        }
      }

      // * In MZ TouchInput always have X,Y
      cursorInButton() {
        return this.touchInButton();
      }

      xyInButton(x, y) {
        var inRect, rect, rx, ry;
        rx = KDCore.SDK.toGlobalCoord(this, 'x');
        ry = KDCore.SDK.toGlobalCoord(this, 'y');
        rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
        inRect = rect.contains(x, y);
        if (inRect === true && this._checkAlpha === true) {
          return this._checkAlphaPixel(x - rx, y - ry);
        } else {
          return inRect;
        }
      }

      _realWidth() {
        if (this._hasImage()) {
          return this._mainImage().width;
        } else {
          return this.width;
        }
      }

      _hasImage() {
        return this._mainImage() != null;
      }

      _mainImage() {
        return this._images[0];
      }

      _realHeight() {
        if (this._hasImage()) {
          return this._mainImage().height;
        } else {
          return this.height;
        }
      }

      _checkAlphaPixel(x, y) {
        var pixel;
        pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
        return pixel >= 200;
      }

      _onMouseEnter() {
        if (this._mouseIn === true) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyCoverState();
        }
        this._showText();
        if (this.getInfoData() != null) {
          return this._startComplexTimer();
        }
      }

      _onMouseLeave() {
        if (this._mouseIn === false) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyNormalState();
        }
        this._hideText();
        return this._stopComplexTimer();
      }

      _showText() {
        if (this._textSprite == null) {
          return;
        }
        this._updateTextPosition();
        return this._textSprite.visible = true;
      }

      _hideText() {
        if (this._textSprite == null) {
          return;
        }
        return this._textSprite.visible = false;
      }

      _startComplexTimer() {
        this._stopComplexTimer();
        return this._cTimer = setTimeout((() => {
          if (this._mouseIn === true) {
            return this._isNeedShowText = true;
          }
        }), 1000);
      }

      _stopComplexTimer() {
        if (this._cTimer != null) {
          clearTimeout(this._cTimer);
        }
        return this._isNeedShowText = false;
      }

      updateMouseClick() {
        if (!this.isActive()) {
          this._unTouch();
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.touchInButton()) {
          this._touching = true;
          this.applyClickedState();
        }
        if (this._touching === true) {
          if (TouchInput.isReleased() || !this.touchInButton()) {
            this._unTouch();
            if (TouchInput.isReleased()) {
              return this.callClickHandler();
            }
          }
        }
      }

      _unTouch() {
        this._touching = false;
        if (this.touchInButton()) {
          return this.applyCoverState();
        } else {
          return this.applyNormalState();
        }
      }

      touchInButton() {
        return this.xyInButton(TouchInput.x, TouchInput.y);
      }

      callClickHandler() {
        if (this._clickHandlers.length > 0) {
          return this._clickHandlers.forEach(function(method) {
            return method();
          });
        }
      }

      updatePosition() {
        var p;
        if (!this._localMode) {
          return;
        }
        p = new KDCore.Point(this._realX, this._realY);
        return this.move(p.screenX(), p.screenY());
      }

      updateConditionForVisible() {
        var result;
        if (this._condition == null) {
          return;
        }
        if (this._manualHided === true) {
          return;
        }
        try {
          result = this._condition();
          return this.visible = !result;
        } catch (error1) {
          console.warn('wrong condition in button');
          return this.visible = true;
        }
      }

      updateConditionForEnabling() {
        if (!this._condition2) {
          return;
        }
        if (this._manualDisabled === true) {
          return;
        }
        try {
          this._disabled = this._condition2();
          return this.refreshEnDisState();
        } catch (error1) {
          console.warn('wrong condition in button for enable state');
          return this.disable();
        }
      }

      setButtonImages(img1, img2, img3, img4) {
        if (this._images != null) {
          this._images.forEach(function(img) {
            if (img != null) {
              return img.parent.removeChild(img);
            }
          });
        }
        this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
        this._images.forEach((img) => {
          if (img != null) {
            return this.addChild(img);
          }
        });
        return this.applyNormalState();
      }

      applyNormalState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[0]) != null ? ref.visible = true : void 0;
      }

      refreshImages() {
        return this._images.forEach(function(img) {
          return img != null ? img.visible = false : void 0;
        });
      }

      applyCoverState() {
        this.refreshImages();
        if (this._images[1] != null) {
          return this._images[1].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      applyClickedState() {
        this.refreshImages();
        if (this._images[2] != null) {
          return this._images[2].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      _createText(text, size) {
        var h, w;
        if (this._textSprite) {
          this.removeChild(this._textSprite);
        }
        w = Math.round(((size / 10) + 1) * 5 * text.length);
        h = size + 4;
        this._textSprite = new Sprite(new Bitmap(w, h));
        this._textSprite.bitmap.fontSize = size;
        this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
        this._textSprite.visible = false;
        return this.addChild(this._textSprite);
      }

      _updateTextPosition() {
        var nx, ny;
        if (!this._textSprite) {
          return;
        }
        nx = this._realWidth() / 2 - this._textSprite.width / 2;
        if (this._textPosition === 0) {
          ny = -this._textSprite.height;
        } else {
          ny = this._realHeight() + this._textSprite.height / 2;
        }
        return this._textSprite.move(nx, ny);
      }

      applyDisableState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[3]) != null ? ref.visible = true : void 0;
      }

      refreshEnDisState() {
        if (this.isDisabled()) {
          this.applyDisableState();
          return this._hideText();
        } else {
          if (this._mouseIn === false) {
            return this.applyNormalState();
          }
        }
      }

      //else
      //    do @applyCoverState
      updateComplexTextVisible() {}

      applyScale(mod) {
        var img, len, o, ref;
        ref = this._images;
        for (o = 0, len = ref.length; o < len; o++) {
          img = ref[o];
          if (img != null) {
            img.scale.x = mod;
            img.scale.y = mod;
          }
        }
      }

      static FromSet(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img0, img0);
        return button;
      }

      static FromSetFull(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1, img2, img3;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        img2 = getterFunc(imgName + "_02");
        img3 = getterFunc(imgName + "_03");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img2, img3);
        return button;
      }

    };
    KDCore.Sprite = (function(superClass) {
      // * Sprite
      //------------------------------------------------------------------------------
      //@[AUTO EXTEND]
      class Sprite extends superClass {
        constructor() {
          super(...arguments);
        }

        b() {
          return this.bitmap;
        }

        clear() {
          return this.bitmap.clear();
        }

        add(child) {
          return this.addChild(child);
        }

        bNew(w, h) {
          if (h == null) {
            h = w;
          }
          return this.bitmap = new Bitmap(w, h);
        }

        bImg(filename, sourceFolder) {
          var getterFunc;
          getterFunc = function(filename) {
            return ImageManager.loadPicture(filename);
          };
          if (sourceFolder != null) {
            getterFunc = function(filename) {
              return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
            };
          }
          return this.bitmap = getterFunc(filename);
        }

        onReady(method) {
          if (method != null) {
            return this.bitmap.addLoadListener(method);
          }
        }

        drawText() {
          return this.bitmap.drawText(...arguments);
        }

        drawTextFull(text, position = "center") {
          if (this.textSettingsPosition != null) {
            position = this.textSettingsPosition;
          }
          return this.bitmap.drawTextFull(text, position);
        }

        //?DEPRECATED
        drawTextWithSettings(text) {
          this.clear();
          this.drawTextFull(text, this.textSettingsPosition);
        }

        //? x, y, icon, size
        drawIcon() {
          return this.bitmap.drawIcon(...arguments);
        }

        moveByJson(settings) {
          var pos;
          pos = KDCore.Utils.getPositionPointFromJSON(settings);
          return this.move(pos.x, pos.y);
        }

        applyTextSettingsByJson(sprite, settings) {
          this.applyTextSettingsByExtraSettings(sprite, settings.text);
        }

        applyTextSettingsByExtraSettings(sprite, s) {
          sprite.move(s.marginX, s.marginY);
          sprite.b().fontSize = s.fontSize;
          sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
          sprite.b().outlineWidth = s.outlineWidth;
          if (s.outlineColor != null) {
            sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
          }
          if (s.fontFace != null) {
            sprite.b().fontFace = s.fontFace;
          }
          sprite.b().fontItalic = s.fontItalic;
          sprite.visible = s.visible;
        }

        isReady() {
          var o, ref;
          if (this.bitmap != null) {
            if (!this.bitmap.isReady()) {
              return false;
            }
          }
          for (i = o = 0, ref = this.children.length; (0 <= ref ? o < ref : o > ref); i = 0 <= ref ? ++o : --o) {
            if (!this.children[i].bitmap.isReady()) {
              return false;
            }
          }
          return true;
        }

        inPosition(point) {
          return this.isContainsPoint(point);
        }

        isUnderMouse() {
          return this.inPosition(TouchInput);
        }

        // * Из параметров плагина
        applyFontParam(font) {
          var b;
          if (font == null) {
            return;
          }
          b = this.b();
          if (font.size != null) {
            b.fontSize = font.size;
          }
          if (!String.isNullOrEmpty(font.face)) {
            b.fontFace = font.face;
          }
          if (font.italic != null) {
            b.fontItalic = font.italic;
          }
        }

        applyOutlineParam(outline) {
          var b;
          if (outline == null) {
            return;
          }
          b = this.b();
          if (outline.width != null) {
            b.outlineWidth = outline.width;
          }
          if (!String.isNullOrEmpty(outline.color)) {
            b.outlineColor = outline.color;
          }
        }

        static FromImg(filename, sourceFolder) {
          var s;
          s = new KDCore.Sprite();
          s.bImg(filename, sourceFolder);
          return s;
        }

        static FromBitmap(w, h) {
          var s;
          s = new KDCore.Sprite();
          s.bNew(w, h);
          return s;
        }

        static FromTextSettings(settings) {
          var s;
          s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
          s.applyTextSettingsByExtraSettings(s, settings);
          s.textSettingsPosition = settings.position;
          return s;
        }

        // * Загрузчик из параметров плагина (безопасный)
        static FromParams(pluginParams) {
          var e, margins, s, size;
          try {
            size = pluginParams.size;
            s = KDCore.Sprite.FromBitmap(size.w, size.h);
            s.textSettingsPosition = pluginParams.alignment;
            margins = pluginParams.margins;
            if (margins != null) {
              s.move(margins.x, margins.y);
            }
            s.applyFontParam(pluginParams.font);
            s.applyOutlineParam(pluginParams.outline);
            if (!String.isNullOrEmpty(pluginParams.textColor)) {
              s.b().textColor = pluginParams.textColor;
            }
            if (pluginParams.visible != null) {
              s.visible = pluginParams.visible;
            }
            return s;
          } catch (error1) {
            e = error1;
            KDCore.warning('Something wrong with Text Settings!', e);
            return KDCore.Sprite.FromBitmap(60, 30);
          }
        }

      };

      return Sprite;

    }).call(this, Sprite);
    // * Button M
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

      // * Принимает название файла изображения кнопки без _00
    // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
    // * _02 - не используются в этом классе

      // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

      // * Если isFull - true, значит нужен _03
    KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
      constructor(filename, isFull = false, sourceFolder = null) {
        super();
        this._bitmaps = [];
        this._disabled = false;
        this._isTriggered = false;
        // * Когда произошло нажатие на кнопку
        this._handler = null;
        this._loadBitmaps(filename, isFull, sourceFolder);
        this._setImageState(0);
        this._createThread();
      }

      isMouseIn() {
        return this.inPosition(TouchInput);
      }

      isActive() {
        if (this.parent != null) {
          return this.parent.visible === true && this.visible === true;
        } else {
          return this.visible === true;
        }
      }

      isDisabled() {
        return this._disabled === true;
      }

      addClickHandler(_handler) {
        this._handler = _handler;
      }

      clearClickHandler() {
        return this._handler = null;
      }

      // * Воспроизводит визуальный эффект нажатия
      simulateClick() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.isMouseIn()) {
          return;
        }
        this._startSimulation();
      }

      isEnabled() {
        return !this.isDisabled();
      }

      refreshState(isEnable = true) {
        if (isEnable === true) {
          if (this.isDisabled()) {
            this.enable();
          }
        } else {
          if (this.isEnabled()) {
            this.disable();
          }
        }
      }

      disable() {
        this._disabled = true;
        return this._setImageState(2);
      }

      enable() {
        this._disabled = false;
        return this._setImageState(0);
      }

      click() {
        if (this._handler != null) {
          return this._handler();
        }
      }

      update() {
        super.update();
        return this._updateMain();
      }

    };
    (function() {      
      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ ButtonM Implementation
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
      //@[DEFINES]
      _ = KDCore.ButtonM.prototype;
      _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(filename + '_00'));
        this._bitmaps.push(getterFunc(filename + '_01'));
        if (isFull) {
          this._bitmaps.push(getterFunc(filename + '_03'));
        }
      };
      _._getGetter = function(sourceFolder = null) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder !== null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
          };
        }
        return getterFunc;
      };
      _._setImageState = function(index = 0) {
        if (this._bitmaps[index] == null) {
          index = 0;
        }
        this.bitmap = this._bitmaps[index];
        this._lastState = index;
      };
      _._createThread = function() {
        this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
        this.hoverThread.applyTimeRange(-1, 1);
        this.hoverThread.call();
      };
      //?[DYNAMIC]
      _._updateMain = function() {
        return this._updateMouseLogic();
      };
      _._updateMouseLogic = function() {
        this.hoverThread.update();
        return this._updateMouseClick();
      };
      _._updateHover = function() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        // * чтобы эффект нажатия не прекратить
        if (this._isTriggered === true) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._lastState !== 1) {
            this._setImageState(1);
            $gameTemp.kdButtonUnderMouse = this;
          }
        } else {
          if (this._lastState !== 0) {
            this._setImageState(0);
            if ($gameTemp.kdButtonUnderMouse === this) {
              $gameTemp.kdButtonUnderMouse = null;
            }
          } else if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseClick = function() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.isMouseIn()) {
          this._isTriggered = true;
          this._setImageState(0);
        }
        if (this._isTriggered === true) {
          if (TouchInput.isReleased()) {
            this._isTriggered = false;
            if (this.isMouseIn()) {
              this.click();
            }
          }
        }
      };
      _._startSimulation = function() {
        this._setImageState(1);
        this._simulateThread = new KDCore.TimedUpdate(10, () => {
          return this._setImageState(0);
        });
        this._simulateThread.once();
        return this._updateMain = this._updateMouseClickSimulated;
      };
      _._updateMouseClickSimulated = function() {
        this._simulateThread.update();
        if (!this._simulateThread.isAlive()) {
          this._simulateThread = null;
          this._updateMain = this._updateMouseLogic;
        }
      };
      // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

      //@[ALIAS]
      alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
      Scene_Map.prototype.isAnyButtonPressed = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {
          return true;
        } else {
          return alias_SM_isAnyButtonPressed.call(this);
        }
      };
      //@[ALIAS]
      alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
      Scene_Map.prototype.onMapLoaded = function() {
        $gameTemp.kdButtonUnderMouse = null;
        return alias_SM_onMapLoaded.call(this);
      };
    })();
    // ■ END ButtonM Implementation
    //---------------------------------------------------------------------------

      // * Button Mini User - класс с определением файла каждого состояния отдельно
    // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
    // ? states = { main, hover, disabled }
    KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
      constructor() {
        super(...arguments);
      }

      //$[OVER]
      _loadBitmaps(states, isFull = true, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(states.main));
        this._bitmaps.push(getterFunc(states.hover));
        // * Optional 03
        if (String.any(states.disabled)) {
          this._bitmaps.push(getterFunc(states.disabled));
        }
      }

    };
    
    //@[EXTENSION TO GLOBAL]
    //------------------------------------------------------------------------------
    KDCore.SDK = SDK;
    KDCore.Color = Color;
    KDCore.DevLog = DevLog;
    KDCore.Point = Point;
    KDCore.BitmapSrc = BitmapSrc;
    //? SOME KDCORE METHODS
    //--------------------------------------------------------------------------------
    KDCore.isMV = function() {
      return Utils.RPGMAKER_NAME.contains("MV");
    };
    KDCore.isMZ = function() {
      return !KDCore.isMV();
    };
    KDCore.warning = function(msg, error) {
      if (msg != null) {
        console.warn(msg);
      }
      if (error != null) {
        console.warn(error);
      }
    };
    //--------------------------------------------------------------------------------
    // MV TouchInput Extension =======================================================
    //--------------------------------------------------------------------------------

    // * Для совместимости MV и MZ
    //TouchInput.getMousePosition = -> new KDCore.Point(TouchInput.x, TouchInput.y)
    TouchInput.toMapPoint = function() {
      return this.toPoint().convertToMap();
    };
    //?SMouse better alternative
    (function() {
      var alias_SM_processMapTouch, alias_TIOMM;
      if (KDCore.isMZ()) {
        return;
      }
      
      // * Для ButtonM
      //@[ALIAS]
      alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
      Scene_Map.prototype.processMapTouch = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {

        } else {
          return alias_SM_processMapTouch.call(this);
        }
      };
      //@[ALIAS]
      alias_TIOMM = TouchInput._onMouseMove;
      TouchInput._onMouseMove = function(event) {
        var x, y;
        alias_TIOMM.call(this, event);
        x = Graphics.pageToCanvasX(event.pageX);
        y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
          return this._onHover(x, y);
        }
      };
      
      //?NEW, from MZ
      return TouchInput._onHover = function(_x, _y) {
        this._x = _x;
        this._y = _y;
      };
    })();
  })();
}

// ■ END KDCore.coffee
//---------------------------------------------------------------------------
//$[OVER]
//TouchInput.getMousePosition = ->
//    new KDCore.Point(TouchInput._x, TouchInput._y)


// * Загрузка и обработка параметров плагина
(function(){
    
    PKD_Lockpick.LoadPluginSettings = () => {

        var _ =  PKD_Lockpick;

        _.PARAMS = new KDCore.ParamLoader("LockpickItemId:i");

        var __ = _.PARAMS;

        // * SOUND EFFECTS
        _.PARAMS.getLockItemHitSound = () => __.getParam("LockItemHitSound", "");
        _.PARAMS.getLockItemLockedSound = () => __.getParam("ItemLockedSound", "");
        _.PARAMS.getLockpickBrokeSound = () => __.getParam("LockpickBrokeSound", "");
        _.PARAMS.getOnBarLockedSound = () => __.getParam("LockItemLockedByBarSound", "");
        _.PARAMS.getLockpickResultBadSound = () => __.getParam("GameResultBadSound", "");
        _.PARAMS.getLockpickResultGoodSound = () => __.getParam("GameResultGoodSound", "");
    
        // * VISUALS

        _.PARAMS.getLockBarText = () => __.getParam("LockBarText", {
                visible: true,
                size: { w: 60, h: 22 },
                alignment: "center",
                font: { face: null, size: 16, italic: false },
                margins: { x: 2, y: 9 },
                outline: { color: null, width: 2 },
                textColor: "#FFFFFF".toCss()
            });

        _.PARAMS.getLockBarGaugeSettings = () => __.getParam("LockBarGauge", {
                visible: true,
                fill: "LockBarGauge",
                foreground: "",
                mask: "",
                backColor: "#000000".toCss(),
                backOpacity: 190,
                vertical: false,
                margins: { x: 4, y: 11 }
            });

        _.PARAMS.getLockPickCountText = () =>  __.getParam("LockPickText", {
                visible: true,
                size: { w: 60, h: 40 },
                alignment: "left",
                font: { face: null, size: 24, italic: false },
                margins: { x: 304, y: 146 },
                outline: { color: null, width: 2 },
                textColor: "#FFFFFF".toCss()
            });

        _.PARAMS.showAnimatedHelpKey = () => __.getParam("showAnimatedHelpKey", true);
        _.PARAMS.getHelpKeyAnimationSpeed = () => __.getParam("helpKeyAnimationSpeed", 8);
        _.PARAMS.showHelpImage = () => __.getParam("showHelpTextLine", true);


        // * MAIN

        _.PARAMS.getResultSwitchId = () => __.getParam("ResultSwitchId", 1);
        _.PARAMS.getLockpickItemId = () => __.getParam("LockpickItemId", 1);


        //?{version}
        _.PARAMS.getProfileData = (index) => {
            if(index <= 0) {
                return null;
            }
            // * -1 потому что начинаются в массиве с 0, но в редакторе параметров с 1
            let items = __.getParam("LocksData", []);
            if(items[index - 1]) {
                return items[index - 1];
            }
            return null;
        };


        if(KDCore.isMZ()) {
            // * На всяких случай два названия
            RegisterPluginCommnadsMZ('PKD_Lockpick');
            RegisterPluginCommnadsMZ('PKD_Lockpick_MZ');
        }
        else {
            RegisterPluginCommandsMV();
        }

    };

    RegisterPluginCommnadsMZ = (pluginName) => {

        PluginManager.registerCommand(pluginName, 'StartLockpicking', args => {
            try {
                let profileIndex = parseInt(args.profileIndex);
                if(CheckBeforeGame(profileIndex)) {
                    $gameTemp.__lockPickProfileId = profileIndex;
                    SceneManager.push(Scene_PKDLockPick);
                }
            } catch (e) {
                console.warn(e);
            }
        });

    };

    //  * Проверка условий для запуска игры
    CheckBeforeGame = (profileIndex) => {
        if(!$gameParty.haveAnyLockpicks()) {
            console.warn("PKD_Lockpick: You try start lockpicking game without lockpics in inventory!");
            return false;
        }
        if(!PKD_Lockpick.PARAMS.getProfileData(profileIndex)) {
            var msg = "PKD_Lockpick: Profile " + profileIndex + " is missed (Locks profiles in plugin parameter)";
            console.warn(msg);
            window.alert(msg);
            return false;
        }
        var data = PKD_Lockpick.PARAMS.getProfileData(profileIndex);
        if(!data.items) {
            var msg2 = "PKD_Lockpick: Profile " + profileIndex + " not have Lock items!";
            console.warn(msg2);
            window.alert(msg2);
            return false;
        }
        if(data.items.length <= 0) {
            var msg3 = "PKD_Lockpick: Profile " + profileIndex + " not have any Lock item!";
            console.warn(msg3);
            window.alert(msg3);
            return false;
        }
        return true;
    };

    RegisterPluginCommandsMV = () => {
        //@[ALIAS]
        var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            _Game_Interpreter_pluginCommand_3434.call(this, command, args);
            if (command === 'StartLockpicking') {
                try {
                    var profileIndex = parseInt(args[0]);
                    if(CheckBeforeGame(profileIndex)) {
                        $gameTemp.__lockPickProfileId = profileIndex;
                        SceneManager.push(Scene_PKDLockPick);
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        };
    };

})();
// Generated by CoffeeScript 2.5.1
// * Общий класс для всех UI элементов
//?rev 13.10.20
(function() {
  var Sprite_UIElement;
  Sprite_UIElement = (function() {
    // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
    //@[ABSTRACT]
    class Sprite_UIElement extends KDCore.Sprite {
      constructor(params) {
        super();
        this.params = params;
        this._init();
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true
        };
      }

      // * Общий метод (есть у всех элементов)
      // * По умолчанию вызывает drawText, но потомки могут переопределить
      draw() {
        return this.drawText(...arguments);
      }

      // * Общий метод
      drawText() {} // * EMPTY

      
        // * Если изначально невидимый (из параметров), то не активный вообще
      isActive() {
        return this.params.visible === true;
      }

      rootImageFolder() {
        return Sprite_UIElement.RootImageFolder;
      }

      // * Сделать чёрно белым
      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      // * Общий метод (можно ли редактировать визуально)
      isCanBeEdited() {
        return false;
      }

      // * Общий метод (надо ли скрывать при игровом сообщнии)
      isHaveHideWithMessageFlag() {
        return false;
      }

      // * Общий метод (находится ли объект под мышкой)
      isUnderMouse() {
        var ref;
        return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
      }

      // * Параметры первого элемента (если он есть)
      realWidth() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_Lockpick.LIBS.Sprite_UIElement) {
            return child.realWidth();
          } else {
            return child.width;
          }
        }
        return 0;
      }

      realHeight() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_Lockpick.LIBS.Sprite_UIElement) {
            return child.realHeight();
          } else {
            return child.height;
          }
        }
        return 0;
      }

      // * Первый "физический" элемент (спрайт)
      zeroChild() {
        return this.children[0];
      }

      // * Метод восстановления значения на стандартные настройки
      reset(property) {
        var e;
        try {
          switch (property) {
            case "position":
              this._resetPosition();
              break;
            default:
              this[property] = this.params[property];
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

    };

    // * Корневая директория для изображений
    Sprite_UIElement.RootImageFolder = "pLockpick";

    return Sprite_UIElement;

  }).call(this);
  PKD_Lockpick.register(Sprite_UIElement);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_Lockpick.LIBS.Sprite_UIElement.prototype;
  _._init = function() {
    var e;
    this._prepare();
    try {
      return this._createContent();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если при создании произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  
  // * Подготовка элемента (проверка параметров)
  _._prepare = function() {
    if (this.params == null) {
      this.params = this.defaultParams();
    }
    return this.visible = this.params.visible;
  };
  // * Наследники создают свои элементы в этом методе
  _._createContent = function() {}; // * EMPTY
  
  // * Сброс позиции
  _._resetPosition = function() {
    var x, y;
    ({x, y} = this.params.position);
    this.move(x, y);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_UIGauge;
  Sprite_UIGauge = class Sprite_UIGauge extends PKD_Lockpick.LIBS.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        visible: true,
        fill: "",
        foreground: "",
        mask: "",
        backColor: "#000000".toCss(),
        backOpacity: 255,
        vertical: false
      };
    }

    draw() {
      return this.drawGauge(...arguments);
    }

    drawGauge(percent = 1) {
      this._lastValue = percent;
      return this._drawGauge(percent);
    }

    isVertical() {
      return this.params.vertical === true;
    }

  };
  PKD_Lockpick.register(Sprite_UIGauge);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_Lockpick.LIBS.Sprite_UIGauge.prototype;
  //$[OVER]
  _._createContent = function() {
    // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
    return this._loadFillImage();
  };
  _._loadFillImage = function() {
    // * Главное изображение, поэтому если не указано, то ничего
    if (this.params.fill.isEmpty()) {
      KDCore.warning('You try create Gauge without fill image');
      return;
    }
    KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
  };
  // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
  _._createParts = function(fillBitmap) {
    this.fillBitmap = fillBitmap;
    this._createBackground();
    this._createFillLayer();
    this._loadForeground();
    this._loadMask();
    return this._onReady();
  };
  _._createBackground = function() {
    this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
    this.background.b().fillAll(this.params.backColor);
    this.background.opacity = this.params.backOpacity;
    return this.add(this.background);
  };
  _._createFillLayer = function() {
    this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
    return this.add(this.fillLayer);
  };
  _._loadForeground = function() {
    var fore;
    if (String.isNullOrEmpty(this.params.foreground)) {
      return;
    }
    fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
    return this.add(fore);
  };
  _._loadMask = function() {
    var mask;
    if (String.isNullOrEmpty(this.params.mask)) {
      return;
    }
    mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
    this.mask = mask;
    return this.add(mask);
  };
  // * Если что-то было до готовности, нарисовать
  _._onReady = function() {
    this.drawGauge(this._lastValue);
  };
  _._drawGauge = function(percent) {
    if (this.fillLayer == null) {
      return;
    }
    this.fillLayer.clear();
    if (this.isVertical()) {
      return this._drawVerGauge(percent);
    } else {
      return this._drawHorGauge(percent);
    }
  };
  _._drawHorGauge = function(percent) {
    var w;
    w = this.fillBitmap.width * percent;
    return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
  };
  _._drawVerGauge = function(percent) {
    var h, hy;
    h = this.fillBitmap.height * percent;
    hy = this.fillBitmap.height - h;
    this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_UIText;
  Sprite_UIText = class Sprite_UIText extends PKD_Lockpick.LIBS.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        visible: true,
        size: {
          w: 60,
          h: 20
        },
        alignment: "center",
        font: {
          face: null,
          size: 18,
          italic: false
        },
        margins: {
          x: 0,
          y: 0
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#FFFFFF".toCss()
      };
    }

    //?DYNAMIC
    // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
    drawText(text) {
      return this._drawTextWhenReady(text);
    }

    
      // * Пишет текст с определённым цветом (один раз)
    drawTextColor(text, colorCss) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.b().textColor = colorCss;
      this.drawText(text);
      this._textSpr.b().textColor = this.params.textColor;
    }

  };
  PKD_Lockpick.register(Sprite_UIText);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_Lockpick.LIBS.Sprite_UIText.prototype;
  //$[OVER]
  _._createContent = function() {
    return this._createTextSprite();
  };
  _._createTextSprite = function() {
    this._textSpr = KDCore.Sprite.FromParams(this.params);
    this._textSpr.onReady(this._onReady.bind(this));
    return this.add(this._textSpr);
  };
  // * Выполнить по готовности
  _._onReady = function() {
    // * Переключить метод, так как уже готов
    this.drawText = this._drawText;
    // * Написать то что нужно было до готовности (если есть)
    if (this._drawOnReady == null) {
      return;
    }
    this.drawText(this._drawOnReady);
    this._drawOnReady = null;
  };
  _._drawText = function(text) {
    if (this._textSpr == null) {
      return;
    }
    this._textSpr.clear();
    if (text != null) {
      this._textSpr.drawTextFull(text);
    }
  };
  // * Написать текст когда будет готов
  _._drawTextWhenReady = function(text) {
    this._drawOnReady = text;
    return this._drawText(text);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AnimatedImage.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    function AnimatedImage() {
        this.initialize.apply(this, arguments);
    }

    PKD_Lockpick.register(AnimatedImage);

    AnimatedImage.prototype = Object.create(Sprite.prototype);
    AnimatedImage.prototype.constructor = AnimatedImage;

    AnimatedImage.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
        this._wait = 0;
        this._looping = false;
        this._frameIndex = -1;
        this._animSprites = [];
        this._paused = false;
    };

    var _ = AnimatedImage.prototype;

    //?[NEW]
    _.addImages = function (bitmaps) {
        var f = function(b) {
            var s = new Sprite(b);
            this._animSprites.push(s);
            s.visible = false;
            this.addChild(s);
        };
        bitmaps.forEach(f.bind(this));
    };

    //?[NEW]
    _.play = function (speed, loop) {
        this._looping = loop;
        this._maxWait = speed;
        if (this._animSprites.length > 0)
            this._frameIndex = 0;
    };

    //?[NEW]
    _.update = function () {
        Sprite.prototype.update.call(this);
        try {
            if (this._frameIndex >= 0 && this._wait == 0) {
                this.showNextFrame();
                this._frameIndex++;
                this._wait = 1;
            }
            if (this._wait > 0) {
                if (this._paused == false)
                    this._wait++;
                if (this._wait > this._maxWait)
                    this._wait = 0;
            }
            if (this._frameIndex == this._animSprites.length) {
                this._wait = 1;
                if (this._looping == true) {
                    this._frameIndex = 0;
                } else {
                    //Stop at last frame
                    this._frameIndex = -1;
                }
            }
        } catch (e) {
            console.warn(e, ' while update animation frame');
        }
    };

    //?[NEW]
    _.showNextFrame = function () {
        this._animSprites.forEach(function(s) {
            s.visible = false;
        });
        if (this._frameIndex >= 0) {
            if (this._frameIndex < this._animSprites.length)
                this._animSprites[this._frameIndex].visible = true;
        }
    };

    //?[NEW]
    _.pause = function () {
        this._paused = !this._paused;
    };
})();
// ■ END AnimatedImage.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
(function(){
    
    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_Lockpick.LoadPluginSettings();
        _alias_DataManager_loadDatabase.call(this);
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.haveAnyLockpicks = function() {
    var itemId;
    itemId = PKD_Lockpick.PARAMS.getLockpickItemId();
    return this.numItems($dataItems[itemId]) > 0;
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ LockBar.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LockBar;
  LockBar = class LockBar extends Sprite {
    constructor(imageName) {
      super(ImageManager.loadPKDLockpickImage(imageName));
      this._initValues();
      this._createDurabilityGaugeSprite();
      this._createDurabilityTextSprite();
      this._drawDurability();
    }

    _initValues() {
      this._totalDamage = 0;
      this._health = 100;
      this._maxHealth = 100;
      return this._timer = 0;
    }

    _createDurabilityGaugeSprite() {
      var params;
      params = PKD_Lockpick.PARAMS.getLockBarGaugeSettings();
      this._gauge = new PKD_Lockpick.LIBS.Sprite_UIGauge(params);
      this._gauge.x = params.margins.x;
      this._gauge.y = params.margins.y;
      return this.addChild(this._gauge);
    }

    _createDurabilityTextSprite() {
      this._textSpr = new PKD_Lockpick.LIBS.Sprite_UIText(PKD_Lockpick.PARAMS.getLockBarText());
      return this.addChild(this._textSpr);
    }

    _drawDurability() {
      var percent;
      percent = 100 * this._health / this._maxHealth;
      if (percent > 100) {
        percent = 100;
      }
      if (percent < 0) {
        percent = 0;
      }
      this._textSpr.drawText((~~percent) + "%");
      this._gauge.draw(percent / 100);
    }

    setHealth(_maxHealth, _skill) {
      this._maxHealth = _maxHealth;
      this._skill = _skill;
      this._health = this._maxHealth;
      return this._drawDurability();
    }

    moveToNextPosition() {
      return this.move(this.x + 40, this.y);
    }

    addDamageValue(value) {
      return this._totalDamage += value;
    }

    isBroken() {
      return this._health <= 0;
    }

    stop() {
      return this._timer = null;
    }

    _getDamageValue() {
      return this._totalDamage;
    }

    //? Навык взлома игрока
    /*if @_skill >= 90
        return @_totalDamage * 0.1
    else
        if @_skill == 0
            return @_totalDamage
        else
            return @_totalDamage * ((100 - @_skill) / 100)*/
    update() {
      super.update();
      if (this._timer == null) {
        return;
      }
      this._timer += 1;
      if (this._timer >= 60) {
        this._timer = 0;
        this._health -= this._getDamageValue();
        return this._drawDurability();
      }
    }

  };
  PKD_Lockpick.register(LockBar);
})();

// ■ END LockBar.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ LockpickItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LockpickItems;
  LockpickItems = class LockpickItems {
    constructor(position, data1) {
      this.position = position;
      this.data = data1;
      this._sprites = [];
      this.resetBools();
      this._currentIndex = 0;
      this._soundPlayTimer = 0;
      this._lockTimer = 0;
      this._dy = 60;
      this._createItems();
      return;
    }

    resetBools() {
      this._isMovingUp = false;
      this._isMovingDown = false;
      this._isLocked = false;
      this._isHardLocked = false;
    }

    _createItems() {
      var i, j, l, ref;
      l = this.data.length;
      for (i = j = 0, ref = l; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        this._createItem(i);
      }
    }

    _createItem(index) {
      var _lockItem;
      _lockItem = new Sprite(ImageManager.loadPKDLockpickImage(this.data[index].img));
      this._moveAtHome(_lockItem, index);
      this._sprites.push(_lockItem);
    }

    _moveAtHome(item, index) {
      item.move(this.position);
      return item.x += 40 * index;
    }

    placeItemsTo(sprite) {
      var item, j, len, ref, results;
      ref = this._sprites;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        results.push(sprite.addChild(item));
      }
      return results;
    }

    updateAtIndex(lockPickY, index) {
      var dy, item;
      this._currentIndex = index;
      item = this._sprites[index];
      dy = item.y + item.height;
      if (lockPickY <= dy) {
        if (this._isLocked !== true) {
          this._startMoveUp();
        }
      }
      this._updateMovingUp();
      this._updateMovingDown();
      this._updateLockedTime();
      if (this._soundPlayTimer > 0) {
        this._soundPlayTimer -= 1;
      }
      return item.update();
    }

    _startMoveUp() {
      if (this._soundPlayTimer === 0) {
        KDCore.Utils.playSE(PKD_Lockpick.PARAMS.getLockItemHitSound());
      }
      this._soundPlayTimer = 10;
      this._isMovingUp = true;
      return this._isMovingDown = false;
    }

    _updateMovingUp() {
      var data, item;
      if (this._isMovingUp === false) {
        return;
      }
      item = this._sprite();
      data = this._dataItem();
      if (item.y > (this.position.y - this._dy)) {
        return item.y -= data.speed;
      } else {
        return this._startMoveDown();
      }
    }

    _updateMovingDown() {
      var data, item;
      if (this._isMovingDown === false) {
        return;
      }
      item = this._sprite();
      data = this._dataItem();
      if (item.y < this.position.y) {
        return item.y += data.fallSpeed;
      } else {
        return this._reset(this._currentIndex);
      }
    }

    _sprite() {
      return this._sprites[this._currentIndex];
    }

    _dataItem() {
      return this.data[this._currentIndex];
    }

    _startMoveDown() {
      this._isMovingUp = false;
      return this._isMovingDown = true;
    }

    _reset(index) {
      this._moveAtHome(this._sprites[index], index);
      return this.resetBools();
    }

    _updateLockedTime() {
      if (this._isLocked === false) {
        return;
      }
      if (this._isHardLocked === true) {
        return;
      }
      this._lockTimer -= 1;
      if (this._lockTimer <= 0) {
        this._lockTimer = 0;
        this._isLocked = false;
        return this._startMoveDown();
      }
    }

    inProperPosition() {
      var data, item, posA, posB, posX;
      posX = this.position.y - this._dy;
      item = this._sprite();
      data = this._dataItem();
      posA = posX - data.stepPx;
      posB = posX + data.stepPx;
      return item.y >= posA && item.y <= posB;
    }

    isProperLocked() {
      return this.inProperPosition() && this._isLocked === true;
    }

    isMoving() {
      return this._isMovingUp === true || this._isMovingDown === true;
    }

    lock() {
      this._reset(this._currentIndex);
      this._sprite().y = this.position.y - this._dy;
      this._isLocked = true;
      return this._lockTimer = this._dataItem().lockTime;
    }

    hardLock() {
      return this._isHardLocked = true;
    }

    nextIndex() {
      this._currentIndex++;
      return this._reset(this._currentIndex);
    }

  };
  PKD_Lockpick.register(LockpickItems);
})();

// ■ END LockpickItems.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//#
window.StartLockpicking = function() {
  return SceneManager.push(Scene_PKDLockPick);
};

// Generated by CoffeeScript 2.5.1
var Scene_PKDLockPick;

Scene_PKDLockPick = class Scene_PKDLockPick extends Scene_Base {
  constructor() {
    super();
    this.initSystem();
  }

  //TODO: План разработки:
  // Тесты MV и MZ
  initSystem() {
    this.profileId = $gameTemp.__lockPickProfileId;
    this.profileData = this.loadProfile(); //?{version}
    // * Индекс элемента замка текущий
    this._currentIndex = 0;
    this._isPaused = false;
    this._complete = false;
    this._isWaitEndMessage = false;
    this._lockPickGameResult = false;
    this.resultSwitchId = PKD_Lockpick.PARAMS.getResultSwitchId();
    // * Сброс на старте
    $gameSwitches.setValue(this.resultSwitchId, false);
  }

  isValidProfile() {
    return false;
  }

  hideCursor() {
    return document.body.style.cursor = 'none';
  }

  showCursor() {
    return document.body.style.cursor = 'default';
  }

  //? Возможность играть без LockBar
  isNoLockBar() {
    return this.profileData.gameMode === 1;
  }

  create() {
    super.create();
    this.hideCursor();
    if (KDCore.isMV()) {
      Scene_MenuBase.prototype.createBackground.call(this);
    } else {
      this.createTransparentBackground(); //0
    }
    this.createSceneBackground(); //0
    this.createLockBackLayer(); //0
    this.createLockItemsLayer(); //0
    this.createLockForeLayer(); //0
    this.createLockElements(); //0
    this.createLockPickCountText(); //0
    this.createBarHelpKey(); //0
    this.createHelp();
    return this.startConfiguration();
  }

  setBackgroundOpacity() {
    return Scene_MenuBase.prototype.setBackgroundOpacity.call(this, ...arguments);
  }

  startConfiguration() {
    this._minimumDY = this.profileData.lockPickMargin.y;
    this._maximumDY = this._minimumDY - 50;
    this._lastMousePos = this._minimumDY;
    //? From variable?
    this.lockBar.setHealth(50);
  }

  update() {
    super.update();
    if (this.isExit()) {
      if (this._isWaitEndMessage !== true) {
        this.popScene();
      }
      return;
    }
    if (this._lockpickSwing != null) {
      //if(TouchInput.isTriggered())
      //    console.table [TouchInput.x, TouchInput.y]
      this.updateLockpickFadeAnimation(); //3
    }
    if (this._notifyMessageSwing != null) {
      this.updateGameEndMessage(); // 3
    }
    if (this._complete === true) {
      return;
    }
    if (this._isPaused === true) {
      return;
    }
    this.updateLockPickMouse(); //1
    this.updateLockItems(); //1
    this.updateLockItemClickAt(); //1
    // * Может быть после одного из этих методов снова
    if (this._isPaused === true) {
      return;
    }
    this.updateLockBar(); //1
  }

  isExit() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  }

  stop() {
    super.stop();
    return this.showCursor();
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_PKDLockPick.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_PKDLockPick.prototype;
  _.createTransparentBackground = function() {
    this._backgroundFilter = new PIXI.filters.BlurFilter();
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._backgroundSprite.filters = [this._backgroundFilter];
    this.addChild(this._backgroundSprite);
    this._backgroundSprite.opacity = 192;
  };
  _.createSceneBackground = function() {
    var img;
    if (!String.any(this.profileData.backgroundImage)) {
      return;
    }
    img = ImageManager.loadPKDLockpickImage(this.profileData.backgroundImage);
    this.backBack = new Sprite(img);
    img.addLoadListener(() => {
      return this.backBack.moveToCenter(Graphics.width / 2, Graphics.height / 2);
    });
    return this.addChild(this.backBack);
  };
  _.createLockBackLayer = function() {
    var img;
    img = ImageManager.loadPKDLockpickImage(this.profileData.lockpickBackImg);
    this.lockBackLayer = new Sprite(img);
    img.addLoadListener(() => {
      return this.lockBackLayer.moveToCenter(Graphics.width / 2, Graphics.height / 2);
    });
    return this.addChild(this.lockBackLayer);
  };
  _.createLockItemsLayer = function() {
    this.lockItemsLayer = new Sprite();
    this._lockItemsCntr = new PKD_Lockpick.LIBS.LockpickItems(this.profileData.lockItemsMargin, this.profileData.items);
    this._lockItemsCntr.placeItemsTo(this.lockItemsLayer);
    return this.lockBackLayer.addChild(this.lockItemsLayer);
  };
  _.createLockForeLayer = function() {
    var img;
    img = ImageManager.loadPKDLockpickImage(this.profileData.lockpickForeImg);
    this.lockForeLayer = new Sprite(img);
    img.addLoadListener(() => {
      return this.lockForeLayer.moveToCenter(Graphics.width / 2, Graphics.height / 2);
    });
    return this.addChild(this.lockForeLayer);
  };
  _.createLockElements = function() {
    this.createLockBar();
    return this.createLockPick();
  };
  _.createLockBar = function() {
    this.lockBar = new PKD_Lockpick.LIBS.LockBar(this.profileData.lockBarImg);
    this.lockBar.x = this.profileData.lockBarMargin.x;
    this.lockBar.y = this.profileData.lockBarMargin.y;
    return this.lockBackLayer.addChild(this.lockBar);
  };
  _.createLockPick = function() {
    var img;
    img = ImageManager.loadPKDLockpickImage("Lockpick");
    this._lockpick = new Sprite(img);
    this._lockpick.x = this.profileData.lockPickMargin.x;
    this._lockpick.y = this.profileData.lockPickMargin.y;
    return this.lockBackLayer.addChild(this._lockpick);
  };
  _.createLockPickCountText = function() {
    this._lpicTextSpr = new PKD_Lockpick.LIBS.Sprite_UIText(PKD_Lockpick.PARAMS.getLockPickCountText());
    return this.lockForeLayer.addChild(this._lpicTextSpr);
  };
  _.createBarHelpKey = function() {
    var img1, img2, img3, speed;
    this._helpKeySprite = new PKD_Lockpick.LIBS.AnimatedImage();
    if (PKD_Lockpick.PARAMS.showAnimatedHelpKey() === true) {
      img1 = ImageManager.loadPKDLockpickImage("HelpKeyAnimation_00");
      img2 = ImageManager.loadPKDLockpickImage("HelpKeyAnimation_01");
      img3 = ImageManager.loadPKDLockpickImage("HelpKeyAnimation_02");
      this._helpKeySprite.addImages([img1, img2, img3]);
      this._helpKeySprite.x = this.profileData.helpKeyImagePosition.x;
      this._helpKeySprite.y = this.profileData.helpKeyImagePosition.y;
      speed = PKD_Lockpick.PARAMS.getHelpKeyAnimationSpeed();
      this._helpKeySprite.play(speed, true);
    }
    this._helpKeySprite.visible = false;
    return this.lockForeLayer.addChild(this._helpKeySprite);
  };
  _.createHelp = function() {
    var img;
    if (!PKD_Lockpick.PARAMS.showHelpImage()) {
      return;
    }
    img = ImageManager.loadPKDLockpickImage("Help");
    this._helpLineSpr = new Sprite(img);
    this._helpLineSpr.x = this.profileData.helpImagePosition.x;
    this._helpLineSpr.y = this.profileData.helpImagePosition.y;
    return this.lockForeLayer.addChild(this._helpLineSpr);
  };
})();

// ■ END Scene_PKDLockPick.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_PKDLockPick.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_PKDLockPick.prototype;
  _.updateLockPickMouse = function() {
    var dy, m;
    if (KDCore.isMZ()) {
      m = TouchInput;
    } else {
      m = new KDCore.Point(TouchInput._x, TouchInput._y);
    }
    if (this._lastMousePos > m.y) { //UP
      dy = Math.abs(this._lastMousePos - m.y);
      if (this._lockpick.y - dy < this._maximumDY) {
        dy = 1;
      }
      if (this._lockpick.y > this._maximumDY) {
        this._lockpick.y = this._lockpick.y - dy;
      }
      this._lastMousePos = m.y;
    }
    if (this._lastMousePos < m.y) {
      dy = Math.abs(this._lastMousePos - m.y);
      if (dy + this._lockpick.y > this._minimumDY) {
        dy = 1;
      }
      if (this._lockpick.y < this._minimumDY) {
        this._lockpick.y = this._lockpick.y + dy;
      }
      this._lastMousePos = m.y;
    }
    this._lockpick.update(); // * for smooth movement
    this.updateLockPickCountText();
  };
  _.updateLockItems = function() {
    return this._lockItemsCntr.updateAtIndex(this._lockpick.y, this._currentIndex);
  };
  _.updateLockItemClickAt = function() {
    if (TouchInput.isTriggered()) {
      if (this._lockItemsCntr.isProperLocked()) {
        return;
      }
      if (this._lockItemsCntr.inProperPosition()) {
        this._lockItemsCntr.lock();
        this._showBarHelp(); //2
        KDCore.Utils.playSE(PKD_Lockpick.PARAMS.getLockItemLockedSound());
      } else {
        if (this._lockItemsCntr.isMoving()) { //2
          this._brokeLockpick();
        }
      }
    }
    if (!this._lockItemsCntr.isProperLocked()) { //2
      return this._hideBarHelp();
    }
  };
  _.updateLockBar = function() {
    if (Input.isTriggered('ok')) {
      this.onBarButtonTriggered(); //2
    }
    if (this.lockBar.isBroken()) {
      this.onBarIsBroken(); //2
    }
  };
  _.updateLockPickCountText = function() {
    return this._lpicTextSpr.draw(this._getLockPickCount());
  };
})();

// ■ END Scene_PKDLockPick.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_PKDLockPick.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_PKDLockPick.prototype;
  _._showBarHelp = function() {
    return this._helpKeySprite.visible = true;
  };
  _._hideBarHelp = function() {
    return this._helpKeySprite.visible = false;
  };
  _.onBarButtonTriggered = function() {
    if (!this._lockItemsCntr.isProperLocked()) {
      return;
    }
    KDCore.Utils.playSE(PKD_Lockpick.PARAMS.getOnBarLockedSound());
    this._lockItemsCntr.hardLock();
    this._hideBarHelp();
    this.lockBar.moveToNextPosition();
    this._toNextIndex();
  };
  _._toNextIndex = function() {
    this._currentIndex++;
    if (this.profileData.items.length === this._currentIndex) {
      this._complete = true;
      this._lockpick.visible = false;
      this.lockBar.stop();
      return this._onLockpickingEndGood();
    } else {
      this._lockItemsCntr.nextIndex();
      this.lockBar.addDamageValue(this._prevLockItem().damage);
      return this._resetLockpickPosition();
    }
  };
  _._prevLockItem = function() {
    return this.profileData.items[this._currentIndex - 1];
  };
  _.onBarIsBroken = function() {
    this._complete = true;
    this.lockBar.stop();
    return this._onLockpickingEndBad();
  };
  _._consumeLockpick = function() {
    var item;
    item = this._getLockPickItem();
    $gameParty.gainItem(item, -1);
  };
  _._getLockPickCount = function() {
    var item;
    item = this._getLockPickItem();
    return $gameParty.numItems(item);
  };
  _._pauseGame = function() {
    return this._isPaused = true;
  };
  _._isHasAnyLockpick = function() {
    return this._getLockPickCount() > 0;
  };
  _._getLockPickItem = function() {
    var item, itemId;
    itemId = PKD_Lockpick.PARAMS.getLockpickItemId();
    item = $dataItems[itemId];
    return item;
  };
  _._resetLockpickPosition = function() {
    this._lockpick.x = this.profileData.lockPickMargin.x;
    this._lockpick.y = this.profileData.lockPickMargin.y;
    this._lockpick.x = this._lockpick.x + (40 * this._currentIndex);
  };
  _._brokeLockpick = function() {
    KDCore.Utils.playSE(PKD_Lockpick.PARAMS.getLockpickBrokeSound());
    this._hideBarHelp();
    this._consumeLockpick();
    this._pauseGame();
    this._resetLockpickPosition();
    this._lockItemsCntr._reset(this._currentIndex);
    return this._checkPlayerLockpickCount();
  };
  _._checkPlayerLockpickCount = function() {
    var f;
    if (this._isHasAnyLockpick()) {
      this._animateFadeLockpick(); //3
      f = function() {
        try {
          return this._isPaused = false;
        } catch (error) {

        }
      };
      return setTimeout(f.bind(this), 500);
    } else {
      this._complete = true;
      this._lockpick.visible = false;
      return this._onLockpickingEndBad();
    }
  };
  _._onLockpickingEndBad = function() {
    KDCore.Utils.playSE(PKD_Lockpick.PARAMS.getLockpickResultBadSound());
    this._lockPickGameResult = false;
    this.createGameEndMessage('Fail');
    return this.showEndMessage();
  };
  _._onLockpickingEndGood = function() {
    KDCore.Utils.playSE(PKD_Lockpick.PARAMS.getLockpickResultGoodSound());
    this._lockPickGameResult = true;
    this.createGameEndMessage('Complete');
    return this.showEndMessage();
  };
  _._onLockpickGameAfterEndMessage = function() {
    $gameSwitches.setValue(this.resultSwitchId, this._lockPickGameResult);
    return this.popScene();
  };
})();

// ■ END Scene_PKDLockPick.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_PKDLockPick.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_PKDLockPick.prototype;
  _._animateFadeLockpick = function() {
    this._lockpickSwing = new PKD_Lockpick.LIBS.ValueSwing(this._lockpick, "opacity", 50);
    this._lockpick.visible = true;
    this._lockpick.opacity = 255;
    this._lockpickSwing.setIncrementMode();
    return this._lockpickSwing.start();
  };
  _.updateLockpickFadeAnimation = function() {
    if (this._lockpickSwing != null) {
      this._lockpickSwing.update();
      if (this._lockpickSwing.isReady()) {
        return this._lockpickSwing = null;
      }
    }
  };
  _.createGameEndMessage = function(picName) {
    var pos;
    this._notifyMessage = new Sprite(ImageManager.loadPKDLockpickImage(picName));
    this._notifyMessage.scale.x = 0.76;
    this._notifyMessage.scale.y = 0.76;
    this._notifyMessage.anchor.x = 0.5;
    this._notifyMessage.anchor.y = 0.5;
    this._notifyMessage.visible = false;
    pos = this.profileData.notifyMessagePosition;
    this._notifyMessage.move(pos.x, pos.y);
    return this.lockForeLayer.addChild(this._notifyMessage);
  };
  _.showEndMessage = function() {
    this._notifyMessageSwing = new PKD_Lockpick.LIBS.ValueSwing(this._notifyMessage, "opacity", 50);
    this._notifyMessage.visible = true;
    this._notifyMessage.opacity = 255;
    this._notifyMessageSwing.setIncrementMode();
    this._notifyMessageSwing.start();
    return this._isWaitEndMessage = true;
  };
  _.onEndMessageComplete = function() {
    var f;
    this._notifyMessageSwing = null;
    f = function() {
      var e, ref;
      try {
        this._isWaitEndMessage = false;
        if ((ref = this._notifyMessage) != null) {
          ref.visible = false;
        }
        return this._onLockpickGameAfterEndMessage(); //2
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    return setTimeout(f.bind(this), 1000);
  };
  _.updateGameEndMessage = function() {
    if (this._notifyMessageSwing != null) {
      this._notifyMessageSwing.update();
      if (this._notifyMessage.scale.x < 1.04) {
        this._notifyMessage.scale.x += 0.012;
        this._notifyMessage.scale.y += 0.012;
      }
      if (this._notifyMessageSwing.isReady()) {
        return this.onEndMessageComplete();
      }
    }
  };
})();

// ■ END Scene_PKDLockPick.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ValueSwing.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ValueSwing;
  ValueSwing = class ValueSwing {
    constructor(swingObject, fieldName, time) {
      this.swingObject = swingObject;
      this.fieldName = fieldName;
      this.mode = 1;
      this._repeat = false;
      this._ready = false;
      this._started = false;
      this._config = {
        start: this.getValue(),
        step: this.getValue() / time
      };
      this._refreshConfig();
    }

    getValue() {
      return this.swingObject[this.fieldName];
    }

    _refreshConfig() {
      if (this.isIncrement()) {
        this._config.toValue = this._config.start;
        this._config.fromValue = 0;
      } else {
        this._config.toValue = 0;
        this._config.fromValue = this._config.start;
      }
      return this.setValue(this._config.fromValue);
    }

    isIncrement() {
      return this.mode === 0;
    }

    setValue(value) {
      return this.swingObject[this.fieldName] = value;
    }

    start() {
      this._ready = false;
      return this._started = true;
    }

    reset() {
      this._ready = true;
      return this.setValue(this._config.start);
    }

    stop() {
      return this._started = false;
    }

    isStarted() {
      return this._started === true;
    }

    isReady() {
      return this._ready === true;
    }

    setIncrementMode() {
      this.mode = 0;
      this.stop();
      return this._refreshConfig();
    }

    setDecrementMode() {
      this.mode = 1;
      this.stop();
      return this._refreshConfig();
    }

    setRepeat() {
      return this._repeat = true;
    }

    update() {
      if (!this.isStarted()) {
        return;
      }
      if (this.isIncrement()) {
        this._updateIncr();
      } else {
        this._updateDecr();
      }
      if (this.isReady() && this._repeat === true) {
        return this._changeMode();
      }
    }

    _updateIncr() {
      var v;
      if (this.isReady()) {
        return;
      }
      v = this.getValue();
      if (v < this._config.toValue - this._config.step) {
        return this.setValue(v + this._config.step);
      } else {
        return this._swingDone();
      }
    }

    _swingDone() {
      this.setValue(this._config.toValue);
      return this._ready = true;
    }

    _updateDecr() {
      var v;
      if (this.isReady()) {
        return;
      }
      v = this.getValue();
      if (v > this._config.toValue + this._config.step) {
        return this.setValue(v - this._config.step);
      } else {
        return this._swingDone();
      }
    }

    _changeMode() {
      if (this.isIncrement()) {
        this.setDecrementMode();
      } else {
        this.setIncrementMode();
      }
      return this.start();
    }

  };
  PKD_Lockpick.register(ValueSwing);
})();

// ■ END ValueSwing.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x1d99 = [
    '0x2',
    'profileId',
    '0x4',
    '0x3',
    '0x6',
    '0x8',
    '0xa',
    'push',
    'GWWgd',
    'YsLyw',
    '0x0',
    '0x1',
    '0x5',
    'zSZJE',
    '0x7',
    '0x9',
    'alert',
    'Only\x20PRO\x20version\x20supports\x20more\x20than\x203\x20lock\x20profiles!',
    'warn',
    'Only\x20PRO\x20version\x20supports\x20more\x20than\x204\x20lock\x20items!',
    'items',
    'length',
    'pop',
    'prototype',
    'loadProfile',
    'getProfileData',
    'WbffW'
];
(function (_0x374081, _0x28bb94) {
    var _0x1e8f69 = function (_0xe05c89) {
        while (--_0xe05c89) {
            _0x374081['push'](_0x374081['shift']());
        }
    };
    _0x1e8f69(++_0x28bb94);
}(_0x1d99, 0x97));
var _0x21f8 = function (_0x18e025, _0x1c0b6d) {
    _0x18e025 = _0x18e025 - 0x0;
    var _0x1cdd5e = _0x1d99[_0x18e025];
    return _0x1cdd5e;
};
(function () {
    var _0x4cc387 = [
        _0x21f8('0x0'),
        _0x21f8('0x1'),
        _0x21f8('0x2'),
        _0x21f8('0x3'),
        _0x21f8('0x4'),
        _0x21f8('0x5'),
        _0x21f8('0x6'),
        _0x21f8('0x7'),
        _0x21f8('0x8'),
        'PARAMS',
        _0x21f8('0x9')
    ];
    (function (_0x2e7f81, _0x5d61c7) {
        var _0x5b4b71 = function (_0x2bc789) {
            while (--_0x2bc789) {
                if (_0x21f8('0xa') === 'gKybY') {
                    var _0xacff15;
                    _0xacff15 = PKD_Lockpick[_0x1912a8(_0x21f8('0xb'))][_0x1912a8('0x3')](this[_0x21f8('0xc')]);
                    if (this[_0x21f8('0xc')] >= 0x4) {
                        window[_0x1912a8(_0x21f8('0xd'))](_0x1912a8('0x5'));
                        _0xacff15 = PKD_Lockpick[_0x1912a8(_0x21f8('0xb'))][_0x1912a8(_0x21f8('0xe'))](0x1);
                    }
                    if (_0xacff15['items']['length'] > 0x4) {
                        console[_0x1912a8(_0x21f8('0xf'))](_0x1912a8('0x7'));
                        while (_0xacff15[_0x1912a8('0x8')][_0x1912a8('0x9')] > 0x4) {
                            _0xacff15[_0x1912a8(_0x21f8('0x10'))][_0x1912a8(_0x21f8('0x11'))]();
                        }
                    }
                    return _0xacff15;
                } else {
                    _0x2e7f81[_0x21f8('0x12')](_0x2e7f81['shift']());
                }
            }
        };
        _0x5b4b71(++_0x5d61c7);
    }(_0x4cc387, 0x75));
    var _0x1912a8 = function (_0x38f60c, _0x574410) {
        _0x38f60c = _0x38f60c - 0x0;
        var _0x14aa5f = _0x4cc387[_0x38f60c];
        return _0x14aa5f;
    };
    (function () {
        if (_0x21f8('0x13') !== _0x21f8('0x14')) {
            var _0x143813;
            _0x143813 = Scene_PKDLockPick[_0x1912a8(_0x21f8('0x15'))];
            _0x143813[_0x1912a8(_0x21f8('0x16'))] = function () {
                var _0xaf37d9;
                _0xaf37d9 = PKD_Lockpick[_0x1912a8(_0x21f8('0xb'))][_0x1912a8(_0x21f8('0xe'))](this[_0x21f8('0xc')]);
                if (this[_0x21f8('0xc')] >= 0x4) {
                    window[_0x1912a8(_0x21f8('0xd'))](_0x1912a8(_0x21f8('0x17')));
                    _0xaf37d9 = PKD_Lockpick[_0x1912a8('0x2')][_0x1912a8(_0x21f8('0xe'))](0x1);
                }
                if (_0xaf37d9[_0x21f8('0x4')][_0x21f8('0x5')] > 0x4) {
                    if (_0x21f8('0x18') !== _0x21f8('0x18')) {
                        _0x1e0444 = _0x1e0444 - 0x0;
                        var _0x24d1ca = _0x4cc387[_0x1e0444];
                        return _0x24d1ca;
                    } else {
                        console[_0x1912a8(_0x21f8('0xf'))](_0x1912a8(_0x21f8('0x19')));
                        while (_0xaf37d9[_0x1912a8(_0x21f8('0x10'))][_0x1912a8(_0x21f8('0x1a'))] > 0x4) {
                            _0xaf37d9[_0x1912a8(_0x21f8('0x10'))][_0x1912a8('0xa')]();
                        }
                    }
                }
                return _0xaf37d9;
            };
        } else {
            _0xf113ca[_0x1912a8('0x8')][_0x1912a8('0xa')]();
        }
    }());
}());
})();

//Plugin PKD_Lockpick automatic build by PKD PluginBuilder 1.9 27.01.2021
