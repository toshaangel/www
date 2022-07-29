//==============================================================================================================
//--------------------------------------------------------------------------------------------------------------
// *** MUSHROOMCAKE28'S AUDIO ENGINE
//  * Author: MushroomCake28
//  * Contact: On the official forum -> https://forums.rpgmakerweb.com/index.php?members/mushroomcake28.75234/
//  * Version: 1.06 (2020-08-31) 
//--------------------------------------------------------------------------------------------------------------
// * INFO : This is the base engine for the MUSH Audio plugin, which will revamp the audio system in RPG Maker Mz.
//          This will add many features and will also modify some of the existing function (this may cause some
//			incompatibility issues with other third party plugins that modifies the audio functions).
// * USAGE : This is a public plugin that can be used by anyone in RPG Maker MZ. Simply insert the plugin and
//			 turn it on in the plugin manager.
// * TERMS : This plugin is free to use for commercial and non-commercial projects as long as credits is provided.
//			 You can credit MushroomCake28. 
//--------------------------------------------------------------------------------------------------------------
// TABLE OF CONTENT
// * Section 1: Parameters and Versions
//          - 1.01 : Versions
//			- 1.02 : Parameters
// * Section 2: Audio Manager
//          - 2.01 : General & Initializing
//			- 2.02 : SE and UIS
//			- 2.03 : New BGM and BGS Play
//			- 2.04 : General Buffer Methods
//			- 2.05 : Spacial Audio Calculation
//			- 2.06 : Update Method
// 			- 2.07 : BGM and BGS remover
//			- 2.08 : Spatial SE player
//			- 2.09 : VSC section
//			- 2.10 : ME section
// * Section 3: Manager
//			- 3.01 : Plugin Manager
// 			- 3.02 : Config Manager
//			- 3.03 : Data Manager
// * Section 4: Game Objects
//			- 4.01 : Game Player
//			- 4.02 : Game Map
//			- 4.03 : Game Interpreter
// * Section 5: Scenes
//			- 5.01 : Scene Base
//			- 5.02 : Scene Map
//			- 5.03 : Scene Menu
//			- 5.04 : Scene Gameover
//			- 5.05 : Scene GameEnd
// * Section 6: Windows
//			- 6.01 : Windows Options
//--------------------------------------------------------------------------------------------------------------
// HELP AND INFO
// - Master Volume
// - Separated SE and UIS (UI sound effects)
// - VSC (Voice Sound Channel) for voice acting
// - Variance for SE and UIS
// - Multiple BGMs and BGSs
// - Spatial Audio (varying volume and pan depending on player position)
// - Dedicated Voice Acting system.
// - Parent Map BGM autoplay
//--------------------------------------------------------------------------------------------------------------
// PARAMETERS
//--------------------------------------------------------------------------------------------------------------
/*:
* @target MZ
* @plugindesc [v.1.06] Implement the Mush Audio Engine features.
* @author MushroomCake28
* @url https://forums.rpgmakerweb.com/index.php?threads/mush-audio-engine-spatial-audio-voice-acting-new-channels-etc.128741/
* @help 
* ==============================================================================
* *** MUSH AUDIO ENGINE by MushroomCake28
* ==============================================================================
*
* Introduction
* ______________________________________________________________________________
*
* This plugin is the foundation of the MUSH Audio Engine. It is required for 
* all other and future MUSH audio plugins. 
*
* By itself, this plugin adds many general features to RPG Maker MZ's audio
* capabilities. Please refer to each section for help on a particular issue. 
* If you still some issues after consulting this guide, please refer to the 
* youtube tutorials and the forums thread. 
*
* If you encounter a bug, please contact me via the forums. My username is 
* MushroomCake28 there:
* https://forums.rpgmakerweb.com/index.php
*
* To see all the update history of this plugin, please see the forums thread
* linked above. 
* ______________________________________________________________________________
*
* General Features
* ______________________________________________________________________________
*
* In the parameters, the first section called "General Features" is where you 
* activate and deactive general features that aren't too complicated. 
*
* The "UI Sound Effect" parameter, if ON, creates a new audio channel called 
* UIS (UI Sound Effect). That channel is separate from the SE channel and will
* be used to play SE for the UI (cursor, confirm, cancel, etc.). If OFF, UI SE
* will use the SE channel like by default.
*
* The "Voice Sound Channel" is another additional channel that will be used 
* exclusively for voice acting. If false, all the Play VSC functions will use 
* the SE channel.
*
* The "Pan Spacial Audio" parameter affects the spacial audio feature. If OFF,
* all spacial BGM/BGS/SE will not pan depending on position, regardless of the 
* setting of individual spacial audios. 
*
* The "Map Parent Autoplay" parameter if ON will use the parent map's autoplay
* BGM if the map has no autoplay (BGM, the feature ignores BGS). If the parent
* map doesn't have a BGM, it will look at the parent map's parent map, and so
* on until it finds one. 
*
* ______________________________________________________________________________
*
* Volume Balance
* ______________________________________________________________________________
*
* The Volume Balance section is very simple. Here you can adjust the volume 
* level to balance the different audio channels. These will be added on top of
* existing volume options, but they can't be changed in-game by the player
* like the volume options. 
*
* ______________________________________________________________________________
*
* SE/UIS Variance Feature
* ______________________________________________________________________________
*
* This particular feature allows for SE and UIS to have a slightly different 
* pitch and/or volume every time they are played. The variance is percentage
* base. So if you set the SE pitch variance to 5, it will play the SE with
* the indicated pitch +/- 5%. So if the pitch was set to 5, it will play with
* a pitch between 95 and 105. 
*
* The settings in this section represent the default setting for SE and UIS. 
* It will be possible to play a SE without variation via a plugin command.
*
* It is possible to turn off just the pitch variance feature, or just the 
* volume variance feature, or both. Those two features are independent from
* each other.
*
* If the UIS feature is OFF (in the general section), the UI sound effects 
* will follow the same setting as regular SE for the variance feature. 
* However, it is possible to make it so UI Sound Effects simply don't follow
* the same setting as SE and just don't have any variance at all by turning 
* the "Static Follow SE" parameter OFF.
*
* ______________________________________________________________________________
* 
* Menu Option Changes
* ______________________________________________________________________________
*
* Because of the addition of the UIS and the VSC channels, the options menu
* has to be modified to add those two channels. However, you can deactivate
* any additions to the Menu Options. There is also the option to add a 
* master volume option.
*
* ______________________________________________________________________________
* 
* New BGM and BGS system
* ______________________________________________________________________________
*
* The old BGM and BGS system still remains for the sake of compatibility
* with other plugins. However, there is a new BGM and BGS system that
* allows for the use of multiple BGMs and BGSs simultaneously unlike the
* old system that only allows playing 1 BGM and 1 BGS at the same time. 
*
* To play a BGM or a BGS with new system, you need to use a plugin
* command:
* - Play BGM
* - Play BGS
* - Add Spacial BGM
* - Add Spacial BGS
* - Stop All Mush BGMs
* - Stop All Mush BGSs
*
* You will be asked to specify a channel. This can be any number from 1 to
* infinity. The rule is that there can only be one BGM/BGS playing in a 
* channel (BGM and BGS are separate so they can use the same channel 
* numbers). That channel number is also the identification of a BGM/BGS.
* You will need that channel number to stop or fade out that BGM/BGS.
*
* The new system also adds the "Auto Remover" property that can be turned
* ON/OFF. If on, this will make it so the game automatically removes BGMs
* and BGSs everytime the player transfers from one map to the other. If
* OFF, the dev will have to manually play and stop BGMs/BGSs. This
* feature is always ON for spacial BGM and spacial BGS.
*
* The new system allows you to control the BGM/BGS behavior when there's an
* encounter. This is controlled via the "Interrupt" property. There are 3 
* types of behavior once a battle is triggered:
* 1) Ignore: The BGM/BGS will continue playing during the battle and also 
*    once the player transitions back to the map.
* 2) Stop: The BGM/BGS will stop when an encounter occurs. It won't play
*    back once the player returns to the map.
* 3) Pause (default): The BGM/BGS will stop when there's an encounter, but 
*    it will play back from where it stopped once the  player returns back 
*    to the map.
*
* There are 2 plugin commands to stop all Mush BGMs/BGSs. Mush BGM/BGS
* refers to the BGM and BGS in the new audio system. This means that the
* plugin commands won't stop the BGM and BGS playing in the old audio 
* system.
*
* ______________________________________________________________________________
* 
* Spacial BGM/BGS, and Spacial SE
* ______________________________________________________________________________
* 
* The spacial BGM/BGS feature allows you to play a BGM or a BGS with a 
* volume and panning that dynamically updates depending to the player
* position to the audio source.
*
* To add a spacial BGM/BGS you simply need to call the appropriate Plugin
* Command from any event. The special BGM/BGS will then be attached to the map 
* and will be automatically removed once you transfer to another map.
* - Add Spacial BGM: for BGM.
* - Add Spacial BGS: for BGS. 
*
* Spacial BGM and BGS are linked to a channel number. The channel number
* will be the indicator for the audio source. So if a river BGS is added
* with a spacial effect with the BGS channel of 5, the game will look for
* all audio sources with the channel number of 5. So there can be multiple
* audio sources for a BGM/BGS.
* 
* Events serve as audio source. To make an event an audio source, create an 
* event and in the Note box at the top add the follow text:
* "<bgm_source: channel number>" for BGM audio sources 
* "<bgs_source: channel number>" for BGS audio sources
* Of course, remove the " " and replace "channel number" by the actual channel 
* number attached to the audio source. 
* 
* The volume of the spacial BGM/BGS will depend on the player's position to 
* the audio source(s). Each source will have a radius from which the BGM/BGS
* can be heard. Of course, the closer to the source the louder the volume.
* Outside of the radius, the BGM/BGS is inaudible. You can control the 
* curve of the volume fall off from distance with the "Strength" property.
* The higher the strength value, the slower the volume will fall off inside
* the radius. A strength of 100 equals a linear scaling. 
*
* The BGM/BGS can also be panned automatically with two different pan types.
* Of course, pan can still be turned off. The two existing pan types are:
* 1) Origina Expand (default): The closer from the source, the less panning 
*    there will be. This is more adequate for most situations and sounds more
*    natural. You can use the "Pan Start distance" to determine the distance 
*    from which the pan will start and the "Pan Length Distance" to set the 
*    distance for the pan to be fully operational. 
* 2) Linear Scaling: This will pan the game like if it was a 2D front view.
*    If the player is left from the source, even by just 1 tile, it will be 
*    played from right side 100%. 
*
* A Spacial BGM/BGS can be dynamic or not. Dynamic has to be ON if the audio
* sources attached to that spacial BGM/BGS move on the map. If not, you can 
* turn Dynamic OFF (it will still work if you don't, but dynamic ON consumes
* more CPU power). 
*
* Spacial BGMs have a special property called "Cross Fade". If ON, the
* default BGM (the one played by the map) can slowly be silenced the louder
* the spacial BGM gets. 
* 
* Spacial SE are also a thing. They work very similarly to spacial BGM/BGS. 
* However, they can only be played from one source and don't loop. They also
* don't have varying volume and pan. The volume and pan are calculated when 
* they start playing depending on the player position, but if the player
* moves while it plays it won't update. This is because SE playtime is usually
* very short. 
*
* ______________________________________________________________________________
* 
* Voice Acting (using the VSC system)
* ______________________________________________________________________________
* 
* Voice Acting is now made easier via the new VSC system. It will add a new 
* audio channel just for voice acting. 
*
* To play a VSC, just use this plugin command:
* - Play VSC
*
* Like with the new BGM and BGS system, there will be a channel number. This
* will make it so it is possible to play multiple voice acting files at the 
* same time. Channel number also goes from 1 to infinity. Playing another 
* VSC in the same channel as another VSC that is already playing will stop 
* the old VSC and play the new one.
*
* The volume of a VSC is controlled by the VSC Volume option in the options
* menu. If the VSC Feature is OFF (general section), it will use the SE 
* volume setting. 
*
* @param DevelopperMode
* @text Developper Mode
* @desc Set to false when deploying. If true, it will show error alerts to the dev.
* @type boolean
* @default true 
*
* @param GeneralFeatures
* @text General Features
* @desc All the features that don't need their own section. 
*
* @param FEA_UIS
* @text UI Sound Effects
* @parent GeneralFeatures
* @desc Split SE into regular SE and those that are used as UI sound effects (cursor, confirm, buzzer, etc.).
* @type boolean
* @default true
*
* @param FEA_VSC
* @text Voice Sound Channel
* @parent GeneralFeatures
* @desc Create another audio category for voices so the volume can be controlled independently from other channels.
* @type boolean
* @default false
* 
* @param FEA_SPAPAN
* @text Pan Spacial Audio
* @parent GeneralFeatures
* @desc Set to true if you want spacial audio to pan according to player's position to the audio source.
* @type boolean
* @default true
*
* @param FEA_MAPAUTOPLAY
* @text Map Parent Autoplay
* @parent GeneralFeatures
* @desc If true, if the map doesn't have an auto BGM the game will check the parent map until it finds one.
* @type boolean
* @default false
*
* @ -------------------------------------------------------
*
* @param VolumeBalance
* @text Volume Balance
* @desc Control the volume balance across different channels. 
*
* @param VB_BGM
* @text BGM Volume Level
* @parent VolumeBalance
* @desc Control the volume balance for all BGMs. This is a general value that can't be changed.
* @type number
* @min 0
* @max 100
* @default 100
*
* @param VB_BGM
* @text BGM Volume Level
* @parent VolumeBalance
* @desc Control the volume balance for all BGMs. This is a general value that can't be changed.
* @type number
* @min 0
* @max 100
* @default 100
*
* @param VB_BGS
* @text BGS Volume Level
* @parent VolumeBalance
* @desc Control the volume balance for all BGSs. This is a general value that can't be changed.
* @type number
* @min 0
* @max 100
* @default 100
*
* @param VB_ME
* @text ME Volume Level
* @parent VolumeBalance
* @desc Control the volume balance for all MEs. This is a general value that can't be changed.
* @type number
* @min 0
* @max 100
* @default 100
*
* @param VB_SE
* @text SE Volume Level
* @parent VolumeBalance
* @desc Control the volume balance for all SEs. This is a general value that can't be changed.
* @type number
* @min 0
* @max 100
* @default 100
*
* @param VB_UIS
* @text UIS Volume Level
* @parent VolumeBalance
* @desc Control the volume balance for all UI Sound Effects. This is a general value that can't be changed.
* @type number
* @min 0
* @max 100
* @default 100
*
* @param VB_VSC
* @text VSC Volume Level
* @parent VolumeBalance
* @desc Control the volume balance for the Voice Sound Channel. This is a general value that can't be changed.
* @type number
* @min 0
* @max 100
* @default 100
*
* @ -------------------------------------------------------
*
* @param SeUisVarFeatures
* @text SE/UIS Variance Features
* @desc Control the settings on the SE and UIS sound variation. 
*
* @param StaticFollowSe
* @text Static Follow Se
* @parent SeUisVarFeatures
* @desc If the UIS feature is OFF, set if UI sounds should follow SE in the variance feature.
* @type boolean
* @default true
*
* @param SeVarFeatures
* @text SE variance features
* @parent SeUisVarFeatures
* @desc Control the variance settings for SE. If the UIS feature is Off, this will apply to UIS too. 
* 
* @param SePitchVarFeature
* @text SE Pitch Variation Feature
* @parent SeVarFeatures
* @desc This feature will make SE have a slight pitch variation every time they are played. 
* @type boolean
* @default true
*
* @param SePitchVarRange
* @text SE Pitch Variation Range
* @parent SeVarFeatures
* @desc Set the range of the pitch variation every time an SE is played. The range is +/- the number.  
* @type number
* @default 5
* @min 0
* @max 50
*
* @param SeVolumeVarFeature
* @text SE Volume Variation Feature
* @parent SeVarFeatures
* @desc This feature will make SE have a slight volume variation every time they are played. 
* @type boolean
* @default true
*
* @param SeVolumeVarRange
* @text SE Volume Variation Range
* @parent SeVarFeatures
* @desc Set the range of the volume variation every time an SE is played. The range is +/- the number.  
* @type number
* @default 3
* @min 0
* @max 50
*
* @param UisVarFeatures
* @text UIS variance features
* @parent SeUisVarFeatures
* @desc Control the variance settings for UIS. If the UIS feature is Off, this will do nothing. 
* 
* @param UisPitchVarFeature
* @text UIS Pitch Variation Feature
* @parent UisVarFeatures
* @desc This feature will make UIS have a slight pitch variation every time they are played. 
* @type boolean
* @default true
*
* @param UisPitchVarRange
* @text UIS Pitch Variation Range
* @parent UisVarFeatures
* @desc Set the range of the pitch variation every time an UIS is played. The range is +/- the number.  
* @type number
* @default 5
* @min 0
* @max 50
*
* @param UisVolumeVarFeature
* @text UIS Volume Variation Feature
* @parent UisVarFeatures
* @desc This feature will make UIS have a slight volume variation every time they are played. 
* @type boolean
* @default true
*
* @param UisVolumeVarRange
* @text UIS Volume Variation Range
* @parent UisVarFeatures
* @desc Set the range of the volume variation every time an UIS is played. The range is +/- the number.  
* @type number
* @default 3
* @min 0
* @max 50
*
* @ -------------------------------------------------------
*
* @param MenuOptions
* @text Menu Options Changes
* @desc This section controls changes to the Menu Options to match the new features
*
* @param MasterOptions
* @text Master Section
* @parent MenuOptions
* @desc All the parameters concerning the additional Master Volume in the Menu Options.
*
* @param OptMasterFeature
* @text Add Master Volume Option
* @parent MasterOptions
* @desc Set to true if you want to add an option for Master volume control in the Options Window.
* @type boolean
* @default true
*
* @param OptMasterText
* @text Master Option Text
* @parent MasterOptions
* @desc Set the text that will appear in the Option Windows for the Master option.
* @default Master Volume
*
* @param UisOptions
* @text UIS Section
* @parent MenuOptions
* @desc All the parameters concerning the additional UIS section in the Menu Options.
*
* @param OptUisFeature
* @text Add UIS Volume Option
* @parent UisOptions
* @desc Set to true if you want to add an option for UIS volume control in the Options Window.
* @type boolean
* @default true
*
* @param OptUisText
* @text UIS Option Text
* @parent UisOptions
* @desc Set the text that will appear in the Option Windows for the UIS option.
* @default UIS Volume
*
* @param VscOptions
* @text VSC Section
* @parent MenuOptions
* @desc All the parameters concerning the additional VSC section in the Menu Options.
*
* @param OptVscFeature
* @text Add VSC Volume Option
* @parent VscOptions
* @desc Set to true if you want to add an option for VSC volume control in the Options Window.
* @type boolean
* @default false
*
* @param OptVscText
* @text VSC Option Text
* @parent VscOptions
* @desc Set the text that will appear in the Option Windows for the VSC option.
* @default VSC Volume
* 
* 
* @--------------------------------------------------
* @ Plugin Commands
* @--------------------------------------------------
*
* @command AddSpacialBgm
* @text Add Spacial BGM
* @desc Add a non-dynamic spacial BGM.
*
* @arg Filename
* @text Filename
* @desc Select the BGM filename.
* @type file
* @dir audio/bgm
*
* @arg Pitch
* @text Pitch
* @desc Set the BGM's pitch.
* @type number
* @min 1
* @max 200
* @default 100
*
* @arg Channel
* @text Channel
* @desc Select the BGM's audio channel.
* @type number
* @min 1
* @default 1
*
* @arg Dynamic
* @text Dynamic
* @desc Set either the source(s) of the BGM is dynamic or not.
* @type boolean
* @default false
* 
* @arg ReduceMain
* @text Cross Fade
* @desc If true, reduce the volume of the main BGM the louder this spacial BGM gets.
* @type boolean
* @default true
*
* @arg MaxVolume
* @text Max Volume
* @desc Set the max volume of the BGM (the volume when the player is closest to the audio source).
* @type number
* @min 0
* @max 100
* @default 90
* 
* @arg Radius
* @text Radius
* @desc Set the radius of the BGM. 0 will make the radius as big as the map.
* @type number
* @min 0
* @default 8
*
* @arg Strength
* @text Strength
* @desc Set the strength of the BGM. The higher the number, the slower the volume will fade away.
* @type number
* @min 1
* @max 1000
* @default 100
*
* @arg Pan
* @text Pan Type
* @desc Set the panning type of the audio source.
* @type select
* @option Origin Expand
* @option Linear Scaling
* @option None
* @default Origin Expand
*
* @arg PanSt
* @text Pan Start Distance
* @desc **Only if pan is set to Origin Expand** Set the distance before audio starts gradually panning.
* @type number
* @min 1
* @max 999
* @default 3
* 
* @arg PanLd
* @text Pan Length Distance
* @desc **Only if pan is set to Origin Expand** Set the distance for the audio to be fully panned. 
* @type number
* @min 1
* @max 999
* @default 6
*
* @ ------------------------------------------------
*
* @command AddSpacialBgs
* @text Add Spacial BGS
* @desc Add a non-dynamic spacial BGS.
*
* @arg Filename
* @text Filename
* @desc Select the BGS filename.
* @type file
* @dir audio/bgs
*
* @arg Pitch
* @text Pitch
* @desc Set the BGS's pitch.
* @type number
* @min 1
* @max 200
* @default 100
*
* @arg Channel
* @text Channel
* @desc Select the BGS's audio channel.
* @type number
* @min 1
* @default 1
*
* @arg Dynamic
* @text Dynamic
* @desc Set either the source(s) of the BGS is dynamic or not.
* @type boolean
* @default false
*
* @arg MaxVolume
* @text Max Volume
* @desc Set the max volume of the BGS (the volume when the player is closest to the audio source).
* @type number
* @min 0
* @max 100
* @default 90
* 
* @arg Radius
* @text Radius
* @desc Set the radius of the BGS. 0 will make the radius as big as the map.
* @type number
* @min 0
* @default 8
*
* @arg Strength
* @text Strength
* @desc Set the strength of the BGS. The higher the number, the slower the volume will fade away.
* @type number
* @min 1
* @max 1000
* @default 100
*
* @arg Pan
* @text Pan Type
* @desc Set the panning type of the audio source.
* @type select
* @option Origin Expand
* @option Linear Scaling
* @option None
* @default Origin Expand
*
* @arg PanSt
* @text Pan Start Distance
* @desc **Only if pan is set to Origin Expand** Set the distance before audio starts gradually panning.
* @type number
* @min 1
* @max 999
* @default 3
* 
* @arg PanLd
* @text Pan Length Distance
* @desc **Only if pan is set to Origin Expand** Set the distance for the audio to be fully panned. 
* @type number
* @min 1
* @max 999
* @default 6
*
* @ ------------------------------------------------
*
* @command PlayBgm
* @text Play BGM
* @desc Play a BGM with the new channel system.
* 
* @arg Filename
* @text Filename
* @desc Select the BGM to play.
* @type file
* @dir audio/bgm
*
* @arg Channel
* @text Channel
* @desc Select the channel in which the BGM will be played. 
* @type number
* @min 1
* @default 1
*
* @arg AutoRemover
* @text Auto Remover
* @desc If true, the game will stop and remove the BGM automatically. If false, you have to stop it manually.
* @type boolean
* @default true
* 
* @arg Pitch
* @text Pitch
* @desc Set the pitch of the BGM.
* @type number
* @min 1
* @max 200
* @default 100
*
* @arg Volume
* @text Volume
* @desc Set the volume of the BGM.
* @type number
* @min 0
* @max 100
* @default 90
* 
* @arg Pan
* @text Pan
* @desc Set the pan of the BGM.
* @type number 
* @min -100
* @max 100
* @default 0
*
* @arg FadeIn
* @text Fade In
* @desc Set a fade in duration in number of seconds. Leave it at 0 if you don't want any fade in.
* @type number
* @min 0
* @default 0
*
* @arg Interrupt
* @text Interrupt 
* @desc Select the behavior when the BGM is interrupted (battle).
* @type select
* @option Ignore
* @option Stop
* @option Pause
* @default Pause
*
* @ ------------------------------------------------
*
* @command PlayBgs
* @text Play BGS
* @desc Play a BGS with the new channel system.
* 
* @arg Filename
* @text Filename
* @desc Select the BGS to play.
* @type file
* @dir audio/bgs
*
* @arg Channel
* @text Channel
* @desc Select the channel in which the BGS will be played. 
* @type number
* @min 1
* @default 1
*
* @arg AutoRemover
* @text Auto Remover
* @desc If true, the game will stop and remove the BGM automatically. If false, you have to stop it manually.
* @type boolean
* @default true
* 
* @arg Pitch
* @text Pitch
* @desc Set the pitch of the BGS.
* @type number
* @min 1
* @max 200
* @default 100
*
* @arg Volume
* @text Volume
* @desc Set the volume of the BGS.
* @type number
* @min 0
* @max 100
* @default 90
* 
* @arg Pan
* @text Pan
* @desc Set the pan of the BGS.
* @type number 
* @min -100
* @max 100
* @default 0
*
* @arg FadeIn
* @text Fade In
* @desc Set a fade in duration in number of seconds. Leave it at 0 if you don't want any fade in.
* @type number
* @min 0
* @default 0
*
* @arg Interrupt
* @text Interrupt 
* @desc Select the behavior when the BGS is interrupted (battle).
* @type select
* @option Ignore
* @option Stop
* @option Pause
* @default Pause
*
* @ ------------------------------------------------
*
* @command StopBgm
* @text Stop BGM
* @desc Stop a BGM in the new channel system.
*
* @arg Channel
* @text Channel
* @desc Select the channel.
* @type number
* @min 1
* @default 1
*
* @arg FadeOut
* @text Fade Out
* @desc Set a fade out duration in number of seconds. Leave it at 0 if you don't want any fade out.
* @type number
* @min 0
* @default 3
*
* @ ------------------------------------------------
*
* @command StopBgs
* @text Stop BGS
* @desc Stop a BGS in the new channel system.
*
* @arg Channel
* @text Channel
* @desc Select the channel.
* @type number
* @min 1
* @default 1
*
* @arg FadeOut
* @text Fade Out
* @desc Set a fade out duration in number of seconds. Leave it at 0 if you don't want any fade out.
* @type number
* @min 0
* @default 3
*
* @ ------------------------------------------------
*
* @command StopAllBgm
* @text Stop All Mush BGMs
* @desc Stop all Mush BGMs. This does not stop the regular BGM (non Mush).
*
* @arg FadeOut
* @text Fade Out
* @desc Set a fade out duration in number of seconds. Leave it at 0 if you don't want any fade out.
* @type number
* @min 0
* @default 0
*
* @ ------------------------------------------------
*
* @command StopAllBgs
* @text Stop All Mush BGSs
* @desc Stop all Mush BGSs. This does not stop the regular BGS (non Mush).
*
* @arg FadeOut
* @text Fade Out
* @desc Set a fade out duration in number of seconds. Leave it at 0 if you don't want any fade out.
* @type number
* @min 0
* @default 0
*
* @ ------------------------------------------------
*
* @command ChangeVolumeBgm
* @text Change BGM Volume
* @desc Change the volume of an active MUSH BGM.
*
* @arg Channel
* @text Channel
* @desc Select the channel of the BGM.
* @type number
* @min 1
* @default 1
*
* @arg Volume
* @text Volume
* @desc Set the new BGM volume.
* @type number
* @min 0
* @default 100
*
* @ ------------------------------------------------
*
* @command ChangeVolumeBgs
* @text Change BGS Volume
* @desc Change the volume of an active MUSH BGS.
*
* @arg Channel
* @text Channel
* @desc Select the channel of the BGS.
* @type number
* @min 1
* @default 1
*
* @arg Volume
* @text Volume
* @desc Set the new BGS volume.
* @type number
* @min 0
* @default 100
*
* @ ------------------------------------------------
*
* @command PlaySpatialSe
* @text Play Spatial SE
* @desc Play a spacial SE from a certain position.
*
* @arg Filename
* @text Filename
* @desc Select the SE to play.
* @type file
* @dir audio/se
* 
* @arg Pitch
* @text Pitch
* @desc Set the pitch of the SE.
* @type number
* @min 1
* @max 200
* @default 100
* 
* @arg PitchVariance
* @text Pitch Variance
* @desc Set the pitch variance feature independently from the general setting, unless you set this to "default".
* @type select
* @option Default
* @option On
* @option Off
* @default Default
*
* @arg VolumeVariance
* @text Volume Variance
* @desc Set the volume variance feature independently from the general setting, unless you set this to "default".
* @type select
* @option Default
* @option On
* @option Off
* @default Default
*
* @arg MaxVolume
* @text Max Volume
* @desc Set the max volume of the SE.
* @type number
* @min 0
* @max 100
* @default 90
* 
* @arg EventId
* @text Event Id
* @desc Set the ID of the event that will act as a source for the SE.
* @type number
* @min 1
* @default 1
*
* @arg Radius
* @text Radius
* @desc Set the radius of the SE. 0 will make the radius as big as the map.
* @type number
* @min 0
* @default 8
*
* @arg Strength
* @text Strength
* @desc Set the strength of the SE. The higher the number, the slower the volume will fade away.
* @type number
* @min 1
* @max 1000
* @default 100
*
* @arg Pan
* @text Pan Type
* @desc Set the panning type of the audio source.
* @type select
* @option Origin Expand
* @option Linear Scaling
* @option None
* @default Origin Expand
*
* @arg PanSt
* @text Pan Start Distance
* @desc **Only if pan is set to Origin Expand** Set the distance before audio starts gradually panning.
* @type number
* @min 1
* @max 999
* @default 3
* 
* @arg PanLd
* @text Pan Length Distance
* @desc **Only if pan is set to Origin Expand** Set the distance for the audio to be fully panned. 
* @type number
* @min 1
* @max 999
* @default 6
*
* @ ------------------------------------------------
*
* @command PlayVsc
* @text Play VSC
* @desc Play a Voice Sound.
*
* @arg Filename
* @text Filename
* @desc Select the file to play.
* @type file
* @dir audio/vsc
*
* @arg Channel
* @text Channel
* @desc Select the channel in which the VSC will be played. 
* @type number
* @min 1
* @default 1
*
* @arg Pitch
* @text Pitch
* @desc Set the pitch.
* @type number
* @min 1
* @max 200
* @default 100
*
* @arg Volume
* @text Volume
* @desc Set the volume.
* @type number
* @min 0
* @max 100
* @default 100
*
* @arg Pan
* @text Pan
* @desc Set the pan.
* @type number
* @min -100
* @max 100
* @default 0
* 
* @arg Interrupt
* @text Interrupt
* @desc Select the behavior when the voice sound is interrupted (switching between menu and battle).
* @type select
* @option Ignore
* @option Stop
* @option Pause
* @default Ignore
*
*/
//==============================================================================================================


