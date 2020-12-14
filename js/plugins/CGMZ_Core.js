/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/core/
 * @target MZ
 * @plugindesc Core CGMZ Plugin, should be placed above all other CGMZ Plugins.
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.4.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This is the core CGMZ plugin which is used extensively
 * by other CGMZ plugins and is likely to be required.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin can automatically check if any CGMZ plugin you have is out of
 * date. To see out of date plugins, open the console while playtesting by
 * pressing F8.
 *
 * The following plugin commands are supported:
 * CGMZ Init   # Re-initializes the CGMZ Core. Only use this if you know what
 *             # you are doing! Erases CGMZ data.
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1:
 * - Added function to automatically check if any CGMZ plugin is out of date
 * - Added function to split a string into multiple lines if the string is too
 * long for a window to handle without reducing font size (text wrap).
 * - Added class CGMZ_Window_Scrollable which can scroll vertically with
 * handlers but no visible cursor. A mix between Window_Base,
 * Window_Scrollable, and Window_Selectable
 * - Added CGMZ map name meta access
 *
 * 1.2:
 * - Removed unused code for a title window as this no longer fits with MZ
 * touch buttons.
 * - Added draw gauge functionality to windows that do not need sprite gauges
 *
 * 1.2.1:
 * - Updated api call for version check to use semantic versioning
 * - Added link to update directly from console
 * - Cut down on outdated CGMZ plugin warnings in console
 *
 * 1.3.0:
 * - Added basic input processing for all keys on keyboard
 * - Added option to open dev tools on game start
 *
 * 1.4.0:
 * - Added option to show fps on game start
 * - Added option to go fullscreen on game start
 * - Bugfix to add cap to scrollable window size
 *
 * @command Initialize
 * @text Initialize
 * @desc Re-initializes some CGMZ Classes. Only call this if you know what you
 * are doing. Will reset all CGMZ Data as if you started a new game.
 *
 * @arg reset
 * @type boolean
 * @text Reset
 * @desc Resets the core cgmz data if true. No functionality for false.
 * @default true
 *
 * @param Check for Updates
 * @type boolean
 * @desc Check for updates to CGMZ plugins on game start?
 * @default true
 *
 * @param Dev Tools on Start
 * @type boolean
 * @desc Open the dev tool console on game start?
 * @default false
 *
 * @param Show FPS Counter
 * @type boolean
 * @desc Show fps counter on game start?
 * @default false
 *
 * @param Fullscreen
 * @type boolean
 * @desc Go fullscreen on game start?
 * @default false
