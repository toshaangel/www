//-----------------------------------------------------------------------------
//        DaedraKyne Plugins - Pro Lighting
//                    -------
//              DAE_Lighting.js
//       Work email: dohvacore@gmail.com
//-----------------------------------------------------------------------------




//-----------------------------------------------------------------------------
/*:
* @plugindesc v1.5 Pro Lighting
* 
* @author DaedraKyne
* 
* 
* @param === MAIN PARAMETERS ===
* @default
* 
* @param Light types
* @type struct<LightType>[]
* @default []
* 
* @param Global Light Toning Function
* @type note
* @default "float ToneMapFunc(float d, float m) {\n  float norm = d/m;\n  if (norm < 0.5) {\n    return clamp(1.2 - (0.2 / (exp(-norm))), 0., 1.);\n  }\n  else {\n    return clamp(1.57 - (norm/0.72), 0., 1.);\n  }\n}"
* 
* @param Light images
* @type struct<LightImage>[]
* @default []
*
* @param Animated lights
* @type struct<AnimatedLight>[]
* @default []
* 
* @param Region shadows
* @type struct<RegionShadow>[]
* @default ["{\"name\":\"Full-tile shadow\",\"Region ID\":\"4\",\"Shadow geometry type\":\"rectangle\",\"Values\":\"[\\\"-1\\\",\\\"-1\\\",\\\"50\\\",\\\"50\\\"]\"}","{\"name\":\"Left-wall shadow\",\"Region ID\":\"6\",\"Shadow geometry type\":\"rectangle\",\"Values\":\"[\\\"-1\\\",\\\"-1\\\",\\\"2\\\",\\\"50\\\"]\"}","{\"name\":\"Right-wall shadow\",\"Region ID\":\"7\",\"Shadow geometry type\":\"rectangle\",\"Values\":\"[\\\"47\\\",\\\"-1\\\",\\\"2\\\",\\\"50\\\"]\"}","{\"name\":\"Left-roof top\",\"Region ID\":\"10\",\"Shadow geometry type\":\"polygon\",\"Values\":\"[\\\"0\\\",\\\"48\\\",\\\"0\\\",\\\"42\\\",\\\"42\\\",\\\"0\\\",\\\"48\\\",\\\"0\\\",\\\"48\\\",\\\"48\\\"]\"}","{\"name\":\"Right-roof top\",\"Region ID\":\"11\",\"Shadow geometry type\":\"polygon\",\"Values\":\"[\\\"48\\\",\\\"48\\\",\\\"48\\\",\\\"42\\\",\\\"6\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"48\\\"]\"}"]
*
* @param Region lights
* @type struct<RegionLight>[]
* @default []
* 
* 
* 
* 
* 
* @help
* 
* ----------------------------------------------------------------------------
* Introduction
* ----------------------------------------------------------------------------
* Requires MV 1.6.1 or higher
* 
* This plugin is a lighting system for RPG Maker MV. It allows for
* Real-Time Shadows, as well as animated lights (both through images
* and through light settings).
*
* ----------------------------------------------------------------------------
* How to use
* ----------------------------------------------------------------------------
*
* 1. Light types
*  - Light types are used to define the light settings for each light.
*  - Light types are defined in the plugin parameters.
*  - Lights can be created by referring to a light type.
*  - Light types can have an image or an animation, if needed.
      - These are defined with the "Light Image ID" setting.
*  - Light types can have custom animations. These are defined in the plugin parameters.
*     - Custom animations allow for animated lights without the use of images.
*
* 2. Event comments
*  - Event comments are used to define the light settings for each event.
*  - Lights created using event comments are deleted when the event is deleted / switches pages.
*  - The following event comments allow for the manipulation of lights:
*    - [dae_light addlight lightId type]
*      - Adds a light centered on the event. ID is either "null" or any string.
*    - [dae_light setoffset lightId x y]
*      - Sets the offset of the light.
*    - [dae_light setcolor lightId R G B]
*      - Sets the color of the light.
*    - [dae_light setintensity lightId intensity]
*      - Sets the intensity of the light.
*    - [dae_light setrotation lightId rotation]
*      - Resets the rotation of the light to that value.
*    - [dae_light setrotationorigin lightId rotation]
*      - Sets the rotation origin of the light (rotation = rotation origin + delta rotation).
*    - [dae_light setangle lightId angle]
*      - Sets the angle of the light.
*    - [dae_light setrotation/f lightId rotation]
*      - Sets the delta rotation of the light.
*
* 3. Plugin commands
*  - Plugin commands allow for the manipulation of lights.
*  - Plugin commands are the same as event comments, but without the [] brackets.
*  - Here's an example: dae_light setrotation/f rot 2
*    - Sets the delta rotation of the light with ID "rot" to 2.
*  - The following plugin commands also exist:
*    - dae_light setambientlight R G B
*      - Sets the ambient light for the scene.
*      - Example: dae_light setambientlight 0 10 10
*
* 4. Shadows
*  - Shadows come in two types:
*    - Full-tile regionID shadows
*       - These are defined in the plugin parameters.
*       - These can take different shapes, each requiring different values.
*          - Rectangle: x, y, width, height
*          - Rounded rectangle: x, y, width, height, radius
*          - Circle: x, y, radius
*          - Ellipse: x, y, width, height
*          - Polygon: x1, y1, x2, y2, x3, y3, ...
*    - Shadowmap shadows
*       - These are PNG images that are used to create the shadowmap.
*       - For now, a pixel that is colored in the image is considered to be a shadow-casting object.
*       - The image must be the same size as the current map.
*       - The image must be in the "img/shadows" folder.
*       - To use the image in a map, add the following to the map's note:
*         - <dae_light shadowpicture filename>
*  - (The next version of the plugin will have multi-height shadows).
*  - (The next version of the plugin will have different type of shadow-casting objects, represented by different colors).
*
* 5. Optimisation
*  - This plugin has been optimised for performance.
*  - Lights that are not visible on-screen are not rendered, but they can still be manipulated.
*  - Keep the following in mind when working with this plugin:
*    - The more shadow-casting object there are in a scene, the better the performance will be.
*    - There is an individual option in the plugin parameters for each light type to turn off the shadow casting. 
         This option might come in handy if you have many lights that do not require ray-tracing.
*    - While having lots of lights should not cut down on performance, having very large lights definitely can.
*    - The following actions on a light will cause it to have to recalculate its shadow geometry:
*      - Changing the light's position
*      - Changing the light's radius (more optimisation coming soon)
*      - Using image/animations for the light does not affect performance.
*      - Using spritesheets animations is more performant than using the custom animation settings.
*
* 6. Global lighting settings
*  - The tag <dae_light off> can be used in a map's note to disable the lighting system for that map.
*
* 7. Additional features
*  - If you have features that you would like to see added, please contact me.
*    - You can contact me by posting on the RPG Maker forums post for this plugin, or by DMing me on the forums.
*    - Here are the various links to the forum posts that currently exist:
*      - (MV+MZ): https://forums.rpgmakerweb.com/index.php?threads/mv-mz-v1-3-optimized-lighting-with-real-time-shadows-new-custom-light-images.140191/
* 
* ----------------------------------------------------------------------------
* Changelog
* ----------------------------------------------------------------------------
* 
* Version 1.5:
* - Added support for light spritesheet animations.
* - Added support for light custom animations (settings-based)
* - Implemented customisability for Region Shadows and Region Lights.
* - Implemented various performance optimisations.
* - Implemented basic light-culling.
*
* Version 1.3:
* - Added light image support
* - Added customisation for light direction offsets
* - Added plugin command for ambient light
* 
* Version 1.2:
* - Added light rotations and light angles (wideness)
* - Added light rotation animation (delta rotation)
* - Added automatic light offset change depending on rotation
* - Added in-game (plugin commands) light customisations
*  
* Version 1.0:
* - Initial release
* 
* 
* @command setambientlight
* @text Set ambient light
* @desc Sets the ambient light
*
* @arg color
* @text Color
* @type struct<Color>
* @default {"R":"20","G":"20","B":"20"}
*
*
* @command newlight
* @text Create a new light
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg lightType
* @text Light Type
* @type text
* 
* 
* @command setoffset
* @text Set Light Offset
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg offset
* @text Light Offset
* @type struct<Point>
* 
* 
* @command setcolor
* @text Set Light Color
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg color
* @text Light Color
* @type struct<Color>
* 
* 
* @command setrotationorigin
* @text Set Light Rotation Origin
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg rotationOrigin
* @text Light Rotation Origin
* @type number
* @default 0
* @min -360
* @max 360
* 
* 
* @command setrotation
* @text Set Rotation
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg rotation
* @text Rotation
* @type number
* @default 0
* @min -360
* @max 360
* 
* 
* @command setangle
* @text Set Angle
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg angle
* @text Angle
* @type number
* @default 0
* @min 0
* @max 360
* 
* 
* @command setintensity
* @text Set Intensity 
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg intensity
* @text Intensity
* @type number
* @default 100
* @min 0
* @max 200
* @desc Maximum intensity is 200
* 
* 
* @command setrotation/f
* @text Set Rotation per Frame
* @desc
* 
* @arg lightID
* @text Unique Light ID
* @type text
* 
* @arg rotation
* @text Rotation / frame
* @type number
* @default 0
* @min -360
* @max 360
* @decimals 4
* 
* 
*/

/*~struct~Point:
 * @param x
 * @text x
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param y
 * @text y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 */


/*~struct~LightType:
* @param ID / name
* @type text
* @default white_light
*
* @param Cast shadows
* @type boolean
* @default true
* @desc For lights that move a lot, shadow-casting can be an expensive task.
* 
* @param Light Image ID
* @type text
* @require 1
* @default none
* @desc If specified, the light will drawn from this image. Leave "none" to not use any image.
* 
* @param Color
* @text Tint Color
* @type struct<Color>
* @require 1
* @default {"R":"255","G":"255","B":"255"}
* @desc The color to tint the light in. If the light is taken from an image, the image will be tinted with this color.
* 
* @param Custom Toning Function
* @type note
*
* @param intensity
* @type number
* @require 1
* @min 1
* @max 200
* @default 100
* 
* @param variation
* @type number
* @require 1
* @default 0
* 
* @param X offset
* @type number
* @require 1
* @default 0
* 
* @param Y offset
* @type number
* @require 1
* @default 0
* 
* @param Radius
* @type number
* @require 1
* @min 1
* @default 24
* 
* @param Angle
* @type number
* @require 1
* @min 0
* @max 360
* @default 360
* @desc How wide the light's angle is. In degrees. (example: 180 would create a half-circle light)
* 
* @param Rotation
* @type number
* @require 1
* @min 0
* @max 360
* @default 0
* @desc The rotation of your light. (example: with an angle of 90 and a rotation of 0, the light will shine from top-rightt to bottom-left)
* 
* @param Rot/f
* @text Rotations / frame
* @require 1
* @type number
* @default 0
* @min -360
* @max 360
* @decimals 4
* @desc How much the light rotates each frame. Can be also be decimal and negative.
* 
* @param Auto-rotate
* @type boolean
* @require 1
* @default false
* @desc If true, the light will rotate with the event / character / player it is linked to, if any.
* 
* @param Auto-rotate Manual-offset
* @type boolean
* @require 1
* @default false
* @desc If true, the light will automatically change its manual offset depending on its rotation. 
*
* @param Custom directional offsets
* @type struct<DirOffsets>
* @require 1
* @default {"2":"{\"x\":\"0\",\"y\":\"0\"}","4":"{\"x\":\"0\",\"y\":\"0\"}","6":"{\"x\":\"0\",\"y\":\"0\"}","8":"{\"x\":\"0\",\"y\":\"0\"}"}
* @desc Used to make flashlight offsets for characters. Only works if Auto-rotate Manual-offset is OFF.
*
* @param customAnimation
* @text Custom Animation
* @type struct<LightAnim>[]
* @default []
* @desc Used to make custom animations for the light. Frames are interpolated between the ones specified.
*/

/*~struct~LightAnim:
* @param frameTime
* @text Frame time
* @type number
* @require 1
* @default 0
* @min 0
* @desc The time, in frames, at which this frame will be displayed.
*
* @param color
* @text Color
* @type struct<Color>
* @require 1
* @default {"R":"255","G":"255","B":"255"}
* @desc The color to tint the light in. If the light is taken from an image, the image will be tinted with this color.
*
* @param intensity
* @text Intensity
* @type number
* @require 1
* @default 100
* @min 0
* @max 200
* @desc Maximum intensity is 200.
*
* @param offset
* @text Offset
* @type struct<Point>
* @require 1
* @default {"x":"0","y":"0"}
* @desc The offset of the light for this frame. Independent to the light's manual offset.
*
* @param radius
* @text Radius
* @type number
* @require 1
* @default 24
* @min 1
*
* @param angle
* @text Angle
* @type number
* @require 1
* @default 360
* @min 0
* @max 360
*
* @param rotation
* @text Rotation
* @type number
* @require 1
* @default 0
* @min -360
* @max 360
*
*/

/*~struct~LightImage:
 * @param ID / Name
 * @type text
 * @default
 * @require 1
 * @desc This is the ID you'll need to refer to this image in the plugin's code and light parameters.
 * 
 * @param Image
 * @type file
 * @dir img/lights/
 * @desc This is the image that will be used for the light.
 * 
 * @param Preload on start
 * @type boolean
 * @default true
 * @require 1
 * @desc If true, the image will be preloaded when the game starts.
 * 
 * @param Width
 * @type number
 * @default 0
 * @min 0
 * @require 1
 * @desc The width of the image. This is required. You can check the width of an image by going to the file's properties->details.
 * 
 * @param Height
 * @type number
 * @default 0
 * @min 0
 * @require 1
 * @desc The height of the image. This is required. You can check the height of an image by going to the file's properties->details.
 * 
 */

/*~struct~AnimatedLight:
 * @param Animation ID / Name
 * @type text
 * @default
 * @require 1
 * 
 * @param Spritesheet image
 * @type file
 * @dir img/lights/
 * @require 1
 * @desc This is the image that will be used for the light's animation frames.
 * 
 * @param frames
 * @text Frames
 * @type struct<AnimatedLightFrame>[]
 * @require 1
 * @desc This is the list of frames that will be used for the light.
 * 
 * @param width
 * @text Spritesheet width
 * @type number
 * @default 0
 * @min 0
 * @require 1
 * @desc This is the width of the image that will be used for the light's animation frames.
 * 
 * @param height
 * @text Spritesheet height
 * @type number
 * @default 0
 * @min 0
 * @require 1
 * @desc This is the height of the image that will be used for the light's animation frames.
 * 
 * 
 * @param duration
 * @text Frame duration
 * @type number
 * @default 5
 * @min 1
 * @require 1
 * @desc The duration of each frame in frames.
 * 
 * @param Preload on start
 * @type boolean
 * @default true
 * @require 1
 * @desc If true, the animation frames will be preloaded when the game starts.
 * 
 */

