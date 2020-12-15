//=============================================================================
// ForegroundParallax.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Shows foreground parallax that can be used for fogs.
 * @author N/A (open-source, copyleft)
 *
 * @help ForegroundParallax.js
 *
 * This plugin provides a command for showing the foreground parallax.  The
 * opacity of the foreground parallax has to be higher than 0 in order for
 * the foreground parallax to be visible.  The foreground parallax becomes
 * more visible with a very high opacity.
 *
 * @command on
 * @text Show Foreground Parallax
 * @desc Shows the foreground parallax
 *
 * @arg parallaxName
 * @type string
 * @default 
 * @text Foreground Parallax
 * @desc Filename of the parallax image
 * 
 * @arg lockParallax
 * @type boolean
 * @on On
 * @off Off
 * @default false
 * @text Lock Parallax
 * @desc Keep the Foreground Parallax in locked position
 *
 * @arg loopHorizontally
 * @type boolean
 * @on On
 * @off Off
 * @default false
 * @text Loop Horizontally
 * @desc Turns Loop Horizontally on/off
 *
 * @arg loopVertically
 * @type boolean
 * @on On
 * @off Off
 * @default false
 * @text Loop Vertically
 * @desc Turns Loop Vertically on/off
 *
 * @arg scrollX
 * @type number
 * @min -32
 * @max 32
 * @default 0
 * @text Horizontal Scroll
 * @desc Horizontal scroll value (-32 - 32)
 *
 * @arg scrollY
 * @type number
 * @min -32
 * @max 32
 * @default 0
 * @text Vertical Scroll
 * @desc Vertical scroll value (-32 - 32)
 *
 * @arg parallaxOpacity
 * @type number
 * @min 0
 * @max 255
 * @default 64
 * @text Opacity
 * @desc Opacity of the parallax foreground (0 - 255)
 */

