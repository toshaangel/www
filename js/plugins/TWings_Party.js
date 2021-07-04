//=============================================================================
// TWings Plugins
// TWings_Party.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.10 (MZ) Create a Party management window
 * @author TWings (Pierre-Alain Huille)
 * @base TWings_CoreLight
 * @orderAfter TWings_CoreLight
 * @orderAfter TWings_CharList
 * @url https://twings.itch.io/
 *
 * @param pMode
 * @type select
 * @text Party Type
 * @desc Type of party : Suikoden-like or default.
 * @option Suikoden
 * @value 1
 * @option Free
 * @value 2
 * @default 1
 *
 * @param DispTexts
 * @text Texts
 *
 * @param cmdName
 * @parent DispTexts 
 * @type text
 * @text Menu command name
 * @desc Name in the menu.
 * @default Tavern
 *
 * @param txtSwitch
 * @parent DispTexts  
 * @type text
 * @text Switch command
 * @desc Switch command text.
 * @default Switch
 *
 * @param txtRemove
 * @parent DispTexts  
 * @type text
 * @text Remove command
 * @desc Remove command text.
 * @default Remove 
 *
 * @param CharsParams
 * @text Characters 
 *
 * @param CharRoster
 * @parent CharsParams  
 * @type struct<CharRoster>[]
 * @text Party
 * @desc List of all actors able to join the party.
 *
 * @param WinParams
 * @text Windows
 *
 * @param cmdDisplaySwitchId
 * @parent WinParams  
 * @type switch
 * @text Menu access switch
 * @desc Specified switch controls Menu access.
 * @default 0
 *
 * @param detailStat
 * @parent WinParams  
 * @type select
 * @text Status Display
 * @desc Type of display.
 * @option Simple
 * @value 1
 * @option Detailed
 * @value 2
 * @option Portraits
 * @value 3
 * @default 2
 * 
 * @param wWidth
 * @parent WinParams
 * @type number
 * @min 808
 * @text Window width
 * @desc Width of the upper window.
 * @default 808
 *
 * @param wHeight
 * @parent WinParams
 * @type number
 * @min 620
 * @text Window height
 * @desc Height of the upper window.
 * @default 620
 *
 *
 * @command preloadPartyPics
 * @text Preload Pictures
 * @desc Preload the character pictures.
 *
 * @command openPartyList
 * @text Open Window
 * @desc Open the Party List window.
 *
 * @command partyLockActor
 * @text Lock Actor
 * @desc The actor will be locked into the party.
 * @arg actorId
 * @text Id
 * @type actor
 * @default 1
 * @desc Actor to lock.
 *
 * @command partyLockClear
 * @text Clear Locks
 * @desc Clear the party locks.
 *
 *
 * @help
 * Free to use with proper credit for non-commercial games.
 * Contact me for commercial games : Discord https://discord.gg/m85SkuY
 *
 * --------------------------------------------------------------------------------
 *
 * This plugin create a new menu that allows to manage your party.
 * It's inspired from the Suikoden games Tavern.
 * You can choose which character to include.
 *
 * If you're also using my Characters List pluginn,
 * this plugin must be placed after it.
 *
 * This plugin requires to be properly parametered to work :
 *
 * - You need to define the Party with at least the following param :
 *   + Actor : refers to the actors from the database.
 *
 * --------------------------------------------------------------------------------
 *
 * Plugin Commands:
 *
 * --------------------------------------------------------------------------------
 *
 * openPartyList
 * Directly open the Party window.
 *
 * preloadPartyPics
 * Preloads the characters sprites.
 * To use before openPartyList if you notice some pictures missing.
 * You'll also want to add a wait command between the two commands.
 *
 * Use example : 
 *           preloadPartyPics
 *           wait 15
 *           openPartyList
 *
 * partyLockActor x
 * Prevent actor x from beeing removed from the party.
 * Example :
 *          partyLockActor 1
 *          The actor id 1 from the databse will be locked into the party.
 *
 * partyLockClear 
 * Clear all current party locks.
 *
 * --------------------------------------------------------------------------------
 *
 * Parameters:
 *
 * --------------------------------------------------------------------------------
 *
 * - Party Type :
 *   Defines the type of party system.
 *   Suikoden : Similarto the Suikoden games (party restricted to battle members).
 *   Free : Allow non battle members in the party.
 *
 * - Texts :
 * Customise some of the plugin's default texts.
 *   - Menu command name :
 *   Name of the command used to access the feature in the pause menu. 
 *   - Switch command :
 *   Name of the command used to switch characters. 
 *   - Remove command :
 *   Name of the command used to remove characters.   
 *
 * - Characters :
 * Parameters used to define your characters list.
 *   - Party :
 *   Core of the plugin. You need to properly define all the relevant actors here.
 *   Every actor you wish to manage through the Party menu should be added here.
 *     - Actor : 
 *     Actor from the database. This is a required parameter !
 *     - Found Switch : 
 *     When this switch is ON, unlock the character availibility.
 *     if none, the character is available by default.
 *
 * - Windows :
 * Customise some of the plugin's default texts.
 *   - Menu access switch :
 *   Switch to use to enable/disable access in the pause menu.
 *   - Status Display :
 *   Simple : The party display is minimal with only sprites and names.
 *   Detailed : More informations will be displayed next to each actor's name.
 *   Portraits : Detailed display with portraits instead of sprites.
 *   - Window width :
 *   Width of the party list windows.
 *   - Window height :
 *   Height of the party list windows. 
 *
 * --------------------------------------------------------------------------------
 *
 * Versions history :
 *
 * --------------------------------------------------------------------------------
 *
 * - Version 1.10 : 
 *      + New Free mode.
 *      + New Actor lock plugin command.
 *      + New Portrait display mode.
 *
 * - Version 1.00 :
 *      + Release.
 */
