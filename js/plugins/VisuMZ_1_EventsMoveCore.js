//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.35] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
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
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x2c0583=_0x41d3;function _0x41d3(_0x54a2a6,_0x3130b8){const _0x346735=_0x3467();return _0x41d3=function(_0x41d394,_0x2438a0){_0x41d394=_0x41d394-0x192;let _0x1158ee=_0x346735[_0x41d394];return _0x1158ee;},_0x41d3(_0x54a2a6,_0x3130b8);}(function(_0x141450,_0x134c50){const _0x3a30fc=_0x41d3,_0x4b257b=_0x141450();while(!![]){try{const _0xc78ce7=parseInt(_0x3a30fc(0x41e))/0x1+parseInt(_0x3a30fc(0x54b))/0x2+parseInt(_0x3a30fc(0x483))/0x3*(parseInt(_0x3a30fc(0x22f))/0x4)+-parseInt(_0x3a30fc(0x411))/0x5*(parseInt(_0x3a30fc(0x284))/0x6)+-parseInt(_0x3a30fc(0x39d))/0x7*(-parseInt(_0x3a30fc(0x301))/0x8)+-parseInt(_0x3a30fc(0x400))/0x9*(parseInt(_0x3a30fc(0x5ba))/0xa)+-parseInt(_0x3a30fc(0x53b))/0xb;if(_0xc78ce7===_0x134c50)break;else _0x4b257b['push'](_0x4b257b['shift']());}catch(_0x2f0d6f){_0x4b257b['push'](_0x4b257b['shift']());}}}(_0x3467,0xaa89f));var label=_0x2c0583(0x568),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2c0583(0x38d)](function(_0x46b0db){const _0x46d202=_0x2c0583;return _0x46b0db[_0x46d202(0x20e)]&&_0x46b0db[_0x46d202(0x213)][_0x46d202(0x454)]('['+label+']');})[0x0];VisuMZ[label][_0x2c0583(0x4d1)]=VisuMZ[label][_0x2c0583(0x4d1)]||{},VisuMZ[_0x2c0583(0x2f5)]=function(_0x4cbca8,_0x55eeae){const _0x2fecfe=_0x2c0583;for(const _0x3960f3 in _0x55eeae){if(_0x3960f3[_0x2fecfe(0x524)](/(.*):(.*)/i)){const _0x111e02=String(RegExp['$1']),_0x1c68de=String(RegExp['$2'])[_0x2fecfe(0x2db)]()[_0x2fecfe(0x634)]();let _0x502f5d,_0x548796,_0x22b525;switch(_0x1c68de){case'NUM':_0x502f5d=_0x55eeae[_0x3960f3]!==''?Number(_0x55eeae[_0x3960f3]):0x0;break;case'ARRAYNUM':_0x548796=_0x55eeae[_0x3960f3]!==''?JSON['parse'](_0x55eeae[_0x3960f3]):[],_0x502f5d=_0x548796['map'](_0x25f80d=>Number(_0x25f80d));break;case _0x2fecfe(0x3d9):_0x502f5d=_0x55eeae[_0x3960f3]!==''?eval(_0x55eeae[_0x3960f3]):null;break;case'ARRAYEVAL':_0x548796=_0x55eeae[_0x3960f3]!==''?JSON[_0x2fecfe(0x5ab)](_0x55eeae[_0x3960f3]):[],_0x502f5d=_0x548796[_0x2fecfe(0x66f)](_0x4eda94=>eval(_0x4eda94));break;case _0x2fecfe(0x4ea):_0x502f5d=_0x55eeae[_0x3960f3]!==''?JSON['parse'](_0x55eeae[_0x3960f3]):'';break;case'ARRAYJSON':_0x548796=_0x55eeae[_0x3960f3]!==''?JSON[_0x2fecfe(0x5ab)](_0x55eeae[_0x3960f3]):[],_0x502f5d=_0x548796[_0x2fecfe(0x66f)](_0x1ca46f=>JSON[_0x2fecfe(0x5ab)](_0x1ca46f));break;case'FUNC':_0x502f5d=_0x55eeae[_0x3960f3]!==''?new Function(JSON['parse'](_0x55eeae[_0x3960f3])):new Function(_0x2fecfe(0x4c0));break;case'ARRAYFUNC':_0x548796=_0x55eeae[_0x3960f3]!==''?JSON[_0x2fecfe(0x5ab)](_0x55eeae[_0x3960f3]):[],_0x502f5d=_0x548796['map'](_0x3291d9=>new Function(JSON[_0x2fecfe(0x5ab)](_0x3291d9)));break;case _0x2fecfe(0x1f6):_0x502f5d=_0x55eeae[_0x3960f3]!==''?String(_0x55eeae[_0x3960f3]):'';break;case _0x2fecfe(0x221):_0x548796=_0x55eeae[_0x3960f3]!==''?JSON[_0x2fecfe(0x5ab)](_0x55eeae[_0x3960f3]):[],_0x502f5d=_0x548796[_0x2fecfe(0x66f)](_0x23b432=>String(_0x23b432));break;case _0x2fecfe(0x2fb):_0x22b525=_0x55eeae[_0x3960f3]!==''?JSON[_0x2fecfe(0x5ab)](_0x55eeae[_0x3960f3]):{},_0x4cbca8[_0x111e02]={},VisuMZ[_0x2fecfe(0x2f5)](_0x4cbca8[_0x111e02],_0x22b525);continue;case _0x2fecfe(0x2fd):_0x548796=_0x55eeae[_0x3960f3]!==''?JSON[_0x2fecfe(0x5ab)](_0x55eeae[_0x3960f3]):[],_0x502f5d=_0x548796[_0x2fecfe(0x66f)](_0x5ec9a9=>VisuMZ[_0x2fecfe(0x2f5)]({},JSON[_0x2fecfe(0x5ab)](_0x5ec9a9)));break;default:continue;}_0x4cbca8[_0x111e02]=_0x502f5d;}}return _0x4cbca8;},(_0x4997e0=>{const _0x31392a=_0x2c0583,_0x31c1b9=_0x4997e0['name'];for(const _0xebfbf4 of dependencies){if(!Imported[_0xebfbf4]){alert(_0x31392a(0x5f3)[_0x31392a(0x2d3)](_0x31c1b9,_0xebfbf4)),SceneManager[_0x31392a(0x1db)]();break;}}const _0x1006d8=_0x4997e0['description'];if(_0x1006d8[_0x31392a(0x524)](/\[Version[ ](.*?)\]/i)){const _0x2feb4f=Number(RegExp['$1']);_0x2feb4f!==VisuMZ[label][_0x31392a(0x2a2)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x31c1b9,_0x2feb4f)),SceneManager[_0x31392a(0x1db)]());}if(_0x1006d8[_0x31392a(0x524)](/\[Tier[ ](\d+)\]/i)){const _0x43c943=Number(RegExp['$1']);_0x43c943<tier?_0x31392a(0x215)!==_0x31392a(0x215)?_0x45a557[_0x31392a(0x28d)](this[_0x31392a(0x1de)]):(alert(_0x31392a(0x2ab)[_0x31392a(0x2d3)](_0x31c1b9,_0x43c943,tier)),SceneManager[_0x31392a(0x1db)]()):tier=Math[_0x31392a(0x424)](_0x43c943,tier);}VisuMZ[_0x31392a(0x2f5)](VisuMZ[label]['Settings'],_0x4997e0[_0x31392a(0x39f)]);})(pluginData),VisuMZ[_0x2c0583(0x451)]=function(_0x509666,_0x961328,_0x513eee){switch(_0x513eee){case'=':return _0x961328;break;case'+':return _0x509666+_0x961328;break;case'-':return _0x509666-_0x961328;break;case'*':return _0x509666*_0x961328;break;case'/':return _0x509666/_0x961328;break;case'%':return _0x509666%_0x961328;break;}return _0x509666;},PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x247),_0x1eeed2=>{const _0x32556f=_0x2c0583;VisuMZ[_0x32556f(0x2f5)](_0x1eeed2,_0x1eeed2);switch(_0x1eeed2['Value']){case _0x32556f(0x449):$gameSystem[_0x32556f(0x1c3)](!![]);break;case _0x32556f(0x5ec):$gameSystem[_0x32556f(0x1c3)](![]);break;case _0x32556f(0x469):$gameSystem[_0x32556f(0x1c3)](!$gameSystem[_0x32556f(0x1da)]());break;}}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x309),_0x40c287=>{const _0x2fff99=_0x2c0583;VisuMZ[_0x2fff99(0x2f5)](_0x40c287,_0x40c287);const _0x165745=$gameTemp['getLastPluginCommandInterpreter'](),_0x440c35={'mapId':_0x40c287[_0x2fff99(0x603)],'eventId':_0x40c287[_0x2fff99(0x5b2)]||_0x165745['eventId'](),'pageId':_0x40c287[_0x2fff99(0x3a0)]};if(_0x440c35[_0x2fff99(0x42b)]<=0x0)_0x440c35[_0x2fff99(0x42b)]=$gameMap?$gameMap[_0x2fff99(0x42b)]():0x1;$gameTemp[_0x2fff99(0x4b6)]()['pluginCommandCallEvent'](_0x440c35);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'DashEnableToggle',_0x222a5c=>{const _0x46bd27=_0x2c0583;VisuMZ['ConvertParams'](_0x222a5c,_0x222a5c);switch(_0x222a5c[_0x46bd27(0x2b4)]){case _0x46bd27(0x60d):$gameSystem[_0x46bd27(0x503)](!![]);break;case _0x46bd27(0x1a4):$gameSystem['setDashingEnabled'](![]);break;case'Toggle':$gameSystem[_0x46bd27(0x503)](!$gameSystem[_0x46bd27(0x42c)]());break;}}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'EventIconChange',_0x4fe994=>{const _0x9572a4=_0x2c0583;VisuMZ[_0x9572a4(0x2f5)](_0x4fe994,_0x4fe994);const _0x1a802b=$gameTemp[_0x9572a4(0x4b6)]();_0x4fe994['MapId']=_0x4fe994[_0x9572a4(0x603)]||$gameMap[_0x9572a4(0x42b)](),$gameSystem[_0x9572a4(0x592)](_0x4fe994[_0x9572a4(0x603)],_0x4fe994[_0x9572a4(0x5b2)]||_0x1a802b[_0x9572a4(0x65a)](),_0x4fe994[_0x9572a4(0x374)],_0x4fe994[_0x9572a4(0x1aa)],_0x4fe994[_0x9572a4(0x4aa)],_0x4fe994[_0x9572a4(0x4ce)]);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x5af),_0x43b8e2=>{const _0xc68f00=_0x2c0583;VisuMZ['ConvertParams'](_0x43b8e2,_0x43b8e2);const _0x46ad65=$gameTemp['getLastPluginCommandInterpreter']();_0x43b8e2['MapId']=_0x43b8e2[_0xc68f00(0x603)]||$gameMap[_0xc68f00(0x42b)](),$gameSystem[_0xc68f00(0x364)](_0x43b8e2[_0xc68f00(0x603)],_0x43b8e2[_0xc68f00(0x5b2)]||_0x46ad65[_0xc68f00(0x65a)]());}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x1d6),_0x7f1458=>{const _0xa53463=_0x2c0583;if($gameMap)for(const _0x14f472 of $gameMap[_0xa53463(0x631)]()){if('MgGZK'===_0xa53463(0x37e))_0x14f472['refresh']();else{const _0x79cd03=[_0x15ad40,_0x7aa70a,'Self\x20Variable\x20%1'[_0xa53463(0x2d3)](_0x267fac)];return _0xe01727[_0xa53463(0x2f7)](_0x79cd03);}}}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],_0x2c0583(0x5a2),_0x5aa45e=>{const _0x4da0e2=_0x2c0583;VisuMZ[_0x4da0e2(0x2f5)](_0x5aa45e,_0x5aa45e);switch(_0x5aa45e[_0x4da0e2(0x432)]){case _0x4da0e2(0x193):$gameSystem[_0x4da0e2(0x3e3)](!![]);break;case _0x4da0e2(0x548):$gameSystem['setEventLabelsVisible'](![]);break;case _0x4da0e2(0x469):$gameSystem[_0x4da0e2(0x3e3)](!$gameSystem[_0x4da0e2(0x5fe)]());break;}}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],'EventLocationSave',_0x2b4741=>{const _0x11e9a1=_0x2c0583;VisuMZ['ConvertParams'](_0x2b4741,_0x2b4741);const _0x5a363d=$gameTemp[_0x11e9a1(0x4b6)]();if(!$gameMap)return;const _0x461a8b=$gameMap[_0x11e9a1(0x254)](_0x2b4741[_0x11e9a1(0x5b2)]||_0x5a363d[_0x11e9a1(0x65a)]());if(_0x461a8b)_0x461a8b[_0x11e9a1(0x54a)]();}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],_0x2c0583(0x5b6),_0x5933ea=>{const _0x2fd4c=_0x2c0583;VisuMZ['ConvertParams'](_0x5933ea,_0x5933ea);const _0x14bd61=$gameTemp[_0x2fd4c(0x4b6)](),_0x273050=_0x5933ea['MapId']||$gameMap[_0x2fd4c(0x42b)](),_0x49e1fb=_0x5933ea[_0x2fd4c(0x5b2)]||_0x14bd61[_0x2fd4c(0x65a)](),_0x11d117=_0x5933ea[_0x2fd4c(0x3df)]||0x0,_0x563997=_0x5933ea[_0x2fd4c(0x3bb)]||0x0,_0x2887a0=_0x5933ea[_0x2fd4c(0x57f)]||0x2,_0x1f7c6c=((_0x5933ea[_0x2fd4c(0x3a0)]||0x1)-0x1)[_0x2fd4c(0x344)](0x0,0x13),_0x23e187=_0x5933ea[_0x2fd4c(0x3c9)]||0x0;$gameSystem['createSaveEventLocationData'](_0x273050,_0x49e1fb,_0x11d117,_0x563997,_0x2887a0,_0x1f7c6c,_0x23e187);}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],_0x2c0583(0x2ea),_0x2967e1=>{const _0x95f72b=_0x2c0583;VisuMZ['ConvertParams'](_0x2967e1,_0x2967e1);const _0x11e104=$gameTemp[_0x95f72b(0x4b6)](),_0x1cf55e=_0x2967e1[_0x95f72b(0x603)]||$gameMap['mapId'](),_0x158c7a=_0x2967e1['EventId']||_0x11e104[_0x95f72b(0x65a)]();$gameSystem[_0x95f72b(0x4dc)](_0x1cf55e,_0x158c7a);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x65c),_0x311b3c=>{const _0x5465cc=_0x2c0583;VisuMZ['ConvertParams'](_0x311b3c,_0x311b3c);const _0x22748f=_0x311b3c[_0x5465cc(0x1b5)];$gameTimer[_0x5465cc(0x2b5)](_0x22748f);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x640),_0x286b6d=>{const _0x13f930=_0x2c0583;$gameTimer[_0x13f930(0x2b5)](0x0);}),PluginManager['registerCommand'](pluginData['name'],_0x2c0583(0x3cd),_0x7590c5=>{const _0x4d7379=_0x2c0583;if(!$gameTimer[_0x4d7379(0x660)]())return;VisuMZ[_0x4d7379(0x2f5)](_0x7590c5,_0x7590c5);let _0x5b3c8d=0x0;_0x5b3c8d+=_0x7590c5[_0x4d7379(0x56c)],_0x5b3c8d+=_0x7590c5[_0x4d7379(0x4cc)]*0x3c,_0x5b3c8d+=_0x7590c5[_0x4d7379(0x43a)]*0x3c*0x3c,_0x5b3c8d+=_0x7590c5[_0x4d7379(0x5e8)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x5b3c8d);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x5f8),_0x1b5ebd=>{const _0x39a0e0=_0x2c0583;if(!$gameTimer['isWorking']())return;VisuMZ[_0x39a0e0(0x2f5)](_0x1b5ebd,_0x1b5ebd);let _0x1b22e4=0x0;_0x1b22e4+=_0x1b5ebd['Frames'],_0x1b22e4+=_0x1b5ebd[_0x39a0e0(0x4cc)]*0x3c,_0x1b22e4+=_0x1b5ebd[_0x39a0e0(0x43a)]*0x3c*0x3c,_0x1b22e4+=_0x1b5ebd[_0x39a0e0(0x5e8)]*0x3c*0x3c*0x3c,$gameTimer[_0x39a0e0(0x2e3)](_0x1b22e4);}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x4c8),_0x34421b=>{const _0x405acd=_0x2c0583;if(!$gameTimer[_0x405acd(0x660)]())return;$gameTimer[_0x405acd(0x428)]();}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'EventTimerResume',_0x269126=>{const _0xac179b=_0x2c0583;if(!$gameTimer['isWorking']())return;$gameTimer[_0xac179b(0x60a)]();}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x312),_0x1c7308=>{const _0x479744=_0x2c0583;VisuMZ[_0x479744(0x2f5)](_0x1c7308,_0x1c7308);const _0x5b871b=_0x1c7308[_0x479744(0x319)]||0x0;$gameTimer['changeSpeed'](_0x5b871b);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'FollowerSetGlobalChase',_0x3fbc76=>{VisuMZ['ConvertParams'](_0x3fbc76,_0x3fbc76);const _0x29767c=!_0x3fbc76['Chase'];$gameSystem['setStopFollowerChasing'](_0x29767c);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x50f),_0x4d7f89=>{const _0x28d9e2=_0x2c0583;VisuMZ[_0x28d9e2(0x2f5)](_0x4d7f89,_0x4d7f89);const _0x641bcf=(_0x4d7f89[_0x28d9e2(0x335)]||0x0)-0x1,_0x39601b=!_0x4d7f89[_0x28d9e2(0x438)],_0x185f77=$gamePlayer[_0x28d9e2(0x1a5)]()[_0x28d9e2(0x26f)](_0x641bcf);if(_0x185f77)_0x185f77[_0x28d9e2(0x3f0)](_0x39601b);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x314),_0xcd28a2=>{const _0x18adf6=_0x2c0583;VisuMZ[_0x18adf6(0x2f5)](_0xcd28a2,_0xcd28a2);const _0x4c3911=_0xcd28a2[_0x18adf6(0x335)];$gameSystem[_0x18adf6(0x5de)](_0x4c3911);}),PluginManager['registerCommand'](pluginData['name'],_0x2c0583(0x588),_0x896c6b=>{const _0xa9407f=_0x2c0583;VisuMZ['ConvertParams'](_0x896c6b,_0x896c6b),$gameSystem[_0xa9407f(0x5de)](0x0),$gameSystem[_0xa9407f(0x261)](![]);for(const _0x57d757 of $gamePlayer[_0xa9407f(0x1a5)]()[_0xa9407f(0x305)]){if(_0xa9407f(0x1cd)!==_0xa9407f(0x1cd))this[_0xa9407f(0x4f7)]=![],this[_0xa9407f(0x3ff)](),this[_0xa9407f(0x417)](),this['clearSpriteOffsets'](),this['clearStepPattern']();else{if(_0x57d757)_0x57d757['setChaseOff'](![]);}}}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x300),_0x4f034b=>{const _0x41a043=_0x2c0583;VisuMZ[_0x41a043(0x2f5)](_0x4f034b,_0x4f034b);const _0x24fa9b=$gameTemp[_0x41a043(0x4b6)]();_0x4f034b[_0x41a043(0x603)]=_0x4f034b[_0x41a043(0x603)]||$gameMap['mapId']();const _0x5c1dd7=[_0x4f034b[_0x41a043(0x603)],_0x4f034b[_0x41a043(0x5b2)]||_0x24fa9b[_0x41a043(0x65a)](),_0x4f034b[_0x41a043(0x601)]],_0x3713d7=_0x4f034b['TargetSwitchId'],_0x51936c=$gameSelfSwitches[_0x41a043(0x2f7)](_0x5c1dd7)||![];$gameSwitches[_0x41a043(0x529)](_0x3713d7,_0x51936c);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'SwitchGetSelfSwitchID',_0x4e08d4=>{const _0x30c869=_0x2c0583;VisuMZ[_0x30c869(0x2f5)](_0x4e08d4,_0x4e08d4);const _0x3bbc4f=$gameTemp['getLastPluginCommandInterpreter']();_0x4e08d4[_0x30c869(0x603)]=_0x4e08d4['MapId']||$gameMap[_0x30c869(0x42b)]();const _0x4a57e0=[_0x4e08d4[_0x30c869(0x603)],_0x4e08d4[_0x30c869(0x5b2)]||_0x3bbc4f[_0x30c869(0x65a)](),'Self\x20Switch\x20%1'[_0x30c869(0x2d3)](_0x4e08d4[_0x30c869(0x48c)])],_0x507437=_0x4e08d4[_0x30c869(0x494)],_0x5e2d56=$gameSelfSwitches[_0x30c869(0x2f7)](_0x4a57e0)||![];$gameSwitches[_0x30c869(0x529)](_0x507437,_0x5e2d56);}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],_0x2c0583(0x1c6),_0x3e14ef=>{const _0x3b1eb4=_0x2c0583;VisuMZ['ConvertParams'](_0x3e14ef,_0x3e14ef);const _0x28ea7e=$gameTemp[_0x3b1eb4(0x4b6)]();_0x3e14ef['MapId']=_0x3e14ef[_0x3b1eb4(0x603)]||$gameMap['mapId']();const _0x526bbf=[_0x3e14ef[_0x3b1eb4(0x603)],_0x3e14ef['EventId']||_0x28ea7e['eventId'](),_0x3b1eb4(0x618)[_0x3b1eb4(0x2d3)](_0x3e14ef['VariableId'])],_0x5424ee=_0x3e14ef[_0x3b1eb4(0x5b5)],_0x190f77=$gameSelfSwitches[_0x3b1eb4(0x2f7)](_0x526bbf)||![];$gameVariables[_0x3b1eb4(0x529)](_0x5424ee,_0x190f77);}),PluginManager['registerCommand'](pluginData['name'],_0x2c0583(0x635),_0x2c93aa=>{const _0x58b831=_0x2c0583;VisuMZ['ConvertParams'](_0x2c93aa,_0x2c93aa);if(!$gameMap)return;const _0x4827a6=$gameTemp[_0x58b831(0x4b6)](),_0x52b28f=_0x2c93aa[_0x58b831(0x321)];_0x2c93aa[_0x58b831(0x5f2)]=_0x2c93aa[_0x58b831(0x5f2)]||$gameMap[_0x58b831(0x42b)](),_0x2c93aa[_0x58b831(0x649)]=_0x2c93aa[_0x58b831(0x649)]||$gameMap[_0x58b831(0x42b)](),_0x2c93aa[_0x58b831(0x34a)]=_0x2c93aa[_0x58b831(0x34a)]['toUpperCase']()[_0x58b831(0x634)]();if(!_0x52b28f&&_0x2c93aa[_0x58b831(0x5f2)]!==$gameMap[_0x58b831(0x42b)]())return;if($gameMap[_0x58b831(0x42b)]()===_0x2c93aa['Step1MapId']){const _0x4b38c6=$gameMap[_0x58b831(0x254)](_0x2c93aa[_0x58b831(0x641)]||_0x4827a6[_0x58b831(0x65a)]());if(!_0x4b38c6)return;if(_0x2c93aa[_0x58b831(0x34a)]!=='UNTITLED')_0x58b831(0x672)===_0x58b831(0x46c)?(_0x522aa8[_0x58b831(0x568)][_0x58b831(0x62e)][_0x58b831(0x30e)](this),this[_0x58b831(0x5b9)]()):_0x4b38c6[_0x58b831(0x5d6)](_0x2c93aa['TemplateName']);else{if(_0x58b831(0x280)!=='GURMs')_0x4b38c6[_0x58b831(0x4e0)](_0x2c93aa['Step2MapId'],_0x2c93aa['Step2EventId']||_0x4827a6['eventId']());else return this[_0x58b831(0x621)][_0x58b831(0x202)];}}_0x52b28f&&$gameSystem[_0x58b831(0x33a)](_0x2c93aa[_0x58b831(0x5f2)],_0x2c93aa[_0x58b831(0x641)],_0x2c93aa[_0x58b831(0x34a)],_0x2c93aa[_0x58b831(0x649)],_0x2c93aa[_0x58b831(0x508)]);}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x66b),_0x1d4115=>{const _0x76cb83=_0x2c0583;VisuMZ[_0x76cb83(0x2f5)](_0x1d4115,_0x1d4115);if(!$gameMap)return;const _0x2a6752=$gameTemp[_0x76cb83(0x4b6)]();_0x1d4115[_0x76cb83(0x603)]=_0x1d4115[_0x76cb83(0x603)]||$gameMap[_0x76cb83(0x42b)]();if($gameMap[_0x76cb83(0x42b)]()===_0x1d4115[_0x76cb83(0x603)]){const _0x48d99c=$gameMap[_0x76cb83(0x254)](_0x1d4115['EventId']||_0x2a6752[_0x76cb83(0x65a)]());_0x48d99c[_0x76cb83(0x2d7)]();}_0x1d4115[_0x76cb83(0x1ff)]&&$gameSystem['deletePreservedMorphEventDataKey'](_0x1d4115[_0x76cb83(0x603)],_0x1d4115[_0x76cb83(0x5b2)]||_0x2a6752['eventId']());}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x501),_0x8824df=>{const _0x14ccc0=_0x2c0583;VisuMZ[_0x14ccc0(0x2f5)](_0x8824df,_0x8824df),$gameSystem[_0x14ccc0(0x1a1)](!_0x8824df[_0x14ccc0(0x60d)]);}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],_0x2c0583(0x3d3),_0x3ca0f3=>{const _0x106596=_0x2c0583;VisuMZ['ConvertParams'](_0x3ca0f3,_0x3ca0f3),$gameSystem[_0x106596(0x630)](_0x3ca0f3[_0x106596(0x1af)]);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'PlayerIconChange',_0x5e5e14=>{const _0x7e082a=_0x2c0583;VisuMZ[_0x7e082a(0x2f5)](_0x5e5e14,_0x5e5e14),$gameSystem[_0x7e082a(0x30f)]($gamePlayer,_0x5e5e14['IconIndex'],_0x5e5e14[_0x7e082a(0x1aa)],_0x5e5e14[_0x7e082a(0x4aa)],_0x5e5e14[_0x7e082a(0x4ce)]);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x2c8),_0x382876=>{const _0x40a43f=_0x2c0583;VisuMZ[_0x40a43f(0x2f5)](_0x382876,_0x382876),$gameSystem[_0x40a43f(0x37c)]($gamePlayer);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x2d5),_0x2e3e2e=>{const _0x1a8933=_0x2c0583;VisuMZ[_0x1a8933(0x2f5)](_0x2e3e2e,_0x2e3e2e);const _0x5ce22c=$gameTemp['getLastPluginCommandInterpreter']();_0x2e3e2e[_0x1a8933(0x603)]=_0x2e3e2e[_0x1a8933(0x603)]||$gameMap[_0x1a8933(0x42b)]();const _0x41fb1e=[_0x2e3e2e[_0x1a8933(0x603)],_0x2e3e2e[_0x1a8933(0x5b2)]||_0x5ce22c[_0x1a8933(0x65a)](),_0x2e3e2e['Letter']];switch(_0x2e3e2e[_0x1a8933(0x2b4)]){case'ON':$gameSelfSwitches[_0x1a8933(0x529)](_0x41fb1e,!![]);break;case'OFF':$gameSelfSwitches[_0x1a8933(0x529)](_0x41fb1e,![]);break;case _0x1a8933(0x469):$gameSelfSwitches[_0x1a8933(0x529)](_0x41fb1e,!$gameSelfSwitches['value'](_0x41fb1e));break;}}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x655),_0x1ed740=>{const _0xf7b525=_0x2c0583;VisuMZ['ConvertParams'](_0x1ed740,_0x1ed740);const _0x4364b9=$gameTemp[_0xf7b525(0x4b6)]();_0x1ed740[_0xf7b525(0x603)]=_0x1ed740[_0xf7b525(0x603)]||$gameMap[_0xf7b525(0x42b)]();const _0xd81b46=[_0x1ed740[_0xf7b525(0x603)],_0x1ed740['EventId']||_0x4364b9[_0xf7b525(0x65a)](),'Self\x20Switch\x20%1'[_0xf7b525(0x2d3)](_0x1ed740['SwitchId'])];switch(_0x1ed740[_0xf7b525(0x2b4)]){case'ON':$gameSelfSwitches[_0xf7b525(0x529)](_0xd81b46,!![]);break;case _0xf7b525(0x52e):$gameSelfSwitches[_0xf7b525(0x529)](_0xd81b46,![]);break;case'Toggle':$gameSelfSwitches[_0xf7b525(0x529)](_0xd81b46,!$gameSelfSwitches['value'](_0xd81b46));break;}}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'SelfVariableID',_0x28dbc2=>{const _0xed6cef=_0x2c0583;VisuMZ[_0xed6cef(0x2f5)](_0x28dbc2,_0x28dbc2);const _0xe7db06=$gameTemp['getLastPluginCommandInterpreter']();_0x28dbc2['MapId']=_0x28dbc2[_0xed6cef(0x603)]||$gameMap['mapId']();const _0x5f0e7c=[_0x28dbc2[_0xed6cef(0x603)],_0x28dbc2[_0xed6cef(0x5b2)]||_0xe7db06[_0xed6cef(0x65a)](),_0xed6cef(0x618)[_0xed6cef(0x2d3)](_0x28dbc2[_0xed6cef(0x263)])],_0x2d63c9=VisuMZ[_0xed6cef(0x451)]($gameSelfSwitches[_0xed6cef(0x2f7)](_0x5f0e7c),_0x28dbc2[_0xed6cef(0x2b4)],_0x28dbc2[_0xed6cef(0x5a7)]);$gameSelfSwitches[_0xed6cef(0x529)](_0x5f0e7c,_0x2d63c9);}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x48f),_0x2b0bc3=>{const _0x38823d=_0x2c0583;VisuMZ[_0x38823d(0x2f5)](_0x2b0bc3,_0x2b0bc3);const _0xbb8e00=$gameTemp[_0x38823d(0x4b6)](),_0x1643b2={'template':_0x2b0bc3[_0x38823d(0x34a)],'mapId':_0x2b0bc3['MapId']||$gameMap[_0x38823d(0x42b)](),'eventId':_0x2b0bc3['EventId']||_0xbb8e00[_0x38823d(0x65a)](),'x':_0x2b0bc3['PosX'],'y':_0x2b0bc3[_0x38823d(0x3bb)],'spawnPreserved':_0x2b0bc3['Preserve'],'spawnEventId':$gameMap['_spawnedEvents']['length']+0x3e8},_0x850aa=_0x2b0bc3[_0x38823d(0x673)]||0x0;if(!VisuMZ[_0x38823d(0x464)][_0x1643b2[_0x38823d(0x42b)]]&&_0x1643b2[_0x38823d(0x42b)]!==$gameMap[_0x38823d(0x42b)]()){if('vbaCL'!==_0x38823d(0x32e)){let _0x20891f='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x38823d(0x2d3)](_0x1643b2[_0x38823d(0x42b)]);_0x20891f+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x20891f+=_0x38823d(0x28f),_0x20891f+=_0x38823d(0x3cf),_0x20891f+=_0x38823d(0x433)[_0x38823d(0x2d3)](_0x1643b2[_0x38823d(0x42b)]),alert(_0x20891f);return;}else return _0x329e36[_0x38823d(0x49c)]();}const _0x4c4eab=$gameMap[_0x38823d(0x44c)](_0x1643b2,_0x2b0bc3[_0x38823d(0x372)],_0x2b0bc3['Passability']);if(_0x850aa){if(_0x38823d(0x5dc)!==_0x38823d(0x62f))$gameSwitches[_0x38823d(0x529)](_0x850aa,!!_0x4c4eab);else{const _0xd848a9=_0x1eab4e[_0x38823d(0x447)](this[_0x38823d(0x3a4)]()),_0x135c0b=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0xd848a9[_0x38823d(0x394)]()];this[_0x38823d(0x606)](_0x135c0b);}}}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],'SpawnEventAtRegion',_0x38937c=>{const _0x4d21fc=_0x2c0583;VisuMZ[_0x4d21fc(0x2f5)](_0x38937c,_0x38937c);const _0x3fdab9=$gameTemp[_0x4d21fc(0x4b6)](),_0x16795f={'template':_0x38937c[_0x4d21fc(0x34a)],'mapId':_0x38937c[_0x4d21fc(0x603)]||$gameMap[_0x4d21fc(0x42b)](),'eventId':_0x38937c[_0x4d21fc(0x5b2)]||_0x3fdab9['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x38937c['Preserve'],'spawnEventId':$gameMap[_0x4d21fc(0x376)][_0x4d21fc(0x19e)]+0x3e8},_0x3506e3=_0x38937c[_0x4d21fc(0x673)]||0x0;if(!VisuMZ[_0x4d21fc(0x464)][_0x16795f[_0x4d21fc(0x42b)]]&&_0x16795f[_0x4d21fc(0x42b)]!==$gameMap[_0x4d21fc(0x42b)]()){if('zHHsi'!=='zHHsi')return this[_0x4d21fc(0x1e7)]=![],![];else{let _0x10ecf0=_0x4d21fc(0x554)['format'](_0x16795f[_0x4d21fc(0x42b)]);_0x10ecf0+=_0x4d21fc(0x5bf),_0x10ecf0+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x10ecf0+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x10ecf0+=_0x4d21fc(0x433)[_0x4d21fc(0x2d3)](_0x16795f[_0x4d21fc(0x42b)]),alert(_0x10ecf0);return;}}const _0x52f8ae=$gameMap['prepareSpawnedEventAtRegion'](_0x16795f,_0x38937c[_0x4d21fc(0x4f0)],_0x38937c[_0x4d21fc(0x372)],_0x38937c['Passability']);_0x3506e3&&$gameSwitches[_0x4d21fc(0x529)](_0x3506e3,!!_0x52f8ae);}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x2cd),_0x2557a5=>{const _0x3e77f6=_0x2c0583;VisuMZ[_0x3e77f6(0x2f5)](_0x2557a5,_0x2557a5);const _0x5d8b04=$gameTemp[_0x3e77f6(0x4b6)](),_0xf9c67b={'template':_0x2557a5[_0x3e77f6(0x34a)],'mapId':_0x2557a5[_0x3e77f6(0x603)]||$gameMap['mapId'](),'eventId':_0x2557a5[_0x3e77f6(0x5b2)]||_0x5d8b04[_0x3e77f6(0x65a)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x2557a5['Preserve'],'spawnEventId':$gameMap[_0x3e77f6(0x376)][_0x3e77f6(0x19e)]+0x3e8},_0x3f2954=_0x2557a5[_0x3e77f6(0x673)]||0x0;if(!VisuMZ[_0x3e77f6(0x464)][_0xf9c67b[_0x3e77f6(0x42b)]]&&_0xf9c67b[_0x3e77f6(0x42b)]!==$gameMap[_0x3e77f6(0x42b)]()){if('vEOao'===_0x3e77f6(0x29c))_0x574b4c(_0x3e77f6(0x2ab)[_0x3e77f6(0x2d3)](_0x4a7c17,_0x1696fa,_0x317338)),_0x22095f[_0x3e77f6(0x1db)]();else{let _0x22d84c=_0x3e77f6(0x554)[_0x3e77f6(0x2d3)](_0xf9c67b[_0x3e77f6(0x42b)]);_0x22d84c+=_0x3e77f6(0x5bf),_0x22d84c+=_0x3e77f6(0x28f),_0x22d84c+=_0x3e77f6(0x3cf),_0x22d84c+=_0x3e77f6(0x433)[_0x3e77f6(0x2d3)](_0xf9c67b['mapId']),alert(_0x22d84c);return;}}const _0x16f908=$gameMap['prepareSpawnedEventAtTerrainTag'](_0xf9c67b,_0x2557a5[_0x3e77f6(0x22e)],_0x2557a5[_0x3e77f6(0x372)],_0x2557a5[_0x3e77f6(0x1d9)]);if(_0x3f2954){if(_0x3e77f6(0x5fb)!=='FnKQW')return this['_moveSynch'][_0x3e77f6(0x230)];else $gameSwitches[_0x3e77f6(0x529)](_0x3f2954,!!_0x16f908);}}),PluginManager[_0x2c0583(0x255)](pluginData['name'],_0x2c0583(0x5ac),_0x2301c9=>{const _0x403891=_0x2c0583;VisuMZ[_0x403891(0x2f5)](_0x2301c9,_0x2301c9);const _0x11ae36=$gameTemp['getLastPluginCommandInterpreter']();$gameMap['despawnEventId'](_0x2301c9[_0x403891(0x2e0)]||_0x11ae36[_0x403891(0x65a)]());}),PluginManager[_0x2c0583(0x255)](pluginData[_0x2c0583(0x217)],_0x2c0583(0x5e4),_0x18ab5a=>{const _0xea2e26=_0x2c0583;VisuMZ[_0xea2e26(0x2f5)](_0x18ab5a,_0x18ab5a);const _0x2c3821=_0x18ab5a[_0xea2e26(0x3df)],_0x4ad8b6=_0x18ab5a['PosY'];$gameMap[_0xea2e26(0x50e)](_0x2c3821,_0x4ad8b6);}),PluginManager['registerCommand'](pluginData['name'],_0x2c0583(0x41d),_0x41b7f8=>{const _0x221006=_0x2c0583;VisuMZ['ConvertParams'](_0x41b7f8,_0x41b7f8),$gameMap['despawnRegions'](_0x41b7f8[_0x221006(0x4f0)]);}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],_0x2c0583(0x396),_0x514fa7=>{const _0x339218=_0x2c0583;VisuMZ[_0x339218(0x2f5)](_0x514fa7,_0x514fa7),$gameMap['despawnTerrainTags'](_0x514fa7['TerrainTags']);}),PluginManager['registerCommand'](pluginData[_0x2c0583(0x217)],'SpawnEventDespawnEverything',_0x383f22=>{const _0x5c287e=_0x2c0583;VisuMZ['ConvertParams'](_0x383f22,_0x383f22),$gameMap[_0x5c287e(0x50b)]();}),VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x550)]=Scene_Boot[_0x2c0583(0x4ff)][_0x2c0583(0x201)],Scene_Boot[_0x2c0583(0x4ff)][_0x2c0583(0x201)]=function(){const _0x164499=_0x2c0583;VisuMZ[_0x164499(0x568)][_0x164499(0x550)][_0x164499(0x30e)](this),this[_0x164499(0x59a)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ['EventsMoveCore'][_0x164499(0x1b2)])VisuMZ[_0x164499(0x568)]['CustomPageConditions'][_0x164499(0x542)]();},VisuMZ[_0x2c0583(0x464)]=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x2c0583(0x4ff)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x35c672=_0x2c0583;if(DataManager[_0x35c672(0x51d)]()||DataManager[_0x35c672(0x467)]())return;const _0x144184=VisuMZ['EventsMoveCore'][_0x35c672(0x4d1)][_0x35c672(0x4f5)],_0x21b07f=_0x144184['PreloadMaps'][_0x35c672(0x515)](0x0);for(const _0xb93a71 of _0x144184[_0x35c672(0x45f)]){_0xb93a71[_0x35c672(0x4de)]=_0xb93a71[_0x35c672(0x4de)][_0x35c672(0x2db)]()[_0x35c672(0x634)](),VisuMZ[_0x35c672(0x465)][_0xb93a71[_0x35c672(0x4de)]]=_0xb93a71;if(!_0x21b07f[_0x35c672(0x454)](_0xb93a71['MapID']))_0x21b07f[_0x35c672(0x2a8)](_0xb93a71[_0x35c672(0x425)]);}for(const _0xf9af8 of _0x21b07f){if(VisuMZ[_0x35c672(0x464)][_0xf9af8])continue;const _0x4fb75a=_0x35c672(0x3e1)[_0x35c672(0x2d3)](_0xf9af8[_0x35c672(0x2d1)](0x3)),_0x3f664a=_0x35c672(0x2f6)['format'](_0xf9af8);DataManager[_0x35c672(0x238)](_0x3f664a,_0x4fb75a),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x35c672(0x313)](this,_0xf9af8,_0x3f664a),0x64);}},Scene_Boot['prototype'][_0x2c0583(0x1eb)]=function(_0x301957,_0x150687){const _0x790b10=_0x2c0583;window[_0x150687]?_0x790b10(0x5b3)!==_0x790b10(0x5b3)?(_0x470a72[_0x790b10(0x568)][_0x790b10(0x3c3)][_0x790b10(0x30e)](this,_0x1705be),this[_0x790b10(0x196)]=![]):(VisuMZ[_0x790b10(0x464)][_0x301957]=window[_0x150687],window[_0x150687]=undefined):_0x790b10(0x61a)===_0x790b10(0x2ad)?this[_0x790b10(0x346)]=!![]:setTimeout(this[_0x790b10(0x1eb)]['bind'](this,_0x301957,_0x150687),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x2c0583(0x64d)]=[],VisuMZ[_0x2c0583(0x208)]=[],VisuMZ[_0x2c0583(0x53e)]=[],VisuMZ[_0x2c0583(0x4ee)]=[],VisuMZ[_0x2c0583(0x596)]=[],Scene_Boot['prototype'][_0x2c0583(0x31b)]=function(){const _0x2e1473=_0x2c0583;for(let _0xa31525=0x1;_0xa31525<$dataSystem[_0x2e1473(0x54f)][_0x2e1473(0x19e)];_0xa31525++){if($dataSystem[_0x2e1473(0x54f)][_0xa31525][_0x2e1473(0x524)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2e1473(0x5cd)][_0x2e1473(0x2a8)](_0xa31525);if($dataSystem[_0x2e1473(0x54f)][_0xa31525][_0x2e1473(0x524)](/<SELF>/i))VisuMZ[_0x2e1473(0x64d)][_0x2e1473(0x2a8)](_0xa31525);if($dataSystem[_0x2e1473(0x54f)][_0xa31525]['match'](/<MAP>/i))VisuMZ[_0x2e1473(0x208)][_0x2e1473(0x2a8)](_0xa31525);}for(let _0x2791e8=0x1;_0x2791e8<$dataSystem['variables']['length'];_0x2791e8++){if('LAsgL'!==_0x2e1473(0x5e7)){if($dataSystem[_0x2e1473(0x574)][_0x2791e8][_0x2e1473(0x524)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x2e1473(0x2a8)](_0x2791e8);if($dataSystem['variables'][_0x2791e8][_0x2e1473(0x524)](/<SELF>/i))VisuMZ['SelfVariables'][_0x2e1473(0x2a8)](_0x2791e8);if($dataSystem[_0x2e1473(0x574)][_0x2791e8][_0x2e1473(0x524)](/<MAP>/i))VisuMZ[_0x2e1473(0x596)][_0x2e1473(0x2a8)](_0x2791e8);}else{if(this[_0x2e1473(0x58c)])return![];return this[_0x2e1473(0x2e4)][_0x2e1473(0x49c)]()&&!this[_0x2e1473(0x2e4)][_0x2e1473(0x1b6)]()&&!this['_character'][_0x2e1473(0x584)]()&&this[_0x2e1473(0x544)]()===0x0;}}},VisuMZ[_0x2c0583(0x568)]['CustomPageConditions']={},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x1b2)][_0x2c0583(0x542)]=function(){const _0x1037d3=_0x2c0583;this[_0x1037d3(0x47f)]=new Game_CPCInterpreter(),this[_0x1037d3(0x395)]();},VisuMZ['EventsMoveCore'][_0x2c0583(0x1b2)][_0x2c0583(0x395)]=function(){const _0x1d9ca0=_0x2c0583;this['_commonEvents']=[];for(const _0x3816e1 of $dataCommonEvents){if(!_0x3816e1)continue;VisuMZ[_0x1d9ca0(0x568)]['CustomPageConditions']['loadCPC'](_0x3816e1);if(_0x3816e1['CPC']['length']>0x0)this[_0x1d9ca0(0x52f)][_0x1d9ca0(0x2a8)](_0x3816e1['id']);}},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x1b2)][_0x2c0583(0x19b)]=function(_0x1a2d5b,_0x40b57d){const _0x18385c=_0x2c0583;return this[_0x18385c(0x47f)]['setup'](_0x1a2d5b,_0x40b57d),this['_interpreter']['execute'](),this[_0x18385c(0x47f)][_0x18385c(0x579)];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x1b2)]['loadCPC']=function(_0x4c4c89){const _0x2aff78=_0x2c0583;let _0x492c7d=![];_0x4c4c89['CPC']=[];for(const _0x4c3ac7 of _0x4c4c89[_0x2aff78(0x4f2)]){if(_0x2aff78(0x3e5)!==_0x2aff78(0x3e5)){const _0x1e0773=_0x3cbdec[_0x2aff78(0x568)][_0x2aff78(0x252)][_0x2aff78(0x30e)](this,_0x402920);if(!_0x1e0773)return![];return this[_0x2aff78(0x44d)](_0x3d5932);}else{if([0x6c,0x198][_0x2aff78(0x454)](_0x4c3ac7[_0x2aff78(0x489)])){const _0x4683e2=_0x4c3ac7['parameters'][0x0];if(_0x4683e2[_0x2aff78(0x524)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x492c7d=!![];else _0x4683e2[_0x2aff78(0x524)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x492c7d=![]);}_0x492c7d&&_0x4c4c89[_0x2aff78(0x5c6)][_0x2aff78(0x2a8)](_0x4c3ac7);}}},getSelfSwitchValue=function(_0x15482c,_0x5f4073,_0x425457){const _0x54b0bc=_0x2c0583;let _0x5108e8=[_0x15482c,_0x5f4073,_0x54b0bc(0x64e)[_0x54b0bc(0x2d3)](_0x425457)];return typeof _0x425457==='string'&&(_0x5108e8=[_0x15482c,_0x5f4073,_0x425457['toUpperCase']()[_0x54b0bc(0x634)]()]),$gameSelfSwitches[_0x54b0bc(0x2f7)](_0x5108e8);},getMapSwitchValue=function(_0x400b81,_0x31ea1c){const _0x4c5a88=_0x2c0583;let _0x48ccde=[0x0,0x0,_0x4c5a88(0x328)[_0x4c5a88(0x2d3)](_0x400b81,_0x31ea1c)];return $gameSelfSwitches[_0x4c5a88(0x2f7)](_0x48ccde);},getMapVariableValue=function(_0xf41d06,_0x1dd830){const _0x1e3e08=_0x2c0583;let _0x317573=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x1e3e08(0x2d3)](_0xf41d06,_0x1dd830)];return $gameSelfSwitches[_0x1e3e08(0x2f7)](_0x317573);},getSelfVariableValue=function(_0x926a8e,_0x416f94,_0x551376){const _0xa10b64=_0x2c0583,_0x3e9263=[_0x926a8e,_0x416f94,_0xa10b64(0x618)[_0xa10b64(0x2d3)](_0x551376)];return $gameSelfSwitches[_0xa10b64(0x2f7)](_0x3e9263);},setSelfSwitchValue=function(_0x55009d,_0x5152a1,_0x388175,_0x5b48ab){const _0x4669a1=_0x2c0583;let _0x3cfcc2=[_0x55009d,_0x5152a1,_0x4669a1(0x64e)['format'](_0x388175)];if(typeof _0x388175===_0x4669a1(0x5da)){if(_0x4669a1(0x4d6)!==_0x4669a1(0x52b))_0x3cfcc2=[_0x55009d,_0x5152a1,_0x388175[_0x4669a1(0x2db)]()['trim']()];else{if(this[_0x4669a1(0x3ab)]===_0x5be721)this[_0x4669a1(0x5b9)]();if(!_0x5d8a65)return null;_0x25b122===_0x11e9f2?delete this[_0x4669a1(0x3ab)][_0x4669a1(0x222)]:this['deleteIconsOnEventsDataKey'](_0x3b2e9f[_0x4669a1(0x36e)],_0x4c1691[_0x4669a1(0x53a)]);}}$gameSelfSwitches[_0x4669a1(0x529)](_0x3cfcc2,_0x5b48ab);},setSelfVariableValue=function(_0x84f0b8,_0x40347d,_0x5206b0,_0x52f78c){const _0x183867=_0x2c0583,_0x1ddbbc=[_0x84f0b8,_0x40347d,_0x183867(0x618)['format'](_0x5206b0)];$gameSelfSwitches[_0x183867(0x529)](_0x1ddbbc,_0x52f78c);},setMapSwitchValue=function(_0x3ffbf6,_0x3e483b,_0x23bb80){const _0x45d15c=_0x2c0583;let _0x55e8f7=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x45d15c(0x2d3)](_0x3ffbf6,_0x3e483b)];$gameSelfSwitches[_0x45d15c(0x529)](_0x55e8f7,_0x23bb80);},setMapVariableValue=function(_0x2f7a65,_0x2ab182,_0x11c43c){const _0x29dbd9=_0x2c0583;let _0x1e81a5=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x29dbd9(0x2d3)](_0x2f7a65,_0x2ab182)];$gameSelfSwitches[_0x29dbd9(0x529)](_0x1e81a5,_0x11c43c);},DataManager[_0x2c0583(0x61d)]=function(_0x50ee17){const _0x5d4b64=_0x2c0583;if(SceneManager[_0x5d4b64(0x63a)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x5d4b64(0x5cd)]['includes'](_0x50ee17);},DataManager[_0x2c0583(0x4ca)]=function(_0x3d794b){const _0x3d9126=_0x2c0583;if(SceneManager[_0x3d9126(0x63a)][_0x3d9126(0x329)]===Scene_Debug)return![];return VisuMZ[_0x3d9126(0x53e)][_0x3d9126(0x454)](_0x3d794b);},DataManager[_0x2c0583(0x2f3)]=function(_0x3084b2){const _0x11fe73=_0x2c0583;if(SceneManager[_0x11fe73(0x63a)][_0x11fe73(0x329)]===Scene_Debug)return![];return VisuMZ[_0x11fe73(0x64d)][_0x11fe73(0x454)](_0x3084b2);},DataManager[_0x2c0583(0x623)]=function(_0x219671){const _0x4f6075=_0x2c0583;if(SceneManager[_0x4f6075(0x63a)][_0x4f6075(0x329)]===Scene_Debug)return![];return VisuMZ[_0x4f6075(0x4ee)][_0x4f6075(0x454)](_0x219671);},DataManager[_0x2c0583(0x26b)]=function(_0x5076f4){const _0x2f79fa=_0x2c0583;if(BattleManager[_0x2f79fa(0x51d)]())return![];return VisuMZ[_0x2f79fa(0x208)][_0x2f79fa(0x454)](_0x5076f4);},DataManager[_0x2c0583(0x5ae)]=function(_0x5405b4){const _0x299f5b=_0x2c0583;if(BattleManager[_0x299f5b(0x51d)]())return![];return VisuMZ[_0x299f5b(0x596)][_0x299f5b(0x454)](_0x5405b4);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x4bd)]=Game_Temp['prototype'][_0x2c0583(0x265)],Game_Temp[_0x2c0583(0x4ff)][_0x2c0583(0x265)]=function(_0x5eb750,_0x10ce18){const _0x192e49=_0x2c0583;if(this[_0x192e49(0x530)](_0x5eb750,_0x10ce18))return;VisuMZ[_0x192e49(0x568)][_0x192e49(0x4bd)][_0x192e49(0x30e)](this,_0x5eb750,_0x10ce18);},Game_Temp[_0x2c0583(0x4ff)]['isEventClickTriggered']=function(_0x1ac065,_0xa0c25c){const _0x56a5a3=_0x2c0583,_0x18eb30=$gameMap[_0x56a5a3(0x3ba)](_0x1ac065,_0xa0c25c);for(const _0x1fbc5e of _0x18eb30){if(_0x1fbc5e&&_0x1fbc5e[_0x56a5a3(0x676)]())return _0x1fbc5e[_0x56a5a3(0x1c4)](),!![];}return![];},Game_Temp['prototype'][_0x2c0583(0x602)]=function(_0x5ca27a){const _0x1e4b29=_0x2c0583;this[_0x1e4b29(0x678)]=_0x5ca27a;},Game_Temp[_0x2c0583(0x4ff)][_0x2c0583(0x4b6)]=function(){const _0x10837e=_0x2c0583;return this[_0x10837e(0x678)];},Game_Temp[_0x2c0583(0x4ff)]['registerSelfTarget']=function(_0x4a5083){const _0xcac12c=_0x2c0583;this[_0xcac12c(0x46e)]=_0x4a5083;},Game_Temp[_0x2c0583(0x4ff)][_0x2c0583(0x58d)]=function(){const _0x1fa2b4=_0x2c0583;this[_0x1fa2b4(0x46e)]=undefined;},Game_Temp[_0x2c0583(0x4ff)][_0x2c0583(0x355)]=function(){const _0x40694c=_0x2c0583;return this[_0x40694c(0x46e)];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x258)]=Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x542)],Game_System['prototype'][_0x2c0583(0x542)]=function(){const _0x4264b0=_0x2c0583;VisuMZ[_0x4264b0(0x568)][_0x4264b0(0x258)][_0x4264b0(0x30e)](this),this[_0x4264b0(0x5b9)](),this[_0x4264b0(0x1ec)]();},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x5b9)]=function(){const _0x45de71=_0x2c0583;this[_0x45de71(0x2fa)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x45de71(0x3ab)]={},this[_0x45de71(0x4b4)]=[],this[_0x45de71(0x283)]={},this[_0x45de71(0x59c)]={},this[_0x45de71(0x642)]=![],this['_PlayerDiagonalSetting']=_0x45de71(0x320);},Game_System['prototype'][_0x2c0583(0x42c)]=function(){const _0x803b44=_0x2c0583;if(this[_0x803b44(0x2fa)]===undefined)this[_0x803b44(0x5b9)]();if(this[_0x803b44(0x2fa)]['DashingEnable']===undefined)this[_0x803b44(0x5b9)]();return this[_0x803b44(0x2fa)][_0x803b44(0x52a)];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x503)]=function(_0x52d58f){const _0x3d9145=_0x2c0583;if(this[_0x3d9145(0x2fa)]===undefined)this[_0x3d9145(0x5b9)]();if(this[_0x3d9145(0x2fa)][_0x3d9145(0x52a)]===undefined)this['initEventsMoveCore']();this[_0x3d9145(0x2fa)]['DashingEnable']=_0x52d58f;},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x1da)]=function(){const _0x47e0e5=_0x2c0583;if(this[_0x47e0e5(0x2fa)]===undefined)this[_0x47e0e5(0x5b9)]();if(this[_0x47e0e5(0x2fa)][_0x47e0e5(0x399)]===undefined)this[_0x47e0e5(0x5b9)]();return this[_0x47e0e5(0x2fa)][_0x47e0e5(0x399)];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x1c3)]=function(_0x1f40ee){const _0x2d4b34=_0x2c0583;if(this[_0x2d4b34(0x2fa)]===undefined)this[_0x2d4b34(0x5b9)]();if(this['_EventsMoveCoreSettings'][_0x2d4b34(0x399)]===undefined)this[_0x2d4b34(0x5b9)]();this[_0x2d4b34(0x2fa)]['EventAutoMovement']=_0x1f40ee;},Game_System['prototype']['eventLabelsVisible']=function(){const _0x170cc1=_0x2c0583;if(this['_EventsMoveCoreSettings']===undefined)this[_0x170cc1(0x5b9)]();if(this['_EventsMoveCoreSettings'][_0x170cc1(0x2a0)]===undefined)this[_0x170cc1(0x5b9)]();return this[_0x170cc1(0x2fa)][_0x170cc1(0x2a0)];},Game_System[_0x2c0583(0x4ff)]['setEventLabelsVisible']=function(_0x1717a9){const _0x397928=_0x2c0583;if(this['_EventsMoveCoreSettings']===undefined)this[_0x397928(0x5b9)]();if(this[_0x397928(0x2fa)]['VisibleEventLabels']===undefined)this[_0x397928(0x5b9)]();this[_0x397928(0x2fa)][_0x397928(0x2a0)]=_0x1717a9;},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x39a)]=function(){const _0x2df4e1=_0x2c0583;if(this['_DisablePlayerControl']===undefined){if(_0x2df4e1(0x607)!==_0x2df4e1(0x4c4))this['_DisablePlayerControl']=![];else return this[_0x2df4e1(0x1e4)]?this[_0x2df4e1(0x1cf)](_0x458ac5,_0x3352c0):_0x2fb196['prototype'][_0x2df4e1(0x404)][_0x2df4e1(0x30e)](this,_0x131fcb,_0x10af90);}return this[_0x2df4e1(0x642)];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x1a1)]=function(_0x12d75a){const _0x3d3f54=_0x2c0583;this[_0x3d3f54(0x642)]=_0x12d75a;},Game_System['prototype'][_0x2c0583(0x214)]=function(){const _0x5a328d=_0x2c0583;return this[_0x5a328d(0x4e4)];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x630)]=function(_0x5ab7e7){const _0x19fadd=_0x2c0583;this[_0x19fadd(0x4e4)]=String(_0x5ab7e7)['toLowerCase']()['trim']();},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x51a)]=function(_0x27bbd0){const _0x53cbf2=_0x2c0583;if(this['_EventIcons']===undefined)this[_0x53cbf2(0x5b9)]();if(!_0x27bbd0)return null;if(_0x27bbd0===$gamePlayer){if(_0x53cbf2(0x65d)!==_0x53cbf2(0x205))return this[_0x53cbf2(0x3ab)]['Player'];else{if(!_0x2c05e2[_0x53cbf2(0x660)]())return;_0x9298f[_0x53cbf2(0x60a)]();}}else{const _0xa76474=VisuMZ[_0x53cbf2(0x568)]['Settings'],_0xdbfdac=_0x53cbf2(0x3c4)[_0x53cbf2(0x2d3)](_0x27bbd0[_0x53cbf2(0x36e)],_0x27bbd0[_0x53cbf2(0x53a)]);return this[_0x53cbf2(0x3ab)][_0xdbfdac]=this[_0x53cbf2(0x3ab)][_0xdbfdac]||{'iconIndex':0x0,'bufferX':_0xa76474['Icon'][_0x53cbf2(0x5eb)],'bufferY':_0xa76474['Icon']['BufferY'],'blendMode':_0xa76474['Icon']['BlendMode']},this[_0x53cbf2(0x3ab)][_0xdbfdac];}},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x30f)]=function(_0x4cd9cb,_0x5537ba,_0x2fda2b,_0xda98da,_0x2485f8){const _0x681cbc=_0x2c0583;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();const _0x3f8f87=_0x4cd9cb===$gamePlayer?_0x681cbc(0x222):'Map%1-Event%2'[_0x681cbc(0x2d3)](_0x4cd9cb[_0x681cbc(0x36e)],_0x4cd9cb[_0x681cbc(0x53a)]);this[_0x681cbc(0x3ab)][_0x3f8f87]={'iconIndex':_0x5537ba,'bufferX':_0x2fda2b,'bufferY':_0xda98da,'blendMode':_0x2485f8};},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x592)]=function(_0x302843,_0xf75161,_0x305f6a,_0x10f5eb,_0x48f470,_0x52c22f){const _0x5d2076=_0x2c0583;if(this['_EventIcons']===undefined)this[_0x5d2076(0x5b9)]();const _0x54d8bc=_0x5d2076(0x3c4)[_0x5d2076(0x2d3)](_0x302843,_0xf75161);this['_EventIcons'][_0x54d8bc]={'iconIndex':_0x305f6a,'bufferX':_0x10f5eb,'bufferY':_0x48f470,'blendMode':_0x52c22f};},Game_System['prototype']['deleteIconsOnEventsData']=function(_0x3220b2){const _0x59485c=_0x2c0583;if(this[_0x59485c(0x3ab)]===undefined)this[_0x59485c(0x5b9)]();if(!_0x3220b2)return null;_0x3220b2===$gamePlayer?'qaeQq'!==_0x59485c(0x4a7)?delete this[_0x59485c(0x3ab)][_0x59485c(0x222)]:this[_0x59485c(0x41c)]['z']=0x0:_0x59485c(0x545)==='kElDF'?this[_0x59485c(0x364)](_0x3220b2[_0x59485c(0x36e)],_0x3220b2[_0x59485c(0x53a)]):(_0x1cbef3['ConvertParams'](_0x3874ef,_0x3db772),_0x21b12c['deleteIconsOnEventsData'](_0x5d9b89));},Game_System[_0x2c0583(0x4ff)]['deleteIconsOnEventsDataKey']=function(_0x2947f2,_0x12a4b0){const _0x180d27=_0x2c0583;if(this[_0x180d27(0x3ab)]===undefined)this[_0x180d27(0x5b9)]();const _0x30dc8e=_0x180d27(0x3c4)[_0x180d27(0x2d3)](_0x2947f2,_0x12a4b0);delete this[_0x180d27(0x3ab)][_0x30dc8e];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x3e2)]=function(_0x14ec3c){const _0x12bf19=_0x2c0583;if(this[_0x12bf19(0x59c)]===undefined)this['initEventsMoveCore']();if(!_0x14ec3c)return null;const _0x52308f=_0x12bf19(0x3c4)[_0x12bf19(0x2d3)](_0x14ec3c[_0x12bf19(0x36e)],_0x14ec3c[_0x12bf19(0x53a)]);return this[_0x12bf19(0x59c)][_0x52308f];},Game_System['prototype']['saveEventLocation']=function(_0x3d72f4){const _0x434500=_0x2c0583;if(this[_0x434500(0x59c)]===undefined)this[_0x434500(0x5b9)]();if(!_0x3d72f4)return;const _0x43bce7='Map%1-Event%2'['format'](_0x3d72f4[_0x434500(0x36e)],_0x3d72f4[_0x434500(0x53a)]);this[_0x434500(0x59c)][_0x43bce7]={'direction':_0x3d72f4[_0x434500(0x385)](),'x':Math['round'](_0x3d72f4['x']),'y':Math[_0x434500(0x5ce)](_0x3d72f4['y']),'pageIndex':_0x3d72f4[_0x434500(0x4be)],'moveRouteIndex':_0x3d72f4['_moveRouteIndex']};},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x3b6)]=function(_0x37fdc9){const _0x307285=_0x2c0583;if(this[_0x307285(0x59c)]===undefined)this[_0x307285(0x5b9)]();if(!_0x37fdc9)return;this[_0x307285(0x4dc)](_0x37fdc9['_mapId'],_0x37fdc9[_0x307285(0x53a)]);},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x4dc)]=function(_0x24135a,_0x2f04e4){const _0x7f9607=_0x2c0583;if(this[_0x7f9607(0x59c)]===undefined)this[_0x7f9607(0x5b9)]();const _0x430d96=_0x7f9607(0x3c4)[_0x7f9607(0x2d3)](_0x24135a,_0x2f04e4);delete this[_0x7f9607(0x59c)][_0x430d96];},Game_System[_0x2c0583(0x4ff)]['createSaveEventLocationData']=function(_0x55797a,_0xfc0c56,_0x2dc725,_0x577e83,_0x3b0d57,_0x979d80,_0x40550b){const _0xf7d76d=_0x2c0583;if(this[_0xf7d76d(0x59c)]===undefined)this[_0xf7d76d(0x5b9)]();const _0x446985=_0xf7d76d(0x3c4)[_0xf7d76d(0x2d3)](_0x55797a,_0xfc0c56);this[_0xf7d76d(0x59c)][_0x446985]={'direction':_0x3b0d57,'x':Math[_0xf7d76d(0x5ce)](_0x2dc725),'y':Math[_0xf7d76d(0x5ce)](_0x577e83),'pageIndex':_0x979d80,'moveRouteIndex':_0x40550b};},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x3ce)]=function(_0x393850){const _0xef36f=_0x2c0583;if(this[_0xef36f(0x283)]===undefined)this[_0xef36f(0x5b9)]();if(!_0x393850)return;const _0x306168='Map%1-Event%2'[_0xef36f(0x2d3)](_0x393850[_0xef36f(0x36e)],_0x393850['_eventId']);return this[_0xef36f(0x283)][_0x306168];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x33a)]=function(_0x576837,_0x2016c2,_0x4f51aa,_0xec450f,_0x346bde){const _0x5b7284=_0x2c0583;if(this[_0x5b7284(0x283)]===undefined)this[_0x5b7284(0x5b9)]();const _0x591609=_0x5b7284(0x3c4)[_0x5b7284(0x2d3)](_0x576837,_0x2016c2);this[_0x5b7284(0x283)][_0x591609]={'template':_0x4f51aa,'mapId':_0xec450f,'eventId':_0x346bde};},Game_System['prototype']['deletePreservedMorphEventDataKey']=function(_0x5dee84,_0x5b32c0){const _0x189b3b=_0x2c0583;if(this[_0x189b3b(0x283)]===undefined)this[_0x189b3b(0x5b9)]();const _0x28fb9b=_0x189b3b(0x3c4)['format'](_0x5dee84,_0x5b32c0);delete this[_0x189b3b(0x283)][_0x28fb9b];},Game_System[_0x2c0583(0x4ff)]['getMapSpawnedEventData']=function(_0x325091){const _0x5af54c=_0x2c0583;if(this['_MapSpawnedEventData']===undefined)this[_0x5af54c(0x5b9)]();return this[_0x5af54c(0x4b4)][_0x325091]=this[_0x5af54c(0x4b4)][_0x325091]||[],this[_0x5af54c(0x4b4)][_0x325091];},Game_System['prototype'][_0x2c0583(0x298)]=function(_0x1b2cb3){const _0x42d457=_0x2c0583,_0x442759=this[_0x42d457(0x63d)](_0x1b2cb3);for(const _0x576657 of _0x442759){if(_0x42d457(0x4a5)==='gZnxF'){if(!_0x576657)continue;if(_0x576657['_spawnPreserved'])continue;const _0x499d89=_0x442759[_0x42d457(0x1ac)](_0x576657);_0x442759[_0x499d89]=null;}else{if([0x2,0x4,0x6,0x8][_0x42d457(0x454)](_0x1d5658))return 0x4;if([0x1,0x3,0x7,0x9][_0x42d457(0x454)](_0x46f266))return 0x5;}}},Game_System['prototype'][_0x2c0583(0x1ec)]=function(){const _0x1d9e23=_0x2c0583;this[_0x1d9e23(0x59b)]=0x0,this['_followerChaseOff']=![];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x224)]=function(){const _0x493f97=_0x2c0583;if(this[_0x493f97(0x59b)]===undefined)this[_0x493f97(0x1ec)]();return this[_0x493f97(0x59b)];},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x5de)]=function(_0x5401aa){const _0x2c5228=_0x2c0583;if(this[_0x2c5228(0x59b)]===undefined)this[_0x2c5228(0x1ec)]();this[_0x2c5228(0x59b)]=_0x5401aa;;},VisuMZ['EventsMoveCore'][_0x2c0583(0x47e)]=Game_Interpreter[_0x2c0583(0x4ff)]['character'],Game_Interpreter['prototype'][_0x2c0583(0x29a)]=function(_0x5b8ece){const _0x548a57=_0x2c0583;if(!$gameParty[_0x548a57(0x398)]()&&_0x5b8ece<0x0){if(_0x548a57(0x520)==='TTWDx'){let _0x573f17=$gameSystem[_0x548a57(0x224)]();if(_0x573f17>0x0){if('VJXmk'!==_0x548a57(0x1fe))return $gamePlayer[_0x548a57(0x1a5)]()['follower'](_0x573f17-0x1);else this['contentsOpacity']+=this[_0x548a57(0x303)]();}}else return!![];}return VisuMZ[_0x548a57(0x568)]['Game_Interpreter_character']['call'](this,_0x5b8ece);},Game_System[_0x2c0583(0x4ff)][_0x2c0583(0x388)]=function(){const _0x3f289f=_0x2c0583;if(this[_0x3f289f(0x4c7)]===undefined)this[_0x3f289f(0x1ec)]();return this[_0x3f289f(0x4c7)];},Game_System[_0x2c0583(0x4ff)]['setStopFollowerChasing']=function(_0x113f9f){const _0xb906fb=_0x2c0583;if(this[_0xb906fb(0x4c7)]===undefined)this['initFollowerController']();this['_followerChaseOff']=_0x113f9f;;},VisuMZ[_0x2c0583(0x568)]['Game_Timer_initialize']=Game_Timer['prototype']['initialize'],Game_Timer['prototype'][_0x2c0583(0x542)]=function(){const _0x295c83=_0x2c0583;VisuMZ[_0x295c83(0x568)]['Game_Timer_initialize'][_0x295c83(0x30e)](this),this[_0x295c83(0x5b9)]();},Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x5b9)]=function(){const _0x12e0b6=_0x2c0583;this['_paused']=![],this['_speed']=-0x1,this[_0x12e0b6(0x3c6)]=0x0;},Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x22b)]=function(_0x30c670){const _0x54e044=_0x2c0583;if(!_0x30c670)return;if(!this[_0x54e044(0x25f)])return;if(this[_0x54e044(0x5d9)])return;if(this[_0x54e044(0x315)]<=0x0)return;if(this[_0x54e044(0x457)]===undefined)this['initEventsMoveCore']();this[_0x54e044(0x315)]+=this[_0x54e044(0x457)],this['_frames']<=0x0&&this[_0x54e044(0x357)]();},VisuMZ['EventsMoveCore'][_0x2c0583(0x53d)]=Game_Timer[_0x2c0583(0x4ff)]['start'],Game_Timer[_0x2c0583(0x4ff)]['start']=function(_0x1d1071){const _0x3dc5c5=_0x2c0583;VisuMZ[_0x3dc5c5(0x568)]['Game_Timer_start'][_0x3dc5c5(0x30e)](this,_0x1d1071);if(this[_0x3dc5c5(0x5d9)]===undefined)this['initEventsMoveCore']();this[_0x3dc5c5(0x5d9)]=![];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x565)]=Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x406)],Game_Timer[_0x2c0583(0x4ff)]['stop']=function(){const _0xa96d2=_0x2c0583;VisuMZ[_0xa96d2(0x568)][_0xa96d2(0x565)]['call'](this);if(this[_0xa96d2(0x5d9)]===undefined)this[_0xa96d2(0x5b9)]();this[_0xa96d2(0x5d9)]=![];},Game_Timer[_0x2c0583(0x4ff)]['pause']=function(){const _0x25d2ec=_0x2c0583;if(this[_0x25d2ec(0x315)]<=0x0)return;this['_paused']=!![],this['_working']=!![];},Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x60a)]=function(){const _0x495ba5=_0x2c0583;if(this['_frames']<=0x0)return;this[_0x495ba5(0x5d9)]=![],this['_working']=!![];},Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x1ce)]=function(_0x5958e3){const _0x471d3d=_0x2c0583;this[_0x471d3d(0x315)]=this[_0x471d3d(0x315)]||0x0,this[_0x471d3d(0x315)]+=_0x5958e3,this[_0x471d3d(0x25f)]=!![],this['_frames']=Math[_0x471d3d(0x424)](0x1,this[_0x471d3d(0x315)]);},Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x2e3)]=function(_0x267ad4){const _0x4c4c6f=_0x2c0583;this['_frames']=this[_0x4c4c6f(0x315)]||0x0,this[_0x4c4c6f(0x315)]=_0x267ad4,this['_working']=!![],this['_frames']=Math[_0x4c4c6f(0x424)](0x1,this[_0x4c4c6f(0x315)]);},Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x2f9)]=function(_0x108527){const _0x1809f5=_0x2c0583;this['_speed']=_0x108527,this[_0x1809f5(0x25f)]=!![],_0x108527>0x0&&(this[_0x1809f5(0x315)]=Math[_0x1809f5(0x424)](this[_0x1809f5(0x315)],0x1));},Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x2b5)]=function(_0xa256d2){const _0x297d69=_0x2c0583;if(this[_0x297d69(0x3c6)]===undefined)this[_0x297d69(0x5b9)]();this[_0x297d69(0x3c6)]=_0xa256d2;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x50c)]=Game_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x357)],Game_Timer['prototype'][_0x2c0583(0x357)]=function(){const _0x3841e9=_0x2c0583;if(this[_0x3841e9(0x3c6)]===undefined)this[_0x3841e9(0x5b9)]();this['_expireCommonEvent']?$gameTemp[_0x3841e9(0x4e2)](this[_0x3841e9(0x3c6)]):VisuMZ[_0x3841e9(0x568)][_0x3841e9(0x50c)]['call'](this);},VisuMZ[_0x2c0583(0x568)]['Game_Message_add']=Game_Message[_0x2c0583(0x4ff)]['add'],Game_Message[_0x2c0583(0x4ff)][_0x2c0583(0x28b)]=function(_0x447aa8){const _0x5441f8=_0x2c0583;VisuMZ['EventsMoveCore'][_0x5441f8(0x1ad)]['call'](this,_0x447aa8),this[_0x5441f8(0x1de)]=$gameTemp[_0x5441f8(0x355)]();},Game_Message[_0x2c0583(0x4ff)][_0x2c0583(0x5ff)]=function(){const _0x364727=_0x2c0583;$gameTemp['registerSelfTarget'](this[_0x364727(0x1de)]);},VisuMZ['EventsMoveCore'][_0x2c0583(0x570)]=Game_Switches['prototype']['value'],Game_Switches[_0x2c0583(0x4ff)][_0x2c0583(0x2f7)]=function(_0x59fa28){const _0x4b1959=_0x2c0583;if(DataManager[_0x4b1959(0x61d)](_0x59fa28))return!!this[_0x4b1959(0x42e)](_0x59fa28);else{if(DataManager[_0x4b1959(0x2f3)](_0x59fa28))return!!this[_0x4b1959(0x19d)](_0x59fa28);else{if(DataManager[_0x4b1959(0x26b)](_0x59fa28)){if(_0x4b1959(0x5b1)!==_0x4b1959(0x5b1)){if(this[_0x4b1959(0x2fa)]===_0x582c23)this[_0x4b1959(0x5b9)]();if(this[_0x4b1959(0x2fa)][_0x4b1959(0x52a)]===_0x398a94)this[_0x4b1959(0x5b9)]();this[_0x4b1959(0x2fa)]['DashingEnable']=_0x541f37;}else return!!this['mapValue'](_0x59fa28);}else return VisuMZ[_0x4b1959(0x568)][_0x4b1959(0x570)][_0x4b1959(0x30e)](this,_0x59fa28);}}},Game_Switches[_0x2c0583(0x56a)]={},Game_Switches[_0x2c0583(0x4ff)][_0x2c0583(0x42e)]=function(_0x1eb65f){const _0x1d92fd=_0x2c0583;if(!Game_Switches[_0x1d92fd(0x56a)][_0x1eb65f]){if(_0x1d92fd(0x436)!==_0x1d92fd(0x436))this[_0x1d92fd(0x376)]=_0x5e1e27[_0x1d92fd(0x63d)](this['mapId']()),this['_needsRefresh']=!![];else{$dataSystem['switches'][_0x1eb65f][_0x1d92fd(0x524)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x43554d='return\x20%1'[_0x1d92fd(0x2d3)](String(RegExp['$1']));Game_Switches[_0x1d92fd(0x56a)][_0x1eb65f]=new Function(_0x1d92fd(0x2c1),_0x43554d);}}const _0x5cc434=$gameTemp[_0x1d92fd(0x355)]()||this;return Game_Switches[_0x1d92fd(0x56a)][_0x1eb65f][_0x1d92fd(0x30e)](_0x5cc434,_0x1eb65f);},Game_Switches[_0x2c0583(0x4ff)]['selfValue']=function(_0x1d39d6){const _0x481b36=_0x2c0583,_0x4cccb8=$gameTemp[_0x481b36(0x355)]()||this;if(_0x4cccb8['constructor']!==Game_Event)return VisuMZ[_0x481b36(0x568)][_0x481b36(0x570)][_0x481b36(0x30e)](this,_0x1d39d6);else{const _0x57f7b0=[_0x4cccb8[_0x481b36(0x36e)],_0x4cccb8['_eventId'],_0x481b36(0x64e)[_0x481b36(0x2d3)](_0x1d39d6)];return $gameSelfSwitches[_0x481b36(0x2f7)](_0x57f7b0);}},Game_Switches['prototype'][_0x2c0583(0x3b5)]=function(_0x394643){const _0x482bae=_0x2c0583,_0x52854a=$gameMap?$gameMap['mapId']():0x0,_0x43f172=[0x0,0x0,_0x482bae(0x328)[_0x482bae(0x2d3)](_0x52854a,_0x394643)];return $gameSelfSwitches[_0x482bae(0x2f7)](_0x43f172);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x27e)]=Game_Switches[_0x2c0583(0x4ff)][_0x2c0583(0x529)],Game_Switches[_0x2c0583(0x4ff)][_0x2c0583(0x529)]=function(_0x4b963e,_0x158284){const _0x41b677=_0x2c0583;if(DataManager[_0x41b677(0x2f3)](_0x4b963e))this[_0x41b677(0x333)](_0x4b963e,_0x158284);else DataManager[_0x41b677(0x26b)](_0x4b963e)?this[_0x41b677(0x29e)](_0x4b963e,_0x158284):VisuMZ[_0x41b677(0x568)][_0x41b677(0x27e)][_0x41b677(0x30e)](this,_0x4b963e,_0x158284);},Game_Switches[_0x2c0583(0x4ff)][_0x2c0583(0x333)]=function(_0x4a19c7,_0x27d325){const _0x15c38d=_0x2c0583,_0x43b985=$gameTemp[_0x15c38d(0x355)]()||this;if(_0x43b985[_0x15c38d(0x329)]!==Game_Event)VisuMZ[_0x15c38d(0x568)]['Game_Switches_setValue'][_0x15c38d(0x30e)](this,_0x4a19c7,_0x27d325);else{const _0x52bbf5=[_0x43b985[_0x15c38d(0x36e)],_0x43b985[_0x15c38d(0x53a)],_0x15c38d(0x64e)['format'](_0x4a19c7)];$gameSelfSwitches[_0x15c38d(0x529)](_0x52bbf5,_0x27d325);}},Game_Switches[_0x2c0583(0x4ff)][_0x2c0583(0x29e)]=function(_0xede550,_0x376af9){const _0x701a32=_0x2c0583,_0x99ba0e=$gameMap?$gameMap[_0x701a32(0x42b)]():0x0,_0x4a7785=[0x0,0x0,_0x701a32(0x328)[_0x701a32(0x2d3)](_0x99ba0e,_0xede550)];return $gameSelfSwitches[_0x701a32(0x529)](_0x4a7785,_0x376af9);},VisuMZ[_0x2c0583(0x568)]['Game_Variables_value']=Game_Variables[_0x2c0583(0x4ff)][_0x2c0583(0x2f7)],Game_Variables['prototype'][_0x2c0583(0x2f7)]=function(_0x584284){const _0xdf5c13=_0x2c0583;if(DataManager[_0xdf5c13(0x4ca)](_0x584284))return this['advancedValue'](_0x584284);else{if(DataManager[_0xdf5c13(0x623)](_0x584284))return this[_0xdf5c13(0x19d)](_0x584284);else return DataManager[_0xdf5c13(0x5ae)](_0x584284)?this['mapValue'](_0x584284):VisuMZ[_0xdf5c13(0x568)]['Game_Variables_value']['call'](this,_0x584284);}},Game_Variables[_0x2c0583(0x56a)]={},Game_Variables[_0x2c0583(0x4ff)][_0x2c0583(0x42e)]=function(_0xb5bac7){const _0x4111ca=_0x2c0583;if(!Game_Variables[_0x4111ca(0x56a)][_0xb5bac7]){$dataSystem['variables'][_0xb5bac7][_0x4111ca(0x524)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x207e7d=_0x4111ca(0x5c7)['format'](String(RegExp['$1']));Game_Variables[_0x4111ca(0x56a)][_0xb5bac7]=new Function(_0x4111ca(0x332),_0x207e7d);}const _0x1f054b=$gameTemp[_0x4111ca(0x355)]()||this;return Game_Variables[_0x4111ca(0x56a)][_0xb5bac7][_0x4111ca(0x30e)](_0x1f054b,_0xb5bac7);},Game_Variables[_0x2c0583(0x4ff)]['selfValue']=function(_0x34d403){const _0x429cbe=_0x2c0583,_0x13e910=$gameTemp['getSelfTarget']()||this;if(_0x13e910['constructor']!==Game_Event)return VisuMZ[_0x429cbe(0x568)][_0x429cbe(0x516)][_0x429cbe(0x30e)](this,_0x34d403);else{const _0x370e1f=[_0x13e910[_0x429cbe(0x36e)],_0x13e910[_0x429cbe(0x53a)],_0x429cbe(0x618)[_0x429cbe(0x2d3)](_0x34d403)];return $gameSelfSwitches[_0x429cbe(0x2f7)](_0x370e1f);}},Game_Variables[_0x2c0583(0x4ff)][_0x2c0583(0x3b5)]=function(_0x18e35b){const _0x39a54d=_0x2c0583,_0x49f2df=$gameMap?$gameMap[_0x39a54d(0x42b)]():0x0,_0x4bc047=[0x0,0x0,_0x39a54d(0x511)[_0x39a54d(0x2d3)](_0x49f2df,_0x18e35b)];return $gameSelfSwitches['value'](_0x4bc047)||0x0;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x2f1)]=Game_Variables[_0x2c0583(0x4ff)]['setValue'],Game_Variables[_0x2c0583(0x4ff)][_0x2c0583(0x529)]=function(_0x3f753b,_0x23bc44){const _0x230499=_0x2c0583;if(DataManager['isSelfVariable'](_0x3f753b)){if('GSsMh'===_0x230499(0x5d0)){_0x5acdac['prototype'][_0x230499(0x58f)]['call'](this);if(['none','region']['includes'](this['activationProximityType']()))return;_0x1b9f9f[_0x230499(0x473)]([0x2]);}else this[_0x230499(0x333)](_0x3f753b,_0x23bc44);}else DataManager[_0x230499(0x5ae)](_0x3f753b)?this['setMapValue'](_0x3f753b,_0x23bc44):VisuMZ[_0x230499(0x568)][_0x230499(0x2f1)][_0x230499(0x30e)](this,_0x3f753b,_0x23bc44);},Game_Variables[_0x2c0583(0x4ff)][_0x2c0583(0x333)]=function(_0x7a9a65,_0x5aec3){const _0x404b25=_0x2c0583,_0x23eec9=$gameTemp[_0x404b25(0x355)]()||this;if(_0x23eec9[_0x404b25(0x329)]!==Game_Event)VisuMZ[_0x404b25(0x568)][_0x404b25(0x2f1)]['call'](this,_0x7a9a65,_0x5aec3);else{const _0x20e0d8=[_0x23eec9[_0x404b25(0x36e)],_0x23eec9[_0x404b25(0x53a)],_0x404b25(0x618)['format'](_0x7a9a65)];$gameSelfSwitches['setValue'](_0x20e0d8,_0x5aec3);}},Game_Variables['prototype'][_0x2c0583(0x29e)]=function(_0x2565e7,_0x488006){const _0x3307da=_0x2c0583,_0x198e5f=$gameMap?$gameMap['mapId']():0x0,_0x49335a=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x3307da(0x2d3)](_0x198e5f,_0x2565e7)];$gameSelfSwitches[_0x3307da(0x529)](_0x49335a,_0x488006);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x58a)]=Game_SelfSwitches[_0x2c0583(0x4ff)][_0x2c0583(0x2f7)],Game_SelfSwitches['prototype'][_0x2c0583(0x2f7)]=function(_0x4bb3c6){const _0x229721=_0x2c0583;if(_0x4bb3c6[0x2][_0x229721(0x524)](/(?:SELF|MAP)/i))return this[_0x229721(0x19d)](_0x4bb3c6);else{return VisuMZ[_0x229721(0x568)][_0x229721(0x58a)][_0x229721(0x30e)](this,_0x4bb3c6);;}},Game_SelfSwitches[_0x2c0583(0x4ff)][_0x2c0583(0x19d)]=function(_0x468e9a){const _0x206a03=_0x2c0583;return _0x468e9a[0x2][_0x206a03(0x524)](/VAR/i)?this[_0x206a03(0x305)][_0x468e9a]||0x0:!!this[_0x206a03(0x305)][_0x468e9a];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x304)]=Game_SelfSwitches[_0x2c0583(0x4ff)][_0x2c0583(0x529)],Game_SelfSwitches['prototype']['setValue']=function(_0x5d58b3,_0x57d8da){const _0x426b48=_0x2c0583;_0x5d58b3[0x2][_0x426b48(0x524)](/(?:SELF|MAP)/i)?this[_0x426b48(0x333)](_0x5d58b3,_0x57d8da):VisuMZ[_0x426b48(0x568)]['Game_SelfSwitches_setValue'][_0x426b48(0x30e)](this,_0x5d58b3,_0x57d8da);},Game_SelfSwitches[_0x2c0583(0x4ff)][_0x2c0583(0x333)]=function(_0x2d31e4,_0x477ceb){this['_data'][_0x2d31e4]=_0x2d31e4[0x2]['match'](/VAR/i)?_0x477ceb:!!_0x477ceb,this['onChange']();},VisuMZ['EventsMoveCore'][_0x2c0583(0x4c5)]=Game_Enemy[_0x2c0583(0x4ff)][_0x2c0583(0x235)],Game_Enemy[_0x2c0583(0x4ff)][_0x2c0583(0x235)]=function(_0x2536cd){const _0x1dd350=_0x2c0583;$gameTemp['registerSelfTarget'](this);const _0x2d5532=VisuMZ[_0x1dd350(0x568)][_0x1dd350(0x4c5)][_0x1dd350(0x30e)](this,_0x2536cd);return $gameTemp[_0x1dd350(0x58d)](),_0x2d5532;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x26a)]=Game_Troop[_0x2c0583(0x4ff)]['meetsConditions'],Game_Troop[_0x2c0583(0x4ff)][_0x2c0583(0x5f6)]=function(_0xa76eec){const _0x2c5bed=_0x2c0583;$gameTemp[_0x2c5bed(0x28d)](this);const _0x1c7cce=VisuMZ[_0x2c5bed(0x568)][_0x2c5bed(0x26a)][_0x2c5bed(0x30e)](this,_0xa76eec);return $gameTemp[_0x2c5bed(0x58d)](),_0x1c7cce;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x2c7)]=Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x38a)],Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x38a)]=function(_0x419bed){const _0xfa2c2f=_0x2c0583;this[_0xfa2c2f(0x298)](_0x419bed),this[_0xfa2c2f(0x34b)](),VisuMZ[_0xfa2c2f(0x568)][_0xfa2c2f(0x2c7)][_0xfa2c2f(0x30e)](this,_0x419bed),this[_0xfa2c2f(0x34b)](),this['setupDiagonalSupport'](),this[_0xfa2c2f(0x3dc)](),this[_0xfa2c2f(0x616)](),this[_0xfa2c2f(0x5ca)](),this['setupPlayerVisibilityOverrides'](),this[_0xfa2c2f(0x1e3)](),this[_0xfa2c2f(0x34b)]();},VisuMZ['EventsMoveCore']['Game_Map_setupEvents']=Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x1c7)],Game_Map[_0x2c0583(0x4ff)]['setupEvents']=function(){const _0x163f36=_0x2c0583;VisuMZ['EventsMoveCore']['Game_Map_setupEvents']['call'](this),this[_0x163f36(0x4ec)]();},Game_Map[_0x2c0583(0x36b)]=0xc8,Game_Map['prototype'][_0x2c0583(0x66a)]=function(){const _0xc3e9d3=_0x2c0583,_0x14e6f6=Game_Map[_0xc3e9d3(0x36b)];this[_0xc3e9d3(0x5e0)]=this['events']()[_0xc3e9d3(0x19e)]>_0x14e6f6;if(this[_0xc3e9d3(0x5e0)]&&$gameTemp[_0xc3e9d3(0x35e)]()){}},Game_Map['prototype'][_0x2c0583(0x4b5)]=function(){return this['_eventOverload'];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x34b)]=function(){this['_eventCache']=undefined;},Game_Map[_0x2c0583(0x4ff)]['setupDiagonalSupport']=function(){const _0x4ac640=_0x2c0583;this[_0x4ac640(0x41a)]=VisuMZ['EventsMoveCore'][_0x4ac640(0x4d1)]['Movement'][_0x4ac640(0x65b)];const _0xa92ac=$dataMap[_0x4ac640(0x4bf)]||'';if(_0xa92ac[_0x4ac640(0x524)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x4ac640(0x41a)]=!![];else _0xa92ac[_0x4ac640(0x524)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x4ac640(0x41a)]=![]);},Game_Map['prototype'][_0x2c0583(0x459)]=function(){const _0x432de1=_0x2c0583,_0x5522cc=$gameSystem[_0x432de1(0x214)]();if(_0x5522cc==='enable')return!![];if(_0x5522cc===_0x432de1(0x253))return![];if(this[_0x432de1(0x41a)]===undefined)this['setupDiagonalSupport']();return this['_diagonalSupport'];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x232)]=function(_0x580625,_0x52d79f){const _0x16083a=_0x2c0583;if([0x1,0x4,0x7][_0x16083a(0x454)](_0x52d79f))_0x580625-=0x1;if([0x3,0x6,0x9][_0x16083a(0x454)](_0x52d79f))_0x580625+=0x1;return this[_0x16083a(0x353)](_0x580625);},Game_Map['prototype']['roundYWithDirection']=function(_0x51754a,_0x165394){const _0x193cef=_0x2c0583;if([0x1,0x2,0x3]['includes'](_0x165394))_0x51754a+=0x1;if([0x7,0x8,0x9][_0x193cef(0x454)](_0x165394))_0x51754a-=0x1;return this[_0x193cef(0x3b0)](_0x51754a);},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x4d3)]=function(_0xd67f9a,_0x4d97fd,_0x29d66d,_0x4cdb8b){const _0x1bbfc9=_0x2c0583;return Math[_0x1bbfc9(0x424)](Math['abs'](this[_0x1bbfc9(0x53f)](_0xd67f9a,_0x29d66d)),Math[_0x1bbfc9(0x562)](this[_0x1bbfc9(0x4cf)](_0x4d97fd,_0x4cdb8b)));},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x3dc)]=function(){const _0x1bdf2b=_0x2c0583,_0x4834f7=VisuMZ[_0x1bdf2b(0x568)]['Settings'][_0x1bdf2b(0x4f0)],_0x279b23={},_0x56d726=[_0x1bdf2b(0x449),_0x1bdf2b(0x3c5),_0x1bdf2b(0x371)],_0x44897e=[_0x1bdf2b(0x343),'Walk','Player',_0x1bdf2b(0x535),_0x1bdf2b(0x43e),_0x1bdf2b(0x3bd),'Ship','Airship'];for(const _0x49a95d of _0x56d726){for(const _0x466851 of _0x44897e){if(_0x1bdf2b(0x33e)!=='TVxbJ'){const _0x27beff=_0x1bdf2b(0x2b3)[_0x1bdf2b(0x2d3)](_0x466851,_0x49a95d);_0x4834f7[_0x27beff]&&(_0x1bdf2b(0x383)!==_0x1bdf2b(0x383)?_0x11a795=_0xd5d52f[_0x1bdf2b(0x463)]:_0x279b23[_0x27beff]=_0x4834f7[_0x27beff][_0x1bdf2b(0x515)](0x0));}else this[_0x1bdf2b(0x542)][_0x1bdf2b(0x3f9)](this,arguments);}}const _0x1d79dd=$dataMap[_0x1bdf2b(0x4bf)]||'',_0x176200=_0x1d79dd[_0x1bdf2b(0x524)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x176200)for(const _0x29315d of _0x176200){if(_0x1bdf2b(0x1d5)!==_0x1bdf2b(0x330)){_0x29315d['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x21b727=String(RegExp['$1'])[_0x1bdf2b(0x299)]()['trim'](),_0x15a38a=String(RegExp['$2'])[_0x1bdf2b(0x299)]()[_0x1bdf2b(0x634)]();const _0xc693d5=JSON[_0x1bdf2b(0x5ab)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x21b727=_0x21b727[_0x1bdf2b(0x26d)](0x0)[_0x1bdf2b(0x2db)]()+_0x21b727[_0x1bdf2b(0x515)](0x1),_0x15a38a=_0x15a38a['charAt'](0x0)[_0x1bdf2b(0x2db)]()+_0x15a38a[_0x1bdf2b(0x515)](0x1);const _0x2c89c0=_0x1bdf2b(0x2b3)[_0x1bdf2b(0x2d3)](_0x21b727,_0x15a38a);if(_0x279b23[_0x2c89c0])_0x279b23[_0x2c89c0]=_0x279b23[_0x2c89c0][_0x1bdf2b(0x532)](_0xc693d5);}else this[_0x1bdf2b(0x661)]=!![];}this[_0x1bdf2b(0x617)]=_0x279b23;},Game_Map[_0x2c0583(0x4ff)]['isRegionAllowPass']=function(_0x5c5e2d,_0x5f2c78,_0x2a9016,_0x3deea2){const _0x2ce379=_0x2c0583,_0x1d0399=this[_0x2ce379(0x232)](_0x5c5e2d,_0x2a9016),_0x60fe5e=this[_0x2ce379(0x408)](_0x5f2c78,_0x2a9016),_0x37eb82=this[_0x2ce379(0x2ce)](_0x1d0399,_0x60fe5e),_0x1dc400=this[_0x2ce379(0x617)];if(_0x1dc400['AllAllow'][_0x2ce379(0x454)](_0x37eb82))return!![];else{if(_0x3deea2===_0x2ce379(0x397)){if(_0x2ce379(0x663)!==_0x2ce379(0x663)){let _0x37f8ec='';for(const _0x1494e2 of _0x277b8e['list']){[0x6c,0x198][_0x2ce379(0x454)](_0x1494e2['code'])&&(_0x37f8ec+=_0x1494e2['parameters'][0x0]);}if(_0x37f8ec['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x37f8ec[_0x2ce379(0x524)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}else return _0x1dc400['PlayerAllow']['includes'](_0x37eb82)||_0x1dc400[_0x2ce379(0x4c3)][_0x2ce379(0x454)](_0x37eb82);}else{if(_0x3deea2==='event')return _0x1dc400['EventAllow'][_0x2ce379(0x454)](_0x37eb82)||_0x1dc400[_0x2ce379(0x4c3)]['includes'](_0x37eb82);else{if(_0x1dc400[_0x2ce379(0x595)][_0x2ce379(0x454)](_0x37eb82)){if(_0x2ce379(0x3fc)===_0x2ce379(0x3fc))return!![];else _0x17bde0[_0x2ce379(0x568)][_0x2ce379(0x27e)][_0x2ce379(0x30e)](this,_0x525ac4,_0x3d3be0);}else{const _0x31a101=_0x2ce379(0x268)[_0x2ce379(0x2d3)](_0x3deea2[_0x2ce379(0x26d)](0x0)[_0x2ce379(0x2db)]()+_0x3deea2[_0x2ce379(0x515)](0x1));if(_0x1dc400[_0x31a101])return _0x1dc400[_0x31a101][_0x2ce379(0x454)](_0x37eb82);}}}}return![];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x257)]=function(_0x1597bd,_0x30b0fa,_0x482ba2,_0x40e4e1){const _0xe8273b=_0x2c0583,_0x587726=this[_0xe8273b(0x232)](_0x1597bd,_0x482ba2),_0x4e32c1=this[_0xe8273b(0x408)](_0x30b0fa,_0x482ba2),_0x11d824=this['regionId'](_0x587726,_0x4e32c1),_0x181e9a=this['_regionRules'];if(_0x181e9a[_0xe8273b(0x3d0)][_0xe8273b(0x454)](_0x11d824))return!![];else{if(_0x40e4e1===_0xe8273b(0x397)){if('jsRvQ'!==_0xe8273b(0x54c))return _0x181e9a[_0xe8273b(0x5f4)]['includes'](_0x11d824)||_0x181e9a[_0xe8273b(0x37a)][_0xe8273b(0x454)](_0x11d824);else{if(_0x29e7e2[_0xe8273b(0x1b7)])this[_0xe8273b(0x4cb)](_0x5b0cec['ShipSpeed']);}}else{if(_0x40e4e1===_0xe8273b(0x254))return _0x181e9a['EventForbid'][_0xe8273b(0x454)](_0x11d824)||_0x181e9a[_0xe8273b(0x37a)][_0xe8273b(0x454)](_0x11d824);else{if(_0x181e9a[_0xe8273b(0x5c1)][_0xe8273b(0x454)](_0x11d824)){if(_0xe8273b(0x216)===_0xe8273b(0x216))return!![];else this[_0xe8273b(0x4fd)]['x']=0.5,this[_0xe8273b(0x4fd)]['y']=0x1;}else{const _0x56dc64=_0xe8273b(0x192)[_0xe8273b(0x2d3)](_0x40e4e1[_0xe8273b(0x26d)](0x0)[_0xe8273b(0x2db)]()+_0x40e4e1['slice'](0x1));if(_0x181e9a[_0x56dc64])return _0x181e9a[_0x56dc64]['includes'](_0x11d824);}}}}return![];},Game_Map[_0x2c0583(0x4ff)]['isRegionDockable']=function(_0x2bf437,_0x27f3a1,_0x493726,_0x343b31){const _0x1cd0ad=_0x2c0583;_0x493726=_0x343b31===_0x1cd0ad(0x585)?0x5:_0x493726;const _0x3382b1=this[_0x1cd0ad(0x232)](_0x2bf437,_0x493726),_0x556e68=this[_0x1cd0ad(0x408)](_0x27f3a1,_0x493726),_0x2e476c=this[_0x1cd0ad(0x2ce)](_0x3382b1,_0x556e68),_0x5e38fe=this[_0x1cd0ad(0x617)];if(_0x5e38fe[_0x1cd0ad(0x61f)]['includes'](_0x2e476c)){if(_0x1cd0ad(0x1d0)==='mKQCc'){const _0x3fb3c9=_0x812aca[_0x1cd0ad(0x254)](_0xbb5255(_0x29f634['$1']));return this[_0x1cd0ad(0x514)](_0x3fb3c9);}else return!![];}else{const _0x3a4893=_0x1cd0ad(0x203)['format'](_0x343b31[_0x1cd0ad(0x26d)](0x0)[_0x1cd0ad(0x2db)]()+_0x343b31['slice'](0x1));if(_0x5e38fe[_0x3a4893])return _0x5e38fe[_0x3a4893][_0x1cd0ad(0x454)](_0x2e476c);}return![];},VisuMZ['EventsMoveCore'][_0x2c0583(0x4d7)]=Game_Map[_0x2c0583(0x4ff)]['refresh'],Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x551)]=function(){const _0x12cc5b=_0x2c0583;VisuMZ[_0x12cc5b(0x568)][_0x12cc5b(0x4d7)][_0x12cc5b(0x30e)](this),this[_0x12cc5b(0x654)]();},Game_Map[_0x2c0583(0x4ff)]['checkNeedForPeriodicRefresh']=function(){const _0x3203ef=_0x2c0583;this[_0x3203ef(0x57d)]=![];if(this[_0x3203ef(0x631)]()['some'](_0x5d685b=>_0x5d685b[_0x3203ef(0x32a)]())){if(_0x3203ef(0x504)!=='vSYqs')_0x4851dc=_0xbfedcb;else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x3203ef(0x631)]()[_0x3203ef(0x484)](_0x172f23=>_0x172f23[_0x3203ef(0x423)]())){this[_0x3203ef(0x57d)]=!![];return;}if(this[_0x3203ef(0x52f)]['some'](_0x329245=>_0x329245[_0x3203ef(0x32a)]())){if('pNCki'!==_0x3203ef(0x290)){const _0x3e3ad8=this[_0x3203ef(0x2ba)]+_0x100be6(_0x6b7f5a['$1']);return this['setOpacity'](_0x3e3ad8[_0x3203ef(0x344)](0x0,0xff));}else{this[_0x3203ef(0x57d)]=!![];return;}}if(this['_commonEvents'][_0x3203ef(0x484)](_0x5acc45=>_0x5acc45[_0x3203ef(0x423)]())){if(_0x3203ef(0x5f1)===_0x3203ef(0x1ee))_0x409bc2['registerSelfTarget'](_0x1e701d[_0x3203ef(0x211)]),_0x323ff5[_0x3203ef(0x568)][_0x3203ef(0x316)]['call'](this),_0x156345['clearSelfTarget'](),_0x4cb93e[_0x3203ef(0x211)]=_0xa38114;else{this[_0x3203ef(0x57d)]=!![];return;}}},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x2eb)]=Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x22b)],Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x22b)]=function(_0x34a20f){const _0x35b8c5=_0x2c0583;this[_0x35b8c5(0x5a6)](),VisuMZ['EventsMoveCore']['Game_Map_update'][_0x35b8c5(0x30e)](this,_0x34a20f);},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x5a6)]=function(){const _0x4c35c2=_0x2c0583;if(!this[_0x4c35c2(0x57d)])return;this[_0x4c35c2(0x3f4)]=this[_0x4c35c2(0x3f4)]||0x3c,this[_0x4c35c2(0x3f4)]--,this[_0x4c35c2(0x3f4)]<=0x0&&(this['requestRefresh'](),this['_periodicRefreshTimer']=0x3c);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x369)]=Game_Map['prototype'][_0x2c0583(0x5f9)],Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x5f9)]=function(){const _0x3189e2=_0x2c0583;if(!$gameSystem[_0x3189e2(0x42c)]())return!![];return VisuMZ[_0x3189e2(0x568)][_0x3189e2(0x369)][_0x3189e2(0x30e)](this);},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x616)]=function(){const _0x341a8b=_0x2c0583;this[_0x341a8b(0x293)]=![];const _0x4cb1c3=$dataMap[_0x341a8b(0x4bf)]||'';if(_0x4cb1c3[_0x341a8b(0x524)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if('cBYgj'!=='cBYgj'){if(!_0xf39f52['prototype'][_0x341a8b(0x3af)][_0x341a8b(0x30e)](this,_0x2da4b5+_0x307024,_0x8a0af2+_0x519276,_0x345676))return![];}else this['_saveEventLocations']=!![];}},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x471)]=function(){const _0x117dd4=_0x2c0583;if(this[_0x117dd4(0x293)]===undefined)this[_0x117dd4(0x616)]();return this[_0x117dd4(0x293)];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x298)]=function(_0x43db52){const _0x4cc733=_0x2c0583;if(_0x43db52!==this[_0x4cc733(0x42b)]()&&$gamePlayer){if(_0x4cc733(0x40d)===_0x4cc733(0x24e)){_0x18044=_0x17aca6[_0x4cc733(0x2db)]()['trim']();const _0x4bb8d8=_0x1e3a9c[_0x4cc733(0x465)][_0x405ef1];if(!_0x4bb8d8)return;const _0x2c7d03=_0x4bb8d8[_0x4cc733(0x425)],_0x5bd7ce=_0x4bb8d8[_0x4cc733(0x2e0)];if(!this['checkValidEventerMap'](_0x2c7d03,_0x5bd7ce))return;if(!_0x4e7128)_0x4bb8d8['PreMorphJS'][_0x4cc733(0x30e)](this,_0x2c7d03,_0x5bd7ce,this);this['morphInto'](_0x2c7d03,_0x5bd7ce,_0x2f3117);if(!_0x5b2e41)_0x4bb8d8[_0x4cc733(0x349)][_0x4cc733(0x30e)](this,_0x2c7d03,_0x5bd7ce,this);if(_0x357691)_0x20ca45[_0x4cc733(0x34b)]();}else $gameSystem[_0x4cc733(0x298)](this[_0x4cc733(0x42b)]());}},Game_Map[_0x2c0583(0x4ff)]['setupSpawnedEvents']=function(){const _0x2bc924=_0x2c0583;this[_0x2bc924(0x376)]=$gameSystem['getMapSpawnedEventData'](this[_0x2bc924(0x42b)]()),this[_0x2bc924(0x24d)]=!![];},VisuMZ['EventsMoveCore']['Game_Map_events']=Game_Map[_0x2c0583(0x4ff)]['events'],Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x631)]=function(){const _0x4e149b=_0x2c0583;if(this[_0x4e149b(0x1dd)])return this['_eventCache'];const _0x48fe81=VisuMZ[_0x4e149b(0x568)][_0x4e149b(0x21f)]['call'](this),_0x469cbf=_0x48fe81['concat'](this[_0x4e149b(0x376)]||[]);return this[_0x4e149b(0x1dd)]=_0x469cbf['filter'](_0x4931c3=>!!_0x4931c3),this[_0x4e149b(0x1dd)];},VisuMZ['EventsMoveCore'][_0x2c0583(0x613)]=Game_Map['prototype']['event'],Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x254)]=function(_0x1cafe2){const _0x33732a=_0x2c0583;if(_0x1cafe2>=0x3e8){if(_0x33732a(0x35f)!==_0x33732a(0x35f))_0x580b24[_0x33732a(0x5d6)](_0xaf3a12[_0x33732a(0x34a)]);else return _0x1cafe2-=0x3e8,this[_0x33732a(0x376)][_0x1cafe2];}else{if(_0x33732a(0x612)===_0x33732a(0x612))return VisuMZ[_0x33732a(0x568)][_0x33732a(0x613)][_0x33732a(0x30e)](this,_0x1cafe2);else{const _0x572653=this['textSizeEx'](_0x3d1ee2),_0x73392c=_0x3c042d[_0x33732a(0x48d)]((this[_0x33732a(0x21b)]-_0x572653[_0x33732a(0x331)])/0x2);this['drawTextEx'](_0x4f6cf5,_0x73392c,_0x3861fb),_0x2e27c4+=_0x572653[_0x33732a(0x3d6)];}}},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x632)]=function(_0x3ea051){const _0x2b3c42=_0x2c0583,_0x4d0144=this[_0x2b3c42(0x254)](_0x3ea051);if(_0x4d0144)_0x4d0144[_0x2b3c42(0x49b)]();},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x1c1)]=function(){const _0x29150b=_0x2c0583,_0x277928={'template':_0x29150b(0x42a),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x29150b(0x376)][_0x29150b(0x19e)]+0x3e8};this[_0x29150b(0x567)](_0x277928);},Game_Map['prototype'][_0x2c0583(0x239)]=function(_0x31382b,_0x102deb){const _0x21c2c3=_0x2c0583;if(this[_0x21c2c3(0x3ba)](_0x31382b,_0x102deb)['length']>0x0)return!![];if($gamePlayer['x']===_0x31382b&&$gamePlayer['y']===_0x102deb)return!![];if(this['boat']()[_0x21c2c3(0x2a1)](_0x31382b,_0x102deb))return!![];if(this['ship']()['posNt'](_0x31382b,_0x102deb))return!![];return![];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x3f5)]=function(_0x1c47c3,_0x55f3a1,_0x54305b){const _0xbf1543=_0x2c0583;$gameTemp[_0xbf1543(0x421)]=_0x1c47c3;const _0x1f0238=new Game_Event(_0x1c47c3[_0xbf1543(0x42b)],_0x1c47c3[_0xbf1543(0x65a)]);$gameTemp[_0xbf1543(0x421)]=undefined,_0x1f0238['refresh']();let _0x479276=_0x55f3a1-_0x1f0238['_addedHitbox'][_0xbf1543(0x36a)],_0x236e35=_0x55f3a1+_0x1f0238['_addedHitbox'][_0xbf1543(0x36a)],_0x42780b=_0x54305b-_0x1f0238[_0xbf1543(0x1e4)]['up'],_0x37d40e=_0x54305b+_0x1f0238[_0xbf1543(0x1e4)][_0xbf1543(0x403)];for(let _0x397350=_0x479276;_0x397350<=_0x236e35;_0x397350++){if(_0xbf1543(0x220)==='xyjvI')for(let _0x3c818c=_0x42780b;_0x3c818c<=_0x37d40e;_0x3c818c++){if(this[_0xbf1543(0x239)](_0x397350,_0x3c818c))return![];}else this[_0xbf1543(0x621)]['target']=0x0;}return!![];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x567)]=function(_0x37ae25){const _0x332773=_0x2c0583;$gameTemp[_0x332773(0x421)]=_0x37ae25;const _0x3ae468=new Game_Event(_0x37ae25[_0x332773(0x42b)],_0x37ae25[_0x332773(0x65a)]);$gameTemp[_0x332773(0x421)]=undefined,this[_0x332773(0x376)][_0x332773(0x2a8)](_0x3ae468),_0x3ae468[_0x332773(0x5a0)](_0x37ae25),this['clearEventCache']();},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x44c)]=function(_0x4b0213,_0xc0ba92,_0x5ef76a){const _0x12d659=_0x2c0583,_0x5aa25f=_0x4b0213[_0x12d659(0x2dc)][_0x12d659(0x2db)]()['trim']();if(_0x5aa25f!==_0x12d659(0x3c0)){const _0x54d53f=VisuMZ[_0x12d659(0x465)][_0x5aa25f];_0x54d53f&&(_0x4b0213[_0x12d659(0x42b)]=_0x54d53f['MapID'],_0x4b0213['eventId']=_0x54d53f[_0x12d659(0x2e0)]);}const _0x3f38be=_0x4b0213['x'],_0x2f2f43=_0x4b0213['y'];if(!this['isValid'](_0x3f38be,_0x2f2f43))return![];if(_0xc0ba92){if(_0x12d659(0x5d5)!==_0x12d659(0x310)){if(this[_0x12d659(0x239)](_0x3f38be,_0x2f2f43))return![];if(!this['isSpawnHitboxCollisionOk'](_0x4b0213,_0x3f38be,_0x2f2f43))return![];}else{_0x260e73[_0x12d659(0x28d)](this);const _0x1c56fd=_0x11c740[_0x12d659(0x568)][_0x12d659(0x4c5)][_0x12d659(0x30e)](this,_0x2c1433);return _0x58646a[_0x12d659(0x58d)](),_0x1c56fd;}}if(_0x5ef76a){if('mKezx'!=='UCZxm'){if(!this['isPassableByAnyDirection'](_0x3f38be,_0x2f2f43))return![];}else this[_0x12d659(0x1ef)]=![],this[_0x12d659(0x1e2)]=!![];}return this[_0x12d659(0x567)](_0x4b0213),!![];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x1fa)]=function(_0x564a0d,_0x1c0b74,_0x512d22,_0x489924){const _0x121174=_0x2c0583,_0x1590d5=[],_0xaa205=this[_0x121174(0x331)](),_0x5ae6c8=this[_0x121174(0x3d6)]();for(let _0x2a83cf=0x0;_0x2a83cf<_0xaa205;_0x2a83cf++){for(let _0x30c68d=0x0;_0x30c68d<_0x5ae6c8;_0x30c68d++){if(_0x121174(0x2ec)===_0x121174(0x1c8))return!![];else{if(!_0x1c0b74[_0x121174(0x454)](this['regionId'](_0x2a83cf,_0x30c68d)))continue;if(!this[_0x121174(0x589)](_0x2a83cf,_0x30c68d))continue;if(_0x512d22){if(_0x121174(0x3a7)==='LyuFz'){if(this[_0x121174(0x239)](_0x2a83cf,_0x30c68d))continue;if(!this[_0x121174(0x3f5)](_0x564a0d,_0x2a83cf,_0x30c68d))continue;}else this[_0x121174(0x4ef)][_0x121174(0x322)]=_0x179fc6(_0x52810a['$1']);}if(_0x489924){if(_0x121174(0x24a)===_0x121174(0x2f2))return _0x3259ec[_0x121174(0x63f)]();else{if(!this['isPassableByAnyDirection'](_0x2a83cf,_0x30c68d))continue;}}_0x1590d5[_0x121174(0x2a8)]([_0x2a83cf,_0x30c68d]);}}}if(_0x1590d5[_0x121174(0x19e)]>0x0){const _0x8239af=_0x1590d5[Math[_0x121174(0x20b)](_0x1590d5[_0x121174(0x19e)])];return _0x564a0d['x']=_0x8239af[0x0],_0x564a0d['y']=_0x8239af[0x1],this[_0x121174(0x567)](_0x564a0d),!![];}return![];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x223)]=function(_0x319796,_0x3f5b73,_0x31a756,_0x4b2b6a){const _0x155e98=_0x2c0583,_0x2a241f=[],_0xaf256a=this['width'](),_0x2070a2=this[_0x155e98(0x3d6)]();for(let _0x2abfbf=0x0;_0x2abfbf<_0xaf256a;_0x2abfbf++){for(let _0x3170c9=0x0;_0x3170c9<_0x2070a2;_0x3170c9++){if(!_0x3f5b73[_0x155e98(0x454)](this[_0x155e98(0x269)](_0x2abfbf,_0x3170c9)))continue;if(!this[_0x155e98(0x589)](_0x2abfbf,_0x3170c9))continue;if(_0x31a756){if(this[_0x155e98(0x239)](_0x2abfbf,_0x3170c9))continue;if(!this['isSpawnHitboxCollisionOk'](_0x319796,_0x2abfbf,_0x3170c9))continue;}if(_0x4b2b6a){if(!this[_0x155e98(0x3e8)](_0x2abfbf,_0x3170c9))continue;}_0x2a241f[_0x155e98(0x2a8)]([_0x2abfbf,_0x3170c9]);}}if(_0x2a241f[_0x155e98(0x19e)]>0x0){if(_0x155e98(0x30c)==='YsRov')return this['processMoveRouteFadeOut'](_0x16f9ac(_0x26bf3c['$1']));else{const _0x3474c1=_0x2a241f[Math['randomInt'](_0x2a241f[_0x155e98(0x19e)])];return _0x319796['x']=_0x3474c1[0x0],_0x319796['y']=_0x3474c1[0x1],this[_0x155e98(0x567)](_0x319796),!![];}}return![];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x3e8)]=function(_0x13c190,_0x59df43){const _0x24aabc=_0x2c0583;if(this[_0x24aabc(0x558)](_0x13c190,_0x59df43,0x2))return!![];if(this[_0x24aabc(0x558)](_0x13c190,_0x59df43,0x4))return!![];if(this[_0x24aabc(0x558)](_0x13c190,_0x59df43,0x6))return!![];if(this[_0x24aabc(0x558)](_0x13c190,_0x59df43,0x8))return!![];return![];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x435)]=function(_0x56b1b3){const _0x5be1a2=_0x2c0583;if(_0x56b1b3<0x3e8)return;if(!this[_0x5be1a2(0x376)])return;const _0x3195d1=this[_0x5be1a2(0x254)](_0x56b1b3);_0x3195d1[_0x5be1a2(0x4e1)](-0x1,-0x1),_0x3195d1['erase'](),this[_0x5be1a2(0x376)][_0x56b1b3-0x3e8]=null,this[_0x5be1a2(0x34b)]();},Game_Map['prototype']['firstSpawnedEvent']=function(){const _0x52aa8f=_0x2c0583;for(const _0x17735c of this[_0x52aa8f(0x376)]){if(_0x17735c)return _0x17735c;}return null;},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x386)]=function(){const _0x354970=_0x2c0583,_0x2972e6=this[_0x354970(0x474)]();return _0x2972e6?_0x2972e6[_0x354970(0x53a)]:0x0;},Game_Map[_0x2c0583(0x4ff)]['lastSpawnedEvent']=function(){const _0x1854f6=_0x2c0583,_0x168a4f=this['_spawnedEvents']['slice'](0x0)[_0x1854f6(0x478)]();for(const _0xf11cd1 of _0x168a4f){if(_0x1854f6(0x2bb)==='WXAdu')return this[_0x1854f6(0x43c)](_0x12c4e1(_0x5a32f1['$1']),_0x25a5f0(_0x5d9e8c['$2']));else{if(_0xf11cd1)return _0xf11cd1;}}return null;},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x271)]=function(){const _0x16e608=_0x2c0583,_0x500825=this[_0x16e608(0x49f)]();return _0x500825?_0x500825[_0x16e608(0x53a)]:0x0;},Game_Map[_0x2c0583(0x4ff)]['despawnAtXY']=function(_0x39fe59,_0x247804){const _0x466de2=_0x2c0583,_0x114f17=this['eventsXy'](_0x39fe59,_0x247804);for(const _0x16a2bc of _0x114f17){if(!_0x16a2bc)continue;if(_0x16a2bc[_0x466de2(0x1c2)]())this[_0x466de2(0x435)](_0x16a2bc[_0x466de2(0x53a)]);}},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x56e)]=function(_0x2130de){const _0x84d00a=_0x2c0583;for(const _0x3df13b of this[_0x84d00a(0x376)]){if(!_0x3df13b)continue;if(_0x2130de[_0x84d00a(0x454)](_0x3df13b['regionId']())){if(_0x84d00a(0x243)!==_0x84d00a(0x243)){if(_0x20d21f[_0x84d00a(0x2f0)](_0x183227,_0x371466,_0x2c9af9,_0x84d00a(0x397)))return this[_0x84d00a(0x583)]()&&this[_0x84d00a(0x443)]()?this[_0x84d00a(0x443)]()[_0x84d00a(0x2ae)](_0x202703,_0x5c9dc2,_0x4c1eb4):!![];if(_0x1b033e[_0x84d00a(0x257)](_0x186872,_0x345236,_0x1881a2,'player'))return![];return _0x3485f0['EventsMoveCore'][_0x84d00a(0x2e9)][_0x84d00a(0x30e)](this,_0xb5b901,_0x27b964,_0x411361);}else this[_0x84d00a(0x435)](_0x3df13b[_0x84d00a(0x53a)]);}}},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x47b)]=function(_0x32a761){const _0x2fe6b8=_0x2c0583;for(const _0x5a4bb8 of this['_spawnedEvents']){if(!_0x5a4bb8)continue;_0x32a761[_0x2fe6b8(0x454)](_0x5a4bb8[_0x2fe6b8(0x269)]())&&this[_0x2fe6b8(0x435)](_0x5a4bb8[_0x2fe6b8(0x53a)]);}},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x50b)]=function(){const _0x5dfc09=_0x2c0583;for(const _0x2fede3 of this[_0x5dfc09(0x376)]){if(!_0x2fede3)continue;this[_0x5dfc09(0x435)](_0x2fede3[_0x5dfc09(0x53a)]);}},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x3f2)]=Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x348)],Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x348)]=function(_0xbcc170){const _0xc8ad97=_0x2c0583;VisuMZ[_0xc8ad97(0x568)][_0xc8ad97(0x3f2)]['call'](this,_0xbcc170);if(_0xbcc170>=0x3e8){const _0x2e2f53=this[_0xc8ad97(0x254)](_0xbcc170);if(_0x2e2f53)_0x2e2f53[_0xc8ad97(0x462)]();}},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x573)]=function(){const _0x196a81=_0x2c0583;this[_0x196a81(0x1ef)]=![],this[_0x196a81(0x1e2)]=![];if(!$dataMap)return;const _0x3c7016=$dataMap[_0x196a81(0x4bf)]||'';if(_0x3c7016[_0x196a81(0x524)](/<HIDE PLAYER>/i))this[_0x196a81(0x1ef)]=![],this[_0x196a81(0x1e2)]=!![];else _0x3c7016[_0x196a81(0x524)](/<SHOW PLAYER>/i)&&(this[_0x196a81(0x1ef)]=!![],this[_0x196a81(0x1e2)]=![]);},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x625)]=function(){const _0x59cbac=_0x2c0583;return this[_0x59cbac(0x1ef)]===undefined&&(_0x59cbac(0x3b8)!==_0x59cbac(0x4b3)?this[_0x59cbac(0x573)]():_0x3d1bd0=[-_0x1f29d8[_0x59cbac(0x560)],0x0,_0x45561e[_0x59cbac(0x560)]][this[_0x59cbac(0x2e4)][_0x59cbac(0x4ac)]()]),this[_0x59cbac(0x1ef)];},Game_Map['prototype'][_0x2c0583(0x61e)]=function(){const _0xe90941=_0x2c0583;return this[_0xe90941(0x1e2)]===undefined&&this[_0xe90941(0x573)](),this[_0xe90941(0x1e2)];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x250)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x3fb)],Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x3fb)]=function(){const _0x44916a=_0x2c0583;if(this===$gamePlayer){if($gameMap['isPlayerForceShown']())return![];if($gameMap[_0x44916a(0x61e)]())return!![];}return VisuMZ[_0x44916a(0x568)][_0x44916a(0x250)][_0x44916a(0x30e)](this);},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x1e3)]=function(){const _0x48ddd0=_0x2c0583;this[_0x48ddd0(0x62d)]=![],this[_0x48ddd0(0x5e6)]=![];if(!$dataMap)return;const _0x17d1d0=$dataMap[_0x48ddd0(0x4bf)]||'';if(_0x17d1d0[_0x48ddd0(0x524)](/<HIDE FOLLOWERS>/i))this[_0x48ddd0(0x62d)]=![],this[_0x48ddd0(0x5e6)]=!![];else _0x17d1d0[_0x48ddd0(0x524)](/<SHOW FOLLOWERS>/i)&&(_0x48ddd0(0x251)===_0x48ddd0(0x251)?(this[_0x48ddd0(0x62d)]=!![],this['_forceHideFollower']=![]):(_0x17ea48['EventsMoveCore']['Game_Map_refresh']['call'](this),this[_0x48ddd0(0x654)]()));},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x439)]=function(){const _0x249083=_0x2c0583;if(this[_0x249083(0x62d)]===undefined){if(_0x249083(0x500)!==_0x249083(0x500)){_0x4e11fa[_0x249083(0x4de)]=_0x485235[_0x249083(0x4de)][_0x249083(0x2db)]()[_0x249083(0x634)](),_0xdf4e96[_0x249083(0x465)][_0xdf013b[_0x249083(0x4de)]]=_0x243fb4;if(!_0x58e927[_0x249083(0x454)](_0x3b3814['MapID']))_0x499adc[_0x249083(0x2a8)](_0x1936e9['MapID']);}else this[_0x249083(0x1e3)]();}return this['_forceShowFollower'];},Game_Map[_0x2c0583(0x4ff)][_0x2c0583(0x590)]=function(){const _0x57699f=_0x2c0583;if(this['_forceHideFollower']===undefined){if(_0x57699f(0x289)==='qzBGd'){if(this[_0x57699f(0x4c7)]===_0x5d0483)this[_0x57699f(0x1ec)]();return this[_0x57699f(0x4c7)];}else this['setupFollowerVisibilityOverrides']();}return this['_forceHideFollower'];},VisuMZ['EventsMoveCore'][_0x2c0583(0x1e0)]=Game_Followers[_0x2c0583(0x4ff)][_0x2c0583(0x362)],Game_Followers[_0x2c0583(0x4ff)][_0x2c0583(0x362)]=function(){const _0x349cca=_0x2c0583;if($gameMap[_0x349cca(0x439)]())return!![];if($gameMap[_0x349cca(0x590)]())return![];return VisuMZ[_0x349cca(0x568)][_0x349cca(0x1e0)][_0x349cca(0x30e)](this);},Game_CommonEvent[_0x2c0583(0x4ff)][_0x2c0583(0x32a)]=function(){const _0x48abfc=_0x2c0583,_0x121bc=this[_0x48abfc(0x254)]();return this[_0x48abfc(0x446)]()&&_0x121bc[_0x48abfc(0x3d8)]>=0x1&&DataManager[_0x48abfc(0x61d)](_0x121bc['switchId']);},Game_CommonEvent[_0x2c0583(0x4ff)][_0x2c0583(0x423)]=function(){const _0x1297bd=_0x2c0583;return VisuMZ['EventsMoveCore'][_0x1297bd(0x1b2)][_0x1297bd(0x52f)][_0x1297bd(0x454)](this['_commonEventId']);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x2d2)]=Game_CommonEvent[_0x2c0583(0x4ff)]['isActive'],Game_CommonEvent[_0x2c0583(0x4ff)]['isActive']=function(){const _0x401e99=_0x2c0583;return VisuMZ[_0x401e99(0x568)][_0x401e99(0x2d2)][_0x401e99(0x30e)](this)?!![]:_0x401e99(0x2f8)!==_0x401e99(0x2f8)?_0xa75870[_0x401e99(0x568)][_0x401e99(0x613)][_0x401e99(0x30e)](this,_0x3131ac):VisuMZ[_0x401e99(0x568)][_0x401e99(0x1b2)][_0x401e99(0x19b)](this[_0x401e99(0x254)]()[_0x401e99(0x5c6)],this[_0x401e99(0x60b)]);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x628)]=Game_Map['prototype'][_0x2c0583(0x657)],Game_Map[_0x2c0583(0x4ff)]['parallelCommonEvents']=function(){const _0x42d5a0=_0x2c0583,_0x34967f=VisuMZ[_0x42d5a0(0x568)][_0x42d5a0(0x628)][_0x42d5a0(0x30e)](this),_0xe27c24=VisuMZ['EventsMoveCore'][_0x42d5a0(0x1b2)][_0x42d5a0(0x52f)]['map'](_0x32eb9a=>$dataCommonEvents[_0x32eb9a]);return _0x34967f[_0x42d5a0(0x532)](_0xe27c24)['filter']((_0x4a242f,_0x3898b9,_0x474b10)=>_0x474b10['indexOf'](_0x4a242f)===_0x3898b9);},VisuMZ[_0x2c0583(0x568)]['Game_CharacterBase_initMembers']=Game_CharacterBase['prototype'][_0x2c0583(0x598)],Game_CharacterBase['prototype'][_0x2c0583(0x598)]=function(){const _0x2ed672=_0x2c0583;VisuMZ[_0x2ed672(0x568)][_0x2ed672(0x3cb)][_0x2ed672(0x30e)](this),this[_0x2ed672(0x540)]();},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x540)]=function(){const _0xf1648b=_0x2c0583;this[_0xf1648b(0x4f7)]=![],this[_0xf1648b(0x3ff)](),this[_0xf1648b(0x417)](),this[_0xf1648b(0x666)](),this['clearStepPattern']();},VisuMZ['EventsMoveCore'][_0x2c0583(0x527)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x1f5)],Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x1f5)]=function(){const _0x18e637=_0x2c0583;let _0x2c5b99=VisuMZ[_0x18e637(0x568)][_0x18e637(0x527)][_0x18e637(0x30e)](this);return _0x2c5b99=this[_0x18e637(0x36f)](_0x2c5b99),_0x2c5b99;},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x36f)]=function(_0x41b5ea){return _0x41b5ea;},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x1ba)]=function(){const _0x52d13e=_0x2c0583;if(this[_0x52d13e(0x329)]===Game_Player&&this[_0x52d13e(0x583)]())return this['vehicle']()[_0x52d13e(0x3d7)]()[_0x52d13e(0x524)](/\[VS8\]/i);else{if(Imported[_0x52d13e(0x1d8)]&&this['hasDragonbones']()){if(_0x52d13e(0x5c9)===_0x52d13e(0x448))this[_0x52d13e(0x354)]();else return!![];}else return this['characterName']()['match'](/\[VS8\]/i);}},VisuMZ[_0x2c0583(0x568)]['Game_CharacterBase_direction']=Game_CharacterBase[_0x2c0583(0x4ff)]['direction'],Game_CharacterBase[_0x2c0583(0x4ff)]['direction']=function(){const _0x24191a=_0x2c0583;if(!$dataMap)return this['_direction']||0x2;if(this[_0x24191a(0x1b6)]()&&!this['isJumping']()&&this[_0x24191a(0x1ba)]()){if('iLEQp'!==_0x24191a(0x1b3))return this['directionOnLadderSpriteVS8dir']();else this[_0x24191a(0x285)]=0x0;}else{if(this[_0x24191a(0x1b6)]()&&!this[_0x24191a(0x651)]())return 0x8;else{if(this['isPosing']()&&this[_0x24191a(0x1ba)]())return _0x24191a(0x49e)!==_0x24191a(0x4c1)?this[_0x24191a(0x485)]():_0x5196be[_0x24191a(0x51a)](this);else{if('DlJQD'===_0x24191a(0x476))return VisuMZ['EventsMoveCore']['Game_CharacterBase_direction']['call'](this);else{const _0x4bdd28=_0x257afa[_0x24191a(0x447)](this['moveSynchTarget']());this[_0x24191a(0x1f1)](_0x4bdd28);}}}}},VisuMZ[_0x2c0583(0x568)]['Game_CharacterBase_setDirection']=Game_CharacterBase['prototype'][_0x2c0583(0x46a)],Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x46a)]=function(_0x545644){const _0xea7163=_0x2c0583;if(!this[_0xea7163(0x1ba)]())_0x545644=this[_0xea7163(0x27b)](_0x545644);VisuMZ[_0xea7163(0x568)][_0xea7163(0x30a)][_0xea7163(0x30e)](this,_0x545644);},Game_CharacterBase['prototype']['correctFacingDirection']=function(_0x250bd8){const _0x5ddcb1=_0x2c0583;if(_0x250bd8===0x1)return this[_0x5ddcb1(0x3af)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x250bd8===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x250bd8===0x7)return this[_0x5ddcb1(0x3af)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x250bd8===0x9)return this[_0x5ddcb1(0x3af)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x250bd8;},Game_CharacterBase['prototype']['isDiagonalDirection']=function(_0x3de77e){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x3de77e);},Game_CharacterBase['prototype'][_0x2c0583(0x394)]=function(){const _0x5b0e56=_0x2c0583;return this[_0x5b0e56(0x33f)]||0x0;},VisuMZ[_0x2c0583(0x568)]['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x2c0583(0x4ff)]['moveStraight'],Game_CharacterBase[_0x2c0583(0x4ff)]['moveStraight']=function(_0x597528){const _0x29894e=_0x2c0583;this[_0x29894e(0x33f)]=_0x597528,VisuMZ[_0x29894e(0x568)]['Game_CharacterBase_moveStraight'][_0x29894e(0x30e)](this,_0x597528);},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x606)]=function(_0x1ee78b){const _0x4c7b20=_0x2c0583;if(!this['isDiagonalDirection'](_0x1ee78b))return this[_0x4c7b20(0x3c1)](_0x1ee78b);let _0xf8c6a7=0x0,_0x13108e=0x0;switch(_0x1ee78b){case 0x1:_0xf8c6a7=0x4,_0x13108e=0x2;break;case 0x3:_0xf8c6a7=0x6,_0x13108e=0x2;break;case 0x7:_0xf8c6a7=0x4,_0x13108e=0x8;break;case 0x9:_0xf8c6a7=0x6,_0x13108e=0x8;break;}if(VisuMZ[_0x4c7b20(0x568)][_0x4c7b20(0x4d1)][_0x4c7b20(0x1b9)][_0x4c7b20(0x2a4)]){if(!this[_0x4c7b20(0x3af)](this['_x'],this['_y'],_0xf8c6a7)){if(_0x4c7b20(0x286)===_0x4c7b20(0x286))return this[_0x4c7b20(0x3c1)](_0x13108e);else _0x44e617===_0x4c7b20(0x36a)?this['turnLeft90']():this[_0x4c7b20(0x5c4)]();}if(!this[_0x4c7b20(0x3af)](this['_x'],this['_y'],_0x13108e))return _0x4c7b20(0x3fa)!==_0x4c7b20(0x3fa)?_0x5b4afc[_0x4c7b20(0x568)]['Settings'][_0x4c7b20(0x3e0)]['FontSize']:this[_0x4c7b20(0x3c1)](_0xf8c6a7);if(!this['canPassDiagonally'](this['_x'],this['_y'],_0xf8c6a7,_0x13108e)){let _0x12e588=VisuMZ[_0x4c7b20(0x568)][_0x4c7b20(0x4d1)][_0x4c7b20(0x1b9)][_0x4c7b20(0x57e)]?_0xf8c6a7:_0x13108e;return this['moveStraight'](_0x12e588);}}this[_0x4c7b20(0x33f)]=_0x1ee78b,this['moveDiagonally'](_0xf8c6a7,_0x13108e);},VisuMZ[_0x2c0583(0x568)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x63f)],Game_CharacterBase[_0x2c0583(0x4ff)]['realMoveSpeed']=function(){const _0x54fc1c=_0x2c0583;let _0x5d810b=this['_moveSpeed'];return this[_0x54fc1c(0x1a0)]()&&(_0x5d810b+=this[_0x54fc1c(0x5a1)]()),this[_0x54fc1c(0x20a)](_0x5d810b);},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x5a1)]=function(){const _0x1f832d=_0x2c0583,_0x427e55=VisuMZ[_0x1f832d(0x568)][_0x1f832d(0x4d1)]['Movement'];return _0x427e55[_0x1f832d(0x264)]!==undefined?_0x427e55['DashModifier']:VisuMZ[_0x1f832d(0x568)][_0x1f832d(0x24f)][_0x1f832d(0x30e)](this)-this[_0x1f832d(0x643)];},Game_CharacterBase['prototype'][_0x2c0583(0x20a)]=function(_0x495199){const _0x3fbc71=_0x2c0583,_0x5cb61a=VisuMZ['EventsMoveCore'][_0x3fbc71(0x4d1)][_0x3fbc71(0x1b9)];if(!_0x5cb61a[_0x3fbc71(0x1cb)])return _0x495199;if([0x1,0x3,0x7,0x9][_0x3fbc71(0x454)](this[_0x3fbc71(0x33f)])){if(_0x3fbc71(0x51e)===_0x3fbc71(0x4b1)){if(_0x37b1b5[_0x3fbc71(0x625)]())return![];if(_0x3206b7[_0x3fbc71(0x61e)]())return!![];}else _0x495199*=_0x5cb61a['DiagonalSpeedMultiplier']||0.01;}return _0x495199;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x380)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x1a0)],Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x1a0)]=function(){const _0x41ed19=_0x2c0583;if(this['_forceDashing'])return!![];return VisuMZ[_0x41ed19(0x568)][_0x41ed19(0x380)][_0x41ed19(0x30e)](this);},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x49c)]=function(){const _0x4cd74d=_0x2c0583;return this[_0x4cd74d(0x1a0)]()&&this[_0x4cd74d(0x44e)]===0x0;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x240)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x4ac)],Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x4ac)]=function(){const _0x448c4e=_0x2c0583;if(this[_0x448c4e(0x584)]())return _0x448c4e(0x1b0)===_0x448c4e(0x1b0)?this[_0x448c4e(0x35b)]():_0x408e82['PreloadedMaps'][_0x2eddc3]['events'][_0x108587];else{if('YREgE'===_0x448c4e(0x636)){const _0x5712dc=[_0x1250b9['_mapId'],_0x23a671[_0x448c4e(0x53a)],'Self\x20Switch\x20%1'[_0x448c4e(0x2d3)](_0x2ac1f6)];_0x5a3b15[_0x448c4e(0x529)](_0x5712dc,_0x3e5a57);}else return VisuMZ['EventsMoveCore'][_0x448c4e(0x240)][_0x448c4e(0x30e)](this);}},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x594)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x58f)],Game_CharacterBase[_0x2c0583(0x4ff)]['increaseSteps']=function(){const _0x55f5a4=_0x2c0583;VisuMZ[_0x55f5a4(0x568)][_0x55f5a4(0x594)][_0x55f5a4(0x30e)](this),this[_0x55f5a4(0x3ff)]();},VisuMZ['EventsMoveCore'][_0x2c0583(0x56f)]=Game_CharacterBase['prototype'][_0x2c0583(0x197)],Game_CharacterBase['prototype'][_0x2c0583(0x197)]=function(){const _0x3edad0=_0x2c0583;if(this[_0x3edad0(0x1ba)]())return this['characterIndexVS8']();return VisuMZ[_0x3edad0(0x568)]['Game_CharacterBase_characterIndex'][_0x3edad0(0x30e)](this);},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x488)]=function(){const _0x30140e=_0x2c0583,_0x3e6314=this[_0x30140e(0x385)]();if(this[_0x30140e(0x651)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x3e6314))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x3e6314))return 0x5;}else{if(this[_0x30140e(0x1b6)]()){if(_0x30140e(0x4e9)===_0x30140e(0x55e))this['setWaitMode'](_0x30140e(0x309));else return 0x6;}else{if(this[_0x30140e(0x584)]())return _0x30140e(0x64b)===_0x30140e(0x64b)?this[_0x30140e(0x2ac)]():(this['_pose']||'')[_0x30140e(0x2db)]()[_0x30140e(0x634)]();else{if(this[_0x30140e(0x37b)]){if([0x2,0x4,0x6,0x8][_0x30140e(0x454)](_0x3e6314))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x3e6314))return 0x5;}else{if(this[_0x30140e(0x480)]()&&this[_0x30140e(0x5e1)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x3e6314))return 0x4;if([0x1,0x3,0x7,0x9][_0x30140e(0x454)](_0x3e6314))return 0x5;}else{if(this[_0x30140e(0x49c)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x3e6314))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x3e6314))return 0x3;}else{if(_0x30140e(0x46f)==='QXcxV')return this['isSpriteVS8dir']()?(this[_0x30140e(0x27d)]||'')[_0x30140e(0x2db)]()[_0x30140e(0x634)]():''[_0x30140e(0x2db)]()['trim']();else{if([0x2,0x4,0x6,0x8]['includes'](_0x3e6314))return 0x0;if([0x1,0x3,0x7,0x9][_0x30140e(0x454)](_0x3e6314))return 0x1;}}}}}}}},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x5e1)]=function(){const _0x47a538=_0x2c0583;return VisuMZ[_0x47a538(0x568)]['Settings'][_0x47a538(0x3bc)][_0x47a538(0x55b)];},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x5f0)]=function(){const _0x497706=_0x2c0583;return this[_0x497706(0x1b6)]()&&this[_0x497706(0x269)]()===VisuMZ[_0x497706(0x568)]['Settings'][_0x497706(0x3a8)][_0x497706(0x210)];},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x502)]=function(){const _0x2a4a46=_0x2c0583;if(this[_0x2a4a46(0x5f0)]())return 0x4;else{if(_0x2a4a46(0x291)===_0x2a4a46(0x291))return 0x2;else _0x22bd3a[_0x2a4a46(0x568)][_0x2a4a46(0x390)]['call'](this),this[_0x2a4a46(0x2c3)](),this[_0x2a4a46(0x228)]();}},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x5db)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x22b)],Game_CharacterBase['prototype'][_0x2c0583(0x22b)]=function(){const _0x2080c8=_0x2c0583;VisuMZ[_0x2080c8(0x568)][_0x2080c8(0x5db)]['call'](this),this[_0x2080c8(0x1f4)]();},Game_CharacterBase['prototype']['updatePose']=function(){const _0x510aab=_0x2c0583;this[_0x510aab(0x370)]=this['_poseDuration']||0x0;if(this[_0x510aab(0x370)]>0x0){this[_0x510aab(0x370)]--;if(this[_0x510aab(0x370)]<=0x0&&this['_pose']!==_0x510aab(0x51f))this[_0x510aab(0x3ff)]();}},VisuMZ['EventsMoveCore'][_0x2c0583(0x63c)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x581)],Game_CharacterBase[_0x2c0583(0x4ff)]['moveDiagonally']=function(_0x3a7982,_0x2ed809){const _0x935f55=_0x2c0583;VisuMZ[_0x935f55(0x568)]['Game_CharacterBase_moveDiagonally'][_0x935f55(0x30e)](this,_0x3a7982,_0x2ed809);if(this['isSpriteVS8dir']())this['setDiagonalDirection'](_0x3a7982,_0x2ed809);},Game_CharacterBase[_0x2c0583(0x4ff)]['setDiagonalDirection']=function(_0x4dc29d,_0x24c7d0){const _0x3a5527=_0x2c0583;if(_0x4dc29d===0x4&&_0x24c7d0===0x2)this[_0x3a5527(0x46a)](0x1);if(_0x4dc29d===0x6&&_0x24c7d0===0x2)this[_0x3a5527(0x46a)](0x3);if(_0x4dc29d===0x4&&_0x24c7d0===0x8)this[_0x3a5527(0x46a)](0x7);if(_0x4dc29d===0x6&&_0x24c7d0===0x8)this[_0x3a5527(0x46a)](0x9);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x5b7)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x30d)],Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x30d)]=function(){const _0x352e94=_0x2c0583;if(this[_0x352e94(0x584)]()&&this[_0x352e94(0x262)]()===_0x352e94(0x51f))return!![];return VisuMZ['EventsMoveCore'][_0x352e94(0x5b7)][_0x352e94(0x30e)](this);},Game_CharacterBase['prototype'][_0x2c0583(0x64f)]=function(_0x3e6553,_0x4c14ca){const _0x3acbd2=_0x2c0583;if(_0x3e6553[_0x3acbd2(0x524)](/Z/i))_0x3e6553=_0x3acbd2(0x51f);if(_0x3e6553[_0x3acbd2(0x524)](/SLEEP/i))_0x3e6553=_0x3acbd2(0x51f);this['isSpriteVS8dir']()&&(this['_pose']=_0x3e6553[_0x3acbd2(0x2db)]()[_0x3acbd2(0x634)](),this[_0x3acbd2(0x370)]=_0x4c14ca||Infinity);},Game_CharacterBase['prototype'][_0x2c0583(0x262)]=function(){const _0x27d3d3=_0x2c0583;return this[_0x27d3d3(0x1ba)]()?(this[_0x27d3d3(0x27d)]||'')[_0x27d3d3(0x2db)]()[_0x27d3d3(0x634)]():''[_0x27d3d3(0x2db)]()[_0x27d3d3(0x634)]();},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x2c0)]=function(_0x4ae440,_0xf3df54){const _0x273f70=_0x2c0583;if(this[_0x273f70(0x1ba)]()){const _0x3b608b=['','EXCLAMATION','QUESTION',_0x273f70(0x409),_0x273f70(0x2e8),_0x273f70(0x2a5),'SWEAT',_0x273f70(0x4dd),_0x273f70(0x3de),_0x273f70(0x24b),_0x273f70(0x51f),'','','','',''][_0x4ae440];this[_0x273f70(0x64f)](_0x3b608b,_0xf3df54);}},Game_CharacterBase['prototype'][_0x2c0583(0x3ff)]=function(){const _0x387b82=_0x2c0583;this[_0x387b82(0x27d)]='',this[_0x387b82(0x370)]=0x0;},Game_CharacterBase['prototype'][_0x2c0583(0x584)]=function(){const _0x52224c=_0x2c0583;return this[_0x52224c(0x1ba)]()&&!!this[_0x52224c(0x27d)];},Game_CharacterBase['prototype'][_0x2c0583(0x2ac)]=function(){const _0x16bfc9=_0x2c0583,_0x354272=this['_pose'][_0x16bfc9(0x2db)]();switch(this[_0x16bfc9(0x27d)][_0x16bfc9(0x2db)]()[_0x16bfc9(0x634)]()){case'ITEM':case _0x16bfc9(0x272):case _0x16bfc9(0x25c):case _0x16bfc9(0x1e9):case _0x16bfc9(0x327):case _0x16bfc9(0x5cf):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x2c0583(0x485)]=function(){const _0x182b2e=_0x2c0583;switch(this['_pose']['toUpperCase']()){case _0x182b2e(0x615):case'QUESTION':case'MUSIC\x20NOTE':case'!':case'?':return 0x2;break;case _0x182b2e(0x2e8):case'ANGER':case _0x182b2e(0x2c2):return 0x4;break;case _0x182b2e(0x248):case'HMPH':case _0x182b2e(0x25c):case _0x182b2e(0x4dd):case _0x182b2e(0x3de):case _0x182b2e(0x24b):return 0x6;break;case _0x182b2e(0x1e9):case _0x182b2e(0x327):case _0x182b2e(0x5cf):case _0x182b2e(0x51f):case'SLEEP':return 0x8;break;default:return VisuMZ['EventsMoveCore']['Game_CharacterBase_setDirection'][_0x182b2e(0x30e)](this);break;}},Game_CharacterBase[_0x2c0583(0x4ff)]['getPosingCharacterPattern']=function(){const _0x211beb=_0x2c0583;switch(this[_0x211beb(0x27d)][_0x211beb(0x2db)]()){case _0x211beb(0x248):case _0x211beb(0x1e9):case _0x211beb(0x615):case'!':case _0x211beb(0x2e8):case'COBWEB':return 0x0;break;case'HMPH':case _0x211beb(0x327):case _0x211beb(0x2fc):case'?':case _0x211beb(0x2a5):case _0x211beb(0x3de):return 0x1;break;case _0x211beb(0x25c):case _0x211beb(0x5cf):case _0x211beb(0x409):case'SWEAT':case _0x211beb(0x24b):return 0x2;break;default:return VisuMZ[_0x211beb(0x568)][_0x211beb(0x240)][_0x211beb(0x30e)](this);break;}},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x60c)]=function(){this['_forceCarrying']=!![];},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x444)]=function(){const _0x7fb5b5=_0x2c0583;this[_0x7fb5b5(0x37b)]=![];},Game_CharacterBase['prototype'][_0x2c0583(0x5d4)]=function(){const _0xba55a9=_0x2c0583;this[_0xba55a9(0x661)]=!![];},Game_CharacterBase['prototype'][_0x2c0583(0x417)]=function(){const _0x2f3474=_0x2c0583;this[_0x2f3474(0x661)]=![];},Game_CharacterBase[_0x2c0583(0x4ff)]['isShadowVisible']=function(){const _0x159042=_0x2c0583;if(this[_0x159042(0x352)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x159042(0x437)]==='')return![];if(this['constructor']===Game_Vehicle)return![];if(this[_0x159042(0x3fb)]())return![];return!![];},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x3be)]=function(){const _0x4a8f31=_0x2c0583;if(this[_0x4a8f31(0x1b6)]())return!![];if(this[_0x4a8f31(0x329)]===Game_Player&&this[_0x4a8f31(0x583)]())return!![];return![];},Game_CharacterBase[_0x2c0583(0x4ff)]['shadowFilename']=function(){const _0x5662fb=_0x2c0583;return VisuMZ[_0x5662fb(0x568)][_0x5662fb(0x4d1)][_0x5662fb(0x1b9)][_0x5662fb(0x54d)];},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x614)]=function(){const _0x22857c=_0x2c0583;return this[_0x22857c(0x3ad)]();},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x3eb)]=function(){const _0xe8e499=_0x2c0583,_0x4f87cf=$gameMap['tileHeight']();return Math['floor'](this[_0xe8e499(0x1bf)]()*_0x4f87cf+_0x4f87cf);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x566)]=function(_0x25c5ef,_0x1c2ad6){const _0x16285b=_0x2c0583,_0x212879=this[_0x16285b(0x58b)](),_0x15ccae=$gameMap[_0x16285b(0x331)](),_0x80de1c=[],_0x19a755=[],_0x4e4609=[],_0x588608={};let _0x33ed42=_0x588608;if(this['x']===_0x25c5ef&&this['y']===_0x1c2ad6){if(_0x16285b(0x1e6)!==_0x16285b(0x1e6)){_0x561946[_0x16285b(0x4ff)]['update'][_0x16285b(0x30e)](this);if(!this[_0x16285b(0x31a)]())return;this['updateText'](),this[_0x16285b(0x3c2)](),this[_0x16285b(0x4ab)](),this[_0x16285b(0x3d5)]();}else return 0x0;}_0x588608['parent']=null,_0x588608['x']=this['x'],_0x588608['y']=this['y'],_0x588608['g']=0x0,_0x588608['f']=$gameMap[_0x16285b(0x2e5)](_0x588608['x'],_0x588608['y'],_0x25c5ef,_0x1c2ad6),_0x80de1c[_0x16285b(0x2a8)](_0x588608),_0x19a755[_0x16285b(0x2a8)](_0x588608['y']*_0x15ccae+_0x588608['x']);while(_0x80de1c[_0x16285b(0x19e)]>0x0){let _0x2fe515=0x0;for(let _0x5b12fb=0x0;_0x5b12fb<_0x80de1c[_0x16285b(0x19e)];_0x5b12fb++){_0x80de1c[_0x5b12fb]['f']<_0x80de1c[_0x2fe515]['f']&&(_0x16285b(0x5bc)===_0x16285b(0x5bc)?_0x2fe515=_0x5b12fb:_0x422f50=[_0x5d53c1,_0x2a5929,_0x1a8f1b['toUpperCase']()[_0x16285b(0x634)]()]);}const _0x326469=_0x80de1c[_0x2fe515],_0x314e50=_0x326469['x'],_0xfd5c3=_0x326469['y'],_0x5b7da4=_0xfd5c3*_0x15ccae+_0x314e50,_0x23a77a=_0x326469['g'];_0x80de1c[_0x16285b(0x23a)](_0x2fe515,0x1),_0x19a755[_0x16285b(0x23a)](_0x19a755[_0x16285b(0x1ac)](_0x5b7da4),0x1),_0x4e4609['push'](_0x5b7da4);if(_0x326469['x']===_0x25c5ef&&_0x326469['y']===_0x1c2ad6){if('dJMlr'===_0x16285b(0x597)){_0x33ed42=_0x326469;break;}else this[_0x16285b(0x367)]['list'][_0x16285b(0x23a)](this[_0x16285b(0x587)]+0x1,0x0,_0x3c2128);}if(_0x23a77a>=_0x212879){if(_0x16285b(0x273)===_0x16285b(0x389))return this[_0x16285b(0x5e6)]===_0x32ec82&&this[_0x16285b(0x1e3)](),this[_0x16285b(0x5e6)];else continue;}const _0x4ff6a5=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x1b8912=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x9d2156=0x1;_0x9d2156<0xa;_0x9d2156++){if(_0x16285b(0x652)!=='APoMW')this[_0x16285b(0x4f7)]=!![],this[_0x16285b(0x507)](_0x558d40);else{if(_0x9d2156===0x5)continue;const _0x18db5e=_0x9d2156,_0x2ecf2c=_0x4ff6a5[_0x9d2156],_0x565946=_0x1b8912[_0x9d2156],_0x420ba0=$gameMap[_0x16285b(0x232)](_0x314e50,_0x18db5e),_0x19d862=$gameMap[_0x16285b(0x408)](_0xfd5c3,_0x18db5e),_0x2accd0=_0x19d862*_0x15ccae+_0x420ba0;if(_0x4e4609[_0x16285b(0x454)](_0x2accd0))continue;if(this[_0x16285b(0x329)]===Game_Player&&VisuMZ[_0x16285b(0x568)][_0x16285b(0x4d1)][_0x16285b(0x1b9)][_0x16285b(0x2a4)]){if('BXyrr'!==_0x16285b(0x2cc)){if(_0x5e2958[_0x16285b(0x574)][_0x4c0920][_0x16285b(0x524)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x106674[_0x16285b(0x53e)]['push'](_0x3e7c77);if(_0x1e5955[_0x16285b(0x574)][_0x564f2e][_0x16285b(0x524)](/<SELF>/i))_0x2ee51a['SelfVariables'][_0x16285b(0x2a8)](_0x1190bb);if(_0x5d07eb['variables'][_0x1ce6aa][_0x16285b(0x524)](/<MAP>/i))_0x2a65fb[_0x16285b(0x596)][_0x16285b(0x2a8)](_0x4731e5);}else{if(!this[_0x16285b(0x3af)](_0x314e50,_0xfd5c3,_0x2ecf2c))continue;if(!this[_0x16285b(0x3af)](_0x314e50,_0xfd5c3,_0x565946))continue;}}if(!this[_0x16285b(0x512)](_0x314e50,_0xfd5c3,_0x2ecf2c,_0x565946))continue;const _0x418500=_0x23a77a+0x1,_0x203821=_0x19a755['indexOf'](_0x2accd0);if(_0x203821<0x0||_0x418500<_0x80de1c[_0x203821]['g']){if(_0x16285b(0x4cd)!=='zuPpE'){if(!this[_0x16285b(0x611)](_0x2cb752,_0x4c08e8))return;const _0x1c11e0=_0x52728a[_0x16285b(0x568)]['Settings'][_0x16285b(0x4f5)];if(!_0x2ee2cd)_0x1c11e0[_0x16285b(0x57b)][_0x16285b(0x30e)](this,_0x4e0284,_0x38bc79,this);this[_0x16285b(0x64a)]={'mapId':_0x12dc3b,'eventId':_0x5b9174},this['_pageIndex']=-0x2,this['refresh']();if(!_0x3a88ea)_0x1c11e0[_0x16285b(0x349)]['call'](this,_0x22937f,_0x2023c6,this);_0x329ee2[_0x16285b(0x34b)]();}else{let _0x501b9c={};if(_0x203821>=0x0)_0x16285b(0x324)===_0x16285b(0x2c9)?(this[_0x16285b(0x2fa)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x16285b(0x3ab)]={},this[_0x16285b(0x4b4)]=[],this['_PreservedEventMorphData']={},this[_0x16285b(0x59c)]={},this['_DisablePlayerControl']=![],this[_0x16285b(0x4e4)]=_0x16285b(0x320)):_0x501b9c=_0x80de1c[_0x203821];else{if('SXzrb'===_0x16285b(0x66c))_0x80de1c[_0x16285b(0x2a8)](_0x501b9c),_0x19a755['push'](_0x2accd0);else{let _0x59b84c='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x16285b(0x2d3)](_0x277b3e[_0x16285b(0x42b)]);_0x59b84c+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x59b84c+=_0x16285b(0x28f),_0x59b84c+=_0x16285b(0x3cf),_0x59b84c+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x204981[_0x16285b(0x42b)]),_0x25ae83(_0x59b84c);return;}}_0x501b9c['parent']=_0x326469,_0x501b9c['x']=_0x420ba0,_0x501b9c['y']=_0x19d862,_0x501b9c['g']=_0x418500,_0x501b9c['f']=_0x418500+$gameMap['distance'](_0x420ba0,_0x19d862,_0x25c5ef,_0x1c2ad6),(!_0x33ed42||_0x501b9c['f']-_0x501b9c['g']<_0x33ed42['f']-_0x33ed42['g'])&&(_0x33ed42=_0x501b9c);}}}}}let _0x17ddb3=_0x33ed42;while(_0x17ddb3['parent']&&_0x17ddb3[_0x16285b(0x463)]!==_0x588608){'oDwhg'!==_0x16285b(0x31c)?(_0x1a6caf['prototype'][_0x16285b(0x22b)][_0x16285b(0x30e)](this),this[_0x16285b(0x415)](),this[_0x16285b(0x3c2)](),this[_0x16285b(0x4ab)](),this[_0x16285b(0x3d5)]()):_0x17ddb3=_0x17ddb3[_0x16285b(0x463)];}const _0x1bf807=$gameMap['deltaX'](_0x17ddb3['x'],_0x588608['x']),_0x1d8d7f=$gameMap['deltaY'](_0x17ddb3['y'],_0x588608['y']);if(_0x1bf807<0x0&&_0x1d8d7f>0x0)return 0x1;if(_0x1bf807>0x0&&_0x1d8d7f>0x0)return 0x3;if(_0x1bf807<0x0&&_0x1d8d7f<0x0)return 0x7;if(_0x1bf807>0x0&&_0x1d8d7f<0x0)return 0x9;if(_0x1d8d7f>0x0)return 0x2;if(_0x1bf807<0x0)return 0x4;if(_0x1bf807>0x0)return 0x6;if(_0x1d8d7f<0x0)return 0x8;const _0x7f8dca=this[_0x16285b(0x627)](_0x25c5ef),_0x5565c2=this[_0x16285b(0x219)](_0x1c2ad6);if(Math['abs'](_0x7f8dca)>Math['abs'](_0x5565c2)){if(_0x16285b(0x270)!==_0x16285b(0x662))return _0x7f8dca>0x0?0x4:0x6;else _0x49dc82['y']+=0x1;}else{if(_0x5565c2!==0x0){if(_0x16285b(0x541)===_0x16285b(0x4e5)){_0x4b5724[_0x16285b(0x2f5)](_0xe7ca7f,_0x24ec32),_0x2bcf3b['setControlledFollowerID'](0x0),_0x472a62[_0x16285b(0x261)](![]);for(const _0x42b636 of _0x365c2d[_0x16285b(0x1a5)]()[_0x16285b(0x305)]){if(_0x42b636)_0x42b636['setChaseOff'](![]);}}else return _0x5565c2>0x0?0x8:0x2;}}return 0x0;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x259)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x3af)],Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x3af)]=function(_0x570968,_0x3c2c0b,_0x2c8dd3){const _0x1dd41c=_0x2c0583;return this[_0x1dd41c(0x35d)]===_0x1dd41c(0x585)?this[_0x1dd41c(0x443)]()[_0x1dd41c(0x3ef)](_0x570968,_0x3c2c0b,_0x2c8dd3):VisuMZ[_0x1dd41c(0x568)][_0x1dd41c(0x259)][_0x1dd41c(0x30e)](this,_0x570968,_0x3c2c0b,_0x2c8dd3);},Game_CharacterBase[_0x2c0583(0x4ff)]['clearSpriteOffsets']=function(){const _0x228464=_0x2c0583;this[_0x228464(0x3da)]=0x0,this[_0x228464(0x29b)]=0x0;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x229)]=Game_CharacterBase['prototype']['screenX'],Game_CharacterBase['prototype'][_0x2c0583(0x3ad)]=function(){const _0x5bed99=_0x2c0583;return VisuMZ[_0x5bed99(0x568)]['Game_CharacterBase_screenX']['call'](this)+(this[_0x5bed99(0x3da)]||0x0);},VisuMZ['EventsMoveCore'][_0x2c0583(0x19a)]=Game_CharacterBase[_0x2c0583(0x4ff)]['screenY'],Game_CharacterBase['prototype']['screenY']=function(){const _0x1190e5=_0x2c0583;return VisuMZ['EventsMoveCore'][_0x1190e5(0x19a)][_0x1190e5(0x30e)](this)+(this[_0x1190e5(0x29b)]||0x0);},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x36c)]=function(){const _0x1b366c=_0x2c0583;this[_0x1b366c(0x387)]='';},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x241)]=Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x318)],Game_CharacterBase['prototype']['updatePattern']=function(){const _0x363c18=_0x2c0583;if(this[_0x363c18(0x4f7)])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x363c18(0x568)][_0x363c18(0x241)][_0x363c18(0x30e)](this);},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x1cc)]=function(){const _0x380806=_0x2c0583;if(!this['hasStepAnime']()&&this[_0x380806(0x44e)]>0x0)return![];switch(String(this[_0x380806(0x387)])[_0x380806(0x2db)]()[_0x380806(0x634)]()){case _0x380806(0x4ba):this['_pattern']+=0x1;if(this[_0x380806(0x4f4)]>0x2)this[_0x380806(0x507)](0x0);break;case _0x380806(0x61b):this['_pattern']-=0x1;if(this['_pattern']<0x0)this[_0x380806(0x507)](0x2);break;case _0x380806(0x3b1):case _0x380806(0x4b8):this[_0x380806(0x5c4)]();break;case _0x380806(0x2df):case _0x380806(0x306):case _0x380806(0x460):case _0x380806(0x582):this[_0x380806(0x25a)]();break;default:return![];}return!![];},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x51a)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase['prototype'][_0x2c0583(0x480)]=function(){const _0x2f92fe=_0x2c0583,_0x1a3304=this[_0x2f92fe(0x51a)]();if(!_0x1a3304)return![];return _0x1a3304[_0x2f92fe(0x2a9)]>0x0;},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x45d)]=function(){const _0x12f0a2=_0x2c0583,_0x126628=this[_0x12f0a2(0x385)]();return $gameMap['roundXWithDirection'](this['x'],_0x126628);},Game_CharacterBase[_0x2c0583(0x4ff)]['frontY']=function(){const _0x21df49=_0x2c0583,_0x2943c7=this[_0x21df49(0x385)]();return $gameMap['roundYWithDirection'](this['y'],_0x2943c7);},Game_CharacterBase[_0x2c0583(0x4ff)]['backX']=function(){const _0x223a6a=_0x2c0583,_0x532d6b=this[_0x223a6a(0x669)](this[_0x223a6a(0x385)]());return $gameMap[_0x223a6a(0x232)](this['x'],_0x532d6b);},Game_CharacterBase[_0x2c0583(0x4ff)][_0x2c0583(0x46b)]=function(){const _0x797610=_0x2c0583,_0x53c4d2=this[_0x797610(0x669)](this[_0x797610(0x385)]());return $gameMap[_0x797610(0x408)](this['y'],_0x53c4d2);},VisuMZ[_0x2c0583(0x568)]['Game_Character_setMoveRoute']=Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x559)],Game_Character['prototype'][_0x2c0583(0x559)]=function(_0x5e12ff){const _0x537ca7=_0x2c0583;route=JsonEx[_0x537ca7(0x5e9)](_0x5e12ff),VisuMZ[_0x537ca7(0x568)][_0x537ca7(0x20f)][_0x537ca7(0x30e)](this,route);},VisuMZ['EventsMoveCore'][_0x2c0583(0x591)]=Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x593)],Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x593)]=function(_0x553c5a){const _0x21713b=_0x2c0583;route=JsonEx[_0x21713b(0x5e9)](_0x553c5a),VisuMZ[_0x21713b(0x568)][_0x21713b(0x591)][_0x21713b(0x30e)](this,route);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x204)]=Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x246)],Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x246)]=function(_0x5b441a){const _0x250bf6=_0x2c0583,_0x334443=Game_Character,_0x332819=_0x5b441a[_0x250bf6(0x39f)];if(_0x5b441a[_0x250bf6(0x489)]===_0x334443[_0x250bf6(0x57a)]){if(_0x250bf6(0x51b)!=='IDlHU'){const _0x3b8b57=_0x43d934[_0x250bf6(0x355)]()||this;if(_0x3b8b57[_0x250bf6(0x329)]!==_0x27563b)_0x67deaf['EventsMoveCore'][_0x250bf6(0x27e)]['call'](this,_0x541018,_0x11b9da);else{const _0x4565ba=[_0x3b8b57['_mapId'],_0x3b8b57[_0x250bf6(0x53a)],'Self\x20Switch\x20%1'[_0x250bf6(0x2d3)](_0xa57945)];_0x4bee83[_0x250bf6(0x529)](_0x4565ba,_0x24cef5);}}else{let _0x1ed735=_0x5b441a[_0x250bf6(0x39f)][0x0];_0x1ed735=this[_0x250bf6(0x510)](_0x1ed735),_0x1ed735=this['convertSelfVariableValuesInScriptCall'](_0x1ed735),this[_0x250bf6(0x543)](_0x5b441a,_0x1ed735);}}else VisuMZ[_0x250bf6(0x568)]['Game_Character_processMoveCommand']['call'](this,_0x5b441a);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x510)]=function(_0xfd6a07){const _0xf3fc73=_0x2c0583,_0x218eac=/\$gameVariables\.value\((\d+)\)/gi,_0x43d54a=/\\V\[(\d+)\]/gi;while(_0xfd6a07['match'](_0x218eac)){_0xfd6a07=_0xfd6a07['replace'](_0x218eac,(_0x5fcc37,_0x11db11)=>$gameVariables[_0xf3fc73(0x2f7)](parseInt(_0x11db11)));}while(_0xfd6a07[_0xf3fc73(0x524)](_0x43d54a)){if(_0xf3fc73(0x35c)!=='AvtND')_0xfd6a07=_0xfd6a07[_0xf3fc73(0x472)](_0x43d54a,(_0x39228f,_0x70168f)=>$gameVariables[_0xf3fc73(0x2f7)](parseInt(_0x70168f)));else{const _0xa77ed=this[_0xf3fc73(0x385)]();return _0x1d6a84[_0xf3fc73(0x408)](this['y'],_0xa77ed);}}return _0xfd6a07;},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x3f7)]=function(_0x51fdd9){const _0x321414=_0x2c0583,_0x430445=/\\SELFVAR\[(\d+)\]/gi;while(_0x51fdd9['match'](_0x430445)){_0x321414(0x2c5)!==_0x321414(0x1e1)?_0x51fdd9=_0x51fdd9[_0x321414(0x472)](_0x430445,(_0x4ec525,_0x586810)=>getSelfVariableValue(this[_0x321414(0x36e)],this['_eventId'],parseInt(_0x586810))):(_0x29921a['registerSelfTarget'](_0x4b7b1d['_selfTargetItemChoice']),_0x28851d[_0x321414(0x568)][_0x321414(0x452)]['call'](this),_0x1ace7c[_0x321414(0x58d)](),_0x3468f8[_0x321414(0x302)]=_0x24fb38);}return _0x51fdd9;},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x543)]=function(_0x4ed0f6,_0x2385f3){const _0x499c6c=_0x2c0583;if(_0x2385f3['match'](/ANIMATION:[ ](\d+)/i))return this[_0x499c6c(0x4f8)](Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/FADE IN:[ ](\d+)/i))return this[_0x499c6c(0x25e)](Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/FADE OUT:[ ](\d+)/i))return this['processMoveRouteFadeOut'](Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x499c6c(0x576)===_0x499c6c(0x576))return this[_0x499c6c(0x60c)]();else this[_0x499c6c(0x29b)]=_0x1ef53a(_0x5bf089['$1']);}if(_0x2385f3[_0x499c6c(0x524)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x499c6c(0x55a)!==_0x499c6c(0x55a)){if([0x2,0x4,0x6,0x8][_0x499c6c(0x454)](_0x5a7f15))return 0x4;if([0x1,0x3,0x7,0x9][_0x499c6c(0x454)](_0x594748))return 0x5;}else return this[_0x499c6c(0x444)]();}if(_0x2385f3[_0x499c6c(0x524)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x499c6c(0x5d4)]();if(_0x2385f3[_0x499c6c(0x524)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x499c6c(0x417)]();if(_0x2385f3[_0x499c6c(0x524)](/HUG:[ ]LEFT/i))return this[_0x499c6c(0x2d6)](_0x499c6c(0x36a));if(_0x2385f3[_0x499c6c(0x524)](/HUG:[ ]RIGHT/i))return this['processMoveRouteHugWall'](_0x499c6c(0x40c));if(_0x2385f3[_0x499c6c(0x524)](/INDEX:[ ](\d+)/i)){if(_0x499c6c(0x288)==='aiBaX')return this[_0x499c6c(0x59e)](Number(RegExp['$1']));else{const _0x2cebb9=this[_0x499c6c(0x416)](_0x4b1d4e,_0x4b2b3e,!![]);if(_0x2cebb9)this[_0x499c6c(0x606)](_0x2cebb9);}}if(_0x2385f3['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0x1d2a9d=this[_0x499c6c(0x345)]+Number(RegExp['$1']);return this[_0x499c6c(0x59e)](_0x1d2a9d);}if(_0x2385f3[_0x499c6c(0x524)](/JUMP FORWARD:[ ](\d+)/i)){if(_0x499c6c(0x4fa)===_0x499c6c(0x4fa))return this[_0x499c6c(0x22a)](Number(RegExp['$1']));else{_0x23f99e[_0x499c6c(0x2f5)](_0x5735f1,_0x378916);const _0x1d8a6a=(_0xc0fc59[_0x499c6c(0x335)]||0x0)-0x1,_0x10ae26=!_0x2c747c[_0x499c6c(0x438)],_0x2a445f=_0x1bb667[_0x499c6c(0x1a5)]()[_0x499c6c(0x26f)](_0x1d8a6a);if(_0x2a445f)_0x2a445f[_0x499c6c(0x3f0)](_0x10ae26);}}if(_0x2385f3[_0x499c6c(0x524)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x499c6c(0x27c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2385f3[_0x499c6c(0x524)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x2d2afa=$gameMap[_0x499c6c(0x254)](Number(RegExp['$1']));return this[_0x499c6c(0x256)](_0x2d2afa);}if(_0x2385f3['match'](/JUMP TO PLAYER/i))return this['processMoveRouteJumpToCharacter']($gamePlayer);if(_0x2385f3[_0x499c6c(0x524)](/JUMP TO HOME/i)&&this[_0x499c6c(0x65a)]){const _0x23facd=this[_0x499c6c(0x549)],_0x24d99a=this[_0x499c6c(0x4b2)];return this[_0x499c6c(0x27c)](_0x23facd,_0x24d99a);}if(_0x2385f3[_0x499c6c(0x524)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x1c3b7f=String(RegExp['$1']),_0x4348ee=this[_0x499c6c(0x552)](_0x2385f3);return this['processMoveRouteMoveUntilStop'](_0x1c3b7f,_0x4348ee);}if(_0x2385f3[_0x499c6c(0x524)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x1273a9=Number(RegExp['$1']),_0x17e171=Number(RegExp['$2']),_0x4324f4=this['checkCollisionKeywords'](_0x2385f3);return this[_0x499c6c(0x54e)](_0x1273a9,_0x17e171,_0x4324f4);}if(_0x2385f3['match'](/MOVE TO EVENT:[ ](\d+)/i)){const _0x5134a8=$gameMap['event'](Number(RegExp['$1'])),_0x3d0a14=this[_0x499c6c(0x552)](_0x2385f3);return this['processMoveRouteMoveToCharacter'](_0x5134a8,_0x3d0a14);}if(_0x2385f3[_0x499c6c(0x524)](/MOVE TO PLAYER/i)){if(_0x499c6c(0x363)!==_0x499c6c(0x363)){const _0x31a39f=_0x4a3873[_0x499c6c(0x465)][_0x2ef782];if(!_0x31a39f)return;_0x31a39f[_0x499c6c(0x5c2)][_0x499c6c(0x30e)](this,_0x47dfae,_0x55f82c,this);}else{const _0x4038f4=this[_0x499c6c(0x552)](_0x2385f3);return this[_0x499c6c(0x287)]($gamePlayer,_0x4038f4);}}if(_0x2385f3[_0x499c6c(0x524)](/MOVE TO HOME/i)&&this[_0x499c6c(0x65a)]){const _0x49e96d=this[_0x499c6c(0x549)],_0x46a185=this[_0x499c6c(0x4b2)],_0x1acd0d=this[_0x499c6c(0x552)](_0x2385f3);return this['processMoveRouteMoveTo'](_0x49e96d,_0x46a185,_0x1acd0d);}if(_0x2385f3[_0x499c6c(0x524)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x499c6c(0x4d0)](0x1,Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/MOVE DOWN:[ ](\d+)/i))return this[_0x499c6c(0x4d0)](0x2,Number(RegExp['$1']));if(_0x2385f3['match'](/MOVE LOWER RIGHT:[ ](\d+)/i))return _0x499c6c(0x523)===_0x499c6c(0x604)?(_0x528133-=0x3e8,this[_0x499c6c(0x376)][_0x96a26e]):this[_0x499c6c(0x4d0)](0x3,Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/MOVE LEFT:[ ](\d+)/i))return this[_0x499c6c(0x4d0)](0x4,Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x499c6c(0x4d0)](0x6,Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x2385f3[_0x499c6c(0x524)](/MOVE UP:[ ](\d+)/i))return this[_0x499c6c(0x4d0)](0x8,Number(RegExp['$1']));if(_0x2385f3['match'](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x499c6c(0x4d0)](0x9,Number(RegExp['$1']));if(_0x2385f3['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x27f09c=Math[_0x499c6c(0x5ce)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x27f09c[_0x499c6c(0x344)](0x0,0xff));}if(_0x2385f3[_0x499c6c(0x524)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if(_0x499c6c(0x2b8)===_0x499c6c(0x2b8)){const _0x32af26=this[_0x499c6c(0x2ba)]+Math[_0x499c6c(0x5ce)](Number(RegExp['$1'])/0x64*0xff);return this[_0x499c6c(0x323)](_0x32af26[_0x499c6c(0x344)](0x0,0xff));}else{const _0x126434=_0x4de71d[_0x499c6c(0x2e5)](this[_0x499c6c(0x3ae)],this[_0x499c6c(0x653)],_0x93688a[_0x499c6c(0x3ae)],_0x14185e[_0x499c6c(0x653)])-0x1,_0x472388=_0x1d7f0d[_0x499c6c(0x665)](_0x4d171e[_0x499c6c(0x40a)](),_0x4b5327[_0x499c6c(0x65f)]()),_0x2993a9=this[_0x499c6c(0x621)]['opacityDelta']||0x0;_0x378faf-=_0x2881cb['max'](0x0,_0x126434)*_0x472388*_0x2993a9;}}if(_0x2385f3[_0x499c6c(0x524)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x40e2a9=this['_opacity']+Number(RegExp['$1']);return this[_0x499c6c(0x323)](_0x40e2a9[_0x499c6c(0x344)](0x0,0xff));}if(_0x2385f3[_0x499c6c(0x524)](/PATTERN LOCK:[ ](\d+)/i)){if(_0x499c6c(0x5f5)===_0x499c6c(0x296)){_0x31fa2b[_0x499c6c(0x568)][_0x499c6c(0x5bb)][_0x499c6c(0x30e)](this,_0x9f615d);if(this[_0x499c6c(0x677)]()&&_0x3df390['includes'](0x0)&&this[_0x499c6c(0x61c)]()===_0x499c6c(0x4a6)){const _0x2375d3=this['direction'](),_0xd7a050=_0x4025e0[_0x499c6c(0x232)](this['x'],_0x2375d3),_0x279728=_0x56b591['roundYWithDirection'](this['y'],_0x2375d3);this[_0x499c6c(0x3d2)](_0xd7a050,_0x279728);}}else return this[_0x499c6c(0x3b7)](Number(RegExp['$1']));}if(_0x2385f3['match'](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x2385f3[_0x499c6c(0x524)](/POSE:[ ](.*)/i)){if('jShGB'!=='MostN'){const _0x5f2b87=String(RegExp['$1'])[_0x499c6c(0x2db)]()[_0x499c6c(0x634)]();return this[_0x499c6c(0x64f)](_0x5f2b87);}else return _0x152eca[_0x499c6c(0x424)](_0x100d77['abs'](this['deltaX'](_0x5c25f8,_0x4c9228)),_0x334fe8[_0x499c6c(0x562)](this[_0x499c6c(0x4cf)](_0x51eb7e,_0x4d14bc)));}if(_0x2385f3['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x41a619=Number(RegExp['$1']),_0x4a617e=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x41a619,_0x4a617e);}if(_0x2385f3[_0x499c6c(0x524)](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0x499c6c(0x506)!==_0x499c6c(0x3f6)){const _0x94c837=$gameMap[_0x499c6c(0x254)](Number(RegExp['$1']));return this[_0x499c6c(0x429)](_0x94c837);}else _0x2c4cf5[_0x499c6c(0x4e0)](_0x4e0c6d[_0x499c6c(0x649)],_0x463e58[_0x499c6c(0x508)]||_0x56fe07['eventId']());}if(_0x2385f3[_0x499c6c(0x524)](/STEP TOWARD PLAYER/i))return this[_0x499c6c(0x429)]($gamePlayer);if(_0x2385f3[_0x499c6c(0x524)](/STEP TOWARD HOME/i)&&this['eventId']){const _0x50dbe8=this['_randomHomeX'],_0x5b3153=this[_0x499c6c(0x4b2)];return this[_0x499c6c(0x4b7)](_0x50dbe8,_0x5b3153);}if(_0x2385f3[_0x499c6c(0x524)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x499c6c(0x3ec)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2385f3[_0x499c6c(0x524)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x2dfe93=$gameMap[_0x499c6c(0x254)](Number(RegExp['$1']));return this[_0x499c6c(0x407)](_0x2dfe93);}if(_0x2385f3[_0x499c6c(0x524)](/STEP AWAY FROM PLAYER/i))return this[_0x499c6c(0x407)]($gamePlayer);if(_0x2385f3[_0x499c6c(0x524)](/STEP AWAY FROM HOME/i)&&this[_0x499c6c(0x65a)]){const _0x15edf1=this[_0x499c6c(0x549)],_0x572e30=this['_randomHomeY'];return this[_0x499c6c(0x3ec)](_0x15edf1,_0x572e30);}if(_0x2385f3[_0x499c6c(0x524)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('EMcyN'===_0x499c6c(0x509))return this[_0x499c6c(0x430)](Number(RegExp['$1']),Number(RegExp['$2']));else{_0x1aa01a[_0x499c6c(0x568)][_0x499c6c(0x63c)][_0x499c6c(0x30e)](this,_0x3f0e4c,_0x5adab4);if(this[_0x499c6c(0x1ba)]())this['setDiagonalDirection'](_0x4d4180,_0x594cd7);}}if(_0x2385f3[_0x499c6c(0x524)](/TURN TO EVENT:[ ](\d+)/i)){const _0x4b1bea=$gameMap[_0x499c6c(0x254)](Number(RegExp['$1']));return this[_0x499c6c(0x514)](_0x4b1bea);}if(_0x2385f3[_0x499c6c(0x524)](/TURN TO PLAYER/i)){if('BqhEd'==='BqhEd')return this['turnTowardCharacter']($gamePlayer);else _0x34bab6['setCommonEvent'](0x0);}if(_0x2385f3[_0x499c6c(0x524)](/TURN TO HOME/i)&&this[_0x499c6c(0x65a)]){const _0x4cbf4c=this['_randomHomeX'],_0xce204b=this[_0x499c6c(0x4b2)];return this[_0x499c6c(0x430)](_0x4cbf4c,_0xce204b);}if(_0x2385f3[_0x499c6c(0x524)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x499c6c(0x564)!==_0x499c6c(0x564)){if(this[_0x499c6c(0x3c6)]===_0x114f25)this[_0x499c6c(0x5b9)]();this[_0x499c6c(0x3c6)]=_0x58b69b;}else return this[_0x499c6c(0x1f2)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x2385f3[_0x499c6c(0x524)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x26f9e8=$gameMap[_0x499c6c(0x254)](Number(RegExp['$1']));return this[_0x499c6c(0x1df)](_0x26f9e8);}if(_0x2385f3[_0x499c6c(0x524)](/TURN AWAY FROM PLAYER/i)){if(_0x499c6c(0x56b)==='HWLYM')return this[_0x499c6c(0x1df)]($gamePlayer);else{if(this[_0x499c6c(0x3af)](this['x'],this['y'],_0x8c674c))_0x3c88e0['push'](_0x387ed1);}}if(_0x2385f3[_0x499c6c(0x524)](/TURN AWAY FROM HOME/i)&&this['eventId']){if(_0x499c6c(0x2cb)===_0x499c6c(0x2cb)){const _0x2765c5=this[_0x499c6c(0x549)],_0x48a04a=this[_0x499c6c(0x4b2)];return this['turnAwayFromPoint'](_0x2765c5,_0x48a04a);}else _0x4acc32[_0x499c6c(0x2f5)](_0x471420,_0xa627fa),_0x1a10d9[_0x499c6c(0x47b)](_0x33d432[_0x499c6c(0x22e)]);}if(_0x2385f3[_0x499c6c(0x524)](/TURN LOWER LEFT/i)){if('VtryI'===_0x499c6c(0x47c))return this[_0x499c6c(0x46a)](0x1);else this['_stepPattern']=_0x2fe1eb(_0x3d9546['$1'])[_0x499c6c(0x2db)]()[_0x499c6c(0x634)]();}if(_0x2385f3[_0x499c6c(0x524)](/TURN LOWER RIGHT/i)){if(_0x499c6c(0x638)!=='qarXR')return this[_0x499c6c(0x46a)](0x3);else{const _0x16ee50=_0x361ba2[_0x499c6c(0x46d)];if(_0x16ee50[_0x499c6c(0x3b3)]&&_0x47c6b7[_0x499c6c(0x61d)](_0x16ee50[_0x499c6c(0x276)]))this[_0x499c6c(0x346)]=!![];else{if(_0x16ee50[_0x499c6c(0x3a3)]&&_0x3813a3['isAdvancedSwitch'](_0x16ee50[_0x499c6c(0x27a)]))this[_0x499c6c(0x346)]=!![];else _0x16ee50['variableValid']&&_0x3602eb[_0x499c6c(0x4ca)](_0x16ee50[_0x499c6c(0x332)])&&(this['_advancedSwitchVariable']=!![]);}}}if(_0x2385f3[_0x499c6c(0x524)](/TURN UPPER LEFT/i))return this[_0x499c6c(0x46a)](0x7);if(_0x2385f3[_0x499c6c(0x524)](/TURN UPPER RIGHT/i))return this[_0x499c6c(0x46a)](0x9);if(_0x2385f3[_0x499c6c(0x524)](/Self Switch[ ](.*):[ ](.*)/i)){if(_0x499c6c(0x66e)===_0x499c6c(0x66e))return this[_0x499c6c(0x555)](RegExp['$1'],RegExp['$2']);else this[_0x499c6c(0x661)]=![];}if(_0x2385f3[_0x499c6c(0x524)](/Self Variable[ ](.*):[ ](.*)/i)){if(_0x499c6c(0x1c5)!=='QqiNS')return this[_0x499c6c(0x234)](RegExp['$1'],RegExp['$2']);else _0x1343b1=![];}if(_0x2385f3['match'](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x499c6c(0x43c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2385f3['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){if('DjsAa'!==_0x499c6c(0x5aa)){const _0x388b63=$gameMap[_0x499c6c(0x254)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x388b63);}else return![];}if(_0x2385f3['match'](/TELEPORT TO PLAYER/i))return this['processMoveRouteTeleportToCharacter']($gamePlayer);if(_0x2385f3[_0x499c6c(0x524)](/TELEPORT TO HOME/i)&&this[_0x499c6c(0x65a)]){const _0x4ac5f9=this[_0x499c6c(0x549)],_0x10249c=this[_0x499c6c(0x4b2)];return this[_0x499c6c(0x43c)](_0x4ac5f9,_0x10249c);}try{VisuMZ[_0x499c6c(0x568)]['Game_Character_processMoveCommand'][_0x499c6c(0x30e)](this,_0x4ed0f6);}catch(_0x49c3ca){if(_0x499c6c(0x5c0)!==_0x499c6c(0x5c0)){if(this['_EventsMoveCoreSettings']===_0x34a027)this[_0x499c6c(0x5b9)]();if(this['_EventsMoveCoreSettings'][_0x499c6c(0x2a0)]===_0x13eddf)this['initEventsMoveCore']();this[_0x499c6c(0x2fa)][_0x499c6c(0x2a0)]=_0x407af5;}else{if($gameTemp['isPlaytest']())console['log'](_0x49c3ca);}}},Game_Character['prototype'][_0x2c0583(0x4f8)]=function(_0x53d1fa){const _0x4b549b=_0x2c0583;$gameTemp[_0x4b549b(0x505)]([this],_0x53d1fa);},Game_Character['prototype'][_0x2c0583(0x36d)]=function(_0x3d4bec){const _0x450880=_0x2c0583;let _0x32876a=0x0;switch(_0x3d4bec[_0x450880(0x2db)]()[_0x450880(0x634)]()){case'!':case'EXCLAMATION':_0x32876a=0x1;break;case'?':case'QUESTION':_0x32876a=0x2;break;case'MUSIC':case _0x450880(0x378):case _0x450880(0x409):case _0x450880(0x274):case'MUSICNOTE':_0x32876a=0x3;break;case _0x450880(0x2e8):case _0x450880(0x5fc):_0x32876a=0x4;break;case _0x450880(0x2a5):_0x32876a=0x5;break;case'SWEAT':_0x32876a=0x6;break;case _0x450880(0x4dd):case _0x450880(0x59f):case _0x450880(0x547):_0x32876a=0x7;break;case _0x450880(0x3de):case _0x450880(0x5c5):_0x32876a=0x8;break;case'LIGHT':case _0x450880(0x5be):case _0x450880(0x24b):case _0x450880(0x3ea):case _0x450880(0x608):_0x32876a=0x9;break;case'Z':case'ZZ':case _0x450880(0x51f):case _0x450880(0x2c6):_0x32876a=0xa;break;case _0x450880(0x4ae):_0x32876a=0xb;break;case _0x450880(0x3bf):_0x32876a=0xc;break;case _0x450880(0x440):_0x32876a=0xd;break;case _0x450880(0x427):_0x32876a=0xe;break;case'USER-DEFINED\x205':_0x32876a=0xf;break;}$gameTemp[_0x450880(0x62c)](this,_0x32876a);},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteFadeIn']=function(_0x4ef36f){const _0x496e49=_0x2c0583;_0x4ef36f+=this[_0x496e49(0x2ba)],this[_0x496e49(0x323)](_0x4ef36f[_0x496e49(0x344)](0x0,0xff));if(this[_0x496e49(0x2ba)]<0xff)this[_0x496e49(0x587)]--;},Game_Character['prototype'][_0x2c0583(0x5e5)]=function(_0x3fd4e9){const _0x23577a=_0x2c0583;_0x3fd4e9=this[_0x23577a(0x2ba)]-_0x3fd4e9,this[_0x23577a(0x323)](_0x3fd4e9[_0x23577a(0x344)](0x0,0xff));if(this['_opacity']>0x0)this[_0x23577a(0x587)]--;},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteHugWall']=function(_0x19e0b3){const _0x368053=_0x2c0583,_0x1bc71e=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x330b79=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x4f92ba=this['direction'](),_0xcbd159=(_0x19e0b3===_0x368053(0x36a)?_0x1bc71e:_0x330b79)[_0x4f92ba],_0x4ce85f=(_0x19e0b3==='left'?_0x330b79:_0x1bc71e)[_0x4f92ba];if(this[_0x368053(0x3af)](this['x'],this['y'],_0xcbd159)){if('TIOqe'===_0x368053(0x48a))_0x19e0b3==='left'?this['turnLeft90']():this[_0x368053(0x5c4)]();else return this[_0x368053(0x3c1)](_0x52a92a);}else{if(!this['canPass'](this['x'],this['y'],this[_0x368053(0x385)]())){if(this[_0x368053(0x3af)](this['x'],this['y'],_0x4ce85f))_0x19e0b3===_0x368053(0x36a)?this[_0x368053(0x5c4)]():this['turnLeft90']();else{if('WufIl'==='WEVYI')return this[_0x368053(0x4d0)](0x2,_0x211d1c(_0x2b9ed2['$1']));else this[_0x368053(0x308)]();}}}this['canPass'](this['x'],this['y'],this['direction']())&&this['moveForward']();},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x59e)]=function(_0x5eb870){const _0x1857e6=_0x2c0583;if(ImageManager[_0x1857e6(0x556)](this[_0x1857e6(0x437)]))return;_0x5eb870=_0x5eb870['clamp'](0x0,0x7),this['setImage'](this[_0x1857e6(0x437)],_0x5eb870);},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteJumpForward']=function(_0x372dd1){const _0x37a068=_0x2c0583;switch(this['direction']()){case 0x1:this[_0x37a068(0x292)](-_0x372dd1,_0x372dd1);break;case 0x2:this[_0x37a068(0x292)](0x0,_0x372dd1);break;case 0x3:this[_0x37a068(0x292)](_0x372dd1,_0x372dd1);break;case 0x4:this['jump'](-_0x372dd1,0x0);break;case 0x6:this[_0x37a068(0x292)](_0x372dd1,0x0);break;case 0x7:this['jump'](-_0x372dd1,-_0x372dd1);break;case 0x8:this[_0x37a068(0x292)](0x0,-_0x372dd1);break;case 0x9:this[_0x37a068(0x292)](_0x372dd1,-_0x372dd1);break;}},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x27c)]=function(_0x944282,_0x1bf130){const _0x27013a=_0x2c0583,_0x3cd9a3=Math[_0x27013a(0x5ce)](_0x944282-this['x']),_0x365fb0=Math['round'](_0x1bf130-this['y']);this[_0x27013a(0x292)](_0x3cd9a3,_0x365fb0);},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteJumpToCharacter']=function(_0x527999){const _0x344434=_0x2c0583;if(_0x527999)this[_0x344434(0x27c)](_0x527999['x'],_0x527999['y']);},Game_Character['prototype'][_0x2c0583(0x4b7)]=function(_0x5260e4,_0x405cf4,_0x939246){const _0x4ed5e1=_0x2c0583;let _0x2bef4e=0x0;if(_0x939246)$gameTemp[_0x4ed5e1(0x1dc)]=!![];if($gameMap[_0x4ed5e1(0x459)]()){if(_0x4ed5e1(0x360)!==_0x4ed5e1(0x360))return this['forceDashing']();else _0x2bef4e=this['findDiagonalDirectionTo'](_0x5260e4,_0x405cf4);}else _0x2bef4e=this[_0x4ed5e1(0x336)](_0x5260e4,_0x405cf4);if(_0x939246)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x4ed5e1(0x606)](_0x2bef4e),this[_0x4ed5e1(0x414)](!![]);},Game_Character['prototype'][_0x2c0583(0x429)]=function(_0xfdc6ce){const _0x1de26b=_0x2c0583;if(_0xfdc6ce)this[_0x1de26b(0x4b7)](_0xfdc6ce['x'],_0xfdc6ce['y']);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x55c)]=function(_0x1ed701,_0x4341b5){const _0x183770=_0x2c0583,_0x9af657=this[_0x183770(0x627)](_0x1ed701),_0x55f21d=this[_0x183770(0x219)](_0x4341b5);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x552)]=function(_0x1baada){const _0xc835b1=_0x2c0583;if(_0x1baada[_0xc835b1(0x524)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x1baada[_0xc835b1(0x524)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ['EventsMoveCore'][_0x2c0583(0x675)]=Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x1a7)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x1a7)]=function(_0x4ed4d7,_0x3f1b41){const _0x76c679=_0x2c0583;if($gameTemp[_0x76c679(0x1dc)])return![];return VisuMZ[_0x76c679(0x568)][_0x76c679(0x675)][_0x76c679(0x30e)](this,_0x4ed4d7,_0x3f1b41);},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteMoveUntilStop']=function(_0x1a3b10,_0x5dedb8){const _0xa2594d=_0x2c0583,_0x128e5e=['',_0xa2594d(0x218),'DOWN',_0xa2594d(0x413),_0xa2594d(0x4da),'',_0xa2594d(0x1fc),'UPPER\x20LEFT','UP',_0xa2594d(0x337)],_0x1068c6=_0x128e5e[_0xa2594d(0x1ac)](_0x1a3b10[_0xa2594d(0x2db)]()[_0xa2594d(0x634)]());if(_0x1068c6<=0x0)return;if(_0x5dedb8)$gameTemp[_0xa2594d(0x1dc)]=!![];if(this[_0xa2594d(0x3af)](this['x'],this['y'],_0x1068c6)){if(_0x5dedb8)$gameTemp[_0xa2594d(0x1dc)]=![];this[_0xa2594d(0x606)](_0x1068c6),this[_0xa2594d(0x587)]-=0x1;}if(_0x5dedb8)$gameTemp[_0xa2594d(0x1dc)]=![];},Game_Character['prototype'][_0x2c0583(0x54e)]=function(_0x7c5889,_0x4f1892,_0x52a18a){const _0xdb9431=_0x2c0583;this[_0xdb9431(0x4b7)](_0x7c5889,_0x4f1892,_0x52a18a);if(this['x']!==_0x7c5889||this['y']!==_0x4f1892)this[_0xdb9431(0x587)]--;},Game_Character['prototype'][_0x2c0583(0x287)]=function(_0x568086,_0x238cbf){const _0x3c8020=_0x2c0583;if(_0x568086)this[_0x3c8020(0x54e)](_0x568086['x'],_0x568086['y'],_0x238cbf);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x4d0)]=function(_0x24c3f1,_0x378be7){const _0x3322e4=_0x2c0583;_0x378be7=_0x378be7||0x0;const _0x291db4={'code':0x1,'indent':null,'parameters':[]};_0x291db4[_0x3322e4(0x489)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x24c3f1],this[_0x3322e4(0x367)][_0x3322e4(0x4f2)][this[_0x3322e4(0x587)]][_0x3322e4(0x39f)][0x0]='';while(_0x378be7--){if('ESgkH'!=='ESgkH'){_0x4286c4[_0x3322e4(0x568)][_0x3322e4(0x550)]['call'](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x3322e4(0x31b)]();if(_0x36fbda['EventsMoveCore'][_0x3322e4(0x1b2)])_0x5c4196[_0x3322e4(0x568)][_0x3322e4(0x1b2)][_0x3322e4(0x542)]();}else this[_0x3322e4(0x367)][_0x3322e4(0x4f2)][_0x3322e4(0x23a)](this[_0x3322e4(0x587)]+0x1,0x0,_0x291db4);}},Game_Character[_0x2c0583(0x4ff)]['processMoveRoutePatternLock']=function(_0x494e33){const _0x44c756=_0x2c0583;this[_0x44c756(0x4f7)]=!![],this[_0x44c756(0x507)](_0x494e33);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x555)]=function(_0x220af4,_0x297220){const _0x52509c=_0x2c0583;if(this===$gamePlayer)return;const _0x4ee020=[this[_0x52509c(0x36e)],this['_eventId'],'A'];if(_0x220af4['match'](/\b[ABCD]\b/i)){if(_0x52509c(0x368)==='LGYRX')_0x4ee020[0x2]=String(_0x220af4)[_0x52509c(0x26d)](0x0)['toUpperCase']()[_0x52509c(0x634)]();else{_0x280de9['_spawnData']=_0x5730f1;const _0x4297d3=new _0x48e30d(_0x2d9105[_0x52509c(0x42b)],_0x1f5e2e[_0x52509c(0x65a)]);_0x32683a[_0x52509c(0x421)]=_0x4d3506,this['_spawnedEvents'][_0x52509c(0x2a8)](_0x4297d3),_0x4297d3[_0x52509c(0x5a0)](_0x288dfc),this[_0x52509c(0x34b)]();}}else _0x4ee020[0x2]='Self\x20Switch\x20%1'['format'](_0x220af4);switch(_0x297220['toUpperCase']()[_0x52509c(0x634)]()){case'ON':case _0x52509c(0x245):$gameSelfSwitches[_0x52509c(0x529)](_0x4ee020,!![]);break;case _0x52509c(0x52e):case _0x52509c(0x51c):$gameSelfSwitches[_0x52509c(0x529)](_0x4ee020,![]);break;case _0x52509c(0x5b4):$gameSelfSwitches[_0x52509c(0x529)](_0x4ee020,!$gameSelfSwitches[_0x52509c(0x2f7)](_0x4ee020));break;}},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteSelfVariable']=function(_0x5cd1d2,_0x48917e){const _0x89b3f6=_0x2c0583;if(this===$gamePlayer)return;const _0x16248e=[this[_0x89b3f6(0x36e)],this['_eventId'],_0x89b3f6(0x618)['format'](_0x5cd1d2)];$gameSelfSwitches[_0x89b3f6(0x529)](_0x16248e,Number(_0x48917e));},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteTeleportTo']=function(_0x24d795,_0x589075){const _0x59b193=_0x2c0583;this[_0x59b193(0x4e1)](_0x24d795,_0x589075);},Game_Character[_0x2c0583(0x4ff)]['processMoveRouteTeleportToCharacter']=function(_0x413fa2){if(_0x413fa2)this['processMoveRouteTeleportTo'](_0x413fa2['x'],_0x413fa2['y']);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x5c4)]=function(){const _0xfee0ab=_0x2c0583;switch(this[_0xfee0ab(0x385)]()){case 0x1:this['setDirection'](0x7);break;case 0x2:this[_0xfee0ab(0x46a)](0x4);break;case 0x3:this[_0xfee0ab(0x46a)](0x1);break;case 0x4:this[_0xfee0ab(0x46a)](0x8);break;case 0x6:this['setDirection'](0x2);break;case 0x7:this[_0xfee0ab(0x46a)](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this[_0xfee0ab(0x46a)](0x3);break;}},Game_Character['prototype']['turnLeft90']=function(){const _0x217a56=_0x2c0583;switch(this['direction']()){case 0x1:this[_0x217a56(0x46a)](0x3);break;case 0x2:this[_0x217a56(0x46a)](0x6);break;case 0x3:this[_0x217a56(0x46a)](0x9);break;case 0x4:this[_0x217a56(0x46a)](0x2);break;case 0x6:this[_0x217a56(0x46a)](0x8);break;case 0x7:this[_0x217a56(0x46a)](0x1);break;case 0x8:this[_0x217a56(0x46a)](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x2c0583(0x4ff)]['getDirectionToPoint']=function(_0x403d51,_0x1a15b0,_0x3991a6){const _0x50ec05=_0x2c0583,_0x2664da=this[_0x50ec05(0x627)](_0x403d51),_0xef3031=this[_0x50ec05(0x219)](_0x1a15b0);if($gameMap['isSupportDiagonalMovement']()){if(_0x50ec05(0x633)!==_0x50ec05(0x237)){if(_0x3991a6||this['isSpriteVS8dir']()){if(_0x2664da>0x0&&_0xef3031<0x0)return 0x1;if(_0x2664da<0x0&&_0xef3031<0x0)return 0x3;if(_0x2664da>0x0&&_0xef3031>0x0)return 0x7;if(_0x2664da<0x0&&_0xef3031>0x0)return 0x9;}}else{const _0x397cec=this[_0x50ec05(0x627)](_0x442602),_0x296151=this[_0x50ec05(0x219)](_0x4a07bc);}}if(Math[_0x50ec05(0x562)](_0x2664da)>Math['abs'](_0xef3031))return _0x2664da>0x0?0x4:0x6;else{if(_0xef3031!==0x0)return _0xef3031>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x416)]=function(_0x48a61e,_0x2da98e,_0xd65a8f){const _0x45b68a=_0x2c0583,_0x5d3f7c=this[_0x45b68a(0x627)](_0x48a61e),_0x2bc695=this[_0x45b68a(0x219)](_0x2da98e);if($gameMap[_0x45b68a(0x459)]()){if(_0xd65a8f||this['isSpriteVS8dir']()){if(_0x45b68a(0x498)===_0x45b68a(0x4b9)){if(!_0x48a7f3&&_0x2ca1ce[_0x45b68a(0x1c9)]())return![];if(!_0x27192e&&_0x22c19e[_0x45b68a(0x4b0)]())return![];if([_0x45b68a(0x32d),_0x45b68a(0x260)][_0x45b68a(0x454)](this[_0x45b68a(0x3e6)]()))return!![];return _0x3a80e8['meetActivationProximityConditions'](this);}else{if(_0x5d3f7c>0x0&&_0x2bc695<0x0)return 0x9;if(_0x5d3f7c<0x0&&_0x2bc695<0x0)return 0x7;if(_0x5d3f7c>0x0&&_0x2bc695>0x0)return 0x3;if(_0x5d3f7c<0x0&&_0x2bc695>0x0)return 0x1;}}}if(Math['abs'](_0x5d3f7c)>Math['abs'](_0x2bc695))return _0x5d3f7c>0x0?0x6:0x4;else{if(_0x2bc695!==0x0)return _0x2bc695>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x2c0583(0x4ff)]['moveTowardPoint']=function(_0x1a6bcf,_0x5367e0){const _0x31fb79=_0x2c0583,_0xa8d943=this[_0x31fb79(0x619)](_0x1a6bcf,_0x5367e0,!![]);if(_0xa8d943)this[_0x31fb79(0x606)](_0xa8d943);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x3ec)]=function(_0xdefe85,_0x3058c4){const _0x37ba21=_0x2c0583,_0x2cd705=this[_0x37ba21(0x416)](_0xdefe85,_0x3058c4,!![]);if(_0x2cd705)this['executeMoveDir8'](_0x2cd705);},Game_Character[_0x2c0583(0x4ff)]['turnTowardPoint']=function(_0x2a4b34,_0x343d01){const _0x1705aa=_0x2c0583,_0x1a7f61=this[_0x1705aa(0x619)](_0x2a4b34,_0x343d01,![]);if(_0x1a7f61)this[_0x1705aa(0x46a)](_0x1a7f61);},Game_Character['prototype']['turnAwayFromPoint']=function(_0x264293,_0x50971a){const _0x583485=_0x2c0583,_0x5e104f=this[_0x583485(0x416)](_0x264293,_0x50971a,![]);if(_0x5e104f)this[_0x583485(0x46a)](_0x5e104f);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x1f1)]=function(_0x3bdc4a){const _0x4919d0=_0x2c0583;if(_0x3bdc4a)this[_0x4919d0(0x430)](_0x3bdc4a['x'],_0x3bdc4a['y']);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x407)]=function(_0x585849){if(_0x585849)this['moveAwayFromPoint'](_0x585849['x'],_0x585849['y']);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x514)]=function(_0x326e8d){if(_0x326e8d)this['turnTowardPoint'](_0x326e8d['x'],_0x326e8d['y']);},Game_Character[_0x2c0583(0x4ff)][_0x2c0583(0x1df)]=function(_0x4ed6d3){if(_0x4ed6d3)this['turnAwayFromPoint'](_0x4ed6d3['x'],_0x4ed6d3['y']);},VisuMZ['EventsMoveCore'][_0x2c0583(0x207)]=Game_Player['prototype'][_0x2c0583(0x1a0)],Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x1a0)]=function(){const _0x2e2489=_0x2c0583;if(this['_forceDashing'])return!![];return VisuMZ[_0x2e2489(0x568)]['Game_Player_isDashing'][_0x2e2489(0x30e)](this);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x458)]=Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x24c)],Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x24c)]=function(){const _0xa13126=_0x2c0583;if($gameMap[_0xa13126(0x459)]()){if(_0xa13126(0x366)===_0xa13126(0x519))this['setDirection'](_0x85290);else return this[_0xa13126(0x1c0)]();}else{if('EMpos'!==_0xa13126(0x2a7)){const _0x4ec465=_0x1118ef[_0xa13126(0x3e2)](this);if(!_0x4ec465)return;this[_0xa13126(0x4e1)](_0x4ec465['x'],_0x4ec465['y']),this[_0xa13126(0x46a)](_0x4ec465['direction']),this[_0xa13126(0x4be)]===_0x4ec465['pageIndex']&&(this[_0xa13126(0x587)]=_0x4ec465[_0xa13126(0x517)]);}else return VisuMZ['EventsMoveCore']['Game_Player_getInputDirection'][_0xa13126(0x30e)](this);}},Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x1c0)]=function(){const _0x5e79b6=_0x2c0583;return Input[_0x5e79b6(0x445)];},Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x45c)]=function(){const _0x51e91c=_0x2c0583;if($gameSystem[_0x51e91c(0x39a)]())return 0x0;if(!this[_0x51e91c(0x351)]()&&this[_0x51e91c(0x43f)]()){let _0x3a361e=this[_0x51e91c(0x24c)]();if(_0x3a361e>0x0){if(_0x51e91c(0x486)===_0x51e91c(0x600)){const _0x22e807=_0x1c494f[_0x51e91c(0x4f6)],_0x3501c7=_0x35990d[_0x51e91c(0x31f)],_0x3305a3=_0x3b4581%0x10*_0x22e807,_0x37b5fa=_0xcfd421['floor'](_0x781102/0x10)*_0x3501c7;_0x1ef14b[_0x51e91c(0x1ab)](_0x3305a3,_0x37b5fa,_0x22e807,_0x3501c7),this[_0x51e91c(0x3aa)]=!![];}else $gameTemp['clearDestination']();}else{if($gameTemp[_0x51e91c(0x375)]()){if('Dmkps'===_0x51e91c(0x647))_0x245fc0['reserveCommonEvent'](_0x8bb945[_0x55474f]);else{const _0x4a68df=$gameTemp[_0x51e91c(0x21c)](),_0x22dbe5=$gameTemp[_0x51e91c(0x340)](),_0x3f223e=$gameMap[_0x51e91c(0x459)](),_0x120bf5=$gameMap[_0x51e91c(0x3e8)](_0x4a68df,_0x22dbe5),_0x51f5b7=$gameMap[_0x51e91c(0x23c)](_0x4a68df,_0x22dbe5)[_0x51e91c(0x19e)]<=0x0;if(_0x3f223e&&_0x120bf5&&_0x51f5b7){if(_0x51e91c(0x599)!=='IBdcg')return 0x4;else _0x3a361e=this[_0x51e91c(0x566)](_0x4a68df,_0x22dbe5);}else _0x3a361e=this[_0x51e91c(0x336)](_0x4a68df,_0x22dbe5);}}}if(_0x3a361e>0x0)'DQhPQ'!==_0x51e91c(0x553)?(this[_0x51e91c(0x285)]=this[_0x51e91c(0x285)]||0x0,this[_0x51e91c(0x402)]()?this[_0x51e91c(0x46a)](_0x3a361e):this['executeMove'](_0x3a361e),this[_0x51e91c(0x285)]++):this['_forceCarrying']=!![];else{if(_0x51e91c(0x525)===_0x51e91c(0x525))this[_0x51e91c(0x285)]=0x0;else return this[_0x51e91c(0x4f7)]=![];}}},Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x402)]=function(){const _0x1b17bd=_0x2c0583,_0x4145a6=VisuMZ[_0x1b17bd(0x568)][_0x1b17bd(0x4d1)][_0x1b17bd(0x1b9)];if(!_0x4145a6['EnableTurnInPlace'])return![];if($gameTemp[_0x1b17bd(0x375)]())return![];if(this[_0x1b17bd(0x1a0)]()||this[_0x1b17bd(0x351)]()||this[_0x1b17bd(0x1b6)]())return![];return this[_0x1b17bd(0x285)]<_0x4145a6['TurnInPlaceDelay'];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x20d)]=Game_Player[_0x2c0583(0x4ff)]['executeMove'],Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x629)]=function(_0x15d90b){const _0x1f2430=_0x2c0583;$gameMap[_0x1f2430(0x459)]()?this[_0x1f2430(0x606)](_0x15d90b):VisuMZ[_0x1f2430(0x568)][_0x1f2430(0x20d)]['call'](this,_0x15d90b);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x2e9)]=Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x2ae)],Game_Player['prototype'][_0x2c0583(0x2ae)]=function(_0x4c8980,_0x226d43,_0x3fa49b){const _0x168d16=_0x2c0583;if($gameMap[_0x168d16(0x2f0)](_0x4c8980,_0x226d43,_0x3fa49b,_0x168d16(0x397))){if(this[_0x168d16(0x583)]()&&this[_0x168d16(0x443)]()){if(_0x168d16(0x546)!=='xgSqU'){const _0x3c1811=_0xb42651['_spawnData'][_0x168d16(0x42b)],_0x156586=_0x5ebb7e[_0x168d16(0x421)][_0x168d16(0x65a)];return _0x15025d[_0x168d16(0x379)](_0x3c1811,_0x156586);}else return this['vehicle']()['isMapPassable'](_0x4c8980,_0x226d43,_0x3fa49b);}else{if(_0x168d16(0x42d)===_0x168d16(0x3ca))this[_0x168d16(0x4ef)][_0x168d16(0x4ed)]=this[_0x168d16(0x4ef)][_0x168d16(0x4ed)][_0x168d16(0x472)](/\\V\[(\d+)\]/gi,(_0x39e4fc,_0x3b8f1e)=>_0x5d53a0[_0x168d16(0x2f7)](_0x432ac8(_0x3b8f1e)));else return!![];}}if($gameMap[_0x168d16(0x257)](_0x4c8980,_0x226d43,_0x3fa49b,_0x168d16(0x397)))return![];return VisuMZ[_0x168d16(0x568)][_0x168d16(0x2e9)][_0x168d16(0x30e)](this,_0x4c8980,_0x226d43,_0x3fa49b);},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere']=Game_Player['prototype'][_0x2c0583(0x393)],Game_Player['prototype'][_0x2c0583(0x393)]=function(_0x3ce437){const _0x1500f9=_0x2c0583;VisuMZ[_0x1500f9(0x568)][_0x1500f9(0x2be)][_0x1500f9(0x30e)](this,_0x3ce437);if(this[_0x1500f9(0x677)]()){this[_0x1500f9(0x473)](_0x3ce437);if(_0x3ce437[_0x1500f9(0x454)](0x0)&&this[_0x1500f9(0x61c)]()===_0x1500f9(0x536)){if(_0x1500f9(0x667)!==_0x1500f9(0x667))return this[_0x1500f9(0x1e7)];else this[_0x1500f9(0x3d2)](this['x'],this['y']);}else{if(_0x3ce437[_0x1500f9(0x454)](0x1)||_0x3ce437[_0x1500f9(0x454)](0x2)){if(_0x1500f9(0x4c6)!==_0x1500f9(0x195))this[_0x1500f9(0x575)]();else{const _0xd79fd0=this[_0x1500f9(0x552)](_0x2e1ddf);return this['processMoveRouteMoveToCharacter'](_0x35ee28,_0xd79fd0);}}}}},VisuMZ['EventsMoveCore'][_0x2c0583(0x5bb)]=Game_Player['prototype']['checkEventTriggerThere'],Game_Player[_0x2c0583(0x4ff)]['checkEventTriggerThere']=function(_0x4493d2){const _0x45e513=_0x2c0583;VisuMZ[_0x45e513(0x568)][_0x45e513(0x5bb)][_0x45e513(0x30e)](this,_0x4493d2);if(this['canStartLocalEvents']()&&_0x4493d2[_0x45e513(0x454)](0x0)&&this[_0x45e513(0x61c)]()===_0x45e513(0x4a6)){if(_0x45e513(0x21a)!==_0x45e513(0x21a))this[_0x45e513(0x41a)]=![];else{const _0x2636b0=this[_0x45e513(0x385)](),_0x560121=$gameMap[_0x45e513(0x232)](this['x'],_0x2636b0),_0x5b3f66=$gameMap[_0x45e513(0x408)](this['y'],_0x2636b0);this[_0x45e513(0x3d2)](_0x560121,_0x5b3f66);}}},Game_Player['prototype']['checkEventTriggerEventsMoveCore']=function(_0x3a5645){const _0x11912d=_0x2c0583;if($gameMap[_0x11912d(0x1c9)]())return;if($gameMap[_0x11912d(0x4b0)]())return;const _0xb6f697=$gameMap[_0x11912d(0x631)]();for(const _0x1940ff of _0xb6f697){if(!_0x1940ff)continue;if(!_0x1940ff[_0x11912d(0x2b1)](_0x3a5645))continue;if(this[_0x11912d(0x342)](_0x1940ff))return _0x1940ff['start']();if(this['meetActivationProximityConditions'](_0x1940ff))return _0x1940ff[_0x11912d(0x225)]();}},Game_Player['prototype']['meetActivationRegionConditions']=function(_0x19e241){const _0xe31756=_0x2c0583;if($gameMap[_0xe31756(0x1c9)]())return![];if($gameMap['isAnyEventStarting']())return![];return _0x19e241['activationRegionList']()[_0xe31756(0x454)](this[_0xe31756(0x2ce)]());},Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x2d0)]=function(_0xd03d8f){const _0x3f14bc=_0x2c0583;if($gameMap[_0x3f14bc(0x1c9)]())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x3f14bc(0x32d),_0x3f14bc(0x260)][_0x3f14bc(0x454)](_0xd03d8f[_0x3f14bc(0x3e6)]()))return![];const _0x4ac04f=_0xd03d8f[_0x3f14bc(0x3e6)](),_0x4627bb=_0xd03d8f[_0x3f14bc(0x3e4)]();switch(_0x4ac04f){case _0x3f14bc(0x1f8):const _0x2cedcc=$gameMap['distance'](this['x'],this['y'],_0xd03d8f['x'],_0xd03d8f['y']);return _0xd03d8f[_0x3f14bc(0x3e4)]()>=_0x2cedcc;break;case _0x3f14bc(0x2de):return _0x4627bb>=Math[_0x3f14bc(0x562)](_0xd03d8f['deltaXFrom'](this['x']))&&_0x4627bb>=Math[_0x3f14bc(0x562)](_0xd03d8f['deltaYFrom'](this['y']));break;case _0x3f14bc(0x209):return _0x4627bb>=Math['abs'](_0xd03d8f[_0x3f14bc(0x219)](this['y']));break;case'column':return _0x4627bb>=Math[_0x3f14bc(0x562)](_0xd03d8f[_0x3f14bc(0x627)](this['x']));break;case'default':return![];break;}},Game_Player[_0x2c0583(0x4ff)]['startMapCommonEventOnOK']=function(_0x288807,_0x2043ea){const _0x291a6b=_0x2c0583;if($gameMap['isEventRunning']())return;if($gameMap[_0x291a6b(0x4b0)]())return;let _0x261274=VisuMZ[_0x291a6b(0x568)][_0x291a6b(0x4d1)][_0x291a6b(0x32f)],_0x3baca5=$gameMap[_0x291a6b(0x2ce)](_0x288807,_0x2043ea);const _0x116f1d=_0x291a6b(0x49a)[_0x291a6b(0x2d3)](_0x3baca5);_0x261274[_0x116f1d]&&$gameTemp['reserveCommonEvent'](_0x261274[_0x116f1d]);},Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x61c)]=function(){const _0x1cd363=_0x2c0583;return VisuMZ[_0x1cd363(0x568)]['Settings'][_0x1cd363(0x44a)];},Game_Player[_0x2c0583(0x4ff)]['startMapCommonEventOnTouch']=function(){const _0x4827d6=_0x2c0583;if($gameMap[_0x4827d6(0x1c9)]())return;if($gameMap[_0x4827d6(0x4b0)]())return;let _0x1f8e93=VisuMZ[_0x4827d6(0x568)][_0x4827d6(0x4d1)][_0x4827d6(0x3c8)];const _0x1dd9f4='Region%1'[_0x4827d6(0x2d3)](this[_0x4827d6(0x2ce)]());_0x1f8e93[_0x1dd9f4]&&$gameTemp[_0x4827d6(0x4e2)](_0x1f8e93[_0x1dd9f4]);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x496)]=Game_Player[_0x2c0583(0x4ff)][_0x2c0583(0x58f)],Game_Player[_0x2c0583(0x4ff)]['increaseSteps']=function(){const _0x469b99=_0x2c0583;VisuMZ[_0x469b99(0x568)]['Game_Player_increaseSteps'][_0x469b99(0x30e)](this),VisuMZ[_0x469b99(0x492)](0x0);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x3c3)]=Game_Follower[_0x2c0583(0x4ff)]['initialize'],Game_Follower[_0x2c0583(0x4ff)][_0x2c0583(0x542)]=function(_0x1171a9){const _0x3bae74=_0x2c0583;VisuMZ[_0x3bae74(0x568)][_0x3bae74(0x3c3)][_0x3bae74(0x30e)](this,_0x1171a9),this[_0x3bae74(0x196)]=![];},Game_Follower[_0x2c0583(0x4ff)][_0x2c0583(0x1a0)]=function(){const _0x4b5438=_0x2c0583;return $gamePlayer[_0x4b5438(0x1a0)]();},Game_Follower[_0x2c0583(0x4ff)][_0x2c0583(0x49c)]=function(){const _0x4be25c=_0x2c0583;return $gamePlayer[_0x4be25c(0x49c)]();},Game_Follower['prototype']['realMoveSpeed']=function(){const _0x4c15b8=_0x2c0583;return $gamePlayer[_0x4c15b8(0x63f)]();},Game_Follower[_0x2c0583(0x4ff)][_0x2c0583(0x3f0)]=function(_0x5b4284){this['_chaseOff']=_0x5b4284;},VisuMZ[_0x2c0583(0x568)]['Game_Follower_chaseCharacter']=Game_Follower['prototype'][_0x2c0583(0x58e)],Game_Follower[_0x2c0583(0x4ff)]['chaseCharacter']=function(_0x371639){const _0x50901a=_0x2c0583;if(this['_chaseOff'])return;if($gameSystem[_0x50901a(0x388)]())return;VisuMZ['EventsMoveCore'][_0x50901a(0x1ae)]['call'](this,_0x371639);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x1e8)]=Game_Vehicle[_0x2c0583(0x4ff)][_0x2c0583(0x2ae)],Game_Vehicle[_0x2c0583(0x4ff)]['isMapPassable']=function(_0x3f9175,_0x127af8,_0x55b0bd){const _0x207158=_0x2c0583;if($gameMap[_0x207158(0x2f0)](_0x3f9175,_0x127af8,_0x55b0bd,this[_0x207158(0x42f)]))return!![];if($gameMap[_0x207158(0x257)](_0x3f9175,_0x127af8,_0x55b0bd,this[_0x207158(0x42f)]))return![];return VisuMZ[_0x207158(0x568)]['Game_Vehicle_isMapPassable']['call'](this,_0x3f9175,_0x127af8,_0x55b0bd);},Game_Vehicle['prototype'][_0x2c0583(0x3ef)]=function(_0xafa08e,_0x33eef9,_0x185f44){const _0x214a95=_0x2c0583;if($gameMap[_0x214a95(0x2f0)](_0xafa08e,_0x33eef9,_0x185f44,this[_0x214a95(0x42f)]))return!![];if($gameMap[_0x214a95(0x257)](_0xafa08e,_0x33eef9,_0x185f44,this[_0x214a95(0x42f)]))return![];return VisuMZ[_0x214a95(0x568)]['Game_CharacterBase_canPass']['call']($gamePlayer,_0xafa08e,_0x33eef9,_0x185f44);},VisuMZ[_0x2c0583(0x568)]['Game_Vehicle_isLandOk']=Game_Vehicle[_0x2c0583(0x4ff)][_0x2c0583(0x624)],Game_Vehicle[_0x2c0583(0x4ff)]['isLandOk']=function(_0x5207c9,_0xc4803a,_0x300980){const _0x190598=_0x2c0583;if($gameMap[_0x190598(0x4c9)](_0x5207c9,_0xc4803a,_0x300980,this[_0x190598(0x42f)]))return!![];const _0x25daa2=this[_0x190598(0x42f)][_0x190598(0x26d)](0x0)[_0x190598(0x2db)]()+this[_0x190598(0x42f)]['slice'](0x1),_0x428f38='%1DockRegionOnly'['format'](_0x25daa2);if(VisuMZ[_0x190598(0x568)][_0x190598(0x4d1)][_0x190598(0x4f0)][_0x428f38])return![];else{if('zsBBC'!=='zsBBC')this[_0x190598(0x3f8)][_0x190598(0x27f)]=_0xe216ab(_0x234a1d['$1']),this['_eventIcon'][_0x190598(0x37d)]=_0x10936f(_0x38e8c3['$2']);else return VisuMZ[_0x190598(0x568)][_0x190598(0x644)][_0x190598(0x30e)](this,_0x5207c9,_0xc4803a,_0x300980);}},VisuMZ[_0x2c0583(0x568)]['Game_Vehicle_initMoveSpeed']=Game_Vehicle[_0x2c0583(0x4ff)][_0x2c0583(0x456)],Game_Vehicle[_0x2c0583(0x4ff)][_0x2c0583(0x456)]=function(){const _0x41e571=_0x2c0583;VisuMZ[_0x41e571(0x568)][_0x41e571(0x206)][_0x41e571(0x30e)](this);const _0x2bc095=VisuMZ[_0x41e571(0x568)][_0x41e571(0x4d1)][_0x41e571(0x1b9)];if(this[_0x41e571(0x4d4)]()){if(_0x41e571(0x392)==='ZgsNA'){if(_0x2bc095[_0x41e571(0x5a3)])this[_0x41e571(0x4cb)](_0x2bc095[_0x41e571(0x5a3)]);}else this[_0x41e571(0x25a)]();}else{if(this['isShip']()){if(_0x2bc095['ShipSpeed'])this['setMoveSpeed'](_0x2bc095[_0x41e571(0x1b7)]);}else{if(this[_0x41e571(0x4e7)]()){if(_0x41e571(0x266)==='VqTlZ')this[_0x41e571(0x3c1)](_0x323c7e>0x0?0x4:0x6);else{if(_0x2bc095[_0x41e571(0x359)])this[_0x41e571(0x4cb)](_0x2bc095[_0x41e571(0x359)]);}}}}},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x4eb)]=Game_Event['prototype'][_0x2c0583(0x542)],Game_Event['prototype']['initialize']=function(_0xb8c9a6,_0x8430b7){const _0x319af1=_0x2c0583;VisuMZ[_0x319af1(0x568)][_0x319af1(0x4eb)]['call'](this,_0xb8c9a6,_0x8430b7),this[_0x319af1(0x37f)](),this['setupMorphEvent'](),this['restoreSavedEventPosition']();},Game_Map[_0x2c0583(0x4ff)]['referEvent']=function(_0x361c96,_0x194857){const _0x390d36=_0x2c0583;return _0x361c96===$gameMap[_0x390d36(0x42b)]()?$dataMap[_0x390d36(0x631)][_0x194857]:VisuMZ[_0x390d36(0x464)][_0x361c96][_0x390d36(0x631)][_0x194857];},VisuMZ['EventsMoveCore'][_0x2c0583(0x23f)]=Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x254)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x254)]=function(){const _0x45f794=_0x2c0583;if(this[_0x45f794(0x64a)]!==undefined){const _0x4db4fb=this[_0x45f794(0x64a)][_0x45f794(0x42b)],_0x10131c=this[_0x45f794(0x64a)][_0x45f794(0x65a)];return $gameMap['referEvent'](_0x4db4fb,_0x10131c);}if(this[_0x45f794(0x1a2)]!==undefined){const _0x1e79d3=this[_0x45f794(0x1a2)]['mapId'],_0x4d9d53=this[_0x45f794(0x1a2)][_0x45f794(0x65a)];return $gameMap[_0x45f794(0x379)](_0x1e79d3,_0x4d9d53);}if(this[_0x45f794(0x5a8)]!==undefined){const _0x341bfc=this[_0x45f794(0x5a8)]['mapId'],_0x1f2e56=this[_0x45f794(0x5a8)][_0x45f794(0x65a)];return $gameMap['referEvent'](_0x341bfc,_0x1f2e56);}if($gameTemp['_spawnData']!==undefined){const _0x9e7efa=$gameTemp[_0x45f794(0x421)][_0x45f794(0x42b)],_0x2e2192=$gameTemp['_spawnData'][_0x45f794(0x65a)];return $gameMap[_0x45f794(0x379)](_0x9e7efa,_0x2e2192);}return VisuMZ[_0x45f794(0x568)][_0x45f794(0x23f)][_0x45f794(0x30e)](this);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x611)]=function(_0x46beb4,_0x7bc4d7){const _0x510153=_0x2c0583;if(_0x46beb4===0x0||_0x7bc4d7===0x0)return![];if(!VisuMZ[_0x510153(0x464)][_0x46beb4]&&_0x46beb4!==$gameMap[_0x510153(0x42b)]())return $gameTemp['isPlaytest']()&&console[_0x510153(0x405)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'[_0x510153(0x2d3)](_0x46beb4)),![];return!![];},VisuMZ['EventsMoveCore'][_0x2c0583(0x401)]=Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x225)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x225)]=function(){const _0xbef281=_0x2c0583;VisuMZ[_0xbef281(0x568)][_0xbef281(0x401)][_0xbef281(0x30e)](this),Imported[_0xbef281(0x30b)]&&Input[_0xbef281(0x3a9)](VisuMZ['MessageCore'][_0xbef281(0x4d1)]['General'][_0xbef281(0x5c3)])&&(_0xbef281(0x4fc)==='HFYXo'?this[_0xbef281(0x4ef)][_0xbef281(0x5a5)]=_0x40b9be(_0x212a3f['$1']):Input[_0xbef281(0x48b)]());},Game_Event['prototype'][_0x2c0583(0x37f)]=function(){const _0x3afa94=_0x2c0583,_0x266b95=this['event']()[_0x3afa94(0x4bf)];if(_0x266b95==='')return;if(DataManager[_0x3afa94(0x51d)]()||DataManager['isEventTest']())return;const _0x216fda=VisuMZ[_0x3afa94(0x568)][_0x3afa94(0x4d1)][_0x3afa94(0x4f5)];let _0x8a0b8b=null,_0x25e916=0x0,_0x99ff01=0x0;if(_0x266b95[_0x3afa94(0x524)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if(_0x3afa94(0x5df)===_0x3afa94(0x57c)){if(this[_0x3afa94(0x352)]())return![];if(this['_isObjectCharacter'])return![];if(this['_characterName']==='')return![];if(this[_0x3afa94(0x329)]===_0x93da5b)return![];if(this['isTransparent']())return![];return!![];}else _0x25e916=Number(RegExp['$1']),_0x99ff01=Number(RegExp['$2']);}else{if(_0x266b95[_0x3afa94(0x524)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x3afa94(0x561)!=='NjPsz')_0x25e916=Number(RegExp['$1']),_0x99ff01=Number(RegExp['$2']);else{if(_0x2b8445)_0x2c103f['setChaseOff'](![]);}}else{if(_0x266b95[_0x3afa94(0x524)](/<COPY EVENT:[ ](.*?)>/i)){if(_0x3afa94(0x1a8)==='JTPBq'){const _0x188393=this[_0x3afa94(0x669)](this[_0x3afa94(0x385)]());return _0x11a21b[_0x3afa94(0x408)](this['y'],_0x188393);}else{const _0x181c71=String(RegExp['$1'])[_0x3afa94(0x2db)]()[_0x3afa94(0x634)]();_0x8a0b8b=VisuMZ['EventTemplates'][_0x181c71];if(!_0x8a0b8b)return;_0x25e916=_0x8a0b8b[_0x3afa94(0x425)],_0x99ff01=_0x8a0b8b[_0x3afa94(0x2e0)];}}}}if(!this[_0x3afa94(0x611)](_0x25e916,_0x99ff01))return;_0x216fda['PreCopyJS']['call'](this,_0x25e916,_0x99ff01,this);if(_0x8a0b8b)_0x8a0b8b[_0x3afa94(0x4a4)]['call'](this,_0x25e916,_0x99ff01,this);this['_eventCopyData']={'mapId':_0x25e916,'eventId':_0x99ff01},this['_pageIndex']=-0x2,this[_0x3afa94(0x551)](),_0x216fda['PostCopyJS'][_0x3afa94(0x30e)](this,_0x25e916,_0x99ff01,this);if(_0x8a0b8b)_0x8a0b8b[_0x3afa94(0x4f3)]['call'](this,_0x25e916,_0x99ff01,this);$gameMap['clearEventCache']();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x578)]=function(){const _0x592fa1=_0x2c0583,_0x12e9b1=$gameSystem['getPreservedMorphEventData'](this);if(!_0x12e9b1)return;const _0x27bb01=_0x12e9b1[_0x592fa1(0x2dc)][_0x592fa1(0x2db)]()[_0x592fa1(0x634)]();_0x27bb01!==_0x592fa1(0x3c0)?this[_0x592fa1(0x5d6)](_0x27bb01,!![]):this[_0x592fa1(0x4e0)](_0x12e9b1[_0x592fa1(0x42b)],_0x12e9b1[_0x592fa1(0x65a)],!![]);},Game_Event['prototype'][_0x2c0583(0x4e0)]=function(_0x6c529c,_0x470528,_0x577d2a){const _0x25461b=_0x2c0583;if(!this['checkValidEventerMap'](_0x6c529c,_0x470528))return;const _0x1415db=VisuMZ[_0x25461b(0x568)][_0x25461b(0x4d1)]['Template'];if(!_0x577d2a)_0x1415db[_0x25461b(0x57b)]['call'](this,_0x6c529c,_0x470528,this);this[_0x25461b(0x64a)]={'mapId':_0x6c529c,'eventId':_0x470528},this[_0x25461b(0x4be)]=-0x2,this[_0x25461b(0x551)]();if(!_0x577d2a)_0x1415db[_0x25461b(0x349)][_0x25461b(0x30e)](this,_0x6c529c,_0x470528,this);$gameMap[_0x25461b(0x34b)]();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5d6)]=function(_0x47197f,_0x154b24){const _0x565783=_0x2c0583;_0x47197f=_0x47197f[_0x565783(0x2db)]()[_0x565783(0x634)]();const _0x58b442=VisuMZ['EventTemplates'][_0x47197f];if(!_0x58b442)return;const _0x1e2a6a=_0x58b442['MapID'],_0x5b25d7=_0x58b442[_0x565783(0x2e0)];if(!this[_0x565783(0x611)](_0x1e2a6a,_0x5b25d7))return;if(!_0x154b24)_0x58b442[_0x565783(0x57b)]['call'](this,_0x1e2a6a,_0x5b25d7,this);this['morphInto'](_0x1e2a6a,_0x5b25d7,_0x154b24);if(!_0x154b24)_0x58b442[_0x565783(0x349)][_0x565783(0x30e)](this,_0x1e2a6a,_0x5b25d7,this);if($gameMap)$gameMap[_0x565783(0x34b)]();},Game_Event[_0x2c0583(0x4ff)]['removeMorph']=function(){const _0x1f7bcd=_0x2c0583;this['_eventMorphData']=undefined,this[_0x1f7bcd(0x4be)]=-0x2,this[_0x1f7bcd(0x551)]();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5a0)]=function(_0x3e7738){const _0x977de9=_0x2c0583,_0x312852=VisuMZ[_0x977de9(0x568)][_0x977de9(0x4d1)]['Template'],_0x1bc319=_0x3e7738[_0x977de9(0x2dc)]['toUpperCase']()[_0x977de9(0x634)](),_0x2518a0=!['',_0x977de9(0x3c0)][_0x977de9(0x454)](_0x1bc319);let _0x1b5d2e=0x0,_0x1ed93d=0x0;if(_0x2518a0){const _0x64ae55=VisuMZ[_0x977de9(0x465)][_0x1bc319];if(!_0x64ae55)return;_0x1b5d2e=_0x64ae55[_0x977de9(0x425)],_0x1ed93d=_0x64ae55[_0x977de9(0x2e0)];}else _0x977de9(0x3a1)===_0x977de9(0x3a1)?(_0x1b5d2e=_0x3e7738['mapId'],_0x1ed93d=_0x3e7738[_0x977de9(0x65a)]):this['setSelfValue'](_0xfbdab4,_0x533a38);if(!this[_0x977de9(0x611)](_0x1b5d2e,_0x1ed93d))return;if(_0x2518a0){const _0x1f641f=VisuMZ[_0x977de9(0x465)][_0x1bc319];_0x1f641f['PreSpawnJS'][_0x977de9(0x30e)](this,_0x1b5d2e,_0x1ed93d,this);}_0x312852['PreSpawnJS'][_0x977de9(0x30e)](this,_0x1b5d2e,_0x1ed93d,this),this[_0x977de9(0x5a8)]=_0x3e7738,this[_0x977de9(0x4be)]=-0x2,this['_mapId']=$gameMap[_0x977de9(0x42b)](),this[_0x977de9(0x53a)]=_0x3e7738[_0x977de9(0x3cc)],this[_0x977de9(0x4a0)]=_0x3e7738['spawnPreserved'],this[_0x977de9(0x4e1)](_0x3e7738['x'],_0x3e7738['y']),this['setDirection'](_0x3e7738['direction']),this[_0x977de9(0x551)]();if(_0x2518a0){if(_0x977de9(0x60e)!==_0x977de9(0x60e))return this[_0x977de9(0x443)]()[_0x977de9(0x3d7)]()['match'](/\[VS8\]/i);else{const _0x43da8=VisuMZ['EventTemplates'][_0x1bc319];if(!_0x43da8)return;_0x43da8[_0x977de9(0x5c2)][_0x977de9(0x30e)](this,_0x1b5d2e,_0x1ed93d,this);}}_0x312852['PostSpawnJS'][_0x977de9(0x30e)](this,_0x1b5d2e,_0x1ed93d,this);const _0x461ceb=SceneManager[_0x977de9(0x63a)];if(_0x461ceb&&_0x461ceb[_0x977de9(0x3ee)])_0x461ceb[_0x977de9(0x3ee)][_0x977de9(0x356)](this);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x1c2)]=function(){const _0x2030fb=_0x2c0583;return!!this[_0x2030fb(0x5a8)];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x5fd)]=Game_Event[_0x2c0583(0x4ff)]['clearPageSettings'],Game_Event[_0x2c0583(0x4ff)]['clearPageSettings']=function(){const _0x22b1f6=_0x2c0583;VisuMZ[_0x22b1f6(0x568)][_0x22b1f6(0x5fd)]['call'](this),this[_0x22b1f6(0x2b7)]();},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x198)]=Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x4bc)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x4bc)]=function(){const _0x54281e=_0x2c0583;this[_0x54281e(0x420)]=!![],VisuMZ[_0x54281e(0x568)][_0x54281e(0x198)][_0x54281e(0x30e)](this),this['setupEventsMoveCoreEffects'](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x2c0583(0x4ff)]['setupEventsMoveCoreEffects']=function(){const _0x1a0cb0=_0x2c0583;if(!this[_0x1a0cb0(0x254)]())return;this[_0x1a0cb0(0x2b7)](),this[_0x1a0cb0(0x586)](),this[_0x1a0cb0(0x5d3)](),this[_0x1a0cb0(0x267)]();},Game_Event['prototype']['setupEventsMoveCoreNotetags']=function(){const _0x2fa081=_0x2c0583,_0x194edb=this['event']()[_0x2fa081(0x4bf)];if(_0x194edb==='')return;this['checkEventsMoveCoreStringTags'](_0x194edb);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5d3)]=function(){const _0x31ae26=_0x2c0583;if(!this['page']())return;const _0x4471af=this[_0x31ae26(0x4f2)]();let _0xb59741='';for(const _0x37c878 of _0x4471af){if([0x6c,0x198][_0x31ae26(0x454)](_0x37c878['code'])){if(_0xb59741!=='')_0xb59741+='\x0a';_0xb59741+=_0x37c878[_0x31ae26(0x39f)][0x0];}}this['checkEventsMoveCoreStringTags'](_0xb59741);},Game_Event['prototype'][_0x2c0583(0x2b7)]=function(){const _0x409f28=_0x2c0583,_0x341807=VisuMZ['EventsMoveCore']['Settings'];this[_0x409f28(0x231)]={'type':_0x409f28(0x32d),'distance':0x0,'regionList':[]},this[_0x409f28(0x2c4)]=![],this[_0x409f28(0x2e2)]=![],this[_0x409f28(0x477)]=![],this[_0x409f28(0x1e4)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x409f28(0x3f8)]=$gameSystem['getEventIconData'](this),this['_labelWindow']={'text':'','visibleRange':_0x341807[_0x409f28(0x3e0)][_0x409f28(0x3ed)],'offsetX':_0x341807[_0x409f28(0x3e0)]['OffsetX'],'offsetY':_0x341807[_0x409f28(0x3e0)][_0x409f28(0x1bb)]},this[_0x409f28(0x64c)]=![],this[_0x409f28(0x55f)]=[],this[_0x409f28(0x621)]={'target':-0x1,'type':'random','delay':0x1,'opacityDelta':0x0},this['_randomMoveWeight']=_0x341807['Movement'][_0x409f28(0x297)]??0x0,this[_0x409f28(0x3c7)]=![],this[_0x409f28(0x62b)]={'visible':!![],'filename':_0x341807[_0x409f28(0x1b9)][_0x409f28(0x54d)]},this[_0x409f28(0x666)](),this[_0x409f28(0x36c)]();},Game_Event['prototype']['checkEventsMoveCoreStringTags']=function(_0x4b8ba9){const _0x2e74de=_0x2c0583;if(_0x4b8ba9[_0x2e74de(0x524)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))_0x2e74de(0x1b8)===_0x2e74de(0x33d)?this['moveBackToRandomHome']():(this[_0x2e74de(0x231)][_0x2e74de(0x55d)]=JSON['parse']('['+RegExp['$1'][_0x2e74de(0x524)](/\d+/g)+']'),this[_0x2e74de(0x231)]['type']=_0x2e74de(0x260));else _0x4b8ba9['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(_0x2e74de(0x5ed)===_0x2e74de(0x1a6)?this[_0x2e74de(0x3c1)](_0x3c15e4>0x0?0x8:0x2):(type=String(RegExp['$1'])[_0x2e74de(0x299)]()[_0x2e74de(0x634)](),this[_0x2e74de(0x231)][_0x2e74de(0x230)]=type,this[_0x2e74de(0x231)][_0x2e74de(0x2e5)]=Number(RegExp['$2'])));_0x4b8ba9[_0x2e74de(0x524)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x2e74de(0x2c4)]=!![]);_0x4b8ba9['match'](/<CLICK TRIGGER>/i)&&(this[_0x2e74de(0x2e2)]=!![]);_0x4b8ba9[_0x2e74de(0x524)](/<CUSTOM Z:[ ](.*?)>/i)&&(this['_customZ']=Number(RegExp['$1'])||0x0);const _0x200438=_0x4b8ba9[_0x2e74de(0x524)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x200438){if(_0x2e74de(0x279)!==_0x2e74de(0x1b4))for(const _0x2f122e of _0x200438){if(_0x2f122e[_0x2e74de(0x524)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x2e74de(0x2b2)===_0x2e74de(0x2b2)){const _0x56ebdf=String(RegExp['$1'])[_0x2e74de(0x299)]()['trim'](),_0x17340a=Number(RegExp['$2']);this[_0x2e74de(0x1e4)][_0x56ebdf]=_0x17340a;}else this[_0x2e74de(0x4e4)]=_0x113548(_0x55a2c5)[_0x2e74de(0x299)]()[_0x2e74de(0x634)]();}}else{if(this[_0x2e74de(0x329)]===_0x521111&&this[_0x2e74de(0x583)]())return this[_0x2e74de(0x443)]()[_0x2e74de(0x3d7)]()[_0x2e74de(0x524)](/\[VS8\]/i);else return _0x24eac6[_0x2e74de(0x1d8)]&&this['hasDragonbones']()?!![]:this[_0x2e74de(0x3d7)]()[_0x2e74de(0x524)](/\[VS8\]/i);}}_0x4b8ba9['match'](/<ICON:[ ](\d+)>/i)&&('xjjrA'===_0x2e74de(0x32b)?_0x4667a2(this[_0x2e74de(0x1eb)][_0x2e74de(0x313)](this,_0x26e057,_0x56d74b),0x64):this[_0x2e74de(0x3f8)]['iconIndex']=Number(RegExp['$1']));_0x4b8ba9[_0x2e74de(0x524)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(_0x2e74de(0x664)!==_0x2e74de(0x664)?this['onExpire']():this[_0x2e74de(0x3f8)][_0x2e74de(0x27f)]=Number(RegExp['$1']));_0x4b8ba9['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2e74de(0x3f8)][_0x2e74de(0x37d)]=Number(RegExp['$1']));_0x4b8ba9['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x2e74de(0x27f)]=Number(RegExp['$1']),this[_0x2e74de(0x3f8)]['bufferY']=Number(RegExp['$2']));if(_0x4b8ba9[_0x2e74de(0x524)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x543d36=String(RegExp['$1'])[_0x2e74de(0x2db)]()[_0x2e74de(0x634)](),_0x4fd3d5=['NORMAL','ADDITIVE',_0x2e74de(0x43b),'SCREEN'];this['_eventIcon'][_0x2e74de(0x528)]=_0x4fd3d5[_0x2e74de(0x1ac)](_0x543d36)[_0x2e74de(0x344)](0x0,0x3);}if(_0x4b8ba9[_0x2e74de(0x524)](/<LABEL:[ ](.*?)>/i)){if(_0x2e74de(0x412)!==_0x2e74de(0x4c2))this['_labelWindow']['text']=String(RegExp['$1'])[_0x2e74de(0x634)]();else{const _0x10437c=_0x1f560f(_0x596f14['$1'])[_0x2e74de(0x2db)]()[_0x2e74de(0x634)]();return this['setPose'](_0x10437c);}}_0x4b8ba9[_0x2e74de(0x524)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x2e74de(0x4ef)][_0x2e74de(0x4ed)]=String(RegExp['$1'])['trim']());_0x4b8ba9[_0x2e74de(0x524)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(_0x2e74de(0x236)!=='FcmPU'?this[_0x2e74de(0x4ef)][_0x2e74de(0x5a5)]=Number(RegExp['$1']):this[_0x2e74de(0x499)]['removeChild'](_0x3430e2['_shadowSprite']));if(_0x4b8ba9[_0x2e74de(0x524)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x2e74de(0x645)!==_0x2e74de(0x639))this[_0x2e74de(0x4ef)][_0x2e74de(0x322)]=Number(RegExp['$1']);else{if(_0x30025e[_0x2e74de(0x63a)]['constructor']===_0x5e4885)return![];return _0x6f1470[_0x2e74de(0x4ee)][_0x2e74de(0x454)](_0x4a6fa8);}}_0x4b8ba9[_0x2e74de(0x524)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x2e74de(0x5a5)]=Number(RegExp['$1']),this[_0x2e74de(0x4ef)][_0x2e74de(0x322)]=Number(RegExp['$2']));$gameTemp[_0x2e74de(0x28d)](this);for(;;){if(this[_0x2e74de(0x4ef)][_0x2e74de(0x4ed)][_0x2e74de(0x524)](/\\V\[(\d+)\]/gi))this[_0x2e74de(0x4ef)]['text']=this['_labelWindow'][_0x2e74de(0x4ed)][_0x2e74de(0x472)](/\\V\[(\d+)\]/gi,(_0x24b95d,_0x280675)=>$gameVariables[_0x2e74de(0x2f7)](parseInt(_0x280675)));else break;}$gameTemp[_0x2e74de(0x58d)]();_0x4b8ba9[_0x2e74de(0x524)](/<LABEL RANGE:[ ](\d+)>/i)&&(_0x2e74de(0x63e)!==_0x2e74de(0x580)?this[_0x2e74de(0x4ef)][_0x2e74de(0x3b2)]=Number(RegExp['$1']):_0x51058a[_0x2f905d]?(_0x4f35db[_0x2e74de(0x464)][_0x3f2c63]=_0x1495f0[_0x49bad2],_0x2ec6a9[_0x21b1cd]=_0x4b97e6):_0x52ade9(this[_0x2e74de(0x1eb)][_0x2e74de(0x313)](this,_0x4a39ea,_0x164577),0x64));_0x4b8ba9['match'](/<MIRROR SPRITE>/i)&&(this[_0x2e74de(0x64c)]=!![]);if(_0x4b8ba9[_0x2e74de(0x524)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if('qZmzm'==='qZmzm'){const _0x260cc6=JSON[_0x2e74de(0x5ab)]('['+RegExp['$1'][_0x2e74de(0x524)](/\d+/g)+']');this[_0x2e74de(0x55f)]=this[_0x2e74de(0x55f)][_0x2e74de(0x532)](_0x260cc6),this[_0x2e74de(0x55f)]['remove'](0x0);}else return!!this['advancedValue'](_0x4fc0f3);}if(_0x4b8ba9['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x45fe35=String(RegExp['$1']);if(_0x45fe35[_0x2e74de(0x524)](/PLAYER/i)){if(_0x2e74de(0x381)!==_0x2e74de(0x2bd))this[_0x2e74de(0x621)][_0x2e74de(0x202)]=0x0;else{const _0xda0891=this[_0x2e74de(0x549)],_0xe1fd2f=this[_0x2e74de(0x4b2)];return this[_0x2e74de(0x3ec)](_0xda0891,_0xe1fd2f);}}else _0x45fe35[_0x2e74de(0x524)](/EVENT[ ](\d+)/i)&&(this[_0x2e74de(0x621)]['target']=Number(RegExp['$1']));}if(_0x4b8ba9[_0x2e74de(0x524)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if('icKCl'===_0x2e74de(0x626))this[_0x2e74de(0x621)][_0x2e74de(0x230)]=String(RegExp['$1'])[_0x2e74de(0x299)]()['trim']();else{if(_0x2b6e64[0x2]['match'](/(?:SELF|MAP)/i))return this[_0x2e74de(0x19d)](_0x45172f);else{return _0x1b83af[_0x2e74de(0x568)][_0x2e74de(0x58a)][_0x2e74de(0x30e)](this,_0xeec1f4);;}}}_0x4b8ba9['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x2e74de(0x621)][_0x2e74de(0x4db)]=Number(RegExp['$1']));if(_0x4b8ba9['match'](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)){if(_0x2e74de(0x59d)==='ppdTJ'){const _0x583332=_0x208e8f[_0x21a9e9[_0x2e74de(0x20b)](_0x10a369[_0x2e74de(0x19e)])];return _0x1822c7['x']=_0x583332[0x0],_0x2eb2b4['y']=_0x583332[0x1],this[_0x2e74de(0x567)](_0x42d27b),!![];}else this[_0x2e74de(0x621)]['opacityDelta']=Number(RegExp['$1']);}if(_0x4b8ba9[_0x2e74de(0x524)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x4b8ba9[_0x2e74de(0x524)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x2e74de(0x382)]=Number(RegExp['$1'])||0x0);if(_0x4b8ba9[_0x2e74de(0x524)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x2e74de(0x668)!==_0x2e74de(0x317))this[_0x2e74de(0x3c7)]=!![];else{const _0x48f0ca=this[_0x2e74de(0x416)](_0x2f7d7f,_0x2b24d0,![]);if(_0x48f0ca)this[_0x2e74de(0x46a)](_0x48f0ca);}}_0x4b8ba9[_0x2e74de(0x524)](/<HIDE SHADOW>/i)&&(this[_0x2e74de(0x62b)][_0x2e74de(0x3aa)]=![]);if(_0x4b8ba9[_0x2e74de(0x524)](/<SHADOW FILENAME:[ ](.*?)>/i)){if(_0x2e74de(0x1ca)===_0x2e74de(0x63b))return this[_0x2e74de(0x3ad)]();else this[_0x2e74de(0x62b)]['filename']=String(RegExp['$1']);}_0x4b8ba9[_0x2e74de(0x524)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2e74de(0x3da)]=Number(RegExp['$1']));_0x4b8ba9[_0x2e74de(0x524)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2e74de(0x29b)]=Number(RegExp['$1']));if(_0x4b8ba9['match'](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x2e74de(0x4f1)!==_0x2e74de(0x2d8))this['_spriteOffsetX']=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2']);else{const _0x4db8d2=this[_0x2e74de(0x254)]();return this[_0x2e74de(0x446)]()&&_0x4db8d2[_0x2e74de(0x3d8)]>=0x1&&_0x58ad58[_0x2e74de(0x61d)](_0x4db8d2[_0x2e74de(0x2c1)]);}}_0x4b8ba9['match'](/<STEP PATTERN:[ ](.*)>/i)&&('SJUqB'===_0x2e74de(0x2ed)?this['contentsOpacity']-=this['opacitySpeed']():this[_0x2e74de(0x387)]=String(RegExp['$1'])[_0x2e74de(0x2db)]()[_0x2e74de(0x634)]());},Game_Event[_0x2c0583(0x4ff)]['updateEventsMoveCoreTagChanges']=function(){this['updateShadowChanges']();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x4af)]=function(){const _0x16a515=_0x2c0583;if(this[_0x16a515(0x2c4)])return!![];return Game_Character[_0x16a515(0x4ff)]['isNearTheScreen'][_0x16a515(0x30e)](this);},VisuMZ['EventsMoveCore'][_0x2c0583(0x311)]=Game_Event[_0x2c0583(0x4ff)]['updateSelfMovement'],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x4bb)]=function(){const _0x36d945=_0x2c0583;if(this[_0x36d945(0x28e)]())return;VisuMZ[_0x36d945(0x568)]['Game_Event_updateSelfMovement'][_0x36d945(0x30e)](this),this[_0x36d945(0x351)]()&&('IaFdk'!=='IaFdk'?(_0x579d55=_0x28c5c5(_0x393562['$1']),_0xf4715=_0x3bacab(_0x1cafd6['$2'])):VisuMZ['MoveAllSynchTargets'](this[_0x36d945(0x53a)]));},Game_Event['prototype']['isPreventSelfMovement']=function(){const _0x183cf2=_0x2c0583,_0x4c7bce=VisuMZ[_0x183cf2(0x568)]['Settings'][_0x183cf2(0x1b9)];if($gameMap[_0x183cf2(0x1c9)]()&&_0x4c7bce['StopAutoMoveEvents'])return!![];if($gameMessage[_0x183cf2(0x50a)]()&&_0x4c7bce[_0x183cf2(0x466)])return!![];if(!$gameSystem[_0x183cf2(0x1da)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];},Game_Event[_0x2c0583(0x4ff)]['updateShadowChanges']=function(){const _0x1c3690=_0x2c0583,_0xccd904=SceneManager[_0x1c3690(0x63a)]['_spriteset'];if(_0xccd904){const _0x4d26fe=_0xccd904[_0x1c3690(0x2ee)](this);_0x4d26fe&&_0x4d26fe[_0x1c3690(0x41c)]&&_0x4d26fe[_0x1c3690(0x41c)]['_filename']!==this[_0x1c3690(0x4e3)]()&&(_0x4d26fe[_0x1c3690(0x41c)][_0x1c3690(0x34f)]=this[_0x1c3690(0x4e3)](),_0x4d26fe['_shadowSprite']['bitmap']=ImageManager['loadSystem'](_0x4d26fe[_0x1c3690(0x41c)][_0x1c3690(0x34f)]));}},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x4e3)]=function(){const _0x5229ac=_0x2c0583;return this[_0x5229ac(0x62b)][_0x5229ac(0x361)];},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x1a9)]=function(){const _0x14656a=_0x2c0583;if(!this[_0x14656a(0x62b)]['visible'])return![];return Game_CharacterBase['prototype'][_0x14656a(0x1a9)][_0x14656a(0x30e)](this);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x453)]=function(){const _0x18fbb2=_0x2c0583;return this['_labelWindow'][_0x18fbb2(0x4ed)];},Game_Event['prototype'][_0x2c0583(0x41f)]=function(){const _0x59e51f=_0x2c0583;return this[_0x59e51f(0x4ef)]['visibleRange'];},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x2ae)]=function(_0x16f888,_0x31567e,_0x73907e){const _0x485855=_0x2c0583;if(this[_0x485855(0x22d)]())return this[_0x485855(0x659)](_0x16f888,_0x31567e,_0x73907e);if($gameMap[_0x485855(0x2f0)](_0x16f888,_0x31567e,_0x73907e,_0x485855(0x254)))return!![];if($gameMap[_0x485855(0x257)](_0x16f888,_0x31567e,_0x73907e,'event'))return![];return Game_Character[_0x485855(0x4ff)][_0x485855(0x2ae)][_0x485855(0x30e)](this,_0x16f888,_0x31567e,_0x73907e);},Game_Event['prototype']['hasMoveOnlyRegions']=function(){const _0x43f284=_0x2c0583;if(this[_0x43f284(0x55f)]===undefined)this[_0x43f284(0x2b7)]();return this[_0x43f284(0x55f)][_0x43f284(0x19e)]>0x0;},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x659)]=function(_0x4cbaac,_0x518ce3,_0xbdf6ed){const _0x20c5d9=_0x2c0583,_0x2ab375=$gameMap[_0x20c5d9(0x232)](_0x4cbaac,_0xbdf6ed),_0x6def0f=$gameMap[_0x20c5d9(0x408)](_0x518ce3,_0xbdf6ed),_0x6f128a=$gameMap[_0x20c5d9(0x2ce)](_0x2ab375,_0x6def0f);return this['_moveOnlyRegions'][_0x20c5d9(0x454)](_0x6f128a);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x1f9)]=Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x282)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x282)]=function(){const _0x4cb93a=_0x2c0583;return this[_0x4cb93a(0x346)]=![],this[_0x4cb93a(0x4a8)]=![],this[_0x4cb93a(0x254)]()?VisuMZ[_0x4cb93a(0x568)][_0x4cb93a(0x1f9)][_0x4cb93a(0x30e)](this):-0x1;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x339)]=Game_Event['prototype'][_0x2c0583(0x5f6)],Game_Event[_0x2c0583(0x4ff)]['meetsConditions']=function(_0x31782a){const _0x1bd67a=_0x2c0583;this['checkAdvancedSwitchVariablePresent'](_0x31782a),$gameTemp[_0x1bd67a(0x28d)](this);const _0x37bffa=VisuMZ[_0x1bd67a(0x568)]['Game_Event_meetsConditions'][_0x1bd67a(0x30e)](this,_0x31782a);return $gameTemp[_0x1bd67a(0x58d)](),_0x37bffa;},Game_Event['prototype']['hasAdvancedSwitchVariable']=function(){const _0x332e46=_0x2c0583;return this[_0x332e46(0x346)];},Game_Event['prototype']['checkAdvancedSwitchVariablePresent']=function(_0x38a912){const _0x2e72b6=_0x2c0583,_0x33c795=_0x38a912['conditions'];if(_0x33c795[_0x2e72b6(0x3b3)]&&DataManager['isAdvancedSwitch'](_0x33c795[_0x2e72b6(0x276)]))this['_advancedSwitchVariable']=!![];else{if(_0x33c795['switch2Valid']&&DataManager[_0x2e72b6(0x61d)](_0x33c795[_0x2e72b6(0x27a)]))this[_0x2e72b6(0x346)]=!![];else _0x33c795['variableValid']&&DataManager['isAdvancedVariable'](_0x33c795[_0x2e72b6(0x332)])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0x2c0583(0x4ff)]['hasClickTrigger']=function(){const _0x58c517=_0x2c0583;if(this['_erased'])return![];return this[_0x58c517(0x2e2)];},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x1c4)]=function(){const _0x4c21a3=_0x2c0583;$gameTemp[_0x4c21a3(0x670)](),this[_0x4c21a3(0x225)]();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x404)]=function(_0x35c934,_0xd59f35){const _0xff357=_0x2c0583;return this[_0xff357(0x1e4)]?this[_0xff357(0x1cf)](_0x35c934,_0xd59f35):Game_Character[_0xff357(0x4ff)][_0xff357(0x404)][_0xff357(0x30e)](this,_0x35c934,_0xd59f35);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x1cf)]=function(_0x26c5fe,_0x3a9a1b){const _0x29d3b4=_0x2c0583;var _0x17a8e7=this['x']-this[_0x29d3b4(0x1e4)]['left'],_0x2d9c18=this['x']+this[_0x29d3b4(0x1e4)][_0x29d3b4(0x40c)],_0x3e14c9=this['y']-this['_addedHitbox']['up'],_0x159ae4=this['y']+this['_addedHitbox'][_0x29d3b4(0x403)];return _0x17a8e7<=_0x26c5fe&&_0x26c5fe<=_0x2d9c18&&_0x3e14c9<=_0x3a9a1b&&_0x3a9a1b<=_0x159ae4;},Game_Event['prototype'][_0x2c0583(0x3af)]=function(_0x47e498,_0x10aa4e,_0x3060a6){const _0x29961d=_0x2c0583;for(let _0x429da3=-this['_addedHitbox'][_0x29961d(0x36a)];_0x429da3<=this[_0x29961d(0x1e4)]['right'];_0x429da3++){if(_0x29961d(0x2ca)!==_0x29961d(0x277))for(let _0x3e9736=-this[_0x29961d(0x1e4)]['up'];_0x3e9736<=this[_0x29961d(0x1e4)]['down'];_0x3e9736++){if('XPGBG'===_0x29961d(0x32c))return{'iconIndex':0x0,'bufferX':_0xdbf86e['Icon'][_0x29961d(0x5eb)],'bufferY':_0x45fdf1[_0x29961d(0x43d)]['BufferY'],'blendMode':_0x1a4742[_0x29961d(0x43d)][_0x29961d(0x534)]};else{if(!Game_Character[_0x29961d(0x4ff)]['canPass'][_0x29961d(0x30e)](this,_0x47e498+_0x429da3,_0x10aa4e+_0x3e9736,_0x3060a6))return![];}}else _0x53034f[_0x29961d(0x4ff)]['updateMove'][_0x29961d(0x30e)](this),this[_0x29961d(0x5dd)]();}return!![];},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x1d7)]=function(_0x366a46,_0xa4f51b){const _0x410df2=_0x2c0583;if(Imported['VisuMZ_0_CoreEngine']&&this[_0x410df2(0x62a)]())return this[_0x410df2(0x56d)](_0x366a46,_0xa4f51b);else{const _0x18e92e=$gameMap[_0x410df2(0x23c)](_0x366a46,_0xa4f51b)[_0x410df2(0x38d)](_0x3f31f1=>_0x3f31f1!==this);return _0x18e92e[_0x410df2(0x19e)]>0x0;}},Game_Event[_0x2c0583(0x4ff)]['checkSmartEventCollision']=function(_0x309df3,_0x5a56ba){const _0x253b53=_0x2c0583;if(!this[_0x253b53(0x2a3)]())return![];else{if('hLmqV'===_0x253b53(0x307)){_0x1a81ed[_0x253b53(0x28d)](this);const _0x2f7278=_0x16a3e5[_0x253b53(0x568)][_0x253b53(0x26a)][_0x253b53(0x30e)](this,_0x3deb80);return _0x5a4031['clearSelfTarget'](),_0x2f7278;}else{const _0x541f49=$gameMap[_0x253b53(0x23c)](_0x309df3,_0x5a56ba)[_0x253b53(0x38d)](_0x2a4a0e=>_0x2a4a0e!==this&&_0x2a4a0e['isNormalPriority']());return _0x541f49[_0x253b53(0x19e)]>0x0;}}},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x3e6)]=function(){const _0x8568d5=_0x2c0583;return this[_0x8568d5(0x231)][_0x8568d5(0x230)]||_0x8568d5(0x32d);},Game_Event['prototype']['activationProximityDistance']=function(){const _0x3032ee=_0x2c0583;return this[_0x3032ee(0x231)][_0x3032ee(0x2e5)]||0x0;},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x60f)]=function(){const _0x3f625c=_0x2c0583;return this[_0x3f625c(0x231)][_0x3f625c(0x55d)]||[];},Game_Event['prototype'][_0x2c0583(0x58f)]=function(){const _0x288ede=_0x2c0583;Game_Character[_0x288ede(0x4ff)]['increaseSteps'][_0x288ede(0x30e)](this);if([_0x288ede(0x32d),'region'][_0x288ede(0x454)](this[_0x288ede(0x3e6)]()))return;$gamePlayer['checkEventTriggerEventsMoveCore']([0x2]);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x326)]=Game_Event['prototype'][_0x2c0583(0x53c)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x53c)]=function(){const _0x315be0=_0x2c0583;if(this[_0x315be0(0x495)]!==0x3)return;if(this[_0x315be0(0x420)])return;if(!this[_0x315be0(0x384)](![]))return;if(!this[_0x315be0(0x468)](![]))return;VisuMZ['EventsMoveCore'][_0x315be0(0x326)][_0x315be0(0x30e)](this);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x49d)]=Game_Event['prototype'][_0x2c0583(0x410)],Game_Event['prototype'][_0x2c0583(0x410)]=function(){const _0x54d919=_0x2c0583;if(!this['_interpreter'])return;if(!this[_0x54d919(0x384)](!![]))return;if(!this[_0x54d919(0x468)](!![]))return;VisuMZ['EventsMoveCore']['Game_Event_updateParallel'][_0x54d919(0x30e)](this);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x384)]=function(_0x528646){const _0x20a861=_0x2c0583;if(!_0x528646&&$gameMap[_0x20a861(0x1c9)]())return![];if(!_0x528646&&$gameMap[_0x20a861(0x4b0)]())return![];if(this[_0x20a861(0x60f)]()<=0x0)return!![];return $gamePlayer[_0x20a861(0x342)](this);},Game_Event['prototype']['checkActivationProximity']=function(_0x2bac2c){const _0x47645a=_0x2c0583;if(!_0x2bac2c&&$gameMap[_0x47645a(0x1c9)]())return![];if(!_0x2bac2c&&$gameMap[_0x47645a(0x4b0)]())return![];if([_0x47645a(0x32d),_0x47645a(0x260)][_0x47645a(0x454)](this[_0x47645a(0x3e6)]()))return!![];return $gamePlayer[_0x47645a(0x2d0)](this);},VisuMZ[_0x2c0583(0x492)]=function(_0x3001a3){const _0x153700=_0x2c0583;for(const _0x421b20 of $gameMap[_0x153700(0x631)]()){if(!_0x421b20)continue;_0x421b20[_0x153700(0x3a4)]()===_0x3001a3&&_0x421b20[_0x153700(0x2af)]();}},VisuMZ['GetMoveSynchTarget']=function(_0x572c7b){const _0x7fe1c4=_0x2c0583;if(_0x572c7b===0x0)return $gamePlayer;return $gameMap[_0x7fe1c4(0x254)](_0x572c7b);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x3a4)]=function(){const _0x14665a=_0x2c0583;return this[_0x14665a(0x621)][_0x14665a(0x202)];},Game_Event['prototype'][_0x2c0583(0x563)]=function(){const _0x395593=_0x2c0583;return this[_0x395593(0x621)][_0x395593(0x230)];},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x63f)]=function(){const _0x704067=_0x2c0583;if(this['moveSynchTarget']()>=0x0){if(_0x704067(0x40f)===_0x704067(0x1e5)){let _0x10fab3=0x0;if(_0x1699f3)_0x17e562[_0x704067(0x1dc)]=!![];_0x5cc1e5['isSupportDiagonalMovement']()?_0x10fab3=this[_0x704067(0x566)](_0x7dc6f7,_0x144755):_0x10fab3=this['findDirectionTo'](_0x1d7ab2,_0x609797);if(_0x4e11eb)_0x20523e['_moveAllowPlayerCollision']=![];this[_0x704067(0x606)](_0x10fab3),this[_0x704067(0x414)](!![]);}else{const _0x5a3f3f=VisuMZ[_0x704067(0x447)](this[_0x704067(0x3a4)]());if(_0x5a3f3f)return _0x5a3f3f[_0x704067(0x63f)]();}}return Game_Character['prototype']['realMoveSpeed']['call'](this);},Game_Event['prototype'][_0x2c0583(0x2af)]=function(){const _0x12b73c=_0x2c0583;this[_0x12b73c(0x621)][_0x12b73c(0x391)]=this[_0x12b73c(0x621)]['timer']||0x0,this[_0x12b73c(0x621)][_0x12b73c(0x391)]--;if(this['_moveSynch'][_0x12b73c(0x391)]>0x0)return;this[_0x12b73c(0x621)]['timer']=this[_0x12b73c(0x621)][_0x12b73c(0x4db)],this['processMoveSynch']();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x36f)]=function(_0x12d29b){const _0x13aaf6=_0x2c0583;if(this[_0x13aaf6(0x3a4)]()>=0x0){if(_0x13aaf6(0x4f9)!==_0x13aaf6(0x3db)){const _0x25c0ab=VisuMZ[_0x13aaf6(0x447)](this[_0x13aaf6(0x3a4)]());if(_0x25c0ab){if(_0x13aaf6(0x622)!==_0x13aaf6(0x622))_0x2068d6[_0x13aaf6(0x568)][_0x13aaf6(0x571)]['call'](this),this[_0x13aaf6(0x4a9)][_0x13aaf6(0x5b0)](this[_0x13aaf6(0x39c)][_0x13aaf6(0x313)](this));else{const _0x2f3f32=$gameMap[_0x13aaf6(0x2e5)](this['_realX'],this['_realY'],_0x25c0ab[_0x13aaf6(0x3ae)],_0x25c0ab[_0x13aaf6(0x653)])-0x1,_0x3a613d=Math['min']($gameMap[_0x13aaf6(0x40a)](),$gameMap[_0x13aaf6(0x65f)]()),_0xcd3f49=this['_moveSynch']['opacityDelta']||0x0;_0x12d29b-=Math['max'](0x0,_0x2f3f32)*_0x3a613d*_0xcd3f49;}}}else{const _0xfd3980=_0x48624c(_0x431a5d['$1']),_0x353bde=_0x11bf42(_0x3dc964['$2']);return this[_0x13aaf6(0x4b7)](_0xfd3980,_0x353bde);}}return _0x12d29b;},Game_Event['prototype'][_0x2c0583(0x5d1)]=function(){const _0x2c2178=_0x2c0583;switch(this[_0x2c2178(0x563)]()){case _0x2c2178(0x1ea):this[_0x2c2178(0x674)]();break;case'approach':this[_0x2c2178(0x358)]();break;case _0x2c2178(0x493):this[_0x2c2178(0x434)]();break;case _0x2c2178(0x3b9):this['processMoveSynchCustom']();break;case _0x2c2178(0x3f3):case _0x2c2178(0x1d2):this[_0x2c2178(0x5f7)]();break;case'reverse\x20mimic':case'reverse\x20copy':this[_0x2c2178(0x5e2)]();break;case _0x2c2178(0x44f):case _0x2c2178(0x2b6):case _0x2c2178(0x19c):case'horz\x20mirror':this[_0x2c2178(0x3dd)]();break;case _0x2c2178(0x4d5):case _0x2c2178(0x2ef):case'mirror\x20vert':case'vert\x20mirror':this[_0x2c2178(0x513)]();break;default:this[_0x2c2178(0x674)]();break;}this[_0x2c2178(0x22b)]();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x674)]=function(){const _0x2c6407=_0x2c0583,_0x3e275b=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x3e275b['push'](0x1,0x3,0x7,0x9);const _0x103c31=[];for(const _0x1d3ed6 of _0x3e275b){if(this[_0x2c6407(0x3af)](this['x'],this['y'],_0x1d3ed6))_0x103c31['push'](_0x1d3ed6);}if(_0x103c31[_0x2c6407(0x19e)]>0x0){const _0x29eb7c=_0x103c31[Math[_0x2c6407(0x20b)](_0x103c31['length'])];this['executeMoveDir8'](_0x29eb7c);}},Game_Event[_0x2c0583(0x4ff)]['processMoveSynchApproach']=function(){const _0x2a5295=_0x2c0583,_0x1098cc=VisuMZ[_0x2a5295(0x447)](this[_0x2a5295(0x3a4)]());this[_0x2a5295(0x1f1)](_0x1098cc);},Game_Event[_0x2c0583(0x4ff)]['processMoveSynchAway']=function(){const _0x4e724f=_0x2c0583,_0x5acfc8=VisuMZ[_0x4e724f(0x447)](this['moveSynchTarget']());this[_0x4e724f(0x407)](_0x5acfc8);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x3a5)]=function(){const _0x352c7c=_0x2c0583;this[_0x352c7c(0x3e9)]();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5f7)]=function(){const _0x3dfab1=_0x2c0583,_0x313b4b=VisuMZ[_0x3dfab1(0x447)](this[_0x3dfab1(0x3a4)]());this[_0x3dfab1(0x606)](_0x313b4b[_0x3dfab1(0x394)]());},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5e2)]=function(){const _0x29845c=_0x2c0583,_0x3248ba=VisuMZ[_0x29845c(0x447)](this[_0x29845c(0x3a4)]());this[_0x29845c(0x606)](this['reverseDir'](_0x3248ba[_0x29845c(0x394)]()));},Game_Event[_0x2c0583(0x4ff)]['processMoveSynchMirrorHorz']=function(){const _0x35bde8=_0x2c0583,_0x298459=VisuMZ['GetMoveSynchTarget'](this[_0x35bde8(0x3a4)]()),_0x14fabb=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x298459[_0x35bde8(0x394)]()];this['executeMoveDir8'](_0x14fabb);},Game_Event[_0x2c0583(0x4ff)]['processMoveSynchMirrorVert']=function(){const _0x5c2221=_0x2c0583,_0x17a0fb=VisuMZ[_0x5c2221(0x447)](this['moveSynchTarget']()),_0x535fbb=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x17a0fb['lastMovedDirection']()];this[_0x5c2221(0x606)](_0x535fbb);},Game_Event[_0x2c0583(0x4ff)]['restoreSavedEventPosition']=function(){const _0x26673d=_0x2c0583,_0x327c70=$gameSystem[_0x26673d(0x3e2)](this);if(!_0x327c70)return;this[_0x26673d(0x4e1)](_0x327c70['x'],_0x327c70['y']),this[_0x26673d(0x46a)](_0x327c70[_0x26673d(0x385)]);if(this['_pageIndex']===_0x327c70[_0x26673d(0x338)]){if(_0x26673d(0x2e1)===_0x26673d(0x5bd)){this['_moveSynch'][_0x26673d(0x391)]=this[_0x26673d(0x621)][_0x26673d(0x391)]||0x0,this['_moveSynch'][_0x26673d(0x391)]--;if(this[_0x26673d(0x621)][_0x26673d(0x391)]>0x0)return;this[_0x26673d(0x621)]['timer']=this['_moveSynch']['delay'],this['processMoveSynch']();}else this[_0x26673d(0x587)]=_0x327c70['moveRouteIndex'];}},Game_Event['prototype']['updateMove']=function(){const _0x84a8c5=_0x2c0583;Game_Character[_0x84a8c5(0x4ff)][_0x84a8c5(0x52c)][_0x84a8c5(0x30e)](this),this['autosaveEventLocation']();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x29d)]=function(){const _0x41714f=_0x2c0583;if($gameMap[_0x41714f(0x471)]())return!![];return this['_saveEventLocation'];},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5dd)]=function(){const _0x57c75f=_0x2c0583;if(!this['isSaveEventLocation']())return;this[_0x57c75f(0x54a)]();},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x54a)]=function(){const _0x522278=_0x2c0583;$gameSystem[_0x522278(0x54a)](this);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x450)]=function(){const _0xcdc7b6=_0x2c0583;$gameSystem[_0xcdc7b6(0x3b6)](this);},Game_Event['prototype'][_0x2c0583(0x51a)]=function(){const _0x467dfb=_0x2c0583;return $gameSystem[_0x467dfb(0x51a)](this)?Game_Character[_0x467dfb(0x4ff)][_0x467dfb(0x51a)][_0x467dfb(0x30e)](this):{'iconIndex':0x0,'bufferX':settings[_0x467dfb(0x43d)][_0x467dfb(0x5eb)],'bufferY':settings[_0x467dfb(0x43d)][_0x467dfb(0x610)],'blendMode':settings[_0x467dfb(0x43d)]['BlendMode']};},Game_Event[_0x2c0583(0x4ff)]['hasCPCs']=function(){const _0x38a653=_0x2c0583;return this[_0x38a653(0x4a8)];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x252)]=Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5f6)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x5f6)]=function(_0x2358a2){const _0x5d19c8=_0x2c0583,_0x59d684=VisuMZ['EventsMoveCore']['Game_Event_meetsConditionsCPC'][_0x5d19c8(0x30e)](this,_0x2358a2);if(!_0x59d684)return![];return this[_0x5d19c8(0x44d)](_0x2358a2);},Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x44d)]=function(_0x38adf0){const _0x310744=_0x2c0583;VisuMZ[_0x310744(0x568)][_0x310744(0x1b2)][_0x310744(0x38f)](_0x38adf0),this[_0x310744(0x4a8)]=_0x38adf0[_0x310744(0x5c6)][_0x310744(0x19e)]>0x0;if(_0x38adf0[_0x310744(0x5c6)]===undefined){if(_0x310744(0x3a6)!==_0x310744(0x3a6)){const _0x15e4ec=this[_0x310744(0x385)]();return _0x116523[_0x310744(0x232)](this['x'],_0x15e4ec);}else VisuMZ[_0x310744(0x568)]['CustomPageConditions'][_0x310744(0x38f)](_0x38adf0);}if(_0x38adf0[_0x310744(0x5c6)][_0x310744(0x19e)]>0x0)return $gameMap['event'](this[_0x310744(0x53a)])&&VisuMZ[_0x310744(0x568)]['CustomPageConditions'][_0x310744(0x19b)](_0x38adf0[_0x310744(0x5c6)],this['_eventId']);return!![];},VisuMZ['EventsMoveCore'][_0x2c0583(0x2da)]=Game_Troop[_0x2c0583(0x4ff)][_0x2c0583(0x5f6)],Game_Troop[_0x2c0583(0x4ff)][_0x2c0583(0x5f6)]=function(_0x41a3af){const _0xae9c24=_0x2c0583;var _0x74fc8=VisuMZ[_0xae9c24(0x568)]['Game_Troop_meetsConditionsCPC']['call'](this,_0x41a3af);return _0x74fc8&&this[_0xae9c24(0x39b)](_0x41a3af);},Game_Troop[_0x2c0583(0x4ff)][_0x2c0583(0x39b)]=function(_0x558741){const _0x5ce709=_0x2c0583;_0x558741[_0x5ce709(0x5c6)]===undefined&&VisuMZ[_0x5ce709(0x568)][_0x5ce709(0x1b2)]['loadCPC'](_0x558741);if(_0x558741[_0x5ce709(0x5c6)][_0x5ce709(0x19e)]>0x0)return VisuMZ[_0x5ce709(0x568)][_0x5ce709(0x1b2)][_0x5ce709(0x19b)](_0x558741[_0x5ce709(0x5c6)],0x0);return!![];},VisuMZ['EventsMoveCore'][_0x2c0583(0x200)]=Game_Event[_0x2c0583(0x4ff)]['locate'],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x4e1)]=function(_0x1750ef,_0x2e76d2){const _0x4544fe=_0x2c0583;VisuMZ[_0x4544fe(0x568)][_0x4544fe(0x200)][_0x4544fe(0x30e)](this,_0x1750ef,_0x2e76d2),this['_randomHomeX']=_0x1750ef,this['_randomHomeY']=_0x2e76d2;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x33b)]=Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x2ff)],Game_Event[_0x2c0583(0x4ff)][_0x2c0583(0x2ff)]=function(){const _0x1d00c3=_0x2c0583,_0x251ac5=$gameMap[_0x1d00c3(0x2e5)](this['x'],this['y'],this[_0x1d00c3(0x549)],this[_0x1d00c3(0x4b2)]),_0x22df36=_0x251ac5*(this[_0x1d00c3(0x382)]||0x0);Math['random']()>=_0x22df36?VisuMZ[_0x1d00c3(0x568)]['Game_Event_moveTypeRandom']['call'](this):this[_0x1d00c3(0x5d7)]();},Game_Event['prototype'][_0x2c0583(0x5d7)]=function(){const _0x37259d=_0x2c0583,_0x31a568=this[_0x37259d(0x627)](this[_0x37259d(0x549)]),_0x5abdfe=this['deltaYFrom'](this[_0x37259d(0x4b2)]);if(Math['abs'](_0x31a568)>Math['abs'](_0x5abdfe))this[_0x37259d(0x3c1)](_0x31a568>0x0?0x4:0x6),!this['isMovementSucceeded']()&&_0x5abdfe!==0x0&&this['moveStraight'](_0x5abdfe>0x0?0x8:0x2);else{if(_0x5abdfe!==0x0){this[_0x37259d(0x3c1)](_0x5abdfe>0x0?0x8:0x2);if(!this[_0x37259d(0x2bc)]()&&_0x31a568!==0x0){if('HoUhw'==='WScBR'){if(!_0xc119cf[_0x37259d(0x660)]())return;_0x370347[_0x37259d(0x2f5)](_0x50dd7b,_0x460eb4);let _0x2760a2=0x0;_0x2760a2+=_0x459b2c[_0x37259d(0x56c)],_0x2760a2+=_0x226f4f[_0x37259d(0x4cc)]*0x3c,_0x2760a2+=_0x1779d1['Minutes']*0x3c*0x3c,_0x2760a2+=_0x52f2f9[_0x37259d(0x5e8)]*0x3c*0x3c*0x3c,_0x133a0[_0x37259d(0x1ce)](_0x2760a2);}else this[_0x37259d(0x3c1)](_0x31a568>0x0?0x4:0x6);}}}},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x281)]=Game_Interpreter[_0x2c0583(0x4ff)]['updateWaitMode'],Game_Interpreter[_0x2c0583(0x4ff)][_0x2c0583(0x1d3)]=function(){const _0x16b256=_0x2c0583;if(this[_0x16b256(0x199)]===_0x16b256(0x309)){if(window[this[_0x16b256(0x1fb)]])'fvkHB'!==_0x16b256(0x365)?(this[_0x16b256(0x199)]='',this[_0x16b256(0x278)]()):this[_0x16b256(0x435)](_0x479689[_0x16b256(0x53a)]);else{if('RLUQF'!=='OdGyy')return!![];else{const _0x46da70=this[_0x16b256(0x2e4)][_0x16b256(0x385)]();let _0x447f1e=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x16b256(0x2e4)][_0x16b256(0x64c)]&&(_0x447f1e=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x447f1e[_0x46da70]-0x2)/0x2;}}}else return VisuMZ[_0x16b256(0x568)][_0x16b256(0x281)][_0x16b256(0x30e)](this);},VisuMZ['EventsMoveCore'][_0x2c0583(0x461)]=Game_Interpreter[_0x2c0583(0x4ff)][_0x2c0583(0x19f)],Game_Interpreter[_0x2c0583(0x4ff)][_0x2c0583(0x19f)]=function(){const _0x5e5a6f=_0x2c0583,_0x3fae98=$gameMap&&this[_0x5e5a6f(0x53a)]?$gameMap[_0x5e5a6f(0x254)](this['_eventId']):null;$gameTemp[_0x5e5a6f(0x28d)](_0x3fae98);const _0x34ae6c=VisuMZ[_0x5e5a6f(0x568)][_0x5e5a6f(0x461)][_0x5e5a6f(0x30e)](this);return $gameTemp['clearSelfTarget'](),_0x34ae6c;},VisuMZ['EventsMoveCore'][_0x2c0583(0x5c8)]=Game_Interpreter[_0x2c0583(0x4ff)]['command357'],Game_Interpreter[_0x2c0583(0x4ff)][_0x2c0583(0x350)]=function(_0x358b61){const _0x34b7e9=_0x2c0583;return $gameTemp[_0x34b7e9(0x602)](this),VisuMZ[_0x34b7e9(0x568)][_0x34b7e9(0x5c8)]['call'](this,_0x358b61);},Game_Interpreter[_0x2c0583(0x4ff)][_0x2c0583(0x533)]=function(_0x3babf9){const _0x20da18=_0x2c0583;this[_0x20da18(0x5d2)]=_0x3babf9;const _0x4106dc='Map%1.json'[_0x20da18(0x2d3)](_0x3babf9[_0x20da18(0x42b)][_0x20da18(0x2d1)](0x3));this[_0x20da18(0x1fb)]='$callEventMap'+Graphics[_0x20da18(0x2b0)]+'_'+this[_0x20da18(0x65a)](),DataManager[_0x20da18(0x238)](this[_0x20da18(0x1fb)],_0x4106dc);if(window[this[_0x20da18(0x1fb)]])'AOsZJ'===_0x20da18(0x648)?this['startCallEvent']():this['_target'][_0x20da18(0x2e4)][_0x20da18(0x1ba)]()&&(this['x']+=_0x3accc5['EventsMoveCore'][_0x20da18(0x4d1)][_0x20da18(0x3bc)][_0x20da18(0x3a2)],this['y']+=_0x4ef729['EventsMoveCore'][_0x20da18(0x4d1)]['VS8'][_0x20da18(0x521)]);else{if(_0x20da18(0x23e)!=='VVGbB')this['setWaitMode'](_0x20da18(0x309));else{const _0x20c98a=/\$gameVariables\.value\((\d+)\)/gi,_0x4593f1=/\\V\[(\d+)\]/gi;while(_0x519399[_0x20da18(0x524)](_0x20c98a)){_0x1a162a=_0x542120[_0x20da18(0x472)](_0x20c98a,(_0x5b58b2,_0x2c1187)=>_0x4fd4c7[_0x20da18(0x2f7)](_0x5c46ef(_0x2c1187)));}while(_0xc44f6c['match'](_0x4593f1)){_0x1a0724=_0x14e8ea[_0x20da18(0x472)](_0x4593f1,(_0x39e16f,_0x4dd167)=>_0x3c4302[_0x20da18(0x2f7)](_0x4ff65e(_0x4dd167)));}return _0x5acde1;}}},Game_Interpreter[_0x2c0583(0x4ff)][_0x2c0583(0x278)]=function(){const _0x1f2a08=_0x2c0583,_0x3e483d=this[_0x1f2a08(0x5d2)],_0x147f48=window[this[_0x1f2a08(0x1fb)]],_0x32f913=_0x147f48[_0x1f2a08(0x631)][_0x3e483d[_0x1f2a08(0x65a)]];if(_0x32f913&&_0x32f913[_0x1f2a08(0x2b9)][_0x3e483d[_0x1f2a08(0x41b)]-0x1]){if(_0x1f2a08(0x5ea)!==_0x1f2a08(0x5ea)){_0x4d8f98=this['_opacity']-_0x387819,this[_0x1f2a08(0x323)](_0x40f72e['clamp'](0x0,0xff));if(this['_opacity']>0x0)this['_moveRouteIndex']--;}else{const _0x418b16=_0x32f913[_0x1f2a08(0x2b9)][_0x3e483d[_0x1f2a08(0x41b)]-0x1]['list'];this['setupChild'](_0x418b16,this['eventId']());}}window[this[_0x1f2a08(0x1fb)]]=undefined,this[_0x1f2a08(0x1fb)]=undefined,this[_0x1f2a08(0x5d2)]=undefined;};function _0x3467(){const _0x1094b2=['resume','_commonEventId','forceCarrying','Enable','bphJZ','activationRegionList','BufferY','checkValidEventerMap','tavvK','Game_Map_event','shadowX','EXCLAMATION','setupSaveEventLocations','_regionRules','Self\x20Variable\x20%1','getDirectionToPoint','MXZVE','RIGHT\x20TO\x20LEFT','startMapCommonEventOnOKTarget','isAdvancedSwitch','isPlayerForceHidden','VehicleDock','Window_EventItem_onCancel','_moveSynch','IGilx','isSelfVariable','isLandOk','isPlayerForceShown','icKCl','deltaXFrom','Game_Map_parallelCommonEvents','executeMove','isSmartEventCollisionOn','_shadowGraphic','requestBalloon','_forceShowFollower','Game_Timer_initialize','Ristk','setPlayerDiagonalSetting','events','eraseEvent','ITEiN','trim','MorphEventTo','UTuJG','ysnMm','kPUFs','EXyYQ','_scene','sVzEM','Game_CharacterBase_moveDiagonally','getMapSpawnedEventData','UOkDY','realMoveSpeed','EventTimerExpireClear','Step1EventId','_DisablePlayerControl','_moveSpeed','Game_Vehicle_isLandOk','EkUUR','Scene_Load_onLoadSuccess','WcGvC','AOsZJ','Step2MapId','_eventMorphData','CQaQC','_mirrorSprite','SelfSwitches','Self\x20Switch\x20%1','setPose','updateEventIconSprite','isJumping','APoMW','_realY','checkNeedForPeriodicRefresh','SelfSwitchID','BitmapSmoothing','parallelCommonEvents','Window_Message_startMessage','isMoveOnlyRegionPassable','eventId','EnableDir8','EventTimerExpireEvent','byDNf','contentsOpacity','tileHeight','isWorking','_forceDashing','xdpio','HhOEr','Ppzsn','min','clearSpriteOffsets','lYBzR','yjydW','reverseDir','determineEventOverload','MorphEventRemove','SXzrb','_visiblePlayerX','GKkRt','map','clearDestination','MessageCore','uWeDm','SuccessSwitchId','processMoveSynchRandom','Game_Event_isCollidedWithPlayerCharacters','hasClickTrigger','canStartLocalEvents','_lastPluginCommandInterpreter','%1Forbid','Visible','KiJbO','fnmPM','_chaseOff','characterIndex','Game_Event_setupPageSettings','_waitMode','Game_CharacterBase_screenY','metCPC','mirror\x20horz','selfValue','length','executeCommand','isDashing','setPlayerControlDisable','_eventCopyData','zoomScale','Disable','followers','YmJEy','isCollidedWithPlayerCharacters','tWrkU','isShadowVisible','IconBufferX','setFrame','indexOf','Game_Message_add','Game_Follower_chaseCharacter','Setting','jHYIX','isAllowCharacterTilt','CustomPageConditions','tzsop','Eupmb','CommonEventID','isOnLadder','ShipSpeed','uQQpt','Movement','isSpriteVS8dir','OffsetY','_eventScreenY','screenY','Sprite_Character_update','scrolledY','getInputDir8','setupSpawnTest','isSpawnedEvent','setAllowEventAutoMovement','onClickTrigger','HGzNW','VariableGetSelfVariableID','setupEvents','znQdZ','isEventRunning','ZlTXl','SlowerSpeed','updatePatternEventsMoveCore','bRPJk','gainFrames','posEventsMoveCore','hQLnX','IconSize','copy','updateWaitMode','drawText','DfeZe','EventLabelRefresh','isCollidedWithEvents','VisuMZ_2_DragonbonesUnion','Passability','isAllowEventAutoMovement','exit','_moveAllowPlayerCollision','_eventCache','_selfEvent','turnAwayFromCharacter','Game_Followers_isVisible','TAvgL','_forceHidePlayer','setupFollowerVisibilityOverrides','_addedHitbox','hsWIw','dlFzs','_cacheVisibility','Game_Vehicle_isMapPassable','HURT','random','VisuMZ_Setup_Preload_Map','initFollowerController','characterPatternY','NutUx','_forceShowPlayer','create','moveTowardCharacter','turnAwayFromPoint','EnableDashTilt','updatePose','opacity','STR','YXRdN','radius','Game_Event_findProperPageIndex','prepareSpawnedEventAtRegion','_callEventMap','RIGHT','_counter','MHVMs','RemovePreserve','Game_Event_locate','onDatabaseLoaded','target','%1Dock','Game_Character_processMoveCommand','wSqxF','Game_Vehicle_initMoveSpeed','Game_Player_isDashing','MapSwitches','row','adjustDir8MovementSpeed','randomInt','uzeft','Game_Player_executeMove','status','Game_Character_setMoveRoute','Rope','_selfTargetNumberInput','createLabelWindowForTarget','description','getPlayerDiagonalSetting','hwdvI','zKVUg','name','LOWER\x20LEFT','deltaYFrom','Hxsft','innerWidth','destinationX','_eventScreenX','execute','Game_Map_events','xyjvI','ARRAYSTR','Player','prepareSpawnedEventAtTerrainTag','getControlledFollowerID','start','_shadowOpacity','isAutoBufferIcon','createIconSprite','Game_CharacterBase_screenX','processMoveRouteJumpForward','update','isTargetEventValidForLabelWindow','hasMoveOnlyRegions','TerrainTags','917076WaXBeh','type','_activationProximity','roundXWithDirection','smooth','processMoveRouteSelfVariable','meetsSwitchCondition','zWuvx','FvpvP','loadDataFile','checkExistingEntitiesAt','splice','characterPatternYVS8','eventsXyNt','SpriteBased','ZvgXd','Game_Event_event','Game_CharacterBase_pattern','Game_CharacterBase_updatePattern','_proxyWindow','fgmak','createLabelWindows','TRUE','processMoveCommand','AutoMoveEvents','ITEM','rbDjz','JWjOZ','LIGHT\x20BULB','getInputDirection','_needsRefresh','PKYKg','Game_CharacterBase_realMoveSpeed','Game_CharacterBase_isTransparent','QdcEd','Game_Event_meetsConditionsCPC','disable','event','registerCommand','processMoveRouteJumpToCharacter','isRegionForbidPass','Game_System_initialize','Game_CharacterBase_canPass','turnLeft90','mainFontSize','VICTORY','_visibleEventX','processMoveRouteFadeIn','_working','region','setStopFollowerChasing','getPose','VariableId','DashModifier','setDestination','varCe','updateEventsMoveCoreTagChanges','%1Allow','terrainTag','Game_Troop_meetsConditions','isMapSwitch','OpacitySpeed','charAt','DOpUz','follower','yxSGC','lastSpawnedEventID','HMPH','SmRZV','MUSIC-NOTE','FLIap','switch1Id','uCNzi','startCallEvent','XwEMi','switch2Id','correctFacingDirection','processMoveRouteJumpTo','_pose','Game_Switches_setValue','bufferX','AIlbA','Game_Interpreter_updateWaitMode','findProperPageIndex','_PreservedEventMorphData','6EPyNAi','_inputTime','jLEjo','processMoveRouteMoveToCharacter','aiBaX','hKRDY','_eventErased','add','fontFace','registerSelfTarget','isPreventSelfMovement','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','pNCki','xqzYg','jump','_saveEventLocations','setTileBitmap','defaultFontSize','hrWSD','RandomMoveWeight','removeTemporaryMapSpawnedEvents','toLowerCase','character','_spriteOffsetY','rYuIl','isSaveEventLocation','setMapValue','updateEventCustomZ','VisibleEventLabels','posNt','version','isNormalPriority','StrictCollision','ANGER','scale','EMpos','push','iconIndex','CaQTd','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','getPosingCharacterIndex','uuQmY','isMapPassable','updateMoveSynch','frameCount','isTriggerIn','tcenv','%1%2','Value','setCommonEvent','horizontal\x20mirror','initEventsMoveCoreEffects','QRqkK','pages','_opacity','KmXhw','isMovementSucceeded','dPeQl','Game_Player_checkEventTriggerHere','Game_Message_setNumberInput','setBalloonPose','switchId','SWEAT','initMembersEventsMoveCore','_alwaysUpdateMove','rrknc','SLEEP','Game_Map_setup','PlayerIconDelete','vBMfV','kcdla','CLuKT','BXyrr','SpawnEventAtTerrainTag','regionId','iconSize','meetActivationProximityConditions','padZero','Game_CommonEvent_isActive','format','Spriteset_Map_createLowerLayer','SelfSwitchABCD','processMoveRouteHugWall','removeMorph','NOuwx','ATbDT','Game_Troop_meetsConditionsCPC','toUpperCase','template','drawTextEx','square','SPIN\x20COUNTERCLOCKWISE','EventID','hExzB','_clickTrigger','setFrames','_character','distance','createContents','command108','HEART','Game_Player_isMapPassable','EventLocationDelete','Game_Map_update','JasiR','neQRO','findTargetSprite','vertical\x20mirror','isRegionAllowPass','Game_Variables_setValue','ZFVqk','isSelfSwitch','AutoBalloon','ConvertParams','$preloadedMap_%1','value','tsYdT','changeSpeed','_EventsMoveCoreSettings','STRUCT','QUESTION','ARRAYSTRUCT','setItemChoice','moveTypeRandom','SwitchGetSelfSwitchABCD','40sYUnQf','_selfTargetItemChoice','opacitySpeed','Game_SelfSwitches_setValue','_data','SPIN\x20CCW','jMDbt','turn180','CallEvent','Game_CharacterBase_setDirection','VisuMZ_1_MessageCore','gOQNG','hasStepAnime','call','setEventIconData','sLHNn','Game_Event_updateSelfMovement','EventTimerSpeed','bind','FollowerSetControl','_frames','Window_NumberInput_processOk','UBCGv','updatePattern','Speed','needsUpdate','process_VisuMZ_EventsMoveCore_Switches_Variables','oDwhg','startEncounterEffect','Window_ScrollText_startMessage','iconHeight','default','Step2Preserve','offsetY','setOpacity','EjyeJ','onLoadSuccess','Game_Event_checkEventTriggerAuto','KNEEL','Map\x20%1\x20Switch\x20%2','constructor','hasAdvancedSwitchVariable','NWauc','WNkYp','none','WtmGG','RegionOk','tTujS','width','variableId','setSelfValue','addChild','FollowerID','findDirectionTo','UPPER\x20RIGHT','pageIndex','Game_Event_meetsConditions','savePreservedMorphEventDataKey','Game_Event_moveTypeRandom','contents','YdYMg','reXdU','_lastMovedDirection','destinationY','rotation','meetActivationRegionConditions','All','clamp','_characterIndex','_advancedSwitchVariable','padding','unlockEvent','PostMorphJS','TemplateName','clearEventCache','DiagonalSpeedMultiplier','createCharacterShadow','processOk','_filename','command357','isMoving','isTile','roundX','updateShadowChanges','getSelfTarget','createSpawnedEvent','onExpire','processMoveSynchApproach','AirshipSpeed','characterPatternYBasic','getPosingCharacterPattern','OmDwn','_vehicleType','isPlaytest','TWPXy','uPefH','filename','isVisible','hLCfI','deleteIconsOnEventsDataKey','eRHSd','INVkD','_moveRoute','LGYRX','Game_Map_isDashDisabled','left','_eventOverloadThreshold','clearStepPattern','processMoveRouteBalloon','_mapId','adjustMoveSynchOpacityDelta','_poseDuration','Dock','Collision','gWFFn','IconIndex','isDestinationValid','_spawnedEvents','_eventLabelOffsetY','NOTE','referEvent','WalkForbid','_forceCarrying','deleteIconsOnEventsData','bufferY','MgGZK','setupCopyEvent','Game_CharacterBase_isDashing','mLArC','_randomMoveWeight','PYmId','checkRegionEventTrigger','direction','firstSpawnedEventID','_stepPattern','isStopFollowerChasing','UWFjP','setup','Sprite_Character_setCharacterBitmap','processDrawIcon','filter','ShowShadows','loadCPC','Sprite_Character_initMembers','timer','ZgsNA','checkEventTriggerHere','lastMovedDirection','determineCommonEventsWithCPC','SpawnEventDespawnTerrainTags','player','inBattle','EventAutoMovement','isPlayerControlDisabled','CPCsMet','updateBitmapSmoothing','1525307FgGJbD','TiltLeft','parameters','PageId','GhivK','BalloonOffsetX','switch2Valid','moveSynchTarget','processMoveSynchCustom','ZUJzF','LyuFz','TerrainTag','isPressed','visible','_EventIcons','loadSystem','screenX','_realX','canPass','roundY','SPIN\x20CLOCKWISE','visibleRange','switch1Valid','JhsbF','mapValue','deleteSavedEventLocation','processMoveRoutePatternLock','EyBjj','custom','eventsXy','PosY','VS8','Boat','isShadowShrink','USER-DEFINED\x202','UNTITLED','moveStraight','updateScale','Game_Follower_initialize','Map%1-Event%2','Forbid','_expireCommonEvent','_saveEventLocation','RegionTouch','MoveRouteIndex','SUbam','Game_CharacterBase_initMembers','spawnEventId','EventTimerFramesGain','getPreservedMorphEventData','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','AllForbid','hideShadows','startMapCommonEventOnOK','PlayerMovementDiagonal','_eventLabelOffsetX','updateOpacity','height','characterName','trigger','EVAL','_spriteOffsetX','zcQPn','setupRegionRestrictions','processMoveSynchMirrorHorz','SILENCE','PosX','Label','Map%1.json','getSavedEventLocation','setEventLabelsVisible','activationProximityDistance','Mckff','activationProximityType','KUudF','isPassableByAnyDirection','updateRoutineMove','LIGHT-BULB','shadowY','moveAwayFromPoint','VisibleRange','_spriteset','isAirshipPassable','setChaseOff','outlineColor','Game_Map_unlockEvent','mimic','_periodicRefreshTimer','isSpawnHitboxCollisionOk','PCmcy','convertSelfVariableValuesInScriptCall','_eventIcon','apply','cwMFO','isTransparent','iNRwl','bDdXF','fSPuP','clearPose','151299QmYqCy','Game_Event_start','isTurnInPlace','down','pos','log','stop','moveAwayFromCharacter','roundYWithDirection','MUSIC\x20NOTE','tileWidth','createProxyWindow','right','VigaF','createShadow','pXplY','updateParallel','4216735kYOJbe','nFWsQ','LOWER\x20RIGHT','setMovementSuccess','updateText','getDirectionFromPoint','clearDashing','createBitmap','BQzvt','_diagonalSupport','pageId','_shadowSprite','SpawnEventDespawnRegions','240292dRMhgW','labelWindowRange','_activationProximityAutoTriggerBypass','_spawnData','OZzMd','hasCPCs','max','MapID','QatRx','USER-DEFINED\x204','pause','processMoveRouteStepToCharacter','Button','mapId','isDashingEnabled','VMfMC','advancedValue','_type','moveTowardPoint','setCharacterBitmap','Visibility','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','processMoveSynchAway','despawnEventId','dJiJG','_characterName','Chase','areFollowersForceShown','Minutes','MULTIPLY','processMoveRouteTeleportTo','Icon','Vehicle','canMove','USER-DEFINED\x203','xYUyJ','_event','vehicle','clearCarrying','dir8','isActive','GetMoveSynchTarget','CDxSP','Allow','RegionOkTarget','itemPadding','prepareSpawnedEventAtXY','meetsCPC','_stopCount','mirror\x20horizontal','deleteEventLocation','OperateValues','Window_EventItem_onOk','labelWindowText','includes','_erased','initMoveSpeed','_speed','Game_Player_getInputDirection','isSupportDiagonalMovement','autoEventIconBuffer','IconSet','moveByInput','frontX','FontSize','List','SPIN\x20ANTICLOCKWISE','Game_Interpreter_executeCommand','unlock','parent','PreloadedMaps','EventTemplates','StopAutoMoveMessages','isEventTest','checkActivationProximity','Toggle','setDirection','backY','qTODZ','conditions','_selfTarget','YLWbo','drawIcon','isSaveEventLocations','replace','checkEventTriggerEventsMoveCore','firstSpawnedEvent','removeChild','DlJQD','_customZ','reverse','WGqVa','timerText','despawnTerrainTags','VtryI','Scene_Map_startEncounterEffect','Game_Interpreter_character','_interpreter','hasEventIcon','_eventPageIndex','xmYqJ','3FAVlPf','some','getPosingCharacterDirection','XlqFE','onCancel','characterIndexVS8','code','TIOqe','clear','SwitchId','floor','Sprite_Balloon_updatePosition','SpawnEventAtXY','Spriteset_Map_createShadow','_eventIconSprite','MoveAllSynchTargets','away','TargetSwitchId','_trigger','Game_Player_increaseSteps','FOBkm','hMoKQ','_tilemap','Region%1','erase','isDashingAndMoving','Game_Event_updateParallel','MtSzJ','lastSpawnedEvent','_spawnPreserved','_labelWindows','updateShadow','_duration','PreCopyJS','gZnxF','front','XJFIl','_CPCs','bitmap','IconBufferY','updatePosition','pattern','KMjMz','USER-DEFINED\x201','isNearTheScreen','isAnyEventStarting','Inble','_randomHomeY','kXhwg','_MapSpawnedEventData','isEventOverloaded','getLastPluginCommandInterpreter','processMoveRouteStepTo','SPIN\x20CW','sauTG','LEFT\x20TO\x20RIGHT','updateSelfMovement','setupPageSettings','Game_Temp_setDestination','_pageIndex','note','return\x200','FjaxO','fVnSt','WalkAllow','OctAB','Game_Enemy_meetsSwitchCondition','Gtnnw','_followerChaseOff','EventTimerPause','isRegionDockable','isAdvancedVariable','setMoveSpeed','Seconds','zuPpE','IconBlendMode','deltaY','processMoveRouteMoveRepeat','Settings','createLowerLayer','absDistance','isBoat','mirror\x20vertical','IzhEn','Game_Map_refresh','startMessage','JLWmU','LEFT','delay','deleteSavedEventLocationKey','COBWEB','Name','_seconds','morphInto','locate','reserveCommonEvent','shadowFilename','_PlayerDiagonalSetting','pUGKr','split','isAirship','_text','SKUQa','JSON','Game_Event_initialize','refreshIfNeeded','text','SelfVariables','_labelWindow','Region','PNZqX','list','PostCopyJS','_pattern','Template','iconWidth','_patternLocked','processMoveRouteAnimation','veHZM','JbSbN','resetFontSettings','VLKkC','anchor','_hidden','prototype','AgmaA','PlayerMovementChange','directionOnLadderSpriteVS8dir','setDashingEnabled','vSYqs','requestAnimation','FZzqT','setPattern','Step2EventId','EMcyN','isBusy','despawnEverything','Game_Timer_onExpire','setNumberInput','despawnAtXY','FollowerSetTargetChase','convertVariableValuesInScriptCall','Map\x20%1\x20Variable\x20%2','canPassDiagonally','processMoveSynchMirrorVert','turnTowardCharacter','slice','Game_Variables_value','moveRouteIndex','_visiblePlayerY','nxIWA','getEventIconData','IDlHU','FALSE','isBattleTest','YsGcA','ZZZ','TTWDx','BalloonOffsetY','Sprite_Character_characterPatternY','bMquV','match','IDwca','hZegS','Game_CharacterBase_opacity','blendMode','setValue','DashingEnable','pfwAm','updateMove','isLabelVisible','OFF','_commonEvents','isEventClickTriggered','onOk','concat','pluginCommandCallEvent','BlendMode','Event','standing','createShadows','_cacheSystemVisible','_visibleEventY','_eventId','5840032GggDHB','checkEventTriggerAuto','Game_Timer_start','AdvancedVariables','deltaX','initEventsMoveCoreSettings','Qhhvc','initialize','processMoveCommandEventsMoveCore','getEventIconIndex','kElDF','xgSqU','FRUSTRATION','Hidden','_randomHomeX','saveEventLocation','1531770TndInK','KQEem','DefaultShadow','processMoveRouteMoveTo','switches','Scene_Boot_onDatabaseLoaded','refresh','checkCollisionKeywords','CYCFN','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','processMoveRouteSelfSwitch','isBigCharacter','updateEventMirrorSprite','isPassable','setMoveRoute','FFVtI','CarryPose','processMoveRouteStepFrom','regionList','SZkzL','_moveOnlyRegions','TiltVert','biteo','abs','moveSynchType','jzSyB','Game_Timer_stop','findDiagonalDirectionTo','createSpawnedEventWithData','EventsMoveCore','wZxtB','advancedFunc','HWLYM','Frames','checkSmartEventCollision','despawnRegions','Game_CharacterBase_characterIndex','Game_Switches_value','Sprite_Character_setTileBitmap','fontSize','setupPlayerVisibilityOverrides','variables','startMapCommonEventOnTouch','Kalls','boxWidth','setupMorphEvent','_cpc','ROUTE_SCRIPT','PreMorphJS','JWeyu','_needsPeriodicRefresh','FavorHorz','Direction','LklbJ','moveDiagonally','SPIN\x20ACW','isInVehicle','isPosing','airship','setupEventsMoveCoreNotetags','_moveRouteIndex','FollowerReset','isValid','Game_SelfSwitches_value','searchLimit','_dragonbones','clearSelfTarget','chaseCharacter','increaseSteps','areFollowersForceHidden','Game_Character_forceMoveRoute','setEventIconDataKey','forceMoveRoute','Game_CharacterBase_increaseSteps','VehicleAllow','MapVariables','dJMlr','initMembers','IBdcg','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_followerControlID','_SavedEventLocations','WXBTz','processMoveRouteSetIndex','ANNOYED','setupSpawn','dashSpeedModifier','EventLabelVisible','BoatSpeed','updateVS8BalloonOffsets','offsetX','updatePeriodicRefresh','Operation','_eventSpawnData','_screenZoomScale','vOkcB','parse','SpawnEventDespawnEventID','windowPadding','isMapVariable','EventIconDelete','addLoadListener','hUmYz','EventId','FAhiA','TOGGLE','TargetVariableId','EventLocationCreate','Game_CharacterBase_hasStepAnime','_characterSprites','initEventsMoveCore','150DnuRfs','Game_Player_checkEventTriggerThere','bArVp','EcYDm','BULB','of\x20Preloaded\x20Maps.\x0a\x0a','RJbJa','VehicleForbid','PostSpawnJS','FastForwardKey','turnRight90','...','CPC','return\x20%1','Game_Interpreter_PluginCommand','rkXOa','setupSpawnedEvents','ABlfP','General','AdvancedSwitches','round','COLLAPSE','cPqnq','processMoveSynch','_callEventData','setupEventsMoveCoreCommentTags','forceDashing','uPXKi','morphIntoTemplate','moveBackToRandomHome','_encounterEffectDuration','_paused','string','Game_CharacterBase_update','XkDMF','autosaveEventLocation','setControlledFollowerID','EcGJQ','_eventOverload','useCarryPoseForIcons','processMoveSynchReverseMimic','_target','SpawnEventDespawnAtXY','processMoveRouteFadeOut','_forceHideFollower','ljvCH','Hours','makeDeepCopy','DRwaY','BufferX','Stop','NwKDX','textSizeEx','rYHjF','isOnRope','NOwYu','Step1MapId','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','PlayerForbid','pBchZ','meetsConditions','processMoveSynchMimic','EventTimerFramesSet','isDashDisabled','resizeWindow','FnKQW','LOVE','Game_Event_clearPageSettings','eventLabelsVisible','registerSelfEvent','nBNBr','Letter','setLastPluginCommandInterpreter','MapId','gGLSQ','isRunning','executeMoveDir8','pMIwY','LIGHTBULB','ILrsw'];_0x3467=function(){return _0x1094b2;};return _0x3467();}function Game_CPCInterpreter(){const _0x31ef5c=_0x2c0583;this[_0x31ef5c(0x542)][_0x31ef5c(0x3f9)](this,arguments);};Game_CPCInterpreter[_0x2c0583(0x4ff)]=Object[_0x2c0583(0x1f0)](Game_Interpreter[_0x2c0583(0x4ff)]),Game_CPCInterpreter['prototype'][_0x2c0583(0x329)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype']['clear']=function(){const _0x4a8d28=_0x2c0583;Game_Interpreter['prototype'][_0x4a8d28(0x48b)][_0x4a8d28(0x30e)](this),this['_cpc']=![];},Game_CPCInterpreter[_0x2c0583(0x4ff)][_0x2c0583(0x21e)]=function(){const _0x323230=_0x2c0583;while(this[_0x323230(0x605)]()){if(_0x323230(0x422)!==_0x323230(0x422)){const _0xbb1230=this[_0x323230(0x5a8)][_0x323230(0x42b)],_0x173815=this[_0x323230(0x5a8)][_0x323230(0x65a)];return _0x3cdaf5[_0x323230(0x379)](_0xbb1230,_0x173815);}else this[_0x323230(0x19f)]();}},Game_CPCInterpreter['prototype'][_0x2c0583(0x2e7)]=function(_0x4ea030){const _0x354787=_0x2c0583;return Game_Interpreter[_0x354787(0x4ff)][_0x354787(0x2e7)]['call'](this,_0x4ea030),this['_comments']['some'](_0xfb9790=>_0xfb9790[_0x354787(0x524)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x354787(0x579)]=!![]),!![];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x47d)]=Scene_Map[_0x2c0583(0x4ff)][_0x2c0583(0x31d)],Scene_Map[_0x2c0583(0x4ff)][_0x2c0583(0x31d)]=function(){const _0x58c450=_0x2c0583;VisuMZ[_0x58c450(0x568)][_0x58c450(0x47d)][_0x58c450(0x30e)](this),this['_spriteset'][_0x58c450(0x3d1)]();},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x646)]=Scene_Load[_0x2c0583(0x4ff)][_0x2c0583(0x325)],Scene_Load['prototype'][_0x2c0583(0x325)]=function(){const _0x3edc02=_0x2c0583;if($gameMap)$gameMap[_0x3edc02(0x34b)]();VisuMZ[_0x3edc02(0x568)][_0x3edc02(0x646)][_0x3edc02(0x30e)](this);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x390)]=Sprite_Character['prototype'][_0x2c0583(0x598)],Sprite_Character[_0x2c0583(0x4ff)]['initMembers']=function(){const _0x177663=_0x2c0583;VisuMZ[_0x177663(0x568)][_0x177663(0x390)][_0x177663(0x30e)](this),this[_0x177663(0x2c3)](),this[_0x177663(0x228)]();},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x2c3)]=function(){const _0x38f7b3=_0x2c0583;this[_0x38f7b3(0x226)]=0xff;},Sprite_Character[_0x2c0583(0x4ff)]['createIconSprite']=function(){const _0x41afe2=_0x2c0583;this[_0x41afe2(0x491)]=new Sprite(),this[_0x41afe2(0x491)][_0x41afe2(0x4a9)]=ImageManager[_0x41afe2(0x3ac)](_0x41afe2(0x45b)),this[_0x41afe2(0x491)][_0x41afe2(0x4a9)][_0x41afe2(0x233)]=![],this[_0x41afe2(0x491)][_0x41afe2(0x1ab)](0x0,0x0,0x0,0x0),this[_0x41afe2(0x491)][_0x41afe2(0x4fd)]['x']=0.5,this[_0x41afe2(0x491)][_0x41afe2(0x4fd)]['y']=0x1,this[_0x41afe2(0x334)](this[_0x41afe2(0x491)]);},Sprite_Character['prototype'][_0x2c0583(0x1ba)]=function(){const _0x998777=_0x2c0583;return this['_characterName']&&this[_0x998777(0x437)][_0x998777(0x524)](/\[VS8\]/i);},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x227)]=function(){const _0x348105=_0x2c0583;return this[_0x348105(0x1ba)]()&&VisuMZ['EventsMoveCore'][_0x348105(0x4d1)]['VS8']['AutoBuffer'];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x1be)]=Sprite_Character['prototype']['update'],Sprite_Character['prototype']['update']=function(){const _0xb57f9d=_0x2c0583;VisuMZ['EventsMoveCore'][_0xb57f9d(0x1be)][_0xb57f9d(0x30e)](this);VisuMZ[_0xb57f9d(0x568)][_0xb57f9d(0x4d1)][_0xb57f9d(0x1b9)][_0xb57f9d(0x1f3)]&&this['updateTilt']();if(this['_shadowSprite']){if(_0xb57f9d(0x569)!=='wZxtB')return this['isOnLadder']()&&this[_0xb57f9d(0x269)]()===_0xe30306[_0xb57f9d(0x568)][_0xb57f9d(0x4d1)][_0xb57f9d(0x3a8)]['Rope'];else this[_0xb57f9d(0x4a2)]();}this['_eventIconSprite']&&this[_0xb57f9d(0x650)](),this[_0xb57f9d(0x29f)](),this[_0xb57f9d(0x557)]();},VisuMZ['EventsMoveCore'][_0x2c0583(0x571)]=Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x294)],Sprite_Character['prototype'][_0x2c0583(0x294)]=function(){const _0xd15497=_0x2c0583;VisuMZ['EventsMoveCore'][_0xd15497(0x571)][_0xd15497(0x30e)](this),this[_0xd15497(0x4a9)][_0xd15497(0x5b0)](this[_0xd15497(0x39c)][_0xd15497(0x313)](this));},VisuMZ[_0x2c0583(0x568)]['Sprite_Character_setCharacterBitmap']=Sprite_Character['prototype'][_0x2c0583(0x431)],Sprite_Character['prototype']['setCharacterBitmap']=function(){const _0x43f843=_0x2c0583;VisuMZ[_0x43f843(0x568)][_0x43f843(0x38b)][_0x43f843(0x30e)](this),this[_0x43f843(0x4a9)]['addLoadListener'](this['updateBitmapSmoothing']['bind'](this));},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x39c)]=function(){const _0x8ecd86=_0x2c0583;if(!this[_0x8ecd86(0x4a9)])return;this[_0x8ecd86(0x4a9)][_0x8ecd86(0x233)]=!!VisuMZ['EventsMoveCore'][_0x8ecd86(0x4d1)][_0x8ecd86(0x1b9)][_0x8ecd86(0x656)];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x522)]=Sprite_Character['prototype'][_0x2c0583(0x1ed)],Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x1ed)]=function(){const _0x24a12c=_0x2c0583;return this[_0x24a12c(0x1ba)]()?this[_0x24a12c(0x23b)]():this[_0x24a12c(0x35a)]();},Sprite_Character['prototype'][_0x2c0583(0x23b)]=function(){const _0x5884d7=_0x2c0583,_0x489821=this['_character'][_0x5884d7(0x385)]();let _0x56f39b=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x5884d7(0x2e4)][_0x5884d7(0x64c)]&&(_0x56f39b=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x56f39b[_0x489821]-0x2)/0x2;},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x35a)]=function(){const _0x590af2=_0x2c0583;let _0x2936aa=this['_character']['direction']();if(this[_0x590af2(0x2e4)][_0x590af2(0x64c)]){if(_0x2936aa===0x4)_0x590af2(0x426)!==_0x590af2(0x426)?(this[_0x590af2(0x5a6)](),_0xb8895f[_0x590af2(0x568)][_0x590af2(0x2eb)][_0x590af2(0x30e)](this,_0x5a3e7d)):_0x2936aa=0x6;else{if(_0x2936aa===0x6){if(_0x590af2(0x249)!==_0x590af2(0x3e7))_0x2936aa=0x4;else{if(!_0x39d8d1[_0x590af2(0x42c)]())return!![];return _0x506f37[_0x590af2(0x568)]['Game_Map_isDashDisabled'][_0x590af2(0x30e)](this);}}}}return(_0x2936aa-0x2)/0x2;},Sprite_Character[_0x2c0583(0x4ff)]['updateTilt']=function(){const _0x4ff5c6=_0x2c0583;this[_0x4ff5c6(0x341)]=0x0;if(this[_0x4ff5c6(0x1b1)]()){if(_0x4ff5c6(0x609)!==_0x4ff5c6(0x609)){if(_0x27c874)return _0x511322;}else{const _0x4cc001=VisuMZ[_0x4ff5c6(0x568)][_0x4ff5c6(0x4d1)][_0x4ff5c6(0x1b9)],_0x206df3=this['_character']['direction']();let _0x1232e9=0x0;if([0x1,0x4,0x7][_0x4ff5c6(0x454)](_0x206df3))_0x1232e9=_0x4cc001[_0x4ff5c6(0x39e)];if([0x3,0x6,0x9][_0x4ff5c6(0x454)](_0x206df3))_0x1232e9=_0x4cc001['TiltRight'];[0x2,0x8][_0x4ff5c6(0x454)](_0x206df3)&&(_0x4ff5c6(0x194)===_0x4ff5c6(0x479)?(_0x3fe287[_0x4ff5c6(0x568)][_0x4ff5c6(0x496)]['call'](this),_0x3d0dd6['MoveAllSynchTargets'](0x0)):_0x1232e9=[-_0x4cc001[_0x4ff5c6(0x560)],0x0,_0x4cc001[_0x4ff5c6(0x560)]][this['_character'][_0x4ff5c6(0x4ac)]()]);if(this['_reflection'])_0x1232e9*=-0x1;this[_0x4ff5c6(0x341)]=_0x1232e9;}}},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x1b1)]=function(){const _0xfdf46e=_0x2c0583;if(this[_0xfdf46e(0x58c)])return![];return this[_0xfdf46e(0x2e4)][_0xfdf46e(0x49c)]()&&!this[_0xfdf46e(0x2e4)][_0xfdf46e(0x1b6)]()&&!this['_character']['isPosing']()&&this[_0xfdf46e(0x544)]()===0x0;},Sprite_Character[_0x2c0583(0x4ff)]['updateShadow']=function(){const _0x57719e=_0x2c0583;this[_0x57719e(0x41c)]['x']=this[_0x57719e(0x2e4)][_0x57719e(0x614)](),this[_0x57719e(0x41c)]['y']=this[_0x57719e(0x2e4)][_0x57719e(0x3eb)](),this['_shadowSprite']['opacity']=this[_0x57719e(0x1f5)],this[_0x57719e(0x41c)][_0x57719e(0x3aa)]=this[_0x57719e(0x2e4)][_0x57719e(0x1a9)](),this[_0x57719e(0x41c)][_0x57719e(0x4fe)]=this[_0x57719e(0x4fe)],!this[_0x57719e(0x2e4)]['isShadowShrink']()?(this[_0x57719e(0x41c)]['scale']['x']=Math[_0x57719e(0x665)](0x1,this[_0x57719e(0x41c)]['scale']['x']+0.1),this[_0x57719e(0x41c)][_0x57719e(0x2a6)]['y']=Math[_0x57719e(0x665)](0x1,this[_0x57719e(0x41c)][_0x57719e(0x2a6)]['y']+0.1)):(this['_shadowSprite'][_0x57719e(0x2a6)]['x']=Math[_0x57719e(0x424)](0x0,this[_0x57719e(0x41c)][_0x57719e(0x2a6)]['x']-0.1),this['_shadowSprite'][_0x57719e(0x2a6)]['y']=Math[_0x57719e(0x424)](0x0,this[_0x57719e(0x41c)][_0x57719e(0x2a6)]['y']-0.1));},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x650)]=function(){const _0x57f108=_0x2c0583,_0x3afcfc=this[_0x57f108(0x491)],_0xa065ed=this[_0x57f108(0x544)]();if(_0xa065ed<=0x0){if(_0x57f108(0x441)===_0x57f108(0x441))return _0x3afcfc[_0x57f108(0x1ab)](0x0,0x0,0x0,0x0);else{if(this[_0x57f108(0x293)]===_0x48a4e9)this['setupSaveEventLocations']();return this[_0x57f108(0x293)];}}else{if(_0x57f108(0x4ad)===_0x57f108(0x4ad)){const _0xed49fe=ImageManager['iconWidth'],_0x5112c4=ImageManager[_0x57f108(0x31f)],_0x3aa450=_0xa065ed%0x10*_0xed49fe,_0x2123a3=Math[_0x57f108(0x48d)](_0xa065ed/0x10)*_0x5112c4;_0x3afcfc[_0x57f108(0x1ab)](_0x3aa450,_0x2123a3,_0xed49fe,_0x5112c4),this[_0x57f108(0x3aa)]=!![];}else _0x14cb97[_0x57f108(0x568)][_0x57f108(0x401)][_0x57f108(0x30e)](this),_0x5aefc8[_0x57f108(0x30b)]&&_0x3bbfe5['isPressed'](_0x20079e[_0x57f108(0x671)][_0x57f108(0x4d1)][_0x57f108(0x5cc)]['FastForwardKey'])&&_0x1b2dae[_0x57f108(0x48b)]();}const _0x39a2f8=this[_0x57f108(0x2e4)][_0x57f108(0x51a)]();this[_0x57f108(0x227)]()?this['autoEventIconBuffer'](_0x3afcfc):(_0x3afcfc['x']=_0x39a2f8?_0x39a2f8[_0x57f108(0x27f)]:0x0,_0x3afcfc['y']=_0x39a2f8?-this['height']+_0x39a2f8[_0x57f108(0x37d)]:0x0),_0x3afcfc['blendMode']=_0x39a2f8?_0x39a2f8[_0x57f108(0x528)]:0x0,this['removeChild'](_0x3afcfc),this[_0x57f108(0x334)](_0x3afcfc),_0x3afcfc['rotation']=-this[_0x57f108(0x341)];},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x29f)]=function(){const _0x159cfd=_0x2c0583;if(!this[_0x159cfd(0x2e4)])return;if(this[_0x159cfd(0x2e4)][_0x159cfd(0x477)]===undefined)return;if(this[_0x159cfd(0x2e4)]['_customZ']===![])return;this['z']=this['_character']['_customZ'],this['z']<0x0?this[_0x159cfd(0x41c)]['z']=this['z']-0x1:this[_0x159cfd(0x41c)]['z']=0x0;},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x557)]=function(){const _0x30c403=_0x2c0583;if(!this[_0x30c403(0x2e4)])return;let _0x1af4de=!!this['_character']['_mirrorSprite'];this['scale']['x']=Math[_0x30c403(0x562)](this[_0x30c403(0x2a6)]['x'])*(_0x1af4de?-0x1:0x1);},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x45a)]=function(_0x17961c){const _0x433fde=_0x2c0583;_0x17961c['x']=0x0,_0x17961c['y']=-this[_0x433fde(0x3d6)]+this[_0x433fde(0x3d6)]*0x2/0x5,this[_0x433fde(0x2e4)]['pattern']()!==0x1&&(_0x17961c['y']+=0x1);},Sprite_Character[_0x2c0583(0x4ff)][_0x2c0583(0x544)]=function(){const _0x3a5c8f=_0x2c0583;if(!this[_0x3a5c8f(0x2e4)])return 0x0;if(this[_0x3a5c8f(0x2e4)][_0x3a5c8f(0x455)])return 0x0;const _0x35bb3e=this[_0x3a5c8f(0x2e4)]['getEventIconData']();return _0x35bb3e?_0x35bb3e[_0x3a5c8f(0x2a9)]||0x0:0x0;},VisuMZ[_0x2c0583(0x568)]['Sprite_Balloon_setup']=Sprite_Balloon[_0x2c0583(0x4ff)][_0x2c0583(0x38a)],Sprite_Balloon['prototype'][_0x2c0583(0x38a)]=function(_0x1dad9d,_0x40eb95){const _0x1b3fbe=_0x2c0583;VisuMZ[_0x1b3fbe(0x568)]['Sprite_Balloon_setup'][_0x1b3fbe(0x30e)](this,_0x1dad9d,_0x40eb95),VisuMZ[_0x1b3fbe(0x568)][_0x1b3fbe(0x4d1)][_0x1b3fbe(0x3bc)][_0x1b3fbe(0x2f4)]&&(_0x1b3fbe(0x275)!==_0x1b3fbe(0x275)?_0xbc04b5=this[_0x1b3fbe(0x336)](_0x382bc7,_0x476678):this['_target'][_0x1b3fbe(0x2e4)][_0x1b3fbe(0x2c0)](_0x40eb95,this[_0x1b3fbe(0x4a3)]));},VisuMZ['EventsMoveCore'][_0x2c0583(0x48e)]=Sprite_Balloon[_0x2c0583(0x4ff)][_0x2c0583(0x4ab)],Sprite_Balloon[_0x2c0583(0x4ff)][_0x2c0583(0x4ab)]=function(){const _0x403c56=_0x2c0583;VisuMZ[_0x403c56(0x568)][_0x403c56(0x48e)][_0x403c56(0x30e)](this),this[_0x403c56(0x5a4)]();},Sprite_Balloon[_0x2c0583(0x4ff)]['updateVS8BalloonOffsets']=function(){const _0x47e3a2=_0x2c0583;this[_0x47e3a2(0x5e3)][_0x47e3a2(0x2e4)][_0x47e3a2(0x1ba)]()&&(this['x']+=VisuMZ[_0x47e3a2(0x568)][_0x47e3a2(0x4d1)][_0x47e3a2(0x3bc)][_0x47e3a2(0x3a2)],this['y']+=VisuMZ['EventsMoveCore'][_0x47e3a2(0x4d1)][_0x47e3a2(0x3bc)][_0x47e3a2(0x521)]);},Sprite_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x418)]=function(){const _0x548517=_0x2c0583;this[_0x548517(0x4a9)]=new Bitmap(Math[_0x548517(0x5ce)](Graphics[_0x548517(0x577)]/0x2),0x30),this[_0x548517(0x4a9)][_0x548517(0x28c)]=this[_0x548517(0x28c)](),this[_0x548517(0x4a9)][_0x548517(0x572)]=this[_0x548517(0x572)](),this[_0x548517(0x4a9)][_0x548517(0x3f1)]=ColorManager[_0x548517(0x3f1)]();},Sprite_Timer[_0x2c0583(0x4ff)][_0x2c0583(0x47a)]=function(){const _0xfc31b3=_0x2c0583,_0x5511f7=Math['floor'](this[_0xfc31b3(0x4df)]/0x3c/0x3c),_0xdfd9b5=Math['floor'](this['_seconds']/0x3c)%0x3c,_0x4fa73f=this['_seconds']%0x3c;let _0x4ac92e=_0xdfd9b5['padZero'](0x2)+':'+_0x4fa73f['padZero'](0x2);if(_0x5511f7>0x0)_0x4ac92e='%1:%2'[_0xfc31b3(0x2d3)](_0x5511f7,_0x4ac92e);return _0x4ac92e;};function Sprite_EventLabel(){const _0x50cfde=_0x2c0583;this[_0x50cfde(0x542)](...arguments);}Sprite_EventLabel[_0x2c0583(0x4ff)]=Object[_0x2c0583(0x1f0)](Sprite['prototype']),Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x329)]=Sprite_EventLabel,Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x542)]=function(_0x272021){const _0x148220=_0x2c0583;this['_event']=_0x272021,Sprite[_0x148220(0x4ff)][_0x148220(0x542)][_0x148220(0x30e)](this),this[_0x148220(0x598)](),this['createProxyWindow']();},Sprite_EventLabel['prototype'][_0x2c0583(0x598)]=function(){const _0x73dacf=_0x2c0583;this[_0x73dacf(0x4fd)]['x']=0.5,this[_0x73dacf(0x4fd)]['y']=0x1;},Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x40b)]=function(){const _0x30073a=_0x2c0583,_0x805961=new Rectangle(0x0,0x0,0x1,0x1);this[_0x30073a(0x242)]=new Window_Base(_0x805961),this[_0x30073a(0x242)][_0x30073a(0x347)]=0x0;},Sprite_EventLabel['prototype'][_0x2c0583(0x22b)]=function(){const _0x581ea7=_0x2c0583;Sprite[_0x581ea7(0x4ff)]['update'][_0x581ea7(0x30e)](this),this[_0x581ea7(0x415)](),this['updateScale'](),this['updatePosition'](),this[_0x581ea7(0x3d5)]();},Sprite_EventLabel['prototype'][_0x2c0583(0x415)]=function(){const _0x3e1441=_0x2c0583;this[_0x3e1441(0x442)][_0x3e1441(0x453)]()!==this[_0x3e1441(0x4e8)]&&(this[_0x3e1441(0x4e8)]=this['_event']['labelWindowText'](),this[_0x3e1441(0x551)]());},Sprite_EventLabel['prototype'][_0x2c0583(0x551)]=function(){const _0x294fd2=_0x2c0583;if(!this[_0x294fd2(0x242)])return;this[_0x294fd2(0x5fa)](),this['drawText']();},Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x5fa)]=function(){const _0x297310=_0x2c0583,_0x5482b6=this[_0x297310(0x242)]['textSizeEx'](this[_0x297310(0x4e8)]),_0x4be06c=this['_proxyWindow']['itemPadding'](),_0x26bb9b=_0x5482b6[_0x297310(0x331)]+_0x4be06c*0x2,_0x40845d=_0x5482b6[_0x297310(0x3d6)];this[_0x297310(0x242)]['move'](0x0,0x0,_0x26bb9b,_0x40845d),this[_0x297310(0x242)][_0x297310(0x2e6)](),this[_0x297310(0x4a9)]=this[_0x297310(0x242)][_0x297310(0x33c)];},Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x1d4)]=function(){const _0x508102=_0x2c0583,_0x890401=this[_0x508102(0x242)][_0x508102(0x44b)]();this[_0x508102(0x242)][_0x508102(0x2dd)](this[_0x508102(0x4e8)],_0x890401,0x0);},Sprite_EventLabel[_0x2c0583(0x4ff)]['updateScale']=function(){const _0x439b2b=_0x2c0583,_0xe28040=VisuMZ[_0x439b2b(0x568)][_0x439b2b(0x4d1)]['Label']['FontSize'],_0xf1342c=$gameSystem['mainFontSize']()||0x1;this['scale']['x']=this['scale']['y']=_0xe28040/_0xf1342c;},Sprite_EventLabel['prototype'][_0x2c0583(0x4ab)]=function(){const _0x433d13=_0x2c0583;if(!SceneManager[_0x433d13(0x63a)])return;if(!SceneManager[_0x433d13(0x63a)][_0x433d13(0x3ee)])return;const _0x5e3247=SceneManager[_0x433d13(0x63a)][_0x433d13(0x3ee)][_0x433d13(0x2ee)](this[_0x433d13(0x442)]);if(!_0x5e3247)return;this['x']=this[_0x433d13(0x442)]['screenX'](),this['x']+=this[_0x433d13(0x442)][_0x433d13(0x4ef)][_0x433d13(0x5a5)],this['y']=this[_0x433d13(0x442)][_0x433d13(0x1bd)]()-_0x5e3247[_0x433d13(0x3d6)],this['y']+=$gameSystem[_0x433d13(0x5ad)]()*-0.5,this['y']+=this[_0x433d13(0x442)][_0x433d13(0x4ef)][_0x433d13(0x322)];},Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x3d5)]=function(){const _0x4c7e1b=_0x2c0583;if(this[_0x4c7e1b(0x52d)]())this[_0x4c7e1b(0x1f5)]+=this[_0x4c7e1b(0x303)]();else SceneManager['_scene'][_0x4c7e1b(0x5d8)]>0x0?'iLqUV'==='iLqUV'?this[_0x4c7e1b(0x1f5)]=0x0:(_0x2ddd54[_0x4c7e1b(0x28d)](_0x1ce3dd[_0x4c7e1b(0x302)]),_0x17fd72[_0x4c7e1b(0x568)][_0x4c7e1b(0x620)][_0x4c7e1b(0x30e)](this),_0x3c5b97[_0x4c7e1b(0x58d)](),_0x518698['_selfTargetItemChoice']=_0x284003):'ABlfP'!==_0x4c7e1b(0x5cb)?this[_0x4c7e1b(0x64c)]=!![]:this[_0x4c7e1b(0x1f5)]-=this[_0x4c7e1b(0x303)]();},Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x52d)]=function(){const _0x556e23=_0x2c0583;if(!$gameSystem[_0x556e23(0x5fe)]())return![];if(this['_event']?.[_0x556e23(0x455)])return![];if(SceneManager[_0x556e23(0x63a)][_0x556e23(0x5d8)]>0x0)return![];const _0x333d3c=$gamePlayer['x'],_0x8d4654=$gamePlayer['y'],_0x3fb6ab=this['_event']['x'],_0x5200fd=this['_event']['y'];if(this[_0x556e23(0x66d)]===_0x333d3c&&this[_0x556e23(0x518)]===_0x8d4654&&this[_0x556e23(0x25d)]===_0x3fb6ab&&this['_visibleEventY']===_0x5200fd)return _0x556e23(0x20c)===_0x556e23(0x2aa)?_0x24c4a2>=0x3e8?(_0x4f0977-=0x3e8,this[_0x556e23(0x376)][_0x32fc68]):_0x582019[_0x556e23(0x568)][_0x556e23(0x613)][_0x556e23(0x30e)](this,_0xc4ee2c):this['_cacheVisibility'];this[_0x556e23(0x66d)]=$gamePlayer['x'],this[_0x556e23(0x518)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x556e23(0x442)]['x'],this['_visibleEventY']=this[_0x556e23(0x442)]['y'];if($gameMap[_0x556e23(0x4d3)](_0x333d3c,_0x8d4654,_0x3fb6ab,_0x5200fd)>this[_0x556e23(0x442)][_0x556e23(0x41f)]()){if(_0x556e23(0x4d9)!==_0x556e23(0x2d9))return this[_0x556e23(0x1e7)]=![],![];else{if(!this['canPass'](this['_x'],this['_y'],_0x24970e))return this[_0x556e23(0x3c1)](_0x36f236);if(!this['canPass'](this['_x'],this['_y'],_0x2652d5))return this[_0x556e23(0x3c1)](_0x4a2d99);if(!this[_0x556e23(0x512)](this['_x'],this['_y'],_0x42a81a,_0x2c3303)){let _0x4c84e6=_0x9c5df8['EventsMoveCore'][_0x556e23(0x4d1)][_0x556e23(0x1b9)][_0x556e23(0x57e)]?_0xfbd459:_0x552385;return this[_0x556e23(0x3c1)](_0x4c84e6);}}}return this[_0x556e23(0x1e7)]=!![],!![];},Sprite_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x303)]=function(){const _0x1c1ac9=_0x2c0583;return VisuMZ[_0x1c1ac9(0x568)][_0x1c1ac9(0x4d1)][_0x1c1ac9(0x3e0)][_0x1c1ac9(0x26c)];},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x2d4)]=Spriteset_Map['prototype'][_0x2c0583(0x4d2)],Spriteset_Map[_0x2c0583(0x4ff)][_0x2c0583(0x4d2)]=function(){const _0x299689=_0x2c0583;VisuMZ[_0x299689(0x568)][_0x299689(0x2d4)][_0x299689(0x30e)](this),this[_0x299689(0x244)]();},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x490)]=Spriteset_Map[_0x2c0583(0x4ff)][_0x2c0583(0x40e)],Spriteset_Map['prototype'][_0x2c0583(0x40e)]=function(){const _0x2ecccb=_0x2c0583;VisuMZ[_0x2ecccb(0x568)][_0x2ecccb(0x490)]['call'](this),this['createShadows']();},Spriteset_Map[_0x2c0583(0x4ff)][_0x2c0583(0x537)]=function(){const _0x2280cb=_0x2c0583;if(!VisuMZ[_0x2280cb(0x568)]['Settings'][_0x2280cb(0x1b9)]['ShowShadows'])return;for(const _0x2fe82f of this[_0x2280cb(0x5b8)]){this['createCharacterShadow'](_0x2fe82f);}},Spriteset_Map[_0x2c0583(0x4ff)]['createCharacterShadow']=function(_0x2e6dee){const _0x237044=_0x2c0583;_0x2e6dee[_0x237044(0x41c)]=new Sprite(),_0x2e6dee['_shadowSprite'][_0x237044(0x34f)]=_0x2e6dee[_0x237044(0x2e4)][_0x237044(0x4e3)](),_0x2e6dee[_0x237044(0x41c)]['bitmap']=ImageManager[_0x237044(0x3ac)](_0x2e6dee[_0x237044(0x41c)][_0x237044(0x34f)]),_0x2e6dee[_0x237044(0x41c)][_0x237044(0x4fd)]['x']=0.5,_0x2e6dee[_0x237044(0x41c)][_0x237044(0x4fd)]['y']=0x1,_0x2e6dee[_0x237044(0x41c)]['z']=0x0,this[_0x237044(0x499)][_0x237044(0x334)](_0x2e6dee[_0x237044(0x41c)]);},Spriteset_Map['prototype'][_0x2c0583(0x3d1)]=function(){const _0x3bd2d7=_0x2c0583;if(!VisuMZ[_0x3bd2d7(0x568)][_0x3bd2d7(0x4d1)]['Movement'][_0x3bd2d7(0x38e)])return;for(const _0x3a7103 of this[_0x3bd2d7(0x5b8)]){this[_0x3bd2d7(0x499)][_0x3bd2d7(0x475)](_0x3a7103['_shadowSprite']);}},Spriteset_Map[_0x2c0583(0x4ff)]['createLabelWindows']=function(){const _0x10126d=_0x2c0583;this[_0x10126d(0x4a1)]=[];for(const _0x3472bc of $gameMap['events']()){this[_0x10126d(0x212)](_0x3472bc);}},Spriteset_Map[_0x2c0583(0x4ff)][_0x2c0583(0x212)]=function(_0x27241e){const _0x4c9901=_0x2c0583;if(!this[_0x4c9901(0x22c)](_0x27241e))return;let _0x8c6ac0;const _0xaeb176=VisuMZ[_0x4c9901(0x568)]['Settings'][_0x4c9901(0x3e0)][_0x4c9901(0x23d)]??!![];_0x8c6ac0=_0xaeb176?new Sprite_EventLabel(_0x27241e):new Window_EventLabel(_0x27241e),_0x8c6ac0['z']=0x8,_0x8c6ac0['spriteId']=Sprite[_0x4c9901(0x1fd)]++,this['_tilemap'][_0x4c9901(0x334)](_0x8c6ac0),this[_0x4c9901(0x4a1)][_0x4c9901(0x2a8)](_0x8c6ac0);},Spriteset_Map[_0x2c0583(0x4ff)][_0x2c0583(0x22c)]=function(_0x5f3a4f){const _0x21cd0b=_0x2c0583,_0x2a1687=_0x5f3a4f[_0x21cd0b(0x254)]();if(_0x2a1687['note'][_0x21cd0b(0x524)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x2a1687['note'][_0x21cd0b(0x524)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x59daae of _0x2a1687[_0x21cd0b(0x2b9)]){if(_0x21cd0b(0x3b4)===_0x21cd0b(0x419))_0x3154f6=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];else{let _0x1e4f1a='';for(const _0x44cfa9 of _0x59daae['list']){if([0x6c,0x198][_0x21cd0b(0x454)](_0x44cfa9['code'])){if(_0x21cd0b(0x3fd)!=='RljHD')_0x1e4f1a+=_0x44cfa9['parameters'][0x0];else return this['_CPCs'];}}if(_0x1e4f1a[_0x21cd0b(0x524)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1e4f1a[_0x21cd0b(0x524)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}}return![];},Spriteset_Map[_0x2c0583(0x4ff)][_0x2c0583(0x356)]=function(_0x5dbdc3){const _0x23ec9c=_0x2c0583;this[_0x23ec9c(0x5b8)]=this['_characterSprites']||[];const _0x4a833a=new Sprite_Character(_0x5dbdc3);this['_characterSprites'][_0x23ec9c(0x2a8)](_0x4a833a),this[_0x23ec9c(0x499)]['addChild'](_0x4a833a),this[_0x23ec9c(0x34d)](_0x4a833a),this[_0x23ec9c(0x212)](_0x5dbdc3),_0x4a833a[_0x23ec9c(0x22b)]();},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x2bf)]=Game_Message[_0x2c0583(0x4ff)][_0x2c0583(0x50d)],Game_Message[_0x2c0583(0x4ff)][_0x2c0583(0x50d)]=function(_0xe49fc0,_0x17e324){const _0x3620e0=_0x2c0583;this[_0x3620e0(0x211)]=$gameTemp[_0x3620e0(0x355)](),VisuMZ[_0x3620e0(0x568)][_0x3620e0(0x2bf)]['call'](this,_0xe49fc0,_0x17e324);},VisuMZ[_0x2c0583(0x568)]['Window_NumberInput_start']=Window_NumberInput[_0x2c0583(0x4ff)]['start'],Window_NumberInput[_0x2c0583(0x4ff)][_0x2c0583(0x225)]=function(){const _0x1c84ee=_0x2c0583;$gameTemp[_0x1c84ee(0x28d)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x1c84ee(0x568)]['Window_NumberInput_start'][_0x1c84ee(0x30e)](this),$gameTemp[_0x1c84ee(0x58d)]();},VisuMZ[_0x2c0583(0x568)]['Window_NumberInput_processOk']=Window_NumberInput['prototype'][_0x2c0583(0x34e)],Window_NumberInput[_0x2c0583(0x4ff)][_0x2c0583(0x34e)]=function(){const _0x2ab168=_0x2c0583;$gameTemp[_0x2ab168(0x28d)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x2ab168(0x568)][_0x2ab168(0x316)][_0x2ab168(0x30e)](this),$gameTemp[_0x2ab168(0x58d)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ['EventsMoveCore']['Game_Message_setItemChoice']=Game_Message[_0x2c0583(0x4ff)][_0x2c0583(0x2fe)],Game_Message[_0x2c0583(0x4ff)][_0x2c0583(0x2fe)]=function(_0x19e55c,_0x1a4036){const _0x5506ad=_0x2c0583;this[_0x5506ad(0x302)]=$gameTemp[_0x5506ad(0x355)](),VisuMZ['EventsMoveCore']['Game_Message_setItemChoice'][_0x5506ad(0x30e)](this,_0x19e55c,_0x1a4036);},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x452)]=Window_EventItem['prototype'][_0x2c0583(0x531)],Window_EventItem['prototype'][_0x2c0583(0x531)]=function(){const _0x5666b2=_0x2c0583;$gameTemp[_0x5666b2(0x28d)]($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore']['Window_EventItem_onOk'][_0x5666b2(0x30e)](this),$gameTemp[_0x5666b2(0x58d)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x620)]=Window_EventItem[_0x2c0583(0x4ff)][_0x2c0583(0x487)],Window_EventItem[_0x2c0583(0x4ff)][_0x2c0583(0x487)]=function(){const _0x321fed=_0x2c0583;$gameTemp['registerSelfTarget']($gameMessage[_0x321fed(0x302)]),VisuMZ[_0x321fed(0x568)]['Window_EventItem_onCancel'][_0x321fed(0x30e)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x321fed(0x302)]=undefined;},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x658)]=Window_Message[_0x2c0583(0x4ff)]['startMessage'],Window_Message['prototype'][_0x2c0583(0x4d8)]=function(){const _0x56cb02=_0x2c0583;$gameMessage[_0x56cb02(0x5ff)](),VisuMZ[_0x56cb02(0x568)][_0x56cb02(0x658)][_0x56cb02(0x30e)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x2c0583(0x568)][_0x2c0583(0x31e)]=Window_ScrollText[_0x2c0583(0x4ff)][_0x2c0583(0x4d8)],Window_ScrollText['prototype'][_0x2c0583(0x4d8)]=function(){const _0x412350=_0x2c0583;$gameMessage[_0x412350(0x5ff)](),VisuMZ[_0x412350(0x568)][_0x412350(0x31e)][_0x412350(0x30e)](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0x13345a=_0x2c0583;this[_0x13345a(0x542)](...arguments);}Window_EventLabel[_0x2c0583(0x4ff)]=Object['create'](Window_Base['prototype']),Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x329)]=Window_EventLabel,Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x542)]=function(_0x55b8b5){const _0x5c156a=_0x2c0583;this[_0x5c156a(0x442)]=_0x55b8b5;const _0x30fdf0=new Rectangle(0x0,0x0,Graphics[_0x5c156a(0x577)]/0x4,this['fittingHeight'](0x1));this[_0x5c156a(0x598)](),Window_Base[_0x5c156a(0x4ff)]['initialize'][_0x5c156a(0x30e)](this,_0x30fdf0),this[_0x5c156a(0x65e)]=0x0,this['setBackgroundType'](0x2),this[_0x5c156a(0x4e8)]='';},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x598)]=function(){const _0x3af00b=_0x2c0583;this[_0x3af00b(0x28a)]=![],this['_screenZoomScale']=$gameScreen['zoomScale'](),this[_0x3af00b(0x21d)]=this['_event'][_0x3af00b(0x3ad)](),this[_0x3af00b(0x1bc)]=this[_0x3af00b(0x442)]['screenY'](),this[_0x3af00b(0x3d4)]=this[_0x3af00b(0x442)]['_labelWindow'][_0x3af00b(0x5a5)],this[_0x3af00b(0x377)]=this[_0x3af00b(0x442)][_0x3af00b(0x4ef)]['offsetY'],this[_0x3af00b(0x481)]=this[_0x3af00b(0x442)][_0x3af00b(0x4be)],this['_cacheVisibility']=this[_0x3af00b(0x52d)](),this[_0x3af00b(0x538)]=$gameSystem[_0x3af00b(0x5fe)](),this[_0x3af00b(0x66d)]=$gamePlayer['x'],this[_0x3af00b(0x518)]=$gamePlayer['y'],this[_0x3af00b(0x25d)]=this[_0x3af00b(0x442)]['x'],this[_0x3af00b(0x539)]=this[_0x3af00b(0x442)]['y'];},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x22b)]=function(){const _0x241a82=_0x2c0583;Window_Base[_0x241a82(0x4ff)][_0x241a82(0x22b)][_0x241a82(0x30e)](this);if(!this[_0x241a82(0x31a)]())return;this[_0x241a82(0x415)](),this[_0x241a82(0x3c2)](),this[_0x241a82(0x4ab)](),this['updateOpacity']();},Window_EventLabel['prototype'][_0x2c0583(0x31a)]=function(){const _0x3406a7=_0x2c0583;if(!this['_event'])return![];if(!this[_0x3406a7(0x442)][_0x3406a7(0x4ef)])return![];if(this['_eventPageIndex']!==this['_event']['_pageIndex'])return!![];if(this[_0x3406a7(0x442)]['_erased']&&!this[_0x3406a7(0x28a)])return!![];if(this['_event'][_0x3406a7(0x4ef)][_0x3406a7(0x4ed)]==='')return![];if(this[_0x3406a7(0x5a9)]!==$gameScreen['zoomScale']())return!![];if(this[_0x3406a7(0x21d)]!==this['_event'][_0x3406a7(0x3ad)]())return!![];if(this[_0x3406a7(0x1bc)]!==this[_0x3406a7(0x442)]['screenY']())return!![];if(this[_0x3406a7(0x3d4)]!==this['_event'][_0x3406a7(0x4ef)][_0x3406a7(0x5a5)])return!![];if(this[_0x3406a7(0x377)]!==this['_event'][_0x3406a7(0x4ef)]['offsetY'])return!![];if(this[_0x3406a7(0x66d)]!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x3406a7(0x25d)]!==this[_0x3406a7(0x442)]['x'])return!![];if(this['_visibleEventY']!==this[_0x3406a7(0x442)]['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem['eventLabelsVisible']())return!![];if(this[_0x3406a7(0x1e7)]&&this[_0x3406a7(0x65e)]<0xff)return!![];if(!this[_0x3406a7(0x1e7)]&&this[_0x3406a7(0x65e)]>0x0)return!![];if(SceneManager[_0x3406a7(0x63a)][_0x3406a7(0x5d8)]>0x0)return!![];return![];},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x415)]=function(){const _0x5c82c8=_0x2c0583;this[_0x5c82c8(0x442)][_0x5c82c8(0x453)]()!==this[_0x5c82c8(0x4e8)]&&(this[_0x5c82c8(0x4e8)]=this[_0x5c82c8(0x442)][_0x5c82c8(0x453)](),this[_0x5c82c8(0x551)]());},Window_EventLabel[_0x2c0583(0x4ff)]['updateScale']=function(){const _0x358d4a=_0x2c0583;this['scale']['x']=0x1/$gameScreen[_0x358d4a(0x1a3)](),this['scale']['y']=0x1/$gameScreen[_0x358d4a(0x1a3)](),this[_0x358d4a(0x5a9)]=$gameScreen['zoomScale']();},Window_EventLabel['prototype'][_0x2c0583(0x4ab)]=function(){const _0x116f93=_0x2c0583;if(!SceneManager['_scene'])return;if(!SceneManager['_scene']['_spriteset'])return;const _0x24602f=SceneManager['_scene'][_0x116f93(0x3ee)]['findTargetSprite'](this[_0x116f93(0x442)]);if(!_0x24602f)return;this['x']=Math[_0x116f93(0x5ce)](this[_0x116f93(0x442)][_0x116f93(0x3ad)]()-Math['floor'](this[_0x116f93(0x331)]*this[_0x116f93(0x2a6)]['x']/0x2)),this['x']+=this[_0x116f93(0x442)][_0x116f93(0x4ef)][_0x116f93(0x5a5)],this['y']=this['_event'][_0x116f93(0x1bd)]()-_0x24602f['height'],this['y']+=Math[_0x116f93(0x5ce)]($gameSystem[_0x116f93(0x5ad)]()*0.5),this['y']-=Math['round'](this[_0x116f93(0x3d6)]*this[_0x116f93(0x2a6)]['y']),this['y']+=this[_0x116f93(0x442)][_0x116f93(0x4ef)][_0x116f93(0x322)],this[_0x116f93(0x28a)]=this[_0x116f93(0x442)][_0x116f93(0x455)],this[_0x116f93(0x21d)]=this['_event']['screenX'](),this['_eventScreenY']=this[_0x116f93(0x442)]['screenY'](),this[_0x116f93(0x3d4)]=this[_0x116f93(0x442)][_0x116f93(0x4ef)][_0x116f93(0x5a5)],this[_0x116f93(0x377)]=this[_0x116f93(0x442)][_0x116f93(0x4ef)][_0x116f93(0x322)],this[_0x116f93(0x481)]=this[_0x116f93(0x442)][_0x116f93(0x4be)],this[_0x116f93(0x28a)]&&(this[_0x116f93(0x65e)]=0x0);},Window_EventLabel['prototype'][_0x2c0583(0x3d5)]=function(){const _0x2c94f8=_0x2c0583;if(this[_0x2c94f8(0x52d)]()){if(_0x2c94f8(0x26e)!=='LFnGO')this[_0x2c94f8(0x65e)]+=this['opacitySpeed']();else{if([0x6c,0x198][_0x2c94f8(0x454)](_0x32c1ca['code'])){if(_0x519a42!=='')_0x586f0d+='\x0a';_0x3ce859+=_0x5abb38[_0x2c94f8(0x39f)][0x0];}}}else{if(SceneManager[_0x2c94f8(0x63a)][_0x2c94f8(0x5d8)]>0x0){if(_0x2c94f8(0x482)===_0x2c94f8(0x482))this[_0x2c94f8(0x65e)]=0x0;else{const _0x1f5656=_0x8395ff[_0x2c94f8(0x568)]['Settings'][_0x2c94f8(0x3e0)][_0x2c94f8(0x45e)],_0x4ff467=_0x3a80c2[_0x2c94f8(0x25b)]()||0x1;this[_0x2c94f8(0x2a6)]['x']=this[_0x2c94f8(0x2a6)]['y']=_0x1f5656/_0x4ff467;}}else{if(_0x2c94f8(0x637)!==_0x2c94f8(0x3fe))this[_0x2c94f8(0x65e)]-=this[_0x2c94f8(0x303)]();else{if(this[_0x2c94f8(0x283)]===_0x346bdf)this['initEventsMoveCore']();const _0x2fb5d4=_0x2c94f8(0x3c4)['format'](_0x5f0d80,_0xa01554);this[_0x2c94f8(0x283)][_0x2fb5d4]={'template':_0x5ed576,'mapId':_0x10ef8a,'eventId':_0x2fa834};}}}},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x52d)]=function(){const _0x1ce16a=_0x2c0583;if(!$gameSystem['eventLabelsVisible']())return![];if(this[_0x1ce16a(0x442)]?.['_erased'])return![];if(SceneManager[_0x1ce16a(0x63a)][_0x1ce16a(0x5d8)]>0x0)return![];const _0x429a3e=$gamePlayer['x'],_0x222aa5=$gamePlayer['y'],_0x2369e0=this[_0x1ce16a(0x442)]['x'],_0x143fc3=this[_0x1ce16a(0x442)]['y'];if(this[_0x1ce16a(0x66d)]===_0x429a3e&&this[_0x1ce16a(0x518)]===_0x222aa5&&this[_0x1ce16a(0x25d)]===_0x2369e0&&this[_0x1ce16a(0x539)]===_0x143fc3){if(_0x1ce16a(0x5ef)===_0x1ce16a(0x526)){const _0x2ef82c=_0x28fb57[_0x1ce16a(0x5ce)](_0xe11e3d(_0x21c1b1['$1'])/0x64*0xff);return this[_0x1ce16a(0x323)](_0x2ef82c[_0x1ce16a(0x344)](0x0,0xff));}else return this[_0x1ce16a(0x1e7)];}this[_0x1ce16a(0x66d)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x1ce16a(0x25d)]=this['_event']['x'],this[_0x1ce16a(0x539)]=this[_0x1ce16a(0x442)]['y'];if($gameMap[_0x1ce16a(0x4d3)](_0x429a3e,_0x222aa5,_0x2369e0,_0x143fc3)>this[_0x1ce16a(0x442)][_0x1ce16a(0x41f)]())return this[_0x1ce16a(0x1e7)]=![],![];return this[_0x1ce16a(0x1e7)]=!![],!![];},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x303)]=function(){const _0x472dfd=_0x2c0583;return VisuMZ[_0x472dfd(0x568)]['Settings'][_0x472dfd(0x3e0)][_0x472dfd(0x26c)];},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x5fa)]=function(){const _0x27b154=_0x2c0583,_0x5ef3b9=this[_0x27b154(0x5ee)](this[_0x27b154(0x4e8)]);this['width']=_0x5ef3b9[_0x27b154(0x331)]+($gameSystem[_0x27b154(0x5ad)]()+this['itemPadding']())*0x2,this[_0x27b154(0x3d6)]=Math[_0x27b154(0x424)](this['lineHeight'](),_0x5ef3b9['height'])+$gameSystem['windowPadding']()*0x2,this[_0x27b154(0x2e6)]();},Window_EventLabel[_0x2c0583(0x4ff)]['lineHeight']=function(){const _0xff36f3=_0x2c0583;return VisuMZ[_0xff36f3(0x568)][_0xff36f3(0x4d1)]['Label']['LineHeight'];},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x4fb)]=function(){const _0x15a20a=_0x2c0583;Window_Base[_0x15a20a(0x4ff)][_0x15a20a(0x4fb)][_0x15a20a(0x30e)](this),this[_0x15a20a(0x33c)][_0x15a20a(0x572)]=this[_0x15a20a(0x295)]();},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x295)]=function(){const _0x43733e=_0x2c0583;return VisuMZ[_0x43733e(0x568)][_0x43733e(0x4d1)]['Label'][_0x43733e(0x45e)];},Window_EventLabel[_0x2c0583(0x4ff)][_0x2c0583(0x551)]=function(){const _0x36bcf3=_0x2c0583;this['resizeWindow'](),this['contents'][_0x36bcf3(0x48b)]();const _0x492671=this[_0x36bcf3(0x4e8)][_0x36bcf3(0x4e6)](/[\r\n]+/);let _0x5f24ce=0x0;for(const _0x23da37 of _0x492671){if(_0x36bcf3(0x373)!=='KXnNP'){const _0x14beac=this[_0x36bcf3(0x5ee)](_0x23da37),_0x117b7a=Math[_0x36bcf3(0x48d)]((this[_0x36bcf3(0x21b)]-_0x14beac['width'])/0x2);this['drawTextEx'](_0x23da37,_0x117b7a,_0x5f24ce),_0x5f24ce+=_0x14beac[_0x36bcf3(0x3d6)];}else{const _0x2d17fc=_0x472481[_0x36bcf3(0x568)]['Settings'][_0x36bcf3(0x1b9)];if(!_0x2d17fc[_0x36bcf3(0x1cb)])return _0x48d1b4;return[0x1,0x3,0x7,0x9]['includes'](this[_0x36bcf3(0x33f)])&&(_0x1e87ae*=_0x2d17fc[_0x36bcf3(0x34c)]||0.01),_0x3ec4bc;}}},Window_EventLabel['prototype'][_0x2c0583(0x38c)]=function(_0x43e076,_0xccb9f6){const _0x43bcb5=_0x2c0583;if(_0xccb9f6['drawing']){if(_0x43bcb5(0x1f7)!==_0x43bcb5(0x497))this[_0x43bcb5(0x470)](_0x43e076,_0xccb9f6['x']+0x2,_0xccb9f6['y']);else return!![];}_0xccb9f6['x']+=Math[_0x43bcb5(0x665)](this[_0x43bcb5(0x2cf)](),ImageManager[_0x43bcb5(0x4f6)])+0x4;},Window_EventLabel[_0x2c0583(0x4ff)]['drawIcon']=function(_0x436746,_0x458438,_0x18812d){const _0x289c67=_0x2c0583,_0x1fb5a8=ImageManager['loadSystem']('IconSet'),_0x3fdd82=ImageManager[_0x289c67(0x4f6)],_0x2f7993=ImageManager['iconHeight'],_0x37060f=_0x436746%0x10*_0x3fdd82,_0x29c75d=Math[_0x289c67(0x48d)](_0x436746/0x10)*_0x2f7993,_0x5d426c=Math[_0x289c67(0x665)](this['iconSize']()),_0x874cd6=Math[_0x289c67(0x665)](this[_0x289c67(0x2cf)]());this['contents']['blt'](_0x1fb5a8,_0x37060f,_0x29c75d,_0x3fdd82,_0x2f7993,_0x458438,_0x18812d,_0x5d426c,_0x874cd6);},Window_EventLabel['prototype']['iconSize']=function(){const _0x17ae8c=_0x2c0583;return VisuMZ[_0x17ae8c(0x568)][_0x17ae8c(0x4d1)][_0x17ae8c(0x3e0)][_0x17ae8c(0x1d1)];};