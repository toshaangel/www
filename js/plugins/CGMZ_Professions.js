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
 * Version: 1.4.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: Creates a profession system for your game. Discover
 * professions, gain experience, and level up. Profession data is easily
 * accessed and can be used for things like restricting the player from 
 * harvesting resources if their level is not high enough, or many other
 * uses.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Colors support either hex format (ex. #ffffff) or rgb format 
 * (ex. rgb(255, 255, 255))
 * -------------------------------JavaScript-----------------------------------
 * The JS to call the scene is: SceneManager.push(CGMZ_Scene_Professions);
 * -------------------------------Note Tags------------------------------------
 * • Temporary Buff Note Tag (Items):
 * <cgmzprofbuff:profName,buffAmount,frameCount,stackable>
 * - profName should be the profession's name (case sensitive)
 * - buffAmount should be a number that will be added to the profession's level
 * - frameCount should be a number which is how many frames the buff will last
 *   (60f = 1 sec)
 * - stackable should be either "true" or "false" and determines if the buff
 *   will stack with other buffs or not
 * 
 * An example notetag may be:
 * <cgmzprofbuff:Mining,5,3600,true>
 *
 * You can also combine multiple buffs using the & character.
 * An example combined notetag may look like this:
 * <cgmzprofbuff:Mining,5,3600,true&Fishing,5,3600,true>
 * This example would buff both Mining and Fishing by 5 for 3600 frames (1min)
 *
 * • Permanent buff (while equipped) note tag (Weapon, Armor):
 * <cgmzprofbuff:profName,buffAmount>
 * - profName should be the profession's name (case sensitive)
 * - buffAmount should be a number that will be added to the profession's level
 *
 * An example notetag may be:
 * <cgmzprofbuff:Mining,5>
 * This would provide a buff of 5 skill levels to Mining.
 *
 * You can also combine multiple buffs using the & character.
 * An example combined notetag may look like this:
 * <cgmzprofbuff:Mining,5&Fishing,5>
 * This example would buff both Mining and Fishing by 5 levels
 *
 * These buffs on Weapon & Armor are permanent while equipped, and stack.
 *
 * Note for actor-specific professions: add -actorId onto the profession name.
 * For example, if your profession has name Mining and is for Actor ID 2,
 * you would put Mining-2 as the profession name,
 * ----------------------------Plugin Commands---------------------------------
 * • Call Scene
 * Calls the profession scene.
 *
 * • Reinitialize
 * This will reinitialize all profession data as if you had started a new game.
 * Use for saved game testing.
 *
 * • Discover Profession
 * This will discover (or undiscover) a given profession.
 *
 * • Change Description
 * Allows you to set a profession's description.
 *
 * • Change Exp
 * Allows you to set, add, or subtract experience from the provided profession.
 *
 * • Change Level
 * Allows you to set, add, or subtract levels from the provided profession.
 *
 * • Get Profession Level
 * Allows you to store the profession's level in a variable.
 * 
 * • Get Buffed Level
 * Allows you to store the profession's level + any buffs in a variable.
 *
 * • Add Buff
 * Use this to add a temporary buff to a profession's level.
 *
 * • Remove Buff
 * Usually buffs expire automatically, but if you need to manually remove one
 * you can use this plugin command.
 * ------------------------------Integrations----------------------------------
 * This plugin has special functionality when used with certain other CGMZ
 * plugins:
 *
 * • CGMZ Crafting
 * CGMZ Professions comes with the option to display known recipes from CGMZ
 * Crafting in the Profession Display window.
 *
 * • CGMZ Toast Manager
 * CGMZ Professions has the option to display toasts via CGMZ Toast Manager
 * when certain actions occur. These actions are when leveling up, and when
 * discovering a profession.
 *
 * • CGMZ Screenshots
 * CGMZ Professions comes with the option to take a screenshot of the game
 * screen upon level up. You can also set the filename of the screenshot. When
 * changing the filename, please do not use any spaces in the filename.
 * ------------------------------Saved Games-----------------------------------
 * This plugin partially supports saved games.
 *
 * ✓ You can add the plugin and add professions which will show up
 * ✓ You can remove the plugin with no issue to saved data
 * ✘ You cannot modify existing professions in saved games
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Professions.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.1:
 * - Added a plugin command to get the profession level
 *
 * Version 1.0.2:
 * - Added option to display a toast window on discovery of profession
 *
 * Version 1.1.0:
 * - Added temporary buffs (or debuffs) when using items or plugin command
 * - Added ability to use text codes in profession descriptions
 * - Added ability to use custom icon image in place of big icon in display
 *   window
 * - Added option to change label text color
 * - Added option to use transparent windows
 * - Added option to use a custom scene background image
 * - Added plugin command to change description
 * - New professions are now loaded automatically in saved games without
 *   needing to use reinitialize plugin command
 *
 * Version 1.1.1:
 * - Change to profession buffs to make them more efficient for other plugins
 *
 * Version 1.1.2:
 * - Fix bug with level up toast having an extra ":" in the string
 *
 * Version 1.2.0:
 * - Added customization option for display window, now you can drag + drop a
 *   parameter to determine what displays and what order it displays in
 * - Added ability for worn equipment to provide a buff to profession levels
 * - Documentation update
 *
 * Version 1.3.0:
 * - Added option to display known recipes from CGMZ Crafting
 * - Added option to take a screenshot on level up if using CGMZ Screenshots
 * - Added option to fill space where touch UI buttons would be
 * - Added option to use different windowskin for each profession window
 * - Added option to set the list window width
 * - Added option to display the list window on the right
 * - Added Spanish Language support
 *
 * Version 1.4.0:
 * - Professions can now be actor-specific.
 *   - You can now call the professions scene and only display certain
 *   Actors professions in it.
 *   - Plugin Commands have been updated to be able to refer to specific actors
 *   - The total window can display totals for only the current actor
 *   - Buff meta tags have been updated to allow for actor-specific professions
 * - Added more control over profession toast sound effects
 * - Added option to change the alignment of text in the total window
 * - Toast sound effect data is no longer part of save data
 * - This plugin no longer crashes when parsing invalid JSON. Instead, it warns
 *   you in the dev tool console if it encounters invalid JSON. It is still
 *   important to fix these errors if you want the plugin to work correctly.
 *
 * Version 1.4.1:
 * - Bug fix for actor-specific profession plugin command crash
 *
 * Version 1.4.2:
 * - Added parameters to change the line gradient color in headers
 * - Bug fix for discover profession plugin command when actor set to 0
 * - Icon parameters now use plugin manager icon select ui
 * - Color parameters now use plugin manager color select ui where possible
 *
 * @command Reinitialize
 * @desc Reinitializes all profession data. Use this if your saved game does not recognize new profession data.
 *
 * @command Call Scene
 * @desc Calls the Profession scene
 *
 * @arg actors
 * @type actor[]
 * @default 0
 * @desc The actors to include in the profession scene
 *
 * @arg party
 * @type boolean
 * @default true
 * @desc Include the Party category?
 *
 * @command discover
 * @text Discover Profession
 * @desc Discovers a profession (or undiscovers a profession)
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to discover
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
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
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
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
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
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
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc The variable to set to the profession level
 *
 * @command Get Buffed Level
 * @desc Get the profession's level (including buffs) in a variable
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc The variable to set to the profession level
 *
 * @command Add Buff
 * @desc Add a temporary buff to a profession
 *
 * @arg buffId
 * @text Buff ID
 * @desc Unique ID used to refer to this buff
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to buff
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg amount
 * @text Amount
 * @type number
 * @default 0
 * @desc The amount of levels to add to the profession's level
 *
 * @arg frameCount
 * @text Frame Count
 * @type number
 * @default 3600
 * @min 1
 * @desc The amount of frames the buff will last (60f = 1sec)
 *
 * @arg stackable
 * @text Can Stack?
 * @type boolean
 * @default true
 * @desc Allow this buff to stack with other buffs?
 *
 * @command Remove Buff
 * @desc Remove a temporary buff to a profession
 *
 * @arg buffId
 * @text Buff ID
 * @desc Unique ID used to refer to the buff
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to remove the buff from
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @command Change Description
 * @desc Change a profession's description
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to change description
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg description
 * @text Description
 * @type note
 * @default ""
 * @desc The new description
 *
 * @param Professions
 * @type struct<Profession>[]
 * @default []
 * @desc Set up different professions here
 *
 * @param Window Options
 *
 * @param Display Info
 * @parent Window Options
 * @type select[]
 * @option Name
 * @value Name
 * @option Image
 * @value Image
 * @option Level
 * @value Level
 * @option Exp
 * @value Exp
 * @option Exp To Level
 * @value Exp To Level
 * @option Description
 * @value Description
 * @option Recipes Header
 * @value Recipes Header
 * @option Recipes
 * @value Recipes
 * @option Blank Line
 * @value Blank Line
 * @desc Info to display and order to display it. Recipes/Recipes Header requires CGMZ Crafting.
 * @default ["Name","Image","Level","Exp","Exp To Level","Description"]
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc Whether the profession scene windows are transparent or not
 * @default false
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Total Level Text
 * @parent Window Options
 * @desc Text to show describing the total level shown at bottom of scene
 * @default Total Level: 
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
 * @param Actor Specific Total Lv
 * @parent Window Options
 * @type boolean
 * @desc If true, will only show total levels for the current actor instead of all professions
 * @default true
 *
 * @param List Window Width
 * @parent Window Options
 * @type number
 * @max 99
 * @min 1
 * @default 33
 * @desc The percentage of the total width of the UI that the list window takes up
 *
 * @param List Window On Right
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc If true, the list window will be on the right side of the screen
 *
 * @param List Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions list window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions display window. Leave blank to use default.
 *
 * @param Total Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions total window. Leave blank to use default.
 *
 * @param Category Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions category window. Leave blank to use default.
 *
 * @param Text Options
 *
 * @param Label Color
 * @parent Text Options
 * @type color
 * @desc Color to draw label text in.
 * @default 16
 *
 * @param Header Color 1
 * @parent Text Options
 * @type color
 * @desc Color 1 for the header line gradient color
 * @default 1
 *
 * @param Header Color 2
 * @parent Text Options
 * @type color
 * @desc Color 2 for the header line gradient color
 * @default 0
 *
 * @param Party Category Text
 * @parent Text Options
 * @default Party 
 * @desc Text to display for the party wide category
 *
 * @param Description Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the description text.
 * @default left
 *
 * @param Total Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the total window
 * @default left
 *
 * @param Level Text
 * @parent Text Options
 * @default Level: 
 * @desc Text to describe level
 *
 * @param Exp Text
 * @parent Text Options
 * @default Experience: 
 * @desc Text to describe current experience
 *
 * @param Exp To Level Text
 * @parent Text Options
 * @default Experience To Level: 
 * @desc Text to describe experience needed to level
 *
 * @param Description Text
 * @parent Text Options
 * @default Description: 
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
 *
 * @param Recipe Header Text
 * @parent Other CGMZ Plugin Options
 * @default Learned Recipes
 * @desc Text to show in Learned Recipes header element (requires CGMZ Crafting)
 *
 * @param No Recipes Text
 * @parent Other CGMZ Plugin Options
 * @default None
 * @desc Text to show in Learned Recipes element if no recipes for profession are known (requires CGMZ Crafting)
 *
 * @param Level Up Screenshot
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc Take a Screenshot on Level Up if true. Requires CGMZ Screenshots
 *
 * @param Screenshot Filename
 * @parent Other CGMZ Plugin Options
 * @default %name_Level_%lvl
 * @desc Take a Screenshot on Level Up if true. Requires CGMZ Screenshots
*/
/*~struct~Profession:
 * @param Name
 * @type text
 * @desc The name of the profession.
 * 
 * @param Actors
 * @type actor[]
 * @default []
 * @desc Actors that should have the profession. Leave empty for party-wide profession
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
 * @type icon
 * @default 0
 * @desc Icon index to use for the profession.
 *
 * @param Picture
 * @type file
 * @dir img/pictures
 * @desc The image to use for the profession in place of the big icon (recommended size: 64x64). Leave blank to not use.
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
 * @type struct<SE>
 * @desc The sound effect to play when displaying a toast window for the profession. Requires CGMZ Toast
 */
/*~struct~SE:
 * @param name
 * @type file
 * @dir audio/se
 * @desc The audio file to play
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/professions/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc 专业技能系统（设置可以升级的专业技能，可以关联合成插件，或作为变量使用。）
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
 * 【插件版本】 1.4.1
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 1、建立一个专业技能和等级的系统。
 * 2、使玩家的队伍可以学习专业技能，获得经验和提升专业等级。
 * 3、当专业等级不够时，可以限制玩家获得某些资源，或其他用途。
 * 4、如果关联作者的【Crafting】合成插件，可以作为合成条件之一，
 *    以及通过合成获得经验和升级。
 * ----------------------------------------------------------------------------
 * 【使用说明】
 * 一、呼出专业技能清单的脚本指令：SceneManager.push(CGMZ_Scene_Professions)
 *
 * 二、颜色设置：支持格式 #ffffff 或 rgb(255, 255, 255).
 * 
 * 三、制作一个能暂时提高专业技能等级的物品。在备注栏输入以下指令：
 * <cgmzprofbuff:专业名称,强化数值,持续时间,叠加>
 * 1、专业名称 - 文本。是你设置的专业的名称。区分大小写。
 * 2、强化数值 - 数值。设置你的专业技能可以暂时提高多少个等级。
 * 3、持续时间 - 数值。效果持续多久后消失。单位：帧，60帧=1秒。
 * 4、叠加 - 选择。是否与其他专业的提升效果同时存在。是True/否False。
 * 
 * 举例1：锻造专业提升5个等级，持续60秒，可以叠加。<cgmzprofbuff:锻造,5,3600,true>
 * 举例2：可以用&符号来同时添加多个强化效果，如：<cgmzprofbuff:锻造,5,3600,true&钓鱼,5,3600,true>
 *
 * Note for actor-specific professions: add -actorId onto the profession name.
 * For example, if your profession has name Mining and is for Actor ID 2,
 * you would put Mining-2 as the profession name,
 * 
 * 四、插件指令
 * 本插件可以通过事件设置使用以下插件指令：
 * 呼出菜单：呼出专业技能清单的界面。
 * 重置：重置所有专业技能数据，恢复到新游戏开始的状态。（游戏测试用指令）
 * 获得专业：习得或失去专业技能。
 * 修改描述：更改某个专业技能的描述。
 * 修改经验：指定、增加或减少某个专业技能的经验值。
 * 修改等级：指定、增加或减少某个专业技能的等级。
 * 变量获取当前等级：将某个专业技能当前的等级赋值到一个变量中。
 * 变量获取增幅等级：将某个专业技能当前的等级加上效果增益的总值赋值到变量中。
 * 增加增幅效果：为某个专业增加一个临时的等级增幅效果。
 * 移除增幅效果：移除某个专业的临时等级增幅效果。
 *               使增幅效果不需等待到持续时间结束就可以移除
 *
 * 【版本历史】:
 * V 1.0.1:
 * - Added a plugin command to get the profession level
 * Version 1.0.2:
 * - Added option to display a toast window on discovery of profession
 * Version 1.1.0:
 * - Added temporary buffs (or debuffs) when using items or plugin command
 * - Added ability to use text codes in profession descriptions
 * - Added ability to use custom icon image in place of big icon in display
 *   window
 * - Added option to change label text color
 * - Added option to use transparent windows
 * - Added option to use a custom scene background image
 * - Added plugin command to change description
 * - New professions are now loaded automatically in saved games without
 *   needing to use reinitialize plugin command
 * Version 1.1.1:
 * - Change to profession buffs to make them more efficient for other plugins
 * Version 1.1.2:
 * - Fix bug with level up toast having an extra ":" in the string
 * Version 1.2.0:
 * - Added customization option for display window, now you can drag + drop a
 *   parameter to determine what displays and what order it displays in
 * - Added ability for worn equipment to provide a buff to profession levels
 * - Documentation update
 * Version 1.3.0:
 * - Added option to display known recipes from CGMZ Crafting
 * - Added option to take a screenshot on level up if using CGMZ Screenshots
 * - Added option to fill space where touch UI buttons would be
 * - Added option to use different windowskin for each profession window
 * - Added option to set the list window width
 * - Added option to display the list window on the right
 * - Added Spanish Language support
 * Version 1.4.0:
 * - Professions can now be actor-specific.
 *   - You can now call the professions scene and only display certain
 *   Actors professions in it.
 *   - Plugin Commands have been updated to be able to refer to specific actors
 *   - The total window can display totals for only the current actor
 *   - Buff meta tags have been updated to allow for actor-specific professions
 * - Added more control over profession toast sound effects
 * - Added option to change the alignment of text in the total window
 * - Toast sound effect data is no longer part of save data
 * - This plugin no longer crashes when parsing invalid JSON. Instead, it warns
 *   you in the dev tool console if it encounters invalid JSON. It is still
 *   important to fix these errors if you want the plugin to work correctly.
 * Version 1.4.1:
 * - Bug fix for actor-specific profession plugin command crash
 * Version 1.4.2:
 * - Added parameters to change the line gradient color in headers
 * - Bug fix for discover profession plugin command when actor set to 0
 * - Icon parameters now use plugin manager icon select ui
 * - Color parameters now use plugin manager color select ui where possible
 *
 * @command Reinitialize
 * @text 重置
 * @desc 重新初始化所有职业数据。 如果您保存的游戏无法识别新的职业数据，请使用此选项。
 *
 * @command Call Scene
 * @text 呼出专业界面
 * @desc 呼出专业技能的菜单界面。
 *
 * @arg actors
 * @type actor[]
 * @default 0
 * @desc The actors to include in the profession scene
 *
 * @arg party
 * @type boolean
 * @default true
 * @desc Include the Party category?
 *
 * @command discover
 * @text 获得专业技能
 * @desc 获得或失去一个专业技能
 *
 * @arg name
 * @text 专业技能
 * @desc 获得的专业技能的名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg discover
 * @type boolean
 * @text 获得/失去
 * @desc True - 获得，False - 失去。
 * @default true
 *
 * @command changeExp
 * @text 修改经验值
 * @desc 修改专业技能的经验值。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要修改经验值的专业技能的名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg mode
 * @type select
 * @text 修改方式
 * @option =
 * @option +
 * @option -
 * @desc = 指定经验值，+ 增加经验值，- 减少经验值。
 * @default =
 *
 * @arg amount
 * @type number
 * @text 经验数值
 * @desc 需要修改的经验值的数值。
 * @default 0
 * @min 0
 *
 * @command changeLevel
 * @text 修改等级
 * @desc 修改专业技能的等级。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要修改等级的专业技能名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg mode
 * @type select
 * @text 修改方式
 * @option =
 * @option +
 * @option -
 * @desc = 指定等级，+ 增加等级，- 减少等级。
 * @default =
 *
 * @arg amount
 * @type number
 * @text 等级数值
 * @desc 需要修改的等级的数值。
 * @default 1
 * @min 0
 *
 * @command getLevel
 * @text 获取实际等级
 * @desc 获取某个专业技能的实际等级为变量。
 *
 * @arg name
 * @text 专业技能
 * @desc 专业技能的名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg variable
 * @text 变量
 * @type variable
 * @default 0
 * @desc 指定一个变量ID来获取专业技能的实际等级。
 *
 * @command Get Buffed Level
 * @text 获取强化等级
 * @desc 获取某个专业技能经过强化提高后的等级为变量。
 *
 * @arg name
 * @text 专业技能
 * @desc 专业技能的名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg variable
 * @text 变量
 * @type variable
 * @default 0
 * @desc 指定一个变量ID来获取专业技能经过强化后的等级。
 *
 * @command Add Buff
 * @text 强化效果
 * @desc 获得一个暂时提高专业技能等级的增益效果。
 *
 * @arg buffId
 * @text 强化效果ID
 * @desc 设置一个强化效果的ID。
 *
 * @arg name
 * @text 专业技能
 * @desc 强化效果所提升的专业技能的名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg amount
 * @text 强化数值
 * @type number
 * @default 0
 * @desc 专业技能暂时提升等级的数值。
 *
 * @arg frameCount
 * @text 持续时间
 * @type number
 * @default 3600
 * @min 1
 * @desc 设置增益效果的持续时间。单位：帧，60帧=1秒。
 *
 * @arg stackable
 * @text 强化效果叠加
 * @type boolean
 * @default true
 * @desc 是否允许这个强化效果与其他增益效果叠加？
 *
 * @command Remove Buff
 * @text 移除强化效果
 * @desc 移除一个专业技能的强化效果。
 *
 * @arg buffId
 * @text 强化效果ID
 * @desc 需要移除的强化效果的ID。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要移除强化效果的专业技能的名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @command Change Description
 * @text 修改描述
 * @desc 修改一个专业技能的描述。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要修改描述的专业技能的名称。
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg description
 * @text 描述
 * @type note
 * @default ""
 * @desc 输入新的专业技能描述。
 *
 * @param Professions
 * @text 设置专业技能
 * @type struct<Profession>[]
 * @default []
 * @desc 在这里设置你想要的专业技能。
 *
 * @param Window Options
 * @text 窗口设置
 *
 * @param Display Info
 * @parent Window Options
 * @type select[]
 * @option Name
 * @value Name
 * @option Image
 * @value Image
 * @option Level
 * @value Level
 * @option Exp
 * @value Exp
 * @option Exp To Level
 * @value Exp To Level
 * @option Description
 * @value Description
 * @option Recipes Header
 * @value Recipes Header
 * @option Recipes
 * @value Recipes
 * @option Blank Line
 * @value Blank Line
 * @desc Info to display and order to display it. Recipes/Recipes Header requires CGMZ Crafting.
 * @default ["Name","Image","Level","Exp","Exp To Level","Description"]
 *
 * @param Transparent Windows
 * @text 透明窗口边框
 * @parent Window Options
 * @type boolean
 * @desc 是否将专业技能菜单界面的边框透明化。
 * @default false
 *
 * @param Background Image
 * @text 背景图片
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc 设置一张图片作为界面的背景图。不设置则模糊化处理。
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Total Level Text
 * @text 总等级的描述
 * @parent Window Options
 * @desc 关于在底部显示专业技能总等级的文本描述。
 * @default 全专业技能等级合计: 
 *
 * @param ScrollSpeed
 * @text 滚动速度
 * @parent Window Options
 * @type number
 * @min 0
 * @desc 显示窗口滚动的速度（如果需要）
 * @default 1
 *
 * @param ScrollWait
 * @text 滚动等待
 * @parent Window Options
 * @type number
 * @min 0
 * @desc 开始滚动前等待的时间。单位：帧，60帧=1秒。
 * @default 300
 *
 * @param Scroll Deceleration
 * @text 滚动描述
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @text 自动滚动
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Actor Specific Total Lv
 * @parent Window Options
 * @type boolean
 * @desc If true, will only show total levels for the current actor instead of all professions
 * @default true
 *
 * @param List Window Width
 * @parent Window Options
 * @type number
 * @max 99
 * @min 1
 * @default 33
 * @desc The percentage of the total width of the UI that the list window takes up
 *
 * @param List Window On Right
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc If true, the list window will be on the right side of the screen
 *
 * @param List Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions list window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions display window. Leave blank to use default.
 *
 * @param Total Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions total window. Leave blank to use default.
 *
 * @param Category Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions category window. Leave blank to use default.
 *
 * @param Text Options
 * @text 文本设置
 *
 * @param Label Color
 * @text 专业标签颜色
 * @parent Text Options
 * @type color
 * @desc 专业标签在菜单界面内的颜色。（如等级、经验、描述等标签）
 * @default 16
 *
 * @param Header Color 1
 * @parent Text Options
 * @type color
 * @desc Color 1 for the header line gradient color
 * @default 1
 *
 * @param Header Color 2
 * @parent Text Options
 * @type color
 * @desc Color 2 for the header line gradient color
 * @default 0
 *
 * @param Party Category Text
 * @parent Text Options
 * @default Party 
 * @desc Text to display for the party wide category
 *
 * @param Description Alignment
 * @text 备注位置
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 设置备注文本靠左/居中/靠右。
 * @default left
 *
 * @param Total Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the total window
 * @default left
 *
 * @param Level Text
 * @text 等级的标签
 * @parent Text Options
 * @default 专业等级： 
 * @desc 设置当前等级的描述文字标签。
 *
 * @param Exp Text
 * @text 经验的标签
 * @parent Text Options
 * @default 当前经验: 
 * @desc 设置当前经验值的描述文职标签。
 *
 * @param Exp To Level Text
 * @text 升级需要经验的标签
 * @parent Text Options
 * @default 升级所需经验: 
 * @desc 设置还需要多少经验才能升级的描述文字标签。
 *
 * @param Description Text
 * @text 专业描述的描述
 * @parent Text Options
 * @default 专业简介：
 * @desc 设置介绍专业技能的描述文字标签。
 *
 * @param Other CGMZ Plugin Options
 * @text 关联插件的描述
 *
 * @param Show Level Up Toast
 * @text 升级提示弹窗
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc 显示专业技能升级的弹窗。（需要使用CGMZ Toast Manager插件，否则会报错）
 *
 * @param Level Up Text
 * @text 升级提示的描述
 * @parent Other CGMZ Plugin Options
 * @default 专业技能升级了!
 * @desc 设置专业技能升级弹窗的文本描述。（需要使用CGMZ Toast Manager插件，否则会报错）
 *
 * @param Show Discover Toast
 * @text 获得专业弹窗
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc 显示获得专业技能的弹窗。（需要使用CGMZ Toast Manager插件，否则会报错）
 *
 * @param Discover Text
 * @text 获得专业技能的描述
 * @parent Other CGMZ Plugin Options
 * @default 学会专业技能
 * @desc 设置获得专业技能弹窗的文本描述。（需要使用CGMZ Toast Manager插件，否则会报错）
 *
 * @param Recipe Header Text
 * @parent Other CGMZ Plugin Options
 * @default Learned Recipes
 * @desc Text to show in Learned Recipes header element (requires CGMZ Crafting)
 *
 * @param No Recipes Text
 * @parent Other CGMZ Plugin Options
 * @default None
 * @desc Text to show in Learned Recipes element if no recipes for profession are known (requires CGMZ Crafting)
 *
 * @param Level Up Screenshot
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc Take a Screenshot on Level Up if true. Requires CGMZ Screenshots
 *
 * @param Screenshot Filename
 * @parent Other CGMZ Plugin Options
 * @default %name_Level_%lvl
 * @desc Take a Screenshot on Level Up if true. Requires CGMZ Screenshots
*/
/*~struct~Profession:zh-CN
 * @param Name
 * @text 专业技能
 * @type text
 * @desc 设置专业技能的名称。
 * 
 * @param Actors
 * @type actor[]
 * @default []
 * @desc Actors that should have the profession. Leave empty for party-wide profession
 * 
 * @param Discovered
 * @text 是否学会技能
 * @type boolean
 * @default true
 * @desc 设置在新游戏开始时是否默认已学会该专业技能。
 * 
 * @param Level
 * @text 初始等级
 * @type number
 * @min 1
 * @default 1
 * @desc 设置该专业技能时的初始等级。
 *
 * @param Max level
 * @text 最高等级
 * @type number
 * @min 1
 * @default 99
 * @desc 设置该专业技能可以到达的最高等级。
 *
 * @param Use Experience Curve?
 * @text 是否使用经验曲线
 * @type boolean
 * @default true
 * @desc Ture-使用与角色职业相同的等级经验曲线。False-使用自定义经验曲线。
 *
 * @param Experience Curve
 * @text 自定义经验曲线
 * @type number[]
 * @default ["30","20","30","30"]
 * @desc 自定义专业等级经验曲线。
 *
 * @param Icon
 * @text 小图标
 * @type icon
 * @default 0
 * @desc 指定IconSet的一个图标ID作为专业技能标签前的图标。-1为不使用图标。
 *
 * @param Picture
 * @text 大图标
 * @type file
 * @dir img/pictures
 * @desc 指定一张图片作为专业技能明细里的大图标 (建议尺寸: 64x64). 空白为使用放大的小图标。
 *
 * @param Color
 * @text 颜色
 * @type text
 * @default #ffffff
 * @desc 设置专业技能标签的颜色。颜色格式可以是#ffffff 或 rgb(255, 255, 255)
 *
 * @param Description
 * @text 描述内容
 * @type note
 * @default ""
 * @desc 设置一个专业技能简介的描述。
 *
 * @param Toast Sound Effect
 * @text 弹窗音效
 * @type struct<SE>
 * @desc 指定一个音效作为弹窗提示的音效。（需要使用CGMZ Toast Manager插件）
*/
/*~struct~SE:zh-CN
 * @param name
 * @type file
 * @dir audio/se
 * @desc The audio file to play
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/professions/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Crea un sistema de profesiones para tu juego.
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.4.1
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Descripción: Crea un sistema de profesiones para tu juego. Descubrir
 * profesiones, gana experiencia y sube de nivel. Se puede acceder a los datos 
 * de la profesión son y se pueden usar para cosas como restringir al jugador
 * de cosechar recursos si su nivel no es lo suficientemente alto, o muchos
 * otros usos.
 * ----------------------------------------------------------------------------
 * Documentación:
 * Los colores admiten formato hexadecimal (p. ej., #ffffff) o formato rgb
 * (ej. rgb(255, 255, 255))
 * -------------------------------JavaScript-----------------------------------
 * El documento JS para llamar la escena es:
 * SceneManager.push(CGMZ_Scene_Professions);
 * ---------------------------Etiqueta de Notas--------------------------------
 * • Etiqueta de nota de mejora temporal (artículos):
 * <cgmzprofbuff:profName,buffAmount,frameCount,stackable>
 * - profName debe ser el nombre de la profesión (se distingue entre mayúsculas
 *   y minúsculas)
 * - buffAmount debe ser un número que se agregará al nivel de la profesión
 * - frameCount debe ser un número que es cuántos fotogramas durará el beneficio
 *   (60f = 1 sec)
 * - debe ser "verdadero" o "falso" y determina si el beneficio se acumulará 
 *   con otros beneficios o no
 * 
 * Un ejemplo de etiqueta de nota puede ser:
 * <cgmzprofbuff:Mining,5,3600,true>
 *
 * También puede combinar múltiples beneficios usando el carácter &.
 * Un ejemplo de etiqueta de nota combinada puede tener este aspecto:
 * <cgmzprofbuff:Mining,5,3600,true&Fishing,5,3600,true>
 * Este ejemplo mejoraría tanto la minería como la pesca en 5 durante 3600
 * fotogramas (1 min)
 *
 * • Etiqueta de nota de beneficio permanente (mientras está equipado) 
 * (Arma, Armadura):
 * <cgmzprofbuff:profName,buffAmount>
 * - profName debe ser el nombre de la profesión (se distingue entre mayúsculas
 * y minúsculas)
 * - buffAmount debe ser un número que se agregará al nivel de la profesión.
 *
 * Un ejemplo de etiqueta de nota puede ser:
 * <cgmzprofbuff:Mining,5>
 * Esto proporcionaría un beneficio de 5 niveles de habilidad para Minería.
 *
 * También puede combinar múltiples beneficios usando el carácter &.
 * Un ejemplo de etiqueta de nota combinada puede tener este aspecto:
 * <cgmzprofbuff:Mining,5&Fishing,5>
 * Este ejemplo mejoraría tanto la minería como la pesca en 5 niveles.
 *
 * Estos beneficios de armas y armaduras son permanentes mientras están equipados
 * y se acumulan.
 *
 * Note for actor-specific professions: add -actorId onto the profession name.
 * For example, if your profession has name Mining and is for Actor ID 2,
 * you would put Mining-2 as the profession name,
 * ----------------------------Comandos de Plugin---------------------------------
 * • Escena de llamada
 * Llama la escena/abre el menú de la profesión.
 *
 * • Reinicialización
 * Esto reiniciará todos los datos de profesión como si hubieras comenzado un
 * nuevo juego.
 * Usalo para pruebas de partidas guardadas.
 *
 * • Descubrir Profesión
 * Esto le permitirá descubrir (o no descubrir) una determinada profesión.
 *
 * • Cambiar Descripción
 * Le permite establecer la descripción de una profesión.
 *
 * • Cambiar Exp.
 * Le permite establecer, agregar o restar experiencia de la profesión
 * proporcionada.
 *
 * • Cambiar nivel
 * Le permite establecer, agregar o restar niveles de la profesión proporcionada.
 *
 * • Obtener nivel de profesión
 * Te permite almacenar el nivel de la profesión en una variable.
 * 
 * • Obtener nivel mejorado
 * Te permite almacenar el nivel de la profesión + cualquier mejora en una
 * variable.
 *
 * • Agregar mejora
 * Use esto para agregar un beneficio temporal al nivel de una profesión.
 *
 * • Eliminar mejora
 * Por lo general, los beneficios caducan automáticamente, pero si necesita
 * eliminar uno manualmente puede usar este comando de complemento.
 * ------------------------------Integrations----------------------------------
 * This plugin has special functionality when used with certain other CGMZ
 * plugins:
 *
 * • CGMZ Crafting
 * CGMZ Professions comes with the option to display known recipes from CGMZ
 * Crafting in the Profession Display window.
 *
 * • CGMZ Toast Manager
 * CGMZ Professions has the option to display toasts via CGMZ Toast Manager
 * when certain actions occur. These actions are when leveling up, and when
 * discovering a profession.
 *
 * • CGMZ Screenshots
 * CGMZ Professions comes with the option to take a screenshot of the game
 * screen upon level up. You can also set the filename of the screenshot. When
 * changing the filename, please do not use any spaces in the filename.
 * ---------------------------Juego guardado----------------------------------
 * Este complemento admite parcialmente juegos guardados.
 *
 * ✓ Puede agregar el complemento y agregar profesiones que aparecerán
 * ✓ Puede eliminar el complemento sin problemas para los datos guardados
 * ✘ No puedes modificar profesiones existentes en partidas guardadas
 * ------------------------Nombre del archivo---------------------------------
 * El nombre de archivo de este complemento DEBE seguir siendo CGMZ_Professions.js
 * Esto es lo que viene cuando se descarga. El nombre de archivo se usa para cargar
 * parámetros y ejecutar comandos de complemento. Si lo cambia, las cosas 
 * comenzarán a comportarse incorrectamente y su juego probablemente se bloquee.
 * No cambie el nombre del archivo js.
 * ------------------------Historial de Versiones------------------------------
 * Versión 1.0.0 - Versión inicial
 *
 * Versión 1.0.1:
 * - Se agregó un comando de complemento para obtener el nivel de profesión.
 *
 * Versión 1.0.2:
 * - Opción agregada para mostrar una ventana de brindis al descubrir la
 *   profesión
 *
 * Versión 1.1.0:
 * - Se agregaron beneficios temporales (o desventajas) al usar elementos o 
 *   comandos de plugin
 * - Se agregó la capacidad de usar códigos de texto en las descripciones de
 *   las profesiones.
 * - Se agregó la capacidad de usar una imagen de ícono personalizada en lugar 
 *   de un ícono grande en la pantalla ventana
 * - Opción agregada para cambiar el color del texto de la etiqueta
 * - Opción agregada para usar ventanas transparentes
 * - Opción agregada para usar una imagen de fondo de escena personalizada
 * - Comando de plugin agregado para cambiar la descripción
 * - Las nuevas profesiones ahora se cargan automáticamente en los juegos 
 *   guardados sin necesidad de usar el comando de reinicializar plugin
 *
 * Versión 1.1.1:
 * - Cambio de los beneficios de profesión para hacerlos más eficientes para 
 *   otros complementos
 *
 * Versión 1.1.2:
 * - Se corrigió el error con el brindis de nivel superior que tenía un ":" 
 *   adicional en la cadena
 *
 * Versión 1.2.0:
 * - Opción de personalización agregada para la ventana de visualización, ahora 
 *   puede arrastrar y soltar un parámetro para determinar qué se muestra y en 
 *   qué orden se muestra
 * - Capacidad añadida para el equipo usado para proporcionar un beneficio a los 
 *   niveles de profesión
 * - Actualización de la documentación
 *
 * Versión 1.3.0:
 * - Added option to display known recipes from CGMZ Crafting
 * - Added option to take a screenshot on level up if using CGMZ Screenshots
 * - Added option to fill space where touch UI buttons would be
 * - Added option to use different windowskin for each profession window
 * - Added option to set the list window width
 * - Added option to display the list window on the right
 * - Added Spanish Language support
 * 
 * Versión 1.4.0:
 * - Professions can now be actor-specific.
 *   - You can now call the professions scene and only display certain
 *   Actors professions in it.
 *   - Plugin Commands have been updated to be able to refer to specific actors
 *   - The total window can display totals for only the current actor
 *   - Buff meta tags have been updated to allow for actor-specific professions
 * - Added more control over profession toast sound effects
 * - Added option to change the alignment of text in the total window
 * - Toast sound effect data is no longer part of save data
 * - This plugin no longer crashes when parsing invalid JSON. Instead, it warns
 *   you in the dev tool console if it encounters invalid JSON. It is still
 *   important to fix these errors if you want the plugin to work correctly.
 * 
 * Versión 1.4.1:
 * - Bug fix for actor-specific profession plugin command crash
 *
 * Versión 1.4.2:
 * - Added parameters to change the line gradient color in headers
 * - Bug fix for discover profession plugin command when actor set to 0
 * - Icon parameters now use plugin manager icon select ui
 * - Color parameters now use plugin manager color select ui where possible
 *
 * @command Reinitialize
 * @text Reinicializar
 * @desc Reinicializa todos los datos de profesión. Use esto si su juego guardado no reconoce nuevos datos de profesión.
 *
 * @command Call Scene
 * @text Abrir profesiones
 * @desc Abrir a la interfaz de menú de profesiones.
 *
 * @arg actors
 * @type actor[]
 * @default 0
 * @desc The actors to include in the profession scene
 *
 * @arg party
 * @type boolean
 * @default true
 * @desc Include the Party category?
 *
 * @command discover
 * @text Descubrir Profesión
 * @desc Descubre una profesión (o no descubre una profesión).
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión a descubrir.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg discover
 * @type boolean
 * @text Descubrir
 * @desc Descubre la profesión si es verdadera. No descubre la profesión si es falsa.
 * @default true
 *
 * @command changeExp
 * @text Cambiar experiencia
 * @desc Manipular la experiencia de una profesión.
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión para cambiar exp.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg mode
 * @type select
 * @text Modo
 * @option =
 * @option +
 * @option -
 * @desc Ya sea para establecer, agregar o restar exp.
 * @default =
 *
 * @arg amount
 * @type number
 * @text Cantidad
 * @desc Cantidad de experiencia para establecer, agregar o restar.
 * @default 0
 * @min 0
 *
 * @command changeLevel
 * @text Cambiar nivel
 * @desc Manipular el nivel de una profesión.
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión para cambiar el nivel.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg mode
 * @type select
 * @text Modo
 * @option =
 * @option +
 * @option -
 * @desc Ya sea para establecer, agregar o restar niveles.
 * @default =
 *
 * @arg amount
 * @type number
 * @text Cantidad
 * @desc Cantidad de niveles para establecer, agregar o restar.
 * @default 1
 * @min 0
 *
 * @command getLevel
 * @text Obtener nivel de profesión
 * @desc Obtener el nivel de la profesión en una variable.
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc La variable a establecer en el nivel de profesión.
 *
 * @command Get Buffed Level
 * @text Obtener nivel mejorado
 * @desc Obtener el nivel de la profesión (incluidos los beneficios) en una variable.
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc La variable a establecer en el nivel de profesión.
 *
 * @command Add Buff
 * @text Añadir mejora
 * @desc Agregar un beneficio temporal a una profesión.
 *
 * @arg buffId
 * @text ID de Mejora
 * @desc ID único utilizado para referirse a esta mejora.
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión a mejorar.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg amount
 * @text Cantidad
 * @type number
 * @default 0
 * @desc La cantidad de niveles para agregar al nivel de la profesión.
 *
 * @arg frameCount
 * @text Recuento de fotogramas
 * @type number
 * @default 3600
 * @min 1
 * @desc La cantidad de fotogramas que durará la mejora (60f = 1 segundo).
 *
 * @arg stackable
 * @text ¿Se puede apilar?
 * @type boolean
 * @default true
 * @desc ¿Permitir que este beneficio se acumule con otros beneficios?
 *
 * @command Remove Buff
 * @text Remover mejora
 * @desc Eliminar una mejora temporal de una profesión.
 *
 * @arg buffId
 * @text ID de mejora
 * @desc ID único utilizado para referirse a esta mejora.
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión de la cual se va a eliminar la mejora.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @command Change Description
 * @text Cambiar descripción
 * @desc Cambiar la descripción de una profesión.
 *
 * @arg name
 * @text Nombre de Profesión
 * @desc El nombre de la profesión para cambiar la descripción.
 *
 * @arg actor
 * @type actor
 * @default 0
 * @desc The actor the profession belongs to. Leave 0 for party wide professions.
 *
 * @arg description
 * @text Descripción
 * @type note
 * @default ""
 * @desc La nueva descripción
 *
 * @param Professions
 * @text Prosefiones
 * @type struct<Profession>[]
 * @default []
 * @desc Configurar diferentes profesiones aquí
 *
 * @param Window Options
 * @text Opciones de Ventana
 *
 * @param Display Info
 * @text Mostrar información
 * @parent Window Options
 * @type select[]
 * @option Name
 * @value Name
 * @option Image
 * @value Image
 * @option Level
 * @value Level
 * @option Exp
 * @value Exp
 * @option Exp To Level
 * @value Exp To Level
 * @option Description
 * @value Description
 * @option Recipes Header
 * @value Recipes Header
 * @option Recipes
 * @value Recipes
 * @option Blank Line
 * @value Blank Line
 * @desc Información a mostrar y orden para mostrarla. Recipes/Recipes Header requiere CGMZ Crafting.
 * @default ["Name","Image","Level","Exp","Exp To Level","Description"]
 *
 * @param Transparent Windows
 * @text Ventanas transparentes
 * @parent Window Options
 * @type boolean
 * @desc Si las ventanas de la escena de la profesión son transparentes o no.
 * @default false
 *
 * @param Background Image
 * @text Imagen de fondo
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc Imagen para mostrar en el fondo de la escena. Mapa borroso predeterminado utilizado si no se proporciona ninguno.
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Total Level Text
 * @text Texto de nivel total
 * @parent Window Options
 * @desc Texto para mostrar que describe el nivel total que se muestra en la parte inferior de la escena.
 * @default Total Level: 
 *
 * @param ScrollSpeed
 * @text Velocidad de desplazamiento
 * @parent Window Options
 * @type number
 * @min 0
 * @desc Velocidad a la que se desplaza la ventana de visualización (si es necesario).
 * @default 1
 *
 * @param ScrollWait
 * @text Espera de desplazamiento
 * @parent Window Options
 * @type number
 * @min 0
 * @desc Cantidad de tiempo (en fotogramas) a esperar antes de comenzar a desplazarse.
 * @default 300
 *
 * @param Scroll Deceleration
 * @text Desaceleración de desplazamiento
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Tasa de desaceleración después de soltar el toque.
 * @default 0.92
 *
 * @param Auto Scroll
 * @text Auto desplazamiento
 * @parent Window Options
 * @type boolean
 * @desc Determinar si la ventana de visualización debe desplazarse automáticamente después de tanto tiempo sin intervención del usuario.
 * @default true
 *
 * @param Actor Specific Total Lv
 * @parent Window Options
 * @type boolean
 * @desc If true, will only show total levels for the current actor instead of all professions
 * @default true
 *
 * @param List Window Width
 * @parent Window Options
 * @type number
 * @max 99
 * @min 1
 * @default 33
 * @desc The percentage of the total width of the UI that the list window takes up
 *
 * @param List Window On Right
 * @parent Window Options
 * @type boolean
 * @default false
 * @desc If true, the list window will be on the right side of the screen
 *
 * @param List Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions list window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions display window. Leave blank to use default.
 *
 * @param Total Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions total window. Leave blank to use default.
 *
 * @param Category Windowskin
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Professions category window. Leave blank to use default.
 *
 * @param Text Options
 * @text Opciones de texto
 *
 * @param Label Color
 * @text Color de la etiqueta
 * @parent Text Options
 * @type color
 * @desc Color para dibujar el texto de la etiqueta.
 * @default 16
 *
 * @param Header Color 1
 * @parent Text Options
 * @type color
 * @desc Color 1 for the header line gradient color
 * @default 1
 *
 * @param Header Color 2
 * @parent Text Options
 * @type color
 * @desc Color 2 for the header line gradient color
 * @default 0
 *
 * @param Party Category Text
 * @parent Text Options
 * @default Party 
 * @desc Text to display for the party wide category
 *
 * @param Description Alignment
 * @text Descripción Alineación
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc La alineación del texto de la descripción.
 * @default left
 *
 * @param Total Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the total window
 * @default left
 *
 * @param Level Text
 * @text Texto Nivel
 * @parent Text Options
 * @default Level: 
 * @desc Texto para describir el nivel
 *
 * @param Exp Text
 * @text Texto experiencia 
 * @parent Text Options
 * @default Experience: 
 * @desc Texto para describir la experiencia actual.
 *
 * @param Exp To Level Text
 * @text Texto Experiencia necesaria
 * @parent Text Options
 * @default Experience To Level: 
 * @desc Texto para describir la experiencia necesaria para subir de nivel.
 *
 * @param Description Text
 * @text Texto Descripción
 * @parent Text Options
 * @default Description: 
 * @desc Texto para describir la descripción de la profesión.
 *
 * @param Other CGMZ Plugin Options
 * @text Otras opciones del plugin CGMZ
 *
 * @param Show Level Up Toast
 * @text Mostrar mensaje por subir de nivel
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Mostrar una ventana de mensaje al subir de nivel (requiere CGMZ Toast).
 *
 * @param Level Up Text
 * @text Texto Subir de nivel
 * @parent Other CGMZ Plugin Options
 * @default has leveled up!
 * @desc Texto para describir un nivel superior en la ventana del mensaje (requiere CGMZ Toast).
 *
 * @param Show Discover Toast
 * @text Mostrar descubrir mensaje
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Mostrar una ventana de mensajes al descubrir la profesión (requiere CGMZ Toast).
 *
 * @param Discover Text
 * @text Descubrir texto
 * @parent Other CGMZ Plugin Options
 * @default Discovered Profession
 * @desc Texto para describir una profesión descubierta en la ventana del mensaje (requiere CGMZ Toast)
 *
 * @param Recipe Header Text
 * @parent Other CGMZ Plugin Options
 * @default Learned Recipes
 * @desc Text to show in Learned Recipes header element (requiere CGMZ Crafting)
 *
 * @param No Recipes Text
 * @parent Other CGMZ Plugin Options
 * @default None
 * @desc Text to show in Learned Recipes element if no recipes for profession are known (requiere CGMZ Crafting)
 *
 * @param Level Up Screenshot
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc Take a Screenshot on Level Up if true. Requiere CGMZ Screenshots
 *
 * @param Screenshot Filename
 * @parent Other CGMZ Plugin Options
 * @default %name_Level_%lvl
 * @desc Take a Screenshot on Level Up if true. Requiere CGMZ Screenshots
*/
/*~struct~Profession:es
 * @param Name
 * @text Nombre
 * @type text
 * @desc El nombre de la profesión.
 * 
 * @param Actors
 * @type actor[]
 * @default []
 * @desc Actors that should have the profession. Leave empty for party-wide profession
 * 
 * @param Discovered
 * @text Descubierto
 * @type boolean
 * @default true
 * @desc Determina si la profesión se descubre al comienzo del juego.
 * 
 * @param Level
 * @text Nivel
 * @type number
 * @min 1
 * @default 1
 * @desc El nivel en el que comienza la profesión.
 *
 * @param Max level
 * @text Nivel máximo
 * @type number
 * @min 1
 * @default 99
 * @desc El nivel máximo que puede tener la profesión.
 *
 * @param Use Experience Curve?
 * @text ¿Usar curva de experiencia?
 * @type boolean
 * @default true
 * @desc Determina si generar una curva de experiencia o usar valores codificados.
 *
 * @param Experience Curve
 * @text Curva de experiencia
 * @type number[]
 * @default ["30","20","30","30"]
 * @desc Curva de experiencia para usar. Si usa la curva de experiencia, genera la curva de experiencia usando la misma fórmula para los niveles de actor. De lo contrario, cada valor es la cantidad de experiencia necesaria para cada nivel.
 *
 * @param Icon
 * @text Icono
 * @type icon
 * @default 0
 * @desc Índice de iconos a utilizar para la profesión.
 *
 * @param Picture
 * @text Imagen
 * @type file
 * @dir img/pictures
 * @desc La imagen a utilizar para la profesión en lugar del icono grande (tamaño recomendado: 64x64). Dejar en blanco para no usar.
 *
 * @param Color
 * @text Color
 * @type text
 * @default #ffffff
 * @desc Se aceptan valores rgb o hexadecimales. Formato hexadecimal: #ffffff Formato RGB: rgb(255, 255, 255).
 *
 * @param Description
 * @text Descripción
 * @type note
 * @default ""
 * @desc Descripción de la profesión.
 *
 * @param Toast Sound Effect
 * @text Efecto de sonido del mensaje
 * @type struct<SE>
 * @desc El efecto de sonido que se reproduce cuando se muestra una ventana de brindis por la profesión. Requiere CGMZ toast.
*/
/*~struct~SE:es
 * @param name
 * @type file
 * @dir audio/se
 * @desc The audio file to play
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound
*/
var Imported = Imported || {};
Imported.CGMZ_Professions = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Professions"] = "1.4.2";
CGMZ.Professions = {};
CGMZ.Professions.parameters = PluginManager.parameters('CGMZ_Professions');
CGMZ.Professions.SceneTitle = CGMZ.Professions.parameters["Scene Title"];
CGMZ.Professions.TotalLevelText = CGMZ.Professions.parameters["Total Level Text"];
CGMZ.Professions.LevelText = CGMZ.Professions.parameters["Level Text"];
CGMZ.Professions.ExpText = CGMZ.Professions.parameters["Exp Text"];
CGMZ.Professions.ExpToLevelText = CGMZ.Professions.parameters["Exp To Level Text"];
CGMZ.Professions.DescriptionText = CGMZ.Professions.parameters["Description Text"];
CGMZ.Professions.LevelUpText = CGMZ.Professions.parameters["Level Up Text"];
CGMZ.Professions.RecipeHeaderText = CGMZ.Professions.parameters["Recipe Header Text"];
CGMZ.Professions.NoRecipesText = CGMZ.Professions.parameters["No Recipes Text"];
CGMZ.Professions.ScreenshotFilename = CGMZ.Professions.parameters["Screenshot Filename"];
CGMZ.Professions.DiscoverText = CGMZ.Professions.parameters["Discover Text"];
CGMZ.Professions.PartyCategoryText = CGMZ.Professions.parameters["Party Category Text"];
CGMZ.Professions.DescriptionAlignment = CGMZ.Professions.parameters["Description Alignment"];
CGMZ.Professions.TotalWindowAlignment = CGMZ.Professions.parameters["Total Window Alignment"];
CGMZ.Professions.SceneBackgroundImage = CGMZ.Professions.parameters["Background Image"];
CGMZ.Professions.ListWindowskin = CGMZ.Professions.parameters["List Windowskin"];
CGMZ.Professions.DisplayWindowskin = CGMZ.Professions.parameters["Display Windowskin"];
CGMZ.Professions.TotalWindowskin = CGMZ.Professions.parameters["Total Windowskin"];
CGMZ.Professions.CategoryWindowskin = CGMZ.Professions.parameters["Category Windowskin"];
CGMZ.Professions.AutoScroll = (CGMZ.Professions.parameters["Auto Scroll"] === "true");
CGMZ.Professions.ActorSpecificTotals = (CGMZ.Professions.parameters["Actor Specific Total Lv"] === "true");
CGMZ.Professions.ShowLevelUpToast = (CGMZ.Professions.parameters["Show Level Up Toast"] === "true");
CGMZ.Professions.ShowDiscoverToast = (CGMZ.Professions.parameters["Show Discover Toast"] === "true");
CGMZ.Professions.LevelUpScreenshot = (CGMZ.Professions.parameters["Level Up Screenshot"] === "true");
CGMZ.Professions.WindowTransparency = (CGMZ.Professions.parameters["Transparent Windows"] === "true");
CGMZ.Professions.DisableTouchUISpace = (CGMZ.Professions.parameters["Disable Touch UI Space"] === "true");
CGMZ.Professions.ListWindowOnRight = (CGMZ.Professions.parameters["List Window On Right"] === "true");
CGMZ.Professions.LabelColor = Number(CGMZ.Professions.parameters["Label Color"]);
CGMZ.Professions.ListWindowWidth = Number(CGMZ.Professions.parameters["List Window Width"]);
CGMZ.Professions.ScrollSpeed = Number(CGMZ.Professions.parameters["ScrollSpeed"]);
CGMZ.Professions.ScrollWait = Number(CGMZ.Professions.parameters["ScrollWait"]);
CGMZ.Professions.HeaderColor1 = Number(CGMZ.Professions.parameters["Header Color 1"]);
CGMZ.Professions.HeaderColor2 = Number(CGMZ.Professions.parameters["Header Color 2"]);
CGMZ.Professions.ScrollDeceleration = parseFloat(CGMZ.Professions.parameters["Scroll Deceleration"]);
CGMZ.Professions.DisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Professions.parameters["Display Info"], [], "CGMZ Professions", "Your Display Info parameter had invalid JSON. Professions will display incorrectly until fixed.");
CGMZ.Professions.Entries = CGMZ_Utils.parseJSON(CGMZ.Professions.parameters["Professions"], [], "CGMZ Professions", "Your Professions parameter had invalid JSON. No professions could be loaded. Please check your Professions parameter.");
//=============================================================================
// CGMZ_Profession
//-----------------------------------------------------------------------------
// Store and manage saved profession data
//=============================================================================
function CGMZ_Profession() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Profession
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.initialize = function(profession, actorId = "") {
	this._name = (actorId) ? profession.Name + "-" + actorId : profession.Name;
	this._discovered = (profession.Discovered === 'true');
	this._actorId = (actorId) ? Number(actorId) : null;
	this._maxLevel = Number(profession["Max level"]);
	this._level = Number(profession.Level);
	this._usingExpCurve = (profession["Use Experience Curve?"] === 'true');
	this._iconIndex = Number(profession.Icon);
	this._image = profession.Picture;
	this._description = JSON.parse(profession.Description);
	this._color = profession.Color;
	this._expArray = JSON.parse(profession["Experience Curve"]);
	for(let i = 0; i < this._expArray.length; i++) {
		this._expArray[i] = Number(this._expArray[i]);
	}
	this._exp = 0;
	this._buffs = {};
	this._needRefreshForBuff = false;
};
//-----------------------------------------------------------------------------
// Get the id of the profession.
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getId = function() {
	return this._name;
};
//-----------------------------------------------------------------------------
// Get the name to display for the profession
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getDisplayName = function() {
	const regex = /-[0-9]+$/i
	return this._name.replace(regex, "");
};
//-----------------------------------------------------------------------------
// Get the name of the actor that has the profession
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getActorName = function() {
	if(!this._actorId) return "";
	return $gameActors.actor(this._actorId).name();
};
//-----------------------------------------------------------------------------
// Get experience required for level
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.expForLevel = function(level) {
	if(level <= 1) return 0;
	if(level > this._maxLevel) return this.expForLevel(this._maxLevel);
	if(!this._usingExpCurve) return this._expArray[level - 2]; // level - 2 since 0 not level and 1 lowest level possible
	const basis = this._expArray[0];
    const extra = this._expArray[1];
    const acc_a = this._expArray[2];
    const acc_b = this._expArray[3];
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
// Set new description
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setDescription = function(description) {
	this._description = JSON.parse(description);
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
// Check if profession is discovered
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.isDiscovered = function() {
	return this._discovered;
};
//-----------------------------------------------------------------------------
// Gain/Lose experience
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.changeExp = function(mode, amount) {
	switch(mode) {
		case '=': this._exp = amount; break;
		case '+': this._exp += amount; break;
		case '-': this._exp -= amount; break;
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
	if(Imported.CGMZ_Screenshots && CGMZ.Professions.LevelUpScreenshot) {
		const filename = CGMZ.Professions.ScreenshotFilename.replace("%name", this.getDisplayName()).replace("%lvl", this._level);
		$cgmzTemp.takeScreenshot(filename);
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
	let levelExp = this._exp;
	switch(mode) {
		case '=': 
			if(amount > this._maxLevel) amount = this._maxLevel;
			if(amount < 1) amount = 1;
			levelExp = this.expForLevel(amount);
			break;
		case '+':
			var totalLevel = this._level + amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			levelExp = this.expForLevel(totalLevel);
			break;
		case '-':
			var totalLevel = this._level - amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			levelExp = this.expForLevel(totalLevel);
			break;
		default:
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
// Add a buff to the profession (or overwrite existing buff)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.addBuff = function(buffId, amount, frameCount, stackable = false) {
	const buff = {amount: amount, stackable: stackable, frameCount: Graphics.frameCount + frameCount};
	this._buffs[buffId] = buff;
	const funcArgs = {profName: this.getId(), buffId: buffId};
	const timer = new CGMZ_Timer(frameCount, buffId, "removeProfessionBuff", funcArgs);
	$cgmz.requestNewTimer(timer);
};
//-----------------------------------------------------------------------------
// Remove a buff from the profession, set flag for refresh as needed
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.removeBuff = function(buffId) {
	delete this._buffs[buffId];
	this._needRefreshForBuff = true;
	$cgmzTemp._professionBuffRemoved = true;
};
//-----------------------------------------------------------------------------
// Determine if the profession has active buffs
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.hasBuffs = function() {
	return Object.keys(this._buffs).length > 0;
};
//-----------------------------------------------------------------------------
// Get the total level of the profession including buffs
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getBuffedLevel = function() {
	const baseLevel = this._level;
	const unstackableLevels = this.getUnstackableBuffLevels();
	const stackableLevels = this.getStackableBuffLevels();
	const equipmentLevels = this.getEquipmentBuffLevels();
	return baseLevel + unstackableLevels + stackableLevels + equipmentLevels;
};
//-----------------------------------------------------------------------------
// Returns the highest unstackable buff level (if any)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getUnstackableBuffLevels = function() {
	let buffLevel = 0;
	for(const buff in this._buffs) {
		if(!this._buffs[buff].stackable && this._buffs[buff].amount > buffLevel) {
			buffLevel = this._buffs[buff].amount;
		}
	}
	return buffLevel;
};
//-----------------------------------------------------------------------------
// Returns the highest unstackable buff level (if any)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getStackableBuffLevels = function() {
	let buffLevel = 0;
	for(const buff in this._buffs) {
		if(this._buffs[buff].stackable) {
			buffLevel += this._buffs[buff].amount;
		}
	}
	return buffLevel;
};
//-----------------------------------------------------------------------------
// Returns the total amount of buff levels from any party actor's equipment
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getEquipmentBuffLevels = function() {
	let buffLevel = 0;
	for(const actor of $gameParty.allMembers()) {
		for(const equip of actor.equips()) {
			if(equip && equip.meta && equip.meta.cgmzprofbuff) {
				const buffs = equip.meta.cgmzprofbuff.split("&");
				for(const buffMeta of buffs) {
					const buff = buffMeta.split(","); // [Name, amount]
					if(buff[0] === this.getId()) {
						buffLevel += Number(buff[1]);
					}
				}
			}
		}
	}
	return buffLevel;
};
//-----------------------------------------------------------------------------
// Get separating text if there is an actor 
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getNameSeparator = function(separator = ": ") {
	if(!this._actorId) return "";
	return separator;
};
//-----------------------------------------------------------------------------
// Set up level up toast (Requires CGMZ Toast)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setupLevelUpToast = function() {
	const professionTemp = $cgmzTemp.getProfessionTempData(this.getId());
	const toast = {};
	toast.CGMZProfessionToast = true;
	toast.color = this._color;
	toast.name = this.getActorName() + this.getNameSeparator() + this.getDisplayName();
	toast.level = this._level;
	if(professionTemp && professionTemp.hasToastSoundEffect()) toast.SE = professionTemp.getToastSoundEffect();
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Set up discover toast (Requires CGMZ Toast)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setupDiscoverToast = function() {
	const professionTemp = $cgmzTemp.getProfessionTempData(this.getId());
	const toast = {};
	toast.CGMZProfessionToastDiscover = true;
	toast.color = this._color;
	toast.name = this.getActorName() + this.getNameSeparator() + this.getDisplayName();
	if(professionTemp && professionTemp.hasToastSoundEffect()) toast.SE = professionTemp.getToastSoundEffect();
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Processing after game load, add buff object if not exists
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.onAfterLoad = function() {
	if(!this._buffs) this._buffs = {};
};
//=============================================================================
// CGMZ_ProfessionTemp
//-----------------------------------------------------------------------------
// Store and manage temp profession data
//=============================================================================
function CGMZ_ProfessionTemp() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Profession Temp data
//-----------------------------------------------------------------------------
CGMZ_ProfessionTemp.prototype.initialize = function(profession) {
	this._toastSE = null;
	if(profession["Toast Sound Effect"]) {
		this._toastSE = CGMZ_Utils.parseJSON(profession["Toast Sound Effect"], null, "CGMZ Professions", "Your profession '" + profession.Name + "' has invalid JSON for it's Toast Sound Effect parameter.");
		if(this._toastSE) {
			this._toastSE.volume = Number(this._toastSE.volume);
			this._toastSE.pitch = Number(this._toastSE.pitch);
			this._toastSE.pan = Number(this._toastSE.pan);
		}
	}
};
//-----------------------------------------------------------------------------
// Get the toast sound effect
//-----------------------------------------------------------------------------
CGMZ_ProfessionTemp.prototype.getToastSoundEffect = function() {
	return this._toastSE;
};
//-----------------------------------------------------------------------------
// Check toast sound effect exists
//-----------------------------------------------------------------------------
CGMZ_ProfessionTemp.prototype.hasToastSoundEffect = function() {
	return !!this._toastSE;
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
	for(const professionJSON of CGMZ.Professions.Entries) {
		const professionParsed = CGMZ_Utils.parseJSON(professionJSON, null, "CGMZ Professions", "Could not parse profession. Error in JSON: " + professionJSON);
		if(!professionParsed) continue;
		const actors = CGMZ_Utils.parseJSON(professionParsed.Actors, [], "CGMZ Professions", "Could not parse profession Actors parameter, making profession party-wide: " + professionParsed.Name);
		if(actors.length > 0) {
			for(const actor of actors) {
				const prof = new CGMZ_Profession(professionParsed, actor);
				if(!this.getProfession(prof._name)) this._professions.push(prof);
			}
		} else {
			const prof = new CGMZ_Profession(professionParsed);
			if(!this.getProfession(prof._name)) this._professions.push(prof);
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize profession variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupProfessionVariables = function() {
	this._professions = [];
};
//-----------------------------------------------------------------------------
// Alias. Check for new professions after loading saved game
// Also perform recipe maintenance after load
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Professions_onAfterLoad.call(this);
	this.initializeProfessionData(false);
	for(const profession of this._professions) {
		profession.onAfterLoad();
	}
};
//-----------------------------------------------------------------------------
// Returns array of all professions
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllProfessions = function() {
	return this._professions;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered professions
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredProfessions = function() {
	return this._professions.filter(profession => profession.isDiscovered());
};
//-----------------------------------------------------------------------------
// Get profession by name. Returns undefined if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getProfession = function(name, actor = "") {
	const profName = this.makeProfessionName(name, actor);
	return this._professions.find(profession => profName === profession.getId());
};
//-----------------------------------------------------------------------------
// Make the profession name including possible actor
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.makeProfessionName = function(name, actor = "") {
	if(actor === "0") actor = "";
	return (actor) ? name + "-" + actor : name;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a profession
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverProfession = function(name, discovered, actor = "") {
	const profName = this.makeProfessionName(name, actor);
	const profession = this.getProfession(profName);
	if(profession) {
		profession.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Gain/Lose exp for profession
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeProfessionExp = function(name, mode, amount, actor = "") {
	const profName = this.makeProfessionName(name, actor);
	const profession = this.getProfession(profName);
	if(profession) {
		profession.changeExp(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Change profession level
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeProfessionLevel = function(name, mode, amount, actor = "") {
	const profName = this.makeProfessionName(name, actor);
	const profession = this.getProfession(profName);
	if(profession) {
		profession.changeLevel(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevels = function() {
	return this._professions.reduce((sum, profession) => sum + profession._maxLevel, 0);
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarned = function() {
	return this._professions.reduce((sum, profession) => sum + profession._level, 0);
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevelsDiscovered = function() {
	return this._professions.reduce((sum, profession) => sum + (profession.isDiscovered() * profession._maxLevel), 0);
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarnedDiscovered = function() {
	return this._professions.reduce((sum, profession) => sum + (profession.isDiscovered() * profession._level), 0);
};
//-----------------------------------------------------------------------------
// Get Actor IDs that have professions in ascending order
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getActorIdsWithProfessions = function(discovered = false) {
	const actorIds = [];
	for(const profession of this._professions) {
		if(!profession._actorId) continue;
		if(!profession.isDiscovered() && discovered) continue;
		if(actorIds.includes(profession._actorId)) continue;
		actorIds.push(profession._actorId);
	}
	return actorIds.sort((a, b) => a - b);
};
//-----------------------------------------------------------------------------
// Get Professions belonging to an actor (or party-wide if null)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getProfessionsForActor = function(actorId = null) {
	return this._professions.filter((profession) => profession._actorId === actorId || (!actorId && !profession._actorId));
};
//-----------------------------------------------------------------------------
// Get Professions belonging to an actor (or party-wide if null) that is discovered
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredProfessionsForActor = function(actorId = null) {
	return this._professions.filter((profession) => profession.isDiscovered() && (profession._actorId === actorId || (!actorId && !profession._actorId)));
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available for an actor
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevelsForActor = function(actorId = null) {
	return this.getProfessionsForActor(actorId).reduce((sum, profession) => sum + profession._maxLevel, 0);
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned for an actor
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarnedForActor = function(actorId = null) {
	return this.getProfessionsForActor(actorId).reduce((sum, profession) => sum + profession._level, 0);
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available for an actor (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevelsDiscoveredForActor = function(actorId = null) {
	return this.getProfessionsForActor(actorId).reduce((sum, profession) => sum + (profession.isDiscovered() * profession._maxLevel), 0);
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned for an actor (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarnedDiscoveredForActor = function(actorId = null) {
	return this.getProfessionsForActor(actorId).reduce((sum, profession) => sum + (profession.isDiscovered() * profession._level), 0);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Register and handling for plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Make profession temp data
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Professions_CGMZ_Temp_createPluginData.call(this);
	this._professionBuffRemoved = false;
	this._professionTempData = {};
	for(const professionJSON of CGMZ.Professions.Entries) {
		const professionParsed = CGMZ_Utils.parseJSON(professionJSON, null, "CGMZ Professions", "Error parsing profession JSON.");
		if(!professionParsed) continue;
		const actors = CGMZ_Utils.parseJSON(professionParsed.Actors, [], "CGMZ Professions", "Could not parse profession Actors parameter, making profession party-wide: " + professionParsed.Name);
		if(actors.length > 0) {
			for(const actor of actors) {
				const prof = new CGMZ_ProfessionTemp(professionParsed);
				const name = professionParsed.Name + "-" + actor;
				if(!this._professionTempData[name]) this._professionTempData[name] = prof;
			}
		} else {
			const prof = new CGMZ_ProfessionTemp(professionParsed);
			if(!this._professionTempData[professionParsed.Name]) this._professionTempData[professionParsed.Name] = prof;
		}
		
	}
};
//-----------------------------------------------------------------------------
// Get a profession's temp data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getProfessionTempData = function(name) {
	return this._professionTempData[name];
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Professions_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Professions", "Call Scene", this.pluginCommandProfessionsCallScene);
	PluginManager.registerCommand("CGMZ_Professions", "Reinitialize", this.pluginCommandProfessionsReinitialize);
	PluginManager.registerCommand("CGMZ_Professions", "discover", this.pluginCommandProfessionsDiscover);
	PluginManager.registerCommand("CGMZ_Professions", "changeExp", this.pluginCommandProfessionsChangeExp);
	PluginManager.registerCommand("CGMZ_Professions", "changeLevel", this.pluginCommandProfessionsChangeLevel);
	PluginManager.registerCommand("CGMZ_Professions", "getLevel", this.pluginCommandProfessionsGetLevel);
	PluginManager.registerCommand("CGMZ_Professions", "Get Buffed Level", this.pluginCommandProfessionsGetBuffedLevel);
	PluginManager.registerCommand("CGMZ_Professions", "Add Buff", this.pluginCommandProfessionsAddBuff);
	PluginManager.registerCommand("CGMZ_Professions", "Remove Buff", this.pluginCommandProfessionsRemoveBuff);
	PluginManager.registerCommand("CGMZ_Professions", "Change Description", this.pluginCommandProfessionsChangeDescription);
};
//-----------------------------------------------------------------------------
// Call profession scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsCallScene = function(args) {
	const actorIdsWithProfessions = $cgmz.getActorIdsWithProfessions(true);
	let actors = actorIdsWithProfessions;
	let party = true;
	if(args.actors) {
		actors = JSON.parse(args.actors).map(actorId => Number(actorId)).filter(actorId => actorIdsWithProfessions.includes(actorId));
		party = (args.party === 'true');
	}
	SceneManager.push(CGMZ_Scene_Professions);
	SceneManager.prepareNextScene(actors, party);
};
//-----------------------------------------------------------------------------
// Reinitialize the profession data (for saved games)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsReinitialize = function() {
	$cgmz.initializeProfessionData(true);
};
//-----------------------------------------------------------------------------
// Set the discover status of a profession
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsDiscover = function(args) {
	$cgmz.discoverProfession(args.name, args.discover === 'true', args.actor);
};
//-----------------------------------------------------------------------------
// Plugin command to change the profession's exp
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeExp = function(args) {
	$cgmz.changeProfessionExp(args.name, args.mode, Number(args.amount), args.actor);
};
//-----------------------------------------------------------------------------
// Plugin command to change the profession's level
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeLevel = function(args) {
	$cgmz.changeProfessionLevel(args.name, args.mode, Number(args.amount), args.actor);
};
//-----------------------------------------------------------------------------
// Plugin command to get the profession's unbuffed level into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsGetLevel = function(args) {
	const profName = $cgmz.makeProfessionName(args.name, args.actor);
	const profession = $cgmz.getProfession(profName);
	if(profession) {
		$gameVariables.setValue(Number(args.variable), profession._level);
	}
};
//-----------------------------------------------------------------------------
// Plugin command to get the profession's level + buff level into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsGetBuffedLevel = function(args) {
	const profName = $cgmz.makeProfessionName(args.name, args.actor);
	const profession = $cgmz.getProfession(profName);
	if(profession) {
		$gameVariables.setValue(Number(args.variable), profession.getBuffedLevel());
	}
};
//-----------------------------------------------------------------------------
// Plugin command to add a buff to a profession
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsAddBuff = function(args) {
	const profName = $cgmz.makeProfessionName(args.name, args.actor);
	const profession = $cgmz.getProfession(profName);
	if(profession) {
		profession.addBuff(args.buffId, Number(args.amount), Number(args.frameCount), args.stackable === "true");
	}
};
//-----------------------------------------------------------------------------
// Plugin command to remove a buff from a profession
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsRemoveBuff = function(args) {
	const profName = $cgmz.makeProfessionName(args.name, args.actor);
	const profession = $cgmz.getProfession(profName);
	if(profession) {
		profession.removeBuff(args.buffId);
	}
};
//-----------------------------------------------------------------------------
// Plugin command to change profession description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeDescription = function(args) {
	const profName = $cgmz.makeProfessionName(args.name, args.actor);
	const profession = $cgmz.getProfession(profName);
	if(profession) {
		profession.setDescription(args.description);
	}
};
//-----------------------------------------------------------------------------
// Alias. Create mapped functions
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_createMappedFunctions = CGMZ_Temp.prototype.createMappedFunctions;
CGMZ_Temp.prototype.createMappedFunctions = function() {
	alias_CGMZ_Professions_createMappedFunctions.call(this);
	this._mappedFunctions["removeProfessionBuff"] = this.removeProfessionBuff.bind(this);
};
//-----------------------------------------------------------------------------
// Remove a profession's buff
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.removeProfessionBuff = function(args) {
	const profName = $cgmz.makeProfessionName(args.name, args.actor);
	const profession = $cgmz.getProfession(profName);
	if(profession) {
		profession.removeBuff(args.buffId);
	}
};
//-----------------------------------------------------------------------------
// When an item is used, check if it should apply a temporary buff
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkItemForProfessionBuff = function(item) {
	if(item && item.meta && item.meta.cgmzprofbuff) {
		const buffs = item.meta.cgmzprofbuff.split("&");
		for(const buff of buffs) {
			const data = buff.split(","); // [Name, amount, frames, stackable]
			const profession = $cgmz.getProfession(data[0]);
			if(profession) {
				profession.addBuff(item.name + "-" + data[0], Number(data[1]), Number(data[2]), data[3] === "true");
			}
		}
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
	this._actorIds = $cgmz.getActorIdsWithProfessions(true);
	this._includePartyWide = true;
	this._totalCategories = this._actorIds.length + (1 * this._includePartyWide);
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.prepare = function(actors, party) {
    this._actorIds = actors;
	this._includePartyWide = party;
	this._totalCategories = this._actorIds.length + (1 * this._includePartyWide);
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.needsCategoryWindow = function() {
    return (this._totalCategories > 1);
};
//-----------------------------------------------------------------------------
// Create profession windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	if(this.needsCategoryWindow()) this.createCategoryWindow();
	this.createTotalWindow();
	this.createListWindow();
	this.createDisplayWindow();
	this.handleWindowAssociations();
};
//-----------------------------------------------------------------------------
// Create total window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
    this._categoryWindow = new CGMZ_Window_ProfessionCategory(rect, this._actorIds, this._includePartyWide);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Get total window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.categoryWindowRect = function() {
	const x = 0;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true);
	const y = this.hasTouchUI() ? this.mainAreaTop() : 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create total window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createTotalWindow = function() {
	const rect = this.totalWindowRect();
    this._totalWindow = new CGMZ_Window_ProfessionTotal(rect);
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
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.listWindowRect = function() {
	let y = this.hasTouchUI() ? this.mainAreaTop() : 0;
	y += this.needsCategoryWindow() ? this._categoryWindow.height : 0;
	const width = Graphics.boxWidth * (CGMZ.Professions.ListWindowWidth / 100.0);
	const x = (CGMZ.Professions.ListWindowOnRight) ? Graphics.boxWidth - width : 0;
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
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.displayWindowRect = function() {
	const x = (CGMZ.Professions.ListWindowOnRight) ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = this._listWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Handle window associations
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.handleWindowAssociations = function() {
	this._listWindow.setDisplayWindow(this._displayWindow);
	if(this.needsCategoryWindow()) {
		this._categoryWindow.setListWindow(this._listWindow);
		this._categoryWindow.setTotalWindow(this._totalWindow);
		this._categoryWindow.refresh();
		this._categoryWindow.activate();
		this._categoryWindow.select(0);
	} else {
		this._listWindow.refresh();
		this._listWindow.activate();
		this._listWindow.select(0);
	}
};
//-----------------------------------------------------------------------------
// On Category Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.onCategoryOk = function() {
	this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
};
//-----------------------------------------------------------------------------
// On List Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.onListCancel = function() {
	if(this.needsCategoryWindow()) {
		this._listWindow.select(0);
		this._listWindow.ensureCursorVisible(true);
		this._listWindow.deselect();
		this._listWindow.deactivate();
		this._displayWindow.setItem(null);
		this._displayWindow.contents.clear();
		this._categoryWindow.activate();
	} else {
		this.popScene();
	}
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
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.hasTouchUI = function() {
	return !CGMZ.Professions.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.Professions.SceneBackgroundImage) {
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadPicture(CGMZ.Professions.SceneBackgroundImage);
		this.addChild(this._backgroundCustomSprite);
	}
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
	this.setBackgroundType(2 * (CGMZ.Professions.WindowTransparency));
	this._actorId = 0;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.loadWindowskin = function() {
	if(CGMZ.Professions.TotalWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Professions.TotalWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		this.windowskin = ImageManager.loadSystem("Window");
	}
};
//-----------------------------------------------------------------------------
// Change in actor
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.setItem = function(actorId) {
    if(this._actorId === actorId) return;
	this._actorId = actorId;
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
	const totalLevels = (CGMZ.Professions.ActorSpecificTotals && this._actorId) ? $cgmz.totalProfessionLevelsDiscoveredForActor(this._actorId) : $cgmz.totalProfessionLevelsDiscovered();
	const earnedLevels = (CGMZ.Professions.ActorSpecificTotals && this._actorId) ? $cgmz.professionLevelsEarnedDiscoveredForActor(this._actorId) : $cgmz.professionLevelsEarnedDiscovered();
	const string = '\\c[' + CGMZ.Professions.LabelColor + ']' + CGMZ.Professions.TotalLevelText + '\\c[0]' + earnedLevels + " / " + totalLevels;
	this.CGMZ_drawTextLine(string, 0, 0, this.contents.width, CGMZ.Professions.TotalWindowAlignment);
};
//=============================================================================
// CGMZ_Window_ProfessionCategory
//-----------------------------------------------------------------------------
// Selectable window for choosing a profession category
//=============================================================================
function CGMZ_Window_ProfessionCategory(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ProfessionCategory.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_ProfessionCategory.prototype.constructor = CGMZ_Window_ProfessionCategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.initialize = function(rect, actorIds, includePartyWide) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Professions.WindowTransparency));
	this._actorIds = actorIds;
	this._includePartyWide = includePartyWide;
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.loadWindowskin = function() {
	if(CGMZ.Professions.CategoryWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Professions.CategoryWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		this.windowskin = ImageManager.loadSystem("Window");
	}
};
//-----------------------------------------------------------------------------
// Change window columns
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.maxCols = function() {
	return 4;
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.makeItemList = function() {
    this._data = this._actorIds;
	if(this._includePartyWide) this._data.unshift(0);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	if(item > 0) {
		const actorName = $gameActors.actor(item).name();
		this.CGMZ_drawTextLine(actorName, rect.x, rect.y, rect.width, 'left');
	} else {
		this.CGMZ_drawTextLine(CGMZ.Professions.PartyCategoryText, rect.x, rect.y, rect.width, 'left');
	}
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.setListWindow = function(listWindow) {
    this._listWindow = listWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set total window
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.setTotalWindow = function(totalWindow) {
    this._totalWindow = totalWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update helper windows window
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionCategory.prototype.callUpdateHelp = function() {
    if(this.active && this._listWindow) {
		this._listWindow.setItem(this.item());
	}
	if(this.active && this._totalWindow) {
		this._totalWindow.setItem(this.item());
	}
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
	this.setBackgroundType(2 * (CGMZ.Professions.WindowTransparency));
	this._actorId = 0;
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.loadWindowskin = function() {
	if(CGMZ.Professions.ListWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Professions.ListWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		this.windowskin = ImageManager.loadSystem("Window");
	}
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
	this._data = $cgmz.getDiscoveredProfessionsForActor(this._actorId);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	this.changeTextColor(item._color);
	let iconBoxWidth = 0;
	if(item._iconIndex > 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y + 4);
		iconBoxWidth = ImageManager.iconWidth + 4;
	}
    this.drawText(item.getDisplayName(), rect.x + iconBoxWidth, rect.y, rect.width - iconBoxWidth, 'left');
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Change in actor
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.setItem = function(actorId) {
    if(this._actorId === actorId) return;
	this._actorId = actorId;
	this.refresh();
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
	this.setBackgroundType(2 * (CGMZ.Professions.WindowTransparency));
	this._profession = null;
	this._imageOffsetInfo = {x:0, y:0, width:0, height:0};
	this._largeIconWidth = ImageManager.iconWidth*2.2;
	this._largeIconHeight = ImageManager.iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem("IconSet");
	this._iconSprite = new Sprite();
	this.addInnerChild(this._iconSprite);
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.loadWindowskin = function() {
	if(CGMZ.Professions.DisplayWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Professions.DisplayWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		this.windowskin = ImageManager.loadSystem("Window");
	}
};
//-----------------------------------------------------------------------------
// Update. Check if a buff falls off and refresh accordingly
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.update = function() {
	CGMZ_Window_Scrollable.prototype.update.call(this);
	if(this._profession && this._profession._needRefreshForBuff) {
		this.refresh();
		this._profession._needRefreshForBuff = false;
	}
};
//-----------------------------------------------------------------------------
// Set the profession to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.setItem = function(profession) {
	this._profession = profession;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.refresh = function() {
	if(!this._profession) return;
	this.setupWindowForNewEntry();
	this._imageOffsetInfo = {x:0, y:0, width:0, height:0};
	this._iconSprite.hide();
	if(this._profession._image) {
		this.loadProfessionImage();
	} else {
		this.drawProfessionInfo();
	}
};
//-----------------------------------------------------------------------------
// Draw Profession Info - performed after all images are loaded
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionInfo = function() {
	for(const infoType of CGMZ.Professions.DisplayInfo) {
		switch(infoType) {
			case "Name":
				this.drawProfessionName();
				this._neededHeight += this.lineHeight();
				break;
			case "Image":
				if(this._profession._image) {
					this.displayProfessionImage();
				} else {
					this.drawLargeIcon();
				}
				break;
			case "Level":
				this.drawProfessionLevel();
				this._neededHeight += this.lineHeight();
				break;
			case "Exp":
				this.drawProfessionExperience();
				this._neededHeight += this.lineHeight();
				break;
			case "Exp To Level":
				this.drawProfessionExperienceToLevel();
				this._neededHeight += this.lineHeight();
				break;
			case "Description":
				this._neededHeight += this.drawProfessionDescription();
				break;
			case "Recipes Header":
				if(Imported.CGMZ_Crafting) {
					this.CGMZ_drawHeader(CGMZ.Professions.RecipeHeaderText, this._neededHeight, CGMZ.Professions.HeaderColor1, CGMZ.Professions.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Recipes":
				if(Imported.CGMZ_Crafting) {
					const recipes = $cgmz.getDiscoveredRecipesOfType(this._profession.getId());
					if(recipes.length > 0) {
						this.drawProfessionRecipes(recipes);
					} else {
						this.CGMZ_drawTextLine(CGMZ.Professions.NoRecipesText, 0, this._neededHeight, this.contents.width, 'left');
						this._neededHeight += this.lineHeight();
					}
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Name of profession
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionName = function() {
	this.contents.fontBold = true;
	this.drawText(this._profession.getDisplayName(), 0, this._neededHeight, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Load profession custom image
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.loadProfessionImage = function() {
	this._iconSprite.bitmap = ImageManager.loadPicture(this._profession._image);
	this._iconSprite.bitmap.addLoadListener(this.drawProfessionInfo.bind(this));
};
//-----------------------------------------------------------------------------
// Display profession custom image after load
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.displayProfessionImage = function() {
	this._iconSprite.y = this._neededHeight + 4;
	this._iconSprite.x = 0;
	this._imageOffsetInfo.y = this._iconSprite.y;
	this._imageOffsetInfo.width = this._iconSprite.width + 4;
	this._imageOffsetInfo.height = this._iconSprite.height;
	this._iconSprite.show();
};
//-----------------------------------------------------------------------------
// Draw profession level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionLevel = function() {
	const profession = this._profession;
	const buffLevel = (profession.getBuffedLevel() - profession._level);
	const buffLevelString = (buffLevel > 0) ? " + " + buffLevel : "";
	const descriptor1 = CGMZ.Professions.LevelText;
	const descriptor2 = profession._level + buffLevelString + " / " + profession._maxLevel;
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionExperience = function() {
	const profession = this._profession;
	const exp = profession._exp;
	const descriptor1 = CGMZ.Professions.ExpText;
	const descriptor2 = $cgmzTemp.numberSplit(exp);
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience to next level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionExperienceToLevel = function() {
	const profession = this._profession;
	const descriptor1 = CGMZ.Professions.ExpToLevelText;
	const descriptor2 = $cgmzTemp.numberSplit(profession.expNeededToNextLevel());
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession description - returns height of drawn text
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionDescription = function() {
	const width = this.contents.width;
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(CGMZ.Professions.DescriptionText, "", x, width);
	const firstLineXOffset = this.textWidth(CGMZ.Professions.DescriptionText);
	const returnY = this.CGMZ_drawText(this._profession._description, x, firstLineXOffset, this._neededHeight, width, CGMZ.Professions.DescriptionAlignment);
	return returnY;
};
//-----------------------------------------------------------------------------
// Draw profession recipes
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionRecipes = function(recipes) {
	for(const recipe of recipes) {
		let x = 0;
		if(recipe._iconIndex > 0) {
			this.drawIcon(recipe._iconIndex, 0, this._neededHeight + 4);
			x += ImageManager.iconWidth + 4;
		}
		this.drawText(recipe._name, x, this._neededHeight, this.contents.width - x, 'left');
		this._neededHeight += this.lineHeight();
	}
};
//-----------------------------------------------------------------------------
// Draws a standard line (blue system text: white text)
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionStandardLine = function(descriptor1, descriptor2, x, width) {
	this.changeTextColor(ColorManager.textColor(CGMZ.Professions.LabelColor));
	this.drawText(descriptor1, x, this._neededHeight, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(descriptor2, x, this._neededHeight, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw Large icon
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawLargeIcon = function() {
	const iconIndex = this._profession._iconIndex;
	let bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
	const dw = this._largeIconWidth;
	const dh = this._largeIconHeight;
	const x = 0;
	const y = this._neededHeight;
	this._imageOffsetInfo.y = y;
	this._imageOffsetInfo.width = dw + 4;
	this._imageOffsetInfo.height = dh;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Determine if offset is needed due to image
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.needsOffset = function() {
	const imageOffsetTotalSpace = this._imageOffsetInfo.y + this._imageOffsetInfo.height;
	const neededArea = this._neededHeight + this.lineHeight();
	return (
		neededArea >= this._imageOffsetInfo.y &&
		this._neededHeight <= imageOffsetTotalSpace &&
		imageOffsetTotalSpace > 0
	);
};
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Use buff item processing
//=============================================================================
//-----------------------------------------------------------------------------
// Item use may cause temporary profession buff
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	alias_CGMZ_Professions_useItem.call(this, item);
	if(DataManager.isItem(item)) {
        $cgmzTemp.checkItemForProfessionBuff(item);
    }
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
		this.drawText(CGMZ.Professions.LevelText + toastObject.level, 0, this.lineHeight(), this.contents.width, 'center');
	}
	if(toastObject.hasOwnProperty('CGMZProfessionToastDiscover')) {
		this.drawText(CGMZ.Professions.DiscoverText, 0, 0, this.contents.width, 'center');
		this.changeTextColor(toastObject.color);
		this.drawText(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
		this.changeTextColor(ColorManager.normalColor());
	}
};
}