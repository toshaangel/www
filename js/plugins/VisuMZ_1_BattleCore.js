//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.15] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
//=============================================================================

const _0x2a72=['actionBattleCoreJS','startActorSelection','addText','updateActors','StbeQ','fjtLp','OffsetY','ZWAmX','Enemy','_additionalSprites','all\x20targets','showAnimation','removeBuff','PopupOffsetX','stbGainInstant','command119','Ewyzm','toePi','logActionList','applyEasing','xsiER','axvWv','jumpBattler','makeActions','Czlcp','autoSelectLastSelected','NYVDS','ActionSkillMsg1','textColor','createBattleFieldContainer','_autoBattleWindow','IdksK','WUMoF','MotionType','gFXzM','getNextDamagePopup','_initialOffset','Targets2','ActSeq_Mechanics_Immortal','FHmPi','setHorrorEffectSettings','WaitForSpin','bind','CmdIconAutoBattle','autoMeleeSingleTargetActionSet','process_VisuMZ_BattleCore_Failsafes','addItemCommand','isSkillItemWindowsMiddle','skewDuration','addAutoBattleCommand','deathStateId','_battleCoreBattleStartEvent','CriticalHitRateJS','addedBuffs','freezeMotion','Scene_Battle_windowAreaHeight','recoverAll','iterateBattler','removeState','Scene_Battle_createAllWindows','updateBattleProcess','RegExp','adjustWeaponSpriteOffset','compareBattlerSprites','MAXHP','drawItemImageXPStyle','CalcEscapeRatioJS','stypeId','CmdTextAlign','Weapon-%1-%2','Game_Battler_performEvasion','makeEscapeRatio','hide','attackSkillId','_skewDuration','sort','_itemWindow','STR','QLrLJ','updateWeather','_phase','hpDamageFmt','isGuard','nvlyj','toUpperCase','battleFloat','command236','UUbUl','isWaiting','popupDamage','QKbdE','JxMll','ShowRemovedBuff','BattleLogRectJS','_angleRevertOnFinish','dicHz','ReflectPlayback','dOvAZ','iRfok','_customDamageFormula','VisuMZ_2_BattleSystemCTB','drawItemStyleIcon','_animationCount','arPenRate','wCtdJ','applyImmortal','ActSeq_Element_ForceElements','ActSeq_Motion_PerformAction','endAnimation','Angle','_targetFloatHeight','float','CYnlM','%1StartBattleJS','lmHGa','requestFauxAnimation','Window_BattleLog_performMagicEvasion','ActSeq_Mechanics_RemoveBuffDebuff','NewPopupBottom','performMoveToPoint','fQiAg','Sprite_Battler_updateMain','GerPt','itemEffectAddAttackState','svAnchorX','animationId','skill','battleAngle','ActSeq_BattleLog_AddText','HP_Flat','isDTB','_damagePopupArray','Zrtro','canGuard','ActSeq_Mechanics_WaitForEffect','isBattlerFlipped','faceWidth','softDamageCapRate','fTAMH','includes','Parse_Notetags_TraitObjects','Rdxhh','bitmap','Scale','type','battleCameraData','_skewEasing','Sprite_StateIcon_updateFrame','resize','ShowReflect','processAnimationRequests','PIoxC','dJhDr','dVgLb','isFriendly','stateMotionIndex','needsSelection','rmUUU','battleOpacity','drawSingleSkillCost','Settings','skills','Sprite_Battler_setHome','move','removeChild','canAttackBattleCore','Window_BattleLog_popBaseLine','JS\x20ESCAPE\x20FAILURE','message2','critical','Index','_shadowSprite','ActSeq_Zoom_Reset','isSpriteVisible','filterArea','playEnemyDamage','Window_BattleEnemy_initialize','Spriteset_Battle_update','svBattlerData','onEncounter','PreApplyAsUserJS','parent','Sprite_Battler_update','callOptions','applyVariance','startOpacity','_active','growBattler','qxLeD','iconHeight','iconWidth','ShowMissEvasion','ActionSkillMsg2','performMiss','ArPenFlat','setupMotion','<CENTER>%1','cameraOffsetDuration','forceAction','AnchorY','clearHorrorEffects','endBattle','addBattleCoreAutoBattleStyleCommand','ESCAPE','ixTQd','createEnemies','Window_BattleLog_performSubstitute','weapons','_enemyID','FUNC','isDamagePopupRequested','WaitCount1','StartName','applyBattleCoreJS','toFWs','EscapeSuccessJS','collapseType','selectNextActor','EnvZB','ActSeq_BattleLog_Clear','isOnCurrentMap','performActionMotions','battleback2Name','EvwZO','battleGrow','sEZiG','HitRate','battleCamera','SideviewSelect','_handlers','_forceAction','_freezeMotionData','mpDamageFmt','POST-','SvMotionIdleSolo-%1-%2','updateStart','tone','cancelButtonText','addShowHpGaugeCommand','isBusy','alive\x20opponents\x20not\x20target','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','Game_Action_itemEffectAddAttackState','getColor','max','onActorCancel','charging','bgType','alive\x20battlers\x20not\x20user','cpfFc','Game_BattlerBase_canGuard','svBattlerAnchorY','performFlinch','QqAQU','PARTY','onDatabaseLoaded','_preBattleCommonEvent','XPActorDefaultHeight','show','EVAL','ActSeq_Movement_FacePoint','getSkillIdWithName','_immortal','BattleCmdList','HelpSkillType','%1StartActionJS','initBattleCore','TvbzD','_lastEnemy','requestAnimation','oHZMr','createEffectActionSet','CriticalDmgRate','ActSeq_Impact_ShockwaveEachTargets','criticalHitFlat','fight','pFrwR','_growDuration','Sprite_Battler_damageOffsetY','DefaultDamageStyle','isAttack','isAnyoneChangingOpacity','loadSystem','TDvNU','Game_Action_itemEffectAddNormalState','ALL\x20SKILLS','VisuMZ_1_ElementStatusCore','loadSvActor','result','onEscapeFailure','JS\x20%1END\x20BATTLE','ConfigManager_makeData','_baseLineStack','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','windowAreaHeight','ActSeq_Camera_FocusPoint','ActSeq_Impact_ZoomBlurPoint','actorCommandCancelTPB','retreat','setupBattleCoreData','alive\x20battlers\x20not\x20target','updateBorderSprite','maxCols','Game_Battler_startTpbTurn','contents','map','iHLPG','battleLayoutStyle','setFrame','skillTypes','battleZoom','CmdStyle','jVFRE','waitCount','canAddSkillCommand','uiInputPosition','eNoLX','resizeWindowXPStyle','addCommand','ActSeq_Camera_FocusTarget','finishActionSet','scryb','updateStateSprite','focus','parse','Window_BattleLog_performCounter','Sprite_Enemy_updateCollapse','clearFreezeMotionForWeapons','isAutoBattleCommandEnabled','displayItemMessage','version','_jumpHeight','VDZkd','kPyUl','evade','FbWQj','isDead','HAmeZ','SYglB','_autoBattle','Sprite_Enemy_setBattler','battleback1Name','updateCustomActionSequence','selectNextCommand','ActSeq_Skew_WaitForSkew','damageContainer','TQWxr','ActSeq_Skew_Reset','jjMUo','Sprite_Battler_updatePosition','_executedValue','FaceAway','Scene_Battle_updateStatusWindowPosition','_subject','PaeYq','_enemyWindow','addAnimationSpriteToContainer','walk','angle','customDamageFormula','auto','clearResult','IwBGm','Game_Interpreter_command283','removedStateObjects','BARE\x20HANDS','resetFontSettings','moveToStartPosition','PreDamageAsTargetJS','anWkx','motionIdle','damageRate','actorCommandEscape','selectNextCommandTpb','XEZvH','_checkOn','_targetIndex','zBKDb','addGuardCommand','battlelog','changeTurnOrderByCTB','HKKKE','battleEffect','gAkWS','makeTargetsBattleCore','Duration','isBuffAffected','ShowHpDmg','destroyDamageSprite','updateBattlebackBitmap1','getBattlePortrait','refreshRequest','_updateFilterArea','XPSpriteYLocation','join','cameraClamp','movement','onRegeneratePlayStateAnimation','JS\x20%1END\x20TURN','bottom','Window_BattleLog_displayCurrentState','updateStyleOpacity','floor','VisuMZ_2_BattleSystemSTB','aBGAa','BeBng','Sprite_Actor_setActorHome','CriticalHitFlat','placeBasicGauges','PostStartTurnJS','ScaleToFit','iconIndex','ARRAYSTR','ParseArmorNotetags','DZXMy','drawItem','refresh','getItemDamageAmountLabelBattleCore','_battlerName','criticalDmgFlat','canEscape','ATK','isSceneBattle','ActSeq_Target_RandTarget','isBattleMember','commandName','_updateClientArea','isMagicSkill','ChargeRate','_battleLayoutStyle','LqHoi','processEscape','_commandNameWindow','Game_Interpreter_command301','push','list','drawBackgroundRect','waitForMovement','currentAction','isChangingOpacity','viZBW','WaitForSkew','faceRect','JS\x20%1APPLY\x20%2','isTpbMainPhase','ActSeq_Motion_ClearFreezeFrame','prDie','evalDamageFormula','_flinched','isCharging','dead\x20friends','processPostBattleCommonEvents','EYQDn','clearRect','thrust','onAngleEnd','return\x200','optDisplayTp','Game_Battler_performDamage','isInputting','makeData','showPortraits','HitFlat','DeesM','isTriggered','validTargets','Scene_Battle_start','BattleManager_cancelActorInput','command3011','_offsetY','createPartyCommandWindowBattleCore','PopupOffsetY','MP_Rate','PostEndActionJS','ActSeq_Movement_MoveToTarget','displayActionResults','mNlfg','CAFxq','nhTAG','dimColor1','sortDamageSprites','_motionCount','Game_Enemy_setup','requestRefresh','_multipliers','DzMMG','waitForJump','Interrupt','useDigitGrouping','onJumpEnd','SpdWN','updateVisibility','Window_ActorCommand_initialize','ckEwL','Spriteset_Battle_createBattleField','ActSeq_Movement_Float','currentValue','processRandomizedData','angleDuration','ActSeq_Angle_WaitForAngle','ActSeq_Impact_ZoomBlurTargetCenter','alive\x20enemies\x20not\x20target','jsCCu','yPCGj','fyIuR','partyCommandWindowRectBorderStyle','PreDamageJS','KgoKv','ifzmd','addSingleSkillCommand','displayCurrentState','ActSeq_Mechanics_CtbOrder','isActiveTpb','addSkillTypeCommand','PrioritySortActors','ATTACK','AutoMeleeSolo','_targetSkewY','BTestBypass','playReflection','currentSymbol','applyAngleChange','createDistortionSprite','mHlBF','_battlePortrait','iKHuC','_forcing','glitch','HnhUY','ActSeq_Motion_FreezeMotionFrame','Game_Battler_regenerateAll','IAJpJ','nameY','ShowCounter','setup','qrzcW','PreEndActionJS','HFOLj','drawItemStyleIconText','process_VisuMZ_BattleCore_Notetags','kwCTk','ShowPortraits','ActSeq_Mechanics_ActionEffect','ResetFocus','updateBorderStyle','NVAkJ','currentExt','Window_BattleLog_performRecovery','command301_PreBattleEvent','helpAreaHeight','hasSvBattler','rSIvc','DisablePartyCmd','_attackAnimationId','addFightCommand','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','_emptyBitmap','Game_Battler_onTurnEnd','addOptionsCommand','applyItem','clearWeaponAnimation','isEscapeCommandEnabled','_animation','svBattlerName','onTurnEnd','actionEffect','displayEvasion','JS\x20%1START\x20ACTION','startAction','mxfBk','createCancelButton','svShadow','CriticalHitMultiplier','Game_Action_isForRandom','reverse','isPreviousScene','updateCancel','DamageStyles','ActSeq_Element_Clear','EnFGs','CalcEscapeRaiseJS','sHvhT','regenerateAllBattleCore','SvMotionIdleMass-%1-%2','extraHeight','_canLose','commandAutoBattle','PostApplyJS','nTZXS','SkewX','_skewWholeDuration','createDigits','Mirror','VisuMZ_2_BattleSystemATB','PartyCmd','worldTransform','getAttackMotion','dead\x20battlers','Sprite_Actor_updateShadow','WaitForCamera','trueRandomTarget','Formula','getStypeIdWithName','skillId','_inputting','maxCommands','mpHealingFmt','softDamageCap','luJNE','requestMotionRefresh','waitForFloat','%1Event','TPB','slices','JS\x20BATTLE\x20DEFEAT','casting','_logWindow','_eventId','physical','gywyk','traitObjects','front\x20center','SvBattlerMass-%1-%2','performMagicEvasion','FpnIB','Ktxhu','TP_Rate','updateEffectContainers','ActSeq_Mechanics_StbExtraAction','kCDIP','drawItemStatus','HpTap','makeDeepCopy','updateTargetPosition','OverallFormulaJS','onBattleStart','damageOffsetY','Turns','ActSeq_Mechanics_CtbSpeed','performReflection','Window_SkillList_maxCols','Game_Action_isForFriend','MAXMP','freezeFrame','HpGauge','needsSelectionBattleCore','ParseWeaponNotetags','wmosm','ShowPopup','battleCoreResumeLaunchBattle','ShowCurrentState','getSkillTypes','_battleCoreNoElement','_targetAngle','ActSeq_Impact_MotionTrailCreate','collapse','Wave','PostApply%1JS','uOuzx','moveBattlerDistance','_opacityWholeDuration','aliveMembers','loadEnemy','ActSeq_Movement_FaceDirection','_text','ActSeq_Set_SetupAction','VisuMZ_3_ActSeqCamera','FCuzJ','targetObjects','ActSeq_BattleLog_WaitForNewLine','jump','canUseItemCommand','IcDZP','Shadow','weaponImageId','finalizeScale','setHelpWindow','Sprite_Battler_isMoving','PreEndTurnJS','addSkillCommands','indexOf','gainMp','createDamageSprite','BattleManager_startTurn','sqgsT','WaitForAngle','process_VisuMZ_BattleCore_Action_Notetags','addChildToBack','ActSeq_Target_CurrentIndex','createPartyCommandWindow','ArRedRate','isBattleTest','Tpuak','createAllWindows','CnjZO','messageSpeed','SvBattlerSolo-%1-%2','iIhWl','Game_Actor_makeActionList','CheckMapBattleEventValid','description','Style','substitute','updateEventMain','MeleeDistance','drawSkillCost','LUK','isRightInputMode','actions','_growEasing','inputtingAction','Window_BattleLog_displayMiss','isCertainHit','QFLRJ','damage','vqWRu','portrait','getInputButtonString','Sprite_Actor_initMembers','hpHealingFmt','sleep','battleUIOffsetX','displayReflectionPlayBack','AttackAnimation','onDisabledPartyCommandSelection','hpAffected','updateGrow','ActSeq_Set_TargetActionSet','setBattleAngle','HelpEscape','VisuMZ_2_DragonbonesUnion','reduce','jEhxP','ParseEnemyNotetags','PgWIw','process_VisuMZ_BattleCore_jsFunctions','base','ActSeq_Horror_NoiseCreate','autoBattle','BattleCore','bMyYF','displayReflection','DamageType%1','_updateCursorFilterArea','isFightCommandEnabled','KOnRh','okTargetSelectionVisibility','changePaintOpacity','_enemy','constructor','DigitGrouping','prototype','updateSpin','terminate','JS\x20%1START\x20BATTLE','filters','cwfWN','Game_Party_removeActor','changeWeather','AnchorX','statusTextAutoBattleStyle','maxBattleMembers','isAnyoneSkewing','_action','hUuTE','drawItemStatusXPStyle','NWswN','weaponTypes','snapForBackground','VisuMZ_1_SkillsStatesCore','head','border','Sprite_Actor_createStateSprite','isDying','createShadowSprite','setBattlerFlip','FlinchDistanceX','setupChild','getLastPluginCommandInterpreter','ceil','zwWJG','stepForward','cZMon','extraPositionY','ActSeq_Movement_WaitForFloat','%1EndActionJS','process_VisuMZ_BattleCore_CreateRegExp','parseForcedGameTroopSettingsBattleCore','setupHpGaugeSprite','isAnimationShownOnBattlePortrait','PreStartBattleJS','displayTpDamage','anchorY','battleDisplayText','loadBitmap','RIpQT','XJsmh','FXlUk','die','performAction','WHcyD','ShgfF','shift','escape','round','ActSeq_ChangeAngle','_baseY','_currentAngle','Game_Map_battleback1Name','isForOpponentBattleCore','_battlerContainer','reserveCommonEvent','addedStateObjects','Item-%1-%2','DefaultStyle','skewBattler','setHandler','canAttack','iconText','_distortionSprite','Qxdid','dimColor2','becomeSTBExploited','Amp','getEnemyIdWithName','setBattlerBattleCore','YGZGY','setLastPluginCommandInterpreter','trfnT','SkewY','adjustPosition_ScaleUp','IuBhx','clearBattlerMotionTrailData','_actorWindow','drawTextEx','replace','_stypeIDs','DUmBZ','_floatHeight','lineHeight','Game_Interpreter_terminate','repeats','startInput','command301','applySoftDamageCap','iEDMe','updateFloat','_cursorArea','Window_BattleLog_performDamage','WaitForZoom','startWeaponAnimation','Wnbgq','_motionSpeed','flashDuration','randomTargets','fIRaJ','isAnyoneGrowing','name','waitForNewLine','ArPenRate','battleSkew','Variable','ActSeq_Animation_AttackAnimation','isOpen','startActorCommandSelection','HelpAutoBattle','Scene_Battle_stop','updateCollapse','CriticalDmgFlat','startTurn','updateStateSpriteBattleCore','ncFdG','ShowAddedBuff','setupActionSet','maxItems','isNextSceneBattleTransitionable','_hpGaugeSprite','origin','_surprise','JcMhr','Game_BattlerBase_addNewState','isSkipPartyCommandWindow','AutoMeleeAoE','YPhUZ','EGqxg','ARRAYSTRUCT','EscapeFailureJS','Targets1','itemRect','fontSize','oRjNs','PYMHM','Game_Interpreter_PluginCommand','makeBattleCommand','spell','KVKGS','_jumpWholeDuration','callOkHandler','_enemyId','onSelectAction','isGuardWaiting','_windowLayer','ForceExploiter','NUM','mlZcR','pushBaseLine','xlbFt','ActSeq_BattleLog_DisplayAction','VisuMZ_0_CoreEngine','setWaitMode','findTargetSprite','Game_Action_makeTargets','index','Scene_Options_maxCommands','opacity','zrnmt','YrORy','arPenFlat','_actorCommandWindow','Armor-%1-%2','Intensity','svAnchorY','PostEndBattleJS','TCGEs','call','ActSeq_Mechanics_AddState','NikCt','EmergeText','onEnemyOk','setupBattleCore','Parse_Notetags_Targets','makeTargetSelectionMoreVisible','setupDamagePopup','createMiss','callUpdateHelp','isTurnBased','AGI','forceSelect','addActor','SkillItemBorderCols','CastCertain','isDebuffAffected','command283','Scene_Battle_helpWindowRect','createInnerPortrait','erIOM','ShowMpDmg','createBattleFieldBattleCore','jxkgu','BUcyu','kLmYS','isPreviousSceneBattleTransitionable','commandNameWindowDrawBackground','BqsEF','hmtHE','PreStartTurnJS','Game_Enemy_transform','setHome','fittingHeight','adjustPosition_1for1','updateFrame','createMainSprite','Window_Options_addGeneralOptions','AddHpGaugeOption','default','ActSeq_Movement_Skew','startBattle','ActSeq_Movement_Opacity','itemEffectAddNormalState','setBattleCameraOffset','_createDamageContainer','itemHit','getWtypeIdWithName','ConvertParams','BattleManager_startAction','FocusY','isUndecided','length','filter','atbInterrupt','performActionStart','PostApplyAsUserJS','Scene_Battle_commandFight','ActSeq_Mechanics_DamagePopup','getNextSubjectFromPool','_angleWholeDuration','ajOVC','padding','PRWsU','swapEnemyIDs','Game_Battler_forceAction','lIlEm','PreEndBattleJS','CastAnimation','setCustomDamageFormula','QTcXg','processBattleCoreJS','isBattleFlipped','_enemies','EknJw','ScaleX','partyCommandWindowRectDefaultStyle','applyArmorModifiers','playEnemyAttack','loadBattleback1','skillItemWindowRectMiddle','onGrowEnd','Window_BattleLog_performEvasion','\x5cI[%1]%2','popBaseLine','_svBattlerSprite','lNTzY','clearFreezeMotion','gEKzk','setSvBattlerSprite','ActorCmd','requestDragonbonesAnimation','waitForAnimation','center','DefaultSoftCap','timeScale','_updateCursorArea','autoBattleWindowRect','WaitForScale','NmeWJ','WaitForOpacity','changeAtbCastTime','NameOffsetY','fillRect','_borderPortraitTargetX','attackAnimationId2','BattleVictoryJS','createActorCommandWindowBattleCore','ZHHYz','_homeY','waitForOpacity','addAttackCommand','bzaQZ','ActSeq_Mechanics_CustomDmgFormula','itiZO','calcWindowHeight','ojXBc','showNormalAnimation','isForFriendBattleCore','anchorX','SKHfU','Scene_Battle_onEnemyOk','actorCommandSingleSkill','onMoveEnd','processVictory','performSubstitute','damageOffsetX','hHOrI','commandFight','alive\x20friends\x20not\x20target','_effectType','AddOption','nOtZP','onEnemyCancel','performCastAnimation','isMoving','performCollapse','drawItemImageListStyle','_back1Sprite','Sprite_Battler_initMembers','isConfused','innerHeight','_colorType','refreshMotion','_indent','_scene','#ffffff','VisuMZ_2_PartySystem','ShowPortraitsBorderStyle','children','IconStypeMagic','allowRandomSpeed','Game_Map_setupBattleback','trim','isActing','changeBattlerOpacity','Shadow2','KZWBY','counterAttack','autoBattleStart','makeAutoBattleActions','Sprite_Battleback_adjustPosition','isShownOnBattlePortrait','YmuAP','addNewState','KFblD','startFloat','iDBDD','IOjXa','itemTextAlign','updatePhase','PRE-','Gacyo','Scene_Battle_startPartyCommandSelection','ScaleY','Game_Party_addActor','ActSeq_BattleLog_UI','initialize','isForRandomBattleCore','SEPYO','UNTITLED','updateCommandNameWindow','jpeAy','Scene_Map_initialize','YABLI','addState','ActSeq_Animation_WaitForAnimation','toLowerCase','oWvWZ','PHPDD','commandOptions','enemy','uHzDP','DamageDisplay','ActSeq_Mechanics_ArmorPenetration','PerformAction','isDisplayEmergedEnemies','setBattlerFacePoint','Game_Action_itemHit','ActSeq_Movement_WaitForSkew','_opacityDuration','isPhysical','lrPGE','dcbcL','VisuMZ_1_MainMenuCore','Window_BattleLog_popupDamage','GxGzt','battleMove','shouldPopupDamage','SujRw','KQdkn','Text','Scene_Battle_onEnemyCancel','showEnemyAttackAnimation','concat','GCYUM','BattleStartEvent','_skewX','createHelpWindowBattleCore','ARRAYJSON','finishActorInput','EscapeFail','clearBattleCoreData','ARRAYNUM','adjustPosition_ScaleDown','canUse','mainSpriteScaleY','performActionEnd','alive\x20enemies','numTargets','dying','GYHpM','_targetGrowX','enemyNames','AllowCollapse','formula','getBattlePortraitFilename','fZTQW','_enemySprites','alive\x20actors','_partyCommandWindow','yzjkR','battleAnimation','ucOrP','nctjH','isForOpponent','basicGaugesY','pow','ONmwz','BattleManager_onEscapeFailure','loop','DThxM','QQkTu','_escapeRatio','ActSeq_Mechanics_StbExploit','_targetOpacity','_angleEasing','Game_Troop_setup','close','AllowRandomSpeed','Window_BattleStatus_drawItemImage','chant','tALzk','updateHpGaugePosition','_actorSprites','getDamageStyle','_cancelButton','Window_BattleLog_performAction','_jumpDuration','createBattleUIOffsetY','iQGRU','NrioE','setVisibleUI','_mainSprite','resizeWindowBorderStyle','isSkill','gdmSC','kLEap','MP_Flat','contentsOpacity','_target','setSTBExploited','BattleManager_processDefeat','debuffAdd','ActionCenteredName','createTargetsJS','ParseItemNotetags','alive\x20actors\x20not\x20user','swing','rDQRN','Spriteset_Battle_createLowerLayer','isBattleSys','qmhIK','attackStates','Scene_Map_launchBattle','ActSeq_Horror_TVCreate','VisuMZ_3_ActSeqImpact','ActSeq_Impact_ShockwaveCenterTargets','_battleCoreForcedElements','croej','Enemy-%1-%2','_weaponSprite','damageFlat','BattleManager_startInput','AutoBattleBgType','isImmortal','CmdIconFight','_svBattlerData','createBorderStylePortraitSprite','battlerSmoothImage','_back2Sprite','canMove','addChildAt','AS\x20TARGET','removeAnimationFromContainer','processRefresh','getHardDamageCap','Lfzvz','gdcJZ','RiBAI','PopupPosition','changeCtbCastTime','DamageFlat','NameFontSize','_callSceneOptions','tfNUk','updatePositionBattleCore','Window_BattleLog_displayMpDamage','drawText','SyaYQ','ActSeq_Horror_TVRemove','OKTkF','isJumping','textSizeEx','vdZws','ActSeq_Horror_GlitchCreate','launchBattle','hitRate','adjustFlippedBattlefield','XRgre','HomePosJS','JEMqm','ShowSubstitute','NqugM','visualHpGauge','gctjT','createDamageContainer','_lastPluginCommandInterpreter','setupTextPopup','alive\x20enemies\x20not\x20user','qQMLa','performCounter','fMiKD','_battleCoreAddedElements','_jumpMaxHeight','uchkQ','message1','VZYLw','setBattler','createJS','getConfigValue','isTpb','open','inHomePosition','applyGuard','FaceDirection','drawItemImage','_effectsContainer','AdjustRect','PopupShiftY','refreshDimmerBitmap','EscapeSuccess','_forcedBattleLayout','battleSys','battleCommandIcon','ActionItemMsg','battleMembers','mainSpriteHeight','Sprite_Enemy_updateBossCollapse','Actions','addedDebuffs','ActSeq_Target_NextTarget','isBypassDamageCap','MDF','StyleOFF','onEncounterBattleCore','%1Damage%2JS','_forcedBattlers','isVisualHpGaugeDisplayed','smooth','SdIej','AutoBattle','ShowAddedState','currentClass','yAcwf','drawItemStatusListStyle','kwQTp','changeInputWindow','isForAll','obKCF','addPartyCommand','_wtypeIDs','ActSeq_Mechanics_HpMpTp','WtypeId','Game_Battler_performActionEnd','isForFriend','Window_ActorCommand_setup','moveToStartPositionBattleCore','Scene_Battle_startActorCommandSelection','repositionCancelButtonBorderStyle','isFrameVisible','bGqNL','NGOUp','Damage','updateShadowPosition','coKgU','BackColor','Scene_ItemBase_applyItem','_currentActor','Spriteset_Battle_updateActors','Scene_Battle_skillWindowRect','note','placeGauge','startPartyCommandSelection','process_VisuMZ_BattleCore_BaseTroops','AutoBattleOK','Xmlwh','checkTpbInputOpen','_targetGrowY','clearDamagePopup','PostStartActionJS','PostEndTurnJS','isMeleeSingleTargetAction','isNonSubmenuCancel','startSkew','PopupShiftX','ActSeq_Movement_BattleStep','actor','onEscapeSuccess','LyTan','dead\x20enemies','makeHpDamageText','sdzEF','qsrWV','Window_BattleStatus_initialize','FNaIu','ActionSequence','flashColor','isStateResist','startTpbTurn','isFloating','isPartyCommandWindowDisabled','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','hue','ActSeq_Mechanics_Multipliers','MOTIONS','DistanceAdjust','applyDamageCaps','initMembersBattleCore','AxQqY','format','prepareBorderActor','Game_Battler_clearDamagePopup','isMagical','RepositionEnemies','_commonEventQueue','OJDeE','isAnyoneMoving','FWBqD','displayRemovedStates','preemptive','helpAreaBottom','OuDgz','_actionBattlers','ybVNL','updatePosition','NTuTN','createStateSprite','_skewY','BdpLV','BattleManager_processVictory','custom','isAnyoneJumping','dead','TimeScale','action','ocYHj','MAT','oygVo','_flashDuration','KtBfg','Elements','setupCriticalEffect','displayHpDamage','Window_BattleLog_update','State-%1-%2','Fxqfa','SlJdZ','createAnimationContainer','DefaultSoftScaler','Scene_Battle_createActorCommandWindow','isPlaytest','_actor','GroupDigits','addDebuff','createBattleField','battlerSprites','Scene_Boot_onDatabaseLoaded','uNHVE','isBattlerGrounded','gycQl','isMeleeMultiTargetAction','prepareCustomActionSequence','Window_BattleLog_displayEvasion','CheckSkillCommandShowSwitches','iQyJj','RKTyr','setupRgbSplitImpactFilter','Scene_Battle_onActorOk','_motion','updateAction','fmXZE','onBattleStartBattleCore','skew','_stateSprite','_growY','SkillsStatesCore','refreshCursor','autoSelectPriority','allBattleMembers','showHelpWindow','Sprite_Actor_update','QLaeg','_branch','battleCoreTpbMainPhase','JS\x20%1DAMAGE\x20%2','delay','removeImmortal','lTtSJ','AnimationID','_opacityEasing','adjustPosition','autoBattleUseSkills','xNMxM','Window_BattleLog_refresh','partyCommandWindowRect','ElementStatusCore','stepFlinch','XoaTU','updateMain','createActorCommandWindow','statusWindowRectBorderStyle','addEscapeCommand','start','clamp','frontviewSpriteY','battleCorePreBattleCommonEvent','motionType','updateShadowVisibility','tQINJ','updateShadow','targetActionSet','Scene_Battle_createPartyCommandWindow','xitFr','Battleback','statusWindowRectDefaultStyle','isNextScene','attackMotions','isGrowing','update','WaitForAnimation','PLzlE','PostStartBattleJS','hasBeenDefeatedBefore','%1EndTurnJS','isAnimationPlaying','removeActor','vRfeU','tFAem','wjiqp','_enemyNameContainer','animation','FlinchDistanceY','YtMLN','uHHqP','pqmrO','CommandWidth','SauIK','performJump','some','IqFOJ','icon','_weaponImageId','_floatEasing','YYLmK','DWNUc','fWPKL','_armorPenetration','drawIcon','lpmbq','_animationSprites','isItem','setEventCallback','duXDe','refreshActorPortrait','value','startAttackWeaponAnimation','_defeatedEnemies','performMoveToTargets','ReflectAnimation','OffsetX','Window_BattleLog_clear','isPartyTpbInputtable','JCPtr','invokeMagicReflection','performEvasion','sliceMax','applyFreezeMotionFrames','remove','autoMeleeMultiTargetActionSet','partyCommandWindowRectXPStyle','isCustomBattleScope','StepDistanceX','_regionBattleback2','BattleManager_endAction','TextAlign','cancel','stop','OffsetAdjust','VisuMZ_2_HorrorEffects','pdOjb','centerFrontViewSprite','QoL','scope','_skillIDs','createHelpWindow','width','ParseStateNotetags','mFsWf','regionId','xInuz','createAnimationSprite','Sprite_Actor_updateBitmap','isForRandom','Xqwpv','_visualHpGauge_JustDied','mmp','_regionBattleback1','allowCollapse','eraseState','Window_BattleLog_performMiss','setText','VPaSr','updateWaitMode','QAkKk','_totalValue','addBuff','+%1\x20MP','Actor-%1-%2','createBattleUIOffsetX','ActionEnd','command357','Nxstu','tAtWg','ApplyImmortal','usePremadeActionSequence','battleSpin','JtojB','random','autoSelect','wFhmf','Scene_Battle_createCancelButton','Linear','addDamageSprite','XNmlm','updateSkew','AlphaFilter','_battlerHue','HRwdS','startDamagePopup','SaoLO','ParseSkillNotetags','SNIRx','_appeared','qshKT','AdKAM','_actions','itemLineRect','Sprite_Enemy_setHue','qjXFr','SmoothImage','ForceDeath','DisplayAction','MQbHX','autoBattleStyle','setHue','makeActionList','tWcUb','HelpFight','-%1\x20MP','Parse_Notetags_Action','_createEffectsContainer','Sprite_Enemy_initVisibility','battleCommands','tfhHy','CmdTextAutoBattle','commandNameWindowDrawText','bsdJX','pUUrY','ActSeq_Impact_MotionBlurTarget','_floatDuration','PreDamageAsUserJS','shfba','current\x20target','_skillWindow','_animationContainer','_pattern','KGEJU','kVgXP','innerWidth','isEnemy','Mechanics','ActSeq_Mechanics_DeathBreak','xtuXX','apply','DefeatEvent','isAutoBattleCommandAdded','chantStyle','Game_BattlerBase_eraseState','qammI','ActSeq_BattleLog_PushBaseLine','AutoBattleMsg','PFypw','waitForEffect','canInput','MANUAL','Game_BattlerBase_initMembers','YmTyy','npgrP','BattleEndEvent','ActionEffect','Game_Battler_clearMotion','Sprite_Battler_setBattler','PreStartActionJS','isSkewing','displayAddedStates','BattleManager_selectNextCommand','BfrHT','setBattleSkew','ActSeq_Set_FinishAction','IfoGS','statusWindowRect','attack','traitSet','options','AyPrt','itemWindowRect','tihZm','_spriteset','createCommandNameWindow','displayType','startMotion','CalcActionSpeedJS','BattleManager_onEscapeSuccess','ActSeq_Mechanics_Collapse','pattern','selectPreviousCommand','%1RegenerateJS','adjustPosition_ScaleToFit','speed','kUOjm','rDBHV','refreshBattlerMotions','Window_BattleLog_performActionStart','bMhvl','QcWoP','log','initMembers','EUHDH','statusText','DGJTt','createEnemyNameContainer','arRedRate','_requestRefresh','StartTurnShow','_isBattlerFlipped','ConfigManager_applyData','%1EndBattleJS','ShowEnemyGauge','Scene_Battle_createHelpWindow','ScaleUp','Game_Action_executeDamage','useItem','Sprite_Weapon_loadBitmap','message4','shadow','ShowTpDmg','isChanting','nKGKK','opacityStart','PreDamage%1JS','getItemDamageAmountTextBattleCore','_createCursorSprite','jeazJ','isAnyoneFloating','actor%1-portrait','displayChangedBuffs','updateBattlebackBitmap2','eypHW','Game_BattlerBase_canAttack','spinBattler','applyData','_dimmerSprite','commandSymbol','placeTimeGauge','setMoveEasingType','turn','sortEnemies','Buffs','_growX','jJrDH','CriticalColor','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','ActSeq_Element_AddElements','createEmptyBitmap','updateStatusWindowPosition','PostDamageAsTargetJS','BattleManager_startBattle','setImmortal','JumpToLabel','Rate','onFloatEnd','_lines','ActSeq_Movement_WaitForMovement','Sprite_Enemy_loadBitmap','ShowWeapon','commandNameWindowCenter','changeCtbChargeTime','gAWDZ','StyleName','OYrNk','TP_Flat','missile','arRedFlat','ActSeq_ChangeSkew','setupShockwaveImpactFilter','_cursorSprite','ySykX','bossCollapse','rXyyL','JCYHu','BattleManager_updatePhase','DhGqb','BattleManager_initMembers','isSceneChanging','TargetLocation','asNVT','setBattleZoom','BattleDefeatJS','ConvertActionSequenceTarget','Game_Action_isForOpponent','criticalHitRate','addImmortal','stepBack','createSeparateDamagePopups','startMove','ActionAnimation','performRecovery','Debuffs','CommandVisible','displayBuffs','XPActorCommandLines','Window_BattleLog_performCollapse','SvWeaponMass-%1-%2','_flashColor','onActorOk','updateShadowBattleCore','_tpbNeedsPartyCommand','checkCacheKey','CmdIconEscape','EnableSoftCap','ockAy','placeStateIcon','ejLZM','createKeyJS','isHidden','ParseClassNotetags','_stateIconSprite','power','ActSeq_Movement_Jump','isAtbCastingState','Sprite_Enemy_updateStateSprite','_methods','visible','processBorderActor','Strength','ActSeq_Mechanics_AddBuffDebuff','isMVAnimation','clearMotion','updateMotionCount','isBattleCoreTargetScope','Window_BattleLog_displayTpDamage','oIWKh','hardDamageCap','ActSeq_Motion_RefreshMotion','Game_System_initialize','battleSpriteSkew','repeatTargets','AS\x20USER','singleSkill','%1Apply%2JS','statusWindowRectXPStyle','makeTargets','ForceExploited','AXgil','Scene_Battle_terminate','WPMlR','putActiveBattlerOnTop','displayCritical','BGjpX','itemCri','DEF','Game_BattlerBase_isStateResist','_floatWholeDuration','bIbOl','canBattlerMove','animationBaseDelay','forceWeaponAnimation','Game_Map_battleback2Name','StepDuration','uknVt','_targetSkewX','Sprite_Enemy_update','qKhSs','CoreEngine','onOpacityEnd','ShowRemovedState','lgJvV','addAutoBattleCommands','VqFPF','cgANQ','UIuVO','getTraitSetKeys','Direction','missed','UhhnH','makeCommandList','GAWSn','changeBattlebacks','_damageContainer','PreApply%1JS','refreshStatusWindow','extraPositionX','ActSeq_Animation_ShowAnimation','TSWSI','subject','AUTO\x20BATTLE','setActorHome','pOkhI','registerDefeatedEnemy','setupIconTextPopup','rbYda','zsZlU','requestMotion','PopupDuration','ActSeq_Movement_MoveToPoint','CSWgv','maxLines','initBattlePortrait','Immortal','_statusWindow','deadMembers','addGeneralOptions','parameters','ONIgG','ActSeq_Movement_MoveBy','magicReflection','removeDamageSprite','boxWidth','wholeActionSet','registerCommand','unshift','Width','JACnH','Game_Action_clear','_waitCount','_list','guard','setSkill','setupZoomBlurImpactFilter','BattleManager_onEncounter','WaitForJump','egmjh','helpWindowRect','_waitMode','GuardFormulaJS','TERUg','JaBzY','XKFsi','boxHeight','displayMpDamage','clone','attackAnimationId1','_battler','windowPadding','canGuardBattleCore','iUuzT','Window_BattleLog_pushBaseLine','updateHelp','_growWholeDuration','DistanceX','initElementStatusCore','STRUCT','commandStyleCheck','vcPIJ','yJObR','MVrKe','cancelActorInput','applyForcedGameTroopSettingsBattleCore','isFlipped','item','_motionType','isOptionsCommandAdded','ARRAYEVAL','cabaL','ezFpz','Filename','spriteId','setBackgroundType','exit','_borderPortraitDuration','process_VisuMZ_BattleCore_PluginParams','gSTfV','isBorderStylePortraitShown','EDtYO','clearElementChanges','displayAction','Game_Battler_performActionStart','mainSpriteScaleX','updateOpacity','bitmapHeight','BattleLog','FocusX','ActSeq_Motion_MotionType','anchor','rowSpacing','Radius','WHcWS','ActSeq_Impact_ColorBreak','UspPO','GufxA','scale','MSbLP','evalDamageFormulaBattleCore','isAlive','startJump','createWeather','gaugeX','dataId','dead\x20opponents','RLsDF','destroy','isSideView','isActor','wjYTB','_effectDuration','nsrIX','_angleDuration','WaitCount2','getAttackWeaponAnimationId','friendsUnit','helpWindowRectBorderStyle','States','Window_Options_statusText','vhlBy','slice','forceEscapeSprite','PrioritySortActive','_createCursorArea','WOYci','wtypeId','forceMotion','drawActorFace','isCustomActionSequence','BattleManager_endBattle','clearForcedGameTroopSettingsBattleCore','msKve','lineRect','isCommandEnabled','performWeaponAnimation','uiMenuStyle','_interpreter','SkillItemStandardCols','LastSelected','BattleLayout','performAttack','getMenuImage','front\x20base','pVXVU','Window_BattleLog_displayCritical','zoomDuration','inBattle','glaYI','initVisibility','setHelpWindowItem','param','ShowFacesListStyle','FlashColor','CHvEl','_homeX','Game_Action_evalDamageFormula','onSkewEnd','buffRemove','CommandAddAutoBattle','KFaVF','makeActionListAutoAttack','Scene_Battle_partyCommandWindowRect','height','MXJrc','hpDamage','byekd','Scene_Battle_logWindowRect','_damages','missle','autoBattleAtStart','EJMAr','command339','isAutoBattle','RequiresDefeat','_padding','LRwdi','transform','DrrhU','isSpinning','eamCv','lcklB','svBattlerAnchorX','WaitCount','enemyId','Game_Temp_requestAnimation','ActSeq_Movement_WaitForScale','Actor','ResetOffset','isQueueOptionsMenu','FjXvH','battleStatusWindowAnimationContainer','callNextMethod','WNadh','gnjNB','Sprite_Enemy_createStateIconSprite','StepDistanceY','removeHorrorEffect','KodBm','sDmxo','ActSeq_Camera_Reset','displayFailure','Scene_Battle_updateBattleProcess','JSON','Window_BattleEnemy_show','split','AsTarget','gdhIQ','createString','itemHeight','isAppeared','battleCommandName','FlinchDuration','guardSkillId','VarianceFormulaJS','_duration','NKCXN','CriticalHitRate','ChantStyle','setupWeaponAnimation','processDefeat','members','battleUIOffsetY','animationWait','blt','text','ActSeq_Animation_ChangeBattlePortrait','ext','_battleField','ClearBattleLog','setupBattleback','ActSeq_Movement_FaceTarget','lrAuV','checkTpbInputClose','SkillItemMiddleLayout','oLKVs','gradientFillRect','DefaultHardCap','ActSeq_Mechanics_VariablePopup','createHpGaugeSprite','BozhD','Name','placeActorName','OcNOA','_weather','MotionIdle','VYnkH','user','isDeathStateAffected','EnableDamageCap','updateFlip','BattleManager_isTpbMainPhase','gainTp','_helpWindow','ActSeq_Impact_ShockwavePoint','fSJRL','daetI','commandEscape','isItemCommandEnabled','evaded','right','attachSpritesToDistortionSprite','svBattlerShadowVisible','vMRBM','string','loadPicture','TextColor','match','alive\x20friends','_dragonbonesSpriteContainer','createCommandVisibleJS','Game_Action_needsSelection','active','dragonbonesData','QCNOZ','cameraDuration','xvAfO','ActSeq_Animation_CastAnimation','_allTargets','_enemyIDs','updateRefresh','performDamage','HIjfb','GNfkF','_flipScaleX','PWgFf','%1StartTurnJS','noise','clear','commandStyle','battler','wait','CommandAddOptions','Point','Sprite_Actor_setBattler','WaitForFloat','_baseX','ActSeq_Camera_Offset','abs','PostDamage%1JS','LrFWz','cmbtt','setupBattlebackBattleCore','XuwMI','createContents','damageStyle','abnormal','NeumT','alive\x20friends\x20not\x20user','qPCow','_tpbState','_cache','qqkGv','iuhxJ','addLoadListener','Vrilh','AutoBattleCancel','setupMotionBlurImpactFilter','updateScale','surprise','JS\x20ESCAPE\x20SUCCESS','jSzEw','startSpin','bjvhZ','gWlGF','skillWindowRect','ParseActorNotetags','mainSpriteWidth','pop','WaitForMovement','floatBattler','EasingType','logWindowRect','addBattleCoreAutoBattleStartupCommand','mpDamage','SceneManager_isSceneChanging','ININl','buffAdd','Sprite_Battler_startMove','zthgY','IPkqH','not\x20focus','battleJump','min','_iconIndex','_borderPortraitSprite','VFmcl','isEffecting','setBattleCameraTargets','emerge','_item','displaySubstitute','CreateActionSequenceTargets','Height','pkeGS','getDefeatedEnemies','endAction','drawLineText','startGrow','isAnyoneSpinning','Scene_Battle_onActorCancel','Scene_Battle_selectNextCommand','Victory','wlhyZ','updateBossCollapse','activate','loadSvEnemy','ITEM','HelpItem','opponentsUnit','splice','VRnbS','updateJump','regenerateAll','updateAngleCalculations','toString','isForOne','FrontViewSelect','AsUser','victory','displayStartMessages','drawItemImagePortraitStyle','FSXRq','ActSeq_Camera_WaitForCamera','prev\x20target','pages','DamageRate','createStateIconSprite','Sprite_Actor_moveToStartPosition','enElZ','notFocusValid','Scene_Battle_startEnemySelection','createAutoBattleWindow','createChildSprite','randomInt','updateBattlerContainer','zMEuD','turnCount','Game_Action_apply','MXdlF','PreRegenerateJS','moveBattlerToPoint','uypDH','changeAtbChargeTime','Exploiter','Targets','Game_Battler_onBattleStart','Window_BattleLog_performReflection','create','setBattleCameraPoint','addChild','backColor'];(function(_0x3a6331,_0xefb7a1){const _0x2a7227=function(_0x417456){while(--_0x417456){_0x3a6331['push'](_0x3a6331['shift']());}};_0x2a7227(++_0xefb7a1);}(_0x2a72,0x132));const _0x4174=function(_0x3a6331,_0xefb7a1){_0x3a6331=_0x3a6331-0xab;let _0x2a7227=_0x2a72[_0x3a6331];return _0x2a7227;};const _0x444eb4=_0x4174;var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x444eb4(0x34b)](function(_0x3a5df7){const _0x42d7a1=_0x444eb4;return _0x3a5df7['status']&&_0x3a5df7[_0x42d7a1(0x235)][_0x42d7a1(0x8f7)]('['+label+']');})[0x0];VisuMZ[label][_0x444eb4(0x90c)]=VisuMZ[label][_0x444eb4(0x90c)]||{},VisuMZ[_0x444eb4(0x346)]=function(_0x505591,_0x1d6b98){const _0x59f021=_0x444eb4;for(const _0x87d831 in _0x1d6b98){if(_0x87d831[_0x59f021(0x7db)](/(.*):(.*)/i)){if(_0x59f021(0x514)!==_0x59f021(0x514)){function _0x32bde8(){const _0xb302e1=_0x59f021,_0x5eb5b5=this['_dimmerSprite'][_0xb302e1(0x8fa)],_0x2ef606=this[_0xb302e1(0x592)]-0x8,_0x563444=this[_0xb302e1(0x773)],_0x12efeb=this[_0xb302e1(0x354)],_0x25db0e=_0x1921d8[_0xb302e1(0x158)](),_0x58838c=_0x473d5b[_0xb302e1(0x2ae)]();this[_0xb302e1(0x642)]['x']=0x4,_0x5eb5b5[_0xb302e1(0x900)](_0x2ef606,_0x563444),_0x5eb5b5[_0xb302e1(0x7bc)](0x0,0x0,_0x2ef606,_0x12efeb,_0x58838c,_0x25db0e,!![]),_0x5eb5b5[_0xb302e1(0x37d)](0x0,_0x12efeb,_0x2ef606,_0x563444-_0x12efeb*0x2,_0x25db0e),_0x5eb5b5[_0xb302e1(0x7bc)](0x0,_0x563444-_0x12efeb,_0x2ef606,_0x12efeb,_0x25db0e,_0x58838c,!![]),this[_0xb302e1(0x642)][_0xb302e1(0xad)](0x0,0x0,_0x2ef606,_0x563444);}}else{const _0x145300=String(RegExp['$1']),_0xdcbaaf=String(RegExp['$2'])[_0x59f021(0x8c0)]()[_0x59f021(0x3af)]();let _0xb5fb0f,_0x1cd7dc,_0x23a299;switch(_0xdcbaaf){case _0x59f021(0x300):_0xb5fb0f=_0x1d6b98[_0x87d831]!==''?Number(_0x1d6b98[_0x87d831]):0x0;break;case _0x59f021(0x3f5):_0x1cd7dc=_0x1d6b98[_0x87d831]!==''?JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831]):[],_0xb5fb0f=_0x1cd7dc[_0x59f021(0x99d)](_0x29887f=>Number(_0x29887f));break;case _0x59f021(0x96f):_0xb5fb0f=_0x1d6b98[_0x87d831]!==''?eval(_0x1d6b98[_0x87d831]):null;break;case _0x59f021(0x715):_0x1cd7dc=_0x1d6b98[_0x87d831]!==''?JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831]):[],_0xb5fb0f=_0x1cd7dc[_0x59f021(0x99d)](_0x4f056e=>eval(_0x4f056e));break;case _0x59f021(0x79b):_0xb5fb0f=_0x1d6b98[_0x87d831]!==''?JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831]):'';break;case _0x59f021(0x3f1):_0x1cd7dc=_0x1d6b98[_0x87d831]!==''?JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831]):[],_0xb5fb0f=_0x1cd7dc['map'](_0x4c5c69=>JSON[_0x59f021(0xbd)](_0x4c5c69));break;case _0x59f021(0x93d):_0xb5fb0f=_0x1d6b98[_0x87d831]!==''?new Function(JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831])):new Function(_0x59f021(0x141));break;case'ARRAYFUNC':_0x1cd7dc=_0x1d6b98[_0x87d831]!==''?JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831]):[],_0xb5fb0f=_0x1cd7dc[_0x59f021(0x99d)](_0x827ada=>new Function(JSON['parse'](_0x827ada)));break;case _0x59f021(0x8b9):_0xb5fb0f=_0x1d6b98[_0x87d831]!==''?String(_0x1d6b98[_0x87d831]):'';break;case _0x59f021(0x115):_0x1cd7dc=_0x1d6b98[_0x87d831]!==''?JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831]):[],_0xb5fb0f=_0x1cd7dc[_0x59f021(0x99d)](_0x53a19d=>String(_0x53a19d));break;case _0x59f021(0x70a):_0x23a299=_0x1d6b98[_0x87d831]!==''?JSON[_0x59f021(0xbd)](_0x1d6b98[_0x87d831]):{},_0x505591[_0x145300]={},VisuMZ[_0x59f021(0x346)](_0x505591[_0x145300],_0x23a299);continue;case _0x59f021(0x2ee):_0x1cd7dc=_0x1d6b98[_0x87d831]!==''?JSON['parse'](_0x1d6b98[_0x87d831]):[],_0xb5fb0f=_0x1cd7dc['map'](_0x540464=>VisuMZ[_0x59f021(0x346)]({},JSON[_0x59f021(0xbd)](_0x540464)));break;default:continue;}_0x505591[_0x145300]=_0xb5fb0f;}}}return _0x505591;},(_0x26ce14=>{const _0x5c0b01=_0x444eb4,_0x2e0ee1=_0x26ce14[_0x5c0b01(0x2d2)];for(const _0x5ce410 of dependencies){if('ifQYa'!==_0x5c0b01(0x175)){if(!Imported[_0x5ce410]){alert(_0x5c0b01(0x4da)[_0x5c0b01(0x4e2)](_0x2e0ee1,_0x5ce410)),SceneManager[_0x5c0b01(0x71b)]();break;}}else{function _0x267404(){const _0x416a8b=_0x5c0b01;if(!_0x3b1c5b['isSceneBattle']())return;if(!_0x302792[_0x416a8b(0x213)])return;_0x4e98b9[_0x416a8b(0x346)](_0x5b3770,_0x4bad64);const _0x39f32b=_0x2ff44e['getLastPluginCommandInterpreter'](),_0x21250b=_0x4445bb['WaitForCamera'];_0x1502da[_0x416a8b(0x869)](_0x2a97f7[_0x416a8b(0x728)],_0xfa169[_0x416a8b(0x348)],_0x3d728c[_0x416a8b(0xfa)],_0x1f6787[_0x416a8b(0x81b)]);if(_0x21250b)_0x39f32b[_0x416a8b(0x306)]('battleCamera');}}}const _0x4ce472=_0x26ce14[_0x5c0b01(0x235)];if(_0x4ce472['match'](/\[Version[ ](.*?)\]/i)){if(_0x5c0b01(0x66e)==='HUBRH'){function _0x3bed9b(){const _0x20d5e8=_0x5c0b01;this['_createCursorArea'](),this[_0x20d5e8(0x5d3)](),_0x7b99b[_0x20d5e8(0x268)]['_createClientArea'][_0x20d5e8(0x315)](this),this[_0x20d5e8(0x343)]();}}else{const _0x35e111=Number(RegExp['$1']);_0x35e111!==VisuMZ[label][_0x5c0b01(0xc3)]&&(alert(_0x5c0b01(0x991)[_0x5c0b01(0x4e2)](_0x2e0ee1,_0x35e111)),SceneManager[_0x5c0b01(0x71b)]());}}if(_0x4ce472[_0x5c0b01(0x7db)](/\[Tier[ ](\d+)\]/i)){const _0x17a87d=Number(RegExp['$1']);if(_0x17a87d<tier){if(_0x5c0b01(0x3ed)!==_0x5c0b01(0x3ed)){function _0x3ce42a(){const _0x51c25f=_0x5c0b01;_0x51abb7[_0x51c25f(0x25c)][_0x51c25f(0x61b)][_0x51c25f(0x315)](this,_0x96ec17,_0x528088),this[_0x51c25f(0x790)]();}}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x2e0ee1,_0x17a87d,tier)),SceneManager['exit']();}else{if(_0x5c0b01(0x5d6)!==_0x5c0b01(0x5d6)){function _0x3bfba9(){const _0xf8cb87=_0x5c0b01;this[_0xf8cb87(0x6d9)]('dead');return;}}else tier=Math[_0x5c0b01(0x960)](_0x17a87d,tier);}}VisuMZ[_0x5c0b01(0x346)](VisuMZ[label][_0x5c0b01(0x90c)],_0x26ce14[_0x5c0b01(0x6e3)]);})(pluginData),VisuMZ[_0x444eb4(0x830)]=function(_0x5a4ff8){const _0x57824e=_0x444eb4;let _0x140f06=[];for(const _0x324fa9 of _0x5a4ff8){_0x140f06=_0x140f06[_0x57824e(0x3ec)](VisuMZ[_0x57824e(0x671)](_0x324fa9));}return _0x140f06[_0x57824e(0x34b)](_0x35fbb1=>_0x35fbb1);},VisuMZ[_0x444eb4(0x671)]=function(_0x579341){const _0x332237=_0x444eb4,_0x6afacc=BattleManager[_0x332237(0x527)]()[_0x332237(0x34b)](_0x2788fa=>_0x2788fa&&_0x2788fa[_0x332237(0x7a2)]()),_0x5b66a8=BattleManager[_0x332237(0xda)],_0x30fbd7=BattleManager[_0x332237(0x42e)],_0x3f7b4b=BattleManager[_0x332237(0x7e6)]?BattleManager[_0x332237(0x7e6)][_0x332237(0x749)](0x0):_0x6afacc;_0x579341=_0x579341[_0x332237(0x3d1)]()[_0x332237(0x3af)]();if(_0x579341===_0x332237(0x7c7))return[_0x5b66a8];else{if(_0x579341===_0x332237(0x5df))return[_0x30fbd7];else{if(_0x579341===_0x332237(0x850)){if(_0x30fbd7){const _0x2f4c14=_0x3f7b4b[_0x332237(0x221)](_0x30fbd7);return _0x2f4c14>=0x0?[_0x3f7b4b[_0x2f4c14-0x1]||_0x30fbd7]:[_0x30fbd7];}}else{if(_0x579341==='text\x20target'){if(_0x30fbd7){if(_0x332237(0x507)===_0x332237(0xea)){function _0x4a13d2(){const _0x13855=_0x332237,_0x348140=this['_commandNameWindow'],_0x5a5a5f=_0xbf4d5[_0x13855(0x702)](),_0x4f03a9=_0x1a0941['x']+_0x2d759d[_0x13855(0x10b)](_0x137e13['width']/0x2)+_0x5a5a5f;_0x348140['x']=_0x348140['width']/-0x2+_0x4f03a9,_0x348140['y']=_0x1955ec[_0x13855(0x10b)](_0x4c27c2['height']/0x2);}}else{const _0x3106fd=_0x3f7b4b[_0x332237(0x221)](_0x30fbd7);return _0x3106fd>=0x0?[_0x3f7b4b[_0x3106fd+0x1]||_0x30fbd7]:[_0x30fbd7];}}}else{if(_0x579341===_0x332237(0x876))return _0x3f7b4b;else{if(_0x579341===_0x332237(0xbc))return[_0x5b66a8][_0x332237(0x3ec)](_0x3f7b4b);else{if(_0x579341===_0x332237(0x825))return _0x6afacc[_0x332237(0x34b)](_0x180479=>_0x180479!==_0x5b66a8&&!_0x3f7b4b['includes'](_0x180479)&&_0x180479['notFocusValid']());}}}}}}if(_0x5b66a8){if(_0x579341===_0x332237(0x7dc))return _0x5b66a8[_0x332237(0x744)]()['aliveMembers']();else{if(_0x579341===_0x332237(0x804))return _0x5b66a8[_0x332237(0x744)]()[_0x332237(0x20e)]()['filter'](_0x306f69=>_0x306f69!==_0x5b66a8);else{if(_0x579341===_0x332237(0x397)){if(_0x332237(0x665)===_0x332237(0x665))return _0x5b66a8[_0x332237(0x744)]()[_0x332237(0x20e)]()[_0x332237(0x34b)](_0x2a6867=>_0x2a6867!==_0x30fbd7);else{function _0x557111(){const _0x220eb4=_0x332237;if(!this[_0x220eb4(0x44d)]())return;if(this[_0x220eb4(0x8da)]===_0x572f2e)return;this['_targetFloatHeight']=_0x27b37b,this[_0x220eb4(0x5dc)]=_0x9fd5ec,this[_0x220eb4(0x6b1)]=_0x4dde2e,this[_0x220eb4(0x567)]=_0x80f407||_0x220eb4(0x5b6);if(_0x495646<=0x0)this[_0x220eb4(0x2bf)]=_0x5e8ef9;}}}else{if(_0x579341===_0x332237(0x13b))return _0x5b66a8[_0x332237(0x744)]()['deadMembers']();else{if(_0x579341[_0x332237(0x7db)](/FRIEND INDEX (\d+)/i)){const _0x5b0c95=Number(RegExp['$1']);return[_0x5b66a8[_0x332237(0x744)]()[_0x332237(0x7ad)]()[_0x5b0c95]];}}}}}if(_0x579341==='alive\x20opponents'){if(_0x332237(0x6f6)!==_0x332237(0x6f6)){function _0x3bd945(){const _0x2deb09=_0x332237;_0x5e7bb1[_0x2deb09(0x25c)][_0x2deb09(0x866)]['call'](this,_0x232d57),this[_0x2deb09(0x520)](_0x15b6fc);}}else return _0x5b66a8['opponentsUnit']()[_0x332237(0x20e)]();}else{if(_0x579341===_0x332237(0x95c))return _0x5b66a8[_0x332237(0x841)]()[_0x332237(0x20e)]()[_0x332237(0x34b)](_0x1dc388=>_0x1dc388!==_0x30fbd7);else{if(_0x579341===_0x332237(0x739))return _0x5b66a8[_0x332237(0x841)]()['deadMembers']();else{if(_0x579341[_0x332237(0x7db)](/OPPONENT INDEX (\d+)/i)){const _0x3720ec=Number(RegExp['$1']);return[_0x5b66a8[_0x332237(0x841)]()[_0x332237(0x7ad)]()[_0x3720ec]];}}}}}if(_0x579341===_0x332237(0x405)){if(_0x332237(0x843)===_0x332237(0x843))return $gameParty[_0x332237(0x20e)]();else{function _0x52ac68(){const _0x30ae52=_0x332237;_0x25aa88['BattleCore'][_0x30ae52(0x3a1)][_0x30ae52(0x315)](this),this[_0x30ae52(0x4e0)]();if(this[_0x30ae52(0x266)]===_0x976ed)this['createShadowSprite']();this[_0x30ae52(0x183)]();}}}else{if(_0x579341===_0x332237(0x435))return $gameParty[_0x332237(0x20e)]()[_0x332237(0x34b)](_0x20243b=>_0x20243b!==_0x5b66a8);else{if(_0x579341==='alive\x20actors\x20not\x20target'){if(_0x332237(0x195)===_0x332237(0x3fd)){function _0x2deed7(){const _0x260ff9=_0x332237;this['_skillWindow'][_0x260ff9(0x96e)]();}}else return $gameParty['aliveMembers']()[_0x332237(0x34b)](_0x222fbd=>_0x222fbd!==_0x30fbd7);}else{if(_0x579341==='dead\x20actors'){if('qPXZg'==='lzdlO'){function _0x47efa0(){const _0x21ea14=_0x332237;if(_0x2c2301['battleCameraData']()[_0x21ea14(0x7e3)]>0x0)return!![];if(_0x344ae8['battleCameraData']()[_0x21ea14(0x931)]>0x0)return!![];this[_0x21ea14(0x6f8)]='';}}else return $gameParty[_0x332237(0x6e1)]();}else{if(_0x579341['match'](/ACTOR INDEX (\d+)/i)){const _0xf706ca=Number(RegExp['$1']);return[$gameParty[_0x332237(0x7ad)]()[_0xf706ca]];}else{if(_0x579341[_0x332237(0x7db)](/ACTOR ID (\d+)/i)){const _0x49ddb9=Number(RegExp['$1']);return[$gameActors[_0x332237(0x4cb)](_0x49ddb9)];}}}}}}if(_0x579341===_0x332237(0x3fa))return $gameTroop['aliveMembers']();else{if(_0x579341===_0x332237(0x473))return $gameTroop[_0x332237(0x20e)]()['filter'](_0xf06ad2=>_0xf06ad2!==_0x5b66a8);else{if(_0x579341===_0x332237(0x16e))return $gameTroop[_0x332237(0x20e)]()[_0x332237(0x34b)](_0x44b9a2=>_0x44b9a2!==_0x30fbd7);else{if(_0x579341===_0x332237(0x4ce)){if(_0x332237(0x5f8)===_0x332237(0x8d4)){function _0x18f010(){const _0x23af4f=_0x332237;if(!_0x2c4ff2[_0x23af4f(0x11f)]())return;const _0x37c779=_0x23b73e['getLastPluginCommandInterpreter'](),_0x584a2e=_0x24f63b[_0x23af4f(0x1e1)];_0x584a2e[_0x23af4f(0x2d3)](),_0x37c779[_0x23af4f(0x306)]('battlelog');}}else return $gameTroop[_0x332237(0x6e1)]();}else{if(_0x579341['match'](/ENEMY INDEX (\d+)/i)){const _0x33eb42=Number(RegExp['$1']);return[$gameTroop['members']()[_0x33eb42]];}else{if(_0x579341['match'](/ENEMY ID (\d+)/i)){if(_0x332237(0x424)===_0x332237(0x424)){const _0xf87eab=Number(RegExp['$1']);return $gameTroop[_0x332237(0x20e)]()[_0x332237(0x34b)](_0x2c7b61=>_0x2c7b61[_0x332237(0x788)]()===_0xf87eab);}else{function _0x147380(){const _0x3f4352=_0x332237;_0x2af2c9=_0x1ff6c0[_0x3f4352(0x25c)]['JS'][_0x5068c1]['call'](this,this[_0x3f4352(0x6d1)](),_0xc665c2,_0x29b64c,_0x53dd12);if(_0x9167db)_0x4c0e17=_0x338494;}}}}}}}}if(_0x579341==='alive\x20battlers'){if(_0x332237(0x70d)!==_0x332237(0x358))return _0x6afacc[_0x332237(0x34b)](_0x1a18ae=>_0x1a18ae[_0x332237(0x734)]());else{function _0x363a0b(){const _0x1d0d98=_0x332237;return _0x3be1a8[_0x1d0d98(0x34b)](_0x599f91=>_0x599f91['isDead']());}}}else{if(_0x579341===_0x332237(0x964))return _0x6afacc[_0x332237(0x34b)](_0x1f22ed=>_0x1f22ed[_0x332237(0x734)]()&&_0x1f22ed!==_0x5b66a8);else{if(_0x579341===_0x332237(0x998))return _0x6afacc[_0x332237(0x34b)](_0x771959=>_0x771959[_0x332237(0x734)]()&&_0x771959!==_0x30fbd7);else{if(_0x579341===_0x332237(0x1ce))return _0x6afacc[_0x332237(0x34b)](_0x19b112=>_0x19b112[_0x332237(0xc9)]());}}}return[];},PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x212),_0x25ff89=>{const _0x119951=_0x444eb4;if(!SceneManager[_0x119951(0x11f)]())return;VisuMZ[_0x119951(0x346)](_0x25ff89,_0x25ff89);const _0x4beee1=$gameTemp[_0x119951(0x283)](),_0x5af43f=BattleManager[_0x119951(0x274)],_0x2f9e45=BattleManager[_0x119951(0xda)],_0x4bad3c=BattleManager['_allTargets']?BattleManager[_0x119951(0x7e6)][_0x119951(0x749)](0x0):[],_0x389adb=BattleManager[_0x119951(0x1e1)];if(!_0x4beee1||!_0x5af43f||!_0x2f9e45)return;if(!_0x5af43f['item']())return;if(_0x25ff89[_0x119951(0x5ca)])_0x389adb[_0x119951(0x722)](_0x2f9e45,_0x5af43f['item']());_0x25ff89[_0x119951(0x5ae)]&&_0x389adb['push'](_0x119951(0x8d5),_0x2f9e45,_0x4bad3c,!![]);if(_0x25ff89['ActionStart'])_0x389adb['push'](_0x119951(0x34d),_0x2f9e45,_0x5af43f);if(_0x25ff89[_0x119951(0x819)])_0x389adb[_0x119951(0x12b)](_0x119951(0x12e));if(_0x25ff89[_0x119951(0x35a)])_0x389adb[_0x119951(0x12b)](_0x119951(0x39c),_0x2f9e45,_0x5af43f);if(_0x25ff89['WaitForAnimation'])_0x389adb[_0x119951(0x12b)](_0x119951(0x372));_0x4beee1[_0x119951(0x306)](_0x119951(0xf4));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Set_WholeActionSet',_0x513b98=>{const _0x25d49a=_0x444eb4;if(!SceneManager[_0x25d49a(0x11f)]())return;VisuMZ['ConvertParams'](_0x513b98,_0x513b98);const _0x17b5fa=$gameTemp[_0x25d49a(0x283)](),_0x538cc4=BattleManager[_0x25d49a(0x274)],_0x3d3254=BattleManager[_0x25d49a(0xda)],_0x44bfac=BattleManager[_0x25d49a(0x7e6)]?BattleManager[_0x25d49a(0x7e6)][_0x25d49a(0x749)](0x0):[],_0x427fe1=BattleManager[_0x25d49a(0x1e1)];if(!_0x17b5fa||!_0x538cc4||!_0x3d3254)return;if(!_0x538cc4[_0x25d49a(0x712)]())return;if(_0x513b98[_0x25d49a(0x3d9)])_0x427fe1[_0x25d49a(0x12b)](_0x25d49a(0x298),_0x3d3254,_0x538cc4);if(_0x513b98['WaitCount']>0x0)_0x427fe1['push'](_0x25d49a(0xb2),_0x513b98[_0x25d49a(0x787)]);if(_0x513b98[_0x25d49a(0x678)])_0x427fe1[_0x25d49a(0x12b)](_0x25d49a(0x877),_0x3d3254,_0x44bfac,_0x538cc4[_0x25d49a(0x712)]()[_0x25d49a(0x8e9)]);if(_0x513b98[_0x25d49a(0x550)])_0x427fe1[_0x25d49a(0x12b)](_0x25d49a(0x372));for(const _0x2c560e of _0x44bfac){if(!_0x2c560e)continue;if(_0x513b98[_0x25d49a(0x5fa)])_0x427fe1[_0x25d49a(0x12b)](_0x25d49a(0x1ae),_0x3d3254,_0x2c560e);}if(_0x513b98[_0x25d49a(0x5ae)])_0x427fe1[_0x25d49a(0x12b)]('applyImmortal',_0x3d3254,_0x44bfac,![]);_0x17b5fa[_0x25d49a(0x306)](_0x25d49a(0xf4));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x250),_0x492894=>{const _0x4c8c0b=_0x444eb4;if(!SceneManager[_0x4c8c0b(0x11f)]())return;VisuMZ[_0x4c8c0b(0x346)](_0x492894,_0x492894);const _0x3fec02=$gameTemp['getLastPluginCommandInterpreter'](),_0x131720=BattleManager[_0x4c8c0b(0x274)],_0x1e0196=BattleManager[_0x4c8c0b(0xda)],_0x3eca3c=BattleManager[_0x4c8c0b(0x7e6)]?BattleManager['_allTargets'][_0x4c8c0b(0x749)](0x0):[],_0x933b53=BattleManager['_logWindow'];if(!_0x3fec02||!_0x131720||!_0x1e0196)return;if(!_0x131720[_0x4c8c0b(0x712)]())return;for(const _0x192d10 of _0x3eca3c){if(_0x4c8c0b(0x275)===_0x4c8c0b(0x61d)){function _0x5cfa87(){const _0x2a24e6=_0x4c8c0b;if(!_0x4ae1a8['isSideView']())return;const _0x2307aa=this['battler']();if(!_0x2307aa)return;_0x2307aa[_0x2a24e6(0x3bc)](_0x1748a7,_0x27c19a,_0x193b85);}}else{if(!_0x192d10)continue;if(_0x492894['PerformAction'])_0x933b53['push'](_0x4c8c0b(0x298),_0x1e0196,_0x131720);if(_0x492894[_0x4c8c0b(0x93f)]>0x0)_0x933b53['push'](_0x4c8c0b(0xb2),_0x492894[_0x4c8c0b(0x93f)]);if(_0x492894[_0x4c8c0b(0x678)])_0x933b53[_0x4c8c0b(0x12b)](_0x4c8c0b(0x877),_0x1e0196,[_0x192d10],_0x131720[_0x4c8c0b(0x712)]()[_0x4c8c0b(0x8e9)]);if(_0x492894[_0x4c8c0b(0x742)]>0x0)_0x933b53[_0x4c8c0b(0x12b)]('waitCount',_0x492894[_0x4c8c0b(0x742)]);if(_0x492894[_0x4c8c0b(0x5fa)])_0x933b53[_0x4c8c0b(0x12b)]('actionEffect',_0x1e0196,_0x192d10);}}if(_0x492894[_0x4c8c0b(0x5ae)])_0x933b53['push'](_0x4c8c0b(0x8d5),_0x1e0196,_0x3eca3c,![]);_0x3fec02[_0x4c8c0b(0x306)]('battlelog');}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x603),_0x17cb23=>{const _0x206e75=_0x444eb4;if(!SceneManager[_0x206e75(0x11f)]())return;VisuMZ[_0x206e75(0x346)](_0x17cb23,_0x17cb23);const _0xa79662=$gameTemp[_0x206e75(0x283)](),_0x156e1d=BattleManager[_0x206e75(0x274)],_0x1ffd4e=BattleManager[_0x206e75(0xda)],_0x34da1a=BattleManager[_0x206e75(0x7e6)]?BattleManager[_0x206e75(0x7e6)][_0x206e75(0x749)](0x0):[],_0x388210=BattleManager[_0x206e75(0x1e1)];if(!_0xa79662||!_0x156e1d||!_0x1ffd4e)return;if(!_0x156e1d['item']())return;if(_0x17cb23[_0x206e75(0x5ae)])_0x388210['push']('applyImmortal',_0x1ffd4e,_0x34da1a,![]);if(_0x17cb23['WaitForNewLine'])_0x388210[_0x206e75(0x12b)]('waitForNewLine');if(_0x17cb23['WaitForEffect'])_0x388210[_0x206e75(0x12b)](_0x206e75(0x5f3));if(_0x17cb23[_0x206e75(0x7b5)])_0x388210['push']('clear');if(_0x17cb23[_0x206e75(0x5aa)])_0x388210[_0x206e75(0x12b)](_0x206e75(0x3f9),_0x1ffd4e);if(_0x17cb23[_0x206e75(0x819)])_0x388210[_0x206e75(0x12b)](_0x206e75(0x12e));_0xa79662[_0x206e75(0x306)](_0x206e75(0xf4));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x29e),_0x367821=>{const _0x58f795=_0x444eb4;if(!SceneManager[_0x58f795(0x11f)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x58f795(0x346)](_0x367821,_0x367821);const _0x26cfb7=$gameTemp[_0x58f795(0x283)](),_0x2ae420=_0x367821[_0x58f795(0x226)];if(!_0x26cfb7)return;$gameScreen[_0x58f795(0x251)](_0x367821[_0x58f795(0x8d9)],_0x367821[_0x58f795(0xfa)],_0x367821[_0x58f795(0x81b)]);if(_0x2ae420)_0x26cfb7[_0x58f795(0x306)](_0x58f795(0x8eb));}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Angle_Reset',_0x3aaabb=>{const _0x5896a7=_0x444eb4;if(!SceneManager[_0x5896a7(0x11f)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x3aaabb,_0x3aaabb);const _0x80a68d=$gameTemp[_0x5896a7(0x283)](),_0x1dc6cd=_0x3aaabb['WaitForAngle'];if(!_0x80a68d)return;$gameScreen[_0x5896a7(0x251)](0x0,_0x3aaabb['Duration'],_0x3aaabb['EasingType']);if(_0x1dc6cd)_0x80a68d[_0x5896a7(0x306)](_0x5896a7(0x8eb));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x16c),_0x15521b=>{const _0x4ff658=_0x444eb4;if(!SceneManager[_0x4ff658(0x11f)]())return;if(!Imported[_0x4ff658(0x213)])return;const _0x1ab5cf=$gameTemp[_0x4ff658(0x283)]();if(!_0x1ab5cf)return;_0x1ab5cf[_0x4ff658(0x306)](_0x4ff658(0x8eb));}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Animation_ActionAnimation',_0xe6a387=>{const _0x43242e=_0x444eb4;if(!SceneManager[_0x43242e(0x11f)]())return;VisuMZ[_0x43242e(0x346)](_0xe6a387,_0xe6a387);const _0x4fb7ff=$gameTemp[_0x43242e(0x283)](),_0x261306=BattleManager[_0x43242e(0x274)],_0x1e9213=BattleManager['_subject'],_0x5ef1fc=VisuMZ[_0x43242e(0x830)](_0xe6a387[_0x43242e(0x865)]),_0x3037f8=_0xe6a387[_0x43242e(0x1c9)],_0x3b7b70=BattleManager['_logWindow'];if(!_0x4fb7ff||!_0x261306||!_0x1e9213)return;if(!_0x261306[_0x43242e(0x712)]())return;let _0x22a10e=_0x261306[_0x43242e(0x712)]()[_0x43242e(0x8e9)];if(_0x22a10e<0x0)_0x22a10e=_0x1e9213[_0x43242e(0x700)]();$gameTemp['requestAnimation'](_0x5ef1fc,_0x22a10e,_0x3037f8),_0xe6a387[_0x43242e(0x550)]&&_0x4fb7ff['setWaitMode']('battleAnimation');}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x2d7),_0x31f5f7=>{const _0x59045b=_0x444eb4;if(!SceneManager[_0x59045b(0x11f)]())return;VisuMZ[_0x59045b(0x346)](_0x31f5f7,_0x31f5f7);const _0x4a8eaa=$gameTemp['getLastPluginCommandInterpreter'](),_0x8f63cf=BattleManager[_0x59045b(0xda)],_0x285553=VisuMZ['CreateActionSequenceTargets'](_0x31f5f7[_0x59045b(0x865)]),_0x29ff41=_0x31f5f7[_0x59045b(0x1c9)],_0x5c1fbd=BattleManager[_0x59045b(0x1e1)];if(!_0x4a8eaa||!_0x8f63cf)return;const _0x5abb92=_0x8f63cf[_0x59045b(0x700)]();$gameTemp[_0x59045b(0x979)](_0x285553,_0x5abb92,_0x29ff41),_0x31f5f7[_0x59045b(0x550)]&&_0x4a8eaa[_0x59045b(0x306)](_0x59045b(0x408));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x7e5),_0x34630a=>{const _0xef819a=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0xef819a(0x346)](_0x34630a,_0x34630a);const _0x4c8dc0=$gameTemp[_0xef819a(0x283)](),_0x2248e8=BattleManager[_0xef819a(0x274)],_0x560f4d=_0x34630a[_0xef819a(0x1c9)],_0x542d5c=VisuMZ[_0xef819a(0x830)](_0x34630a[_0xef819a(0x865)]);if(!_0x4c8dc0||!_0x2248e8)return;if(!_0x2248e8[_0xef819a(0x712)]())return;for(const _0x4a7ab2 of _0x542d5c){if(!_0x4a7ab2)continue;_0x4a7ab2[_0xef819a(0x39c)](_0x2248e8,_0x560f4d);}if(_0x34630a[_0xef819a(0x550)])_0x4c8dc0[_0xef819a(0x306)](_0xef819a(0x408));}),PluginManager['registerCommand'](pluginData['name'],_0x444eb4(0x7b2),_0x49560a=>{const _0x2da11b=_0x444eb4;VisuMZ[_0x2da11b(0x346)](_0x49560a,_0x49560a);const _0x4b13f2=$gameTemp['getLastPluginCommandInterpreter'](),_0x3346f4=VisuMZ[_0x2da11b(0x830)](_0x49560a[_0x2da11b(0x865)]),_0x19fc17=_0x49560a[_0x2da11b(0x718)];if(!_0x19fc17)return;for(const _0x351501 of _0x3346f4){if(!_0x351501)continue;if(!_0x351501[_0x2da11b(0x73d)]())continue;_0x351501['setBattlePortrait'](_0x19fc17);}}),PluginManager['registerCommand'](pluginData['name'],_0x444eb4(0x6cf),_0x1c6af8=>{const _0x3ab14c=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3ab14c(0x346)](_0x1c6af8,_0x1c6af8);const _0x5bede7=$gameTemp[_0x3ab14c(0x283)](),_0x10db66=VisuMZ[_0x3ab14c(0x830)](_0x1c6af8[_0x3ab14c(0x865)]),_0x1ee732=_0x1c6af8[_0x3ab14c(0x531)],_0x2be2e1=_0x1c6af8[_0x3ab14c(0x1c9)];if(!_0x5bede7)return;$gameTemp[_0x3ab14c(0x979)](_0x10db66,_0x1ee732,_0x2be2e1);if(_0x1c6af8[_0x3ab14c(0x550)])_0x5bede7['setWaitMode'](_0x3ab14c(0x408));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x3d0),_0x431236=>{const _0x15e298=_0x444eb4;if(!SceneManager[_0x15e298(0x11f)]())return;const _0x2a02ad=$gameTemp[_0x15e298(0x283)]();if(!_0x2a02ad)return;_0x2a02ad[_0x15e298(0x306)](_0x15e298(0x408));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x8ec),_0x568312=>{const _0x13ebdb=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x13ebdb(0x346)](_0x568312,_0x568312);const _0x3cec25=BattleManager[_0x13ebdb(0x1e1)];_0x3cec25[_0x13ebdb(0x86e)](_0x568312[_0x13ebdb(0x3e9)]);}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x947),_0x272f31=>{const _0x3998c8=_0x444eb4;if(!SceneManager[_0x3998c8(0x11f)]())return;const _0x4ca035=BattleManager[_0x3998c8(0x1e1)];_0x4ca035[_0x3998c8(0x7f0)]();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x304),_0x24ec76=>{const _0x399d1d=_0x444eb4;if(!SceneManager[_0x399d1d(0x11f)]())return;const _0xb29c03=$gameTemp[_0x399d1d(0x283)](),_0x4f668c=BattleManager['_action'],_0x18c5e1=BattleManager[_0x399d1d(0xda)],_0x536f46=BattleManager[_0x399d1d(0x1e1)];if(!_0xb29c03||!_0x4f668c||!_0x18c5e1)return;if(!_0x4f668c[_0x399d1d(0x712)]())return;_0x536f46['displayAction'](_0x18c5e1,_0x4f668c[_0x399d1d(0x712)]()),_0xb29c03[_0x399d1d(0x306)](_0x399d1d(0xf4));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_BattleLog_PopBaseLine',_0x2ba38a=>{const _0x5f1792=_0x444eb4;if(!SceneManager[_0x5f1792(0x11f)]())return;const _0xa42fe5=BattleManager[_0x5f1792(0x1e1)];_0xa42fe5['popBaseLine']();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x5f0),_0x438071=>{const _0x373000=_0x444eb4;if(!SceneManager[_0x373000(0x11f)]())return;const _0x5b2485=BattleManager[_0x373000(0x1e1)];_0x5b2485[_0x373000(0x302)]();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_BattleLog_Refresh',_0x23ba07=>{const _0x21e67d=_0x444eb4;if(!SceneManager[_0x21e67d(0x11f)]())return;const _0x35ccea=BattleManager[_0x21e67d(0x1e1)];_0x35ccea['refresh']();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x3c6),_0x4d9ddd=>{const _0x132a39=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x132a39(0x346)](_0x4d9ddd,_0x4d9ddd),SceneManager[_0x132a39(0x3a7)][_0x132a39(0x426)](_0x4d9ddd['ShowHide']);}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],'ActSeq_BattleLog_WaitForBattleLog',_0x140474=>{const _0x2ed529=_0x444eb4;if(!SceneManager['isSceneBattle']())return;const _0x781a03=$gameTemp[_0x2ed529(0x283)]();_0x781a03[_0x2ed529(0x306)](_0x2ed529(0xf4));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x216),_0x3240f3=>{const _0x26eaf8=_0x444eb4;if(!SceneManager['isSceneBattle']())return;const _0x3a1583=$gameTemp[_0x26eaf8(0x283)](),_0x2749db=BattleManager[_0x26eaf8(0x1e1)];_0x2749db['waitForNewLine'](),_0x3a1583[_0x26eaf8(0x306)](_0x26eaf8(0xf4));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Camera_Clamp',_0x4dfec1=>{const _0xf4beb1=_0x444eb4;if(!SceneManager[_0xf4beb1(0x11f)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0xf4beb1(0x346)](_0x4dfec1,_0x4dfec1);const _0xaa610e=$gameScreen['battleCameraData']();_0xaa610e[_0xf4beb1(0x104)]=_0x4dfec1['Setting'];}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x993),_0x2c51e9=>{const _0x565d11=_0x444eb4;if(!SceneManager[_0x565d11(0x11f)]())return;if(!Imported[_0x565d11(0x213)])return;VisuMZ[_0x565d11(0x346)](_0x2c51e9,_0x2c51e9);const _0x50d750=$gameTemp[_0x565d11(0x283)](),_0x4f51ca=_0x2c51e9[_0x565d11(0x1d0)];$gameScreen[_0x565d11(0x869)](_0x2c51e9['FocusX'],_0x2c51e9[_0x565d11(0x348)],_0x2c51e9[_0x565d11(0xfa)],_0x2c51e9[_0x565d11(0x81b)]);if(_0x4f51ca)_0x50d750['setWaitMode']('battleCamera');}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0xb8),_0x4b360d=>{const _0x1e6c3c=_0x444eb4;if(!SceneManager[_0x1e6c3c(0x11f)]())return;if(!Imported[_0x1e6c3c(0x213)])return;VisuMZ[_0x1e6c3c(0x346)](_0x4b360d,_0x4b360d);const _0x5c762d=$gameTemp[_0x1e6c3c(0x283)](),_0x27e21f=VisuMZ[_0x1e6c3c(0x830)](_0x4b360d['Targets']),_0x3b417c=_0x4b360d[_0x1e6c3c(0x1d0)];$gameScreen[_0x1e6c3c(0x82c)](_0x27e21f,_0x4b360d[_0x1e6c3c(0xfa)],_0x4b360d['EasingType']);if(_0x3b417c)_0x5c762d[_0x1e6c3c(0x306)](_0x1e6c3c(0x94f));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x7f9),_0x4eba15=>{const _0x39742f=_0x444eb4;if(!SceneManager[_0x39742f(0x11f)]())return;if(!Imported[_0x39742f(0x213)])return;VisuMZ[_0x39742f(0x346)](_0x4eba15,_0x4eba15);const _0x4349e8=$gameTemp[_0x39742f(0x283)](),_0x5df76f=_0x4eba15[_0x39742f(0x1d0)];$gameScreen[_0x39742f(0x342)](_0x4eba15[_0x39742f(0x578)],_0x4eba15[_0x39742f(0x872)],_0x4eba15['Duration'],_0x4eba15['EasingType']);if(_0x5df76f)_0x4349e8[_0x39742f(0x306)](_0x39742f(0x94f));}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x798),_0x4829b3=>{const _0x9b4160=_0x444eb4;if(!SceneManager[_0x9b4160(0x11f)]())return;if(!Imported[_0x9b4160(0x213)])return;VisuMZ[_0x9b4160(0x346)](_0x4829b3,_0x4829b3);const _0x8933f4=$gameTemp['getLastPluginCommandInterpreter'](),_0x5328cc=_0x4829b3[_0x9b4160(0x198)],_0x417658=_0x4829b3[_0x9b4160(0x78c)],_0x55a76e=_0x4829b3[_0x9b4160(0x1d0)];if(_0x5328cc){if('CUrZd'!==_0x9b4160(0x6d4)){const _0x1cb442=Math[_0x9b4160(0x29d)](Graphics[_0x9b4160(0x592)]/0x2),_0x14dd3f=Math['round'](Graphics[_0x9b4160(0x773)]/0x2);$gameScreen['setBattleCameraPoint'](_0x1cb442,_0x14dd3f,_0x4829b3[_0x9b4160(0xfa)],_0x4829b3[_0x9b4160(0x81b)]);}else{function _0xeba404(){const _0x15a841=_0x9b4160;this['_cancelButton']['x']=_0x47876b['width']-(_0x5b38ee[_0x15a841(0x592)]-_0x10f78f[_0x15a841(0x6e8)])/0x2-this[_0x15a841(0x420)][_0x15a841(0x592)]-0x4;}}}_0x417658&&$gameScreen[_0x9b4160(0x342)](0x0,0x0,_0x4829b3[_0x9b4160(0xfa)],_0x4829b3['EasingType']);if(_0x55a76e)_0x8933f4[_0x9b4160(0x306)](_0x9b4160(0x94f));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x84f),_0x2327e8=>{const _0x482c25=_0x444eb4;if(!SceneManager[_0x482c25(0x11f)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x55a8d8=$gameTemp[_0x482c25(0x283)]();if(!_0x55a8d8)return;_0x55a8d8[_0x482c25(0x306)]('battleCamera');}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_DB_DragonbonesMotionAni',_0x1c9d63=>{const _0x5a058e=_0x444eb4;if(!SceneManager[_0x5a058e(0x11f)]())return;if(!Imported[_0x5a058e(0x253)])return;VisuMZ[_0x5a058e(0x346)](_0x1c9d63,_0x1c9d63);const _0x3ba798=VisuMZ['CreateActionSequenceTargets'](_0x1c9d63[_0x5a058e(0x865)]),_0x38c9ff=_0x1c9d63['MotionAni'][_0x5a058e(0x3d1)]()['trim']();for(const _0x52abad of _0x3ba798){if(!_0x52abad)continue;_0x52abad[_0x5a058e(0x371)](_0x38c9ff);}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_DB_DragonbonesTimeScale',_0x40e867=>{const _0x4a5700=_0x444eb4;if(!SceneManager[_0x4a5700(0x11f)]())return;if(!Imported[_0x4a5700(0x253)])return;VisuMZ[_0x4a5700(0x346)](_0x40e867,_0x40e867);const _0x4109e1=VisuMZ[_0x4a5700(0x830)](_0x40e867[_0x4a5700(0x865)]),_0x194de2=_0x40e867[_0x4a5700(0x4fa)];for(const _0x1f9c17 of _0x4109e1){if(!_0x1f9c17)continue;_0x1f9c17[_0x4a5700(0x7e1)]()[_0x4a5700(0x375)]=_0x194de2;}}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x64d),_0x15a259=>{const _0xa51484=_0x444eb4;if(!SceneManager[_0xa51484(0x11f)]())return;if(!Imported[_0xa51484(0x98a)])return;VisuMZ[_0xa51484(0x346)](_0x15a259,_0x15a259);const _0x4718f5=BattleManager['_action'],_0x756469=_0x15a259[_0xa51484(0x501)];if(!_0x4718f5)return;_0x4718f5[_0xa51484(0x477)]=_0x756469;}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x1bb),_0x5570fb=>{const _0x48f09e=_0x444eb4;if(!SceneManager[_0x48f09e(0x11f)]())return;if(!Imported[_0x48f09e(0x98a)])return;const _0x3c89bb=BattleManager[_0x48f09e(0x274)];if(!_0x3c89bb)return;_0x3c89bb['clearElementChanges']();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x8d6),_0xf53e53=>{const _0x29dcf8=_0x444eb4;if(!SceneManager[_0x29dcf8(0x11f)]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;VisuMZ[_0x29dcf8(0x346)](_0xf53e53,_0xf53e53);const _0x1a9ec1=BattleManager['_action'],_0x4497ba=_0xf53e53[_0x29dcf8(0x501)];if(!_0x1a9ec1)return;_0x1a9ec1[_0x29dcf8(0x440)]=_0x4497ba;}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Element_NullElements',_0x46c4d6=>{const _0x541447=_0x444eb4;if(!SceneManager[_0x541447(0x11f)]())return;if(!Imported[_0x541447(0x98a)])return;const _0x2d4de9=BattleManager['_action'];if(!_0x2d4de9)return;_0x2d4de9[_0x541447(0x205)]=!![];}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Horror_Clear',_0x810c76=>{const _0x4bb91a=_0x444eb4;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager[_0x4bb91a(0x11f)]())return;VisuMZ[_0x4bb91a(0x346)](_0x810c76,_0x810c76);const _0x10e7b=VisuMZ[_0x4bb91a(0x830)](_0x810c76[_0x4bb91a(0x865)]);for(const _0x2ae361 of _0x10e7b){if('LUHVP'!=='RgfhO'){if(!_0x2ae361)continue;_0x2ae361[_0x4bb91a(0x795)](_0x4bb91a(0x7ef)),_0x2ae361[_0x4bb91a(0x795)](_0x4bb91a(0x188)),_0x2ae361[_0x4bb91a(0x795)]('tv'),_0x2ae361[_0x4bb91a(0x934)]();}else{function _0x561fef(){const _0x3ec16f=_0x4bb91a;this['processBattleCoreJS'](_0x3ec16f(0x943)),_0x290e37[_0x3ec16f(0x60c)][_0x3ec16f(0x128)](),_0x878aa3[_0x3ec16f(0x25c)]['BattleManager_onEscapeSuccess'][_0x3ec16f(0x315)](this),this[_0x3ec16f(0x13c)](_0x3ec16f(0x489));}}}$gamePlayer[_0x4bb91a(0x119)]();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x465),_0x5eaf64=>{const _0x24df2a=_0x444eb4;if(!Imported[_0x24df2a(0x58b)])return;if(!SceneManager[_0x24df2a(0x11f)]())return;VisuMZ[_0x24df2a(0x346)](_0x5eaf64,_0x5eaf64);const _0x5601fc=VisuMZ['CreateActionSequenceTargets'](_0x5eaf64[_0x24df2a(0x865)]),_0x4e4547=_0x24df2a(0x188);_0x5eaf64['sliceMin']=Math[_0x24df2a(0x284)](_0x5eaf64['slices']/0x2),_0x5eaf64[_0x24df2a(0x57e)]=_0x5eaf64[_0x24df2a(0x1de)],_0x5eaf64[_0x24df2a(0x100)]=!![];for(const _0xc02856 of _0x5601fc){if(!_0xc02856)continue;_0xc02856[_0x24df2a(0x894)](_0x4e4547,_0x5eaf64);}$gamePlayer[_0x24df2a(0x119)]();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Horror_GlitchRemove',_0x2df590=>{const _0x55e221=_0x444eb4;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager[_0x55e221(0x11f)]())return;VisuMZ['ConvertParams'](_0x2df590,_0x2df590);const _0x5bdfc8=VisuMZ['CreateActionSequenceTargets'](_0x2df590[_0x55e221(0x865)]);for(const _0xfe1b7f of _0x5bdfc8){if(!_0xfe1b7f)continue;_0xfe1b7f[_0x55e221(0x795)](_0x55e221(0x188));}$gamePlayer[_0x55e221(0x119)]();}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x25a),_0x3da921=>{const _0x4849e1=_0x444eb4;if(!Imported[_0x4849e1(0x58b)])return;if(!SceneManager[_0x4849e1(0x11f)]())return;VisuMZ['ConvertParams'](_0x3da921,_0x3da921);const _0x4bfaf0=VisuMZ[_0x4849e1(0x830)](_0x3da921[_0x4849e1(0x865)]),_0x13b245=_0x4849e1(0x7ef);for(const _0x4ddd4b of _0x4bfaf0){if(_0x4849e1(0x1ea)!==_0x4849e1(0x1ea)){function _0x5a5c25(){return 0x0;}}else{if(!_0x4ddd4b)continue;_0x4ddd4b[_0x4849e1(0x894)](_0x13b245,_0x3da921);}}$gamePlayer[_0x4849e1(0x119)]();}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Horror_NoiseRemove',_0x3d1c91=>{const _0x5f2045=_0x444eb4;if(!Imported[_0x5f2045(0x58b)])return;if(!SceneManager[_0x5f2045(0x11f)]())return;VisuMZ[_0x5f2045(0x346)](_0x3d1c91,_0x3d1c91);const _0x12a6e7=VisuMZ[_0x5f2045(0x830)](_0x3d1c91[_0x5f2045(0x865)]);for(const _0x41fa3a of _0x12a6e7){if(_0x5f2045(0x42a)!==_0x5f2045(0x382)){if(!_0x41fa3a)continue;_0x41fa3a['removeHorrorEffect'](_0x5f2045(0x7ef));}else{function _0x5cea00(){const _0x4c01bc=_0x5f2045;this[_0x4c01bc(0x60f)](_0x4c01bc(0x249));}}}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x43d),_0x175416=>{const _0x1b36d2=_0x444eb4;if(!Imported[_0x1b36d2(0x58b)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x1b36d2(0x346)](_0x175416,_0x175416);const _0x336e3f=VisuMZ[_0x1b36d2(0x830)](_0x175416[_0x1b36d2(0x865)]),_0x225c40='tv';for(const _0x54ace2 of _0x336e3f){if(!_0x54ace2)continue;_0x54ace2[_0x1b36d2(0x894)](_0x225c40,_0x175416);}$gamePlayer[_0x1b36d2(0x119)]();}),PluginManager['registerCommand'](pluginData['name'],_0x444eb4(0x460),_0x199f17=>{const _0x3ffb82=_0x444eb4;if(!Imported[_0x3ffb82(0x58b)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3ffb82(0x346)](_0x199f17,_0x199f17);const _0x337d0d=VisuMZ[_0x3ffb82(0x830)](_0x199f17[_0x3ffb82(0x865)]);for(const _0x4687f9 of _0x337d0d){if(_0x3ffb82(0x287)!=='WYWLL'){if(!_0x4687f9)continue;_0x4687f9[_0x3ffb82(0x795)]('tv');}else{function _0x55862b(){const _0x522476=_0x3ffb82;this[_0x522476(0x2c8)]=new _0x2b8912(),this[_0x522476(0x2c8)][_0x522476(0x26c)]=[new _0x5a037f['filters'][(_0x522476(0x5ba))]()],this[_0x522476(0x2c8)]['filterArea']=new _0x3dc8b2(),this['_cursorArea']['move'](this[_0x522476(0x77f)],this[_0x522476(0x77f)]),this['addChild'](this[_0x522476(0x2c8)]);}}}$gamePlayer[_0x3ffb82(0x119)]();}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x72e),_0x1c6e8c=>{const _0x86a6c=_0x444eb4;if(!SceneManager[_0x86a6c(0x11f)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x574520=SceneManager[_0x86a6c(0x3a7)][_0x86a6c(0x60c)];if(!_0x574520)return;VisuMZ[_0x86a6c(0x346)](_0x1c6e8c,_0x1c6e8c);const _0x39ed2d=_0x1c6e8c[_0x86a6c(0x311)]||0x1,_0x53465c=_0x1c6e8c[_0x86a6c(0xfa)]||0x1,_0x9cf169=_0x1c6e8c['EasingType']||_0x86a6c(0x5b6);_0x574520[_0x86a6c(0x51b)](_0x39ed2d,_0x53465c,_0x9cf169);}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],'ActSeq_Impact_MotionBlurScreen',_0x6625c3=>{const _0xe5fa47=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0xe5fa47(0x43e)])return;const _0x3a8860=SceneManager['_scene']['_spriteset'];if(!_0x3a8860)return;VisuMZ['ConvertParams'](_0x6625c3,_0x6625c3);const _0x18b929=Number(_0x6625c3[_0xe5fa47(0x8d9)])||0x0,_0x51c060=Number(_0x6625c3[_0xe5fa47(0x654)]),_0x39c008=_0x6625c3[_0xe5fa47(0xfa)]||0x1,_0x4c17b5=_0x6625c3[_0xe5fa47(0x81b)]||_0xe5fa47(0x5b6);_0x3a8860[_0xe5fa47(0x80d)](_0x18b929,_0x51c060,_0x39c008,_0x4c17b5);}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x5db),_0x2cef75=>{const _0x5c9bfd=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x5c9bfd(0x43e)])return;const _0x37118a=SceneManager['_scene'][_0x5c9bfd(0x60c)];if(!_0x37118a)return;VisuMZ[_0x5c9bfd(0x346)](_0x2cef75,_0x2cef75);const _0x3d7c65=Number(_0x2cef75[_0x5c9bfd(0x8d9)])||0x0,_0x1436bf=Number(_0x2cef75[_0x5c9bfd(0x654)]),_0x430ac8=_0x2cef75[_0x5c9bfd(0xfa)]||0x1,_0x7cf424=_0x2cef75[_0x5c9bfd(0x81b)]||_0x5c9bfd(0x5b6),_0x101daf=VisuMZ[_0x5c9bfd(0x830)](_0x2cef75['Targets']);for(const _0x285d37 of _0x101daf){if(!_0x285d37)continue;if(!_0x285d37[_0x5c9bfd(0x7f2)]())continue;_0x285d37['battler']()[_0x5c9bfd(0x80d)](_0x3d7c65,_0x1436bf,_0x430ac8,_0x7cf424);}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x207),_0x125c01=>{const _0x1fcd9b=_0x444eb4;if(!SceneManager[_0x1fcd9b(0x11f)]())return;if(!Imported[_0x1fcd9b(0x43e)])return;VisuMZ['ConvertParams'](_0x125c01,_0x125c01);const _0x40d806={'delay':_0x125c01[_0x1fcd9b(0x52e)],'duration':_0x125c01['duration'],'hue':_0x125c01[_0x1fcd9b(0x4db)],'opacityStart':_0x125c01[_0x1fcd9b(0x635)],'tone':_0x125c01[_0x1fcd9b(0x958)],'visible':!![]},_0x296a62=VisuMZ[_0x1fcd9b(0x830)](_0x125c01[_0x1fcd9b(0x865)]);for(const _0x30d04f of _0x296a62){if('avlGn'!==_0x1fcd9b(0x720)){if(!_0x30d04f)continue;_0x30d04f['setBattlerMotionTrailData'](_0x40d806);}else{function _0x3cedfc(){const _0x3ee10b=_0x1fcd9b;_0x46347f[_0x3ee10b(0x25c)][_0x3ee10b(0x421)][_0x3ee10b(0x315)](this,_0x5640ab,_0x51d5aa),this[_0x3ee10b(0x790)]();}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Impact_MotionTrailRemove',_0x6e5c16=>{const _0x30897c=_0x444eb4;if(!SceneManager[_0x30897c(0x11f)]())return;if(!Imported[_0x30897c(0x43e)])return;VisuMZ[_0x30897c(0x346)](_0x6e5c16,_0x6e5c16);const _0x41b83b=VisuMZ[_0x30897c(0x830)](_0x6e5c16['Targets']);for(const _0x4d5fb2 of _0x41b83b){if(_0x30897c(0x6b8)===_0x30897c(0x942)){function _0x88c98b(){const _0x52cf8f=_0x30897c;this[_0x52cf8f(0x30b)]=0x0;}}else{if(!_0x4d5fb2)continue;_0x4d5fb2[_0x30897c(0x2b9)]();}}}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x7ce),_0x4e2b4b=>{const _0x4552f3=_0x444eb4;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x1f6c96=SceneManager[_0x4552f3(0x3a7)][_0x4552f3(0x60c)];if(!_0x1f6c96)return;VisuMZ[_0x4552f3(0x346)](_0x4e2b4b,_0x4e2b4b);const _0x547f67=_0x4e2b4b['X']||0x0,_0x5ec91d=_0x4e2b4b['Y']||0x0,_0xf35449=_0x4e2b4b['Amp']||0x0,_0x50a061=_0x4e2b4b['Wave']||0x0,_0x16b0f7=_0x4e2b4b[_0x4552f3(0xfa)]||0x1;_0x1f6c96[_0x4552f3(0x663)](_0x547f67,_0x5ec91d,_0xf35449,_0x50a061,_0x16b0f7);}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x97d),_0x51cf5d=>{const _0x46463d=_0x444eb4;if(!SceneManager[_0x46463d(0x11f)]())return;if(!Imported[_0x46463d(0x43e)])return;const _0x2b79fc=SceneManager[_0x46463d(0x3a7)][_0x46463d(0x60c)];if(!_0x2b79fc)return;VisuMZ['ConvertParams'](_0x51cf5d,_0x51cf5d);const _0x35c655=VisuMZ['CreateActionSequenceTargets'](_0x51cf5d[_0x46463d(0x865)]),_0x3c4de7=_0x51cf5d[_0x46463d(0x66d)],_0x277a82=_0x51cf5d[_0x46463d(0x2b0)]||0x0,_0x4ee6ef=_0x51cf5d[_0x46463d(0x209)]||0x0,_0x470a6d=_0x51cf5d[_0x46463d(0xfa)]||0x1;for(const _0x410e17 of _0x35c655){if(_0x46463d(0x8de)!=='JwXHi'){if(!_0x410e17)continue;if(!_0x410e17['battler']())continue;const _0x33efa6=_0x410e17[_0x46463d(0x7f2)]();let _0xff85b7=_0x33efa6[_0x46463d(0x7f8)],_0x11c8c7=_0x33efa6['_baseY'];_0xff85b7+=(Graphics[_0x46463d(0x592)]-Graphics['boxWidth'])/0x2,_0x11c8c7+=(Graphics[_0x46463d(0x773)]-Graphics[_0x46463d(0x6fd)])/0x2;if(_0x3c4de7[_0x46463d(0x7db)](/front/i)){if('dVgLb'!==_0x46463d(0x905)){function _0x1d06e0(){const _0x4b1095=_0x46463d;this[_0x4b1095(0x3c7)](...arguments);}}else _0xff85b7+=(_0x410e17[_0x46463d(0x5e6)]()?0x1:-0x1)*_0x33efa6['mainSpriteWidth']()/0x2;}else _0x3c4de7[_0x46463d(0x7db)](/back/i)&&(_0xff85b7+=(_0x410e17[_0x46463d(0x5e6)]()?-0x1:0x1)*_0x33efa6[_0x46463d(0x817)]()/0x2);if(_0x3c4de7[_0x46463d(0x7db)](/head/i))_0x11c8c7-=_0x33efa6[_0x46463d(0x48f)]();else _0x3c4de7['match'](/center/i)&&(_0x11c8c7-=_0x33efa6[_0x46463d(0x48f)]()/0x2);_0x2b79fc['setupShockwaveImpactFilter'](_0xff85b7,_0x11c8c7,_0x277a82,_0x4ee6ef,_0x470a6d);}else{function _0x55a4da(){const _0x26a933=_0x46463d;this[_0x26a933(0x7c4)][_0x26a933(0x8fc)]=_0x2acbbc['weatherType'](),this[_0x26a933(0x7c4)][_0x26a933(0x68e)]=_0x12f720['weatherPower']();}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x43f),_0x128024=>{const _0x4e6548=_0x444eb4;if(!SceneManager[_0x4e6548(0x11f)]())return;if(!Imported[_0x4e6548(0x43e)])return;const _0x56f9ef=SceneManager[_0x4e6548(0x3a7)][_0x4e6548(0x60c)];if(!_0x56f9ef)return;VisuMZ[_0x4e6548(0x346)](_0x128024,_0x128024);const _0x130f75=VisuMZ[_0x4e6548(0x830)](_0x128024[_0x4e6548(0x865)]),_0x268808=_0x128024['TargetLocation'],_0x2d284f=_0x128024['Amp']||0x0,_0x3f19ae=_0x128024[_0x4e6548(0x209)]||0x0,_0x26980a=_0x128024[_0x4e6548(0xfa)]||0x1,_0x226540=Math['min'](..._0x130f75[_0x4e6548(0x99d)](_0x21624b=>_0x21624b[_0x4e6548(0x7f2)]()['_baseX']-_0x21624b['battler']()[_0x4e6548(0x817)]()/0x2)),_0x50340e=Math['max'](..._0x130f75[_0x4e6548(0x99d)](_0xe65e8c=>_0xe65e8c[_0x4e6548(0x7f2)]()[_0x4e6548(0x7f8)]+_0xe65e8c[_0x4e6548(0x7f2)]()[_0x4e6548(0x817)]()/0x2)),_0x15d9a4=Math[_0x4e6548(0x827)](..._0x130f75[_0x4e6548(0x99d)](_0x460a4f=>_0x460a4f[_0x4e6548(0x7f2)]()['_baseY']-_0x460a4f[_0x4e6548(0x7f2)]()[_0x4e6548(0x48f)]())),_0xc4164e=Math[_0x4e6548(0x960)](..._0x130f75[_0x4e6548(0x99d)](_0x14beca=>_0x14beca[_0x4e6548(0x7f2)]()[_0x4e6548(0x29f)])),_0x1a6dac=_0x130f75[_0x4e6548(0x34b)](_0x110d21=>_0x110d21['isActor']())[_0x4e6548(0x34a)],_0x2ea89d=_0x130f75[_0x4e6548(0x34b)](_0x14ba81=>_0x14ba81[_0x4e6548(0x5e6)]())[_0x4e6548(0x34a)];let _0x2321fe=0x0,_0x57dcee=0x0;if(_0x268808[_0x4e6548(0x7db)](/front/i))_0x2321fe=_0x1a6dac>=_0x2ea89d?_0x226540:_0x50340e;else{if(_0x268808[_0x4e6548(0x7db)](/middle/i)){if(_0x4e6548(0x2b8)!==_0x4e6548(0x2b8)){function _0x292062(){const _0x4f618b=_0x4e6548;_0x184d26['prototype'][_0x4f618b(0x589)]['call'](this);}}else _0x2321fe=(_0x226540+_0x50340e)/0x2,melee=-0x1;}else _0x268808[_0x4e6548(0x7db)](/back/i)&&(_0x2321fe=_0x1a6dac>=_0x2ea89d?_0x50340e:_0x226540);}if(_0x268808[_0x4e6548(0x7db)](/head/i)){if(_0x4e6548(0x70e)!==_0x4e6548(0x564))_0x57dcee=_0x15d9a4;else{function _0x5344ce(){const _0x500b8e=_0x4e6548,_0xe76571=_0x4c0844(_0x474e05['$1'])[_0x500b8e(0x79d)](/[\r\n]+/)[_0x500b8e(0x580)]('');_0x5b86ee[_0x500b8e(0x2d2)]=_0x5aecfd['processRandomizedData'](_0xe76571);}}}else{if(_0x268808[_0x4e6548(0x7db)](/center/i)){if(_0x4e6548(0x803)!==_0x4e6548(0x803)){function _0x1f6262(){_0x2697c8-=_0x48d3f9[_0x4728f3];if(_0xdb2fd<=0x0)return _0x53dc44;}}else _0x57dcee=(_0x15d9a4+_0xc4164e)/0x2;}else _0x268808['match'](/base/i)&&(_0x57dcee=_0xc4164e);}_0x2321fe+=(Graphics[_0x4e6548(0x592)]-Graphics[_0x4e6548(0x6e8)])/0x2,_0x57dcee+=(Graphics[_0x4e6548(0x773)]-Graphics['boxHeight'])/0x2,_0x56f9ef[_0x4e6548(0x663)](_0x2321fe,_0x57dcee,_0x2d284f,_0x3f19ae,_0x26980a);}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x994),_0x2a5d37=>{const _0x4f1166=_0x444eb4;if(!Imported[_0x4f1166(0x43e)])return;const _0x1f00ad=SceneManager[_0x4f1166(0x3a7)][_0x4f1166(0x60c)];if(!_0x1f00ad)return;VisuMZ[_0x4f1166(0x346)](_0x2a5d37,_0x2a5d37);const _0x55a734=_0x2a5d37['X']||0x0,_0x4ca56b=_0x2a5d37['Y']||0x0,_0x1ede85=_0x2a5d37[_0x4f1166(0x695)]||0x0,_0x3f9956=_0x2a5d37['Radius']||0x0,_0x1d0a93=_0x2a5d37[_0x4f1166(0xfa)]||0x1,_0x5e6d64=_0x2a5d37[_0x4f1166(0x81b)]||_0x4f1166(0x5b6);_0x1f00ad[_0x4f1166(0x6f3)](_0x1ede85,_0x55a734,_0x4ca56b,_0x3f9956,_0x1d0a93,_0x5e6d64);}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x16d),_0x36e117=>{const _0x565315=_0x444eb4;if(!Imported[_0x565315(0x43e)])return;const _0x209a70=SceneManager[_0x565315(0x3a7)][_0x565315(0x60c)];if(!_0x209a70)return;VisuMZ[_0x565315(0x346)](_0x36e117,_0x36e117);const _0x3d4a1f=VisuMZ['CreateActionSequenceTargets'](_0x36e117[_0x565315(0x865)]),_0xc65bf3=_0x36e117['TargetLocation'],_0x4fd7f4=_0x36e117[_0x565315(0x695)]||0x0,_0x44d981=_0x36e117[_0x565315(0x72c)]||0x0,_0x39e070=_0x36e117[_0x565315(0xfa)]||0x1,_0x1211f6=_0x36e117[_0x565315(0x81b)]||_0x565315(0x5b6),_0x458ee7=Math['min'](..._0x3d4a1f['map'](_0x45fe01=>_0x45fe01[_0x565315(0x7f2)]()['_baseX']-_0x45fe01[_0x565315(0x7f2)]()['mainSpriteWidth']()/0x2)),_0x50b537=Math['max'](..._0x3d4a1f[_0x565315(0x99d)](_0x402cb5=>_0x402cb5[_0x565315(0x7f2)]()['_baseX']+_0x402cb5['battler']()['mainSpriteWidth']()/0x2)),_0x297882=Math[_0x565315(0x827)](..._0x3d4a1f[_0x565315(0x99d)](_0x3c70fb=>_0x3c70fb['battler']()[_0x565315(0x29f)]-_0x3c70fb['battler']()['mainSpriteHeight']())),_0x4efd18=Math[_0x565315(0x960)](..._0x3d4a1f['map'](_0x2e2af7=>_0x2e2af7[_0x565315(0x7f2)]()[_0x565315(0x29f)])),_0x38dbfe=_0x3d4a1f[_0x565315(0x34b)](_0x5917d2=>_0x5917d2[_0x565315(0x73d)]())[_0x565315(0x34a)],_0x29e7b1=_0x3d4a1f[_0x565315(0x34b)](_0x1341c0=>_0x1341c0[_0x565315(0x5e6)]())['length'];let _0x5296b9=0x0,_0x53fcce=0x0;if(_0xc65bf3[_0x565315(0x7db)](/front/i))_0x5296b9=_0x38dbfe>=_0x29e7b1?_0x458ee7:_0x50b537;else{if(_0xc65bf3['match'](/middle/i))_0x5296b9=(_0x458ee7+_0x50b537)/0x2,melee=-0x1;else _0xc65bf3[_0x565315(0x7db)](/back/i)&&(_0x5296b9=_0x38dbfe>=_0x29e7b1?_0x50b537:_0x458ee7);}if(_0xc65bf3[_0x565315(0x7db)](/head/i))_0x53fcce=_0x297882;else{if(_0xc65bf3[_0x565315(0x7db)](/center/i)){if(_0x565315(0x87d)===_0x565315(0x634)){function _0x5a28ac(){const _0x383b73=_0x565315;this['_skillWindow'][_0x383b73(0x418)](),this['_itemWindow'][_0x383b73(0x418)]();}}else _0x53fcce=(_0x297882+_0x4efd18)/0x2;}else{if(_0xc65bf3['match'](/base/i)){if(_0x565315(0x72f)!==_0x565315(0x5c0))_0x53fcce=_0x4efd18;else{function _0x7ad3e0(){const _0x1a6c7f=_0x565315;this['createEnemyNameContainer'](),_0x9d4f33['BattleCore'][_0x1a6c7f(0x8a7)][_0x1a6c7f(0x315)](this),this[_0x1a6c7f(0x858)]();}}}}}_0x5296b9+=(Graphics[_0x565315(0x592)]-Graphics[_0x565315(0x6e8)])/0x2,_0x53fcce+=(Graphics['height']-Graphics[_0x565315(0x6fd)])/0x2,_0x209a70['setupZoomBlurImpactFilter'](_0x4fd7f4,_0x5296b9,_0x53fcce,_0x44d981,_0x39e070,_0x1211f6);}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x197),_0x15d384=>{const _0x2b31f2=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x15d384,_0x15d384);const _0x558c3b=$gameTemp['getLastPluginCommandInterpreter'](),_0x16202e=BattleManager['_action'],_0x2a580f=BattleManager[_0x2b31f2(0xda)],_0x1a7971=BattleManager[_0x2b31f2(0x1e1)];if(!_0x558c3b||!_0x16202e||!_0x2a580f)return;if(!_0x16202e[_0x2b31f2(0x712)]())return;const _0x3b340b=VisuMZ['CreateActionSequenceTargets'](_0x15d384[_0x2b31f2(0x865)]);for(const _0x10ccc0 of _0x3b340b){if('rYRwa'==='pUrRs'){function _0x442baa(){const _0x5e8a82=_0x2b31f2;return!_0x2a295e[_0x5e8a82(0x73c)]()&&this[_0x5e8a82(0x701)]&&this['_battler']['isActor']();}}else{if(!_0x10ccc0)continue;_0x1a7971[_0x2b31f2(0x12b)]('actionEffect',_0x2a580f,_0x10ccc0);}}_0x558c3b[_0x2b31f2(0x306)](_0x2b31f2(0xf4));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x696),_0x41a045=>{const _0x47a093=_0x444eb4;if(!SceneManager[_0x47a093(0x11f)]())return;VisuMZ[_0x47a093(0x346)](_0x41a045,_0x41a045);const _0x7fc731=['MAXHP',_0x47a093(0x1fb),_0x47a093(0x11e),'DEF','MAT',_0x47a093(0x495),_0x47a093(0x321),_0x47a093(0x23b)],_0x3eed7b=_0x41a045[_0x47a093(0x648)],_0x5f0b8f=_0x41a045[_0x47a093(0x67a)],_0x41e8d9=_0x41a045[_0x47a093(0x1f6)],_0x13c19d=VisuMZ[_0x47a093(0x830)](_0x41a045['Targets']);for(const _0x1b44bf of _0x13c19d){if(_0x47a093(0x32e)!=='BUcyu'){function _0x1bc5c8(){const _0x575c25=_0x47a093;return _0x86d3ff[_0x575c25(0x25c)][_0x575c25(0x90c)][_0x575c25(0x75c)][_0x575c25(0x75a)];}}else{if(!_0x1b44bf)continue;for(const _0x4ca734 of _0x3eed7b){const _0x1b3137=_0x7fc731[_0x47a093(0x221)](_0x4ca734[_0x47a093(0x8c0)]()[_0x47a093(0x3af)]());if(_0x1b3137>=0x0&&_0x1b3137<=0x7){if(_0x47a093(0x49c)!==_0x47a093(0x1e4))_0x1b44bf[_0x47a093(0x5a6)](_0x1b3137,_0x41e8d9);else{function _0x14fce9(){const _0x1078a4=_0x47a093;this[_0x1078a4(0x12b)](_0x1078a4(0x86e),this[_0x1078a4(0x4cf)](_0x543c76));}}}}for(const _0x3ab037 of _0x5f0b8f){const _0x26623c=_0x7fc731[_0x47a093(0x221)](_0x3ab037[_0x47a093(0x8c0)]()[_0x47a093(0x3af)]());if(_0x26623c>=0x0&&_0x26623c<=0x7){if('YfIRh'==='YfIRh')_0x1b44bf[_0x47a093(0x50e)](_0x26623c,_0x41e8d9);else{function _0x29483c(){const _0x5c13c9=_0x47a093;_0x438556[_0x5c13c9(0x268)][_0x5c13c9(0x83d)][_0x5c13c9(0x315)](this);const _0x2fe1d8=this[_0x5c13c9(0xac)]();_0x2fe1d8===_0x5c13c9(0x27c)&&this['showHelpWindow']();}}}}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x316),_0x3f7661=>{const _0x51f06e=_0x444eb4;if(!SceneManager[_0x51f06e(0x11f)]())return;VisuMZ[_0x51f06e(0x346)](_0x3f7661,_0x3f7661);const _0x33451e=_0x3f7661['States'],_0x21030c=VisuMZ[_0x51f06e(0x830)](_0x3f7661['Targets']);for(const _0x36627b of _0x21030c){if(_0x51f06e(0x3ce)!==_0x51f06e(0x3ce)){function _0x534f31(){const _0x3cbbe6=_0x51f06e;if(_0x4ccd99[_0x3cbbe6(0x48a)]!==_0x4b20fa)return _0x559c70[_0x3cbbe6(0x48a)];if(this[_0x3cbbe6(0x126)])return this[_0x3cbbe6(0x126)];return this['_battleLayoutStyle']=_0x255435[_0x3cbbe6(0x25c)][_0x3cbbe6(0x90c)][_0x3cbbe6(0x75c)][_0x3cbbe6(0x236)]['toLowerCase']()[_0x3cbbe6(0x3af)](),this['_battleLayoutStyle'];}}else{if(!_0x36627b)continue;for(const _0x194ac0 of _0x33451e){_0x36627b['addState'](_0x194ac0);}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x3d8),_0x540b16=>{const _0x551b97=_0x444eb4;if(!SceneManager[_0x551b97(0x11f)]())return;VisuMZ[_0x551b97(0x346)](_0x540b16,_0x540b16);const _0x330dae=BattleManager['_action'],_0x5b247a={'arPenRate':_0x540b16[_0x551b97(0x2d4)],'arPenFlat':_0x540b16[_0x551b97(0x92e)],'arRedRate':_0x540b16[_0x551b97(0x22b)],'arRedFlat':_0x540b16['ArRedFlat']};_0x330dae['_armorPenetration']=_0x5b247a;}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Mechanics_AtbGauge',_0x50e1e8=>{const _0x9b1510=_0x444eb4;if(!SceneManager[_0x9b1510(0x11f)]())return;if(!Imported[_0x9b1510(0x1ca)])return;VisuMZ[_0x9b1510(0x346)](_0x50e1e8,_0x50e1e8);const _0x41c04b=VisuMZ[_0x9b1510(0x830)](_0x50e1e8[_0x9b1510(0x865)]),_0x3b3d98=_0x50e1e8[_0x9b1510(0x125)],_0x5009eb=_0x50e1e8['ChargeRate'],_0xd2d75a=_0x50e1e8[_0x9b1510(0x160)];for(const _0x4f7a96 of _0x41c04b){if(_0x9b1510(0x732)!=='jKdYp'){if(!_0x4f7a96)continue;if(_0x4f7a96['isAtbChargingState']()){if(_0x9b1510(0x4cd)!==_0x9b1510(0x4cd)){function _0x5deaca(){const _0x523420=_0x9b1510;if(!_0x14c16c[_0x523420(0x73c)]())return;if(this[_0x523420(0x139)])return;this[_0x523420(0x139)]=!![];const _0x9f63ed=this['battler']();if(_0x9f63ed)_0x9f63ed[_0x523420(0x539)]();}}else _0x4f7a96[_0x9b1510(0x863)](_0x3b3d98);}else{if(_0x4f7a96[_0x9b1510(0x690)]()){if(_0x9b1510(0x190)==='nKGOD'){function _0x3058a3(){const _0xdcc1a6=_0x9b1510;_0x3d0779[_0xdcc1a6(0x8fa)]=new _0xef316f(this['width'],this[_0xdcc1a6(0x773)]);}}else{_0x4f7a96[_0x9b1510(0x37b)](_0x5009eb);if(_0xd2d75a)_0x4f7a96[_0x9b1510(0x34c)]();}}}}else{function _0x51f2bc(){const _0x5aadbd=_0x9b1510;if(this[_0x5aadbd(0x59e)]())_0x4ecd84['BattleCore'][_0x5aadbd(0xbf)]['call'](this);}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x612),_0x55b884=>{const _0x56d026=_0x444eb4;if(!SceneManager[_0x56d026(0x11f)]())return;VisuMZ['ConvertParams'](_0x55b884,_0x55b884);const _0x1621c3=$gameTemp[_0x56d026(0x283)](),_0x6c95ed=BattleManager['_action'],_0x385201=BattleManager[_0x56d026(0xda)];if(!_0x1621c3||!_0x6c95ed||!_0x385201)return;if(!_0x6c95ed[_0x56d026(0x712)]())return;const _0x363469=VisuMZ[_0x56d026(0x830)](_0x55b884[_0x56d026(0x865)]);for(const _0x125675 of _0x363469){if(!_0x125675)continue;_0x55b884[_0x56d026(0x5c9)]&&(_0x125675[_0x56d026(0x52f)](),_0x125675[_0x56d026(0x3cf)](_0x125675[_0x56d026(0x89e)]()));if(_0x125675['isDeathStateAffected']()){if('YeGxH'!=='KafWX')_0x125675[_0x56d026(0x39e)]();else{function _0x3563a1(){const _0xd24002=_0x56d026,_0x389f59=_0x555efb[_0x930fcb];if(_0x389f59)_0x5012d3['push'](_0x5350ca[_0xd24002(0x1f1)](_0x389f59));}}}}_0x1621c3[_0x56d026(0x306)](_0x56d026(0xf7));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x178),_0x32d453=>{const _0x5980d3=_0x444eb4;if(!SceneManager[_0x5980d3(0x11f)]())return;if(!Imported[_0x5980d3(0x8d0)])return;VisuMZ[_0x5980d3(0x346)](_0x32d453,_0x32d453);const _0x3d8213=VisuMZ['CreateActionSequenceTargets'](_0x32d453['Targets']),_0xc08457=_0x32d453['ChangeOrderBy'];for(const _0x53ebb9 of _0x3d8213){if(_0x5980d3(0x4ea)===_0x5980d3(0x965)){function _0x24c986(){const _0x3b1fee=_0x5980d3;this[_0x3b1fee(0x526)]();}}else{if(!_0x53ebb9)continue;_0x53ebb9[_0x5980d3(0xf5)](_0xc08457);}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x1f7),_0x5477f9=>{const _0x5db061=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_2_BattleSystemCTB'])return;VisuMZ[_0x5db061(0x346)](_0x5477f9,_0x5477f9);const _0x3e6510=VisuMZ['CreateActionSequenceTargets'](_0x5477f9[_0x5db061(0x865)]),_0x568a71=_0x5477f9[_0x5db061(0x125)],_0x17e336=_0x5477f9[_0x5db061(0x125)];for(const _0x2f5bae of _0x3e6510){if(!_0x2f5bae)continue;if(_0x2f5bae[_0x5db061(0x806)]===_0x5db061(0x962))_0x2f5bae[_0x5db061(0x65b)](_0x568a71);else _0x2f5bae[_0x5db061(0x806)]===_0x5db061(0x1e0)&&_0x2f5bae[_0x5db061(0x457)](_0x17e336);}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x387),_0x327e2d=>{const _0xfd7ff5=_0x444eb4;if(!SceneManager[_0xfd7ff5(0x11f)]())return;VisuMZ[_0xfd7ff5(0x346)](_0x327e2d,_0x327e2d);const _0x592c48=BattleManager[_0xfd7ff5(0x274)];if(!_0x592c48)return;let _0x4517a5=_0x327e2d[_0xfd7ff5(0x1d2)];_0x592c48[_0xfd7ff5(0x35b)](_0x4517a5);}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x350),_0x1c842a=>{const _0xb6ac60=_0x444eb4;if(!SceneManager[_0xb6ac60(0x11f)]())return;VisuMZ[_0xb6ac60(0x346)](_0x1c842a,_0x1c842a);const _0x2c8b23=VisuMZ[_0xb6ac60(0x830)](_0x1c842a['Targets']);for(const _0x196c2a of _0x2c8b23){if(!_0x196c2a)continue;if(_0x196c2a[_0xb6ac60(0x3e6)]())_0x196c2a[_0xb6ac60(0x5bd)]();}}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x5e8),_0x5ad876=>{const _0x4cdfde=_0x444eb4;if(!SceneManager[_0x4cdfde(0x11f)]())return;VisuMZ['ConvertParams'](_0x5ad876,_0x5ad876);const _0x36408a=$gameTemp['getLastPluginCommandInterpreter'](),_0x162461=BattleManager['_subject'],_0x427cb7=_0x5ad876[_0x4cdfde(0x653)];if(!_0x36408a)return;if(!_0x162461)return;if(_0x162461&&_0x162461['isDead']()&&_0x427cb7[_0x4cdfde(0x8c0)]()[_0x4cdfde(0x3af)]()!==_0x4cdfde(0x3ca)){if(_0x4cdfde(0x5f7)!=='kNdwr')_0x36408a[_0x4cdfde(0x87b)]([_0x427cb7]);else{function _0xcb1b18(){const _0x8b854e=_0x4cdfde;return this[_0x8b854e(0x12f)]()&&this[_0x8b854e(0x12f)]()[_0x8b854e(0x712)]()&&this[_0x8b854e(0x12f)]()[_0x8b854e(0x124)]();}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x4a8),_0x239918=>{const _0x3fcaf3=_0x444eb4;if(!SceneManager[_0x3fcaf3(0x11f)]())return;VisuMZ[_0x3fcaf3(0x346)](_0x239918,_0x239918);const _0x1831f9=VisuMZ[_0x3fcaf3(0x830)](_0x239918[_0x3fcaf3(0x865)]),_0x3650a9=_0x239918['HP_Rate'],_0x545ac5=_0x239918[_0x3fcaf3(0x8ed)],_0xa0bfb2=_0x239918[_0x3fcaf3(0x151)],_0x34f896=_0x239918[_0x3fcaf3(0x42c)],_0x27138a=_0x239918[_0x3fcaf3(0x1eb)],_0x2bd00e=_0x239918[_0x3fcaf3(0x65f)],_0x57cc0e=_0x239918[_0x3fcaf3(0x201)];for(const _0x50014a of _0x1831f9){if(!_0x50014a)continue;const _0x3f0fdd=_0x50014a['isAlive'](),_0xd132cb=Math['round'](_0x3650a9*_0x50014a['mhp']+_0x545ac5),_0x5733d2=Math[_0x3fcaf3(0x29d)](_0xa0bfb2*_0x50014a[_0x3fcaf3(0x59c)]+_0x34f896),_0x553ecc=Math['round'](_0x27138a*_0x50014a['maxTp']()+_0x2bd00e);if(_0xd132cb!==0x0)_0x50014a['gainHp'](_0xd132cb);if(_0x5733d2!==0x0)_0x50014a[_0x3fcaf3(0x222)](_0x5733d2);if(_0x553ecc!==0x0)_0x50014a[_0x3fcaf3(0x7cc)](_0x553ecc);if(_0x57cc0e)_0x50014a['startDamagePopup']();_0x3f0fdd&&_0x50014a[_0x3fcaf3(0xc9)]()&&_0x50014a[_0x3fcaf3(0x39e)]();}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x892),_0x562696=>{const _0x1d4954=_0x444eb4;if(!SceneManager[_0x1d4954(0x11f)]())return;VisuMZ[_0x1d4954(0x346)](_0x562696,_0x562696);const _0x5d25e9=VisuMZ[_0x1d4954(0x830)](_0x562696[_0x1d4954(0x865)]);for(const _0x13308f of _0x5d25e9){if(!_0x13308f)continue;_0x13308f[_0x1d4954(0x652)](_0x562696[_0x1d4954(0x6df)]);}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x4dc),_0x534e44=>{const _0x18fbaf=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x18fbaf(0x346)](_0x534e44,_0x534e44);const _0x2769d9=BattleManager['_action'],_0x208e34={'criticalHitRate':_0x534e44[_0x18fbaf(0x7a9)],'criticalHitFlat':_0x534e44[_0x18fbaf(0x110)],'criticalDmgRate':_0x534e44[_0x18fbaf(0x97c)],'criticalDmgFlat':_0x534e44[_0x18fbaf(0x2dd)],'damageRate':_0x534e44[_0x18fbaf(0x852)],'damageFlat':_0x534e44[_0x18fbaf(0x458)],'hitRate':_0x534e44[_0x18fbaf(0x94e)],'hitFlat':_0x534e44[_0x18fbaf(0x147)]};_0x2769d9[_0x18fbaf(0x15d)]=_0x208e34;}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x8e1),_0x39827c=>{const _0x148d73=_0x444eb4;if(!SceneManager[_0x148d73(0x11f)]())return;VisuMZ[_0x148d73(0x346)](_0x39827c,_0x39827c);const _0x3a26f2=[_0x148d73(0x8ac),_0x148d73(0x1fb),_0x148d73(0x11e),_0x148d73(0x6af),_0x148d73(0x4fd),_0x148d73(0x495),_0x148d73(0x321),_0x148d73(0x23b)],_0x4cf7b9=_0x39827c[_0x148d73(0x648)],_0x466d91=_0x39827c['Debuffs'],_0xcea0c3=VisuMZ[_0x148d73(0x830)](_0x39827c[_0x148d73(0x865)]);for(const _0x2880bc of _0xcea0c3){if('LutTH'!==_0x148d73(0x5be)){if(!_0x2880bc)continue;for(const _0x5d45c5 of _0x4cf7b9){const _0x3899be=_0x3a26f2[_0x148d73(0x221)](_0x5d45c5[_0x148d73(0x8c0)]()[_0x148d73(0x3af)]());_0x3899be>=0x0&&_0x3899be<=0x7&&_0x2880bc[_0x148d73(0xfb)](_0x3899be)&&_0x2880bc[_0x148d73(0x878)](_0x3899be);}for(const _0x1f56f0 of _0x466d91){if('vCYVg'!==_0x148d73(0xf2)){const _0x9811b3=_0x3a26f2[_0x148d73(0x221)](_0x1f56f0['toUpperCase']()[_0x148d73(0x3af)]());if(_0x9811b3>=0x0&&_0x9811b3<=0x7&&_0x2880bc['isDebuffAffected'](_0x9811b3)){if(_0x148d73(0x242)==='unBbi'){function _0x158c2c(){const _0x19e5ca=_0x148d73;if(!_0x591000[_0x19e5ca(0x11f)]())return;if(!_0x4c777b[_0x19e5ca(0x213)])return;_0x16973c['ConvertParams'](_0x3ac4cd,_0x69991f);const _0x5bce01=_0x1fa8e7[_0x19e5ca(0x283)](),_0x39b22a=_0x5eed4c[_0x19e5ca(0x830)](_0x2bc56e[_0x19e5ca(0x865)]),_0x4eec59=_0x125666[_0x19e5ca(0x1d0)];_0x4a2882[_0x19e5ca(0x82c)](_0x39b22a,_0x1a5bee[_0x19e5ca(0xfa)],_0x3d13af[_0x19e5ca(0x81b)]);if(_0x4eec59)_0x5bce01[_0x19e5ca(0x306)](_0x19e5ca(0x94f));}}else _0x2880bc[_0x148d73(0x878)](_0x9811b3);}}else{function _0x4f74df(){return 0x0;}}}}else{function _0x5da149(){const _0x4b22d6=_0x148d73;return _0x432e28[_0x4b22d6(0x11f)]()?_0x4d8379[_0x4b22d6(0x3a7)][_0x4b22d6(0x60c)][_0x4b22d6(0x6cb)]:this[_0x4b22d6(0x921)];}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Mechanics_RemoveState',_0x1f0e5c=>{const _0x312ce5=_0x444eb4;if(!SceneManager[_0x312ce5(0x11f)]())return;VisuMZ[_0x312ce5(0x346)](_0x1f0e5c,_0x1f0e5c);const _0x47b6c3=_0x1f0e5c[_0x312ce5(0x746)],_0x4dc144=VisuMZ[_0x312ce5(0x830)](_0x1f0e5c[_0x312ce5(0x865)]);for(const _0x59aa0d of _0x4dc144){if(!_0x59aa0d)continue;for(const _0x3c1862 of _0x47b6c3){_0x59aa0d[_0x312ce5(0x8a6)](_0x3c1862);}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x414),_0x214f4a=>{const _0x57b990=_0x444eb4;if(!SceneManager[_0x57b990(0x11f)]())return;if(!Imported[_0x57b990(0x10c)])return;VisuMZ[_0x57b990(0x346)](_0x214f4a,_0x214f4a);const _0x16f648=_0x214f4a['Exploited'],_0x4a541e=VisuMZ[_0x57b990(0x830)](_0x214f4a[_0x57b990(0x865)]),_0x22bea3=_0x214f4a[_0x57b990(0x6a7)],_0x3afd17=_0x214f4a[_0x57b990(0x864)],_0x5b7938=_0x214f4a[_0x57b990(0x2ff)],_0x3a7784=BattleManager[_0x57b990(0x274)];if(_0x16f648)for(const _0x36658b of _0x4a541e){if(!_0x36658b)continue;if(_0x36658b===user)continue;if(_0x22bea3)_0x36658b['setSTBExploited'](![]);_0x36658b[_0x57b990(0x2af)](BattleManager[_0x57b990(0xda)],_0x3a7784);}if(_0x3afd17&&BattleManager[_0x57b990(0xda)]){if(_0x5b7938)BattleManager[_0x57b990(0xda)][_0x57b990(0x42f)](![]);const _0x30df27=_0x4a541e[0x0];BattleManager['performSTBExploiter'](_0x30df27,_0x3a7784);}}),PluginManager['registerCommand'](pluginData['name'],_0x444eb4(0x1ed),_0x2f3f1c=>{const _0x58333b=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x58333b(0x10c)])return;VisuMZ[_0x58333b(0x346)](_0x2f3f1c,_0x2f3f1c);const _0x263649=_0x2f3f1c[_0x58333b(0x491)];if(BattleManager[_0x58333b(0xda)]){if(_0x58333b(0x784)==='eamCv')BattleManager['_subject'][_0x58333b(0x87a)](_0x263649);else{function _0x555fc5(){const _0x59a9e0=_0x58333b,_0x1975c8=_0x112f19[_0x59a9e0(0x592)],_0x26c8de=_0x541a8d['round']((_0x4efb0f[_0x59a9e0(0x6e8)]-_0x1975c8)/0x2),_0x4d71c5=this[_0x59a9e0(0x389)](0x4,!![]),_0x104179=_0x232c51[_0x59a9e0(0x6fd)]-_0x4d71c5+(_0x11c97a[_0x59a9e0(0x773)]-_0xab309c[_0x59a9e0(0x6fd)])/0x2;return new _0x49e9dd(_0x26c8de,_0x104179,_0x1975c8,_0x4d71c5);}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Mechanics_StbRemoveExcessActions',_0x2c3d2c=>{const _0x13ec4d=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x13ec4d(0x10c)])return;VisuMZ[_0x13ec4d(0x346)](_0x2c3d2c,_0x2c3d2c);let _0x2a5a2c=_0x2c3d2c['Actions'];if(BattleManager[_0x13ec4d(0xda)]){BattleManager[_0x13ec4d(0xda)][_0x13ec4d(0x5c4)]=BattleManager[_0x13ec4d(0xda)][_0x13ec4d(0x5c4)]||[];while(_0x2a5a2c--){if(BattleManager['_subject'][_0x13ec4d(0x5c4)][_0x13ec4d(0x34a)]<=0x0)break;BattleManager[_0x13ec4d(0xda)][_0x13ec4d(0x5c4)]['shift']();}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Mechanics_TextPopup',_0x1e047a=>{const _0x537e35=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x537e35(0x346)](_0x1e047a,_0x1e047a);const _0x3f3d75=VisuMZ['CreateActionSequenceTargets'](_0x1e047a[_0x537e35(0x865)]),_0x424ab7=_0x1e047a['Text'],_0x5d8000={'textColor':ColorManager[_0x537e35(0x95f)](_0x1e047a[_0x537e35(0x7da)]),'flashColor':_0x1e047a[_0x537e35(0x769)],'flashDuration':_0x1e047a['FlashDuration']};for(const _0x30cf08 of _0x3f3d75){if(_0x537e35(0x820)===_0x537e35(0x820)){if(!_0x30cf08)continue;_0x30cf08[_0x537e35(0x472)](_0x424ab7,_0x5d8000);}else{function _0x1950ce(){const _0x34e947=_0x537e35;this[_0x34e947(0x427)]=new _0x38da49(),this[_0x34e947(0x427)]['anchor']['x']=0.5,this[_0x34e947(0x427)][_0x34e947(0x72a)]['y']=0x1,this[_0x34e947(0x86a)](this['_mainSprite']),this['attachSpritesToDistortionSprite']();}}}}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x7be),_0x27316b=>{const _0x29f4f2=_0x444eb4;if(!SceneManager[_0x29f4f2(0x11f)]())return;VisuMZ[_0x29f4f2(0x346)](_0x27316b,_0x27316b);const _0x3f22ca=VisuMZ['CreateActionSequenceTargets'](_0x27316b[_0x29f4f2(0x865)]);let _0x159426=$gameVariables[_0x29f4f2(0x573)](_0x27316b[_0x29f4f2(0x2d6)]);Imported[_0x29f4f2(0x305)]&&_0x27316b[_0x29f4f2(0x267)]&&(_0x159426=VisuMZ[_0x29f4f2(0x50d)](_0x159426));const _0x2264f2=String(_0x159426),_0x1caea1={'textColor':ColorManager['getColor'](_0x27316b[_0x29f4f2(0x7da)]),'flashColor':_0x27316b[_0x29f4f2(0x769)],'flashDuration':_0x27316b['FlashDuration']};for(const _0x389bb5 of _0x3f22ca){if(_0x29f4f2(0x805)!==_0x29f4f2(0x506)){if(!_0x389bb5)continue;_0x389bb5[_0x29f4f2(0x472)](_0x2264f2,_0x1caea1);}else{function _0x85a81d(){const _0x693a2f=_0x29f4f2;return _0x2638a3[_0x693a2f(0x25c)][_0x693a2f(0x90c)]['AutoBattle'][_0x693a2f(0x4bf)];}}}}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x8f2),_0x3a4bc6=>{const _0x5d0ca6=_0x444eb4;if(!SceneManager[_0x5d0ca6(0x11f)]())return;const _0x38b535=$gameTemp[_0x5d0ca6(0x283)]();if(!_0x38b535)return;_0x38b535[_0x5d0ca6(0x306)](_0x5d0ca6(0xf7));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x136),_0x2fc359=>{const _0x2b578e=_0x444eb4;if(!SceneManager[_0x2b578e(0x11f)]())return;VisuMZ[_0x2b578e(0x346)](_0x2fc359,_0x2fc359);const _0x36ec61=VisuMZ[_0x2b578e(0x830)](_0x2fc359['Targets']);for(const _0xc2195 of _0x36ec61){if('qQSZk'==='NjWTS'){function _0x3db0a2(){const _0x2445bf=_0x2b578e;if(_0x17bdde[_0x2445bf(0x7db)](/(.*):[ ](\d+)/i)){const _0x1b23ce=_0x5abed9(_0x1aedfc['$1'])['trim'](),_0x1f3b32=_0x3d6a2f(_0x433923['$2']);_0xf25627[_0x1b23ce]=_0x1f3b32,_0x43c462+=_0x1f3b32;}else{if(_0x13b70d['match'](/(.*):[ ](\d+\.?\d+)/i)){const _0x244c19=_0x44662d(_0x34697f['$1'])[_0x2445bf(0x3af)](),_0x2eeb77=_0x38a4c5(_0x28740b['$2']);_0x20e2cb[_0x244c19]=_0x2eeb77,_0x2130fa+=_0x2eeb77;}else _0x17e404!==''&&(_0x47f484[_0x4425c2]=0x1,_0x2677bb++);}}}else{if(!_0xc2195)continue;_0xc2195[_0x2b578e(0x36d)]();}}}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x18a),_0x1f34e9=>{const _0x44eb76=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x44eb76(0x346)](_0x1f34e9,_0x1f34e9);const _0x54aad2=VisuMZ[_0x44eb76(0x830)](_0x1f34e9[_0x44eb76(0x865)]),_0x34b427=_0x1f34e9[_0x44eb76(0x88d)]['toLowerCase']()[_0x44eb76(0x3af)](),_0x2910d0=_0x1f34e9[_0x44eb76(0x659)],_0x15068d=_0x1f34e9['Frame'];for(const _0x12379a of _0x54aad2){if(!_0x12379a)continue;_0x12379a['freezeMotion'](_0x34b427,_0x2910d0,_0x15068d);}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x729),_0x598ca8=>{const _0x596ee3=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x596ee3(0x346)](_0x598ca8,_0x598ca8);const _0x4bb3d7=VisuMZ[_0x596ee3(0x830)](_0x598ca8[_0x596ee3(0x865)]),_0x25bcd6=_0x598ca8[_0x596ee3(0x88d)][_0x596ee3(0x3d1)]()[_0x596ee3(0x3af)](),_0x5a326f=_0x598ca8[_0x596ee3(0x659)];for(const _0xfe90ea of _0x4bb3d7){if(!_0xfe90ea)continue;_0x25bcd6==='attack'?_0xfe90ea['performAttack']():_0xfe90ea[_0x596ee3(0x6d9)](_0x25bcd6);if(!_0x5a326f){if(_0x596ee3(0x4b5)==='mebOB'){function _0x142f72(){const _0x51c60c=_0x596ee3;if(_0x130f10[_0x51c60c(0x701)]&&_0x2ca7cd[_0x51c60c(0x701)]){if(_0x36cc2a[_0x51c60c(0x701)][_0x51c60c(0x73d)]()&&_0x49bbaa['_battler'][_0x51c60c(0x5e6)]())return 0x1;else{if(_0x1d2de9[_0x51c60c(0x701)][_0x51c60c(0x73d)]()&&_0x189ce1['_battler'][_0x51c60c(0x5e6)]())return-0x1;}}}}else _0xfe90ea[_0x596ee3(0x2cb)](0x0);}else{if(_0x5a326f&&['thrust',_0x596ee3(0x436),_0x596ee3(0x779)]['includes'](_0x25bcd6)){}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x8d7),_0x23f5a0=>{const _0x43c278=_0x444eb4;if(!SceneManager[_0x43c278(0x11f)]())return;VisuMZ['ConvertParams'](_0x23f5a0,_0x23f5a0);const _0x21233b=BattleManager[_0x43c278(0x274)];if(!_0x21233b)return;if(!_0x21233b[_0x43c278(0x712)]())return;const _0x33ffc1=VisuMZ[_0x43c278(0x830)](_0x23f5a0[_0x43c278(0x865)]);for(const _0x48fcfc of _0x33ffc1){if(_0x43c278(0x893)===_0x43c278(0x893)){if(!_0x48fcfc)continue;_0x48fcfc[_0x43c278(0x298)](_0x21233b);}else{function _0x98937b(){const _0x157a86=_0x43c278;this[_0x157a86(0x790)]();}}}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x69e),_0x46ba11=>{const _0x321222=_0x444eb4;if(!SceneManager[_0x321222(0x11f)]())return;VisuMZ['ConvertParams'](_0x46ba11,_0x46ba11);const _0x16c250=VisuMZ['CreateActionSequenceTargets'](_0x46ba11[_0x321222(0x865)]);for(const _0x3b9569 of _0x16c250){if(!_0x3b9569)continue;if(!_0x3b9569[_0x321222(0x7f2)]())continue;_0x3b9569[_0x321222(0x7f2)]()[_0x321222(0x3a5)]();}}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Motion_WaitMotionFrame',_0x2707a6=>{const _0x180fc5=_0x444eb4;if(!SceneManager[_0x180fc5(0x11f)]())return;VisuMZ[_0x180fc5(0x346)](_0x2707a6,_0x2707a6);const _0x3ebddf=$gameTemp['getLastPluginCommandInterpreter'](),_0x185e8f=_0x2707a6['MotionFrameWait']*Sprite_Battler[_0x180fc5(0x2cd)];_0x3ebddf['wait'](_0x185e8f);}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x4ca),_0x230fae=>{const _0x3adf54=_0x444eb4;if(!SceneManager[_0x3adf54(0x11f)]())return;VisuMZ[_0x3adf54(0x346)](_0x230fae,_0x230fae);const _0x365094=$gameTemp['getLastPluginCommandInterpreter'](),_0x30ed65=BattleManager['_action'];if(!_0x365094||!_0x30ed65)return;if(!_0x30ed65[_0x3adf54(0x712)]())return;const _0x35ce7a=VisuMZ[_0x3adf54(0x830)](_0x230fae[_0x3adf54(0x865)]);for(const _0x12029a of _0x35ce7a){if(_0x3adf54(0x620)==='UjSdd'){function _0x3e5386(){const _0x1fe0ab=_0x3adf54;this[_0x1fe0ab(0x5c1)]=!this[_0x1fe0ab(0x265)][_0x1fe0ab(0x68b)](),!this[_0x1fe0ab(0x5c1)]&&(this[_0x1fe0ab(0x30b)]=0x0);}}else{if(!_0x12029a)continue;_0x12029a[_0x3adf54(0x34d)](_0x30ed65);}}if(_0x230fae[_0x3adf54(0x819)])_0x365094[_0x3adf54(0x306)](_0x3adf54(0x3e5));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x210),_0x54f240=>{const _0x4f8fb7=_0x444eb4;if(!SceneManager[_0x4f8fb7(0x11f)]())return;if(!$gameSystem[_0x4f8fb7(0x73c)]())return;VisuMZ['ConvertParams'](_0x54f240,_0x54f240);const _0x2c9552=VisuMZ['CreateActionSequenceTargets'](_0x54f240['Targets']);let _0x2b58d2=_0x54f240[_0x4f8fb7(0x6c5)][_0x4f8fb7(0x7db)](/back/i);for(const _0x5bee20 of _0x2c9552){if(!_0x5bee20)continue;if(_0x54f240[_0x4f8fb7(0x6c5)][_0x4f8fb7(0x7db)](/rand/i))_0x2b58d2=Math[_0x4f8fb7(0x85a)](0x2);_0x5bee20[_0x4f8fb7(0x280)](!!_0x2b58d2);}}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x970),_0x4c5188=>{const _0x411c69=_0x444eb4;if(!SceneManager[_0x411c69(0x11f)]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x411c69(0x346)](_0x4c5188,_0x4c5188);const _0x1685d2=VisuMZ[_0x411c69(0x830)](_0x4c5188['Targets']);let _0x286109=_0x4c5188[_0x411c69(0x7f5)];const _0x4d6ea0=_0x4c5188[_0x411c69(0xd8)];for(const _0x443df8 of _0x1685d2){if(_0x411c69(0x740)!==_0x411c69(0x886)){if(!_0x443df8)continue;let _0x45d621=_0x443df8[_0x411c69(0x7f2)]()[_0x411c69(0x7f8)],_0x40a67b=_0x443df8[_0x411c69(0x7f2)]()[_0x411c69(0x29f)];if(_0x286109[_0x411c69(0x7db)](/home/i)){if(_0x411c69(0x792)!==_0x411c69(0x7d0))_0x45d621=_0x443df8['battler']()[_0x411c69(0x76b)],_0x40a67b=_0x443df8[_0x411c69(0x7f2)]()[_0x411c69(0x383)];else{function _0x1dff6b(){const _0x204110=_0x411c69;if(_0x1f952a['note'][_0x204110(0x7db)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x49d888=_0x16bc80(_0x7ce533['$1'])[_0x204110(0x79d)](/[\r\n]+/)[_0x204110(0x580)](''),_0xfca464=this['processRandomizedData'](_0x49d888);_0x83bbba=this[_0x204110(0x2b1)](_0xfca464)||_0x3e027b,_0x395077=_0x205bd6[_0x204110(0x356)](_0x551d67);}}}}else{if(_0x286109[_0x411c69(0x7db)](/center/i))_0x45d621=Graphics[_0x411c69(0x6e8)]/0x2,_0x40a67b=Graphics[_0x411c69(0x6fd)]/0x2;else _0x286109[_0x411c69(0x7db)](/point (\d+), (\d+)/i)&&(_0x45d621=Number(RegExp['$1']),_0x40a67b=Number(RegExp['$2']));}_0x443df8[_0x411c69(0x3db)](Math[_0x411c69(0x29d)](_0x45d621),Math[_0x411c69(0x29d)](_0x40a67b),!!_0x4d6ea0);}else{function _0x3955d9(){const _0x2f4618=_0x411c69;this['_mainSprite'][_0x2f4618(0x8fa)][_0x2f4618(0x49b)]=this[_0x2f4618(0x701)][_0x2f4618(0x44b)]();}}}}),PluginManager['registerCommand'](pluginData['name'],_0x444eb4(0x7b7),_0x350cf3=>{const _0x10d770=_0x444eb4;if(!SceneManager[_0x10d770(0x11f)]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x10d770(0x346)](_0x350cf3,_0x350cf3);const _0x391efe=VisuMZ[_0x10d770(0x830)](_0x350cf3[_0x10d770(0x2f0)]),_0x4bc8e6=VisuMZ[_0x10d770(0x830)](_0x350cf3[_0x10d770(0x891)]),_0x3a69da=_0x4bc8e6[_0x10d770(0x99d)](_0x14ec7e=>_0x14ec7e&&_0x14ec7e['battler']()?_0x14ec7e[_0x10d770(0x7f2)]()[_0x10d770(0x7f8)]:0x0)/(_0x4bc8e6[_0x10d770(0x34a)]||0x1),_0x127494=_0x4bc8e6[_0x10d770(0x99d)](_0x249cd3=>_0x249cd3&&_0x249cd3['battler']()?_0x249cd3[_0x10d770(0x7f2)]()['_baseY']:0x0)/(_0x4bc8e6[_0x10d770(0x34a)]||0x1),_0x3830b8=_0x350cf3[_0x10d770(0xd8)];for(const _0xe9dcc6 of _0x391efe){if(!_0xe9dcc6)continue;_0xe9dcc6[_0x10d770(0x3db)](Math[_0x10d770(0x29d)](_0x3a69da),Math[_0x10d770(0x29d)](_0x127494),!!_0x3830b8);}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x168),_0x3acda4=>{const _0x60872b=_0x444eb4;if(!SceneManager[_0x60872b(0x11f)]())return;VisuMZ[_0x60872b(0x346)](_0x3acda4,_0x3acda4);const _0x3b7715=$gameTemp[_0x60872b(0x283)](),_0x1a1dbc=VisuMZ[_0x60872b(0x830)](_0x3acda4[_0x60872b(0x865)]),_0x3966e3=_0x3acda4[_0x60872b(0x831)],_0xfe0215=_0x3acda4['Duration'],_0x4d5e59=_0x3acda4[_0x60872b(0x81b)],_0x56d8b1=_0x3acda4[_0x60872b(0x7f7)];if(!_0x3b7715)return;for(const _0x44260c of _0x1a1dbc){if(!_0x44260c)continue;_0x44260c[_0x60872b(0x81a)](_0x3966e3,_0xfe0215,_0x4d5e59);}if(_0x56d8b1)_0x3b7715[_0x60872b(0x306)](_0x60872b(0x8c1));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Movement_HomeReset',_0xf5433b=>{const _0x32ef7c=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x32ef7c(0x346)](_0xf5433b,_0xf5433b);const _0x485bac=$gameTemp[_0x32ef7c(0x283)]();if(!_0x485bac)return;const _0x3a7ffb=VisuMZ['CreateActionSequenceTargets'](_0xf5433b['Targets']);for(const _0x3b5eaf of _0x3a7ffb){if('TERUg'===_0x32ef7c(0x6fa)){if(!_0x3b5eaf)continue;_0x3b5eaf[_0x32ef7c(0x3f9)]();}else{function _0x38c222(){const _0x4d1b31=_0x32ef7c;this[_0x4d1b31(0x306)](_0x4d1b31(0x217));}}}if(_0xf5433b[_0x32ef7c(0x819)])_0x485bac[_0x32ef7c(0x306)](_0x32ef7c(0x3e5));}),PluginManager['registerCommand'](pluginData['name'],_0x444eb4(0x68f),_0x31a391=>{const _0x13a4ce=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x13a4ce(0x346)](_0x31a391,_0x31a391);const _0x15a1ae=$gameTemp['getLastPluginCommandInterpreter'](),_0x250990=VisuMZ[_0x13a4ce(0x830)](_0x31a391[_0x13a4ce(0x865)]),_0x34ea08=_0x31a391[_0x13a4ce(0x831)],_0xcb4a8c=_0x31a391['Duration'],_0x50f50a=_0x31a391[_0x13a4ce(0x6f5)];if(!_0x15a1ae)return;for(const _0xc72913 of _0x250990){if(!_0xc72913)continue;_0xc72913[_0x13a4ce(0x882)](_0x34ea08,_0xcb4a8c);}if(_0x50f50a)_0x15a1ae['setWaitMode'](_0x13a4ce(0x826));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x6e5),_0x2afa2f=>{const _0x551bde=_0x444eb4;if(!SceneManager[_0x551bde(0x11f)]())return;if(!$gameSystem['isSideView']())return;VisuMZ['ConvertParams'](_0x2afa2f,_0x2afa2f);const _0x11ca8f=$gameTemp[_0x551bde(0x283)](),_0x2c6e0c=VisuMZ[_0x551bde(0x830)](_0x2afa2f[_0x551bde(0x865)]),_0x412c35=_0x2afa2f[_0x551bde(0x4de)],_0x53faea=_0x2afa2f[_0x551bde(0x708)],_0x5986ef=_0x2afa2f['DistanceY'],_0x260d82=_0x2afa2f[_0x551bde(0xfa)],_0xa72996=_0x2afa2f[_0x551bde(0x483)],_0x200efd=_0x2afa2f['EasingType'],_0x29f6a0=_0x2afa2f[_0x551bde(0x88d)],_0x3db7be=_0x2afa2f[_0x551bde(0x819)];if(!_0x11ca8f)return;for(const _0x2d9705 of _0x2c6e0c){if(!_0x2d9705)continue;let _0x1f3413=_0x53faea,_0x1ed777=_0x5986ef;if(_0x412c35['match'](/horz/i))_0x1f3413*=_0x2d9705['isActor']()?-0x1:0x1;if(_0x412c35[_0x551bde(0x7db)](/vert/i))_0x1ed777*=_0x2d9705['isActor']()?-0x1:0x1;_0x2d9705['moveBattlerDistance'](_0x1f3413,_0x1ed777,_0x260d82,_0xa72996,_0x200efd),_0x2d9705[_0x551bde(0x6d9)](_0x29f6a0);}if(_0x3db7be)_0x11ca8f[_0x551bde(0x306)](_0x551bde(0x3e5));}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x6db),_0x2e4d0b=>{const _0x3e5ac2=_0x444eb4;if(!SceneManager[_0x3e5ac2(0x11f)]())return;if(!$gameSystem[_0x3e5ac2(0x73c)]())return;VisuMZ[_0x3e5ac2(0x346)](_0x2e4d0b,_0x2e4d0b);const _0xe70423=$gameTemp[_0x3e5ac2(0x283)](),_0x4f3ae0=VisuMZ['CreateActionSequenceTargets'](_0x2e4d0b[_0x3e5ac2(0x865)]),_0x517bd7=_0x2e4d0b['Destination'],_0x3a92da=_0x2e4d0b[_0x3e5ac2(0x58a)],_0x12202f=_0x2e4d0b[_0x3e5ac2(0x578)],_0x3a16e6=_0x2e4d0b[_0x3e5ac2(0x872)],_0x55234a=_0x2e4d0b[_0x3e5ac2(0xfa)],_0x38221b=_0x2e4d0b[_0x3e5ac2(0x483)],_0x1aa9eb=_0x2e4d0b[_0x3e5ac2(0x81b)],_0x32d5db=_0x2e4d0b[_0x3e5ac2(0x88d)],_0x1f65fd=_0x2e4d0b[_0x3e5ac2(0x819)];if(!_0xe70423)return;for(const _0x4076d5 of _0x4f3ae0){if(!_0x4076d5)continue;let _0x6d7b40=_0x4076d5[_0x3e5ac2(0x7f2)]()[_0x3e5ac2(0x7f8)],_0x434a21=_0x4076d5[_0x3e5ac2(0x7f2)]()[_0x3e5ac2(0x29f)];if(_0x517bd7[_0x3e5ac2(0x7db)](/home/i)){if(_0x3e5ac2(0x45b)===_0x3e5ac2(0x45b))_0x6d7b40=_0x4076d5[_0x3e5ac2(0x7f2)]()[_0x3e5ac2(0x76b)],_0x434a21=_0x4076d5[_0x3e5ac2(0x7f2)]()['_homeY'];else{function _0x1d70f3(){const _0x3ae8cb=_0x3e5ac2,_0x329202=_0x556270(_0xa5c94c['$1'])[_0x3ae8cb(0x3af)](),_0x375583=_0x13c133(_0x1baf0f['$2']);_0x358bb3[_0x329202]=_0x375583,_0x24c152+=_0x375583;}}}else{if(_0x517bd7[_0x3e5ac2(0x7db)](/center/i))_0x6d7b40=Graphics[_0x3e5ac2(0x6e8)]/0x2,_0x434a21=Graphics[_0x3e5ac2(0x6fd)]/0x2;else _0x517bd7[_0x3e5ac2(0x7db)](/point (\d+), (\d+)/i)&&(_0x6d7b40=Number(RegExp['$1']),_0x434a21=Number(RegExp['$2']));}if(_0x3a92da['match'](/horz/i))_0x6d7b40+=_0x4076d5['isActor']()?-_0x12202f:_0x12202f;if(_0x3a92da[_0x3e5ac2(0x7db)](/vert/i))_0x434a21+=_0x4076d5[_0x3e5ac2(0x73d)]()?-_0x3a16e6:_0x3a16e6;_0x4076d5[_0x3e5ac2(0x861)](_0x6d7b40,_0x434a21,_0x55234a,_0x38221b,_0x1aa9eb,-0x1),_0x4076d5[_0x3e5ac2(0x6d9)](_0x32d5db);}if(_0x1f65fd)_0xe70423['setWaitMode'](_0x3e5ac2(0x3e5));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x153),_0x50700e=>{const _0x10b4e1=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x10b4e1(0x73c)]())return;VisuMZ[_0x10b4e1(0x346)](_0x50700e,_0x50700e);const _0x2bf290=$gameTemp[_0x10b4e1(0x283)](),_0x38eb8e=VisuMZ[_0x10b4e1(0x830)](_0x50700e[_0x10b4e1(0x2f0)]),_0x46083b=VisuMZ[_0x10b4e1(0x830)](_0x50700e['Targets2']),_0x45e9fd=_0x50700e[_0x10b4e1(0x66d)];let _0x5883a3=_0x50700e[_0x10b4e1(0x239)];const _0x5c26b9=_0x50700e[_0x10b4e1(0x58a)],_0x525cf1=_0x50700e[_0x10b4e1(0x578)],_0x2e0ccd=_0x50700e[_0x10b4e1(0x872)],_0x5207f5=_0x50700e[_0x10b4e1(0xfa)],_0x51182c=_0x50700e[_0x10b4e1(0x483)],_0x2d50b1=_0x50700e['EasingType'],_0x53b0c2=_0x50700e['MotionType'],_0x210b69=_0x50700e[_0x10b4e1(0x819)],_0x33baae=Math[_0x10b4e1(0x827)](..._0x46083b[_0x10b4e1(0x99d)](_0x5e8097=>_0x5e8097[_0x10b4e1(0x7f2)]()['_baseX']-_0x5e8097['battler']()[_0x10b4e1(0x817)]()/0x2)),_0x36e9af=Math[_0x10b4e1(0x960)](..._0x46083b['map'](_0x28d963=>_0x28d963[_0x10b4e1(0x7f2)]()[_0x10b4e1(0x7f8)]+_0x28d963[_0x10b4e1(0x7f2)]()[_0x10b4e1(0x817)]()/0x2)),_0x331469=Math[_0x10b4e1(0x827)](..._0x46083b[_0x10b4e1(0x99d)](_0x5ce6d8=>_0x5ce6d8[_0x10b4e1(0x7f2)]()['_baseY']-_0x5ce6d8[_0x10b4e1(0x7f2)]()['mainSpriteHeight']())),_0x3c137f=Math[_0x10b4e1(0x960)](..._0x46083b['map'](_0x4a98c3=>_0x4a98c3[_0x10b4e1(0x7f2)]()[_0x10b4e1(0x29f)])),_0x45034c=_0x46083b[_0x10b4e1(0x34b)](_0x3a80fd=>_0x3a80fd['isActor']())[_0x10b4e1(0x34a)],_0x317bf3=_0x46083b[_0x10b4e1(0x34b)](_0x2b2916=>_0x2b2916[_0x10b4e1(0x5e6)]())[_0x10b4e1(0x34a)];let _0x586716=0x0,_0x2fe711=0x0;if(_0x45e9fd[_0x10b4e1(0x7db)](/front/i))_0x586716=_0x45034c>=_0x317bf3?_0x33baae:_0x36e9af;else{if(_0x45e9fd[_0x10b4e1(0x7db)](/middle/i))_0x586716=(_0x33baae+_0x36e9af)/0x2,_0x5883a3=-0x1;else _0x45e9fd[_0x10b4e1(0x7db)](/back/i)&&(_0x586716=_0x45034c>=_0x317bf3?_0x36e9af:_0x33baae);}if(_0x45e9fd[_0x10b4e1(0x7db)](/head/i)){if('Fvybx'!==_0x10b4e1(0x26d))_0x2fe711=_0x331469;else{function _0x4cb12c(){return _0x330b4c(_0x14d0cf['$1']);}}}else{if(_0x45e9fd[_0x10b4e1(0x7db)](/center/i))_0x2fe711=(_0x331469+_0x3c137f)/0x2;else _0x45e9fd[_0x10b4e1(0x7db)](/base/i)&&(_0x2fe711=_0x3c137f);}if(!_0x2bf290)return;for(const _0x2f798e of _0x38eb8e){if(_0x10b4e1(0x5ad)!==_0x10b4e1(0x80b)){if(!_0x2f798e)continue;let _0xd0b862=_0x586716,_0x2674ec=_0x2fe711;if(_0x5c26b9[_0x10b4e1(0x7db)](/horz/i))_0xd0b862+=_0x2f798e[_0x10b4e1(0x73d)]()?-_0x525cf1:_0x525cf1;if(_0x5c26b9[_0x10b4e1(0x7db)](/vert/i))_0x2674ec+=_0x2f798e[_0x10b4e1(0x73d)]()?-_0x2e0ccd:_0x2e0ccd;_0x2f798e['moveBattlerToPoint'](_0xd0b862,_0x2674ec,_0x5207f5,_0x51182c,_0x2d50b1,_0x5883a3),_0x2f798e[_0x10b4e1(0x6d9)](_0x53b0c2);}else{function _0xfd6e49(){const _0x3ae919=_0x10b4e1,_0x3955b5=this[_0x3ae919(0x93b)](),_0x5cb080=_0x3955b5[0x0]?_0x3955b5[0x0]['wtypeId']:0x0,_0x597624=_0x3b71dc[_0x3ae919(0x54d)][_0x5cb080];_0x597624&&this['startWeaponAnimation'](_0x597624[_0x3ae919(0x21b)]);}}}if(_0x210b69)_0x2bf290[_0x10b4e1(0x306)](_0x10b4e1(0x3e5));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x340),_0x8f010a=>{const _0x14d4ed=_0x444eb4;if(!SceneManager[_0x14d4ed(0x11f)]())return;VisuMZ[_0x14d4ed(0x346)](_0x8f010a,_0x8f010a);const _0x1b69a7=$gameTemp['getLastPluginCommandInterpreter'](),_0x1564a1=VisuMZ[_0x14d4ed(0x830)](_0x8f010a['Targets']),_0xe1cd41=_0x8f010a['Opacity'],_0x4cb9f6=_0x8f010a[_0x14d4ed(0xfa)],_0x4aa189=_0x8f010a[_0x14d4ed(0x81b)],_0x31f523=_0x8f010a[_0x14d4ed(0x37a)];if(!_0x1b69a7)return;for(const _0x26b7f4 of _0x1564a1){if(_0x14d4ed(0x117)===_0x14d4ed(0x117)){if(!_0x26b7f4)continue;_0x26b7f4[_0x14d4ed(0x3b1)](_0xe1cd41,_0x4cb9f6,_0x4aa189);}else{function _0x31798f(){const _0x6b151=_0x14d4ed,_0x54edbb=this['autoBattleWindowRect']();this[_0x6b151(0x88a)]=new _0x3bf63b(_0x54edbb),this['_autoBattleWindow'][_0x6b151(0x8b4)](),this[_0x6b151(0x86a)](this[_0x6b151(0x88a)]);}}}if(_0x31f523)_0x1b69a7[_0x14d4ed(0x306)](_0x14d4ed(0x90a));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],'ActSeq_Movement_Scale',_0x34d318=>{const _0x42c030=_0x444eb4;if(!SceneManager[_0x42c030(0x11f)]())return;VisuMZ[_0x42c030(0x346)](_0x34d318,_0x34d318);const _0x1adaf6=$gameTemp['getLastPluginCommandInterpreter'](),_0x17c2ae=VisuMZ[_0x42c030(0x830)](_0x34d318[_0x42c030(0x865)]),_0x390881=_0x34d318[_0x42c030(0x361)],_0x1eb7b5=_0x34d318[_0x42c030(0x3c4)],_0x394e39=_0x34d318[_0x42c030(0xfa)],_0x592b1f=_0x34d318['EasingType'],_0x532daa=_0x34d318[_0x42c030(0x378)];if(!_0x1adaf6)return;for(const _0x23bd59 of _0x17c2ae){if(!_0x23bd59)continue;_0x23bd59[_0x42c030(0x927)](_0x390881,_0x1eb7b5,_0x394e39,_0x592b1f);}if(_0x532daa)_0x1adaf6[_0x42c030(0x306)](_0x42c030(0x94c));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x33e),_0x4ec4d8=>{const _0x3e0351=_0x444eb4;if(!SceneManager[_0x3e0351(0x11f)]())return;VisuMZ['ConvertParams'](_0x4ec4d8,_0x4ec4d8);const _0x5e95fc=$gameTemp[_0x3e0351(0x283)](),_0xd5ccec=VisuMZ[_0x3e0351(0x830)](_0x4ec4d8[_0x3e0351(0x865)]),_0x18f531=_0x4ec4d8[_0x3e0351(0x1c6)],_0x240284=_0x4ec4d8[_0x3e0351(0x2b6)],_0x4d3146=_0x4ec4d8[_0x3e0351(0xfa)],_0x482435=_0x4ec4d8[_0x3e0351(0x81b)],_0x3bb28a=_0x4ec4d8['WaitForSkew'];if(!_0x5e95fc)return;for(const _0x47bb16 of _0xd5ccec){if(_0x3e0351(0x8ba)!=='XTkYw'){if(!_0x47bb16)continue;_0x47bb16[_0x3e0351(0x2a8)](_0x18f531,_0x240284,_0x4d3146,_0x482435);}else{function _0x578fbb(){const _0x3a8b08=_0x3e0351;return _0x45a1cf[_0x3a8b08(0x833)]()[_0x3a8b08(0x8f7)](this[_0x3a8b08(0x2fb)]);}}}if(_0x3bb28a)_0x5e95fc[_0x3e0351(0x306)](_0x3e0351(0x6a0));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Movement_Spin',_0x5bcaa6=>{const _0x364450=_0x444eb4;if(!SceneManager[_0x364450(0x11f)]())return;VisuMZ[_0x364450(0x346)](_0x5bcaa6,_0x5bcaa6);const _0x243cd1=$gameTemp['getLastPluginCommandInterpreter'](),_0x183a2b=VisuMZ['CreateActionSequenceTargets'](_0x5bcaa6[_0x364450(0x865)]),_0x23923b=_0x5bcaa6['Angle'],_0xdd5d37=_0x5bcaa6[_0x364450(0xfa)],_0x35184f=_0x5bcaa6['EasingType'],_0x3ea6c5=_0x5bcaa6['RevertAngle'],_0x47c8d0=_0x5bcaa6[_0x364450(0x895)];if(!_0x243cd1)return;for(const _0x563b5f of _0x183a2b){if(!_0x563b5f)continue;_0x563b5f[_0x364450(0x640)](_0x23923b,_0xdd5d37,_0x35184f,_0x3ea6c5);}if(_0x47c8d0)_0x243cd1[_0x364450(0x306)]('battleSpin');}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x289),_0x5130d7=>{const _0x49d047=_0x444eb4;if(!SceneManager['isSceneBattle']())return;const _0x3f56a9=$gameTemp[_0x49d047(0x283)]();if(!_0x3f56a9)return;_0x3f56a9[_0x49d047(0x306)](_0x49d047(0x8c1));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Movement_WaitForJump',_0x2ae472=>{const _0x203ebf=_0x444eb4;if(!SceneManager[_0x203ebf(0x11f)]())return;const _0x238f6c=$gameTemp[_0x203ebf(0x283)]();if(!_0x238f6c)return;_0x238f6c[_0x203ebf(0x306)](_0x203ebf(0x826));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x657),_0x49143e=>{const _0x33733e=_0x444eb4;if(!SceneManager[_0x33733e(0x11f)]())return;const _0x330913=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x330913)return;_0x330913[_0x33733e(0x306)](_0x33733e(0x3e5));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],'ActSeq_Movement_WaitForOpacity',_0x2d374e=>{const _0x31281a=_0x444eb4;if(!SceneManager[_0x31281a(0x11f)]())return;const _0x212a21=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x212a21)return;_0x212a21[_0x31281a(0x306)]('battleOpacity');}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x78a),_0x194b1e=>{const _0x116683=_0x444eb4;if(!SceneManager['isSceneBattle']())return;const _0xd38f9e=$gameTemp[_0x116683(0x283)]();if(!_0xd38f9e)return;_0xd38f9e[_0x116683(0x306)](_0x116683(0x94c));}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],_0x444eb4(0x3dd),_0x23f32e=>{const _0x2d3be7=_0x444eb4;if(!SceneManager[_0x2d3be7(0x11f)]())return;const _0x12eb24=$gameTemp[_0x2d3be7(0x283)]();if(!_0x12eb24)return;_0x12eb24[_0x2d3be7(0x306)]('battleSpriteSkew');}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Movement_WaitForSpin',_0x28fa9b=>{const _0x3e95fa=_0x444eb4;if(!SceneManager['isSceneBattle']())return;const _0x3119bc=$gameTemp[_0x3e95fa(0x283)]();if(!_0x3119bc)return;_0x3119bc[_0x3e95fa(0x306)]('battleSpin');}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x662),_0x91681f=>{const _0x89fb87=_0x444eb4;if(!SceneManager[_0x89fb87(0x11f)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x89fb87(0x346)](_0x91681f,_0x91681f);const _0x481c0b=$gameTemp[_0x89fb87(0x283)](),_0x45586b=_0x91681f['WaitForSkew'];if(!_0x481c0b)return;$gameScreen['setBattleSkew'](_0x91681f[_0x89fb87(0x1c6)],_0x91681f['SkewY'],_0x91681f[_0x89fb87(0xfa)],_0x91681f[_0x89fb87(0x81b)]);if(_0x45586b)_0x481c0b[_0x89fb87(0x306)](_0x89fb87(0x2d5));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0xd4),_0x40b58d=>{const _0x591deb=_0x444eb4;if(!SceneManager[_0x591deb(0x11f)]())return;if(!Imported[_0x591deb(0x213)])return;VisuMZ['ConvertParams'](_0x40b58d,_0x40b58d);const _0x15ba6c=$gameTemp[_0x591deb(0x283)](),_0x3e6183=_0x40b58d[_0x591deb(0x132)];if(!_0x15ba6c)return;$gameScreen[_0x591deb(0x602)](0x0,0x0,_0x40b58d['Duration'],_0x40b58d[_0x591deb(0x81b)]);if(_0x3e6183)_0x15ba6c[_0x591deb(0x306)](_0x591deb(0x2d5));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0xd1),_0x452a07=>{const _0x3e72b4=_0x444eb4;if(!SceneManager[_0x3e72b4(0x11f)]())return;if(!Imported[_0x3e72b4(0x213)])return;const _0x4a3888=$gameTemp[_0x3e72b4(0x283)]();if(!_0x4a3888)return;_0x4a3888[_0x3e72b4(0x306)](_0x3e72b4(0x2d5));}),PluginManager['registerCommand'](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x229),_0x32fa9a=>{const _0x1f40c6=_0x444eb4;if(!SceneManager[_0x1f40c6(0x11f)]())return;VisuMZ[_0x1f40c6(0x346)](_0x32fa9a,_0x32fa9a);const _0x5a0ad3=$gameTemp[_0x1f40c6(0x283)](),_0x793ad3=_0x32fa9a[_0x1f40c6(0x916)],_0x5b4238=_0x32fa9a[_0x1f40c6(0x653)];if(!_0x5a0ad3)return;BattleManager['_targetIndex']=_0x793ad3,BattleManager[_0x1f40c6(0x42e)]=BattleManager['_allTargets']?BattleManager[_0x1f40c6(0x7e6)][BattleManager[_0x1f40c6(0xf1)]]||null:null,BattleManager[_0x1f40c6(0x42e)]&&_0x5b4238[_0x1f40c6(0x8c0)]()[_0x1f40c6(0x3af)]()!=='UNTITLED'&&_0x5a0ad3[_0x1f40c6(0x87b)]([_0x5b4238]);}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x493),_0x32b8bc=>{const _0x141a66=_0x444eb4;if(!SceneManager[_0x141a66(0x11f)]())return;VisuMZ['ConvertParams'](_0x32b8bc,_0x32b8bc);const _0x25b265=$gameTemp[_0x141a66(0x283)](),_0x393362=_0x32b8bc[_0x141a66(0x653)];if(!_0x25b265)return;BattleManager[_0x141a66(0xf1)]++,BattleManager[_0x141a66(0x42e)]=BattleManager[_0x141a66(0x7e6)][BattleManager[_0x141a66(0xf1)]]||null,BattleManager[_0x141a66(0x42e)]&&_0x393362[_0x141a66(0x8c0)]()[_0x141a66(0x3af)]()!==_0x141a66(0x3ca)&&_0x25b265[_0x141a66(0x87b)]([_0x393362]);}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Target_PrevTarget',_0x14c928=>{const _0x32a7cc=_0x444eb4;if(!SceneManager[_0x32a7cc(0x11f)]())return;VisuMZ[_0x32a7cc(0x346)](_0x14c928,_0x14c928);const _0x138c25=$gameTemp['getLastPluginCommandInterpreter'](),_0x58c442=_0x14c928[_0x32a7cc(0x653)];if(!_0x138c25)return;BattleManager[_0x32a7cc(0xf1)]--,BattleManager[_0x32a7cc(0x42e)]=BattleManager[_0x32a7cc(0x7e6)][BattleManager[_0x32a7cc(0xf1)]]||null;if(BattleManager['_target']&&_0x58c442[_0x32a7cc(0x8c0)]()['trim']()!==_0x32a7cc(0x3ca)){if('WOYci'!==_0x32a7cc(0x74d)){function _0x1c1bef(){_0x5be282['addState'](_0x2da60a);}}else _0x138c25[_0x32a7cc(0x87b)]([_0x58c442]);}}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x120),_0x378a26=>{const _0x2dbab0=_0x444eb4;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x2dbab0(0x346)](_0x378a26,_0x378a26);const _0x2d58cf=$gameTemp[_0x2dbab0(0x283)](),_0x17f29b=_0x378a26['ForceRandom'],_0x24c7bc=_0x378a26['JumpToLabel'];if(!_0x2d58cf)return;const _0x2bd5c5=BattleManager[_0x2dbab0(0xf1)];for(;;){BattleManager[_0x2dbab0(0xf1)]=Math[_0x2dbab0(0x85a)](BattleManager[_0x2dbab0(0x7e6)][_0x2dbab0(0x34a)]);if(!_0x17f29b)break;if(BattleManager[_0x2dbab0(0xf1)]!==_0x2bd5c5)break;if(BattleManager[_0x2dbab0(0x7e6)][_0x2dbab0(0x34a)]<=0x1){BattleManager['_targetIndex']=0x0;break;}}BattleManager[_0x2dbab0(0x42e)]=BattleManager['_allTargets'][BattleManager['_targetIndex']]||null,BattleManager[_0x2dbab0(0x42e)]&&_0x24c7bc[_0x2dbab0(0x8c0)]()[_0x2dbab0(0x3af)]()!=='UNTITLED'&&_0x2d58cf[_0x2dbab0(0x87b)]([_0x24c7bc]);}),PluginManager[_0x444eb4(0x6ea)](pluginData['name'],'ActSeq_Zoom_Scale',_0x3b34c9=>{const _0x5a41d1=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x5a41d1(0x213)])return;VisuMZ[_0x5a41d1(0x346)](_0x3b34c9,_0x3b34c9);const _0x53c642=$gameTemp[_0x5a41d1(0x283)](),_0x19d002=_0x3b34c9[_0x5a41d1(0x2ca)];if(!_0x53c642)return;$gameScreen[_0x5a41d1(0x66f)](_0x3b34c9['Scale'],_0x3b34c9[_0x5a41d1(0xfa)],_0x3b34c9[_0x5a41d1(0x81b)]);if(_0x19d002)_0x53c642[_0x5a41d1(0x306)]('battleZoom');}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],_0x444eb4(0x918),_0x109c56=>{const _0x2a8e7d=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x2a8e7d(0x213)])return;VisuMZ['ConvertParams'](_0x109c56,_0x109c56);const _0x53130e=$gameTemp[_0x2a8e7d(0x283)](),_0x4bc62e=_0x109c56[_0x2a8e7d(0x2ca)];if(!_0x53130e)return;$gameScreen['setBattleZoom'](0x1,_0x109c56[_0x2a8e7d(0xfa)],_0x109c56[_0x2a8e7d(0x81b)]);if(_0x4bc62e)_0x53130e['setWaitMode'](_0x2a8e7d(0xaf));}),PluginManager[_0x444eb4(0x6ea)](pluginData[_0x444eb4(0x2d2)],'ActSeq_Zoom_WaitForZoom',_0x4714d6=>{const _0x3f3c05=_0x444eb4;if(!SceneManager[_0x3f3c05(0x11f)]())return;if(!Imported[_0x3f3c05(0x213)])return;const _0x4e1c1c=$gameTemp[_0x3f3c05(0x283)]();if(!_0x4e1c1c)return;_0x4e1c1c[_0x3f3c05(0x306)](_0x3f3c05(0xaf));}),VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x511)]=Scene_Boot['prototype'][_0x444eb4(0x96b)],Scene_Boot[_0x444eb4(0x268)][_0x444eb4(0x96b)]=function(){const _0x2ceb4d=_0x444eb4;this[_0x2ceb4d(0x899)](),this[_0x2ceb4d(0x71d)](),this['process_VisuMZ_BattleCore_DamageStyles'](),this[_0x2ceb4d(0x28b)](),VisuMZ['BattleCore'][_0x2ceb4d(0x511)][_0x2ceb4d(0x315)](this),this[_0x2ceb4d(0x194)](),this[_0x2ceb4d(0x4be)]();},Scene_Boot[_0x444eb4(0x268)]['process_VisuMZ_BattleCore_Notetags']=function(){const _0xdac84b=_0x444eb4;if(VisuMZ['ParseAllNotetags'])return;this[_0xdac84b(0x227)](),this['process_VisuMZ_BattleCore_TraitObject_Notetags'](),this[_0xdac84b(0x258)]();},Scene_Boot[_0x444eb4(0x268)][_0x444eb4(0x899)]=function(){const _0x619f32=_0x444eb4,_0x2cdde6=$dataSystem['weaponTypes'][_0x619f32(0x34a)];for(let _0xdf1e75=0x0;_0xdf1e75<_0x2cdde6;_0xdf1e75++){const _0x1202fa=$dataSystem[_0x619f32(0x54d)][_0xdf1e75];if(_0x1202fa)continue;$dataSystem[_0x619f32(0x54d)][_0xdf1e75]=JsonEx[_0x619f32(0x1f1)]($dataSystem[_0x619f32(0x54d)][0x0]);}},Scene_Boot[_0x444eb4(0x268)]['process_VisuMZ_BattleCore_PluginParams']=function(){const _0x33a7b6=_0x444eb4,_0x42e340=VisuMZ['BattleCore'][_0x33a7b6(0x90c)];if(_0x42e340[_0x33a7b6(0x4b3)][_0x33a7b6(0x456)]===undefined){if(_0x33a7b6(0x7a8)===_0x33a7b6(0x7a8))_0x42e340[_0x33a7b6(0x4b3)]['PopupPosition']=_0x33a7b6(0x259);else{function _0x48ff68(){return!![];}}}_0x42e340['Actor']['SmoothImage']===undefined&&(_0x42e340[_0x33a7b6(0x78b)]['SmoothImage']=![]);if(_0x42e340['Enemy']['SmoothImage']===undefined){if('HTcnd'!=='whtSA')_0x42e340[_0x33a7b6(0x874)][_0x33a7b6(0x5c8)]=!![];else{function _0x1470dd(){this['selectNextCommand']();}}}if(_0x42e340[_0x33a7b6(0x78b)][_0x33a7b6(0x74b)]===undefined){if(_0x33a7b6(0xba)!==_0x33a7b6(0xf6))_0x42e340[_0x33a7b6(0x78b)][_0x33a7b6(0x74b)]=![];else{function _0x49b313(){_0x495ca1=_0x25f2ef(_0x224fda['$1']);}}}_0x42e340[_0x33a7b6(0x78b)][_0x33a7b6(0x17b)]===undefined&&(_0x42e340['Actor'][_0x33a7b6(0x17b)]=!![]);},VisuMZ[_0x444eb4(0x1ba)]={},Scene_Boot[_0x444eb4(0x268)]['process_VisuMZ_BattleCore_DamageStyles']=function(){const _0x19ebf1=_0x444eb4;for(const _0x2d2e85 of VisuMZ[_0x19ebf1(0x25c)]['Settings'][_0x19ebf1(0x4b3)]['DamageStyleList']){if(_0x19ebf1(0x5e3)!==_0x19ebf1(0x5e3)){function _0x578d9d(){const _0x301c9d=_0x19ebf1;this['_cursorSprite']=new _0x1805c2();for(let _0x2a9bfd=0x0;_0x2a9bfd<0x9;_0x2a9bfd++){this[_0x301c9d(0x664)][_0x301c9d(0x86a)](new _0x5c7b94());}this[_0x301c9d(0x2c8)][_0x301c9d(0x86a)](this[_0x301c9d(0x664)]);}}else{if(!_0x2d2e85)continue;const _0x10c4c2=_0x2d2e85[_0x19ebf1(0x7c1)][_0x19ebf1(0x8c0)]()[_0x19ebf1(0x3af)]();VisuMZ[_0x19ebf1(0x1ba)][_0x10c4c2]=_0x2d2e85;}}},VisuMZ[_0x444eb4(0x25c)]['RegExp']={},Scene_Boot[_0x444eb4(0x268)]['process_VisuMZ_BattleCore_CreateRegExp']=function(){const _0x576355=_0x444eb4,_0x2904a0=VisuMZ[_0x576355(0x25c)]['RegExp'],_0x5d80fa=_0x576355(0x64c),_0x5e1fc3=[['Pre',_0x576355(0x3c1)],['Post',_0x576355(0x955)]],_0x44f947=[[_0x576355(0x6a4),_0x576355(0x134)],[_0x576355(0x498),_0x576355(0x52d)]],_0x3da5bf=[['',''],[_0x576355(0x84a),_0x576355(0x6a2)],[_0x576355(0x79e),_0x576355(0x44f)]];for(const _0x169c01 of _0x44f947){for(const _0x14c28c of _0x3da5bf){if(_0x576355(0x411)==='UVneK'){function _0x3165ef(){const _0x5442a5=_0x576355,_0x562a33=this[_0x5442a5(0x712)]()[_0x5442a5(0x58f)];if(_0x562a33[_0x5442a5(0x7db)](/RANDOM/i))return![];return _0x39e73a['BattleCore'][_0x5442a5(0x7df)][_0x5442a5(0x315)](this);}}else for(const _0x6b8ce0 of _0x5e1fc3){const _0x256632=_0x169c01[0x0][_0x576355(0x4e2)](_0x6b8ce0[0x0],_0x14c28c[0x0]),_0x509270=_0x169c01[0x1][_0x576355(0x4e2)](_0x6b8ce0[0x1],_0x14c28c[0x1])[_0x576355(0x3af)](),_0x1debbb=new RegExp(_0x5d80fa[_0x576355(0x4e2)](_0x509270),'i');_0x2904a0[_0x256632]=_0x1debbb;}}}const _0x549c96=[[_0x576355(0x975),_0x576355(0x1b0)],[_0x576355(0x28a),'JS\x20%1END\x20ACTION']];for(const _0x3b03b1 of _0x549c96){for(const _0x4bac6c of _0x5e1fc3){if('hXACp'===_0x576355(0x455)){function _0x319804(){const _0x4cf68a=_0x576355;if(this[_0x4cf68a(0x266)]===_0x615dfc)return;this['updateGrow'](),this['finalizeScale']();}}else{const _0x3a613c=_0x3b03b1[0x0][_0x576355(0x4e2)](_0x4bac6c[0x0]),_0x2f9437=_0x3b03b1[0x1][_0x576355(0x4e2)](_0x4bac6c[0x1]),_0x469617=new RegExp(_0x5d80fa[_0x576355(0x4e2)](_0x2f9437),'i');_0x2904a0[_0x3a613c]=_0x469617;}}}const _0x4b2036=[[_0x576355(0x8dd),_0x576355(0x26b)],[_0x576355(0x629),_0x576355(0x98e)],[_0x576355(0x380),'JS\x20BATTLE\x20VICTORY'],[_0x576355(0x670),_0x576355(0x1df)],[_0x576355(0x943),_0x576355(0x810)],[_0x576355(0x2ef),_0x576355(0x913)],[_0x576355(0x7ee),'JS\x20%1START\x20TURN'],[_0x576355(0x554),_0x576355(0x107)],[_0x576355(0x615),'JS\x20%1REGENERATE']];for(const _0x15f710 of _0x4b2036){if(_0x576355(0x604)!==_0x576355(0x604)){function _0x4315b6(){const _0x5caccc=_0x576355;return _0x48f9f8[_0x5caccc(0x25c)][_0x5caccc(0xe4)][_0x5caccc(0x315)](this,_0x567ec4);}}else for(const _0x24cf55 of _0x5e1fc3){if('mlFdx'==='mlFdx'){const _0x359fe3=_0x15f710[0x0][_0x576355(0x4e2)](_0x24cf55[0x0]),_0x1796a2=_0x15f710[0x1][_0x576355(0x4e2)](_0x24cf55[0x1]),_0x25cd01=new RegExp(_0x5d80fa[_0x576355(0x4e2)](_0x1796a2),'i');_0x2904a0[_0x359fe3]=_0x25cd01;}else{function _0x442a77(){const _0x5e28af=_0x576355;this[_0x5e28af(0x807)]['svShadow']=!![];}}}}},Scene_Boot[_0x444eb4(0x268)][_0x444eb4(0x227)]=function(){const _0x469e6a=_0x444eb4,_0x42ded9=$dataSkills[_0x469e6a(0x3ec)]($dataItems);for(const _0x2d68e8 of _0x42ded9){if(!_0x2d68e8)continue;VisuMZ[_0x469e6a(0x25c)][_0x469e6a(0x5d2)](_0x2d68e8);}},Scene_Boot['prototype']['process_VisuMZ_BattleCore_TraitObject_Notetags']=function(){const _0x542fcc=_0x444eb4,_0x14644c=$dataActors[_0x542fcc(0x3ec)]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0xe376f2 of _0x14644c){if(_0x542fcc(0x186)!==_0x542fcc(0x5a2)){if(!_0xe376f2)continue;VisuMZ['BattleCore']['Parse_Notetags_TraitObjects'](_0xe376f2);}else{function _0xd28797(){const _0x39c64f=_0x542fcc;_0x2a1764[_0x334124][_0x39c64f(0x315)](this,_0x56697c);}}}},Scene_Boot['prototype'][_0x444eb4(0x4be)]=function(){const _0x3cf055=_0x444eb4,_0x339cfa=VisuMZ[_0x3cf055(0x25c)][_0x3cf055(0x90c)][_0x3cf055(0x5e7)]['BaseTroopIDs'],_0x1f368a=[];for(const _0x538010 of _0x339cfa){const _0x102710=$dataTroops[_0x538010];if(_0x102710)_0x1f368a[_0x3cf055(0x12b)](JsonEx['makeDeepCopy'](_0x102710));}for(const _0x2d03b2 of $dataTroops){if(!_0x2d03b2)continue;for(const _0x35b350 of _0x1f368a){if(_0x35b350['id']===_0x2d03b2['id'])continue;_0x2d03b2['pages']=_0x2d03b2['pages'][_0x3cf055(0x3ec)](_0x35b350[_0x3cf055(0x851)]);}}},Scene_Boot['prototype'][_0x444eb4(0x258)]=function(){const _0x575a53=_0x444eb4,_0x5172c3=$dataSkills[_0x575a53(0x3ec)]($dataItems);for(const _0x48727d of _0x5172c3){if(!_0x48727d)continue;VisuMZ[_0x575a53(0x25c)][_0x575a53(0x31b)](_0x48727d);}},VisuMZ[_0x444eb4(0x25c)]['ParseActorNotetags']=VisuMZ[_0x444eb4(0x816)],VisuMZ[_0x444eb4(0x816)]=function(_0x4fa234){const _0x4be0ad=_0x444eb4;VisuMZ[_0x4be0ad(0x25c)][_0x4be0ad(0x816)]['call'](this,_0x4fa234),VisuMZ['BattleCore'][_0x4be0ad(0x8f8)](_0x4fa234);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x68c)]=VisuMZ[_0x444eb4(0x68c)],VisuMZ[_0x444eb4(0x68c)]=function(_0x17dcb0){const _0x890607=_0x444eb4;VisuMZ[_0x890607(0x25c)][_0x890607(0x68c)][_0x890607(0x315)](this,_0x17dcb0),VisuMZ[_0x890607(0x25c)][_0x890607(0x8f8)](_0x17dcb0);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x5bf)]=VisuMZ[_0x444eb4(0x5bf)],VisuMZ[_0x444eb4(0x5bf)]=function(_0x106e02){const _0x17d86b=_0x444eb4;VisuMZ['BattleCore'][_0x17d86b(0x5bf)]['call'](this,_0x106e02),VisuMZ[_0x17d86b(0x25c)]['Parse_Notetags_Action'](_0x106e02),VisuMZ[_0x17d86b(0x25c)]['Parse_Notetags_Targets'](_0x106e02);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x434)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x444eb4(0x434)]=function(_0x147199){const _0x1d5544=_0x444eb4;VisuMZ[_0x1d5544(0x25c)][_0x1d5544(0x434)]['call'](this,_0x147199),VisuMZ[_0x1d5544(0x25c)][_0x1d5544(0x5d2)](_0x147199),VisuMZ[_0x1d5544(0x25c)]['Parse_Notetags_Targets'](_0x147199);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x1ff)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x444eb4(0x1ff)]=function(_0x583448){const _0x41666f=_0x444eb4;VisuMZ['BattleCore'][_0x41666f(0x1ff)][_0x41666f(0x315)](this,_0x583448),VisuMZ[_0x41666f(0x25c)]['Parse_Notetags_TraitObjects'](_0x583448);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x116)]=VisuMZ[_0x444eb4(0x116)],VisuMZ[_0x444eb4(0x116)]=function(_0x468875){const _0x1b6efa=_0x444eb4;VisuMZ[_0x1b6efa(0x25c)][_0x1b6efa(0x116)]['call'](this,_0x468875),VisuMZ[_0x1b6efa(0x25c)]['Parse_Notetags_TraitObjects'](_0x468875);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x256)]=VisuMZ[_0x444eb4(0x256)],VisuMZ[_0x444eb4(0x256)]=function(_0x31d4dc){const _0xbf739b=_0x444eb4;VisuMZ['BattleCore']['ParseEnemyNotetags']['call'](this,_0x31d4dc),VisuMZ[_0xbf739b(0x25c)][_0xbf739b(0x8f8)](_0x31d4dc);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x593)]=VisuMZ[_0x444eb4(0x593)],VisuMZ[_0x444eb4(0x593)]=function(_0x3c92b2){const _0x2fbaed=_0x444eb4;VisuMZ[_0x2fbaed(0x25c)][_0x2fbaed(0x593)][_0x2fbaed(0x315)](this,_0x3c92b2),VisuMZ[_0x2fbaed(0x25c)][_0x2fbaed(0x8f8)](_0x3c92b2);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x5d2)]=function(_0x3dc4ec){const _0x491e14=_0x444eb4,_0x10cbf8=['PreApplyJS',_0x491e14(0x1c4),_0x491e14(0x173),'PostDamageJS',_0x491e14(0x5fd),'PostStartActionJS','PreEndActionJS',_0x491e14(0x152)];for(const _0x38b904 of _0x10cbf8){VisuMZ['BattleCore'][_0x491e14(0x47d)](_0x3dc4ec,_0x38b904);}const _0xb73346=_0x3dc4ec[_0x491e14(0x4bb)];_0xb73346[_0x491e14(0x7db)](/<ALWAYS CRITICAL/i)&&(_0x3dc4ec['damage'][_0x491e14(0x915)]=!![]),_0xb73346[_0x491e14(0x7db)](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x3dc4ec[_0x491e14(0x2c2)]=Math[_0x491e14(0x960)](0x1,Number(RegExp['$1']))),_0xb73346['match'](/<TARGET:[ ](.*)>/i)&&(_0x3dc4ec[_0x491e14(0x58f)]=String(RegExp['$1'])[_0x491e14(0x8c0)]()[_0x491e14(0x3af)]());},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x8f8)]=function(_0x210490){const _0x3d8583=_0x444eb4,_0x595dce=[_0x3d8583(0x920),_0x3d8583(0x34e),_0x3d8583(0x5dd),'PostDamageAsUserJS','PreApplyAsTargetJS','PostApplyAsTargetJS',_0x3d8583(0xe9),_0x3d8583(0x650),_0x3d8583(0x5fd),_0x3d8583(0x4c4),_0x3d8583(0x191),'PostEndActionJS',_0x3d8583(0x28f),_0x3d8583(0x552),'PreEndBattleJS',_0x3d8583(0x313),'BattleVictoryJS',_0x3d8583(0x670),_0x3d8583(0x943),'EscapeFailureJS',_0x3d8583(0x334),_0x3d8583(0x112),_0x3d8583(0x21f),'PostEndTurnJS',_0x3d8583(0x860),'PostRegenerateJS'];for(const _0xdf4132 of _0x595dce){VisuMZ[_0x3d8583(0x25c)][_0x3d8583(0x47d)](_0x210490,_0xdf4132);}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x31b)]=function(_0x4de528){const _0x34e2ed=_0x444eb4,_0x4c072a=_0x4de528[_0x34e2ed(0x4bb)];if(_0x4c072a['match'](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){if(_0x34e2ed(0x3e1)!=='dcbcL'){function _0x42b13e(){const _0x2df709=_0x34e2ed,_0x33ad4f=this['weapons'](),_0x3ff10a=_0x33ad4f[0x0]?_0x33ad4f[0x0]['wtypeId']:0x0;return _0xb18b1[_0x2df709(0x54d)][_0x3ff10a];}}else{const _0x1e2f06=String(RegExp['$1']),_0x405802=VisuMZ[_0x34e2ed(0x25c)][_0x34e2ed(0x68a)](_0x4de528,'Targets');VisuMZ['BattleCore'][_0x34e2ed(0x433)](_0x1e2f06,_0x405802);}}if(_0x4c072a['match'](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){if(_0x34e2ed(0x4d3)===_0x34e2ed(0x881)){function _0x1116c2(){const _0x26ffe6=_0x34e2ed;this[_0x26ffe6(0x8bc)]='turn';}}else{const _0x38aefc=String(RegExp['$1']),_0x177e04=VisuMZ[_0x34e2ed(0x25c)]['createKeyJS'](_0x4de528,_0x34e2ed(0x67b));VisuMZ[_0x34e2ed(0x25c)]['createCommandVisibleJS'](_0x38aefc,_0x177e04);}}},VisuMZ[_0x444eb4(0x25c)]['JS']={},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x47d)]=function(_0x22c521,_0x2875b2){const _0x25d1fc=_0x444eb4,_0xe064b3=_0x22c521[_0x25d1fc(0x4bb)];if(_0xe064b3[_0x25d1fc(0x7db)](VisuMZ[_0x25d1fc(0x25c)][_0x25d1fc(0x8a9)][_0x2875b2])){const _0x450124=RegExp['$1'],_0x30b542='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x25d1fc(0x4e2)](_0x450124),_0x5b5821=VisuMZ['BattleCore'][_0x25d1fc(0x68a)](_0x22c521,_0x2875b2);VisuMZ[_0x25d1fc(0x25c)]['JS'][_0x5b5821]=new Function(_0x30b542);}},VisuMZ[_0x444eb4(0x25c)]['createKeyJS']=function(_0x50dd58,_0x37051a){const _0x4cf91c=_0x444eb4;let _0x44ca6b='';if($dataActors[_0x4cf91c(0x8f7)](_0x50dd58))_0x44ca6b=_0x4cf91c(0x5a8)['format'](_0x50dd58['id'],_0x37051a);if($dataClasses['includes'](_0x50dd58))_0x44ca6b='Class-%1-%2'[_0x4cf91c(0x4e2)](_0x50dd58['id'],_0x37051a);if($dataSkills['includes'](_0x50dd58))_0x44ca6b='Skill-%1-%2'[_0x4cf91c(0x4e2)](_0x50dd58['id'],_0x37051a);if($dataItems['includes'](_0x50dd58))_0x44ca6b=_0x4cf91c(0x2a6)['format'](_0x50dd58['id'],_0x37051a);if($dataWeapons['includes'](_0x50dd58))_0x44ca6b=_0x4cf91c(0x8b1)['format'](_0x50dd58['id'],_0x37051a);if($dataArmors[_0x4cf91c(0x8f7)](_0x50dd58))_0x44ca6b=_0x4cf91c(0x310)['format'](_0x50dd58['id'],_0x37051a);if($dataEnemies[_0x4cf91c(0x8f7)](_0x50dd58))_0x44ca6b=_0x4cf91c(0x442)[_0x4cf91c(0x4e2)](_0x50dd58['id'],_0x37051a);if($dataStates[_0x4cf91c(0x8f7)](_0x50dd58))_0x44ca6b=_0x4cf91c(0x505)[_0x4cf91c(0x4e2)](_0x50dd58['id'],_0x37051a);return _0x44ca6b;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x433)]=function(_0xf8a6f,_0x15194b){const _0x195e3c=_0x444eb4,_0x4493ef=_0x195e3c(0x95d)[_0x195e3c(0x4e2)](_0xf8a6f);VisuMZ[_0x195e3c(0x25c)]['JS'][_0x15194b]=new Function(_0x4493ef);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x7de)]=function(_0x3b0fcc,_0x45af7b){const _0x14400a=_0x444eb4,_0x367780=_0x14400a(0x1a4)['format'](_0x3b0fcc);VisuMZ['BattleCore']['JS'][_0x45af7b]=new Function(_0x367780);},TextManager[_0x444eb4(0x25b)]=VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x90c)][_0x444eb4(0x1cb)][_0x444eb4(0x5d7)],TextManager[_0x444eb4(0x3b5)]=VisuMZ['BattleCore'][_0x444eb4(0x90c)][_0x444eb4(0x49d)][_0x444eb4(0x940)],TextManager[_0x444eb4(0x5cc)]=VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x90c)][_0x444eb4(0x49d)][_0x444eb4(0x65d)],TextManager[_0x444eb4(0x46e)]=VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x90c)]['HpGauge'][_0x444eb4(0x7c1)],ColorManager[_0x444eb4(0x95f)]=function(_0x3ade80){const _0x55c425=_0x444eb4;return _0x3ade80=String(_0x3ade80),_0x3ade80['match'](/#(.*)/i)?'#%1'['format'](String(RegExp['$1'])):this[_0x55c425(0x888)](Number(_0x3ade80));},DataManager[_0x444eb4(0x41f)]=function(_0x2bc03a){const _0x18b286=_0x444eb4;if(_0x2bc03a[_0x18b286(0x4bb)][_0x18b286(0x7db)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x477c4f=String(RegExp['$1'])['toUpperCase']()[_0x18b286(0x3af)]();if(_0x477c4f===_0x18b286(0x5f5))return _0x18b286(0x5f5);if(VisuMZ[_0x18b286(0x1ba)][_0x477c4f])return _0x477c4f;}const _0x13e33b=VisuMZ['BattleCore']['Settings'][_0x18b286(0x4b3)][_0x18b286(0x983)]['toUpperCase']()['trim']();if(VisuMZ['DamageStyles'][_0x13e33b])return _0x13e33b;return _0x18b286(0x5f5);},DataManager[_0x444eb4(0x1d3)]=function(_0x44fd8d){const _0x5c8afa=_0x444eb4;_0x44fd8d=_0x44fd8d[_0x5c8afa(0x8c0)]()[_0x5c8afa(0x3af)](),this[_0x5c8afa(0x2bd)]=this['_stypeIDs']||{};if(this[_0x5c8afa(0x2bd)][_0x44fd8d])return this['_stypeIDs'][_0x44fd8d];for(let _0x323a09=0x1;_0x323a09<0x64;_0x323a09++){if(_0x5c8afa(0x53a)===_0x5c8afa(0x53a)){if(!$dataSystem[_0x5c8afa(0xae)][_0x323a09])continue;let _0x5979be=$dataSystem[_0x5c8afa(0xae)][_0x323a09]['toUpperCase']()[_0x5c8afa(0x3af)]();_0x5979be=_0x5979be[_0x5c8afa(0x2bc)](/\x1I\[(\d+)\]/gi,''),_0x5979be=_0x5979be['replace'](/\\I\[(\d+)\]/gi,''),this[_0x5c8afa(0x2bd)][_0x5979be]=_0x323a09;}else{function _0x209ae1(){const _0x5ed562=_0x5c8afa;this[_0x5ed562(0x12b)]('performReflection',_0x357170);if(!_0x3e51e2[_0x5ed562(0x25c)][_0x5ed562(0x90c)]['BattleLog'][_0x5ed562(0x901)])return;this[_0x5ed562(0x12b)](_0x5ed562(0x86e),_0x51763d[_0x5ed562(0x6e6)][_0x5ed562(0x4e2)](_0x3cd39b[_0x5ed562(0x2d2)]()));}}}return this['_stypeIDs'][_0x44fd8d]||0x0;},DataManager[_0x444eb4(0x971)]=function(_0x1cb331){const _0x45ea4c=_0x444eb4;_0x1cb331=_0x1cb331['toUpperCase']()['trim'](),this[_0x45ea4c(0x590)]=this[_0x45ea4c(0x590)]||{};if(this[_0x45ea4c(0x590)][_0x1cb331])return this[_0x45ea4c(0x590)][_0x1cb331];for(const _0xead6ea of $dataSkills){if(_0x45ea4c(0x8c7)!==_0x45ea4c(0x569)){if(!_0xead6ea)continue;this[_0x45ea4c(0x590)][_0xead6ea[_0x45ea4c(0x2d2)][_0x45ea4c(0x8c0)]()[_0x45ea4c(0x3af)]()]=_0xead6ea['id'];}else{function _0x288256(){const _0x2b3773=_0x45ea4c;this[_0x2b3773(0x48a)]='portrait';}}}return this['_skillIDs'][_0x1cb331]||0x0;},DataManager[_0x444eb4(0x2b1)]=function(_0x1d8b49){const _0x3c16b2=_0x444eb4;_0x1d8b49=_0x1d8b49[_0x3c16b2(0x8c0)]()[_0x3c16b2(0x3af)](),this['_enemyIDs']=this['_enemyIDs']||{};if(this[_0x3c16b2(0x7e7)][_0x1d8b49])return this[_0x3c16b2(0x7e7)][_0x1d8b49];for(const _0x2c18b6 of $dataEnemies){if(_0x3c16b2(0x6ad)!==_0x3c16b2(0xd3)){if(!_0x2c18b6)continue;this[_0x3c16b2(0x7e7)][_0x2c18b6[_0x3c16b2(0x2d2)][_0x3c16b2(0x8c0)]()[_0x3c16b2(0x3af)]()]=_0x2c18b6['id'];}else{function _0x17668a(){const _0x353c6c=_0x3c16b2;return this[_0x353c6c(0x69a)]()?this[_0x353c6c(0xf9)]():_0x319590[_0x353c6c(0x25c)][_0x353c6c(0x308)]['call'](this);}}}return this[_0x3c16b2(0x7e7)][_0x1d8b49]||0x0;},DataManager[_0x444eb4(0x345)]=function(_0x181da3){const _0x451da8=_0x444eb4;_0x181da3=_0x181da3['toUpperCase']()['trim'](),this[_0x451da8(0x4a7)]=this[_0x451da8(0x4a7)]||{};if(this[_0x451da8(0x4a7)][_0x181da3])return this[_0x451da8(0x4a7)][_0x181da3];for(let _0x5138db=0x1;_0x5138db<0x64;_0x5138db++){if(!$dataSystem[_0x451da8(0x278)][_0x5138db])continue;let _0x33a2b9=$dataSystem[_0x451da8(0x278)][_0x5138db][_0x451da8(0x8c0)]()[_0x451da8(0x3af)]();_0x33a2b9=_0x33a2b9[_0x451da8(0x2bc)](/\x1I\[(\d+)\]/gi,''),_0x33a2b9=_0x33a2b9[_0x451da8(0x2bc)](/\\I\[(\d+)\]/gi,''),this['_wtypeIDs'][_0x33a2b9]=_0x5138db;}return this[_0x451da8(0x4a7)][_0x451da8(0xe6)]=0x0,this[_0x451da8(0x4a7)][_0x181da3]||0x0;},DataManager[_0x444eb4(0x292)]=function(_0x55e3bb){const _0x20576b=_0x444eb4,_0x284314=_0x20576b(0x369);let _0x59c855=_0x55e3bb[_0x20576b(0x114)],_0x417eb1=_0x55e3bb[_0x20576b(0x2d2)];const _0x5d618d=_0x55e3bb[_0x20576b(0x4bb)];_0x5d618d[_0x20576b(0x7db)](/<DISPLAY ICON: (\d+)>/i)&&(_0x59c855=Number(RegExp['$1']));if(_0x5d618d[_0x20576b(0x7db)](/<DISPLAY TEXT: (.*)>/i)){if(_0x20576b(0x45f)===_0x20576b(0x4f5)){function _0x44d724(){const _0xe62862=_0x20576b;_0x1094d4[_0xe62862(0x25c)]['Scene_Battle_createActorCommandWindow'][_0xe62862(0x315)](this),this[_0xe62862(0x381)]();}}else _0x417eb1=String(RegExp['$1']);}return _0x284314[_0x20576b(0x4e2)](_0x59c855,_0x417eb1);},DataManager[_0x444eb4(0x7a3)]=function(_0x272916){const _0x412875=_0x444eb4;if(_0x272916[_0x412875(0x4bb)]['match'](/<COMMAND TEXT: (.*)>/i)){if(_0x412875(0x8cb)!==_0x412875(0x3d6))return String(RegExp['$1']);else{function _0x1057f7(){const _0x20a14e=_0x412875;return this[_0x20a14e(0x126)];}}}else{if(_0x412875(0x977)!=='TvbzD'){function _0x305a2a(){return this['isForRandomBattleCore']();}}else return _0x272916[_0x412875(0x2d2)];}},DataManager[_0x444eb4(0x48c)]=function(_0x538eee){const _0x242a16=_0x444eb4;return _0x538eee[_0x242a16(0x4bb)][_0x242a16(0x7db)](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x538eee[_0x242a16(0x114)];},DataManager[_0x444eb4(0x356)]=function(_0x1ebc99){const _0x108327=_0x444eb4,_0x54839d=$dataEnemies[_0x1ebc99];if(_0x54839d){if(_0x54839d[_0x108327(0x4bb)]['match'](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x217f01=String(RegExp['$1'])[_0x108327(0x79d)](/[\r\n]+/)['remove'](''),_0x1fc313=this[_0x108327(0x16a)](_0x217f01);_0x1ebc99=this['getEnemyIdWithName'](_0x1fc313)||_0x1ebc99,_0x1ebc99=DataManager[_0x108327(0x356)](_0x1ebc99);}}return _0x1ebc99;},DataManager['processRandomizedData']=function(_0x79b9fa){const _0x27b115=_0x444eb4;let _0x3db1ba=0x0;const _0x1c47cf={};for(const _0x4f56c7 of _0x79b9fa){if(_0x4f56c7['match'](/(.*):[ ](\d+)/i)){if(_0x27b115(0x42b)!==_0x27b115(0x8e4)){const _0x4bb28e=String(RegExp['$1'])[_0x27b115(0x3af)](),_0x57684c=Number(RegExp['$2']);_0x1c47cf[_0x4bb28e]=_0x57684c,_0x3db1ba+=_0x57684c;}else{function _0x1a9036(){const _0x49a655=_0x27b115;this[_0x49a655(0x75d)]();}}}else{if(_0x4f56c7['match'](/(.*):[ ](\d+\.?\d+)/i)){const _0x47b97f=String(RegExp['$1'])[_0x27b115(0x3af)](),_0x555ee5=Number(RegExp['$2']);_0x1c47cf[_0x47b97f]=_0x555ee5,_0x3db1ba+=_0x555ee5;}else{if(_0x4f56c7!==''){if(_0x27b115(0x3d2)!==_0x27b115(0x6c9))_0x1c47cf[_0x4f56c7]=0x1,_0x3db1ba++;else{function _0x115211(){const _0x12f6b1=_0x27b115;if(!_0x31cae7[_0x12f6b1(0x11f)]())return;_0x55b162[_0x12f6b1(0x346)](_0x585b16,_0x23a004);const _0x240bcb=_0x157776['_action'];if(!_0x240bcb)return;let _0x2596a6=_0x4d973b[_0x12f6b1(0x1d2)];_0x240bcb[_0x12f6b1(0x35b)](_0x2596a6);}}}}}}if(_0x3db1ba<=0x0)return'';let _0x21c296=Math[_0x27b115(0x5b2)]()*_0x3db1ba;for(const _0x150566 in _0x1c47cf){_0x21c296-=_0x1c47cf[_0x150566];if(_0x21c296<=0x0)return _0x150566;}return'';},ConfigManager['autoBattleAtStart']=![],ConfigManager[_0x444eb4(0x534)]=![],ConfigManager[_0x444eb4(0x46e)]=!![],VisuMZ[_0x444eb4(0x25c)]['ConfigManager_makeData']=ConfigManager[_0x444eb4(0x145)],ConfigManager['makeData']=function(){const _0x692b48=_0x444eb4,_0x314011=VisuMZ['BattleCore'][_0x692b48(0x98f)][_0x692b48(0x315)](this);return _0x314011[_0x692b48(0x77a)]=this[_0x692b48(0x77a)],_0x314011['autoBattleUseSkills']=this[_0x692b48(0x534)],_0x314011[_0x692b48(0x46e)]=this[_0x692b48(0x46e)],_0x314011;},VisuMZ[_0x444eb4(0x25c)]['ConfigManager_applyData']=ConfigManager[_0x444eb4(0x641)],ConfigManager[_0x444eb4(0x641)]=function(_0x4e6ae7){const _0x3c37f2=_0x444eb4;VisuMZ[_0x3c37f2(0x25c)][_0x3c37f2(0x628)]['call'](this,_0x4e6ae7);_0x3c37f2(0x77a)in _0x4e6ae7?this[_0x3c37f2(0x77a)]=_0x4e6ae7[_0x3c37f2(0x77a)]:this[_0x3c37f2(0x77a)]=![];if('autoBattleUseSkills'in _0x4e6ae7){if(_0x3c37f2(0x184)===_0x3c37f2(0x189)){function _0xbfbf1(){const _0x532ae9=_0x3c37f2;if(!_0x1d64e7[_0x532ae9(0x3a7)])return;if(!_0x37ff23['_scene'][_0x532ae9(0x6e0)])return;if(!_0x19029b['_scene'][_0x532ae9(0x6e0)][_0x532ae9(0x485)])return;return _0x423c55[_0x532ae9(0x3a7)][_0x532ae9(0x6e0)][_0x532ae9(0x485)];}}else this[_0x3c37f2(0x534)]=_0x4e6ae7[_0x3c37f2(0x534)];}else this[_0x3c37f2(0x534)]=![];if(_0x3c37f2(0x46e)in _0x4e6ae7){if(_0x3c37f2(0x2ed)===_0x3c37f2(0x2ed))this['visualHpGauge']=_0x4e6ae7[_0x3c37f2(0x46e)];else{function _0x438e9a(){const _0x2a75d5=_0x3c37f2;this['_autoBattle']=_0x311c30[_0x2a75d5(0x77a)],this[_0x2a75d5(0x35d)](_0x2a75d5(0x28f)),_0x5b8477[_0x2a75d5(0x25c)][_0x2a75d5(0x651)][_0x2a75d5(0x315)](this),this['processBattleCoreJS'](_0x2a75d5(0x552));}}}else{if('WjGCI'===_0x3c37f2(0x6bb)){function _0x492d8a(){const _0x3249a5=_0x3c37f2,_0x21c953=this[_0x3249a5(0x712)](),_0x3ba27d=_0x21c953[_0x3249a5(0x243)]['formula'];_0x21c953[_0x3249a5(0x243)][_0x3249a5(0x401)]=this[_0x3249a5(0x8cf)];let _0x4a88e9=_0x14c034[_0x3249a5(0x25c)]['Game_Action_evalDamageFormula'][_0x3249a5(0x315)](this,_0x236321);return _0x21c953[_0x3249a5(0x243)][_0x3249a5(0x401)]=_0x3ba27d,_0x4a88e9;}}else this[_0x3c37f2(0x46e)]=!![];}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x66b)]=BattleManager['initMembers'],BattleManager[_0x444eb4(0x61f)]=function(){const _0x108fc1=_0x444eb4;VisuMZ['BattleCore'][_0x108fc1(0x66b)]['call'](this),this['_forcedBattlers']=[];},BattleManager[_0x444eb4(0x6cd)]=function(){const _0x2f548d=_0x444eb4;if(!SceneManager['isSceneBattle']())return;const _0x9661d=SceneManager[_0x2f548d(0x3a7)][_0x2f548d(0x6e0)];if(_0x9661d)_0x9661d[_0x2f548d(0x15c)]();},BattleManager[_0x444eb4(0x48b)]=function(){const _0x190184=_0x444eb4;if(BattleManager[_0x190184(0x47f)]())return _0x190184(0x1dd);return'DTB';},BattleManager[_0x444eb4(0x439)]=function(_0x497008){const _0x3f68bf=_0x444eb4;return _0x497008=_0x497008['toUpperCase']()['trim'](),this[_0x3f68bf(0x48b)]()===_0x497008;},BattleManager[_0x444eb4(0x8ee)]=function(){const _0x4bc2bf=_0x444eb4;return this[_0x4bc2bf(0x439)]('DTB');},BattleManager['isTurnBased']=function(){const _0x481d9c=_0x444eb4;return this[_0x481d9c(0x8ee)]();},BattleManager['isTickBased']=function(){const _0x3e0639=_0x444eb4;return!this[_0x3e0639(0x320)]();},BattleManager[_0x444eb4(0x35d)]=function(_0x4dae0b){const _0x4a8d63=_0x444eb4;$gameParty['processBattleCoreJS'](_0x4dae0b),$gameTroop[_0x4a8d63(0x35d)](_0x4dae0b);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x651)]=BattleManager[_0x444eb4(0x33f)],BattleManager[_0x444eb4(0x33f)]=function(){const _0x691823=_0x444eb4;this[_0x691823(0xcc)]=ConfigManager[_0x691823(0x77a)],this[_0x691823(0x35d)](_0x691823(0x28f)),VisuMZ[_0x691823(0x25c)]['BattleManager_startBattle'][_0x691823(0x315)](this),this[_0x691823(0x35d)]('PostStartBattleJS');},BattleManager['processPostBattleCommonEvents']=function(_0x51e7cb){const _0x108cc3=_0x444eb4,_0x5eb196=VisuMZ[_0x108cc3(0x25c)][_0x108cc3(0x90c)][_0x108cc3(0x5e7)];if(_0x5eb196['BattleEndEvent']&&VisuMZ[_0x108cc3(0x25c)]['CheckMapBattleEventValid'](_0x5eb196[_0x108cc3(0x5f9)])){if('nJefv'==='nqHHb'){function _0x4e06ec(){const _0x2fba4a=_0x108cc3;let _0x203f8e=_0x2fba4a(0x7ae);if(this[_0x2fba4a(0x684)](_0x203f8e))return this[_0x2fba4a(0x807)][_0x203f8e];return this[_0x2fba4a(0x807)][_0x203f8e]=this[_0x2fba4a(0x423)](this[_0x2fba4a(0x3d5)]()),this[_0x2fba4a(0x807)][_0x203f8e];}}else $gameTemp[_0x108cc3(0x2a4)](_0x5eb196[_0x108cc3(0x5f9)]);}const _0x201ab4=_0x108cc3(0x1dc)[_0x108cc3(0x4e2)](_0x51e7cb);_0x5eb196[_0x201ab4]&&VisuMZ[_0x108cc3(0x25c)][_0x108cc3(0x234)](_0x5eb196[_0x201ab4])&&$gameTemp[_0x108cc3(0x2a4)](_0x5eb196[_0x201ab4]);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x4f6)]=BattleManager['processVictory'],BattleManager[_0x444eb4(0x392)]=function(){const _0x38649f=_0x444eb4;this[_0x38649f(0x35d)](_0x38649f(0x380)),VisuMZ[_0x38649f(0x25c)][_0x38649f(0x4f6)]['call'](this),this['processPostBattleCommonEvents'](_0x38649f(0x83a));},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x430)]=BattleManager[_0x444eb4(0x7ac)],BattleManager[_0x444eb4(0x7ac)]=function(){const _0x45e843=_0x444eb4;this[_0x45e843(0x35d)](_0x45e843(0x670)),VisuMZ[_0x45e843(0x25c)]['BattleManager_processDefeat'][_0x45e843(0x315)](this),this[_0x45e843(0x13c)]('Defeat');},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x752)]=BattleManager[_0x444eb4(0x935)],BattleManager[_0x444eb4(0x935)]=function(_0x1cfb87){const _0x2f8bdf=_0x444eb4;this['_autoBattle']=![],this['processBattleCoreJS'](_0x2f8bdf(0x359)),VisuMZ[_0x2f8bdf(0x25c)][_0x2f8bdf(0x752)]['call'](this,_0x1cfb87),this[_0x2f8bdf(0x35d)]('PostEndBattleJS');},VisuMZ[_0x444eb4(0x25c)]['BattleManager_startTurn']=BattleManager[_0x444eb4(0x2de)],BattleManager[_0x444eb4(0x2de)]=function(){const _0x1b0a7e=_0x444eb4;if(this['isTurnBased']())this[_0x1b0a7e(0x35d)](_0x1b0a7e(0x334));VisuMZ['BattleCore'][_0x1b0a7e(0x224)]['call'](this);if(this[_0x1b0a7e(0x320)]())this[_0x1b0a7e(0x35d)](_0x1b0a7e(0x112));},VisuMZ[_0x444eb4(0x25c)]['BattleManager_startAction']=BattleManager[_0x444eb4(0x1b1)],BattleManager[_0x444eb4(0x1b1)]=function(){const _0x5d3e04=_0x444eb4,_0x1633fb=this[_0x5d3e04(0xda)]['currentAction']();if(_0x1633fb)_0x1633fb[_0x5d3e04(0x86c)]('PreStartActionJS');VisuMZ[_0x5d3e04(0x25c)][_0x5d3e04(0x347)][_0x5d3e04(0x315)](this);if(_0x1633fb)_0x1633fb[_0x5d3e04(0x86c)]('PostStartActionJS');},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x586)]=BattleManager['endAction'],BattleManager[_0x444eb4(0x834)]=function(){const _0x3b4eb6=_0x444eb4,_0x33bb23=this['_action'];if(_0x33bb23)_0x33bb23[_0x3b4eb6(0x86c)](_0x3b4eb6(0x191));VisuMZ[_0x3b4eb6(0x25c)][_0x3b4eb6(0x586)][_0x3b4eb6(0x315)](this);if(_0x33bb23)_0x33bb23[_0x3b4eb6(0x86c)]('PostEndActionJS');this[_0x3b4eb6(0x61a)](this[_0x3b4eb6(0x527)]());},BattleManager[_0x444eb4(0x61a)]=function(_0x527f7e){const _0x15cf62=_0x444eb4;for(const _0x1a540b of _0x527f7e){if(!_0x1a540b)continue;if(!_0x1a540b[_0x15cf62(0x7f2)]())continue;_0x1a540b[_0x15cf62(0x7f2)]()[_0x15cf62(0x3a5)]();}},BattleManager[_0x444eb4(0x51e)]=function(){const _0x2b13ac=_0x444eb4;!this[_0x2b13ac(0x1e1)][_0x2b13ac(0x95b)]()&&this[_0x2b13ac(0x834)]();},BattleManager[_0x444eb4(0x8b3)]=function(){const _0x380efc=_0x444eb4;this[_0x380efc(0x413)]=VisuMZ['BattleCore']['Settings'][_0x380efc(0x5e7)][_0x380efc(0x8ae)]['call'](this);},VisuMZ[_0x444eb4(0x25c)]['BattleManager_onEscapeSuccess']=BattleManager[_0x444eb4(0x4cc)],BattleManager[_0x444eb4(0x4cc)]=function(){const _0x1391d0=_0x444eb4;this['processBattleCoreJS'](_0x1391d0(0x943)),BattleManager['_spriteset'][_0x1391d0(0x128)](),VisuMZ[_0x1391d0(0x25c)][_0x1391d0(0x611)][_0x1391d0(0x315)](this),this[_0x1391d0(0x13c)](_0x1391d0(0x489));},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x40f)]=BattleManager[_0x444eb4(0x98d)],BattleManager['onEscapeFailure']=function(){const _0x41412d=_0x444eb4;this[_0x41412d(0x35d)]('EscapeFailureJS');const _0x3a28cd=this['_escapeRatio'];VisuMZ['BattleCore']['BattleManager_onEscapeFailure'][_0x41412d(0x315)](this),this['_escapeRatio']=_0x3a28cd+VisuMZ[_0x41412d(0x25c)][_0x41412d(0x90c)][_0x41412d(0x5e7)][_0x41412d(0x1bd)][_0x41412d(0x315)](this),this[_0x41412d(0x13c)]('EscapeFail');},BattleManager[_0x444eb4(0x84c)]=function(){const _0x4b0337=_0x444eb4;let _0x18e9f4=![];if(this[_0x4b0337(0x3da)]()){if(_0x4b0337(0x4d0)!==_0x4b0337(0x4d0)){function _0x1ca828(){const _0x2c47c9=_0x4b0337;this[_0x2c47c9(0x2c8)]['visible']=this[_0x2c47c9(0x2d8)]();}}else for(const _0x5c867e of $gameTroop[_0x4b0337(0x3ff)]()){if('gVOYZ'===_0x4b0337(0x317)){function _0x35d05c(){this['selectNextCommand']();}}else this[_0x4b0337(0x1e1)][_0x4b0337(0x12b)]('addText',TextManager[_0x4b0337(0x82d)][_0x4b0337(0x4e2)](_0x5c867e)),this[_0x4b0337(0x1e1)][_0x4b0337(0x12b)](_0x4b0337(0x7f3)),_0x18e9f4=!![];}}if(this['_preemptive'])this[_0x4b0337(0x1e1)][_0x4b0337(0x12b)](_0x4b0337(0x86e),TextManager[_0x4b0337(0x4ec)][_0x4b0337(0x4e2)]($gameParty['name']())),this[_0x4b0337(0x1e1)]['push'](_0x4b0337(0x7f3));else this[_0x4b0337(0x2e7)]&&(this[_0x4b0337(0x1e1)]['push'](_0x4b0337(0x86e),TextManager[_0x4b0337(0x80f)][_0x4b0337(0x4e2)]($gameParty[_0x4b0337(0x2d2)]())),this['_logWindow'][_0x4b0337(0x12b)](_0x4b0337(0x7f3)));_0x18e9f4&&(this['_logWindow']['push'](_0x4b0337(0x7f3)),this['_logWindow'][_0x4b0337(0x12b)](_0x4b0337(0x7f0)));if(this[_0x4b0337(0x47f)]()&&this['isSkipPartyCommandWindow']()){if(_0x4b0337(0x461)===_0x4b0337(0x461))this[_0x4b0337(0x683)]=![];else{function _0x5a2e51(){const _0x579d6f=_0x4b0337;_0x15f87f[_0x579d6f(0x268)][_0x579d6f(0x298)]['call'](this,_0x245099),this[_0x579d6f(0x949)](_0x58d699);}}}},BattleManager['isDisplayEmergedEnemies']=function(){const _0x4f5b6f=_0x444eb4;if(BattleManager['_autoBattle'])return![];return VisuMZ[_0x4f5b6f(0x25c)][_0x4f5b6f(0x90c)]['Enemy'][_0x4f5b6f(0x318)];},VisuMZ[_0x444eb4(0x25c)]['BattleManager_startInput']=BattleManager['startInput'],BattleManager['startInput']=function(){const _0x1a8c92=_0x444eb4;VisuMZ[_0x1a8c92(0x25c)][_0x1a8c92(0x445)][_0x1a8c92(0x315)](this);if(this[_0x1a8c92(0x8ee)]()&&this[_0x1a8c92(0x2ea)]()&&!this[_0x1a8c92(0x2e7)]&&$gameParty[_0x1a8c92(0x5f4)]()){if('FpVOh'!=='FpVOh'){function _0x211c0f(){const _0x25746f=_0x1a8c92;this[_0x25746f(0x60f)](_0x25746f(0x802));}}else this[_0x1a8c92(0xd0)]();}},BattleManager['isSkipPartyCommandWindow']=function(){const _0x12f06a=_0x444eb4;return VisuMZ[_0x12f06a(0x25c)][_0x12f06a(0x90c)]['PartyCmd']['SkipPartyCmd'];},BattleManager[_0x444eb4(0x4c1)]=function(){const _0x274c58=_0x444eb4;if(this['isPartyTpbInputtable']()){if(_0x274c58(0x15e)!==_0x274c58(0x15e)){function _0x3ff0b6(){const _0x1038b9=_0x274c58;if(_0x3a5875){const _0x44fd87=_0x42eb4f[_0x1038b9(0x221)](_0x273fa7);return _0x44fd87>=0x0?[_0x81c32a[_0x44fd87-0x1]||_0x1229e0]:[_0x48db7b];}}}else this[_0x274c58(0xd0)]();}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x4ae)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x2d9)],Scene_Battle[_0x444eb4(0x268)]['startActorCommandSelection']=function(){const _0x53a3b5=_0x444eb4;VisuMZ[_0x53a3b5(0x25c)][_0x53a3b5(0x4ae)][_0x53a3b5(0x315)](this);if(BattleManager[_0x53a3b5(0x47f)]()&&BattleManager['_tpbNeedsPartyCommand']){if(_0x53a3b5(0x1d9)!==_0x53a3b5(0x453))BattleManager[_0x53a3b5(0x683)]=![],this[_0x53a3b5(0x995)]();else{function _0xf50df9(){const _0x8cc9ee=_0x53a3b5,_0x4b29ce=this['getAttackMotion']();return _0x4b29ce?_0x4b29ce[_0x8cc9ee(0x21b)]:0x0;}}}},BattleManager[_0x444eb4(0x57c)]=function(_0x1db989,_0x344aa9){const _0x31f1eb=_0x444eb4;this[_0x31f1eb(0x274)]['_reflectionTarget']=_0x344aa9,this['_logWindow'][_0x31f1eb(0x25e)](_0x344aa9),this[_0x31f1eb(0x1e1)][_0x31f1eb(0x24b)](_0x1db989,this[_0x31f1eb(0x274)]),this[_0x31f1eb(0x274)][_0x31f1eb(0x5ea)](_0x1db989),this['_logWindow'][_0x31f1eb(0x154)](_0x1db989,_0x1db989);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x669)]=BattleManager[_0x444eb4(0x3c0)],BattleManager['updatePhase']=function(_0x1f19d1){const _0x875c34=_0x444eb4;if(this[_0x875c34(0x8bc)]==='custom')this['updateCustomActionSequence']();else{if(this[_0x875c34(0x8bc)]==='forceAction'){if(_0x875c34(0x66a)!==_0x875c34(0x16f))this['updateForceAction']();else{function _0x1f756f(){const _0x598708=_0x875c34;return this[_0x598708(0x888)](_0x5467ad(_0x38ec37));}}}else{if(_0x875c34(0x791)===_0x875c34(0x791))VisuMZ['BattleCore']['BattleManager_updatePhase'][_0x875c34(0x315)](this,_0x1f19d1);else{function _0x2e1e39(){const _0xd30c84=_0x875c34;return _0x2b81bf[_0xd30c84(0x25c)][_0xd30c84(0x1b6)][_0xd30c84(0x315)](this);}}}}},BattleManager[_0x444eb4(0x516)]=function(){const _0x24c025=_0x444eb4;this[_0x24c025(0x7e6)]=this['_targets'][_0x24c025(0x749)](0x0),this[_0x24c025(0xf1)]=0x0,this[_0x24c025(0x42e)]=this[_0x24c025(0x7e6)][0x0]||null,this[_0x24c025(0x8bc)]=_0x24c025(0x4f7);},BattleManager[_0x444eb4(0xcf)]=function(){const _0x3fdda7=_0x444eb4;if(!this[_0x3fdda7(0x238)]()&&!this[_0x3fdda7(0x1e1)][_0x3fdda7(0x95b)]()){if(_0x3fdda7(0x157)!==_0x3fdda7(0x4e1))this[_0x3fdda7(0x8bc)]=_0x3fdda7(0x4fb);else{function _0x14150f(){const _0x472d4c=_0x3fdda7;this[_0x472d4c(0x427)][_0x472d4c(0x8fa)][_0x472d4c(0x49b)]!==this[_0x472d4c(0x701)][_0x472d4c(0x44b)]()&&(this[_0x472d4c(0x427)][_0x472d4c(0x8fa)][_0x472d4c(0x49b)]=this['_battler']['battlerSmoothImage']());}}}},BattleManager[_0x444eb4(0x932)]=function(_0x4770e2){const _0x9fcfdd=_0x444eb4;this['_actionBattlers'][_0x9fcfdd(0x580)](_0x4770e2);if(_0x4770e2===this[_0x9fcfdd(0xda)])return;const _0x287056=JsonEx[_0x9fcfdd(0x1f1)](_0x4770e2[_0x9fcfdd(0x12f)]());this[_0x9fcfdd(0x499)][_0x9fcfdd(0x12b)]([_0x4770e2,_0x287056]);},BattleManager['processForcedAction']=function(){},BattleManager[_0x444eb4(0x957)]=function(){const _0x3938db=_0x444eb4;if(this[_0x3938db(0x47f)]())this['_phase']=_0x3938db(0x646);else{if(this[_0x3938db(0x499)][_0x3938db(0x34a)]>0x0)this['_phase']=_0x3938db(0x646);else{if(_0x3938db(0xdb)!==_0x3938db(0xdb)){function _0x36e36b(){const _0x26a4de=_0x3938db;return this[_0x26a4de(0x366)]();}}else this[_0x3938db(0x2c3)]();}}},BattleManager['getNextSubject']=function(){const _0x4ac468=_0x444eb4;for(;;){if(_0x4ac468(0x2f8)!=='KVKGS'){function _0x1727c9(){return!![];}}else{const _0x4f65b6=this['getNextSubjectFromPool']();if(!_0x4f65b6){if('SidSw'===_0x4ac468(0x314)){function _0x19395e(){const _0x202473=_0x4ac468,_0x49e490=_0x262166[_0x202473(0xbd)]('['+_0x3c541f['$1'][_0x202473(0x7db)](/\d+/g)+']');for(const _0x2170c8 of _0x49e490){if(!_0x116c92['value'](_0x2170c8))return!![];}return![];}}else return null;}if(_0x4f65b6[_0x4ac468(0x121)]()&&_0x4f65b6[_0x4ac468(0x734)]())return _0x4f65b6;}}},BattleManager[_0x444eb4(0x351)]=function(){const _0x522152=_0x444eb4;if(this[_0x522152(0x499)][_0x522152(0x34a)]>0x0){const _0x5996ac=this[_0x522152(0x499)][_0x522152(0x29b)](),_0x3a5966=_0x5996ac[0x0];return _0x3a5966['_actions']=_0x3a5966[_0x522152(0x5c4)]||[],_0x3a5966[_0x522152(0x5c4)][0x0]=_0x5996ac[0x1],_0x3a5966;}else return this[_0x522152(0x4ef)][_0x522152(0x29b)]();},VisuMZ['BattleCore'][_0x444eb4(0x357)]=Game_Battler['prototype'][_0x444eb4(0x932)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x932)]=function(_0x4c42c6,_0xe88875){const _0x264925=_0x444eb4;VisuMZ[_0x264925(0x25c)][_0x264925(0x357)][_0x264925(0x315)](this,_0x4c42c6,_0xe88875),this[_0x264925(0x5c4)][this[_0x264925(0x5c4)][_0x264925(0x34a)]-0x1][_0x264925(0x952)]=!![];},Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x77c)]=function(_0x224505){const _0x25f7aa=_0x444eb4;return this[_0x25f7aa(0x8a5)](_0x224505[0x0],_0x224505[0x1],_0x1e722e=>{const _0x466c0e=_0x25f7aa;if(!_0x1e722e[_0x466c0e(0x7c8)]()){if(_0x466c0e(0x855)!=='LndyI')_0x1e722e[_0x466c0e(0x932)](_0x224505[0x2],_0x224505[0x3]),BattleManager['forceAction'](_0x1e722e);else{function _0x3d9b5b(){const _0x35005f=_0x466c0e;return this[_0x35005f(0x627)];}}}}),!![];},VisuMZ[_0x444eb4(0x25c)]['BattleManager_selectNextCommand']=BattleManager[_0x444eb4(0xd0)],BattleManager[_0x444eb4(0xd0)]=function(){const _0x56b32a=_0x444eb4;if(this[_0x56b32a(0x47f)]()){if('mNfGe'===_0x56b32a(0x5d9)){function _0x3ab462(){const _0x34919f=_0x56b32a;let _0x59f713=-0x10,_0x1928ea=this[_0x34919f(0x773)]*0.5;const _0x4601e4=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x33328c=this[_0x34919f(0x701)][_0x34919f(0x1e5)]()[_0x34919f(0x99d)](_0x2a8bc9=>_0x2a8bc9&&_0x2a8bc9['note'][_0x34919f(0x7db)](_0x4601e4)?_0x409ae0(_0x30cc17['$1']):0x0),_0x435ff5=this[_0x34919f(0x701)][_0x34919f(0x1e5)]()[_0x34919f(0x99d)](_0x23d1d0=>_0x23d1d0&&_0x23d1d0[_0x34919f(0x4bb)][_0x34919f(0x7db)](_0x4601e4)?_0x2fe313(_0x46399f['$2']):0x0);_0x59f713=_0x33328c[_0x34919f(0x254)]((_0x5799b6,_0x450ad2)=>_0x5799b6+_0x450ad2,_0x59f713),_0x1928ea=_0x435ff5[_0x34919f(0x254)]((_0x57a366,_0x3377ed)=>_0x57a366+_0x3377ed,_0x1928ea),this[_0x34919f(0x443)]['x']=_0x59f713,this[_0x34919f(0x443)]['y']=_0x1928ea,this[_0x34919f(0x443)][_0x34919f(0x54f)]();}}else this['selectNextCommandTpb']();}else{if(_0x56b32a(0x61c)!==_0x56b32a(0x61c)){function _0x51c453(){const _0x54020e=_0x56b32a;this['_effectsContainer']=new _0x21e30c(),this[_0x54020e(0x86a)](this[_0x54020e(0x485)]);}}else VisuMZ[_0x56b32a(0x25c)][_0x56b32a(0x600)][_0x56b32a(0x315)](this);}},BattleManager[_0x444eb4(0xee)]=function(){const _0x91e095=_0x444eb4;if(this[_0x91e095(0x4b8)]){if(this[_0x91e095(0x4b8)][_0x91e095(0xd0)]())return;this['finishActorInput'](),this[_0x91e095(0x7b9)](),!this[_0x91e095(0xda)]&&!this[_0x91e095(0x4b8)]&&SceneManager['_scene']['updateBattleProcess']();}else!this[_0x91e095(0xda)]&&this[_0x91e095(0x945)]();},BattleManager['checkTpbInputClose']=function(){const _0x13bf3e=_0x444eb4;if(!this[_0x13bf3e(0x57a)]()||this['needsActorInputCancel']()){if(_0x13bf3e(0x7c0)!=='MSGYg')this[_0x13bf3e(0x70f)](),this[_0x13bf3e(0x4b8)]=null,this[_0x13bf3e(0x1d5)]=![];else{function _0x460ac5(){const _0x1bf9c4=_0x13bf3e;if(!_0x3f71c8['isSceneBattle']())return;if(!_0x12d7a7[_0x1bf9c4(0x98a)])return;const _0x38f717=_0x16514a['_action'];if(!_0x38f717)return;_0x38f717[_0x1bf9c4(0x721)]();}}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x7cb)]=BattleManager[_0x444eb4(0x135)],BattleManager['isTpbMainPhase']=function(){const _0xc627f2=_0x444eb4;if(this[_0xc627f2(0x8bc)]===_0xc627f2(0x4f7))return this[_0xc627f2(0x52c)]();else{if('dzTGw'==='dzTGw')return VisuMZ[_0xc627f2(0x25c)]['BattleManager_isTpbMainPhase'][_0xc627f2(0x315)](this);else{function _0x27fc19(){const _0x5dc9b5=_0xc627f2;if(this['hasSvBattler']())this['_svBattlerSprite'][_0x5dc9b5(0x3a5)]();}}}},BattleManager[_0x444eb4(0x52c)]=function(){const _0x625bb6=_0x444eb4;return this[_0x625bb6(0x179)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x14c)]=BattleManager[_0x444eb4(0x70f)],BattleManager[_0x444eb4(0x70f)]=function(){const _0x556ed0=_0x444eb4;this['isTpb']()&&this[_0x556ed0(0x8bc)]==='battleEnd'&&(this[_0x556ed0(0x4b8)]=null),VisuMZ[_0x556ed0(0x25c)][_0x556ed0(0x14c)][_0x556ed0(0x315)](this);},SceneManager[_0x444eb4(0x11f)]=function(){const _0x475c1e=_0x444eb4;return this[_0x475c1e(0x3a7)]&&this[_0x475c1e(0x3a7)]['constructor']===Scene_Battle;},SceneManager[_0x444eb4(0x35e)]=function(){const _0x2363f4=_0x444eb4;return Spriteset_Battle[_0x2363f4(0x268)][_0x2363f4(0x711)]();},SceneManager[_0x444eb4(0x330)]=function(){const _0x7268b0=_0x444eb4;if(SceneManager[_0x7268b0(0x1b8)](Scene_Options))return!![];return![];},SceneManager['isNextSceneBattleTransitionable']=function(){if(SceneManager['isNextScene'](Scene_Options))return!![];return![];},VisuMZ['BattleCore'][_0x444eb4(0x789)]=Game_Temp[_0x444eb4(0x268)][_0x444eb4(0x979)],Game_Temp[_0x444eb4(0x268)][_0x444eb4(0x979)]=function(_0x12e1d8,_0x1e866d,_0x2adb85){const _0x2c57bd=_0x444eb4;_0x12e1d8=_0x12e1d8['filter']((_0x4e97ad,_0x5efbb5,_0x15b045)=>_0x15b045[_0x2c57bd(0x221)](_0x4e97ad)===_0x5efbb5);if(SceneManager[_0x2c57bd(0x11f)]()&&SceneManager[_0x2c57bd(0x35e)]()){if(_0x2c57bd(0x47b)!==_0x2c57bd(0x47b)){function _0x5e6b4a(){const _0x15236f=_0x2c57bd,_0x107cb5=_0x36fbff[_0x15236f(0xbd)]('['+_0x991e9['$1'][_0x15236f(0x7db)](/\d+/g)+']');for(const _0x2e3c8a of _0x107cb5){if(!_0x5331d4[_0x15236f(0x573)](_0x2e3c8a))return!![];}return![];}}else _0x2adb85=!_0x2adb85;}VisuMZ[_0x2c57bd(0x25c)][_0x2c57bd(0x789)][_0x2c57bd(0x315)](this,_0x12e1d8,_0x1e866d,_0x2adb85),SceneManager[_0x2c57bd(0x11f)]()&&BattleManager[_0x2c57bd(0x60c)][_0x2c57bd(0x902)]();},Game_Temp[_0x444eb4(0x268)][_0x444eb4(0x2b4)]=function(_0x82af41){const _0x730080=_0x444eb4;this[_0x730080(0x471)]=_0x82af41;},Game_Temp['prototype'][_0x444eb4(0x283)]=function(){const _0x5024a2=_0x444eb4;return this[_0x5024a2(0x471)];},Game_Temp[_0x444eb4(0x268)][_0x444eb4(0x753)]=function(){const _0x16570d=_0x444eb4;this[_0x16570d(0x48a)]=undefined;},Game_Temp[_0x444eb4(0x268)]['applyForcedGameTroopSettingsBattleCore']=function(_0x583334){const _0x1864c2=_0x444eb4;$gameMap&&$dataMap&&$dataMap[_0x1864c2(0x4bb)]&&this['parseForcedGameTroopSettingsBattleCore']($dataMap[_0x1864c2(0x4bb)]);const _0x3f2384=$dataTroops[_0x583334];_0x3f2384&&this[_0x1864c2(0x28c)](_0x3f2384[_0x1864c2(0x2d2)]);},Game_Temp[_0x444eb4(0x268)][_0x444eb4(0x28c)]=function(_0x19eb76){const _0x49d3ef=_0x444eb4;if(!_0x19eb76)return;if(_0x19eb76[_0x49d3ef(0x7db)](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){if(_0x49d3ef(0x476)!==_0x49d3ef(0x476)){function _0x37da91(){const _0x135e77=_0x49d3ef;_0x94f6b1=_0x7ef793*this['_multipliers']['damageRate'],_0x3304b7+=this['_multipliers'][_0x135e77(0x444)]*(_0x28fa0d>=0x0?0x1:-0x1),_0x34768f=this[_0x135e77(0x941)]('PreDamage%1JS',_0x48a4a7,_0x3779c7,![]),_0xcd4ebb=this[_0x135e77(0x4df)](_0x3c2e17),_0x515417=_0x310645[_0x135e77(0x29d)](_0x487d71),this[_0x135e77(0xd7)]=_0x2f209c,this['_totalValue']=this[_0x135e77(0x5a5)]||0x0,this[_0x135e77(0x5a5)]+=_0x12c6f4,_0x3381cf['BattleCore']['Game_Action_executeDamage']['call'](this,_0x45ef11,_0x3798cc),this[_0x135e77(0x941)](_0x135e77(0x7fb),_0x16145e,_0x2834c0,!![]);}}else{const _0x44e06e=String(RegExp['$1']);if(_0x44e06e[_0x49d3ef(0x7db)](/DEFAULT/i))this[_0x49d3ef(0x48a)]=_0x49d3ef(0x33d);else{if(_0x44e06e[_0x49d3ef(0x7db)](/LIST/i))this[_0x49d3ef(0x48a)]=_0x49d3ef(0x12c);else{if(_0x44e06e['match'](/XP/i))this[_0x49d3ef(0x48a)]='xp';else{if(_0x44e06e['match'](/PORTRAIT/i)){if('tKAPW'===_0x49d3ef(0xc5)){function _0x538ca4(){const _0x5da75e=_0x49d3ef;this['_svBattlerSprite']=new _0x120b0a(_0x105363),this[_0x5da75e(0x7d5)]();}}else this[_0x49d3ef(0x48a)]=_0x49d3ef(0x245);}else{if(_0x44e06e[_0x49d3ef(0x7db)](/BORDER/i)){if(_0x49d3ef(0x870)!==_0x49d3ef(0x870)){function _0x45db9c(){const _0xe79260=_0x49d3ef;_0x309f9c[_0xe79260(0x12b)](_0x360767[_0xe79260(0x1d1)]());}}else this[_0x49d3ef(0x48a)]='border';}}}}}}}},VisuMZ[_0x444eb4(0x25c)]['Game_System_initialize']=Game_System['prototype'][_0x444eb4(0x3c7)],Game_System[_0x444eb4(0x268)][_0x444eb4(0x3c7)]=function(){const _0x6e94c1=_0x444eb4;VisuMZ[_0x6e94c1(0x25c)][_0x6e94c1(0x69f)][_0x6e94c1(0x315)](this),this['initBattleCore']();},Game_System[_0x444eb4(0x268)][_0x444eb4(0x976)]=function(){const _0x30c6fa=_0x444eb4;this[_0x30c6fa(0x575)]=this[_0x30c6fa(0x575)]||[];},Game_System['prototype']['getDefeatedEnemies']=function(){const _0x1ac1ad=_0x444eb4;if(this[_0x1ac1ad(0x575)]===undefined)this[_0x1ac1ad(0x976)]();return this['_defeatedEnemies'];},Game_System[_0x444eb4(0x268)]['registerDefeatedEnemy']=function(_0xf1c43f){const _0x52a81f=_0x444eb4;if(this[_0x52a81f(0x575)]===undefined)this[_0x52a81f(0x976)]();if(!_0xf1c43f)return;if(this['_defeatedEnemies'][_0x52a81f(0x8f7)](_0xf1c43f))return;this[_0x52a81f(0x575)][_0x52a81f(0x12b)](_0xf1c43f),this['_defeatedEnemies'][_0x52a81f(0x8b7)]((_0x2d08c7,_0x32ef4d)=>_0x2d08c7-_0x32ef4d);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x2e9)]=Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x3ba)],Game_BattlerBase['prototype'][_0x444eb4(0x3ba)]=function(_0x4ffbcf){const _0x4effda=_0x444eb4,_0x1a0ff5=this[_0x4effda(0x734)](),_0x2318f9=this[_0x4effda(0x907)]();VisuMZ['BattleCore'][_0x4effda(0x2e9)][_0x4effda(0x315)](this,_0x4ffbcf);this[_0x4effda(0x5e6)]()&&_0x1a0ff5&&this[_0x4effda(0xc9)]()&&(this[_0x4effda(0x59b)]=!this[_0x4effda(0x553)](),$gameSystem[_0x4effda(0x6d5)](this[_0x4effda(0x788)]()));if(SceneManager['isSceneBattle']()&&_0x2318f9!==this[_0x4effda(0x907)]()){if(_0x4effda(0x19a)===_0x4effda(0x19a))this['battler']()&&this[_0x4effda(0x7f2)]()[_0x4effda(0x3a5)]();else{function _0x1d418f(){const _0x5a9f39=_0x4effda;if(_0x1e25c7['_battler'][_0x5a9f39(0x73d)]()&&_0x45bde2[_0x5a9f39(0x701)][_0x5a9f39(0x5e6)]())return 0x1;else{if(_0x503fcf[_0x5a9f39(0x701)]['isActor']()&&_0xa35747[_0x5a9f39(0x701)]['isEnemy']())return-0x1;}}}}},Game_Enemy[_0x444eb4(0x268)]['hasBeenDefeatedBefore']=function(){const _0x4364ac=_0x444eb4;return $gameSystem[_0x4364ac(0x833)]()[_0x4364ac(0x8f7)](this[_0x4364ac(0x2fb)]);},VisuMZ['BattleCore'][_0x444eb4(0x5ee)]=Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x59f)],Game_BattlerBase[_0x444eb4(0x268)]['eraseState']=function(_0x402626){const _0x335272=_0x444eb4;VisuMZ['BattleCore'][_0x335272(0x5ee)]['call'](this,_0x402626);this[_0x335272(0x5e6)]()&&_0x402626===this[_0x335272(0x89e)]()&&this[_0x335272(0x734)]()&&(this['_visualHpGauge_JustDied']=![]);if(SceneManager[_0x335272(0x11f)]()){if('oUFQc'==='BqULg'){function _0x117b02(){const _0x2a08fa=_0x335272;return this[_0x2a08fa(0x59d)][_0x4eaa66];}}else this[_0x335272(0x1da)]();}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x6ee)]=Game_Action[_0x444eb4(0x268)][_0x444eb4(0x7f0)],Game_Action[_0x444eb4(0x268)]['clear']=function(){const _0x24b8e3=_0x444eb4;VisuMZ['BattleCore'][_0x24b8e3(0x6ee)][_0x24b8e3(0x315)](this),this[_0x24b8e3(0x56b)]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x24b8e3(0x15d)]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0x24b8e3(0x8cf)]=_0x24b8e3(0x33d);},Game_Action[_0x444eb4(0x268)]['makeDamageValue']=function(_0x3d0825,_0x94d705){const _0x967059=_0x444eb4;return VisuMZ['BattleCore']['Settings']['Damage'][_0x967059(0x1f3)][_0x967059(0x315)](this,_0x3d0825,_0x94d705);},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x924)]=function(_0x2bf3f5,_0x3b9ada){const _0x5c42a6=_0x444eb4;return VisuMZ['BattleCore']['Settings'][_0x5c42a6(0x4b3)][_0x5c42a6(0x7a6)][_0x5c42a6(0x315)](this,_0x2bf3f5,_0x3b9ada);},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x482)]=function(_0x2d4dcd,_0x54a287){const _0x5f52a7=_0x444eb4;return VisuMZ['BattleCore']['Settings'][_0x5f52a7(0x4b3)][_0x5f52a7(0x6f9)]['call'](this,_0x2d4dcd,_0x54a287);},VisuMZ['BattleCore'][_0x444eb4(0x3dc)]=Game_Action[_0x444eb4(0x268)][_0x444eb4(0x344)],Game_Action[_0x444eb4(0x268)][_0x444eb4(0x344)]=function(_0x2f1c48){const _0x263cb8=_0x444eb4,_0x1b87dc=this[_0x263cb8(0x712)]()[_0x263cb8(0x4bb)];if(_0x1b87dc['match'](/<ALWAYS HIT>/i)){if(_0x263cb8(0x479)===_0x263cb8(0x479))return 0x1;else{function _0x148cf6(){const _0xd85fd0=_0x263cb8,_0x298c51=_0x3812c4[_0xd85fd0(0x25c)][_0xd85fd0(0x98f)][_0xd85fd0(0x315)](this);return _0x298c51[_0xd85fd0(0x77a)]=this[_0xd85fd0(0x77a)],_0x298c51[_0xd85fd0(0x534)]=this[_0xd85fd0(0x534)],_0x298c51[_0xd85fd0(0x46e)]=this[_0xd85fd0(0x46e)],_0x298c51;}}}else{if(_0x1b87dc[_0x263cb8(0x7db)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if('lGLzG'!=='lGLzG'){function _0x2555a6(){const _0x2f6c81=_0x263cb8;this[_0x2f6c81(0x945)]();}}else return Number(RegExp['$1'])/0x64;}else{let _0x1732fd=VisuMZ['BattleCore'][_0x263cb8(0x3dc)][_0x263cb8(0x315)](this,_0x2f1c48);return _0x1732fd=this[_0x263cb8(0x15d)][_0x263cb8(0x467)]*_0x1732fd+this[_0x263cb8(0x15d)]['hitFlat'],_0x1732fd;}}},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x6ae)]=function(_0x39c3ad){const _0x5dcd8f=_0x444eb4;if(!this['item']()['damage'][_0x5dcd8f(0x915)])return 0x0;let _0x15b63f=VisuMZ[_0x5dcd8f(0x25c)][_0x5dcd8f(0x90c)][_0x5dcd8f(0x4b3)][_0x5dcd8f(0x8a0)][_0x5dcd8f(0x315)](this,_0x39c3ad);return _0x15b63f=this[_0x5dcd8f(0x15d)]['criticalHitRate']*_0x15b63f+this[_0x5dcd8f(0x15d)][_0x5dcd8f(0x97e)],_0x15b63f;},Game_Action[_0x444eb4(0x268)]['applyCritical']=function(_0x3c844c){const _0x5ab7b4=_0x444eb4;return _0x3c844c=VisuMZ[_0x5ab7b4(0x25c)][_0x5ab7b4(0x90c)][_0x5ab7b4(0x4b3)]['CriticalHitMultiplier']['call'](this,_0x3c844c),_0x3c844c=this[_0x5ab7b4(0x15d)]['criticalDmgRate']*_0x3c844c+this['_multipliers']['criticalDmgFlat'],_0x3c844c;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x76c)]=Game_Action[_0x444eb4(0x268)][_0x444eb4(0x138)],Game_Action[_0x444eb4(0x268)][_0x444eb4(0x138)]=function(_0x39c8a4){const _0x568b5d=_0x444eb4;if(this[_0x568b5d(0x8cf)]!==_0x568b5d(0x33d))return this[_0x568b5d(0xe0)](_0x39c8a4);else return DataManager[_0x568b5d(0x41f)](this[_0x568b5d(0x712)]())==='MANUAL'?VisuMZ['BattleCore'][_0x568b5d(0x76c)][_0x568b5d(0x315)](this,_0x39c8a4):this[_0x568b5d(0x733)](_0x39c8a4);},Game_Action['prototype'][_0x444eb4(0x35b)]=function(_0x3857d1){const _0x1451f8=_0x444eb4;this[_0x1451f8(0x8cf)]=_0x3857d1;},Game_Action[_0x444eb4(0x268)]['customDamageFormula']=function(_0x4a265c){const _0x257167=_0x444eb4,_0x48b796=this[_0x257167(0x712)](),_0x1c1d6c=_0x48b796[_0x257167(0x243)][_0x257167(0x401)];_0x48b796[_0x257167(0x243)]['formula']=this['_customDamageFormula'];let _0x207a62=VisuMZ['BattleCore'][_0x257167(0x76c)][_0x257167(0x315)](this,_0x4a265c);return _0x48b796[_0x257167(0x243)][_0x257167(0x401)]=_0x1c1d6c,_0x207a62;},Game_Action['prototype'][_0x444eb4(0x801)]=function(){const _0x20cbd8=_0x444eb4;if(this[_0x20cbd8(0x712)]()[_0x20cbd8(0x4bb)][_0x20cbd8(0x7db)](/<DAMAGE STYLE:[ ](.*)>/i)){if('pkeGS'===_0x20cbd8(0x832)){const _0xda6f1e=String(RegExp['$1'])[_0x20cbd8(0x8c0)]()[_0x20cbd8(0x3af)]();return _0xda6f1e;}else{function _0x592dd5(){const _0x3514d8=_0x20cbd8;return _0x5597c9[_0x3514d8(0x25c)]['Settings'][_0x3514d8(0x4b3)]['OverallFormulaJS'][_0x3514d8(0x315)](this,_0x9032a9,_0x3dca86);}}}return _0x20cbd8(0x5f5);},Game_Action[_0x444eb4(0x268)]['evalDamageFormulaBattleCore']=function(_0x5cfd47){const _0x67bb07=_0x444eb4,_0x2fffad=DataManager[_0x67bb07(0x41f)](this['item']()),_0x338919=VisuMZ[_0x67bb07(0x1ba)][_0x2fffad];try{if(_0x67bb07(0x862)!=='uypDH'){function _0x4fe290(){const _0x5e4eac=_0x67bb07,_0x17f5db=_0x19a392[_0x5e4eac(0x712)]();this[_0x5e4eac(0x2e2)](_0x53a4cb,_0x1289d7,_0x50bb29),this['createEffectActionSet'](_0x977adc,_0x485ebd,_0x1adc9b),this[_0x5e4eac(0xb9)](_0x2faa11,_0x4516dd,_0x54f5a4);}}else return _0x338919['Formula'][_0x67bb07(0x315)](this,_0x5cfd47);}catch(_0x4b4252){if(_0x67bb07(0x716)!==_0x67bb07(0x6c1)){if($gameTemp[_0x67bb07(0x50b)]())console[_0x67bb07(0x61e)](_0x4b4252);return VisuMZ['BattleCore'][_0x67bb07(0x76c)][_0x67bb07(0x315)](this);}else{function _0x1399b3(){const _0x577081=_0x67bb07;let _0x1dc81c='';if(_0x222c2b[_0x577081(0x8f7)](_0x30050b))_0x1dc81c='Actor-%1-%2'[_0x577081(0x4e2)](_0x1997d8['id'],_0x129513);if(_0x58d213[_0x577081(0x8f7)](_0x1c93f6))_0x1dc81c='Class-%1-%2'[_0x577081(0x4e2)](_0xfc7cdb['id'],_0x44e8ea);if(_0x399c20[_0x577081(0x8f7)](_0x589433))_0x1dc81c='Skill-%1-%2'[_0x577081(0x4e2)](_0x36ca9a['id'],_0x2df848);if(_0x45133c[_0x577081(0x8f7)](_0x56b03a))_0x1dc81c='Item-%1-%2'['format'](_0x31f384['id'],_0x331c80);if(_0x5fc652[_0x577081(0x8f7)](_0xbe1e61))_0x1dc81c=_0x577081(0x8b1)[_0x577081(0x4e2)](_0x146d2e['id'],_0x594431);if(_0x5c44f4[_0x577081(0x8f7)](_0x3f4dc0))_0x1dc81c=_0x577081(0x310)['format'](_0x5e9edc['id'],_0x4e4fe1);if(_0x3d8685['includes'](_0x23897a))_0x1dc81c=_0x577081(0x442)[_0x577081(0x4e2)](_0x89f94d['id'],_0x1a16cb);if(_0x29386d[_0x577081(0x8f7)](_0xf954a0))_0x1dc81c=_0x577081(0x505)[_0x577081(0x4e2)](_0x11d894['id'],_0x435cbc);return _0x1dc81c;}}}},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x363)]=function(_0x2f0aed,_0x5bd585){const _0x4ea7d9=_0x444eb4;if(this[_0x4ea7d9(0x241)]())return _0x5bd585;const _0x497dc1=this[_0x4ea7d9(0x6d1)](),_0x59fe84=_0x2f0aed;let _0x4db1ba=[],_0x4fb287=[];_0x4db1ba[_0x4ea7d9(0x12b)](this[_0x4ea7d9(0x56b)][_0x4ea7d9(0x30e)],this[_0x4ea7d9(0x56b)][_0x4ea7d9(0x661)]),_0x4fb287[_0x4ea7d9(0x12b)](this[_0x4ea7d9(0x56b)][_0x4ea7d9(0x8d3)],this[_0x4ea7d9(0x56b)][_0x4ea7d9(0x624)]);const _0x48881f=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x2ee2b6=this[_0x4ea7d9(0x3df)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x34932f=this[_0x4ea7d9(0x3df)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x4f21b0=this['isPhysical']()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;_0x4db1ba=_0x4db1ba[_0x4ea7d9(0x3ec)](_0x59fe84[_0x4ea7d9(0x1e5)]()['map'](_0x5531f5=>_0x5531f5&&_0x5531f5[_0x4ea7d9(0x4bb)][_0x4ea7d9(0x7db)](_0x48881f)?Number(RegExp['$1']):0x0)),_0x4fb287=_0x4fb287[_0x4ea7d9(0x3ec)](_0x59fe84[_0x4ea7d9(0x1e5)]()[_0x4ea7d9(0x99d)](_0x15c527=>_0x15c527&&_0x15c527['note'][_0x4ea7d9(0x7db)](_0x2ee2b6)?Number(RegExp['$1'])/0x64:0x0)),_0x4db1ba=_0x4db1ba['concat'](_0x497dc1[_0x4ea7d9(0x1e5)]()[_0x4ea7d9(0x99d)](_0x20ddea=>_0x20ddea&&_0x20ddea[_0x4ea7d9(0x4bb)][_0x4ea7d9(0x7db)](_0x34932f)?Number(RegExp['$1']):0x0)),_0x4fb287=_0x4fb287[_0x4ea7d9(0x3ec)](_0x497dc1[_0x4ea7d9(0x1e5)]()[_0x4ea7d9(0x99d)](_0x708a6=>_0x708a6&&_0x708a6[_0x4ea7d9(0x4bb)]['match'](_0x4f21b0)?Number(RegExp['$1'])/0x64:0x0));if(this['item']()[_0x4ea7d9(0x4bb)][_0x4ea7d9(0x7db)](_0x34932f)){if(_0x4ea7d9(0x904)===_0x4ea7d9(0x409)){function _0x2f6139(){const _0x443b3c=_0x4ea7d9;return this[_0x443b3c(0x8a5)](_0x6c0fc6[0x0],_0x3c6161[0x1],_0x1c6ed7=>{const _0x5b720a=_0x443b3c;!_0x1c6ed7[_0x5b720a(0x7c8)]()&&(_0x1c6ed7[_0x5b720a(0x932)](_0x98708f[0x2],_0x5e3f43[0x3]),_0x3dab24[_0x5b720a(0x932)](_0x1c6ed7));}),!![];}}else _0x4db1ba[_0x4ea7d9(0x12b)](Number(RegExp['$1']));}if(this[_0x4ea7d9(0x712)]()['note'][_0x4ea7d9(0x7db)](_0x4f21b0)){if('SpdWN'!==_0x4ea7d9(0x163)){function _0x46f5c1(){return!![];}}else _0x4fb287[_0x4ea7d9(0x12b)](Number(RegExp['$1']));}return _0x5bd585=_0x4db1ba[_0x4ea7d9(0x254)]((_0x5b1fcb,_0x41112c)=>_0x5b1fcb-_0x41112c,_0x5bd585),_0x5bd585>0x0&&(_0x5bd585=_0x4fb287['reduce']((_0x2d6699,_0x5c71be)=>_0x2d6699*(0x1-_0x5c71be),_0x5bd585)),_0x5bd585;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x62d)]=Game_Action[_0x444eb4(0x268)]['executeDamage'],Game_Action[_0x444eb4(0x268)]['executeDamage']=function(_0x320adc,_0xc01d27){const _0x592e70=_0x444eb4;_0xc01d27=_0xc01d27*this[_0x592e70(0x15d)][_0x592e70(0xec)],_0xc01d27+=this[_0x592e70(0x15d)][_0x592e70(0x444)]*(_0xc01d27>=0x0?0x1:-0x1),_0xc01d27=this[_0x592e70(0x941)](_0x592e70(0x636),_0x320adc,_0xc01d27,![]),_0xc01d27=this[_0x592e70(0x4df)](_0xc01d27),_0xc01d27=Math['round'](_0xc01d27),this[_0x592e70(0xd7)]=_0xc01d27,this[_0x592e70(0x5a5)]=this['_totalValue']||0x0,this[_0x592e70(0x5a5)]+=_0xc01d27,VisuMZ[_0x592e70(0x25c)]['Game_Action_executeDamage'][_0x592e70(0x315)](this,_0x320adc,_0xc01d27),this[_0x592e70(0x941)](_0x592e70(0x7fb),_0x320adc,_0xc01d27,!![]);},Game_Action[_0x444eb4(0x268)]['applyDamageCaps']=function(_0x1e5202){const _0x10b163=_0x444eb4;if(this[_0x10b163(0x494)]())return _0x1e5202;return _0x1e5202=this[_0x10b163(0x2c5)](_0x1e5202),_0x1e5202=this['applyHardDamageCap'](_0x1e5202),_0x1e5202;},Game_Action[_0x444eb4(0x268)]['isBypassDamageCap']=function(){const _0x208c1b=_0x444eb4,_0x4e2813=/<BYPASS DAMAGE CAP>/i;if(this[_0x208c1b(0x712)]()[_0x208c1b(0x4bb)][_0x208c1b(0x7db)](_0x4e2813))return!![];if(this[_0x208c1b(0x6d1)]()['traitObjects']()[_0x208c1b(0x563)](_0x67181c=>_0x67181c&&_0x67181c[_0x208c1b(0x4bb)]['match'](_0x4e2813)))return!![];return!VisuMZ[_0x208c1b(0x25c)]['Settings'][_0x208c1b(0x4b3)][_0x208c1b(0x7c9)];},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x2c5)]=function(_0x2012f5){const _0xae05dc=_0x444eb4;if(!VisuMZ['BattleCore'][_0xae05dc(0x90c)][_0xae05dc(0x4b3)][_0xae05dc(0x686)])return _0x2012f5;const _0x58462a=/<BYPASS SOFT DAMAGE CAP>/i;if(this['item']()[_0xae05dc(0x4bb)][_0xae05dc(0x7db)](_0x58462a))return!![];if(this['subject']()['traitObjects']()[_0xae05dc(0x563)](_0xbeb643=>_0xbeb643&&_0xbeb643[_0xae05dc(0x4bb)][_0xae05dc(0x7db)](_0x58462a)))return!![];const _0x1662a0=_0x2012f5<0x0?-0x1:0x1;_0x2012f5=Math[_0xae05dc(0x7fa)](_0x2012f5);let _0x202371=this[_0xae05dc(0x6d1)]()[_0xae05dc(0x8f5)]();if(this[_0xae05dc(0x712)]()[_0xae05dc(0x4bb)][_0xae05dc(0x7db)](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)){if('FZYYP'!==_0xae05dc(0x823))_0x202371+=Number(RegExp['$1'])/0x64;else{function _0x4de782(){const _0x1cbd36=_0xae05dc;this[_0x1cbd36(0x2a0)]=this['applyEasing'](this['_currentAngle'],this[_0x1cbd36(0x206)],_0x546633,_0xd0655b,_0x5353f5);}}}_0x202371=_0x202371[_0xae05dc(0x540)](0.01,0x1);const _0x4994d1=this['getHardDamageCap'](),_0x7af5d=_0x202371*_0x4994d1;if(_0x2012f5>_0x7af5d&&_0x4994d1>_0x7af5d){if(_0xae05dc(0x200)!==_0xae05dc(0x225)){_0x2012f5-=_0x7af5d;const _0x554bb1=VisuMZ[_0xae05dc(0x25c)][_0xae05dc(0x90c)][_0xae05dc(0x4b3)][_0xae05dc(0x509)],_0x201d0e=Math[_0xae05dc(0x960)](0x1-_0x2012f5/((_0x4994d1-_0x7af5d)*_0x554bb1+_0x2012f5),0.01);_0x2012f5*=_0x201d0e,_0x2012f5+=_0x7af5d;}else{function _0x36ce2a(){const _0x32ef66=_0xae05dc;_0x1e2677['BattleCore'][_0x32ef66(0x90c)][_0x32ef66(0x49d)]['AddOption']&&(this['addBattleCoreAutoBattleStartupCommand'](),this[_0x32ef66(0x936)]());}}}return _0x2012f5*_0x1662a0;},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x452)]=function(){const _0x524b7d=_0x444eb4;if(this[_0x524b7d(0x712)]()[_0x524b7d(0x4bb)][_0x524b7d(0x7db)](/<DAMAGE CAP:[ ](\d+)>/i)){if(_0x524b7d(0x814)===_0x524b7d(0x814))return Number(RegExp['$1']);else{function _0x31108d(){const _0x504fe6=_0x524b7d;this[_0x504fe6(0x885)]();}}}else return this['subject']()[_0x524b7d(0x69d)]();},Game_Action['prototype']['applyHardDamageCap']=function(_0x3fded4){const _0xaf3777=_0x444eb4;let _0x354b1f=this[_0xaf3777(0x452)]();return _0x3fded4[_0xaf3777(0x540)](-_0x354b1f,_0x354b1f);},VisuMZ[_0x444eb4(0x25c)]['Game_Action_apply']=Game_Action[_0x444eb4(0x268)][_0x444eb4(0x5ea)],Game_Action[_0x444eb4(0x268)][_0x444eb4(0x5ea)]=function(_0x23d5b7){const _0x396b04=_0x444eb4;this[_0x396b04(0x941)](_0x396b04(0x6cc),_0x23d5b7,0x0,!![]),VisuMZ[_0x396b04(0x25c)][_0x396b04(0x85e)]['call'](this,_0x23d5b7),this[_0x396b04(0x941)](_0x396b04(0x20a),_0x23d5b7,this[_0x396b04(0xd7)]||0x0,!![]);},Game_Action[_0x444eb4(0x268)]['applyBattleCoreJS']=function(_0x3fd591,_0x425d96,_0x5984e1,_0x129491){const _0x29c73b=_0x444eb4;_0x5984e1=_0x5984e1||0x0;const _0x440084=_0x5984e1,_0x1bfe79=VisuMZ['BattleCore'][_0x29c73b(0x90c)][_0x29c73b(0x5e7)],_0x4f2376=_0x3fd591[_0x29c73b(0x4e2)]('');if(_0x1bfe79[_0x4f2376]){_0x5984e1=_0x1bfe79[_0x4f2376][_0x29c73b(0x315)](this,_0x5984e1,_0x425d96);if(_0x129491)_0x5984e1=_0x440084;}let _0x521acc=VisuMZ[_0x29c73b(0x25c)][_0x29c73b(0x68a)](this[_0x29c73b(0x712)](),_0x3fd591[_0x29c73b(0x4e2)](''));if(VisuMZ['BattleCore']['JS'][_0x521acc]){if(_0x29c73b(0x1b2)===_0x29c73b(0x1b2)){_0x5984e1=VisuMZ['BattleCore']['JS'][_0x521acc][_0x29c73b(0x315)](this,this[_0x29c73b(0x6d1)](),_0x425d96,this[_0x29c73b(0x712)](),_0x5984e1);if(_0x129491)_0x5984e1=_0x440084;}else{function _0x515874(){const _0x1b3200=_0x29c73b,_0xe0996d=this[_0x1b3200(0x93b)]();_0x200db4=_0xe0996d[0x0]?_0xe0996d[0x0][_0x1b3200(0x74e)]:0x0;}}}for(const _0x7bad88 of this[_0x29c73b(0x6d1)]()['traitObjects']()){if(_0x29c73b(0x46f)!==_0x29c73b(0x1e9)){if(!_0x7bad88)continue;_0x521acc=VisuMZ['BattleCore'][_0x29c73b(0x68a)](_0x7bad88,_0x3fd591[_0x29c73b(0x4e2)](_0x29c73b(0x84a)));if(VisuMZ['BattleCore']['JS'][_0x521acc]){_0x5984e1=VisuMZ[_0x29c73b(0x25c)]['JS'][_0x521acc][_0x29c73b(0x315)](this,this[_0x29c73b(0x6d1)](),_0x425d96,_0x7bad88,_0x5984e1);if(_0x129491)_0x5984e1=_0x440084;}}else{function _0x4ffbc0(){const _0x3c90e8=_0x29c73b;_0x3f27e3['BattleCore']['Sprite_Weapon_loadBitmap'][_0x3c90e8(0x315)](this),this['bitmap']&&(this[_0x3c90e8(0x8fa)]['smooth']=_0x401424[_0x3c90e8(0x25c)][_0x3c90e8(0x90c)][_0x3c90e8(0x78b)][_0x3c90e8(0x5c8)]);}}}for(const _0x4cd062 of _0x425d96['traitObjects']()){if(_0x29c73b(0x166)!==_0x29c73b(0x166)){function _0xc235a7(){const _0x30f09e=_0x29c73b;this[_0x30f09e(0xcf)]();}}else{if(!_0x4cd062)continue;_0x521acc=VisuMZ[_0x29c73b(0x25c)][_0x29c73b(0x68a)](_0x4cd062,_0x3fd591[_0x29c73b(0x4e2)](_0x29c73b(0x79e)));if(VisuMZ['BattleCore']['JS'][_0x521acc]){_0x5984e1=VisuMZ['BattleCore']['JS'][_0x521acc][_0x29c73b(0x315)](this,this[_0x29c73b(0x6d1)](),_0x425d96,_0x4cd062,_0x5984e1);if(_0x129491)_0x5984e1=_0x440084;}}}return _0x5984e1;},Game_Action['prototype']['actionBattleCoreJS']=function(_0x33b150){const _0x25bc2a=_0x444eb4,_0x45da50=this[_0x25bc2a(0x5a5)]||0x0,_0x26f7d8=VisuMZ[_0x25bc2a(0x25c)]['Settings'][_0x25bc2a(0x5e7)],_0x102ac7=_0x33b150[_0x25bc2a(0x4e2)]('');_0x26f7d8[_0x102ac7]&&_0x26f7d8[_0x102ac7][_0x25bc2a(0x315)](this,_0x45da50);let _0x174c9d=VisuMZ['BattleCore'][_0x25bc2a(0x68a)](this[_0x25bc2a(0x712)](),_0x33b150);VisuMZ[_0x25bc2a(0x25c)]['JS'][_0x174c9d]&&VisuMZ[_0x25bc2a(0x25c)]['JS'][_0x174c9d]['call'](this,this['subject'](),this[_0x25bc2a(0x6d1)](),this[_0x25bc2a(0x712)](),_0x45da50);for(const _0x55dbd1 of this[_0x25bc2a(0x6d1)]()['traitObjects']()){if(_0x25bc2a(0x425)===_0x25bc2a(0x425)){if(!_0x55dbd1)continue;_0x174c9d=VisuMZ[_0x25bc2a(0x25c)][_0x25bc2a(0x68a)](_0x55dbd1,_0x33b150);if(VisuMZ[_0x25bc2a(0x25c)]['JS'][_0x174c9d]){if('nlPrN'===_0x25bc2a(0xd5)){function _0x5df396(){const _0x46c1cf=_0x25bc2a;return _0x189a5d[_0x46c1cf(0x268)][_0x46c1cf(0x39d)][_0x46c1cf(0x315)](this);}}else VisuMZ[_0x25bc2a(0x25c)]['JS'][_0x174c9d][_0x25bc2a(0x315)](this,this[_0x25bc2a(0x6d1)](),this['subject'](),_0x55dbd1,_0x45da50);}}else{function _0xe397a(){const _0x3f5e6d=_0x25bc2a;return this[_0x3f5e6d(0x179)]();}}}},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x617)]=function(){const _0x4591e0=_0x444eb4;return VisuMZ[_0x4591e0(0x25c)][_0x4591e0(0x90c)]['Mechanics'][_0x4591e0(0x610)][_0x4591e0(0x315)](this);},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x3ad)]=function(){const _0x483ce2=_0x444eb4;return VisuMZ['BattleCore'][_0x483ce2(0x90c)][_0x483ce2(0x5e7)][_0x483ce2(0x419)];},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x583)]=function(){const _0x14d810=_0x444eb4;return this[_0x14d810(0x712)]()[_0x14d810(0x4bb)][_0x14d810(0x7db)](/<JS TARGETS>/i);},Game_Action['prototype'][_0x444eb4(0x69a)]=function(){const _0x523409=_0x444eb4;if(!this[_0x523409(0x187)]&&this[_0x523409(0x6d1)]()[_0x523409(0x3a2)]())return![];if(this[_0x523409(0x583)]())return!![];return typeof this['item']()[_0x523409(0x58f)]===_0x523409(0x7d8);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x672)]=Game_Action[_0x444eb4(0x268)]['isForOpponent'],Game_Action[_0x444eb4(0x268)][_0x444eb4(0x40b)]=function(){const _0x3daa13=_0x444eb4;return this['isBattleCoreTargetScope']()&&!this[_0x3daa13(0x583)]()?this[_0x3daa13(0x2a2)]():VisuMZ[_0x3daa13(0x25c)]['Game_Action_isForOpponent'][_0x3daa13(0x315)](this);},Game_Action['prototype'][_0x444eb4(0x2a2)]=function(){const _0x5ecc74=_0x444eb4,_0x524cb1=this[_0x5ecc74(0x712)]()[_0x5ecc74(0x58f)];return _0x524cb1[_0x5ecc74(0x7db)](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ['BattleCore'][_0x444eb4(0x1fa)]=Game_Action[_0x444eb4(0x268)][_0x444eb4(0x4ab)],Game_Action[_0x444eb4(0x268)]['isForFriend']=function(){const _0xc22259=_0x444eb4;if(this[_0xc22259(0x69a)]()&&!this[_0xc22259(0x583)]())return this[_0xc22259(0x38c)]();else{if(_0xc22259(0x40a)===_0xc22259(0x40a))return VisuMZ[_0xc22259(0x25c)]['Game_Action_isForFriend'][_0xc22259(0x315)](this);else{function _0x335074(){const _0x5f2171=_0xc22259;this[_0x5f2171(0x941)](_0x5f2171(0x6cc),_0x55f9f5,0x0,!![]),_0x305d80[_0x5f2171(0x25c)][_0x5f2171(0x85e)][_0x5f2171(0x315)](this,_0x258c7b),this['applyBattleCoreJS']('PostApply%1JS',_0x55b3f0,this['_executedValue']||0x0,!![]);}}}},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x38c)]=function(){const _0x1fa55c=_0x444eb4,_0x2134af=this['item']()['scope'];return _0x2134af[_0x1fa55c(0x7db)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x1b6)]=Game_Action[_0x444eb4(0x268)][_0x444eb4(0x599)],Game_Action[_0x444eb4(0x268)]['isForRandom']=function(){const _0x3e84db=_0x444eb4;if(this[_0x3e84db(0x69a)]()&&!this[_0x3e84db(0x583)]())return this[_0x3e84db(0x3c8)]();else{if(_0x3e84db(0x748)===_0x3e84db(0x748))return VisuMZ['BattleCore'][_0x3e84db(0x1b6)][_0x3e84db(0x315)](this);else{function _0x29d7fb(){const _0xeb0d1e=_0x3e84db;return _0x51ecbf[_0xeb0d1e(0x25c)][_0xeb0d1e(0x90c)][_0xeb0d1e(0x5e7)][_0xeb0d1e(0x610)]['call'](this);}}}},Game_Action['prototype'][_0x444eb4(0x3c8)]=function(){const _0x3e629f=_0x444eb4,_0x200f68=this['item']()[_0x3e629f(0x58f)];return _0x200f68['match'](/(?:RAND|RANDOM)/i);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x7df)]=Game_Action[_0x444eb4(0x268)]['needsSelection'],Game_Action[_0x444eb4(0x268)][_0x444eb4(0x908)]=function(){const _0x7c501a=_0x444eb4;if(this[_0x7c501a(0x69a)]()&&!this[_0x7c501a(0x583)]()){if(_0x7c501a(0x903)===_0x7c501a(0xf8)){function _0x55f12d(){const _0x2263e2=_0x7c501a;_0x5c771f['BattleCore']['JS'][_0x138bae][_0x2263e2(0x315)](this,this,this,_0x2abb4a,0x0);}}else return this[_0x7c501a(0x1fe)]();}else return VisuMZ['BattleCore']['Game_Action_needsSelection'][_0x7c501a(0x315)](this);},Game_Action['prototype'][_0x444eb4(0x1fe)]=function(){const _0x22bff9=_0x444eb4,_0xdcbda9=this[_0x22bff9(0x712)]()['scope'];if(_0xdcbda9[_0x22bff9(0x7db)](/RANDOM/i))return![];return VisuMZ[_0x22bff9(0x25c)][_0x22bff9(0x7df)][_0x22bff9(0x315)](this);},VisuMZ[_0x444eb4(0x25c)]['Game_Action_makeTargets']=Game_Action[_0x444eb4(0x268)]['makeTargets'],Game_Action[_0x444eb4(0x268)][_0x444eb4(0x6a6)]=function(){const _0x2f9239=_0x444eb4;if(this[_0x2f9239(0x69a)]())return this[_0x2f9239(0xf9)]();else{if(_0x2f9239(0x65c)==='dDggs'){function _0x3d5012(){const _0x5bba00=_0x2f9239;!this[_0x5bba00(0x1e1)][_0x5bba00(0x95b)]()&&this[_0x5bba00(0x834)]();}}else return VisuMZ['BattleCore'][_0x2f9239(0x308)][_0x2f9239(0x315)](this);}},Game_Action[_0x444eb4(0x268)][_0x444eb4(0xf9)]=function(){const _0xb90301=_0x444eb4;let _0x83bad4=[];const _0x2a9c53=String(this['item']()[_0xb90301(0x58f)]),_0x290d21=VisuMZ['BattleCore']['createKeyJS'](this[_0xb90301(0x712)](),_0xb90301(0x865));if(VisuMZ[_0xb90301(0x25c)]['JS'][_0x290d21]){const _0x4161ca=VisuMZ[_0xb90301(0x25c)][_0xb90301(0x68a)](this[_0xb90301(0x712)](),_0xb90301(0x865));return _0x83bad4=VisuMZ['BattleCore']['JS'][_0x4161ca]['call'](this,this['subject'](),_0x83bad4),this[_0xb90301(0x6a1)](_0x83bad4);}if(_0x2a9c53['match'](/(\d+) RANDOM ANY/i)){let _0x3f1f50=Number(RegExp['$1']);while(_0x3f1f50--){if(_0xb90301(0x73a)===_0xb90301(0x6d7)){function _0x215523(){const _0x1df8fa=_0xb90301;this[_0x1df8fa(0x48a)]='xp';}}else{const _0x39d152=Math['randomInt'](0x2)===0x0?this[_0xb90301(0x841)]():this[_0xb90301(0x744)]();_0x83bad4[_0xb90301(0x12b)](_0x39d152['trueRandomTarget']());}}return this[_0xb90301(0x6a1)](_0x83bad4);}if(_0x2a9c53[_0xb90301(0x7db)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if(_0xb90301(0x549)!=='xitFr'){function _0x449ca3(){const _0x1646a4=_0xb90301,_0x3cc2d9=this[_0x1646a4(0x5c5)](_0x4ecb50),_0x3209d0=this['commandName'](_0x212089),_0x5aeace=this[_0x1646a4(0x463)](_0x3209d0)[_0x1646a4(0x592)];this[_0x1646a4(0x264)](this[_0x1646a4(0x756)](_0x45a81a));const _0xf6ba4a=this['itemTextAlign']();if(_0xf6ba4a==='right')this[_0x1646a4(0x2bb)](_0x3209d0,_0x3cc2d9['x']+_0x3cc2d9[_0x1646a4(0x592)]-_0x5aeace,_0x3cc2d9['y'],_0x5aeace);else{if(_0xf6ba4a===_0x1646a4(0x373)){const _0x1ab72e=_0x3cc2d9['x']+_0x25e724[_0x1646a4(0x10b)]((_0x3cc2d9[_0x1646a4(0x592)]-_0x5aeace)/0x2);this[_0x1646a4(0x2bb)](_0x3209d0,_0x1ab72e,_0x3cc2d9['y'],_0x5aeace);}else this[_0x1646a4(0x2bb)](_0x3209d0,_0x3cc2d9['x'],_0x3cc2d9['y'],_0x5aeace);}}}else{let _0x22ceb2=Number(RegExp['$1']);while(_0x22ceb2--){_0x83bad4[_0xb90301(0x12b)](this[_0xb90301(0x841)]()[_0xb90301(0x1d1)]());}return this[_0xb90301(0x6a1)](_0x83bad4);}}if(_0x2a9c53[_0xb90301(0x7db)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if('fTAMH'===_0xb90301(0x8f6)){let _0x286ed2=Number(RegExp['$1']);while(_0x286ed2--){_0x83bad4[_0xb90301(0x12b)](this[_0xb90301(0x744)]()[_0xb90301(0x1d1)]());}return this['repeatTargets'](_0x83bad4);}else{function _0x245702(){const _0x199291=_0xb90301;this[_0x199291(0x60f)](_0x199291(0x41b));}}}if(_0x2a9c53[_0xb90301(0x7db)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x83bad4[_0xb90301(0x12b)](...this['friendsUnit']()[_0xb90301(0x20e)]()[_0xb90301(0x34b)](_0x341c91=>_0x341c91!==this['subject']())),this[_0xb90301(0x6a1)](_0x83bad4);return VisuMZ[_0xb90301(0x25c)][_0xb90301(0x308)]['call'](this);},Game_Action[_0x444eb4(0x268)][_0x444eb4(0x2cf)]=function(_0x300647){const _0x72da00=_0x444eb4,_0x4a4357=[];for(let _0x3cf19d=0x0;_0x3cf19d<this[_0x72da00(0x3fb)]();_0x3cf19d++){_0x4a4357[_0x72da00(0x12b)](_0x300647[_0x72da00(0x1d1)]());}return _0x4a4357;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x95e)]=Game_Action[_0x444eb4(0x268)][_0x444eb4(0x8e7)],Game_Action['prototype'][_0x444eb4(0x8e7)]=function(_0x52a802,_0x2f97b7){const _0x4e40ad=_0x444eb4,_0x3b8872=_0x52a802[_0x4e40ad(0x447)]();this[_0x4e40ad(0x6d1)]()[_0x4e40ad(0x43b)]()['includes'](_0x52a802[_0x4e40ad(0x89e)]())&&_0x52a802[_0x4e40ad(0x652)](![]),VisuMZ['BattleCore'][_0x4e40ad(0x95e)][_0x4e40ad(0x315)](this,_0x52a802,_0x2f97b7),_0x52a802[_0x4e40ad(0x652)](_0x3b8872);},VisuMZ['BattleCore'][_0x444eb4(0x988)]=Game_Action['prototype'][_0x444eb4(0x341)],Game_Action[_0x444eb4(0x268)]['itemEffectAddNormalState']=function(_0x4e4d2c,_0x1664ca){const _0x21f692=_0x444eb4,_0x26bc28=_0x4e4d2c['isImmortal']();_0x1664ca[_0x21f692(0x738)]===_0x4e4d2c['deathStateId']()&&_0x4e4d2c[_0x21f692(0x652)](![]),VisuMZ[_0x21f692(0x25c)]['Game_Action_itemEffectAddNormalState'][_0x21f692(0x315)](this,_0x4e4d2c,_0x1664ca),_0x4e4d2c[_0x21f692(0x652)](_0x26bc28);},VisuMZ['BattleCore'][_0x444eb4(0x5f6)]=Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x61f)],Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x61f)]=function(){const _0x42bfe2=_0x444eb4;VisuMZ[_0x42bfe2(0x25c)]['Game_BattlerBase_initMembers']['call'](this),this['initMembersBattleCore']();},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x4e0)]=function(){const _0xb92ac6=_0x444eb4;this[_0xb92ac6(0x972)]=![];},VisuMZ[_0x444eb4(0x25c)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x119)],Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x119)]=function(){const _0x426e96=_0x444eb4;this[_0x426e96(0x807)]={},VisuMZ['BattleCore']['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x684)]=function(_0x156285){const _0x2d0cd1=_0x444eb4;return this[_0x2d0cd1(0x807)]=this['_cache']||{},this[_0x2d0cd1(0x807)][_0x156285]!==undefined;},Game_BattlerBase['prototype'][_0x444eb4(0x69d)]=function(){const _0x48f9fa=_0x444eb4;if(this[_0x48f9fa(0x807)][_0x48f9fa(0x69d)]!==undefined)return this[_0x48f9fa(0x807)]['hardDamageCap'];const _0x1ed15f=/<DAMAGE CAP:[ ](\d+)>/i,_0x39c82c=this[_0x48f9fa(0x1e5)]()[_0x48f9fa(0x99d)](_0x476a83=>_0x476a83&&_0x476a83[_0x48f9fa(0x4bb)]['match'](_0x1ed15f)?Number(RegExp['$1']):0x0);let _0x4fc9e6=_0x39c82c[_0x48f9fa(0x34a)]>0x0?Math['max'](..._0x39c82c):0x0;if(_0x4fc9e6<=0x0)_0x4fc9e6=VisuMZ['BattleCore'][_0x48f9fa(0x90c)][_0x48f9fa(0x4b3)][_0x48f9fa(0x7bd)];return this['_cache']['hardDamageCap']=_0x4fc9e6,this[_0x48f9fa(0x807)][_0x48f9fa(0x69d)];},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x8f5)]=function(){const _0xa12185=_0x444eb4;if(this['_cache'][_0xa12185(0x1d8)]!==undefined)return this[_0xa12185(0x807)]['softDamageCap'];let _0x372b31=VisuMZ[_0xa12185(0x25c)][_0xa12185(0x90c)]['Damage'][_0xa12185(0x374)];const _0x11791f=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0xd181c8=this[_0xa12185(0x1e5)]()[_0xa12185(0x99d)](_0x2623f8=>_0x2623f8&&_0x2623f8[_0xa12185(0x4bb)][_0xa12185(0x7db)](_0x11791f)?Number(RegExp['$1'])/0x64:0x0);return _0x372b31=_0xd181c8[_0xa12185(0x254)]((_0x7c1e00,_0x359ffa)=>_0x7c1e00+_0x359ffa,_0x372b31),this[_0xa12185(0x807)]['softDamageCap']=_0x372b31,this[_0xa12185(0x807)][_0xa12185(0x1d8)][_0xa12185(0x540)](0.01,0x1);},VisuMZ[_0x444eb4(0x25c)]['Game_BattlerBase_die']=Game_BattlerBase['prototype'][_0x444eb4(0x297)],Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x297)]=function(){const _0x3245ca=_0x444eb4;VisuMZ[_0x3245ca(0x25c)]['Game_BattlerBase_die'][_0x3245ca(0x315)](this),SceneManager[_0x3245ca(0x11f)]()&&this[_0x3245ca(0x6d9)](_0x3245ca(0x4f9));},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x7f2)]=function(){const _0x584ea9=_0x444eb4;if(!SceneManager[_0x584ea9(0x11f)]())return null;if(!SceneManager[_0x584ea9(0x3a7)][_0x584ea9(0x60c)])return null;return SceneManager[_0x584ea9(0x3a7)][_0x584ea9(0x60c)][_0x584ea9(0x307)](this);},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x786)]=function(){const _0x5504e7=_0x444eb4;return VisuMZ[_0x5504e7(0x25c)]['Settings'][_0x5504e7(0x78b)]['AnchorX'];},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x967)]=function(){const _0x4cbaf9=_0x444eb4;return VisuMZ[_0x4cbaf9(0x25c)][_0x4cbaf9(0x90c)][_0x4cbaf9(0x78b)][_0x4cbaf9(0x933)];},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x7d6)]=function(){const _0x55ad55=_0x444eb4;if(this[_0x55ad55(0x73d)]&&this['isActor']())return VisuMZ[_0x55ad55(0x25c)][_0x55ad55(0x90c)][_0x55ad55(0x78b)][_0x55ad55(0x21a)];else{if('pdgBN'!==_0x55ad55(0x969))return VisuMZ[_0x55ad55(0x25c)][_0x55ad55(0x90c)][_0x55ad55(0x874)][_0x55ad55(0x21a)];else{function _0x4cd946(){return _0x386e82(_0x19f39a['$1']);}}}},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x44b)]=function(){return!![];},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x24a)]=function(){return 0x0;},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x7ae)]=function(){return 0x0;},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x5a9)]=function(_0x5e88c6){const _0x58888e=_0x444eb4;if(!_0x5e88c6)return 0x0;let _0x42d106=0x0;const _0x4ce83d=_0x5e88c6['note'];if(_0x4ce83d['match'](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x58888e(0x2b5)==='trfnT')_0x42d106+=Number(RegExp['$1']);else{function _0x529f80(){return!![];}}}return _0x4ce83d[_0x58888e(0x7db)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x42d106+=Number(RegExp['$1'])),_0x42d106;},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x423)]=function(_0x3eea4b){const _0x5c6086=_0x444eb4;if(!_0x3eea4b)return 0x0;let _0x5f08b4=0x0;const _0x3d36df=_0x3eea4b[_0x5c6086(0x4bb)];if(_0x3d36df[_0x5c6086(0x7db)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x5c6086(0x295)===_0x5c6086(0x56d)){function _0x4b7c51(){const _0x1d738a=_0x5c6086;this[_0x1d738a(0x450)](_0x225a2b);for(const _0x503b09 of _0x2ba119['targetObjects']){_0x503b09[_0x1d738a(0x8d8)]&&_0x503b09['endAnimation']();}_0x20976f['destroy']();}}else _0x5f08b4+=Number(RegExp['$1']);}if(_0x3d36df[_0x5c6086(0x7db)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5c6086(0x88e)===_0x5c6086(0x88e))_0x5f08b4+=Number(RegExp['$2']);else{function _0x562e46(){this['autoBattleUseSkills']=![];}}}return _0x5f08b4;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x6b0)]=Game_BattlerBase['prototype'][_0x444eb4(0x4d6)],Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x4d6)]=function(_0x475311){const _0x1ccf93=_0x444eb4;if(_0x475311===this[_0x1ccf93(0x89e)]()&&this[_0x1ccf93(0x447)]())return!![];return VisuMZ['BattleCore']['Game_BattlerBase_isStateResist'][_0x1ccf93(0x315)](this,_0x475311);},Game_BattlerBase['prototype'][_0x444eb4(0x447)]=function(){const _0xde7637=_0x444eb4;return this[_0xde7637(0x972)];},Game_BattlerBase[_0x444eb4(0x268)]['setImmortal']=function(_0x1f3512){const _0x561d37=_0x444eb4;if(_0x1f3512){if(_0x561d37(0x156)===_0x561d37(0x156))this[_0x561d37(0x674)]();else{function _0x364005(){const _0x245737=_0x561d37;_0x27d7e5[_0x245737(0x25c)][_0x245737(0x691)][_0x245737(0x315)](this),this[_0x245737(0x2df)]();}}}else this[_0x561d37(0x52f)]();},Game_BattlerBase['prototype'][_0x444eb4(0x674)]=function(){const _0xc6db82=_0x444eb4;if(this[_0xc6db82(0xc9)]())return;this[_0xc6db82(0x972)]=!![];},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x52f)]=function(){const _0x20ac9b=_0x444eb4,_0x2282c7=this[_0x20ac9b(0x734)]();this[_0x20ac9b(0x972)]=![],this[_0x20ac9b(0x119)](),this[_0x20ac9b(0xc9)]()&&_0x2282c7&&(this[_0x20ac9b(0x39e)](),this[_0x20ac9b(0x1da)]());},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x63f)]=Game_BattlerBase[_0x444eb4(0x268)]['canAttack'],Game_BattlerBase[_0x444eb4(0x268)]['canAttack']=function(){const _0xded8df=_0x444eb4;if(!this['canAttackBattleCore']())return![];return VisuMZ[_0xded8df(0x25c)][_0xded8df(0x63f)][_0xded8df(0x315)](this);},Game_BattlerBase['prototype']['canAttackBattleCore']=function(){const _0x3174a6=_0x444eb4;for(const _0x38de43 of this[_0x3174a6(0x1e5)]()){if('HQxAK'===_0x3174a6(0x3bb)){function _0xc0d508(){const _0x305d63=_0x3174a6;this[_0x305d63(0x2bb)](_0x57d347,_0x2fa921['x']+_0x480983[_0x305d63(0x592)]-_0x2298f5,_0x4d1db0['y'],_0x5270b1);}}else{if(!_0x38de43)continue;if(_0x38de43[_0x3174a6(0x4bb)][_0x3174a6(0x7db)](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}}return!![];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x966)]=Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x8f1)],Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x8f1)]=function(){const _0x866b12=_0x444eb4;if(!this[_0x866b12(0x703)]())return![];return VisuMZ[_0x866b12(0x25c)][_0x866b12(0x966)][_0x866b12(0x315)](this);},Game_BattlerBase['prototype'][_0x444eb4(0x703)]=function(){const _0x79e4e5=_0x444eb4;for(const _0x79d1fd of this['traitObjects']()){if(!_0x79d1fd)continue;if(_0x79d1fd['note'][_0x79e4e5(0x7db)](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x444eb4(0x268)][_0x444eb4(0x218)]=function(){const _0x1bac60=_0x444eb4;for(const _0x4e2ecb of this[_0x1bac60(0x1e5)]()){if(!_0x4e2ecb)continue;if(_0x4e2ecb['note'][_0x1bac60(0x7db)](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ['BattleCore'][_0x444eb4(0x18b)]=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x845)],Game_Battler['prototype']['regenerateAll']=function(){const _0x15567b=_0x444eb4;if(SceneManager[_0x15567b(0x11f)]()&&$gameTroop[_0x15567b(0x85d)]()<=0x0)return;this[_0x15567b(0x35d)](_0x15567b(0x860)),VisuMZ[_0x15567b(0x25c)]['Game_Battler_regenerateAll'][_0x15567b(0x315)](this),this[_0x15567b(0x1bf)](),this[_0x15567b(0x35d)]('PostRegenerateJS');},Game_Battler['prototype'][_0x444eb4(0x1bf)]=function(){const _0x1b66c7=_0x444eb4;if(SceneManager[_0x1b66c7(0x11f)]()){if(_0x1b66c7(0x6fb)!=='JaBzY'){function _0x437762(){const _0x124950=_0x1b66c7;_0x4be442['wtypeId']=_0x1854b6[_0x124950(0x345)](_0x25294b['$1']);}}else for(const _0x5da626 of this[_0x1b66c7(0x1e5)]()){if(!_0x5da626)continue;this['onRegeneratePlayStateAnimation'](_0x5da626);}}},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x106)]=function(_0x58e69a){const _0x4d933f=_0x444eb4;if(!Imported[_0x4d933f(0x305)])return;if(!SceneManager[_0x4d933f(0x11f)]())return;if(this[_0x4d933f(0xc9)]())return;if(this['isHidden']())return;if(_0x58e69a[_0x4d933f(0x4bb)][_0x4d933f(0x7db)](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){if(_0x4d933f(0x2f4)==='PYMHM'){const _0x49c07d=Number(RegExp['$1']);$gameTemp[_0x4d933f(0x8df)]([this],_0x49c07d,![],![]);}else{function _0x16de4a(){const _0x1f1ab9=_0x4d933f;this[_0x1f1ab9(0x48a)]=_0x1f1ab9(0x33d);}}}},VisuMZ[_0x444eb4(0x25c)]['Game_Battler_startTpbTurn']=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x4d7)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x4d7)]=function(){const _0x3be8f3=_0x444eb4;this['processBattleCoreJS'](_0x3be8f3(0x334)),VisuMZ[_0x3be8f3(0x25c)][_0x3be8f3(0x99b)][_0x3be8f3(0x315)](this),this[_0x3be8f3(0x35d)](_0x3be8f3(0x112));},VisuMZ[_0x444eb4(0x25c)]['Game_Battler_onTurnEnd']=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x1ad)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x1ad)]=function(){const _0x5587e5=_0x444eb4;this[_0x5587e5(0x35d)]('PreEndTurnJS'),VisuMZ[_0x5587e5(0x25c)]['Game_Battler_onTurnEnd'][_0x5587e5(0x315)](this),this['processBattleCoreJS'](_0x5587e5(0x4c5));},Game_Battler[_0x444eb4(0x268)]['processBattleCoreJS']=function(_0x325c7a){const _0x5e0bd7=_0x444eb4,_0x57446c=VisuMZ['BattleCore']['Settings'][_0x5e0bd7(0x5e7)];if(_0x57446c[_0x325c7a])_0x57446c[_0x325c7a][_0x5e0bd7(0x315)](this);for(const _0x34a0e1 of this[_0x5e0bd7(0x1e5)]()){if(!_0x34a0e1)continue;key=VisuMZ['BattleCore'][_0x5e0bd7(0x68a)](_0x34a0e1,_0x325c7a);if(VisuMZ[_0x5e0bd7(0x25c)]['JS'][key]){if(_0x5e0bd7(0x10e)!=='BeBng'){function _0x5cd837(){const _0x331d50=_0x5e0bd7;return this[_0x331d50(0x3de)]>0x0;}}else VisuMZ[_0x5e0bd7(0x25c)]['JS'][key]['call'](this,this,this,_0x34a0e1,0x0);}}},Game_Battler[_0x444eb4(0x268)]['chantStyle']=function(){const _0x32dc01=_0x444eb4;return VisuMZ[_0x32dc01(0x25c)][_0x32dc01(0x90c)][_0x32dc01(0x78b)][_0x32dc01(0x7aa)]||![];},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x633)]=function(){const _0xad1dff=_0x444eb4;if(this[_0xad1dff(0x8c4)]()){if(this[_0xad1dff(0x5ed)]()){if(this['_actions']['some'](_0x2bddde=>_0x2bddde[_0xad1dff(0x712)]()&&_0x2bddde[_0xad1dff(0x4e5)]()))return!![];}else{if(_0xad1dff(0x7e2)===_0xad1dff(0x65e)){function _0x297749(){const _0x27a63c=_0xad1dff;return _0x567e0b[_0x27a63c(0x246)]('ok');}}else{if(this[_0xad1dff(0x5c4)]['some'](_0x1dbd4e=>_0x1dbd4e[_0xad1dff(0x712)]()&&_0x1dbd4e['isMagicSkill']()))return!![];}}}if(BattleManager[_0xad1dff(0x47f)]()&&this['_tpbState']===_0xad1dff(0x1e0)){if(this[_0xad1dff(0x5ed)]())return this[_0xad1dff(0x12f)]()&&this[_0xad1dff(0x12f)]()[_0xad1dff(0x712)]()&&this[_0xad1dff(0x12f)]()[_0xad1dff(0x4e5)]();else{if('GerPt'===_0xad1dff(0x8e6))return this[_0xad1dff(0x12f)]()&&this[_0xad1dff(0x12f)]()[_0xad1dff(0x712)]()&&this[_0xad1dff(0x12f)]()['isMagicSkill']();else{function _0x101e35(){const _0x1a3395=_0xad1dff;return _0x154ee8['VisuMZ_0_CoreEngine']?_0x480cfb[_0x1a3395(0x246)]('cancel'):_0x1a98d3['BattleCore'][_0x1a3395(0x90c)][_0x1a3395(0x49d)][_0x1a3395(0x80c)];}}}}return![];},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x13a)]=function(){const _0x52dcc8=_0x444eb4;if(BattleManager['isTpb']()&&this[_0x52dcc8(0x806)]===_0x52dcc8(0x1e0)){if(_0x52dcc8(0x82a)===_0x52dcc8(0x97a)){function _0x2eb347(){const _0xc318e3=_0x52dcc8;return _0x3b2fbf[_0xc318e3(0x719)]-_0x4a8561['spriteId'];}}else return this[_0x52dcc8(0x5ed)]()?this[_0x52dcc8(0x12f)]()&&this['currentAction']()['item']()&&!this['currentAction']()[_0x52dcc8(0x4e5)]():this[_0x52dcc8(0x12f)]()&&this[_0x52dcc8(0x12f)]()[_0x52dcc8(0x712)]()&&!this[_0x52dcc8(0x12f)]()[_0x52dcc8(0x124)]();}return![];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x4e4)]=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x4c3)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x4c3)]=function(){const _0x392cf1=_0x444eb4;VisuMZ[_0x392cf1(0x25c)][_0x392cf1(0x4e4)]['call'](this),this[_0x392cf1(0x8ef)]=[];},Game_Battler['prototype'][_0x444eb4(0x93e)]=function(){const _0x449e0a=_0x444eb4;if(!this['_damagePopupArray'])this['clearDamagePopup']();return this[_0x449e0a(0x8ef)][_0x449e0a(0x34a)]>0x0;},Game_Battler['prototype'][_0x444eb4(0x5bd)]=function(){const _0x8213a1=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!this[_0x8213a1(0x8ef)])this[_0x8213a1(0x4c3)]();this['createSeparateDamagePopups']();const _0x1f40ad=this[_0x8213a1(0x7f2)]();if(_0x1f40ad)_0x1f40ad[_0x8213a1(0x31d)]();},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x676)]=function(){const _0x37e437=_0x444eb4,_0x2c3871=this['result']();if(_0x2c3871['missed']||_0x2c3871[_0x37e437(0x7d3)]){const _0x28bfff=JsonEx[_0x37e437(0x1f1)](_0x2c3871);_0x28bfff['hpAffected']=![],_0x28bfff[_0x37e437(0x81e)]=0x0,this[_0x37e437(0x8ef)][_0x37e437(0x12b)](_0x28bfff);}if(_0x2c3871[_0x37e437(0x24e)]){if('Tpuak'===_0x37e437(0x22d)){const _0x20d521=JsonEx[_0x37e437(0x1f1)](_0x2c3871);_0x20d521[_0x37e437(0x6c6)]=![],_0x20d521[_0x37e437(0x7d3)]=![],_0x20d521[_0x37e437(0x81e)]=0x0,this[_0x37e437(0x8ef)]['push'](_0x20d521);}else{function _0x1b84c2(){const _0xeec4b3=_0x37e437;if(_0x171eb5['ActionItemMsg'])this[_0xeec4b3(0xc2)](_0x1cc433[_0xeec4b3(0x62e)],_0x2f1abc,_0x3b3995);}}}if(_0x2c3871[_0x37e437(0x81e)]!==0x0){if(_0x37e437(0x94d)===_0x37e437(0x94d)){const _0x244dc0=JsonEx[_0x37e437(0x1f1)](_0x2c3871);_0x244dc0[_0x37e437(0x6c6)]=![],_0x244dc0[_0x37e437(0x7d3)]=![],_0x244dc0['hpAffected']=![],this[_0x37e437(0x8ef)][_0x37e437(0x12b)](_0x244dc0);}else{function _0x170542(){const _0x4be252=_0x37e437;return _0xbdd134[_0x4be252(0x25c)][_0x4be252(0x12a)]['call'](this,_0x1bf838),_0x52d88e[_0x4be252(0x570)](_0x20501f=>{const _0x404c0a=_0x4be252;this['_branch'][this[_0x404c0a(0x3a6)]]=_0x20501f;}),!![];}}}},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x88f)]=function(){const _0x13c711=_0x444eb4;if(!this[_0x13c711(0x8ef)])this[_0x13c711(0x4c3)]();return VisuMZ[_0x13c711(0x25c)]['Settings'][_0x13c711(0x4b3)][_0x13c711(0x8e2)]?this[_0x13c711(0x8ef)]['shift']():this[_0x13c711(0x8ef)][_0x13c711(0x818)]();},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x472)]=function(_0x329bbc,_0x12001f){const _0x24c280=_0x444eb4;if(!SceneManager['isSceneBattle']())return;if(!this[_0x24c280(0x7f2)]())return;if(_0x329bbc[_0x24c280(0x34a)]<=0x0)return;_0x12001f=_0x12001f||{},_0x12001f[_0x24c280(0x888)]=_0x12001f['textColor']||_0x24c280(0x3a8),_0x12001f[_0x24c280(0x4d5)]=_0x12001f[_0x24c280(0x4d5)]||[0x0,0x0,0x0,0x0],_0x12001f[_0x24c280(0x2ce)]=_0x12001f[_0x24c280(0x2ce)]||0x0,this[_0x24c280(0x7f2)]()[_0x24c280(0x472)](_0x329bbc,_0x12001f);},Game_Battler[_0x444eb4(0x268)]['setupIconTextPopup']=function(_0x29319b,_0x1bb402,_0x43c99f){const _0x366927=_0x444eb4;if(!SceneManager[_0x366927(0x11f)]())return;if(!this[_0x366927(0x7f2)]())return;if(_0x1bb402[_0x366927(0x34a)]<=0x0)return;_0x43c99f=_0x43c99f||{},_0x43c99f[_0x366927(0x888)]=_0x43c99f[_0x366927(0x888)]||_0x366927(0x3a8),_0x43c99f[_0x366927(0x4d5)]=_0x43c99f[_0x366927(0x4d5)]||[0x0,0x0,0x0,0x0],_0x43c99f['flashDuration']=_0x43c99f[_0x366927(0x2ce)]||0x0,this[_0x366927(0x7f2)]()[_0x366927(0x6d6)](_0x29319b,_0x1bb402,_0x43c99f);},Game_Battler['prototype'][_0x444eb4(0x856)]=function(){const _0x4d1598=_0x444eb4;if(this[_0x4d1598(0x68b)]())return![];if(this[_0x4d1598(0x734)]()&&this[_0x4d1598(0x7a2)]())return!![];if(this[_0x4d1598(0x5e6)]()&&this[_0x4d1598(0x19f)]()){if(_0x4d1598(0x412)===_0x4d1598(0x760)){function _0x4cf34d(){const _0x3470bc=_0x4d1598;this[_0x3470bc(0x11b)]=_0x392efd,this[_0x3470bc(0x427)]['bitmap']=_0xd49f92[_0x3470bc(0x98b)](_0xbd5176);}}else{if(this[_0x4d1598(0xc9)]()&&this['allowCollapse']())return![];}}else{if(this[_0x4d1598(0xc9)]())return![];}return!![];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x5fb)]=Game_Battler['prototype'][_0x444eb4(0x698)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x698)]=function(){const _0x188db8=_0x444eb4;VisuMZ['BattleCore'][_0x188db8(0x5fb)]['call'](this),this[_0x188db8(0x36d)]();},Game_Battler[_0x444eb4(0x268)]['canBattlerMove']=function(){return!![];},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x513)]=function(){return![];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x866)]=Game_Battler['prototype'][_0x444eb4(0x1f4)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x1f4)]=function(_0x5411d6){const _0xa804c0=_0x444eb4;VisuMZ[_0xa804c0(0x25c)]['Game_Battler_onBattleStart'][_0xa804c0(0x315)](this,_0x5411d6),this[_0xa804c0(0x520)](_0x5411d6);},Game_Battler['prototype'][_0x444eb4(0x520)]=function(_0x38b390){const _0x250e20=_0x444eb4;this[_0x250e20(0x280)](![]);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x723)]=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x34d)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x34d)]=function(_0x33d81e){const _0x295281=_0x444eb4;VisuMZ[_0x295281(0x25c)]['Game_Battler_performActionStart']['call'](this,_0x33d81e);if(!_0x33d81e[_0x295281(0x8be)]()){const _0x5bc62a=this[_0x295281(0x7f2)]();if(_0x5bc62a)_0x5bc62a['stepForward']();}this[_0x295281(0x280)](![]);},VisuMZ['BattleCore'][_0x444eb4(0x4aa)]=Game_Battler['prototype'][_0x444eb4(0x3f9)],Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x3f9)]=function(){const _0x447cd1=_0x444eb4;VisuMZ['BattleCore'][_0x447cd1(0x4aa)]['call'](this),this[_0x447cd1(0x139)]=![];const _0x2e10d5=this['battler']();if(_0x2e10d5)_0x2e10d5[_0x447cd1(0x675)]();this[_0x447cd1(0x280)](![]),this['requestMotionRefresh']();},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x949)]=function(_0x5c5afa){const _0x2dd07c=_0x444eb4;if(_0x5c5afa[_0x2dd07c(0x984)]()){if(_0x2dd07c(0x2be)!==_0x2dd07c(0x2be)){function _0x4bbef1(){_0x4f8496['command119']([_0x1727f4]);}}else this[_0x2dd07c(0x75d)]();}else{if(_0x5c5afa['isGuard']())this['requestMotion']('guard');else{if(_0x5c5afa[_0x2dd07c(0x4e5)]()){if('sQhuU'!==_0x2dd07c(0x3be))this[_0x2dd07c(0x6d9)](_0x2dd07c(0x2f7));else{function _0x2853e3(){const _0xd479b3=_0x2dd07c;return this[_0xd479b3(0x19f)]()?_0x248d71[_0xd479b3(0x25c)][_0xd479b3(0x90c)]['Actor'][_0xd479b3(0x5c8)]:_0x4aa8f9[_0xd479b3(0x25c)][_0xd479b3(0x90c)]['Enemy'][_0xd479b3(0x5c8)];}}}else{if(_0x5c5afa[_0x2dd07c(0x429)]()){if(_0x2dd07c(0x5e9)!==_0x2dd07c(0x32d))_0x5c5afa['item']()[_0x2dd07c(0x243)][_0x2dd07c(0x8fc)]>0x0?this[_0x2dd07c(0x75d)]():this[_0x2dd07c(0x6d9)](_0x2dd07c(0x8ea));else{function _0x4319b3(){this['performWeaponAnimation']();}}}else _0x5c5afa[_0x2dd07c(0x56f)]()&&this[_0x2dd07c(0x6d9)]('item');}}}},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x1cd)]=function(){const _0x3a1e2b=_0x444eb4;return $dataSystem[_0x3a1e2b(0x54d)][0x0];},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x743)]=function(){const _0x3a587d=_0x444eb4,_0x5972ac=this[_0x3a587d(0x1cd)]();return _0x5972ac?_0x5972ac[_0x3a587d(0x21b)]:0x0;},Game_Battler[_0x444eb4(0x268)]['performSubstitute']=function(_0xf6cdc3){const _0x31fcd6=_0x444eb4;if(!$gameSystem['isSideView']())return;const _0x850d1d=this[_0x31fcd6(0x7f2)](),_0x21e899=_0xf6cdc3[_0x31fcd6(0x7f2)]();if(!_0x850d1d||!_0x21e899)return;const _0x56eaaa=_0x21e899[_0x31fcd6(0x7f8)],_0x44bdf1=_0x21e899[_0x31fcd6(0x29f)];this['moveBattlerToPoint'](_0x56eaaa,_0x44bdf1,0x0,![],'Linear',-0x1),_0x850d1d[_0x31fcd6(0x4f1)]();const _0x26f833=VisuMZ[_0x31fcd6(0x25c)][_0x31fcd6(0x90c)]['ActionSequence'];let _0x16b2d3=(_0x21e899[_0x31fcd6(0x592)]+_0x850d1d['width'])/0x2;_0x16b2d3*=this[_0x31fcd6(0x73d)]()?0x1:-0x1;let _0x2e6266=_0x26f833[_0x31fcd6(0x794)]*(this[_0x31fcd6(0x73d)]()?0x1:-0x1);_0xf6cdc3[_0x31fcd6(0x20c)](_0x16b2d3,_0x2e6266,0x0,![],_0x31fcd6(0x5b6)),_0x21e899[_0x31fcd6(0x4f1)]();},Game_Battler[_0x444eb4(0x268)]['requestMotion']=function(_0xfa1497){const _0x443c51=_0x444eb4;if(SceneManager[_0x443c51(0x11f)]()){if(_0x443c51(0x7e4)==='qRbMB'){function _0x51ca3c(){const _0x56f3f4=_0x443c51;this[_0x56f3f4(0x526)]();}}else{const _0x1c5aee=this[_0x443c51(0x7f2)]();_0x1c5aee&&(_0x1c5aee[_0x443c51(0x74f)](_0xfa1497),[_0x443c51(0x436),_0x443c51(0x13f),'missile']['includes'](_0xfa1497)&&this[_0x443c51(0x757)]());}}this[_0x443c51(0x36d)]();},Game_Battler['prototype'][_0x444eb4(0x757)]=function(){},Game_Battler[_0x444eb4(0x268)]['startWeaponAnimation']=function(_0x301500){const _0x25ff1d=_0x444eb4;if(SceneManager['isSceneBattle']()){if(_0x25ff1d(0x618)!==_0x25ff1d(0x618)){function _0x39c932(){const _0xb78180=_0x25ff1d;_0x23e5e3[_0xb78180(0x6d9)](_0x52d0ad);}}else{const _0x842e7a=this[_0x25ff1d(0x7f2)]();if(_0x842e7a)_0x842e7a[_0x25ff1d(0x6b5)](_0x301500);}}},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x574)]=function(){const _0x47649a=_0x444eb4;if(SceneManager['isSceneBattle']()){const _0x4d5472=this[_0x47649a(0x743)]();this[_0x47649a(0x2cb)](_0x4d5472);}},Game_Battler['prototype'][_0x444eb4(0x39c)]=function(_0x24dbf9,_0x5b9b24){const _0x2628fd=_0x444eb4;if(!_0x24dbf9)return;if(!_0x24dbf9[_0x2628fd(0x712)]())return;if(_0x24dbf9[_0x2628fd(0x984)]())return;if(_0x24dbf9[_0x2628fd(0x8be)]())return;if(_0x24dbf9['isItem']())return;let _0x53db5b=0x0;const _0x2085cf=VisuMZ[_0x2628fd(0x25c)][_0x2628fd(0x90c)][_0x2628fd(0x4d4)],_0x4010fe=_0x24dbf9[_0x2628fd(0x712)]()['note'];if(_0x4010fe['match'](/<CAST ANIMATION: (\d+)>/i)){if(_0x2628fd(0x137)!==_0x2628fd(0x137)){function _0x46fe4b(){const _0x2a940c=_0x2628fd;_0x337b1d[_0x2a940c(0x457)](_0x10a822);}}else _0x53db5b=Number(RegExp['$1']);}else{if(_0x4010fe[_0x2628fd(0x7db)](/<NO CAST ANIMATION>/i))return;else{if(_0x24dbf9[_0x2628fd(0x241)]()){if('zXGxj'!==_0x2628fd(0x4fe))_0x53db5b=_0x2085cf[_0x2628fd(0x325)];else{function _0x3c6628(){_0x495780=_0x1458f0>=_0x4e0286?_0x3a35f7:_0x241a86;}}}else{if(_0x24dbf9[_0x2628fd(0x3df)]())_0x53db5b=_0x2085cf['CastPhysical'];else _0x24dbf9[_0x2628fd(0x4e5)]()&&(_0x53db5b=_0x2085cf['CastMagical']);}}}if(_0x53db5b>0x0){if(_0x2628fd(0x40e)===_0x2628fd(0x170)){function _0xb463b0(){const _0x3eac24=_0x2628fd;_0xd1f599[_0x3eac24(0x25c)]['BattleManager_selectNextCommand'][_0x3eac24(0x315)](this);}}else $gameTemp[_0x2628fd(0x979)]([this],_0x53db5b,!!_0x5b9b24);}},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x1f8)]=function(){const _0x72c3b6=_0x444eb4;SoundManager['playReflection']();let _0x396ba9=VisuMZ['BattleCore'][_0x72c3b6(0x90c)][_0x72c3b6(0x4d4)][_0x72c3b6(0x577)];_0x396ba9>0x0&&$gameTemp['requestAnimation']([this],_0x396ba9);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x143)]=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x7e9)],Game_Battler['prototype']['performDamage']=function(){const _0x2b4935=_0x444eb4;VisuMZ[_0x2b4935(0x25c)][_0x2b4935(0x143)][_0x2b4935(0x315)](this),this[_0x2b4935(0x968)]();},VisuMZ[_0x444eb4(0x25c)]['Game_Battler_performMiss']=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x92d)],Game_Battler['prototype']['performMiss']=function(){const _0xe7e72e=_0x444eb4;VisuMZ['BattleCore']['Game_Battler_performMiss'][_0xe7e72e(0x315)](this),this[_0xe7e72e(0x968)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x8b2)]=Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x57d)],Game_Battler['prototype'][_0x444eb4(0x57d)]=function(){const _0x1530ce=_0x444eb4;VisuMZ['BattleCore']['Game_Battler_performEvasion'][_0x1530ce(0x315)](this),this['performFlinch']();},Game_Battler['prototype']['performFlinch']=function(){const _0x22e163=_0x444eb4;if(!$gameSystem['isSideView']())return;if(this[_0x22e163(0x139)])return;this[_0x22e163(0x139)]=!![];const _0x269500=this[_0x22e163(0x7f2)]();if(_0x269500)_0x269500[_0x22e163(0x539)]();},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x1da)]=function(){const _0x529907=_0x444eb4;if(this['isDead']()&&this[_0x529907(0x713)]!==_0x529907(0x4f9)){this['requestMotion'](_0x529907(0x4f9));return;}if(this['isDead']()&&this['_motionType']===_0x529907(0x4f9))return;if(!!this[_0x529907(0x953)])return;if(this[_0x529907(0x5e6)]()){this[_0x529907(0x7f2)]()['refreshMotion'](),this['clearFreezeMotion']();return;}if(this['_motionType']===_0x529907(0x84b))return;if(this['_motionType']===_0x529907(0x29c)&&!BattleManager[_0x529907(0x144)]())return;if(this['_motionType']===_0x529907(0x6f1)&&!BattleManager[_0x529907(0x144)]())return;this[_0x529907(0x698)]();if(this[_0x529907(0x7f2)]()&&BattleManager[_0x529907(0x144)]()){if(_0x529907(0x8dc)!==_0x529907(0x29a)){this[_0x529907(0x7f2)]()[_0x529907(0x3a5)](),this[_0x529907(0x36d)]();return;}else{function _0x15ab72(){const _0x52e58c=_0x529907,_0x48faa7=this[_0x52e58c(0x129)];_0x48faa7[_0x52e58c(0x45e)](_0x2b54f1,0x0,_0x2c444a['y'],_0x48faa7[_0x52e58c(0x5e5)],_0x52e58c(0x373));}}}},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x8f3)]=function(){const _0x2f467e=_0x444eb4;return this[_0x2f467e(0x627)];},Game_Battler['prototype'][_0x444eb4(0x280)]=function(_0x38025f){const _0x587039=_0x444eb4;if(!$gameSystem[_0x587039(0x73c)]())return;this['_isBattlerFlipped']=_0x38025f;const _0xb357c7=this[_0x587039(0x7f2)]();if(_0xb357c7)_0xb357c7[_0x587039(0x7ca)]();},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x3db)]=function(_0x3b47,_0x26ddf0,_0x160bf2){const _0xed1d1a=_0x444eb4;if(!$gameSystem['isSideView']())return;const _0x65b7d0=this[_0xed1d1a(0x7f2)]();if(!_0x65b7d0)return;if(_0x3b47===_0x65b7d0[_0xed1d1a(0x7f8)])return;let _0x28b4c0=![];if(this['isActor']()){if(_0xed1d1a(0x25d)!==_0xed1d1a(0x441)){if(_0x3b47>_0x65b7d0['_baseX'])_0x28b4c0=!![];if(_0x3b47<_0x65b7d0['_baseX'])_0x28b4c0=![];}else{function _0x2f2eb4(){const _0x47a335=_0xed1d1a;return _0x49cd6d[_0x47a335(0x25c)][_0x47a335(0x90c)][_0x47a335(0x370)][_0x47a335(0x8b0)];}}}else{if(this['isEnemy']()){if(_0xed1d1a(0x558)!==_0xed1d1a(0x558)){function _0x1780b2(){const _0x1003f5=_0xed1d1a;this['_animationContainer'][_0x1003f5(0x910)](_0x525e1b);}}else{if(_0x3b47>_0x65b7d0[_0xed1d1a(0x7f8)])_0x28b4c0=![];if(_0x3b47<_0x65b7d0[_0xed1d1a(0x7f8)])_0x28b4c0=!![];}}};this[_0xed1d1a(0x280)](_0x160bf2?!_0x28b4c0:_0x28b4c0),_0x65b7d0['updateFlip']();},Game_Battler['prototype'][_0x444eb4(0x20c)]=function(_0x460832,_0x3fee79,_0x58f217,_0x496270,_0x2828ad){const _0x1ea91f=_0x444eb4;if(!$gameSystem[_0x1ea91f(0x73c)]())return;const _0x43ea20=this[_0x1ea91f(0x7f2)]();if(!_0x43ea20)return;if(_0x496270)this[_0x1ea91f(0x3db)](_0x460832+_0x43ea20['_baseX'],_0x3fee79+_0x43ea20[_0x1ea91f(0x29f)],![]);_0x460832+=_0x43ea20[_0x1ea91f(0x7f8)]-_0x43ea20[_0x1ea91f(0x76b)],_0x3fee79+=_0x43ea20[_0x1ea91f(0x29f)]-_0x43ea20[_0x1ea91f(0x383)],_0x43ea20['startMove'](_0x460832,_0x3fee79,_0x58f217);if(Imported[_0x1ea91f(0x305)])_0x43ea20[_0x1ea91f(0x645)](_0x2828ad||'Linear');},Game_Battler['prototype']['moveBattlerToPoint']=function(_0x43ce42,_0xccc8db,_0x5e3189,_0x3dbe97,_0x361031,_0x41cd45){const _0x3885d2=_0x444eb4;if(!$gameSystem['isSideView']())return;const _0x255bba=this[_0x3885d2(0x7f2)]();if(!_0x255bba)return;if(_0x41cd45>=0x0){if('zgHDt'!=='zgHDt'){function _0xff19cf(){const _0x503ee5=_0x3885d2;_0x1f6bab['bitmap']=_0xe8e90d[_0x503ee5(0x1a5)];}}else{if(_0x255bba[_0x3885d2(0x7f8)]>_0x43ce42)_0x43ce42+=_0x255bba['width']/0x2+_0x41cd45;if(_0x255bba[_0x3885d2(0x7f8)]<_0x43ce42)_0x43ce42-=_0x255bba[_0x3885d2(0x592)]/0x2+_0x41cd45;}}if(_0x3dbe97)this['setBattlerFacePoint'](_0x43ce42,_0xccc8db,![]);_0x43ce42-=_0x255bba['_homeX'],_0xccc8db-=_0x255bba[_0x3885d2(0x383)],_0x255bba['startMove'](_0x43ce42,_0xccc8db,_0x5e3189);if(Imported[_0x3885d2(0x305)])_0x255bba['setMoveEasingType'](_0x361031||_0x3885d2(0x5b6));},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x81a)]=function(_0x16856e,_0x3277eb,_0x2aa436){const _0x21078b=_0x444eb4;if(!$gameSystem[_0x21078b(0x73c)]())return;const _0x3b7929=this[_0x21078b(0x7f2)]();if(!_0x3b7929)return;_0x3b7929[_0x21078b(0x3bc)](_0x16856e,_0x3277eb,_0x2aa436);},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x882)]=function(_0xea64ef,_0x35b4ce){const _0x4f4bec=_0x444eb4;if(!$gameSystem[_0x4f4bec(0x73c)]())return;const _0x203e88=this[_0x4f4bec(0x7f2)]();if(!_0x203e88)return;_0x203e88[_0x4f4bec(0x735)](_0xea64ef,_0x35b4ce);},Game_Battler[_0x444eb4(0x268)]['spinBattler']=function(_0x644040,_0x531f79,_0x4cefc0,_0x2b6359){const _0x24dc6b=_0x444eb4;if(!$gameSystem[_0x24dc6b(0x73c)]())return;const _0x34dfef=this[_0x24dc6b(0x7f2)]();if(!_0x34dfef)return;_0x34dfef[_0x24dc6b(0x812)](_0x644040,_0x531f79,_0x4cefc0,_0x2b6359);},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x2a8)]=function(_0x5431fc,_0x3d4014,_0x1a1485,_0x1aac64){const _0x3bdcdd=_0x444eb4;if(!$gameSystem[_0x3bdcdd(0x73c)]())return;const _0x2b4291=this[_0x3bdcdd(0x7f2)]();if(!_0x2b4291)return;if(this['isActor']()){if(_0x3bdcdd(0x622)!==_0x3bdcdd(0x622)){function _0x52e323(){const _0x5d72f0=_0x3bdcdd;this['_mainSprite'][_0x5d72f0(0x8fa)]=_0x85655d[_0x5d72f0(0x83e)](_0x2bc1e6);}}else _0x5431fc*=-0x1,_0x3d4014*=-0x1;}_0x2b4291[_0x3bdcdd(0x4c8)](_0x5431fc,_0x3d4014,_0x1a1485,_0x1aac64);},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x927)]=function(_0x5ef79d,_0x4bf237,_0x4bf385,_0x4303){const _0x5eaaa9=_0x444eb4;if(!$gameSystem[_0x5eaaa9(0x73c)]())return;const _0x573c72=this[_0x5eaaa9(0x7f2)]();if(!_0x573c72)return;_0x573c72[_0x5eaaa9(0x836)](_0x5ef79d,_0x4bf237,_0x4bf385,_0x4303);},Game_Battler['prototype']['changeBattlerOpacity']=function(_0x2c2b9e,_0x2c67ec,_0x38d61b){const _0x3526ad=_0x444eb4;if(!$gameSystem[_0x3526ad(0x73c)]())return;const _0x1608f9=this[_0x3526ad(0x7f2)]();if(!_0x1608f9)return;_0x1608f9[_0x3526ad(0x925)](_0x2c2b9e,_0x2c67ec,_0x38d61b);},Game_Battler[_0x444eb4(0x268)]['clearFreezeMotion']=function(){const _0x3ace88=_0x444eb4,_0xf59a8c=!!this[_0x3ace88(0x953)];this['_freezeMotionData']=undefined,_0xf59a8c&&(this[_0x3ace88(0x1da)](),this['clearFreezeMotionForWeapons']());},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0xc0)]=function(){const _0x56fb62=_0x444eb4;if(!SceneManager[_0x56fb62(0x11f)]())return;const _0x2b3b70=this[_0x56fb62(0x7f2)]();if(!_0x2b3b70)return;let _0xac877b=this[_0x56fb62(0x73d)]()?_0x2b3b70['_weaponSprite']:_0x2b3b70[_0x56fb62(0x36b)]['_weaponSprite'];_0xac877b&&_0xac877b[_0x56fb62(0x18f)](0x0);},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x8a2)]=function(_0x30ac3c,_0x334d9e,_0x38234b){const _0x40df3f=_0x444eb4;if(this[_0x40df3f(0x5e6)]()&&!this[_0x40df3f(0x19f)]())return;let _0x118157=0x0;if(this['isActor']()){if(_0x40df3f(0x379)===_0x40df3f(0x2b3)){function _0x411406(){const _0x15128b=_0x40df3f;let _0x502a21=_0x58c3ff(_0x182751['$1']);while(_0x502a21--){const _0x263682=_0x343064[_0x15128b(0x85a)](0x2)===0x0?this[_0x15128b(0x841)]():this['friendsUnit']();_0x2f0b71[_0x15128b(0x12b)](_0x263682[_0x15128b(0x1d1)]());}return this[_0x15128b(0x6a1)](_0x72d58);}}else{const _0x7ea1ae=this['weapons']();_0x118157=_0x7ea1ae[0x0]?_0x7ea1ae[0x0]['wtypeId']:0x0;}}else{if(this[_0x40df3f(0x5e6)]()){if(_0x40df3f(0x214)===_0x40df3f(0x10d)){function _0x484f5e(){const _0x4b4a99=_0x40df3f;if(_0x35ffd6[_0x4b4a99(0x25c)][_0x4b4a99(0x90c)]['ActionSequence'][_0x4b4a99(0x8cc)]){const _0x5a9d93=_0x63af83[_0x4b4a99(0x712)]();this[_0x4b4a99(0x12b)](_0x4b4a99(0x877),_0x39c9f4,[_0x54b564],_0x5a9d93[_0x4b4a99(0x8e9)]);}}}else _0x118157=this[_0x40df3f(0x91e)]()['wtypeId']||0x0;}}const _0x1f4181=$dataSystem['attackMotions'][_0x118157];if(_0x30ac3c===_0x40df3f(0x606)){if(_0x40df3f(0x469)!==_0x40df3f(0x469)){function _0x36d8aa(){const _0xb1ade4=_0x40df3f;_0x4c3dfb[_0xb1ade4(0x268)][_0xb1ade4(0x54f)][_0xb1ade4(0x315)](this),this[_0xb1ade4(0x164)](),this[_0xb1ade4(0x1b9)]();}}else _0x30ac3c=[_0x40df3f(0x13f),'swing',_0x40df3f(0x660)][_0x1f4181[_0x40df3f(0x8fc)]]||_0x40df3f(0x436);}this['_freezeMotionData']={'motionType':_0x30ac3c,'weaponImageId':_0x334d9e?_0x1f4181['weaponImageId']:0x0,'pattern':_0x38234b};},Game_Battler[_0x444eb4(0x268)][_0x444eb4(0x906)]=function(_0x4e8c9d){const _0x18498b=_0x444eb4;if(!_0x4e8c9d)return![];return _0x4e8c9d[_0x18498b(0x744)]()===this['friendsUnit']();},Game_Battler[_0x444eb4(0x268)]['isOpponent']=function(_0x42844b){const _0x22796b=_0x444eb4;if(!_0x42844b)return![];return _0x42844b[_0x22796b(0x841)]()===this[_0x22796b(0x744)]();},VisuMZ[_0x444eb4(0x25c)]['Game_Actor_setup']=Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x18f)],Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x18f)]=function(_0x37ccc7){const _0x191c85=_0x444eb4;VisuMZ['BattleCore']['Game_Actor_setup'][_0x191c85(0x315)](this,_0x37ccc7),this[_0x191c85(0x6de)]();},Game_Actor[_0x444eb4(0x268)]['initBattlePortrait']=function(){const _0x15e5be=_0x444eb4;this[_0x15e5be(0x185)]='',this[_0x15e5be(0x4cb)]()&&this[_0x15e5be(0x4cb)]()['note'][_0x15e5be(0x7db)](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this['_battlePortrait']=String(RegExp['$1']));},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x402)]=function(){const _0x52574d=_0x444eb4;if(this[_0x52574d(0xff)]()!=='')return this[_0x52574d(0xff)]();else{if(Imported['VisuMZ_1_MainMenuCore']&&this[_0x52574d(0x75e)]()!=='')return this[_0x52574d(0x75e)]();}return'';},Game_Actor[_0x444eb4(0x268)]['getBattlePortrait']=function(){const _0x2dbed9=_0x444eb4;if(this[_0x2dbed9(0x185)]===undefined)this['initBattlePortrait']();return this[_0x2dbed9(0x185)];},Game_Actor[_0x444eb4(0x268)]['setBattlePortrait']=function(_0x1fdd06){const _0xa7286=_0x444eb4;if(this[_0xa7286(0x185)]===undefined)this[_0xa7286(0x6de)]();this[_0xa7286(0x185)]=_0x1fdd06;if(SceneManager[_0xa7286(0x11f)]()&&$gameParty['battleMembers']()[_0xa7286(0x8f7)](this)){if('CJTjT'===_0xa7286(0x797)){function _0x4e18b1(){const _0x196d46=_0xa7286,_0x4992c5=_0xb8bb0b(_0xa79441['$1']);_0x4992c5<_0x483ba5?(_0x1b3888('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x34b16c,_0x4992c5,_0x1b32c6)),_0x279eba[_0x196d46(0x71b)]()):_0x5c780f=_0x34e14d[_0x196d46(0x960)](_0x4992c5,_0x59dacb);}}else{const _0x154489=SceneManager[_0xa7286(0x3a7)][_0xa7286(0x6e0)];if(_0x154489)_0x154489[_0xa7286(0x572)](this);}}},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x919)]=function(){return!![];},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x77d)]=function(){const _0x265eaa=_0x444eb4;if(!this['isConfused']()&&BattleManager[_0x265eaa(0xcc)])return!![];return Game_Battler[_0x265eaa(0x268)][_0x265eaa(0x77d)][_0x265eaa(0x315)](this);},VisuMZ['BattleCore'][_0x444eb4(0x233)]=Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x5ce)],Game_Actor[_0x444eb4(0x268)]['makeActionList']=function(){const _0xb8b8e5=_0x444eb4;if(BattleManager['_autoBattle']&&!ConfigManager[_0xb8b8e5(0x534)]){if(_0xb8b8e5(0x928)!==_0xb8b8e5(0x928)){function _0x3010ff(){const _0x4dbd52=_0xb8b8e5;return _0x45702d[_0x4dbd52(0x25c)][_0x4dbd52(0x3b7)][_0x4dbd52(0x315)](this);}}else return this[_0xb8b8e5(0x771)]();}else{return VisuMZ[_0xb8b8e5(0x25c)][_0xb8b8e5(0x233)][_0xb8b8e5(0x315)](this);;}},Game_Actor[_0x444eb4(0x268)]['makeActionListAutoAttack']=function(){const _0x174330=_0x444eb4,_0x22ad5e=[],_0x137ba2=new Game_Action(this);return _0x137ba2['setAttack'](),_0x22ad5e[_0x174330(0x12b)](_0x137ba2),_0x22ad5e;},Game_Actor['prototype'][_0x444eb4(0x5d5)]=function(){const _0x4c3c42=_0x444eb4;if(this[_0x4c3c42(0x49f)]()['note'][_0x4c3c42(0x7db)](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)){if(_0x4c3c42(0x232)!==_0x4c3c42(0x4a5))return String(RegExp['$1'])['split'](/[\r\n]+/);else{function _0xbfe7cc(){const _0x4cf4fd=_0x4c3c42;this['isAnimationShownOnBattlePortrait'](_0x322b5f)?this['battleStatusWindowAnimationContainer']()[_0x4cf4fd(0x86a)](_0x48ed74):this[_0x4cf4fd(0x5e1)]['addChild'](_0x20c7e4),this[_0x4cf4fd(0x56e)][_0x4cf4fd(0x12b)](_0x4e1040);}}}else{if(_0x4c3c42(0x36c)!==_0x4c3c42(0x36c)){function _0x63a0ac(){const _0x545274=_0x4c3c42;_0x4ff08b[_0x545274(0x25c)]['Scene_Battle_terminate'][_0x545274(0x315)](this);}}else return VisuMZ[_0x4c3c42(0x25c)]['Settings']['ActorCmd'][_0x4c3c42(0x973)];}},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x786)]=function(){const _0x44e747=_0x444eb4;if(this['_cache'][_0x44e747(0x8e8)]!==undefined)return this[_0x44e747(0x807)][_0x44e747(0x8e8)];return this['actor']()[_0x44e747(0x4bb)]['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x44e747(0x807)][_0x44e747(0x8e8)]=eval(RegExp['$1']),this[_0x44e747(0x807)][_0x44e747(0x312)]=eval(RegExp['$2'])):this[_0x44e747(0x807)]['svAnchorX']=Game_Battler[_0x44e747(0x268)][_0x44e747(0x786)][_0x44e747(0x315)](this),this[_0x44e747(0x807)][_0x44e747(0x8e8)];},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x967)]=function(){const _0x15f4cb=_0x444eb4;if(this[_0x15f4cb(0x807)][_0x15f4cb(0x312)]!==undefined)return this['_cache']['svAnchorY'];return this[_0x15f4cb(0x4cb)]()[_0x15f4cb(0x4bb)]['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x15f4cb(0x807)][_0x15f4cb(0x8e8)]=eval(RegExp['$1']),this['_cache']['svAnchorY']=eval(RegExp['$2'])):this[_0x15f4cb(0x807)]['svAnchorY']=Game_Battler[_0x15f4cb(0x268)]['svBattlerAnchorY'][_0x15f4cb(0x315)](this),this[_0x15f4cb(0x807)][_0x15f4cb(0x312)];},Game_Actor[_0x444eb4(0x268)]['svBattlerShadowVisible']=function(){const _0xe000ad=_0x444eb4;if(this['_cache']['svShadow']!==undefined)return this[_0xe000ad(0x807)][_0xe000ad(0x1b4)];if(this[_0xe000ad(0x4cb)]()[_0xe000ad(0x4bb)][_0xe000ad(0x7db)](/<SIDEVIEW SHOW SHADOW>/i)){if(_0xe000ad(0x884)!==_0xe000ad(0x79f))this[_0xe000ad(0x807)]['svShadow']=!![];else{function _0x1066bc(){const _0x3f3a52=_0xe000ad;_0x5d9658[_0x3f3a52(0x25c)][_0x3f3a52(0x43c)][_0x3f3a52(0x315)](this);}}}else{if(this[_0xe000ad(0x4cb)]()[_0xe000ad(0x4bb)][_0xe000ad(0x7db)](/<SIDEVIEW HIDE SHADOW>/i))this['_cache']['svShadow']=![];else{if(_0xe000ad(0x5a4)!==_0xe000ad(0x5a4)){function _0x8342b7(){const _0x3a973b=_0xe000ad;this[_0x3a973b(0x35d)](_0x3a973b(0x21f)),_0x3c6ed9[_0x3a973b(0x25c)][_0x3a973b(0x1a6)]['call'](this),this['processBattleCoreJS'](_0x3a973b(0x4c5));}}else this[_0xe000ad(0x807)][_0xe000ad(0x1b4)]=Game_Battler[_0xe000ad(0x268)]['svBattlerShadowVisible'][_0xe000ad(0x315)](this);}}return this['_cache']['svShadow'];},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x44b)]=function(){const _0x22d26f=_0x444eb4;return VisuMZ['BattleCore'][_0x22d26f(0x90c)][_0x22d26f(0x78b)]['SmoothImage'];},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x757)]=function(){const _0x307ae3=_0x444eb4,_0x247f69=this[_0x307ae3(0x93b)](),_0x3af500=_0x247f69[0x0]?_0x247f69[0x0][_0x307ae3(0x74e)]:0x0,_0x5c3997=$dataSystem['attackMotions'][_0x3af500];_0x5c3997&&this[_0x307ae3(0x2cb)](_0x5c3997['weaponImageId']);},Game_Actor[_0x444eb4(0x268)]['performAction']=function(_0x55d57f){const _0x1fae1d=_0x444eb4;Game_Battler[_0x1fae1d(0x268)][_0x1fae1d(0x298)][_0x1fae1d(0x315)](this,_0x55d57f),this['performActionMotions'](_0x55d57f);},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x1cd)]=function(){const _0x4240de=_0x444eb4,_0x213060=this[_0x4240de(0x93b)](),_0x4c565d=_0x213060[0x0]?_0x213060[0x0][_0x4240de(0x74e)]:0x0;return $dataSystem[_0x4240de(0x54d)][_0x4c565d];},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x24a)]=function(){const _0x382849=_0x444eb4;let _0x5b23df=_0x382849(0x24a);if(this[_0x382849(0x684)](_0x5b23df))return this[_0x382849(0x807)][_0x5b23df];return this['_cache'][_0x5b23df]=this[_0x382849(0x5a9)](this[_0x382849(0x4cb)]()),this['_cache'][_0x5b23df];},Game_Actor[_0x444eb4(0x268)][_0x444eb4(0x7ae)]=function(){const _0x315aec=_0x444eb4;let _0x252ee1='battleUIOffsetY';if(this['checkCacheKey'](_0x252ee1))return this[_0x315aec(0x807)][_0x252ee1];return this[_0x315aec(0x807)][_0x252ee1]=this[_0x315aec(0x423)](this[_0x315aec(0x4cb)]()),this['_cache'][_0x252ee1];},VisuMZ['BattleCore'][_0x444eb4(0x15b)]=Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x18f)],Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x18f)]=function(_0x19ad4d,_0x19e17a,_0x2948bf){const _0x4869da=_0x444eb4;_0x19ad4d=DataManager[_0x4869da(0x356)](_0x19ad4d),VisuMZ[_0x4869da(0x25c)][_0x4869da(0x15b)][_0x4869da(0x315)](this,_0x19ad4d,_0x19e17a,_0x2948bf);Imported[_0x4869da(0x98a)]&&this[_0x4869da(0x709)]();this[_0x4869da(0x3f4)](),this[_0x4869da(0x997)]();if(Imported[_0x4869da(0x98a)]){if(_0x4869da(0x687)!=='ockAy'){function _0x5f3613(){const _0x19f950=_0x4869da,_0x1cf2f3=_0x9f8379['x']+_0x5128ea['floor']((_0x37ea7a[_0x19f950(0x592)]-_0xc754b4)/0x2);this[_0x19f950(0x2bb)](_0xf5d265,_0x1cf2f3,_0x5cb9d4['y'],_0x2c8c46);}}else this[_0x4869da(0x8a4)]();}},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x3f4)]=function(){const _0x3a5fff=_0x444eb4,_0x14fa18=VisuMZ[_0x3a5fff(0x25c)][_0x3a5fff(0x90c)]['Enemy'];this['_attackAnimationId']=_0x14fa18[_0x3a5fff(0x24c)],this[_0x3a5fff(0x449)]={};},Game_Enemy['prototype'][_0x444eb4(0x997)]=function(){const _0x42a8dc=_0x444eb4,_0xe01d6c=VisuMZ[_0x42a8dc(0x25c)][_0x42a8dc(0x90c)][_0x42a8dc(0x874)],_0x41f89c=this[_0x42a8dc(0x3d5)]()[_0x42a8dc(0x4bb)];this[_0x42a8dc(0x449)]={'name':'','wtypeId':_0xe01d6c[_0x42a8dc(0x4a9)],'collapse':_0xe01d6c[_0x42a8dc(0x400)],'motionIdle':_0xe01d6c[_0x42a8dc(0x7c5)],'width':_0xe01d6c[_0x42a8dc(0x6ec)]||0x40,'height':_0xe01d6c[_0x42a8dc(0x831)]||0x40,'anchorX':_0xe01d6c[_0x42a8dc(0x270)]||0x0,'anchorY':_0xe01d6c[_0x42a8dc(0x933)]||0x0,'shadow':_0xe01d6c[_0x42a8dc(0x21a)]};if(_0x41f89c[_0x42a8dc(0x7db)](/<ATTACK ANIMATION:[ ](\d+)>/i)){if(_0x42a8dc(0x571)===_0x42a8dc(0x571))this[_0x42a8dc(0x1a2)]=Number(RegExp['$1']);else{function _0x51a43a(){const _0x3984ef=_0x42a8dc;_0x4c2e30[_0x3984ef(0x268)]['drawSkillCost'][_0x3984ef(0x315)](this,_0x52c47c,_0xbb3d8b,_0x8e1674,_0xf6f4a3,_0x4b377d);}}}const _0x183669=this['_svBattlerData'];if(_0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW BATTLER: (.*)>/i))_0x183669[_0x42a8dc(0x2d2)]=String(RegExp['$1']);else{if(_0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){if(_0x42a8dc(0x85f)===_0x42a8dc(0x85f)){const _0x1b61ea=String(RegExp['$1'])[_0x42a8dc(0x79d)](/[\r\n]+/)['remove']('');_0x183669['name']=DataManager['processRandomizedData'](_0x1b61ea);}else{function _0x32a9f6(){const _0x5db252=_0x42a8dc;this[_0x5db252(0x2a0)]=(this[_0x5db252(0x2a0)]*(_0x229df4-0x1)+this[_0x5db252(0x206)])/_0x3e386c;}}}}_0x41f89c['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x183669[_0x42a8dc(0x38d)]=eval(RegExp['$1']),_0x183669['anchorY']=eval(RegExp['$2']));if(_0x41f89c['match'](/<SIDEVIEW COLLAPSE>/i)){if(_0x42a8dc(0x7ff)===_0x42a8dc(0x7ff))_0x183669['collapse']=!![];else{function _0x4a86a9(){const _0x4d3ce1=_0x42a8dc;return this[_0x4d3ce1(0x537)]();}}}else{if(_0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW NO COLLAPSE>/i)){if(_0x42a8dc(0x5c3)!==_0x42a8dc(0x1ee))_0x183669[_0x42a8dc(0x208)]=![];else{function _0x4661f6(){const _0x538fae=_0x42a8dc;return this[_0x538fae(0x1fe)]();}}}}if(_0x41f89c['match'](/<SIDEVIEW SHOW SHADOW>/i))_0x183669[_0x42a8dc(0x631)]=!![];else _0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x183669[_0x42a8dc(0x631)]=![]);if(_0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW IDLE MOTION: (.*)>/i)){if(_0x42a8dc(0x2cc)==='Wnbgq')_0x183669[_0x42a8dc(0xeb)]=String(RegExp['$1'])['toLowerCase']()[_0x42a8dc(0x3af)]();else{function _0x364bb8(){const _0x1e8bcc=_0x42a8dc,_0x308c56=this[_0x1e8bcc(0xac)]();if(['xp'][_0x1e8bcc(0x8f7)](_0x308c56)&&!_0x57900e[_0x1e8bcc(0x73c)]()){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}_0x5ccd63['prototype']['refreshCursor'][_0x1e8bcc(0x315)](this);}}}else{if(_0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0xca0e97=String(RegExp['$1'])[_0x42a8dc(0x79d)](/[\r\n]+/)['remove']('');_0x183669[_0x42a8dc(0xeb)]=DataManager[_0x42a8dc(0x16a)](_0xca0e97);}}_0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x183669[_0x42a8dc(0x592)]=Number(RegExp['$1']),_0x183669[_0x42a8dc(0x773)]=Number(RegExp['$2']));if(_0x41f89c[_0x42a8dc(0x7db)](/<SIDEVIEW WEAPON: (.*)>/i)){if(_0x42a8dc(0x296)!==_0x42a8dc(0x5c2))_0x183669[_0x42a8dc(0x74e)]=DataManager[_0x42a8dc(0x345)](RegExp['$1']);else{function _0x2a36f1(){const _0x330204=_0x42a8dc;_0x5a7534[_0x330204(0x65b)](_0x42b34f);}}}else{if(_0x41f89c['match'](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x2ba08d=String(RegExp['$1'])[_0x42a8dc(0x79d)](/[\r\n]+/)['remove'](''),_0x543bec=DataManager[_0x42a8dc(0x16a)](_0x2ba08d);_0x183669['wtypeId']=DataManager[_0x42a8dc(0x345)](_0x543bec);}}if(Imported[_0x42a8dc(0x98a)]){const _0x4b5e96=this[_0x42a8dc(0x6c4)]();for(const _0x58a8bb of _0x4b5e96){const _0x18dda7=this[_0x42a8dc(0x607)](_0x58a8bb)['Name']['toUpperCase']()[_0x42a8dc(0x3af)](),_0x497337=_0x58a8bb[_0x42a8dc(0x8c0)]()[_0x42a8dc(0x3af)]();if(_0x41f89c[_0x42a8dc(0x7db)](VisuMZ[_0x42a8dc(0x538)][_0x42a8dc(0x8a9)][_0x42a8dc(0x231)[_0x42a8dc(0x4e2)](_0x497337,_0x18dda7)]))_0x183669[_0x42a8dc(0x2d2)]=String(RegExp['$1']);else{if(_0x41f89c[_0x42a8dc(0x7db)](VisuMZ['ElementStatusCore'][_0x42a8dc(0x8a9)][_0x42a8dc(0x1e7)[_0x42a8dc(0x4e2)](_0x497337,_0x18dda7)])){if('mFsWf'===_0x42a8dc(0x594)){const _0x422733=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x42a8dc(0x580)]('');_0x183669[_0x42a8dc(0x2d2)]=DataManager[_0x42a8dc(0x16a)](_0x422733);}else{function _0x3538d9(){const _0x108258=_0x42a8dc,_0xc5c8a3=_0x3b6cac[_0x108258(0x25c)][_0x108258(0x90c)][_0x108258(0x874)];_0xc5c8a3[_0x108258(0x75b)]?this[_0x108258(0x885)]():this[_0x108258(0x526)]();}}}}if(_0x41f89c['match'](VisuMZ[_0x42a8dc(0x538)]['RegExp']['SvWeaponSolo-%1-%2'[_0x42a8dc(0x4e2)](_0x497337,_0x18dda7)]))_0x183669[_0x42a8dc(0x74e)]=DataManager[_0x42a8dc(0x345)](RegExp['$1']);else{if(_0x41f89c['match'](VisuMZ['ElementStatusCore'][_0x42a8dc(0x8a9)][_0x42a8dc(0x67f)[_0x42a8dc(0x4e2)](_0x497337,_0x18dda7)])){const _0x513037=String(RegExp['$1'])[_0x42a8dc(0x79d)](/[\r\n]+/)['remove'](''),_0x4d8956=DataManager[_0x42a8dc(0x16a)](_0x513037);_0x183669['wtypeId']=DataManager[_0x42a8dc(0x345)](_0x4d8956);}}if(_0x41f89c[_0x42a8dc(0x7db)](VisuMZ[_0x42a8dc(0x538)][_0x42a8dc(0x8a9)][_0x42a8dc(0x956)[_0x42a8dc(0x4e2)](_0x497337,_0x18dda7)]))_0x183669['motionIdle']=String(RegExp['$1'])[_0x42a8dc(0x3d1)]()[_0x42a8dc(0x3af)]();else{if(_0x41f89c[_0x42a8dc(0x7db)](VisuMZ[_0x42a8dc(0x538)][_0x42a8dc(0x8a9)][_0x42a8dc(0x1c0)[_0x42a8dc(0x4e2)](_0x497337,_0x18dda7)])){if(_0x42a8dc(0x2ec)==='YPhUZ'){const _0x413836=String(RegExp['$1'])[_0x42a8dc(0x79d)](/[\r\n]+/)[_0x42a8dc(0x580)]('');_0x183669[_0x42a8dc(0xeb)]=DataManager[_0x42a8dc(0x16a)](_0x413836);}else{function _0x4477b6(){const _0x469694=_0x42a8dc;_0x3698db[_0x469694(0x39e)]();}}}}}}},Game_Enemy[_0x444eb4(0x268)]['attackAnimationId1']=function(){const _0x5529da=_0x444eb4;return this[_0x5529da(0x1a2)]||0x0;},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x37f)]=function(){return 0x0;},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x6b3)]=function(){const _0x42a57c=_0x444eb4;if(this[_0x42a57c(0x3d5)]()[_0x42a57c(0x4bb)]['match'](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x42a57c(0x268)][_0x42a57c(0x6b3)][_0x42a57c(0x315)](this);},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x513)]=function(){const _0x30a235=_0x444eb4;if(this[_0x30a235(0x3d5)]()['note']['match'](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x90d)]=function(){const _0x55ddc7=_0x444eb4,_0x5da892=[];for(const _0x40bf30 of this[_0x55ddc7(0x3d5)]()[_0x55ddc7(0x23d)]){const _0xfab531=$dataSkills[_0x40bf30[_0x55ddc7(0x1d4)]];if(_0xfab531&&!_0x5da892['includes'](_0xfab531))_0x5da892[_0x55ddc7(0x12b)](_0xfab531);}return _0x5da892;},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x24a)]=function(){const _0x69f0d3=_0x444eb4;let _0x45e463=_0x69f0d3(0x24a);if(this[_0x69f0d3(0x684)](_0x45e463))return this['_cache'][_0x45e463];return this[_0x69f0d3(0x807)][_0x45e463]=this[_0x69f0d3(0x5a9)](this[_0x69f0d3(0x3d5)]()),this[_0x69f0d3(0x807)][_0x45e463];},Game_Enemy['prototype'][_0x444eb4(0x7ae)]=function(){const _0x4c2966=_0x444eb4;let _0x2b8948=_0x4c2966(0x7ae);if(this[_0x4c2966(0x684)](_0x2b8948))return this[_0x4c2966(0x807)][_0x2b8948];return this[_0x4c2966(0x807)][_0x2b8948]=this[_0x4c2966(0x423)](this['enemy']()),this[_0x4c2966(0x807)][_0x2b8948];},Game_Enemy[_0x444eb4(0x268)]['svBattlerData']=function(){const _0x42067a=_0x444eb4;if(this[_0x42067a(0x449)]!==undefined)return this[_0x42067a(0x449)];return this[_0x42067a(0x997)](),this[_0x42067a(0x449)];},Game_Enemy[_0x444eb4(0x268)]['hasSvBattler']=function(){const _0x4f2cb8=_0x444eb4;return this['svBattlerData']()[_0x4f2cb8(0x2d2)]!=='';},Game_Enemy[_0x444eb4(0x268)]['svBattlerName']=function(){const _0x1c6a45=_0x444eb4;return this[_0x1c6a45(0x91e)]()[_0x1c6a45(0x2d2)];},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x44b)]=function(){const _0x1562ed=_0x444eb4;if(this[_0x1562ed(0x19f)]()){if('FbWQj'!==_0x1562ed(0xc8)){function _0x250cc0(){const _0x5732e0=_0x1562ed,_0x153132=_0x523f1b[_0x5732e0(0x25c)][_0x5732e0(0x90c)][_0x5732e0(0x75c)],_0x38e4b1=_0x153132[_0x5732e0(0x560)]||0xc0,_0x3a45e6=this['windowAreaHeight'](),_0x54cf9f=this['isRightInputMode']()?_0x4dbcca[_0x5732e0(0x6e8)]-_0x38e4b1:0x0,_0x5d8e54=_0x473caa[_0x5732e0(0x6fd)]-_0x3a45e6;return new _0x5e8c2a(_0x54cf9f,_0x5d8e54,_0x38e4b1,_0x3a45e6);}}else return VisuMZ[_0x1562ed(0x25c)]['Settings'][_0x1562ed(0x78b)][_0x1562ed(0x5c8)];}else return VisuMZ[_0x1562ed(0x25c)][_0x1562ed(0x90c)][_0x1562ed(0x874)]['SmoothImage'];},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x298)]=function(_0x1f2557){const _0x542100=_0x444eb4;Game_Battler[_0x542100(0x268)]['performAction'][_0x542100(0x315)](this,_0x1f2557);if(this[_0x542100(0x19f)]())this[_0x542100(0x949)](_0x1f2557);},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x75d)]=function(){const _0x5da31b=_0x444eb4,_0x2ef11f=this[_0x5da31b(0x91e)]()[_0x5da31b(0x74e)]||0x0,_0x45d4c8=$dataSystem[_0x5da31b(0x54d)][_0x2ef11f];if(_0x45d4c8){if(_0x45d4c8[_0x5da31b(0x8fc)]===0x0)this['requestMotion'](_0x5da31b(0x13f));else{if(_0x45d4c8[_0x5da31b(0x8fc)]===0x1)this[_0x5da31b(0x6d9)]('swing');else _0x45d4c8[_0x5da31b(0x8fc)]===0x2&&this[_0x5da31b(0x6d9)](_0x5da31b(0x660));}}},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x757)]=function(){const _0x588fa5=_0x444eb4,_0x2bcedf=this[_0x588fa5(0x91e)]()[_0x588fa5(0x74e)]||0x0,_0x3eed62=$dataSystem[_0x588fa5(0x54d)][_0x2bcedf];if(_0x3eed62){if(_0x588fa5(0x7ea)!==_0x588fa5(0x785))this[_0x588fa5(0x2cb)](_0x3eed62['weaponImageId']);else{function _0x1f2046(){const _0x290df6=_0x588fa5;this[_0x290df6(0x28c)](_0x5d7250[_0x290df6(0x2d2)]);}}}},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x1cd)]=function(){const _0x415f77=_0x444eb4,_0x2574b7=this['svBattlerData']()[_0x415f77(0x74e)]||0x0;return $dataSystem[_0x415f77(0x54d)][_0x2574b7];},Game_Enemy[_0x444eb4(0x268)]['performDamage']=function(){const _0x13c4f8=_0x444eb4;Game_Battler[_0x13c4f8(0x268)][_0x13c4f8(0x7e9)][_0x13c4f8(0x315)](this);if(this[_0x13c4f8(0x919)]()&&this[_0x13c4f8(0x19f)]()){if('hCITU'!=='hCITU'){function _0x1dfe56(){const _0x6fdf13=_0x13c4f8,_0x2fbbf3=this[_0x6fdf13(0x35f)][_0x6fdf13(0x221)](this[_0x6fdf13(0x978)]);this['forceSelect'](_0x2fbbf3);}}else this['requestMotion'](_0x13c4f8(0x243));}SoundManager[_0x13c4f8(0x91b)]();},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x57d)]=function(){const _0x5b2f88=_0x444eb4;Game_Battler['prototype']['performEvasion']['call'](this),this[_0x5b2f88(0x6d9)](_0x5b2f88(0xc7));},Game_Enemy['prototype'][_0x444eb4(0x1e8)]=function(){const _0x3de11b=_0x444eb4;Game_Battler['prototype'][_0x3de11b(0x1e8)]['call'](this),this[_0x3de11b(0x6d9)](_0x3de11b(0xc7));},Game_Enemy[_0x444eb4(0x268)]['performCounter']=function(){const _0x5352db=_0x444eb4;Game_Battler[_0x5352db(0x268)][_0x5352db(0x475)][_0x5352db(0x315)](this),this[_0x5352db(0x75d)]();},Game_Enemy['prototype'][_0x444eb4(0x59e)]=function(){const _0x4b41db=_0x444eb4;if(this[_0x4b41db(0x19f)]()){if(_0x4b41db(0x63e)===_0x4b41db(0x63e)){if(this[_0x4b41db(0x944)]()>=0x1)return!![];return this['svBattlerData']()[_0x4b41db(0x208)];}else{function _0x1331dc(){const _0x4bef76=_0x4b41db;_0x13ec3b[_0x4bef76(0x78b)][_0x4bef76(0x74b)]=![];}}}else{if(_0x4b41db(0x55f)!==_0x4b41db(0x55f)){function _0x3a8b4b(){const _0xdfedf6=_0x4b41db,_0x26e3fb=new _0x575f37(0x0,0x0,_0x5c931f[_0xdfedf6(0x592)],_0x2ac171[_0xdfedf6(0x773)]);this['_commandNameWindow']=new _0x1b4074(_0x26e3fb),this['_commandNameWindow']['opacity']=0x0,this[_0xdfedf6(0x86a)](this[_0xdfedf6(0x129)]),this[_0xdfedf6(0x3cb)]();}}else return!![];}},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x786)]=function(){const _0x9664a0=_0x444eb4;return this[_0x9664a0(0x91e)]()[_0x9664a0(0x38d)];},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x967)]=function(){const _0x14a213=_0x444eb4;return this['svBattlerData']()[_0x14a213(0x291)];},Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x7d6)]=function(){const _0x9678f8=_0x444eb4;return this[_0x9678f8(0x91e)]()[_0x9678f8(0x631)];},VisuMZ[_0x444eb4(0x25c)]['Game_Enemy_transform']=Game_Enemy[_0x444eb4(0x268)]['transform'],Game_Enemy[_0x444eb4(0x268)][_0x444eb4(0x781)]=function(_0x5f5864){const _0x58c70b=_0x444eb4;VisuMZ[_0x58c70b(0x25c)][_0x58c70b(0x335)]['call'](this,_0x5f5864),this[_0x58c70b(0x3f4)](),this[_0x58c70b(0x997)]();const _0x38ccbe=this['battler']();if(_0x38ccbe)_0x38ccbe[_0x58c70b(0x47c)](this);},Game_Unit[_0x444eb4(0x268)]['processBattleCoreJS']=function(_0x21ce6b){const _0x4e0035=_0x444eb4;for(const _0x42a3e9 of this['members']()){if(_0x4e0035(0x78e)!==_0x4e0035(0x3bd)){if(_0x42a3e9)_0x42a3e9['processBattleCoreJS'](_0x21ce6b);}else{function _0x224154(){const _0x496ce6=_0x4e0035;this[_0x496ce6(0x35d)](_0x496ce6(0x334)),_0x1d9a46[_0x496ce6(0x25c)][_0x496ce6(0x99b)]['call'](this),this['processBattleCoreJS'](_0x496ce6(0x112));}}}},Game_Unit[_0x444eb4(0x268)][_0x444eb4(0x1d1)]=function(){const _0x5f10fb=_0x444eb4,_0x221488=this[_0x5f10fb(0x20e)]();return _0x221488[Math[_0x5f10fb(0x85a)](_0x221488['length'])];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x3c5)]=Game_Party['prototype'][_0x444eb4(0x323)],Game_Party[_0x444eb4(0x268)]['addActor']=function(_0x2360ab){const _0x2b5aac=_0x444eb4;VisuMZ[_0x2b5aac(0x25c)][_0x2b5aac(0x3c5)]['call'](this,_0x2360ab),BattleManager[_0x2b5aac(0x6cd)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x26e)]=Game_Party[_0x444eb4(0x268)][_0x444eb4(0x556)],Game_Party[_0x444eb4(0x268)][_0x444eb4(0x556)]=function(_0x434003){const _0x15c873=_0x444eb4;VisuMZ[_0x15c873(0x25c)][_0x15c873(0x26e)][_0x15c873(0x315)](this,_0x434003),BattleManager['refreshStatusWindow']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x417)]=Game_Troop[_0x444eb4(0x268)]['setup'],Game_Troop['prototype'][_0x444eb4(0x18f)]=function(_0x4b081d){const _0x3c9dd1=_0x444eb4;$gameTemp[_0x3c9dd1(0x753)](),$gameTemp[_0x3c9dd1(0x710)](_0x4b081d),VisuMZ[_0x3c9dd1(0x25c)]['Game_Troop_setup']['call'](this,_0x4b081d);},VisuMZ[_0x444eb4(0x25c)]['Game_Map_setupBattleback']=Game_Map[_0x444eb4(0x268)][_0x444eb4(0x7b6)],Game_Map[_0x444eb4(0x268)][_0x444eb4(0x7b6)]=function(){const _0x2a5d4b=_0x444eb4;VisuMZ['BattleCore'][_0x2a5d4b(0x3ae)][_0x2a5d4b(0x315)](this),this[_0x2a5d4b(0x7fe)]();},Game_Map['prototype'][_0x444eb4(0x7fe)]=function(){const _0x60bf92=_0x444eb4;this['_regionBattleback1']={},this[_0x60bf92(0x585)]={};if(!$dataMap)return;const _0x21adbc=$dataMap['note'];if(!_0x21adbc)return;const _0x1b1c58=_0x21adbc['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x1b1c58){if('iNgSp'===_0x60bf92(0x5bc)){function _0x41c687(){return _0x474ec3(_0x427e65['$1'])/0x64;}}else for(const _0x59b0d6 of _0x1b1c58){_0x59b0d6[_0x60bf92(0x7db)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x5c28f4=Number(RegExp['$1']),_0x4d3c9c=Number(RegExp['$2']),_0x45db12=_0x4d3c9c===0x1?this['_regionBattleback1']:this['_regionBattleback2'],_0x18afdb=String(RegExp['$3']);_0x45db12[_0x5c28f4]=_0x18afdb;}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x2a1)]=Game_Map[_0x444eb4(0x268)][_0x444eb4(0xce)],Game_Map['prototype'][_0x444eb4(0xce)]=function(){const _0x178b8d=_0x444eb4;if(!BattleManager['isBattleTest']()){const _0x6ba501=$gamePlayer[_0x178b8d(0x595)]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x178b8d(0x59d)]&&this[_0x178b8d(0x59d)][_0x6ba501]){if(_0x178b8d(0x619)===_0x178b8d(0x980)){function _0x689223(){const _0x23dd90=_0x178b8d;if(this[_0x23dd90(0x266)]===_0x5d76bc&&!_0x59387c[_0x23dd90(0x19f)]())return;}}else return this[_0x178b8d(0x59d)][_0x6ba501];}}return VisuMZ[_0x178b8d(0x25c)][_0x178b8d(0x2a1)][_0x178b8d(0x315)](this);},VisuMZ['BattleCore']['Game_Map_battleback2Name']=Game_Map[_0x444eb4(0x268)][_0x444eb4(0x94a)],Game_Map[_0x444eb4(0x268)][_0x444eb4(0x94a)]=function(){const _0x267248=_0x444eb4;if(!BattleManager[_0x267248(0x22c)]()){if(_0x267248(0x32f)===_0x267248(0x32f)){const _0x116362=$gamePlayer[_0x267248(0x595)]($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this[_0x267248(0x585)][_0x116362])return this[_0x267248(0x585)][_0x116362];}else{function _0x37f2ed(){const _0x3759cb=_0x267248;this['_logWindow'][_0x3759cb(0x12b)]('addText',_0x26e197['emerge'][_0x3759cb(0x4e2)](_0x4b680d)),this[_0x3759cb(0x1e1)][_0x3759cb(0x12b)](_0x3759cb(0x7f3)),_0x23a5b4=!![];}}}return VisuMZ[_0x267248(0x25c)][_0x267248(0x6b6)][_0x267248(0x315)](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x2f5)]=Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x5ab)],Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x5ab)]=function(_0x26161b){const _0x387bd1=_0x444eb4;return $gameTemp[_0x387bd1(0x2b4)](this),VisuMZ[_0x387bd1(0x25c)][_0x387bd1(0x2f5)][_0x387bd1(0x315)](this,_0x26161b);},VisuMZ[_0x444eb4(0x25c)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x5a3)],Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x5a3)]=function(){const _0x1d48a1=_0x444eb4;if(SceneManager['isSceneBattle']())switch(this[_0x1d48a1(0x6f8)]){case _0x1d48a1(0x8eb):if(Imported[_0x1d48a1(0x213)]){if('SujRw'!==_0x1d48a1(0x3e7)){function _0x30317a(){const _0x454971=_0x1d48a1;this[_0x454971(0x5e2)]=(this[_0x454971(0x5e2)]+0x1)%0x4;}}else{if($gameScreen[_0x1d48a1(0x8fd)]()[_0x1d48a1(0x16b)]>0x0)return!![];this['_waitMode']='';}}break;case'battleAnimation':if(BattleManager['_spriteset'][_0x1d48a1(0x555)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0x94f):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x1d48a1(0x8fd)]()['cameraDuration']>0x0)return!![];if($gameScreen[_0x1d48a1(0x8fd)]()[_0x1d48a1(0x931)]>0x0)return!![];this[_0x1d48a1(0x6f8)]='';}break;case'battleEffect':if(BattleManager[_0x1d48a1(0x60c)][_0x1d48a1(0x82b)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0x8c1):if(BattleManager[_0x1d48a1(0x60c)]['isAnyoneFloating']())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0x826):if(BattleManager[_0x1d48a1(0x60c)][_0x1d48a1(0x4f8)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0xf4):if(BattleManager[_0x1d48a1(0x1e1)][_0x1d48a1(0x95b)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0x3e5):if(BattleManager[_0x1d48a1(0x60c)][_0x1d48a1(0x4e9)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case'battleOpacity':if(BattleManager[_0x1d48a1(0x60c)][_0x1d48a1(0x985)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0x94c):if(BattleManager[_0x1d48a1(0x60c)][_0x1d48a1(0x2d1)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0x6a0):if(BattleManager[_0x1d48a1(0x60c)][_0x1d48a1(0x273)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case _0x1d48a1(0x2d5):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen['battleCameraData']()[_0x1d48a1(0x89c)]>0x0)return!![];this[_0x1d48a1(0x6f8)]='';}break;case _0x1d48a1(0x5b0):if(BattleManager[_0x1d48a1(0x60c)][_0x1d48a1(0x837)]())return!![];this[_0x1d48a1(0x6f8)]='';break;case'battleZoom':if(Imported[_0x1d48a1(0x213)]){if($gameScreen[_0x1d48a1(0x8fd)]()[_0x1d48a1(0x762)]>0x0)return!![];this[_0x1d48a1(0x6f8)]='';}break;}return VisuMZ[_0x1d48a1(0x25c)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x12a)]=Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x2c4)],Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x2c4)]=function(_0x1fdebf){const _0x2e2841=_0x444eb4;if(!$gameParty[_0x2e2841(0x763)]())return this[_0x2e2841(0x19d)](_0x1fdebf);else{if('uzXbz'===_0x2e2841(0x7ed)){function _0x349763(){const _0x31b5a2=_0x2e2841;this[_0x31b5a2(0x4a6)]();}}else return VisuMZ[_0x2e2841(0x25c)][_0x2e2841(0x12a)][_0x2e2841(0x315)](this,_0x1fdebf);}},Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x14d)]=function(_0x3bc616){const _0x3df1ed=_0x444eb4;return VisuMZ[_0x3df1ed(0x25c)][_0x3df1ed(0x12a)][_0x3df1ed(0x315)](this,_0x3bc616),BattleManager['setEventCallback'](_0x34ff1d=>{const _0x153002=_0x3df1ed;if(_0x153002(0x5ef)!==_0x153002(0x5ef)){function _0x4c530b(){const _0x44b1de=_0x153002,_0x245ae1=_0x371d73[_0x44b1de(0x25c)][_0x44b1de(0x90c)][_0x44b1de(0x874)];let _0x29825c=![];_0x57c41a[_0x44b1de(0x73c)]()?_0x29825c=_0x245ae1['SideviewSelect']:_0x29825c=_0x245ae1[_0x44b1de(0x849)],this[_0x44b1de(0x322)](_0x29825c?this['maxItems']()-0x1:0x0);}}else this[_0x153002(0x52b)][this[_0x153002(0x3a6)]]=_0x34ff1d;}),!![];},VisuMZ['BattleCore'][_0x444eb4(0x234)]=function(_0x1c2e5a){const _0x346f90=_0x444eb4,_0x16e4a3=$dataCommonEvents[_0x1c2e5a];if(!_0x16e4a3)return![];if(_0x16e4a3[_0x346f90(0x12c)][_0x346f90(0x34a)]<=0x1)return![];return!![];},Game_Interpreter[_0x444eb4(0x268)]['command301_PreBattleEvent']=function(_0x3da256){const _0x35466e=_0x444eb4,_0x524b2a=VisuMZ[_0x35466e(0x25c)][_0x35466e(0x90c)][_0x35466e(0x5e7)],_0x381698=_0x524b2a[_0x35466e(0x3ee)],_0x3b101c=$dataCommonEvents[_0x381698];if(_0x3b101c&&VisuMZ[_0x35466e(0x25c)]['CheckMapBattleEventValid'](_0x381698)){if(_0x35466e(0x355)!==_0x35466e(0x355)){function _0x493ce6(){const _0x5397ba=_0x35466e;return _0x4640cb[_0x5397ba(0x54d)][0x0];}}else{const _0x2c9c84=this[_0x35466e(0x948)]()?this[_0x35466e(0x1e2)]:0x0,_0x1d177d=_0x3b101c[_0x35466e(0x12c)];this[_0x35466e(0x282)](_0x1d177d,_0x2c9c84),this['_list']=JsonEx[_0x35466e(0x1f1)](this[_0x35466e(0x6f0)]);const _0x4b0704={'code':0xbc3,'indent':0x0,'parameters':JsonEx[_0x35466e(0x1f1)](_0x3da256)};return this[_0x35466e(0x6f0)][_0x35466e(0x842)](this['_index']+0x1,0x0,_0x4b0704),!![];}}else return VisuMZ[_0x35466e(0x25c)][_0x35466e(0x12a)][_0x35466e(0x315)](this,_0x3da256);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x6f4)]=BattleManager['onEncounter'],BattleManager[_0x444eb4(0x91f)]=function(){const _0x3b4c6d=_0x444eb4;VisuMZ[_0x3b4c6d(0x25c)]['BattleManager_onEncounter'][_0x3b4c6d(0x315)](this),this['onEncounterBattleCore']();},BattleManager[_0x444eb4(0x497)]=function(){const _0x1d21d5=_0x444eb4,_0x317762=VisuMZ['BattleCore'][_0x1d21d5(0x90c)][_0x1d21d5(0x5e7)],_0x3f4267=_0x317762[_0x1d21d5(0x3ee)];_0x3f4267&&VisuMZ[_0x1d21d5(0x25c)][_0x1d21d5(0x234)](_0x3f4267)&&(this[_0x1d21d5(0x89f)]=!![],$gameTemp[_0x1d21d5(0x2a4)](_0x317762[_0x1d21d5(0x3ee)]),$gameMap['updateInterpreter'](),$gameMap[_0x1d21d5(0x759)][_0x1d21d5(0x96c)]=!![]),_0x317762[_0x1d21d5(0x5eb)]>0x0&&(this[_0x1d21d5(0x1c2)]=!![]);},VisuMZ['BattleCore'][_0x444eb4(0x43c)]=Scene_Map[_0x444eb4(0x268)][_0x444eb4(0x466)],Scene_Map[_0x444eb4(0x268)][_0x444eb4(0x466)]=function(){const _0x66a1e8=_0x444eb4;if(BattleManager[_0x66a1e8(0x89f)])this[_0x66a1e8(0x542)]();else{if(_0x66a1e8(0x808)!==_0x66a1e8(0x87c))VisuMZ[_0x66a1e8(0x25c)]['Scene_Map_launchBattle'][_0x66a1e8(0x315)](this);else{function _0xf868dd(){const _0xb02319=_0x66a1e8;if(this['collapseType']()>=0x1)return!![];return this[_0xb02319(0x91e)]()['collapse'];}}}},Scene_Map[_0x444eb4(0x268)][_0x444eb4(0x542)]=function(){const _0x173a1f=_0x444eb4;this[_0x173a1f(0x926)]=!![];},VisuMZ['BattleCore'][_0x444eb4(0x81f)]=SceneManager[_0x444eb4(0x66c)],SceneManager['isSceneChanging']=function(){const _0x5bd2cf=_0x444eb4;if(BattleManager[_0x5bd2cf(0x89f)])return![];return VisuMZ[_0x5bd2cf(0x25c)]['SceneManager_isSceneChanging'][_0x5bd2cf(0x315)](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x2c1)]=Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x26a)],Game_Interpreter['prototype']['terminate']=function(){const _0x55cd38=_0x444eb4;VisuMZ['BattleCore'][_0x55cd38(0x2c1)][_0x55cd38(0x315)](this),this['_preBattleCommonEvent']&&(this['_preBattleCommonEvent']=undefined,SceneManager['_scene'][_0x55cd38(0x202)]());},Scene_Map['prototype'][_0x444eb4(0x202)]=function(){const _0x29183a=_0x444eb4;BattleManager[_0x29183a(0x89f)]=undefined,this[_0x29183a(0x589)]();},VisuMZ['BattleCore'][_0x444eb4(0x3cd)]=Scene_Map['prototype'][_0x444eb4(0x3c7)],Scene_Map[_0x444eb4(0x268)][_0x444eb4(0x3c7)]=function(){const _0x3b7ccd=_0x444eb4;VisuMZ[_0x3b7ccd(0x25c)]['Scene_Map_initialize'][_0x3b7ccd(0x315)](this),$gameTemp[_0x3b7ccd(0x753)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x4b7)]=Scene_ItemBase['prototype']['applyItem'],Scene_ItemBase['prototype'][_0x444eb4(0x1a8)]=function(){const _0x246c13=_0x444eb4;VisuMZ[_0x246c13(0x25c)][_0x246c13(0x4b7)][_0x246c13(0x315)](this),this[_0x246c13(0x712)]()['note'][_0x246c13(0x7db)](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp[_0x246c13(0x4e7)]=[]);},VisuMZ[_0x444eb4(0x25c)]['Scene_Options_maxCommands']=Scene_Options[_0x444eb4(0x268)][_0x444eb4(0x1d6)],Scene_Options['prototype'][_0x444eb4(0x1d6)]=function(){const _0x5d617b=_0x444eb4;let _0x393b1d=VisuMZ[_0x5d617b(0x25c)][_0x5d617b(0x30a)][_0x5d617b(0x315)](this);const _0x198ae9=VisuMZ[_0x5d617b(0x25c)]['Settings'];if(_0x198ae9['AutoBattle'][_0x5d617b(0x399)]&&_0x198ae9[_0x5d617b(0x49d)][_0x5d617b(0x486)])_0x393b1d+=0x2;if(_0x198ae9[_0x5d617b(0x1fd)]['AddOption']&&_0x198ae9[_0x5d617b(0x1fd)][_0x5d617b(0x486)])_0x393b1d+=0x1;return _0x393b1d;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x14b)]=Scene_Battle[_0x444eb4(0x268)]['start'],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x53f)]=function(){const _0x18ac4b=_0x444eb4;if(SceneManager[_0x18ac4b(0x330)]()){if(_0x18ac4b(0x474)!==_0x18ac4b(0x8c3))Scene_Message['prototype']['start'][_0x18ac4b(0x315)](this),this[_0x18ac4b(0x60c)]&&this[_0x18ac4b(0x60c)][_0x18ac4b(0x54f)]();else{function _0x3183c6(){const _0x5cc338=_0x18ac4b;this[_0x5cc338(0x80e)](),this[_0x5cc338(0x5b9)](),this['updateSpin'](),this[_0x5cc338(0x7ca)](),this[_0x5cc338(0x41d)](),_0x3530f0['BattleCore'][_0x5cc338(0x8e5)][_0x5cc338(0x315)](this);if(this[_0x5cc338(0x266)]===_0x54af40)this[_0x5cc338(0x546)]();}}}else{if(_0x18ac4b(0x301)!==_0x18ac4b(0x360))VisuMZ[_0x18ac4b(0x25c)][_0x18ac4b(0x14b)][_0x18ac4b(0x315)](this);else{function _0x172ef9(){const _0x852582=_0x18ac4b;if(!_0x4a2606[_0x852582(0x11f)]())return;if(!_0x3d3097[_0x852582(0x213)])return;_0x116d41['ConvertParams'](_0x3a7103,_0x3c2c6d);const _0x149506=_0x5ed954[_0x852582(0x283)](),_0xc3bcb0=_0xc786dd[_0x852582(0x2ca)];if(!_0x149506)return;_0x4f2a8b['setBattleZoom'](0x1,_0x36392e[_0x852582(0xfa)],_0x21e2e8[_0x852582(0x81b)]);if(_0xc3bcb0)_0x149506[_0x852582(0x306)](_0x852582(0xaf));}}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x2db)]=Scene_Battle['prototype'][_0x444eb4(0x589)],Scene_Battle[_0x444eb4(0x268)]['stop']=function(){const _0x133d03=_0x444eb4;SceneManager[_0x133d03(0x2e4)]()?Scene_Message[_0x133d03(0x268)][_0x133d03(0x589)]['call'](this):VisuMZ[_0x133d03(0x25c)][_0x133d03(0x2db)]['call'](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x6a9)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x26a)],Scene_Battle[_0x444eb4(0x268)]['terminate']=function(){const _0x3310f0=_0x444eb4;if(SceneManager[_0x3310f0(0x2e4)]())Scene_Message[_0x3310f0(0x268)]['terminate']['call'](this);else{if(_0x3310f0(0x774)!==_0x3310f0(0x774)){function _0x301900(){const _0x16c5f6=_0x3310f0;return this[_0x16c5f6(0x271)]();}}else VisuMZ[_0x3310f0(0x25c)][_0x3310f0(0x6a9)]['call'](this);}},Scene_Battle['prototype']['isRightInputMode']=function(){const _0x389a1c=_0x444eb4;if(ConfigManager[_0x389a1c(0x758)]&&ConfigManager[_0x389a1c(0xb4)]!==undefined){if(_0x389a1c(0x717)!==_0x389a1c(0x3e4))return ConfigManager['uiInputPosition'];else{function _0x4cbd5a(){return this['_distortionSprite']||this['_mainSprite']||this;}}}else{if(this['battleLayoutStyle']()==='border')return![];else{return Scene_Message[_0x389a1c(0x268)][_0x389a1c(0x23c)][_0x389a1c(0x315)](this);;}}},VisuMZ[_0x444eb4(0x25c)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x22e)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x22e)]=function(){const _0x8bdcaf=_0x444eb4;this['createEnemyNameContainer'](),VisuMZ[_0x8bdcaf(0x25c)][_0x8bdcaf(0x8a7)]['call'](this),this['createAutoBattleWindow']();},VisuMZ['BattleCore'][_0x444eb4(0x5b5)]=Scene_Battle['prototype'][_0x444eb4(0x1b3)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x1b3)]=function(){const _0x10dfdb=_0x444eb4;VisuMZ[_0x10dfdb(0x25c)][_0x10dfdb(0x5b5)]['call'](this),this[_0x10dfdb(0xac)]()===_0x10dfdb(0x27c)&&this[_0x10dfdb(0x4af)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x426)]=function(_0x3b30fe){const _0x438c70=_0x444eb4;if(_0x3b30fe){if(_0x438c70(0x4d1)===_0x438c70(0x36e)){function _0x1bc6d5(){const _0x270b97=_0x438c70;return this[_0x270b97(0x972)];}}else this[_0x438c70(0x2fe)]['x']=(Graphics[_0x438c70(0x592)]-Graphics[_0x438c70(0x6e8)])/0x2,this[_0x438c70(0x2fe)]['y']=(Graphics[_0x438c70(0x773)]-Graphics['boxHeight'])/0x2;}else{if(_0x438c70(0x1f0)!=='HpTap'){function _0x4f5102(){const _0xa0131f=_0x438c70;this[_0xa0131f(0x24d)]();}}else this[_0x438c70(0x2fe)]['x']=Graphics[_0x438c70(0x592)]*0xa,this[_0x438c70(0x2fe)]['y']=Graphics[_0x438c70(0x773)]*0xa;}},VisuMZ['BattleCore'][_0x444eb4(0x839)]=Scene_Battle[_0x444eb4(0x268)]['selectNextCommand'],Scene_Battle['prototype'][_0x444eb4(0xd0)]=function(){const _0x171054=_0x444eb4,_0x532304=BattleManager['actor']();VisuMZ[_0x171054(0x25c)][_0x171054(0x839)][_0x171054(0x315)](this);if(_0x532304){if(_0x171054(0x909)===_0x171054(0x6e4)){function _0xe81fc3(){const _0xd81c04=_0x171054;return this[_0xd81c04(0x8ee)]();}}else{if(_0x532304===BattleManager[_0x171054(0x4cb)]())return;if(_0x532304===BattleManager[_0x171054(0xda)])return;_0x532304[_0x171054(0x7f2)]()[_0x171054(0x675)]();}}},VisuMZ[_0x444eb4(0x25c)]['Scene_Battle_selectPreviousCommand']=Scene_Battle[_0x444eb4(0x268)]['selectPreviousCommand'],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x614)]=function(){const _0x8ddc42=_0x444eb4,_0x458579=BattleManager[_0x8ddc42(0x4cb)]();if(_0x458579)_0x458579['battler']()[_0x8ddc42(0x675)]();VisuMZ[_0x8ddc42(0x25c)]['Scene_Battle_selectPreviousCommand'][_0x8ddc42(0x315)](this);},VisuMZ['BattleCore']['Scene_Battle_logWindowRect']=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x81c)],Scene_Battle[_0x444eb4(0x268)]['logWindowRect']=function(){const _0x2000dd=_0x444eb4;if(VisuMZ['BattleCore'][_0x2000dd(0x90c)]['BattleLog'][_0x2000dd(0x8c9)])return VisuMZ[_0x2000dd(0x25c)][_0x2000dd(0x90c)][_0x2000dd(0x727)][_0x2000dd(0x8c9)]['call'](this);return VisuMZ[_0x2000dd(0x25c)][_0x2000dd(0x777)][_0x2000dd(0x315)](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x548)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x22a)],Scene_Battle['prototype'][_0x444eb4(0x22a)]=function(){const _0x1b7e23=_0x444eb4;VisuMZ[_0x1b7e23(0x25c)][_0x1b7e23(0x548)][_0x1b7e23(0x315)](this),this[_0x1b7e23(0x14f)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x14f)]=function(){const _0x1fd40f=_0x444eb4,_0x5d84f6=this[_0x1fd40f(0x406)];_0x5d84f6[_0x1fd40f(0x2a9)](_0x1fd40f(0x25b),this[_0x1fd40f(0x1c3)][_0x1fd40f(0x896)](this)),_0x5d84f6[_0x1fd40f(0x2a9)](_0x1fd40f(0x608),this['commandOptions'][_0x1fd40f(0x896)](this));const _0x3aa110=this[_0x1fd40f(0xac)]();switch(_0x3aa110){case'xp':case'portrait':return this[_0x1fd40f(0x406)][_0x1fd40f(0x71a)](0x1);break;}},Scene_Battle[_0x444eb4(0x268)]['commandAutoBattle']=function(){const _0x3df166=_0x444eb4;BattleManager[_0x3df166(0xcc)]=!![],$gameParty['makeActions'](),this['selectNextCommand'](),BattleManager[_0x3df166(0x47f)]()&&(BattleManager[_0x3df166(0x1d5)]=![]);},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x3d4)]=function(){const _0x13e7ed=_0x444eb4;if(this[_0x13e7ed(0x78d)]())this['_callSceneOptions']=!![],this[_0x13e7ed(0x1e1)]['push'](_0x13e7ed(0x86e),VisuMZ['BattleCore'][_0x13e7ed(0x90c)]['PartyCmd']['ActiveTpbOptionsMessage']);else{if('uDPJO'===_0x13e7ed(0x3b9)){function _0xb6d60a(){const _0x1dd8ce=_0x13e7ed;if(_0x22378e[_0x1dd8ce(0x887)])this['displayItemMessage'](_0x32be3a[_0x1dd8ce(0x47a)],_0x2e9d52,_0x4af81f);if(_0x3f6746[_0x1dd8ce(0x92c)])this[_0x1dd8ce(0xc2)](_0x5976ce[_0x1dd8ce(0x914)],_0x2cb119,_0x50b62d);}}else this[_0x13e7ed(0x923)]();}},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x78d)]=function(){const _0x5e56da=_0x444eb4;return BattleManager[_0x5e56da(0x179)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x923)]=function(){const _0x209c43=_0x444eb4;this[_0x209c43(0x45a)]=![],this[_0x209c43(0x60c)][_0x209c43(0x54f)](),this[_0x209c43(0x2fe)][_0x209c43(0x693)]=![];if(BattleManager[_0x209c43(0x22c)]())($dataSystem[_0x209c43(0xce)]||$dataSystem[_0x209c43(0x94a)])&&SceneManager['snapForBackground']();else($gameMap[_0x209c43(0xce)]()||$gameMap[_0x209c43(0x94a)]())&&SceneManager[_0x209c43(0x279)]();SceneManager[_0x209c43(0x12b)](Scene_Options);},VisuMZ[_0x444eb4(0x25c)]['Scene_Battle_updateBattleProcess']=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x8a8)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x8a8)]=function(){const _0xc66731=_0x444eb4;VisuMZ[_0xc66731(0x25c)][_0xc66731(0x79a)][_0xc66731(0x315)](this);if(this[_0xc66731(0x45a)]&&!BattleManager[_0xc66731(0xda)])this[_0xc66731(0x923)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x858)]=function(){const _0x223568=_0x444eb4,_0x3bfd10=this[_0x223568(0x377)]();this[_0x223568(0x88a)]=new Window_AutoBattleCancel(_0x3bfd10),this[_0x223568(0x88a)][_0x223568(0x8b4)](),this[_0x223568(0x86a)](this[_0x223568(0x88a)]);},Scene_Battle['prototype'][_0x444eb4(0x377)]=function(){const _0x100b76=_0x444eb4;return VisuMZ['BattleCore']['Settings'][_0x100b76(0x49d)]['AutoBattleRect'][_0x100b76(0x315)](this);},Scene_Battle['prototype'][_0x444eb4(0x4d9)]=function(){const _0x24545d=_0x444eb4;return VisuMZ[_0x24545d(0x25c)][_0x24545d(0x90c)][_0x24545d(0x1cb)][_0x24545d(0x1a1)];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x3c3)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x4bd)],Scene_Battle[_0x444eb4(0x268)]['startPartyCommandSelection']=function(){const _0x565ea0=_0x444eb4;if(this[_0x565ea0(0x4d9)]())this[_0x565ea0(0x24d)]();else{if(_0x565ea0(0x6c7)!=='yOUlF')VisuMZ[_0x565ea0(0x25c)][_0x565ea0(0x3c3)][_0x565ea0(0x315)](this);else{function _0x2c444e(){const _0x5f287f=_0x565ea0,_0x191e69=_0xb7a49f['indexOf'](_0x5ae307['toUpperCase']()['trim']());_0x191e69>=0x0&&_0x191e69<=0x7&&_0x26cb13[_0x5f287f(0x326)](_0x191e69)&&_0x7d1df9[_0x5f287f(0x878)](_0x191e69);}}}},Scene_Battle['prototype']['onDisabledPartyCommandSelection']=function(){const _0x3d4632=_0x444eb4;if(BattleManager['isDTB']())this['selectNextCommand']();else{if(BattleManager[_0x3d4632(0x47f)]()){if(_0x3d4632(0x3e8)===_0x3d4632(0x3e8))VisuMZ[_0x3d4632(0x25c)]['Scene_Battle_startPartyCommandSelection']['call'](this);else{function _0x42650f(){const _0x219c66=_0x3d4632,_0x112447=this[_0x219c66(0x5c5)](_0x14fece),_0x4b2f7d=this[_0x219c66(0x122)](_0x15bb38),_0x159b9a=this[_0x219c66(0x463)](_0x4b2f7d)['width'];this[_0x219c66(0x264)](this[_0x219c66(0x756)](_0x2a04b8));const _0x4f925e=this[_0x219c66(0x3bf)]();if(_0x4f925e==='right')this['drawTextEx'](_0x4b2f7d,_0x112447['x']+_0x112447['width']-_0x159b9a,_0x112447['y'],_0x159b9a);else{if(_0x4f925e==='center'){const _0x15747b=_0x112447['x']+_0x3cdc56[_0x219c66(0x10b)]((_0x112447['width']-_0x159b9a)/0x2);this[_0x219c66(0x2bb)](_0x4b2f7d,_0x15747b,_0x112447['y'],_0x159b9a);}else this[_0x219c66(0x2bb)](_0x4b2f7d,_0x112447['x'],_0x112447['y'],_0x159b9a);}}}}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x34f)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x396)],Scene_Battle['prototype'][_0x444eb4(0x396)]=function(){const _0x4f544a=_0x444eb4;if(BattleManager[_0x4f544a(0x47f)]()){if('CUfIz'===_0x4f544a(0x18c)){function _0x478c3b(){const _0x4b6388=_0x4f544a;_0x580c75[_0x4b6388(0x878)](_0x48ac3b);}}else this[_0x4f544a(0x2d9)]();}else{if('ZjQHF'===_0x4f544a(0x871)){function _0x7ed6d8(){const _0x55ed99=_0x4f544a;this[_0x55ed99(0x48a)]=_0x55ed99(0x12c);}}else VisuMZ[_0x4f544a(0x25c)]['Scene_Battle_commandFight'][_0x4f544a(0x315)](this);}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x50a)]=Scene_Battle['prototype']['createActorCommandWindow'],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x53c)]=function(){const _0x119e19=_0x444eb4;VisuMZ['BattleCore'][_0x119e19(0x50a)][_0x119e19(0x315)](this),this['createActorCommandWindowBattleCore']();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x381)]=function(){const _0x5a82cc=_0x444eb4,_0x575b21=this[_0x5a82cc(0x30f)];_0x575b21['setHandler'](_0x5a82cc(0x29c),this[_0x5a82cc(0xed)][_0x5a82cc(0x896)](this)),_0x575b21[_0x5a82cc(0x2a9)](_0x5a82cc(0x25b),this['actorCommandAutoBattle'][_0x5a82cc(0x896)](this)),_0x575b21['setHandler'](_0x5a82cc(0x6a3),this[_0x5a82cc(0x390)][_0x5a82cc(0x896)](this));if(BattleManager[_0x5a82cc(0x47f)]()){if('FguHt'===_0x5a82cc(0x668)){function _0x2e67ad(){const _0x429ab0=_0x5a82cc;_0x2cf002[_0x429ab0(0x25c)][_0x429ab0(0x4b7)][_0x429ab0(0x315)](this),this[_0x429ab0(0x712)]()[_0x429ab0(0x4bb)][_0x429ab0(0x7db)](/<CUSTOM ACTION SEQUENCE>/i)&&(_0x1f06e6[_0x429ab0(0x4e7)]=[]);}}else{if(this[_0x5a82cc(0x4d9)]()){if(_0x5a82cc(0x64a)!==_0x5a82cc(0x7eb))delete _0x575b21[_0x5a82cc(0x951)][_0x5a82cc(0x588)];else{function _0x14b0c9(){this['recoverAll']();}}}else _0x575b21['setHandler']('cancel',this[_0x5a82cc(0x995)][_0x5a82cc(0x896)](this));}}},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0xed)]=function(){const _0x4d55cf=_0x444eb4;this[_0x4d55cf(0x7d1)]();},Scene_Battle[_0x444eb4(0x268)]['actorCommandAutoBattle']=function(){const _0xada26f=_0x444eb4;BattleManager[_0xada26f(0x4cb)]()[_0xada26f(0x3b6)](),BattleManager[_0xada26f(0x3f2)](),BattleManager[_0xada26f(0x945)](),this[_0xada26f(0x4a3)]();},Scene_Battle['prototype'][_0x444eb4(0x390)]=function(){const _0x531048=_0x444eb4,_0x4a07a3=BattleManager[_0x531048(0x23f)]();_0x4a07a3[_0x531048(0x6f2)](this['_actorCommandWindow'][_0x531048(0x19b)]()),this[_0x531048(0x2fc)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x995)]=function(){const _0x2a96f6=_0x444eb4;this[_0x2a96f6(0x406)][_0x2a96f6(0x18f)](),this[_0x2a96f6(0x30f)][_0x2a96f6(0x418)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x62b)]=Scene_Battle['prototype'][_0x444eb4(0x591)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x591)]=function(){const _0x366076=_0x444eb4;VisuMZ[_0x366076(0x25c)][_0x366076(0x62b)][_0x366076(0x315)](this),this[_0x366076(0x3f0)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x3f0)]=function(){const _0x403635=_0x444eb4;this['_actorCommandWindow'][_0x403635(0x21d)](this[_0x403635(0x7cd)]),this[_0x403635(0x406)]['setHelpWindow'](this[_0x403635(0x7cd)]);},Scene_Battle['prototype'][_0x444eb4(0xac)]=function(){const _0x247287=_0x444eb4;if($gameTemp[_0x247287(0x48a)]!==undefined)return $gameTemp[_0x247287(0x48a)];if(this[_0x247287(0x126)])return this['_battleLayoutStyle'];return this['_battleLayoutStyle']=VisuMZ[_0x247287(0x25c)][_0x247287(0x90c)][_0x247287(0x75c)][_0x247287(0x236)][_0x247287(0x3d1)]()[_0x247287(0x3af)](),this['_battleLayoutStyle'];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x8a3)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x992)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x992)]=function(){const _0x42ee4d=_0x444eb4,_0x2b4368=this[_0x42ee4d(0xac)]();switch(_0x2b4368){case'list':return this['calcWindowHeight'](Math[_0x42ee4d(0x960)](0x1,$gameParty[_0x42ee4d(0x272)]()),!![]);break;default:return VisuMZ['BattleCore'][_0x42ee4d(0x8a3)][_0x42ee4d(0x315)](this);break;}},VisuMZ['BattleCore'][_0x444eb4(0x328)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x6f7)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x6f7)]=function(){const _0x5dc9df=_0x444eb4,_0x217db5=this[_0x5dc9df(0xac)]();switch(_0x217db5){case _0x5dc9df(0x27c):return this[_0x5dc9df(0x745)]();break;case _0x5dc9df(0x33d):case _0x5dc9df(0x12c):case'xp':case _0x5dc9df(0x245):default:return VisuMZ[_0x5dc9df(0x25c)][_0x5dc9df(0x328)][_0x5dc9df(0x315)](this);break;}},Scene_Battle[_0x444eb4(0x268)]['statusWindowRect']=function(){const _0xe0bfdb=_0x444eb4,_0x50f224=this[_0xe0bfdb(0xac)]();switch(_0x50f224){case'xp':case _0xe0bfdb(0x245):return this[_0xe0bfdb(0x6a5)]();break;case _0xe0bfdb(0x27c):return this['statusWindowRectBorderStyle']();break;case'default':case'list':default:return this['statusWindowRectDefaultStyle']();break;}},VisuMZ['BattleCore'][_0x444eb4(0x772)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x537)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x537)]=function(){const _0x424d75=_0x444eb4,_0x3e5d74=this['battleLayoutStyle']();switch(_0x3e5d74){case'xp':case _0x424d75(0x245):return this[_0x424d75(0x582)]();break;case _0x424d75(0x27c):return this[_0x424d75(0x172)]();case _0x424d75(0x33d):case'list':default:return this[_0x424d75(0x362)]();break;}},Scene_Battle['prototype'][_0x444eb4(0x362)]=function(){const _0x3f2eaa=_0x444eb4,_0x48719d=VisuMZ[_0x3f2eaa(0x25c)]['Settings'][_0x3f2eaa(0x75c)],_0xe4c8bc=_0x48719d[_0x3f2eaa(0x560)]||0xc0,_0x329829=this['windowAreaHeight'](),_0x581a63=this[_0x3f2eaa(0x23c)]()?Graphics[_0x3f2eaa(0x6e8)]-_0xe4c8bc:0x0,_0x51c81c=Graphics['boxHeight']-_0x329829;return new Rectangle(_0x581a63,_0x51c81c,_0xe4c8bc,_0x329829);},Scene_Battle[_0x444eb4(0x268)]['actorCommandWindowRect']=function(){const _0x41b9fb=_0x444eb4;return this[_0x41b9fb(0x537)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0xd9)]=Scene_Battle[_0x444eb4(0x268)]['updateStatusWindowPosition'],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x64f)]=function(){const _0x468ac5=_0x444eb4,_0x1fe48f=this[_0x468ac5(0xac)]();switch(_0x1fe48f){case'xp':case _0x468ac5(0x245):case'border':break;case _0x468ac5(0x33d):case _0x468ac5(0x12c):default:VisuMZ[_0x468ac5(0x25c)][_0x468ac5(0xd9)][_0x468ac5(0x315)](this);break;}},VisuMZ[_0x444eb4(0x25c)]['Scene_Battle_startActorSelection']=Scene_Battle['prototype'][_0x444eb4(0x86d)],Scene_Battle[_0x444eb4(0x268)]['startActorSelection']=function(){const _0xdefdae=_0x444eb4;VisuMZ['BattleCore']['Scene_Battle_startActorSelection'][_0xdefdae(0x315)](this),this[_0xdefdae(0x31c)]();},VisuMZ['BattleCore'][_0x444eb4(0x857)]=Scene_Battle[_0x444eb4(0x268)]['startEnemySelection'],Scene_Battle[_0x444eb4(0x268)]['startEnemySelection']=function(){const _0x4dc2f5=_0x444eb4;VisuMZ[_0x4dc2f5(0x25c)][_0x4dc2f5(0x857)][_0x4dc2f5(0x315)](this),this[_0x4dc2f5(0xdc)][_0x4dc2f5(0x5b3)](),this[_0x4dc2f5(0x31c)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x31c)]=function(){const _0x5c5ff9=_0x444eb4,_0x53c1e5=this[_0x5c5ff9(0xac)]();if(['xp',_0x5c5ff9(0x245),_0x5c5ff9(0x27c)][_0x5c5ff9(0x8f7)](_0x53c1e5)){if('SYglB'!==_0x5c5ff9(0xcb)){function _0xf56ecb(){const _0x3d3373=_0x5c5ff9;return this[_0x3d3373(0x2e3)]();}}else this['_actorCommandWindow']['close']();}(_0x53c1e5==='border'||this[_0x5c5ff9(0x89b)]())&&(this[_0x5c5ff9(0x5e0)][_0x5c5ff9(0x418)](),this[_0x5c5ff9(0x8b8)][_0x5c5ff9(0x418)]());},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x51c)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x681)],Scene_Battle['prototype'][_0x444eb4(0x681)]=function(){const _0x34102e=_0x444eb4;VisuMZ[_0x34102e(0x25c)][_0x34102e(0x51c)][_0x34102e(0x315)](this),this['okTargetSelectionVisibility']();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x4c7)]=function(){const _0x4f0467=_0x444eb4;return[_0x4f0467(0x606),_0x4f0467(0x6f1),'singleSkill'][_0x4f0467(0x8f7)](this[_0x4f0467(0x30f)][_0x4f0467(0x181)]());},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x838)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x961)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x961)]=function(){const _0xf995fe=_0x444eb4;if(this['isNonSubmenuCancel']()){if(_0xf995fe(0x244)!==_0xf995fe(0x244)){function _0x5a6a79(){const _0x2c1751=_0xf995fe,_0x58ffda=_0x395052['item']();this[_0x2c1751(0x722)](_0x3b031d,_0x58ffda),this[_0x2c1751(0x12b)](_0x2c1751(0x8d5),_0x4ecad5,_0x4b8129,!![]),this[_0x2c1751(0x12b)](_0x2c1751(0x34d),_0x5bfc6b,_0x5558f4),this['push'](_0x2c1751(0x12e)),this[_0x2c1751(0x12b)](_0x2c1751(0x39c),_0x1b95a1,_0x3a70fe),this['push']('waitForAnimation');}}else this['_statusWindow'][_0xf995fe(0x96e)](),this[_0xf995fe(0x2ba)][_0xf995fe(0x8b4)](),this[_0xf995fe(0x30f)]['activate']();}else VisuMZ[_0xf995fe(0x25c)][_0xf995fe(0x838)][_0xf995fe(0x315)](this);this['cancelTargetSelectionVisibility']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x38f)]=Scene_Battle[_0x444eb4(0x268)]['onEnemyOk'],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x319)]=function(){const _0x2b19dc=_0x444eb4;VisuMZ[_0x2b19dc(0x25c)]['Scene_Battle_onEnemyOk'][_0x2b19dc(0x315)](this),this['okTargetSelectionVisibility']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x3ea)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x39b)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x39b)]=function(){const _0x26a087=_0x444eb4;this[_0x26a087(0x4c7)]()?(this[_0x26a087(0x6e0)]['show'](),this[_0x26a087(0xdc)][_0x26a087(0x8b4)](),this[_0x26a087(0x30f)][_0x26a087(0x83d)]()):VisuMZ[_0x26a087(0x25c)][_0x26a087(0x3ea)]['call'](this),this['cancelTargetSelectionVisibility']();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x263)]=function(){const _0x207ff0=_0x444eb4,_0xe2c2cf=this[_0x207ff0(0xac)]();if(_0xe2c2cf===_0x207ff0(0x27c)||this[_0x207ff0(0x89b)]()){if(_0x207ff0(0x6c2)===_0x207ff0(0x39a)){function _0x401884(){const _0xf8006d=_0x207ff0;return _0x14c7f1['friendsUnit']()[_0xf8006d(0x20e)]()['filter'](_0x20df4b=>_0x20df4b!==_0x2881ed);}}else this[_0x207ff0(0x5e0)][_0x207ff0(0x480)](),this[_0x207ff0(0x5e0)]['active']&&this['_skillWindow']['show'](),this[_0x207ff0(0x8b8)][_0x207ff0(0x480)](),this[_0x207ff0(0x8b8)][_0x207ff0(0x7e0)]&&this[_0x207ff0(0x8b8)][_0x207ff0(0x96e)]();}},Scene_Battle[_0x444eb4(0x268)]['cancelTargetSelectionVisibility']=function(){const _0xf60811=_0x444eb4,_0x16c763=this[_0xf60811(0xac)]();if(['xp',_0xf60811(0x245),'border'][_0xf60811(0x8f7)](_0x16c763)){if(_0xf60811(0x1bc)!==_0xf60811(0x1bc)){function _0x5ef6d1(){const _0x137c73=_0xf60811;_0x4e0cb7[_0x137c73(0x25c)][_0x137c73(0x3c3)][_0x137c73(0x315)](this);}}else this[_0xf60811(0x30f)][_0xf60811(0x480)]();}this[_0xf60811(0x263)]();},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x54b)]=function(){const _0x4a1799=_0x444eb4,_0x2e6ac9=VisuMZ[_0x4a1799(0x25c)][_0x4a1799(0x90c)][_0x4a1799(0x75c)],_0x106eea=Window_BattleStatus[_0x4a1799(0x268)][_0x4a1799(0x1c1)](),_0x3ab4bf=Graphics[_0x4a1799(0x6e8)]-(_0x2e6ac9[_0x4a1799(0x560)]||0xc0),_0x561c1d=this[_0x4a1799(0x992)]()+_0x106eea,_0x57a192=this[_0x4a1799(0x23c)]()?0x0:Graphics[_0x4a1799(0x6e8)]-_0x3ab4bf,_0x5504c8=Graphics['boxHeight']-_0x561c1d+_0x106eea;return new Rectangle(_0x57a192,_0x5504c8,_0x3ab4bf,_0x561c1d);},Scene_Battle[_0x444eb4(0x268)]['statusWindowRectXPStyle']=function(){const _0x4a5768=_0x444eb4,_0x145321=Window_BattleStatus[_0x4a5768(0x268)][_0x4a5768(0x1c1)](),_0x275f98=Graphics[_0x4a5768(0x6e8)],_0x21ae07=this['windowAreaHeight']()+_0x145321,_0x2a5dcb=0x0,_0x582c77=Graphics[_0x4a5768(0x6fd)]-_0x21ae07+_0x145321;return new Rectangle(_0x2a5dcb,_0x582c77,_0x275f98,_0x21ae07);},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x582)]=function(){const _0x3ba548=_0x444eb4,_0x216f02=Graphics[_0x3ba548(0x6e8)]/0x2,_0x12dc55=this['calcWindowHeight'](VisuMZ['BattleCore']['Settings']['BattleLayout'][_0x3ba548(0x67d)],!![]),_0x7d87bd=Math[_0x3ba548(0x29d)]((Graphics[_0x3ba548(0x6e8)]-_0x216f02)/0x2),_0x4d17a7=Graphics['boxHeight']-_0x12dc55-this[_0x3ba548(0x6a5)]()['height'];return new Rectangle(_0x7d87bd,_0x4d17a7,_0x216f02,_0x12dc55);},Scene_Battle['prototype'][_0x444eb4(0x745)]=function(){const _0x345ad7=_0x444eb4,_0x52cf11=Graphics[_0x345ad7(0x592)],_0x2a3dca=Math[_0x345ad7(0x29d)]((Graphics[_0x345ad7(0x6e8)]-_0x52cf11)/0x2),_0x2e6eea=this[_0x345ad7(0x19e)](),_0x5cbaa4=(Graphics[_0x345ad7(0x773)]-Graphics[_0x345ad7(0x6fd)])/-0x2;return new Rectangle(_0x2a3dca,_0x5cbaa4,_0x52cf11,_0x2e6eea);},Scene_Battle['prototype']['statusWindowRectBorderStyle']=function(){const _0x1b0cfb=_0x444eb4,_0xb3e479=Graphics[_0x1b0cfb(0x592)],_0x12393b=Math[_0x1b0cfb(0x29d)]((Graphics[_0x1b0cfb(0x6e8)]-_0xb3e479)/0x2),_0x21d959=this['calcWindowHeight'](0x4,!![]),_0x5383de=Graphics['boxHeight']-_0x21d959+(Graphics[_0x1b0cfb(0x773)]-Graphics[_0x1b0cfb(0x6fd)])/0x2;return new Rectangle(_0x12393b,_0x5383de,_0xb3e479,_0x21d959);},Scene_Battle['prototype']['partyCommandWindowRectBorderStyle']=function(){const _0x427de3=_0x444eb4,_0x51b261=Math[_0x427de3(0x10b)](Graphics[_0x427de3(0x592)]/0x3),_0x2b35ab=this[_0x427de3(0x23c)]()?(Graphics[_0x427de3(0x592)]+Graphics[_0x427de3(0x6e8)])/0x2-_0x51b261:(Graphics[_0x427de3(0x592)]-Graphics[_0x427de3(0x6e8)])/-0x2,_0x50c75d=this['helpWindowRectBorderStyle'](),_0x485b2d=_0x50c75d['y']+_0x50c75d['height'],_0x5383bd=this[_0x427de3(0x53d)](),_0x4d8e41=_0x5383bd['y']-_0x485b2d;return new Rectangle(_0x2b35ab,_0x485b2d,_0x51b261,_0x4d8e41);},Scene_Battle['prototype']['skillItemWindowRectBorderStyle']=function(){const _0x2a6d95=_0x444eb4,_0x56640c=Math[_0x2a6d95(0x284)](Graphics[_0x2a6d95(0x592)]/0x3),_0xc6a38b=Math['round']((Graphics[_0x2a6d95(0x6e8)]-_0x56640c)/0x2),_0x2397d1=this[_0x2a6d95(0x172)](),_0x380bc3=_0x2397d1['y'],_0x2ca5ab=_0x2397d1['height'];return new Rectangle(_0xc6a38b,_0x380bc3,_0x56640c,_0x2ca5ab);},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x4af)]=function(){const _0x42c2d8=_0x444eb4;this['_cancelButton']['y']=this[_0x42c2d8(0x7cd)]['y']+this[_0x42c2d8(0x7cd)]['height'];if(this['isRightInputMode']())this[_0x42c2d8(0x420)]['x']=-this[_0x42c2d8(0x420)][_0x42c2d8(0x592)]-0x4;else{if(_0x42c2d8(0x5de)!=='ndYeX')this['_cancelButton']['x']=Graphics[_0x42c2d8(0x592)]-(Graphics['width']-Graphics[_0x42c2d8(0x6e8)])/0x2-this[_0x42c2d8(0x420)][_0x42c2d8(0x592)]-0x4;else{function _0x108892(){const _0x4186af=_0x42c2d8;return this[_0x4186af(0x12f)]()&&this[_0x4186af(0x12f)]()[_0x4186af(0x712)]()&&!this['currentAction']()[_0x4186af(0x124)]();}}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x4ba)]=Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x815)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x815)]=function(){const _0xbdb4f7=_0x444eb4;if(this['battleLayoutStyle']()===_0xbdb4f7(0x27c)){if(_0xbdb4f7(0x7d7)!==_0xbdb4f7(0x5f2))return this['skillItemWindowRectBorderStyle']();else{function _0x2146ae(){const _0x5d27ee=_0xbdb4f7;if(this[_0x5d27ee(0x499)][_0x5d27ee(0x34a)]>0x0){const _0x2d06ae=this[_0x5d27ee(0x499)][_0x5d27ee(0x29b)](),_0x398f1e=_0x2d06ae[0x0];return _0x398f1e[_0x5d27ee(0x5c4)]=_0x398f1e[_0x5d27ee(0x5c4)]||[],_0x398f1e[_0x5d27ee(0x5c4)][0x0]=_0x2d06ae[0x1],_0x398f1e;}else return this['_actionBattlers'][_0x5d27ee(0x29b)]();}}}else{if(this[_0xbdb4f7(0x89b)]()){if('ZWAmX'!==_0xbdb4f7(0x873)){function _0x30ab00(){const _0x344b55=_0xbdb4f7;_0x5ebd30[_0x344b55(0x25c)]['Game_BattlerBase_initMembers'][_0x344b55(0x315)](this),this[_0x344b55(0x4e0)]();}}else return this[_0xbdb4f7(0x366)]();}else{if(_0xbdb4f7(0x5cf)!==_0xbdb4f7(0x72d))return VisuMZ[_0xbdb4f7(0x25c)][_0xbdb4f7(0x4ba)][_0xbdb4f7(0x315)](this);else{function _0x184386(){const _0x1af65b=_0xbdb4f7,_0x5abb09=this[_0x1af65b(0x71c)],_0x2be3a7=this[_0x1af65b(0x829)];_0x2be3a7['x']=(_0x2be3a7['x']*(_0x5abb09-0x1)+this[_0x1af65b(0x37e)])/_0x5abb09,_0x2be3a7[_0x1af65b(0x30b)]=(_0x2be3a7[_0x1af65b(0x30b)]*(_0x5abb09-0x1)+0xff)/_0x5abb09,this[_0x1af65b(0x71c)]--;}}}}},VisuMZ['BattleCore']['Scene_Battle_itemWindowRect']=Scene_Battle['prototype'][_0x444eb4(0x60a)],Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x60a)]=function(){const _0xa74c53=_0x444eb4;if(this['battleLayoutStyle']()===_0xa74c53(0x27c))return this['skillItemWindowRectBorderStyle']();else return this[_0xa74c53(0x89b)]()?this[_0xa74c53(0x366)]():VisuMZ['BattleCore']['Scene_Battle_itemWindowRect'][_0xa74c53(0x315)](this);},Scene_Battle[_0x444eb4(0x268)][_0x444eb4(0x89b)]=function(){const _0x5992bd=_0x444eb4;return VisuMZ[_0x5992bd(0x25c)][_0x5992bd(0x90c)][_0x5992bd(0x75c)][_0x5992bd(0x7ba)];},Scene_Battle[_0x444eb4(0x268)]['skillItemWindowRectMiddle']=function(){const _0x307f90=_0x444eb4,_0x14d5a5=Sprite_Button[_0x307f90(0x268)]['blockWidth']()*0x2+0x4;let _0x6aa208=Graphics[_0x307f90(0x6e8)]-_0x14d5a5;Imported[_0x307f90(0x305)]&&SceneManager['isSideButtonLayout']()&&(_0x6aa208+=_0x14d5a5);const _0x1bea99=this[_0x307f90(0x4ed)](),_0x472cd6=Graphics[_0x307f90(0x6fd)]-_0x1bea99-this[_0x307f90(0x605)]()[_0x307f90(0x773)]+Window_BattleStatus[_0x307f90(0x268)][_0x307f90(0x1c1)](),_0x3bff2a=0x0;return new Rectangle(_0x3bff2a,_0x1bea99,_0x6aa208,_0x472cd6);},Scene_Battle['prototype'][_0x444eb4(0x623)]=function(){const _0x38ac78=_0x444eb4;this['_enemyNameContainer']=new Sprite(),this[_0x38ac78(0x55a)]['x']=this['_windowLayer']['x'],this[_0x38ac78(0x55a)]['y']=this[_0x38ac78(0x2fe)]['y'];const _0x134f1a=this[_0x38ac78(0x3ab)][_0x38ac78(0x221)](this[_0x38ac78(0x2fe)]);this['addChildAt'](this[_0x38ac78(0x55a)],_0x134f1a);for(let _0x38bbaf=0x0;_0x38bbaf<0x8;_0x38bbaf++){if(_0x38ac78(0x609)!==_0x38ac78(0x56a)){const _0x3a7871=new Window_EnemyName(_0x38bbaf);this[_0x38ac78(0x55a)][_0x38ac78(0x86a)](_0x3a7871);}else{function _0x450876(){const _0x143aea=_0x38ac78;return _0x4bca2b['BattleCore'][_0x143aea(0x90c)]['BattleLog'][_0x143aea(0x4b6)];}}}},Sprite_Battler['_motionSpeed']=VisuMZ['BattleCore']['Settings']['Actor']['MotionSpeed'],VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x3a1)]=Sprite_Battler['prototype'][_0x444eb4(0x61f)],Sprite_Battler['prototype']['initMembers']=function(){const _0x273a8a=_0x444eb4;VisuMZ['BattleCore']['Sprite_Battler_initMembers'][_0x273a8a(0x315)](this),this[_0x273a8a(0x4e0)]();if(this['constructor']===Sprite_Enemy)this['createShadowSprite']();this[_0x273a8a(0x183)]();},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x4e0)]=function(){const _0x3b8e90=_0x444eb4;this[_0x3b8e90(0x7f8)]=0x0,this[_0x3b8e90(0x29f)]=0x0,this['_floatHeight']=0x0,this[_0x3b8e90(0x8da)]=0x0,this[_0x3b8e90(0x5dc)]=0x0,this[_0x3b8e90(0x6b1)]=0x0,this[_0x3b8e90(0x567)]=_0x3b8e90(0x5b6),this['_jumpHeight']=0x0,this['_jumpMaxHeight']=0x0,this[_0x3b8e90(0x422)]=0x0,this[_0x3b8e90(0x2f9)]=0x0,this[_0x3b8e90(0x415)]=0xff,this[_0x3b8e90(0x3de)]=0x0,this[_0x3b8e90(0x20d)]=0x0,this[_0x3b8e90(0x532)]=_0x3b8e90(0x5b6),this[_0x3b8e90(0x2a0)]=0x0,this[_0x3b8e90(0x206)]=0x0,this[_0x3b8e90(0x741)]=0x0,this[_0x3b8e90(0x352)]=0x0,this['_angleEasing']='Linear',this[_0x3b8e90(0x8ca)]=!![],this[_0x3b8e90(0x3ef)]=0x0,this[_0x3b8e90(0x4f4)]=0x0,this[_0x3b8e90(0x6b9)]=0x0,this['_targetSkewY']=0x0,this['_skewDuration']=0x0,this[_0x3b8e90(0x1c7)]=0x0,this[_0x3b8e90(0x8fe)]=_0x3b8e90(0x5b6),this[_0x3b8e90(0x649)]=0x1,this[_0x3b8e90(0x523)]=0x1,this[_0x3b8e90(0x3fe)]=0x1,this[_0x3b8e90(0x4c2)]=0x1,this['_growDuration']=0x0,this['_growWholeDuration']=0x0,this['_growEasing']=_0x3b8e90(0x5b6),this[_0x3b8e90(0x7ec)]=0x1;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x27f)]=function(){const _0x4261ed=_0x444eb4;this[_0x4261ed(0x917)]=new Sprite(),this['_shadowSprite'][_0x4261ed(0x8fa)]=ImageManager[_0x4261ed(0x986)](_0x4261ed(0x3b2)),this['_shadowSprite'][_0x4261ed(0x8fa)][_0x4261ed(0x49b)]=VisuMZ[_0x4261ed(0x25c)][_0x4261ed(0x90c)][_0x4261ed(0x78b)][_0x4261ed(0x5c8)],this[_0x4261ed(0x917)][_0x4261ed(0x72a)]['x']=0.5,this[_0x4261ed(0x917)][_0x4261ed(0x72a)]['y']=0.5,this['_shadowSprite']['y']=-0x2,this[_0x4261ed(0x917)][_0x4261ed(0x693)]=![],this[_0x4261ed(0x86a)](this['_shadowSprite']);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x183)]=function(){const _0x289afa=_0x444eb4;this[_0x289afa(0x2ac)]=new Sprite(),this[_0x289afa(0x2ac)][_0x289afa(0x72a)]['x']=0.5,this[_0x289afa(0x2ac)][_0x289afa(0x72a)]['y']=0.5,this[_0x289afa(0x86a)](this[_0x289afa(0x2ac)]);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x7d5)]=function(){const _0x1ef7ed=_0x444eb4;if(!this[_0x1ef7ed(0x2ac)])return;if(this[_0x1ef7ed(0x917)]){const _0x3beb16=this['getChildIndex'](this['_distortionSprite']);this[_0x1ef7ed(0x44e)](this[_0x1ef7ed(0x917)],_0x3beb16),this[_0x1ef7ed(0x544)]();}this[_0x1ef7ed(0x36b)]&&this[_0x1ef7ed(0x2ac)][_0x1ef7ed(0x86a)](this['_svBattlerSprite']);this[_0x1ef7ed(0x443)]&&this[_0x1ef7ed(0x2ac)][_0x1ef7ed(0x86a)](this[_0x1ef7ed(0x443)]);if(this[_0x1ef7ed(0x427)]){if(_0x1ef7ed(0x60b)!==_0x1ef7ed(0x60b)){function _0x5ff1c(){const _0x1db78a=_0x1ef7ed,_0x9d3f58=this[_0x1db78a(0x712)]()[_0x1db78a(0x58f)];return _0x9d3f58[_0x1db78a(0x7db)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);}}else this[_0x1ef7ed(0x2ac)][_0x1ef7ed(0x86a)](this['_mainSprite']);}this[_0x1ef7ed(0x7dd)]&&this[_0x1ef7ed(0x2ac)]['addChild'](this[_0x1ef7ed(0x7dd)]);},Sprite_Battler['prototype'][_0x444eb4(0x544)]=function(){const _0xc24155=_0x444eb4;if(!this[_0xc24155(0x917)])return;if(this[_0xc24155(0x701)]&&this['_battler']['svBattlerShadowVisible']()){const _0x2ceb01=this[_0xc24155(0x917)]['bitmap'];this[_0xc24155(0x917)][_0xc24155(0xad)](0x0,0x0,_0x2ceb01[_0xc24155(0x592)],_0x2ceb01[_0xc24155(0x773)]);}else this[_0xc24155(0x917)][_0xc24155(0xad)](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x444eb4(0x268)]['damageContainer']=function(){const _0x2584c5=_0x444eb4;if(SceneManager[_0x2584c5(0x11f)]()){if(_0x2584c5(0x3d3)!==_0x2584c5(0x174))return SceneManager[_0x2584c5(0x3a7)][_0x2584c5(0x60c)]['_damageContainer'];else{function _0x3e4b14(){const _0x4c6d9a=_0x2584c5;this[_0x4c6d9a(0x6e0)][_0x4c6d9a(0x96e)](),this['_actorWindow']['hide'](),this[_0x4c6d9a(0x30f)][_0x4c6d9a(0x83d)]();}}}else{if(_0x2584c5(0x84e)!=='FSXRq'){function _0x372a24(){const _0x1f61c6=_0x2584c5,_0xdd253e=_0x50bfd4[_0x1f61c6(0x221)](_0x307d17);return _0xdd253e>=0x0?[_0x532321[_0xdd253e-0x1]||_0x26f2c3]:[_0x272681];}}else return this[_0x2584c5(0x921)];}},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x472)]=function(_0x2ecb26,_0x5af7ac){const _0x8e8c33=_0x444eb4;if(!this[_0x8e8c33(0x701)][_0x8e8c33(0x919)]())return;const _0x338a4a=VisuMZ[_0x8e8c33(0x25c)][_0x8e8c33(0x90c)]['Damage'],_0x1c2194=new Sprite_Damage();_0x1c2194[_0x8e8c33(0x7a7)]=_0x338a4a[_0x8e8c33(0x6da)],this['sortDamageSprites'](_0x1c2194),_0x1c2194[_0x8e8c33(0x472)](_0x2ecb26,_0x5af7ac),this[_0x8e8c33(0x5b7)](_0x1c2194);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x6d6)]=function(_0x2e1771,_0x2d13b0,_0x349658){const _0x42ab63=_0x444eb4;if(!this[_0x42ab63(0x701)][_0x42ab63(0x919)]())return;const _0xd5fd25=VisuMZ[_0x42ab63(0x25c)][_0x42ab63(0x90c)]['Damage'],_0x330e62=new Sprite_Damage();_0x330e62[_0x42ab63(0x7a7)]=_0xd5fd25[_0x42ab63(0x6da)],this[_0x42ab63(0x159)](_0x330e62),_0x330e62[_0x42ab63(0x6d6)](_0x2e1771,_0x2d13b0,_0x349658),this[_0x42ab63(0x5b7)](_0x330e62);},Sprite_Battler['prototype'][_0x444eb4(0x31d)]=function(){const _0x377685=_0x444eb4;if(!this[_0x377685(0x701)][_0x377685(0x93e)]())return;while(this['_battler'][_0x377685(0x93e)]()){this[_0x377685(0x701)]['isSpriteVisible']()&&this['createDamageSprite']();}this[_0x377685(0x701)][_0x377685(0x4c3)](),this[_0x377685(0x701)][_0x377685(0xe2)]();},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x223)]=function(){const _0x1a8ef5=_0x444eb4,_0x20f362=VisuMZ['BattleCore'][_0x1a8ef5(0x90c)][_0x1a8ef5(0x4b3)],_0x207a85=new Sprite_Damage();_0x207a85[_0x1a8ef5(0x7a7)]=_0x20f362[_0x1a8ef5(0x6da)],this['sortDamageSprites'](_0x207a85),_0x207a85['setup'](this[_0x1a8ef5(0x701)]),_0x207a85['setupBattleCore'](this[_0x1a8ef5(0x701)]),this[_0x1a8ef5(0x5b7)](_0x207a85);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x5b7)]=function(_0x45f94b){const _0x3e6391=_0x444eb4;this[_0x3e6391(0x778)][_0x3e6391(0x12b)](_0x45f94b);if(this['isShownOnBattlePortrait']()){if(_0x3e6391(0x2d0)!=='fIRaJ'){function _0x46ed3f(){const _0x413cbb=_0x3e6391;if(this[_0x413cbb(0x3de)]<=0x0)return;const _0x456aa2=this[_0x413cbb(0x3de)],_0x28998b=this[_0x413cbb(0x20d)],_0x1a0cf1=this[_0x413cbb(0x532)];_0x4699de[_0x413cbb(0x305)]?this[_0x413cbb(0x30b)]=this[_0x413cbb(0x87f)](this[_0x413cbb(0x30b)],this[_0x413cbb(0x415)],_0x456aa2,_0x28998b,_0x1a0cf1):this[_0x413cbb(0x30b)]=(this[_0x413cbb(0x30b)]*(_0x456aa2-0x1)+this[_0x413cbb(0x415)])/_0x456aa2;this[_0x413cbb(0x3de)]--;if(this[_0x413cbb(0x3de)]<=0x0)this['onOpacityEnd']();}}else SceneManager[_0x3e6391(0x3a7)][_0x3e6391(0x6e0)][_0x3e6391(0x5b7)](_0x45f94b,this['_battler']);}else{if('gdcJZ'===_0x3e6391(0x454)){this['damageContainer']()[_0x3e6391(0x86a)](_0x45f94b);if(SceneManager[_0x3e6391(0x35e)]())_0x45f94b[_0x3e6391(0x731)]['x']=-0x1;}else{function _0x8957ae(){const _0x375f62=_0x3e6391;this[_0x375f62(0x89a)]();}}}},Sprite_Battler['prototype'][_0x444eb4(0x3b8)]=function(){const _0x2a020a=_0x444eb4;return!$gameSystem[_0x2a020a(0x73c)]()&&this[_0x2a020a(0x701)]&&this['_battler'][_0x2a020a(0x73d)]();},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x159)]=function(_0x2d80b5){const _0x5bd48d=_0x444eb4,_0xd64d88=VisuMZ[_0x5bd48d(0x25c)]['Settings'][_0x5bd48d(0x4b3)],_0x24b81e=SceneManager['isBattleFlipped']()?-0x1:0x1;let _0x4f950d=this['x'],_0x3b61f8=this['y'];const _0x1574ce=SceneManager[_0x5bd48d(0x3a7)][_0x5bd48d(0x6e0)];if(_0x1574ce&&this[_0x5bd48d(0x921)]===_0x1574ce){_0x4f950d+=_0x1574ce['x']-this[_0x5bd48d(0x394)]();const _0x2eec75=_0x1574ce[_0x5bd48d(0x2c0)]()*0x3/0x4;_0x3b61f8=_0x1574ce['y']+_0x2eec75,_0x3b61f8=Math[_0x5bd48d(0x827)](_0x3b61f8,_0x1574ce['y']+this['y']-this['height']+_0x2eec75);}_0x2d80b5['x']=Math['round'](_0x4f950d+this[_0x5bd48d(0x394)]()*_0x24b81e),_0x2d80b5['y']=Math[_0x5bd48d(0x29d)](_0x3b61f8+this[_0x5bd48d(0x1f5)]());if(_0xd64d88[_0x5bd48d(0x8e2)])for(const _0x6da65a of this[_0x5bd48d(0x778)]){if(_0x5bd48d(0x57b)===_0x5bd48d(0x5b8)){function _0x5ae6a0(){_0x3ec23b=(_0x556320+_0x5da7e7)/0x2;}}else _0x6da65a['x']+=_0xd64d88[_0x5bd48d(0x4c9)]*_0x24b81e,_0x6da65a['y']+=_0xd64d88[_0x5bd48d(0x487)];}else{const _0x6c3a58=this[_0x5bd48d(0x778)][this['_damages'][_0x5bd48d(0x34a)]-0x1];if(_0x6c3a58){if(_0x5bd48d(0x4a0)!==_0x5bd48d(0x4a0)){function _0x5186b4(){const _0x198a05=_0x5bd48d;if(this['isEnemy']()&&!this[_0x198a05(0x19f)]())return;let _0x6de80d=0x0;if(this['isActor']()){const _0x52ed13=this[_0x198a05(0x93b)]();_0x6de80d=_0x52ed13[0x0]?_0x52ed13[0x0][_0x198a05(0x74e)]:0x0;}else this[_0x198a05(0x5e6)]()&&(_0x6de80d=this['svBattlerData']()[_0x198a05(0x74e)]||0x0);const _0x747d29=_0x3cb99b['attackMotions'][_0x6de80d];_0x39034c===_0x198a05(0x606)&&(_0x5118a7=[_0x198a05(0x13f),_0x198a05(0x436),_0x198a05(0x660)][_0x747d29['type']]||_0x198a05(0x436)),this[_0x198a05(0x953)]={'motionType':_0x1ddecf,'weaponImageId':_0x214876?_0x747d29['weaponImageId']:0x0,'pattern':_0x55e97d};}}else _0x2d80b5['x']=_0x6c3a58['x']+_0xd64d88[_0x5bd48d(0x4c9)]*_0x24b81e,_0x2d80b5['y']=_0x6c3a58['y']+_0xd64d88[_0x5bd48d(0x487)];}}},VisuMZ[_0x444eb4(0x25c)]['Sprite_Battler_damageOffsetX']=Sprite_Battler[_0x444eb4(0x268)]['damageOffsetX'],Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x394)]=function(){const _0x26ad8c=_0x444eb4;let _0x1eb349=VisuMZ[_0x26ad8c(0x25c)]['Sprite_Battler_damageOffsetX'][_0x26ad8c(0x315)](this),_0x2b37fb=VisuMZ[_0x26ad8c(0x25c)][_0x26ad8c(0x90c)][_0x26ad8c(0x4b3)][_0x26ad8c(0x879)]||0x0;return Math[_0x26ad8c(0x29d)](_0x1eb349+_0x2b37fb);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x982)]=Sprite_Battler[_0x444eb4(0x268)]['damageOffsetY'],Sprite_Battler[_0x444eb4(0x268)]['damageOffsetY']=function(){const _0x3e2c18=_0x444eb4;let _0x4d8890=VisuMZ['BattleCore'][_0x3e2c18(0x982)]['call'](this);switch(VisuMZ[_0x3e2c18(0x25c)]['Settings'][_0x3e2c18(0x4b3)][_0x3e2c18(0x456)]){case _0x3e2c18(0x27b):_0x4d8890-=this['height']*this[_0x3e2c18(0x731)]['y'];break;case _0x3e2c18(0x373):_0x4d8890-=this[_0x3e2c18(0x773)]*this['scale']['y']*0.5;break;}let _0xd4dd5b=VisuMZ[_0x3e2c18(0x25c)][_0x3e2c18(0x90c)][_0x3e2c18(0x4b3)][_0x3e2c18(0x150)]||0x0;return Math[_0x3e2c18(0x29d)](_0x4d8890+_0xd4dd5b);},Sprite_Actor[_0x444eb4(0x268)]['damageOffsetX']=function(){const _0x436696=_0x444eb4;return Sprite_Battler[_0x436696(0x268)][_0x436696(0x394)][_0x436696(0x315)](this);},Sprite_Actor[_0x444eb4(0x268)]['damageOffsetY']=function(){const _0x43b058=_0x444eb4;return Sprite_Battler['prototype'][_0x43b058(0x1f5)][_0x43b058(0x315)](this);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0xfd)]=function(_0x1748c3){const _0x277f16=_0x444eb4;this['isShownOnBattlePortrait']()?SceneManager[_0x277f16(0x3a7)][_0x277f16(0x6e0)][_0x277f16(0x6e7)](_0x1748c3):(this[_0x277f16(0xd2)]()[_0x277f16(0x910)](_0x1748c3),this[_0x277f16(0x778)][_0x277f16(0x580)](_0x1748c3),_0x1748c3['destroy']());},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x90e)]=Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x336)],Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x336)]=function(_0x40f0ee,_0x4e0cb1){const _0x495751=_0x444eb4;if(!this[_0x495751(0x890)]){this['_initialOffset']=!![];const _0x5ced75=VisuMZ['BattleCore'][_0x495751(0x90c)];if(this['constructor']===Sprite_Actor)_0x40f0ee+=_0x5ced75['Actor'][_0x495751(0x578)]||0x0,_0x4e0cb1+=_0x5ced75[_0x495751(0x78b)][_0x495751(0x872)]||0x0;else this[_0x495751(0x266)]===Sprite_Enemy&&(_0x40f0ee+=_0x5ced75[_0x495751(0x874)][_0x495751(0x578)]||0x0,_0x4e0cb1+=_0x5ced75[_0x495751(0x874)][_0x495751(0x872)]||0x0);}VisuMZ[_0x495751(0x25c)]['Sprite_Battler_setHome']['call'](this,_0x40f0ee,_0x4e0cb1);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x922)]=Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x54f)],Sprite_Battler['prototype']['update']=function(){const _0x4c899b=_0x444eb4;VisuMZ[_0x4c899b(0x25c)][_0x4c899b(0x922)][_0x4c899b(0x315)](this),!this[_0x4c899b(0x701)]&&this[_0x4c899b(0x2e5)]&&(this[_0x4c899b(0x2e5)]['visible']=![]);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x8e5)]=Sprite_Battler['prototype'][_0x444eb4(0x53b)],Sprite_Battler['prototype'][_0x444eb4(0x53b)]=function(){const _0x163c99=_0x444eb4;this[_0x163c99(0x80e)](),this[_0x163c99(0x5b9)](),this[_0x163c99(0x269)](),this[_0x163c99(0x7ca)](),this[_0x163c99(0x41d)](),VisuMZ[_0x163c99(0x25c)][_0x163c99(0x8e5)][_0x163c99(0x315)](this);if(this[_0x163c99(0x266)]===Sprite_Enemy)this[_0x163c99(0x546)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0xd6)]=Sprite_Battler[_0x444eb4(0x268)]['updatePosition'],Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x4f1)]=function(){const _0x3db2b5=_0x444eb4;VisuMZ[_0x3db2b5(0x25c)][_0x3db2b5(0xd6)][_0x3db2b5(0x315)](this),this[_0x3db2b5(0x45c)](),this[_0x3db2b5(0x725)]();},Sprite_Battler['prototype']['updatePositionBattleCore']=function(){const _0x4957c8=_0x444eb4;this[_0x4957c8(0x7f8)]=this['x'],this[_0x4957c8(0x29f)]=this['y'],this[_0x4957c8(0x2c7)](),this[_0x4957c8(0x844)](),this['x']+=this[_0x4957c8(0x6ce)](),this['y']+=this[_0x4957c8(0x288)](),this['x']=Math[_0x4957c8(0x29d)](this['x']),this['y']=Math[_0x4957c8(0x29d)](this['y']);},Sprite_Battler['prototype']['extraPositionX']=function(){let _0x24d99b=0x0;return _0x24d99b;},Sprite_Battler[_0x444eb4(0x268)]['extraPositionY']=function(){const _0x57b1e2=_0x444eb4;let _0x5317bd=0x0;if(this[_0x57b1e2(0x701)]&&!this[_0x57b1e2(0x701)]['isBattlerGrounded']()){if('WPMlR'===_0x57b1e2(0x6aa))_0x5317bd-=this[_0x57b1e2(0x2bf)],_0x5317bd-=this[_0x57b1e2(0xc4)];else{function _0x3d5fa8(){const _0x2590f2=_0x57b1e2;this['processBattleCoreJS'](_0x2590f2(0x2ef));const _0x114249=this[_0x2590f2(0x413)];_0x4e762c['BattleCore'][_0x2590f2(0x40f)]['call'](this),this[_0x2590f2(0x413)]=_0x114249+_0x4c7a65[_0x2590f2(0x25c)][_0x2590f2(0x90c)]['Mechanics'][_0x2590f2(0x1bd)][_0x2590f2(0x315)](this),this['processPostBattleCommonEvents'](_0x2590f2(0x3f3));}}}if(this[_0x57b1e2(0x2ac)]&&this[_0x57b1e2(0x266)]!==Sprite_SvEnemy){if('YTtHY'===_0x57b1e2(0x148)){function _0x289015(){const _0x33edc5=_0x57b1e2,_0x561ee0=_0x5c6e23[_0x33edc5(0x25c)]['Settings']['BattleLog'];_0x561ee0['ActionCenteredName']&&this['push'](_0x33edc5(0x86e),_0x33edc5(0x930)['format'](_0xd27eb1['battleDisplayText'](_0x2b5f50)));if(_0x5481f2['isSkill'](_0x4939bb)){if(_0x561ee0[_0x33edc5(0x887)])this[_0x33edc5(0xc2)](_0x2f3906['message1'],_0x572af3,_0xe1bee4);if(_0x561ee0[_0x33edc5(0x92c)])this['displayItemMessage'](_0x258ba4[_0x33edc5(0x914)],_0x5dc335,_0x499901);}else{if(_0x561ee0[_0x33edc5(0x48d)])this[_0x33edc5(0xc2)](_0x2a78b4[_0x33edc5(0x62e)],_0x33d8fd,_0x4be3aa);}}}else{const _0x2f393a=this[_0x57b1e2(0x2ac)][_0x57b1e2(0x731)]['y'];_0x5317bd-=(_0x2f393a-0x1)*this[_0x57b1e2(0x773)];}}return _0x5317bd;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x7ca)]=function(){const _0x379ac7=_0x444eb4,_0x3e7267=this[_0x379ac7(0x701)]&&this[_0x379ac7(0x701)][_0x379ac7(0x8f3)]();this[_0x379ac7(0x7ec)]=(_0x3e7267?-0x1:0x1)*Math[_0x379ac7(0x7fa)](this[_0x379ac7(0x731)]['x']);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x3bc)]=function(_0x13e0ac,_0x4bcda3,_0xc893e4){const _0x9bcc4c=_0x444eb4;if(!this[_0x9bcc4c(0x44d)]())return;if(this[_0x9bcc4c(0x8da)]===_0x13e0ac)return;this[_0x9bcc4c(0x8da)]=_0x13e0ac,this[_0x9bcc4c(0x5dc)]=_0x4bcda3,this[_0x9bcc4c(0x6b1)]=_0x4bcda3,this[_0x9bcc4c(0x567)]=_0xc893e4||_0x9bcc4c(0x5b6);if(_0x4bcda3<=0x0)this['_floatHeight']=_0x13e0ac;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x2c7)]=function(){const _0x82421d=_0x444eb4;if(this[_0x82421d(0x5dc)]<=0x0)return;const _0xe35968=this[_0x82421d(0x5dc)],_0x31bc1e=this[_0x82421d(0x6b1)],_0x34c01e=this[_0x82421d(0x567)];if(Imported[_0x82421d(0x305)]){if('qElbY'!==_0x82421d(0x5ac))this[_0x82421d(0x2bf)]=this[_0x82421d(0x87f)](this[_0x82421d(0x2bf)],this[_0x82421d(0x8da)],_0xe35968,_0x31bc1e,_0x34c01e);else{function _0xf511e5(){if(!_0x5aac23['isSideView']())return;const _0x28355c=this['battler']();if(!_0x28355c)return;_0x28355c['startJump'](_0x2f99c0,_0x57ac85);}}}else this[_0x82421d(0x2bf)]=(this[_0x82421d(0x2bf)]*(_0xe35968-0x1)+this[_0x82421d(0x8da)])/_0xe35968;this[_0x82421d(0x5dc)]--;if(this[_0x82421d(0x5dc)]<=0x0)this[_0x82421d(0x655)]();},Sprite_Battler[_0x444eb4(0x268)]['onFloatEnd']=function(){const _0x1caf75=_0x444eb4;this[_0x1caf75(0x2bf)]=this[_0x1caf75(0x8da)];},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x4d8)]=function(){return this['_floatDuration']>0x0;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x735)]=function(_0x2617af,_0x4b1157){const _0x209392=_0x444eb4;if(!this[_0x209392(0x44d)]())return;if(_0x4b1157<=0x0)return;this[_0x209392(0x478)]=_0x2617af,this[_0x209392(0x422)]=_0x4b1157,this[_0x209392(0x2f9)]=_0x4b1157;},Sprite_Battler['prototype'][_0x444eb4(0x844)]=function(){const _0x5633e3=_0x444eb4;if(this[_0x5633e3(0x422)]<=0x0)return;const _0x4e1d22=this['_jumpWholeDuration']-this['_jumpDuration'],_0x3a9027=this[_0x5633e3(0x2f9)]/0x2,_0x5ea8b1=this[_0x5633e3(0x478)],_0x5291f9=-_0x5ea8b1/Math[_0x5633e3(0x40d)](_0x3a9027,0x2);this[_0x5633e3(0xc4)]=_0x5291f9*Math[_0x5633e3(0x40d)](_0x4e1d22-_0x3a9027,0x2)+_0x5ea8b1,this['_jumpDuration']--;if(this[_0x5633e3(0x422)]<=0x0)return this[_0x5633e3(0x162)]();},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x162)]=function(){const _0x5c5803=_0x444eb4;this[_0x5c5803(0xc4)]=0x0;},Sprite_Battler[_0x444eb4(0x268)]['isJumping']=function(){const _0x1c28cb=_0x444eb4;return this[_0x1c28cb(0x422)]>0x0;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x925)]=function(_0x400db5,_0x550cbd,_0x8774cc){const _0x540152=_0x444eb4;if(this[_0x540152(0x415)]===_0x400db5)return;this[_0x540152(0x415)]=_0x400db5,this[_0x540152(0x3de)]=_0x550cbd,this[_0x540152(0x20d)]=_0x550cbd,this[_0x540152(0x532)]=_0x8774cc||'Linear';if(_0x550cbd<=0x0)this['opacity']=_0x400db5;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x725)]=function(){const _0x32d466=_0x444eb4;if(this[_0x32d466(0x3de)]<=0x0)return;const _0x3ff48f=this[_0x32d466(0x3de)],_0x162baa=this[_0x32d466(0x20d)],_0x1abcda=this[_0x32d466(0x532)];if(Imported['VisuMZ_0_CoreEngine']){if(_0x32d466(0x4f0)!=='ybVNL'){function _0xefec25(){const _0x3445f2=_0x32d466;this['_phase']=_0x3445f2(0x646);}}else this['opacity']=this[_0x32d466(0x87f)](this[_0x32d466(0x30b)],this['_targetOpacity'],_0x3ff48f,_0x162baa,_0x1abcda);}else this[_0x32d466(0x30b)]=(this[_0x32d466(0x30b)]*(_0x3ff48f-0x1)+this['_targetOpacity'])/_0x3ff48f;this[_0x32d466(0x3de)]--;if(this[_0x32d466(0x3de)]<=0x0)this[_0x32d466(0x6bd)]();},Sprite_Battler[_0x444eb4(0x268)]['onOpacityEnd']=function(){const _0x219d85=_0x444eb4;this[_0x219d85(0x30b)]=this[_0x219d85(0x415)];},Sprite_Battler['prototype']['isChangingOpacity']=function(){const _0x5cb9db=_0x444eb4;return this[_0x5cb9db(0x3de)]>0x0;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x546)]=function(){const _0x468308=_0x444eb4;this['_shadowSprite'][_0x468308(0x693)]=this[_0x468308(0x701)][_0x468308(0x19f)](),this[_0x468308(0x4b4)]();},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x4b4)]=function(){const _0x2bdc8d=_0x444eb4;if(!this[_0x2bdc8d(0x917)])return;this[_0x2bdc8d(0x917)]['y']=Math[_0x2bdc8d(0x29d)](-this[_0x2bdc8d(0x288)]()-0x2);},Sprite_Battler[_0x444eb4(0x268)]['updateScale']=function(){const _0xd80792=_0x444eb4;if(this['constructor']===Sprite_SvEnemy)return;this[_0xd80792(0x24f)](),this[_0xd80792(0x21c)]();},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x21c)]=function(){const _0x237918=_0x444eb4,_0x111c3f=this['_distortionSprite'];if(_0x111c3f){if(_0x237918(0xef)!=='UFfgC')_0x111c3f['scale']['x']=this[_0x237918(0x724)](),_0x111c3f[_0x237918(0x731)]['y']=this[_0x237918(0x3f8)]();else{function _0x43b6fb(){const _0xfd268f=_0x237918;this[_0xfd268f(0x60f)](_0xfd268f(0x3fc));}}}},Sprite_Battler['prototype'][_0x444eb4(0x724)]=function(){const _0x3ccf9e=_0x444eb4;let _0x5d5097=0x1;return _0x5d5097*=this['_flipScaleX'],_0x5d5097*=this[_0x3ccf9e(0x649)],_0x5d5097;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x3f8)]=function(){const _0x59e092=_0x444eb4;return 0x1*this[_0x59e092(0x523)];},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x817)]=function(){const _0x52ed00=_0x444eb4;return this[_0x52ed00(0x592)]*this['mainSpriteScaleX']();},Sprite_Battler['prototype'][_0x444eb4(0x48f)]=function(){const _0x2e6910=_0x444eb4;return this[_0x2e6910(0x773)]*this[_0x2e6910(0x3f8)]();},Sprite_Battler['prototype'][_0x444eb4(0x836)]=function(_0x3f2d7e,_0x10705a,_0x23641f,_0x5de03c){const _0x597544=_0x444eb4;if(!this[_0x597544(0x44d)]())return;if(!this[_0x597544(0x2ac)])return;if(this[_0x597544(0x3fe)]===_0x3f2d7e&&this['_targetGrowY']===_0x10705a)return;this[_0x597544(0x3fe)]=_0x3f2d7e,this[_0x597544(0x4c2)]=_0x10705a,this[_0x597544(0x981)]=_0x23641f,this[_0x597544(0x707)]=_0x23641f,this[_0x597544(0x23e)]=_0x5de03c||'Linear',_0x23641f<=0x0&&(this[_0x597544(0x649)]=this[_0x597544(0x3fe)],this[_0x597544(0x523)]=this['_targetGrowY']);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x24f)]=function(){const _0x3c6ae6=_0x444eb4;if(this[_0x3c6ae6(0x981)]<=0x0)return;if(!this[_0x3c6ae6(0x2ac)])return;const _0x6f4db7=this[_0x3c6ae6(0x981)],_0x401cbb=this[_0x3c6ae6(0x707)],_0x597c73=this[_0x3c6ae6(0x23e)];if(Imported['VisuMZ_0_CoreEngine']){if(_0x3c6ae6(0x7fc)===_0x3c6ae6(0x7fc))this[_0x3c6ae6(0x649)]=this[_0x3c6ae6(0x87f)](this[_0x3c6ae6(0x649)],this[_0x3c6ae6(0x3fe)],_0x6f4db7,_0x401cbb,_0x597c73),this['_growY']=this[_0x3c6ae6(0x87f)](this['_growY'],this[_0x3c6ae6(0x4c2)],_0x6f4db7,_0x401cbb,_0x597c73);else{function _0x22aee8(){const _0x22f458=_0x3c6ae6;_0x5231ff[_0x22f458(0x268)][_0x22f458(0x23a)][_0x22f458(0x315)](this,_0x3c11cd,_0x2350b9,_0x40caf9,_0x1767b6);}}}else this[_0x3c6ae6(0x649)]=(this[_0x3c6ae6(0x649)]*(_0x6f4db7-0x1)+this[_0x3c6ae6(0x3fe)])/_0x6f4db7,this['_growY']=(this[_0x3c6ae6(0x523)]*(_0x6f4db7-0x1)+this[_0x3c6ae6(0x4c2)])/_0x6f4db7;this[_0x3c6ae6(0x981)]--;if(this[_0x3c6ae6(0x981)]<=0x0)this[_0x3c6ae6(0x367)]();},Sprite_Battler['prototype'][_0x444eb4(0x367)]=function(){const _0x1cc22f=_0x444eb4;this[_0x1cc22f(0x649)]=this[_0x1cc22f(0x3fe)],this[_0x1cc22f(0x523)]=this[_0x1cc22f(0x4c2)];},Sprite_Battler['prototype']['isGrowing']=function(){const _0x4b3f60=_0x444eb4;return this[_0x4b3f60(0x981)]>0x0;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x4c8)]=function(_0x1bcab2,_0x1808ee,_0x10ad9b,_0x937c0d){const _0x1c6843=_0x444eb4;if(!this[_0x1c6843(0x44d)]())return;if(!this[_0x1c6843(0x2ac)])return;if(this[_0x1c6843(0x6b9)]===_0x1bcab2&&this[_0x1c6843(0x17e)]===_0x1808ee)return;this['_targetSkewX']=_0x1bcab2,this['_targetSkewY']=_0x1808ee,this[_0x1c6843(0x8b6)]=_0x10ad9b,this[_0x1c6843(0x1c7)]=_0x10ad9b,this['_skewEasing']=_0x937c0d||'Linear';if(_0x10ad9b<=0x0){if(_0x1c6843(0x754)!==_0x1c6843(0x8bf))this[_0x1c6843(0x2ac)][_0x1c6843(0x521)]['x']=this[_0x1c6843(0x6b9)],this[_0x1c6843(0x2ac)][_0x1c6843(0x521)]['y']=this[_0x1c6843(0x17e)];else{function _0x5a3dd0(){const _0x342d27=_0x1c6843;if(this['hasSvBattler']())this[_0x342d27(0x36b)][_0x342d27(0x74f)](_0xfdef2e);}}}},Sprite_Battler[_0x444eb4(0x268)]['updateSkew']=function(){const _0x34e945=_0x444eb4;if(this[_0x34e945(0x8b6)]<=0x0)return;if(!this[_0x34e945(0x2ac)])return;const _0x7b33d1=this[_0x34e945(0x8b6)],_0x153301=this['_skewWholeDuration'],_0x5e6551=this[_0x34e945(0x8fe)],_0x79e723=this['_distortionSprite'];Imported[_0x34e945(0x305)]?(_0x79e723[_0x34e945(0x521)]['x']=this[_0x34e945(0x87f)](_0x79e723[_0x34e945(0x521)]['x'],this[_0x34e945(0x6b9)],_0x7b33d1,_0x153301,_0x5e6551),_0x79e723[_0x34e945(0x521)]['y']=this['applyEasing'](_0x79e723[_0x34e945(0x521)]['y'],this[_0x34e945(0x17e)],_0x7b33d1,_0x153301,_0x5e6551)):(_0x79e723[_0x34e945(0x521)]['x']=(_0x79e723[_0x34e945(0x521)]['x']*(_0x7b33d1-0x1)+this['_targetSkewX'])/_0x7b33d1,_0x79e723['skew']['y']=(_0x79e723[_0x34e945(0x521)]['y']*(_0x7b33d1-0x1)+this[_0x34e945(0x17e)])/_0x7b33d1);this[_0x34e945(0x8b6)]--;if(this[_0x34e945(0x8b6)]<=0x0)this[_0x34e945(0x76d)]();},Sprite_Battler[_0x444eb4(0x268)]['onSkewEnd']=function(){const _0x4f26e9=_0x444eb4;this[_0x4f26e9(0x2ac)][_0x4f26e9(0x521)]['x']=this[_0x4f26e9(0x6b9)],this[_0x4f26e9(0x2ac)][_0x4f26e9(0x521)]['y']=this[_0x4f26e9(0x17e)];},Sprite_Battler['prototype']['isSkewing']=function(){const _0x532f07=_0x444eb4;return this[_0x532f07(0x8b6)]>0x0;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x812)]=function(_0x97f011,_0x453527,_0x3ac642,_0x1f4365){const _0x324429=_0x444eb4;if(!this[_0x324429(0x44d)]())return;if(!this[_0x324429(0x2ac)])return;if(this[_0x324429(0x206)]===_0x97f011)return;this[_0x324429(0x206)]=_0x97f011,this[_0x324429(0x741)]=_0x453527,this['_angleWholeDuration']=_0x453527,this[_0x324429(0x416)]=_0x3ac642||_0x324429(0x5b6),this['_angleRevertOnFinish']=_0x1f4365;if(this[_0x324429(0x8ca)]===undefined){if(_0x324429(0x5b1)!==_0x324429(0x5b1)){function _0x54d8de(){const _0xad7e13=_0x324429;this['_initialOffset']=!![];const _0x48ea1f=_0x1c0bfc[_0xad7e13(0x25c)][_0xad7e13(0x90c)];if(this['constructor']===_0x20e506)_0x1121e2+=_0x48ea1f['Actor']['OffsetX']||0x0,_0x3d66ae+=_0x48ea1f[_0xad7e13(0x78b)][_0xad7e13(0x872)]||0x0;else this[_0xad7e13(0x266)]===_0x103e72&&(_0x4fb76f+=_0x48ea1f[_0xad7e13(0x874)]['OffsetX']||0x0,_0x4c8eb2+=_0x48ea1f[_0xad7e13(0x874)][_0xad7e13(0x872)]||0x0);}}else this[_0x324429(0x8ca)]=!![];}_0x453527<=0x0&&(this['_currentAngle']=_0x97f011,this['_angleRevertOnFinish']&&(this[_0x324429(0x206)]=0x0,this[_0x324429(0x2a0)]=0x0));},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x269)]=function(){const _0x365e53=_0x444eb4;this[_0x365e53(0x846)](),this[_0x365e53(0x182)]();},Sprite_Battler['prototype'][_0x444eb4(0x846)]=function(){const _0x5514a5=_0x444eb4;if(this[_0x5514a5(0x741)]<=0x0)return;const _0x3cb877=this['_angleDuration'],_0x211de7=this[_0x5514a5(0x352)],_0xb52fe2=this[_0x5514a5(0x416)];Imported['VisuMZ_0_CoreEngine']?this[_0x5514a5(0x2a0)]=this[_0x5514a5(0x87f)](this[_0x5514a5(0x2a0)],this[_0x5514a5(0x206)],_0x3cb877,_0x211de7,_0xb52fe2):this[_0x5514a5(0x2a0)]=(this['_currentAngle']*(_0x3cb877-0x1)+this['_targetAngle'])/_0x3cb877;this['_angleDuration']--;if(this[_0x5514a5(0x741)]<=0x0)this['onAngleEnd']();},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x140)]=function(){const _0x1dd0d5=_0x444eb4;this[_0x1dd0d5(0x2a0)]=this[_0x1dd0d5(0x206)];if(this[_0x1dd0d5(0x8ca)]){if('bzaQZ'!==_0x1dd0d5(0x386)){function _0x437d33(){const _0x5523de=_0x1dd0d5;_0x190c91[_0x5523de(0x521)]['x']=this['applyEasing'](_0x3eda75['skew']['x'],this['_targetSkewX'],_0x27a265,_0x408f0c,_0x134a7c),_0x2174ff[_0x5523de(0x521)]['y']=this['applyEasing'](_0x2e9dd7[_0x5523de(0x521)]['y'],this[_0x5523de(0x17e)],_0x482e6e,_0x1f6eef,_0x12897b);}}else this[_0x1dd0d5(0x206)]=0x0,this[_0x1dd0d5(0x2a0)]=0x0;}},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x783)]=function(){const _0x10f8c0=_0x444eb4;return this[_0x10f8c0(0x741)]>0x0;},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x182)]=function(){const _0xdcf77c=_0x444eb4;if(!this['_distortionSprite'])return;const _0x4ed98f=this[_0xdcf77c(0x2a0)],_0x2d7469=this[_0xdcf77c(0x731)]['x'],_0x212166=this[_0xdcf77c(0x701)][_0xdcf77c(0x73d)]()?-0x1:0x1;this[_0xdcf77c(0x2ac)][_0xdcf77c(0xdf)]=_0x4ed98f*_0x2d7469*_0x212166;const _0x168608=this[_0xdcf77c(0x2ac)][_0xdcf77c(0x731)]['y'];this[_0xdcf77c(0x2ac)]['y']=this[_0xdcf77c(0x773)]*-0.5*(0x2-_0x168608);const _0x2fef6b=[this[_0xdcf77c(0x427)],this[_0xdcf77c(0x36b)],this[_0xdcf77c(0x7dd)]];for(const _0x4d55c9 of _0x2fef6b){if(!_0x4d55c9)continue;_0x4d55c9['y']=this[_0xdcf77c(0x773)]*0.5;}this[_0xdcf77c(0x917)]&&(this['_shadowSprite'][_0xdcf77c(0x731)]['x']=this[_0xdcf77c(0x2ac)]['scale']['x'],this[_0xdcf77c(0x917)][_0xdcf77c(0x731)]['y']=this['_distortionSprite'][_0xdcf77c(0x731)]['y']);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x27d)]=Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x4f3)],Sprite_Actor[_0x444eb4(0x268)]['createStateSprite']=function(){const _0x2ea113=_0x444eb4;VisuMZ['BattleCore']['Sprite_Actor_createStateSprite']['call'](this),VisuMZ[_0x2ea113(0x25c)][_0x2ea113(0x90c)][_0x2ea113(0x1fd)]['ShowActorGauge']&&this['createHpGaugeSprite']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x793)]=Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x853)],Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x853)]=function(){const _0x1c7106=_0x444eb4;if(VisuMZ['BattleCore'][_0x1c7106(0x90c)][_0x1c7106(0x1fd)][_0x1c7106(0x62a)]){if(_0x1c7106(0x58c)!==_0x1c7106(0x551))this[_0x1c7106(0x7bf)]();else{function _0x414773(){const _0x4eeb68=_0x1c7106;return _0x33f0ad[_0x4eeb68(0x25c)][_0x4eeb68(0x90c)][_0x4eeb68(0x75c)]['SkillItemMiddleLayout'];}}}VisuMZ[_0x1c7106(0x25c)][_0x1c7106(0x793)][_0x1c7106(0x315)](this);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x7bf)]=function(){const _0x2356c6=_0x444eb4;if(!ConfigManager[_0x2356c6(0x46e)])return;if(this[_0x2356c6(0x266)]===Sprite_SvEnemy)return;const _0x127c13=VisuMZ[_0x2356c6(0x25c)]['Settings']['HpGauge'],_0x3ff3ca=new Sprite_HpGauge();_0x3ff3ca[_0x2356c6(0x72a)]['x']=_0x127c13[_0x2356c6(0x270)],_0x3ff3ca[_0x2356c6(0x72a)]['y']=_0x127c13[_0x2356c6(0x933)],_0x3ff3ca[_0x2356c6(0x731)]['x']=_0x3ff3ca[_0x2356c6(0x731)]['y']=_0x127c13[_0x2356c6(0x8fb)],this['_hpGaugeSprite']=_0x3ff3ca,this[_0x2356c6(0x86a)](this[_0x2356c6(0x2e5)]);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x5fc)]=Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x47c)],Sprite_Battler['prototype'][_0x444eb4(0x47c)]=function(_0x2ab9a2){const _0x238bc4=_0x444eb4;VisuMZ[_0x238bc4(0x25c)][_0x238bc4(0x5fc)][_0x238bc4(0x315)](this,_0x2ab9a2),this[_0x238bc4(0x28d)](_0x2ab9a2);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x28d)]=function(_0x1b4547){const _0x361ea7=_0x444eb4;if(!_0x1b4547)return;if(!this[_0x361ea7(0x2e5)])return;if(_0x1b4547[_0x361ea7(0x73d)]()){}else{if(_0x1b4547['isEnemy']()){if(_0x361ea7(0x171)==='fyIuR'){if(this[_0x361ea7(0x266)]===Sprite_SvEnemy&&!_0x1b4547[_0x361ea7(0x19f)]())return;}else{function _0x16e758(){const _0xd54d65=_0x361ea7;if(!_0x4e4ac8[_0xd54d65(0x11f)]())return;const _0x3fba0b=_0x3eb078[_0xd54d65(0x283)]();if(!_0x3fba0b)return;_0x3fba0b[_0xd54d65(0x306)](_0xd54d65(0x5b0));}}}}this['_hpGaugeSprite']['setup'](_0x1b4547,'hp');},Sprite_Battler[_0x444eb4(0x268)]['updateHpGaugePosition']=function(){const _0x42f3b1=_0x444eb4;if(!this['_battler'])return;if(!this[_0x42f3b1(0x2e5)])return;const _0x595855=VisuMZ[_0x42f3b1(0x25c)][_0x42f3b1(0x90c)]['HpGauge'],_0x16a889=this['_hpGaugeSprite'];_0x16a889[_0x42f3b1(0x693)]=this[_0x42f3b1(0x49a)]();const _0xe4ad0e=_0x595855[_0x42f3b1(0x578)],_0x39e3f9=_0x595855[_0x42f3b1(0x872)];_0x16a889['x']=_0xe4ad0e,_0x16a889['x']+=this[_0x42f3b1(0x701)]['battleUIOffsetX'](),_0x16a889['y']=-this[_0x42f3b1(0x773)]+_0x39e3f9,_0x16a889['y']+=this[_0x42f3b1(0x701)][_0x42f3b1(0x7ae)]();},Sprite_Battler['prototype'][_0x444eb4(0x49a)]=function(){const _0xc23955=_0x444eb4;if(!this['_battler'])return![];if(this[_0xc23955(0x701)][_0xc23955(0x73d)]())return!![];const _0x1732e2=this[_0xc23955(0x701)][_0xc23955(0x3d5)]()[_0xc23955(0x4bb)];if(_0x1732e2[_0xc23955(0x7db)](/<SHOW HP GAUGE>/i))return!![];if(_0x1732e2['match'](/<HIDE HP GAUGE>/i))return![];const _0x302782=VisuMZ['BattleCore']['Settings']['HpGauge'];if(_0x302782[_0xc23955(0x77e)]){if(_0xc23955(0x32a)===_0xc23955(0x32a)){if(_0x302782[_0xc23955(0x17f)]&&BattleManager[_0xc23955(0x22c)]())return!![];if(this[_0xc23955(0x701)][_0xc23955(0x59b)])return![];return this[_0xc23955(0x701)]['hasBeenDefeatedBefore']();}else{function _0x2d5d72(){const _0x197caf=_0xc23955;_0x2283a7-=_0x538304[_0x197caf(0x48f)]();}}}return!![];},VisuMZ[_0x444eb4(0x25c)]['Sprite_Battler_isMoving']=Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x39d)],Sprite_Battler['prototype'][_0x444eb4(0x39d)]=function(){const _0x11e2a8=_0x444eb4;if(!this[_0x11e2a8(0x701)])return![];return VisuMZ['BattleCore'][_0x11e2a8(0x21e)][_0x11e2a8(0x315)](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x822)]=Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x677)],Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x677)]=function(_0x1c0c5f,_0x34a3aa,_0x122613){const _0x575577=_0x444eb4;this['canMove']()&&VisuMZ[_0x575577(0x25c)]['Sprite_Battler_startMove'][_0x575577(0x315)](this,_0x1c0c5f,_0x34a3aa,_0x122613);},Sprite_Battler['prototype'][_0x444eb4(0x44d)]=function(){const _0x5ddd6f=_0x444eb4;if(this['_battler']&&this['_battler']['isDead']())return![];if(this['_battler']&&!this[_0x5ddd6f(0x701)]['canBattlerMove']())return![];return $gameSystem[_0x5ddd6f(0x73c)]();},Sprite_Battler[_0x444eb4(0x268)]['stepForward']=function(){},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x675)]=function(){const _0x26d2a5=_0x444eb4;this[_0x26d2a5(0x677)](0x0,0x0,0xc);},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x996)]=function(){},Sprite_Battler[_0x444eb4(0x268)][_0x444eb4(0x539)]=function(){const _0x2577f2=_0x444eb4,_0x500408=VisuMZ[_0x2577f2(0x25c)][_0x2577f2(0x90c)][_0x2577f2(0x78b)],_0x58a197=this[_0x2577f2(0x701)]&&this['_battler'][_0x2577f2(0x73d)]()?0x1:-0x1,_0x2651b0=this['_baseX']-this[_0x2577f2(0x76b)]+_0x58a197*_0x500408[_0x2577f2(0x281)],_0x3f6aa1=this[_0x2577f2(0x29f)]-this[_0x2577f2(0x383)]+_0x58a197*_0x500408[_0x2577f2(0x55c)],_0x54166c=_0x500408[_0x2577f2(0x7a4)];this[_0x2577f2(0x677)](_0x2651b0,_0x3f6aa1,_0x54166c);},VisuMZ['BattleCore'][_0x444eb4(0x247)]=Sprite_Actor['prototype'][_0x444eb4(0x61f)],Sprite_Actor['prototype']['initMembers']=function(){const _0x31a52f=_0x444eb4;VisuMZ[_0x31a52f(0x25c)][_0x31a52f(0x247)][_0x31a52f(0x315)](this),this[_0x31a52f(0x7d5)]();},Sprite_Actor['prototype']['mainSprite']=function(){const _0x1cdd6d=_0x444eb4;return this[_0x1cdd6d(0x2ac)]||this['_mainSprite']||this;},VisuMZ[_0x444eb4(0x25c)]['Sprite_Actor_moveToStartPosition']=Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0xe8)],Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0xe8)]=function(){},Sprite_Actor[_0x444eb4(0x268)]['moveToStartPositionBattleCore']=function(_0x230ee0){const _0x5b7127=_0x444eb4;if(SceneManager[_0x5b7127(0x330)]())return;if(!_0x230ee0)return;if(!_0x230ee0[_0x5b7127(0x44d)]())return;VisuMZ['BattleCore'][_0x5b7127(0x854)][_0x5b7127(0x315)](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x10f)]=Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x6d3)],Sprite_Actor['prototype'][_0x444eb4(0x6d3)]=function(_0x1568aa){const _0x15247e=_0x444eb4;VisuMZ['BattleCore']['Settings'][_0x15247e(0x78b)][_0x15247e(0x46a)]?VisuMZ[_0x15247e(0x25c)][_0x15247e(0x90c)][_0x15247e(0x78b)]['HomePosJS'][_0x15247e(0x315)](this,_0x1568aa):VisuMZ[_0x15247e(0x25c)][_0x15247e(0x10f)][_0x15247e(0x315)](this,_0x1568aa);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x7f6)]=Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x47c)],Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x47c)]=function(_0x47c257){const _0x352caa=_0x444eb4;VisuMZ[_0x352caa(0x25c)]['Sprite_Actor_setBattler']['call'](this,_0x47c257),this[_0x352caa(0x2b2)](_0x47c257);},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x2b2)]=function(_0x5de58c){const _0x4212bb=_0x444eb4;if(!_0x5de58c)return;if(!this[_0x4212bb(0x427)])return;this[_0x4212bb(0x427)][_0x4212bb(0x72a)]['x']=this[_0x4212bb(0x50c)][_0x4212bb(0x786)](),this['_mainSprite'][_0x4212bb(0x72a)]['y']=this['_actor'][_0x4212bb(0x967)](),this['updateShadowVisibility']();},VisuMZ[_0x444eb4(0x25c)]['Sprite_Actor_update']=Sprite_Actor['prototype'][_0x444eb4(0x54f)],Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x54f)]=function(){const _0x156830=_0x444eb4;VisuMZ[_0x156830(0x25c)][_0x156830(0x529)][_0x156830(0x315)](this),this[_0x156830(0x50c)]&&(this[_0x156830(0xbb)](),this[_0x156830(0x10a)]());},VisuMZ['BattleCore'][_0x444eb4(0x598)]=Sprite_Actor[_0x444eb4(0x268)]['updateBitmap'],Sprite_Actor[_0x444eb4(0x268)]['updateBitmap']=function(){const _0x2715e0=_0x444eb4;VisuMZ[_0x2715e0(0x25c)]['Sprite_Actor_updateBitmap'][_0x2715e0(0x315)](this);if(this['_mainSprite']&&this[_0x2715e0(0x427)][_0x2715e0(0x8fa)]&&this['_battler']){if(this[_0x2715e0(0x427)][_0x2715e0(0x8fa)]['smooth']!==this[_0x2715e0(0x701)][_0x2715e0(0x44b)]()){if(_0x2715e0(0x4ee)==='VVGhE'){function _0x3e1323(){const _0x1c26ea=_0x2715e0;this[_0x1c26ea(0x60f)](_0x1c26ea(0x41b));}}else this[_0x2715e0(0x427)][_0x2715e0(0x8fa)]['smooth']=this[_0x2715e0(0x701)]['battlerSmoothImage']();}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x1cf)]=Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x546)],Sprite_Actor['prototype'][_0x444eb4(0x546)]=function(){const _0x33f2ed=_0x444eb4;VisuMZ[_0x33f2ed(0x25c)][_0x33f2ed(0x1cf)][_0x33f2ed(0x315)](this),this[_0x33f2ed(0x682)]();},Sprite_Actor[_0x444eb4(0x268)]['updateShadowBattleCore']=function(){const _0x584bd5=_0x444eb4;if(!this[_0x584bd5(0x427)])return;if(!this[_0x584bd5(0x917)])return;this['updateShadowVisibility'](),this[_0x584bd5(0x4b4)]();},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0xbb)]=function(){const _0x38de38=_0x444eb4;this[_0x38de38(0x522)][_0x38de38(0x731)]['x']=0x1/(this[_0x38de38(0x731)]['x']||0.001),this[_0x38de38(0x522)][_0x38de38(0x731)]['y']=0x1/(this['scale']['y']||0.001);},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x10a)]=function(){const _0x952511=_0x444eb4;if(!$gameSystem[_0x952511(0x73c)]()&&this[_0x952511(0x266)]===Sprite_Actor){if(_0x952511(0x59a)==='Xqwpv'){const _0x415d08=Scene_Battle[_0x952511(0x268)][_0x952511(0xac)]();['default','list',_0x952511(0x245),_0x952511(0x27c)][_0x952511(0x8f7)](_0x415d08)&&(this[_0x952511(0x30b)]=0x0);}else{function _0x5f9873(){const _0x2388d1=_0x952511;this[_0x2388d1(0x625)]=!![];}}}},Sprite_Actor['prototype'][_0x444eb4(0x3a5)]=function(){const _0x8fbed3=_0x444eb4,_0x3e989f=this[_0x8fbed3(0x50c)];if(_0x3e989f){const _0x1bf261=_0x3e989f['stateMotionIndex']();if(_0x3e989f[_0x8fbed3(0x144)]()||_0x3e989f[_0x8fbed3(0x3b0)]()){if(_0x8fbed3(0x4b1)==='XRVps'){function _0xfbbf7c(){const _0x3f017e=_0x8fbed3;this['_defeatedEnemies']=this[_0x3f017e(0x575)]||[];}}else this[_0x8fbed3(0x60f)](_0x8fbed3(0xde));}else{if(_0x1bf261===0x3)this[_0x8fbed3(0x60f)]('dead');else{if(_0x1bf261===0x2){if(_0x8fbed3(0x987)==='TDvNU')this[_0x8fbed3(0x60f)](_0x8fbed3(0x249));else{function _0x26e837(){const _0x39d2e1=_0x8fbed3;_0x416e11['prototype'][_0x39d2e1(0x339)][_0x39d2e1(0x315)](this);const _0x2d69b7=this['mainSprite']()||this;if(!_0x2d69b7)return;!_0x2d69b7['bitmap']&&(_0x2d69b7[_0x39d2e1(0x8fa)]=new _0x3fd074(this[_0x39d2e1(0x592)],this[_0x39d2e1(0x773)])),this['_effectType']===_0x39d2e1(0x666)?this[_0x39d2e1(0x427)][_0x39d2e1(0xad)](0x0,0x0,this[_0x39d2e1(0x427)][_0x39d2e1(0x592)],this[_0x39d2e1(0x73f)]):_0x2d69b7[_0x39d2e1(0xad)](0x0,0x0,_0x2d69b7[_0x39d2e1(0x8fa)][_0x39d2e1(0x592)],this[_0x39d2e1(0x8fa)][_0x39d2e1(0x773)]);}}}else{if(this[_0x8fbed3(0x74a)])this[_0x8fbed3(0x60f)]('escape');else{if(_0x3e989f['isCharging']())this[_0x8fbed3(0x60f)]('wait');else{if(_0x3e989f[_0x8fbed3(0x633)]()){if(_0x8fbed3(0x8cd)===_0x8fbed3(0x7b8)){function _0x28e4a5(){const _0x32ef15=_0x8fbed3;return _0x94a372[_0x32ef15(0x25c)][_0x32ef15(0x12a)]['call'](this,_0x460be4);}}else this[_0x8fbed3(0x60f)](_0x8fbed3(0x41b));}else{if(_0x3e989f[_0x8fbed3(0x8be)]()||_0x3e989f['isGuardWaiting']())this['startMotion'](_0x8fbed3(0x6f1));else{if(_0x1bf261===0x1){if('zPEqE'===_0x8fbed3(0x219)){function _0xe166a7(){const _0x2ca673=_0x8fbed3;return this[_0x2ca673(0x773)]*this['mainSpriteScaleY']();}}else this['startMotion'](_0x8fbed3(0x802));}else{if(_0x3e989f[_0x8fbed3(0x27e)]())this['startMotion'](_0x8fbed3(0x3fc));else{if(_0x3e989f[_0x8fbed3(0x349)]())this[_0x8fbed3(0x60f)](_0x8fbed3(0xde));else{if(_0x3e989f[_0x8fbed3(0x12f)]()){if(_0x8fbed3(0x38a)!==_0x8fbed3(0x38a)){function _0x4fb18c(){const _0x11efdb=_0x8fbed3;this[_0x11efdb(0x427)]&&this[_0x11efdb(0x427)][_0x11efdb(0x5cd)](_0x473b4c);}}else this[_0x8fbed3(0x60f)](_0x8fbed3(0x7f3));}else{if('qjXFr'!==_0x8fbed3(0x5c7)){function _0x1dcbcf(){const _0x2b8856=_0x8fbed3;if(_0x1e4efa[_0x2b8856(0x4bb)][_0x2b8856(0x7db)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x3c8b6f=_0x4b93d4(_0x270ef4['$1'])[_0x2b8856(0x8c0)]()[_0x2b8856(0x3af)]();if(_0x3c8b6f===_0x2b8856(0x5f5))return _0x2b8856(0x5f5);if(_0x3698de[_0x2b8856(0x1ba)][_0x3c8b6f])return _0x3c8b6f;}const _0x3b8b8c=_0x56b3bf[_0x2b8856(0x25c)]['Settings'][_0x2b8856(0x4b3)][_0x2b8856(0x983)][_0x2b8856(0x8c0)]()[_0x2b8856(0x3af)]();if(_0x1c5bcd[_0x2b8856(0x1ba)][_0x3b8b8c])return _0x3b8b8c;return _0x2b8856(0x5f5);}}else this['startMotion'](_0x8fbed3(0xde));}}}}}}}}}}}}},Sprite_Actor['prototype']['retreat']=function(){const _0x369543=_0x444eb4,_0x16f19e=0xa,_0x2688ee=0x12c*_0x16f19e,_0x65ba41=0x1e*_0x16f19e;this[_0x369543(0x677)](_0x2688ee,0x0,_0x65ba41);},Sprite_Actor[_0x444eb4(0x268)]['onMoveEnd']=function(){const _0x450bd1=_0x444eb4;Sprite_Battler['prototype'][_0x450bd1(0x391)][_0x450bd1(0x315)](this);},Sprite_Actor[_0x444eb4(0x268)]['motionSpeed']=function(){const _0x41e468=_0x444eb4;return Sprite_Battler[_0x41e468(0x2cd)];},Sprite_Weapon[_0x444eb4(0x268)][_0x444eb4(0x7af)]=function(){const _0x578874=_0x444eb4;return Sprite_Battler[_0x578874(0x2cd)];},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x92f)]=function(){},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x7ab)]=function(){},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x699)]=function(){const _0x191359=_0x444eb4;if(this['_motion']&&++this[_0x191359(0x15a)]>=this['motionSpeed']()){if(this[_0x191359(0x51d)][_0x191359(0x410)]){if(_0x191359(0x407)==='yzjkR')this[_0x191359(0x5e2)]=(this[_0x191359(0x5e2)]+0x1)%0x4;else{function _0x321c26(){const _0x198a4c=_0x191359;return;this['_effectsContainer']&&(this[_0x198a4c(0x485)]['x']=this['x'],this['_effectsContainer']['y']=this['y']),this[_0x198a4c(0x6cb)]&&(this[_0x198a4c(0x6cb)]['x']=this['x'],this[_0x198a4c(0x6cb)]['y']=this['y']);}}}else this['_pattern']<0x2?this[_0x191359(0x5e2)]++:this['refreshMotion']();this[_0x191359(0x15a)]=0x0;}},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x74f)]=function(_0x4e3850){const _0x5ae08a=_0x444eb4;if(_0x4e3850==='victory')this[_0x5ae08a(0xf0)]=!![];if(this[_0x5ae08a(0x701)]&&this[_0x5ae08a(0x701)][_0x5ae08a(0xc9)]()){this['_motion']=Sprite_Actor[_0x5ae08a(0x4dd)][_0x5ae08a(0x4f9)];return;}const _0x21e763=Sprite_Actor[_0x5ae08a(0x4dd)][_0x4e3850];this[_0x5ae08a(0x51d)]=_0x21e763,this[_0x5ae08a(0x15a)]=0x0,this['_pattern']=0x0;},Sprite_Actor[_0x444eb4(0x268)][_0x444eb4(0x6b5)]=function(_0x3b0dbe){const _0x3e951a=_0x444eb4;this['adjustWeaponSpriteOffset'](),this[_0x3e951a(0x443)]['setup'](_0x3b0dbe),this[_0x3e951a(0x50c)][_0x3e951a(0x1a9)]();},Sprite_Actor[_0x444eb4(0x268)]['adjustWeaponSpriteOffset']=function(){const _0x514e87=_0x444eb4;let _0x43bc26=-0x10,_0x5eec5e=this[_0x514e87(0x773)]*0.5;const _0x48a78c=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x1cacb3=this['_battler']['traitObjects']()['map'](_0x2902c6=>_0x2902c6&&_0x2902c6['note'][_0x514e87(0x7db)](_0x48a78c)?Number(RegExp['$1']):0x0),_0xc5ac2a=this[_0x514e87(0x701)][_0x514e87(0x1e5)]()[_0x514e87(0x99d)](_0x4c66fe=>_0x4c66fe&&_0x4c66fe['note'][_0x514e87(0x7db)](_0x48a78c)?Number(RegExp['$2']):0x0);_0x43bc26=_0x1cacb3[_0x514e87(0x254)]((_0x170cde,_0x1e2aa7)=>_0x170cde+_0x1e2aa7,_0x43bc26),_0x5eec5e=_0xc5ac2a[_0x514e87(0x254)]((_0x57b5f0,_0x5dab18)=>_0x57b5f0+_0x5dab18,_0x5eec5e),this[_0x514e87(0x443)]['x']=_0x43bc26,this['_weaponSprite']['y']=_0x5eec5e,this[_0x514e87(0x443)]['update']();},Sprite_Weapon[_0x444eb4(0x268)]['setup']=function(_0x5d0c31){const _0x349397=_0x444eb4;this[_0x349397(0x566)]=_0x5d0c31,this['_animationCount']=-0x1,this[_0x349397(0x5e2)]=0x0,this['loadBitmap'](),this[_0x349397(0x339)]();},Sprite_Actor['prototype'][_0x444eb4(0x1f2)]=function(){},Sprite_Actor['prototype'][_0x444eb4(0x286)]=function(){const _0x4ed971=_0x444eb4,_0x5b787d=VisuMZ[_0x4ed971(0x25c)][_0x4ed971(0x90c)][_0x4ed971(0x4d4)],_0x5f37b5=_0x5b787d[_0x4ed971(0x584)],_0x5b4cea=_0x5b787d['StepDistanceY'],_0x3f94a7=_0x5b787d[_0x4ed971(0x6b7)];this[_0x4ed971(0x677)](-_0x5f37b5,-_0x5b4cea,_0x3f94a7);},VisuMZ['BattleCore']['Sprite_Actor_updateFrame']=Sprite_Actor['prototype'][_0x444eb4(0x339)],Sprite_Actor['prototype']['updateFrame']=function(){const _0x137c58=_0x444eb4;this[_0x137c58(0x57f)](),VisuMZ[_0x137c58(0x25c)]['Sprite_Actor_updateFrame']['call'](this);},Sprite_Actor['prototype']['applyFreezeMotionFrames']=function(){const _0xc22465=_0x444eb4;if(this[_0xc22465(0x701)]&&this[_0xc22465(0x701)]['_freezeMotionData']){if(_0xc22465(0x601)!==_0xc22465(0x601)){function _0x590bbc(){const _0x585b0b=_0xc22465;this['_weaponImageId']=_0x1a547e,this[_0x585b0b(0x8d2)]=-_0x12c4a3,this[_0x585b0b(0x5e2)]=_0x294f2b,this['loadBitmap'](),this['updateFrame']();}}else{const _0x3bd0a2=this[_0xc22465(0x701)]['_freezeMotionData'];this[_0xc22465(0x51d)]=Sprite_Actor[_0xc22465(0x4dd)][_0x3bd0a2[_0xc22465(0x543)]],this[_0xc22465(0x5e2)]=_0x3bd0a2[_0xc22465(0x613)];const _0x4108a5=this[_0xc22465(0x443)];_0x4108a5[_0xc22465(0x1fc)](_0x3bd0a2[_0xc22465(0x21b)],_0x3bd0a2[_0xc22465(0x613)]),this[_0xc22465(0x8aa)]();}}},Sprite_Weapon['prototype'][_0x444eb4(0x1fc)]=function(_0x3d3946,_0x160d0e){const _0x23225d=_0x444eb4;this['_weaponImageId']=_0x3d3946,this['_animationCount']=-Infinity,this[_0x23225d(0x5e2)]=_0x160d0e,this[_0x23225d(0x293)](),this['updateFrame']();},Sprite_Enemy['prototype'][_0x444eb4(0x61f)]=function(){const _0xf5bd71=_0x444eb4;Sprite_Battler[_0xf5bd71(0x268)][_0xf5bd71(0x61f)][_0xf5bd71(0x315)](this),this[_0xf5bd71(0x265)]=null,this[_0xf5bd71(0x5c1)]=![],this[_0xf5bd71(0x11b)]='',this[_0xf5bd71(0x5bb)]=0x0,this[_0xf5bd71(0x398)]=null,this[_0xf5bd71(0x73f)]=0x0,this['_shake']=0x0,this['createMainSprite'](),this[_0xf5bd71(0x853)]();},VisuMZ['BattleCore'][_0x444eb4(0x6ba)]=Sprite_Enemy['prototype']['update'],Sprite_Enemy[_0x444eb4(0x268)]['update']=function(){const _0xf360c9=_0x444eb4;VisuMZ['BattleCore']['Sprite_Enemy_update'][_0xf360c9(0x315)](this),this[_0xf360c9(0x544)]();},Sprite_Enemy['prototype'][_0x444eb4(0x33a)]=function(){const _0x4e0351=_0x444eb4;this[_0x4e0351(0x427)]=new Sprite(),this[_0x4e0351(0x427)][_0x4e0351(0x72a)]['x']=0.5,this[_0x4e0351(0x427)][_0x4e0351(0x72a)]['y']=0x1,this[_0x4e0351(0x86a)](this[_0x4e0351(0x427)]),this[_0x4e0351(0x7d5)]();},Sprite_Enemy['prototype']['mainSprite']=function(){const _0x2d53d7=_0x444eb4;return this['_distortionSprite']||this[_0x2d53d7(0x427)]||this;},Sprite_Enemy['prototype'][_0x444eb4(0x293)]=function(_0x24aacb){const _0x5e26e6=_0x444eb4;this['bitmap']=new Bitmap(0x1,0x1);if($gameSystem[_0x5e26e6(0x73c)]()){if('HuIfF'!=='HuIfF'){function _0x53ca44(){const _0x4aab9d=_0x5e26e6,_0x4aae28=this[_0x4aab9d(0x129)];_0x4aae28[_0x4aab9d(0x45e)](_0x110827,0x0,_0x15e91a['y'],_0x4aae28[_0x4aab9d(0x5e5)],_0x4aab9d(0x373));}}else this[_0x5e26e6(0x427)][_0x5e26e6(0x8fa)]=ImageManager[_0x5e26e6(0x83e)](_0x24aacb);}else this[_0x5e26e6(0x427)]['bitmap']=ImageManager[_0x5e26e6(0x20f)](_0x24aacb);this['_mainSprite']['bitmap'][_0x5e26e6(0x80a)](this[_0x5e26e6(0x64e)][_0x5e26e6(0x896)](this));},Sprite_Enemy[_0x444eb4(0x268)]['createEmptyBitmap']=function(){const _0xd1c321=_0x444eb4,_0x92542c=this[_0xd1c321(0x427)]['bitmap'];_0x92542c&&(this[_0xd1c321(0x8fa)]=new Bitmap(_0x92542c[_0xd1c321(0x592)],_0x92542c[_0xd1c321(0x773)]));},VisuMZ['BattleCore'][_0x444eb4(0x5c6)]=Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x5cd)],Sprite_Enemy['prototype'][_0x444eb4(0x5cd)]=function(_0xe71b2c){const _0x72dc72=_0x444eb4;if(this['_mainSprite']){if(_0x72dc72(0x4a2)!==_0x72dc72(0x4a2)){function _0x5e7e46(){const _0x25bbe7=_0x72dc72;for(const _0x1e89af of _0x4a1011){_0x1e89af[_0x25bbe7(0x7db)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x5d22b9=_0x49ebe3(_0x2c339a['$1']),_0x2b27e9=_0x19b22e(_0x5e9bd1['$2']),_0x39b2ef=_0x2b27e9===0x1?this[_0x25bbe7(0x59d)]:this[_0x25bbe7(0x585)],_0x510481=_0x794767(_0x3d65b0['$3']);_0x39b2ef[_0x5d22b9]=_0x510481;}}}else this[_0x72dc72(0x427)]['setHue'](_0xe71b2c);}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x5d4)]=Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x765)],Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x765)]=function(){const _0x2be51f=_0x444eb4;if(this[_0x2be51f(0x59e)]())VisuMZ['BattleCore'][_0x2be51f(0x5d4)][_0x2be51f(0x315)](this);else{if('ygyMY'!=='ygyMY'){function _0x5bbaaf(){_0x28efd8=(_0x5d84e3+_0x1fa607)/0x2,_0x16805b=-0x1;}}else this[_0x2be51f(0x5c1)]=!this[_0x2be51f(0x265)][_0x2be51f(0x68b)](),!this['_appeared']&&(this['opacity']=0x0);}},VisuMZ[_0x444eb4(0x25c)]['Sprite_Enemy_updateCollapse']=Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x2dc)],Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x2dc)]=function(){const _0x4822fc=_0x444eb4;if(this['allowCollapse']())VisuMZ[_0x4822fc(0x25c)][_0x4822fc(0xbf)][_0x4822fc(0x315)](this);},Sprite_Enemy[_0x444eb4(0x268)]['updateFrame']=function(){const _0x407859=_0x444eb4;Sprite_Battler[_0x407859(0x268)][_0x407859(0x339)][_0x407859(0x315)](this);const _0x575d36=this['mainSprite']()||this;if(!_0x575d36)return;!_0x575d36['bitmap']&&(_0x575d36[_0x407859(0x8fa)]=new Bitmap(this['width'],this['height']));if(this['_effectType']==='bossCollapse'){if(_0x407859(0x1a0)==='rSIvc')this['_mainSprite'][_0x407859(0xad)](0x0,0x0,this[_0x407859(0x427)][_0x407859(0x592)],this[_0x407859(0x73f)]);else{function _0x5a5b49(){const _0x522981=_0x407859;this[_0x522981(0x59b)]=![];}}}else{if(_0x407859(0x2e0)!==_0x407859(0x596))_0x575d36[_0x407859(0xad)](0x0,0x0,_0x575d36[_0x407859(0x8fa)]['width'],this['bitmap']['height']);else{function _0x5ac5fd(){const _0x4d3147=_0x407859,_0x5cfe6b=_0x5a9c50(_0x1c1d58['$1']);_0x5cfe6b!==_0x36f8fa[_0x2b4173][_0x4d3147(0xc3)]&&(_0x225444(_0x4d3147(0x991)[_0x4d3147(0x4e2)](_0x4ccf1a,_0x5cfe6b)),_0x301b01['exit']());}}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x490)]=Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x83c)],Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x83c)]=function(){const _0x58ac12=_0x444eb4;if(this['allowCollapse']())VisuMZ[_0x58ac12(0x25c)][_0x58ac12(0x490)]['call'](this);},Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x39d)]=function(){const _0x20b481=_0x444eb4;return Sprite_Battler['prototype'][_0x20b481(0x39d)][_0x20b481(0x315)](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x691)]=Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0xbb)],Sprite_Enemy[_0x444eb4(0x268)]['updateStateSprite']=function(){const _0x1efc67=_0x444eb4;VisuMZ[_0x1efc67(0x25c)][_0x1efc67(0x691)][_0x1efc67(0x315)](this),this[_0x1efc67(0x2df)]();},Sprite_Enemy[_0x444eb4(0x268)]['updateStateSpriteBattleCore']=function(){const _0x410395=_0x444eb4;this[_0x410395(0x68d)]['x']=0x0,this[_0x410395(0x68d)]['x']+=this['_battler'][_0x410395(0x24a)](),this[_0x410395(0x68d)]['y']=-this['bitmap']['height']-this[_0x410395(0x68d)][_0x410395(0x773)],this[_0x410395(0x68d)]['y']+=this[_0x410395(0x701)]['battleUIOffsetY'](),this[_0x410395(0x68d)][_0x410395(0x731)]['x']=0x1/(this[_0x410395(0x731)]['x']||0.001),this[_0x410395(0x68d)][_0x410395(0x731)]['y']=0x1/(this[_0x410395(0x731)]['y']||0.001);if(this[_0x410395(0x19f)]()){if(_0x410395(0x530)!==_0x410395(0x824))this[_0x410395(0x36b)][_0x410395(0x522)][_0x410395(0x731)]['x']=-0x1/(this[_0x410395(0x731)]['x']||0.001),this[_0x410395(0x36b)][_0x410395(0x522)][_0x410395(0x731)]['y']=0x1/(this[_0x410395(0x731)]['y']||0.001);else{function _0x8aa342(){const _0x151ae7=_0x410395,_0x119481=_0x1e7852[_0x151ae7(0xbd)]('['+_0x445aff['$1'][_0x151ae7(0x7db)](/\d+/g)+']');for(const _0x2f693f of _0x119481){if(!_0x2311ec[_0x151ae7(0x573)](_0x2f693f))return![];}return!![];}}}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0xcd)]=Sprite_Enemy[_0x444eb4(0x268)]['setBattler'],Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x47c)]=function(_0xf5eed){const _0x2f0c58=_0x444eb4;VisuMZ[_0x2f0c58(0x25c)][_0x2f0c58(0xcd)][_0x2f0c58(0x315)](this,_0xf5eed),this[_0x2f0c58(0x36f)](_0xf5eed);},Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x36f)]=function(_0xe30f30){const _0x11c608=_0x444eb4;if(!this['_svBattlerSprite']){if(_0x11c608(0x5cb)===_0x11c608(0x70c)){function _0x58b976(){_0x3e7c85=(_0x5db7c5+_0x20cdda)/0x2;}}else this[_0x11c608(0x36b)]=new Sprite_SvEnemy(_0xe30f30),this[_0x11c608(0x7d5)]();}this[_0x11c608(0x36b)][_0x11c608(0x47c)](_0xe30f30);},Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x19f)]=function(){const _0x1189b5=_0x444eb4;return this[_0x1189b5(0x265)]&&this[_0x1189b5(0x265)]['hasSvBattler']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x658)]=Sprite_Enemy[_0x444eb4(0x268)]['loadBitmap'],Sprite_Enemy['prototype'][_0x444eb4(0x293)]=function(_0x2a9276){const _0x3b2fd1=_0x444eb4;if(this[_0x3b2fd1(0x19f)]()){const _0x1139bf=this[_0x3b2fd1(0x265)][_0x3b2fd1(0x91e)]();this[_0x3b2fd1(0x8fa)]=new Bitmap(_0x1139bf['width'],_0x1139bf[_0x3b2fd1(0x773)]);}else{if(_0x3b2fd1(0x353)==='ajOVC')VisuMZ[_0x3b2fd1(0x25c)][_0x3b2fd1(0x658)][_0x3b2fd1(0x315)](this,_0x2a9276);else{function _0x51e8dc(){const _0x1e0890=_0x3b2fd1;this[_0x1e0890(0x48a)]=_0x1e0890(0x27c);}}}},Sprite_Enemy['prototype'][_0x444eb4(0x59e)]=function(){const _0x49004f=_0x444eb4;return this['hasSvBattler']()?this[_0x49004f(0x265)]['allowCollapse']():!![];},Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x3a5)]=function(){const _0x1a1736=_0x444eb4;if(this[_0x1a1736(0x19f)]())this['_svBattlerSprite'][_0x1a1736(0x3a5)]();},Sprite_Enemy['prototype'][_0x444eb4(0x74f)]=function(_0xf65574){const _0x30e52d=_0x444eb4;if(this[_0x30e52d(0x19f)]())this[_0x30e52d(0x36b)]['forceMotion'](_0xf65574);},Sprite_Enemy[_0x444eb4(0x268)][_0x444eb4(0x6b5)]=function(_0x57a0c7){const _0x3f5dae=_0x444eb4;if(this[_0x3f5dae(0x19f)]())this[_0x3f5dae(0x36b)][_0x3f5dae(0x6b5)](_0x57a0c7);},Sprite_Enemy['prototype'][_0x444eb4(0x286)]=function(){const _0x2fcbb1=_0x444eb4,_0x2467e2=VisuMZ[_0x2fcbb1(0x25c)][_0x2fcbb1(0x90c)]['ActionSequence'],_0x2dd488=_0x2467e2[_0x2fcbb1(0x584)],_0x433136=_0x2467e2['StepDistanceY'],_0x504ad2=_0x2467e2[_0x2fcbb1(0x6b7)];this[_0x2fcbb1(0x677)](_0x2dd488,_0x433136,_0x504ad2);};function Sprite_SvEnemy(){const _0x47aa4a=_0x444eb4;this[_0x47aa4a(0x3c7)](...arguments);}Sprite_SvEnemy[_0x444eb4(0x268)]=Object[_0x444eb4(0x868)](Sprite_Actor[_0x444eb4(0x268)]),Sprite_SvEnemy[_0x444eb4(0x268)]['constructor']=Sprite_SvEnemy,Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x3c7)]=function(_0x47d662){const _0x510c22=_0x444eb4;Sprite_Actor[_0x510c22(0x268)][_0x510c22(0x3c7)][_0x510c22(0x315)](this,_0x47d662),this['scale']['x']=-0x1,this['_stateSprite'][_0x510c22(0x731)]['x']=-0x1;},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x27f)]=function(){},Sprite_SvEnemy['prototype'][_0x444eb4(0xe8)]=function(){},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x6d3)]=function(_0x171cc8){},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x546)]=function(){},Sprite_SvEnemy[_0x444eb4(0x268)]['updateShadowPosition']=function(){},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0xbb)]=function(){const _0x56f210=_0x444eb4;this[_0x56f210(0x522)]['visible']=![];},Sprite_SvEnemy[_0x444eb4(0x268)]['updateBitmap']=function(){const _0x470a98=_0x444eb4;Sprite_Battler['prototype']['updateBitmap'][_0x470a98(0x315)](this);const _0x4729a3=this[_0x470a98(0x50c)][_0x470a98(0x1ac)]();if(this[_0x470a98(0x11b)]!==_0x4729a3){if(_0x470a98(0x6d0)===_0x470a98(0x43a)){function _0x4df66c(){const _0x596713=_0x470a98;_0x3cac7d[_0x596713(0x25c)][_0x596713(0x256)][_0x596713(0x315)](this,_0x424048),_0x2b123a['BattleCore'][_0x596713(0x8f8)](_0x2d8bd2);}}else this[_0x470a98(0x11b)]=_0x4729a3,this['_mainSprite'][_0x470a98(0x8fa)]=ImageManager['loadSvActor'](_0x4729a3);}this[_0x470a98(0x427)]&&this['_mainSprite'][_0x470a98(0x8fa)]&&this[_0x470a98(0x701)]&&(this[_0x470a98(0x427)][_0x470a98(0x8fa)][_0x470a98(0x49b)]!==this[_0x470a98(0x701)]['battlerSmoothImage']()&&(this[_0x470a98(0x427)][_0x470a98(0x8fa)][_0x470a98(0x49b)]=this[_0x470a98(0x701)][_0x470a98(0x44b)]()));},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x996)]=function(){},Sprite_SvEnemy['prototype']['startMove']=function(_0x481052,_0x2d8eac,_0x4cf981){const _0x1984d5=_0x444eb4;if(this[_0x1984d5(0x921)])this[_0x1984d5(0x921)][_0x1984d5(0x677)](_0x481052,_0x2d8eac,_0x4cf981);},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x3a5)]=function(){const _0x5e6d83=_0x444eb4,_0x342db0=this['_actor'];if(_0x342db0){if('jUEfZ'===_0x5e6d83(0x4b2)){function _0x4c0228(){const _0x102c86=_0x5e6d83;return _0x3673c5[_0x102c86(0x25c)]['Game_Interpreter_command301']['call'](this,_0x161006);}}else{const _0x273d7a=_0x342db0[_0x5e6d83(0x907)]();if(_0x342db0['isInputting']()||_0x342db0[_0x5e6d83(0x3b0)]())this[_0x5e6d83(0x60f)](_0x5e6d83(0xde));else{if(_0x273d7a===0x3)this[_0x5e6d83(0x60f)](_0x5e6d83(0x4f9));else{if(_0x273d7a===0x2){if(_0x5e6d83(0x83b)!==_0x5e6d83(0x83b)){function _0xf712d0(){const _0x57854c=_0x5e6d83;this[_0x57854c(0x6cb)]=new _0x4f9309(),this[_0x57854c(0x86a)](this['_damageContainer']);}}else this[_0x5e6d83(0x60f)](_0x5e6d83(0x249));}else{if(_0x342db0[_0x5e6d83(0x633)]())this[_0x5e6d83(0x60f)](_0x5e6d83(0x41b));else{if(_0x342db0['isGuard']()||_0x342db0[_0x5e6d83(0x2fd)]())this[_0x5e6d83(0x60f)]('guard');else{if(_0x273d7a===0x1)this['startMotion']('abnormal');else{if(_0x342db0[_0x5e6d83(0x27e)]()){if('zoNFH'==='bolDj'){function _0x3de8cd(){const _0x158fa2=_0x5e6d83;if(!_0x322eeb[_0x158fa2(0x73c)]())return;const _0x132f2e=this[_0x158fa2(0x7f2)]();if(!_0x132f2e)return;if(_0x3bd574)this[_0x158fa2(0x3db)](_0x2c98f6+_0x132f2e[_0x158fa2(0x7f8)],_0x4d01cb+_0x132f2e[_0x158fa2(0x29f)],![]);_0x4f0a0c+=_0x132f2e[_0x158fa2(0x7f8)]-_0x132f2e['_homeX'],_0x45b5c1+=_0x132f2e['_baseY']-_0x132f2e[_0x158fa2(0x383)],_0x132f2e[_0x158fa2(0x677)](_0x385abd,_0x4c3832,_0x1e94ff);if(_0x2f097e[_0x158fa2(0x305)])_0x132f2e[_0x158fa2(0x645)](_0x48581f||_0x158fa2(0x5b6));}}else this[_0x5e6d83(0x60f)]('dying');}else{if(_0x342db0['isUndecided']()){if(_0x5e6d83(0x545)===_0x5e6d83(0x255)){function _0x1ffee6(){return 0x0;}}else this[_0x5e6d83(0x60f)](_0x5e6d83(0xde));}else this[_0x5e6d83(0x60f)](_0x342db0[_0x5e6d83(0x91e)]()[_0x5e6d83(0xeb)]||_0x5e6d83(0xde));}}}}}}}}}},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x481)]=function(){const _0x268fa4=_0x444eb4;return this['parent']?this[_0x268fa4(0x921)]['_offsetX']===0x0&&this['parent'][_0x268fa4(0x14e)]===0x0:!![];},Sprite_SvEnemy[_0x444eb4(0x268)][_0x444eb4(0x7ca)]=function(){},Sprite_Damage[_0x444eb4(0x268)][_0x444eb4(0x31a)]=function(_0x3ba612){const _0x1ac708=_0x444eb4,_0x599043=_0x3ba612[_0x1ac708(0x88f)]()||_0x3ba612[_0x1ac708(0x98c)]();if(_0x599043[_0x1ac708(0x6c6)]||_0x599043[_0x1ac708(0x7d3)])this[_0x1ac708(0x3a4)]=0x0,this[_0x1ac708(0x31e)]();else{if(_0x599043[_0x1ac708(0x24e)])this['_colorType']=_0x599043[_0x1ac708(0x775)]>=0x0?0x0:0x1,this[_0x1ac708(0x1c8)](_0x599043[_0x1ac708(0x775)]);else _0x3ba612[_0x1ac708(0x734)]()&&_0x599043[_0x1ac708(0x81e)]!==0x0&&(this[_0x1ac708(0x3a4)]=_0x599043[_0x1ac708(0x81e)]>=0x0?0x2:0x3,this[_0x1ac708(0x1c8)](_0x599043[_0x1ac708(0x81e)]));}if(_0x599043[_0x1ac708(0x915)]){if(_0x1ac708(0x51f)===_0x1ac708(0x2c6)){function _0x14ddea(){const _0x22406c=_0x1ac708;return _0xbb8623[_0x22406c(0x34b)](_0x7b4805=>_0x7b4805[_0x22406c(0x734)]()&&_0x7b4805!==_0x1d6b38);}}else this[_0x1ac708(0x502)]();}},Sprite_Damage[_0x444eb4(0x268)]['setup']=function(_0x3ff5e6){},Sprite_Damage[_0x444eb4(0x268)][_0x444eb4(0x1c8)]=function(_0x2dc5fe){const _0x571074=_0x444eb4;let _0x132f21=this[_0x571074(0x7a0)](_0x2dc5fe);const _0x119fc9=this[_0x571074(0x2f2)](),_0x53e751=Math['floor'](_0x119fc9*0.75);for(let _0x1e4b32=0x0;_0x1e4b32<_0x132f21[_0x571074(0x34a)];_0x1e4b32++){if(_0x571074(0x559)!=='TqTDn'){const _0x128fa5=this['createChildSprite'](_0x53e751,_0x119fc9);_0x128fa5[_0x571074(0x8fa)][_0x571074(0x45e)](_0x132f21[_0x1e4b32],0x0,0x0,_0x53e751,_0x119fc9,_0x571074(0x373)),_0x128fa5['x']=(_0x1e4b32-(_0x132f21[_0x571074(0x34a)]-0x1)/0x2)*_0x53e751,_0x128fa5['dy']=-_0x1e4b32;}else{function _0x1b920c(){const _0x296038=_0x571074;if(!_0x286726[_0x296038(0x11f)]())return![];if(!_0x57d1bd)return![];if(!_0x24fc02[_0x296038(0x712)]())return![];if(_0x64dcb4[_0x296038(0x712)]()[_0x296038(0x4bb)][_0x296038(0x7db)](/<CUSTOM ACTION SEQUENCE>/i))return!![];return![];}}}},Sprite_Damage[_0x444eb4(0x268)]['createString']=function(_0x4f9574){const _0xdb8be8=_0x444eb4;let _0x7c320f=Math[_0xdb8be8(0x7fa)](_0x4f9574)[_0xdb8be8(0x847)]();this[_0xdb8be8(0x161)]()&&(_0x7c320f=VisuMZ[_0xdb8be8(0x50d)](_0x7c320f));const _0x1499d8=VisuMZ[_0xdb8be8(0x25c)][_0xdb8be8(0x90c)][_0xdb8be8(0x4b3)];let _0x4ae109='',_0x3919cd='';switch(this[_0xdb8be8(0x3a4)]){case 0x0:_0x4ae109=_0x1499d8[_0xdb8be8(0x8bd)]||'-%1',_0x3919cd=TextManager['hp'];if(_0x4f9574===0x0)_0x4ae109='%1';break;case 0x1:_0x4ae109=_0x1499d8[_0xdb8be8(0x248)]||'+%1',_0x3919cd=TextManager['hp'];break;case 0x2:_0x4ae109=_0x1499d8[_0xdb8be8(0x954)]||_0xdb8be8(0x5d1),_0x3919cd=TextManager['mp'];break;case 0x3:_0x4ae109=_0x1499d8[_0xdb8be8(0x1d7)]||_0xdb8be8(0x5a7),_0x3919cd=TextManager['mp'];break;}return _0x4ae109[_0xdb8be8(0x4e2)](_0x7c320f,_0x3919cd)[_0xdb8be8(0x3af)]();},Sprite_Damage[_0x444eb4(0x268)][_0x444eb4(0x161)]=function(){const _0xfde07f=_0x444eb4;if(Imported[_0xfde07f(0x305)]){if(_0xfde07f(0x71e)!==_0xfde07f(0x71e)){function _0x10111f(){const _0x4fe443=_0xfde07f;return _0xed55ec[_0x4fe443(0x25c)]['Game_Action_makeTargets'][_0x4fe443(0x315)](this);}}else return VisuMZ[_0xfde07f(0x6bc)][_0xfde07f(0x90c)][_0xfde07f(0x58e)]['DigitGroupingDamageSprites'];}else{if(_0xfde07f(0x880)===_0xfde07f(0x880))return![];else{function _0x580b99(){const _0x333107=_0xfde07f;return _0x1fc0ba[_0x333107(0x268)][_0x333107(0x394)][_0x333107(0x315)](this);}}}},Sprite_Damage[_0x444eb4(0x268)][_0x444eb4(0x502)]=function(){const _0x216e3a=_0x444eb4,_0x5333ee=VisuMZ[_0x216e3a(0x25c)][_0x216e3a(0x90c)][_0x216e3a(0x4b3)];this[_0x216e3a(0x680)]=_0x5333ee[_0x216e3a(0x64b)]['slice'](0x0),this['_flashDuration']=_0x5333ee['CriticalDuration'];},Sprite_Damage[_0x444eb4(0x268)][_0x444eb4(0x472)]=function(_0x3096d7,_0x5e9619){const _0x22754b=_0x444eb4;this[_0x22754b(0x680)]=_0x5e9619[_0x22754b(0x4d5)]||[0x0,0x0,0x0,0x0],this[_0x22754b(0x680)]=JsonEx[_0x22754b(0x1f1)](this['_flashColor']),this[_0x22754b(0x4ff)]=_0x5e9619[_0x22754b(0x2ce)]||0x0;const _0x247253=this[_0x22754b(0x2f2)](),_0x507d42=Math[_0x22754b(0x10b)](_0x247253*0x1e),_0x17a00c=this[_0x22754b(0x859)](_0x507d42,_0x247253);_0x17a00c[_0x22754b(0x8fa)]['textColor']=ColorManager['getColor'](_0x5e9619[_0x22754b(0x888)]),_0x17a00c['bitmap'][_0x22754b(0x45e)](_0x3096d7,0x0,0x0,_0x507d42,_0x247253,_0x22754b(0x373)),_0x17a00c['dy']=0x0;},Sprite_Damage[_0x444eb4(0x268)][_0x444eb4(0x6d6)]=function(_0x5b03ff,_0x1bdda6,_0x3df0b1){const _0x33bad6=_0x444eb4,_0x3fd94f=Math[_0x33bad6(0x960)](this[_0x33bad6(0x2f2)](),ImageManager[_0x33bad6(0x929)]),_0xd3288c=Math['floor'](_0x3fd94f*0x1e),_0xa923f=this[_0x33bad6(0x859)](_0xd3288c,_0x3fd94f),_0x449d82=ImageManager['iconWidth']/0x2,_0x4fe1bd=_0xa923f['bitmap']['measureTextWidth'](_0x1bdda6+'\x20');_0xa923f['bitmap'][_0x33bad6(0x888)]=ColorManager[_0x33bad6(0x95f)](_0x3df0b1[_0x33bad6(0x888)]),_0xa923f[_0x33bad6(0x8fa)][_0x33bad6(0x45e)](_0x1bdda6,_0x449d82,0x0,_0xd3288c-_0x449d82,_0x3fd94f,'center');const _0x4494c3=Math['round']((_0x3fd94f-ImageManager[_0x33bad6(0x929)])/0x2),_0x23c908=_0xd3288c/0x2-ImageManager[_0x33bad6(0x92a)]-_0x4fe1bd/0x2+_0x449d82/0x2,_0x496f32=ImageManager[_0x33bad6(0x986)]('IconSet'),_0x219f62=ImageManager[_0x33bad6(0x92a)],_0x28aa1b=ImageManager[_0x33bad6(0x929)],_0x5c4617=_0x5b03ff%0x10*_0x219f62,_0x40f670=Math[_0x33bad6(0x10b)](_0x5b03ff/0x10)*_0x28aa1b;_0xa923f[_0x33bad6(0x8fa)][_0x33bad6(0x7b0)](_0x496f32,_0x5c4617,_0x40f670,_0x219f62,_0x28aa1b,_0x23c908,_0x4494c3),this[_0x33bad6(0x680)]=_0x3df0b1[_0x33bad6(0x4d5)]||[0x0,0x0,0x0,0x0],this[_0x33bad6(0x680)]=JsonEx[_0x33bad6(0x1f1)](this['_flashColor']),this[_0x33bad6(0x4ff)]=_0x3df0b1[_0x33bad6(0x2ce)]||0x0,_0xa923f['dy']=0x0;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x8ff)]=Sprite_StateIcon[_0x444eb4(0x268)][_0x444eb4(0x339)],Sprite_StateIcon[_0x444eb4(0x268)][_0x444eb4(0x339)]=function(){const _0xa514bd=_0x444eb4;VisuMZ['BattleCore'][_0xa514bd(0x8ff)]['call'](this),this['visible']=this[_0xa514bd(0x828)]>0x0?!![]:![];},VisuMZ[_0x444eb4(0x25c)]['Sprite_Weapon_loadBitmap']=Sprite_Weapon[_0x444eb4(0x268)][_0x444eb4(0x293)],Sprite_Weapon[_0x444eb4(0x268)][_0x444eb4(0x293)]=function(){const _0x5380cd=_0x444eb4;VisuMZ['BattleCore'][_0x5380cd(0x62f)][_0x5380cd(0x315)](this),this['bitmap']&&(this[_0x5380cd(0x8fa)][_0x5380cd(0x49b)]=VisuMZ[_0x5380cd(0x25c)][_0x5380cd(0x90c)]['Actor'][_0x5380cd(0x5c8)]);};function Sprite_HpGauge(){this['initialize'](...arguments);}Sprite_HpGauge[_0x444eb4(0x268)]=Object[_0x444eb4(0x868)](Sprite_Gauge[_0x444eb4(0x268)]),Sprite_HpGauge['prototype'][_0x444eb4(0x266)]=Sprite_HpGauge,Sprite_HpGauge[_0x444eb4(0x268)][_0x444eb4(0x3c7)]=function(){const _0x745623=_0x444eb4;Sprite_Gauge[_0x745623(0x268)]['initialize'][_0x745623(0x315)](this);},Sprite_HpGauge[_0x444eb4(0x268)][_0x444eb4(0x737)]=function(){return 0x0;},Sprite_HpGauge[_0x444eb4(0x268)]['redraw']=function(){const _0x2bb8c1=_0x444eb4;this[_0x2bb8c1(0x8fa)][_0x2bb8c1(0x7f0)]();const _0x4bc243=this[_0x2bb8c1(0x169)]();!isNaN(_0x4bc243)&&this['drawGauge']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x3b7)]=Sprite_Battleback['prototype'][_0x444eb4(0x533)],Sprite_Battleback[_0x444eb4(0x268)][_0x444eb4(0x533)]=function(){const _0x48310f=_0x444eb4,_0x4e656b=VisuMZ[_0x48310f(0x25c)]['Settings'][_0x48310f(0x54a)];if(!_0x4e656b)return VisuMZ['BattleCore'][_0x48310f(0x3b7)][_0x48310f(0x315)](this);const _0x3276ac=String(_0x4e656b[_0x48310f(0x2a7)])||'MZ';switch(_0x3276ac){case'MZ':VisuMZ[_0x48310f(0x25c)]['Sprite_Battleback_adjustPosition'][_0x48310f(0x315)](this);break;case'1:1':this['adjustPosition_1for1']();break;case _0x48310f(0x113):this['adjustPosition_ScaleToFit']();break;case'ScaleDown':this[_0x48310f(0x3f6)]();break;case _0x48310f(0x62c):this[_0x48310f(0x2b7)]();break;}},Sprite_Battleback[_0x444eb4(0x268)][_0x444eb4(0x338)]=function(){const _0x1b977d=_0x444eb4;this[_0x1b977d(0x592)]=Graphics[_0x1b977d(0x592)],this[_0x1b977d(0x773)]=Graphics[_0x1b977d(0x773)];const _0x4ddc10=0x1;this[_0x1b977d(0x731)]['x']=_0x4ddc10,this['scale']['y']=_0x4ddc10,this['x']=0x0,this['y']=0x0;},Sprite_Battleback[_0x444eb4(0x268)][_0x444eb4(0x616)]=function(){const _0x447555=_0x444eb4;this[_0x447555(0x592)]=Graphics['width'],this[_0x447555(0x773)]=Graphics[_0x447555(0x773)];const _0x320db4=this['width']/this[_0x447555(0x8fa)][_0x447555(0x592)],_0x578d2c=this['height']/this[_0x447555(0x8fa)][_0x447555(0x773)],_0x1e82c1=Math[_0x447555(0x960)](_0x320db4,_0x578d2c);this[_0x447555(0x731)]['x']=_0x1e82c1,this[_0x447555(0x731)]['y']=_0x1e82c1,this['x']=(Graphics['width']-this[_0x447555(0x592)])/0x2,this['y']=Graphics[_0x447555(0x773)]-this[_0x447555(0x773)];},Sprite_Battleback[_0x444eb4(0x268)][_0x444eb4(0x3f6)]=function(){const _0x38c8ae=_0x444eb4;this['width']=Graphics['width'],this[_0x38c8ae(0x773)]=Graphics['height'];const _0x595248=Math[_0x38c8ae(0x827)](0x1,this[_0x38c8ae(0x592)]/this[_0x38c8ae(0x8fa)][_0x38c8ae(0x592)]),_0x2d578b=Math['min'](0x1,this[_0x38c8ae(0x773)]/this[_0x38c8ae(0x8fa)][_0x38c8ae(0x773)]),_0x8d8ce7=Math[_0x38c8ae(0x960)](_0x595248,_0x2d578b);this[_0x38c8ae(0x731)]['x']=_0x8d8ce7,this[_0x38c8ae(0x731)]['y']=_0x8d8ce7,this['x']=(Graphics[_0x38c8ae(0x592)]-this[_0x38c8ae(0x592)])/0x2,this['y']=Graphics['height']-this[_0x38c8ae(0x773)];},Sprite_Battleback[_0x444eb4(0x268)][_0x444eb4(0x2b7)]=function(){const _0xcf8bcb=_0x444eb4;this[_0xcf8bcb(0x592)]=Graphics[_0xcf8bcb(0x592)],this[_0xcf8bcb(0x773)]=Graphics[_0xcf8bcb(0x773)];const _0x1b97d3=Math[_0xcf8bcb(0x960)](0x1,this['width']/this[_0xcf8bcb(0x8fa)][_0xcf8bcb(0x592)]),_0x336a4c=Math[_0xcf8bcb(0x960)](0x1,this[_0xcf8bcb(0x773)]/this[_0xcf8bcb(0x8fa)][_0xcf8bcb(0x773)]),_0x19e7b6=Math['max'](_0x1b97d3,_0x336a4c);this[_0xcf8bcb(0x731)]['x']=_0x19e7b6,this[_0xcf8bcb(0x731)]['y']=_0x19e7b6,this['x']=(Graphics[_0xcf8bcb(0x592)]-this['width'])/0x2,this['y']=Graphics['height']-this[_0xcf8bcb(0x773)];},Spriteset_Battle['prototype'][_0x444eb4(0x711)]=function(){const _0x6e75d0=_0x444eb4;if(!$gameSystem[_0x6e75d0(0x73c)]())return![];return![];},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x6b4)]=function(){return 0x0;},Spriteset_Battle['prototype']['animationNextDelay']=function(){return 0x0;},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x438)]=Spriteset_Battle[_0x444eb4(0x268)]['createLowerLayer'],Spriteset_Battle[_0x444eb4(0x268)]['createLowerLayer']=function(){const _0xcd4c1d=_0x444eb4;VisuMZ[_0xcd4c1d(0x25c)][_0xcd4c1d(0x438)][_0xcd4c1d(0x315)](this),this[_0xcd4c1d(0x736)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x91d)]=Spriteset_Battle['prototype'][_0x444eb4(0x54f)],Spriteset_Battle[_0x444eb4(0x268)]['update']=function(){const _0x56cd18=_0x444eb4;VisuMZ[_0x56cd18(0x25c)][_0x56cd18(0x91d)][_0x56cd18(0x315)](this),this[_0x56cd18(0x8bb)]();},Spriteset_Battle[_0x444eb4(0x268)]['createWeather']=function(){const _0x4e7366=_0x444eb4;this[_0x4e7366(0x7c4)]=new Weather(),this[_0x4e7366(0x7b4)]['addChild'](this['_weather']);},Spriteset_Battle[_0x444eb4(0x268)]['updateWeather']=function(){const _0x219ec8=_0x444eb4;this[_0x219ec8(0x7c4)][_0x219ec8(0x8fc)]=$gameScreen['weatherType'](),this[_0x219ec8(0x7c4)][_0x219ec8(0x68e)]=$gameScreen['weatherPower']();},Game_Interpreter['prototype'][_0x444eb4(0x8c2)]=function(_0x25c302){const _0x31ea32=_0x444eb4;$gameScreen[_0x31ea32(0x26f)](_0x25c302[0x0],_0x25c302[0x1],_0x25c302[0x2]);if(_0x25c302[0x3])this[_0x31ea32(0x7f3)](_0x25c302[0x2]);return!![];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0xe4)]=Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x327)],Game_Interpreter[_0x444eb4(0x268)][_0x444eb4(0x327)]=function(_0x20a1a8){const _0x169610=_0x444eb4;if(SceneManager['isSceneBattle']()){if(_0x169610(0x46b)!==_0x169610(0x94b))return SceneManager[_0x169610(0x3a7)][_0x169610(0x60c)][_0x169610(0x6ca)](_0x20a1a8[0x0],_0x20a1a8[0x1]),!![];else{function _0x2c7a45(){const _0x11d1de=_0x169610,_0x392f4a=new _0x3d87c5(_0x4f56ef);this[_0x11d1de(0x55a)][_0x11d1de(0x86a)](_0x392f4a);}}}else{if(_0x169610(0x704)!==_0x169610(0x689))return VisuMZ['BattleCore'][_0x169610(0xe4)][_0x169610(0x315)](this,_0x20a1a8);else{function _0x132cd2(){const _0x1a3992=_0x169610;this['_mainSprite'][_0x1a3992(0x8fa)][_0x1a3992(0x49b)]!==this[_0x1a3992(0x701)]['battlerSmoothImage']()&&(this['_mainSprite']['bitmap'][_0x1a3992(0x49b)]=this[_0x1a3992(0x701)][_0x1a3992(0x44b)]());}}}},Spriteset_Battle[_0x444eb4(0x268)]['updateBattlebackBitmap']=function(_0x516f49,_0x47e24f){const _0xbee2d4=_0x444eb4;_0x516f49[_0xbee2d4(0x8fa)]=_0x47e24f;},Spriteset_Battle['prototype'][_0x444eb4(0x6ca)]=function(_0x1d2238,_0x3b335f){const _0xefabf3=_0x444eb4;_0x1d2238=_0x1d2238||'',_0x3b335f=_0x3b335f||'';_0x1d2238===''&&_0x3b335f===''&&(_0x1d2238=this['_back1Sprite'][_0xefabf3(0xce)](),_0x3b335f=this[_0xefabf3(0x44c)][_0xefabf3(0x94a)]());const _0x2a9d50=ImageManager[_0xefabf3(0x365)](_0x1d2238),_0x4eec18=ImageManager['loadBattleback2'](_0x3b335f);_0x2a9d50[_0xefabf3(0x80a)](this[_0xefabf3(0xfe)][_0xefabf3(0x896)](this,this[_0xefabf3(0x3a0)],this[_0xefabf3(0x44c)],_0x2a9d50,_0x4eec18));},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0xfe)]=function(_0x12543a,_0x5da79c,_0xd027c3,_0x5598bb){const _0x1801da=_0x444eb4;_0x5598bb[_0x1801da(0x80a)](this[_0x1801da(0x63d)][_0x1801da(0x896)](this,_0x12543a,_0x5da79c,_0xd027c3,_0x5598bb));},Spriteset_Battle[_0x444eb4(0x268)]['updateBattlebackBitmap2']=function(_0x4fe78d,_0x379ed1,_0x478d2a,_0x1451dd){const _0x2dcd3c=_0x444eb4;_0x4fe78d[_0x2dcd3c(0x8fa)]=_0x478d2a,_0x379ed1[_0x2dcd3c(0x8fa)]=_0x1451dd,_0x4fe78d[_0x2dcd3c(0x533)](),_0x379ed1[_0x2dcd3c(0x533)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x167)]=Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x50f)],Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x50f)]=function(){const _0x555f33=_0x444eb4;VisuMZ[_0x555f33(0x25c)]['Spriteset_Battle_createBattleField'][_0x555f33(0x315)](this),this[_0x555f33(0x32c)]();},Spriteset_Battle[_0x444eb4(0x268)]['createBattleFieldBattleCore']=function(){const _0x291b90=_0x444eb4;this[_0x291b90(0x889)](),this[_0x291b90(0x508)](),this['createDamageContainer'](),this[_0x291b90(0x468)]();},Spriteset_Battle[_0x444eb4(0x268)]['createBattleFieldContainer']=function(){const _0x565f19=_0x444eb4;this[_0x565f19(0x2a3)]=new Sprite(),this[_0x565f19(0x7b4)][_0x565f19(0x86a)](this['_battlerContainer']);},Spriteset_Battle['prototype'][_0x444eb4(0x508)]=function(){const _0x5ecd0e=_0x444eb4;this[_0x5ecd0e(0x5e1)]=new Sprite(),this[_0x5ecd0e(0x7b4)]['addChild'](this[_0x5ecd0e(0x5e1)]);},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x470)]=function(){const _0x161210=_0x444eb4;this['_damageContainer']=new Sprite(),this['_damageContainer']['x']=this[_0x161210(0x7b4)]['x'],this[_0x161210(0x6cb)]['y']=this['_battleField']['y'],this[_0x161210(0x86a)](this[_0x161210(0x6cb)]);},Spriteset_Battle['prototype'][_0x444eb4(0x468)]=function(){const _0x30f515=_0x444eb4;if(!this['isFlipped']())return;this['_battlerContainer'][_0x30f515(0x731)]['x']=-0x1,this[_0x30f515(0x2a3)]['x']=this[_0x30f515(0x7b4)][_0x30f515(0x592)],this[_0x30f515(0x5e1)][_0x30f515(0x731)]['x']=-0x1,this[_0x30f515(0x5e1)]['x']=this[_0x30f515(0x7b4)][_0x30f515(0x592)],this[_0x30f515(0x6cb)][_0x30f515(0x731)]['x']=-0x1,this[_0x30f515(0x6cb)]['x']=this[_0x30f515(0x7b4)]['x']+this[_0x30f515(0x7b4)][_0x30f515(0x592)];},Spriteset_Battle['prototype'][_0x444eb4(0x939)]=function(){const _0x3be174=_0x444eb4;Imported[_0x3be174(0x305)]&&VisuMZ[_0x3be174(0x6bc)][_0x3be174(0x90c)]['UI'][_0x3be174(0x4e6)]&&this['repositionEnemiesByResolution']();const _0x20a430=$gameTroop[_0x3be174(0x7ad)](),_0x181007=[];for(const _0x58b65d of _0x20a430){if(_0x3be174(0x257)!==_0x3be174(0x257)){function _0x3483d9(){const _0x4accc3=_0x3be174;_0x503130[_0x4accc3(0x25c)]['ParseActorNotetags'][_0x4accc3(0x315)](this,_0xcfc488),_0x32d160[_0x4accc3(0x25c)][_0x4accc3(0x8f8)](_0x42da20);}}else _0x181007[_0x3be174(0x12b)](new Sprite_Enemy(_0x58b65d));}_0x181007[_0x3be174(0x8b7)](this['compareEnemySprite'][_0x3be174(0x896)](this));for(const _0x2acee1 of _0x181007){this['_battlerContainer'][_0x3be174(0x86a)](_0x2acee1);}this[_0x3be174(0x404)]=_0x181007;},Spriteset_Battle['prototype']['createActors']=function(){const _0x103154=_0x444eb4;this[_0x103154(0x41e)]=[];for(let _0x19474b=0x0;_0x19474b<$gameParty['maxBattleMembers']();_0x19474b++){const _0x42ce0a=$gameParty[_0x103154(0x48e)]()[_0x19474b],_0x27776=new Sprite_Actor();_0x27776[_0x103154(0x4ad)](_0x42ce0a),_0x27776[_0x103154(0x47c)](_0x42ce0a),_0x27776[_0x103154(0x54f)](),this[_0x103154(0x41e)]['push'](_0x27776),this['_battlerContainer'][_0x103154(0x86a)](_0x27776);}},Spriteset_Battle['prototype'][_0x444eb4(0x597)]=function(_0x515e98,_0x3233eb,_0x4057b5,_0x4539d4){const _0x3c7285=_0x444eb4,_0x4d6281=this[_0x3c7285(0x697)](_0x3233eb),_0x576b38=new(_0x4d6281?Sprite_AnimationMV:Sprite_Animation)(),_0x50ff7c=this['makeTargetSprites'](_0x515e98);this['animationShouldMirror'](_0x515e98[0x0])&&(_0x4057b5=!_0x4057b5),_0x576b38[_0x3c7285(0x215)]=_0x515e98,_0x576b38['setup'](_0x50ff7c,_0x3233eb,_0x4057b5,_0x4539d4),this[_0x3c7285(0xdd)](_0x576b38);},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0xdd)]=function(_0xa71fca){const _0x46f2a3=_0x444eb4;this[_0x46f2a3(0x28e)](_0xa71fca)?this[_0x46f2a3(0x78f)]()[_0x46f2a3(0x86a)](_0xa71fca):this[_0x46f2a3(0x5e1)][_0x46f2a3(0x86a)](_0xa71fca),this[_0x46f2a3(0x56e)]['push'](_0xa71fca);},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x28e)]=function(_0x45cc89){const _0x364db1=_0x444eb4;if(!_0x45cc89)return![];if(!_0x45cc89[_0x364db1(0x1ab)])return![];if(_0x45cc89['_animation'][_0x364db1(0x60e)]!==0x0)return![];if(!_0x45cc89[_0x364db1(0x215)][0x0])return![];if(!_0x45cc89[_0x364db1(0x215)][0x0]['isActor']())return![];if($gameSystem[_0x364db1(0x73c)]())return![];if(!this[_0x364db1(0x78f)]())return![];return Window_BattleStatus[_0x364db1(0x268)]['battleLayoutStyle']()===_0x364db1(0x245);},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x78f)]=function(){const _0x29db7e=_0x444eb4;if(!SceneManager[_0x29db7e(0x3a7)])return;if(!SceneManager[_0x29db7e(0x3a7)][_0x29db7e(0x6e0)])return;if(!SceneManager[_0x29db7e(0x3a7)][_0x29db7e(0x6e0)][_0x29db7e(0x485)])return;return SceneManager[_0x29db7e(0x3a7)]['_statusWindow'][_0x29db7e(0x485)];},Spriteset_Battle['prototype']['removeAnimation']=function(_0x3e1269){const _0xd0dcce=_0x444eb4;this['removeAnimationFromContainer'](_0x3e1269);for(const _0x45ff36 of _0x3e1269[_0xd0dcce(0x215)]){_0x45ff36['endAnimation']&&_0x45ff36[_0xd0dcce(0x8d8)]();}_0x3e1269[_0xd0dcce(0x73b)]();},Spriteset_Battle['prototype']['removeAnimationFromContainer']=function(_0x227881){const _0x1567f5=_0x444eb4;this[_0x1567f5(0x56e)][_0x1567f5(0x580)](_0x227881);if(this[_0x1567f5(0x28e)](_0x227881)){if(_0x1567f5(0x131)!==_0x1567f5(0x6dc))this[_0x1567f5(0x78f)]()[_0x1567f5(0x910)](_0x227881);else{function _0x525a9e(){const _0x5d4326=_0x1567f5;return _0x3342c3[_0x5d4326(0x25c)][_0x5d4326(0x90c)][_0x5d4326(0x75c)][_0x5d4326(0x324)];}}}else this[_0x1567f5(0x5e1)]['removeChild'](_0x227881);},VisuMZ[_0x444eb4(0x25c)]['Spriteset_Battle_updateActors']=Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x86f)],Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x86f)]=function(){const _0xc55ae1=_0x444eb4;VisuMZ[_0xc55ae1(0x25c)][_0xc55ae1(0x4b9)][_0xc55ae1(0x315)](this),this[_0xc55ae1(0x85b)]();},Spriteset_Battle[_0x444eb4(0x268)]['updateBattlerContainer']=function(){const _0x23014c=_0x444eb4;this[_0x23014c(0x2a3)][_0x23014c(0x3ab)][_0x23014c(0x8b7)](this['compareBattlerSprites'][_0x23014c(0x896)](this)),this[_0x23014c(0x6ab)]();},Spriteset_Battle['prototype'][_0x444eb4(0x8ab)]=function(_0x5319b3,_0x6f4467){const _0x59e573=_0x444eb4;if(VisuMZ[_0x59e573(0x25c)][_0x59e573(0x90c)][_0x59e573(0x78b)][_0x59e573(0x17b)]){if(_0x5319b3['_battler']&&_0x6f4467[_0x59e573(0x701)]){if(_0x59e573(0x568)===_0x59e573(0x5b4)){function _0x34e553(){const _0x235024=_0x59e573;_0x16a7cd[_0x235024(0x25c)][_0x235024(0x1ff)][_0x235024(0x315)](this,_0x2875e2),_0x3efe06[_0x235024(0x25c)]['Parse_Notetags_TraitObjects'](_0xfedaec);}}else{if(_0x5319b3[_0x59e573(0x701)][_0x59e573(0x73d)]()&&_0x6f4467[_0x59e573(0x701)]['isEnemy']())return 0x1;else{if(_0x6f4467[_0x59e573(0x701)][_0x59e573(0x73d)]()&&_0x5319b3[_0x59e573(0x701)][_0x59e573(0x5e6)]())return-0x1;}}}}return _0x5319b3['_baseY']!==_0x6f4467[_0x59e573(0x29f)]?_0x5319b3[_0x59e573(0x29f)]-_0x6f4467['_baseY']:_0x6f4467[_0x59e573(0x719)]-_0x5319b3[_0x59e573(0x719)];},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x6ab)]=function(){const _0x546036=_0x444eb4;if(!VisuMZ[_0x546036(0x25c)][_0x546036(0x90c)][_0x546036(0x78b)][_0x546036(0x74b)])return;const _0x2f41d9=BattleManager[_0x546036(0xda)];if(_0x2f41d9){if(_0x546036(0x55e)===_0x546036(0x388)){function _0x1ea941(){const _0x4ff6a4=_0x546036;let _0x52929c=_0x4b283e(_0x54d98c['$1']);while(_0x52929c--){_0x107d71[_0x4ff6a4(0x12b)](this[_0x4ff6a4(0x841)]()[_0x4ff6a4(0x1d1)]());}return this[_0x4ff6a4(0x6a1)](_0x182bb2);}}else{if(_0x2f41d9[_0x546036(0x73d)]()&&!$gameSystem['isSideView']())return;const _0x501212=_0x2f41d9[_0x546036(0x7f2)]();if(_0x501212&&_0x2f41d9['isActor']())this[_0x546036(0x2a3)]['addChild'](_0x501212);}}},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x128)]=function(){const _0x54e828=_0x444eb4;for(const _0x37dec9 of $gameParty[_0x54e828(0x20e)]()){if(!_0x37dec9)continue;if(!_0x37dec9[_0x54e828(0x7f2)]())continue;_0x37dec9[_0x54e828(0x7f2)]()[_0x54e828(0x74a)]=!![],_0x37dec9[_0x54e828(0x7f2)]()['retreat']();}},Spriteset_Battle['prototype'][_0x444eb4(0x95b)]=function(){return![];},Spriteset_Battle[_0x444eb4(0x268)]['isAnyoneFloating']=function(){const _0x3b71cf=_0x444eb4;return this[_0x3b71cf(0x510)]()[_0x3b71cf(0x563)](_0x4471ef=>_0x4471ef[_0x3b71cf(0x4d8)]());},Spriteset_Battle['prototype']['isAnyoneJumping']=function(){const _0xd95c54=_0x444eb4;return this['battlerSprites']()[_0xd95c54(0x563)](_0x49a118=>_0x49a118[_0xd95c54(0x462)]());},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x2d1)]=function(){const _0x4d0a92=_0x444eb4;return this[_0x4d0a92(0x510)]()['some'](_0x29ea82=>_0x29ea82[_0x4d0a92(0x54e)]());},Spriteset_Battle[_0x444eb4(0x268)]['isAnyoneSkewing']=function(){const _0x343886=_0x444eb4;return this['battlerSprites']()[_0x343886(0x563)](_0x182f33=>_0x182f33[_0x343886(0x5fe)]());},Spriteset_Battle[_0x444eb4(0x268)][_0x444eb4(0x837)]=function(){const _0x4867a9=_0x444eb4;return this[_0x4867a9(0x510)]()[_0x4867a9(0x563)](_0x391716=>_0x391716[_0x4867a9(0x783)]());},Spriteset_Battle[_0x444eb4(0x268)]['isAnyoneChangingOpacity']=function(){const _0x4fb9cb=_0x444eb4;return this['battlerSprites']()[_0x4fb9cb(0x563)](_0xa61ed8=>_0xa61ed8[_0x4fb9cb(0x130)]());},VisuMZ[_0x444eb4(0x25c)]['Window_ItemList_maxCols']=Window_ItemList['prototype']['maxCols'],Window_ItemList[_0x444eb4(0x268)][_0x444eb4(0x99a)]=function(){const _0x3931e3=_0x444eb4;return SceneManager['isSceneBattle']()?SceneManager[_0x3931e3(0x3a7)][_0x3931e3(0xac)]()===_0x3931e3(0x27c)?VisuMZ['BattleCore'][_0x3931e3(0x90c)][_0x3931e3(0x75c)][_0x3931e3(0x324)]:VisuMZ[_0x3931e3(0x25c)][_0x3931e3(0x90c)][_0x3931e3(0x75c)][_0x3931e3(0x75a)]:VisuMZ[_0x3931e3(0x25c)]['Window_ItemList_maxCols'][_0x3931e3(0x315)](this);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x1f9)]=Window_SkillList[_0x444eb4(0x268)]['maxCols'],Window_SkillList[_0x444eb4(0x268)][_0x444eb4(0x99a)]=function(){const _0x5eef56=_0x444eb4;if(SceneManager['isSceneBattle']()){if(_0x5eef56(0x437)===_0x5eef56(0x437)){if(SceneManager['_scene'][_0x5eef56(0xac)]()==='border'){if(_0x5eef56(0x76a)!==_0x5eef56(0x299))return VisuMZ[_0x5eef56(0x25c)][_0x5eef56(0x90c)][_0x5eef56(0x75c)][_0x5eef56(0x324)];else{function _0x4d53bf(){const _0x1a711c=_0x5eef56;return this[_0x1a711c(0x3a7)]&&this[_0x1a711c(0x3a7)][_0x1a711c(0x266)]===_0x223be9;}}}else{if('pLdvb'==='XktdQ'){function _0x413f80(){const _0xdb9e39=_0x5eef56;if(!_0xe11255[_0xdb9e39(0x11f)]())return;if(!_0x5363f7['VisuMZ_3_ActSeqImpact'])return;const _0x2c6ad5=_0x29238c[_0xdb9e39(0x3a7)][_0xdb9e39(0x60c)];if(!_0x2c6ad5)return;_0x325d91['ConvertParams'](_0x44c2ca,_0x423a01);const _0x168501=_0x4f08f0(_0x2fccc6[_0xdb9e39(0x8d9)])||0x0,_0x8f7791=_0x1e9c35(_0x2ee725[_0xdb9e39(0x654)]),_0x3c5695=_0xe005b['Duration']||0x1,_0x37c2c4=_0x58f320[_0xdb9e39(0x81b)]||_0xdb9e39(0x5b6);_0x2c6ad5[_0xdb9e39(0x80d)](_0x168501,_0x8f7791,_0x3c5695,_0x37c2c4);}}else return VisuMZ[_0x5eef56(0x25c)][_0x5eef56(0x90c)]['BattleLayout'][_0x5eef56(0x75a)];}}else{function _0x3823f8(){const _0x502890=_0x5eef56;return _0x52aa29=_0x508ca8[_0x502890(0x25c)]['Settings']['Damage'][_0x502890(0x1b5)]['call'](this,_0x2f1eee),_0x27b22e=this[_0x502890(0x15d)]['criticalDmgRate']*_0x1c2d2b+this['_multipliers'][_0x502890(0x11c)],_0x4f0352;}}}else return VisuMZ['BattleCore']['Window_SkillList_maxCols'][_0x5eef56(0x315)](this);},VisuMZ[_0x444eb4(0x25c)]['Window_Options_addGeneralOptions']=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x444eb4(0x268)][_0x444eb4(0x6e2)]=function(){const _0x2ef8cb=_0x444eb4;VisuMZ[_0x2ef8cb(0x25c)][_0x2ef8cb(0x33b)][_0x2ef8cb(0x315)](this),this[_0x2ef8cb(0x6c0)](),this['addShowHpGaugeCommand']();},Window_Options[_0x444eb4(0x268)][_0x444eb4(0x6c0)]=function(){const _0x1a9c7d=_0x444eb4;if(VisuMZ[_0x1a9c7d(0x25c)]['Settings'][_0x1a9c7d(0x49d)][_0x1a9c7d(0x399)]){if(_0x1a9c7d(0x88c)===_0x1a9c7d(0x6c3)){function _0x5434fd(){const _0x2eb057=_0x1a9c7d,_0x5161e1=_0x20e816(_0x527f4d['$1'])[_0x2eb057(0x8c0)]()[_0x2eb057(0x3af)]();if(_0x5161e1==='MANUAL')return _0x2eb057(0x5f5);if(_0x53e925[_0x2eb057(0x1ba)][_0x5161e1])return _0x5161e1;}}else this[_0x1a9c7d(0x81d)](),this[_0x1a9c7d(0x936)]();}},Window_Options[_0x444eb4(0x268)][_0x444eb4(0x95a)]=function(){const _0x2764cb=_0x444eb4;if(!VisuMZ['BattleCore'][_0x2764cb(0x90c)]['HpGauge'][_0x2764cb(0x33c)])return;const _0x5ceefd=TextManager[_0x2764cb(0x46e)],_0x27fb04=_0x2764cb(0x46e);this['addCommand'](_0x5ceefd,_0x27fb04);},Window_Options[_0x444eb4(0x268)]['addBattleCoreAutoBattleStartupCommand']=function(){const _0x1ce21a=_0x444eb4,_0x4cf480=TextManager[_0x1ce21a(0x3b5)],_0x596e5d=_0x1ce21a(0x77a);this[_0x1ce21a(0xb7)](_0x4cf480,_0x596e5d);},Window_Options[_0x444eb4(0x268)][_0x444eb4(0x936)]=function(){const _0x57263c=_0x444eb4,_0x3420dd=TextManager['autoBattleStyle'],_0x292468='autoBattleUseSkills';this[_0x57263c(0xb7)](_0x3420dd,_0x292468);},VisuMZ['BattleCore'][_0x444eb4(0x747)]=Window_Options['prototype'][_0x444eb4(0x621)],Window_Options[_0x444eb4(0x268)][_0x444eb4(0x621)]=function(_0x4a40d8){const _0x4f7b2f=_0x444eb4,_0x236bb0=this[_0x4f7b2f(0x643)](_0x4a40d8);if(_0x236bb0===_0x4f7b2f(0x534)){if(_0x4f7b2f(0x3e0)!==_0x4f7b2f(0x3e0)){function _0x1af465(){const _0x157e46=_0x4f7b2f;_0x1908c1[_0x157e46(0x652)](![]);}}else return this[_0x4f7b2f(0x271)]();}else{if(_0x4f7b2f(0x639)===_0x4f7b2f(0x519)){function _0x49bbd9(){const _0x4e2000=_0x4f7b2f;this[_0x4e2000(0x185)]=_0x2b2d91(_0x392ed0['$1']);}}else return VisuMZ[_0x4f7b2f(0x25c)][_0x4f7b2f(0x747)][_0x4f7b2f(0x315)](this,_0x4a40d8);}},Window_Options[_0x444eb4(0x268)][_0x444eb4(0x271)]=function(){const _0x30b9e3=_0x444eb4,_0x3b48e0=VisuMZ[_0x30b9e3(0x25c)]['Settings'][_0x30b9e3(0x49d)],_0x4742dc=this[_0x30b9e3(0x47e)]('autoBattleUseSkills');return _0x4742dc?_0x3b48e0['StyleON']:_0x3b48e0[_0x30b9e3(0x496)];},Window_ShopStatus[_0x444eb4(0x268)][_0x444eb4(0x11a)]=function(){const _0x154ebf=_0x444eb4,_0x216ba0=DataManager[_0x154ebf(0x41f)](this[_0x154ebf(0x82e)]),_0xdbb8=VisuMZ[_0x154ebf(0x1ba)][_0x216ba0];if(!_0xdbb8)return this['getItemDamageAmountLabelOriginal']();const _0x5685bd=_0x154ebf(0x25f)[_0x154ebf(0x4e2)](this[_0x154ebf(0x82e)]['damage'][_0x154ebf(0x8fc)]),_0x438663=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x154ebf(0x243)]['type']];return _0xdbb8[_0x5685bd][_0x154ebf(0x4e2)](_0x438663);},Window_ShopStatus[_0x444eb4(0x268)][_0x444eb4(0x637)]=function(){const _0x412af5=_0x444eb4,_0x5c09af=DataManager[_0x412af5(0x41f)](this[_0x412af5(0x82e)]),_0x5aff25=VisuMZ['DamageStyles'][_0x5c09af];if(!_0x5aff25)return this['getItemDamageAmountTextOriginal']();return _0x5aff25[_0x412af5(0x3d7)][_0x412af5(0x315)](this);},VisuMZ[_0x444eb4(0x25c)]['Window_PartyCommand_initialize']=Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x3c7)],Window_PartyCommand[_0x444eb4(0x268)]['initialize']=function(_0x1c0d81){const _0x1ef498=_0x444eb4;VisuMZ[_0x1ef498(0x25c)]['Window_PartyCommand_initialize'][_0x1ef498(0x315)](this,_0x1c0d81),this['createCommandNameWindow'](_0x1c0d81);},Window_PartyCommand['prototype'][_0x444eb4(0x60d)]=function(_0x4dab57){const _0x6dae9b=_0x444eb4,_0x5353d6=new Rectangle(0x0,0x0,_0x4dab57[_0x6dae9b(0x592)],_0x4dab57[_0x6dae9b(0x773)]);this['_commandNameWindow']=new Window_Base(_0x5353d6),this['_commandNameWindow'][_0x6dae9b(0x30b)]=0x0,this[_0x6dae9b(0x86a)](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_PartyCommand[_0x444eb4(0x268)]['callUpdateHelp']=function(){const _0x4df8c6=_0x444eb4;Window_Command[_0x4df8c6(0x268)][_0x4df8c6(0x31f)][_0x4df8c6(0x315)](this);if(this['_commandNameWindow'])this[_0x4df8c6(0x3cb)]();},Window_PartyCommand['prototype'][_0x444eb4(0x3cb)]=function(){const _0x18b71f=_0x444eb4,_0x21ad88=this['_commandNameWindow'];_0x21ad88['contents'][_0x18b71f(0x7f0)]();const _0x363946=this['commandStyleCheck'](this['index']());if(_0x363946===_0x18b71f(0x565)&&this[_0x18b71f(0x2e3)]()>0x0){const _0x50ffe4=this['itemLineRect'](this[_0x18b71f(0x309)]());let _0x5b602e=this[_0x18b71f(0x122)](this[_0x18b71f(0x309)]());_0x5b602e=_0x5b602e[_0x18b71f(0x2bc)](/\\I\[(\d+)\]/gi,''),_0x21ad88[_0x18b71f(0xe7)](),this[_0x18b71f(0x331)](_0x5b602e,_0x50ffe4),this['commandNameWindowDrawText'](_0x5b602e,_0x50ffe4),this[_0x18b71f(0x65a)](_0x5b602e,_0x50ffe4);}},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x331)]=function(_0x5c0ab2,_0x15a96d){},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x5d8)]=function(_0x7da7de,_0x53f9c0){const _0x294371=_0x444eb4,_0x2b56bc=this[_0x294371(0x129)];_0x2b56bc[_0x294371(0x45e)](_0x7da7de,0x0,_0x53f9c0['y'],_0x2b56bc[_0x294371(0x5e5)],'center');},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x65a)]=function(_0x50a454,_0x13bf85){const _0x531d8d=_0x444eb4,_0x37fdae=this['_commandNameWindow'],_0x2bf1cd=$gameSystem['windowPadding'](),_0x4f1816=_0x13bf85['x']+Math[_0x531d8d(0x10b)](_0x13bf85['width']/0x2)+_0x2bf1cd;_0x37fdae['x']=_0x37fdae['width']/-0x2+_0x4f1816,_0x37fdae['y']=Math[_0x531d8d(0x10b)](_0x13bf85[_0x531d8d(0x773)]/0x2);},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x6c8)]=function(){const _0x33dc17=_0x444eb4;this[_0x33dc17(0x1a3)](),this[_0x33dc17(0x89d)](),this['addCustomCommands'](),this[_0x33dc17(0x1a7)](),this[_0x33dc17(0x53e)]();},Window_PartyCommand['prototype'][_0x444eb4(0x1a3)]=function(){const _0x121a78=_0x444eb4,_0x39cb60=this['commandStyle'](),_0x3b72e6=VisuMZ[_0x121a78(0x25c)]['Settings'][_0x121a78(0x1cb)][_0x121a78(0x448)],_0x294c8d=_0x39cb60===_0x121a78(0x7b1)?TextManager[_0x121a78(0x97f)]:_0x121a78(0x369)[_0x121a78(0x4e2)](_0x3b72e6,TextManager['fight']),_0x454b54=this['isFightCommandEnabled']();this[_0x121a78(0xb7)](_0x294c8d,'fight',_0x454b54);},Window_PartyCommand['prototype'][_0x444eb4(0x261)]=function(){return!![];},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x89d)]=function(){const _0x31d20c=_0x444eb4;if(!this['isAutoBattleCommandAdded']())return;const _0x37af8f=this[_0x31d20c(0x7f1)](),_0xde3281=VisuMZ['BattleCore']['Settings']['PartyCmd'][_0x31d20c(0x897)],_0x2f2c86=_0x37af8f===_0x31d20c(0x7b1)?TextManager[_0x31d20c(0x25b)]:_0x31d20c(0x369)[_0x31d20c(0x4e2)](_0xde3281,TextManager['autoBattle']),_0x15ff56=this['isAutoBattleCommandEnabled']();this['addCommand'](_0x2f2c86,'autoBattle',_0x15ff56);},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x5ec)]=function(){const _0x584deb=_0x444eb4;return VisuMZ[_0x584deb(0x25c)]['Settings'][_0x584deb(0x1cb)][_0x584deb(0x76f)];},Window_PartyCommand[_0x444eb4(0x268)]['isAutoBattleCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x444eb4(0x268)]['addCustomCommands']=function(){},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x1a7)]=function(){const _0x36c1f6=_0x444eb4;if(!this[_0x36c1f6(0x714)]())return;const _0xabbbd9=this[_0x36c1f6(0x7f1)](),_0x5b6377=VisuMZ['BattleCore'][_0x36c1f6(0x90c)][_0x36c1f6(0x1cb)]['CmdIconOptions'],_0x35213c=_0xabbbd9==='text'?TextManager[_0x36c1f6(0x608)]:'\x5cI[%1]%2'[_0x36c1f6(0x4e2)](_0x5b6377,TextManager['options']),_0x280b1a=this['isOptionsCommandEnabled']();this[_0x36c1f6(0xb7)](_0x35213c,_0x36c1f6(0x608),_0x280b1a);},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x714)]=function(){const _0xc3fe1f=_0x444eb4;return VisuMZ[_0xc3fe1f(0x25c)][_0xc3fe1f(0x90c)][_0xc3fe1f(0x1cb)][_0xc3fe1f(0x7f4)];},Window_PartyCommand[_0x444eb4(0x268)]['isOptionsCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x53e)]=function(){const _0x2483fb=_0x444eb4,_0x42fa5a=this[_0x2483fb(0x7f1)](),_0x22723f=VisuMZ['BattleCore'][_0x2483fb(0x90c)]['PartyCmd'][_0x2483fb(0x685)],_0x179dfd=_0x42fa5a==='text'?TextManager[_0x2483fb(0x29c)]:_0x2483fb(0x369)[_0x2483fb(0x4e2)](_0x22723f,TextManager[_0x2483fb(0x29c)]),_0x2357a6=this[_0x2483fb(0x1aa)]();this[_0x2483fb(0xb7)](_0x179dfd,_0x2483fb(0x29c),_0x2357a6);},Window_PartyCommand['prototype'][_0x444eb4(0x1aa)]=function(){const _0xbf9695=_0x444eb4;return BattleManager[_0xbf9695(0x11d)]();},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x3bf)]=function(){const _0x482e61=_0x444eb4;return VisuMZ[_0x482e61(0x25c)]['Settings'][_0x482e61(0x1cb)][_0x482e61(0x8b0)];},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x118)]=function(_0x30a597){const _0x579bad=_0x444eb4,_0x3f14ea=this['commandStyleCheck'](_0x30a597);if(_0x3f14ea==='iconText'){if('QmfFH'!==_0x579bad(0x3cc))this[_0x579bad(0x193)](_0x30a597);else{function _0x375e02(){const _0x338587=_0x579bad;if(this['_defeatedEnemies']===_0x11ef40)this[_0x338587(0x976)]();return this[_0x338587(0x575)];}}}else _0x3f14ea===_0x579bad(0x565)?this[_0x579bad(0x8d1)](_0x30a597):Window_Command[_0x579bad(0x268)][_0x579bad(0x118)][_0x579bad(0x315)](this,_0x30a597);},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x7f1)]=function(){const _0x5d50f7=_0x444eb4;return VisuMZ[_0x5d50f7(0x25c)][_0x5d50f7(0x90c)][_0x5d50f7(0x1cb)]['CmdStyle'];},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x70b)]=function(_0x584948){const _0x4e0a80=_0x444eb4;if(_0x584948<0x0)return _0x4e0a80(0x7b1);const _0x46c3aa=this['commandStyle']();if(_0x46c3aa!==_0x4e0a80(0xe1))return _0x46c3aa;else{if(this[_0x4e0a80(0x2e3)]()>0x0){const _0x5d743b=this[_0x4e0a80(0x122)](_0x584948);if(_0x5d743b[_0x4e0a80(0x7db)](/\\I\[(\d+)\]/i)){const _0x1d2540=this[_0x4e0a80(0x5c5)](_0x584948),_0x5af872=this[_0x4e0a80(0x463)](_0x5d743b)[_0x4e0a80(0x592)];if(_0x5af872<=_0x1d2540[_0x4e0a80(0x592)])return _0x4e0a80(0x2ab);else{if(_0x4e0a80(0x30d)===_0x4e0a80(0xc6)){function _0x31d9d9(){const _0x531326=_0x4e0a80;if(this[_0x531326(0xac)]()!==_0x531326(0x245))return;this[_0x531326(0x84d)](_0x295112[_0x531326(0x309)]());}}else return _0x4e0a80(0x565);}}}}return _0x4e0a80(0x7b1);},Window_PartyCommand['prototype'][_0x444eb4(0x193)]=function(_0x2747f9){const _0x18e64c=_0x444eb4,_0x2dae80=this[_0x18e64c(0x5c5)](_0x2747f9),_0x57d5db=this['commandName'](_0x2747f9),_0x26ee00=this['textSizeEx'](_0x57d5db)[_0x18e64c(0x592)];this[_0x18e64c(0x264)](this[_0x18e64c(0x756)](_0x2747f9));const _0x32ad9b=this['itemTextAlign']();if(_0x32ad9b===_0x18e64c(0x7d4)){if('lniaH'!==_0x18e64c(0x127))this[_0x18e64c(0x2bb)](_0x57d5db,_0x2dae80['x']+_0x2dae80[_0x18e64c(0x592)]-_0x26ee00,_0x2dae80['y'],_0x26ee00);else{function _0xfafbb2(){const _0x271aac=_0x18e64c;if(!_0x3ff53e[_0x271aac(0x11f)]())return;const _0x56d028=_0x163486['getLastPluginCommandInterpreter']();if(!_0x56d028)return;_0x56d028[_0x271aac(0x306)](_0x271aac(0x408));}}}else{if(_0x32ad9b===_0x18e64c(0x373)){const _0x3718d1=_0x2dae80['x']+Math[_0x18e64c(0x10b)]((_0x2dae80[_0x18e64c(0x592)]-_0x26ee00)/0x2);this[_0x18e64c(0x2bb)](_0x57d5db,_0x3718d1,_0x2dae80['y'],_0x26ee00);}else{if(_0x18e64c(0x2e8)!==_0x18e64c(0x946))this[_0x18e64c(0x2bb)](_0x57d5db,_0x2dae80['x'],_0x2dae80['y'],_0x26ee00);else{function _0x54081e(){const _0x1ba9d9=_0x18e64c;_0x2d1a83[_0x1ba9d9(0x861)](_0xea334a,_0x4c4ad8,_0x4f2118,_0x43aad9,_0x41160b,-0x1),this[_0x1ba9d9(0x790)]();}}}}},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x8d1)]=function(_0x35e146){const _0x29f497=_0x444eb4;this[_0x29f497(0x122)](_0x35e146)[_0x29f497(0x7db)](/\\I\[(\d+)\]/i);const _0x9171bb=Number(RegExp['$1'])||0x0,_0x313d00=this[_0x29f497(0x5c5)](_0x35e146),_0x2dd197=_0x313d00['x']+Math[_0x29f497(0x10b)]((_0x313d00[_0x29f497(0x592)]-ImageManager['iconWidth'])/0x2),_0x4fed9d=_0x313d00['y']+(_0x313d00[_0x29f497(0x773)]-ImageManager[_0x29f497(0x929)])/0x2;this[_0x29f497(0x56c)](_0x9171bb,_0x2dd197,_0x4fed9d);},Window_PartyCommand[_0x444eb4(0x268)]['hide']=function(){},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x83d)]=function(){const _0x3ddf17=_0x444eb4;Window_Command[_0x3ddf17(0x268)][_0x3ddf17(0x83d)][_0x3ddf17(0x315)](this);const _0x1f09a9=this['battleLayoutStyle']();if(_0x1f09a9===_0x3ddf17(0x27c)){if(_0x3ddf17(0x333)===_0x3ddf17(0x20b)){function _0x3ef657(){const _0x499cb3=_0x3ddf17;this[_0x499cb3(0x2cb)](_0x31a468[_0x499cb3(0x21b)]);}}else this[_0x3ddf17(0x528)]();}},Window_PartyCommand['prototype'][_0x444eb4(0xac)]=function(){const _0x497c44=_0x444eb4;if(this[_0x497c44(0x126)])return this['_battleLayoutStyle'];return this['_battleLayoutStyle']=SceneManager['_scene'][_0x497c44(0xac)](),this[_0x497c44(0x126)];},Window_PartyCommand[_0x444eb4(0x268)][_0x444eb4(0x706)]=function(){const _0x3414ce=_0x444eb4,_0x32029c=VisuMZ['BattleCore'][_0x3414ce(0x90c)][_0x3414ce(0x1cb)],_0x230b5f=this[_0x3414ce(0x181)]();switch(_0x230b5f){case'fight':this[_0x3414ce(0x7cd)][_0x3414ce(0x5a1)](_0x32029c[_0x3414ce(0x5d0)]);break;case'autoBattle':this[_0x3414ce(0x7cd)][_0x3414ce(0x5a1)](_0x32029c['HelpAutoBattle']);break;case _0x3414ce(0x608):this['_helpWindow'][_0x3414ce(0x5a1)](_0x32029c['HelpOptions']);break;case _0x3414ce(0x29c):this[_0x3414ce(0x7cd)][_0x3414ce(0x5a1)](_0x32029c[_0x3414ce(0x252)]);break;default:this[_0x3414ce(0x7cd)]['setText']('');break;}},VisuMZ[_0x444eb4(0x25c)]['Window_ActorCommand_initialize']=Window_ActorCommand[_0x444eb4(0x268)]['initialize'],Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x3c7)]=function(_0x38a088){const _0x426aca=_0x444eb4;VisuMZ[_0x426aca(0x25c)][_0x426aca(0x165)][_0x426aca(0x315)](this,_0x38a088),this[_0x426aca(0x60d)](_0x38a088);},Window_ActorCommand['prototype'][_0x444eb4(0x60d)]=function(_0x5de2cd){const _0x5ba5d4=_0x444eb4,_0x55b620=new Rectangle(0x0,0x0,_0x5de2cd[_0x5ba5d4(0x592)],_0x5de2cd[_0x5ba5d4(0x773)]);this[_0x5ba5d4(0x129)]=new Window_Base(_0x55b620),this[_0x5ba5d4(0x129)][_0x5ba5d4(0x30b)]=0x0,this['addChild'](this[_0x5ba5d4(0x129)]),this[_0x5ba5d4(0x3cb)]();},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x31f)]=function(){const _0x1c6860=_0x444eb4;Window_Command['prototype'][_0x1c6860(0x31f)]['call'](this);if(this['_commandNameWindow'])this[_0x1c6860(0x3cb)]();},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x3cb)]=function(){const _0x27a0e9=_0x444eb4,_0x39da19=this['_commandNameWindow'];_0x39da19[_0x27a0e9(0x99c)]['clear']();const _0x144047=this[_0x27a0e9(0x70b)](this[_0x27a0e9(0x309)]());if(_0x144047===_0x27a0e9(0x565)&&this[_0x27a0e9(0x2e3)]()>0x0){if('SEPYO'===_0x27a0e9(0x3c9)){const _0x2eb891=this[_0x27a0e9(0x5c5)](this['index']());let _0xe4fdd3=this['commandName'](this[_0x27a0e9(0x309)]());_0xe4fdd3=_0xe4fdd3[_0x27a0e9(0x2bc)](/\\I\[(\d+)\]/gi,''),_0x39da19[_0x27a0e9(0xe7)](),this[_0x27a0e9(0x331)](_0xe4fdd3,_0x2eb891),this['commandNameWindowDrawText'](_0xe4fdd3,_0x2eb891),this['commandNameWindowCenter'](_0xe4fdd3,_0x2eb891);}else{function _0x51980e(){const _0x2cd57e=_0x27a0e9;_0x25d14e[_0x2cd57e(0x180)]();let _0x55f4a8=_0x40559e['BattleCore'][_0x2cd57e(0x90c)][_0x2cd57e(0x4d4)]['ReflectAnimation'];_0x55f4a8>0x0&&_0x5caaee[_0x2cd57e(0x979)]([this],_0x55f4a8);}}}},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x331)]=function(_0x228ee6,_0x81b405){},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x5d8)]=function(_0x58c265,_0x5ecd61){const _0x37d0ca=_0x444eb4,_0x585d81=this['_commandNameWindow'];_0x585d81[_0x37d0ca(0x45e)](_0x58c265,0x0,_0x5ecd61['y'],_0x585d81[_0x37d0ca(0x5e5)],_0x37d0ca(0x373));},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x65a)]=function(_0x2e38e2,_0x3a71f3){const _0x546fdc=_0x444eb4,_0x506233=this[_0x546fdc(0x129)],_0x2b572c=$gameSystem[_0x546fdc(0x702)](),_0xa04081=_0x3a71f3['x']+Math['floor'](_0x3a71f3[_0x546fdc(0x592)]/0x2)+_0x2b572c;_0x506233['x']=_0x506233['width']/-0x2+_0xa04081,_0x506233['y']=Math[_0x546fdc(0x10b)](_0x3a71f3[_0x546fdc(0x773)]/0x2);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x6c8)]=function(){const _0x17e626=_0x444eb4;if(!this['_actor'])return;const _0x279816=this[_0x17e626(0x50c)][_0x17e626(0x5d5)]();for(const _0x223a4c of _0x279816){if(_0x17e626(0x4f2)===_0x17e626(0x4f2))this[_0x17e626(0x2f6)](_0x223a4c[_0x17e626(0x8c0)]()[_0x17e626(0x3af)]());else{function _0x8699b4(){const _0x304c6a=_0x17e626;this['_partyCommandWindow'][_0x304c6a(0x18f)](),this['_actorCommandWindow'][_0x304c6a(0x418)]();}}}},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x2f6)]=function(_0x2ff340){const _0x4fa32a=_0x444eb4;if(_0x2ff340===_0x4fa32a(0x17c)){if('fSJRL'!==_0x4fa32a(0x7cf)){function _0x15a6d1(){const _0x2c2d25=_0x4fa32a,_0x2facab=this[_0x2c2d25(0x643)](_0x489753);return _0x2facab===_0x2c2d25(0x534)?this['statusTextAutoBattleStyle']():_0x2985ed[_0x2c2d25(0x25c)][_0x2c2d25(0x747)][_0x2c2d25(0x315)](this,_0x556d45);}}else this['addAttackCommand']();}['STYPES','SKILLS']['includes'](_0x2ff340)&&this[_0x4fa32a(0x220)]();_0x2ff340==='GUARD'&&this[_0x4fa32a(0xf3)]();_0x2ff340===_0x4fa32a(0x83f)&&this['addItemCommand']();if(_0x2ff340===_0x4fa32a(0x937)){if(_0x4fa32a(0x667)===_0x4fa32a(0x667))this[_0x4fa32a(0x53e)]();else{function _0x377713(){const _0x4fb7f3=_0x4fa32a;_0xe5c777[_0x4fb7f3(0x2a4)](_0x3c2996[_0x4fb7f3(0x5f9)]);}}}_0x2ff340===_0x4fa32a(0x6d2)&&this['addAutoBattleCommand']();if(_0x2ff340[_0x4fa32a(0x7db)](/STYPE: (\d+)/i)){const _0x4425bb=Number(RegExp['$1']);this[_0x4fa32a(0x17a)](_0x4425bb);}else{if(_0x2ff340[_0x4fa32a(0x7db)](/STYPE: (.*)/i)){const _0x2b4223=DataManager[_0x4fa32a(0x1d3)](RegExp['$1']);this[_0x4fa32a(0x17a)](_0x2b4223);}}if(_0x2ff340===_0x4fa32a(0x989)){if(_0x4fa32a(0x22f)!==_0x4fa32a(0x6bf))this['addSingleSkillCommands']();else{function _0x4b8268(){const _0x4db94b=_0x4fa32a;this[_0x4db94b(0x78f)]()[_0x4db94b(0x86a)](_0x22f74f);}}}if(_0x2ff340[_0x4fa32a(0x7db)](/SKILL: (\d+)/i)){const _0x2ca866=Number(RegExp['$1']);this[_0x4fa32a(0x176)]($dataSkills[_0x2ca866]);}else{if(_0x2ff340[_0x4fa32a(0x7db)](/SKILL: (.*)/i)){if('whtoL'!==_0x4fa32a(0x730)){const _0x427333=DataManager[_0x4fa32a(0x971)](RegExp['$1']);this[_0x4fa32a(0x176)]($dataSkills[_0x427333]);}else{function _0x27d502(){_0x1b8e34=_0x39dbaf['FrontViewSelect'];}}}}if(_0x2ff340===_0x4fa32a(0x96a)&&Imported[_0x4fa32a(0x3a9)]){if(_0x4fa32a(0x6fc)!==_0x4fa32a(0x764))this[_0x4fa32a(0x4a6)]();else{function _0x351d33(){this['setupCriticalEffect']();}}}},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x385)]=function(){const _0x16d1cf=_0x444eb4,_0x506ff0=$dataSkills[this[_0x16d1cf(0x50c)][_0x16d1cf(0x8b5)]()];if(!_0x506ff0)return;if(!this[_0x16d1cf(0xb3)](_0x506ff0))return;const _0x2714f5=this[_0x16d1cf(0x7f1)](),_0x58a904=DataManager[_0x16d1cf(0x7a3)](_0x506ff0),_0x31c863=DataManager['battleCommandIcon'](_0x506ff0),_0x2ca382=_0x2714f5==='text'?_0x58a904:'\x5cI[%1]%2'['format'](_0x31c863,_0x58a904);this[_0x16d1cf(0xb7)](_0x2ca382,'attack',this[_0x16d1cf(0x50c)][_0x16d1cf(0x2aa)]());},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0xf3)]=function(){const _0x33ed73=_0x444eb4,_0x18878d=$dataSkills[this[_0x33ed73(0x50c)][_0x33ed73(0x7a5)]()];if(!_0x18878d)return;if(!this[_0x33ed73(0xb3)](_0x18878d))return;const _0x266d0c=this['commandStyle'](),_0xc2bc1d=DataManager[_0x33ed73(0x7a3)](_0x18878d),_0xaab1fb=DataManager[_0x33ed73(0x48c)](_0x18878d),_0x30b50c=_0x266d0c===_0x33ed73(0x7b1)?_0xc2bc1d:_0x33ed73(0x369)[_0x33ed73(0x4e2)](_0xaab1fb,_0xc2bc1d);this[_0x33ed73(0xb7)](_0x30b50c,_0x33ed73(0x6f1),this[_0x33ed73(0x50c)][_0x33ed73(0x8f1)]());},Window_ActorCommand[_0x444eb4(0x268)]['addItemCommand']=function(){const _0x2bb967=_0x444eb4,_0x47f904=this[_0x2bb967(0x7f1)](),_0x1bbcc8=VisuMZ[_0x2bb967(0x25c)][_0x2bb967(0x90c)][_0x2bb967(0x370)]['CmdIconItem'],_0x17a72e=_0x47f904===_0x2bb967(0x7b1)?TextManager[_0x2bb967(0x712)]:_0x2bb967(0x369)['format'](_0x1bbcc8,TextManager[_0x2bb967(0x712)]),_0x8a65dc=this[_0x2bb967(0x7d2)]();this[_0x2bb967(0xb7)](_0x17a72e,_0x2bb967(0x712),_0x8a65dc);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x7d2)]=function(){const _0x21e622=_0x444eb4;return this[_0x21e622(0x50c)]&&this[_0x21e622(0x50c)][_0x21e622(0x218)]();},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x220)]=function(){const _0x5f1e82=_0x444eb4,_0x229a1d=this[_0x5f1e82(0x50c)]['skillTypes']();for(const _0x40afd8 of _0x229a1d){if(_0x5f1e82(0x3b3)!==_0x5f1e82(0x3b3)){function _0x359fad(){const _0x492b79=_0x5f1e82;this[_0x492b79(0x4b0)]()?_0x169050[_0x492b79(0x268)]['updatePadding']['call'](this):this[_0x492b79(0x354)]=0x8;}}else this['addSkillTypeCommand'](_0x40afd8);}},Window_ActorCommand['prototype'][_0x444eb4(0x17a)]=function(_0x3a6e9f){const _0x394373=_0x444eb4;let _0x53eece=$dataSystem[_0x394373(0xae)][_0x3a6e9f];if(!_0x53eece)return;let _0x4f87e4=_0x53eece;const _0x55b3df=this[_0x394373(0x7f1)]();if(_0x55b3df==='text'){if(_0x394373(0x4c0)===_0x394373(0x4c0))_0x4f87e4=_0x4f87e4[_0x394373(0x2bc)](/\x1I\[(\d+)\]/gi,''),_0x4f87e4=_0x4f87e4[_0x394373(0x2bc)](/\\I\[(\d+)\]/gi,'');else{function _0xfe691f(){const _0x1df8f2=_0x394373;this[_0x1df8f2(0x12b)](_0x1df8f2(0x562),[_0x1dcb34],_0x2b3613,_0xb15d76),this['push'](_0x1df8f2(0x576),_0x32e2d4,_0x107994,_0x1df8f2(0x1e6),_0x8ee47e,!![],'Linear',!![]),this[_0x1df8f2(0x12b)](_0x1df8f2(0x6d9),[_0x365506],_0x1df8f2(0xde)),this[_0x1df8f2(0x12b)](_0x1df8f2(0x12e));}}}else{if(!_0x53eece[_0x394373(0x7db)](/\\I\[(\d+)\]/i)){const _0x34b48e=Imported[_0x394373(0x27a)]?VisuMZ[_0x394373(0x524)][_0x394373(0x90c)]['Skills']:VisuMZ[_0x394373(0x25c)][_0x394373(0x90c)][_0x394373(0x370)],_0x224836=$dataSystem['magicSkills'][_0x394373(0x8f7)](_0x3a6e9f),_0xc86082=_0x224836?_0x34b48e[_0x394373(0x3ac)]:_0x34b48e['IconStypeNorm'];_0x4f87e4=_0x394373(0x369)[_0x394373(0x4e2)](_0xc86082,_0x53eece);}}this['addCommand'](_0x4f87e4,_0x394373(0x8ea),!![],_0x3a6e9f);},Window_ActorCommand[_0x444eb4(0x268)]['addSingleSkillCommands']=function(){const _0xa2e4b1=_0x444eb4,_0xca0100=this[_0xa2e4b1(0x50c)]['skillTypes'](),_0x57bd6=this[_0xa2e4b1(0x50c)][_0xa2e4b1(0x90d)]();for(const _0x38591c of _0x57bd6){if('vLgrh'!==_0xa2e4b1(0x46d)){if(!_0x38591c)continue;if(Imported[_0xa2e4b1(0x27a)]){const _0x9f7c8d=_0xca0100['filter'](_0x149f90=>DataManager[_0xa2e4b1(0x204)](_0x38591c)[_0xa2e4b1(0x8f7)](_0x149f90));if(_0x9f7c8d[_0xa2e4b1(0x34a)]<=0x0)continue;}else{if(!_0xca0100[_0xa2e4b1(0x8f7)](_0x38591c[_0xa2e4b1(0x8af)])){if(_0xa2e4b1(0x51a)===_0xa2e4b1(0x51a))continue;else{function _0x49c8cd(){const _0x28cbec=_0xa2e4b1;this[_0x28cbec(0x6e9)](_0x476659,_0x5c6960,_0x2b671e);}}}}this[_0xa2e4b1(0x176)](_0x38591c);}else{function _0x54d9b8(){const _0x1a6728=_0xa2e4b1;this['x']=this[_0x1a6728(0x3d5)]()[_0x1a6728(0x7f2)]()[_0x1a6728(0x7f8)];}}}},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x176)]=function(_0x439b47){const _0x54465d=_0x444eb4;if(!_0x439b47)return;if(!this[_0x54465d(0xb3)](_0x439b47))return;const _0xc5337b=this[_0x54465d(0x7f1)](),_0x43847c=DataManager['battleCommandName'](_0x439b47),_0x87fc97=DataManager['battleCommandIcon'](_0x439b47),_0xb3efe4=_0xc5337b==='text'?_0x43847c:_0x54465d(0x369)['format'](_0x87fc97,_0x43847c),_0x59dc62=this[_0x54465d(0x50c)][_0x54465d(0x3f7)](_0x439b47);this[_0x54465d(0xb7)](_0xb3efe4,'singleSkill',_0x59dc62,_0x439b47['id']);},Window_ActorCommand['prototype']['canAddSkillCommand']=function(_0x3ce638){const _0xc61d5a=_0x444eb4,_0x1815ec=_0x3ce638['note'];if(_0x1815ec[_0xc61d5a(0x7db)](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0xc61d5a(0x50c)]['isLearnedSkill'](_0x3ce638['id']))return![];}if(_0x1815ec[_0xc61d5a(0x7db)](/<COMMAND REQUIRE ACCESS>/i)){if(!this['_actor']['hasSkill'](_0x3ce638['id']))return![];}const _0x29df7f=VisuMZ[_0xc61d5a(0x25c)][_0xc61d5a(0x68a)](_0x3ce638,_0xc61d5a(0x67b));if(VisuMZ[_0xc61d5a(0x25c)]['JS'][_0x29df7f]){if(_0xc61d5a(0x73e)===_0xc61d5a(0x73e)){if(!VisuMZ[_0xc61d5a(0x25c)]['JS'][_0x29df7f][_0xc61d5a(0x315)](this,this[_0xc61d5a(0x50c)],_0x3ce638))return![];}else{function _0x187cda(){const _0x4e1066=_0xc61d5a;if(!this[_0x4e1066(0x712)]()['damage'][_0x4e1066(0x915)])return 0x0;let _0x23ce34=_0x33dd73['BattleCore'][_0x4e1066(0x90c)][_0x4e1066(0x4b3)]['CriticalHitRateJS'][_0x4e1066(0x315)](this,_0x372706);return _0x23ce34=this[_0x4e1066(0x15d)][_0x4e1066(0x673)]*_0x23ce34+this[_0x4e1066(0x15d)][_0x4e1066(0x97e)],_0x23ce34;}}}return VisuMZ[_0xc61d5a(0x25c)][_0xc61d5a(0x518)](_0x3ce638);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x518)]=function(_0x338c6d){const _0x9c7dfd=_0x444eb4,_0x24b180=_0x338c6d[_0x9c7dfd(0x4bb)];if(_0x24b180[_0x9c7dfd(0x7db)](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x9c7dfd(0x294)!==_0x9c7dfd(0x294)){function _0x28208c(){const _0x587644=_0x9c7dfd;this[_0x587644(0x625)]=!![];}}else{const _0x133bba=JSON['parse']('['+RegExp['$1'][_0x9c7dfd(0x7db)](/\d+/g)+']');for(const _0x52ca82 of _0x133bba){if(_0x9c7dfd(0x7bb)!==_0x9c7dfd(0x7bb)){function _0x95576e(){const _0x1cf231=_0x9c7dfd;_0x2ae648['_autoBattle']=!![],_0x17a8c2[_0x1cf231(0x883)](),this['selectNextCommand'](),_0x16e16a['isTpb']()&&(_0x559600[_0x1cf231(0x1d5)]=![]);}}else{if(!$gameSwitches['value'](_0x52ca82))return![];}}return!![];}}if(_0x24b180[_0x9c7dfd(0x7db)](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x9c7dfd(0x85c)===_0x9c7dfd(0x85c)){const _0x30ecb5=JSON['parse']('['+RegExp['$1'][_0x9c7dfd(0x7db)](/\d+/g)+']');for(const _0x4406e0 of _0x30ecb5){if(!$gameSwitches[_0x9c7dfd(0x573)](_0x4406e0))return![];}return!![];}else{function _0x17d556(){const _0x488a0d=_0x9c7dfd;this[_0x488a0d(0x12b)]('performSubstitute',_0x1b22a9,_0x167666);if(!_0x3636a6[_0x488a0d(0x25c)]['Settings'][_0x488a0d(0x727)][_0x488a0d(0x46c)])return;const _0x57b230=_0xec87d5[_0x488a0d(0x2d2)](),_0x2a5cea=_0x44b9ee['substitute'][_0x488a0d(0x4e2)](_0x57b230,_0x40a6c8[_0x488a0d(0x2d2)]());this[_0x488a0d(0x12b)](_0x488a0d(0x86e),_0x2a5cea);}}}if(_0x24b180[_0x9c7dfd(0x7db)](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x167a3a=JSON[_0x9c7dfd(0xbd)]('['+RegExp['$1'][_0x9c7dfd(0x7db)](/\d+/g)+']');for(const _0x28bd59 of _0x167a3a){if($gameSwitches[_0x9c7dfd(0x573)](_0x28bd59))return!![];}return![];}if(_0x24b180[_0x9c7dfd(0x7db)](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x534b39=JSON[_0x9c7dfd(0xbd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1cdfd1 of _0x534b39){if(!$gameSwitches[_0x9c7dfd(0x573)](_0x1cdfd1))return!![];}return![];}if(_0x24b180['match'](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x9c7dfd(0x5e4)===_0x9c7dfd(0x5e4)){const _0x1fb2d3=JSON[_0x9c7dfd(0xbd)]('['+RegExp['$1'][_0x9c7dfd(0x7db)](/\d+/g)+']');for(const _0xbb2761 of _0x1fb2d3){if(!$gameSwitches['value'](_0xbb2761))return!![];}return![];}else{function _0x822a8f(){const _0xdd744f=_0x9c7dfd;if(!_0x2fab96)return 0x0;let _0x19000e=0x0;const _0xa6768d=_0x2780cd[_0xdd744f(0x4bb)];return _0xa6768d[_0xdd744f(0x7db)](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x19000e+=_0x3d173d(_0x5ec621['$1'])),_0xa6768d[_0xdd744f(0x7db)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x19000e+=_0x1b59a8(_0x2491b4['$1'])),_0x19000e;}}}if(_0x24b180['match'](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x336615=JSON['parse']('['+RegExp['$1'][_0x9c7dfd(0x7db)](/\d+/g)+']');for(const _0x26255a of _0x336615){if(_0x9c7dfd(0x500)===_0x9c7dfd(0x7c6)){function _0x394258(){const _0x27e577=_0x9c7dfd;return this[_0x27e577(0x69a)]()&&!this[_0x27e577(0x583)]()?this['isForOpponentBattleCore']():_0x543c5f[_0x27e577(0x25c)][_0x27e577(0x672)][_0x27e577(0x315)](this);}}else{if($gameSwitches['value'](_0x26255a))return![];}}return!![];}return!![];},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x53e)]=function(){const _0x6dc468=_0x444eb4,_0x5efbc5=this['commandStyle'](),_0x5351f7=VisuMZ[_0x6dc468(0x25c)][_0x6dc468(0x90c)][_0x6dc468(0x1cb)][_0x6dc468(0x685)],_0x2a250c=_0x5efbc5==='text'?TextManager['escape']:_0x6dc468(0x369)[_0x6dc468(0x4e2)](_0x5351f7,TextManager[_0x6dc468(0x29c)]),_0x1f7352=this['isEscapeCommandEnabled']();this[_0x6dc468(0xb7)](_0x2a250c,_0x6dc468(0x29c),_0x1f7352);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x1aa)]=function(){const _0x3c9172=_0x444eb4;return BattleManager[_0x3c9172(0x11d)]();},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x89d)]=function(){const _0x17da3c=_0x444eb4,_0x2a3a96=this['commandStyle'](),_0x5256cb=VisuMZ[_0x17da3c(0x25c)]['Settings'][_0x17da3c(0x1cb)][_0x17da3c(0x897)],_0xc0adb5=_0x2a3a96==='text'?TextManager[_0x17da3c(0x25b)]:_0x17da3c(0x369)[_0x17da3c(0x4e2)](_0x5256cb,TextManager[_0x17da3c(0x25b)]),_0x39251f=this[_0x17da3c(0xc1)]();this[_0x17da3c(0xb7)](_0xc0adb5,_0x17da3c(0x25b),_0x39251f);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0xc1)]=function(){return!![];},Window_ActorCommand[_0x444eb4(0x268)]['itemTextAlign']=function(){const _0x51716b=_0x444eb4;return VisuMZ[_0x51716b(0x25c)][_0x51716b(0x90c)][_0x51716b(0x370)][_0x51716b(0x8b0)];},Window_ActorCommand[_0x444eb4(0x268)]['drawItem']=function(_0x548336){const _0x377ea0=_0x444eb4,_0x6a1827=this[_0x377ea0(0x70b)](_0x548336);if(_0x6a1827===_0x377ea0(0x2ab)){if(_0x377ea0(0x464)!=='UQhjE')this[_0x377ea0(0x193)](_0x548336);else{function _0x344406(){const _0x197197=_0x377ea0;return this[_0x197197(0xe0)](_0x5921fd);}}}else{if(_0x6a1827===_0x377ea0(0x565))this[_0x377ea0(0x8d1)](_0x548336);else{if(_0x377ea0(0x770)!==_0x377ea0(0x770)){function _0x8a614b(){const _0x3094ff=_0x377ea0;if(!_0x428249[_0x3094ff(0x11f)]())return;if(!_0xea25f5[_0x3094ff(0x10c)])return;_0x516fa8[_0x3094ff(0x346)](_0x5191f3,_0x1c6627);const _0x13c43d=_0x497335['Actions'];_0x470fcb['_subject']&&_0x143c50[_0x3094ff(0xda)][_0x3094ff(0x87a)](_0x13c43d);}}else Window_Command[_0x377ea0(0x268)]['drawItem'][_0x377ea0(0x315)](this,_0x548336);}}this[_0x377ea0(0x90b)](_0x548336);},Window_ActorCommand['prototype'][_0x444eb4(0x7f1)]=function(){const _0x5c2bd3=_0x444eb4;return VisuMZ[_0x5c2bd3(0x25c)][_0x5c2bd3(0x90c)]['ActorCmd'][_0x5c2bd3(0xb0)];},Window_ActorCommand[_0x444eb4(0x268)]['commandStyleCheck']=function(_0xd017cf){const _0xe0324d=_0x444eb4;if(_0xd017cf<0x0)return _0xe0324d(0x7b1);const _0xc8d116=this[_0xe0324d(0x7f1)]();if(_0xc8d116!=='auto')return _0xc8d116;else{if(this['maxItems']()>0x0){const _0x1b86d9=this[_0xe0324d(0x122)](_0xd017cf);if(_0x1b86d9['match'](/\\I\[(\d+)\]/i)){const _0x3b7fc3=this[_0xe0324d(0x5c5)](_0xd017cf),_0x2eac3a=this[_0xe0324d(0x463)](_0x1b86d9)[_0xe0324d(0x592)];return _0x2eac3a<=_0x3b7fc3['width']?_0xe0324d(0x2ab):'icon';}}}return _0xe0324d(0x7b1);},Window_ActorCommand['prototype'][_0x444eb4(0x193)]=function(_0x30ef3f){const _0x16914b=_0x444eb4,_0x4f9cc6=this[_0x16914b(0x5c5)](_0x30ef3f),_0x5dd2c4=this[_0x16914b(0x122)](_0x30ef3f),_0x8578c8=this[_0x16914b(0x463)](_0x5dd2c4)[_0x16914b(0x592)];this[_0x16914b(0x264)](this['isCommandEnabled'](_0x30ef3f));const _0x3e0146=this[_0x16914b(0x3bf)]();if(_0x3e0146==='right'){if(_0x16914b(0x813)!==_0x16914b(0x6d8))this['drawTextEx'](_0x5dd2c4,_0x4f9cc6['x']+_0x4f9cc6[_0x16914b(0x592)]-_0x8578c8,_0x4f9cc6['y'],_0x8578c8);else{function _0x1a0d23(){const _0x1a3927=_0x16914b;this[_0x1a3927(0x2a3)][_0x1a3927(0x3ab)][_0x1a3927(0x8b7)](this[_0x1a3927(0x8ab)][_0x1a3927(0x896)](this)),this[_0x1a3927(0x6ab)]();}}}else{if(_0x3e0146===_0x16914b(0x373)){const _0x451dd5=_0x4f9cc6['x']+Math['floor']((_0x4f9cc6[_0x16914b(0x592)]-_0x8578c8)/0x2);this['drawTextEx'](_0x5dd2c4,_0x451dd5,_0x4f9cc6['y'],_0x8578c8);}else this[_0x16914b(0x2bb)](_0x5dd2c4,_0x4f9cc6['x'],_0x4f9cc6['y'],_0x8578c8);}},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x8d1)]=function(_0x52b93a){const _0x41fabe=_0x444eb4;this[_0x41fabe(0x122)](_0x52b93a)['match'](/\\I\[(\d+)\]/i);const _0x43e6d4=Number(RegExp['$1'])||0x0,_0xa1ebef=this[_0x41fabe(0x5c5)](_0x52b93a),_0x20b250=_0xa1ebef['x']+Math[_0x41fabe(0x10b)]((_0xa1ebef['width']-ImageManager['iconWidth'])/0x2),_0x5e46ec=_0xa1ebef['y']+(_0xa1ebef['height']-ImageManager[_0x41fabe(0x929)])/0x2;this[_0x41fabe(0x56c)](_0x43e6d4,_0x20b250,_0x5e46ec);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x90b)]=function(_0x360168){const _0x342fc8=_0x444eb4,_0x2aa270=this[_0x342fc8(0x643)](_0x360168);if(![_0x342fc8(0x606),_0x342fc8(0x6f1),_0x342fc8(0x6a3)]['includes'](_0x2aa270))return;const _0x405284=this[_0x342fc8(0x5c5)](_0x360168);let _0x459903=null;if(_0x2aa270===_0x342fc8(0x606))_0x459903=$dataSkills[this[_0x342fc8(0x50c)][_0x342fc8(0x8b5)]()];else _0x2aa270===_0x342fc8(0x6f1)?_0x459903=$dataSkills[this[_0x342fc8(0x50c)][_0x342fc8(0x7a5)]()]:_0x459903=$dataSkills[this[_0x342fc8(0x6f0)][_0x360168][_0x342fc8(0x7b3)]];this[_0x342fc8(0x23a)](this[_0x342fc8(0x50c)],_0x459903,_0x405284['x'],_0x405284['y'],_0x405284[_0x342fc8(0x592)]);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x23a)]=function(_0x4ea1dd,_0x2af839,_0x14bd0f,_0x2560cb,_0x4467c1){const _0x42e041=_0x444eb4;if(!_0x2af839)return;Imported[_0x42e041(0x27a)]?Window_Command[_0x42e041(0x268)][_0x42e041(0x23a)][_0x42e041(0x315)](this,_0x4ea1dd,_0x2af839,_0x14bd0f,_0x2560cb,_0x4467c1):Window_SkillList['prototype'][_0x42e041(0x23a)]['call'](this,_0x2af839,_0x14bd0f,_0x2560cb,_0x4467c1);},Window_ActorCommand['prototype']['hide']=function(){},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x83d)]=function(){const _0x143d53=_0x444eb4;Window_Command[_0x143d53(0x268)]['activate'][_0x143d53(0x315)](this);const _0x1cedcc=this[_0x143d53(0xac)]();_0x1cedcc===_0x143d53(0x27c)&&this[_0x143d53(0x528)]();},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0xac)]=function(){const _0x341c15=_0x444eb4;if(this[_0x341c15(0x126)])return this['_battleLayoutStyle'];return this['_battleLayoutStyle']=SceneManager['_scene'][_0x341c15(0xac)](),this[_0x341c15(0x126)];},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x4ac)]=Window_ActorCommand[_0x444eb4(0x268)]['setup'],Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x18f)]=function(_0x34764e){const _0x45590e=_0x444eb4,_0x52c3b6=this[_0x45590e(0xac)]();if(_0x34764e&&['xp',_0x45590e(0x245)]['includes'](_0x52c3b6))this['resizeWindowXPStyle'](_0x34764e);else _0x34764e&&[_0x45590e(0x27c)][_0x45590e(0x8f7)](_0x52c3b6)&&(this[_0x45590e(0x428)](_0x34764e),this['showHelpWindow']());VisuMZ[_0x45590e(0x25c)][_0x45590e(0x4ac)]['call'](this,_0x34764e),_0x34764e&&$gameTroop[_0x45590e(0x20e)]()[_0x45590e(0x34a)]>0x0&&_0x34764e[_0x45590e(0x7f2)]()&&_0x34764e[_0x45590e(0x7f2)]()[_0x45590e(0x286)]();},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0xb6)]=function(_0x14a336){const _0x411b71=_0x444eb4,_0x5a11d2=Math[_0x411b71(0x29d)](Graphics['boxWidth']/0x3),_0x3e9838=Math['round'](Graphics[_0x411b71(0x6e8)]/$gameParty[_0x411b71(0x48e)]()['length']),_0xa5829f=Math[_0x411b71(0x827)](_0x5a11d2,_0x3e9838),_0x3b8c6f=this[_0x411b71(0x337)](VisuMZ['BattleCore'][_0x411b71(0x90c)][_0x411b71(0x75c)][_0x411b71(0x67d)]),_0x4f3003=_0x3e9838*_0x14a336[_0x411b71(0x309)]()+(_0x3e9838-_0xa5829f)/0x2,_0x5da49d=SceneManager['_scene'][_0x411b71(0x6e0)]['y']-_0x3b8c6f;this[_0x411b71(0x90f)](_0x4f3003,_0x5da49d,_0xa5829f,_0x3b8c6f),this[_0x411b71(0x800)](),this['setBackgroundType'](0x1);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x428)]=function(_0x36fbea){const _0x4571c3=_0x444eb4,_0x480cf9=SceneManager[_0x4571c3(0x3a7)][_0x4571c3(0x172)]();this[_0x4571c3(0x90f)](_0x480cf9['x'],_0x480cf9['y'],_0x480cf9[_0x4571c3(0x592)],_0x480cf9[_0x4571c3(0x773)]),this[_0x4571c3(0x800)](),this['setBackgroundType'](0x0);},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x488)]=function(){const _0x53c4e0=_0x444eb4;if(this[_0x53c4e0(0x642)]){if('yDyZr'===_0x53c4e0(0x13d)){function _0x58f654(){const _0x2b7398=_0x53c4e0;if(!_0x21a95a)return 0x0;let _0xf35a1f=0x0;const _0x583921=_0x56f557[_0x2b7398(0x4bb)];return _0x583921[_0x2b7398(0x7db)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0xf35a1f+=_0x49fa16(_0x7f70fc['$1'])),_0x583921[_0x2b7398(0x7db)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0xf35a1f+=_0x7a712c(_0x41e1ff['$2'])),_0xf35a1f;}}else{const _0xfdbfb=this[_0x53c4e0(0x642)][_0x53c4e0(0x8fa)],_0x3e322c=this['width']-0x8,_0x4fca28=this[_0x53c4e0(0x773)],_0x848b77=this[_0x53c4e0(0x354)],_0x172144=ColorManager[_0x53c4e0(0x158)](),_0x4d829c=ColorManager[_0x53c4e0(0x2ae)]();this[_0x53c4e0(0x642)]['x']=0x4,_0xfdbfb[_0x53c4e0(0x900)](_0x3e322c,_0x4fca28),_0xfdbfb[_0x53c4e0(0x7bc)](0x0,0x0,_0x3e322c,_0x848b77,_0x4d829c,_0x172144,!![]),_0xfdbfb[_0x53c4e0(0x37d)](0x0,_0x848b77,_0x3e322c,_0x4fca28-_0x848b77*0x2,_0x172144),_0xfdbfb['gradientFillRect'](0x0,_0x4fca28-_0x848b77,_0x3e322c,_0x848b77,_0x172144,_0x4d829c,!![]),this['_dimmerSprite']['setFrame'](0x0,0x0,_0x3e322c,_0x4fca28);}}},Window_ActorCommand[_0x444eb4(0x268)][_0x444eb4(0x706)]=function(){const _0x37518d=_0x444eb4;if(!this['_actor'])return;const _0x48b50d=VisuMZ[_0x37518d(0x25c)][_0x37518d(0x90c)]['ActorCmd'],_0x431b84=this['currentSymbol']();switch(_0x431b84){case _0x37518d(0x606):this[_0x37518d(0x766)]($dataSkills[this[_0x37518d(0x50c)][_0x37518d(0x8b5)]()]);break;case _0x37518d(0x6f1):this[_0x37518d(0x766)]($dataSkills[this['_actor'][_0x37518d(0x7a5)]()]);break;case'skill':const _0x4e157e=_0x48b50d[_0x37518d(0x974)],_0x12519d=_0x4e157e[_0x37518d(0x4e2)]($dataSystem[_0x37518d(0xae)][this[_0x37518d(0x19b)]()]);this['_helpWindow']['setText'](_0x12519d);break;case _0x37518d(0x6a3):this['setHelpWindowItem']($dataSkills[this[_0x37518d(0x19b)]()]);break;case _0x37518d(0x712):this[_0x37518d(0x7cd)][_0x37518d(0x5a1)](_0x48b50d[_0x37518d(0x840)]);break;case _0x37518d(0x29c):this['_helpWindow']['setText'](_0x48b50d[_0x37518d(0x252)]);break;case'autoBattle':this[_0x37518d(0x7cd)]['setText'](_0x48b50d[_0x37518d(0x2da)]);break;default:this[_0x37518d(0x7cd)]['setText']('');break;}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x4d2)]=Window_BattleStatus['prototype'][_0x444eb4(0x3c7)],Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x3c7)]=function(_0x1b2b92){const _0x276af0=_0x444eb4;VisuMZ['BattleCore'][_0x276af0(0x4d2)][_0x276af0(0x315)](this,_0x1b2b92),this[_0x276af0(0x976)]();},Window_BattleStatus['prototype'][_0x444eb4(0x976)]=function(){const _0x510072=_0x444eb4;this['frameVisible']=this[_0x510072(0x4b0)]();},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0xac)]=function(){const _0x2e19f5=_0x444eb4;if(this[_0x2e19f5(0x126)])return this['_battleLayoutStyle'];return this[_0x2e19f5(0x126)]=SceneManager[_0x2e19f5(0x3a7)][_0x2e19f5(0xac)](),this[_0x2e19f5(0x126)];},Window_BattleStatus['prototype']['isFrameVisible']=function(){const _0x347780=_0x444eb4,_0x10b3c0=this['battleLayoutStyle']();switch(_0x10b3c0){case'list':case'border':return!![];break;case _0x347780(0x33d):case'xp':case _0x347780(0x245):default:return![];break;}},Window_BattleStatus[_0x444eb4(0x268)]['extraHeight']=function(){const _0x2946d0=_0x444eb4;if(this[_0x2946d0(0x4b0)]()){if('SKHfU'===_0x2946d0(0x38e))return 0x0;else{function _0x591064(){const _0x250f4a=_0x2946d0;if(this[_0x250f4a(0x47f)]())this[_0x250f4a(0x8bc)]=_0x250f4a(0x646);else this[_0x250f4a(0x499)]['length']>0x0?this['_phase']=_0x250f4a(0x646):this[_0x250f4a(0x2c3)]();}}}else return 0xa;},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x99a)]=function(){const _0x52ff7a=_0x444eb4,_0x2fc309=this['battleLayoutStyle']();switch(_0x2fc309){case _0x52ff7a(0x12c):return 0x1;break;case'xp':case'portrait':return $gameParty[_0x52ff7a(0x48e)]()[_0x52ff7a(0x34a)];break;case _0x52ff7a(0x33d):default:return $gameParty[_0x52ff7a(0x272)]();break;}},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x7a1)]=function(){const _0x2b2fc9=_0x444eb4,_0x2c81ff=this[_0x2b2fc9(0xac)]();switch(_0x2c81ff){case'list':return Window_StatusBase[_0x2b2fc9(0x268)]['itemHeight'][_0x2b2fc9(0x315)](this);break;case _0x2b2fc9(0x33d):case'xp':case _0x2b2fc9(0x245):default:return this[_0x2b2fc9(0x3a3)];break;}},Window_BattleStatus['prototype'][_0x444eb4(0x72b)]=function(){const _0x508ecc=_0x444eb4,_0x1ea2d6=this[_0x508ecc(0xac)]();switch(_0x1ea2d6){case _0x508ecc(0x12c):return Window_StatusBase[_0x508ecc(0x268)]['rowSpacing']['call'](this);break;case _0x508ecc(0x33d):case'xp':case _0x508ecc(0x245):default:return 0x0;break;}},Window_BattleStatus[_0x444eb4(0x268)]['updatePadding']=function(){const _0xc67528=_0x444eb4;if(this[_0xc67528(0x4b0)]()){if(_0xc67528(0x303)!==_0xc67528(0x303)){function _0x3bd986(){const _0x441519=_0xc67528;this[_0x441519(0xee)]();}}else Window_StatusBase['prototype']['updatePadding'][_0xc67528(0x315)](this);}else this[_0xc67528(0x354)]=0x8;},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x15c)]=function(){const _0x177c37=_0x444eb4;this[_0x177c37(0x625)]=!![];},Window_BattleStatus['prototype'][_0x444eb4(0x54f)]=function(){const _0x2062f4=_0x444eb4;Window_StatusBase[_0x2062f4(0x268)][_0x2062f4(0x54f)][_0x2062f4(0x315)](this),this[_0x2062f4(0x7e8)](),this[_0x2062f4(0x1ec)]();if(this[_0x2062f4(0xac)]()===_0x2062f4(0x27c))this[_0x2062f4(0x199)]();},Window_BattleStatus[_0x444eb4(0x268)]['updateRefresh']=function(){const _0x258de3=_0x444eb4;if(this[_0x258de3(0x625)]){if(_0x258de3(0x776)!==_0x258de3(0x776)){function _0x23b018(){const _0x30fabe=_0x258de3;if(!_0x49cf57[_0x30fabe(0x11f)]())return;const _0x3148a1=_0x3af2ac['getLastPluginCommandInterpreter']();if(!_0x3148a1)return;_0x3148a1[_0x30fabe(0x306)](_0x30fabe(0x826));}}else this[_0x258de3(0x625)]=![],this[_0x258de3(0x119)]();}},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x96e)]=function(){const _0x1604bd=_0x444eb4;Window_StatusBase[_0x1604bd(0x268)][_0x1604bd(0x96e)][_0x1604bd(0x315)](this);if(!$gameSystem['isSideView']())this['refresh']();},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x8b4)]=function(){const _0x2b9cac=_0x444eb4;if(this[_0x2b9cac(0x266)]===Window_BattleStatus)return;Window_StatusBase[_0x2b9cac(0x268)][_0x2b9cac(0x8b4)][_0x2b9cac(0x315)](this);},Window_BattleStatus[_0x444eb4(0x268)]['drawBackgroundRect']=function(_0x1c39fb){const _0xa6a362=_0x444eb4,_0x33e10d=this['battleLayoutStyle']();switch(_0x33e10d){case'xp':case _0xa6a362(0x245):break;case'default':case _0xa6a362(0x12c):default:return Window_StatusBase[_0xa6a362(0x268)][_0xa6a362(0x12d)][_0xa6a362(0x315)](this,_0x1c39fb);break;}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x41a)]=Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x484)],Window_BattleStatus[_0x444eb4(0x268)]['drawItemImage']=function(_0x21d4d7){const _0x456b1b=_0x444eb4,_0x208b25=this[_0x456b1b(0xac)]();switch(_0x208b25){case _0x456b1b(0x12c):this[_0x456b1b(0x39f)](_0x21d4d7);break;case'xp':this[_0x456b1b(0x8ad)](_0x21d4d7);break;case'portrait':this[_0x456b1b(0x84d)](_0x21d4d7);break;case _0x456b1b(0x33d):case _0x456b1b(0x27c):default:VisuMZ[_0x456b1b(0x25c)][_0x456b1b(0x41a)][_0x456b1b(0x315)](this,_0x21d4d7);break;}},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x1ef)]=function(_0xc7588d){const _0x54e490=_0x444eb4,_0xb96916=this[_0x54e490(0xac)]();if(!$gameSystem[_0x54e490(0x73c)]())this[_0x54e490(0x58d)](_0xc7588d);switch(_0xb96916){case'list':this['drawItemStatusListStyle'](_0xc7588d);break;case'xp':case _0x54e490(0x245):case'default':default:this[_0x54e490(0x276)](_0xc7588d);break;}},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x525)]=function(){const _0x202773=_0x444eb4,_0x266893=this['battleLayoutStyle']();if(['xp'][_0x202773(0x8f7)](_0x266893)&&!$gameSystem[_0x202773(0x73c)]()){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x202773(0x268)][_0x202773(0x525)][_0x202773(0x315)](this);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x58d)]=function(_0x483bba){const _0x15ab26=_0x444eb4,_0x2fbd5f=this[_0x15ab26(0x4cb)](_0x483bba)['battler']();if(!_0x2fbd5f)return;const _0x502176=this['battleLayoutStyle'](),_0x468111=this['itemRect'](_0x483bba);let _0x153c21=Math[_0x15ab26(0x29d)](_0x468111['x']+_0x468111[_0x15ab26(0x592)]/0x2);[_0x15ab26(0x12c)][_0x15ab26(0x8f7)](_0x502176)&&(_0x153c21=_0x468111[_0x15ab26(0x592)]/$gameParty[_0x15ab26(0x48e)]()[_0x15ab26(0x34a)],_0x153c21*=_0x483bba,_0x153c21+=_0x468111[_0x15ab26(0x592)]/$gameParty['battleMembers']()['length']/0x2);let _0x478d4e=Math[_0x15ab26(0x29d)](this[_0x15ab26(0x541)](_0x483bba,_0x2fbd5f,_0x468111));_0x2fbd5f[_0x15ab26(0x336)](_0x153c21,_0x478d4e),this[_0x15ab26(0x44e)](_0x2fbd5f,0x1),_0x2fbd5f[_0x15ab26(0x96e)]();},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x541)]=function(_0x2e1584,_0xb3abdc,_0x58d2ca){const _0x5e395b=_0x444eb4,_0x5045f2=VisuMZ[_0x5e395b(0x25c)][_0x5e395b(0x90c)][_0x5e395b(0x75c)],_0xbe115e=this['battleLayoutStyle']();if(_0xbe115e==='xp'){const _0x47a493=_0x5045f2[_0x5e395b(0x102)];switch(_0x47a493[_0x5e395b(0x3d1)]()[_0x5e395b(0x3af)]()){case _0x5e395b(0x108):return _0x58d2ca[_0x5e395b(0x773)]-_0xb3abdc['_shadowSprite'][_0x5e395b(0x773)]/0x4;break;case _0x5e395b(0x373):const _0x41647c=_0x5045f2[_0x5e395b(0x96d)];return(_0x58d2ca[_0x5e395b(0x773)]+(_0xb3abdc['height']||_0x41647c))/0x2;break;case'top':return 0x0;case _0x5e395b(0x2d2):default:return this[_0x5e395b(0x18d)](_0x58d2ca);break;}}else{if(_0xbe115e===_0x5e395b(0x245)){}}return _0xb3abdc[_0x5e395b(0x773)];},Window_BattleStatus['prototype'][_0x444eb4(0x39f)]=function(_0xc9c9a8){const _0x4afd4c=_0x444eb4;if(!VisuMZ[_0x4afd4c(0x25c)][_0x4afd4c(0x90c)][_0x4afd4c(0x75c)][_0x4afd4c(0x768)])return;const _0x4ae662=this['actor'](_0xc9c9a8),_0x160281=this[_0x4afd4c(0x2f1)](_0xc9c9a8);_0x160281[_0x4afd4c(0x592)]=ImageManager[_0x4afd4c(0x8f4)],_0x160281[_0x4afd4c(0x773)]-=0x2,this[_0x4afd4c(0x750)](_0x4ae662,_0x160281['x']+0x1,_0x160281['y']+0x1,_0x160281[_0x4afd4c(0x592)],_0x160281[_0x4afd4c(0x773)]);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x4a1)]=function(_0x25619f){const _0x3617ab=_0x444eb4,_0x4e8dc5=$dataSystem[_0x3617ab(0x142)]?0x4:0x3,_0x231526=_0x4e8dc5*0x80+(_0x4e8dc5-0x1)*0x8+0x4,_0x294b41=this[_0x3617ab(0x4cb)](_0x25619f),_0x10eaad=this['itemRect'](_0x25619f);let _0x18a212=_0x10eaad['x']+this[_0x3617ab(0x354)];VisuMZ[_0x3617ab(0x25c)][_0x3617ab(0x90c)]['BattleLayout'][_0x3617ab(0x768)]?_0x18a212=_0x10eaad['x']+ImageManager[_0x3617ab(0x8f4)]+0x8:_0x18a212+=ImageManager[_0x3617ab(0x92a)];const _0x354d18=Math['round'](Math[_0x3617ab(0x827)](_0x10eaad['x']+_0x10eaad['width']-_0x231526,_0x18a212)),_0x17f034=Math[_0x3617ab(0x29d)](_0x10eaad['y']+(_0x10eaad[_0x3617ab(0x773)]-Sprite_Name[_0x3617ab(0x268)][_0x3617ab(0x726)]())/0x2),_0x3ddd8e=Math[_0x3617ab(0x29d)](_0x354d18-ImageManager['iconWidth']/0x2-0x4),_0x2d4987=Math[_0x3617ab(0x29d)](_0x10eaad['y']+(_0x10eaad[_0x3617ab(0x773)]-ImageManager[_0x3617ab(0x929)])/0x2+ImageManager[_0x3617ab(0x929)]/0x2);let _0x4c7412=_0x354d18+0x88;const _0x1baf56=_0x17f034;this[_0x3617ab(0x644)](_0x294b41,_0x354d18-0x4,_0x17f034),this['placeActorName'](_0x294b41,_0x354d18,_0x17f034),this[_0x3617ab(0x688)](_0x294b41,_0x3ddd8e,_0x2d4987),this[_0x3617ab(0x4bc)](_0x294b41,'hp',_0x4c7412+0x88*0x0,_0x1baf56),this['placeGauge'](_0x294b41,'mp',_0x4c7412+0x88*0x1,_0x1baf56),$dataSystem[_0x3617ab(0x142)]&&this[_0x3617ab(0x4bc)](_0x294b41,'tp',_0x4c7412+0x88*0x2,_0x1baf56);},Window_BattleStatus[_0x444eb4(0x268)]['drawItemImageXPStyle']=function(_0x549094){const _0x100246=_0x444eb4;if(!$gameSystem[_0x100246(0x73c)]())return;VisuMZ[_0x100246(0x25c)][_0x100246(0x41a)][_0x100246(0x315)](this,_0x549094);},Window_BattleStatus['prototype'][_0x444eb4(0x276)]=function(_0xeec150){const _0xadedb9=_0x444eb4,_0x49b66b=this[_0xadedb9(0x4cb)](_0xeec150),_0x420a4e=this['itemRect'](_0xeec150),_0x1f8dcd=Math[_0xadedb9(0x29d)](_0x420a4e['x']+(_0x420a4e[_0xadedb9(0x592)]-0x80)/0x2),_0x2565a2=this[_0xadedb9(0x18d)](_0x420a4e);let _0x32041d=_0x1f8dcd-ImageManager[_0xadedb9(0x92a)]/0x2-0x4,_0x39d628=_0x2565a2+ImageManager[_0xadedb9(0x929)]/0x2;_0x32041d-ImageManager[_0xadedb9(0x92a)]/0x2<_0x420a4e['x']&&(_0x32041d=_0x1f8dcd+ImageManager[_0xadedb9(0x92a)]/0x2-0x4,_0x39d628=_0x2565a2-ImageManager[_0xadedb9(0x929)]/0x2);const _0xb3bb91=_0x1f8dcd,_0x3c39ba=this[_0xadedb9(0x40c)](_0x420a4e);this[_0xadedb9(0x644)](_0x49b66b,_0x1f8dcd,_0x2565a2),this[_0xadedb9(0x7c2)](_0x49b66b,_0x1f8dcd,_0x2565a2),this['placeStateIcon'](_0x49b66b,_0x32041d,_0x39d628),this[_0xadedb9(0x111)](_0x49b66b,_0xb3bb91,_0x3c39ba);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x146)]=function(_0x1e8a8f){const _0x232d99=_0x444eb4;if(!VisuMZ[_0x232d99(0x25c)]['Settings'][_0x232d99(0x75c)][_0x232d99(0x196)])return![];if(_0x1e8a8f['getBattlePortrait']())return!![];return Imported[_0x232d99(0x3e2)]&&_0x1e8a8f['getMenuImage']();},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x84d)]=function(_0x41a634){const _0x2acf24=_0x444eb4,_0x2fd918=this[_0x2acf24(0x4cb)](_0x41a634);if(this[_0x2acf24(0x146)](_0x2fd918)){const _0x2876b0=_0x2acf24(0x63b)['format'](_0x2fd918['actorId']()),_0x5580df=this[_0x2acf24(0x329)](_0x2876b0,Sprite),_0x1b273c=_0x2fd918[_0x2acf24(0x402)]();if(_0x1b273c!==''){if(_0x2acf24(0x809)!==_0x2acf24(0x809)){function _0x1b7877(){return![];}}else _0x5580df['bitmap']=ImageManager[_0x2acf24(0x7d9)](_0x1b273c);}else _0x5580df['bitmap']=ImageManager[_0x2acf24(0x1a5)];const _0x8fd412=this[_0x2acf24(0x2f1)](_0x41a634);_0x5580df[_0x2acf24(0x72a)]['x']=0.5,_0x5580df[_0x2acf24(0x72a)]['y']=0x1;const _0xffae2d=Math[_0x2acf24(0x29d)](_0x8fd412['x']+_0x8fd412['width']/0x2)+this[_0x2acf24(0x354)],_0x32e7f3=Math['round'](this[_0x2acf24(0x773)]);_0x5580df['move'](_0xffae2d,_0x32e7f3);const _0x1b3d62=VisuMZ['BattleCore'][_0x2acf24(0x90c)][_0x2acf24(0x75c)]['PortraitScale'];_0x5580df['scale']['x']=_0x1b3d62,_0x5580df[_0x2acf24(0x731)]['y']=_0x1b3d62,_0x5580df[_0x2acf24(0x96e)]();}else{const _0x172f4b=this[_0x2acf24(0x133)](_0x41a634);this[_0x2acf24(0x750)](_0x2fd918,_0x172f4b['x'],_0x172f4b['y'],_0x172f4b[_0x2acf24(0x592)],_0x172f4b[_0x2acf24(0x773)]);}},Window_BattleStatus[_0x444eb4(0x268)]['createInnerPortrait']=function(_0x285b7d,_0x14ce00){const _0x147694=_0x444eb4,_0x478e91=this[_0x147694(0x875)];if(_0x478e91[_0x285b7d])return _0x478e91[_0x285b7d];else{if('xzltY'!=='eMBIB'){const _0x51e992=new _0x14ce00();return _0x478e91[_0x285b7d]=_0x51e992,this[_0x147694(0x228)](_0x51e992),this[_0x147694(0x228)](this[_0x147694(0x2c8)]),_0x51e992;}else{function _0x2085c9(){const _0x29a3cd=_0x147694;_0x312421[_0x29a3cd(0x25c)][_0x29a3cd(0x247)][_0x29a3cd(0x315)](this),this['attachSpritesToDistortionSprite']();}}}},Window_BattleStatus[_0x444eb4(0x268)]['_createClientArea']=function(){const _0x242b9e=_0x444eb4;this[_0x242b9e(0x74c)](),this['_createEffectsContainer'](),Window_StatusBase[_0x242b9e(0x268)]['_createClientArea'][_0x242b9e(0x315)](this),this[_0x242b9e(0x343)]();},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x74c)]=function(){const _0x4157c1=_0x444eb4;this[_0x4157c1(0x2c8)]=new Sprite(),this[_0x4157c1(0x2c8)]['filters']=[new PIXI['filters'][(_0x4157c1(0x5ba))]()],this[_0x4157c1(0x2c8)][_0x4157c1(0x91a)]=new Rectangle(),this['_cursorArea'][_0x4157c1(0x90f)](this[_0x4157c1(0x77f)],this['_padding']),this[_0x4157c1(0x86a)](this['_cursorArea']);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x5d3)]=function(){const _0x4b96dd=_0x444eb4;this[_0x4b96dd(0x485)]=new Sprite(),this[_0x4b96dd(0x86a)](this[_0x4b96dd(0x485)]);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x343)]=function(){const _0x15bcec=_0x444eb4;this[_0x15bcec(0x6cb)]=new Sprite(),this[_0x15bcec(0x86a)](this['_damageContainer']);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x638)]=function(){const _0x97a95=_0x444eb4;this[_0x97a95(0x664)]=new Sprite();for(let _0x1479c5=0x0;_0x1479c5<0x9;_0x1479c5++){if(_0x97a95(0x796)===_0x97a95(0x796))this[_0x97a95(0x664)]['addChild'](new Sprite());else{function _0x2392a0(){const _0x5b0340=_0x97a95;for(const _0x3a6146 of _0x281871){const _0x569965=_0x14cd21[0x0]['format'](_0x3a6146[0x0]),_0x2d2bd3=_0x398efe[0x1]['format'](_0x3a6146[0x1]),_0x426742=new _0x34b84a(_0x260dc8[_0x5b0340(0x4e2)](_0x2d2bd3),'i');_0x4ab5dc[_0x569965]=_0x426742;}}}}this[_0x97a95(0x2c8)][_0x97a95(0x86a)](this['_cursorSprite']);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x123)]=function(){const _0x46a31b=_0x444eb4;Window_StatusBase['prototype']['_updateClientArea'][_0x46a31b(0x315)](this),this[_0x46a31b(0x376)]();},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x376)]=function(){const _0x1b1e08=_0x444eb4,_0x580365=this['_padding'];this[_0x1b1e08(0x2c8)][_0x1b1e08(0x90f)](_0x580365,_0x580365),this['_cursorArea']['x']=_0x580365-this[_0x1b1e08(0x2e6)]['x'],this[_0x1b1e08(0x2c8)]['y']=_0x580365-this[_0x1b1e08(0x2e6)]['y'];if(this['innerWidth']>0x0&&this[_0x1b1e08(0x3a3)]>0x0)this['_cursorArea'][_0x1b1e08(0x693)]=this['isOpen']();else{if(_0x1b1e08(0x512)!==_0x1b1e08(0x811))this[_0x1b1e08(0x2c8)][_0x1b1e08(0x693)]=![];else{function _0x183686(){const _0x1d549f=_0x1b1e08;if(!_0x1b2015[_0x1d549f(0x73c)]())return;const _0x314e9e=this[_0x1d549f(0x7f2)]();if(!_0x314e9e)return;_0x314e9e[_0x1d549f(0x925)](_0xf5f50d,_0x1ae6fe,_0x158ab7);}}}},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x101)]=function(){const _0x341fc9=_0x444eb4;Window_StatusBase[_0x341fc9(0x268)][_0x341fc9(0x101)][_0x341fc9(0x315)](this),this[_0x341fc9(0x260)]();},Window_BattleStatus['prototype'][_0x444eb4(0x260)]=function(){const _0x1a3af0=_0x444eb4,_0x50117=this[_0x1a3af0(0x2c8)][_0x1a3af0(0x1cc)][_0x1a3af0(0x5ea)](new Point(0x0,0x0)),_0x4b3140=this['_cursorArea'][_0x1a3af0(0x91a)];_0x4b3140['x']=_0x50117['x']+this[_0x1a3af0(0x2e6)]['x'],_0x4b3140['y']=_0x50117['y']+this[_0x1a3af0(0x2e6)]['y'],_0x4b3140['width']=this['innerWidth'],_0x4b3140[_0x1a3af0(0x773)]=this[_0x1a3af0(0x3a3)];},Window_BattleStatus[_0x444eb4(0x268)]['refreshActorPortrait']=function(_0x2d9957){const _0x5deb71=_0x444eb4;if(this[_0x5deb71(0xac)]()!==_0x5deb71(0x245))return;this[_0x5deb71(0x84d)](_0x2d9957['index']());},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x5b7)]=function(_0x2ca60d,_0x125d49){const _0x1edadd=_0x444eb4;if(!this[_0x1edadd(0x6cb)])return;if(!_0x2ca60d)return;if(!_0x125d49)return;const _0x14c8e4=this[_0x1edadd(0x2f1)](_0x125d49['index']());_0x14c8e4['x']+=_0x14c8e4[_0x1edadd(0x592)]/0x2+this['padding'],_0x2ca60d['x']=_0x14c8e4['x'],_0x2ca60d['y']=_0x14c8e4['y'],this[_0x1edadd(0x6cb)][_0x1edadd(0x86a)](_0x2ca60d);},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x6e7)]=function(_0x3f68f5){const _0x301aea=_0x444eb4;if(!this[_0x301aea(0x6cb)])return;if(!_0x3f68f5)return;this[_0x301aea(0x6cb)][_0x301aea(0x910)](_0x3f68f5);},Window_BattleStatus['prototype']['updateBorderStyle']=function(){const _0x3d76c1=_0x444eb4;if(!this[_0x3d76c1(0x71f)]())return;if(!this[_0x3d76c1(0x829)])this[_0x3d76c1(0x44a)]();this['prepareBorderActor'](),this[_0x3d76c1(0x999)]();},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x71f)]=function(){const _0x239a48=_0x444eb4;if(this[_0x239a48(0x266)]!==Window_BattleStatus)return![];if(!SceneManager[_0x239a48(0x11f)]())return![];return VisuMZ[_0x239a48(0x25c)][_0x239a48(0x90c)][_0x239a48(0x75c)][_0x239a48(0x3aa)];},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x44a)]=function(){const _0x288c11=_0x444eb4;this[_0x288c11(0x829)]=new Sprite();const _0x2014d9=SceneManager[_0x288c11(0x3a7)],_0x1bea14=_0x2014d9['children'][_0x288c11(0x221)](_0x2014d9[_0x288c11(0x2fe)]);_0x2014d9[_0x288c11(0x44e)](this['_borderPortraitSprite'],_0x1bea14),this[_0x288c11(0x829)][_0x288c11(0x72a)]['x']=0.5,this[_0x288c11(0x829)][_0x288c11(0x72a)]['y']=0x1;const _0x50e28c=VisuMZ[_0x288c11(0x25c)][_0x288c11(0x90c)][_0x288c11(0x75c)]['PortraitScaleBorderStyle'];this[_0x288c11(0x829)][_0x288c11(0x731)]['x']=_0x50e28c,this['_borderPortraitSprite'][_0x288c11(0x731)]['y']=_0x50e28c,this['_borderPortraitSprite']['y']=this['y']+this[_0x288c11(0x773)],this[_0x288c11(0x71c)]=0x0;},Window_BattleStatus['prototype'][_0x444eb4(0x4e3)]=function(){const _0xfe4562=_0x444eb4;this[_0xfe4562(0x829)][_0xfe4562(0x693)]=BattleManager['isInputting']();const _0x21cc75=BattleManager['actor']();if(_0x21cc75===this['_borderPortraitSprite']['actor'])return;this[_0xfe4562(0x829)][_0xfe4562(0x4cb)]=_0x21cc75||this[_0xfe4562(0x829)][_0xfe4562(0x4cb)];if(!_0x21cc75)return;else{if(_0x21cc75[_0xfe4562(0x402)]()===''){this[_0xfe4562(0x829)][_0xfe4562(0x8fa)]=ImageManager[_0xfe4562(0x1a5)];return;}else{if('SPnfl'===_0xfe4562(0x782)){function _0x5ca960(){return!![];}}else{const _0x5a0087=ImageManager[_0xfe4562(0x7d9)](_0x21cc75[_0xfe4562(0x402)]());_0x5a0087[_0xfe4562(0x80a)](this[_0xfe4562(0x694)][_0xfe4562(0x896)](this,_0x5a0087));}}}},Window_BattleStatus[_0x444eb4(0x268)][_0x444eb4(0x694)]=function(_0x1f8171){const _0x2ad217=_0x444eb4;this[_0x2ad217(0x71c)]=0x14,this[_0x2ad217(0x829)]['bitmap']=_0x1f8171,SceneManager['_scene'][_0x2ad217(0x23c)]()?(this[_0x2ad217(0x829)]['x']=0x0,this[_0x2ad217(0x37e)]=Math['ceil'](_0x1f8171['width']/0x2)):(this[_0x2ad217(0x829)]['x']=this['width'],this[_0x2ad217(0x37e)]=this[_0x2ad217(0x592)]*0x3/0x4),this['_borderPortraitSprite']['opacity']=0x0;},Window_BattleStatus[_0x444eb4(0x268)]['updateBorderSprite']=function(){const _0x416873=_0x444eb4;if(this[_0x416873(0x71c)]>0x0){const _0x16a77c=this[_0x416873(0x71c)],_0x18754c=this[_0x416873(0x829)];_0x18754c['x']=(_0x18754c['x']*(_0x16a77c-0x1)+this[_0x416873(0x37e)])/_0x16a77c,_0x18754c[_0x416873(0x30b)]=(_0x18754c['opacity']*(_0x16a77c-0x1)+0xff)/_0x16a77c,this['_borderPortraitDuration']--;}},Window_BattleStatus[_0x444eb4(0x268)]['updateEffectContainers']=function(){const _0x40ebda=_0x444eb4;return;this[_0x40ebda(0x485)]&&(this[_0x40ebda(0x485)]['x']=this['x'],this[_0x40ebda(0x485)]['y']=this['y']),this[_0x40ebda(0x6cb)]&&(this[_0x40ebda(0x6cb)]['x']=this['x'],this[_0x40ebda(0x6cb)]['y']=this['y']);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x91c)]=Window_BattleEnemy['prototype'][_0x444eb4(0x3c7)],Window_BattleEnemy['prototype']['initialize']=function(_0x3d7c1a){const _0xcddef6=_0x444eb4;this['_lastEnemy']=null,VisuMZ[_0xcddef6(0x25c)][_0xcddef6(0x91c)][_0xcddef6(0x315)](this,_0x3d7c1a);},Window_BattleEnemy[_0x444eb4(0x268)][_0x444eb4(0x99a)]=function(){const _0x1670f6=_0x444eb4;return this[_0x1670f6(0x2e3)]();},VisuMZ['BattleCore'][_0x444eb4(0x79c)]=Window_BattleEnemy[_0x444eb4(0x268)]['show'],Window_BattleEnemy[_0x444eb4(0x268)][_0x444eb4(0x96e)]=function(){const _0x32e8e0=_0x444eb4;VisuMZ['BattleCore'][_0x32e8e0(0x79c)]['call'](this),this['y']=Graphics[_0x32e8e0(0x773)]*0xa;},Window_BattleEnemy['prototype'][_0x444eb4(0x14a)]=function(){const _0x5ce41f=_0x444eb4;return $gameTroop[_0x5ce41f(0x20e)]()[_0x5ce41f(0x749)](0x0);},Window_BattleEnemy[_0x444eb4(0x268)]['refresh']=function(){const _0x360b98=_0x444eb4;this[_0x360b98(0x35f)]=this[_0x360b98(0x14a)](),this['sortEnemies'](),Window_Selectable[_0x360b98(0x268)]['refresh']['call'](this);},Window_BattleEnemy['prototype'][_0x444eb4(0x647)]=function(){const _0x3a1880=_0x444eb4;this[_0x3a1880(0x35f)][_0x3a1880(0x8b7)]((_0xf7cbf9,_0x528c2c)=>{const _0x2c2d7b=_0x3a1880;if(_0xf7cbf9[_0x2c2d7b(0x7f2)]()[_0x2c2d7b(0x7f8)]===_0x528c2c[_0x2c2d7b(0x7f2)]()[_0x2c2d7b(0x7f8)]){if(_0x2c2d7b(0x3c2)!==_0x2c2d7b(0x3c2)){function _0x427b60(){const _0x378e1a=_0x2c2d7b;this[_0x378e1a(0x5e1)][_0x378e1a(0x86a)](_0x2b853e);}}else return _0xf7cbf9[_0x2c2d7b(0x7f2)]()[_0x2c2d7b(0x29f)]-_0x528c2c['battler']()[_0x2c2d7b(0x29f)];}else return _0xf7cbf9[_0x2c2d7b(0x7f2)]()['_baseX']-_0x528c2c['battler']()[_0x2c2d7b(0x7f8)];}),SceneManager[_0x3a1880(0x35e)]()&&this[_0x3a1880(0x35f)][_0x3a1880(0x1b7)]();},Window_BattleEnemy['prototype']['autoSelect']=function(){const _0x52cfdc=_0x444eb4,_0x11eb60=VisuMZ['BattleCore'][_0x52cfdc(0x90c)][_0x52cfdc(0x874)];if(_0x11eb60[_0x52cfdc(0x75b)]){if('rZfne'===_0x52cfdc(0x35c)){function _0x7e6f5d(){const _0x3bc238=_0x52cfdc;this[_0x3bc238(0x807)]['svAnchorX']=_0x98cc84['prototype'][_0x3bc238(0x786)][_0x3bc238(0x315)](this);}}else this[_0x52cfdc(0x885)]();}else this[_0x52cfdc(0x526)]();},Window_BattleEnemy[_0x444eb4(0x268)][_0x444eb4(0x885)]=function(){const _0x2b0b41=_0x444eb4;if(this[_0x2b0b41(0x978)]&&this['_enemies'][_0x2b0b41(0x8f7)](this[_0x2b0b41(0x978)])){const _0xd89c1c=this[_0x2b0b41(0x35f)][_0x2b0b41(0x221)](this[_0x2b0b41(0x978)]);this[_0x2b0b41(0x322)](_0xd89c1c);}else{if(_0x2b0b41(0x277)!==_0x2b0b41(0x277)){function _0x1373a4(){const _0x11e427=_0x2b0b41;if(!this[_0x11e427(0x911)]())return![];return _0xa3396a[_0x11e427(0x25c)][_0x11e427(0x63f)][_0x11e427(0x315)](this);}}else this[_0x2b0b41(0x526)]();}},Window_BattleEnemy['prototype'][_0x444eb4(0x526)]=function(){const _0x1ad125=_0x444eb4,_0x5c0f66=VisuMZ[_0x1ad125(0x25c)][_0x1ad125(0x90c)][_0x1ad125(0x874)];let _0x29e8c6=![];if($gameSystem[_0x1ad125(0x73c)]())_0x29e8c6=_0x5c0f66[_0x1ad125(0x950)];else{if(_0x1ad125(0x2f3)!=='oRjNs'){function _0x36fd36(){_0x1c6709=_0x3aeae8>=_0x30a1e0?_0x53d49a:_0xcb7fdf;}}else _0x29e8c6=_0x5c0f66[_0x1ad125(0x849)];}this[_0x1ad125(0x322)](_0x29e8c6?this[_0x1ad125(0x2e3)]()-0x1:0x0);},Window_BattleEnemy['prototype'][_0x444eb4(0x2fa)]=function(){const _0x543a6d=_0x444eb4;Window_Selectable[_0x543a6d(0x268)][_0x543a6d(0x2fa)]['call'](this),this[_0x543a6d(0x978)]=this[_0x543a6d(0x3d5)]();};function Window_AutoBattleCancel(){const _0xe726c3=_0x444eb4;this[_0xe726c3(0x3c7)](...arguments);}Window_AutoBattleCancel[_0x444eb4(0x268)]=Object[_0x444eb4(0x868)](Window_Base[_0x444eb4(0x268)]),Window_AutoBattleCancel[_0x444eb4(0x268)][_0x444eb4(0x266)]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x444eb4(0x268)][_0x444eb4(0x3c7)]=function(_0x641d90){const _0x319116=_0x444eb4;Window_Base[_0x319116(0x268)][_0x319116(0x3c7)][_0x319116(0x315)](this,_0x641d90),this[_0x319116(0x71a)](this[_0x319116(0x963)]()),this['refresh']();},Window_AutoBattleCancel[_0x444eb4(0x268)][_0x444eb4(0x963)]=function(){const _0x36798a=_0x444eb4;return VisuMZ['BattleCore'][_0x36798a(0x90c)]['AutoBattle'][_0x36798a(0x446)];},Window_AutoBattleCancel[_0x444eb4(0x268)][_0x444eb4(0x119)]=function(){const _0x54063d=_0x444eb4;this[_0x54063d(0x99c)]['clear']();const _0x3f39c1=VisuMZ[_0x54063d(0x25c)][_0x54063d(0x90c)][_0x54063d(0x49d)][_0x54063d(0x5f1)],_0x27563e=_0x3f39c1['format'](this['okButtonText'](),this[_0x54063d(0x959)]()),_0xe98818=this[_0x54063d(0x463)](_0x27563e)[_0x54063d(0x592)],_0x2f7482=Math[_0x54063d(0x10b)]((this[_0x54063d(0x5e5)]-_0xe98818)/0x2);this[_0x54063d(0x2bb)](_0x27563e,_0x2f7482,0x0,_0xe98818);},Window_AutoBattleCancel[_0x444eb4(0x268)]['okButtonText']=function(){const _0x592756=_0x444eb4;if(Imported[_0x592756(0x305)]){if(_0x592756(0xb5)!==_0x592756(0x6b2))return TextManager[_0x592756(0x246)]('ok');else{function _0x398e39(){const _0x2dfd61=_0x592756;_0x573c50[_0x2dfd61(0x12b)](new _0x4f4ffb(_0x4c639e));}}}else{if(_0x592756(0x8f0)==='zHiPG'){function _0x4788db(){const _0x1f8656=_0x592756;this[_0x1f8656(0x566)]=_0x18ab99,this['_animationCount']=-0x1,this['_pattern']=0x0,this[_0x1f8656(0x293)](),this[_0x1f8656(0x339)]();}}else return VisuMZ[_0x592756(0x25c)][_0x592756(0x90c)][_0x592756(0x49d)][_0x592756(0x4bf)];}},Window_AutoBattleCancel[_0x444eb4(0x268)]['cancelButtonText']=function(){const _0x2c6b7c=_0x444eb4;if(Imported[_0x2c6b7c(0x305)])return TextManager[_0x2c6b7c(0x246)]('cancel');else{if('OcNOA'!==_0x2c6b7c(0x7c3)){function _0x348b60(){const _0x1b9c7d=_0x2c6b7c;_0x3d440b=_0xb5c14f[_0x1b9c7d(0x3ec)](_0x900b8f[_0x1b9c7d(0x671)](_0xc7ab2a));}}else return VisuMZ[_0x2c6b7c(0x25c)][_0x2c6b7c(0x90c)][_0x2c6b7c(0x49d)][_0x2c6b7c(0x80c)];}},Window_AutoBattleCancel['prototype'][_0x444eb4(0x54f)]=function(){const _0x3073ac=_0x444eb4;Window_Base[_0x3073ac(0x268)][_0x3073ac(0x54f)]['call'](this),this['updateVisibility'](),this[_0x3073ac(0x1b9)]();},Window_AutoBattleCancel['prototype'][_0x444eb4(0x164)]=function(){this['visible']=BattleManager['_autoBattle'];},Window_AutoBattleCancel[_0x444eb4(0x268)][_0x444eb4(0x1b9)]=function(){const _0x3c2e12=_0x444eb4;if(!BattleManager[_0x3c2e12(0xcc)])return;(Input[_0x3c2e12(0x149)]('ok')||Input['isTriggered']('cancel')||TouchInput['isClicked']()||TouchInput['isCancelled']())&&(SoundManager['playCancel'](),BattleManager[_0x3c2e12(0xcc)]=![],Input[_0x3c2e12(0x7f0)](),TouchInput[_0x3c2e12(0x7f0)]());};function Window_EnemyName(){const _0xab28f5=_0x444eb4;this[_0xab28f5(0x3c7)](...arguments);}Window_EnemyName[_0x444eb4(0x268)]=Object['create'](Window_Base[_0x444eb4(0x268)]),Window_EnemyName[_0x444eb4(0x268)][_0x444eb4(0x266)]=Window_EnemyName,Window_EnemyName[_0x444eb4(0x268)]['initialize']=function(_0x8c7570){const _0x32c6c2=_0x444eb4;this['_enemyID']=_0x8c7570,this['_text']='';const _0x222020=new Rectangle(0x0,0x0,Graphics['boxWidth'],this[_0x32c6c2(0x2c0)]()*0x4);Window_Base[_0x32c6c2(0x268)][_0x32c6c2(0x3c7)][_0x32c6c2(0x315)](this,_0x222020),this[_0x32c6c2(0x71a)](0x2),this[_0x32c6c2(0x42d)]=0x0;},Window_EnemyName['prototype']['updatePadding']=function(){const _0x32107a=_0x444eb4;this[_0x32107a(0x354)]=0x0;},Window_EnemyName[_0x444eb4(0x268)]['enemy']=function(){const _0x5325e9=_0x444eb4;return $gameTroop[_0x5325e9(0x7ad)]()[this[_0x5325e9(0x93c)]];},Window_EnemyName['prototype']['update']=function(){const _0x101627=_0x444eb4;Window_Base[_0x101627(0x268)][_0x101627(0x54f)]['call'](this);if(this[_0x101627(0x3d5)]()&&this[_0x101627(0x3d5)]()['name']()!==this['_text'])this[_0x101627(0x119)]();this[_0x101627(0x725)](),this[_0x101627(0x4f1)]();},Window_EnemyName[_0x444eb4(0x268)][_0x444eb4(0x725)]=function(){const _0x33670e=_0x444eb4;if(!this['enemy']()){if(this[_0x33670e(0x42d)]>0x0)this['contentsOpacity']-=0x10;}else{if(this[_0x33670e(0x3d5)]()['isDead']()){if(_0x33670e(0x561)===_0x33670e(0x561)){if(this[_0x33670e(0x42d)]>0x0)this[_0x33670e(0x42d)]-=0x10;}else{function _0xe91ac3(){const _0x338bc7=_0x33670e;this[_0x338bc7(0x12b)](_0x338bc7(0x57d),_0x69ccb9);}}}else{if(SceneManager[_0x33670e(0x3a7)][_0x33670e(0xdc)]&&SceneManager[_0x33670e(0x3a7)][_0x33670e(0xdc)][_0x33670e(0x7e0)]&&SceneManager[_0x33670e(0x3a7)][_0x33670e(0xdc)][_0x33670e(0x35f)][_0x33670e(0x8f7)](this[_0x33670e(0x3d5)]())){if('ItBdD'!==_0x33670e(0x2ad)){if(this[_0x33670e(0x42d)]<0xff)this[_0x33670e(0x42d)]+=0x10;}else{function _0x1b7633(){const _0x526338=_0x33670e;this[_0x526338(0x30f)][_0x526338(0x21d)](this[_0x526338(0x7cd)]),this[_0x526338(0x406)][_0x526338(0x21d)](this[_0x526338(0x7cd)]);}}}else this[_0x33670e(0x42d)]>0x0&&(this[_0x33670e(0x42d)]-=0x10);}}},Window_EnemyName[_0x444eb4(0x268)][_0x444eb4(0x4f1)]=function(){const _0x1b398e=_0x444eb4;if(!this[_0x1b398e(0x3d5)]())return;if(SceneManager[_0x1b398e(0x35e)]()){if('zrnmt'!==_0x1b398e(0x30c)){function _0x4d3d57(){const _0x33dff5=_0x1b398e;let _0x13708b=[];for(const _0x283985 of _0x1c4735){_0x13708b=_0x13708b[_0x33dff5(0x3ec)](_0x33020d['ConvertActionSequenceTarget'](_0x283985));}return _0x13708b[_0x33dff5(0x34b)](_0x4c633d=>_0x4c633d);}}else this['x']=Graphics[_0x1b398e(0x6e8)]-this[_0x1b398e(0x3d5)]()[_0x1b398e(0x7f2)]()[_0x1b398e(0x7f8)];}else this['x']=this[_0x1b398e(0x3d5)]()[_0x1b398e(0x7f2)]()[_0x1b398e(0x7f8)];this['x']-=Math[_0x1b398e(0x29d)](this['width']/0x2),this['y']=this[_0x1b398e(0x3d5)]()[_0x1b398e(0x7f2)]()[_0x1b398e(0x29f)]-Math[_0x1b398e(0x29d)](this[_0x1b398e(0x2c0)]()*1.5);const _0x1d2521=VisuMZ[_0x1b398e(0x25c)][_0x1b398e(0x90c)][_0x1b398e(0x874)];this['x']+=_0x1d2521['NameOffsetX']||0x0,this['y']+=_0x1d2521[_0x1b398e(0x37c)]||0x0;},Window_EnemyName[_0x444eb4(0x268)][_0x444eb4(0xe7)]=function(){const _0x81024b=_0x444eb4;Window_Base[_0x81024b(0x268)]['resetFontSettings'][_0x81024b(0x315)](this),this[_0x81024b(0x99c)][_0x81024b(0x2f2)]=VisuMZ[_0x81024b(0x25c)][_0x81024b(0x90c)][_0x81024b(0x874)][_0x81024b(0x459)];},Window_EnemyName[_0x444eb4(0x268)][_0x444eb4(0x119)]=function(){const _0x83d83a=_0x444eb4;this[_0x83d83a(0x99c)][_0x83d83a(0x7f0)]();if(!this[_0x83d83a(0x3d5)]())return;this[_0x83d83a(0x211)]=this[_0x83d83a(0x3d5)]()['name']();const _0x4a95e0=this[_0x83d83a(0x463)](this['_text'])[_0x83d83a(0x592)],_0x4bcce6=Math[_0x83d83a(0x29d)]((this[_0x83d83a(0x5e5)]-_0x4a95e0)/0x2);this['drawTextEx'](this[_0x83d83a(0x211)],_0x4bcce6,0x0,_0x4a95e0+0x8);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x6dd)]=function(){const _0x584514=_0x444eb4;return VisuMZ[_0x584514(0x25c)]['Settings'][_0x584514(0x727)]['MaxLines'];},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x230)]=function(){const _0x10f54e=_0x444eb4;return VisuMZ['BattleCore'][_0x10f54e(0x90c)][_0x10f54e(0x727)]['MessageWait'];},Window_BattleLog['prototype'][_0x444eb4(0x86b)]=function(){const _0x547609=_0x444eb4;return VisuMZ[_0x547609(0x25c)]['Settings'][_0x547609(0x727)][_0x547609(0x4b6)];},Window_BattleLog[_0x444eb4(0x268)]['isFastForward']=function(){return![];},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x1ae)]=function(_0x821a9c,_0x4f3e07){const _0x7b3615=_0x444eb4;this[_0x7b3615(0x6eb)]('actionSplicePoint'),BattleManager['invokeAction'](_0x821a9c,_0x4f3e07),this[_0x7b3615(0x790)]();},Window_BattleLog[_0x444eb4(0x268)]['actionSplicePoint']=function(){this['callNextMethod']();},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x12b)]=function(_0x12e4a9){const _0x13d5af=_0x444eb4,_0x5c636b=Array[_0x13d5af(0x268)][_0x13d5af(0x749)][_0x13d5af(0x315)](arguments,0x1),_0x44a9ca={'name':_0x12e4a9,'params':_0x5c636b},_0xdf004f=this[_0x13d5af(0x692)][_0x13d5af(0x99d)](_0x588249=>_0x588249[_0x13d5af(0x2d2)])['indexOf']('actionSplicePoint');_0xdf004f>=0x0?this['_methods'][_0x13d5af(0x842)](_0xdf004f,0x0,_0x44a9ca):this[_0x13d5af(0x692)]['push'](_0x44a9ca);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x6eb)]=function(_0x2f2067){const _0x593fb1=_0x444eb4,_0x4c6706=Array[_0x593fb1(0x268)][_0x593fb1(0x749)][_0x593fb1(0x315)](arguments,0x1);this[_0x593fb1(0x692)][_0x593fb1(0x6eb)]({'name':_0x2f2067,'params':_0x4c6706});},Window_BattleLog['prototype'][_0x444eb4(0x87e)]=function(){const _0x49e56d=_0x444eb4;if(!$gameTemp[_0x49e56d(0x50b)]())return;console[_0x49e56d(0x61e)](this[_0x49e56d(0x692)]['map'](_0x2dbc0a=>_0x2dbc0a['name'])[_0x49e56d(0x103)]('\x0a'));},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x536)]=Window_BattleLog[_0x444eb4(0x268)]['refresh'],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x119)]=function(){const _0x2d3517=_0x444eb4;this[_0x2d3517(0x625)]=!![];},VisuMZ['BattleCore'][_0x444eb4(0x504)]=Window_BattleLog[_0x444eb4(0x268)]['update'],Window_BattleLog['prototype'][_0x444eb4(0x54f)]=function(){const _0x4aa509=_0x444eb4;VisuMZ['BattleCore'][_0x4aa509(0x504)][_0x4aa509(0x315)](this);if(this[_0x4aa509(0x625)])this[_0x4aa509(0x451)]();},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x451)]=function(){const _0x290d2e=_0x444eb4;this[_0x290d2e(0x625)]=![],VisuMZ[_0x290d2e(0x25c)]['Window_BattleLog_refresh'][_0x290d2e(0x315)](this);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x835)]=function(_0x4fe433){const _0x5bd6fb=_0x444eb4;let _0x58bcc8=VisuMZ[_0x5bd6fb(0x25c)]['Settings'][_0x5bd6fb(0x727)][_0x5bd6fb(0x587)]['toLowerCase']()['trim'](),_0x397112=this[_0x5bd6fb(0x656)][_0x4fe433];if(_0x397112[_0x5bd6fb(0x7db)](/<LEFT>/i))_0x58bcc8='left';else{if(_0x397112[_0x5bd6fb(0x7db)](/<CENTER>/i))_0x58bcc8=_0x5bd6fb(0x373);else{if(_0x397112[_0x5bd6fb(0x7db)](/<RIGHT>/i)){if(_0x5bd6fb(0xe3)===_0x5bd6fb(0xe3))_0x58bcc8='right';else{function _0xce1b98(){const _0x58c22d=_0x5bd6fb;_0x239d9c[_0x58c22d(0x516)]();}}}}}_0x397112=_0x397112['replace'](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x397112=_0x397112[_0x5bd6fb(0x2bc)](/\\I\[0\]/gi,'');const _0x42486b=this[_0x5bd6fb(0x755)](_0x4fe433);this['contents'][_0x5bd6fb(0x13e)](_0x42486b['x'],_0x42486b['y'],_0x42486b[_0x5bd6fb(0x592)],_0x42486b['height']);const _0x41758d=this[_0x5bd6fb(0x463)](_0x397112)[_0x5bd6fb(0x592)];let _0x5a3c39=_0x42486b['x'];if(_0x58bcc8==='center')_0x5a3c39+=(_0x42486b[_0x5bd6fb(0x592)]-_0x41758d)/0x2;else{if(_0x58bcc8==='right'){if('OJDeE'!==_0x5bd6fb(0x4e8)){function _0x3ce5fd(){_0x3cbce8['snapForBackground']();}}else _0x5a3c39+=_0x42486b[_0x5bd6fb(0x592)]-_0x41758d;}}this[_0x5bd6fb(0x2bb)](_0x397112,_0x5a3c39,_0x42486b['y'],_0x41758d+0x8);},Window_BattleLog['prototype'][_0x444eb4(0x86e)]=function(_0x19021e){const _0x4cc6b1=_0x444eb4;this[_0x4cc6b1(0x656)][_0x4cc6b1(0x12b)](_0x19021e),this[_0x4cc6b1(0x119)](),this[_0x4cc6b1(0x790)]();},Window_BattleLog[_0x444eb4(0x268)]['updateWaitMode']=function(){const _0x2fd9cc=_0x444eb4;let _0x30388a=![];switch(this['_waitMode']){case'effect':_0x30388a=this[_0x2fd9cc(0x60c)][_0x2fd9cc(0x82b)]();break;case _0x2fd9cc(0x105):_0x30388a=this['_spriteset'][_0x2fd9cc(0x4e9)]();break;case _0x2fd9cc(0x55b):_0x30388a=this[_0x2fd9cc(0x60c)][_0x2fd9cc(0x555)]();break;case'float':_0x30388a=this[_0x2fd9cc(0x60c)][_0x2fd9cc(0x63a)]();break;case _0x2fd9cc(0x217):_0x30388a=this[_0x2fd9cc(0x60c)]['isAnyoneJumping']();break;case _0x2fd9cc(0x30b):_0x30388a=this['_spriteset']['isAnyoneChangingOpacity']();break;}if(!_0x30388a){if(_0x2fd9cc(0x557)!==_0x2fd9cc(0x557)){function _0x4ed8bd(){this['_waitMode']='';}}else this[_0x2fd9cc(0x6f8)]='';}return _0x30388a;},Window_BattleLog['prototype'][_0x444eb4(0x372)]=function(){const _0x2d8893=_0x444eb4;this[_0x2d8893(0x306)](_0x2d8893(0x55b));},Window_BattleLog['prototype'][_0x444eb4(0x1db)]=function(){const _0x20c9c9=_0x444eb4;this['setWaitMode'](_0x20c9c9(0x8db));},Window_BattleLog['prototype'][_0x444eb4(0x15f)]=function(){const _0x28d1de=_0x444eb4;this['setWaitMode'](_0x28d1de(0x217));},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x384)]=function(){const _0x5742a4=_0x444eb4;this[_0x5742a4(0x306)](_0x5742a4(0x30b));},Window_BattleLog['prototype'][_0x444eb4(0x2de)]=function(){const _0x1cf31b=_0x444eb4,_0x22c903=VisuMZ['BattleCore'][_0x1cf31b(0x90c)][_0x1cf31b(0x727)];if(!_0x22c903[_0x1cf31b(0x626)])return;this[_0x1cf31b(0x12b)](_0x1cf31b(0x86e),_0x22c903['StartTurnMsg'][_0x1cf31b(0x4e2)]($gameTroop[_0x1cf31b(0x85d)]())),this[_0x1cf31b(0x12b)](_0x1cf31b(0xb2),_0x22c903['StartTurnWait']),this['push'](_0x1cf31b(0x7f0));},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x1b1)]=function(_0x3fbfe0,_0x2d7907,_0xaf3e4f){const _0xc12aec=_0x444eb4;if(this[_0xc12aec(0x751)](_0x2d7907)){if(_0xc12aec(0x332)===_0xc12aec(0x69c)){function _0x13fcd8(){const _0x115e5c=_0xc12aec;if(_0x1e5d28[_0x115e5c(0x54c)](_0x15d150))return!![];return![];}}else BattleManager['prepareCustomActionSequence']();}else{if('LkIRA'===_0xc12aec(0x8ce)){function _0x123999(){const _0x2c19d4=_0xc12aec;if(!_0x8fc9c1[_0x2c19d4(0x11f)]())return;const _0x258e45=_0x48a8ac[_0x2c19d4(0x283)]();if(!_0x258e45)return;_0x258e45['setWaitMode'](_0x2c19d4(0x90a));}}else this[_0xc12aec(0x5af)](_0x3fbfe0,_0x2d7907,_0xaf3e4f);}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x751)]=function(_0x195eed){const _0x1fcae9=_0x444eb4;if(!SceneManager[_0x1fcae9(0x11f)]())return![];if(!_0x195eed)return![];if(!_0x195eed[_0x1fcae9(0x712)]())return![];if(_0x195eed[_0x1fcae9(0x712)]()[_0x1fcae9(0x4bb)][_0x1fcae9(0x7db)](/<CUSTOM ACTION SEQUENCE>/i)){if(_0x1fcae9(0x88b)!=='UauoT')return!![];else{function _0x8062be(){const _0xc45683=_0x1fcae9;if(_0x415df6['_baseX']>_0x38a512)_0x2c0fbd+=_0x544d6a['width']/0x2+_0x148f04;if(_0x1d6f7d[_0xc45683(0x7f8)]<_0x4a4de5)_0x20878d-=_0x1d08a7[_0xc45683(0x592)]/0x2+_0xf50f71;}}}return![];},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x5af)]=function(_0x167751,_0x46a37f,_0x43b654){const _0x282a0a=_0x444eb4,_0x576620=_0x46a37f[_0x282a0a(0x712)]();this[_0x282a0a(0x2e2)](_0x167751,_0x46a37f,_0x43b654),this[_0x282a0a(0x97b)](_0x167751,_0x46a37f,_0x43b654),this['finishActionSet'](_0x167751,_0x46a37f,_0x43b654);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x722)]=function(_0x12d080,_0x6b09e6){const _0x2b36ff=_0x444eb4,_0x45f8bc=VisuMZ[_0x2b36ff(0x25c)]['Settings']['BattleLog'];_0x45f8bc[_0x2b36ff(0x432)]&&this[_0x2b36ff(0x12b)](_0x2b36ff(0x86e),_0x2b36ff(0x930)[_0x2b36ff(0x4e2)](DataManager[_0x2b36ff(0x292)](_0x6b09e6)));if(DataManager[_0x2b36ff(0x429)](_0x6b09e6)){if('jVFRE'===_0x2b36ff(0xb1)){if(_0x45f8bc['ActionSkillMsg1'])this[_0x2b36ff(0xc2)](_0x6b09e6[_0x2b36ff(0x47a)],_0x12d080,_0x6b09e6);if(_0x45f8bc['ActionSkillMsg2'])this[_0x2b36ff(0xc2)](_0x6b09e6[_0x2b36ff(0x914)],_0x12d080,_0x6b09e6);}else{function _0x5e733b(){const _0x1ce9f3=_0x2b36ff;if(this['getBattlePortrait']()!=='')return this[_0x1ce9f3(0xff)]();else{if(_0x49c052[_0x1ce9f3(0x3e2)]&&this['getMenuImage']()!=='')return this['getMenuImage']();}return'';}}}else{if(_0x2b36ff(0x192)===_0x2b36ff(0x55d)){function _0x35cd95(){const _0x345a74=_0x2b36ff;return this[_0x345a74(0x91e)]()[_0x345a74(0x631)];}}else{if(_0x45f8bc[_0x2b36ff(0x48d)])this[_0x2b36ff(0xc2)](TextManager['useItem'],_0x12d080,_0x6b09e6);}}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x2e2)]=function(_0x1d7c5a,_0xe079b7,_0x5c36eb){const _0x73a020=_0x444eb4,_0x49deb5=_0xe079b7[_0x73a020(0x712)]();this[_0x73a020(0x722)](_0x1d7c5a,_0x49deb5),this[_0x73a020(0x12b)]('applyImmortal',_0x1d7c5a,_0x5c36eb,!![]),this[_0x73a020(0x12b)](_0x73a020(0x34d),_0x1d7c5a,_0xe079b7),this[_0x73a020(0x12b)]('waitForMovement'),this['push'](_0x73a020(0x39c),_0x1d7c5a,_0xe079b7),this[_0x73a020(0x12b)](_0x73a020(0x372));},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x97b)]=function(_0x9adef5,_0xa37fbb,_0x14690f){const _0x1f5f8c=_0x444eb4;if(this[_0x1f5f8c(0x4c6)](_0xa37fbb))this['autoMeleeSingleTargetActionSet'](_0x9adef5,_0xa37fbb,_0x14690f);else{if(this[_0x1f5f8c(0x515)](_0xa37fbb))this[_0x1f5f8c(0x581)](_0x9adef5,_0xa37fbb,_0x14690f);else _0xa37fbb['isForRandom']()?this[_0x1f5f8c(0x547)](_0x9adef5,_0xa37fbb,_0x14690f):this[_0x1f5f8c(0x6e9)](_0x9adef5,_0xa37fbb,_0x14690f);}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x4c6)]=function(_0x2483cb){const _0x2c1a6a=_0x444eb4;if(!_0x2483cb['isPhysical']())return![];if(!_0x2483cb[_0x2c1a6a(0x848)]())return![];if(!_0x2483cb['isForOpponent']())return![];return VisuMZ[_0x2c1a6a(0x25c)][_0x2c1a6a(0x90c)][_0x2c1a6a(0x4d4)][_0x2c1a6a(0x17d)];},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x898)]=function(_0x534f8a,_0x3e9750,_0x5a4caf){const _0x4416c2=_0x444eb4,_0x56c059=_0x534f8a[_0x4416c2(0x1cd)]()[_0x4416c2(0x8fc)]<0x2,_0x2125e9=0x14,_0x1e3466=0x30;if(_0x56c059){if(_0x4416c2(0xca)!==_0x4416c2(0x938))this[_0x4416c2(0x12b)](_0x4416c2(0x562),[_0x534f8a],_0x1e3466,_0x2125e9),this[_0x4416c2(0x12b)](_0x4416c2(0x576),_0x534f8a,_0x5a4caf,_0x4416c2(0x75f),_0x2125e9,!![],_0x4416c2(0x5b6),!![]),this[_0x4416c2(0x12b)](_0x4416c2(0x6d9),[_0x534f8a],_0x4416c2(0xde)),this['push']('waitForMovement');else{function _0x26d575(){const _0x211c34=_0x4416c2,_0x541c79=_0x49a582[_0x211c34(0xbd)]('['+_0x4e7f79['$1'][_0x211c34(0x7db)](/\d+/g)+']');for(const _0x5b0ea0 of _0x541c79){if(_0xd52565['value'](_0x5b0ea0))return!![];}return![];}}}if(_0x3e9750[_0x4416c2(0x712)]()[_0x4416c2(0x8e9)]<0x0)this['targetActionSet'](_0x534f8a,_0x3e9750,_0x5a4caf);else{if('BBbAz'!=='sSpwM')this[_0x4416c2(0x6e9)](_0x534f8a,_0x3e9750,_0x5a4caf);else{function _0xae94c6(){const _0x455bce=_0x4416c2;if(_0xf4f009['isSceneBattle']()){const _0x4fd034=this[_0x455bce(0x7f2)]();_0x4fd034&&(_0x4fd034[_0x455bce(0x74f)](_0x55fa26),[_0x455bce(0x436),_0x455bce(0x13f),_0x455bce(0x660)][_0x455bce(0x8f7)](_0x28c3e9)&&this[_0x455bce(0x757)]());}this['clearFreezeMotion']();}}}if(_0x56c059){const _0x48a2b1=_0x534f8a[_0x4416c2(0x7f2)]();this[_0x4416c2(0x12b)](_0x4416c2(0x562),[_0x534f8a],_0x1e3466,_0x2125e9),this[_0x4416c2(0x12b)]('performMoveToPoint',_0x534f8a,_0x48a2b1[_0x4416c2(0x76b)],_0x48a2b1[_0x4416c2(0x383)],_0x2125e9,![],'Linear'),this['push'](_0x4416c2(0x6d9),[_0x534f8a],_0x4416c2(0xc7)),this[_0x4416c2(0x12b)](_0x4416c2(0x12e)),this[_0x4416c2(0x12b)](_0x4416c2(0x6d9),[_0x534f8a],_0x4416c2(0xde));}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x515)]=function(_0x3b5a0b){const _0xa364d4=_0x444eb4;if(!_0x3b5a0b[_0xa364d4(0x3df)]())return![];if(!_0x3b5a0b[_0xa364d4(0x4a4)]())return![];if(!_0x3b5a0b[_0xa364d4(0x40b)]())return![];return VisuMZ[_0xa364d4(0x25c)][_0xa364d4(0x90c)]['ActionSequence'][_0xa364d4(0x2eb)];},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x581)]=function(_0x567447,_0x4578b9,_0x317ae4){const _0x6c342=_0x444eb4,_0x4330c6=_0x567447[_0x6c342(0x1cd)]()[_0x6c342(0x8fc)]<0x2,_0x15d3d0=0x14,_0x16562e=0x30;if(_0x4330c6){if('AXgil'===_0x6c342(0x6a8))this[_0x6c342(0x12b)]('performJump',[_0x567447],_0x16562e,_0x15d3d0),this['push']('performMoveToTargets',_0x567447,_0x317ae4,_0x6c342(0x1e6),_0x15d3d0,!![],_0x6c342(0x5b6),!![]),this[_0x6c342(0x12b)](_0x6c342(0x6d9),[_0x567447],_0x6c342(0xde)),this['push'](_0x6c342(0x12e));else{function _0x5e9b7b(){this['_customDamageFormula']=_0x6b96c4;}}}this['wholeActionSet'](_0x567447,_0x4578b9,_0x317ae4);if(_0x4330c6){const _0x2d531e=_0x567447['battler']();this[_0x6c342(0x12b)]('performJump',[_0x567447],_0x16562e,_0x15d3d0),this[_0x6c342(0x12b)](_0x6c342(0x8e3),_0x567447,_0x2d531e[_0x6c342(0x76b)],_0x2d531e[_0x6c342(0x383)],_0x15d3d0,![],'Linear'),this[_0x6c342(0x12b)]('requestMotion',[_0x567447],_0x6c342(0xc7)),this['push'](_0x6c342(0x12e)),this[_0x6c342(0x12b)](_0x6c342(0x6d9),[_0x567447],_0x6c342(0xde));}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x547)]=function(_0x23ca92,_0x3bfe2f,_0x2a053d){const _0x126190=_0x444eb4,_0x84d014=_0x3bfe2f[_0x126190(0x712)]();for(const _0x59ee17 of _0x2a053d){if(!_0x59ee17)continue;this[_0x126190(0x12b)](_0x126190(0x298),_0x23ca92,_0x3bfe2f),this[_0x126190(0x12b)](_0x126190(0xb2),Sprite_Battler[_0x126190(0x2cd)]),this[_0x126190(0x12b)]('showAnimation',_0x23ca92,[_0x59ee17],_0x84d014['animationId']),this[_0x126190(0x12b)]('waitCount',0x18),this[_0x126190(0x12b)]('actionEffect',_0x23ca92,_0x59ee17);}this[_0x126190(0x12b)](_0x126190(0x8d5),_0x23ca92,_0x2a053d,![]);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x6e9)]=function(_0x33a0d0,_0x3efaaa,_0xc8ded8){const _0x3e6f6d=_0x444eb4,_0x3451f6=_0x3efaaa[_0x3e6f6d(0x712)]();this[_0x3e6f6d(0x12b)]('performAction',_0x33a0d0,_0x3efaaa),this[_0x3e6f6d(0x12b)](_0x3e6f6d(0xb2),Sprite_Battler['_motionSpeed']),this[_0x3e6f6d(0x12b)](_0x3e6f6d(0x877),_0x33a0d0,_0xc8ded8[_0x3e6f6d(0x6ff)](),_0x3451f6[_0x3e6f6d(0x8e9)]),this[_0x3e6f6d(0x12b)](_0x3e6f6d(0x372));for(const _0x4a1c1a of _0xc8ded8){if('ZLwWC'===_0x3e6f6d(0x285)){function _0x22c88e(){const _0x4e7c9d=_0x3e6f6d;this[_0x4e7c9d(0x4c7)]()?(this[_0x4e7c9d(0x6e0)]['show'](),this['_enemyWindow'][_0x4e7c9d(0x8b4)](),this['_actorCommandWindow'][_0x4e7c9d(0x83d)]()):_0x22ae0c['BattleCore'][_0x4e7c9d(0x3ea)][_0x4e7c9d(0x315)](this),this['cancelTargetSelectionVisibility']();}}else{if(!_0x4a1c1a)continue;this[_0x3e6f6d(0x12b)](_0x3e6f6d(0x1ae),_0x33a0d0,_0x4a1c1a);}}this[_0x3e6f6d(0x12b)](_0x3e6f6d(0x8d5),_0x33a0d0,_0xc8ded8,![]);},Window_BattleLog['prototype'][_0x444eb4(0xb9)]=function(_0x39a96e,_0x1b8217,_0x93d2ba){const _0x3f0f35=_0x444eb4,_0x425156=_0x1b8217['item']();this[_0x3f0f35(0x12b)](_0x3f0f35(0x8d5),_0x39a96e,_0x93d2ba,![]),this[_0x3f0f35(0x12b)](_0x3f0f35(0x2d3)),this[_0x3f0f35(0x12b)](_0x3f0f35(0x5f3)),this[_0x3f0f35(0x12b)](_0x3f0f35(0x7f0)),this['push']('performActionEnd',_0x39a96e),this[_0x3f0f35(0x12b)](_0x3f0f35(0x12e));},Window_BattleLog['prototype']['endAction']=function(_0x11980b){},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x109)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x177)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x177)]=function(_0x57147f){const _0x45a8c4=_0x444eb4;if(!VisuMZ['BattleCore'][_0x45a8c4(0x90c)][_0x45a8c4(0x727)][_0x45a8c4(0x203)])return;VisuMZ[_0x45a8c4(0x25c)][_0x45a8c4(0x109)]['call'](this,_0x57147f);},Window_BattleLog[_0x444eb4(0x268)]['displayCounter']=function(_0x46c718){const _0x94cae4=_0x444eb4;this[_0x94cae4(0x12b)](_0x94cae4(0x475),_0x46c718);VisuMZ['BattleCore']['Settings'][_0x94cae4(0x4d4)]['CounterPlayback']&&this[_0x94cae4(0x12b)](_0x94cae4(0x877),_0x46c718,[BattleManager[_0x94cae4(0xda)]],-0x1);if(!VisuMZ[_0x94cae4(0x25c)]['Settings']['BattleLog'][_0x94cae4(0x18e)])return;this[_0x94cae4(0x12b)](_0x94cae4(0x86e),TextManager[_0x94cae4(0x3b4)][_0x94cae4(0x4e2)](_0x46c718[_0x94cae4(0x2d2)]()));},Window_BattleLog['prototype'][_0x444eb4(0x25e)]=function(_0x291cb1){const _0x261119=_0x444eb4;this[_0x261119(0x12b)](_0x261119(0x1f8),_0x291cb1);if(!VisuMZ[_0x261119(0x25c)][_0x261119(0x90c)][_0x261119(0x727)]['ShowReflect'])return;this[_0x261119(0x12b)]('addText',TextManager['magicReflection'][_0x261119(0x4e2)](_0x291cb1['name']()));},Window_BattleLog[_0x444eb4(0x268)]['displayReflectionPlayBack']=function(_0x3be94d,_0x4a977e){const _0x29a290=_0x444eb4;if(VisuMZ[_0x29a290(0x25c)]['Settings']['ActionSequence'][_0x29a290(0x8cc)]){const _0x17ec81=_0x4a977e[_0x29a290(0x712)]();this[_0x29a290(0x12b)](_0x29a290(0x877),_0x3be94d,[_0x3be94d],_0x17ec81['animationId']);}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x82f)]=function(_0x147a7b,_0x6c0583){const _0x1d74cb=_0x444eb4;this[_0x1d74cb(0x12b)](_0x1d74cb(0x393),_0x147a7b,_0x6c0583);if(!VisuMZ[_0x1d74cb(0x25c)][_0x1d74cb(0x90c)][_0x1d74cb(0x727)]['ShowSubstitute'])return;const _0xfcc205=_0x147a7b[_0x1d74cb(0x2d2)](),_0x28e974=TextManager[_0x1d74cb(0x237)][_0x1d74cb(0x4e2)](_0xfcc205,_0x6c0583['name']());this[_0x1d74cb(0x12b)](_0x1d74cb(0x86e),_0x28e974);},VisuMZ[_0x444eb4(0x25c)]['Window_BattleLog_displayFailure']=Window_BattleLog['prototype'][_0x444eb4(0x799)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x799)]=function(_0x43a4f1){const _0x21ae6d=_0x444eb4;if(!VisuMZ[_0x21ae6d(0x25c)][_0x21ae6d(0x90c)]['BattleLog']['ShowFailure'])return;VisuMZ['BattleCore']['Window_BattleLog_displayFailure'][_0x21ae6d(0x315)](this,_0x43a4f1);},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x761)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x6ac)],Window_BattleLog[_0x444eb4(0x268)]['displayCritical']=function(_0x567823){const _0xcbfb99=_0x444eb4;if(!VisuMZ[_0xcbfb99(0x25c)][_0xcbfb99(0x90c)][_0xcbfb99(0x727)]['ShowCritical'])return;VisuMZ['BattleCore']['Window_BattleLog_displayCritical']['call'](this,_0x567823);},VisuMZ['BattleCore'][_0x444eb4(0x240)]=Window_BattleLog[_0x444eb4(0x268)]['displayMiss'],Window_BattleLog[_0x444eb4(0x268)]['displayMiss']=function(_0x36bbec){const _0x5eab34=_0x444eb4;if(!VisuMZ['BattleCore'][_0x5eab34(0x90c)][_0x5eab34(0x727)][_0x5eab34(0x92b)])this[_0x5eab34(0x12b)](_0x5eab34(0x92d),_0x36bbec);else{if(_0x5eab34(0x6ed)===_0x5eab34(0x6ed))VisuMZ['BattleCore'][_0x5eab34(0x240)]['call'](this,_0x36bbec);else{function _0x4974ba(){const _0x4cbddc=_0x5eab34;return _0x15e511['BattleCore'][_0x4cbddc(0x90c)][_0x4cbddc(0x78b)]['AnchorY'];}}}},VisuMZ['BattleCore']['Window_BattleLog_displayEvasion']=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x1af)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x1af)]=function(_0x13851d){const _0x2dc7b4=_0x444eb4;if(!VisuMZ['BattleCore'][_0x2dc7b4(0x90c)]['BattleLog'][_0x2dc7b4(0x92b)]){if(_0x13851d[_0x2dc7b4(0x98c)]()[_0x2dc7b4(0x1e3)]){if('mNlfg'!==_0x2dc7b4(0x155)){function _0x14c3c1(){const _0x111e8=_0x2dc7b4;_0x4af988[_0x111e8(0x932)](_0x251b5a[0x2],_0x10d59c[0x3]),_0x5c9ca0[_0x111e8(0x932)](_0x2b862d);}}else this[_0x2dc7b4(0x12b)](_0x2dc7b4(0x57d),_0x13851d);}else{if('iowyy'==='iowyy')this['push']('performMagicEvasion',_0x13851d);else{function _0x190567(){const _0x19a699=_0x2dc7b4;if(!_0x21ec8f['VisuMZ_3_ActSeqImpact'])return;const _0x147fb7=_0x38d0dc[_0x19a699(0x3a7)]['_spriteset'];if(!_0x147fb7)return;_0x305c1a['ConvertParams'](_0x571997,_0xe8a0ce);const _0x370a6e=_0x26e6f4['X']||0x0,_0x1ef905=_0x376cfe['Y']||0x0,_0x469a1f=_0x38730f[_0x19a699(0x695)]||0x0,_0x2a1cef=_0x3d19ef['Radius']||0x0,_0x1af10f=_0x5403fe[_0x19a699(0xfa)]||0x1,_0x3459b3=_0xdbc182[_0x19a699(0x81b)]||'Linear';_0x147fb7[_0x19a699(0x6f3)](_0x469a1f,_0x370a6e,_0x1ef905,_0x2a1cef,_0x1af10f,_0x3459b3);}}}}else VisuMZ[_0x2dc7b4(0x25c)][_0x2dc7b4(0x517)][_0x2dc7b4(0x315)](this,_0x13851d);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x503)]=function(_0x3a8d2e){const _0xeb6558=_0x444eb4;if(_0x3a8d2e[_0xeb6558(0x98c)]()['hpAffected']){if(_0x3a8d2e[_0xeb6558(0x98c)]()[_0xeb6558(0x775)]>0x0&&!_0x3a8d2e[_0xeb6558(0x98c)]()['drain']){if(_0xeb6558(0x535)!==_0xeb6558(0x52a))this[_0xeb6558(0x12b)](_0xeb6558(0x7e9),_0x3a8d2e);else{function _0x3bcf29(){const _0x47b872=_0xeb6558;return _0x27f0b8[_0x47b872(0x3a7)][_0x47b872(0x60c)][_0x47b872(0x6cb)];}}}_0x3a8d2e[_0xeb6558(0x98c)]()[_0xeb6558(0x775)]<0x0&&this[_0xeb6558(0x12b)]('performRecovery',_0x3a8d2e);if(VisuMZ['BattleCore'][_0xeb6558(0x90c)][_0xeb6558(0x727)][_0xeb6558(0xfc)]){if('iHLPG'===_0xeb6558(0xab))this[_0xeb6558(0x12b)]('addText',this[_0xeb6558(0x4cf)](_0x3a8d2e));else{function _0x338d7d(){const _0xf79431=_0xeb6558;if(!_0x4ee902[_0xf79431(0x11f)]())return;const _0x3dd2ac=_0xa76de8[_0xf79431(0x283)]();if(!_0x3dd2ac)return;_0x3dd2ac[_0xf79431(0x306)](_0xf79431(0x3e5));}}}}},VisuMZ['BattleCore']['Window_BattleLog_displayMpDamage']=Window_BattleLog['prototype'][_0x444eb4(0x6fe)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x6fe)]=function(_0x53a8e0){const _0x1f80d8=_0x444eb4;if(!VisuMZ[_0x1f80d8(0x25c)]['Settings']['BattleLog'][_0x1f80d8(0x32b)])return;VisuMZ[_0x1f80d8(0x25c)][_0x1f80d8(0x45d)]['call'](this,_0x53a8e0);},VisuMZ[_0x444eb4(0x25c)]['Window_BattleLog_displayTpDamage']=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x290)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x290)]=function(_0x57e391){const _0x13c0e6=_0x444eb4;if(!VisuMZ[_0x13c0e6(0x25c)][_0x13c0e6(0x90c)][_0x13c0e6(0x727)][_0x13c0e6(0x632)])return;VisuMZ[_0x13c0e6(0x25c)][_0x13c0e6(0x69b)][_0x13c0e6(0x315)](this,_0x57e391);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x5ff)]=function(_0x11c069){const _0x4820a1=_0x444eb4,_0x304ed0=_0x11c069['result'](),_0x50e0f6=_0x304ed0[_0x4820a1(0x2a5)]();for(const _0x3269f7 of _0x50e0f6){if(_0x4820a1(0x77b)!=='eJNVQ'){const _0x4ef799=_0x11c069[_0x4820a1(0x73d)]()?_0x3269f7['message1']:_0x3269f7[_0x4820a1(0x914)];if(_0x4ef799&&VisuMZ['BattleCore'][_0x4820a1(0x90c)][_0x4820a1(0x727)][_0x4820a1(0x49e)]){if(_0x4820a1(0x7fd)!==_0x4820a1(0x7fd)){function _0x5d9c84(){const _0x5edc87=_0x4820a1;return _0x523f95['isSceneBattle']()?(_0x57e79c[_0x5edc87(0x3a7)][_0x5edc87(0x60c)][_0x5edc87(0x6ca)](_0x127908[0x0],_0x2c11b5[0x1]),!![]):_0x201f8f['BattleCore'][_0x5edc87(0xe4)][_0x5edc87(0x315)](this,_0x2c3337);}}else this[_0x4820a1(0x12b)](_0x4820a1(0x36a)),this[_0x4820a1(0x12b)](_0x4820a1(0x302)),this['push'](_0x4820a1(0x86e),_0x4ef799[_0x4820a1(0x4e2)](_0x11c069[_0x4820a1(0x2d2)]())),this[_0x4820a1(0x12b)](_0x4820a1(0x7f3));}_0x3269f7['id']===_0x11c069[_0x4820a1(0x89e)]()&&this[_0x4820a1(0x12b)]('performCollapse',_0x11c069);}else{function _0x1e8f64(){const _0x49f2f0=_0x4820a1,_0x2dee76=_0x54d196['x']+_0x371631[_0x49f2f0(0x10b)]((_0x1f71e9[_0x49f2f0(0x592)]-_0x48537e)/0x2);this['drawTextEx'](_0x341db9,_0x2dee76,_0x1f7a4d['y'],_0x5a4114);}}}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x4eb)]=function(_0x391ba8){const _0x23e4e8=_0x444eb4;if(!VisuMZ[_0x23e4e8(0x25c)][_0x23e4e8(0x90c)][_0x23e4e8(0x727)][_0x23e4e8(0x6be)])return;const _0xafaef1=_0x391ba8['result'](),_0x8a4640=_0xafaef1[_0x23e4e8(0xe5)]();for(const _0x66b8c1 of _0x8a4640){if(_0x66b8c1[_0x23e4e8(0x630)]){if('ocYHj'!==_0x23e4e8(0x4fc)){function _0x20d3de(){const _0x3195fc=_0x23e4e8;this[_0x3195fc(0x30f)][_0x3195fc(0x480)]();}}else this[_0x23e4e8(0x12b)](_0x23e4e8(0x36a)),this[_0x23e4e8(0x12b)](_0x23e4e8(0x302)),this[_0x23e4e8(0x12b)]('addText',_0x66b8c1['message4']['format'](_0x391ba8[_0x23e4e8(0x2d2)]())),this[_0x23e4e8(0x12b)](_0x23e4e8(0x7f3));}}},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x63c)]=function(_0x471b26){const _0xa6cc86=_0x444eb4,_0x26af62=VisuMZ[_0xa6cc86(0x25c)]['Settings'][_0xa6cc86(0x727)],_0x5df57d=_0x471b26[_0xa6cc86(0x98c)]();if(_0x26af62[_0xa6cc86(0x2e1)])this[_0xa6cc86(0x67c)](_0x471b26,_0x5df57d[_0xa6cc86(0x8a1)],TextManager[_0xa6cc86(0x821)]);if(_0x26af62['ShowAddedDebuff'])this['displayBuffs'](_0x471b26,_0x5df57d[_0xa6cc86(0x492)],TextManager[_0xa6cc86(0x431)]);if(_0x26af62[_0xa6cc86(0x8c8)])this[_0xa6cc86(0x67c)](_0x471b26,_0x5df57d['removedBuffs'],TextManager[_0xa6cc86(0x76e)]);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x67c)]=function(_0x48f97a,_0x11421d,_0x1db906){const _0x2ae3ed=_0x444eb4;for(const _0x3a2aba of _0x11421d){const _0xc4e3b=_0x1db906[_0x2ae3ed(0x4e2)](_0x48f97a['name'](),TextManager[_0x2ae3ed(0x767)](_0x3a2aba));this['push'](_0x2ae3ed(0x36a)),this['push'](_0x2ae3ed(0x302)),this['push'](_0x2ae3ed(0x86e),_0xc4e3b),this['push'](_0x2ae3ed(0x7f3));}},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x579)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x7f0)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x7f0)]=function(){const _0x401cdd=_0x444eb4;VisuMZ['BattleCore'][_0x401cdd(0x579)][_0x401cdd(0x315)](this),this[_0x401cdd(0x790)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x705)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x302)],Window_BattleLog['prototype'][_0x444eb4(0x302)]=function(){const _0x2fa584=_0x444eb4;VisuMZ['BattleCore'][_0x2fa584(0x705)]['call'](this),this[_0x2fa584(0x790)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x912)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x36a)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x36a)]=function(){const _0x213ed5=_0x444eb4;VisuMZ[_0x213ed5(0x25c)][_0x213ed5(0x912)][_0x213ed5(0x315)](this),this[_0x213ed5(0x119)](),this[_0x213ed5(0x790)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x3e3)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x8c5)],Window_BattleLog[_0x444eb4(0x268)]['popupDamage']=function(_0xf0d43d){const _0x7fc22=_0x444eb4;VisuMZ[_0x7fc22(0x25c)][_0x7fc22(0x3e3)][_0x7fc22(0x315)](this,_0xf0d43d),this['callNextMethod']();},Window_BattleLog['prototype'][_0x444eb4(0x2d3)]=function(){const _0x1542bc=_0x444eb4;let _0x3d8d08=0x0;this[_0x1542bc(0x990)][_0x1542bc(0x34a)]>0x0&&(_0x3d8d08=this[_0x1542bc(0x990)][this[_0x1542bc(0x990)]['length']-0x1]);if(this[_0x1542bc(0x656)]['length']>_0x3d8d08){if(_0x1542bc(0x403)!==_0x1542bc(0x403)){function _0x2658f1(){const _0x2b5cc2=_0x1542bc;_0x381967[_0x2b5cc2(0x25c)][_0x2b5cc2(0x33b)]['call'](this),this[_0x2b5cc2(0x6c0)](),this[_0x2b5cc2(0x95a)]();}}else this[_0x1542bc(0x7f3)]();}else{if(_0x1542bc(0x8c6)===_0x1542bc(0x1c5)){function _0x364ed2(){const _0x5492db=_0x1542bc;_0x33a01c['setFrame'](0x0,0x0,_0x3ef4f9[_0x5492db(0x8fa)][_0x5492db(0x592)],this[_0x5492db(0x8fa)][_0x5492db(0x773)]);}}else this[_0x1542bc(0x790)]();}},VisuMZ[_0x444eb4(0x25c)]['Window_BattleLog_performActionStart']=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x34d)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x34d)]=function(_0xd0be87,_0x1532f6){const _0x2ddbbe=_0x444eb4;VisuMZ[_0x2ddbbe(0x25c)]['Window_BattleLog_performActionStart'][_0x2ddbbe(0x315)](this,_0xd0be87,_0x1532f6),this[_0x2ddbbe(0x790)]();},VisuMZ['BattleCore'][_0x444eb4(0x421)]=Window_BattleLog['prototype'][_0x444eb4(0x298)],Window_BattleLog[_0x444eb4(0x268)]['performAction']=function(_0x44c665,_0x5ab4c3){const _0x39ba64=_0x444eb4;VisuMZ['BattleCore'][_0x39ba64(0x421)]['call'](this,_0x44c665,_0x5ab4c3),this['callNextMethod']();},VisuMZ[_0x444eb4(0x25c)]['Window_BattleLog_performActionEnd']=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x3f9)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x3f9)]=function(_0x5089e4){const _0xc337a3=_0x444eb4;for(const _0x146902 of BattleManager[_0xc337a3(0x527)]()){if(_0xc337a3(0x395)==='hHOrI'){if(!_0x146902)continue;if(_0x146902[_0xc337a3(0xc9)]())continue;_0x146902[_0xc337a3(0x3f9)]();}else{function _0x4f2f07(){const _0xf2420e=_0xc337a3;return _0x31c543['friendsUnit']()[_0xf2420e(0x20e)]();}}}this[_0xc337a3(0x790)]();},VisuMZ['BattleCore']['Window_BattleLog_performDamage']=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x7e9)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x7e9)]=function(_0xe911b6){const _0x4d680e=_0x444eb4;VisuMZ[_0x4d680e(0x25c)][_0x4d680e(0x2c9)][_0x4d680e(0x315)](this,_0xe911b6),this['callNextMethod']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x5a0)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x92d)],Window_BattleLog[_0x444eb4(0x268)]['performMiss']=function(_0x40ed80){const _0x3d8a2a=_0x444eb4;VisuMZ[_0x3d8a2a(0x25c)]['Window_BattleLog_performMiss'][_0x3d8a2a(0x315)](this,_0x40ed80),this['callNextMethod']();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x19c)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x679)],Window_BattleLog[_0x444eb4(0x268)]['performRecovery']=function(_0x36ae19){const _0x245a92=_0x444eb4;VisuMZ[_0x245a92(0x25c)][_0x245a92(0x19c)][_0x245a92(0x315)](this,_0x36ae19),this[_0x245a92(0x790)]();},VisuMZ[_0x444eb4(0x25c)]['Window_BattleLog_performEvasion']=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x57d)],Window_BattleLog[_0x444eb4(0x268)]['performEvasion']=function(_0x3c6f34){const _0x492fe9=_0x444eb4;VisuMZ['BattleCore'][_0x492fe9(0x368)][_0x492fe9(0x315)](this,_0x3c6f34),this[_0x492fe9(0x790)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x8e0)]=Window_BattleLog['prototype']['performMagicEvasion'],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x1e8)]=function(_0x302eb3){const _0x31b233=_0x444eb4;VisuMZ[_0x31b233(0x25c)][_0x31b233(0x8e0)][_0x31b233(0x315)](this,_0x302eb3),this[_0x31b233(0x790)]();},VisuMZ['BattleCore']['Window_BattleLog_performCounter']=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x475)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x475)]=function(_0x4af2ed){const _0x4c9c4d=_0x444eb4;VisuMZ[_0x4c9c4d(0x25c)][_0x4c9c4d(0xbe)][_0x4c9c4d(0x315)](this,_0x4af2ed),this[_0x4c9c4d(0x790)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x867)]=Window_BattleLog[_0x444eb4(0x268)]['performReflection'],Window_BattleLog[_0x444eb4(0x268)]['performReflection']=function(_0x33e53f){const _0x33d234=_0x444eb4;VisuMZ['BattleCore'][_0x33d234(0x867)][_0x33d234(0x315)](this,_0x33e53f),this[_0x33d234(0x790)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x93a)]=Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x393)],Window_BattleLog[_0x444eb4(0x268)]['performSubstitute']=function(_0x207f32,_0x37ffc4){const _0x585142=_0x444eb4;VisuMZ['BattleCore'][_0x585142(0x93a)][_0x585142(0x315)](this,_0x207f32,_0x37ffc4),this[_0x585142(0x790)]();},VisuMZ[_0x444eb4(0x25c)][_0x444eb4(0x67e)]=Window_BattleLog['prototype'][_0x444eb4(0x39e)],Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x39e)]=function(_0x3eac51){const _0x1da70b=_0x444eb4;VisuMZ[_0x1da70b(0x25c)]['Window_BattleLog_performCollapse'][_0x1da70b(0x315)](this,_0x3eac51),this['callNextMethod']();},Window_BattleLog[_0x444eb4(0x268)]['performCastAnimation']=function(_0x423c3b,_0x5ce170){const _0x3fd296=_0x444eb4;_0x423c3b[_0x3fd296(0x39c)](_0x5ce170),this[_0x3fd296(0x790)]();},Window_BattleLog['prototype'][_0x444eb4(0x3eb)]=function(_0x4700c1,_0x1d0d92){const _0x3f5b4c=_0x444eb4,_0xa4b372=_0x4700c1[_0x3f5b4c(0x700)]();_0xa4b372<=0x0?SoundManager[_0x3f5b4c(0x364)]():this[_0x3f5b4c(0x38b)](_0x1d0d92,_0xa4b372);},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x8d5)]=function(_0x12c082,_0x18de7e,_0x546110){const _0x43c2b4=_0x444eb4,_0x3ec108=[_0x12c082]['concat'](_0x18de7e);for(const _0x167e91 of _0x3ec108){if('HGAXD'===_0x43c2b4(0x5da)){function _0x153312(){const _0x351ae2=_0x43c2b4;if(!this['_damageContainer'])return;if(!_0x160341)return;this[_0x351ae2(0x6cb)][_0x351ae2(0x910)](_0x2bb238);}}else{if(!_0x167e91)continue;_0x167e91['setImmortal'](_0x546110);}}this[_0x43c2b4(0x790)]();},Window_BattleLog['prototype'][_0x444eb4(0xb2)]=function(_0x5e68d9){const _0x3e63a4=_0x444eb4;this[_0x3e63a4(0x6ef)]=_0x5e68d9;},Window_BattleLog['prototype'][_0x444eb4(0x6d9)]=function(_0x1953fa,_0x19c6eb){const _0x3bf312=_0x444eb4;for(const _0x1fa2bc of _0x1953fa){if(!_0x1fa2bc)continue;_0x1fa2bc[_0x3bf312(0x6d9)](_0x19c6eb);}this['callNextMethod']();},Window_BattleLog['prototype'][_0x444eb4(0x8e3)]=function(_0x4e612b,_0xdc8387,_0x155c2d,_0x95d9c4,_0x1dec98,_0x519a61){const _0x4a3218=_0x444eb4;_0x4e612b[_0x4a3218(0x861)](_0xdc8387,_0x155c2d,_0x95d9c4,_0x1dec98,_0x519a61,-0x1),this[_0x4a3218(0x790)]();},Window_BattleLog[_0x444eb4(0x268)]['performMoveToTargets']=function(_0x49d86f,_0x305080,_0x1e5176,_0x1073f4,_0x41020c,_0x5c01a7,_0x224d5f){const _0x113a00=_0x444eb4,_0x42ef43=Math[_0x113a00(0x827)](..._0x305080[_0x113a00(0x99d)](_0x2722b4=>_0x2722b4[_0x113a00(0x7f2)]()[_0x113a00(0x7f8)]-_0x2722b4['battler']()[_0x113a00(0x817)]()/0x2)),_0x3a94ed=Math['max'](..._0x305080['map'](_0x4ee9a8=>_0x4ee9a8[_0x113a00(0x7f2)]()[_0x113a00(0x7f8)]+_0x4ee9a8[_0x113a00(0x7f2)]()['mainSpriteWidth']()/0x2)),_0x3bc2d1=Math['min'](..._0x305080['map'](_0x711f52=>_0x711f52[_0x113a00(0x7f2)]()[_0x113a00(0x29f)]-_0x711f52[_0x113a00(0x7f2)]()[_0x113a00(0x48f)]())),_0x20624b=Math[_0x113a00(0x960)](..._0x305080[_0x113a00(0x99d)](_0x5a8b60=>_0x5a8b60[_0x113a00(0x7f2)]()[_0x113a00(0x29f)])),_0x8d979=_0x305080[_0x113a00(0x34b)](_0x1d01f7=>_0x1d01f7[_0x113a00(0x73d)]())[_0x113a00(0x34a)],_0x1069d6=_0x305080[_0x113a00(0x34b)](_0x5a30f7=>_0x5a30f7[_0x113a00(0x5e6)]())[_0x113a00(0x34a)];let _0x3d7b39=0x0,_0x2dbe9a=0x0;if(_0x1e5176[_0x113a00(0x7db)](/front/i)){if(_0x113a00(0x262)!==_0x113a00(0x1be))_0x3d7b39=_0x8d979>=_0x1069d6?_0x42ef43:_0x3a94ed;else{function _0xd271ab(){const _0x356e0e=_0x113a00;if(!_0x56a298[_0x356e0e(0x11f)]())return;_0x34f286[_0x356e0e(0x346)](_0x1ee5e9,_0x2f5ce8);const _0x161b4f=_0x2c556d[_0x356e0e(0x274)],_0x176150={'criticalHitRate':_0x244f38[_0x356e0e(0x7a9)],'criticalHitFlat':_0x5c946c[_0x356e0e(0x110)],'criticalDmgRate':_0x222aaa['CriticalDmgRate'],'criticalDmgFlat':_0x477d3e[_0x356e0e(0x2dd)],'damageRate':_0x3cafdf[_0x356e0e(0x852)],'damageFlat':_0x1e470b[_0x356e0e(0x458)],'hitRate':_0x1e45ad[_0x356e0e(0x94e)],'hitFlat':_0x59c37e[_0x356e0e(0x147)]};_0x161b4f[_0x356e0e(0x15d)]=_0x176150;}}}else{if(_0x1e5176[_0x113a00(0x7db)](/middle/i)){if(_0x113a00(0x41c)!==_0x113a00(0x41c)){function _0x43fb4e(){const _0x2ca512=_0x113a00,_0x58c119=_0x4b0c44['width'],_0x3df4ba=_0x1cae05[_0x2ca512(0x29d)]((_0x21c9b7[_0x2ca512(0x6e8)]-_0x58c119)/0x2),_0x202707=this[_0x2ca512(0x19e)](),_0x1748c8=(_0x341cf9[_0x2ca512(0x773)]-_0x3c19e1[_0x2ca512(0x6fd)])/-0x2;return new _0x20d10f(_0x3df4ba,_0x1748c8,_0x58c119,_0x202707);}}else _0x3d7b39=(_0x42ef43+_0x3a94ed)/0x2,_0x224d5f=-0x1;}else{if(_0x1e5176['match'](/back/i)){if(_0x113a00(0x8f9)!=='Rdxhh'){function _0x105e4a(){const _0x4bf202=_0x113a00;_0x3d9808[_0x4bf202(0x25c)][_0x4bf202(0x3ae)][_0x4bf202(0x315)](this),this[_0x4bf202(0x7fe)]();}}else _0x3d7b39=_0x8d979>=_0x1069d6?_0x3a94ed:_0x42ef43;}}}if(_0x1e5176['match'](/head/i))_0x2dbe9a=_0x3bc2d1;else{if(_0x1e5176[_0x113a00(0x7db)](/center/i))_0x2dbe9a=(_0x3bc2d1+_0x20624b)/0x2;else{if(_0x1e5176[_0x113a00(0x7db)](/base/i)){if(_0x113a00(0x780)!=='LRwdi'){function _0x478c51(){_0x26f4f9=_0x1c8552(_0x5bcbdb['$1']),_0x2c5ec2=_0x36e4d2(_0x160c36['$2']);}}else _0x2dbe9a=_0x20624b;}}}_0x49d86f[_0x113a00(0x861)](_0x3d7b39,_0x2dbe9a,_0x1073f4,_0x41020c,_0x5c01a7,_0x224d5f),this[_0x113a00(0x790)]();},Window_BattleLog[_0x444eb4(0x268)][_0x444eb4(0x562)]=function(_0x3db362,_0x21023c,_0x2cc297){const _0x4f4821=_0x444eb4;for(const _0x4bbf55 of _0x3db362){if(!_0x4bbf55)continue;_0x4bbf55[_0x4f4821(0x882)](_0x21023c,_0x2cc297);}this[_0x4f4821(0x790)]();};