//==============================================================================================================
// * 1.01 : Versions
//==============================================================================================================

var Imported = Imported || {};
Imported.mushFeatures = Imported.mushFeatures || {}; 
Imported.mushFeatures['MUSH_Audio_Engine'] = 1.06;

var Mush = Mush || {};
Mush.parameters = Mush.parameters || {};
Mush.alias = Mush.alias || {};


//==============================================================================================================
// * 1.02 : Parameters
//==============================================================================================================

var params = PluginManager.parameters('MUSH_Audio_Engine');
Mush.parameters.mushAudioEngine = {

	devMode: eval(params["DevelopperMode"]),

	genFeatures: {
		uis: eval(params['FEA_UIS']),
		vsc: eval(params['FEA_VSC']),
		spaPan: eval(params['FEA_SPAPAN']),
		mapAutoplay: eval(params['FEA_MAPAUTOPLAY'])
	},

	volumeBalance: {
		bgmLevel: Number(params['VB_BGM']),
		bgsLevel: Number(params['VB_BGS']),
		meLevel:  Number(params['VB_ME']),
		seLevel:  Number(params['VB_SE']),
		uisLevel: Number(params['VB_UIS']),
		vscLevel: Number(params['VB_VSC'])
	},

	seUisVar: {
		staticFollowSe: eval(params['StaticFollowSe']),
		sePitchFea:     eval(params['SePitchVarFeature']),
		sePitchRange:   Number(params['SePitchVarRange']),
		seVolumeFea:    eval(params['SeVolumeVarFeature']),
		seVolumeRange:  Number(params['SeVolumeVarRange']),
		uisPitchFea:    eval(params['UisPitchVarFeature']),
		uisPitchRange:  Number(params['UisPitchVarRange']),
		uisVolumeFea:   eval(params['UisVolumeVarFeature']),
		uisVolumeRange: Number(params['UisVolumeVarRange'])
	},

	menuOptions: {
		masterVolumeFeature: eval(params['OptMasterFeature']),
		masterVolumeText: 	 String(params['OptMasterText']),
		uisVolumeFeature: 	 eval(params['OptUisFeature']),
		uisVolumeText: 		 String(params['OptUisText']),
		vscVolumeFeature: 	 eval(params['OptVscFeature']),
		vscVolumeText: 		 String(params['OptVscText'])
	}

};


