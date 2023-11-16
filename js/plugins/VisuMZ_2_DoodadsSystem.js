//=============================================================================
// VisuStella MZ - Grid-Free Doodads - System
// VisuMZ_2_DoodadsSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DoodadsSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DoodadsSystem = VisuMZ.DoodadsSystem || {};
VisuMZ.DoodadsSystem.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [DoodadsSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Grid-Free_Doodads_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * In RPG Maker MZ, tilesets are used for mapping purposes. Tileset A is used
 * for drawing land while Tilesets B through E are used to add doodads. But in
 * RPG Maker MZ, doodads added by Tilesets B through E are locked to the grid
 * and add a rather unnatural feel to it. This plugin will allow you to break
 * free of the grid and add doodads unbound by the grid. Doodads can come in
 * all forms, from large to small, static and animated, you name it!
 * 
 * There are two plugins for Grid-Free Doodads. One is the system, which has
 * all of the data contained for how doodads are handled in-game. The other is
 * the in-game editor, which allows you to add, remove, and edit doodads during
 * Playtest mode. These are separate so that when you deploy the game and want
 * just the doodad data to remain without the in-game editor, you can leave the
 * editor out. Or in the event there's ever an external editor, you can use
 * that instead.
 * 
 * This plugin is only the system plugin and does not contain the in-game
 * editor. The in-game editor can be found separately as a Tier 3 plugin from
 * the VisuStella MZ library.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Gain the ability to add doodads onto the map through outside of the grid.
 * * Or lock them to the grid if that's what you want.
 * * Add doodads from specified image sources, from the icon sheet, or from the
 *   map's current tileset, too.
 * * Doodads can be animated, too.
 * * Apply a variety of settings to your doodads, ranging from blend modes, to
 *   scaling, to hue changes, tone shifts, blur effects, and more!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 * 
 * Please refer to the VisuMZ_3_DoodadsEditor help file for instructions!
 *
 * ============================================================================
 * Plugin Parameters: System General Settings
 * ============================================================================
 *
 * There is only one plugin parameter for the Grid-Free Doodads System plugin.
 *
 * ---
 *
 * General
 * 
 *   Doodads Folder:
 *   - This is the path to your doodads folder.
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
 * 
 * * Yanfly
 * * Hudell
 * * Liquidize
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00: October 5, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DoodadsSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Folder:str
 * @text Doodads Folder
 * @desc This is the path to your doodads folder.
 * @default img/doodads/
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
//=============================================================================

const _0x36e3=['fdgit','EVAL','TwqRI','updateCustomZ','updateFilters','setHue','removeChild','_doodadEditorMode','update','resetOpacity','qgVDQ','prototype','loadData','switchOn','WILUV','splice','version','xFrames','loadDoodadBitmap','test','toneGrey','mapId','log','updatePosition','scaleY','tileRows','ColorMatrixFilter','loadTileset','ARRAYNUM','createDoodads','contrastFilter','description','jPVKY','clear','wqbJs','screen','KAhzc','max','ceil','_tileWidth','filename','_actors','isOptionValid','IkMKB','_frameUpdate','Scene_Map_terminate','none','tileId','status','spriteId','angle','toUpperCase','Mecgp','fsEFK','opacity','filter','indexOf','partyMiss','terminate','initCustomEDP1DataZ','updateCustomEDP1Z','hue','_compareChildOrder','_mapHeight','outline','isNwjs','blurFilter','loadTilesetBitmap','switchOff','doodadFolder','DoodadsSystem','Oivvd','dirname','format','trim','toneGreen','kJxqf','_tilemap','PbiwG','initialize','initCustomDataA','setFrame','loadSystem','_loadingState','PijZr','SNkdh','ConvertParams','_loadedData','maybeAddFilter','isEventRunning','KRpPP','createCharacters','shadowFilter','JqzJE','name','_xFrames','npoxg','_iconIndex','toneBlue','QpwDM','ARRAYSTRUCT','startsWith','FOJmJ','CvZMK','throwLoadError','QsWYB','Folder','contrast','JSON','LqLQf','_tileId','dfXBD','parse','Spriteset_Map_prototype_createCharacters','anchor','isLoopHorizontal','bitmap','YkNup','_emptyBitmap','join','TILE_ID_A5','path','blur','outlineFilter','kTiLX','Zqlab','IconSet','ZmoVS','ARRAYSTR','scaleX','maybeInvertAnchors','OutlineFilter','_cache','ARRAYFUNC','tilesetNames','Game_Map_isEventRunning','ARRAYEVAL','KNyPO','defineProperty','_data','height','screenX','_displayY','VEXln','positionType','tileCols','yFrames','width','mainModule','STR','exit','partyHave','_index','_currentCount','smooth','Doodads.json','$dataDoodads','Dzovd','_spriteset','tileHeight','toneRed','createDoodadsImgDir','isBattleTest','QBQWm','value','initCustomDataZ','settings','filters','updateFrame','shadow','clearDoodads','removeCurrentDoodads','isEventTest','initData','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_calcScreenPos','match','addMapDoodads','existsSync','rsJCE','tileset','map','loadDoodad','glowFilter','isLoopVertical','screenY','_displayX','mkdirSync','createDoodadsJson','_tileHeight','_doodadSprites','_yFrames','parameters','includes','anchorX','addChild','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','maybeLoadData','updateCustomA','STRUCT','FUNC','glow','DropShadowFilter','ImageManager_throwLoadError','anqMH','floor','ARRAYJSON','sepiaFilter','uyMXV','doodads','_mapWidth','GlowFilter','Settings','sepia','DLXMY','AdTmS','cJBjl','blend','liHWv','loadBitmapFromUrl','tileWidth','TFQXX','scale','setColorTone','folder','call','frameUpdate'];(function(_0x1720d4,_0x36e337){const _0x3c6fe2=function(_0x4658b5){while(--_0x4658b5){_0x1720d4['push'](_0x1720d4['shift']());}};_0x3c6fe2(++_0x36e337);}(_0x36e3,0xc5));const _0x3c6f=function(_0x1720d4,_0x36e337){_0x1720d4=_0x1720d4-0x0;let _0x3c6fe2=_0x36e3[_0x1720d4];return _0x3c6fe2;};var label='DoodadsSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3c6f('0x55')](function(_0x31373a){return _0x31373a[_0x3c6f('0x4e')]&&_0x31373a[_0x3c6f('0x3d')][_0x3c6f('0xdf')]('['+label+']');})[0x0];VisuMZ[label][_0x3c6f('0xf')]=VisuMZ[label][_0x3c6f('0xf')]||{},VisuMZ['ConvertParams']=function(_0x5bbeaa,_0x2238d9){for(const _0x4f2665 in _0x2238d9){if(_0x4f2665[_0x3c6f('0xce')](/(.*):(.*)/i)){if(_0x3c6f('0x42')!==_0x3c6f('0x9b')){const _0x4e1e09=String(RegExp['$1']),_0x5afd7f=String(RegExp['$2'])[_0x3c6f('0x51')]()[_0x3c6f('0x68')]();let _0x3b1d70,_0x1e39bf,_0x330464;switch(_0x5afd7f){case'NUM':_0x3b1d70=_0x2238d9[_0x4f2665]!==''?Number(_0x2238d9[_0x4f2665]):0x0;break;case _0x3c6f('0x3a'):_0x1e39bf=_0x2238d9[_0x4f2665]!==''?JSON['parse'](_0x2238d9[_0x4f2665]):[],_0x3b1d70=_0x1e39bf[_0x3c6f('0xd3')](_0x3530ef=>Number(_0x3530ef));break;case _0x3c6f('0x1f'):_0x3b1d70=_0x2238d9[_0x4f2665]!==''?eval(_0x2238d9[_0x4f2665]):null;break;case _0x3c6f('0xa6'):_0x1e39bf=_0x2238d9[_0x4f2665]!==''?JSON[_0x3c6f('0x8e')](_0x2238d9[_0x4f2665]):[],_0x3b1d70=_0x1e39bf[_0x3c6f('0xd3')](_0x3acfa8=>eval(_0x3acfa8));break;case _0x3c6f('0x8a'):_0x3b1d70=_0x2238d9[_0x4f2665]!==''?JSON[_0x3c6f('0x8e')](_0x2238d9[_0x4f2665]):'';break;case _0x3c6f('0x9'):_0x1e39bf=_0x2238d9[_0x4f2665]!==''?JSON['parse'](_0x2238d9[_0x4f2665]):[],_0x3b1d70=_0x1e39bf[_0x3c6f('0xd3')](_0x3f7f20=>JSON['parse'](_0x3f7f20));break;case _0x3c6f('0x3'):_0x3b1d70=_0x2238d9[_0x4f2665]!==''?new Function(JSON[_0x3c6f('0x8e')](_0x2238d9[_0x4f2665])):new Function('return\x200');break;case _0x3c6f('0xa3'):_0x1e39bf=_0x2238d9[_0x4f2665]!==''?JSON['parse'](_0x2238d9[_0x4f2665]):[],_0x3b1d70=_0x1e39bf[_0x3c6f('0xd3')](_0x2d23cd=>new Function(JSON[_0x3c6f('0x8e')](_0x2d23cd)));break;case _0x3c6f('0xb3'):_0x3b1d70=_0x2238d9[_0x4f2665]!==''?String(_0x2238d9[_0x4f2665]):'';break;case _0x3c6f('0x9e'):_0x1e39bf=_0x2238d9[_0x4f2665]!==''?JSON[_0x3c6f('0x8e')](_0x2238d9[_0x4f2665]):[],_0x3b1d70=_0x1e39bf[_0x3c6f('0xd3')](_0x4a4feb=>String(_0x4a4feb));break;case _0x3c6f('0x2'):_0x330464=_0x2238d9[_0x4f2665]!==''?JSON[_0x3c6f('0x8e')](_0x2238d9[_0x4f2665]):{},_0x3b1d70=VisuMZ[_0x3c6f('0x74')]({},_0x330464);break;case _0x3c6f('0x82'):_0x1e39bf=_0x2238d9[_0x4f2665]!==''?JSON['parse'](_0x2238d9[_0x4f2665]):[],_0x3b1d70=_0x1e39bf['map'](_0x31971b=>VisuMZ[_0x3c6f('0x74')]({},JSON[_0x3c6f('0x8e')](_0x31971b)));break;default:continue;}_0x5bbeaa[_0x4e1e09]=_0x3b1d70;}else{function _0x462b24(){return;}}}}return _0x5bbeaa;},(_0x18c17e=>{const _0x4bc5fb=_0x18c17e[_0x3c6f('0x7c')];for(const _0x494321 of dependencies){if('kaMqk'===_0x3c6f('0x40')){function _0x4f07c3(){try{_0x4df2bf[_0x3c6f('0x64')][_0x3c6f('0x6')][_0x3c6f('0x1c')](this,_0x306899);}catch(_0x22d546){_0x179faf[_0x3c6f('0x34')](_0x22d546);}const {url:_0x1771ee}=_0x5aa7c2;_0x1771ee in this[_0x3c6f('0xa2')]&&(this[_0x3c6f('0xa2')][_0x1771ee]=this[_0x3c6f('0x94')]),_0x37b12d[_0x3c6f('0x71')]=_0x3c6f('0x4c');}}else{if(!Imported[_0x494321]){if('bDEJf'!==_0x3c6f('0x85')){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x4bc5fb,_0x494321)),SceneManager[_0x3c6f('0xb4')]();break;}else{function _0x4c1fce(){return;}}}}}const _0xe364c1=_0x18c17e[_0x3c6f('0x3d')];if(_0xe364c1[_0x3c6f('0xce')](/\[Version[ ](.*?)\]/i)){if(_0x3c6f('0x12')!==_0x3c6f('0x12')){function _0x3d1c3d(){const _0x460c6b=this['filters']??[];this[_0x3c6f('0x76')](_0x460c6b,_0x436c1a[_0x3c6f('0x60')],_0x224d32(this[_0x3c6f('0xa9')][_0x3c6f('0x98')])),this['maybeAddFilter'](_0x460c6b,_0x46982e['contrastFilter'],_0x209c19(this[_0x3c6f('0xa9')][_0x3c6f('0x89')])),this[_0x3c6f('0x76')](_0x460c6b,_0x446109['sepiaFilter'],_0x8f864f(this[_0x3c6f('0xa9')]['sepia'])),_0x4e445c['outlineFilter']&&this['maybeAddFilter'](_0x460c6b,_0x2e6bf6[_0x3c6f('0x99')],_0x3ca03c(this[_0x3c6f('0xa9')][_0x3c6f('0x5e')])),_0x4242e3[_0x3c6f('0x7a')]&&this[_0x3c6f('0x76')](_0x460c6b,_0x49dff8[_0x3c6f('0x7a')],_0x2aed30(this[_0x3c6f('0xa9')][_0x3c6f('0xc7')])),_0x426623[_0x3c6f('0xd5')]&&this[_0x3c6f('0x76')](_0x460c6b,_0x14679a[_0x3c6f('0xd5')],_0x3231ae(this[_0x3c6f('0xa9')][_0x3c6f('0x4')])),this[_0x3c6f('0xc5')]=_0x460c6b;}}else{const _0x563408=Number(RegExp['$1']);_0x563408!==VisuMZ[label][_0x3c6f('0x2e')]&&(alert(_0x3c6f('0xe2')[_0x3c6f('0x67')](_0x4bc5fb,_0x563408)),SceneManager[_0x3c6f('0xb4')]());}}if(_0xe364c1[_0x3c6f('0xce')](/\[Tier[ ](\d+)\]/i)){if(_0x3c6f('0x13')!==_0x3c6f('0x20')){const _0x488c62=Number(RegExp['$1']);_0x488c62<tier?(alert(_0x3c6f('0xcc')[_0x3c6f('0x67')](_0x4bc5fb,_0x488c62,tier)),SceneManager[_0x3c6f('0xb4')]()):tier=Math['max'](_0x488c62,tier);}else{function _0x22ecaa(){_0x9ea8cd['log'](_0x36bd56);}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x3c6f('0xf')],_0x18c17e[_0x3c6f('0xde')]);})(pluginData);var $dataDoodads=null;Tilemap['prototype'][_0x3c6f('0x5c')]=function(_0x581d6d,_0x4c3f30){if(_0x581d6d['z']!==_0x4c3f30['z']){if('fdgit'!==_0x3c6f('0x1e')){function _0xb0fc3f(){const _0x411e32=_0x794052(_0x135a24['$1']);_0x411e32<_0x28b7fe?(_0x2bc153(_0x3c6f('0xcc')['format'](_0x145b20,_0x411e32,_0x35647e)),_0x19dd6d['exit']()):_0x4fae9b=_0x46c3c2['max'](_0x411e32,_0x31ff54);}}else return _0x581d6d['z']-_0x4c3f30['z'];}if(_0x581d6d['y']!==_0x4c3f30['y']){if(_0x3c6f('0x8d')!==_0x3c6f('0x8d')){function _0x194753(){this['opacity']=0x0;return;}}else return _0x581d6d['y']-_0x4c3f30['y'];}if(_0x581d6d['x']!==_0x4c3f30['x'])return _0x581d6d['x']-_0x4c3f30['x'];return _0x581d6d[_0x3c6f('0x4f')]-_0x4c3f30[_0x3c6f('0x4f')];};function Doodads(){throw new Error('This\x20is\x20a\x20static\x20class');}Doodads[_0x3c6f('0x60')]=new PIXI[(_0x3c6f('0xc5'))]['BlurFilter'](),Doodads[_0x3c6f('0x99')]=PIXI['filters'][_0x3c6f('0xa1')]?new PIXI[(_0x3c6f('0xc5'))][(_0x3c6f('0xa1'))](0x3,0x0):null,Doodads[_0x3c6f('0x7a')]=PIXI['filters'][_0x3c6f('0x5')]?new PIXI[(_0x3c6f('0xc5'))][(_0x3c6f('0x5'))]({'shadowOnly':!![]}):null,Doodads[_0x3c6f('0xd5')]=PIXI[_0x3c6f('0xc5')][_0x3c6f('0xe')]?new PIXI[(_0x3c6f('0xc5'))][(_0x3c6f('0xe'))]():null,Doodads[_0x3c6f('0x3c')]=new PIXI['filters'][(_0x3c6f('0x38'))](),Doodads[_0x3c6f('0x3c')][_0x3c6f('0x89')](0x1,![]),Doodads[_0x3c6f('0xa')]=new PIXI['filters'][(_0x3c6f('0x38'))](),Doodads[_0x3c6f('0xa')][_0x3c6f('0x10')](![]),Object[_0x3c6f('0xa8')](Doodads,_0x3c6f('0x63'),{'get':function(){return VisuMZ[_0x3c6f('0x64')][_0x3c6f('0xf')][_0x3c6f('0x88')];},'configurable':![]}),Object['defineProperty'](Doodads,_0x3c6f('0xc4'),{'get':function(){return VisuMZ[_0x3c6f('0x64')][_0x3c6f('0xf')];},'configurable':![]}),Doodads[_0x3c6f('0xda')]=function(){const _0x2760f2=require(_0x3c6f('0x97')),_0x31645c=_0x2760f2[_0x3c6f('0x66')](process[_0x3c6f('0xb2')][_0x3c6f('0x46')]),_0x50c770=_0x2760f2[_0x3c6f('0x95')](_0x31645c,'data/'),_0x2edb05=_0x50c770+_0x3c6f('0xb9'),_0x1a46d8=require('fs');if(_0x1a46d8['existsSync'](_0x2edb05))return;try{_0x1a46d8['writeFileSync'](_0x2edb05,'[]');}catch(_0x5ae611){console[_0x3c6f('0x34')](_0x5ae611);}},Doodads['createDoodadsImgDir']=function(){const _0x32a8d2=require(_0x3c6f('0x97')),_0x48d263=_0x32a8d2[_0x3c6f('0x66')](process[_0x3c6f('0xb2')][_0x3c6f('0x46')]),_0x3d5f97=_0x32a8d2[_0x3c6f('0x95')](_0x48d263,VisuMZ[_0x3c6f('0x64')][_0x3c6f('0xf')][_0x3c6f('0x88')]),_0x44d4a3=require('fs');if(_0x44d4a3[_0x3c6f('0xd0')](_0x3d5f97))return;try{if('sGtvd'===_0x3c6f('0xad')){function _0x2b3329(){this['bitmap']=new _0x169cec(0x1,0x1);}}else _0x44d4a3[_0x3c6f('0xd9')](_0x3d5f97);}catch(_0x568844){if(_0x3c6f('0xb')!==_0x3c6f('0xc1'))console[_0x3c6f('0x34')](_0x568844);else{function _0x505b99(){this[_0x3c6f('0xc9')]();}}}},Doodads[_0x3c6f('0x2a')]=function(){DataManager['_databaseFiles']['push']({'name':_0x3c6f('0xba'),'src':'Doodads.json'});},Doodads[_0x3c6f('0x0')]=function(){if(!DataManager[_0x3c6f('0xc0')]()&&!DataManager[_0x3c6f('0xca')]()){if(_0x3c6f('0x53')!==_0x3c6f('0x7b')){if(Utils[_0x3c6f('0x5f')]()&&Utils[_0x3c6f('0x48')](_0x3c6f('0x31'))){if(_0x3c6f('0x65')!==_0x3c6f('0x6a'))this[_0x3c6f('0xda')](),this[_0x3c6f('0xbf')]();else{function _0x3d80b0(){return _0x447c20['DoodadsSystem'][_0x3c6f('0xf')][_0x3c6f('0x88')];}}}this[_0x3c6f('0x2a')]();}else{function _0xfc43b1(){_0x3151ba[_0x3c6f('0x2d')](_0x2beaf2[_0x3c6f('0x56')](_0x5bb5c1),0x1);}}}},Doodads[_0x3c6f('0x0')](),ImageManager[_0x3c6f('0x30')]=function(_0x2a3cf0,_0x47533b,_0x369e25){if(!_0x47533b)return this[_0x3c6f('0x94')];const _0x2d4e47=(''+_0x2a3cf0+encodeURIComponent(_0x47533b)+'.png')['replace'](/%2F/g,'/'),_0x2f98ee=ImageManager[_0x3c6f('0x16')](_0x2d4e47);return _0x2f98ee[_0x3c6f('0xb8')]=_0x369e25,_0x2f98ee;},ImageManager[_0x3c6f('0x61')]=function(_0x1ef131,_0x3b564b){const _0x8ace3d=$gameMap[_0x3c6f('0xd2')]();if(!_0x8ace3d)return;const _0x4e7ba0=0x5+Math[_0x3c6f('0x8')](_0x1ef131/0x100);if(_0x4e7ba0<0x5||_0x4e7ba0>=0xa)return;const _0x4d85a4=_0x8ace3d[_0x3c6f('0xa4')][_0x4e7ba0];if(!_0x4d85a4)return;return ImageManager[_0x3c6f('0x39')](_0x4d85a4);},ImageManager[_0x3c6f('0xd4')]=function(_0x54f668,_0x3df207,_0x2d3a8b){if(_0x54f668===_0x3c6f('0x9c')){if('QsWYB'!==_0x3c6f('0x87')){function _0x2b4bab(){this[_0x3c6f('0x54')]=0x0;return;}}else return ImageManager[_0x3c6f('0x70')](_0x3c6f('0x9c'));}if(_0x54f668[_0x3c6f('0x83')]('TileSet')){if('PijZr'!==_0x3c6f('0x72')){function _0x42a155(){if(!_0x5895bc[_0x3c6f('0x47')][_0x3c6f('0xdf')](_0x34cc86)){this[_0x3c6f('0x54')]=0x0;return;}}}else return this[_0x3c6f('0x61')](_0x2d3a8b,_0x3df207);}return ImageManager[_0x3c6f('0x30')](Doodads['doodadFolder'],_0x54f668,_0x3df207);},VisuMZ[_0x3c6f('0x64')][_0x3c6f('0x6')]=ImageManager[_0x3c6f('0x86')],ImageManager['throwLoadError']=function(_0x13bd72){try{if(_0x3c6f('0x28')==='qgVDQ')VisuMZ[_0x3c6f('0x64')][_0x3c6f('0x6')][_0x3c6f('0x1c')](this,_0x13bd72);else{function _0x117b32(){let _0x5d0233=_0x38c362-_0x56583c*_0x235c9f;return _0x5d0233+_0x4b9f54<0x0&&_0x2abf1e&&(_0x5d0233+=_0x2687ea),_0x59d79c['ceil'](_0x5d0233);}}}catch(_0x5d5f4a){if(_0x3c6f('0x93')!==_0x3c6f('0x93')){function _0x180f91(){_0x507609[_0x3c6f('0x34')](_0xdacec5);}}else console[_0x3c6f('0x34')](_0x5d5f4a);}const {url:_0x509b13}=_0x13bd72;if(_0x509b13 in this[_0x3c6f('0xa2')]){if(_0x3c6f('0x3e')==='jPVKY')this[_0x3c6f('0xa2')][_0x509b13]=this[_0x3c6f('0x94')];else{function _0x4309a5(){_0x502d42[_0x3c6f('0x64')][_0x3c6f('0x8f')][_0x3c6f('0x1c')](this),this[_0x3c6f('0x3b')]();}}}_0x13bd72[_0x3c6f('0x71')]=_0x3c6f('0x4c');},VisuMZ[_0x3c6f('0x64')][_0x3c6f('0xa5')]=Game_Map[_0x3c6f('0x29')]['isEventRunning'],Game_Map[_0x3c6f('0x29')][_0x3c6f('0x77')]=function(){if($gameTemp[_0x3c6f('0x25')])return!![];return VisuMZ[_0x3c6f('0x64')][_0x3c6f('0xa5')][_0x3c6f('0x1c')](this);},Game_Map[_0x3c6f('0x29')][_0x3c6f('0xc')]=function(){if($dataDoodads)return $dataDoodads[this[_0x3c6f('0x33')]()];},VisuMZ[_0x3c6f('0x64')][_0x3c6f('0x4b')]=Scene_Map[_0x3c6f('0x29')][_0x3c6f('0x58')],Scene_Map[_0x3c6f('0x29')][_0x3c6f('0x58')]=function(){VisuMZ['DoodadsSystem'][_0x3c6f('0x4b')][_0x3c6f('0x1c')](this),this[_0x3c6f('0xbc')][_0x3c6f('0xc8')]();};function Sprite_Doodad(){this[_0x3c6f('0x6d')](...arguments);}Sprite_Doodad[_0x3c6f('0x29')]=Object['create'](Sprite_Clickable[_0x3c6f('0x29')]),Sprite_Doodad['prototype']['constructor']=Sprite_Doodad,Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x6d')]=function(_0x42a2d0){this[_0x3c6f('0xa9')]=_0x42a2d0,this[_0x3c6f('0x45')]=$gameMap[_0x3c6f('0x17')](),this[_0x3c6f('0xdb')]=$gameMap[_0x3c6f('0xbd')](),this[_0x3c6f('0xd')]=$gameMap[_0x3c6f('0xb1')]()*this[_0x3c6f('0x45')],this[_0x3c6f('0x5d')]=$gameMap[_0x3c6f('0xaa')]()*this['_tileHeight'],this[_0x3c6f('0xb7')]=0x0,this['_loadedData']=![],Sprite_Clickable['prototype'][_0x3c6f('0x6d')][_0x3c6f('0x1c')](this),this[_0x3c6f('0xcb')]();},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0xcb')]=function(){this[_0x3c6f('0x6e')](),this[_0x3c6f('0xb7')]=0x0;const _0x2697da=this[_0x3c6f('0xa9')];this['_x']=_0x2697da['x'],this['_y']=_0x2697da['y'],this['z']=_0x2697da['z'],this[_0x3c6f('0x7f')]=_0x2697da['iconIndex'],this[_0x3c6f('0x8c')]=_0x2697da[_0x3c6f('0x4d')],this['_xFrames']=_0x2697da[_0x3c6f('0x2f')]||0x1,this['_yFrames']=_0x2697da[_0x3c6f('0xb0')]||0x1,this[_0x3c6f('0x4a')]=_0x2697da[_0x3c6f('0x1d')]||0xf,this[_0x3c6f('0xa0')](),this[_0x3c6f('0xb6')]=this[_0x3c6f('0x7d')]*this['_yFrames']-0x1,this[_0x3c6f('0x90')]['x']=_0x2697da[_0x3c6f('0xe0')],this[_0x3c6f('0x90')]['y']=_0x2697da['anchorY'],this['scale']['x']=_0x2697da[_0x3c6f('0x9f')]/0x64,this['scale']['y']=_0x2697da[_0x3c6f('0x36')]/0x64,this[_0x3c6f('0x50')]=_0x2697da[_0x3c6f('0x50')]??0x0,this['blendMode']=_0x2697da[_0x3c6f('0x14')]||0x0,this['opacity']=_0x2697da['opacity']||0x0;const _0x180088=_0x2697da[_0x3c6f('0x1b')]||'',_0x49a21a=''+_0x180088+_0x2697da['bitmap'];this['bitmap']=ImageManager[_0x3c6f('0xd4')](_0x49a21a,_0x2697da[_0x3c6f('0xb8')],_0x2697da[_0x3c6f('0x4d')],_0x2697da[_0x3c6f('0xaf')],_0x2697da[_0x3c6f('0x37')]),_0x2697da[_0x3c6f('0x5b')]&&this[_0x3c6f('0x23')](_0x2697da[_0x3c6f('0x5b')]),this[_0x3c6f('0xc3')](),this[_0x3c6f('0x75')]=!![];},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0xa0')]=function(){if(this[_0x3c6f('0x19')]['x']<=0x0){if(this[_0x3c6f('0x90')]['x']===0x0)this['anchor']['x']=0x1;else this[_0x3c6f('0x90')]['x']===0x1&&(this[_0x3c6f('0x90')]['x']=0x0);}if(this['scale']['y']<=0x0){if(_0x3c6f('0x78')!==_0x3c6f('0x9a')){if(this[_0x3c6f('0x90')]['y']===0x0)this[_0x3c6f('0x90')]['y']=0x1;else{if(this[_0x3c6f('0x90')]['y']===0x1){if(_0x3c6f('0x6c')!=='jkskT')this[_0x3c6f('0x90')]['y']=0x0;else{function _0x501bf2(){this['_doodadSprites']=[];const _0x57af42=_0x522472[_0x3c6f('0xc')]();if(!_0x57af42)return;for(const _0x448ca2 of _0x57af42){const _0x364f0b=new _0x38b24f(_0x448ca2);this['_doodadSprites']['push'](_0x364f0b),this['_tilemap'][_0x3c6f('0xe1')](_0x364f0b);}}}}}}else{function _0x4765ab(){return;}}}},Sprite_Doodad[_0x3c6f('0x29')]['initCustomDataA']=function(){},Sprite_Doodad['prototype']['initCustomDataZ']=function(){this[_0x3c6f('0x59')]();},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x59')]=function(){const _0x25d04a=this[_0x3c6f('0xa9')][_0x3c6f('0xbe')]||0x0,_0x31b420=this[_0x3c6f('0xa9')][_0x3c6f('0x69')]||0x0,_0x13373d=this[_0x3c6f('0xa9')][_0x3c6f('0x80')]||0x0,_0x256789=this[_0x3c6f('0xa9')][_0x3c6f('0x32')]||0x0;this[_0x3c6f('0x1a')]([_0x25d04a,_0x31b420,_0x13373d,_0x256789]),this[_0x3c6f('0x2b')]=this[_0x3c6f('0xa9')]['switchOn']||[],this[_0x3c6f('0x62')]=this[_0x3c6f('0xa9')][_0x3c6f('0x62')]||[],this[_0x3c6f('0xb5')]=this[_0x3c6f('0xa9')]['partyHave']||[],this[_0x3c6f('0x57')]=this[_0x3c6f('0xa9')][_0x3c6f('0x57')]||[];},Sprite_Doodad[_0x3c6f('0x29')]['update']=function(){Sprite_Clickable[_0x3c6f('0x29')][_0x3c6f('0x26')][_0x3c6f('0x1c')](this),this[_0x3c6f('0x35')]();if(!this[_0x3c6f('0x75')]){if(_0x3c6f('0xd1')!==_0x3c6f('0x84'))return;else{function _0x47327d(){if(_0x4c9f60===_0x3c6f('0x9c'))return _0x44004f['loadSystem'](_0x3c6f('0x9c'));if(_0x53e170[_0x3c6f('0x83')]('TileSet'))return this[_0x3c6f('0x61')](_0xdc33df,_0x29c909);return _0x1edf40[_0x3c6f('0x30')](_0x254daa[_0x3c6f('0x63')],_0x169e4b,_0x26d918);}}}this[_0x3c6f('0x22')](),this['updateCustomA'](),this[_0x3c6f('0xc6')](),this[_0x3c6f('0x21')]();},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x35')]=function(){this['x']=this['screenX'](),this['y']=this[_0x3c6f('0xd7')]();},Sprite_Doodad[_0x3c6f('0x29')]['maybeAddFilter']=function(_0x54f6c6,_0x47cc8b,_0x426317){if(_0x426317!==_0x54f6c6[_0x3c6f('0xdf')](_0x47cc8b)){if('IkMKB'===_0x3c6f('0x49'))_0x426317?_0x54f6c6['push'](_0x47cc8b):_0x54f6c6[_0x3c6f('0x2d')](_0x54f6c6[_0x3c6f('0x56')](_0x47cc8b),0x1);else{function _0x25626c(){_0x289f28[_0x3c6f('0x64')][_0x3c6f('0x6')][_0x3c6f('0x1c')](this,_0x42eac7);}}}},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x22')]=function(){const _0x36ef0f=this[_0x3c6f('0xc5')]??[];this[_0x3c6f('0x76')](_0x36ef0f,Doodads[_0x3c6f('0x60')],Boolean(this['_data'][_0x3c6f('0x98')])),this['maybeAddFilter'](_0x36ef0f,Doodads[_0x3c6f('0x3c')],Boolean(this['_data']['contrast'])),this[_0x3c6f('0x76')](_0x36ef0f,Doodads[_0x3c6f('0xa')],Boolean(this[_0x3c6f('0xa9')]['sepia'])),Doodads[_0x3c6f('0x99')]&&this[_0x3c6f('0x76')](_0x36ef0f,Doodads[_0x3c6f('0x99')],Boolean(this[_0x3c6f('0xa9')][_0x3c6f('0x5e')])),Doodads[_0x3c6f('0x7a')]&&this[_0x3c6f('0x76')](_0x36ef0f,Doodads['shadowFilter'],Boolean(this[_0x3c6f('0xa9')][_0x3c6f('0xc7')])),Doodads[_0x3c6f('0xd5')]&&this[_0x3c6f('0x76')](_0x36ef0f,Doodads[_0x3c6f('0xd5')],Boolean(this[_0x3c6f('0xa9')][_0x3c6f('0x4')])),this[_0x3c6f('0xc5')]=_0x36ef0f;},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0xcd')]=function(_0x525b5c,_0x18fb8f,_0x2a29ee,_0x3dddc0,_0x54a919,_0x243397){let _0x5d57c6=_0x525b5c-_0x18fb8f*_0x2a29ee;return _0x5d57c6+_0x3dddc0<0x0&&_0x54a919&&(_0x5d57c6+=_0x243397),Math[_0x3c6f('0x44')](_0x5d57c6);},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0xab')]=function(){if(this[_0x3c6f('0xa9')]['positionType']===_0x3c6f('0x41')){if(_0x3c6f('0x8b')===_0x3c6f('0xa7')){function _0x13a165(){const _0xccb22a=_0x5e0042(_0x268d2b['$1']);_0xccb22a!==_0x64ff9b[_0x434218][_0x3c6f('0x2e')]&&(_0xfe124e(_0x3c6f('0xe2')[_0x3c6f('0x67')](_0x3d636c,_0xccb22a)),_0x4c00c3[_0x3c6f('0xb4')]());}}else return this['_data']['x'];}return this[_0x3c6f('0xcd')](this[_0x3c6f('0xa9')]['x'],$gameMap[_0x3c6f('0xd8')],this[_0x3c6f('0x45')],this[_0x3c6f('0xb1')],$gameMap[_0x3c6f('0x91')](),this['_mapWidth']);},Sprite_Doodad[_0x3c6f('0x29')]['screenY']=function(){if(this[_0x3c6f('0xa9')][_0x3c6f('0xae')]==='screen')return this[_0x3c6f('0xa9')]['y'];return this['_calcScreenPos'](this[_0x3c6f('0xa9')]['y'],$gameMap[_0x3c6f('0xac')],this[_0x3c6f('0xdb')],this[_0x3c6f('0xaa')],$gameMap[_0x3c6f('0xd6')](),this[_0x3c6f('0x5d')]);},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x3f')]=function(){this[_0x3c6f('0x92')]=new Bitmap(0x1,0x1);},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x1')]=function(){this[_0x3c6f('0x27')]();},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x27')]=function(){this[_0x3c6f('0x54')]=this[_0x3c6f('0xa9')][_0x3c6f('0x54')]||0x0;},Sprite_Doodad[_0x3c6f('0x29')]['updateCustomZ']=function(){this[_0x3c6f('0x5a')]();},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0x5a')]=function(){if($gameTemp[_0x3c6f('0x25')]){if(_0x3c6f('0x73')!==_0x3c6f('0x81'))return;else{function _0x26e430(){this[_0x3c6f('0x54')]=0x0;return;}}}for(const _0x114740 of this[_0x3c6f('0xb5')]){if(_0x3c6f('0x18')===_0x3c6f('0x18')){if(!$gameParty[_0x3c6f('0x47')]['includes'](_0x114740)){if('dhbaK'==='dhbaK'){this['opacity']=0x0;return;}else{function _0x3b9225(){this[_0x3c6f('0xb6')]=0x0;}}}}else{function _0x580d77(){if(this[_0x3c6f('0x90')]['x']===0x0)this[_0x3c6f('0x90')]['x']=0x1;else this[_0x3c6f('0x90')]['x']===0x1&&(this[_0x3c6f('0x90')]['x']=0x0);}}}for(const _0x44ccab of this[_0x3c6f('0x57')]){if($gameParty[_0x3c6f('0x47')][_0x3c6f('0xdf')](_0x44ccab)){if(_0x3c6f('0x7')===_0x3c6f('0x7')){this[_0x3c6f('0x54')]=0x0;return;}else{function _0x49054b(){return;}}}}for(const _0x36274d of this[_0x3c6f('0x2b')]){if(_0x3c6f('0x2c')===_0x3c6f('0x7e')){function _0x2b6c84(){_0x3956a2=_0x2fd66c[_0x3c6f('0x43')](_0x213a6f,_0x34f392);}}else{if(!$gameSwitches[_0x3c6f('0xc2')](_0x36274d)){this[_0x3c6f('0x54')]=0x0;return;}}}for(const _0x3b9e87 of this[_0x3c6f('0x62')]){if($gameSwitches[_0x3c6f('0xc2')](_0x3b9e87)){this[_0x3c6f('0x54')]=0x0;return;}}},Sprite_Doodad[_0x3c6f('0x29')][_0x3c6f('0xc6')]=function(){if(this[_0x3c6f('0x7f')]){const {iconWidth:_0x1ad879,iconHeight:_0x5b2ecf}=ImageManager,_0x4f7206=this[_0x3c6f('0x7f')]%0x10*_0x1ad879,_0x4762e5=Math[_0x3c6f('0x8')](this['_iconIndex']/0x10)*_0x5b2ecf;return this[_0x3c6f('0x6f')](_0x4f7206,_0x4762e5,_0x1ad879,_0x5b2ecf);}if(this[_0x3c6f('0x8c')]&&this[_0x3c6f('0x8c')]<Tilemap[_0x3c6f('0x96')]){if(_0x3c6f('0x52')!==_0x3c6f('0x15')){const _0x577c35=(Math[_0x3c6f('0x8')](this[_0x3c6f('0x8c')]/0x80)%0x2*0x8+this['_tileId']%0x8)*this['_tileWidth'],_0x36887a=Math[_0x3c6f('0x8')](this[_0x3c6f('0x8c')]%0x100/0x8)%0x10*this[_0x3c6f('0xdb')];return this[_0x3c6f('0x6f')](_0x577c35,_0x36887a,this[_0x3c6f('0x45')]*(this[_0x3c6f('0xa9')][_0x3c6f('0xaf')]||0x1),this[_0x3c6f('0xdb')]*(this['_data'][_0x3c6f('0x37')]||0x1));}else{function _0xc45a79(){return _0x3721a9['x']-_0x2c2ddd['x'];}}}if(this['_xFrames']===0x1&&this['_yFrames']===0x1){if(_0x3c6f('0x9d')===_0x3c6f('0x11')){function _0x23b367(){const _0x27237c=_0x8d53c7[_0x3c6f('0xd2')]();if(!_0x27237c)return;const _0x4ca44b=0x5+_0x1f9cc9['floor'](_0x22c111/0x100);if(_0x4ca44b<0x5||_0x4ca44b>=0xa)return;const _0x1aaf56=_0x27237c[_0x3c6f('0xa4')][_0x4ca44b];if(!_0x1aaf56)return;return _0x276dbc[_0x3c6f('0x39')](_0x1aaf56);}}else return;}const _0xef4122=Math[_0x3c6f('0x8')](this[_0x3c6f('0x92')][_0x3c6f('0xb1')]/this[_0x3c6f('0x7d')]),_0x4d74bc=Math[_0x3c6f('0x8')](this[_0x3c6f('0x92')]['height']/this['_yFrames']),_0x4dfd57=this['_index']%this[_0x3c6f('0x7d')]*_0xef4122,_0x3181d1=Math[_0x3c6f('0x8')](this[_0x3c6f('0xb6')]/this[_0x3c6f('0x7d')])*_0x4d74bc;this[_0x3c6f('0x6f')](_0x4dfd57,_0x3181d1,_0xef4122,_0x4d74bc);if(this[_0x3c6f('0xb7')]>0x0)return this[_0x3c6f('0xb7')]--;this[_0x3c6f('0xb7')]=this[_0x3c6f('0x4a')],this[_0x3c6f('0xb6')]++;if(this[_0x3c6f('0xb6')]>=this[_0x3c6f('0x7d')]*this[_0x3c6f('0xdd')]){if(_0x3c6f('0xbb')==='QZwym'){function _0x359097(){this[_0x3c6f('0x76')](_0x3504ce,_0x3860ab['outlineFilter'],_0x11ad55(this['_data'][_0x3c6f('0x5e')]));}}else this['_index']=0x0;}},VisuMZ[_0x3c6f('0x64')][_0x3c6f('0x8f')]=Spriteset_Map[_0x3c6f('0x29')][_0x3c6f('0x79')],Spriteset_Map[_0x3c6f('0x29')][_0x3c6f('0x79')]=function(){VisuMZ['DoodadsSystem'][_0x3c6f('0x8f')]['call'](this),this[_0x3c6f('0x3b')]();},Spriteset_Map[_0x3c6f('0x29')][_0x3c6f('0x3b')]=function(){this[_0x3c6f('0xc9')](),this[_0x3c6f('0xcf')]();},Spriteset_Map[_0x3c6f('0x29')][_0x3c6f('0xc9')]=function(){this[_0x3c6f('0xdc')]=this[_0x3c6f('0xdc')]||[];for(const _0x187886 of this[_0x3c6f('0xdc')]){if(!_0x187886)continue;this[_0x3c6f('0x6b')][_0x3c6f('0x24')](_0x187886);}},Spriteset_Map[_0x3c6f('0x29')][_0x3c6f('0xcf')]=function(){this[_0x3c6f('0xdc')]=[];const _0x14eec7=$gameMap[_0x3c6f('0xc')]();if(!_0x14eec7)return;for(const _0x38e767 of _0x14eec7){const _0x1c38bc=new Sprite_Doodad(_0x38e767);this['_doodadSprites']['push'](_0x1c38bc),this[_0x3c6f('0x6b')]['addChild'](_0x1c38bc);}},Spriteset_Map['prototype'][_0x3c6f('0xc8')]=function(){this['removeCurrentDoodads']();};