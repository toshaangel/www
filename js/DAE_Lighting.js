//-----------------------------------------------------------------------------
//        DaedraKyne Plugins - Lighting
//                    -------
//              DAE_Lighting.js
//       Work email: dohvacore@gmail.com
//-----------------------------------------------------------------------------




//-----------------------------------------------------------------------------
/*:
* @plugindesc v1.3 Lighting
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
* ----------------------------------------------------------------------------
* Changelog
* ----------------------------------------------------------------------------
* 
* Version 1.3:
* - Added light image support
* - Added customisation for light direction offsets
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

const _0x1ecb36=_0x278b;function _0x5bf6(){const _0x50c396=['clear','get','dae_scanMapNote','X\x20offset','in_WorldMap','_filter','setintensity','img/lights/','30DTFHKg','_shadowsContainer','_rayRenderTexture','in_LightCenter','setRayMap','registerCommand','Custom\x20directional\x20offsets','manualOffset','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20varying\x20vec2\x20vTextureCoord;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec4\x20ambient_light;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20uSampler;\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20addColors(vec4\x20color1,\x20vec4\x20color2)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20vec4(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.r\x20*\x20color1.a\x20+\x20color2.r\x20*\x20color2.a),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.g\x20*\x20color1.a\x20+\x20color2.g\x20*\x20color2.a),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.b\x20*\x20color1.a\x20+\x20color2.b\x20*\x20color2.a),\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min(1.0,\x20color1.a\x20+\x20color2.a)\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main(void){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20light\x20=\x20texture2D(uSampler,\x20vTextureCoord);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20light\x20+\x20ambient_light;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20','StateSystem','pendingLights','LIGHT_TYPES','Graphics','setAngle','refreshDimensions','BaseTexture','colors','terrainTag','adjustY','Auto-rotate','uniforms','randomInt','setBlendMode','_nextID','deleteUniqueLight','dae_getRotation','prototype','display','clone','setoffset','refreshColors','dae_createGameObjects','in_ColorD','removeLight','error','render','blendMode','Filter','createGameObjects','REGION_SHADOWS','toningFunc','addMapLight','setDirection','2657800RTnfgn','app','turnedOn','has','update','rotation','Preload\x20on\x20start','renderer','in_RayMap','lights','refreshRadius','autoRotate','imageId','Y\x20offset','reloadLights','Light\x20images','regionId','addChild','_scene','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20in_WorldMap;\x20//\x20The\x20texture\x20of\x20the\x20game\x27s\x20world/collision\x20map.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec3\x20in_Light;\x20//\x20X,\x20Y\x20and\x20Z\x20(radius)\x20of\x20the\x20light\x20that\x20is\x20being\x20ray-traced.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20in_World;\x20//\x20Size\x20of\x20the\x20world/collision\x20texture\x20we\x27re\x20tracing\x20rays\x20against.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20in_RayTexSize;\x20//\x20Size\x20of\x20the\x20texture\x20that\x20the\x20rays\x20are\x20being\x20stored\x20on.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20varying\x20vec2\x20vTextureCoord;\x20//\x20The\x20UV\x20coordinate\x20of\x20the\x20current\x20pixel.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20MAXRADIUS\x20=\x2065535.,\x20//\x20Maximum\x20ray-length\x20of\x202\x20bytes,\x202^16-1.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20TAU\x20=\x206.2831853071795864769252867665590;\x20//\x20TAU\x20or\x202\x20*\x20pi\x20(shortcut\x20for\x20radial.circular\x20math).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Converts\x20the\x20current\x20pixel\x27s\x20coordinate\x20from\x20UV\x20to\x20XY\x20space.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20fullCoord\x20=\x20floor(vTextureCoord\x20*\x20in_RayTexSize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Takes\x20the\x20pixel\x27s\x20XY\x20position,\x20converts\x20it\x20to\x20a\x20vec2(1D-array\x20index,\x20ray\x20count).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20xyRay\x20=\x20vec2((fullCoord.y\x20*\x20in_RayTexSize)\x20+\x20fullCoord.x,\x20TAU\x20*\x20in_Light.z);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Takes\x20the\x20index/ray_count\x20and\x20converts\x20it\x20to\x20an\x20angle\x20in\x20range\x20of:\x200\x20to\x202pi\x20=\x200\x20to\x20ray_count.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20Theta\x20=\x20TAU\x20*\x20(xyRay.x\x20/\x20xyRay.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20lengthdir_xy\x20polar\x20cooridinate\x20around\x20the\x20light\x27s\x20center.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20Delta\x20=\x20vec2(cos(Theta),\x20-sin(Theta));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20\x22Step\x22\x20gets\x20checks\x20whether\x20the\x20current\x20ray\x20index\x20<\x20ray\x20count,\x20if\x20not\x20the\x20ray\x20is\x20not\x20traced\x20(for-loop\x20breaks).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20v\x20=\x20step(xyRay.x,xyRay.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(v\x20>\x200.)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20for(float\x20d\x20=\x200.;\x20d\x20<\x20MAXRADIUS;\x20d++)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/*\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x22in_Light.z\x20<\x20d\x22\x20Check\x20if\x20the\x20current\x20ray\x20distance(length)\x20\x22d\x22\x20is\x20>\x20light\x20radius\x20(if\x20so,\x20then\x20break).\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x22d\x20+\x20in_Light.z\x20*\x20texture2D(...)\x22\x20If\x20collision\x20in\x20the\x20world\x20map\x20at\x20distance\x20\x22d\x22\x20is\x20found,\x20the\x20ray\x20ends\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20(add\x20light\x20radius\x20to\x20d\x20to\x20make\x20it\x20greater\x20than\x20the\x20light\x20radius\x20to\x20break\x20out\x20of\x20the\x20for-loop.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20xyRay\x20=\x20Delta\x20*\x20d;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(in_Light.z\x20<\x20d\x20+\x20in_Light.z\x20*\x20texture2D(in_WorldMap,\x20vec2(in_Light.x\x20+\x20xyRay.x,\x20in_Light.y\x20+\x20xyRay.y)\x20*\x20in_World).a)\x20break;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Converts\x20the\x20ray\x20length\x20to\x20polar\x20UV\x20coordinates\x20ray_length\x20/\x20light_radius.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20rayLength\x20=\x20length(xyRay)\x20/\x20in_Light.z;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Takes\x20the\x20length\x20of\x20the\x20current\x20ray\x20and\x20splits\x20it\x20into\x20two\x20bytes\x20and\x20stores\x20it\x20in\x20the\x20texture.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(rayLength,\x20vec3(0.));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(vec2(floor(rayLength\x20*\x20255.0)\x20/\x20255.0,\x20fract(rayLength\x20*\x20255.0)),\x200.0,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(vec2(rayLength,\x200.),\x200.0,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','deltaRotationTotal','toLowerCase','null','setColors','_lightSprite','lightRotationOrigin','tileWidth','pluginName','deleteLight','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20in_WorldMap,\x20in_RayMap;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec3\x20in_Light,\x20in_ColorS,\x20in_ColorD;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20in_WorldTexSize,\x20in_LightCenter;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20in_RayTexSize,\x20in_LightTexSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20varying\x20vec2\x20vTextureCoord;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20uSampler;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20TAU\x20=\x206.2831853071795864769252867665590;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20float\x20PI\x20=\x20TAU/2.;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20light_angles;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20light_rotation;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20vec2\x20in_LightImageSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20in_LightImage;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Custom\x20tone\x20map\x20function,\x20adjust\x20as\x20you\x20please,\x20keep\x20in\x20range\x200\x20to\x201.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','refreshAngles','createLightingFilter','true','clearLights','variation','getLightImageTexture','setcolor','TERRAIN_SHADOWS','systems','setImage','System_Lights','setRotation','_pageIndex','5dzARNH','Color','TERRAIN_LIGHTS','COMMENT_REG','parse','height','updateMain','loadShadowMapPicture','208523pMgksU','call','intensity','setRadius','create','REGION_LIGHTS','offset','DAE_LIGHTING','LIGHT_IMAGES','_mapGraphics','getPendingLights','autoRotateOffset','setWorldMap','page','_baseIntensity','_mapY','beginFill','list','dae_lights','none','filters','addUniqueLight','lightParent','sin','_createAllElements','\x27\x20has\x20not\x20been\x20defined','RenderTexture','forEach','calculateRotation','og_manualOffset','in_LightImageSize','addLightToDisplay','autoOffset','31816697jKxACV','Filter_MapLighting','_mapShadowPicture','_lightsContainer','in_RayTexSize','addMapShadow','log','in_LightImage','33JTShaV','Unique\x20light\x20does\x20not\x20exist,\x20it\x20cannot\x20be\x20deleted','color','sqrt','radius','_lightMapSprite','3645369ZNkAww','\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20bool\x20isBetweenAngles(float\x20angle,\x20float\x20start,\x20float\x20end)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20modEnd\x20=\x20mod(end,\x20360.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(start\x20<\x20end)\x20{return\x20(angle\x20>=\x20start\x20&&\x20angle\x20<=\x20end);}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20(angle\x20>=\x20start\x20||\x20angle\x20<=\x20end);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20getRotatedCoord(vec2\x20Coord,\x20float\x20angle)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//vec2\x20mid\x20=\x20vec2(in_LightTexSize\x20/\x202.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20mid\x20=\x20in_LightCenter;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Coord\x20=\x20Coord\x20-\x20mid;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20x\x20=\x20Coord.x,\x20y\x20=\x20Coord.y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20c\x20=\x20cos(angle);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20s\x20=\x20sin(angle);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20vec2\x20(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20x\x20*\x20c\x20-\x20y\x20*\x20s\x20+\x20mid.x,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20x\x20*\x20s\x20+\x20y\x20*\x20c\x20+\x20mid.y\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20current\x20pixel\x27s\x20texture\x20XY\x20coordinate\x20from\x20it\x27s\x20texture\x20UV\x20coordinate.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20Coord\x20=\x20vTextureCoord\x20*\x20in_LightTexSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Coord.x\x20>\x20in_LightCenter.x\x20+\x20in_Light.z\x20||\x20Coord.y\x20>\x20in_LightCenter.y\x20+\x20in_Light.z)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(0.0,\x200.0,\x200.0,\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20lengthdir_xy\x20of\x20the\x20current\x20pixel\x20in\x20reference\x20to\x20the\x20light\x20position.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20Delta\x20=\x20Coord\x20-\x20in_LightCenter;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20ray\x20count\x20as\x20equal\x20to\x20the\x20light\x27s\x20circumference.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayCount\x20=\x20TAU\x20*\x20in_Light.z,\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20index\x20of\x20the\x20closest\x20ray\x20pointing\x20towards\x20this\x20pixel\x20within\x20the\x20ray\x20texture.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20RayIndex\x20=\x20(RayCount\x20*\x20fract(atan(-Delta.y,\x20Delta.x)/TAU));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayAngle\x20=\x20(RayIndex/RayCount)\x20*\x20360.;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20!isBetweenAngles(RayAngle,\x20light_angles.x,\x20light_angles.y)\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(0.0,\x200.0,\x200.0,\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20position\x20of\x20the\x20closest\x20ray\x20pointing\x20towards\x20this\x20pixel\x20within\x20the\x20ray\x20texture.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20RayPos\x20=\x20vec2(floor(mod(RayIndex,\x20in_RayTexSize)\x20+\x200.5),\x20floor(RayIndex\x20/\x20in_RayTexSize)\x20+\x200.5)\x20\x20*\x20(1./in_RayTexSize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20closest\x20ray\x20associated\x20with\x20this\x20pixel.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20TexRay\x20=\x20texture2D(in_RayMap,\x20RayPos).rg;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20distance\x20from\x20the\x20current\x20pixel\x20to\x20the\x20light\x20center.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20Distance\x20=\x20distance(Coord,\x20in_LightCenter);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Reads\x20out\x20the\x20length\x20fo\x20the\x20ray\x20itself.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayLength\x20=\x20clamp(TexRay.r\x20+\x20(TexRay.g\x20/\x20255.0),\x200.0,\x201.0)\x20*\x20in_Light.z;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Returns\x20a\x20bool\x20whether\x20or\x20not\x20this\x20pixel\x20is\x20within\x20the\x20ray.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20RayVisible\x20=\x20sign(RayLength\x20-\x20Distance)\x20*\x20(1.\x20-\x20texture2D(in_WorldMap,\x20(in_Light.xy\x20+\x20Delta)\x20*\x20in_WorldTexSize).a\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Gets\x20the\x20gradient/tone\x20map\x20based\x20on\x20distance\x20from\x20the\x20pixel\x20to\x20the\x20light.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20ToneMap\x20=\x20ToneMapFunc(Distance,\x20in_Light.z);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Draw\x20the\x20final\x20pixel\x20output\x20with\x20the\x20source\x20and\x20destination\x20color\x20lerp\x27d\x20together,\x20then\x20apply\x20the\x20gradient/tonemap.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(TexRay.r,\x200.,\x200.,\x201.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20LightColor\x20=\x20vec4(1.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(in_LightImageSize.x\x20>\x200.\x20&&\x20in_LightImageSize.y\x20>\x200.)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20LightColor\x20=\x20texture2D(in_LightImage,\x20getRotatedCoord(Coord,\x20light_rotation\x20*\x20TAU\x20/\x20360.)\x20/\x20(in_Light.z\x20*\x202.));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(mix(in_ColorD,\x20vec3(LightColor)\x20*\x20in_ColorS,\x20vec3(ToneMap))\x20*\x20RayVisible,\x20ToneMap\x20*\x20RayVisible\x20*\x20LightColor.a);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//gl_FragColor\x20=\x20vec4(1.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','uniqueLightsReverseMap','refreshPosition','setrotation','Sprite_Light','lightAngle','Light_Filter','img/shadows/','setrotationorigin','_pageLights','in_ColorS','refreshIntensity','_realY','push','pow','ceil','dae_createAllElements','shadowMap','dirOffsets','dae_setupPage','setting','160mhwvsY','tileHeight','76028pYtLba','constructor','setAmbientLight','Rectangle','_renderTexture','_realX','_lightDisplay','setManualOffset','initialize','lightTypeName','cos','drawMapShadow','setambientlight','blue','DAE_LIGHT','lightID','setup','type','addShadow','from','BLEND_MODES','set','match','mapLights','setRotationOrigin','setangle','in_LightTexSize','addlight','width','Light\x20image\x20\x27','dae_createDisplayObjects','addLight','undefined','light_angles','setupPage','lightType','resize','drawRect','direction','in_Light','code','checkComment','Point','texture','Sprite','.png','log2','adjustX','getLight','8485974idsJhB','deltaRot','Global\x20Light\x20Toning\x20Function','newlight','uniqueLights','176913cDlDXT','apply','delete','Texture','_lightFilter','ambientLight','_lightMapTexture','_spriteset','setrotation/f','Container','_raySprite','_shadows','length','Angle','refreshRotation','lightRotation'];_0x5bf6=function(){return _0x50c396;};return _0x5bf6();}(function(_0xcc9b60,_0x328099){const _0x3e9539=_0x278b,_0x498696=_0xcc9b60();while(!![]){try{const _0x19e88f=parseInt(_0x3e9539(0x286))/0x1+parseInt(_0x3e9539(0x250))/0x2*(-parseInt(_0x3e9539(0x232))/0x3)+parseInt(_0x3e9539(0x2c9))/0x4+parseInt(_0x3e9539(0x201))/0x5*(parseInt(_0x3e9539(0x281))/0x6)+-parseInt(_0x3e9539(0x209))/0x7*(-parseInt(_0x3e9539(0x24e))/0x8)+-parseInt(_0x3e9539(0x238))/0x9*(-parseInt(_0x3e9539(0x29e))/0xa)+-parseInt(_0x3e9539(0x22a))/0xb;if(_0x19e88f===_0x328099)break;else _0x498696['push'](_0x498696['shift']());}catch(_0x26a6fa){_0x498696['push'](_0x498696['shift']());}}}(_0x5bf6,0xb892e),PluginManager[_0x1ecb36(0x2a3)](_[_0x1ecb36(0x1f1)],_0x1ecb36(0x25c),_0x53409c=>{const _0x47e446=_0x1ecb36,_0x4dd09b=JSON[_0x47e446(0x205)](_0x53409c[_0x47e446(0x234)]);_0x4dd09b['R']=Number(_0x4dd09b['R']),_0x4dd09b['G']=Number(_0x4dd09b['G']),_0x4dd09b['B']=Number(_0x4dd09b['B']),$lightSys[_0x47e446(0x252)](_0x4dd09b);}),PluginManager[_0x1ecb36(0x2a3)](_[_0x1ecb36(0x1f1)],_0x1ecb36(0x284),_0x4a80ea=>{const _0x393e07=_0x1ecb36,_0x25989c=_0x4a80ea[_0x393e07(0x25f)],_0x19cf16=_0x4a80ea[_0x393e07(0x273)],_0x5a95f1=new Sprite_Light(this,_0x25989c,_0x19cf16),_0x3f3082=$lightSys[_0x393e07(0x26f)](_0x5a95f1,_0x25989c);}),PluginManager['registerCommand'](_[_0x1ecb36(0x1f1)],'setoffset',_0x348517=>{const _0x5027ac=_0x1ecb36,_0x587876=_0x348517['lightID'],_0x5ec2a4=JSON[_0x5027ac(0x205)](_0x348517[_0x5027ac(0x20f)]);_0x5ec2a4['x']=Number(_0x348517[_0x5027ac(0x20f)]['x']),_0x5ec2a4['y']=Number(_0x348517[_0x5027ac(0x20f)]['y']);const _0x3e4358=$lightSys[_0x5027ac(0x280)](_0x587876,!![]);if(_0x3e4358)_0x3e4358[_0x5027ac(0x257)](x,y);}),PluginManager['registerCommand'](_[_0x1ecb36(0x1f1)],_0x1ecb36(0x1fa),_0x42e7a3=>{const _0x5a837b=_0x1ecb36,_0x185fda=_0x42e7a3['lightID'],_0x4b3d23=JSON[_0x5a837b(0x205)](_0x42e7a3[_0x5a837b(0x234)]),_0x1d2aac=$lightSys[_0x5a837b(0x280)](_0x185fda,!![]);if(_0x1d2aac)_0x1d2aac[_0x5a837b(0x1ed)](_0x4b3d23);}),PluginManager['registerCommand'](_[_0x1ecb36(0x1f1)],_0x1ecb36(0x241),_0x1ec976=>{const _0x6fc232=_0x1ecb36,_0x1a61cb=_0x1ec976['lightID'],_0x362c27=Number(_0x1ec976[_0x6fc232(0x2ce)]),_0x5187b9=$lightSys[_0x6fc232(0x280)](_0x1a61cb,!![]);if(_0x5187b9)_0x5187b9[_0x6fc232(0x268)](_0x362c27);}),PluginManager[_0x1ecb36(0x2a3)](_[_0x1ecb36(0x1f1)],_0x1ecb36(0x23c),_0x4c9da9=>{const _0x3f780e=_0x1ecb36,_0x13fadd=_0x4c9da9[_0x3f780e(0x25f)],_0x3fd571=Number(_0x4c9da9[_0x3f780e(0x2ce)]),_0x222ffc=$lightSys[_0x3f780e(0x280)](_0x13fadd,!![]);if(_0x222ffc)_0x222ffc[_0x3f780e(0x1ff)](_0x3fd571);}),PluginManager[_0x1ecb36(0x2a3)](_[_0x1ecb36(0x1f1)],'setangle',_0x371cc7=>{const _0x4157a3=_0x1ecb36,_0x20ebd3=_0x371cc7[_0x4157a3(0x25f)],_0x1b3fde=Number(_0x371cc7['angle']),_0x280a6a=$lightSys[_0x4157a3(0x280)](_0x20ebd3,!![]);if(_0x280a6a)_0x280a6a[_0x4157a3(0x2ab)](_0x1b3fde);}),PluginManager[_0x1ecb36(0x2a3)](_[_0x1ecb36(0x1f1)],_0x1ecb36(0x29c),_0x5cdc60=>{const _0x8e55e6=_0x1ecb36,_0x366e4f=_0x5cdc60['lightID'],_0x17f55c=Number(_0x5cdc60[_0x8e55e6(0x20b)]),_0x16e5c9=$lightSys[_0x8e55e6(0x280)](_0x366e4f,!![]);if(_0x16e5c9)_0x16e5c9['setColors'](_0x16e5c9[_0x8e55e6(0x2ae)],_0x17f55c);}),PluginManager[_0x1ecb36(0x2a3)](_[_0x1ecb36(0x1f1)],_0x1ecb36(0x28e),_0x26f2b2=>{const _0x1be093=_0x1ecb36,_0x4a5b3b=_0x26f2b2['lightID'],_0x49e6ab=Number(_0x26f2b2[_0x1be093(0x2ce)]),_0x504514=$lightSys[_0x1be093(0x280)](_0x4a5b3b,!![]);if(_0x504514)_0x504514[_0x1be093(0x282)]=_0x49e6ab;}),_[_0x1ecb36(0x204)]=/\[dae_light\s([\w_\d\/.]+)\s([\w_\d\/.]+)\s([\w_\d\/.]+)\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\s?([\w_\d\/.]+)?\]/i);const parameters=PluginManager['parameters'](_[_0x1ecb36(0x1f1)]),light_types=JSON['parse'](parameters['Light\x20types']);_['LIGHT_TYPES']=new Map(),light_types[_0x1ecb36(0x224)](_0x380ac7=>{const _0x1768fe=_0x1ecb36;_0x380ac7=JSON['parse'](_0x380ac7),_0x380ac7['Color']=JSON[_0x1768fe(0x205)](_0x380ac7[_0x1768fe(0x202)]),_0x380ac7['Custom\x20directional\x20offsets']=JSON[_0x1768fe(0x205)](_0x380ac7[_0x1768fe(0x2a4)]);for(var _0x2f636a=0x2;_0x2f636a<=0x8;_0x2f636a+=0x2){_0x380ac7['Custom\x20directional\x20offsets'][_0x2f636a]=JSON[_0x1768fe(0x205)](_0x380ac7[_0x1768fe(0x2a4)][_0x2f636a+'']),_0x380ac7[_0x1768fe(0x2a4)][_0x2f636a]['x']=Number(_0x380ac7[_0x1768fe(0x2a4)][_0x2f636a]['x']),_0x380ac7['Custom\x20directional\x20offsets'][_0x2f636a]['y']=Number(_0x380ac7[_0x1768fe(0x2a4)][_0x2f636a]['y']);}_[_0x1768fe(0x2a9)]['set'](_0x380ac7['ID\x20/\x20name'],_0x380ac7);}),_[_0x1ecb36(0x2c6)]=JSON['parse'](parameters[_0x1ecb36(0x283)]),_[_0x1ecb36(0x20e)]=new Map(),_['REGION_LIGHTS'][_0x1ecb36(0x265)](0x11,{'type':_0x1ecb36(0x25d)}),_[_0x1ecb36(0x203)]=new Map(),_[_0x1ecb36(0x2c5)]=new Map(),_[_0x1ecb36(0x2c5)][_0x1ecb36(0x265)](0x4,{'setting':[[-0x1,-0x1,0x31,0x31]]}),_[_0x1ecb36(0x2c5)]['set'](0x5,{'setting':[[-0x1,-0x1,0x2,0x31],[0x2f,-0x1,0x2,0x31]]}),_[_0x1ecb36(0x2c5)]['set'](0x6,{'setting':[[-0x1,-0x1,0x2,0x31]]}),_['REGION_SHADOWS'][_0x1ecb36(0x265)](0x7,{'setting':[[0x2f,-0x1,0x2,0x31]]}),_['TERRAIN_SHADOWS']=new Map(),_['LIGHT_IMAGES']=new Map(),_[_0x1ecb36(0x211)][_0x1ecb36(0x265)](_0x1ecb36(0x21c),{'file':null,'texture':new PIXI[(_0x1ecb36(0x289))](new PIXI[(_0x1ecb36(0x2ad))](),new PIXI[(_0x1ecb36(0x253))](0x0,0x0,0x0,0x0)),'width':0x0,'height':0x0});const light_images=JSON[_0x1ecb36(0x205)](parameters[_0x1ecb36(0x2d8)]);light_images['forEach'](_0x265540=>{const _0x3e8e6d=_0x1ecb36;_0x265540=JSON[_0x3e8e6d(0x205)](_0x265540);const _0x3cb65e=_0x3e8e6d(0x29d)+_0x265540['Image']+_0x3e8e6d(0x27d),_0x1e7abd=Boolean(_0x265540[_0x3e8e6d(0x2cf)]==_0x3e8e6d(0x1f6));console[_0x3e8e6d(0x230)](_0x265540,_0x3cb65e,_0x1e7abd),_['LIGHT_IMAGES']['set'](_0x265540['ID\x20/\x20Name'],{'file':_0x3cb65e,'texture':_0x1e7abd?new PIXI[(_0x3e8e6d(0x289))][(_0x3e8e6d(0x263))](_0x3cb65e):null,'width':Number(_0x265540['Width']),'height':Number(_0x265540['Height'])});});const _StateSystem_setBlendMode=PIXI['systems'][_0x1ecb36(0x2a7)][_0x1ecb36(0x2b8)]['setBlendMode'];PIXI[_0x1ecb36(0x1fc)][_0x1ecb36(0x2a7)][_0x1ecb36(0x2b8)][_0x1ecb36(0x2b4)]=function setBlendMode(_0xdf8c87){if(_0xdf8c87===undefined)return;_StateSystem_setBlendMode['call'](this,_0xdf8c87);},DataManager[_0x1ecb36(0x2bd)]=DataManager['createGameObjects'],DataManager[_0x1ecb36(0x2c4)]=function(){const _0x5ceec4=_0x1ecb36;DataManager[_0x5ceec4(0x2bd)](),$lightSys=new System_Lights();},Graphics['dae_createAllElements']=Graphics[_0x1ecb36(0x221)],Graphics[_0x1ecb36(0x221)]=function(){const _0x4518d4=_0x1ecb36;this[_0x4518d4(0x249)]();if(typeof PIXI[_0x4518d4(0x264)]!=_0x4518d4(0x270))PIXI[_0x4518d4(0x264)][_0x4518d4(0x210)]=0x4e,PIXI[_0x4518d4(0x264)]['DAE_LIGHT']=0x4d;else throw new PixiOutOfDateError();;};var _Scene_Map_updateMain=Scene_Map[_0x1ecb36(0x2b8)][_0x1ecb36(0x207)];Scene_Map[_0x1ecb36(0x2b8)][_0x1ecb36(0x207)]=function(){const _0x12b9e6=_0x1ecb36;$lightSys[_0x12b9e6(0x2cd)](),_Scene_Map_updateMain['call'](this);},Scene_Map['prototype'][_0x1ecb36(0x26e)]=Scene_Map[_0x1ecb36(0x2b8)]['createDisplayObjects'],Scene_Map['prototype']['createDisplayObjects']=function(){const _0x4e2d08=_0x1ecb36;this[_0x4e2d08(0x26e)](),this[_0x4e2d08(0x1f5)]();},Scene_Map['prototype'][_0x1ecb36(0x1f5)]=function(){const _0x4510a0=_0x1ecb36;this[_0x4510a0(0x256)]=new Display_Lights(this);};const _Game_Map_setup=Game_Map['prototype'][_0x1ecb36(0x260)];Game_Map[_0x1ecb36(0x2b8)][_0x1ecb36(0x260)]=function(_0xdb9e72){const _0x40bb75=_0x1ecb36;$lightSys[_0x40bb75(0x1f7)](),_Game_Map_setup[_0x40bb75(0x20a)](this,_0xdb9e72),this['dae_scanMapNote'](),this['scanRegionIDs']();},Game_Map[_0x1ecb36(0x2b8)][_0x1ecb36(0x298)]=function(){var _0x9ebbe1=$dataMap['note'];_0x9ebbe1['split'](/[\r\n]+/)['forEach'](_0x194576=>{const _0x3538b7=_0x278b;if(_0x194576[_0x3538b7(0x266)](/<dae_light\s*off>/i)){$lightSys[_0x3538b7(0x2cb)]=![];return;}_0x194576[_0x3538b7(0x266)](/<dae_light\s*shadowpicture\s*([\w_\d]+)>/i)&&$lightSys[_0x3538b7(0x208)](RegExp['$1']);},this);},Game_Map[_0x1ecb36(0x2b8)]['scanRegionIDs']=function(){const _0x214d5a=_0x1ecb36;var _0x38144b=this['width'](),_0x259130=this[_0x214d5a(0x206)]();for(var _0x183f26=0x0;_0x183f26<_0x38144b;_0x183f26++){for(var _0x2dbbdb=0x0;_0x2dbbdb<_0x259130;_0x2dbbdb++){const _0x453de7=this[_0x214d5a(0x2d9)](_0x183f26,_0x2dbbdb);if(_0x453de7){if(_[_0x214d5a(0x20e)][_0x214d5a(0x2cc)](_0x453de7))$lightSys[_0x214d5a(0x2c7)](_0x183f26,_0x2dbbdb,_['REGION_LIGHTS'][_0x214d5a(0x297)](_0x453de7));if(_[_0x214d5a(0x2c5)][_0x214d5a(0x2cc)](_0x453de7))$lightSys[_0x214d5a(0x22f)](_0x183f26,_0x2dbbdb,_[_0x214d5a(0x2c5)]['get'](_0x453de7));}const _0x5e1fc4=this[_0x214d5a(0x2af)](_0x183f26,_0x2dbbdb);if(_0x5e1fc4){if(_[_0x214d5a(0x203)]['has'](_0x5e1fc4))$lightSys['addMapLight'](_0x183f26,_0x2dbbdb,_[_0x214d5a(0x203)]['get'](_0x5e1fc4));if(_[_0x214d5a(0x1fb)][_0x214d5a(0x2cc)](_0x5e1fc4))$lightSys[_0x214d5a(0x22f)](_0x183f26,_0x2dbbdb,_[_0x214d5a(0x1fb)][_0x214d5a(0x297)](_0x5e1fc4));}};};},Game_Event[_0x1ecb36(0x2b8)]['dae_setupPage']=Game_Event['prototype'][_0x1ecb36(0x272)],Game_Event[_0x1ecb36(0x2b8)][_0x1ecb36(0x272)]=function(){const _0x320d6c=_0x1ecb36;this['_pageLights']&&this['_pageLights'][_0x320d6c(0x224)](_0x211750=>{const _0x3a499f=_0x320d6c;$lightSys[_0x3a499f(0x1f2)](_0x211750);});this[_0x320d6c(0x242)]=[],this[_0x320d6c(0x24c)]();if(this[_0x320d6c(0x200)]<0x0||!$lightSys)return;let _0x33f91a=this[_0x320d6c(0x216)](),_0x5d7ef5=_0x33f91a[_0x320d6c(0x21a)];if(_0x5d7ef5)for(var _0x406bd6=0x0;_0x406bd6<_0x5d7ef5[_0x320d6c(0x292)];_0x406bd6++){if(_0x5d7ef5[_0x406bd6]&&(_0x5d7ef5[_0x406bd6][_0x320d6c(0x278)]==0x6c||_0x5d7ef5[_0x406bd6][_0x320d6c(0x278)]==0x198)){var _0x1f2f5e=_0x5d7ef5[_0x406bd6]['parameters'][0x0],_0x4c6c4d;if(_0x4c6c4d=_0x1f2f5e[_0x320d6c(0x266)](_['COMMENT_REG']))this[_0x320d6c(0x279)](_0x4c6c4d);}}},Game_Event[_0x1ecb36(0x2b8)]['checkComment']=function(_0x4446ce){const _0x1b8143=_0x1ecb36;let _0x2d0f96=_0x4446ce[0x2];if(_0x2d0f96==_0x1b8143(0x1ec))_0x2d0f96=null;let _0xd387e;switch(_0x4446ce[0x1][_0x1b8143(0x2de)]()){case _0x1b8143(0x26b):var _0x36522e=_0x4446ce[0x3];_0xd387e=new Sprite_Light(this,_0x2d0f96,_0x36522e);let _0x19eb14=$lightSys['addLight'](_0xd387e,_0x2d0f96);this[_0x1b8143(0x242)][_0x1b8143(0x246)](_0x19eb14);break;case _0x1b8143(0x2bb):let _0x123b61=Number(_0x4446ce[0x3]),_0x50de7d=Number(_0x4446ce[0x4]);_0xd387e=$lightSys['getLight'](_0x2d0f96,!![]);if(_0xd387e)_0xd387e[_0x1b8143(0x257)](_0x123b61,_0x50de7d);break;case _0x1b8143(0x1fa):let _0x35d56f={'R':_0x4446ce[0x3],'G':_0x4446ce[0x4],'B':_0x4446ce[0x5]};_0xd387e=$lightSys['getLight'](_0x2d0f96,!![]);if(_0xd387e)_0xd387e[_0x1b8143(0x1ed)](_0x35d56f);break;case _0x1b8143(0x23c):const _0x2f53c2=Number(_0x4446ce[0x3]);_0xd387e=$lightSys[_0x1b8143(0x280)](_0x2d0f96,!![]);if(_0xd387e)_0xd387e[_0x1b8143(0x1ff)](_0x2f53c2);break;case _0x1b8143(0x269):let _0x117fb1=Number(_0x4446ce[0x3]);_0xd387e=$lightSys[_0x1b8143(0x280)](_0x2d0f96,!![]);if(_0xd387e)_0xd387e[_0x1b8143(0x2ab)](_0x117fb1);break;case _0x1b8143(0x29c):let _0x39ca1c=Number(_0x4446ce[0x3]);_0xd387e=$lightSys[_0x1b8143(0x280)](_0x2d0f96,!![]);if(_0xd387e)_0xd387e[_0x1b8143(0x1ed)](_0xd387e[_0x1b8143(0x2ae)],_0x39ca1c);break;case'setrotation/f':let _0x228db4=Number(_0x4446ce[0x3]);_0xd387e=$lightSys[_0x1b8143(0x280)](_0x2d0f96,!![]);if(_0xd387e)_0xd387e[_0x1b8143(0x282)]=_0x228db4;break;}},Game_CharacterBase[_0x1ecb36(0x2b8)]['addLight']=function(_0xa3efad){const _0x3ce074=_0x1ecb36;if(!this[_0x3ce074(0x21b)])this[_0x3ce074(0x21b)]=[];this[_0x3ce074(0x21b)][_0x3ce074(0x246)](_0xa3efad);};const _Game_CharacterBase_setDirection=Game_CharacterBase['prototype']['setDirection'];Game_CharacterBase[_0x1ecb36(0x2b8)][_0x1ecb36(0x2c8)]=function(_0x125903){const _0x230785=_0x1ecb36;_Game_CharacterBase_setDirection['call'](this,_0x125903);if(!this[_0x230785(0x21b)])return;const _0x4912bc=this[_0x230785(0x2b7)]();this[_0x230785(0x21b)][_0x230785(0x224)](_0x4d846e=>{const _0x485104=_0x230785;if(_0x4d846e['autoRotate'])_0x4d846e[_0x485104(0x268)](_0x4912bc);if(!_0x4d846e['autoRotateOffset']){const _0x45f57c=_0x4d846e[_0x485104(0x24b)][this[_0x485104(0x276)]()];console[_0x485104(0x230)](_0x45f57c,_0x4d846e[_0x485104(0x24b)]),_0x4d846e[_0x485104(0x257)](_0x45f57c['x'],_0x45f57c['y']);}});},Game_CharacterBase['prototype'][_0x1ecb36(0x2b7)]=function(){const _0x16d941=_0x1ecb36;switch(this[_0x16d941(0x276)]()){case 0x2:return 0x10e;case 0x4:return 0xb4;case 0x6:return 0x0;case 0x8:return 0x5a;}return 0x0;};function System_Lights(){const _0x571626=_0x1ecb36;this[_0x571626(0x258)]['apply'](this,arguments);};System_Lights[_0x1ecb36(0x2b8)]['initialize']=function(){const _0x88f6d9=_0x1ecb36;this[_0x88f6d9(0x2b5)]=0x0,this[_0x88f6d9(0x285)]=new Map(),this[_0x88f6d9(0x23a)]=new Map(),this[_0x88f6d9(0x2d2)]=new Map(),this[_0x88f6d9(0x267)]=[],this['pendingLights']=[],this[_0x88f6d9(0x24a)]=new Sprite_ShadowMap(),this[_0x88f6d9(0x2b9)]=null,this['turnedOn']=!![],this[_0x88f6d9(0x252)]({'R':0x14,'G':0x14,'B':0x14});},System_Lights['prototype']['setAmbientLight']=function(_0xfa4b9c){const _0x2d6c16=_0x1ecb36;this[_0x2d6c16(0x28b)]=_0xfa4b9c;if(this[_0x2d6c16(0x2b9)])this[_0x2d6c16(0x2b9)][_0x2d6c16(0x252)](_0xfa4b9c);},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x1f7)]=function(){const _0x6ed5d9=_0x1ecb36;this['uniqueLights'][_0x6ed5d9(0x296)](),this[_0x6ed5d9(0x23a)][_0x6ed5d9(0x296)](),this['lights'][_0x6ed5d9(0x296)](),this['mapLights']=[],this[_0x6ed5d9(0x2a8)]=[],this[_0x6ed5d9(0x24a)]=new Sprite_ShadowMap(),this['display']=null,this[_0x6ed5d9(0x2cb)]=!![];},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x2cd)]=function(){const _0x454da5=_0x1ecb36;if(!this['turnedOn'])return;if(!this[_0x454da5(0x2b9)])return;this['shadowMap'][_0x454da5(0x2cd)]();for(let [_0x39329d,_0x576bdd]of this[_0x454da5(0x2d2)])_0x576bdd[_0x454da5(0x2cd)]();for(let _0x50ba39 of this[_0x454da5(0x267)])_0x50ba39[_0x454da5(0x2cd)]();this[_0x454da5(0x2b9)][_0x454da5(0x2cd)]();},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x26f)]=function(_0x5ae159,_0xfe5025=null){const _0x25045f=_0x1ecb36;let _0x38edac=++this[_0x25045f(0x2b5)];this['lights'][_0x25045f(0x265)](_0x38edac,_0x5ae159);if(_0xfe5025)this['addUniqueLight'](_0xfe5025,_0x38edac);return this[_0x25045f(0x228)](_0x5ae159),_0x38edac;},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x228)]=function(_0x3c5e05){const _0xcc2a3a=_0x1ecb36;if(this[_0xcc2a3a(0x2b9)])this[_0xcc2a3a(0x2b9)][_0xcc2a3a(0x26f)](_0x3c5e05);else this[_0xcc2a3a(0x2a8)][_0xcc2a3a(0x246)](_0x3c5e05);},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x2d7)]=function(){const _0x234fa6=_0x1ecb36;if(!this[_0x234fa6(0x2b9)])return;for(let [_0x551330,_0x4cc9a1]of this[_0x234fa6(0x2d2)])this['addLightToDisplay'](_0x4cc9a1);for(let _0x406d8b of this[_0x234fa6(0x267)])this[_0x234fa6(0x228)](_0x406d8b);},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x21e)]=function(_0x3e4554,_0x5c699d){const _0x2849fa=_0x1ecb36;this[_0x2849fa(0x285)]['set'](_0x3e4554,_0x5c699d),this[_0x2849fa(0x23a)][_0x2849fa(0x265)](_0x5c699d,_0x3e4554);},System_Lights['prototype'][_0x1ecb36(0x2b6)]=function(_0x18b042=null,_0x4b3daf=null){const _0xbb4c95=_0x1ecb36;if(!_0x18b042&&!_0x4b3daf)console[_0xbb4c95(0x2c0)](_0xbb4c95(0x233));if(!_0x18b042){if(!this[_0xbb4c95(0x23a)][_0xbb4c95(0x2cc)](_0x4b3daf))return;_0x18b042=this['uniqueLightsReverseMap'][_0xbb4c95(0x297)](_0x4b3daf);}!_0x4b3daf&&(_0x4b3daf=this['uniqueLights'][_0xbb4c95(0x297)](_0x18b042)),this[_0xbb4c95(0x285)]['delete'](_0x18b042),this[_0xbb4c95(0x23a)]['delete'](_0x4b3daf);},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x1f2)]=function(_0xd2c237,_0x1dfdb2=![]){const _0x5c5fe2=_0x1ecb36;if(_0x1dfdb2){let _0x10c86e=_0xd2c237;_0xd2c237=this['uniqueLights']['get'](_0x10c86e),this['deleteUniqueLight'](_0x10c86e,_0xd2c237);}else this[_0x5c5fe2(0x2b6)](null,_0xd2c237);if(!this[_0x5c5fe2(0x2d2)][_0x5c5fe2(0x2cc)](_0xd2c237))return;let _0x3337c2=this['lights'][_0x5c5fe2(0x297)](_0xd2c237);this[_0x5c5fe2(0x2b9)][_0x5c5fe2(0x2bf)](_0x3337c2),this[_0x5c5fe2(0x2d2)][_0x5c5fe2(0x288)](_0xd2c237);},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x280)]=function(_0x3fdbc1,_0x4e0023=![]){const _0x49088a=_0x1ecb36;if(_0x4e0023)_0x3fdbc1=this['uniqueLights'][_0x49088a(0x297)](_0x3fdbc1);if(this[_0x49088a(0x2d2)]['has'](_0x3fdbc1))return this['lights'][_0x49088a(0x297)](_0x3fdbc1);return null;},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x213)]=function(){const _0x58c9bb=_0x1ecb36;let _0x314f70=this[_0x58c9bb(0x2a8)][_0x58c9bb(0x2ba)]();return this['pendingLights']=[],_0x314f70;},System_Lights[_0x1ecb36(0x2b8)]['addMapLight']=function(_0x2adcd6,_0x43adc2,_0xf3a5ee){const _0x38e3fc=_0x1ecb36,_0x1627d3=new Sprite_MapLight(_0x2adcd6,_0x43adc2,_0xf3a5ee);this[_0x38e3fc(0x267)][_0x38e3fc(0x246)](_0x1627d3),this['addLightToDisplay'](_0x1627d3);},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x22f)]=function(_0x446832,_0xfacd1f,_0x285e45){const _0x441948=_0x1ecb36;_0x285e45[_0x441948(0x24d)]['forEach'](_0x18d7a3=>{const _0x3447fa=_0x441948;this['shadowMap'][_0x3447fa(0x25b)](_0x446832,_0xfacd1f,_0x18d7a3);},this);},System_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x208)]=function(_0x2fe15b){const _0x47bab8=_0x1ecb36;this[_0x47bab8(0x24a)][_0x47bab8(0x208)](_0x2fe15b);},System_Lights['prototype'][_0x1ecb36(0x1f9)]=function(_0x145791){const _0x31734f=_0x1ecb36;if(_0x145791[_0x31734f(0x27b)])return _0x145791[_0x31734f(0x27b)];const _0x56fd41=new PIXI[(_0x31734f(0x289))]['from'](_0x145791['file']);return _0x145791['texture']=_0x56fd41,_0x56fd41;},_[_0x1ecb36(0x1fe)]=System_Lights;function Display_Lights(){const _0x321934=_0x1ecb36;this[_0x321934(0x258)]['apply'](this,arguments);};Display_Lights[_0x1ecb36(0x2b8)]['initialize']=function(_0x44239f){const _0x328c9d=_0x1ecb36;if(!$lightSys[_0x328c9d(0x2cb)])return;$lightSys[_0x328c9d(0x2b9)]=this,this[_0x328c9d(0x2db)]=_0x44239f,this[_0x328c9d(0x29b)]=new Filter_MapLighting(),this[_0x328c9d(0x22d)]=new Container_Lights(),this[_0x328c9d(0x28c)]=new PIXI['RenderTexture'][(_0x328c9d(0x20d))](Graphics['width'],Graphics[_0x328c9d(0x206)]),this[_0x328c9d(0x237)]=new PIXI[(_0x328c9d(0x27c))](this[_0x328c9d(0x28c)]),this['_lightMapSprite'][_0x328c9d(0x21d)]=[this[_0x328c9d(0x29b)]];if(this[_0x328c9d(0x2db)][_0x328c9d(0x28d)])this[_0x328c9d(0x2db)][_0x328c9d(0x28d)][_0x328c9d(0x2da)](this[_0x328c9d(0x237)]);$lightSys[_0x328c9d(0x2d7)]();var _0x46d324=$lightSys[_0x328c9d(0x213)]();_0x46d324&&_0x46d324['forEach'](_0x1a4da6=>{const _0x582e13=_0x328c9d;this[_0x582e13(0x26f)](_0x1a4da6);}),this['setAmbientLight']($lightSys[_0x328c9d(0x28b)]);},Display_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x252)]=function(_0x327913){const _0x38ee98=_0x1ecb36;this[_0x38ee98(0x29b)][_0x38ee98(0x2b2)]['ambient_light']=[_0x327913['R']/0xff,_0x327913['G']/0xff,_0x327913['B']/0xff,0x1];},Display_Lights['prototype'][_0x1ecb36(0x2cd)]=function(){const _0x52c364=_0x1ecb36;if(!this[_0x52c364(0x2db)])return;Graphics[_0x52c364(0x2ca)]['renderer'][_0x52c364(0x2c1)](this[_0x52c364(0x22d)],this['_lightMapTexture']);},Display_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x26f)]=function(_0x1c5e3f){const _0x248531=_0x1ecb36;this['_lightsContainer'][_0x248531(0x2da)](_0x1c5e3f);},Display_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x2bf)]=function(_0x23fc38){const _0x78f35=_0x1ecb36;this[_0x78f35(0x22d)]['removeChild'](_0x23fc38);};function Container_Lights(){const _0x3c4286=_0x1ecb36;this[_0x3c4286(0x258)][_0x3c4286(0x287)](this,arguments);}Container_Lights[_0x1ecb36(0x2b8)]=Object[_0x1ecb36(0x20d)](PIXI[_0x1ecb36(0x28f)][_0x1ecb36(0x2b8)]),Container_Lights['prototype']['constructor']=Container_Lights,Container_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x258)]=function(){const _0xde02ed=_0x1ecb36;PIXI['Container'][_0xde02ed(0x20a)](this),this[_0xde02ed(0x2c2)]=PIXI[_0xde02ed(0x264)]['DAE_LIGHT'],this[_0xde02ed(0x21d)]=[new Filter_LightsContainer()];},Container_Lights[_0x1ecb36(0x2b8)][_0x1ecb36(0x26f)]=function(_0x942bdd){const _0x561cd4=_0x1ecb36;this[_0x561cd4(0x2da)](_0x942bdd);};function Sprite_ShadowMap(){this['initialize']['apply'](this,arguments);}function _0x278b(_0x2413d0,_0x3be57b){const _0x5bf62b=_0x5bf6();return _0x278b=function(_0x278bbd,_0x50e459){_0x278bbd=_0x278bbd-0x1ec;let _0x2f7569=_0x5bf62b[_0x278bbd];return _0x2f7569;},_0x278b(_0x2413d0,_0x3be57b);}Sprite_ShadowMap[_0x1ecb36(0x2b8)]=Object[_0x1ecb36(0x20d)](PIXI[_0x1ecb36(0x27c)][_0x1ecb36(0x2b8)]),Sprite_ShadowMap[_0x1ecb36(0x2b8)][_0x1ecb36(0x251)]=Sprite_ShadowMap,Sprite_ShadowMap[_0x1ecb36(0x2b8)][_0x1ecb36(0x258)]=function(){const _0x39f0cf=_0x1ecb36;var _0x3dcb3e=new PIXI[(_0x39f0cf(0x223))]['create'](0x22*0x30,0x27*0x30);PIXI[_0x39f0cf(0x27c)][_0x39f0cf(0x20a)](this,_0x3dcb3e),this[_0x39f0cf(0x254)]=_0x3dcb3e,this[_0x39f0cf(0x291)]=[],this['_shadowsContainer']=new PIXI[(_0x39f0cf(0x28f))](),this[_0x39f0cf(0x212)]=new PIXI[(_0x39f0cf(0x2aa))](),this[_0x39f0cf(0x262)](this[_0x39f0cf(0x212)]);var _0x53269f=new PIXI[(_0x39f0cf(0x2aa))]();_0x53269f[_0x39f0cf(0x219)](0x0),this[_0x39f0cf(0x262)](_0x53269f);},Sprite_ShadowMap[_0x1ecb36(0x2b8)][_0x1ecb36(0x25b)]=function(_0x1fb2e8,_0x196255,_0x272648){const _0x8ffbc8=_0x1ecb36;this['_mapGraphics']['beginFill'](0x0),this['_mapGraphics'][_0x8ffbc8(0x275)](_0x1fb2e8*0x30+_0x272648[0x0],_0x196255*0x30+_0x272648[0x1],_0x272648[0x2],_0x272648[0x3]);},Sprite_ShadowMap[_0x1ecb36(0x2b8)][_0x1ecb36(0x262)]=function(_0x46e96d){const _0x211728=_0x1ecb36;this[_0x211728(0x291)]['push'](_0x46e96d),this[_0x211728(0x29f)][_0x211728(0x2da)](_0x46e96d);},Sprite_ShadowMap['prototype'][_0x1ecb36(0x2cd)]=function(){const _0x8254eb=_0x1ecb36;Graphics[_0x8254eb(0x2ca)][_0x8254eb(0x2d0)][_0x8254eb(0x2c1)](this[_0x8254eb(0x29f)],this[_0x8254eb(0x254)]);},Sprite_ShadowMap[_0x1ecb36(0x2b8)][_0x1ecb36(0x208)]=function(_0xc93a56){const _0xf9e51f=_0x1ecb36;this[_0xf9e51f(0x22c)]=new PIXI[(_0xf9e51f(0x27c))][(_0xf9e51f(0x263))](_0xf9e51f(0x240)+_0xc93a56+_0xf9e51f(0x27d)),this[_0xf9e51f(0x262)](this[_0xf9e51f(0x22c)]);};function Sprite_Light(){const _0x5641ff=_0x1ecb36;this['initialize'][_0x5641ff(0x287)](this,arguments);}Sprite_Light[_0x1ecb36(0x2b8)]=Object['create'](PIXI[_0x1ecb36(0x27c)][_0x1ecb36(0x2b8)]),Sprite_Light[_0x1ecb36(0x2b8)]['constructor']=Sprite_Light,Sprite_Light['prototype'][_0x1ecb36(0x258)]=function(_0xd33df2,_0x1b2c8a,_0x365f52){const _0xbc296f=_0x1ecb36;var _0x1849ea=new PIXI[(_0xbc296f(0x223))][(_0xbc296f(0x20d))](0x80,0x80);PIXI[_0xbc296f(0x27c)][_0xbc296f(0x20a)](this,_0x1849ea),this[_0xbc296f(0x254)]=_0x1849ea,this[_0xbc296f(0x2a0)]=new PIXI[(_0xbc296f(0x223))]['create'](0x80,0x80),this['_uniqueId']=_0x1b2c8a,this[_0xbc296f(0x259)]=_0x365f52,this[_0xbc296f(0x21f)]=_0xd33df2;this[_0xbc296f(0x21f)]&&this[_0xbc296f(0x21f)][_0xbc296f(0x26f)](this);;this[_0xbc296f(0x226)]=new PIXI[(_0xbc296f(0x27a))](0x0,0x0),this['manualOffset']=new PIXI[(_0xbc296f(0x27a))](0x0,0x0),this['autoOffset']=new PIXI['Point'](0x0,0x0),this['lightRotation']=0x0,this[_0xbc296f(0x23e)]=0x168,this[_0xbc296f(0x282)]=0x0,this[_0xbc296f(0x2dd)]=0x0,this[_0xbc296f(0x290)]=new PIXI[(_0xbc296f(0x2aa))](),this[_0xbc296f(0x290)][_0xbc296f(0x275)](0x0,0x0,0x20,0x20),this[_0xbc296f(0x290)][_0xbc296f(0x21d)]=[new Raytrace_Filter()],this[_0xbc296f(0x1ee)]=new PIXI[(_0xbc296f(0x2aa))](),this[_0xbc296f(0x1ee)]['drawRect'](0x0,0x0,0x100,0x100),this[_0xbc296f(0x1ee)][_0xbc296f(0x21d)]=[new Light_Filter()],this['_raySprite'][_0xbc296f(0x21d)][0x0][_0xbc296f(0x28a)]=this[_0xbc296f(0x1ee)][_0xbc296f(0x21d)][0x0],this['setType'](_0x365f52),this['blendMode']=PIXI[_0xbc296f(0x264)]['ADD'];},Sprite_Light['prototype']['setAngle']=function(_0x322deb){const _0x230eb6=_0x1ecb36;this['lightAngle']=_0x322deb,this[_0x230eb6(0x1f4)]();},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x268)]=function(_0x655ec1){const _0x3c1689=_0x1ecb36;this[_0x3c1689(0x1ef)]=_0x655ec1,this[_0x3c1689(0x225)]();},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x1ff)]=function(_0x1a28f6){const _0x4ca1e3=_0x1ecb36;this[_0x4ca1e3(0x295)]=_0x1a28f6,this[_0x4ca1e3(0x1ef)]=_0x1a28f6,this[_0x4ca1e3(0x2dd)]=0x0,this[_0x4ca1e3(0x225)]();},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x225)]=function(){const _0x4ce200=_0x1ecb36;this[_0x4ce200(0x295)]=this['lightRotationOrigin']+this[_0x4ce200(0x2dd)];if(this[_0x4ce200(0x214)]){const _0x2375e0=this[_0x4ce200(0x295)]*Math['PI']/0xb4,_0x420fdf=-Math[_0x4ce200(0x220)](_0x2375e0),_0x15677d=Math[_0x4ce200(0x25a)](_0x2375e0),_0x1280ec=this[_0x4ce200(0x226)]['x'],_0x4967af=this[_0x4ce200(0x226)]['y'];this[_0x4ce200(0x2a5)]['x']=_0x1280ec*_0x15677d-_0x4967af*_0x420fdf,this[_0x4ce200(0x2a5)]['y']=_0x1280ec*_0x420fdf+_0x4967af*_0x15677d;}this['refreshAngles']();},Sprite_Light['prototype'][_0x1ecb36(0x1f4)]=function(){const _0x36b6d1=_0x1ecb36,_0xda85b2=(this[_0x36b6d1(0x295)]-this['lightAngle']/0x2+0x168)%0x168,_0x4ab758=(this[_0x36b6d1(0x295)]+this[_0x36b6d1(0x23e)]/0x2+0x168)%0x168;this[_0x36b6d1(0x1ee)][_0x36b6d1(0x21d)][0x0][_0x36b6d1(0x2b2)][_0x36b6d1(0x271)]=[_0xda85b2,_0x4ab758],this[_0x36b6d1(0x1ee)]['filters'][0x0]['uniforms']['light_rotation']=this[_0x36b6d1(0x295)];},Sprite_Light[_0x1ecb36(0x2b8)]['setType']=function(_0x46a3e3){const _0xa6f6a=_0x1ecb36;this[_0xa6f6a(0x259)]=_0x46a3e3;if(!_[_0xa6f6a(0x2a9)][_0xa6f6a(0x2cc)](_0x46a3e3)){console[_0xa6f6a(0x2c0)]('Light\x20type\x20\x27'+_0x46a3e3+_0xa6f6a(0x222));return;}this[_0xa6f6a(0x273)]=_['LIGHT_TYPES'][_0xa6f6a(0x297)](_0x46a3e3),this['setRadius'](Number(this[_0xa6f6a(0x273)]['Radius']||0x0)),this[_0xa6f6a(0x1fd)](this['lightType']['Light\x20Image\x20ID']),this[_0xa6f6a(0x257)](Number(this[_0xa6f6a(0x273)][_0xa6f6a(0x299)]),Number(this[_0xa6f6a(0x273)][_0xa6f6a(0x2d6)])),this['variation']=Number(this['lightType'][_0xa6f6a(0x1f8)]),this['intensity']=Number(this['lightType'][_0xa6f6a(0x20b)]),this['dirOffsets']=this['lightType']['Custom\x20directional\x20offsets'],this['_baseIntensity']=this[_0xa6f6a(0x20b)],this[_0xa6f6a(0x2ae)]=this[_0xa6f6a(0x273)][_0xa6f6a(0x202)],this[_0xa6f6a(0x2ab)](Number(this['lightType'][_0xa6f6a(0x293)]||0x168)),this[_0xa6f6a(0x1ff)](Number(this[_0xa6f6a(0x273)]['Rotation']||0x0)),this[_0xa6f6a(0x282)]=Number(this[_0xa6f6a(0x273)]['Rot/f']||0x0),this['autoRotate']=Boolean(this[_0xa6f6a(0x273)][_0xa6f6a(0x2b1)]===_0xa6f6a(0x1f6)||![]),this['autoRotateOffset']=Boolean(this[_0xa6f6a(0x273)]['Auto-rotate\x20Manual-offset']===_0xa6f6a(0x1f6)||![]);if(this[_0xa6f6a(0x2d4)]&&this[_0xa6f6a(0x21f)])this[_0xa6f6a(0x1ff)](this['lightParent'][_0xa6f6a(0x2b7)]());if(!this[_0xa6f6a(0x214)]&&this[_0xa6f6a(0x21f)]){const _0x4eb768=this[_0xa6f6a(0x24b)][this[_0xa6f6a(0x21f)][_0xa6f6a(0x276)]()];this[_0xa6f6a(0x257)](_0x4eb768['x'],_0x4eb768['y']);}this[_0xa6f6a(0x1ed)](),this[_0xa6f6a(0x2ac)]();},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x20c)]=function(_0x320787){const _0x19deee=_0x1ecb36;if(this[_0x19deee(0x236)]==_0x320787)return;this[_0x19deee(0x236)]=_0x320787||this['radius'],this[_0x19deee(0x2d3)]();},Sprite_Light['prototype'][_0x1ecb36(0x1fd)]=function(_0x23cb60){const _0x1148f7=_0x1ecb36;!_[_0x1148f7(0x211)][_0x1148f7(0x2cc)](_0x23cb60)&&(console['error'](_0x1148f7(0x26d)+_0x23cb60+_0x1148f7(0x222)),_0x23cb60=_0x1148f7(0x21c));const _0x16f2be=_[_0x1148f7(0x211)][_0x1148f7(0x297)](_0x23cb60);this[_0x1148f7(0x2d5)]=_0x23cb60,this['image']=_0x16f2be;const _0x2c9628=$lightSys[_0x1148f7(0x1f9)](_0x16f2be);if(_0x16f2be[_0x1148f7(0x26c)]>0x0&&_0x16f2be[_0x1148f7(0x206)]>0x0)this[_0x1148f7(0x1ee)][_0x1148f7(0x21d)][0x0][_0x1148f7(0x2b2)]['in_LightImageSize']=[0x1/_0x16f2be[_0x1148f7(0x26c)],0x1/_0x16f2be[_0x1148f7(0x206)]];this[_0x1148f7(0x1ee)][_0x1148f7(0x21d)][0x0][_0x1148f7(0x2b2)]['in_LightImage']=_0x2c9628;},Sprite_Light['prototype']['setColors']=function(_0x45b1ca=this[_0x1ecb36(0x2ae)],_0x4c70ed=this[_0x1ecb36(0x20b)]){const _0x3e6aa0=_0x1ecb36;this[_0x3e6aa0(0x2ae)]=_0x45b1ca||this['colors'],this['intensity']=_0x4c70ed||this[_0x3e6aa0(0x20b)],this[_0x3e6aa0(0x217)]=this['intensity'],this[_0x3e6aa0(0x2bc)]();},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x257)]=function(_0x4afd93,_0x7d982c){const _0x5df657=_0x1ecb36;this[_0x5df657(0x2a5)][_0x5df657(0x265)](_0x4afd93,_0x7d982c),this['og_manualOffset']=this[_0x5df657(0x2a5)][_0x5df657(0x2ba)]();},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x2bc)]=function(){const _0x213569=_0x1ecb36;let _0x5d3888=this[_0x213569(0x2ae)],_0x1a91fd=this[_0x213569(0x20b)]/0xc8,_0x55723c=Number(_0x5d3888['R']),_0x421eb0=Number(_0x5d3888['G']),_0x3c34ef=Number(_0x5d3888['B']);_0x55723c/=0xff,_0x421eb0/=0xff,_0x3c34ef/=0xff,(_0x55723c*=_0x1a91fd,_0x421eb0*=_0x1a91fd,_0x3c34ef*=_0x1a91fd),this[_0x213569(0x1ee)]['filters'][0x0][_0x213569(0x2b2)][_0x213569(0x243)]=[_0x55723c,_0x421eb0,_0x3c34ef];},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x2ac)]=function(){const _0x265693=_0x1ecb36;var _0x3e7d1d=this['radius']-0x18;this[_0x265693(0x229)]['set'](-_0x3e7d1d,-_0x3e7d1d);},Sprite_Light[_0x1ecb36(0x2b8)][_0x1ecb36(0x2d3)]=function(){const _0x18afa9=_0x1ecb36;var _0xb1b54d=this[_0x18afa9(0x236)];let _0x4540e0=Math[_0x18afa9(0x247)](0x2,Math[_0x18afa9(0x248)](Math[_0x18afa9(0x27e)](Math[_0x18afa9(0x235)](0x2*Math['PI']*_0xb1b54d)))+0x1);this['_raySprite']['clear'](),this[_0x18afa9(0x290)][_0x18afa9(0x275)](0x0,0x0,_0x4540e0,_0x4540e0);let _0x334a2b=Math[_0x18afa9(0x247)](0x2,Math[_0x18afa9(0x248)](Math[_0x18afa9(0x27e)](_0xb1b54d*0x2)));this[_0x18afa9(0x1ee)][_0x18afa9(0x296)](),this['_lightSprite']['drawRect'](0x0,0x0,_0x334a2b,_0x334a2b),this['_renderTexture'][_0x18afa9(0x274)](_0x334a2b,_0x334a2b),this[_0x18afa9(0x2a0)][_0x18afa9(0x274)](_0x4540e0,_0x4540e0),this[_0x18afa9(0x290)]['filters'][0x0][_0x18afa9(0x2b2)][_0x18afa9(0x22e)]=_0x4540e0,this[_0x18afa9(0x1ee)][_0x18afa9(0x21d)][0x0]['uniforms'][_0x18afa9(0x22e)]=_0x4540e0,this[_0x18afa9(0x1ee)][_0x18afa9(0x21d)][0x0]['uniforms'][_0x18afa9(0x26a)]=_0x334a2b,this[_0x18afa9(0x1ee)][_0x18afa9(0x21d)][0x0][_0x18afa9(0x2b2)][_0x18afa9(0x2a1)]=[_0xb1b54d,_0xb1b54d],this[_0x18afa9(0x2ac)]();},Sprite_Light[_0x1ecb36(0x2b8)]['refreshIntensity']=function(){const _0x20368d=_0x1ecb36;if(!this['variation'])return;this[_0x20368d(0x20b)]=this['_baseIntensity']+Math[_0x20368d(0x2b3)](this[_0x20368d(0x1f8)]+0x1),this[_0x20368d(0x2bc)]();},Sprite_Light['prototype'][_0x1ecb36(0x23b)]=function(){const _0x1a4f37=_0x1ecb36;if(!this[_0x1a4f37(0x21f)])return;this['x']=$gameMap[_0x1a4f37(0x27f)](this[_0x1a4f37(0x21f)][_0x1a4f37(0x255)])*$gameMap['tileWidth']()+this[_0x1a4f37(0x229)]['x']+this[_0x1a4f37(0x2a5)]['x'],this['y']=$gameMap['adjustY'](this['lightParent'][_0x1a4f37(0x245)])*$gameMap[_0x1a4f37(0x24f)]()+this[_0x1a4f37(0x229)]['y']+this[_0x1a4f37(0x2a5)]['y'];var _0x57b021=this[_0x1a4f37(0x21f)][_0x1a4f37(0x255)]*$gameMap[_0x1a4f37(0x1f0)]()+$gameMap[_0x1a4f37(0x1f0)]()/0x2+this[_0x1a4f37(0x2a5)]['x'],_0x19a946=this[_0x1a4f37(0x21f)][_0x1a4f37(0x245)]*$gameMap[_0x1a4f37(0x24f)]()+$gameMap[_0x1a4f37(0x24f)]()/0x2+this[_0x1a4f37(0x2a5)]['y'],_0x997884=[_0x57b021,_0x19a946,this[_0x1a4f37(0x236)]];this[_0x1a4f37(0x290)][_0x1a4f37(0x21d)][0x0][_0x1a4f37(0x2b2)][_0x1a4f37(0x277)]=_0x997884,this[_0x1a4f37(0x1ee)][_0x1a4f37(0x21d)][0x0]['uniforms']['in_Light']=_0x997884;},Sprite_Light[_0x1ecb36(0x2b8)]['refreshRotation']=function(){const _0x12ec2b=_0x1ecb36;if(!this[_0x12ec2b(0x282)])return;this['deltaRotationTotal']+=this[_0x12ec2b(0x282)]+0x168,this[_0x12ec2b(0x2dd)]%=0x168,this[_0x12ec2b(0x225)]();},Sprite_Light['prototype'][_0x1ecb36(0x2cd)]=function(){const _0x570d74=_0x1ecb36;this[_0x570d74(0x244)](),this[_0x570d74(0x23b)](),this[_0x570d74(0x294)](),Graphics[_0x570d74(0x2ca)][_0x570d74(0x2d0)][_0x570d74(0x2c1)](this['_raySprite'],this[_0x570d74(0x2a0)]),Graphics[_0x570d74(0x2ca)][_0x570d74(0x2d0)]['render'](this[_0x570d74(0x1ee)],this['_renderTexture']);},_[_0x1ecb36(0x23d)]=Sprite_Light;function Sprite_MapLight(){const _0x17016d=_0x1ecb36;this[_0x17016d(0x258)][_0x17016d(0x287)](this,arguments);}Sprite_MapLight['prototype']=Object[_0x1ecb36(0x20d)](Sprite_Light['prototype']),Sprite_MapLight[_0x1ecb36(0x2b8)][_0x1ecb36(0x251)]=Sprite_MapLight,Sprite_MapLight[_0x1ecb36(0x2b8)][_0x1ecb36(0x258)]=function(_0x371921,_0x46a456,_0x2448a4){const _0x3b0259=_0x1ecb36;this['_mapX']=_0x371921,this[_0x3b0259(0x218)]=_0x46a456,Sprite_Light['prototype'][_0x3b0259(0x258)][_0x3b0259(0x20a)](this,null,null,_0x2448a4[_0x3b0259(0x261)]);},Sprite_MapLight[_0x1ecb36(0x2b8)][_0x1ecb36(0x23b)]=function(){const _0x4770fb=_0x1ecb36;this['x']=$gameMap[_0x4770fb(0x27f)](this['_mapX'])*$gameMap[_0x4770fb(0x1f0)]()+this['autoOffset']['x']+this[_0x4770fb(0x2a5)]['x'],this['y']=$gameMap[_0x4770fb(0x2b0)](this[_0x4770fb(0x218)])*$gameMap[_0x4770fb(0x24f)]()+this[_0x4770fb(0x229)]['y']+this[_0x4770fb(0x2a5)]['y'];var _0x44ad14=this['_mapX']*$gameMap[_0x4770fb(0x1f0)]()+$gameMap[_0x4770fb(0x1f0)]()/0x2+this['manualOffset']['x'],_0x56653e=this[_0x4770fb(0x218)]*$gameMap[_0x4770fb(0x24f)]()+$gameMap[_0x4770fb(0x24f)]()/0x2+this[_0x4770fb(0x2a5)]['y'],_0x19055e=[_0x44ad14,_0x56653e,this[_0x4770fb(0x236)]];this[_0x4770fb(0x290)][_0x4770fb(0x21d)][0x0][_0x4770fb(0x2b2)][_0x4770fb(0x277)]=_0x19055e,this[_0x4770fb(0x1ee)][_0x4770fb(0x21d)][0x0][_0x4770fb(0x2b2)][_0x4770fb(0x277)]=_0x19055e;};function Filter_LightsContainer(){const _0x17dee3=_0x1ecb36;this[_0x17dee3(0x258)][_0x17dee3(0x287)](this,arguments);};Filter_LightsContainer[_0x1ecb36(0x2b8)]=Object[_0x1ecb36(0x20d)](PIXI[_0x1ecb36(0x2c3)][_0x1ecb36(0x2b8)]),Filter_LightsContainer[_0x1ecb36(0x2b8)]['constructor']=Filter_LightsContainer,Filter_LightsContainer[_0x1ecb36(0x2b8)][_0x1ecb36(0x258)]=function(){const _0x53ed7b=_0x1ecb36;PIXI['Filter'][_0x53ed7b(0x20a)](this,null,null),this[_0x53ed7b(0x2c2)]=PIXI[_0x53ed7b(0x264)][_0x53ed7b(0x25e)];},Filter_LightsContainer[_0x1ecb36(0x2b8)][_0x1ecb36(0x287)]=function(_0x1fe365,_0x56b1c3,_0x77d658,_0x7bd136){const _0x4e4fde=_0x1ecb36;PIXI[_0x4e4fde(0x2c3)][_0x4e4fde(0x2b8)]['apply']['call'](this,_0x1fe365,_0x56b1c3,_0x77d658,0x1);};function Raytrace_Filter(){const _0x288301=_0x1ecb36;this[_0x288301(0x258)][_0x288301(0x287)](this,arguments);};Raytrace_Filter[_0x1ecb36(0x2b8)]=Object[_0x1ecb36(0x20d)](PIXI[_0x1ecb36(0x2c3)][_0x1ecb36(0x2b8)]),Raytrace_Filter[_0x1ecb36(0x2b8)][_0x1ecb36(0x251)]=Raytrace_Filter,Raytrace_Filter[_0x1ecb36(0x2b8)]['initialize']=function(){const _0x3c7c2b=_0x1ecb36;PIXI[_0x3c7c2b(0x2c3)]['call'](this,null,raytraceFrag),this[_0x3c7c2b(0x2b2)][_0x3c7c2b(0x29a)]=$lightSys[_0x3c7c2b(0x24a)]['_renderTexture'],this[_0x3c7c2b(0x2b2)]['in_Light']=[0x10,0x10,0x40];const _0x47b776=0x22*0x30,_0x2a2e13=0x27*0x30;this[_0x3c7c2b(0x2b2)]['in_World']=[0x1/_0x47b776,0x1/_0x2a2e13],this[_0x3c7c2b(0x2b2)][_0x3c7c2b(0x22e)]=0x20;},Raytrace_Filter[_0x1ecb36(0x2b8)][_0x1ecb36(0x287)]=function(_0x3b67c6,_0x375da9,_0x458661,_0x5b617c){const _0x41b555=_0x1ecb36;PIXI[_0x41b555(0x2c3)]['prototype'][_0x41b555(0x287)][_0x41b555(0x20a)](this,_0x3b67c6,_0x375da9,_0x458661,_0x5b617c),this[_0x41b555(0x28a)]['setRayMap'](_0x458661[_0x41b555(0x2ba)]());},_['Raytrace_Filter']=Raytrace_Filter;function Light_Filter(){this['initialize']['apply'](this,arguments);};Light_Filter[_0x1ecb36(0x2b8)]=Object['create'](PIXI['Filter'][_0x1ecb36(0x2b8)]),Light_Filter['prototype'][_0x1ecb36(0x251)]=Light_Filter,Light_Filter[_0x1ecb36(0x2b8)]['initialize']=function(){const _0x4a95f1=_0x1ecb36;PIXI[_0x4a95f1(0x2c3)][_0x4a95f1(0x20a)](this,null,lightingFrag),this[_0x4a95f1(0x2c2)]=PIXI['BLEND_MODES'][_0x4a95f1(0x25e)],this[_0x4a95f1(0x2b2)]['in_WorldMap']=$lightSys[_0x4a95f1(0x24a)][_0x4a95f1(0x254)],this[_0x4a95f1(0x2b2)][_0x4a95f1(0x2d1)]=new PIXI[(_0x4a95f1(0x289))](new PIXI[(_0x4a95f1(0x2ad))](),new PIXI[(_0x4a95f1(0x253))](0x0,0x0,0x20,0x20)),this[_0x4a95f1(0x2b2)][_0x4a95f1(0x277)]=[0x10,0x10,0x40],this[_0x4a95f1(0x2b2)][_0x4a95f1(0x243)]=[0.3,0.3,0.3],this[_0x4a95f1(0x2b2)][_0x4a95f1(0x2be)]=[0x0,0x0,0x0],this[_0x4a95f1(0x2b2)]['in_WorldTexSize']=[0x1/0x20,0x1/0x20],this['uniforms'][_0x4a95f1(0x2a1)]=[0x40,0x40],this[_0x4a95f1(0x2b2)][_0x4a95f1(0x22e)]=0x20,this['uniforms'][_0x4a95f1(0x26a)]=0x80,this[_0x4a95f1(0x2b2)][_0x4a95f1(0x271)]=[0x0,0x168],this[_0x4a95f1(0x2b2)]['light_rotation']=0x0,this[_0x4a95f1(0x2b2)][_0x4a95f1(0x227)]=[0x0,0x0],this[_0x4a95f1(0x2b2)][_0x4a95f1(0x231)]=null;},Light_Filter[_0x1ecb36(0x2b8)][_0x1ecb36(0x287)]=function(_0x226ca3,_0x3b38c8,_0x1e5678,_0x39b890){const _0x4c6890=_0x1ecb36;PIXI[_0x4c6890(0x2c3)][_0x4c6890(0x2b8)][_0x4c6890(0x287)][_0x4c6890(0x20a)](this,_0x226ca3,_0x3b38c8,_0x1e5678,0x1);},Light_Filter[_0x1ecb36(0x2b8)][_0x1ecb36(0x2a2)]=function(_0x2d89cd){const _0x19c462=_0x1ecb36;this[_0x19c462(0x2b2)][_0x19c462(0x2d1)]=_0x2d89cd;},Light_Filter[_0x1ecb36(0x2b8)][_0x1ecb36(0x215)]=function(_0x106128){const _0x34d201=_0x1ecb36;this['uniforms'][_0x34d201(0x29a)]=_0x106128;},_[_0x1ecb36(0x23f)]=Light_Filter;function Filter_MapLighting(){const _0x55b8a4=_0x1ecb36;this[_0x55b8a4(0x258)]['apply'](this,arguments);};Filter_MapLighting[_0x1ecb36(0x2b8)]=Object['create'](PIXI[_0x1ecb36(0x2c3)][_0x1ecb36(0x2b8)]),Filter_MapLighting[_0x1ecb36(0x2b8)]['constructor']=Filter_MapLighting,Filter_MapLighting[_0x1ecb36(0x2b8)][_0x1ecb36(0x258)]=function(){const _0x120118=_0x1ecb36;PIXI[_0x120118(0x2c3)]['call'](this,null,fragMapLight),this[_0x120118(0x2c2)]=PIXI['BLEND_MODES']['DAE_LIGHTING'];},Filter_MapLighting[_0x1ecb36(0x2b8)][_0x1ecb36(0x287)]=function(_0x4f0743,_0x20eb07,_0xc84df2,_0x4aabe5){const _0x31b011=_0x1ecb36;PIXI['Filter'][_0x31b011(0x2b8)]['apply']['call'](this,_0x4f0743,_0x20eb07,_0xc84df2,_0x4aabe5);},_[_0x1ecb36(0x22b)]=Filter_MapLighting;const fragMapLight=_0x1ecb36(0x2a6),raytraceFrag=_0x1ecb36(0x2dc),lightingFrag=_0x1ecb36(0x1f3)+_['toningFunc']+_0x1ecb36(0x239);


})(DAE.Lighting);