//==============================================================================================================
// * 2.01 : Audio Manager - General & Initiazing
//==============================================================================================================

AudioManager._masterVolume = 100;
AudioManager._uisVolume = 100;
AudioManager._vscVolume = 100;
AudioManager._bgmBuffers = [];
AudioManager._bgmRemover = [];
AudioManager._bgsBuffers = [];
AudioManager._bgsRemover = [];
AudioManager._seBuffers = [];
AudioManager._staticBuffers = [];
AudioManager._uisBuffers = [];
AudioManager._vscBuffers = [];

Object.defineProperty(AudioManager, "masterVolume", {
    get: function() {
        return this._masterVolume;
    },
    set: function(value) {
        this._masterVolume = value;
        this.updateBgmParameters(this._currentBgm);
        this.updateBgsParameters(this._currentBgs);
        this.updateMeParameters(this._currentMe);
        this.updateAllMushBgmVolume();
        this.updateAllMushBgsVolume();
    },
    configurable: true
});

Object.defineProperty(AudioManager, "bgmVolume", {
    get: function() {
        return this._bgmVolume;
    },
    set: function(value) {
        this._bgmVolume = value;
        this.updateBgmParameters(this._currentBgm);
        this.updateAllMushBgmVolume();
    },
    configurable: true
});

