//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.57;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.57] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x17407e=_0x98e4;(function(_0x3d6b96,_0x1a13fd){const _0xf48e5b=_0x98e4,_0x3a9026=_0x3d6b96();while(!![]){try{const _0x54b5b2=-parseInt(_0xf48e5b(0x6e2))/0x1+-parseInt(_0xf48e5b(0x6d4))/0x2*(parseInt(_0xf48e5b(0x7fc))/0x3)+parseInt(_0xf48e5b(0x280))/0x4+-parseInt(_0xf48e5b(0x6b9))/0x5+parseInt(_0xf48e5b(0x2df))/0x6+parseInt(_0xf48e5b(0x54f))/0x7+parseInt(_0xf48e5b(0x47c))/0x8*(parseInt(_0xf48e5b(0x71a))/0x9);if(_0x54b5b2===_0x1a13fd)break;else _0x3a9026['push'](_0x3a9026['shift']());}catch(_0x44b27b){_0x3a9026['push'](_0x3a9026['shift']());}}}(_0x4117,0xcca03));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x17407e(0x4b6)](function(_0x4c32f5){const _0x354880=_0x17407e;return _0x4c32f5[_0x354880(0x27b)]&&_0x4c32f5[_0x354880(0x899)][_0x354880(0x25d)]('['+label+']');})[0x0];VisuMZ[label][_0x17407e(0x5cb)]=VisuMZ[label][_0x17407e(0x5cb)]||{},VisuMZ['ConvertParams']=function(_0x22c4eb,_0x20d564){const _0x4040d2=_0x17407e;for(const _0x531d61 in _0x20d564){if(_0x531d61['match'](/(.*):(.*)/i)){const _0x1fe11a=String(RegExp['$1']),_0x13650e=String(RegExp['$2'])[_0x4040d2(0x99a)]()[_0x4040d2(0x846)]();let _0x941bf2,_0x506e77,_0x384dc1;switch(_0x13650e){case _0x4040d2(0x3ee):_0x941bf2=_0x20d564[_0x531d61]!==''?Number(_0x20d564[_0x531d61]):0x0;break;case _0x4040d2(0x2bf):_0x506e77=_0x20d564[_0x531d61]!==''?JSON[_0x4040d2(0x7de)](_0x20d564[_0x531d61]):[],_0x941bf2=_0x506e77[_0x4040d2(0x6cd)](_0x447148=>Number(_0x447148));break;case'EVAL':_0x941bf2=_0x20d564[_0x531d61]!==''?eval(_0x20d564[_0x531d61]):null;break;case _0x4040d2(0x8fc):_0x506e77=_0x20d564[_0x531d61]!==''?JSON['parse'](_0x20d564[_0x531d61]):[],_0x941bf2=_0x506e77['map'](_0x20d3ec=>eval(_0x20d3ec));break;case _0x4040d2(0x496):_0x941bf2=_0x20d564[_0x531d61]!==''?JSON['parse'](_0x20d564[_0x531d61]):'';break;case _0x4040d2(0x793):_0x506e77=_0x20d564[_0x531d61]!==''?JSON['parse'](_0x20d564[_0x531d61]):[],_0x941bf2=_0x506e77[_0x4040d2(0x6cd)](_0x4a67a8=>JSON[_0x4040d2(0x7de)](_0x4a67a8));break;case _0x4040d2(0x537):_0x941bf2=_0x20d564[_0x531d61]!==''?new Function(JSON['parse'](_0x20d564[_0x531d61])):new Function(_0x4040d2(0x422));break;case _0x4040d2(0x7c2):_0x506e77=_0x20d564[_0x531d61]!==''?JSON['parse'](_0x20d564[_0x531d61]):[],_0x941bf2=_0x506e77[_0x4040d2(0x6cd)](_0x3272f6=>new Function(JSON[_0x4040d2(0x7de)](_0x3272f6)));break;case'STR':_0x941bf2=_0x20d564[_0x531d61]!==''?String(_0x20d564[_0x531d61]):'';break;case _0x4040d2(0x8a6):_0x506e77=_0x20d564[_0x531d61]!==''?JSON[_0x4040d2(0x7de)](_0x20d564[_0x531d61]):[],_0x941bf2=_0x506e77[_0x4040d2(0x6cd)](_0x481ff8=>String(_0x481ff8));break;case _0x4040d2(0x445):_0x384dc1=_0x20d564[_0x531d61]!==''?JSON[_0x4040d2(0x7de)](_0x20d564[_0x531d61]):{},_0x22c4eb[_0x1fe11a]={},VisuMZ['ConvertParams'](_0x22c4eb[_0x1fe11a],_0x384dc1);continue;case _0x4040d2(0x84a):_0x506e77=_0x20d564[_0x531d61]!==''?JSON[_0x4040d2(0x7de)](_0x20d564[_0x531d61]):[],_0x941bf2=_0x506e77[_0x4040d2(0x6cd)](_0x47c68c=>VisuMZ[_0x4040d2(0x346)]({},JSON[_0x4040d2(0x7de)](_0x47c68c)));break;default:continue;}_0x22c4eb[_0x1fe11a]=_0x941bf2;}}return _0x22c4eb;},(_0x363d4c=>{const _0x267926=_0x17407e,_0x396074=_0x363d4c[_0x267926(0x506)];for(const _0x170d3c of dependencies){if(!Imported[_0x170d3c]){alert(_0x267926(0x7ed)[_0x267926(0x4eb)](_0x396074,_0x170d3c)),SceneManager['exit']();break;}}const _0xe33823=_0x363d4c[_0x267926(0x899)];if(_0xe33823[_0x267926(0x333)](/\[Version[ ](.*?)\]/i)){if(_0x267926(0x604)!==_0x267926(0x933)){const _0x14a676=Number(RegExp['$1']);if(_0x14a676!==VisuMZ[label][_0x267926(0x3b9)]){if(_0x267926(0x8e5)===_0x267926(0x8e5))alert(_0x267926(0x4ab)['format'](_0x396074,_0x14a676)),SceneManager[_0x267926(0x736)]();else{const _0x210a7d=_0x6b79de['value'](_0x28383c);_0x53adf5[_0x267926(0x61a)](_0x375d61,!_0x210a7d);}}}else return _0x552ab8['CoreEngine'][_0x267926(0x373)][_0x267926(0x8eb)](this,_0x4aa423);}if(_0xe33823[_0x267926(0x333)](/\[Tier[ ](\d+)\]/i)){const _0x13557b=Number(RegExp['$1']);_0x13557b<tier?(alert(_0x267926(0x642)[_0x267926(0x4eb)](_0x396074,_0x13557b,tier)),SceneManager['exit']()):tier=Math[_0x267926(0x531)](_0x13557b,tier);}VisuMZ[_0x267926(0x346)](VisuMZ[label][_0x267926(0x5cb)],_0x363d4c[_0x267926(0x277)]);})(pluginData),((()=>{const _0xc2d184=_0x17407e;if(VisuMZ['CoreEngine']['Settings'][_0xc2d184(0x7e8)][_0xc2d184(0x20d)]??!![]){if(_0xc2d184(0x5e7)!==_0xc2d184(0x5e7)){const _0x54f130=_0x5b994d[_0xc2d184(0x4ec)],_0x56e7cc=_0x5b20b7[_0xc2d184(0x65a)](_0x54f130);return _0x56e7cc?this[_0xc2d184(0x3a6)]!==_0x56e7cc[_0xc2d184(0x4ea)]||this[_0xc2d184(0x58d)]!==_0x56e7cc['_x']||this[_0xc2d184(0x930)]!==_0x56e7cc['_y']:![];}else for(const _0x443ca5 in $plugins){const _0x3c2d62=$plugins[_0x443ca5];_0x3c2d62['name'][_0xc2d184(0x333)](/(.*)\/(.*)/i)&&('uSeic'===_0xc2d184(0x55e)?this[_0xc2d184(0x5a0)]():_0x3c2d62[_0xc2d184(0x506)]=String(RegExp['$2'][_0xc2d184(0x846)]()));}}})()),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x46e),_0x5598a5=>{const _0x50d7ea=_0x17407e;if(!SceneManager['_scene'])return;if(!SceneManager[_0x50d7ea(0x26b)][_0x50d7ea(0x5b9)])return;VisuMZ[_0x50d7ea(0x346)](_0x5598a5,_0x5598a5);const _0x57b597=Math[_0x50d7ea(0x909)](_0x5598a5[_0x50d7ea(0x6b5)]),_0x3ac10a=Math[_0x50d7ea(0x909)](_0x5598a5[_0x50d7ea(0x5ea)]);$gameTemp[_0x50d7ea(0x780)](_0x57b597,_0x3ac10a,_0x5598a5[_0x50d7ea(0x45c)],_0x5598a5[_0x50d7ea(0x95c)],_0x5598a5[_0x50d7ea(0x2a4)]);}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x2ce),_0x5bea46=>{const _0x228f98=_0x17407e;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager[_0x228f98(0x26b)][_0x228f98(0x5c9)]=![],VisuMZ[_0x228f98(0x21d)][_0x228f98(0x74f)]();}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x434),_0x1a825a=>{const _0x2231cc=_0x17407e;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x2231cc(0x6e7)]())return;SceneManager['_scene']['_active']=![],VisuMZ[_0x2231cc(0x21d)][_0x2231cc(0x765)]();}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],'ExportCurMapText',_0x2d7753=>{const _0x321c2a=_0x17407e;if(!$gameTemp[_0x321c2a(0x3a3)]())return;if(!Utils[_0x321c2a(0x6e7)]())return;if(!$gameMap)return;if($gameMap[_0x321c2a(0x738)]()<=0x0)return;VisuMZ[_0x321c2a(0x346)](_0x2d7753,_0x2d7753);const _0x4d04a5=_0x321c2a(0x1e4)[_0x321c2a(0x4eb)]($gameMap[_0x321c2a(0x738)]()[_0x321c2a(0x1fc)](0x3)),_0xe215f=VisuMZ[_0x321c2a(0x21d)][_0x321c2a(0x609)]($gameMap['mapId']());VisuMZ[_0x321c2a(0x21d)]['ExportString'](_0xe215f,_0x4d04a5,!![]);}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x2b3),_0x4f5aab=>{const _0x281038=_0x17407e;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x281038(0x6e7)]())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x281038(0x346)](_0x4f5aab,_0x4f5aab);const _0x38f89d=_0x281038(0x746)[_0x281038(0x4eb)]($gameTroop['_troopId']['padZero'](0x4)),_0x10efbd=VisuMZ['CoreEngine'][_0x281038(0x2ac)]($gameTroop[_0x281038(0x349)]);VisuMZ['CoreEngine']['ExportString'](_0x10efbd,_0x38f89d,!![]);}),VisuMZ[_0x17407e(0x21d)][_0x17407e(0x4aa)]=function(_0x50009a,_0x31e912,_0xcdf7e0){const _0xc52653=_0x17407e,_0xd14a15=require('fs');let _0x71d4b1=_0xc52653(0x703)[_0xc52653(0x4eb)](_0x31e912||'0');_0xd14a15[_0xc52653(0x78b)](_0x71d4b1,_0x50009a,_0x552225=>{const _0x1c4cbe=_0xc52653;if(_0x552225){if('ILLXz'!==_0x1c4cbe(0x421))throw err;else(_0x88d84f<_0x26a1bf-_0x5bcbde||_0x506d65&&_0x47a694===0x1)&&this[_0x1c4cbe(0x936)]((_0x496e74+_0x4d822b)%_0x791cae);}else _0xcdf7e0&&alert(_0x1c4cbe(0x3c7)['format'](_0x71d4b1));});},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x74f)]=function(){const _0x554f12=_0x17407e,_0x21ef7d=[];for(const _0x5316e5 of $dataMapInfos){if(!_0x5316e5)continue;_0x21ef7d[_0x554f12(0x2b7)](_0x5316e5['id']);}const _0x922071=_0x21ef7d[_0x554f12(0x62d)]*0x64+Math[_0x554f12(0x212)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x554f12(0x4eb)](_0x922071)),this[_0x554f12(0x745)]=[],this[_0x554f12(0x2b8)]=$dataMap;for(const _0x513212 of _0x21ef7d){_0x554f12(0x38b)!==_0x554f12(0x693)?VisuMZ['CoreEngine'][_0x554f12(0x578)](_0x513212):(_0x1ad50c[_0x554f12(0x21d)][_0x554f12(0x6b4)]['call'](this),this[_0x554f12(0x436)]());}setTimeout(VisuMZ[_0x554f12(0x21d)][_0x554f12(0x2d1)][_0x554f12(0x9b5)](this),_0x922071);},VisuMZ['CoreEngine']['loadMapData']=function(_0x553004){const _0x1df286=_0x17407e,_0x20237b=_0x1df286(0x7ec)[_0x1df286(0x4eb)](_0x553004[_0x1df286(0x1fc)](0x3)),_0x4398ac=new XMLHttpRequest(),_0x439c8d=_0x1df286(0x297)+_0x20237b;_0x4398ac['open'](_0x1df286(0x7f4),_0x439c8d),_0x4398ac[_0x1df286(0x7c5)](_0x1df286(0x35b)),_0x4398ac[_0x1df286(0x561)]=()=>this['storeMapData'](_0x4398ac,_0x553004,_0x20237b,_0x439c8d),_0x4398ac['onerror']=()=>DataManager[_0x1df286(0x6e8)](_0x1df286(0x218),_0x20237b,_0x439c8d),_0x4398ac[_0x1df286(0x3e8)]();},VisuMZ[_0x17407e(0x21d)]['storeMapData']=function(_0xb2f52b,_0x472313,_0x319843,_0x151aea){const _0x55092c=_0x17407e;$dataMap=JSON['parse'](_0xb2f52b['responseText']),DataManager[_0x55092c(0x572)]($dataMap),this[_0x55092c(0x745)][_0x472313]=VisuMZ[_0x55092c(0x21d)]['ExtractStrFromMap'](_0x472313),$dataMap=this[_0x55092c(0x2b8)];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x2d1)]=function(){const _0x2d86e1=_0x17407e,_0x5bb653=_0x2d86e1(0x820);this[_0x2d86e1(0x745)][_0x2d86e1(0x2d3)](undefined)[_0x2d86e1(0x2d3)]('')[_0x2d86e1(0x2d3)](null);const _0x48de58=this['_storedMapText'][_0x2d86e1(0x84c)](_0x2d86e1(0x545))[_0x2d86e1(0x846)]();VisuMZ['CoreEngine'][_0x2d86e1(0x4aa)](_0x48de58,_0x5bb653,!![]),SceneManager[_0x2d86e1(0x26b)][_0x2d86e1(0x5c9)]=!![];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x609)]=function(_0x4a87b4){const _0x14e82c=_0x17407e;if(!$dataMap)return'';let _0x4f5ae5='█'[_0x14e82c(0x397)](0x46)+'\x0a\x0a',_0x3d8cd9='═'[_0x14e82c(0x397)](0x46)+'\x0a\x0a',_0xfa253b='';this[_0x14e82c(0x71b)]=0x0;for(const _0x169546 of $dataMap['events']){if(!_0x169546)continue;let _0x430465=_0x169546['id'],_0x4c4d3b=_0x169546[_0x14e82c(0x506)],_0x299505=_0x169546[_0x14e82c(0x494)];for(const _0x147247 of _0x299505){const _0x400c24=_0x299505[_0x14e82c(0x803)](_0x147247)+0x1;let _0xa1c17a=_0x3d8cd9+_0x14e82c(0x3a8),_0x37a018=VisuMZ[_0x14e82c(0x21d)][_0x14e82c(0x34d)](_0x147247[_0x14e82c(0x839)]);if(_0x37a018[_0x14e82c(0x62d)]>0x0){if('BANNV'!=='BANNV'){_0xe5ffdd[_0x14e82c(0x21d)][_0x14e82c(0x4d6)][_0x14e82c(0x8eb)](this);const _0x15fec1=this[_0x14e82c(0x5b9)][_0x14e82c(0x250)];if(_0x15fec1)this[_0x14e82c(0x809)](_0x15fec1);}else{if(_0xfa253b[_0x14e82c(0x62d)]>0x0)_0xfa253b+=_0x3d8cd9+_0x14e82c(0x545);else{const _0x2c6292=$dataMapInfos[_0x4a87b4]['name'];_0xfa253b+=_0x4f5ae5+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x14e82c(0x4eb)](_0x4a87b4,_0x2c6292||_0x14e82c(0x925))+_0x4f5ae5;}_0xfa253b+=_0xa1c17a[_0x14e82c(0x4eb)](_0x430465,_0x4c4d3b,_0x400c24,_0x37a018);}}}}if(_0xfa253b['length']>0x0){if(_0x14e82c(0x4ed)!=='HWvUf')_0xfa253b+=_0x3d8cd9;else return this[_0x14e82c(0x615)]();}return _0xfa253b;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x765)]=function(){const _0x3ce2bb=_0x17407e,_0x1c3cc6=$dataTroops['length']*0xa+Math['randomInt'](0xa);alert(_0x3ce2bb(0x72a)[_0x3ce2bb(0x4eb)](_0x1c3cc6));const _0xcc959b=[];for(const _0x306576 of $dataTroops){if(!_0x306576)continue;const _0x4c2684=_0x306576['id'];_0xcc959b[_0x4c2684]=VisuMZ['CoreEngine'][_0x3ce2bb(0x2ac)](_0x4c2684);}setTimeout(VisuMZ[_0x3ce2bb(0x21d)][_0x3ce2bb(0x860)]['bind'](this,_0xcc959b),_0x1c3cc6);},VisuMZ[_0x17407e(0x21d)]['ExtractStrFromTroop']=function(_0x115fa3){const _0x652e1=_0x17407e;if(!$dataTroops[_0x115fa3])return'';let _0x44542a='█'[_0x652e1(0x397)](0x46)+'\x0a\x0a',_0x35a3ca='═'[_0x652e1(0x397)](0x46)+'\x0a\x0a',_0x33ce90='';this[_0x652e1(0x71b)]=0x0;const _0x459156=$dataTroops[_0x115fa3];let _0x793f57=_0x459156[_0x652e1(0x494)];for(const _0x64ce31 of _0x793f57){const _0xe1559c=_0x793f57[_0x652e1(0x803)](_0x64ce31)+0x1;let _0x32fde0=_0x35a3ca+_0x652e1(0x777),_0x30c08f=VisuMZ[_0x652e1(0x21d)]['ExtractStrFromList'](_0x64ce31[_0x652e1(0x839)]);if(_0x30c08f['length']>0x0){if(_0x33ce90['length']>0x0){if(_0x652e1(0x242)==='lSXWi')return _0x290b02['layoutSettings'][_0x652e1(0x694)][_0x652e1(0x8eb)](this);else _0x33ce90+=_0x35a3ca+_0x652e1(0x545);}else _0x33ce90+=_0x44542a+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x652e1(0x4eb)](_0x115fa3,_0x459156['name']||_0x652e1(0x925))+_0x44542a;_0x33ce90+=_0x32fde0['format'](_0xe1559c,_0x30c08f);}}return _0x33ce90[_0x652e1(0x62d)]>0x0&&(_0x652e1(0x720)!==_0x652e1(0x720)?this[_0x652e1(0x706)]={}:_0x33ce90+=_0x35a3ca),_0x33ce90;},VisuMZ['CoreEngine'][_0x17407e(0x860)]=function(_0x38b889){const _0x1a8361=_0x17407e,_0x2e1b24=_0x1a8361(0x290);_0x38b889[_0x1a8361(0x2d3)](undefined)[_0x1a8361(0x2d3)]('')[_0x1a8361(0x2d3)](null);const _0x4a7474=_0x38b889[_0x1a8361(0x84c)]('\x0a\x0a\x0a\x0a\x0a')[_0x1a8361(0x846)]();VisuMZ[_0x1a8361(0x21d)][_0x1a8361(0x4aa)](_0x4a7474,_0x2e1b24,!![]),SceneManager[_0x1a8361(0x26b)]['_active']=!![];},VisuMZ['CoreEngine'][_0x17407e(0x34d)]=function(_0x266986){const _0x5aa551=_0x17407e;let _0x55baaa='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x22e3a2='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x25fd5c='';for(const _0xa1695f of _0x266986){if('PTLmU'===_0x5aa551(0x376))this['cursorPagedown']();else{if(!_0xa1695f)continue;if(_0xa1695f[_0x5aa551(0x9a6)]===0x65){_0x25fd5c+=_0x55baaa+'\x0a',_0x25fd5c+='〘Show\x20Text〙\x0a';if(_0xa1695f['parameters'][0x4]!==''&&_0xa1695f[_0x5aa551(0x277)][0x4]!==undefined){if(_0x5aa551(0x6a1)===_0x5aa551(0x6bc))return _0x2f7638['randomJS'][_0x5aa551(0x8eb)](this);else _0x25fd5c+=_0x5aa551(0x607)[_0x5aa551(0x4eb)](_0xa1695f[_0x5aa551(0x277)][0x4]);}}else{if(_0xa1695f['code']===0x191)_0x25fd5c+=_0x5aa551(0x38c)[_0x5aa551(0x4eb)](_0xa1695f[_0x5aa551(0x277)][0x0]);else{if(_0xa1695f[_0x5aa551(0x9a6)]===0x192)_0x25fd5c+=_0x55baaa,_0x25fd5c+=_0x5aa551(0x53e)[_0x5aa551(0x4eb)](_0x22e3a2,_0xa1695f[_0x5aa551(0x277)][0x0]+0x1,_0xa1695f[_0x5aa551(0x277)][0x1]);else{if(_0xa1695f[_0x5aa551(0x9a6)]===0x193){if(_0x5aa551(0x5a2)!==_0x5aa551(0x5a2))return _0x205990[_0x5aa551(0x7e0)][_0x5aa551(0x964)][_0x5aa551(0x8eb)](this);else _0x25fd5c+=_0x55baaa,_0x25fd5c+='%1〘Choice\x20Cancel〙%1'['format'](_0x22e3a2);}else{if(_0xa1695f[_0x5aa551(0x9a6)]===0x194)_0x25fd5c+=_0x55baaa,_0x25fd5c+=_0x5aa551(0x5e4)[_0x5aa551(0x4eb)](_0x22e3a2);else{if(_0xa1695f[_0x5aa551(0x9a6)]===0x69)_0x25fd5c+=_0x55baaa+'\x0a',_0x25fd5c+=_0x5aa551(0x81b);else{if(_0xa1695f[_0x5aa551(0x9a6)]===0x6c){if(_0x5aa551(0x2c9)!=='IfHmj')_0x25fd5c+=_0x55baaa+'\x0a',_0x25fd5c+=_0x5aa551(0x3f8)[_0x5aa551(0x4eb)](_0xa1695f[_0x5aa551(0x277)][0x0]);else{const _0x44bfb7='_stored_pendingColor';this[_0x5aa551(0x706)]=this['_colorCache']||{};if(this['_colorCache'][_0x44bfb7])return this['_colorCache'][_0x44bfb7];const _0x3bcc0c=_0x580184['CoreEngine'][_0x5aa551(0x5cb)]['Color'][_0x5aa551(0x4e1)];return this[_0x5aa551(0x92f)](_0x44bfb7,_0x3bcc0c);}}else{if(_0xa1695f[_0x5aa551(0x9a6)]===0x198)_0x25fd5c+=_0x5aa551(0x38c)[_0x5aa551(0x4eb)](_0xa1695f[_0x5aa551(0x277)][0x0]);else{if(_0xa1695f[_0x5aa551(0x9a6)]===0x75){const _0xa12b20=$dataCommonEvents[_0xa1695f[_0x5aa551(0x277)][0x0]];if(_0xa12b20&&this['_commonEventLayers']<=0xa){this[_0x5aa551(0x71b)]++;let _0x5258e6=VisuMZ['CoreEngine'][_0x5aa551(0x34d)](_0xa12b20['list']);if(_0x5258e6[_0x5aa551(0x62d)]>0x0){if(_0x5aa551(0x6d5)===_0x5aa551(0x7f5))return _0x52ade3['layoutSettings'][_0x5aa551(0x69d)]['call'](this);else _0x25fd5c+=_0x55baaa,_0x25fd5c+=_0x22e3a2,_0x25fd5c+=_0x5aa551(0x7ff)[_0x5aa551(0x4eb)](_0xa12b20['id'],_0xa12b20[_0x5aa551(0x506)]),_0x25fd5c+=_0x22e3a2,_0x25fd5c+=_0x5258e6,_0x25fd5c+=_0x22e3a2,_0x25fd5c+=_0x5aa551(0x58a)[_0x5aa551(0x4eb)](_0xa12b20['id'],_0xa12b20[_0x5aa551(0x506)]),_0x25fd5c+=_0x22e3a2;}this['_commonEventLayers']--;}}}}}}}}}}}}return _0x25fd5c['length']>0x0&&(_0x25fd5c+=_0x55baaa),_0x25fd5c;},PluginManager[_0x17407e(0x8ea)](pluginData['name'],_0x17407e(0x996),_0x51e195=>{const _0x14963a=_0x17407e;VisuMZ[_0x14963a(0x346)](_0x51e195,_0x51e195);const _0x5e8143=_0x51e195[_0x14963a(0x5d2)];VisuMZ[_0x14963a(0x950)](_0x5e8143);}),PluginManager['registerCommand'](pluginData[_0x17407e(0x506)],_0x17407e(0x273),_0x50e46d=>{const _0x2c083e=_0x17407e;VisuMZ['ConvertParams'](_0x50e46d,_0x50e46d);const _0x273467=_0x50e46d[_0x2c083e(0x3c6)]||0x0;$gameParty['gainGold'](_0x273467);}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],'MapOnceParallel',_0x31a191=>{const _0x378456=_0x17407e;if(!SceneManager[_0x378456(0x82c)]())return;VisuMZ['ConvertParams'](_0x31a191,_0x31a191);const _0x4b6868=_0x31a191[_0x378456(0x3a1)];SceneManager[_0x378456(0x26b)]['playOnceParallelInterpreter'](_0x4b6868);}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x3a5),_0x592960=>{const _0x11e50f=_0x17407e;if(!$gameTemp[_0x11e50f(0x3a3)]())return;if(!Utils[_0x11e50f(0x6e7)]())return;VisuMZ['ConvertParams'](_0x592960,_0x592960);const _0x47bfa0=_0x592960[_0x11e50f(0x836)]||0x1;$gameTemp['_pictureCoordinatesMode']=_0x47bfa0;}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x6dd),_0x5c888b=>{const _0x4dc189=_0x17407e;VisuMZ[_0x4dc189(0x346)](_0x5c888b,_0x5c888b);const _0x96e996=_0x5c888b[_0x4dc189(0x26d)]||0x1,_0x5d65da=_0x5c888b[_0x4dc189(0x90b)]||_0x4dc189(0x3cc),_0x46cec8=$gameScreen[_0x4dc189(0x65a)](_0x96e996);_0x46cec8&&(_0x4dc189(0x214)!==_0x4dc189(0x214)?this['isItemStyle']()?this[_0x4dc189(0x225)]():_0x43ecd2[_0x4dc189(0x21d)][_0x4dc189(0x766)][_0x4dc189(0x8eb)](this):_0x46cec8[_0x4dc189(0x597)](_0x5d65da));}),PluginManager[_0x17407e(0x8ea)](pluginData['name'],_0x17407e(0x369),_0x5a4117=>{for(let _0x5123e3=0x1;_0x5123e3<=0x64;_0x5123e3++){$gameScreen['erasePicture'](_0x5123e3);}}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],'PictureEraseRange',_0x918588=>{const _0x57077f=_0x17407e;VisuMZ[_0x57077f(0x346)](_0x918588,_0x918588);const _0x47c01b=Math[_0x57077f(0x4f2)](_0x918588[_0x57077f(0x200)],_0x918588[_0x57077f(0x23c)]),_0x19b812=Math['max'](_0x918588['StartID'],_0x918588['EndingID']);for(let _0xce357=_0x47c01b;_0xce357<=_0x19b812;_0xce357++){$gameScreen[_0x57077f(0x233)](_0xce357);}}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x4de),_0x3aa56b=>{const _0x5c750d=_0x17407e;VisuMZ[_0x5c750d(0x346)](_0x3aa56b,_0x3aa56b);const _0x285945=Math[_0x5c750d(0x909)](_0x3aa56b[_0x5c750d(0x836)])['clamp'](0x1,0x64),_0x3f4c03=_0x3aa56b['Settings'],_0x48a484=_0x3f4c03['Origin'][_0x5c750d(0x509)](0x0,0x1),_0x18052f=Math[_0x5c750d(0x909)](_0x3f4c03[_0x5c750d(0x291)]||0x0),_0x62d074=Math[_0x5c750d(0x909)](_0x3f4c03[_0x5c750d(0x26f)]||0x0),_0x447a4c=Math[_0x5c750d(0x909)](_0x3f4c03[_0x5c750d(0x95d)]||0x0),_0x5ad50b=Math[_0x5c750d(0x909)](_0x3f4c03[_0x5c750d(0x3b0)]||0x0),_0x55b6ca=Math['round'](_0x3f4c03[_0x5c750d(0x978)])[_0x5c750d(0x509)](0x0,0xff),_0x4c1ede=_0x3f4c03[_0x5c750d(0x5e9)],_0x403060=_0x5c750d(0x285),_0x1f8ef0=_0x3aa56b[_0x5c750d(0x6bf)]?_0x5c750d(0x6bf):_0x5c750d(0x522),_0x1f0114=_0x403060[_0x5c750d(0x4eb)](_0x3aa56b[_0x5c750d(0x885)],_0x1f8ef0);$gameScreen[_0x5c750d(0x71c)](_0x285945,_0x1f0114,_0x48a484,_0x18052f,_0x62d074,_0x447a4c,_0x5ad50b,_0x55b6ca,_0x4c1ede);}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x577),_0xbadb2e=>{const _0x164d5c=_0x17407e;VisuMZ[_0x164d5c(0x346)](_0xbadb2e,_0xbadb2e);const _0x2807b5=_0xbadb2e['Type']||_0x164d5c(0x1b4),_0x3321b2=_0xbadb2e[_0x164d5c(0x5c0)][_0x164d5c(0x509)](0x1,0x9),_0x500144=_0xbadb2e['Speed'][_0x164d5c(0x509)](0x1,0x9),_0x3161bb=_0xbadb2e[_0x164d5c(0x5bf)]||0x1,_0x43f9d4=_0xbadb2e[_0x164d5c(0x5fb)];$gameScreen[_0x164d5c(0x6d8)](_0x2807b5),$gameScreen['startShake'](_0x3321b2,_0x500144,_0x3161bb);if(_0x43f9d4){const _0xa2b2a=$gameTemp[_0x164d5c(0x7ea)]();if(_0xa2b2a)_0xa2b2a[_0x164d5c(0x263)](_0x3161bb);}}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x9b1),_0x3774e4=>{const _0x546cbe=_0x17407e;VisuMZ['ConvertParams'](_0x3774e4,_0x3774e4);const _0x9b3b7f=_0x3774e4[_0x546cbe(0x76f)]||0x1;$gameSystem[_0x546cbe(0x3f7)](_0x9b3b7f);}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x5b5),_0x105874=>{const _0x5288d6=_0x17407e;if($gameParty[_0x5288d6(0x2f0)]())return;VisuMZ[_0x5288d6(0x346)](_0x105874,_0x105874);const _0x20b9ee=_0x105874[_0x5288d6(0x76f)];if(_0x20b9ee[_0x5288d6(0x333)](/Front/i))$gameSystem[_0x5288d6(0x4f7)](![]);else{if(_0x20b9ee['match'](/Side/i))$gameSystem['setSideView'](!![]);else{if('EyrKF'!==_0x5288d6(0x87f))$gameSystem[_0x5288d6(0x4f7)](!$gameSystem[_0x5288d6(0x429)]());else{const _0x55fbe5=_0x20bda4['iconWidth'],_0x370a1f=_0x4accb1[_0x5288d6(0x4f1)],_0x233156=this[_0x5288d6(0x661)][_0x5288d6(0x333)](/SMOOTH/i);this[_0x5288d6(0x424)]=new _0x46e0ca(_0x55fbe5,_0x370a1f);const _0x2726fd=_0x4d4709[_0x5288d6(0x2cf)]('IconSet'),_0x2b1448=_0x405ca9%0x10*_0x55fbe5,_0x41292d=_0x4589e9[_0x5288d6(0x3d1)](_0x153eef/0x10)*_0x370a1f;this[_0x5288d6(0x424)][_0x5288d6(0x7b3)]=_0x233156,this[_0x5288d6(0x424)][_0x5288d6(0x628)](_0x2726fd,_0x2b1448,_0x41292d,_0x55fbe5,_0x370a1f,0x0,0x0,_0x55fbe5,_0x370a1f);}}}}),PluginManager['registerCommand'](pluginData[_0x17407e(0x506)],'SystemLoadAudio',_0x51a236=>{const _0xa7bb7c=_0x17407e;if($gameParty[_0xa7bb7c(0x2f0)]())return;VisuMZ[_0xa7bb7c(0x346)](_0x51a236,_0x51a236);const _0x4baea9=[_0xa7bb7c(0x967),_0xa7bb7c(0x4bc),'me','se'];for(const _0x3b4d92 of _0x4baea9){const _0x40d1fa=_0x51a236[_0x3b4d92],_0xa91ed0='%1/'[_0xa7bb7c(0x4eb)](_0x3b4d92);for(const _0x532c0e of _0x40d1fa){'ggnPx'!=='izTOr'?AudioManager[_0xa7bb7c(0x9b6)](_0xa91ed0,_0x532c0e):(_0x46c7ec[_0xa7bb7c(0x1de)]=!![],_0x138b4e[_0xa7bb7c(0x21d)][_0xa7bb7c(0x310)][_0xa7bb7c(0x8eb)](this,_0x93b860,_0x23f1b1),_0x336dff[_0xa7bb7c(0x1de)]=_0x1045ae);}}}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],_0x17407e(0x29c),_0x54e1d7=>{const _0x39f35c=_0x17407e;if($gameParty[_0x39f35c(0x2f0)]())return;VisuMZ['ConvertParams'](_0x54e1d7,_0x54e1d7);const _0x340ea5=[_0x39f35c(0x5dd),_0x39f35c(0x31c),_0x39f35c(0x2c1),'characters',_0x39f35c(0x98c),'faces','parallaxes',_0x39f35c(0x61e),_0x39f35c(0x76e),_0x39f35c(0x3d0),'system',_0x39f35c(0x6ef),_0x39f35c(0x417),'titles2'];for(const _0x2e6928 of _0x340ea5){if(_0x39f35c(0x649)!==_0x39f35c(0x8d1)){const _0x14ebc5=_0x54e1d7[_0x2e6928],_0x134a09=_0x39f35c(0x5f5)['format'](_0x2e6928);for(const _0x128110 of _0x14ebc5){ImageManager[_0x39f35c(0x854)](_0x134a09,_0x128110);}}else{if(!_0x42c16c[_0x39f35c(0x82c)]())return;_0x52abeb[_0x39f35c(0x346)](_0x43ab1c,_0x1538cc);const _0x4637ef=_0x2ccd1e[_0x39f35c(0x3a1)];_0x1537b2[_0x39f35c(0x26b)][_0x39f35c(0x1e8)](_0x4637ef);}}}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],'SwitchRandomizeOne',_0x3ce333=>{const _0x1532cb=_0x17407e;if($gameParty[_0x1532cb(0x2f0)]())return;VisuMZ[_0x1532cb(0x346)](_0x3ce333,_0x3ce333);const _0x236e98=_0x3ce333['IDs'],_0x5d22b5=(_0x3ce333[_0x1532cb(0x399)]||0x0)/0x64;for(const _0x155a79 of _0x236e98){const _0x5ef6c4=Math[_0x1532cb(0x1b4)]()<=_0x5d22b5;$gameSwitches[_0x1532cb(0x61a)](_0x155a79,_0x5ef6c4);}}),PluginManager['registerCommand'](pluginData[_0x17407e(0x506)],_0x17407e(0x68d),_0x37578a=>{const _0x139064=_0x17407e;if($gameParty[_0x139064(0x2f0)]())return;VisuMZ[_0x139064(0x346)](_0x37578a,_0x37578a);const _0x25aa64=Math[_0x139064(0x4f2)](_0x37578a['StartID'],_0x37578a[_0x139064(0x23c)]),_0x68b445=Math[_0x139064(0x531)](_0x37578a[_0x139064(0x200)],_0x37578a[_0x139064(0x23c)]),_0x51adb1=(_0x37578a[_0x139064(0x399)]||0x0)/0x64;for(let _0x1a7531=_0x25aa64;_0x1a7531<=_0x68b445;_0x1a7531++){const _0x5e0bba=Math['random']()<=_0x51adb1;$gameSwitches[_0x139064(0x61a)](_0x1a7531,_0x5e0bba);}}),PluginManager[_0x17407e(0x8ea)](pluginData[_0x17407e(0x506)],'SwitchToggleOne',_0x2fa852=>{const _0x2b5c72=_0x17407e;if($gameParty[_0x2b5c72(0x2f0)]())return;VisuMZ[_0x2b5c72(0x346)](_0x2fa852,_0x2fa852);const _0x4976a5=_0x2fa852['IDs'];for(const _0x3cd551 of _0x4976a5){const _0x590bc2=$gameSwitches[_0x2b5c72(0x3c6)](_0x3cd551);$gameSwitches[_0x2b5c72(0x61a)](_0x3cd551,!_0x590bc2);}}),PluginManager['registerCommand'](pluginData['name'],_0x17407e(0x1e7),_0x1a73b9=>{const _0x24cef0=_0x17407e;if($gameParty['inBattle']())return;VisuMZ[_0x24cef0(0x346)](_0x1a73b9,_0x1a73b9);const _0x4f4e90=Math[_0x24cef0(0x4f2)](_0x1a73b9['StartID'],_0x1a73b9['EndingID']),_0x4bd1a6=Math[_0x24cef0(0x531)](_0x1a73b9[_0x24cef0(0x200)],_0x1a73b9[_0x24cef0(0x23c)]);for(let _0x2db125=_0x4f4e90;_0x2db125<=_0x4bd1a6;_0x2db125++){const _0x1edf7a=$gameSwitches[_0x24cef0(0x3c6)](_0x2db125);$gameSwitches[_0x24cef0(0x61a)](_0x2db125,!_0x1edf7a);}}),PluginManager['registerCommand'](pluginData[_0x17407e(0x506)],_0x17407e(0x758),_0x44687f=>{const _0x4adca6=_0x17407e;if($gameParty['inBattle']())return;VisuMZ[_0x4adca6(0x346)](_0x44687f,_0x44687f);const _0x4c1ebf=_0x44687f[_0x4adca6(0x76f)][_0x4adca6(0x99a)]()[_0x4adca6(0x846)](),_0x4c0bae=VisuMZ[_0x4adca6(0x21d)][_0x4adca6(0x95e)](_0x4c1ebf);$gameSystem[_0x4adca6(0x252)](_0x4c0bae);}),VisuMZ['CoreEngine'][_0x17407e(0x95e)]=function(_0x147e08){const _0x579b3b=_0x17407e;_0x147e08=_0x147e08||_0x579b3b(0x420),_0x147e08=String(_0x147e08)['toUpperCase']()[_0x579b3b(0x846)]();switch(_0x147e08){case _0x579b3b(0x85e):return 0x0;case _0x579b3b(0x6e1):Imported[_0x579b3b(0x8d9)]&&(ConfigManager['atbActive']=!![]);return 0x1;case _0x579b3b(0x453):Imported[_0x579b3b(0x8d9)]&&(_0x579b3b(0x4b4)!==_0x579b3b(0x4b4)?this['_itemWindow'][_0x579b3b(0x3c0)](_0x5d3f43[_0x579b3b(0x7e0)]['ItemBgType']):ConfigManager[_0x579b3b(0x96d)]=![]);return 0x2;case _0x579b3b(0x60b):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x579b3b(0x60b);break;case _0x579b3b(0x582):if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x579b3b(0x582);break;case _0x579b3b(0x54b):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x579b3b(0x54b);break;case _0x579b3b(0x6f4):if(Imported[_0x579b3b(0x43f)])return _0x579b3b(0x6f4);break;case _0x579b3b(0x6fd):if(Imported[_0x579b3b(0x6a4)])return _0x579b3b(0x6fd);break;case'ETB':if(Imported['VisuMZ_2_BattleSystemETB'])return _0x579b3b(0x505);break;case _0x579b3b(0x357):if(Imported[_0x579b3b(0x627)])return _0x579b3b(0x357);break;}return $dataSystem[_0x579b3b(0x367)];},PluginManager['registerCommand'](pluginData[_0x17407e(0x506)],_0x17407e(0x1ef),_0x14e7ed=>{const _0x30326c=_0x17407e;VisuMZ[_0x30326c(0x346)](_0x14e7ed,_0x14e7ed);const _0x246d84=_0x14e7ed['option']||0x1;$gameSystem[_0x30326c(0x6cb)](_0x246d84);}),VisuMZ[_0x17407e(0x21d)][_0x17407e(0x583)]=Scene_Boot[_0x17407e(0x374)][_0x17407e(0x3f9)],Scene_Boot[_0x17407e(0x374)][_0x17407e(0x3f9)]=function(){const _0x3b25bd=_0x17407e;VisuMZ[_0x3b25bd(0x21d)][_0x3b25bd(0x583)]['call'](this),this[_0x3b25bd(0x812)](),this[_0x3b25bd(0x573)](),this['process_VisuMZ_CoreEngine_Settings'](),this['process_VisuMZ_CoreEngine_Functions'](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x3b25bd(0x229)]();},VisuMZ['CoreEngine'][_0x17407e(0x801)]={},Scene_Boot['prototype'][_0x17407e(0x812)]=function(){const _0x4e4ed9=_0x17407e,_0x3a36ac=[_0x4e4ed9(0x69e),_0x4e4ed9(0x4a8),_0x4e4ed9(0x6a7),_0x4e4ed9(0x6b0),_0x4e4ed9(0x254),_0x4e4ed9(0x2a5),_0x4e4ed9(0x970),_0x4e4ed9(0x478)],_0x3e1ad9=[_0x4e4ed9(0x7fa),_0x4e4ed9(0x1ff),'CRI',_0x4e4ed9(0x8b5),'MEV',_0x4e4ed9(0x40f),_0x4e4ed9(0x286),_0x4e4ed9(0x88b),_0x4e4ed9(0x1ce),_0x4e4ed9(0x696)],_0x47be51=[_0x4e4ed9(0x2ae),_0x4e4ed9(0x383),_0x4e4ed9(0x8b9),_0x4e4ed9(0x525),'MCR','TCR','PDR',_0x4e4ed9(0x66e),_0x4e4ed9(0x83c),_0x4e4ed9(0x3c9)],_0x35612c=[_0x3a36ac,_0x3e1ad9,_0x47be51],_0x2490f7=[_0x4e4ed9(0x529),_0x4e4ed9(0x3d2),'Plus2','Max',_0x4e4ed9(0x3e9),_0x4e4ed9(0x6d6),_0x4e4ed9(0x986),_0x4e4ed9(0x44b),_0x4e4ed9(0x94c),_0x4e4ed9(0x1fa)];for(const _0x3a8e65 of _0x35612c){let _0x359aad='';if(_0x3a8e65===_0x3a36ac)_0x359aad='param';if(_0x3a8e65===_0x3e1ad9)_0x359aad='xparam';if(_0x3a8e65===_0x47be51)_0x359aad=_0x4e4ed9(0x645);for(const _0x15fc18 of _0x2490f7){let _0x444dab=_0x4e4ed9(0x5f3)[_0x4e4ed9(0x4eb)](_0x359aad,_0x15fc18);VisuMZ[_0x4e4ed9(0x21d)]['RegExp'][_0x444dab]=[],VisuMZ['CoreEngine'][_0x4e4ed9(0x801)][_0x444dab+'JS']=[];let _0x15cae1=_0x4e4ed9(0x96f);if([_0x4e4ed9(0x529),_0x4e4ed9(0x44b)][_0x4e4ed9(0x25d)](_0x15fc18)){if(_0x4e4ed9(0x987)===_0x4e4ed9(0x42d))return _0x183588[_0x4e4ed9(0x21d)][_0x4e4ed9(0x5cb)][_0x4e4ed9(0x685)][_0x4e4ed9(0x75f)];else _0x15cae1+=_0x4e4ed9(0x870);}else{if([_0x4e4ed9(0x3d2),_0x4e4ed9(0x94c)]['includes'](_0x15fc18))_0x15cae1+=_0x4e4ed9(0x42c);else{if([_0x4e4ed9(0x43d),_0x4e4ed9(0x1fa)][_0x4e4ed9(0x25d)](_0x15fc18))_0x4e4ed9(0x919)===_0x4e4ed9(0x441)?_0x52090b=_0x563e53['concat'](_0x517d99):_0x15cae1+=_0x4e4ed9(0x853);else{if(_0x15fc18===_0x4e4ed9(0x248))_0x15cae1+=_0x4e4ed9(0x7e2);else{if(_0x15fc18===_0x4e4ed9(0x6d6))_0x15cae1+='(\x5cd+)([%％])>';else _0x15fc18===_0x4e4ed9(0x986)&&(_0x15cae1+=_0x4e4ed9(0x94e));}}}}for(const _0x44975b of _0x3a8e65){if('NrTPT'===_0x4e4ed9(0x5fe)){let _0x1d21e1=_0x15fc18[_0x4e4ed9(0x2dd)](/[\d+]/g,'')['toUpperCase']();const _0x1f7552=_0x15cae1['format'](_0x44975b,_0x1d21e1);VisuMZ['CoreEngine'][_0x4e4ed9(0x801)][_0x444dab][_0x4e4ed9(0x2b7)](new RegExp(_0x1f7552,'i'));const _0x5cadc6='<JS\x20%1\x20%2:[\x20](.*)>'['format'](_0x44975b,_0x1d21e1);VisuMZ['CoreEngine']['RegExp'][_0x444dab+'JS']['push'](new RegExp(_0x5cadc6,'i'));}else this['_forcedBattleSys']=_0x4e4ed9(0x582);}}}},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x573)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x6ca)]=function(){const _0x5eaddc=_0x17407e,_0x4dbf7e=VisuMZ[_0x5eaddc(0x21d)]['Settings'];_0x4dbf7e[_0x5eaddc(0x7e8)][_0x5eaddc(0x37d)]&&(_0x5eaddc(0x345)!==_0x5eaddc(0x7b9)?VisuMZ[_0x5eaddc(0x23f)](!![]):(_0x2a1d59[_0x5eaddc(0x1b1)](_0x5eaddc(0x433)),_0x5dada0['log'](_0x4b5979)));if(_0x4dbf7e[_0x5eaddc(0x7e8)]['ModernControls']){if(_0x5eaddc(0x70c)===_0x5eaddc(0x47d)){const _0x5373f2=_0x428cfe(this[_0x5eaddc(0x2ea)][_0x5eaddc(0x506)]),_0x18f1cd=this[_0x5eaddc(0x81d)](_0x5373f2);_0x18f1cd&&(_0x18f1cd[_0x5eaddc(0x33d)]!==''||_0x18f1cd[_0x5eaddc(0x40e)]!=='')&&(this[_0x5eaddc(0x843)]=new _0x546af2(_0x5404b2[_0x5eaddc(0x923)](_0x18f1cd[_0x5eaddc(0x33d)])),this['_backSprite2']=new _0x550fe8(_0x4e65df['loadTitle2'](_0x18f1cd[_0x5eaddc(0x40e)])),this[_0x5eaddc(0x809)](this[_0x5eaddc(0x843)]),this[_0x5eaddc(0x809)](this[_0x5eaddc(0x45b)]),this[_0x5eaddc(0x843)][_0x5eaddc(0x424)][_0x5eaddc(0x686)](this['adjustSprite'][_0x5eaddc(0x9b5)](this,this[_0x5eaddc(0x843)])),this[_0x5eaddc(0x45b)][_0x5eaddc(0x424)][_0x5eaddc(0x686)](this[_0x5eaddc(0x73e)][_0x5eaddc(0x9b5)](this,this[_0x5eaddc(0x45b)])));}else Input['keyMapper'][0x23]=_0x5eaddc(0x754),Input['keyMapper'][0x24]=_0x5eaddc(0x60c);}if(_0x4dbf7e['ButtonAssist']){if(_0x5eaddc(0x359)==='OTYXf'){const _0x2575fd=_0x4dbf7e[_0x5eaddc(0x963)];_0x2575fd[_0x5eaddc(0x7a5)]=_0x2575fd['KeySHIFT']||_0x5eaddc(0x64c),_0x2575fd[_0x5eaddc(0x463)]=_0x2575fd['KeyTAB']||_0x5eaddc(0x9a1);}else{const _0x38f426=this[_0x5eaddc(0x45f)]();_0x1ff73c['isTriggered'](_0x5eaddc(0x60c))&&this[_0x5eaddc(0x936)](_0x4cda5c['min'](this[_0x5eaddc(0x45f)](),0x0)),_0x3e3b67[_0x5eaddc(0x7cd)](_0x5eaddc(0x754))&&this[_0x5eaddc(0x936)](_0x271731[_0x5eaddc(0x531)](this['index'](),this[_0x5eaddc(0x717)]()-0x1)),this[_0x5eaddc(0x45f)]()!==_0x38f426&&this[_0x5eaddc(0x3d4)]();}}_0x4dbf7e[_0x5eaddc(0x602)][_0x5eaddc(0x959)]&&(Input[_0x5eaddc(0x946)][0x57]='up',Input[_0x5eaddc(0x946)][0x41]=_0x5eaddc(0x917),Input[_0x5eaddc(0x946)][0x53]='down',Input[_0x5eaddc(0x946)][0x44]=_0x5eaddc(0x1ad),Input[_0x5eaddc(0x946)][0x45]=_0x5eaddc(0x52c)),_0x4dbf7e[_0x5eaddc(0x602)][_0x5eaddc(0x44e)]&&(Input[_0x5eaddc(0x946)][0x52]=_0x5eaddc(0x51c)),_0x4dbf7e[_0x5eaddc(0x2d0)][_0x5eaddc(0x7f6)]=_0x4dbf7e['Param']['DisplayedParams'][_0x5eaddc(0x6cd)](_0x383b3f=>_0x383b3f['toUpperCase']()[_0x5eaddc(0x846)]()),_0x4dbf7e['Param']['ExtDisplayedParams']=_0x4dbf7e[_0x5eaddc(0x2d0)]['ExtDisplayedParams'][_0x5eaddc(0x6cd)](_0xa650f9=>_0xa650f9[_0x5eaddc(0x99a)]()['trim']());},Scene_Boot[_0x17407e(0x374)]['process_VisuMZ_CoreEngine_Functions']=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x5f4)]=function(){const _0x2d69e7=_0x17407e,_0x5a6c32=VisuMZ[_0x2d69e7(0x21d)][_0x2d69e7(0x5cb)][_0x2d69e7(0x331)];for(const _0x244194 of _0x5a6c32){if(_0x2d69e7(0x999)===_0x2d69e7(0x999)){const _0x1c828e=_0x244194[_0x2d69e7(0x55a)][_0x2d69e7(0x2dd)](/[ ]/g,''),_0xdeb68c=_0x244194[_0x2d69e7(0x3f3)];VisuMZ[_0x2d69e7(0x21d)][_0x2d69e7(0x497)](_0x1c828e,_0xdeb68c);}else _0x45f73f*=_0x52ce4b(_0x1a0eae);}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x497)]=function(_0x5f39c4,_0x13c5c6){const _0x3bd97e=_0x17407e;if(!!window[_0x5f39c4]){if($gameTemp[_0x3bd97e(0x3a3)]())console[_0x3bd97e(0x1b1)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x3bd97e(0x4eb)](_0x5f39c4));}const _0xcf279=_0x3bd97e(0x73a)['format'](_0x5f39c4,_0x13c5c6);window[_0x5f39c4]=new Function(_0xcf279);},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x763)]=function(){const _0x1ef1af=_0x17407e,_0x3b73b7=VisuMZ[_0x1ef1af(0x21d)][_0x1ef1af(0x5cb)]['CustomParam'];if(!_0x3b73b7)return;for(const _0x5c81d5 of _0x3b73b7){if(_0x1ef1af(0x385)===_0x1ef1af(0x524)){if(this[_0x1ef1af(0x708)])return;_0x319048[_0x1ef1af(0x21d)]['Input_pollGamepads'][_0x1ef1af(0x8eb)](this);}else{if(!_0x5c81d5)continue;VisuMZ['CoreEngine'][_0x1ef1af(0x567)](_0x5c81d5);}}},VisuMZ['CoreEngine'][_0x17407e(0x982)]={},VisuMZ['CoreEngine'][_0x17407e(0x500)]={},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x234)]={},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3a9)]={},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x567)]=function(_0x3cff41){const _0x4e0fa0=_0x17407e,_0x2fe8aa=_0x3cff41[_0x4e0fa0(0x6d2)],_0x15b21b=_0x3cff41[_0x4e0fa0(0x5dc)],_0x1bdfd8=_0x3cff41['Icon'],_0x3ff3e6=_0x3cff41[_0x4e0fa0(0x58b)],_0x2ccfcc=new Function(_0x3cff41['ValueJS']);VisuMZ[_0x4e0fa0(0x21d)][_0x4e0fa0(0x982)][_0x2fe8aa[_0x4e0fa0(0x99a)]()[_0x4e0fa0(0x846)]()]=_0x15b21b,VisuMZ[_0x4e0fa0(0x21d)][_0x4e0fa0(0x500)][_0x2fe8aa['toUpperCase']()['trim']()]=_0x1bdfd8,VisuMZ[_0x4e0fa0(0x21d)][_0x4e0fa0(0x234)][_0x2fe8aa[_0x4e0fa0(0x99a)]()[_0x4e0fa0(0x846)]()]=_0x3ff3e6,VisuMZ['CoreEngine'][_0x4e0fa0(0x3a9)][_0x2fe8aa[_0x4e0fa0(0x99a)]()[_0x4e0fa0(0x846)]()]=_0x2fe8aa,Object[_0x4e0fa0(0x3da)](Game_BattlerBase[_0x4e0fa0(0x374)],_0x2fe8aa,{'get'(){const _0x3ffd6a=_0x4e0fa0;if(_0x3ffd6a(0x5a1)==='dmyCb'){const _0x2ff990=_0x2ccfcc[_0x3ffd6a(0x8eb)](this);return _0x3ff3e6===_0x3ffd6a(0x1f3)?Math['round'](_0x2ff990):_0x2ff990;}else _0x408c9c[_0x3ffd6a(0x21d)][_0x3ffd6a(0x5ac)][_0x3ffd6a(0x8eb)](this,_0x2535bd,_0x2ca4c7,_0x4aaf99,_0x1e87a7),this[_0x3ffd6a(0x727)]();}});},VisuMZ[_0x17407e(0x229)]=function(){const _0x34269a=_0x17407e;for(const _0x3bebe3 of $dataActors){if(_0x3bebe3)VisuMZ[_0x34269a(0x3ff)](_0x3bebe3);}for(const _0x1e8322 of $dataClasses){if(_0x1e8322)VisuMZ[_0x34269a(0x468)](_0x1e8322);}for(const _0x10fa9e of $dataSkills){if(_0x10fa9e)VisuMZ['ParseSkillNotetags'](_0x10fa9e);}for(const _0x1d8607 of $dataItems){if(_0x1d8607)VisuMZ[_0x34269a(0x4c8)](_0x1d8607);}for(const _0x17b181 of $dataWeapons){if(_0x17b181)VisuMZ[_0x34269a(0x91e)](_0x17b181);}for(const _0x3e128c of $dataArmors){if('uEfjI'!==_0x34269a(0x211)){const _0xcc2da4=this[_0x34269a(0x51d)](_0x2fe9b3,_0x2fe1ad);_0xcc2da4[_0x34269a(0x424)]['drawText'](_0x4281c7[_0x16149b],0x0,0x0,_0x3a3ef4,_0x5f33a1,_0x34269a(0x98b)),_0xcc2da4['x']=(_0x325436-(_0x270152[_0x34269a(0x62d)]-0x1)/0x2)*_0x278c13,_0xcc2da4['dy']=-_0x308e0c;}else{if(_0x3e128c)VisuMZ['ParseArmorNotetags'](_0x3e128c);}}for(const _0x42979b of $dataEnemies){if(_0x34269a(0x8e2)!=='JVaNn')this[_0x34269a(0x671)]='SV';else{if(_0x42979b)VisuMZ[_0x34269a(0x55f)](_0x42979b);}}for(const _0x1cd816 of $dataStates){if(_0x1cd816)VisuMZ[_0x34269a(0x2a2)](_0x1cd816);}for(const _0xe6fdae of $dataTilesets){if(_0xe6fdae)VisuMZ[_0x34269a(0x3fd)](_0xe6fdae);}},VisuMZ['ParseActorNotetags']=function(_0x3b5a50){},VisuMZ[_0x17407e(0x468)]=function(_0x5dbd45){},VisuMZ[_0x17407e(0x96e)]=function(_0x4c0491){},VisuMZ[_0x17407e(0x4c8)]=function(_0x17bf5b){},VisuMZ['ParseWeaponNotetags']=function(_0x4b5ffe){},VisuMZ[_0x17407e(0x817)]=function(_0x2d1325){},VisuMZ[_0x17407e(0x55f)]=function(_0x4cf8b7){},VisuMZ[_0x17407e(0x2a2)]=function(_0xaa366a){},VisuMZ['ParseTilesetNotetags']=function(_0x20ed52){},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3ff)]=VisuMZ[_0x17407e(0x3ff)],VisuMZ[_0x17407e(0x3ff)]=function(_0x484553){const _0x47eaf9=_0x17407e;VisuMZ[_0x47eaf9(0x21d)][_0x47eaf9(0x3ff)]['call'](this,_0x484553);const _0x39221d=_0x484553[_0x47eaf9(0x539)];if(_0x39221d[_0x47eaf9(0x333)](/<MAX LEVEL:[ ](\d+)>/i)){_0x484553[_0x47eaf9(0x465)]=Number(RegExp['$1']);if(_0x484553[_0x47eaf9(0x465)]===0x0)_0x484553[_0x47eaf9(0x465)]=Number['MAX_SAFE_INTEGER'];}_0x39221d[_0x47eaf9(0x333)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x484553[_0x47eaf9(0x892)]=Math['min'](Number(RegExp['$1']),_0x484553[_0x47eaf9(0x465)]));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x468)]=VisuMZ[_0x17407e(0x468)],VisuMZ[_0x17407e(0x468)]=function(_0x30c0f3){const _0xb9de26=_0x17407e;VisuMZ[_0xb9de26(0x21d)]['ParseClassNotetags'][_0xb9de26(0x8eb)](this,_0x30c0f3);if(_0x30c0f3[_0xb9de26(0x50a)])for(const _0x4ac452 of _0x30c0f3['learnings']){_0x4ac452[_0xb9de26(0x539)][_0xb9de26(0x333)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x4ac452[_0xb9de26(0x1f5)]=Math[_0xb9de26(0x531)](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine']['ParseEnemyNotetags']=VisuMZ[_0x17407e(0x55f)],VisuMZ[_0x17407e(0x55f)]=function(_0x589d39){const _0x51fba5=_0x17407e;VisuMZ[_0x51fba5(0x21d)][_0x51fba5(0x55f)][_0x51fba5(0x8eb)](this,_0x589d39),_0x589d39[_0x51fba5(0x1f5)]=0x1;const _0x199487=_0x589d39['note'];if(_0x199487[_0x51fba5(0x333)](/<LEVEL:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x1f5)]=Number(RegExp['$1']);if(_0x199487[_0x51fba5(0x333)](/<MAXHP:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x944)][0x0]=Number(RegExp['$1']);if(_0x199487['match'](/<MAXMP:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x944)][0x1]=Number(RegExp['$1']);if(_0x199487[_0x51fba5(0x333)](/<ATK:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x944)][0x2]=Number(RegExp['$1']);if(_0x199487['match'](/<DEF:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x944)][0x3]=Number(RegExp['$1']);if(_0x199487[_0x51fba5(0x333)](/<MAT:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x944)][0x4]=Number(RegExp['$1']);if(_0x199487[_0x51fba5(0x333)](/<MDF:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x944)][0x5]=Number(RegExp['$1']);if(_0x199487['match'](/<AGI:[ ](\d+)>/i))_0x589d39['params'][0x6]=Number(RegExp['$1']);if(_0x199487[_0x51fba5(0x333)](/<LUK:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x944)][0x7]=Number(RegExp['$1']);if(_0x199487['match'](/<EXP:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x3af)]=Number(RegExp['$1']);if(_0x199487[_0x51fba5(0x333)](/<GOLD:[ ](\d+)>/i))_0x589d39[_0x51fba5(0x42b)]=Number(RegExp['$1']);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x641)]=Graphics['_defaultStretchMode'],Graphics[_0x17407e(0x332)]=function(){const _0xcc41b0=_0x17407e;switch(VisuMZ['CoreEngine'][_0xcc41b0(0x5cb)][_0xcc41b0(0x7e8)][_0xcc41b0(0x858)]){case'stretch':return!![];case _0xcc41b0(0x2a8):return![];default:return VisuMZ[_0xcc41b0(0x21d)]['Graphics_defaultStretchMode'][_0xcc41b0(0x8eb)](this);}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x69f)]=Graphics[_0x17407e(0x759)],Graphics[_0x17407e(0x759)]=function(_0x27c334,_0x57b257,_0x4ecc11=null){const _0x20da2e=_0x17407e;VisuMZ['CoreEngine'][_0x20da2e(0x69f)][_0x20da2e(0x8eb)](this,_0x27c334,_0x57b257,_0x4ecc11),VisuMZ[_0x20da2e(0x23f)](![]);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x499)]=Graphics[_0x17407e(0x8d8)],Graphics[_0x17407e(0x8d8)]=function(_0x1950f7){const _0x246223=_0x17407e;VisuMZ['CoreEngine'][_0x246223(0x499)][_0x246223(0x8eb)](this,_0x1950f7),this[_0x246223(0x900)](_0x1950f7);},Graphics[_0x17407e(0x900)]=function(_0x142d80){const _0x266ce1=_0x17407e;VisuMZ[_0x266ce1(0x21d)][_0x266ce1(0x5cb)]['QoL'][_0x266ce1(0x94b)]&&(_0x142d80['style'][_0x266ce1(0x955)]=_0x266ce1(0x7b8));VisuMZ['CoreEngine'][_0x266ce1(0x5cb)][_0x266ce1(0x7e8)][_0x266ce1(0x452)]&&(_0x266ce1(0x4be)!==_0x266ce1(0x4be)?this[_0x266ce1(0x4b1)](_0x266ce1(0x876)):_0x142d80['style'][_0x266ce1(0x508)]=_0x266ce1(0x244));const _0x2df7fb=Math[_0x266ce1(0x531)](0x0,Math[_0x266ce1(0x3d1)](_0x142d80[_0x266ce1(0x2b6)]*this['_realScale'])),_0x23db38=Math[_0x266ce1(0x531)](0x0,Math['floor'](_0x142d80['height']*this['_realScale']));_0x142d80[_0x266ce1(0x260)]['width']=_0x2df7fb+'px',_0x142d80[_0x266ce1(0x260)][_0x266ce1(0x2fc)]=_0x23db38+'px';},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5d1)]=Bitmap[_0x17407e(0x374)][_0x17407e(0x829)],Bitmap[_0x17407e(0x374)][_0x17407e(0x829)]=function(_0x2e11c4,_0x5bf69b){const _0x52f111=_0x17407e;VisuMZ[_0x52f111(0x21d)]['Bitmap_initialize'][_0x52f111(0x8eb)](this,_0x2e11c4,_0x5bf69b),this['_smooth']=!(VisuMZ['CoreEngine'][_0x52f111(0x5cb)][_0x52f111(0x7e8)][_0x52f111(0x452)]??!![]);},Bitmap['prototype']['markCoreEngineModified']=function(){const _0x5e4e4d=_0x17407e;this[_0x5e4e4d(0x903)]=!![];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x659)]=Sprite['prototype'][_0x17407e(0x71d)],Sprite[_0x17407e(0x374)][_0x17407e(0x71d)]=function(){const _0x5b3cef=_0x17407e;VisuMZ[_0x5b3cef(0x21d)][_0x5b3cef(0x659)]['call'](this),this[_0x5b3cef(0x316)]();},Sprite['prototype'][_0x17407e(0x316)]=function(){const _0x17925b=_0x17407e;if(!this[_0x17925b(0x424)])return;if(!this[_0x17925b(0x424)][_0x17925b(0x903)])return;this[_0x17925b(0x424)][_0x17925b(0x28e)]&&!this[_0x17925b(0x381)][_0x17925b(0x28e)][_0x17925b(0x35c)]&&this[_0x17925b(0x424)][_0x17925b(0x71d)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8ca)]=Bitmap[_0x17407e(0x374)][_0x17407e(0x5d3)],Bitmap['prototype'][_0x17407e(0x5d3)]=function(_0x150d2f,_0x104941){const _0x1cfd24=_0x17407e;VisuMZ[_0x1cfd24(0x21d)]['Bitmap_resize'][_0x1cfd24(0x8eb)](this,_0x150d2f,_0x104941),this['markCoreEngineModified']();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x66a)]=Bitmap[_0x17407e(0x374)][_0x17407e(0x628)],Bitmap[_0x17407e(0x374)][_0x17407e(0x628)]=function(_0x5ecc6a,_0x352361,_0x1a3d2d,_0x4ca5b0,_0x17102b,_0x293240,_0x285447,_0x537921,_0x45d121){const _0x2f115d=_0x17407e;_0x352361=Math[_0x2f115d(0x909)](_0x352361),_0x1a3d2d=Math[_0x2f115d(0x909)](_0x1a3d2d),_0x4ca5b0=Math['round'](_0x4ca5b0),_0x17102b=Math[_0x2f115d(0x909)](_0x17102b),_0x293240=Math[_0x2f115d(0x909)](_0x293240),_0x285447=Math[_0x2f115d(0x909)](_0x285447),VisuMZ[_0x2f115d(0x21d)][_0x2f115d(0x66a)][_0x2f115d(0x8eb)](this,_0x5ecc6a,_0x352361,_0x1a3d2d,_0x4ca5b0,_0x17102b,_0x293240,_0x285447,_0x537921,_0x45d121),this[_0x2f115d(0x727)]();},VisuMZ['CoreEngine'][_0x17407e(0x5ac)]=Bitmap[_0x17407e(0x374)][_0x17407e(0x5b8)],Bitmap[_0x17407e(0x374)][_0x17407e(0x5b8)]=function(_0x24f8a,_0x573f02,_0x2cc2c2,_0x5b10e2){const _0x3df765=_0x17407e;VisuMZ[_0x3df765(0x21d)][_0x3df765(0x5ac)][_0x3df765(0x8eb)](this,_0x24f8a,_0x573f02,_0x2cc2c2,_0x5b10e2),this['markCoreEngineModified']();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x350)]=Bitmap[_0x17407e(0x374)]['fillRect'],Bitmap[_0x17407e(0x374)][_0x17407e(0x415)]=function(_0x5674ba,_0x4ed40b,_0x303bc1,_0x352474,_0x2f550e){const _0x521b85=_0x17407e;VisuMZ[_0x521b85(0x21d)][_0x521b85(0x350)][_0x521b85(0x8eb)](this,_0x5674ba,_0x4ed40b,_0x303bc1,_0x352474,_0x2f550e),this[_0x521b85(0x727)]();},VisuMZ['CoreEngine'][_0x17407e(0x47e)]=Bitmap[_0x17407e(0x374)][_0x17407e(0x521)],Bitmap[_0x17407e(0x374)][_0x17407e(0x521)]=function(_0x371a2e,_0xc2f4f9,_0x59de6f,_0x1ba9eb,_0x1bc98f){const _0x30bb59=_0x17407e;VisuMZ[_0x30bb59(0x21d)][_0x30bb59(0x47e)][_0x30bb59(0x8eb)](this,_0x371a2e,_0xc2f4f9,_0x59de6f,_0x1ba9eb,_0x1bc98f),this[_0x30bb59(0x727)]();},VisuMZ[_0x17407e(0x21d)]['Bitmap_gradientFillRect']=Bitmap[_0x17407e(0x374)]['gradientFillRect'],Bitmap[_0x17407e(0x374)]['gradientFillRect']=function(_0x398f42,_0x221e76,_0x5bbdce,_0x1bc590,_0x1e5377,_0x395174,_0x1b4a3a){const _0xd6f0fc=_0x17407e;VisuMZ[_0xd6f0fc(0x21d)]['Bitmap_gradientFillRect'][_0xd6f0fc(0x8eb)](this,_0x398f42,_0x221e76,_0x5bbdce,_0x1bc590,_0x1e5377,_0x395174,_0x1b4a3a),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x17407e(0x8a1)]=Bitmap[_0x17407e(0x374)]['drawCircle'],Bitmap[_0x17407e(0x374)][_0x17407e(0x993)]=function(_0x3255f6,_0x53d85b,_0x1aed4b,_0x5a3bda){const _0x2aaf18=_0x17407e;_0x3255f6=Math['round'](_0x3255f6),_0x53d85b=Math['round'](_0x53d85b),_0x1aed4b=Math[_0x2aaf18(0x909)](_0x1aed4b),VisuMZ[_0x2aaf18(0x21d)]['Bitmap_drawCircle']['call'](this,_0x3255f6,_0x53d85b,_0x1aed4b,_0x5a3bda),this[_0x2aaf18(0x727)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8a5)]=Bitmap['prototype'][_0x17407e(0x6a8)],Bitmap[_0x17407e(0x374)][_0x17407e(0x6a8)]=function(_0xb5d93f){const _0x5208e5=_0x17407e;return Math[_0x5208e5(0x275)](VisuMZ[_0x5208e5(0x21d)][_0x5208e5(0x8a5)][_0x5208e5(0x8eb)](this,_0xb5d93f));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x9bb)]=Bitmap[_0x17407e(0x374)][_0x17407e(0x27d)],Bitmap['prototype'][_0x17407e(0x27d)]=function(_0x2928ac,_0x2961a0,_0x43b533,_0x7f9b65,_0x128453,_0x1f17a0){const _0x567e10=_0x17407e;_0x2961a0=Math[_0x567e10(0x909)](_0x2961a0),_0x43b533=Math['round'](_0x43b533),_0x7f9b65=Math[_0x567e10(0x909)](_0x7f9b65),_0x128453=Math['round'](_0x128453),VisuMZ['CoreEngine'][_0x567e10(0x9bb)][_0x567e10(0x8eb)](this,_0x2928ac,_0x2961a0,_0x43b533,_0x7f9b65,_0x128453,_0x1f17a0),this[_0x567e10(0x727)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x361)]=Bitmap['prototype'][_0x17407e(0x7bb)],Bitmap['prototype']['_drawTextOutline']=function(_0x4fd4ba,_0x237cf6,_0x2e1ae5,_0x1c747a){const _0x25863b=_0x17407e;if(VisuMZ[_0x25863b(0x21d)][_0x25863b(0x5cb)]['QoL'][_0x25863b(0x474)]){if(_0x25863b(0x8c6)==='AghTH')this[_0x25863b(0x7cc)](_0x4fd4ba,_0x237cf6,_0x2e1ae5,_0x1c747a);else{let _0x5daace=_0x55e5ac['abs'](_0x165e31)[_0x25863b(0x7c1)]();this['useDigitGrouping']()&&(_0x5daace=_0x45c88c[_0x25863b(0x1d0)](_0x5daace));const _0x1a225a=this[_0x25863b(0x1c5)](),_0x5a0d64=_0x53a416[_0x25863b(0x3d1)](_0x1a225a*0.75);for(let _0x2dec26=0x0;_0x2dec26<_0x5daace[_0x25863b(0x62d)];_0x2dec26++){const _0x15b954=this['createChildSprite'](_0x5a0d64,_0x1a225a);_0x15b954['bitmap']['drawText'](_0x5daace[_0x2dec26],0x0,0x0,_0x5a0d64,_0x1a225a,_0x25863b(0x98b)),_0x15b954['x']=(_0x2dec26-(_0x5daace[_0x25863b(0x62d)]-0x1)/0x2)*_0x5a0d64,_0x15b954['dy']=-_0x2dec26;}}}else _0x25863b(0x709)!==_0x25863b(0x551)?VisuMZ['CoreEngine'][_0x25863b(0x361)]['call'](this,_0x4fd4ba,_0x237cf6,_0x2e1ae5,_0x1c747a):this['_coreEasing']={'duration':_0x342886,'wholeDuration':_0x32ed30,'type':_0x242c51,'targetX':_0x27b7e4,'targetY':_0x3a664b,'targetScaleX':_0x5ab898,'targetScaleY':_0x468a15,'targetOpacity':_0x468d29,'targetBackOpacity':_0x1665f8,'targetContentsOpacity':_0x42b553};},Bitmap[_0x17407e(0x374)][_0x17407e(0x7cc)]=function(_0x2a7b85,_0x517872,_0x59276f,_0x38f5dc){const _0x5d3551=_0x17407e,_0x44b9f8=this[_0x5d3551(0x45e)];_0x44b9f8['fillStyle']=this['outlineColor'],_0x44b9f8[_0x5d3551(0x2f5)](_0x2a7b85,_0x517872+0x2,_0x59276f+0x2,_0x38f5dc);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x894)]=Input['clear'],Input[_0x17407e(0x938)]=function(){const _0x336c72=_0x17407e;VisuMZ['CoreEngine'][_0x336c72(0x894)]['call'](this),this[_0x336c72(0x7bd)]=undefined,this['_inputSpecialKeyCode']=undefined,this['_gamepadWait']=Input[_0x336c72(0x294)];},VisuMZ['CoreEngine'][_0x17407e(0x8d7)]=Input['update'],Input[_0x17407e(0x8dc)]=function(){const _0x5ec356=_0x17407e;VisuMZ[_0x5ec356(0x21d)]['Input_update'][_0x5ec356(0x8eb)](this);if(this[_0x5ec356(0x708)])this[_0x5ec356(0x708)]--;},VisuMZ['CoreEngine']['Input_pollGamepads']=Input[_0x17407e(0x78f)],Input['_pollGamepads']=function(){const _0x2f25f9=_0x17407e;if(this[_0x2f25f9(0x708)])return;VisuMZ[_0x2f25f9(0x21d)]['Input_pollGamepads']['call'](this);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3ca)]=Input[_0x17407e(0x3b7)],Input['_setupEventHandlers']=function(){const _0x3797e1=_0x17407e;VisuMZ['CoreEngine'][_0x3797e1(0x3ca)][_0x3797e1(0x8eb)](this),document[_0x3797e1(0x1d2)](_0x3797e1(0x1f4),this[_0x3797e1(0x1c0)][_0x3797e1(0x9b5)](this));},VisuMZ[_0x17407e(0x21d)]['Input_onKeyDown']=Input[_0x17407e(0x942)],Input[_0x17407e(0x942)]=function(_0x5e7051){const _0x12f512=_0x17407e;this[_0x12f512(0x952)]=_0x5e7051[_0x12f512(0x4a2)],VisuMZ['CoreEngine']['Input_onKeyDown'][_0x12f512(0x8eb)](this,_0x5e7051);},Input[_0x17407e(0x1c0)]=function(_0x4f88f5){const _0x2b41b2=_0x17407e;this[_0x2b41b2(0x554)](_0x4f88f5);},Input[_0x17407e(0x554)]=function(_0xefb2d1){const _0x4e0fc9=_0x17407e;this[_0x4e0fc9(0x952)]=_0xefb2d1['keyCode'];let _0x217c06=String['fromCharCode'](_0xefb2d1[_0x4e0fc9(0x57a)]);if(this[_0x4e0fc9(0x7bd)]===undefined){if(_0x4e0fc9(0x22e)!==_0x4e0fc9(0x22e)){var _0x3d6996=_0x3538bf(_0x4027f0['$1']);_0x537c45+=_0x3d6996;}else this[_0x4e0fc9(0x7bd)]=_0x217c06;}else this[_0x4e0fc9(0x7bd)]+=_0x217c06;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8c7)]=Input['_shouldPreventDefault'],Input[_0x17407e(0x52f)]=function(_0x3564b2){const _0x1102b1=_0x17407e;if(_0x3564b2===0x8)return![];return VisuMZ[_0x1102b1(0x21d)][_0x1102b1(0x8c7)][_0x1102b1(0x8eb)](this,_0x3564b2);},Input[_0x17407e(0x455)]=function(_0x58c867){const _0x251de1=_0x17407e;if(_0x58c867[_0x251de1(0x333)](/backspace/i))return this[_0x251de1(0x952)]===0x8;if(_0x58c867[_0x251de1(0x333)](/enter/i))return this[_0x251de1(0x952)]===0xd;if(_0x58c867[_0x251de1(0x333)](/escape/i))return this[_0x251de1(0x952)]===0x1b;},Input[_0x17407e(0x664)]=function(){const _0x3f2cff=_0x17407e;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x3f2cff(0x7f2)](this[_0x3f2cff(0x952)]);},Input['isArrowPressed']=function(){const _0x20091d=_0x17407e;return[0x25,0x26,0x27,0x28][_0x20091d(0x7f2)](this['_inputSpecialKeyCode']);},Input[_0x17407e(0x446)]=function(){const _0x226882=_0x17407e;if(navigator[_0x226882(0x1fb)]){const _0x2f41ad=navigator[_0x226882(0x1fb)]();if(_0x2f41ad){if('kpQFO'===_0x226882(0x32c))for(const _0x3e418b of _0x2f41ad){if(_0x226882(0x3d5)!==_0x226882(0x80c)){if(_0x3e418b&&_0x3e418b['connected']){if('HzUwN'===_0x226882(0x523))return!![];else this['startMove'](0x4b0,0x0,0x78);}}else{const _0x2a1da0=_0x226882(0x290);_0x183536[_0x226882(0x2d3)](_0x18cf05)[_0x226882(0x2d3)]('')[_0x226882(0x2d3)](null);const _0x2754ed=_0x4bb025['join'](_0x226882(0x545))[_0x226882(0x846)]();_0x733ca2['CoreEngine'][_0x226882(0x4aa)](_0x2754ed,_0x2a1da0,!![]),_0x1ec917['_scene']['_active']=!![];}}else _0x45a7bc['DrawItemBackgroundJS'][_0x226882(0x8eb)](this,_0x399868);}}return![];},Input[_0x17407e(0x89c)]=function(){const _0x2c3687=_0x17407e;if(navigator[_0x2c3687(0x1fb)]){const _0x1ca104=navigator[_0x2c3687(0x1fb)]();if(_0x1ca104){if('GjBvX'!=='CYUXt')for(const _0x5bffd1 of _0x1ca104){if(_0x5bffd1&&_0x5bffd1[_0x2c3687(0x921)]){if(_0x2c3687(0x30d)!==_0x2c3687(0x70e)){if(this['isGamepadButtonPressed'](_0x5bffd1))return!![];}else return _0x500a5a['layoutSettings']['StatusRect'][_0x2c3687(0x8eb)](this);}}else{const _0x15cc57=_0x32bb87[_0x2c3687(0x7ea)]();if(_0x15cc57)_0x15cc57[_0x2c3687(0x263)](_0x2724ad);}}}return![];},Input[_0x17407e(0x495)]=function(_0x28474d){const _0x3ddc12=_0x17407e,_0x42724d=_0x28474d[_0x3ddc12(0x6b3)];for(let _0x3a13aa=0x0;_0x3a13aa<_0x42724d[_0x3ddc12(0x62d)];_0x3a13aa++){if(_0x42724d[_0x3a13aa][_0x3ddc12(0x7ac)])return!![];}return![];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x484)]=Tilemap[_0x17407e(0x374)][_0x17407e(0x1b8)],Tilemap[_0x17407e(0x374)][_0x17407e(0x1b8)]=function(_0x5726fc,_0x267f47,_0x587df4,_0x3c4f3a){const _0x4dc4c7=_0x17407e;if($gameMap&&$gameMap[_0x4dc4c7(0x89b)]())return;VisuMZ[_0x4dc4c7(0x21d)][_0x4dc4c7(0x484)][_0x4dc4c7(0x8eb)](this,_0x5726fc,_0x267f47,_0x587df4,_0x3c4f3a);},Tilemap[_0x17407e(0x6c1)][_0x17407e(0x374)][_0x17407e(0x391)]=function(){const _0x1c7af7=_0x17407e;this[_0x1c7af7(0x78a)]();for(let _0x31558f=0x0;_0x31558f<Tilemap[_0x1c7af7(0x559)][_0x1c7af7(0x66c)];_0x31558f++){if('yQcLa'!==_0x1c7af7(0x2e0)){const _0x2c33e9=new PIXI[(_0x1c7af7(0x5b7))]();_0x2c33e9[_0x1c7af7(0x916)](0x800,0x800),VisuMZ[_0x1c7af7(0x21d)][_0x1c7af7(0x5cb)][_0x1c7af7(0x7e8)]['PixelateImageRendering']&&(_0x1c7af7(0x2fb)!==_0x1c7af7(0x7bf)?_0x2c33e9['scaleMode']=PIXI[_0x1c7af7(0x966)][_0x1c7af7(0x613)]:(this[_0x1c7af7(0x653)]['fontSize']=this[_0x1c7af7(0x5e8)](),this[_0x1c7af7(0x653)][_0x1c7af7(0x27d)](_0x53543e,_0x44f213,_0x8aae08,_0x374926,this[_0x1c7af7(0x67b)](),_0x1c7af7(0x917)))),this[_0x1c7af7(0x5a9)]['push'](_0x2c33e9);}else this['drawText'](this['value'](),_0x177f6a['x'],_0x498277['y'],_0x251c11[_0x1c7af7(0x2b6)],_0x1c7af7(0x1ad));}},WindowLayer[_0x17407e(0x374)][_0x17407e(0x548)]=function(){const _0x4b1eff=_0x17407e;return SceneManager&&SceneManager[_0x4b1eff(0x26b)]?SceneManager[_0x4b1eff(0x26b)][_0x4b1eff(0x998)]():!![];},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer['prototype'][_0x17407e(0x651)],WindowLayer[_0x17407e(0x374)][_0x17407e(0x651)]=function render(_0x45dbe1){const _0x36eda4=_0x17407e;if(this[_0x36eda4(0x548)]())VisuMZ[_0x36eda4(0x21d)]['WindowLayer_render']['call'](this,_0x45dbe1);else{if('shNcQ'==='lCZsP'){if(!this[_0x36eda4(0x89d)]())return;_0x4f27b1=_0x46bc23||![],_0x352c93=_0x4a6b49||![];if(_0x7cf369[_0x3f2ae8]){const _0x181342={'targets':_0x4113f6,'animationId':_0x2e87b6,'mirror':_0x5b65e0,'mute':_0x18a15c};this[_0x36eda4(0x935)][_0x36eda4(0x2b7)](_0x181342);for(const _0x4b6fba of _0x16f7e9){_0x4b6fba[_0x36eda4(0x1da)]&&_0x4b6fba[_0x36eda4(0x1da)]();}}}else this[_0x36eda4(0x29d)](_0x45dbe1);}},WindowLayer[_0x17407e(0x374)][_0x17407e(0x29d)]=function render(_0x2a0e28){const _0x2d1cc2=_0x17407e;if(!this[_0x2d1cc2(0x558)])return;const _0x1b68f2=new PIXI[(_0x2d1cc2(0x326))](),_0x55da44=_0x2a0e28['gl'],_0x4a977f=this[_0x2d1cc2(0x8c5)][_0x2d1cc2(0x4fd)]();_0x2a0e28[_0x2d1cc2(0x80a)][_0x2d1cc2(0x922)](),_0x1b68f2[_0x2d1cc2(0x457)]=this[_0x2d1cc2(0x457)],_0x2a0e28[_0x2d1cc2(0x6a2)][_0x2d1cc2(0x8f0)](),_0x55da44[_0x2d1cc2(0x65f)](_0x55da44[_0x2d1cc2(0x7d9)]);while(_0x4a977f[_0x2d1cc2(0x62d)]>0x0){const _0x362574=_0x4a977f[_0x2d1cc2(0x588)]();if(_0x362574[_0x2d1cc2(0x4d8)]&&_0x362574['visible']&&_0x362574[_0x2d1cc2(0x907)]>0x0){if('RUAcA'===_0x2d1cc2(0x30f))_0x55da44[_0x2d1cc2(0x1c8)](_0x55da44[_0x2d1cc2(0x7f7)],0x0,~0x0),_0x55da44[_0x2d1cc2(0x80f)](_0x55da44[_0x2d1cc2(0x614)],_0x55da44['KEEP'],_0x55da44[_0x2d1cc2(0x614)]),_0x362574['render'](_0x2a0e28),_0x2a0e28[_0x2d1cc2(0x6a2)]['flush'](),_0x1b68f2['clear'](),_0x55da44[_0x2d1cc2(0x1c8)](_0x55da44[_0x2d1cc2(0x8e6)],0x1,~0x0),_0x55da44[_0x2d1cc2(0x80f)](_0x55da44['REPLACE'],_0x55da44['REPLACE'],_0x55da44[_0x2d1cc2(0x601)]),_0x55da44[_0x2d1cc2(0x8e4)](_0x55da44[_0x2d1cc2(0x37c)],_0x55da44[_0x2d1cc2(0x1db)]),_0x1b68f2['render'](_0x2a0e28),_0x2a0e28[_0x2d1cc2(0x6a2)]['flush'](),_0x55da44[_0x2d1cc2(0x8e4)](_0x55da44[_0x2d1cc2(0x1db)],_0x55da44['ONE_MINUS_SRC_ALPHA']);else return 0x1;}}_0x55da44[_0x2d1cc2(0x70f)](_0x55da44[_0x2d1cc2(0x7d9)]),_0x55da44['clear'](_0x55da44[_0x2d1cc2(0x77e)]),_0x55da44[_0x2d1cc2(0x63a)](0x0),_0x2a0e28[_0x2d1cc2(0x6a2)][_0x2d1cc2(0x8f0)]();for(const _0x8285ff of this[_0x2d1cc2(0x8c5)]){!_0x8285ff[_0x2d1cc2(0x4d8)]&&_0x8285ff[_0x2d1cc2(0x558)]&&_0x8285ff[_0x2d1cc2(0x651)](_0x2a0e28);}_0x2a0e28[_0x2d1cc2(0x6a2)]['flush']();},DataManager[_0x17407e(0x479)]=function(_0x37d1ec){const _0xe51558=_0x17407e;return this[_0xe51558(0x988)](_0x37d1ec)&&_0x37d1ec[_0xe51558(0x335)]===0x2;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x78d)]=DataManager[_0x17407e(0x819)],DataManager[_0x17407e(0x819)]=function(){const _0x265d4e=_0x17407e;VisuMZ[_0x265d4e(0x21d)]['DataManager_setupNewGame']['call'](this),this[_0x265d4e(0x9a8)](),this[_0x265d4e(0x8fe)]();},DataManager[_0x17407e(0x9a8)]=function(){const _0x13ebad=_0x17407e;if($gameTemp['isPlaytest']()){const _0x30e7a1=VisuMZ[_0x13ebad(0x21d)][_0x13ebad(0x5cb)][_0x13ebad(0x7e8)][_0x13ebad(0x4fe)];if(_0x30e7a1>0x0)$gameTemp['reserveCommonEvent'](_0x30e7a1);}},DataManager[_0x17407e(0x8fe)]=function(){const _0x5d7b85=_0x17407e,_0x8f8aaa=VisuMZ[_0x5d7b85(0x21d)]['Settings'][_0x5d7b85(0x7e8)][_0x5d7b85(0x4a0)]||0x0;if(_0x8f8aaa>0x0)$gameTemp[_0x5d7b85(0x61f)](_0x8f8aaa);},DataManager[_0x17407e(0x948)]=function(_0x1bf250){const _0x56d773=_0x17407e,_0x382782=$dataTroops[_0x1bf250];if(!_0x382782)return'';let _0x382967='';_0x382967+=_0x382782[_0x56d773(0x506)];for(const _0x2deafe of _0x382782['pages']){for(const _0x93cc08 of _0x2deafe['list']){[0x6c,0x198][_0x56d773(0x25d)](_0x93cc08[_0x56d773(0x9a6)])&&(_0x382967+='\x0a',_0x382967+=_0x93cc08['parameters'][0x0]);}}return _0x382967;};(VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x7e8)][_0x17407e(0x705)]??!![])&&($scene=null,VisuMZ[_0x17407e(0x21d)][_0x17407e(0x771)]=Scene_Base[_0x17407e(0x374)]['create'],Scene_Base[_0x17407e(0x374)]['create']=function(){const _0xab01ca=_0x17407e;VisuMZ[_0xab01ca(0x21d)][_0xab01ca(0x771)][_0xab01ca(0x8eb)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x17407e(0x76a)]=Scene_Map[_0x17407e(0x374)][_0x17407e(0x971)],Scene_Map['prototype'][_0x17407e(0x971)]=function(){const _0x3897d0=_0x17407e;VisuMZ[_0x3897d0(0x21d)]['Scene_Map_createSpriteset'][_0x3897d0(0x8eb)](this),$spriteset=this[_0x3897d0(0x5b9)];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x6c9)]=Scene_Battle[_0x17407e(0x374)][_0x17407e(0x971)],Scene_Battle['prototype'][_0x17407e(0x971)]=function(){const _0x4b43d6=_0x17407e;VisuMZ[_0x4b43d6(0x21d)][_0x4b43d6(0x6c9)][_0x4b43d6(0x8eb)](this),$spriteset=this[_0x4b43d6(0x5b9)];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x6de)]=Scene_Base[_0x17407e(0x374)]['terminate'],Scene_Base['prototype'][_0x17407e(0x687)]=function(){const _0x330927=_0x17407e;VisuMZ[_0x330927(0x21d)][_0x330927(0x6de)][_0x330927(0x8eb)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x17407e(0x396)]=BattleManager[_0x17407e(0x8dc)],BattleManager[_0x17407e(0x8dc)]=function(_0xe38a56){const _0x23d58f=_0x17407e;VisuMZ[_0x23d58f(0x21d)][_0x23d58f(0x396)][_0x23d58f(0x8eb)](this,_0xe38a56),$subject=this[_0x23d58f(0x427)],$targets=this[_0x23d58f(0x8bd)],$target=this[_0x23d58f(0x985)]||this[_0x23d58f(0x8bd)][0x0];},$event=null,VisuMZ[_0x17407e(0x21d)][_0x17407e(0x1bb)]=Game_Event[_0x17407e(0x374)][_0x17407e(0x650)],Game_Event[_0x17407e(0x374)]['start']=function(){const _0xffe410=_0x17407e;VisuMZ[_0xffe410(0x21d)][_0xffe410(0x1bb)][_0xffe410(0x8eb)](this),$event=this;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8aa)]=Scene_Map['prototype'][_0x17407e(0x8dc)],Scene_Map[_0x17407e(0x374)][_0x17407e(0x8dc)]=function(){const _0x5a250f=_0x17407e;VisuMZ[_0x5a250f(0x21d)][_0x5a250f(0x8aa)][_0x5a250f(0x8eb)](this),$gameMap[_0x5a250f(0x1aa)]();},Game_Map[_0x17407e(0x374)][_0x17407e(0x1aa)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x38688f){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x38688f);},$onceParallel=function(_0x4cc395){const _0x13f80c=_0x17407e;if(SceneManager[_0x13f80c(0x82c)]())$scene[_0x13f80c(0x1e8)](_0x4cc395);else{if(SceneManager[_0x13f80c(0x73f)]()){if(Imported['VisuMZ_1_BattleCore'])$scene[_0x13f80c(0x1e8)](_0x4cc395);else $gameTemp&&$gameTemp[_0x13f80c(0x3a3)]()&&alert(_0x13f80c(0x1ec));}else $gameTemp&&$gameTemp['isPlaytest']()&&(_0x13f80c(0x488)!=='fcTbU'?alert(_0x13f80c(0x7ba)):this[_0x13f80c(0x83d)]=_0x5a0aed[_0x13f80c(0x26b)][_0x13f80c(0x380)]()!==_0x13f80c(0x8f7)?0x0:0x8);}});;StorageManager[_0x17407e(0x4cc)]=function(_0x33282f){return new Promise((_0x4cfc11,_0x47b24a)=>{const _0x49bb8e=_0x98e4;try{const _0x5ce9ac=pako[_0x49bb8e(0x337)](_0x33282f,{'to':_0x49bb8e(0x2e6),'level':0x1});if(_0x5ce9ac[_0x49bb8e(0x62d)]>=0xc350){}_0x4cfc11(_0x5ce9ac);}catch(_0x308667){_0x47b24a(_0x308667);}});},TextManager[_0x17407e(0x1e3)]=['','','',_0x17407e(0x9ad),'','','HELP','',_0x17407e(0x557),_0x17407e(0x240),'','',_0x17407e(0x625),_0x17407e(0x3b4),_0x17407e(0x398),'',_0x17407e(0x23a),'CTRL','ALT',_0x17407e(0x382),_0x17407e(0x8b0),_0x17407e(0x5ed),'EISU',_0x17407e(0x481),_0x17407e(0x715),_0x17407e(0x4c5),'',_0x17407e(0x418),_0x17407e(0x7ce),_0x17407e(0x6ae),_0x17407e(0x3bb),_0x17407e(0x322),_0x17407e(0x890),_0x17407e(0x670),_0x17407e(0x38f),_0x17407e(0x38a),_0x17407e(0x24a),'LEFT','UP',_0x17407e(0x8a0),'DOWN',_0x17407e(0x4f6),_0x17407e(0x220),'EXECUTE',_0x17407e(0x1fd),'INSERT',_0x17407e(0x50e),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x17407e(0x70d),_0x17407e(0x47a),_0x17407e(0x60d),'GREATER_THAN','QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x17407e(0x230),'',_0x17407e(0x549),'',_0x17407e(0x7e3),_0x17407e(0x1c2),'NUMPAD1','NUMPAD2',_0x17407e(0x863),_0x17407e(0x97c),_0x17407e(0x580),_0x17407e(0x55b),'NUMPAD7','NUMPAD8',_0x17407e(0x98d),_0x17407e(0x945),'ADD','SEPARATOR',_0x17407e(0x800),_0x17407e(0x409),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x17407e(0x3c5),_0x17407e(0x35d),_0x17407e(0x92e),_0x17407e(0x232),_0x17407e(0x513),'F16',_0x17407e(0x53d),_0x17407e(0x6cc),_0x17407e(0x29a),'F20',_0x17407e(0x4ee),_0x17407e(0x668),_0x17407e(0x2ec),_0x17407e(0x253),'','','','','','','','',_0x17407e(0x7bc),_0x17407e(0x795),'WIN_OEM_FJ_JISHO',_0x17407e(0x384),_0x17407e(0x8cf),_0x17407e(0x5b1),_0x17407e(0x213),'','','','','','','','','',_0x17407e(0x21b),'EXCLAMATION',_0x17407e(0x3e1),_0x17407e(0x617),'DOLLAR',_0x17407e(0x7d0),_0x17407e(0x8e7),'UNDERSCORE',_0x17407e(0x816),_0x17407e(0x3eb),_0x17407e(0x5f7),_0x17407e(0x475),'PIPE','HYPHEN_MINUS',_0x17407e(0x48b),'CLOSE_CURLY_BRACKET',_0x17407e(0x26a),'','','','',_0x17407e(0x76c),_0x17407e(0x574),_0x17407e(0x514),'','',_0x17407e(0x70d),_0x17407e(0x60d),_0x17407e(0x927),'MINUS','PERIOD',_0x17407e(0x7e6),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x17407e(0x62f),'BACK_SLASH',_0x17407e(0x2d5),'QUOTE','',_0x17407e(0x7db),'ALTGR','',_0x17407e(0x93a),_0x17407e(0x544),'',_0x17407e(0x8fd),'','','WIN_OEM_RESET',_0x17407e(0x435),_0x17407e(0x864),_0x17407e(0x355),'WIN_OEM_PA3',_0x17407e(0x407),_0x17407e(0x893),'WIN_OEM_ATTN',_0x17407e(0x460),'WIN_OEM_COPY',_0x17407e(0x669),'WIN_OEM_ENLW','WIN_OEM_BACKTAB',_0x17407e(0x4bd),_0x17407e(0x5b3),_0x17407e(0x3b5),_0x17407e(0x598),_0x17407e(0x2a9),_0x17407e(0x778),'',_0x17407e(0x768),_0x17407e(0x40b),''],TextManager[_0x17407e(0x4c1)]=VisuMZ['CoreEngine'][_0x17407e(0x5cb)]['ButtonAssist'][_0x17407e(0x49d)],TextManager[_0x17407e(0x4ac)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)]['ButtonAssist']['CancelText'],TextManager[_0x17407e(0x611)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)]['ButtonAssist']['SwitchActorText'],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x27f)]=TextManager[_0x17407e(0x7e5)],TextManager['param']=function(_0x1325fb){const _0x1d92a9=_0x17407e;return typeof _0x1325fb==='number'?VisuMZ[_0x1d92a9(0x21d)][_0x1d92a9(0x27f)][_0x1d92a9(0x8eb)](this,_0x1325fb):this['paramName'](_0x1325fb);},TextManager[_0x17407e(0x276)]=function(_0x1f823d){const _0x3692b7=_0x17407e;_0x1f823d=String(_0x1f823d||'')[_0x3692b7(0x99a)]();const _0x13b2cb=VisuMZ[_0x3692b7(0x21d)][_0x3692b7(0x5cb)][_0x3692b7(0x2d0)];if(_0x1f823d===_0x3692b7(0x69e))return $dataSystem[_0x3692b7(0x8d0)][_0x3692b7(0x944)][0x0];if(_0x1f823d===_0x3692b7(0x4a8))return $dataSystem[_0x3692b7(0x8d0)][_0x3692b7(0x944)][0x1];if(_0x1f823d===_0x3692b7(0x6a7))return $dataSystem[_0x3692b7(0x8d0)][_0x3692b7(0x944)][0x2];if(_0x1f823d===_0x3692b7(0x6b0))return $dataSystem['terms'][_0x3692b7(0x944)][0x3];if(_0x1f823d==='MAT')return $dataSystem[_0x3692b7(0x8d0)][_0x3692b7(0x944)][0x4];if(_0x1f823d===_0x3692b7(0x2a5))return $dataSystem['terms'][_0x3692b7(0x944)][0x5];if(_0x1f823d==='AGI')return $dataSystem['terms'][_0x3692b7(0x944)][0x6];if(_0x1f823d==='LUK')return $dataSystem[_0x3692b7(0x8d0)][_0x3692b7(0x944)][0x7];if(_0x1f823d===_0x3692b7(0x7fa))return _0x13b2cb[_0x3692b7(0x2a7)];if(_0x1f823d===_0x3692b7(0x1ff))return _0x13b2cb[_0x3692b7(0x261)];if(_0x1f823d==='CRI')return _0x13b2cb[_0x3692b7(0x25c)];if(_0x1f823d===_0x3692b7(0x8b5))return _0x13b2cb['XParamVocab3'];if(_0x1f823d===_0x3692b7(0x647))return _0x13b2cb[_0x3692b7(0x4c6)];if(_0x1f823d===_0x3692b7(0x40f))return _0x13b2cb['XParamVocab5'];if(_0x1f823d===_0x3692b7(0x286))return _0x13b2cb[_0x3692b7(0x5ab)];if(_0x1f823d===_0x3692b7(0x88b))return _0x13b2cb['XParamVocab7'];if(_0x1f823d===_0x3692b7(0x1ce))return _0x13b2cb[_0x3692b7(0x23e)];if(_0x1f823d===_0x3692b7(0x696))return _0x13b2cb['XParamVocab9'];if(_0x1f823d==='TGR')return _0x13b2cb[_0x3692b7(0x576)];if(_0x1f823d==='GRD')return _0x13b2cb[_0x3692b7(0x6af)];if(_0x1f823d===_0x3692b7(0x8b9))return _0x13b2cb[_0x3692b7(0x36e)];if(_0x1f823d===_0x3692b7(0x525))return _0x13b2cb[_0x3692b7(0x62e)];if(_0x1f823d===_0x3692b7(0x2de))return _0x13b2cb[_0x3692b7(0x517)];if(_0x1f823d===_0x3692b7(0x6fb))return _0x13b2cb[_0x3692b7(0x92b)];if(_0x1f823d==='PDR')return _0x13b2cb['SParamVocab6'];if(_0x1f823d==='MDR')return _0x13b2cb[_0x3692b7(0x868)];if(_0x1f823d===_0x3692b7(0x83c))return _0x13b2cb[_0x3692b7(0x4e2)];if(_0x1f823d===_0x3692b7(0x3c9))return _0x13b2cb['SParamVocab9'];if(VisuMZ[_0x3692b7(0x21d)][_0x3692b7(0x982)][_0x1f823d]){if(_0x3692b7(0x74b)==='fFqQI')return VisuMZ[_0x3692b7(0x21d)][_0x3692b7(0x982)][_0x1f823d];else this[_0x3692b7(0x5f6)]()?this[_0x3692b7(0x6ff)](_0x14526f):_0x2755c3[_0x3692b7(0x21d)][_0x3692b7(0x5b6)][_0x3692b7(0x8eb)](this,_0x22f745);}return'';},TextManager[_0x17407e(0x2c4)]=function(_0x4dac05){const _0x297c78=_0x17407e;if(_0x4dac05===_0x297c78(0x1ac))_0x4dac05='escape';let _0x49cdc7=[];for(let _0x4b73ac in Input['keyMapper']){_0x4b73ac=Number(_0x4b73ac);if(_0x4b73ac>=0x60&&_0x4b73ac<=0x69)continue;if([0x12,0x20][_0x297c78(0x25d)](_0x4b73ac))continue;_0x4dac05===Input[_0x297c78(0x946)][_0x4b73ac]&&_0x49cdc7[_0x297c78(0x2b7)](_0x4b73ac);}for(let _0x2966b7=0x0;_0x2966b7<_0x49cdc7[_0x297c78(0x62d)];_0x2966b7++){_0x49cdc7[_0x2966b7]=TextManager[_0x297c78(0x1e3)][_0x49cdc7[_0x2966b7]];}return this[_0x297c78(0x743)](_0x49cdc7);},TextManager[_0x17407e(0x743)]=function(_0xf9509d){const _0x2aca34=_0x17407e,_0x555770=VisuMZ[_0x2aca34(0x21d)][_0x2aca34(0x5cb)][_0x2aca34(0x963)],_0x118ef5=_0x555770['KeyUnlisted'],_0x2207c7=_0xf9509d[_0x2aca34(0x83e)](),_0x3bd7e4=_0x2aca34(0x788)['format'](_0x2207c7);return _0x555770[_0x3bd7e4]?_0x555770[_0x3bd7e4]:_0x118ef5[_0x2aca34(0x4eb)](_0x2207c7);},TextManager[_0x17407e(0x811)]=function(_0x4108d5,_0x26c4e4){const _0x3fe64d=_0x17407e,_0x12a63d=VisuMZ[_0x3fe64d(0x21d)][_0x3fe64d(0x5cb)][_0x3fe64d(0x963)],_0x398474=_0x12a63d[_0x3fe64d(0x818)],_0x2ff989=this[_0x3fe64d(0x2c4)](_0x4108d5),_0x5b8bbc=this['getInputButtonString'](_0x26c4e4);return _0x398474['format'](_0x2ff989,_0x5b8bbc);},VisuMZ['CoreEngine'][_0x17407e(0x6c4)]=ColorManager['loadWindowskin'],ColorManager[_0x17407e(0x426)]=function(){const _0x2bd2e1=_0x17407e;VisuMZ[_0x2bd2e1(0x21d)][_0x2bd2e1(0x6c4)][_0x2bd2e1(0x8eb)](this),this['_colorCache']=this[_0x2bd2e1(0x706)]||{};},ColorManager[_0x17407e(0x92f)]=function(_0x4e6dac,_0x135cc2){const _0x3c04d2=_0x17407e;return _0x135cc2=String(_0x135cc2),this['_colorCache']=this[_0x3c04d2(0x706)]||{},_0x135cc2['match'](/#(.*)/i)?_0x3c04d2(0x93b)!==_0x3c04d2(0x931)?this[_0x3c04d2(0x706)][_0x4e6dac]=_0x3c04d2(0x813)[_0x3c04d2(0x4eb)](String(RegExp['$1'])):_0x48648f[_0x3c04d2(0x5b4)]&&(this['_forcedBattleSys']='STB'):this[_0x3c04d2(0x706)][_0x4e6dac]=this[_0x3c04d2(0x7d5)](Number(_0x135cc2)),this[_0x3c04d2(0x706)][_0x4e6dac];},ColorManager[_0x17407e(0x238)]=function(_0x2450bb){const _0x277caa=_0x17407e;return _0x2450bb=String(_0x2450bb),_0x2450bb[_0x277caa(0x333)](/#(.*)/i)?'#%1'[_0x277caa(0x4eb)](String(RegExp['$1'])):this[_0x277caa(0x7d5)](Number(_0x2450bb));},ColorManager[_0x17407e(0x1d3)]=function(){const _0x457629=_0x17407e;this[_0x457629(0x706)]={};},ColorManager[_0x17407e(0x2cd)]=function(){const _0x5b6caf=_0x17407e,_0x3b561c=_0x5b6caf(0x6ad);this[_0x5b6caf(0x706)]=this['_colorCache']||{};if(this[_0x5b6caf(0x706)][_0x3b561c])return this[_0x5b6caf(0x706)][_0x3b561c];const _0x36dbef=VisuMZ[_0x5b6caf(0x21d)][_0x5b6caf(0x5cb)][_0x5b6caf(0x681)][_0x5b6caf(0x958)];return this[_0x5b6caf(0x92f)](_0x3b561c,_0x36dbef);},ColorManager['systemColor']=function(){const _0x18f399=_0x17407e,_0x31a79b=_0x18f399(0x3c8);this['_colorCache']=this[_0x18f399(0x706)]||{};if(this[_0x18f399(0x706)][_0x31a79b])return this['_colorCache'][_0x31a79b];const _0x5b8474=VisuMZ['CoreEngine'][_0x18f399(0x5cb)]['Color']['ColorSystem'];return this['getColorDataFromPluginParameters'](_0x31a79b,_0x5b8474);},ColorManager[_0x17407e(0x534)]=function(){const _0x15650b=_0x17407e,_0x4d823f='_stored_crisisColor';this[_0x15650b(0x706)]=this[_0x15650b(0x706)]||{};if(this[_0x15650b(0x706)][_0x4d823f])return this[_0x15650b(0x706)][_0x4d823f];const _0x49ba3e=VisuMZ[_0x15650b(0x21d)]['Settings'][_0x15650b(0x681)][_0x15650b(0x6c3)];return this[_0x15650b(0x92f)](_0x4d823f,_0x49ba3e);},ColorManager[_0x17407e(0x4c4)]=function(){const _0x1ace3e=_0x17407e,_0x2ca8fa=_0x1ace3e(0x71f);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x2ca8fa])return this[_0x1ace3e(0x706)][_0x2ca8fa];const _0x1b7360=VisuMZ['CoreEngine'][_0x1ace3e(0x5cb)][_0x1ace3e(0x681)][_0x1ace3e(0x209)];return this[_0x1ace3e(0x92f)](_0x2ca8fa,_0x1b7360);},ColorManager[_0x17407e(0x691)]=function(){const _0x352035=_0x17407e,_0x2210ff=_0x352035(0x3df);this[_0x352035(0x706)]=this['_colorCache']||{};if(this[_0x352035(0x706)][_0x2210ff])return this['_colorCache'][_0x2210ff];const _0x32aa5b=VisuMZ[_0x352035(0x21d)][_0x352035(0x5cb)]['Color']['ColorGaugeBack'];return this[_0x352035(0x92f)](_0x2210ff,_0x32aa5b);},ColorManager[_0x17407e(0x2d7)]=function(){const _0x1b651b=_0x17407e,_0x3c6aab=_0x1b651b(0x8ab);this[_0x1b651b(0x706)]=this[_0x1b651b(0x706)]||{};if(this[_0x1b651b(0x706)][_0x3c6aab])return this['_colorCache'][_0x3c6aab];const _0x19e4f9=VisuMZ[_0x1b651b(0x21d)][_0x1b651b(0x5cb)][_0x1b651b(0x681)]['ColorHPGauge1'];return this[_0x1b651b(0x92f)](_0x3c6aab,_0x19e4f9);},ColorManager[_0x17407e(0x6d3)]=function(){const _0x4b224c=_0x17407e,_0x131676='_stored_hpGaugeColor2';this[_0x4b224c(0x706)]=this[_0x4b224c(0x706)]||{};if(this['_colorCache'][_0x131676])return this[_0x4b224c(0x706)][_0x131676];const _0xd484b8=VisuMZ[_0x4b224c(0x21d)][_0x4b224c(0x5cb)][_0x4b224c(0x681)][_0x4b224c(0x51a)];return this[_0x4b224c(0x92f)](_0x131676,_0xd484b8);},ColorManager[_0x17407e(0x59c)]=function(){const _0x3423c7=_0x17407e,_0x292ab6=_0x3423c7(0x3d7);this[_0x3423c7(0x706)]=this[_0x3423c7(0x706)]||{};if(this[_0x3423c7(0x706)][_0x292ab6])return this[_0x3423c7(0x706)][_0x292ab6];const _0x552caa=VisuMZ[_0x3423c7(0x21d)]['Settings'][_0x3423c7(0x681)]['ColorMPGauge1'];return this[_0x3423c7(0x92f)](_0x292ab6,_0x552caa);},ColorManager[_0x17407e(0x782)]=function(){const _0x4ab9f8=_0x17407e,_0x58cb4a=_0x4ab9f8(0x41d);this[_0x4ab9f8(0x706)]=this[_0x4ab9f8(0x706)]||{};if(this[_0x4ab9f8(0x706)][_0x58cb4a])return this[_0x4ab9f8(0x706)][_0x58cb4a];const _0x1f349f=VisuMZ[_0x4ab9f8(0x21d)]['Settings'][_0x4ab9f8(0x681)][_0x4ab9f8(0x502)];return this[_0x4ab9f8(0x92f)](_0x58cb4a,_0x1f349f);},ColorManager['mpCostColor']=function(){const _0x8a2ed=_0x17407e,_0x208327=_0x8a2ed(0x469);this['_colorCache']=this[_0x8a2ed(0x706)]||{};if(this[_0x8a2ed(0x706)][_0x208327])return this['_colorCache'][_0x208327];const _0x227f30=VisuMZ['CoreEngine'][_0x8a2ed(0x5cb)][_0x8a2ed(0x681)][_0x8a2ed(0x30c)];return this['getColorDataFromPluginParameters'](_0x208327,_0x227f30);},ColorManager[_0x17407e(0x1c9)]=function(){const _0x4800c6=_0x17407e,_0x39e42d=_0x4800c6(0x32a);this[_0x4800c6(0x706)]=this[_0x4800c6(0x706)]||{};if(this['_colorCache'][_0x39e42d])return this[_0x4800c6(0x706)][_0x39e42d];const _0x14f934=VisuMZ['CoreEngine'][_0x4800c6(0x5cb)][_0x4800c6(0x681)]['ColorPowerUp'];return this['getColorDataFromPluginParameters'](_0x39e42d,_0x14f934);},ColorManager['powerDownColor']=function(){const _0x2aa8ec=_0x17407e,_0x4677c6=_0x2aa8ec(0x4e4);this[_0x2aa8ec(0x706)]=this[_0x2aa8ec(0x706)]||{};if(this['_colorCache'][_0x4677c6])return this[_0x2aa8ec(0x706)][_0x4677c6];const _0x2378bc=VisuMZ[_0x2aa8ec(0x21d)][_0x2aa8ec(0x5cb)][_0x2aa8ec(0x681)][_0x2aa8ec(0x5d4)];return this['getColorDataFromPluginParameters'](_0x4677c6,_0x2378bc);},ColorManager[_0x17407e(0x31d)]=function(){const _0x3df952=_0x17407e,_0x579ee3=_0x3df952(0x86c);this['_colorCache']=this[_0x3df952(0x706)]||{};if(this[_0x3df952(0x706)][_0x579ee3])return this[_0x3df952(0x706)][_0x579ee3];const _0x3c1a55=VisuMZ[_0x3df952(0x21d)][_0x3df952(0x5cb)][_0x3df952(0x681)][_0x3df952(0x65e)];return this[_0x3df952(0x92f)](_0x579ee3,_0x3c1a55);},ColorManager['ctGaugeColor2']=function(){const _0x19b547=_0x17407e,_0x3daa98=_0x19b547(0x63b);this['_colorCache']=this[_0x19b547(0x706)]||{};if(this['_colorCache'][_0x3daa98])return this[_0x19b547(0x706)][_0x3daa98];const _0x343d98=VisuMZ[_0x19b547(0x21d)][_0x19b547(0x5cb)][_0x19b547(0x681)][_0x19b547(0x4cb)];return this['getColorDataFromPluginParameters'](_0x3daa98,_0x343d98);},ColorManager['tpGaugeColor1']=function(){const _0xe0a485=_0x17407e,_0x165ff2=_0xe0a485(0x4b5);this[_0xe0a485(0x706)]=this[_0xe0a485(0x706)]||{};if(this[_0xe0a485(0x706)][_0x165ff2])return this['_colorCache'][_0x165ff2];const _0x21491c=VisuMZ[_0xe0a485(0x21d)]['Settings'][_0xe0a485(0x681)][_0xe0a485(0x7b4)];return this['getColorDataFromPluginParameters'](_0x165ff2,_0x21491c);},ColorManager['tpGaugeColor2']=function(){const _0x55e8bf=_0x17407e,_0x5555ec=_0x55e8bf(0x2c2);this[_0x55e8bf(0x706)]=this['_colorCache']||{};if(this[_0x55e8bf(0x706)][_0x5555ec])return this[_0x55e8bf(0x706)][_0x5555ec];const _0xe693ce=VisuMZ[_0x55e8bf(0x21d)]['Settings'][_0x55e8bf(0x681)][_0x55e8bf(0x235)];return this[_0x55e8bf(0x92f)](_0x5555ec,_0xe693ce);},ColorManager[_0x17407e(0x638)]=function(){const _0x3d6d83=_0x17407e,_0x1da5ac=_0x3d6d83(0x657);this[_0x3d6d83(0x706)]=this[_0x3d6d83(0x706)]||{};if(this['_colorCache'][_0x1da5ac])return this['_colorCache'][_0x1da5ac];const _0x523288=VisuMZ['CoreEngine']['Settings']['Color']['ColorTPCost'];return this[_0x3d6d83(0x92f)](_0x1da5ac,_0x523288);},ColorManager[_0x17407e(0x64f)]=function(){const _0x56acd3=_0x17407e,_0x39f2a6=_0x56acd3(0x5e1);this[_0x56acd3(0x706)]=this[_0x56acd3(0x706)]||{};if(this['_colorCache'][_0x39f2a6])return this[_0x56acd3(0x706)][_0x39f2a6];const _0x2142d4=VisuMZ[_0x56acd3(0x21d)][_0x56acd3(0x5cb)]['Color'][_0x56acd3(0x4e1)];return this[_0x56acd3(0x92f)](_0x39f2a6,_0x2142d4);},ColorManager['expGaugeColor1']=function(){const _0xb8423b=_0x17407e,_0x98e78d=_0xb8423b(0x941);this['_colorCache']=this['_colorCache']||{};if(this[_0xb8423b(0x706)][_0x98e78d])return this[_0xb8423b(0x706)][_0x98e78d];const _0x1f2161=VisuMZ[_0xb8423b(0x21d)][_0xb8423b(0x5cb)][_0xb8423b(0x681)][_0xb8423b(0x5d5)];return this[_0xb8423b(0x92f)](_0x98e78d,_0x1f2161);},ColorManager[_0x17407e(0x3bc)]=function(){const _0x173b25=_0x17407e,_0x29113c='_stored_expGaugeColor2';this[_0x173b25(0x706)]=this['_colorCache']||{};if(this[_0x173b25(0x706)][_0x29113c])return this[_0x173b25(0x706)][_0x29113c];const _0x3a8f12=VisuMZ[_0x173b25(0x21d)][_0x173b25(0x5cb)][_0x173b25(0x681)][_0x173b25(0x339)];return this['getColorDataFromPluginParameters'](_0x29113c,_0x3a8f12);},ColorManager[_0x17407e(0x40d)]=function(){const _0x55c42c=_0x17407e,_0x1a5847=_0x55c42c(0x39c);this['_colorCache']=this[_0x55c42c(0x706)]||{};if(this[_0x55c42c(0x706)][_0x1a5847])return this['_colorCache'][_0x1a5847];const _0x3cc343=VisuMZ[_0x55c42c(0x21d)][_0x55c42c(0x5cb)]['Color'][_0x55c42c(0x663)];return this[_0x55c42c(0x92f)](_0x1a5847,_0x3cc343);},ColorManager[_0x17407e(0x5c3)]=function(){const _0x4e2d0f=_0x17407e,_0x5765c9=_0x4e2d0f(0x940);this[_0x4e2d0f(0x706)]=this[_0x4e2d0f(0x706)]||{};if(this['_colorCache'][_0x5765c9])return this[_0x4e2d0f(0x706)][_0x5765c9];const _0x3ccfca=VisuMZ['CoreEngine']['Settings'][_0x4e2d0f(0x681)][_0x4e2d0f(0x667)];return this['getColorDataFromPluginParameters'](_0x5765c9,_0x3ccfca);},ColorManager['hpColor']=function(_0x92a2e1){const _0x5e1c68=_0x17407e;return VisuMZ['CoreEngine'][_0x5e1c68(0x5cb)][_0x5e1c68(0x681)][_0x5e1c68(0x99d)][_0x5e1c68(0x8eb)](this,_0x92a2e1);},ColorManager['mpColor']=function(_0x4deb29){const _0x27b4bb=_0x17407e;return VisuMZ[_0x27b4bb(0x21d)][_0x27b4bb(0x5cb)]['Color']['ActorMPColor']['call'](this,_0x4deb29);},ColorManager[_0x17407e(0x52b)]=function(_0x8d5ebb){const _0x1176a9=_0x17407e;return VisuMZ['CoreEngine'][_0x1176a9(0x5cb)][_0x1176a9(0x681)][_0x1176a9(0x362)][_0x1176a9(0x8eb)](this,_0x8d5ebb);},ColorManager[_0x17407e(0x342)]=function(_0xfecf70){const _0x3ece9d=_0x17407e;return VisuMZ['CoreEngine'][_0x3ece9d(0x5cb)][_0x3ece9d(0x681)][_0x3ece9d(0x976)][_0x3ece9d(0x8eb)](this,_0xfecf70);},ColorManager[_0x17407e(0x4d1)]=function(_0x46df60){const _0x36f57a=_0x17407e;return VisuMZ['CoreEngine'][_0x36f57a(0x5cb)]['Color'][_0x36f57a(0x59e)]['call'](this,_0x46df60);},ColorManager['outlineColor']=function(){const _0x5805fc=_0x17407e;return VisuMZ[_0x5805fc(0x21d)][_0x5805fc(0x5cb)][_0x5805fc(0x681)][_0x5805fc(0x724)];},ColorManager[_0x17407e(0x97a)]=function(){const _0xd7cacb=_0x17407e;return VisuMZ['CoreEngine'][_0xd7cacb(0x5cb)][_0xd7cacb(0x681)]['OutlineColorDmg']||_0xd7cacb(0x4a4);},ColorManager[_0x17407e(0x633)]=function(){const _0x45b173=_0x17407e;return VisuMZ['CoreEngine'][_0x45b173(0x5cb)][_0x45b173(0x681)][_0x45b173(0x4fb)]||_0x45b173(0x7af);},ColorManager[_0x17407e(0x9b0)]=function(){const _0x26992a=_0x17407e;return VisuMZ[_0x26992a(0x21d)][_0x26992a(0x5cb)]['Color'][_0x26992a(0x805)];},ColorManager[_0x17407e(0x842)]=function(){const _0xec406e=_0x17407e;return VisuMZ[_0xec406e(0x21d)][_0xec406e(0x5cb)][_0xec406e(0x681)][_0xec406e(0x586)];},ColorManager[_0x17407e(0x54c)]=function(){const _0x38e266=_0x17407e;return VisuMZ[_0x38e266(0x21d)][_0x38e266(0x5cb)][_0x38e266(0x681)][_0x38e266(0x1f9)];},ColorManager[_0x17407e(0x87d)]=function(){const _0x4b2176=_0x17407e;return VisuMZ['CoreEngine'][_0x4b2176(0x5cb)][_0x4b2176(0x681)]['ItemBackColor2'];},SceneManager[_0x17407e(0x7da)]=[],SceneManager['isSceneBattle']=function(){const _0x12fc3d=_0x17407e;return this[_0x12fc3d(0x26b)]&&this[_0x12fc3d(0x26b)][_0x12fc3d(0x2ea)]===Scene_Battle;},SceneManager[_0x17407e(0x82c)]=function(){const _0x2cd630=_0x17407e;return this['_scene']&&this[_0x2cd630(0x26b)][_0x2cd630(0x2ea)]===Scene_Map;},SceneManager[_0x17407e(0x73c)]=function(){const _0x5eb1df=_0x17407e;return this['_scene']&&this[_0x5eb1df(0x26b)]instanceof Scene_Map;},VisuMZ[_0x17407e(0x21d)]['SceneManager_initialize']=SceneManager['initialize'],SceneManager[_0x17407e(0x829)]=function(){const _0x189e44=_0x17407e;VisuMZ[_0x189e44(0x21d)]['SceneManager_initialize'][_0x189e44(0x8eb)](this),this[_0x189e44(0x883)]();},VisuMZ['CoreEngine'][_0x17407e(0x989)]=SceneManager[_0x17407e(0x47f)],SceneManager[_0x17407e(0x47f)]=function(_0x449d62){const _0x30c383=_0x17407e;if($gameTemp)this['onKeyDownKeysF6F7'](_0x449d62);VisuMZ['CoreEngine'][_0x30c383(0x989)][_0x30c383(0x8eb)](this,_0x449d62);},SceneManager[_0x17407e(0x924)]=function(_0x429bc9){const _0x11b03b=_0x17407e;if(!_0x429bc9[_0x11b03b(0x8f1)]&&!_0x429bc9[_0x11b03b(0x7b2)])switch(_0x429bc9[_0x11b03b(0x4a2)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x11b03b(0x886)]();break;case 0x76:if(Input[_0x11b03b(0x581)]('shift')||Input[_0x11b03b(0x581)](_0x11b03b(0x60a)))return;this[_0x11b03b(0x589)]();break;}},SceneManager['playTestF6']=function(){const _0x2f90f1=_0x17407e;if($gameTemp['isPlaytest']()&&VisuMZ['CoreEngine']['Settings'][_0x2f90f1(0x7e8)]['F6key']){if(ConfigManager[_0x2f90f1(0x810)]!==0x0)ConfigManager[_0x2f90f1(0x874)]=0x0,ConfigManager[_0x2f90f1(0x783)]=0x0,ConfigManager[_0x2f90f1(0x1e1)]=0x0,ConfigManager[_0x2f90f1(0x810)]=0x0;else{if(_0x2f90f1(0x68a)!==_0x2f90f1(0x239))ConfigManager[_0x2f90f1(0x874)]=0x64,ConfigManager[_0x2f90f1(0x783)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x2f90f1(0x810)]=0x64;else return _0x99e055=_0xcd8b00[_0x2f90f1(0x2dd)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x495d7f,_0x5ea307)=>_0x5ad53e(_0x473b70(_0x5ea307))),_0x1ff539;}ConfigManager[_0x2f90f1(0x9ba)]();if(this['_scene'][_0x2f90f1(0x2ea)]===Scene_Options){if(this[_0x2f90f1(0x26b)]['_optionsWindow'])this[_0x2f90f1(0x26b)]['_optionsWindow'][_0x2f90f1(0x677)]();if(this['_scene'][_0x2f90f1(0x27a)])this[_0x2f90f1(0x26b)][_0x2f90f1(0x27a)][_0x2f90f1(0x677)]();}}},SceneManager[_0x17407e(0x589)]=function(){const _0x177152=_0x17407e;if($gameTemp[_0x177152(0x3a3)]()&&VisuMZ['CoreEngine']['Settings']['QoL'][_0x177152(0x39f)]){if(_0x177152(0x972)==='usidY')$gameTemp[_0x177152(0x2c3)]=!$gameTemp[_0x177152(0x2c3)];else{const _0x10f07d=this[_0x177152(0x911)](_0x1dd410),_0x14f641=_0xe5eb47['CoreEngine'][_0x177152(0x5cb)][_0x177152(0x2d0)]['DisplayedParams'][_0x512705],_0x2b1552=_0x4cd618[_0x177152(0x7e5)](_0x14f641),_0x4b33f5=this['_actor']['paramValueByName'](_0x14f641,!![]);this[_0x177152(0x824)](_0x10f07d['x'],_0x10f07d['y'],0xa0,_0x14f641,![]),this[_0x177152(0x951)](),this['drawText'](_0x4b33f5,_0x10f07d['x']+0xa0,_0x10f07d['y'],0x3c,_0x177152(0x1ad));}}},SceneManager[_0x17407e(0x9ac)]=function(){const _0x19bda7=_0x17407e;if(!$gameTemp[_0x19bda7(0x3a3)]())return;if(!SceneManager[_0x19bda7(0x73f)]())return;for(const _0x397272 of $gameParty['members']()){if(!_0x397272)continue;_0x397272[_0x19bda7(0x83a)](_0x397272[_0x19bda7(0x75b)]());}},SceneManager[_0x17407e(0x883)]=function(){const _0x3b7981=_0x17407e;this['_sideButtonLayout']=![],this[_0x3b7981(0x6b2)]=!VisuMZ[_0x3b7981(0x21d)][_0x3b7981(0x5cb)]['UI']['ShowButtons'];},SceneManager[_0x17407e(0x5ff)]=function(_0x5e9932){const _0xd52972=_0x17407e;VisuMZ['CoreEngine']['Settings']['UI'][_0xd52972(0x845)]&&(this[_0xd52972(0x6ea)]=_0x5e9932);},SceneManager[_0x17407e(0x6a3)]=function(){const _0x371435=_0x17407e;return this[_0x371435(0x6ea)];},SceneManager[_0x17407e(0x82b)]=function(){const _0x6cd630=_0x17407e;return this[_0x6cd630(0x6b2)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x5e21c8=_0x17407e;return this[_0x5e21c8(0x82b)]()||this[_0x5e21c8(0x6a3)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x753)]=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0x2b2c3e=_0x17407e;if(VisuMZ[_0x2b2c3e(0x21d)][_0x2b2c3e(0x5cb)][_0x2b2c3e(0x7e8)][_0x2b2c3e(0x307)]){if(_0x2b2c3e(0x36b)!==_0x2b2c3e(0x237))return VisuMZ[_0x2b2c3e(0x21d)][_0x2b2c3e(0x753)][_0x2b2c3e(0x8eb)](this);else this[_0x2b2c3e(0x480)]['OnLoadJS'][_0x2b2c3e(0x8eb)](this),this[_0x2b2c3e(0x480)]['PositionJS'][_0x2b2c3e(0x8eb)](this),this[_0x2b2c3e(0x48a)](this[_0x2b2c3e(0x480)][_0x2b2c3e(0x3ba)][_0x2b2c3e(0x9b5)](this));}else return _0x2b2c3e(0x387)===_0x2b2c3e(0x6bd)?_0x28ec2d[_0x2b2c3e(0x21d)]['Settings'][_0x2b2c3e(0x681)][_0x2b2c3e(0x724)]:!![];},SceneManager['catchException']=function(_0x19c4cb){const _0x479dbe=_0x17407e;if(_0x19c4cb instanceof Error)this['catchNormalError'](_0x19c4cb);else{if(_0x19c4cb instanceof Array&&_0x19c4cb[0x0]===_0x479dbe(0x56f)){if(_0x479dbe(0x72d)!==_0x479dbe(0x72d))return _0x1345f1['CoreEngine']['Settings']['ButtonAssist'][_0x479dbe(0x5bb)];else this[_0x479dbe(0x78c)](_0x19c4cb);}else this['catchUnknownError'](_0x19c4cb);}this[_0x479dbe(0x24e)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x994)]=SceneManager['exit'],SceneManager[_0x17407e(0x736)]=function(){const _0x39b9dc=_0x17407e;VisuMZ['CoreEngine'][_0x39b9dc(0x994)][_0x39b9dc(0x8eb)](this);if(Utils[_0x39b9dc(0x330)]>='1.4.4'){if(typeof nw===_0x39b9dc(0x884))nw['App']['quit']();}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x550)]=BattleManager[_0x17407e(0x541)],BattleManager['processEscape']=function(){const _0x50839e=_0x17407e;if(VisuMZ[_0x50839e(0x21d)][_0x50839e(0x5cb)]['QoL'][_0x50839e(0x806)]){if('rfEKn'===_0x50839e(0x906))this[_0x50839e(0x241)]();else{if(_0x5edaae[_0x50839e(0x707)])_0x4add69['playOnceParallelInterpreter'](_0x1b9c31);else _0x1d370b&&_0xa3238d[_0x50839e(0x3a3)]()&&_0x41ba2a(_0x50839e(0x1ec));}}else{if(_0x50839e(0x74e)!==_0x50839e(0x33e))return VisuMZ['CoreEngine']['BattleManager_processEscape']['call'](this);else{const _0x1bdf97=_0x2e804a[_0x50839e(0x803)](_0x44803e)+0x1;let _0xa8b0ca=_0x329d44+_0x50839e(0x777),_0xa7120b=_0x15850f[_0x50839e(0x21d)]['ExtractStrFromList'](_0x68d4aa[_0x50839e(0x839)]);_0xa7120b[_0x50839e(0x62d)]>0x0&&(_0x34d197[_0x50839e(0x62d)]>0x0?_0x17ddc1+=_0x88988+'\x0a\x0a\x0a\x0a\x0a':_0x378365+=_0x4d011e+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x3ad746,_0xef0735[_0x50839e(0x506)]||_0x50839e(0x925))+_0x2bb86,_0x36efd4+=_0xa8b0ca['format'](_0x1bdf97,_0xa7120b));}}},BattleManager[_0x17407e(0x241)]=function(){const _0x5024d3=_0x17407e;return $gameParty['performEscape'](),SoundManager[_0x5024d3(0x895)](),this[_0x5024d3(0x259)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x17407e(0x8ba)]=function(){const _0x2c210c=_0x17407e;return $gameSystem[_0x2c210c(0x6e3)]()===0x1;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3ad)]=Game_Temp[_0x17407e(0x374)][_0x17407e(0x829)],Game_Temp[_0x17407e(0x374)][_0x17407e(0x829)]=function(){const _0x5f2b15=_0x17407e;VisuMZ['CoreEngine'][_0x5f2b15(0x3ad)][_0x5f2b15(0x8eb)](this),this[_0x5f2b15(0x734)](),this[_0x5f2b15(0x8db)](),this['createPointAnimationQueue']();},Game_Temp['prototype']['forceOutOfPlaytest']=function(){const _0x3aa272=_0x17407e;if(VisuMZ['CoreEngine']['Settings'][_0x3aa272(0x7e8)][_0x3aa272(0x1b2)]){if(_0x3aa272(0x7e7)===_0x3aa272(0x66d))return _0x43ce4a[_0x3aa272(0x21d)]['Settings']['Color'][_0x3aa272(0x362)][_0x3aa272(0x8eb)](this,_0x3d7f51);else this[_0x3aa272(0x510)]=![];}},Game_Temp[_0x17407e(0x374)]['setLastPluginCommandInterpreter']=function(_0x25b0c9){const _0x289f9e=_0x17407e;this[_0x289f9e(0x8f3)]=_0x25b0c9;},Game_Temp[_0x17407e(0x374)][_0x17407e(0x7ea)]=function(){const _0x4c17ca=_0x17407e;return this[_0x4c17ca(0x8f3)];},Game_Temp['prototype'][_0x17407e(0x2e2)]=function(){const _0x1e57f0=_0x17407e;this[_0x1e57f0(0x671)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x17407e(0x374)][_0x17407e(0x315)]=function(_0x4183c4){const _0x404c26=_0x17407e;$gameMap&&$dataMap&&$dataMap['note']&&(_0x404c26(0x408)==='ZOrCN'?_0x40f730+=_0x53560d(_0x22a4db):this[_0x404c26(0x662)]($dataMap[_0x404c26(0x539)]));const _0x5bf00d=$dataTroops[_0x4183c4];if(_0x5bf00d){let _0x1d1152=DataManager[_0x404c26(0x948)](_0x5bf00d['id']);this[_0x404c26(0x662)](_0x1d1152);}},Game_Temp[_0x17407e(0x374)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x585401){const _0x17c0ef=_0x17407e;if(!_0x585401)return;if(_0x585401[_0x17c0ef(0x333)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))_0x17c0ef(0x5ae)===_0x17c0ef(0x5ae)?this[_0x17c0ef(0x671)]='FV':(_0x459fd1+=_0x3233e6+'\x0a',_0xd0253a+='〘Scrolling\x20Text〙\x0a');else{if(_0x585401[_0x17c0ef(0x333)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x17c0ef(0x671)]='SV';else{if(_0x585401['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4f4a52=String(RegExp['$1']);if(_0x4f4a52[_0x17c0ef(0x333)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))_0x17c0ef(0x20e)!==_0x17c0ef(0x20e)?(_0x434805[_0x17c0ef(0x374)][_0x17c0ef(0x56c)][_0x17c0ef(0x8eb)](this),this[_0x17c0ef(0x436)]()):this['_forcedTroopView']='FV';else _0x4f4a52['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x17c0ef(0x671)]='SV');}}}if(_0x585401[_0x17c0ef(0x333)](/<(?:DTB)>/i))this[_0x17c0ef(0x8d2)]=0x0;else{if(_0x585401[_0x17c0ef(0x333)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x17c0ef(0x8d2)]=0x1;else{if(_0x585401[_0x17c0ef(0x333)](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x17c0ef(0x63e)!==_0x17c0ef(0x206))this['_forcedBattleSys']=0x2;else return _0x54ca2[_0x17c0ef(0x2c4)](_0x17c0ef(0x804));}else{if(_0x585401[_0x17c0ef(0x333)](/<(?:CTB)>/i))_0x17c0ef(0x1c7)===_0x17c0ef(0x1c7)?Imported[_0x17c0ef(0x8fb)]&&(this[_0x17c0ef(0x8d2)]='CTB'):_0xc39ba8('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');else{if(_0x585401['match'](/<(?:STB)>/i))Imported[_0x17c0ef(0x5b4)]&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x582));else{if(_0x585401[_0x17c0ef(0x333)](/<(?:BTB)>/i))Imported[_0x17c0ef(0x6d7)]&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x54b));else{if(_0x585401[_0x17c0ef(0x333)](/<(?:FTB)>/i))Imported[_0x17c0ef(0x43f)]&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x6f4));else{if(_0x585401[_0x17c0ef(0x333)](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x6fd));else{if(_0x585401[_0x17c0ef(0x333)](/<(?:ETB)>/i))Imported[_0x17c0ef(0x9a4)]&&(this['_forcedBattleSys']=_0x17c0ef(0x505));else{if(_0x585401['match'](/<(?:PTB)>/i)){if(_0x17c0ef(0x61b)!==_0x17c0ef(0x61b)){const _0x5545b7=this[_0x17c0ef(0x2e1)](),_0x105347=this[_0x17c0ef(0x2ba)](_0xc323f8);this[_0x17c0ef(0x5b0)](_0x5545b7,_0x105347,_0x4e0813),_0xfa599f++;}else Imported[_0x17c0ef(0x627)]&&(_0x17c0ef(0x68f)===_0x17c0ef(0x68f)?this['_forcedBattleSys']=_0x17c0ef(0x357):_0x6803a[_0x17c0ef(0x260)]['font-smooth']=_0x17c0ef(0x7b8));}else{if(_0x585401[_0x17c0ef(0x333)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x17c0ef(0x81e)===_0x17c0ef(0x96b)){if(this[_0x17c0ef(0x4d9)]===_0x59c2b3)this[_0x17c0ef(0x1bd)]();if(this[_0x17c0ef(0x4d9)]['BattleSystem']===_0x523101)this['resetBattleSystem']();this[_0x17c0ef(0x4d9)][_0x17c0ef(0x2fe)]=_0x94e8fa;}else{const _0x30c422=String(RegExp['$1']);if(_0x30c422[_0x17c0ef(0x333)](/DTB/i))this[_0x17c0ef(0x8d2)]=0x0;else{if(_0x30c422[_0x17c0ef(0x333)](/(?:TPB|ATB)[ ]ACTIVE/i))_0x17c0ef(0x36d)!==_0x17c0ef(0x1e9)?this[_0x17c0ef(0x8d2)]=0x1:this[_0x17c0ef(0x298)]();else{if(_0x30c422[_0x17c0ef(0x333)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x17c0ef(0x8d2)]=0x2;else{if(_0x30c422[_0x17c0ef(0x333)](/CTB/i))Imported[_0x17c0ef(0x8fb)]&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x60b));else{if(_0x30c422['match'](/STB/i)){if(Imported['VisuMZ_2_BattleSystemSTB']){if(_0x17c0ef(0x3aa)!==_0x17c0ef(0x3aa)){_0x56c9ef=_0x1da8c7||0xa8,this[_0x17c0ef(0x951)]();if(_0x33fe4a[_0x17c0ef(0x21d)][_0x17c0ef(0x5cb)]['UI'][_0x17c0ef(0x791)])this[_0x17c0ef(0x1e0)](_0x1ba713['currentClass']()[_0x17c0ef(0x506)],_0x4c123b,_0x34598a,_0x4b892e);else{const _0x305b92=_0x38525f[_0x17c0ef(0x219)]()[_0x17c0ef(0x506)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x17c0ef(0x27d)](_0x305b92,_0x27d55b,_0x2c86eb,_0x5ea4c9);}}else this[_0x17c0ef(0x8d2)]='STB';}}else{if(_0x30c422[_0x17c0ef(0x333)](/BTB/i)){if(Imported[_0x17c0ef(0x6d7)]){if(_0x17c0ef(0x1c1)===_0x17c0ef(0x2e7)){var _0x32f92d=_0x160146(_0x4a4ce4['$1'])/0x64;_0x2d0a68*=_0x32f92d;}else this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x54b);}}else{if(_0x30c422[_0x17c0ef(0x333)](/FTB/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x6f4));else{if(_0x30c422[_0x17c0ef(0x333)](/OTB/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x6fd));else{if(_0x30c422[_0x17c0ef(0x333)](/ETB/i)){if(Imported[_0x17c0ef(0x9a4)]){if('qRZNz'===_0x17c0ef(0x882)){_0x429bf6['ConvertParams'](_0x2f584e,_0x56e508);const _0x468f1e=_0x5ba10b['value']||0x0;_0x592214['gainGold'](_0x468f1e);}else this['_forcedBattleSys']=_0x17c0ef(0x505);}}else _0x30c422['match'](/PTB/i)&&(Imported[_0x17c0ef(0x627)]&&(this[_0x17c0ef(0x8d2)]=_0x17c0ef(0x357)));}}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype'][_0x17407e(0x8db)]=function(){const _0x2f73b1=_0x17407e;this[_0x2f73b1(0x935)]=[];},Game_Temp[_0x17407e(0x374)][_0x17407e(0x1f8)]=function(_0x2121f7,_0x56225d,_0x23cd97,_0x5120fc){const _0x1f46df=_0x17407e;if(!this['showFauxAnimations']())return;_0x23cd97=_0x23cd97||![],_0x5120fc=_0x5120fc||![];if($dataAnimations[_0x56225d]){if('tkJhC'!==_0x1f46df(0x7c6)){const _0x1b322e=this[_0x1f46df(0x1ee)],_0x4afe8c=_0x5726cc[_0x1f46df(0x531)](0x0,this[_0x1f46df(0x752)]-_0x1b322e*0x2),_0x44c03d=_0xb89338[_0x1f46df(0x531)](0x0,this['_height']-_0x1b322e*0x2),_0xa44a8e=this[_0x1f46df(0x27c)],_0x2b6869=_0xa44a8e[_0x1f46df(0x8c5)][0x0];_0xa44a8e[_0x1f46df(0x424)]=this[_0x1f46df(0x915)],_0xa44a8e[_0x1f46df(0x87b)](0x0,0x0,0x60,0x60),_0xa44a8e['move'](_0x1b322e,_0x1b322e),_0xa44a8e['scale']['x']=_0x4afe8c/0x60,_0xa44a8e[_0x1f46df(0x4f9)]['y']=_0x44c03d/0x60,_0x2b6869[_0x1f46df(0x424)]=this[_0x1f46df(0x915)],_0x2b6869[_0x1f46df(0x87b)](0x0,0x60,0x60,0x60),_0x2b6869['move'](0x0,0x0,_0x4afe8c,_0x44c03d),_0x2b6869[_0x1f46df(0x4f9)]['x']=0x1/_0xa44a8e[_0x1f46df(0x4f9)]['x'],_0x2b6869[_0x1f46df(0x4f9)]['y']=0x1/_0xa44a8e['scale']['y'],_0xa44a8e['setColorTone'](this[_0x1f46df(0x8b3)]);}else{const _0x5b5574={'targets':_0x2121f7,'animationId':_0x56225d,'mirror':_0x23cd97,'mute':_0x5120fc};this['_fauxAnimationQueue']['push'](_0x5b5574);for(const _0x2c66ac of _0x2121f7){_0x1f46df(0x2c8)!==_0x1f46df(0x2c8)?(this[_0x1f46df(0x4da)]&&this[_0x1f46df(0x4da)][_0x1f46df(0x3c0)](_0x2aeef4[_0x1f46df(0x7e0)][_0x1f46df(0x1d7)]),this[_0x1f46df(0x461)]&&this['_goldWindow']['setBackgroundType'](_0x433606[_0x1f46df(0x7e0)]['GoldBgType']),this[_0x1f46df(0x8b4)]&&this[_0x1f46df(0x8b4)][_0x1f46df(0x3c0)](_0x3af839['layoutSettings'][_0x1f46df(0x8c3)])):_0x2c66ac[_0x1f46df(0x1da)]&&_0x2c66ac['startAnimation']();}}}},Game_Temp[_0x17407e(0x374)]['showFauxAnimations']=function(){return!![];},Game_Temp['prototype']['retrieveFauxAnimation']=function(){const _0x519c65=_0x17407e;return this[_0x519c65(0x935)][_0x519c65(0x588)]();},Game_Temp[_0x17407e(0x374)]['createPointAnimationQueue']=function(){const _0x466c03=_0x17407e;this[_0x466c03(0x776)]=[];},Game_Temp['prototype'][_0x17407e(0x780)]=function(_0x131f4b,_0x2a6cb8,_0x179c2f,_0x175bc7,_0x4e0728){const _0x48b687=_0x17407e;if(!this[_0x48b687(0x98e)]())return;_0x175bc7=_0x175bc7||![],_0x4e0728=_0x4e0728||![];if($dataAnimations[_0x179c2f]){if(_0x48b687(0x201)===_0x48b687(0x4c9))this['_muteSound']&&(_0x29d3b0=_0x196b24[_0x48b687(0x878)](_0x3e1d33),_0x4c7252['se']&&(_0x2965ef['se'][_0x48b687(0x81f)]=0x0)),_0x74418b[_0x48b687(0x21d)][_0x48b687(0x832)][_0x48b687(0x8eb)](this,_0x15dcda);else{const _0x18191a={'x':_0x131f4b,'y':_0x2a6cb8,'animationId':_0x179c2f,'mirror':_0x175bc7,'mute':_0x4e0728};this[_0x48b687(0x776)][_0x48b687(0x2b7)](_0x18191a);}}},Game_Temp[_0x17407e(0x374)][_0x17407e(0x98e)]=function(){return!![];},Game_Temp[_0x17407e(0x374)]['retrievePointAnimation']=function(){const _0x15d0b3=_0x17407e;return this['_pointAnimationQueue'][_0x15d0b3(0x588)]();},VisuMZ['CoreEngine'][_0x17407e(0x28c)]=Game_System[_0x17407e(0x374)][_0x17407e(0x829)],Game_System['prototype']['initialize']=function(){const _0x418817=_0x17407e;VisuMZ['CoreEngine'][_0x418817(0x28c)][_0x418817(0x8eb)](this),this['initCoreEngine']();},Game_System['prototype']['initCoreEngine']=function(){const _0x520a2f=_0x17407e;this[_0x520a2f(0x4d9)]={'SideView':$dataSystem[_0x520a2f(0x600)],'BattleSystem':this[_0x520a2f(0x64d)](),'FontSize':$dataSystem[_0x520a2f(0x90a)][_0x520a2f(0x1c5)],'Padding':0xc};},Game_System[_0x17407e(0x374)]['isSideView']=function(){const _0x504556=_0x17407e;if($gameTemp['_forcedTroopView']==='SV'){if(_0x504556(0x97f)===_0x504556(0x58e))_0x991fa0[_0x504556(0x2b7)](_0x4487ed);else return!![];}else{if($gameTemp[_0x504556(0x671)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x504556(0x1bd)]();if(this['_CoreEngineSettings'][_0x504556(0x8b6)]===undefined)this[_0x504556(0x1bd)]();return this[_0x504556(0x4d9)][_0x504556(0x8b6)];},Game_System[_0x17407e(0x374)][_0x17407e(0x4f7)]=function(_0x35f88d){const _0x5abfdb=_0x17407e;if(this[_0x5abfdb(0x4d9)]===undefined)this['initCoreEngine']();if(this[_0x5abfdb(0x4d9)][_0x5abfdb(0x8b6)]===undefined)this[_0x5abfdb(0x1bd)]();this[_0x5abfdb(0x4d9)][_0x5abfdb(0x8b6)]=_0x35f88d;},Game_System[_0x17407e(0x374)][_0x17407e(0x8a7)]=function(){const _0x563da5=_0x17407e;if(this[_0x563da5(0x4d9)]===undefined)this[_0x563da5(0x1bd)]();this['_CoreEngineSettings'][_0x563da5(0x2fe)]=this['initialBattleSystem']();},Game_System['prototype'][_0x17407e(0x64d)]=function(){const _0x1dc633=_0x17407e,_0x311d7c=(VisuMZ[_0x1dc633(0x21d)][_0x1dc633(0x5cb)][_0x1dc633(0x2fe)]||_0x1dc633(0x420))[_0x1dc633(0x99a)]()['trim']();return VisuMZ[_0x1dc633(0x21d)][_0x1dc633(0x95e)](_0x311d7c);},Game_System[_0x17407e(0x374)][_0x17407e(0x6e3)]=function(){const _0xa0cabd=_0x17407e;if($gameTemp[_0xa0cabd(0x8d2)]!==undefined)return'ZrUti'==='ZrUti'?$gameTemp[_0xa0cabd(0x8d2)]:0x0;if(this[_0xa0cabd(0x4d9)]===undefined)this[_0xa0cabd(0x1bd)]();if(this[_0xa0cabd(0x4d9)][_0xa0cabd(0x2fe)]===undefined)this[_0xa0cabd(0x8a7)]();return this[_0xa0cabd(0x4d9)][_0xa0cabd(0x2fe)];},Game_System[_0x17407e(0x374)][_0x17407e(0x252)]=function(_0x160fbe){const _0x952b3d=_0x17407e;if(this[_0x952b3d(0x4d9)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['BattleSystem']===undefined)this[_0x952b3d(0x8a7)]();this[_0x952b3d(0x4d9)][_0x952b3d(0x2fe)]=_0x160fbe;},Game_System[_0x17407e(0x374)][_0x17407e(0x880)]=function(){const _0x2290e5=_0x17407e;if(this[_0x2290e5(0x4d9)]===undefined)this['initCoreEngine']();if(this[_0x2290e5(0x4d9)][_0x2290e5(0x405)]===undefined)this[_0x2290e5(0x1bd)]();return this[_0x2290e5(0x4d9)][_0x2290e5(0x405)];},Game_System[_0x17407e(0x374)]['setMainFontSize']=function(_0x379826){const _0x3a4280=_0x17407e;if(this[_0x3a4280(0x4d9)]===undefined)this[_0x3a4280(0x1bd)]();if(this[_0x3a4280(0x4d9)][_0x3a4280(0x68b)]===undefined)this[_0x3a4280(0x1bd)]();this[_0x3a4280(0x4d9)][_0x3a4280(0x405)]=_0x379826;},Game_System[_0x17407e(0x374)][_0x17407e(0x2aa)]=function(){const _0x406072=_0x17407e;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x406072(0x4d9)]['Padding']===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x406072(0x1b6)];},Game_System['prototype'][_0x17407e(0x6cb)]=function(_0x335c93){const _0x57f44c=_0x17407e;if(this[_0x57f44c(0x4d9)]===undefined)this[_0x57f44c(0x1bd)]();if(this[_0x57f44c(0x4d9)]['TimeProgress']===undefined)this[_0x57f44c(0x1bd)]();this[_0x57f44c(0x4d9)][_0x57f44c(0x1b6)]=_0x335c93;},VisuMZ['CoreEngine'][_0x17407e(0x4d2)]=Game_Screen[_0x17407e(0x374)][_0x17407e(0x829)],Game_Screen[_0x17407e(0x374)][_0x17407e(0x829)]=function(){const _0x3af27e=_0x17407e;VisuMZ[_0x3af27e(0x21d)][_0x3af27e(0x4d2)][_0x3af27e(0x8eb)](this),this[_0x3af27e(0x256)]();},Game_Screen['prototype'][_0x17407e(0x256)]=function(){const _0x168516=_0x17407e,_0x43d626=VisuMZ[_0x168516(0x21d)][_0x168516(0x5cb)][_0x168516(0x577)];this[_0x168516(0x2f3)]=_0x43d626?.['DefaultStyle']||_0x168516(0x1b4);},Game_Screen[_0x17407e(0x374)][_0x17407e(0x8be)]=function(){const _0x2adc84=_0x17407e;if(this[_0x2adc84(0x2f3)]===undefined)this[_0x2adc84(0x256)]();return this['_coreEngineShakeStyle'];},Game_Screen['prototype'][_0x17407e(0x6d8)]=function(_0x428cfb){const _0x25001a=_0x17407e;if(this[_0x25001a(0x2f3)]===undefined)this['initCoreEngineScreenShake']();this[_0x25001a(0x2f3)]=_0x428cfb[_0x25001a(0x88f)]()[_0x25001a(0x846)]();},Game_Picture[_0x17407e(0x374)]['isMapScrollLinked']=function(){const _0x4e31c5=_0x17407e;if($gameParty[_0x4e31c5(0x2f0)]())return![];return this['name']()&&this['name']()['charAt'](0x0)==='!';},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x64e)]=Game_Picture[_0x17407e(0x374)]['x'],Game_Picture[_0x17407e(0x374)]['x']=function(){const _0x4c642c=_0x17407e;if(this[_0x4c642c(0x467)]())return this[_0x4c642c(0x6c6)]();else{if(_0x4c642c(0x56e)===_0x4c642c(0x56e))return VisuMZ[_0x4c642c(0x21d)][_0x4c642c(0x64e)][_0x4c642c(0x8eb)](this);else{const _0x270ffe=_0xcbb059['CoreEngine'][_0x4c642c(0x5cb)][_0x4c642c(0x577)];this[_0x4c642c(0x2f3)]=_0x270ffe?.[_0x4c642c(0x49c)]||_0x4c642c(0x1b4);}}},Game_Picture[_0x17407e(0x374)]['xScrollLinkedOffset']=function(){const _0x3b0c68=_0x17407e,_0x562680=$gameMap[_0x3b0c68(0x4f8)]()*$gameMap[_0x3b0c68(0x6c7)]();return this['_x']-_0x562680;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x640)]=Game_Picture[_0x17407e(0x374)]['y'],Game_Picture[_0x17407e(0x374)]['y']=function(){const _0x204187=_0x17407e;return this[_0x204187(0x467)]()?this[_0x204187(0x317)]():VisuMZ[_0x204187(0x21d)]['Game_Picture_y'][_0x204187(0x8eb)](this);},Game_Picture['prototype'][_0x17407e(0x317)]=function(){const _0x4dffcd=_0x17407e,_0x5973b7=$gameMap[_0x4dffcd(0x594)]()*$gameMap['tileHeight']();return this['_y']-_0x5973b7;},Game_Picture[_0x17407e(0x374)]['setEasingType']=function(_0x1d687d){const _0x4a1054=_0x17407e;this[_0x4a1054(0x296)]=_0x1d687d;},VisuMZ['CoreEngine'][_0x17407e(0x8ff)]=Game_Picture['prototype'][_0x17407e(0x95f)],Game_Picture[_0x17407e(0x374)][_0x17407e(0x95f)]=function(_0x5b3ae3){const _0x4c6a54=_0x17407e;return this[_0x4c6a54(0x296)]=this[_0x4c6a54(0x296)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x4c6a54(0x296)])?VisuMZ[_0x4c6a54(0x21d)][_0x4c6a54(0x8ff)][_0x4c6a54(0x8eb)](this,_0x5b3ae3):VisuMZ['ApplyEasing'](_0x5b3ae3,this[_0x4c6a54(0x296)]);},VisuMZ['CoreEngine'][_0x17407e(0x1bf)]=Game_Action[_0x17407e(0x374)]['itemHit'],Game_Action['prototype']['itemHit']=function(_0x149652){const _0x51c210=_0x17407e;if(VisuMZ[_0x51c210(0x21d)][_0x51c210(0x5cb)]['QoL'][_0x51c210(0x4ba)]){if('jTfJx'!==_0x51c210(0x618))_0x5ac5e7['CoreEngine'][_0x51c210(0x928)][_0x51c210(0x8eb)](this),_0x5f51ee[_0x51c210(0x6a3)]()&&this['moveMenuButtonSideButtonLayout']();else return this[_0x51c210(0x914)](_0x149652);}else return VisuMZ[_0x51c210(0x21d)][_0x51c210(0x1bf)][_0x51c210(0x8eb)](this,_0x149652);},Game_Action[_0x17407e(0x374)][_0x17407e(0x914)]=function(_0x1d692c){const _0xc2c292=_0x17407e,_0x6c2767=this[_0xc2c292(0x861)](_0x1d692c),_0x212f3c=this['subjectHitRate'](_0x1d692c),_0x56cbe9=this[_0xc2c292(0x5ce)](_0x1d692c);return _0x6c2767*(_0x212f3c-_0x56cbe9);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3e2)]=Game_Action[_0x17407e(0x374)]['itemEva'],Game_Action[_0x17407e(0x374)][_0x17407e(0x8dd)]=function(_0x2f035b){const _0x79c775=_0x17407e;if(VisuMZ[_0x79c775(0x21d)][_0x79c775(0x5cb)][_0x79c775(0x7e8)][_0x79c775(0x4ba)])return 0x0;else{if(_0x79c775(0x319)!==_0x79c775(0x319))this[_0x79c775(0x6a5)]={},_0x1a34b9['CoreEngine'][_0x79c775(0x40a)][_0x79c775(0x8eb)](this);else return VisuMZ[_0x79c775(0x21d)][_0x79c775(0x3e2)][_0x79c775(0x8eb)](this,_0x2f035b);}},Game_Action[_0x17407e(0x374)][_0x17407e(0x861)]=function(_0x5eecfb){const _0x48155a=_0x17407e;return this[_0x48155a(0x439)]()['successRate']*0.01;},Game_Action[_0x17407e(0x374)][_0x17407e(0x756)]=function(_0x18ca84){const _0x3376da=_0x17407e;if(VisuMZ[_0x3376da(0x21d)]['Settings'][_0x3376da(0x7e8)][_0x3376da(0x1cb)]&&this[_0x3376da(0x988)]())return 0x1;if(this['isPhysical']()){if('YTkCp'!==_0x3376da(0x92d))_0x4f4da1[_0x3376da(0x21d)][_0x3376da(0x740)][_0x3376da(0x8eb)](this);else{if(VisuMZ[_0x3376da(0x21d)][_0x3376da(0x5cb)]['QoL'][_0x3376da(0x1cb)]&&this[_0x3376da(0x726)]()['isActor']()){if('GjBPi'===_0x3376da(0x379))_0x1991d9[_0x3376da(0x21d)][_0x3376da(0x6f7)][_0x3376da(0x8eb)](this),_0x5c0557[_0x3376da(0x6a3)]()&&this[_0x3376da(0x393)]();else return this[_0x3376da(0x726)]()['hit']+0.05;}else return this['subject']()[_0x3376da(0x293)];}}else{if(_0x3376da(0x674)===_0x3376da(0x66b))this[_0x3376da(0x907)]+=this[_0x3376da(0x8d5)](),this['isOpen']()&&(this[_0x3376da(0x53c)]=![]);else return 0x1;}},Game_Action[_0x17407e(0x374)][_0x17407e(0x5ce)]=function(_0x4da663){const _0x2d7dc5=_0x17407e;if(this['subject']()['isActor']()===_0x4da663[_0x2d7dc5(0x93e)]())return 0x0;if(this[_0x2d7dc5(0x2c5)]()){if(_0x2d7dc5(0x246)===_0x2d7dc5(0x779))this['refresh'](),_0x1c04df['playOk'](),this[_0x2d7dc5(0x4b9)]===_0x2d7dc5(0x876)?this[_0x2d7dc5(0x54e)](0x0):this[_0x2d7dc5(0x54e)](-0x1);else{if(VisuMZ[_0x2d7dc5(0x21d)]['Settings'][_0x2d7dc5(0x7e8)][_0x2d7dc5(0x1cb)]&&_0x4da663[_0x2d7dc5(0x6f5)]()){if(_0x2d7dc5(0x980)===_0x2d7dc5(0x695))_0x121b72=_0xfeb3ae[_0x2d7dc5(0x909)](_0x4dd902),_0x3d0b20=_0x4044fa[_0x2d7dc5(0x909)](_0x2fbd49),_0x59c28f=_0x8ff2a9[_0x2d7dc5(0x909)](_0x3a5ab9),_0x4032f3[_0x2d7dc5(0x21d)][_0x2d7dc5(0x8a1)][_0x2d7dc5(0x8eb)](this,_0x3345c0,_0xe02aec,_0xb0c8d1,_0x5061ca),this[_0x2d7dc5(0x727)]();else return _0x4da663['eva']-0.05;}else return _0x4da663[_0x2d7dc5(0x39a)];}}else{if(this[_0x2d7dc5(0x82d)]())return _0x4da663[_0x2d7dc5(0x86b)];else{if(_0x2d7dc5(0x59b)===_0x2d7dc5(0x59b))return 0x0;else this['_onceParallelInterpreters']=this[_0x2d7dc5(0x1ed)]||[],this[_0x2d7dc5(0x1ed)][_0x2d7dc5(0x2d3)](_0x5bc8d0);}}},VisuMZ['CoreEngine'][_0x17407e(0x4e5)]=Game_Action[_0x17407e(0x374)][_0x17407e(0x8bb)],Game_Action[_0x17407e(0x374)]['updateLastTarget']=function(_0xef26f7){const _0x200d40=_0x17407e;VisuMZ[_0x200d40(0x21d)][_0x200d40(0x4e5)]['call'](this,_0xef26f7);if(VisuMZ[_0x200d40(0x21d)]['Settings']['QoL'][_0x200d40(0x4ba)])return;const _0x57e708=_0xef26f7[_0x200d40(0x7d6)]();if(_0x57e708[_0x200d40(0x43c)]){if(0x1-this[_0x200d40(0x8dd)](_0xef26f7)>this[_0x200d40(0x623)](_0xef26f7)){if(_0x200d40(0x565)==='xepNe')_0x57e708[_0x200d40(0x43c)]=![],_0x57e708[_0x200d40(0x728)]=!![];else return _0x28ee66[_0x200d40(0x275)](_0x5aff3f[_0x200d40(0x21d)][_0x200d40(0x8a5)][_0x200d40(0x8eb)](this,_0x3e7f1c));}}},VisuMZ[_0x17407e(0x21d)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x6fa)],Game_BattlerBase['prototype'][_0x17407e(0x6fa)]=function(){const _0x17497f=_0x17407e;this[_0x17497f(0x6a5)]={},VisuMZ[_0x17497f(0x21d)]['Game_BattlerBase_initMembers'][_0x17497f(0x8eb)](this);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x4c3)]=Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x677)],Game_BattlerBase[_0x17407e(0x374)]['refresh']=function(){const _0x2079a6=_0x17407e;this[_0x2079a6(0x6a5)]={},VisuMZ[_0x2079a6(0x21d)][_0x2079a6(0x4c3)][_0x2079a6(0x8eb)](this);},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x91d)]=function(_0xb9f76d){const _0x59b247=_0x17407e;return this['_cache']=this[_0x59b247(0x6a5)]||{},this[_0x59b247(0x6a5)][_0xb9f76d]!==undefined;},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x75d)]=function(_0x422adb){const _0x3502e0=_0x17407e,_0xdf569c=(_0x503931,_0x4d38bf)=>{const _0x248b8b=_0x98e4;if(!_0x4d38bf)return _0x503931;if(_0x4d38bf['note'][_0x248b8b(0x333)](VisuMZ[_0x248b8b(0x21d)][_0x248b8b(0x801)]['paramPlus'][_0x422adb])){if('ZtcuL'==='ZtcuL'){var _0x1d78a5=Number(RegExp['$1']);_0x503931+=_0x1d78a5;}else{const _0x570f6f=this['_width'],_0x43b1b5=this['_height'],_0xe238cb=0x18,_0x280503=_0xe238cb/0x2,_0x5dfd29=0x60+_0xe238cb,_0x1ce188=0x0+_0xe238cb;this[_0x248b8b(0x1cf)]['bitmap']=this[_0x248b8b(0x915)],this[_0x248b8b(0x1cf)][_0x248b8b(0x466)]['x']=0.5,this[_0x248b8b(0x1cf)][_0x248b8b(0x466)]['y']=0.5,this['_downArrowSprite']['setFrame'](_0x5dfd29+_0x280503,_0x1ce188+_0x280503+_0xe238cb,_0xe238cb,_0x280503),this[_0x248b8b(0x1cf)][_0x248b8b(0x400)](_0x4d3db7[_0x248b8b(0x909)](_0x570f6f/0x2),_0x24fb8a[_0x248b8b(0x909)](_0x43b1b5-_0x280503)),this[_0x248b8b(0x1d8)]['bitmap']=this['_windowskin'],this[_0x248b8b(0x1d8)][_0x248b8b(0x466)]['x']=0.5,this['_upArrowSprite']['anchor']['y']=0.5,this[_0x248b8b(0x1d8)][_0x248b8b(0x87b)](_0x5dfd29+_0x280503,_0x1ce188,_0xe238cb,_0x280503),this[_0x248b8b(0x1d8)]['move'](_0x15badd[_0x248b8b(0x909)](_0x570f6f/0x2),_0x448d96[_0x248b8b(0x909)](_0x280503));}}if(_0x4d38bf[_0x248b8b(0x539)][_0x248b8b(0x333)](VisuMZ[_0x248b8b(0x21d)][_0x248b8b(0x801)][_0x248b8b(0x599)][_0x422adb])){var _0x4d5097=String(RegExp['$1']);try{_0x503931+=eval(_0x4d5097);}catch(_0x2dee3c){if($gameTemp[_0x248b8b(0x3a3)]())console[_0x248b8b(0x1b1)](_0x2dee3c);}}return _0x503931;};return this['traitObjects']()[_0x3502e0(0x430)](_0xdf569c,this['_paramPlus'][_0x422adb]);},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x320)]=function(_0x5ee79b){const _0x33142a=_0x17407e;var _0x27f3d5='Basic'+(this[_0x33142a(0x93e)]()?_0x33142a(0x464):_0x33142a(0x2bc))+_0x33142a(0x866)+_0x5ee79b;if(this[_0x33142a(0x91d)](_0x27f3d5))return this[_0x33142a(0x6a5)][_0x27f3d5];this[_0x33142a(0x6a5)][_0x27f3d5]=eval(VisuMZ[_0x33142a(0x21d)][_0x33142a(0x5cb)][_0x33142a(0x2d0)][_0x27f3d5]);const _0x3a369d=(_0x226ae3,_0x12a4d5)=>{const _0x5d7950=_0x33142a;if(!_0x12a4d5)return _0x226ae3;if(_0x12a4d5['note'][_0x5d7950(0x333)](VisuMZ[_0x5d7950(0x21d)][_0x5d7950(0x801)][_0x5d7950(0x320)][_0x5ee79b])){var _0x47a583=Number(RegExp['$1']);if(_0x47a583===0x0)_0x47a583=Number['MAX_SAFE_INTEGER'];_0x226ae3=Math[_0x5d7950(0x531)](_0x226ae3,_0x47a583);}if(_0x12a4d5[_0x5d7950(0x539)][_0x5d7950(0x333)](VisuMZ[_0x5d7950(0x21d)][_0x5d7950(0x801)]['paramMaxJS'][_0x5ee79b])){if(_0x5d7950(0x3f2)===_0x5d7950(0x3f2)){var _0x1d2eda=String(RegExp['$1']);try{_0x5d7950(0x5e0)===_0x5d7950(0x918)?this[_0x5d7950(0x5fd)]()?this[_0x5d7950(0x4db)]():_0x24c313['CoreEngine'][_0x5d7950(0x3ab)][_0x5d7950(0x8eb)](this):_0x226ae3=Math['max'](_0x226ae3,Number(eval(_0x1d2eda)));}catch(_0xa68d8c){if($gameTemp[_0x5d7950(0x3a3)]())console[_0x5d7950(0x1b1)](_0xa68d8c);}}else _0x4754ce[_0x5d7950(0x938)](),this[_0x5d7950(0x96c)]();}return _0x226ae3;};if(this['_cache'][_0x27f3d5]===0x0)this['_cache'][_0x27f3d5]=Number[_0x33142a(0x245)];return this['_cache'][_0x27f3d5]=this[_0x33142a(0x608)]()['reduce'](_0x3a369d,this['_cache'][_0x27f3d5]),this[_0x33142a(0x6a5)][_0x27f3d5];},Game_BattlerBase['prototype'][_0x17407e(0x304)]=function(_0xb2857a){const _0x23c077=_0x17407e,_0x3aa31d=this[_0x23c077(0x2eb)](Game_BattlerBase[_0x23c077(0x672)],_0xb2857a),_0x5c4f91=(_0x28cef7,_0x1d4d82)=>{const _0x5b71f4=_0x23c077;if(!_0x1d4d82)return _0x28cef7;if(_0x1d4d82[_0x5b71f4(0x539)][_0x5b71f4(0x333)](VisuMZ[_0x5b71f4(0x21d)][_0x5b71f4(0x801)]['paramRate1'][_0xb2857a])){if(_0x5b71f4(0x23b)!==_0x5b71f4(0x23b)){if(this[_0x5b71f4(0x4d9)]===_0x2b9e6d)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x5b71f4(0x405)]===_0x2a4e53)this[_0x5b71f4(0x1bd)]();return this[_0x5b71f4(0x4d9)][_0x5b71f4(0x405)];}else{var _0x373477=Number(RegExp['$1'])/0x64;_0x28cef7*=_0x373477;}}if(_0x1d4d82[_0x5b71f4(0x539)][_0x5b71f4(0x333)](VisuMZ[_0x5b71f4(0x21d)][_0x5b71f4(0x801)]['paramRate2'][_0xb2857a])){var _0x373477=Number(RegExp['$1']);_0x28cef7*=_0x373477;}if(_0x1d4d82[_0x5b71f4(0x539)][_0x5b71f4(0x333)](VisuMZ[_0x5b71f4(0x21d)][_0x5b71f4(0x801)][_0x5b71f4(0x91f)][_0xb2857a])){var _0x534a5e=String(RegExp['$1']);try{'SkdPS'===_0x5b71f4(0x789)?_0x28cef7*=eval(_0x534a5e):(this['_mode']=this[_0x5b71f4(0x6a6)](),_0x1db4c2[_0x5b71f4(0x21d)][_0x5b71f4(0x761)][_0x5b71f4(0x8eb)](this,_0x3053ce),this[_0x5b71f4(0x4b9)]===_0x5b71f4(0x876)?this[_0x5b71f4(0x54e)](0x0):(_0x1a4434[_0x5b71f4(0x938)](),this['deselect']()));}catch(_0x4d6b72){if($gameTemp[_0x5b71f4(0x3a3)]())console[_0x5b71f4(0x1b1)](_0x4d6b72);}}return _0x28cef7;};return this['traitObjects']()[_0x23c077(0x430)](_0x5c4f91,_0x3aa31d);},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x571)]=function(_0x5b72ad){const _0x3569ce=_0x17407e,_0x3d43ef=(_0x41e796,_0x22c640)=>{const _0x3e59de=_0x98e4;if(!_0x22c640)return _0x41e796;if(_0x22c640[_0x3e59de(0x539)]['match'](VisuMZ['CoreEngine'][_0x3e59de(0x801)][_0x3e59de(0x5f0)][_0x5b72ad])){if(_0x3e59de(0x25f)!==_0x3e59de(0x53a)){var _0x144b0c=Number(RegExp['$1']);_0x41e796+=_0x144b0c;}else return _0x253099[_0x3e59de(0x21d)][_0x3e59de(0x1bf)][_0x3e59de(0x8eb)](this,_0x3613d7);}if(_0x22c640[_0x3e59de(0x539)][_0x3e59de(0x333)](VisuMZ[_0x3e59de(0x21d)][_0x3e59de(0x801)][_0x3e59de(0x8e9)][_0x5b72ad])){if(_0x3e59de(0x88e)!==_0x3e59de(0x88e))this[_0x3e59de(0x8d2)]=0x0;else{var _0x35d783=String(RegExp['$1']);try{_0x41e796+=eval(_0x35d783);}catch(_0x1ae9e4){if($gameTemp['isPlaytest']())console[_0x3e59de(0x1b1)](_0x1ae9e4);}}}return _0x41e796;};return this[_0x3569ce(0x608)]()[_0x3569ce(0x430)](_0x3d43ef,0x0);},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x7e5)]=function(_0x2e6155){const _0x4ae796=_0x17407e;let _0x27e1ef=_0x4ae796(0x7e5)+_0x2e6155+_0x4ae796(0x1e6);if(this[_0x4ae796(0x91d)](_0x27e1ef))return this[_0x4ae796(0x6a5)][_0x27e1ef];return this['_cache'][_0x27e1ef]=Math[_0x4ae796(0x909)](VisuMZ[_0x4ae796(0x21d)]['Settings']['Param']['BasicParameterFormula']['call'](this,_0x2e6155)),this[_0x4ae796(0x6a5)][_0x27e1ef];},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x3f4)]=function(_0x2ad51d){const _0x232e1f=(_0x4725bd,_0x495cb9)=>{const _0x23a203=_0x98e4;if(!_0x495cb9)return _0x4725bd;if(_0x495cb9['note'][_0x23a203(0x333)](VisuMZ[_0x23a203(0x21d)][_0x23a203(0x801)][_0x23a203(0x386)][_0x2ad51d])){var _0x55365d=Number(RegExp['$1'])/0x64;_0x4725bd+=_0x55365d;}if(_0x495cb9[_0x23a203(0x539)][_0x23a203(0x333)](VisuMZ['CoreEngine'][_0x23a203(0x801)][_0x23a203(0x3dd)][_0x2ad51d])){if(_0x23a203(0x395)!==_0x23a203(0x1cd)){var _0x55365d=Number(RegExp['$1']);_0x4725bd+=_0x55365d;}else{let _0x3f0ca5=_0x12d2ed[_0x23a203(0x2dd)](/[\d+]/g,'')[_0x23a203(0x99a)]();const _0x2c5d13=_0x81fc03[_0x23a203(0x4eb)](_0xfae97f,_0x3f0ca5);_0x3b5d30[_0x23a203(0x21d)][_0x23a203(0x801)][_0x5a8656][_0x23a203(0x2b7)](new _0x33f454(_0x2c5d13,'i'));const _0x57d93f=_0x23a203(0x68c)[_0x23a203(0x4eb)](_0x4f3c17,_0x3f0ca5);_0x21a3ec[_0x23a203(0x21d)][_0x23a203(0x801)][_0x2dcecf+'JS']['push'](new _0x398dd1(_0x57d93f,'i'));}}if(_0x495cb9['note'][_0x23a203(0x333)](VisuMZ['CoreEngine'][_0x23a203(0x801)]['xparamPlusJS'][_0x2ad51d])){var _0x4bd6ad=String(RegExp['$1']);try{if(_0x23a203(0x3b6)==='GBUnt')_0x4725bd+=eval(_0x4bd6ad);else return _0x42f218[_0x23a203(0x7e0)][_0x23a203(0x873)][_0x23a203(0x8eb)](this);}catch(_0x35174a){if('nHmtY'===_0x23a203(0x991)){if($gameTemp[_0x23a203(0x3a3)]())console[_0x23a203(0x1b1)](_0x35174a);}else{const _0x2da543=0x90,_0x40f913=0x60,_0x53aeaa=0x18;this[_0x23a203(0x20f)][_0x23a203(0x424)]=this['_windowskin'],this[_0x23a203(0x20f)][_0x23a203(0x466)]['x']=0.5,this[_0x23a203(0x20f)][_0x23a203(0x466)]['y']=0x1,this[_0x23a203(0x20f)][_0x23a203(0x400)](_0x4a331e[_0x23a203(0x909)](this[_0x23a203(0x752)]/0x2),this[_0x23a203(0x6d0)]),this[_0x23a203(0x20f)][_0x23a203(0x87b)](_0x2da543,_0x40f913,_0x53aeaa,_0x53aeaa),this[_0x23a203(0x20f)]['alpha']=0xff;}}}return _0x4725bd;};return this['traitObjects']()['reduce'](_0x232e1f,0x0);},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x69c)]=function(_0x14c1d2){const _0x4b845f=_0x17407e,_0x58f7a7=(_0x1c8eff,_0x12b06d)=>{const _0x4dd797=_0x98e4;if(_0x4dd797(0x44c)!==_0x4dd797(0x44c))this['drawTextEx'](_0x53f993[_0x4dd797(0x219)]()[_0x4dd797(0x506)],_0x730442,_0x269af4,_0x4f763f);else{if(!_0x12b06d)return _0x1c8eff;if(_0x12b06d[_0x4dd797(0x539)]['match'](VisuMZ[_0x4dd797(0x21d)][_0x4dd797(0x801)][_0x4dd797(0x929)][_0x14c1d2])){var _0x1a1ffe=Number(RegExp['$1'])/0x64;_0x1c8eff*=_0x1a1ffe;}if(_0x12b06d[_0x4dd797(0x539)][_0x4dd797(0x333)](VisuMZ[_0x4dd797(0x21d)][_0x4dd797(0x801)][_0x4dd797(0x2b9)][_0x14c1d2])){var _0x1a1ffe=Number(RegExp['$1']);_0x1c8eff*=_0x1a1ffe;}if(_0x12b06d[_0x4dd797(0x539)][_0x4dd797(0x333)](VisuMZ[_0x4dd797(0x21d)][_0x4dd797(0x801)][_0x4dd797(0x4b8)][_0x14c1d2])){var _0x1f42cb=String(RegExp['$1']);try{if(_0x4dd797(0x5cf)===_0x4dd797(0x5cf))_0x1c8eff*=eval(_0x1f42cb);else{if(_0x12bacb[_0x4dd797(0x30b)]==='')return![];if(_0xef0196[_0x4dd797(0x30b)]===_0x4dd797(0x7a1))return![];if(_0xe6e3cc['version']==='')return![];if(_0x404f6a['version']===_0x4dd797(0x750))return![];return!![];}}catch(_0x3b9760){if(_0x4dd797(0x747)===_0x4dd797(0x3ea)){this['_destroyInternalTextures']();for(let _0x43deec=0x0;_0x43deec<_0x2a125a['Layer']['MAX_GL_TEXTURES'];_0x43deec++){const _0x2a8b3a=new _0x41871c[(_0x4dd797(0x5b7))]();_0x2a8b3a[_0x4dd797(0x916)](0x800,0x800),_0x211abd['CoreEngine'][_0x4dd797(0x5cb)][_0x4dd797(0x7e8)][_0x4dd797(0x452)]&&(_0x2a8b3a[_0x4dd797(0x62b)]=_0x45944a['SCALE_MODES'][_0x4dd797(0x613)]),this['_internalTextures'][_0x4dd797(0x2b7)](_0x2a8b3a);}}else{if($gameTemp[_0x4dd797(0x3a3)]())console['log'](_0x3b9760);}}}return _0x1c8eff;}};return this[_0x4b845f(0x608)]()[_0x4b845f(0x430)](_0x58f7a7,0x1);},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x7dc)]=function(_0x4640cf){const _0x5e7ba7=_0x17407e,_0x482c42=(_0x2b46fd,_0x17066a)=>{const _0x5f4308=_0x98e4;if(!_0x17066a)return _0x2b46fd;if(_0x17066a[_0x5f4308(0x539)][_0x5f4308(0x333)](VisuMZ[_0x5f4308(0x21d)][_0x5f4308(0x801)][_0x5f4308(0x86a)][_0x4640cf])){if(_0x5f4308(0x491)!=='tkNOt'){var _0x382082=Number(RegExp['$1'])/0x64;_0x2b46fd+=_0x382082;}else return _0x1b462f[_0x5f4308(0x3e5)](_0x42f0eb,'[',']');}if(_0x17066a[_0x5f4308(0x539)][_0x5f4308(0x333)](VisuMZ[_0x5f4308(0x21d)][_0x5f4308(0x801)]['xparamFlat2'][_0x4640cf])){var _0x382082=Number(RegExp['$1']);_0x2b46fd+=_0x382082;}if(_0x17066a[_0x5f4308(0x539)][_0x5f4308(0x333)](VisuMZ['CoreEngine'][_0x5f4308(0x801)][_0x5f4308(0x295)][_0x4640cf])){var _0x24240d=String(RegExp['$1']);try{_0x2b46fd+=eval(_0x24240d);}catch(_0x5543aa){if(_0x5f4308(0x4e8)===_0x5f4308(0x4e8)){if($gameTemp[_0x5f4308(0x3a3)]())console[_0x5f4308(0x1b1)](_0x5543aa);}else this['_CoreEngineSettings']={'SideView':_0x543ffa[_0x5f4308(0x600)],'BattleSystem':this[_0x5f4308(0x64d)](),'FontSize':_0x14b3a3['advanced'][_0x5f4308(0x1c5)],'Padding':0xc};}}return _0x2b46fd;};return this['traitObjects']()[_0x5e7ba7(0x430)](_0x482c42,0x0);},Game_BattlerBase['prototype'][_0x17407e(0x88d)]=function(_0x46215b){const _0x31652a=_0x17407e;let _0x2fd927=_0x31652a(0x88d)+_0x46215b+_0x31652a(0x1e6);if(this[_0x31652a(0x91d)](_0x2fd927))return this[_0x31652a(0x6a5)][_0x2fd927];return this[_0x31652a(0x6a5)][_0x2fd927]=VisuMZ['CoreEngine'][_0x31652a(0x5cb)]['Param'][_0x31652a(0x284)]['call'](this,_0x46215b),this[_0x31652a(0x6a5)][_0x2fd927];},Game_BattlerBase['prototype']['sparamPlus']=function(_0x2fa370){const _0x40a9aa=_0x17407e,_0x2e01e2=(_0x1f4de0,_0x144232)=>{const _0x1d2ddf=_0x98e4;if(_0x1d2ddf(0x5de)===_0x1d2ddf(0x2d8))_0x45f163[_0x1d2ddf(0x21d)]['Scene_Base_createWindowLayer'][_0x1d2ddf(0x8eb)](this),this[_0x1d2ddf(0x22c)](),this[_0x1d2ddf(0x48e)]['x']=_0x3bccea[_0x1d2ddf(0x909)](this[_0x1d2ddf(0x48e)]['x']),this[_0x1d2ddf(0x48e)]['y']=_0x5c414c['round'](this['_windowLayer']['y']);else{if(!_0x144232)return _0x1f4de0;if(_0x144232[_0x1d2ddf(0x539)][_0x1d2ddf(0x333)](VisuMZ[_0x1d2ddf(0x21d)][_0x1d2ddf(0x801)][_0x1d2ddf(0x773)][_0x2fa370])){if(_0x1d2ddf(0x689)!==_0x1d2ddf(0x29f)){var _0x7691e9=Number(RegExp['$1'])/0x64;_0x1f4de0+=_0x7691e9;}else this[_0x1d2ddf(0x480)]={},_0x20ec11[_0x1d2ddf(0x374)][_0x1d2ddf(0x829)][_0x1d2ddf(0x8eb)](this,_0x31316a),this[_0x1d2ddf(0x3c0)](_0x13dfb0[_0x1d2ddf(0x21d)][_0x1d2ddf(0x5cb)][_0x1d2ddf(0x963)]['BgType']||0x0),this[_0x1d2ddf(0x677)]();}if(_0x144232['note'][_0x1d2ddf(0x333)](VisuMZ[_0x1d2ddf(0x21d)][_0x1d2ddf(0x801)]['sparamPlus2'][_0x2fa370])){var _0x7691e9=Number(RegExp['$1']);_0x1f4de0+=_0x7691e9;}if(_0x144232['note'][_0x1d2ddf(0x333)](VisuMZ['CoreEngine'][_0x1d2ddf(0x801)]['sparamPlusJS'][_0x2fa370])){var _0x4dda66=String(RegExp['$1']);try{_0x1d2ddf(0x8b7)!==_0x1d2ddf(0x8b7)?this[_0x1d2ddf(0x8b4)][_0x1d2ddf(0x3c0)](_0x44b511['layoutSettings'][_0x1d2ddf(0x8c3)]):_0x1f4de0+=eval(_0x4dda66);}catch(_0x5787de){if($gameTemp[_0x1d2ddf(0x3a3)]())console[_0x1d2ddf(0x1b1)](_0x5787de);}}return _0x1f4de0;}};return this[_0x40a9aa(0x608)]()[_0x40a9aa(0x430)](_0x2e01e2,0x0);},Game_BattlerBase['prototype'][_0x17407e(0x202)]=function(_0x104554){const _0x46b65e=_0x17407e,_0x327b7a=(_0xdd420f,_0x53fc97)=>{const _0x9bf110=_0x98e4;if(_0x9bf110(0x22d)!=='bXnJE')_0xb82e27[_0x9bf110(0x1e8)](_0x3ee52b);else{if(!_0x53fc97)return _0xdd420f;if(_0x53fc97[_0x9bf110(0x539)][_0x9bf110(0x333)](VisuMZ[_0x9bf110(0x21d)][_0x9bf110(0x801)]['sparamRate1'][_0x104554])){var _0x41daff=Number(RegExp['$1'])/0x64;_0xdd420f*=_0x41daff;}if(_0x53fc97[_0x9bf110(0x539)][_0x9bf110(0x333)](VisuMZ[_0x9bf110(0x21d)][_0x9bf110(0x801)][_0x9bf110(0x81a)][_0x104554])){var _0x41daff=Number(RegExp['$1']);_0xdd420f*=_0x41daff;}if(_0x53fc97['note'][_0x9bf110(0x333)](VisuMZ['CoreEngine'][_0x9bf110(0x801)][_0x9bf110(0x678)][_0x104554])){var _0x4c4fd9=String(RegExp['$1']);try{_0xdd420f*=eval(_0x4c4fd9);}catch(_0x37c4b5){if(_0x9bf110(0x4d3)===_0x9bf110(0x4d3)){if($gameTemp[_0x9bf110(0x3a3)]())console['log'](_0x37c4b5);}else return _0x502b0c[_0x9bf110(0x7e0)][_0x9bf110(0x887)][_0x9bf110(0x8eb)](this);}}return _0xdd420f;}};return this[_0x46b65e(0x608)]()[_0x46b65e(0x430)](_0x327b7a,0x1);},Game_BattlerBase[_0x17407e(0x374)]['sparamFlatBonus']=function(_0x1c0250){const _0x20e87e=_0x17407e,_0x3a7b72=(_0x23482f,_0x406bae)=>{const _0x432380=_0x98e4;if(!_0x406bae)return _0x23482f;if(_0x406bae[_0x432380(0x539)][_0x432380(0x333)](VisuMZ[_0x432380(0x21d)][_0x432380(0x801)][_0x432380(0x1f6)][_0x1c0250])){if(_0x432380(0x8a4)!==_0x432380(0x8a4)){const _0x238846=this[_0x432380(0x2ed)]();this[_0x432380(0x587)](_0x4b7366[_0x432380(0x3ed)]());const _0x1707d5=_0x2138fb['CoreEngine'][_0x432380(0x5cb)]['UI'][_0x432380(0x217)];this[_0x432380(0x27d)](_0x1707d5,_0x80adc6,_0x438025,_0x238846,_0x432380(0x98b));}else{var _0x4020a3=Number(RegExp['$1'])/0x64;_0x23482f+=_0x4020a3;}}if(_0x406bae[_0x432380(0x539)][_0x432380(0x333)](VisuMZ[_0x432380(0x21d)]['RegExp'][_0x432380(0x849)][_0x1c0250])){var _0x4020a3=Number(RegExp['$1']);_0x23482f+=_0x4020a3;}if(_0x406bae[_0x432380(0x539)][_0x432380(0x333)](VisuMZ[_0x432380(0x21d)][_0x432380(0x801)]['sparamFlatJS'][_0x1c0250])){if(_0x432380(0x3e6)===_0x432380(0x3e6)){var _0x27125a=String(RegExp['$1']);try{_0x23482f+=eval(_0x27125a);}catch(_0x229e48){if('NiqvD'==='gllYR')_0x2af9c2=_0x3f7166['makeDeepCopy'](_0x6b98e2),_0x5d9f58['se']&&(_0x30e0f8['se']['volume']=0x0);else{if($gameTemp[_0x432380(0x3a3)]())console[_0x432380(0x1b1)](_0x229e48);}}}else this[_0x432380(0x70b)]=_0x4c79c5;}return _0x23482f;};return this[_0x20e87e(0x608)]()[_0x20e87e(0x430)](_0x3a7b72,0x0);},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x645)]=function(_0x2b95f6){const _0x217668=_0x17407e;let _0x17a925=_0x217668(0x645)+_0x2b95f6+_0x217668(0x1e6);if(this[_0x217668(0x91d)](_0x17a925))return this['_cache'][_0x17a925];return this[_0x217668(0x6a5)][_0x17a925]=VisuMZ['CoreEngine'][_0x217668(0x5cb)][_0x217668(0x2d0)][_0x217668(0x532)][_0x217668(0x8eb)](this,_0x2b95f6),this[_0x217668(0x6a5)][_0x17a925];},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x5eb)]=function(_0x280ad4,_0x15292e){const _0x5310bd=_0x17407e;if(typeof paramId===_0x5310bd(0x50c))return this[_0x5310bd(0x7e5)](_0x280ad4);_0x280ad4=String(_0x280ad4||'')[_0x5310bd(0x99a)]();if(_0x280ad4==='MAXHP')return this[_0x5310bd(0x7e5)](0x0);if(_0x280ad4===_0x5310bd(0x4a8))return this[_0x5310bd(0x7e5)](0x1);if(_0x280ad4===_0x5310bd(0x6a7))return this[_0x5310bd(0x7e5)](0x2);if(_0x280ad4===_0x5310bd(0x6b0))return this[_0x5310bd(0x7e5)](0x3);if(_0x280ad4===_0x5310bd(0x254))return this[_0x5310bd(0x7e5)](0x4);if(_0x280ad4===_0x5310bd(0x2a5))return this['param'](0x5);if(_0x280ad4===_0x5310bd(0x970))return this[_0x5310bd(0x7e5)](0x6);if(_0x280ad4===_0x5310bd(0x478))return this[_0x5310bd(0x7e5)](0x7);if(_0x280ad4===_0x5310bd(0x7fa))return _0x15292e?String(Math[_0x5310bd(0x909)](this['xparam'](0x0)*0x64))+'%':this[_0x5310bd(0x88d)](0x0);if(_0x280ad4===_0x5310bd(0x1ff))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x88d)](0x1)*0x64))+'%':this[_0x5310bd(0x88d)](0x1);if(_0x280ad4===_0x5310bd(0x9b7))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x88d)](0x2)*0x64))+'%':this[_0x5310bd(0x88d)](0x2);if(_0x280ad4===_0x5310bd(0x8b5))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x88d)](0x3)*0x64))+'%':this[_0x5310bd(0x88d)](0x3);if(_0x280ad4===_0x5310bd(0x647))return _0x15292e?String(Math[_0x5310bd(0x909)](this['xparam'](0x4)*0x64))+'%':this[_0x5310bd(0x88d)](0x4);if(_0x280ad4===_0x5310bd(0x40f))return _0x15292e?String(Math['round'](this[_0x5310bd(0x88d)](0x5)*0x64))+'%':this[_0x5310bd(0x88d)](0x5);if(_0x280ad4==='CNT')return _0x15292e?String(Math['round'](this['xparam'](0x6)*0x64))+'%':this[_0x5310bd(0x88d)](0x6);if(_0x280ad4===_0x5310bd(0x88b))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x88d)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x280ad4===_0x5310bd(0x1ce))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x88d)](0x8)*0x64))+'%':this[_0x5310bd(0x88d)](0x8);if(_0x280ad4===_0x5310bd(0x696))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x88d)](0x9)*0x64))+'%':this[_0x5310bd(0x88d)](0x9);if(_0x280ad4===_0x5310bd(0x2ae))return _0x15292e?String(Math[_0x5310bd(0x909)](this['sparam'](0x0)*0x64))+'%':this[_0x5310bd(0x645)](0x0);if(_0x280ad4===_0x5310bd(0x383))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x645)](0x1)*0x64))+'%':this[_0x5310bd(0x645)](0x1);if(_0x280ad4==='REC')return _0x15292e?String(Math['round'](this['sparam'](0x2)*0x64))+'%':this[_0x5310bd(0x645)](0x2);if(_0x280ad4===_0x5310bd(0x525))return _0x15292e?String(Math['round'](this[_0x5310bd(0x645)](0x3)*0x64))+'%':this[_0x5310bd(0x645)](0x3);if(_0x280ad4===_0x5310bd(0x2de))return _0x15292e?String(Math[_0x5310bd(0x909)](this['sparam'](0x4)*0x64))+'%':this[_0x5310bd(0x645)](0x4);if(_0x280ad4==='TCR')return _0x15292e?String(Math['round'](this[_0x5310bd(0x645)](0x5)*0x64))+'%':this[_0x5310bd(0x645)](0x5);if(_0x280ad4===_0x5310bd(0x869))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x645)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x280ad4===_0x5310bd(0x66e))return _0x15292e?String(Math[_0x5310bd(0x909)](this['sparam'](0x7)*0x64))+'%':this[_0x5310bd(0x645)](0x7);if(_0x280ad4===_0x5310bd(0x83c))return _0x15292e?String(Math['round'](this[_0x5310bd(0x645)](0x8)*0x64))+'%':this[_0x5310bd(0x645)](0x8);if(_0x280ad4===_0x5310bd(0x3c9))return _0x15292e?String(Math[_0x5310bd(0x909)](this[_0x5310bd(0x645)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x5310bd(0x21d)][_0x5310bd(0x3a9)][_0x280ad4]){const _0x1ac3b6=VisuMZ[_0x5310bd(0x21d)][_0x5310bd(0x3a9)][_0x280ad4],_0x5b0150=this[_0x1ac3b6];if(VisuMZ[_0x5310bd(0x21d)][_0x5310bd(0x234)][_0x280ad4]===_0x5310bd(0x1f3))return _0x5b0150;else{if(_0x5310bd(0x39d)===_0x5310bd(0x39d))return _0x15292e?String(Math[_0x5310bd(0x909)](_0x5b0150*0x64))+'%':_0x5b0150;else{if(_0x1ce374[_0x5310bd(0x21d)][_0x5310bd(0x5cb)]['UI']['SideButtons']){const _0x2b7578=_0x576030[_0x5310bd(0x2b6)]-_0x159a86['boxWidth']-_0x343011[_0x5310bd(0x21d)][_0x5310bd(0x5cb)]['UI'][_0x5310bd(0x329)]*0x2,_0x1a22cf=_0x27c98f[_0x5310bd(0x374)][_0x5310bd(0x7ad)][_0x5310bd(0x8eb)](this)*0x4;if(_0x2b7578>=_0x1a22cf)_0x1fe66b[_0x5310bd(0x5ff)](!![]);}}}}return'';},Game_BattlerBase[_0x17407e(0x374)][_0x17407e(0x751)]=function(){const _0x5c8a57=_0x17407e;return this[_0x5c8a57(0x1dd)]()&&this['_hp']<this[_0x5c8a57(0x5e6)]*VisuMZ[_0x5c8a57(0x21d)]['Settings'][_0x5c8a57(0x2d0)]['CrisisRate'];},Game_Battler['prototype'][_0x17407e(0x8a9)]=function(){const _0x2909a2=_0x17407e;SoundManager[_0x2909a2(0x3cf)](),this[_0x2909a2(0x487)](_0x2909a2(0x9aa));},VisuMZ[_0x17407e(0x21d)]['Game_Actor_paramBase']=Game_Actor[_0x17407e(0x374)]['paramBase'],Game_Actor[_0x17407e(0x374)]['paramBase']=function(_0x5d2cf5){const _0x3fe0f5=_0x17407e;if(this[_0x3fe0f5(0x1f5)]>0x63)return this[_0x3fe0f5(0x7b7)](_0x5d2cf5);return VisuMZ[_0x3fe0f5(0x21d)][_0x3fe0f5(0x55d)][_0x3fe0f5(0x8eb)](this,_0x5d2cf5);},Game_Actor[_0x17407e(0x374)]['paramBaseAboveLevel99']=function(_0x38f3ea){const _0x146943=_0x17407e,_0x54a9cc=this[_0x146943(0x219)]()[_0x146943(0x944)][_0x38f3ea][0x63],_0x32fe3a=this['currentClass']()[_0x146943(0x944)][_0x38f3ea][0x62];return _0x54a9cc+(_0x54a9cc-_0x32fe3a)*(this[_0x146943(0x1f5)]-0x63);},VisuMZ['CoreEngine'][_0x17407e(0x310)]=Game_Actor['prototype'][_0x17407e(0x844)],Game_Actor[_0x17407e(0x374)][_0x17407e(0x844)]=function(_0xeea5a3,_0x44d80a){const _0x1ec04a=_0x17407e;$gameTemp[_0x1ec04a(0x1de)]=!![],VisuMZ['CoreEngine'][_0x1ec04a(0x310)]['call'](this,_0xeea5a3,_0x44d80a),$gameTemp[_0x1ec04a(0x1de)]=undefined;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8a2)]=Game_Actor[_0x17407e(0x374)][_0x17407e(0x748)],Game_Actor[_0x17407e(0x374)][_0x17407e(0x748)]=function(){const _0x56bff8=_0x17407e;VisuMZ['CoreEngine'][_0x56bff8(0x8a2)][_0x56bff8(0x8eb)](this);if(!$gameTemp[_0x56bff8(0x1de)])this[_0x56bff8(0x786)]();},Game_Actor['prototype'][_0x17407e(0x786)]=function(){const _0x1fdcbc=_0x17407e;this[_0x1fdcbc(0x6a5)]={};if(VisuMZ[_0x1fdcbc(0x21d)][_0x1fdcbc(0x5cb)][_0x1fdcbc(0x7e8)][_0x1fdcbc(0x646)])this[_0x1fdcbc(0x7a8)]=this[_0x1fdcbc(0x5e6)];if(VisuMZ[_0x1fdcbc(0x21d)][_0x1fdcbc(0x5cb)][_0x1fdcbc(0x7e8)][_0x1fdcbc(0x2f1)])this[_0x1fdcbc(0x8bf)]=this[_0x1fdcbc(0x50b)];},Game_Actor[_0x17407e(0x374)]['expRate']=function(){const _0x3ac065=_0x17407e;if(this[_0x3ac065(0x419)]())return 0x1;const _0x57094c=this[_0x3ac065(0x2d4)]()-this[_0x3ac065(0x483)](),_0x33c0c9=this[_0x3ac065(0x815)]()-this[_0x3ac065(0x483)]();return(_0x33c0c9/_0x57094c)[_0x3ac065(0x509)](0x0,0x1);},Game_Actor['prototype'][_0x17407e(0x608)]=function(){const _0x4bc9bc=_0x17407e,_0x57cb68=Game_Battler[_0x4bc9bc(0x374)][_0x4bc9bc(0x608)]['call'](this);for(const _0x5eefb0 of this[_0x4bc9bc(0x762)]()){_0x4bc9bc(0x934)!==_0x4bc9bc(0x5e5)?_0x5eefb0&&_0x57cb68[_0x4bc9bc(0x2b7)](_0x5eefb0):_0x5a7511[_0x4bc9bc(0x85c)]&&_0x504f73[_0x4bc9bc(0x85c)]();}return _0x57cb68[_0x4bc9bc(0x2b7)](this[_0x4bc9bc(0x219)](),this['actor']()),_0x57cb68;},Object[_0x17407e(0x3da)](Game_Enemy[_0x17407e(0x374)],'level',{'get':function(){const _0x5c3c49=_0x17407e;return this[_0x5c3c49(0x7a6)]();},'configurable':!![]}),Game_Enemy[_0x17407e(0x374)][_0x17407e(0x7a6)]=function(){const _0xd01aa7=_0x17407e;return this[_0xd01aa7(0x84f)]()[_0xd01aa7(0x1f5)];},Game_Enemy[_0x17407e(0x374)][_0x17407e(0x621)]=function(){const _0x313870=_0x17407e;!this[_0x313870(0x58f)]&&(this['_screenY']+=Math[_0x313870(0x909)]((Graphics[_0x313870(0x2fc)]-0x270)/0x2),this[_0x313870(0x913)]-=Math[_0x313870(0x3d1)]((Graphics[_0x313870(0x2fc)]-Graphics[_0x313870(0x528)])/0x2),$gameSystem[_0x313870(0x429)]()?this[_0x313870(0x6df)]-=Math[_0x313870(0x3d1)]((Graphics[_0x313870(0x2b6)]-Graphics[_0x313870(0x937)])/0x2):'BpbTY'!==_0x313870(0x89e)?(_0x582249[_0x313870(0x946)][0x57]='up',_0x205139[_0x313870(0x946)][0x41]=_0x313870(0x917),_0x1a916e['keyMapper'][0x53]=_0x313870(0x722),_0x1db735[_0x313870(0x946)][0x44]=_0x313870(0x1ad),_0x4638be['keyMapper'][0x45]='pagedown'):this[_0x313870(0x6df)]+=Math['round']((Graphics[_0x313870(0x937)]-0x330)/0x2)),this[_0x313870(0x58f)]=!![];},Game_Party['prototype'][_0x17407e(0x896)]=function(){const _0x11ab3b=_0x17407e;return VisuMZ[_0x11ab3b(0x21d)]['Settings'][_0x11ab3b(0x59f)][_0x11ab3b(0x710)];},VisuMZ[_0x17407e(0x21d)]['Game_Party_consumeItem']=Game_Party[_0x17407e(0x374)][_0x17407e(0x981)],Game_Party[_0x17407e(0x374)][_0x17407e(0x981)]=function(_0x2b3cc5){const _0x29aad4=_0x17407e;if(VisuMZ[_0x29aad4(0x21d)][_0x29aad4(0x5cb)]['QoL'][_0x29aad4(0x8b8)]&&DataManager[_0x29aad4(0x479)](_0x2b3cc5))return;VisuMZ['CoreEngine'][_0x29aad4(0x301)][_0x29aad4(0x8eb)](this,_0x2b3cc5);},Game_Party[_0x17407e(0x374)]['setupBattleTestItems']=function(){const _0x2221b6=_0x17407e,_0x4fb5ad=VisuMZ['CoreEngine']['Settings'][_0x2221b6(0x7e8)],_0x124d78=_0x4fb5ad[_0x2221b6(0x699)]??0x63;let _0x32eadd=[];(_0x4fb5ad[_0x2221b6(0x4ae)]??!![])&&(_0x32eadd=_0x32eadd[_0x2221b6(0x46a)]($dataItems));(_0x4fb5ad[_0x2221b6(0x7d4)]??!![])&&(_0x32eadd=_0x32eadd[_0x2221b6(0x46a)]($dataWeapons));(_0x4fb5ad[_0x2221b6(0x540)]??!![])&&(_0x32eadd=_0x32eadd[_0x2221b6(0x46a)]($dataArmors));for(const _0x1a71d1 of _0x32eadd){if(!_0x1a71d1)continue;if(_0x1a71d1[_0x2221b6(0x506)]['trim']()<=0x0)continue;if(_0x1a71d1[_0x2221b6(0x506)][_0x2221b6(0x333)](/-----/i))continue;this['gainItem'](_0x1a71d1,_0x124d78);}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x348)]=Game_Troop[_0x17407e(0x374)][_0x17407e(0x744)],Game_Troop[_0x17407e(0x374)][_0x17407e(0x744)]=function(_0x56ff0e){const _0x486e8e=_0x17407e;$gameTemp[_0x486e8e(0x2e2)](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x56ff0e),VisuMZ[_0x486e8e(0x21d)][_0x486e8e(0x348)]['call'](this,_0x56ff0e);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x718)]=Game_Map['prototype'][_0x17407e(0x744)],Game_Map[_0x17407e(0x374)][_0x17407e(0x744)]=function(_0x13690a){const _0x121356=_0x17407e;VisuMZ['CoreEngine'][_0x121356(0x718)][_0x121356(0x8eb)](this,_0x13690a),this['setupCoreEngine'](_0x13690a);},Game_Map['prototype'][_0x17407e(0x7dd)]=function(){const _0x27d972=_0x17407e;this[_0x27d972(0x35f)]=VisuMZ['CoreEngine'][_0x27d972(0x5cb)]['QoL'][_0x27d972(0x1b0)]||![];if($dataMap&&$dataMap[_0x27d972(0x539)]){if('zCrPO'!==_0x27d972(0x6f0))return _0x1b4c20=_0xc6e891(_0x2c2321),this[_0x27d972(0x706)]=this[_0x27d972(0x706)]||{},_0xc7deeb[_0x27d972(0x333)](/#(.*)/i)?this['_colorCache'][_0x2a72ad]=_0x27d972(0x813)[_0x27d972(0x4eb)](_0xb81054(_0x4a3321['$1'])):this[_0x27d972(0x706)][_0x2cd581]=this[_0x27d972(0x7d5)](_0x1e26ef(_0xd8aadd)),this[_0x27d972(0x706)][_0x3ef73d];else{if($dataMap['note']['match'](/<SHOW TILE SHADOWS>/i))this[_0x27d972(0x35f)]=![];if($dataMap[_0x27d972(0x539)][_0x27d972(0x333)](/<HIDE TILE SHADOWS>/i))this[_0x27d972(0x35f)]=!![];}}},Game_Map[_0x17407e(0x374)][_0x17407e(0x89b)]=function(){const _0x1c269d=_0x17407e;if(this[_0x1c269d(0x35f)]===undefined)this[_0x1c269d(0x7dd)]();return this[_0x1c269d(0x35f)];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x207)]=Game_Character[_0x17407e(0x374)]['processMoveCommand'],Game_Character[_0x17407e(0x374)][_0x17407e(0x6b6)]=function(_0xf93546){const _0x5523bc=_0x17407e;try{VisuMZ[_0x5523bc(0x21d)]['Game_Character_processMoveCommand'][_0x5523bc(0x8eb)](this,_0xf93546);}catch(_0xbf368d){if($gameTemp[_0x5523bc(0x3a3)]())console[_0x5523bc(0x1b1)](_0xbf368d);}},Game_Player[_0x17407e(0x374)][_0x17407e(0x28b)]=function(){const _0x4d8f16=_0x17407e,_0x10b114=$gameMap[_0x4d8f16(0x6c5)]();this[_0x4d8f16(0x5f1)]=Math[_0x4d8f16(0x212)](_0x10b114)+Math[_0x4d8f16(0x212)](_0x10b114)+this[_0x4d8f16(0x5f8)]();},Game_Player[_0x17407e(0x374)][_0x17407e(0x5f8)]=function(){const _0x3d3914=_0x17407e;if($dataMap&&$dataMap[_0x3d3914(0x539)]&&$dataMap[_0x3d3914(0x539)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x3d3914(0x97b)!==_0x3d3914(0x57f))return Number(RegExp['$1']);else{if(_0x1c1b81&&_0x58895c[_0x3d3914(0x921)]){if(this['isGamepadButtonPressed'](_0x33f18c))return!![];}}}else return _0x3d3914(0x7a4)===_0x3d3914(0x292)?_0x20f962[_0x3d3914(0x21d)][_0x3d3914(0x5cb)][_0x3d3914(0x681)][_0x3d3914(0x1f9)]:VisuMZ['CoreEngine'][_0x3d3914(0x5cb)][_0x3d3914(0x7e8)][_0x3d3914(0x3be)];},VisuMZ[_0x17407e(0x21d)]['Game_Event_isCollidedWithEvents']=Game_Event['prototype'][_0x17407e(0x732)],Game_Event[_0x17407e(0x374)][_0x17407e(0x732)]=function(_0x4e386f,_0x461a9){const _0xcb546a=_0x17407e;if(this['isSmartEventCollisionOn']()){if(_0xcb546a(0x52d)!==_0xcb546a(0x52d)){const _0x4631d1=_0xcb546a(0x71f);this[_0xcb546a(0x706)]=this['_colorCache']||{};if(this[_0xcb546a(0x706)][_0x4631d1])return this[_0xcb546a(0x706)][_0x4631d1];const _0x35fa44=_0x328b68[_0xcb546a(0x21d)][_0xcb546a(0x5cb)][_0xcb546a(0x681)]['ColorDeath'];return this[_0xcb546a(0x92f)](_0x4631d1,_0x35fa44);}else return this[_0xcb546a(0x24c)](_0x4e386f,_0x461a9);}else return VisuMZ[_0xcb546a(0x21d)][_0xcb546a(0x8da)][_0xcb546a(0x8eb)](this,_0x4e386f,_0x461a9);},Game_Event[_0x17407e(0x374)][_0x17407e(0x216)]=function(){const _0x18dfdb=_0x17407e;return VisuMZ['CoreEngine'][_0x18dfdb(0x5cb)]['QoL'][_0x18dfdb(0x4b3)];},Game_Event[_0x17407e(0x374)][_0x17407e(0x24c)]=function(_0x16f03d,_0x2fab4f){const _0x7eeb47=_0x17407e;if(!this[_0x7eeb47(0x2e9)]())return![];else{const _0x5eefec=$gameMap['eventsXyNt'](_0x16f03d,_0x2fab4f)[_0x7eeb47(0x4b6)](_0x221fdc=>_0x221fdc[_0x7eeb47(0x2e9)]());return _0x5eefec[_0x7eeb47(0x62d)]>0x0;}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x373)]=Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x799)],Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x799)]=function(_0x4fae7b){const _0x436f9f=_0x17407e,_0x25f7d6=this['getCombinedScrollingText']();return _0x25f7d6[_0x436f9f(0x333)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x436f9f(0x2f4)](_0x25f7d6):VisuMZ[_0x436f9f(0x21d)][_0x436f9f(0x373)][_0x436f9f(0x8eb)](this,_0x4fae7b);},Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x62a)]=function(){const _0x4ff257=_0x17407e;let _0x4ce6e9='',_0x4ca7e0=this[_0x4ff257(0x901)]+0x1;while(this['_list'][_0x4ca7e0]&&this[_0x4ff257(0x7cb)][_0x4ca7e0]['code']===0x195){if(_0x4ff257(0x6e5)!==_0x4ff257(0x6e5))return _0xd45163[_0x4ff257(0x21d)][_0x4ff257(0x5cb)]['Window'][_0x4ff257(0x905)];else _0x4ce6e9+=this['_list'][_0x4ca7e0][_0x4ff257(0x277)][0x0]+'\x0a',_0x4ca7e0++;}return _0x4ce6e9;},Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x2f4)]=function(_0x5caccb){const _0x402d07=_0x17407e;try{eval(_0x5caccb);}catch(_0x567f87){if(_0x402d07(0x635)!==_0x402d07(0x236))$gameTemp[_0x402d07(0x3a3)]()&&('ILslx'===_0x402d07(0x834)?(_0xb43970[_0x402d07(0x874)]=0x0,_0x472073[_0x402d07(0x783)]=0x0,_0xc88e02[_0x402d07(0x1e1)]=0x0,_0x14c7c9[_0x402d07(0x810)]=0x0):(console[_0x402d07(0x1b1)](_0x402d07(0x31a)),console['log'](_0x567f87)));else{this[_0x402d07(0x6a5)]={};if(_0x2c2ddf[_0x402d07(0x21d)][_0x402d07(0x5cb)][_0x402d07(0x7e8)][_0x402d07(0x646)])this[_0x402d07(0x7a8)]=this['mhp'];if(_0x2799c7[_0x402d07(0x21d)][_0x402d07(0x5cb)][_0x402d07(0x7e8)]['LevelUpFullMp'])this[_0x402d07(0x8bf)]=this['mmp'];}}return!![];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x52e)]=Game_Interpreter[_0x17407e(0x374)]['command111'],Game_Interpreter[_0x17407e(0x374)]['command111']=function(_0x42ea08){const _0x4228d4=_0x17407e;try{_0x4228d4(0x20c)==='WZCwT'?(this[_0x4228d4(0x558)]=![],this[_0x4228d4(0x84e)]=0x0,this['x']=_0x340bbc[_0x4228d4(0x2b6)]*0xa,this['y']=_0x192b53['height']*0xa):VisuMZ[_0x4228d4(0x21d)][_0x4228d4(0x52e)]['call'](this,_0x42ea08);}catch(_0x1da9e2){$gameTemp[_0x4228d4(0x3a3)]()&&(console[_0x4228d4(0x1b1)](_0x4228d4(0x77d)),console[_0x4228d4(0x1b1)](_0x1da9e2)),this[_0x4228d4(0x3b1)]();}return!![];},VisuMZ['CoreEngine'][_0x17407e(0x8c4)]=Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x378)],Game_Interpreter['prototype'][_0x17407e(0x378)]=function(_0x5e1b04){const _0x53e0ba=_0x17407e;try{VisuMZ[_0x53e0ba(0x21d)]['Game_Interpreter_command122'][_0x53e0ba(0x8eb)](this,_0x5e1b04);}catch(_0x7f8a5e){$gameTemp['isPlaytest']()&&(console['log']('Control\x20Variables\x20Script\x20Error'),console[_0x53e0ba(0x1b1)](_0x7f8a5e));}return!![];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x714)]=Game_Interpreter[_0x17407e(0x374)]['command355'],Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x489)]=function(){const _0x33608a=_0x17407e;try{VisuMZ[_0x33608a(0x21d)][_0x33608a(0x714)][_0x33608a(0x8eb)](this);}catch(_0x4dcc28){$gameTemp[_0x33608a(0x3a3)]()&&(console[_0x33608a(0x1b1)]('Script\x20Call\x20Error'),console[_0x33608a(0x1b1)](_0x4dcc28));}return!![];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x99b)]=Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x49f)],Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x49f)]=function(_0x2ba138){const _0xb9bec8=_0x17407e;return $gameTemp[_0xb9bec8(0x4e7)](this),VisuMZ[_0xb9bec8(0x21d)][_0xb9bec8(0x99b)][_0xb9bec8(0x8eb)](this,_0x2ba138);},Scene_Base[_0x17407e(0x374)][_0x17407e(0x8ac)]=function(){const _0x5b76dc=_0x17407e;return VisuMZ[_0x5b76dc(0x21d)]['Settings']['UI'][_0x5b76dc(0x3de)];},Scene_Base[_0x17407e(0x374)][_0x17407e(0x953)]=function(){const _0x59af1b=_0x17407e;return VisuMZ[_0x59af1b(0x21d)][_0x59af1b(0x5cb)]['UI'][_0x59af1b(0x73b)];},Scene_Base['prototype']['isBottomButtonMode']=function(){const _0x273578=_0x17407e;return VisuMZ['CoreEngine'][_0x273578(0x5cb)]['UI']['BottomButtons'];},Scene_Base[_0x17407e(0x374)][_0x17407e(0x425)]=function(){const _0x2c9847=_0x17407e;return VisuMZ['CoreEngine'][_0x2c9847(0x5cb)]['UI'][_0x2c9847(0x74a)];},Scene_Base[_0x17407e(0x374)][_0x17407e(0x1cc)]=function(){const _0x5daa1b=_0x17407e;return VisuMZ[_0x5daa1b(0x21d)]['Settings']['UI']['CommandWidth'];},Scene_Base[_0x17407e(0x374)]['buttonAreaHeight']=function(){const _0x4cb471=_0x17407e;return VisuMZ['CoreEngine'][_0x4cb471(0x5cb)]['UI'][_0x4cb471(0x8c0)];},Scene_Base[_0x17407e(0x374)]['isWindowMaskingEnabled']=function(){const _0x4db2b2=_0x17407e;return VisuMZ['CoreEngine'][_0x4db2b2(0x5cb)][_0x4db2b2(0x685)]['EnableMasking'];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x620)]=Scene_Base[_0x17407e(0x374)][_0x17407e(0x575)],Scene_Base['prototype'][_0x17407e(0x575)]=function(){const _0x1002dd=_0x17407e;VisuMZ['CoreEngine'][_0x1002dd(0x620)][_0x1002dd(0x8eb)](this),this[_0x1002dd(0x22c)](),this['_windowLayer']['x']=Math[_0x1002dd(0x909)](this['_windowLayer']['x']),this[_0x1002dd(0x48e)]['y']=Math[_0x1002dd(0x909)](this[_0x1002dd(0x48e)]['y']);},Scene_Base['prototype']['createButtonAssistWindow']=function(){},Scene_Base[_0x17407e(0x374)]['buttonAssistKey1']=function(){const _0xcc8ace=_0x17407e;return TextManager[_0xcc8ace(0x811)]('pageup',_0xcc8ace(0x52c));},Scene_Base[_0x17407e(0x374)][_0x17407e(0x658)]=function(){const _0x36b886=_0x17407e;return TextManager[_0x36b886(0x2c4)](_0x36b886(0x804));},Scene_Base[_0x17407e(0x374)]['buttonAssistKey3']=function(){const _0x65320e=_0x17407e;return TextManager[_0x65320e(0x2c4)](_0x65320e(0x588));},Scene_Base[_0x17407e(0x374)]['buttonAssistKey4']=function(){const _0x4884e8=_0x17407e;return TextManager[_0x4884e8(0x2c4)]('ok');},Scene_Base[_0x17407e(0x374)][_0x17407e(0x43b)]=function(){const _0x54bf6c=_0x17407e;return TextManager[_0x54bf6c(0x2c4)]('cancel');},Scene_Base['prototype'][_0x17407e(0x4f0)]=function(){const _0x482e8e=_0x17407e;if(this['_pageupButton']&&this[_0x482e8e(0x8e1)]['visible']){if(_0x482e8e(0x1ab)!==_0x482e8e(0x1ab))_0x77b6cf['scaleMode']=_0x2f1575[_0x482e8e(0x966)]['NEAREST'];else return TextManager[_0x482e8e(0x611)];}else{if(_0x482e8e(0x1eb)!=='FBKgY')return'';else _0xa471ee+=_0x3f8f91;}},Scene_Base[_0x17407e(0x374)][_0x17407e(0x790)]=function(){return'';},Scene_Base[_0x17407e(0x374)][_0x17407e(0x9b2)]=function(){return'';},Scene_Base[_0x17407e(0x374)][_0x17407e(0x977)]=function(){const _0x34c625=_0x17407e;return TextManager[_0x34c625(0x4c1)];},Scene_Base['prototype'][_0x17407e(0x79a)]=function(){const _0x1fe85f=_0x17407e;return TextManager[_0x1fe85f(0x4ac)];},Scene_Base['prototype'][_0x17407e(0x684)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x17407e(0x374)][_0x17407e(0x49b)]=function(){return 0x0;},Scene_Base['prototype'][_0x17407e(0x733)]=function(){return 0x0;},Scene_Base['prototype'][_0x17407e(0x848)]=function(){return 0x0;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x278)]=Scene_Boot['prototype'][_0x17407e(0x77a)],Scene_Boot[_0x17407e(0x374)][_0x17407e(0x77a)]=function(){const _0x45a0f3=_0x17407e;VisuMZ[_0x45a0f3(0x21d)]['Scene_Boot_loadSystemImages'][_0x45a0f3(0x8eb)](this),this[_0x45a0f3(0x72b)]();},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x72b)]=function(){const _0x40036c=_0x17407e,_0x2b92bd=[_0x40036c(0x5dd),_0x40036c(0x31c),_0x40036c(0x2c1),_0x40036c(0x77b),_0x40036c(0x98c),_0x40036c(0x5a8),'parallaxes',_0x40036c(0x61e),'sv_actors',_0x40036c(0x3d0),_0x40036c(0x67f),_0x40036c(0x6ef),_0x40036c(0x417),'titles2'];for(const _0x11b46f of _0x2b92bd){if(_0x40036c(0x5d7)===_0x40036c(0x9bc))return _0x40036c(0x582);else{const _0x26b6b6=VisuMZ['CoreEngine']['Settings'][_0x40036c(0x553)][_0x11b46f],_0x20d5ef=_0x40036c(0x5f5)['format'](_0x11b46f);for(const _0x852fbc of _0x26b6b6){ImageManager[_0x40036c(0x854)](_0x20d5ef,_0x852fbc);}}}},VisuMZ['CoreEngine'][_0x17407e(0x6fe)]=Scene_Boot['prototype'][_0x17407e(0x7a0)],Scene_Boot['prototype'][_0x17407e(0x7a0)]=function(){const _0x48ff5f=_0x17407e;if(Utils[_0x48ff5f(0x21a)]('test')&&VisuMZ[_0x48ff5f(0x21d)][_0x48ff5f(0x5cb)][_0x48ff5f(0x7e8)][_0x48ff5f(0x356)]){if(_0x48ff5f(0x93f)==='xocPA'){const _0x46feda=_0x48ff5f(0x7ec)[_0x48ff5f(0x4eb)](_0x5d400f[_0x48ff5f(0x1fc)](0x3)),_0x24df7d=new _0x1cfa16(),_0x324bdb=_0x48ff5f(0x297)+_0x46feda;_0x24df7d[_0x48ff5f(0x76d)](_0x48ff5f(0x7f4),_0x324bdb),_0x24df7d[_0x48ff5f(0x7c5)](_0x48ff5f(0x35b)),_0x24df7d[_0x48ff5f(0x561)]=()=>this[_0x48ff5f(0x877)](_0x24df7d,_0x105dec,_0x46feda,_0x324bdb),_0x24df7d[_0x48ff5f(0x26c)]=()=>_0x18926f[_0x48ff5f(0x6e8)](_0x48ff5f(0x218),_0x46feda,_0x324bdb),_0x24df7d[_0x48ff5f(0x3e8)]();}else this['startAutoNewGame']();}else VisuMZ[_0x48ff5f(0x21d)][_0x48ff5f(0x6fe)]['call'](this);},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x5a0)]=function(){DataManager['setupNewGame'](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x7a2)]=function(){const _0x35d553=_0x17407e,_0xc7ee87=$dataSystem[_0x35d553(0x90a)][_0x35d553(0x4e0)],_0x1aee95=$dataSystem['advanced'][_0x35d553(0x835)],_0x426ea6=VisuMZ[_0x35d553(0x21d)][_0x35d553(0x5cb)]['UI'][_0x35d553(0x329)];Graphics[_0x35d553(0x937)]=_0xc7ee87-_0x426ea6*0x2,Graphics[_0x35d553(0x528)]=_0x1aee95-_0x426ea6*0x2,this[_0x35d553(0x6c2)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x61d)]=Scene_Boot[_0x17407e(0x374)][_0x17407e(0x32e)],Scene_Boot[_0x17407e(0x374)]['updateDocumentTitle']=function(){const _0xdc0196=_0x17407e;if(this['isFullDocumentTitle']())this['makeDocumentTitle']();else{if(_0xdc0196(0x6b1)!==_0xdc0196(0x6b1)){if(_0x2025aa[_0xdc0196(0x3a3)]()){const _0x300d3e=_0x2e457c['CoreEngine'][_0xdc0196(0x5cb)][_0xdc0196(0x7e8)][_0xdc0196(0x4fe)];if(_0x300d3e>0x0)_0x55af9f['reserveCommonEvent'](_0x300d3e);}}else VisuMZ['CoreEngine'][_0xdc0196(0x61d)]['call'](this);}},Scene_Boot[_0x17407e(0x374)]['isFullDocumentTitle']=function(){const _0x3988b7=_0x17407e;if(Scene_Title[_0x3988b7(0x30b)]==='')return![];if(Scene_Title[_0x3988b7(0x30b)]===_0x3988b7(0x7a1))return![];if(Scene_Title[_0x3988b7(0x3b9)]==='')return![];if(Scene_Title[_0x3988b7(0x3b9)]===_0x3988b7(0x750))return![];return!![];},Scene_Boot['prototype'][_0x17407e(0x828)]=function(){const _0x12e0d5=_0x17407e,_0x3caa5e=$dataSystem[_0x12e0d5(0x719)],_0x45dd6a=Scene_Title[_0x12e0d5(0x30b)]||'',_0x13684a=Scene_Title[_0x12e0d5(0x3b9)]||'',_0x4cfb29=VisuMZ[_0x12e0d5(0x21d)][_0x12e0d5(0x5cb)][_0x12e0d5(0x65b)][_0x12e0d5(0x48d)]['DocumentTitleFmt'],_0x531a1d=_0x4cfb29[_0x12e0d5(0x4eb)](_0x3caa5e,_0x45dd6a,_0x13684a);document[_0x12e0d5(0x891)]=_0x531a1d;},Scene_Boot[_0x17407e(0x374)][_0x17407e(0x6c2)]=function(){const _0x2d88ff=_0x17407e;if(VisuMZ['CoreEngine'][_0x2d88ff(0x5cb)]['UI'][_0x2d88ff(0x845)]){if(_0x2d88ff(0x713)!==_0x2d88ff(0x75e)){const _0x20eaa1=Graphics[_0x2d88ff(0x2b6)]-Graphics['boxWidth']-VisuMZ[_0x2d88ff(0x21d)][_0x2d88ff(0x5cb)]['UI'][_0x2d88ff(0x329)]*0x2,_0x33554f=Sprite_Button['prototype']['blockWidth'][_0x2d88ff(0x8eb)](this)*0x4;if(_0x20eaa1>=_0x33554f)SceneManager[_0x2d88ff(0x5ff)](!![]);}else this[_0x2d88ff(0x33f)][_0x2d88ff(0x3c0)](_0x58ee76['layoutSettings']['CategoryBgType']);}},Scene_Title[_0x17407e(0x30b)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)]['Title'][_0x17407e(0x7a1)],Scene_Title[_0x17407e(0x3b9)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)]['Title'][_0x17407e(0x6f8)],Scene_Title[_0x17407e(0x990)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x5c7)],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x616)]=Scene_Title[_0x17407e(0x374)]['drawGameTitle'],Scene_Title['prototype'][_0x17407e(0x5c5)]=function(){const _0xca0455=_0x17407e;VisuMZ[_0xca0455(0x21d)][_0xca0455(0x5cb)][_0xca0455(0x65b)]['Title'][_0xca0455(0x5c5)][_0xca0455(0x8eb)](this);if(Scene_Title[_0xca0455(0x30b)]!==''&&Scene_Title[_0xca0455(0x30b)]!==_0xca0455(0x7a1))this[_0xca0455(0x632)]();if(Scene_Title[_0xca0455(0x3b9)]!==''&&Scene_Title['version']!==_0xca0455(0x750))this['drawGameVersion']();},Scene_Title[_0x17407e(0x374)][_0x17407e(0x632)]=function(){const _0x5614f6=_0x17407e;VisuMZ['CoreEngine'][_0x5614f6(0x5cb)][_0x5614f6(0x65b)][_0x5614f6(0x48d)]['drawGameSubtitle']['call'](this);},Scene_Title[_0x17407e(0x374)][_0x17407e(0x4a9)]=function(){const _0x28fd22=_0x17407e;VisuMZ[_0x28fd22(0x21d)]['Settings'][_0x28fd22(0x65b)]['Title'][_0x28fd22(0x4a9)][_0x28fd22(0x8eb)](this);},Scene_Title[_0x17407e(0x374)][_0x17407e(0x3bd)]=function(){const _0x18e314=_0x17407e;this[_0x18e314(0x825)]();const _0x4c6c2b=$dataSystem['titleCommandWindow']['background'],_0x48fb68=this['commandWindowRect']();this[_0x18e314(0x4da)]=new Window_TitleCommand(_0x48fb68),this['_commandWindow'][_0x18e314(0x3c0)](_0x4c6c2b);const _0x5174e1=this['commandWindowRect']();this['_commandWindow']['move'](_0x5174e1['x'],_0x5174e1['y'],_0x5174e1[_0x18e314(0x2b6)],_0x5174e1['height']),this[_0x18e314(0x289)](this[_0x18e314(0x4da)]);},Scene_Title[_0x17407e(0x374)][_0x17407e(0x272)]=function(){const _0x493dcd=_0x17407e;if(this[_0x493dcd(0x4da)])return this[_0x493dcd(0x4da)][_0x493dcd(0x717)]();else{if('FKQbe'===_0x493dcd(0x840))return VisuMZ[_0x493dcd(0x21d)][_0x493dcd(0x5cb)][_0x493dcd(0x902)][_0x493dcd(0x62d)];else _0xcd442b['CoreEngine'][_0x493dcd(0x1d4)][_0x493dcd(0x8eb)](this),this[_0x493dcd(0x436)]();}},Scene_Title['prototype'][_0x17407e(0x493)]=function(){const _0x5ba79c=_0x17407e;return VisuMZ[_0x5ba79c(0x21d)]['Settings'][_0x5ba79c(0x65b)][_0x5ba79c(0x48d)][_0x5ba79c(0x694)]['call'](this);},Scene_Title['prototype'][_0x17407e(0x825)]=function(){const _0x4e45c0=_0x17407e;for(const _0x179254 of Scene_Title[_0x4e45c0(0x990)]){const _0x5be0be=new Sprite_TitlePictureButton(_0x179254);this[_0x4e45c0(0x809)](_0x5be0be);}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x6d1)]=Scene_Map[_0x17407e(0x374)][_0x17407e(0x829)],Scene_Map['prototype'][_0x17407e(0x829)]=function(){const _0x379ebc=_0x17407e;VisuMZ[_0x379ebc(0x21d)][_0x379ebc(0x6d1)][_0x379ebc(0x8eb)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x379ebc(0x808)]();},VisuMZ['CoreEngine'][_0x17407e(0x77c)]=Scene_Map[_0x17407e(0x374)][_0x17407e(0x64a)],Scene_Map[_0x17407e(0x374)][_0x17407e(0x64a)]=function(){const _0x497af9=_0x17407e;VisuMZ[_0x497af9(0x21d)]['Scene_Map_updateMainMultiply'][_0x497af9(0x8eb)](this);if($gameTemp[_0x497af9(0x2c3)]&&!$gameMessage['isBusy']()){if(_0x497af9(0x731)===_0x497af9(0x807))return _0x450074[_0x497af9(0x21d)][_0x497af9(0x5cb)]['QoL']['AccuracyBoost']&&_0x4e1a3f[_0x497af9(0x6f5)]()?_0x5b475d['eva']-0.05:_0xf8321b[_0x497af9(0x39a)];else this['updateMain'](),SceneManager['updateEffekseer']();}},Scene_Map['prototype'][_0x17407e(0x687)]=function(){const _0x2a2869=_0x17407e;Scene_Message[_0x2a2869(0x374)][_0x2a2869(0x687)][_0x2a2869(0x8eb)](this),!SceneManager[_0x2a2869(0x821)](Scene_Battle)&&(this['_spriteset']['update'](),this[_0x2a2869(0x533)]['hide'](),this[_0x2a2869(0x48e)]['visible']=![],SceneManager[_0x2a2869(0x593)]()),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x928)]=Scene_Map[_0x17407e(0x374)]['createMenuButton'],Scene_Map[_0x17407e(0x374)][_0x17407e(0x8b1)]=function(){const _0x16cf1b=_0x17407e;VisuMZ[_0x16cf1b(0x21d)][_0x16cf1b(0x928)][_0x16cf1b(0x8eb)](this),SceneManager[_0x16cf1b(0x6a3)]()&&this[_0x16cf1b(0x490)]();},Scene_Map[_0x17407e(0x374)]['moveMenuButtonSideButtonLayout']=function(){const _0x168a03=_0x17407e;this[_0x168a03(0x2d2)]['x']=Graphics[_0x168a03(0x937)]+0x4;},VisuMZ[_0x17407e(0x21d)]['Scene_Map_updateScene']=Scene_Map[_0x17407e(0x374)]['updateScene'],Scene_Map[_0x17407e(0x374)][_0x17407e(0x2c0)]=function(){const _0x131a9d=_0x17407e;VisuMZ[_0x131a9d(0x21d)][_0x131a9d(0x7e1)][_0x131a9d(0x8eb)](this),this['updateDashToggle']();},Scene_Map[_0x17407e(0x374)][_0x17407e(0x82e)]=function(){const _0x4816fc=_0x17407e;Input[_0x4816fc(0x7cd)](_0x4816fc(0x51c))&&('OkgRz'===_0x4816fc(0x634)?(ConfigManager[_0x4816fc(0x28a)]=!ConfigManager[_0x4816fc(0x28a)],ConfigManager[_0x4816fc(0x9ba)]()):(this[_0x4816fc(0x843)]=new _0x295198(_0x166f4f['loadTitle1'](_0x12d3ba[_0x4816fc(0x33d)])),this['_backSprite2']=new _0x39aeb0(_0x2af5a5[_0x4816fc(0x423)](_0x1e5915['BgFilename2'])),this[_0x4816fc(0x809)](this[_0x4816fc(0x843)]),this[_0x4816fc(0x809)](this[_0x4816fc(0x45b)]),this[_0x4816fc(0x843)][_0x4816fc(0x424)][_0x4816fc(0x686)](this[_0x4816fc(0x73e)][_0x4816fc(0x9b5)](this,this[_0x4816fc(0x843)])),this[_0x4816fc(0x45b)]['bitmap'][_0x4816fc(0x686)](this[_0x4816fc(0x73e)][_0x4816fc(0x9b5)](this,this['_backSprite2']))));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x7fe)]=Scene_Map['prototype'][_0x17407e(0x2ca)],Scene_Map[_0x17407e(0x374)][_0x17407e(0x2ca)]=function(){const _0xb19dee=_0x17407e;VisuMZ[_0xb19dee(0x21d)][_0xb19dee(0x7fe)]['call'](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x17407e(0x374)][_0x17407e(0x808)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x17407e(0x374)][_0x17407e(0x3fc)]=function(){const _0x480de5=_0x17407e;if(!this[_0x480de5(0x1ed)])return;for(const _0x49fdb6 of this[_0x480de5(0x1ed)]){_0x480de5(0x222)!==_0x480de5(0x222)?this[_0x480de5(0x831)]():_0x49fdb6&&_0x49fdb6[_0x480de5(0x8dc)]();}},Scene_Map[_0x17407e(0x374)][_0x17407e(0x1e8)]=function(_0x5c837b){const _0x2d5113=_0x17407e,_0x5a9673=$dataCommonEvents[_0x5c837b];if(!_0x5a9673)return;const _0x555c96=new Game_OnceParallelInterpreter();this[_0x2d5113(0x4c0)](_0x555c96),_0x555c96[_0x2d5113(0x7b5)](_0x5c837b);},Scene_Map[_0x17407e(0x374)][_0x17407e(0x4c0)]=function(_0x3d6efe){const _0x5892bf=_0x17407e;this[_0x5892bf(0x1ed)]=this[_0x5892bf(0x1ed)]||[],this['_onceParallelInterpreters'][_0x5892bf(0x2b7)](_0x3d6efe);},Scene_Map[_0x17407e(0x374)][_0x17407e(0x34f)]=function(_0x354ad4){const _0x3a3a56=_0x17407e;this[_0x3a3a56(0x1ed)]=this[_0x3a3a56(0x1ed)]||[],this[_0x3a3a56(0x1ed)][_0x3a3a56(0x2d3)](_0x354ad4);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter[_0x17407e(0x374)]=Object[_0x17407e(0x56c)](Game_Interpreter[_0x17407e(0x374)]),Game_OnceParallelInterpreter[_0x17407e(0x374)][_0x17407e(0x2ea)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x17407e(0x374)][_0x17407e(0x7b5)]=function(_0x815ac6){const _0xd1076e=_0x17407e,_0x59b8f4=$dataCommonEvents[_0x815ac6];_0x59b8f4?'WDdms'!==_0xd1076e(0x97e)?_0x4afe88[_0xd1076e(0x539)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x462f80[_0xd1076e(0x1f5)]=_0x83339e[_0xd1076e(0x531)](_0x357f92(_0x2b5736['$1']),0x1)):this[_0xd1076e(0x744)](_0x59b8f4[_0xd1076e(0x839)],0x0):this[_0xd1076e(0x687)]();},Game_OnceParallelInterpreter[_0x17407e(0x374)][_0x17407e(0x687)]=function(){const _0x2e20d1=_0x17407e;if(!SceneManager[_0x2e20d1(0x82c)]())return;SceneManager['_scene'][_0x2e20d1(0x34f)](this),Game_Interpreter['prototype'][_0x2e20d1(0x687)][_0x2e20d1(0x8eb)](this);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x690)]=Scene_MenuBase['prototype'][_0x17407e(0x507)],Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x507)]=function(){const _0x29f26e=_0x17407e;let _0x3f9adc=0x0;return SceneManager[_0x29f26e(0x21c)]()?_0x3f9adc=this[_0x29f26e(0x8fa)]():_0x3f9adc=VisuMZ[_0x29f26e(0x21d)]['Scene_MenuBase_helpAreaTop']['call'](this),this['isMenuButtonAssistEnabled']()&&this[_0x29f26e(0x380)]()===_0x29f26e(0x41f)&&(_0x29f26e(0x6db)===_0x29f26e(0x443)?(this[_0x29f26e(0x6ea)]=![],this['_hideButtons']=!_0x2b91ad[_0x29f26e(0x21d)]['Settings']['UI'][_0x29f26e(0x7f1)]):_0x3f9adc+=Window_ButtonAssist[_0x29f26e(0x374)][_0x29f26e(0x8af)]()),_0x3f9adc;},Scene_MenuBase[_0x17407e(0x374)]['helpAreaTopSideButtonLayout']=function(){const _0x4b5440=_0x17407e;return this[_0x4b5440(0x953)]()?this[_0x4b5440(0x9b4)]():0x0;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x2ad)]=Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x257)],Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x257)]=function(){const _0x5ecaac=_0x17407e;if(SceneManager[_0x5ecaac(0x21c)]())return this[_0x5ecaac(0x71e)]();else{if('hKLOd'==='KiXIn'){const _0x3a4de9=_0x33f2e0[_0x5ecaac(0x3c6)](_0x4730c3);_0xa04a15[_0x5ecaac(0x61a)](_0x5b8ee6,!_0x3a4de9);}else return VisuMZ[_0x5ecaac(0x21d)][_0x5ecaac(0x2ad)][_0x5ecaac(0x8eb)](this);}},Scene_MenuBase[_0x17407e(0x374)]['mainAreaTopSideButtonLayout']=function(){const _0x368d4e=_0x17407e;if(!this[_0x368d4e(0x953)]())return this['helpAreaBottom']();else{if(_0x368d4e(0x93c)!==_0x368d4e(0x2b4))return 0x0;else this['anchor']['x']=_0x19a251[_0x368d4e(0x466)]()['x'],this[_0x368d4e(0x466)]['y']=_0x46f952[_0x368d4e(0x466)]()['y'];}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x898)]=Scene_MenuBase['prototype']['mainAreaHeight'],Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x3ae)]=function(){const _0x24d564=_0x17407e;let _0x28fa71=0x0;if(SceneManager[_0x24d564(0x21c)]())_0x28fa71=this[_0x24d564(0x98f)]();else{if(_0x24d564(0x2f9)==='ITWsf'){if(_0x4a85db===_0xe072bd&&_0x4727e6%0x1===0x0)return _0x2586d0;if(_0x19c622!==_0x33476f&&[_0x24d564(0x69e),_0x24d564(0x4a8),_0x24d564(0x6a7),_0x24d564(0x6b0),'MAT','MDF','AGI',_0x24d564(0x478)][_0x24d564(0x25d)](_0x289148(_0x509ff3)[_0x24d564(0x99a)]()[_0x24d564(0x846)]()))return _0xb2fcd;_0x3579ca=_0x4aec||0x0;if(_0x13410e[_0x24d564(0x21d)][_0x24d564(0x3a9)][_0x3cab2a])return _0x5dcb74[_0x24d564(0x21d)][_0x24d564(0x234)][_0x1ed179]===_0x24d564(0x1f3)?_0x2af166:_0x207e61((_0x37022f*0x64)[_0x24d564(0x403)](_0x10c2ba))+'%';return _0xe253b9((_0x3b2878*0x64)[_0x24d564(0x403)](_0x7fe9f))+'%';}else _0x28fa71=VisuMZ[_0x24d564(0x21d)][_0x24d564(0x898)][_0x24d564(0x8eb)](this);}return this[_0x24d564(0x1d5)]()&&this['getButtonAssistLocation']()!==_0x24d564(0x8f7)&&(_0x24d564(0x47b)!==_0x24d564(0x47b)?_0x4a100d*=_0x37a76f(_0xcdcde0):_0x28fa71-=Window_ButtonAssist['prototype']['lineHeight']()),_0x28fa71;},Scene_MenuBase['prototype'][_0x17407e(0x98f)]=function(){const _0x306419=_0x17407e;return Graphics[_0x306419(0x528)]-this[_0x306419(0x51f)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x59d)]=Scene_MenuBase[_0x17407e(0x374)]['createBackground'],Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x28f)]=function(){const _0x1c7a2e=_0x17407e;this[_0x1c7a2e(0x1ba)]=new PIXI[(_0x1c7a2e(0x520))]['BlurFilter'](clamp=!![]),this[_0x1c7a2e(0x8a3)]=new Sprite(),this[_0x1c7a2e(0x8a3)][_0x1c7a2e(0x424)]=SceneManager['backgroundBitmap'](),this[_0x1c7a2e(0x8a3)]['filters']=[this[_0x1c7a2e(0x1ba)]],this['addChild'](this[_0x1c7a2e(0x8a3)]),this[_0x1c7a2e(0x6d9)](0xc0),this[_0x1c7a2e(0x6d9)](this[_0x1c7a2e(0x2cc)]()),this[_0x1c7a2e(0x2e4)]();},Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x2cc)]=function(){const _0x38e2ae=_0x17407e,_0x57ec9a=String(this[_0x38e2ae(0x2ea)]['name']),_0x5d4d5c=this[_0x38e2ae(0x81d)](_0x57ec9a);return _0x5d4d5c?_0x5d4d5c['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype']['createCustomBackgroundImages']=function(){const _0x5a58fe=_0x17407e,_0x1ed7e1=String(this[_0x5a58fe(0x2ea)]['name']),_0x2ce971=this[_0x5a58fe(0x81d)](_0x1ed7e1);_0x2ce971&&(_0x2ce971[_0x5a58fe(0x33d)]!==''||_0x2ce971[_0x5a58fe(0x40e)]!=='')&&(this[_0x5a58fe(0x843)]=new Sprite(ImageManager[_0x5a58fe(0x923)](_0x2ce971[_0x5a58fe(0x33d)])),this[_0x5a58fe(0x45b)]=new Sprite(ImageManager[_0x5a58fe(0x423)](_0x2ce971[_0x5a58fe(0x40e)])),this[_0x5a58fe(0x809)](this[_0x5a58fe(0x843)]),this['addChild'](this[_0x5a58fe(0x45b)]),this['_backSprite1'][_0x5a58fe(0x424)][_0x5a58fe(0x686)](this[_0x5a58fe(0x73e)][_0x5a58fe(0x9b5)](this,this[_0x5a58fe(0x843)])),this['_backSprite2']['bitmap']['addLoadListener'](this[_0x5a58fe(0x73e)]['bind'](this,this[_0x5a58fe(0x45b)])));},Scene_MenuBase[_0x17407e(0x374)]['getCustomBackgroundSettings']=function(_0x477aff){const _0x47bc2a=_0x17407e;return VisuMZ[_0x47bc2a(0x21d)]['Settings']['MenuBg'][_0x477aff]||VisuMZ[_0x47bc2a(0x21d)]['Settings']['MenuBg'][_0x47bc2a(0x822)];},Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x73e)]=function(_0x9f62c5){const _0x57c63b=_0x17407e;this[_0x57c63b(0x67e)](_0x9f62c5),this[_0x57c63b(0x99c)](_0x9f62c5);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x888)]=Scene_MenuBase[_0x17407e(0x374)]['createCancelButton'],Scene_MenuBase[_0x17407e(0x374)]['createCancelButton']=function(){const _0x593e54=_0x17407e;VisuMZ['CoreEngine'][_0x593e54(0x888)]['call'](this),SceneManager[_0x593e54(0x6a3)]()&&(_0x593e54(0x98a)!==_0x593e54(0x52a)?this['moveCancelButtonSideButtonLayout']():(this[_0x593e54(0x5c1)]&&this[_0x593e54(0x5c1)][_0x593e54(0x3c0)](_0x362a23[_0x593e54(0x7e0)][_0x593e54(0x351)]),this[_0x593e54(0x27a)]&&this['_listWindow'][_0x593e54(0x3c0)](_0x40fbbe[_0x593e54(0x7e0)]['ListBgType'])));},Scene_MenuBase[_0x17407e(0x374)]['moveCancelButtonSideButtonLayout']=function(){const _0x25bdf1=_0x17407e;this[_0x25bdf1(0x88a)]['x']=Graphics[_0x25bdf1(0x937)]+0x4;},VisuMZ['CoreEngine'][_0x17407e(0x6f7)]=Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x79c)],Scene_MenuBase['prototype'][_0x17407e(0x79c)]=function(){const _0x1fb00c=_0x17407e;VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons'][_0x1fb00c(0x8eb)](this),SceneManager[_0x1fb00c(0x6a3)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x17407e(0x374)]['movePageButtonSideButtonLayout']=function(){const _0x1b2365=_0x17407e;this[_0x1b2365(0x8e1)]['x']=-0x1*(this[_0x1b2365(0x8e1)][_0x1b2365(0x2b6)]+this['_pagedownButton'][_0x1b2365(0x2b6)]+0x8),this[_0x1b2365(0x2b2)]['x']=-0x1*(this[_0x1b2365(0x2b2)][_0x1b2365(0x2b6)]+0x4);},Scene_MenuBase['prototype'][_0x17407e(0x1d5)]=function(){const _0x2fa286=_0x17407e;return VisuMZ[_0x2fa286(0x21d)][_0x2fa286(0x5cb)][_0x2fa286(0x963)]['Enable'];},Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x380)]=function(){const _0x504b59=_0x17407e;if(SceneManager['isSideButtonLayout']()||SceneManager['areButtonsHidden']())return VisuMZ['CoreEngine'][_0x504b59(0x5cb)][_0x504b59(0x963)][_0x504b59(0x311)];else{if(_0x504b59(0x767)!==_0x504b59(0x4a1))return'button';else _0x2f45f9['_pictureCoordinatesMode']=_0x534454,_0x43dbbc[_0x504b59(0x938)](),_0x43bb7f[_0x504b59(0x938)]();}},Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x22c)]=function(){const _0xd7f7e=_0x17407e;if(!this[_0xd7f7e(0x1d5)]())return;const _0x477e41=this['buttonAssistWindowRect']();this[_0xd7f7e(0x255)]=new Window_ButtonAssist(_0x477e41),this['addWindow'](this[_0xd7f7e(0x255)]);},Scene_MenuBase[_0x17407e(0x374)][_0x17407e(0x327)]=function(){const _0x595bf2=_0x17407e;if(this['getButtonAssistLocation']()===_0x595bf2(0x8f7))return this['buttonAssistWindowButtonRect']();else{if(_0x595bf2(0x22b)!==_0x595bf2(0x95b))return this['buttonAssistWindowSideRect']();else this['repositionCancelButtonSideButtonLayout']();}},Scene_MenuBase['prototype'][_0x17407e(0x615)]=function(){const _0x3ad26d=_0x17407e,_0xd4682b=ConfigManager[_0x3ad26d(0x50f)]?(Sprite_Button[_0x3ad26d(0x374)][_0x3ad26d(0x7ad)]()+0x6)*0x2:0x0,_0x1f6efc=this['buttonY'](),_0x43843c=Graphics[_0x3ad26d(0x937)]-_0xd4682b*0x2,_0x812280=this[_0x3ad26d(0x7d3)]();return new Rectangle(_0xd4682b,_0x1f6efc,_0x43843c,_0x812280);},Scene_MenuBase[_0x17407e(0x374)]['buttonAssistWindowSideRect']=function(){const _0x4b7d59=_0x17407e,_0x40ab64=Graphics[_0x4b7d59(0x937)],_0x149058=Window_ButtonAssist[_0x4b7d59(0x374)][_0x4b7d59(0x8af)](),_0x1f3c16=0x0;let _0x5aa56e=0x0;if(this[_0x4b7d59(0x380)]()===_0x4b7d59(0x41f))_0x5aa56e=0x0;else{if(_0x4b7d59(0x353)===_0x4b7d59(0x644)){const _0xe8956=_0x4b7d59(0x941);this[_0x4b7d59(0x706)]=this[_0x4b7d59(0x706)]||{};if(this['_colorCache'][_0xe8956])return this['_colorCache'][_0xe8956];const _0x4bef5c=_0x3e4051['CoreEngine'][_0x4b7d59(0x5cb)]['Color'][_0x4b7d59(0x5d5)];return this[_0x4b7d59(0x92f)](_0xe8956,_0x4bef5c);}else _0x5aa56e=Graphics[_0x4b7d59(0x528)]-_0x149058;}return new Rectangle(_0x1f3c16,_0x5aa56e,_0x40ab64,_0x149058);},Scene_Menu[_0x17407e(0x7e0)]=VisuMZ['CoreEngine'][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x2be)],VisuMZ['CoreEngine'][_0x17407e(0x956)]=Scene_Menu['prototype'][_0x17407e(0x56c)],Scene_Menu[_0x17407e(0x374)]['create']=function(){const _0x45e636=_0x17407e;VisuMZ[_0x45e636(0x21d)][_0x45e636(0x956)][_0x45e636(0x8eb)](this),this[_0x45e636(0x436)]();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x30d036=_0x17407e;this[_0x30d036(0x4da)]&&this['_commandWindow'][_0x30d036(0x3c0)](Scene_Menu[_0x30d036(0x7e0)]['CommandBgType']),this['_goldWindow']&&this[_0x30d036(0x461)][_0x30d036(0x3c0)](Scene_Menu[_0x30d036(0x7e0)][_0x30d036(0x41b)]),this[_0x30d036(0x8b4)]&&this[_0x30d036(0x8b4)][_0x30d036(0x3c0)](Scene_Menu[_0x30d036(0x7e0)][_0x30d036(0x8c3)]);},Scene_Menu['prototype'][_0x17407e(0x493)]=function(){const _0x7aeb7d=_0x17407e;return Scene_Menu[_0x7aeb7d(0x7e0)]['CommandRect'][_0x7aeb7d(0x8eb)](this);},Scene_Menu[_0x17407e(0x374)][_0x17407e(0x29b)]=function(){const _0x107d17=_0x17407e;return Scene_Menu[_0x107d17(0x7e0)][_0x107d17(0x204)][_0x107d17(0x8eb)](this);},Scene_Menu[_0x17407e(0x374)]['statusWindowRect']=function(){const _0x37fb3a=_0x17407e;return Scene_Menu[_0x37fb3a(0x7e0)]['StatusRect'][_0x37fb3a(0x8eb)](this);},Scene_Item[_0x17407e(0x7e0)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)]['MenuLayout'][_0x17407e(0x7a9)],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5c2)]=Scene_Item[_0x17407e(0x374)][_0x17407e(0x56c)],Scene_Item[_0x17407e(0x374)]['create']=function(){const _0x5cd77c=_0x17407e;VisuMZ[_0x5cd77c(0x21d)][_0x5cd77c(0x5c2)][_0x5cd77c(0x8eb)](this),this[_0x5cd77c(0x436)]();},Scene_Item[_0x17407e(0x374)][_0x17407e(0x436)]=function(){const _0x3fd9f8=_0x17407e;this[_0x3fd9f8(0x5c1)]&&this['_helpWindow']['setBackgroundType'](Scene_Item[_0x3fd9f8(0x7e0)][_0x3fd9f8(0x351)]);this[_0x3fd9f8(0x33f)]&&this[_0x3fd9f8(0x33f)]['setBackgroundType'](Scene_Item[_0x3fd9f8(0x7e0)][_0x3fd9f8(0x6f3)]);this[_0x3fd9f8(0x37f)]&&('KoWBC'===_0x3fd9f8(0x94f)?_0x4b628f[_0x3fd9f8(0x21d)]['Game_Interpreter_command111'][_0x3fd9f8(0x8eb)](this,_0x5eb419):this[_0x3fd9f8(0x37f)][_0x3fd9f8(0x3c0)](Scene_Item[_0x3fd9f8(0x7e0)][_0x3fd9f8(0x394)]));if(this[_0x3fd9f8(0x2ab)]){if(_0x3fd9f8(0x77f)!==_0x3fd9f8(0x77f))return this['refresh']();else this['_actorWindow'][_0x3fd9f8(0x3c0)](Scene_Item[_0x3fd9f8(0x7e0)]['ActorBgType']);}},Scene_Item[_0x17407e(0x374)]['helpWindowRect']=function(){const _0x2a76a1=_0x17407e;return Scene_Item[_0x2a76a1(0x7e0)][_0x2a76a1(0x69d)][_0x2a76a1(0x8eb)](this);},Scene_Item['prototype'][_0x17407e(0x283)]=function(){const _0x11fcb2=_0x17407e;return Scene_Item[_0x11fcb2(0x7e0)][_0x11fcb2(0x873)][_0x11fcb2(0x8eb)](this);},Scene_Item[_0x17407e(0x374)][_0x17407e(0x76b)]=function(){const _0x2a5881=_0x17407e;return Scene_Item[_0x2a5881(0x7e0)]['ItemRect'][_0x2a5881(0x8eb)](this);},Scene_Item['prototype'][_0x17407e(0x3cd)]=function(){const _0x58b291=_0x17407e;return Scene_Item[_0x58b291(0x7e0)]['ActorRect'][_0x58b291(0x8eb)](this);},Scene_Skill[_0x17407e(0x7e0)]=VisuMZ[_0x17407e(0x21d)]['Settings'][_0x17407e(0x65b)][_0x17407e(0x470)],VisuMZ[_0x17407e(0x21d)]['Scene_Skill_create']=Scene_Skill['prototype'][_0x17407e(0x56c)],Scene_Skill[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x34bfd0=_0x17407e;VisuMZ[_0x34bfd0(0x21d)][_0x34bfd0(0x7df)][_0x34bfd0(0x8eb)](this),this[_0x34bfd0(0x436)]();},Scene_Skill[_0x17407e(0x374)][_0x17407e(0x436)]=function(){const _0x5568b2=_0x17407e;this[_0x5568b2(0x5c1)]&&this[_0x5568b2(0x5c1)][_0x5568b2(0x3c0)](Scene_Skill[_0x5568b2(0x7e0)]['HelpBgType']),this[_0x5568b2(0x477)]&&this[_0x5568b2(0x477)][_0x5568b2(0x3c0)](Scene_Skill['layoutSettings'][_0x5568b2(0x363)]),this[_0x5568b2(0x8b4)]&&('wEnzQ'===_0x5568b2(0x27e)?this[_0x5568b2(0x270)](_0x3be0da,_0x89ced8,_0x58912e,_0x1fd5c7,_0x4f4bde):this[_0x5568b2(0x8b4)][_0x5568b2(0x3c0)](Scene_Skill[_0x5568b2(0x7e0)][_0x5568b2(0x8c3)])),this[_0x5568b2(0x37f)]&&this[_0x5568b2(0x37f)][_0x5568b2(0x3c0)](Scene_Skill['layoutSettings'][_0x5568b2(0x394)]),this[_0x5568b2(0x2ab)]&&this['_actorWindow']['setBackgroundType'](Scene_Skill[_0x5568b2(0x7e0)][_0x5568b2(0x1b9)]);},Scene_Skill[_0x17407e(0x374)][_0x17407e(0x4ad)]=function(){const _0x2ce942=_0x17407e;return Scene_Skill['layoutSettings'][_0x2ce942(0x69d)]['call'](this);},Scene_Skill[_0x17407e(0x374)][_0x17407e(0x414)]=function(){const _0x3607ee=_0x17407e;return Scene_Skill[_0x3607ee(0x7e0)][_0x3607ee(0x606)][_0x3607ee(0x8eb)](this);},Scene_Skill['prototype'][_0x17407e(0x6a9)]=function(){const _0x2be643=_0x17407e;return Scene_Skill[_0x2be643(0x7e0)]['StatusRect'][_0x2be643(0x8eb)](this);},Scene_Skill['prototype'][_0x17407e(0x76b)]=function(){const _0xe572c7=_0x17407e;return Scene_Skill[_0xe572c7(0x7e0)][_0xe572c7(0x303)]['call'](this);},Scene_Skill[_0x17407e(0x374)][_0x17407e(0x3cd)]=function(){const _0x140189=_0x17407e;return Scene_Skill[_0x140189(0x7e0)][_0x140189(0x4e3)]['call'](this);},Scene_Equip[_0x17407e(0x7e0)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x7f9)],VisuMZ[_0x17407e(0x21d)]['Scene_Equip_create']=Scene_Equip[_0x17407e(0x374)][_0x17407e(0x56c)],Scene_Equip[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x4cbd3b=_0x17407e;VisuMZ['CoreEngine'][_0x4cbd3b(0x282)]['call'](this),this[_0x4cbd3b(0x436)]();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x347163=_0x17407e;this['_helpWindow']&&this[_0x347163(0x5c1)][_0x347163(0x3c0)](Scene_Equip[_0x347163(0x7e0)][_0x347163(0x351)]);this[_0x347163(0x8b4)]&&this[_0x347163(0x8b4)]['setBackgroundType'](Scene_Equip[_0x347163(0x7e0)]['StatusBgType']);this[_0x347163(0x4da)]&&this[_0x347163(0x4da)][_0x347163(0x3c0)](Scene_Equip[_0x347163(0x7e0)][_0x347163(0x1d7)]);if(this[_0x347163(0x53b)]){if(_0x347163(0x563)===_0x347163(0x563))this[_0x347163(0x53b)][_0x347163(0x3c0)](Scene_Equip[_0x347163(0x7e0)]['SlotBgType']);else return this['_pageupButton']&&this[_0x347163(0x8e1)][_0x347163(0x558)]?_0x51a57f['buttonAssistSwitch']:'';}this[_0x347163(0x37f)]&&(_0x347163(0x2b1)!==_0x347163(0x67d)?this[_0x347163(0x37f)][_0x347163(0x3c0)](Scene_Equip[_0x347163(0x7e0)][_0x347163(0x394)]):(this[_0x347163(0x879)](),this[_0x347163(0x683)]()));},Scene_Equip['prototype'][_0x17407e(0x4ad)]=function(){const _0x56ac6e=_0x17407e;return Scene_Equip[_0x56ac6e(0x7e0)][_0x56ac6e(0x69d)][_0x56ac6e(0x8eb)](this);},Scene_Equip[_0x17407e(0x374)][_0x17407e(0x6a9)]=function(){const _0x56a448=_0x17407e;return Scene_Equip[_0x56a448(0x7e0)][_0x56a448(0x485)][_0x56a448(0x8eb)](this);},Scene_Equip[_0x17407e(0x374)][_0x17407e(0x493)]=function(){const _0xca0601=_0x17407e;return Scene_Equip['layoutSettings'][_0xca0601(0x694)][_0xca0601(0x8eb)](this);},Scene_Equip['prototype'][_0x17407e(0x33b)]=function(){const _0xb8ea89=_0x17407e;return Scene_Equip['layoutSettings'][_0xb8ea89(0x8f9)]['call'](this);},Scene_Equip[_0x17407e(0x374)]['itemWindowRect']=function(){const _0x36c401=_0x17407e;return Scene_Equip[_0x36c401(0x7e0)][_0x36c401(0x303)][_0x36c401(0x8eb)](this);},Scene_Status[_0x17407e(0x7e0)]=VisuMZ['CoreEngine'][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x538)],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x6b4)]=Scene_Status[_0x17407e(0x374)][_0x17407e(0x56c)],Scene_Status[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x4be4d4=_0x17407e;VisuMZ[_0x4be4d4(0x21d)][_0x4be4d4(0x6b4)]['call'](this),this[_0x4be4d4(0x436)]();},Scene_Status[_0x17407e(0x374)][_0x17407e(0x436)]=function(){const _0x44f87d=_0x17407e;this[_0x44f87d(0x552)]&&this['_profileWindow'][_0x44f87d(0x3c0)](Scene_Status[_0x44f87d(0x7e0)][_0x44f87d(0x562)]),this[_0x44f87d(0x8b4)]&&this[_0x44f87d(0x8b4)]['setBackgroundType'](Scene_Status[_0x44f87d(0x7e0)][_0x44f87d(0x8c3)]),this[_0x44f87d(0x3c4)]&&this[_0x44f87d(0x3c4)][_0x44f87d(0x3c0)](Scene_Status['layoutSettings'][_0x44f87d(0x89a)]),this[_0x44f87d(0x411)]&&this[_0x44f87d(0x411)]['setBackgroundType'](Scene_Status[_0x44f87d(0x7e0)][_0x44f87d(0x4d4)]);},Scene_Status['prototype'][_0x17407e(0x4bb)]=function(){const _0x49cc79=_0x17407e;return Scene_Status[_0x49cc79(0x7e0)][_0x49cc79(0x764)][_0x49cc79(0x8eb)](this);},Scene_Status[_0x17407e(0x374)][_0x17407e(0x6a9)]=function(){const _0x158cc7=_0x17407e;return Scene_Status[_0x158cc7(0x7e0)][_0x158cc7(0x485)][_0x158cc7(0x8eb)](this);},Scene_Status[_0x17407e(0x374)][_0x17407e(0x518)]=function(){const _0x5b37c4=_0x17407e;return Scene_Status[_0x5b37c4(0x7e0)][_0x5b37c4(0x3b3)][_0x5b37c4(0x8eb)](this);},Scene_Status[_0x17407e(0x374)][_0x17407e(0x711)]=function(){const _0x1ee90c=_0x17407e;return Scene_Status[_0x1ee90c(0x7e0)][_0x1ee90c(0x309)][_0x1ee90c(0x8eb)](this);},Scene_Options[_0x17407e(0x7e0)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x7b6)],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x1d4)]=Scene_Options[_0x17407e(0x374)][_0x17407e(0x56c)],Scene_Options[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x4dd243=_0x17407e;VisuMZ[_0x4dd243(0x21d)]['Scene_Options_create'][_0x4dd243(0x8eb)](this),this[_0x4dd243(0x436)]();},Scene_Options['prototype'][_0x17407e(0x436)]=function(){const _0x928a0e=_0x17407e;if(this[_0x928a0e(0x404)]){if('pivMy'!==_0x928a0e(0x4af))return _0x5cc40a[_0x928a0e(0x21d)][_0x928a0e(0x5cb)][_0x928a0e(0x7e8)][_0x928a0e(0x8b8)]&&_0x456321[_0x928a0e(0x479)](_0x4bd459)?![]:_0x43910e[_0x928a0e(0x21d)][_0x928a0e(0x837)][_0x928a0e(0x8eb)](this,_0x4a3f31);else this[_0x928a0e(0x404)][_0x928a0e(0x3c0)](Scene_Options[_0x928a0e(0x7e0)][_0x928a0e(0x1ea)]);}},Scene_Options['prototype'][_0x17407e(0x72e)]=function(){const _0x4d4acd=_0x17407e;return Scene_Options['layoutSettings'][_0x4d4acd(0x228)][_0x4d4acd(0x8eb)](this);},Scene_Save[_0x17407e(0x7e0)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x3e7)],Scene_Save[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x354fec=_0x17407e;Scene_File[_0x354fec(0x374)][_0x354fec(0x56c)][_0x354fec(0x8eb)](this),this[_0x354fec(0x436)]();},Scene_Save[_0x17407e(0x374)][_0x17407e(0x436)]=function(){const _0x2d9158=_0x17407e;this['_helpWindow']&&('thfpx'===_0x2d9158(0x5a6)?this[_0x2d9158(0x5c1)][_0x2d9158(0x3c0)](Scene_Save['layoutSettings'][_0x2d9158(0x351)]):this[_0x2d9158(0x54e)](0x0)),this[_0x2d9158(0x27a)]&&this[_0x2d9158(0x27a)][_0x2d9158(0x3c0)](Scene_Save[_0x2d9158(0x7e0)][_0x2d9158(0x86e)]);},Scene_Save[_0x17407e(0x374)][_0x17407e(0x4ad)]=function(){const _0x49c445=_0x17407e;return Scene_Save[_0x49c445(0x7e0)][_0x49c445(0x69d)][_0x49c445(0x8eb)](this);},Scene_Save[_0x17407e(0x374)][_0x17407e(0x2ff)]=function(){const _0x587a2d=_0x17407e;return Scene_Save['layoutSettings'][_0x587a2d(0x887)][_0x587a2d(0x8eb)](this);},Scene_Load['layoutSettings']=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x7fb)],Scene_Load[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x342f1e=_0x17407e;Scene_File[_0x342f1e(0x374)][_0x342f1e(0x56c)]['call'](this),this[_0x342f1e(0x436)]();},Scene_Load[_0x17407e(0x374)][_0x17407e(0x436)]=function(){const _0x44b52b=_0x17407e;if(this[_0x44b52b(0x5c1)]){if(_0x44b52b(0x6c8)==='fwmZA'){if(_0x520bb2['currencyUnit']!==this[_0x44b52b(0x595)]())return![];return _0x3b8a05[_0x44b52b(0x21d)][_0x44b52b(0x5cb)]['Gold'][_0x44b52b(0x42e)];}else this[_0x44b52b(0x5c1)][_0x44b52b(0x3c0)](Scene_Load[_0x44b52b(0x7e0)][_0x44b52b(0x351)]);}this[_0x44b52b(0x27a)]&&this[_0x44b52b(0x27a)][_0x44b52b(0x3c0)](Scene_Load['layoutSettings'][_0x44b52b(0x86e)]);},Scene_Load[_0x17407e(0x374)][_0x17407e(0x4ad)]=function(){const _0x237057=_0x17407e;return Scene_Load[_0x237057(0x7e0)][_0x237057(0x69d)][_0x237057(0x8eb)](this);},Scene_Load[_0x17407e(0x374)][_0x17407e(0x2ff)]=function(){const _0x240c77=_0x17407e;return Scene_Load['layoutSettings']['ListRect'][_0x240c77(0x8eb)](this);},Scene_GameEnd[_0x17407e(0x7e0)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x412)],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x49a)]=Scene_GameEnd['prototype'][_0x17407e(0x28f)],Scene_GameEnd[_0x17407e(0x374)][_0x17407e(0x28f)]=function(){const _0x27ceb4=_0x17407e;Scene_MenuBase[_0x27ceb4(0x374)][_0x27ceb4(0x28f)][_0x27ceb4(0x8eb)](this);},Scene_GameEnd[_0x17407e(0x374)][_0x17407e(0x3bd)]=function(){const _0x518758=_0x17407e,_0x9359c=this[_0x518758(0x493)]();this[_0x518758(0x4da)]=new Window_GameEnd(_0x9359c),this[_0x518758(0x4da)][_0x518758(0x851)](_0x518758(0x1ac),this[_0x518758(0x63c)][_0x518758(0x9b5)](this)),this[_0x518758(0x289)](this['_commandWindow']),this['_commandWindow'][_0x518758(0x3c0)](Scene_GameEnd[_0x518758(0x7e0)][_0x518758(0x1d7)]);},Scene_GameEnd['prototype'][_0x17407e(0x493)]=function(){const _0x46dc96=_0x17407e;return Scene_GameEnd[_0x46dc96(0x7e0)]['CommandRect'][_0x46dc96(0x8eb)](this);},Scene_Shop[_0x17407e(0x7e0)]=VisuMZ[_0x17407e(0x21d)]['Settings'][_0x17407e(0x65b)][_0x17407e(0x6b7)],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x57c)]=Scene_Shop[_0x17407e(0x374)][_0x17407e(0x56c)],Scene_Shop[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x31f260=_0x17407e;VisuMZ['CoreEngine'][_0x31f260(0x57c)][_0x31f260(0x8eb)](this),this[_0x31f260(0x436)]();},Scene_Shop[_0x17407e(0x374)][_0x17407e(0x436)]=function(){const _0x1ae7c0=_0x17407e;this[_0x1ae7c0(0x5c1)]&&this[_0x1ae7c0(0x5c1)][_0x1ae7c0(0x3c0)](Scene_Shop['layoutSettings'][_0x1ae7c0(0x351)]);this[_0x1ae7c0(0x461)]&&this[_0x1ae7c0(0x461)][_0x1ae7c0(0x3c0)](Scene_Shop[_0x1ae7c0(0x7e0)][_0x1ae7c0(0x41b)]);this['_commandWindow']&&this['_commandWindow']['setBackgroundType'](Scene_Shop[_0x1ae7c0(0x7e0)][_0x1ae7c0(0x1d7)]);this[_0x1ae7c0(0x682)]&&this[_0x1ae7c0(0x682)]['setBackgroundType'](Scene_Shop[_0x1ae7c0(0x7e0)]['DummyBgType']);this['_numberWindow']&&this[_0x1ae7c0(0x701)][_0x1ae7c0(0x3c0)](Scene_Shop[_0x1ae7c0(0x7e0)]['NumberBgType']);if(this['_statusWindow']){if(_0x1ae7c0(0x739)===_0x1ae7c0(0x739))this[_0x1ae7c0(0x8b4)][_0x1ae7c0(0x3c0)](Scene_Shop['layoutSettings'][_0x1ae7c0(0x8c3)]);else return this[_0x1ae7c0(0x852)]()?_0x157e1a[_0x1ae7c0(0x2c4)](_0x1ae7c0(0x804)):_0x38eb38[_0x1ae7c0(0x374)][_0x1ae7c0(0x6e9)]['call'](this);}this['_buyWindow']&&this['_buyWindow']['setBackgroundType'](Scene_Shop['layoutSettings'][_0x1ae7c0(0x596)]);if(this[_0x1ae7c0(0x33f)]){if(_0x1ae7c0(0x7ae)===_0x1ae7c0(0x7ae))this[_0x1ae7c0(0x33f)]['setBackgroundType'](Scene_Shop[_0x1ae7c0(0x7e0)]['CategoryBgType']);else return _0x4df705[_0x1ae7c0(0x7e0)]['StatusParamsRect'][_0x1ae7c0(0x8eb)](this);}this['_sellWindow']&&this['_sellWindow'][_0x1ae7c0(0x3c0)](Scene_Shop['layoutSettings'][_0x1ae7c0(0x56a)]);},Scene_Shop[_0x17407e(0x374)][_0x17407e(0x4ad)]=function(){const _0x2e9f4c=_0x17407e;return Scene_Shop[_0x2e9f4c(0x7e0)]['HelpRect'][_0x2e9f4c(0x8eb)](this);},Scene_Shop['prototype'][_0x17407e(0x29b)]=function(){const _0x4e63f7=_0x17407e;return Scene_Shop['layoutSettings'][_0x4e63f7(0x204)][_0x4e63f7(0x8eb)](this);},Scene_Shop[_0x17407e(0x374)][_0x17407e(0x493)]=function(){const _0x1e56a3=_0x17407e;return Scene_Shop[_0x1e56a3(0x7e0)][_0x1e56a3(0x694)]['call'](this);},Scene_Shop[_0x17407e(0x374)]['dummyWindowRect']=function(){const _0x46e44b=_0x17407e;return Scene_Shop['layoutSettings'][_0x46e44b(0x1b5)][_0x46e44b(0x8eb)](this);},Scene_Shop[_0x17407e(0x374)][_0x17407e(0x37a)]=function(){const _0x566c6d=_0x17407e;return Scene_Shop['layoutSettings'][_0x566c6d(0x859)]['call'](this);},Scene_Shop[_0x17407e(0x374)][_0x17407e(0x6a9)]=function(){const _0x3ba636=_0x17407e;return Scene_Shop['layoutSettings'][_0x3ba636(0x485)][_0x3ba636(0x8eb)](this);},Scene_Shop[_0x17407e(0x374)]['buyWindowRect']=function(){const _0xe2d9de=_0x17407e;return Scene_Shop[_0xe2d9de(0x7e0)][_0xe2d9de(0x2e8)][_0xe2d9de(0x8eb)](this);},Scene_Shop[_0x17407e(0x374)]['categoryWindowRect']=function(){const _0x4e24df=_0x17407e;return Scene_Shop[_0x4e24df(0x7e0)][_0x4e24df(0x873)][_0x4e24df(0x8eb)](this);},Scene_Shop[_0x17407e(0x374)][_0x17407e(0x867)]=function(){const _0x5a1e73=_0x17407e;return Scene_Shop[_0x5a1e73(0x7e0)]['SellRect'][_0x5a1e73(0x8eb)](this);},Scene_Name[_0x17407e(0x7e0)]=VisuMZ['CoreEngine'][_0x17407e(0x5cb)][_0x17407e(0x65b)][_0x17407e(0x364)],VisuMZ[_0x17407e(0x21d)][_0x17407e(0x95a)]=Scene_Name[_0x17407e(0x374)][_0x17407e(0x56c)],Scene_Name[_0x17407e(0x374)][_0x17407e(0x56c)]=function(){const _0x2c8660=_0x17407e;VisuMZ[_0x2c8660(0x21d)][_0x2c8660(0x95a)][_0x2c8660(0x8eb)](this),this[_0x2c8660(0x436)]();},Scene_Name[_0x17407e(0x374)][_0x17407e(0x436)]=function(){const _0x2f9a88=_0x17407e;this[_0x2f9a88(0x49e)]&&this['_editWindow'][_0x2f9a88(0x3c0)](Scene_Name['layoutSettings'][_0x2f9a88(0x3bf)]),this[_0x2f9a88(0x547)]&&this[_0x2f9a88(0x547)][_0x2f9a88(0x3c0)](Scene_Name[_0x2f9a88(0x7e0)][_0x2f9a88(0x462)]);},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x17407e(0x374)]['editWindowRect']=function(){const _0x440604=_0x17407e;return Scene_Name['layoutSettings'][_0x440604(0x306)][_0x440604(0x8eb)](this);},Scene_Name['prototype'][_0x17407e(0x205)]=function(){const _0x40a080=_0x17407e;return Scene_Name[_0x40a080(0x7e0)][_0x40a080(0x9b9)][_0x40a080(0x8eb)](this);},Scene_Name[_0x17407e(0x374)][_0x17407e(0x852)]=function(){const _0x1db092=_0x17407e;if(!this[_0x1db092(0x547)])return![];return VisuMZ[_0x1db092(0x21d)][_0x1db092(0x5cb)]['KeyboardInput'][_0x1db092(0x852)];},Scene_Name['prototype'][_0x17407e(0x6e9)]=function(){const _0x260e22=_0x17407e;return this[_0x260e22(0x852)]()?TextManager[_0x260e22(0x2c4)]('tab'):Scene_MenuBase[_0x260e22(0x374)]['buttonAssistKey1'][_0x260e22(0x8eb)](this);},Scene_Name[_0x17407e(0x374)][_0x17407e(0x4f0)]=function(){const _0x59f255=_0x17407e;if(this['EnableNameInput']()){if(_0x59f255(0x2fd)===_0x59f255(0x2fd)){const _0x5abbf2=VisuMZ[_0x59f255(0x21d)][_0x59f255(0x5cb)][_0x59f255(0x602)];if(this[_0x59f255(0x547)][_0x59f255(0x4b9)]===_0x59f255(0x4a6))return _0x5abbf2['Keyboard']||_0x59f255(0x968);else{if('GIrUo'!==_0x59f255(0x2d9))return _0x5abbf2['Manual']||_0x59f255(0x2e3);else{_0x139ecf['ConvertParams'](_0x37e13f,_0x265343);const _0x5dfa12=_0x76a0d6['pictureId']||0x1,_0x201ef5=_0x39bc65['easingType']||_0x59f255(0x3cc),_0x5d4483=_0x4fc926[_0x59f255(0x65a)](_0x5dfa12);_0x5d4483&&_0x5d4483['setEasingType'](_0x201ef5);}}}else this[_0x59f255(0x4da)][_0x59f255(0x3c0)](_0x317582[_0x59f255(0x7e0)][_0x59f255(0x1d7)]);}else return Scene_MenuBase[_0x59f255(0x374)][_0x59f255(0x4f0)]['call'](this);},VisuMZ['CoreEngine'][_0x17407e(0x584)]=Scene_Name[_0x17407e(0x374)]['onInputOk'],Scene_Name[_0x17407e(0x374)][_0x17407e(0x91b)]=function(){const _0x1d3d8b=_0x17407e;this['doesNameContainBannedWords']()?_0x1d3d8b(0x8f6)!==_0x1d3d8b(0x3a7)?this[_0x1d3d8b(0x5e2)]():(this[_0x1d3d8b(0x6a5)]={},_0x467e18[_0x1d3d8b(0x21d)]['Game_BattlerBase_refresh'][_0x1d3d8b(0x8eb)](this)):VisuMZ[_0x1d3d8b(0x21d)][_0x1d3d8b(0x584)][_0x1d3d8b(0x8eb)](this);},Scene_Name[_0x17407e(0x374)][_0x17407e(0x636)]=function(){const _0xd81983=_0x17407e,_0x33c671=VisuMZ[_0xd81983(0x21d)][_0xd81983(0x5cb)][_0xd81983(0x602)];if(!_0x33c671)return![];const _0x620e49=_0x33c671[_0xd81983(0x749)];if(!_0x620e49)return![];const _0x3d6820=this['_editWindow'][_0xd81983(0x506)]()[_0xd81983(0x88f)]();for(const _0x438bdf of _0x620e49){if(_0x3d6820['includes'](_0x438bdf[_0xd81983(0x88f)]()))return!![];}return![];},Scene_Name[_0x17407e(0x374)]['onInputBannedWords']=function(){const _0x219144=_0x17407e;SoundManager[_0x219144(0x560)]();},VisuMZ[_0x17407e(0x21d)]['Scene_Battle_update']=Scene_Battle['prototype'][_0x17407e(0x8dc)],Scene_Battle[_0x17407e(0x374)][_0x17407e(0x8dc)]=function(){const _0x58289a=_0x17407e;VisuMZ['CoreEngine'][_0x58289a(0x536)][_0x58289a(0x8eb)](this);if($gameTemp[_0x58289a(0x2c3)])this[_0x58289a(0x654)]();},Scene_Battle[_0x17407e(0x374)][_0x17407e(0x654)]=function(){const _0x4aa826=_0x17407e;!BattleManager['isInputting']()&&!this[_0x4aa826(0x83f)]&&!$gameMessage['isBusy']()&&(this[_0x4aa826(0x83f)]=!![],this[_0x4aa826(0x8dc)](),SceneManager[_0x4aa826(0x676)](),this[_0x4aa826(0x83f)]=![]);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3a4)]=Scene_Battle['prototype'][_0x17407e(0x57e)],Scene_Battle[_0x17407e(0x374)][_0x17407e(0x57e)]=function(){const _0x2a2ceb=_0x17407e;VisuMZ[_0x2a2ceb(0x21d)]['Scene_Battle_createCancelButton'][_0x2a2ceb(0x8eb)](this),SceneManager[_0x2a2ceb(0x6a3)]()&&this[_0x2a2ceb(0x3e0)]();},Scene_Battle[_0x17407e(0x374)][_0x17407e(0x3e0)]=function(){const _0x4ce8c9=_0x17407e;this[_0x4ce8c9(0x88a)]['x']=Graphics['boxWidth']+0x4,this[_0x4ce8c9(0x308)]()?this[_0x4ce8c9(0x88a)]['y']=Graphics[_0x4ce8c9(0x528)]-this[_0x4ce8c9(0x7d3)]():this[_0x4ce8c9(0x88a)]['y']=0x0;},VisuMZ['CoreEngine'][_0x17407e(0x723)]=Sprite_Button['prototype'][_0x17407e(0x829)],Sprite_Button['prototype'][_0x17407e(0x829)]=function(_0x40ecdd){const _0x192b26=_0x17407e;VisuMZ[_0x192b26(0x21d)][_0x192b26(0x723)][_0x192b26(0x8eb)](this,_0x40ecdd),this[_0x192b26(0x9a2)]();},Sprite_Button[_0x17407e(0x374)][_0x17407e(0x9a2)]=function(){const _0x5efc92=_0x17407e,_0x410b72=VisuMZ['CoreEngine']['Settings']['UI'];this[_0x5efc92(0x97d)]=![];switch(this[_0x5efc92(0x40c)]){case _0x5efc92(0x1ac):this[_0x5efc92(0x97d)]=!_0x410b72[_0x5efc92(0x1c3)];break;case _0x5efc92(0x605):case _0x5efc92(0x52c):this['_isButtonHidden']=!_0x410b72[_0x5efc92(0x312)];break;case'down':case'up':case'down2':case _0x5efc92(0x58c):case'ok':this[_0x5efc92(0x97d)]=!_0x410b72[_0x5efc92(0x458)];break;case'menu':this['_isButtonHidden']=!_0x410b72[_0x5efc92(0x72f)];break;}},VisuMZ['CoreEngine'][_0x17407e(0x5af)]=Sprite_Button[_0x17407e(0x374)][_0x17407e(0x300)],Sprite_Button[_0x17407e(0x374)]['updateOpacity']=function(){const _0x3d6175=_0x17407e;SceneManager[_0x3d6175(0x82b)]()||this[_0x3d6175(0x97d)]?this['hideButtonFromView']():_0x3d6175(0x926)===_0x3d6175(0x926)?VisuMZ[_0x3d6175(0x21d)][_0x3d6175(0x5af)][_0x3d6175(0x8eb)](this):this['processAlwaysEscape']();},Sprite_Button[_0x17407e(0x374)]['hideButtonFromView']=function(){const _0x6bbc22=_0x17407e;this[_0x6bbc22(0x558)]=![],this['opacity']=0x0,this['x']=Graphics[_0x6bbc22(0x2b6)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ['CoreEngine'][_0x17407e(0x592)]=Sprite_Battler[_0x17407e(0x374)][_0x17407e(0x38e)],Sprite_Battler[_0x17407e(0x374)][_0x17407e(0x38e)]=function(_0x30314c,_0xe4dda3,_0x49bec4){const _0x32026d=_0x17407e;(this[_0x32026d(0x287)]!==_0x30314c||this['_targetOffsetY']!==_0xe4dda3)&&(this[_0x32026d(0x2a6)](_0x32026d(0x3cc)),this[_0x32026d(0x992)]=_0x49bec4),VisuMZ['CoreEngine'][_0x32026d(0x592)]['call'](this,_0x30314c,_0xe4dda3,_0x49bec4);},Sprite_Battler[_0x17407e(0x374)][_0x17407e(0x2a6)]=function(_0x46af64){const _0x147173=_0x17407e;this[_0x147173(0x39b)]=_0x46af64;},Sprite_Battler[_0x17407e(0x374)]['updateMove']=function(){const _0x52ae93=_0x17407e;if(this['_movementDuration']<=0x0)return;const _0x23fa0c=this['_movementDuration'],_0x3c3e33=this[_0x52ae93(0x992)],_0x4f3312=this[_0x52ae93(0x39b)];this[_0x52ae93(0x932)]=this[_0x52ae93(0x368)](this[_0x52ae93(0x932)],this[_0x52ae93(0x287)],_0x23fa0c,_0x3c3e33,_0x4f3312),this[_0x52ae93(0x4d7)]=this[_0x52ae93(0x368)](this[_0x52ae93(0x4d7)],this[_0x52ae93(0x451)],_0x23fa0c,_0x3c3e33,_0x4f3312),this[_0x52ae93(0x6f6)]--;if(this['_movementDuration']<=0x0)this[_0x52ae93(0x74c)]();},Sprite_Battler[_0x17407e(0x374)][_0x17407e(0x368)]=function(_0x35a3a1,_0x2ccd3b,_0x29c60f,_0x2da5cf,_0x140d04){const _0xd1405=_0x17407e,_0x32624b=VisuMZ[_0xd1405(0x6da)]((_0x2da5cf-_0x29c60f)/_0x2da5cf,_0x140d04||'Linear'),_0xb6fe11=VisuMZ[_0xd1405(0x6da)]((_0x2da5cf-_0x29c60f+0x1)/_0x2da5cf,_0x140d04||_0xd1405(0x3cc)),_0x419e1e=(_0x35a3a1-_0x2ccd3b*_0x32624b)/(0x1-_0x32624b);return _0x419e1e+(_0x2ccd3b-_0x419e1e)*_0xb6fe11;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x1b3)]=Sprite_Actor['prototype'][_0x17407e(0x760)],Sprite_Actor[_0x17407e(0x374)][_0x17407e(0x760)]=function(_0x57046f){const _0x131a0b=_0x17407e;VisuMZ[_0x131a0b(0x21d)][_0x131a0b(0x5cb)]['UI'][_0x131a0b(0x437)]?this[_0x131a0b(0x5fc)](_0x57046f):VisuMZ[_0x131a0b(0x21d)][_0x131a0b(0x1b3)][_0x131a0b(0x8eb)](this,_0x57046f);},Sprite_Actor[_0x17407e(0x374)][_0x17407e(0x5fc)]=function(_0x476605){const _0x528f84=_0x17407e;let _0x321dd1=Math['round'](Graphics[_0x528f84(0x2b6)]/0x2+0xc0);_0x321dd1-=Math[_0x528f84(0x3d1)]((Graphics[_0x528f84(0x2b6)]-Graphics[_0x528f84(0x937)])/0x2),_0x321dd1+=_0x476605*0x20;let _0x210a8b=Graphics[_0x528f84(0x2fc)]-0xc8-$gameParty[_0x528f84(0x36c)]()*0x30;_0x210a8b-=Math[_0x528f84(0x3d1)]((Graphics['height']-Graphics['boxHeight'])/0x2),_0x210a8b+=_0x476605*0x30,this[_0x528f84(0x725)](_0x321dd1,_0x210a8b);},Sprite_Actor[_0x17407e(0x374)][_0x17407e(0x826)]=function(){const _0x3a8673=_0x17407e;this[_0x3a8673(0x38e)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x17407e(0x631)]=function(_0x3351a5){const _0x58cab2=_0x17407e;this[_0x58cab2(0x7eb)]=_0x3351a5;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x1af)]=Sprite_Animation[_0x17407e(0x374)][_0x17407e(0x6b8)],Sprite_Animation[_0x17407e(0x374)][_0x17407e(0x6b8)]=function(){const _0x28e103=_0x17407e;if(this[_0x28e103(0x7eb)])return;VisuMZ[_0x28e103(0x21d)][_0x28e103(0x1af)][_0x28e103(0x8eb)](this);},VisuMZ[_0x17407e(0x21d)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x17407e(0x374)][_0x17407e(0x7ef)],Sprite_Animation['prototype'][_0x17407e(0x7ef)]=function(_0x142d08){const _0x17e5af=_0x17407e;this[_0x17e5af(0x5f6)]()?this[_0x17e5af(0x6ff)](_0x142d08):VisuMZ['CoreEngine'][_0x17e5af(0x5b6)][_0x17e5af(0x8eb)](this,_0x142d08);},Sprite_Animation[_0x17407e(0x374)][_0x17407e(0x5f6)]=function(){const _0x1f7167=_0x17407e;if(!this[_0x1f7167(0x5a3)])return![];const _0x4e949d=this[_0x1f7167(0x5a3)][_0x1f7167(0x506)]||'';if(_0x4e949d[_0x1f7167(0x333)](/<MIRROR OFFSET X>/i))return!![];if(_0x4e949d[_0x1f7167(0x333)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x1f7167(0x21d)][_0x1f7167(0x5cb)][_0x1f7167(0x7e8)][_0x1f7167(0x370)];},Sprite_Animation[_0x17407e(0x374)]['setViewportCoreEngineFix']=function(_0x5f5023){const _0x1cf9f0=_0x17407e,_0x5e0ab3=this[_0x1cf9f0(0x794)],_0x580de7=this['_viewportSize'],_0x5418a6=this[_0x1cf9f0(0x5a3)][_0x1cf9f0(0x51e)]*(this[_0x1cf9f0(0x742)]?-0x1:0x1)-_0x5e0ab3/0x2,_0x1672ea=this[_0x1cf9f0(0x5a3)][_0x1cf9f0(0x1f7)]-_0x580de7/0x2,_0x1c7d3f=this[_0x1cf9f0(0x827)](_0x5f5023);_0x5f5023['gl'][_0x1cf9f0(0x6aa)](_0x5418a6+_0x1c7d3f['x'],_0x1672ea+_0x1c7d3f['y'],_0x5e0ab3,_0x580de7);},Sprite_Animation['prototype'][_0x17407e(0x729)]=function(_0x539cb5){const _0x550b13=_0x17407e;if(_0x539cb5[_0x550b13(0x24f)]){}const _0x4bf3a8=this['_animation'][_0x550b13(0x506)];let _0x5b614a=_0x539cb5['height']*_0x539cb5[_0x550b13(0x4f9)]['y'],_0x38a6c9=0x0,_0x3dd92f=-_0x5b614a/0x2;if(_0x4bf3a8[_0x550b13(0x333)](/<(?:HEAD|HEADER|TOP)>/i))_0x3dd92f=-_0x5b614a;if(_0x4bf3a8[_0x550b13(0x333)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x3dd92f=0x0;if(this[_0x550b13(0x5a3)]['alignBottom'])_0x3dd92f=0x0;if(_0x4bf3a8['match'](/<(?:LEFT)>/i))_0x38a6c9=-_0x539cb5[_0x550b13(0x2b6)]/0x2;if(_0x4bf3a8[_0x550b13(0x333)](/<(?:RIGHT)>/i))_0x38a6c9=_0x539cb5[_0x550b13(0x2b6)]/0x2;if(_0x4bf3a8['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if(_0x550b13(0x784)!==_0x550b13(0x784)){const _0x40fd5e=_0x4d70ba[_0xe258a1['animationId']],_0xc2b578=_0x7cbf8b[_0x550b13(0x428)],_0x1deb68=_0x5b7b89[_0x550b13(0x4b0)],_0x626ac8=_0x5c264e[_0x550b13(0x41a)];let _0x9dda6=this[_0x550b13(0x43a)]();const _0x168e54=this['animationNextDelay']();if(this[_0x550b13(0x41e)](_0x40fd5e))for(const _0x29b909 of _0xc2b578){this[_0x550b13(0x270)]([_0x29b909],_0x40fd5e,_0x1deb68,_0x9dda6,_0x626ac8),_0x9dda6+=_0x168e54;}else this[_0x550b13(0x270)](_0xc2b578,_0x40fd5e,_0x1deb68,_0x9dda6,_0x626ac8);}else _0x38a6c9=Number(RegExp['$1'])*_0x539cb5['width'];}if(_0x4bf3a8['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if('yEWLM'!=='yEWLM'){if(this[_0x550b13(0x264)]())_0x1fee1a=_0x34154e[_0x550b13(0x1d0)](_0x479af3);_0x2e0d38[_0x550b13(0x21d)][_0x550b13(0x31e)][_0x550b13(0x8eb)](this,_0x233406,_0x1c4cba,_0x17fe6e,_0x24fb8f,_0xa48923);}else _0x3dd92f=(0x1-Number(RegExp['$1']))*-_0x5b614a;}_0x4bf3a8[_0x550b13(0x333)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x38a6c9=Number(RegExp['$1'])*_0x539cb5[_0x550b13(0x2b6)],_0x3dd92f=(0x1-Number(RegExp['$2']))*-_0x5b614a);if(_0x4bf3a8[_0x550b13(0x333)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x38a6c9+=Number(RegExp['$1']);if(_0x4bf3a8['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x3dd92f+=Number(RegExp['$1']);if(_0x4bf3a8['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x550b13(0x5ca)!==_0x550b13(0x503))_0x38a6c9+=Number(RegExp['$1']),_0x3dd92f+=Number(RegExp['$2']);else return _0x4fab60&&_0x445cc2['_scene']?_0x12b2fd['_scene']['isWindowMaskingEnabled']():!![];}const _0x4635df=new Point(_0x38a6c9,_0x3dd92f);return _0x539cb5[_0x550b13(0x4d5)](),_0x539cb5[_0x550b13(0x3f1)][_0x550b13(0x501)](_0x4635df);},Sprite_AnimationMV[_0x17407e(0x374)][_0x17407e(0x347)]=function(){const _0x157a5d=_0x17407e;this[_0x157a5d(0x643)]=VisuMZ[_0x157a5d(0x21d)][_0x157a5d(0x5cb)][_0x157a5d(0x7e8)][_0x157a5d(0x87a)]??0x4,this[_0x157a5d(0x8c2)](),this[_0x157a5d(0x643)]=this[_0x157a5d(0x643)]['clamp'](0x1,0xa);},Sprite_AnimationMV[_0x17407e(0x374)]['setupCustomRateCoreEngine']=function(){const _0x3b87d3=_0x17407e;if(!this[_0x3b87d3(0x5a3)]);const _0x3a1a8f=this[_0x3b87d3(0x5a3)]['name']||'';_0x3a1a8f['match'](/<RATE:[ ](\d+)>/i)&&('rjJhr'===_0x3b87d3(0x969)?this[_0x3b87d3(0x643)]=(Number(RegExp['$1'])||0x1)[_0x3b87d3(0x509)](0x1,0xa):(this[_0x3b87d3(0x67e)](_0x47d8a3),this[_0x3b87d3(0x99c)](_0x491cf6)));},Sprite_AnimationMV[_0x17407e(0x374)]['setMute']=function(_0x4ab9a1){const _0x1f6b83=_0x17407e;this[_0x1f6b83(0x7eb)]=_0x4ab9a1;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x832)]=Sprite_AnimationMV[_0x17407e(0x374)][_0x17407e(0x449)],Sprite_AnimationMV['prototype'][_0x17407e(0x449)]=function(_0x1c43b3){const _0x4af899=_0x17407e;this[_0x4af899(0x7eb)]&&(_0x1c43b3=JsonEx[_0x4af899(0x878)](_0x1c43b3),_0x1c43b3['se']&&(_0x1c43b3['se'][_0x4af899(0x81f)]=0x0)),VisuMZ[_0x4af899(0x21d)][_0x4af899(0x832)][_0x4af899(0x8eb)](this,_0x1c43b3);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x675)]=Sprite_AnimationMV[_0x17407e(0x374)][_0x17407e(0x5a4)],Sprite_AnimationMV[_0x17407e(0x374)][_0x17407e(0x5a4)]=function(){const _0x5daa3b=_0x17407e;VisuMZ[_0x5daa3b(0x21d)][_0x5daa3b(0x675)][_0x5daa3b(0x8eb)](this);if(this[_0x5daa3b(0x5a3)][_0x5daa3b(0x785)]===0x3){if(this['x']===0x0)this['x']=Math[_0x5daa3b(0x909)](Graphics[_0x5daa3b(0x2b6)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics['height']/0x2);}},Sprite_Damage[_0x17407e(0x374)][_0x17407e(0x63d)]=function(_0x35e336){const _0x5f142c=_0x17407e;let _0x167158=Math[_0x5f142c(0x305)](_0x35e336)[_0x5f142c(0x7c1)]();this[_0x5f142c(0x264)]()&&(_0x167158=VisuMZ[_0x5f142c(0x1d0)](_0x167158));const _0x2ae272=this[_0x5f142c(0x1c5)](),_0x7847d4=Math[_0x5f142c(0x3d1)](_0x2ae272*0.75);for(let _0x3996aa=0x0;_0x3996aa<_0x167158['length'];_0x3996aa++){const _0x486dbf=this['createChildSprite'](_0x7847d4,_0x2ae272);_0x486dbf[_0x5f142c(0x424)]['drawText'](_0x167158[_0x3996aa],0x0,0x0,_0x7847d4,_0x2ae272,'center'),_0x486dbf['x']=(_0x3996aa-(_0x167158[_0x5f142c(0x62d)]-0x1)/0x2)*_0x7847d4,_0x486dbf['dy']=-_0x3996aa;}},Sprite_Damage['prototype'][_0x17407e(0x264)]=function(){const _0x578245=_0x17407e;return VisuMZ[_0x578245(0x21d)][_0x578245(0x5cb)]['QoL']['DigitGroupingDamageSprites'];},Sprite_Damage[_0x17407e(0x374)][_0x17407e(0x94a)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8f5)]=Sprite_Gauge[_0x17407e(0x374)][_0x17407e(0x288)],Sprite_Gauge[_0x17407e(0x374)][_0x17407e(0x288)]=function(){const _0x5af0bc=_0x17407e;return VisuMZ[_0x5af0bc(0x21d)][_0x5af0bc(0x8f5)][_0x5af0bc(0x8eb)](this)[_0x5af0bc(0x509)](0x0,0x1);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x7c8)]=Sprite_Gauge[_0x17407e(0x374)][_0x17407e(0x35a)],Sprite_Gauge[_0x17407e(0x374)][_0x17407e(0x35a)]=function(){const _0x46b457=_0x17407e;let _0x2904ee=VisuMZ[_0x46b457(0x21d)][_0x46b457(0x7c8)][_0x46b457(0x8eb)](this);return _0x2904ee;},Sprite_Gauge[_0x17407e(0x374)][_0x17407e(0x83b)]=function(){const _0x4b9544=_0x17407e;let _0x532a01=this[_0x4b9544(0x35a)]();if(this[_0x4b9544(0x264)]()){if(_0x4b9544(0x20a)===_0x4b9544(0x20a))_0x532a01=VisuMZ[_0x4b9544(0x1d0)](_0x532a01);else{if(typeof _0x318578===_0x4b9544(0x884))_0x15f54f[_0x4b9544(0x46c)][_0x4b9544(0x3f0)]();}}const _0x2fc191=this[_0x4b9544(0x7f3)]()-0x1,_0x27a738=this[_0x4b9544(0x1ae)]?this[_0x4b9544(0x1ae)]():this[_0x4b9544(0x22f)]();this[_0x4b9544(0x2bd)](),this[_0x4b9544(0x424)][_0x4b9544(0x27d)](_0x532a01,0x0,0x0,_0x2fc191,_0x27a738,_0x4b9544(0x1ad));},Sprite_Gauge['prototype'][_0x17407e(0x908)]=function(){return 0x3;},Sprite_Gauge[_0x17407e(0x374)][_0x17407e(0x264)]=function(){const _0x46e610=_0x17407e;return VisuMZ[_0x46e610(0x21d)]['Settings'][_0x46e610(0x7e8)][_0x46e610(0x4fc)];},Sprite_Gauge['prototype'][_0x17407e(0x94a)]=function(){const _0x49fc34=_0x17407e;return ColorManager[_0x49fc34(0x633)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x203)]=Sprite_Picture[_0x17407e(0x374)][_0x17407e(0x854)],Sprite_Picture[_0x17407e(0x374)][_0x17407e(0x854)]=function(){const _0x32905a=_0x17407e;this['_pictureName'][_0x32905a(0x333)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x32905a(0x5f2)](Number(RegExp['$1'])):'bxvNU'!==_0x32905a(0x30a)?(this[_0x32905a(0x2ca)](),_0x4d450a[_0x32905a(0x676)]()):VisuMZ[_0x32905a(0x21d)][_0x32905a(0x203)][_0x32905a(0x8eb)](this);},Sprite_Picture[_0x17407e(0x374)]['loadIconBitmap']=function(_0x5a111b){const _0x3ff8c6=_0x17407e,_0x45ea59=ImageManager[_0x3ff8c6(0x42a)],_0x2993b7=ImageManager[_0x3ff8c6(0x4f1)],_0x703984=this[_0x3ff8c6(0x661)]['match'](/SMOOTH/i);this[_0x3ff8c6(0x424)]=new Bitmap(_0x45ea59,_0x2993b7);const _0x2cf761=ImageManager['loadSystem']('IconSet'),_0x17f09c=_0x5a111b%0x10*_0x45ea59,_0x406f5b=Math[_0x3ff8c6(0x3d1)](_0x5a111b/0x10)*_0x2993b7;this[_0x3ff8c6(0x424)][_0x3ff8c6(0x7b3)]=_0x703984,this[_0x3ff8c6(0x424)][_0x3ff8c6(0x628)](_0x2cf761,_0x17f09c,_0x406f5b,_0x45ea59,_0x2993b7,0x0,0x0,_0x45ea59,_0x2993b7);};function Sprite_TitlePictureButton(){const _0x24dc5d=_0x17407e;this[_0x24dc5d(0x829)](...arguments);}function _0x4117(){const _0x4ccc07=['FAdxP','uiAreaHeight','PictureID','Window_ShopSell_isEnabled','CISEX','list','gainSilentTp','drawValue','FDR','padding','pop','_playtestF7Looping','FKQbe','Scene_Base_terminateAnimationClearBugFix','dimColor2','_backSprite1','changeClass','SideButtons','trim','DrawIcons','buttonAssistOffset5','sparamFlat2','ARRAYSTRUCT','kvePl','join','drawActorNickname','opacity','enemy','NameInputMessage','setHandler','EnableNameInput','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','loadBitmap','DrawItemBackgroundJS','HakvF','drawIcon','AutoStretch','NumberRect','OWOGu','processPointAnimationRequests','endAnimation','LATIN1','DTB','ZGkhc','exportAllTroopStrings','itemSuccessRate','Center','NUMPAD3','WIN_OEM_PA1','ScreenResolution','ParamMax','sellWindowRect','SParamVocab7','PDR','xparamFlat1','mev','_stored_ctGaugeColor1','IconParam6','ListBgType','Spriteset_Battle_createEnemies','([\x5c+\x5c-]\x5cd+)>','irgKC','TextStr','CategoryRect','bgmVolume','PRnYv','default','storeMapData','makeDeepCopy','processCursorMoveModernControls','MvAnimationRate','setFrame','focus','itemBackColor2','guardSkillId','fEkuZ','mainFontSize','drawActorSimpleStatus','ydGZI','initVisuMZCoreEngine','object','IconIndex','playTestF6','ListRect','Scene_MenuBase_createCancelButton','_pictureCoordinatesWindow','_cancelButton','HRG','IconXParam1','xparam','jeXHB','toLowerCase','SPACE','title','initialLevel','WIN_OEM_CUSEL','Input_clear','playEscape','maxGold','WOVar','Scene_MenuBase_mainAreaHeight','description','StatusParamsBgType','areTileShadowsHidden','isGamepadTriggered','showFauxAnimations','BpbTY','drawFace','RIGHT','Bitmap_drawCircle','Game_Actor_levelUp','_backgroundSprite','CNKwE','Bitmap_measureTextWidth','ARRAYSTR','resetBattleSystem','isArrowPressed','performMiss','Scene_Map_update','_stored_hpGaugeColor1','fadeSpeed','addChildToBack','removePointAnimation','lineHeight','CAPSLOCK','createMenuButton','get','_colorTone','_statusWindow','CEV','SideView','tBnkD','KeyItemProtect','REC','isActiveTpb','updateLastTarget','onClick','_targets','getCoreEngineScreenShakeStyle','_mp','ButtonHeight','drawIconBySize','setupCustomRateCoreEngine','StatusBgType','Game_Interpreter_command122','children','AghTH','Input_shouldPreventDefault','NFRjp','setSkill','Bitmap_resize','qXJlW','drawCurrentParam','Spriteset_Base_isAnimationPlaying','AniUZ','WIN_OEM_FJ_TOUROKU','terms','qFSlA','_forcedBattleSys','Scene_Battle_createSpritesetFix','updateCoreEasing','openingSpeed','_drawTextBody','Input_update','_centerElement','VisuMZ_1_OptionsCore','Game_Event_isCollidedWithEvents','createFauxAnimationQueue','update','itemEva','backOpacity','KTWmK','imageSmoothingEnabled','_pageupButton','JVaNn','VfuUi','blendFunc','uQPbn','ALWAYS','AMPERSAND','maxCols','paramFlatJS','registerCommand','call','Spriteset_Base_initialize','updateOpen','Game_Interpreter_updateWaitMode','JzBLP','flush','ctrlKey','processFauxAnimationRequests','_lastPluginCommandInterpreter','playCursor','Sprite_Gauge_gaugeRate','pvPgS','button','text%1','SlotRect','helpAreaTopSideButtonLayout','VisuMZ_2_BattleSystemCTB','ARRAYEVAL','WIN_ICO_CLEAR','reserveNewGameCommonEvent','Game_Picture_calcEasing','_centerElementCoreEngine','_index','TitleCommandList','_customModified','anchorCoreEasing','OpenSpeed','rfEKn','openness','valueOutlineWidth','round','advanced','easingType','ShowItemBackground','buttonAssistOffset%1','isRepeated','processBack','textSizeEx','itemLineRect','Window_NumberInput_start','_screenY','itemHitImprovedAccuracy','_windowskin','setSize','left','QvTEc','PtjJI','Nibrc','onInputOk','needsUpdate','checkCacheKey','ParseWeaponNotetags','paramRateJS','INOUTCUBIC','connected','forceStencil','loadTitle1','onKeyDownKeysF6F7','Unnamed','Hjdtr','COMMA','Scene_Map_createMenuButton','xparamRate1','removeAllPointAnimations','SParamVocab5','ChZSb','YTkCp','F13','getColorDataFromPluginParameters','_lastY','kCneC','_offsetX','kSjTq','kQyBG','_fauxAnimationQueue','smoothSelect','boxWidth','clear','_coreEasing','WIN_ICO_HELP','UCYtx','xCHYZ','RPJyp','isActor','DyIDt','_stored_maxLvGaugeColor2','_stored_expGaugeColor1','_onKeyDown','contentsBack','params','MULTIPLY','keyMapper','createEnemies','createTroopNote','makeAutoBattleActions','valueOutlineColor','FontSmoothing','Flat1','drawAllParams','(\x5cd+\x5c.?\x5cd+)>','jGhOM','openURL','resetTextColor','_inputSpecialKeyCode','isBottomHelpMode','faceWidth','font-smooth','Scene_Menu_create','CKLox','ColorNormal','WASD','Scene_Name_create','gRxnB','Mirror','ScaleX','CreateBattleSystemID','calcEasing','TextFmt','LvExpGauge','LkaaG','ButtonAssist','SellRect','IconSParam7','SCALE_MODES','bgm','Keyboard','rjJhr','SPaxM','ozosL','deselect','atbActive','ParseSkillNotetags','<%1\x20%2:[\x20]','AGI','createSpriteset','usidY','targetBackOpacity','updateOrigin','qBcnH','ParamChange','buttonAssistText4','Opacity','Window_NameInput_cursorUp','outlineColorDmg','kxbTe','NUMPAD4','_isButtonHidden','WDdms','IXrlM','vabQJ','consumeItem','CustomParamNames','drawGauge','textBaseline','_target','Rate2','SklXZ','isItem','SceneManager_onKeyDown','CFKzv','center','enemies','NUMPAD9','showPointAnimations','mainAreaHeightSideButtonLayout','pictureButtons','nHmtY','_movementWholeDuration','drawCircle','SceneManager_exit','waiting','OpenURL','initBasic','isWindowMaskingEnabled','BzvZk','toUpperCase','Game_Interpreter_PluginCommand','centerSprite','ActorHPColor','targetScaleY','_digitGrouping','NFeec','\x5c}❪TAB❫\x5c{','initButtonHidden','updatePictureAntiZoom','VisuMZ_2_BattleSystemETB','asin','code','INQUAD','reservePlayTestNewGameCommonEvent','Window_NameInput_cursorPageup','evade','_number','playTestCtrlT','CANCEL','%2%1%3','IconParam5','dimColor1','SystemSetFontSize','buttonAssistText3','escape','mainAreaBottom','bind','createBuffer','CRI','actor','InputRect','save','Bitmap_drawText','OWsGc','updateCurrentEvent','UQIfK','cancel','right','textHeight','Sprite_Animation_processSoundTimings','NoTileShadows','log','ForceNoPlayTest','Sprite_Actor_setActorHome','random','DummyRect','Padding','isEnabled','_addShadow','ActorBgType','_backgroundFilter','Game_Event_start','WnlQi','initCoreEngine','drawNewParam','Game_Action_itemHit','_onKeyPress','ZsGxO','NUMPAD0','cancelShowButton','IconSet','fontSize','processCursorMove','YScgs','stencilFunc','powerUpColor','INOUTQUART','AccuracyBoost','mainCommandWidth','onzBU','MRG','_downArrowSprite','GroupDigits','drawParamName','addEventListener','clearCachedKeys','Scene_Options_create','isMenuButtonAssistEnabled','_refreshArrows','CommandBgType','_upArrowSprite','setTargetAnchor','startAnimation','ONE','filterArea','isAlive','_changingClass','Rudwe','drawTextEx','meVolume','adjustPictureAntiZoom','stringKeyMap','Map%1','updateFauxAnimations','Total','SwitchToggleRange','playOnceParallelInterpreter','XhRJF','OptionsBgType','KyEvC','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','_onceParallelInterpreters','_margin','SystemSetWindowPadding','numActions','_targetOpacity','initDigitGrouping','integer','keypress','level','sparamFlat1','offsetY','requestFauxAnimation','ItemBackColor1','Flat2','getGamepads','padZero','PRINTSCREEN','processKeyboardDigitChange','EVA','StartID','AJElq','sparamRate','Sprite_Picture_loadBitmap','GoldRect','inputWindowRect','XlEjB','Game_Character_processMoveCommand','BnZmk','ColorDeath','GSzsz','EqXOO','EuVMH','SubfolderParse','lAtMU','_pauseSignSprite','Window_NameInput_cursorRight','uEfjI','randomInt','WIN_OEM_FJ_ROYA','qbMTm','INCIRC','isSmartEventCollisionOn','ParamArrow','$dataMap','currentClass','isOptionValid','CIRCUMFLEX','areButtonsOutsideMainUI','CoreEngine','IconSParam4','DigitGroupingLocale','PRINT','updateKeyText','mMCoS','canAttack','oNkZe','drawGoldItemStyle','_dimmerSprite','vertical','OptionsRect','ParseAllNotetags','initMembersCoreEngine','xHVzB','createButtonAssistWindow','bXnJE','oSnVw','bitmapHeight','OS_KEY','CKcVZ','F14','erasePicture','CustomParamType','ColorTPGauge2','NYBdh','xdQaJ','getColor','PDxLn','SHIFT','UUMoU','EndingID','nickname','XParamVocab8','ShowDevTools','TAB','processAlwaysEscape','hxqaW','Game_Picture_updateMove','pixelated','MAX_SAFE_INTEGER','TMNvB','RevertPreserveNumbers','Max','cursorRight','HOME','IconSParam8','checkSmartEventCollision','utwfd','stop','_mainSprite','_timerSprite','INOUTELASTIC','setBattleSystem','F24','MAT','_buttonAssistWindow','initCoreEngineScreenShake','mainAreaTop','_refreshBack','onEscapeSuccess','jQnOi','contentsOpacity','XParamVocab2','includes','_effectsContainer','prQML','style','XParamVocab1','checkSubstitute','wait','useDigitGrouping','IconXParam8','xPQaE','processKeyboardHome','updateWaitMode','createFauxAnimation','TILDE','_scene','onerror','pictureId','OUTELASTIC','PositionY','createFauxAnimationSprite','expGaugeColor1','commandWindowRows','GoldChange','coreEngineRepositionEnemies','ceil','paramName','parameters','Scene_Boot_loadSystemImages','Window_Base_drawIcon','_listWindow','status','_backSprite','drawText','QXCOy','TextManager_param','3374660qRPOoo','isAnimationPlaying','Scene_Equip_create','categoryWindowRect','XParameterFormula','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','CNT','_targetOffsetX','gaugeRate','addWindow','alwaysDash','makeEncounterCount','Game_System_initialize','textWidth','_baseTexture','createBackground','AllTroops','PositionX','lBKpS','hit','keyRepeatWait','xparamFlatJS','_coreEasingType','data/','makeCoreEngineCommandList','createTextState','F19','goldWindowRect','SystemLoadImages','renderNoMask','cursorPageup','pWVLE','showDevTools','_shakeDuration','ParseStateNotetags','TextJS','Mute','MDF','setMoveEasingType','XParamVocab0','normal','PLAY','windowPadding','_actorWindow','ExtractStrFromTroop','Scene_MenuBase_mainAreaTop','TGR','onButtonImageLoad','Game_Picture_move','UPUUH','_pagedownButton','ExportCurTroopText','EbQpc','TYfSX','width','push','_currentMap','xparamRate2','paramY','numRepeats','Enemy','setupValueFont','MainMenu','ARRAYNUM','updateScene','battlebacks2','_stored_tpGaugeColor2','_playTestFastMode','getInputButtonString','isPhysical','cursorDown','setupButtonImage','vohAP','ceQzb','updateMain','Window_StatusBase_drawActorSimpleStatus','getBackgroundOpacity','normalColor','ExportAllMapText','loadSystem','Param','exportAllMapStrings','_menuButton','remove','nextLevelExp','CLOSE_BRACKET','canUse','hpGaugeColor1','AYFWH','SPWdy','GoldOverlap','Spriteset_Base_destroy','_targetY','replace','MCR','963378ATavAQ','PTxLT','itemPadding','clearForcedGameTroopSettingsCoreEngine','Manual','createCustomBackgroundImages','retrieveFauxAnimation','string','fVCad','BuyRect','isNormalPriority','constructor','traitsPi','F23','rightArrowWidth','gaugeHeight','_clickHandler','inBattle','LevelUpFullMp','ModernControls','_coreEngineShakeStyle','runCombinedScrollingTextAsCode','fillText','Window_NameInput_cursorPagedown','platform','tufAW','jzXcj','isPointAnimationPlaying','aYwRi','height','AaOXB','BattleSystem','listWindowRect','updateOpacity','Game_Party_consumeItem','xdg-open','ItemRect','paramRate','abs','EditRect','RequireFocus','isBottomButtonMode','StatusEquipRect','bxvNU','subtitle','ColorMPCost','IXQYm','INOUTEXPO','RUAcA','Game_Actor_changeClass','Location','pagedownShowButton','makeActionList','alphabetic','applyForcedGameTroopSettingsCoreEngine','destroyCoreEngineMarkedBitmaps','yScrollLinkedOffset','Game_Action_setAttack','QybBY','Show\x20Scrolling\x20Text\x20Script\x20Error','setAnchor','battlebacks1','ctGaugeColor1','Window_Base_drawText','nwoIU','paramMax','eGtLE','MODECHANGE','updatePositionCoreEngine','INQUINT','cgfYO','Graphics','buttonAssistWindowRect','originalJS','BoxMargin','_stored_powerUpColor','IconXParam5','kpQFO','hDZvD','updateDocumentTitle','BlurFilter','RPGMAKER_VERSION','jsQuickFunc','_defaultStretchMode','match','IconSParam3','itypeId','refreshDimmerBitmap','deflate','_duration','ColorExpGauge2','Window_Base_update','slotWindowRect','NVUpz','BgFilename1','ZHwIt','_categoryWindow','X:\x20%1','split','paramchangeTextColor','makeCommandList','_baseSprite','TJVMC','ConvertParams','setupRate','Game_Troop_setup','_troopId','child_process','_pointAnimationSprites','getPointAnimationLayer','ExtractStrFromList','Upper\x20Left','removeOnceParallelInterpreter','Bitmap_fillRect','HelpBgType','alpha','vAjOs','MryYO','WIN_OEM_PA2','NewGameBoot','PTB','ldgQh','OTYXf','currentValue','application/json','destroyed','F12','updateMove','_hideTileShadows','pyzin','Bitmap_drawTextOutline','ActorTPColor','SkillTypeBgType','NameMenu','Window_Selectable_processCursorMove','Game_Picture_initBasic','battleSystem','applyEasing','PictureEraseAll','IconXParam4','VSzYm','maxBattleMembers','txTFM','SParamVocab2','targetOpacity','AnimationMirrorOffset','_clientArea','sin','Game_Interpreter_command105','prototype','sMjxm','zSllZ','INOUTBOUNCE','command122','KCoGS','numberWindowRect','tIjrW','ZERO','OpenConsole','_pressed','_itemWindow','getButtonAssistLocation','_bitmap','PAUSE','GRD','WIN_OEM_FJ_MASSHOU','ZQNUs','xparamPlus1','wycdx','drawActorExpGauge','rowSpacing','END','kbebh','%1\x0a','processHandling','startMove','PGDN','updatePictureCoordinates','_createInternalTextures','ExtJS','movePageButtonSideButtonLayout','ItemBgType','zdBPm','BattleManager_update','repeat','ENTER_SPECIAL','Chance','eva','_moveEasingType','_stored_maxLvGaugeColor1','tUnli','removeChild','F7key','addCommand','CommonEventID','Window_Selectable_cursorDown','isPlaytest','Scene_Battle_createCancelButton','PictureCoordinatesMode','_lastOrigin','tyrkP','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','CustomParamAbb','eSgiQ','Window_Selectable_processTouch','Sprite_Picture_updateOrigin','Game_Temp_initialize','mainAreaHeight','exp','ScaleY','skipBranch','Game_Picture_show','StatusParamsRect','ENTER','EXSEL','GBUnt','_setupEventHandlers','isMVAnimation','version','CallHandlerJS','ACCEPT','expGaugeColor2','createCommandWindow','EncounterRateMinimum','EditBgType','setBackgroundType','loadPicture','updatePadding','RDOAW','_statusParamsWindow','F11','value','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','_stored_systemColor','EXR','Input_setupEventHandlers','innerHeight','Linear','actorWindowRect','_pictureContainer','playMiss','sv_enemies','floor','Plus1','isOpenAndActive','playCursorSound','LNGkw','OUTBOUNCE','_stored_mpGaugeColor1','_battleField','INEXPO','defineProperty','PictureFilename','Window_Base_initialize','xparamPlus2','FadeSpeed','_stored_gaugeBackColor','repositionCancelButtonSideButtonLayout','DOUBLE_QUOTE','Game_Action_itemEva','setupCoreEasing','isHandled','PreserveNumbers','lAtdO','SaveMenu','send','Rate','oXrOU','CLOSE_PAREN','_closing','systemColor','NUM','sqrt','quit','worldTransform','gCiNU','CodeJS','xparamPlus','test','TextCodeNicknames','setMainFontSize','》Comment《\x0a%1\x0a','onDatabaseLoaded','QwertyLayout','measureTextWidthNoRounding','updateOnceParallelInterpreters','ParseTilesetNotetags','QBiuK','ParseActorNotetags','move','ntFdd','INOUTSINE','toFixed','_optionsWindow','FontSize','iTTWV','WIN_OEM_WSCTRL','KroYU','DECIMAL','Game_BattlerBase_initMembers','WIN_OEM_CLEAR','_buttonType','maxLvGaugeColor1','BgFilename2','MRF','targetObjects','_statusEquipWindow','GameEnd','cos','skillTypeWindowRect','fillRect','processKeyboardEnd','titles1','ESC','isMaxLevel','mute','GoldBgType','IconParam0','_stored_mpGaugeColor2','isAnimationForEach','top','DATABASE','qVrPz','return\x200','loadTitle2','bitmap','isRightInputMode','loadWindowskin','_subject','targets','isSideView','iconWidth','gold','([\x5c+\x5c-]\x5cd+)([%％])>','zoSwP','ItemStyle','sceneTerminationClearEffects','reduce','playLoad','IconXParam7','Control\x20Variables\x20Script\x20Error','ExportAllTroopText','WIN_OEM_JUMP','setCoreEngineUpdateWindowBg','RepositionActors','pow','item','animationBaseDelay','buttonAssistKey5','missed','Plus2','targetContentsOpacity','VisuMZ_2_BattleSystemFTB','iDAja','ktsYe','randomJS','ZmRoO','rPSRQ','STRUCT','isGamepadConnected','lSGHg','iDppQ','processTimingData','IrnGl','Flat','pDsFH','duration','DashToggleR','Khkuy','textAlign','_targetOffsetY','PixelateImageRendering','TPB\x20WAIT','DigitGroupingExText','isSpecialCode','ShowJS','transform','numberShowButton','KGRWu','key%1','_backSprite2','AnimationID','_opacity','context','index','WIN_OEM_FINISH','_goldWindow','InputBgType','KeyTAB','Actor','maxLevel','anchor','isMapScrollLinked','ParseClassNotetags','_stored_mpCostColor','concat','paramX','App','dICLm','AnimationPoint','show','SkillMenu','animationShouldMirror','OUTCIRC','innerWidth','FontShadows','PLUS','Symbol','_skillTypeWindow','LUK','isKeyItem','LESS_THAN','YFYGi','27898568vHpkqo','IxFRO','Bitmap_strokeRect','onKeyDown','_data','JUNJA','retrievePointAnimation','currentLevelExp','Tilemap_addShadow','StatusRect','ATndH','requestMotion','AoITV','command355','setClickHandler','OPEN_CURLY_BRACKET','itemHeight','Title','_windowLayer','IconXParam0','moveMenuButtonSideButtonLayout','liZAT','Window_NameInput_cursorLeft','commandWindowRect','pages','isGamepadButtonPressed','JSON','createJsQuickFunction','redraw','Graphics_centerElement','Scene_GameEnd_createBackground','buttonAssistOffset3','DefaultStyle','OkText','_editWindow','command357','NewGameCommonEventAll','WxOiU','keyCode','setAttack','rgba(0,\x200,\x200,\x200.7)','cursorPagedown','keyboard','Untitled','MAXMP','drawGameVersion','ExportString','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','buttonAssistCancel','helpWindowRect','BTestItems','pivMy','mirror','switchModes','outbounce','SmartEventCollisionPriority','WImGL','_stored_tpGaugeColor1','filter','vbfJw','xparamRateJS','_mode','ImprovedAccuracySystem','profileWindowRect','bgs','ATTN','LwQgP','processKeyboardBackspace','addOnceParallelInterpreter','buttonAssistOk','original','Game_BattlerBase_refresh','deathColor','HANJA','XParamVocab4','bnzIc','ParseItemNotetags','gepui','ItemPadding','ColorCTGauge2','jsonToZip','IconParam7','ConvertNumberToString','OUTEXPO','RepositionEnemies130','damageColor','Game_Screen_initialize','qmukg','StatusEquipBgType','updateTransform','Scene_Map_createSpritesetFix','_offsetY','_isWindow','_CoreEngineSettings','_commandWindow','processTouchModernControls','faceHeight','DGPjn','PictureShowIcon','makeFontBigger','uiAreaWidth','ColorTPCost','SParamVocab8','ActorRect','_stored_powerDownColor','Game_Action_updateLastTarget','OUTQUINT','setLastPluginCommandInterpreter','ChRYn','sevEX','_origin','format','_pictureCoordinatesMode','eMAvk','F21','drawSegment','buttonAssistText1','iconHeight','min','win32','xzjzL','xAMiW','SELECT','setSideView','displayX','scale','applyCoreEasing','OutlineColorGauge','DigitGroupingGaugeSprites','clone','NewGameCommonEvent','vertJS','CustomParamIcons','apply','ColorMPGauge2','moXVt','windowOpacity','ETB','name','helpAreaTop','image-rendering','clamp','learnings','mmp','number','EggXN','DELETE','touchUI','_isPlaytest','OnLoadJS','removeFauxAnimation','F15','VOLUME_UP','IconSParam0','GoldFontSize','SParamVocab4','statusParamsWindowRect','drawActorClass','ColorHPGauge2','PositionJS','dashToggle','createChildSprite','offsetX','helpAreaHeight','filters','strokeRect','Pixelated','HzUwN','KwnLq','PHA','ButtonFadeSpeed','en-US','boxHeight','Plus','GzGVl','tpColor','pagedown','FCyMu','Game_Interpreter_command111','_shouldPreventDefault','skillId','max','SParameterFormula','_mapNameWindow','crisisColor','Window_StatusBase_drawActorLevel','Scene_Battle_update','FUNC','StatusMenu','note','dQNFV','_slotWindow','_opening','F17','%1〘Choice\x20%2〙\x20%3%1','iVAnP','BTestArmors','processEscape','Window_NameInput_cursorDown','bPgMA','WIN_ICO_00','\x0a\x0a\x0a\x0a\x0a','shake','_inputWindow','isMaskingEnabled','CONTEXT_MENU','AxnzO','BTB','itemBackColor1','IconSParam6','select','2743160sksuSa','BattleManager_processEscape','GmNod','_profileWindow','ImgLoad','_registerKeyInput','EEomV','setActionState','BACKSPACE','visible','Layer','FunctionName','NUMPAD6','ActorMPColor','Game_Actor_paramBase','DwfXf','ParseEnemyNotetags','playBuzzer','onload','ProfileBgType','yzyUI','drawRightArrow','xepNe','updatePositionCoreEngineShakeHorz','createCustomParameter','Window_NameInput_processHandling','_scaleX','SellBgType','enableDigitGrouping','create','IlPbD','eTcCe','LoadError','yhOFd','paramFlatBonus','onLoad','process_VisuMZ_CoreEngine_Notetags','VOLUME_DOWN','createWindowLayer','SParamVocab0','ScreenShake','loadMapData','Page','charCode','cOGRC','Scene_Shop_create','INOUTBACK','createCancelButton','opJMj','NUMPAD5','isPressed','STB','Scene_Boot_onDatabaseLoaded','Scene_Name_onInputOk','updatePositionCoreEngineShakeOriginal','DimColor2','changeTextColor','shift','playTestF7','〘Common\x20Event\x20%1:\x20%2〙\x20End','Type','up2','_lastX','MulVF','_repositioned','fBYnn','makeTargetSprites','Sprite_Battler_startMove','snapForBackground','displayY','currencyUnit','BuyBgType','setEasingType','EREOF','paramPlusJS','isItemStyle','rfNnt','mpGaugeColor1','Scene_MenuBase_createBackground','DamageColor','Gold','startAutoNewGame','dmyCb','adzWw','_animation','updatePosition','INOUTQUAD','thfpx','itemRect','faces','_internalTextures','aGBYy','XParamVocab6','Bitmap_clearRect','setEnemyAction','ahseJ','Sprite_Button_updateOpacity','drawItem','WIN_OEM_FJ_LOYA','_action','CRSEL','VisuMZ_2_BattleSystemSTB','SystemSetSideView','Sprite_Animation_setViewport','BaseTexture','clearRect','_spriteset','exec','Enable','EnableJS','qQQuC','updateData','Duration','Power','_helpWindow','Scene_Item_create','maxLvGaugeColor2','font','drawGameTitle','cursorUp','TitlePicButtons','AntiZoomPictures','_active','PajdN','Settings','Spriteset_Base_update','_refreshPauseSign','targetEvaRate','HBAqc','animationNextDelay','Bitmap_initialize','URL','resize','ColorPowerDown','ColorExpGauge1','darwin','CQLRu','Window_Base_drawFace','canEquip','_commandList','QBTJs','ParamName','animations','pSmaW','updateShadow','QSQhV','_stored_pendingColor','onInputBannedWords','JCVwi','%1〘End\x20Choice\x20Selection〙%1','hVRkx','mhp','iFOtE','smallParamFontSize','BlendMode','pointY','paramValueByName','nah','KANA','drawTextTopAligned','restore','paramFlat','_encounterCount','loadIconBitmap','%1%2','process_VisuMZ_CoreEngine_jsQuickFunctions','img/%1/','isAnimationOffsetXMirrored','ASTERISK','encounterStepsMinimum','repositionEnemiesByResolution','inbounce','Wait','setActorHomeRepositioned','isUseModernControls','NrTPT','setSideButtonLayout','optSideView','REPLACE','KeyboardInput','_targetX','nIVaA','pageup','SkillTypeRect','【%1】\x0a','traitObjects','ExtractStrFromMap','ctrl','CTB','home','EQUALS','text','bVggb','mjxNV','buttonAssistSwitch','DefaultMode','NEAREST','KEEP','buttonAssistWindowButtonRect','Scene_Title_drawGameTitle','HASH','jTfJx','JLJWz','setValue','aeApJ','onNameOk','Scene_Boot_updateDocumentTitle','pictures','reserveCommonEvent','Scene_Base_createWindowLayer','moveRelativeToResolutionChange','IconXParam2','itemHit','_targetAnchor','CLEAR','translucentOpacity','VisuMZ_2_BattleSystemPTB','blt','drawActorLevel','getCombinedScrollingText','scaleMode','VlaRj','length','SParamVocab3','OPEN_BRACKET','DXyuK','setMute','drawGameSubtitle','outlineColorGauge','OkgRz','LMTvV','doesNameContainBannedWords','allowShiftScrolling','tpCostColor','UpdatePictureCoordinates','clearStencil','_stored_ctGaugeColor2','popScene','createDigits','puGYD','INOUTQUINT','Game_Picture_y','Graphics_defaultStretchMode','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_rate','TubCD','sparam','LevelUpFullHp','MEV','enter','UtoCd','updateMainMultiply','calcCoreEasing','\x5c}❪SHIFT❫\x5c{','initialBattleSystem','Game_Picture_x','pendingColor','start','render','PRESERVCONVERSION(%1)','contents','updatePlayTestF7','isCursorMovable','HHqFr','_stored_tpCostColor','buttonAssistKey2','Sprite_destroy','picture','MenuLayout','OUTQUART','useDigitGroupingEx','ColorCTGauge1','enable','ahCZf','_pictureName','parseForcedGameTroopSettingsCoreEngine','ColorMaxLvGauge1','isNumpadPressed','_cacheScaleY','_shakePower','ColorMaxLvGauge2','F22','WIN_OEM_AUTO','Bitmap_blt','DzMYY','MAX_GL_TEXTURES','DGrMY','MDR','Spriteset_Base_updatePosition','PGUP','_forcedTroopView','TRAIT_PARAM','Window_EquipItem_isEnabled','mLNQT','Sprite_AnimationMV_updatePosition','updateEffekseer','refresh','sparamRateJS','YzNZD','processTouch','gaugeLineHeight','_animationQueue','WQXtT','scaleSprite','system','_blank','Color','_dummyWindow','processCursorHomeEndTrigger','buttonAssistOffset1','Window','addLoadListener','terminate','qgtdV','DLLYs','OfeJG','TimeProgress','<JS\x20%1\x20%2:[\x20](.*)>','SwitchRandomizeRange','horzJS','XJbaR','Scene_MenuBase_helpAreaTop','gaugeBackColor','buttonAssistText%1','zcCil','CommandRect','DKSRY','TRG','OUTQUAD','paramWidth','BTestAddedQuantity','IuAsA','BgType','xparamRate','HelpRect','MAXHP','Graphics_printError','Game_Action_numRepeats','PbtlD','batch','isSideButtonLayout','VisuMZ_2_BattleSystemOTB','_cache','defaultInputMode','ATK','measureTextWidth','statusWindowRect','viewport','usableSkills','xSGYK','_stored_normalColor','NONCONVERT','SParamVocab1','DEF','FPgrm','_hideButtons','buttons','Scene_Status_create','pointX','processMoveCommand','ShopMenu','processSoundTimings','7817690wsPCPQ','Window_NameInput_refresh','substring','beulc','hXqSF','TXyRJ','Smooth','origin','Renderer','determineSideButtonLayoutValid','ColorCrisis','ColorManager_loadWindowskin','encounterStep','xScrollLinkedOffset','tileWidth','NWcNF','Scene_Battle_createSpriteset','process_VisuMZ_CoreEngine_Settings','setWindowPadding','F18','map','PBdRw','IconSParam5','_height','Scene_Map_initialize','Abbreviation','hpGaugeColor2','390468OZYLni','Wcnyp','Rate1','VisuMZ_2_BattleSystemBTB','setCoreEngineScreenShakeStyle','setBackgroundOpacity','ApplyEasing','dIIJS','WSjEH','PictureEasingType','Scene_Base_terminate','_screenX','nw.gui','TPB\x20ACTIVE','1505574pNaqaB','getBattleSystem','BattleManager_checkSubstitute','YNkSj','GetParamIcon','isNwjs','onXhrError','buttonAssistKey1','_sideButtonLayout','MIN_SAFE_INTEGER','resetFontSettings','playCancel','OlpjY','tilesets','zCrPO','kKZsR','_actor','CategoryBgType','FTB','isEnemy','_movementDuration','Scene_MenuBase_createPageButtons','Version','Window_Base_drawCharacter','initMembers','TCR','IconSParam1','OTB','Scene_Boot_startNormalGame','setViewportCoreEngineFix','initCoreEasing','_numberWindow','vXmsV','Exported_Script_%1.txt','toLocaleString','ShortcutScripts','_colorCache','VisuMZ_1_BattleCore','_gamepadWait','togON','IconSParam9','_digitGroupingEx','ErPhF','SEMICOLON','SvfdF','disable','GoldMax','statusEquipWindowRect','CommandList','XWOrP','Game_Interpreter_command355','FINAL','YBOvu','maxItems','Game_Map_setup','gameTitle','9FZZLGs','_commonEventLayers','showPicture','destroy','mainAreaTopSideButtonLayout','_stored_deathColor','LJDyE','uVnFZ','down','Sprite_Button_initialize','OutlineColor','setHome','subject','markCoreEngineModified','evaded','targetSpritePosition','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','loadGameImagesCoreEngine','updatePositionCoreEngineShakeVert','kMgdg','optionsWindowRect','menuShowButton','OUTCUBIC','MVIdl','isCollidedWithEvents','buttonAssistOffset4','forceOutOfPlaytest','setGuard','exit','colSpacing','mapId','aufSh','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','BottomHelp','isInstanceOfSceneMap','createPointAnimation','adjustSprite','isSceneBattle','Window_NameInput_processTouch','IconParam1','_mirror','makeInputButtonString','setup','_storedMapText','Troop%1','lqOzF','levelUp','BannedWords','RightMenus','fFqQI','onMoveEnd','_cacheScaleX','qdsTX','ExportStrFromAllMaps','0.00','isDying','_width','SceneManager_isGameActive','end','VAVfV','subjectHitRate','globalAlpha','SystemSetBattleSystem','printError','NUunT','maxTp','enableDigitGroupingEx','paramPlus','AAKMy','ColSpacing','setActorHome','Window_NameInput_initialize','equips','process_VisuMZ_CoreEngine_CustomParameters','ProfileRect','ExportStrFromAllTroops','Window_Gold_refresh','RGXZQ','PA1','RXXra','Scene_Map_createSpriteset','itemWindowRect','VOLUME_MUTE','open','sv_actors','option','GEVxn','Scene_Base_create','isForFriend','sparamPlus1','INOUTCIRC','%1:\x20Exit\x20','_pointAnimationQueue','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','ZOOM','RpyzI','loadSystemImages','characters','Scene_Map_updateMainMultiply','Conditional\x20Branch\x20Script\x20Error','STENCIL_BUFFER_BIT','UEJLD','requestPointAnimation','useFontWidthFix','mpGaugeColor2','bgsVolume','jZrLj','position','levelUpRecovery','gradientFillRect','Key%1','SkdPS','_destroyInternalTextures','writeFile','catchLoadError','DataManager_setupNewGame','Window_Selectable_drawBackgroundRect','_pollGamepads','buttonAssistText2','TextCodeClassNames','_shakeSpeed','ARRAYJSON','_viewportSize','SCROLL_LOCK','isOpen','processDigitChange','add','command105','buttonAssistText5','Window_Selectable_cursorUp','createPageButtons','updateClose','animationId','RowSpacing','startNormalGame','Subtitle','adjustBoxSize','Lvrwx','yPzdQ','KeySHIFT','getLevel','INCUBIC','_hp','ItemMenu','updateMotion','setupFont','pressed','blockWidth','eVMyM','rgba(0,\x200,\x200,\x201.0)','BQiLg','stypeId','altKey','smooth','ColorTPGauge1','setCommonEvent','OptionsMenu','paramBaseAboveLevel99','none','pTjIP','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','_drawTextOutline','NUM_LOCK','_inputString','drawCharacter','oerYc','isFauxAnimationPlaying','toString','ARRAYFUNC','MTovP','ooOMu','overrideMimeType','tkJhC','cursorLeft','Sprite_Gauge_currentValue','INBOUNCE','slice','_list','_drawTextShadow','isTriggered','CONVERT','DigitGroupingStandardText','PERCENT','isExpGaugeDrawn','createPointAnimationSprite','buttonAreaHeight','BTestWeapons','textColor','result','PnoxO','buttonAssistKey%1','STENCIL_TEST','_storedStack','META','xparamFlatBonus','setupCoreEngine','parse','Scene_Skill_create','layoutSettings','Scene_Map_updateScene','(\x5cd+)>','SLEEP','isPlaying','param','SLASH','VRKHf','QoL','updateAnchor','getLastPluginCommandInterpreter','_muteSound','Map%1.json','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_makeFontNameText','setViewport','updatePositionCoreEngineShakeRand','ShowButtons','contains','bitmapWidth','GET','SCCmH','DisplayedParams','EQUAL','createPointAnimationTargets','EquipMenu','HIT','LoadMenu','15lVvSEN','_battlerName','Scene_Map_updateMain','〘Common\x20Event\x20%1:\x20%2〙\x20Start','SUBTRACT','RegExp','_anchor','indexOf','tab','DimColor1','EscapeAlways','XImHQ','clearOnceParallelInterpreters','addChild','framebuffer','tsxPw','kNEfp','playOk','isCancelled','stencilOp','seVolume','getInputMultiButtonStrings','process_VisuMZ_CoreEngine_RegExp','#%1','_fauxAnimationSprites','currentExp','OPEN_PAREN','ParseArmorNotetags','MultiKeyFmt','setupNewGame','sparamRate2','〘Scrolling\x20Text〙\x0a','_maxDigits','getCustomBackgroundSettings','qCSkf','volume','AllMaps','isNextScene','Scene_Unlisted','drawBackgroundRect','drawParamText','createTitleButtons','retreat','targetPosition','makeDocumentTitle','initialize','windowRect','areButtonsHidden','isSceneMap','isMagical','updateDashToggle','_tilemap','Window_NumberInput_processDigitChange','processKeyboardDelete','Sprite_AnimationMV_processTimingData','targetScaleX'];_0x4117=function(){return _0x4ccc07;};return _0x4117();}Sprite_TitlePictureButton[_0x17407e(0x374)]=Object[_0x17407e(0x56c)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton['prototype'][_0x17407e(0x2ea)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x17407e(0x374)][_0x17407e(0x829)]=function(_0x551cce){const _0x1d6a61=_0x17407e;Sprite_Clickable[_0x1d6a61(0x374)][_0x1d6a61(0x829)]['call'](this),this[_0x1d6a61(0x480)]=_0x551cce,this[_0x1d6a61(0x2ef)]=null,this[_0x1d6a61(0x744)]();},Sprite_TitlePictureButton[_0x17407e(0x374)][_0x17407e(0x744)]=function(){const _0x172ebd=_0x17407e;this['x']=Graphics['width'],this['y']=Graphics[_0x172ebd(0x2fc)],this[_0x172ebd(0x558)]=![],this[_0x172ebd(0x2c7)]();},Sprite_TitlePictureButton[_0x17407e(0x374)]['setupButtonImage']=function(){const _0xe5e9f2=_0x17407e;this['bitmap']=ImageManager[_0xe5e9f2(0x3c1)](this[_0xe5e9f2(0x480)][_0xe5e9f2(0x3db)]),this['bitmap'][_0xe5e9f2(0x686)](this[_0xe5e9f2(0x2af)]['bind'](this));},Sprite_TitlePictureButton[_0x17407e(0x374)][_0x17407e(0x2af)]=function(){const _0x2074ec=_0x17407e;this['_data'][_0x2074ec(0x511)][_0x2074ec(0x8eb)](this),this['_data'][_0x2074ec(0x51b)]['call'](this),this[_0x2074ec(0x48a)](this[_0x2074ec(0x480)][_0x2074ec(0x3ba)][_0x2074ec(0x9b5)](this));},Sprite_TitlePictureButton[_0x17407e(0x374)][_0x17407e(0x8dc)]=function(){const _0x2179d5=_0x17407e;Sprite_Clickable[_0x2179d5(0x374)][_0x2179d5(0x8dc)][_0x2179d5(0x8eb)](this),this['updateOpacity'](),this[_0x2179d5(0x67a)]();},Sprite_TitlePictureButton[_0x17407e(0x374)][_0x17407e(0x8ac)]=function(){const _0x2828f7=_0x17407e;return VisuMZ[_0x2828f7(0x21d)][_0x2828f7(0x5cb)][_0x2828f7(0x65b)][_0x2828f7(0x48d)][_0x2828f7(0x526)];},Sprite_TitlePictureButton[_0x17407e(0x374)]['updateOpacity']=function(){const _0xb56dda=_0x17407e;this[_0xb56dda(0x37e)]||this['_hovered']?this[_0xb56dda(0x84e)]=0xff:(this[_0xb56dda(0x84e)]+=this[_0xb56dda(0x558)]?this[_0xb56dda(0x8ac)]():-0x1*this[_0xb56dda(0x8ac)](),this[_0xb56dda(0x84e)]=Math['min'](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x17407e(0x374)][_0x17407e(0x48a)]=function(_0x3c6514){const _0x7c8903=_0x17407e;this[_0x7c8903(0x2ef)]=_0x3c6514;},Sprite_TitlePictureButton['prototype'][_0x17407e(0x8bc)]=function(){const _0x40224d=_0x17407e;this[_0x40224d(0x2ef)]&&this[_0x40224d(0x2ef)]();},VisuMZ[_0x17407e(0x21d)]['Spriteset_Base_initialize']=Spriteset_Base['prototype'][_0x17407e(0x829)],Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x829)]=function(){const _0x4f477d=_0x17407e;VisuMZ[_0x4f477d(0x21d)][_0x4f477d(0x8ec)][_0x4f477d(0x8eb)](this),this[_0x4f477d(0x22a)]();},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x22a)]=function(){const _0x144644=_0x17407e;this[_0x144644(0x814)]=[],this['_pointAnimationSprites']=[],this[_0x144644(0x74d)]=this[_0x144644(0x4f9)]['x'],this[_0x144644(0x665)]=this['scale']['y'];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x2db)]=Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x71d)],Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x71d)]=function(_0x240277){const _0x40ee87=_0x17407e;this['removeAllFauxAnimations'](),this['removeAllPointAnimations'](),VisuMZ[_0x40ee87(0x21d)][_0x40ee87(0x2db)][_0x40ee87(0x8eb)](this,_0x240277);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cc)]=Spriteset_Base[_0x17407e(0x374)]['update'],Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x8dc)]=function(){const _0x5077ee=_0x17407e;VisuMZ['CoreEngine'][_0x5077ee(0x5cc)][_0x5077ee(0x8eb)](this),this[_0x5077ee(0x9a3)](),this[_0x5077ee(0x1e5)](),this['updatePointAnimations']();},Spriteset_Base['prototype'][_0x17407e(0x9a3)]=function(){const _0x7b892d=_0x17407e;if(!VisuMZ[_0x7b892d(0x21d)][_0x7b892d(0x5cb)]['QoL'][_0x7b892d(0x5c8)])return;if(this[_0x7b892d(0x74d)]===this[_0x7b892d(0x4f9)]['x']&&this['_cacheScaleY']===this[_0x7b892d(0x4f9)]['y'])return;this[_0x7b892d(0x1e2)](),this[_0x7b892d(0x74d)]=this[_0x7b892d(0x4f9)]['x'],this[_0x7b892d(0x665)]=this[_0x7b892d(0x4f9)]['y'];},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x1e2)]=function(){const _0x33084d=_0x17407e;this[_0x33084d(0x4f9)]['x']!==0x0&&('xzjzL'!==_0x33084d(0x4f4)?this[_0x33084d(0x1ed)]=[]:(this[_0x33084d(0x3ce)][_0x33084d(0x4f9)]['x']=0x1/this[_0x33084d(0x4f9)]['x'],this[_0x33084d(0x3ce)]['x']=-(this['x']/this['scale']['x']))),this[_0x33084d(0x4f9)]['y']!==0x0&&(this['_pictureContainer'][_0x33084d(0x4f9)]['y']=0x1/this[_0x33084d(0x4f9)]['y'],this[_0x33084d(0x3ce)]['y']=-(this['y']/this[_0x33084d(0x4f9)]['y']));},VisuMZ['CoreEngine'][_0x17407e(0x66f)]=Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x5a4)],Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x5a4)]=function(){const _0xc70fd7=_0x17407e;VisuMZ['CoreEngine'][_0xc70fd7(0x66f)]['call'](this),this[_0xc70fd7(0x323)]();},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x323)]=function(){const _0x23fda5=_0x17407e;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x23fda5(0x909)]($gameScreen[_0x23fda5(0x546)]());const _0x488675=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x23fda5(0x8be)]()){case _0x23fda5(0x4c2):this[_0x23fda5(0x585)]();break;case'horizontal':this['updatePositionCoreEngineShakeHorz']();break;case _0x23fda5(0x227):this[_0x23fda5(0x72c)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x17407e(0x374)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x4ccf2c=_0x17407e,_0x564c2c=VisuMZ[_0x4ccf2c(0x21d)][_0x4ccf2c(0x5cb)]['ScreenShake'];if(_0x564c2c&&_0x564c2c[_0x4ccf2c(0x328)])return _0x564c2c[_0x4ccf2c(0x328)][_0x4ccf2c(0x8eb)](this);this['x']+=Math['round']($gameScreen[_0x4ccf2c(0x546)]());},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x7f0)]=function(){const _0x33cdd7=_0x17407e,_0x44e726=VisuMZ[_0x33cdd7(0x21d)][_0x33cdd7(0x5cb)][_0x33cdd7(0x577)];if(_0x44e726&&_0x44e726[_0x33cdd7(0x442)])return _0x44e726[_0x33cdd7(0x442)][_0x33cdd7(0x8eb)](this);const _0x161588=$gameScreen[_0x33cdd7(0x666)]*0.75,_0x37a8d1=$gameScreen[_0x33cdd7(0x792)]*0.6,_0x66bf5d=$gameScreen[_0x33cdd7(0x2a1)];this['x']+=Math[_0x33cdd7(0x909)](Math[_0x33cdd7(0x212)](_0x161588)-Math[_0x33cdd7(0x212)](_0x37a8d1))*(Math['min'](_0x66bf5d,0x1e)*0.5),this['y']+=Math[_0x33cdd7(0x909)](Math[_0x33cdd7(0x212)](_0x161588)-Math['randomInt'](_0x37a8d1))*(Math[_0x33cdd7(0x4f2)](_0x66bf5d,0x1e)*0.5);},Spriteset_Base['prototype'][_0x17407e(0x566)]=function(){const _0x1c2659=_0x17407e,_0x79e955=VisuMZ[_0x1c2659(0x21d)]['Settings'][_0x1c2659(0x577)];if(_0x79e955&&_0x79e955[_0x1c2659(0x68e)])return'GnAIh'!=='AOMMD'?_0x79e955[_0x1c2659(0x68e)][_0x1c2659(0x8eb)](this):this[_0x1c2659(0x1dd)]()&&this[_0x1c2659(0x7a8)]<this[_0x1c2659(0x5e6)]*_0x34cd17[_0x1c2659(0x21d)][_0x1c2659(0x5cb)][_0x1c2659(0x2d0)]['CrisisRate'];const _0xb2cee9=$gameScreen[_0x1c2659(0x666)]*0.75,_0x4710e2=$gameScreen[_0x1c2659(0x792)]*0.6,_0x23369c=$gameScreen[_0x1c2659(0x2a1)];this['x']+=Math[_0x1c2659(0x909)](Math[_0x1c2659(0x212)](_0xb2cee9)-Math[_0x1c2659(0x212)](_0x4710e2))*(Math[_0x1c2659(0x4f2)](_0x23369c,0x1e)*0.5);},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x72c)]=function(){const _0x155d76=_0x17407e,_0x2c643a=VisuMZ[_0x155d76(0x21d)]['Settings']['ScreenShake'];if(_0x2c643a&&_0x2c643a['vertJS'])return _0x2c643a[_0x155d76(0x4ff)]['call'](this);const _0x91b4b6=$gameScreen[_0x155d76(0x666)]*0.75,_0x1a9893=$gameScreen[_0x155d76(0x792)]*0.6,_0x443cdc=$gameScreen['_shakeDuration'];this['y']+=Math[_0x155d76(0x909)](Math[_0x155d76(0x212)](_0x91b4b6)-Math['randomInt'](_0x1a9893))*(Math[_0x155d76(0x4f2)](_0x443cdc,0x1e)*0.5);},Spriteset_Base['prototype']['updateFauxAnimations']=function(){const _0x3e305c=_0x17407e;for(const _0x1da8cd of this[_0x3e305c(0x814)]){!_0x1da8cd[_0x3e305c(0x7e4)]()&&this[_0x3e305c(0x512)](_0x1da8cd);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x8f2)]=function(){const _0x4435c2=_0x17407e;for(;;){if(_0x4435c2(0x440)!==_0x4435c2(0x31f)){const _0x345a67=$gameTemp[_0x4435c2(0x2e5)]();if(_0x345a67)_0x4435c2(0x32d)===_0x4435c2(0x360)?this[_0x4435c2(0x939)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x4435c2(0x4f9)]['x'],'targetScaleY':this[_0x4435c2(0x4f9)]['y'],'targetOpacity':this[_0x4435c2(0x84e)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x4435c2(0x25b)]}:this['createFauxAnimation'](_0x345a67);else break;}else{if(this[_0x4435c2(0x5b2)][_0x4435c2(0x772)]())return![];return _0x12650f[_0x4435c2(0x21d)]['BattleManager_checkSubstitute']['call'](this,_0x38b23f);}}},Spriteset_Base['prototype'][_0x17407e(0x269)]=function(_0x19274e){const _0x1efc5d=_0x17407e,_0x5253f4=$dataAnimations[_0x19274e[_0x1efc5d(0x79e)]],_0x554131=_0x19274e['targets'],_0x18c184=_0x19274e[_0x1efc5d(0x4b0)],_0x2f302e=_0x19274e['mute'];let _0x49630e=this['animationBaseDelay']();const _0xbb9543=this[_0x1efc5d(0x5d0)]();if(this[_0x1efc5d(0x41e)](_0x5253f4))for(const _0x1ee369 of _0x554131){this[_0x1efc5d(0x270)]([_0x1ee369],_0x5253f4,_0x18c184,_0x49630e,_0x2f302e),_0x49630e+=_0xbb9543;}else _0x1efc5d(0x2b5)!==_0x1efc5d(0x93d)?this[_0x1efc5d(0x270)](_0x554131,_0x5253f4,_0x18c184,_0x49630e,_0x2f302e):_0x5a47b2[_0x1efc5d(0x233)](_0x2abe0a);},Spriteset_Base[_0x17407e(0x374)]['createFauxAnimationSprite']=function(_0x2118a5,_0x31d44d,_0x1d498a,_0x523551,_0x1b1df3){const _0x4775f7=_0x17407e,_0x5c702e=this[_0x4775f7(0x3b8)](_0x31d44d),_0x5ad89b=new(_0x5c702e?Sprite_AnimationMV:Sprite_Animation)(),_0x462467=this[_0x4775f7(0x591)](_0x2118a5);this[_0x4775f7(0x471)](_0x2118a5[0x0])&&(_0x4775f7(0x54a)===_0x4775f7(0x84b)?this['backOpacity']=_0x4fa1db[_0x4775f7(0x504)]():_0x1d498a=!_0x1d498a),_0x5ad89b['targetObjects']=_0x2118a5,_0x5ad89b['setup'](_0x462467,_0x31d44d,_0x1d498a,_0x523551),_0x5ad89b[_0x4775f7(0x631)](_0x1b1df3),this[_0x4775f7(0x25e)][_0x4775f7(0x809)](_0x5ad89b),this[_0x4775f7(0x814)][_0x4775f7(0x2b7)](_0x5ad89b);},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x512)]=function(_0x47c182){const _0xcf03f2=_0x17407e;this['_fauxAnimationSprites']['remove'](_0x47c182),this[_0xcf03f2(0x25e)][_0xcf03f2(0x39e)](_0x47c182);for(const _0x221499 of _0x47c182[_0xcf03f2(0x410)]){if('VjPFk'!==_0xcf03f2(0x208))_0x221499[_0xcf03f2(0x85c)]&&_0x221499[_0xcf03f2(0x85c)]();else return _0x2c7dfb[_0xcf03f2(0x21d)][_0xcf03f2(0x550)]['call'](this);}_0x47c182[_0xcf03f2(0x71d)]();},Spriteset_Base[_0x17407e(0x374)]['removeAllFauxAnimations']=function(){const _0x447064=_0x17407e;for(const _0x1e51cd of this[_0x447064(0x814)]){this[_0x447064(0x512)](_0x1e51cd);}},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x7c0)]=function(){const _0x220db6=_0x17407e;return this[_0x220db6(0x814)][_0x220db6(0x62d)]>0x0;},Spriteset_Base[_0x17407e(0x374)]['updatePointAnimations']=function(){const _0x40548f=_0x17407e;for(const _0xbe2e4 of this[_0x40548f(0x34b)]){!_0xbe2e4[_0x40548f(0x7e4)]()&&(_0x40548f(0x897)===_0x40548f(0x716)?!_0xdf0741[_0x40548f(0x4d8)]&&_0x45a3e6[_0x40548f(0x558)]&&_0x378b07[_0x40548f(0x651)](_0x160a4a):this['removePointAnimation'](_0xbe2e4));}this[_0x40548f(0x85b)]();},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x85b)]=function(){const _0x23d4ac=_0x17407e;for(;;){if('UfPUX'===_0x23d4ac(0x444))_0x3be054[_0x23d4ac(0x8fb)]&&(this[_0x23d4ac(0x8d2)]=_0x23d4ac(0x60b));else{const _0x513e72=$gameTemp[_0x23d4ac(0x482)]();if(_0x513e72){if(_0x23d4ac(0x3c3)==='RDOAW')this['createPointAnimation'](_0x513e72);else{const _0x4fcb6b=_0xe0b44b[_0x23d4ac(0x219)]()[_0x23d4ac(0x506)][_0x23d4ac(0x2dd)](/\\I\[(\d+)\]/gi,'');this[_0x23d4ac(0x27d)](_0x4fcb6b,_0x2f3b8b,_0x5b02bd,_0x1998f8);}}else{if(_0x23d4ac(0x5aa)===_0x23d4ac(0x5aa))break;else _0x4c2b50[_0x23d4ac(0x21d)][_0x23d4ac(0x47e)]['call'](this,_0x34c3c3,_0x2ff9f3,_0x32c778,_0x5119ef,_0x16738c),this[_0x23d4ac(0x727)]();}}}},Spriteset_Base['prototype'][_0x17407e(0x73d)]=function(_0x582e13){const _0x1ce0df=_0x17407e,_0x421568=$dataAnimations[_0x582e13[_0x1ce0df(0x79e)]],_0x4a4853=this[_0x1ce0df(0x7f8)](_0x582e13),_0x1bb33a=_0x582e13[_0x1ce0df(0x4b0)],_0x1c1041=_0x582e13[_0x1ce0df(0x41a)];let _0x4c215a=this[_0x1ce0df(0x43a)]();const _0x3d73f1=this['animationNextDelay']();if(this[_0x1ce0df(0x41e)](_0x421568))for(const _0x5ccde6 of _0x4a4853){this[_0x1ce0df(0x7d2)]([_0x5ccde6],_0x421568,_0x1bb33a,_0x4c215a,_0x1c1041),_0x4c215a+=_0x3d73f1;}else this['createPointAnimationSprite'](_0x4a4853,_0x421568,_0x1bb33a,_0x4c215a,_0x1c1041);},Spriteset_Base[_0x17407e(0x374)]['createPointAnimationTargets']=function(_0x380ab6){const _0x3d2890=_0x17407e,_0x38ca62=new Sprite_Clickable();_0x38ca62['x']=_0x380ab6['x'],_0x38ca62['y']=_0x380ab6['y'],_0x38ca62['z']=0x64;const _0x35ff60=this[_0x3d2890(0x34c)]();return _0x35ff60[_0x3d2890(0x809)](_0x38ca62),[_0x38ca62];},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x34c)]=function(){return this;},Spriteset_Map['prototype']['getPointAnimationLayer']=function(){const _0xa5b2ae=_0x17407e;return this[_0xa5b2ae(0x82f)]||this;},Spriteset_Battle['prototype'][_0x17407e(0x34c)]=function(){const _0x5a8fa2=_0x17407e;return this[_0x5a8fa2(0x3d8)]||this;},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x7d2)]=function(_0x345a39,_0x1e90d8,_0x1543d4,_0xcce59a,_0x4f8829){const _0x344197=_0x17407e,_0x362b6c=this[_0x344197(0x3b8)](_0x1e90d8),_0x3ef491=new(_0x362b6c?Sprite_AnimationMV:Sprite_Animation)();_0x3ef491['targetObjects']=_0x345a39,_0x3ef491['setup'](_0x345a39,_0x1e90d8,_0x1543d4,_0xcce59a),_0x3ef491[_0x344197(0x631)](_0x4f8829),this[_0x344197(0x25e)]['addChild'](_0x3ef491),this['_pointAnimationSprites'][_0x344197(0x2b7)](_0x3ef491);},Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x8ae)]=function(_0x3c9309){const _0x2d1a31=_0x17407e;this[_0x2d1a31(0x34b)][_0x2d1a31(0x2d3)](_0x3c9309),this[_0x2d1a31(0x25e)][_0x2d1a31(0x39e)](_0x3c9309);for(const _0x4a726d of _0x3c9309[_0x2d1a31(0x410)]){_0x4a726d[_0x2d1a31(0x85c)]&&(_0x2d1a31(0x4f5)!==_0x2d1a31(0x4f5)?_0x3d6e72[_0x2d1a31(0x21d)]['Sprite_Animation_setViewport']['call'](this,_0x3f2664):_0x4a726d[_0x2d1a31(0x85c)]());const _0x1f6b08=this[_0x2d1a31(0x34c)]();if(_0x1f6b08)_0x1f6b08[_0x2d1a31(0x39e)](_0x4a726d);}_0x3c9309['destroy']();},Spriteset_Base['prototype'][_0x17407e(0x92a)]=function(){const _0x5c6500=_0x17407e;for(const _0x239983 of this[_0x5c6500(0x34b)]){this[_0x5c6500(0x8ae)](_0x239983);}},Spriteset_Base['prototype'][_0x17407e(0x2fa)]=function(){const _0x3bbc23=_0x17407e;return this[_0x3bbc23(0x34b)][_0x3bbc23(0x62d)]>0x0;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8cd)]=Spriteset_Base['prototype']['isAnimationPlaying'],Spriteset_Base[_0x17407e(0x374)][_0x17407e(0x281)]=function(){const _0x3c6b71=_0x17407e;return VisuMZ[_0x3c6b71(0x21d)]['Spriteset_Base_isAnimationPlaying'][_0x3c6b71(0x8eb)](this)||this[_0x3c6b71(0x2fa)]();},Spriteset_Battle['prototype'][_0x17407e(0x28f)]=function(){const _0x3f9134=_0x17407e;this[_0x3f9134(0x1ba)]=new PIXI[(_0x3f9134(0x520))][(_0x3f9134(0x32f))](clamp=!![]),this[_0x3f9134(0x8a3)]=new Sprite(),this[_0x3f9134(0x8a3)]['bitmap']=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x3f9134(0x520)]=[this[_0x3f9134(0x1ba)]],this[_0x3f9134(0x344)]['addChild'](this['_backgroundSprite']);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x86f)]=Spriteset_Battle['prototype'][_0x17407e(0x947)],Spriteset_Battle['prototype'][_0x17407e(0x947)]=function(){const _0x50e0d3=_0x17407e;this[_0x50e0d3(0x274)]()&&this[_0x50e0d3(0x5f9)](),VisuMZ['CoreEngine'][_0x50e0d3(0x86f)]['call'](this);},Spriteset_Battle[_0x17407e(0x374)][_0x17407e(0x274)]=function(){const _0x34da0d=_0x17407e,_0x3c6696=VisuMZ['CoreEngine'][_0x34da0d(0x5cb)][_0x34da0d(0x865)];if(!_0x3c6696)return![];if(Utils['RPGMAKER_VERSION']>='1.3.0'&&!_0x3c6696[_0x34da0d(0x4d0)]){if(_0x34da0d(0x610)!==_0x34da0d(0x630))return![];else _0x48914f['playOk']();}return _0x3c6696['RepositionEnemies'];},Spriteset_Battle['prototype']['repositionEnemiesByResolution']=function(){for(member of $gameTroop['members']()){member['moveRelativeToResolutionChange']();}},VisuMZ[_0x17407e(0x21d)]['Window_Base_initialize']=Window_Base[_0x17407e(0x374)][_0x17407e(0x829)],Window_Base[_0x17407e(0x374)][_0x17407e(0x829)]=function(_0x322c46){const _0x3133fa=_0x17407e;_0x322c46['x']=Math[_0x3133fa(0x909)](_0x322c46['x']),_0x322c46['y']=Math['round'](_0x322c46['y']),_0x322c46['width']=Math[_0x3133fa(0x909)](_0x322c46[_0x3133fa(0x2b6)]),_0x322c46[_0x3133fa(0x2fc)]=Math[_0x3133fa(0x909)](_0x322c46[_0x3133fa(0x2fc)]),this[_0x3133fa(0x1f2)](),VisuMZ[_0x3133fa(0x21d)][_0x3133fa(0x3dc)][_0x3133fa(0x8eb)](this,_0x322c46),this[_0x3133fa(0x700)]();},Window_Base[_0x17407e(0x374)][_0x17407e(0x1f2)]=function(){const _0x33f4e1=_0x17407e;this[_0x33f4e1(0x99f)]=VisuMZ[_0x33f4e1(0x21d)]['Settings'][_0x33f4e1(0x7e8)][_0x33f4e1(0x7cf)],this[_0x33f4e1(0x70b)]=VisuMZ[_0x33f4e1(0x21d)]['Settings'][_0x33f4e1(0x7e8)][_0x33f4e1(0x454)];},Window_Base['prototype']['lineHeight']=function(){const _0x5583bd=_0x17407e;return VisuMZ['CoreEngine'][_0x5583bd(0x5cb)]['Window']['LineHeight'];},Window_Base['prototype'][_0x17407e(0x2e1)]=function(){const _0x3f83e0=_0x17407e;return VisuMZ['CoreEngine'][_0x3f83e0(0x5cb)][_0x3f83e0(0x685)][_0x3f83e0(0x4ca)];},Window_Base[_0x17407e(0x374)]['updateBackOpacity']=function(){const _0x402eb7=_0x17407e;if($gameSystem[_0x402eb7(0x504)])_0x402eb7(0x8ce)!=='AniUZ'?(this[_0x402eb7(0x3ce)][_0x402eb7(0x4f9)]['y']=0x1/this[_0x402eb7(0x4f9)]['y'],this[_0x402eb7(0x3ce)]['y']=-(this['y']/this[_0x402eb7(0x4f9)]['y'])):this['backOpacity']=$gameSystem['windowOpacity']();else{if(_0x402eb7(0x656)!==_0x402eb7(0x9a0))this[_0x402eb7(0x8de)]=VisuMZ[_0x402eb7(0x21d)]['Settings'][_0x402eb7(0x685)]['BackOpacity'];else{const _0x4def99=this[_0x402eb7(0x473)]/0x5,_0x2d191e=_0x2148de[_0x402eb7(0x26b)],_0x52ce25=_0x2d191e[_0x402eb7(0x7d8)[_0x402eb7(0x4eb)](_0x5bdc0d)](),_0x2afc2a=_0x2d191e[_0x402eb7(0x692)[_0x402eb7(0x4eb)](_0x45d177)]();this[_0x402eb7(0x480)][_0x402eb7(0x45a)[_0x402eb7(0x4eb)](_0x246e20)]=_0x52ce25,this['_data'][_0x402eb7(0x8f8)[_0x402eb7(0x4eb)](_0x2636e9)]=_0x2afc2a;if(_0x52ce25==='')return;if(_0x2afc2a==='')return;const _0x5db059=_0x2d191e[_0x402eb7(0x90d)[_0x402eb7(0x4eb)](_0x5d6f0f)](),_0x5d65f2=this[_0x402eb7(0x2e1)](),_0x54f313=_0x4def99*(_0x4390ed-0x1)+_0x5d65f2+_0x5db059,_0x4db3c8=_0xa28369[_0x402eb7(0x21d)][_0x402eb7(0x5cb)][_0x402eb7(0x963)][_0x402eb7(0x960)];this[_0x402eb7(0x1e0)](_0x4db3c8[_0x402eb7(0x4eb)](_0x52ce25,_0x2afc2a),_0x54f313,0x0,_0x4def99-_0x5d65f2*0x2);}}},Window_Base[_0x17407e(0x374)][_0x17407e(0x626)]=function(){const _0x47967a=_0x17407e;return VisuMZ[_0x47967a(0x21d)][_0x47967a(0x5cb)][_0x47967a(0x685)]['TranslucentOpacity'];},Window_Base['prototype'][_0x17407e(0x8d5)]=function(){const _0x4db589=_0x17407e;return VisuMZ[_0x4db589(0x21d)][_0x4db589(0x5cb)]['Window'][_0x4db589(0x905)];},VisuMZ['CoreEngine'][_0x17407e(0x33a)]=Window_Base[_0x17407e(0x374)][_0x17407e(0x8dc)],Window_Base['prototype'][_0x17407e(0x8dc)]=function(){const _0x55e724=_0x17407e;VisuMZ['CoreEngine'][_0x55e724(0x33a)][_0x55e724(0x8eb)](this),this['updateCoreEasing']();},Window_Base[_0x17407e(0x374)][_0x17407e(0x8ed)]=function(){const _0x1d3e60=_0x17407e;this[_0x1d3e60(0x53c)]&&(this[_0x1d3e60(0x907)]+=this[_0x1d3e60(0x8d5)](),this['isOpen']()&&(this[_0x1d3e60(0x53c)]=![]));},Window_Base[_0x17407e(0x374)][_0x17407e(0x79d)]=function(){const _0x57873f=_0x17407e;this[_0x57873f(0x3ec)]&&(_0x57873f(0x7c3)!==_0x57873f(0x6ce)?(this[_0x57873f(0x907)]-=this['openingSpeed'](),this['isClosed']()&&(_0x57873f(0x555)===_0x57873f(0x321)?_0x521857[_0x57873f(0x21d)][_0x57873f(0x79b)]['call'](this,_0x38c514):this[_0x57873f(0x3ec)]=![])):(_0x1568ac[_0x57873f(0x1b1)](_0x57873f(0x31a)),_0x54218d[_0x57873f(0x1b1)](_0x25cbf4)));},VisuMZ[_0x17407e(0x21d)]['Window_Base_drawText']=Window_Base[_0x17407e(0x374)][_0x17407e(0x27d)],Window_Base[_0x17407e(0x374)][_0x17407e(0x27d)]=function(_0xaa7d03,_0x415bac,_0x1d0db8,_0x473212,_0x25f279){const _0x21a73c=_0x17407e;if(this[_0x21a73c(0x264)]())_0xaa7d03=VisuMZ[_0x21a73c(0x1d0)](_0xaa7d03);VisuMZ[_0x21a73c(0x21d)][_0x21a73c(0x31e)]['call'](this,_0xaa7d03,_0x415bac,_0x1d0db8,_0x473212,_0x25f279);},Window_Base[_0x17407e(0x374)][_0x17407e(0x264)]=function(){const _0x1d15fb=_0x17407e;return this[_0x1d15fb(0x99f)];},VisuMZ[_0x17407e(0x21d)]['Window_Base_createTextState']=Window_Base[_0x17407e(0x374)][_0x17407e(0x299)],Window_Base['prototype']['createTextState']=function(_0x345777,_0x502dff,_0x54088e,_0x2211d8){const _0xc3e852=_0x17407e;var _0xa4b04c=VisuMZ[_0xc3e852(0x21d)]['Window_Base_createTextState'][_0xc3e852(0x8eb)](this,_0x345777,_0x502dff,_0x54088e,_0x2211d8);if(this['useDigitGroupingEx']())_0xa4b04c[_0xc3e852(0x60e)]=VisuMZ['GroupDigits'](_0xa4b04c[_0xc3e852(0x60e)]);return _0xa4b04c;},Window_Base['prototype'][_0x17407e(0x65d)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x17407e(0x374)][_0x17407e(0x56b)]=function(_0x23591f){const _0x2ea8b2=_0x17407e;this[_0x2ea8b2(0x99f)]=_0x23591f;},Window_Base[_0x17407e(0x374)][_0x17407e(0x75c)]=function(_0x4a7c09){const _0x3498ad=_0x17407e;this[_0x3498ad(0x70b)]=_0x4a7c09;},VisuMZ['CoreEngine'][_0x17407e(0x279)]=Window_Base['prototype'][_0x17407e(0x857)],Window_Base[_0x17407e(0x374)][_0x17407e(0x857)]=function(_0x1517e1,_0x336eb2,_0x1d928c){const _0x1d9cac=_0x17407e;_0x336eb2=Math[_0x1d9cac(0x909)](_0x336eb2),_0x1d928c=Math[_0x1d9cac(0x909)](_0x1d928c),VisuMZ[_0x1d9cac(0x21d)][_0x1d9cac(0x279)]['call'](this,_0x1517e1,_0x336eb2,_0x1d928c);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5d8)]=Window_Base[_0x17407e(0x374)]['drawFace'],Window_Base[_0x17407e(0x374)][_0x17407e(0x89f)]=function(_0x84a390,_0x5d01a5,_0x1c3364,_0x4ae42e,_0x272357,_0x44ec04){const _0x433c75=_0x17407e;_0x272357=_0x272357||ImageManager[_0x433c75(0x954)],_0x44ec04=_0x44ec04||ImageManager[_0x433c75(0x4dc)],_0x1c3364=Math[_0x433c75(0x909)](_0x1c3364),_0x4ae42e=Math[_0x433c75(0x909)](_0x4ae42e),_0x272357=Math[_0x433c75(0x909)](_0x272357),_0x44ec04=Math[_0x433c75(0x909)](_0x44ec04),VisuMZ[_0x433c75(0x21d)]['Window_Base_drawFace'][_0x433c75(0x8eb)](this,_0x84a390,_0x5d01a5,_0x1c3364,_0x4ae42e,_0x272357,_0x44ec04);},VisuMZ['CoreEngine'][_0x17407e(0x6f9)]=Window_Base[_0x17407e(0x374)]['drawCharacter'],Window_Base[_0x17407e(0x374)][_0x17407e(0x7be)]=function(_0x1d35aa,_0x5675e2,_0x51390b,_0x37a8e3){const _0x3a3120=_0x17407e;_0x51390b=Math[_0x3a3120(0x909)](_0x51390b),_0x37a8e3=Math[_0x3a3120(0x909)](_0x37a8e3),VisuMZ[_0x3a3120(0x21d)][_0x3a3120(0x6f9)]['call'](this,_0x1d35aa,_0x5675e2,_0x51390b,_0x37a8e3);},VisuMZ['CoreEngine']['Window_Selectable_itemRect']=Window_Selectable['prototype'][_0x17407e(0x5a7)],Window_Selectable['prototype'][_0x17407e(0x5a7)]=function(_0x114755){const _0x41c7de=_0x17407e;let _0x46c44b=VisuMZ[_0x41c7de(0x21d)]['Window_Selectable_itemRect'][_0x41c7de(0x8eb)](this,_0x114755);return _0x46c44b['x']=Math['round'](_0x46c44b['x']),_0x46c44b['y']=Math[_0x41c7de(0x909)](_0x46c44b['y']),_0x46c44b[_0x41c7de(0x2b6)]=Math['round'](_0x46c44b[_0x41c7de(0x2b6)]),_0x46c44b[_0x41c7de(0x2fc)]=Math[_0x41c7de(0x909)](_0x46c44b[_0x41c7de(0x2fc)]),_0x46c44b;},VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase['prototype']['drawActorSimpleStatus'],Window_StatusBase['prototype'][_0x17407e(0x881)]=function(_0x5174a3,_0x5da21c,_0x2e31b4){const _0x5a7507=_0x17407e;_0x5da21c=Math[_0x5a7507(0x909)](_0x5da21c),_0x2e31b4=Math[_0x5a7507(0x909)](_0x2e31b4),VisuMZ['CoreEngine'][_0x5a7507(0x2cb)][_0x5a7507(0x8eb)](this,_0x5174a3,_0x5da21c,_0x2e31b4);},Window_Base[_0x17407e(0x374)][_0x17407e(0x700)]=function(){const _0x455634=_0x17407e;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x455634(0x4f9)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x455634(0x25b)]};},Window_Base['prototype'][_0x17407e(0x8d4)]=function(){const _0x22f875=_0x17407e;if(!this['_coreEasing'])return;if(this[_0x22f875(0x939)][_0x22f875(0x44d)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x22f875(0x939)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0x22f875(0x939)]['targetY']),this[_0x22f875(0x4f9)]['x']=this[_0x22f875(0x4fa)](this[_0x22f875(0x4f9)]['x'],this[_0x22f875(0x939)]['targetScaleX']),this[_0x22f875(0x4f9)]['y']=this['applyCoreEasing'](this[_0x22f875(0x4f9)]['y'],this['_coreEasing'][_0x22f875(0x99e)]),this['opacity']=this[_0x22f875(0x4fa)](this['opacity'],this['_coreEasing']['targetOpacity']),this['backOpacity']=this[_0x22f875(0x4fa)](this[_0x22f875(0x8de)],this[_0x22f875(0x939)][_0x22f875(0x973)]),this[_0x22f875(0x25b)]=this[_0x22f875(0x4fa)](this[_0x22f875(0x25b)],this['_coreEasing'][_0x22f875(0x43e)]),this[_0x22f875(0x939)][_0x22f875(0x44d)]--;},Window_Base[_0x17407e(0x374)][_0x17407e(0x4fa)]=function(_0x80cc1,_0x1f6c5b){const _0x20f14a=_0x17407e;if(!this[_0x20f14a(0x939)])return _0x1f6c5b;const _0x28f7a2=this[_0x20f14a(0x939)][_0x20f14a(0x44d)],_0x42f030=this['_coreEasing']['wholeDuration'],_0x3a614f=this[_0x20f14a(0x64b)]((_0x42f030-_0x28f7a2)/_0x42f030),_0x2a95d2=this['calcCoreEasing']((_0x42f030-_0x28f7a2+0x1)/_0x42f030),_0x15cb36=(_0x80cc1-_0x1f6c5b*_0x3a614f)/(0x1-_0x3a614f);return _0x15cb36+(_0x1f6c5b-_0x15cb36)*_0x2a95d2;},Window_Base['prototype'][_0x17407e(0x64b)]=function(_0x488d2c){const _0x4da9e3=_0x17407e;if(!this[_0x4da9e3(0x939)])return _0x488d2c;return VisuMZ[_0x4da9e3(0x6da)](_0x488d2c,this[_0x4da9e3(0x939)]['type']||'LINEAR');},Window_Base[_0x17407e(0x374)][_0x17407e(0x904)]=function(_0x3f23d1,_0x11a92c){const _0x12f6a5=_0x17407e;if(!this[_0x12f6a5(0x939)])return;this['x']=this[_0x12f6a5(0x939)]['targetX'],this['y']=this['_coreEasing']['targetY'],this[_0x12f6a5(0x4f9)]['x']=this['_coreEasing'][_0x12f6a5(0x833)],this[_0x12f6a5(0x4f9)]['y']=this['_coreEasing'][_0x12f6a5(0x99e)],this[_0x12f6a5(0x84e)]=this['_coreEasing'][_0x12f6a5(0x36f)],this[_0x12f6a5(0x8de)]=this[_0x12f6a5(0x939)][_0x12f6a5(0x973)],this['contentsOpacity']=this['_coreEasing'][_0x12f6a5(0x43e)],this[_0x12f6a5(0x3e3)](_0x3f23d1,_0x11a92c,this['x'],this['y'],this[_0x12f6a5(0x4f9)]['x'],this['scale']['y'],this['opacity'],this['backOpacity'],this[_0x12f6a5(0x25b)]);},Window_Base['prototype'][_0x17407e(0x3e3)]=function(_0x511f02,_0x4a8b92,_0x53171d,_0x5b724e,_0x5cdcaa,_0x269f01,_0x17d9ae,_0x4fb506,_0x12a6f2){const _0x1b42c1=_0x17407e;this[_0x1b42c1(0x939)]={'duration':_0x511f02,'wholeDuration':_0x511f02,'type':_0x4a8b92,'targetX':_0x53171d,'targetY':_0x5b724e,'targetScaleX':_0x5cdcaa,'targetScaleY':_0x269f01,'targetOpacity':_0x17d9ae,'targetBackOpacity':_0x4fb506,'targetContentsOpacity':_0x12a6f2};},Window_Base['prototype']['drawCurrencyValue']=function(_0x4966b0,_0x5ab659,_0x3da63c,_0x1d67a0,_0x2f6dd7){const _0x1179bd=_0x17407e;this[_0x1179bd(0x6ec)](),this[_0x1179bd(0x653)][_0x1179bd(0x1c5)]=VisuMZ['CoreEngine'][_0x1179bd(0x5cb)][_0x1179bd(0x59f)][_0x1179bd(0x516)];const _0x5b840a=VisuMZ['CoreEngine']['Settings'][_0x1179bd(0x59f)]['GoldIcon'];if(_0x5b840a>0x0&&_0x5ab659===TextManager[_0x1179bd(0x595)]){if(_0x1179bd(0x856)===_0x1179bd(0x856)){const _0x1063f5=_0x1d67a0+(this['lineHeight']()-ImageManager[_0x1179bd(0x4f1)])/0x2;this[_0x1179bd(0x857)](_0x5b840a,_0x3da63c+(_0x2f6dd7-ImageManager[_0x1179bd(0x42a)]),_0x1063f5),_0x2f6dd7-=ImageManager[_0x1179bd(0x42a)]+0x4;}else return 0x0;}else this['changeTextColor'](ColorManager[_0x1179bd(0x3ed)]()),this[_0x1179bd(0x27d)](_0x5ab659,_0x3da63c,_0x1d67a0,_0x2f6dd7,_0x1179bd(0x1ad)),_0x2f6dd7-=this[_0x1179bd(0x28d)](_0x5ab659)+0x6;this['resetTextColor']();const _0x209378=this['textWidth'](this['_digitGrouping']?VisuMZ['GroupDigits'](_0x4966b0):_0x4966b0);if(_0x209378>_0x2f6dd7){if(_0x1179bd(0x459)!==_0x1179bd(0x459)){if(typeof _0x1ae026==='number')return this[_0x1179bd(0x7e5)](_0x2624ba);_0x4d110c=_0xf256d0(_0x32b954||'')['toUpperCase']();if(_0x28faf0===_0x1179bd(0x69e))return this['param'](0x0);if(_0x1ddad===_0x1179bd(0x4a8))return this[_0x1179bd(0x7e5)](0x1);if(_0x5c9e71===_0x1179bd(0x6a7))return this[_0x1179bd(0x7e5)](0x2);if(_0x2b9ff3===_0x1179bd(0x6b0))return this[_0x1179bd(0x7e5)](0x3);if(_0x1e4c36===_0x1179bd(0x254))return this[_0x1179bd(0x7e5)](0x4);if(_0x3f6c5f===_0x1179bd(0x2a5))return this[_0x1179bd(0x7e5)](0x5);if(_0x36678c===_0x1179bd(0x970))return this[_0x1179bd(0x7e5)](0x6);if(_0x20f9f4===_0x1179bd(0x478))return this[_0x1179bd(0x7e5)](0x7);if(_0x5ea57a===_0x1179bd(0x7fa))return _0x3295d9?_0x5c582d(_0x44cbef[_0x1179bd(0x909)](this[_0x1179bd(0x88d)](0x0)*0x64))+'%':this[_0x1179bd(0x88d)](0x0);if(_0x7706a4===_0x1179bd(0x1ff))return _0x3b683a?_0x360797(_0x4ff06d['round'](this[_0x1179bd(0x88d)](0x1)*0x64))+'%':this[_0x1179bd(0x88d)](0x1);if(_0x5dea23===_0x1179bd(0x9b7))return _0x2b7b21?_0x92f3f6(_0x28d897['round'](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x57bd80===_0x1179bd(0x8b5))return _0x2512e8?_0x12aa68(_0x1fe3da[_0x1179bd(0x909)](this[_0x1179bd(0x88d)](0x3)*0x64))+'%':this[_0x1179bd(0x88d)](0x3);if(_0x2386a3===_0x1179bd(0x647))return _0x1b2e25?_0x2de9cf(_0x53b010[_0x1179bd(0x909)](this[_0x1179bd(0x88d)](0x4)*0x64))+'%':this[_0x1179bd(0x88d)](0x4);if(_0x39bdbb===_0x1179bd(0x40f))return _0x3b9df0?_0x4e2bc3(_0x16a2e1['round'](this[_0x1179bd(0x88d)](0x5)*0x64))+'%':this[_0x1179bd(0x88d)](0x5);if(_0x209970===_0x1179bd(0x286))return _0x5bebbc?_0x17379d(_0x2a2920[_0x1179bd(0x909)](this[_0x1179bd(0x88d)](0x6)*0x64))+'%':this[_0x1179bd(0x88d)](0x6);if(_0x1f11ba===_0x1179bd(0x88b))return _0x49a439?_0x47326e(_0x2889cc['round'](this[_0x1179bd(0x88d)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x47dbfe===_0x1179bd(0x1ce))return _0x8c00fb?_0x1f0a59(_0x5d15d6[_0x1179bd(0x909)](this['xparam'](0x8)*0x64))+'%':this[_0x1179bd(0x88d)](0x8);if(_0x3c2716===_0x1179bd(0x696))return _0x44ba2f?_0x30a71b(_0x2700f9['round'](this['xparam'](0x9)*0x64))+'%':this[_0x1179bd(0x88d)](0x9);if(_0x5252f0==='TGR')return _0x90c77b?_0x2e265f(_0x7994eb[_0x1179bd(0x909)](this[_0x1179bd(0x645)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x5989ae==='GRD')return _0x24837e?_0x1c1f5f(_0x2cef01[_0x1179bd(0x909)](this['sparam'](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x29fe46==='REC')return _0x16dcfd?_0x17e240(_0x403668[_0x1179bd(0x909)](this['sparam'](0x2)*0x64))+'%':this[_0x1179bd(0x645)](0x2);if(_0x5e9939===_0x1179bd(0x525))return _0x47ee7f?_0x2eb4f7(_0x43d911[_0x1179bd(0x909)](this[_0x1179bd(0x645)](0x3)*0x64))+'%':this[_0x1179bd(0x645)](0x3);if(_0xcd82e7==='MCR')return _0xebd62e?_0x1e5b90(_0x31d635[_0x1179bd(0x909)](this[_0x1179bd(0x645)](0x4)*0x64))+'%':this[_0x1179bd(0x645)](0x4);if(_0x41e99f===_0x1179bd(0x6fb))return _0x24beea?_0x18bd07(_0x2d51f9[_0x1179bd(0x909)](this[_0x1179bd(0x645)](0x5)*0x64))+'%':this[_0x1179bd(0x645)](0x5);if(_0x16e234===_0x1179bd(0x869))return _0x49d3ab?_0x1c4c33(_0xa64d53[_0x1179bd(0x909)](this[_0x1179bd(0x645)](0x6)*0x64))+'%':this[_0x1179bd(0x645)](0x6);if(_0x22efde===_0x1179bd(0x66e))return _0x2ae337?_0x19f875(_0x1f69c0['round'](this[_0x1179bd(0x645)](0x7)*0x64))+'%':this[_0x1179bd(0x645)](0x7);if(_0x2e522b==='FDR')return _0x2599d2?_0x3ecd68(_0x1a4a1e[_0x1179bd(0x909)](this['sparam'](0x8)*0x64))+'%':this[_0x1179bd(0x645)](0x8);if(_0xe9644c===_0x1179bd(0x3c9))return _0x33103a?_0x20de5b(_0x54df83[_0x1179bd(0x909)](this[_0x1179bd(0x645)](0x9)*0x64))+'%':this[_0x1179bd(0x645)](0x9);if(_0x5c956a['CoreEngine']['CustomParamAbb'][_0x4dd0f7]){const _0x3ab2d7=_0x5bb83b[_0x1179bd(0x21d)]['CustomParamAbb'][_0x2c258b],_0x272c6b=this[_0x3ab2d7];return _0x3976cb[_0x1179bd(0x21d)]['CustomParamType'][_0x321f12]===_0x1179bd(0x1f3)?_0x272c6b:_0x64e960?_0x2a477c(_0x35c209[_0x1179bd(0x909)](_0x272c6b*0x64))+'%':_0x272c6b;}return'';}else this['drawText'](VisuMZ[_0x1179bd(0x21d)][_0x1179bd(0x5cb)][_0x1179bd(0x59f)][_0x1179bd(0x2da)],_0x3da63c,_0x1d67a0,_0x2f6dd7,'right');}else this[_0x1179bd(0x27d)](_0x4966b0,_0x3da63c,_0x1d67a0,_0x2f6dd7,_0x1179bd(0x1ad));this[_0x1179bd(0x6ec)]();},Window_Base[_0x17407e(0x374)][_0x17407e(0x8c1)]=function(_0x133c2e,_0x453ca9,_0x250dfb,_0x4b5e07,_0x406a4c){const _0x366de0=_0x17407e,_0x30d504=ImageManager['loadSystem'](_0x366de0(0x1c4)),_0x35bbfe=ImageManager['iconWidth'],_0x7723a7=ImageManager[_0x366de0(0x4f1)],_0x53af90=_0x133c2e%0x10*_0x35bbfe,_0x21fb71=Math[_0x366de0(0x3d1)](_0x133c2e/0x10)*_0x7723a7,_0x344807=_0x4b5e07,_0x1115c9=_0x4b5e07;this[_0x366de0(0x653)]['_context'][_0x366de0(0x8e0)]=_0x406a4c,this[_0x366de0(0x653)][_0x366de0(0x628)](_0x30d504,_0x53af90,_0x21fb71,_0x35bbfe,_0x7723a7,_0x453ca9,_0x250dfb,_0x344807,_0x1115c9),this[_0x366de0(0x653)]['_context'][_0x366de0(0x8e0)]=!![];},Window_Base[_0x17407e(0x374)][_0x17407e(0x983)]=function(_0x53f46b,_0x5494e1,_0x9139f8,_0x1eca56,_0x1d9b03,_0x28b02a){const _0x1433dc=_0x17407e,_0x34cda6=Math[_0x1433dc(0x3d1)]((_0x9139f8-0x2)*_0x1eca56),_0x544507=Sprite_Gauge[_0x1433dc(0x374)][_0x1433dc(0x2ee)][_0x1433dc(0x8eb)](this),_0x7dd891=_0x5494e1+this[_0x1433dc(0x8af)]()-_0x544507-0x2;this[_0x1433dc(0x653)][_0x1433dc(0x415)](_0x53f46b,_0x7dd891,_0x9139f8,_0x544507,ColorManager[_0x1433dc(0x691)]()),this[_0x1433dc(0x653)]['gradientFillRect'](_0x53f46b+0x1,_0x7dd891+0x1,_0x34cda6,_0x544507-0x2,_0x1d9b03,_0x28b02a);},Window_Selectable[_0x17407e(0x374)]['cursorDown']=function(_0x4157b2){const _0x502899=_0x17407e;let _0x346f27=this['index']();const _0x123136=this['maxItems'](),_0x2481e6=this[_0x502899(0x8e8)]();if(this[_0x502899(0x5fd)]()&&(_0x346f27<_0x123136||_0x4157b2&&_0x2481e6===0x1)){if('QBiuK'===_0x502899(0x3fe)){_0x346f27+=_0x2481e6;if(_0x346f27>=_0x123136)_0x346f27=_0x123136-0x1;this[_0x502899(0x936)](_0x346f27);}else return _0x2dde6e['outlineColorDmg']();}else!this['isUseModernControls']()&&((_0x346f27<_0x123136-_0x2481e6||_0x4157b2&&_0x2481e6===0x1)&&this[_0x502899(0x936)]((_0x346f27+_0x2481e6)%_0x123136));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3a2)]=Window_Selectable[_0x17407e(0x374)][_0x17407e(0x2c6)],Window_Selectable['prototype'][_0x17407e(0x2c6)]=function(_0x569b1a){const _0x40edcb=_0x17407e;this[_0x40edcb(0x5fd)]()&&_0x569b1a&&this[_0x40edcb(0x8e8)]()===0x1&&this['index']()===this[_0x40edcb(0x717)]()-0x1?this[_0x40edcb(0x936)](0x0):VisuMZ['CoreEngine'][_0x40edcb(0x3a2)][_0x40edcb(0x8eb)](this,_0x569b1a);},Window_Selectable['prototype']['cursorUp']=function(_0x3ead5a){const _0x3213ba=_0x17407e;let _0x52156c=Math[_0x3213ba(0x531)](0x0,this[_0x3213ba(0x45f)]());const _0x5dac13=this[_0x3213ba(0x717)](),_0xfebc72=this['maxCols']();if(this[_0x3213ba(0x5fd)]()&&_0x52156c>0x0||_0x3ead5a&&_0xfebc72===0x1){_0x52156c-=_0xfebc72;if(_0x52156c<=0x0)_0x52156c=0x0;this[_0x3213ba(0x936)](_0x52156c);}else{if(!this[_0x3213ba(0x5fd)]()){if(_0x3213ba(0x57b)===_0x3213ba(0x57b))(_0x52156c>=_0xfebc72||_0x3ead5a&&_0xfebc72===0x1)&&this['smoothSelect']((_0x52156c-_0xfebc72+_0x5dac13)%_0x5dac13);else return _0x25d1ee[_0x3213ba(0x21d)][_0x3213ba(0x673)][_0x3213ba(0x8eb)](this,_0x1b6793);}}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x79b)]=Window_Selectable[_0x17407e(0x374)][_0x17407e(0x5c6)],Window_Selectable[_0x17407e(0x374)][_0x17407e(0x5c6)]=function(_0x336690){const _0x37ecd2=_0x17407e;this[_0x37ecd2(0x5fd)]()&&_0x336690&&this[_0x37ecd2(0x8e8)]()===0x1&&this['index']()===0x0?this[_0x37ecd2(0x936)](this['maxItems']()-0x1):VisuMZ[_0x37ecd2(0x21d)][_0x37ecd2(0x79b)]['call'](this,_0x336690);},Window_Selectable[_0x17407e(0x374)][_0x17407e(0x5fd)]=function(){const _0x1c2349=_0x17407e;return VisuMZ[_0x1c2349(0x21d)][_0x1c2349(0x5cb)][_0x1c2349(0x7e8)][_0x1c2349(0x2f2)];},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x365)]=Window_Selectable[_0x17407e(0x374)][_0x17407e(0x1c6)],Window_Selectable['prototype'][_0x17407e(0x1c6)]=function(){const _0x4ce7d5=_0x17407e;this[_0x4ce7d5(0x5fd)]()?_0x4ce7d5(0x2f8)===_0x4ce7d5(0x96a)?_0x3349ec+=_0x57b95f+_0x4ce7d5(0x545):(this[_0x4ce7d5(0x879)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x4ce7d5(0x21d)][_0x4ce7d5(0x365)]['call'](this);},Window_Selectable['prototype'][_0x17407e(0x637)]=function(){return!![];},Window_Selectable['prototype'][_0x17407e(0x879)]=function(){const _0x8172c2=_0x17407e;if(this[_0x8172c2(0x655)]()){const _0xffc248=this[_0x8172c2(0x45f)]();if(Input[_0x8172c2(0x90e)](_0x8172c2(0x722))){if(_0x8172c2(0x53f)!==_0x8172c2(0x53f)){var _0x44b30e=_0x34b03e(_0x462a19['$1'])/0x64;_0x22afd3+=_0x44b30e;}else Input[_0x8172c2(0x581)]('shift')&&this[_0x8172c2(0x637)]()?'xxxfo'!=='JUjfQ'?this['cursorPagedown']():_0x52dfc8[_0x8172c2(0x627)]&&(this[_0x8172c2(0x8d2)]=_0x8172c2(0x357)):_0x8172c2(0x448)===_0x8172c2(0x6f1)?_0xe3cbb6=0x0:this['cursorDown'](Input['isTriggered'](_0x8172c2(0x722)));}Input[_0x8172c2(0x90e)]('up')&&(_0x8172c2(0x8cb)===_0x8172c2(0x8cb)?Input[_0x8172c2(0x581)](_0x8172c2(0x588))&&this[_0x8172c2(0x637)]()?this[_0x8172c2(0x29e)]():this[_0x8172c2(0x5c6)](Input[_0x8172c2(0x7cd)]('up')):this[_0x8172c2(0x3d4)]()),Input[_0x8172c2(0x90e)](_0x8172c2(0x1ad))&&this[_0x8172c2(0x249)](Input['isTriggered'](_0x8172c2(0x1ad))),Input[_0x8172c2(0x90e)](_0x8172c2(0x917))&&this[_0x8172c2(0x7c7)](Input[_0x8172c2(0x7cd)](_0x8172c2(0x917))),!this[_0x8172c2(0x3e4)]('pagedown')&&Input[_0x8172c2(0x90e)](_0x8172c2(0x52c))&&this[_0x8172c2(0x4a5)](),!this['isHandled'](_0x8172c2(0x605))&&Input['isRepeated'](_0x8172c2(0x605))&&this[_0x8172c2(0x29e)](),this[_0x8172c2(0x45f)]()!==_0xffc248&&this[_0x8172c2(0x3d4)]();}},Window_Selectable[_0x17407e(0x374)]['processCursorHomeEndTrigger']=function(){const _0x18d8ba=_0x17407e;if(this[_0x18d8ba(0x655)]()){const _0x3fc7e8=this[_0x18d8ba(0x45f)]();if(Input[_0x18d8ba(0x7cd)](_0x18d8ba(0x60c))){if(_0x18d8ba(0x6ac)===_0x18d8ba(0x375))return _0x4933fb[_0x18d8ba(0x7e0)][_0x18d8ba(0x306)][_0x18d8ba(0x8eb)](this);else this['smoothSelect'](Math[_0x18d8ba(0x4f2)](this[_0x18d8ba(0x45f)](),0x0));}Input['isTriggered'](_0x18d8ba(0x754))&&this[_0x18d8ba(0x936)](Math[_0x18d8ba(0x531)](this[_0x18d8ba(0x45f)](),this['maxItems']()-0x1)),this[_0x18d8ba(0x45f)]()!==_0x3fc7e8&&(_0x18d8ba(0x231)==='CKcVZ'?this[_0x18d8ba(0x3d4)]():(_0x5e699b['CoreEngine']['Input_setupEventHandlers'][_0x18d8ba(0x8eb)](this),_0x17c99d[_0x18d8ba(0x1d2)](_0x18d8ba(0x1f4),this[_0x18d8ba(0x1c0)][_0x18d8ba(0x9b5)](this))));}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x3ab)]=Window_Selectable[_0x17407e(0x374)]['processTouch'],Window_Selectable[_0x17407e(0x374)]['processTouch']=function(){const _0x51803e=_0x17407e;this[_0x51803e(0x5fd)]()?this[_0x51803e(0x4db)]():VisuMZ['CoreEngine'][_0x51803e(0x3ab)][_0x51803e(0x8eb)](this);},Window_Selectable[_0x17407e(0x374)][_0x17407e(0x4db)]=function(){const _0x52370e=_0x17407e;VisuMZ[_0x52370e(0x21d)][_0x52370e(0x3ab)]['call'](this);},Window_Selectable['prototype'][_0x17407e(0x737)]=function(){const _0x5599b8=_0x17407e;return VisuMZ[_0x5599b8(0x21d)][_0x5599b8(0x5cb)][_0x5599b8(0x685)][_0x5599b8(0x75f)];},Window_Selectable[_0x17407e(0x374)][_0x17407e(0x389)]=function(){const _0x391431=_0x17407e;return VisuMZ[_0x391431(0x21d)]['Settings']['Window'][_0x391431(0x79f)];},Window_Selectable[_0x17407e(0x374)]['itemHeight']=function(){const _0x207526=_0x17407e;return Window_Scrollable[_0x207526(0x374)][_0x207526(0x48c)][_0x207526(0x8eb)](this)+VisuMZ[_0x207526(0x21d)][_0x207526(0x5cb)][_0x207526(0x685)]['ItemHeight'];;},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x78e)]=Window_Selectable['prototype'][_0x17407e(0x823)],Window_Selectable[_0x17407e(0x374)][_0x17407e(0x823)]=function(_0x5615c6){const _0x2ecc27=_0x17407e,_0x23e0a7=VisuMZ[_0x2ecc27(0x21d)][_0x2ecc27(0x5cb)][_0x2ecc27(0x685)];if(_0x23e0a7[_0x2ecc27(0x90c)]===![])return;_0x23e0a7[_0x2ecc27(0x855)]?_0x2ecc27(0x4e9)===_0x2ecc27(0x4e9)?_0x23e0a7[_0x2ecc27(0x855)][_0x2ecc27(0x8eb)](this,_0x5615c6):this['createPointAnimationSprite'](_0x54b62f,_0x3d5e7d,_0x4ff401,_0x2468e0,_0x38871a):VisuMZ['CoreEngine'][_0x2ecc27(0x78e)]['call'](this,_0x5615c6);},VisuMZ[_0x17407e(0x21d)]['Window_Gold_refresh']=Window_Gold[_0x17407e(0x374)][_0x17407e(0x677)],Window_Gold[_0x17407e(0x374)][_0x17407e(0x677)]=function(){const _0x30b158=_0x17407e;this[_0x30b158(0x59a)]()?'iNUYU'===_0x30b158(0x7d7)?(_0x2d82e1[_0x30b158(0x21d)][_0x30b158(0x7e1)][_0x30b158(0x8eb)](this),this[_0x30b158(0x82e)]()):this[_0x30b158(0x225)]():VisuMZ[_0x30b158(0x21d)][_0x30b158(0x766)][_0x30b158(0x8eb)](this);},Window_Gold[_0x17407e(0x374)][_0x17407e(0x59a)]=function(){const _0x2b93d2=_0x17407e;if(TextManager[_0x2b93d2(0x595)]!==this['currencyUnit']())return![];return VisuMZ['CoreEngine'][_0x2b93d2(0x5cb)][_0x2b93d2(0x59f)][_0x2b93d2(0x42e)];},Window_Gold[_0x17407e(0x374)][_0x17407e(0x225)]=function(){const _0x22c5cb=_0x17407e;this['resetFontSettings'](),this['contents'][_0x22c5cb(0x938)](),this[_0x22c5cb(0x653)][_0x22c5cb(0x1c5)]=VisuMZ[_0x22c5cb(0x21d)][_0x22c5cb(0x5cb)][_0x22c5cb(0x59f)][_0x22c5cb(0x516)];const _0x122afe=VisuMZ[_0x22c5cb(0x21d)]['Settings']['Gold']['GoldIcon'],_0x5376b1=this[_0x22c5cb(0x911)](0x0);if(_0x122afe>0x0){if('kOPjO'!=='wlABm'){const _0x5cd690=_0x5376b1['y']+(this[_0x22c5cb(0x8af)]()-ImageManager[_0x22c5cb(0x4f1)])/0x2;this[_0x22c5cb(0x857)](_0x122afe,_0x5376b1['x'],_0x5cd690);const _0x54cb75=ImageManager[_0x22c5cb(0x42a)]+0x4;_0x5376b1['x']+=_0x54cb75,_0x5376b1['width']-=_0x54cb75;}else this[_0x22c5cb(0x653)][_0x22c5cb(0x1c5)]-=0x6;}this['changeTextColor'](ColorManager[_0x22c5cb(0x3ed)]()),this[_0x22c5cb(0x27d)](this[_0x22c5cb(0x595)](),_0x5376b1['x'],_0x5376b1['y'],_0x5376b1[_0x22c5cb(0x2b6)],_0x22c5cb(0x917));const _0x3eea47=this[_0x22c5cb(0x28d)](this[_0x22c5cb(0x595)]())+0x6;;_0x5376b1['x']+=_0x3eea47,_0x5376b1[_0x22c5cb(0x2b6)]-=_0x3eea47,this[_0x22c5cb(0x951)]();const _0x3c7d8d=this[_0x22c5cb(0x3c6)](),_0x21e4f5=this[_0x22c5cb(0x28d)](this[_0x22c5cb(0x99f)]?VisuMZ[_0x22c5cb(0x1d0)](this['value']()):this[_0x22c5cb(0x3c6)]());_0x21e4f5>_0x5376b1[_0x22c5cb(0x2b6)]?this[_0x22c5cb(0x27d)](VisuMZ[_0x22c5cb(0x21d)][_0x22c5cb(0x5cb)][_0x22c5cb(0x59f)]['GoldOverlap'],_0x5376b1['x'],_0x5376b1['y'],_0x5376b1[_0x22c5cb(0x2b6)],'right'):this[_0x22c5cb(0x27d)](this[_0x22c5cb(0x3c6)](),_0x5376b1['x'],_0x5376b1['y'],_0x5376b1[_0x22c5cb(0x2b6)],_0x22c5cb(0x1ad)),this[_0x22c5cb(0x6ec)]();},Window_StatusBase[_0x17407e(0x374)][_0x17407e(0x824)]=function(_0x320537,_0x3529b8,_0x5be587,_0x1905d2,_0x1370c2){const _0x4a6e2f=_0x17407e;_0x1905d2=String(_0x1905d2||'')[_0x4a6e2f(0x99a)]();if(VisuMZ['CoreEngine'][_0x4a6e2f(0x5cb)][_0x4a6e2f(0x2d0)][_0x4a6e2f(0x847)]){const _0x1aefcc=VisuMZ[_0x4a6e2f(0x6e6)](_0x1905d2);if(_0x1370c2){if(_0x4a6e2f(0x5bd)===_0x4a6e2f(0x543))return _0x12f800['layoutSettings'][_0x4a6e2f(0x485)][_0x4a6e2f(0x8eb)](this);else this[_0x4a6e2f(0x8c1)](_0x1aefcc,_0x320537,_0x3529b8,this['gaugeLineHeight']()),_0x5be587-=this[_0x4a6e2f(0x67b)]()+0x2,_0x320537+=this[_0x4a6e2f(0x67b)]()+0x2;}else this[_0x4a6e2f(0x857)](_0x1aefcc,_0x320537+0x2,_0x3529b8+0x2),_0x5be587-=ImageManager[_0x4a6e2f(0x42a)]+0x4,_0x320537+=ImageManager[_0x4a6e2f(0x42a)]+0x4;}const _0x1ae7b8=TextManager['param'](_0x1905d2);this[_0x4a6e2f(0x6ec)](),this[_0x4a6e2f(0x587)](ColorManager['systemColor']()),_0x1370c2?_0x4a6e2f(0x33c)!==_0x4a6e2f(0x5db)?(this[_0x4a6e2f(0x653)][_0x4a6e2f(0x1c5)]=this[_0x4a6e2f(0x5e8)](),this[_0x4a6e2f(0x653)][_0x4a6e2f(0x27d)](_0x1ae7b8,_0x320537,_0x3529b8,_0x5be587,this[_0x4a6e2f(0x67b)](),_0x4a6e2f(0x917))):this[_0x4a6e2f(0x37f)][_0x4a6e2f(0x3c0)](_0x1d38fe[_0x4a6e2f(0x7e0)]['ItemBgType']):this[_0x4a6e2f(0x27d)](_0x1ae7b8,_0x320537,_0x3529b8,_0x5be587),this[_0x4a6e2f(0x6ec)]();},Window_StatusBase[_0x17407e(0x374)][_0x17407e(0x5e8)]=function(){const _0x53b7f3=_0x17407e;return $gameSystem[_0x53b7f3(0x880)]()-0x8;},Window_StatusBase['prototype'][_0x17407e(0x519)]=function(_0x214e49,_0x117516,_0x13a6b6,_0x43adc0){const _0x34b8c3=_0x17407e;_0x43adc0=_0x43adc0||0xa8,this[_0x34b8c3(0x951)]();if(VisuMZ[_0x34b8c3(0x21d)][_0x34b8c3(0x5cb)]['UI'][_0x34b8c3(0x791)]){if(_0x34b8c3(0x688)===_0x34b8c3(0x688))this[_0x34b8c3(0x1e0)](_0x214e49[_0x34b8c3(0x219)]()[_0x34b8c3(0x506)],_0x117516,_0x13a6b6,_0x43adc0);else{const _0x1d42a5=_0x44b618[_0x34b8c3(0x6da)]((_0x5879a6-_0x1e9fd4)/_0x6107a,_0x166e01||'Linear'),_0x44eed9=_0x9204b1[_0x34b8c3(0x6da)]((_0x7a4516-_0x18db86+0x1)/_0x25d66f,_0x3b3ef0||_0x34b8c3(0x3cc)),_0x3de704=(_0x515c18-_0x40a4dc*_0x1d42a5)/(0x1-_0x1d42a5);return _0x3de704+(_0x3577bd-_0x3de704)*_0x44eed9;}}else{const _0x4322e9=_0x214e49[_0x34b8c3(0x219)]()[_0x34b8c3(0x506)][_0x34b8c3(0x2dd)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x4322e9,_0x117516,_0x13a6b6,_0x43adc0);}},Window_StatusBase['prototype'][_0x17407e(0x84d)]=function(_0x1faed1,_0x31edc0,_0xd9a9b0,_0x1b8ebd){const _0x15b823=_0x17407e;_0x1b8ebd=_0x1b8ebd||0x10e,this[_0x15b823(0x951)]();if(VisuMZ[_0x15b823(0x21d)][_0x15b823(0x5cb)]['UI'][_0x15b823(0x3f6)])this[_0x15b823(0x1e0)](_0x1faed1[_0x15b823(0x23d)](),_0x31edc0,_0xd9a9b0,_0x1b8ebd);else{if('UfeHO'===_0x15b823(0x8e3)){const _0x4d36ee='AllMaps';this[_0x15b823(0x745)][_0x15b823(0x2d3)](_0x424257)[_0x15b823(0x2d3)]('')[_0x15b823(0x2d3)](null);const _0xd3c93=this[_0x15b823(0x745)]['join'](_0x15b823(0x545))[_0x15b823(0x846)]();_0x3f7607[_0x15b823(0x21d)][_0x15b823(0x4aa)](_0xd3c93,_0x4d36ee,!![]),_0x3cb0cc[_0x15b823(0x26b)][_0x15b823(0x5c9)]=!![];}else{const _0x416acf=_0x1faed1['nickname']()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x15b823(0x27d)](_0x1faed1[_0x15b823(0x23d)](),_0x31edc0,_0xd9a9b0,_0x1b8ebd);}}},VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x17407e(0x374)][_0x17407e(0x629)],Window_StatusBase[_0x17407e(0x374)]['drawActorLevel']=function(_0x3144c7,_0x24ea55,_0x3054ca){const _0x2f6e91=_0x17407e;if(this[_0x2f6e91(0x7d1)]())this[_0x2f6e91(0x388)](_0x3144c7,_0x24ea55,_0x3054ca);VisuMZ[_0x2f6e91(0x21d)][_0x2f6e91(0x535)]['call'](this,_0x3144c7,_0x24ea55,_0x3054ca);},Window_StatusBase[_0x17407e(0x374)][_0x17407e(0x7d1)]=function(){const _0xb20a98=_0x17407e;return VisuMZ[_0xb20a98(0x21d)][_0xb20a98(0x5cb)]['UI'][_0xb20a98(0x961)];},Window_StatusBase['prototype'][_0x17407e(0x388)]=function(_0xbd112d,_0xdbc98e,_0x565489){const _0x111f5d=_0x17407e;if(!_0xbd112d)return;if(!_0xbd112d[_0x111f5d(0x93e)]())return;const _0x473129=0x80,_0x5efa2a=_0xbd112d['expRate']();let _0x1d40a9=ColorManager[_0x111f5d(0x271)](),_0x3536d4=ColorManager[_0x111f5d(0x3bc)]();_0x5efa2a>=0x1&&(_0x111f5d(0x44a)===_0x111f5d(0x46d)?(_0xefcd59[_0x111f5d(0x21d)]['Scene_Battle_createCancelButton']['call'](this),_0x37fd40[_0x111f5d(0x6a3)]()&&this[_0x111f5d(0x3e0)]()):(_0x1d40a9=ColorManager[_0x111f5d(0x40d)](),_0x3536d4=ColorManager[_0x111f5d(0x5c3)]())),this[_0x111f5d(0x983)](_0xdbc98e,_0x565489,_0x473129,_0x5efa2a,_0x1d40a9,_0x3536d4);},Window_EquipStatus[_0x17407e(0x374)][_0x17407e(0x94d)]=function(){const _0xab8a0f=_0x17407e;let _0x1421d9=0x0;for(const _0x9fec00 of VisuMZ[_0xab8a0f(0x21d)][_0xab8a0f(0x5cb)][_0xab8a0f(0x2d0)]['DisplayedParams']){const _0x19d22c=this[_0xab8a0f(0x2e1)](),_0x3dce92=this[_0xab8a0f(0x2ba)](_0x1421d9);this[_0xab8a0f(0x5b0)](_0x19d22c,_0x3dce92,_0x9fec00),_0x1421d9++;}},Window_EquipStatus['prototype'][_0x17407e(0x1d1)]=function(_0x57ef29,_0x3ddb03,_0x2c8f7c){const _0x245fbb=_0x17407e,_0x27a91b=this[_0x245fbb(0x46b)]()-this[_0x245fbb(0x2e1)]()*0x2;this[_0x245fbb(0x824)](_0x57ef29,_0x3ddb03,_0x27a91b,_0x2c8f7c,![]);},Window_EquipStatus[_0x17407e(0x374)][_0x17407e(0x8cc)]=function(_0x3bad77,_0x351321,_0x14c9c5){const _0x2373d4=_0x17407e,_0x355c05=this[_0x2373d4(0x698)]();this[_0x2373d4(0x951)](),this[_0x2373d4(0x27d)](this[_0x2373d4(0x6f2)][_0x2373d4(0x5eb)](_0x14c9c5,!![]),_0x3bad77,_0x351321,_0x355c05,_0x2373d4(0x1ad));},Window_EquipStatus['prototype'][_0x17407e(0x564)]=function(_0x5c37ea,_0x7da743){const _0x55a56d=_0x17407e,_0x114080=this['rightArrowWidth']();this['changeTextColor'](ColorManager[_0x55a56d(0x3ed)]());const _0x11b9f3=VisuMZ[_0x55a56d(0x21d)][_0x55a56d(0x5cb)]['UI']['ParamArrow'];this[_0x55a56d(0x27d)](_0x11b9f3,_0x5c37ea,_0x7da743,_0x114080,_0x55a56d(0x98b));},Window_EquipStatus['prototype'][_0x17407e(0x1be)]=function(_0x2e532a,_0x55c582,_0xbc16b2){const _0x4acabb=_0x17407e,_0x5d350c=this['paramWidth'](),_0x4ffcc6=this['_tempActor']['paramValueByName'](_0xbc16b2),_0x5b8669=_0x4ffcc6-this[_0x4acabb(0x6f2)][_0x4acabb(0x5eb)](_0xbc16b2);this[_0x4acabb(0x587)](ColorManager[_0x4acabb(0x342)](_0x5b8669)),this[_0x4acabb(0x27d)](this['_tempActor']['paramValueByName'](_0xbc16b2,!![]),_0x2e532a,_0x55c582,_0x5d350c,_0x4acabb(0x1ad));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x673)]=Window_EquipItem[_0x17407e(0x374)][_0x17407e(0x1b7)],Window_EquipItem[_0x17407e(0x374)][_0x17407e(0x1b7)]=function(_0x9f94fd){const _0x4b18cd=_0x17407e;return _0x9f94fd&&this[_0x4b18cd(0x6f2)]?this['_actor'][_0x4b18cd(0x5d9)](_0x9f94fd):VisuMZ[_0x4b18cd(0x21d)][_0x4b18cd(0x673)][_0x4b18cd(0x8eb)](this,_0x9f94fd);},Window_StatusParams[_0x17407e(0x374)][_0x17407e(0x717)]=function(){const _0x443e22=_0x17407e;return VisuMZ[_0x443e22(0x21d)]['Settings']['Param'][_0x443e22(0x7f6)][_0x443e22(0x62d)];},Window_StatusParams[_0x17407e(0x374)][_0x17407e(0x5b0)]=function(_0xb55d68){const _0x46c178=_0x17407e,_0x3c59ab=this[_0x46c178(0x911)](_0xb55d68),_0x3c09e5=VisuMZ[_0x46c178(0x21d)][_0x46c178(0x5cb)][_0x46c178(0x2d0)][_0x46c178(0x7f6)][_0xb55d68],_0x3b2a22=TextManager[_0x46c178(0x7e5)](_0x3c09e5),_0x4bdded=this[_0x46c178(0x6f2)][_0x46c178(0x5eb)](_0x3c09e5,!![]);this[_0x46c178(0x824)](_0x3c59ab['x'],_0x3c59ab['y'],0xa0,_0x3c09e5,![]),this[_0x46c178(0x951)](),this[_0x46c178(0x27d)](_0x4bdded,_0x3c59ab['x']+0xa0,_0x3c59ab['y'],0x3c,_0x46c178(0x1ad));};if(VisuMZ['CoreEngine']['Settings'][_0x17407e(0x602)][_0x17407e(0x852)]){VisuMZ['CoreEngine'][_0x17407e(0x5cb)]['KeyboardInput'][_0x17407e(0x3fa)]&&(Window_NameInput[_0x17407e(0x85d)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x17407e(0x579),'OK']);;VisuMZ[_0x17407e(0x21d)][_0x17407e(0x761)]=Window_NameInput[_0x17407e(0x374)][_0x17407e(0x829)],Window_NameInput[_0x17407e(0x374)][_0x17407e(0x829)]=function(_0x327b46){const _0x1ef3bb=_0x17407e;this['_mode']=this[_0x1ef3bb(0x6a6)](),VisuMZ[_0x1ef3bb(0x21d)][_0x1ef3bb(0x761)]['call'](this,_0x327b46),this[_0x1ef3bb(0x4b9)]===_0x1ef3bb(0x876)?this[_0x1ef3bb(0x54e)](0x0):(Input['clear'](),this[_0x1ef3bb(0x96c)]());},Window_NameInput[_0x17407e(0x374)]['defaultInputMode']=function(){const _0x4d95d1=_0x17407e;if(Input[_0x4d95d1(0x446)]())return _0x4d95d1(0x876);return VisuMZ['CoreEngine'][_0x4d95d1(0x5cb)][_0x4d95d1(0x602)][_0x4d95d1(0x612)]||_0x4d95d1(0x4a6);},VisuMZ[_0x17407e(0x21d)]['Window_NameInput_processHandling']=Window_NameInput[_0x17407e(0x374)][_0x17407e(0x38d)],Window_NameInput[_0x17407e(0x374)][_0x17407e(0x38d)]=function(){const _0x27b4b6=_0x17407e;if(!this[_0x27b4b6(0x796)]())return;if(!this['active'])return;if(this[_0x27b4b6(0x4b9)]===_0x27b4b6(0x4a6)&&Input[_0x27b4b6(0x89c)]())this['switchModes'](_0x27b4b6(0x876));else{if(Input[_0x27b4b6(0x455)]('backspace')){if(_0x27b4b6(0x56d)===_0x27b4b6(0x962))return _0x3196a3[_0x27b4b6(0x4e7)](this),_0x6a63fa[_0x27b4b6(0x21d)][_0x27b4b6(0x99b)][_0x27b4b6(0x8eb)](this,_0x4ad127);else Input[_0x27b4b6(0x938)](),this[_0x27b4b6(0x90f)]();}else{if(Input[_0x27b4b6(0x7cd)](_0x27b4b6(0x804)))Input[_0x27b4b6(0x938)](),this['_mode']===_0x27b4b6(0x4a6)?this['switchModes']('default'):this[_0x27b4b6(0x4b1)](_0x27b4b6(0x4a6));else{if(this['_mode']===_0x27b4b6(0x4a6))this['processKeyboardHandling']();else Input['isSpecialCode'](_0x27b4b6(0x9b3))?(Input['clear'](),this[_0x27b4b6(0x4b1)](_0x27b4b6(0x4a6))):VisuMZ[_0x27b4b6(0x21d)][_0x27b4b6(0x568)][_0x27b4b6(0x8eb)](this);}}}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x740)]=Window_NameInput['prototype']['processTouch'],Window_NameInput[_0x17407e(0x374)]['processTouch']=function(){const _0x599654=_0x17407e;if(!this[_0x599654(0x3d3)]())return;if(this[_0x599654(0x4b9)]===_0x599654(0x4a6)){if(_0x599654(0x871)===_0x599654(0x871)){if(TouchInput[_0x599654(0x7cd)]()&&this['isTouchedInsideFrame']())this[_0x599654(0x4b1)](_0x599654(0x876));else TouchInput['isCancelled']()&&('VembP'==='VembP'?this[_0x599654(0x4b1)](_0x599654(0x876)):this['_forcedBattleSys']=0x0);}else this[_0x599654(0x913)]+=_0x573795[_0x599654(0x909)]((_0x4702ed[_0x599654(0x2fc)]-0x270)/0x2),this['_screenY']-=_0x3d7590[_0x599654(0x3d1)]((_0x5b6c72[_0x599654(0x2fc)]-_0x36d3f2[_0x599654(0x528)])/0x2),_0x5de7d9['isSideView']()?this[_0x599654(0x6df)]-=_0x50081a[_0x599654(0x3d1)]((_0x5c93c6[_0x599654(0x2b6)]-_0x20fbe4[_0x599654(0x937)])/0x2):this['_screenX']+=_0x990a41['round']((_0x30cff1[_0x599654(0x937)]-0x330)/0x2);}else VisuMZ[_0x599654(0x21d)][_0x599654(0x740)]['call'](this);},Window_NameInput[_0x17407e(0x374)]['processKeyboardHandling']=function(){const _0x4e0108=_0x17407e;if(Input['isSpecialCode'](_0x4e0108(0x648))){if(_0x4e0108(0x769)!==_0x4e0108(0x875))Input['clear'](),this[_0x4e0108(0x61c)]();else return _0x206c80[_0x4e0108(0x39a)];}else{if(Input['_inputString']!==undefined){if(_0x4e0108(0x60f)===_0x4e0108(0x60f)){let _0x3b6558=Input['_inputString'],_0x1b29f3=_0x3b6558[_0x4e0108(0x62d)];for(let _0x281e67=0x0;_0x281e67<_0x1b29f3;++_0x281e67){this['_editWindow'][_0x4e0108(0x798)](_0x3b6558[_0x281e67])?SoundManager['playOk']():_0x4e0108(0x486)!==_0x4e0108(0x486)?this[_0x4e0108(0x5c1)][_0x4e0108(0x3c0)](_0x3eabc9['layoutSettings'][_0x4e0108(0x351)]):SoundManager[_0x4e0108(0x560)]();}Input[_0x4e0108(0x938)]();}else{var _0x263d9c=_0x4aa25b(_0x2ea886['$1']);try{_0x27a58e+=_0x93fc5a(_0x263d9c);}catch(_0x4823ac){if(_0x4d4c9b[_0x4e0108(0x3a3)]())_0xa62dfe[_0x4e0108(0x1b1)](_0x4823ac);}}}}},Window_NameInput[_0x17407e(0x374)]['switchModes']=function(_0x54b064){const _0x5c9ed0=_0x17407e;let _0x26166a=this[_0x5c9ed0(0x4b9)];this[_0x5c9ed0(0x4b9)]=_0x54b064;if(_0x26166a!==this[_0x5c9ed0(0x4b9)]){if(_0x5c9ed0(0x5e3)!==_0x5c9ed0(0x5e3)){var _0x3b6e64=_0x2f8015(_0x40c258['$1']);try{_0x4c9247+=_0x165db4(_0x3b6e64);}catch(_0x2d59d4){if(_0x355463[_0x5c9ed0(0x3a3)]())_0x4b1b65[_0x5c9ed0(0x1b1)](_0x2d59d4);}}else{this['refresh'](),SoundManager[_0x5c9ed0(0x80d)]();if(this[_0x5c9ed0(0x4b9)]===_0x5c9ed0(0x876)){if('qkLHB'==='qkLHB')this[_0x5c9ed0(0x54e)](0x0);else{_0x53c7e2[_0x5c9ed0(0x346)](_0x1c1e45,_0x2a7e3e);const _0x3a6946=_0x41afc6[_0x5c9ed0(0x76f)]||0x1;_0x5bb746[_0x5c9ed0(0x3f7)](_0x3a6946);}}else{if(_0x5c9ed0(0x702)==='xPZUU'){if(_0x122777[_0x5c9ed0(0x3a3)]())_0x163f03['log'](_0xbe2516);}else this[_0x5c9ed0(0x54e)](-0x1);}}}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x542)]=Window_NameInput['prototype'][_0x17407e(0x2c6)],Window_NameInput[_0x17407e(0x374)]['cursorDown']=function(_0x271f7c){const _0x5f1d6a=_0x17407e;if(this['_mode']===_0x5f1d6a(0x4a6)&&!Input[_0x5f1d6a(0x8a8)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x5f1d6a(0x21d)][_0x5f1d6a(0x542)][_0x5f1d6a(0x8eb)](this,_0x271f7c),this[_0x5f1d6a(0x4b1)](_0x5f1d6a(0x876));},VisuMZ['CoreEngine'][_0x17407e(0x979)]=Window_NameInput['prototype']['cursorUp'],Window_NameInput['prototype'][_0x17407e(0x5c6)]=function(_0x57f73e){const _0x41df68=_0x17407e;if(this['_mode']==='keyboard'&&!Input[_0x41df68(0x8a8)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x41df68(0x21d)][_0x41df68(0x979)][_0x41df68(0x8eb)](this,_0x57f73e),this[_0x41df68(0x4b1)](_0x41df68(0x876));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x210)]=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x17407e(0x374)][_0x17407e(0x249)]=function(_0xaf781e){const _0x36d6b2=_0x17407e;if(this[_0x36d6b2(0x4b9)]===_0x36d6b2(0x4a6)&&!Input[_0x36d6b2(0x8a8)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x36d6b2(0x210)][_0x36d6b2(0x8eb)](this,_0xaf781e),this['switchModes'](_0x36d6b2(0x876));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x492)]=Window_NameInput[_0x17407e(0x374)][_0x17407e(0x7c7)],Window_NameInput['prototype'][_0x17407e(0x7c7)]=function(_0x17bde5){const _0x22da60=_0x17407e;if(this[_0x22da60(0x4b9)]===_0x22da60(0x4a6)&&!Input['isArrowPressed']())return;if(Input[_0x22da60(0x664)]())return;VisuMZ['CoreEngine'][_0x22da60(0x492)][_0x22da60(0x8eb)](this,_0x17bde5),this['switchModes'](_0x22da60(0x876));},VisuMZ[_0x17407e(0x21d)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x17407e(0x374)][_0x17407e(0x4a5)],Window_NameInput['prototype']['cursorPagedown']=function(){const _0x33c4a2=_0x17407e;if(this[_0x33c4a2(0x4b9)]===_0x33c4a2(0x4a6))return;if(Input[_0x33c4a2(0x664)]())return;VisuMZ[_0x33c4a2(0x21d)][_0x33c4a2(0x2f6)][_0x33c4a2(0x8eb)](this),this[_0x33c4a2(0x4b1)](_0x33c4a2(0x876));},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x9a9)]=Window_NameInput[_0x17407e(0x374)][_0x17407e(0x29e)],Window_NameInput[_0x17407e(0x374)]['cursorPageup']=function(){const _0x2a281d=_0x17407e;if(this[_0x2a281d(0x4b9)]==='keyboard')return;if(Input[_0x2a281d(0x664)]())return;VisuMZ[_0x2a281d(0x21d)][_0x2a281d(0x9a9)][_0x2a281d(0x8eb)](this),this[_0x2a281d(0x4b1)](_0x2a281d(0x876));},VisuMZ['CoreEngine']['Window_NameInput_refresh']=Window_NameInput[_0x17407e(0x374)]['refresh'],Window_NameInput[_0x17407e(0x374)][_0x17407e(0x677)]=function(){const _0x136456=_0x17407e;if(this[_0x136456(0x4b9)]===_0x136456(0x4a6)){if(_0x136456(0x354)!==_0x136456(0x354)){if(_0x541c6e[_0x136456(0x7cd)]()&&this['isTouchedInsideFrame']())this[_0x136456(0x4b1)]('default');else _0x220073[_0x136456(0x80e)]()&&this[_0x136456(0x4b1)](_0x136456(0x876));}else{this[_0x136456(0x653)][_0x136456(0x938)](),this[_0x136456(0x943)][_0x136456(0x938)](),this[_0x136456(0x951)]();let _0x300013=VisuMZ[_0x136456(0x21d)]['Settings'][_0x136456(0x602)][_0x136456(0x850)][_0x136456(0x341)]('\x0a'),_0x33620a=_0x300013[_0x136456(0x62d)],_0x354cfb=(this['innerHeight']-_0x33620a*this[_0x136456(0x8af)]())/0x2;for(let _0x23ecd5=0x0;_0x23ecd5<_0x33620a;++_0x23ecd5){if('lSGHg'!==_0x136456(0x447))_0x3d73f2[_0x136456(0x2e2)](),_0xa88518[_0x136456(0x315)](_0x39e83a),_0x568ec4[_0x136456(0x21d)][_0x136456(0x348)][_0x136456(0x8eb)](this,_0x596b0b);else{let _0x35bd1a=_0x300013[_0x23ecd5],_0x1c341a=this['textSizeEx'](_0x35bd1a)[_0x136456(0x2b6)],_0x96caf6=Math[_0x136456(0x3d1)]((this[_0x136456(0x653)][_0x136456(0x2b6)]-_0x1c341a)/0x2);this[_0x136456(0x1e0)](_0x35bd1a,_0x96caf6,_0x354cfb),_0x354cfb+=this[_0x136456(0x8af)]();}}}}else'DGPjn'===_0x136456(0x4dd)?VisuMZ[_0x136456(0x21d)][_0x136456(0x6ba)][_0x136456(0x8eb)](this):(_0x5f53fd[_0x136456(0x21d)][_0x136456(0x366)]['call'](this),this[_0x136456(0x802)]={'x':0x0,'y':0x0},this[_0x136456(0x624)]={'x':0x0,'y':0x0});};}function _0x98e4(_0x5db1ea,_0x5667ad){const _0x411746=_0x4117();return _0x98e4=function(_0x98e4de,_0x39a0b8){_0x98e4de=_0x98e4de-0x1aa;let _0x33a316=_0x411746[_0x98e4de];return _0x33a316;},_0x98e4(_0x5db1ea,_0x5667ad);};VisuMZ[_0x17407e(0x21d)][_0x17407e(0x837)]=Window_ShopSell[_0x17407e(0x374)][_0x17407e(0x1b7)],Window_ShopSell[_0x17407e(0x374)][_0x17407e(0x1b7)]=function(_0x5eb94d){const _0x22ef71=_0x17407e;return VisuMZ[_0x22ef71(0x21d)]['Settings'][_0x22ef71(0x7e8)][_0x22ef71(0x8b8)]&&DataManager[_0x22ef71(0x479)](_0x5eb94d)?![]:_0x22ef71(0x8df)==='hHwTc'?_0x3d5ede[_0x22ef71(0x21d)][_0x22ef71(0x3e2)][_0x22ef71(0x8eb)](this,_0x27bb06):VisuMZ[_0x22ef71(0x21d)]['Window_ShopSell_isEnabled'][_0x22ef71(0x8eb)](this,_0x5eb94d);},Window_NumberInput[_0x17407e(0x374)]['isUseModernControls']=function(){return![];};VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x602)]['EnableNumberInput']&&(VisuMZ[_0x17407e(0x21d)][_0x17407e(0x912)]=Window_NumberInput[_0x17407e(0x374)][_0x17407e(0x650)],Window_NumberInput[_0x17407e(0x374)]['start']=function(){const _0x1b9ac9=_0x17407e;VisuMZ['CoreEngine'][_0x1b9ac9(0x912)][_0x1b9ac9(0x8eb)](this),this[_0x1b9ac9(0x54e)](this[_0x1b9ac9(0x81c)]-0x1),Input[_0x1b9ac9(0x938)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x830)]=Window_NumberInput[_0x17407e(0x374)][_0x17407e(0x797)],Window_NumberInput[_0x17407e(0x374)]['processDigitChange']=function(){const _0x5d27a5=_0x17407e;if(!this['isOpenAndActive']())return;if(Input['isNumpadPressed']())this[_0x5d27a5(0x1fe)]();else{if(Input['isSpecialCode']('backspace'))_0x5d27a5(0x755)===_0x5d27a5(0x44f)?_0x2fcce1*=_0x359112(_0x28af6d):this[_0x5d27a5(0x4bf)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x5d27a5(0x831)]();else{if(Input[_0x5d27a5(0x952)]===0x24)this[_0x5d27a5(0x267)]();else{if(Input[_0x5d27a5(0x952)]===0x23){if(_0x5d27a5(0x85f)!==_0x5d27a5(0x85a))this[_0x5d27a5(0x416)]();else for(const _0x5752e6 of _0x3950e8){this[_0x5d27a5(0x270)]([_0x5752e6],_0x5490ae,_0x136170,_0x19fc73,_0x1f8886),_0x208840+=_0x58baa8;}}else{if(_0x5d27a5(0x7a3)===_0x5d27a5(0x7a3))VisuMZ['CoreEngine'][_0x5d27a5(0x830)]['call'](this);else return _0xca09c8[_0x5d27a5(0x21d)][_0x5d27a5(0x5cb)]['UI'][_0x5d27a5(0x8c0)];}}}}}},Window_NumberInput[_0x17407e(0x374)]['processCursorMove']=function(){const _0x234809=_0x17407e;if(!this[_0x234809(0x655)]())return;if(Input[_0x234809(0x664)]())this['processKeyboardDigitChange']();else{if('iTTWV'!==_0x234809(0x406))return!![];else Window_Selectable['prototype'][_0x234809(0x1c6)]['call'](this);}},Window_NumberInput[_0x17407e(0x374)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x17407e(0x374)][_0x17407e(0x1fe)]=function(){const _0x15d1bb=_0x17407e;if(String(this['_number'])[_0x15d1bb(0x62d)]>=this[_0x15d1bb(0x81c)])return;const _0x22f915=Number(String(this[_0x15d1bb(0x9ab)])+Input[_0x15d1bb(0x7bd)]);if(isNaN(_0x22f915))return;this['_number']=_0x22f915;const _0x137635='9'[_0x15d1bb(0x397)](this[_0x15d1bb(0x81c)]);this[_0x15d1bb(0x9ab)]=this[_0x15d1bb(0x9ab)][_0x15d1bb(0x509)](0x0,_0x137635),Input[_0x15d1bb(0x938)](),this[_0x15d1bb(0x677)](),SoundManager['playCursor'](),this[_0x15d1bb(0x54e)](this[_0x15d1bb(0x81c)]-0x1);},Window_NumberInput[_0x17407e(0x374)][_0x17407e(0x4bf)]=function(){const _0x499209=_0x17407e;this[_0x499209(0x9ab)]=Number(String(this['_number'])[_0x499209(0x7ca)](0x0,-0x1)),this['_number']=Math['max'](0x0,this[_0x499209(0x9ab)]),Input[_0x499209(0x938)](),this[_0x499209(0x677)](),SoundManager[_0x499209(0x8f4)](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0x17407e(0x374)]['processKeyboardDelete']=function(){const _0x2a64b4=_0x17407e;this[_0x2a64b4(0x9ab)]=Number(String(this[_0x2a64b4(0x9ab)])[_0x2a64b4(0x6bb)](0x1)),this[_0x2a64b4(0x9ab)]=Math[_0x2a64b4(0x531)](0x0,this['_number']),Input[_0x2a64b4(0x938)](),this[_0x2a64b4(0x677)](),SoundManager[_0x2a64b4(0x8f4)](),this['select'](this[_0x2a64b4(0x81c)]-0x1);});;Window_TitleCommand[_0x17407e(0x5da)]=VisuMZ['CoreEngine']['Settings'][_0x17407e(0x902)],Window_TitleCommand[_0x17407e(0x374)][_0x17407e(0x343)]=function(){const _0x52187d=_0x17407e;this[_0x52187d(0x298)]();},Window_TitleCommand['prototype']['makeCoreEngineCommandList']=function(){const _0x275d41=_0x17407e;for(const _0x2f9cc1 of Window_TitleCommand[_0x275d41(0x5da)]){if(_0x2f9cc1[_0x275d41(0x456)][_0x275d41(0x8eb)](this)){const _0x47db00=_0x2f9cc1['Symbol'];let _0x50e442=_0x2f9cc1[_0x275d41(0x872)];if(['',_0x275d41(0x4a7)][_0x275d41(0x25d)](_0x50e442))_0x50e442=_0x2f9cc1[_0x275d41(0x2a3)][_0x275d41(0x8eb)](this);const _0x54be96=_0x2f9cc1[_0x275d41(0x5bc)][_0x275d41(0x8eb)](this),_0x35c4c5=_0x2f9cc1[_0x275d41(0x392)]['call'](this);this[_0x275d41(0x3a0)](_0x50e442,_0x47db00,_0x54be96,_0x35c4c5),this[_0x275d41(0x851)](_0x47db00,_0x2f9cc1[_0x275d41(0x3ba)][_0x275d41(0x9b5)](this,_0x35c4c5));}}},Window_GameEnd[_0x17407e(0x5da)]=VisuMZ[_0x17407e(0x21d)][_0x17407e(0x5cb)][_0x17407e(0x65b)]['GameEnd'][_0x17407e(0x712)],Window_GameEnd[_0x17407e(0x374)][_0x17407e(0x343)]=function(){const _0x188899=_0x17407e;this[_0x188899(0x298)]();},Window_GameEnd[_0x17407e(0x374)][_0x17407e(0x298)]=function(){const _0x4c5ddf=_0x17407e;for(const _0x238876 of Window_GameEnd[_0x4c5ddf(0x5da)]){if(_0x238876['ShowJS'][_0x4c5ddf(0x8eb)](this)){const _0x1ab570=_0x238876[_0x4c5ddf(0x476)];let _0x4282d8=_0x238876[_0x4c5ddf(0x872)];if(['',_0x4c5ddf(0x4a7)][_0x4c5ddf(0x25d)](_0x4282d8))_0x4282d8=_0x238876[_0x4c5ddf(0x2a3)][_0x4c5ddf(0x8eb)](this);const _0x45bb61=_0x238876[_0x4c5ddf(0x5bc)][_0x4c5ddf(0x8eb)](this),_0x383349=_0x238876['ExtJS'][_0x4c5ddf(0x8eb)](this);this[_0x4c5ddf(0x3a0)](_0x4282d8,_0x1ab570,_0x45bb61,_0x383349),this[_0x4c5ddf(0x851)](_0x1ab570,_0x238876[_0x4c5ddf(0x3ba)][_0x4c5ddf(0x9b5)](this,_0x383349));}}};function Window_ButtonAssist(){const _0x55a029=_0x17407e;this[_0x55a029(0x829)](...arguments);}Window_ButtonAssist[_0x17407e(0x374)]=Object[_0x17407e(0x56c)](Window_Base[_0x17407e(0x374)]),Window_ButtonAssist[_0x17407e(0x374)][_0x17407e(0x2ea)]=Window_ButtonAssist,Window_ButtonAssist[_0x17407e(0x374)][_0x17407e(0x829)]=function(_0x40c62a){const _0x1638fe=_0x17407e;this['_data']={},Window_Base[_0x1638fe(0x374)][_0x1638fe(0x829)][_0x1638fe(0x8eb)](this,_0x40c62a),this[_0x1638fe(0x3c0)](VisuMZ[_0x1638fe(0x21d)]['Settings'][_0x1638fe(0x963)][_0x1638fe(0x69b)]||0x0),this[_0x1638fe(0x677)]();},Window_ButtonAssist[_0x17407e(0x374)][_0x17407e(0x4df)]=function(){const _0x3a12d8=_0x17407e;if(this['contents'][_0x3a12d8(0x1c5)]<=0x60){if(_0x3a12d8(0x570)===_0x3a12d8(0x8ef)){if(_0x8d6ab8[_0x3a12d8(0x4ec)]!==_0x354e8a)return _0x5bcf88[_0x3a12d8(0x21d)][_0x3a12d8(0x639)]();return _0x45a72e['CoreEngine'][_0x3a12d8(0x8ee)][_0x3a12d8(0x8eb)](this);}else this[_0x3a12d8(0x653)][_0x3a12d8(0x1c5)]+=0x6;}},Window_ButtonAssist['prototype']['makeFontSmaller']=function(){const _0x50643c=_0x17407e;this[_0x50643c(0x653)][_0x50643c(0x1c5)]>=0x18&&(_0x50643c(0x401)===_0x50643c(0x619)?_0x206ba3=(0x1-_0x195063(_0x59894c['$1']))*-_0x394120:this[_0x50643c(0x653)][_0x50643c(0x1c5)]-=0x6);},Window_ButtonAssist['prototype'][_0x17407e(0x8dc)]=function(){const _0xe067c3=_0x17407e;Window_Base['prototype'][_0xe067c3(0x8dc)]['call'](this),this[_0xe067c3(0x221)]();},Window_ButtonAssist[_0x17407e(0x374)][_0x17407e(0x3c2)]=function(){const _0x412858=_0x17407e;this['padding']=SceneManager[_0x412858(0x26b)][_0x412858(0x380)]()!=='button'?0x0:0x8;},Window_ButtonAssist['prototype'][_0x17407e(0x221)]=function(){const _0x42c19a=_0x17407e,_0x372631=SceneManager['_scene'];for(let _0x1cce52=0x1;_0x1cce52<=0x5;_0x1cce52++){if(this[_0x42c19a(0x480)][_0x42c19a(0x45a)[_0x42c19a(0x4eb)](_0x1cce52)]!==_0x372631[_0x42c19a(0x7d8)[_0x42c19a(0x4eb)](_0x1cce52)]())return _0x42c19a(0x75a)==='bXohV'?0.5*_0x3b5189[_0x42c19a(0x438)](0x2,0xa*_0x1a6206):this['refresh']();if(this['_data']['text%1'[_0x42c19a(0x4eb)](_0x1cce52)]!==_0x372631['buttonAssistText%1'[_0x42c19a(0x4eb)](_0x1cce52)]()){if(_0x42c19a(0x20b)===_0x42c19a(0x838))this['_isPlaytest']=![];else return this[_0x42c19a(0x677)]();}}},Window_ButtonAssist[_0x17407e(0x374)][_0x17407e(0x677)]=function(){const _0x29bdd4=_0x17407e;this[_0x29bdd4(0x653)][_0x29bdd4(0x938)]();for(let _0x507793=0x1;_0x507793<=0x5;_0x507793++){this[_0x29bdd4(0x4ef)](_0x507793);}},Window_ButtonAssist[_0x17407e(0x374)]['drawSegment']=function(_0x580fae){const _0x5f594c=_0x17407e,_0xa9a56f=this[_0x5f594c(0x473)]/0x5,_0xaca9a4=SceneManager['_scene'],_0x3c5fbf=_0xaca9a4[_0x5f594c(0x7d8)[_0x5f594c(0x4eb)](_0x580fae)](),_0x5dd572=_0xaca9a4[_0x5f594c(0x692)[_0x5f594c(0x4eb)](_0x580fae)]();this[_0x5f594c(0x480)][_0x5f594c(0x45a)[_0x5f594c(0x4eb)](_0x580fae)]=_0x3c5fbf,this[_0x5f594c(0x480)][_0x5f594c(0x8f8)[_0x5f594c(0x4eb)](_0x580fae)]=_0x5dd572;if(_0x3c5fbf==='')return;if(_0x5dd572==='')return;const _0xef3e63=_0xaca9a4[_0x5f594c(0x90d)[_0x5f594c(0x4eb)](_0x580fae)](),_0x19d554=this[_0x5f594c(0x2e1)](),_0x21d743=_0xa9a56f*(_0x580fae-0x1)+_0x19d554+_0xef3e63,_0x3f3fc9=VisuMZ[_0x5f594c(0x21d)][_0x5f594c(0x5cb)]['ButtonAssist'][_0x5f594c(0x960)];this[_0x5f594c(0x1e0)](_0x3f3fc9['format'](_0x3c5fbf,_0x5dd572),_0x21d743,0x0,_0xa9a56f-_0x19d554*0x2);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x8ee)]=Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x268)],Game_Interpreter[_0x17407e(0x374)][_0x17407e(0x268)]=function(){const _0x4aa215=_0x17407e;if($gameTemp[_0x4aa215(0x4ec)]!==undefined)return'IRngS'===_0x4aa215(0x6ee)?this[_0x4aa215(0x802)]:VisuMZ['CoreEngine'][_0x4aa215(0x639)]();return VisuMZ[_0x4aa215(0x21d)][_0x4aa215(0x8ee)][_0x4aa215(0x8eb)](this);},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x639)]=function(){const _0x29ca26=_0x17407e,_0x53ee09=$gameTemp[_0x29ca26(0x4ec)]||0x0;(_0x53ee09<0x0||_0x53ee09>0x64||TouchInput[_0x29ca26(0x80e)]()||Input['isTriggered'](_0x29ca26(0x1ac)))&&($gameTemp[_0x29ca26(0x4ec)]=undefined,Input['clear'](),TouchInput['clear']());const _0x2ecfa5=$gameScreen[_0x29ca26(0x65a)](_0x53ee09);return _0x2ecfa5&&(_0x2ecfa5['_x']=TouchInput['_x'],_0x2ecfa5['_y']=TouchInput['_y']),VisuMZ[_0x29ca26(0x21d)][_0x29ca26(0x390)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ['CoreEngine'][_0x17407e(0x390)]=function(){const _0x821af7=_0x17407e,_0x2c241c=SceneManager['_scene'];if(!_0x2c241c)return;!_0x2c241c[_0x821af7(0x889)]&&(_0x821af7(0x325)!==_0x821af7(0x325)?this[_0x821af7(0x8d2)]=0x2:(SoundManager[_0x821af7(0x431)](),_0x2c241c[_0x821af7(0x889)]=new Window_PictureCoordinates(),_0x2c241c[_0x821af7(0x809)](_0x2c241c[_0x821af7(0x889)]))),$gameTemp[_0x821af7(0x4ec)]===undefined&&(SoundManager[_0x821af7(0x6ed)](),_0x2c241c[_0x821af7(0x39e)](_0x2c241c[_0x821af7(0x889)]),_0x2c241c['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x17407e(0x56c)](Window_Base['prototype']),Window_PictureCoordinates[_0x17407e(0x374)][_0x17407e(0x2ea)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x17407e(0x374)]['initialize']=function(){const _0x5d6bef=_0x17407e;this[_0x5d6bef(0x3a6)]=_0x5d6bef(0x5ec),this['_lastX']=_0x5d6bef(0x5ec),this[_0x5d6bef(0x930)]=_0x5d6bef(0x5ec);const _0x338048=this[_0x5d6bef(0x82a)]();Window_Base[_0x5d6bef(0x374)][_0x5d6bef(0x829)][_0x5d6bef(0x8eb)](this,_0x338048),this[_0x5d6bef(0x3c0)](0x2);},Window_PictureCoordinates[_0x17407e(0x374)][_0x17407e(0x82a)]=function(){const _0x522e54=_0x17407e;let _0x272e17=0x0,_0x33c14e=Graphics[_0x522e54(0x2fc)]-this[_0x522e54(0x8af)](),_0x49a1b9=Graphics[_0x522e54(0x2b6)],_0x3b2a0f=this[_0x522e54(0x8af)]();return new Rectangle(_0x272e17,_0x33c14e,_0x49a1b9,_0x3b2a0f);},Window_PictureCoordinates[_0x17407e(0x374)]['updatePadding']=function(){this['padding']=0x0;},Window_PictureCoordinates[_0x17407e(0x374)][_0x17407e(0x8dc)]=function(){const _0x484fb9=_0x17407e;Window_Base[_0x484fb9(0x374)][_0x484fb9(0x8dc)]['call'](this),this['updateData']();},Window_PictureCoordinates[_0x17407e(0x374)][_0x17407e(0x5be)]=function(){const _0x402011=_0x17407e;if(!this['needsUpdate']())return;this[_0x402011(0x677)]();},Window_PictureCoordinates['prototype'][_0x17407e(0x91c)]=function(){const _0x47cfd7=_0x17407e,_0xce7f25=$gameTemp[_0x47cfd7(0x4ec)],_0x5ce44e=$gameScreen['picture'](_0xce7f25);if(_0x5ce44e)return this[_0x47cfd7(0x3a6)]!==_0x5ce44e[_0x47cfd7(0x4ea)]||this[_0x47cfd7(0x58d)]!==_0x5ce44e['_x']||this['_lastY']!==_0x5ce44e['_y'];else{if(_0x47cfd7(0x62c)!==_0x47cfd7(0x62c))_0x5ac80c[_0x47cfd7(0x21d)][_0x47cfd7(0x350)][_0x47cfd7(0x8eb)](this,_0xabb1f8,_0x20f594,_0x150c7b,_0x2e1bca,_0x2469e9),this[_0x47cfd7(0x727)]();else return![];}},Window_PictureCoordinates[_0x17407e(0x374)][_0x17407e(0x677)]=function(){const _0x1ae446=_0x17407e;this['contents'][_0x1ae446(0x938)]();const _0x32563f=$gameTemp[_0x1ae446(0x4ec)],_0x482933=$gameScreen[_0x1ae446(0x65a)](_0x32563f);if(!_0x482933)return;this[_0x1ae446(0x3a6)]=_0x482933[_0x1ae446(0x4ea)],this[_0x1ae446(0x58d)]=_0x482933['_x'],this[_0x1ae446(0x930)]=_0x482933['_y'];const _0x2179ea=ColorManager['itemBackColor1']();this[_0x1ae446(0x653)][_0x1ae446(0x415)](0x0,0x0,this[_0x1ae446(0x473)],this[_0x1ae446(0x3cb)],_0x2179ea);const _0x365180='\x20Origin:\x20%1'['format'](_0x482933[_0x1ae446(0x4ea)]===0x0?_0x1ae446(0x34e):_0x1ae446(0x862)),_0x4d58c1=_0x1ae446(0x340)['format'](_0x482933['_x']),_0x3be501='Y:\x20%1'[_0x1ae446(0x4eb)](_0x482933['_y']),_0x21a14a=_0x1ae446(0x775)[_0x1ae446(0x4eb)](TextManager[_0x1ae446(0x2c4)]('cancel'));let _0x42971c=Math[_0x1ae446(0x3d1)](this['innerWidth']/0x4);this[_0x1ae446(0x27d)](_0x365180,_0x42971c*0x0,0x0,_0x42971c),this[_0x1ae446(0x27d)](_0x4d58c1,_0x42971c*0x1,0x0,_0x42971c,_0x1ae446(0x98b)),this[_0x1ae446(0x27d)](_0x3be501,_0x42971c*0x2,0x0,_0x42971c,_0x1ae446(0x98b));const _0x1b4372=this[_0x1ae446(0x910)](_0x21a14a)[_0x1ae446(0x2b6)],_0x2988bc=this[_0x1ae446(0x473)]-_0x1b4372;this[_0x1ae446(0x1e0)](_0x21a14a,_0x2988bc,0x0,_0x1b4372);},VisuMZ[_0x17407e(0x23f)]=function(_0x1b0504){const _0x14595a=_0x17407e;if(Utils[_0x14595a(0x21a)](_0x14595a(0x3f5))){if('Nibrc'!==_0x14595a(0x91a))_0x293531+=_0x3e9c2e(_0x3e1774);else{var _0x3bbd60=require(_0x14595a(0x6e0))['Window'][_0x14595a(0x8b2)]();SceneManager[_0x14595a(0x2a0)]();if(_0x1b0504)setTimeout(_0x3bbd60['focus'][_0x14595a(0x9b5)](_0x3bbd60),0x190);}}},VisuMZ[_0x17407e(0x6da)]=function(_0x346788,_0x1e77d0){const _0x34cde1=_0x17407e;_0x1e77d0=_0x1e77d0[_0x34cde1(0x99a)]();var _0x428e42=1.70158,_0x54b37d=0.7;switch(_0x1e77d0){case'LINEAR':return _0x346788;case'INSINE':return-0x1*Math[_0x34cde1(0x413)](_0x346788*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x34cde1(0x372)](_0x346788*(Math['PI']/0x2));case _0x34cde1(0x402):return-0.5*(Math[_0x34cde1(0x413)](Math['PI']*_0x346788)-0x1);case _0x34cde1(0x9a7):return _0x346788*_0x346788;case _0x34cde1(0x697):return _0x346788*(0x2-_0x346788);case _0x34cde1(0x5a5):return _0x346788<0.5?0x2*_0x346788*_0x346788:-0x1+(0x4-0x2*_0x346788)*_0x346788;case _0x34cde1(0x7a7):return _0x346788*_0x346788*_0x346788;case _0x34cde1(0x730):var _0x4b67de=_0x346788-0x1;return _0x4b67de*_0x4b67de*_0x4b67de+0x1;case _0x34cde1(0x920):return _0x346788<0.5?0x4*_0x346788*_0x346788*_0x346788:(_0x346788-0x1)*(0x2*_0x346788-0x2)*(0x2*_0x346788-0x2)+0x1;case'INQUART':return _0x346788*_0x346788*_0x346788*_0x346788;case _0x34cde1(0x65c):var _0x4b67de=_0x346788-0x1;return 0x1-_0x4b67de*_0x4b67de*_0x4b67de*_0x4b67de;case _0x34cde1(0x1ca):var _0x4b67de=_0x346788-0x1;return _0x346788<0.5?0x8*_0x346788*_0x346788*_0x346788*_0x346788:0x1-0x8*_0x4b67de*_0x4b67de*_0x4b67de*_0x4b67de;case _0x34cde1(0x324):return _0x346788*_0x346788*_0x346788*_0x346788*_0x346788;case _0x34cde1(0x4e6):var _0x4b67de=_0x346788-0x1;return 0x1+_0x4b67de*_0x4b67de*_0x4b67de*_0x4b67de*_0x4b67de;case _0x34cde1(0x63f):var _0x4b67de=_0x346788-0x1;return _0x346788<0.5?0x10*_0x346788*_0x346788*_0x346788*_0x346788*_0x346788:0x1+0x10*_0x4b67de*_0x4b67de*_0x4b67de*_0x4b67de*_0x4b67de;case _0x34cde1(0x3d9):if(_0x346788===0x0)return 0x0;return Math[_0x34cde1(0x438)](0x2,0xa*(_0x346788-0x1));case _0x34cde1(0x4cf):if(_0x346788===0x1){if(_0x34cde1(0x7b0)===_0x34cde1(0x7b0))return 0x1;else{if(_0x113b96[_0x34cde1(0x21a)](_0x34cde1(0x3f5))){var _0x1359e2=_0xc6ed7a(_0x34cde1(0x6e0))[_0x34cde1(0x685)][_0x34cde1(0x8b2)]();_0x1f2f62[_0x34cde1(0x2a0)]();if(_0x287463)_0x27913a(_0x1359e2[_0x34cde1(0x87c)][_0x34cde1(0x9b5)](_0x1359e2),0x190);}}}return-Math['pow'](0x2,-0xa*_0x346788)+0x1;case _0x34cde1(0x30e):if(_0x346788===0x0||_0x346788===0x1){if('jersu'!==_0x34cde1(0x7c4))return _0x346788;else _0x28f95a[_0x34cde1(0x21d)][_0x34cde1(0x8ca)][_0x34cde1(0x8eb)](this,_0x71222f,_0x464619),this[_0x34cde1(0x727)]();}var _0xa18da=_0x346788*0x2,_0x2968e1=_0xa18da-0x1;if(_0xa18da<0x1){if(_0x34cde1(0x92c)==='YzRpb'){let _0x136f2e='',_0x396817=this[_0x34cde1(0x901)]+0x1;while(this[_0x34cde1(0x7cb)][_0x396817]&&this[_0x34cde1(0x7cb)][_0x396817][_0x34cde1(0x9a6)]===0x195){_0x136f2e+=this[_0x34cde1(0x7cb)][_0x396817]['parameters'][0x0]+'\x0a',_0x396817++;}return _0x136f2e;}else return 0.5*Math[_0x34cde1(0x438)](0x2,0xa*_0x2968e1);}return 0.5*(-Math[_0x34cde1(0x438)](0x2,-0xa*_0x2968e1)+0x2);case _0x34cde1(0x215):var _0xa18da=_0x346788/0x1;return-0x1*(Math['sqrt'](0x1-_0xa18da*_0x346788)-0x1);case _0x34cde1(0x472):var _0x4b67de=_0x346788-0x1;return Math[_0x34cde1(0x3ef)](0x1-_0x4b67de*_0x4b67de);case _0x34cde1(0x774):var _0xa18da=_0x346788*0x2,_0x2968e1=_0xa18da-0x2;if(_0xa18da<0x1)return _0x34cde1(0x4b7)!=='vbfJw'?this['_tilemap']||this:-0.5*(Math[_0x34cde1(0x3ef)](0x1-_0xa18da*_0xa18da)-0x1);return 0.5*(Math[_0x34cde1(0x3ef)](0x1-_0x2968e1*_0x2968e1)+0x1);case'INBACK':return _0x346788*_0x346788*((_0x428e42+0x1)*_0x346788-_0x428e42);case'OUTBACK':var _0xa18da=_0x346788/0x1-0x1;return _0xa18da*_0xa18da*((_0x428e42+0x1)*_0xa18da+_0x428e42)+0x1;break;case _0x34cde1(0x57d):var _0xa18da=_0x346788*0x2,_0x119abe=_0xa18da-0x2,_0x13b074=_0x428e42*1.525;if(_0xa18da<0x1)return 0.5*_0xa18da*_0xa18da*((_0x13b074+0x1)*_0xa18da-_0x13b074);return 0.5*(_0x119abe*_0x119abe*((_0x13b074+0x1)*_0x119abe+_0x13b074)+0x2);case'INELASTIC':if(_0x346788===0x0||_0x346788===0x1){if('FuDOR'!=='FuDOR'){const _0x195583=_0x4471d9[_0x34cde1(0x26b)];for(let _0x2042e8=0x1;_0x2042e8<=0x5;_0x2042e8++){if(this['_data']['key%1'[_0x34cde1(0x4eb)](_0x2042e8)]!==_0x195583['buttonAssistKey%1'[_0x34cde1(0x4eb)](_0x2042e8)]())return this[_0x34cde1(0x677)]();if(this[_0x34cde1(0x480)]['text%1'[_0x34cde1(0x4eb)](_0x2042e8)]!==_0x195583[_0x34cde1(0x692)[_0x34cde1(0x4eb)](_0x2042e8)]())return this[_0x34cde1(0x677)]();}}else return _0x346788;}var _0xa18da=_0x346788/0x1,_0x2968e1=_0xa18da-0x1,_0x20f781=0x1-_0x54b37d,_0x13b074=_0x20f781/(0x2*Math['PI'])*Math[_0x34cde1(0x9a5)](0x1);return-(Math['pow'](0x2,0xa*_0x2968e1)*Math['sin']((_0x2968e1-_0x13b074)*(0x2*Math['PI'])/_0x20f781));case _0x34cde1(0x26e):var _0x20f781=0x1-_0x54b37d,_0xa18da=_0x346788*0x2;if(_0x346788===0x0||_0x346788===0x1)return _0x346788;var _0x13b074=_0x20f781/(0x2*Math['PI'])*Math[_0x34cde1(0x9a5)](0x1);return Math[_0x34cde1(0x438)](0x2,-0xa*_0xa18da)*Math[_0x34cde1(0x372)]((_0xa18da-_0x13b074)*(0x2*Math['PI'])/_0x20f781)+0x1;case _0x34cde1(0x251):var _0x20f781=0x1-_0x54b37d;if(_0x346788===0x0||_0x346788===0x1)return _0x346788;var _0xa18da=_0x346788*0x2,_0x2968e1=_0xa18da-0x1,_0x13b074=_0x20f781/(0x2*Math['PI'])*Math[_0x34cde1(0x9a5)](0x1);if(_0xa18da<0x1){if('xPQaE'===_0x34cde1(0x266))return-0.5*(Math['pow'](0x2,0xa*_0x2968e1)*Math['sin']((_0x2968e1-_0x13b074)*(0x2*Math['PI'])/_0x20f781));else{if(_0x447882)_0x593de6[_0x34cde1(0x3fd)](_0x22b18c);}}return Math[_0x34cde1(0x438)](0x2,-0xa*_0x2968e1)*Math[_0x34cde1(0x372)]((_0x2968e1-_0x13b074)*(0x2*Math['PI'])/_0x20f781)*0.5+0x1;case _0x34cde1(0x3d6):var _0xa18da=_0x346788/0x1;if(_0xa18da<0x1/2.75)return 7.5625*_0xa18da*_0xa18da;else{if(_0xa18da<0x2/2.75){var _0x119abe=_0xa18da-1.5/2.75;return 7.5625*_0x119abe*_0x119abe+0.75;}else{if(_0xa18da<2.5/2.75){var _0x119abe=_0xa18da-2.25/2.75;return 7.5625*_0x119abe*_0x119abe+0.9375;}else{if(_0x34cde1(0x69a)!==_0x34cde1(0x6be)){var _0x119abe=_0xa18da-2.625/2.75;return 7.5625*_0x119abe*_0x119abe+0.984375;}else{if(!this[_0x34cde1(0x91c)]())return;this[_0x34cde1(0x677)]();}}}}case _0x34cde1(0x7c9):var _0xcd9571=0x1-VisuMZ[_0x34cde1(0x6da)](0x1-_0x346788,_0x34cde1(0x4b2));return _0xcd9571;case _0x34cde1(0x377):if(_0x346788<0.5){if(_0x34cde1(0x975)==='qBcnH')var _0xcd9571=VisuMZ[_0x34cde1(0x6da)](_0x346788*0x2,_0x34cde1(0x5fa))*0.5;else _0x1b1964[_0x34cde1(0x21d)][_0x34cde1(0x3b2)][_0x34cde1(0x8eb)](this,_0x20a8e1,_0x305a15,_0x1eb958,_0x6ea64b,_0x53489c,_0x18e8c0,_0x208172,_0x15e3be),this[_0x34cde1(0x31b)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4b8857]||{'x':0x0,'y':0x0});}else var _0xcd9571=VisuMZ[_0x34cde1(0x6da)](_0x346788*0x2-0x1,'outbounce')*0.5+0.5;return _0xcd9571;default:return _0x346788;}},VisuMZ[_0x17407e(0x6e6)]=function(_0x58ce66){const _0x2f5fad=_0x17407e;_0x58ce66=String(_0x58ce66)[_0x2f5fad(0x99a)]();const _0x4c1a51=VisuMZ[_0x2f5fad(0x21d)][_0x2f5fad(0x5cb)][_0x2f5fad(0x2d0)];if(_0x58ce66==='MAXHP')return _0x4c1a51[_0x2f5fad(0x41c)];if(_0x58ce66===_0x2f5fad(0x4a8))return _0x4c1a51[_0x2f5fad(0x741)];if(_0x58ce66===_0x2f5fad(0x6a7))return _0x4c1a51['IconParam2'];if(_0x58ce66===_0x2f5fad(0x6b0))return _0x4c1a51['IconParam3'];if(_0x58ce66===_0x2f5fad(0x254))return _0x4c1a51['IconParam4'];if(_0x58ce66==='MDF')return _0x4c1a51[_0x2f5fad(0x9af)];if(_0x58ce66===_0x2f5fad(0x970))return _0x4c1a51[_0x2f5fad(0x86d)];if(_0x58ce66===_0x2f5fad(0x478))return _0x4c1a51[_0x2f5fad(0x4cd)];if(_0x58ce66===_0x2f5fad(0x7fa))return _0x4c1a51[_0x2f5fad(0x48f)];if(_0x58ce66===_0x2f5fad(0x1ff))return _0x4c1a51[_0x2f5fad(0x88c)];if(_0x58ce66==='CRI')return _0x4c1a51[_0x2f5fad(0x622)];if(_0x58ce66===_0x2f5fad(0x8b5))return _0x4c1a51['IconXParam3'];if(_0x58ce66===_0x2f5fad(0x647))return _0x4c1a51[_0x2f5fad(0x36a)];if(_0x58ce66===_0x2f5fad(0x40f))return _0x4c1a51[_0x2f5fad(0x32b)];if(_0x58ce66===_0x2f5fad(0x286))return _0x4c1a51['IconXParam6'];if(_0x58ce66===_0x2f5fad(0x88b))return _0x4c1a51[_0x2f5fad(0x432)];if(_0x58ce66==='MRG')return _0x4c1a51[_0x2f5fad(0x265)];if(_0x58ce66==='TRG')return _0x4c1a51['IconXParam9'];if(_0x58ce66==='TGR')return _0x4c1a51[_0x2f5fad(0x515)];if(_0x58ce66===_0x2f5fad(0x383))return _0x4c1a51[_0x2f5fad(0x6fc)];if(_0x58ce66===_0x2f5fad(0x8b9))return _0x4c1a51['IconSParam2'];if(_0x58ce66===_0x2f5fad(0x525))return _0x4c1a51[_0x2f5fad(0x334)];if(_0x58ce66===_0x2f5fad(0x2de))return _0x4c1a51[_0x2f5fad(0x21e)];if(_0x58ce66===_0x2f5fad(0x6fb))return _0x4c1a51[_0x2f5fad(0x6cf)];if(_0x58ce66==='PDR')return _0x4c1a51[_0x2f5fad(0x54d)];if(_0x58ce66==='MDR')return _0x4c1a51[_0x2f5fad(0x965)];if(_0x58ce66===_0x2f5fad(0x83c))return _0x4c1a51[_0x2f5fad(0x24b)];if(_0x58ce66===_0x2f5fad(0x3c9))return _0x4c1a51[_0x2f5fad(0x70a)];if(VisuMZ['CoreEngine'][_0x2f5fad(0x500)][_0x58ce66])return VisuMZ[_0x2f5fad(0x21d)]['CustomParamIcons'][_0x58ce66]||0x0;return 0x0;},VisuMZ[_0x17407e(0x4ce)]=function(_0x57d51b,_0x719479,_0x181aa3){const _0xf27f5f=_0x17407e;if(_0x181aa3===undefined&&_0x57d51b%0x1===0x0)return _0x57d51b;if(_0x181aa3!==undefined&&[_0xf27f5f(0x69e),_0xf27f5f(0x4a8),_0xf27f5f(0x6a7),_0xf27f5f(0x6b0),_0xf27f5f(0x254),_0xf27f5f(0x2a5),'AGI',_0xf27f5f(0x478)][_0xf27f5f(0x25d)](String(_0x181aa3)[_0xf27f5f(0x99a)]()['trim']()))return _0x57d51b;_0x719479=_0x719479||0x0;if(VisuMZ[_0xf27f5f(0x21d)]['CustomParamAbb'][_0x181aa3])return VisuMZ[_0xf27f5f(0x21d)]['CustomParamType'][_0x181aa3]===_0xf27f5f(0x1f3)?_0x57d51b:String((_0x57d51b*0x64)[_0xf27f5f(0x403)](_0x719479))+'%';return String((_0x57d51b*0x64)[_0xf27f5f(0x403)](_0x719479))+'%';},VisuMZ[_0x17407e(0x1d0)]=function(_0x2b75fb){const _0x544dee=_0x17407e;_0x2b75fb=String(_0x2b75fb);if(!_0x2b75fb)return _0x2b75fb;if(typeof _0x2b75fb!==_0x544dee(0x2e6))return _0x2b75fb;const _0xd0bda8=VisuMZ['CoreEngine']['Settings'][_0x544dee(0x7e8)][_0x544dee(0x21f)]||_0x544dee(0x527),_0x3a0221={'maximumFractionDigits':0x6};_0x2b75fb=_0x2b75fb['replace'](/\[(.*?)\]/g,(_0x514bca,_0x52a4c8)=>{const _0x2a4446=_0x544dee;return VisuMZ[_0x2a4446(0x3e5)](_0x52a4c8,'[',']');}),_0x2b75fb=_0x2b75fb[_0x544dee(0x2dd)](/<(.*?)>/g,(_0x269cf6,_0x56b8a4)=>{const _0xea1a6e=_0x544dee;if(_0xea1a6e(0x590)!==_0xea1a6e(0x37b))return VisuMZ['PreserveNumbers'](_0x56b8a4,'<','>');else{const _0x40b920=_0x22fb95[_0xea1a6e(0x21d)]['Settings'][_0xea1a6e(0x577)];if(_0x40b920&&_0x40b920[_0xea1a6e(0x4ff)])return _0x40b920['vertJS'][_0xea1a6e(0x8eb)](this);const _0x4cbbe0=_0x3b2337[_0xea1a6e(0x666)]*0.75,_0x53e90a=_0x227795[_0xea1a6e(0x792)]*0.6,_0x161975=_0x23ef81[_0xea1a6e(0x2a1)];this['y']+=_0x12794d[_0xea1a6e(0x909)](_0x2c58bd[_0xea1a6e(0x212)](_0x4cbbe0)-_0x11a9ef['randomInt'](_0x53e90a))*(_0x1fe11e[_0xea1a6e(0x4f2)](_0x161975,0x1e)*0.5);}}),_0x2b75fb=_0x2b75fb[_0x544dee(0x2dd)](/\{\{(.*?)\}\}/g,(_0x4d1bf8,_0x24a1c2)=>{return VisuMZ['PreserveNumbers'](_0x24a1c2,'','');}),_0x2b75fb=_0x2b75fb['replace'](/(\d+\.?\d*)/g,(_0x55b8e0,_0x3e90be)=>{const _0x21335c=_0x544dee;let _0x5b10e3=_0x3e90be;if(_0x5b10e3[0x0]==='0')return _0x5b10e3;if(_0x5b10e3[_0x5b10e3[_0x21335c(0x62d)]-0x1]==='.')return Number(_0x5b10e3)['toLocaleString'](_0xd0bda8,_0x3a0221)+'.';else{if(_0x5b10e3[_0x5b10e3[_0x21335c(0x62d)]-0x1]===',')return Number(_0x5b10e3)['toLocaleString'](_0xd0bda8,_0x3a0221)+',';else{if(_0x21335c(0x1bc)!==_0x21335c(0x1bc))_0x314686[_0x21335c(0x819)](),_0xa76519['goto'](_0x2b1a6d);else return Number(_0x5b10e3)[_0x21335c(0x704)](_0xd0bda8,_0x3a0221);}}});let _0x171676=0x3;while(_0x171676--){_0x2b75fb=VisuMZ[_0x544dee(0x247)](_0x2b75fb);}return _0x2b75fb;},VisuMZ[_0x17407e(0x3e5)]=function(_0x306a1a,_0xb55b9e,_0x34f6ee){const _0xf955b3=_0x17407e;return _0x306a1a=_0x306a1a[_0xf955b3(0x2dd)](/(\d)/gi,(_0x40baec,_0x7264fe)=>_0xf955b3(0x652)[_0xf955b3(0x4eb)](Number(_0x7264fe))),_0xf955b3(0x9ae)[_0xf955b3(0x4eb)](_0x306a1a,_0xb55b9e,_0x34f6ee);},VisuMZ['RevertPreserveNumbers']=function(_0x5ce2c2){return _0x5ce2c2=_0x5ce2c2['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4b84a8,_0x1fdc24)=>Number(parseInt(_0x1fdc24))),_0x5ce2c2;},VisuMZ[_0x17407e(0x950)]=function(_0x533a4d){const _0x4aaaed=_0x17407e;SoundManager[_0x4aaaed(0x80d)]();if(!Utils[_0x4aaaed(0x6e7)]()){if(_0x4aaaed(0x679)===_0x4aaaed(0x679)){const _0x1d4929=window[_0x4aaaed(0x76d)](_0x533a4d,_0x4aaaed(0x680));}else return _0x57c76b[_0x4aaaed(0x21d)][_0x4aaaed(0x5cb)][_0x4aaaed(0x685)]['RowSpacing'];}else{const _0x58ade1=process[_0x4aaaed(0x2f7)]==_0x4aaaed(0x5d6)?'open':process[_0x4aaaed(0x2f7)]==_0x4aaaed(0x4f3)?_0x4aaaed(0x650):_0x4aaaed(0x302);require(_0x4aaaed(0x34a))[_0x4aaaed(0x5ba)](_0x58ade1+'\x20'+_0x533a4d);}},Game_Picture[_0x17407e(0x374)][_0x17407e(0x466)]=function(){const _0x28b1ea=_0x17407e;return this[_0x28b1ea(0x802)];},VisuMZ[_0x17407e(0x21d)]['Game_Picture_initBasic']=Game_Picture[_0x17407e(0x374)][_0x17407e(0x997)],Game_Picture['prototype'][_0x17407e(0x997)]=function(){const _0x59516c=_0x17407e;VisuMZ[_0x59516c(0x21d)][_0x59516c(0x366)][_0x59516c(0x8eb)](this),this[_0x59516c(0x802)]={'x':0x0,'y':0x0},this[_0x59516c(0x624)]={'x':0x0,'y':0x0};},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x243)]=Game_Picture['prototype']['updateMove'],Game_Picture['prototype'][_0x17407e(0x35e)]=function(){const _0x1f179b=_0x17407e;this[_0x1f179b(0x7e9)]();const _0x49c27f=this[_0x1f179b(0x338)];VisuMZ[_0x1f179b(0x21d)][_0x1f179b(0x243)][_0x1f179b(0x8eb)](this),_0x49c27f>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x1f179b(0x603)],this['_y']=this[_0x1f179b(0x2dc)],this[_0x1f179b(0x569)]=this['_targetScaleX'],this['_scaleY']=this['_targetScaleY'],this[_0x1f179b(0x45d)]=this[_0x1f179b(0x1f1)],this[_0x1f179b(0x802)]&&(this[_0x1f179b(0x802)]['x']=this[_0x1f179b(0x624)]['x'],this['_anchor']['y']=this['_targetAnchor']['y']));},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture['prototype'][_0x17407e(0x46f)],Game_Picture[_0x17407e(0x374)][_0x17407e(0x46f)]=function(_0x1e6651,_0x57d24c,_0x3606f2,_0x28acd4,_0x2e760c,_0x4d0b8c,_0x2f9148,_0x3b40bc){const _0x1ce54a=_0x17407e;VisuMZ[_0x1ce54a(0x21d)][_0x1ce54a(0x3b2)][_0x1ce54a(0x8eb)](this,_0x1e6651,_0x57d24c,_0x3606f2,_0x28acd4,_0x2e760c,_0x4d0b8c,_0x2f9148,_0x3b40bc),this[_0x1ce54a(0x31b)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x57d24c]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x17407e(0x2b0)]=Game_Picture[_0x17407e(0x374)][_0x17407e(0x400)],Game_Picture[_0x17407e(0x374)][_0x17407e(0x400)]=function(_0x167399,_0x1160ff,_0x1a76cf,_0x564e8b,_0x23e6af,_0x31f0ed,_0x54dee9,_0x9591ab,_0x4cb2da){const _0x135674=_0x17407e;VisuMZ[_0x135674(0x21d)]['Game_Picture_move'][_0x135674(0x8eb)](this,_0x167399,_0x1160ff,_0x1a76cf,_0x564e8b,_0x23e6af,_0x31f0ed,_0x54dee9,_0x9591ab,_0x4cb2da),this[_0x135674(0x1d9)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x167399]||{'x':0x0,'y':0x0});},Game_Picture[_0x17407e(0x374)][_0x17407e(0x7e9)]=function(){const _0x2712d0=_0x17407e;this[_0x2712d0(0x338)]>0x0&&(this['_anchor']['x']=this[_0x2712d0(0x368)](this[_0x2712d0(0x802)]['x'],this[_0x2712d0(0x624)]['x']),this['_anchor']['y']=this[_0x2712d0(0x368)](this[_0x2712d0(0x802)]['y'],this[_0x2712d0(0x624)]['y']));},Game_Picture[_0x17407e(0x374)][_0x17407e(0x31b)]=function(_0x387135){const _0x26cb9e=_0x17407e;this[_0x26cb9e(0x802)]=_0x387135,this[_0x26cb9e(0x624)]=JsonEx[_0x26cb9e(0x878)](this['_anchor']);},Game_Picture[_0x17407e(0x374)]['setTargetAnchor']=function(_0x2555cd){const _0x5c95b1=_0x17407e;this[_0x5c95b1(0x624)]=_0x2555cd;},VisuMZ['CoreEngine'][_0x17407e(0x3ac)]=Sprite_Picture['prototype'][_0x17407e(0x974)],Sprite_Picture[_0x17407e(0x374)][_0x17407e(0x974)]=function(){const _0x58a097=_0x17407e,_0x22a9c9=this[_0x58a097(0x65a)]();if(!_0x22a9c9[_0x58a097(0x466)]()){if(_0x58a097(0x957)!==_0x58a097(0x660))VisuMZ[_0x58a097(0x21d)][_0x58a097(0x3ac)][_0x58a097(0x8eb)](this);else{const _0x379810=this[_0x58a097(0x794)],_0x132377=this[_0x58a097(0x794)],_0x428c27=this[_0x58a097(0x5a3)][_0x58a097(0x51e)]*(this[_0x58a097(0x742)]?-0x1:0x1)-_0x379810/0x2,_0x5a7201=this[_0x58a097(0x5a3)][_0x58a097(0x1f7)]-_0x132377/0x2,_0x799e0f=this[_0x58a097(0x827)](_0x157274);_0x2d5676['gl'][_0x58a097(0x6aa)](_0x428c27+_0x799e0f['x'],_0x5a7201+_0x799e0f['y'],_0x379810,_0x132377);}}else{if(_0x58a097(0x80b)===_0x58a097(0x4c7))return this;else this[_0x58a097(0x466)]['x']=_0x22a9c9['anchor']()['x'],this[_0x58a097(0x466)]['y']=_0x22a9c9['anchor']()['y'];}},Game_Action[_0x17407e(0x374)][_0x17407e(0x5ad)]=function(_0x4bea96){const _0x345a75=_0x17407e;if(_0x4bea96){const _0x4a3eaf=_0x4bea96[_0x345a75(0x530)];if(_0x4a3eaf===0x1&&this[_0x345a75(0x726)]()['attackSkillId']()!==0x1)this['setAttack']();else{if(_0x4a3eaf===0x2&&this['subject']()[_0x345a75(0x87e)]()!==0x2){if(_0x345a75(0x358)!==_0x345a75(0x358)){for(const _0x43950e of this[_0x345a75(0x814)]){!_0x43950e[_0x345a75(0x7e4)]()&&this[_0x345a75(0x512)](_0x43950e);}this[_0x345a75(0x8f2)]();}else this[_0x345a75(0x735)]();}else this[_0x345a75(0x8c9)](_0x4a3eaf);}}else{if('ybtTW'!==_0x345a75(0x1df))this[_0x345a75(0x938)]();else{var _0x736c32=_0x3523e0(_0x1b35bf['$1'])/0x64;_0x41edcb+=_0x736c32;}}},Game_Actor['prototype'][_0x17407e(0x6ab)]=function(){const _0x2f124b=_0x17407e;return this['skills']()[_0x2f124b(0x4b6)](_0x3ccfed=>this[_0x2f124b(0x2d6)](_0x3ccfed)&&this['skillTypes']()[_0x2f124b(0x25d)](_0x3ccfed[_0x2f124b(0x7b1)]));},Window_Base[_0x17407e(0x374)]['createDimmerSprite']=function(){const _0x23d60e=_0x17407e;this['_dimmerSprite']=new Sprite(),this[_0x23d60e(0x226)][_0x23d60e(0x424)]=new Bitmap(0x0,0x0),this[_0x23d60e(0x226)]['x']=0x0,this[_0x23d60e(0x8ad)](this['_dimmerSprite']);},Window_Base[_0x17407e(0x374)][_0x17407e(0x336)]=function(){const _0x259ec5=_0x17407e;if(this[_0x259ec5(0x226)]){if('xrljV'!==_0x259ec5(0x224)){const _0x85cee1=this[_0x259ec5(0x226)][_0x259ec5(0x424)],_0x2e1e94=this['width'],_0x1512cc=this[_0x259ec5(0x2fc)],_0x39e3e8=this[_0x259ec5(0x83d)],_0xec6ea1=ColorManager[_0x259ec5(0x9b0)](),_0x6d6048=ColorManager[_0x259ec5(0x842)]();_0x85cee1['resize'](_0x2e1e94,_0x1512cc),_0x85cee1['gradientFillRect'](0x0,0x0,_0x2e1e94,_0x39e3e8,_0x6d6048,_0xec6ea1,!![]),_0x85cee1[_0x259ec5(0x415)](0x0,_0x39e3e8,_0x2e1e94,_0x1512cc-_0x39e3e8*0x2,_0xec6ea1),_0x85cee1[_0x259ec5(0x787)](0x0,_0x1512cc-_0x39e3e8,_0x2e1e94,_0x39e3e8,_0xec6ea1,_0x6d6048,!![]),this[_0x259ec5(0x226)][_0x259ec5(0x87b)](0x0,0x0,_0x2e1e94,_0x1512cc);}else _0x434aee[_0x259ec5(0x560)]();}},Game_Actor['prototype'][_0x17407e(0x949)]=function(){const _0x3edaaa=_0x17407e;for(let _0x559b6b=0x0;_0x559b6b<this[_0x3edaaa(0x1f0)]();_0x559b6b++){if(_0x3edaaa(0x721)===_0x3edaaa(0x721)){const _0x3e7b6c=this[_0x3edaaa(0x313)]();let _0x2c010b=Number[_0x3edaaa(0x6eb)];this['setAction'](_0x559b6b,_0x3e7b6c[0x0]);for(const _0x12a1af of _0x3e7b6c){const _0x2c28d5=_0x12a1af['evaluate']();if(_0x2c28d5>_0x2c010b){if(_0x3edaaa(0x50d)!=='EggXN')return _0x349a7b['CoreEngine']['Settings'][_0x3edaaa(0x681)][_0x3edaaa(0x55c)]['call'](this,_0x2d4945);else _0x2c010b=_0x2c28d5,this['setAction'](_0x559b6b,_0x12a1af);}}}else this[_0x3edaaa(0x5c1)]['setBackgroundType'](_0x338be8[_0x3edaaa(0x7e0)][_0x3edaaa(0x351)]);}this[_0x3edaaa(0x556)](_0x3edaaa(0x995));},Window_BattleItem[_0x17407e(0x374)][_0x17407e(0x1b7)]=function(_0x144d7c){const _0xca9231=_0x17407e;if(BattleManager[_0xca9231(0x9b8)]())return BattleManager[_0xca9231(0x9b8)]()[_0xca9231(0x2d6)](_0x144d7c);else{if(_0xca9231(0x25a)===_0xca9231(0x25a))return Window_ItemList[_0xca9231(0x374)][_0xca9231(0x1b7)][_0xca9231(0x8eb)](this,_0x144d7c);else this['_forcedBattleSys']=_0xca9231(0x505);}},VisuMZ[_0x17407e(0x21d)]['Scene_Map_createSpritesetFix']=Scene_Map[_0x17407e(0x374)]['createSpriteset'],Scene_Map[_0x17407e(0x374)]['createSpriteset']=function(){const _0x393676=_0x17407e;VisuMZ['CoreEngine']['Scene_Map_createSpritesetFix'][_0x393676(0x8eb)](this);const _0x43c387=this[_0x393676(0x5b9)][_0x393676(0x250)];if(_0x43c387)this[_0x393676(0x809)](_0x43c387);},VisuMZ['CoreEngine'][_0x17407e(0x8d3)]=Scene_Battle['prototype'][_0x17407e(0x971)],Scene_Battle[_0x17407e(0x374)]['createSpriteset']=function(){const _0x29b760=_0x17407e;VisuMZ[_0x29b760(0x21d)][_0x29b760(0x8d3)]['call'](this);const _0xb3ea=this['_spriteset']['_timerSprite'];if(_0xb3ea)this[_0x29b760(0x809)](_0xb3ea);},Sprite_Actor[_0x17407e(0x374)][_0x17407e(0x8dc)]=function(){const _0x2f2df5=_0x17407e;Sprite_Battler['prototype']['update'][_0x2f2df5(0x8eb)](this),this[_0x2f2df5(0x5df)]();if(this[_0x2f2df5(0x6f2)]){if(_0x2f2df5(0x770)==='GEVxn')this[_0x2f2df5(0x7aa)]();else return _0xb1163e[_0x2f2df5(0x21d)][_0x2f2df5(0x5cb)][_0x2f2df5(0x685)][_0x2f2df5(0x4ca)];}else{if(this[_0x2f2df5(0x7fd)]!==''){if('OQwDW'!==_0x2f2df5(0x24d))this[_0x2f2df5(0x7fd)]='';else return!![];}}},Window[_0x17407e(0x374)][_0x17407e(0x1d6)]=function(){const _0x194f83=_0x17407e,_0x5b1080=this[_0x194f83(0x752)],_0x4309d6=this[_0x194f83(0x6d0)],_0x3820c5=0x18,_0x14f757=_0x3820c5/0x2,_0x413463=0x60+_0x3820c5,_0xf2d8a6=0x0+_0x3820c5;this[_0x194f83(0x1cf)][_0x194f83(0x424)]=this[_0x194f83(0x915)],this[_0x194f83(0x1cf)][_0x194f83(0x466)]['x']=0.5,this[_0x194f83(0x1cf)][_0x194f83(0x466)]['y']=0.5,this['_downArrowSprite'][_0x194f83(0x87b)](_0x413463+_0x14f757,_0xf2d8a6+_0x14f757+_0x3820c5,_0x3820c5,_0x14f757),this[_0x194f83(0x1cf)][_0x194f83(0x400)](Math['round'](_0x5b1080/0x2),Math['round'](_0x4309d6-_0x14f757)),this[_0x194f83(0x1d8)][_0x194f83(0x424)]=this['_windowskin'],this[_0x194f83(0x1d8)][_0x194f83(0x466)]['x']=0.5,this[_0x194f83(0x1d8)][_0x194f83(0x466)]['y']=0.5,this[_0x194f83(0x1d8)][_0x194f83(0x87b)](_0x413463+_0x14f757,_0xf2d8a6,_0x3820c5,_0x14f757),this[_0x194f83(0x1d8)][_0x194f83(0x400)](Math[_0x194f83(0x909)](_0x5b1080/0x2),Math[_0x194f83(0x909)](_0x14f757));},Window[_0x17407e(0x374)][_0x17407e(0x5cd)]=function(){const _0x21566e=_0x17407e,_0x55a0be=0x90,_0x381920=0x60,_0x34434b=0x18;this[_0x21566e(0x20f)]['bitmap']=this[_0x21566e(0x915)],this[_0x21566e(0x20f)][_0x21566e(0x466)]['x']=0.5,this['_pauseSignSprite']['anchor']['y']=0x1,this[_0x21566e(0x20f)][_0x21566e(0x400)](Math[_0x21566e(0x909)](this[_0x21566e(0x752)]/0x2),this[_0x21566e(0x6d0)]),this['_pauseSignSprite'][_0x21566e(0x87b)](_0x55a0be,_0x381920,_0x34434b,_0x34434b),this[_0x21566e(0x20f)][_0x21566e(0x352)]=0xff;},Window[_0x17407e(0x374)]['_updateFilterArea']=function(){const _0x296b97=_0x17407e,_0x28e4e2=this[_0x296b97(0x371)][_0x296b97(0x3f1)][_0x296b97(0x501)](new Point(0x0,0x0)),_0x588471=this[_0x296b97(0x371)][_0x296b97(0x1dc)];_0x588471['x']=_0x28e4e2['x']+this[_0x296b97(0x6c0)]['x'],_0x588471['y']=_0x28e4e2['y']+this[_0x296b97(0x6c0)]['y'],_0x588471[_0x296b97(0x2b6)]=Math[_0x296b97(0x275)](this[_0x296b97(0x473)]*this['scale']['x']),_0x588471[_0x296b97(0x2fc)]=Math[_0x296b97(0x275)](this[_0x296b97(0x3cb)]*this[_0x296b97(0x4f9)]['y']);},Window[_0x17407e(0x374)][_0x17407e(0x258)]=function(){const _0x2d73a6=_0x17407e,_0x5970fc=this['_margin'],_0x5aef56=Math[_0x2d73a6(0x531)](0x0,this[_0x2d73a6(0x752)]-_0x5970fc*0x2),_0x1bff12=Math[_0x2d73a6(0x531)](0x0,this[_0x2d73a6(0x6d0)]-_0x5970fc*0x2),_0x18e6e3=this['_backSprite'],_0xb4bd10=_0x18e6e3[_0x2d73a6(0x8c5)][0x0];_0x18e6e3[_0x2d73a6(0x424)]=this[_0x2d73a6(0x915)],_0x18e6e3[_0x2d73a6(0x87b)](0x0,0x0,0x60,0x60),_0x18e6e3['move'](_0x5970fc,_0x5970fc),_0x18e6e3[_0x2d73a6(0x4f9)]['x']=_0x5aef56/0x60,_0x18e6e3['scale']['y']=_0x1bff12/0x60,_0xb4bd10['bitmap']=this[_0x2d73a6(0x915)],_0xb4bd10['setFrame'](0x0,0x60,0x60,0x60),_0xb4bd10['move'](0x0,0x0,_0x5aef56,_0x1bff12),_0xb4bd10[_0x2d73a6(0x4f9)]['x']=0x1/_0x18e6e3[_0x2d73a6(0x4f9)]['x'],_0xb4bd10['scale']['y']=0x1/_0x18e6e3[_0x2d73a6(0x4f9)]['y'],_0x18e6e3['setColorTone'](this['_colorTone']);},Game_Temp[_0x17407e(0x374)][_0x17407e(0x42f)]=function(){const _0xb09db2=_0x17407e;this[_0xb09db2(0x67c)]=[],this[_0xb09db2(0x935)]=[],this[_0xb09db2(0x776)]=[],this['_balloonQueue']=[];},VisuMZ['CoreEngine'][_0x17407e(0x841)]=Scene_Base[_0x17407e(0x374)][_0x17407e(0x687)],Scene_Base[_0x17407e(0x374)]['terminate']=function(){const _0x434360=_0x17407e;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ['CoreEngine'][_0x434360(0x841)][_0x434360(0x8eb)](this);},Bitmap['prototype'][_0x17407e(0x3fb)]=function(_0x34c34b){const _0x58049c=_0x17407e,_0x5a35e0=this[_0x58049c(0x45e)];_0x5a35e0['save'](),_0x5a35e0[_0x58049c(0x5c4)]=this[_0x58049c(0x7ee)]();const _0x4b11cb=_0x5a35e0['measureText'](_0x34c34b)[_0x58049c(0x2b6)];return _0x5a35e0['restore'](),_0x4b11cb;},Window_Message['prototype'][_0x17407e(0x28d)]=function(_0x59e113){const _0x4a6e2b=_0x17407e;return this[_0x4a6e2b(0x781)]()?this[_0x4a6e2b(0x653)]['measureTextWidthNoRounding'](_0x59e113):Window_Base[_0x4a6e2b(0x374)][_0x4a6e2b(0x28d)][_0x4a6e2b(0x8eb)](this,_0x59e113);},Window_Message['prototype']['useFontWidthFix']=function(){const _0x207280=_0x17407e;return VisuMZ[_0x207280(0x21d)][_0x207280(0x5cb)][_0x207280(0x7e8)]['FontWidthFix']??!![];},VisuMZ['CoreEngine'][_0x17407e(0x6a0)]=Game_Action[_0x17407e(0x374)][_0x17407e(0x2bb)],Game_Action[_0x17407e(0x374)][_0x17407e(0x2bb)]=function(){const _0x20f32e=_0x17407e;if(this[_0x20f32e(0x439)]())return VisuMZ[_0x20f32e(0x21d)][_0x20f32e(0x6a0)][_0x20f32e(0x8eb)](this);else{if('WSjEH'!==_0x20f32e(0x6dc)){var _0x51035c=_0x61e0af(_0x411605['$1'])/0x64;_0x42f7fb+=_0x51035c;}else return 0x0;}},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x318)]=Game_Action[_0x17407e(0x374)][_0x17407e(0x4a3)],Game_Action[_0x17407e(0x374)][_0x17407e(0x4a3)]=function(){const _0x35e6d3=_0x17407e;this['subject']()&&this[_0x35e6d3(0x726)]()[_0x35e6d3(0x223)]()?VisuMZ[_0x35e6d3(0x21d)][_0x35e6d3(0x318)]['call'](this):this['clear']();},Sprite_Name[_0x17407e(0x374)][_0x17407e(0x22f)]=function(){return 0x24;},Sprite_Name['prototype'][_0x17407e(0x498)]=function(){const _0x369d03=_0x17407e,_0x3338f1=this[_0x369d03(0x506)](),_0x32e403=this[_0x369d03(0x7f3)](),_0x368d3b=this[_0x369d03(0x22f)]();this[_0x369d03(0x7ab)](),this[_0x369d03(0x424)][_0x369d03(0x938)](),this[_0x369d03(0x424)][_0x369d03(0x5ee)](_0x3338f1,0x0,0x0,_0x32e403,_0x368d3b,_0x369d03(0x917));},Bitmap['prototype'][_0x17407e(0x5ee)]=function(_0x2c4530,_0x201626,_0x5b9267,_0x10bc6c,_0x376fbe,_0x58c418){const _0x2a3b9e=_0x17407e,_0x13f3b6=this[_0x2a3b9e(0x45e)],_0x3e1400=_0x13f3b6['globalAlpha'];_0x10bc6c=_0x10bc6c||0xffffffff;let _0x2e3abd=_0x201626,_0x43319b=Math['round'](_0x5b9267+0x18/0x2+this[_0x2a3b9e(0x1c5)]*0.35);_0x58c418===_0x2a3b9e(0x98b)&&(_0x2e3abd+=_0x10bc6c/0x2);if(_0x58c418===_0x2a3b9e(0x1ad)){if(_0x2a3b9e(0x8c8)==='NFRjp')_0x2e3abd+=_0x10bc6c;else{const _0x3249c0=_0x3d5dfb[_0x2a3b9e(0x1b4)]()<=_0x4ded03;_0x311e7e[_0x2a3b9e(0x61a)](_0x5ef782,_0x3249c0);}}_0x13f3b6['save'](),_0x13f3b6[_0x2a3b9e(0x5c4)]=this[_0x2a3b9e(0x7ee)](),_0x13f3b6[_0x2a3b9e(0x450)]=_0x58c418,_0x13f3b6[_0x2a3b9e(0x984)]=_0x2a3b9e(0x314),_0x13f3b6[_0x2a3b9e(0x757)]=0x1,this[_0x2a3b9e(0x7bb)](_0x2c4530,_0x2e3abd,_0x43319b,_0x10bc6c),_0x13f3b6['globalAlpha']=_0x3e1400,this[_0x2a3b9e(0x8d6)](_0x2c4530,_0x2e3abd,_0x43319b,_0x10bc6c),_0x13f3b6[_0x2a3b9e(0x5ef)](),this[_0x2a3b9e(0x28e)][_0x2a3b9e(0x8dc)]();},VisuMZ[_0x17407e(0x21d)][_0x17407e(0x6e4)]=BattleManager[_0x17407e(0x262)],BattleManager['checkSubstitute']=function(_0x3da924){const _0x50c800=_0x17407e;if(this[_0x50c800(0x5b2)][_0x50c800(0x772)]())return![];return VisuMZ['CoreEngine'][_0x50c800(0x6e4)]['call'](this,_0x3da924);};