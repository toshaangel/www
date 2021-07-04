//============================================================================
// EliMZ_GlobalText.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc You can use escape codes in every window!
@author Hakuen Studio | v2.0.1 
@url https://hakuenstudio.itch.io/

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Introduction
==============================================================================

Sometimes you may want to customize your windows a little. It can often be the 
case that you want to change the colors of the texts, add icons or even 
variable values.
With this plugin you can easily customize your texts in the windows using 
escape codes as in the message box!

==============================================================================
Features
==============================================================================

Activate escape codes to be used in any window!

==============================================================================
How to use
==============================================================================

You can use Auto mode on plugin parameters, and all text will be converted 
automatically.

If you set to Manual mode, you have to choose a tag of your choice in the 
plugin parameters.

Then, just type the tag as the first letter in any text.

Example:
-Actor name
§\c[3]Harold

*NOTE¹: Not all codes can work outside the message box, such as waiting for 
frames or opening the gold window.

*NOTE²: Using escape codes in centralized texts, in horizontal windows 
(like the item category) ends up decentralizing them. I don't know how to 
fix this(without overwriting a lot of the default code), I made a few 
attempts and you can try to enable it in the plugin parameters. But I 
can't guarantee that someday I'll make a repair that works wonderfully.
If you want to keep text-centered, try to use spaces for now, or leave them 
for good.

*NOTE³: There are some windows that I do not add the global text 
functionality because it messes with the text.
Window_Shop, Window_ItemList, Window_NumberInput, Window_SkillList.

==============================================================================
Terms of Use
==============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

==============================================================================
Update log
==============================================================================
Version 2.0.1 - 04/12/2021
- Fixed an issue that some windows are not converting multiple escape 
characters.

Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.

Version 1.2.0 - 10/19/2020
- Created an experimental fix for the issue with centralized texts.
- Changed the plugin name.
- Adapt to Eli Book 2.0.0

Version 1.1.0 - 10/02/2020
- Fixed a bug in Window_ShopStatus.

Version 1.0.0 - 09/20/2020
- Plugin release!

@param auto
@text Mode
@type boolean
@desc If you set to false, you will have to put a tag on the first letter of any text.
@default false

@param tag
@text Tag
@type text
@desc The tag used to detect if the text has escape codes. Must be used as first letter(Only for Manual mode).
@default §
@parent mode

@param fixCenterAlign
@text Fix Center Align
@type boolean
@desc This is experimental and can offset a little bit the horizontal windows texts.
@default false

*/

"use strict"

var Eli = Eli || {};
var Imported = Imported || {};
Imported.Eli_GlobalText = true;

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const url = String(document.currentScript._url);
        const start = url.indexOf('Eli');
        const end = url.length - 3;
        const pluginName = url.substring(start, end);

        return pluginName;
    })();
    const requiredVersion = ['3','0','0']
    const updateWarning = `${pluginName} needs an updated version of EliMZ_Book.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    };
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook();
            Eli.alert = true;
        }
    };

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook();
            Eli.alert = true;
        }
    };
    
    if(!Imported.Eli_Book) needInstallBook();
    if(Eli.Book.Version < requiredVersion) needUpdateBook();
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.GlobalText = {

    parameters: EliPluginManager.createParameters() || {},
    alias: {},
    regGlobalEscape: undefined,
    regIcon: /\\i/gi,

    param(){
        return this.parameters;
    },

    initialize(){
        this.regGlobalEscape = new RegExp(this.parameters.tag, "gi");
    },

};

const Plugin = Eli.GlobalText;
const Alias = Eli.GlobalText.alias;

Plugin.initialize();

/* ========================================================================== */
/*                                   OBJECT                                   */
/* ========================================================================== */

Alias.Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
    text = EliBook.convertEscapeCharacters(text)
    Alias.Game_Message_add.call(this, text)
}

/* ========================================================================== */
/*                                   WINDOW                                   */
/* ========================================================================== */

Alias.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height){
    Alias.Window_Base_initialize.call(this, ...arguments);
    this._globalTag = Plugin.param().tag;
};

Alias.Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    if(this.canDrawGlobalText(String(text))){
        this.drawTextExAlign(...arguments);
    }else{
        Alias.Window_Base_drawText.call(this, ...arguments);
    }
}

Alias.Window_Base_drawTextEx = Window_Base.prototype.drawTextEx
Window_Base.prototype.drawTextEx = function(text, x, y) {
    if(text){
        text = this.convertEscapeCharacters(text);
    }

    return Alias.Window_Base_drawTextEx.call(this, text, x, y)
}

Window_Base.prototype.canDrawGlobalText = function(text){
    const isWindowShop = this.constructor.name === "Window_ShopStatus";
    const isWindowNumberInput = this.constructor.name === "Window_NumberInput";
    const isItemList = this instanceof Window_ItemList || this instanceof Window_SkillList;
    const isValidWindow = !isWindowShop && !isWindowNumberInput && !isItemList;
    const startWithGlobalTag = text.charAt(0) === this._globalTag;
    
    return text && (startWithGlobalTag || Plugin.param().auto) && isValidWindow;
};

Window_Base.prototype.drawTextExAlign = function(text, x, y, maxWidth, align){
    text = String(text).replace(Plugin.regGlobalEscape, '');

    if(this.canFixCenterAlign(align)) {
        x = this.fixCenterAlign(text, x);
    }

    this.drawTextEx(text, x, y, maxWidth);
};

Window_Base.prototype.canFixCenterAlign = function(align){
    const isCenter = align === 'center';
    const isParamFix = Plugin.param().fixCenterAlign;
    const isWindowCommand = this instanceof Window_Command;

    return align && isCenter && isParamFix && isWindowCommand;
};

Window_Base.prototype.fixCenterAlign = function(text, x){
    if(this.isHorizontal()){
        // const textWidth = this.textWidth(cleanText) + iconWidth;
        // const xR = eli.centerXPos(textWidth, maxWidth)
        return x; //+ xR;
    }else{
        const match = text.match(Plugin.regIcon);
        const iconWidth = match ? 32*(match.length) : 0;
        const cleanText = this.convertEscapeCharacters(text);
        const textWidth = this.textWidth(cleanText) + iconWidth;

        return EliBook.centerXPos(textWidth, this.contentsWidth());
    }
};



}