Object.defineProperty(AudioManager, "bgsVolume", {
    get: function() {
        return this._bgsVolume;
    },
    set: function(value) {
        this._bgsVolume = value;
        this.updateBgsParameters(this._currentBgs);
        this.updateAllMushBgsVolume();
    },
    configurable: true
});

Object.defineProperty(AudioManager, "uisVolume", {
    get: function() {
        return this._uisVolume;
    },
    set: function(value) {
        this._uisVolume = value;
    },
    configurable: true
});

Object.defineProperty(AudioManager, "vscVolume", {
    get: function() {
        return this._vscVolume;
    },
    set: function(value) {
        this._vscVolume = value;
        this.updateAllMushVscVolume();
    },
    configurable: true
});

AudioManager.updateAllMushBgmVolume = function() {
	for (var i = 0; i < this._bgmBuffers.length; i++) {
		const buffer = this._bgmBuffers[i];
		var bgm = {name: buffer.name, pitch: buffer.pitch * 100, volume: buffer.settingVolume};
		this.updateMushBgmParameters(buffer, bgm);
	}
};

AudioManager.updateAllMushBgsVolume = function() {
	for (var i = 0; i < this._bgsBuffers.length; i++) {
		const buffer = this._bgsBuffers[i];
		var bgs = {name: buffer.name, pitch: buffer.pitch * 100, volume: buffer.settingVolume};
		this.updateMushBgsParameters(buffer, bgs);
	}
};

AudioManager.updateAllMushVscVolume = function() {
	for (var i = 0; i < this._vscBuffers.length; i++) {
		const buffer = this._vscBuffers[i];
		var vsc = {name: buffer.name, pitch: buffer.pitch * 100, volume: buffer.settingVolume};
		this.updateVscParameters(buffer, vsc);
	}
};

AudioManager.continueBuffer = function(buffer) {
	buffer.play(true, buffer.currentPosition);
	buffer.currentPosition = null;
	buffer.currentlyPaused = false;
};

AudioManager.initializeSpatialAudioOnStart = function(data) {
	for (var i = 0; i < data.bgm.length; i++) {
		const dt = data.bgm[i];
		var bgm = {name: dt.filename, pitch: dt.pitch, volume: 0};
		AudioManager.playMushBgm(bgm, dt.channel, true);
		const buffer = AudioManager.getBgmFromChannel(dt.channel);
		buffer.spatialData = dt;
	}
	for (var i = 0; i < data.bgs.length; i++) {
		const dt = data.bgs[i];
		var bgs = {name: dt.filename, pitch: dt.pitch, volume: 0};
		AudioManager.playMushBgs(bgs, dt.channel, true);
		const buffer = AudioManager.getBgsFromChannel(dt.channel);
		buffer.spatialData = dt;
	}
};


//==============================================================================================================
// * 2.02 : Audio Manager - SE and UIS
//==============================================================================================================

AudioManager.playSe = function(se, pitchVar, volumeVar) {
    if (se.name) {
        // [Note] Do not play the same sound in the same frame.
        var seDt = {name: se.name, pitch: se.pitch, volume: se.volume, pan: se.pan};
        const latestBuffers = this._seBuffers.filter(
            buffer => buffer.frameCount === Graphics.frameCount
        );
        if (latestBuffers.find(buffer => buffer.name === se.name)) {
            return;
        }
        if ( (Mush.parameters.mushAudioEngine.seUisVar.sePitchFea == true && pitchVar != false) || (pitchVar == true) ) {
        	var por = seDt.pitch * 2 * Mush.parameters.mushAudioEngine.seUisVar.sePitchRange / 100;
        	var set = por / 2;
        	var variance = Math.random() * por;
        	seDt.pitch = Math.round(seDt.pitch - set + variance);
        }
        if ( (Mush.parameters.mushAudioEngine.seUisVar.seVolumeFea == true && volumeVar != false) || (volumeVar == true) ) {
        	var por = seDt.volume * 2 * Mush.parameters.mushAudioEngine.seUisVar.seVolumeRange / 100;
        	var set = por / 2;
        	var variance = Math.random() * por;
        	seDt.volume = Math.min(Math.round(seDt.volume - set + variance), 100);
        }
        const buffer = this.createBuffer("se/", se.name);
        this.updateSeParameters(buffer, seDt);
        buffer.play(false);
        this._seBuffers.push(buffer);
        this.cleanupSe();
    }
};

// Static SE are UIS
AudioManager.playStaticSe = function(se) {
    if (se.name) {
    	var pdt = Mush.parameters.mushAudioEngine;
    	var seDt = {name: se.name, pitch: se.pitch, volume: se.volume};
    	if (pdt.genFeatures.uis) {
    		var pFea = pdt.seUisVar.uisPitchFea;
    		var pRan = pdt.seUisVar.uisPitchRange;
    		var vFea = pdt.seUisVar.uisVolumeFea;
    		var vRan = pdt.seUisVar.uisVolumeRange;
    	} else if (pdt.seUisVar.staticFollowSe) {
    		var pFea = pdt.seUisVar.sePitchFea;
    		var pRan = pdt.seUisVar.sePitchRange;
    		var vFea = pdt.seUisVar.seVolumeFea;
    		var vRan = pdt.seUisVar.seVolumeRange;
    	} else {
    		var pFea = false;
    		var pRan = 0;
    		var vFea = false;
    		var vRan = 0;
    	}
    	if (pFea) {
    		var por = seDt.pitch * 2 * pRan / 100;
    		var set = por / 2;
    		var variance = Math.random() * por;
    		seDt.pitch = Math.round(seDt.pitch - set + variance);
    	}
    	if (vFea) {
    		var por = seDt.volume * 2 * vRan / 100;
    		var set = por / 2;
    		var variance = Math.random() * por;
    		seDt.volume = Math.min(Math.round(seDt.volume - set + variance), 100);
    	}
        this.loadStaticSe(se);
        for (const buffer of this._staticBuffers) {
            if (buffer.name === se.name) {
                buffer.stop();
                if (pdt.genFeatures.uis) {
                	this.updateUisParameters(buffer, seDt);
                } else {
                	this.updateSeParameters(buffer, seDt);
                }
                buffer.play(false);
                break;
            }
        }
    }
};


//==============================================================================================================
// * 2.03 : Audio Manager - New BGM and BGS 
//==============================================================================================================

AudioManager.playMushBgm = function(bgm, channel, autoRemover, interrupt, pos) {
	if (bgm.name) {
		if (this.getBgmFromChannel(channel)) {
			const buffer = this.getBgmFromChannel(channel);
			if (buffer.name != bgm.name) {
				if (Mush.parameters.mushAudioEngine.devMode) {
					alert("There is already a BGM playing in channel " + channel + "!");
				}
			} else {
				this.updateMushBgmParameters(buffer, bgm);
			}
		} else {
			const buffer = this.createBuffer("bgm/", bgm.name);
			buffer.channel = channel;
			buffer.settingVolume = bgm.volume;
			buffer.currentlyPaused = false;
			buffer.currentPosition = null;
			if (typeof interrupt == 'string') {
				buffer.pause = interrupt;
			} else {
				buffer.pause = "Pause";
			}
			if (autoRemover != false) {
				buffer.autoRemover = true;
			} else {
				buffer.autoRemover = false;
			}
			this._bgmBuffers.push(buffer);
			buffer.play(true, pos || 0);
			if (!this._meBuffer) {
            	buffer.play(true, pos || 0);
            	this.updateMushBgmParameters(buffer, bgm);
        	}
		}
    }
};

AudioManager.fadeInMushBgm = function(channel, duration) {
	const buffer = this.getBgmFromChannel(channel);
	buffer.fadeIn(duration);
};

AudioManager.getBgmFromChannel = function(channel) {
	for (const buffer of this._bgmBuffers) {
		if (buffer.channel == channel) {
			return buffer;
		}
	}
	return null;
};

AudioManager.getBgmIdFromChannel = function(channel) {
	for (var i = 0; i < this._bgmBuffers.length; i++) {
		var buffer = this._bgmBuffers[i];
		if (buffer.channel == channel) {
			return i;
		}
	}
	return null;
};

AudioManager.stopMushBgm = function(channel) {
	const buffer = this.getBgmFromChannel(channel);
	if (buffer) {
		buffer.destroy();
		if (buffer.spatialData) {
			if (buffer.spatialData.reduceMain) {
				var mainBgm = {name: AudioManager._currentBgm.name, pan: AudioManager._currentBgm.pan, 
								pitch: AudioManager._currentBgm.pitch, volume: AudioManager._currentBgm.volume};
				if (AudioManager._bgmBuffer) {
					if (AudioManager._bgmBuffer.isPlaying()) {
						AudioManager.updateBgmParameters(mainBgm);
					}
				}
			}
		}
		this._bgmBuffers.splice(this.getBgmIdFromChannel(channel), 1);
		$gamePlayer.clearSpatialBgm(channel);
	}
};

AudioManager.stopAllMushBgm = function(duration) {
	const allChannels = [];
	for (var i = 0; i < this._bgmBuffers.length; i++) {
		const channel = this._bgmBuffers[i].channel;
		allChannels.push(channel);
	}
	for (var i = 0; i < allChannels.length; i++) {
		if (duration > 0) {
			this.fadeOutMushBgm(allChannels[i], duration);
		} else {
			this.stopMushBgm(allChannels[i]);
		}
	}
};

AudioManager.pauseMushBgm = function(channel) {
	const buffer = this.getBgmFromChannel(channel);
	if (buffer) {
		buffer.currentlyPaused = true;
		buffer.currentPosition = buffer.seek();
		buffer.stop();
	}
};

AudioManager.continueMushBgm = function(channel) {
	const buffer = AudioManager.getBgmFromChannel(channel);
	AudioManager.continueBuffer(buffer);
};

AudioManager.changeVolumeBgm = function(channel, volume) {
	const buffer = AudioManager.getBgmFromChannel(channel);
	if (buffer) {
		const bgm = {
			name: buffer.name,
			pitch: buffer.pitch * 100,
			volume: volume
		}
		AudioManager.updateMushBgmParameters(buffer, bgm);
	} else if (Mush.parameters.mushAudioEngine.devMode) {
		alert("There is no MUSH BGM playing in channel " + channel + ".");
	}
};

AudioManager.checkAlreadyHaveBgmAudioChannel = function(channel) {
	var already = false;
	var container = this._bgmBuffers;
	for (var i = 0; i < container.length; i++) {
		if (container[i].channel == channel) {
			already = true;
			break;
		}
	}
	return already;
};

