//=============================================================================
// VisuStella MZ - Proximity Compass
// VisuMZ_4_ProximityCompass.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ProximityCompass = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ProximityCompass = VisuMZ.ProximityCompass || {};
VisuMZ.ProximityCompass.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [ProximityCompass]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Proximity_Compass_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that adds a compass to the map screen, marking
 * the position of nearby events and the directions of far away events. Events
 * are represented by icons from the icon set. This can be used to help the
 * player locate objectives, points of interests, NPCs, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Places a compass on the main map screen.
 * * Said compass will show the marked events on it with icons.
 * * Marked events will move around the compass relative to the player's
 *   current position on the map.
 * * Fade out marked events that are too far from the player's location.
 * * The compass can be turned on/off in the Options menu.
 * * The compass can also be resized in the Options menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * ---
 * 
 * === Proximity Compass Notetags and Comment Tags ===
 * 
 * ---
 *
 * <Hide Compass>
 *
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the compass to show.
 *
 * ---
 *
 * <Compass Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will assign an icon to the event or the event's page.
 * - Replace 'x' with a number representing the icon index you wish for this
 *   event or event page to appear as in the Proximity Compass.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Compass Proximity: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear on the compass if the player is within range.
 * - Replace 'x' with the number of tiles the player must be within range of
 *   this event or event page in order to appear in the Proximity Compass.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * Compass: Show/Hide Proximity Compass
 * - Show or hide the Proximity Compass.
 * - Does not bypass user settings.
 *
 *   Setting:
 *   - Show or hide the Proximity Compass.
 *   - Does not bypass user settings.
 *
 * ---
 *
 * Compass: Change Player Icon
 * - Change the player icon to a different icon.
 *
 *   Icon Index:
 *   - This is the icon you wish to change the player icon to.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * Default settings used for the Proximity Compass.
 *
 * ---
 *
 * Default
 * 
 *   Show by Default:
 *   - Show the Proximity Compass by default?
 * 
 *   Proximity Range:
 *   - Default range from the player to be shown on the Proximity Compass.
 * 
 *   Player Icon:
 *   - Icon used for the player to show on the Proximity Compass.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compass Settings
 * ============================================================================
 *
 * Compass settings used for the Proximity Compass.
 *
 * ---
 *
 * Position
 * 
 *   Center X:
 *   - Code used to calculate the X position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 * 
 *   Center Y:
 *   - Code used to calculate the Y position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 *
 * ---
 *
 * Contents
 * 
 *   Filename:
 *   - The picture used for the compass' frame.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Radius:
 *   - Radius of the Proximity Compass in pixels.
 * 
 *   Tile Scale:
 *   - The scale used to calculate the distance of a tile relative to the
 *     distance on the compass
 * 
 *   Back Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Back Opacity:
 *   - Sets the opacity of the back color.
 *
 * ---
 *
 * Fading
 * 
 *   Compass Fade Speed:
 *   - Fade speed of the compass when toggled on/off.
 *   - Lower is slower. Higher is faster.
 * 
 *   Icon Fade Speed:
 *   - Fade speed of the icons when out of range.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Hiding
 * 
 *   Hide During Messages:
 *   - If true, hide compass whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide compass whenever an event is running.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for the Proximity Compass.
 *
 * ---
 *
 * Options
 * 
 *   Add Show Option?:
 *   - Add the 'Show Compass' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Size Option?:
 *   - Add the 'Compass Size' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.03: January 15, 2021
 * * Feature Update!
 * ** Failsafes added in case events added manually through other plugins do
 *    not update with proper events.
 * 
 * Version 1.02: November 15, 2020
 * * Bug Fix!
 * ** Events spawned by the Events & Movement Core will now have their compass
 *    icons displayed upon spawning without requiring a reload of the map. Fix
 *    made by Arisu.
 * 
 * Version 1.01: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 *
 * Version 1.00: October 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassVisibility
 * @text Compass: Show/Hide Proximity Compass
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 *
 * @arg value:eval
 * @text Setting
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassPlayerIcon
 * @text Compass: Change Player Icon
 * @desc Change the player icon to a different icon.
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @desc This is the icon you wish to change the player icon to.
 * @default 82
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
 * @param ProximityCompass
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Default:struct
 * @text Default Settings
 * @type struct<Default>
 * @desc Default settings used for the Proximity Compass.
 * @default {"Show:eval":"true","Proximity:num":"1000","PlayerIcon:num":"82"}
 *
 * @param Compass:struct
 * @text Compass Settings
 * @type struct<Compass>
 * @desc Compass settings used for the Proximity Compass.
 * @default {"Position":"","CenterX:str":"Graphics.width - 128 * ConfigManager.compassSize / 100","CenterY:str":"Graphics.height - 128 * ConfigManager.compassSize / 100","Contents":"","Filename:str":"","Radius:num":"100","TileScale:num":"0.25","BackColor:str":"#000000","BackOpacity:num":"200","Fading":"","CompassFadeSpeed:num":"16","IconFadeSpeed:num":"16","Hiding":"","HideMessage:eval":"false","HideEvents:eval":"false"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for the Proximity Compass.
 * @default {"AddShowOption:eval":"true","ShowName:str":"Show Compass","AddSizeOption:eval":"true","SizeName:str":"Compass Size","AdjustRect:eval":"true"}
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
 * Default Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Show:eval
 * @text Show by Default
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Proximity Compass by default?
 * @default true
 *
 * @param Proximity:num
 * @text Proximity Range
 * @type Number
 * @min 1
 * @max 1000
 * @desc Default range from the player to be shown on the Proximity Compass.
 * @default 1000
 *
 * @param PlayerIcon:num
 * @text Player Icon
 * @desc Icon used for the player to show on the Proximity Compass.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Compass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compass:
 *
 * @param Position
 *
 * @param CenterX:str
 * @text Center X
 * @parent Position
 * @desc Code used to calculate the X position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.width - 128 * ConfigManager.compassSize / 100
 *
 * @param CenterY:str
 * @text Center Y
 * @parent Position
 * @desc Code used to calculate the Y position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.height - 128 * ConfigManager.compassSize / 100
 *
 * @param Contents
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc The picture used for the compass' frame.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param Radius:num
 * @text Radius
 * @parent Contents
 * @type Number
 * @min 1
 * @desc Radius of the Proximity Compass in pixels.
 * @default 100
 *
 * @param TileScale:num
 * @text Tile Scale
 * @parent Contents
 * @desc The scale used to calculate the distance of a tile relative to the distance on the compass
 * @default 0.25
 *
 * @param BackColor:str
 * @text Back Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #000000
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the back color.
 * @default 200
 *
 * @param Fading
 *
 * @param CompassFadeSpeed:num
 * @text Compass Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the compass when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param IconFadeSpeed:num
 * @text Icon Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the icons when out of range.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Hiding
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever a message is being displayed.
 * @default false
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever an event is running.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddShowOption:eval
 * @text Add Show Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Compass' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Compass
 *
 * @param AddSizeOption:eval
 * @text Add Size Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Compass Size' option to the Options menu?
 * @default true
 *
 * @param SizeName:str
 * @text Option Name
 * @parent AddSizeOption:eval
 * @desc Command name of the option.
 * @default Compass Size
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 */
//=============================================================================

const _0x20de=['createFrame','Options','sqrt','addProximityCompassSizeCommand','updateFrame','Compass','loadPicture','setupProximityCompassNotetags','setupPageSettings','setupSpawnProximityCompass','_eventOverload','1ClfIJV','updateOpacity','getConfigValue','Proximity','Settings','Scene_Map_createSpriteset','ARRAYEVAL','Radius','initProximityCompassEffects','AdjustRect','Default','cos','floor','isBusy','isShow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Window_Options_isVolumeSymbol','deltaX','abs','159jegfRD','29UxKuPD','bitmap','_showProximityCompass','_characterSprites','Game_Event_setupPageSettings','exit','screenY','isEventRunning','updatePosition','match','status','_ProximityCompassBackgroundSprite','push','createBackground','_playerCompassIcon','_compassProximity','EVAL','40676cSQaIR','code','loadBitmap','STR','call','clearPageSettings','round','description','isCloseToCompassScreenPosition','changeProximityCompassSize','Show','event','includes','BackColor','contains','isShowProximityCompass','Game_Event_refresh','735700hfxdyo','Window_Options_addGeneralOptions','createProximityCompass','paintOpacity','length','1642443dRIuCz','changeVolume','addShowProximityCompassCommand','applyData','iconHeight','initialize','setShowProximityCompass','_erased','CenterY','314tssnDz','ConvertParams','_compassIconIndex','HideEvents','drawCircle','IconSet','checkProximityCompassStringTags','addChild','note','blendMode','Game_Event_setupSpawn','update','parse','NUM','showCompass','FUNC','Window_Options_changeVolume','refresh','_ProximityCompassSprite','clamp','changeValue','apply','return\x200','createSprites','isVolumeSymbol','makeData','getPlayerCompassIcon','map','375819DfRlxO','375953IYJgrc','tileWidth','scale','screenX','prototype','ConfigManager_makeData','_ProximityCompassFrameSprite','compassSize','hideCompass','_scene','loadSystem','setupSpawn','version','setupProximityCompassEffects','create','CompassPlayerIcon','addProximityCompassCommands','events','forEach','createSpriteset','setFrame','ARRAYSTRUCT','tileHeight','trim','STRUCT','_iconIndex','iconWidth','max','SizeName','PlayerIcon','setupProximityCompassCommentTags','page','_realX','registerCommand','TileScale','AddShowOption','8XjltgD','setInitialOpacity','parameters','CompassVisibility','anchor','format','_realY','filter','isSceneMap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_System_initialize','constructor','initializeProximityCompass','AddSizeOption','toUpperCase','Scene_Options_maxCommands','50819QQELQw','name','opacity','addGeneralOptions','_character','atan2','isEventOverloaded','ProximityCompass','maxCommands','setPlayerCompassIcon','addCommand','BackOpacity','_emptyBitmap','JSON'];const _0x4538=function(_0x4d9c86,_0x5d7741){_0x4d9c86=_0x4d9c86-0x78;let _0x20ded1=_0x20de[_0x4d9c86];return _0x20ded1;};const _0x1b7221=_0x4538;(function(_0x2db5c2,_0x3ad4a9){const _0x5e4ea8=_0x4538;while(!![]){try{const _0x38aac5=-parseInt(_0x5e4ea8(0xe3))+parseInt(_0x5e4ea8(0x108))+parseInt(_0x5e4ea8(0x109))*-parseInt(_0x5e4ea8(0xa8))+-parseInt(_0x5e4ea8(0x8f))*-parseInt(_0x5e4ea8(0xbc))+parseInt(_0x5e4ea8(0xde))+parseInt(_0x5e4ea8(0x7f))*parseInt(_0x5e4ea8(0xcd))+-parseInt(_0x5e4ea8(0xec))*parseInt(_0x5e4ea8(0xbb));if(_0x38aac5===_0x3ad4a9)break;else _0x2db5c2['push'](_0x2db5c2['shift']());}catch(_0x115146){_0x2db5c2['push'](_0x2db5c2['shift']());}}}(_0x20de,0xcda74));var label=_0x1b7221(0x96),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1b7221(0x86)](function(_0x215e34){const _0x316fef=_0x1b7221;return _0x215e34[_0x316fef(0xc6)]&&_0x215e34[_0x316fef(0xd4)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1b7221(0xac)]||{},VisuMZ[_0x1b7221(0xed)]=function(_0x1f6e1e,_0x4d8cd1){const _0x1eee1f=_0x1b7221;for(const _0x29f40b in _0x4d8cd1){if(_0x29f40b[_0x1eee1f(0xc5)](/(.*):(.*)/i)){const _0x38fc75=String(RegExp['$1']),_0x116a62=String(RegExp['$2'])[_0x1eee1f(0x8d)]()[_0x1eee1f(0x120)]();let _0x6e8755,_0x35fd13,_0xecdfa9;switch(_0x116a62){case _0x1eee1f(0xf9):_0x6e8755=_0x4d8cd1[_0x29f40b]!==''?Number(_0x4d8cd1[_0x29f40b]):0x0;break;case'ARRAYNUM':_0x35fd13=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):[],_0x6e8755=_0x35fd13['map'](_0x3eaec9=>Number(_0x3eaec9));break;case _0x1eee1f(0xcc):_0x6e8755=_0x4d8cd1[_0x29f40b]!==''?eval(_0x4d8cd1[_0x29f40b]):null;break;case _0x1eee1f(0xae):_0x35fd13=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):[],_0x6e8755=_0x35fd13[_0x1eee1f(0x107)](_0xee7bad=>eval(_0xee7bad));break;case _0x1eee1f(0x9c):_0x6e8755=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):'';break;case'ARRAYJSON':_0x35fd13=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):[],_0x6e8755=_0x35fd13[_0x1eee1f(0x107)](_0x290911=>JSON['parse'](_0x290911));break;case _0x1eee1f(0xfb):_0x6e8755=_0x4d8cd1[_0x29f40b]!==''?new Function(JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b])):new Function(_0x1eee1f(0x102));break;case'ARRAYFUNC':_0x35fd13=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):[],_0x6e8755=_0x35fd13[_0x1eee1f(0x107)](_0x27bcfc=>new Function(JSON[_0x1eee1f(0xf8)](_0x27bcfc)));break;case _0x1eee1f(0xd0):_0x6e8755=_0x4d8cd1[_0x29f40b]!==''?String(_0x4d8cd1[_0x29f40b]):'';break;case'ARRAYSTR':_0x35fd13=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):[],_0x6e8755=_0x35fd13[_0x1eee1f(0x107)](_0x131753=>String(_0x131753));break;case _0x1eee1f(0x121):_0xecdfa9=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):{},_0x6e8755=VisuMZ[_0x1eee1f(0xed)]({},_0xecdfa9);break;case _0x1eee1f(0x11e):_0x35fd13=_0x4d8cd1[_0x29f40b]!==''?JSON[_0x1eee1f(0xf8)](_0x4d8cd1[_0x29f40b]):[],_0x6e8755=_0x35fd13[_0x1eee1f(0x107)](_0x2e2a1e=>VisuMZ[_0x1eee1f(0xed)]({},JSON[_0x1eee1f(0xf8)](_0x2e2a1e)));break;default:continue;}_0x1f6e1e[_0x38fc75]=_0x6e8755;}}return _0x1f6e1e;},(_0x1d7506=>{const _0x1fe172=_0x1b7221,_0x5a1d60=_0x1d7506[_0x1fe172(0x90)];for(const _0x5e7e25 of dependencies){if(!Imported[_0x5e7e25]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1fe172(0x84)](_0x5a1d60,_0x5e7e25)),SceneManager['exit']();break;}}const _0x3e0198=_0x1d7506[_0x1fe172(0xd4)];if(_0x3e0198[_0x1fe172(0xc5)](/\[Version[ ](.*?)\]/i)){const _0x48414e=Number(RegExp['$1']);_0x48414e!==VisuMZ[label][_0x1fe172(0x115)]&&(alert(_0x1fe172(0x88)['format'](_0x5a1d60,_0x48414e)),SceneManager[_0x1fe172(0xc1)]());}if(_0x3e0198[_0x1fe172(0xc5)](/\[Tier[ ](\d+)\]/i)){const _0x328a1f=Number(RegExp['$1']);_0x328a1f<tier?(alert(_0x1fe172(0xb7)[_0x1fe172(0x84)](_0x5a1d60,_0x328a1f,tier)),SceneManager['exit']()):tier=Math[_0x1fe172(0x124)](_0x328a1f,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1fe172(0xac)],_0x1d7506[_0x1fe172(0x81)]);})(pluginData),PluginManager[_0x1b7221(0x7c)](pluginData[_0x1b7221(0x90)],_0x1b7221(0x82),_0x245cf8=>{const _0x2c8354=_0x1b7221;VisuMZ['ConvertParams'](_0x245cf8,_0x245cf8);const _0x1359fb=_0x245cf8['value'];$gameSystem[_0x2c8354(0xe9)](_0x1359fb);}),PluginManager['registerCommand'](pluginData[_0x1b7221(0x90)],_0x1b7221(0x118),_0x388d84=>{const _0x3f3dd7=_0x1b7221;VisuMZ['ConvertParams'](_0x388d84,_0x388d84);const _0x675adf=_0x388d84['iconIndex'];$gameSystem[_0x3f3dd7(0x98)](_0x675adf);}),ConfigManager['showCompass']=!![],ConfigManager['compassSize']=0x64,VisuMZ[_0x1b7221(0x96)]['ConfigManager_makeData']=ConfigManager[_0x1b7221(0x105)],ConfigManager[_0x1b7221(0x105)]=function(){const _0x3b7b5b=_0x1b7221,_0x20ecea=VisuMZ[_0x3b7b5b(0x96)][_0x3b7b5b(0x10e)][_0x3b7b5b(0xd1)](this);return _0x20ecea[_0x3b7b5b(0xfa)]=this[_0x3b7b5b(0xfa)],_0x20ecea[_0x3b7b5b(0x110)]=this[_0x3b7b5b(0x110)],_0x20ecea;},VisuMZ['ProximityCompass']['ConfigManager_applyData']=ConfigManager[_0x1b7221(0xe6)],ConfigManager[_0x1b7221(0xe6)]=function(_0x475718){const _0x9897de=_0x1b7221;VisuMZ[_0x9897de(0x96)]['ConfigManager_applyData']['call'](this,_0x475718),_0x9897de(0xfa)in _0x475718?this[_0x9897de(0xfa)]=_0x475718['showCompass']:this[_0x9897de(0xfa)]=ConfigManager[_0x9897de(0xfa)],_0x9897de(0x110)in _0x475718?this[_0x9897de(0x110)]=_0x475718[_0x9897de(0x110)]:this[_0x9897de(0x110)]=ConfigManager[_0x9897de(0x110)];},SceneManager[_0x1b7221(0x87)]=function(){const _0x4be9ee=_0x1b7221;return this[_0x4be9ee(0x112)]&&this[_0x4be9ee(0x112)][_0x4be9ee(0x8a)]===Scene_Map;},TextManager[_0x1b7221(0xfa)]=VisuMZ[_0x1b7221(0x96)]['Settings']['Options']['ShowName'],TextManager['compassSize']=VisuMZ['ProximityCompass']['Settings'][_0x1b7221(0x9e)][_0x1b7221(0x125)],VisuMZ[_0x1b7221(0x96)][_0x1b7221(0x89)]=Game_System['prototype'][_0x1b7221(0xe8)],Game_System[_0x1b7221(0x10d)][_0x1b7221(0xe8)]=function(){const _0x334e30=_0x1b7221;VisuMZ[_0x334e30(0x96)][_0x334e30(0x89)][_0x334e30(0xd1)](this),this[_0x334e30(0x8b)]();},Game_System['prototype'][_0x1b7221(0x8b)]=function(){const _0x2be008=_0x1b7221;this[_0x2be008(0xbe)]=VisuMZ[_0x2be008(0x96)][_0x2be008(0xac)]['Default'][_0x2be008(0xd7)],this['_playerCompassIcon']=VisuMZ[_0x2be008(0x96)][_0x2be008(0xac)][_0x2be008(0xb2)][_0x2be008(0x78)];},Game_System[_0x1b7221(0x10d)]['isShowProximityCompass']=function(){const _0x4e2f8d=_0x1b7221;return this[_0x4e2f8d(0xbe)]===undefined&&this[_0x4e2f8d(0x8b)](),this[_0x4e2f8d(0xbe)];},Game_System[_0x1b7221(0x10d)][_0x1b7221(0xe9)]=function(_0x3fb6a9){const _0x1f16f0=_0x1b7221;this['_showProximityCompass']===undefined&&this[_0x1f16f0(0x8b)](),this[_0x1f16f0(0xbe)]=_0x3fb6a9;},Game_System[_0x1b7221(0x10d)]['getPlayerCompassIcon']=function(){const _0xdcca2c=_0x1b7221;return this[_0xdcca2c(0xca)]===undefined&&this[_0xdcca2c(0x8b)](),this[_0xdcca2c(0xca)];},Game_System[_0x1b7221(0x10d)][_0x1b7221(0x98)]=function(_0x2a7688){const _0x131450=_0x1b7221;this[_0x131450(0xca)]===undefined&&this[_0x131450(0x8b)](),this[_0x131450(0xca)]=_0x2a7688;},Game_Map[_0x1b7221(0x10d)][_0x1b7221(0x95)]=function(){const _0x4e1484=_0x1b7221;return this[_0x4e1484(0xa7)];},Game_Map[_0x1b7221(0x10d)][_0x1b7221(0x111)]=function(){const _0x1e1830=_0x1b7221;if(!ConfigManager[_0x1e1830(0xfa)])return!![];else return!!$dataMap&&!!$dataMap[_0x1e1830(0xf4)]?$dataMap['note']['match'](/<HIDE COMPASS>/i):![];},Game_Player[_0x1b7221(0x10d)][_0x1b7221(0xd5)]=function(){const _0x5f4cdc=_0x1b7221;if(!SceneManager[_0x5f4cdc(0x87)]())return![];const _0x2df218=SceneManager['_scene'][_0x5f4cdc(0xfe)];if(!_0x2df218)return![];const _0x1e8c98=_0x2df218['x'],_0x301eb9=_0x2df218['y'],_0x50cb3a=VisuMZ['ProximityCompass'][_0x5f4cdc(0xac)][_0x5f4cdc(0xa2)][_0x5f4cdc(0xaf)]||0x1,_0x56b9a4=_0x2df218[_0x5f4cdc(0x10b)]['x'],_0x245d77=new Rectangle(_0x1e8c98-_0x50cb3a*_0x56b9a4,_0x301eb9-_0x50cb3a*_0x56b9a4,_0x50cb3a*_0x56b9a4*0x2+$gameMap['tileWidth']()/0x2,_0x50cb3a*_0x56b9a4*0x2+$gameMap[_0x5f4cdc(0x11f)]()/0x2);return _0x245d77[_0x5f4cdc(0xdb)](this[_0x5f4cdc(0x10c)](),this[_0x5f4cdc(0xc2)]());},VisuMZ['ProximityCompass'][_0x1b7221(0xdd)]=Game_Event[_0x1b7221(0x10d)]['refresh'],Game_Event[_0x1b7221(0x10d)][_0x1b7221(0xfd)]=function(){const _0x324fe1=_0x1b7221;VisuMZ[_0x324fe1(0x96)][_0x324fe1(0xdd)]['call'](this),this[_0x324fe1(0x116)]();},VisuMZ[_0x1b7221(0x96)]['Game_Event_clearPageSettings']=Game_Event[_0x1b7221(0x10d)][_0x1b7221(0xd2)],Game_Event[_0x1b7221(0x10d)]['clearPageSettings']=function(){const _0x2b530f=_0x1b7221;VisuMZ['ProximityCompass']['Game_Event_clearPageSettings'][_0x2b530f(0xd1)](this),this[_0x2b530f(0xb0)]();},VisuMZ[_0x1b7221(0x96)][_0x1b7221(0xc0)]=Game_Event[_0x1b7221(0x10d)][_0x1b7221(0xa5)],Game_Event[_0x1b7221(0x10d)][_0x1b7221(0xa5)]=function(){const _0x3bcb43=_0x1b7221;VisuMZ[_0x3bcb43(0x96)][_0x3bcb43(0xc0)]['call'](this),this[_0x3bcb43(0x116)]();},Game_Event['prototype']['setupProximityCompassEffects']=function(){const _0x48fe06=_0x1b7221;if(!this[_0x48fe06(0xd8)]())return;this[_0x48fe06(0xb0)](),this['setupProximityCompassNotetags'](),this[_0x48fe06(0x79)]();},Game_Event[_0x1b7221(0x10d)][_0x1b7221(0xa4)]=function(){const _0x57a283=_0x1b7221,_0x2eb98f=this[_0x57a283(0xd8)]()['note'];if(_0x2eb98f==='')return;this['checkProximityCompassStringTags'](_0x2eb98f);},Game_Event['prototype']['setupProximityCompassCommentTags']=function(){const _0x20c738=_0x1b7221;if(!this[_0x20c738(0x7a)]())return;const _0x294eb3=this['list']();let _0x3da6df='';for(const _0x4567de of _0x294eb3){if([0x6c,0x198][_0x20c738(0xd9)](_0x4567de[_0x20c738(0xce)])){if(_0x3da6df!=='')_0x3da6df+='\x0a';_0x3da6df+=_0x4567de[_0x20c738(0x81)][0x0];}}this[_0x20c738(0xf2)](_0x3da6df);},Game_Event[_0x1b7221(0x10d)][_0x1b7221(0xb0)]=function(){const _0xa00775=_0x1b7221;this[_0xa00775(0xee)]=0x0,this['_compassProximity']=VisuMZ['ProximityCompass'][_0xa00775(0xac)][_0xa00775(0xb2)][_0xa00775(0xab)];},Game_Event[_0x1b7221(0x10d)]['checkProximityCompassStringTags']=function(_0x743d4a){const _0x440e08=_0x1b7221;_0x743d4a['match'](/<COMPASS ICON: (\d+)>/i)&&(this[_0x440e08(0xee)]=parseInt(RegExp['$1'])),_0x743d4a[_0x440e08(0xc5)](/<COMPASS PROXIMITY: (\d+)>/i)&&(this[_0x440e08(0xcb)]=parseInt(RegExp['$1']));},VisuMZ[_0x1b7221(0x96)][_0x1b7221(0xf6)]=Game_Event[_0x1b7221(0x10d)][_0x1b7221(0x114)],Game_Event['prototype'][_0x1b7221(0x114)]=function(_0x19372a){const _0x400852=_0x1b7221;VisuMZ[_0x400852(0x96)][_0x400852(0xf6)][_0x400852(0xd1)](this,_0x19372a),this['setupSpawnProximityCompass']();},Game_Event[_0x1b7221(0x10d)][_0x1b7221(0xa6)]=function(){const _0x41751b=_0x1b7221,_0x19be16=SceneManager[_0x41751b(0x112)];if(!_0x19be16)return;const _0x3c15c6=_0x19be16[_0x41751b(0xfe)];if(!_0x3c15c6)return;const _0x49ec2a=_0x3c15c6[_0x41751b(0xbf)][_0x41751b(0xe2)]-0x1,_0x55c064=new Sprite_CompassIcon(this);_0x3c15c6[_0x41751b(0xbf)]['push'](_0x55c064),_0x3c15c6['addChildAt'](_0x55c064,_0x49ec2a);},VisuMZ[_0x1b7221(0x96)][_0x1b7221(0xad)]=Scene_Map['prototype'][_0x1b7221(0x11c)],Scene_Map[_0x1b7221(0x10d)][_0x1b7221(0x11c)]=function(){const _0xa9d1d5=_0x1b7221;VisuMZ[_0xa9d1d5(0x96)][_0xa9d1d5(0xad)]['call'](this),this[_0xa9d1d5(0xe0)]();},Scene_Map[_0x1b7221(0x10d)][_0x1b7221(0xe0)]=function(){const _0xc1a7dd=_0x1b7221;if(this[_0xc1a7dd(0x8a)]!==Scene_Map)return;this[_0xc1a7dd(0xfe)]=new Sprite_ProximityCompass(),this[_0xc1a7dd(0xf3)](this[_0xc1a7dd(0xfe)]);},VisuMZ['ProximityCompass'][_0x1b7221(0x8e)]=Scene_Options[_0x1b7221(0x10d)][_0x1b7221(0x97)],Scene_Options[_0x1b7221(0x10d)][_0x1b7221(0x97)]=function(){const _0x5b32be=_0x1b7221;let _0x3e385f=VisuMZ[_0x5b32be(0x96)][_0x5b32be(0x8e)][_0x5b32be(0xd1)](this);const _0x5ac3c8=VisuMZ['ProximityCompass'][_0x5b32be(0xac)]['Options'];if(_0x5ac3c8[_0x5b32be(0xb1)]){if(_0x5ac3c8[_0x5b32be(0x7e)])_0x3e385f++;if(_0x5ac3c8[_0x5b32be(0x8c)])_0x3e385f++;}return _0x3e385f;};function Sprite_ProximityCompass(){const _0x58c0cb=_0x1b7221;this[_0x58c0cb(0xe8)][_0x58c0cb(0x101)](this,arguments);}Sprite_ProximityCompass[_0x1b7221(0x10d)]=Object[_0x1b7221(0x117)](Sprite_Clickable[_0x1b7221(0x10d)]),Sprite_ProximityCompass[_0x1b7221(0x10d)][_0x1b7221(0x8a)]=Sprite_ProximityCompass,Sprite_ProximityCompass[_0x1b7221(0x10d)][_0x1b7221(0xe8)]=function(){const _0x2ac39a=_0x1b7221;Sprite_Clickable[_0x2ac39a(0x10d)][_0x2ac39a(0xe8)][_0x2ac39a(0xd1)](this),this[_0x2ac39a(0x103)](),this['x']=eval(VisuMZ['ProximityCompass'][_0x2ac39a(0xac)][_0x2ac39a(0xa2)]['CenterX']),this['y']=eval(VisuMZ[_0x2ac39a(0x96)][_0x2ac39a(0xac)]['Compass'][_0x2ac39a(0xeb)]),this['anchor']['x']=0.5,this[_0x2ac39a(0x83)]['y']=0.5,this[_0x2ac39a(0xf5)]=0x2,!this[_0x2ac39a(0xb6)]()&&(this[_0x2ac39a(0x91)]=0x0),this[_0x2ac39a(0x10b)]['x']=ConfigManager['compassSize']*0.01,this[_0x2ac39a(0x10b)]['y']=ConfigManager['compassSize']*0.01;},Sprite_ProximityCompass['prototype'][_0x1b7221(0x103)]=function(){const _0x3b794d=_0x1b7221;this[_0x3b794d(0xc9)](),this['createFrame'](),this['createCharacters'](),this[_0x3b794d(0xf7)]();},Sprite_ProximityCompass[_0x1b7221(0x10d)]['createBackground']=function(){const _0x6b253b=_0x1b7221;this['_ProximityCompassBackgroundSprite']=new Sprite(),this['addChild'](this[_0x6b253b(0xc7)]),this['_ProximityCompassBackgroundSprite']['anchor']['x']=0.5,this[_0x6b253b(0xc7)][_0x6b253b(0x83)]['y']=0.5;const _0x268802=VisuMZ['ProximityCompass']['Settings'][_0x6b253b(0xa2)],_0x1e8a76=_0x268802[_0x6b253b(0xaf)];var _0x37a3ce=_0x1e8a76*0x2,_0x3e196d=_0x1e8a76*0x2,_0x4f7bb3=_0x268802[_0x6b253b(0xda)];const _0x502f80=new Bitmap(_0x37a3ce,_0x3e196d);_0x502f80[_0x6b253b(0xe1)]=_0x268802[_0x6b253b(0x9a)],_0x502f80[_0x6b253b(0xf0)](_0x37a3ce/0x2,_0x3e196d/0x2,_0x37a3ce/0x2,_0x4f7bb3),this[_0x6b253b(0xc7)][_0x6b253b(0xbd)]=_0x502f80;},Sprite_ProximityCompass[_0x1b7221(0x10d)][_0x1b7221(0x9d)]=function(){const _0x3d6fcd=_0x1b7221;this['_ProximityCompassFrameSprite']=new Sprite(),this[_0x3d6fcd(0xf3)](this['_ProximityCompassFrameSprite']),this[_0x3d6fcd(0x10f)][_0x3d6fcd(0x83)]['x']=0.5,this[_0x3d6fcd(0x10f)][_0x3d6fcd(0x83)]['y']=0.5;const _0x334666=VisuMZ[_0x3d6fcd(0x96)][_0x3d6fcd(0xac)]['Compass']['Filename'];_0x334666?this[_0x3d6fcd(0x10f)][_0x3d6fcd(0xbd)]=ImageManager[_0x3d6fcd(0xa3)](_0x334666):this[_0x3d6fcd(0x10f)][_0x3d6fcd(0xbd)]=ImageManager[_0x3d6fcd(0x9b)];},Sprite_ProximityCompass[_0x1b7221(0x10d)]['createCharacters']=function(){const _0x5c096e=_0x1b7221;this[_0x5c096e(0xbf)]=[],$gameMap[_0x5c096e(0x11a)]()[_0x5c096e(0x11b)](function(_0xfe99b8){const _0x43f8b8=_0x5c096e;this[_0x43f8b8(0xbf)][_0x43f8b8(0xc8)](new Sprite_CompassIcon(_0xfe99b8));},this),this[_0x5c096e(0xbf)][_0x5c096e(0xc8)](new Sprite_CompassIcon($gamePlayer));for(var _0x2f0e67=0x0;_0x2f0e67<this[_0x5c096e(0xbf)]['length'];_0x2f0e67++){this[_0x5c096e(0xf3)](this['_characterSprites'][_0x2f0e67]);}},Sprite_ProximityCompass[_0x1b7221(0x10d)][_0x1b7221(0xf7)]=function(){const _0x3a0e61=_0x1b7221;Sprite_Clickable[_0x3a0e61(0x10d)][_0x3a0e61(0xf7)][_0x3a0e61(0xd1)](this),this[_0x3a0e61(0xa9)]();},Sprite_ProximityCompass[_0x1b7221(0x10d)]['updateOpacity']=function(){const _0x591fe8=_0x1b7221,_0x2d18b9=VisuMZ['ProximityCompass'][_0x591fe8(0xac)][_0x591fe8(0xa2)]['CompassFadeSpeed'];this[_0x591fe8(0xb6)]()?this[_0x591fe8(0x91)]+=_0x2d18b9:this[_0x591fe8(0x91)]-=_0x2d18b9;},Sprite_ProximityCompass['prototype'][_0x1b7221(0xb6)]=function(){const _0x2cf981=_0x1b7221,_0x245620=VisuMZ[_0x2cf981(0x96)][_0x2cf981(0xac)][_0x2cf981(0xa2)];if($gameMap[_0x2cf981(0x111)]())return![];else{if(_0x245620['HideMessage']&&$gameMessage[_0x2cf981(0xb5)]())return![];else{if(_0x245620[_0x2cf981(0xef)]&&$gameMap[_0x2cf981(0xc3)]())return![];else return $gamePlayer[_0x2cf981(0xd5)]()?![]:$gameSystem[_0x2cf981(0xdc)]();}}};function Sprite_CompassIcon(){const _0x5959e5=_0x1b7221;this[_0x5959e5(0xe8)][_0x5959e5(0x101)](this,arguments);}Sprite_CompassIcon['prototype']=Object[_0x1b7221(0x117)](Sprite['prototype']),Sprite_CompassIcon[_0x1b7221(0x10d)][_0x1b7221(0x8a)]=Sprite_CompassIcon,Sprite_CompassIcon['prototype']['initialize']=function(_0x12f932){const _0x5a8674=_0x1b7221;this[_0x5a8674(0x93)]=_0x12f932,this['_iconIndex']=0x0,Sprite['prototype'][_0x5a8674(0xe8)][_0x5a8674(0xd1)](this),this[_0x5a8674(0x83)]['x']=0.5,this[_0x5a8674(0x83)]['y']=0.5,this[_0x5a8674(0xcf)]();var _0x4fef7b=0x1/(ConfigManager[_0x5a8674(0x110)]*0.01);this[_0x5a8674(0x10b)]['x']=_0x4fef7b,this['scale']['y']=_0x4fef7b,this[_0x5a8674(0x80)]();},Sprite_CompassIcon[_0x1b7221(0x10d)][_0x1b7221(0xcf)]=function(){const _0x2b93b3=_0x1b7221;this[_0x2b93b3(0xbd)]=ImageManager[_0x2b93b3(0x113)](_0x2b93b3(0xf1));},Sprite_CompassIcon[_0x1b7221(0x10d)][_0x1b7221(0x80)]=function(){const _0x3e3487=_0x1b7221;if(this['_character']===$gamePlayer)this[_0x3e3487(0x91)]=0xff;else{var _0x396358=this['_character'][_0x3e3487(0xcb)],_0x2c1300=$gameMap[_0x3e3487(0xb9)](this[_0x3e3487(0x93)]['_realX'],$gamePlayer[_0x3e3487(0x7b)]),_0x485579=$gameMap[_0x3e3487(0xb9)](this[_0x3e3487(0x93)][_0x3e3487(0x85)],$gamePlayer[_0x3e3487(0x85)]);_0x396358>=Math[_0x3e3487(0xba)](_0x2c1300)+Math['abs'](_0x485579)?this['opacity']=0xff:this[_0x3e3487(0x91)]=0x0;}},Sprite_CompassIcon['prototype'][_0x1b7221(0xf7)]=function(){const _0x51dc4b=_0x1b7221;Sprite[_0x51dc4b(0x10d)][_0x51dc4b(0xf7)][_0x51dc4b(0xd1)](this),this[_0x51dc4b(0xa9)](),this[_0x51dc4b(0xa1)](),this['updatePosition']();},Sprite_CompassIcon[_0x1b7221(0x10d)][_0x1b7221(0xa9)]=function(){const _0x3185ae=_0x1b7221;if(this['_character']===$gamePlayer)this[_0x3185ae(0x91)]=0xff;else{if(this[_0x3185ae(0x93)]&&this['_character'][_0x3185ae(0xea)])this[_0x3185ae(0x91)]=0x0;else{var _0x4e7329=this[_0x3185ae(0x93)]['_compassProximity'],_0x50d6c2=$gameMap[_0x3185ae(0xb9)](this['_character']['_realX'],$gamePlayer[_0x3185ae(0x7b)]),_0xc69eae=$gameMap[_0x3185ae(0xb9)](this[_0x3185ae(0x93)][_0x3185ae(0x85)],$gamePlayer[_0x3185ae(0x85)]);const _0x3d5cc6=VisuMZ[_0x3185ae(0x96)][_0x3185ae(0xac)]['Compass']['IconFadeSpeed'];_0x4e7329>=Math['abs'](_0x50d6c2)+Math[_0x3185ae(0xba)](_0xc69eae)?this[_0x3185ae(0x91)]+=_0x3d5cc6:this[_0x3185ae(0x91)]-=_0x3d5cc6;}}},Sprite_CompassIcon[_0x1b7221(0x10d)][_0x1b7221(0xa1)]=function(){const _0x4ffef8=_0x1b7221;this['_character']===$gamePlayer?this['_iconIndex']=$gameSystem[_0x4ffef8(0x106)]():this[_0x4ffef8(0x122)]=this[_0x4ffef8(0x93)][_0x4ffef8(0xee)];if(this[_0x4ffef8(0x122)]===0x0)this[_0x4ffef8(0x11d)](0x0,0x0,0x0,0x0);else{var _0x139a4f=ImageManager[_0x4ffef8(0x123)],_0x333da1=ImageManager[_0x4ffef8(0xe7)],_0x904ac9=this['_iconIndex']%0x10*_0x139a4f,_0x50883a=Math[_0x4ffef8(0xb4)](this[_0x4ffef8(0x122)]/0x10)*_0x333da1;this[_0x4ffef8(0x11d)](_0x904ac9,_0x50883a,_0x139a4f,_0x333da1);}},Sprite_CompassIcon['prototype'][_0x1b7221(0xc4)]=function(){const _0x2d3583=_0x1b7221,_0x4f2e73=VisuMZ[_0x2d3583(0x96)][_0x2d3583(0xac)]['Compass'];var _0x218de6=_0x4f2e73['Radius'],_0x1f2ce0=_0x4f2e73[_0x2d3583(0x7d)]*$gameMap[_0x2d3583(0x10a)](),_0x19aa4d=$gameMap['deltaX'](this[_0x2d3583(0x93)]['_realX'],$gamePlayer[_0x2d3583(0x7b)])*_0x1f2ce0,_0x1bfc63=$gameMap[_0x2d3583(0xb9)](this[_0x2d3583(0x93)]['_realY'],$gamePlayer[_0x2d3583(0x85)])*_0x1f2ce0,_0x594110=Math[_0x2d3583(0x9f)](_0x19aa4d*_0x19aa4d+_0x1bfc63*_0x1bfc63);if(_0x594110<_0x218de6)this['x']=Math['round'](_0x19aa4d),this['y']=Math[_0x2d3583(0xd3)](_0x1bfc63);else{var _0x4687a2=Math[_0x2d3583(0x94)](_0x1bfc63,_0x19aa4d);this['x']=Math[_0x2d3583(0xd3)](_0x218de6*Math[_0x2d3583(0xb3)](_0x4687a2)),this['y']=Math['round'](_0x218de6*Math['sin'](_0x4687a2));}},VisuMZ['ProximityCompass'][_0x1b7221(0xdf)]=Window_Options['prototype']['addGeneralOptions'],Window_Options['prototype'][_0x1b7221(0x92)]=function(){const _0xe4f50d=_0x1b7221;VisuMZ[_0xe4f50d(0x96)][_0xe4f50d(0xdf)][_0xe4f50d(0xd1)](this),this[_0xe4f50d(0x119)]();},Window_Options[_0x1b7221(0x10d)][_0x1b7221(0x119)]=function(){const _0x331778=_0x1b7221;VisuMZ[_0x331778(0x96)][_0x331778(0xac)]['Options'][_0x331778(0x7e)]&&this[_0x331778(0xe5)](),VisuMZ[_0x331778(0x96)][_0x331778(0xac)]['Options'][_0x331778(0x8c)]&&this[_0x331778(0xa0)]();},Window_Options['prototype'][_0x1b7221(0xe5)]=function(){const _0x448131=_0x1b7221,_0x4ca6fb=TextManager[_0x448131(0xfa)],_0xf2191b=_0x448131(0xfa);this['addCommand'](_0x4ca6fb,_0xf2191b);},Window_Options[_0x1b7221(0x10d)][_0x1b7221(0xa0)]=function(){const _0x487441=_0x1b7221,_0x4c2dad=TextManager['compassSize'],_0x2e6c7a='compassSize';this[_0x487441(0x99)](_0x4c2dad,_0x2e6c7a);},VisuMZ[_0x1b7221(0x96)][_0x1b7221(0xb8)]=Window_Options[_0x1b7221(0x10d)][_0x1b7221(0x104)],Window_Options[_0x1b7221(0x10d)][_0x1b7221(0x104)]=function(_0x37878a){const _0x45bae3=_0x1b7221;return _0x37878a===_0x45bae3(0x110)?!![]:VisuMZ['ProximityCompass']['Window_Options_isVolumeSymbol'][_0x45bae3(0xd1)](this,_0x37878a);},VisuMZ['ProximityCompass'][_0x1b7221(0xfc)]=Window_Options['prototype'][_0x1b7221(0xe4)],Window_Options[_0x1b7221(0x10d)]['changeVolume']=function(_0x3b37de,_0x44df38,_0xb7c5d7){const _0x542ec9=_0x1b7221;_0x3b37de==='compassSize'?this[_0x542ec9(0xd6)](_0x3b37de,_0x44df38,_0xb7c5d7):VisuMZ['ProximityCompass']['Window_Options_changeVolume'][_0x542ec9(0xd1)](this,_0x3b37de,_0x44df38,_0xb7c5d7);},Window_Options['prototype'][_0x1b7221(0xd6)]=function(_0x2da045,_0x298b33,_0x3fd651){const _0x11f25f=_0x1b7221,_0x4931f6=this[_0x11f25f(0xaa)](_0x2da045),_0x34a931=0xa,_0x392240=_0x4931f6+(_0x298b33?_0x34a931:-_0x34a931);_0x392240>0x64&&_0x3fd651?this[_0x11f25f(0x100)](_0x2da045,0x32):this['changeValue'](_0x2da045,_0x392240[_0x11f25f(0xff)](0x32,0x64));};