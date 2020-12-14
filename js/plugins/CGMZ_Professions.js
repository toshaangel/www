/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/professions/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Creates a profession system for your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: Creates a profession system for your game. Discover
 * professions, gain experience, and level up. Profession data is easily
 * accessed and can be used for things like restricting the player from 
 * harvesting resources if their level is not high enough, or many other
 * uses.
 * ----------------------------------------------------------------------------
 * Documentation:
 *
 * Colors support either hex format (ex. #ffffff) or rgb format 
 * (ex. rgb(255, 255, 255))
 * 
 * This plugin supports the following plugin commands:
 * Call Scene: Calls the profession scene if true, no function if false.
 *
 * Reinitialize: This will reinitialize all profession data as if you had
 * 				 started a new game. Use for saved game testing.
 *
 * Discover Profession: This will discover (or undiscover) a given profession.
 *
 * Change Exp: Allows you to set, add, or subtract experience from the
 *			   provided profession.
 *
 * Change Level: Allows you to set, add, or subtract levels from the provided
 *             profession.
 *
 * Update History:
 * Version 1.0.0 - Initial Release
 *
 * Version 1.0.1:
 * - Added a plugin command to get the profession level
 *
 * Version 1.0.2:
 * - Added option to display a toast window on discovery of profession
 *
 * @command reinitialize
 * @text Reinitialize
 * @desc  Reinitializes all profession data. Use this if your saved game does not recognize new profession data.
 *
 * @arg reinitialize
 * @type boolean
 * @text Reinitialize
 * @desc Reinitializes profession data if true. No functionality if false.
 * @default true
 *
 * @command Call Scene
 * @text Call Scene
 * @desc Calls the Profession scene
 *
 * @arg call
 * @type boolean
 * @text Call Scene
 * @desc Calls the profession scene if true. No functionality for false.
 * @default true
 *
 * @command discover
 * @text Discover Profession
 * @desc Discovers a profession (or undiscovers a profession)
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to discover
 *
 * @arg discover
 * @type boolean
 * @text Discover
 * @desc Discovers the profession if true. Undiscovers the profession if false.
 * @default true
 *
 * @command changeExp
 * @text Change Experience
 * @desc Manipulate a profession's experience
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to change exp for
 *
 * @arg mode
 * @type select
 * @text Mode
 * @option =
 * @option +
 * @option -
 * @desc Whether to set, add, or subtract exp
 * @default =
 *
 * @arg amount
 * @type number
 * @text Amount
 * @desc Amount of experience to set, add, or subtract
 * @default 0
 * @min 0
 *
 * @command changeLevel
 * @text Change Level
 * @desc Manipulate a profession's level
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to change level for
 *
 * @arg mode
 * @type select
 * @text Mode
 * @option =
 * @option +
 * @option -
 * @desc Whether to set, add, or subtract levels
 * @default =
 *
 * @arg amount
 * @type number
 * @text Amount
 * @desc Amount of levels to set, add, or subtract
 * @default 1
 * @min 0
 *
 * @command getLevel
 * @text Get Profession Level
 * @desc Get the profession's level in a variable
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc The variable to set to the profession level
 *
 * @param Professions
 * @type struct<Profession>[]
 * @default []
 * @desc Set up different professions here
 *
 * @param Window Options
 *
 * @param Total Level Text
 * @parent Window Options
 * @desc Text to show describing the total level shown at bottom of scene
 * @default Total Level
 *
 * @param ScrollSpeed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Text Options
 *
 * @param Level Text
 * @parent Text Options
 * @default Level
 * @desc Text to describe level
 *
 * @param Exp Text
 * @parent Text Options
 * @default Experience
 * @desc Text to describe current experience
 *
 * @param Exp To Level Text
 * @parent Text Options
 * @default Experience To Level
 * @desc Text to describe experience needed to level
 *
 * @param Description Text
 * @parent Text Options
 * @default Description
 * @desc Text to describe the profession description
 *
 * @param Other CGMZ Plugin Options
 *
 * @param Show Level Up Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon level up (requires CGMZ Toast)
 *
 * @param Level Up Text
 * @parent Other CGMZ Plugin Options
 * @default has leveled up!
 * @desc Text to describe a level up in the toast window (requires CGMZ Toast)
 *
 * @param Show Discover Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon profession discover (requires CGMZ Toast)
 *
 * @param Discover Text
 * @parent Other CGMZ Plugin Options
 * @default Discovered Profession
 * @desc Text to describe a discovered profession in the toast window (requires CGMZ Toast)
*/
/*~struct~Profession:
 * @param Name
 * @type text
 * @desc The name of the profession.
 * 
 * @param Discovered
 * @type boolean
 * @default true
 * @desc Determine whether the profession is discovered at the start of the game.
 * 
 * @param Level
 * @type number
 * @min 1
 * @default 1
 * @desc The level the profession begins at.
 *
 * @param Max level
 * @type number
 * @min 1
 * @default 99
 * @desc The maximum level the profession can be.
 *
 * @param Use Experience Curve?
 * @type boolean
 * @default true
 * @desc Determine whether to generate an experience curve or to use hard-coded values
 *
 * @param Experience Curve
 * @type number[]
 * @default ["30","20","30","30"]
 * @desc Experience Curve to use. If using experience curve, generates exp curve using same formula for actor levels. Otherwise, each value is amount of exp needed for each level.
 *
 * @param Icon
 * @type number
 * @default 0
 * @min -1
 * @desc Icon index to use for the profession. Set to -1 to not use
 *
 * @param Color
 * @type text
 * @default #ffffff
 * @desc rgb or hex values accepted. Hex format: #ffffff RGB format: rgb(255, 255, 255)
 *
 * @param Description
 * @type note
 * @default ""
 * @desc Profession description
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for the profession. Requires CGMZ Toast
 */
var Imported = Imported || {};
Imported.CGMZ_Professions = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Professions"] = "1.0.2";
CGMZ.Professions = CGMZ.Professions || {};
CGMZ.Professions.parameters = PluginManager.parameters('CGMZ_Professions');
CGMZ.Professions.Entries = JSON.parse(CGMZ.Professions.parameters["Professions"]);
CGMZ.Professions.SceneTitle = CGMZ.Professions.parameters["Scene Title"] || "Professions";
CGMZ.Professions.TotalLevelText = CGMZ.Professions.parameters["Total Level Text"] || "Total Level";
CGMZ.Professions.ScrollSpeed = Number(CGMZ.Professions.parameters["ScrollSpeed"]) || 1;
CGMZ.Professions.ScrollWait = Number(CGMZ.Professions.parameters["ScrollWait"]) || 300;
CGMZ.Professions.ScrollDeceleration = parseFloat(CGMZ.Professions.parameters["Scroll Deceleration"]) || 0.92;
CGMZ.Professions.AutoScroll = (CGMZ.Professions.parameters["Auto Scroll"] === "true") ? true : false;
CGMZ.Professions.LevelText = CGMZ.Professions.parameters["Level Text"] || "Level";
CGMZ.Professions.ExpText = CGMZ.Professions.parameters["Exp Text"] || "Experience";
CGMZ.Professions.ExpToLevelText = CGMZ.Professions.parameters["Exp To Level Text"] || "Experience To Level";
CGMZ.Professions.DescriptionText = CGMZ.Professions.parameters["Description Text"] || "Description";
CGMZ.Professions.ShowLevelUpToast = (CGMZ.Professions.parameters["Show Level Up Toast"] === "true") ? true : false;
CGMZ.Professions.LevelUpText = CGMZ.Professions.parameters["Level Up Text"] || "has leveled up!";
CGMZ.Professions.ShowDiscoverToast = (CGMZ.Professions.parameters["Show Discover Toast"] === "true") ? true : false;
CGMZ.Professions.DiscoverText = CGMZ.Professions.parameters["Discover Text"] || "has leveled up!";
//=============================================================================
// CGMZ_Profession
//-----------------------------------------------------------------------------
// Store and manage profession data
//=============================================================================
function CGMZ_Profession() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Profession
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.initialize = function(profession) {
	this._name = profession.Name;
	this._discovered = (profession.Discovered === 'true') ? true : false;
	this._maxLevel = Number(profession["Max level"]);
	this._level = Number(profession.Level);
	this._usingExpCurve = (profession["Use Experience Curve?"] === 'true') ? true : false;
	this._iconIndex = Number(profession.Icon);
	this._description = JSON.parse(profession.Description.replace(/\\n/g, " \\\\n "));
	this._color = profession.Color;
	this._expArray = JSON.parse(profession["Experience Curve"]);
	for(let i = 0; i < this._expArray.length; i++) {
		this._expArray[i] = Number(this._expArray[i]);
	}
	this._exp = 0;
	this._toastSE = profession["Toast Sound Effect"];
};
//-----------------------------------------------------------------------------
// Get experience required for level
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.expForLevel = function(level) {
	if(level <= 1) return 0;
	if(level > this._maxLevel) return this.expForLevel(this._maxLevel);
	if(!this._usingExpCurve) return this._expArray[level - 2]; // level - 2 since 0 not level and 1 lowest level possible
	let basis = this._expArray[0];
    let extra = this._expArray[1];
    let acc_a = this._expArray[2];
    let acc_b = this._expArray[3];
	if(acc_b === 0) acc_b = 1;
    return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            (level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
};
//-----------------------------------------------------------------------------
// Get experience required for level taking into account current exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.expNeeded = function(level) {
	return this.expForLevel(level) - this._exp;
};
//-----------------------------------------------------------------------------
// Get experience required for next level taking into account current exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.expNeededToNextLevel = function() {
	if(this._level >= this._maxLevel) return 0;
	return this.expForLevel(this._level + 1) - this._exp;
};
//-----------------------------------------------------------------------------
// Changed discovery status
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
	if(discovered && CGMZ.Professions.ShowDiscoverToast) {
		this.setupDiscoverToast();
	}
};
//-----------------------------------------------------------------------------
// Gain/Lose experience
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.changeExp = function(mode, amount) {
	switch(mode) {
		case '=': 
			this._exp = amount;
			break;
		case '+':
			this._exp += amount;
			break;
		case '-':
			this._exp -= amount;
			break;
		default:
			const script = "CGMZ Professions";
			const error = "Malformed 'Experience' command received";
			const suggestion = "Check for proper plugin command usage in events";
			$cgmzTemp.reportError(error, script, suggestion);
	}
	if(this._exp < 0) this._exp = 0;
	this.checkProfessionForLevel();
};
//-----------------------------------------------------------------------------
// Check profession for level up/down. Always call this to level up/down.
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.checkProfessionForLevel = function() {
	while(this._level < this._maxLevel && this._exp >= this.expForLevel(this._level+1)) {
		this.levelUp();
	}
	while(this._level > 1 && this._exp < this.expForLevel(this._level)) {
		this.levelDown();
	}
};
//-----------------------------------------------------------------------------
// Level Up
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.levelUp = function() {
	this._level++;
	if(CGMZ.Professions.ShowLevelUpToast && Imported.CGMZ_ToastManager) {
		this.setupLevelUpToast();
	}
	if(Imported.CGMZ_Achievements && CGMZ.Versions["Achievements"] !== 1.0) {
		$cgmz.checkAchievementProfessionCriteria();
	}
};
//-----------------------------------------------------------------------------
// Level Down
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.levelDown = function() {
	this._level--;
};
//-----------------------------------------------------------------------------
// Change Level
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.changeLevel = function(mode, amount) {
	switch(mode) {
		case '=': 
			if(amount > this._maxLevel) amount = this._maxLevel;
			if(amount < 1) amount = 1;
			var levelExp = this.expForLevel(amount);
			break;
		case '+':
			var totalLevel = this._level + amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			var levelExp = this.expForLevel(totalLevel);
			break;
		case '-':
			var totalLevel = this._level - amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			var levelExp = this.expForLevel(totalLevel);
			break;
		default:
			levelExp = this._exp;
			const script = "CGMZ Professions";
			const error = "Malformed 'Level' command received";
			const suggestion = "Check for proper plugin command usage in events";
			$cgmzTemp.reportError(error, script, suggestion);
	}
	const neededExp = levelExp - this._exp;
	this.gainExp(neededExp);
};
//-----------------------------------------------------------------------------
// Gain Exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.gainExp = function(amount) {
	this.changeExp('+', amount);
};
//-----------------------------------------------------------------------------
// Lose Exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.loseExp = function(amount) {
	this.changeExp('-', amount);
};
//-----------------------------------------------------------------------------
// Set up level up toast (Requires CGMZ Toast)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setupLevelUpToast = function() {
	let toast = {};
	toast.CGMZProfessionToast = true;
	toast.color = this._color;
	toast.name = this._name;
	toast.level = this._level;
	if(this._toastSE !== "") toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Set up discover toast (Requires CGMZ Toast)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setupDiscoverToast = function() {
	console.log("test");
	let toast = {};
	toast.CGMZProfessionToastDiscover = true;
	toast.color = this._color;
	toast.name = this._name;
	if(this._toastSE !== "") toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage profession data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize profession data
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Professions_createPluginData.call(this);
	this.initializeProfessionData(false);
};
//-----------------------------------------------------------------------------
// Initialize profession data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeProfessionData = function(reinitialize) {
	if(!this._professions || reinitialize) {
		this.setupProfessionVariables();
	}
	for(let i = 0; i < CGMZ.Professions.Entries.length; i++) {
		var prof = new CGMZ_Profession(JSON.parse(CGMZ.Professions.Entries[i]));
		if(!this.getProfession(prof._name)) this._professions.push(prof);
	}
};
//-----------------------------------------------------------------------------
// Initialize profession variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupProfessionVariables = function() {
	this._professions = [];
};
//-----------------------------------------------------------------------------
// Returns array of all professions
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllProfessions = function() {
	return this._professions;
};
//-----------------------------------------------------------------------------
// Returns array of all professions
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredProfessions = function() {
	let discoveredProfs = [];
	for(let i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) discoveredProfs.push(this._professions[i]);
	}
	return discoveredProfs;
};
//-----------------------------------------------------------------------------
// Get profession by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getProfession = function(name) {
	for(let i = 0; i < this._professions.length; i++) {
		if(name == this._professions[i]._name) return this._professions[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a profession
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverProfession = function(name, discovered) {
	let profession = this.getProfession(name);
	if(profession) {
		(discovered === "false") ? discovered = false : discovered = true;
		profession.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Gain/Lose exp for profession
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeProfessionExp = function(name, mode, amount) {
	let profession = this.getProfession(name);
	if(profession) {
		profession.changeExp(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Change profession level
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeProfessionLevel = function(name, mode, amount) {
	let profession = this.getProfession(name);
	if(profession) {
		profession.changeLevel(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevels = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		total += this._professions[i]._maxLevel;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarned = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		total += this._professions[i]._level;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevelsDiscovered = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) total += this._professions[i]._maxLevel;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarnedDiscovered = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) total += this._professions[i]._level;
	}
	return total;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Register and handling for plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Professions_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Professions", "Call Scene", this.pluginCommandProfessionsCallScene);
	PluginManager.registerCommand("CGMZ_Professions", "reinitialize", this.pluginCommandProfessionsReinitialize);
	PluginManager.registerCommand("CGMZ_Professions", "discover", this.pluginCommandProfessionsDiscover);
	PluginManager.registerCommand("CGMZ_Professions", "changeExp", this.pluginCommandProfessionsChangeExp);
	PluginManager.registerCommand("CGMZ_Professions", "changeLevel", this.pluginCommandProfessionsChangeLevel);
	PluginManager.registerCommand("CGMZ_Professions", "getLevel", this.pluginCommandProfessionsGetLevel);
};
//-----------------------------------------------------------------------------
// Call profession scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsCallScene = function(args) {
	if(args.call) {
		SceneManager.push(CGMZ_Scene_Professions);
	}
};
//-----------------------------------------------------------------------------
// Reinitialize the profession data (for saved games)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsReinitialize = function(args) {
	if(args.reinitialize) {
		$cgmz.initializeProfessionData(true);
	}
};
//-----------------------------------------------------------------------------
// Set the discover status of a profession
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsDiscover = function(args) {
	$cgmz.discoverProfession(args.name, args.discover);
};
//-----------------------------------------------------------------------------
// Plugin command to change the profession's exp
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeExp = function(args) {
	$cgmz.changeProfessionExp(args.name, args.mode, Number(args.amount));
};
//-----------------------------------------------------------------------------
// Plugin command to change the profession's level
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeLevel = function(args) {
	$cgmz.changeProfessionLevel(args.name, args.mode, Number(args.amount));
};
//-----------------------------------------------------------------------------
// Plugin command to get the profession's level into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsGetLevel = function(args) {
	const profession = $cgmz.getProfession(args.name);
	if(profession) {
		$gameVariables.setValue(Number(args.variable), profession._level);
	}
};
//=============================================================================
// CGMZ_Scene_Professions
//-----------------------------------------------------------------------------
// Handle the professions scene
//=============================================================================
function CGMZ_Scene_Professions() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Professions.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Professions.prototype.constructor = CGMZ_Scene_Professions;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create profession windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createTotalWindow();
	this.createListWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create total window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createTotalWindow = function() {
	const rect = this.totalWindowRect();
    this._totalWindow = new CGMZ_Window_ProfessionTotal(rect);
	this._totalWindow.refresh();
    this.addWindow(this._totalWindow);
};
//-----------------------------------------------------------------------------
// Get total window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.totalWindowRect = function() {
	const x = 0;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, false);
	const y = Graphics.boxHeight - height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_ProfessionList(rect);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.refresh();
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.listWindowRect = function() {
	const x = 0;
	const y = this.mainAreaTop();
	const width = Graphics.boxWidth / 3;
	const height = Graphics.boxHeight - y - this._totalWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect()
    this._displayWindow = new CGMZ_Window_ProfessionDisplay(rect);
	this._displayWindow.refresh();
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.displayWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth * 2 / 3;
	const height = this._listWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On Display Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.onDisplayCancel = function() {
	this._displayWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMZ_Window_ProfessionTotal
//-----------------------------------------------------------------------------
// Shows total level for all professions
//=============================================================================
function CGMZ_Window_ProfessionTotal(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ProfessionTotal.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_ProfessionTotal.prototype.constructor = CGMZ_Window_ProfessionTotal;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.refresh = function() {
	this.contents.clear();
	this.drawTotalLevel();
};
//-----------------------------------------------------------------------------
// Draw total level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.drawTotalLevel = function() {
	let totalLevels = $cgmz.totalProfessionLevelsDiscovered();
	let earnedLevels = $cgmz.professionLevelsEarnedDiscovered();
	let descriptor = CGMZ.Professions.TotalLevelText + ": ";
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, 0, 0, this.contents.width, 'left');
	let x = this.textWidth(descriptor);
	descriptor = earnedLevels + " / " + totalLevels;
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(descriptor, x, 0, this.contents.width-x, 'left');
};
//=============================================================================
// CGMZ_Window_ProfessionList
//-----------------------------------------------------------------------------
// Selectable window for choosing a profession in a list.
//=============================================================================
function CGMZ_Window_ProfessionList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ProfessionList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_ProfessionList.prototype.constructor = CGMZ_Window_ProfessionList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.select(0);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.makeItemList = function() {
    this._data = $cgmz.getAllDiscoveredProfessions();
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.drawItem = function(index) {
    let item = this._data[index];
    let rect = this.itemRectWithPadding(index);
	this.changeTextColor(item._color);
	let iconBoxWidth = 0;
	if(item._iconIndex >= 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y + 4);
		iconBoxWidth = ImageManager.iconWidth + 4;
	}
    this.drawText(item._name, rect.x + iconBoxWidth, rect.y, rect.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
};
//=============================================================================
// CGMZ_Window_ProfessionDisplay
//-----------------------------------------------------------------------------
// Window displaying profession information
//=============================================================================
function CGMZ_Window_ProfessionDisplay(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ProfessionDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_ProfessionDisplay.prototype.constructor = CGMZ_Window_ProfessionDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Professions.ScrollWait, CGMZ.Professions.ScrollSpeed, CGMZ.Professions.AutoScroll, CGMZ.Professions.ScrollDeceleration);
	this._profession = null;
	this._largeIconWidth = ImageManager.iconWidth*2.2;
	this._largeIconHeight = ImageManager.iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem("IconSet");
};
//-----------------------------------------------------------------------------
// Set the profession to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.setItem = function(profession) {
	this._profession = profession;
	this.refresh();
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.refresh = function() {
	if(!this._profession) return;
	this.setupWindowForNewEntry();
	this._neededHeight = 0;
	let profession = this._profession;
	let width = this.contents.width;
	this.drawProfessionName(profession._name);
	if(profession._iconIndex > 0) {
		this.drawLargeIcon(profession._iconIndex);
	}
	this.drawProfessionLevel(profession);
	this.drawProfessionExperience(profession);
	this.drawProfessionExperienceToLevel(profession.expNeededToNextLevel());
	let y = this.drawProfessionDescription(profession._description);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Name of profession
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionName = function(name) {
	this.contents.fontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draw profession level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionLevel = function(profession) {
	let descriptor1 = CGMZ.Professions.LevelText + ": ";
	let descriptor2 = profession._level + " / " + profession._maxLevel;
	let x = (profession._iconIndex >= 0) ? this._largeIconWidth + 8 : 0;
	let y = this.lineHeight();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, y, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionExperience = function(profession) {
	let exp = profession._exp;
	let descriptor1 = CGMZ.Professions.ExpText + ": ";
	let descriptor2 = $cgmzTemp.numberSplit(exp);
	let x = (profession._iconIndex >= 0) ? this._largeIconWidth + 8 : 0;
	let y = this.lineHeight()*2;
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, y, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience to next level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionExperienceToLevel = function(exp) {
	let descriptor1 = CGMZ.Professions.ExpToLevelText + ": ";
	let descriptor2 = $cgmzTemp.numberSplit(exp);
	let x = 0;
	let y = this.lineHeight()*3;
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, y, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession description - returns y-value of line below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionDescription = function(description) {
	let descriptor1 = CGMZ.Professions.DescriptionText + ": ";
	let descriptor2 = description.split(" ");
	let x = 0;
	let y = this.lineHeight()*4;
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor1, x, y, this.contents.width, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(ColorManager.normalColor());
	for(let i = 0; i < descriptor2.length; i++) {
		if(descriptor2[i] === "") continue;
		if(descriptor2[i] === '\\n') {
			y += this.lineHeight();
			x = 0;
			continue;
		}
		var tempWidth = this.textWidth(descriptor2[i] + " ");
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(descriptor2[i] + " ", x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws a standard line (blue system text: white text)
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionStandardLine = function(descriptor1, descriptor2, x, y, width) {
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor1, x, y, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(descriptor2, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw Large icon
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawLargeIcon = function(iconIndex) {
	let bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
	const dw = this._largeIconWidth;
	const dh = this._largeIconHeight;
	const x = 0;
	const y = this.lineHeight();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMZ Profession Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMZ_ToastManager) {
const alias_CGMZ_Professions_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_Professions_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMZProfessionToast')) {
		this.changeTextColor(toastObject.color);
		this.drawText(toastObject.name, 0, 0, this.contents.width, 'left');
		this.changeTextColor(ColorManager.normalColor());
		var x = this.textWidth(toastObject.name + " ");
		this.drawText(CGMZ.Professions.LevelUpText, x, 0, this.contents.width-x, 'left');
		this.drawText(CGMZ.Professions.LevelText + ": " + toastObject.level, 0, this.lineHeight(), this.contents.width, 'center');
	}
	if(toastObject.hasOwnProperty('CGMZProfessionToastDiscover')) {
		this.drawText(CGMZ.Professions.DiscoverText, 0, 0, this.contents.width, 'center');
		this.changeTextColor(toastObject.color);
		this.drawText(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
		this.changeTextColor(ColorManager.normalColor());
	}
};
}