AudioManager.playMushBgs = function(bgs, channel, autoRemover, interrupt, pos) {
	if (bgs.name) {
		if (this.getBgsFromChannel(channel)) {
			const buffer = this.getBgsFromChannel(channel);
			if (buffer.name != bgs.name) {
				if (Mush.parameters.mushAudioEngine.devMode) {
					alert("There is already a BGS playing in channel " + channel + "!");
				}
			} else {
				this.updateMushBgsParameters(buffer, bgs);
			}
		} else {
			const buffer = this.createBuffer("bgs/", bgs.name);
			buffer.channel = channel;
			buffer.settingVolume = bgs.volume;
			buffer.currentlyPaused = false;
			buffer.currentPosition = null;
			if (typeof interrupt == 'string') {
				buffer.pause = interrupt;
			} else {
				buffer.pause = "Pause";
			}
			if (autoRemover != false) {
				buffer.autoRemover = true;
			} else {
				buffer.autoRemover = false;
			}
			this._bgsBuffers.push(buffer);
			buffer.play(true, pos || 0);
			if (!this._meBuffer) {
            	buffer.play(true, pos || 0);
            	this.updateMushBgsParameters(buffer, bgs);
        	}
		}
    }
};

AudioManager.fadeInMushBgs = function(channel, duration) {
	const buffer = this.getBgsFromChannel(channel);
	buffer.fadeIn(duration);
};

AudioManager.getBgsFromChannel = function(channel) {
	for (const buffer of this._bgsBuffers) {
		if (buffer.channel == channel) {
			return buffer;
		}
	}
	return null;
};

AudioManager.getBgsIdFromChannel = function(channel) {
	for (var i = 0; i < this._bgsBuffers.length; i++) {
		var buffer = this._bgsBuffers[i];
		if (buffer.channel == channel) {
			return i;
		}
	}
	return null;
};

AudioManager.stopMushBgs = function(channel) {
	const buffer = this.getBgsFromChannel(channel);
	if (buffer) {
		buffer.destroy();
		this._bgsBuffers.splice(this.getBgsIdFromChannel(channel), 1);
		$gamePlayer.clearSpatialBgs(channel);
	}
};

AudioManager.stopAllMushBgs = function(duration) {
	const allChannels = [];
	for (var i = 0; i < this._bgsBuffers.length; i++) {
		const channel = this._bgsBuffers[i].channel;
		allChannels.push(channel);
	}
	for (var i = 0; i < allChannels.length; i++) {
		if (duration > 0) {
			this.fadeOutMushBgs(allChannels[i], duration);
		} else {
			this.stopMushBgs(allChannels[i]);
		}
	}
};

AudioManager.pauseMushBgs = function(channel) {
	const buffer = this.getBgsFromChannel(channel);
	if (buffer) {
		buffer.currentlyPaused = true;
		buffer.currentPosition = buffer.seek();
		buffer.stop();
	}
};

AudioManager.continueMushBgs = function(channel) {
	const buffer = AudioManager.getBgsFromChannel(channel);
	AudioManager.continueBuffer(buffer);
};

AudioManager.changeVolumeBgs = function(channel, volume) {
	const buffer = AudioManager.getBgsFromChannel(channel);
	if (buffer) {
		const bgs = {
			name: buffer.name,
			pitch: buffer.pitch * 100,
			volume: volume
		}
		AudioManager.updateMushBgsParameters(buffer, bgs);
	} else if (Mush.parameters.mushAudioEngine.devMode) {
		alert("There is no MUSH BGS playing in channel " + channel + ".");
	}
};

AudioManager.checkAlreadyHaveBgsAudioChannel = function(channel) {
	var already = false;
	var container = this._bgsBuffers;
	for (var i = 0; i < container.length; i++) {
		if (container[i].channel == channel) {
			already = true;
			break;
		}
	}
	return already;
};

//==============================================================================================================
// * 2.04 : Audio Manager - General Buffer Methods
//==============================================================================================================

AudioManager.getConfigVolume_Bgm = function() {
	return Math.round(Mush.parameters.mushAudioEngine.volumeBalance.bgmLevel * this._bgmVolume * this._masterVolume / 10000);
};

AudioManager.getConfigVolume_Bgs = function() {
	return Math.round(Mush.parameters.mushAudioEngine.volumeBalance.bgsLevel * this._bgsVolume * this._masterVolume / 10000);
};

AudioManager.getConfigVolume_Me = function() {
	return Math.round(Mush.parameters.mushAudioEngine.volumeBalance.meLevel * this._meVolume * this._masterVolume / 10000);
};

AudioManager.getConfigVolume_Se = function() {
	return Math.round(Mush.parameters.mushAudioEngine.volumeBalance.seLevel * this._seVolume * this._masterVolume / 10000);
};

AudioManager.getConfigVolume_Uis = function() {
	return Math.round(Mush.parameters.mushAudioEngine.volumeBalance.uisLevel * this._uisVolume * this._masterVolume / 10000);
};

AudioManager.getConfigVolume_Vsc = function() {
	return Math.round(Mush.parameters.mushAudioEngine.volumeBalance.vscLevel * this._vscVolume * this._masterVolume / 10000);
};

AudioManager.updateBgmParameters = function(bgm) {
    this.updateBufferParameters(this._bgmBuffer, this.getConfigVolume_Bgm(), bgm);
};

AudioManager.updateMushBgmParameters = function(buffer, bgm) {
    this.updateBufferParameters(buffer, this.getConfigVolume_Bgm(), bgm);
    buffer.settingVolume = bgm.volume;
};

AudioManager.updateBgsParameters = function(bgs) {
    this.updateBufferParameters(this._bgsBuffer, this.getConfigVolume_Bgs(), bgs);
};

AudioManager.updateMushBgsParameters = function(buffer, bgs) {
    this.updateBufferParameters(buffer, this.getConfigVolume_Bgs(), bgs);
    buffer.settingVolume = bgs.volume;
};

AudioManager.updateMeParameters = function(me) {
    this.updateBufferParameters(this._meBuffer, this.getConfigVolume_Me(), me);
};

AudioManager.updateSeParameters = function(buffer, se) {
    this.updateBufferParameters(buffer, this.getConfigVolume_Se(), se);
};

AudioManager.updateUisParameters = function(buffer, uis) {
    this.updateBufferParameters(buffer, this.getConfigVolume_Uis(), uis);
};

AudioManager.updateVscParameters = function(buffer, vsc) {
    this.updateBufferParameters(buffer, this.getConfigVolume_Vsc(), vsc);
    buffer.settingVolume = vsc.volume;
};


//==============================================================================================================
// * 2.05 : Audio Manager - Spacial Audio Calculation
//==============================================================================================================

//--------------------------------------
// * Channel: the audio channel
// * type: 'bgm' or 'bgs'
// * id: used for event id if dynamic
// * dynamic: true/false. If true, it means audio source can move.
// * panType: decides how the audio will pan.
// * panSt: decides when the audio starts panning
// * panLd: decides length of the gradual panning before audio becomes fully panned. 
//--------------------------------------
AudioManager.createSpacialAudioObject = function(filename, pitch, channel, type, dynamic, maxVolume, radius, strength, 
		pan, panSt, panLd) {
	var obj = {
		filename: filename,
		pitch: pitch,
		channel: channel,
		type: type,
		dynamic: dynamic,
		maxVolume: maxVolume,
		radius: radius,
		strength: strength,
		panType: pan,
		panStartDist: panSt,
		panLengthDist: panLd
	}
	return obj;
};

AudioManager.getSpacialVolume = function(oPos, pPos, radius, strength, maxVolume) {
	var diff_x = Math.abs(pPos.x - oPos.x);
	var diff_y = Math.abs(pPos.y - oPos.y);
	var dist = Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2));
	if (dist > radius) {
		return 0;
	} else {
		var ddt = Math.pow((dist / radius), strength / 100);
		var per = Math.max(Math.min(1 - ddt, 1), 0);
		var vol = Math.round(maxVolume * per);
		return vol; 
	}
};

AudioManager.getRealPan = function(oPos, pPos) {
	var diff_x = Math.abs(oPos.x - pPos.x);
	var diff_y = Math.abs(oPos.y - pPos.y);
	var rPan = Math.round(diff_x / (diff_x + diff_y) * 100);
	if (oPos.x > pPos.x) {
		rPan *= (-1);
	}
	return rPan;
};

AudioManager.getExpandedPan = function(rPan, dist, radius, panSt, panLd) {
	var per = (panLd - (dist - panSt)) / panLd;
	per = Math.min(Math.max(per, 0), 1);
	var inv = 1 - per;
	var tPan = Math.round(rPan * inv);
	return tPan;
};

AudioManager.updateMushBgmSpatialData = function(bgm, channel) {
	const buffer = this.getBgmFromChannel(channel);
	this.updateMushBgmParameters(buffer, bgm);
};

AudioManager.updateMushBgsSpatialData = function(bgs, channel) {
	const buffer = this.getBgsFromChannel(channel);
	this.updateMushBgsParameters(buffer, bgs);
};


//==============================================================================================================
// * 2.06 : Audio Manager - Update Method
//==============================================================================================================

AudioManager.update = function() {
	this.updateAudioRemoval();
};


//==============================================================================================================
// * 2.07 : Audio Manager - BGM and BGS Remover
//==============================================================================================================

AudioManager.updateAudioRemoval = function() {
	var bgmRemo = [];
	var bgsRemo = [];
	for (var i = 0; i < this._bgmRemover.length; i++) {
		if (this._bgmRemover[i].time < this._bgmRemover[i].duration) {
			this._bgmRemover[i].time += 1;
		} else {
			this.stopMushBgm(this._bgmRemover[i].channel);
			bgmRemo.push(this._bgmRemover[i].channel);
			this._bgmRemover.splice(i, 1);
		}
	}
	for (var i = 0; i < this._bgsRemover.length; i++) {
		if (this._bgsRemover[i].time < this._bgsRemover[i].duration) {
			this._bgsRemover[i].time += 1;
		} else {
			this.stopMushBgs(this._bgsRemover[i].channel);
			bgsRemo.push(this._bgsRemover[i].channel);
			this._bgsRemover.splice(i, 1);
		}
	}
	if (bgmRemo.length > 0) {
		for (var i = 0; i < bgmRemo.length; i++) {
			for (var j = 0; j < this._bgmRemover.length; j++) {
				if (this._bgmRemover[j].channel == bgmRemo[i]) {
					this._bgmRemover.splice(j, 1);
				}
			}
		}
	}
	if (bgsRemo.length > 0) {
		for (var i = 0; i < bgsRemo.length; i++) {
			for (var j = 0; j < this._bgsRemover.length; j++) {
				if (this._bgsRemover[j].channel == bgsRemo[i]) {
					this._bgsRemover.splice(j, 1);
				}
			}
		}
	}
};

AudioManager.addRemovalMushBgm = function(channel, duration) {
	var obj = {
		channel: channel,
		duration: duration * 60,
		time: 0,
	}
	this._bgmRemover.push(obj);
	if ($gamePlayer.checkAlreadyHaveAudioChannel_Container(channel, "bgm")) {
		$gamePlayer.clearSpatialBgm(channel);
	}
};

AudioManager.fadeOutMushBgm = function(channel, duration) {
	var id = this.getBgmIdFromChannel(channel);
	if (id >= 0 && id != null && id != undefined) {
		this._bgmBuffers[id].fadeOut(duration);
		this.addRemovalMushBgm(channel, duration);
	}
};

AudioManager.closeFadingBgms = function() {
	for (var i = 0; i < this._bgmRemover.length; i++) {
		this.stopMushBgm(this._bgmRemover[i].channel);
	}
	this._bgmRemover = [];
};

AudioManager.generalClearMushBgms = function() {
	var remover = [];
	for (var i = 0; i < this._bgmBuffers.length; i++) {
		if (this._bgmBuffers[i].autoRemover) {
			remover.push(this._bgmBuffers[i].channel);
		}
	}
	for (var i = 0; i < remover.length; i++) {
		this.stopMushBgm(remover[i]);
	}
};

