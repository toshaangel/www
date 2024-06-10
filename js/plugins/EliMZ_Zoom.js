//==========================================================================
// EliMZ_Zoom.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v3.0.1 - Add the default zoom feature to plugin command.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-zoom-for-rpg-maker-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

By default, RPG Maker MZ comes with zoom functions in his code. But it 
doesn't seem to have an event command for that.
This plugin adds plugin commands to use the default zoom with some nice 
options!

============================================================================
Features
============================================================================

● Zoom in events, players, or followers.
● Zoom in a screen position(pixel).
● Zoom in a map position(tiles).

============================================================================
How to use
============================================================================

Just use the plugin commands.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

============================================================================
Update log
============================================================================
Version 3.0.1 - 09/12/2021
- Fixed a crash(due to a missing function) when using the plugin command 
to zoom on character.
Version 3.0.0 - 08/15/2021
- Add a plugin command to zoom into specific tile coordinate.
- Need Eli Book 4.0.0 now.
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
- Add an offset parameter for the zoom character plugin command.
Version 1.0.0 - 11/08/2020
- Plugin release!

@command zoomChar
@text Characters
@desc Zoom events, player or follower.

    @arg character
    @text Target
    @type text
    @desc -2 First Follower, -1 Player, 0 This event, 1+ Event's Id. Vehicles: Ship, Boat, Airship. You can use \v[id].
    @default 0

    @arg scale
    @text Scale
    @type number
    @desc The power of the zoom.
    @default 2

    @arg duration
    @text Duration
    @type number
    @desc How much it will take, in frames, to complete zoom.
    @default 60

    @arg offset
    @text Offset
    @type text
    @desc Set an offset value for x and y. Separate by comma.
    @default 0, 0

@command zoomScreen
@text Screen Coordinates
@desc Zoom on the screen.

    @arg x
    @text X
    @type text
    @desc The x position on the screen. Can use formulas and \v[id].
    @default 0

    @arg y
    @text Y
    @type text
    @desc The y position on the screen. Can use formulas and \v[id].
    @default 0

    @arg scale
    @text Scale
    @type number
    @desc The power of the zoom.
    @default 2

    @arg duration
    @text Duration
    @type number
    @desc How much it will take, in frames, to complete zoom.
    @default 60

@command zoomCoordinates
@text Tile Coordinates
@desc Zoom on the screen.

    @arg x
    @text X
    @type text
    @desc The x position on the screen. Can use formulas and \v[id].
    @default 0

    @arg y
    @text Y
    @type text
    @desc The y position on the screen. Can use formulas and \v[id].
    @default 0

    @arg scale
    @text Scale
    @type number
    @desc The power of the zoom.
    @default 2

    @arg duration
    @text Duration
    @type number
    @desc How much it will take, in frames, to complete zoom.
    @default 60

@command clearZoom
@text Clear
@desc Reset the zoom to default value.

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_Zoom = true

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const srcScript = document.currentScript.src
        const start = srcScript.lastIndexOf("/") + 1
        const end = srcScript.lastIndexOf(".js")
        const pluginName = srcScript.substring(start, end)

        return pluginName
    })()
    const requiredVersion = ['4','0','0']
    const updateWarning = `${pluginName} needs the EliMZ_Book ${requiredVersion} version.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    }
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook()
            Eli.alert = true
        }
    }

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook()
            Eli.alert = true
        }
    }
    
    if(!Imported.Eli_Book) needInstallBook()
    if(Eli.Book.Version < requiredVersion) needUpdateBook()
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

Eli.Zoom = {

    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters = parameters
    },

    initPluginCommands(){
        const commands = ['zoomChar', 'zoomScreen', 'zoomCoordinates', 'clearZoom']
        Eli.PluginManager.registerCommands(this, commands)
    },

    getCharacterById(id){
        if(id >= 0){
            return $gameMap.event(id)

        } else if(id == -1){
            return $gamePlayer

        }else if(id < -1){
            return $gamePlayer.followers()._data[Math.abs(id + 2)]

        }else{
            return $gameMap.vehicles().find(item => item._type === id.toLowerCase())
        }
    },

    zoomChar(args){
        const {scale, duration} = args
        const id = Eli.Utils.convertEscapeVariablesOnly(args.character)
        const character = this.getCharacterById(id)
        const [offsetX, offsetY] = args.offset.split(",").map(item => Number(item))
        const x = character.screenX() + offsetX
        const y = character.screenY() + offsetY
        
        $gameScreen.startZoom(x, y, Number(scale), Number(duration))
    },

    zoomScreen(args){
        const {scale, duration} = args
        const x = Number(Eli.Utils.processEscapeVarOrFormula(args.x))
        const y = Number(Eli.Utils.processEscapeVarOrFormula(args.y))
        
        $gameScreen.startZoom(x, y, Number(scale), Number(duration) )
    },

    zoomCoordinates(args){
        const {scale, duration} = args
        const x = Number(Eli.Utils.processEscapeVarOrFormula(args.x)) * $gameMap.tileWidth()
        const y = Number(Eli.Utils.processEscapeVarOrFormula(args.y)) * $gameMap.tileHeight()
        
        $gameScreen.startZoom(x, y, Number(scale), Number(duration) )
    },

    clearZoom(){
        $gameScreen.clearZoom()
    },
    
}

Eli.Zoom.initialize()