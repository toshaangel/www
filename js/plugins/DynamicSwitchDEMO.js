/*:
 * @target MZ
 * @plugindesc Dynamic Switches Plugin For RPG MAKER MZ. (DEMO VERSION)
 * @author Undermax Games | Maxii1996
 * @url https://undermax.itch.io/
 * @help
 * _________________________________________________________
 * 
 *  Plugin Version:          DEMO
 *  Developed by:            Undermax Games | Maxii1996
 *  Web:                     https://undermax.itch.io/
 * _________________________________________________________
 * 
 *        _____                                        _          
 *       |  __ \                                      (_)         
 *       | |  | |  _   _   _ __     __ _   _ __ ___    _    ___   
 *       | |  | | | | | | | '_ \   / _` | | '_ ` _ \  | |  / __|  
 *       | |__| | | |_| | | | | | | (_| | | | | | | | | | | (__   
 *       |_____/   \__, | |_| |_|  \__,_| |_| |_| |_| |_|  \___|  
 *         _____    __/ |     _   _            _                  
 *        / ____|  |___/     (_) | |          | |                 
 *       | (___   __      __  _  | |_    ___  | |__     ___   ___ 
 *        \___ \  \ \ /\ / / | | | __|  / __| | '_ \   / _ \ / __|
 *        ____) |  \ V  V /  | | | |_  | (__  | | | | |  __/ \__ \
 *       |_____/    \_/\_/   |_|  \__|  \___| |_| |_|  \___| |___/
 *                                                       
 *              _____    ______   __  __    ____  
 *             |  __ \  |  ____| |  \/  |  / __ \ 
 *             | |  | | | |__    | \  / | | |  | |
 *             | |  | | |  __|   | |\/| | | |  | |
 *             | |__| | | |____  | |  | | | |__| |
 *             |_____/  |______| |_|  |_|  \____/ 
 *                                                                        
 * 
 *  ============================ INTRODUCTION ============================
 * 
 *   This plugin allows the game to set dynamic switches, which can be 
 *   activated after a certain amount of time (Real Time), even when 
 *   the game is not running.
 * 
 *   This, for example, can be used to make an event or mini-game 
 *   only be played or executed once a day.
 *
 *   The operation is very simple:
 *
 *   The selected switches will remain in the off state and will be 
 *   locked. (This means that they cannot be modified manually, 
 *   either by events or by debug mode.) 
 *
 *   As soon as the time has expired, the switch will be in the "ON"
 *   state as if it were an "Available" or "Time has already ended." 
 *   There you decide what you want to do.
 *
 *   Please note that the plugin prioritizes the Internet connection 
 *   to establish  whether the time has passed or not. And in case
 *   there is no internet (for whatever reason) local time is used.
 *
 *   This is done to try to prevent the player from modifying their
 *   system's date and time to make time pass faster.
 *
 * 
 *   The mode of use is simple:
 *   You can start by setting the "Parameters" in the plugin.
 *
 *   You will find 2 things:
 * 
 *   "Lock Switches"
 *
 *       And:
 *
 *   "Initialize Active Switches"
 *
 *   Both of these things are important to set up.
 *
 *   Lock Switches prevent the user from modifying the state of the switch 
 *   in any way. The Switch will always remain OFF and cannot be modified.
 *
 *   The only exception to this is to use "Initialize Active Switches", 
 *   which will allow the selected switch to be initialized to "True" at 
 *   the start of the game.
 *
 *   Important clarification: Remember that although time is Global, your 
 *   game IS NOT. That means every time you start a new game it will have 
 *   its own switch initializations. If, for example, you are in the RPG 
 *   Maker editor and you use the "Skip title screen" function, do not 
 *   forget that you are creating a new game each time, you are not loading 
 *   the game, I remind you of this just in case so you do not think which 
 *   is a malfunction of the plugin. You can test that it works fine by 
 *   saving the game, closing the game, and reloading the game.
 * 
 * 
 *   That said, you will use the rest of the functionality with Plugin
 *   commands.
 *
 *   Either to set a Dynamic Switch or to Remove it.
 *
 *   I have also included a small and simple scene to show the time remaining 
 *   for each of the Dynamic Switches that are activated and running.
 *
 *   This is more intended for Debug, but if you want you can use it too.
 * 
 *
 * @param lockSwitches
 * @text Lock Switches
 * @type switch[]
 * @desc Switches declared here cannot be manually modified in-game in any way.
 * 
 * @param initActiveSwitches
 * @text Initialize Active Switches
 * @type switch[]
 * @desc Choose which switches to initialize as active when the game starts.
 *
 * @command setDynamicSwitch
 * @text Set Dynamic Switch
 * @desc Sets a dynamic switch that will be deactivated after the specified amount of time.
 *
 * @arg switchId
 * @text Switch ID
 * @type number
 * @desc The ID of the switch to be deactivated.
 *
 * @arg unit
 * @text Time Unit
 * @type select
 * @option Seconds
 * @option Minutes
 * @option Hours
 * @option Days
 * @desc The unit of time to wait before the switch is activated.
 *
 * @arg amount
 * @text Amount
 * @type number
 * @desc The amount of time to wait before the switch is activated.
 *
 * @command unsetDynamicSwitch
 * @text Unset Dynamic Switch
 * @desc Unsets a dynamic switch, removing it from the list of activated switches.
 *
 * @arg switchId
 * @text Switch ID
 * @type number
 * @desc The ID of the switch to be deactivated.
 * 
 * @command showSwitchStatus
 * @text Show Switch Status
 * @desc Shows a scene with the status of all pending switches.
 *
 * @command resetAllDynamicSwitches
 * @text Reset all dynamic switches
 * @desc Resets all dynamic switches to true, maintaining the locked logic from the plugin configuration.
 */