AudioManager.addRemovalMushBgs = function(channel, duration) {
	var obj = {
		channel: channel,
		duration: duration * 60,
		time: 0,
	}
	this._bgsRemover.push(obj);
	if ($gamePlayer.checkAlreadyHaveAudioChannel_Container(channel, "bgs")) {
		$gamePlayer.clearSpatialBgs(channel);
	}
};

AudioManager.fadeOutMushBgs = function(channel, duration) {
	var id = this.getBgsIdFromChannel(channel);
	if (id >= 0 && id != null && id != undefined) {
		this._bgsBuffers[id].fadeOut(duration);
		this.addRemovalMushBgs(channel, duration);
	}
};

AudioManager.closeFadingBgss = function() {
	for (var i = 0; i < this._bgsRemover.length; i++) {
		this.stopMushBgs(this._bgsRemover[i].channel);
	}
	this._bgsRemover = [];
};

AudioManager.generalClearMushBgss = function() {
	var remover = [];
	for (var i = 0; i < this._bgsBuffers.length; i++) {
		if (this._bgsBuffers[i].autoRemover) {
			remover.push(this._bgsBuffers[i].channel);
		}
	}
	for (var i = 0; i < remover.length; i++) {
		this.stopMushBgs(remover[i]);
	}
};


//==============================================================================================================
// * 2.08 : Audio Manager - Spatial SE Player
//==============================================================================================================

AudioManager.playSpatialSe = function(se, data) {
	var ev = $gameMap.event(data.eventId);
	var pPos = {x: ev.x, y: ev.y};
	var oPos = {x: $gamePlayer.x, y: $gamePlayer.y};
	var mv = this.getSpacialVolume(oPos, pPos, data.radius, data.strength, data.maxVolume);
	var rPan = this.getRealPan(oPos, pPos);
	if (data.panType == "Linear Scaling") {
		var obj = {mv: mv, pan: rPan};
	} else if (data.panType == "Origin Expand") {
		var diff_x = Math.abs(oPos.x - pPos.x);
		var diff_y = Math.abs(oPos.y - pPos.y);
		var dist = Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2));
		var tPan = AudioManager.getExpandedPan(rPan, dist, data.radius, data.panSt, data.panLd);
		var obj = {mv: mv, pan: tPan};
	}
	se.volume = obj.mv;
	se.pan = obj.pan;
	var pv = undefined;
	var vv = undefined;
	if (data.pitchVar == "On") {
		pv = true;
	} else if (data.pitchVar == "Off") {
		pv = false;
	}
	if (data.volumeVar == "On") {
		vv = true;
	} else if (data.volumeVar == "Off") {
		vv = false;
	}
	this.playSe(se, pv, vv);
};


//==============================================================================================================
// * 2.09 : Audio Manager - VSC Section
//==============================================================================================================

AudioManager.playVsc = function(vsc) {
	if (vsc.name) {
		if (this.getVscIdFromChannel(vsc.channel) != null) {
			this.stopVsc(vsc.channel);
			this.playVsc(vsc);
		} else {
			const buffer = this.createBuffer("vsc/", vsc.name);
	        this.updateVscParameters(buffer, vsc);
	        buffer.play(false);
	        buffer.settingVolume = vsc.volume;
	        buffer.pause = vsc.pause;
	        buffer.channel = vsc.channel;
	        buffer.currentlyPaused = false;
	        buffer.currentPosition = null;
	        this._vscBuffers.push(buffer);
	        this.cleanupVsc();
		}
    }
};

AudioManager.playVscManually = function(vsc, channel, interrupt) {
	vsc.channel = channel;
	vsc.pause = interrupt;
	if (!interrupt) vsc.pause = "Stop";
	this.playVsc(vsc);
};

AudioManager.cleanupVsc = function() {
    for (const buffer of this._vscBuffers) {
        if (!buffer.isPlaying() && !buffer.currentlyPaused) {
            buffer.destroy();
        }
    }
    this._vscBuffers = this._vscBuffers.filter(buffer => buffer.isPlaying() || buffer.currentlyPaused);
};

AudioManager.getVscFromChannel = function(channel) {
	for (const buffer of this._vscBuffers) {
		if (buffer.channel == channel) {
			return buffer;
		}
	}
	return null;
};

AudioManager.getVscIdFromChannel = function(channel) {
	for (var i = 0; i < this._vscBuffers.length; i++) {
		var buffer = this._vscBuffers[i];
		if (buffer.channel == channel) {
			return i;
		}
	}
	return null;
};

AudioManager.stopVsc = function(channel) {
	const buffer = this.getVscFromChannel(channel);
	if (buffer) {
		buffer.destroy();
		this._vscBuffers.splice(this.getVscIdFromChannel(channel), 1);
	}
};

AudioManager.pauseVsc = function(channel) {
	const buffer = this.getVscFromChannel(channel);
	if (buffer) {
		buffer.currentlyPaused = true;
		buffer.currentPosition = buffer.seek();
		buffer.stop();
	}
};


//==============================================================================================================
// * 2.10 : Audio Manager - ME Section
//==============================================================================================================

Mush.alias.AudioManager_PlayMe_001 = AudioManager.playMe;
AudioManager.playMe = function(me) {
	if (me.name) {
        if (this._meBuffer == null) {
        	this.me_stopAllBgmBgs();
        }
    }
    Mush.alias.AudioManager_PlayMe_001.call(this, me);
};

Mush.alias.AudioManager_StopMe_001 = AudioManager.stopMe;
AudioManager.stopMe = function() {
    if (this._meBuffer) {
        AudioManager.me_restartAllMushBgmBgs();
    }
    Mush.alias.AudioManager_StopMe_001.call(this);
};

AudioManager.isMePlaying = function() {
	if (this._meBuffer) {
		this._meBuffer.isPlaying();
	} else {
		return false;
	}
};

AudioManager.me_stopAllBgmBgs = function() {
	for (var i = 0; i < this._bgmBuffers.length; i++) {
		const buffer = this._bgmBuffers[i];
		AudioManager.pauseMushBgm(buffer.channel);
	}
	for (var i = 0; i < this._bgsBuffers.length; i++) {
		const buffer = this._bgsBuffers[i];
		AudioManager.pauseMushBgs(buffer.channel);
	}
};

AudioManager.me_restartAllMushBgmBgs = function() {
	for (var i = 0; i < this._bgmBuffers.length; i++) {
		const buffer = this._bgmBuffers[i];
		AudioManager.continueMushBgm(buffer.channel);
	}
	for (var i = 0; i < this._bgsBuffers.length; i++) {
		const buffer = this._bgsBuffers[i];
		AudioManager.continueMushBgs(buffer.channel);
	}
	$gamePlayer.requestSpatialAudioUpdate_full();
};


//==============================================================================================================
// * 3.01 : Plugin Manager
//==============================================================================================================

