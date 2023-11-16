/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/achievements/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Creates a powerful achievement system
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
 * Made for RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Description: Adds an achievements system including achievement points,
 * secret achievements, difficulty, and more. Achievements offer automatic
 * tracking as well as manual unlocking. Achievements can also have rewards
 * such as items or gold, or even switches/variables. This plugin works well
 * with CGMZ Toast Manager for pop ups when an achievement is earned. This
 * plugin also allows for achievements based off of CGMZ Encyclopedia and
 * Bestiary completion percentage.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -------------------------Plugin Commands------------------------------------
 * This plugin supports the following plugin commands:
 * 
 * • Earn Achievement by Name
 * This earns the achievement with the name provided, case sensitive
 *
 * • Earn Achievement by ID
 * This earns the achievement with the provided ID. IDs are the order the
 * achievements are listed in the plugin manager and start at 1.
 *
 * • Call Scene
 * This calls the achievement scene.
 *
 * • Change Description
 * This will let you change the pre and post description of an achievement
 *
 * • Change Secret
 * This will let you change the secret property of an achievement
 *
 * • Reinitialize
 * This will reset all achievement progress as if you had started a new game.
 * ---------------------------JavaScript---------------------------------------
 * To call the achievement scene via JavaScript command, use:
 * SceneManager.push(CGMZ_Scene_Achievements);
 * ---------------------------Integrations-------------------------------------
 * CGMZ Toast Manager
 * This plugin has additional functionality when using CGMZ Toast Manager.
 * CGMZ Toast allows for the display of a pop-up window on the map screen when
 * an achievement is earned. Settings for this can be found under the popup
 * settings for an achievement.
 *
 * CGMZ Encyclopedia
 * This plugin has additional functionality when using CGMZ Encyclopedia.
 * CGMZ Encyclopedia can be used for achievements, such as "Discover the
 * entire encyclopedia"
 *
 * CGMZ Professions
 * This plugin has additional functionality when using CGMZ Professions.
 * CGMZ Professions can be used to create achievements such as "Attain level 5
 * in the Mining profession"
 * ---------------------------Date Formats-------------------------------------
 * The following numbers correspond to the following date formats:
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 * -----------------------------Colors-----------------------------------------
 * If using CGMZ Infinite Colors, you will not be able to select the custom
 * colors via the plugin parameters. In this case, please switch to the text
 * input at the top of the parameter and manually type the color index number.
 * ---------------------------Saved Games--------------------------------------
 * This plugin partially supports saved games.
 * ✓ You can add new achievements and a saved game should recognize them.
 * ✘ Modifying existing achievements is not supported in saved games.
 * ✘ Deleting achievements is not supported in saved games.
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_Achievements.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0 - Initial Release
 *
 * Version 1.1.0:
 * - Fixed crash if there are no achievements
 * - Added support for CGMZ Professions
 *
 * Version 1.1.1:
 * - Fixed bug with variable tracking when using the "=" operator
 *
 * Version 1.2.0:
 * - Added ability to use text codes in achievement descriptions
 * - New achievements should now be automatically recognized by saved games
 * - Added ability to change pre and post descriptions
 * - Added option to change the label / header text color
 * - Added option to change text alignment of list window
 * - Added option to change text alignment of totals window
 * - Fixed bug with toast audio on achievement earn
 * - Fixed bug with padding on list window
 * - Removed plugin command to manually recognize new achievements in saved
 *   game
 *
 * Version 1.2.1:
 * - Fixed crash when not using CGMZ Encyclopedia
 *
 * Version 1.2.2:
 * - Fixed bug with variable achievements not auto completing when they should
 *
 * Version 1.2.3:
 * - Fixed crash with achievements that had switch/variable rewards
 *
 * Version 1.2.4:
 * - Compatibility for VS plugins
 *
 * Version 1.3.0:
 * - Added ability to choose which order & info to display for achievements
 * - Added param for Points text in total window (separate from Display window)
 * - Added param to display total achievements possible in total window
 * - Added param to display total points possible in total window
 * - Added text params for achievement requirement text (on progress bar)
 * - Documentation Updated
 *
 * Version 1.4.0:
 * - Added categories of achievements
 * - Added plugin command to change an achievement's secret property
 * - Added param for transparent windows in achievement scene
 * - Added param to use a custom background image in achievement scene
 * - Updated color parameters to use the new color selector for plugins
 *
 * @command Earn Achievement By Name
 * @desc Earns an achievement by its name
 *
 * @arg name
 * @type text
 * @text Achievement Name
 * @desc The name of the achievement to earn
 * @default
 *
 * @command Earn Achievement By ID
 * @desc Earns an achievement by its id
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to earn.
 * @default 0
 *
 * @command Call Scene
 * @desc Calls the Achievement Scene
 *
 * @command Change Description
 * @desc Chbanges the pre or post description of an achievement
 *
 * @arg name
 * @type text
 * @text Achievement Name
 * @desc The name of the achievement to change description. Leave blank if using ID.
 * @default
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to change description. Not used if using name instead.
 * @default 0
 *
 * @arg Pre Description
 * @type note
 * @default ""
 * @desc Achievement description before it is earned. Leave blank for no change
 *
 * @arg Post Description
 * @type note
 * @default ""
 * @desc Achievement description after it is earned. Leave blank for no change
 *
 * @command Change Secret
 * @desc Change an achievement secret property
 *
 * @arg name
 * @type text
 * @text Achievement Name
 * @desc The name of the achievement to change description. Leave blank if using ID.
 * @default
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to change. Not used if using name instead
 * @default 0
 *
 * @arg secret
 * @type boolean
 * @desc Whether the achievement will now be secret or not
 * @default false
 *
 * @command Reinitialize
 * @desc Resets all of the achievement data. Use for saved games to recognize changed data
 *
 * @param CGMZ Achievements
 *
 * @param Achievements
 * @parent CGMZ Achievements
 * @type struct<Achievement>[]
 * @default []
 * @desc Achievements
 *
 * @param Categories
 * @parent CGMZ Achievements
 * @type struct<Category>[]
 * @default []
 * @desc Achievement Categories
 *
 * @param Requires CGMZ Toast Plugin
 * 
 * @param ShowAchievementPop
 * @parent Requires CGMZ Toast Plugin
 * @type boolean
 * @desc Determines whether a pop window is shown when achievement is earned.
 * @default false
 *
 * @param AchievementEarnedText
 * @parent Requires CGMZ Toast Plugin
 * @desc Text to show on first line of achievement pop window
 * @default Achievement Earned
 *
 * @param AchievementEarnedColor
 * @parent Requires CGMZ Toast Plugin
 * @type color
 * @desc Color for text on the first line of achievement pop window. Uses windowskin colors. Range: 0-31
 * @default 3
 *
 * @param AchievementEarnedAlignment
 * @parent Requires CGMZ Toast Plugin
 * @desc Alignment for pop text. Valid values: left, right, center
 * @default center
 *
 * @param AchievementEarnedSound
 * @parent Requires CGMZ Toast Plugin
 * @type file
 * @dir audio/se/
 * @desc Default sound to play when achievement pop-up window pops
 * @default Applause1
 *
 * @param Achievement Scene Options
 *
 * @param Achievement Display Info
 * @parent Achievement Scene Options
 * @type select[]
 * @option Name
 * @option Earn Date
 * @option Difficulty
 * @option Points
 * @option Description
 * @option Requirements
 * @option Rewards
 * @option Basic Info Header
 * @option Description Header
 * @option Requirement Header
 * @option Reward Header
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Name","Earn Date","Difficulty","Points","Description","Requirements","Rewards"]
 *
 * @param ShowSecretAchievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine whether secret achievements are displayed in the achievement scene
 * @default false
 *
 * @param SecretText
 * @parent Achievement Scene Options
 * @desc Text to show as achievement name if secret achievement is displayed in scene
 * @default ??????
 *
 * @param ShowCriteriaAfterCompletion
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true = still show criteria, false = stop showing criteria after completion.
 * @default true
 *
 * @param DateFormat
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See documentation for help. Valid Range: 0-8
 * @default 0
 *
 * @param ScrollSpeed
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc speed at which the achievement window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Achievement Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Show Total Points
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of points possible in total window
 * @default false
 *
 * @param Show Total Achievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of achievements possible in total window
 * @default false
 *
 * @param Transparent Windows
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, windows will have a transparent background
 * @default false
 *
 * @param Scene Background
 * @parent Achievement Scene Options
 * @type file
 * @dir img/pictures
 * @desc Image to use as the scene background (leave blank if not using custom image)
 *
 * @param Category Columns
 * @parent Achievement Scene Options
 * @type number
 * @min 1
 * @desc Amount of columns to have in category window
 * @default 4
 *
 * @param Text Options
 *
 * @param Reward Text
 * @parent Text Options
 * @desc Text to describe Rewards
 * @default Rewards:
 *
 * @param Requirement Text
 * @parent Text Options
 * @desc Text to describe Requirements
 * @default Requirements:
 *
 * @param Difficulty Text
 * @parent Text Options
 * @desc Text to describe Difficulty
 * @default Difficulty:
 *
 * @param Description Text
 * @parent Text Options
 * @desc Text to describe Description
 * @default Description:
 *
 * @param Points Text
 * @parent Text Options
 * @desc Text to describe Points
 * @default Points:
 *
 * @param Points Window Text
 * @parent Text Options
 * @desc Text to describe Points in the Points window
 * @default Points:
 *
 * @param Unearned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when unearned
 * @default Keep playing to earn this achievement
 *
 * @param Earned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when earned
 * @default Achievement earned on:
 *
 * @param Earned Count Text
 * @parent Text Options
 * @desc Text to appear when counting earned achievements
 * @default Earned:
 *
 * @param Basic Info Header Text
 * @parent Text Options
 * @desc Text to display in the Basic Info Header
 * @default Info
 *
 * @param Description Header Text
 * @parent Text Options
 * @desc Text to display in the Description Header
 * @default Description
 *
 * @param Requirement Header Text
 * @parent Text Options
 * @desc Text to display in the Requirement Header
 * @default Requirements
 *
 * @param Reward Header Text
 * @parent Text Options
 * @desc Text to display in the Reward Header
 * @default Rewards
 *
 * @param Steps Text
 * @parent Text Options
 * @desc Text to appear on step requirement progress bar
 * @default Steps
 *
 * @param Saves Text
 * @parent Text Options
 * @desc Text to appear on save requirement progress bar
 * @default Saves
 *
 * @param Battles Text
 * @parent Text Options
 * @desc Text to appear on battle requirement progress bar
 * @default Battles
 *
 * @param Wins Text
 * @parent Text Options
 * @desc Text to appear on win requirement progress bar
 * @default Wins
 *
 * @param Escapes Text
 * @parent Text Options
 * @desc Text to appear on escape requirement progress bar
 * @default Escapes
 *
 * @param Achievements Progress Text
 * @parent Text Options
 * @desc Text to appear on achievement requirement progress bar
 * @default Achievements
 *
 * @param Points Progress Text
 * @parent Text Options
 * @desc Text to appear on points requirement progress bar
 * @default Points
 *
 * @param Prof Level Text
 * @parent Text Options
 * @desc Text to appear on prof level requirement progress bar
 * @default Level
 *
 * @param Played Text
 * @parent Text Options
 * @desc Text to appear on played requirement progress bar
 * @default Played
 *
 * @param Enc Total Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Total requirement progress bar
 * @default % Enc. Total
 *
 * @param Enc Bestiary Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Bestiary requirement progress bar
 * @default % Enc. Bestiary
 *
 * @param Enc Items Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Item requirement progress bar
 * @default % Enc. Items
 *
 * @param Enc Weapons Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Weapon requirement progress bar
 * @default % Enc. Weapons
 *
 * @param Enc Armors Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Armor requirement progress bar
 * @default % Enc. Armors
 *
 * @param Enc Skills Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Skill requirement progress bar
 * @default % Enc. Skills
 *
 * @param Enc States Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia State requirement progress bar
 * @default % Enc. States
 * 
 * @param Total Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the totals window
 * @default left
 *
 * @param List Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the achievement list window
 * @default left
 *
 * @param Category Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the achievement category window
 * @default center
 *
 * @param Currency Unit Space
 * @parent Text Options
 * @type boolean
 * @desc Add a space between the Currency Value and Currency Unit?
 * @default false
 *
 * @param Label Color
 * @parent Text Options
 * @type color
 * @desc Color to draw label text in.
 * @default 16
 * 
 * @param Gauge Colors
 * 
 * @param CurrencyGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for currency gauge
 * @default 6
 *
 * @param CurrencyGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for currency gauge
 * @default 17
 *
 * @param GenericGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for miscellaneous gauges
 * @default 28
 *
 * @param GenericGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for miscellaneous gauges
 * @default 29
 *
 * @param ItemGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for item gauges
 * @default 22
 *
 * @param ItemGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for item gauges
 * @default 23
 *
 * @param SwitchVarGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for switch and variable gauges
 * @default 20
 *
 * @param SwitchVarGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for switch and variable gauges
 * @default 21
