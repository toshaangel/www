/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/titlecommandwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_Changelog
 * @orderAfter CGMZ_Credits
 * @orderAfter CGMZ_ExitToDesktop
 * @plugindesc Manage the menu command window
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.1.0
 * ----------------------------------------------------------------------------
 * Description: Use this plugin to easily manage the command window in the
 * menu scene. It allows you to re-arrange commands or use JavaScript to 
 * add custom commands which are capable of calling custom plugin scenes or
 * functions.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin will overwrite the default title window if keep originals is
 * off. It is best to place this below any other plugins that add commands to
 * the title window if this option is used.
 *
 * The command symbol should be unique and not blank for every command. This
 * symbol is how the plugin knows internally which JS code to run.
 *
 * Some Command Symbols can have special meanings, mainly when they represent
 * the original commands.
 * The following symbols represent the original commands (case sensitive):
 * newGame - Will handle like the original new game command
 * continue - Will handle like the original continue command
 * options - Will handle like the original options command
 * 
 * It is important that you do not use these strings as the Command Symbol
 * property unless you mean to refer to the original commands.
 *
 * Options command:
 * {"Command Name":"Options","Command Symbol":"options","JS Command":"\"\""}
 * 
 * Version History:
 * 1.0.0: Initial Release
 * 
 * 1.0.1:
 * - Added ability to choose alignment of command text
 *
 * @param Visible Commands
 * @type number
 * @min 0
 * @default 3
 * @desc This is the number of commands that will be visible in the window without scrolling
 *
 * @param Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc The alignment of the command text in the window
 *
 * @param Keep Original Commands
 * @type boolean
 * @default true
 * @desc Determine whether to show the original commands in their original order.
 *
 * @param Commands
 * @type struct<Handler>[]
 * @desc Command Name and associated js commands
 * @default []
*/
/*~struct~Handler:
 * @param Command Name
 * @type text
 * @desc Name of the command to display in the command window.
 *
 * @param Command Symbol
 * @type text
 * @desc This symbol is used internally to recognize the command.
 * Special meaning for original commands (see documentation).
 *
 * @param JS Command
 * @type note
 * @desc JavaScript to run when command is selected.
 * @default ""
*/
var Imported = Imported || {};
Imported.CGMZ_Title_CommandWindow = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Title Command Window"] = "1.0.1";
CGMZ.Title_CommandWindow = CGMZ.Title_CommandWindow || {};
CGMZ.Title_CommandWindow.parameters = PluginManager.parameters('CGMZ_TitleCommandWindow');
CGMZ.Title_CommandWindow.CommandsText = CGMZ.Title_CommandWindow.parameters["Commands"] || "";
CGMZ.Title_CommandWindow.Alignment = CGMZ.Title_CommandWindow.parameters["Alignment"] || "center";
CGMZ.Title_CommandWindow.VisibleCommands = Number(CGMZ.Title_CommandWindow.parameters["Visible Commands"]);
CGMZ.Title_CommandWindow.KeepOriginals = (CGMZ.Title_CommandWindow.parameters["Keep Original Commands"] === "true") ? true : false;
CGMZ.Title_CommandWindow.CommandsArray = JSON.parse(CGMZ.Title_CommandWindow.CommandsText);
CGMZ.Title_CommandWindow.Commands = [];
for(let i = 0; i < CGMZ.Title_CommandWindow.CommandsArray.length; i++) {
	CGMZ.Title_CommandWindow.Commands.push(JSON.parse(CGMZ.Title_CommandWindow.CommandsArray[i]));
}
//=============================================================================
// Scene Title
//-----------------------------------------------------------------------------
// Handling for command window entries
//=============================================================================
//-----------------------------------------------------------------------------
// Handling for custom Commands added through the plugin
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_TitleCommand_commandCustom = function() {
	for(let i = 0; i < CGMZ.Title_CommandWindow.Commands.length; i++) {
		if(this._commandWindow.currentSymbol() === CGMZ.Title_CommandWindow.Commands[i]["Command Symbol"]) {
			try {
				eval(JSON.parse(CGMZ.Title_CommandWindow.Commands[i]["JS Command"]));
			}
			catch (e) {
				const origin = "CGMZ Title Command Window";
				const suggestion = "Check your JavaScript command";
				$cgmzTemp.reportError(e.message, origin, suggestion);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Add additional commands.
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleCommandWindow_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	alias_CGMZ_TitleCommandWindow_createCommandWindow.call(this);
	for(let i = 0; i < CGMZ.Title_CommandWindow.Commands.length; i++) {
		if(this.CGMZ_TitleCommandWindow_isCustomCommand(CGMZ.Title_CommandWindow.Commands[i]["Command Symbol"])) {
			this._commandWindow.setHandler(CGMZ.Title_CommandWindow.Commands[i]["Command Symbol"], this.CGMZ_TitleCommand_commandCustom.bind(this));
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if command is a custom command in need of custom handler
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_TitleCommandWindow_isCustomCommand = function(symbol) {
	return (symbol !== 'options' && symbol !== 'continue' && symbol !== 'newGame');
};
//-----------------------------------------------------------------------------
// Alias. Change the rectangle height based on number of visible commands
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleCommandWindow_commandWindowRect = Scene_Title.prototype.commandWindowRect;
Scene_Title.prototype.commandWindowRect = function() {
    let rect = alias_CGMZ_TitleCommandWindow_commandWindowRect.call(this);
	rect.height = this.calcWindowHeight(CGMZ.Title_CommandWindow.VisibleCommands, true);
	return rect;
};
//=============================================================================
// Window TitleCommand
//-----------------------------------------------------------------------------
// Change commands in the command window
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Add original commands in original order if user wishes
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleCommandWindow_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
	if(CGMZ.Title_CommandWindow.KeepOriginals) {
		alias_CGMZ_TitleCommandWindow_makeCommandList.call(this);
	}
	for(let i = 0; i < CGMZ.Title_CommandWindow.Commands.length; i++) {
		let cmd = CGMZ.Title_CommandWindow.Commands[i];
		this.addCommand(cmd["Command Name"], cmd["Command Symbol"], this.CGMZ_TitleCommandWindow_isCommandEnabled(cmd));
	}
};
//-----------------------------------------------------------------------------
// Check if command should be enabled
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.CGMZ_TitleCommandWindow_isCommandEnabled = function(command) {
	if(command["Command Symbol"] === "continue") {
		return this.isContinueEnabled();
	}
	return true;
};
//-----------------------------------------------------------------------------
// Change alignment of command text
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.itemTextAlign = function() {
    return CGMZ.Title_CommandWindow.Alignment;
};