/*~struct~AnimatedLightFrame:
 * 
 * @param x
 * @text X
 * @type number
 * @min 0
 * @default 0
 * @require 1
 * @desc The x position of the frame.
 * 
 * @param y
 * @text Y
 * @type number
 * @min 0
 * @default 0
 * @require 1
 * @desc The y position of the frame.
 * 
 * @param width
 * @text Width
 * @type number
 * @min 0
 * @default 0
 * @require 1
 * @desc The width of the frame.
 * 
 * @param height
 * @text Height
 * @type number
 * @min 0
 * @default 0
 * @require 1
 * @desc The height of the frame.
 * 
 */

/*~struct~Color:
* @param R
* @type number
* @min 0
* @max 255
* @default 255
* 
* @param G
* @type number
* @min 0
* @max 255
* @default 255
* 
* @param B
* @type number
* @min 0
* @max 255
* @default 255
* 
*/

/*~struct~Offset:
 * @param x
 * @text X
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param y
 * @text Y
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 */

/*~struct~DirOffsets:
 * @param 8
 * @text Up
 * @type struct<Offset>
 * @default {"x":"0","y":"0"}
 * 
 * @param 2
 * @text Down
 * @type struct<Offset>
 * @default {"x":"0","y":"0"}
 * 
 * @param 4
 * @text Left
 * @type struct<Offset>
 * @default {"x":"0","y":"0"}
 * 
 * @param 6
 * @text Right
 * @type struct<Offset>
 * @default {"x":"0","y":"0"}
 */

/*~struct~RegionShadow:
 * @param name
 * @text Shadow name
 * @type text
 * @default
 * @desc The name of the shadow. Used to easily recognise it.
 *
 * @param Region ID
 * @type number
 * @min 1
 * @require 1
 * @default 1
 * @desc The ID of the region that will be used as a shadow.
 * 
 * @param Shadow geometry type
 * @type select
 * @default rectangle
 * @desc The type of shadow geometry.
 * @option rectangle
 * @option rounded rectangle
 * @option circle
 * @option ellipse
 * @option polygon
 * 
 * @param Values
 * @type number[]
 * @default ["0","0","0","0"]
 * @desc The values of the shadow. Depends on the geometry, see help file for more info.
 *
 */

/*~struct~RegionLight:
 * @param name
 * @text Region light name
 * @type text
 * @default
 * @desc The name of the region light. Used to easily recognise it.
 * 
 * @param Region ID
 * @type number
 * @min 1
 * @require 1
 * @default 1
 * @desc The ID of the region that will be used as a light.
 * 
 * @param Light ID / Name
 * @type text
 * @default
 * @desc The ID of the light that will be spawned in this region.
 */


/*

TODO:
 - player visibility: if enabled, lights aren't visible if they aren't within the player's visibility "light"
     (once all lights are rendered, add new filter to light-map to enable this feature)

*/

var Imported = Imported || {};
Imported.DAE_Lighting = true;

var DAE = DAE || {};
DAE.Lighting = DAE.Lighting || {};

// DAE.COMMENT_REG = /\[dae_light\s([\w_]+)\s(-?[\w_\d]+)\]/i;






$lightSys = null;