PluginManager.registerCommand('MUSH_Audio_Engine', 'AddSpacialBgm', args => {
	var r = Number(args.Radius);
	if (r == 0) {
		var rRadius = Math.sqrt(Math.pow($dataMap.width / 2, 2) + Math.pow($dataMap.height / 2, 2));
	} else {
		var rRadius = r;
	}
	var obj = AudioManager.createSpacialAudioObject(String(args.Filename), Number(args.Pitch), Number(args.Channel), 
				'bgs', eval(args.Dynamic), Number(args.MaxVolume), rRadius, Number(args.Strength), 
				String(args.Pan), Number(args.PanSt), Number(args.PanLd));
	obj.reduceMain = eval(args.ReduceMain);
	$gamePlayer.addSpacialBGM(obj);
	var bgm = {name: obj.filename, pitch: obj.pitch, volume: 0};
	AudioManager.playMushBgm(bgm, obj.channel, true);
	const buffer = AudioManager.getBgmFromChannel(obj.channel);
	buffer.spatialData = obj;
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'AddSpacialBgs', args => {
	var r = Number(args.Radius);
	if (r == 0) {
		var rRadius = Math.sqrt(Math.pow($dataMap.width / 2, 2) + Math.pow($dataMap.height / 2, 2));
	} else {
		var rRadius = r;
	}
	var obj = AudioManager.createSpacialAudioObject(String(args.Filename), Number(args.Pitch), Number(args.Channel), 
				'bgs', eval(args.Dynamic), Number(args.MaxVolume), rRadius, Number(args.Strength), 
				String(args.Pan), Number(args.PanSt), Number(args.PanLd));
	$gamePlayer.addSpacialBGS(obj);
	var bgs = {name: obj.filename, pitch: obj.pitch, volume: 0};
	AudioManager.playMushBgs(bgs, obj.channel, true);
	const buffer = AudioManager.getBgsFromChannel(obj.channel);
	buffer.spatialData = obj;
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'PlayBgm', args => {
	var bgm = {name: String(args.Filename), pitch: Number(args.Pitch), volume: Number(args.Volume), pan: Number(args.Pan)};
	if (!AudioManager.checkAlreadyHaveBgmAudioChannel(args.Channel)) {
		AudioManager.playMushBgm(bgm, Number(args.Channel), eval(args.AutoRemover), args.Interrupt);
		if (Number(args.FadeIn) > 0) {
			AudioManager.fadeInMushBgm(Number(args.Channel), Number(args.FadeIn));
		}
	} else {
		if (Mush.parameters.mushAudioEngine.devMode) {
			alert("Can't play " + args.Filename + " because BGM Channel " + args.Channel + " is already in use!");
		}
	}
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'PlayBgs', args => {
	var bgs = {name: String(args.Filename), pitch: Number(args.Pitch), volume: Number(args.Volume), pan: Number(args.Pan)};
	if (!AudioManager.checkAlreadyHaveBgsAudioChannel(args.Channel)) {
		AudioManager.playMushBgs(bgs, Number(args.Channel), eval(args.AutoRemover), args.Interrupt);
		if (Number(args.FadeIn) > 0) {
			AudioManager.fadeInMushBgs(Number(args.Channel), Number(args.FadeIn));
		}
	} else {
		if (Mush.parameters.mushAudioEngine.devMode) {
			alert("Can't play " + args.Filename + " because BGS Channel " + args.Channel + " is already in use!");
		}
	}
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'StopBgm', args => {
	if (Number(args.FadeOut) > 0) {
		AudioManager.fadeOutMushBgm(Number(args.Channel), Number(args.FadeOut));
	} else {
		AudioManager.stopMushBgm(Number(args.Channel));
	}
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'StopBgs', args => {
	if (Number(args.FadeOut > 0)) {
		AudioManager.fadeOutMushBgs(Number(args.Channel), Number(args.FadeOut));
	} else {
		AudioManager.stopMushBgs(args.Channel);
	}
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'StopAllBgm', args => {
	AudioManager.stopAllMushBgm(Number(args.FadeOut));
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'StopAllBgs', args => {
	AudioManager.stopAllMushBgs(Number(args.FadeOut));
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'ChangeVolumeBgm', args => {
	AudioManager.changeVolumeBgm(Number(args.Channel), Number(args.Volume))
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'ChangeVolumeBgs', args => {
	AudioManager.changeVolumeBgs(Number(args.Channel), Number(args.Volume))
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'PlaySpatialSe', args => {
	var se = {
		name: String(args.Filename),
		pitch: Number(args.Pitch),
		volume: 0
	}
	var data = {
		pitchVar: String(args.PitchVariance),
		volumeVar: String(args.VolumeVariance),
		maxVolume: Number(args.MaxVolume),
		eventId: Number(args.EventId),
		radius: Number(args.Radius),
		strength: Number(args.Strength),
		panType: String(args.Pan),
		panSt: Number(args.PanSt),
		panLd: Number(args.PanLd)
	}
	AudioManager.playSpatialSe(se, data);
});

PluginManager.registerCommand('MUSH_Audio_Engine', 'PlayVsc', args => {
	var vsc = {name: String(args.Filename), channel: Number(args.Channel), pitch: Number(args.Pitch), 
				volume: Number(args.Volume), pan: Number(args.Pan), pause: String(args.Interrupt)};
	AudioManager.playVsc(vsc);
});


//==============================================================================================================
// * 3.02 : Config Manager
//==============================================================================================================

Object.defineProperty(ConfigManager, "masterVolume", {
    get: function() {
        return AudioManager.masterVolume;
    },
    set: function(value) {
        AudioManager.masterVolume = value;
    },
    configurable: true
});

Object.defineProperty(ConfigManager, "uisVolume", {
    get: function() {
        return AudioManager.uisVolume;
    },
    set: function(value) {
        AudioManager.uisVolume = value;
    },
    configurable: true
});

Object.defineProperty(ConfigManager, "vscVolume", {
    get: function() {
        return AudioManager.vscVolume;
    },
    set: function(value) {
        AudioManager.vscVolume = value;
    },
    configurable: true
});

Mush.alias.ConfigManager_MakeData_002 = ConfigManager.makeData;
ConfigManager.makeData = function() {
    const config = Mush.alias.ConfigManager_MakeData_002.call(this);
    config.masterVolume = this.masterVolume;
    config.uisVolume = this.uisVolume;
    config.vscVolume = this.vscVolume;
    return config;
};

Mush.alias.ConfigManager_ApplyData_002 = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Mush.alias.ConfigManager_ApplyData_002.call(this, config);
    this.masterVolume = this.readVolume(config, "masterVolume");
    this.uisVolume = this.readVolume(config, "uisVolume");
    this.vscVolume = this.readVolume(config, "vscVolume");
};


//==============================================================================================================
// * 3.03 : Data Manager
//==============================================================================================================

Mush.alias.DataManager_MakeSaveContents_002 = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
    const contents = Mush.alias.DataManager_MakeSaveContents_002.call(this);
    contents.mushAudio = this.makeMushAudioContents();
    return contents;
};

Mush.alias.DataManager_ExtractSaveContents_002 = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Mush.alias.DataManager_ExtractSaveContents_002.call(this, contents);
    AudioManager.initializeSpatialAudioOnStart(contents.mushAudio);
};

DataManager.makeMushAudioContents = function() {
	const audio = {bgm: [], bgs: []};
	for (var i = 0; i < AudioManager._bgmBuffers.length; i++) {
		const buffer = AudioManager._bgmBuffers[i];
		if ($gamePlayer.checkAlreadyHaveAudioChannel_Container(buffer.channel, "bgm")) {
			audio.bgm.push(buffer.spatialData);
		}
	}
	for (var i = 0; i < AudioManager._bgsBuffers.length; i++) {
		const buffer = AudioManager._bgsBuffers[i];
		if ($gamePlayer.checkAlreadyHaveAudioChannel_Container(buffer.channel, "bgs")) {
			audio.bgs.push(buffer.spatialData);
		}
	}
	return audio;
};


//==============================================================================================================
// * 4.01 : Game Player - For region based spacial audio
//==============================================================================================================

Mush.alias.Game_Player_initMembers_001 = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    Mush.alias.Game_Player_initMembers_001.call(this);
    this._audioSpacial = {active: false, last_x: -1, last_y: -1};
    this._bgmTracker = [];
    this._bgsTracker = [];
    this._bgmDynamic = [];
    this._bgsDynamic = [];
};

Mush.alias.Game_Player_update_001 = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    Mush.alias.Game_Player_update_001.call(this, sceneActive);
    if (this._audioSpacial.active) {
    	this.updateSpacialAudio();
    }
};

Game_Player.prototype.updateSpacialAudio = function() {
	if (this._x != this._audioSpacial.last_x || this._y != this._audioSpacial.last_y) {
		this.requestSpatialAudioUpdate_general();
	} 
	if (this._bgmDynamic.length > 0) {
		this.requestSpatialAudioUpdate_bgmDynamic();
	}
	if (this._bgsDynamic.length > 0) {
		this.requestSpatialAudioUpdate_bgsDynamic();
	}
};

Game_Player.prototype.requestSpatialAudioUpdate_general = function() {
	this._audioSpacial.last_x = 0 + this._x;
	this._audioSpacial.last_y = 0 + this._y;
	for (var i = 0; i < this._bgmTracker.length; i++) {
		this.refreshSpacialAudio(i, 'bgm', '<bgm_source:');
	}
	for (var i = 0; i < this._bgsTracker.length; i++) {
		this.refreshSpacialAudio(i, 'bgs', '<bgs_source:');
	}
};

Game_Player.prototype.requestSpatialAudioUpdate_bgmDynamic = function() {
	for (var i = 0; i < this._bgmDynamic.length; i++) {
		var c = this._bgmDynamic[i];
		var haveToUpdate = false;
		for (var j = 0; j < this._bgmTracker.length; j++) {
			var t = this._bgmTracker[j];
			if (c.channel == t.channel) {
				var rEvent = $gameMap.event(c.eventId);
				if (rEvent.x != c.ex || rEvent.y != c.ey) {
					this._bgmDynamic[i].ex = 0 + rEvent.x;
					this._bgmDynamic[i].ey = 0 + rEvent.y;
					haveToUpdate = true;
					var index = 0 + j;
				}
			}
		}
		if (haveToUpdate) {
			this.refreshSpacialAudio(index, 'bgm', '<bgm_source:');
		}
	}
};

Game_Player.prototype.requestSpatialAudioUpdate_bgsDynamic = function() {
	for (var i = 0; i < this._bgsDynamic.length; i++) {
		var c = this._bgsDynamic[i];
		var haveToUpdate = false;
		for (var j = 0; j < this._bgsTracker.length; j++) {
			var t = this._bgsTracker[j];
			if (c.channel == t.channel) {
				var rEvent = $gameMap.event(c.eventId);
				if (rEvent.x != c.ex || rEvent.y != c.ey) {
					this._bgsDynamic[i].ex = 0 + rEvent.x;
					this._bgsDynamic[i].ey = 0 + rEvent.y;
					haveToUpdate = true;
					var index = 0 + j;
				}
			}
		}
		if (haveToUpdate) {
			this.refreshSpacialAudio(index, 'bgs', '<bgs_source:');
		}
	}
};

Game_Player.prototype.requestSpatialAudioUpdate_full = function() {
	this.requestSpatialAudioUpdate_general();
	if (this._bgmDynamic.length > 0) {
		this.requestSpatialAudioUpdate_bgmDynamic();
	}
	if (this._bgsDynamic.length > 0) {
		this.requestSpatialAudioUpdate_bgsDynamic();
	}
};

Game_Player.prototype.refreshSpacialAudio = function(index, type, source) {
	if (type == 'bgs') {
		var mus = this._bgsTracker[index];
	} else {
		var mus = this._bgmTracker[index];
	}
	var sourcesId = []
	var events = $dataMap.events;
	var oPos = {x: this._x + 0, y: this._y + 0};
	// Pan vars
	var highestVolume = 0;
	var oePans = []
	//-----------
	for (i = 1; i < events.length; i++) {
		var e = events[i];
		if (e != null) {
			if (e.note.includes(source)) {
				var channel = this.extractChannelFromNote(e.note, source);
				if (channel == mus.channel) {
					var pPos = {x: $gameMap.event(e.id).x, y: $gameMap.event(e.id).y};
					var mv = AudioManager.getSpacialVolume(oPos, pPos, mus.radius, mus.strength, mus.maxVolume);
					highestVolume = Math.max(highestVolume, mv);
					// Panning section part 1/2
					if (Mush.parameters.mushAudioEngine.genFeatures.spaPan) {
						var rPan = AudioManager.getRealPan(oPos, pPos);
						if (mus.panType == 'Linear Scaling') {
							var obj = {mv: mv, pan: rPan};
							oePans.push(obj);
						} else if (mus.panType == 'Origin Expand') {
							var diff_x = Math.abs(oPos.x - pPos.x);
							var diff_y = Math.abs(oPos.y - pPos.y);
							var dist = Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2));
							var tPan = AudioManager.getExpandedPan(rPan, dist, mus.radius, mus.panStartDist, mus.panLengthDist);
							var obj = {mv: mv, pan: tPan};
							oePans.push(obj);
						}
					}
					// End panning section part 1/2
				}
			}
		}
	}
	// Panning section part 2/2
	var pan = 0;
	if (Mush.parameters.mushAudioEngine.genFeatures.spaPan) {
		if (mus.panType == 'Linear Scaling' || mus.panType == 'Origin Expand') {
			var nom = 0;
			var den = 0;
			var test = "";
			for (i = 0; i < oePans.length; i++) {
				nom += (oePans[i].pan * oePans[i].mv);
				den += oePans[i].mv;
			}	
			pan = Math.round(nom / den);
		}
	} 
	// End panning section part 2/2
	var audio = {name: mus.filename, pitch: mus.pitch, volume: highestVolume, pan: pan};
	if (type == 'bgs') {
		AudioManager.updateMushBgsSpatialData(audio, mus.channel);
	} else {
		AudioManager.updateMushBgmSpatialData(audio, mus.channel);
		if (mus.reduceMain) {
			if (AudioManager._currentBgm) {
				var audPer = audio.volume / mus.maxVolume;
				var mainPer = Math.max(Math.min(1 - (audPer - 0.25) * 2, 1), 0);
				var mainMax = Math.round($dataMap.bgm.volume * mainPer);
				var mainBgm = {name: AudioManager._currentBgm.name, pan: AudioManager._currentBgm.pan, 
								pitch: AudioManager._currentBgm.pitch, volume: mainMax};
				AudioManager.updateBgmParameters(mainBgm);
			}
		}
	}
};

Game_Player.prototype.extractChannelFromNote = function(string, prefix) {
	var st = string.indexOf(prefix);
	var ed = string.indexOf(">", st);
	return Number(string.slice(st + prefix.length, ed));
};

Game_Player.prototype.checkAlreadyHaveAudioChannel = function(channel, container) {
	var already = false;
	for (var i = 0; i < container.length; i++) {
		if (container[i].channel == channel) {
			already = true;
			break;
		}
	}
	return already;
};

Game_Player.prototype.checkAlreadyHaveAudioChannel_Container = function(channel, type) {
	if (type == "bgm") {
		return this.checkAlreadyHaveAudioChannel(channel, this._bgmTracker);
	} else if (type == "bgs") {
		return this.checkAlreadyHaveAudioChannel(channel, this._bgsTracker);
	} else {
		if (Mush.parameters.mushAudioEngine.devMode) {
			alert("Error: No container.")
		}
		return null;
	}
};

Game_Player.prototype.addSpacialBGM = function(obj) {
	if (!this.checkAlreadyHaveAudioChannel(obj.channel, this._bgmTracker)) {
		this._audioSpacial.active = true;
		this._bgmTracker.push(obj);
		if (obj.dynamic) {
			var events = $dataMap.events;
			for (var i = 0; i < events.length; i++) {
				var e = events[i];
				if (e) {
					var ec = this.extractChannelFromNote(e.note, '<bgm_source:');
					if (ec == obj.channel) {
						var dt = {eventId: e.id, ex: -1, ey: -1, channel: ec};
						this._bgmDynamic.push(dt);
					}
				}
			}
		}
	} else {
		if (Mush.parameters.mushAudioEngine.devMode) {
			alert("You have 2 or more BGM using the same channel. Error: channel " + obj.channel);
		}
	}
};

Game_Player.prototype.addSpacialBGS = function(obj) {
	if (!this.checkAlreadyHaveAudioChannel(obj.channel, this._bgsTracker)) {
		this._audioSpacial.active = true;
		this._bgsTracker.push(obj);
		if (obj.dynamic) {
			var events = $dataMap.events;
			for (var i = 0; i < events.length; i++) {
				var e = events[i];
				if (e) {
					var ec = this.extractChannelFromNote(e.note, '<bgs_source:');
					if (ec == obj.channel) {
						var dt = {eventId: e.id, ex: -1, ey: -1, channel: ec};
						this._bgsDynamic.push(dt);
					}
				}
			}
		}
	} else {
		if (Mush.parameters.mushAudioEngine.devMode) {
			alert("You have 2 or more BGS using the same channel. Error: channel " + obj.channel);
		}
	}
};

Game_Player.prototype.clearSpatialBgm = function(channel) {
	var bt = null;
	var bd = null;
	for (var i = 0; i < this._bgmTracker.length; i++) {
		if (this._bgmTracker[i].channel == channel) {
			bt = i;
			break;
		}
	}
	for (var i = 0; i < this._bgmDynamic.length; i++) {
		if (this._bgmDynamic[i].channel == channel) {
			bd = i;
			break;
		}
	}
	if (bt != null) {
		this._bgmTracker.splice(bt, 1);
	} 
	if (bd != null) {
		this._bgmDynamic.splice(bd, 1);
	}
};

Game_Player.prototype.clearSpatialBgs = function(channel) {
	var bt = null;
	var bd = null;
	for (var i = 0; i < this._bgsTracker.length; i++) {
		if (this._bgsTracker[i].channel == channel) {
			bt = i;
			break;
		}
	}
	for (var i = 0; i < this._bgsDynamic.length; i++) {
		if (this._bgsDynamic[i].channel == channel) {
			bd = i;
			break;
		}
	}
	if (bt != null) {
		this._bgsTracker.splice(bt, 1);
	} 
	if (bd != null) {
		this._bgsDynamic.splice(bd, 1);
	}
};

Game_Player.prototype.clearAllSpatialObjects = function() {
	this._bgmTracker = [];
    this._bgsTracker = [];
    this._bgmDynamic = [];
    this._bgsDynamic = [];
};	


//==============================================================================================================
// * 4.02 : Game Map
//==============================================================================================================

Mush.alias.Game_Map_Autoplay_002 = Game_Map.prototype.autoplay;
Game_Map.prototype.autoplay = function() {
	Mush.alias.Game_Map_Autoplay_002.call(this);
    if (!$dataMap.autoplayBgm && Mush.parameters.mushAudioEngine.genFeatures.mapAutoplay) {
        if (!$gamePlayer.isInVehicle()) {
            this.checkParentsAutoplay_part1(this._mapId);
        }
    }
};

Game_Map.prototype.checkParentsAutoplay_part1 = function(mapId) {
	this._tempMapData = null;
    this._tempMapId = $dataMapInfos[mapId].parentId;
    if (this._tempMapId != 0) {
    	const filename = "Map%1.json".format(this._tempMapId.padZero(3));
		const xhr = new XMLHttpRequest();
	    const url = "data/" + filename;
	    xhr.open("GET", url);
	    xhr.overrideMimeType("application/json");
	    xhr.onload = () => this.checkParentsAutoplay_part2(xhr);
	    xhr.onerror = () => alert("Error loading map data.");
	    xhr.send();
    }
};

Game_Map.prototype.checkParentsAutoplay_part2 = function(xhr, mapId) {
    if (xhr.status < 400) {
        this._tempMapData = JSON.parse(xhr.responseText);
        if (this._tempMapData.autoplayBgm || this._tempMapData.autoplayBgs) {
        	if (this._tempMapData.autoplayBgm) {
        		AudioManager.playBgm(this._tempMapData.bgm);
        	}
        	this._tempMapData = null;
        	this._tempMapId = null;
        } else {
        	this.checkParentsAutoplay_part1(this._tempMapId);
        }
    } else {
    	if (Mush.parameters.mushAudioEngine.devMode) {
        	alert("Error loading map data.");
        }
    }
};


//==============================================================================================================
// * 4.03 : Game Interpreter
//==============================================================================================================

// Return to Title Screen
Mush.alias.Game_Interpreter_Command354_002 = Game_Interpreter.prototype.command354;
Game_Interpreter.prototype.command354 = function() {
	AudioManager.stopAllMushBgm(1);
    AudioManager.stopAllMushBgs(1);
    return Mush.alias.Game_Interpreter_Command354_002.call(this);
};


//==============================================================================================================
// * 5.01 : Scene Base
//==============================================================================================================

Mush.alias.Scene_Base_Update_002 = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    Mush.alias.Scene_Base_Update_002.call(this);
    AudioManager.update();
};


//==============================================================================================================
// * 5.02 : Scene Map
//==============================================================================================================

Mush.alias.Scene_Map_Start_002 = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    Mush.alias.Scene_Map_Start_002.call(this);
    this._spatialAudioDebug = false;
    this.continueVscChannels();
    this.continueBgmBgsChannels();
    if (SceneManager.isPreviousScene(Scene_Load)) {
    	this._spatialAudioDebug = true;
    	this._spatialAudioDebug_counter = 5;
    	$gamePlayer.requestSpatialAudioUpdate_full();
    }
};

Mush.alias.Scene_Map_OnTransfer_002 = Scene_Map.prototype.onTransfer;
Scene_Map.prototype.onTransfer = function() {
    Mush.alias.Scene_Map_OnTransfer_002.call(this);
    AudioManager.generalClearMushBgms();
    AudioManager.generalClearMushBgss();
};

Mush.alias.Scene_Map_CallMenu_002 = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
    Mush.alias.Scene_Map_CallMenu_002.call(this);
    this.closeVscChannels();
};

