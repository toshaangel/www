//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.15] [CoreEngine]
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
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
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
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
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
 * === Picture Plugin Commands ===
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB wait: Time Progress Battle (Wait)
 *     - -
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
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
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
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
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
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
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
 *   Outline Color:
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
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
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
 * @max 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @max 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
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
 * @max 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @max 1
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
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
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
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
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
 * @max 1
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
 * @max 1
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
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
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
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
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
 * @default {"NameInput":"","EnableNameInput:eval":"true","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress the \\\\c[5]arrow keys\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
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
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
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
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\"\"}"]
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
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
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
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFromt(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * @desc Runs a common event each time a new game is started.
 * @default 0
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
 * @min 0
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
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
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
 * @text Outline Color
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
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
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress the \\c[5]arrow keys\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
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
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
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
//=============================================================================

const _0x2695=['DummyRect','_itemWindow','mainAreaTop','eRwDe','Window_Base_drawIcon','OGWXB','includes','gaugeHeight','processKeyboardHome','EREOF','Color','(\x5cd+)>','SkillTypeRect','luwNa','WIN_OEM_FJ_ROYA','Game_Temp_initialize','%1%2','isPressed','ApplyEasing','SsXCM','children','updatePositionCoreEngineShakeVert','startMove','hUTfj','repeat','Window_Base_drawCharacter','padding','QoL','ButtonAssist','RQmtU','mainCommandWidth','Scene_Battle_update','ColorMaxLvGauge2','ItemHeight','IconParam6','trim','uiAreaWidth','isTriggered','DummyBgType','prototype','setWindowPadding','isArrowPressed','Sprite_destroy','Window_Base_update','none','ButtonFadeSpeed','maxLvGaugeColor1','clone','return\x200','RowSpacing','DigitGroupingGaugeSprites','TitleCommandList','DLLat','Window_NumberInput_processDigitChange','system','ParseActorNotetags','originalJS','DigitGroupingDamageSprites','Subtitle','buttonAssistOffset3','keypress','ColorTPCost','createFauxAnimationSprite','QcynX','_defaultStretchMode','initCoreEasing','IconSet','OUTSINE','InputRect','scaleSprite','makeFontSmaller','QaYzC','sellWindowRect','OUTCUBIC','CTRL','paramName','printError','inputWindowRect','scaleMode','INOUTCIRC','updateClose','version','WIN_OEM_JUMP','applyCoreEasing','ParseTilesetNotetags','<%1\x20%2:[\x20]','Scene_Options_create','_closing','AkqtL','titles1','onKeyDownKeysF6F7','paramMax','changeClass','DavMt','xparamPlusJS','goldWindowRect','onMouseExit','ColorPowerUp','pageup','itemWindowRect','updateMain','encounterStepsMinimum','NEAREST','aLlrR','VisuMZ_2_BattleSystemCTB','isRepeated','XParamVocab7','playBuzzer','NUMPAD0','xparamRate2','startNormalGame','Scene_Unlisted','ItemBgType','LEckI','QwertyLayout','backspace','DisplayedParams','IconSParam0','name','ONE_MINUS_SRC_ALPHA','GRD','STRUCT','Scene_Battle_createCancelButton','opacity','tlDPZ','process_VisuMZ_CoreEngine_jsQuickFunctions','dsSld','_helpWindow','ProfileRect','DOLLAR','targetX','CommandBgType','WIN_ICO_HELP','NameInputMessage','addWindow','CLOSE_BRACKET','REC','wait','HnTSU','Scene_MenuBase_mainAreaHeight','FneQh','Window_NameInput_cursorUp','_stored_pendingColor','BoxMargin','_number','lRzKB','OkText','nSLZf','drawCurrencyValue','ESC','value','filters','Padding','pictures','menu','fPxWk','makeCoreEngineCommandList','Bqpgf','Scene_Item_create','buttonAssistText3','jcKMA','lineHeight','createCustomParameter','JUNJA','Rate2','vTpvL','VOLUME_MUTE','drawAllParams','playTestF6','isOpenAndActive','ZIfNf','note','ParseWeaponNotetags','skillTypes','Sprite_Button_initialize','<JS\x20%1\x20%2:[\x20](.*)>','_statusEquipWindow','F7key','F17','_forcedTroopView','OnLoadJS','length','iXetq','isActor','EnableMasking','Input_shouldPreventDefault','profileWindowRect','boxHeight','keyCode','aLhtz','targetEvaRate','removeChild','Game_Picture_x','translucentOpacity','SCROLL_LOCK','_commandList','buttonAssistKey4','updatePlayTestF7','sv_actors','round','ARRAYNUM','Input_clear','Eepiy','WIN_OEM_PA2','RepositionActors','TPB\x20ACTIVE','buttonAreaHeight','string','CAPSLOCK','setActorHomeRepositioned','index','EnableJS','item','jzCJa','eventsXyNt','createFauxAnimation','helpAreaBottom','DTB','Scene_Map_createMenuButton','ColorTPGauge2','move','xdg-open','zKJuO','xparamRateJS','lsYGd','mWIRU','TILDE','TRG','adjustSprite','Scene_Map_updateMainMultiply','processTouch','itypeId','applyForcedGameTroopSettingsCoreEngine','maxCols','ParamChange','ctGaugeColor2','setTargetAnchor','buttonAssistText1','processFauxAnimationRequests','_isPlaytest','drawGameSubtitle','HYPHEN_MINUS','uExTI','loadTitle2','_movementWholeDuration','isBusy','_screenY','BuyRect','Window_NameInput_processHandling','removeFauxAnimation','_mode','loadTitle1','keyMapper','width','mainAreaHeightSideButtonLayout','maxItems','ColorPowerDown','faces','floor','updateAnchor','_maxDigits','NUMPAD5','SellRect','isMVAnimation','PLAY','sQccx','Total','sBSKj','jcroV','yguIA','match','MhRAY','ColorCrisis','Plus1','cursorUp','pictureId','_shouldPreventDefault','AccuracyBoost','CRSEL','RevertPreserveNumbers','Rate1','resetFontSettings','targetObjects','rightArrowWidth','_onKeyPress','Sprite_Animation_processSoundTimings','maxBattleMembers','isBeingTouched','DeFnm','processTimingData','LevelUpFullHp','terminate','Wait','_lastPluginCommandInterpreter','isWindowMaskingEnabled','helpAreaTop','CustomParamType','itemHitImprovedAccuracy','KQjRS','Spriteset_Battle_createEnemies','gainGold','createBackground','SxdmE','params','isCollidedWithEvents','XNUfn','SParamVocab0','sparamFlatBonus','PDR','down2','itemHeight','OptionsMenu','updatePositionCoreEngineShakeHorz','XParamVocab5','_drawTextShadow','BACK_SLASH','UZaoQ','BattleSystem','DefaultStyle','onPress','GREATER_THAN','backOpacity','ActorBgType','sv_enemies','RvQXF','performEscape','PERCENT','isEnemy','WIN_OEM_CUSEL','SNrHC','REPLACE','hpGaugeColor2','exp','GroupDigits','EISU','loadBitmap','hide','Scene_MenuBase_helpAreaTop','paramBase','categoryWindowRect','BFciO','IconSParam3','_skillTypeWindow','onNameOk','createFauxAnimationQueue','amMZS','_isButtonHidden','Window_Selectable_processCursorMove','Keyboard','cos','_buttonAssistWindow','HELP','CallHandlerJS','Game_Picture_show','setCoreEngineScreenShakeStyle','KeyItemProtect','INQUINT','IconXParam9','updateTransform','statusWindowRect','mpGaugeColor2','STR','markCoreEngineModified','onEscapeSuccess','charCode','EXR','paramBaseAboveLevel99','isBottomHelpMode','mIcce','F23','_dimmerSprite','isOpen','INOUTELASTIC','F22','onButtonImageLoad','_CoreEngine_Cache_textSizeEx','drawIcon','popScene','Bitmap_clearRect','targetBackOpacity','DrawIcons','parameters','numActions','Layer','SParameterFormula','levelUpRecovery','touchUI','_hideTileShadows','ZvZKc','XParamVocab4','vertJS','helpAreaHeight','XParamVocab1','paramRate','setupNewGame','hideButtonFromView','BsMpg','NameMenu','jpFSX','loadSystemImages','buttonAssistWindowRect','SParamVocab6','statusEquipWindowRect','fontSize','xparamPlus1','_isWindow','_stored_hpGaugeColor2','contains','SLEEP','useDigitGrouping','sparamRateJS','font-smooth','dummyWindowRect','isAnimationForEach','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_screenX','WIN_OEM_FJ_MASSHOU','GameEnd','_targetAnchor','Scene_MenuBase_mainAreaTop','requestFauxAnimation','ActorHPColor','MAX_SAFE_INTEGER','MCR','MultiKeyFmt','calcEasing','updateOrigin','max','_stored_powerUpColor','_mapNameWindow','XParamVocab6','ParamName','Hvxyr','anchorCoreEasing','stencilOp','ShowDevTools','ValueJS','VglvG','loadPicture','toString','HOoQd','NUMPAD4','img/%1/','VoXnx','_profileWindow','tpColor','reservePlayTestNewGameCommonEvent','VWymd','processCursorMoveModernControls','INBOUNCE','PGUP','CLOSE_PAREN','ItemBackColor1','_commandWindow','SlotRect','WVRhe','InputBgType','Param','initVisuMZCoreEngine','OnnNL','scale','CisKh','tab','_muteSound','0.00','ConvertNumberToString','Window_StatusBase_drawActorSimpleStatus','_buttonType','Game_Interpreter_command355','_pictureContainer','catchException','paramFlatJS','NewGameCommonEvent','NUMPAD2','gameTitle','picture','setFrame','StatusParamsBgType','ATK','loadSystem','IOFud','Window_Base_createTextState','addChild','sparam','gueuq','WindowLayer_render','INELASTIC','background','QcqKB','ctGaugeColor1','Graphics_printError','_cancelButton','LESS_THAN','vDNiH','initButtonHidden','PictureEasingType','smoothSelect','Conditional\x20Branch\x20Script\x20Error','FkTUJ','Window_Gold_refresh','Script\x20Call\x20Error','_stored_tpGaugeColor1','NewGameBoot','processAlwaysEscape','Max','shift','Window_NumberInput_start','WrZgk','image-rendering','catchLoadError','Plus2','OpenSpeed','_coreEasingType','Window_NameInput_refresh','currentExp','text','VOLUME_UP','pixelated','getCustomBackgroundSettings','initCoreEngine','mainFontSize','moveMenuButtonSideButtonLayout','uUfxN','ColorMPCost','makeFontBigger','processKeyboardBackspace','Scene_MenuBase_createPageButtons','onDatabaseLoaded','gaugeLineHeight','#%1','expGaugeColor1','status','LoadError','ARRAYSTR','_fauxAnimationQueue','ItemRect','RegExp','vertical','clearRect','mhp','treXO','BUKxc','waiting','bitmap','retrieveFauxAnimation','_inputWindow','ARRAYJSON','setGuard','title','updateFauxAnimations','goto','deselect','LEFT','setupValueFont','Window_Selectable_drawBackgroundRect','type','HASH','nextLevelExp','paramchangeTextColor','forceOutOfPlaytest','FsFIP','xparamFlat2','show','hpColor','myAAW','_inputSpecialKeyCode','QTmlO','EncounterRateMinimum','gradientFillRect','_addShadow','_backSprite1','Graphics','qaSpR','F11','drawRightArrow','drawActorExpGauge','mmGTm','XParamVocab8','TextCodeNicknames','ShowJS','buyWindowRect','Scene_Map_initialize','_effectsContainer','INOUTBOUNCE','tilesets','GoldChange','_internalTextures','iconHeight','bitmapWidth','aWzZr','itemEva','qMWKn','mainAreaBottom','CodHF','_stored_tpGaugeColor2','yScrollLinkedOffset','xCvdA','dimColor2','_stored_expGaugeColor2','getCoreEngineScreenShakeStyle','CONTEXT_MENU','right','BottomHelp','TextCodeClassNames','_stored_maxLvGaugeColor2','xparamFlatJS','isSpecialCode','shake','Scene_Boot_loadSystemImages','Window_ShopSell_isEnabled','_spriteset','INSINE','isExpGaugeDrawn','renderNoMask','ShowButtons','backgroundBitmap','getInputMultiButtonStrings','sparamRate2','createTitleButtons','_backSprite2','terms','FiGaM','DrawItemBackgroundJS','commandWindowRect','INOUTEXPO','FINAL','child_process','StatusMenu','_slotWindow','duration','cursorLeft','_stored_hpGaugeColor1','parseForcedGameTroopSettingsCoreEngine','drawBackgroundRect','ColorCTGauge2','HRG','end','BACKSPACE','crisisColor','_targetOffsetY','onClick','VisuMZ_2_BattleSystemSTB','updatePictureAntiZoom','TPB\x20WAIT','pREdy','windowPadding','volume','SideView','IMoDj','CustomParamIcons','level','setHome','Game_Picture_move','Scene_Name_create','description','ParseSkillNotetags','ParseArmorNotetags','buttonAssistKey%1','addCommand','EnableNumberInput','makeEncounterCount','exit','LUK','FDR','iXTVq','createEnemies','OptionsRect','exec','_pageupButton','OpenURL','currentValue','BZNMD','ForceNoPlayTest','Game_Action_itemHit','IconSParam5','top','DFTtn','KZCEu','Scene_Boot_startNormalGame','_shakeSpeed','setMute','_repositioned','RightMenus','remove','GoldRect','PcdIG','ActorRect','clearZoom','Sprite_Button_updateOpacity','Game_Interpreter_command122','buttonAssistSwitch','pmLrX','isPlaytest','initialLevel','setMainFontSize','toUpperCase','(\x5cd+)([%％])>','MULTIPLY','MINUS','EVAL','_windowLayer','CONVERT','zJRBL','updatePositionCoreEngineShakeOriginal','Spriteset_Base_destroy','textColor','TCR','_context','powerUpColor','JHKyo','WIN_OEM_BACKTAB','isNormalPriority','nIcXd','StatusRect','CategoryRect','UwSqd','drawParamText','lTKyq','_customModified','tpGaugeColor1','SmartEventCollisionPriority','setMoveEasingType','IconParam7','integer','actorWindowRect','min','_categoryWindow','Gold','movePageButtonSideButtonLayout','ColorMPGauge2','calcCoreEasing','down','default','keyboard','pagedownShowButton','_targetOffsetX','Graphics_centerElement','dFRpc','EscapeAlways','updateDocumentTitle','Scene_GameEnd_createBackground','powerDownColor','erasePicture','en-US','SlotBgType','outlineColor','Game_Picture_calcEasing','updatePosition','isReleased','Window_NameInput_cursorLeft','_mainSprite','EquipMenu','blockWidth','DRMLM','applyEasing','kYFhF','skillId','LATIN1','BgFilename1','DigitGroupingLocale','showFauxAnimations','EditRect','itemHit','SPACE','isMagical','_playTestFastMode','_pressed','Scene_Skill_create','ARRAYFUNC','Untitled','COLON','buttonAssistText5','Window_NameInput_cursorPagedown','crMwl','TLNBj','optionsWindowRect','mekyq','map','clearForcedGameTroopSettingsCoreEngine','LINEAR','nickname','yJTcw','Bitmap_measureTextWidth','Scene_Menu_create','ejDry','isCancelled','UlrIX','paramValueByName','AMPERSAND','Flat1','sparamPlusJS','buttonY','initMembersCoreEngine','buttonAssistText%1','select','createChildSprite','STB','HCHox','drawActorSimpleStatus','setClickHandler','advanced','FvKwm','_stored_crisisColor','HIT','nEEHb','RHree','_drawTextOutline','OUTELASTIC','isAlive','Window_NameInput_processTouch','_editWindow','PRINTSCREEN','getBackgroundOpacity','SParamVocab3','UGhkR','Sprite_Battler_startMove','ConvertParams','ColorGaugeBack','FontSmoothing','playTestF7','KXJtu','STENCIL_BUFFER_BIT','IconXParam5','setupCoreEasing','Hdgst','DdVye','cancel','MenuBg','DamageColor','MAXMP','constructor','updatePositionCoreEngine','KJeuf','NUMPAD1','makeInputButtonString','Window_Base_initialize','stop','UyyRC','processDigitChange','xparamRate1','determineSideButtonLayoutValid','bind','areButtonsHidden','FUNC','WIN_OEM_FJ_TOUROKU','oSBPR','Window_Base_drawText','expGaugeColor2','playMiss','_createInternalTextures','OUTCIRC','ParseEnemyNotetags','processKeyboardDigitChange','updateBackOpacity','AEhQT','_dummyWindow','_animation','SParamVocab2','Power','SceneManager_isGameActive','centerSprite','UDvpH','ycJNW','_forcedBattleSys','ColorSystem','SnapshotOpacity','updateMainMultiply','setEasingType','UGrLo','F13','seVolume','eEXBx','hit','removeAllFauxAnimations','Window_NameInput_cursorDown','setSkill','xparam','OUDXr','kdfci','PositionJS','isSideButtonLayout','KeyboardInput','outbounce','GznKw','text%1','style','pPAYK','Game_Picture_initBasic','Bitmap_drawCircle','iconWidth','enable','_centerElement','updateLastTarget','_stored_powerDownColor','_CoreEngineSettings','itemLineRect','OPEN_PAREN','JYXOa','MenuLayout','Yzbbw','KjAUV','home','ParamMax','sparamRate1','loadGameImagesCoreEngine','_offsetY','CommandRect','_data','sparamPlus','IconXParam3','KeyUnlisted','LvExpGauge','toLowerCase','paramY','SCALE_MODES','flush','titles2','makeActionList','WmRiS','GoldBgType','forceStencil','key%1','animations','PHA','Basic','IFNUJ','Symbol','platform','Sprite_Gauge_currentValue','Scene_Status_create','systemColor','xparamPlus','repositionEnemiesByResolution','ARRAYSTRUCT','StatusEquipRect','Bitmap_gradientFillRect','DEF','ESsSr','_stored_ctGaugeColor1','bgmVolume','ARRAYEVAL','createBuffer','onMouseEnter','UgyJB','characters','openness','filter','initDigitGrouping','getLastPluginCommandInterpreter','FadeSpeed','createTextState','isItemStyle','sparamFlat1','setBattleSystem','makeTargetSprites','ALWAYS','WIN_OEM_ATTN','ySbFx','whrPY','isUseModernControls','traitObjects','ZUUpK','gaugeBackColor','hfnKb','setBackgroundOpacity','isPhysical','FontShadows','F15','paramFlatBonus','_onKeyDown','blendFunc','Bitmap_strokeRect','drawActorNickname','ALT','_moveEasingType','CrisisRate','processHandling','Game_Actor_levelUp','pymAg','param','VFOzn','lggOs','visible','getColorDataFromPluginParameters','_actor','inbounce','BaseTexture','ImprovedAccuracySystem','listWindowRect','cursorRight','GoldOverlap','_paramPlus','bitmapHeight','SParamVocab4','areButtonsOutsideMainUI','hpGaugeColor1','SiVps','battlebacks1','layoutSettings','horizontal','makeCommandList','mute','ModernControls','buttonAssistKey1','qOeXl','processKeyboardHandling','UjmBh','SParamVocab9','innerWidth','TJKNK','XParamVocab2','paramPlus','Actor','LTTDm','setEnemyAction','button','TextManager_param','registerCommand','F24','Scene_Shop_create','ColorNormal','WIN_OEM_FINISH','process_VisuMZ_CoreEngine_CustomParameters','processCursorHomeEndTrigger','CodeJS','updateEffekseer','Game_Actor_paramBase','_hp','evaded','ButtonHeight','hsVSY','textWidth','vhDJP','equips','F21','subjectHitRate','canUse','iuVRX','normal','maxLvGaugeColor2','QUOTE','BMKZc','damageColor','createJsQuickFunction','onMoveEnd','drawTextEx','PcJHB','LZJsp','GoldFontSize','enemy','setHandler','KEnrL','BgFilename2','Duration','MODECHANGE','getInputButtonString','MEV','_cacheScaleX','JMMAC','process_VisuMZ_CoreEngine_Functions','isKeyItem','cursorDown','fYeGo','LnsZP','DATABASE','_menuButton','NONCONVERT','qFRZR','paramFlat','imageSmoothingEnabled','_blank','PLUS','setSideButtonLayout','MIN_SAFE_INTEGER','test','enemies','IconSParam8','Sprite_Picture_updateOrigin','LPpUz','process_VisuMZ_CoreEngine_RegExp','CustomParamNames','_listWindow','_tempActor','_opening','isHovered','([\x5c+\x5c-]\x5cd+)>','IconXParam4','isBottomButtonMode','randomJS','isClosed','WDoBT','revuF','ProfileBgType','VILCI','textSizeEx','LYxEU','_digitGroupingEx','createMenuButton','_optionsWindow','nEUQN','number','TimeProgress','consumeItem','add','OhlCy','drawValue','yZEzW','GetParamIcon','GoldIcon','gold','Game_System_initialize','process_VisuMZ_CoreEngine_Settings','_hideButtons','addEventListener','flYyn','Scene_Boot_onDatabaseLoaded','boxWidth','ASTERISK','Key%1','ParseClassNotetags','Game_Troop_setup','nQlXB','mpCostColor','traitsPi','learnings','openingSpeed','catchNormalError','QQfxs','CTB','batch','stretch','HOME','paramX','start','helpAreaTopSideButtonLayout','vpdUK','transform','xOyWV','F14','nw.gui','paramRate1','PAUSE','Game_Interpreter_PluginCommand','ColSpacing','_numberWindow','center','Scene_MenuBase_createBackground','random','dimColor1','DataManager_setupNewGame','xparamPlus2','YMUGi','_stored_normalColor','buttonAssistOffset5','cursorPageup','SLASH','(\x5cd+\x5c.?\x5cd+)>','SellBgType','OycyE','ImgLoad','_registerKeyInput','ParseAllNotetags','useDigitGroupingEx','IconXParam0','_anchor','ColorExpGauge1','_pagedownButton','oaZNV','randomInt','PA1','getLevel','Graphics_defaultStretchMode','stringKeyMap','SystemLoadAudio','processKeyboardDelete','makeDeepCopy','EnableNameInput','URL','EQUALS','drawParamName','NXDVD','OutlineColor','CreateBattleSystemID','RIGHT','initMembers','apply','Game_Character_processMoveCommand','SELECT','AutoStretch','startAutoNewGame','areTileShadowsHidden','StartID','processCursorMove','%1/','Plus','ParseStateNotetags','WIN_OEM_FJ_LOYA','INEXPO','LzOcF','setAction','ExtJS','QcSMa','_centerElementCoreEngine','drawGauge','NGJOA','_scene','drawCurrentParam','Game_Map_setup','targetSpritePosition','createCommandWindow','WIN_OEM_FJ_JISHO','paramWidth','atbActive','isNwjs','Window_Selectable_cursorDown','WOcjh','itemRect','OUTQUAD','XqISp','gaugeRate','initCoreEngineScreenShake','call','IconXParam1','CLEAR','BACK_QUOTE','_duration','Window_Base_textSizeEx','ParseItemNotetags','BasicParameterFormula','isRightInputMode','command111','push','DimColor2','currencyUnit','dhRdE','hppYs','hlSDH','changeTextColor','clear','WXUJe','INQUAD','ColorHPGauge1','_backgroundSprite','drawSegment','SceneManager_initialize','vYhiy','_stored_mpGaugeColor2','deathColor','isOptionValid','_digitGrouping','isMenuButtonAssistEnabled','_backgroundFilter','playOk','bgm','animationId','DocumentTitleFmt','IconSParam9','%2%1%3','Version','FwRhc','open','PHuje','ilqeP','CategoryBgType','WIN_OEM_PA1','CommandWidth','targets','isMaxLevel','ColorManager_loadWindowskin','jTzwl','TextJS','updateCoreEasing','parse','createButtonAssistWindow','contents','horzJS','Scene_Equip_create','QaVWX','parallaxes','sQQza','Settings','_statusWindow','asin','INOUTQUINT','helpWindowRect','setLastPluginCommandInterpreter','xcqLZ','easingType','buttonAssistText2','DOUBLE_QUOTE','NoTileShadows','format','createCustomBackgroundImages','Window_Selectable_processTouch','VFZQS','resetBattleSystem','drawActorClass','FGtvz','targetScaleY','missed','setBackgroundType','INCUBIC','MDF','stypeId','buttonAssistOk','hsgfw','DAgdy','createCancelButton','MRF','mev','clamp','drawGameVersion','buttonAssistWindowButtonRect','destroy','NkcGn','_baseTexture','utfwa','pow','UNDERSCORE','statusParamsWindowRect','YtEUt','WIN_OEM_CLEAR','KiYaz','ieetR','process_VisuMZ_CoreEngine_Notetags','IichC','ColorExpGauge2','COMMA','Bitmap_blt','tpGaugeColor2','OUTBACK','displayY','CancelText','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','yGDtt','iKSQl','maxLevel','meVolume','IconParam1','ScreenShake','_colorCache','buttonAssistKey5','fYfMl','JAHEQ','destroyCoreEngineMarkedBitmaps','INOUTSINE','sparamFlat2','processMoveCommand','QmsYx','createWindowLayer','get','_actorWindow','ColorHPGauge2','SceneManager_onKeyDown','defineProperty','INOUTBACK','IFvON','endAnimation','CRI','clearStencil','F20','BldcG','CANCEL','toLocaleString','UhuDY','CustomParamAbb','buttonAssistWindowSideRect','playCursor','Window','DBJAW','drawGoldItemStyle','ENTER','lpLvj','Scene_Base_createWindowLayer','showDevTools','CustomParam','kselu','SqVHN','Window_StatusBase_drawActorLevel','_stored_mpGaugeColor1','Bitmap_drawText','IgkKu','TAB','setupCoreEngine','isItem','AqKiD','Title','menuShowButton','RVLZr','eva','EQUAL','CnEiX','tmsJj','isEnabled','sparamFlatJS','animationBaseDelay','DECIMAL','currentClass','render','PRINT','OUTQUINT','drawActorLevel','XAXHG','DlwAS','isSideView','OYYUp','sqrt','gqVWH','editWindowRect','option','INCIRC','yHBoN','_shakePower','F6key','isClickEnabled','result','Bitmap_drawTextOutline','Game_Interpreter_command111','DigitGroupingExText','lZNKe','Game_Action_itemEva','ActorTPColor','Window_Selectable_itemRect','Bitmap_fillRect','drawIconBySize','ONYsm','drawCharacter','DIVIDE','battleSystem','PixelateImageRendering','fillRect','Game_Party_consumeItem','kEQLB','drawCircle','contentsBack','BattleManager_processEscape','NUM_LOCK','EndingID','sparamPlus2','drawGameTitle','tcbYI','TAIoi','NumberRect','Spriteset_Base_updatePosition','ColorMPGauge1','IpnMx','pagedown','valueOutlineWidth','buttonAssistKey2','updatePositionCoreEngineShakeRand','left','ylHkC','lynrk','_goldWindow','ONE','cursorPagedown','grdnK','ParamArrow','animationNextDelay','refresh','SkillTypeBgType','XZVTi','_offsetX','anchor','QUESTION_MARK','_cacheScaleY','_cache','darwin','LKsuk','uqpMX','addLoadListener','Flat2','_setupEventHandlers','MAT','INOUTQUAD','mRdKJ','Location','Manual','SHIFT','processTouchModernControls','_shakeDuration','fyzic','PictureFilename','XParamVocab3','repositionCancelButtonSideButtonLayout','Scene_Boot_updateDocumentTitle','NUMPAD3','drawFace','setup','Game_Picture_updateMove','ENTER_SPECIAL','StatusBgType','uTVDC','eTLJD','SParamVocab8','evade','MAXHP','_fauxAnimationSprites','processSoundTimings','IconParam4','height','focus','bLAFT','AMoYs','ColorTPGauge1','Sprite_AnimationMV_processTimingData','checkCacheKey','startAnimation','PictureEraseRange','sin','vVCDS','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','createDigits','Enable','_storedStack','Game_Picture_y','eQUQs','Tilemap_addShadow','numberWindowRect','_coreEasing','targetScaleX','XParamVocab0','openURL','tileWidth','Scene_Title_drawGameTitle','SParamVocab7','isNumpadPressed','ListBgType','Control\x20Variables\x20Script\x20Error','mpColor','stencilFunc','SideButtons','Window_NameInput_initialize','currentLevelExp','setCoreEngineUpdateWindowBg','SystemSetSideView','isSmartEventCollisionOn','command122','fromCharCode','resetTextColor','IconParam5','update','CLOSE_CURLY_BRACKET','EVA','switchModes','MAX_GL_TEXTURES','setActorHome','attackSkillId','Abbreviation','enableDigitGrouping','LrWLU','FRdZj','inBattle','LoadMenu','escape','initBasic','VisuMZ_1_OptionsCore','Ipkcx','slice','Game_Action_updateLastTarget','_hovered','_stored_gaugeBackColor','_stored_mpCostColor','isGameActive','XxxPP','drawItem','TGR','END','ZaxzR','drFqm','slotWindowRect','getButtonAssistLocation','makeDocumentTitle','framebuffer','TextFmt','requestMotion','rowSpacing','MDR','nlgFh','Game_BattlerBase_refresh','CYjYT','normalColor','OptionsBgType','up2','LevelUpFullMp','smallParamFontSize','JITcp','split','_destroyInternalTextures','subtitle','setupButtonImage','checkSmartEventCollision','moveRelativeToResolutionChange','TextStr','WIN_ICO_00','EXECUTE','command355','ZdXBv','setAnchor','numberShowButton','initialBattleSystem','isInputting','FontSize','rUkCC','paramMaxJS','VOLUME_DOWN','_coreEngineShakeStyle','measureTextWidth','ColorCTGauge1','CNT','itemBackColor1','_sideButtonLayout','iGZbp','SkillMenu','isFullDocumentTitle','NUMPAD9','log','win32','loadWindowskin','skills','kKmhA','HelpBgType','mmp','eOrdO','_changingClass','initialize','original','WIN_OEM_PA3','AGI','pendingColor','getBattleSystem','Sprite_Actor_setActorHome','ItemMenu','mirror','buttonAssistCancel','drawText','Game_Actor_changeClass','xyPCJ','TRAIT_PARAM','SystemSetBattleSystem','sHeZA','uiAreaHeight','expRate','SaveMenu','create','cancelShowButton','setActionState','ZrGoo','processBack','pictureButtons','adjustBoxSize','CEV','CoreEngine','clearCachedKeys','IpcVF','battlebacks2','ColorMaxLvGauge1','buttonAssistOffset%1','updateKeyText','fadeSpeed','Linear','Game_Event_isCollidedWithEvents','itemPadding','IconSParam6','MqMEy','Window_NameInput_cursorRight','WIN_OEM_AUTO','_stored_systemColor','_inputString','isMaskingEnabled','contentsOpacity','evaluate','replace','Window_Base_drawFace','updateMove','playCursorSound','Rate','PreserveNumbers','updateOpacity','gjneQ','_movementDuration','_clickHandler','levelUp','_playtestF7Looping','fillText','disable','STENCIL_TEST','Spriteset_Base_initialize','hBgWM','XParameterFormula','SxNVz','CIRCUMFLEX','reduce','jsQuickFunc','HelpRect','HZpyk','charAt','sparamRate','NUMPAD6','Game_BattlerBase_initMembers','GoldMax','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','titleCommandWindow','processEscape','OUTBOUNCE','Scene_MenuBase_createCancelButton','colSpacing','isCursorMovable','MRG','PictureEraseAll','BottomButtons','buttonAssistKey3','command357','setSideView','targetContentsOpacity','rVQgu','subject','nUsci','Flat','pop','Window_NameInput_cursorPageup','blt','resize','targetOpacity','SUBTRACT'];(function(_0x5cb0f0,_0x2747c5){const _0x269551=function(_0x131501){while(--_0x131501){_0x5cb0f0['push'](_0x5cb0f0['shift']());}};_0x269551(++_0x2747c5);}(_0x2695,0x140));const _0x1315=function(_0x5cb0f0,_0x2747c5){_0x5cb0f0=_0x5cb0f0-0x142;let _0x269551=_0x2695[_0x5cb0f0];return _0x269551;};const _0x479088=_0x1315;var label=_0x479088(0x676),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x479088(0x3b4)](function(_0x25dd01){const _0x4c1711=_0x479088;return _0x25dd01[_0x4c1711(0x215)]&&_0x25dd01[_0x4c1711(0x290)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x479088(0x502)]=VisuMZ[label][_0x479088(0x502)]||{},VisuMZ[_0x479088(0x332)]=function(_0x3fef4d,_0x176a89){const _0xebe6fe=_0x479088;for(const _0x527a24 in _0x176a89){if(_0x527a24[_0xebe6fe(0x7cd)](/(.*):(.*)/i)){const _0x2f536c=String(RegExp['$1']),_0x40c90d=String(RegExp['$2'])[_0xebe6fe(0x2b9)]()[_0xebe6fe(0x6e2)]();let _0x15531e,_0x3666f8,_0x24d4d0;switch(_0x40c90d){case'NUM':_0x15531e=_0x176a89[_0x527a24]!==''?Number(_0x176a89[_0x527a24]):0x0;break;case _0xebe6fe(0x787):_0x3666f8=_0x176a89[_0x527a24]!==''?JSON[_0xebe6fe(0x4fa)](_0x176a89[_0x527a24]):[],_0x15531e=_0x3666f8[_0xebe6fe(0x30b)](_0x330c06=>Number(_0x330c06));break;case _0xebe6fe(0x2bd):_0x15531e=_0x176a89[_0x527a24]!==''?eval(_0x176a89[_0x527a24]):null;break;case _0xebe6fe(0x3ae):_0x3666f8=_0x176a89[_0x527a24]!==''?JSON[_0xebe6fe(0x4fa)](_0x176a89[_0x527a24]):[],_0x15531e=_0x3666f8['map'](_0x469fd1=>eval(_0x469fd1));break;case'JSON':_0x15531e=_0x176a89[_0x527a24]!==''?JSON['parse'](_0x176a89[_0x527a24]):'';break;case _0xebe6fe(0x224):_0x3666f8=_0x176a89[_0x527a24]!==''?JSON[_0xebe6fe(0x4fa)](_0x176a89[_0x527a24]):[],_0x15531e=_0x3666f8[_0xebe6fe(0x30b)](_0x12592e=>JSON[_0xebe6fe(0x4fa)](_0x12592e));break;case _0xebe6fe(0x34d):_0x15531e=_0x176a89[_0x527a24]!==''?new Function(JSON[_0xebe6fe(0x4fa)](_0x176a89[_0x527a24])):new Function(_0xebe6fe(0x6ef));break;case _0xebe6fe(0x302):_0x3666f8=_0x176a89[_0x527a24]!==''?JSON[_0xebe6fe(0x4fa)](_0x176a89[_0x527a24]):[],_0x15531e=_0x3666f8[_0xebe6fe(0x30b)](_0x1323b3=>new Function(JSON[_0xebe6fe(0x4fa)](_0x1323b3)));break;case _0xebe6fe(0x16b):_0x15531e=_0x176a89[_0x527a24]!==''?String(_0x176a89[_0x527a24]):'';break;case _0xebe6fe(0x217):_0x3666f8=_0x176a89[_0x527a24]!==''?JSON[_0xebe6fe(0x4fa)](_0x176a89[_0x527a24]):[],_0x15531e=_0x3666f8[_0xebe6fe(0x30b)](_0xde2452=>String(_0xde2452));break;case _0xebe6fe(0x738):_0x24d4d0=_0x176a89[_0x527a24]!==''?JSON[_0xebe6fe(0x4fa)](_0x176a89[_0x527a24]):{},_0x3fef4d[_0x2f536c]={},VisuMZ[_0xebe6fe(0x332)](_0x3fef4d[_0x2f536c],_0x24d4d0);continue;case _0xebe6fe(0x3a7):_0x3666f8=_0x176a89[_0x527a24]!==''?JSON['parse'](_0x176a89[_0x527a24]):[],_0x15531e=_0x3666f8[_0xebe6fe(0x30b)](_0x212b3f=>VisuMZ[_0xebe6fe(0x332)]({},JSON['parse'](_0x212b3f)));break;default:continue;}_0x3fef4d[_0x2f536c]=_0x15531e;}}return _0x3fef4d;},(_0x1f251f=>{const _0x3a1164=_0x479088,_0x46abd7=_0x1f251f[_0x3a1164(0x735)];for(const _0x1fe956 of dependencies){if(_0x3a1164(0x3c0)!==_0x3a1164(0x3c0)){function _0x587b07(){const _0x414d0e=_0x3a1164;_0x84ec08[_0x414d0e(0x352)](),this['requestMotion'](_0x414d0e(0x5d9));}}else{if(!Imported[_0x1fe956]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3a1164(0x50d)](_0x46abd7,_0x1fe956)),SceneManager[_0x3a1164(0x297)]();break;}}}const _0x5a569e=_0x1f251f['description'];if(_0x5a569e[_0x3a1164(0x7cd)](/\[Version[ ](.*?)\]/i)){const _0x2ea62d=Number(RegExp['$1']);_0x2ea62d!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3a1164(0x50d)](_0x46abd7,_0x2ea62d)),SceneManager[_0x3a1164(0x297)]());}if(_0x5a569e[_0x3a1164(0x7cd)](/\[Tier[ ](\d+)\]/i)){const _0x31fdbf=Number(RegExp['$1']);if(_0x31fdbf<tier)alert(_0x3a1164(0x537)['format'](_0x46abd7,_0x31fdbf,tier)),SceneManager['exit']();else{if(_0x3a1164(0x656)!==_0x3a1164(0x656)){function _0x4a0cbc(){const _0x2f50a5=_0x3a1164;return!this['isBottomHelpMode']()?this[_0x2f50a5(0x797)]():0x0;}}else tier=Math[_0x3a1164(0x1ad)](_0x31fdbf,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x3a1164(0x502)],_0x1f251f[_0x3a1164(0x17f)]);})(pluginData),VisuMZ['CoreEngine']['Activated']={'PluginCommands':!![]},PluginManager[_0x479088(0x3fb)](pluginData['name'],_0x479088(0x29f),_0x1d7d62=>{const _0x1549fd=_0x479088;VisuMZ[_0x1549fd(0x332)](_0x1d7d62,_0x1d7d62);const _0x477375=_0x1d7d62['URL'];VisuMZ[_0x1549fd(0x5f4)](_0x477375);}),PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],_0x479088(0x24b),_0x2d5ab3=>{const _0x540db7=_0x479088;VisuMZ[_0x540db7(0x332)](_0x2d5ab3,_0x2d5ab3);const _0x55447d=_0x2d5ab3['value']||0x0;$gameParty[_0x540db7(0x7eb)](_0x55447d);}),PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],_0x479088(0x1f1),_0x7d94c9=>{const _0x45c96a=_0x479088;VisuMZ['ConvertParams'](_0x7d94c9,_0x7d94c9);const _0x3b0618=_0x7d94c9[_0x45c96a(0x7d2)]||0x1,_0x1256d5=_0x7d94c9[_0x45c96a(0x509)]||_0x45c96a(0x67e),_0x3e5524=$gameScreen[_0x45c96a(0x1dd)](_0x3b0618);if(_0x3e5524){if('KjAUV'!==_0x45c96a(0x386)){function _0x9bdea5(){const _0x5dee94=_0x45c96a;_0x34e492[_0x5dee94(0x652)]('Conditional\x20Branch\x20Script\x20Error'),_0x332ff8[_0x5dee94(0x652)](_0x148683);}}else _0x3e5524['setEasingType'](_0x1256d5);}}),PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],_0x479088(0x6af),_0x2f8066=>{const _0x53a7b9=_0x479088;for(let _0x140b9d=0x1;_0x140b9d<=0x64;_0x140b9d++){if('HnTSU'!==_0x53a7b9(0x749)){function _0x374495(){const _0x25976e=_0x53a7b9;!_0x23db84['_isWindow']&&_0x494a3a[_0x25976e(0x3d8)]&&_0x5a16b1[_0x25976e(0x578)](_0x46ebfb);}}else $gameScreen['erasePicture'](_0x140b9d);}}),PluginManager[_0x479088(0x3fb)](pluginData['name'],_0x479088(0x5e6),_0x54d57c=>{const _0x234c58=_0x479088;VisuMZ['ConvertParams'](_0x54d57c,_0x54d57c);const _0x5e05f6=Math[_0x234c58(0x2d7)](_0x54d57c[_0x234c58(0x4a9)],_0x54d57c[_0x234c58(0x59f)]),_0x2732b2=Math[_0x234c58(0x1ad)](_0x54d57c[_0x234c58(0x4a9)],_0x54d57c[_0x234c58(0x59f)]);for(let _0xbfe97d=_0x5e05f6;_0xbfe97d<=_0x2732b2;_0xbfe97d++){$gameScreen[_0x234c58(0x2e8)](_0xbfe97d);}}),PluginManager['registerCommand'](pluginData[_0x479088(0x735)],_0x479088(0x53d),_0x1a2f3b=>{const _0x18e06a=_0x479088;VisuMZ[_0x18e06a(0x332)](_0x1a2f3b,_0x1a2f3b);const _0x429adf=_0x1a2f3b['Type']||_0x18e06a(0x47d),_0x2f953a=_0x1a2f3b[_0x18e06a(0x35c)][_0x18e06a(0x520)](0x1,0x9),_0x1034ce=_0x1a2f3b['Speed']['clamp'](0x1,0x9),_0x27eaae=_0x1a2f3b[_0x18e06a(0x41f)]||0x1,_0x4fe612=_0x1a2f3b[_0x18e06a(0x7e3)];$gameScreen[_0x18e06a(0x164)](_0x429adf),$gameScreen['startShake'](_0x2f953a,_0x1034ce,_0x27eaae);if(_0x4fe612){const _0x19246f=$gameTemp[_0x18e06a(0x3b6)]();if(_0x19246f)_0x19246f[_0x18e06a(0x748)](_0x27eaae);}}),PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],'SystemSetFontSize',_0x26c8a7=>{const _0x5f49e0=_0x479088;VisuMZ[_0x5f49e0(0x332)](_0x26c8a7,_0x26c8a7);const _0xd414b9=_0x26c8a7[_0x5f49e0(0x583)]||0x1;$gameSystem[_0x5f49e0(0x2b8)](_0xd414b9);}),PluginManager['registerCommand'](pluginData[_0x479088(0x735)],_0x479088(0x601),_0x59e09c=>{const _0x5371d1=_0x479088;if($gameParty[_0x5371d1(0x612)]())return;VisuMZ[_0x5371d1(0x332)](_0x59e09c,_0x59e09c);const _0x5d0c74=_0x59e09c['option'];if(_0x5d0c74[_0x5371d1(0x7cd)](/Front/i)){if('hfnKb'!==_0x5371d1(0x3c5)){function _0x1f8ec7(){const _0x3eeb9a=_0x5371d1;_0x103e95['CoreEngine'][_0x3eeb9a(0x502)][_0x3eeb9a(0x6da)]['OpenConsole']&&_0x32295a['ShowDevTools'](!![]),_0x5bc4ba[_0x3eeb9a(0x676)][_0x3eeb9a(0x502)][_0x3eeb9a(0x6da)][_0x3eeb9a(0x3ec)]&&(_0x55b9f3[_0x3eeb9a(0x7bb)][0x23]=_0x3eeb9a(0x27e),_0x37acae[_0x3eeb9a(0x7bb)][0x24]=_0x3eeb9a(0x387));}}else $gameSystem['setSideView'](![]);}else{if(_0x5d0c74[_0x5371d1(0x7cd)](/Side/i))$gameSystem['setSideView'](!![]);else{if(_0x5371d1(0x7ce)!=='CcyUN')$gameSystem[_0x5371d1(0x6b3)](!$gameSystem[_0x5371d1(0x57e)]());else{function _0x14cbe6(){const _0x5b85a7=_0x5371d1;this[_0x5b85a7(0x1ed)]['y']=0x0;}}}}}),PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],_0x479088(0x497),_0x16f1cf=>{const _0x5311cd=_0x479088;if($gameParty['inBattle']())return;VisuMZ[_0x5311cd(0x332)](_0x16f1cf,_0x16f1cf);const _0x219c96=[_0x5311cd(0x4e7),'bgs','me','se'];for(const _0x4c81de of _0x219c96){const _0x548030=_0x16f1cf[_0x4c81de],_0x3c21d3=_0x5311cd(0x4ab)[_0x5311cd(0x50d)](_0x4c81de);for(const _0x5dcef7 of _0x548030){console[_0x5311cd(0x652)](_0x3c21d3,_0x5dcef7),AudioManager['createBuffer'](_0x3c21d3,_0x5dcef7);}}}),PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],'SystemLoadImages',_0x2323b6=>{const _0x1e0661=_0x479088;if($gameParty[_0x1e0661(0x612)]())return;VisuMZ['ConvertParams'](_0x2323b6,_0x2323b6);const _0x30653a=[_0x1e0661(0x39c),_0x1e0661(0x3e7),_0x1e0661(0x679),_0x1e0661(0x3b2),_0x1e0661(0x435),_0x1e0661(0x7c0),_0x1e0661(0x500),_0x1e0661(0x758),'sv_actors',_0x1e0661(0x145),_0x1e0661(0x6f5),_0x1e0661(0x24a),'titles1',_0x1e0661(0x396)];for(const _0x6c3fc0 of _0x30653a){if(_0x1e0661(0x501)!==_0x1e0661(0x501)){function _0x195c71(){const _0x415edd=_0x1e0661;if(!_0x2d8157)return;if(!_0x407c52[_0x415edd(0x776)]())return;const _0x36e3e1=0x80,_0xf9ba33=_0x147e82[_0x415edd(0x66c)]();let _0x5b30ab=_0x4b8ab6[_0x415edd(0x214)](),_0x2bf908=_0x5958b0['expGaugeColor2']();_0xf9ba33>=0x1&&(_0x5b30ab=_0x587893[_0x415edd(0x6ed)](),_0x2bf908=_0x99b7be[_0x415edd(0x411)]()),this[_0x415edd(0x4b5)](_0x55976a,_0x2622da,_0x36e3e1,_0xf9ba33,_0x5b30ab,_0x2bf908);}}else{const _0x8b2d4b=_0x2323b6[_0x6c3fc0],_0x138801=_0x1e0661(0x1bc)[_0x1e0661(0x50d)](_0x6c3fc0);for(const _0x122ac3 of _0x8b2d4b){ImageManager[_0x1e0661(0x151)](_0x138801,_0x122ac3);}}}}),PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],_0x479088(0x669),_0x2613f1=>{const _0x977c90=_0x479088;if($gameParty[_0x977c90(0x612)]())return;VisuMZ[_0x977c90(0x332)](_0x2613f1,_0x2613f1);const _0x493e96=_0x2613f1['option'][_0x977c90(0x2b9)]()['trim'](),_0x482d31=VisuMZ[_0x977c90(0x676)][_0x977c90(0x4a0)](_0x493e96);$gameSystem[_0x977c90(0x3bb)](_0x482d31);}),VisuMZ[_0x479088(0x676)][_0x479088(0x4a0)]=function(_0x36d170){const _0x601fa3=_0x479088;_0x36d170=_0x36d170||_0x601fa3(0x42a),_0x36d170=String(_0x36d170)[_0x601fa3(0x2b9)]()[_0x601fa3(0x6e2)]();switch(_0x36d170){case _0x601fa3(0x798):return 0x0;case _0x601fa3(0x78c):if(Imported['VisuMZ_1_OptionsCore']){if('UjmBh'!==_0x601fa3(0x3f0)){function _0x255ee1(){const _0x5758b6=_0x601fa3;this[_0x5758b6(0x723)](),_0x8aa026[_0x5758b6(0x403)]();}}else ConfigManager[_0x601fa3(0x4be)]=!![];}return 0x1;case _0x601fa3(0x285):if(Imported[_0x601fa3(0x616)]){if(_0x601fa3(0x1b7)!==_0x601fa3(0x1b7)){function _0x31d871(){const _0xd3a772=_0x601fa3;_0x57d10b[_0xd3a772(0x676)][_0xd3a772(0x47f)]['call'](this),this[_0xd3a772(0x1c0)]();}}else ConfigManager['atbActive']=![];}return 0x2;case _0x601fa3(0x46a):if(Imported[_0x601fa3(0x727)])return _0x601fa3(0x46a);break;case _0x601fa3(0x31e):if(Imported['VisuMZ_2_BattleSystemSTB'])return'STB';break;}return $dataSystem[_0x601fa3(0x596)];},PluginManager[_0x479088(0x3fb)](pluginData[_0x479088(0x735)],'SystemSetWindowPadding',_0x3ef5f9=>{const _0x1455af=_0x479088;VisuMZ[_0x1455af(0x332)](_0x3ef5f9,_0x3ef5f9);const _0x3a73ad=_0x3ef5f9[_0x1455af(0x583)]||0x1;$gameSystem[_0x1455af(0x6e7)](_0x3a73ad);}),VisuMZ['CoreEngine'][_0x479088(0x45d)]=Scene_Boot[_0x479088(0x6e6)]['onDatabaseLoaded'],Scene_Boot[_0x479088(0x6e6)][_0x479088(0x211)]=function(){const _0x4b1445=_0x479088;VisuMZ['CoreEngine'][_0x4b1445(0x45d)][_0x4b1445(0x4c7)](this),this[_0x4b1445(0x439)](),this[_0x4b1445(0x52e)](),this[_0x4b1445(0x459)](),this[_0x4b1445(0x425)](),this[_0x4b1445(0x400)](),VisuMZ[_0x4b1445(0x48b)]();},VisuMZ['CoreEngine'][_0x479088(0x21a)]={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x1bbb8d=_0x479088,_0x3bc48e=['MAXHP','MAXMP',_0x1bbb8d(0x1e0),_0x1bbb8d(0x3aa),'MAT',_0x1bbb8d(0x518),'AGI',_0x1bbb8d(0x298)],_0x824213=[_0x1bbb8d(0x325),_0x1bbb8d(0x609),_0x1bbb8d(0x550),'CEV',_0x1bbb8d(0x422),_0x1bbb8d(0x51e),_0x1bbb8d(0x64b),'HRG',_0x1bbb8d(0x6ae),_0x1bbb8d(0x7a2)],_0x3e5cc0=[_0x1bbb8d(0x620),_0x1bbb8d(0x737),_0x1bbb8d(0x747),_0x1bbb8d(0x39d),_0x1bbb8d(0x1a9),_0x1bbb8d(0x2c4),_0x1bbb8d(0x7f3),'MDR',_0x1bbb8d(0x299),_0x1bbb8d(0x16f)],_0x1e4ac6=[_0x3bc48e,_0x824213,_0x3e5cc0],_0x800018=[_0x1bbb8d(0x4ac),_0x1bbb8d(0x7d0),_0x1bbb8d(0x200),_0x1bbb8d(0x1fa),_0x1bbb8d(0x68e),_0x1bbb8d(0x7d7),'Rate2',_0x1bbb8d(0x6b8),_0x1bbb8d(0x317),_0x1bbb8d(0x5c1)];for(const _0x17f00e of _0x1e4ac6){let _0x318afd='';if(_0x17f00e===_0x3bc48e)_0x318afd=_0x1bbb8d(0x3d5);if(_0x17f00e===_0x824213)_0x318afd=_0x1bbb8d(0x36e);if(_0x17f00e===_0x3e5cc0)_0x318afd=_0x1bbb8d(0x1e5);for(const _0x2bb763 of _0x800018){if('FkTUJ'===_0x1bbb8d(0x1f4)){let _0x1f5061=_0x1bbb8d(0x6cf)['format'](_0x318afd,_0x2bb763);VisuMZ[_0x1bbb8d(0x676)][_0x1bbb8d(0x21a)][_0x1f5061]=[],VisuMZ[_0x1bbb8d(0x676)][_0x1bbb8d(0x21a)][_0x1f5061+'JS']=[];let _0x2b0caf=_0x1bbb8d(0x714);if([_0x1bbb8d(0x4ac),'Flat'][_0x1bbb8d(0x6c5)](_0x2bb763))_0x2b0caf+=_0x1bbb8d(0x43f);else{if([_0x1bbb8d(0x7d0),'Flat1'][_0x1bbb8d(0x6c5)](_0x2bb763)){if(_0x1bbb8d(0x6c2)==='EUEQN'){function _0x454d6f(){const _0x128d51=_0x1bbb8d;_0x39da37['prototype'][_0x128d51(0x65b)]['call'](this),this[_0x128d51(0x38d)]=_0x2a6679,this[_0x128d51(0x693)]=null,this[_0x128d51(0x5d2)]();}}else _0x2b0caf+='([\x5c+\x5c-]\x5cd+)([%％])>';}else{if([_0x1bbb8d(0x200),_0x1bbb8d(0x5c1)][_0x1bbb8d(0x6c5)](_0x2bb763)){if(_0x1bbb8d(0x2af)!==_0x1bbb8d(0x5e0))_0x2b0caf+=_0x1bbb8d(0x6a7);else{function _0x5edec5(){const _0xb5cd9b=_0x1bbb8d;this[_0xb5cd9b(0x498)]();}}}else{if(_0x2bb763===_0x1bbb8d(0x1fa)){if(_0x1bbb8d(0x5d6)===_0x1bbb8d(0x6c4)){function _0x39552c(){const _0x3a7f14=_0x1bbb8d;this[_0x3a7f14(0x73e)]&&this['_helpWindow'][_0x3a7f14(0x516)](_0x45f2f7['layoutSettings'][_0x3a7f14(0x657)]),this[_0x3a7f14(0x43b)]&&this[_0x3a7f14(0x43b)]['setBackgroundType'](_0x1ab869['layoutSettings'][_0x3a7f14(0x5f9)]);}}else _0x2b0caf+=_0x1bbb8d(0x6ca);}else{if(_0x2bb763===_0x1bbb8d(0x7d7)){if(_0x1bbb8d(0x44d)===_0x1bbb8d(0x44d))_0x2b0caf+=_0x1bbb8d(0x2ba);else{function _0xc90c96(){const _0x4363db=_0x1bbb8d;this[_0x4363db(0x650)]()?this[_0x4363db(0x626)]():_0x22bfe7[_0x4363db(0x676)][_0x4363db(0x5cf)]['call'](this);}}}else _0x2bb763===_0x1bbb8d(0x763)&&(_0x2b0caf+=_0x1bbb8d(0x486));}}}}for(const _0x487aac of _0x17f00e){let _0x156768=_0x2bb763[_0x1bbb8d(0x68a)](/[\d+]/g,'')[_0x1bbb8d(0x2b9)]();const _0x494842=_0x2b0caf[_0x1bbb8d(0x50d)](_0x487aac,_0x156768);VisuMZ[_0x1bbb8d(0x676)]['RegExp'][_0x1f5061][_0x1bbb8d(0x4d1)](new RegExp(_0x494842,'i'));const _0x4d4b60=_0x1bbb8d(0x76e)[_0x1bbb8d(0x50d)](_0x487aac,_0x156768);VisuMZ[_0x1bbb8d(0x676)][_0x1bbb8d(0x21a)][_0x1f5061+'JS'][_0x1bbb8d(0x4d1)](new RegExp(_0x4d4b60,'i'));}}else{function _0xa2a0e6(){const _0x57258f=_0x1bbb8d;this[_0x57258f(0x36b)](),_0x20213e[_0x57258f(0x676)][_0x57258f(0x2c2)][_0x57258f(0x4c7)](this,_0x69df16);}}}}},Scene_Boot['prototype'][_0x479088(0x52e)]=function(){const _0x3319b0=_0x479088;if(VisuMZ[_0x3319b0(0x48b)])return;},Scene_Boot[_0x479088(0x6e6)][_0x479088(0x459)]=function(){const _0x887996=_0x479088;if(VisuMZ[_0x887996(0x676)]['Settings'][_0x887996(0x6da)]['OpenConsole']){if(_0x887996(0x57d)!==_0x887996(0x3ee))VisuMZ[_0x887996(0x1b5)](!![]);else{function _0x28b9ab(){const _0x1e90cc=_0x887996;if(!this[_0x1e90cc(0x2c9)]())return![];else{const _0x6bb6a7=_0x4fb38e[_0x1e90cc(0x795)](_0x53f2f2,_0x2f46ac)[_0x1e90cc(0x3b4)](_0x87ae25=>_0x87ae25[_0x1e90cc(0x2c9)]());return _0x6bb6a7[_0x1e90cc(0x774)]>0x0;}}}}VisuMZ[_0x887996(0x676)]['Settings']['QoL']['ModernControls']&&(Input[_0x887996(0x7bb)][0x23]=_0x887996(0x27e),Input[_0x887996(0x7bb)][0x24]='home');},Scene_Boot['prototype'][_0x479088(0x425)]=function(){const _0x2851d5=_0x479088;this[_0x2851d5(0x73c)]();},Scene_Boot['prototype'][_0x479088(0x73c)]=function(){const _0x2c0176=_0x479088,_0x411b29=VisuMZ[_0x2c0176(0x676)][_0x2c0176(0x502)][_0x2c0176(0x69f)];for(const _0x386a8e of _0x411b29){if('prpak'!==_0x2c0176(0x4b6)){const _0x133bc3=_0x386a8e['FunctionName'][_0x2c0176(0x68a)](/[ ]/g,''),_0x2341a7=_0x386a8e[_0x2c0176(0x402)];VisuMZ['CoreEngine'][_0x2c0176(0x415)](_0x133bc3,_0x2341a7);}else{function _0x4cc7e5(){var _0x38c3c3=_0x21cbc3(_0x20ca71['$1']);_0x4be1bd+=_0x38c3c3;}}}},VisuMZ[_0x479088(0x676)]['createJsQuickFunction']=function(_0x3b3064,_0x2dcfa6){const _0x35ecb3=_0x479088;if(!!window[_0x3b3064]){if(_0x35ecb3(0x7b1)==='AgdKN'){function _0x556fef(){const _0xef44f6=_0x35ecb3;this[_0xef44f6(0x75b)]();}}else{if($gameTemp['isPlaytest']())console[_0x35ecb3(0x652)](_0x35ecb3(0x5e9)[_0x35ecb3(0x50d)](_0x3b3064));}}const _0x2ade47=_0x35ecb3(0x1a0)['format'](_0x3b3064,_0x2dcfa6);window[_0x3b3064]=new Function(_0x2ade47);},Scene_Boot['prototype'][_0x479088(0x400)]=function(){const _0x1190e3=_0x479088,_0x3c76d9=VisuMZ['CoreEngine']['Settings'][_0x1190e3(0x561)];if(!_0x3c76d9)return;for(const _0xf03785 of _0x3c76d9){if(_0x1190e3(0x667)!=='xyPCJ'){function _0x502d41(){const _0xfdf094=_0x1190e3;return _0x2289a4[_0xfdf094(0x3e8)][_0xfdf094(0x7c5)][_0xfdf094(0x4c7)](this);}}else{if(!_0xf03785)continue;VisuMZ[_0x1190e3(0x676)][_0x1190e3(0x761)](_0xf03785);}}},VisuMZ[_0x479088(0x676)][_0x479088(0x43a)]={},VisuMZ[_0x479088(0x676)][_0x479088(0x28b)]={},VisuMZ[_0x479088(0x676)][_0x479088(0x7e7)]={},VisuMZ[_0x479088(0x676)]['CustomParamAbb']={},VisuMZ[_0x479088(0x676)][_0x479088(0x761)]=function(_0xff4a88){const _0x553223=_0x479088,_0x39e36d=_0xff4a88[_0x553223(0x60e)],_0x4e0986=_0xff4a88[_0x553223(0x1b1)],_0x466b63=_0xff4a88['Icon'],_0x2d5a6d=_0xff4a88['Type'],_0x25b48c=new Function(_0xff4a88[_0x553223(0x1b6)]);VisuMZ[_0x553223(0x676)]['CustomParamNames'][_0x39e36d[_0x553223(0x2b9)]()[_0x553223(0x6e2)]()]=_0x4e0986,VisuMZ[_0x553223(0x676)]['CustomParamIcons'][_0x39e36d[_0x553223(0x2b9)]()['trim']()]=_0x466b63,VisuMZ['CoreEngine'][_0x553223(0x7e7)][_0x39e36d[_0x553223(0x2b9)]()[_0x553223(0x6e2)]()]=_0x2d5a6d,VisuMZ[_0x553223(0x676)][_0x553223(0x557)][_0x39e36d[_0x553223(0x2b9)]()[_0x553223(0x6e2)]()]=_0x39e36d,Object[_0x553223(0x54c)](Game_BattlerBase[_0x553223(0x6e6)],_0x39e36d,{'get'(){const _0x5b7418=_0x553223,_0x1d28cd=_0x25b48c[_0x5b7418(0x4c7)](this);return _0x2d5a6d===_0x5b7418(0x2d5)?Math['round'](_0x1d28cd):_0x1d28cd;}});},VisuMZ['ParseAllNotetags']=function(){const _0x3b85f9=_0x479088;for(const _0x2adeb4 of $dataActors){if(_0x2adeb4)VisuMZ[_0x3b85f9(0x6f6)](_0x2adeb4);}for(const _0x477db1 of $dataClasses){if(_0x3b85f9(0x789)===_0x3b85f9(0x789)){if(_0x477db1)VisuMZ[_0x3b85f9(0x461)](_0x477db1);}else{function _0x584e7a(){const _0x2d6f72=_0x3b85f9;return _0x9f2bc5[_0x2d6f72(0x26a)](_0x2d6f72(0x721),_0x2d6f72(0x5a8));}}}for(const _0x3a08f7 of $dataSkills){if(_0x3b85f9(0x3c3)===_0x3b85f9(0x572)){function _0xf244fd(){const _0x554ae9=_0x3b85f9,_0x352f57=_0x17cad2['boxWidth'],_0x2995ab=_0x2d1c6c[_0x554ae9(0x6e6)]['lineHeight'](),_0xc34f22=0x0;let _0x30add9=0x0;return this[_0x554ae9(0x625)]()===_0x554ae9(0x2a5)?_0x30add9=0x0:_0x30add9=_0x8579a[_0x554ae9(0x77a)]-_0x2995ab,new _0xbd650b(_0xc34f22,_0x30add9,_0x352f57,_0x2995ab);}}else{if(_0x3a08f7)VisuMZ[_0x3b85f9(0x291)](_0x3a08f7);}}for(const _0x1da9d7 of $dataItems){if(_0x1da9d7)VisuMZ[_0x3b85f9(0x4cd)](_0x1da9d7);}for(const _0x5578b0 of $dataWeapons){if(_0x3b85f9(0x3d4)==='HdlWr'){function _0x31c274(){const _0x1a7769=_0x3b85f9;let _0x4685d2=_0x2215bd[_0x1a7769(0x686)],_0x17e10e=_0x4685d2['length'];for(let _0xbbd0de=0x0;_0xbbd0de<_0x17e10e;++_0xbbd0de){this[_0x1a7769(0x32c)][_0x1a7769(0x451)](_0x4685d2[_0xbbd0de])?_0x1c92f9['playOk']():_0x4ffd3a[_0x1a7769(0x72a)]();}_0x2ca4f1[_0x1a7769(0x4d8)]();}}else{if(_0x5578b0)VisuMZ['ParseWeaponNotetags'](_0x5578b0);}}for(const _0x590cdb of $dataArmors){if(_0x3b85f9(0x29a)===_0x3b85f9(0x29a)){if(_0x590cdb)VisuMZ[_0x3b85f9(0x292)](_0x590cdb);}else{function _0x23a7b6(){this['catchLoadError'](_0x4ce51d);}}}for(const _0x1d047e of $dataEnemies){if('mYDTt'===_0x3b85f9(0x42d)){function _0x5332b8(){var _0x30e75d=_0x571c60(_0x37063f['$1']);_0x2a6539*=_0x30e75d;}}else{if(_0x1d047e)VisuMZ['ParseEnemyNotetags'](_0x1d047e);}}for(const _0x359ca9 of $dataStates){if(_0x3b85f9(0x7cb)==='ahuUg'){function _0x1c9a70(){if(_0x33b07a['isPlaytest']())_0x5bd49d['log'](_0x319641);}}else{if(_0x359ca9)VisuMZ[_0x3b85f9(0x4ad)](_0x359ca9);}}for(const _0x546757 of $dataTilesets){if(_0x3b85f9(0x1bd)===_0x3b85f9(0x5a7)){function _0x3df875(){const _0x266196=_0x3b85f9;return _0x363e27['Manual']||_0x266196(0x5c7);}}else{if(_0x546757)VisuMZ[_0x3b85f9(0x713)](_0x546757);}}},VisuMZ['ParseActorNotetags']=function(_0x78f5da){},VisuMZ['ParseClassNotetags']=function(_0x1a4b4f){},VisuMZ[_0x479088(0x291)]=function(_0x49b556){},VisuMZ[_0x479088(0x4cd)]=function(_0x13375b){},VisuMZ[_0x479088(0x76b)]=function(_0x10bbdf){},VisuMZ[_0x479088(0x292)]=function(_0x3dfce5){},VisuMZ[_0x479088(0x355)]=function(_0x14abbb){},VisuMZ[_0x479088(0x4ad)]=function(_0x55f0f9){},VisuMZ[_0x479088(0x713)]=function(_0x58bc3e){},VisuMZ['CoreEngine'][_0x479088(0x6f6)]=VisuMZ[_0x479088(0x6f6)],VisuMZ['ParseActorNotetags']=function(_0x4e85b8){const _0x397baf=_0x479088;VisuMZ['CoreEngine']['ParseActorNotetags']['call'](this,_0x4e85b8);const _0x18500d=_0x4e85b8[_0x397baf(0x76a)];if(_0x18500d[_0x397baf(0x7cd)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x397baf(0x7a0)===_0x397baf(0x7a0)){_0x4e85b8[_0x397baf(0x53a)]=Number(RegExp['$1']);if(_0x4e85b8[_0x397baf(0x53a)]===0x0)_0x4e85b8['maxLevel']=Number[_0x397baf(0x1a8)];}else{function _0x2f2513(){const _0x12f871=_0x397baf;let _0x433802=_0x43147a[_0x12f871(0x676)][_0x12f871(0x590)][_0x12f871(0x4c7)](this,_0x599821);return _0x433802['x']=_0x5c8391[_0x12f871(0x786)](_0x433802['x']),_0x433802['y']=_0x47599d[_0x12f871(0x786)](_0x433802['y']),_0x433802[_0x12f871(0x7bc)]=_0x18aeb1[_0x12f871(0x786)](_0x433802[_0x12f871(0x7bc)]),_0x433802[_0x12f871(0x5de)]=_0x28de51[_0x12f871(0x786)](_0x433802[_0x12f871(0x5de)]),_0x433802;}}}_0x18500d[_0x397baf(0x7cd)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x4e85b8[_0x397baf(0x2b7)]=Math[_0x397baf(0x2d7)](Number(RegExp['$1']),_0x4e85b8['maxLevel']));},VisuMZ[_0x479088(0x676)]['ParseClassNotetags']=VisuMZ[_0x479088(0x461)],VisuMZ[_0x479088(0x461)]=function(_0x447715){const _0x49dbe5=_0x479088;VisuMZ[_0x49dbe5(0x676)][_0x49dbe5(0x461)][_0x49dbe5(0x4c7)](this,_0x447715);if(_0x447715['learnings'])for(const _0x14c738 of _0x447715[_0x49dbe5(0x466)]){if(_0x49dbe5(0x4c4)===_0x49dbe5(0x538)){function _0x352fa7(){const _0xf733e2=_0x49dbe5;let _0x490465=0x0;return _0x5bf762[_0xf733e2(0x3e4)]()?_0x490465=this[_0xf733e2(0x7bd)]():_0x490465=_0x5d429c[_0xf733e2(0x676)]['Scene_MenuBase_mainAreaHeight']['call'](this),this['isMenuButtonAssistEnabled']()&&this[_0xf733e2(0x625)]()!=='button'&&(_0x490465-=_0x7d4e76['prototype'][_0xf733e2(0x760)]()),_0x490465;}}else _0x14c738[_0x49dbe5(0x76a)][_0x49dbe5(0x7cd)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x14c738[_0x49dbe5(0x28c)]=Math[_0x49dbe5(0x1ad)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x479088(0x676)][_0x479088(0x355)]=VisuMZ[_0x479088(0x355)],VisuMZ[_0x479088(0x355)]=function(_0x22f77f){const _0x359bc1=_0x479088;VisuMZ[_0x359bc1(0x676)][_0x359bc1(0x355)][_0x359bc1(0x4c7)](this,_0x22f77f),_0x22f77f[_0x359bc1(0x28c)]=0x1;const _0x3a54b9=_0x22f77f[_0x359bc1(0x76a)];if(_0x3a54b9[_0x359bc1(0x7cd)](/<LEVEL:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x28c)]=Number(RegExp['$1']);if(_0x3a54b9[_0x359bc1(0x7cd)](/<MAXHP:[ ](\d+)>/i))_0x22f77f['params'][0x0]=Number(RegExp['$1']);if(_0x3a54b9[_0x359bc1(0x7cd)](/<MAXMP:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x7ee)][0x1]=Number(RegExp['$1']);if(_0x3a54b9[_0x359bc1(0x7cd)](/<ATK:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x7ee)][0x2]=Number(RegExp['$1']);if(_0x3a54b9['match'](/<DEF:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x7ee)][0x3]=Number(RegExp['$1']);if(_0x3a54b9[_0x359bc1(0x7cd)](/<MAT:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x7ee)][0x4]=Number(RegExp['$1']);if(_0x3a54b9[_0x359bc1(0x7cd)](/<MDF:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x7ee)][0x5]=Number(RegExp['$1']);if(_0x3a54b9['match'](/<AGI:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x7ee)][0x6]=Number(RegExp['$1']);if(_0x3a54b9[_0x359bc1(0x7cd)](/<LUK:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x7ee)][0x7]=Number(RegExp['$1']);if(_0x3a54b9['match'](/<EXP:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x14e)]=Number(RegExp['$1']);if(_0x3a54b9[_0x359bc1(0x7cd)](/<GOLD:[ ](\d+)>/i))_0x22f77f[_0x359bc1(0x457)]=Number(RegExp['$1']);},VisuMZ[_0x479088(0x676)]['Graphics_defaultStretchMode']=Graphics[_0x479088(0x6ff)],Graphics[_0x479088(0x6ff)]=function(){const _0x43ed0c=_0x479088;switch(VisuMZ[_0x43ed0c(0x676)][_0x43ed0c(0x502)]['QoL'][_0x43ed0c(0x4a6)]){case _0x43ed0c(0x46c):return!![];case'normal':return![];default:return VisuMZ[_0x43ed0c(0x676)]['Graphics_defaultStretchMode'][_0x43ed0c(0x4c7)](this);}},VisuMZ[_0x479088(0x676)][_0x479088(0x1ec)]=Graphics['printError'],Graphics[_0x479088(0x70b)]=function(_0x369a5f,_0x13fccf,_0x2b88f8=null){const _0x43dcf9=_0x479088;VisuMZ[_0x43dcf9(0x676)][_0x43dcf9(0x1ec)][_0x43dcf9(0x4c7)](this,_0x369a5f,_0x13fccf,_0x2b88f8),VisuMZ[_0x43dcf9(0x1b5)](![]);},VisuMZ[_0x479088(0x676)][_0x479088(0x2e2)]=Graphics['_centerElement'],Graphics[_0x479088(0x37d)]=function(_0x33c0e9){const _0x2a1678=_0x479088;VisuMZ[_0x2a1678(0x676)][_0x2a1678(0x2e2)][_0x2a1678(0x4c7)](this,_0x33c0e9),this[_0x2a1678(0x4b4)](_0x33c0e9);},Graphics[_0x479088(0x4b4)]=function(_0x5692e8){const _0x4540ef=_0x479088;VisuMZ['CoreEngine']['Settings'][_0x4540ef(0x6da)][_0x4540ef(0x334)]&&(_0x5692e8[_0x4540ef(0x377)][_0x4540ef(0x19d)]=_0x4540ef(0x6eb));VisuMZ[_0x4540ef(0x676)][_0x4540ef(0x502)][_0x4540ef(0x6da)][_0x4540ef(0x597)]&&(_0x5692e8['style'][_0x4540ef(0x1fe)]=_0x4540ef(0x207));const _0x25feb6=Math[_0x4540ef(0x1ad)](0x0,Math[_0x4540ef(0x7c1)](_0x5692e8[_0x4540ef(0x7bc)]*this['_realScale'])),_0x431abf=Math['max'](0x0,Math[_0x4540ef(0x7c1)](_0x5692e8[_0x4540ef(0x5de)]*this['_realScale']));_0x5692e8['style']['width']=_0x25feb6+'px',_0x5692e8['style'][_0x4540ef(0x5de)]=_0x431abf+'px';},Bitmap[_0x479088(0x6e6)][_0x479088(0x16c)]=function(){const _0x3eea73=_0x479088;this[_0x3eea73(0x2d0)]=!![];},VisuMZ[_0x479088(0x676)][_0x479088(0x6e9)]=Sprite['prototype'][_0x479088(0x523)],Sprite[_0x479088(0x6e6)]['destroy']=function(){const _0x4ab206=_0x479088;VisuMZ[_0x4ab206(0x676)][_0x4ab206(0x6e9)][_0x4ab206(0x4c7)](this),this[_0x4ab206(0x542)]();},Sprite[_0x479088(0x6e6)][_0x479088(0x542)]=function(){const _0x5a735d=_0x479088;if(!this[_0x5a735d(0x221)])return;if(!this[_0x5a735d(0x221)][_0x5a735d(0x2d0)])return;this[_0x5a735d(0x221)][_0x5a735d(0x525)]&&!this['_bitmap'][_0x5a735d(0x525)]['destroyed']&&this[_0x5a735d(0x221)][_0x5a735d(0x523)]();},VisuMZ[_0x479088(0x676)]['Bitmap_resize']=Bitmap[_0x479088(0x6e6)][_0x479088(0x6bc)],Bitmap[_0x479088(0x6e6)][_0x479088(0x6bc)]=function(_0x5eeda5,_0x3fccd6){const _0x98db01=_0x479088;VisuMZ[_0x98db01(0x676)]['Bitmap_resize'][_0x98db01(0x4c7)](this,_0x5eeda5,_0x3fccd6),this[_0x98db01(0x16c)]();},VisuMZ[_0x479088(0x676)][_0x479088(0x532)]=Bitmap[_0x479088(0x6e6)][_0x479088(0x6bb)],Bitmap[_0x479088(0x6e6)][_0x479088(0x6bb)]=function(_0x4bc345,_0x269c8b,_0x1c2bde,_0x1bc24a,_0x5892b1,_0x54cd51,_0x3426e4,_0x14ce5c,_0x295a91){const _0x575a45=_0x479088;VisuMZ[_0x575a45(0x676)]['Bitmap_blt'][_0x575a45(0x4c7)](this,_0x4bc345,_0x269c8b,_0x1c2bde,_0x1bc24a,_0x5892b1,_0x54cd51,_0x3426e4,_0x14ce5c,_0x295a91),this[_0x575a45(0x16c)]();},VisuMZ[_0x479088(0x676)][_0x479088(0x17c)]=Bitmap[_0x479088(0x6e6)][_0x479088(0x21c)],Bitmap['prototype'][_0x479088(0x21c)]=function(_0x1fd878,_0x2b1e4e,_0x4fddd2,_0x171016){const _0x4d5870=_0x479088;VisuMZ['CoreEngine'][_0x4d5870(0x17c)]['call'](this,_0x1fd878,_0x2b1e4e,_0x4fddd2,_0x171016),this['markCoreEngineModified']();},VisuMZ[_0x479088(0x676)][_0x479088(0x591)]=Bitmap[_0x479088(0x6e6)]['fillRect'],Bitmap[_0x479088(0x6e6)]['fillRect']=function(_0x9643dc,_0x5d9787,_0x441f98,_0x7dd0e9,_0x148cd7){const _0x30efd1=_0x479088;VisuMZ[_0x30efd1(0x676)]['Bitmap_fillRect'][_0x30efd1(0x4c7)](this,_0x9643dc,_0x5d9787,_0x441f98,_0x7dd0e9,_0x148cd7),this[_0x30efd1(0x16c)]();},VisuMZ['CoreEngine'][_0x479088(0x3cd)]=Bitmap[_0x479088(0x6e6)]['strokeRect'],Bitmap[_0x479088(0x6e6)]['strokeRect']=function(_0x1877a0,_0x59fd78,_0x212a59,_0x1d63df,_0x9f57a1){const _0x3c2304=_0x479088;VisuMZ[_0x3c2304(0x676)][_0x3c2304(0x3cd)][_0x3c2304(0x4c7)](this,_0x1877a0,_0x59fd78,_0x212a59,_0x1d63df,_0x9f57a1),this['markCoreEngineModified']();},VisuMZ[_0x479088(0x676)][_0x479088(0x3a9)]=Bitmap[_0x479088(0x6e6)][_0x479088(0x23a)],Bitmap[_0x479088(0x6e6)][_0x479088(0x23a)]=function(_0x77521f,_0x60e20b,_0xd9c066,_0x4cfef5,_0x149dd1,_0x4bc80d,_0x41c21b){const _0x3b29cc=_0x479088;VisuMZ[_0x3b29cc(0x676)]['Bitmap_gradientFillRect']['call'](this,_0x77521f,_0x60e20b,_0xd9c066,_0x4cfef5,_0x149dd1,_0x4bc80d,_0x41c21b),this[_0x3b29cc(0x16c)]();},VisuMZ['CoreEngine'][_0x479088(0x37a)]=Bitmap[_0x479088(0x6e6)][_0x479088(0x59b)],Bitmap[_0x479088(0x6e6)][_0x479088(0x59b)]=function(_0x45a8dd,_0x263f9d,_0x139a83,_0x18e0fe){const _0x37fbca=_0x479088;_0x45a8dd=Math['round'](_0x45a8dd),_0x263f9d=Math['round'](_0x263f9d),_0x139a83=Math[_0x37fbca(0x786)](_0x139a83),VisuMZ[_0x37fbca(0x676)][_0x37fbca(0x37a)][_0x37fbca(0x4c7)](this,_0x45a8dd,_0x263f9d,_0x139a83,_0x18e0fe),this[_0x37fbca(0x16c)]();},VisuMZ[_0x479088(0x676)]['Bitmap_measureTextWidth']=Bitmap[_0x479088(0x6e6)][_0x479088(0x649)],Bitmap[_0x479088(0x6e6)][_0x479088(0x649)]=function(_0x59b2e7){const _0x22d5d8=_0x479088;return Math[_0x22d5d8(0x786)](VisuMZ['CoreEngine'][_0x22d5d8(0x310)]['call'](this,_0x59b2e7));},VisuMZ[_0x479088(0x676)][_0x479088(0x566)]=Bitmap['prototype'][_0x479088(0x665)],Bitmap[_0x479088(0x6e6)][_0x479088(0x665)]=function(_0x185669,_0x2b3ddc,_0x448f8e,_0x176079,_0x46c7f7,_0x517881){const _0x3f62ec=_0x479088;_0x2b3ddc=Math['round'](_0x2b3ddc),_0x448f8e=Math['round'](_0x448f8e),_0x176079=Math[_0x3f62ec(0x786)](_0x176079),_0x46c7f7=Math['round'](_0x46c7f7),VisuMZ[_0x3f62ec(0x676)][_0x3f62ec(0x566)][_0x3f62ec(0x4c7)](this,_0x185669,_0x2b3ddc,_0x448f8e,_0x176079,_0x46c7f7,_0x517881),this['markCoreEngineModified']();},VisuMZ[_0x479088(0x676)][_0x479088(0x58a)]=Bitmap[_0x479088(0x6e6)][_0x479088(0x328)],Bitmap['prototype']['_drawTextOutline']=function(_0x4b92dd,_0x7ed7aa,_0x59076d,_0x10ca63){const _0x1772ab=_0x479088;if(VisuMZ[_0x1772ab(0x676)][_0x1772ab(0x502)][_0x1772ab(0x6da)][_0x1772ab(0x3c8)]){if(_0x1772ab(0x3f7)!==_0x1772ab(0x645))this['_drawTextShadow'](_0x4b92dd,_0x7ed7aa,_0x59076d,_0x10ca63);else{function _0x1a9db5(){const _0x32cb0c=_0x1772ab;return this[_0x32cb0c(0x655)]()[_0x32cb0c(0x3b4)](_0x56f71b=>this[_0x32cb0c(0x40e)](_0x56f71b)&&this[_0x32cb0c(0x76c)]()[_0x32cb0c(0x6c5)](_0x56f71b[_0x32cb0c(0x519)]));}}}else{if(_0x1772ab(0x21e)===_0x1772ab(0x750)){function _0xca2482(){const _0x30bde8=_0x1772ab,_0x108036=_0x27bc26[_0x30bde8(0x3a0)];let _0x44ecc2=_0x58b299[_0x30bde8(0x63b)];if(['',_0x30bde8(0x303)][_0x30bde8(0x6c5)](_0x44ecc2))_0x44ecc2=_0x108860[_0x30bde8(0x4f8)]['call'](this);const _0x62e7b8=_0x19590c[_0x30bde8(0x792)][_0x30bde8(0x4c7)](this),_0x51272a=_0x51de5a[_0x30bde8(0x4b2)][_0x30bde8(0x4c7)](this);this['addCommand'](_0x44ecc2,_0x108036,_0x62e7b8,_0x51272a),this[_0x30bde8(0x41c)](_0x108036,_0x3035bc['CallHandlerJS'][_0x30bde8(0x34b)](this,_0x51272a));}}else VisuMZ[_0x1772ab(0x676)][_0x1772ab(0x58a)][_0x1772ab(0x4c7)](this,_0x4b92dd,_0x7ed7aa,_0x59076d,_0x10ca63);}},Bitmap[_0x479088(0x6e6)][_0x479088(0x7f9)]=function(_0x5bf4fe,_0x2744a4,_0x198941,_0x573597){const _0x47e6f6=_0x479088,_0x6053cd=this['context'];_0x6053cd['fillStyle']=this[_0x47e6f6(0x2eb)],_0x6053cd[_0x47e6f6(0x696)](_0x5bf4fe,_0x2744a4+0x2,_0x198941+0x2,_0x573597);},VisuMZ['CoreEngine'][_0x479088(0x788)]=Input[_0x479088(0x4d8)],Input[_0x479088(0x4d8)]=function(){const _0x2fa514=_0x479088;VisuMZ['CoreEngine'][_0x2fa514(0x788)][_0x2fa514(0x4c7)](this),this[_0x2fa514(0x686)]=undefined,this[_0x2fa514(0x237)]=undefined;},VisuMZ['CoreEngine']['Input_setupEventHandlers']=Input[_0x479088(0x5c2)],Input['_setupEventHandlers']=function(){const _0x5917be=_0x479088;VisuMZ[_0x5917be(0x676)]['Input_setupEventHandlers'][_0x5917be(0x4c7)](this),document[_0x5917be(0x45b)](_0x5917be(0x6fb),this[_0x5917be(0x7db)][_0x5917be(0x34b)](this));},VisuMZ[_0x479088(0x676)]['Input_onKeyDown']=Input[_0x479088(0x3cb)],Input[_0x479088(0x3cb)]=function(_0x3638b9){const _0x44f677=_0x479088;this[_0x44f677(0x237)]=_0x3638b9[_0x44f677(0x77b)],VisuMZ['CoreEngine']['Input_onKeyDown'][_0x44f677(0x4c7)](this,_0x3638b9);},Input[_0x479088(0x7db)]=function(_0x1ffe10){const _0x945c83=_0x479088;this[_0x945c83(0x48a)](_0x1ffe10);},Input['_registerKeyInput']=function(_0x2b879a){const _0xaae000=_0x479088;this['_inputSpecialKeyCode']=_0x2b879a[_0xaae000(0x77b)];let _0x50a60c=String[_0xaae000(0x604)](_0x2b879a[_0xaae000(0x16e)]);if(this[_0xaae000(0x686)]===undefined){if(_0xaae000(0x622)===_0xaae000(0x5ae)){function _0x3710c6(){const _0x5f1efa=_0xaae000;return _0xc70c25[_0x5f1efa(0x676)][_0x5f1efa(0x502)]['UI'][_0x5f1efa(0x4f3)];}}else this[_0xaae000(0x686)]=_0x50a60c;}else this[_0xaae000(0x686)]+=_0x50a60c;},VisuMZ['CoreEngine'][_0x479088(0x778)]=Input[_0x479088(0x7d3)],Input[_0x479088(0x7d3)]=function(_0x5af437){const _0x1018c1=_0x479088;if(_0x5af437===0x8)return![];return VisuMZ[_0x1018c1(0x676)][_0x1018c1(0x778)][_0x1018c1(0x4c7)](this,_0x5af437);},Input[_0x479088(0x260)]=function(_0x3c9da7){const _0x2ace1f=_0x479088;if(_0x3c9da7['match'](/backspace/i))return this[_0x2ace1f(0x237)]===0x8;if(_0x3c9da7[_0x2ace1f(0x7cd)](/enter/i))return this[_0x2ace1f(0x237)]===0xd;if(_0x3c9da7['match'](/escape/i))return this[_0x2ace1f(0x237)]===0x1b;},Input['isNumpadPressed']=function(){const _0x4fd099=_0x479088;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x4fd099(0x237)]);},Input[_0x479088(0x6e8)]=function(){const _0x2b3346=_0x479088;return[0x25,0x26,0x27,0x28][_0x2b3346(0x199)](this['_inputSpecialKeyCode']);},VisuMZ[_0x479088(0x676)]['Tilemap_addShadow']=Tilemap[_0x479088(0x6e6)][_0x479088(0x23b)],Tilemap[_0x479088(0x6e6)]['_addShadow']=function(_0x3305b6,_0x5528b4,_0x2de457,_0x4bd18f){const _0x3b6b1a=_0x479088;if($gameMap&&$gameMap[_0x3b6b1a(0x4a8)]())return;VisuMZ[_0x3b6b1a(0x676)][_0x3b6b1a(0x5ef)]['call'](this,_0x3305b6,_0x5528b4,_0x2de457,_0x4bd18f);},Tilemap['Renderer'][_0x479088(0x6e6)][_0x479088(0x353)]=function(){const _0x2ae2b6=_0x479088;this[_0x2ae2b6(0x636)]();for(let _0x4e3f00=0x0;_0x4e3f00<Tilemap[_0x2ae2b6(0x181)][_0x2ae2b6(0x60b)];_0x4e3f00++){if('iuVRX'!==_0x2ae2b6(0x40f)){function _0x487728(){const _0x25cb5e=_0x2ae2b6;_0x54d05c=this[_0x25cb5e(0x7bd)]();}}else{const _0x17e609=new PIXI[(_0x2ae2b6(0x3dc))]();_0x17e609['setSize'](0x800,0x800),VisuMZ['CoreEngine']['Settings']['QoL'][_0x2ae2b6(0x597)]&&(_0x17e609[_0x2ae2b6(0x70d)]=PIXI[_0x2ae2b6(0x394)][_0x2ae2b6(0x725)]),this[_0x2ae2b6(0x24c)][_0x2ae2b6(0x4d1)](_0x17e609);}}},WindowLayer[_0x479088(0x6e6)]['isMaskingEnabled']=function(){const _0x44ccfa=_0x479088;if(SceneManager&&SceneManager[_0x44ccfa(0x4b7)]){if('yGNDt'!=='yGNDt'){function _0x297148(){return this['_anchor'];}}else return SceneManager[_0x44ccfa(0x4b7)][_0x44ccfa(0x7e5)]();}else{if('Vvldx'!==_0x44ccfa(0x1cf))return!![];else{function _0x4d2883(){const _0x3bc15d=_0x44ccfa,_0x20e73a=_0x46635a[_0x3bc15d(0x3a0)];let _0x48657a=_0x4f7376[_0x3bc15d(0x63b)];if(['','Untitled']['includes'](_0x48657a))_0x48657a=_0x1a168a[_0x3bc15d(0x4f8)][_0x3bc15d(0x4c7)](this);const _0x80a580=_0x5a6dc0[_0x3bc15d(0x792)]['call'](this),_0x842c65=_0x495163[_0x3bc15d(0x4b2)][_0x3bc15d(0x4c7)](this);this['addCommand'](_0x48657a,_0x20e73a,_0x80a580,_0x842c65),this['setHandler'](_0x20e73a,_0x236f27[_0x3bc15d(0x162)][_0x3bc15d(0x34b)](this,_0x842c65));}}}},VisuMZ[_0x479088(0x676)][_0x479088(0x1e7)]=WindowLayer['prototype'][_0x479088(0x578)],WindowLayer[_0x479088(0x6e6)][_0x479088(0x578)]=function render(_0x288e5d){const _0x1d686c=_0x479088;if(this[_0x1d686c(0x687)]()){if(_0x1d686c(0x752)!==_0x1d686c(0x752)){function _0x4e86fb(){const _0x47e95a=_0x1d686c;if(this[_0x47e95a(0x174)]){const _0x5891c6=this[_0x47e95a(0x174)][_0x47e95a(0x221)],_0x3af7f2=this['width'],_0x53afe3=this[_0x47e95a(0x5de)],_0x89a44=this['padding'],_0x1af4ae=_0x4e7c92[_0x47e95a(0x47e)](),_0x4b7500=_0x29a51a['dimColor2']();_0x5891c6[_0x47e95a(0x6bc)](_0x3af7f2,_0x53afe3),_0x5891c6[_0x47e95a(0x23a)](0x0,0x0,_0x3af7f2,_0x89a44,_0x4b7500,_0x1af4ae,!![]),_0x5891c6[_0x47e95a(0x598)](0x0,_0x89a44,_0x3af7f2,_0x53afe3-_0x89a44*0x2,_0x1af4ae),_0x5891c6[_0x47e95a(0x23a)](0x0,_0x53afe3-_0x89a44,_0x3af7f2,_0x89a44,_0x1af4ae,_0x4b7500,!![]),this[_0x47e95a(0x174)][_0x47e95a(0x1de)](0x0,0x0,_0x3af7f2,_0x53afe3);}}}else VisuMZ[_0x1d686c(0x676)][_0x1d686c(0x1e7)]['call'](this,_0x288e5d);}else this[_0x1d686c(0x267)](_0x288e5d);},WindowLayer[_0x479088(0x6e6)][_0x479088(0x267)]=function render(_0x330574){const _0xec53db=_0x479088;if(!this[_0xec53db(0x3d8)])return;const _0x435047=new PIXI[(_0xec53db(0x23d))](),_0x254cab=_0x330574['gl'],_0xb9ae43=this['children'][_0xec53db(0x6ee)]();_0x330574[_0xec53db(0x627)][_0xec53db(0x39a)](),_0x435047['transform']=this[_0xec53db(0x472)],_0x330574[_0xec53db(0x46b)][_0xec53db(0x395)](),_0x254cab[_0xec53db(0x37c)](_0x254cab[_0xec53db(0x698)]);while(_0xb9ae43[_0xec53db(0x774)]>0x0){if('soLJR'!==_0xec53db(0x7df)){const _0x3bf5d3=_0xb9ae43[_0xec53db(0x1fb)]();_0x3bf5d3[_0xec53db(0x197)]&&_0x3bf5d3[_0xec53db(0x3d8)]&&_0x3bf5d3[_0xec53db(0x3b3)]>0x0&&(_0x254cab[_0xec53db(0x5fc)](_0x254cab[_0xec53db(0x570)],0x0,~0x0),_0x254cab['stencilOp'](_0x254cab['KEEP'],_0x254cab['KEEP'],_0x254cab['KEEP']),_0x3bf5d3[_0xec53db(0x578)](_0x330574),_0x330574['batch'][_0xec53db(0x395)](),_0x435047['clear'](),_0x254cab[_0xec53db(0x5fc)](_0x254cab[_0xec53db(0x3bd)],0x1,~0x0),_0x254cab[_0xec53db(0x1b4)](_0x254cab[_0xec53db(0x14c)],_0x254cab['REPLACE'],_0x254cab[_0xec53db(0x14c)]),_0x254cab['blendFunc'](_0x254cab['ZERO'],_0x254cab[_0xec53db(0x5b0)]),_0x435047['render'](_0x330574),_0x330574[_0xec53db(0x46b)]['flush'](),_0x254cab[_0xec53db(0x3cc)](_0x254cab[_0xec53db(0x5b0)],_0x254cab[_0xec53db(0x736)]));}else{function _0x252e24(){const _0x57b340=_0xec53db;this[_0x57b340(0x4fc)]['clear']();for(let _0x1c6791=0x1;_0x1c6791<=0x5;_0x1c6791++){this['drawSegment'](_0x1c6791);}}}}_0x254cab[_0xec53db(0x697)](_0x254cab[_0xec53db(0x698)]),_0x254cab[_0xec53db(0x4d8)](_0x254cab[_0xec53db(0x337)]),_0x254cab[_0xec53db(0x551)](0x0),_0x330574[_0xec53db(0x46b)][_0xec53db(0x395)]();for(const _0x197f0e of this[_0xec53db(0x6d3)]){if(_0xec53db(0x24f)!==_0xec53db(0x24f)){function _0x91ce71(){const _0x453ff5=_0xec53db;return this['subject']()[_0x453ff5(0x36a)]+0.05;}}else!_0x197f0e[_0xec53db(0x197)]&&_0x197f0e[_0xec53db(0x3d8)]&&_0x197f0e[_0xec53db(0x578)](_0x330574);}_0x330574[_0xec53db(0x46b)][_0xec53db(0x395)]();},DataManager[_0x479088(0x426)]=function(_0x2bd666){const _0x49e02d=_0x479088;return this[_0x49e02d(0x56a)](_0x2bd666)&&_0x2bd666['itypeId']===0x2;},VisuMZ[_0x479088(0x676)][_0x479088(0x47f)]=DataManager[_0x479088(0x18c)],DataManager[_0x479088(0x18c)]=function(){const _0x402c4a=_0x479088;VisuMZ['CoreEngine'][_0x402c4a(0x47f)][_0x402c4a(0x4c7)](this),this['reservePlayTestNewGameCommonEvent']();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x3134df=_0x479088;if($gameTemp[_0x3134df(0x2b6)]()){const _0xdad6e5=VisuMZ[_0x3134df(0x676)][_0x3134df(0x502)][_0x3134df(0x6da)][_0x3134df(0x1da)];if(_0xdad6e5>0x0)$gameTemp['reserveCommonEvent'](_0xdad6e5);}},TextManager[_0x479088(0x496)]=['','','',_0x479088(0x554),'','',_0x479088(0x161),'',_0x479088(0x27f),_0x479088(0x568),'','',_0x479088(0x4c9),_0x479088(0x55d),_0x479088(0x5d4),'',_0x479088(0x5c8),_0x479088(0x709),_0x479088(0x3cf),_0x479088(0x477),_0x479088(0x78f),'KANA',_0x479088(0x150),_0x479088(0x762),_0x479088(0x273),'HANJA','',_0x479088(0x754),_0x479088(0x2bf),_0x479088(0x42c),'ACCEPT',_0x479088(0x420),_0x479088(0x2fd),_0x479088(0x1c4),'PGDN',_0x479088(0x621),_0x479088(0x46d),_0x479088(0x22a),'UP',_0x479088(0x4a1),'DOWN',_0x479088(0x4a5),_0x479088(0x579),_0x479088(0x63d),_0x479088(0x32d),'INSERT','DELETE','','0','1','2','3','4','5','6','7','8','9',_0x479088(0x304),'SEMICOLON',_0x479088(0x1ee),'EQUALS',_0x479088(0x142),_0x479088(0x5ba),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x479088(0x25a),'',_0x479088(0x19a),_0x479088(0x72b),_0x479088(0x343),_0x479088(0x1db),_0x479088(0x5d0),_0x479088(0x1bb),_0x479088(0x7c4),_0x479088(0x6a4),'NUMPAD7','NUMPAD8',_0x479088(0x651),_0x479088(0x2bb),'ADD','SEPARATOR',_0x479088(0x6be),_0x479088(0x576),_0x479088(0x595),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x479088(0x23f),'F12',_0x479088(0x367),_0x479088(0x474),_0x479088(0x3c9),'F16',_0x479088(0x771),'F18','F19',_0x479088(0x552),_0x479088(0x40c),_0x479088(0x177),_0x479088(0x173),_0x479088(0x3fc),'','','','','','','','',_0x479088(0x59e),_0x479088(0x781),_0x479088(0x4bc),_0x479088(0x1a2),_0x479088(0x34e),_0x479088(0x4ae),_0x479088(0x6cd),'','','','','','','','','',_0x479088(0x69d),'EXCLAMATION',_0x479088(0x50b),_0x479088(0x22e),_0x479088(0x740),_0x479088(0x148),_0x479088(0x316),_0x479088(0x528),_0x479088(0x382),_0x479088(0x1c5),_0x479088(0x45f),_0x479088(0x431),'PIPE',_0x479088(0x7b0),'OPEN_CURLY_BRACKET',_0x479088(0x608),_0x479088(0x7a1),'','','','',_0x479088(0x765),_0x479088(0x647),_0x479088(0x206),'','','SEMICOLON',_0x479088(0x49c),_0x479088(0x531),_0x479088(0x2bc),'PERIOD',_0x479088(0x485),_0x479088(0x4ca),'','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET',_0x479088(0x7fa),_0x479088(0x746),_0x479088(0x412),'','META','ALTGR','',_0x479088(0x743),_0x479088(0x63c),'','WIN_ICO_CLEAR','','','WIN_OEM_RESET',_0x479088(0x711),_0x479088(0x4f2),_0x479088(0x78a),_0x479088(0x65d),'WIN_OEM_WSCTRL',_0x479088(0x14a),_0x479088(0x3be),_0x479088(0x3ff),'WIN_OEM_COPY',_0x479088(0x684),'WIN_OEM_ENLW',_0x479088(0x2c8),'ATTN',_0x479088(0x7d5),'EXSEL',_0x479088(0x6c8),_0x479088(0x7c7),'ZOOM','',_0x479088(0x493),_0x479088(0x52b),''],TextManager[_0x479088(0x51a)]=VisuMZ[_0x479088(0x676)]['Settings']['ButtonAssist'][_0x479088(0x751)],TextManager[_0x479088(0x664)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)]['ButtonAssist'][_0x479088(0x536)],TextManager[_0x479088(0x2b4)]=VisuMZ['CoreEngine'][_0x479088(0x502)][_0x479088(0x6db)]['SwitchActorText'],VisuMZ['CoreEngine'][_0x479088(0x3fa)]=TextManager[_0x479088(0x3d5)],TextManager[_0x479088(0x3d5)]=function(_0x5a6803){const _0x149c67=_0x479088;if(typeof _0x5a6803===_0x149c67(0x44e)){if(_0x149c67(0x6d6)!==_0x149c67(0x6d6)){function _0x3617f1(){const _0x582a3f=_0x149c67;_0x23f186['CoreEngine']['Window_NameInput_refresh'][_0x582a3f(0x4c7)](this);}}else return VisuMZ[_0x149c67(0x676)][_0x149c67(0x3fa)][_0x149c67(0x4c7)](this,_0x5a6803);}else{if(_0x149c67(0x5ee)!==_0x149c67(0x242))return this[_0x149c67(0x70a)](_0x5a6803);else{function _0x1967e1(){const _0x231c9c=_0x149c67;return _0x561e4a[_0x231c9c(0x3e8)][_0x231c9c(0x6a0)]['call'](this);}}}},TextManager[_0x479088(0x70a)]=function(_0x2fa3c7){const _0x49da62=_0x479088;_0x2fa3c7=String(_0x2fa3c7||'')[_0x49da62(0x2b9)]();const _0x3bcc94=VisuMZ[_0x49da62(0x676)][_0x49da62(0x502)][_0x49da62(0x1cb)];if(_0x2fa3c7===_0x49da62(0x5da))return $dataSystem[_0x49da62(0x26e)][_0x49da62(0x7ee)][0x0];if(_0x2fa3c7===_0x49da62(0x33f))return $dataSystem['terms']['params'][0x1];if(_0x2fa3c7===_0x49da62(0x1e0))return $dataSystem[_0x49da62(0x26e)][_0x49da62(0x7ee)][0x2];if(_0x2fa3c7===_0x49da62(0x3aa))return $dataSystem[_0x49da62(0x26e)][_0x49da62(0x7ee)][0x3];if(_0x2fa3c7===_0x49da62(0x5c3))return $dataSystem[_0x49da62(0x26e)][_0x49da62(0x7ee)][0x4];if(_0x2fa3c7===_0x49da62(0x518))return $dataSystem[_0x49da62(0x26e)][_0x49da62(0x7ee)][0x5];if(_0x2fa3c7===_0x49da62(0x65e))return $dataSystem[_0x49da62(0x26e)][_0x49da62(0x7ee)][0x6];if(_0x2fa3c7===_0x49da62(0x298))return $dataSystem['terms'][_0x49da62(0x7ee)][0x7];if(_0x2fa3c7===_0x49da62(0x325))return _0x3bcc94[_0x49da62(0x5f3)];if(_0x2fa3c7==='EVA')return _0x3bcc94[_0x49da62(0x18a)];if(_0x2fa3c7===_0x49da62(0x550))return _0x3bcc94[_0x49da62(0x3f4)];if(_0x2fa3c7===_0x49da62(0x675))return _0x3bcc94[_0x49da62(0x5cd)];if(_0x2fa3c7===_0x49da62(0x422))return _0x3bcc94[_0x49da62(0x187)];if(_0x2fa3c7===_0x49da62(0x51e))return _0x3bcc94[_0x49da62(0x7f8)];if(_0x2fa3c7===_0x49da62(0x64b))return _0x3bcc94[_0x49da62(0x1b0)];if(_0x2fa3c7==='HRG')return _0x3bcc94[_0x49da62(0x729)];if(_0x2fa3c7===_0x49da62(0x6ae))return _0x3bcc94[_0x49da62(0x243)];if(_0x2fa3c7===_0x49da62(0x7a2))return _0x3bcc94['XParamVocab9'];if(_0x2fa3c7===_0x49da62(0x620))return _0x3bcc94[_0x49da62(0x7f1)];if(_0x2fa3c7==='GRD')return _0x3bcc94['SParamVocab1'];if(_0x2fa3c7===_0x49da62(0x747))return _0x3bcc94[_0x49da62(0x35b)];if(_0x2fa3c7===_0x49da62(0x39d))return _0x3bcc94[_0x49da62(0x32f)];if(_0x2fa3c7===_0x49da62(0x1a9))return _0x3bcc94[_0x49da62(0x3e3)];if(_0x2fa3c7===_0x49da62(0x2c4))return _0x3bcc94['SParamVocab5'];if(_0x2fa3c7===_0x49da62(0x7f3))return _0x3bcc94[_0x49da62(0x193)];if(_0x2fa3c7===_0x49da62(0x62b))return _0x3bcc94[_0x49da62(0x5f7)];if(_0x2fa3c7===_0x49da62(0x299))return _0x3bcc94[_0x49da62(0x5d8)];if(_0x2fa3c7===_0x49da62(0x16f))return _0x3bcc94[_0x49da62(0x3f1)];if(VisuMZ[_0x49da62(0x676)][_0x49da62(0x43a)][_0x2fa3c7])return VisuMZ['CoreEngine'][_0x49da62(0x43a)][_0x2fa3c7];return'';},TextManager['getInputButtonString']=function(_0x31cc4e){const _0x49bd21=_0x479088;if(_0x31cc4e===_0x49bd21(0x33c))_0x31cc4e=_0x49bd21(0x614);let _0x1f104e=[];for(let _0x554319 in Input['keyMapper']){if(_0x49bd21(0x2f5)!==_0x49bd21(0x2f5)){function _0x2b33ba(){const _0x3e68a7=_0x49bd21;return _0x25e171['CoreEngine'][_0x3e68a7(0x502)][_0x3e68a7(0x6f2)]['length'];}}else{_0x554319=Number(_0x554319);if(_0x554319>=0x60&&_0x554319<=0x69)continue;if([0x12,0x20]['includes'](_0x554319))continue;if(_0x31cc4e===Input[_0x49bd21(0x7bb)][_0x554319]){if(_0x49bd21(0x190)!==_0x49bd21(0x190)){function _0x2634c8(){const _0x2b95ef=_0x49bd21;try{_0x3046e3[_0x2b95ef(0x676)][_0x2b95ef(0x1d6)][_0x2b95ef(0x4c7)](this);}catch(_0x5d21b8){_0x508ebc['isPlaytest']()&&(_0xab17f5[_0x2b95ef(0x652)](_0x2b95ef(0x1f6)),_0x376467[_0x2b95ef(0x652)](_0x5d21b8));}return!![];}}else _0x1f104e[_0x49bd21(0x4d1)](_0x554319);}}}for(let _0x4de379=0x0;_0x4de379<_0x1f104e['length'];_0x4de379++){_0x1f104e[_0x4de379]=TextManager['stringKeyMap'][_0x1f104e[_0x4de379]];}return this[_0x49bd21(0x344)](_0x1f104e);},TextManager[_0x479088(0x344)]=function(_0x68232d){const _0x5a094d=_0x479088,_0x45ae88=VisuMZ['CoreEngine'][_0x5a094d(0x502)][_0x5a094d(0x6db)],_0x58cbd9=_0x45ae88[_0x5a094d(0x390)],_0x1f95a6=_0x68232d[_0x5a094d(0x6b9)](),_0x2d6860=_0x5a094d(0x460)['format'](_0x1f95a6);return _0x45ae88[_0x2d6860]?_0x45ae88[_0x2d6860]:_0x58cbd9[_0x5a094d(0x50d)](_0x1f95a6);},TextManager[_0x479088(0x26a)]=function(_0x39b166,_0x27bbad){const _0x5b49d1=_0x479088,_0x4e7ecc=VisuMZ[_0x5b49d1(0x676)]['Settings'][_0x5b49d1(0x6db)],_0x2f1c13=_0x4e7ecc[_0x5b49d1(0x1aa)],_0x3c5407=this[_0x5b49d1(0x421)](_0x39b166),_0x31e196=this[_0x5b49d1(0x421)](_0x27bbad);return _0x2f1c13[_0x5b49d1(0x50d)](_0x3c5407,_0x31e196);},VisuMZ[_0x479088(0x676)][_0x479088(0x4f6)]=ColorManager[_0x479088(0x654)],ColorManager['loadWindowskin']=function(){const _0x13b653=_0x479088;VisuMZ[_0x13b653(0x676)][_0x13b653(0x4f6)][_0x13b653(0x4c7)](this),this[_0x13b653(0x53e)]=this[_0x13b653(0x53e)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x2a2aaa,_0x1a046b){const _0x38bdce=_0x479088;return _0x1a046b=String(_0x1a046b),this[_0x38bdce(0x53e)]=this[_0x38bdce(0x53e)]||{},_0x1a046b[_0x38bdce(0x7cd)](/#(.*)/i)?this[_0x38bdce(0x53e)][_0x2a2aaa]='#%1'[_0x38bdce(0x50d)](String(RegExp['$1'])):this[_0x38bdce(0x53e)][_0x2a2aaa]=this[_0x38bdce(0x2c3)](Number(_0x1a046b)),this[_0x38bdce(0x53e)][_0x2a2aaa];},ColorManager['getColor']=function(_0x5ae9bb){const _0x505061=_0x479088;return _0x5ae9bb=String(_0x5ae9bb),_0x5ae9bb['match'](/#(.*)/i)?_0x505061(0x213)[_0x505061(0x50d)](String(RegExp['$1'])):this['textColor'](Number(_0x5ae9bb));},ColorManager[_0x479088(0x677)]=function(){this['_colorCache']={};},ColorManager[_0x479088(0x62f)]=function(){const _0xbea849=_0x479088,_0x4f0480=_0xbea849(0x482);this[_0xbea849(0x53e)]=this[_0xbea849(0x53e)]||{};if(this[_0xbea849(0x53e)][_0x4f0480])return this[_0xbea849(0x53e)][_0x4f0480];const _0x950666=VisuMZ[_0xbea849(0x676)][_0xbea849(0x502)][_0xbea849(0x6c9)][_0xbea849(0x3fe)];return this[_0xbea849(0x3d9)](_0x4f0480,_0x950666);},ColorManager[_0x479088(0x3a4)]=function(){const _0x577a7a=_0x479088,_0x18d979=_0x577a7a(0x685);this[_0x577a7a(0x53e)]=this[_0x577a7a(0x53e)]||{};if(this['_colorCache'][_0x18d979])return this[_0x577a7a(0x53e)][_0x18d979];const _0x4bac31=VisuMZ['CoreEngine'][_0x577a7a(0x502)][_0x577a7a(0x6c9)][_0x577a7a(0x362)];return this[_0x577a7a(0x3d9)](_0x18d979,_0x4bac31);},ColorManager[_0x479088(0x280)]=function(){const _0x1412c9=_0x479088,_0x13fe5c='_stored_crisisColor';this[_0x1412c9(0x53e)]=this[_0x1412c9(0x53e)]||{};if(this['_colorCache'][_0x13fe5c])return this[_0x1412c9(0x53e)][_0x13fe5c];const _0x1f5a70=VisuMZ[_0x1412c9(0x676)][_0x1412c9(0x502)]['Color'][_0x1412c9(0x7cf)];return this[_0x1412c9(0x3d9)](_0x13fe5c,_0x1f5a70);},ColorManager[_0x479088(0x4e1)]=function(){const _0xd422a1=_0x479088,_0x1c3e51='_stored_deathColor';this[_0xd422a1(0x53e)]=this[_0xd422a1(0x53e)]||{};if(this['_colorCache'][_0x1c3e51])return this[_0xd422a1(0x53e)][_0x1c3e51];const _0x50319b=VisuMZ[_0xd422a1(0x676)]['Settings'][_0xd422a1(0x6c9)]['ColorDeath'];return this[_0xd422a1(0x3d9)](_0x1c3e51,_0x50319b);},ColorManager['gaugeBackColor']=function(){const _0x14bd8b=_0x479088,_0x5132d8=_0x14bd8b(0x61b);this['_colorCache']=this[_0x14bd8b(0x53e)]||{};if(this[_0x14bd8b(0x53e)][_0x5132d8])return this['_colorCache'][_0x5132d8];const _0x52696a=VisuMZ[_0x14bd8b(0x676)][_0x14bd8b(0x502)]['Color'][_0x14bd8b(0x333)];return this['getColorDataFromPluginParameters'](_0x5132d8,_0x52696a);},ColorManager[_0x479088(0x3e5)]=function(){const _0x3c0ba3=_0x479088,_0x2444b9=_0x3c0ba3(0x279);this[_0x3c0ba3(0x53e)]=this[_0x3c0ba3(0x53e)]||{};if(this[_0x3c0ba3(0x53e)][_0x2444b9])return this[_0x3c0ba3(0x53e)][_0x2444b9];const _0x19964e=VisuMZ[_0x3c0ba3(0x676)]['Settings']['Color'][_0x3c0ba3(0x4db)];return this['getColorDataFromPluginParameters'](_0x2444b9,_0x19964e);},ColorManager[_0x479088(0x14d)]=function(){const _0xbe3999=_0x479088,_0x627ff8=_0xbe3999(0x198);this[_0xbe3999(0x53e)]=this[_0xbe3999(0x53e)]||{};if(this[_0xbe3999(0x53e)][_0x627ff8])return this['_colorCache'][_0x627ff8];const _0x473c44=VisuMZ[_0xbe3999(0x676)]['Settings']['Color'][_0xbe3999(0x54a)];return this[_0xbe3999(0x3d9)](_0x627ff8,_0x473c44);},ColorManager['mpGaugeColor1']=function(){const _0x7c6e6e=_0x479088,_0x293b94=_0x7c6e6e(0x565);this[_0x7c6e6e(0x53e)]=this[_0x7c6e6e(0x53e)]||{};if(this['_colorCache'][_0x293b94])return this['_colorCache'][_0x293b94];const _0x192f7e=VisuMZ[_0x7c6e6e(0x676)][_0x7c6e6e(0x502)]['Color'][_0x7c6e6e(0x5a6)];return this[_0x7c6e6e(0x3d9)](_0x293b94,_0x192f7e);},ColorManager[_0x479088(0x16a)]=function(){const _0x413f76=_0x479088,_0x4ae9ed=_0x413f76(0x4e0);this['_colorCache']=this[_0x413f76(0x53e)]||{};if(this[_0x413f76(0x53e)][_0x4ae9ed])return this['_colorCache'][_0x4ae9ed];const _0x5d8a05=VisuMZ[_0x413f76(0x676)][_0x413f76(0x502)][_0x413f76(0x6c9)][_0x413f76(0x2db)];return this['getColorDataFromPluginParameters'](_0x4ae9ed,_0x5d8a05);},ColorManager[_0x479088(0x464)]=function(){const _0x2e654b=_0x479088,_0x5a6ceb=_0x2e654b(0x61c);this[_0x2e654b(0x53e)]=this[_0x2e654b(0x53e)]||{};if(this[_0x2e654b(0x53e)][_0x5a6ceb])return this[_0x2e654b(0x53e)][_0x5a6ceb];const _0x5d1dee=VisuMZ[_0x2e654b(0x676)]['Settings'][_0x2e654b(0x6c9)][_0x2e654b(0x20d)];return this[_0x2e654b(0x3d9)](_0x5a6ceb,_0x5d1dee);},ColorManager[_0x479088(0x2c6)]=function(){const _0x494936=_0x479088,_0x403b48=_0x494936(0x1ae);this['_colorCache']=this[_0x494936(0x53e)]||{};if(this[_0x494936(0x53e)][_0x403b48])return this[_0x494936(0x53e)][_0x403b48];const _0x2af4be=VisuMZ[_0x494936(0x676)]['Settings']['Color'][_0x494936(0x720)];return this[_0x494936(0x3d9)](_0x403b48,_0x2af4be);},ColorManager[_0x479088(0x2e7)]=function(){const _0x2055a0=_0x479088,_0x2c4da2=_0x2055a0(0x37f);this[_0x2055a0(0x53e)]=this[_0x2055a0(0x53e)]||{};if(this[_0x2055a0(0x53e)][_0x2c4da2])return this[_0x2055a0(0x53e)][_0x2c4da2];const _0x241fff=VisuMZ[_0x2055a0(0x676)][_0x2055a0(0x502)]['Color'][_0x2055a0(0x7bf)];return this[_0x2055a0(0x3d9)](_0x2c4da2,_0x241fff);},ColorManager[_0x479088(0x1eb)]=function(){const _0x2db84a=_0x479088,_0xbb5770=_0x2db84a(0x3ac);this[_0x2db84a(0x53e)]=this[_0x2db84a(0x53e)]||{};if(this['_colorCache'][_0xbb5770])return this[_0x2db84a(0x53e)][_0xbb5770];const _0x58fd6f=VisuMZ[_0x2db84a(0x676)][_0x2db84a(0x502)]['Color'][_0x2db84a(0x64a)];return this[_0x2db84a(0x3d9)](_0xbb5770,_0x58fd6f);},ColorManager[_0x479088(0x7aa)]=function(){const _0x1ff7c4=_0x479088,_0x402014='_stored_ctGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x402014])return this[_0x1ff7c4(0x53e)][_0x402014];const _0xc00fd1=VisuMZ[_0x1ff7c4(0x676)][_0x1ff7c4(0x502)]['Color'][_0x1ff7c4(0x27c)];return this[_0x1ff7c4(0x3d9)](_0x402014,_0xc00fd1);},ColorManager[_0x479088(0x2d1)]=function(){const _0x9ddb2b=_0x479088,_0x5889f5=_0x9ddb2b(0x1f7);this[_0x9ddb2b(0x53e)]=this['_colorCache']||{};if(this[_0x9ddb2b(0x53e)][_0x5889f5])return this['_colorCache'][_0x5889f5];const _0x5259a6=VisuMZ[_0x9ddb2b(0x676)]['Settings'][_0x9ddb2b(0x6c9)][_0x9ddb2b(0x5e2)];return this[_0x9ddb2b(0x3d9)](_0x5889f5,_0x5259a6);},ColorManager[_0x479088(0x533)]=function(){const _0x54467c=_0x479088,_0x1cae53=_0x54467c(0x254);this['_colorCache']=this[_0x54467c(0x53e)]||{};if(this['_colorCache'][_0x1cae53])return this[_0x54467c(0x53e)][_0x1cae53];const _0x2bee08=VisuMZ[_0x54467c(0x676)]['Settings'][_0x54467c(0x6c9)][_0x54467c(0x79a)];return this[_0x54467c(0x3d9)](_0x1cae53,_0x2bee08);},ColorManager['tpCostColor']=function(){const _0x198960=_0x479088,_0xac476='_stored_tpCostColor';this[_0x198960(0x53e)]=this[_0x198960(0x53e)]||{};if(this[_0x198960(0x53e)][_0xac476])return this[_0x198960(0x53e)][_0xac476];const _0xd93348=VisuMZ['CoreEngine'][_0x198960(0x502)][_0x198960(0x6c9)][_0x198960(0x6fc)];return this[_0x198960(0x3d9)](_0xac476,_0xd93348);},ColorManager[_0x479088(0x65f)]=function(){const _0xbad532=_0x479088,_0x9c0aba=_0xbad532(0x74d);this[_0xbad532(0x53e)]=this[_0xbad532(0x53e)]||{};if(this[_0xbad532(0x53e)][_0x9c0aba])return this[_0xbad532(0x53e)][_0x9c0aba];const _0x1fa67f=VisuMZ['CoreEngine']['Settings']['Color'][_0xbad532(0x6fc)];return this[_0xbad532(0x3d9)](_0x9c0aba,_0x1fa67f);},ColorManager[_0x479088(0x214)]=function(){const _0x4623ac=_0x479088,_0x170173='_stored_expGaugeColor1';this[_0x4623ac(0x53e)]=this[_0x4623ac(0x53e)]||{};if(this[_0x4623ac(0x53e)][_0x170173])return this[_0x4623ac(0x53e)][_0x170173];const _0x2bddd6=VisuMZ[_0x4623ac(0x676)][_0x4623ac(0x502)][_0x4623ac(0x6c9)][_0x4623ac(0x48f)];return this['getColorDataFromPluginParameters'](_0x170173,_0x2bddd6);},ColorManager['expGaugeColor2']=function(){const _0x2a6fca=_0x479088,_0x5d34df=_0x2a6fca(0x258);this[_0x2a6fca(0x53e)]=this[_0x2a6fca(0x53e)]||{};if(this['_colorCache'][_0x5d34df])return this[_0x2a6fca(0x53e)][_0x5d34df];const _0x312c5a=VisuMZ[_0x2a6fca(0x676)][_0x2a6fca(0x502)][_0x2a6fca(0x6c9)][_0x2a6fca(0x530)];return this[_0x2a6fca(0x3d9)](_0x5d34df,_0x312c5a);},ColorManager[_0x479088(0x6ed)]=function(){const _0x532293=_0x479088,_0x48165e='_stored_maxLvGaugeColor1';this[_0x532293(0x53e)]=this['_colorCache']||{};if(this[_0x532293(0x53e)][_0x48165e])return this['_colorCache'][_0x48165e];const _0x3a0de8=VisuMZ[_0x532293(0x676)][_0x532293(0x502)]['Color'][_0x532293(0x67a)];return this['getColorDataFromPluginParameters'](_0x48165e,_0x3a0de8);},ColorManager[_0x479088(0x411)]=function(){const _0x59873b=_0x479088,_0x36efb8=_0x59873b(0x25e);this['_colorCache']=this['_colorCache']||{};if(this[_0x59873b(0x53e)][_0x36efb8])return this[_0x59873b(0x53e)][_0x36efb8];const _0x1354db=VisuMZ[_0x59873b(0x676)][_0x59873b(0x502)][_0x59873b(0x6c9)][_0x59873b(0x6df)];return this['getColorDataFromPluginParameters'](_0x36efb8,_0x1354db);},ColorManager[_0x479088(0x235)]=function(_0x520fec){const _0x31cf34=_0x479088;return VisuMZ[_0x31cf34(0x676)][_0x31cf34(0x502)]['Color'][_0x31cf34(0x1a7)]['call'](this,_0x520fec);},ColorManager[_0x479088(0x5fb)]=function(_0xbf4422){const _0x1c15b3=_0x479088;return VisuMZ['CoreEngine'][_0x1c15b3(0x502)]['Color']['ActorMPColor']['call'](this,_0xbf4422);},ColorManager[_0x479088(0x1bf)]=function(_0x2f2161){const _0x6f97f5=_0x479088;return VisuMZ[_0x6f97f5(0x676)]['Settings'][_0x6f97f5(0x6c9)][_0x6f97f5(0x58f)][_0x6f97f5(0x4c7)](this,_0x2f2161);},ColorManager[_0x479088(0x230)]=function(_0x1c8449){const _0x5c2bb5=_0x479088;return VisuMZ[_0x5c2bb5(0x676)]['Settings'][_0x5c2bb5(0x6c9)][_0x5c2bb5(0x7a9)][_0x5c2bb5(0x4c7)](this,_0x1c8449);},ColorManager[_0x479088(0x414)]=function(_0x499a67){const _0x4fb43e=_0x479088;return VisuMZ[_0x4fb43e(0x676)][_0x4fb43e(0x502)][_0x4fb43e(0x6c9)][_0x4fb43e(0x33e)][_0x4fb43e(0x4c7)](this,_0x499a67);},ColorManager['outlineColor']=function(){const _0x21f642=_0x479088;return VisuMZ[_0x21f642(0x676)][_0x21f642(0x502)]['Color'][_0x21f642(0x49f)];},ColorManager[_0x479088(0x47e)]=function(){const _0x19a281=_0x479088;return VisuMZ[_0x19a281(0x676)][_0x19a281(0x502)][_0x19a281(0x6c9)]['DimColor1'];},ColorManager[_0x479088(0x257)]=function(){const _0x3b51c0=_0x479088;return VisuMZ[_0x3b51c0(0x676)][_0x3b51c0(0x502)]['Color'][_0x3b51c0(0x4d2)];},ColorManager[_0x479088(0x64c)]=function(){const _0x4df5eb=_0x479088;return VisuMZ[_0x4df5eb(0x676)][_0x4df5eb(0x502)][_0x4df5eb(0x6c9)][_0x4df5eb(0x1c6)];},ColorManager['itemBackColor2']=function(){const _0x19175a=_0x479088;return VisuMZ[_0x19175a(0x676)][_0x19175a(0x502)][_0x19175a(0x6c9)]['ItemBackColor2'];},SceneManager[_0x479088(0x5ec)]=[],VisuMZ['CoreEngine'][_0x479088(0x4de)]=SceneManager[_0x479088(0x65b)],SceneManager[_0x479088(0x65b)]=function(){const _0x1e9da5=_0x479088;VisuMZ[_0x1e9da5(0x676)][_0x1e9da5(0x4de)][_0x1e9da5(0x4c7)](this),this[_0x1e9da5(0x1cc)]();},VisuMZ[_0x479088(0x676)][_0x479088(0x54b)]=SceneManager['onKeyDown'],SceneManager['onKeyDown']=function(_0x1fa5cc){const _0x400b10=_0x479088;if($gameTemp)this[_0x400b10(0x719)](_0x1fa5cc);VisuMZ[_0x400b10(0x676)][_0x400b10(0x54b)][_0x400b10(0x4c7)](this,_0x1fa5cc);},SceneManager[_0x479088(0x719)]=function(_0x4ede3b){const _0x19cca0=_0x479088;if(!_0x4ede3b['ctrlKey']&&!_0x4ede3b['altKey'])switch(_0x4ede3b[_0x19cca0(0x77b)]){case 0x75:this[_0x19cca0(0x767)]();break;case 0x76:this[_0x19cca0(0x335)]();break;}},SceneManager['playTestF6']=function(){const _0x265cc8=_0x479088;if($gameTemp[_0x265cc8(0x2b6)]()&&VisuMZ[_0x265cc8(0x676)][_0x265cc8(0x502)][_0x265cc8(0x6da)][_0x265cc8(0x587)]){if(ConfigManager[_0x265cc8(0x368)]!==0x0){if(_0x265cc8(0x764)===_0x265cc8(0x1c9)){function _0x4d5a26(){const _0xe8b354=_0x265cc8;this['_data']['OnLoadJS'][_0xe8b354(0x4c7)](this),this[_0xe8b354(0x38d)][_0xe8b354(0x371)][_0xe8b354(0x4c7)](this),this['setClickHandler'](this[_0xe8b354(0x38d)][_0xe8b354(0x162)][_0xe8b354(0x34b)](this));}}else ConfigManager[_0x265cc8(0x3ad)]=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x265cc8(0x368)]=0x0;}else{if(_0x265cc8(0x6b5)!==_0x265cc8(0x54e))ConfigManager[_0x265cc8(0x3ad)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x265cc8(0x53b)]=0x64,ConfigManager[_0x265cc8(0x368)]=0x64;else{function _0x3a57ae(){const _0x430a77=_0x265cc8;this[_0x430a77(0x65b)](...arguments);}}}ConfigManager['save']();if(this[_0x265cc8(0x4b7)][_0x265cc8(0x340)]===Scene_Options){if(this['_scene'][_0x265cc8(0x44c)])this[_0x265cc8(0x4b7)][_0x265cc8(0x44c)]['refresh']();if(this[_0x265cc8(0x4b7)][_0x265cc8(0x43b)])this[_0x265cc8(0x4b7)]['_listWindow'][_0x265cc8(0x5b5)]();}}},SceneManager['playTestF7']=function(){const _0x4fef77=_0x479088;if($gameTemp[_0x4fef77(0x2b6)]()&&VisuMZ[_0x4fef77(0x676)][_0x4fef77(0x502)][_0x4fef77(0x6da)][_0x4fef77(0x770)]){if('jcYEV'!==_0x4fef77(0x524))$gameTemp['_playTestFastMode']=!$gameTemp[_0x4fef77(0x2ff)];else{function _0x27c49c(){return _0x3e88a1;}}}},SceneManager[_0x479088(0x1cc)]=function(){const _0xa3ac0=_0x479088;this['_sideButtonLayout']=![],this[_0xa3ac0(0x45a)]=!VisuMZ[_0xa3ac0(0x676)][_0xa3ac0(0x502)]['UI'][_0xa3ac0(0x268)];},SceneManager[_0x479088(0x432)]=function(_0x2a9691){const _0x53c9d3=_0x479088;VisuMZ[_0x53c9d3(0x676)][_0x53c9d3(0x502)]['UI']['SideButtons']&&(this[_0x53c9d3(0x64d)]=_0x2a9691);},SceneManager[_0x479088(0x372)]=function(){const _0x2b3b73=_0x479088;return this[_0x2b3b73(0x64d)];},SceneManager[_0x479088(0x34c)]=function(){const _0x1af9a2=_0x479088;return this[_0x1af9a2(0x45a)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x5a9e09=_0x479088;return this[_0x5a9e09(0x34c)]()||this[_0x5a9e09(0x372)]();},VisuMZ['CoreEngine'][_0x479088(0x35d)]=SceneManager[_0x479088(0x61d)],SceneManager[_0x479088(0x61d)]=function(){const _0x2f2308=_0x479088;if(VisuMZ['CoreEngine'][_0x2f2308(0x502)][_0x2f2308(0x6da)]['RequireFocus']){if(_0x2f2308(0x75f)===_0x2f2308(0x75f))return VisuMZ[_0x2f2308(0x676)][_0x2f2308(0x35d)][_0x2f2308(0x4c7)](this);else{function _0x5f1c27(){var _0x3fc315=_0x1a94ba(_0x2fc660['$1'])/0x64;_0x4c5c91+=_0x3fc315;}}}else{if(_0x2f2308(0x526)!==_0x2f2308(0x526)){function _0x14b79e(){const _0x302dcf=_0x2f2308;this[_0x302dcf(0x221)]=_0x34eba7['loadPicture'](this['_data'][_0x302dcf(0x5cc)]),this['bitmap'][_0x302dcf(0x5c0)](this[_0x302dcf(0x178)][_0x302dcf(0x34b)](this));}}else return!![];}},SceneManager[_0x479088(0x1d8)]=function(_0xa92add){const _0x12775d=_0x479088;if(_0xa92add instanceof Error)this[_0x12775d(0x468)](_0xa92add);else{if(_0xa92add instanceof Array&&_0xa92add[0x0]===_0x12775d(0x216)){if(_0x12775d(0x156)!==_0x12775d(0x71c))this[_0x12775d(0x1ff)](_0xa92add);else{function _0x402039(){(_0x585679<_0x1d7bf-_0xabf8a8||_0x2d2d95&&_0x217e99===0x1)&&this['smoothSelect']((_0x2c6858+_0x53a488)%_0x4c5217);}}}else{if(_0x12775d(0x3f3)!=='TJKNK'){function _0x1ee1b2(){const _0x4070f4=_0x12775d;return _0x4070f4(0x46a);}}else this['catchUnknownError'](_0xa92add);}}this[_0x12775d(0x346)]();},VisuMZ[_0x479088(0x676)][_0x479088(0x59d)]=BattleManager[_0x479088(0x6a9)],BattleManager[_0x479088(0x6a9)]=function(){const _0x118153=_0x479088;if(VisuMZ[_0x118153(0x676)][_0x118153(0x502)]['QoL'][_0x118153(0x2e4)])this['processAlwaysEscape']();else{if(_0x118153(0x4ef)===_0x118153(0x452)){function _0x549d6b(){const _0x491939=_0x118153;_0x7ac29['x']=_0x4a92c6[_0x491939(0x786)](_0x5868af['x']),_0x18dd7c['y']=_0x141164[_0x491939(0x786)](_0x54ca12['y']),_0x542c26['width']=_0x1b5033[_0x491939(0x786)](_0x52485f[_0x491939(0x7bc)]),_0x143cd9[_0x491939(0x5de)]=_0x320f38[_0x491939(0x786)](_0x27be3f[_0x491939(0x5de)]),this[_0x491939(0x3b5)](),_0x488f59[_0x491939(0x676)]['Window_Base_initialize'][_0x491939(0x4c7)](this,_0x2f35ab),this[_0x491939(0x700)]();}}else return VisuMZ[_0x118153(0x676)]['BattleManager_processEscape']['call'](this);}},BattleManager[_0x479088(0x1f9)]=function(){const _0x2540d6=_0x479088;return $gameParty[_0x2540d6(0x147)](),SoundManager['playEscape'](),this[_0x2540d6(0x16d)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x416d23=_0x479088;return $gameSystem[_0x416d23(0x660)]()===0x1;},VisuMZ['CoreEngine'][_0x479088(0x6ce)]=Game_Temp['prototype'][_0x479088(0x65b)],Game_Temp[_0x479088(0x6e6)]['initialize']=function(){const _0xd42252=_0x479088;VisuMZ[_0xd42252(0x676)][_0xd42252(0x6ce)]['call'](this),this['forceOutOfPlaytest'](),this[_0xd42252(0x15a)]();},Game_Temp[_0x479088(0x6e6)][_0x479088(0x231)]=function(){const _0x2847ad=_0x479088;if(VisuMZ[_0x2847ad(0x676)]['Settings'][_0x2847ad(0x6da)][_0x2847ad(0x2a2)]){if('DOyen'!==_0x2847ad(0x326))this[_0x2847ad(0x7ae)]=![];else{function _0x20b61d(){const _0x184ba4=_0x2847ad;let _0x1e3d7e=_0x56ac92;if(_0x1e3d7e[0x0]==='0')return _0x1e3d7e;if(_0x1e3d7e[_0x1e3d7e[_0x184ba4(0x774)]-0x1]==='.')return _0x15c117(_0x1e3d7e)[_0x184ba4(0x555)](_0x3b0601,_0xe741a5)+'.';else return _0x1e3d7e[_0x1e3d7e['length']-0x1]===','?_0xe0048a(_0x1e3d7e)[_0x184ba4(0x555)](_0x4bab9a,_0x414a22)+',':_0x3e0e16(_0x1e3d7e)[_0x184ba4(0x555)](_0x76984a,_0x13e52b);}}}},Game_Temp[_0x479088(0x6e6)][_0x479088(0x15a)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x479088(0x6e6)][_0x479088(0x1a6)]=function(_0x2469fc,_0xd516e6,_0x47c1ce,_0x1b12ba){const _0x23847f=_0x479088;if(!this[_0x23847f(0x2fa)]())return;_0x47c1ce=_0x47c1ce||![],_0x1b12ba=_0x1b12ba||![];if($dataAnimations[_0xd516e6]){const _0x169375={'targets':_0x2469fc,'animationId':_0xd516e6,'mirror':_0x47c1ce,'mute':_0x1b12ba};this[_0x23847f(0x218)][_0x23847f(0x4d1)](_0x169375);for(const _0x1e8ff8 of _0x2469fc){if(_0x1e8ff8[_0x23847f(0x5e5)]){if(_0x23847f(0x3d7)===_0x23847f(0x471)){function _0x272954(){const _0x20349e=_0x23847f;this[_0x20349e(0x5af)][_0x20349e(0x516)](_0x377276[_0x20349e(0x3e8)][_0x20349e(0x399)]);}}else _0x1e8ff8[_0x23847f(0x5e5)]();}}}},Game_Temp[_0x479088(0x6e6)][_0x479088(0x2fa)]=function(){return!![];},Game_Temp['prototype'][_0x479088(0x222)]=function(){const _0x583fef=_0x479088;return this[_0x583fef(0x218)][_0x583fef(0x1fb)]();},Game_Temp[_0x479088(0x6e6)][_0x479088(0x507)]=function(_0x173a09){this['_lastPluginCommandInterpreter']=_0x173a09;},Game_Temp[_0x479088(0x6e6)]['getLastPluginCommandInterpreter']=function(){const _0x5d1023=_0x479088;return this[_0x5d1023(0x7e4)];},Game_Temp[_0x479088(0x6e6)][_0x479088(0x30c)]=function(){this['_forcedTroopView']=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x479088(0x6e6)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x49efd7){const _0x1b902a=_0x479088;if($gameMap&&$dataMap&&$dataMap[_0x1b902a(0x76a)]){if(_0x1b902a(0x408)!=='hsVSY'){function _0x542037(){const _0x7159f5=_0x1b902a;this[_0x7159f5(0x2da)]();}}else this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x1b902a(0x76a)]);}const _0x476d61=$dataTroops[_0x49efd7];_0x476d61&&this[_0x1b902a(0x27a)](_0x476d61[_0x1b902a(0x735)]);},Game_Temp[_0x479088(0x6e6)][_0x479088(0x27a)]=function(_0x475a74){const _0x23affa=_0x479088;if(!_0x475a74)return;if(_0x475a74[_0x23affa(0x7cd)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x23affa(0x772)]='FV';else{if(_0x475a74[_0x23affa(0x7cd)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x23affa(0x5b7)===_0x23affa(0x28a)){function _0x35ec6d(){const _0x3f46e5=_0x23affa;this[_0x3f46e5(0x20f)]();}}else this[_0x23affa(0x772)]='SV';}else{if(_0x475a74['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x23affa(0x634)!=='IiQmT'){const _0x448699=String(RegExp['$1']);if(_0x448699['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if('Dovlh'!==_0x23affa(0x508))this[_0x23affa(0x772)]='FV';else{function _0x45f3d5(){return 0x0;}}}else{if(_0x448699[_0x23affa(0x7cd)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if('qNcKA'===_0x23affa(0x706)){function _0x40bca3(){const _0x339489=_0x23affa;this[_0x339489(0x686)]+=_0x34e077;}}else this[_0x23affa(0x772)]='SV';}}}else{function _0x447103(){const _0x183998=_0x23affa,_0x47df83=_0x43dd1b[_0x183998(0x6e6)][_0x183998(0x3c2)][_0x183998(0x4c7)](this);for(const _0x1c2142 of this['equips']()){_0x1c2142&&_0x47df83[_0x183998(0x4d1)](_0x1c2142);}return _0x47df83[_0x183998(0x4d1)](this[_0x183998(0x577)](),this['actor']()),_0x47df83;}}}}}if(_0x475a74['match'](/<(?:DTB)>/i))this[_0x23affa(0x361)]=0x0;else{if(_0x475a74['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x23affa(0x361)]=0x1;else{if(_0x475a74['match'](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x23affa(0x553)==='BldcG')this['_forcedBattleSys']=0x2;else{function _0x32d0bc(){const _0x3d16a7=_0x23affa,_0x442e1d=_0x3d16a7(0x324);this[_0x3d16a7(0x53e)]=this['_colorCache']||{};if(this[_0x3d16a7(0x53e)][_0x442e1d])return this[_0x3d16a7(0x53e)][_0x442e1d];const _0x48b588=_0xde19d8['CoreEngine'][_0x3d16a7(0x502)][_0x3d16a7(0x6c9)]['ColorCrisis'];return this[_0x3d16a7(0x3d9)](_0x442e1d,_0x48b588);}}}else{if(_0x475a74[_0x23affa(0x7cd)](/<(?:CTB)>/i))Imported[_0x23affa(0x727)]&&(this['_forcedBattleSys']=_0x23affa(0x46a));else{if(_0x475a74[_0x23affa(0x7cd)](/<(?:STB)>/i)){if(Imported[_0x23affa(0x283)]){if(_0x23affa(0x4ff)!==_0x23affa(0x510))this['_forcedBattleSys']=_0x23affa(0x31e);else{function _0x22f47a(){const _0x1854e7=_0x23affa,_0x56c2e7=_0x385d08['displayX']()*_0x34cf6e[_0x1854e7(0x5f5)]();return this['_x']-_0x56c2e7;}}}}else{if(_0x475a74['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('gkpbo'==='oZLwN'){function _0x340fc9(){const _0x5a7953=_0x23affa;if(_0x2d80fd[_0x5a7953(0x2b6)]())_0x32998d[_0x5a7953(0x652)](_0x283426);}}else{const _0x51a7bf=String(RegExp['$1']);if(_0x51a7bf['match'](/DTB/i))this[_0x23affa(0x361)]=0x0;else{if(_0x51a7bf[_0x23affa(0x7cd)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x23affa(0x361)]=0x1;else{if(_0x51a7bf[_0x23affa(0x7cd)](/(?:TPB|ATB)[ ]WAIT/i)){if(_0x23affa(0x77c)==='bqqsL'){function _0x303fd0(){_0x396f74=!_0x47af41;}}else this[_0x23affa(0x361)]=0x2;}else{if(_0x51a7bf[_0x23affa(0x7cd)](/CTB/i)){if('KOYbg'!==_0x23affa(0x31f)){if(Imported[_0x23affa(0x727)]){if(_0x23affa(0x6d2)!==_0x23affa(0x23e))this[_0x23affa(0x361)]=_0x23affa(0x46a);else{function _0x2b4fee(){const _0x5cff22=_0x23affa;if(this[_0x5cff22(0x4f5)]())return 0x1;const _0x1380f=this['nextLevelExp']()-this[_0x5cff22(0x5ff)](),_0x391387=this[_0x5cff22(0x204)]()-this[_0x5cff22(0x5ff)]();return(_0x391387/_0x1380f)[_0x5cff22(0x520)](0x0,0x1);}}}}else{function _0x15ccae(){return![];}}}else{if(_0x51a7bf[_0x23affa(0x7cd)](/STB/i)){if(_0x23affa(0x69a)===_0x23affa(0x717)){function _0x3e601e(){return _0x616472['getBattleSystem']()>=0x1;}}else Imported[_0x23affa(0x283)]&&(this[_0x23affa(0x361)]='STB');}}}}}}}}}}}}},VisuMZ['CoreEngine'][_0x479088(0x458)]=Game_System[_0x479088(0x6e6)][_0x479088(0x65b)],Game_System[_0x479088(0x6e6)]['initialize']=function(){const _0x35ea00=_0x479088;VisuMZ['CoreEngine'][_0x35ea00(0x458)]['call'](this),this[_0x35ea00(0x209)]();},Game_System[_0x479088(0x6e6)]['initCoreEngine']=function(){const _0xc820f=_0x479088;this[_0xc820f(0x380)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0xc820f(0x642)](),'FontSize':$dataSystem[_0xc820f(0x322)][_0xc820f(0x195)],'Padding':0xc};},Game_System[_0x479088(0x6e6)][_0x479088(0x57e)]=function(){const _0x3f3494=_0x479088;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x3f3494(0x772)]==='FV'){if(_0x3f3494(0x424)!=='SUgSo')return![];else{function _0x4a17ea(){const _0x236956=_0x3f3494;_0x1bdbac[_0x236956(0x34c)]()||this[_0x236956(0x15c)]?this[_0x236956(0x18d)]():_0x24193a[_0x236956(0x676)][_0x236956(0x2b2)]['call'](this);}}}}if(this[_0x3f3494(0x380)]===undefined)this[_0x3f3494(0x209)]();if(this['_CoreEngineSettings'][_0x3f3494(0x289)]===undefined)this[_0x3f3494(0x209)]();return this[_0x3f3494(0x380)][_0x3f3494(0x289)];},Game_System[_0x479088(0x6e6)][_0x479088(0x6b3)]=function(_0x1de33f){const _0x5556c7=_0x479088;if(this[_0x5556c7(0x380)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x5556c7(0x289)]===undefined)this['initCoreEngine']();this[_0x5556c7(0x380)][_0x5556c7(0x289)]=_0x1de33f;},Game_System['prototype'][_0x479088(0x511)]=function(){const _0x4b390f=_0x479088;if(this[_0x4b390f(0x380)]===undefined)this[_0x4b390f(0x209)]();this['_CoreEngineSettings'][_0x4b390f(0x7fc)]=this['initialBattleSystem']();},Game_System[_0x479088(0x6e6)]['initialBattleSystem']=function(){const _0x493e8f=_0x479088,_0xef756f=(VisuMZ['CoreEngine'][_0x493e8f(0x502)]['BattleSystem']||'DATABASE')[_0x493e8f(0x2b9)]()[_0x493e8f(0x6e2)]();return VisuMZ['CoreEngine']['CreateBattleSystemID'](_0xef756f);},Game_System[_0x479088(0x6e6)][_0x479088(0x660)]=function(){const _0x59a98d=_0x479088;if($gameTemp[_0x59a98d(0x361)]!==undefined)return $gameTemp[_0x59a98d(0x361)];if(this['_CoreEngineSettings']===undefined)this[_0x59a98d(0x209)]();if(this[_0x59a98d(0x380)][_0x59a98d(0x7fc)]===undefined)this['resetBattleSystem']();return this[_0x59a98d(0x380)][_0x59a98d(0x7fc)];},Game_System[_0x479088(0x6e6)][_0x479088(0x3bb)]=function(_0x5b21f9){const _0x31c67e=_0x479088;if(this['_CoreEngineSettings']===undefined)this[_0x31c67e(0x209)]();if(this[_0x31c67e(0x380)][_0x31c67e(0x7fc)]===undefined)this[_0x31c67e(0x511)]();this['_CoreEngineSettings']['BattleSystem']=_0x5b21f9;},Game_System['prototype'][_0x479088(0x20a)]=function(){const _0x7f9fb5=_0x479088;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['FontSize']===undefined)this[_0x7f9fb5(0x209)]();return this['_CoreEngineSettings'][_0x7f9fb5(0x644)];},Game_System[_0x479088(0x6e6)]['setMainFontSize']=function(_0x27eedb){const _0x30ea62=_0x479088;if(this['_CoreEngineSettings']===undefined)this[_0x30ea62(0x209)]();if(this[_0x30ea62(0x380)][_0x30ea62(0x44f)]===undefined)this[_0x30ea62(0x209)]();this['_CoreEngineSettings'][_0x30ea62(0x644)]=_0x27eedb;},Game_System[_0x479088(0x6e6)][_0x479088(0x287)]=function(){const _0x2ce5dd=_0x479088;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['Padding']===undefined)this[_0x2ce5dd(0x209)]();return this[_0x2ce5dd(0x380)][_0x2ce5dd(0x757)];},Game_System['prototype'][_0x479088(0x6e7)]=function(_0x2ce23c){const _0x4a3947=_0x479088;if(this['_CoreEngineSettings']===undefined)this[_0x4a3947(0x209)]();if(this[_0x4a3947(0x380)][_0x4a3947(0x44f)]===undefined)this['initCoreEngine']();this[_0x4a3947(0x380)]['Padding']=_0x2ce23c;},VisuMZ[_0x479088(0x676)]['Game_Screen_initialize']=Game_Screen['prototype'][_0x479088(0x65b)],Game_Screen[_0x479088(0x6e6)][_0x479088(0x65b)]=function(){const _0x3e7512=_0x479088;VisuMZ['CoreEngine']['Game_Screen_initialize']['call'](this),this[_0x3e7512(0x4c6)]();},Game_Screen[_0x479088(0x6e6)][_0x479088(0x4c6)]=function(){const _0x11ebab=_0x479088,_0x19e6ad=VisuMZ[_0x11ebab(0x676)][_0x11ebab(0x502)][_0x11ebab(0x53d)];this[_0x11ebab(0x648)]=_0x19e6ad?.[_0x11ebab(0x7fd)]||'random';},Game_Screen[_0x479088(0x6e6)][_0x479088(0x259)]=function(){const _0x524e27=_0x479088;if(this['_coreEngineShakeStyle']===undefined)this[_0x524e27(0x4c6)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x479088(0x6e6)]['setCoreEngineScreenShakeStyle']=function(_0xd7d3ef){const _0x17bf63=_0x479088;if(this[_0x17bf63(0x648)]===undefined)this[_0x17bf63(0x4c6)]();this[_0x17bf63(0x648)]=_0xd7d3ef[_0x17bf63(0x392)]()['trim']();},Game_Picture['prototype']['isMapScrollLinked']=function(){const _0x58449c=_0x479088;if($gameParty[_0x58449c(0x612)]())return![];return this[_0x58449c(0x735)]()&&this['name']()[_0x58449c(0x6a2)](0x0)==='!';},VisuMZ['CoreEngine'][_0x479088(0x77f)]=Game_Picture['prototype']['x'],Game_Picture[_0x479088(0x6e6)]['x']=function(){const _0x2b8b1e=_0x479088;if(this['isMapScrollLinked']()){if(_0x2b8b1e(0x2c0)==='GnclP'){function _0x262de3(){const _0x232181=_0x2b8b1e;_0x154dd6[_0x232181(0x70d)]=_0x598489['SCALE_MODES'][_0x232181(0x725)];}}else return this['xScrollLinkedOffset']();}else return VisuMZ[_0x2b8b1e(0x676)][_0x2b8b1e(0x77f)][_0x2b8b1e(0x4c7)](this);},Game_Picture[_0x479088(0x6e6)]['xScrollLinkedOffset']=function(){const _0x182cff=_0x479088,_0x414b05=$gameMap['displayX']()*$gameMap[_0x182cff(0x5f5)]();return this['_x']-_0x414b05;},VisuMZ[_0x479088(0x676)][_0x479088(0x5ed)]=Game_Picture[_0x479088(0x6e6)]['y'],Game_Picture[_0x479088(0x6e6)]['y']=function(){const _0x4c438f=_0x479088;if(this['isMapScrollLinked']())return this[_0x4c438f(0x255)]();else{if(_0x4c438f(0x2e3)!=='VXhCA')return VisuMZ[_0x4c438f(0x676)][_0x4c438f(0x5ed)][_0x4c438f(0x4c7)](this);else{function _0x4b00de(){const _0x4d90e2=_0x4c438f;if(!_0x2a2bc4['CoreEngine'][_0x4d90e2(0x502)]['QoL']['AntiZoomPictures'])return;if(this['_cacheScaleX']===this[_0x4d90e2(0x1ce)]['x']&&this[_0x4d90e2(0x5bb)]===this[_0x4d90e2(0x1ce)]['y'])return;this[_0x4d90e2(0x1ce)]['x']!==0x0&&(this[_0x4d90e2(0x1d7)][_0x4d90e2(0x1ce)]['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x4d90e2(0x1ce)]['x'])),this[_0x4d90e2(0x1ce)]['y']!==0x0&&(this[_0x4d90e2(0x1d7)][_0x4d90e2(0x1ce)]['y']=0x1/this[_0x4d90e2(0x1ce)]['y'],this[_0x4d90e2(0x1d7)]['y']=-(this['y']/this['scale']['y'])),this[_0x4d90e2(0x423)]=this['scale']['x'],this[_0x4d90e2(0x5bb)]=this['scale']['y'];}}}},Game_Picture[_0x479088(0x6e6)][_0x479088(0x255)]=function(){const _0xd09fb5=_0x479088,_0x21f53b=$gameMap[_0xd09fb5(0x535)]()*$gameMap['tileHeight']();return this['_y']-_0x21f53b;},Game_Picture[_0x479088(0x6e6)][_0x479088(0x365)]=function(_0x7190b1){const _0x3ae483=_0x479088;this[_0x3ae483(0x202)]=_0x7190b1;},VisuMZ[_0x479088(0x676)][_0x479088(0x2ec)]=Game_Picture['prototype'][_0x479088(0x1ab)],Game_Picture[_0x479088(0x6e6)][_0x479088(0x1ab)]=function(_0x21cf35){const _0x52f061=_0x479088;this[_0x52f061(0x202)]=this[_0x52f061(0x202)]||0x0;if([0x0,0x1,0x2,0x3]['includes'](this[_0x52f061(0x202)])){if(_0x52f061(0x30a)===_0x52f061(0x75a)){function _0xeb8201(){const _0x41bec4=_0x52f061,_0x205196=_0x17c317['y']+(this['lineHeight']()-_0x27e30f[_0x41bec4(0x24d)])/0x2;this[_0x41bec4(0x17a)](_0x40bc77,_0x4909cd['x'],_0x205196);const _0x202ed2=_0x2e1732[_0x41bec4(0x37b)]+0x4;_0x429049['x']+=_0x202ed2,_0x18318c[_0x41bec4(0x7bc)]-=_0x202ed2;}}else return VisuMZ[_0x52f061(0x676)][_0x52f061(0x2ec)][_0x52f061(0x4c7)](this,_0x21cf35);}else return VisuMZ[_0x52f061(0x6d1)](_0x21cf35,this[_0x52f061(0x202)]);},VisuMZ[_0x479088(0x676)]['Game_Action_itemHit']=Game_Action['prototype'][_0x479088(0x2fc)],Game_Action['prototype'][_0x479088(0x2fc)]=function(_0x45a28f){const _0x366057=_0x479088;return VisuMZ[_0x366057(0x676)][_0x366057(0x502)][_0x366057(0x6da)]['ImprovedAccuracySystem']?this[_0x366057(0x7e8)](_0x45a28f):VisuMZ[_0x366057(0x676)][_0x366057(0x2a3)][_0x366057(0x4c7)](this,_0x45a28f);},Game_Action['prototype']['itemHitImprovedAccuracy']=function(_0x187404){const _0x37ea6b=_0x479088,_0x2403d2=this['itemSuccessRate'](_0x187404),_0x5c12bb=this[_0x37ea6b(0x40d)](_0x187404),_0x44f0cb=this[_0x37ea6b(0x77d)](_0x187404);return _0x2403d2*(_0x5c12bb-_0x44f0cb);},VisuMZ[_0x479088(0x676)][_0x479088(0x58e)]=Game_Action[_0x479088(0x6e6)][_0x479088(0x250)],Game_Action[_0x479088(0x6e6)][_0x479088(0x250)]=function(_0x1100b4){const _0xbb44ae=_0x479088;if(VisuMZ[_0xbb44ae(0x676)]['Settings'][_0xbb44ae(0x6da)]['ImprovedAccuracySystem'])return 0x0;else{if(_0xbb44ae(0x41d)==='LkJTD'){function _0x13d245(){const _0x289488=_0xbb44ae;this[_0x289488(0x7b8)](_0x12d931);}}else return VisuMZ[_0xbb44ae(0x676)][_0xbb44ae(0x58e)][_0xbb44ae(0x4c7)](this,_0x1100b4);}},Game_Action[_0x479088(0x6e6)]['itemSuccessRate']=function(_0x2d570f){const _0x54f29d=_0x479088;return this[_0x54f29d(0x793)]()['successRate']*0.01;},Game_Action['prototype']['subjectHitRate']=function(_0x312f95){const _0x4aaf8a=_0x479088;if(VisuMZ[_0x4aaf8a(0x676)][_0x4aaf8a(0x502)]['QoL']['AccuracyBoost']&&this[_0x4aaf8a(0x56a)]())return 0x1;return this[_0x4aaf8a(0x3c7)]()?VisuMZ[_0x4aaf8a(0x676)][_0x4aaf8a(0x502)][_0x4aaf8a(0x6da)][_0x4aaf8a(0x7d4)]&&this[_0x4aaf8a(0x6b6)]()[_0x4aaf8a(0x776)]()?this[_0x4aaf8a(0x6b6)]()[_0x4aaf8a(0x36a)]+0.05:this[_0x4aaf8a(0x6b6)]()[_0x4aaf8a(0x36a)]:0x1;},Game_Action['prototype']['targetEvaRate']=function(_0x3c659c){const _0x33d3a4=_0x479088;if(this['subject']()['isActor']()===_0x3c659c[_0x33d3a4(0x776)]())return 0x0;if(this[_0x33d3a4(0x3c7)]()){if(VisuMZ['CoreEngine']['Settings'][_0x33d3a4(0x6da)][_0x33d3a4(0x7d4)]&&_0x3c659c[_0x33d3a4(0x149)]())return _0x3c659c[_0x33d3a4(0x56f)]-0.05;else{if(_0x33d3a4(0x428)===_0x33d3a4(0x256)){function _0xcb2e25(){const _0x36486c=_0x33d3a4,_0x5dcd09=_0x565036['width']-_0x4dc055[_0x36486c(0x45e)]-_0x288589[_0x36486c(0x676)][_0x36486c(0x502)]['UI'][_0x36486c(0x74e)]*0x2,_0x1dfc5b=_0x595dba[_0x36486c(0x6e6)][_0x36486c(0x2f2)][_0x36486c(0x4c7)](this)*0x4;if(_0x5dcd09>=_0x1dfc5b)_0x44f1c5[_0x36486c(0x432)](!![]);}}else return _0x3c659c[_0x33d3a4(0x56f)];}}else return this[_0x33d3a4(0x2fe)]()?_0x3c659c[_0x33d3a4(0x51f)]:0x0;},VisuMZ[_0x479088(0x676)][_0x479088(0x619)]=Game_Action['prototype'][_0x479088(0x37e)],Game_Action['prototype'][_0x479088(0x37e)]=function(_0x3a3a10){const _0x22656e=_0x479088;VisuMZ[_0x22656e(0x676)][_0x22656e(0x619)][_0x22656e(0x4c7)](this,_0x3a3a10);if(VisuMZ[_0x22656e(0x676)][_0x22656e(0x502)]['QoL'][_0x22656e(0x3dd)])return;const _0x5beed2=_0x3a3a10[_0x22656e(0x589)]();_0x5beed2[_0x22656e(0x515)]&&(0x1-this[_0x22656e(0x250)](_0x3a3a10)>this['itemHit'](_0x3a3a10)&&(_0x5beed2[_0x22656e(0x515)]=![],_0x5beed2[_0x22656e(0x406)]=!![]));},VisuMZ[_0x479088(0x676)][_0x479088(0x6a5)]=Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x4a2)],Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x4a2)]=function(){const _0x81c2e8=_0x479088;this[_0x81c2e8(0x5bc)]={},VisuMZ[_0x81c2e8(0x676)][_0x81c2e8(0x6a5)][_0x81c2e8(0x4c7)](this);},VisuMZ[_0x479088(0x676)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x5b5)],Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x5b5)]=function(){const _0x7cca69=_0x479088;this[_0x7cca69(0x5bc)]={},VisuMZ[_0x7cca69(0x676)][_0x7cca69(0x62d)]['call'](this);},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x5e4)]=function(_0x460098){const _0x2b3092=_0x479088;return this['_cache']=this[_0x2b3092(0x5bc)]||{},this[_0x2b3092(0x5bc)][_0x460098]!==undefined;},Game_BattlerBase['prototype'][_0x479088(0x3f5)]=function(_0x3671a6){const _0x51126d=_0x479088,_0x532b7e=(_0x249c4b,_0x8272cd)=>{const _0x10a57a=_0x1315;if(!_0x8272cd)return _0x249c4b;if(_0x8272cd['note'][_0x10a57a(0x7cd)](VisuMZ[_0x10a57a(0x676)]['RegExp'][_0x10a57a(0x3f5)][_0x3671a6])){var _0x4bb43e=Number(RegExp['$1']);_0x249c4b+=_0x4bb43e;}if(_0x8272cd['note'][_0x10a57a(0x7cd)](VisuMZ[_0x10a57a(0x676)][_0x10a57a(0x21a)]['paramPlusJS'][_0x3671a6])){var _0x57b845=String(RegExp['$1']);try{if(_0x10a57a(0x7fb)!=='UZaoQ'){function _0x411b97(){const _0x216792=_0x10a57a,_0x3a7f4c=_0x3bb4a5(this[_0x216792(0x340)][_0x216792(0x735)]),_0x3a7db4=this[_0x216792(0x208)](_0x3a7f4c);_0x3a7db4&&(_0x3a7db4[_0x216792(0x2f8)]!==''||_0x3a7db4[_0x216792(0x41e)]!=='')&&(this[_0x216792(0x23c)]=new _0x59436d(_0x3e7a71['loadTitle1'](_0x3a7db4['BgFilename1'])),this[_0x216792(0x26d)]=new _0x2174c1(_0x1ca4f6[_0x216792(0x7b2)](_0x3a7db4[_0x216792(0x41e)])),this[_0x216792(0x1e4)](this[_0x216792(0x23c)]),this[_0x216792(0x1e4)](this[_0x216792(0x26d)]),this[_0x216792(0x23c)][_0x216792(0x221)]['addLoadListener'](this['adjustSprite'][_0x216792(0x34b)](this,this[_0x216792(0x23c)])),this[_0x216792(0x26d)][_0x216792(0x221)][_0x216792(0x5c0)](this[_0x216792(0x7a3)][_0x216792(0x34b)](this,this[_0x216792(0x26d)])));}}else _0x249c4b+=eval(_0x57b845);}catch(_0x264169){if('DRMLM'===_0x10a57a(0x2f3)){if($gameTemp[_0x10a57a(0x2b6)]())console[_0x10a57a(0x652)](_0x264169);}else{function _0x41d643(){const _0x47028e=_0x10a57a;return _0x585e32[_0x47028e(0x421)](_0x47028e(0x33c));}}}}return _0x249c4b;};return this['traitObjects']()[_0x51126d(0x69e)](_0x532b7e,this[_0x51126d(0x3e1)][_0x3671a6]);},Game_BattlerBase['prototype'][_0x479088(0x71a)]=function(_0x2e37c5){const _0x56757a=_0x479088;var _0x12dd1f=_0x56757a(0x39e)+(this[_0x56757a(0x776)]()?_0x56757a(0x3f6):'Enemy')+_0x56757a(0x388)+_0x2e37c5;if(this[_0x56757a(0x5e4)](_0x12dd1f))return this[_0x56757a(0x5bc)][_0x12dd1f];this['_cache'][_0x12dd1f]=eval(VisuMZ['CoreEngine']['Settings']['Param'][_0x12dd1f]);const _0x2574f1=(_0x3fd109,_0x5d4fda)=>{const _0x491844=_0x56757a;if(!_0x5d4fda)return _0x3fd109;if(_0x5d4fda[_0x491844(0x76a)][_0x491844(0x7cd)](VisuMZ['CoreEngine'][_0x491844(0x21a)][_0x491844(0x71a)][_0x2e37c5])){var _0x155288=Number(RegExp['$1']);if(_0x155288===0x0)_0x155288=Number[_0x491844(0x1a8)];_0x3fd109=Math[_0x491844(0x1ad)](_0x3fd109,_0x155288);}if(_0x5d4fda[_0x491844(0x76a)][_0x491844(0x7cd)](VisuMZ[_0x491844(0x676)]['RegExp'][_0x491844(0x646)][_0x2e37c5])){var _0x4f27c5=String(RegExp['$1']);try{_0x3fd109=Math[_0x491844(0x1ad)](_0x3fd109,Number(eval(_0x4f27c5)));}catch(_0x2369ca){if(_0x491844(0x4b3)===_0x491844(0x4b3)){if($gameTemp['isPlaytest']())console[_0x491844(0x652)](_0x2369ca);}else{function _0x16b726(){_0x4640f8+=_0x1e2e82(_0x44cfa5['$1']),_0x528c9+=_0x536314(_0x547752['$2']);}}}}return _0x3fd109;};if(this[_0x56757a(0x5bc)][_0x12dd1f]===0x0)this[_0x56757a(0x5bc)][_0x12dd1f]=Number[_0x56757a(0x1a8)];return this[_0x56757a(0x5bc)][_0x12dd1f]=this['traitObjects']()[_0x56757a(0x69e)](_0x2574f1,this['_cache'][_0x12dd1f]),this[_0x56757a(0x5bc)][_0x12dd1f];},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x18b)]=function(_0x645593){const _0x4e2215=_0x479088,_0x29199c=this[_0x4e2215(0x465)](Game_BattlerBase[_0x4e2215(0x668)],_0x645593),_0x56a001=(_0xdd92dc,_0x3a9435)=>{const _0x455ac9=_0x4e2215;if(_0x455ac9(0x445)!==_0x455ac9(0x445)){function _0x5affaf(){const _0x140359=_0x455ac9;_0x5a28ca['CoreEngine']['Scene_Name_create'][_0x140359(0x4c7)](this),this[_0x140359(0x600)]();}}else{if(!_0x3a9435)return _0xdd92dc;if(_0x3a9435['note'][_0x455ac9(0x7cd)](VisuMZ['CoreEngine'][_0x455ac9(0x21a)][_0x455ac9(0x476)][_0x645593])){var _0x4b7dd7=Number(RegExp['$1'])/0x64;_0xdd92dc*=_0x4b7dd7;}if(_0x3a9435[_0x455ac9(0x76a)]['match'](VisuMZ[_0x455ac9(0x676)][_0x455ac9(0x21a)]['paramRate2'][_0x645593])){if('XDyXz'===_0x455ac9(0x567)){function _0x5ed13a(){const _0xb5fe83=_0x455ac9;this[_0xb5fe83(0x3a6)]();}}else{var _0x4b7dd7=Number(RegExp['$1']);_0xdd92dc*=_0x4b7dd7;}}if(_0x3a9435['note'][_0x455ac9(0x7cd)](VisuMZ[_0x455ac9(0x676)][_0x455ac9(0x21a)]['paramRateJS'][_0x645593])){if(_0x455ac9(0x413)===_0x455ac9(0x454)){function _0x32b422(){const _0x56b5ac=_0x455ac9,_0x28145c=_0x3ee5da['GetParamIcon'](_0x3bf3fa);_0x77a11c?(this[_0x56b5ac(0x592)](_0x28145c,_0x1704cd,_0x3f2248,this['gaugeLineHeight']()),_0x314527-=this['gaugeLineHeight']()+0x2,_0x539f99+=this[_0x56b5ac(0x212)]()+0x2):(this[_0x56b5ac(0x17a)](_0x28145c,_0x3cb9b8+0x2,_0xb1376b+0x2),_0x5ec06d-=_0x158062[_0x56b5ac(0x37b)]+0x4,_0x210e0b+=_0x417406['iconWidth']+0x4);}}else{var _0x474583=String(RegExp['$1']);try{_0xdd92dc*=eval(_0x474583);}catch(_0x4a9c88){if(_0x455ac9(0x323)===_0x455ac9(0x323)){if($gameTemp[_0x455ac9(0x2b6)]())console[_0x455ac9(0x652)](_0x4a9c88);}else{function _0x460f4f(){const _0xf97fdf=_0x455ac9;return this[_0xf97fdf(0x179)]=this[_0xf97fdf(0x179)]||{},!this[_0xf97fdf(0x179)][_0xa46a35]&&(this[_0xf97fdf(0x179)][_0x1f57c3]=_0x2d0fa9[_0xf97fdf(0x676)][_0xf97fdf(0x4cc)][_0xf97fdf(0x4c7)](this,_0x1bf26a)),this['_CoreEngine_Cache_textSizeEx'][_0x532051];}}}}}return _0xdd92dc;}};return this[_0x4e2215(0x3c2)]()[_0x4e2215(0x69e)](_0x56a001,_0x29199c);},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x3ca)]=function(_0x14e34b){const _0x358aa1=_0x479088,_0x18330a=(_0x27139c,_0x54a111)=>{const _0x53a28d=_0x1315;if(!_0x54a111)return _0x27139c;if(_0x54a111['note'][_0x53a28d(0x7cd)](VisuMZ['CoreEngine'][_0x53a28d(0x21a)][_0x53a28d(0x42e)][_0x14e34b])){if(_0x53a28d(0x21f)!=='BUKxc'){function _0x239c08(){const _0x4c2167=_0x53a28d;_0x4fe821[_0x4c2167(0x676)]['Scene_Map_createMenuButton'][_0x4c2167(0x4c7)](this),_0x596879[_0x4c2167(0x372)]()&&this[_0x4c2167(0x20b)]();}}else{var _0x34c466=Number(RegExp['$1']);_0x27139c+=_0x34c466;}}if(_0x54a111[_0x53a28d(0x76a)][_0x53a28d(0x7cd)](VisuMZ[_0x53a28d(0x676)]['RegExp'][_0x53a28d(0x1d9)][_0x14e34b])){if('KRcFl'===_0x53a28d(0x730)){function _0x4253f5(){const _0x3cd390=_0x53a28d,_0x3e3419=_0x53fd08[_0x3cd390(0x1dc)],_0x313ae1=_0x22ae21[_0x3cd390(0x637)]||'',_0x89f8c8=_0x5368b3[_0x3cd390(0x710)]||'',_0x14edfc=_0x2a10ed[_0x3cd390(0x676)][_0x3cd390(0x502)]['MenuLayout'][_0x3cd390(0x56c)][_0x3cd390(0x4e9)],_0x27e819=_0x14edfc['format'](_0x3e3419,_0x313ae1,_0x89f8c8);_0xcd7e6d[_0x3cd390(0x226)]=_0x27e819;}}else{var _0x231f54=String(RegExp['$1']);try{_0x27139c+=eval(_0x231f54);}catch(_0x9c3763){if(_0x53a28d(0x1e6)!==_0x53a28d(0x56b)){if($gameTemp[_0x53a28d(0x2b6)]())console[_0x53a28d(0x652)](_0x9c3763);}else{function _0xb2f19(){if(_0x2014e7%0x1===0x0)return _0x58d620;return _0xb234a4=_0x2b70e7||0x0,_0x391e4a((_0xd2c019*0x64)['toFixed'](_0xed6f3))+'%';}}}}}return _0x27139c;};return this[_0x358aa1(0x3c2)]()['reduce'](_0x18330a,0x0);},Game_BattlerBase['prototype']['param']=function(_0x3afb9f){const _0x15224f=_0x479088;let _0x4839fc=_0x15224f(0x3d5)+_0x3afb9f+_0x15224f(0x7c9);if(this[_0x15224f(0x5e4)](_0x4839fc))return this[_0x15224f(0x5bc)][_0x4839fc];return this[_0x15224f(0x5bc)][_0x4839fc]=Math[_0x15224f(0x786)](VisuMZ[_0x15224f(0x676)][_0x15224f(0x502)][_0x15224f(0x1cb)][_0x15224f(0x4ce)][_0x15224f(0x4c7)](this,_0x3afb9f)),this[_0x15224f(0x5bc)][_0x4839fc];},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x3a5)]=function(_0x3aa720){const _0x53c325=_0x479088,_0x41d22b=(_0x540a4b,_0x9d8935)=>{const _0x285a94=_0x1315;if(_0x285a94(0x52a)!=='YtEUt'){function _0x8e1a17(){const _0x5a0fe5=_0x285a94;for(const _0x29d5a3 of _0x1f2b08['_commandList']){if(_0x29d5a3[_0x5a0fe5(0x245)][_0x5a0fe5(0x4c7)](this)){const _0x3dc32c=_0x29d5a3[_0x5a0fe5(0x3a0)];let _0x113751=_0x29d5a3['TextStr'];if(['','Untitled'][_0x5a0fe5(0x6c5)](_0x113751))_0x113751=_0x29d5a3[_0x5a0fe5(0x4f8)]['call'](this);const _0x59fa1c=_0x29d5a3[_0x5a0fe5(0x792)][_0x5a0fe5(0x4c7)](this),_0x1e847a=_0x29d5a3[_0x5a0fe5(0x4b2)]['call'](this);this[_0x5a0fe5(0x294)](_0x113751,_0x3dc32c,_0x59fa1c,_0x1e847a),this['setHandler'](_0x3dc32c,_0x29d5a3[_0x5a0fe5(0x162)]['bind'](this,_0x1e847a));}}}}else{if(!_0x9d8935)return _0x540a4b;if(_0x9d8935[_0x285a94(0x76a)][_0x285a94(0x7cd)](VisuMZ[_0x285a94(0x676)][_0x285a94(0x21a)][_0x285a94(0x196)][_0x3aa720])){var _0x352ab7=Number(RegExp['$1'])/0x64;_0x540a4b+=_0x352ab7;}if(_0x9d8935[_0x285a94(0x76a)][_0x285a94(0x7cd)](VisuMZ[_0x285a94(0x676)]['RegExp'][_0x285a94(0x480)][_0x3aa720])){var _0x352ab7=Number(RegExp['$1']);_0x540a4b+=_0x352ab7;}if(_0x9d8935['note'][_0x285a94(0x7cd)](VisuMZ[_0x285a94(0x676)][_0x285a94(0x21a)][_0x285a94(0x71d)][_0x3aa720])){if('ieetR'!==_0x285a94(0x52d)){function _0x493139(){const _0x3ea95c=_0x285a94;if(_0x3420a4[_0x3ea95c(0x245)]['call'](this)){const _0x15948d=_0x4e343b[_0x3ea95c(0x3a0)];let _0x484110=_0x51d007[_0x3ea95c(0x63b)];if(['',_0x3ea95c(0x303)][_0x3ea95c(0x6c5)](_0x484110))_0x484110=_0x527abd[_0x3ea95c(0x4f8)][_0x3ea95c(0x4c7)](this);const _0x3237e=_0x1f4b1c[_0x3ea95c(0x792)]['call'](this),_0x3785a8=_0x3d4da9['ExtJS'][_0x3ea95c(0x4c7)](this);this[_0x3ea95c(0x294)](_0x484110,_0x15948d,_0x3237e,_0x3785a8),this['setHandler'](_0x15948d,_0x4bcbbe[_0x3ea95c(0x162)][_0x3ea95c(0x34b)](this,_0x3785a8));}}}else{var _0x2cd306=String(RegExp['$1']);try{if(_0x285a94(0x623)===_0x285a94(0x623))_0x540a4b+=eval(_0x2cd306);else{function _0x239b25(){const _0x18182e=_0x285a94;let _0x1a617f=_0x6468c8[_0xf22705],_0x2bf747=this[_0x18182e(0x448)](_0x1a617f)[_0x18182e(0x7bc)],_0x27edf3=_0x421dbe[_0x18182e(0x7c1)]((this[_0x18182e(0x4fc)]['width']-_0x2bf747)/0x2);this[_0x18182e(0x417)](_0x1a617f,_0x27edf3,_0x541368),_0x205bf2+=this[_0x18182e(0x760)]();}}}catch(_0x15ce40){if($gameTemp['isPlaytest']())console[_0x285a94(0x652)](_0x15ce40);}}}return _0x540a4b;}};return this[_0x53c325(0x3c2)]()['reduce'](_0x41d22b,0x0);},Game_BattlerBase[_0x479088(0x6e6)]['xparamRate']=function(_0x15ec2c){const _0x10f5b1=_0x479088,_0x496dd2=(_0x11753b,_0x40c487)=>{const _0x24d1c9=_0x1315;if(_0x24d1c9(0x330)===_0x24d1c9(0x330)){if(!_0x40c487)return _0x11753b;if(_0x40c487[_0x24d1c9(0x76a)][_0x24d1c9(0x7cd)](VisuMZ['CoreEngine']['RegExp'][_0x24d1c9(0x349)][_0x15ec2c])){var _0x26d2f7=Number(RegExp['$1'])/0x64;_0x11753b*=_0x26d2f7;}if(_0x40c487[_0x24d1c9(0x76a)][_0x24d1c9(0x7cd)](VisuMZ[_0x24d1c9(0x676)][_0x24d1c9(0x21a)][_0x24d1c9(0x72c)][_0x15ec2c])){if(_0x24d1c9(0x398)===_0x24d1c9(0x39f)){function _0x4967d2(){const _0x123733=_0x24d1c9;this[_0x123733(0x503)][_0x123733(0x516)](_0x3ee66a[_0x123733(0x3e8)][_0x123733(0x5d5)]);}}else{var _0x26d2f7=Number(RegExp['$1']);_0x11753b*=_0x26d2f7;}}if(_0x40c487['note'][_0x24d1c9(0x7cd)](VisuMZ[_0x24d1c9(0x676)]['RegExp'][_0x24d1c9(0x79e)][_0x15ec2c])){var _0x42b886=String(RegExp['$1']);try{if(_0x24d1c9(0x383)===_0x24d1c9(0x6dc)){function _0x560655(){const _0x1346cf=_0x24d1c9;return _0xc921ed[_0x1346cf(0x676)]['Settings'][_0x1346cf(0x6c9)][_0x1346cf(0x49f)];}}else _0x11753b*=eval(_0x42b886);}catch(_0x54a7e6){if($gameTemp['isPlaytest']())console[_0x24d1c9(0x652)](_0x54a7e6);}}return _0x11753b;}else{function _0x3bd89b(){return 7.5625*_0x18b9b8*_0x32daaf;}}};return this[_0x10f5b1(0x3c2)]()[_0x10f5b1(0x69e)](_0x496dd2,0x1);},Game_BattlerBase[_0x479088(0x6e6)]['xparamFlatBonus']=function(_0x43d43a){const _0x5ec720=_0x479088,_0x50eb14=(_0x35634d,_0x4b4a74)=>{const _0xd93357=_0x1315;if(_0xd93357(0x4c1)==='WOcjh'){if(!_0x4b4a74)return _0x35634d;if(_0x4b4a74[_0xd93357(0x76a)][_0xd93357(0x7cd)](VisuMZ[_0xd93357(0x676)][_0xd93357(0x21a)]['xparamFlat1'][_0x43d43a])){var _0x27caee=Number(RegExp['$1'])/0x64;_0x35634d+=_0x27caee;}if(_0x4b4a74[_0xd93357(0x76a)][_0xd93357(0x7cd)](VisuMZ['CoreEngine']['RegExp'][_0xd93357(0x233)][_0x43d43a])){if(_0xd93357(0x1c1)!=='zdLab'){var _0x27caee=Number(RegExp['$1']);_0x35634d+=_0x27caee;}else{function _0x5f4871(){const _0x4e6ab9=_0xd93357;if(_0x4e01fa)_0x21b35d[_0x4e6ab9(0x461)](_0x5ddc19);}}}if(_0x4b4a74[_0xd93357(0x76a)][_0xd93357(0x7cd)](VisuMZ[_0xd93357(0x676)]['RegExp'][_0xd93357(0x25f)][_0x43d43a])){var _0x528c7c=String(RegExp['$1']);try{if(_0xd93357(0x342)!=='KJeuf'){function _0x5398aa(){const _0x307a98=_0xd93357;return this[_0x307a98(0x202)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x307a98(0x6c5)](this[_0x307a98(0x202)])?_0x5064e1[_0x307a98(0x676)][_0x307a98(0x2ec)]['call'](this,_0x188699):_0x58d227[_0x307a98(0x6d1)](_0x121a94,this['_coreEasingType']);}}else _0x35634d+=eval(_0x528c7c);}catch(_0x4b3da8){if($gameTemp[_0xd93357(0x2b6)]())console[_0xd93357(0x652)](_0x4b3da8);}}return _0x35634d;}else{function _0x15c0ca(){const _0x2f8ce4=_0xd93357;return _0x481e00[_0x2f8ce4(0x3e8)][_0x2f8ce4(0x1c8)]['call'](this);}}};return this[_0x5ec720(0x3c2)]()[_0x5ec720(0x69e)](_0x50eb14,0x0);},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x36e)]=function(_0x1e0719){const _0x408edc=_0x479088;let _0xd8469c=_0x408edc(0x36e)+_0x1e0719+_0x408edc(0x7c9);if(this[_0x408edc(0x5e4)](_0xd8469c))return this[_0x408edc(0x5bc)][_0xd8469c];return this[_0x408edc(0x5bc)][_0xd8469c]=VisuMZ[_0x408edc(0x676)][_0x408edc(0x502)][_0x408edc(0x1cb)][_0x408edc(0x69b)][_0x408edc(0x4c7)](this,_0x1e0719),this[_0x408edc(0x5bc)][_0xd8469c];},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x38e)]=function(_0x60dcbd){const _0x550989=_0x479088,_0x1a9e3a=(_0x537a58,_0x543b18)=>{const _0x59f452=_0x1315;if(!_0x543b18)return _0x537a58;if(_0x543b18[_0x59f452(0x76a)]['match'](VisuMZ[_0x59f452(0x676)]['RegExp']['sparamPlus1'][_0x60dcbd])){if(_0x59f452(0x35f)!=='cNjms'){var _0x1f5183=Number(RegExp['$1'])/0x64;_0x537a58+=_0x1f5183;}else{function _0xff05b2(){const _0x2bcc14=_0x59f452;_0x5925c8[_0x2bcc14(0x5e5)]&&_0x567123[_0x2bcc14(0x5e5)]();}}}if(_0x543b18[_0x59f452(0x76a)][_0x59f452(0x7cd)](VisuMZ['CoreEngine'][_0x59f452(0x21a)][_0x59f452(0x5a0)][_0x60dcbd])){var _0x1f5183=Number(RegExp['$1']);_0x537a58+=_0x1f5183;}if(_0x543b18[_0x59f452(0x76a)][_0x59f452(0x7cd)](VisuMZ[_0x59f452(0x676)]['RegExp'][_0x59f452(0x318)][_0x60dcbd])){var _0x3b9342=String(RegExp['$1']);try{_0x537a58+=eval(_0x3b9342);}catch(_0x4d6d52){if($gameTemp[_0x59f452(0x2b6)]())console[_0x59f452(0x652)](_0x4d6d52);}}return _0x537a58;};return this[_0x550989(0x3c2)]()[_0x550989(0x69e)](_0x1a9e3a,0x0);},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x6a3)]=function(_0x3f0f6f){const _0x2c459e=_0x479088,_0x443a04=(_0x5f136c,_0xe80e95)=>{const _0x10a7c7=_0x1315;if(_0x10a7c7(0x253)==='CodHF'){if(!_0xe80e95)return _0x5f136c;if(_0xe80e95[_0x10a7c7(0x76a)][_0x10a7c7(0x7cd)](VisuMZ[_0x10a7c7(0x676)][_0x10a7c7(0x21a)][_0x10a7c7(0x389)][_0x3f0f6f])){if('RBAPo'==='VhuSX'){function _0x3bdf13(){const _0x4f5e1e=_0x10a7c7;this[_0x4f5e1e(0x1f2)](_0x340e48['min'](this[_0x4f5e1e(0x791)](),0x0));}}else{var _0x44c8e8=Number(RegExp['$1'])/0x64;_0x5f136c*=_0x44c8e8;}}if(_0xe80e95[_0x10a7c7(0x76a)]['match'](VisuMZ[_0x10a7c7(0x676)]['RegExp'][_0x10a7c7(0x26b)][_0x3f0f6f])){var _0x44c8e8=Number(RegExp['$1']);_0x5f136c*=_0x44c8e8;}if(_0xe80e95[_0x10a7c7(0x76a)][_0x10a7c7(0x7cd)](VisuMZ[_0x10a7c7(0x676)][_0x10a7c7(0x21a)][_0x10a7c7(0x19c)][_0x3f0f6f])){var _0x169469=String(RegExp['$1']);try{_0x5f136c*=eval(_0x169469);}catch(_0x46c449){if($gameTemp['isPlaytest']())console[_0x10a7c7(0x652)](_0x46c449);}}return _0x5f136c;}else{function _0x2cca57(){const _0x3fa26e=_0x10a7c7;this[_0x3fa26e(0x73e)][_0x3fa26e(0x516)](_0x2515ed[_0x3fa26e(0x3e8)][_0x3fa26e(0x657)]);}}};return this[_0x2c459e(0x3c2)]()[_0x2c459e(0x69e)](_0x443a04,0x1);},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x7f2)]=function(_0x39322b){const _0x5e8b09=_0x479088,_0x1a766f=(_0x546226,_0x1cb6cf)=>{const _0x29b543=_0x1315;if(!_0x1cb6cf)return _0x546226;if(_0x1cb6cf[_0x29b543(0x76a)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x29b543(0x3ba)][_0x39322b])){var _0x3a923b=Number(RegExp['$1'])/0x64;_0x546226+=_0x3a923b;}if(_0x1cb6cf[_0x29b543(0x76a)][_0x29b543(0x7cd)](VisuMZ[_0x29b543(0x676)]['RegExp'][_0x29b543(0x544)][_0x39322b])){if(_0x29b543(0x449)!=='LYxEU'){function _0x5d306f(){const _0x55f4dd=_0x29b543,_0xec5be7=_0x502aea[_0x55f4dd(0x3a1)]==_0x55f4dd(0x5bd)?_0x55f4dd(0x4ee):_0x1b2724[_0x55f4dd(0x3a1)]==_0x55f4dd(0x653)?_0x55f4dd(0x46f):_0x55f4dd(0x79c);_0x18943a(_0x55f4dd(0x274))[_0x55f4dd(0x29d)](_0xec5be7+'\x20'+_0x1728dc);}}else{var _0x3a923b=Number(RegExp['$1']);_0x546226+=_0x3a923b;}}if(_0x1cb6cf[_0x29b543(0x76a)]['match'](VisuMZ[_0x29b543(0x676)][_0x29b543(0x21a)][_0x29b543(0x574)][_0x39322b])){var _0x1ea8b9=String(RegExp['$1']);try{_0x546226+=eval(_0x1ea8b9);}catch(_0x4f2117){if($gameTemp['isPlaytest']())console['log'](_0x4f2117);}}return _0x546226;};return this[_0x5e8b09(0x3c2)]()[_0x5e8b09(0x69e)](_0x1a766f,0x0);},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x1e5)]=function(_0x16ac6c){const _0x12c787=_0x479088;let _0x3c1cdb='sparam'+_0x16ac6c+_0x12c787(0x7c9);if(this[_0x12c787(0x5e4)](_0x3c1cdb))return this['_cache'][_0x3c1cdb];return this['_cache'][_0x3c1cdb]=VisuMZ[_0x12c787(0x676)][_0x12c787(0x502)]['Param'][_0x12c787(0x182)]['call'](this,_0x16ac6c),this['_cache'][_0x3c1cdb];},Game_BattlerBase[_0x479088(0x6e6)][_0x479088(0x315)]=function(_0x4b384f,_0x531d8d){const _0x2663a7=_0x479088;if(typeof paramId==='number')return this['param'](_0x4b384f);_0x4b384f=String(_0x4b384f||'')[_0x2663a7(0x2b9)]();if(_0x4b384f==='MAXHP')return this[_0x2663a7(0x3d5)](0x0);if(_0x4b384f===_0x2663a7(0x33f))return this[_0x2663a7(0x3d5)](0x1);if(_0x4b384f===_0x2663a7(0x1e0))return this['param'](0x2);if(_0x4b384f===_0x2663a7(0x3aa))return this[_0x2663a7(0x3d5)](0x3);if(_0x4b384f===_0x2663a7(0x5c3))return this[_0x2663a7(0x3d5)](0x4);if(_0x4b384f==='MDF')return this[_0x2663a7(0x3d5)](0x5);if(_0x4b384f===_0x2663a7(0x65e))return this['param'](0x6);if(_0x4b384f===_0x2663a7(0x298))return this[_0x2663a7(0x3d5)](0x7);if(_0x4b384f===_0x2663a7(0x325))return _0x531d8d?String(Math['round'](this[_0x2663a7(0x36e)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x4b384f==='EVA')return _0x531d8d?String(Math['round'](this[_0x2663a7(0x36e)](0x1)*0x64))+'%':this[_0x2663a7(0x36e)](0x1);if(_0x4b384f===_0x2663a7(0x550))return _0x531d8d?String(Math[_0x2663a7(0x786)](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x4b384f===_0x2663a7(0x675))return _0x531d8d?String(Math[_0x2663a7(0x786)](this['xparam'](0x3)*0x64))+'%':this[_0x2663a7(0x36e)](0x3);if(_0x4b384f===_0x2663a7(0x422))return _0x531d8d?String(Math[_0x2663a7(0x786)](this['xparam'](0x4)*0x64))+'%':this[_0x2663a7(0x36e)](0x4);if(_0x4b384f===_0x2663a7(0x51e))return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x36e)](0x5)*0x64))+'%':this[_0x2663a7(0x36e)](0x5);if(_0x4b384f===_0x2663a7(0x64b))return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x36e)](0x6)*0x64))+'%':this[_0x2663a7(0x36e)](0x6);if(_0x4b384f==='HRG')return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x36e)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x4b384f===_0x2663a7(0x6ae))return _0x531d8d?String(Math['round'](this[_0x2663a7(0x36e)](0x8)*0x64))+'%':this[_0x2663a7(0x36e)](0x8);if(_0x4b384f===_0x2663a7(0x7a2))return _0x531d8d?String(Math['round'](this[_0x2663a7(0x36e)](0x9)*0x64))+'%':this[_0x2663a7(0x36e)](0x9);if(_0x4b384f==='TGR')return _0x531d8d?String(Math[_0x2663a7(0x786)](this['sparam'](0x0)*0x64))+'%':this[_0x2663a7(0x1e5)](0x0);if(_0x4b384f===_0x2663a7(0x737))return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x1e5)](0x1)*0x64))+'%':this[_0x2663a7(0x1e5)](0x1);if(_0x4b384f===_0x2663a7(0x747))return _0x531d8d?String(Math[_0x2663a7(0x786)](this['sparam'](0x2)*0x64))+'%':this[_0x2663a7(0x1e5)](0x2);if(_0x4b384f===_0x2663a7(0x39d))return _0x531d8d?String(Math['round'](this[_0x2663a7(0x1e5)](0x3)*0x64))+'%':this[_0x2663a7(0x1e5)](0x3);if(_0x4b384f==='MCR')return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x1e5)](0x4)*0x64))+'%':this[_0x2663a7(0x1e5)](0x4);if(_0x4b384f==='TCR')return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x1e5)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x4b384f===_0x2663a7(0x7f3))return _0x531d8d?String(Math['round'](this[_0x2663a7(0x1e5)](0x6)*0x64))+'%':this[_0x2663a7(0x1e5)](0x6);if(_0x4b384f===_0x2663a7(0x62b))return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x1e5)](0x7)*0x64))+'%':this[_0x2663a7(0x1e5)](0x7);if(_0x4b384f==='FDR')return _0x531d8d?String(Math[_0x2663a7(0x786)](this[_0x2663a7(0x1e5)](0x8)*0x64))+'%':this[_0x2663a7(0x1e5)](0x8);if(_0x4b384f===_0x2663a7(0x16f))return _0x531d8d?String(Math['round'](this[_0x2663a7(0x1e5)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x2663a7(0x676)][_0x2663a7(0x557)][_0x4b384f]){if(_0x2663a7(0x63f)===_0x2663a7(0x63f)){const _0x263f28=VisuMZ[_0x2663a7(0x676)][_0x2663a7(0x557)][_0x4b384f],_0x4b6178=this[_0x263f28];return VisuMZ[_0x2663a7(0x676)][_0x2663a7(0x7e7)][_0x4b384f]===_0x2663a7(0x2d5)?_0x4b6178:_0x531d8d?String(Math['round'](_0x4b6178*0x64))+'%':_0x4b6178;}else{function _0x4a9045(){const _0x31b47e=_0x2663a7;_0x55f00b[_0x31b47e(0x4d8)](),this[_0x31b47e(0x159)]();}}}return'';},Game_BattlerBase[_0x479088(0x6e6)]['isDying']=function(){const _0x235388=_0x479088;return this[_0x235388(0x32a)]()&&this[_0x235388(0x405)]<this[_0x235388(0x21d)]*VisuMZ[_0x235388(0x676)]['Settings'][_0x235388(0x1cb)][_0x235388(0x3d1)];},Game_Battler[_0x479088(0x6e6)]['performMiss']=function(){const _0x116604=_0x479088;SoundManager['playMiss'](),this[_0x116604(0x629)](_0x116604(0x5d9));},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor[_0x479088(0x6e6)][_0x479088(0x154)],Game_Actor['prototype'][_0x479088(0x154)]=function(_0x5de37b){const _0x27f76a=_0x479088;if(this['level']>0x63)return this[_0x27f76a(0x170)](_0x5de37b);return VisuMZ[_0x27f76a(0x676)][_0x27f76a(0x404)]['call'](this,_0x5de37b);},Game_Actor[_0x479088(0x6e6)]['paramBaseAboveLevel99']=function(_0x153585){const _0x491025=_0x479088,_0x57c47e=this[_0x491025(0x577)]()[_0x491025(0x7ee)][_0x153585][0x63],_0x54bd7e=this[_0x491025(0x577)]()[_0x491025(0x7ee)][_0x153585][0x62];return _0x57c47e+(_0x57c47e-_0x54bd7e)*(this[_0x491025(0x28c)]-0x63);},VisuMZ[_0x479088(0x676)]['Game_Actor_changeClass']=Game_Actor[_0x479088(0x6e6)][_0x479088(0x71b)],Game_Actor[_0x479088(0x6e6)]['changeClass']=function(_0x26c57f,_0x1bed60){const _0x4e943d=_0x479088;$gameTemp[_0x4e943d(0x65a)]=!![],VisuMZ[_0x4e943d(0x676)][_0x4e943d(0x666)][_0x4e943d(0x4c7)](this,_0x26c57f,_0x1bed60),$gameTemp[_0x4e943d(0x65a)]=undefined;},VisuMZ[_0x479088(0x676)][_0x479088(0x3d3)]=Game_Actor[_0x479088(0x6e6)][_0x479088(0x694)],Game_Actor[_0x479088(0x6e6)][_0x479088(0x694)]=function(){const _0x3b94b2=_0x479088;VisuMZ['CoreEngine'][_0x3b94b2(0x3d3)][_0x3b94b2(0x4c7)](this);if(!$gameTemp['_changingClass'])this['levelUpRecovery']();},Game_Actor['prototype'][_0x479088(0x183)]=function(){const _0x3dd2b6=_0x479088;this[_0x3dd2b6(0x5bc)]={};if(VisuMZ[_0x3dd2b6(0x676)]['Settings'][_0x3dd2b6(0x6da)][_0x3dd2b6(0x7e1)])this['_hp']=this[_0x3dd2b6(0x21d)];if(VisuMZ[_0x3dd2b6(0x676)]['Settings'][_0x3dd2b6(0x6da)][_0x3dd2b6(0x632)])this['_mp']=this[_0x3dd2b6(0x658)];},Game_Actor[_0x479088(0x6e6)]['expRate']=function(){const _0x24f134=_0x479088;if(this[_0x24f134(0x4f5)]())return 0x1;const _0x4a0aab=this[_0x24f134(0x22f)]()-this['currentLevelExp'](),_0x8389f=this[_0x24f134(0x204)]()-this[_0x24f134(0x5ff)]();return(_0x8389f/_0x4a0aab)[_0x24f134(0x520)](0x0,0x1);},Game_Actor['prototype'][_0x479088(0x3c2)]=function(){const _0x36a820=_0x479088,_0xc87f05=Game_Battler[_0x36a820(0x6e6)][_0x36a820(0x3c2)][_0x36a820(0x4c7)](this);for(const _0x2414c4 of this[_0x36a820(0x40b)]()){if('IrpwG'==='HtOzK'){function _0x2eb068(){const _0x30b6a8=_0x36a820,_0x59791b=_0x218a26[_0x32f1b0[_0x30b6a8(0x4e8)]],_0x35cb8c=_0x5173b1['targets'],_0x5a4e1f=_0x158621[_0x30b6a8(0x663)],_0x5b08f9=_0x4ecb3c[_0x30b6a8(0x3eb)];let _0x2da4b8=this[_0x30b6a8(0x575)]();const _0x5359c3=this['animationNextDelay']();if(this[_0x30b6a8(0x19f)](_0x59791b))for(const _0x80b345 of _0x35cb8c){this[_0x30b6a8(0x6fd)]([_0x80b345],_0x59791b,_0x5a4e1f,_0x2da4b8,_0x5b08f9),_0x2da4b8+=_0x5359c3;}else this[_0x30b6a8(0x6fd)](_0x35cb8c,_0x59791b,_0x5a4e1f,_0x2da4b8,_0x5b08f9);}}else{if(_0x2414c4){if('DrxIV'===_0x36a820(0x74b)){function _0x526b76(){return _0x583777;}}else _0xc87f05[_0x36a820(0x4d1)](_0x2414c4);}}}return _0xc87f05['push'](this[_0x36a820(0x577)](),this['actor']()),_0xc87f05;},Object[_0x479088(0x54c)](Game_Enemy[_0x479088(0x6e6)],_0x479088(0x28c),{'get':function(){const _0xc8ca45=_0x479088;return this[_0xc8ca45(0x494)]();},'configurable':!![]}),Game_Enemy[_0x479088(0x6e6)][_0x479088(0x494)]=function(){const _0x2d30c4=_0x479088;return this[_0x2d30c4(0x41b)]()[_0x2d30c4(0x28c)];},Game_Enemy['prototype'][_0x479088(0x63a)]=function(){const _0x2e8cdc=_0x479088;if(!this[_0x2e8cdc(0x2ab)]){if(_0x2e8cdc(0x491)==='Uadso'){function _0x434444(){const _0x180255=_0x2e8cdc;_0x541ef9['ConvertParams'](_0x5442f7,_0x89e927);const _0x903a0=_0x1e54e1[_0x180255(0x755)]||0x0;_0x114fb2[_0x180255(0x7eb)](_0x903a0);}}else{this[_0x2e8cdc(0x7b5)]+=Math[_0x2e8cdc(0x786)]((Graphics[_0x2e8cdc(0x5de)]-0x270)/0x2),this[_0x2e8cdc(0x7b5)]-=Math[_0x2e8cdc(0x7c1)]((Graphics[_0x2e8cdc(0x5de)]-Graphics[_0x2e8cdc(0x77a)])/0x2);if($gameSystem['isSideView']()){if(_0x2e8cdc(0x30f)===_0x2e8cdc(0x30f))this['_screenX']-=Math[_0x2e8cdc(0x7c1)]((Graphics[_0x2e8cdc(0x7bc)]-Graphics[_0x2e8cdc(0x45e)])/0x2);else{function _0x5cd943(){const _0x2a58ee=_0x2e8cdc;return _0x55059f&&_0x466246[_0x2a58ee(0x4b7)]?_0x2599c4[_0x2a58ee(0x4b7)][_0x2a58ee(0x7e5)]():!![];}}}else{if(_0x2e8cdc(0x360)!==_0x2e8cdc(0x6f3))this[_0x2e8cdc(0x1a1)]+=Math[_0x2e8cdc(0x786)]((Graphics['boxWidth']-0x330)/0x2);else{function _0x1a063a(){const _0x42ebe5=_0x2e8cdc;this[_0x42ebe5(0x5f1)]={'duration':_0x150129,'wholeDuration':_0x5dfa0d,'type':_0xb38246,'targetX':_0x113fdb,'targetY':_0x3cb31b,'targetScaleX':_0x15d5dd,'targetScaleY':_0x15e000,'targetOpacity':_0xbd1a53,'targetBackOpacity':_0x204ecd,'targetContentsOpacity':_0x1729f6};}}}}}this['_repositioned']=!![];},Game_Party[_0x479088(0x6e6)]['maxGold']=function(){const _0x3732d2=_0x479088;return VisuMZ[_0x3732d2(0x676)][_0x3732d2(0x502)][_0x3732d2(0x2d9)][_0x3732d2(0x6a6)];},VisuMZ['CoreEngine']['Game_Party_consumeItem']=Game_Party[_0x479088(0x6e6)][_0x479088(0x450)],Game_Party[_0x479088(0x6e6)][_0x479088(0x450)]=function(_0xa0c540){const _0x4d6b6d=_0x479088;if(VisuMZ[_0x4d6b6d(0x676)]['Settings'][_0x4d6b6d(0x6da)][_0x4d6b6d(0x165)]&&DataManager[_0x4d6b6d(0x426)](_0xa0c540))return;VisuMZ['CoreEngine'][_0x4d6b6d(0x599)][_0x4d6b6d(0x4c7)](this,_0xa0c540);},VisuMZ[_0x479088(0x676)][_0x479088(0x462)]=Game_Troop[_0x479088(0x6e6)][_0x479088(0x5d2)],Game_Troop[_0x479088(0x6e6)][_0x479088(0x5d2)]=function(_0x13434a){const _0x199440=_0x479088;$gameTemp[_0x199440(0x30c)](),$gameTemp[_0x199440(0x7a7)](_0x13434a),VisuMZ[_0x199440(0x676)][_0x199440(0x462)][_0x199440(0x4c7)](this,_0x13434a);},VisuMZ['CoreEngine']['Game_Map_setup']=Game_Map[_0x479088(0x6e6)][_0x479088(0x5d2)],Game_Map['prototype'][_0x479088(0x5d2)]=function(_0x23b5f7){const _0x533c79=_0x479088;VisuMZ[_0x533c79(0x676)][_0x533c79(0x4b9)][_0x533c79(0x4c7)](this,_0x23b5f7),this['setupCoreEngine'](_0x23b5f7);},Game_Map[_0x479088(0x6e6)][_0x479088(0x569)]=function(){const _0x4e8596=_0x479088;this[_0x4e8596(0x185)]=VisuMZ[_0x4e8596(0x676)][_0x4e8596(0x502)][_0x4e8596(0x6da)][_0x4e8596(0x50c)]||![];if($dataMap&&$dataMap[_0x4e8596(0x76a)]){if($dataMap[_0x4e8596(0x76a)][_0x4e8596(0x7cd)](/<SHOW TILE SHADOWS>/i))this[_0x4e8596(0x185)]=![];if($dataMap[_0x4e8596(0x76a)][_0x4e8596(0x7cd)](/<HIDE TILE SHADOWS>/i))this[_0x4e8596(0x185)]=!![];}},Game_Map['prototype'][_0x479088(0x4a8)]=function(){const _0x4ce602=_0x479088;if(this[_0x4ce602(0x185)]===undefined)this[_0x4ce602(0x569)]();return this[_0x4ce602(0x185)];},VisuMZ[_0x479088(0x676)][_0x479088(0x4a4)]=Game_Character[_0x479088(0x6e6)][_0x479088(0x545)],Game_Character['prototype']['processMoveCommand']=function(_0x4ba090){const _0x409982=_0x479088;try{VisuMZ[_0x409982(0x676)][_0x409982(0x4a4)][_0x409982(0x4c7)](this,_0x4ba090);}catch(_0x5e961f){if($gameTemp['isPlaytest']())console[_0x409982(0x652)](_0x5e961f);}},Game_Player[_0x479088(0x6e6)][_0x479088(0x296)]=function(){const _0x3ee13c=_0x479088,_0x12c761=$gameMap['encounterStep']();this['_encounterCount']=Math[_0x3ee13c(0x492)](_0x12c761)+Math[_0x3ee13c(0x492)](_0x12c761)+this[_0x3ee13c(0x724)]();},Game_Player[_0x479088(0x6e6)][_0x479088(0x724)]=function(){const _0x2c0e92=_0x479088;if($dataMap&&$dataMap[_0x2c0e92(0x76a)]&&$dataMap[_0x2c0e92(0x76a)][_0x2c0e92(0x7cd)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x2c0e92(0x20c)!==_0x2c0e92(0x20c)){function _0x4618a1(){const _0x9972e=_0x2c0e92;return _0x3a7675[_0x9972e(0x676)][_0x9972e(0x502)][_0x9972e(0x55a)]['LineHeight'];}}else return Number(RegExp['$1']);}else{if(_0x2c0e92(0x541)===_0x2c0e92(0x541))return VisuMZ[_0x2c0e92(0x676)][_0x2c0e92(0x502)][_0x2c0e92(0x6da)][_0x2c0e92(0x239)];else{function _0x548f27(){const _0x48425f=_0x2c0e92;_0x3c3ee9[_0x48425f(0x676)][_0x48425f(0x7b7)][_0x48425f(0x4c7)](this);}}}},VisuMZ[_0x479088(0x676)][_0x479088(0x67f)]=Game_Event['prototype']['isCollidedWithEvents'],Game_Event[_0x479088(0x6e6)][_0x479088(0x7ef)]=function(_0x373428,_0x3ab967){const _0x2ac36=_0x479088;if(this[_0x2ac36(0x602)]()){if(_0x2ac36(0x378)===_0x2ac36(0x2ca)){function _0x37e6ab(){var _0x10250b=_0x2b1fee(_0x6ae545['$1']);_0x4c62b6+=_0x10250b;}}else return this['checkSmartEventCollision'](_0x373428,_0x3ab967);}else{if('rAunT'!=='jkRSC')return VisuMZ[_0x2ac36(0x676)][_0x2ac36(0x67f)][_0x2ac36(0x4c7)](this,_0x373428,_0x3ab967);else{function _0x102d8e(){const _0x94bcd4=_0x2ac36;this[_0x94bcd4(0x716)]&&(this[_0x94bcd4(0x3b3)]-=this[_0x94bcd4(0x467)](),this[_0x94bcd4(0x443)]()&&(this['_closing']=![]));}}}},Game_Event[_0x479088(0x6e6)][_0x479088(0x602)]=function(){const _0x4f9d08=_0x479088;return VisuMZ['CoreEngine'][_0x4f9d08(0x502)][_0x4f9d08(0x6da)][_0x4f9d08(0x2d2)];},Game_Event[_0x479088(0x6e6)][_0x479088(0x639)]=function(_0x288d69,_0x25acec){const _0x155e1e=_0x479088;if(!this[_0x155e1e(0x2c9)]()){if(_0x155e1e(0x1ef)===_0x155e1e(0x1ef))return![];else{function _0x4f6195(){const _0xd359ba=_0x155e1e;_0x4b2c23[_0xd359ba(0x676)]['Settings']['UI'][_0xd359ba(0x78b)]?this['setActorHomeRepositioned'](_0x20008e):_0x145e2b['CoreEngine'][_0xd359ba(0x661)][_0xd359ba(0x4c7)](this,_0x50fe7b);}}}else{if(_0x155e1e(0x236)!==_0x155e1e(0x314)){const _0x4cff48=$gameMap[_0x155e1e(0x795)](_0x288d69,_0x25acec)[_0x155e1e(0x3b4)](_0x3f1b72=>_0x3f1b72[_0x155e1e(0x2c9)]());return _0x4cff48[_0x155e1e(0x774)]>0x0;}else{function _0x42b10f(){const _0x3d4eaa=_0x155e1e;_0x40c02c=_0x508920[_0x3d4eaa(0x14f)](_0x39bf60);}}}},VisuMZ['CoreEngine'][_0x479088(0x58b)]=Game_Interpreter[_0x479088(0x6e6)][_0x479088(0x4d0)],Game_Interpreter[_0x479088(0x6e6)][_0x479088(0x4d0)]=function(_0x38415e){const _0x4fed82=_0x479088;try{VisuMZ[_0x4fed82(0x676)][_0x4fed82(0x58b)][_0x4fed82(0x4c7)](this,_0x38415e);}catch(_0x453a2b){$gameTemp[_0x4fed82(0x2b6)]()&&(console['log'](_0x4fed82(0x1f3)),console[_0x4fed82(0x652)](_0x453a2b)),this['skipBranch']();}return!![];},VisuMZ[_0x479088(0x676)][_0x479088(0x2b3)]=Game_Interpreter[_0x479088(0x6e6)][_0x479088(0x603)],Game_Interpreter[_0x479088(0x6e6)][_0x479088(0x603)]=function(_0x5b6005){const _0x2addb2=_0x479088;try{VisuMZ[_0x2addb2(0x676)]['Game_Interpreter_command122'][_0x2addb2(0x4c7)](this,_0x5b6005);}catch(_0x5199e0){if($gameTemp[_0x2addb2(0x2b6)]()){if(_0x2addb2(0x59a)!==_0x2addb2(0x59a)){function _0x417d69(){const _0x275cde=_0x2addb2;return _0x18a335[_0x275cde(0x676)]['Settings'][_0x275cde(0x2d9)][_0x275cde(0x6a6)];}}else console[_0x2addb2(0x652)](_0x2addb2(0x5fa)),console[_0x2addb2(0x652)](_0x5199e0);}}return!![];},VisuMZ[_0x479088(0x676)][_0x479088(0x1d6)]=Game_Interpreter[_0x479088(0x6e6)][_0x479088(0x63e)],Game_Interpreter[_0x479088(0x6e6)][_0x479088(0x63e)]=function(){const _0x44a78d=_0x479088;try{VisuMZ[_0x44a78d(0x676)]['Game_Interpreter_command355'][_0x44a78d(0x4c7)](this);}catch(_0x3cd145){$gameTemp[_0x44a78d(0x2b6)]()&&(console['log']('Script\x20Call\x20Error'),console[_0x44a78d(0x652)](_0x3cd145));}return!![];},VisuMZ[_0x479088(0x676)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x479088(0x6e6)][_0x479088(0x6b2)],Game_Interpreter[_0x479088(0x6e6)]['command357']=function(_0x13aac8){const _0x15032c=_0x479088;return $gameTemp[_0x15032c(0x507)](this),VisuMZ[_0x15032c(0x676)][_0x15032c(0x478)]['call'](this,_0x13aac8);},Scene_Base['prototype'][_0x479088(0x67d)]=function(){const _0x13d2d9=_0x479088;return VisuMZ[_0x13d2d9(0x676)][_0x13d2d9(0x502)]['UI'][_0x13d2d9(0x3b7)];},Scene_Base[_0x479088(0x6e6)][_0x479088(0x171)]=function(){const _0x239ca0=_0x479088;return VisuMZ['CoreEngine'][_0x239ca0(0x502)]['UI'][_0x239ca0(0x25c)];},Scene_Base[_0x479088(0x6e6)][_0x479088(0x441)]=function(){const _0xfd05b1=_0x479088;return VisuMZ[_0xfd05b1(0x676)][_0xfd05b1(0x502)]['UI']['BottomButtons'];},Scene_Base['prototype'][_0x479088(0x4cf)]=function(){const _0x22af38=_0x479088;return VisuMZ[_0x22af38(0x676)]['Settings']['UI'][_0x22af38(0x2ac)];},Scene_Base[_0x479088(0x6e6)][_0x479088(0x6dd)]=function(){const _0x4f587d=_0x479088;return VisuMZ[_0x4f587d(0x676)]['Settings']['UI'][_0x4f587d(0x4f3)];},Scene_Base['prototype'][_0x479088(0x78d)]=function(){const _0x18cf19=_0x479088;return VisuMZ['CoreEngine']['Settings']['UI'][_0x18cf19(0x407)];},Scene_Base[_0x479088(0x6e6)][_0x479088(0x7e5)]=function(){const _0x4c5028=_0x479088;return VisuMZ[_0x4c5028(0x676)][_0x4c5028(0x502)]['Window'][_0x4c5028(0x777)];},VisuMZ[_0x479088(0x676)]['Scene_Base_createWindowLayer']=Scene_Base['prototype'][_0x479088(0x547)],Scene_Base['prototype'][_0x479088(0x547)]=function(){const _0x4932d0=_0x479088;VisuMZ['CoreEngine'][_0x4932d0(0x55f)][_0x4932d0(0x4c7)](this),this[_0x4932d0(0x4fb)](),this[_0x4932d0(0x2be)]['x']=Math[_0x4932d0(0x786)](this['_windowLayer']['x']),this[_0x4932d0(0x2be)]['y']=Math['round'](this['_windowLayer']['y']);},Scene_Base['prototype'][_0x479088(0x4fb)]=function(){},Scene_Base['prototype']['buttonAssistKey1']=function(){const _0x283545=_0x479088;return TextManager[_0x283545(0x26a)](_0x283545(0x721),_0x283545(0x5a8));},Scene_Base['prototype'][_0x479088(0x5aa)]=function(){const _0x33c63d=_0x479088;return TextManager[_0x33c63d(0x421)](_0x33c63d(0x1d0));},Scene_Base['prototype'][_0x479088(0x6b1)]=function(){const _0x23539c=_0x479088;return TextManager[_0x23539c(0x421)]('shift');},Scene_Base[_0x479088(0x6e6)][_0x479088(0x783)]=function(){const _0x4c42f3=_0x479088;return TextManager[_0x4c42f3(0x421)]('ok');},Scene_Base[_0x479088(0x6e6)][_0x479088(0x53f)]=function(){const _0x22c1aa=_0x479088;return TextManager[_0x22c1aa(0x421)](_0x22c1aa(0x33c));},Scene_Base[_0x479088(0x6e6)][_0x479088(0x7ac)]=function(){const _0x4b08c8=_0x479088;if(this[_0x4b08c8(0x29e)]&&this['_pageupButton'][_0x4b08c8(0x3d8)]){if('yoToM'===_0x4b08c8(0x775)){function _0x4452e9(){const _0x4ec1ac=_0x4b08c8;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4ec1ac(0x199)](this[_0x4ec1ac(0x237)]);}}else return TextManager[_0x4b08c8(0x2b4)];}else{if(_0x4b08c8(0x1b2)===_0x4b08c8(0x5a2)){function _0x44b30(){const _0x40d5f8=_0x4b08c8;if(_0x21f8cc[_0x40d5f8(0x245)][_0x40d5f8(0x4c7)](this)){const _0x418afd=_0x9d70ac[_0x40d5f8(0x3a0)];let _0x3b55ca=_0x49099a[_0x40d5f8(0x63b)];if(['',_0x40d5f8(0x303)][_0x40d5f8(0x6c5)](_0x3b55ca))_0x3b55ca=_0x2766f4[_0x40d5f8(0x4f8)][_0x40d5f8(0x4c7)](this);const _0x3d330a=_0x200fc8[_0x40d5f8(0x792)][_0x40d5f8(0x4c7)](this),_0x4533e0=_0x4667f4[_0x40d5f8(0x4b2)][_0x40d5f8(0x4c7)](this);this[_0x40d5f8(0x294)](_0x3b55ca,_0x418afd,_0x3d330a,_0x4533e0),this[_0x40d5f8(0x41c)](_0x418afd,_0xb86f81[_0x40d5f8(0x162)]['bind'](this,_0x4533e0));}}}else return'';}},Scene_Base['prototype'][_0x479088(0x50a)]=function(){return'';},Scene_Base['prototype'][_0x479088(0x75e)]=function(){return'';},Scene_Base['prototype']['buttonAssistText4']=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x479088(0x6e6)][_0x479088(0x305)]=function(){const _0x1c98e4=_0x479088;return TextManager[_0x1c98e4(0x664)];},Scene_Base[_0x479088(0x6e6)]['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x479088(0x6e6)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x479088(0x6e6)][_0x479088(0x6fa)]=function(){return 0x0;},Scene_Base[_0x479088(0x6e6)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base['prototype'][_0x479088(0x483)]=function(){return 0x0;},VisuMZ[_0x479088(0x676)][_0x479088(0x262)]=Scene_Boot[_0x479088(0x6e6)][_0x479088(0x191)],Scene_Boot[_0x479088(0x6e6)][_0x479088(0x191)]=function(){const _0xb54c9c=_0x479088;VisuMZ['CoreEngine'][_0xb54c9c(0x262)][_0xb54c9c(0x4c7)](this),this[_0xb54c9c(0x38a)]();},Scene_Boot[_0x479088(0x6e6)]['loadGameImagesCoreEngine']=function(){const _0x5ebaab=_0x479088,_0x872b88=[_0x5ebaab(0x39c),_0x5ebaab(0x3e7),_0x5ebaab(0x679),_0x5ebaab(0x3b2),_0x5ebaab(0x435),'faces','parallaxes',_0x5ebaab(0x758),_0x5ebaab(0x785),'sv_enemies',_0x5ebaab(0x6f5),_0x5ebaab(0x24a),_0x5ebaab(0x718),_0x5ebaab(0x396)];for(const _0x1bb124 of _0x872b88){const _0x235750=VisuMZ[_0x5ebaab(0x676)]['Settings'][_0x5ebaab(0x489)][_0x1bb124],_0x5badaa='img/%1/'[_0x5ebaab(0x50d)](_0x1bb124);for(const _0x43f101 of _0x235750){ImageManager['loadBitmap'](_0x5badaa,_0x43f101);}}},VisuMZ['CoreEngine'][_0x479088(0x2a8)]=Scene_Boot[_0x479088(0x6e6)][_0x479088(0x72d)],Scene_Boot[_0x479088(0x6e6)]['startNormalGame']=function(){const _0x525d25=_0x479088;if(Utils[_0x525d25(0x4e2)](_0x525d25(0x434))&&VisuMZ[_0x525d25(0x676)][_0x525d25(0x502)]['QoL'][_0x525d25(0x1f8)])this['startAutoNewGame']();else{if(_0x525d25(0x4f0)===_0x525d25(0x4f0))VisuMZ[_0x525d25(0x676)][_0x525d25(0x2a8)][_0x525d25(0x4c7)](this);else{function _0x1d4064(){const _0x2a1714=_0x525d25;if(!this['isMenuButtonAssistEnabled']())return;const _0x57e518=this[_0x2a1714(0x192)]();this[_0x2a1714(0x160)]=new _0xfe294c(_0x57e518),this[_0x2a1714(0x745)](this[_0x2a1714(0x160)]);}}}},Scene_Boot[_0x479088(0x6e6)][_0x479088(0x4a7)]=function(){const _0x43c788=_0x479088;DataManager['setupNewGame'](),SceneManager[_0x43c788(0x228)](Scene_Map);},Scene_Boot[_0x479088(0x6e6)][_0x479088(0x674)]=function(){const _0x54f054=_0x479088,_0x6f7995=$dataSystem[_0x54f054(0x322)][_0x54f054(0x6e3)],_0xebd72f=$dataSystem[_0x54f054(0x322)][_0x54f054(0x66b)],_0x534abe=VisuMZ[_0x54f054(0x676)][_0x54f054(0x502)]['UI'][_0x54f054(0x74e)];Graphics['boxWidth']=_0x6f7995-_0x534abe*0x2,Graphics[_0x54f054(0x77a)]=_0xebd72f-_0x534abe*0x2,this[_0x54f054(0x34a)]();},VisuMZ[_0x479088(0x676)][_0x479088(0x5cf)]=Scene_Boot[_0x479088(0x6e6)][_0x479088(0x2e5)],Scene_Boot[_0x479088(0x6e6)][_0x479088(0x2e5)]=function(){const _0x1117c0=_0x479088;this[_0x1117c0(0x650)]()?this['makeDocumentTitle']():VisuMZ[_0x1117c0(0x676)][_0x1117c0(0x5cf)][_0x1117c0(0x4c7)](this);},Scene_Boot[_0x479088(0x6e6)][_0x479088(0x650)]=function(){const _0xd26c86=_0x479088;if(Scene_Title['subtitle']==='')return![];if(Scene_Title['subtitle']==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0xd26c86(0x710)]===_0xd26c86(0x1d2))return![];return!![];},Scene_Boot[_0x479088(0x6e6)][_0x479088(0x626)]=function(){const _0x33933c=_0x479088,_0x170ce7=$dataSystem['gameTitle'],_0xf9d169=Scene_Title[_0x33933c(0x637)]||'',_0x388fce=Scene_Title[_0x33933c(0x710)]||'',_0x2aae47=VisuMZ[_0x33933c(0x676)]['Settings'][_0x33933c(0x384)][_0x33933c(0x56c)][_0x33933c(0x4e9)],_0x23bfac=_0x2aae47['format'](_0x170ce7,_0xf9d169,_0x388fce);document[_0x33933c(0x226)]=_0x23bfac;},Scene_Boot[_0x479088(0x6e6)][_0x479088(0x34a)]=function(){const _0xa1a880=_0x479088;if(VisuMZ[_0xa1a880(0x676)]['Settings']['UI'][_0xa1a880(0x5fd)]){if(_0xa1a880(0x79d)===_0xa1a880(0x593)){function _0x4f945b(){const _0x19f15e=_0xa1a880;if(_0x36b43a[_0x19f15e(0x612)]())return;_0x3748ab[_0x19f15e(0x332)](_0x1ad129,_0x143b92);const _0x10e9c8=_0x51e376[_0x19f15e(0x583)];if(_0x10e9c8[_0x19f15e(0x7cd)](/Front/i))_0x2c843d['setSideView'](![]);else _0x10e9c8[_0x19f15e(0x7cd)](/Side/i)?_0x45c612[_0x19f15e(0x6b3)](!![]):_0x2317a1[_0x19f15e(0x6b3)](!_0x46f303[_0x19f15e(0x57e)]());}}else{const _0x2f4e47=Graphics[_0xa1a880(0x7bc)]-Graphics['boxWidth']-VisuMZ['CoreEngine'][_0xa1a880(0x502)]['UI']['BoxMargin']*0x2,_0x772368=Sprite_Button['prototype'][_0xa1a880(0x2f2)][_0xa1a880(0x4c7)](this)*0x4;if(_0x2f4e47>=_0x772368)SceneManager[_0xa1a880(0x432)](!![]);}}},Scene_Title['subtitle']=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x56c)][_0x479088(0x6f9)],Scene_Title[_0x479088(0x710)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x56c)][_0x479088(0x4ec)],Scene_Title[_0x479088(0x673)]=VisuMZ[_0x479088(0x676)]['Settings']['TitlePicButtons'],VisuMZ[_0x479088(0x676)][_0x479088(0x5f6)]=Scene_Title['prototype'][_0x479088(0x5a1)],Scene_Title[_0x479088(0x6e6)][_0x479088(0x5a1)]=function(){const _0x47d9f2=_0x479088;VisuMZ[_0x47d9f2(0x676)][_0x47d9f2(0x502)][_0x47d9f2(0x384)][_0x47d9f2(0x56c)]['drawGameTitle'][_0x47d9f2(0x4c7)](this);if(Scene_Title[_0x47d9f2(0x637)]!==''&&Scene_Title[_0x47d9f2(0x637)]!==_0x47d9f2(0x6f9))this[_0x47d9f2(0x7af)]();if(Scene_Title[_0x47d9f2(0x710)]!==''&&Scene_Title[_0x47d9f2(0x710)]!==_0x47d9f2(0x1d2))this['drawGameVersion']();},Scene_Title['prototype'][_0x479088(0x7af)]=function(){const _0x9082a2=_0x479088;VisuMZ[_0x9082a2(0x676)][_0x9082a2(0x502)]['MenuLayout'][_0x9082a2(0x56c)][_0x9082a2(0x7af)][_0x9082a2(0x4c7)](this);},Scene_Title[_0x479088(0x6e6)][_0x479088(0x521)]=function(){const _0x30fc20=_0x479088;VisuMZ['CoreEngine'][_0x30fc20(0x502)]['MenuLayout'][_0x30fc20(0x56c)][_0x30fc20(0x521)][_0x30fc20(0x4c7)](this);},Scene_Title[_0x479088(0x6e6)]['createCommandWindow']=function(){const _0x115b3b=_0x479088;this['createTitleButtons']();const _0x3cb1cd=$dataSystem[_0x115b3b(0x6a8)][_0x115b3b(0x1e9)],_0xed023c=this[_0x115b3b(0x271)]();this['_commandWindow']=new Window_TitleCommand(_0xed023c),this[_0x115b3b(0x1c7)][_0x115b3b(0x516)](_0x3cb1cd);const _0x42938f=this[_0x115b3b(0x271)]();this[_0x115b3b(0x1c7)]['move'](_0x42938f['x'],_0x42938f['y'],_0x42938f['width'],_0x42938f['height']),this[_0x115b3b(0x745)](this[_0x115b3b(0x1c7)]);},Scene_Title[_0x479088(0x6e6)]['commandWindowRows']=function(){const _0x142916=_0x479088;return this['_commandWindow']?this['_commandWindow']['maxItems']():VisuMZ[_0x142916(0x676)][_0x142916(0x502)][_0x142916(0x6f2)]['length'];},Scene_Title[_0x479088(0x6e6)]['commandWindowRect']=function(){const _0x2a49d2=_0x479088;return VisuMZ[_0x2a49d2(0x676)]['Settings']['MenuLayout'][_0x2a49d2(0x56c)][_0x2a49d2(0x38c)][_0x2a49d2(0x4c7)](this);},Scene_Title[_0x479088(0x6e6)][_0x479088(0x26c)]=function(){const _0x2effa0=_0x479088;for(const _0x24317b of Scene_Title[_0x2effa0(0x673)]){const _0x4c26bd=new Sprite_TitlePictureButton(_0x24317b);this[_0x2effa0(0x1e4)](_0x4c26bd);}},VisuMZ['CoreEngine'][_0x479088(0x247)]=Scene_Map[_0x479088(0x6e6)]['initialize'],Scene_Map[_0x479088(0x6e6)][_0x479088(0x65b)]=function(){const _0x205576=_0x479088;VisuMZ[_0x205576(0x676)][_0x205576(0x247)][_0x205576(0x4c7)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine']();},VisuMZ[_0x479088(0x676)][_0x479088(0x7a4)]=Scene_Map[_0x479088(0x6e6)][_0x479088(0x364)],Scene_Map[_0x479088(0x6e6)][_0x479088(0x364)]=function(){const _0x9d9cd0=_0x479088;VisuMZ['CoreEngine'][_0x9d9cd0(0x7a4)][_0x9d9cd0(0x4c7)](this),$gameTemp[_0x9d9cd0(0x2ff)]&&!$gameMessage[_0x9d9cd0(0x7b4)]()&&(this['updateMain'](),SceneManager[_0x9d9cd0(0x403)]());},Scene_Map['prototype'][_0x479088(0x7e2)]=function(){const _0x58d6e2=_0x479088;Scene_Message[_0x58d6e2(0x6e6)]['terminate'][_0x58d6e2(0x4c7)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x58d6e2(0x264)][_0x58d6e2(0x607)](),this[_0x58d6e2(0x1af)][_0x58d6e2(0x152)](),this[_0x58d6e2(0x2be)]['visible']=![],SceneManager['snapForBackground']()),$gameScreen[_0x58d6e2(0x2b1)]();},VisuMZ[_0x479088(0x676)][_0x479088(0x799)]=Scene_Map[_0x479088(0x6e6)][_0x479088(0x44b)],Scene_Map[_0x479088(0x6e6)]['createMenuButton']=function(){const _0x269c4a=_0x479088;VisuMZ['CoreEngine']['Scene_Map_createMenuButton'][_0x269c4a(0x4c7)](this),SceneManager[_0x269c4a(0x372)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x479088(0x6e6)][_0x479088(0x20b)]=function(){const _0x44cbbb=_0x479088;this[_0x44cbbb(0x42b)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x479088(0x676)][_0x479088(0x153)]=Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x7e6)],Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x7e6)]=function(){const _0x34ec11=_0x479088;let _0x5467d9=0x0;return SceneManager[_0x34ec11(0x3e4)]()?_0x5467d9=this['helpAreaTopSideButtonLayout']():_0x5467d9=VisuMZ[_0x34ec11(0x676)][_0x34ec11(0x153)][_0x34ec11(0x4c7)](this),this[_0x34ec11(0x4e4)]()&&this[_0x34ec11(0x625)]()===_0x34ec11(0x2a5)&&(_0x5467d9+=Window_ButtonAssist[_0x34ec11(0x6e6)][_0x34ec11(0x760)]()),_0x5467d9;},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x470)]=function(){const _0x49912f=_0x479088;if(this[_0x49912f(0x171)]()){if('LxuyQ'!=='LxuyQ'){function _0x2e4c65(){const _0x3f00bb=_0x49912f;return this['enemy']()[_0x3f00bb(0x28c)];}}else return this[_0x49912f(0x252)]();}else{if(_0x49912f(0x563)!==_0x49912f(0x563)){function _0x515f63(){const _0x1ef54b=_0x49912f;_0x31e16b['log'](_0x3b6cd3,_0x5171ea),_0x380503[_0x1ef54b(0x3af)](_0x3f71c1,_0x3fd4ff);}}else return 0x0;}},VisuMZ[_0x479088(0x676)][_0x479088(0x1a5)]=Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x6c1)],Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x6c1)]=function(){const _0x38a43d=_0x479088;if(SceneManager[_0x38a43d(0x3e4)]()){if(_0x38a43d(0x375)===_0x38a43d(0x375))return this['mainAreaTopSideButtonLayout']();else{function _0xfbf7fe(){var _0x974b2b=_0x4a3e15(_0x2a8d13['$1'])/0x64;_0x3b667e*=_0x974b2b;}}}else return VisuMZ[_0x38a43d(0x676)][_0x38a43d(0x1a5)]['call'](this);},Scene_MenuBase[_0x479088(0x6e6)]['mainAreaTopSideButtonLayout']=function(){const _0x26e1ec=_0x479088;if(!this[_0x26e1ec(0x171)]())return this[_0x26e1ec(0x797)]();else{if(_0x26e1ec(0x3e6)===_0x26e1ec(0x3e6))return 0x0;else{function _0x479afa(){const _0x11ac23=_0x26e1ec,_0x230121=_0x49a4ed[_0x11ac23(0x4c7)](this);return _0xb5f591==='integer'?_0x26126d[_0x11ac23(0x786)](_0x230121):_0x230121;}}}},VisuMZ[_0x479088(0x676)][_0x479088(0x74a)]=Scene_MenuBase[_0x479088(0x6e6)]['mainAreaHeight'],Scene_MenuBase['prototype']['mainAreaHeight']=function(){const _0x592e38=_0x479088;let _0x4ae030=0x0;return SceneManager[_0x592e38(0x3e4)]()?_0x4ae030=this[_0x592e38(0x7bd)]():_0x4ae030=VisuMZ[_0x592e38(0x676)][_0x592e38(0x74a)]['call'](this),this[_0x592e38(0x4e4)]()&&this[_0x592e38(0x625)]()!=='button'&&(_0x4ae030-=Window_ButtonAssist['prototype'][_0x592e38(0x760)]()),_0x4ae030;},Scene_MenuBase[_0x479088(0x6e6)]['mainAreaHeightSideButtonLayout']=function(){return Graphics['boxHeight']-this['helpAreaHeight']();},VisuMZ[_0x479088(0x676)][_0x479088(0x47c)]=Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x7ec)],Scene_MenuBase[_0x479088(0x6e6)]['createBackground']=function(){const _0xfd7fb7=_0x479088;this[_0xfd7fb7(0x4e5)]=new PIXI[(_0xfd7fb7(0x756))]['BlurFilter'](clamp=!![]),this[_0xfd7fb7(0x4dc)]=new Sprite(),this['_backgroundSprite'][_0xfd7fb7(0x221)]=SceneManager[_0xfd7fb7(0x269)](),this[_0xfd7fb7(0x4dc)][_0xfd7fb7(0x756)]=[this[_0xfd7fb7(0x4e5)]],this['addChild'](this[_0xfd7fb7(0x4dc)]),this[_0xfd7fb7(0x3c6)](0xc0),this[_0xfd7fb7(0x3c6)](this['getBackgroundOpacity']()),this[_0xfd7fb7(0x50e)]();},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x32e)]=function(){const _0x363104=_0x479088,_0x40c66c=String(this[_0x363104(0x340)][_0x363104(0x735)]),_0x1cb006=this[_0x363104(0x208)](_0x40c66c);if(_0x1cb006){if('DapIx'==='DapIx')return _0x1cb006[_0x363104(0x363)];else{function _0x2081df(){const _0x376c99=_0x363104;if(this[_0x376c99(0x7b9)]===_0x376c99(0x2df)&&!_0x14d74a['isArrowPressed']())return;if(_0x2e818c[_0x376c99(0x5f8)]())return;_0x2b25d8[_0x376c99(0x676)]['Window_NameInput_cursorUp'][_0x376c99(0x4c7)](this,_0x17d9d4),this['switchModes'](_0x376c99(0x2de));}}}else return 0xc0;},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x50e)]=function(){const _0x53d01f=_0x479088,_0x49b3b3=String(this[_0x53d01f(0x340)]['name']),_0x178d50=this[_0x53d01f(0x208)](_0x49b3b3);if(_0x178d50&&(_0x178d50['BgFilename1']!==''||_0x178d50[_0x53d01f(0x41e)]!=='')){if('nWUlj'!==_0x53d01f(0x6b7))this[_0x53d01f(0x23c)]=new Sprite(ImageManager[_0x53d01f(0x7ba)](_0x178d50['BgFilename1'])),this[_0x53d01f(0x26d)]=new Sprite(ImageManager['loadTitle2'](_0x178d50[_0x53d01f(0x41e)])),this[_0x53d01f(0x1e4)](this[_0x53d01f(0x23c)]),this[_0x53d01f(0x1e4)](this[_0x53d01f(0x26d)]),this['_backSprite1'][_0x53d01f(0x221)][_0x53d01f(0x5c0)](this[_0x53d01f(0x7a3)]['bind'](this,this[_0x53d01f(0x23c)])),this[_0x53d01f(0x26d)][_0x53d01f(0x221)]['addLoadListener'](this[_0x53d01f(0x7a3)]['bind'](this,this['_backSprite2']));else{function _0x6d9916(){const _0x1776f0=_0x53d01f;this['_commandWindow']&&this[_0x1776f0(0x1c7)][_0x1776f0(0x516)](_0x41e7e2[_0x1776f0(0x3e8)][_0x1776f0(0x742)]),this[_0x1776f0(0x5af)]&&this[_0x1776f0(0x5af)][_0x1776f0(0x516)](_0x2af8cf[_0x1776f0(0x3e8)]['GoldBgType']),this[_0x1776f0(0x503)]&&this['_statusWindow'][_0x1776f0(0x516)](_0x3bd35d[_0x1776f0(0x3e8)][_0x1776f0(0x5d5)]);}}}},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x208)]=function(_0x1a43d7){const _0x433d33=_0x479088;return VisuMZ[_0x433d33(0x676)][_0x433d33(0x502)]['MenuBg'][_0x1a43d7]||VisuMZ['CoreEngine'][_0x433d33(0x502)][_0x433d33(0x33d)][_0x433d33(0x72e)];},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x7a3)]=function(_0x2e1f4b){const _0x1ffd94=_0x479088;this[_0x1ffd94(0x704)](_0x2e1f4b),this[_0x1ffd94(0x35e)](_0x2e1f4b);},VisuMZ[_0x479088(0x676)][_0x479088(0x6ab)]=Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x51d)],Scene_MenuBase[_0x479088(0x6e6)]['createCancelButton']=function(){const _0x4970a5=_0x479088;VisuMZ[_0x4970a5(0x676)]['Scene_MenuBase_createCancelButton'][_0x4970a5(0x4c7)](this);if(SceneManager['isSideButtonLayout']()){if(_0x4970a5(0x5c5)!==_0x4970a5(0x5c5)){function _0x246e5a(){this['cursorPagedown']();}}else this['moveCancelButtonSideButtonLayout']();}},Scene_MenuBase[_0x479088(0x6e6)]['moveCancelButtonSideButtonLayout']=function(){const _0x489570=_0x479088;this[_0x489570(0x1ed)]['x']=Graphics[_0x489570(0x45e)]+0x4;},VisuMZ[_0x479088(0x676)][_0x479088(0x210)]=Scene_MenuBase[_0x479088(0x6e6)]['createPageButtons'],Scene_MenuBase[_0x479088(0x6e6)]['createPageButtons']=function(){const _0x1a16ab=_0x479088;VisuMZ[_0x1a16ab(0x676)][_0x1a16ab(0x210)]['call'](this),SceneManager[_0x1a16ab(0x372)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x2da)]=function(){const _0x237102=_0x479088;this['_pageupButton']['x']=-0x1*(this[_0x237102(0x29e)][_0x237102(0x7bc)]+this[_0x237102(0x490)][_0x237102(0x7bc)]+0x8),this[_0x237102(0x490)]['x']=-0x1*(this[_0x237102(0x490)][_0x237102(0x7bc)]+0x4);},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x4e4)]=function(){const _0x2d5baf=_0x479088;return VisuMZ['CoreEngine'][_0x2d5baf(0x502)][_0x2d5baf(0x6db)][_0x2d5baf(0x5eb)];},Scene_MenuBase['prototype'][_0x479088(0x625)]=function(){const _0x159389=_0x479088;if(SceneManager[_0x159389(0x372)]()||SceneManager['areButtonsHidden']())return VisuMZ['CoreEngine'][_0x159389(0x502)][_0x159389(0x6db)]['Location'];else{if(_0x159389(0x571)===_0x159389(0x3d6)){function _0x51c9d5(){const _0x4c1c9e=_0x159389;for(let _0x59b7f4=0x0;_0x59b7f4<this[_0x4c1c9e(0x180)]();_0x59b7f4++){const _0x3d897b=this['makeActionList']();let _0x11c74d=_0x3d12b2[_0x4c1c9e(0x433)];this[_0x4c1c9e(0x4b1)](_0x59b7f4,_0x3d897b[0x0]);for(const _0x1679ce of _0x3d897b){const _0x12dcd0=_0x1679ce[_0x4c1c9e(0x689)]();_0x12dcd0>_0x11c74d&&(_0x11c74d=_0x12dcd0,this[_0x4c1c9e(0x4b1)](_0x59b7f4,_0x1679ce));}}this[_0x4c1c9e(0x670)](_0x4c1c9e(0x220));}}else return _0x159389(0x3f9);}},Scene_MenuBase[_0x479088(0x6e6)]['createButtonAssistWindow']=function(){const _0xc5327d=_0x479088;if(!this[_0xc5327d(0x4e4)]())return;const _0x3037cd=this[_0xc5327d(0x192)]();this[_0xc5327d(0x160)]=new Window_ButtonAssist(_0x3037cd),this[_0xc5327d(0x745)](this[_0xc5327d(0x160)]);},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x192)]=function(){const _0x37b925=_0x479088;if(this[_0x37b925(0x625)]()===_0x37b925(0x3f9)){if(_0x37b925(0x58d)!=='lZNKe'){function _0x340180(){const _0x5cefc7=_0x37b925;var _0x168019=_0x488bad[_0x5cefc7(0x6d1)](_0x338aee*0x2,'inbounce')*0.5;}}else return this[_0x37b925(0x522)]();}else return this[_0x37b925(0x558)]();},Scene_MenuBase[_0x479088(0x6e6)][_0x479088(0x522)]=function(){const _0x55b659=_0x479088,_0x4a733f=ConfigManager[_0x55b659(0x184)]?(Sprite_Button['prototype']['blockWidth']()+0x6)*0x2:0x0,_0x48815f=this[_0x55b659(0x319)](),_0x319a12=Graphics['boxWidth']-_0x4a733f*0x2,_0x576b9c=this[_0x55b659(0x78d)]();return new Rectangle(_0x4a733f,_0x48815f,_0x319a12,_0x576b9c);},Scene_MenuBase['prototype'][_0x479088(0x558)]=function(){const _0x5726ac=_0x479088,_0x5e7ec5=Graphics[_0x5726ac(0x45e)],_0x31d855=Window_ButtonAssist[_0x5726ac(0x6e6)]['lineHeight'](),_0x7c89fb=0x0;let _0x17a632=0x0;if(this[_0x5726ac(0x625)]()==='top'){if(_0x5726ac(0x251)===_0x5726ac(0x251))_0x17a632=0x0;else{function _0xf82bbe(){const _0x18588d=_0x5726ac;this[_0x18588d(0x772)]='FV';}}}else{if(_0x5726ac(0x40a)===_0x5726ac(0x40a))_0x17a632=Graphics[_0x5726ac(0x77a)]-_0x31d855;else{function _0x20a5bf(){const _0xd77c8b=_0x5726ac;this[_0xd77c8b(0x5bc)]={},_0x27529d[_0xd77c8b(0x676)]['Game_BattlerBase_initMembers'][_0xd77c8b(0x4c7)](this);}}}return new Rectangle(_0x7c89fb,_0x17a632,_0x5e7ec5,_0x31d855);},Scene_Menu['layoutSettings']=VisuMZ['CoreEngine'][_0x479088(0x502)][_0x479088(0x384)]['MainMenu'],VisuMZ[_0x479088(0x676)]['Scene_Menu_create']=Scene_Menu[_0x479088(0x6e6)]['create'],Scene_Menu[_0x479088(0x6e6)][_0x479088(0x66e)]=function(){const _0x547b54=_0x479088;VisuMZ['CoreEngine'][_0x547b54(0x311)]['call'](this),this[_0x547b54(0x600)]();},Scene_Menu[_0x479088(0x6e6)][_0x479088(0x600)]=function(){const _0x32c570=_0x479088;this['_commandWindow']&&this[_0x32c570(0x1c7)]['setBackgroundType'](Scene_Menu['layoutSettings']['CommandBgType']);if(this[_0x32c570(0x5af)]){if(_0x32c570(0x33a)==='CNsDl'){function _0x50289d(){const _0x467a63=_0x32c570;return this['isItem'](_0x228cc7)&&_0x9a9cfb[_0x467a63(0x7a6)]===0x2;}}else this['_goldWindow']['setBackgroundType'](Scene_Menu[_0x32c570(0x3e8)]['GoldBgType']);}this[_0x32c570(0x503)]&&this[_0x32c570(0x503)][_0x32c570(0x516)](Scene_Menu[_0x32c570(0x3e8)][_0x32c570(0x5d5)]);},Scene_Menu['prototype'][_0x479088(0x271)]=function(){const _0x29f05a=_0x479088;return Scene_Menu[_0x29f05a(0x3e8)][_0x29f05a(0x38c)][_0x29f05a(0x4c7)](this);},Scene_Menu[_0x479088(0x6e6)][_0x479088(0x71e)]=function(){const _0x21cbf6=_0x479088;return Scene_Menu[_0x21cbf6(0x3e8)][_0x21cbf6(0x2ae)][_0x21cbf6(0x4c7)](this);},Scene_Menu[_0x479088(0x6e6)]['statusWindowRect']=function(){const _0x32a658=_0x479088;return Scene_Menu[_0x32a658(0x3e8)]['StatusRect'][_0x32a658(0x4c7)](this);},Scene_Item[_0x479088(0x3e8)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x662)],VisuMZ['CoreEngine'][_0x479088(0x75d)]=Scene_Item[_0x479088(0x6e6)]['create'],Scene_Item['prototype'][_0x479088(0x66e)]=function(){const _0x28a162=_0x479088;VisuMZ[_0x28a162(0x676)][_0x28a162(0x75d)][_0x28a162(0x4c7)](this),this[_0x28a162(0x600)]();},Scene_Item[_0x479088(0x6e6)]['setCoreEngineUpdateWindowBg']=function(){const _0x5502e9=_0x479088;this[_0x5502e9(0x73e)]&&this['_helpWindow']['setBackgroundType'](Scene_Item[_0x5502e9(0x3e8)][_0x5502e9(0x657)]);this['_categoryWindow']&&this[_0x5502e9(0x2d8)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x5502e9(0x4f1)]);if(this[_0x5502e9(0x6c0)]){if(_0x5502e9(0x2cf)==='FinMA'){function _0x208435(){const _0x5a67e8=_0x5502e9;_0x210eef[_0x5a67e8(0x18c)](),_0x3b2625[_0x5a67e8(0x228)](_0x92b032);}}else this[_0x5502e9(0x6c0)][_0x5502e9(0x516)](Scene_Item[_0x5502e9(0x3e8)][_0x5502e9(0x72f)]);}if(this['_actorWindow']){if('OPKjy'==='OPKjy')this[_0x5502e9(0x549)][_0x5502e9(0x516)](Scene_Item[_0x5502e9(0x3e8)][_0x5502e9(0x144)]);else{function _0x304c8c(){const _0x4e22fe=_0x5502e9;if(this['_movementDuration']<=0x0)return;const _0x93f3dc=this['_movementDuration'],_0x56e2fd=this[_0x4e22fe(0x7b3)],_0x1f885a=this[_0x4e22fe(0x3d0)];this['_offsetX']=this[_0x4e22fe(0x2f4)](this[_0x4e22fe(0x5b8)],this[_0x4e22fe(0x2e1)],_0x93f3dc,_0x56e2fd,_0x1f885a),this['_offsetY']=this[_0x4e22fe(0x2f4)](this[_0x4e22fe(0x38b)],this[_0x4e22fe(0x281)],_0x93f3dc,_0x56e2fd,_0x1f885a),this[_0x4e22fe(0x692)]--;if(this['_movementDuration']<=0x0)this[_0x4e22fe(0x416)]();}}}},Scene_Item[_0x479088(0x6e6)][_0x479088(0x506)]=function(){const _0x251e44=_0x479088;return Scene_Item[_0x251e44(0x3e8)][_0x251e44(0x6a0)][_0x251e44(0x4c7)](this);},Scene_Item[_0x479088(0x6e6)][_0x479088(0x155)]=function(){const _0x46bf7b=_0x479088;return Scene_Item[_0x46bf7b(0x3e8)][_0x46bf7b(0x2cc)]['call'](this);},Scene_Item['prototype']['itemWindowRect']=function(){const _0x5ad090=_0x479088;return Scene_Item[_0x5ad090(0x3e8)][_0x5ad090(0x219)][_0x5ad090(0x4c7)](this);},Scene_Item[_0x479088(0x6e6)]['actorWindowRect']=function(){const _0x4dfa1f=_0x479088;return Scene_Item['layoutSettings']['ActorRect'][_0x4dfa1f(0x4c7)](this);},Scene_Skill[_0x479088(0x3e8)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x479088(0x64f)],VisuMZ[_0x479088(0x676)][_0x479088(0x301)]=Scene_Skill[_0x479088(0x6e6)][_0x479088(0x66e)],Scene_Skill[_0x479088(0x6e6)][_0x479088(0x66e)]=function(){const _0x2da535=_0x479088;VisuMZ['CoreEngine'][_0x2da535(0x301)][_0x2da535(0x4c7)](this),this[_0x2da535(0x600)]();},Scene_Skill['prototype'][_0x479088(0x600)]=function(){const _0x2dabed=_0x479088;this['_helpWindow']&&this[_0x2dabed(0x73e)][_0x2dabed(0x516)](Scene_Skill[_0x2dabed(0x3e8)][_0x2dabed(0x657)]),this[_0x2dabed(0x158)]&&this['_skillTypeWindow']['setBackgroundType'](Scene_Skill[_0x2dabed(0x3e8)][_0x2dabed(0x5b6)]),this[_0x2dabed(0x503)]&&this[_0x2dabed(0x503)][_0x2dabed(0x516)](Scene_Skill[_0x2dabed(0x3e8)][_0x2dabed(0x5d5)]),this[_0x2dabed(0x6c0)]&&this[_0x2dabed(0x6c0)][_0x2dabed(0x516)](Scene_Skill[_0x2dabed(0x3e8)]['ItemBgType']),this[_0x2dabed(0x549)]&&this['_actorWindow'][_0x2dabed(0x516)](Scene_Skill[_0x2dabed(0x3e8)][_0x2dabed(0x144)]);},Scene_Skill[_0x479088(0x6e6)][_0x479088(0x506)]=function(){return Scene_Skill['layoutSettings']['HelpRect']['call'](this);},Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x1b363e=_0x479088;return Scene_Skill[_0x1b363e(0x3e8)][_0x1b363e(0x6cb)][_0x1b363e(0x4c7)](this);},Scene_Skill[_0x479088(0x6e6)]['statusWindowRect']=function(){const _0x3effc0=_0x479088;return Scene_Skill['layoutSettings']['StatusRect'][_0x3effc0(0x4c7)](this);},Scene_Skill[_0x479088(0x6e6)]['itemWindowRect']=function(){const _0x307db1=_0x479088;return Scene_Skill[_0x307db1(0x3e8)][_0x307db1(0x219)][_0x307db1(0x4c7)](this);},Scene_Skill[_0x479088(0x6e6)][_0x479088(0x2d6)]=function(){const _0x11b2c1=_0x479088;return Scene_Skill[_0x11b2c1(0x3e8)][_0x11b2c1(0x2b0)]['call'](this);},Scene_Equip[_0x479088(0x3e8)]=VisuMZ['CoreEngine'][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x2f1)],VisuMZ[_0x479088(0x676)][_0x479088(0x4fe)]=Scene_Equip[_0x479088(0x6e6)]['create'],Scene_Equip[_0x479088(0x6e6)][_0x479088(0x66e)]=function(){const _0x3ad4ec=_0x479088;VisuMZ[_0x3ad4ec(0x676)]['Scene_Equip_create'][_0x3ad4ec(0x4c7)](this),this[_0x3ad4ec(0x600)]();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x37aa34=_0x479088;this['_helpWindow']&&this[_0x37aa34(0x73e)][_0x37aa34(0x516)](Scene_Equip[_0x37aa34(0x3e8)][_0x37aa34(0x657)]);this['_statusWindow']&&this[_0x37aa34(0x503)][_0x37aa34(0x516)](Scene_Equip['layoutSettings'][_0x37aa34(0x5d5)]);if(this[_0x37aa34(0x1c7)]){if(_0x37aa34(0x238)===_0x37aa34(0x238))this['_commandWindow']['setBackgroundType'](Scene_Equip[_0x37aa34(0x3e8)][_0x37aa34(0x742)]);else{function _0x3b304a(){const _0x2ed46d=_0x37aa34,_0x41447a=this[_0x2ed46d(0x397)]();let _0xff5fa6=_0x55c68a[_0x2ed46d(0x433)];this[_0x2ed46d(0x4b1)](_0x5bcee7,_0x41447a[0x0]);for(const _0x1192b4 of _0x41447a){const _0x5cf0b0=_0x1192b4[_0x2ed46d(0x689)]();_0x5cf0b0>_0xff5fa6&&(_0xff5fa6=_0x5cf0b0,this[_0x2ed46d(0x4b1)](_0x57dc46,_0x1192b4));}}}}this[_0x37aa34(0x276)]&&this[_0x37aa34(0x276)][_0x37aa34(0x516)](Scene_Equip[_0x37aa34(0x3e8)][_0x37aa34(0x2ea)]),this['_itemWindow']&&this[_0x37aa34(0x6c0)][_0x37aa34(0x516)](Scene_Equip['layoutSettings'][_0x37aa34(0x72f)]);},Scene_Equip[_0x479088(0x6e6)]['helpWindowRect']=function(){const _0x435e89=_0x479088;return Scene_Equip[_0x435e89(0x3e8)][_0x435e89(0x6a0)][_0x435e89(0x4c7)](this);},Scene_Equip[_0x479088(0x6e6)][_0x479088(0x169)]=function(){const _0x1cfd1c=_0x479088;return Scene_Equip[_0x1cfd1c(0x3e8)][_0x1cfd1c(0x2cb)]['call'](this);},Scene_Equip[_0x479088(0x6e6)][_0x479088(0x271)]=function(){const _0x4b11fd=_0x479088;return Scene_Equip[_0x4b11fd(0x3e8)][_0x4b11fd(0x38c)][_0x4b11fd(0x4c7)](this);},Scene_Equip['prototype'][_0x479088(0x624)]=function(){const _0x1ab248=_0x479088;return Scene_Equip[_0x1ab248(0x3e8)][_0x1ab248(0x1c8)][_0x1ab248(0x4c7)](this);},Scene_Equip[_0x479088(0x6e6)][_0x479088(0x722)]=function(){const _0x333627=_0x479088;return Scene_Equip[_0x333627(0x3e8)]['ItemRect']['call'](this);},Scene_Status[_0x479088(0x3e8)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x275)],VisuMZ[_0x479088(0x676)][_0x479088(0x3a3)]=Scene_Status[_0x479088(0x6e6)][_0x479088(0x66e)],Scene_Status[_0x479088(0x6e6)][_0x479088(0x66e)]=function(){const _0x424b8f=_0x479088;VisuMZ[_0x424b8f(0x676)]['Scene_Status_create'][_0x424b8f(0x4c7)](this),this[_0x424b8f(0x600)]();},Scene_Status['prototype'][_0x479088(0x600)]=function(){const _0x29b0aa=_0x479088;if(this[_0x29b0aa(0x1be)]){if(_0x29b0aa(0x79f)===_0x29b0aa(0x2a6)){function _0x459b14(){const _0x4f1112=_0x29b0aa;_0x490b41[_0x4f1112(0x676)][_0x4f1112(0x502)][_0x4f1112(0x6da)][_0x4f1112(0x2a2)]&&(this[_0x4f1112(0x7ae)]=![]);}}else this[_0x29b0aa(0x1be)]['setBackgroundType'](Scene_Status[_0x29b0aa(0x3e8)][_0x29b0aa(0x446)]);}if(this[_0x29b0aa(0x503)]){if(_0x29b0aa(0x62c)===_0x29b0aa(0x447)){function _0x3f3fda(){var _0x165fc5=_0x1f0713(_0x85a75c['$1']);try{_0x332fd1+=_0x7aeea7(_0x165fc5);}catch(_0x399011){if(_0x55f0b8['isPlaytest']())_0x14f60d['log'](_0x399011);}}}else this[_0x29b0aa(0x503)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x29b0aa(0x5d5)]);}if(this['_statusParamsWindow']){if(_0x29b0aa(0x286)===_0x29b0aa(0x286))this['_statusParamsWindow'][_0x29b0aa(0x516)](Scene_Status['layoutSettings'][_0x29b0aa(0x1df)]);else{function _0x4ba959(){const _0x5de6be=_0x29b0aa;this[_0x5de6be(0x17a)](_0x357e80,_0x505a30+0x2,_0x332915+0x2),_0xda1f2c-=_0x2716e5[_0x5de6be(0x37b)]+0x4,_0x4c31bf+=_0x4a3bc0[_0x5de6be(0x37b)]+0x4;}}}this[_0x29b0aa(0x76f)]&&this['_statusEquipWindow']['setBackgroundType'](Scene_Status[_0x29b0aa(0x3e8)]['StatusEquipBgType']);},Scene_Status['prototype'][_0x479088(0x779)]=function(){const _0x14de76=_0x479088;return Scene_Status[_0x14de76(0x3e8)][_0x14de76(0x73f)][_0x14de76(0x4c7)](this);},Scene_Status[_0x479088(0x6e6)][_0x479088(0x169)]=function(){const _0x4515cf=_0x479088;return Scene_Status[_0x4515cf(0x3e8)][_0x4515cf(0x2cb)][_0x4515cf(0x4c7)](this);},Scene_Status[_0x479088(0x6e6)][_0x479088(0x529)]=function(){const _0x4cbad2=_0x479088;return Scene_Status['layoutSettings']['StatusParamsRect'][_0x4cbad2(0x4c7)](this);},Scene_Status['prototype'][_0x479088(0x194)]=function(){const _0x3bc2de=_0x479088;return Scene_Status['layoutSettings'][_0x3bc2de(0x3a8)][_0x3bc2de(0x4c7)](this);},Scene_Options[_0x479088(0x3e8)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x7f6)],VisuMZ['CoreEngine']['Scene_Options_create']=Scene_Options[_0x479088(0x6e6)][_0x479088(0x66e)],Scene_Options[_0x479088(0x6e6)][_0x479088(0x66e)]=function(){const _0x56baf2=_0x479088;VisuMZ[_0x56baf2(0x676)][_0x56baf2(0x715)][_0x56baf2(0x4c7)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype'][_0x479088(0x600)]=function(){const _0x2c352b=_0x479088;this[_0x2c352b(0x44c)]&&this[_0x2c352b(0x44c)][_0x2c352b(0x516)](Scene_Options[_0x2c352b(0x3e8)][_0x2c352b(0x630)]);},Scene_Options[_0x479088(0x6e6)][_0x479088(0x309)]=function(){const _0x40d82d=_0x479088;return Scene_Options[_0x40d82d(0x3e8)][_0x40d82d(0x29c)][_0x40d82d(0x4c7)](this);},Scene_Save[_0x479088(0x3e8)]=VisuMZ['CoreEngine'][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x66d)],Scene_Save[_0x479088(0x6e6)]['create']=function(){const _0x3a4686=_0x479088;Scene_File[_0x3a4686(0x6e6)]['create'][_0x3a4686(0x4c7)](this),this[_0x3a4686(0x600)]();},Scene_Save[_0x479088(0x6e6)]['setCoreEngineUpdateWindowBg']=function(){const _0x42a42f=_0x479088;this[_0x42a42f(0x73e)]&&this[_0x42a42f(0x73e)]['setBackgroundType'](Scene_Save['layoutSettings'][_0x42a42f(0x657)]);if(this[_0x42a42f(0x43b)]){if(_0x42a42f(0x51b)!==_0x42a42f(0x51b)){function _0x79c723(){const _0x336001=_0x42a42f;_0x209226['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']=_0x336001(0x31e));}}else this[_0x42a42f(0x43b)][_0x42a42f(0x516)](Scene_Save[_0x42a42f(0x3e8)]['ListBgType']);}},Scene_Save[_0x479088(0x6e6)][_0x479088(0x506)]=function(){const _0x1dba57=_0x479088;return Scene_Save[_0x1dba57(0x3e8)][_0x1dba57(0x6a0)][_0x1dba57(0x4c7)](this);},Scene_Save[_0x479088(0x6e6)]['listWindowRect']=function(){const _0x1d7ea7=_0x479088;return Scene_Save['layoutSettings']['ListRect'][_0x1d7ea7(0x4c7)](this);},Scene_Load[_0x479088(0x3e8)]=VisuMZ[_0x479088(0x676)]['Settings']['MenuLayout'][_0x479088(0x613)],Scene_Load[_0x479088(0x6e6)]['create']=function(){const _0x281376=_0x479088;Scene_File[_0x281376(0x6e6)][_0x281376(0x66e)][_0x281376(0x4c7)](this),this[_0x281376(0x600)]();},Scene_Load[_0x479088(0x6e6)]['setCoreEngineUpdateWindowBg']=function(){const _0x505e82=_0x479088;this[_0x505e82(0x73e)]&&this[_0x505e82(0x73e)][_0x505e82(0x516)](Scene_Load['layoutSettings'][_0x505e82(0x657)]),this['_listWindow']&&this[_0x505e82(0x43b)][_0x505e82(0x516)](Scene_Load[_0x505e82(0x3e8)][_0x505e82(0x5f9)]);},Scene_Load['prototype']['helpWindowRect']=function(){const _0x44f277=_0x479088;return Scene_Load[_0x44f277(0x3e8)][_0x44f277(0x6a0)]['call'](this);},Scene_Load[_0x479088(0x6e6)][_0x479088(0x3de)]=function(){const _0x2c2f37=_0x479088;return Scene_Load['layoutSettings']['ListRect'][_0x2c2f37(0x4c7)](this);},Scene_GameEnd[_0x479088(0x3e8)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x1a3)],VisuMZ['CoreEngine'][_0x479088(0x2e6)]=Scene_GameEnd[_0x479088(0x6e6)][_0x479088(0x7ec)],Scene_GameEnd[_0x479088(0x6e6)][_0x479088(0x7ec)]=function(){const _0x55e636=_0x479088;Scene_MenuBase[_0x55e636(0x6e6)]['createBackground'][_0x55e636(0x4c7)](this);},Scene_GameEnd['prototype'][_0x479088(0x4bb)]=function(){const _0x5bb0b9=_0x479088,_0x984d7d=this[_0x5bb0b9(0x271)]();this[_0x5bb0b9(0x1c7)]=new Window_GameEnd(_0x984d7d),this[_0x5bb0b9(0x1c7)][_0x5bb0b9(0x41c)](_0x5bb0b9(0x33c),this[_0x5bb0b9(0x17b)][_0x5bb0b9(0x34b)](this)),this[_0x5bb0b9(0x745)](this[_0x5bb0b9(0x1c7)]),this[_0x5bb0b9(0x1c7)][_0x5bb0b9(0x516)](Scene_GameEnd[_0x5bb0b9(0x3e8)][_0x5bb0b9(0x742)]);},Scene_GameEnd['prototype'][_0x479088(0x271)]=function(){const _0x13846b=_0x479088;return Scene_GameEnd[_0x13846b(0x3e8)]['CommandRect'][_0x13846b(0x4c7)](this);},Scene_Shop[_0x479088(0x3e8)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)]['ShopMenu'],VisuMZ[_0x479088(0x676)][_0x479088(0x3fd)]=Scene_Shop[_0x479088(0x6e6)][_0x479088(0x66e)],Scene_Shop['prototype']['create']=function(){const _0x12d87e=_0x479088;VisuMZ[_0x12d87e(0x676)][_0x12d87e(0x3fd)][_0x12d87e(0x4c7)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x600)]=function(){const _0xc64fe3=_0x479088;this[_0xc64fe3(0x73e)]&&this['_helpWindow'][_0xc64fe3(0x516)](Scene_Shop[_0xc64fe3(0x3e8)][_0xc64fe3(0x657)]);if(this[_0xc64fe3(0x5af)]){if(_0xc64fe3(0x513)!==_0xc64fe3(0x513)){function _0x8c714e(){const _0x4d7302=_0xc64fe3;_0x11cb9e[_0x4d7302(0x676)][_0x4d7302(0x502)][_0x4d7302(0x384)]['Title']['drawGameVersion'][_0x4d7302(0x4c7)](this);}}else this[_0xc64fe3(0x5af)][_0xc64fe3(0x516)](Scene_Shop[_0xc64fe3(0x3e8)][_0xc64fe3(0x399)]);}this[_0xc64fe3(0x1c7)]&&this[_0xc64fe3(0x1c7)][_0xc64fe3(0x516)](Scene_Shop[_0xc64fe3(0x3e8)][_0xc64fe3(0x742)]);if(this['_dummyWindow']){if('QjACM'!==_0xc64fe3(0x4df))this[_0xc64fe3(0x359)][_0xc64fe3(0x516)](Scene_Shop['layoutSettings'][_0xc64fe3(0x6e5)]);else{function _0x1e6fb0(){const _0x142e6f=_0xc64fe3;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x142e6f(0x30d),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x142e6f(0x1ce)]['x'],'targetScaleY':this[_0x142e6f(0x1ce)]['y'],'targetOpacity':this[_0x142e6f(0x73a)],'targetBackOpacity':this[_0x142e6f(0x143)],'targetContentsOpacity':this[_0x142e6f(0x688)]};}}}this[_0xc64fe3(0x47a)]&&this[_0xc64fe3(0x47a)]['setBackgroundType'](Scene_Shop[_0xc64fe3(0x3e8)]['NumberBgType']);this[_0xc64fe3(0x503)]&&this[_0xc64fe3(0x503)][_0xc64fe3(0x516)](Scene_Shop[_0xc64fe3(0x3e8)][_0xc64fe3(0x5d5)]);if(this['_buyWindow']){if('JQcaR'==='JQcaR')this['_buyWindow'][_0xc64fe3(0x516)](Scene_Shop['layoutSettings']['BuyBgType']);else{function _0x41dc09(){const _0x46118f=_0xc64fe3;return _0x2a4443[_0x46118f(0x664)];}}}if(this[_0xc64fe3(0x2d8)]){if('SBpoh'!==_0xc64fe3(0x429))this['_categoryWindow'][_0xc64fe3(0x516)](Scene_Shop[_0xc64fe3(0x3e8)][_0xc64fe3(0x4f1)]);else{function _0x5396e8(){this['_clickHandler']=_0x498fc4;}}}if(this['_sellWindow']){if(_0xc64fe3(0x18e)!==_0xc64fe3(0x682))this['_sellWindow']['setBackgroundType'](Scene_Shop[_0xc64fe3(0x3e8)][_0xc64fe3(0x487)]);else{function _0x25b04a(){const _0x2149c4=_0xc64fe3;return _0x45a73c[_0x2149c4(0x3e8)]['StatusRect'][_0x2149c4(0x4c7)](this);}}}},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x506)]=function(){const _0x44d93f=_0x479088;return Scene_Shop[_0x44d93f(0x3e8)][_0x44d93f(0x6a0)]['call'](this);},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x71e)]=function(){const _0x1858a2=_0x479088;return Scene_Shop[_0x1858a2(0x3e8)][_0x1858a2(0x2ae)][_0x1858a2(0x4c7)](this);},Scene_Shop['prototype'][_0x479088(0x271)]=function(){const _0x10cb80=_0x479088;return Scene_Shop[_0x10cb80(0x3e8)][_0x10cb80(0x38c)]['call'](this);},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x19e)]=function(){const _0x460f0a=_0x479088;return Scene_Shop[_0x460f0a(0x3e8)][_0x460f0a(0x6bf)][_0x460f0a(0x4c7)](this);},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x5f0)]=function(){const _0x10b649=_0x479088;return Scene_Shop[_0x10b649(0x3e8)][_0x10b649(0x5a4)][_0x10b649(0x4c7)](this);},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x169)]=function(){const _0x2bd70c=_0x479088;return Scene_Shop['layoutSettings']['StatusRect'][_0x2bd70c(0x4c7)](this);},Scene_Shop['prototype'][_0x479088(0x246)]=function(){const _0x151e8c=_0x479088;return Scene_Shop[_0x151e8c(0x3e8)][_0x151e8c(0x7b6)][_0x151e8c(0x4c7)](this);},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x155)]=function(){const _0x18afca=_0x479088;return Scene_Shop[_0x18afca(0x3e8)][_0x18afca(0x2cc)][_0x18afca(0x4c7)](this);},Scene_Shop[_0x479088(0x6e6)][_0x479088(0x707)]=function(){const _0x3c923c=_0x479088;return Scene_Shop[_0x3c923c(0x3e8)][_0x3c923c(0x7c5)]['call'](this);},Scene_Name[_0x479088(0x3e8)]=VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x384)][_0x479088(0x18f)],VisuMZ[_0x479088(0x676)][_0x479088(0x28f)]=Scene_Name[_0x479088(0x6e6)][_0x479088(0x66e)],Scene_Name[_0x479088(0x6e6)][_0x479088(0x66e)]=function(){const _0x95396e=_0x479088;VisuMZ['CoreEngine'][_0x95396e(0x28f)]['call'](this),this[_0x95396e(0x600)]();},Scene_Name['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x33606c=_0x479088;if(this[_0x33606c(0x32c)]){if(_0x33606c(0x36f)===_0x33606c(0x540)){function _0x688da8(){return _0x5b5458['eva'];}}else this[_0x33606c(0x32c)][_0x33606c(0x516)](Scene_Name[_0x33606c(0x3e8)]['EditBgType']);}if(this['_inputWindow']){if(_0x33606c(0x327)!==_0x33606c(0x385))this[_0x33606c(0x223)]['setBackgroundType'](Scene_Name[_0x33606c(0x3e8)][_0x33606c(0x1ca)]);else{function _0x292295(){const _0x4ed368=_0x33606c;_0x55eda3[_0x4ed368(0x676)][_0x4ed368(0x4a4)][_0x4ed368(0x4c7)](this,_0x2ed5fc);}}}},Scene_Name[_0x479088(0x6e6)][_0x479088(0x189)]=function(){return 0x0;},Scene_Name[_0x479088(0x6e6)][_0x479088(0x582)]=function(){const _0x4fe2fa=_0x479088;return Scene_Name[_0x4fe2fa(0x3e8)][_0x4fe2fa(0x2fb)][_0x4fe2fa(0x4c7)](this);},Scene_Name[_0x479088(0x6e6)][_0x479088(0x70c)]=function(){const _0x18a34b=_0x479088;return Scene_Name['layoutSettings'][_0x18a34b(0x703)][_0x18a34b(0x4c7)](this);},Scene_Name[_0x479088(0x6e6)]['EnableNameInput']=function(){const _0x8e176a=_0x479088;if(!this[_0x8e176a(0x223)])return![];return VisuMZ[_0x8e176a(0x676)][_0x8e176a(0x502)][_0x8e176a(0x373)][_0x8e176a(0x49a)];},Scene_Name[_0x479088(0x6e6)][_0x479088(0x3ed)]=function(){const _0x11ba98=_0x479088;if(this['EnableNameInput']()){if(_0x11ba98(0x73d)===_0x11ba98(0x3b1)){function _0x2bdecf(){const _0x2e0fac=_0x11ba98;if(_0x5ef58a)this[_0x2e0fac(0x719)](_0x2de34a);_0x1fd139[_0x2e0fac(0x676)]['SceneManager_onKeyDown'][_0x2e0fac(0x4c7)](this,_0x434ca9);}}else{if(this[_0x11ba98(0x223)][_0x11ba98(0x7b9)]===_0x11ba98(0x2df))return TextManager[_0x11ba98(0x26a)](_0x11ba98(0x5ac),'right');else{if(_0x11ba98(0x34f)===_0x11ba98(0x34f))return TextManager[_0x11ba98(0x421)](_0x11ba98(0x1d0));else{function _0x5b2127(){const _0x3b179d=_0x11ba98;this[_0x3b179d(0x1f2)]((_0x16deba+_0x2a1a6e)%_0x429ef0);}}}}}else return Scene_MenuBase[_0x11ba98(0x6e6)][_0x11ba98(0x3ed)][_0x11ba98(0x4c7)](this);},Scene_Name['prototype'][_0x479088(0x7ac)]=function(){const _0x1df92c=_0x479088;if(this[_0x1df92c(0x49a)]()){if(_0x1df92c(0x5ad)!==_0x1df92c(0x5ad)){function _0x1d5d3b(){const _0xcf7bf=_0x1df92c;this[_0xcf7bf(0x4cb)]>0x0&&(this['_anchor']['x']=this[_0xcf7bf(0x2f4)](this[_0xcf7bf(0x48e)]['x'],this[_0xcf7bf(0x1a4)]['x']),this[_0xcf7bf(0x48e)]['y']=this[_0xcf7bf(0x2f4)](this['_anchor']['y'],this[_0xcf7bf(0x1a4)]['y']));}}else{const _0x11eb46=VisuMZ[_0x1df92c(0x676)][_0x1df92c(0x502)][_0x1df92c(0x373)];return this[_0x1df92c(0x223)][_0x1df92c(0x7b9)]===_0x1df92c(0x2df)?_0x11eb46[_0x1df92c(0x15e)]||'Keyboard':_0x11eb46[_0x1df92c(0x5c7)]||'Manual';}}else return Scene_MenuBase['prototype'][_0x1df92c(0x7ac)]['call'](this);},VisuMZ[_0x479088(0x676)][_0x479088(0x6de)]=Scene_Battle[_0x479088(0x6e6)][_0x479088(0x607)],Scene_Battle[_0x479088(0x6e6)][_0x479088(0x607)]=function(){const _0x25a253=_0x479088;VisuMZ[_0x25a253(0x676)][_0x25a253(0x6de)][_0x25a253(0x4c7)](this);if($gameTemp['_playTestFastMode'])this[_0x25a253(0x784)]();},Scene_Battle['prototype'][_0x479088(0x784)]=function(){const _0x10ff7f=_0x479088;!BattleManager[_0x10ff7f(0x643)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x10ff7f(0x7b4)]()&&(this['_playtestF7Looping']=!![],this[_0x10ff7f(0x607)](),SceneManager[_0x10ff7f(0x403)](),this[_0x10ff7f(0x695)]=![]);},VisuMZ[_0x479088(0x676)][_0x479088(0x739)]=Scene_Battle[_0x479088(0x6e6)][_0x479088(0x51d)],Scene_Battle[_0x479088(0x6e6)][_0x479088(0x51d)]=function(){const _0x46f394=_0x479088;VisuMZ['CoreEngine'][_0x46f394(0x739)]['call'](this),SceneManager[_0x46f394(0x372)]()&&this[_0x46f394(0x5ce)]();},Scene_Battle[_0x479088(0x6e6)][_0x479088(0x5ce)]=function(){const _0x201efa=_0x479088;this['_cancelButton']['x']=Graphics[_0x201efa(0x45e)]+0x4;if(this[_0x201efa(0x441)]())this[_0x201efa(0x1ed)]['y']=Graphics[_0x201efa(0x77a)]-this[_0x201efa(0x78d)]();else{if(_0x201efa(0x769)!==_0x201efa(0x585))this[_0x201efa(0x1ed)]['y']=0x0;else{function _0x4f2fc4(){const _0x5a4ba3=_0x201efa;return _0x41747a[_0x5a4ba3(0x3e8)][_0x5a4ba3(0x2b0)]['call'](this);}}}},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x479088(0x6e6)][_0x479088(0x65b)],Sprite_Button['prototype']['initialize']=function(_0x2474e3){const _0x539f5f=_0x479088;VisuMZ[_0x539f5f(0x676)][_0x539f5f(0x76d)]['call'](this,_0x2474e3),this[_0x539f5f(0x1f0)]();},Sprite_Button[_0x479088(0x6e6)][_0x479088(0x1f0)]=function(){const _0x43d8e3=_0x479088,_0xed3b55=VisuMZ['CoreEngine']['Settings']['UI'];this[_0x43d8e3(0x15c)]=![];switch(this[_0x43d8e3(0x1d5)]){case'cancel':this['_isButtonHidden']=!_0xed3b55[_0x43d8e3(0x66f)];break;case _0x43d8e3(0x721):case _0x43d8e3(0x5a8):this[_0x43d8e3(0x15c)]=!_0xed3b55[_0x43d8e3(0x2e0)];break;case _0x43d8e3(0x2dd):case'up':case _0x43d8e3(0x7f4):case _0x43d8e3(0x631):case'ok':this[_0x43d8e3(0x15c)]=!_0xed3b55[_0x43d8e3(0x641)];break;case _0x43d8e3(0x759):this[_0x43d8e3(0x15c)]=!_0xed3b55[_0x43d8e3(0x56d)];break;}},VisuMZ[_0x479088(0x676)][_0x479088(0x2b2)]=Sprite_Button[_0x479088(0x6e6)]['updateOpacity'],Sprite_Button[_0x479088(0x6e6)]['updateOpacity']=function(){const _0x35a7b5=_0x479088;if(SceneManager['areButtonsHidden']()||this[_0x35a7b5(0x15c)]){if(_0x35a7b5(0x556)===_0x35a7b5(0x52c)){function _0x233b59(){const _0x40a261=_0x35a7b5;this[_0x40a261(0x6c0)][_0x40a261(0x516)](_0x2dee55[_0x40a261(0x3e8)][_0x40a261(0x72f)]);}}else this[_0x35a7b5(0x18d)]();}else VisuMZ[_0x35a7b5(0x676)][_0x35a7b5(0x2b2)][_0x35a7b5(0x4c7)](this);},Sprite_Button[_0x479088(0x6e6)][_0x479088(0x18d)]=function(){const _0x156577=_0x479088;this['visible']=![],this[_0x156577(0x73a)]=0x0,this['x']=Graphics[_0x156577(0x7bc)]*0xa,this['y']=Graphics[_0x156577(0x5de)]*0xa;},VisuMZ[_0x479088(0x676)][_0x479088(0x331)]=Sprite_Battler[_0x479088(0x6e6)][_0x479088(0x6d5)],Sprite_Battler[_0x479088(0x6e6)][_0x479088(0x6d5)]=function(_0x3c68ea,_0x2dd372,_0x1b746a){const _0xce19b7=_0x479088;if(this[_0xce19b7(0x2e1)]!==_0x3c68ea||this[_0xce19b7(0x281)]!==_0x2dd372){if(_0xce19b7(0x7f0)!==_0xce19b7(0x7f0)){function _0x4b05d1(){const _0x2e5f04=_0xce19b7;_0x52af9e['CoreEngine'][_0x2e5f04(0x4de)][_0x2e5f04(0x4c7)](this),this[_0x2e5f04(0x1cc)]();}}else this[_0xce19b7(0x2d3)]('Linear'),this[_0xce19b7(0x7b3)]=_0x1b746a;}VisuMZ['CoreEngine'][_0xce19b7(0x331)][_0xce19b7(0x4c7)](this,_0x3c68ea,_0x2dd372,_0x1b746a);},Sprite_Battler[_0x479088(0x6e6)][_0x479088(0x2d3)]=function(_0x24f973){this['_moveEasingType']=_0x24f973;},Sprite_Battler[_0x479088(0x6e6)]['updateMove']=function(){const _0x248441=_0x479088;if(this['_movementDuration']<=0x0)return;const _0x3e66e9=this[_0x248441(0x692)],_0x5de75e=this[_0x248441(0x7b3)],_0x12ff90=this[_0x248441(0x3d0)];this[_0x248441(0x5b8)]=this['applyEasing'](this[_0x248441(0x5b8)],this[_0x248441(0x2e1)],_0x3e66e9,_0x5de75e,_0x12ff90),this['_offsetY']=this[_0x248441(0x2f4)](this['_offsetY'],this['_targetOffsetY'],_0x3e66e9,_0x5de75e,_0x12ff90),this[_0x248441(0x692)]--;if(this['_movementDuration']<=0x0)this[_0x248441(0x416)]();},Sprite_Battler[_0x479088(0x6e6)][_0x479088(0x2f4)]=function(_0x309276,_0x3d5dbb,_0x2132c2,_0x5e54c6,_0x2a3bc9){const _0x4769e6=_0x479088,_0x3ef5c5=VisuMZ['ApplyEasing']((_0x5e54c6-_0x2132c2)/_0x5e54c6,_0x2a3bc9||_0x4769e6(0x67e)),_0x12b145=VisuMZ['ApplyEasing']((_0x5e54c6-_0x2132c2+0x1)/_0x5e54c6,_0x2a3bc9||_0x4769e6(0x67e)),_0x300572=(_0x309276-_0x3d5dbb*_0x3ef5c5)/(0x1-_0x3ef5c5);return _0x300572+(_0x3d5dbb-_0x300572)*_0x12b145;},VisuMZ[_0x479088(0x676)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x479088(0x6e6)][_0x479088(0x60c)],Sprite_Actor[_0x479088(0x6e6)][_0x479088(0x60c)]=function(_0x1165ab){const _0x14dab5=_0x479088;if(VisuMZ['CoreEngine'][_0x14dab5(0x502)]['UI']['RepositionActors']){if('YnVNg'!==_0x14dab5(0x370))this[_0x14dab5(0x790)](_0x1165ab);else{function _0xa342a9(){_0x12a7cf+=_0xc6b963(_0x19b15c);}}}else VisuMZ[_0x14dab5(0x676)][_0x14dab5(0x661)][_0x14dab5(0x4c7)](this,_0x1165ab);},Sprite_Actor[_0x479088(0x6e6)][_0x479088(0x790)]=function(_0x3000a9){const _0x3afb42=_0x479088;let _0x2e0e7e=Math[_0x3afb42(0x786)](Graphics[_0x3afb42(0x7bc)]/0x2+0xc0);_0x2e0e7e-=Math['floor']((Graphics[_0x3afb42(0x7bc)]-Graphics['boxWidth'])/0x2),_0x2e0e7e+=_0x3000a9*0x20;let _0x292a90=Graphics['height']-0xc8-$gameParty[_0x3afb42(0x7dd)]()*0x30;_0x292a90-=Math['floor']((Graphics['height']-Graphics[_0x3afb42(0x77a)])/0x2),_0x292a90+=_0x3000a9*0x30,this[_0x3afb42(0x28d)](_0x2e0e7e,_0x292a90);},Sprite_Actor[_0x479088(0x6e6)]['retreat']=function(){const _0x5bd9a5=_0x479088;this[_0x5bd9a5(0x6d5)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x479088(0x2aa)]=function(_0x4bc6b0){const _0x2b5d88=_0x479088;this[_0x2b5d88(0x1d1)]=_0x4bc6b0;},VisuMZ['CoreEngine']['Sprite_Animation_processSoundTimings']=Sprite_Animation['prototype']['processSoundTimings'],Sprite_Animation[_0x479088(0x6e6)][_0x479088(0x5dc)]=function(){const _0x5e9983=_0x479088;if(this[_0x5e9983(0x1d1)])return;VisuMZ['CoreEngine'][_0x5e9983(0x7dc)][_0x5e9983(0x4c7)](this);},Sprite_Animation[_0x479088(0x6e6)][_0x479088(0x4ba)]=function(_0x23abf9){const _0x209ce4=_0x479088;if(_0x23abf9[_0x209ce4(0x2f0)]){}const _0x28cc85=this[_0x209ce4(0x35a)][_0x209ce4(0x735)];let _0x10d726=_0x23abf9['height']*_0x23abf9[_0x209ce4(0x1ce)]['y'],_0xeb253f=0x0,_0x2f89ac=-_0x10d726/0x2;if(_0x28cc85[_0x209ce4(0x7cd)](/<(?:HEAD|HEADER|TOP)>/i))_0x2f89ac=-_0x10d726;if(_0x28cc85[_0x209ce4(0x7cd)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2f89ac=0x0;if(_0x28cc85['match'](/<(?:LEFT)>/i))_0xeb253f=-_0x23abf9[_0x209ce4(0x7bc)]/0x2;if(_0x28cc85[_0x209ce4(0x7cd)](/<(?:RIGHT)>/i))_0x2f89ac=_0x23abf9[_0x209ce4(0x7bc)]/0x2;if(_0x28cc85[_0x209ce4(0x7cd)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0xeb253f=Number(RegExp['$1'])*_0x23abf9['width'];if(_0x28cc85[_0x209ce4(0x7cd)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x209ce4(0x488)===_0x209ce4(0x52f)){function _0x1625ea(){const _0x31b8ad=_0x209ce4;return this[_0x31b8ad(0x45a)];}}else _0x2f89ac=(0x1-Number(RegExp['$1']))*-_0x10d726;}_0x28cc85['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0xeb253f=Number(RegExp['$1'])*_0x23abf9[_0x209ce4(0x7bc)],_0x2f89ac=(0x1-Number(RegExp['$2']))*-_0x10d726);if(_0x28cc85['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0xeb253f+=Number(RegExp['$1']);if(_0x28cc85['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2f89ac+=Number(RegExp['$1']);if(_0x28cc85[_0x209ce4(0x7cd)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x209ce4(0x4d4)!=='dhRdE'){function _0x20e5ce(){const _0x598d8a=_0x209ce4;return _0x4d3af9[_0x598d8a(0x3e8)][_0x598d8a(0x2fb)][_0x598d8a(0x4c7)](this);}}else _0xeb253f+=Number(RegExp['$1']),_0x2f89ac+=Number(RegExp['$2']);}const _0xe31f69=new Point(_0xeb253f,_0x2f89ac);return _0x23abf9[_0x209ce4(0x168)](),_0x23abf9['worldTransform'][_0x209ce4(0x4a3)](_0xe31f69);},Sprite_AnimationMV[_0x479088(0x6e6)][_0x479088(0x2aa)]=function(_0x1131be){const _0xca970b=_0x479088;this[_0xca970b(0x1d1)]=_0x1131be;},VisuMZ['CoreEngine'][_0x479088(0x5e3)]=Sprite_AnimationMV[_0x479088(0x6e6)][_0x479088(0x7e0)],Sprite_AnimationMV[_0x479088(0x6e6)][_0x479088(0x7e0)]=function(_0x325b27){const _0x2ca6ff=_0x479088;if(this[_0x2ca6ff(0x1d1)]){if(_0x2ca6ff(0x539)==='JzyUQ'){function _0x39237e(){const _0x52bc81=_0x2ca6ff;_0x1d04a4['CoreEngine'][_0x52bc81(0x379)]['call'](this),this[_0x52bc81(0x48e)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};}}else _0x325b27=JsonEx['makeDeepCopy'](_0x325b27),_0x325b27['se'][_0x2ca6ff(0x288)]=0x0;}VisuMZ[_0x2ca6ff(0x676)]['Sprite_AnimationMV_processTimingData'][_0x2ca6ff(0x4c7)](this,_0x325b27);},Sprite_Damage[_0x479088(0x6e6)][_0x479088(0x5ea)]=function(_0x193319){const _0x1f8543=_0x479088;let _0x448c9f=Math['abs'](_0x193319)[_0x1f8543(0x1b9)]();this[_0x1f8543(0x19b)]()&&(_0x448c9f=VisuMZ[_0x1f8543(0x14f)](_0x448c9f));const _0x1d4af2=this[_0x1f8543(0x195)](),_0x51799e=Math[_0x1f8543(0x7c1)](_0x1d4af2*0.75);for(let _0x2ebf5d=0x0;_0x2ebf5d<_0x448c9f['length'];_0x2ebf5d++){if(_0x1f8543(0x75c)!==_0x1f8543(0x6cc)){const _0x16fb96=this[_0x1f8543(0x31d)](_0x51799e,_0x1d4af2);_0x16fb96['bitmap'][_0x1f8543(0x665)](_0x448c9f[_0x2ebf5d],0x0,0x0,_0x51799e,_0x1d4af2,_0x1f8543(0x47b)),_0x16fb96['x']=(_0x2ebf5d-(_0x448c9f[_0x1f8543(0x774)]-0x1)/0x2)*_0x51799e,_0x16fb96['dy']=-_0x2ebf5d;}else{function _0x516c87(){const _0x5897ba=_0x1f8543;if(_0x43be82[_0x5897ba(0x676)][_0x5897ba(0x502)][_0x5897ba(0x6da)][_0x5897ba(0x2e4)])this[_0x5897ba(0x1f9)]();else return _0x516fee[_0x5897ba(0x676)][_0x5897ba(0x59d)][_0x5897ba(0x4c7)](this);}}}},Sprite_Damage[_0x479088(0x6e6)][_0x479088(0x19b)]=function(){const _0x32c4f9=_0x479088;return VisuMZ[_0x32c4f9(0x676)][_0x32c4f9(0x502)][_0x32c4f9(0x6da)][_0x32c4f9(0x6f8)];},VisuMZ[_0x479088(0x676)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x479088(0x6e6)][_0x479088(0x4c5)],Sprite_Gauge[_0x479088(0x6e6)][_0x479088(0x4c5)]=function(){const _0x17881d=_0x479088;return VisuMZ[_0x17881d(0x676)]['Sprite_Gauge_gaugeRate'][_0x17881d(0x4c7)](this)[_0x17881d(0x520)](0x0,0x1);},VisuMZ[_0x479088(0x676)][_0x479088(0x3a2)]=Sprite_Gauge[_0x479088(0x6e6)][_0x479088(0x2a0)],Sprite_Gauge['prototype'][_0x479088(0x2a0)]=function(){const _0x35b5b3=_0x479088;let _0x2a715d=VisuMZ[_0x35b5b3(0x676)][_0x35b5b3(0x3a2)][_0x35b5b3(0x4c7)](this);return _0x2a715d;},Sprite_Gauge[_0x479088(0x6e6)][_0x479088(0x453)]=function(){const _0x3e2a69=_0x479088;let _0x3125ea=this['currentValue']();if(this['useDigitGrouping']()){if(_0x3e2a69(0x336)!=='KXJtu'){function _0x39b9f8(){const _0x2f4a10=_0x3e2a69;_0x52eb3e[_0x2f4a10(0x676)][_0x2f4a10(0x15d)]['call'](this);}}else _0x3125ea=VisuMZ[_0x3e2a69(0x14f)](_0x3125ea);}const _0x38aeed=this[_0x3e2a69(0x24e)]()-0x1,_0x4c6968=this[_0x3e2a69(0x3e2)]();this[_0x3e2a69(0x22b)](),this[_0x3e2a69(0x221)][_0x3e2a69(0x665)](_0x3125ea,0x0,0x0,_0x38aeed,_0x4c6968,_0x3e2a69(0x25b));},Sprite_Gauge[_0x479088(0x6e6)][_0x479088(0x5a9)]=function(){return 0x3;},Sprite_Gauge['prototype']['useDigitGrouping']=function(){const _0x21e488=_0x479088;return VisuMZ[_0x21e488(0x676)][_0x21e488(0x502)][_0x21e488(0x6da)][_0x21e488(0x6f1)];};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x479088(0x6e6)]=Object[_0x479088(0x66e)](Sprite_Clickable[_0x479088(0x6e6)]),Sprite_TitlePictureButton['prototype']['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype'][_0x479088(0x65b)]=function(_0x187a34){const _0x5510fd=_0x479088;Sprite_Clickable['prototype'][_0x5510fd(0x65b)][_0x5510fd(0x4c7)](this),this[_0x5510fd(0x38d)]=_0x187a34,this['_clickHandler']=null,this[_0x5510fd(0x5d2)]();},Sprite_TitlePictureButton[_0x479088(0x6e6)][_0x479088(0x5d2)]=function(){const _0x27829d=_0x479088;this['x']=Graphics[_0x27829d(0x7bc)],this['y']=Graphics[_0x27829d(0x5de)],this[_0x27829d(0x3d8)]=![],this[_0x27829d(0x638)]();},Sprite_TitlePictureButton[_0x479088(0x6e6)][_0x479088(0x638)]=function(){const _0x25b8de=_0x479088;this[_0x25b8de(0x221)]=ImageManager[_0x25b8de(0x1b8)](this[_0x25b8de(0x38d)][_0x25b8de(0x5cc)]),this[_0x25b8de(0x221)][_0x25b8de(0x5c0)](this[_0x25b8de(0x178)][_0x25b8de(0x34b)](this));},Sprite_TitlePictureButton[_0x479088(0x6e6)][_0x479088(0x178)]=function(){const _0x36b042=_0x479088;this['_data'][_0x36b042(0x773)]['call'](this),this[_0x36b042(0x38d)][_0x36b042(0x371)]['call'](this),this[_0x36b042(0x321)](this[_0x36b042(0x38d)][_0x36b042(0x162)][_0x36b042(0x34b)](this));},Sprite_TitlePictureButton['prototype'][_0x479088(0x607)]=function(){const _0x4a0a2b=_0x479088;Sprite_Clickable[_0x4a0a2b(0x6e6)][_0x4a0a2b(0x607)][_0x4a0a2b(0x4c7)](this),this[_0x4a0a2b(0x690)](),this[_0x4a0a2b(0x7a5)]();},Sprite_TitlePictureButton[_0x479088(0x6e6)][_0x479088(0x67d)]=function(){const _0x2ee3d0=_0x479088;return VisuMZ[_0x2ee3d0(0x676)][_0x2ee3d0(0x502)][_0x2ee3d0(0x384)][_0x2ee3d0(0x56c)][_0x2ee3d0(0x6ec)];},Sprite_TitlePictureButton[_0x479088(0x6e6)]['updateOpacity']=function(){const _0x10249a=_0x479088;this[_0x10249a(0x300)]?this[_0x10249a(0x73a)]=0xff:(this['opacity']+=this['visible']?this[_0x10249a(0x67d)]():-0x1*this[_0x10249a(0x67d)](),this[_0x10249a(0x73a)]=Math[_0x10249a(0x2d7)](0xc0,this[_0x10249a(0x73a)]));},Sprite_TitlePictureButton[_0x479088(0x6e6)]['setClickHandler']=function(_0x10a88c){this['_clickHandler']=_0x10a88c;},Sprite_TitlePictureButton['prototype'][_0x479088(0x282)]=function(){const _0xa90f85=_0x479088;if(this[_0xa90f85(0x693)]){if(_0xa90f85(0x1ea)!==_0xa90f85(0x49e))this[_0xa90f85(0x693)]();else{function _0x2613a0(){const _0x3a7526=_0xa90f85;_0x5e8f8e[_0x3a7526(0x652)](_0x3a7526(0x5fa)),_0x53f1dd[_0x3a7526(0x652)](_0x108d27);}}}},VisuMZ['CoreEngine'][_0x479088(0x699)]=Spriteset_Base['prototype'][_0x479088(0x65b)],Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x65b)]=function(){const _0x786090=_0x479088;VisuMZ[_0x786090(0x676)][_0x786090(0x699)]['call'](this),this[_0x786090(0x31a)]();},Spriteset_Base['prototype'][_0x479088(0x31a)]=function(){const _0xdffbce=_0x479088;this[_0xdffbce(0x5db)]=[],this[_0xdffbce(0x423)]=this[_0xdffbce(0x1ce)]['x'],this[_0xdffbce(0x5bb)]=this[_0xdffbce(0x1ce)]['y'];},VisuMZ['CoreEngine'][_0x479088(0x2c2)]=Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x523)],Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x523)]=function(_0x3accb5){const _0x5c9367=_0x479088;this[_0x5c9367(0x36b)](),VisuMZ[_0x5c9367(0x676)][_0x5c9367(0x2c2)][_0x5c9367(0x4c7)](this,_0x3accb5);},VisuMZ[_0x479088(0x676)]['Spriteset_Base_update']=Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x607)],Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x607)]=function(){const _0x2d0a23=_0x479088;VisuMZ[_0x2d0a23(0x676)]['Spriteset_Base_update'][_0x2d0a23(0x4c7)](this),this[_0x2d0a23(0x284)](),this[_0x2d0a23(0x227)]();},Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x284)]=function(){const _0x30fec3=_0x479088;if(!VisuMZ['CoreEngine'][_0x30fec3(0x502)]['QoL']['AntiZoomPictures'])return;if(this[_0x30fec3(0x423)]===this['scale']['x']&&this[_0x30fec3(0x5bb)]===this['scale']['y'])return;this['scale']['x']!==0x0&&(this['_pictureContainer'][_0x30fec3(0x1ce)]['x']=0x1/this[_0x30fec3(0x1ce)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x30fec3(0x1ce)]['x'])),this[_0x30fec3(0x1ce)]['y']!==0x0&&(this[_0x30fec3(0x1d7)][_0x30fec3(0x1ce)]['y']=0x1/this[_0x30fec3(0x1ce)]['y'],this[_0x30fec3(0x1d7)]['y']=-(this['y']/this[_0x30fec3(0x1ce)]['y'])),this['_cacheScaleX']=this[_0x30fec3(0x1ce)]['x'],this['_cacheScaleY']=this[_0x30fec3(0x1ce)]['y'];},Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x227)]=function(){const _0x28834f=_0x479088;for(const _0x2d54e8 of this[_0x28834f(0x5db)]){if(!_0x2d54e8['isPlaying']()){if(_0x28834f(0x617)===_0x28834f(0x186)){function _0x343786(){const _0x6a4297=_0x28834f;return _0x30d54d[_0x6a4297(0x676)][_0x6a4297(0x77f)][_0x6a4297(0x4c7)](this);}}else this['removeFauxAnimation'](_0x2d54e8);}}this['processFauxAnimationRequests']();},Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x7ad)]=function(){const _0x469669=_0x479088;for(;;){if(_0x469669(0x5a3)!=='VBORn'){const _0xfb0357=$gameTemp['retrieveFauxAnimation']();if(_0xfb0357){if(_0x469669(0x73b)===_0x469669(0x4d9)){function _0x559cd8(){const _0x5ee01e=_0x469669;switch(_0x4ac343[_0x5ee01e(0x676)][_0x5ee01e(0x502)][_0x5ee01e(0x6da)][_0x5ee01e(0x4a6)]){case'stretch':return!![];case _0x5ee01e(0x410):return![];default:return _0x251aeb[_0x5ee01e(0x676)][_0x5ee01e(0x495)][_0x5ee01e(0x4c7)](this);}}}else this[_0x469669(0x796)](_0xfb0357);}else break;}else{function _0x2e6495(){const _0x512f6c=_0x469669;_0x5290fe=_0x421db6[_0x512f6c(0x14f)](_0x5660d2);}}}},Spriteset_Base[_0x479088(0x6e6)]['createFauxAnimation']=function(_0x3ec431){const _0x4548f9=_0x479088,_0x2cbeec=$dataAnimations[_0x3ec431[_0x4548f9(0x4e8)]],_0x4b25a4=_0x3ec431[_0x4548f9(0x4f4)],_0x147f56=_0x3ec431[_0x4548f9(0x663)],_0x5e8e56=_0x3ec431[_0x4548f9(0x3eb)];let _0x19cf86=this['animationBaseDelay']();const _0x4b78ba=this[_0x4548f9(0x5b4)]();if(this[_0x4548f9(0x19f)](_0x2cbeec))for(const _0x5c3c1f of _0x4b25a4){this[_0x4548f9(0x6fd)]([_0x5c3c1f],_0x2cbeec,_0x147f56,_0x19cf86,_0x5e8e56),_0x19cf86+=_0x4b78ba;}else this[_0x4548f9(0x6fd)](_0x4b25a4,_0x2cbeec,_0x147f56,_0x19cf86,_0x5e8e56);},Spriteset_Base['prototype'][_0x479088(0x6fd)]=function(_0x18b0ea,_0x28b9b0,_0x340aae,_0x3b1c03,_0x25cd39){const _0x2bb7ad=_0x479088,_0x146f6f=this[_0x2bb7ad(0x7c6)](_0x28b9b0),_0x3172b5=new(_0x146f6f?Sprite_AnimationMV:Sprite_Animation)(),_0x391a3a=this[_0x2bb7ad(0x3bc)](_0x18b0ea);this['animationShouldMirror'](_0x18b0ea[0x0])&&(_0x340aae=!_0x340aae),_0x3172b5[_0x2bb7ad(0x7d9)]=_0x18b0ea,_0x3172b5[_0x2bb7ad(0x5d2)](_0x391a3a,_0x28b9b0,_0x340aae,_0x3b1c03),_0x3172b5[_0x2bb7ad(0x2aa)](_0x25cd39),this[_0x2bb7ad(0x248)][_0x2bb7ad(0x1e4)](_0x3172b5),this[_0x2bb7ad(0x5db)][_0x2bb7ad(0x4d1)](_0x3172b5);},Spriteset_Base['prototype'][_0x479088(0x7b8)]=function(_0x26a172){const _0xc86a18=_0x479088;this[_0xc86a18(0x5db)][_0xc86a18(0x2ad)](_0x26a172),this[_0xc86a18(0x248)][_0xc86a18(0x77e)](_0x26a172);for(const _0x46b8f3 of _0x26a172[_0xc86a18(0x7d9)]){_0x46b8f3[_0xc86a18(0x54f)]&&_0x46b8f3[_0xc86a18(0x54f)]();}_0x26a172[_0xc86a18(0x523)]();},Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x36b)]=function(){const _0x3933c6=_0x479088;for(const _0x3b10bc of this[_0x3933c6(0x5db)]){this['removeFauxAnimation'](_0x3b10bc);}},Spriteset_Base[_0x479088(0x6e6)]['isFauxAnimationPlaying']=function(){const _0x425cde=_0x479088;return this['_fauxAnimationSprites'][_0x425cde(0x774)]>0x0;},VisuMZ[_0x479088(0x676)][_0x479088(0x5a5)]=Spriteset_Base['prototype'][_0x479088(0x2ed)],Spriteset_Base['prototype']['updatePosition']=function(){const _0x4fc651=_0x479088;VisuMZ['CoreEngine'][_0x4fc651(0x5a5)]['call'](this),this[_0x4fc651(0x341)]();},Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x341)]=function(){const _0x26cf53=_0x479088;if(!$gameScreen)return;if($gameScreen[_0x26cf53(0x5ca)]<=0x0)return;this['x']-=Math[_0x26cf53(0x786)]($gameScreen[_0x26cf53(0x261)]());const _0x28b0ca=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x26cf53(0x259)]()){case _0x26cf53(0x65c):this[_0x26cf53(0x2c1)]();break;case _0x26cf53(0x3e9):this[_0x26cf53(0x7f7)]();break;case _0x26cf53(0x21b):this['updatePositionCoreEngineShakeVert']();break;default:this[_0x26cf53(0x5ab)]();break;}},Spriteset_Base[_0x479088(0x6e6)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x4c45d4=_0x479088,_0x8369a=VisuMZ[_0x4c45d4(0x676)][_0x4c45d4(0x502)][_0x4c45d4(0x53d)];if(_0x8369a&&_0x8369a['originalJS']){if(_0x4c45d4(0x366)==='vXwUh'){function _0x4c5f3c(){_0x2a6402+=_0x9cf3dd(_0x253a3e);}}else return _0x8369a[_0x4c45d4(0x6f7)][_0x4c45d4(0x4c7)](this);}this['x']+=Math[_0x4c45d4(0x786)]($gameScreen['shake']());},Spriteset_Base[_0x479088(0x6e6)]['updatePositionCoreEngineShakeRand']=function(){const _0x2e8ed5=_0x479088,_0x41cdff=VisuMZ[_0x2e8ed5(0x676)][_0x2e8ed5(0x502)][_0x2e8ed5(0x53d)];if(_0x41cdff&&_0x41cdff[_0x2e8ed5(0x442)]){if(_0x2e8ed5(0x4f7)!==_0x2e8ed5(0x4f7)){function _0x4b224a(){const _0x257b52=_0x2e8ed5;_0x5983c3['_changingClass']=!![],_0x5e86f9[_0x257b52(0x676)][_0x257b52(0x666)][_0x257b52(0x4c7)](this,_0x4369ab,_0xa8422c),_0x1ec7ef[_0x257b52(0x65a)]=_0x45053f;}}else return _0x41cdff[_0x2e8ed5(0x442)]['call'](this);}const _0x33fd42=$gameScreen['_shakePower']*0.75,_0x49075d=$gameScreen['_shakeSpeed']*0.6,_0x29b60c=$gameScreen[_0x2e8ed5(0x5ca)];this['x']+=Math[_0x2e8ed5(0x786)](Math[_0x2e8ed5(0x492)](_0x33fd42)-Math[_0x2e8ed5(0x492)](_0x49075d))*(Math['min'](_0x29b60c,0x1e)*0.5),this['y']+=Math[_0x2e8ed5(0x786)](Math[_0x2e8ed5(0x492)](_0x33fd42)-Math['randomInt'](_0x49075d))*(Math['min'](_0x29b60c,0x1e)*0.5);},Spriteset_Base['prototype'][_0x479088(0x7f7)]=function(){const _0x4f9f7f=_0x479088,_0x1cf5c7=VisuMZ['CoreEngine'][_0x4f9f7f(0x502)]['ScreenShake'];if(_0x1cf5c7&&_0x1cf5c7[_0x4f9f7f(0x4fd)]){if(_0x4f9f7f(0x473)!==_0x4f9f7f(0x473)){function _0x4f16db(){const _0x3bcf9d=_0x4f9f7f;return _0x56f274[_0x3bcf9d(0x372)]()||_0x207c16[_0x3bcf9d(0x34c)]()?_0x27fd6d['CoreEngine']['Settings']['ButtonAssist'][_0x3bcf9d(0x5c6)]:_0x3bcf9d(0x3f9);}}else return _0x1cf5c7[_0x4f9f7f(0x4fd)][_0x4f9f7f(0x4c7)](this);}const _0x1c4b4d=$gameScreen[_0x4f9f7f(0x586)]*0.75,_0x11c13e=$gameScreen[_0x4f9f7f(0x2a9)]*0.6,_0x536d6d=$gameScreen[_0x4f9f7f(0x5ca)];this['x']+=Math[_0x4f9f7f(0x786)](Math[_0x4f9f7f(0x492)](_0x1c4b4d)-Math['randomInt'](_0x11c13e))*(Math['min'](_0x536d6d,0x1e)*0.5);},Spriteset_Base[_0x479088(0x6e6)][_0x479088(0x6d4)]=function(){const _0x3ca753=_0x479088,_0x10d6d1=VisuMZ[_0x3ca753(0x676)][_0x3ca753(0x502)]['ScreenShake'];if(_0x10d6d1&&_0x10d6d1[_0x3ca753(0x188)]){if(_0x3ca753(0x1cd)!==_0x3ca753(0x26f))return _0x10d6d1[_0x3ca753(0x188)][_0x3ca753(0x4c7)](this);else{function _0x2c7b30(){var _0xe8616d=_0x3e4d78(_0x1d7483['$1']);_0x3f5cb4*=_0xe8616d;}}}const _0x10986b=$gameScreen['_shakePower']*0.75,_0x4fe3f7=$gameScreen[_0x3ca753(0x2a9)]*0.6,_0x54e387=$gameScreen[_0x3ca753(0x5ca)];this['y']+=Math['round'](Math[_0x3ca753(0x492)](_0x10986b)-Math[_0x3ca753(0x492)](_0x4fe3f7))*(Math['min'](_0x54e387,0x1e)*0.5);},Spriteset_Battle[_0x479088(0x6e6)]['createBackground']=function(){const _0x4f9965=_0x479088;this[_0x4f9965(0x4e5)]=new PIXI[(_0x4f9965(0x756))]['BlurFilter'](clamp=!![]),this[_0x4f9965(0x4dc)]=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager[_0x4f9965(0x269)](),this[_0x4f9965(0x4dc)][_0x4f9965(0x756)]=[this['_backgroundFilter']],this['_baseSprite'][_0x4f9965(0x1e4)](this[_0x4f9965(0x4dc)]);},VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies']=Spriteset_Battle['prototype'][_0x479088(0x29b)],Spriteset_Battle[_0x479088(0x6e6)][_0x479088(0x29b)]=function(){const _0x44ebab=_0x479088;VisuMZ['CoreEngine']['Settings']['UI']['RepositionEnemies']&&this[_0x44ebab(0x3a6)](),VisuMZ[_0x44ebab(0x676)][_0x44ebab(0x7ea)][_0x44ebab(0x4c7)](this);},Spriteset_Battle[_0x479088(0x6e6)]['repositionEnemiesByResolution']=function(){const _0x52d161=_0x479088;for(member of $gameTroop['members']()){member[_0x52d161(0x63a)]();}},VisuMZ[_0x479088(0x676)][_0x479088(0x345)]=Window_Base['prototype']['initialize'],Window_Base[_0x479088(0x6e6)]['initialize']=function(_0x41452e){const _0xe93553=_0x479088;_0x41452e['x']=Math[_0xe93553(0x786)](_0x41452e['x']),_0x41452e['y']=Math[_0xe93553(0x786)](_0x41452e['y']),_0x41452e['width']=Math[_0xe93553(0x786)](_0x41452e[_0xe93553(0x7bc)]),_0x41452e[_0xe93553(0x5de)]=Math[_0xe93553(0x786)](_0x41452e[_0xe93553(0x5de)]),this['initDigitGrouping'](),VisuMZ[_0xe93553(0x676)]['Window_Base_initialize']['call'](this,_0x41452e),this[_0xe93553(0x700)]();},Window_Base['prototype'][_0x479088(0x3b5)]=function(){const _0x3d4a77=_0x479088;this['_digitGrouping']=VisuMZ[_0x3d4a77(0x676)][_0x3d4a77(0x502)][_0x3d4a77(0x6da)]['DigitGroupingStandardText'],this[_0x3d4a77(0x44a)]=VisuMZ[_0x3d4a77(0x676)][_0x3d4a77(0x502)][_0x3d4a77(0x6da)][_0x3d4a77(0x58c)];},Window_Base['prototype'][_0x479088(0x760)]=function(){const _0x36f309=_0x479088;return VisuMZ[_0x36f309(0x676)]['Settings'][_0x36f309(0x55a)]['LineHeight'];},Window_Base[_0x479088(0x6e6)][_0x479088(0x680)]=function(){const _0x5a6a47=_0x479088;return VisuMZ[_0x5a6a47(0x676)][_0x5a6a47(0x502)]['Window']['ItemPadding'];},Window_Base['prototype'][_0x479088(0x357)]=function(){const _0x1aef3a=_0x479088;this[_0x1aef3a(0x143)]=VisuMZ[_0x1aef3a(0x676)][_0x1aef3a(0x502)][_0x1aef3a(0x55a)]['BackOpacity'];},Window_Base[_0x479088(0x6e6)][_0x479088(0x780)]=function(){const _0x4a89a4=_0x479088;return VisuMZ['CoreEngine'][_0x4a89a4(0x502)]['Window']['TranslucentOpacity'];},Window_Base['prototype'][_0x479088(0x467)]=function(){const _0x347774=_0x479088;return VisuMZ['CoreEngine'][_0x347774(0x502)][_0x347774(0x55a)][_0x347774(0x201)];},VisuMZ['CoreEngine'][_0x479088(0x6ea)]=Window_Base['prototype'][_0x479088(0x607)],Window_Base[_0x479088(0x6e6)][_0x479088(0x607)]=function(){const _0x5c7f0f=_0x479088;VisuMZ['CoreEngine']['Window_Base_update'][_0x5c7f0f(0x4c7)](this),this[_0x5c7f0f(0x4f9)]();},Window_Base[_0x479088(0x6e6)]['updateOpen']=function(){const _0x1ce5ab=_0x479088;if(this[_0x1ce5ab(0x43d)]){if(_0x1ce5ab(0x678)==='ZDaEX'){function _0x6d6bf7(){const _0x281238=_0x1ce5ab,_0x150761=_0x460331(this[_0x281238(0x340)][_0x281238(0x735)]),_0x38a681=this[_0x281238(0x208)](_0x150761);return _0x38a681?_0x38a681[_0x281238(0x363)]:0xc0;}}else this['openness']+=this[_0x1ce5ab(0x467)](),this[_0x1ce5ab(0x175)]()&&(this['_opening']=![]);}},Window_Base[_0x479088(0x6e6)][_0x479088(0x70f)]=function(){const _0x36d47f=_0x479088;this[_0x36d47f(0x716)]&&(this[_0x36d47f(0x3b3)]-=this[_0x36d47f(0x467)](),this[_0x36d47f(0x443)]()&&(this[_0x36d47f(0x716)]=![]));},VisuMZ[_0x479088(0x676)]['Window_Base_drawText']=Window_Base[_0x479088(0x6e6)]['drawText'],Window_Base[_0x479088(0x6e6)]['drawText']=function(_0x154206,_0x5ad9fb,_0x2fa83e,_0x58e9b0,_0x1163de){const _0x429746=_0x479088;if(this[_0x429746(0x19b)]())_0x154206=VisuMZ[_0x429746(0x14f)](_0x154206);VisuMZ[_0x429746(0x676)][_0x429746(0x350)][_0x429746(0x4c7)](this,_0x154206,_0x5ad9fb,_0x2fa83e,_0x58e9b0,_0x1163de);},Window_Base[_0x479088(0x6e6)][_0x479088(0x19b)]=function(){const _0x56bc82=_0x479088;return this[_0x56bc82(0x4e3)];},VisuMZ[_0x479088(0x676)]['Window_Base_createTextState']=Window_Base[_0x479088(0x6e6)][_0x479088(0x3b8)],Window_Base['prototype'][_0x479088(0x3b8)]=function(_0xd71484,_0xd6c7b1,_0x5cfdb0,_0x391e8e){const _0x1cbfb2=_0x479088;var _0x3b53b8=VisuMZ[_0x1cbfb2(0x676)][_0x1cbfb2(0x1e3)]['call'](this,_0xd71484,_0xd6c7b1,_0x5cfdb0,_0x391e8e);if(this[_0x1cbfb2(0x48c)]())_0x3b53b8[_0x1cbfb2(0x205)]=VisuMZ[_0x1cbfb2(0x14f)](_0x3b53b8[_0x1cbfb2(0x205)]);return _0x3b53b8;},Window_Base['prototype'][_0x479088(0x48c)]=function(){const _0x284965=_0x479088;return this[_0x284965(0x44a)];},Window_Base[_0x479088(0x6e6)][_0x479088(0x60f)]=function(_0x47a034){const _0x1ab5cb=_0x479088;this[_0x1ab5cb(0x4e3)]=_0x47a034;},Window_Base[_0x479088(0x6e6)]['enableDigitGroupingEx']=function(_0xc8842f){const _0x1cefda=_0x479088;this[_0x1cefda(0x44a)]=_0xc8842f;},VisuMZ['CoreEngine'][_0x479088(0x4cc)]=Window_Base[_0x479088(0x6e6)][_0x479088(0x448)],Window_Base[_0x479088(0x6e6)][_0x479088(0x448)]=function(_0x5dd624){const _0x24cc52=_0x479088;this[_0x24cc52(0x179)]=this['_CoreEngine_Cache_textSizeEx']||{};if(!this['_CoreEngine_Cache_textSizeEx'][_0x5dd624]){if('BAohz'!=='QrUbS')this[_0x24cc52(0x179)][_0x5dd624]=VisuMZ[_0x24cc52(0x676)]['Window_Base_textSizeEx'][_0x24cc52(0x4c7)](this,_0x5dd624);else{function _0x50495d(){const _0x1947d0=_0x24cc52;_0x54513f=_0x476e10||0xa8,this[_0x1947d0(0x605)]();if(_0x4049df['CoreEngine']['Settings']['UI'][_0x1947d0(0x25d)])this[_0x1947d0(0x417)](_0x50ad1e[_0x1947d0(0x577)]()['name'],_0x3da3f3,_0x1343b2,_0x506ef8);else{const _0x5a5f82=_0x67722d['currentClass']()[_0x1947d0(0x735)][_0x1947d0(0x68a)](/\\I\[(\d+)\]/gi,'');this[_0x1947d0(0x665)](_0x5a5f82,_0x365bdf,_0x31f651,_0xe62fcf);}}}}return this[_0x24cc52(0x179)][_0x5dd624];},VisuMZ[_0x479088(0x676)]['Window_Base_drawIcon']=Window_Base[_0x479088(0x6e6)][_0x479088(0x17a)],Window_Base['prototype'][_0x479088(0x17a)]=function(_0x179088,_0x400555,_0x257e4f){const _0x4da00b=_0x479088;_0x400555=Math[_0x4da00b(0x786)](_0x400555),_0x257e4f=Math[_0x4da00b(0x786)](_0x257e4f),VisuMZ[_0x4da00b(0x676)][_0x4da00b(0x6c3)][_0x4da00b(0x4c7)](this,_0x179088,_0x400555,_0x257e4f);},VisuMZ[_0x479088(0x676)][_0x479088(0x68b)]=Window_Base[_0x479088(0x6e6)][_0x479088(0x5d1)],Window_Base[_0x479088(0x6e6)][_0x479088(0x5d1)]=function(_0x363156,_0x9f586,_0x17c4da,_0x124270,_0x2960b9,_0x12d8e5){const _0x23b7b0=_0x479088;_0x2960b9=_0x2960b9||ImageManager['faceWidth'],_0x12d8e5=_0x12d8e5||ImageManager['faceHeight'],_0x17c4da=Math[_0x23b7b0(0x786)](_0x17c4da),_0x124270=Math['round'](_0x124270),_0x2960b9=Math[_0x23b7b0(0x786)](_0x2960b9),_0x12d8e5=Math[_0x23b7b0(0x786)](_0x12d8e5),VisuMZ[_0x23b7b0(0x676)][_0x23b7b0(0x68b)][_0x23b7b0(0x4c7)](this,_0x363156,_0x9f586,_0x17c4da,_0x124270,_0x2960b9,_0x12d8e5);},VisuMZ['CoreEngine']['Window_Base_drawCharacter']=Window_Base[_0x479088(0x6e6)][_0x479088(0x594)],Window_Base[_0x479088(0x6e6)][_0x479088(0x594)]=function(_0x79dac5,_0x31b06a,_0x592dad,_0x2e1836){const _0x4704d0=_0x479088;_0x592dad=Math['round'](_0x592dad),_0x2e1836=Math[_0x4704d0(0x786)](_0x2e1836),VisuMZ[_0x4704d0(0x676)][_0x4704d0(0x6d8)][_0x4704d0(0x4c7)](this,_0x79dac5,_0x31b06a,_0x592dad,_0x2e1836);},VisuMZ[_0x479088(0x676)][_0x479088(0x590)]=Window_Selectable[_0x479088(0x6e6)][_0x479088(0x4c2)],Window_Selectable['prototype'][_0x479088(0x4c2)]=function(_0x3232a2){const _0x20ffe3=_0x479088;let _0x17a1eb=VisuMZ[_0x20ffe3(0x676)]['Window_Selectable_itemRect'][_0x20ffe3(0x4c7)](this,_0x3232a2);return _0x17a1eb['x']=Math[_0x20ffe3(0x786)](_0x17a1eb['x']),_0x17a1eb['y']=Math['round'](_0x17a1eb['y']),_0x17a1eb[_0x20ffe3(0x7bc)]=Math[_0x20ffe3(0x786)](_0x17a1eb[_0x20ffe3(0x7bc)]),_0x17a1eb[_0x20ffe3(0x5de)]=Math[_0x20ffe3(0x786)](_0x17a1eb[_0x20ffe3(0x5de)]),_0x17a1eb;},VisuMZ[_0x479088(0x676)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x320)],Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x320)]=function(_0x349a92,_0x3f8e1d,_0x4b65fe){const _0xb7c096=_0x479088;_0x3f8e1d=Math[_0xb7c096(0x786)](_0x3f8e1d),_0x4b65fe=Math[_0xb7c096(0x786)](_0x4b65fe),VisuMZ[_0xb7c096(0x676)][_0xb7c096(0x1d4)]['call'](this,_0x349a92,_0x3f8e1d,_0x4b65fe);},Window_Base[_0x479088(0x6e6)]['initCoreEasing']=function(){const _0x3cdc23=_0x479088;this[_0x3cdc23(0x5f1)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x3cdc23(0x73a)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x3cdc23(0x688)]};},Window_Base['prototype'][_0x479088(0x4f9)]=function(){const _0x2b9242=_0x479088;if(!this[_0x2b9242(0x5f1)])return;if(this[_0x2b9242(0x5f1)][_0x2b9242(0x277)]<=0x0)return;this['x']=this[_0x2b9242(0x712)](this['x'],this[_0x2b9242(0x5f1)][_0x2b9242(0x741)]),this['y']=this[_0x2b9242(0x712)](this['y'],this['_coreEasing']['targetY']),this[_0x2b9242(0x1ce)]['x']=this[_0x2b9242(0x712)](this[_0x2b9242(0x1ce)]['x'],this['_coreEasing']['targetScaleX']),this['scale']['y']=this[_0x2b9242(0x712)](this[_0x2b9242(0x1ce)]['y'],this['_coreEasing']['targetScaleY']),this[_0x2b9242(0x73a)]=this[_0x2b9242(0x712)](this[_0x2b9242(0x73a)],this[_0x2b9242(0x5f1)]['targetOpacity']),this[_0x2b9242(0x143)]=this[_0x2b9242(0x712)](this[_0x2b9242(0x143)],this[_0x2b9242(0x5f1)][_0x2b9242(0x17d)]),this[_0x2b9242(0x688)]=this['applyCoreEasing'](this['contentsOpacity'],this[_0x2b9242(0x5f1)][_0x2b9242(0x6b4)]),this[_0x2b9242(0x5f1)][_0x2b9242(0x277)]--;},Window_Base[_0x479088(0x6e6)][_0x479088(0x712)]=function(_0x488f2f,_0x10f13b){const _0x171f3c=_0x479088;if(!this[_0x171f3c(0x5f1)])return _0x10f13b;const _0x3f28a2=this[_0x171f3c(0x5f1)][_0x171f3c(0x277)],_0x215758=this[_0x171f3c(0x5f1)]['wholeDuration'],_0x51ed51=this[_0x171f3c(0x2dc)]((_0x215758-_0x3f28a2)/_0x215758),_0x43539c=this[_0x171f3c(0x2dc)]((_0x215758-_0x3f28a2+0x1)/_0x215758),_0x98ccd7=(_0x488f2f-_0x10f13b*_0x51ed51)/(0x1-_0x51ed51);return _0x98ccd7+(_0x10f13b-_0x98ccd7)*_0x43539c;},Window_Base[_0x479088(0x6e6)][_0x479088(0x2dc)]=function(_0x3f62ab){const _0x42c264=_0x479088;if(!this['_coreEasing'])return _0x3f62ab;return VisuMZ[_0x42c264(0x6d1)](_0x3f62ab,this[_0x42c264(0x5f1)][_0x42c264(0x22d)]||_0x42c264(0x30d));},Window_Base[_0x479088(0x6e6)][_0x479088(0x1b3)]=function(_0x43385b,_0x4e7050){const _0x27d76c=_0x479088;if(!this['_coreEasing'])return;this['x']=this['_coreEasing'][_0x27d76c(0x741)],this['y']=this[_0x27d76c(0x5f1)]['targetY'],this[_0x27d76c(0x1ce)]['x']=this['_coreEasing'][_0x27d76c(0x5f2)],this[_0x27d76c(0x1ce)]['y']=this[_0x27d76c(0x5f1)][_0x27d76c(0x514)],this[_0x27d76c(0x73a)]=this['_coreEasing'][_0x27d76c(0x6bd)],this[_0x27d76c(0x143)]=this[_0x27d76c(0x5f1)][_0x27d76c(0x17d)],this[_0x27d76c(0x688)]=this[_0x27d76c(0x5f1)][_0x27d76c(0x6b4)],this[_0x27d76c(0x339)](_0x43385b,_0x4e7050,this['x'],this['y'],this[_0x27d76c(0x1ce)]['x'],this['scale']['y'],this[_0x27d76c(0x73a)],this[_0x27d76c(0x143)],this['contentsOpacity']);},Window_Base['prototype'][_0x479088(0x339)]=function(_0x1b3819,_0x4693d9,_0x3d903a,_0x314367,_0x4b7340,_0x23dbe9,_0x37c0d9,_0xc7458f,_0x47ec9a){const _0x2b409c=_0x479088;this[_0x2b409c(0x5f1)]={'duration':_0x1b3819,'wholeDuration':_0x1b3819,'type':_0x4693d9,'targetX':_0x3d903a,'targetY':_0x314367,'targetScaleX':_0x4b7340,'targetScaleY':_0x23dbe9,'targetOpacity':_0x37c0d9,'targetBackOpacity':_0xc7458f,'targetContentsOpacity':_0x47ec9a};},Window_Base[_0x479088(0x6e6)][_0x479088(0x753)]=function(_0x2a712c,_0x3bb09d,_0x576794,_0x1d83e7,_0x4458da){const _0x2ac098=_0x479088;this[_0x2ac098(0x7d8)](),this['contents']['fontSize']=VisuMZ[_0x2ac098(0x676)][_0x2ac098(0x502)][_0x2ac098(0x2d9)][_0x2ac098(0x41a)];const _0x499cec=VisuMZ[_0x2ac098(0x676)][_0x2ac098(0x502)][_0x2ac098(0x2d9)][_0x2ac098(0x456)];if(_0x499cec>0x0&&_0x3bb09d===TextManager[_0x2ac098(0x4d3)]){if(_0x2ac098(0x232)!=='FsFIP'){function _0x3c4c5c(){const _0x264666=_0x2ac098;for(const _0x4637ad of this[_0x264666(0x5db)]){this[_0x264666(0x7b8)](_0x4637ad);}}}else{const _0x5da6fd=_0x1d83e7+(this[_0x2ac098(0x760)]()-ImageManager[_0x2ac098(0x24d)])/0x2;this[_0x2ac098(0x17a)](_0x499cec,_0x576794+(_0x4458da-ImageManager['iconWidth']),_0x5da6fd),_0x4458da-=ImageManager[_0x2ac098(0x37b)]+0x4;}}else this[_0x2ac098(0x4d7)](ColorManager[_0x2ac098(0x3a4)]()),this[_0x2ac098(0x665)](_0x3bb09d,_0x576794,_0x1d83e7,_0x4458da,_0x2ac098(0x25b)),_0x4458da-=this[_0x2ac098(0x409)](_0x3bb09d)+0x6;this[_0x2ac098(0x605)]();const _0x4a373f=this[_0x2ac098(0x409)](this[_0x2ac098(0x4e3)]?VisuMZ[_0x2ac098(0x14f)](_0x2a712c):_0x2a712c);_0x4a373f>_0x4458da?this[_0x2ac098(0x665)](VisuMZ[_0x2ac098(0x676)][_0x2ac098(0x502)][_0x2ac098(0x2d9)][_0x2ac098(0x3e0)],_0x576794,_0x1d83e7,_0x4458da,_0x2ac098(0x25b)):this['drawText'](_0x2a712c,_0x576794,_0x1d83e7,_0x4458da,_0x2ac098(0x25b)),this[_0x2ac098(0x7d8)]();},Window_Base['prototype'][_0x479088(0x592)]=function(_0x4464d9,_0x69787e,_0x4261eb,_0x5089f9,_0x1ab7e3){const _0x237993=_0x479088,_0x14c054=ImageManager[_0x237993(0x1e1)](_0x237993(0x701)),_0x156d1c=ImageManager['iconWidth'],_0x560b3d=ImageManager[_0x237993(0x24d)],_0xa9d5b4=_0x4464d9%0x10*_0x156d1c,_0x5cc5a2=Math[_0x237993(0x7c1)](_0x4464d9/0x10)*_0x560b3d,_0x10dad8=_0x5089f9,_0x32d86b=_0x5089f9;this[_0x237993(0x4fc)]['_context'][_0x237993(0x42f)]=_0x1ab7e3,this[_0x237993(0x4fc)][_0x237993(0x6bb)](_0x14c054,_0xa9d5b4,_0x5cc5a2,_0x156d1c,_0x560b3d,_0x69787e,_0x4261eb,_0x10dad8,_0x32d86b),this[_0x237993(0x4fc)][_0x237993(0x2c5)]['imageSmoothingEnabled']=!![];},Window_Base[_0x479088(0x6e6)][_0x479088(0x4b5)]=function(_0x4d5ada,_0x2e119a,_0x2914f5,_0xbccc8e,_0x1505ea,_0x168d25){const _0x8bbc92=_0x479088,_0x25f1c8=Math[_0x8bbc92(0x7c1)]((_0x2914f5-0x2)*_0xbccc8e),_0x2edd71=Sprite_Gauge[_0x8bbc92(0x6e6)][_0x8bbc92(0x6c6)]['call'](this),_0x59f482=_0x2e119a+this['lineHeight']()-_0x2edd71-0x2;this[_0x8bbc92(0x4fc)][_0x8bbc92(0x598)](_0x4d5ada,_0x59f482,_0x2914f5,_0x2edd71,ColorManager[_0x8bbc92(0x3c4)]()),this['contents'][_0x8bbc92(0x23a)](_0x4d5ada+0x1,_0x59f482+0x1,_0x25f1c8,_0x2edd71-0x2,_0x1505ea,_0x168d25);},Window_Selectable[_0x479088(0x6e6)][_0x479088(0x427)]=function(_0x1a4b1b){const _0x2a99eb=_0x479088;let _0x49b8a0=this['index']();const _0x9771b7=this[_0x2a99eb(0x7be)](),_0x4d6fd8=this[_0x2a99eb(0x7a8)]();if(this['isUseModernControls']()&&(_0x49b8a0<_0x9771b7||_0x1a4b1b&&_0x4d6fd8===0x1)){_0x49b8a0+=_0x4d6fd8;if(_0x49b8a0>=_0x9771b7)_0x49b8a0=_0x9771b7-0x1;this['smoothSelect'](_0x49b8a0);}else!this[_0x2a99eb(0x3c1)]()&&((_0x49b8a0<_0x9771b7-_0x4d6fd8||_0x1a4b1b&&_0x4d6fd8===0x1)&&this[_0x2a99eb(0x1f2)]((_0x49b8a0+_0x4d6fd8)%_0x9771b7));},Window_Selectable[_0x479088(0x6e6)][_0x479088(0x3c1)]=function(){const _0x44009c=_0x479088;return VisuMZ[_0x44009c(0x676)][_0x44009c(0x502)]['QoL'][_0x44009c(0x3ec)];},VisuMZ[_0x479088(0x676)]['Window_Selectable_processCursorMove']=Window_Selectable['prototype'][_0x479088(0x4aa)],Window_Selectable[_0x479088(0x6e6)][_0x479088(0x4aa)]=function(){const _0x119571=_0x479088;if(this[_0x119571(0x3c1)]())this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']();else{if(_0x119571(0x610)!=='StCZP')VisuMZ[_0x119571(0x676)][_0x119571(0x15d)][_0x119571(0x4c7)](this);else{function _0x54ddc1(){const _0x541430=_0x119571;this[_0x541430(0x665)](_0x46eccd,_0x2e8af4,_0x45fb8f,_0x10c8e3);}}}},Window_Selectable[_0x479088(0x6e6)][_0x479088(0x1c2)]=function(){const _0x385dd4=_0x479088;if(this[_0x385dd4(0x6ad)]()){if('iGZbp'!==_0x385dd4(0x64e)){function _0x11f21b(){const _0x4a9705=_0x385dd4;this['_inputWindow'][_0x4a9705(0x516)](_0x350c34[_0x4a9705(0x3e8)][_0x4a9705(0x1ca)]);}}else{const _0x8aa185=this[_0x385dd4(0x791)]();if(Input['isRepeated'](_0x385dd4(0x2dd))){if(Input[_0x385dd4(0x6d0)](_0x385dd4(0x1fb))){if(_0x385dd4(0x55e)==='lpLvj')this[_0x385dd4(0x5b1)]();else{function _0x377eb7(){const _0x2d4ae7=_0x385dd4;this[_0x2d4ae7(0x359)][_0x2d4ae7(0x516)](_0x5490eb[_0x2d4ae7(0x3e8)]['DummyBgType']);}}}else{if(_0x385dd4(0x6fe)==='mGPrM'){function _0x44c84d(){const _0x46546d=_0x385dd4;var _0xb7cc86=_0x36e3d5[_0x46546d(0x6d1)](_0x3a2fa2*0x2-0x1,_0x46546d(0x374))*0.5+0.5;}}else this[_0x385dd4(0x427)](Input[_0x385dd4(0x6e4)]('down'));}}if(Input['isRepeated']('up')){if(Input['isPressed'](_0x385dd4(0x1fb))){if(_0x385dd4(0x15b)!==_0x385dd4(0x15b)){function _0x3e20dc(){_0x3464ac+=_0x95d9e9(_0x1a5368);}}else this[_0x385dd4(0x484)]();}else this[_0x385dd4(0x7d1)](Input['isTriggered']('up'));}Input[_0x385dd4(0x728)](_0x385dd4(0x25b))&&this[_0x385dd4(0x3df)](Input[_0x385dd4(0x6e4)](_0x385dd4(0x25b)));Input[_0x385dd4(0x728)](_0x385dd4(0x5ac))&&this[_0x385dd4(0x278)](Input['isTriggered'](_0x385dd4(0x5ac)));if(!this['isHandled'](_0x385dd4(0x5a8))&&Input['isRepeated'](_0x385dd4(0x5a8))){if('JYXzj'==='JYXzj')this[_0x385dd4(0x5b1)]();else{function _0x59d161(){const _0x28ded2=_0x385dd4;_0x467c3f['CoreEngine']['Scene_Shop_create'][_0x28ded2(0x4c7)](this),this[_0x28ded2(0x600)]();}}}!this['isHandled'](_0x385dd4(0x721))&&Input['isRepeated'](_0x385dd4(0x721))&&this[_0x385dd4(0x484)](),this['index']()!==_0x8aa185&&this['playCursorSound']();}}},VisuMZ[_0x479088(0x676)][_0x479088(0x4c0)]=Window_Selectable[_0x479088(0x6e6)][_0x479088(0x427)],Window_Selectable[_0x479088(0x6e6)]['cursorDown']=function(_0x517bcd){const _0x547b25=_0x479088;this[_0x547b25(0x3c1)]()&&_0x517bcd&&this[_0x547b25(0x7a8)]()===0x1&&this[_0x547b25(0x791)]()===this['maxItems']()-0x1?this[_0x547b25(0x1f2)](0x0):VisuMZ[_0x547b25(0x676)]['Window_Selectable_cursorDown'][_0x547b25(0x4c7)](this,_0x517bcd);},Window_Selectable[_0x479088(0x6e6)][_0x479088(0x401)]=function(){const _0x5f3084=_0x479088;if(this[_0x5f3084(0x6ad)]()){if(_0x5f3084(0x308)==='vFbok'){function _0x44c95f(){const _0xc2e9a8=_0x5f3084;return this[_0xc2e9a8(0x64d)];}}else{const _0x2b395d=this[_0x5f3084(0x791)]();Input[_0x5f3084(0x6e4)](_0x5f3084(0x387))&&this[_0x5f3084(0x1f2)](Math['min'](this['index'](),0x0));if(Input[_0x5f3084(0x6e4)](_0x5f3084(0x27e))){if(_0x5f3084(0x659)==='xQqDD'){function _0x3fdb98(){const _0x570bd5=_0x5f3084,_0x349bcd=_0x570bd5(0x25e);this[_0x570bd5(0x53e)]=this[_0x570bd5(0x53e)]||{};if(this[_0x570bd5(0x53e)][_0x349bcd])return this[_0x570bd5(0x53e)][_0x349bcd];const _0x16947c=_0x3ae762[_0x570bd5(0x676)][_0x570bd5(0x502)][_0x570bd5(0x6c9)][_0x570bd5(0x6df)];return this['getColorDataFromPluginParameters'](_0x349bcd,_0x16947c);}}else this[_0x5f3084(0x1f2)](Math[_0x5f3084(0x1ad)](this[_0x5f3084(0x791)](),this[_0x5f3084(0x7be)]()-0x1));}if(this['index']()!==_0x2b395d){if(_0x5f3084(0x5d7)===_0x5f3084(0x5d7))this[_0x5f3084(0x68d)]();else{function _0x8e6300(){this['processKeyboardEnd']();}}}}}},VisuMZ[_0x479088(0x676)]['Window_Selectable_processTouch']=Window_Selectable[_0x479088(0x6e6)][_0x479088(0x7a5)],Window_Selectable[_0x479088(0x6e6)][_0x479088(0x7a5)]=function(){const _0x47ca11=_0x479088;if(this['isUseModernControls']())this[_0x47ca11(0x5c9)]();else{if('KZGDX'==='KZGDX')VisuMZ['CoreEngine'][_0x47ca11(0x50f)][_0x47ca11(0x4c7)](this);else{function _0x33a907(){this['_muteSound']=_0x315778;}}}},Window_Selectable[_0x479088(0x6e6)][_0x479088(0x5c9)]=function(){const _0x2d88ae=_0x479088;VisuMZ['CoreEngine']['Window_Selectable_processTouch'][_0x2d88ae(0x4c7)](this);},Window_Selectable[_0x479088(0x6e6)][_0x479088(0x6ac)]=function(){const _0x4fe333=_0x479088;return VisuMZ[_0x4fe333(0x676)]['Settings'][_0x4fe333(0x55a)][_0x4fe333(0x479)];},Window_Selectable['prototype'][_0x479088(0x62a)]=function(){const _0x4be9f3=_0x479088;return VisuMZ[_0x4be9f3(0x676)][_0x4be9f3(0x502)][_0x4be9f3(0x55a)][_0x4be9f3(0x6f0)];},Window_Selectable[_0x479088(0x6e6)]['itemHeight']=function(){const _0x9d16ef=_0x479088;return Window_Scrollable[_0x9d16ef(0x6e6)][_0x9d16ef(0x7f5)]['call'](this)+VisuMZ['CoreEngine'][_0x9d16ef(0x502)][_0x9d16ef(0x55a)][_0x9d16ef(0x6e0)];;},VisuMZ[_0x479088(0x676)][_0x479088(0x22c)]=Window_Selectable[_0x479088(0x6e6)][_0x479088(0x27b)],Window_Selectable[_0x479088(0x6e6)]['drawBackgroundRect']=function(_0x3779ce){const _0x2d9af0=_0x479088,_0xabc3e0=VisuMZ['CoreEngine'][_0x2d9af0(0x502)]['Window'];if(_0xabc3e0['ShowItemBackground']===![])return;if(_0xabc3e0[_0x2d9af0(0x270)]){if(_0x2d9af0(0x4ed)===_0x2d9af0(0x347)){function _0x16cba4(){const _0x5b268c=_0x2d9af0;this[_0x5b268c(0x27a)](_0x3ae5e9[_0x5b268c(0x735)]);}}else _0xabc3e0[_0x2d9af0(0x270)][_0x2d9af0(0x4c7)](this,_0x3779ce);}else VisuMZ['CoreEngine'][_0x2d9af0(0x22c)]['call'](this,_0x3779ce);},VisuMZ[_0x479088(0x676)][_0x479088(0x1f5)]=Window_Gold[_0x479088(0x6e6)][_0x479088(0x5b5)],Window_Gold[_0x479088(0x6e6)][_0x479088(0x5b5)]=function(){const _0x42daec=_0x479088;if(this['isItemStyle']())this['drawGoldItemStyle']();else{if(_0x42daec(0x7ca)==='xQdTm'){function _0x464ff5(){const _0x7c9181=_0x42daec;return _0x5864e6[_0x7c9181(0x676)]['Settings']['UI'][_0x7c9181(0x6b0)];}}else VisuMZ[_0x42daec(0x676)][_0x42daec(0x1f5)][_0x42daec(0x4c7)](this);}},Window_Gold[_0x479088(0x6e6)][_0x479088(0x3b9)]=function(){const _0x5aec5d=_0x479088;if(TextManager[_0x5aec5d(0x4d3)]!==this['currencyUnit']())return![];return VisuMZ[_0x5aec5d(0x676)]['Settings'][_0x5aec5d(0x2d9)]['ItemStyle'];},Window_Gold[_0x479088(0x6e6)][_0x479088(0x55c)]=function(){const _0x14620e=_0x479088;this[_0x14620e(0x7d8)](),this[_0x14620e(0x4fc)][_0x14620e(0x4d8)](),this[_0x14620e(0x4fc)]['fontSize']=VisuMZ[_0x14620e(0x676)][_0x14620e(0x502)]['Gold'][_0x14620e(0x41a)];const _0x12e6bd=VisuMZ['CoreEngine']['Settings']['Gold']['GoldIcon'],_0x5b0810=this['itemLineRect'](0x0);if(_0x12e6bd>0x0){if('OOxoy'!==_0x14620e(0x2c7)){const _0x476a1f=_0x5b0810['y']+(this[_0x14620e(0x760)]()-ImageManager[_0x14620e(0x24d)])/0x2;this['drawIcon'](_0x12e6bd,_0x5b0810['x'],_0x476a1f);const _0x258c9e=ImageManager[_0x14620e(0x37b)]+0x4;_0x5b0810['x']+=_0x258c9e,_0x5b0810[_0x14620e(0x7bc)]-=_0x258c9e;}else{function _0x27cc64(){const _0x1e9088=_0x14620e;_0x3a737c[_0x1e9088(0x652)](_0x1e9088(0x1f6)),_0x2165db[_0x1e9088(0x652)](_0x17492c);}}}this['changeTextColor'](ColorManager['systemColor']()),this[_0x14620e(0x665)](this[_0x14620e(0x4d3)](),_0x5b0810['x'],_0x5b0810['y'],_0x5b0810['width'],_0x14620e(0x5ac));const _0x537f47=this[_0x14620e(0x409)](this[_0x14620e(0x4d3)]())+0x6;;_0x5b0810['x']+=_0x537f47,_0x5b0810['width']-=_0x537f47,this[_0x14620e(0x605)]();const _0x5181ec=this['value'](),_0x360409=this[_0x14620e(0x409)](this[_0x14620e(0x4e3)]?VisuMZ[_0x14620e(0x14f)](this[_0x14620e(0x755)]()):this[_0x14620e(0x755)]());if(_0x360409>_0x5b0810['width']){if(_0x14620e(0x438)===_0x14620e(0x438))this[_0x14620e(0x665)](VisuMZ[_0x14620e(0x676)][_0x14620e(0x502)][_0x14620e(0x2d9)][_0x14620e(0x3e0)],_0x5b0810['x'],_0x5b0810['y'],_0x5b0810[_0x14620e(0x7bc)],_0x14620e(0x25b));else{function _0x221510(){this['_inputString']=_0x3dc104;}}}else this[_0x14620e(0x665)](this[_0x14620e(0x755)](),_0x5b0810['x'],_0x5b0810['y'],_0x5b0810[_0x14620e(0x7bc)],'right');this[_0x14620e(0x7d8)]();},Window_StatusBase[_0x479088(0x6e6)]['drawParamText']=function(_0x15e3fa,_0xcc06fe,_0x76e404,_0x1ece2b,_0x3d6b50){const _0x21e401=_0x479088;_0x1ece2b=String(_0x1ece2b||'')[_0x21e401(0x2b9)]();if(VisuMZ[_0x21e401(0x676)][_0x21e401(0x502)][_0x21e401(0x1cb)][_0x21e401(0x17e)]){if('exkhR'!==_0x21e401(0x581)){const _0x12006d=VisuMZ[_0x21e401(0x455)](_0x1ece2b);if(_0x3d6b50)this['drawIconBySize'](_0x12006d,_0x15e3fa,_0xcc06fe,this[_0x21e401(0x212)]()),_0x76e404-=this[_0x21e401(0x212)]()+0x2,_0x15e3fa+=this[_0x21e401(0x212)]()+0x2;else{if(_0x21e401(0x5b2)===_0x21e401(0x5b2))this[_0x21e401(0x17a)](_0x12006d,_0x15e3fa+0x2,_0xcc06fe+0x2),_0x76e404-=ImageManager[_0x21e401(0x37b)]+0x4,_0x15e3fa+=ImageManager[_0x21e401(0x37b)]+0x4;else{function _0xdfaff3(){const _0x7dd575=_0x21e401,_0x4802fd=this[_0x7dd575(0x3f2)]/0x5,_0x5dd4b6=_0x1c3ddf['_scene'],_0x3375c6=_0x5dd4b6[_0x7dd575(0x293)[_0x7dd575(0x50d)](_0x50e05c)](),_0x407423=_0x5dd4b6[_0x7dd575(0x31b)['format'](_0x223fc0)]();this[_0x7dd575(0x38d)][_0x7dd575(0x39b)[_0x7dd575(0x50d)](_0x2504e2)]=_0x3375c6,this['_data'][_0x7dd575(0x376)[_0x7dd575(0x50d)](_0x73472a)]=_0x407423;if(_0x3375c6==='')return;if(_0x407423==='')return;const _0x382125=_0x5dd4b6[_0x7dd575(0x67b)['format'](_0x3baecc)](),_0x2d4e61=this[_0x7dd575(0x680)](),_0x479dd2=_0x4802fd*(_0x5af99c-0x1)+_0x2d4e61+_0x382125,_0x34a41f=_0x42752c[_0x7dd575(0x676)]['Settings'][_0x7dd575(0x6db)][_0x7dd575(0x628)];this[_0x7dd575(0x417)](_0x34a41f[_0x7dd575(0x50d)](_0x3375c6,_0x407423),_0x479dd2,0x0,_0x4802fd-_0x2d4e61*0x2);}}}}else{function _0x3797f5(){const _0x22592b=_0x21e401;let _0x27d269=_0x550dc2[_0x22592b(0x786)](_0x588082[_0x22592b(0x7bc)]/0x2+0xc0);_0x27d269-=_0x272111[_0x22592b(0x7c1)]((_0x538fea[_0x22592b(0x7bc)]-_0x1682e7[_0x22592b(0x45e)])/0x2),_0x27d269+=_0x1483c6*0x20;let _0x142336=_0x31948f[_0x22592b(0x5de)]-0xc8-_0x45ff4a[_0x22592b(0x7dd)]()*0x30;_0x142336-=_0x1c3c89[_0x22592b(0x7c1)]((_0xf2c28[_0x22592b(0x5de)]-_0x4ba13e[_0x22592b(0x77a)])/0x2),_0x142336+=_0x1dd758*0x30,this[_0x22592b(0x28d)](_0x27d269,_0x142336);}}}const _0x4017b4=TextManager['param'](_0x1ece2b);this[_0x21e401(0x7d8)](),this[_0x21e401(0x4d7)](ColorManager[_0x21e401(0x3a4)]()),_0x3d6b50?(this[_0x21e401(0x4fc)][_0x21e401(0x195)]=this['smallParamFontSize'](),this[_0x21e401(0x4fc)][_0x21e401(0x665)](_0x4017b4,_0x15e3fa,_0xcc06fe,_0x76e404,this[_0x21e401(0x212)](),_0x21e401(0x5ac))):this[_0x21e401(0x665)](_0x4017b4,_0x15e3fa,_0xcc06fe,_0x76e404),this[_0x21e401(0x7d8)]();},Window_StatusBase['prototype'][_0x479088(0x633)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x512)]=function(_0x1b78a6,_0x58b284,_0x5a09f9,_0x1efe21){const _0x37e43f=_0x479088;_0x1efe21=_0x1efe21||0xa8,this[_0x37e43f(0x605)]();if(VisuMZ[_0x37e43f(0x676)][_0x37e43f(0x502)]['UI'][_0x37e43f(0x25d)])this['drawTextEx'](_0x1b78a6[_0x37e43f(0x577)]()[_0x37e43f(0x735)],_0x58b284,_0x5a09f9,_0x1efe21);else{const _0x44d524=_0x1b78a6[_0x37e43f(0x577)]()[_0x37e43f(0x735)][_0x37e43f(0x68a)](/\\I\[(\d+)\]/gi,'');this[_0x37e43f(0x665)](_0x44d524,_0x58b284,_0x5a09f9,_0x1efe21);}},Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x3ce)]=function(_0x3d5748,_0x34a8cc,_0x5a084e,_0x1ed033){const _0x505999=_0x479088;_0x1ed033=_0x1ed033||0x10e,this[_0x505999(0x605)]();if(VisuMZ[_0x505999(0x676)]['Settings']['UI'][_0x505999(0x244)])this['drawTextEx'](_0x3d5748[_0x505999(0x30e)](),_0x34a8cc,_0x5a084e,_0x1ed033);else{const _0x1c1309=_0x3d5748[_0x505999(0x30e)]()[_0x505999(0x68a)](/\\I\[(\d+)\]/gi,'');this[_0x505999(0x665)](_0x3d5748['nickname'](),_0x34a8cc,_0x5a084e,_0x1ed033);}},VisuMZ[_0x479088(0x676)][_0x479088(0x564)]=Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x57b)],Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x57b)]=function(_0x42bf6e,_0xc1df04,_0x4536f2){const _0x467ab4=_0x479088;if(this[_0x467ab4(0x266)]())this['drawActorExpGauge'](_0x42bf6e,_0xc1df04,_0x4536f2);VisuMZ[_0x467ab4(0x676)][_0x467ab4(0x564)][_0x467ab4(0x4c7)](this,_0x42bf6e,_0xc1df04,_0x4536f2);},Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x266)]=function(){const _0x12326b=_0x479088;return VisuMZ[_0x12326b(0x676)][_0x12326b(0x502)]['UI'][_0x12326b(0x391)];},Window_StatusBase[_0x479088(0x6e6)][_0x479088(0x241)]=function(_0xcad42f,_0x324504,_0x511566){const _0x34b0cd=_0x479088;if(!_0xcad42f)return;if(!_0xcad42f[_0x34b0cd(0x776)]())return;const _0x100f94=0x80,_0xec4bc9=_0xcad42f['expRate']();let _0x1e90ba=ColorManager[_0x34b0cd(0x214)](),_0x565c8a=ColorManager[_0x34b0cd(0x351)]();if(_0xec4bc9>=0x1){if('ncXCv'==='kGEoY'){function _0x34511d(){const _0x2af473=_0x34b0cd;var _0x1483f7=_0x3d761e(_0x3db87a['$1']);try{_0x1a5bcc+=_0x47431a(_0x1483f7);}catch(_0x33e3e2){if(_0x4d355e[_0x2af473(0x2b6)]())_0x2cf37d[_0x2af473(0x652)](_0x33e3e2);}}}else _0x1e90ba=ColorManager[_0x34b0cd(0x6ed)](),_0x565c8a=ColorManager['maxLvGaugeColor2']();}this['drawGauge'](_0x324504,_0x511566,_0x100f94,_0xec4bc9,_0x1e90ba,_0x565c8a);},Window_EquipStatus[_0x479088(0x6e6)][_0x479088(0x766)]=function(){const _0x10fd71=_0x479088;let _0x2947f9=0x0;for(const _0x2f3736 of VisuMZ['CoreEngine'][_0x10fd71(0x502)][_0x10fd71(0x1cb)]['DisplayedParams']){if(_0x10fd71(0x69c)===_0x10fd71(0x69c)){const _0x1b9526=this[_0x10fd71(0x680)](),_0x1353a2=this[_0x10fd71(0x393)](_0x2947f9);this[_0x10fd71(0x61f)](_0x1b9526,_0x1353a2,_0x2f3736),_0x2947f9++;}else{function _0x599730(){const _0x2cbdb2=_0x10fd71;_0xfe263c+=_0x2cbdb2(0x6ca);}}}},Window_EquipStatus[_0x479088(0x6e6)][_0x479088(0x49d)]=function(_0x5c6b93,_0x2e77b9,_0x3c1b65){const _0x3646ce=_0x479088,_0x42b1d2=this[_0x3646ce(0x46e)]()-this[_0x3646ce(0x680)]()*0x2;this[_0x3646ce(0x2ce)](_0x5c6b93,_0x2e77b9,_0x42b1d2,_0x3c1b65,![]);},Window_EquipStatus[_0x479088(0x6e6)][_0x479088(0x4b8)]=function(_0x3fd58b,_0x7cd880,_0x471d4e){const _0x53d10d=_0x479088,_0x466d21=this[_0x53d10d(0x4bd)]();this[_0x53d10d(0x605)](),this[_0x53d10d(0x665)](this[_0x53d10d(0x3da)][_0x53d10d(0x315)](_0x471d4e,!![]),_0x3fd58b,_0x7cd880,_0x466d21,_0x53d10d(0x25b));},Window_EquipStatus['prototype'][_0x479088(0x240)]=function(_0x367ffa,_0x489a7d){const _0x267833=_0x479088,_0x32c843=this[_0x267833(0x7da)]();this[_0x267833(0x4d7)](ColorManager[_0x267833(0x3a4)]());const _0x3e7ea2=VisuMZ['CoreEngine'][_0x267833(0x502)]['UI'][_0x267833(0x5b3)];this[_0x267833(0x665)](_0x3e7ea2,_0x367ffa,_0x489a7d,_0x32c843,_0x267833(0x47b));},Window_EquipStatus['prototype']['drawNewParam']=function(_0x207b97,_0x24ca20,_0x440d7b){const _0x9dcdc5=_0x479088,_0x11c423=this['paramWidth'](),_0x499521=this[_0x9dcdc5(0x43c)][_0x9dcdc5(0x315)](_0x440d7b),_0x429197=_0x499521-this['_actor']['paramValueByName'](_0x440d7b);this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x429197)),this['drawText'](VisuMZ[_0x9dcdc5(0x1d3)](_0x499521,0x0),_0x207b97,_0x24ca20,_0x11c423,_0x9dcdc5(0x25b));},Window_StatusParams['prototype'][_0x479088(0x7be)]=function(){const _0x4d8075=_0x479088;return VisuMZ[_0x4d8075(0x676)][_0x4d8075(0x502)]['Param'][_0x4d8075(0x733)][_0x4d8075(0x774)];},Window_StatusParams['prototype'][_0x479088(0x61f)]=function(_0x223990){const _0x32d7fe=_0x479088,_0x3ca767=this[_0x32d7fe(0x381)](_0x223990),_0x301938=VisuMZ[_0x32d7fe(0x676)][_0x32d7fe(0x502)][_0x32d7fe(0x1cb)][_0x32d7fe(0x733)][_0x223990],_0x56dac9=TextManager['param'](_0x301938),_0x1052bf=this[_0x32d7fe(0x3da)][_0x32d7fe(0x315)](_0x301938,!![]);this[_0x32d7fe(0x2ce)](_0x3ca767['x'],_0x3ca767['y'],0xa0,_0x301938,![]),this['resetTextColor'](),this[_0x32d7fe(0x665)](_0x1052bf,_0x3ca767['x']+0xa0,_0x3ca767['y'],0x3c,_0x32d7fe(0x25b));};if(VisuMZ[_0x479088(0x676)][_0x479088(0x502)][_0x479088(0x373)]['EnableNameInput']){VisuMZ['CoreEngine'][_0x479088(0x502)]['KeyboardInput'][_0x479088(0x731)]&&(Window_NameInput[_0x479088(0x2f7)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ['CoreEngine'][_0x479088(0x5fe)]=Window_NameInput[_0x479088(0x6e6)][_0x479088(0x65b)],Window_NameInput[_0x479088(0x6e6)][_0x479088(0x65b)]=function(_0x3fe56c){const _0x4ad197=_0x479088;this[_0x4ad197(0x7b9)]='keyboard',VisuMZ[_0x4ad197(0x676)][_0x4ad197(0x5fe)]['call'](this,_0x3fe56c),Input[_0x4ad197(0x4d8)](),this[_0x4ad197(0x229)]();},VisuMZ[_0x479088(0x676)][_0x479088(0x7b7)]=Window_NameInput[_0x479088(0x6e6)][_0x479088(0x3d2)],Window_NameInput[_0x479088(0x6e6)][_0x479088(0x3d2)]=function(){const _0x3cfcd1=_0x479088;if(!this[_0x3cfcd1(0x175)]())return;if(!this['active'])return;if(Input[_0x3cfcd1(0x260)](_0x3cfcd1(0x732))){if(_0x3cfcd1(0x57c)===_0x3cfcd1(0x66a)){function _0x30891a(){const _0x245b10=_0x3cfcd1;_0x50f95b['CoreEngine'][_0x245b10(0x50f)]['call'](this);}}else console[_0x3cfcd1(0x652)]('a'),Input['clear'](),this[_0x3cfcd1(0x672)]();}else{if(Input[_0x3cfcd1(0x6e4)](_0x3cfcd1(0x1d0))){if(_0x3cfcd1(0x2a7)===_0x3cfcd1(0x463)){function _0x20cc2a(){const _0x5b3e68=_0x3cfcd1,_0x51d520=this['index']();_0x203d42['isTriggered'](_0x5b3e68(0x387))&&this[_0x5b3e68(0x1f2)](_0xe3af36[_0x5b3e68(0x2d7)](this[_0x5b3e68(0x791)](),0x0)),_0x880a4d[_0x5b3e68(0x6e4)](_0x5b3e68(0x27e))&&this['smoothSelect'](_0x539497[_0x5b3e68(0x1ad)](this[_0x5b3e68(0x791)](),this[_0x5b3e68(0x7be)]()-0x1)),this['index']()!==_0x51d520&&this[_0x5b3e68(0x68d)]();}}else Input[_0x3cfcd1(0x4d8)](),this[_0x3cfcd1(0x7b9)]===_0x3cfcd1(0x2df)?this['switchModes'](_0x3cfcd1(0x2de)):this[_0x3cfcd1(0x60a)](_0x3cfcd1(0x2df));}else{if(this['_mode']===_0x3cfcd1(0x2df))this[_0x3cfcd1(0x3ef)]();else Input[_0x3cfcd1(0x260)]('escape')?(Input['clear'](),this[_0x3cfcd1(0x60a)](_0x3cfcd1(0x2df))):VisuMZ[_0x3cfcd1(0x676)][_0x3cfcd1(0x7b7)][_0x3cfcd1(0x4c7)](this);}}},VisuMZ[_0x479088(0x676)][_0x479088(0x32b)]=Window_NameInput['prototype']['processTouch'],Window_NameInput[_0x479088(0x6e6)]['processTouch']=function(){const _0x467ad4=_0x479088;if(!this['isOpenAndActive']())return;if(this[_0x467ad4(0x7b9)]===_0x467ad4(0x2df)){if(_0x467ad4(0x6a1)!=='HZpyk'){function _0x4e322b(){const _0x2b5239=_0x467ad4;_0xc913a7[_0x13953f]=_0x3b895b[_0x2b5239(0x496)][_0x2350d3[_0x5d88bc]];}}else{if(TouchInput[_0x467ad4(0x6e4)]()&&this['isTouchedInsideFrame']())this[_0x467ad4(0x60a)](_0x467ad4(0x2de));else TouchInput[_0x467ad4(0x313)]()&&this[_0x467ad4(0x60a)]('default');}}else VisuMZ[_0x467ad4(0x676)][_0x467ad4(0x32b)]['call'](this);},Window_NameInput['prototype']['processKeyboardHandling']=function(){const _0x1a9073=_0x479088;if(Input[_0x1a9073(0x260)]('enter')){if(_0x1a9073(0x172)!==_0x1a9073(0x146))Input[_0x1a9073(0x4d8)](),this[_0x1a9073(0x159)]();else{function _0x53569b(){const _0x374d12=_0x1a9073;_0x49b16c[_0x374d12(0x6e6)]['create'][_0x374d12(0x4c7)](this),this[_0x374d12(0x600)]();}}}else{if(Input[_0x1a9073(0x686)]!==undefined){let _0x477817=Input['_inputString'],_0x578174=_0x477817['length'];for(let _0x45e3a9=0x0;_0x45e3a9<_0x578174;++_0x45e3a9){if(_0x1a9073(0x45c)==='flYyn'){if(this['_editWindow'][_0x1a9073(0x451)](_0x477817[_0x45e3a9])){if(_0x1a9073(0x312)!=='BDVBa')SoundManager[_0x1a9073(0x4e6)]();else{function _0x4a64f2(){const _0x3ef0be=_0x1a9073;this[_0x3ef0be(0x158)][_0x3ef0be(0x516)](_0xbc5a20[_0x3ef0be(0x3e8)]['SkillTypeBgType']);}}}else SoundManager[_0x1a9073(0x72a)]();}else{function _0x2746be(){const _0x5c7f76=_0x1a9073;if(_0x2ce59c[_0x5c7f76(0x2b6)]())_0x248659['log'](_0x3de07f);}}}Input[_0x1a9073(0x4d8)]();}}},Window_NameInput[_0x479088(0x6e6)][_0x479088(0x60a)]=function(_0x25e3d1){const _0x1ce6c1=_0x479088;let _0x31b005=this[_0x1ce6c1(0x7b9)];this['_mode']=_0x25e3d1,_0x31b005!==this[_0x1ce6c1(0x7b9)]&&(this[_0x1ce6c1(0x5b5)](),SoundManager[_0x1ce6c1(0x4e6)](),this['_mode']===_0x1ce6c1(0x2de)?this[_0x1ce6c1(0x31c)](0x0):this[_0x1ce6c1(0x31c)](-0x1));},VisuMZ['CoreEngine'][_0x479088(0x36c)]=Window_NameInput['prototype'][_0x479088(0x427)],Window_NameInput['prototype'][_0x479088(0x427)]=function(_0x79cd87){const _0x437a85=_0x479088;if(this[_0x437a85(0x7b9)]===_0x437a85(0x2df)&&!Input[_0x437a85(0x6e8)]())return;if(Input[_0x437a85(0x5f8)]())return;VisuMZ['CoreEngine'][_0x437a85(0x36c)][_0x437a85(0x4c7)](this,_0x79cd87),this[_0x437a85(0x60a)](_0x437a85(0x2de));},VisuMZ[_0x479088(0x676)][_0x479088(0x74c)]=Window_NameInput[_0x479088(0x6e6)][_0x479088(0x7d1)],Window_NameInput[_0x479088(0x6e6)][_0x479088(0x7d1)]=function(_0x19fae1){const _0x5530c8=_0x479088;if(this[_0x5530c8(0x7b9)]===_0x5530c8(0x2df)&&!Input[_0x5530c8(0x6e8)]())return;if(Input[_0x5530c8(0x5f8)]())return;VisuMZ[_0x5530c8(0x676)][_0x5530c8(0x74c)][_0x5530c8(0x4c7)](this,_0x19fae1),this[_0x5530c8(0x60a)](_0x5530c8(0x2de));},VisuMZ['CoreEngine'][_0x479088(0x683)]=Window_NameInput[_0x479088(0x6e6)][_0x479088(0x3df)],Window_NameInput[_0x479088(0x6e6)][_0x479088(0x3df)]=function(_0x4ab46d){const _0x1fad37=_0x479088;if(this['_mode']==='keyboard'&&!Input[_0x1fad37(0x6e8)]())return;if(Input[_0x1fad37(0x5f8)]())return;VisuMZ[_0x1fad37(0x676)][_0x1fad37(0x683)][_0x1fad37(0x4c7)](this,_0x4ab46d),this[_0x1fad37(0x60a)](_0x1fad37(0x2de));},VisuMZ[_0x479088(0x676)][_0x479088(0x2ef)]=Window_NameInput[_0x479088(0x6e6)][_0x479088(0x278)],Window_NameInput[_0x479088(0x6e6)][_0x479088(0x278)]=function(_0x2ad068){const _0x1221fe=_0x479088;if(this[_0x1221fe(0x7b9)]===_0x1221fe(0x2df)&&!Input[_0x1221fe(0x6e8)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x1221fe(0x676)][_0x1221fe(0x2ef)][_0x1221fe(0x4c7)](this,_0x2ad068),this[_0x1221fe(0x60a)](_0x1221fe(0x2de));},VisuMZ[_0x479088(0x676)][_0x479088(0x306)]=Window_NameInput['prototype'][_0x479088(0x5b1)],Window_NameInput[_0x479088(0x6e6)][_0x479088(0x5b1)]=function(){const _0x4f3ce1=_0x479088;if(this[_0x4f3ce1(0x7b9)]===_0x4f3ce1(0x2df))return;if(Input[_0x4f3ce1(0x5f8)]())return;VisuMZ[_0x4f3ce1(0x676)][_0x4f3ce1(0x306)]['call'](this),this[_0x4f3ce1(0x60a)](_0x4f3ce1(0x2de));},VisuMZ['CoreEngine'][_0x479088(0x6ba)]=Window_NameInput[_0x479088(0x6e6)][_0x479088(0x484)],Window_NameInput['prototype'][_0x479088(0x484)]=function(){const _0x5dd02c=_0x479088;if(this[_0x5dd02c(0x7b9)]===_0x5dd02c(0x2df))return;if(Input[_0x5dd02c(0x5f8)]())return;VisuMZ['CoreEngine'][_0x5dd02c(0x6ba)][_0x5dd02c(0x4c7)](this),this[_0x5dd02c(0x60a)](_0x5dd02c(0x2de));},VisuMZ[_0x479088(0x676)][_0x479088(0x203)]=Window_NameInput[_0x479088(0x6e6)][_0x479088(0x5b5)],Window_NameInput['prototype'][_0x479088(0x5b5)]=function(){const _0x31072d=_0x479088;if(this[_0x31072d(0x7b9)]===_0x31072d(0x2df)){if(_0x31072d(0x469)!==_0x31072d(0x469)){function _0x30e036(){const _0x398543=_0x31072d;return this[_0x398543(0x602)]()?this[_0x398543(0x639)](_0x279d68,_0x33fe5a):_0x331ca6[_0x398543(0x676)][_0x398543(0x67f)][_0x398543(0x4c7)](this,_0x3eea54,_0x7c146);}}else{this[_0x31072d(0x4fc)][_0x31072d(0x4d8)](),this[_0x31072d(0x59c)][_0x31072d(0x4d8)](),this[_0x31072d(0x605)]();let _0x22425f=VisuMZ[_0x31072d(0x676)][_0x31072d(0x502)][_0x31072d(0x373)][_0x31072d(0x744)][_0x31072d(0x635)]('\x0a'),_0x13e4fc=_0x22425f[_0x31072d(0x774)],_0x560fa5=(this['innerHeight']-_0x13e4fc*this[_0x31072d(0x760)]())/0x2;for(let _0x2b5860=0x0;_0x2b5860<_0x13e4fc;++_0x2b5860){if(_0x31072d(0x2a1)===_0x31072d(0x33b)){function _0x48796f(){const _0x11a3e2=_0x31072d;_0x2a0c81[_0x11a3e2(0x332)](_0x31c40a,_0x5f10f7);const _0x243e79=_0x7516a9[_0x11a3e2(0x49b)];_0x1640f9['openURL'](_0x243e79);}}else{let _0x2edd20=_0x22425f[_0x2b5860],_0x4cc282=this[_0x31072d(0x448)](_0x2edd20)[_0x31072d(0x7bc)],_0x2122ba=Math[_0x31072d(0x7c1)]((this['contents']['width']-_0x4cc282)/0x2);this[_0x31072d(0x417)](_0x2edd20,_0x2122ba,_0x560fa5),_0x560fa5+=this[_0x31072d(0x760)]();}}}}else{if(_0x31072d(0x4b0)===_0x31072d(0x4b0))VisuMZ[_0x31072d(0x676)][_0x31072d(0x203)][_0x31072d(0x4c7)](this);else{function _0x595dce(){const _0x19c5f9=_0x31072d;if(!this[_0x19c5f9(0x6ad)]())return;_0x4df57e[_0x19c5f9(0x5f8)]()?this['processKeyboardDigitChange']():_0x766d0a[_0x19c5f9(0x6e6)][_0x19c5f9(0x4aa)][_0x19c5f9(0x4c7)](this);}}}};};VisuMZ[_0x479088(0x676)][_0x479088(0x263)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x479088(0x6e6)][_0x479088(0x573)]=function(_0x18f0f6){const _0x17a228=_0x479088;if(VisuMZ[_0x17a228(0x676)][_0x17a228(0x502)][_0x17a228(0x6da)]['KeyItemProtect']&&DataManager[_0x17a228(0x426)](_0x18f0f6)){if('sQccx'!==_0x17a228(0x7c8)){function _0x28734c(){const _0x468713=_0x17a228;return-0.5*(_0x3ff720[_0x468713(0x527)](0x2,0xa*_0x1ab63c)*_0xbba341[_0x468713(0x5e7)]((_0x246d66-_0x4699ed)*(0x2*_0x50b347['PI'])/_0x16103d));}}else return![];}else return VisuMZ[_0x17a228(0x676)][_0x17a228(0x263)][_0x17a228(0x4c7)](this,_0x18f0f6);},Window_NumberInput[_0x479088(0x6e6)]['isUseModernControls']=function(){return![];};VisuMZ['CoreEngine'][_0x479088(0x502)][_0x479088(0x373)][_0x479088(0x295)]&&(VisuMZ['CoreEngine'][_0x479088(0x1fc)]=Window_NumberInput[_0x479088(0x6e6)]['start'],Window_NumberInput[_0x479088(0x6e6)][_0x479088(0x46f)]=function(){const _0x550025=_0x479088;VisuMZ[_0x550025(0x676)]['Window_NumberInput_start'][_0x550025(0x4c7)](this),this['select'](this[_0x550025(0x7c3)]-0x1);},VisuMZ[_0x479088(0x676)][_0x479088(0x6f4)]=Window_NumberInput[_0x479088(0x6e6)][_0x479088(0x348)],Window_NumberInput['prototype']['processDigitChange']=function(){const _0x5e08df=_0x479088;if(!this[_0x5e08df(0x768)]())return;if(Input[_0x5e08df(0x5f8)]())this[_0x5e08df(0x356)]();else{if(Input[_0x5e08df(0x260)](_0x5e08df(0x732))){if(_0x5e08df(0x307)!=='crMwl'){function _0x22e537(){const _0x52ebab=new _0x2e2efe(_0x242e6d);this['addChild'](_0x52ebab);}}else this[_0x5e08df(0x20f)]();}else{if(Input[_0x5e08df(0x237)]===0x2e)this[_0x5e08df(0x498)]();else{if(Input[_0x5e08df(0x237)]===0x24){if(_0x5e08df(0x358)!=='KeiTj')this[_0x5e08df(0x6c7)]();else{function _0x29f658(){const _0x323be4=_0x5e08df;return _0x431675[_0x323be4(0x3e8)][_0x323be4(0x6a0)][_0x323be4(0x4c7)](this);}}}else{if(Input[_0x5e08df(0x237)]===0x23)this['processKeyboardEnd']();else{if(_0x5e08df(0x1ba)===_0x5e08df(0x1ba))VisuMZ['CoreEngine'][_0x5e08df(0x6f4)]['call'](this),Input[_0x5e08df(0x4d8)]();else{function _0x1d3ba4(){const _0x53008c=_0x5e08df;_0x9dc09['CoreEngine'][_0x53008c(0x6e9)][_0x53008c(0x4c7)](this),this['destroyCoreEngineMarkedBitmaps']();}}}}}}}},Window_NumberInput[_0x479088(0x6e6)][_0x479088(0x4aa)]=function(){const _0xf05c4b=_0x479088;if(!this['isCursorMovable']())return;if(Input[_0xf05c4b(0x5f8)]()){if(_0xf05c4b(0x5e8)!==_0xf05c4b(0x14b))this[_0xf05c4b(0x356)]();else{function _0x346f50(){const _0x5eb05c=_0xf05c4b,_0x26c2f5=this['paramWidth'](),_0x72bf16=this[_0x5eb05c(0x43c)][_0x5eb05c(0x315)](_0x4743f5),_0x3dab18=_0x72bf16-this['_actor']['paramValueByName'](_0x553dbb);this[_0x5eb05c(0x4d7)](_0x1aa331[_0x5eb05c(0x230)](_0x3dab18)),this[_0x5eb05c(0x665)](_0x4584c1[_0x5eb05c(0x1d3)](_0x72bf16,0x0),_0x52f789,_0x941924,_0x26c2f5,_0x5eb05c(0x25b));}}}else{if(_0xf05c4b(0x546)!==_0xf05c4b(0x546)){function _0xb52e7a(){const _0x25c2c3=_0xf05c4b;return typeof _0x22b9f8===_0x25c2c3(0x44e)?_0x293a63['CoreEngine'][_0x25c2c3(0x3fa)][_0x25c2c3(0x4c7)](this,_0x460b38):this[_0x25c2c3(0x70a)](_0x236e63);}}else Window_Selectable[_0xf05c4b(0x6e6)][_0xf05c4b(0x4aa)]['call'](this);}},Window_NumberInput['prototype'][_0x479088(0x401)]=function(){},Window_NumberInput['prototype'][_0x479088(0x356)]=function(){const _0x851b11=_0x479088;if(String(this[_0x851b11(0x74f)])['length']>=this[_0x851b11(0x7c3)])return;this[_0x851b11(0x74f)]=Number(String(this['_number'])+Input[_0x851b11(0x686)]);const _0x3f30d5='9'[_0x851b11(0x6d7)](this[_0x851b11(0x7c3)]);this[_0x851b11(0x74f)]=this['_number'][_0x851b11(0x520)](0x0,_0x3f30d5),Input[_0x851b11(0x4d8)](),this[_0x851b11(0x5b5)](),SoundManager[_0x851b11(0x559)](),this[_0x851b11(0x31c)](this[_0x851b11(0x7c3)]-0x1);},Window_NumberInput[_0x479088(0x6e6)][_0x479088(0x20f)]=function(){const _0x30e120=_0x479088;this['_number']=Number(String(this[_0x30e120(0x74f)])[_0x30e120(0x618)](0x0,-0x1)),this[_0x30e120(0x74f)]=Math[_0x30e120(0x1ad)](0x0,this['_number']),Input[_0x30e120(0x4d8)](),this['refresh'](),SoundManager[_0x30e120(0x559)](),this[_0x30e120(0x31c)](this[_0x30e120(0x7c3)]-0x1);},Window_NumberInput[_0x479088(0x6e6)][_0x479088(0x498)]=function(){const _0x357431=_0x479088;this['_number']=Number(String(this['_number'])['substring'](0x1)),this['_number']=Math[_0x357431(0x1ad)](0x0,this['_number']),Input['clear'](),this['refresh'](),SoundManager[_0x357431(0x559)](),this[_0x357431(0x31c)](this[_0x357431(0x7c3)]-0x1);});;Window_TitleCommand[_0x479088(0x782)]=VisuMZ['CoreEngine']['Settings'][_0x479088(0x6f2)],Window_TitleCommand[_0x479088(0x6e6)][_0x479088(0x3ea)]=function(){const _0x432d32=_0x479088;this[_0x432d32(0x75b)]();},Window_TitleCommand['prototype'][_0x479088(0x75b)]=function(){const _0x407482=_0x479088;for(const _0x4178ca of Window_TitleCommand[_0x407482(0x782)]){if(_0x4178ca[_0x407482(0x245)][_0x407482(0x4c7)](this)){const _0x22864a=_0x4178ca[_0x407482(0x3a0)];let _0x3a3026=_0x4178ca[_0x407482(0x63b)];if(['',_0x407482(0x303)][_0x407482(0x6c5)](_0x3a3026))_0x3a3026=_0x4178ca['TextJS']['call'](this);const _0x136672=_0x4178ca[_0x407482(0x792)]['call'](this),_0x178188=_0x4178ca[_0x407482(0x4b2)][_0x407482(0x4c7)](this);this[_0x407482(0x294)](_0x3a3026,_0x22864a,_0x136672,_0x178188),this[_0x407482(0x41c)](_0x22864a,_0x4178ca[_0x407482(0x162)]['bind'](this,_0x178188));}}},Window_GameEnd['_commandList']=VisuMZ['CoreEngine'][_0x479088(0x502)][_0x479088(0x384)]['GameEnd']['CommandList'],Window_GameEnd[_0x479088(0x6e6)][_0x479088(0x3ea)]=function(){const _0x3217a7=_0x479088;this[_0x3217a7(0x75b)]();},Window_GameEnd[_0x479088(0x6e6)][_0x479088(0x75b)]=function(){const _0x3863fe=_0x479088;for(const _0x2c0eb2 of Window_GameEnd['_commandList']){if(_0x2c0eb2[_0x3863fe(0x245)][_0x3863fe(0x4c7)](this)){if(_0x3863fe(0x3ab)===_0x3863fe(0x3ab)){const _0xc9fc7d=_0x2c0eb2['Symbol'];let _0x564098=_0x2c0eb2[_0x3863fe(0x63b)];if(['',_0x3863fe(0x303)][_0x3863fe(0x6c5)](_0x564098))_0x564098=_0x2c0eb2[_0x3863fe(0x4f8)]['call'](this);const _0x4a21cb=_0x2c0eb2[_0x3863fe(0x792)][_0x3863fe(0x4c7)](this),_0x1c24ec=_0x2c0eb2[_0x3863fe(0x4b2)][_0x3863fe(0x4c7)](this);this[_0x3863fe(0x294)](_0x564098,_0xc9fc7d,_0x4a21cb,_0x1c24ec),this[_0x3863fe(0x41c)](_0xc9fc7d,_0x2c0eb2['CallHandlerJS'][_0x3863fe(0x34b)](this,_0x1c24ec));}else{function _0x25c47d(){const _0x5cb7a7=_0x3863fe;this[_0x5cb7a7(0x796)](_0x165d3d);}}}}};function Window_ButtonAssist(){const _0x4615d5=_0x479088;this[_0x4615d5(0x65b)](...arguments);}Window_ButtonAssist[_0x479088(0x6e6)]=Object[_0x479088(0x66e)](Window_Base['prototype']),Window_ButtonAssist[_0x479088(0x6e6)][_0x479088(0x340)]=Window_ButtonAssist,Window_ButtonAssist['prototype']['initialize']=function(_0x5d6fd4){const _0x353554=_0x479088;this[_0x353554(0x38d)]={},Window_Base['prototype'][_0x353554(0x65b)][_0x353554(0x4c7)](this,_0x5d6fd4),this['setBackgroundType'](VisuMZ[_0x353554(0x676)]['Settings'][_0x353554(0x6db)]['BgType']||0x0),this[_0x353554(0x5b5)]();},Window_ButtonAssist[_0x479088(0x6e6)][_0x479088(0x20e)]=function(){const _0x3e7c7f=_0x479088;if(this['contents']['fontSize']<=0x60){if(_0x3e7c7f(0x562)!==_0x3e7c7f(0x691))this['contents'][_0x3e7c7f(0x195)]+=0x6;else{function _0xf66bcb(){const _0x4a8003=_0x3e7c7f,_0x46d1ea=_0x5d8e69[_0x4a8003(0x676)][_0x4a8003(0x502)][_0x4a8003(0x489)][_0x290adf],_0x50b18f=_0x4a8003(0x1bc)[_0x4a8003(0x50d)](_0x3bb1cb);for(const _0x35c5b3 of _0x46d1ea){_0x5d0c39['loadBitmap'](_0x50b18f,_0x35c5b3);}}}}},Window_ButtonAssist['prototype'][_0x479088(0x705)]=function(){const _0x2b1fbc=_0x479088;this[_0x2b1fbc(0x4fc)][_0x2b1fbc(0x195)]>=0x18&&(this['contents'][_0x2b1fbc(0x195)]-=0x6);},Window_ButtonAssist['prototype'][_0x479088(0x607)]=function(){const _0x57c66b=_0x479088;Window_Base[_0x57c66b(0x6e6)][_0x57c66b(0x607)]['call'](this),this['updateKeyText']();},Window_ButtonAssist[_0x479088(0x6e6)]['updatePadding']=function(){const _0x14770d=_0x479088;this[_0x14770d(0x6d9)]=SceneManager[_0x14770d(0x4b7)][_0x14770d(0x625)]()!==_0x14770d(0x3f9)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x479088(0x67c)]=function(){const _0x4bd7cd=_0x479088,_0x11344d=SceneManager[_0x4bd7cd(0x4b7)];for(let _0x37765c=0x1;_0x37765c<=0x5;_0x37765c++){if(this[_0x4bd7cd(0x38d)][_0x4bd7cd(0x39b)[_0x4bd7cd(0x50d)](_0x37765c)]!==_0x11344d[_0x4bd7cd(0x293)[_0x4bd7cd(0x50d)](_0x37765c)]())return this[_0x4bd7cd(0x5b5)]();if(this['_data'][_0x4bd7cd(0x376)[_0x4bd7cd(0x50d)](_0x37765c)]!==_0x11344d[_0x4bd7cd(0x31b)[_0x4bd7cd(0x50d)](_0x37765c)]())return this[_0x4bd7cd(0x5b5)]();}},Window_ButtonAssist[_0x479088(0x6e6)][_0x479088(0x5b5)]=function(){const _0x559642=_0x479088;this['contents'][_0x559642(0x4d8)]();for(let _0x468056=0x1;_0x468056<=0x5;_0x468056++){if('yguIA'===_0x559642(0x7cc))this['drawSegment'](_0x468056);else{function _0x34aa08(){return _0x224fcb(_0x387cad)['toLocaleString'](_0x38a158,_0x5563a7);}}}},Window_ButtonAssist[_0x479088(0x6e6)][_0x479088(0x4dd)]=function(_0x57ff9a){const _0x47c7ce=_0x479088,_0x334fe8=this[_0x47c7ce(0x3f2)]/0x5,_0x4f0e03=SceneManager[_0x47c7ce(0x4b7)],_0x508792=_0x4f0e03[_0x47c7ce(0x293)[_0x47c7ce(0x50d)](_0x57ff9a)](),_0x5aaa1d=_0x4f0e03[_0x47c7ce(0x31b)['format'](_0x57ff9a)]();this[_0x47c7ce(0x38d)]['key%1'[_0x47c7ce(0x50d)](_0x57ff9a)]=_0x508792,this[_0x47c7ce(0x38d)][_0x47c7ce(0x376)['format'](_0x57ff9a)]=_0x5aaa1d;if(_0x508792==='')return;if(_0x5aaa1d==='')return;const _0x261edd=_0x4f0e03['buttonAssistOffset%1'[_0x47c7ce(0x50d)](_0x57ff9a)](),_0x4141da=this['itemPadding'](),_0x31bf1c=_0x334fe8*(_0x57ff9a-0x1)+_0x4141da+_0x261edd,_0x2838b6=VisuMZ[_0x47c7ce(0x676)][_0x47c7ce(0x502)][_0x47c7ce(0x6db)][_0x47c7ce(0x628)];this[_0x47c7ce(0x417)](_0x2838b6[_0x47c7ce(0x50d)](_0x508792,_0x5aaa1d),_0x31bf1c,0x0,_0x334fe8-_0x4141da*0x2);},VisuMZ[_0x479088(0x1b5)]=function(_0x28248d){const _0x2da8b5=_0x479088;if(Utils['isOptionValid'](_0x2da8b5(0x434))){var _0x373201=require('nw.gui')['Window'][_0x2da8b5(0x548)]();SceneManager['showDevTools']();if(_0x28248d)setTimeout(_0x373201[_0x2da8b5(0x5df)][_0x2da8b5(0x34b)](_0x373201),0x190);}},VisuMZ['ApplyEasing']=function(_0x204098,_0x2e6d99){const _0x2debdd=_0x479088;_0x2e6d99=_0x2e6d99[_0x2debdd(0x2b9)]();var _0x2d1a48=1.70158,_0x36364f=0.7;switch(_0x2e6d99){case _0x2debdd(0x30d):return _0x204098;case _0x2debdd(0x265):return-0x1*Math[_0x2debdd(0x15f)](_0x204098*(Math['PI']/0x2))+0x1;case _0x2debdd(0x702):return Math['sin'](_0x204098*(Math['PI']/0x2));case _0x2debdd(0x543):return-0.5*(Math[_0x2debdd(0x15f)](Math['PI']*_0x204098)-0x1);case _0x2debdd(0x4da):return _0x204098*_0x204098;case _0x2debdd(0x4c3):return _0x204098*(0x2-_0x204098);case _0x2debdd(0x5c4):return _0x204098<0.5?0x2*_0x204098*_0x204098:-0x1+(0x4-0x2*_0x204098)*_0x204098;case _0x2debdd(0x517):return _0x204098*_0x204098*_0x204098;case _0x2debdd(0x708):var _0x3d15de=_0x204098-0x1;return _0x3d15de*_0x3d15de*_0x3d15de+0x1;case'INOUTCUBIC':return _0x204098<0.5?0x4*_0x204098*_0x204098*_0x204098:(_0x204098-0x1)*(0x2*_0x204098-0x2)*(0x2*_0x204098-0x2)+0x1;case'INQUART':return _0x204098*_0x204098*_0x204098*_0x204098;case'OUTQUART':var _0x3d15de=_0x204098-0x1;return 0x1-_0x3d15de*_0x3d15de*_0x3d15de*_0x3d15de;case'INOUTQUART':var _0x3d15de=_0x204098-0x1;return _0x204098<0.5?0x8*_0x204098*_0x204098*_0x204098*_0x204098:0x1-0x8*_0x3d15de*_0x3d15de*_0x3d15de*_0x3d15de;case _0x2debdd(0x166):return _0x204098*_0x204098*_0x204098*_0x204098*_0x204098;case _0x2debdd(0x57a):var _0x3d15de=_0x204098-0x1;return 0x1+_0x3d15de*_0x3d15de*_0x3d15de*_0x3d15de*_0x3d15de;case _0x2debdd(0x505):var _0x3d15de=_0x204098-0x1;return _0x204098<0.5?0x10*_0x204098*_0x204098*_0x204098*_0x204098*_0x204098:0x1+0x10*_0x3d15de*_0x3d15de*_0x3d15de*_0x3d15de*_0x3d15de;case _0x2debdd(0x4af):if(_0x204098===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x204098-0x1));case'OUTEXPO':if(_0x204098===0x1){if(_0x2debdd(0x2b5)==='pmLrX')return 0x1;else{function _0x11e34f(){const _0x424c04=_0x2debdd;_0x14915b=_0x3d5974['round'](_0x11918b),_0x5d609c=_0x1af320[_0x424c04(0x786)](_0x3507a7),_0x46154f[_0x424c04(0x676)]['Window_StatusBase_drawActorSimpleStatus'][_0x424c04(0x4c7)](this,_0x31059e,_0x5e77b3,_0x53a254);}}}return-Math[_0x2debdd(0x527)](0x2,-0xa*_0x204098)+0x1;case _0x2debdd(0x272):if(_0x204098===0x0||_0x204098===0x1)return _0x204098;var _0xa40da7=_0x204098*0x2,_0x3e8d78=_0xa40da7-0x1;if(_0xa40da7<0x1){if(_0x2debdd(0x794)===_0x2debdd(0x1fd)){function _0x12bed6(){const _0x33bffa=_0x2debdd,_0x3d535f=_0x33bffa(0x61c);this[_0x33bffa(0x53e)]=this[_0x33bffa(0x53e)]||{};if(this[_0x33bffa(0x53e)][_0x3d535f])return this[_0x33bffa(0x53e)][_0x3d535f];const _0x426833=_0x57017c[_0x33bffa(0x676)]['Settings'][_0x33bffa(0x6c9)][_0x33bffa(0x20d)];return this[_0x33bffa(0x3d9)](_0x3d535f,_0x426833);}}else return 0.5*Math[_0x2debdd(0x527)](0x2,0xa*_0x3e8d78);}return 0.5*(-Math['pow'](0x2,-0xa*_0x3e8d78)+0x2);case _0x2debdd(0x584):var _0xa40da7=_0x204098/0x1;return-0x1*(Math[_0x2debdd(0x580)](0x1-_0xa40da7*_0x204098)-0x1);case _0x2debdd(0x354):var _0x3d15de=_0x204098-0x1;return Math[_0x2debdd(0x580)](0x1-_0x3d15de*_0x3d15de);case _0x2debdd(0x70e):var _0xa40da7=_0x204098*0x2,_0x3e8d78=_0xa40da7-0x2;if(_0xa40da7<0x1)return-0.5*(Math['sqrt'](0x1-_0xa40da7*_0xa40da7)-0x1);return 0.5*(Math[_0x2debdd(0x580)](0x1-_0x3e8d78*_0x3e8d78)+0x1);case'INBACK':return _0x204098*_0x204098*((_0x2d1a48+0x1)*_0x204098-_0x2d1a48);case _0x2debdd(0x534):var _0xa40da7=_0x204098/0x1-0x1;return _0xa40da7*_0xa40da7*((_0x2d1a48+0x1)*_0xa40da7+_0x2d1a48)+0x1;break;case _0x2debdd(0x54d):var _0xa40da7=_0x204098*0x2,_0x1eb6a3=_0xa40da7-0x2,_0x3f488c=_0x2d1a48*1.525;if(_0xa40da7<0x1){if(_0x2debdd(0x481)==='JEkgz'){function _0x18ec0e(){return'';}}else return 0.5*_0xa40da7*_0xa40da7*((_0x3f488c+0x1)*_0xa40da7-_0x3f488c);}return 0.5*(_0x1eb6a3*_0x1eb6a3*((_0x3f488c+0x1)*_0x1eb6a3+_0x3f488c)+0x2);case _0x2debdd(0x1e8):if(_0x204098===0x0||_0x204098===0x1)return _0x204098;var _0xa40da7=_0x204098/0x1,_0x3e8d78=_0xa40da7-0x1,_0x10b9a9=0x1-_0x36364f,_0x3f488c=_0x10b9a9/(0x2*Math['PI'])*Math[_0x2debdd(0x504)](0x1);return-(Math[_0x2debdd(0x527)](0x2,0xa*_0x3e8d78)*Math[_0x2debdd(0x5e7)]((_0x3e8d78-_0x3f488c)*(0x2*Math['PI'])/_0x10b9a9));case _0x2debdd(0x329):var _0x10b9a9=0x1-_0x36364f,_0xa40da7=_0x204098*0x2;if(_0x204098===0x0||_0x204098===0x1){if(_0x2debdd(0x4d5)!==_0x2debdd(0x5bf))return _0x204098;else{function _0x3cd98e(){const _0x4c37de=_0x2debdd;this[_0x4c37de(0x73e)]['setBackgroundType'](_0x25acfa['layoutSettings'][_0x4c37de(0x657)]);}}}var _0x3f488c=_0x10b9a9/(0x2*Math['PI'])*Math[_0x2debdd(0x504)](0x1);return Math[_0x2debdd(0x527)](0x2,-0xa*_0xa40da7)*Math[_0x2debdd(0x5e7)]((_0xa40da7-_0x3f488c)*(0x2*Math['PI'])/_0x10b9a9)+0x1;case _0x2debdd(0x176):var _0x10b9a9=0x1-_0x36364f;if(_0x204098===0x0||_0x204098===0x1)return _0x204098;var _0xa40da7=_0x204098*0x2,_0x3e8d78=_0xa40da7-0x1,_0x3f488c=_0x10b9a9/(0x2*Math['PI'])*Math[_0x2debdd(0x504)](0x1);if(_0xa40da7<0x1){if(_0x2debdd(0x4d6)!==_0x2debdd(0x4d6)){function _0x50c221(){const _0x22d4f2=_0x2debdd;return _0x477508[_0x22d4f2(0x676)][_0x22d4f2(0x502)][_0x22d4f2(0x6da)][_0x22d4f2(0x239)];}}else return-0.5*(Math[_0x2debdd(0x527)](0x2,0xa*_0x3e8d78)*Math[_0x2debdd(0x5e7)]((_0x3e8d78-_0x3f488c)*(0x2*Math['PI'])/_0x10b9a9));}return Math[_0x2debdd(0x527)](0x2,-0xa*_0x3e8d78)*Math[_0x2debdd(0x5e7)]((_0x3e8d78-_0x3f488c)*(0x2*Math['PI'])/_0x10b9a9)*0.5+0x1;case _0x2debdd(0x6aa):var _0xa40da7=_0x204098/0x1;if(_0xa40da7<0x1/2.75){if(_0x2debdd(0x55b)!==_0x2debdd(0x55b)){function _0x18568f(){const _0x20efc1=_0x2debdd;_0xc21b8c[_0x20efc1(0x63a)]();}}else return 7.5625*_0xa40da7*_0xa40da7;}else{if(_0xa40da7<0x2/2.75){if(_0x2debdd(0x7ed)!==_0x2debdd(0x7ed)){function _0x1bc612(){const _0x4ed566=_0x2debdd;return _0x5195ce[_0x4ed566(0x3e8)][_0x4ed566(0x703)][_0x4ed566(0x4c7)](this);}}else{var _0x1eb6a3=_0xa40da7-1.5/2.75;return 7.5625*_0x1eb6a3*_0x1eb6a3+0.75;}}else{if(_0xa40da7<2.5/2.75){if(_0x2debdd(0x3bf)===_0x2debdd(0x5be)){function _0x543ef9(){const _0x27ce68=_0x2debdd;return _0x1b3171[_0x27ce68(0x3e8)][_0x27ce68(0x219)][_0x27ce68(0x4c7)](this);}}else{var _0x1eb6a3=_0xa40da7-2.25/2.75;return 7.5625*_0x1eb6a3*_0x1eb6a3+0.9375;}}else{var _0x1eb6a3=_0xa40da7-2.625/2.75;return 7.5625*_0x1eb6a3*_0x1eb6a3+0.984375;}}}case _0x2debdd(0x1c3):var _0x5ee745=0x1-VisuMZ[_0x2debdd(0x6d1)](0x1-_0x204098,_0x2debdd(0x374));return _0x5ee745;case _0x2debdd(0x249):if(_0x204098<0.5)var _0x5ee745=VisuMZ['ApplyEasing'](_0x204098*0x2,_0x2debdd(0x3db))*0.5;else{if(_0x2debdd(0x419)!==_0x2debdd(0x5cb))var _0x5ee745=VisuMZ[_0x2debdd(0x6d1)](_0x204098*0x2-0x1,_0x2debdd(0x374))*0.5+0.5;else{function _0x22bec8(){this['select'](-0x1);}}}return _0x5ee745;default:return _0x204098;}},VisuMZ[_0x479088(0x455)]=function(_0x278d74){const _0x2ab1ea=_0x479088;_0x278d74=String(_0x278d74)['toUpperCase']();const _0x24c3f9=VisuMZ['CoreEngine'][_0x2ab1ea(0x502)][_0x2ab1ea(0x1cb)];if(_0x278d74===_0x2ab1ea(0x5da))return _0x24c3f9['IconParam0'];if(_0x278d74===_0x2ab1ea(0x33f))return _0x24c3f9[_0x2ab1ea(0x53c)];if(_0x278d74===_0x2ab1ea(0x1e0))return _0x24c3f9['IconParam2'];if(_0x278d74===_0x2ab1ea(0x3aa))return _0x24c3f9['IconParam3'];if(_0x278d74===_0x2ab1ea(0x5c3))return _0x24c3f9[_0x2ab1ea(0x5dd)];if(_0x278d74==='MDF')return _0x24c3f9[_0x2ab1ea(0x606)];if(_0x278d74==='AGI')return _0x24c3f9[_0x2ab1ea(0x6e1)];if(_0x278d74===_0x2ab1ea(0x298))return _0x24c3f9[_0x2ab1ea(0x2d4)];if(_0x278d74===_0x2ab1ea(0x325))return _0x24c3f9[_0x2ab1ea(0x48d)];if(_0x278d74===_0x2ab1ea(0x609))return _0x24c3f9[_0x2ab1ea(0x4c8)];if(_0x278d74==='CRI')return _0x24c3f9['IconXParam2'];if(_0x278d74===_0x2ab1ea(0x675))return _0x24c3f9[_0x2ab1ea(0x38f)];if(_0x278d74==='MEV')return _0x24c3f9[_0x2ab1ea(0x440)];if(_0x278d74===_0x2ab1ea(0x51e))return _0x24c3f9[_0x2ab1ea(0x338)];if(_0x278d74===_0x2ab1ea(0x64b))return _0x24c3f9['IconXParam6'];if(_0x278d74===_0x2ab1ea(0x27d))return _0x24c3f9['IconXParam7'];if(_0x278d74===_0x2ab1ea(0x6ae))return _0x24c3f9['IconXParam8'];if(_0x278d74===_0x2ab1ea(0x7a2))return _0x24c3f9[_0x2ab1ea(0x167)];if(_0x278d74===_0x2ab1ea(0x620))return _0x24c3f9[_0x2ab1ea(0x734)];if(_0x278d74===_0x2ab1ea(0x737))return _0x24c3f9['IconSParam1'];if(_0x278d74===_0x2ab1ea(0x747))return _0x24c3f9['IconSParam2'];if(_0x278d74===_0x2ab1ea(0x39d))return _0x24c3f9[_0x2ab1ea(0x157)];if(_0x278d74==='MCR')return _0x24c3f9['IconSParam4'];if(_0x278d74==='TCR')return _0x24c3f9[_0x2ab1ea(0x2a4)];if(_0x278d74===_0x2ab1ea(0x7f3))return _0x24c3f9[_0x2ab1ea(0x681)];if(_0x278d74==='MDR')return _0x24c3f9['IconSParam7'];if(_0x278d74===_0x2ab1ea(0x299))return _0x24c3f9[_0x2ab1ea(0x436)];if(_0x278d74===_0x2ab1ea(0x16f))return _0x24c3f9[_0x2ab1ea(0x4ea)];if(VisuMZ[_0x2ab1ea(0x676)][_0x2ab1ea(0x28b)][_0x278d74])return VisuMZ[_0x2ab1ea(0x676)]['CustomParamIcons'][_0x278d74]||0x0;return 0x0;},VisuMZ[_0x479088(0x1d3)]=function(_0x56e086,_0x38ba9a){if(_0x56e086%0x1===0x0)return _0x56e086;return _0x38ba9a=_0x38ba9a||0x0,String((_0x56e086*0x64)['toFixed'](_0x38ba9a))+'%';},VisuMZ[_0x479088(0x14f)]=function(_0x538572){const _0x5cdead=_0x479088;_0x538572=String(_0x538572);if(!_0x538572)return _0x538572;if(typeof _0x538572!==_0x5cdead(0x78e))return _0x538572;const _0x414202=VisuMZ[_0x5cdead(0x676)]['Settings']['QoL'][_0x5cdead(0x2f9)]||_0x5cdead(0x2e9),_0x496f88={'maximumFractionDigits':0x6};_0x538572=_0x538572[_0x5cdead(0x68a)](/\[(.*?)\]/g,(_0x380866,_0x49f541)=>{const _0x209e66=_0x5cdead;return VisuMZ[_0x209e66(0x68f)](_0x49f541,'[',']');}),_0x538572=_0x538572['replace'](/<(.*?)>/g,(_0xed9241,_0xf9d51d)=>{const _0x16d71e=_0x5cdead;if(_0x16d71e(0x7e9)!=='LkWfB')return VisuMZ[_0x16d71e(0x68f)](_0xf9d51d,'<','>');else{function _0x13d19f(){_0x47fe00+=_0x12bc0a(_0x332ff3);}}}),_0x538572=_0x538572[_0x5cdead(0x68a)](/\{\{(.*?)\}\}/g,(_0x341877,_0x507880)=>{const _0x2f1215=_0x5cdead;if(_0x2f1215(0x2cd)!==_0x2f1215(0x62e))return VisuMZ[_0x2f1215(0x68f)](_0x507880,'','');else{function _0x32829c(){const _0x341530=_0x2f1215,_0x1ed964=this[_0x341530(0x31d)](_0x161a83,_0xe18052);_0x1ed964[_0x341530(0x221)][_0x341530(0x665)](_0x3e0e24[_0x4873a5],0x0,0x0,_0x4dfd4d,_0x18c5ce,_0x341530(0x47b)),_0x1ed964['x']=(_0x3cb2b2-(_0x1f6c7f['length']-0x1)/0x2)*_0x5ef907,_0x1ed964['dy']=-_0x2f1e41;}}}),_0x538572=_0x538572[_0x5cdead(0x68a)](/(\d+\.?\d*)/g,(_0xf611bb,_0x54bccb)=>{const _0x4182ef=_0x5cdead;let _0x4795c7=_0x54bccb;if(_0x4795c7[0x0]==='0')return _0x4795c7;if(_0x4795c7[_0x4795c7['length']-0x1]==='.')return Number(_0x4795c7)[_0x4182ef(0x555)](_0x414202,_0x496f88)+'.';else{if(_0x4795c7[_0x4795c7[_0x4182ef(0x774)]-0x1]===','){if(_0x4182ef(0x57f)===_0x4182ef(0x418)){function _0x568f8c(){return!![];}}else return Number(_0x4795c7)[_0x4182ef(0x555)](_0x414202,_0x496f88)+',';}else return Number(_0x4795c7)['toLocaleString'](_0x414202,_0x496f88);}});let _0x4f15cf=0x3;while(_0x4f15cf--){_0x538572=VisuMZ[_0x5cdead(0x7d6)](_0x538572);}return _0x538572;},VisuMZ[_0x479088(0x68f)]=function(_0x4b601a,_0x3ec8ef,_0x121167){const _0x5f39d2=_0x479088;return _0x4b601a=_0x4b601a[_0x5f39d2(0x68a)](/(\d)/gi,(_0x338d9a,_0x53f330)=>'PRESERVCONVERSION(%1)'[_0x5f39d2(0x50d)](Number(_0x53f330))),_0x5f39d2(0x4eb)[_0x5f39d2(0x50d)](_0x4b601a,_0x3ec8ef,_0x121167);},VisuMZ[_0x479088(0x7d6)]=function(_0x140e10){const _0x548825=_0x479088;return _0x140e10=_0x140e10[_0x548825(0x68a)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x22ba39,_0x37cb19)=>Number(parseInt(_0x37cb19))),_0x140e10;},VisuMZ[_0x479088(0x5f4)]=function(_0x2e1dfa){const _0xf4366f=_0x479088;SoundManager[_0xf4366f(0x4e6)]();if(!Utils[_0xf4366f(0x4bf)]()){const _0x378c20=window['open'](_0x2e1dfa,_0xf4366f(0x430));}else{const _0x275c82=process[_0xf4366f(0x3a1)]==_0xf4366f(0x5bd)?_0xf4366f(0x4ee):process[_0xf4366f(0x3a1)]==_0xf4366f(0x653)?_0xf4366f(0x46f):_0xf4366f(0x79c);require('child_process')['exec'](_0x275c82+'\x20'+_0x2e1dfa);}},Sprite_Clickable['prototype']['processTouch']=function(){const _0x343f32=_0x479088;if(this[_0x343f32(0x588)]()){if(this[_0x343f32(0x7de)]()){if(_0x343f32(0x5e1)!==_0x343f32(0x5e1)){function _0x4ec0b7(){const _0xafdfeb=_0x343f32;this['_commandWindow'][_0xafdfeb(0x516)](_0x33482c[_0xafdfeb(0x3e8)][_0xafdfeb(0x742)]);}}else{if(!this[_0x343f32(0x61a)]&&TouchInput[_0x343f32(0x43e)]()){if('CrqkP'==='CrqkP')this[_0x343f32(0x61a)]=!![],this[_0x343f32(0x3b0)]();else{function _0x4f7023(){const _0x11ecea=_0x343f32;_0x1ad2a5[_0x11ecea(0x676)][_0x11ecea(0x619)]['call'](this,_0x17e966);if(_0x288cf3[_0x11ecea(0x676)][_0x11ecea(0x502)][_0x11ecea(0x6da)][_0x11ecea(0x3dd)])return;const _0x9f89a5=_0x82e19d['result']();_0x9f89a5[_0x11ecea(0x515)]&&(0x1-this[_0x11ecea(0x250)](_0x583088)>this[_0x11ecea(0x2fc)](_0x73ae)&&(_0x9f89a5[_0x11ecea(0x515)]=![],_0x9f89a5['evaded']=!![]));}}}TouchInput[_0x343f32(0x6e4)]()&&(this['_pressed']=!![],this[_0x343f32(0x7fe)]());}}else this[_0x343f32(0x61a)]&&this[_0x343f32(0x71f)](),this['_pressed']=![],this[_0x343f32(0x61a)]=![];this[_0x343f32(0x300)]&&TouchInput[_0x343f32(0x2ee)]()&&(this[_0x343f32(0x300)]=![],this[_0x343f32(0x282)]());}else this[_0x343f32(0x300)]=![],this[_0x343f32(0x61a)]=![];},Game_Picture[_0x479088(0x6e6)][_0x479088(0x5b9)]=function(){return this['_anchor'];},VisuMZ['CoreEngine']['Game_Picture_initBasic']=Game_Picture[_0x479088(0x6e6)][_0x479088(0x615)],Game_Picture[_0x479088(0x6e6)][_0x479088(0x615)]=function(){const _0x3e8c80=_0x479088;VisuMZ[_0x3e8c80(0x676)]['Game_Picture_initBasic'][_0x3e8c80(0x4c7)](this),this[_0x3e8c80(0x48e)]={'x':0x0,'y':0x0},this[_0x3e8c80(0x1a4)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x479088(0x5d3)]=Game_Picture[_0x479088(0x6e6)][_0x479088(0x68c)],Game_Picture[_0x479088(0x6e6)][_0x479088(0x68c)]=function(){const _0x393edb=_0x479088;this[_0x393edb(0x7c2)](),VisuMZ[_0x393edb(0x676)][_0x393edb(0x5d3)][_0x393edb(0x4c7)](this);},VisuMZ[_0x479088(0x676)][_0x479088(0x163)]=Game_Picture['prototype'][_0x479088(0x234)],Game_Picture[_0x479088(0x6e6)][_0x479088(0x234)]=function(_0x2b8682,_0x4fab2a,_0xb2309a,_0x419a89,_0x2fabba,_0x427bb3,_0x2fe1ce,_0x587ab2){const _0x94757a=_0x479088;VisuMZ[_0x94757a(0x676)][_0x94757a(0x163)][_0x94757a(0x4c7)](this,_0x2b8682,_0x4fab2a,_0xb2309a,_0x419a89,_0x2fabba,_0x427bb3,_0x2fe1ce,_0x587ab2),this[_0x94757a(0x640)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4fab2a]||{'x':0x0,'y':0x0});},VisuMZ[_0x479088(0x676)][_0x479088(0x28e)]=Game_Picture['prototype'][_0x479088(0x79b)],Game_Picture[_0x479088(0x6e6)]['move']=function(_0x3a5e3d,_0x111e10,_0x5f545c,_0x5db639,_0x421ebb,_0x5c3e31,_0x10216a,_0x4f1023,_0x41f857){const _0xe41f1e=_0x479088;VisuMZ[_0xe41f1e(0x676)][_0xe41f1e(0x28e)][_0xe41f1e(0x4c7)](this,_0x3a5e3d,_0x111e10,_0x5f545c,_0x5db639,_0x421ebb,_0x5c3e31,_0x10216a,_0x4f1023,_0x41f857),this[_0xe41f1e(0x7ab)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3a5e3d]||{'x':0x0,'y':0x0});},Game_Picture[_0x479088(0x6e6)][_0x479088(0x7c2)]=function(){const _0xd5c26a=_0x479088;this[_0xd5c26a(0x4cb)]>0x0&&(this[_0xd5c26a(0x48e)]['x']=this['applyEasing'](this[_0xd5c26a(0x48e)]['x'],this[_0xd5c26a(0x1a4)]['x']),this[_0xd5c26a(0x48e)]['y']=this[_0xd5c26a(0x2f4)](this[_0xd5c26a(0x48e)]['y'],this['_targetAnchor']['y']));},Game_Picture[_0x479088(0x6e6)][_0x479088(0x640)]=function(_0x50aacc){const _0x2cdd7f=_0x479088;this[_0x2cdd7f(0x48e)]=_0x50aacc,this[_0x2cdd7f(0x1a4)]=JsonEx[_0x2cdd7f(0x499)](this[_0x2cdd7f(0x48e)]);},Game_Picture[_0x479088(0x6e6)]['setTargetAnchor']=function(_0x2a516d){this['_targetAnchor']=_0x2a516d;},VisuMZ['CoreEngine'][_0x479088(0x437)]=Sprite_Picture[_0x479088(0x6e6)][_0x479088(0x1ac)],Sprite_Picture[_0x479088(0x6e6)][_0x479088(0x1ac)]=function(){const _0xfc928c=_0x479088,_0x444432=this['picture']();if(!_0x444432[_0xfc928c(0x5b9)]()){if(_0xfc928c(0x671)===_0xfc928c(0x1e2)){function _0x2ec496(){const _0x4d17cf=_0xfc928c;if(this[_0x4d17cf(0x648)]===_0x1f0c34)this['initCoreEngineScreenShake']();return this[_0x4d17cf(0x648)];}}else VisuMZ[_0xfc928c(0x676)][_0xfc928c(0x437)][_0xfc928c(0x4c7)](this);}else this[_0xfc928c(0x5b9)]['x']=_0x444432['anchor']()['x'],this[_0xfc928c(0x5b9)]['y']=_0x444432[_0xfc928c(0x5b9)]()['y'];},Game_Action['prototype'][_0x479088(0x3f8)]=function(_0xc1e974){const _0xbf7e59=_0x479088;if(_0xc1e974){const _0x1077e2=_0xc1e974[_0xbf7e59(0x2f6)];if(_0x1077e2===0x1&&this[_0xbf7e59(0x6b6)]()[_0xbf7e59(0x60d)]()!==0x1)this['setAttack']();else{if(_0x1077e2===0x2&&this[_0xbf7e59(0x6b6)]()['guardSkillId']()!==0x2){if(_0xbf7e59(0x369)!==_0xbf7e59(0x726))this[_0xbf7e59(0x225)]();else{function _0x2ecf5c(){const _0x49ebe2=_0xbf7e59;_0x39b598[_0x49ebe2(0x4be)]=![];}}}else this[_0xbf7e59(0x36d)](_0x1077e2);}}else this[_0xbf7e59(0x4d8)]();},Game_Actor[_0x479088(0x6e6)]['usableSkills']=function(){const _0x45379d=_0x479088;return this[_0x45379d(0x655)]()['filter'](_0x1ee923=>this[_0x45379d(0x40e)](_0x1ee923)&&this[_0x45379d(0x76c)]()['includes'](_0x1ee923[_0x45379d(0x519)]));},Window_Base[_0x479088(0x6e6)]['refreshDimmerBitmap']=function(){const _0x2800c8=_0x479088;if(this['_dimmerSprite']){if('FFbGV'===_0x2800c8(0x51c)){function _0x738579(){const _0x5edba3=_0x2800c8;this[_0x5edba3(0x7d1)](_0x186a98[_0x5edba3(0x6e4)]('up'));}}else{const _0x39be16=this[_0x2800c8(0x174)]['bitmap'],_0x3d4ef8=this[_0x2800c8(0x7bc)],_0x292eaa=this[_0x2800c8(0x5de)],_0x23c705=this[_0x2800c8(0x6d9)],_0x3884e7=ColorManager[_0x2800c8(0x47e)](),_0xee219e=ColorManager[_0x2800c8(0x257)]();_0x39be16[_0x2800c8(0x6bc)](_0x3d4ef8,_0x292eaa),_0x39be16['gradientFillRect'](0x0,0x0,_0x3d4ef8,_0x23c705,_0xee219e,_0x3884e7,!![]),_0x39be16[_0x2800c8(0x598)](0x0,_0x23c705,_0x3d4ef8,_0x292eaa-_0x23c705*0x2,_0x3884e7),_0x39be16[_0x2800c8(0x23a)](0x0,_0x292eaa-_0x23c705,_0x3d4ef8,_0x23c705,_0x3884e7,_0xee219e,!![]),this['_dimmerSprite'][_0x2800c8(0x1de)](0x0,0x0,_0x3d4ef8,_0x292eaa);}}},Game_Actor[_0x479088(0x6e6)]['makeAutoBattleActions']=function(){const _0x515a50=_0x479088;for(let _0x14b5f5=0x0;_0x14b5f5<this[_0x515a50(0x180)]();_0x14b5f5++){if(_0x515a50(0x611)===_0x515a50(0x444)){function _0x366ae1(){const _0x41b060=_0x515a50;if(_0x1e6e80['isOptionValid']('test')){var _0xcdf0a4=_0x544f83(_0x41b060(0x475))[_0x41b060(0x55a)][_0x41b060(0x548)]();_0x5e9a79[_0x41b060(0x560)]();if(_0x3bd28f)_0x4de927(_0xcdf0a4['focus'][_0x41b060(0x34b)](_0xcdf0a4),0x190);}}}else{const _0x14f630=this[_0x515a50(0x397)]();let _0x6a8bd6=Number[_0x515a50(0x433)];this[_0x515a50(0x4b1)](_0x14b5f5,_0x14f630[0x0]);for(const _0x5eed76 of _0x14f630){if('XxxPP'===_0x515a50(0x61e)){const _0xd5166e=_0x5eed76[_0x515a50(0x689)]();if(_0xd5166e>_0x6a8bd6){if('RVLZr'===_0x515a50(0x56e))_0x6a8bd6=_0xd5166e,this['setAction'](_0x14b5f5,_0x5eed76);else{function _0x32385c(){this['makeCoreEngineCommandList']();}}}}else{function _0x3f6416(){const _0xbce475=_0x515a50;if(this[_0xbce475(0x380)]===_0x153f5a)this['initCoreEngine']();if(this[_0xbce475(0x380)][_0xbce475(0x289)]===_0x5b05f5)this['initCoreEngine']();this['_CoreEngineSettings'][_0xbce475(0x289)]=_0x1562ec;}}}}}this[_0x515a50(0x670)](_0x515a50(0x220));};