(function (_) {

    _.pluginName = 'DAE_Lighting';

const _0x115d40=_0x4080;(function(_0x158b97,_0x22fdea){const _0x277a3d=_0x4080,_0x1da3ab=_0x158b97();while(!![]){try{const _0x5be45b=parseInt(_0x277a3d(0x2ca))/0x1*(-parseInt(_0x277a3d(0x20a))/0x2)+parseInt(_0x277a3d(0x2ad))/0x3+-parseInt(_0x277a3d(0x1af))/0x4+parseInt(_0x277a3d(0x1a7))/0x5+-parseInt(_0x277a3d(0x285))/0x6*(-parseInt(_0x277a3d(0x27a))/0x7)+-parseInt(_0x277a3d(0x2b4))/0x8*(-parseInt(_0x277a3d(0x22c))/0x9)+-parseInt(_0x277a3d(0x1f0))/0xa;if(_0x5be45b===_0x22fdea)break;else _0x1da3ab['push'](_0x1da3ab['shift']());}catch(_0x191c94){_0x1da3ab['push'](_0x1da3ab['shift']());}}}(_0x36ea,0x702b8),PluginManager[_0x115d40(0x19e)](_[_0x115d40(0x2b5)],_0x115d40(0x231),_0x4e7913=>{const _0x971506=_0x115d40,_0x57ddb0=JSON['parse'](_0x4e7913[_0x971506(0x2bb)]);_0x57ddb0['R']=Number(_0x57ddb0['R']),_0x57ddb0['G']=Number(_0x57ddb0['G']),_0x57ddb0['B']=Number(_0x57ddb0['B']),$lightSys[_0x971506(0x298)](_0x57ddb0);}),PluginManager[_0x115d40(0x19e)](_[_0x115d40(0x2b5)],_0x115d40(0x282),_0x427f27=>{const _0x32359b=_0x115d40,_0x556f07=_0x427f27[_0x32359b(0x1ec)],_0x310809=_0x427f27[_0x32359b(0x286)],_0x3e0284=new Sprite_Light(this,_0x556f07,_0x310809),_0x9e006c=$lightSys[_0x32359b(0x1ac)](_0x3e0284,_0x556f07);}),PluginManager[_0x115d40(0x19e)](_[_0x115d40(0x2b5)],_0x115d40(0x240),_0xf60d47=>{const _0x3b87ef=_0x115d40,_0x3228f1=_0xf60d47[_0x3b87ef(0x1ec)],_0x4c0ab2=JSON[_0x3b87ef(0x24c)](_0xf60d47[_0x3b87ef(0x1ba)]);_0x4c0ab2['x']=Number(_0xf60d47['offset']['x']),_0x4c0ab2['y']=Number(_0xf60d47[_0x3b87ef(0x1ba)]['y']);const _0x1eb90e=$lightSys[_0x3b87ef(0x24a)](_0x3228f1,!![]);if(_0x1eb90e)_0x1eb90e[_0x3b87ef(0x19a)](x,y);}),PluginManager[_0x115d40(0x19e)](_[_0x115d40(0x2b5)],'setcolor',_0x57225b=>{const _0x3d058f=_0x115d40,_0x4400d1=_0x57225b[_0x3d058f(0x1ec)],_0x4a16b5=JSON[_0x3d058f(0x24c)](_0x57225b[_0x3d058f(0x2bb)]),_0x147fde=$lightSys[_0x3d058f(0x24a)](_0x4400d1,!![]);if(_0x147fde)_0x147fde[_0x3d058f(0x2a5)](_0x4a16b5);}),PluginManager['registerCommand'](_['pluginName'],_0x115d40(0x227),_0x5057b0=>{const _0xc1aab0=_0x115d40,_0x437843=_0x5057b0[_0xc1aab0(0x1ec)],_0x49ac8a=Number(_0x5057b0[_0xc1aab0(0x21c)]),_0x2fad1e=$lightSys[_0xc1aab0(0x24a)](_0x437843,!![]);if(_0x2fad1e)_0x2fad1e[_0xc1aab0(0x20c)](_0x49ac8a);}),PluginManager[_0x115d40(0x19e)](_[_0x115d40(0x2b5)],_0x115d40(0x26e),_0x1474ed=>{const _0x552375=_0x115d40,_0x365705=_0x1474ed['lightID'],_0x54a7b=Number(_0x1474ed[_0x552375(0x21c)]),_0x4ee2ba=$lightSys[_0x552375(0x24a)](_0x365705,!![]);if(_0x4ee2ba)_0x4ee2ba[_0x552375(0x1e8)](_0x54a7b);}),PluginManager[_0x115d40(0x19e)](_[_0x115d40(0x2b5)],_0x115d40(0x28e),_0x32ba2c=>{const _0x36fdee=_0x115d40,_0x507fd7=_0x32ba2c['lightID'],_0x463f69=Number(_0x32ba2c[_0x36fdee(0x201)]),_0x54ab26=$lightSys[_0x36fdee(0x24a)](_0x507fd7,!![]);if(_0x54ab26)_0x54ab26[_0x36fdee(0x1bd)](_0x463f69);}),PluginManager[_0x115d40(0x19e)](_[_0x115d40(0x2b5)],'setintensity',_0x51f440=>{const _0x16acd5=_0x115d40,_0x42a6cd=_0x51f440[_0x16acd5(0x1ec)],_0x339dd8=Number(_0x51f440[_0x16acd5(0x1e1)]),_0x4f2a99=$lightSys[_0x16acd5(0x24a)](_0x42a6cd,!![]);if(_0x4f2a99)_0x4f2a99[_0x16acd5(0x2a5)](_0x4f2a99['colors'],_0x339dd8);}),PluginManager[_0x115d40(0x19e)](_['pluginName'],_0x115d40(0x197),_0xb2bea8=>{const _0x4a7337=_0x115d40,_0x26124c=_0xb2bea8['lightID'],_0x49212f=Number(_0xb2bea8[_0x4a7337(0x21c)]),_0x348c6f=$lightSys[_0x4a7337(0x24a)](_0x26124c,!![]);if(_0x348c6f)_0x348c6f[_0x4a7337(0x219)]=_0x49212f;}),parseColor=function(_0x378640){const _0x5abbf7=_0x115d40;return _0x378640=JSON[_0x5abbf7(0x24c)](_0x378640),(_0x378640['R']=Number(_0x378640['R']),_0x378640['G']=Number(_0x378640['G']),_0x378640['B']=Number(_0x378640['B'])),_0x378640;},parsePoint=function(_0x329628){const _0x3c7b1a=_0x115d40;return _0x329628=JSON[_0x3c7b1a(0x24c)](_0x329628),(_0x329628['x']=Number(_0x329628['x']),_0x329628['y']=Number(_0x329628['y'])),_0x329628;},_['COMMENT_REG']=/\[dae_light\s([\w_\d\/.]+)\s([\w_\d\/.]+)\s([\w_\d\/.]+)\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\]/i);const parameters=PluginManager[_0x115d40(0x215)](_[_0x115d40(0x2b5)]),light_types=JSON['parse'](parameters[_0x115d40(0x24d)]);_[_0x115d40(0x236)]=new Map(),light_types['forEach'](_0x2e8efb=>{const _0x28d4f5=_0x115d40;_0x2e8efb=JSON[_0x28d4f5(0x24c)](_0x2e8efb),_0x2e8efb[_0x28d4f5(0x22b)]=JSON[_0x28d4f5(0x24c)](_0x2e8efb[_0x28d4f5(0x22b)]),_0x2e8efb['Custom\x20directional\x20offsets']=JSON[_0x28d4f5(0x24c)](_0x2e8efb[_0x28d4f5(0x27b)]);for(var _0x46501f=0x2;_0x46501f<=0x8;_0x46501f+=0x2){_0x2e8efb[_0x28d4f5(0x27b)][_0x46501f]=JSON[_0x28d4f5(0x24c)](_0x2e8efb['Custom\x20directional\x20offsets'][_0x46501f+'']),_0x2e8efb[_0x28d4f5(0x27b)][_0x46501f]['x']=Number(_0x2e8efb[_0x28d4f5(0x27b)][_0x46501f]['x']),_0x2e8efb[_0x28d4f5(0x27b)][_0x46501f]['y']=Number(_0x2e8efb['Custom\x20directional\x20offsets'][_0x46501f]['y']);}_0x2e8efb[_0x28d4f5(0x23e)]=JSON['parse'](_0x2e8efb[_0x28d4f5(0x23e)]),_0x2e8efb[_0x28d4f5(0x23e)]=_0x2e8efb['customAnimation']['map'](_0x166a17=>{const _0x1b3bce=_0x28d4f5;return _0x166a17=JSON['parse'](_0x166a17),_0x166a17[_0x1b3bce(0x1e9)]=Number(_0x166a17[_0x1b3bce(0x1e9)]),_0x166a17[_0x1b3bce(0x2bb)]=parseColor(_0x166a17[_0x1b3bce(0x2bb)]),_0x166a17['offset']=parsePoint(_0x166a17['offset']),_0x166a17[_0x1b3bce(0x1e1)]=Number(_0x166a17['intensity']),_0x166a17['radius']=Number(_0x166a17[_0x1b3bce(0x297)]),_0x166a17[_0x1b3bce(0x21c)]=Number(_0x166a17[_0x1b3bce(0x21c)]),_0x166a17[_0x1b3bce(0x201)]=Number(_0x166a17[_0x1b3bce(0x201)]),_0x166a17;}),_[_0x28d4f5(0x236)][_0x28d4f5(0x1a0)](_0x2e8efb['ID\x20/\x20name'],_0x2e8efb);}),_[_0x115d40(0x27e)]=JSON[_0x115d40(0x24c)](parameters[_0x115d40(0x1a1)]),_[_0x115d40(0x1be)]=new Map();const regionLights=JSON[_0x115d40(0x24c)](parameters[_0x115d40(0x1dd)]);regionLights[_0x115d40(0x1fc)](_0x3395d4=>{const _0x3c828e=_0x115d40;_0x3395d4=JSON[_0x3c828e(0x24c)](_0x3395d4),_0x3395d4['id']=Number(_0x3395d4[_0x3c828e(0x1d0)]),_0x3395d4[_0x3c828e(0x268)]=_0x3395d4['Light\x20ID\x20/\x20Name'],_[_0x3c828e(0x1be)][_0x3c828e(0x1a0)](_0x3395d4['id'],_0x3395d4);}),_[_0x115d40(0x194)]=new Map(),_['REGION_SHADOWS']=new Map();const regionShadows=JSON['parse'](parameters[_0x115d40(0x1e3)]);regionShadows[_0x115d40(0x1fc)](_0x5da2f9=>{const _0x181f41=_0x115d40;_0x5da2f9=JSON['parse'](_0x5da2f9),_0x5da2f9['id']=Number(_0x5da2f9[_0x181f41(0x1d0)]),_0x5da2f9[_0x181f41(0x268)]=_0x5da2f9[_0x181f41(0x24e)];let _0x36e2b0=JSON['parse'](_0x5da2f9[_0x181f41(0x1f3)]);_0x36e2b0=_0x36e2b0[_0x181f41(0x19b)](_0x24479d=>Number(_0x24479d)),_0x5da2f9[_0x181f41(0x1ae)]=_0x36e2b0,_[_0x181f41(0x29b)]['set'](_0x5da2f9['id'],_0x5da2f9);}),_[_0x115d40(0x200)]=new Map(),_[_0x115d40(0x1d9)]=new Map(),_['LIGHT_IMAGES'][_0x115d40(0x1a0)]('none',{'file':null,'texture':new PIXI[(_0x115d40(0x1cb))](new PIXI[(_0x115d40(0x1c5))](),new PIXI[(_0x115d40(0x257))](0x0,0x0,0x0,0x0)),'width':0x0,'height':0x0});function _0x4080(_0x5cacb0,_0x12316e){const _0x36eaf6=_0x36ea();return _0x4080=function(_0x40800b,_0x1a886c){_0x40800b=_0x40800b-0x194;let _0x36be4e=_0x36eaf6[_0x40800b];return _0x36be4e;},_0x4080(_0x5cacb0,_0x12316e);}const light_images=JSON[_0x115d40(0x24c)](parameters[_0x115d40(0x22d)]);light_images[_0x115d40(0x1fc)](_0x4d2690=>{const _0x213276=_0x115d40;_0x4d2690=JSON[_0x213276(0x24c)](_0x4d2690);const _0x339750=_0x213276(0x1e6)+_0x4d2690[_0x213276(0x2aa)]+_0x213276(0x21d),_0x212c9d=Boolean(_0x4d2690[_0x213276(0x1f8)]==_0x213276(0x1b7));_['LIGHT_IMAGES'][_0x213276(0x1a0)](_0x4d2690[_0x213276(0x1a9)],{'file':_0x339750,'texture':_0x212c9d?new PIXI[(_0x213276(0x1cb))][(_0x213276(0x209))](_0x339750):null,'width':Number(_0x4d2690[_0x213276(0x20d)]),'height':Number(_0x4d2690['Height'])});}),_[_0x115d40(0x1bb)]=new Map();const lightAnimations=JSON[_0x115d40(0x24c)](parameters[_0x115d40(0x1c2)]);lightAnimations['forEach'](_0x1db5b3=>{const _0x355396=_0x115d40;_0x1db5b3=JSON[_0x355396(0x24c)](_0x1db5b3);const _0xab3527=Boolean(_0x1db5b3['Preload\x20on\x20start']==_0x355396(0x1b7));_0x1db5b3['id']=_0x1db5b3[_0x355396(0x2a9)],_0x1db5b3[_0x355396(0x1b8)]=_0x355396(0x1e6)+_0x1db5b3[_0x355396(0x213)]+_0x355396(0x21d),_0x1db5b3[_0x355396(0x1fd)]=_0xab3527?new PIXI[(_0x355396(0x1cb))][(_0x355396(0x209))](_0x1db5b3[_0x355396(0x1b8)]):null,_0x1db5b3[_0x355396(0x1a3)]=Number(_0x1db5b3[_0x355396(0x1a3)]),_0x1db5b3[_0x355396(0x2ae)]=Number(_0x1db5b3[_0x355396(0x2ae)]),_0x1db5b3[_0x355396(0x253)]=Number(_0x1db5b3[_0x355396(0x253)]),_0x1db5b3[_0x355396(0x2a7)]=JSON[_0x355396(0x24c)](_0x1db5b3['frames']),_0x1db5b3[_0x355396(0x2a7)]=_0x1db5b3[_0x355396(0x2a7)][_0x355396(0x19b)](_0x1258fa=>{const _0x1a0121=_0x355396;return _0x1258fa=JSON[_0x1a0121(0x24c)](_0x1258fa),_0x1258fa['x']=Number(_0x1258fa['x']),_0x1258fa['y']=Number(_0x1258fa['y']),_0x1258fa[_0x1a0121(0x2ae)]=Number(_0x1258fa[_0x1a0121(0x2ae)]),_0x1258fa[_0x1a0121(0x253)]=Number(_0x1258fa['height']),_0x1258fa;}),_[_0x355396(0x1bb)][_0x355396(0x1a0)](_0x1db5b3['id'],_0x1db5b3);});const _StateSystem_setBlendMode=PIXI[_0x115d40(0x2cb)][_0x115d40(0x250)][_0x115d40(0x2bd)][_0x115d40(0x255)];PIXI[_0x115d40(0x2cb)][_0x115d40(0x250)][_0x115d40(0x2bd)]['setBlendMode']=function setBlendMode(_0x2b18ad){const _0x2e30f6=_0x115d40;if(_0x2b18ad===undefined)return;_StateSystem_setBlendMode[_0x2e30f6(0x1f2)](this,_0x2b18ad);},DataManager[_0x115d40(0x25b)]=DataManager[_0x115d40(0x1fe)],DataManager['createGameObjects']=function(){const _0x16ecde=_0x115d40;DataManager[_0x16ecde(0x25b)](),$lightSys=new System_Lights();},Graphics['dae_createAllElements']=Graphics[_0x115d40(0x2c2)],Graphics[_0x115d40(0x2c2)]=function(){const _0x21199d=_0x115d40;this[_0x21199d(0x19d)]();if(typeof PIXI[_0x21199d(0x2b0)]!=_0x21199d(0x273)){PIXI[_0x21199d(0x2b0)][_0x21199d(0x260)]=0x4e,PIXI['BLEND_MODES'][_0x21199d(0x195)]=0x4d;const _0x5d0c1b=_0x41429b=>{const _0xac9fd0=_0x21199d;_0x41429b[_0xac9fd0(0x203)]&&_0x41429b[_0xac9fd0(0x203)][_0xac9fd0(0x258)]&&_0x41429b[_0xac9fd0(0x203)][_0xac9fd0(0x258)][_0xac9fd0(0x196)]&&_0x41429b[_0xac9fd0(0x203)][_0xac9fd0(0x258)][_0xac9fd0(0x196)][_0xac9fd0(0x289)]?(_0x41429b['app']['renderer'][_0xac9fd0(0x196)]['blendModes'][PIXI[_0xac9fd0(0x2b0)]['DAE_LIGHT']]=[gl[_0xac9fd0(0x269)],gl[_0xac9fd0(0x2b2)]],_0x41429b[_0xac9fd0(0x203)]['renderer'][_0xac9fd0(0x196)][_0xac9fd0(0x289)][PIXI[_0xac9fd0(0x2b0)][_0xac9fd0(0x260)]]=[gl[_0xac9fd0(0x241)],gl[_0xac9fd0(0x295)]]):setTimeout(_0x5d0c1b,0x64,_0x41429b);};_0x5d0c1b(this);}else throw new PixiOutOfDateError();;};var _Scene_Map_updateMain=Scene_Map[_0x115d40(0x2bd)][_0x115d40(0x23f)];Scene_Map['prototype'][_0x115d40(0x23f)]=function(){const _0x5afe51=_0x115d40;$lightSys['update'](),_Scene_Map_updateMain[_0x5afe51(0x1f2)](this);},Scene_Map[_0x115d40(0x2bd)]['dae_createDisplayObjects']=Scene_Map[_0x115d40(0x2bd)]['createDisplayObjects'],Scene_Map[_0x115d40(0x2bd)][_0x115d40(0x256)]=function(){const _0x218296=_0x115d40;this[_0x218296(0x1a6)](),this[_0x218296(0x1cf)]();},Scene_Map[_0x115d40(0x2bd)][_0x115d40(0x1cf)]=function(){const _0x49408b=_0x115d40;this[_0x49408b(0x1d1)]=new Display_Lights(this);};const _Game_Map_setup=Game_Map[_0x115d40(0x2bd)][_0x115d40(0x25e)];Game_Map['prototype']['setup']=function(_0x4bc092){const _0x5ad6e1=_0x115d40;$lightSys[_0x5ad6e1(0x29f)](),_Game_Map_setup[_0x5ad6e1(0x1f2)](this,_0x4bc092),this[_0x5ad6e1(0x2ba)](),this[_0x5ad6e1(0x26f)]();},Game_Map['prototype'][_0x115d40(0x2ba)]=function(){const _0x54ccdb=_0x115d40;var _0x52f59b=$dataMap[_0x54ccdb(0x1e2)];_0x52f59b[_0x54ccdb(0x1f7)](/[\r\n]+/)['forEach'](_0x549355=>{const _0xb2420f=_0x54ccdb;if(_0x549355[_0xb2420f(0x2a1)](/<dae_light\s*off>/i)){$lightSys[_0xb2420f(0x208)]=![];return;}_0x549355[_0xb2420f(0x2a1)](/<dae_light\s*shadowpicture\s*([\w_\d]+)>/i)&&$lightSys[_0xb2420f(0x1b4)](RegExp['$1']);},this);},Game_Map[_0x115d40(0x2bd)][_0x115d40(0x26f)]=function(){const _0x557046=_0x115d40;var _0x3d50ba=this['width'](),_0x1f0e01=this[_0x557046(0x253)]();for(var _0x3d1b48=0x0;_0x3d1b48<_0x3d50ba;_0x3d1b48++){for(var _0x2b2403=0x0;_0x2b2403<_0x1f0e01;_0x2b2403++){const _0x13b1f3=this[_0x557046(0x2c4)](_0x3d1b48,_0x2b2403);if(_0x13b1f3){if(_[_0x557046(0x1be)]['has'](_0x13b1f3))$lightSys['addMapLight'](_0x3d1b48,_0x2b2403,_[_0x557046(0x1be)][_0x557046(0x233)](_0x13b1f3));if(_[_0x557046(0x29b)][_0x557046(0x1cd)](_0x13b1f3))$lightSys[_0x557046(0x293)](_0x3d1b48,_0x2b2403,_[_0x557046(0x29b)][_0x557046(0x233)](_0x13b1f3));}const _0x145916=this[_0x557046(0x2a3)](_0x3d1b48,_0x2b2403);if(_0x145916){if(_['TERRAIN_LIGHTS']['has'](_0x145916))$lightSys[_0x557046(0x249)](_0x3d1b48,_0x2b2403,_[_0x557046(0x194)][_0x557046(0x233)](_0x145916));if(_[_0x557046(0x200)][_0x557046(0x1cd)](_0x145916))$lightSys[_0x557046(0x293)](_0x3d1b48,_0x2b2403,_[_0x557046(0x200)]['get'](_0x145916));}};};},Game_Event[_0x115d40(0x2bd)][_0x115d40(0x1a4)]=Game_Event[_0x115d40(0x2bd)][_0x115d40(0x198)],Game_Event[_0x115d40(0x2bd)]['setupPage']=function(){const _0x36f2ad=_0x115d40;this['_pageLights']&&this[_0x36f2ad(0x277)][_0x36f2ad(0x1fc)](_0x265a97=>{const _0x239e33=_0x36f2ad;$lightSys[_0x239e33(0x265)](_0x265a97);});this['_pageLights']=[],this[_0x36f2ad(0x1a4)]();if(this[_0x36f2ad(0x1a2)]<0x0||!$lightSys)return;let _0x5c4937=this[_0x36f2ad(0x272)](),_0x2e9476=_0x5c4937[_0x36f2ad(0x1eb)];if(_0x2e9476)for(var _0x2542f4=0x0;_0x2542f4<_0x2e9476['length'];_0x2542f4++){if(_0x2e9476[_0x2542f4]&&(_0x2e9476[_0x2542f4]['code']==0x6c||_0x2e9476[_0x2542f4]['code']==0x198)){var _0x4df3fc=_0x2e9476[_0x2542f4][_0x36f2ad(0x215)][0x0],_0x1d93e1;if(_0x1d93e1=_0x4df3fc[_0x36f2ad(0x2a1)](_[_0x36f2ad(0x2a6)]))this[_0x36f2ad(0x226)](_0x1d93e1);}}},Game_Event[_0x115d40(0x2bd)]['checkComment']=function(_0x5a53cc){const _0x55450e=_0x115d40;let _0x5b9d81=_0x5a53cc[0x2];if(_0x5b9d81==_0x55450e(0x1ce))_0x5b9d81=null;let _0x4eb5dd;switch(_0x5a53cc[0x1]['toLowerCase']()){case _0x55450e(0x276):var _0x4c1b17=_0x5a53cc[0x3];_0x4eb5dd=new Sprite_Light(this,_0x5b9d81,_0x4c1b17);let _0x14ab87=$lightSys['addLight'](_0x4eb5dd,_0x5b9d81);this['_pageLights'][_0x55450e(0x26b)](_0x14ab87);break;case _0x55450e(0x240):let _0x31ae7a=Number(_0x5a53cc[0x3]),_0x315c3d=Number(_0x5a53cc[0x4]);_0x4eb5dd=$lightSys[_0x55450e(0x24a)](_0x5b9d81,!![]);if(_0x4eb5dd)_0x4eb5dd[_0x55450e(0x19a)](_0x31ae7a,_0x315c3d);break;case _0x55450e(0x1e5):let _0x440c7f={'R':_0x5a53cc[0x3],'G':_0x5a53cc[0x4],'B':_0x5a53cc[0x5]};_0x4eb5dd=$lightSys[_0x55450e(0x24a)](_0x5b9d81,!![]);if(_0x4eb5dd)_0x4eb5dd['setColors'](_0x440c7f);break;case _0x55450e(0x26e):const _0x35a18f=Number(_0x5a53cc[0x3]);_0x4eb5dd=$lightSys[_0x55450e(0x24a)](_0x5b9d81,!![]);if(_0x4eb5dd)_0x4eb5dd[_0x55450e(0x1e8)](_0x35a18f);break;case _0x55450e(0x28e):let _0x169fb1=Number(_0x5a53cc[0x3]);_0x4eb5dd=$lightSys[_0x55450e(0x24a)](_0x5b9d81,!![]);if(_0x4eb5dd)_0x4eb5dd[_0x55450e(0x1bd)](_0x169fb1);break;case _0x55450e(0x2c0):let _0x1968b4=Number(_0x5a53cc[0x3]);_0x4eb5dd=$lightSys[_0x55450e(0x24a)](_0x5b9d81,!![]);if(_0x4eb5dd)_0x4eb5dd[_0x55450e(0x2a5)](_0x4eb5dd[_0x55450e(0x24b)],_0x1968b4);break;case'setrotation/f':let _0x45b015=Number(_0x5a53cc[0x3]);_0x4eb5dd=$lightSys['getLight'](_0x5b9d81,!![]);if(_0x4eb5dd)_0x4eb5dd[_0x55450e(0x219)]=_0x45b015;break;}},Game_CharacterBase['prototype'][_0x115d40(0x1ac)]=function(_0x210b10){const _0xb124ab=_0x115d40;if(!this[_0xb124ab(0x27c)])this[_0xb124ab(0x27c)]=[];this['dae_lights']['push'](_0x210b10);};const _Game_CharacterBase_setDirection=Game_CharacterBase['prototype']['setDirection'];Game_CharacterBase[_0x115d40(0x2bd)][_0x115d40(0x26a)]=function(_0x2ab9d5){const _0x26553c=_0x115d40;_Game_CharacterBase_setDirection['call'](this,_0x2ab9d5);if(!this[_0x26553c(0x27c)])return;const _0x187be6=this['dae_getRotation']();this[_0x26553c(0x27c)]['forEach'](_0x427938=>{const _0x5b8d3e=_0x26553c;if(_0x427938['autoRotate'])_0x427938['setRotationOrigin'](_0x187be6);if(!_0x427938[_0x5b8d3e(0x19f)]){const _0x254a95=_0x427938['dirOffsets'][this['direction']()];_0x427938[_0x5b8d3e(0x19a)](_0x254a95['x'],_0x254a95['y']);}});},Game_CharacterBase[_0x115d40(0x2bd)]['dae_getRotation']=function(){const _0x498000=_0x115d40;switch(this[_0x498000(0x1fa)]()){case 0x2:return 0x10e;case 0x4:return 0xb4;case 0x6:return 0x0;case 0x8:return 0x5a;}return 0x0;};function System_Lights(){const _0x2eea2b=_0x115d40;this['initialize'][_0x2eea2b(0x2c7)](this,arguments);};System_Lights[_0x115d40(0x2bd)][_0x115d40(0x2be)]=function(){const _0x393bf5=_0x115d40;this['_nextID']=0x0,this[_0x393bf5(0x262)]=new Map(),this[_0x393bf5(0x299)]=new Map(),this['lights']=new Map(),this[_0x393bf5(0x228)]=[],this[_0x393bf5(0x2a2)]=[],this[_0x393bf5(0x1aa)]=new Sprite_ShadowMap(),this['display']=null,this['turnedOn']=!![],this[_0x393bf5(0x298)]({'R':0x14,'G':0x14,'B':0x14});},System_Lights['prototype'][_0x115d40(0x298)]=function(_0x57c036){const _0x5220c9=_0x115d40;this[_0x5220c9(0x1f5)]=_0x57c036;if(this[_0x5220c9(0x20e)])this[_0x5220c9(0x20e)]['setAmbientLight'](_0x57c036);},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x29f)]=function(){const _0x2ce6f2=_0x115d40;this[_0x2ce6f2(0x262)]['clear'](),this[_0x2ce6f2(0x299)][_0x2ce6f2(0x202)](),this['lights']['clear'](),this['mapLights']=[],this[_0x2ce6f2(0x2a2)]=[],this['shadowMap']=new Sprite_ShadowMap(),this['display']=null,this['turnedOn']=!![];},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x1d8)]=function(){const _0x44c06a=_0x115d40;if(!this['turnedOn'])return;if(!this['display'])return;this[_0x44c06a(0x1aa)]['update']();for(let [_0x3d7f74,_0x4350d8]of this[_0x44c06a(0x2c9)])_0x4350d8['update']();for(let _0x151c1d of this[_0x44c06a(0x228)])_0x151c1d[_0x44c06a(0x1d8)]();this[_0x44c06a(0x20e)][_0x44c06a(0x1d8)]();},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x1ac)]=function(_0x2df047,_0xa754fa=null){const _0x1eb17e=_0x115d40;let _0x454bc6=++this[_0x1eb17e(0x2b3)];this[_0x1eb17e(0x2c9)][_0x1eb17e(0x1a0)](_0x454bc6,_0x2df047);if(_0xa754fa)this[_0x1eb17e(0x225)](_0xa754fa,_0x454bc6);return this['addLightToDisplay'](_0x2df047),_0x454bc6;},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x21f)]=function(_0x1dbc44){const _0x4dfe20=_0x115d40;if(this[_0x4dfe20(0x20e)])this[_0x4dfe20(0x20e)][_0x4dfe20(0x1ac)](_0x1dbc44);else this[_0x4dfe20(0x2a2)][_0x4dfe20(0x26b)](_0x1dbc44);},System_Lights[_0x115d40(0x2bd)]['reloadLights']=function(){const _0x2f5a8c=_0x115d40;if(!this[_0x2f5a8c(0x20e)])return;for(let [_0x2b5e4b,_0x9732c8]of this[_0x2f5a8c(0x2c9)])this[_0x2f5a8c(0x21f)](_0x9732c8);for(let _0x36fdf0 of this[_0x2f5a8c(0x228)])this[_0x2f5a8c(0x21f)](_0x36fdf0);},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x225)]=function(_0xbf20c9,_0x475077){const _0x541d34=_0x115d40;this['uniqueLights'][_0x541d34(0x1a0)](_0xbf20c9,_0x475077),this['uniqueLightsReverseMap'][_0x541d34(0x1a0)](_0x475077,_0xbf20c9);},System_Lights['prototype'][_0x115d40(0x294)]=function(_0x4baa47=null,_0x52fbb7=null){const _0x24efc5=_0x115d40;if(!_0x4baa47&&!_0x52fbb7)console[_0x24efc5(0x235)](_0x24efc5(0x26d));if(!_0x4baa47){if(!this[_0x24efc5(0x299)]['has'](_0x52fbb7))return;_0x4baa47=this[_0x24efc5(0x299)][_0x24efc5(0x233)](_0x52fbb7);}!_0x52fbb7&&(_0x52fbb7=this[_0x24efc5(0x262)]['get'](_0x4baa47)),this[_0x24efc5(0x262)][_0x24efc5(0x2b8)](_0x4baa47),this[_0x24efc5(0x299)]['delete'](_0x52fbb7);},System_Lights['prototype']['deleteLight']=function(_0x51cf70,_0x2910b5=![]){const _0xed9ece=_0x115d40;if(_0x2910b5){let _0x3743cb=_0x51cf70;_0x51cf70=this[_0xed9ece(0x262)][_0xed9ece(0x233)](_0x3743cb),this['deleteUniqueLight'](_0x3743cb,_0x51cf70);}else this[_0xed9ece(0x294)](null,_0x51cf70);if(!this[_0xed9ece(0x2c9)][_0xed9ece(0x1cd)](_0x51cf70))return;let _0x2c8168=this[_0xed9ece(0x2c9)][_0xed9ece(0x233)](_0x51cf70);this[_0xed9ece(0x20e)][_0xed9ece(0x2b6)](_0x2c8168),this[_0xed9ece(0x2c9)][_0xed9ece(0x2b8)](_0x51cf70);},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x24a)]=function(_0x278800,_0x3e97e8=![]){const _0x185548=_0x115d40;if(_0x3e97e8)_0x278800=this[_0x185548(0x262)][_0x185548(0x233)](_0x278800);if(this[_0x185548(0x2c9)]['has'](_0x278800))return this[_0x185548(0x2c9)][_0x185548(0x233)](_0x278800);return null;},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x1d7)]=function(){const _0x6b96af=_0x115d40;let _0x4009af=this[_0x6b96af(0x2a2)][_0x6b96af(0x1bf)]();return this['pendingLights']=[],_0x4009af;},System_Lights['prototype']['addMapLight']=function(_0x104a26,_0x431282,_0x5eb421){const _0x30f33f=_0x115d40,_0x17fff0=new Sprite_MapLight(_0x104a26,_0x431282,_0x5eb421);this[_0x30f33f(0x228)]['push'](_0x17fff0),this[_0x30f33f(0x21f)](_0x17fff0);},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x293)]=function(_0x292c8d,_0x1b2b43,_0x583d04){const _0x4dba8c=_0x115d40,_0x33da1c=_0x583d04[_0x4dba8c(0x268)],_0x1ee104=[_0x583d04[_0x4dba8c(0x1ae)]];_0x1ee104['forEach'](_0x4aabae=>{const _0x2e0c9a=_0x4dba8c;this[_0x2e0c9a(0x1aa)][_0x2e0c9a(0x1fb)](_0x292c8d,_0x1b2b43,_0x33da1c,_0x4aabae);},this);},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x1b4)]=function(_0x4d7e55){const _0x4956bc=_0x115d40;this[_0x4956bc(0x1aa)][_0x4956bc(0x1b4)](_0x4d7e55);},System_Lights[_0x115d40(0x2bd)][_0x115d40(0x244)]=function(_0x51c641){const _0x4ac43b=_0x115d40;if(_0x51c641[_0x4ac43b(0x1fd)])return _0x51c641[_0x4ac43b(0x1fd)];const _0x17e2af=new PIXI[(_0x4ac43b(0x1cb))][(_0x4ac43b(0x209))](_0x51c641[_0x4ac43b(0x1b8)]);return _0x51c641['texture']=_0x17e2af,_0x17e2af;},System_Lights[_0x115d40(0x2bd)]['getLightAnimationTexture']=function(_0x465d75){const _0x387373=_0x115d40;if(_0x465d75[_0x387373(0x1fd)])return _0x465d75[_0x387373(0x1fd)];const _0x50cf00=new PIXI['Texture']['from'](_0x465d75[_0x387373(0x1b8)]);return _0x465d75['texture']=_0x50cf00,_0x50cf00;},_[_0x115d40(0x287)]=System_Lights;function Display_Lights(){const _0x410e08=_0x115d40;this[_0x410e08(0x2be)][_0x410e08(0x2c7)](this,arguments);};Display_Lights[_0x115d40(0x2bd)][_0x115d40(0x2be)]=function(_0x3c23f4){const _0x4928d7=_0x115d40;if(!$lightSys[_0x4928d7(0x208)])return;$lightSys[_0x4928d7(0x20e)]=this,this['_scene']=_0x3c23f4,this[_0x4928d7(0x266)]=new Filter_MapLighting(),this['_lightsContainer']=new Container_Lights(),this[_0x4928d7(0x232)]=new PIXI[(_0x4928d7(0x2a4))][(_0x4928d7(0x221))](Graphics['width'],Graphics[_0x4928d7(0x253)]),this[_0x4928d7(0x212)]=new PIXI[(_0x4928d7(0x1ca))](this[_0x4928d7(0x232)]),this[_0x4928d7(0x212)][_0x4928d7(0x23c)]=[this['_filter']];if(this['_scene']['_spriteset'])this[_0x4928d7(0x2bf)]['_spriteset']['addChild'](this[_0x4928d7(0x212)]);$lightSys[_0x4928d7(0x28c)]();var _0x4202bf=$lightSys[_0x4928d7(0x1d7)]();_0x4202bf&&_0x4202bf[_0x4928d7(0x1fc)](_0x4724c7=>{const _0x249fe5=_0x4928d7;this[_0x249fe5(0x1ac)](_0x4724c7);}),this['setAmbientLight']($lightSys['ambientLight']);},Display_Lights[_0x115d40(0x2bd)][_0x115d40(0x298)]=function(_0x1789da){const _0x419065=_0x115d40;this[_0x419065(0x266)][_0x419065(0x288)][_0x419065(0x1b3)]=[_0x1789da['R']/0xff,_0x1789da['G']/0xff,_0x1789da['B']/0xff,0x1];},Display_Lights[_0x115d40(0x2bd)][_0x115d40(0x1d8)]=function(){const _0xfa2784=_0x115d40;if(!this[_0xfa2784(0x2bf)])return;Graphics[_0xfa2784(0x203)][_0xfa2784(0x258)][_0xfa2784(0x217)](this[_0xfa2784(0x1ee)],this['_lightMapTexture']);},Display_Lights[_0x115d40(0x2bd)][_0x115d40(0x1ac)]=function(_0xea8975){this['_lightsContainer']['addChild'](_0xea8975);},Display_Lights['prototype'][_0x115d40(0x2b6)]=function(_0x3972d0){const _0x2824e4=_0x115d40;this[_0x2824e4(0x1ee)]['removeChild'](_0x3972d0);};function Container_Lights(){this['initialize']['apply'](this,arguments);}Container_Lights[_0x115d40(0x2bd)]=Object[_0x115d40(0x221)](PIXI['Container'][_0x115d40(0x2bd)]),Container_Lights[_0x115d40(0x2bd)]['constructor']=Container_Lights,Container_Lights[_0x115d40(0x2bd)][_0x115d40(0x2be)]=function(){const _0x41eb05=_0x115d40;PIXI[_0x41eb05(0x1d4)][_0x41eb05(0x1f2)](this),this[_0x41eb05(0x230)]=PIXI[_0x41eb05(0x2b0)][_0x41eb05(0x195)],this[_0x41eb05(0x23c)]=[new Filter_LightsContainer()];},Container_Lights[_0x115d40(0x2bd)][_0x115d40(0x1ac)]=function(_0x805cb){const _0x4ce5f2=_0x115d40;this[_0x4ce5f2(0x23d)](_0x805cb);};function Sprite_ShadowMap(){const _0x2d56a0=_0x115d40;this[_0x2d56a0(0x2be)][_0x2d56a0(0x2c7)](this,arguments);}Sprite_ShadowMap['prototype']=Object[_0x115d40(0x221)](PIXI[_0x115d40(0x1ca)][_0x115d40(0x2bd)]),Sprite_ShadowMap[_0x115d40(0x2bd)]['constructor']=Sprite_ShadowMap,Sprite_ShadowMap[_0x115d40(0x2bd)][_0x115d40(0x2be)]=function(){const _0x1740e9=_0x115d40;var _0x2b70be=new PIXI['RenderTexture']['create'](0x22*0x30,0x27*0x30);PIXI[_0x1740e9(0x1ca)][_0x1740e9(0x1f2)](this,_0x2b70be),this[_0x1740e9(0x292)]=_0x2b70be,this[_0x1740e9(0x1d5)]=[],this[_0x1740e9(0x275)]=new PIXI[(_0x1740e9(0x1d4))](),this[_0x1740e9(0x2ac)]=new PIXI[(_0x1740e9(0x1f4))](),this[_0x1740e9(0x1b5)](this[_0x1740e9(0x2ac)]);var _0x34619e=new PIXI['Graphics']();_0x34619e['beginFill'](0x0),this[_0x1740e9(0x1b5)](_0x34619e);},Sprite_ShadowMap[_0x115d40(0x2bd)][_0x115d40(0x1fb)]=function(_0xb16871,_0x59a7d7,_0x23eefe,_0xdc8470){const _0x4d5c32=_0x115d40;this[_0x4d5c32(0x2ac)][_0x4d5c32(0x1cc)](0x0);switch(_0x23eefe){case _0x4d5c32(0x20f):this['_mapGraphics'][_0x4d5c32(0x21a)](_0xb16871*0x30+_0xdc8470[0x0],_0x59a7d7*0x30+_0xdc8470[0x1],_0xdc8470[0x2],_0xdc8470[0x3]);break;case _0x4d5c32(0x28f):this['_mapGraphics'][_0x4d5c32(0x1da)](_0xb16871*0x30+_0xdc8470[0x0],_0x59a7d7*0x30+_0xdc8470[0x1],_0xdc8470[0x2],_0xdc8470[0x3],_0xdc8470[0x4]);break;case _0x4d5c32(0x1db):this[_0x4d5c32(0x2ac)]['drawCircle'](_0xb16871*0x30+_0xdc8470[0x0],_0x59a7d7*0x30+_0xdc8470[0x1],_0xdc8470[0x2]);break;case _0x4d5c32(0x2b9):this[_0x4d5c32(0x2ac)][_0x4d5c32(0x259)](_0xb16871*0x30+_0xdc8470[0x0],_0x59a7d7*0x30+_0xdc8470[0x1],_0xdc8470[0x2],_0xdc8470[0x3]);break;case'polygon':const _0x35f6c9=[];if(_0xdc8470[_0x4d5c32(0x283)]%0x2==0x1)return;for(let _0x3b865a=0x0;_0x3b865a<_0xdc8470['length'];_0x3b865a+=0x2){_0x35f6c9[_0x4d5c32(0x26b)](_0xdc8470[_0x3b865a]+_0xb16871*0x30,_0xdc8470[_0x3b865a+0x1]+_0x59a7d7*0x30);}this[_0x4d5c32(0x2ac)]['drawPolygon'](_0x35f6c9);break;}this[_0x4d5c32(0x2ac)]['endFill']();},Sprite_ShadowMap[_0x115d40(0x2bd)]['addShadow']=function(_0x49df53){const _0x385392=_0x115d40;this[_0x385392(0x1d5)][_0x385392(0x26b)](_0x49df53),this[_0x385392(0x275)][_0x385392(0x23d)](_0x49df53);},Sprite_ShadowMap[_0x115d40(0x2bd)][_0x115d40(0x1d8)]=function(){const _0xc931d8=_0x115d40;Graphics[_0xc931d8(0x203)][_0xc931d8(0x258)][_0xc931d8(0x217)](this['_shadowsContainer'],this[_0xc931d8(0x292)]);},Sprite_ShadowMap[_0x115d40(0x2bd)][_0x115d40(0x1b4)]=function(_0x489b54){const _0x3ffa44=_0x115d40;this[_0x3ffa44(0x229)]=new PIXI[(_0x3ffa44(0x1ca))][(_0x3ffa44(0x209))](_0x3ffa44(0x26c)+_0x489b54+'.png'),this['addShadow'](this[_0x3ffa44(0x229)]);};function Sprite_Light(){const _0x15dacb=_0x115d40;this[_0x15dacb(0x2be)]['apply'](this,arguments);}Sprite_Light[_0x115d40(0x2bd)]=Object['create'](PIXI[_0x115d40(0x1ca)]['prototype']),Sprite_Light['prototype'][_0x115d40(0x1ff)]=Sprite_Light,Sprite_Light[_0x115d40(0x2bd)]['initialize']=function(_0x4ab6ff,_0x260590,_0x1d3c36){const _0x2afb45=_0x115d40;var _0x23ca3c=new PIXI[(_0x2afb45(0x2a4))][(_0x2afb45(0x221))](0x80,0x80);PIXI[_0x2afb45(0x1ca)][_0x2afb45(0x1f2)](this,_0x23ca3c),this['_renderTexture']=_0x23ca3c,this[_0x2afb45(0x19c)]=new PIXI['RenderTexture']['create'](0x80,0x80),this[_0x2afb45(0x211)]=_0x260590,this[_0x2afb45(0x271)]=_0x1d3c36,this[_0x2afb45(0x1b9)]=_0x4ab6ff;this['lightParent']&&this[_0x2afb45(0x1b9)]['addLight'](this);;this[_0x2afb45(0x2c6)]=new PIXI['Point'](0x0,0x0),this[_0x2afb45(0x205)]=new PIXI[(_0x2afb45(0x1ed))](0x0,0x0),this['autoOffset']=new PIXI[(_0x2afb45(0x1ed))](0x0,0x0),this[_0x2afb45(0x1dc)]=0x0,this[_0x2afb45(0x243)]=0x168,this[_0x2afb45(0x219)]=0x0,this[_0x2afb45(0x1c4)]=0x0,this[_0x2afb45(0x263)]=new PIXI[(_0x2afb45(0x1f4))](),this['_raySprite'][_0x2afb45(0x21a)](0x0,0x0,0x20,0x20),this[_0x2afb45(0x263)]['filters']=[new Raytrace_Filter()],this[_0x2afb45(0x261)]=new PIXI[(_0x2afb45(0x1f4))](),this[_0x2afb45(0x261)][_0x2afb45(0x21a)](0x0,0x0,0x100,0x100),this[_0x2afb45(0x261)][_0x2afb45(0x23c)]=[new Light_Filter()],this[_0x2afb45(0x263)]['filters'][0x0][_0x2afb45(0x204)]=this[_0x2afb45(0x261)]['filters'][0x0],this[_0x2afb45(0x280)](!![]),this['setType'](_0x1d3c36),this[_0x2afb45(0x230)]=PIXI['BLEND_MODES'][_0x2afb45(0x264)],this['needsShadowUpdate']=!![],this[_0x2afb45(0x1ea)]=!![],this[_0x2afb45(0x254)]={'x':-0x1,'y':-0x1,'radius':-0x1};},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x280)]=function(_0x5ae6e0){const _0x2dfc5d=_0x115d40;this[_0x2dfc5d(0x1c6)]=_0x5ae6e0,this['_lightSprite'][_0x2dfc5d(0x23c)][0x0][_0x2dfc5d(0x288)][_0x2dfc5d(0x1c6)]=this[_0x2dfc5d(0x1c6)];},Sprite_Light[_0x115d40(0x2bd)]['setAngle']=function(_0x3ff7bd){const _0x59dc6a=_0x115d40;this[_0x59dc6a(0x243)]=_0x3ff7bd,this['refreshAngles']();},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x20c)]=function(_0x54f310){const _0x432548=_0x115d40;this[_0x432548(0x25a)]=_0x54f310,this['calculateRotation']();},Sprite_Light[_0x115d40(0x2bd)]['setRotation']=function(_0x31494f){const _0x3d0491=_0x115d40;this[_0x3d0491(0x1dc)]=_0x31494f,this[_0x3d0491(0x25a)]=_0x31494f,this['deltaRotationTotal']=0x0,this[_0x3d0491(0x1c9)]();},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x1c9)]=function(){const _0x5ee5dc=_0x115d40;this[_0x5ee5dc(0x1dc)]=this[_0x5ee5dc(0x25a)]+this[_0x5ee5dc(0x1c4)];if(this[_0x5ee5dc(0x19f)]){const _0x43b681=this[_0x5ee5dc(0x1dc)]*Math['PI']/0xb4,_0x28410d=-Math[_0x5ee5dc(0x25c)](_0x43b681),_0x555ccc=Math[_0x5ee5dc(0x223)](_0x43b681),_0x3d0381=this[_0x5ee5dc(0x2c6)]['x'],_0x46def7=this[_0x5ee5dc(0x2c6)]['y'];this[_0x5ee5dc(0x205)]['x']=_0x3d0381*_0x555ccc-_0x46def7*_0x28410d,this[_0x5ee5dc(0x205)]['y']=_0x3d0381*_0x28410d+_0x46def7*_0x555ccc;}this[_0x5ee5dc(0x2b7)]();},Sprite_Light['prototype']['refreshAngles']=function(){const _0x1af133=_0x115d40;let _0x15f684=this[_0x1af133(0x243)];this[_0x1af133(0x274)]()&&(_0x15f684=this[_0x1af133(0x214)]);const _0x15b1b5=(this[_0x1af133(0x1dc)]-_0x15f684/0x2+0x168)%0x168,_0x2401c8=(this[_0x1af133(0x1dc)]+_0x15f684/0x2+0x168)%0x168;this[_0x1af133(0x261)][_0x1af133(0x23c)][0x0][_0x1af133(0x288)][_0x1af133(0x28d)]=[_0x15b1b5,_0x2401c8],this[_0x1af133(0x261)][_0x1af133(0x23c)][0x0][_0x1af133(0x288)][_0x1af133(0x2b1)]=this[_0x1af133(0x1dc)],this[_0x1af133(0x1ea)]=!![];},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x1f1)]=function(_0x2c3c7f){const _0x4a9759=_0x115d40;this[_0x4a9759(0x271)]=_0x2c3c7f;if(!_[_0x4a9759(0x236)][_0x4a9759(0x1cd)](_0x2c3c7f)){console['error'](_0x4a9759(0x246)+_0x2c3c7f+_0x4a9759(0x24f));return;}this[_0x4a9759(0x286)]=_[_0x4a9759(0x236)][_0x4a9759(0x233)](_0x2c3c7f),this[_0x4a9759(0x284)](Number(this['lightType']['Radius']||0x0)),this[_0x4a9759(0x206)](this[_0x4a9759(0x286)]['Light\x20Image\x20ID']),this[_0x4a9759(0x19a)](Number(this[_0x4a9759(0x286)][_0x4a9759(0x237)]),Number(this[_0x4a9759(0x286)][_0x4a9759(0x1b2)])),this['variation']=Number(this['lightType'][_0x4a9759(0x22a)]),this[_0x4a9759(0x1e1)]=Number(this[_0x4a9759(0x286)][_0x4a9759(0x1e1)]),this['dirOffsets']=this[_0x4a9759(0x286)]['Custom\x20directional\x20offsets'],this[_0x4a9759(0x270)]=this[_0x4a9759(0x1e1)],this[_0x4a9759(0x24b)]=this[_0x4a9759(0x286)][_0x4a9759(0x22b)],this[_0x4a9759(0x1bd)](Number(this[_0x4a9759(0x286)][_0x4a9759(0x1e4)]||0x168)),this[_0x4a9759(0x1e8)](Number(this[_0x4a9759(0x286)][_0x4a9759(0x1e0)]||0x0)),this[_0x4a9759(0x219)]=Number(this[_0x4a9759(0x286)][_0x4a9759(0x1e7)]||0x0),this[_0x4a9759(0x248)]=Boolean(this[_0x4a9759(0x286)][_0x4a9759(0x1bc)]===_0x4a9759(0x1b7)||![]),this[_0x4a9759(0x19f)]=Boolean(this[_0x4a9759(0x286)]['Auto-rotate\x20Manual-offset']==='true'||![]);if(this[_0x4a9759(0x248)]&&this[_0x4a9759(0x1b9)])this['setRotation'](this[_0x4a9759(0x1b9)][_0x4a9759(0x210)]());if(!this['autoRotateOffset']&&this[_0x4a9759(0x1b9)]){const _0x13db5a=this[_0x4a9759(0x247)][this[_0x4a9759(0x1b9)][_0x4a9759(0x1fa)]()];this['setManualOffset'](_0x13db5a['x'],_0x13db5a['y']);}this['setColors'](),this['refreshDimensions'](),this['customAnim']=this[_0x4a9759(0x286)][_0x4a9759(0x23e)],this[_0x4a9759(0x27d)](),this['setShadowsEnabled'](Boolean(this[_0x4a9759(0x286)][_0x4a9759(0x25f)]==='true'||![]));},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x27d)]=function(){const _0x2af33d=_0x115d40;if(!this['hasCustomAnimation']())return;this[_0x2af33d(0x279)]=0x0,this[_0x2af33d(0x25d)]=this['customAnim'][this[_0x2af33d(0x279)]],this['nextCustomAnimFrame']=this[_0x2af33d(0x1ef)][(this[_0x2af33d(0x279)]+0x1)%this['customAnim']['length']];const _0x59fdc6=this[_0x2af33d(0x25d)];this[_0x2af33d(0x1a8)]=0x0,this[_0x2af33d(0x1f9)]=_0x59fdc6[_0x2af33d(0x1e9)],this[_0x2af33d(0x242)]=new PIXI[(_0x2af33d(0x1ed))](_0x59fdc6[_0x2af33d(0x1ba)]['x'],_0x59fdc6[_0x2af33d(0x1ba)]['y']),this['customAnimColor']={'R':_0x59fdc6[_0x2af33d(0x2bb)]['R'],'G':_0x59fdc6['color']['G'],'B':_0x59fdc6[_0x2af33d(0x2bb)]['B']},this[_0x2af33d(0x28b)]=_0x59fdc6[_0x2af33d(0x1e1)],this['customAnimRadius']=_0x59fdc6[_0x2af33d(0x297)],this[_0x2af33d(0x1ad)]=_0x59fdc6[_0x2af33d(0x21c)],this['customAnimAngle']=_0x59fdc6[_0x2af33d(0x201)];},Sprite_Light['prototype'][_0x115d40(0x274)]=function(){const _0x122fe3=_0x115d40;return this[_0x122fe3(0x1ef)]&&this[_0x122fe3(0x1ef)][_0x122fe3(0x283)]>0x0;},Sprite_Light[_0x115d40(0x2bd)]['isWithinScreen']=function(){const _0x148375=_0x115d40,_0x57e616=this['x']-this[_0x148375(0x1c1)]['x'],_0x577204=this['y']-this['autoOffset']['y'];return _0x57e616+this['radius']*0x2>=0x0&&_0x57e616-this[_0x148375(0x297)]<=Graphics['width']&&(_0x577204+this[_0x148375(0x297)]>=0x0&&_0x577204-this[_0x148375(0x297)]<=Graphics['height']);},Sprite_Light['prototype'][_0x115d40(0x284)]=function(_0x23e184){const _0x379831=_0x115d40;if(this[_0x379831(0x297)]==_0x23e184)return;this[_0x379831(0x297)]=_0x23e184||this['radius'],this[_0x379831(0x291)]();},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x206)]=function(_0x12f9fa){const _0x211e76=_0x115d40;if(!_0x12f9fa)return;!_['LIGHT_IMAGES'][_0x211e76(0x1cd)](_0x12f9fa)&&!_[_0x211e76(0x1bb)][_0x211e76(0x1cd)](_0x12f9fa)&&(console[_0x211e76(0x235)]('Light\x20image\x20\x27'+_0x12f9fa+_0x211e76(0x24f)),_0x12f9fa=_0x211e76(0x216));if(!_[_0x211e76(0x1d9)][_0x211e76(0x1cd)](_0x12f9fa)){this[_0x211e76(0x27f)](_0x12f9fa);return;};const _0xee071c=_[_0x211e76(0x1d9)][_0x211e76(0x233)](_0x12f9fa);this[_0x211e76(0x1d2)]=_0x12f9fa,this[_0x211e76(0x1c3)]=_0xee071c;const _0x1421b8=$lightSys['getLightImageTexture'](_0xee071c);_0xee071c[_0x211e76(0x2ae)]>0x0&&_0xee071c[_0x211e76(0x253)]>0x0&&(this[_0x211e76(0x261)][_0x211e76(0x23c)][0x0][_0x211e76(0x288)]['in_LightImagePos']=[0x0,0x0],this[_0x211e76(0x261)][_0x211e76(0x23c)][0x0]['uniforms'][_0x211e76(0x1de)]=[0x1,0x1]),this[_0x211e76(0x261)][_0x211e76(0x23c)][0x0][_0x211e76(0x288)][_0x211e76(0x29c)]=_0x1421b8,this[_0x211e76(0x1ea)]=!![];},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x27f)]=function(_0x549918){const _0x191450=_0x115d40;!_[_0x191450(0x1bb)][_0x191450(0x1cd)](_0x549918)&&(console[_0x191450(0x235)](_0x191450(0x238)+_0x549918+_0x191450(0x24f)),_0x549918=_0x191450(0x216));const _0x252588=_[_0x191450(0x1bb)]['get'](_0x549918);this[_0x191450(0x1d6)]=_0x549918,this[_0x191450(0x207)]=_0x252588,this['animationFrame']=0x0,this[_0x191450(0x234)]=0x5;const _0x13e33b=$lightSys['getLightAnimationTexture'](_0x252588);this['setAnimationFrame'](),this[_0x191450(0x261)][_0x191450(0x23c)][0x0][_0x191450(0x288)][_0x191450(0x29c)]=_0x13e33b;},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x267)]=function(){const _0x2daab7=_0x115d40;if(!this[_0x2daab7(0x207)])return;const _0x1a4459=this[_0x2daab7(0x207)],_0x313665=this[_0x2daab7(0x207)][_0x2daab7(0x2a7)][this[_0x2daab7(0x1c8)]];_0x313665[_0x2daab7(0x2ae)]>0x0&&_0x313665[_0x2daab7(0x253)]>0x0&&(this[_0x2daab7(0x261)][_0x2daab7(0x23c)][0x0][_0x2daab7(0x288)][_0x2daab7(0x252)]=[_0x313665['x']/_0x1a4459['width'],_0x313665['y']/_0x1a4459['height']],this[_0x2daab7(0x261)]['filters'][0x0][_0x2daab7(0x288)][_0x2daab7(0x1de)]=[_0x313665[_0x2daab7(0x2ae)]/_0x1a4459[_0x2daab7(0x2ae)],_0x313665[_0x2daab7(0x253)]/_0x1a4459[_0x2daab7(0x253)]]),this['needsUpdate']=!![];},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x2a5)]=function(_0x1ee7b7=this['colors'],_0x1824e3=this[_0x115d40(0x1e1)]){const _0x22156f=_0x115d40;this[_0x22156f(0x24b)]=_0x1ee7b7||this[_0x22156f(0x24b)],this['intensity']=_0x1824e3||this['intensity'],this[_0x22156f(0x270)]=this[_0x22156f(0x1e1)],this[_0x22156f(0x199)]();},Sprite_Light[_0x115d40(0x2bd)]['setManualOffset']=function(_0x26b597,_0x484f99){const _0x583fbd=_0x115d40;this[_0x583fbd(0x205)]['set'](_0x26b597,_0x484f99),this['og_manualOffset']=this['manualOffset'][_0x583fbd(0x1bf)]();},Sprite_Light[_0x115d40(0x2bd)]['refreshColors']=function(){const _0x4c9351=_0x115d40;let _0x10edd2=this['colors'],_0xb49a3f=this['intensity']/0xc8;this['hasCustomAnimation']()&&(_0x10edd2=this[_0x4c9351(0x22f)]);let _0x3b57ed=Number(_0x10edd2['R']),_0x30cdc0=Number(_0x10edd2['G']),_0x5c2014=Number(_0x10edd2['B']);_0x3b57ed/=0xff,_0x30cdc0/=0xff,_0x5c2014/=0xff,(_0x3b57ed*=_0xb49a3f,_0x30cdc0*=_0xb49a3f,_0x5c2014*=_0xb49a3f),this[_0x4c9351(0x261)]['filters'][0x0][_0x4c9351(0x288)][_0x4c9351(0x1d3)]=[_0x3b57ed,_0x30cdc0,_0x5c2014],this[_0x4c9351(0x1ea)]=!![];},Sprite_Light['prototype'][_0x115d40(0x2ab)]=function(){const _0xad5a0f=_0x115d40;var _0x2a1ccc=this[_0xad5a0f(0x297)]-0x18;this['autoOffset'][_0xad5a0f(0x1a0)](-_0x2a1ccc,-_0x2a1ccc);},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x291)]=function(){const _0x46ef0b=_0x115d40;var _0x29d2e1=this['radius'];let _0x21723b=Math[_0x46ef0b(0x1f6)](0x2,Math[_0x46ef0b(0x1df)](Math[_0x46ef0b(0x28a)](Math[_0x46ef0b(0x2a0)](0x2*Math['PI']*_0x29d2e1)))+0x1);this[_0x46ef0b(0x263)][_0x46ef0b(0x202)](),this['_raySprite'][_0x46ef0b(0x21a)](0x0,0x0,_0x21723b,_0x21723b);let _0x5a1af9=Math[_0x46ef0b(0x1f6)](0x2,Math[_0x46ef0b(0x1df)](Math[_0x46ef0b(0x28a)](_0x29d2e1*0x2)));this[_0x46ef0b(0x261)][_0x46ef0b(0x202)](),this[_0x46ef0b(0x261)][_0x46ef0b(0x21a)](0x0,0x0,_0x5a1af9,_0x5a1af9),this[_0x46ef0b(0x292)][_0x46ef0b(0x290)](_0x5a1af9,_0x5a1af9),this[_0x46ef0b(0x19c)][_0x46ef0b(0x290)](_0x21723b,_0x21723b),this['_raySprite']['filters'][0x0][_0x46ef0b(0x288)][_0x46ef0b(0x1a5)]=_0x21723b,this['_lightSprite']['filters'][0x0]['uniforms'][_0x46ef0b(0x1a5)]=_0x21723b,this[_0x46ef0b(0x261)][_0x46ef0b(0x23c)][0x0][_0x46ef0b(0x288)]['in_LightTexSize']=_0x5a1af9,this[_0x46ef0b(0x261)][_0x46ef0b(0x23c)][0x0][_0x46ef0b(0x288)][_0x46ef0b(0x1ab)]=[_0x29d2e1,_0x29d2e1],this[_0x46ef0b(0x2ab)](),this[_0x46ef0b(0x1b6)]=!![];},Sprite_Light[_0x115d40(0x2bd)]['refreshIntensity']=function(){const _0x2620a0=_0x115d40;if(!this[_0x2620a0(0x22a)]&&!this[_0x2620a0(0x274)]())return;this[_0x2620a0(0x1e1)]=this[_0x2620a0(0x270)]+Math[_0x2620a0(0x22e)](this['variation']+0x1),this[_0x2620a0(0x274)]()&&(this['intensity']=this[_0x2620a0(0x28b)]),this[_0x2620a0(0x199)]();},Sprite_Light[_0x115d40(0x2bd)]['refreshPosition']=function(){const _0x360f25=_0x115d40;if(!this[_0x360f25(0x1b9)])return;let _0x1bd746=$gameMap[_0x360f25(0x1c0)](this[_0x360f25(0x1b9)]['_realX'])*$gameMap[_0x360f25(0x224)]()+this[_0x360f25(0x1c1)]['x']+this[_0x360f25(0x205)]['x'],_0x1702d5=$gameMap[_0x360f25(0x20b)](this[_0x360f25(0x1b9)][_0x360f25(0x2c5)])*$gameMap[_0x360f25(0x239)]()+this[_0x360f25(0x1c1)]['y']+this[_0x360f25(0x205)]['y'],_0x559386=this[_0x360f25(0x1b9)][_0x360f25(0x2c3)]*$gameMap[_0x360f25(0x224)]()+$gameMap['tileWidth']()/0x2+this[_0x360f25(0x205)]['x'],_0x12f381=this[_0x360f25(0x1b9)][_0x360f25(0x2c5)]*$gameMap[_0x360f25(0x239)]()+$gameMap[_0x360f25(0x239)]()/0x2+this['manualOffset']['y'];this[_0x360f25(0x274)]()&&(_0x1bd746+=this[_0x360f25(0x242)]['x'],_0x1702d5+=this[_0x360f25(0x242)]['y'],_0x559386+=this[_0x360f25(0x242)]['x'],_0x12f381+=this[_0x360f25(0x242)]['y']);if(this['x']!=_0x1bd746||this['y']!=_0x1702d5||(this[_0x360f25(0x254)]['x']!=_0x559386||this[_0x360f25(0x254)]['y']!=_0x12f381||this['in_Light']['radius']!=this[_0x360f25(0x297)])){this['x']=_0x1bd746,this['y']=_0x1702d5;var _0xa974bb=[_0x559386,_0x12f381,this['radius']];this[_0x360f25(0x254)]=_0xa974bb,this['_raySprite']['filters'][0x0][_0x360f25(0x288)][_0x360f25(0x254)]=_0xa974bb,this[_0x360f25(0x261)][_0x360f25(0x23c)][0x0][_0x360f25(0x288)][_0x360f25(0x254)]=_0xa974bb,this[_0x360f25(0x1b6)]=!![];}},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x218)]=function(){const _0xfa73e7=_0x115d40;if(!this[_0xfa73e7(0x219)])return;this[_0xfa73e7(0x1c4)]+=this[_0xfa73e7(0x219)]+0x168,this[_0xfa73e7(0x274)]()&&(this[_0xfa73e7(0x1c4)]=this[_0xfa73e7(0x1ad)]),this[_0xfa73e7(0x1c4)]%=0x168,this[_0xfa73e7(0x1c9)]();},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x21b)]=function(){const _0x4bc9e3=_0x115d40;this[_0x4bc9e3(0x234)]--,this[_0x4bc9e3(0x234)]<=0x0&&(this['animationFrame']=(this[_0x4bc9e3(0x1c8)]+0x1)%this[_0x4bc9e3(0x207)][_0x4bc9e3(0x2a7)][_0x4bc9e3(0x283)],this[_0x4bc9e3(0x234)]=this['animation'][_0x4bc9e3(0x1a3)],this['setAnimationFrame']());},Sprite_Light[_0x115d40(0x2bd)][_0x115d40(0x1b0)]=function(_0x17866e,_0xf36764,_0x3758f8){return _0x17866e+(_0xf36764-_0x17866e)*_0x3758f8;},Sprite_Light['prototype'][_0x115d40(0x23a)]=function(){const _0x138ade=_0x115d40;if(!this['hasCustomAnimation']())return;this[_0x138ade(0x1a8)]++;this[_0x138ade(0x1a8)]>=this['customAnimFramDuration']&&(this[_0x138ade(0x279)]=(this[_0x138ade(0x279)]+0x1)%this[_0x138ade(0x1ef)][_0x138ade(0x283)],this[_0x138ade(0x25d)]=this['customAnim'][this[_0x138ade(0x279)]],this[_0x138ade(0x29d)]=this[_0x138ade(0x1ef)][(this[_0x138ade(0x279)]+0x1)%this[_0x138ade(0x1ef)][_0x138ade(0x283)]],this[_0x138ade(0x1a8)]=0x0,this['customAnimFramDuration']=this[_0x138ade(0x25d)][_0x138ade(0x1e9)]);const _0x59166c=this[_0x138ade(0x1a8)]/this['customAnimFramDuration'];this['customAnimOffset']['x']=this[_0x138ade(0x1b0)](this[_0x138ade(0x25d)][_0x138ade(0x1ba)]['x'],this['nextCustomAnimFrame'][_0x138ade(0x1ba)]['x'],_0x59166c),this[_0x138ade(0x242)]['y']=this[_0x138ade(0x1b0)](this['customAnimFrame'][_0x138ade(0x1ba)]['y'],this[_0x138ade(0x29d)][_0x138ade(0x1ba)]['y'],_0x59166c),this[_0x138ade(0x22f)]['R']=this[_0x138ade(0x1b0)](this[_0x138ade(0x25d)]['color']['R'],this['nextCustomAnimFrame'][_0x138ade(0x2bb)]['R'],_0x59166c),this[_0x138ade(0x22f)]['G']=this['interpolateValue'](this[_0x138ade(0x25d)][_0x138ade(0x2bb)]['G'],this[_0x138ade(0x29d)][_0x138ade(0x2bb)]['G'],_0x59166c),this[_0x138ade(0x22f)]['B']=this['interpolateValue'](this[_0x138ade(0x25d)][_0x138ade(0x2bb)]['B'],this[_0x138ade(0x29d)][_0x138ade(0x2bb)]['B'],_0x59166c),this[_0x138ade(0x28b)]=this[_0x138ade(0x1b0)](this[_0x138ade(0x25d)][_0x138ade(0x1e1)],this['nextCustomAnimFrame']['intensity'],_0x59166c),this['customAnimRadius']=this[_0x138ade(0x1b0)](this[_0x138ade(0x25d)][_0x138ade(0x297)],this['nextCustomAnimFrame'][_0x138ade(0x297)],_0x59166c),this[_0x138ade(0x1ad)]=this[_0x138ade(0x1b0)](this[_0x138ade(0x25d)][_0x138ade(0x21c)],this[_0x138ade(0x29d)][_0x138ade(0x21c)],_0x59166c),this['customAnimAngle']=this[_0x138ade(0x1b0)](this['customAnimFrame'][_0x138ade(0x201)],this['nextCustomAnimFrame'][_0x138ade(0x201)],_0x59166c),this['radius']!=this[_0x138ade(0x21e)]&&this[_0x138ade(0x284)](this[_0x138ade(0x21e)]);},Sprite_Light['prototype'][_0x115d40(0x1d8)]=function(){const _0x9ddb01=_0x115d40;this[_0x9ddb01(0x23a)](),this[_0x9ddb01(0x2c1)](),this[_0x9ddb01(0x251)](),this[_0x9ddb01(0x218)]();if(this[_0x9ddb01(0x207)])this[_0x9ddb01(0x21b)]();if(this['isWithinScreen']()){if(this[_0x9ddb01(0x1c6)]&&this['needsShadowUpdate'])Graphics['app'][_0x9ddb01(0x258)]['render'](this['_raySprite'],this['_rayRenderTexture']);if(this[_0x9ddb01(0x1ea)]||this[_0x9ddb01(0x1b6)])Graphics[_0x9ddb01(0x203)][_0x9ddb01(0x258)][_0x9ddb01(0x217)](this[_0x9ddb01(0x261)],this[_0x9ddb01(0x292)]);this[_0x9ddb01(0x1ea)]=![],this['needsShadowUpdate']=![];}},_['Sprite_Light']=Sprite_Light;function Sprite_MapLight(){const _0x44f825=_0x115d40;this['initialize'][_0x44f825(0x2c7)](this,arguments);}function _0x36ea(){const _0x386368=['LIGHT_TYPES','X\x20offset','Light\x20animation\x20\x27','tileHeight','refreshCustomAnimation','_mapX','filters','addChild','customAnimation','updateMain','setoffset','DST_COLOR','customAnimOffset','lightAngle','getLightImageTexture','Filter_MapLighting','Light\x20type\x20\x27','dirOffsets','autoRotate','addMapLight','getLight','colors','parse','Light\x20types','Shadow\x20geometry\x20type','\x27\x20has\x20not\x20been\x20defined','StateSystem','refreshPosition','in_LightImagePos','height','in_Light','setBlendMode','createDisplayObjects','Rectangle','renderer','drawEllipse','lightRotationOrigin','dae_createGameObjects','sin','customAnimFrame','setup','Cast\x20shadows','DAE_LIGHTING','_lightSprite','uniqueLights','_raySprite','ADD','deleteLight','_filter','setAnimationFrame','type','SRC_ALPHA','setDirection','push','img/shadows/','Unique\x20light\x20does\x20not\x20exist,\x20it\x20cannot\x20be\x20deleted','setrotation','scanRegionIDs','_baseIntensity','lightTypeName','page','undefined','hasCustomAnimation','_shadowsContainer','addlight','_pageLights','Raytrace_Filter','customAnimIndex','966IlRyON','Custom\x20directional\x20offsets','dae_lights','startCustomAnimation','toningFunc','setAnimation','setShadowsEnabled','_mapY','newlight','length','setRadius','30672pcGXmm','lightType','System_Lights','uniforms','blendModes','log2','customAnimIntensity','reloadLights','light_angles','setangle','rounded\x20rectangle','resize','refreshRadius','_renderTexture','addMapShadow','deleteUniqueLight','SRC_COLOR','setRayMap','radius','setAmbientLight','uniqueLightsReverseMap','in_LightTexSize','REGION_SHADOWS','in_LightImage','nextCustomAnimFrame','in_World','clearLights','sqrt','match','pendingLights','terrainTag','RenderTexture','setColors','COMMENT_REG','frames','in_ColorD','Animation\x20ID\x20/\x20Name','Image','refreshDimensions','_mapGraphics','1517310bhlTkh','width','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20in_WorldMap;\x20//\x20The\x20texture\x20of\x20the\x20game\x27s\x20world/collision\x20map.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec3\x20in_Light;\x20//\x20X,\x20Y\x20and\x20Z\x20(radius)\x20of\x20the\x20light\x20that\x20is\x20being\x20ray-traced.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20in_World;\x20//\x20Size\x20of\x20the\x20world/collision\x20texture\x20we\x27re\x20tracing\x20rays\x20against.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20in_RayTexSize;\x20//\x20Size\x20of\x20the\x20texture\x20that\x20the\x20rays\x20are\x20being\x20stored\x20on.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20varying\x20vec2\x20vTextureCoord;\x20//\x20The\x20UV\x20coordinate\x20of\x20the\x20current\x20pixel.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20MAXRADIUS\x20=\x2065535.,\x20//\x20Maximum\x20ray-length\x20of\x202\x20bytes,\x202^16-1.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20TAU\x20=\x206.2831853071795864769252867665590;\x20//\x20TAU\x20or\x202\x20*\x20pi\x20(shortcut\x20for\x20radial.circular\x20math).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Converts\x20the\x20current\x20pixel\x27s\x20coordinate\x20from\x20UV\x20to\x20XY\x20space.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20fullCoord\x20=\x20floor(vTextureCoord\x20*\x20in_RayTexSize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Takes\x20the\x20pixel\x27s\x20XY\x20position,\x20converts\x20it\x20to\x20a\x20vec2(1D-array\x20index,\x20ray\x20count).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20xyRay\x20=\x20vec2((fullCoord.y\x20*\x20in_RayTexSize)\x20+\x20fullCoord.x,\x20TAU\x20*\x20in_Light.z);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Takes\x20the\x20index/ray_count\x20and\x20converts\x20it\x20to\x20an\x20angle\x20in\x20range\x20of:\x200\x20to\x202pi\x20=\x200\x20to\x20ray_count.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20Theta\x20=\x20TAU\x20*\x20(xyRay.x\x20/\x20xyRay.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20lengthdir_xy\x20polar\x20cooridinate\x20around\x20the\x20light\x27s\x20center.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20Delta\x20=\x20vec2(cos(Theta),\x20-sin(Theta));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20\x22Step\x22\x20gets\x20checks\x20whether\x20the\x20current\x20ray\x20index\x20<\x20ray\x20count,\x20if\x20not\x20the\x20ray\x20is\x20not\x20traced\x20(for-loop\x20breaks).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20v\x20=\x20step(xyRay.x,xyRay.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(v\x20>\x200.)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20for(float\x20d\x20=\x200.;\x20d\x20<\x20MAXRADIUS;\x20d++)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/*\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x22in_Light.z\x20<\x20d\x22\x20Check\x20if\x20the\x20current\x20ray\x20distance(length)\x20\x22d\x22\x20is\x20>\x20light\x20radius\x20(if\x20so,\x20then\x20break).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x22d\x20+\x20in_Light.z\x20*\x20texture2D(...)\x22\x20If\x20collision\x20in\x20the\x20world\x20map\x20at\x20distance\x20\x22d\x22\x20is\x20found,\x20the\x20ray\x20ends\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20(add\x20light\x20radius\x20to\x20d\x20to\x20make\x20it\x20greater\x20than\x20the\x20light\x20radius\x20to\x20break\x20out\x20of\x20the\x20for-loop.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20xyRay\x20=\x20Delta\x20*\x20d;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(in_Light.z\x20<\x20d\x20+\x20in_Light.z\x20*\x20texture2D(in_WorldMap,\x20vec2(in_Light.x\x20+\x20xyRay.x,\x20in_Light.y\x20+\x20xyRay.y)\x20*\x20in_World).a)\x20break;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Converts\x20the\x20ray\x20length\x20to\x20polar\x20UV\x20coordinates\x20ray_length\x20/\x20light_radius.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20rayLength\x20=\x20length(xyRay)\x20/\x20in_Light.z;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Takes\x20the\x20length\x20of\x20the\x20current\x20ray\x20and\x20splits\x20it\x20into\x20two\x20bytes\x20and\x20stores\x20it\x20in\x20the\x20texture.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(rayLength,\x20vec3(0.));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(vec2(floor(rayLength\x20*\x20255.0)\x20/\x20255.0,\x20fract(rayLength\x20*\x20255.0)),\x200.0,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(vec2(rayLength,\x200.),\x200.0,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','BLEND_MODES','light_rotation','ONE','_nextID','8OrPBgD','pluginName','removeLight','refreshAngles','delete','ellipse','dae_scanMapNote','color','\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20in_WorldMap,\x20in_RayMap;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec3\x20in_Light,\x20in_ColorS,\x20in_ColorD;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20in_World,\x20in_LightCenter;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20in_RayTexSize,\x20in_LightTexSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20varying\x20vec2\x20vTextureCoord;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20uSampler;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20TAU\x20=\x206.2831853071795864769252867665590;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20PI\x20=\x20TAU/2.;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20light_angles;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20light_rotation;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20in_LightImagePos,\x20in_LightImageSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20in_LightImage;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20bool\x20shadowsEnabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Custom\x20tone\x20map\x20function,\x20adjust\x20as\x20you\x20please,\x20keep\x20in\x20range\x200\x20to\x201.\x0a\x20\x20\x20\x20\x20\x20\x20\x20','prototype','initialize','_scene','setintensity','refreshIntensity','_createAllElements','_realX','regionId','_realY','og_manualOffset','apply','in_RayMap','lights','1XOjTHM','systems','TERRAIN_LIGHTS','DAE_LIGHT','state','setrotation/f','setupPage','refreshColors','setManualOffset','map','_rayRenderTexture','dae_createAllElements','registerCommand','autoRotateOffset','set','Global\x20Light\x20Toning\x20Function','_pageIndex','duration','dae_setupPage','in_RayTexSize','dae_createDisplayObjects','2787575wKuNRP','customAnimTimer','ID\x20/\x20Name','shadowMap','in_LightCenter','addLight','customAnimRotation','values','2529348EUSaeB','interpolateValue','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20varying\x20vec2\x20vTextureCoord;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec4\x20ambient_light;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20uSampler;\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20addColors(vec4\x20color1,\x20vec4\x20color2)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20vec4(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.r\x20*\x20color1.a\x20+\x20color2.r\x20*\x20color2.a),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.g\x20*\x20color1.a\x20+\x20color2.g\x20*\x20color2.a),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.b\x20*\x20color1.a\x20+\x20color2.b\x20*\x20color2.a),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.a\x20+\x20color2.a)\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main(void){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20light\x20=\x20texture2D(uSampler,\x20vTextureCoord);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20light\x20+\x20ambient_light;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20','Y\x20offset','ambient_light','loadShadowMapPicture','addShadow','needsShadowUpdate','true','file','lightParent','offset','LIGHT_ANIMATIONS','Auto-rotate','setAngle','REGION_LIGHTS','clone','adjustX','autoOffset','Animated\x20lights','image','deltaRotationTotal','BaseTexture','shadowsEnabled','Filter','animationFrame','calculateRotation','Sprite','Texture','beginFill','has','null','createLightingFilter','Region\x20ID','_lightDisplay','imageId','in_ColorS','Container','_shadows','animationId','getPendingLights','update','LIGHT_IMAGES','drawRoundedRect','circle','lightRotation','Region\x20lights','in_LightImageSize','ceil','Rotation','intensity','note','Region\x20shadows','Angle','setcolor','img/lights/','Rot/f','setRotation','frameTime','needsUpdate','list','lightID','Point','_lightsContainer','customAnim','3237940iztSfC','setType','call','Values','Graphics','ambientLight','pow','split','Preload\x20on\x20start','customAnimFramDuration','direction','drawMapShadow','forEach','texture','createGameObjects','constructor','TERRAIN_SHADOWS','angle','clear','app','_lightFilter','manualOffset','setImage','animation','turnedOn','from','1744462AkRHdl','adjustY','setRotationOrigin','Width','display','rectangle','dae_getRotation','_uniqueId','_lightMapSprite','Spritesheet\x20image','customAnimAngle','parameters','none','render','refreshRotation','deltaRot','drawRect','refreshAnimation','rotation','.png','customAnimRadius','addLightToDisplay','Light_Filter','create','\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20bool\x20isBetweenAngles(float\x20angle,\x20float\x20start,\x20float\x20end)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20modEnd\x20=\x20mod(end,\x20360.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(start\x20<\x20end)\x20{return\x20(angle\x20>=\x20start\x20&&\x20angle\x20<=\x20end);}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20(angle\x20>=\x20start\x20||\x20angle\x20<=\x20end);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20getRotatedCoord(vec2\x20Coord,\x20float\x20angle)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//vec2\x20mid\x20=\x20vec2(in_LightTexSize\x20/\x202.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20mid\x20=\x20in_LightCenter;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Coord\x20=\x20Coord\x20-\x20mid;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20x\x20=\x20Coord.x,\x20y\x20=\x20Coord.y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20c\x20=\x20cos(angle);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20s\x20=\x20sin(angle);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20vec2\x20(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20x\x20*\x20c\x20-\x20y\x20*\x20s\x20+\x20mid.x,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20x\x20*\x20s\x20+\x20y\x20*\x20c\x20+\x20mid.y\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20getLocalFrame(vec2\x20Coord)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20frameCoord\x20=\x20in_LightImagePos\x20+\x20(Coord\x20/\x20(in_Light.z\x20*\x202.))\x20*\x20in_LightImageSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20frameCoord;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20current\x20pixel\x27s\x20texture\x20XY\x20coordinate\x20from\x20it\x27s\x20texture\x20UV\x20coordinate.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20Coord\x20=\x20vTextureCoord\x20*\x20in_LightTexSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Coord.x\x20>\x20in_LightCenter.x\x20+\x20in_Light.z\x20||\x20Coord.y\x20>\x20in_LightCenter.y\x20+\x20in_Light.z)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(0.0,\x200.0,\x200.0,\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20lengthdir_xy\x20of\x20the\x20current\x20pixel\x20in\x20reference\x20to\x20the\x20light\x20position.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20Delta\x20=\x20Coord\x20-\x20in_LightCenter;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20ray\x20count\x20as\x20equal\x20to\x20the\x20light\x27s\x20circumference.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayCount\x20=\x20TAU\x20*\x20in_Light.z,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20index\x20of\x20the\x20closest\x20ray\x20pointing\x20towards\x20this\x20pixel\x20within\x20the\x20ray\x20texture.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20RayIndex\x20=\x20(RayCount\x20*\x20fract(atan(-Delta.y,\x20Delta.x)/TAU));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayAngle\x20=\x20(RayIndex/RayCount)\x20*\x20360.;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20!isBetweenAngles(RayAngle,\x20light_angles.x,\x20light_angles.y)\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(0.0,\x200.0,\x200.0,\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20TexRay\x20=\x20vec2(in_Light.z);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(shadowsEnabled)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20position\x20of\x20the\x20closest\x20ray\x20pointing\x20towards\x20this\x20pixel\x20within\x20the\x20ray\x20texture.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20RayPos\x20=\x20vec2(floor(mod(RayIndex,\x20in_RayTexSize)\x20+\x200.5),\x20floor(RayIndex\x20/\x20in_RayTexSize)\x20+\x200.5)\x20\x20*\x20(1./in_RayTexSize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20closest\x20ray\x20associated\x20with\x20this\x20pixel.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20TexRay\x20=\x20texture2D(in_RayMap,\x20RayPos).rg;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20distance\x20from\x20the\x20current\x20pixel\x20to\x20the\x20light\x20center.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20Distance\x20=\x20distance(Coord,\x20in_LightCenter);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Reads\x20out\x20the\x20length\x20fo\x20the\x20ray\x20itself.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayLength\x20=\x20clamp(TexRay.r\x20+\x20(TexRay.g\x20/\x20255.0),\x200.0,\x201.0)\x20*\x20in_Light.z;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Returns\x20a\x20bool\x20whether\x20or\x20not\x20this\x20pixel\x20is\x20within\x20the\x20ray.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayVisible\x20=\x20sign(RayLength\x20-\x20Distance)\x20*\x20(1.\x20-\x20texture2D(in_WorldMap,\x20(in_Light.xy\x20+\x20Delta)\x20*\x20in_World).a\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20gradient/tone\x20map\x20based\x20on\x20distance\x20from\x20the\x20pixel\x20to\x20the\x20light.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20ToneMap\x20=\x20ToneMapFunc(Distance,\x20in_Light.z);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Draw\x20the\x20final\x20pixel\x20output\x20with\x20the\x20source\x20and\x20destination\x20color\x20lerp\x27d\x20together,\x20then\x20apply\x20the\x20gradient/tonemap.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(TexRay.r,\x200.,\x200.,\x201.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20LightColor\x20=\x20vec4(1.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(in_LightImageSize.x\x20>\x200.\x20&&\x20in_LightImageSize.y\x20>\x200.)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20RotatedCoord\x20=\x20getRotatedCoord(Coord,\x20light_rotation\x20*\x20TAU\x20/\x20360.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20LightColor\x20=\x20texture2D(in_LightImage,\x20getLocalFrame(RotatedCoord));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(mix(in_ColorD,\x20vec3(LightColor)\x20*\x20in_ColorS,\x20vec3(ToneMap))\x20*\x20RayVisible,\x20ToneMap\x20*\x20RayVisible\x20*\x20LightColor.a);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(1.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','cos','tileWidth','addUniqueLight','checkComment','setrotationorigin','mapLights','_mapShadowPicture','variation','Color','4671621PXfQSK','Light\x20images','randomInt','customAnimColor','blendMode','setambientlight','_lightMapTexture','get','animationCountdown','error'];_0x36ea=function(){return _0x386368;};return _0x36ea();}Sprite_MapLight[_0x115d40(0x2bd)]=Object[_0x115d40(0x221)](Sprite_Light[_0x115d40(0x2bd)]),Sprite_MapLight[_0x115d40(0x2bd)][_0x115d40(0x1ff)]=Sprite_MapLight,Sprite_MapLight['prototype'][_0x115d40(0x2be)]=function(_0x469354,_0x276440,_0x5eab46){const _0x280dc2=_0x115d40;this[_0x280dc2(0x23b)]=_0x469354,this['_mapY']=_0x276440,Sprite_Light[_0x280dc2(0x2bd)]['initialize'][_0x280dc2(0x1f2)](this,null,null,_0x5eab46[_0x280dc2(0x268)]);},Sprite_MapLight['prototype']['refreshPosition']=function(){const _0x3d4bac=_0x115d40;let _0x8aed6d=$gameMap[_0x3d4bac(0x1c0)](this[_0x3d4bac(0x23b)])*$gameMap[_0x3d4bac(0x224)]()+this['autoOffset']['x']+this[_0x3d4bac(0x205)]['x'],_0x1a4f64=$gameMap['adjustY'](this[_0x3d4bac(0x281)])*$gameMap['tileHeight']()+this[_0x3d4bac(0x1c1)]['y']+this['manualOffset']['y'];var _0xd8cf40=this[_0x3d4bac(0x23b)]*$gameMap[_0x3d4bac(0x224)]()+$gameMap[_0x3d4bac(0x224)]()/0x2+this['manualOffset']['x'],_0x107181=this[_0x3d4bac(0x281)]*$gameMap[_0x3d4bac(0x239)]()+$gameMap[_0x3d4bac(0x239)]()/0x2+this[_0x3d4bac(0x205)]['y'];this[_0x3d4bac(0x274)]()&&(_0x8aed6d+=this['customAnimOffset']['x'],_0x1a4f64+=this[_0x3d4bac(0x242)]['y'],_0xd8cf40+=this[_0x3d4bac(0x242)]['x'],_0x107181+=this['customAnimOffset']['y']);if(this['x']!=_0x8aed6d||this['y']!=_0x1a4f64||(this['in_Light']['x']!=_0xd8cf40||this[_0x3d4bac(0x254)]['y']!=_0x107181||this[_0x3d4bac(0x254)][_0x3d4bac(0x297)]!=this[_0x3d4bac(0x297)])){this['x']=_0x8aed6d,this['y']=_0x1a4f64;var _0x1edfb2=[_0xd8cf40,_0x107181,this[_0x3d4bac(0x297)]];this[_0x3d4bac(0x254)]=_0x1edfb2,this['_raySprite']['filters'][0x0]['uniforms'][_0x3d4bac(0x254)]=_0x1edfb2,this[_0x3d4bac(0x261)][_0x3d4bac(0x23c)][0x0]['uniforms'][_0x3d4bac(0x254)]=_0x1edfb2,this['needsShadowUpdate']=!![];}};function Filter_LightsContainer(){const _0x42cf77=_0x115d40;this['initialize'][_0x42cf77(0x2c7)](this,arguments);};Filter_LightsContainer[_0x115d40(0x2bd)]=Object[_0x115d40(0x221)](PIXI['Filter'][_0x115d40(0x2bd)]),Filter_LightsContainer[_0x115d40(0x2bd)][_0x115d40(0x1ff)]=Filter_LightsContainer,Filter_LightsContainer[_0x115d40(0x2bd)][_0x115d40(0x2be)]=function(){const _0x2ef448=_0x115d40;PIXI['Filter'][_0x2ef448(0x1f2)](this,null,null),this['blendMode']=PIXI[_0x2ef448(0x2b0)][_0x2ef448(0x195)];},Filter_LightsContainer[_0x115d40(0x2bd)][_0x115d40(0x2c7)]=function(_0x59ae8f,_0x457038,_0x3579ab,_0x2b7fdc){const _0x3ba889=_0x115d40;PIXI[_0x3ba889(0x1c7)]['prototype'][_0x3ba889(0x2c7)][_0x3ba889(0x1f2)](this,_0x59ae8f,_0x457038,_0x3579ab,0x1);};function Raytrace_Filter(){const _0x4f896d=_0x115d40;this[_0x4f896d(0x2be)]['apply'](this,arguments);};Raytrace_Filter[_0x115d40(0x2bd)]=Object['create'](PIXI[_0x115d40(0x1c7)][_0x115d40(0x2bd)]),Raytrace_Filter[_0x115d40(0x2bd)][_0x115d40(0x1ff)]=Raytrace_Filter,Raytrace_Filter[_0x115d40(0x2bd)]['initialize']=function(){const _0x3b6688=_0x115d40;PIXI[_0x3b6688(0x1c7)][_0x3b6688(0x1f2)](this,null,raytraceFrag),this[_0x3b6688(0x288)]['in_WorldMap']=$lightSys['shadowMap'][_0x3b6688(0x292)],this['uniforms'][_0x3b6688(0x254)]=[0x10,0x10,0x40];const _0x5ec007=0x22*0x30,_0x18869c=0x27*0x30;this['uniforms'][_0x3b6688(0x29e)]=[0x1/_0x5ec007,0x1/_0x18869c],this[_0x3b6688(0x288)]['in_RayTexSize']=0x20;},Raytrace_Filter[_0x115d40(0x2bd)][_0x115d40(0x2c7)]=function(_0x4c1f93,_0x31bda9,_0x3f2dbd,_0x2a6994){const _0x363393=_0x115d40;PIXI[_0x363393(0x1c7)][_0x363393(0x2bd)]['apply'][_0x363393(0x1f2)](this,_0x4c1f93,_0x31bda9,_0x3f2dbd,_0x2a6994),this[_0x363393(0x204)][_0x363393(0x296)](_0x3f2dbd[_0x363393(0x1bf)]());},_[_0x115d40(0x278)]=Raytrace_Filter;function Light_Filter(){const _0x3006c4=_0x115d40;this[_0x3006c4(0x2be)][_0x3006c4(0x2c7)](this,arguments);};Light_Filter['prototype']=Object[_0x115d40(0x221)](PIXI[_0x115d40(0x1c7)][_0x115d40(0x2bd)]),Light_Filter[_0x115d40(0x2bd)][_0x115d40(0x1ff)]=Light_Filter,Light_Filter[_0x115d40(0x2bd)][_0x115d40(0x2be)]=function(){const _0x328b44=_0x115d40;PIXI[_0x328b44(0x1c7)][_0x328b44(0x1f2)](this,null,lightingFrag),this[_0x328b44(0x230)]=PIXI[_0x328b44(0x2b0)][_0x328b44(0x195)],this[_0x328b44(0x288)]['in_WorldMap']=$lightSys[_0x328b44(0x1aa)]['_renderTexture'],this['uniforms'][_0x328b44(0x2c8)]=new PIXI['Texture'](new PIXI[(_0x328b44(0x1c5))](),new PIXI[(_0x328b44(0x257))](0x0,0x0,0x20,0x20)),this[_0x328b44(0x288)][_0x328b44(0x254)]=[0x10,0x10,0x40],this['uniforms'][_0x328b44(0x1d3)]=[0.3,0.3,0.3],this[_0x328b44(0x288)][_0x328b44(0x2a8)]=[0x0,0x0,0x0];const _0x5ab247=0x22*0x30,_0x3c675b=0x27*0x30;this['uniforms'][_0x328b44(0x29e)]=[0x1/_0x5ab247,0x1/_0x3c675b],this[_0x328b44(0x288)][_0x328b44(0x1ab)]=[0x40,0x40],this[_0x328b44(0x288)]['in_RayTexSize']=0x20,this['uniforms'][_0x328b44(0x29a)]=0x80,this[_0x328b44(0x288)][_0x328b44(0x28d)]=[0x0,0x168],this[_0x328b44(0x288)][_0x328b44(0x2b1)]=0x0,this[_0x328b44(0x288)][_0x328b44(0x252)]=[0x0,0x0],this[_0x328b44(0x288)][_0x328b44(0x1de)]=[0x0,0x0],this['uniforms'][_0x328b44(0x29c)]=null,this[_0x328b44(0x288)]['shadowsEnabled']=!![];},Light_Filter[_0x115d40(0x2bd)][_0x115d40(0x2c7)]=function(_0x242a7b,_0x509438,_0x2f35f9,_0x4bb80f){const _0x45f1de=_0x115d40;PIXI[_0x45f1de(0x1c7)]['prototype'][_0x45f1de(0x2c7)][_0x45f1de(0x1f2)](this,_0x242a7b,_0x509438,_0x2f35f9,0x1);},Light_Filter[_0x115d40(0x2bd)][_0x115d40(0x296)]=function(_0x4459f7){const _0x2dcf4e=_0x115d40;this[_0x2dcf4e(0x288)][_0x2dcf4e(0x2c8)]=_0x4459f7;},_[_0x115d40(0x220)]=Light_Filter;function Filter_MapLighting(){const _0x2770bd=_0x115d40;this[_0x2770bd(0x2be)][_0x2770bd(0x2c7)](this,arguments);};Filter_MapLighting[_0x115d40(0x2bd)]=Object[_0x115d40(0x221)](PIXI['Filter'][_0x115d40(0x2bd)]),Filter_MapLighting[_0x115d40(0x2bd)][_0x115d40(0x1ff)]=Filter_MapLighting,Filter_MapLighting[_0x115d40(0x2bd)][_0x115d40(0x2be)]=function(){const _0x5f2c7f=_0x115d40;PIXI[_0x5f2c7f(0x1c7)][_0x5f2c7f(0x1f2)](this,null,fragMapLight),this[_0x5f2c7f(0x230)]=PIXI[_0x5f2c7f(0x2b0)][_0x5f2c7f(0x260)],this['uniforms'][_0x5f2c7f(0x1b3)]=[0.2,0.2,0.2,0x1];},Filter_MapLighting[_0x115d40(0x2bd)][_0x115d40(0x2c7)]=function(_0x12f60e,_0x5ecd6d,_0x3b9016,_0x1ed43b){const _0x1b9ead=_0x115d40;PIXI[_0x1b9ead(0x1c7)][_0x1b9ead(0x2bd)][_0x1b9ead(0x2c7)]['call'](this,_0x12f60e,_0x5ecd6d,_0x3b9016,_0x1ed43b);},_[_0x115d40(0x245)]=Filter_MapLighting;const fragMapLight=_0x115d40(0x1b1),raytraceFrag=_0x115d40(0x2af),lightingFrag=_0x115d40(0x2bc)+_[_0x115d40(0x27e)]+_0x115d40(0x222);




})(DAE.Lighting);