*/
var Imported = Imported || {};
Imported.CGMZ_Core = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["CGMZ Core"] = "1.4.0";
CGMZ.Core = CGMZ.Core || {};
CGMZ.Core.parameters = PluginManager.parameters('CGMZ_Core');
CGMZ.Core.CheckForUpdates = (CGMZ.Core.parameters["Check for Updates"] === "true") ? true : false;
CGMZ.Core.ShowDevTools = (CGMZ.Core.parameters["Dev Tools on Start"] === "true") ? true : false;
CGMZ.Core.StartFullscreen = (CGMZ.Core.parameters["Fullscreen"] === "true") ? true : false;
CGMZ.Core.ShowFPSCounter = (CGMZ.Core.parameters["Show FPS Counter"] === "true") ? true : false;
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// This class stores data not saved for CGMZ plugins
//=============================================================================
function CGMZ_Temp() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initialize = function() {
	this._inputCurrentState = {};
	this.createPluginData();
	this.registerPluginCommands();
	this.initEnvVariables();
};
//-----------------------------------------------------------------------------
// Set up environment variables
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initEnvVariables = function() {
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl');
	if(gl) {
		this._maxCanvasSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
	} else {
		this._maxCanvasSize = 16384; // 2^14
	}
};
//-----------------------------------------------------------------------------
// Get the max canvas size
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getMaxCanvasSize = function() {
	return this._maxCanvasSize;
};
//-----------------------------------------------------------------------------
// Check the version of CGMZ plugins against most up to date from server
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkCGMZPluginVersions = function(jsonData) {
	/* Plugins before I added this functionality might not have CGMZ.Versions */
	if(Imported.CGMZ_Menu_CommandWindow && !CGMZ.Versions["Menu Command Window"]) {
		CGMZ.Versions["Menu Command Window"] = 1.0;
	}
	if(Imported.CGMZ_ExtraStats && !CGMZ.Versions["Extra Stats"]) {
		CGMZ.Versions["Extra Stats"] = 1.0;
	}
	if(Imported.CGMZ_GameInfo && !CGMZ.Versions["Game Info"]) {
		CGMZ.Versions["Game Info"] = 1.0;
	}
	if(Imported.CGMZ_GameOver && !CGMZ.Versions["Game Over"]) {
		CGMZ.Versions["Game Over"] = 1.0;
	}
	if(Imported.CGMZ_SplashScreen && !CGMZ.Versions["Splash Screen"]) {
		CGMZ.Versions["Splash Screen"] = 1.0;
	}
	let warned = false;
	let pluginName = "";
	/* Actually check local versions against server version */
	jsonData.versions.forEach((version) => {
		if(CGMZ.Versions[version.name] && CGMZ.Versions[version.name].toString() !== version.version.toString()) {
			if(!warned) {
				console.warn("Warning! Out of date CGMZ Plugin(s) found:");
				warned = true;
			}
			pluginName = version.name;
			if(pluginName === "CGMZ Core") {
				pluginName = "Core";
			}
			console.warn("CGMZ " + pluginName + " had a local version of " + 
						 CGMZ.Versions[version.name] + " but a server version of " + version.version + "\n" + 
						 "You can download an update from https://www.caspergaming.com/plugins/cgmz/" + version.url + "/");
		}
	});
};
//-----------------------------------------------------------------------------
// To be overridden by CGMZ plugins
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createPluginData = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.registerPluginCommands = function() {
	PluginManager.registerCommand("CGMZ_Core", "Initialize", this.pluginCommandReinitialize);
};
//-----------------------------------------------------------------------------
// Reinitializes the plugin - Plugin Command
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReinitialize = function(args) {
	if (args.reset === "true") {
		$cgmzTemp.createPluginData();
		$cgmz.createPluginData();
	}
};
//-----------------------------------------------------------------------------
// Report an error to the console
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.reportError = function(error, origin, suggestion) {
	suggestion = suggestion || "Update Plugins";
	console.warn("Error in plugin: " + origin);
	console.warn("Error description: " + error);
	console.warn("Possible solution: " + suggestion);
};
//-----------------------------------------------------------------------------
// Takes a number and returns it's toLocaleString value
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.numberSplit = function(num) {
	return num.toLocaleString();
};
//-----------------------------------------------------------------------------
// Takes an amount of frames and gives back the time in hours:minutes:seconds
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.timeSplit = function(frameCount) {
	let temp = frameCount/60;
	let seconds = temp%60;
	let minutes = Math.floor(temp/60) % 60;
	let hours = Math.floor(temp/60/60) % 60;
    return hours.padZero(2) + ':' + minutes.padZero(2) + ':' + seconds.padZero(2);
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and tries to approximate it to Hours, Minutes, or Seconds
// Does not go above days as a time unit.
// For example, 30 seconds would return [30, "seconds"]
//              45 minutes would return [45, "minutes"]
//              18 hours would return   [18, "hours"] 
//              28 days would return    [28, "days"]
// If there is an error, it will return an empty array
// If forceApproximation is true, will round down to nearest even unit provided
// by approximateToUnitString
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.approximateTimeValue = function(seconds, forceApproximation, approximateToUnitString) {
	forceApproximation = forceApproximation || false;
	let value = [];
	if (forceApproximation) {
		value[0] = this.approximateTimeValueToUnit(seconds, approximateToUnitString);
		value[1] = approximateToUnitString;
	}
	else if (seconds >= 86400) { // 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60/24);
		value[1] = "Days";
	}
	else if (seconds >= 3600 && seconds < 86400) { // 3060 seconds in an hour, 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60);
		value[1] = "Hours";
	}
	else if (seconds >= 60 && seconds < 3600) { // 60 seconds in a minute, 3600 seconds in an hour
		value[0] = Math.floor(seconds/60);
		value[1] = "Minutes";
	}
	else if (seconds < 60) { // 60 seconds in a minute
		value[0] = seconds;
		value[1] = "Seconds";
	}
	return value;
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and approximates it to an amount of time units (minute, hour, day)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.approximateTimeValueToUnit = function(seconds, unitString) {
	let value = 0;
	if (unitString === "Days") {
		value = Math.floor(seconds/60/60/24);
	}
	else if (unitString === "Hours") {
		value = Math.floor(seconds/60/60);
	}
	else if (unitString === "Minutes") {
		value = Math.floor(seconds/60);
	}
	else if (unitString === "Seconds") {
		value = seconds;
	}
	else {
		const script = "CGMZ Core";
		const error = "Unrecognized unitString in approximateTimeValueToUnit()";
		this.reportError(error, script);
	}
	return value;
};
//-----------------------------------------------------------------------------
// Take javascript getDate, getMonth, and getFullYear and return formatted date text
// Valid formats (using / as delim):
// 0: MM/DD/YYYY     (ex: 1/20/2001)
// 1: DD/MM/YYYY     (ex: 20/1/2001)
// 2: YYYY/MM/DD     (ex: 2001/1/20)
// 3: Month DD, YYYY (ex: January 20, 2001)
// 4: DD Month YYYY  (ex: 20 January 2001)
// 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
// 6: DD Mon. YYYY   (ex: 20 Jan 2001)
// 7: MM/DD          (ex: 1/20)
// 8: DD/MM          (ex: 20/1)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createDateText = function(day, month, year, format, delim) {
	let txt;
	switch(format) {
		case 0:
			txt = (month+1).toString() + delim + day.toString() + delim + year.toString();
			return txt;
		case 1:
			txt = day.toString() + delim + (month+1).toString() + delim + year.toString();
			return txt;
		case 2:
			txt = year.toString() + delim + (month+1).toString() + delim + day.toString();
			return txt;
		case 3:
			txt = this.getFullMonthName(month) + " " + day.toString() + ", " + year.toString();
			return txt;
		case 4:
			txt = day.toString() + " " + this.getFullMonthName(month) + " " + year.toString();
			return txt;
		case 5:
			txt = this.getShortMonthName(month) + " " + day.toString() + ", " + year.toString();
			return txt;
		case 6:
			txt = day.toString() + " " + this.getShortMonthName(month) + " " + year.toString();
			return txt;
		case 7:
			txt = (month+1).toString() + delim + day.toString();
			return txt;
		case 8:
			txt =  day.toString() + delim + (month+1).toString();
			return txt;
		default:
			this.reportError("createDateText: Out of range", "CGMZ Core");
			txt = "Unknown Date";
	}
	return txt;
};
//-----------------------------------------------------------------------------
// Convert javascript getMonth int to full name of month string
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getFullMonthName = function(month) {
	let monthName = "";
	switch(month) {
		case 0: monthName = "January"; break;
		case 1: monthName = "February"; break;
		case 2: monthName = "March"; break;
		case 3: monthName = "April"; break;
		case 4: monthName = "May"; break;
		case 5: monthName = "June"; break;
		case 6: monthName = "July"; break;
		case 7: monthName = "August"; break;
		case 8: monthName = "September"; break;
		case 9: monthName = "October"; break;
		case 10: monthName = "November"; break;
		case 11: monthName = "December"; break;
		default:
			this.reportError("getFullMonthName: Out of range", "CGMZ Core");
			monthName = "Unknown";
	}
	return monthName;
};
//-----------------------------------------------------------------------------
// Convert javascript getMonth int to abbreviated name of month string
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getShortMonthName = function(month) {
	let monthName = "";
	switch(month) {
		case 0: monthName = "Jan"; break;
		case 1: monthName = "Feb"; break;
		case 2: monthName = "Mar"; break;
		case 3: monthName = "Apr"; break;
		case 4: monthName = "May"; break;
		case 5: monthName = "Jun"; break;
		case 6: monthName = "Jul"; break;
		case 7: monthName = "Aug"; break;
		case 8: monthName = "Sep"; break;
		case 9: monthName = "Oct"; break;
		case 10: monthName = "Nov"; break;
		case 11: monthName = "Dec"; break;
		default:
			this.reportError("getShortMonthName: Out of range", "CGMZ Core", "Update CGMZ Plugins");
			monthName = "Unknown";
	}
	return monthName;
};
//-----------------------------------------------------------------------------
// Look up item given type and id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.lookupItem = function(type, id) {
	switch(type) {
		case 'item':
			return $dataItems[id];
		case 'weapon':
			return $dataWeapons[id];
		case 'armor':
			return $dataArmors[id];
		default:
			this.reportError("Item type setup incorrectly", "CGMZ Core", "Check item parameters set up through CGMZ plugins");
			return null;
	}
};
//-----------------------------------------------------------------------------
// Split string based on width and if the next word will fit in that line
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.wrapText = function(string, contents, xOffset = 0, firstLineXOffset = 0, separator = " ") {
	let lines = [];
	let tempLine = "";
	let words = string.split(" ");
	let x = xOffset + firstLineXOffset;
	for(let i = 0; i < words.length; i++) {
		if(i === words.length - 1) {
			separator = "";
		}
		let tempWidth = contents.measureTextWidth(words[i] + separator);
		if(tempWidth + x > contents.width && tempWidth <= contents.width) {
			lines.push(tempLine);
			tempLine = "";
			x = xOffset;
		}
		x += tempWidth;
		tempLine = tempLine + words[i] + separator;
	}
	if(tempLine !== "") {
		lines.push(tempLine);
	}
	return lines
};
//-----------------------------------------------------------------------------
// Request a response from an API using fetch, and output response to custom
// function
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.requestResponse = function(url, func) {
	fetch(url).then(response => {
		if(response.status >= 200 && response.status < 300)
			return response.json();
		console.warn("Request error, received non-OK response: " + response.status);
	}).then(data => {
		func.call(this, data);
	}).catch((e) => { // JSON error
		console.warn('Error with response JSON: ', e);
	});
};
//-----------------------------------------------------------------------------
// Clear input
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.inputClear = function() {
	this._inputCurrentState = {};
};
//-----------------------------------------------------------------------------
// on key down
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onKeyDown = function(event) {
	let keyCode = event.keyCode;
	if(keyCode) {
		this._inputCurrentState[keyCode] = true;
		this.refreshForKeysDown();
	}
};
//-----------------------------------------------------------------------------
// on key up
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onKeyUp = function(event) {
	let keyCode = event.keyCode;
	if(keyCode) {
		this._inputCurrentState[keyCode] = false;
		this.refreshForKeysUp();
	}
};
//-----------------------------------------------------------------------------
// Refresh plugins on key down
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.refreshForKeysDown = function() {
	//Used by other plugins
};
//-----------------------------------------------------------------------------
// Refresh plugins on key up
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.refreshForKeysUp = function() {
	//Used by other plugins
};
//-----------------------------------------------------------------------------
// is Key Pressed?
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isKeyPressed = function(keyCode) {
	return this._inputCurrentState[keyCode];
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// This class contains some common methods for other CGMZ plugins.
//=============================================================================
function CGMZ_Core() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize CGMZ_Core
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initialize = function() {
	this.createPluginData();
};
//-----------------------------------------------------------------------------
// To be overridden by CGMZ plugins
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createPluginData = function() {
	// Used by CGMZ plugins
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Add function for getting map name (unique to CGMZ plugins)
//=============================================================================
//-----------------------------------------------------------------------------
// Get CGMZ map name
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_getMapName = function() {
    let name = "Unknown";
	if($dataMap.meta.cgmzname) {
		name = $dataMap.meta.cgmzname;
	}
	return name;
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Saving and loading CGMZ data. Also checks for out of date plugins
// modified functions: createGameObjects, makeSaveContents, extractSaveContents
// 					   setupNewGame
//=============================================================================
$cgmz = null;
$cgmzTemp = null;
//-----------------------------------------------------------------------------
// Initialize the $cgmz variable
//-----------------------------------------------------------------------------
const CGMZ_Core_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    CGMZ_Core_createGameObjects.call(this);
	$cgmz = new CGMZ_Core();
	$cgmzTemp = new CGMZ_Temp();
};
//-----------------------------------------------------------------------------
// Save CGMZ data
//-----------------------------------------------------------------------------
const CGMZ_Core_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = CGMZ_Core_makeSaveContents.call(this);
    contents.cgmz = $cgmz;
    return contents;
};
//-----------------------------------------------------------------------------
// Load CGMZ data
//-----------------------------------------------------------------------------
const CGMZ_Core_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    CGMZ_Core_extractSaveContents.call(this, contents);
	contents.cgmz ? $cgmz = contents.cgmz : console.log("Could not load CGMZ data!");
};
//-----------------------------------------------------------------------------
// After setting things up, check for out of date CGMZ plugins
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    alias_CGMZ_Core_DataManager_setupNewGame.call(this);
	if($gameTemp.isPlaytest() && CGMZ.Core.CheckForUpdates) {
		const url = 'https://www.caspergaming.com/api/public/cgmz/v2/versions/';
		$cgmzTemp.requestResponse(url, $cgmzTemp.checkCGMZPluginVersions);
	}
};
//=============================================================================
// Scene_Boot
//-----------------------------------------------------------------------------
// Opens dev tools on startup if test play and plugin parameter is configured
//=============================================================================
//-----------------------------------------------------------------------------
// Also open dev tool console if user wishes
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    alias_CGMZ_Core_Scene_Boot_start.call(this);
	if($gameTemp.isPlaytest() && CGMZ.Core.ShowDevTools) {
		SceneManager.showDevTools();
	}
	if($gameTemp.isPlaytest() && CGMZ.Core.ShowFPSCounter) {
		Graphics._switchFPSCounter();
	}
	if(CGMZ.Core.StartFullscreen) {
		Graphics._requestFullScreen();
	}
};
//=============================================================================
// CGMZ_Window_Scrollable
//-----------------------------------------------------------------------------
// Window used by CGMZ Scripts to allow for more info to be shown than would
// otherwise fit and also scroll automatically to show info.
// A mix between the default Window_Scrollable and Window_Selectable with the
// functionality of: handlers (selectable), vertical scrolling (scrollable).
//=============================================================================
function CGMZ_Window_Scrollable() {
    this.initialize(...arguments);
}
CGMZ_Window_Scrollable.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_Scrollable.prototype.constructor = CGMZ_Window_Scrollable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.initialize = function(rect, heightMultiplier, scrollWait = 300, scrollSpeed = 1,
													   autoscroll = true, deceleration = 0.92) {
    Window_Base.prototype.initialize.call(this, rect);
	this._handlers = {};
	this._scroll = false;
	this._autoScroll = autoscroll;
	this._scrollTouching = false;
    this._scrollLastTouchY = 0;
    this._scrollAccelY = 0;
	this._scrollMode = 0; // 0 = down, 1 = up
	this._scrollTimer = 0;
	this._scrollWait = scrollWait;
	this._scrollSpeed = scrollSpeed;
	this._decelerationRate = deceleration;
    this._neededHeight = 0;
	this._windowHeight = rect.height;
	this._heightMultiplier = heightMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Get contents height
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.contentsHeight = function() {
	let height = this._windowHeight * this._heightMultiplier;
	if(height > $cgmzTemp.getMaxCanvasSize()) {
		height = $cgmzTemp.getMaxCanvasSize();
	}
	return height;
};
//-----------------------------------------------------------------------------
// If refresh is requested
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.requestRefresh = function() {
    this.refresh();
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processHandling = function() {
    if (this.isActive()) {
        if (this.isCancelEnabled() && (Input.isRepeated('cancel') || TouchInput.isCancelled())) {
            this.processCancel();
		}
    }
};
//-----------------------------------------------------------------------------
// Process Cancel
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
//-----------------------------------------------------------------------------
// Update Input Data
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateInputData = function() {
    Input.update();
    TouchInput.update();
};
//-----------------------------------------------------------------------------
// Call Cancel Handler
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.callCancelHandler = function() {
    this.callHandler('cancel');
};
//-----------------------------------------------------------------------------
// Updates for scroll (if needed)
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.processHandling();
	this.updateArrows();
	if(this._scroll) {
		this.processArrowKeys();
		this.processWheel();
		this.processTouch();
		this.updateScrollAccel();
		if(this._autoScroll) {
			if(this._scrollTimer > this._scrollWait) {
				this.updateScroll();
			}
			this._scrollTimer += 1;
		}
    }
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateArrows = function() {
	this.downArrowVisible = (this.origin.y + this._windowHeight < this._neededHeight && this._scroll);
    this.upArrowVisible = this.origin.y > 0;
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateScroll = function() {
	if(this.origin.y + this._windowHeight >= this._neededHeight && this._scrollMode == 0) {
		this._scrollMode = 1; // Scroll up
		this._scrollTimer = 0;
	}
	else if(this.origin.y <= 0 && this._scrollMode == 1) {
		this._scrollMode = 0; // Scroll down
		this._scrollTimer = 0;
	}
	else {
		var speed = (this._scrollMode == 1) ? -this._scrollSpeed : this._scrollSpeed;
		this.processScroll(speed);
	}
};
//-----------------------------------------------------------------------------
// Process Arrow Key Input
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processArrowKeys = function() {
    if(this.isActive()) {
        if(Input.isPressed('down')) {
            this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
        if(Input.isPressed('up')) {
            this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Process Wheel Input
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processWheel = function() {
    if (this.isActive()) {
        const threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this.processScroll(this._scrollSpeed*20);
			this._scrollTimer = 0;
        }
        if (TouchInput.wheelY <= -threshold) {
            this.processScroll(-this._scrollSpeed*20);
			this._scrollTimer = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Process Touch Scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processTouch = function() {
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.onTouchScrollStart();
    }
    if (this._scrollTouching) {
		this._scrollTimer = 0;
        if (TouchInput.isReleased()) {
            this.onTouchScrollEnd();
        } else if (TouchInput.isMoved()) {
            this.onTouchScroll();
        }
    }
};
//-----------------------------------------------------------------------------
// Determine if window has been touched inside the window frame
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isTouchedInsideFrame = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.innerRect.contains(localPos.x, localPos.y);
};
//-----------------------------------------------------------------------------
// Processing for when window is touched
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScrollStart = function() {
    this._scrollTouching = true;
    this._scrollLastTouchY = TouchInput.y;
    this.setScrollAccel(0, 0);
};
//-----------------------------------------------------------------------------
// Handling for current scroll via touch
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScroll = function() {
    const accelY = this._scrollLastTouchY - TouchInput.y;
    this.setScrollAccel(accelY);
    this._scrollLastTouchY = TouchInput.y;
};
//-----------------------------------------------------------------------------
// Processing for letting go of touch scroll
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScrollEnd = function() {
    this._scrollTouching = false;
};
//-----------------------------------------------------------------------------
// Update Scroll Acceleration
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateScrollAccel = function() {
    if(this._scrollAccelY !== 0) {
        this.processScroll(this._scrollAccelY);
        this._scrollAccelY *= this.getDecelerationRate();
        if(Math.abs(this._scrollAccelY) < 1) {
            this._scrollAccelY = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Get deceleration rate
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.getDecelerationRate = function() {
    return this._decelerationRate;
};
//-----------------------------------------------------------------------------
// Set x and y acceleration for scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setScrollAccel = function(y) {
    this._scrollAccelY = y;
};
//-----------------------------------------------------------------------------
// Process scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processScroll = function(scrollAmount) {
	if(this.origin.y + this._windowHeight + scrollAmount > this._neededHeight) {
		this.origin.y = this._neededHeight - this._windowHeight;
	}
	else if(this.origin.y + scrollAmount < 0) {
		this.origin.y = 0;
	}
	else {
		this._scrollMode = (scrollAmount < 0) ? 1 : 0;
		this.origin.y += scrollAmount;
	}
};
//-----------------------------------------------------------------------------
// Check if needs to scroll (might change after drawing contents because bitmap)
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.checkForScroll = function() {
	if(this._neededHeight > this._windowHeight) {
		this._scroll = true;
	}
};
//-----------------------------------------------------------------------------
// Reset variables for new object
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setupWindowForNewEntry = function() {
	this.origin.y = 0;
	this._scrollTimer = 0;
	this._scrollMode = 0;
	this._neededHeight = 0;
    this._scrollLastTouchY = 0;
    this._scrollAccelY = 0;
	this._scroll = false;
	this._scrollTouching = false;
	this.contents.clear();
};
//-----------------------------------------------------------------------------
// Check if window is active
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isActive = function() {
	return this.active;
};
//-----------------------------------------------------------------------------
// Set Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setHandler = function(symbol, method) {
    this._handlers[symbol] = method;
};
//-----------------------------------------------------------------------------
// check if is handled same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isHandled = function(symbol) {
    return !!this._handlers[symbol];
};
//-----------------------------------------------------------------------------
// Call Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.callHandler = function(symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol]();
    }
};
//-----------------------------------------------------------------------------
// Check if cancel handling exists
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isCancelEnabled = function() {
    return this.isHandled('cancel');
};
//=============================================================================
// Window_Base
//-----------------------------------------------------------------------------
// Adding functions for CGMZ Windows. Drawing gauges
//=============================================================================
Window_Base.prototype.CGMZ_drawGauge = function(rect, rate, color1, color2, color0 = ColorManager.gaugeBackColor()) {
	const fillW = Math.floor((rect.width - 2) * rate);
    const fillH = rect.height - 2;
	this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color0);
    this.contents.gradientFillRect(rect.x + 1, rect.y + 1, fillW, fillH, color1, color2);
};
//=============================================================================
// Input
//-----------------------------------------------------------------------------
// Pass input keycodes to CGMZ Temp
//=============================================================================
//-----------------------------------------------------------------------------
// Pass Inputs to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
    CGMZ_Core_Input_onKeyDown.call(this, event);
	if($cgmzTemp) $cgmzTemp.onKeyDown(event);
};
//-----------------------------------------------------------------------------
// Pass Inputs to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
    CGMZ_Core_Input_onKeyUp.call(this, event);
	if($cgmzTemp) $cgmzTemp.onKeyUp(event);
};
//-----------------------------------------------------------------------------
// Also clear CGMZ Input
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onLostFocus = Input._onLostFocus;
Input._onLostFocus = function() {
    CGMZ_Core_Input_onLostFocus.call(this);
	if($cgmzTemp) $cgmzTemp.inputClear();
};