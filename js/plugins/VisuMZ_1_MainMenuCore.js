//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.15] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 *   - Only applies to the Command Window style: Default Vertical.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.15: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: October 25, 2021
 * * Bug Fixes!
 * ** Plugin Parameter settings for automatic Command Window height adjustment
 *    should now work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Added a note for the Help File: Gold Window > Thinner Gold Window
 * *** Only applies to the Command Window style: Default Vertical.
 * 
 * Version 1.13: October 21, 2021
 * * Feature Update!
 * ** Rounding update applied to picture portraits so that coordinates aren't
 *    drawn on non-whole numbers due to base images having odd values. Update
 *    made by Olivia.
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x583141=_0x513e;function _0x66dc(){const _0x1f5fe3=['wamrM','TextJS','_actor','playtimeWindowRect','addMainCommands','PortraitStyle','EVAL','commandName','isBattleMember','name','150284RZqLkO','onPersonalOk','iconHeight','commandNameWindowDrawBackground','_list','XIyyI','bitmap','reserveCommonEvent','commandFormation','addCommand','Rows','775191oICzSj','_commandNameWindow','onPersonalCancel','_playtimeWindow','isBigCharacter','loadFaceImages','members','OSDpR','154296KsaseC','isArray','_bitmapReady','floor','oFQyD','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','mwOXf','loadOtherActorImages','normalColor','boxWidth','svbattler','canCreatePlaytimeWindow','drawTimeIcon','CommandList','setHandler','colSpacing','setTargetActor','tmslH','changePaintOpacity','drawItemStatusPortraitStyleOnLoad','updateCommandNameWindow','VerticalStyle','gameEnd','cAghR','_timer','ChangeActorMenuImageJS','calcWindowHeight','Scene_Menu_createStatusWindow','adjustStatusWindowMobile','drawSvActor','mainAreaBottom','pIUrV','min','blt','activate','commandWindowRectMobileStyle','maxVisibleItems','addGameEndCommand','applyThinnerGoldWindowRect','adjustDefaultCommandWindowRect','svActorVertCells','exit','openness','commandStyleCheck','_dummyWindow','_scene','createCommandWindow','ThinGoldWindow','drawItemStatusDefaultStyle','EvIwv','aKLYb','Scene_Menu_statusWindowRect','lpfjQ','_commandWindow','initMenuImage','lineHeight','push','855WwVzdA','MainMenuCore','drawActorFace','xnsMf','drawItemActorFace','maxItems','Enable','drawPendingItemBackground','fzQsZ','CommandWindowStyle','Game_Actor_setup','Window_MenuCommand_initialize','efjHy','updateDuration','variables','length','addLoadListener','max','CallHandlerJS','YMVNV','itemLineRect','createStatusWindow','commandCommonEvent','ShowReserve','ofCVE','drawItemStatus','replace','MKfzl','Playtime','mainCommandWidth','27042081oKSfCZ','updateActor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','commandStyle','getMenuImageOffsetY','playtimeWindowRectTopStyle','thin','YYgix','drawItemStatusSoloStyle','_data','constructor','_goldWindow','ARRAYFUNC','onBitmapLoad','value','round','iiWuK','itemRect','thinBottom','loadCharacter','STR','drawAllItems','SoloStyle','innerWidth','mobile','resetTextColor','graphicType','pXVFz','drawItemStatusThinStyle','boxHeight','updatePosition','icon','statusWindowRect','shift','ConvertParams','variableWindowRectTopStyle','currentExt','bottom','addWindow','createPlaytimeWindow','_menuImage','NUM','createCommandNameWindow','faceHeight','58716rvRKkJ','Scene_Menu_commandWindowRect','ChangeActorMenuImageRange','drawTimeLabel','itemTextAlign','hasStaticSvBattler','createDummyWindow','AutoGoldHeight','commandWindowRectThinTopStyle','Scene_Menu_onPersonalCancel','BgType','InnerMenuListStyle','characterIndex','Scene_MenuBase_updateActor','index','selectLast','cancel','Cols','Scene_Menu_commandFormation','save','Scene_Menu_commandPersonal','Untitled','ShowJS','MobileThickness','drawIcon','addSaveCommand','createActorMenuBackgroundImageSprite','_duration','makeCommandList','variableWindowRectBottomStyle','Step1','addChild','version','\x5cI[%1]%2','_commandList','DefaultStyle','drawItemActorSprite','left','itemHeight','ListStyles','OvKEn','LdVaV','General','makeMainMenuCoreCommandList','updateOpacity','cceTn','updateTimer','drawActorGraphic','_actorMenuBgSprite','bind','drawItemActorMenuImage','clear','thicker','listStyle','width','none','commandWindowStyle','ARRAYJSON','isSoloQuickMode','lPurE','statusWindowRectTopStyle','statusWindowRectBottomStyle','open','drawItemStyleIcon','height','goldWindowRectTopStyle','goldWindowRectBottomStyle','faceWidth','drawText','options','onFormationCancel','ActorBgMenus','STRUCT','540WNrNPD','commandNameWindowCenter','PixelateImageRendering','createVariableWindow','statusWindowRectMobileStyle','Window_MenuStatus_selectLast','right','changeTextColor','Step1Start','Scene_Menu_goldWindowRect','mainAreaHeight','textSizeEx','Scene_Menu_create','registerCommand','Step1End','playtimeWindowRectBottomStyle','drawItemBackground','top','center','HLgjM','mTPOI','playtimeText','parameters','isExpGaugeDrawn','HideMainMenuOnly','fontSize','innerHeight','format','characterName','setBackgroundType','thinTop','ARRAYSTR','maxBattleMembers','Window_MenuStatus_drawItemImage','addSymbolBridge','solo','return\x200','contents','AdjustCommandHeight','Window_MenuStatus_itemHeight','sprite','Scene_Menu_onFormationCancel','default','call','createGoldWindow','vMjCf','commandWindowRectTopStyle','StatusSelectLast','ARRAYSTRUCT','Icon','sbMXd','battleMembers','getMenuImage','opacity','adjustCommandHeightByPlaytime','PruPC','goldWindowRect','update','drawPlaytime','battlerName','trim','HbFSZ','Variable','loadPicture','isDisplayActorMenuBackgroundImage','vertical','Window_StatusBase_loadFaceImages','item','actor','windowPadding','iconText','initialize','VisuMZ_0_CoreEngine','iconWidth','BUeCK','Style','match','StatusGraphic','setup','bkRAW','loadBitmap','needsDummyWindow','createBackground','Window_MenuStatus_maxItems','addOptionsCommand','note','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','CustomCmdWin','ThickerStyle','27CRzGvE','status','showOnlyBattleMembers','yMNlt','VarList','ExtJS','ceil','_playtimeText','callUpdateHelp','commandNameWindowDrawText','systemColor','aRUAA','Scene_MenuBase_createBackground','FontSize','svActorHorzCells','setMenuImage','commandWindowRect','text','includes','_statusWindow','filter','Time','addFormationCommand','drawItemStatusPortraitStyle','drawItemActorSvBattler','toUpperCase','drawItemStatusVerticalStyle','10549360uQGxAp','parse','_variableWindow','CoreEngine','setActor','canCreateVariableWindow','AutoGoldY','Symbol','drawItem','popScene','resetFontSettings','getMenuImageOffsetX','drawItemStyleIconText','drawTextEx','Settings','prototype','105ORqOzh','drawItemStatusSoloStyleOnLoad','addOriginalCommands','nvlqP','SoloQuick','ztHlc','thinGoldWindow','Step2','ILnea','portrait','VeGCY','description','close','loadSvActor','commandWindowRectBottomStyle','maxCols','LcQGO','create','QoL','map','refresh','DMGhk','35456DyWNli','EnableJS','variableWindowRect','drawItemStatusThickerStyle','mainAreaTop'];_0x66dc=function(){return _0x1f5fe3;};return _0x66dc();}(function(_0x4578b1,_0x4f2f1e){const _0x469720=_0x513e,_0x1ce636=_0x4578b1();while(!![]){try{const _0x57de99=parseInt(_0x469720(0x18e))/0x1+parseInt(_0x469720(0x196))/0x2*(-parseInt(_0x469720(0x133))/0x3)+-parseInt(_0x469720(0x183))/0x4*(-parseInt(_0x469720(0x15e))/0x5)+-parseInt(_0x469720(0x262))/0x6*(-parseInt(_0x469720(0x219))/0x7)+-parseInt(_0x469720(0x174))/0x8*(-parseInt(_0x469720(0x1cf))/0x9)+parseInt(_0x469720(0x14e))/0xa+-parseInt(_0x469720(0x1ed))/0xb;if(_0x57de99===_0x4f2f1e)break;else _0x1ce636['push'](_0x1ce636['shift']());}catch(_0x540b21){_0x1ce636['push'](_0x1ce636['shift']());}}}(_0x66dc,0x9cd47));function _0x513e(_0x5d8a2e,_0x53d84d){const _0x66dc64=_0x66dc();return _0x513e=function(_0x513e46,_0x5d92d6){_0x513e46=_0x513e46-0x130;let _0x29a199=_0x66dc64[_0x513e46];return _0x29a199;},_0x513e(_0x5d8a2e,_0x53d84d);}var label=_0x583141(0x1d0),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x583141(0x147)](function(_0x4d22c4){const _0x4d57a5=_0x583141;return _0x4d22c4[_0x4d57a5(0x134)]&&_0x4d22c4[_0x4d57a5(0x169)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x583141(0x15c)]=VisuMZ[label][_0x583141(0x15c)]||{},VisuMZ[_0x583141(0x20f)]=function(_0x33eefb,_0x41ac08){const _0x325f8d=_0x583141;for(const _0x5b3600 in _0x41ac08){if(_0x5b3600[_0x325f8d(0x2ae)](/(.*):(.*)/i)){const _0x2885f6=String(RegExp['$1']),_0x1420e2=String(RegExp['$2'])[_0x325f8d(0x14c)]()[_0x325f8d(0x29e)]();let _0x238860,_0x5c5efb,_0x3b5e1a;switch(_0x1420e2){case _0x325f8d(0x216):_0x238860=_0x41ac08[_0x5b3600]!==''?Number(_0x41ac08[_0x5b3600]):0x0;break;case'ARRAYNUM':_0x5c5efb=_0x41ac08[_0x5b3600]!==''?JSON[_0x325f8d(0x14f)](_0x41ac08[_0x5b3600]):[],_0x238860=_0x5c5efb[_0x325f8d(0x171)](_0x476a4c=>Number(_0x476a4c));break;case _0x325f8d(0x17f):_0x238860=_0x41ac08[_0x5b3600]!==''?eval(_0x41ac08[_0x5b3600]):null;break;case'ARRAYEVAL':_0x5c5efb=_0x41ac08[_0x5b3600]!==''?JSON['parse'](_0x41ac08[_0x5b3600]):[],_0x238860=_0x5c5efb['map'](_0x8994f7=>eval(_0x8994f7));break;case'JSON':_0x238860=_0x41ac08[_0x5b3600]!==''?JSON['parse'](_0x41ac08[_0x5b3600]):'';break;case _0x325f8d(0x252):_0x5c5efb=_0x41ac08[_0x5b3600]!==''?JSON['parse'](_0x41ac08[_0x5b3600]):[],_0x238860=_0x5c5efb[_0x325f8d(0x171)](_0x395d78=>JSON['parse'](_0x395d78));break;case'FUNC':_0x238860=_0x41ac08[_0x5b3600]!==''?new Function(JSON[_0x325f8d(0x14f)](_0x41ac08[_0x5b3600])):new Function(_0x325f8d(0x286));break;case _0x325f8d(0x1f9):_0x5c5efb=_0x41ac08[_0x5b3600]!==''?JSON[_0x325f8d(0x14f)](_0x41ac08[_0x5b3600]):[],_0x238860=_0x5c5efb['map'](_0x1b5df0=>new Function(JSON['parse'](_0x1b5df0)));break;case _0x325f8d(0x201):_0x238860=_0x41ac08[_0x5b3600]!==''?String(_0x41ac08[_0x5b3600]):'';break;case _0x325f8d(0x281):_0x5c5efb=_0x41ac08[_0x5b3600]!==''?JSON[_0x325f8d(0x14f)](_0x41ac08[_0x5b3600]):[],_0x238860=_0x5c5efb[_0x325f8d(0x171)](_0x16b7c9=>String(_0x16b7c9));break;case _0x325f8d(0x261):_0x3b5e1a=_0x41ac08[_0x5b3600]!==''?JSON['parse'](_0x41ac08[_0x5b3600]):{},_0x33eefb[_0x2885f6]={},VisuMZ[_0x325f8d(0x20f)](_0x33eefb[_0x2885f6],_0x3b5e1a);continue;case _0x325f8d(0x292):_0x5c5efb=_0x41ac08[_0x5b3600]!==''?JSON[_0x325f8d(0x14f)](_0x41ac08[_0x5b3600]):[],_0x238860=_0x5c5efb[_0x325f8d(0x171)](_0x492846=>VisuMZ[_0x325f8d(0x20f)]({},JSON['parse'](_0x492846)));break;default:continue;}_0x33eefb[_0x2885f6]=_0x238860;}}return _0x33eefb;},(_0x200f51=>{const _0x3bf5bf=_0x583141,_0x1cd501=_0x200f51['name'];for(const _0x1ae033 of dependencies){if(_0x3bf5bf(0x163)!==_0x3bf5bf(0x163)){_0x5b27b9['prototype'][_0x3bf5bf(0x13b)][_0x3bf5bf(0x28d)](this);if(this[_0x3bf5bf(0x18f)])this['updateCommandNameWindow']();}else{if(!Imported[_0x1ae033]){alert(_0x3bf5bf(0x19b)[_0x3bf5bf(0x27d)](_0x1cd501,_0x1ae033)),SceneManager['exit']();break;}}}const _0x84b9be=_0x200f51[_0x3bf5bf(0x169)];if(_0x84b9be['match'](/\[Version[ ](.*?)\]/i)){if(_0x3bf5bf(0x1fd)==='CZTEM'){const _0x30d96d=_0x528bf5[_0x3bf5bf(0x155)];if(_0xcb1868[_0x3bf5bf(0x22f)][_0x3bf5bf(0x28d)](this)){let _0x274a88=_0x31a340['TextStr'];if(['',_0x3bf5bf(0x22e)][_0x3bf5bf(0x145)](_0x274a88))_0x274a88=_0x2dd062['TextJS']['call'](this);const _0x3d0f91=_0x296740[_0x3bf5bf(0x293)];_0x3d0f91>0x0&&this['commandStyle']()!==_0x3bf5bf(0x144)&&(_0x274a88=_0x3bf5bf(0x23a)[_0x3bf5bf(0x27d)](_0x3d0f91,_0x274a88));const _0x47da34=_0x35e20e[_0x3bf5bf(0x175)][_0x3bf5bf(0x28d)](this),_0x34af53=_0x5cd496[_0x3bf5bf(0x138)][_0x3bf5bf(0x28d)](this);this[_0x3bf5bf(0x18c)](_0x274a88,_0x30d96d,_0x47da34,_0x34af53),this['setHandler'](_0x30d96d,_0x587aca[_0x3bf5bf(0x1e1)][_0x3bf5bf(0x24a)](this,_0x34af53));}this[_0x3bf5bf(0x284)](_0x30d96d);}else{const _0x2c7d86=Number(RegExp['$1']);_0x2c7d86!==VisuMZ[label][_0x3bf5bf(0x239)]&&(alert(_0x3bf5bf(0x1ef)[_0x3bf5bf(0x27d)](_0x1cd501,_0x2c7d86)),SceneManager[_0x3bf5bf(0x1bf)]());}}if(_0x84b9be['match'](/\[Tier[ ](\d+)\]/i)){if('MKfzl'!==_0x3bf5bf(0x1ea)){if(this['isSoloQuickMode']()&&this[_0x3bf5bf(0x146)])_0x146452[_0x3bf5bf(0x1a6)](_0x5cc0da['members']()[0x0]),this['onPersonalOk']();else{if(this[_0x3bf5bf(0x251)]()===_0x3bf5bf(0x205))this[_0x3bf5bf(0x146)]['open']();_0x4fcac0[_0x3bf5bf(0x1d0)]['Scene_Menu_commandPersonal'][_0x3bf5bf(0x28d)](this);}}else{const _0x5ab1f8=Number(RegExp['$1']);if(_0x5ab1f8<tier)alert(_0x3bf5bf(0x130)['format'](_0x1cd501,_0x5ab1f8,tier)),SceneManager[_0x3bf5bf(0x1bf)]();else{if('cAghR'===_0x3bf5bf(0x1ad))tier=Math[_0x3bf5bf(0x1e0)](_0x5ab1f8,tier);else{const _0x30fa85=_0x5b08ab['boxWidth'],_0x1cb270=this[_0x3bf5bf(0x26c)]()-this[_0x3bf5bf(0x1f8)]['height'],_0x275ea0=0x0,_0x33b1bb=this[_0x3bf5bf(0x1b4)]()-this['_goldWindow'][_0x3bf5bf(0x259)]-_0x1cb270;return new _0x449a2c(_0x275ea0,_0x33b1bb,_0x30fa85,_0x1cb270);}}}}VisuMZ[_0x3bf5bf(0x20f)](VisuMZ[label][_0x3bf5bf(0x15c)],_0x200f51[_0x3bf5bf(0x278)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'ChangeActorMenuImageGroup',_0xbfdf30=>{const _0x3889ef=_0x583141;VisuMZ['ConvertParams'](_0xbfdf30,_0xbfdf30);const _0x26591a=_0xbfdf30[_0x3889ef(0x237)],_0x31dbc2=_0xbfdf30[_0x3889ef(0x165)];for(let _0x1f79c8 of _0x26591a){_0x1f79c8=parseInt(_0x1f79c8)||0x0;if(_0x1f79c8<=0x0)continue;const _0x10368f=$gameActors[_0x3889ef(0x2a6)](_0x1f79c8);if(!_0x10368f)continue;_0x10368f[_0x3889ef(0x142)](_0x31dbc2);}}),PluginManager['registerCommand'](pluginData['name'],_0x583141(0x21b),_0x218ceb=>{const _0xcac2ce=_0x583141;VisuMZ[_0xcac2ce(0x20f)](_0x218ceb,_0x218ceb);const _0x48c4da=_0x218ceb[_0xcac2ce(0x270)]>=_0x218ceb[_0xcac2ce(0x26a)]?_0x218ceb[_0xcac2ce(0x26a)]:_0x218ceb[_0xcac2ce(0x270)],_0x122e16=_0x218ceb[_0xcac2ce(0x270)]>=_0x218ceb[_0xcac2ce(0x26a)]?_0x218ceb[_0xcac2ce(0x270)]:_0x218ceb[_0xcac2ce(0x26a)],_0x2acc50=Array(_0x122e16-_0x48c4da+0x1)['fill']()[_0xcac2ce(0x171)]((_0x2e730c,_0x555feb)=>_0x48c4da+_0x555feb),_0x59ef6c=_0x218ceb['Step2'];for(let _0x272664 of _0x2acc50){_0x272664=parseInt(_0x272664)||0x0;if(_0x272664<=0x0)continue;const _0x804a27=$gameActors[_0xcac2ce(0x2a6)](_0x272664);if(!_0x804a27)continue;_0x804a27['setMenuImage'](_0x59ef6c);}}),PluginManager[_0x583141(0x26f)](pluginData['name'],_0x583141(0x1af),_0x29a250=>{const _0x9c85f4=_0x583141;VisuMZ[_0x9c85f4(0x20f)](_0x29a250,_0x29a250);const _0x52b5d9=_0x29a250['Step1'];let _0x42ea14=[];while(_0x52b5d9[_0x9c85f4(0x1de)]>0x0){const _0x5e4d16=_0x52b5d9[_0x9c85f4(0x20e)]();if(Array[_0x9c85f4(0x197)](_0x5e4d16))_0x42ea14=_0x42ea14['concat'](_0x5e4d16);else{if(_0x9c85f4(0x19a)!=='oFQyD')return this[_0x9c85f4(0x1cd)]();else _0x42ea14[_0x9c85f4(0x1ce)](_0x5e4d16);}}const _0x144d45=_0x29a250[_0x9c85f4(0x165)];for(let _0x2e5ee1 of _0x42ea14){if(_0x9c85f4(0x276)===_0x9c85f4(0x276)){_0x2e5ee1=parseInt(_0x2e5ee1)||0x0;if(_0x2e5ee1<=0x0)continue;const _0x239b47=$gameActors[_0x9c85f4(0x2a6)](_0x2e5ee1);if(!_0x239b47)continue;_0x239b47[_0x9c85f4(0x142)](_0x144d45);}else{_0xc4e549=_0x28fb3e||_0x2f117c['faceWidth'],_0x2bb6f9=_0x47e737||_0xe2289e[_0x9c85f4(0x218)];const _0x26ee07=_0x101793[_0x9c85f4(0x27e)](),_0x37867a=_0x317ae9[_0x9c85f4(0x225)](),_0x58905a=_0x41cb17[_0x9c85f4(0x200)](_0x26ee07),_0x2ed58f=_0x240b0c['isBigCharacter'](_0x26ee07),_0x1bcdf2=_0x58905a[_0x9c85f4(0x24f)]/(_0x2ed58f?0x3:0xc),_0x2877ac=_0x58905a[_0x9c85f4(0x259)]/(_0x2ed58f?0x4:0x8),_0x3189ef=_0x42b33a,_0x34668e=_0x61f353-0x2,_0x512cfa=_0x2ac172+_0x55e9a2[_0x9c85f4(0x199)](_0x3189ef/0x2),_0x13e6ec=_0x1d9e2c+_0x5b5f4a['ceil']((_0x138f0d+_0x2877ac)/0x2);this[_0x9c85f4(0x1f7)]===_0x7fcedc&&this[_0x9c85f4(0x1a8)](_0xfdaea5['isBattleMember']());const _0x6addf2=_0xd62fe5[_0x9c85f4(0x1b6)](_0x5c1d86,_0x1bcdf2),_0x492327=_0x33e003['min'](_0x4278cf,_0x2877ac),_0x672cd6=_0x42696e[_0x9c85f4(0x199)](_0x2fc960+_0x4d8c58['max'](_0x3a0733-_0x1bcdf2,0x0)/0x2),_0x3d2dd9=_0x32e66c[_0x9c85f4(0x199)](_0x3e1423+_0x4d1f45[_0x9c85f4(0x1e0)](_0x22a42c-_0x2877ac,0x0)/0x2),_0x43dfc8=_0x2ed58f?0x0:_0x37867a,_0x169676=(_0x43dfc8%0x4*0x3+0x1)*_0x1bcdf2,_0x2eb69f=_0xe30034[_0x9c85f4(0x199)](_0x43dfc8/0x4)*0x4*_0x2877ac;this[_0x9c85f4(0x287)][_0x9c85f4(0x1b7)](_0x58905a,_0x169676,_0x2eb69f,_0x6addf2,_0x492327,_0x672cd6,_0x3d2dd9),this[_0x9c85f4(0x1a8)](!![]);}}}),VisuMZ['MainMenuCore'][_0x583141(0x1d9)]=Game_Actor[_0x583141(0x15d)]['setup'],Game_Actor[_0x583141(0x15d)][_0x583141(0x2b0)]=function(_0x5ed69a){const _0x4bbe03=_0x583141;VisuMZ[_0x4bbe03(0x1d0)][_0x4bbe03(0x1d9)][_0x4bbe03(0x28d)](this,_0x5ed69a),this[_0x4bbe03(0x1cc)]();},Game_Actor[_0x583141(0x15d)][_0x583141(0x1cc)]=function(){const _0x120ed4=_0x583141;this[_0x120ed4(0x215)]='';if(this[_0x120ed4(0x2a6)]()&&this[_0x120ed4(0x2a6)]()['note'][_0x120ed4(0x2ae)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x120ed4(0x1ca)!==_0x120ed4(0x1ca)){if(_0x61ad8a[_0x120ed4(0x1d0)]['Settings']['General'][_0x120ed4(0x154)]){const _0x8fc7e4=_0x48fa26[_0x120ed4(0x259)]-this['calcWindowHeight'](0x1,![]);_0x23a7bc['y']+=_0x8fc7e4;}_0x37caac[_0x120ed4(0x1d0)][_0x120ed4(0x15c)]['General']['AutoGoldHeight']&&(_0x4c7ceb[_0x120ed4(0x259)]=this[_0x120ed4(0x1b0)](0x1,![]));}else this[_0x120ed4(0x215)]=String(RegExp['$1']);}},Game_Actor[_0x583141(0x15d)][_0x583141(0x296)]=function(){const _0x18dd80=_0x583141;if(this['_menuImage']===undefined)this['initMenuImage']();return this[_0x18dd80(0x215)];},Game_Actor['prototype']['setMenuImage']=function(_0x469461){const _0x49904a=_0x583141;if(this[_0x49904a(0x215)]===undefined)this['initMenuImage']();this[_0x49904a(0x215)]=_0x469461;},Game_Actor[_0x583141(0x15d)][_0x583141(0x159)]=function(){const _0x4d77c2=_0x583141;if(this[_0x4d77c2(0x2a6)]()[_0x4d77c2(0x2b7)][_0x4d77c2(0x2ae)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()['note'][_0x4d77c2(0x2ae)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return _0x4d77c2(0x136)===_0x4d77c2(0x136)?Number(RegExp['$1']):_0x235eb0[_0x4d77c2(0x15d)][_0x4d77c2(0x1a5)][_0x4d77c2(0x28d)](this);}return 0x0;},Game_Actor[_0x583141(0x15d)][_0x583141(0x1f1)]=function(){const _0x30210a=_0x583141;if(this[_0x30210a(0x2a6)]()[_0x30210a(0x2b7)][_0x30210a(0x2ae)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x30210a(0x1e7)!==_0x30210a(0x1c7))return Number(RegExp['$1']);else _0x456d37[_0x30210a(0x1d0)]['Settings'][_0x30210a(0x243)][_0x30210a(0x291)]?_0x109716[_0x30210a(0x1d0)][_0x30210a(0x267)]['call'](this):this['smoothSelect'](0x0);}else{if(this[_0x30210a(0x2a6)]()[_0x30210a(0x2b7)][_0x30210a(0x2ae)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x583141(0x15d)]['isDisplayActorMenuBackgroundImage']=function(){const _0x57b2e9=_0x583141;return VisuMZ['MainMenuCore']['Settings'][_0x57b2e9(0x243)][_0x57b2e9(0x260)][_0x57b2e9(0x145)](this['constructor'][_0x57b2e9(0x182)]);},VisuMZ[_0x583141(0x1d0)][_0x583141(0x13f)]=Scene_MenuBase[_0x583141(0x15d)]['createBackground'],Scene_MenuBase[_0x583141(0x15d)][_0x583141(0x2b4)]=function(){const _0xcf2e2e=_0x583141;VisuMZ['MainMenuCore']['Scene_MenuBase_createBackground'][_0xcf2e2e(0x28d)](this),this[_0xcf2e2e(0x233)]();},Scene_MenuBase[_0x583141(0x15d)][_0x583141(0x233)]=function(){const _0x49ef58=_0x583141;this['_actorMenuBgSprite']=new Sprite_MenuBackgroundActor(),this[_0x49ef58(0x238)](this[_0x49ef58(0x249)]);},VisuMZ[_0x583141(0x1d0)][_0x583141(0x226)]=Scene_MenuBase['prototype'][_0x583141(0x1ee)],Scene_MenuBase[_0x583141(0x15d)][_0x583141(0x1ee)]=function(){const _0x12954b=_0x583141;VisuMZ['MainMenuCore'][_0x12954b(0x226)]['call'](this),this[_0x12954b(0x2a2)]()&&this[_0x12954b(0x249)]&&this['_actorMenuBgSprite'][_0x12954b(0x152)](this[_0x12954b(0x17b)]);},VisuMZ[_0x583141(0x1d0)][_0x583141(0x26e)]=Scene_Menu[_0x583141(0x15d)][_0x583141(0x16f)],Scene_Menu[_0x583141(0x15d)]['create']=function(){const _0x4886cd=_0x583141;VisuMZ[_0x4886cd(0x1d0)][_0x4886cd(0x26e)][_0x4886cd(0x28d)](this),this[_0x4886cd(0x214)](),this[_0x4886cd(0x265)](),this[_0x4886cd(0x21f)]();},Scene_Menu[_0x583141(0x15d)][_0x583141(0x1c4)]=function(){const _0x461516=_0x583141,_0x593a24=this[_0x461516(0x143)](),_0x225ba4=new Window_MenuCommand(_0x593a24);_0x225ba4[_0x461516(0x1a4)](_0x461516(0x229),this[_0x461516(0x157)]['bind'](this)),this['addWindow'](_0x225ba4),this[_0x461516(0x1cb)]=_0x225ba4;},VisuMZ[_0x583141(0x1d0)][_0x583141(0x21a)]=Scene_Menu[_0x583141(0x15d)][_0x583141(0x143)],Scene_Menu[_0x583141(0x15d)][_0x583141(0x143)]=function(){const _0x54d3e1=_0x583141,_0x14425d=this[_0x54d3e1(0x251)]();if(_0x14425d===_0x54d3e1(0x273)){if(_0x54d3e1(0x241)===_0x54d3e1(0x241))return this[_0x54d3e1(0x290)]();else{const _0x50f3c2=_0x580a7d[_0x54d3e1(0x1d0)]['Scene_Menu_goldWindowRect'][_0x54d3e1(0x28d)](this);return this['applyThinnerGoldWindowRect'](_0x50f3c2),_0x50f3c2;}}else{if(_0x14425d==='thinTop')return this[_0x54d3e1(0x221)]();else{if(_0x14425d===_0x54d3e1(0x212))return this['commandWindowRectBottomStyle']();else{if(_0x14425d===_0x54d3e1(0x1ff))return _0x54d3e1(0x13e)!==_0x54d3e1(0x1b5)?this['commandWindowRectThinBottomStyle']():this['lineHeight']();else{if(_0x14425d===_0x54d3e1(0x205)){if('rcjYw'==='rcjYw')return this[_0x54d3e1(0x1b9)]();else{const _0x21a114=this[_0x54d3e1(0x18f)];_0x21a114['contents']['clear']();const _0x38a977=this[_0x54d3e1(0x1c1)](this['index']());if(_0x38a977===_0x54d3e1(0x20c)){const _0x4ef2a2=this[_0x54d3e1(0x1e3)](this[_0x54d3e1(0x227)]());let _0x458727=this['commandName'](this['index']());_0x458727=_0x458727['replace'](/\\I\[(\d+)\]/gi,''),_0x21a114[_0x54d3e1(0x158)](),this[_0x54d3e1(0x186)](_0x458727,_0x4ef2a2),this['commandNameWindowDrawText'](_0x458727,_0x4ef2a2),this[_0x54d3e1(0x263)](_0x458727,_0x4ef2a2);}}}else{if(_0x54d3e1(0x166)!==_0x54d3e1(0x2b1)){const _0x5e7994=VisuMZ['MainMenuCore']['Scene_Menu_commandWindowRect'][_0x54d3e1(0x28d)](this);return this[_0x54d3e1(0x1bd)](_0x5e7994),_0x5e7994;}else _0x405d8b['prototype']['update'][_0x54d3e1(0x28d)](this),this[_0x54d3e1(0x198)]&&(this['updateOpacity'](),this[_0x54d3e1(0x20b)](),this[_0x54d3e1(0x1dc)]());}}}}}},Scene_Menu['prototype'][_0x583141(0x1bd)]=function(_0x1eb507){const _0x3e3811=_0x583141;this[_0x3e3811(0x298)]()&&(_0x1eb507['height']-=this[_0x3e3811(0x17c)]()[_0x3e3811(0x259)]),this['adjustCommandHeightByVariable']()&&(_0x1eb507[_0x3e3811(0x259)]-=this['variableWindowRect']()[_0x3e3811(0x259)]);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x290)]=function(){const _0x5f1f01=_0x583141,_0x1b21ec=VisuMZ[_0x5f1f01(0x1d0)][_0x5f1f01(0x15c)][_0x5f1f01(0x131)][_0x5f1f01(0x18d)],_0x1c060f=Graphics['boxWidth'],_0x366ebb=this['calcWindowHeight'](_0x1b21ec,!![]),_0x206b22=0x0,_0x421296=this[_0x5f1f01(0x178)]();return new Rectangle(_0x206b22,_0x421296,_0x1c060f,_0x366ebb);},Scene_Menu[_0x583141(0x15d)]['commandWindowRectThinTopStyle']=function(){const _0x14d551=_0x583141,_0x52f892=VisuMZ[_0x14d551(0x1d0)][_0x14d551(0x15c)][_0x14d551(0x131)]['Rows'],_0xf11ace=Graphics[_0x14d551(0x19f)],_0x2ba452=this[_0x14d551(0x1b0)](0x1,!![]),_0x333c29=0x0,_0x22fc8a=this[_0x14d551(0x178)]();return new Rectangle(_0x333c29,_0x22fc8a,_0xf11ace,_0x2ba452);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x16c)]=function(){const _0x2c4edd=_0x583141,_0x5a4503=VisuMZ[_0x2c4edd(0x1d0)]['Settings']['CustomCmdWin'][_0x2c4edd(0x18d)],_0x106fb6=Graphics[_0x2c4edd(0x19f)],_0x5b320c=this[_0x2c4edd(0x1b0)](_0x5a4503,!![]),_0x1ec313=0x0,_0x3351d6=this[_0x2c4edd(0x1b4)]()-_0x5b320c;return new Rectangle(_0x1ec313,_0x3351d6,_0x106fb6,_0x5b320c);},Scene_Menu['prototype']['commandWindowRectThinBottomStyle']=function(){const _0x450f47=_0x583141,_0xcd7390=VisuMZ['MainMenuCore']['Settings']['CustomCmdWin'][_0x450f47(0x18d)],_0x36c1a4=Graphics['boxWidth'],_0xdc0db9=this['calcWindowHeight'](0x1,!![]),_0x4264f2=0x0,_0x477c30=this[_0x450f47(0x1b4)]()-_0xdc0db9;return new Rectangle(_0x4264f2,_0x477c30,_0x36c1a4,_0xdc0db9);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x1b9)]=function(){const _0x37ac87=_0x583141,_0x2c3dac=VisuMZ[_0x37ac87(0x1d0)][_0x37ac87(0x15c)][_0x37ac87(0x131)]['Rows'],_0x264ade=Graphics[_0x37ac87(0x19f)],_0x20fe12=Window_MenuCommand[_0x37ac87(0x15d)]['fittingHeight'](_0x2c3dac),_0x8d94a8=0x0,_0x120da7=Math[_0x37ac87(0x1fc)]((Graphics[_0x37ac87(0x20a)]-_0x20fe12)/0x2);return new Rectangle(_0x8d94a8,_0x120da7,_0x264ade,_0x20fe12);},Scene_Menu['prototype'][_0x583141(0x251)]=function(){const _0x2a96d8=_0x583141;return VisuMZ[_0x2a96d8(0x1d0)][_0x2a96d8(0x15c)][_0x2a96d8(0x1d8)];},Scene_Menu['prototype']['thinGoldWindow']=function(){const _0x5efcd3=_0x583141;if(this['commandWindowStyle']()!==_0x5efcd3(0x28c))return!![];return VisuMZ['MainMenuCore'][_0x5efcd3(0x15c)]['General'][_0x5efcd3(0x1c5)];},Scene_Menu[_0x583141(0x15d)][_0x583141(0x28e)]=function(){const _0x211a1f=_0x583141,_0x570cc2=this[_0x211a1f(0x29a)]();this[_0x211a1f(0x1f8)]=this[_0x211a1f(0x164)]()?new Window_ThinGold(_0x570cc2):new Window_Gold(_0x570cc2),this[_0x211a1f(0x213)](this[_0x211a1f(0x1f8)]);},VisuMZ[_0x583141(0x1d0)][_0x583141(0x26b)]=Scene_Menu[_0x583141(0x15d)][_0x583141(0x29a)],Scene_Menu['prototype'][_0x583141(0x29a)]=function(){const _0x4e67f9=_0x583141,_0x5b52fe=this[_0x4e67f9(0x251)]();if(['top',_0x4e67f9(0x280),'mobile'][_0x4e67f9(0x145)](_0x5b52fe))return this[_0x4e67f9(0x25a)]();else{if([_0x4e67f9(0x212),'thinBottom'][_0x4e67f9(0x145)](_0x5b52fe))return this[_0x4e67f9(0x25b)]();else{const _0x874ad8=VisuMZ[_0x4e67f9(0x1d0)]['Scene_Menu_goldWindowRect'][_0x4e67f9(0x28d)](this);return this[_0x4e67f9(0x1bc)](_0x874ad8),_0x874ad8;}}},Scene_Menu[_0x583141(0x15d)]['applyThinnerGoldWindowRect']=function(_0x3499bf){const _0x3161c0=_0x583141;if(this[_0x3161c0(0x164)]()){if(VisuMZ['MainMenuCore'][_0x3161c0(0x15c)]['General'][_0x3161c0(0x154)]){const _0x19c112=_0x3499bf[_0x3161c0(0x259)]-this[_0x3161c0(0x1b0)](0x1,![]);_0x3499bf['y']+=_0x19c112;}VisuMZ[_0x3161c0(0x1d0)]['Settings'][_0x3161c0(0x243)][_0x3161c0(0x220)]&&('zFRHR'!==_0x3161c0(0x28f)?_0x3499bf[_0x3161c0(0x259)]=this['calcWindowHeight'](0x1,![]):_0x257368['loadPicture'](_0x5105db[_0x3161c0(0x296)]()));}},Scene_Menu[_0x583141(0x15d)][_0x583141(0x25a)]=function(){const _0x397f4d=_0x583141,_0x2be60a=this[_0x397f4d(0x1ec)](),_0x9f260d=this['calcWindowHeight'](0x1,![]),_0x55ef3a=Graphics[_0x397f4d(0x19f)]-_0x2be60a,_0x1481c2=this[_0x397f4d(0x1b4)]()-_0x9f260d;return new Rectangle(_0x55ef3a,_0x1481c2,_0x2be60a,_0x9f260d);},Scene_Menu[_0x583141(0x15d)]['goldWindowRectBottomStyle']=function(){const _0x48c082=_0x583141,_0x360a1a=this[_0x48c082(0x1ec)](),_0x444f17=this['calcWindowHeight'](0x1,![]),_0x3aa5d6=Graphics['boxWidth']-_0x360a1a,_0x26fdf2=this[_0x48c082(0x178)]();return new Rectangle(_0x3aa5d6,_0x26fdf2,_0x360a1a,_0x444f17);},VisuMZ[_0x583141(0x1d0)][_0x583141(0x1b1)]=Scene_Menu[_0x583141(0x15d)][_0x583141(0x1e4)],Scene_Menu[_0x583141(0x15d)][_0x583141(0x1e4)]=function(){const _0x49d8cc=_0x583141;VisuMZ['MainMenuCore'][_0x49d8cc(0x1b1)]['call'](this),this[_0x49d8cc(0x1b2)]();},Scene_Menu[_0x583141(0x15d)][_0x583141(0x1b2)]=function(){const _0x461ca4=_0x583141;this[_0x461ca4(0x251)]()===_0x461ca4(0x205)&&(this[_0x461ca4(0x146)][_0x461ca4(0x1c0)]=0x0);},VisuMZ['MainMenuCore']['Scene_Menu_statusWindowRect']=Scene_Menu[_0x583141(0x15d)]['statusWindowRect'],Scene_Menu[_0x583141(0x15d)][_0x583141(0x20d)]=function(){const _0x14531d=_0x583141,_0x30d0cb=this['commandWindowStyle']();if([_0x14531d(0x273),_0x14531d(0x280)][_0x14531d(0x145)](_0x30d0cb)){if(_0x14531d(0x1f4)===_0x14531d(0x179))_0xda7b69[_0x14531d(0x15d)][_0x14531d(0x158)][_0x14531d(0x28d)](this),this[_0x14531d(0x287)][_0x14531d(0x27b)]=_0x50649a[_0x14531d(0x1d0)][_0x14531d(0x15c)]['Playtime'][_0x14531d(0x140)];else return this['statusWindowRectTopStyle']();}else{if(['bottom',_0x14531d(0x1ff)][_0x14531d(0x145)](_0x30d0cb))return this[_0x14531d(0x256)]();else{if(_0x30d0cb===_0x14531d(0x205))return this[_0x14531d(0x266)]();else{if('KSOhU'!==_0x14531d(0x208))return VisuMZ[_0x14531d(0x1d0)][_0x14531d(0x1c9)][_0x14531d(0x28d)](this);else _0x421285[_0x14531d(0x1d0)][_0x14531d(0x15c)]['ListStyles']['VerticalStyle'][_0x14531d(0x28d)](this,_0x425831,_0xb7d132);}}}},Scene_Menu['prototype'][_0x583141(0x255)]=function(){const _0xeeee8a=_0x583141,_0x109a3b=Graphics[_0xeeee8a(0x19f)],_0x382734=this['mainAreaHeight']()-this[_0xeeee8a(0x1cb)][_0xeeee8a(0x259)]-this[_0xeeee8a(0x1f8)][_0xeeee8a(0x259)],_0x51a349=0x0,_0x5eea6a=this['_commandWindow']['y']+this['_commandWindow'][_0xeeee8a(0x259)];return new Rectangle(_0x51a349,_0x5eea6a,_0x109a3b,_0x382734);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x256)]=function(){const _0x51aee1=_0x583141,_0x4e173f=Graphics[_0x51aee1(0x19f)],_0x10d8c4=this[_0x51aee1(0x26c)]()-this[_0x51aee1(0x1cb)][_0x51aee1(0x259)]-this['_goldWindow'][_0x51aee1(0x259)],_0x16f107=0x0,_0x2d99e1=this[_0x51aee1(0x1f8)]['y']+this[_0x51aee1(0x1f8)][_0x51aee1(0x259)];return new Rectangle(_0x16f107,_0x2d99e1,_0x4e173f,_0x10d8c4);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x266)]=function(){const _0x4c1a0e=_0x583141,_0x4cfccb=Graphics[_0x4c1a0e(0x19f)],_0x1f4f46=this[_0x4c1a0e(0x26c)]()-this[_0x4c1a0e(0x1f8)][_0x4c1a0e(0x259)],_0x5b75f6=0x0,_0x1d682e=this[_0x4c1a0e(0x1b4)]()-this['_goldWindow'][_0x4c1a0e(0x259)]-_0x1f4f46;return new Rectangle(_0x5b75f6,_0x1d682e,_0x4cfccb,_0x1f4f46);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x214)]=function(){const _0x137f8c=_0x583141;if(!this[_0x137f8c(0x1a1)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x403033=this['playtimeWindowRect']();this[_0x137f8c(0x191)]=new Window_Playtime(_0x403033),this[_0x137f8c(0x191)]['setBackgroundType'](VisuMZ['MainMenuCore'][_0x137f8c(0x15c)][_0x137f8c(0x1eb)][_0x137f8c(0x223)]),this['addWindow'](this[_0x137f8c(0x191)]);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x1a1)]=function(){const _0x3eb354=_0x583141;return VisuMZ['MainMenuCore']['Settings'][_0x3eb354(0x1eb)][_0x3eb354(0x1d5)];},Scene_Menu[_0x583141(0x15d)][_0x583141(0x298)]=function(){const _0x33bfad=_0x583141;return this['canCreatePlaytimeWindow']()&&(VisuMZ[_0x33bfad(0x1d0)][_0x33bfad(0x15c)][_0x33bfad(0x1eb)][_0x33bfad(0x288)]??!![]);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x17c)]=function(){const _0xb05f9b=_0x583141,_0x4caca9=this['commandWindowStyle']();if(['top',_0xb05f9b(0x280),_0xb05f9b(0x205)][_0xb05f9b(0x145)](_0x4caca9))return _0xb05f9b(0x161)===_0xb05f9b(0x1a7)?this['goldWindowRectTopStyle']():this['playtimeWindowRectTopStyle']();else{if([_0xb05f9b(0x212),'thinBottom']['includes'](_0x4caca9)){if(_0xb05f9b(0x299)==='GLTej'){const _0x2924c1=this['topIndex']();for(let _0x53c3bc=0x0;_0x53c3bc<this['maxVisibleItems']();_0x53c3bc++){const _0x5ea86f=_0x2924c1+_0x53c3bc;_0x5ea86f<this['maxItems']()&&(this[_0xb05f9b(0x272)](_0x5ea86f),this['drawItem'](_0x5ea86f));}}else return this['playtimeWindowRectBottomStyle']();}else return VisuMZ[_0xb05f9b(0x1d0)][_0xb05f9b(0x15c)][_0xb05f9b(0x1eb)]['WindowRect'][_0xb05f9b(0x28d)](this);}},Scene_Menu[_0x583141(0x15d)][_0x583141(0x1f2)]=function(){const _0x2d14ca=_0x583141,_0x34f49e=this[_0x2d14ca(0x1ec)](),_0x2d66f2=this[_0x2d14ca(0x1b0)](0x1,![]),_0x58caa4=0x0,_0x516b1e=this[_0x2d14ca(0x1b4)]()-_0x2d66f2;return new Rectangle(_0x58caa4,_0x516b1e,_0x34f49e,_0x2d66f2);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x271)]=function(){const _0x1458d5=_0x583141,_0x29db21=this[_0x1458d5(0x1ec)](),_0x79b858=this[_0x1458d5(0x1b0)](0x1,![]),_0x1576f1=0x0,_0x34bf4a=this['mainAreaTop']();return new Rectangle(_0x1576f1,_0x34bf4a,_0x29db21,_0x79b858);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x265)]=function(){const _0x680b12=_0x583141;if(!this['canCreateVariableWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x1618bf=this['variableWindowRect']();this['_variableWindow']=new Window_MenuVariables(_0x1618bf),this[_0x680b12(0x150)][_0x680b12(0x27f)](VisuMZ[_0x680b12(0x1d0)]['Settings']['Variable'][_0x680b12(0x223)]),this[_0x680b12(0x213)](this[_0x680b12(0x150)]);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x153)]=function(){const _0x4cc611=_0x583141;return VisuMZ[_0x4cc611(0x1d0)][_0x4cc611(0x15c)][_0x4cc611(0x2a0)][_0x4cc611(0x1d5)];},Scene_Menu[_0x583141(0x15d)]['adjustCommandHeightByVariable']=function(){const _0x2379a8=_0x583141;return this['canCreateVariableWindow']()&&(VisuMZ[_0x2379a8(0x1d0)][_0x2379a8(0x15c)][_0x2379a8(0x2a0)][_0x2379a8(0x288)]??!![]);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x176)]=function(){const _0x2bb5c3=_0x583141,_0x150b95=this[_0x2bb5c3(0x251)]();if([_0x2bb5c3(0x273),_0x2bb5c3(0x280),'mobile'][_0x2bb5c3(0x145)](_0x150b95))return this[_0x2bb5c3(0x210)]();else{if(['bottom',_0x2bb5c3(0x1ff)][_0x2bb5c3(0x145)](_0x150b95)){if('tNfsl'!=='tNfsl'){if(_0x30ae14[_0x2bb5c3(0x151)][_0x2bb5c3(0x15c)][_0x2bb5c3(0x170)][_0x2bb5c3(0x264)]){}}else return this[_0x2bb5c3(0x236)]();}else{if('PzRrd'!==_0x2bb5c3(0x2ac))return VisuMZ[_0x2bb5c3(0x1d0)][_0x2bb5c3(0x15c)]['Variable']['WindowRect'][_0x2bb5c3(0x28d)](this);else{const _0x245395=this[_0x2bb5c3(0x1e3)](this[_0x2bb5c3(0x227)]());let _0x44253b=this[_0x2bb5c3(0x180)](this[_0x2bb5c3(0x227)]());_0x44253b=_0x44253b[_0x2bb5c3(0x1e9)](/\\I\[(\d+)\]/gi,''),_0xd5dbf5['resetFontSettings'](),this[_0x2bb5c3(0x186)](_0x44253b,_0x245395),this[_0x2bb5c3(0x13c)](_0x44253b,_0x245395),this[_0x2bb5c3(0x263)](_0x44253b,_0x245395);}}}},Scene_Menu[_0x583141(0x15d)][_0x583141(0x210)]=function(){const _0x48c9f1=_0x583141,_0x1be96b=Graphics[_0x48c9f1(0x19f)]-this[_0x48c9f1(0x1f8)]['width']-(this[_0x48c9f1(0x191)]?this[_0x48c9f1(0x191)]['width']:0x0),_0x589c61=this[_0x48c9f1(0x1b0)](0x1,![]),_0x2db74b=this[_0x48c9f1(0x1f8)]['x']-_0x1be96b,_0x55dd60=this[_0x48c9f1(0x1b4)]()-_0x589c61;return new Rectangle(_0x2db74b,_0x55dd60,_0x1be96b,_0x589c61);},Scene_Menu['prototype']['variableWindowRectBottomStyle']=function(){const _0x516666=_0x583141,_0x4d0f66=Graphics['boxWidth']-this[_0x516666(0x1f8)][_0x516666(0x24f)]-(this[_0x516666(0x191)]?this[_0x516666(0x191)][_0x516666(0x24f)]:0x0),_0x3a4d00=this[_0x516666(0x1b0)](0x1,![]),_0x5ceb14=this[_0x516666(0x1f8)]['x']-_0x4d0f66,_0x58c50e=this['mainAreaTop']();return new Rectangle(_0x5ceb14,_0x58c50e,_0x4d0f66,_0x3a4d00);},Scene_Menu[_0x583141(0x15d)][_0x583141(0x21f)]=function(){const _0x53698c=_0x583141;if(!this[_0x53698c(0x2b3)]())return;const _0x4bb87a=this[_0x53698c(0x176)]();this[_0x53698c(0x1c2)]=new Window_Base(_0x4bb87a),this['_dummyWindow'][_0x53698c(0x27f)](VisuMZ['MainMenuCore'][_0x53698c(0x15c)][_0x53698c(0x2a0)][_0x53698c(0x223)]),this['addWindow'](this[_0x53698c(0x1c2)]);},Scene_Menu['prototype'][_0x583141(0x2b3)]=function(){const _0x5b31c9=_0x583141;if(['default',_0x5b31c9(0x205)][_0x5b31c9(0x145)](this[_0x5b31c9(0x251)]()))return![];if(this[_0x5b31c9(0x150)])return![];return!![];},VisuMZ['MainMenuCore'][_0x583141(0x22d)]=Scene_Menu[_0x583141(0x15d)]['commandPersonal'],Scene_Menu['prototype']['commandPersonal']=function(){const _0x452254=_0x583141;if(this[_0x452254(0x253)]()&&this[_0x452254(0x146)])$gameParty[_0x452254(0x1a6)]($gameParty['members']()[0x0]),this[_0x452254(0x184)]();else{if(this['commandWindowStyle']()==='mobile')this[_0x452254(0x146)][_0x452254(0x257)]();VisuMZ[_0x452254(0x1d0)][_0x452254(0x22d)]['call'](this);}},Scene_Menu[_0x583141(0x15d)]['isSoloQuickMode']=function(){const _0x2b59db=_0x583141;return VisuMZ['MainMenuCore'][_0x2b59db(0x15c)][_0x2b59db(0x243)][_0x2b59db(0x162)]&&$gameParty[_0x2b59db(0x194)]()[_0x2b59db(0x1de)]<=0x1;},Scene_Menu['prototype'][_0x583141(0x184)]=function(){const _0x60d2af=_0x583141,_0x2ea7fc=this[_0x60d2af(0x1cb)]['currentSymbol'](),_0x16e80e=this[_0x60d2af(0x1cb)][_0x60d2af(0x211)]();for(const _0x213005 of Window_MenuCommand[_0x60d2af(0x23b)]){if('LOvOT'!=='LOvOT')return this['statusWindowRectMobileStyle']();else{if(_0x213005[_0x60d2af(0x155)]===_0x2ea7fc){_0x213005['PersonalHandlerJS'][_0x60d2af(0x28d)](this,_0x16e80e);return;}}}},VisuMZ[_0x583141(0x1d0)][_0x583141(0x222)]=Scene_Menu[_0x583141(0x15d)][_0x583141(0x190)],Scene_Menu[_0x583141(0x15d)]['onPersonalCancel']=function(){const _0x5bc704=_0x583141;VisuMZ[_0x5bc704(0x1d0)][_0x5bc704(0x222)][_0x5bc704(0x28d)](this);if(this[_0x5bc704(0x251)]()==='mobile')this[_0x5bc704(0x146)][_0x5bc704(0x16a)]();},Scene_Menu['prototype'][_0x583141(0x1e5)]=function(){const _0x1919cb=_0x583141,_0x2d7b44=parseInt(this[_0x1919cb(0x1cb)]['currentExt']());if(_0x2d7b44){if(_0x1919cb(0x188)!==_0x1919cb(0x195))$gameTemp[_0x1919cb(0x18a)](_0x2d7b44),this[_0x1919cb(0x157)]();else{if(this[_0x1919cb(0x2a6)]()['note'][_0x1919cb(0x2ae)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return _0x37f2e8(_0x2197d3['$1']);else{if(this[_0x1919cb(0x2a6)]()['note'][_0x1919cb(0x2ae)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return _0x1c38a8(_0x124a5c['$1']);}return 0x0;}}else this[_0x1919cb(0x1cb)][_0x1919cb(0x1b8)]();},VisuMZ[_0x583141(0x1d0)][_0x583141(0x22b)]=Scene_Menu[_0x583141(0x15d)][_0x583141(0x18b)],Scene_Menu['prototype'][_0x583141(0x18b)]=function(){const _0x571006=_0x583141;VisuMZ[_0x571006(0x1d0)][_0x571006(0x22b)][_0x571006(0x28d)](this);if(this['commandWindowStyle']()==='mobile')this[_0x571006(0x146)][_0x571006(0x257)]();},VisuMZ[_0x583141(0x1d0)][_0x583141(0x28b)]=Scene_Menu[_0x583141(0x15d)][_0x583141(0x25f)],Scene_Menu[_0x583141(0x15d)][_0x583141(0x25f)]=function(){const _0x1f6049=_0x583141;VisuMZ[_0x1f6049(0x1d0)][_0x1f6049(0x28b)][_0x1f6049(0x28d)](this);if(this['commandWindowStyle']()===_0x1f6049(0x205))this[_0x1f6049(0x146)][_0x1f6049(0x16a)]();},Scene_Menu[_0x583141(0x15d)]['commandLoad']=function(){SceneManager['push'](Scene_Load);};function Sprite_MenuBackgroundActor(){const _0x1a80a2=_0x583141;this[_0x1a80a2(0x2a9)](...arguments);}Sprite_MenuBackgroundActor[_0x583141(0x15d)]=Object[_0x583141(0x16f)](Sprite[_0x583141(0x15d)]),Sprite_MenuBackgroundActor[_0x583141(0x15d)][_0x583141(0x1f7)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor['prototype'][_0x583141(0x2a9)]=function(){const _0x1b3966=_0x583141;this[_0x1b3966(0x17b)]=null,this[_0x1b3966(0x198)]=![],Sprite[_0x1b3966(0x15d)][_0x1b3966(0x2a9)][_0x1b3966(0x28d)](this),this['x']=Graphics[_0x1b3966(0x24f)];},Sprite_MenuBackgroundActor[_0x583141(0x15d)][_0x583141(0x152)]=function(_0x48e30d){const _0x43c72d=_0x583141;this[_0x43c72d(0x17b)]!==_0x48e30d&&(this[_0x43c72d(0x17b)]=_0x48e30d,this[_0x43c72d(0x2b2)]());},Sprite_MenuBackgroundActor[_0x583141(0x15d)][_0x583141(0x2b2)]=function(){const _0x5767fe=_0x583141;this[_0x5767fe(0x198)]=![],this[_0x5767fe(0x17b)]?(this[_0x5767fe(0x189)]=ImageManager['loadPicture'](this['_actor']['getMenuImage']()),this[_0x5767fe(0x189)][_0x5767fe(0x1df)](this['onBitmapLoad'][_0x5767fe(0x24a)](this))):this[_0x5767fe(0x189)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x583141(0x15d)]['onBitmapLoad']=function(){const _0x57d284=_0x583141;this[_0x57d284(0x198)]=!![],VisuMZ[_0x57d284(0x1d0)][_0x57d284(0x15c)][_0x57d284(0x243)]['ActorBgMenuJS'][_0x57d284(0x28d)](this);},Sprite_MenuBackgroundActor[_0x583141(0x15d)][_0x583141(0x29b)]=function(){const _0x390866=_0x583141;Sprite[_0x390866(0x15d)][_0x390866(0x29b)][_0x390866(0x28d)](this),this['_bitmapReady']&&(this[_0x390866(0x245)](),this['updatePosition'](),this[_0x390866(0x1dc)]());},Sprite_MenuBackgroundActor['prototype'][_0x583141(0x245)]=function(){const _0x46d870=_0x583141;if(this[_0x46d870(0x234)]>0x0){if(_0x46d870(0x173)===_0x46d870(0x1d7)){const _0x5a8115=_0x13a12a['playtimeText']();this[_0x46d870(0x25d)](_0x5a8115,_0x56219f['x'],_0x583b89['y'],_0x5d808d['width'],_0x46d870(0x268));}else{const _0x1be712=this['_duration'];this[_0x46d870(0x297)]=(this['opacity']*(_0x1be712-0x1)+0xff)/_0x1be712;}}},Sprite_MenuBackgroundActor[_0x583141(0x15d)][_0x583141(0x20b)]=function(){const _0x168068=_0x583141;if(this['_duration']>0x0){const _0x4e31b4=this[_0x168068(0x234)];this['x']=(this['x']*(_0x4e31b4-0x1)+this['_targetX'])/_0x4e31b4,this['y']=(this['y']*(_0x4e31b4-0x1)+this['_targetY'])/_0x4e31b4;}},Sprite_MenuBackgroundActor[_0x583141(0x15d)]['updateDuration']=function(){const _0x140765=_0x583141;if(this[_0x140765(0x234)]>0x0)this[_0x140765(0x234)]--;},ImageManager[_0x583141(0x141)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x583141(0x1be)]=ImageManager['svActorVertCells']||0x6,Window_Base[_0x583141(0x15d)][_0x583141(0x1b3)]=function(_0x5c1450,_0x489591,_0x3fdef7){const _0x365adc=_0x583141,_0x1e74c2=_0x5c1450[_0x365adc(0x2ae)](/\$/i),_0x38d989=ImageManager[_0x365adc(0x16b)](_0x5c1450),_0x4a3641=_0x38d989[_0x365adc(0x24f)]/(_0x1e74c2?0x1:ImageManager['svActorHorzCells']),_0x5e9b7f=_0x38d989[_0x365adc(0x259)]/(_0x1e74c2?0x1:ImageManager[_0x365adc(0x1be)]),_0x4c1085=0x0,_0x619aa9=0x0;this[_0x365adc(0x287)][_0x365adc(0x1b7)](_0x38d989,_0x4c1085,_0x619aa9,_0x4a3641,_0x5e9b7f,_0x489591-_0x4a3641/0x2,_0x3fdef7-_0x5e9b7f);},Window_MenuCommand['_commandList']=VisuMZ[_0x583141(0x1d0)][_0x583141(0x15c)][_0x583141(0x1a3)],VisuMZ[_0x583141(0x1d0)]['Window_MenuCommand_initialize']=Window_MenuCommand[_0x583141(0x15d)]['initialize'],Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x2a9)]=function(_0x1eb04c){const _0x3e7a72=_0x583141;VisuMZ['MainMenuCore'][_0x3e7a72(0x1da)][_0x3e7a72(0x28d)](this,_0x1eb04c),this['createCommandNameWindow'](_0x1eb04c);},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x217)]=function(_0x331cf3){const _0x25682d=_0x583141,_0x1d9813=new Rectangle(0x0,0x0,_0x331cf3[_0x25682d(0x24f)],_0x331cf3[_0x25682d(0x259)]);this[_0x25682d(0x18f)]=new Window_Base(_0x1d9813),this['_commandNameWindow']['opacity']=0x0,this[_0x25682d(0x238)](this[_0x25682d(0x18f)]),this['updateCommandNameWindow']();},Window_MenuCommand[_0x583141(0x15d)]['callUpdateHelp']=function(){const _0x490d1f=_0x583141;Window_HorzCommand[_0x490d1f(0x15d)]['callUpdateHelp']['call'](this);if(this[_0x490d1f(0x18f)])this[_0x490d1f(0x1aa)]();},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x1aa)]=function(){const _0x145ae7=_0x583141,_0x4ccfbf=this[_0x145ae7(0x18f)];_0x4ccfbf['contents']['clear']();const _0x1640c5=this['commandStyleCheck'](this['index']());if(_0x1640c5===_0x145ae7(0x20c)){if(_0x145ae7(0x294)===_0x145ae7(0x1d2))_0x5c5277['MainMenuCore']['Window_MenuStatus_selectLast'][_0x145ae7(0x28d)](this);else{const _0xd9475=this['itemLineRect'](this['index']());let _0x4bab30=this[_0x145ae7(0x180)](this[_0x145ae7(0x227)]());_0x4bab30=_0x4bab30[_0x145ae7(0x1e9)](/\\I\[(\d+)\]/gi,''),_0x4ccfbf[_0x145ae7(0x158)](),this['commandNameWindowDrawBackground'](_0x4bab30,_0xd9475),this[_0x145ae7(0x13c)](_0x4bab30,_0xd9475),this[_0x145ae7(0x263)](_0x4bab30,_0xd9475);}}},Window_MenuCommand['prototype'][_0x583141(0x186)]=function(_0x42c7d7,_0x508558){},Window_MenuCommand[_0x583141(0x15d)]['commandNameWindowDrawText']=function(_0x25f54a,_0x288087){const _0x6ba6aa=_0x583141,_0x4fe9ef=this['_commandNameWindow'];_0x4fe9ef[_0x6ba6aa(0x25d)](_0x25f54a,0x0,_0x288087['y'],_0x4fe9ef[_0x6ba6aa(0x204)],'center');},Window_MenuCommand[_0x583141(0x15d)]['commandNameWindowCenter']=function(_0x190718,_0x2431ce){const _0xab8cf6=_0x583141,_0x15c708=this[_0xab8cf6(0x18f)],_0x19078b=$gameSystem[_0xab8cf6(0x2a7)](),_0x3d50be=_0x2431ce['x']+Math['floor'](_0x2431ce['width']/0x2)+_0x19078b;_0x15c708['x']=_0x15c708[_0xab8cf6(0x24f)]/-0x2+_0x3d50be,_0x15c708['y']=Math[_0xab8cf6(0x199)](_0x2431ce['height']/0x4);},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x23f)]=function(){const _0x214d86=_0x583141,_0x33d20b=SceneManager[_0x214d86(0x1c3)][_0x214d86(0x251)]();if(_0x33d20b===_0x214d86(0x205)){const _0x200624=VisuMZ[_0x214d86(0x1d0)]['Settings']['CustomCmdWin'][_0x214d86(0x230)];return this[_0x214d86(0x1cd)]()*_0x200624+0x8;}else return Window_Command['prototype'][_0x214d86(0x23f)][_0x214d86(0x28d)](this);},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x235)]=function(){this['makeMainMenuCoreCommandList']();},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x244)]=function(){const _0x574f2b=_0x583141;for(const _0x29d921 of Window_MenuCommand[_0x574f2b(0x23b)]){const _0x255e57=_0x29d921[_0x574f2b(0x155)];if(_0x29d921[_0x574f2b(0x22f)]['call'](this)){let _0x386b04=_0x29d921['TextStr'];if(['',_0x574f2b(0x22e)][_0x574f2b(0x145)](_0x386b04))_0x386b04=_0x29d921[_0x574f2b(0x17a)][_0x574f2b(0x28d)](this);const _0x55a800=_0x29d921[_0x574f2b(0x293)];if(_0x55a800>0x0&&this[_0x574f2b(0x1f0)]()!==_0x574f2b(0x144)){if(_0x574f2b(0x275)==='meJca')return _0x4773ff[_0x574f2b(0x1d0)][_0x574f2b(0x15c)][_0x574f2b(0x1eb)][_0x574f2b(0x1d5)];else _0x386b04=_0x574f2b(0x23a)[_0x574f2b(0x27d)](_0x55a800,_0x386b04);}const _0x49f26f=_0x29d921[_0x574f2b(0x175)][_0x574f2b(0x28d)](this),_0x3318fc=_0x29d921['ExtJS']['call'](this);this[_0x574f2b(0x18c)](_0x386b04,_0x255e57,_0x49f26f,_0x3318fc),this[_0x574f2b(0x1a4)](_0x255e57,_0x29d921[_0x574f2b(0x1e1)][_0x574f2b(0x24a)](this,_0x3318fc));}this[_0x574f2b(0x284)](_0x255e57);}},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x284)]=function(_0xe23147){const _0x5be29b=_0x583141;switch(_0xe23147){case _0x5be29b(0x2a5):this['addMainCommands']();break;case'formation':this[_0x5be29b(0x149)](),this[_0x5be29b(0x160)]();break;case _0x5be29b(0x25e):this['addOptionsCommand']();break;case _0x5be29b(0x22c):this[_0x5be29b(0x232)]();break;case _0x5be29b(0x1ac):this[_0x5be29b(0x1bb)]();break;}},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x17d)]=function(){},Window_MenuCommand['prototype'][_0x583141(0x149)]=function(){},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x160)]=function(){},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x2b6)]=function(){},Window_MenuCommand['prototype'][_0x583141(0x232)]=function(){},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x1bb)]=function(){},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x16d)]=function(){const _0x224d8e=_0x583141,_0x1caf6b=SceneManager['_scene'][_0x224d8e(0x251)]();if([_0x224d8e(0x280),_0x224d8e(0x1ff)][_0x224d8e(0x145)](_0x1caf6b))return _0x224d8e(0x29f)!==_0x224d8e(0x16e)?this[_0x224d8e(0x187)]?this['maxItems']():0x4:_0x86e127[_0x224d8e(0x1d0)][_0x224d8e(0x15c)]['Variable'][_0x224d8e(0x137)][_0x224d8e(0x1de)];else{if(_0x1caf6b!=='default')return VisuMZ[_0x224d8e(0x1d0)]['Settings']['CustomCmdWin'][_0x224d8e(0x22a)];else{if('cceTn'!==_0x224d8e(0x246))_0x2d0b6c[_0x224d8e(0x259)]-=this['playtimeWindowRect']()[_0x224d8e(0x259)];else return Window_Command[_0x224d8e(0x15d)][_0x224d8e(0x16d)][_0x224d8e(0x28d)](this);}}},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x21d)]=function(){const _0x58fbd6=_0x583141;return VisuMZ[_0x58fbd6(0x1d0)][_0x58fbd6(0x15c)][_0x58fbd6(0x131)]['TextAlign'];},Window_MenuCommand['prototype'][_0x583141(0x156)]=function(_0x2fa0d2){const _0x2af2c1=_0x583141,_0x490e59=this[_0x2af2c1(0x1c1)](_0x2fa0d2);if(_0x490e59===_0x2af2c1(0x2a8))this[_0x2af2c1(0x15a)](_0x2fa0d2);else _0x490e59===_0x2af2c1(0x20c)?this['drawItemStyleIcon'](_0x2fa0d2):Window_Command[_0x2af2c1(0x15d)]['drawItem']['call'](this,_0x2fa0d2);},Window_MenuCommand[_0x583141(0x15d)][_0x583141(0x1f0)]=function(){const _0xda5c36=_0x583141;return VisuMZ[_0xda5c36(0x1d0)][_0xda5c36(0x15c)]['CustomCmdWin'][_0xda5c36(0x2ad)];},Window_MenuCommand[_0x583141(0x15d)]['commandStyleCheck']=function(_0x4aa02b){const _0x487516=_0x583141,_0x566a32=this[_0x487516(0x1f0)]();if(_0x566a32!=='auto')return _0x566a32;else{const _0xb3ad9b=this[_0x487516(0x180)](_0x4aa02b);if(_0xb3ad9b[_0x487516(0x2ae)](/\\I\[(\d+)\]/i)){const _0x1ec740=this[_0x487516(0x1e3)](_0x4aa02b),_0x5880f3=this[_0x487516(0x26d)](_0xb3ad9b)[_0x487516(0x24f)];if(_0x5880f3<=_0x1ec740[_0x487516(0x24f)]){if(_0x487516(0x242)!==_0x487516(0x242)){const _0x3b097d=_0x2e2aaa[_0x487516(0x1d0)][_0x487516(0x15c)][_0x487516(0x1eb)]['Icon'],_0x831639=_0x53399a['y']+(this[_0x487516(0x1cd)]()-_0x2ee009['iconHeight'])/0x2;this[_0x487516(0x231)](_0x3b097d,_0x334980['x'],_0x831639);const _0x54cda2=_0x2bfe95['iconWidth']+0x4;_0x404289['x']+=_0x54cda2,_0x1bfc48[_0x487516(0x24f)]-=_0x54cda2;}else return'iconText';}else{if(_0x487516(0x254)===_0x487516(0x254))return'icon';else{if(!this[_0x487516(0x1a1)]())return new _0x18f418(0x0,0x0,0x0,0x0);const _0x2eeea7=this[_0x487516(0x17c)]();this[_0x487516(0x191)]=new _0x2fc8d3(_0x2eeea7),this['_playtimeWindow']['setBackgroundType'](_0x21ff81['MainMenuCore']['Settings'][_0x487516(0x1eb)][_0x487516(0x223)]),this[_0x487516(0x213)](this['_playtimeWindow']);}}}else return'text';}},Window_MenuCommand['prototype'][_0x583141(0x15a)]=function(_0x51c9a4){const _0x50ae59=_0x583141,_0x3e440c=this[_0x50ae59(0x1e3)](_0x51c9a4),_0x1f39de=this[_0x50ae59(0x180)](_0x51c9a4),_0x54738e=this[_0x50ae59(0x26d)](_0x1f39de)[_0x50ae59(0x24f)];this[_0x50ae59(0x1a8)](this['isCommandEnabled'](_0x51c9a4));let _0x440efc=this[_0x50ae59(0x21d)]();if(_0x440efc===_0x50ae59(0x268))this[_0x50ae59(0x15b)](_0x1f39de,_0x3e440c['x']+_0x3e440c[_0x50ae59(0x24f)]-_0x54738e,_0x3e440c['y'],_0x54738e);else{if(_0x440efc===_0x50ae59(0x274)){const _0x317d54=_0x3e440c['x']+Math[_0x50ae59(0x199)]((_0x3e440c['width']-_0x54738e)/0x2);this['drawTextEx'](_0x1f39de,_0x317d54,_0x3e440c['y'],_0x54738e);}else this['drawTextEx'](_0x1f39de,_0x3e440c['x'],_0x3e440c['y'],_0x54738e);}},Window_MenuCommand['prototype'][_0x583141(0x258)]=function(_0x4a4347){const _0x28919a=_0x583141;this[_0x28919a(0x180)](_0x4a4347)['match'](/\\I\[(\d+)\]/i);const _0x48cc56=Number(RegExp['$1']),_0x242cc4=this[_0x28919a(0x1e3)](_0x4a4347),_0x4210d3=_0x242cc4['x']+Math[_0x28919a(0x199)]((_0x242cc4[_0x28919a(0x24f)]-ImageManager['iconWidth'])/0x2),_0x4b7052=_0x242cc4['y']+(_0x242cc4[_0x28919a(0x259)]-ImageManager[_0x28919a(0x185)])/0x2;this['drawIcon'](_0x48cc56,_0x4210d3,_0x4b7052);},VisuMZ[_0x583141(0x1d0)]['Window_StatusBase_loadFaceImages']=Window_StatusBase[_0x583141(0x15d)][_0x583141(0x193)],Window_StatusBase['prototype'][_0x583141(0x193)]=function(){const _0x310fea=_0x583141;VisuMZ[_0x310fea(0x1d0)][_0x310fea(0x2a4)]['call'](this),this[_0x310fea(0x19d)]();},Window_StatusBase[_0x583141(0x15d)][_0x583141(0x19d)]=function(){const _0x2aff66=_0x583141;for(const _0x59b9b6 of $gameParty[_0x2aff66(0x194)]()){if(!_0x59b9b6)continue;_0x59b9b6[_0x2aff66(0x27e)]()&&ImageManager[_0x2aff66(0x200)](_0x59b9b6[_0x2aff66(0x27e)]());if(_0x59b9b6[_0x2aff66(0x29d)]()){if(_0x2aff66(0x1db)==='efjHy')ImageManager[_0x2aff66(0x16b)](_0x59b9b6[_0x2aff66(0x29d)]());else{const _0x23d781=_0x5077dd['MainMenuCore'][_0x2aff66(0x15c)][_0x2aff66(0x131)][_0x2aff66(0x18d)],_0x18a023=_0x10021c[_0x2aff66(0x19f)],_0x361066=this[_0x2aff66(0x1b0)](0x1,!![]),_0x58af8d=0x0,_0x316b8e=this[_0x2aff66(0x1b4)]()-_0x361066;return new _0x2a299a(_0x58af8d,_0x316b8e,_0x18a023,_0x361066);}}_0x59b9b6[_0x2aff66(0x296)]()&&ImageManager[_0x2aff66(0x2a1)](_0x59b9b6[_0x2aff66(0x296)]());}},Window_StatusBase[_0x583141(0x15d)]['graphicType']=function(){const _0x397c09=_0x583141;return VisuMZ['MainMenuCore'][_0x397c09(0x15c)][_0x397c09(0x2af)];},Window_StatusBase[_0x583141(0x15d)][_0x583141(0x1d3)]=function(_0x478d17,_0x5c7a50,_0x52d44e,_0x1ad20d,_0x507c34){const _0x5b07d9=_0x583141;_0x1ad20d=_0x1ad20d||ImageManager[_0x5b07d9(0x25c)],_0x507c34=_0x507c34||ImageManager[_0x5b07d9(0x218)];const _0x21e904=ImageManager['faceWidth'],_0x524435=_0x507c34-0x2,_0x1039a4=_0x5c7a50+Math[_0x5b07d9(0x199)]((_0x1ad20d-_0x21e904)/0x2);if(this[_0x5b07d9(0x1f7)]===Window_MenuStatus){if('dRgqP'!=='RrYYC')this['changePaintOpacity'](_0x478d17[_0x5b07d9(0x181)]());else return this['statusWindowRectTopStyle']();}this[_0x5b07d9(0x1d1)](_0x478d17,_0x1039a4,_0x52d44e,_0x21e904,_0x524435),this[_0x5b07d9(0x1a8)](!![]);},Window_StatusBase[_0x583141(0x15d)][_0x583141(0x23d)]=function(_0x44dc43,_0x33c3f5,_0x5193f3,_0x28e661,_0x141e42){const _0x3b0e6b=_0x583141;_0x28e661=_0x28e661||ImageManager[_0x3b0e6b(0x25c)],_0x141e42=_0x141e42||ImageManager[_0x3b0e6b(0x218)];const _0x30d6ca=_0x44dc43[_0x3b0e6b(0x27e)](),_0x170deb=_0x44dc43[_0x3b0e6b(0x225)](),_0xe6239=ImageManager[_0x3b0e6b(0x200)](_0x30d6ca),_0x1514ec=ImageManager[_0x3b0e6b(0x192)](_0x30d6ca),_0x132a03=_0xe6239['width']/(_0x1514ec?0x3:0xc),_0x5114b5=_0xe6239['height']/(_0x1514ec?0x4:0x8),_0x1286c2=_0x28e661,_0x521771=_0x141e42-0x2,_0x26827c=_0x33c3f5+Math['floor'](_0x1286c2/0x2),_0xb43b4e=_0x5193f3+Math['ceil']((_0x141e42+_0x5114b5)/0x2);this[_0x3b0e6b(0x1f7)]===Window_MenuStatus&&this[_0x3b0e6b(0x1a8)](_0x44dc43[_0x3b0e6b(0x181)]());const _0x56941c=Math[_0x3b0e6b(0x1b6)](_0x28e661,_0x132a03),_0x17073d=Math['min'](_0x141e42,_0x5114b5),_0x36550e=Math[_0x3b0e6b(0x199)](_0x33c3f5+Math[_0x3b0e6b(0x1e0)](_0x28e661-_0x132a03,0x0)/0x2),_0x16a52d=Math[_0x3b0e6b(0x199)](_0x5193f3+Math[_0x3b0e6b(0x1e0)](_0x141e42-_0x5114b5,0x0)/0x2),_0x57f892=_0x1514ec?0x0:_0x170deb,_0x4a5a22=(_0x57f892%0x4*0x3+0x1)*_0x132a03,_0x4bc294=Math[_0x3b0e6b(0x199)](_0x57f892/0x4)*0x4*_0x5114b5;this[_0x3b0e6b(0x287)]['blt'](_0xe6239,_0x4a5a22,_0x4bc294,_0x56941c,_0x17073d,_0x36550e,_0x16a52d),this[_0x3b0e6b(0x1a8)](!![]);},Window_StatusBase[_0x583141(0x15d)][_0x583141(0x14b)]=function(_0x2d8d6c,_0x2e8953,_0x4fa183,_0x3b74b5,_0x52b4bd){const _0xddff66=_0x583141;_0x3b74b5=_0x3b74b5||ImageManager[_0xddff66(0x25c)],_0x52b4bd=_0x52b4bd||ImageManager[_0xddff66(0x218)];const _0x3b0633=ImageManager['loadSvActor'](_0x2d8d6c[_0xddff66(0x29d)]()),_0x38a9c5=_0x3b0633[_0xddff66(0x24f)]/ImageManager[_0xddff66(0x141)],_0xc49c21=_0x3b0633[_0xddff66(0x259)]/ImageManager[_0xddff66(0x1be)],_0x5a044f=_0x3b74b5,_0x527a05=_0x52b4bd-0x2,_0x155810=_0x2e8953+Math['floor'](_0x5a044f/0x2),_0x57db1c=_0x4fa183+Math[_0xddff66(0x139)]((_0x52b4bd+_0xc49c21)/0x2);this[_0xddff66(0x1f7)]===Window_MenuStatus&&this['changePaintOpacity'](_0x2d8d6c[_0xddff66(0x181)]());const _0x19408e=_0x2d8d6c[_0xddff66(0x21e)]&&_0x2d8d6c[_0xddff66(0x21e)](),_0x4fc085=0x0,_0x499894=0x0,_0x321412=_0x19408e?_0x3b0633['width']:_0x38a9c5,_0x2884de=_0x19408e?_0x3b0633[_0xddff66(0x259)]:_0xc49c21,_0x2fb69c=Math['min'](0x1,_0x3b74b5/_0x321412,_0x52b4bd/_0x2884de),_0x21de49=_0x2fb69c*_0x321412,_0x428f0a=_0x2fb69c*_0x2884de,_0x24fc81=Math[_0xddff66(0x199)](_0x2e8953+Math[_0xddff66(0x1e0)](_0x3b74b5-_0x21de49,0x0)/0x2),_0x39bb5b=Math[_0xddff66(0x199)](_0x4fa183+Math[_0xddff66(0x1e0)](_0x52b4bd-_0x428f0a,0x0)/0x2);this[_0xddff66(0x287)][_0xddff66(0x1b7)](_0x3b0633,_0x4fc085,_0x499894,_0x321412,_0x2884de,_0x24fc81,_0x39bb5b,_0x21de49,_0x428f0a),this[_0xddff66(0x1a8)](!![]);},Window_StatusBase[_0x583141(0x15d)][_0x583141(0x24b)]=function(_0x31ff3e,_0xf60197,_0x5a52b1,_0x346632,_0x1f1c40){const _0x21b2d9=_0x583141,_0x4369dd=ImageManager[_0x21b2d9(0x2a1)](_0x31ff3e[_0x21b2d9(0x296)]());_0x346632=(_0x346632||ImageManager[_0x21b2d9(0x25c)])-0x2,_0x1f1c40=(_0x1f1c40||ImageManager[_0x21b2d9(0x218)])-0x2;const _0x37d920=_0x4369dd[_0x21b2d9(0x24f)],_0x3bc464=_0x4369dd['height'],_0x1a589e=_0x346632,_0x279287=_0x1f1c40-0x2,_0x3b0ba5=_0xf60197+Math[_0x21b2d9(0x199)](_0x1a589e/0x2),_0x40bf60=_0x5a52b1+Math['ceil']((_0x1f1c40+_0x3bc464)/0x2);this[_0x21b2d9(0x1f7)]===Window_MenuStatus&&('YMVNV'!==_0x21b2d9(0x1e2)?(this[_0x21b2d9(0x189)]=_0x326c83[_0x21b2d9(0x2a1)](this[_0x21b2d9(0x17b)][_0x21b2d9(0x296)]()),this[_0x21b2d9(0x189)]['addLoadListener'](this[_0x21b2d9(0x1fa)][_0x21b2d9(0x24a)](this))):this[_0x21b2d9(0x1a8)](_0x31ff3e[_0x21b2d9(0x181)]()));const _0x2a589c=Math[_0x21b2d9(0x1b6)](_0x346632,_0x37d920),_0x50bcf9=Math[_0x21b2d9(0x1b6)](_0x1f1c40,_0x3bc464),_0x1aeb30=_0xf60197+0x1,_0x464d39=Math['max'](_0x5a52b1+0x1,_0x5a52b1+_0x279287-_0x3bc464+0x3);let _0xab6332=Math['round']((_0x37d920-_0x2a589c)/0x2),_0x264ec9=Math[_0x21b2d9(0x1fc)]((_0x3bc464-_0x50bcf9)/0x2);_0xab6332-=_0x31ff3e['getMenuImageOffsetX'](),_0x264ec9-=_0x31ff3e[_0x21b2d9(0x1f1)]();if(Imported[_0x21b2d9(0x2aa)]){if(_0x21b2d9(0x19c)==='mwOXf'){if(VisuMZ[_0x21b2d9(0x151)][_0x21b2d9(0x15c)][_0x21b2d9(0x170)][_0x21b2d9(0x264)]){}}else{const _0x117090=_0x30b619['MainMenuCore'][_0x21b2d9(0x21a)]['call'](this);return this[_0x21b2d9(0x1bd)](_0x117090),_0x117090;}}this[_0x21b2d9(0x287)][_0x21b2d9(0x1b7)](_0x4369dd,_0xab6332,_0x264ec9,_0x2a589c,_0x50bcf9,_0x1aeb30,_0x464d39),this['changePaintOpacity'](!![]);},VisuMZ['MainMenuCore']['Window_MenuStatus_selectLast']=Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x228)],Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x228)]=function(){const _0x5a1491=_0x583141;VisuMZ[_0x5a1491(0x1d0)][_0x5a1491(0x15c)][_0x5a1491(0x243)][_0x5a1491(0x291)]?VisuMZ[_0x5a1491(0x1d0)][_0x5a1491(0x267)][_0x5a1491(0x28d)](this):this['smoothSelect'](0x0);},VisuMZ[_0x583141(0x1d0)][_0x583141(0x2b5)]=Window_MenuStatus[_0x583141(0x15d)]['maxItems'],Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x1d4)]=function(){const _0x5e9e4e=_0x583141;return this['showOnlyBattleMembers']()?$gameParty[_0x5e9e4e(0x295)]()[_0x5e9e4e(0x1de)]:VisuMZ[_0x5e9e4e(0x1d0)]['Window_MenuStatus_maxItems'][_0x5e9e4e(0x28d)](this);},Window_MenuStatus['prototype'][_0x583141(0x135)]=function(){const _0x10baf5=_0x583141,_0x4ea30b=VisuMZ[_0x10baf5(0x1d0)][_0x10baf5(0x15c)]['General'];if(_0x4ea30b[_0x10baf5(0x1e6)]===undefined)_0x4ea30b['ShowReserve']=!![];const _0xb45260=SceneManager[_0x10baf5(0x1c3)];if(!_0x4ea30b[_0x10baf5(0x1e6)]){if(_0x4ea30b[_0x10baf5(0x27a)])return _0xb45260[_0x10baf5(0x1f7)]===Scene_Menu;return!![];}return![];},Window_MenuStatus['prototype'][_0x583141(0x24e)]=function(){const _0x1f588a=_0x583141,_0x3afd94=SceneManager['_scene']['constructor'];return _0x3afd94===Scene_Menu?VisuMZ['MainMenuCore']['Settings']['StatusListStyle']:VisuMZ[_0x1f588a(0x1d0)][_0x1f588a(0x15c)][_0x1f588a(0x224)];},Window_MenuStatus[_0x583141(0x15d)]['numVisibleRows']=function(){const _0x35dd53=_0x583141,_0x1e03b5=this[_0x35dd53(0x24e)]();switch(_0x1e03b5){case'vertical':case _0x35dd53(0x167):return 0x1;case _0x35dd53(0x285):return 0x1;default:return $gameParty[_0x35dd53(0x282)]();}},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x16d)]=function(){const _0x21806d=_0x583141,_0x9356dc=this[_0x21806d(0x24e)]();switch(_0x9356dc){case _0x21806d(0x2a3):case _0x21806d(0x167):return $gameParty['maxBattleMembers']();default:return 0x1;}},VisuMZ[_0x583141(0x1d0)]['Window_MenuStatus_itemHeight']=Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x23f)],Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x23f)]=function(){const _0xbb510f=_0x583141,_0x55258b=this[_0xbb510f(0x24e)]();switch(_0x55258b){case _0xbb510f(0x2a3):case _0xbb510f(0x167):case _0xbb510f(0x285):return this[_0xbb510f(0x27c)];case _0xbb510f(0x1f3):return Window_Selectable['prototype']['itemHeight'][_0xbb510f(0x28d)](this);case _0xbb510f(0x24d):return this[_0xbb510f(0x1cd)]()*0x2+0x8;default:return VisuMZ[_0xbb510f(0x1d0)][_0xbb510f(0x289)]['call'](this);}},Window_MenuStatus['prototype'][_0x583141(0x156)]=function(_0x119b36){const _0x3f3fb7=_0x583141;this[_0x3f3fb7(0x1d6)](_0x119b36),this[_0x3f3fb7(0x1e8)](_0x119b36);},VisuMZ['MainMenuCore'][_0x583141(0x283)]=Window_MenuStatus['prototype']['drawItemImage'],Window_MenuStatus['prototype'][_0x583141(0x248)]=function(_0xcaa7bb,_0x376b10,_0x4f52e2,_0x4c0afb,_0x37c084){const _0x49066d=_0x583141;switch(this[_0x49066d(0x207)]()){case'none':break;case'sprite':this[_0x49066d(0x23d)](_0xcaa7bb,_0x376b10,_0x4f52e2+0x1,_0x4c0afb,_0x37c084-0x2);break;case _0x49066d(0x1a0):this[_0x49066d(0x14b)](_0xcaa7bb,_0x376b10,_0x4f52e2+0x1,_0x4c0afb,_0x37c084-0x2);break;default:this[_0x49066d(0x1d3)](_0xcaa7bb,_0x376b10,_0x4f52e2,_0x4c0afb,_0x37c084);break;}},Window_MenuStatus['prototype']['drawItemStatus']=function(_0x825b5d){const _0x43572a=_0x583141;this[_0x43572a(0x158)]();const _0x1e2669=this['actor'](_0x825b5d),_0x30f65c=this[_0x43572a(0x1fe)](_0x825b5d),_0x36a94d=this[_0x43572a(0x24e)]();switch(_0x36a94d){case _0x43572a(0x2a3):this[_0x43572a(0x14d)](_0x1e2669,_0x30f65c);break;case'portrait':this[_0x43572a(0x14a)](_0x1e2669,_0x30f65c);break;case'solo':this[_0x43572a(0x1f5)](_0x1e2669,_0x30f65c);break;case _0x43572a(0x1f3):this[_0x43572a(0x209)](_0x1e2669,_0x30f65c);break;case _0x43572a(0x24d):this[_0x43572a(0x177)](_0x1e2669,_0x30f65c);break;default:this[_0x43572a(0x1c6)](_0x1e2669,_0x30f65c);break;}},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x14d)]=function(_0x31d775,_0x35363b){const _0x29cfd4=_0x583141;VisuMZ[_0x29cfd4(0x1d0)][_0x29cfd4(0x15c)][_0x29cfd4(0x240)][_0x29cfd4(0x1ab)]['call'](this,_0x31d775,_0x35363b);},Window_MenuStatus[_0x583141(0x15d)]['drawItemStatusPortraitStyle']=function(_0x13d4e2,_0x276504){const _0x3b309a=_0x583141;if(_0x13d4e2[_0x3b309a(0x296)]()!==''){const _0x4422f7=ImageManager[_0x3b309a(0x2a1)](_0x13d4e2[_0x3b309a(0x296)]());_0x4422f7[_0x3b309a(0x1df)](this[_0x3b309a(0x1a9)]['bind'](this,_0x13d4e2,_0x276504));}else'TOLzS'!=='xIOdh'?this['drawItemStatusVerticalStyle'](_0x13d4e2,_0x276504):this[_0x3b309a(0x146)]['openness']=0x0;},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x1a9)]=function(_0x148c7b,_0x4f90de){const _0x247d17=_0x583141;VisuMZ[_0x247d17(0x1d0)]['Settings'][_0x247d17(0x240)][_0x247d17(0x17e)][_0x247d17(0x28d)](this,_0x148c7b,_0x4f90de);},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x1f5)]=function(_0x459f84,_0x3bd7e4){const _0x1520a2=_0x583141,_0x2d6f1e=ImageManager[_0x1520a2(0x2a1)](_0x459f84['getMenuImage']());_0x2d6f1e[_0x1520a2(0x1df)](this[_0x1520a2(0x15f)]['bind'](this,_0x459f84,_0x3bd7e4));},Window_MenuStatus[_0x583141(0x15d)]['drawItemStatusSoloStyleOnLoad']=function(_0x5c0f07,_0x280334){const _0x30a5de=_0x583141;VisuMZ['MainMenuCore']['Settings']['ListStyles'][_0x30a5de(0x203)][_0x30a5de(0x28d)](this,_0x5c0f07,_0x280334);},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x209)]=function(_0x4b96fd,_0x2b9169){const _0x58467f=_0x583141;VisuMZ[_0x58467f(0x1d0)]['Settings'][_0x58467f(0x240)]['ThinStyle']['call'](this,_0x4b96fd,_0x2b9169);},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x177)]=function(_0x15f084,_0x44dd0b){const _0x1730b9=_0x583141;VisuMZ[_0x1730b9(0x1d0)][_0x1730b9(0x15c)][_0x1730b9(0x240)][_0x1730b9(0x132)][_0x1730b9(0x28d)](this,_0x15f084,_0x44dd0b);},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x279)]=function(){const _0x26b93e=_0x583141,_0x4d9031=this[_0x26b93e(0x24e)]();if([_0x26b93e(0x1f3),_0x26b93e(0x24d)][_0x26b93e(0x145)](_0x4d9031))return![];return Window_StatusBase['prototype'][_0x26b93e(0x279)]['call'](this);},Window_MenuStatus[_0x583141(0x15d)][_0x583141(0x1c6)]=function(_0x5d222c,_0x3e6daa){const _0x39f479=_0x583141;VisuMZ['MainMenuCore'][_0x39f479(0x15c)][_0x39f479(0x240)][_0x39f479(0x23c)][_0x39f479(0x28d)](this,_0x5d222c,_0x3e6daa);},Window_SkillStatus[_0x583141(0x15d)]['drawActorFace']=function(_0x22192b,_0x52a45f,_0x5032a4,_0x3af211,_0x3e7ee4){const _0x1f1d96=_0x583141;switch(this[_0x1f1d96(0x207)]()){case _0x1f1d96(0x250):break;case _0x1f1d96(0x28a):this['drawItemActorSprite'](_0x22192b,_0x52a45f,_0x5032a4,_0x3af211,_0x3e7ee4);break;case _0x1f1d96(0x1a0):this[_0x1f1d96(0x14b)](_0x22192b,_0x52a45f,_0x5032a4,_0x3af211,_0x3e7ee4);break;default:Window_StatusBase[_0x1f1d96(0x15d)]['drawActorFace']['call'](this,_0x22192b,_0x52a45f,_0x5032a4,_0x3af211,_0x3e7ee4);break;}},Window_EquipStatus[_0x583141(0x15d)]['drawActorFace']=function(_0x3d0414,_0x13806a,_0x90f57a,_0x3db1d8,_0x64fa8c){const _0x4d3214=_0x583141;switch(this['graphicType']()){case _0x4d3214(0x250):break;case _0x4d3214(0x28a):this[_0x4d3214(0x23d)](_0x3d0414,_0x13806a,_0x90f57a,_0x3db1d8,_0x64fa8c);break;case'svbattler':this['drawItemActorSvBattler'](_0x3d0414,_0x13806a,_0x90f57a,_0x3db1d8,_0x64fa8c);break;default:Window_StatusBase['prototype']['drawActorFace'][_0x4d3214(0x28d)](this,_0x3d0414,_0x13806a,_0x90f57a,_0x3db1d8,_0x64fa8c);break;}};function Window_ThinGold(){this['initialize'](...arguments);}Window_ThinGold['prototype']=Object[_0x583141(0x16f)](Window_Gold[_0x583141(0x15d)]),Window_ThinGold[_0x583141(0x15d)][_0x583141(0x1f7)]=Window_ThinGold,Window_ThinGold[_0x583141(0x15d)]['itemHeight']=function(){return this['lineHeight']();},Window_ThinGold[_0x583141(0x15d)][_0x583141(0x1a5)]=function(){const _0x58c46c=_0x583141;return Window_Selectable[_0x58c46c(0x15d)][_0x58c46c(0x1a5)]['call'](this);};function Window_Playtime(){const _0x517ead=_0x583141;this[_0x517ead(0x2a9)](...arguments);}Window_Playtime[_0x583141(0x15d)]=Object['create'](Window_Selectable[_0x583141(0x15d)]),Window_Playtime[_0x583141(0x15d)]['constructor']=Window_Playtime,Window_Playtime[_0x583141(0x15d)]['initialize']=function(_0x373df4){const _0x4fec39=_0x583141;this[_0x4fec39(0x13a)]=$gameSystem[_0x4fec39(0x277)](),this['_timer']=0x3c,Window_Selectable[_0x4fec39(0x15d)]['initialize'][_0x4fec39(0x28d)](this,_0x373df4),this[_0x4fec39(0x172)]();},Window_Playtime[_0x583141(0x15d)][_0x583141(0x23f)]=function(){const _0x2ecc32=_0x583141;return this[_0x2ecc32(0x1cd)]();},Window_Playtime[_0x583141(0x15d)]['update']=function(){const _0x8511a0=_0x583141;Window_Selectable[_0x8511a0(0x15d)][_0x8511a0(0x29b)]['call'](this),this['updateTimer']();},Window_Playtime[_0x583141(0x15d)][_0x583141(0x247)]=function(){const _0x9e46df=_0x583141;if(this[_0x9e46df(0x1ae)]-->0x0){if(this[_0x9e46df(0x1ae)]<=0x0)this[_0x9e46df(0x172)]();}},Window_Playtime[_0x583141(0x15d)]['refresh']=function(){const _0x1254b4=_0x583141;this[_0x1254b4(0x1ae)]=0x3c;const _0x34b635=this[_0x1254b4(0x1e3)](0x0),_0x4bb144=_0x34b635['x'],_0x4e9dd6=_0x34b635['y'],_0x4d10d8=_0x34b635[_0x1254b4(0x24f)];this[_0x1254b4(0x287)][_0x1254b4(0x24c)](),this[_0x1254b4(0x1a2)](_0x34b635),this[_0x1254b4(0x21c)](_0x34b635),this['drawPlaytime'](_0x34b635);},Window_Playtime[_0x583141(0x15d)]['resetFontSettings']=function(){const _0x4dfe3d=_0x583141;Window_Selectable[_0x4dfe3d(0x15d)][_0x4dfe3d(0x158)][_0x4dfe3d(0x28d)](this),this[_0x4dfe3d(0x287)][_0x4dfe3d(0x27b)]=VisuMZ[_0x4dfe3d(0x1d0)]['Settings'][_0x4dfe3d(0x1eb)][_0x4dfe3d(0x140)];},Window_Playtime[_0x583141(0x15d)][_0x583141(0x1a2)]=function(_0x5a77f5){const _0x4c0215=_0x583141;if(VisuMZ[_0x4c0215(0x1d0)][_0x4c0215(0x15c)][_0x4c0215(0x1eb)][_0x4c0215(0x293)]>0x0){const _0x1a1ed8=VisuMZ['MainMenuCore'][_0x4c0215(0x15c)][_0x4c0215(0x1eb)][_0x4c0215(0x293)],_0x5160ab=_0x5a77f5['y']+(this[_0x4c0215(0x1cd)]()-ImageManager[_0x4c0215(0x185)])/0x2;this['drawIcon'](_0x1a1ed8,_0x5a77f5['x'],_0x5160ab);const _0x453926=ImageManager[_0x4c0215(0x2ab)]+0x4;_0x5a77f5['x']+=_0x453926,_0x5a77f5['width']-=_0x453926;}},Window_Playtime['prototype'][_0x583141(0x21c)]=function(_0x2d8d53){const _0x1911b1=_0x583141;this[_0x1911b1(0x158)](),this[_0x1911b1(0x269)](ColorManager[_0x1911b1(0x13d)]());const _0x312ac3=VisuMZ[_0x1911b1(0x1d0)][_0x1911b1(0x15c)][_0x1911b1(0x1eb)][_0x1911b1(0x148)];this['drawText'](_0x312ac3,_0x2d8d53['x'],_0x2d8d53['y'],_0x2d8d53[_0x1911b1(0x24f)],'left'),this[_0x1911b1(0x206)]();},Window_Playtime[_0x583141(0x15d)][_0x583141(0x29c)]=function(_0x2c546a){const _0x361986=_0x583141,_0x53ae8e=$gameSystem['playtimeText']();this[_0x361986(0x25d)](_0x53ae8e,_0x2c546a['x'],_0x2c546a['y'],_0x2c546a[_0x361986(0x24f)],_0x361986(0x268));};function Window_MenuVariables(){const _0x20ee95=_0x583141;this[_0x20ee95(0x2a9)](...arguments);}Window_MenuVariables[_0x583141(0x15d)]=Object[_0x583141(0x16f)](Window_Selectable[_0x583141(0x15d)]),Window_MenuVariables[_0x583141(0x15d)][_0x583141(0x1f7)]=Window_MenuVariables,Window_MenuVariables[_0x583141(0x15d)][_0x583141(0x2a9)]=function(_0x5f19b0){const _0x5eb545=_0x583141;Window_Selectable[_0x5eb545(0x15d)][_0x5eb545(0x2a9)][_0x5eb545(0x28d)](this,_0x5f19b0),this['_data']=VisuMZ[_0x5eb545(0x1d0)][_0x5eb545(0x15c)]['Variable'][_0x5eb545(0x137)],this[_0x5eb545(0x172)]();},Window_MenuVariables[_0x583141(0x15d)][_0x583141(0x23f)]=function(){const _0x5c7376=_0x583141;return this[_0x5c7376(0x1cd)]();},Window_MenuVariables[_0x583141(0x15d)]['maxCols']=function(){const _0x3c736b=_0x583141,_0xef0b99=SceneManager[_0x3c736b(0x1c3)][_0x3c736b(0x251)]();if(_0xef0b99===_0x3c736b(0x28c))return 0x1;else{if(_0x3c736b(0x168)===_0x3c736b(0x1c8)){_0x3328d0[_0x3c736b(0x1d0)][_0x3c736b(0x28b)][_0x3c736b(0x28d)](this);if(this[_0x3c736b(0x251)]()===_0x3c736b(0x205))this['_statusWindow'][_0x3c736b(0x16a)]();}else return VisuMZ[_0x3c736b(0x1d0)][_0x3c736b(0x15c)]['Variable'][_0x3c736b(0x137)]['length'];}},Window_MenuVariables[_0x583141(0x15d)][_0x583141(0x158)]=function(){const _0x50a0c0=_0x583141;Window_Selectable[_0x50a0c0(0x15d)][_0x50a0c0(0x158)]['call'](this),this[_0x50a0c0(0x287)]['fontSize']=VisuMZ[_0x50a0c0(0x1d0)][_0x50a0c0(0x15c)][_0x50a0c0(0x2a0)][_0x50a0c0(0x140)],this[_0x50a0c0(0x269)](ColorManager[_0x50a0c0(0x13d)]());},Window_MenuVariables[_0x583141(0x15d)][_0x583141(0x1d4)]=function(){const _0x14b5b9=_0x583141;return this[_0x14b5b9(0x1f6)][_0x14b5b9(0x1de)];},Window_MenuVariables['prototype'][_0x583141(0x202)]=function(){const _0x237735=_0x583141,_0x393a07=this['topIndex']();for(let _0x266320=0x0;_0x266320<this[_0x237735(0x1ba)]();_0x266320++){const _0x1e35a6=_0x393a07+_0x266320;_0x1e35a6<this[_0x237735(0x1d4)]()&&(this[_0x237735(0x272)](_0x1e35a6),this[_0x237735(0x156)](_0x1e35a6));}},Window_MenuVariables[_0x583141(0x15d)][_0x583141(0x272)]=function(_0x1e16a8){},Window_MenuVariables[_0x583141(0x15d)][_0x583141(0x156)]=function(_0xb40210){const _0x49728b=_0x583141,_0x589f9d=this[_0x49728b(0x1f6)][_0xb40210];if(_0x589f9d<=0x0)return;if(!$dataSystem[_0x49728b(0x1dd)][_0x589f9d])return;const _0x537e9d=this['itemLineRect'](_0xb40210);this[_0x49728b(0x158)]();let _0x458b4b=0x0,_0x138f5e=$dataSystem['variables'][_0x589f9d][_0x49728b(0x29e)]();_0x138f5e['match'](/\\I\[(\d+)\]/i)&&(_0x458b4b=Number(RegExp['$1']),_0x138f5e=_0x138f5e['replace'](/\\I\[(\d+)\]/i,'')[_0x49728b(0x29e)]());if(_0x458b4b>0x0){const _0x52699d=_0x537e9d['y']+(this[_0x49728b(0x1cd)]()-ImageManager[_0x49728b(0x185)])/0x2;this['drawIcon'](_0x458b4b,_0x537e9d['x'],_0x52699d);const _0xd6e1d6=ImageManager[_0x49728b(0x2ab)]+0x4;_0x537e9d['x']+=_0xd6e1d6,_0x537e9d[_0x49728b(0x24f)]-=_0xd6e1d6;}this[_0x49728b(0x25d)](_0x138f5e,_0x537e9d['x'],_0x537e9d['y'],_0x537e9d[_0x49728b(0x24f)],_0x49728b(0x23e)),this[_0x49728b(0x269)](ColorManager[_0x49728b(0x19e)]()),this[_0x49728b(0x25d)]($gameVariables[_0x49728b(0x1fb)](_0x589f9d),_0x537e9d['x'],_0x537e9d['y'],_0x537e9d[_0x49728b(0x24f)],_0x49728b(0x268));};