Mush.alias.Scene_Map_LaunchBattle_002 = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
    Mush.alias.Scene_Map_LaunchBattle_002.call(this);
    this.closeVscChannels();
    this.closeBgmBgsChannels();
};

Scene_Map.prototype.continueVscChannels = function() {
	AudioManager.cleanupVsc();
	for (var i = 0; i < AudioManager._vscBuffers.length; i++) {
		const buffer = AudioManager._vscBuffers[i];
		if (!buffer.isPlaying() && buffer.currentlyPaused) {
			buffer.play(false, buffer.currentPosition);
			buffer.currentPosition = null;
			buffer.currentlyPaused = false;
		}
	}
};

Scene_Map.prototype.continueBgmBgsChannels = function() {
	for (var i = 0; i < AudioManager._bgmBuffers.length; i++) {
		const buffer = AudioManager._bgmBuffers[i];
		if (!buffer.isPlaying() && buffer.currentlyPaused) {
			AudioManager.continueMushBgm(buffer.channel);
		}
	}
	for (var i = 0; i < AudioManager._bgsBuffers.length; i++) {
		const buffer = AudioManager._bgsBuffers[i];
		if (!buffer.isPlaying() && buffer.currentlyPaused) {
			AudioManager.continueMushBgs(buffer.channel);
		}
	}
};

Scene_Map.prototype.closeVscChannels = function() {
	AudioManager.cleanupVsc();
	for (var i = 0; i < AudioManager._vscBuffers.length; i++) {
		const buffer = AudioManager._vscBuffers[i];
		if (buffer.isPlaying() && buffer.pause == "Pause") {
			AudioManager.pauseVsc(buffer.channel);
		} else if (buffer.pause == "Ignore") {
			// Do nothing
		} else if (buffer.pause == "Stop") {
			AudioManager.stopVsc(buffer.channel);
		}
	}
};

Scene_Map.prototype.closeBgmBgsChannels = function() {
	AudioManager.closeFadingBgms();
	for (var i = 0; i < AudioManager._bgmBuffers.length; i++) {
		const buffer = AudioManager._bgmBuffers[i];
		if (buffer.isPlaying() && buffer.pause == "Pause") {
			AudioManager.pauseMushBgm(buffer.channel);
		} else if (buffer.pause == "Ignore") {
			// Do nothing
		} else if (buffer.pause == "Stop") {
			AudioManager.stopMushBgm(buffer.channel);
		}
	}
	AudioManager.closeFadingBgss();
	for (var i = 0; i < AudioManager._bgsBuffers.length; i++) {
		const buffer = AudioManager._bgsBuffers[i];
		if (buffer.isPlaying() && buffer.pause == "Pause") {
			AudioManager.pauseMushBgs(buffer.channel);
		} else if (buffer.pause == "Ignore") {
			// Do nothing
		} else if (buffer.pause == "Stop") {
			AudioManager.stopMushBgs(buffer.channel);
		}
	}
};

Mush.alias.Scene_Map_Update_002 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	Mush.alias.Scene_Map_Update_002.call(this);
	if (this._spatialAudioDebug) {
		if (this._spatialAudioDebug_counter <= 0) {
			this._spatialAudioDebug = false;
			$gamePlayer.requestSpatialAudioUpdate_full();
		} else {
			this._spatialAudioDebug_counter -= 1;
		}
	}
};


//==============================================================================================================
// * 5.03 : Scene Menu
//==============================================================================================================

Scene_Menu.prototype.popScene = function() {
	Scene_Base.prototype.popScene.call(this);
	AudioManager.cleanupVsc();
	for (var i = 0; i < AudioManager._vscBuffers.length; i++) {
		const buffer = AudioManager._vscBuffers[i];
		if (buffer.pause == "Stop") {
			AudioManager.stopVsc(buffer.channel);
		}
	}
};


//==============================================================================================================
// * 5.04 : Scene Gameover
//==============================================================================================================

Mush.alias.Scene_Gameover_Initialize_002 = Scene_Gameover.prototype.initialize;
Scene_Gameover.prototype.initialize = function() {
    Mush.alias.Scene_Gameover_Initialize_002.call(this);
    AudioManager.stopAllMushBgm(0);
    AudioManager.stopAllMushBgs(0);
};


//==============================================================================================================
// * 5.05 : Scene GameEnd
//==============================================================================================================

Mush.alias.Scene_GameEnd_CommandToTitle_002 = Scene_GameEnd.prototype.commandToTitle;
Scene_GameEnd.prototype.commandToTitle = function() {
    Mush.alias.Scene_GameEnd_CommandToTitle_002.call(this);
    AudioManager.stopAllMushBgm(1);
    AudioManager.stopAllMushBgs(1);
};


//==============================================================================================================
// * 6.01 : Window Options
//==============================================================================================================

Mush.alias.Window_Options_AddVolumeOptions_002 = Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions = function() {
	var par = Mush.parameters.mushAudioEngine;
	if (par.menuOptions.masterVolumeFeature) {
		this.addCommand(par.menuOptions.masterVolumeText, "masterVolume");
	}
    Mush.alias.Window_Options_AddVolumeOptions_002.call(this);
    if (par.menuOptions.uisVolumeFeature && par.genFeatures.uis) {
    	this.addCommand(par.menuOptions.uisVolumeText, "uisVolume");
    }
    if (par.menuOptions.vscVolumeFeature) {
    	this.addCommand(par.menuOptions.vscVolumeText, "vscVolume");
    }
};