/*~struct~CharRoster:
 * @param charId
 * @type actor
 * @text Actor
 * @default 1
 * @desc Actor to include.
 * @param charSwitch
 * @type switch
 * @default 0
 * @text Found Switch
 * @desc Switch to indicate this character is available (if none, available by default)
 */

 TW.party=TW.party||{},TW.windows=TW.windows||{},TW.windows.TWParty=TW.windows.TWParty||{};class TW_actorTracker{constructor(t,e){this.id=t,this.swValue=e}}class TW_Roster{constructor(){this.charList=Array(),this.nbChars=0}addChar(t,e){this.charList[this.nbChars]=new TW_actorTracker(t,e),this.nbChars++}getHeroList(){let t=Array();for(let e=0;e<this.nbChars;e++){let a=this.charList[e];2==TW.party.pMode?$gameParty.members().contains($gameActors.actor(a.id))||0!=a.swValue&&!$gameSwitches.value(a.swValue)||t.push(this.charList[e]):$gameParty.battleMembers().contains($gameActors.actor(a.id))||0!=a.swValue&&!$gameSwitches.value(a.swValue)||t.push(this.charList[e])}return t}getLength(){return this.nbChars}}TW.party.params=PluginManager.parameters("TWings_Party"),TW.windows.TWParty.cmdDisplaySwitchId=Number(TW.party.params.cmdDisplaySwitchId||1),TW.windows.TWParty.cmdName=String(TW.party.params.cmdName||"Tavern"),TW.windows.TWParty.txtSwitch=String(TW.party.params.txtSwitch||"Switch"),TW.windows.TWParty.txtRemove=String(TW.party.params.txtRemove||"Remove"),TW.windows.TWParty.detailStat=Number(TW.party.params.detailStat),TW.windows.TWParty.wWidth=Number(TW.party.params.wWidth||808),TW.windows.TWParty.wHeight=Number(TW.party.params.wHeight||620),TW.party.pMode=Number(TW.party.params.pMode),TW.party.aCharPool=JSON.parse(TW.party.params.CharRoster),TW.party.poolLength=TW.party.aCharPool.length,TW.party.charPool=new TW_Roster;for(let t=0;t<TW.party.poolLength;t++){let e=JSON.parse(TW.party.aCharPool[t]);TW.party.charPool.addChar(e.charId,e.charSwitch)}function Scene_TWParty(){this.initialize.apply(this,arguments)}function Window_TWPartyCommand(){this.initialize.apply(this,arguments)}function Window_TWActiveParty(){this.initialize.apply(this,arguments)}function Window_TWRoster(){this.initialize.apply(this,arguments)}var TWt;TW.party.params=!0,TW.party.aCharPool=[],TW.party.locks=Array(),PluginManager.registerCommand("TWings_Party","preloadPartyPics",()=>{TW.preLoad()}),PluginManager.registerCommand("TWings_Party","openPartyList",()=>{SceneManager.push(Scene_TWParty)}),PluginManager.registerCommand("TWings_Party","partyLockActor",t=>{TW.party.locks[Number(t.actorId)]=1}),PluginManager.registerCommand("TWings_Party","partyLockClear",()=>{TW.party.locks=Array()}),Window_StatusBase.prototype.loadFaceImages=function(){TW.preLoad()},TW.preLoad=TW.preLoad||function(){for(const t of $dataActors)if(t){const e=new Game_Actor(t.id);ImageManager.loadFace(e.faceName()),ImageManager.loadCharacter(e.characterName())}for(const t of $gameActors._data)t&&(ImageManager.loadFace(t.faceName()),ImageManager.loadCharacter(t.characterName()))},Scene_Menu.prototype.commandTWParty=function(){SceneManager.push(Scene_TWParty)},TW.windows.TWParty.Scene_Menu_createCommandWindow=Scene_Menu.prototype.createCommandWindow,Scene_Menu.prototype.createCommandWindow=function(){TW.windows.TWParty.Scene_Menu_createCommandWindow.call(this),$gameSwitches.value(TW.windows.TWParty.cmdDisplaySwitchId)&&this._commandWindow.setHandler("TWParty",this.commandTWParty.bind(this))},TW.windows.TWParty.Window_MenuCommand_addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands,Window_MenuCommand.prototype.addOriginalCommands=function(){TW.windows.TWParty.Window_MenuCommand_addOriginalCommands.call(this),$gameSwitches.value(TW.windows.TWParty.cmdDisplaySwitchId)&&this.addTWPartyCommand()},Window_MenuCommand.prototype.addTWPartyCommand=function(){this.needsCommand("TWParty")&&this.addCommand(TW.windows.TWParty.cmdName,"TWParty",!0)},Scene_TWParty.prototype=Object.create(Scene_MenuBase.prototype),Scene_TWParty.prototype.constructor=Scene_TWParty,Scene_TWParty.prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this)},Scene_TWParty.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),this.createCommandWindow(),this.createListWindow(),this.createDetailWindow()},Scene_TWParty.prototype.createCommandWindow=function(){const t=this.mainAreaTop(),e=TW.windows.TWParty.wWidth,a=this.calcWindowHeight(1,!0);this._commandWindow=new Window_TWPartyCommand(new Rectangle(0,t,e,a)),this._commandWindow.setHandler("switch",this.commandChoice.bind(this,1)),this._commandWindow.setHandler("remove",this.commandChoice.bind(this,2)),this._commandWindow.setHandler("cancel",this.popScene.bind(this)),this.addWindow(this._commandWindow)},Scene_TWParty.prototype.createListWindow=function(){const t=this._commandWindow.height+this.mainAreaTop(),e=TW.windows.TWParty.wWidth/2,a=(TW.windows.TWParty.wHeight?TW.windows.TWParty.wHeight:Graphics.boxHeight)-t;this._listWindow=new Window_TWActiveParty(new Rectangle(0,t,e,a)),this._listWindow.setHandler("ok",this.partyChange.bind(this)),this._listWindow.setHandler("cancel",this.cancelPartyWindow.bind(this)),this.addWindow(this._listWindow)},Scene_TWParty.prototype.createDetailWindow=function(){const t=this._listWindow.width,e=this._commandWindow.height+this.mainAreaTop(),a=this._listWindow.width,i=this._listWindow.height;this._detailWindow=new Window_TWRoster(t,e,a,i),this._detailWindow.setHandler("ok",this.partySwitch.bind(this)),this._detailWindow.setHandler("cancel",this.cancelDetailWindow.bind(this)),this._listWindow.setDetailWindow(this._detailWindow),this.addWindow(this._detailWindow)},Scene_TWParty.prototype.start=function(){Scene_MenuBase.prototype.start.call(this)},Scene_TWParty.prototype.activatePartyWindow=function(t){this._listWindow.setAction(t),this._listWindow.activate(),this._listWindow.select(0)},Scene_TWParty.prototype.partyChange=function(){1==this._listWindow._action?this._detailWindow.activate():(2==TW.party.pMode?$gameParty.removeActor($gameParty.members()[this._listWindow.index()]._actorId):$gameParty.removeActor($gameParty.battleMembers()[this._listWindow.index()]._actorId),this.cancelPartyWindow(),this._listWindow.refresh(),this._detailWindow.refresh())},Scene_TWParty.prototype.partySwitch=function(){$gameParty._actors[this._listWindow.index()]=Number(this._detailWindow._roster[this._detailWindow.index()].id),$gamePlayer.refresh(),$gameMap.requestRefresh(),this._detailWindow.refresh(),this.cancelDetailWindow(),this._listWindow.refresh(),this._listWindow.activate()},Scene_TWParty.prototype.cancelPartyWindow=function(t){this._listWindow.deactivate(),this._listWindow.deselect(),this._commandWindow.activate()},Scene_TWParty.prototype.cancelDetailWindow=function(t){this._detailWindow.deselect(),this._detailWindow.deactivate(),this._listWindow.activate()},Scene_TWParty.prototype.commandChoice=function(t){this.activatePartyWindow(t)},Window_TWPartyCommand.prototype=Object.create(Window_HorzCommand.prototype),Window_TWPartyCommand.prototype.constructor=Window_TWPartyCommand,Window_TWPartyCommand.prototype.initialize=function(t){Window_HorzCommand.prototype.initialize.call(this,t)},Window_TWPartyCommand.prototype.maxCols=function(){return 3},Window_TWPartyCommand.prototype.makeCommandList=function(){this.addCommand(TW.windows.TWParty.txtSwitch,"switch"),this.addCommand(TW.windows.TWParty.txtRemove,"remove"),this.addCommand(TextManager.cancel,"cancel")},Window_TWActiveParty.prototype=Object.create(Window_Selectable.prototype),Window_TWActiveParty.prototype.constructor=Window_TWActiveParty,Window_TWActiveParty.prototype.initialize=function(t){Window_Selectable.prototype.initialize.call(this,t),this.setTopRow(0),this.setAction(0),this.refresh()},Window_TWActiveParty.prototype.setAction=function(t){this._action=t,this.refresh()},Window_TWActiveParty.prototype.maxCols=function(){return 1},Window_TWActiveParty.prototype.maxItems=function(){return 2==TW.party.pMode?$gameParty.members().length+(1==this._action?1:0):Math.min($gameParty.battleMembers().length+(1==this._action?1:0),$gameParty.maxBattleMembers())},Window_TWActiveParty.prototype.itemHeight=function(){return TW.windows.TWParty.detailStat>1?96:50},Window_TWActiveParty.prototype.isCurrentItemEnabled=function(){return this.isEnabled(this.index())},Window_TWActiveParty.prototype.isEnabled=function(t){return(!TW.party.ActorList[t]||!TW.party.locks[TW.party.ActorList[t]._actorId])&&(1==this._action?this._detailWindow.maxItems()>0:2!=this._action||this.maxItems()>1)},Window_TWActiveParty.prototype.refresh=function(){this._additionalSprites={};const t=this._innerChildren.length;for(let e=0;e<t;e++)this._innerChildren[e].destroy();this._innerChildren=Array(),this.createContents(),this.drawAllItems()},Window_TWActiveParty.prototype.drawAllItems=function(){const t=this.topIndex();2==TW.party.pMode?TW.party.ActorList=$gameParty.members():TW.party.ActorList=$gameParty.battleMembers(),TW.party.colCount=0;let e=6,a=40,i=20,o=75;!TW.windows.TWParty.detailStat>1&&(o=(this.width-15)/this.maxCols());const r=this.itemHeight();for(let n=0;n<this.maxVisibleItems();n++){let s=t+n;if(s<this.maxItems()){let t;TW.party.colCount=s+1,t=TW.party.ActorList[s]?TW.party.ActorList[s]:"Add",this.drawItem(t,e,a,i,o,r,s),TW.party.colCount%this.maxCols()==0?(e+=r,a=40,i=20):(a+=o,i+=o)}}},Window_TWActiveParty.prototype.drawItem=function(t,e,a,i,o,r,n){if(this.changePaintOpacity(this.isEnabled(n)),"Add"!=t){if(TW.windows.TWParty.detailStat<3?(this.drawActorName(t,a,e,o),this.drawActorCharacter(t,i,e+40)):(this.drawActorFace(t,i-18,e,100,75),this.drawActorName(t,a,e+60)),TW.windows.TWParty.detailStat>1){const i=a+100,o=e-20,n=100;TW.windows.TWParty.detailStat<3?(this.drawActorLevel(t,a+105,o+r/2+10),this.drawActorClass(t,a,o+r/2+10,95)):(this.drawActorLevel(t,a+185,o+r/2+12),this.drawActorClass(t,a+70,o+r/2+12,95)),this.drawGauges(t,i,e,n)}}else this.drawText(t,a,e,o)},Window_TWActiveParty.prototype.drawActorName=function(t,e,a,i){i=i||168,this.changeTextColor(ColorManager.hpColor(t)),this.drawText(t.name(),e,a,i)},Window_TWActiveParty.prototype.drawActorFace=function(t,e,a,i,o){this.drawFace(t.faceName(),t.faceIndex(),e,a,i,o)},Window_TWActiveParty.prototype.drawActorCharacter=function(t,e,a){this.drawCharacter(t.characterName(),t.characterIndex(),e,a)},Window_TWActiveParty.prototype.drawActorLevel=function(t,e,a){this.changeTextColor(ColorManager.systemColor()),this.drawText(TextManager.levelA,e,a,48),this.resetTextColor(),this.drawText(t.level,e+84,a,36,"right")},Window_TWActiveParty.prototype.drawActorClass=function(t,e,a,i){i=i||168,this.resetTextColor(),this.drawText(t.currentClass().name,e,a,i)},Window_TWActiveParty.prototype.drawGauges=function(t,e,a,i){this.placeGauge(t,"hp",e,a),this.placeGauge(t,"mp",e+35,a+20)},Window_TWActiveParty.prototype.placeGauge=function(t,e,a,i){const o="actor%1-gauge-%2".format(t.actorId(),e),r=this.createInnerSprite(o,Sprite_Gauge);r.setup(t,e),r.move(a,i),r.show()},Window_TWActiveParty.prototype.createInnerSprite=function(t,e){const a=this._additionalSprites;if(a[t])return a[t];{const i=new e;return a[t]=i,this.addInnerChild(i),i}},Window_TWActiveParty.prototype.setDetailWindow=function(t){this._detailWindow=t,this.update()},Window_TWRoster.prototype=Object.create(Window_Selectable.prototype),Window_TWRoster.prototype.constructor=Window_TWRoster,Window_TWRoster.prototype.initialize=function(t,e,a,i){Window_Selectable.prototype.initialize.call(this,new Rectangle(t,e,a,i)),this.setTopRow(0),this.refresh()},Window_TWRoster.prototype.maxCols=function(){return 1},Window_TWRoster.prototype.maxItems=function(){return TW.party.charPool.getHeroList().length},Window_TWRoster.prototype.itemHeight=function(){return TW.windows.TWParty.detailStat>1?96:50},Window_TWRoster.prototype.activate=function(){Window_Selectable.prototype.activate.call(this),this.select(0)},Window_TWRoster.prototype.drawAllItems=function(){const t=this.topIndex(),e=this.maxItems();this._roster=TW.party.charPool.getHeroList();let a=6,i=40,o=20,r=75;!TW.windows.TWParty.detailStat>1&&(r=(this.width-15)/this.maxCols());const n=this.itemHeight();for(let s=0;s<this.maxVisibleItems();s++){let d=t+s;if(d<e){const t=this._roster[d];this.drawItem(t,a,i,o,r,n),a+=n,i=40,o=20}}},Window_TWRoster.prototype.drawItem=function(t,e,a,i,o,r){const n=$gameActors.actor(t.id);if(TW.windows.TWParty.detailStat<3?(this.drawActorName(n,a,e,o),this.drawActorCharacter(n,i,e+40)):(this.drawActorFace(n,i-18,e,100,80),this.drawActorName(n,a,e+60)),TW.windows.TWParty.detailStat>1){const t=a+100,i=e-20,o=100;TW.windows.TWParty.detailStat<3?(this.drawActorLevel(n,a+105,i+r/2+10),this.drawActorClass(n,a,i+r/2+10,95)):(this.drawActorLevel(n,a+185,i+r/2+12),this.drawActorClass(n,a+70,i+r/2+12,95)),this.drawGauges(n,t,e,o)}},Window_TWRoster.prototype.drawActorName=function(t,e,a,i){i=i||168,this.changeTextColor(ColorManager.hpColor(t)),this.drawText(t.name(),e,a,i)},Window_TWRoster.prototype.drawActorFace=function(t,e,a,i,o){this.drawFace(t.faceName(),t.faceIndex(),e,a,i,o)},Window_TWRoster.prototype.drawActorCharacter=function(t,e,a){this.drawCharacter(t.characterName(),t.characterIndex(),e,a)},Window_TWRoster.prototype.drawActorLevel=function(t,e,a){this.changeTextColor(ColorManager.systemColor()),this.drawText(TextManager.levelA,e,a,48),this.resetTextColor(),this.drawText(t.level,e+84,a,36,"right")},Window_TWRoster.prototype.drawActorClass=function(t,e,a,i){i=i||168,this.resetTextColor(),this.drawText(t.currentClass().name,e,a,i)},Window_TWRoster.prototype.drawGauges=function(t,e,a,i){this.placeGauge(t,"hp",e,a),this.placeGauge(t,"mp",e+35,a+20)},Window_TWRoster.prototype.placeGauge=function(t,e,a,i){const o="actor%1-gauge-%2".format(t.actorId(),e),r=this.createInnerSprite(o,Sprite_Gauge);r.setup(t,e),r.move(a,i),r.show()},Window_TWRoster.prototype.createInnerSprite=function(t,e){TWt=this;const a=this._additionalSprites;if(a[t])return a[t];{const i=new e;return a[t]=i,this.addInnerChild(i),i}},Window_TWRoster.prototype.refresh=function(t){this._additionalSprites={};const e=this._innerChildren.length;for(let t=0;t<e;t++)this._innerChildren[t].destroy();this._innerChildren=Array(),this.createContents(),this.drawAllItems()};