(() => {
  	//-----------------------------------------------------------------------------
	// PluginManager
	//
	
  	const pluginName = "ForegroundParallax";

    PluginManager.registerCommand(pluginName, "on", args => {
		name = String(args.parallaxName);
		lock = eval(args.lockParallax);
		loopX = eval(args.loopHorizontally);
		loopY = eval(args.loopVertically);
		sx = Number(args.scrollX);
		sy = Number(args.scrollY);
		opacity = Number(args.parallaxOpacity);
        $gameMap.showFog(name, lock, loopX, loopY, sx, sy, opacity);
    });
	
    //-----------------------------------------------------------------------------
	// Game_Map
	//
	// The game object class for a map. It contains scrolling and passage
	// determination functions.
	
	Game_Map.prototype.initialize = function() {
		this._interpreter = new Game_Interpreter();
		this._mapId = 0;
		this._tilesetId = 0;
		this._events = [];
		this._commonEvents = [];
		this._vehicles = [];
		this._displayX = 0;
		this._displayY = 0;
		this._nameDisplay = true;
		this._scrollDirection = 2;
		this._scrollRest = 0;
		this._scrollSpeed = 4;
		this._parallaxName = '';
		this._parallaxZero = false;
		this._parallaxLoopX = false;
		this._parallaxLoopY = false;
		this._parallaxSx = 0;
		this._parallaxSy = 0;
		this._parallaxX = 0;
		this._parallaxY = 0;
		this._fogName = '';
		this._fogZero = false;
		this._fogLoopX = false;
		this._fogLoopY = false;
		this._fogSx = 0;
		this._fogSy = 0;
		this._fogX = 0;
		this._fogY = 0;
		this._fogOpacity = 0;
		this._battleback1Name = null;
		this._battleback2Name = null;
		this.createVehicles();
	};
	
	Game_Map.prototype.setup = function(mapId) {
		if (!$dataMap) {
			throw new Error('The map data is not available');
		}
		this._mapId = mapId;
		this._tilesetId = $dataMap.tilesetId;
		this._displayX = 0;
		this._displayY = 0;
		this.refereshVehicles();
		this.setupEvents();
		this.setupScroll();
		this.setupParallax();
		this.setupFog();
		this.setupBattleback();
		this._needsRefresh = false;
	};
	
	Game_Map.prototype.fogName = function() {
		return this._fogName;
	};
	
	Game_Map.prototype.fogOpacity = function() {
		return this._fogOpacity;
	};
	
	Game_Map.prototype.setupFog = function() {
		this._fogName = "";
		this._fogZero = false;
		this._fogLoopX = false;
		this._fogLoopY = false;
		this._fogSx = 0;
		this._fogSy = 0;
		this._fogX = 0;
		this._fogY = 0;
		this._fogOpacity = 0;
	};
	
	Game_Map.prototype.setDisplayPos = function(x, y) {
		if (this.isLoopHorizontal()) {
			this._displayX = x.mod(this.width());
			this._parallaxX = x;
			this._fogX = x;
		} else {
			var endX = this.width() - this.screenTileX();
			this._displayX = endX < 0 ? endX / 2 : x.clamp(0, endX);
			this._parallaxX = this._displayX;
			this._fogX = this._displayX;
		}
		if (this.isLoopVertical()) {
			this._displayY = y.mod(this.height());
			this._parallaxY = y;
			this._fogY = y;
		} else {
			var endY = this.height() - this.screenTileY();
			this._displayY = endY < 0 ? endY / 2 : y.clamp(0, endY);
			this._parallaxY = this._displayY;
			this._fogY = this._displayY;
		}
	};
	
	Game_Map.prototype.fogOx = function() {
		if (this._fogZero) {
			return this._fogX * this.tileWidth();
		} else if (this._fogLoopX) {
			return this._fogX * this.tileWidth() / 2;
		} else {
			return 0;
		}
	};
	
	Game_Map.prototype.fogOy = function() {
		if (this._fogZero) {
			return this._fogY * this.tileHeight();
		} else if (this._fogLoopY) {
			return this._fogY * this.tileHeight() / 2;
		} else {
			return 0;
		}
	};
	
	Game_Map.prototype.scrollDown = function(distance) {
		if (this.isLoopVertical()) {
			this._displayY += distance;
			this._displayY %= $dataMap.height;
			if (this._parallaxLoopY) {
				this._parallaxY += distance;
			}
			if (this._fogLoopY) {
				this._fogY += distance;
			}
		} else if (this.height() >= this.screenTileY()) {
			var lastY = this._displayY;
			this._displayY = Math.min(
				this._displayY + distance,
				this.height() - this.screenTileY()
			);
			this._parallaxY += this._displayY - lastY;
			this._fogY += this._displayY - lastY;
		}
	};
	
	Game_Map.prototype.scrollLeft = function(distance) {
		if (this.isLoopHorizontal()) {
			this._displayX += $dataMap.width - distance;
			this._displayX %= $dataMap.width;
			if (this._parallaxLoopX) {
				this._parallaxX -= distance;
			}
			if (this._fogLoopX) {
				this._fogX -= distance;
			}
		} else if (this.width() >= this.screenTileX()) {
			var lastX = this._displayX;
			this._displayX = Math.max(this._displayX - distance, 0);
			this._parallaxX += this._displayX - lastX;
			this._fogX += this._displayX - lastX;
		}
	};
	
	Game_Map.prototype.scrollRight = function(distance) {
		if (this.isLoopHorizontal()) {
			this._displayX += distance;
			this._displayX %= $dataMap.width;
			if (this._parallaxLoopX) {
				this._parallaxX += distance;
			}
			if (this._fogLoopX) {
				this._fogX += distance;
			}
		} else if (this.width() >= this.screenTileX()) {
			var lastX = this._displayX;
			this._displayX = Math.min(
				this._displayX + distance,
				this.width() - this.screenTileX()
			);
			this._parallaxX += this._displayX - lastX;
			this._fogX += this._displayX - lastX;
		}
	};
	
	Game_Map.prototype.scrollUp = function(distance) {
		if (this.isLoopVertical()) {
			this._displayY += $dataMap.height - distance;
			this._displayY %= $dataMap.height;
			if (this._parallaxLoopY) {
				this._parallaxY -= distance;
			}
			if (this._fogLoopY) {
				this._fogY -= distance;
			}
		} else if (this.height() >= this.screenTileY()) {
			var lastY = this._displayY;
			this._displayY = Math.max(this._displayY - distance, 0);
			this._parallaxY += this._displayY - lastY;
			this._fogY += this._displayY - lastY;
		}
	};
	
	var _Game_Map_update = Game_Map.prototype.update;
	Game_Map.prototype.update = function(sceneActive) {
		_Game_Map_update.call(this, sceneActive);
		this.updateFog();
	};
	
	Game_Map.prototype.updateFog = function() {
		if (this._fogLoopX) {
			this._fogX -= this._fogSx / this.tileWidth() / 2;
		}
		if (this._fogLoopY) {
			this._fogY -= this._fogSy / this.tileHeight() / 2;
		}
	};
	
	Game_Map.prototype.showFog = function(name, lock, loopX, loopY, sx, sy, opacity) {
		this._fogName = name;
		this._fogZero = lock;
		if (this._fogLoopX && !loopX) {
			this._fogX = 0;
		}
		if (this._fogLoopY && !loopY) {
			this._fogY = 0;
		}
		this._fogLoopX = loopX;
		this._fogLoopY = loopY;
		this._fogSx = sx;
		this._fogSy = sy;
		this._fogOpacity = opacity;
	};
	
	//-----------------------------------------------------------------------------
	// Spriteset_Map
	//
	// The set of sprites on the map screen.
	
	var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
	Spriteset_Map.prototype.createLowerLayer = function() {
		_Spriteset_Map_createLowerLayer.call(this);
		this.createFog();
	};
	
	var _Spriteset_Map_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function() {
		_Spriteset_Map_update.call(this);
		this.updateFog();
	};
	
	Spriteset_Map.prototype.createFog = function() {
		this._fog = new TilingSprite();
		this._fog.move(0, 0, Graphics.width, Graphics.height);
		this._baseSprite.addChild(this._fog);
	};
	
	Spriteset_Map.prototype.updateFog = function() {
		if (this._fogName !== $gameMap.fogName()) {
			this._fogName = $gameMap.fogName();
			this._fog.bitmap = ImageManager.loadParallax(this._fogName);
		}
		if (this._fog.bitmap) {
			this._fog.origin.x = $gameMap.fogOx();
			this._fog.origin.y = $gameMap.fogOy();
			this._fog.opacity = $gameMap.fogOpacity();
		}
	};
})();
