//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.05] [MainMenuCore]
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
 * <Menu Image: filename>
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
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
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
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
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
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
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * @param AdjustCommandHeight:func
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
 * @param AdjustCommandHeight:func
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
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
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

const _0x549f=['ShowReserve','pfiGB','Scene_Menu_createStatusWindow','textSizeEx','XpMiX','map','RqGUa','maxBattleMembers','activate','mainAreaHeight','isCommandEnabled','drawItemImage','ListStyles','ThinStyle','commandWindowRectTopStyle','isExpGaugeDrawn','maxCols','drawTimeIcon','actor','drawItemStyleIconText','mobile','right','includes','Cols','onPersonalCancel','STRUCT','ZCmCc','GzHEK','concat','drawItemStatusDefaultStyle','windowPadding','onFormationCancel','addMainCommands','createGoldWindow','height','TextAlign','drawIcon','left','StatusSelectLast','BgType','registerCommand','ntDZM','Scene_Menu_commandWindowRect','Scene_MenuBase_createBackground','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawItem','systemColor','changePaintOpacity','drawActorFace','none','replace','gameEnd','FontSize','getMenuImage','pDSDj','graphicType','Variable','trqtM','ARRAYJSON','_data','filter','drawItemActorSprite','addLoadListener','Window_MenuStatus_maxItems','isBattleMember','mainAreaBottom','Step1Start','maxVisibleItems','svActorVertCells','loadBitmap','createBackground','calcWindowHeight','drawSvActor','Step1','_playtimeText','UQpZz','goldWindowRectBottomStyle','drawPlaytime','qcimM','addOptionsCommand','variableWindowRectBottomStyle','itemRect','statusWindowRectBottomStyle','itemLineRect','EnableJS','_duration','members','onBitmapLoad','createVariableWindow','commandNameWindowDrawBackground','Game_Actor_setup','auto','loadSvActor','thicker','constructor','commandStyle','ChangeActorMenuImageGroup','Scene_Menu_statusWindowRect','drawTimeLabel','SoloQuick','commandStyleCheck','drawItemActorSvBattler','trim','text','parse','playtimeWindowRectBottomStyle','contents','formation','listStyle','GQViu','TswNp','battlerName','drawItemStatusSoloStyle','loadCharacter','ARRAYEVAL','battleMembers','width','thinGoldWindow','max','Window_StatusBase_loadFaceImages','blt','drawItemStatusPortraitStyleOnLoad','format','Window_MenuStatus_itemHeight','sWroY','tujhc','svbattler','resetFontSettings','center','_targetY','zifWr','Scene_MenuBase_updateActor','mainCommandWidth','UCyve','statusWindowRectTopStyle','makeCommandList','adjustDefaultCommandWindowRect','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ActorBgMenus','UaCPj','_commandNameWindow','initMenuImage','addWindow','\x5cI[%1]%2','GuGiB','refresh','_menuImage','Icon','commandWindowRect','InnerMenuListStyle','numVisibleRows','ExtJS','statusWindowRectMobileStyle','Rows','commandFormation','boxHeight','canCreateVariableWindow','TextStr','commandWindowRectMobileStyle','addChild','svActorHorzCells','itemTextAlign','sprite','createCommandWindow','match','thin','reserveCommonEvent','xDbrG','PersonalHandlerJS','currentExt','solo','Enable','_scene','createPlaytimeWindow','floor','MobileThickness','ARRAYSTRUCT','commandCommonEvent','thinBottom','goldWindowRectTopStyle','selectLast','variableWindowRect','loadFaceImages','lineHeight','portrait','lMOhG','qgWpU','drawText','create','ConvertParams','addSaveCommand','MainMenuCore','CommandList','isSoloQuickMode','bind','fittingHeight','iconHeight','commandNameWindowCenter','Time','ThinGoldWindow','AutoGoldHeight','parameters','bitmap','setTargetActor','fontSize','statusWindowRect','adjustStatusWindowMobile','KfCYs','exit','_commandList','length','close','commandName','General','ARRAYNUM','fROCw','currentSymbol','createDummyWindow','fill','colSpacing','OZrwy','faceWidth','drawItemStatusThickerStyle','Step2','isDisplayActorMenuBackgroundImage','Scene_Menu_commandPersonal','_variableWindow','ChangeActorMenuImageJS','Window_MenuCommand_initialize','_goldWindow','Playtime','round','Scene_Menu_goldWindowRect','VerticalStyle','update','commandWindowRectBottomStyle','pWPiX','description','addGameEndCommand','loadOtherActorImages','sVYQz','rMVaE','updatePosition','_timer','ARRAYSTR','drawItemStatus','commandNameWindowDrawText','setHandler','itemHeight','_actor','HideMainMenuOnly','Style','ActorBgMenuJS','AZUra','drawItemStatusPortraitStyle','Evupz','drawItemStatusSoloStyleOnLoad','Scene_Menu_onFormationCancel','createStatusWindow','addSymbolBridge','playtimeWindowRectTopStyle','playtimeText','callUpdateHelp','drawTextEx','Symbol','vertical','setup','mainAreaTop','Untitled','playtimeWindowRect','_commandWindow','version','GuFXy','ckVMu','createActorMenuBackgroundImageSprite','drawItemActorMenuImage','lgqyK','resetTextColor','bottom','EgUGd','drawItemActorFace','iconWidth','commandWindowRectThinTopStyle','applyThinnerGoldWindowRect','updateTimer','AdjustCommandHeight','variables','needsDummyWindow','Settings','_actorMenuBgSprite','hUgpa','ShowJS','JxUTF','CustomCmdWin','onPersonalOk','TextJS','aAROf','index','loadPicture','GDHVp','canCreatePlaytimeWindow','drawItemStyleIcon','thinTop','drawItemStatusThinStyle','updateDuration','opacity','DefaultStyle','min','isBigCharacter','wUtgZ','maxItems','isArray','setBackgroundType','WindowRect','faceHeight','CommandWindowStyle','doYyo','_list','innerHeight','top','VarList','Step1End','aJOGJ','push','call','_playtimeWindow','MNNmV','drawAllItems','adjustCommandHeightByVariable','Scene_Menu_onPersonalCancel','addOriginalCommands','ARRAYFUNC','characterName','icon','status','addCommand','changeTextColor','imXPb','options','addFormationCommand','drawItemBackground','drawPendingItemBackground','goldWindowRect','note','popScene','value','createCommandNameWindow','CallHandlerJS','PortraitStyle','setMenuImage','open','_statusWindow','kATni','adjustCommandHeightByPlaytime','Window_MenuStatus_selectLast','drawActorGraphic','_dummyWindow','openness','eeUga','EVAL','toUpperCase','updateOpacity','ceil','innerWidth','clear','characterIndex','initialize','_bitmapReady','shift','commandPersonal','drawItemStatusVerticalStyle','commandWindowStyle','prototype','Scene_Menu_commandFormation','iRyTi','boxWidth','default','name'];(function(_0x591395,_0x549ff8){const _0x47a936=function(_0x8d27bb){while(--_0x8d27bb){_0x591395['push'](_0x591395['shift']());}};_0x47a936(++_0x549ff8);}(_0x549f,0x113));const _0x47a9=function(_0x591395,_0x549ff8){_0x591395=_0x591395-0x0;let _0x47a936=_0x549f[_0x591395];return _0x47a936;};const _0x57a2c2=_0x47a9;var label=_0x57a2c2('0x126'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x57a2c2('0xa3')](function(_0x5f0073){const _0x3d2420=_0x57a2c2;return _0x5f0073[_0x3d2420('0x3b')]&&_0x5f0073[_0x3d2420('0x154')][_0x3d2420('0x7d')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x57a2c2('0xd')]||{},VisuMZ[_0x57a2c2('0x124')]=function(_0x2cdb2,_0xa00287){const _0x56f911=_0x57a2c2;for(const _0x379eb8 in _0xa00287){if(_0x56f911('0x81')===_0x56f911('0x81')){if(_0x379eb8['match'](/(.*):(.*)/i)){const _0x51a1de=String(RegExp['$1']),_0x5e885b=String(RegExp['$2'])[_0x56f911('0x55')]()['trim']();let _0x54b987,_0x4aad46,_0x22c9c5;switch(_0x5e885b){case'NUM':_0x54b987=_0xa00287[_0x379eb8]!==''?Number(_0xa00287[_0x379eb8]):0x0;break;case _0x56f911('0x13d'):_0x4aad46=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):[],_0x54b987=_0x4aad46[_0x56f911('0x6c')](_0x156110=>Number(_0x156110));break;case _0x56f911('0x54'):_0x54b987=_0xa00287[_0x379eb8]!==''?eval(_0xa00287[_0x379eb8]):null;break;case _0x56f911('0xd9'):_0x4aad46=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):[],_0x54b987=_0x4aad46[_0x56f911('0x6c')](_0x12156f=>eval(_0x12156f));break;case'JSON':_0x54b987=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):'';break;case _0x56f911('0xa1'):_0x4aad46=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):[],_0x54b987=_0x4aad46[_0x56f911('0x6c')](_0x5b690a=>JSON[_0x56f911('0xcf')](_0x5b690a));break;case'FUNC':_0x54b987=_0xa00287[_0x379eb8]!==''?new Function(JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8])):new Function('return\x200');break;case _0x56f911('0x38'):_0x4aad46=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):[],_0x54b987=_0x4aad46[_0x56f911('0x6c')](_0x17e51d=>new Function(JSON[_0x56f911('0xcf')](_0x17e51d)));break;case'STR':_0x54b987=_0xa00287[_0x379eb8]!==''?String(_0xa00287[_0x379eb8]):'';break;case _0x56f911('0x15b'):_0x4aad46=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):[],_0x54b987=_0x4aad46[_0x56f911('0x6c')](_0x36ff30=>String(_0x36ff30));break;case _0x56f911('0x80'):_0x22c9c5=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):{},_0x2cdb2[_0x51a1de]={},VisuMZ['ConvertParams'](_0x2cdb2[_0x51a1de],_0x22c9c5);continue;case _0x56f911('0x117'):_0x4aad46=_0xa00287[_0x379eb8]!==''?JSON[_0x56f911('0xcf')](_0xa00287[_0x379eb8]):[],_0x54b987=_0x4aad46[_0x56f911('0x6c')](_0x176ca6=>VisuMZ[_0x56f911('0x124')]({},JSON[_0x56f911('0xcf')](_0x176ca6)));break;default:continue;}_0x2cdb2[_0x51a1de]=_0x54b987;}}else{function _0x5dbdb2(){const _0x9a7b48=_0x56f911,_0x32e052=this[_0x9a7b48('0xeb')](),_0x191da9=this['calcWindowHeight'](0x1,![]),_0x479973=_0x182ffc[_0x9a7b48('0x64')]-_0x32e052,_0x37a634=this[_0x9a7b48('0xa8')]()-_0x191da9;return new _0x2aec43(_0x479973,_0x37a634,_0x32e052,_0x191da9);}}}return _0x2cdb2;},(_0x36bf48=>{const _0x4b24b3=_0x57a2c2,_0x2efce0=_0x36bf48[_0x4b24b3('0x66')];for(const _0x3582d8 of dependencies){if(_0x4b24b3('0xf7')===_0x4b24b3('0x166')){function _0x59db6b(){const _0x31b1b9=_0x4b24b3,_0x5daf68=_0x262227[_0x31b1b9('0x113')][_0x31b1b9('0x60')]();if(_0x5daf68===_0x31b1b9('0x7b')){const _0x39fac6=_0x29d9bc[_0x31b1b9('0x126')]['Settings'][_0x31b1b9('0x12')][_0x31b1b9('0x116')];return this['lineHeight']()*_0x39fac6+0x8;}else return _0x6cf8b2[_0x31b1b9('0x61')][_0x31b1b9('0x15f')][_0x31b1b9('0x31')](this);}}else{if(!Imported[_0x3582d8]){if(_0x4b24b3('0x22')===_0x4b24b3('0x22')){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4b24b3('0xe1')](_0x2efce0,_0x3582d8)),SceneManager[_0x4b24b3('0x137')]();break;}else{function _0x50e8f0(){const _0x540439=_0x4b24b3;if(this[_0x540439('0xf9')]===_0x4d6006)this[_0x540439('0xf4')]();return this[_0x540439('0xf9')];}}}}}const _0xe81af=_0x36bf48[_0x4b24b3('0x154')];if(_0xe81af['match'](/\[Version[ ](.*?)\]/i)){if(_0x4b24b3('0x4')!==_0x4b24b3('0xec')){const _0x46bbaf=Number(RegExp['$1']);if(_0x46bbaf!==VisuMZ[label][_0x4b24b3('0x176')]){if(_0x4b24b3('0xb2')===_0x4b24b3('0xb2'))alert(_0x4b24b3('0x93')[_0x4b24b3('0xe1')](_0x2efce0,_0x46bbaf)),SceneManager[_0x4b24b3('0x137')]();else{function _0xb892e2(){const _0xf42511=_0x4b24b3,_0x51b09d=this[_0xf42511('0xd3')]();switch(_0x51b09d){case'vertical':case'portrait':case _0xf42511('0x111'):return this[_0xf42511('0x2b')];case _0xf42511('0x10c'):return _0x4a8311[_0xf42511('0x61')][_0xf42511('0x15f')][_0xf42511('0x31')](this);case _0xf42511('0xc4'):return this[_0xf42511('0x11e')]()*0x2+0x8;default:return _0x3ff42f['MainMenuCore'][_0xf42511('0xe2')][_0xf42511('0x31')](this);}}}}}else{function _0x4372cb(){const _0x424df0=_0x4b24b3;this[_0x424df0('0x160')]=null,this[_0x424df0('0x5c')]=![],_0x57f9eb[_0x424df0('0x61')][_0x424df0('0x5b')][_0x424df0('0x31')](this),this['x']=_0x1f464f[_0x424df0('0xdb')];}}}if(_0xe81af[_0x4b24b3('0x10b')](/\[Tier[ ](\d+)\]/i)){const _0x31d33d=Number(RegExp['$1']);_0x31d33d<tier?(alert(_0x4b24b3('0xf0')[_0x4b24b3('0xe1')](_0x2efce0,_0x31d33d,tier)),SceneManager[_0x4b24b3('0x137')]()):tier=Math[_0x4b24b3('0xdd')](_0x31d33d,tier);}VisuMZ[_0x4b24b3('0x124')](VisuMZ[label][_0x4b24b3('0xd')],_0x36bf48[_0x4b24b3('0x130')]);})(pluginData),PluginManager[_0x57a2c2('0x8f')](pluginData[_0x57a2c2('0x66')],_0x57a2c2('0xc7'),_0x3f7896=>{const _0x19dcd1=_0x57a2c2;VisuMZ['ConvertParams'](_0x3f7896,_0x3f7896);const _0x43af01=_0x3f7896[_0x19dcd1('0xb0')],_0x3fcffa=_0x3f7896[_0x19dcd1('0x146')];for(let _0x2eb5af of _0x43af01){if(_0x19dcd1('0x33')===_0x19dcd1('0x9d')){function _0x397f78(){const _0x5d2f3e=_0x19dcd1;this[_0x5d2f3e('0x16e')](_0x2cdf69,_0x5020dd['x'],_0xe858dc['y'],_0x33de78);}}else{_0x2eb5af=parseInt(_0x2eb5af)||0x0;if(_0x2eb5af<=0x0)continue;const _0x3e27ac=$gameActors[_0x19dcd1('0x79')](_0x2eb5af);if(!_0x3e27ac)continue;_0x3e27ac[_0x19dcd1('0x4a')](_0x3fcffa);}}}),PluginManager[_0x57a2c2('0x8f')](pluginData[_0x57a2c2('0x66')],'ChangeActorMenuImageRange',_0x50b0f4=>{const _0x53ac22=_0x57a2c2;VisuMZ[_0x53ac22('0x124')](_0x50b0f4,_0x50b0f4);const _0x3fda71=_0x50b0f4[_0x53ac22('0x2e')]>=_0x50b0f4[_0x53ac22('0xa9')]?_0x50b0f4['Step1Start']:_0x50b0f4[_0x53ac22('0x2e')],_0x2c2c2a=_0x50b0f4[_0x53ac22('0x2e')]>=_0x50b0f4[_0x53ac22('0xa9')]?_0x50b0f4[_0x53ac22('0x2e')]:_0x50b0f4[_0x53ac22('0xa9')],_0x48da7f=Array(_0x2c2c2a-_0x3fda71+0x1)[_0x53ac22('0x141')]()[_0x53ac22('0x6c')]((_0x4c6b3a,_0x4e26f9)=>_0x3fda71+_0x4e26f9),_0x5c5432=_0x50b0f4[_0x53ac22('0x146')];for(let _0xec67e2 of _0x48da7f){_0xec67e2=parseInt(_0xec67e2)||0x0;if(_0xec67e2<=0x0)continue;const _0x2e4913=$gameActors[_0x53ac22('0x79')](_0xec67e2);if(!_0x2e4913)continue;_0x2e4913['setMenuImage'](_0x5c5432);}}),PluginManager['registerCommand'](pluginData['name'],_0x57a2c2('0x14a'),_0x1f2927=>{const _0x287cd5=_0x57a2c2;VisuMZ[_0x287cd5('0x124')](_0x1f2927,_0x1f2927);const _0x380666=_0x1f2927[_0x287cd5('0xb0')];let _0x57c06a=[];while(_0x380666['length']>0x0){const _0x182dd7=_0x380666[_0x287cd5('0x5d')]();if(Array[_0x287cd5('0x24')](_0x182dd7)){if('dfdSA'===_0x287cd5('0x1')){function _0xc3a2d3(){const _0x5acc23=_0x287cd5;_0x3baa9[_0x5acc23('0x126')][_0x5acc23('0x69')]['call'](this),this[_0x5acc23('0x135')]();}}else _0x57c06a=_0x57c06a[_0x287cd5('0x83')](_0x182dd7);}else _0x57c06a['push'](_0x182dd7);}const _0x2f80fd=_0x1f2927['Step2'];for(let _0x47d619 of _0x57c06a){_0x47d619=parseInt(_0x47d619)||0x0;if(_0x47d619<=0x0)continue;const _0x5f033f=$gameActors['actor'](_0x47d619);if(!_0x5f033f)continue;_0x5f033f[_0x287cd5('0x4a')](_0x2f80fd);}}),VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0xc1')]=Game_Actor[_0x57a2c2('0x61')][_0x57a2c2('0x171')],Game_Actor[_0x57a2c2('0x61')][_0x57a2c2('0x171')]=function(_0x405d9b){const _0x2545c0=_0x57a2c2;VisuMZ[_0x2545c0('0x126')][_0x2545c0('0xc1')][_0x2545c0('0x31')](this,_0x405d9b),this[_0x2545c0('0xf4')]();},Game_Actor[_0x57a2c2('0x61')][_0x57a2c2('0xf4')]=function(){const _0x130b8d=_0x57a2c2;this[_0x130b8d('0xf9')]='';if(this[_0x130b8d('0x79')]()&&this[_0x130b8d('0x79')]()[_0x130b8d('0x44')][_0x130b8d('0x10b')](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x130b8d('0x18')===_0x130b8d('0x18'))this['_menuImage']=String(RegExp['$1']);else{function _0x3b7edc(){const _0x5db653=_0x130b8d;this[_0x5db653('0x5f')](_0x257587,_0x3271ff);}}}},Game_Actor[_0x57a2c2('0x61')][_0x57a2c2('0x9c')]=function(){const _0x18e4d5=_0x57a2c2;if(this['_menuImage']===undefined)this[_0x18e4d5('0xf4')]();return this[_0x18e4d5('0xf9')];},Game_Actor[_0x57a2c2('0x61')][_0x57a2c2('0x4a')]=function(_0x2f44b9){const _0x4a6918=_0x57a2c2;if(this['_menuImage']===undefined)this[_0x4a6918('0xf4')]();this['_menuImage']=_0x2f44b9;},Scene_MenuBase[_0x57a2c2('0x61')][_0x57a2c2('0x147')]=function(){const _0x564a58=_0x57a2c2;return VisuMZ['MainMenuCore'][_0x564a58('0xd')]['General'][_0x564a58('0xf1')][_0x564a58('0x7d')](this[_0x564a58('0xc5')][_0x564a58('0x66')]);},VisuMZ['MainMenuCore'][_0x57a2c2('0x92')]=Scene_MenuBase['prototype'][_0x57a2c2('0xad')],Scene_MenuBase[_0x57a2c2('0x61')][_0x57a2c2('0xad')]=function(){const _0x54cb10=_0x57a2c2;VisuMZ[_0x54cb10('0x126')][_0x54cb10('0x92')]['call'](this),this['createActorMenuBackgroundImageSprite']();},Scene_MenuBase[_0x57a2c2('0x61')][_0x57a2c2('0x179')]=function(){const _0xf453ec=_0x57a2c2;this[_0xf453ec('0xe')]=new Sprite_MenuBackgroundActor(),this[_0xf453ec('0x106')](this[_0xf453ec('0xe')]);},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0xea')]=Scene_MenuBase[_0x57a2c2('0x61')]['updateActor'],Scene_MenuBase[_0x57a2c2('0x61')]['updateActor']=function(){const _0x10dd55=_0x57a2c2;VisuMZ[_0x10dd55('0x126')][_0x10dd55('0xea')][_0x10dd55('0x31')](this),this[_0x10dd55('0x147')]()&&this[_0x10dd55('0xe')]&&this[_0x10dd55('0xe')]['setActor'](this[_0x10dd55('0x160')]);},VisuMZ[_0x57a2c2('0x126')]['Scene_Menu_create']=Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x123')],Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x123')]=function(){const _0x576117=_0x57a2c2;VisuMZ[_0x576117('0x126')]['Scene_Menu_create']['call'](this),this['createPlaytimeWindow'](),this[_0x576117('0xbf')](),this[_0x576117('0x140')]();},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x10a')]=function(){const _0x1d1b47=_0x57a2c2,_0x3be0eb=this[_0x1d1b47('0xfb')](),_0x554a81=new Window_MenuCommand(_0x3be0eb);_0x554a81[_0x1d1b47('0x15e')]('cancel',this[_0x1d1b47('0x45')][_0x1d1b47('0x129')](this)),this[_0x1d1b47('0xf5')](_0x554a81),this[_0x1d1b47('0x175')]=_0x554a81;},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0x91')]=Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0xfb')],Scene_Menu[_0x57a2c2('0x61')]['commandWindowRect']=function(){const _0x5079ae=_0x57a2c2,_0x27145b=this[_0x5079ae('0x60')]();if(_0x27145b===_0x5079ae('0x2c')){if(_0x5079ae('0xb5')===_0x5079ae('0xb5'))return this[_0x5079ae('0x75')]();else{function _0x2f8e88(){const _0x24a5f4=_0x5079ae,_0xb32e4=_0x20b6e7[_0x24a5f4('0x64')]-this[_0x24a5f4('0x14c')][_0x24a5f4('0xdb')]-(this[_0x24a5f4('0x32')]?this[_0x24a5f4('0x32')][_0x24a5f4('0xdb')]:0x0),_0x1496c0=this[_0x24a5f4('0xae')](0x1,![]),_0x910621=this[_0x24a5f4('0x14c')]['x']-_0xb32e4,_0x388975=this[_0x24a5f4('0x172')]();return new _0x145499(_0x910621,_0x388975,_0xb32e4,_0x1496c0);}}}else{if(_0x27145b==='thinTop'){if('JSMsk'!=='zDhQT')return this[_0x5079ae('0x7')]();else{function _0x22d23d(){const _0x2f6d60=_0x5079ae;_0x222c2e[_0x2f6d60('0x126')][_0x2f6d60('0x36')][_0x2f6d60('0x31')](this);if(this[_0x2f6d60('0x60')]()==='mobile')this[_0x2f6d60('0x4c')][_0x2f6d60('0x13a')]();}}}else{if(_0x27145b===_0x5079ae('0x3'))return this[_0x5079ae('0x152')]();else{if(_0x27145b===_0x5079ae('0x119'))return this['commandWindowRectThinBottomStyle']();else{if(_0x27145b===_0x5079ae('0x7b')){if(_0x5079ae('0x11')===_0x5079ae('0x11'))return this[_0x5079ae('0x105')]();else{function _0x20cbdb(){const _0x2bdc84=_0x5079ae;return this['showOnlyBattleMembers']()?_0x323f1b[_0x2bdc84('0xda')]()[_0x2bdc84('0x139')]:_0x2d0086[_0x2bdc84('0x126')][_0x2bdc84('0xa6')]['call'](this);}}}else{if('SPisY'!=='VsOaf'){const _0x1d0982=VisuMZ[_0x5079ae('0x126')][_0x5079ae('0x91')]['call'](this);return this['adjustDefaultCommandWindowRect'](_0x1d0982),_0x1d0982;}else{function _0x4f9505(){const _0x4ffc87=_0x5079ae;if(!this['canCreateVariableWindow']())return new _0x1d68e3(0x0,0x0,0x0,0x0);const _0x2e0ef9=this[_0x4ffc87('0x11c')]();this['_variableWindow']=new _0x122388(_0x2e0ef9),this['_variableWindow'][_0x4ffc87('0x25')](_0x29ef55['MainMenuCore'][_0x4ffc87('0xd')][_0x4ffc87('0x9f')][_0x4ffc87('0x8e')]),this['addWindow'](this[_0x4ffc87('0x149')]);}}}}}}}},Scene_Menu['prototype'][_0x57a2c2('0xef')]=function(_0x1fdbca){const _0x122fac=_0x57a2c2;if(this[_0x122fac('0x4e')]()){if('LEeRg'==='LEeRg')_0x1fdbca['height']-=this['playtimeWindowRect']()[_0x122fac('0x89')];else{function _0x23092e(){const _0x69ac5=_0x122fac,_0xa0699=_0x531920+_0x2bcde6;_0xa0699<this['maxItems']()&&(this[_0x69ac5('0x41')](_0xa0699),this[_0x69ac5('0x94')](_0xa0699));}}}this[_0x122fac('0x35')]()&&(_0x1fdbca[_0x122fac('0x89')]-=this[_0x122fac('0x11c')]()[_0x122fac('0x89')]);},Scene_Menu[_0x57a2c2('0x61')]['commandWindowRectTopStyle']=function(){const _0x5d9bdb=_0x57a2c2,_0x215d83=VisuMZ[_0x5d9bdb('0x126')][_0x5d9bdb('0xd')][_0x5d9bdb('0x12')][_0x5d9bdb('0x100')],_0x22234f=Graphics[_0x5d9bdb('0x64')],_0x184121=this[_0x5d9bdb('0xae')](_0x215d83,!![]),_0x585a00=0x0,_0xfd8485=this[_0x5d9bdb('0x172')]();return new Rectangle(_0x585a00,_0xfd8485,_0x22234f,_0x184121);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x7')]=function(){const _0x41325f=_0x57a2c2,_0x349968=VisuMZ[_0x41325f('0x126')][_0x41325f('0xd')][_0x41325f('0x12')]['Rows'],_0x4c5c2a=Graphics[_0x41325f('0x64')],_0x3af588=this[_0x41325f('0xae')](0x1,!![]),_0x878120=0x0,_0x5b79b6=this[_0x41325f('0x172')]();return new Rectangle(_0x878120,_0x5b79b6,_0x4c5c2a,_0x3af588);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x152')]=function(){const _0x38aa2c=_0x57a2c2,_0x1fec90=VisuMZ[_0x38aa2c('0x126')][_0x38aa2c('0xd')]['CustomCmdWin'][_0x38aa2c('0x100')],_0x1b2984=Graphics[_0x38aa2c('0x64')],_0x170c20=this[_0x38aa2c('0xae')](_0x1fec90,!![]),_0x2efc98=0x0,_0x29e553=this[_0x38aa2c('0xa8')]()-_0x170c20;return new Rectangle(_0x2efc98,_0x29e553,_0x1b2984,_0x170c20);},Scene_Menu[_0x57a2c2('0x61')]['commandWindowRectThinBottomStyle']=function(){const _0x1e1ebe=_0x57a2c2,_0x2bcad6=VisuMZ[_0x1e1ebe('0x126')][_0x1e1ebe('0xd')]['CustomCmdWin'][_0x1e1ebe('0x100')],_0x32ebe6=Graphics[_0x1e1ebe('0x64')],_0x185be0=this[_0x1e1ebe('0xae')](0x1,!![]),_0x9c3808=0x0,_0x3b62fd=this[_0x1e1ebe('0xa8')]()-_0x185be0;return new Rectangle(_0x9c3808,_0x3b62fd,_0x32ebe6,_0x185be0);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x105')]=function(){const _0x3236d9=_0x57a2c2,_0x5eb08b=VisuMZ[_0x3236d9('0x126')]['Settings'][_0x3236d9('0x12')][_0x3236d9('0x100')],_0x178059=Graphics[_0x3236d9('0x64')],_0x3d5ba0=Window_MenuCommand['prototype'][_0x3236d9('0x12a')](_0x5eb08b),_0x46193c=0x0,_0x52f32b=Math[_0x3236d9('0x14e')]((Graphics[_0x3236d9('0x102')]-_0x3d5ba0)/0x2);return new Rectangle(_0x46193c,_0x52f32b,_0x178059,_0x3d5ba0);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x60')]=function(){const _0x225c27=_0x57a2c2;return VisuMZ[_0x225c27('0x126')]['Settings'][_0x225c27('0x28')];},Scene_Menu['prototype'][_0x57a2c2('0xdc')]=function(){const _0x4587ee=_0x57a2c2;if(this[_0x4587ee('0x60')]()!==_0x4587ee('0x65'))return!![];return VisuMZ[_0x4587ee('0x126')][_0x4587ee('0xd')][_0x4587ee('0x13c')][_0x4587ee('0x12e')];},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x88')]=function(){const _0x1ea460=_0x57a2c2,_0x2df832=this[_0x1ea460('0x43')]();this[_0x1ea460('0x14c')]=this['thinGoldWindow']()?new Window_ThinGold(_0x2df832):new Window_Gold(_0x2df832),this['addWindow'](this[_0x1ea460('0x14c')]);},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0x14f')]=Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x43')],Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x43')]=function(){const _0x4e6abf=_0x57a2c2,_0x208043=this['commandWindowStyle']();if([_0x4e6abf('0x2c'),_0x4e6abf('0x1b'),'mobile'][_0x4e6abf('0x7d')](_0x208043))return this[_0x4e6abf('0x11a')]();else{if([_0x4e6abf('0x3'),_0x4e6abf('0x119')][_0x4e6abf('0x7d')](_0x208043))return this[_0x4e6abf('0xb3')]();else{if('tujhc'===_0x4e6abf('0xe4')){const _0x2de005=VisuMZ['MainMenuCore']['Scene_Menu_goldWindowRect'][_0x4e6abf('0x31')](this);return this[_0x4e6abf('0x8')](_0x2de005),_0x2de005;}else{function _0x3db9e0(){const _0x56d5cd=_0x4e6abf;this[_0x56d5cd('0xf9')]='',this[_0x56d5cd('0x79')]()&&this['actor']()[_0x56d5cd('0x44')][_0x56d5cd('0x10b')](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x56d5cd('0xf9')]=_0x3a3be8(_0x51367f['$1']));}}}}},Scene_Menu['prototype']['applyThinnerGoldWindowRect']=function(_0x19c62d){const _0x27e240=_0x57a2c2;if(this[_0x27e240('0xdc')]()){if(VisuMZ['MainMenuCore'][_0x27e240('0xd')]['General']['AutoGoldY']){if(_0x27e240('0x153')!==_0x27e240('0x153')){function _0x341665(){const _0x5f2f0c=_0x27e240,_0x12c3cc=_0x2811cd['_scene']['commandWindowStyle']();if([_0x5f2f0c('0x1b'),_0x5f2f0c('0x119')][_0x5f2f0c('0x7d')](_0x12c3cc))return this['_list']?this[_0x5f2f0c('0x23')]():0x4;else return _0x12c3cc!=='default'?_0x2fe674[_0x5f2f0c('0x126')]['Settings']['CustomCmdWin'][_0x5f2f0c('0x7e')]:_0x5e468c['prototype']['maxCols'][_0x5f2f0c('0x31')](this);}}else{const _0x4564fb=_0x19c62d[_0x27e240('0x89')]-this['calcWindowHeight'](0x1,![]);_0x19c62d['y']+=_0x4564fb;}}if(VisuMZ[_0x27e240('0x126')][_0x27e240('0xd')][_0x27e240('0x13c')][_0x27e240('0x12f')]){if('PUalZ'==='PUalZ')_0x19c62d['height']=this[_0x27e240('0xae')](0x1,![]);else{function _0x5ba204(){const _0xfdbe85=_0x27e240;this[_0xfdbe85('0x5c')]=!![],_0x26a12d['MainMenuCore'][_0xfdbe85('0xd')][_0xfdbe85('0x13c')][_0xfdbe85('0x163')]['call'](this);}}}}},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x11a')]=function(){const _0x4fb3bd=_0x57a2c2,_0x5d8838=this[_0x4fb3bd('0xeb')](),_0x25f2c3=this['calcWindowHeight'](0x1,![]),_0x17c2b7=Graphics[_0x4fb3bd('0x64')]-_0x5d8838,_0x503006=this['mainAreaBottom']()-_0x25f2c3;return new Rectangle(_0x17c2b7,_0x503006,_0x5d8838,_0x25f2c3);},Scene_Menu['prototype'][_0x57a2c2('0xb3')]=function(){const _0x203249=_0x57a2c2,_0x576a63=this[_0x203249('0xeb')](),_0x5b92c9=this['calcWindowHeight'](0x1,![]),_0x7ee585=Graphics[_0x203249('0x64')]-_0x576a63,_0x5c8ba5=this[_0x203249('0x172')]();return new Rectangle(_0x7ee585,_0x5c8ba5,_0x576a63,_0x5b92c9);},VisuMZ[_0x57a2c2('0x126')]['Scene_Menu_createStatusWindow']=Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x169')],Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x169')]=function(){const _0x27e91c=_0x57a2c2;VisuMZ[_0x27e91c('0x126')][_0x27e91c('0x69')][_0x27e91c('0x31')](this),this[_0x27e91c('0x135')]();},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x135')]=function(){const _0x19ba0a=_0x57a2c2;if(this[_0x19ba0a('0x60')]()===_0x19ba0a('0x7b')){if(_0x19ba0a('0x13e')===_0x19ba0a('0x13e'))this[_0x19ba0a('0x4c')][_0x19ba0a('0x52')]=0x0;else{function _0x36ce70(){const _0x42c325=_0x19ba0a,_0x18a4db=this['itemLineRect'](_0x4cd4ca),_0x37fd50=this[_0x42c325('0x13b')](_0x4ee415),_0x39afbb=this[_0x42c325('0x6a')](_0x37fd50)[_0x42c325('0xdb')];this[_0x42c325('0x96')](this[_0x42c325('0x71')](_0x1bedaa));let _0x578d2d=this[_0x42c325('0x108')]();if(_0x578d2d===_0x42c325('0x7c'))this[_0x42c325('0x16e')](_0x37fd50,_0x18a4db['x']+_0x18a4db[_0x42c325('0xdb')]-_0x39afbb,_0x18a4db['y'],_0x39afbb);else{if(_0x578d2d==='center'){const _0x28649a=_0x18a4db['x']+_0x29b58d[_0x42c325('0x115')]((_0x18a4db['width']-_0x39afbb)/0x2);this[_0x42c325('0x16e')](_0x37fd50,_0x28649a,_0x18a4db['y'],_0x39afbb);}else this[_0x42c325('0x16e')](_0x37fd50,_0x18a4db['x'],_0x18a4db['y'],_0x39afbb);}}}}},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0xc8')]=Scene_Menu['prototype'][_0x57a2c2('0x134')],Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x134')]=function(){const _0x3daa76=_0x57a2c2,_0x56edb9=this[_0x3daa76('0x60')]();if([_0x3daa76('0x2c'),_0x3daa76('0x1b')][_0x3daa76('0x7d')](_0x56edb9))return this[_0x3daa76('0xed')]();else{if(['bottom',_0x3daa76('0x119')]['includes'](_0x56edb9)){if(_0x3daa76('0xf')===_0x3daa76('0xf'))return this['statusWindowRectBottomStyle']();else{function _0x561a8f(){const _0xf79dcc=_0x3daa76;return _0xf79dcc('0x3a');}}}else{if(_0x56edb9===_0x3daa76('0x7b')){if(_0x3daa76('0x90')===_0x3daa76('0xd5')){function _0x2fe924(){const _0x277808=_0x3daa76,_0x1f7f10=_0x1887ab[_0x277808('0x126')][_0x277808('0xd')][_0x277808('0x12')][_0x277808('0x100')],_0x48230e=_0x10ea2f[_0x277808('0x64')],_0x3bcc40=this[_0x277808('0xae')](0x1,!![]),_0x1f1df5=0x0,_0x12597c=this[_0x277808('0xa8')]()-_0x3bcc40;return new _0x29090e(_0x1f1df5,_0x12597c,_0x48230e,_0x3bcc40);}}else return this[_0x3daa76('0xff')]();}else return VisuMZ[_0x3daa76('0x126')][_0x3daa76('0xc8')][_0x3daa76('0x31')](this);}}},Scene_Menu[_0x57a2c2('0x61')]['statusWindowRectTopStyle']=function(){const _0x17f98a=_0x57a2c2,_0x140d24=Graphics[_0x17f98a('0x64')],_0x17d87d=this[_0x17f98a('0x70')]()-this[_0x17f98a('0x175')][_0x17f98a('0x89')]-this['_goldWindow'][_0x17f98a('0x89')],_0x3d0a56=0x0,_0x4e2517=this[_0x17f98a('0x175')]['y']+this[_0x17f98a('0x175')][_0x17f98a('0x89')];return new Rectangle(_0x3d0a56,_0x4e2517,_0x140d24,_0x17d87d);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0xb9')]=function(){const _0x3bfa14=_0x57a2c2,_0x588523=Graphics[_0x3bfa14('0x64')],_0x5bb2d3=this[_0x3bfa14('0x70')]()-this[_0x3bfa14('0x175')][_0x3bfa14('0x89')]-this[_0x3bfa14('0x14c')][_0x3bfa14('0x89')],_0x2e8abe=0x0,_0xd6ed20=this[_0x3bfa14('0x14c')]['y']+this['_goldWindow']['height'];return new Rectangle(_0x2e8abe,_0xd6ed20,_0x588523,_0x5bb2d3);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0xff')]=function(){const _0x495d54=_0x57a2c2,_0x2b8073=Graphics[_0x495d54('0x64')],_0x4b5194=this[_0x495d54('0x70')]()-this['_goldWindow']['height'],_0x3ecb31=0x0,_0x330690=this['mainAreaBottom']()-this[_0x495d54('0x14c')][_0x495d54('0x89')]-_0x4b5194;return new Rectangle(_0x3ecb31,_0x330690,_0x2b8073,_0x4b5194);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x114')]=function(){const _0x31b68f=_0x57a2c2;if(!this['canCreatePlaytimeWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x5e445a=this[_0x31b68f('0x174')]();this[_0x31b68f('0x32')]=new Window_Playtime(_0x5e445a),this[_0x31b68f('0x32')][_0x31b68f('0x25')](VisuMZ[_0x31b68f('0x126')][_0x31b68f('0xd')][_0x31b68f('0x14d')][_0x31b68f('0x8e')]),this[_0x31b68f('0xf5')](this[_0x31b68f('0x32')]);},Scene_Menu['prototype'][_0x57a2c2('0x19')]=function(){const _0x4f097c=_0x57a2c2;return VisuMZ['MainMenuCore'][_0x4f097c('0xd')]['Playtime'][_0x4f097c('0x112')];},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x4e')]=function(){const _0x1ced6d=_0x57a2c2;return this[_0x1ced6d('0x19')]()&&VisuMZ['MainMenuCore'][_0x1ced6d('0xd')][_0x1ced6d('0x14d')][_0x1ced6d('0xa')];},Scene_Menu[_0x57a2c2('0x61')]['playtimeWindowRect']=function(){const _0x5e846e=_0x57a2c2,_0x4cadc8=this[_0x5e846e('0x60')]();if([_0x5e846e('0x2c'),_0x5e846e('0x1b'),_0x5e846e('0x7b')][_0x5e846e('0x7d')](_0x4cadc8)){if(_0x5e846e('0x4d')!==_0x5e846e('0x158'))return this[_0x5e846e('0x16b')]();else{function _0x32355a(){const _0x42fb78=_0x5e846e;this[_0x42fb78('0xb1')]=_0x338892['playtimeText'](),this[_0x42fb78('0x15a')]=0x3c,_0x15117a[_0x42fb78('0x61')][_0x42fb78('0x5b')][_0x42fb78('0x31')](this,_0x17c03d),this[_0x42fb78('0xf8')]();}}}else{if(['bottom','thinBottom'][_0x5e846e('0x7d')](_0x4cadc8)){if(_0x5e846e('0x82')!==_0x5e846e('0x82')){function _0x2d5adf(){const _0x43e67d=_0x5e846e;return _0xd2e47d[_0x43e67d('0x126')][_0x43e67d('0xd')][_0x43e67d('0x13c')][_0x43e67d('0xf1')]['includes'](this[_0x43e67d('0xc5')][_0x43e67d('0x66')]);}}else return this[_0x5e846e('0xd0')]();}else return VisuMZ[_0x5e846e('0x126')]['Settings']['Playtime'][_0x5e846e('0x26')][_0x5e846e('0x31')](this);}},Scene_Menu['prototype'][_0x57a2c2('0x16b')]=function(){const _0x580837=_0x57a2c2,_0x426d0c=this[_0x580837('0xeb')](),_0x13556e=this[_0x580837('0xae')](0x1,![]),_0x30162c=0x0,_0x2a73a1=this['mainAreaBottom']()-_0x13556e;return new Rectangle(_0x30162c,_0x2a73a1,_0x426d0c,_0x13556e);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0xd0')]=function(){const _0x48cc5f=_0x57a2c2,_0x17b54a=this[_0x48cc5f('0xeb')](),_0x399b0e=this['calcWindowHeight'](0x1,![]),_0x10a476=0x0,_0x165ab1=this[_0x48cc5f('0x172')]();return new Rectangle(_0x10a476,_0x165ab1,_0x17b54a,_0x399b0e);},Scene_Menu[_0x57a2c2('0x61')]['createVariableWindow']=function(){const _0x5cf5fe=_0x57a2c2;if(!this[_0x5cf5fe('0x103')]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x347c1f=this[_0x5cf5fe('0x11c')]();this['_variableWindow']=new Window_MenuVariables(_0x347c1f),this[_0x5cf5fe('0x149')][_0x5cf5fe('0x25')](VisuMZ[_0x5cf5fe('0x126')][_0x5cf5fe('0xd')][_0x5cf5fe('0x9f')][_0x5cf5fe('0x8e')]),this[_0x5cf5fe('0xf5')](this[_0x5cf5fe('0x149')]);},Scene_Menu['prototype'][_0x57a2c2('0x103')]=function(){const _0x2c96c7=_0x57a2c2;return VisuMZ[_0x2c96c7('0x126')][_0x2c96c7('0xd')]['Variable'][_0x2c96c7('0x112')];},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x35')]=function(){const _0x4df4f6=_0x57a2c2;return this[_0x4df4f6('0x103')]()&&VisuMZ[_0x4df4f6('0x126')][_0x4df4f6('0xd')][_0x4df4f6('0x9f')][_0x4df4f6('0xa')];},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x11c')]=function(){const _0x8c550c=_0x57a2c2,_0x2b2139=this['commandWindowStyle']();if([_0x8c550c('0x2c'),_0x8c550c('0x1b'),'mobile'][_0x8c550c('0x7d')](_0x2b2139)){if(_0x8c550c('0x63')!=='gJtFX')return this['variableWindowRectTopStyle']();else{function _0x40bfd3(){const _0x52181b=_0x8c550c;_0x37cda5[_0x52181b('0x61')][_0x52181b('0x151')][_0x52181b('0x31')](this),this[_0x52181b('0x5c')]&&(this[_0x52181b('0x56')](),this['updatePosition'](),this[_0x52181b('0x1d')]());}}}else return[_0x8c550c('0x3'),_0x8c550c('0x119')]['includes'](_0x2b2139)?this[_0x8c550c('0xb7')]():VisuMZ[_0x8c550c('0x126')][_0x8c550c('0xd')]['Variable'][_0x8c550c('0x26')][_0x8c550c('0x31')](this);},Scene_Menu[_0x57a2c2('0x61')]['variableWindowRectTopStyle']=function(){const _0xebf79b=_0x57a2c2,_0x3cef86=Graphics[_0xebf79b('0x64')]-this[_0xebf79b('0x14c')][_0xebf79b('0xdb')]-(this[_0xebf79b('0x32')]?this['_playtimeWindow'][_0xebf79b('0xdb')]:0x0),_0x575b09=this['calcWindowHeight'](0x1,![]),_0x90598b=this[_0xebf79b('0x14c')]['x']-_0x3cef86,_0x5489da=this[_0xebf79b('0xa8')]()-_0x575b09;return new Rectangle(_0x90598b,_0x5489da,_0x3cef86,_0x575b09);},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0xb7')]=function(){const _0x343875=_0x57a2c2,_0x25dc96=Graphics[_0x343875('0x64')]-this[_0x343875('0x14c')][_0x343875('0xdb')]-(this['_playtimeWindow']?this[_0x343875('0x32')][_0x343875('0xdb')]:0x0),_0x4ce0ad=this[_0x343875('0xae')](0x1,![]),_0x1bd79e=this[_0x343875('0x14c')]['x']-_0x25dc96,_0x338106=this['mainAreaTop']();return new Rectangle(_0x1bd79e,_0x338106,_0x25dc96,_0x4ce0ad);},Scene_Menu[_0x57a2c2('0x61')]['createDummyWindow']=function(){const _0x4c2180=_0x57a2c2;if(!this[_0x4c2180('0xc')]())return;const _0x1aea0e=this[_0x4c2180('0x11c')]();this[_0x4c2180('0x51')]=new Window_Base(_0x1aea0e),this[_0x4c2180('0x51')][_0x4c2180('0x25')](VisuMZ['MainMenuCore'][_0x4c2180('0xd')]['Variable'][_0x4c2180('0x8e')]),this['addWindow'](this[_0x4c2180('0x51')]);},Scene_Menu[_0x57a2c2('0x61')]['needsDummyWindow']=function(){const _0x28d744=_0x57a2c2;if([_0x28d744('0x65'),_0x28d744('0x7b')][_0x28d744('0x7d')](this[_0x28d744('0x60')]()))return![];if(this['_variableWindow'])return![];return!![];},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0x148')]=Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x5e')],Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x5e')]=function(){const _0x5963ba=_0x57a2c2;if(this[_0x5963ba('0x128')]()&&this[_0x5963ba('0x4c')])$gameParty[_0x5963ba('0x132')]($gameParty[_0x5963ba('0xbd')]()[0x0]),this['onPersonalOk']();else{if(this[_0x5963ba('0x60')]()==='mobile')this[_0x5963ba('0x4c')][_0x5963ba('0x4b')]();VisuMZ[_0x5963ba('0x126')][_0x5963ba('0x148')][_0x5963ba('0x31')](this);}},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x128')]=function(){const _0x59c6c0=_0x57a2c2;return VisuMZ[_0x59c6c0('0x126')][_0x59c6c0('0xd')][_0x59c6c0('0x13c')][_0x59c6c0('0xca')]&&$gameParty['members']()[_0x59c6c0('0x139')]<=0x1;},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x13')]=function(){const _0x18ed60=_0x57a2c2,_0x5f134f=this[_0x18ed60('0x175')][_0x18ed60('0x13f')](),_0x1746e4=this[_0x18ed60('0x175')]['currentExt']();for(const _0x145c41 of Window_MenuCommand[_0x18ed60('0x138')]){if(_0x18ed60('0x29')===_0x18ed60('0x120')){function _0x5eb46b(){const _0x305c42=_0x18ed60;this[_0x305c42('0x96')](_0x118a3c[_0x305c42('0xa7')]());}}else{if(_0x145c41[_0x18ed60('0x16f')]===_0x5f134f){if(_0x18ed60('0x121')!==_0x18ed60('0x121')){function _0x30a724(){const _0xd341c9=_0x18ed60;this[_0xd341c9('0x131')]=_0x5ab82c[_0xd341c9('0x17')](this[_0xd341c9('0x160')]['getMenuImage']()),this[_0xd341c9('0x131')]['addLoadListener'](this[_0xd341c9('0xbe')][_0xd341c9('0x129')](this));}}else{_0x145c41[_0x18ed60('0x10f')][_0x18ed60('0x31')](this,_0x1746e4);return;}}}}},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0x36')]=Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x7f')],Scene_Menu['prototype']['onPersonalCancel']=function(){const _0x355ebd=_0x57a2c2;VisuMZ[_0x355ebd('0x126')][_0x355ebd('0x36')][_0x355ebd('0x31')](this);if(this[_0x355ebd('0x60')]()===_0x355ebd('0x7b'))this[_0x355ebd('0x4c')][_0x355ebd('0x13a')]();},Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x118')]=function(){const _0x1a8967=_0x57a2c2,_0x18e973=parseInt(this[_0x1a8967('0x175')][_0x1a8967('0x110')]());_0x18e973?($gameTemp[_0x1a8967('0x10d')](_0x18e973),this[_0x1a8967('0x45')]()):this[_0x1a8967('0x175')][_0x1a8967('0x6f')]();},VisuMZ['MainMenuCore'][_0x57a2c2('0x62')]=Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x101')],Scene_Menu[_0x57a2c2('0x61')]['commandFormation']=function(){const _0x3f248c=_0x57a2c2;VisuMZ[_0x3f248c('0x126')][_0x3f248c('0x62')][_0x3f248c('0x31')](this);if(this[_0x3f248c('0x60')]()==='mobile')this['_statusWindow']['open']();},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0x168')]=Scene_Menu['prototype']['onFormationCancel'],Scene_Menu[_0x57a2c2('0x61')][_0x57a2c2('0x86')]=function(){const _0xff67b7=_0x57a2c2;VisuMZ[_0xff67b7('0x126')][_0xff67b7('0x168')][_0xff67b7('0x31')](this);if(this[_0xff67b7('0x60')]()===_0xff67b7('0x7b'))this[_0xff67b7('0x4c')]['close']();};function Sprite_MenuBackgroundActor(){const _0x43ba8b=_0x57a2c2;this[_0x43ba8b('0x5b')](...arguments);}Sprite_MenuBackgroundActor[_0x57a2c2('0x61')]=Object[_0x57a2c2('0x123')](Sprite[_0x57a2c2('0x61')]),Sprite_MenuBackgroundActor['prototype'][_0x57a2c2('0xc5')]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x57a2c2('0x61')][_0x57a2c2('0x5b')]=function(){const _0x1217ed=_0x57a2c2;this[_0x1217ed('0x160')]=null,this[_0x1217ed('0x5c')]=![],Sprite['prototype'][_0x1217ed('0x5b')][_0x1217ed('0x31')](this),this['x']=Graphics[_0x1217ed('0xdb')];},Sprite_MenuBackgroundActor['prototype']['setActor']=function(_0x59cc71){const _0x3e3078=_0x57a2c2;this['_actor']!==_0x59cc71&&(this[_0x3e3078('0x160')]=_0x59cc71,this[_0x3e3078('0xac')]());},Sprite_MenuBackgroundActor[_0x57a2c2('0x61')]['loadBitmap']=function(){const _0x593e13=_0x57a2c2;this[_0x593e13('0x5c')]=![];if(this['_actor']){if('zifWr'===_0x593e13('0xe9'))this[_0x593e13('0x131')]=ImageManager[_0x593e13('0x17')](this[_0x593e13('0x160')]['getMenuImage']()),this[_0x593e13('0x131')]['addLoadListener'](this['onBitmapLoad']['bind'](this));else{function _0x5049ef(){const _0x119dd3=_0x593e13,_0x4a30a8=_0x463ced[_0x119dd3('0x126')][_0x119dd3('0xd')][_0x119dd3('0x12')][_0x119dd3('0x116')];return this['lineHeight']()*_0x4a30a8+0x8;}}}else this[_0x593e13('0x131')]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x57a2c2('0x61')][_0x57a2c2('0xbe')]=function(){const _0x510271=_0x57a2c2;this[_0x510271('0x5c')]=!![],VisuMZ[_0x510271('0x126')]['Settings'][_0x510271('0x13c')][_0x510271('0x163')]['call'](this);},Sprite_MenuBackgroundActor['prototype'][_0x57a2c2('0x151')]=function(){const _0x4d92c6=_0x57a2c2;Sprite[_0x4d92c6('0x61')][_0x4d92c6('0x151')][_0x4d92c6('0x31')](this),this[_0x4d92c6('0x5c')]&&(this[_0x4d92c6('0x56')](),this[_0x4d92c6('0x159')](),this[_0x4d92c6('0x1d')]());},Sprite_MenuBackgroundActor[_0x57a2c2('0x61')][_0x57a2c2('0x56')]=function(){const _0x3224ad=_0x57a2c2;if(this[_0x3224ad('0xbc')]>0x0){const _0x18b865=this[_0x3224ad('0xbc')];this[_0x3224ad('0x1e')]=(this[_0x3224ad('0x1e')]*(_0x18b865-0x1)+0xff)/_0x18b865;}},Sprite_MenuBackgroundActor[_0x57a2c2('0x61')][_0x57a2c2('0x159')]=function(){const _0x351557=_0x57a2c2;if(this['_duration']>0x0){if(_0x351557('0x164')===_0x351557('0x164')){const _0x22bb99=this[_0x351557('0xbc')];this['x']=(this['x']*(_0x22bb99-0x1)+this['_targetX'])/_0x22bb99,this['y']=(this['y']*(_0x22bb99-0x1)+this[_0x351557('0xe8')])/_0x22bb99;}else{function _0x299085(){return _0x56bd72;}}}},Sprite_MenuBackgroundActor[_0x57a2c2('0x61')][_0x57a2c2('0x1d')]=function(){const _0x4689e4=_0x57a2c2;if(this[_0x4689e4('0xbc')]>0x0)this[_0x4689e4('0xbc')]--;},ImageManager[_0x57a2c2('0x107')]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x57a2c2('0xab')]=ImageManager[_0x57a2c2('0xab')]||0x6,Window_Base[_0x57a2c2('0x61')][_0x57a2c2('0xaf')]=function(_0x19d3e6,_0x1908f0,_0x5b8d34){const _0xe38668=_0x57a2c2,_0x1ea20e=ImageManager[_0xe38668('0xc3')](_0x19d3e6),_0x5a44be=_0x1ea20e[_0xe38668('0xdb')]/ImageManager[_0xe38668('0x107')],_0x36e347=_0x1ea20e[_0xe38668('0x89')]/ImageManager[_0xe38668('0xab')],_0x21cc1b=0x0,_0x47b08d=0x0;this[_0xe38668('0xd1')]['blt'](_0x1ea20e,_0x21cc1b,_0x47b08d,_0x5a44be,_0x36e347,_0x1908f0-_0x5a44be/0x2,_0x5b8d34-_0x36e347);},Window_MenuCommand[_0x57a2c2('0x138')]=VisuMZ['MainMenuCore'][_0x57a2c2('0xd')][_0x57a2c2('0x127')],VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0x14b')]=Window_MenuCommand[_0x57a2c2('0x61')]['initialize'],Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0x5b')]=function(_0x43851b){const _0xca0092=_0x57a2c2;VisuMZ['MainMenuCore']['Window_MenuCommand_initialize']['call'](this,_0x43851b),this[_0xca0092('0x47')](_0x43851b);},Window_MenuCommand['prototype'][_0x57a2c2('0x47')]=function(_0x51d52b){const _0x4ff08f=_0x57a2c2,_0x3acc0a=new Rectangle(0x0,0x0,_0x51d52b[_0x4ff08f('0xdb')],_0x51d52b[_0x4ff08f('0x89')]);this[_0x4ff08f('0xf3')]=new Window_Base(_0x3acc0a),this[_0x4ff08f('0xf3')][_0x4ff08f('0x1e')]=0x0,this[_0x4ff08f('0x106')](this[_0x4ff08f('0xf3')]),this['updateCommandNameWindow']();},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0x16d')]=function(){const _0x531a72=_0x57a2c2;Window_HorzCommand['prototype'][_0x531a72('0x16d')][_0x531a72('0x31')](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_MenuCommand[_0x57a2c2('0x61')]['updateCommandNameWindow']=function(){const _0x17eaae=_0x57a2c2,_0x516564=this[_0x17eaae('0xf3')];_0x516564[_0x17eaae('0xd1')]['clear']();const _0x73c0cf=this[_0x17eaae('0xcb')](this[_0x17eaae('0x16')]());if(_0x73c0cf===_0x17eaae('0x3a')){const _0x30144d=this[_0x17eaae('0xba')](this['index']());let _0x886369=this[_0x17eaae('0x13b')](this[_0x17eaae('0x16')]());_0x886369=_0x886369['replace'](/\\I\[(\d+)\]/gi,''),_0x516564['resetFontSettings'](),this[_0x17eaae('0xc0')](_0x886369,_0x30144d),this[_0x17eaae('0x15d')](_0x886369,_0x30144d),this[_0x17eaae('0x12c')](_0x886369,_0x30144d);}},Window_MenuCommand[_0x57a2c2('0x61')]['commandNameWindowDrawBackground']=function(_0x4fc279,_0x5b2a38){},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0x15d')]=function(_0x5f07e3,_0x21a894){const _0x1cc8d4=_0x57a2c2,_0x1ede7d=this[_0x1cc8d4('0xf3')];_0x1ede7d[_0x1cc8d4('0x122')](_0x5f07e3,0x0,_0x21a894['y'],_0x1ede7d[_0x1cc8d4('0x58')],_0x1cc8d4('0xe7'));},Window_MenuCommand['prototype']['commandNameWindowCenter']=function(_0x4dd8c9,_0x543e23){const _0x7ef3b=_0x57a2c2,_0x5a98a4=this['_commandNameWindow'],_0x16249c=$gameSystem[_0x7ef3b('0x85')](),_0x23221e=_0x543e23['x']+Math[_0x7ef3b('0x115')](_0x543e23['width']/0x2)+_0x16249c;_0x5a98a4['x']=_0x5a98a4[_0x7ef3b('0xdb')]/-0x2+_0x23221e,_0x5a98a4['y']=Math[_0x7ef3b('0x115')](_0x543e23['height']/0x4);},Window_MenuCommand['prototype'][_0x57a2c2('0x15f')]=function(){const _0xed6c6e=_0x57a2c2,_0x119ce0=SceneManager[_0xed6c6e('0x113')][_0xed6c6e('0x60')]();if(_0x119ce0===_0xed6c6e('0x7b')){const _0x5ba55b=VisuMZ[_0xed6c6e('0x126')][_0xed6c6e('0xd')][_0xed6c6e('0x12')]['MobileThickness'];return this[_0xed6c6e('0x11e')]()*_0x5ba55b+0x8;}else return Window_Command[_0xed6c6e('0x61')][_0xed6c6e('0x15f')][_0xed6c6e('0x31')](this);},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0xee')]=function(){this['makeMainMenuCoreCommandList']();},Window_MenuCommand[_0x57a2c2('0x61')]['makeMainMenuCoreCommandList']=function(){const _0x1181b7=_0x57a2c2;for(const _0xf0bebf of Window_MenuCommand[_0x1181b7('0x138')]){if(_0x1181b7('0xf2')===_0x1181b7('0x10e')){function _0x43d896(){const _0x27b75e=_0x1181b7,_0x2e0a86=_0x34e2f6['loadPicture'](_0x28bf89[_0x27b75e('0x9c')]());_0x2e0a86[_0x27b75e('0xa5')](this[_0x27b75e('0x167')][_0x27b75e('0x129')](this,_0x5ad3c9,_0x3392be));}}else{const _0x348a3d=_0xf0bebf[_0x1181b7('0x16f')];if(_0xf0bebf[_0x1181b7('0x10')][_0x1181b7('0x31')](this)){let _0x1f520c=_0xf0bebf[_0x1181b7('0x104')];if(['',_0x1181b7('0x173')][_0x1181b7('0x7d')](_0x1f520c))_0x1f520c=_0xf0bebf[_0x1181b7('0x14')][_0x1181b7('0x31')](this);const _0x10b1fb=_0xf0bebf['Icon'];if(_0x10b1fb>0x0&&this['commandStyle']()!==_0x1181b7('0xce')){if('zCWUh'==='zCWUh')_0x1f520c=_0x1181b7('0xf6')['format'](_0x10b1fb,_0x1f520c);else{function _0x49c403(){const _0x4da218=_0x1181b7;_0x52a4e4[_0x4da218('0x126')][_0x4da218('0x168')][_0x4da218('0x31')](this);if(this[_0x4da218('0x60')]()==='mobile')this[_0x4da218('0x4c')][_0x4da218('0x13a')]();}}}const _0x2090e3=_0xf0bebf[_0x1181b7('0xbb')][_0x1181b7('0x31')](this),_0x29d696=_0xf0bebf['ExtJS'][_0x1181b7('0x31')](this);this[_0x1181b7('0x3c')](_0x1f520c,_0x348a3d,_0x2090e3,_0x29d696),this[_0x1181b7('0x15e')](_0x348a3d,_0xf0bebf[_0x1181b7('0x48')][_0x1181b7('0x129')](this,_0x29d696));}this['addSymbolBridge'](_0x348a3d);}}},Window_MenuCommand[_0x57a2c2('0x61')]['addSymbolBridge']=function(_0x2ef1e5){const _0x37d0e9=_0x57a2c2;switch(_0x2ef1e5){case'item':this[_0x37d0e9('0x87')]();break;case _0x37d0e9('0xd2'):this[_0x37d0e9('0x40')](),this[_0x37d0e9('0x37')]();break;case _0x37d0e9('0x3f'):this[_0x37d0e9('0xb6')]();break;case'save':this[_0x37d0e9('0x125')]();break;case _0x37d0e9('0x9a'):this[_0x37d0e9('0x155')]();break;}},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0x87')]=function(){},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0x40')]=function(){},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0x37')]=function(){},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0xb6')]=function(){},Window_MenuCommand[_0x57a2c2('0x61')]['addSaveCommand']=function(){},Window_MenuCommand['prototype']['addGameEndCommand']=function(){},Window_MenuCommand['prototype']['maxCols']=function(){const _0x5e6591=_0x57a2c2,_0x24055e=SceneManager[_0x5e6591('0x113')]['commandWindowStyle']();if([_0x5e6591('0x1b'),_0x5e6591('0x119')]['includes'](_0x24055e))return this[_0x5e6591('0x2a')]?this[_0x5e6591('0x23')]():0x4;else{if(_0x24055e!=='default')return VisuMZ[_0x5e6591('0x126')][_0x5e6591('0xd')]['CustomCmdWin'][_0x5e6591('0x7e')];else{if(_0x5e6591('0x136')===_0x5e6591('0x177')){function _0x1b7a46(){const _0x1bf655=_0x5e6591,_0x3cc386=_0x22fc17[_0x1bf655('0xc3')](_0x2435be),_0x142656=_0x3cc386[_0x1bf655('0xdb')]/_0x508896[_0x1bf655('0x107')],_0xb4acb2=_0x3cc386[_0x1bf655('0x89')]/_0xd41f4a[_0x1bf655('0xab')],_0x3326e2=0x0,_0x4966a4=0x0;this[_0x1bf655('0xd1')][_0x1bf655('0xdf')](_0x3cc386,_0x3326e2,_0x4966a4,_0x142656,_0xb4acb2,_0x1ca4ed-_0x142656/0x2,_0x49b10c-_0xb4acb2);}}else return Window_Command['prototype'][_0x5e6591('0x77')][_0x5e6591('0x31')](this);}}},Window_MenuCommand[_0x57a2c2('0x61')]['itemTextAlign']=function(){const _0x3311ec=_0x57a2c2;return VisuMZ[_0x3311ec('0x126')]['Settings'][_0x3311ec('0x12')][_0x3311ec('0x8a')];},Window_MenuCommand['prototype'][_0x57a2c2('0x94')]=function(_0x50ca29){const _0x57c68c=_0x57a2c2,_0x220ef1=this[_0x57c68c('0xcb')](_0x50ca29);if(_0x220ef1==='iconText')this[_0x57c68c('0x7a')](_0x50ca29);else _0x220ef1===_0x57c68c('0x3a')?this[_0x57c68c('0x1a')](_0x50ca29):Window_Command[_0x57c68c('0x61')][_0x57c68c('0x94')]['call'](this,_0x50ca29);},Window_MenuCommand['prototype'][_0x57a2c2('0xc6')]=function(){const _0x268c5c=_0x57a2c2;return VisuMZ[_0x268c5c('0x126')][_0x268c5c('0xd')][_0x268c5c('0x12')][_0x268c5c('0x162')];},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0xcb')]=function(_0x494a29){const _0x2550f0=_0x57a2c2,_0x465259=this['commandStyle']();if(_0x465259!==_0x2550f0('0xc2'))return _0x465259;else{const _0x2163e3=this[_0x2550f0('0x13b')](_0x494a29);if(_0x2163e3[_0x2550f0('0x10b')](/\\I\[(\d+)\]/i)){const _0x1e66f2=this['itemLineRect'](_0x494a29),_0xd3e787=this[_0x2550f0('0x6a')](_0x2163e3)[_0x2550f0('0xdb')];if(_0xd3e787<=_0x1e66f2['width']){if(_0x2550f0('0xd4')!==_0x2550f0('0xd4')){function _0x3e900a(){const _0x49949b=_0x2550f0,_0x538e6b=_0x25ad89[_0x49949b('0x5d')]();_0x558110[_0x49949b('0x24')](_0x538e6b)?_0x33a84f=_0xae837a[_0x49949b('0x83')](_0x538e6b):_0x4e196b[_0x49949b('0x30')](_0x538e6b);}}else return'iconText';}else return _0x2550f0('0x3a');}else{if('fKRoa'===_0x2550f0('0x6b')){function _0x16da77(){const _0x11eb3d=_0x2550f0;_0x440ba9=_0x338a93||_0x59022c[_0x11eb3d('0x144')],_0xd3f29f=_0x14ae3b||_0x9fadc6[_0x11eb3d('0x27')];const _0x24d504=_0x283048[_0x11eb3d('0x39')](),_0x415a36=_0x2a9c16[_0x11eb3d('0x5a')](),_0x4a6e5c=_0x5b9edd['loadCharacter'](_0x24d504),_0x2589b3=_0x531a11[_0x11eb3d('0x21')](_0x24d504),_0xcb2b88=_0x4a6e5c[_0x11eb3d('0xdb')]/(_0x2589b3?0x3:0xc),_0x47823b=_0x4a6e5c[_0x11eb3d('0x89')]/(_0x2589b3?0x4:0x8),_0x3770bd=_0x216c33,_0x2ae278=_0x148e86-0x2,_0xd4987f=_0x317e04+_0x2cae38['floor'](_0x3770bd/0x2),_0x58b51c=_0x20f5c5+_0x48b62e[_0x11eb3d('0x57')]((_0x390c8b+_0x47823b)/0x2);this[_0x11eb3d('0xc5')]===_0x222a87&&this[_0x11eb3d('0x96')](_0x53f8cf[_0x11eb3d('0xa7')]());const _0x4ebb80=_0x1b3956[_0x11eb3d('0x20')](_0x3131b6,_0xcb2b88),_0x2decbc=_0x38ea7a[_0x11eb3d('0x20')](_0x26ab6b,_0x47823b),_0x83a843=_0x54d171[_0x11eb3d('0x115')](_0x3e2ffe+_0x49b5cb[_0x11eb3d('0xdd')](_0x3e904a-_0xcb2b88,0x0)/0x2),_0x41fd71=_0x25b9c0[_0x11eb3d('0x115')](_0x2b6b03+_0x4b0c15[_0x11eb3d('0xdd')](_0x145bce-_0x47823b,0x0)/0x2),_0x5e1901=_0x2589b3?0x0:_0x415a36,_0x2e8447=(_0x5e1901%0x4*0x3+0x1)*_0xcb2b88,_0x378194=_0x50cc28[_0x11eb3d('0x115')](_0x5e1901/0x4)*0x4*_0x47823b;this['contents'][_0x11eb3d('0xdf')](_0x4a6e5c,_0x2e8447,_0x378194,_0x4ebb80,_0x2decbc,_0x83a843,_0x41fd71),this[_0x11eb3d('0x96')](!![]);}}else return'text';}}},Window_MenuCommand[_0x57a2c2('0x61')]['drawItemStyleIconText']=function(_0x523463){const _0x2f9e0b=_0x57a2c2,_0x15b4f6=this[_0x2f9e0b('0xba')](_0x523463),_0x3a4734=this[_0x2f9e0b('0x13b')](_0x523463),_0x339f15=this[_0x2f9e0b('0x6a')](_0x3a4734)[_0x2f9e0b('0xdb')];this['changePaintOpacity'](this[_0x2f9e0b('0x71')](_0x523463));let _0x2128ea=this[_0x2f9e0b('0x108')]();if(_0x2128ea===_0x2f9e0b('0x7c'))this[_0x2f9e0b('0x16e')](_0x3a4734,_0x15b4f6['x']+_0x15b4f6['width']-_0x339f15,_0x15b4f6['y'],_0x339f15);else{if(_0x2128ea==='center'){const _0xc16380=_0x15b4f6['x']+Math[_0x2f9e0b('0x115')]((_0x15b4f6[_0x2f9e0b('0xdb')]-_0x339f15)/0x2);this[_0x2f9e0b('0x16e')](_0x3a4734,_0xc16380,_0x15b4f6['y'],_0x339f15);}else this[_0x2f9e0b('0x16e')](_0x3a4734,_0x15b4f6['x'],_0x15b4f6['y'],_0x339f15);}},Window_MenuCommand[_0x57a2c2('0x61')][_0x57a2c2('0x1a')]=function(_0xedfb86){const _0x5e1bb0=_0x57a2c2;this['commandName'](_0xedfb86)[_0x5e1bb0('0x10b')](/\\I\[(\d+)\]/i);const _0x48d6ed=Number(RegExp['$1']),_0x7075f6=this[_0x5e1bb0('0xba')](_0xedfb86),_0x2030b9=_0x7075f6['x']+Math[_0x5e1bb0('0x115')]((_0x7075f6[_0x5e1bb0('0xdb')]-ImageManager[_0x5e1bb0('0x6')])/0x2),_0x423754=_0x7075f6['y']+(_0x7075f6['height']-ImageManager[_0x5e1bb0('0x12b')])/0x2;this[_0x5e1bb0('0x8b')](_0x48d6ed,_0x2030b9,_0x423754);},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0xde')]=Window_StatusBase[_0x57a2c2('0x61')][_0x57a2c2('0x11d')],Window_StatusBase[_0x57a2c2('0x61')][_0x57a2c2('0x11d')]=function(){const _0x5b38cb=_0x57a2c2;VisuMZ[_0x5b38cb('0x126')]['Window_StatusBase_loadFaceImages']['call'](this),this['loadOtherActorImages']();},Window_StatusBase[_0x57a2c2('0x61')][_0x57a2c2('0x156')]=function(){const _0x486b2d=_0x57a2c2;for(const _0x29f70e of $gameParty[_0x486b2d('0xbd')]()){if(!_0x29f70e)continue;_0x29f70e[_0x486b2d('0x39')]()&&ImageManager[_0x486b2d('0xd8')](_0x29f70e['characterName']());_0x29f70e[_0x486b2d('0xd6')]()&&ImageManager[_0x486b2d('0xc3')](_0x29f70e[_0x486b2d('0xd6')]());if(_0x29f70e[_0x486b2d('0x9c')]()){if(_0x486b2d('0x53')===_0x486b2d('0x53'))ImageManager[_0x486b2d('0x17')](_0x29f70e[_0x486b2d('0x9c')]());else{function _0x41014e(){const _0x1d62f6=_0x486b2d;_0x23fe94[_0x1d62f6('0xc3')](_0x16c133[_0x1d62f6('0xd6')]());}}}}},Window_StatusBase[_0x57a2c2('0x61')][_0x57a2c2('0x9e')]=function(){const _0x4e83ae=_0x57a2c2;return VisuMZ[_0x4e83ae('0x126')]['Settings']['StatusGraphic'];},Window_StatusBase[_0x57a2c2('0x61')][_0x57a2c2('0x5')]=function(_0x110f74,_0x3eaca0,_0x1968fe,_0x895e9a,_0x11c509){const _0x2a9a6a=_0x57a2c2;_0x895e9a=_0x895e9a||ImageManager[_0x2a9a6a('0x144')],_0x11c509=_0x11c509||ImageManager['faceHeight'];const _0x1cbb1a=ImageManager['faceWidth'],_0x3ef057=_0x11c509-0x2,_0x29a969=_0x3eaca0+Math[_0x2a9a6a('0x115')]((_0x895e9a-_0x1cbb1a)/0x2);if(this[_0x2a9a6a('0xc5')]===Window_MenuStatus){if(_0x2a9a6a('0xa0')!==_0x2a9a6a('0xa0')){function _0x2609fd(){const _0x2772c1=_0x2a9a6a;return this[_0x2772c1('0xed')]();}}else this['changePaintOpacity'](_0x110f74['isBattleMember']());}this[_0x2a9a6a('0x97')](_0x110f74,_0x29a969,_0x1968fe,_0x1cbb1a,_0x3ef057),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x57a2c2('0x61')]['drawItemActorSprite']=function(_0x16dda4,_0x3bb8aa,_0x3945b5,_0x2126a2,_0x2c55ba){const _0x4151b9=_0x57a2c2;_0x2126a2=_0x2126a2||ImageManager[_0x4151b9('0x144')],_0x2c55ba=_0x2c55ba||ImageManager[_0x4151b9('0x27')];const _0x52b6ba=_0x16dda4[_0x4151b9('0x39')](),_0x3a2db7=_0x16dda4['characterIndex'](),_0x10b870=ImageManager[_0x4151b9('0xd8')](_0x52b6ba),_0x27a72c=ImageManager[_0x4151b9('0x21')](_0x52b6ba),_0x1b284a=_0x10b870[_0x4151b9('0xdb')]/(_0x27a72c?0x3:0xc),_0x2d5731=_0x10b870[_0x4151b9('0x89')]/(_0x27a72c?0x4:0x8),_0x927e55=_0x2126a2,_0x5ea0b9=_0x2c55ba-0x2,_0x4c6a73=_0x3bb8aa+Math[_0x4151b9('0x115')](_0x927e55/0x2),_0x378986=_0x3945b5+Math['ceil']((_0x2c55ba+_0x2d5731)/0x2);this['constructor']===Window_MenuStatus&&this[_0x4151b9('0x96')](_0x16dda4[_0x4151b9('0xa7')]());const _0x552df4=Math[_0x4151b9('0x20')](_0x2126a2,_0x1b284a),_0x5d7c4f=Math[_0x4151b9('0x20')](_0x2c55ba,_0x2d5731),_0x188530=Math['floor'](_0x3bb8aa+Math[_0x4151b9('0xdd')](_0x2126a2-_0x1b284a,0x0)/0x2),_0x6c7a2=Math[_0x4151b9('0x115')](_0x3945b5+Math[_0x4151b9('0xdd')](_0x2c55ba-_0x2d5731,0x0)/0x2),_0x39e0d6=_0x27a72c?0x0:_0x3a2db7,_0x5dfae7=(_0x39e0d6%0x4*0x3+0x1)*_0x1b284a,_0x5ac286=Math[_0x4151b9('0x115')](_0x39e0d6/0x4)*0x4*_0x2d5731;this[_0x4151b9('0xd1')][_0x4151b9('0xdf')](_0x10b870,_0x5dfae7,_0x5ac286,_0x552df4,_0x5d7c4f,_0x188530,_0x6c7a2),this[_0x4151b9('0x96')](!![]);},Window_StatusBase['prototype'][_0x57a2c2('0xcc')]=function(_0x288c15,_0x3804e4,_0xbb94d6,_0x1a6c8e,_0x1921b1){const _0x3b864a=_0x57a2c2;_0x1a6c8e=_0x1a6c8e||ImageManager[_0x3b864a('0x144')],_0x1921b1=_0x1921b1||ImageManager[_0x3b864a('0x27')];const _0x3112e0=ImageManager[_0x3b864a('0xc3')](_0x288c15[_0x3b864a('0xd6')]()),_0x5d23ea=_0x3112e0[_0x3b864a('0xdb')]/ImageManager['svActorHorzCells'],_0x31af08=_0x3112e0[_0x3b864a('0x89')]/ImageManager[_0x3b864a('0xab')],_0x4d833e=_0x1a6c8e,_0x343a73=_0x1921b1-0x2,_0x1f02af=_0x3804e4+Math[_0x3b864a('0x115')](_0x4d833e/0x2),_0x162637=_0xbb94d6+Math['ceil']((_0x1921b1+_0x31af08)/0x2);if(this['constructor']===Window_MenuStatus){if(_0x3b864a('0x3e')!==_0x3b864a('0x15'))this[_0x3b864a('0x96')](_0x288c15['isBattleMember']());else{function _0xf04487(){const _0x2ed8b1=_0x3b864a;for(const _0x10a778 of _0x5e99a7[_0x2ed8b1('0x138')]){const _0x5729a9=_0x10a778['Symbol'];if(_0x10a778['ShowJS'][_0x2ed8b1('0x31')](this)){let _0x4846d3=_0x10a778[_0x2ed8b1('0x104')];if(['',_0x2ed8b1('0x173')][_0x2ed8b1('0x7d')](_0x4846d3))_0x4846d3=_0x10a778['TextJS']['call'](this);const _0x378134=_0x10a778[_0x2ed8b1('0xfa')];_0x378134>0x0&&this[_0x2ed8b1('0xc6')]()!==_0x2ed8b1('0xce')&&(_0x4846d3=_0x2ed8b1('0xf6')[_0x2ed8b1('0xe1')](_0x378134,_0x4846d3));const _0x54285e=_0x10a778[_0x2ed8b1('0xbb')]['call'](this),_0x18be2b=_0x10a778[_0x2ed8b1('0xfe')]['call'](this);this[_0x2ed8b1('0x3c')](_0x4846d3,_0x5729a9,_0x54285e,_0x18be2b),this[_0x2ed8b1('0x15e')](_0x5729a9,_0x10a778['CallHandlerJS'][_0x2ed8b1('0x129')](this,_0x18be2b));}this[_0x2ed8b1('0x16a')](_0x5729a9);}}}}const _0x35be2b=Math[_0x3b864a('0x20')](_0x1a6c8e,_0x5d23ea),_0x2c7467=Math['min'](_0x1921b1,_0x31af08),_0xf109fb=Math['floor'](_0x3804e4+Math[_0x3b864a('0xdd')](_0x1a6c8e-_0x5d23ea,0x0)/0x2),_0x14f15d=Math[_0x3b864a('0x115')](_0xbb94d6+Math[_0x3b864a('0xdd')](_0x1921b1-_0x31af08,0x0)/0x2),_0x536b12=0x0,_0x5642bf=0x0;this['contents']['blt'](_0x3112e0,_0x536b12,_0x5642bf,_0x35be2b,_0x2c7467,_0xf109fb,_0x14f15d),this[_0x3b864a('0x96')](!![]);},Window_StatusBase[_0x57a2c2('0x61')][_0x57a2c2('0x0')]=function(_0x5d24ac,_0x35318a,_0x27e71f,_0x2bdc3d,_0x58813d){const _0x418035=_0x57a2c2,_0x2062b0=ImageManager[_0x418035('0x17')](_0x5d24ac['getMenuImage']());_0x2bdc3d=(_0x2bdc3d||ImageManager[_0x418035('0x144')])-0x2,_0x58813d=(_0x58813d||ImageManager['faceHeight'])-0x2;const _0x2fb6fc=_0x2062b0[_0x418035('0xdb')],_0x200e37=_0x2062b0[_0x418035('0x89')],_0x4a9e85=_0x2bdc3d,_0x324b39=_0x58813d-0x2,_0x410641=_0x35318a+Math[_0x418035('0x115')](_0x4a9e85/0x2),_0x2e4710=_0x27e71f+Math[_0x418035('0x57')]((_0x58813d+_0x200e37)/0x2);this['constructor']===Window_MenuStatus&&this['changePaintOpacity'](_0x5d24ac['isBattleMember']());const _0x7d794d=Math[_0x418035('0x20')](_0x2bdc3d,_0x2fb6fc),_0x35a7a2=Math[_0x418035('0x20')](_0x58813d,_0x200e37),_0x207aea=_0x35318a+0x1,_0x5f478a=Math[_0x418035('0xdd')](_0x27e71f+0x1,_0x27e71f+_0x324b39-_0x200e37+0x3),_0x5ee5ac=(_0x2fb6fc-_0x7d794d)/0x2,_0x242c32=(_0x200e37-_0x35a7a2)/0x2;this[_0x418035('0xd1')][_0x418035('0xdf')](_0x2062b0,_0x5ee5ac,_0x242c32,_0x7d794d,_0x35a7a2,_0x207aea,_0x5f478a),this[_0x418035('0x96')](!![]);},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0x4f')]=Window_MenuStatus['prototype'][_0x57a2c2('0x11b')],Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x11b')]=function(){const _0x42117c=_0x57a2c2;VisuMZ[_0x42117c('0x126')]['Settings'][_0x42117c('0x13c')][_0x42117c('0x8d')]?VisuMZ['MainMenuCore'][_0x42117c('0x4f')][_0x42117c('0x31')](this):this['smoothSelect'](0x0);},VisuMZ['MainMenuCore'][_0x57a2c2('0xa6')]=Window_MenuStatus['prototype'][_0x57a2c2('0x23')],Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x23')]=function(){const _0x199329=_0x57a2c2;return this['showOnlyBattleMembers']()?$gameParty[_0x199329('0xda')]()[_0x199329('0x139')]:VisuMZ['MainMenuCore'][_0x199329('0xa6')][_0x199329('0x31')](this);},Window_MenuStatus['prototype']['showOnlyBattleMembers']=function(){const _0x2206ae=_0x57a2c2,_0x43e524=VisuMZ[_0x2206ae('0x126')][_0x2206ae('0xd')][_0x2206ae('0x13c')];if(_0x43e524['ShowReserve']===undefined)_0x43e524[_0x2206ae('0x67')]=!![];const _0x24bb4c=SceneManager[_0x2206ae('0x113')];if(!_0x43e524[_0x2206ae('0x67')]){if(_0x2206ae('0x143')===_0x2206ae('0x143')){if(_0x43e524[_0x2206ae('0x161')])return _0x24bb4c[_0x2206ae('0xc5')]===Scene_Menu;return!![];}else{function _0x1a0bd7(){const _0x15c0d7=_0x2206ae;_0x172eef[_0x15c0d7('0x126')][_0x15c0d7('0xd')][_0x15c0d7('0x73')][_0x15c0d7('0x49')]['call'](this,_0x344bf6,_0x2b1981);}}}return![];},Window_MenuStatus['prototype'][_0x57a2c2('0xd3')]=function(){const _0x13767b=_0x57a2c2,_0x368ab2=SceneManager[_0x13767b('0x113')][_0x13767b('0xc5')];return _0x368ab2===Scene_Menu?VisuMZ[_0x13767b('0x126')][_0x13767b('0xd')]['StatusListStyle']:VisuMZ[_0x13767b('0x126')][_0x13767b('0xd')][_0x13767b('0xfc')];},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0xfd')]=function(){const _0x2cc8d1=_0x57a2c2,_0x4120b1=this[_0x2cc8d1('0xd3')]();switch(_0x4120b1){case _0x2cc8d1('0x170'):case'portrait':return 0x1;case _0x2cc8d1('0x111'):return 0x1;default:return $gameParty[_0x2cc8d1('0x6e')]();}},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x77')]=function(){const _0x4c730b=_0x57a2c2,_0x2b560d=this[_0x4c730b('0xd3')]();switch(_0x2b560d){case _0x4c730b('0x170'):case _0x4c730b('0x11f'):return $gameParty['maxBattleMembers']();default:return 0x1;}},VisuMZ[_0x57a2c2('0x126')][_0x57a2c2('0xe2')]=Window_MenuStatus[_0x57a2c2('0x61')]['itemHeight'],Window_MenuStatus['prototype']['itemHeight']=function(){const _0x276250=_0x57a2c2,_0x5a072e=this[_0x276250('0xd3')]();switch(_0x5a072e){case _0x276250('0x170'):case'portrait':case _0x276250('0x111'):return this[_0x276250('0x2b')];case _0x276250('0x10c'):return Window_Selectable[_0x276250('0x61')][_0x276250('0x15f')]['call'](this);case'thicker':return this[_0x276250('0x11e')]()*0x2+0x8;default:return VisuMZ[_0x276250('0x126')]['Window_MenuStatus_itemHeight']['call'](this);}},Window_MenuStatus[_0x57a2c2('0x61')]['drawItem']=function(_0x3ab135){const _0x2ec816=_0x57a2c2;this[_0x2ec816('0x42')](_0x3ab135),this['drawItemStatus'](_0x3ab135);},VisuMZ[_0x57a2c2('0x126')]['Window_MenuStatus_drawItemImage']=Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x72')],Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x50')]=function(_0xc6e1f0,_0x20e98e,_0x4d1c26,_0xa2050e,_0x2ae901){const _0x4bd6fd=_0x57a2c2;switch(this['graphicType']()){case'none':break;case _0x4bd6fd('0x109'):this['drawItemActorSprite'](_0xc6e1f0,_0x20e98e,_0x4d1c26+0x1,_0xa2050e,_0x2ae901-0x2);break;case'svbattler':this[_0x4bd6fd('0xcc')](_0xc6e1f0,_0x20e98e,_0x4d1c26+0x1,_0xa2050e,_0x2ae901-0x2);break;default:this[_0x4bd6fd('0x5')](_0xc6e1f0,_0x20e98e,_0x4d1c26,_0xa2050e,_0x2ae901);break;}},Window_MenuStatus['prototype'][_0x57a2c2('0x15c')]=function(_0x37c4b6){const _0x4da0a6=_0x57a2c2;this[_0x4da0a6('0xe6')]();const _0x1cfe61=this[_0x4da0a6('0x79')](_0x37c4b6),_0x4ae535=this[_0x4da0a6('0xb8')](_0x37c4b6),_0x176d5a=this[_0x4da0a6('0xd3')]();switch(_0x176d5a){case _0x4da0a6('0x170'):this[_0x4da0a6('0x5f')](_0x1cfe61,_0x4ae535);break;case _0x4da0a6('0x11f'):this['drawItemStatusPortraitStyle'](_0x1cfe61,_0x4ae535);break;case _0x4da0a6('0x111'):this[_0x4da0a6('0xd7')](_0x1cfe61,_0x4ae535);break;case'thin':this[_0x4da0a6('0x1c')](_0x1cfe61,_0x4ae535);break;case _0x4da0a6('0xc4'):this[_0x4da0a6('0x145')](_0x1cfe61,_0x4ae535);break;default:this[_0x4da0a6('0x84')](_0x1cfe61,_0x4ae535);break;}},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x5f')]=function(_0x417bbb,_0x4cb1fe){const _0xfe6b4b=_0x57a2c2;VisuMZ[_0xfe6b4b('0x126')][_0xfe6b4b('0xd')][_0xfe6b4b('0x73')][_0xfe6b4b('0x150')]['call'](this,_0x417bbb,_0x4cb1fe);},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x165')]=function(_0x56339d,_0x106365){const _0x81ffe5=_0x57a2c2;if(_0x56339d[_0x81ffe5('0x9c')]()!==''){if(_0x81ffe5('0x157')===_0x81ffe5('0x178')){function _0x56d142(){const _0x3312d5=_0x81ffe5;_0x28eefb[_0x3312d5('0x132')](_0x4dee50[_0x3312d5('0xbd')]()[0x0]),this[_0x3312d5('0x13')]();}}else{const _0x37fbeb=ImageManager[_0x81ffe5('0x17')](_0x56339d['getMenuImage']());_0x37fbeb[_0x81ffe5('0xa5')](this[_0x81ffe5('0xe0')][_0x81ffe5('0x129')](this,_0x56339d,_0x106365));}}else this[_0x81ffe5('0x5f')](_0x56339d,_0x106365);},Window_MenuStatus['prototype'][_0x57a2c2('0xe0')]=function(_0x4da7b7,_0x2a926b){const _0xefa8b=_0x57a2c2;VisuMZ[_0xefa8b('0x126')][_0xefa8b('0xd')]['ListStyles'][_0xefa8b('0x49')][_0xefa8b('0x31')](this,_0x4da7b7,_0x2a926b);},Window_MenuStatus[_0x57a2c2('0x61')]['drawItemStatusSoloStyle']=function(_0x31447c,_0x9d7d4b){const _0x2dd093=_0x57a2c2,_0x4ce3d1=ImageManager[_0x2dd093('0x17')](_0x31447c[_0x2dd093('0x9c')]());_0x4ce3d1[_0x2dd093('0xa5')](this[_0x2dd093('0x167')][_0x2dd093('0x129')](this,_0x31447c,_0x9d7d4b));},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x167')]=function(_0x1bd37d,_0x272526){const _0x50ae51=_0x57a2c2;VisuMZ[_0x50ae51('0x126')][_0x50ae51('0xd')][_0x50ae51('0x73')]['SoloStyle'][_0x50ae51('0x31')](this,_0x1bd37d,_0x272526);},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x1c')]=function(_0xa84753,_0x6d347e){const _0x5c5708=_0x57a2c2;VisuMZ[_0x5c5708('0x126')][_0x5c5708('0xd')]['ListStyles'][_0x5c5708('0x74')][_0x5c5708('0x31')](this,_0xa84753,_0x6d347e);},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x145')]=function(_0x23aef4,_0x19f327){const _0x3ef4ea=_0x57a2c2;VisuMZ[_0x3ef4ea('0x126')]['Settings'][_0x3ef4ea('0x73')]['ThickerStyle']['call'](this,_0x23aef4,_0x19f327);},Window_MenuStatus[_0x57a2c2('0x61')][_0x57a2c2('0x76')]=function(){const _0x17cd97=_0x57a2c2,_0xf0584b=this[_0x17cd97('0xd3')]();if([_0x17cd97('0x10c'),_0x17cd97('0xc4')][_0x17cd97('0x7d')](_0xf0584b))return![];return Window_StatusBase['prototype'][_0x17cd97('0x76')][_0x17cd97('0x31')](this);},Window_MenuStatus['prototype'][_0x57a2c2('0x84')]=function(_0x6d39ee,_0x1b97ea){const _0x5ca33e=_0x57a2c2;VisuMZ['MainMenuCore']['Settings'][_0x5ca33e('0x73')][_0x5ca33e('0x1f')][_0x5ca33e('0x31')](this,_0x6d39ee,_0x1b97ea);},Window_SkillStatus[_0x57a2c2('0x61')][_0x57a2c2('0x97')]=function(_0x3f11ec,_0x92f9db,_0x26805e,_0xdb41fb,_0x3cf384){const _0x380ba3=_0x57a2c2;switch(this[_0x380ba3('0x9e')]()){case'none':break;case _0x380ba3('0x109'):this[_0x380ba3('0xa4')](_0x3f11ec,_0x92f9db,_0x26805e,_0xdb41fb,_0x3cf384);break;case _0x380ba3('0xe5'):this['drawItemActorSvBattler'](_0x3f11ec,_0x92f9db,_0x26805e,_0xdb41fb,_0x3cf384);break;default:Window_StatusBase[_0x380ba3('0x61')][_0x380ba3('0x97')]['call'](this,_0x3f11ec,_0x92f9db,_0x26805e,_0xdb41fb,_0x3cf384);break;}},Window_EquipStatus['prototype'][_0x57a2c2('0x97')]=function(_0x2f37b9,_0x5ac50f,_0x2065b3,_0x43e476,_0x5ae58f){const _0x1af80d=_0x57a2c2;switch(this[_0x1af80d('0x9e')]()){case _0x1af80d('0x98'):break;case _0x1af80d('0x109'):this[_0x1af80d('0xa4')](_0x2f37b9,_0x5ac50f,_0x2065b3,_0x43e476,_0x5ae58f);break;case'svbattler':this[_0x1af80d('0xcc')](_0x2f37b9,_0x5ac50f,_0x2065b3,_0x43e476,_0x5ae58f);break;default:Window_StatusBase[_0x1af80d('0x61')]['drawActorFace'][_0x1af80d('0x31')](this,_0x2f37b9,_0x5ac50f,_0x2065b3,_0x43e476,_0x5ae58f);break;}};function Window_ThinGold(){const _0x505db9=_0x57a2c2;this[_0x505db9('0x5b')](...arguments);}Window_ThinGold[_0x57a2c2('0x61')]=Object['create'](Window_Gold[_0x57a2c2('0x61')]),Window_ThinGold['prototype']['constructor']=Window_ThinGold,Window_ThinGold[_0x57a2c2('0x61')][_0x57a2c2('0x15f')]=function(){const _0xde7483=_0x57a2c2;return this[_0xde7483('0x11e')]();},Window_ThinGold[_0x57a2c2('0x61')][_0x57a2c2('0x142')]=function(){const _0xc8ffd9=_0x57a2c2;return Window_Selectable[_0xc8ffd9('0x61')][_0xc8ffd9('0x142')]['call'](this);};function Window_Playtime(){this['initialize'](...arguments);}Window_Playtime[_0x57a2c2('0x61')]=Object[_0x57a2c2('0x123')](Window_Selectable['prototype']),Window_Playtime[_0x57a2c2('0x61')]['constructor']=Window_Playtime,Window_Playtime['prototype']['initialize']=function(_0x36cbcd){const _0x4acf4d=_0x57a2c2;this[_0x4acf4d('0xb1')]=$gameSystem[_0x4acf4d('0x16c')](),this['_timer']=0x3c,Window_Selectable[_0x4acf4d('0x61')][_0x4acf4d('0x5b')][_0x4acf4d('0x31')](this,_0x36cbcd),this[_0x4acf4d('0xf8')]();},Window_Playtime[_0x57a2c2('0x61')][_0x57a2c2('0x15f')]=function(){const _0x5a497c=_0x57a2c2;return this[_0x5a497c('0x11e')]();},Window_Playtime['prototype'][_0x57a2c2('0x151')]=function(){const _0x3d1a6c=_0x57a2c2;Window_Selectable[_0x3d1a6c('0x61')]['update'][_0x3d1a6c('0x31')](this),this[_0x3d1a6c('0x9')]();},Window_Playtime[_0x57a2c2('0x61')][_0x57a2c2('0x9')]=function(){const _0x3a9758=_0x57a2c2;if(this[_0x3a9758('0x15a')]-->0x0){if(this[_0x3a9758('0x15a')]<=0x0)this[_0x3a9758('0xf8')]();}},Window_Playtime['prototype']['refresh']=function(){const _0x3622ed=_0x57a2c2;this['_timer']=0x3c;const _0x52ac73=this[_0x3622ed('0xba')](0x0),_0x45f3ca=_0x52ac73['x'],_0x89c63d=_0x52ac73['y'],_0x46ce16=_0x52ac73[_0x3622ed('0xdb')];this[_0x3622ed('0xd1')][_0x3622ed('0x59')](),this[_0x3622ed('0x78')](_0x52ac73),this[_0x3622ed('0xc9')](_0x52ac73),this[_0x3622ed('0xb4')](_0x52ac73);},Window_Playtime['prototype'][_0x57a2c2('0xe6')]=function(){const _0x525e5e=_0x57a2c2;Window_Selectable[_0x525e5e('0x61')][_0x525e5e('0xe6')][_0x525e5e('0x31')](this),this[_0x525e5e('0xd1')][_0x525e5e('0x133')]=VisuMZ['MainMenuCore'][_0x525e5e('0xd')][_0x525e5e('0x14d')][_0x525e5e('0x9b')];},Window_Playtime['prototype']['drawTimeIcon']=function(_0x4fd1e5){const _0x3a924e=_0x57a2c2;if(VisuMZ['MainMenuCore']['Settings'][_0x3a924e('0x14d')][_0x3a924e('0xfa')]>0x0){const _0x49f606=VisuMZ[_0x3a924e('0x126')][_0x3a924e('0xd')]['Playtime'][_0x3a924e('0xfa')],_0x2e136a=_0x4fd1e5['y']+(this['lineHeight']()-ImageManager[_0x3a924e('0x12b')])/0x2;this[_0x3a924e('0x8b')](_0x49f606,_0x4fd1e5['x'],_0x2e136a);const _0x4ee0f3=ImageManager[_0x3a924e('0x6')]+0x4;_0x4fd1e5['x']+=_0x4ee0f3,_0x4fd1e5[_0x3a924e('0xdb')]-=_0x4ee0f3;}},Window_Playtime[_0x57a2c2('0x61')][_0x57a2c2('0xc9')]=function(_0x1010f2){const _0x2c50a5=_0x57a2c2;this['resetFontSettings'](),this[_0x2c50a5('0x3d')](ColorManager[_0x2c50a5('0x95')]());const _0x302a5e=VisuMZ[_0x2c50a5('0x126')][_0x2c50a5('0xd')][_0x2c50a5('0x14d')][_0x2c50a5('0x12d')];this['drawText'](_0x302a5e,_0x1010f2['x'],_0x1010f2['y'],_0x1010f2['width'],_0x2c50a5('0x8c')),this[_0x2c50a5('0x2')]();},Window_Playtime['prototype'][_0x57a2c2('0xb4')]=function(_0x2a3d55){const _0x2931d9=_0x57a2c2,_0x23d975=$gameSystem[_0x2931d9('0x16c')]();this[_0x2931d9('0x122')](_0x23d975,_0x2a3d55['x'],_0x2a3d55['y'],_0x2a3d55[_0x2931d9('0xdb')],_0x2931d9('0x7c'));};function Window_MenuVariables(){const _0x3242e9=_0x57a2c2;this[_0x3242e9('0x5b')](...arguments);}Window_MenuVariables[_0x57a2c2('0x61')]=Object[_0x57a2c2('0x123')](Window_Selectable[_0x57a2c2('0x61')]),Window_MenuVariables[_0x57a2c2('0x61')][_0x57a2c2('0xc5')]=Window_MenuVariables,Window_MenuVariables[_0x57a2c2('0x61')]['initialize']=function(_0x220668){const _0x94076f=_0x57a2c2;Window_Selectable[_0x94076f('0x61')][_0x94076f('0x5b')][_0x94076f('0x31')](this,_0x220668),this[_0x94076f('0xa2')]=VisuMZ[_0x94076f('0x126')][_0x94076f('0xd')][_0x94076f('0x9f')][_0x94076f('0x2d')],this[_0x94076f('0xf8')]();},Window_MenuVariables[_0x57a2c2('0x61')][_0x57a2c2('0x15f')]=function(){const _0x5d82c7=_0x57a2c2;return this[_0x5d82c7('0x11e')]();},Window_MenuVariables[_0x57a2c2('0x61')]['maxCols']=function(){const _0x1cc7e1=_0x57a2c2,_0x10b374=SceneManager[_0x1cc7e1('0x113')][_0x1cc7e1('0x60')]();if(_0x10b374===_0x1cc7e1('0x65'))return 0x1;else{if(_0x1cc7e1('0x2f')!==_0x1cc7e1('0x68'))return VisuMZ[_0x1cc7e1('0x126')]['Settings'][_0x1cc7e1('0x9f')][_0x1cc7e1('0x2d')][_0x1cc7e1('0x139')];else{function _0x13c045(){const _0x2a7e88=_0x1cc7e1,_0x78d62f=this['mainCommandWidth'](),_0x184b0b=this['calcWindowHeight'](0x1,![]),_0x56c80f=0x0,_0x5a7973=this[_0x2a7e88('0x172')]();return new _0x11d3de(_0x56c80f,_0x5a7973,_0x78d62f,_0x184b0b);}}}},Window_MenuVariables[_0x57a2c2('0x61')][_0x57a2c2('0xe6')]=function(){const _0x38988d=_0x57a2c2;Window_Selectable['prototype'][_0x38988d('0xe6')][_0x38988d('0x31')](this),this[_0x38988d('0xd1')][_0x38988d('0x133')]=VisuMZ[_0x38988d('0x126')][_0x38988d('0xd')][_0x38988d('0x9f')][_0x38988d('0x9b')],this['changeTextColor'](ColorManager[_0x38988d('0x95')]());},Window_MenuVariables['prototype'][_0x57a2c2('0x23')]=function(){const _0x2d0864=_0x57a2c2;return this[_0x2d0864('0xa2')][_0x2d0864('0x139')];},Window_MenuVariables[_0x57a2c2('0x61')][_0x57a2c2('0x34')]=function(){const _0x566bc8=_0x57a2c2,_0x560168=this['topIndex']();for(let _0x41de67=0x0;_0x41de67<this[_0x566bc8('0xaa')]();_0x41de67++){if('qBhBq'!==_0x566bc8('0xe3')){const _0x1285e1=_0x560168+_0x41de67;if(_0x1285e1<this[_0x566bc8('0x23')]()){if(_0x566bc8('0x6d')!=='fVOgb')this[_0x566bc8('0x41')](_0x1285e1),this['drawItem'](_0x1285e1);else{function _0x4a3fb5(){const _0x50558c=_0x566bc8;this[_0x50558c('0x13b')](_0x3c3351)[_0x50558c('0x10b')](/\\I\[(\d+)\]/i);const _0x10480d=_0x227367(_0x3da1e3['$1']),_0x302fda=this['itemLineRect'](_0x3d17f8),_0x32ea2c=_0x302fda['x']+_0x5f8cf1['floor']((_0x302fda['width']-_0x40425e['iconWidth'])/0x2),_0x511072=_0x302fda['y']+(_0x302fda[_0x50558c('0x89')]-_0x5e289a[_0x50558c('0x12b')])/0x2;this[_0x50558c('0x8b')](_0x10480d,_0x32ea2c,_0x511072);}}}}else{function _0x1804c7(){return this['commandWindowRectThinTopStyle']();}}}},Window_MenuVariables['prototype']['drawItemBackground']=function(_0xa53acb){},Window_MenuVariables[_0x57a2c2('0x61')][_0x57a2c2('0x94')]=function(_0x7ec7a3){const _0x2516c8=_0x57a2c2,_0x263f87=this['_data'][_0x7ec7a3];if(_0x263f87<=0x0)return;if(!$dataSystem[_0x2516c8('0xb')][_0x263f87])return;const _0x97acee=this['itemLineRect'](_0x7ec7a3);this['resetFontSettings']();let _0x24f801=0x0,_0x2ec0df=$dataSystem[_0x2516c8('0xb')][_0x263f87][_0x2516c8('0xcd')]();_0x2ec0df['match'](/\\I\[(\d+)\]/i)&&(_0x24f801=Number(RegExp['$1']),_0x2ec0df=_0x2ec0df[_0x2516c8('0x99')](/\\I\[(\d+)\]/i,'')[_0x2516c8('0xcd')]());if(_0x24f801>0x0){const _0x4203b7=_0x97acee['y']+(this['lineHeight']()-ImageManager[_0x2516c8('0x12b')])/0x2;this[_0x2516c8('0x8b')](_0x24f801,_0x97acee['x'],_0x4203b7);const _0x3ed413=ImageManager[_0x2516c8('0x6')]+0x4;_0x97acee['x']+=_0x3ed413,_0x97acee[_0x2516c8('0xdb')]-=_0x3ed413;}this[_0x2516c8('0x122')](_0x2ec0df,_0x97acee['x'],_0x97acee['y'],_0x97acee[_0x2516c8('0xdb')],'left'),this[_0x2516c8('0x3d')](ColorManager['normalColor']()),this[_0x2516c8('0x122')]($gameVariables[_0x2516c8('0x46')](_0x263f87),_0x97acee['x'],_0x97acee['y'],_0x97acee[_0x2516c8('0xdb')],'right');};