*/
/*~struct~Item:
 * @param Item
 * @type item
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Weapon:
 * @param Weapon
 * @type weapon
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Armor:
 * @param Armor
 * @type armor
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Switch:
 * @param Switch
 * @type switch
 * 
 * @param On/Off
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @param Description
 * @type text
 * @default
 * @desc description for this switch
*/
/*~struct~Variable:
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @type text
 * @desc Valid operators for criteria: < <= > >= =
 * Valid operators for reward: + - / * % =
 * @default >
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Criteria: the value to check the variable against
 * Reward: the value to award to the variable
 *
 * @param Description
 * @type text
 * @default
 * @desc description for this variable
*/
/*~struct~Requirement:
 * @param Currency
 * @type number
 * @min 0
 * @default 0
 * @desc Amount of currency needed to earn the achievement
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items needed to earn the achievement
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons needed to earn the achievement
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors needed to earn the achievement
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches needed to earn the achievement
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables needed to earn the achievement
 * @default []
 *
 * @param Saves
 * @type number
 * @min 0
 * @default 0
 * @desc Save count needed to earn the achievement
 *
 * @param Playtime
 * @type number
 * @min 0
 * @default 0
 * @desc Playtime needed to earn the achievement. In frames (60f/1sec)
 *
 * @param Steps
 * @type number
 * @min 0
 * @default 0
 * @desc Step count needed to earn the achievement
 *
 * @param Battles
 * @type number
 * @min 0
 * @default 0
 * @desc Battle count needed to earn the achievement
 *
 * @param Wins
 * @type number
 * @min 0
 * @default 0
 * @desc Win count needed to earn the achievement
 *
 * @param Escapes
 * @type number
 * @min 0
 * @default 0
 * @desc Escape count needed to earn the achievement
 *
 * @param Achievements Earned
 * @type number
 * @min 0
 * @default 0
 * @desc Earned achievements needed to earn the achievement
 *
 * @param Achievement Points
 * @type number
 * @min 0
 * @default 0
 * @desc Achievement points needed to earn the achievement
 *
 * @param Encyclopedia Total
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia discovered % needed to earn the achievement
 *
 * @param Encyclopedia Bestiary
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia bestiary discovered % needed to earn the achievement
 *
 * @param Encyclopedia Items
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia items discovered % needed to earn the achievement
 *
 * @param Encyclopedia Armors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia armors discovered % needed to earn the achievement
 *
 * @param Encyclopedia Weapons
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia weapons discovered % needed to earn the achievement
 *
 * @param Encyclopedia Skills
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia skills discovered % needed to earn the achievement
 *
 * @param Encyclopedia States
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia states discovered % needed to earn the achievement
 *
 * @param Professions
 * @type struct<Profession>[]
 * @default []
 * @desc profession requirements
*/
/*~struct~Reward:
 * @param Currency
 * @type number
 * @default 0
 * @desc Amount of currency to award upon achievement earn
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items to award upon achievement earn
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons to award upon achievement earn
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors to award upon achievement earn
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches to manipulate upon achievement earn
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables to manipulate upon achievement earn
 * @default []
*/
/*~struct~Popup:
 * @param Display?
 * @type boolean
 * @default true
 * @desc Display a pop up window on the map on achievement earn? No popup will display if not using CGMZ Toast Manager
 *
 * @param Sound
 * @type file
 * @dir audio/se/
 * @desc Sound to play on achievement earn
 * 
 * @param Image
 * @type file
 * @dir img/pictures
 * @desc Image to show on achievement earn. Leave blank to show a text window instead
 * 
 * @param Color
 * @type number
 * @min 0
 * @default 0
 * @desc Color to show achievement name with in text window upon earn. No effect if showing image instead.
*/
/*~struct~Achievement:
 * @param Name
 * @type text
 * @desc Name of the achievement
 * 
 * @param Points
 * @type number
 * @min 0
 * @default 10
 * @desc Amount of points the achievement is worth
 *
 * @param Pre Description
 * @type note
 * @default ""
 * @desc Achievement description before it is earned
 *
 * @param Post Description
 * @type note
 * @default ""
 * @desc Achievement description after it is earned. Leave blank to always use Pre Description
 *
 * @param Category
 * @desc Category the achievement belongs to
 *
 * @param Difficulty
 * @type text
 * @default Easy
 * @desc Achievement difficulty
 *
 * @param Secret
 * @type boolean
 * @default false
 * @desc Is the achievement a secret achievement?
 *
 * @param Automatic
 * @type boolean
 * @default false
 * @desc Automatically track the achievement progress?
 *
 * @param Rewards
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]"}
 * @desc Achievement Rewards
 *
 * @param Requirements
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Achievements Earned":"0","Achievement Points":"0","Encyclopedia Total":"0","Encyclopedia Bestiary":"0","Encyclopedia Items":"0","Encyclopedia Armors":"0","Encyclopedia Weapons":"0","Encyclopedia Skills":"0","Encyclopedia States":"0","Professions":"[]"}
 * @desc Achievement Requirements
 *
 * @param Popup
 * @type struct<Popup>
 * @default {"Display?":"true","Sound":"Applause1","Image":"","Color":"0"}
 * @desc Settings for the pop up window if using CGMZ Toast Manager
*/
/*~struct~Profession:
 * @param Name
 * @type text
 * @desc The name of the profession to track
 * 
 * @param Level Requirement
 * @type number
 * @min 1
 * @default 1
 * @desc The level requirement for the profession.
*/
/*~struct~Category:
 * @param id
 * @desc The unique id of the category
 * 
 * @param Name
 * @desc The display name for the category
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/achievements/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc 成就系统（设置各种条件，达成成就并获得奖励）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】V 1.4.0
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 支持成就点数的获得、显示未达成的成就、成就拥有不同难度的达成方式。
 * 可以自动追踪数据来达成成就，或手动命令来达成。
 * 可以设置成就奖励，如金钱、物品和装备，以及变量和开关。 
 * 
 * 【搭配插件】
 * CGMZ Core:核心插件，运行作者插件的必须插件。
 * CGMZ Toast Manager:提示插件，获得成就达成时的弹窗提示。
 * CGMZ Encyclopedia:百科全书插件，获取百科全书的完成度百分比来制作成就。
 * 注：本插件在插件列表中必须置于"核心插件Core"之下。 
 * ----------------------------------------------------------------------------
 * 【使用说明】
 * 一、插件命令：
 * 1、输入成就名称来获得对应成就。
 * 2、输入成就ID来获得队友成就。（插件中设置成就时所对应的内部ID，从1开始）
 * 3、打开成就界面。
 * 4、修改成就描述。
 * 5、重置成就数据。
 * 6、使用脚本命令打开成就界面：SceneManager.push(CGMZ_Scene_Achievements);
 * 
 * 二、时间显示格式的选项说明: MM-月，DD-日，YYYY-年
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 * 
 * 三、关于所有设置中的成就名称或其他插件引用的名称：
 *     字符必须一致，并区分大小写。如Kill the dragon和Kill the DRAGON会定义为不同的配方或专业。
 * -----------------------------Colors-----------------------------------------
 * If using CGMZ Infinite Colors, you will not be able to select the custom
 * colors via the plugin parameters. In this case, please switch to the text
 * input at the top of the parameter and manually type the color index number.
 * ---------------------------------------------------------------------------
 *【版本更新历史】
 * Version 1.0 - Initial Release
 * Version 1.1.0:
 * - Fixed crash if there are no achievements
 * - Added support for CGMZ Professions
 * Version 1.1.1:
 * - Fixed bug with variable tracking when using the "=" operator
 * Version 1.2.0:
 * - Added ability to use text codes in achievement descriptions
 * - New achievements should now be automatically recognized by saved games
 * - Added ability to change pre and post descriptions
 * - Added option to change the label / header text color
 * - Added option to change text alignment of list window
 * - Added option to change text alignment of totals window
 * - Fixed bug with toast audio on achievement earn
 * - Fixed bug with padding on list window
 * - Removed plugin command to manually recognize new achievements in saved
 *   game
 * Version 1.2.1:
 * - Fixed crash when not using CGMZ Encyclopedia
 * Version 1.2.2:
 * - Fixed bug with variable achievements not auto completing when they should
 * Version 1.2.3:
 * - Fixed crash with achievements that had switch/variable rewards
 * Version 1.2.4:
 * - Compatibility for VS plugins
 * Version 1.3.0:
 * - Added ability to choose which order & info to display for achievements
 * - Added param for Points text in total window (separate from Display window)
 * - Added param to display total achievements possible in total window
 * - Added param to display total points possible in total window
 * - Added text params for achievement requirement text (on progress bar)
 * - Documentation Updated
 * Version 1.4.0:
 * - Added categories of achievements
 * - Added plugin command to change an achievement's secret property
 * - Added param for transparent windows in achievement scene
 * - Added param to use a custom background image in achievement scene
 * - Updated color parameters to use the new color selector for plugins
 * 
 * @command Earn Achievement By Name
 * @text 根据名称获得成就
 * @desc 根据成就的名称来获得成就。
 *
 * @arg name
 * @type text
 * @text 成就名称
 * @desc 设置需要获得的成就的名称。
 * @default
 *
 * @command Earn Achievement By ID
 * @text 根据序号获得成就
 * @desc 根据插件设置成就时所对应的序号ID来获得成就。
 *
 * @arg id
 * @type number
 * @text 成就序号ID
 * @desc 设置成就时所对应的序号ID。
 * @default 0
 *
 * @command Call Scene
 * @text 打开成就界面
 * @desc 打开成就界面。
 *
 * @command Change Description
 * @text 修改成就描述
 * @desc 修改成就获得前后的描述。
 *
 * @arg name
 * @type text
 * @text 成就名称
 * @desc 需要修改描述的成就的名称。如要使用序号指定成就则留空本项。
 * @default
 *
 * @arg id
 * @type number
 * @text 成就序号ID
 * @desc 需要修改描述的成就的内部序号。如要使用名称指定成就则留空本项。
 * @default 0
 *
 * @arg Pre Description
 * @text 成就描述（完成前）
 * @type note
 * @default ""
 * @desc 修改成就达成前的描述，留空则不修改。
 *
 * @arg Post Description
 * @text 成就描述（完成后）
 * @type note
 * @default ""
 * @desc 修改成就达成后的描述，留空则不修改。
 *
 * @command Change Secret
 * @desc Change an achievement secret property
 *
 * @arg name
 * @type text
 * @text Achievement Name
 * @desc The name of the achievement to change description. Leave blank if using ID.
 * @default
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to change
 * @default 0
 *
 * @arg secret
 * @type boolean
 * @desc Whether the achievement will now be secret or not
 * @default false
 *
 * @command Reinitialize
 * @text 重置数据
 * @desc 调试用指令，重置所有成就数据，用于与已保存的游戏进行数据对比。
 *
 * @param CGMZ Achievements
 * @text 成就设置
 *
 * @param Achievements
 * @text 成就列表
 * @parent CGMZ Achievements
 * @type struct<Achievement>[]
 * @default []
 * @desc 设置你想要的成就。
 *
 * @param Categories
 * @parent CGMZ Achievements
 * @type struct<Category>[]
 * @default []
 * @desc Achievement Categories
 *
 * @param Requires CGMZ Toast Plugin
 * @text 弹窗插件设置
 * 
 * @param ShowAchievementPop
 * @text 是否显示弹窗？
 * @parent Requires CGMZ Toast Plugin
 * @type boolean
 * @desc 是否在获得成就时跳出弹窗提示？(需要CGMZ ToastManager插件)
 * @default false
 *
 * @param AchievementEarnedText
 * @text 达成成就的文本描述
 * @parent Requires CGMZ Toast Plugin
 * @desc 设置当达成成就时弹窗的文本描述。(需要CGMZ ToastManager插件)
 * @default 成就达成！
 *
 * @param AchievementEarnedColor
 * @text 达成成就的文字颜色
 * @parent Requires CGMZ Toast Plugin
 * @type color
 * @desc 达成成就弹窗第一行文字的颜色，使用对应窗口皮肤的0至31号颜色。
 * @default 3
 *
 * @param AchievementEarnedAlignment
 * @text 弹窗内文本位置
 * @parent Requires CGMZ Toast Plugin
 * @desc 设置弹窗内文本的位置：left-靠左, right-靠右, center-居中。
 * @default center
 *
 * @param AchievementEarnedSound
 * @text 成就达成的音效
 * @parent Requires CGMZ Toast Plugin
 * @type file
 * @dir audio/se/
 * @desc 设置成就达成时弹窗的音效。
 * @default Applause1
 *
 * @param Achievement Scene Options
 * @text 成就界面设置
 *
 * @param Achievement Display Info
 * @parent Achievement Scene Options
 * @type select[]
 * @option Name
 * @option Earn Date
 * @option Difficulty
 * @option Points
 * @option Description
 * @option Requirements
 * @option Rewards
 * @option Basic Info Header
 * @option Description Header
 * @option Requirement Header
 * @option Reward Header
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Name","Earn Date","Difficulty","Points","Description","Requirements","Rewards"]
 *
 * @param ShowSecretAchievements
 * @text 显示未达成成就
 * @parent Achievement Scene Options
 * @type boolean
 * @desc 设置是否在成就界面内显示未达成的成就。
 * @default false
 *
 * @param SecretText
 * @text 隐藏成就的显示文本
 * @parent Achievement Scene Options
 * @desc 设置隐藏成就在界面内显示的文本描述。
 * @default ??????
 *
 * @param ShowCriteriaAfterCompletion
 * @text 完成后显示成就达成条件
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true-完成后依然显示成就达成条件, false-完成后不显示成就达成条件。
 * @default true
 *
 * @param DateFormat
 * @text 日期格式
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc 输入0至8选择显示日期的格式，具见【使用说明】。
 * @default 0
 *
 * @param ScrollSpeed
 * @text 滚动速度
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc speed at which the achievement window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @text 滚动等待
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @text 描述滚动
 * @parent Achievement Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @text 自动滚动
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Show Total Points
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of points possible in total window
 * @default false
 *
 * @param Show Total Achievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of achievements possible in total window
 * @default false
 *
 * @param Transparent Windows
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, windows will have a transparent background
 * @default false
 *
 * @param Scene Background
 * @parent Achievement Scene Options
 * @type file
 * @dir img/pictures
 * @desc Image to use as the scene background (leave blank if not using custom image)
 *
 * @param Category Columns
 * @parent Achievement Scene Options
 * @type number
 * @min 1
 * @desc Amount of columns to have in category window
 * @default 4
 *
 * @param Text Options
 * @text 文本描述设置
 * @parent Achievement Scene Options
 *
 * @param Reward Text
 * @text 成就奖励的描述
 * @parent Text Options
 * @desc 成就可获得奖励标签的文本描述。
 * @default 【奖励】
 *
 * @param Requirement Text
 * @text 成就条件的描述
 * @parent Text Options
 * @desc 成就达成条件标签的文本描述。
 * @default 【条件】
 *
 * @param Difficulty Text
 * @text 成就难度的描述
 * @parent Text Options
 * @desc 成就达成难度标签的文本描述。
 * @default 成就难度:
 *
 * @param Description Text
 * @text 成就内容的描述
 * @parent Text Options
 * @desc 成就内容标签的文本描述。
 * @default 成就描述:
 *
 * @param Points Text
 * @text 成就点的描述
 * @parent Text Options
 * @desc 成就点数标签的文本描述。
 * @default 成就点数:
 *
 * @param Points Window Text
 * @parent Text Options
 * @desc Text to describe Points in the Points window
 * @default 成就点数:
 *
 * @param Unearned Text
 * @text 成就未达成的描述
 * @parent Text Options
 * @desc 显示该成就还未达成的文本描述。
 * @default 你还没有达成这个成就。
 *
 * @param Earned Text
 * @text 成就达成的描述
 * @parent Text Options
 * @desc 显示该成就已经达成的文本描述。
 * @default 成就达成:
 *
 * @param Earned Count Text
 * @text 成就达成数量的描述
 * @parent Text Options
 * @desc 显示已经达成多少成就的标签的文本描述
 * @default 达成数:
 *
 * @param Basic Info Header Text
 * @parent Text Options
 * @desc Text to display in the Basic Info Header
 * @default Info
 *
 * @param Description Header Text
 * @parent Text Options
 * @desc Text to display in the Description Header
 * @default Description
 *
 * @param Requirement Header Text
 * @parent Text Options
 * @desc Text to display in the Requirement Header
 * @default Requirements
 *
 * @param Reward Header Text
 * @parent Text Options
 * @desc Text to display in the Reward Header
 * @default Rewards
 *
 * @param Steps Text
 * @parent Text Options
 * @desc Text to appear on step requirement progress bar
 * @default Steps
 *
 * @param Saves Text
 * @parent Text Options
 * @desc Text to appear on save requirement progress bar
 * @default Saves
 *
 * @param Battles Text
 * @parent Text Options
 * @desc Text to appear on battle requirement progress bar
 * @default Battles
 *
 * @param Wins Text
 * @parent Text Options
 * @desc Text to appear on win requirement progress bar
 * @default Wins
 *
 * @param Escapes Text
 * @parent Text Options
 * @desc Text to appear on escape requirement progress bar
 * @default Escapes
 *
 * @param Achievements Progress Text
 * @parent Text Options
 * @desc Text to appear on achievement requirement progress bar
 * @default Achievements
 *
 * @param Points Progress Text
 * @parent Text Options
 * @desc Text to appear on points requirement progress bar
 * @default Points
 *
 * @param Prof Level Text
 * @parent Text Options
 * @desc Text to appear on prof level requirement progress bar
 * @default Level
 *
 * @param Played Text
 * @parent Text Options
 * @desc Text to appear on played requirement progress bar
 * @default Played
 *
 * @param Enc Total Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Total requirement progress bar
 * @default % Enc. Total
 *
 * @param Enc Bestiary Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Bestiary requirement progress bar
 * @default % Enc. Bestiary
 *
 * @param Enc Items Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Item requirement progress bar
 * @default % Enc. Items
 *
 * @param Enc Weapons Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Weapon requirement progress bar
 * @default % Enc. Weapons
 *
 * @param Enc Armors Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Armor requirement progress bar
 * @default % Enc. Armors
 *
 * @param Enc Skills Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Skill requirement progress bar
 * @default % Enc. Skills
 *
 * @param Enc States Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia State requirement progress bar
 * @default % Enc. States
 *
 * @param Total Window Alignment
 * @text 成就统计的位置
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 设置成就完成数和成就点数位置：left-靠左，center-居中，right-靠右。
 * @default left
 *
 * @param List Window Alignment
 * @text 成就列表的位置
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 设置成就列表中文字的位置：left-靠左，center-居中，right-靠右。
 * @default left
 *
 * @param Category Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the achievement category window
 * @default center
 *
 * @param Currency Unit Space
 * @text 货币数值和单位之间加空格
 * @parent Text Options
 * @type boolean
 * @desc 是否在货币数值和货币单位之间加一个空格？
 * @default false
 *
 * @param Label Color
 * @text 标签颜色
 * @parent Text Options
 * @type color
 * @desc Color to draw label text in.
 * @default 16
 * 
 * @param Gauge Colors
 * @text 计量条颜色
 * @parent Achievement Scene Options
 * 
 * @param CurrencyGaugeColor1
 * @text 货币计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 货币计量条颜色1
 * @default 6
 *
 * @param CurrencyGaugeColor2
 * @text 货币计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 货币计量条颜色2
 * @default 17
 *
 * @param GenericGaugeColor1
 * @text 通用计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 通用计量条颜色1
 * @default 28
 *
 * @param GenericGaugeColor2
 * @text 通用计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 通用计量条颜色2
 * @default 29
 *
 * @param ItemGaugeColor1
 * @text 物品计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 物品计量条颜色1
 * @default 22
 *
 * @param ItemGaugeColor2
 * @text 物品计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 物品计量条颜色2
 * @default 23
 *
 * @param SwitchVarGaugeColor1
 * @text 开关/变量计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 开关/变量计量条颜色1
 * @default 20
 *
 * @param SwitchVarGaugeColor2
 * @text 开关/变量计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 开关/变量计量条颜色2
 * @default 21
*/
/*~struct~Item:zh-CN
 * @param Item
 * @text 物品
 * @type item
 * 
 * @param Amount
 * @text 物品数量
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Weapon:zh-CN
 * @param Weapon
 * @text 武器
 * @type weapon
 * 
 * @param Amount
 * @text 武器数量
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Armor:zh-CN
 * @param Armor
 * @text 护甲
 * @type armor
 * 
 * @param Amount
 * @text 护甲数量
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Switch:zh-CN
 * @param Switch
 * @text 开关
 * @type switch
 * 
 * @param On/Off
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @param Description
 * @text 条件描述
 * @type text
 * @default
 * @desc 设置关于该开关用途的描述。
*/
/*~struct~Variable:zh-CN
 * @param Variable
 * @text 变量
 * @type variable
 * 
 * @param Operator
 * @text 变量操作
 * @type text
 * @desc 用作条件时：<  <=  >  >=  =
 * 用作奖励时： +  -  /  *  %  =
 * @default >
 *
 * @param Amount
 * @text 数值
 * @type number
 * @default 0
 * @desc 用作条件时：检查变量的数值。用作奖励时：变量数值的奖励
 *
 * @param Description
 * @text 变量描述
 * @type text
 * @default
 * @desc 设置关于该变量用途的描述。
*/
/*~struct~Requirement:zh-CN
 * @param Currency
 * @text 货币
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的货币数量。
 * 
 * @param Items
 * @text 物品
 * @type struct<Item>[]
 * @desc 设置达成成就所需的物品和数量。
 * @default []
 *
 * @param Weapons
 * @text 武器
 * @type struct<Weapon>[]
 * @desc 设置达成成就所需的武器和数量。
 * @default []
 *
 * @param Armors
 * @text 防具
 * @type struct<Armor>[]
 * @desc 设置达成成就所需的防具和数量。
 * @default []
 *
 * @param Switches
 * @text 开关
 * @type struct<Switch>[]
 * @desc 设置达成成就需激活的开关。
 * @default []
 *
 * @param Variables
 * @text 变量
 * @type struct<Variable>[]
 * @desc 设置达成成就需符合的变量。
 * @default []
 *
 * @param Saves
 * @text 存档次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的存档次数。
 *
 * @param Playtime
 * @text 游戏时间
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的游戏时间。（单位:帧，60帧=1秒）
 *
 * @param Steps
 * @text 步数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的移动步数。
 *
 * @param Battles
 * @text 战斗次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的战斗次数。
 *
 * @param Wins
 * @text 战斗胜利次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的战斗获胜次数。
 *
 * @param Escapes
 * @text 逃跑次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的逃跑次数。
 *
 * @param Achievements Earned
 * @text 成就完成数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的成就完成次数。
 *
 * @param Achievement Points
 * @text 成就点数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的成就点数。
 *
 * @param Encyclopedia Total
 * @text 百科全书总完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书总百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Bestiary
 * @text 百科全书:敌人类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:敌人类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Items
 * @text 百科全书:物品类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:物品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Armors
 * @text 百科全书:防具类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:防具品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Weapons
 * @text 百科全书:武器类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:武器品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Skills
 * @text 百科全书:技能类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:技能品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia States
 * @text 百科全书:状态类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:状态品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Professions
 * @text 专业等级
 * @type struct<Profession>[]
 * @default []
 * @desc 设置达成成就所需专业技能等级。（需要CGMZ_Professions插件）
*/
/*~struct~Reward:zh-CN
 * @param Currency
 * @text 货币
 * @type number
 * @default 0
 * @desc 达成成就所奖励的货币和数量。
 * 
 * @param Items
 * @text 物品
 * @type struct<Item>[]
 * @desc 达成成就所奖励的物品和数量。
 * @default []
 *
 * @param Weapons
 * @text 武器
 * @type struct<Weapon>[]
 * @desc 达成成就所奖励的武器和数量。
 * @default []
 *
 * @param Armors
 * @text 防具
 * @type struct<Armor>[]
 * @desc 达成成就所奖励的防具和数量。
 * @default []
 *
 * @param Switches
 * @text 开关
 * @type struct<Switch>[]
 * @desc 达成成就时激活开关。
 * @default []
 *
 * @param Variables
 * @text 变量
 * @type struct<Variable>[]
 * @desc 达成成就时操作变量。
 * @default []
*/
/*~struct~Popup:zh-CN
 * @param Display?
 * @text 提示弹窗
 * @type boolean
 * @default true
 * @desc 达成成就时是否弹出一个提示窗口？ （需要CGMZ_ToastManager插件）
 *
 * @param Sound
 * @text 提示音效
 * @type file
 * @dir audio/se/
 * @desc 设置一个达成成就时的音效。
 * 
 * @param Image
 * @text 提示图片
 * @type file
 * @dir img/pictures
 * @desc 设置一个达成成就时的图片。不设置则只提示文字描述。
 * 
 * @param Color
 * @text 提示文本颜色
 * @type number
 * @min 0
 * @default 0
 * @desc 设置提示弹窗中成就名称的颜色。如使用提示图片则本设置无效果。
*/
/*~struct~Achievement:zh-CN
 * @param Name
 * @text 成就名称
 * @type text
 * @desc 设置成就名称。
 * 
 * @param Points
 * @text 成就点数
 * @type number
 * @min 0
 * @default 10
 * @desc 设置该成就达成后获得的点数。
 *
 * @param Pre Description
 * @text 成就描述（完成前）
 * @type note
 * @default ""
 * @desc 设置该成就达成前显示的描述。
 *
 * @param Post Description
 * @text 成就描述（完成后）
 * @type note
 * @default ""
 * @desc 设置该成就达成后显示的描述。
 *
 * @param Category
 * @desc Category the achievement belongs to
 *
 * @param Difficulty
 * @text 成就难度
 * @type text
 * @default 简单
 * @desc 描述该成就的困难程度。如：简单、普通、困难、恶梦、地狱等。
 *
 * @param Secret
 * @text 隐藏成就
 * @type boolean
 * @default false
 * @desc 设置该成就是否隐藏成就。是则会以自定义的符号或文字显示。
 *
 * @param Automatic
 * @text 自动追踪
 * @type boolean
 * @default false
 * @desc 会自动追踪成就所设定的条件是否完成。
 *
 * @param Rewards
 * @text 奖励
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]"}
 * @desc 设置成就完成后的奖励。
 *
 * @param Requirements
 * @text 条件
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Achievements Earned":"0","Achievement Points":"0","Encyclopedia Total":"0","Encyclopedia Bestiary":"0","Encyclopedia Items":"0","Encyclopedia Armors":"0","Encyclopedia Weapons":"0","Encyclopedia Skills":"0","Encyclopedia States":"0","Professions":"[]"}
 * @desc 设置成就所需达成的条件。
 *
 * @param Popup
 * @text 提示设置
 * @type struct<Popup>
 * @default {"Display?":"true","Sound":"Applause1","Image":"","Color":"0"}
 * @desc 设置成就达成时的弹窗提示。（需要CGMZ_ToastManager插件）
*/
/*~struct~Profession:zh-CN
 * @param Name
 * @text 专业名称
 * @type text
 * @desc 设置专业名称并追踪专业插件的数据。（需要CGMZ_Professions插件）
 * 
 * @param Level Requirement
 * @text 专业技能等级要求
 * @type number
 * @min 1
 * @default 1
 * @desc 设置达成成就所需的专业技能等级。（需要CGMZ_Professions插件）
*/
/*~struct~Category:zh-CN
 * @param id
 * @desc The unique id of the category
 * 
 * @param Name
 * @desc The display name for the category
*/
var Imported = Imported || {};
Imported.CGMZ_Achievements = true;
var CGMZ = CGMZ || {};
CGMZ.Achievements = CGMZ.Achievements || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Achievements"] = "1.4.0";
CGMZ.Achievements.parameters = PluginManager.parameters('CGMZ_Achievements');
CGMZ.Achievements.ShowAchievementPop = (CGMZ.Achievements.parameters["ShowAchievementPop"] === "true");
CGMZ.Achievements.AchievementEarnedText = CGMZ.Achievements.parameters["AchievementEarnedText"];
CGMZ.Achievements.AchievementEarnedColor = Number(CGMZ.Achievements.parameters["AchievementEarnedColor"]);
CGMZ.Achievements.AchievementEarnedAlignment = CGMZ.Achievements.parameters["AchievementEarnedAlignment"];
CGMZ.Achievements.AchievementEarnedSound = CGMZ.Achievements.parameters["AchievementEarnedSound"];
CGMZ.Achievements.ShowSecretAchievements = (CGMZ.Achievements.parameters["ShowSecretAchievements"] === "true");
CGMZ.Achievements.SecretText = CGMZ.Achievements.parameters["SecretText"];
CGMZ.Achievements.ShowCriteriaAfterCompletion = (CGMZ.Achievements.parameters["ShowCriteriaAfterCompletion"] === "true");
CGMZ.Achievements.DateFormat = Number(CGMZ.Achievements.parameters["DateFormat"]);
CGMZ.Achievements.CurrencyGaugeColor1 = Number(CGMZ.Achievements.parameters["CurrencyGaugeColor1"]);
CGMZ.Achievements.CurrencyGaugeColor2 = Number(CGMZ.Achievements.parameters["CurrencyGaugeColor2"]);
CGMZ.Achievements.GenericGaugeColor1 = Number(CGMZ.Achievements.parameters["GenericGaugeColor1"]);
CGMZ.Achievements.GenericGaugeColor2 = Number(CGMZ.Achievements.parameters["GenericGaugeColor2"]);
CGMZ.Achievements.ItemGaugeColor1 = Number(CGMZ.Achievements.parameters["ItemGaugeColor1"]);
CGMZ.Achievements.ItemGaugeColor2 = Number(CGMZ.Achievements.parameters["ItemGaugeColor2"]);
CGMZ.Achievements.SwitchVarGaugeColor1 = Number(CGMZ.Achievements.parameters["SwitchVarGaugeColor1"]);
CGMZ.Achievements.SwitchVarGaugeColor2 = Number(CGMZ.Achievements.parameters["SwitchVarGaugeColor2"]);
CGMZ.Achievements.ScrollSpeed = Number(CGMZ.Achievements.parameters["ScrollSpeed"]);
CGMZ.Achievements.ScrollWait = Number(CGMZ.Achievements.parameters["ScrollWait"]);
CGMZ.Achievements.CategoryColumns = Number(CGMZ.Achievements.parameters["Category Columns"]);
CGMZ.Achievements.ScrollDeceleration = parseFloat(CGMZ.Achievements.parameters["Scroll Deceleration"]);
CGMZ.Achievements.AutoScroll = (CGMZ.Achievements.parameters["Auto Scroll"] === "true");
CGMZ.Achievements.CurrencyUnitSpace = (CGMZ.Achievements.parameters["Currency Unit Space"] === "true");
CGMZ.Achievements.ShowTotalPoints = (CGMZ.Achievements.parameters["Show Total Points"] === "true");
CGMZ.Achievements.ShowTotalAchievements = (CGMZ.Achievements.parameters["Show Total Achievements"] === "true");
CGMZ.Achievements.TransparentWindows = (CGMZ.Achievements.parameters["Transparent Windows"] === "true");
CGMZ.Achievements.RewardText = CGMZ.Achievements.parameters["Reward Text"];
CGMZ.Achievements.RequirementText = CGMZ.Achievements.parameters["Requirement Text"];
CGMZ.Achievements.DifficultyText = CGMZ.Achievements.parameters["Difficulty Text"];
CGMZ.Achievements.DescriptionText = CGMZ.Achievements.parameters["Description Text"];
CGMZ.Achievements.PointsText = CGMZ.Achievements.parameters["Points Text"];
CGMZ.Achievements.PointsWindowText = CGMZ.Achievements.parameters["Points Window Text"];
CGMZ.Achievements.UnearnedText = CGMZ.Achievements.parameters["Unearned Text"];
CGMZ.Achievements.EarnedText = CGMZ.Achievements.parameters["Earned Text"];
CGMZ.Achievements.EarnedCountText = CGMZ.Achievements.parameters["Earned Count Text"];
CGMZ.Achievements.BasicInfoHeaderText = CGMZ.Achievements.parameters["Basic Info Header Text"];
CGMZ.Achievements.DescriptionHeaderText = CGMZ.Achievements.parameters["Description Header Text"];
CGMZ.Achievements.RequirementHeaderText = CGMZ.Achievements.parameters["Requirement Header Text"];
CGMZ.Achievements.RewardHeaderText = CGMZ.Achievements.parameters["Reward Header Text"];
CGMZ.Achievements.StepsText = CGMZ.Achievements.parameters["Steps Text"];
CGMZ.Achievements.SavesText = CGMZ.Achievements.parameters["Saves Text"];
CGMZ.Achievements.BattlesText = CGMZ.Achievements.parameters["Battles Text"];
CGMZ.Achievements.WinsText = CGMZ.Achievements.parameters["Wins Text"];
CGMZ.Achievements.EscapesText = CGMZ.Achievements.parameters["Escapes Text"];
CGMZ.Achievements.AchievementProgressText = CGMZ.Achievements.parameters["Achievements Progress Text"];
CGMZ.Achievements.PointsProgressText = CGMZ.Achievements.parameters["Points Progress Text"];
CGMZ.Achievements.ProfLevelText = CGMZ.Achievements.parameters["Prof Level Text"];
CGMZ.Achievements.PlayedText = CGMZ.Achievements.parameters["Played Text"];
CGMZ.Achievements.EncTotalText = CGMZ.Achievements.parameters["Enc Total Text"];
CGMZ.Achievements.EncBestiaryText = CGMZ.Achievements.parameters["Enc Bestiary Text"];
CGMZ.Achievements.EncItemsText = CGMZ.Achievements.parameters["Enc Items Text"];
CGMZ.Achievements.EncWeaponsText = CGMZ.Achievements.parameters["Enc Weapons Text"];
CGMZ.Achievements.EncArmorsText = CGMZ.Achievements.parameters["Enc Armors Text"];
CGMZ.Achievements.EncSkillsText = CGMZ.Achievements.parameters["Enc Skills Text"];
CGMZ.Achievements.EncStatesText = CGMZ.Achievements.parameters["Enc States Text"];
CGMZ.Achievements.TotalWindowAlignment = CGMZ.Achievements.parameters["Total Window Alignment"];
CGMZ.Achievements.ListWindowAlignment = CGMZ.Achievements.parameters["List Window Alignment"];
CGMZ.Achievements.CategoryWindowAlignment = CGMZ.Achievements.parameters["Category Window Alignment"];
CGMZ.Achievements.SceneBackground = CGMZ.Achievements.parameters["Scene Background"];
CGMZ.Achievements.LabelColor = Number(CGMZ.Achievements.parameters["Label Color"]);
CGMZ.Achievements.Achievements = JSON.parse(CGMZ.Achievements.parameters["Achievements"]);
CGMZ.Achievements.Categories = JSON.parse(CGMZ.Achievements.parameters["Categories"]);
CGMZ.Achievements.AchievementDisplayInfo = JSON.parse(CGMZ.Achievements.parameters["Achievement Display Info"]);
//=============================================================================
// CGMZ_Achievement
//-----------------------------------------------------------------------------
// Store and manage achievement data.
//=============================================================================
function CGMZ_Achievement() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Achievement
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initialize = function(achievementData, id) {
	this._id = id;
	this._earned = false;
	this._earndate = "";
	achievementData = JSON.parse(achievementData);
	this._name = achievementData["Name"];
	this._points = Number(achievementData["Points"]);
	this._difficulty = achievementData["Difficulty"];
	this._category = achievementData.Category;
	this._predesc = JSON.parse(achievementData["Pre Description"]);
	this._postdesc = JSON.parse(achievementData["Post Description"]);
	if(this._postdesc === "") {
		this._postdesc = this._predesc;
	}
	this._automatic = (achievementData["Automatic"] === "true");
	this._secret = (achievementData["Secret"] === "true");
	const popupData = JSON.parse(achievementData["Popup"]);
	this._popup = {"display": (popupData["Display?"] === "true"), "sound": popupData["Sound"],
					"image": popupData["Image"], "color": Number(popupData["Color"])};
	const rewards = JSON.parse(achievementData["Rewards"]);
	this._rewards = {};
	this._rewards["items"] = [];
	this._rewards["switches"] = [];
	this._rewards["variables"] = [];
	this._rewards["currency"] = Number(rewards["Currency"]);
	this.initializeItems(this._rewards.items, rewards["Items"], "Item", "Amount", "item");
	this.initializeItems(this._rewards.items, rewards["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this._rewards.items, rewards["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this._rewards.switches, rewards["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this._rewards.variables, rewards["Variables"], "Variable", "Amount", "Description", "Operator");
	const requirements = JSON.parse(achievementData["Requirements"]);
	this._requirements = {};
	this._requirements["items"] = [];
	this._requirements["switches"] = [];
	this._requirements["variables"] = [];
	this._requirements["currency"] = Number(requirements["Currency"]);
	this.initializeItems(this._requirements.items, requirements["Items"], "Item", "Amount", "item");
	this.initializeItems(this._requirements.items, requirements["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this._requirements.items, requirements["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this._requirements.switches, requirements["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this._requirements.variables, requirements["Variables"], "Variable", "Amount", "Description", "Operator");
	this._requirements["saves"] = Number(requirements["Saves"]);
	this._requirements["steps"] = Number(requirements["Steps"]);
	this._requirements["battles"] = Number(requirements["Battles"]);
	this._requirements["wins"] = Number(requirements["Wins"]);
	this._requirements["escapes"] = Number(requirements["Escapes"]);
	this._requirements["achievetotal"] = Number(requirements["Achievements Earned"]);
	this._requirements["achievepts"] = Number(requirements["Achievement Points"]);
	this._requirements["playtime"] = Math.floor(Number(requirements["Playtime"]) / 60);
	this._requirements["encyclopediatotal"] = Number(requirements["Encyclopedia Total"]);
	this._requirements["encyclopediabestiary"] = Number(requirements["Encyclopedia Bestiary"]);
	this._requirements["encyclopediaitems"] = Number(requirements["Encyclopedia Items"]);
	this._requirements["encyclopediaweapons"] = Number(requirements["Encyclopedia Weapons"]);
	this._requirements["encyclopediaarmors"] = Number(requirements["Encyclopedia Armors"]);
	this._requirements["encyclopediaskills"] = Number(requirements["Encyclopedia Skills"]);
	this._requirements["encyclopediastates"] = Number(requirements["Encyclopedia States"]);
	this._requirements["professions"] = this.initializeProfessionRequirements(requirements["Professions"]);
	this.setRewardFlag(this._rewards);
	this.setRequirementFlag(this._requirements);
};
//-----------------------------------------------------------------------------
// Initialize Achievement items (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeItems = function(itemArray, JSONtext, idText, amtText, type) {
	let parsedItems = JSON.parse(JSONtext);
	for(let i = 0; i < parsedItems.length; i++) {
		const obj = JSON.parse(parsedItems[i]);
		const id = Number(obj[idText]);
		const amt = Number(obj[amtText]);
		itemArray.push({"type": type, "id": id, "amt": amt});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeSwitches = function(switchArray, JSONtext, idText, valueText, descText) {
	let parsedItems = JSON.parse(JSONtext);
	for(let i = 0; i < parsedItems.length; i++) {
		const obj = JSON.parse(parsedItems[i]);
		const id = Number(obj[idText]);
		const value = (obj[valueText] === "true");
		const description = obj[descText];
		switchArray.push({"value": value, "id": id, "description": description});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeVariables = function(variableArray, JSONtext, idText, valueText, descText, opText) {
	let parsedItems = JSON.parse(JSONtext);
	for(let i = 0; i < parsedItems.length; i++) {
		const obj = JSON.parse(parsedItems[i]);
		const id = Number(obj[idText]);
		const value = Number(obj[valueText]);
		const operator = obj[opText];
		const description = obj[descText];
		variableArray.push({"value": value, "id": id, "description": description, "operator": operator});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement profession requirements
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeProfessionRequirements = function(reqs) {
	if(!Imported.CGMZ_Professions) return [];
	let required = [];
	reqs = JSON.parse(reqs);
	for(let i = 0; i < reqs.length; i++) {
		const reqTemp = JSON.parse(reqs[i]);
		const req = {"name": reqTemp.Name, "level": Number(reqTemp["Level Requirement"])};
		required.push(req);
	}
	return required;
};
//-----------------------------------------------------------------------------
// Set flag if achievement has rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setRewardFlag = function(rewards) {
	this._hasRewards = (rewards.currency > 0 || rewards.items.length > 0 || rewards.switches.length > 0 || rewards.variables.length > 0);
};
//-----------------------------------------------------------------------------
// Set flag if achievement has requirements
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setRequirementFlag = function(req) {
	this._hasRequirements = (req.currency > 0 || req.items.length > 0 || req.switches.length > 0 || req.variables.length > 0 || req.saves > 0 || req.steps > 0 ||
							req.playtime > 0 || req.wins > 0 || req.battles > 0 || req.escapes > 0 || req.achievepts > 0 || req.achievetotal > 0 || req.encyclopediatotal ||
							req.encyclopediaarmors || req.encyclopediabestiary || req.encyclopediaitems ||
							req.encyclopediaweapons || req.encyclopediaskills || req.encyclopediastates || req.professions.length > 0);
};
//-----------------------------------------------------------------------------
// Set achievement descriptions
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setDescriptions = function(pre, post) {
	if(pre) this._predesc = pre;
	if(post) this._postdesc = post;
};
//-----------------------------------------------------------------------------
// Set achievement secret property
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setSecret = function(secret) {
	this._secret = secret;
};
//-----------------------------------------------------------------------------
// Get achievement name
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.getName = function() {
	return this._name;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isAutomatic = function() {
	return this._automatic;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isSecret = function() {
	return this._secret;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isEarned = function() {
	return this._earned;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.hasRewards = function() {
	return this._hasRewards;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.hasRequirements = function() {
	return this._hasRequirements;
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage achievement data. Stored as an array of achievement objects.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Call Initialize for achievements
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Achievements_createPluginData.call(this);
	this.initializeAchievements(false);
};
//-----------------------------------------------------------------------------
// Alias. Load new achievements after saved game load
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Achievements_CGMZCore_onAfterLoad.call(this);
	this.initializeAchievements(false);
};
//-----------------------------------------------------------------------------
// Initializes achievements
// If new achievements have been added, these will be added onto the end of the
// existing array.
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeAchievements = function(reinitialize) {
	if(!this._achievements || reinitialize) {
		this.setupAchievementVariables();
	}
	let id = this._achievements.length + 1;
	for(let i = 0; i < CGMZ.Achievements.Achievements.length; i++) {
		const achievement = new CGMZ_Achievement(CGMZ.Achievements.Achievements[i], id);
		const existingAchievement = this.getAchievementByName(achievement.getName());
		if(!existingAchievement) {
			this.commitAchievement(achievement);
			id++;
		}
		// start patch existing achievements by version number
		if(!this._cgmzAchievementsVersion && !existingAchievement._category && achievement._category) existingAchievement._category = achievement._category;
		// end patch
	}
	// set correct version number
	if(!this._cgmzAchievementsVersion) this._cgmzAchievementsVersion = 140;
};
//-----------------------------------------------------------------------------
// Set up variables for achievements
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementVariables = function() {
	this._achievements = [];
	this.setupAchievementCriteriaTypeArrays();
	this._usingAchievementPoints = false;
	this._achievetotal = 0;
	this._achievepts = 0;
	this._cgmzAchievementsVersion = 140;
};
//-----------------------------------------------------------------------------
// Commit the achievement to the achievement array
// Also store achievement criteria informations
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.commitAchievement = function(achievement) {
	this._achievements.push(achievement);
	if(achievement._points > 0) {
		this._usingAchievementPoints = true;
	}
	if(achievement.hasRequirements() && achievement.isAutomatic()) {
		const req = achievement._requirements
		if(req.currency > 0) {
			this._achievementTypes.currency.push(achievement._id);
		}
		if(req.steps > 0) {
			this._achievementTypes.steps.push(achievement._id);
		}
		if(req.saves > 0) {
			this._achievementTypes.saves.push(achievement._id);
		}
		if(req.playtime > 0) {
			this._achievementTypes.playtime.push(achievement._id);
		}
		if(req.battles > 0) {
			this._achievementTypes.battles.push(achievement._id);
		}
		if(req.escapes > 0) {
			this._achievementTypes.escapes.push(achievement._id);
		}
		if(req.wins > 0) {
			this._achievementTypes.wins.push(achievement._id);
		}
		if(req.achievepts > 0) {
			this._achievementTypes.achievepts.push(achievement._id);
		}
		if(req.achievetotal > 0) {
			this._achievementTypes.achievetotal.push(achievement._id);
		}
		if(req.encyclopediatotal > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediabestiary > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaarmors > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaitems > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaweapons > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaskills > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediastates > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.items.length > 0) {
			this._achievementTypes.items.push(achievement._id);
		}
		if(req.switches.length > 0) {
			this._achievementTypes.switches.push(achievement._id);
		}
		if(req.variables.length > 0) {
			this._achievementTypes.variables.push(achievement._id);
		}
		if(req.professions.length > 0) {
			this._achievementTypes.professions.push(achievement._id);
		}
	}
};
//-----------------------------------------------------------------------------
// Setup Achievement Type Arrays (for faster checking criteria)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementCriteriaTypeArrays = function() {
	this._achievementTypes = {}; // each property stores IDs of achievements with those criteria
	this._achievementTypes.currency = [];
	this._achievementTypes.steps = [];
	this._achievementTypes.battles = [];
	this._achievementTypes.escapes = [];
	this._achievementTypes.wins = [];
	this._achievementTypes.playtime = [];
	this._achievementTypes.saves = [];
	this._achievementTypes.achievetotal = [];
	this._achievementTypes.achievepts = [];
	this._achievementTypes.items = [];
	this._achievementTypes.switches = [];
	this._achievementTypes.variables = [];
	this._achievementTypes.encyclopedia = [];
	this._achievementTypes.professions = [];
};
//-----------------------------------------------------------------------------
// Earn achievement
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.earnAchievement = function(id) {
	const achievement = this.getAchievementByID(id);
	if(achievement.isEarned()) return;
	achievement._earned = true;
	this._achievetotal++;
	this._achievepts += achievement._points;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	achievement._earndate = $cgmzTemp.createDateText(day, month, year, CGMZ.Achievements.DateFormat, "/");
	if(achievement.hasRewards()) {
		this.giveAchievementRewards(achievement._rewards);
	}
	if(Imported.CGMZ_ToastManager && CGMZ.Achievements.ShowAchievementPop && achievement._popup.display) {
		this.setupAchievementToast(achievement);
	}
	this.checkAchievementAchieveptsCriteria();
	this.checkAchievementAchievetotalCriteria();
};
//-----------------------------------------------------------------------------
// Give achievement rewards
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.giveAchievementRewards = function(reward) {
	if(reward.currency > 0) {
		$gameParty.gainGold(reward.currency);
	}
	for(const itemObj of reward.items) {
		const item = $cgmzTemp.lookupItem(itemObj.type, itemObj.id)
		$gameParty.gainItem(item, itemObj.amt);
	}
	for(const switchObj of reward.switches) {
		$gameSwitches.setValue(switchObj.id, switchObj.value);
	}
	for(const variableObj of reward.variables) {
		try {
			oldValue = $gameVariables.value(variableObj.id);
			switch(variableObj.operator) {
				case "=": $gameVariables.setValue(variableObj.id, variableObj.value); break;
				case "+": $gameVariables.setValue(variableObj.id, oldValue + variableObj.value); break;
				case "-": $gameVariables.setValue(variableObj.id, oldValue - variableObj.value); break;
				case "*": $gameVariables.setValue(variableObj.id, oldValue * variableObj.value); break;
				case "/": $gameVariables.setValue(variableObj.id, oldValue / variableObj.value); break;
				case "%": $gameVariables.setValue(variableObj.id, oldValue % variableObj.value); break;
			}
		} catch (e) {
			$gameVariables.setValue(variableObj.id, 0);
		}
	}
};
//-----------------------------------------------------------------------------
// Sets up achievement toast window
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementToast = function(achievement) {
	let toastobj = {};
	const pop = achievement._popup;
	const seName = (pop.sound === "") ? CGMZ.Achievements.AchievementEarnedSound : pop.sound;
	toastobj.SE = {name: seName, pan: 0, pitch: 100, volume: 100};
	if(pop.image !== "") {
		toastobj.isImage = true;
		toastobj.picture = pop.image;
		toastobj.showBackground = false;
	} else {
		toastobj.isText = true;
		toastobj.lineOneAlignment = CGMZ.Achievements.AchievementEarnedAlignment;
		toastobj.lineOne = CGMZ.Achievements.AchievementEarnedText;
		toastobj.lineOneColor = CGMZ.Achievements.AchievementEarnedColor;
		toastobj.lineTwoAlignment = CGMZ.Achievements.AchievementEarnedAlignment;
		toastobj.lineTwo = achievement._name;
		toastobj.lineTwoColor = pop.color;
	}
	$cgmzTemp.createNewToast(toastobj);
};
//-----------------------------------------------------------------------------
// Check Achievement Criteria and Award if achievement is earned
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementForEarn = function(achievement) {
	if(!this.needCriteriaCheck(achievement)) return;
	const criteria = achievement._requirements;
	if(criteria.currency > 0 && $gameParty.gold() < criteria.currency) return;
	if(criteria.steps > 0 && $gameParty.steps() < criteria.steps) return;
	if(criteria.saves > 0 && $gameSystem.saveCount() < criteria.saves) return;
	if(criteria.battles > 0 && $gameSystem.battleCount() < criteria.battles) return;
	if(criteria.wins > 0 && $gameSystem.winCount() < criteria.wins) return;
	if(criteria.escapes > 0 && $gameSystem.escapeCount() < criteria.escapes) return;
	if(criteria.achievepts > 0 && this._achievepts < criteria.achievepts) return;
	if(criteria.achievetotal > 0 && this._achievetotal < criteria.achievetotal) return;
	if(criteria.playtime > 0 && $gameSystem.playtime() < criteria.playtime) return;
	if(criteria.encyclopediatotal > 0 && this.getEncyclopediaTotalPercent() < criteria.encyclopediatotal) return;
	if(criteria.encyclopediabestiary > 0 && this.getEncyclopediaBestiaryPercent() < criteria.encyclopediabestiary) return;
	if(criteria.encyclopediaitems > 0 && this.getEncyclopediaItemsPercent() < criteria.encyclopediaitems) return;
	if(criteria.encyclopediaarmors > 0 && this.getEncyclopediaArmorsPercent() < criteria.encyclopediaarmors) return;
	if(criteria.encyclopediaweapons > 0 && this.getEncyclopediaWeaponsPercent() < criteria.encyclopediaweapons) return;
	if(criteria.encyclopediaskills > 0 && this.getEncyclopediaSkillsPercent() < criteria.encyclopediaskills) return;
	if(criteria.encyclopediastates > 0 && this.getEncyclopediaStatesPercent() < criteria.encyclopediastates) return;
	for(let i = 0; i < criteria.professions.length; i++) {
		const profession = $cgmz.getProfession(criteria.professions[i].name);
		if(profession._level < criteria.professions[i].level) return;
	}
	for(const itemObj of criteria.items) {
		const item = $cgmzTemp.lookupItem(itemObj.type, itemObj.id);
		if($gameParty.numItems(item) < itemObj.amt) return;
	}
	for(const switchObj of criteria.switches) {
		if(switchObj.value != $gameSwitches.value(switchObj.id)) return;
	}
	for(const variableObj of criteria.variables) {
		const gameVariable = $gameVariables.value(variableObj.id);
		switch(variableObj.operator) {
			case ">": if(gameVariable <= variableObj.value) return; break;
			case ">=": if(gameVariable < variableObj.value) return; break;
			case "=": if(gameVariable != variableObj.value) return; break;
			case "<=": if(gameVariable > variableObj.value) return; break;
			case "<": if(gameVariable >= variableObj.value) return;
		}
	}
	this.earnAchievement(achievement._id);
};
//-----------------------------------------------------------------------------
// Determine if need to check for criteria?
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.needCriteriaCheck = function(achievement) {
	return !achievement._earned && achievement.hasRequirements();
};
//-----------------------------------------------------------------------------
// Check Achievement Currency Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementCurrencyCriteria = function() {
	for(const id of this._achievementTypes.currency) {
		const achievement = this.getAchievementByID(id);
		if($gameParty.gold() >= achievement._requirements.currency) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Steps Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementStepsCriteria = function() {
	for(const id of this._achievementTypes.steps) {
		const achievement = this.getAchievementByID(id);
		if($gameParty.steps() >= achievement._requirements.steps) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Saves Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementSavesCriteria = function() {
	for(const id of this._achievementTypes.saves) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.saveCount() >= achievement._requirements.saves) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Battles Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementBattlesCriteria = function() {
	for(const id of this._achievementTypes.battles) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.battleCount() >= achievement._requirements.battles) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Wins Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementWinsCriteria = function() {
	for(const id of this._achievementTypes.wins) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.winCount() >= achievement._requirements.wins) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Escapes Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementEscapesCriteria = function() {
	for(const id of this._achievementTypes.escapes) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.escapeCount() >= achievement._requirements.escapes) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Playtime Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementPlaytimeCriteria = function() {
	for(const id of this._achievementTypes.playtime) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.playtime() >= achievement._requirements.playtime) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Achievepts Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementAchieveptsCriteria = function() {
	for(const id of this._achievementTypes.achievepts) {
		const achievement = this.getAchievementByID(id);
		if($cgmz.countEarnedAchievementPoints() >= achievement._requirements.achievepts) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Achievetotal Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementAchievetotalCriteria = function() {
	for(const id of this._achievementTypes.achievetotal) {
		const achievement = this.getAchievementByID(id);
		if($cgmz.countEarnedAchievements() >= achievement._requirements.achievetotal) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Encyclopedia Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementEncyclopediaCriteria = function() {
	this._achievementTypes.encyclopedia.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if(achievement._requirements.encyclopediatotal > 0 && $cgmz.getEncyclopediaTotalPercent() >= achievement._requirements.encyclopediatotal) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediabestiary > 0 && $cgmz.getEncyclopediaBestiaryPercent() >= achievement._requirements.encyclopediabestiary) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaitems > 0 && $cgmz.getEncyclopediaItemsPercent() >= achievement._requirements.encyclopediaitems) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaarmors > 0 && $cgmz.getEncyclopediaArmorsPercent() >= achievement._requirements.encyclopediaarmors) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaweapons > 0 && $cgmz.getEncyclopediaWeaponsPercent() >= achievement._requirements.encyclopediaweapons) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaskills > 0 && $cgmz.getEncyclopediaSkillsPercent() >= achievement._requirements.encyclopediaskills) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediastates > 0 && $cgmz.getEncyclopediaStatesPercent() >= achievement._requirements.encyclopediastates) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Items Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementItemsCriteria = function() {
	this._achievementTypes.items.forEach(function(id) {
		const achievement = this.getAchievementByID(id);
		const criteria = achievement._requirements;
		for(const itemObj of criteria.items) {
			const item = $cgmzTemp.lookupItem(itemObj.type, itemObj.id);
			if($gameParty.numItems(item) >= itemObj.amt) {
				this.checkAchievementForEarn(achievement);
				return;
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Switches Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementSwitchesCriteria = function() {
	this._achievementTypes.switches.forEach(function(id) {
		const achievement = this.getAchievementByID(id);
		const criteria = achievement._requirements;
		for(const switchObj of criteria.switches) {
			if(switchObj.value == $gameSwitches.value(switchObj.id)) {
				this.checkAchievementForEarn(achievement);
				return;
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Variables Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementVariablesCriteria = function() {
	this._achievementTypes.variables.forEach(function(id) {
		const achievement = this.getAchievementByID(id);
		const criteria = achievement._requirements;
		for(const variableObj of criteria.variables) {
			const gameVariable = $gameVariables.value(variableObj.id);
			if(variableObj.operator === ">") {
				if(gameVariable > variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === ">=") {
				if(gameVariable >= variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "=") {
				if(gameVariable === variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "<=") {
				if(gameVariable <= variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "<") {
				if(gameVariable < variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Professions Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementProfessionCriteria = function() {
	this._achievementTypes.professions.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		var needCheck = true;
		for(var i = 0; i < achievement._requirements.professions.length; i++) {
			var profession = $cgmz.getProfession(achievement._requirements.professions[i].name);
			if(achievement._requirements.professions[i].level > profession._level) {
				needCheck = false;
			}
		}
		if(needCheck) this.checkAchievementForEarn(achievement);
	}, this);
};
//-----------------------------------------------------------------------------
// Get achievement array
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievements = function() {
	return this._achievements;
};
//-----------------------------------------------------------------------------
// Get achievement by ID, returns undefined if no achievement found
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievementByID = function(id) {
	return this._achievements.find(achievement => achievement._id === id);
};
//-----------------------------------------------------------------------------
// Get achievement by name, returns undefined if no achievement found
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievementByName = function(name) {
	return this._achievements.find(achievement => achievement.getName() === name);
};
//-----------------------------------------------------------------------------
// Get achievement earned count
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countEarnedAchievements = function() {
	return this._achievetotal;
};
//-----------------------------------------------------------------------------
// Get achievement point count
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countEarnedAchievementPoints = function() {
	return this._achievepts;
};
//-----------------------------------------------------------------------------
// Get total amount of achievements
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countTotalAchievements = function() {
	return this._achievements.length;
};
//-----------------------------------------------------------------------------
// Get total amount of achievement points
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countTotalAchievementPoints = function() {
	let points = 0;
	for(const achievement of this._achievements) {
		points += achievement._points;
	}
	return points;
};
//-----------------------------------------------------------------------------
// Achievements have points?
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.usingAchievementPoints = function() {
	return this._usingAchievementPoints;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Adds plugin commands, handling for category data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize achievmeent data
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Achievements_CGMZ_Temp_createPluginData.call(this);
	this.initializeAchievementData();
};
//-----------------------------------------------------------------------------
// Initialize achievement data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeAchievementData = function() {
	this._achievementCategories = {};
	for(const catJSON of CGMZ.Achievements.Categories) {
		const category = JSON.parse(catJSON);
		this._achievementCategories[category.id] = category.Name;
	}
};
//-----------------------------------------------------------------------------
// Get achievement categories as array
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAchievementCategories = function() {
	return Object.keys(this._achievementCategories);
};
//-----------------------------------------------------------------------------
// Get achievement category by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAchievementCategory = function(id) {
	return this._achievementCategories[id];
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Achievements_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Achievements", "Reinitialize", this.pluginCommandAchievementsReinitialize);
	PluginManager.registerCommand("CGMZ_Achievements", "Call Scene", this.pluginCommandAchievementsCallScene);
	PluginManager.registerCommand("CGMZ_Achievements", "Earn Achievement By Name", this.pluginCommandAchievementsEarnByName);
	PluginManager.registerCommand("CGMZ_Achievements", "Earn Achievement By ID", this.pluginCommandAchievementsEarnByID);
	PluginManager.registerCommand("CGMZ_Achievements", "Change Description", this.pluginCommandAchievementsChangeDescription);
	PluginManager.registerCommand("CGMZ_Achievements", "Change Secret", this.pluginCommandAchievementsChangeSecret);
};
//-----------------------------------------------------------------------------
// Earn an achievement by its name
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsEarnByName = function(args) {
	const achievement = $cgmz.getAchievementByName(args.name);
	if(achievement) {
		$cgmz.earnAchievement(achievement._id);
	}
};
//-----------------------------------------------------------------------------
// Earn an achievement by its ID
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsEarnByID = function(args) {
	const achievement = $cgmz.getAchievementByID(Number(args.id));
	if(achievement) {
		$cgmz.earnAchievement(achievement._id);
	}
};
//-----------------------------------------------------------------------------
// Reinitialize the achievement data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsReinitialize = function() {
	$cgmz.initializeAchievements(true);
};
//-----------------------------------------------------------------------------
// Call the Achievements Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsCallScene = function() {
	SceneManager.push(CGMZ_Scene_Achievements);
};
//-----------------------------------------------------------------------------
// Change an achievement description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsChangeDescription = function(args) {
	const achievement = (args.name) ? $cgmz.getAchievementByName(args.name) : $cgmz.getAchievementByID(Number(args.id));
	if(achievement) {
		const pre = JSON.parse(args["Pre Description"]);
		const post = JSON.parse(args["Post Description"]);
		achievement.setDescriptions(pre, post);
	}
};
//-----------------------------------------------------------------------------
// Change an achievement secret property
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsChangeSecret = function(args) {
	const achievement = (args.name) ? $cgmz.getAchievementByName(args.name) : $cgmz.getAchievementByID(Number(args.id));
	if(achievement) achievement.setSecret(args.secret === 'true');
};
//=============================================================================
// CGMZ_Scene_Achievements
//-----------------------------------------------------------------------------
// Scene that controls achievement display windows.
// Call with SceneManager.push(CGMZ_Scene_Achievements);
//=============================================================================
function CGMZ_Scene_Achievements() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Achievements.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Achievements.prototype.constructor = CGMZ_Scene_Achievements;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._categories = $cgmzTemp.getAchievementCategories();
};
//-----------------------------------------------------------------------------
// Create achievement windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCategoryWindow();
	this.createListWindow();
	this.createTotalsWindow();
	this.createAchievementWindow();
};
//-----------------------------------------------------------------------------
// Prepare achievement scene
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.prepare = function(categories = null) {
	if(categories) this._categories = categories;
};
//-----------------------------------------------------------------------------
// Check if categories exist
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.hasCategories = function() {
	return $cgmzTemp.getAchievementCategories().length > 0;
};
//-----------------------------------------------------------------------------
// Create achievement category window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
	const activate = this.hasCategories();
    this._categoryWindow = new CGMZ_Achievement_Window_Category(rect, activate, this._categories);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Achievement category window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.buttonAreaHeight();
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true) * this.hasCategories();
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
	const activate = !this.hasCategories();
    this._listWindow = new CGMZ_Achievement_Window_List(rect, activate);
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.listWindowRect = function() {
	const x = 0;
	const y = this._categoryWindow.y + this._categoryWindow.height;
	const width = Graphics.boxWidth / 3;
	const lines = 1 + ($cgmz.usingAchievementPoints())*1;
	const height = Graphics.boxHeight - y - this.calcWindowHeight(lines, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement totals window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createTotalsWindow = function() {
	const rect = this.totalsWindowRect();
    this._totalsWindow = new CGMZ_Achievement_Window_Totals(rect);
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Get totals window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.totalsWindowRect = function() {
	const x = 0;
	const y = this._listWindow.y + this._listWindow.height;
	const width = this._listWindow.width;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createAchievementWindow = function() {
	const rect = this.achievementWindowRect();
    this._achievementWindow = new CGMZ_Achievement_Window_Display(rect);
	this._listWindow.setHelpWindow(this._achievementWindow);
	this._achievementWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
	this._achievementWindow.deactivate();
    this.addWindow(this._achievementWindow);
};
//-----------------------------------------------------------------------------
// Get achievement window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.achievementWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - x;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onCategoryOk = function() {
	this._listWindow.select(0);
	this._listWindow.activate();
	this._categoryWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On list Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onListCancel = function() {
	if(this.hasCategories()) {
		this._achievementWindow.setItem(null);
		this._achievementWindow.contents.clear();
		this._listWindow.deactivate();
		this._listWindow.deselect();
		this._categoryWindow.activate();
	} else {
		this.popScene();
	}
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onListOk = function() {
	this._achievementWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onDisplayCancel = function() {
	this._listWindow.activate();
    this._achievementWindow.deactivate();
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.Achievements.SceneBackground) {
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadPicture(CGMZ.Achievements.SceneBackground);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Achievement_Window_Category
//-----------------------------------------------------------------------------
// Command window for choosing a category in the achievement scene
//=============================================================================
function CGMZ_Achievement_Window_Category(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Category.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Achievement_Window_Category.prototype.constructor = CGMZ_Achievement_Window_Category;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.initialize = function(rect, activate, categories) {
	this._categories = categories;
    Window_HorzCommand.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
	this.deactivate();
	if(activate) this.activate();
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.maxCols = function() {
    return CGMZ.Achievements.CategoryColumns;
};
//-----------------------------------------------------------------------------
// Text alignment of categories
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.itemTextAlign = function() {
    return CGMZ.Achievements.CategoryWindowAlignment;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.makeCommandList = function() {
	for(const categoryId of this._categories) {
		const name = $cgmzTemp.getAchievementCategory(categoryId);
		const symbol = categoryId;
		this.addCommand(name, symbol, true);
	}
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	this.resetTextColor();
	this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, this.itemTextAlign());
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.callUpdateHelp = function() {
	if(this.active) this.updateHelperWindows();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.updateHelperWindows = function() {
	if(this._listWindow) this._listWindow.setItem(this.currentData());
};
//=============================================================================
// CGMZ_Achievement_Window_List
//-----------------------------------------------------------------------------
// Selectable window for choosing an achievement in a list.
// Will not show hidden achievements.
//=============================================================================
function CGMZ_Achievement_Window_List() {
    this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_List.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Achievement_Window_List.prototype.constructor = CGMZ_Achievement_Window_List;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.initialize = function(rect, activate) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
	this._category = null;
	this._usingCategories = !activate;
    this.refresh();
	if(activate) {
		this.activate();
		this.select(0);
	}
};
//-----------------------------------------------------------------------------
// Max achievements to be shown
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Currently selected achievement
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Determine if achievement is enabled
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.isEnabled = function(achievement) {
    return (achievement && achievement.isEarned());
};
//-----------------------------------------------------------------------------
// Refresh window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make list of achievements
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.makeItemList = function() {
    this._data = [];
	for(const achievement of $cgmz.getAchievements()) {
		if((!achievement.isSecret() || achievement.isEarned() || CGMZ.Achievements.ShowSecretAchievements) &&
			(!this._usingCategories || this._category === achievement._category)) {
			this._data.push(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Draw achievement names
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.drawItem = function(index) {
    const achievement = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const name = (achievement.isSecret() && !achievement.isEarned()) ? CGMZ.Achievements.SecretText : achievement.getName();
    this.changePaintOpacity(this.isEnabled(achievement));
	this.drawText(name, rect.x, rect.y, rect.width, CGMZ.Achievements.ListWindowAlignment);
};
//-----------------------------------------------------------------------------
// Update helper window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};
//-----------------------------------------------------------------------------
// Update helper window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.setItem = function(category) {
	if(category && this._category !== category.symbol) {
		this._category = category.symbol;
		this.refresh();
	}
};
//=============================================================================
// CGMZ_Achievement_Window_Totals
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMZ_Achievement_Window_Totals() {
    this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Totals.prototype = Object.create(Window_Base.prototype);
CGMZ_Achievement_Window_Totals.prototype.constructor = CGMZ_Achievement_Window_Totals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.refresh = function() {
    this.contents.clear();
	const earned = $cgmz.countEarnedAchievements();
	let text = CGMZ.Achievements.EarnedCountText + earned;
	if(CGMZ.Achievements.ShowTotalAchievements) text += " / " + $cgmz.countTotalAchievements();
    this.drawText(text, 0, 0, this.contents.width, CGMZ.Achievements.TotalWindowAlignment);
	if($cgmz.usingAchievementPoints()) {
		const points = $cgmz.countEarnedAchievementPoints();
		text = CGMZ.Achievements.PointsWindowText + points;
		if(CGMZ.Achievements.ShowTotalPoints) text += " / " + $cgmz.countTotalAchievementPoints();
		this.drawText(text, 0, this.lineHeight(), this.contents.width, CGMZ.Achievements.TotalWindowAlignment);
	}
};
//=============================================================================
// CGMZ_Achievement_Window_Display
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMZ_Achievement_Window_Display() {
    this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Display.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Achievement_Window_Display.prototype.constructor = CGMZ_Achievement_Window_Display;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Achievements.ScrollWait, CGMZ.Achievements.ScrollSpeed, CGMZ.Achievements.AutoScroll, CGMZ.Achievements.ScrollDeceleration);
	this._achievement = null;
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
};
//-----------------------------------------------------------------------------
// Set the achievement to be displayed
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.setItem = function(achievement) {
	if(this._achievement === achievement) return;
	this._achievement = achievement;
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.refresh = function() {
	if(!this._achievement) return;
	this.setupWindowForNewEntry();
	const achievement = this._achievement;
	const achieveName = (achievement.isSecret() && !achievement.isEarned()) ? CGMZ.Achievements.SecretText : achievement.getName();
	const currencyColor1 = ColorManager.textColor(CGMZ.Achievements.CurrencyGaugeColor1);
	const currencyColor2 = ColorManager.textColor(CGMZ.Achievements.CurrencyGaugeColor2);
	const itemGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.ItemGaugeColor1);
	const itemGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.ItemGaugeColor2);
	const switchVarGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.SwitchVarGaugeColor1);
	const switchVarGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.SwitchVarGaugeColor2);
	const genericGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.GenericGaugeColor1);
	const genericGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.GenericGaugeColor2);
	for(const display of CGMZ.Achievements.AchievementDisplayInfo) {
		switch(display) {
			case "Name":
				this.drawText(achieveName, 0, this._neededHeight, this.contents.width, 'center');
				this._neededHeight += this.lineHeight();
				break;
			case "Earn Date":
				if(achievement.isEarned()) {
					this.drawStandardLine(CGMZ.Achievements.EarnedText, achievement._earndate, 0);
				} else {
					this.drawText(CGMZ.Achievements.UnearnedText, 0, this._neededHeight, this.contents.width, 'left');
				}
				this._neededHeight += this.lineHeight();
				break;
			case "Basic Info Header":
				this.CGMZ_drawHeader(CGMZ.Achievements.BasicInfoHeaderText, this._neededHeight);
				this._neededHeight += this.lineHeight();
				break;
			case "Difficulty":
				if(achievement._difficulty) {
					this.drawStandardLine(CGMZ.Achievements.DifficultyText, achievement._difficulty, 0);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Points":
				if(achievement._points) {
					this.drawStandardLine(CGMZ.Achievements.PointsText, achievement._points, 0);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Description":
				if(achievement._predesc && !achievement.isEarned()) {
					this._neededHeight += this.drawAchievementDescription(achievement._predesc);
				} else if(achievement._postdesc && achievement.isEarned()) {
					this._neededHeight += this.drawAchievementDescription(achievement._postdesc);
				}
				break;
			case "Description Header":
				if((achievement._predesc && !achievement.isEarned()) || (achievement._postdesc && achievement.isEarned())) {
					this.CGMZ_drawHeader(CGMZ.Achievements.DescriptionHeaderText, this._neededHeight);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Requirements":
				if(this.canShowCriteria(achievement)) {
					const req = achievement._requirements;
					if(CGMZ.Achievements.RequirementText) {
						this.drawLabel(CGMZ.Achievements.RequirementText, 0, 'center');
						this._neededHeight += this.lineHeight();
					}
					this._neededHeight += this.drawCriteriaProgress(0, $gameParty.gold(), req.currency, currencyColor1, currencyColor2, TextManager.currencyUnit, achievement);
					this._neededHeight += this.drawCriteriaProgress(0, $gameParty.steps(), req.steps, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.StepsText, achievement);
					this._neededHeight += this.drawCriteriaProgress(0, $gameSystem.saveCount(), req.saves, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.SavesText, achievement);
					this._neededHeight += this.drawCriteriaProgress(0, $gameSystem.battleCount(), req.battles, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.BattlesText, achievement);
					this._neededHeight += this.drawCriteriaProgress(0, $gameSystem.winCount(), req.wins, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.WinsText, achievement);
					this._neededHeight += this.drawCriteriaProgress(0, $gameSystem.escapeCount(), req.escapes, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EscapesText, achievement);
					this._neededHeight += this.drawCriteriaProgress(0, $cgmz.countEarnedAchievements(), req.achievetotal, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.AchievementProgressText, achievement);
					this._neededHeight += this.drawCriteriaProgress(0, $cgmz.countEarnedAchievementPoints(), req.achievepts, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.PointsProgressText, achievement);
					if(Imported.CGMZ_Encyclopedia) {
						this._neededHeight += this.drawCriteriaProgress(0, $cgmz.getEncyclopediaTotalPercent(), req.encyclopediatotal, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncTotalText, achievement);
						this._neededHeight += this.drawCriteriaProgress(0, $cgmz.getEncyclopediaBestiaryPercent(), req.encyclopediabestiary, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncBestiaryText, achievement);
						this._neededHeight += this.drawCriteriaProgress(0, $cgmz.getEncyclopediaItemsPercent(), req.encyclopediaitems, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncItemsText, achievement);
						this._neededHeight += this.drawCriteriaProgress(0, $cgmz.getEncyclopediaWeaponsPercent(), req.encyclopediaweapons, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncWeaponsText, achievement);
						this._neededHeight += this.drawCriteriaProgress(0, $cgmz.getEncyclopediaArmorsPercent(), req.encyclopediaarmors, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncArmorsText, achievement);
						this._neededHeight += this.drawCriteriaProgress(0, $cgmz.getEncyclopediaSkillsPercent(), req.encyclopediaskills, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncSkillsText, achievement);
						this._neededHeight += this.drawCriteriaProgress(0, $cgmz.getEncyclopediaStatesPercent(), req.encyclopediastates, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncStatesText, achievement);
					}
					for(let i = 0; i < req.professions.length; i++) {
						const name = req.professions[i].name;
						const profession = $cgmz.getProfession(name);
						this._neededHeight += this.drawCriteriaProgress(0, profession._level, req.professions[i].level, genericGaugeColor1, genericGaugeColor2, " " + name + " " + CGMZ.Achievements.ProfLevelText, achievement);
					}
					if(req.playtime) {
						let max = $gameSystem.playtime();
						if(achievement.isEarned() || max > req.playtime) {
							max = req.playtime;
						}
						const timeArray1 = $cgmzTemp.approximateTimeValue(req.playtime);
						const timeArray2 = $cgmzTemp.approximateTimeValue(max);
						let descriptor = timeArray2[0] + " " + timeArray2[1] + " / " + timeArray1[0] + " " + timeArray1[1] + " " + CGMZ.Achievements.PlayedText;
						this.drawGauge(0, this._neededHeight, this.contents.width, genericGaugeColor1, genericGaugeColor2, max, req.playtime, descriptor);
						this._neededHeight += this.lineHeight();
					}
					this._neededHeight += this.drawCriteriaItems(achievement.isEarned(), req.items, 0, itemGaugeColor1, itemGaugeColor2);
					this._neededHeight += this.drawCriteriaSwitches(achievement.isEarned(), req.switches, 0, switchVarGaugeColor1, switchVarGaugeColor2);
					this._neededHeight += this.drawCriteriaVariables(achievement.isEarned(), req.variables, 0, switchVarGaugeColor1, switchVarGaugeColor2);
				}
				break;
			case "Requirement Header":
				if(this.canShowCriteria(achievement)) {
					this.CGMZ_drawHeader(CGMZ.Achievements.RequirementHeaderText, this._neededHeight);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Rewards":
				if(this.canShowRewards(achievement)) {
					const rewards = achievement._rewards;
					if(CGMZ.Achievements.RewardText) {
						this.drawLabel(CGMZ.Achievements.RewardText, 0, 'center');
						this._neededHeight += this.lineHeight();
					}
					if(rewards.currency) {
						const space = CGMZ.Achievements.CurrencyUnitSpace ? " " : "";
						this.drawText(rewards.currency + space + TextManager.currencyUnit, 0, this._neededHeight, this.contents.width, 'left');
						this._neededHeight += this.lineHeight();
					}
					this._neededHeight += this.drawRewardsItems(rewards.items, 0);
					this._neededHeight += this.drawRewardsSwitchesAndVariables(rewards.switches, 0);
					this._neededHeight += this.drawRewardsSwitchesAndVariables(rewards.variables, 0);
				}
				break;
			case "Reward Header":
				if(this.canShowRewards(achievement)) {
					this.CGMZ_drawHeader(CGMZ.Achievements.RewardHeaderText, this._neededHeight);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
};
//-----------------------------------------------------------------------------
// Draw a standard line of 1 label + 1 piece of text
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawStandardLine = function(label, text, x) {
	this.drawLabel(label, x);
	x = this.textWidth(label);
	this.drawText(text, x, this._neededHeight, this.contents.width - x, "left");
};
//-----------------------------------------------------------------------------
// Draw label / header text
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawLabel = function(label, x, alignment = "left") {
	this.changeTextColor(ColorManager.textColor(CGMZ.Achievements.LabelColor));
	this.drawText(label, x, this._neededHeight, this.contents.width - x, alignment);
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Draw criteria progress with gauge
// Returns the one line height (this function draws 1 line when called)
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaProgress = function(x, numerator, denominator, color1, color2, criteriaText, achievement) {
	if(denominator <= 0) return 0;
	let max = numerator;
	if(achievement.isEarned() || numerator > denominator) {
		max = denominator;
	}
	const descriptor = max + " / " + denominator + " " + criteriaText;
	this.drawGauge(x, this._neededHeight, this.contents.width - x, color1, color2, max, denominator, descriptor);
	return this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw criteria items progress
// Returns the output height of what was drawn
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaItems = function(earned, itemArray, x, color1, color2) {
	let outputHeight = 0;
	for(const criteriaObj of itemArray) {
		const item = $cgmzTemp.lookupItem(criteriaObj.type, criteriaObj.id);
		const denominator = criteriaObj.amt;
		let max = $gameParty.numItems(item);
		if(earned || max > denominator) max = denominator;
		const descriptor = max + " / " + criteriaObj.amt;
		this.drawGauge(x, this._neededHeight + outputHeight, this.contents.width - x, color1, color2, max, denominator, descriptor, item);
		outputHeight += this.lineHeight();
	}
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw criteria switches progress
// Returns the output height of what was drawn
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaSwitches = function(earned, switchArray, x, color1, color2) {
	let outputHeight = 0;
	for(const switchObj of switchArray) {
		const switchval = $gameSwitches.value(switchObj.id);
		const max = (earned) ? 1 : (switchval == switchObj.value) ? 1 : 0;
		const descriptor = switchObj.description + " " + max + " / 1";
		this.drawGauge(x, this._neededHeight + outputHeight, this.contents.width - x, color1, color2, max, 1, descriptor);
		outputHeight += this.lineHeight();
	}
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw criteria variables progress
// Due to so many options for variables and not really making sense for gauges,
// it treats it like a switch.
// Returns the output height of what was drawn
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaVariables = function(earned, variableArray, x, color1, color2) {
	let outputHeight = 0;
	for(const variableObj of variableArray) {
		let max = 0;
		let denominator = 1;
		let descriptor = "";
		if(variableObj.operator !== ">" && variableObj.operator !== ">=") {
			max = 0
			if(earned || ($gameVariables.value(variableObj.id) <= variableObj.value && variableObj.operator !== "=") ||
			   (variableObj.operator === "=" && $gameVariables.value(variableObj.id) === variableObj.value)) {
				max = 1;
			}
			denominator = 1;
			descriptor = variableObj.description + " " + max + " / 1";
		}
		else {
			denominator = (variableObj.operator === '>') ? variableObj.value + 1 : variableObj.value;
			max = $gameVariables.value(variableObj.id);
			if(earned || max > denominator) {
				max = denominator;
			}
			descriptor = variableObj.description + " " + max + " / " + denominator;
		}
		this.drawGauge(x, this._neededHeight + outputHeight, this.contents.width - x, color1, color2, max, denominator, descriptor);
		outputHeight += this.lineHeight();
	}
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw item rewards
// Returns the output height of what was drawn
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsItems = function(itemArray, x, width) {
	let outputHeight = 0;
	for(const rewardObj of itemArray) {
		const item = $cgmzTemp.lookupItem(rewardObj.type, rewardObj.id)
		const descriptor = rewardObj.amt + "x ";
		this.drawText(descriptor, x, this._neededHeight + outputHeight, this.contents.width, 'left');
		const amtWidth = this.textWidth(descriptor);
		this.drawItemName(item, amtWidth, this._neededHeight + outputHeight, this.contents.width - amtWidth);
		outputHeight += this.lineHeight();
	}
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw switch rewards
// Returns the output height of what was drawn
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsSwitchesAndVariables = function(objArray, x) {
	let outputHeight = 0;
	for(const obj of objArray) {
		this.drawText(obj.description, x, this._neededHeight + outputHeight, this.contents.width, 'left');
		outputHeight += this.lineHeight();
	}
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Determine if the window should show criteria
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.canShowCriteria = function(achievement) {
	if(achievement.isEarned() && !CGMZ.Achievements.ShowCriteriaAfterCompletion) return false;
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	return achievement.hasRequirements();
};
//-----------------------------------------------------------------------------
// Determine if the window should show rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.canShowRewards = function(achievement) {
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	return achievement.hasRewards();
};
//-----------------------------------------------------------------------------
// Draw achievement description
// Returns the output height of what was drawn
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawAchievementDescription = function(description) {
	this.drawLabel(CGMZ.Achievements.DescriptionText, 0);
	const xOffset = this.textWidth(CGMZ.Achievements.DescriptionText);
	const outputHeight = this.CGMZ_drawText(description, 0, xOffset, this._neededHeight, this.contents.width, 'left');
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw a gauge
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawGauge = function(x, y, width, color1, color2, numerator, denominator, descriptor, item = null) {
	const gaugeHeight = 12;
	const gaugeRect = new Rectangle(x, y + this.lineHeight() - gaugeHeight, width, gaugeHeight);
	const rate = (denominator !== 0) ? numerator/denominator : 0;
	this.CGMZ_drawGauge(gaugeRect, rate, color1, color2);
	const padding = 10;
	this.drawText(descriptor, x + padding, y, width);
	if(item) {
		const itemX = x + padding + this.textWidth(descriptor + " ");
		this.drawItemName(item, itemX, y, width-x);
	}
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Automatic tracking for gold, steps, and items
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have currency criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    alias_CGMZ_Achievements_GameParty_gainGold.call(this, amount);
	if(amount > 0) $cgmz.checkAchievementCurrencyCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have steps criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
	alias_CGMZ_Achievements_GameParty_increaseSteps.call(this);
	$cgmz.checkAchievementStepsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have items criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    alias_CGMZ_Achievements_GameParty_gainItem.call(this, item, amount, includeEquip);
	if(amount > 0) $cgmz.checkAchievementItemsCriteria();
};
//=============================================================================
// Game_System
//-----------------------------------------------------------------------------
// Automatic tracking for battles, wins, escapes, saves
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have battles criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleStart = Game_System.prototype.onBattleStart;
Game_System.prototype.onBattleStart = function() {
    alias_CGMZ_Achievements_GameSystem_onBattleStart.call(this);
	$cgmz.checkAchievementBattlesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have wins criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleWin = Game_System.prototype.onBattleWin;
Game_System.prototype.onBattleWin = function() {
    alias_CGMZ_Achievements_GameSystem_onBattleWin.call(this);
	$cgmz.checkAchievementWinsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have escapes criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleEscape = Game_System.prototype.onBattleEscape;
Game_System.prototype.onBattleEscape = function() {
	alias_CGMZ_Achievements_GameSystem_onBattleEscape.call(this);
    $cgmz.checkAchievementEscapesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have saves criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
	alias_CGMZ_Achievements_GameSystem_onBeforeSave.call(this);
    $cgmz.checkAchievementSavesCriteria();
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Automatic tracking for playtime (Using Scene Map so playtime achievements do
// not update in battle or mid-scene
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have playtime criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMZ_Achievements_SceneMap_update.call(this);
	if(Graphics.frameCount % 60 == 0) $cgmz.checkAchievementPlaytimeCriteria();
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Automatic tracking for switches
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have switch criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSwitches_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
    alias_CGMZ_Achievements_GameSwitches_onChange.call(this);
	$cgmz.checkAchievementSwitchesCriteria();
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Automatic tracking for variables
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have variable criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameVariables_onChange = Game_Variables.prototype.onChange;
Game_Variables.prototype.onChange = function() {
    alias_CGMZ_Achievements_GameVariables_onChange.call(this);
	$cgmz.checkAchievementVariablesCriteria();
};