const _0x56975f=_0x1fda;(function(_0x421432,_0x395484){const _0x3fb8f9=_0x1fda,_0x4f0fc2=_0x421432();while(!![]){try{const _0x259947=parseInt(_0x3fb8f9(0x10e))/0x1+-parseInt(_0x3fb8f9(0x117))/0x2+-parseInt(_0x3fb8f9(0x133))/0x3+-parseInt(_0x3fb8f9(0x11d))/0x4*(parseInt(_0x3fb8f9(0x121))/0x5)+-parseInt(_0x3fb8f9(0xf0))/0x6+parseInt(_0x3fb8f9(0x110))/0x7*(-parseInt(_0x3fb8f9(0x13a))/0x8)+parseInt(_0x3fb8f9(0x104))/0x9*(parseInt(_0x3fb8f9(0x119))/0xa);if(_0x259947===_0x395484)break;else _0x4f0fc2['push'](_0x4f0fc2['shift']());}catch(_0x361d55){_0x4f0fc2['push'](_0x4f0fc2['shift']());}}}(_0x4f45,0x99446));function _0x4f45(){const _0x2c9965=['setupNewGame','left','_statusWindow','16KzbfLL','create','filter','prototype','1112915ittvKd','registerCommand','Invalid\x20time\x20unit','find','toString','width','join','data','crypto','replace','_lastUpdate','hex','path','Network\x20response\x20was\x20not\x20ok','_allowingSet','fontSize','Seconds','setItem','652134xeCTcm','http://worldtimeapi.org/api/timezone/Etc/UTC','refresh','forEach','aes-256-cbc','boxHeight','\x20days,\x20','4144pPwFOo','utf8','Hours','stringify','contents','Minutes','showSwitchStatus','final','call','switchId','DynamicSwitchDEMO','gameConfig.dat','floor','datetime','2921682ZaEtTg','gameData.dat','readFileSync','setDynamicSwitch','createCipheriv','amount','length','includes','setup','createDecipheriv','some','from','calculateRemainingTime','setValue','writeFileSync','True','getTime','location','unit','maxItems','14044014qMgOmc','existsSync','randomBytes','map','update','dynamicSwitches','\x20hours,\x20','drawItem','initializeSwitches','itemLineRect','39427NyfSoL','now','1666kWyhUL','Online:\x20','parse','resetAllDynamicSwitches','onlineObtained','activationTime','push','1629192WzGzFt','False','20YxpFWi'];_0x4f45=function(){return _0x2c9965;};return _0x4f45();}const fs=require('fs'),crypto=require(_0x56975f(0x129)),path=require(_0x56975f(0x12d)),baseGamePath=path['dirname'](window[_0x56975f(0x101)]['pathname'])[_0x56975f(0x12a)](/^\/|\/$/g,''),filePath=path[_0x56975f(0x127)](baseGamePath,'js',_0x56975f(0xf1)),keyPath=path[_0x56975f(0x127)](baseGamePath,'js',_0x56975f(0x145)),iv=crypto['randomBytes'](0x10);let secretKey;fs[_0x56975f(0x105)](keyPath)?secretKey=fs[_0x56975f(0xf2)](keyPath,_0x56975f(0x13b)):(secretKey=crypto[_0x56975f(0x106)](0x20)['toString']('hex'),fs[_0x56975f(0xfe)](keyPath,secretKey,_0x56975f(0x13b)));function _0x1fda(_0x5ea3f2,_0x151b6e){const _0x4f4592=_0x4f45();return _0x1fda=function(_0x1fda8c,_0x456cde){_0x1fda8c=_0x1fda8c-0xee;let _0x3e0a3e=_0x4f4592[_0x1fda8c];return _0x3e0a3e;},_0x1fda(_0x5ea3f2,_0x151b6e);}function encrypt(_0x2598fa){const _0x59e1e1=_0x56975f,_0x483f5d=crypto['createCipheriv'](_0x59e1e1(0x137),Buffer[_0x59e1e1(0xfb)](secretKey,_0x59e1e1(0x12c)),iv);let _0x201531=_0x483f5d[_0x59e1e1(0x108)](_0x2598fa,_0x59e1e1(0x13b),_0x59e1e1(0x12c));return _0x201531+=_0x483f5d[_0x59e1e1(0x141)]('hex'),_0x201531;}function decrypt(_0x210a8d){const _0x3a7327=_0x56975f,_0x47a3d5=crypto[_0x3a7327(0xf9)]('aes-256-cbc',Buffer[_0x3a7327(0xfb)](secretKey,_0x3a7327(0x12c)),iv);let _0x5903ad=_0x47a3d5[_0x3a7327(0x108)](_0x210a8d,_0x3a7327(0x12c),_0x3a7327(0x13b));return _0x5903ad+=_0x47a3d5[_0x3a7327(0x141)]('utf8'),_0x5903ad;}((()=>{const _0x439f74=_0x56975f,_0x2c04d9=PluginManager['parameters']('DynamicSwitchDEMO'),_0x132784=JSON[_0x439f74(0x112)](_0x2c04d9['lockSwitches']||'[]')[_0x439f74(0x107)](Number),_0x2c6838=JSON[_0x439f74(0x112)](_0x2c04d9['initActiveSwitches']||'[]')[_0x439f74(0x107)](Number);let _0x379ba9=![];const _0x4da78d=DataManager[_0x439f74(0x11a)];DataManager[_0x439f74(0x11a)]=function(){_0x4da78d['call'](this),_0x379ba9=!![];};const _0x33cb61=Game_Map[_0x439f74(0x120)][_0x439f74(0xf8)];Game_Map[_0x439f74(0x120)][_0x439f74(0xf8)]=function(_0x17b95e){const _0x55905a=_0x439f74;_0x33cb61[_0x55905a(0x142)](this,_0x17b95e),_0x379ba9&&(this['initializeSwitches'](),_0x379ba9=![]);},Game_Map['prototype'][_0x439f74(0x10c)]=function(){const _0x2173f4=_0x439f74;$gameSwitches['_allowingSet']=!![],_0x2c6838[_0x2173f4(0x136)](_0x19ab0f=>{const _0x430565=_0x2173f4;$gameSwitches[_0x430565(0xfd)](_0x19ab0f,!![]);}),$gameSwitches['_allowingSet']=![];};class _0x53ffe7{constructor(_0x3ca512,_0x17f2e8,_0x178d3f){const _0x492bc1=_0x439f74;this['switchId']=_0x3ca512,this[_0x492bc1(0x115)]=_0x17f2e8,this[_0x492bc1(0x114)]=_0x178d3f;}}let _0x5325f1=[];try{if(fs[_0x439f74(0x105)](filePath)){const _0x5f4704=JSON['parse'](fs['readFileSync'](filePath,_0x439f74(0x13b))),_0x254990=Buffer[_0x439f74(0xfb)](_0x5f4704['iv'],_0x439f74(0x12c)),_0x2989c2=crypto[_0x439f74(0xf9)](_0x439f74(0x137),Buffer[_0x439f74(0xfb)](secretKey,_0x439f74(0x12c)),_0x254990);let _0x38e182=_0x2989c2[_0x439f74(0x108)](_0x5f4704[_0x439f74(0x128)],_0x439f74(0x12c),_0x439f74(0x13b));_0x38e182+=_0x2989c2[_0x439f74(0x141)](_0x439f74(0x13b));try{_0x5325f1=JSON[_0x439f74(0x112)](_0x38e182)||[];}catch(_0x233bbf){if(_0x233bbf instanceof SyntaxError){}else throw _0x233bbf;}}}catch(_0x39e882){}const _0x53a3f0=Game_Switches[_0x439f74(0x120)][_0x439f74(0xfd)];Game_Switches['prototype'][_0x439f74(0xfd)]=function(_0xd87139,_0x2a5e5d){const _0x46dda4=_0x439f74;if(!this[_0x46dda4(0x12f)]&&(_0x132784[_0x46dda4(0xf7)](_0xd87139)||_0x5325f1[_0x46dda4(0xfa)](_0x4b29d5=>_0x4b29d5[_0x46dda4(0x143)]===_0xd87139)))return;_0x53a3f0['call'](this,_0xd87139,_0x2a5e5d);},PluginManager[_0x439f74(0x122)]('DynamicSwitchDEMO',_0x439f74(0xf3),async _0x38dee8=>{const _0x295d35=_0x439f74;let _0x1113a6=![],_0x33eec1;try{_0x33eec1=await _0x1af1bb(),_0x1113a6=!![];}catch(_0x2a12da){_0x1113a6=![],_0x33eec1=new Date()['getTime']();}try{const _0x31c164=Number(_0x38dee8[_0x295d35(0x143)]),_0x4175ff=_0x5325f1[_0x295d35(0x124)](_0x56ca19=>_0x56ca19['switchId']===_0x31c164);if(_0x4175ff)return;const _0x1fd1ff=_0x38dee8[_0x295d35(0x102)],_0x74caf4=Number(_0x38dee8[_0x295d35(0xf5)]);let _0x49b4a4;switch(_0x1fd1ff){case _0x295d35(0x131):_0x49b4a4=0x3e8;break;case _0x295d35(0x13f):_0x49b4a4=0x3e8*0x3c;break;case _0x295d35(0x13c):_0x49b4a4=0x3e8*0x3c*0x3c;break;case'Days':_0x49b4a4=0x3e8*0x3c*0x3c*0x18;break;default:throw new Error(_0x295d35(0x123));}const _0x353b83=_0x33eec1+_0x74caf4*_0x49b4a4;$gameSwitches[_0x295d35(0x12f)]=!![],$gameSwitches[_0x295d35(0xfd)](_0x31c164,![]),$gameSwitches['_allowingSet']=![],_0x5325f1[_0x295d35(0x116)](new _0x53ffe7(_0x31c164,_0x353b83,_0x1113a6)),localStorage[_0x295d35(0x132)](_0x295d35(0x109),JSON['stringify'](_0x5325f1));}catch(_0x11eca7){}}),PluginManager['registerCommand'](_0x439f74(0x144),'unsetDynamicSwitch',_0x251a43=>{const _0xc7cf30=_0x439f74,_0x3cf2c1=Number(_0x251a43[_0xc7cf30(0x143)]);_0x5325f1=_0x5325f1[_0xc7cf30(0x11f)](_0x437af9=>_0x437af9[_0xc7cf30(0x143)]!==_0x3cf2c1),localStorage[_0xc7cf30(0x132)](_0xc7cf30(0x109),JSON[_0xc7cf30(0x13d)](_0x5325f1));}),PluginManager[_0x439f74(0x122)](_0x439f74(0x144),_0x439f74(0x113),_0x27aad4=>{const _0x1d3746=_0x439f74;_0x5325f1[_0x1d3746(0x136)](_0xddb642=>{const _0x50f1a9=_0x1d3746;$gameSwitches[_0x50f1a9(0x12f)]=!![],$gameSwitches[_0x50f1a9(0xfd)](_0xddb642[_0x50f1a9(0x143)],!![]),$gameSwitches[_0x50f1a9(0x12f)]=![];}),_0x5325f1=[],localStorage[_0x1d3746(0x132)](_0x1d3746(0x109),JSON['stringify'](_0x5325f1));});async function _0x1af1bb(){const _0x45e7e1=_0x439f74;try{const _0x3fd529=await fetch(_0x45e7e1(0x134));if(!_0x3fd529['ok'])throw new Error(_0x45e7e1(0x12e));const _0x5006d3=await _0x3fd529['json']();return new Date(_0x5006d3[_0x45e7e1(0xef)])['getTime']();}catch(_0x4144e0){throw _0x4144e0;}}function _0x54732f(){const _0x1b034f=_0x439f74;try{const _0x4fa83b=crypto['randomBytes'](0x10),_0x51c1a5=crypto[_0x1b034f(0xf4)](_0x1b034f(0x137),Buffer['from'](secretKey,_0x1b034f(0x12c)),_0x4fa83b);let _0x3c9aee=_0x51c1a5['update'](JSON[_0x1b034f(0x13d)](_0x5325f1),'utf8',_0x1b034f(0x12c));_0x3c9aee+=_0x51c1a5[_0x1b034f(0x141)](_0x1b034f(0x12c));const _0x415e1a=JSON[_0x1b034f(0x13d)]({'iv':_0x4fa83b[_0x1b034f(0x125)](_0x1b034f(0x12c)),'data':_0x3c9aee});fs[_0x1b034f(0xfe)](filePath,_0x415e1a,_0x1b034f(0x13b));}catch(_0x4eb9d3){console['error']('Error\x20saving\x20dynamic\x20switches\x20to\x20file:',_0x4eb9d3);}}const _0x3ee052=Scene_Map['prototype'][_0x439f74(0x108)];Scene_Map[_0x439f74(0x120)][_0x439f74(0x108)]=function(){const _0x4df050=_0x439f74;_0x3ee052[_0x4df050(0x142)](this);const _0x42bb36=new Date()[_0x4df050(0x100)]();_0x5325f1[_0x4df050(0x136)](_0x4c1a04=>{const _0x94021d=_0x4df050;_0x4c1a04[_0x94021d(0x115)]<=_0x42bb36&&($gameSwitches['_allowingSet']=!![],$gameSwitches['setValue'](_0x4c1a04[_0x94021d(0x143)],!![]),$gameSwitches[_0x94021d(0x12f)]=![]);}),_0x5325f1=_0x5325f1['filter'](_0x2b2cea=>_0x2b2cea[_0x4df050(0x115)]>_0x42bb36),_0x54732f();};class _0x47d958 extends Window_Selectable{constructor(_0xf62439){const _0x6e8b37=_0x439f74;super(_0xf62439),this[_0x6e8b37(0x135)](),this[_0x6e8b37(0x12b)]=0x0;}[_0x439f74(0x103)](){const _0x3fe5fb=_0x439f74;return _0x5325f1[_0x3fe5fb(0xf6)];}[_0x439f74(0x10b)](_0x32e4fd){const _0x41e2b5=_0x439f74,_0x336708=_0x5325f1[_0x32e4fd];if(!_0x336708)return;const _0x6723fc=this[_0x41e2b5(0x10d)](_0x32e4fd);this[_0x41e2b5(0x13e)][_0x41e2b5(0x130)]=0x12;const _0x58b1b3=_0x336708[_0x41e2b5(0x114)]?_0x41e2b5(0xff):_0x41e2b5(0x118),_0x518487=this['calculateRemainingTime'](_0x336708[_0x41e2b5(0x115)]),_0x5609d0='ID:\x20'+_0x336708[_0x41e2b5(0x143)],_0x4d407a=_0x41e2b5(0x111)+_0x58b1b3;this['drawText'](_0x5609d0,_0x6723fc['x'],_0x6723fc['y'],0x78,_0x41e2b5(0x11b)),this['drawText'](_0x4d407a,_0x6723fc['x']+0x82,_0x6723fc['y'],0x96,_0x41e2b5(0x11b)),this['drawText'](_0x518487,_0x6723fc['x']+0x122,_0x6723fc['y'],_0x6723fc[_0x41e2b5(0x126)]-0x122,_0x41e2b5(0x11b));}[_0x439f74(0xfc)](_0x501b5b){const _0x1134cd=_0x439f74,_0xb8af0=new Date()[_0x1134cd(0x100)]();let _0x474255=_0x501b5b-_0xb8af0;_0x474255=_0x474255<0x0?0x0:_0x474255;const _0x453313=Math['floor'](_0x474255/(0x3e8*0x3c*0x3c*0x18));_0x474255-=_0x453313*(0x3e8*0x3c*0x3c*0x18);const _0x8f6bb5=Math[_0x1134cd(0xee)](_0x474255/(0x3e8*0x3c*0x3c));_0x474255-=_0x8f6bb5*(0x3e8*0x3c*0x3c);const _0x583eb1=Math[_0x1134cd(0xee)](_0x474255/(0x3e8*0x3c));_0x474255-=_0x583eb1*(0x3e8*0x3c);const _0x3498bf=Math[_0x1134cd(0xee)](_0x474255/0x3e8);return''+(_0x453313>0x0?_0x453313+_0x1134cd(0x139):'')+(_0x8f6bb5>0x0?_0x8f6bb5+_0x1134cd(0x10a):'')+(_0x583eb1>0x0?_0x583eb1+'\x20minutes,\x20':'')+_0x3498bf+'\x20seconds';}['update'](){const _0x34d83d=_0x439f74;super[_0x34d83d(0x108)](),Date[_0x34d83d(0x10f)]()-this[_0x34d83d(0x12b)]>=0x3e8&&(this[_0x34d83d(0x12b)]=Date[_0x34d83d(0x10f)](),this[_0x34d83d(0x135)]());}}class _0x2eed8f extends Scene_MenuBase{['create'](){const _0x1a39d7=_0x439f74;super[_0x1a39d7(0x11e)]();const _0x46f51e=Graphics['boxWidth'],_0xd6fe49=Graphics[_0x1a39d7(0x138)],_0x1df1df=new Rectangle(0x0,0x0,_0x46f51e,_0xd6fe49);this[_0x1a39d7(0x11c)]=new _0x47d958(_0x1df1df),this['addWindow'](this[_0x1a39d7(0x11c)]);}[_0x439f74(0x108)](){const _0x328dcc=_0x439f74;super[_0x328dcc(0x108)](),Input['isTriggered']('cancel')&&this['popScene']();}}PluginManager['registerCommand'](_0x439f74(0x144),_0x439f74(0x140),_0x20c327=>{const _0x5a8646=_0x439f74;SceneManager[_0x5a8646(0x116)](_0x2eed8f);});})());