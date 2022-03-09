//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.05] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x4218=['Game_Battler_addState','tgMcz','width','ShowJS','slipTp','_itemWindow','ARRAYJSON','mainAreaTop','qwSJI','setStypeId','setStateTurns','windowPadding','checkShowHideNotetags','recoverAll','skills','isSkillCostShown','buttonAssistSwitch','_currentActor','setStateRetainType','icon','meetsPassiveStateConditionJS','Window_StatusBase_placeGauge','hUPXb','setBuffTurns','allIcons','Param','canClearState','setActor','ATK','addStateTurns','iconWidth','Twudx','isStateExpired','IconStypeNorm','outlineColor','checkSkillConditionsNotetags','regenerateAll','Sprite_Gauge_redraw','call','onAddStateCustomJS','split','kUpcz','addDebuffTurns','FqKqx','onExpireStateJS','scrollTo','hasSkill','getColor','JRPjE','_scene','wnxsE','iconText','setStateDisplay','SkillConditionJS','filter','Game_BattlerBase_eraseState','oHGYA','innerWidth','Sprite_Gauge_currentValue','_buffs','BhYRo','ctfoJ','NijtA','drawActorStateTurns','fontFace','buffTurns','aSAaf','_skillTypeWindow','allowCreateShopStatusWindow','Global','isUseModernControls','convertPassiveStates','aFYXe','YDknO','isLearnedSkill','addPassiveStatesByPluginParameters','checkShowHideSkillNotetags','glTEC','CoreEngine','DoNnC','ColorDebuff','skillCostSeparator','Game_BattlerBase_clearStates','reset','getStateOrigin','itemTextAlign','YTpLh','value','buffIconIndex','onRemoveState','updateHelp','innerHeight','shopStatusWidth','rTUst','DisplayedParams','Game_Actor_skillTypes','drawIcon','CalcJS','stateTpSlipHealJS','mainFontSize','mainAreaHeight','Game_BattlerBase_skillMpCost','useDigitGrouping','maxSlipDamage','GroupDigits','states','resetTextColor','onAddBuff','isMaxDebuffAffected','hfcJf','Game_Battler_addDebuff','GLIkU','passiveStates','VthfG','DKYwk','initialize','clamp','ConvertParams','vlwtR','convertGaugeTypeSkillsStatesCore','Parse_Notetags_Skill_Cost','redrawSkillsStatesCore','slice','removeStatesAuto','_skillIDs','isRightInputMode','currentMaxValueSkillsStatesCore','vcjOj','drawSkillCost','push','Sprite_Gauge_setup','normalColor','JSON','Game_Troop_setup','ARRAYSTRUCT','skillId','ugzZz','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getStateDisplay','Parse_Notetags_State_Category','categories','Rzgaf','getColorDataFromPluginParameters','PpXDS','jfLni','getStateReapplyRulings','States','MMVvh','gradientFillRect','Game_BattlerBase_buffIconIndex','regenerateAllSkillsStatesCore','stateExpireJS','AueDd','isBottomHelpMode','NxzrN','applyStateTurnManipulationEffects','Game_BattlerBase_die','_stypeId','groupDefeat','buffLength','changeOutlineColor','IFmql','includes','eearQ','WbuhF','sort','onEraseBuffJS','_buffTurns','overwriteBuffTurns','mWAsC','createShopStatusWindow','ZObOZ','getSkillTypes','ShowData','setup','isDebuffAffected','uyegp','clear','TurnFontSize','lineHeight','skillTypes','clearStateDisplay','onExpireState','skillTpCost','meetsSkillConditionsGlobalJS','qdVrC','textColor','LayoutStyle','slipMp','onEraseDebuff','Sprite_StateIcon_loadBitmap','hasState','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','increaseBuff','addState','isGroupDefeatStateAffected','checkShowHideSwitchNotetags','commandNameWindowCenter','OeueU','_skills','removeStatesByCategoryAll','_stateData','contents','drawParamText','constructor','rgba(0,\x200,\x200,\x201)','isStateAffected','Window_SkillList_includes','clearStatesWithStateRetain','TextJS','kJBpA','hZbIq','addPassiveStatesByNotetag','clearStates','getCurrentStateOriginKey','placeExactGauge','checkSkillConditionsSwitchNotetags','Game_BattlerBase_decreaseBuff','iMveN','ALL','addPassiveStatesTraitSets','lAafg','Game_BattlerBase_resetStateCounts','gainMp','yhTnk','debuffColor','shopStatusWindowRect','fJlUU','match','_cache','mspOx','HgMGI','drawTextEx','onAddStateGlobalJS','IORKq','hfHlC','skillVisibleJS','onExpireStateGlobalJS','VisuMZ_1_ItemsEquipsCore','makeCommandList','_stateDisplay','stateData','die','currentClass','GaugeMaxJS','_colorCache','TAeqK','_stored_state-%1-color','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Parse_Notetags_State_PassiveJS','StackBuffMax','FaqYI','slipHp','stateTpSlipDamageJS','drawActorIcons','commandStyleCheck','onEraseDebuffGlobalJS','onAddDebuff','clearStateData','none','auto','onEraseStateGlobalJS','skill','ColorBuff','_stateOrigin','PassiveStates','statesByCategory','resetFontSettings','udfmK','map','Name','indexOf','oYrnz','number','VisuMZ_1_MainMenuCore','danjY','length','onEraseStateJS','createItemWindow','onExpireDebuffGlobalJS','tUCbU','Nihlt','item','aliveMembers','keys','iconHeight','wotwW','name','convertTargetToStateOriginKey','statePassiveConditionJS','tezDD','createSkillCostText','members','active','skillEnableJS','updateCommandNameWindow','Game_Unit_isAllDead','PayJS','WyvAg','YUtlD','AGI','onEraseBuffGlobalJS','Costs','applyStateCategoryRemovalEffects','<troop-%1>','UKbFA','ARRAYFUNC','user','DiuUf','placeGauge','menuActor','mjiiG','Skills','return\x200','createAllSkillCostText','right','Sprite_Gauge_currentMaxValue','stateAddJS','onExpireBuffJS','OTwVK','getStateIdWithName','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','addDebuff','onExpireBuff','buff','Game_BattlerBase_increaseBuff','QGluR','VisuMZ_1_ElementStatusCore','xLZiY','iconIndex','_battler','onAddStateMakeCustomSlipValues','statusWindowRectSkillsStatesCore','applySkillsStatesCoreEffects','log','exit','isCommandEnabled','itemWindowRect','ioUkA','helpWindowRect','helpAreaHeight','AHBnu','refresh','greater','drawItemStyleIconText','uiInputPosition','createTurnDisplaySprite','meetsSkillConditions','Game_Actor_learnSkill','makeAdditionalSkillCostText','meetsPassiveStateConditionSwitches','commandStyle','boxWidth','RkUHT','stateHpSlipDamageJS','EUfDy','BattleHiddenSkillTypes','MaxTurns','setStatusWindow','ParseStateNotetags','recover\x20all','stateColor','_shopStatusWindow','Parse_Notetags_Skill_JS','removeBuffsAuto','getCurrentTroopUniqueID','Sprite_Gauge_initMembers','opacity','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','mlUfB','setStateOrigin','llblp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','MAXHP','NUM','actions','HJZQS','Game_BattlerBase_initMembers','ListWindowCols','Window_SkillList_maxCols','enemyId','ceil','Actor','clearStateOrigin','ReapplyRules','commandName','magicSkills','usableSkills','updateFrame','round','heXhU','getCurrentStateActiveUser','PassiveConditionJS','mainFontFace','forgetSkill','Enemy','removeState','MDwdY','Zjjbg','onAddStateJS','_currentTroopUniqueID','Game_Battler_regenerateAll','POSITIVE','isPartyAllAffectedByGroupDefeatStates','DataFontSize','isUseSkillsStatesCoreUpdatedLayout','maxCols','includesSkillsStatesCore','_categoryWindow','Window_SkillType_initialize','isBuffExpired','Parse_Notetags_State_ApplyRemoveLeaveJS','updateTurnDisplaySprite','checkSkillTypeMatch','_stypeIDs','process_VisuMZ_SkillsStatesCore_State_Notetags','qTqzl','heal','ignore','stateMpSlipDamageJS','MAT','drawItemStyleIcon','death','getSkillIdWithName','Game_BattlerBase_meetsSkillConditions','_stored_debuffColor','GaugeCurrentJS','TurnOffsetX','uiMenuStyle','canUse','setStateData','nGcuR','Scene_Skill_helpWindowRect','Game_BattlerBase_refresh','_stateRetainType','paramBuffRate','setPassiveStateSlipDamageJS','gaugeRate','HGfho','lGnIQ','drawItem','LUK','commandNameWindowDrawText','checkShowHideBattleNotetags','loadBitmap','itemAt','prototype','acTdR','_statusWindow','gMAnx','stateEraseJS','TurnOffsetY','learnSkill','_stateMaxTurns','LNLqf','IBXPQ','onExpireDebuff','jVsxf','yGTKt','damage','onEraseDebuffJS','onEraseStateCustomJS','itemLineRect','oEIPJ','currentMaxValue','onRegenerateCustomStateDamageOverTime','passiveStateObjects','priority','Window_SkillStatus_refresh','clearStateRetainType','applyBuffTurnManipulationEffects','rSfRB','callUpdateHelp','floor','ARRAYEVAL','bitmap','ShowTurns','jPwRw','rTvXs','setDebuffTurns','_commandNameWindow','Zgqkc','raJfi','bYUUQ','_animationIndex','drawExtendedParameter','concat','_stored_buffColor','Parse_Notetags_State_SlipEffectJS','onExpireStateCustomJS','Jkrug','#%1','FUNC','XjKgY','text','Game_BattlerBase_states','makeCommandName','hGWxk','CmdStyle','actorId','meetsPassiveStateGlobalConditionJS','rPEYR','Scene_Skill_createItemWindow','buffColor','fillRect','Game_BattlerBase_eraseBuff','HiddenSkillTypes','maxItems','drawExtendedSkillsStatesCoreStatus','debuffTurns','SkillSceneAdjustSkillList','SWLWR','onExpireDebuffJS','gainSilentTp','changeTextColor','pOLfx','Game_BattlerBase_recoverAll','Game_Actor_forgetSkill','gainHp','initMembers','fontSize','shift','anchor','toLowerCase','%1\x20%2\x20%3','Game_Battler_addBuff','updatedLayoutStyle','yDnXv','applyDebuffTurnManipulationEffects','UfnWw','changePaintOpacity','retrieveStateColor','helpWindowRectSkillsStatesCore','drawText','drawActorStateData','getStateOriginByKey','onAddBuffJS','bnsqE','process_VisuMZ_SkillsStatesCore_Notetags','QOMUB','IconStypeMagic','_actor','applyItemUserEffect','onAddState','currentValue','ZzUHR','VKoor','onExpireBuffGlobalJS','initMembersSkillsStatesCore','Scene_Boot_onDatabaseLoaded','addBuffTurns','NdjVo','height','VisuMZ_0_CoreEngine','note','Settings','onAddBuffGlobalJS','_subject','replace','addPassiveStatesFromOtherPlugins','Window_SkillList_setActor','drawActorBuffRates','ParseAllNotetags','<actor-%1>','actor','ykjxE','index','decreaseBuff','EoYYa','statusWindowRect','xtbSr','dBIxr','BcKwO','success','sxJRG','inBattle','Jasms','BxRPU','parse','paySkillCost','EnableLayout','StackDebuffMax','getStateData','onEraseBuff','RYzSD','_result','isActor','setItem','_turnDisplaySprite','rQZPM','SkillMenuStatusRect','checkShowHideJS','max','buttonAssistText1','trim','Game_BattlerBase_overwriteBuffTurns','stateMpSlipHealJS','Game_Action_applyItemUserEffect','_costSettings','meetsPassiveStateConditions','Sprite_Gauge_gaugeRate','currentValueSkillsStatesCore','untitled','onAddDebuffGlobalJS','uiHelpPosition','statusWidth','STRUCT','MultiplierJS','description','addBuff','onDatabaseLoaded','isBuffAffected','skillMpCost','helpAreaTop','hyVDi','Bzouy','enemy','gaugeLineHeight','Buffs','isAllDead','drawFullGauge','add','OggeG','zYiBz','eraseBuff','EVAL','isPassiveStateStackable','_stateTurns','DataOffsetY','isSkillUsableForAutoBattle','<member-%1>','createCommandNameWindow','SkillsStatesCore','fontBold','isPlaytest','itemWindowRectSkillsStatesCore','ParseSkillNotetags','frameCount','RxBod','drawActorBuffTurns','GaugeDrawJS','makeSuccess','PrIUr','format','drawActorIconsAllTurnCounters','ARRAYSTR','ShowShopStatus','TUnsY','status','shopStatusWindowRectSkillsStatesCore','Sprite_StateIcon_updateFrame','MDF','BzERP','_stateIDs','equips','ieUWn','calcWindowHeight','stateMaximumTurns','getStateRetainType','addCommand','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','MAXMP','stateTurns','process_VisuMZ_SkillsStatesCore_Skill_Notetags','getStypeIdWithName','nIdFz','toUpperCase','RbuLd','YkMDi','CanPayJS','eraseState','skillTypeWindowRect','YROsV','calmY','checkCacheKey','gCXQx','resetStateCounts','center','Window_StatusBase_drawActorIcons','stateHpSlipHealJS','removeBuff','Scene_Skill_itemWindowRect','removeStatesByCategory','asicM','DataOffsetX','textSizeEx','isBuffOrDebuffAffected','DEF','autoRemovalTiming','pwJFw','NEGATIVE','addChild','stateId'];(function(_0x5e17b7,_0x421808){const _0x2eb659=function(_0x58bc34){while(--_0x58bc34){_0x5e17b7['push'](_0x5e17b7['shift']());}};_0x2eb659(++_0x421808);}(_0x4218,0x8e));const _0x2eb6=function(_0x5e17b7,_0x421808){_0x5e17b7=_0x5e17b7-0x0;let _0x2eb659=_0x4218[_0x5e17b7];return _0x2eb659;};const _0x413554=_0x2eb6;var label=_0x413554('0x1ea'),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1139aa){const _0x5abc9a=_0x413554;return _0x1139aa[_0x5abc9a('0x1fa')]&&_0x1139aa[_0x5abc9a('0x1d2')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x413554('0x19d')]=VisuMZ[label][_0x413554('0x19d')]||{},VisuMZ[_0x413554('0x29c')]=function(_0xea1577,_0x368b30){const _0x2daed0=_0x413554;for(const _0x39e992 in _0x368b30){if(_0x39e992[_0x2daed0('0x56')](/(.*):(.*)/i)){if('gCXQx'!==_0x2daed0('0x215')){function _0x4d1e31(){const _0x2b8b8e=_0x2daed0,_0xca4e5=_0x425fa4(_0x355786['$1']),_0x2ba0d9=_0x32c316[_0x2b8b8e('0x1f5')](_0xca4e5);_0xcdbb9e[_0x2b8b8e('0x1ea')][_0x2b8b8e('0xaf')][_0x434339['id']]=new _0x1493c2('stateId',_0x2ba0d9);}}else{const _0xc81e0f=String(RegExp['$1']),_0x307c2b=String(RegExp['$2'])[_0x2daed0('0x20c')]()[_0x2daed0('0x1c4')]();let _0xff0d37,_0x831de,_0x42aed3;switch(_0x307c2b){case _0x2daed0('0xe8'):_0xff0d37=_0x368b30[_0x39e992]!==''?Number(_0x368b30[_0x39e992]):0x0;break;case'ARRAYNUM':_0x831de=_0x368b30[_0x39e992]!==''?JSON[_0x2daed0('0x1b4')](_0x368b30[_0x39e992]):[],_0xff0d37=_0x831de[_0x2daed0('0x7f')](_0xbf86c4=>Number(_0xbf86c4));break;case _0x2daed0('0x1e3'):_0xff0d37=_0x368b30[_0x39e992]!==''?eval(_0x368b30[_0x39e992]):null;break;case _0x2daed0('0x14c'):_0x831de=_0x368b30[_0x39e992]!==''?JSON[_0x2daed0('0x1b4')](_0x368b30[_0x39e992]):[],_0xff0d37=_0x831de['map'](_0x18ce0e=>eval(_0x18ce0e));break;case _0x2daed0('0x2ab'):_0xff0d37=_0x368b30[_0x39e992]!==''?JSON[_0x2daed0('0x1b4')](_0x368b30[_0x39e992]):'';break;case _0x2daed0('0x22d'):_0x831de=_0x368b30[_0x39e992]!==''?JSON['parse'](_0x368b30[_0x39e992]):[],_0xff0d37=_0x831de['map'](_0x345d89=>JSON['parse'](_0x345d89));break;case _0x2daed0('0x15e'):_0xff0d37=_0x368b30[_0x39e992]!==''?new Function(JSON[_0x2daed0('0x1b4')](_0x368b30[_0x39e992])):new Function(_0x2daed0('0xab'));break;case _0x2daed0('0xa4'):_0x831de=_0x368b30[_0x39e992]!==''?JSON['parse'](_0x368b30[_0x39e992]):[],_0xff0d37=_0x831de[_0x2daed0('0x7f')](_0x550339=>new Function(JSON[_0x2daed0('0x1b4')](_0x550339)));break;case'STR':_0xff0d37=_0x368b30[_0x39e992]!==''?String(_0x368b30[_0x39e992]):'';break;case _0x2daed0('0x1f7'):_0x831de=_0x368b30[_0x39e992]!==''?JSON[_0x2daed0('0x1b4')](_0x368b30[_0x39e992]):[],_0xff0d37=_0x831de[_0x2daed0('0x7f')](_0x32ebd8=>String(_0x32ebd8));break;case _0x2daed0('0x1d0'):_0x42aed3=_0x368b30[_0x39e992]!==''?JSON['parse'](_0x368b30[_0x39e992]):{},_0xea1577[_0xc81e0f]={},VisuMZ['ConvertParams'](_0xea1577[_0xc81e0f],_0x42aed3);continue;case _0x2daed0('0x2ad'):_0x831de=_0x368b30[_0x39e992]!==''?JSON[_0x2daed0('0x1b4')](_0x368b30[_0x39e992]):[],_0xff0d37=_0x831de[_0x2daed0('0x7f')](_0x55b83c=>VisuMZ[_0x2daed0('0x29c')]({},JSON[_0x2daed0('0x1b4')](_0x55b83c)));break;default:continue;}_0xea1577[_0xc81e0f]=_0xff0d37;}}}return _0xea1577;},(_0x4d6fbb=>{const _0x94c86b=_0x413554,_0x313d78=_0x4d6fbb[_0x94c86b('0x91')];for(const _0x408af1 of dependencies){if(!Imported[_0x408af1]){alert(_0x94c86b('0x206')[_0x94c86b('0x1f5')](_0x313d78,_0x408af1)),SceneManager[_0x94c86b('0xc1')]();break;}}const _0xbd7cee=_0x4d6fbb[_0x94c86b('0x1d2')];if(_0xbd7cee[_0x94c86b('0x56')](/\[Version[ ](.*?)\]/i)){const _0x388550=Number(RegExp['$1']);_0x388550!==VisuMZ[label]['version']&&(alert(_0x94c86b('0x2b0')['format'](_0x313d78,_0x388550)),SceneManager[_0x94c86b('0xc1')]());}if(_0xbd7cee['match'](/\[Tier[ ](\d+)\]/i)){const _0x8881ae=Number(RegExp['$1']);if(_0x8881ae<tier)alert(_0x94c86b('0xb3')[_0x94c86b('0x1f5')](_0x313d78,_0x8881ae,tier)),SceneManager['exit']();else{if(_0x94c86b('0x155')!=='XBOef')tier=Math[_0x94c86b('0x1c2')](_0x8881ae,tier);else{function _0x31823b(){const _0x8c0235=_0x94c86b;return _0x200d19[_0x8c0235('0x1ea')][_0x8c0235('0x19d')]['Skills'][_0x8c0235('0x25c')][_0x8c0235('0x24d')](this,_0x1ab197);}}}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x4d6fbb['parameters']);})(pluginData),VisuMZ['SkillsStatesCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot['prototype'][_0x413554('0x1d4')]=function(){const _0x313b0b=_0x413554;VisuMZ['SkillsStatesCore'][_0x313b0b('0x197')]['call'](this),this[_0x313b0b('0x18c')]();},Scene_Boot['prototype'][_0x413554('0x18c')]=function(){const _0xa4e2ce=_0x413554;if(VisuMZ[_0xa4e2ce('0x1a4')])return;this[_0xa4e2ce('0x209')](),this[_0xa4e2ce('0x111')]();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x538272=_0x413554;for(const _0x57c696 of $dataSkills){if(_0x538272('0x18d')!==_0x538272('0x18d')){function _0x853bb3(){const _0x3042a6=_0x538272;_0x463123+=this[_0x3042a6('0x268')](_0x48ba6a),this[_0x3042a6('0x231')](_0x3f4776,_0x3201ed);}}else{if(!_0x57c696)continue;VisuMZ[_0x538272('0x1ea')][_0x538272('0x29f')](_0x57c696),VisuMZ['SkillsStatesCore'][_0x538272('0xdd')](_0x57c696);}}},Scene_Boot[_0x413554('0x130')][_0x413554('0x111')]=function(){const _0x42b709=_0x413554;for(const _0x3d060a of $dataStates){if(!_0x3d060a)continue;VisuMZ[_0x42b709('0x1ea')][_0x42b709('0x2b2')](_0x3d060a),VisuMZ[_0x42b709('0x1ea')][_0x42b709('0x6b')](_0x3d060a),VisuMZ[_0x42b709('0x1ea')][_0x42b709('0x15a')](_0x3d060a),VisuMZ[_0x42b709('0x1ea')][_0x42b709('0x10d')](_0x3d060a);}},VisuMZ['SkillsStatesCore'][_0x413554('0x1ee')]=VisuMZ[_0x413554('0x1ee')],VisuMZ[_0x413554('0x1ee')]=function(_0x290595){const _0x5e1011=_0x413554;VisuMZ[_0x5e1011('0x1ea')][_0x5e1011('0x1ee')][_0x5e1011('0x24d')](this,_0x290595),VisuMZ[_0x5e1011('0x1ea')]['Parse_Notetags_Skill_Cost'](_0x290595),VisuMZ[_0x5e1011('0x1ea')]['Parse_Notetags_Skill_JS'](_0x290595);},VisuMZ[_0x413554('0x1ea')][_0x413554('0xd9')]=VisuMZ[_0x413554('0xd9')],VisuMZ[_0x413554('0xd9')]=function(_0x49cca1){const _0x164f21=_0x413554;VisuMZ[_0x164f21('0x1ea')]['ParseStateNotetags'][_0x164f21('0x24d')](this,_0x49cca1),VisuMZ['SkillsStatesCore'][_0x164f21('0x2b2')](_0x49cca1),VisuMZ[_0x164f21('0x1ea')]['Parse_Notetags_State_PassiveJS'](_0x49cca1),VisuMZ[_0x164f21('0x1ea')][_0x164f21('0x15a')](_0x49cca1),VisuMZ[_0x164f21('0x1ea')][_0x164f21('0x10d')](_0x49cca1);},VisuMZ[_0x413554('0x1ea')][_0x413554('0x29f')]=function(_0x24236c){const _0x1771d4=_0x413554,_0x4f5300=_0x24236c[_0x1771d4('0x19c')];if(_0x4f5300[_0x1771d4('0x56')](/<MP COST:[ ](\d+)>/i)){if(_0x1771d4('0x13c')===_0x1771d4('0x1f0')){function _0x4b2ffb(){const _0x572284=_0x1771d4;return _0x149d78[_0x572284('0x1ea')][_0x572284('0xae')][_0x572284('0x24d')](this);}}else _0x24236c['mpCost']=Number(RegExp['$1']);}if(_0x4f5300[_0x1771d4('0x56')](/<TP COST:[ ](\d+)>/i)){if(_0x1771d4('0x25f')!=='oHGYA'){function _0x1c498a(){const _0x582242=_0x1771d4;_0xaa4bf2[_0x582242('0x1ea')][_0x582242('0x19d')][_0x582242('0x1dc')]['onEraseDebuffJS'][_0x582242('0x24d')](this,_0x332a54);}}else _0x24236c['tpCost']=Number(RegExp['$1']);}},VisuMZ[_0x413554('0x1ea')][_0x413554('0x98')]={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x5e')]={},VisuMZ[_0x413554('0x1ea')][_0x413554('0xdd')]=function(_0x35c041){const _0x2e7a71=_0x413554,_0x4cf8e2=_0x35c041[_0x2e7a71('0x19c')];if(_0x4cf8e2['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x41f2f5=String(RegExp['$1']),_0x50e0f9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2e7a71('0x1f5')](_0x41f2f5);VisuMZ[_0x2e7a71('0x1ea')][_0x2e7a71('0x98')][_0x35c041['id']]=new Function('skill',_0x50e0f9);}if(_0x4cf8e2['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x19207e=String(RegExp['$1']),_0x2aaf61=_0x2e7a71('0x32')[_0x2e7a71('0x1f5')](_0x19207e);VisuMZ['SkillsStatesCore'][_0x2e7a71('0x5e')][_0x35c041['id']]=new Function(_0x2e7a71('0x78'),_0x2aaf61);}},VisuMZ['SkillsStatesCore'][_0x413554('0x2b2')]=function(_0x251d88){const _0x5cefdf=_0x413554;_0x251d88[_0x5cefdf('0x2b3')]=[_0x5cefdf('0x4d'),'ANY'];const _0x24b639=_0x251d88['note'],_0x521ce6=_0x24b639[_0x5cefdf('0x56')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x521ce6){if(_0x5cefdf('0x7e')!==_0x5cefdf('0x7e')){function _0x201d5a(){const _0x2a8e87=_0x5cefdf;return _0x454cc2[_0x2a8e87('0x1ea')][_0x2a8e87('0x19d')]['States']['ColorNeutral'];}}else for(const _0x3df2df of _0x521ce6){if(_0x5cefdf('0x263')===_0x5cefdf('0x128')){function _0x38bfab(){const _0x34352c=_0x5cefdf;_0x217a19[_0x34352c('0x1ea')]['Window_SkillStatus_refresh']['call'](this);if(this[_0x34352c('0x18f')])this[_0x34352c('0x16e')]();}}else{_0x3df2df['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x69758e=String(RegExp['$1'])[_0x5cefdf('0x20c')]()[_0x5cefdf('0x1c4')]()[_0x5cefdf('0x24f')](',');for(const _0x1ed115 of _0x69758e){if(_0x5cefdf('0x167')!==_0x5cefdf('0x167')){function _0x71434d(){const _0x20ab45=_0x5cefdf,_0x5a3ee9=_0x58ba39(_0x5042e6['$1']),_0x33a5af=_0x5dceba[_0x20ab45('0x1f5')](_0x5a3ee9,_0x20ab45('0x13d'),-0x1,'slipMp');_0x2d9809['SkillsStatesCore'][_0x20ab45('0x115')][_0x22775e['id']]=new _0x2be8c9(_0x20ab45('0x226'),_0x33a5af);}}else _0x251d88['categories'][_0x5cefdf('0x2a8')](_0x1ed115[_0x5cefdf('0x1c4')]());}}}}if(_0x24b639[_0x5cefdf('0x56')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x123319=RegExp['$1'][_0x5cefdf('0x24f')](/[\r\n]+/);for(const _0x30c691 of _0x123319){if(_0x5cefdf('0x112')!==_0x5cefdf('0xff'))_0x251d88[_0x5cefdf('0x2b3')][_0x5cefdf('0x2a8')](_0x30c691['toUpperCase']()[_0x5cefdf('0x1c4')]());else{function _0x1f5de2(){const _0x5b2adb=_0x5cefdf,_0x8e31cb=_0x174f45(_0x40a6ba['$1']);_0x141aa0[_0x5b2adb('0x3a')]();}}}}_0x24b639['match'](/<POSITIVE STATE>/i)&&_0x251d88[_0x5cefdf('0x2b3')]['push'](_0x5cefdf('0x104')),_0x24b639[_0x5cefdf('0x56')](/<NEGATIVE STATE>/i)&&_0x251d88[_0x5cefdf('0x2b3')][_0x5cefdf('0x2a8')](_0x5cefdf('0x224'));},VisuMZ[_0x413554('0x1ea')][_0x413554('0x93')]={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x6b')]=function(_0x3e74ce){const _0x16bfc2=_0x413554,_0x5d3f13=_0x3e74ce[_0x16bfc2('0x19c')];if(_0x5d3f13['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if(_0x16bfc2('0x22')!==_0x16bfc2('0xba')){const _0x43db72=String(RegExp['$1']),_0xafbaa1=_0x16bfc2('0x6a')[_0x16bfc2('0x1f5')](_0x43db72);VisuMZ[_0x16bfc2('0x1ea')][_0x16bfc2('0x93')][_0x3e74ce['id']]=new Function('state',_0xafbaa1);}else{function _0x50be43(){const _0x1f9ffc=_0x16bfc2;return _0x66659d[_0x1f9ffc('0x130')]['isRightInputMode']['call'](this);}}}},VisuMZ[_0x413554('0x1ea')][_0x413554('0xd4')]={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x219')]={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x115')]={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x1c6')]={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x6f')]={},VisuMZ[_0x413554('0x1ea')]['stateTpSlipHealJS']={},VisuMZ[_0x413554('0x1ea')]['Parse_Notetags_State_SlipEffectJS']=function(_0x13704c){const _0x14c7be=_0x413554,_0x3304da=_0x13704c[_0x14c7be('0x19c')],_0x5c880d=_0x14c7be('0xe2');if(_0x3304da[_0x14c7be('0x56')](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if(_0x14c7be('0xc4')===_0x14c7be('0x20d')){function _0x254626(){const _0x4de046=_0x14c7be;if(typeof _0x41054d!==_0x4de046('0x83'))_0x29db90=_0x4a9c7b['id'];if(this[_0x4de046('0x40')](_0x44c19d)){const _0x4f62a1=_0x2a28f3[_0x4de046('0x203')](_0x2a300f);this['_stateTurns'][_0x3ba593]=_0x34a2ab[_0x4de046('0x29b')](0x0,_0x4f62a1);if(this[_0x4de046('0x1e5')][_0x3360e5]<=0x0)this[_0x4de046('0xfe')](_0x3a9995);}}}else{const _0x28b00c=String(RegExp['$1']),_0x27d6f5=_0x5c880d[_0x14c7be('0x1f5')](_0x28b00c,_0x14c7be('0x13d'),-0x1,_0x14c7be('0x6e'));VisuMZ[_0x14c7be('0x1ea')]['stateHpSlipDamageJS'][_0x13704c['id']]=new Function('stateId',_0x27d6f5);}}else{if(_0x3304da['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0xb425e5=String(RegExp['$1']),_0x35e55c=_0x5c880d[_0x14c7be('0x1f5')](_0xb425e5,_0x14c7be('0x113'),0x1,'slipHp');VisuMZ[_0x14c7be('0x1ea')][_0x14c7be('0x219')][_0x13704c['id']]=new Function(_0x14c7be('0x226'),_0x35e55c);}}if(_0x3304da[_0x14c7be('0x56')](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x5ee486=String(RegExp['$1']),_0x35978e=_0x5c880d[_0x14c7be('0x1f5')](_0x5ee486,_0x14c7be('0x13d'),-0x1,_0x14c7be('0x2e'));VisuMZ[_0x14c7be('0x1ea')]['stateMpSlipDamageJS'][_0x13704c['id']]=new Function('stateId',_0x35978e);}else{if(_0x3304da[_0x14c7be('0x56')](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x121ab7=String(RegExp['$1']),_0x4e604d=_0x5c880d[_0x14c7be('0x1f5')](_0x121ab7,_0x14c7be('0x113'),0x1,_0x14c7be('0x2e'));VisuMZ[_0x14c7be('0x1ea')][_0x14c7be('0x1c6')][_0x13704c['id']]=new Function('stateId',_0x4e604d);}}if(_0x3304da[_0x14c7be('0x56')](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0xfd6ef2=String(RegExp['$1']),_0x3a2048=_0x5c880d['format'](_0xfd6ef2,'damage',-0x1,_0x14c7be('0x22b'));VisuMZ['SkillsStatesCore'][_0x14c7be('0x6f')][_0x13704c['id']]=new Function(_0x14c7be('0x226'),_0x3a2048);}else{if(_0x3304da[_0x14c7be('0x56')](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x1de237=String(RegExp['$1']),_0x327b62=_0x5c880d['format'](_0x1de237,_0x14c7be('0x113'),0x1,_0x14c7be('0x22b'));VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'][_0x13704c['id']]=new Function(_0x14c7be('0x226'),_0x327b62);}}},VisuMZ['SkillsStatesCore']['stateAddJS']={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x134')]={},VisuMZ[_0x413554('0x1ea')]['stateExpireJS']={},VisuMZ[_0x413554('0x1ea')][_0x413554('0x10d')]=function(_0x3b26bf){const _0x190db8=_0x413554,_0x280b95=_0x3b26bf[_0x190db8('0x19c')],_0x41cdb2='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x280b95[_0x190db8('0x56')](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x46090d=String(RegExp['$1']),_0x9296e6=_0x41cdb2[_0x190db8('0x1f5')](_0x46090d);VisuMZ[_0x190db8('0x1ea')][_0x190db8('0xaf')][_0x3b26bf['id']]=new Function(_0x190db8('0x226'),_0x9296e6);}if(_0x280b95[_0x190db8('0x56')](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if('gejfA'===_0x190db8('0x8a')){function _0xdb97e9(){if(_0x2eac31['match'](/<member-(\d+)>/i))return _0x459530['members']()[_0x2ad917(_0x5cf06c['$1'])];}}else{const _0x3727e1=String(RegExp['$1']),_0xdde820=_0x41cdb2[_0x190db8('0x1f5')](_0x3727e1);VisuMZ[_0x190db8('0x1ea')]['stateEraseJS'][_0x3b26bf['id']]=new Function('stateId',_0xdde820);}}if(_0x280b95['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x544501=String(RegExp['$1']),_0x57aae8=_0x41cdb2['format'](_0x544501);VisuMZ[_0x190db8('0x1ea')][_0x190db8('0x9')][_0x3b26bf['id']]=new Function(_0x190db8('0x226'),_0x57aae8);}},DataManager[_0x413554('0x1e')]=function(_0x351849){const _0x33f18b=_0x413554;this[_0x33f18b('0x110')]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x351849['id']])return this[_0x33f18b('0x110')][_0x351849['id']];this[_0x33f18b('0x110')][_0x351849['id']]=[_0x351849['stypeId']];if(_0x351849[_0x33f18b('0x19c')][_0x33f18b('0x56')](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x42d947=JSON[_0x33f18b('0x1b4')]('['+RegExp['$1'][_0x33f18b('0x56')](/\d+/g)+']');this[_0x33f18b('0x110')][_0x351849['id']]=this['_stypeIDs'][_0x351849['id']]['concat'](_0x42d947);}else{if(_0x351849[_0x33f18b('0x19c')][_0x33f18b('0x56')](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x33f18b('0x181')!==_0x33f18b('0x181')){function _0x153f12(){const _0x4e86ce=_0x33f18b,_0x29f89f=_0x15c3b3(_0x131645['$1']),_0x3703fc=_0x4e86ce('0xe6')[_0x4e86ce('0x1f5')](_0x29f89f);_0x80235a[_0x4e86ce('0x1ea')][_0x4e86ce('0x98')][_0x13aad9['id']]=new _0x3be3ff(_0x4e86ce('0x78'),_0x3703fc);}}else{const _0x321476=RegExp['$1'][_0x33f18b('0x24f')](',');for(const _0x39e7f5 of _0x321476){const _0x594ce5=DataManager[_0x33f18b('0x20a')](_0x39e7f5);if(_0x594ce5)this[_0x33f18b('0x110')][_0x351849['id']][_0x33f18b('0x2a8')](_0x594ce5);}}}}return this[_0x33f18b('0x110')][_0x351849['id']];},DataManager[_0x413554('0x20a')]=function(_0x6961d8){const _0x1550ba=_0x413554;_0x6961d8=_0x6961d8[_0x1550ba('0x20c')]()[_0x1550ba('0x1c4')](),this['_stypeIDs']=this['_stypeIDs']||{};if(this[_0x1550ba('0x110')][_0x6961d8])return this[_0x1550ba('0x110')][_0x6961d8];for(let _0x4758c6=0x1;_0x4758c6<0x64;_0x4758c6++){if(!$dataSystem[_0x1550ba('0x26')][_0x4758c6])continue;let _0x20db3a=$dataSystem[_0x1550ba('0x26')][_0x4758c6][_0x1550ba('0x20c')]()[_0x1550ba('0x1c4')]();_0x20db3a=_0x20db3a[_0x1550ba('0x1a0')](/\x1I\[(\d+)\]/gi,''),_0x20db3a=_0x20db3a[_0x1550ba('0x1a0')](/\\I\[(\d+)\]/gi,''),this[_0x1550ba('0x110')][_0x20db3a]=_0x4758c6;}return this['_stypeIDs'][_0x6961d8]||0x0;},DataManager['getSkillIdWithName']=function(_0xa4f6f3){const _0x47294f=_0x413554;_0xa4f6f3=_0xa4f6f3[_0x47294f('0x20c')]()['trim'](),this[_0x47294f('0x2a3')]=this[_0x47294f('0x2a3')]||{};if(this[_0x47294f('0x2a3')][_0xa4f6f3])return this[_0x47294f('0x2a3')][_0xa4f6f3];for(const _0x22f890 of $dataSkills){if('bvHLE'==='mIIvV'){function _0x5419b4(){const _0xdbc0a2=_0x47294f,_0x35ac7b=_0x56ef99[_0xdbc0a2('0x288')]['call'](this,_0x5e8e39);_0x20f5e7['PayJS']['call'](this,_0x40b394,_0x35ac7b);}}else{if(!_0x22f890)continue;this[_0x47294f('0x2a3')][_0x22f890[_0x47294f('0x91')]['toUpperCase']()['trim']()]=_0x22f890['id'];}}return this['_skillIDs'][_0xa4f6f3]||0x0;},DataManager[_0x413554('0xb2')]=function(_0x460a64){const _0x1dfce0=_0x413554;_0x460a64=_0x460a64['toUpperCase']()['trim'](),this[_0x1dfce0('0x1ff')]=this[_0x1dfce0('0x1ff')]||{};if(this[_0x1dfce0('0x1ff')][_0x460a64])return this['_stateIDs'][_0x460a64];for(const _0x47d973 of $dataStates){if(!_0x47d973)continue;this[_0x1dfce0('0x1ff')][_0x47d973[_0x1dfce0('0x91')][_0x1dfce0('0x20c')]()[_0x1dfce0('0x1c4')]()]=_0x47d973['id'];}return this['_stateIDs'][_0x460a64]||0x0;},DataManager[_0x413554('0x203')]=function(_0x5c2011){const _0x6663ab=_0x413554;this[_0x6663ab('0x137')]=this[_0x6663ab('0x137')]||{};if(this['_stateMaxTurns'][_0x5c2011])return this['_stateMaxTurns'][_0x5c2011];return $dataStates[_0x5c2011]['note'][_0x6663ab('0x56')](/<MAX TURNS:[ ](\d+)>/i)?this[_0x6663ab('0x137')][_0x5c2011]=Number(RegExp['$1']):this[_0x6663ab('0x137')][_0x5c2011]=VisuMZ[_0x6663ab('0x1ea')]['Settings']['States']['MaxTurns'],this[_0x6663ab('0x137')][_0x5c2011];},ColorManager[_0x413554('0x0')]=function(_0x44c4db,_0x249e42){const _0x530ab0=_0x413554;return _0x249e42=String(_0x249e42),this[_0x530ab0('0x67')]=this['_colorCache']||{},_0x249e42[_0x530ab0('0x56')](/#(.*)/i)?this[_0x530ab0('0x67')][_0x44c4db]=_0x530ab0('0x15d')[_0x530ab0('0x1f5')](String(RegExp['$1'])):this[_0x530ab0('0x67')][_0x44c4db]=this[_0x530ab0('0x2c')](Number(_0x249e42)),this['_colorCache'][_0x44c4db];},ColorManager[_0x413554('0x256')]=function(_0x27fcb5){const _0x3f8bb1=_0x413554;_0x27fcb5=String(_0x27fcb5);if(_0x27fcb5[_0x3f8bb1('0x56')](/#(.*)/i)){if(_0x3f8bb1('0x2af')===_0x3f8bb1('0x18b')){function _0x82157d(){const _0x8be687=_0x3f8bb1;this[_0x8be687('0x174')](_0x3094dd[_0x8be687('0x2aa')]()),this['changeOutlineColor'](_0x3dea87[_0x8be687('0x249')]());}}else return _0x3f8bb1('0x15d')['format'](String(RegExp['$1']));}else{if('TUnsY'!==_0x3f8bb1('0x1f9')){function _0x3ef0fc(){const _0x248b7d=_0x3f8bb1;if(!this[_0x248b7d('0x18f')][_0x248b7d('0x271')](_0x1f4046))return![];}}else return this[_0x3f8bb1('0x2c')](Number(_0x27fcb5));}},ColorManager[_0x413554('0xdb')]=function(_0x2ee4bf){const _0x21587f=_0x413554;if(typeof _0x2ee4bf===_0x21587f('0x83'))_0x2ee4bf=$dataStates[_0x2ee4bf];const _0x4bd5df=_0x21587f('0x69')[_0x21587f('0x1f5')](_0x2ee4bf['id']);this[_0x21587f('0x67')]=this[_0x21587f('0x67')]||{};if(this['_colorCache'][_0x4bd5df])return this['_colorCache'][_0x4bd5df];const _0xf7c805=this[_0x21587f('0x185')](_0x2ee4bf);return this[_0x21587f('0x0')](_0x4bd5df,_0xf7c805);},ColorManager[_0x413554('0x185')]=function(_0x46d50a){const _0x32a9df=_0x413554,_0x260132=_0x46d50a[_0x32a9df('0x19c')];if(_0x260132[_0x32a9df('0x56')](/<TURN COLOR:[ ](.*)>/i)){if(_0x32a9df('0x1ad')==='YjqmD'){function _0x4c1fb9(){const _0xec83c8=_0x32a9df,_0x1e491a=this[_0xec83c8('0x283')](),_0x2bcfb6=this[_0xec83c8('0x22c')][_0xec83c8('0x19a')],_0x2c7ea0=this[_0xec83c8('0x2a4')]()?0x0:_0x528630[_0xec83c8('0xd2')]-this['shopStatusWidth'](),_0x1c6147=this['_itemWindow']['y'];return new _0x2b7de4(_0x2c7ea0,_0x1c6147,_0x1e491a,_0x2bcfb6);}}else return String(RegExp['$1']);}else{if(_0x260132[_0x32a9df('0x56')](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x32a9df('0x19d')][_0x32a9df('0x4')]['ColorPositive'];else{if(_0x260132['match'](/<NEGATIVE STATE>/i))return VisuMZ[_0x32a9df('0x1ea')][_0x32a9df('0x19d')][_0x32a9df('0x4')]['ColorNegative'];else{if(_0x32a9df('0x212')!==_0x32a9df('0x212')){function _0x25e134(){const _0x1fdfd6=_0x32a9df;if(_0x2ce2c8[_0x1fdfd6('0x27e')](_0x3d44bf))return![];}}else return VisuMZ[_0x32a9df('0x1ea')][_0x32a9df('0x19d')]['States']['ColorNeutral'];}}}},ColorManager['buffColor']=function(){const _0x5871f4=_0x413554,_0x553032=_0x5871f4('0x159');this[_0x5871f4('0x67')]=this[_0x5871f4('0x67')]||{};if(this['_colorCache'][_0x553032])return this[_0x5871f4('0x67')][_0x553032];const _0x3c6e34=VisuMZ[_0x5871f4('0x1ea')][_0x5871f4('0x19d')]['Buffs'][_0x5871f4('0x79')];return this['getColorDataFromPluginParameters'](_0x553032,_0x3c6e34);},ColorManager[_0x413554('0x53')]=function(){const _0x3f1fe2=_0x413554,_0x16097c=_0x3f1fe2('0x11b');this['_colorCache']=this['_colorCache']||{};if(this[_0x3f1fe2('0x67')][_0x16097c])return this[_0x3f1fe2('0x67')][_0x16097c];const _0x2400c2=VisuMZ[_0x3f1fe2('0x1ea')]['Settings']['Buffs'][_0x3f1fe2('0x277')];return this[_0x3f1fe2('0x0')](_0x16097c,_0x2400c2);},VisuMZ[_0x413554('0x1ea')][_0x413554('0x1c7')]=Game_Action['prototype'][_0x413554('0x190')],Game_Action[_0x413554('0x130')][_0x413554('0x190')]=function(_0xbd1217){const _0x5078c7=_0x413554;VisuMZ['SkillsStatesCore'][_0x5078c7('0x1c7')][_0x5078c7('0x24d')](this,_0xbd1217),this['applySkillsStatesCoreEffects'](_0xbd1217);},Game_Action['prototype'][_0x413554('0xbf')]=function(_0x26cfcb){const _0xccf22e=_0x413554;this[_0xccf22e('0xa1')](_0x26cfcb),this['applyStateTurnManipulationEffects'](_0x26cfcb),this[_0xccf22e('0x148')](_0x26cfcb),this[_0xccf22e('0x182')](_0x26cfcb);},Game_Action[_0x413554('0x130')][_0x413554('0xa1')]=function(_0x342f83){const _0x1dc238=_0x413554;if(_0x342f83[_0x1dc238('0x290')]()['length']<=0x0)return;const _0x3ed17e=this[_0x1dc238('0x8c')]()[_0x1dc238('0x19c')];if(_0x3ed17e[_0x1dc238('0x56')](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x4a055e=String(RegExp['$1']);_0x342f83[_0x1dc238('0x3a')]();}const _0x243ea7=_0x3ed17e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x243ea7)for(const _0x11515e of _0x243ea7){if(_0x1dc238('0xc')!==_0x1dc238('0xc')){function _0x1ca242(){return!![];}}else{_0x11515e[_0x1dc238('0x56')](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x286a9f=String(RegExp['$1']),_0x144360=Number(RegExp['$2']);_0x342f83[_0x1dc238('0x21c')](_0x286a9f,_0x144360);}}},Game_Action[_0x413554('0x130')][_0x413554('0xd')]=function(_0x4dfa07){const _0x780caa=_0x413554,_0x396ac0=this[_0x780caa('0x8c')]()[_0x780caa('0x19c')],_0x2ea7ed=_0x396ac0[_0x780caa('0x56')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x2ea7ed)for(const _0x412c5d of _0x2ea7ed){let _0x4c70dd=0x0,_0x395c4d=0x0;if(_0x412c5d[_0x780caa('0x56')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x4c70dd=Number(RegExp['$1']),_0x395c4d=Number(RegExp['$2']);else _0x412c5d['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x4c70dd=DataManager['getStateIdWithName'](RegExp['$1']),_0x395c4d=Number(RegExp['$2']));_0x4dfa07[_0x780caa('0x231')](_0x4c70dd,_0x395c4d),this[_0x780caa('0x1f3')](_0x4dfa07);}const _0x149ef=_0x396ac0[_0x780caa('0x56')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x149ef)for(const _0x318256 of _0x149ef){let _0xbb6f97=0x0,_0x16c79f=0x0;if(_0x318256[_0x780caa('0x56')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x780caa('0x2')!==_0x780caa('0x52'))_0xbb6f97=Number(RegExp['$1']),_0x16c79f=Number(RegExp['$2']);else{function _0x185259(){const _0x216dfb=_0x780caa;if(!this[_0x216dfb('0x11f')](_0x378c47))return![];const _0xe32bad=this[_0x216dfb('0x26')](),_0x45659a=_0xfaba84[_0x216dfb('0x1e')](_0x251c71),_0x18a09d=_0xe32bad[_0x216dfb('0x25d')](_0x448545=>_0x45659a[_0x216dfb('0x14')](_0x448545));return _0x18a09d['length']>0x0;}}}else _0x318256['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0xbb6f97=DataManager[_0x780caa('0xb2')](RegExp['$1']),_0x16c79f=Number(RegExp['$2']));_0x4dfa07['addStateTurns'](_0xbb6f97,_0x16c79f),this[_0x780caa('0x1f3')](_0x4dfa07);}},Game_Action[_0x413554('0x130')][_0x413554('0x148')]=function(_0x4724b6){const _0x10c93e=_0x413554,_0x1433ad=['MAXHP',_0x10c93e('0x207'),'ATK',_0x10c93e('0x221'),_0x10c93e('0x116'),'MDF',_0x10c93e('0x9e'),_0x10c93e('0x12b')],_0x39680f=this[_0x10c93e('0x8c')]()[_0x10c93e('0x19c')],_0x5eecda=_0x39680f[_0x10c93e('0x56')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x5eecda){if(_0x10c93e('0x68')===_0x10c93e('0x100')){function _0x3cfad1(){const _0xa63f=_0x10c93e;return this[_0xa63f('0x268')](_0x4f98a6);}}else for(const _0x37c4ea of _0x5eecda){if(_0x10c93e('0xd5')!==_0x10c93e('0x274')){_0x37c4ea[_0x10c93e('0x56')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3bc021=_0x1433ad[_0x10c93e('0x81')](String(RegExp['$1'])[_0x10c93e('0x20c')]()),_0x58f78c=Number(RegExp['$2']);_0x3bc021>=0x0&&(_0x4724b6['setBuffTurns'](_0x3bc021,_0x58f78c),this[_0x10c93e('0x1f3')](_0x4724b6));}else{function _0xb21227(){const _0xc60f75=_0x10c93e;this[_0xc60f75('0xf3')](_0x20db4e)[_0xc60f75('0x56')](/\\I\[(\d+)\]/i);const _0x3b23dd=_0x4b437f(_0x4eb0e4['$1'])||0x0,_0xc16ce8=this[_0xc60f75('0x140')](_0x3ccfeb),_0x4e0d69=_0xc16ce8['x']+_0x2e2708['floor']((_0xc16ce8['width']-_0xf2b020[_0xc60f75('0x245')])/0x2),_0x3645ba=_0xc16ce8['y']+(_0xc16ce8[_0xc60f75('0x19a')]-_0x484831['iconHeight'])/0x2;this[_0xc60f75('0x287')](_0x3b23dd,_0x4e0d69,_0x3645ba);}}}}const _0xeeb265=_0x39680f[_0x10c93e('0x56')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xeeb265)for(const _0x2f84d0 of _0x5eecda){if(_0x10c93e('0x250')===_0x10c93e('0x5c')){function _0x58c4ed(){const _0x599e86=_0x10c93e,_0x49c24d=_0x13bef4[_0x599e86('0x275')][_0x599e86('0x19d')][_0x599e86('0x240')][_0x599e86('0x285')],_0x3550aa=_0x5f5131[_0x599e86('0x14b')](_0x226e58/0x2)-0x18;let _0x922654=_0x587ab4,_0x426d96=_0x3980f2[_0x599e86('0x14b')]((this[_0x599e86('0x282')]-_0x294355[_0x599e86('0xef')](_0x49c24d[_0x599e86('0x86')]/0x2)*_0x49abb1)/0x2),_0x435202=0x0;for(const _0x28b737 of _0x49c24d){this['drawExtendedParameter'](_0x922654,_0x426d96,_0x3550aa,_0x28b737),_0x435202++,_0x435202%0x2===0x0?(_0x922654=_0x477cf9,_0x426d96+=_0x16a552):_0x922654+=_0x3550aa+0x18;}}}else{_0x2f84d0[_0x10c93e('0x56')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2ce433=_0x1433ad['indexOf'](String(RegExp['$1'])[_0x10c93e('0x20c')]()),_0x17df82=Number(RegExp['$2']);_0x2ce433>=0x0&&(_0x4724b6[_0x10c93e('0x198')](_0x2ce433,_0x17df82),this[_0x10c93e('0x1f3')](_0x4724b6));}}},Game_Action[_0x413554('0x130')][_0x413554('0x182')]=function(_0x528421){const _0x14394a=_0x413554,_0x28caae=[_0x14394a('0xe7'),_0x14394a('0x207'),_0x14394a('0x243'),_0x14394a('0x221'),'MAT',_0x14394a('0x1fd'),_0x14394a('0x9e'),_0x14394a('0x12b')],_0x33c5ac=this[_0x14394a('0x8c')]()[_0x14394a('0x19c')],_0x3541ca=_0x33c5ac[_0x14394a('0x56')](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x3541ca)for(const _0x4165a1 of _0x3541ca){_0x4165a1[_0x14394a('0x56')](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x4f3016=_0x28caae[_0x14394a('0x81')](String(RegExp['$1'])[_0x14394a('0x20c')]()),_0x55bfe0=Number(RegExp['$2']);if(_0x4f3016>=0x0){if(_0x14394a('0x149')===_0x14394a('0x5')){function _0x20dc1a(){const _0x36a8b7=_0x14394a;if(typeof _0x55aadf!==_0x36a8b7('0x83'))_0x34a9e7=_0x3826f3['id'];this[_0x36a8b7('0x62')]=this[_0x36a8b7('0x62')]||{},this[_0x36a8b7('0x62')][_0x495441]=_0x558c64;}}else _0x528421[_0x14394a('0x151')](_0x4f3016,_0x55bfe0),this[_0x14394a('0x1f3')](_0x528421);}}const _0x573c79=_0x33c5ac[_0x14394a('0x56')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x573c79)for(const _0x33dfa7 of _0x3541ca){_0x33dfa7[_0x14394a('0x56')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x79b3e9=_0x28caae[_0x14394a('0x81')](String(RegExp['$1'])[_0x14394a('0x20c')]()),_0xf376c0=Number(RegExp['$2']);if(_0x79b3e9>=0x0){if(_0x14394a('0x4c')===_0x14394a('0x4c'))_0x528421['addDebuffTurns'](_0x79b3e9,_0xf376c0),this['makeSuccess'](_0x528421);else{function _0x48df85(){const _0xdd9506=_0x14394a;return this[_0xdd9506('0x262')][_0x4c4ece]===-_0x378518['SkillsStatesCore']['Settings'][_0xdd9506('0x1dc')]['StackDebuffMax'];}}}}},VisuMZ[_0x413554('0x1ea')][_0x413554('0xeb')]=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x179')],Game_BattlerBase[_0x413554('0x130')]['initMembers']=function(){const _0x5c5c17=_0x413554;this['_cache']={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x5c5c17('0x1ea')][_0x5c5c17('0xeb')][_0x5c5c17('0x24d')](this);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x196')]=function(){const _0x2d7b50=_0x413554;this[_0x2d7b50('0x124')]='',this[_0x2d7b50('0x3b')]={},this['_stateDisplay']={},this['_stateOrigin']={};},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x214')]=function(_0x174ebb){const _0x4fff78=_0x413554;return this['_cache']=this['_cache']||{},this[_0x4fff78('0x57')][_0x174ebb]!==undefined;},VisuMZ[_0x413554('0x1ea')][_0x413554('0x123')]=Game_BattlerBase[_0x413554('0x130')][_0x413554('0xc8')],Game_BattlerBase['prototype'][_0x413554('0xc8')]=function(){const _0x45fc72=_0x413554;this[_0x45fc72('0x57')]={},VisuMZ[_0x45fc72('0x1ea')][_0x45fc72('0x123')][_0x45fc72('0x24d')](this);},VisuMZ['SkillsStatesCore'][_0x413554('0x25e')]=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x210')],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x210')]=function(_0x1e68cf){const _0x59ef3a=_0x413554;let _0x14b1b5=this[_0x59ef3a('0x40')](_0x1e68cf);VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseState'][_0x59ef3a('0x24d')](this,_0x1e68cf);if(_0x14b1b5&&!this[_0x59ef3a('0x40')](_0x1e68cf))this[_0x59ef3a('0x280')](_0x1e68cf);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x280')]=function(_0x3da589){const _0x295af3=_0x413554;this[_0x295af3('0x74')](_0x3da589),this[_0x295af3('0x27')](_0x3da589),this[_0x295af3('0xf1')](_0x3da589);},VisuMZ[_0x413554('0x1ea')]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x216')],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x216')]=function(_0x497714){const _0x110053=_0x413554,_0x399bc6=$dataStates[_0x497714],_0x1e7201=this[_0x110053('0x208')](_0x497714),_0x3bfa2f=this[_0x110053('0x3')](_0x399bc6)[_0x110053('0x17d')]()[_0x110053('0x1c4')]();switch(_0x3bfa2f){case _0x110053('0x114'):if(_0x1e7201<=0x0)VisuMZ['SkillsStatesCore'][_0x110053('0x50')][_0x110053('0x24d')](this,_0x497714);break;case'reset':VisuMZ[_0x110053('0x1ea')]['Game_BattlerBase_resetStateCounts'][_0x110053('0x24d')](this,_0x497714);break;case _0x110053('0xc9'):VisuMZ[_0x110053('0x1ea')]['Game_BattlerBase_resetStateCounts'][_0x110053('0x24d')](this,_0x497714),this[_0x110053('0x1e5')][_0x497714]=Math[_0x110053('0x1c2')](this['_stateTurns'][_0x497714],_0x1e7201);break;case'add':VisuMZ['SkillsStatesCore'][_0x110053('0x50')][_0x110053('0x24d')](this,_0x497714),this[_0x110053('0x1e5')][_0x497714]+=_0x1e7201;break;default:VisuMZ[_0x110053('0x1ea')]['Game_BattlerBase_resetStateCounts'][_0x110053('0x24d')](this,_0x497714);break;}},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x3')]=function(_0x53f8f6){const _0xb43858=_0x413554,_0x1e8a3f=_0x53f8f6[_0xb43858('0x19c')];if(_0x1e8a3f['match'](/<REAPPLY RULES:[ ](.*)>/i)){if(_0xb43858('0x299')===_0xb43858('0x299'))return String(RegExp['$1']);else{function _0x1ed10f(){const _0xf2c146=_0xb43858;_0x4516a7(_0xf2c146('0xb3')[_0xf2c146('0x1f5')](_0x277f62,_0x102a3d,_0x2115d1)),_0x28b5dc['exit']();}}}else return VisuMZ[_0xb43858('0x1ea')][_0xb43858('0x19d')][_0xb43858('0x4')][_0xb43858('0xf2')];},VisuMZ[_0x413554('0x1ea')][_0x413554('0x1c5')]=Game_BattlerBase[_0x413554('0x130')]['overwriteBuffTurns'],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x1a')]=function(_0x2367f8,_0x17b460){const _0x37b048=_0x413554,_0x4c0c8b=VisuMZ[_0x37b048('0x1ea')][_0x37b048('0x19d')][_0x37b048('0x1dc')]['ReapplyRules'],_0x3b86af=this[_0x37b048('0x268')](_0x2367f8);switch(_0x4c0c8b){case _0x37b048('0x114'):if(_0x3b86af<=0x0)this[_0x37b048('0x19')][_0x2367f8]=_0x17b460;break;case _0x37b048('0x27a'):this['_buffTurns'][_0x2367f8]=_0x17b460;break;case _0x37b048('0xc9'):this[_0x37b048('0x19')][_0x2367f8]=Math[_0x37b048('0x1c2')](_0x3b86af,_0x17b460);break;case _0x37b048('0x1df'):this[_0x37b048('0x19')][_0x2367f8]+=_0x17b460;break;default:VisuMZ[_0x37b048('0x1ea')][_0x37b048('0x1c5')][_0x37b048('0x24d')](this,_0x2367f8,_0x17b460);break;}const _0x2591d3=VisuMZ[_0x37b048('0x1ea')][_0x37b048('0x19d')][_0x37b048('0x1dc')][_0x37b048('0xd7')];this[_0x37b048('0x19')][_0x2367f8]=this[_0x37b048('0x19')][_0x2367f8][_0x37b048('0x29b')](0x0,_0x2591d3);},Game_BattlerBase['prototype'][_0x413554('0x35')]=function(){const _0x58eab0=_0x413554;if(this[_0x58eab0('0x57')][_0x58eab0('0x10')]!==undefined)return this[_0x58eab0('0x57')]['groupDefeat'];this[_0x58eab0('0x57')]['groupDefeat']=![];const _0x532150=this[_0x58eab0('0x290')]();for(const _0x2ff7ee of _0x532150){if(_0x58eab0('0xa')!=='ZqtQs'){if(!_0x2ff7ee)continue;if(_0x2ff7ee[_0x58eab0('0x19c')][_0x58eab0('0x56')](/<GROUP DEFEAT>/i)){this[_0x58eab0('0x57')][_0x58eab0('0x10')]=!![];break;}}else{function _0x2d9b1e(){const _0x1b125e=_0x58eab0;for(_0x10b056 of _0x139bea['SkillsStatesCore'][_0x1b125e('0x19d')][_0x1b125e('0xa0')]){const _0x30a103=_0x4ab2d5['CalcJS'][_0x1b125e('0x24d')](this,_0x29a7ae);if(!_0x33625c['CanPayJS'][_0x1b125e('0x24d')](this,_0x1ac66c,_0x30a103))return![];}return!![];}}}return this[_0x58eab0('0x57')][_0x58eab0('0x10')];},VisuMZ[_0x413554('0x1ea')][_0x413554('0x279')]=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x47')],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x47')]=function(){const _0x3d0aab=_0x413554;if(this[_0x3d0aab('0x204')]()!=='')this[_0x3d0aab('0x42')]();else{if(_0x3d0aab('0x1d8')===_0x3d0aab('0x1d8'))VisuMZ[_0x3d0aab('0x1ea')][_0x3d0aab('0x279')]['call'](this),this[_0x3d0aab('0x196')]();else{function _0x50bf60(){const _0x208da5=_0x3d0aab,_0x29dd4d=_0x2ffda5['parse']('['+_0x5ad3c9['$1']['match'](/\d+/g)+']');for(const _0x10ca31 of _0x29dd4d){if(!_0x4c7437[_0x208da5('0x27e')](_0x10ca31))return![];}return!![];}}}},Game_BattlerBase['prototype']['clearStatesWithStateRetain']=function(){const _0x317be2=_0x413554,_0x472867=this[_0x317be2('0x290')]();for(const _0x48618f of _0x472867){if(_0x48618f&&this['canClearState'](_0x48618f))this['eraseState'](_0x48618f['id']);}this[_0x317be2('0x57')]={};},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x241')]=function(_0xd75509){const _0x1f657f=_0x413554,_0x190cc9=this['getStateRetainType']();if(_0x190cc9!==''){if('FMJNs'!==_0x1f657f('0x223')){const _0x2bd505=_0xd75509[_0x1f657f('0x19c')];if(_0x190cc9===_0x1f657f('0x118')&&_0x2bd505['match'](/<NO DEATH CLEAR>/i))return![];if(_0x190cc9===_0x1f657f('0xda')&&_0x2bd505[_0x1f657f('0x56')](/<NO RECOVER ALL CLEAR>/i))return![];}else{function _0x186a3c(){const _0x3f9897=_0x1f657f;for(const _0x400ccb of _0x1acdcd){_0x400ccb[_0x3f9897('0x56')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x1be8c6=_0x15e589['indexOf'](_0x56d67f(_0x3876a6['$1'])[_0x3f9897('0x20c')]()),_0x342a74=_0x48f007(_0xa5295f['$2']);_0x1be8c6>=0x0&&(_0x25e98d[_0x3f9897('0x23e')](_0x1be8c6,_0x342a74),this['makeSuccess'](_0xeac742));}}}}return this[_0x1f657f('0x40')](_0xd75509['id']);},Game_BattlerBase[_0x413554('0x130')]['getStateRetainType']=function(){const _0x5babbd=_0x413554;return this[_0x5babbd('0x124')];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x239')]=function(_0x4a1e7d){const _0xc3594f=_0x413554;this[_0xc3594f('0x124')]=_0x4a1e7d;},Game_BattlerBase['prototype'][_0x413554('0x147')]=function(){const _0x3b024d=_0x413554;this[_0x3b024d('0x124')]='';},VisuMZ[_0x413554('0x1ea')][_0x413554('0xe')]=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x64')],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x64')]=function(){const _0x399064=_0x413554;this[_0x399064('0x239')](_0x399064('0x118')),VisuMZ[_0x399064('0x1ea')][_0x399064('0xe')][_0x399064('0x24d')](this),this[_0x399064('0x147')]();},VisuMZ[_0x413554('0x1ea')][_0x413554('0x176')]=Game_BattlerBase[_0x413554('0x130')]['recoverAll'],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x234')]=function(){const _0x168ec6=_0x413554;this['setStateRetainType']('recover\x20all'),VisuMZ['SkillsStatesCore'][_0x168ec6('0x176')]['call'](this),this[_0x168ec6('0x147')]();},Game_BattlerBase[_0x413554('0x130')]['canPaySkillCost']=function(_0x81f7de){const _0x1c6d51=_0x413554;for(settings of VisuMZ['SkillsStatesCore'][_0x1c6d51('0x19d')][_0x1c6d51('0xa0')]){if(_0x1c6d51('0xd3')!==_0x1c6d51('0x1b2')){const _0xe55fc6=settings[_0x1c6d51('0x288')][_0x1c6d51('0x24d')](this,_0x81f7de);if(!settings[_0x1c6d51('0x20f')][_0x1c6d51('0x24d')](this,_0x81f7de,_0xe55fc6))return![];}else{function _0x5b2f79(){const _0x303aad=_0x1c6d51;return this[_0x303aad('0x102')]=this[_0x303aad('0x102')]||_0x1edcd3['frameCount'],this['_currentTroopUniqueID'];}}}return!![];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x1b5')]=function(_0x21b360){const _0x3cc34a=_0x413554;for(settings of VisuMZ['SkillsStatesCore'][_0x3cc34a('0x19d')][_0x3cc34a('0xa0')]){const _0x3d78d9=settings[_0x3cc34a('0x288')][_0x3cc34a('0x24d')](this,_0x21b360);settings[_0x3cc34a('0x9b')]['call'](this,_0x21b360,_0x3d78d9);}},VisuMZ[_0x413554('0x1ea')][_0x413554('0x11a')]=Game_BattlerBase['prototype'][_0x413554('0xcd')],Game_BattlerBase['prototype']['meetsSkillConditions']=function(_0x3ef645){const _0x28b4c8=_0x413554;if(!_0x3ef645)return![];if(!VisuMZ[_0x28b4c8('0x1ea')]['Game_BattlerBase_meetsSkillConditions'][_0x28b4c8('0x24d')](this,_0x3ef645))return![];if(!this[_0x28b4c8('0x24a')](_0x3ef645))return![];if(!this['meetsSkillConditionsEnableJS'](_0x3ef645))return![];if(!this[_0x28b4c8('0x2a')](_0x3ef645))return![];return!![];},Game_BattlerBase[_0x413554('0x130')]['checkSkillConditionsNotetags']=function(_0x35f02d){if(!this['checkSkillConditionsSwitchNotetags'](_0x35f02d))return![];return!![];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x4a')]=function(_0x58e378){const _0x1520a7=_0x413554,_0x587edb=_0x58e378['note'];if(_0x587edb[_0x1520a7('0x56')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xfdb30e=JSON[_0x1520a7('0x1b4')]('['+RegExp['$1'][_0x1520a7('0x56')](/\d+/g)+']');for(const _0x31c1fc of _0xfdb30e){if(!$gameSwitches[_0x1520a7('0x27e')](_0x31c1fc))return![];}return!![];}if(_0x587edb[_0x1520a7('0x56')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24797a=JSON[_0x1520a7('0x1b4')]('['+RegExp['$1'][_0x1520a7('0x56')](/\d+/g)+']');for(const _0x574a3d of _0x24797a){if(_0x1520a7('0xea')===_0x1520a7('0x90')){function _0x499423(){const _0x3b8920=_0x1520a7;return _0x1c2eac[_0x3b8920('0x288')]['call'](this,_0x1a911b);}}else{if(!$gameSwitches[_0x1520a7('0x27e')](_0x574a3d))return![];}}return!![];}if(_0x587edb[_0x1520a7('0x56')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b21cd=JSON[_0x1520a7('0x1b4')]('['+RegExp['$1'][_0x1520a7('0x56')](/\d+/g)+']');for(const _0x51c786 of _0x2b21cd){if($gameSwitches[_0x1520a7('0x27e')](_0x51c786))return!![];}return![];}if(_0x587edb[_0x1520a7('0x56')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x80c8ee=JSON[_0x1520a7('0x1b4')]('['+RegExp['$1'][_0x1520a7('0x56')](/\d+/g)+']');for(const _0x90f422 of _0x80c8ee){if(!$gameSwitches[_0x1520a7('0x27e')](_0x90f422))return!![];}return![];}if(_0x587edb[_0x1520a7('0x56')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6094a9=JSON['parse']('['+RegExp['$1'][_0x1520a7('0x56')](/\d+/g)+']');for(const _0x7977b4 of _0x6094a9){if(!$gameSwitches['value'](_0x7977b4))return!![];}return![];}if(_0x587edb['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x96d223=JSON[_0x1520a7('0x1b4')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x8d5df0 of _0x96d223){if($gameSwitches['value'](_0x8d5df0))return![];}return!![];}return!![];},Game_BattlerBase[_0x413554('0x130')]['meetsSkillConditionsEnableJS']=function(_0x50e5a6){const _0x3a92d8=_0x413554,_0x29a75a=_0x50e5a6[_0x3a92d8('0x19c')],_0x5814a4=VisuMZ[_0x3a92d8('0x1ea')][_0x3a92d8('0x98')];if(_0x5814a4[_0x50e5a6['id']])return _0x5814a4[_0x50e5a6['id']][_0x3a92d8('0x24d')](this,_0x50e5a6);else{if(_0x3a92d8('0x1a7')==='pVhwM'){function _0x195794(){const _0x49d315=_0x3a92d8,_0x10590e=_0x45c15b[_0x49d315('0x1b4')]('['+_0x3ed1d1['$1'][_0x49d315('0x56')](/\d+/g)+']');for(const _0xcc414a of _0x10590e){if(!_0xf80ca8['value'](_0xcc414a))return!![];}return![];}}else return!![];}},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x2a')]=function(_0xe37dac){const _0x36f23d=_0x413554;return VisuMZ['SkillsStatesCore']['Settings'][_0x36f23d('0xaa')][_0x36f23d('0x25c')]['call'](this,_0xe37dac);},VisuMZ[_0x413554('0x1ea')]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x1d6')],Game_BattlerBase['prototype'][_0x413554('0x1d6')]=function(_0x14de8f){const _0x6622cc=_0x413554;for(settings of VisuMZ[_0x6622cc('0x1ea')][_0x6622cc('0x19d')][_0x6622cc('0xa0')]){if('HYHWp'!==_0x6622cc('0x27d')){if(settings['Name'][_0x6622cc('0x20c')]()==='MP')return settings[_0x6622cc('0x288')][_0x6622cc('0x24d')](this,_0x14de8f);}else{function _0x3c14bd(){const _0x4d4866=_0x6622cc;return _0x4f5bc0[_0x4d4866('0x1ea')][_0x4d4866('0x19d')][_0x4d4866('0x7b')]['PassiveConditionJS']['call'](this,_0x3cf7f3);}}}return VisuMZ[_0x6622cc('0x1ea')][_0x6622cc('0x28c')]['call'](this,_0x14de8f);},VisuMZ[_0x413554('0x1ea')]['Game_BattlerBase_skillTpCost']=Game_BattlerBase['prototype'][_0x413554('0x29')],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x29')]=function(_0x3d4b4c){const _0x30817b=_0x413554;for(settings of VisuMZ[_0x30817b('0x1ea')][_0x30817b('0x19d')][_0x30817b('0xa0')]){if('MxzPQ'===_0x30817b('0x13b')){function _0x38c5d7(){const _0x53deda=_0x30817b;for(const _0x513a0a of _0x47a515){let _0x3a8319=0x0,_0x2de86f=0x0;if(_0x513a0a[_0x53deda('0x56')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x3a8319=_0x24d968(_0x1dcb2f['$1']),_0x2de86f=_0x25dffc(_0x1ff913['$2']);else _0x513a0a[_0x53deda('0x56')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x3a8319=_0x1b3d21[_0x53deda('0xb2')](_0x341c82['$1']),_0x2de86f=_0x423d76(_0x3b8285['$2']));_0x3ce9a0['addStateTurns'](_0x3a8319,_0x2de86f),this['makeSuccess'](_0x21bde8);}}}else{if(settings[_0x30817b('0x80')]['toUpperCase']()==='TP'){if(_0x30817b('0xa9')==='mjiiG')return settings[_0x30817b('0x288')][_0x30817b('0x24d')](this,_0x3d4b4c);else{function _0x34acd8(){const _0x441cb9=_0x30817b;let _0x14997d=[this['enemy']()];return _0x14997d['concat'](this[_0x441cb9('0x235')]());}}}}}return VisuMZ[_0x30817b('0x1ea')]['Game_BattlerBase_skillTpCost'][_0x30817b('0x24d')](this,_0x3d4b4c);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x31')]=function(_0x558a1c){const _0x97f8c9=_0x413554;if(typeof _0x558a1c===_0x97f8c9('0x83'))_0x558a1c=$dataStates[_0x558a1c];return this[_0x97f8c9('0x290')]()[_0x97f8c9('0x14')](_0x558a1c);},VisuMZ[_0x413554('0x1ea')]['Game_BattlerBase_states']=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x290')],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x290')]=function(){const _0x52de5d=_0x413554;let _0x30b9ea=VisuMZ['SkillsStatesCore'][_0x52de5d('0x161')][_0x52de5d('0x24d')](this);return this['addPassiveStates'](_0x30b9ea),_0x30b9ea;},Game_BattlerBase[_0x413554('0x130')]['addPassiveStates']=function(_0x255c08){const _0x2d0749=_0x413554,_0x4fdf63=this[_0x2d0749('0x297')]();for(state of _0x4fdf63){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x255c08[_0x2d0749('0x14')](state))continue;_0x255c08[_0x2d0749('0x2a8')](state);}_0x4fdf63[_0x2d0749('0x86')]>0x0&&_0x255c08[_0x2d0749('0x17')]((_0x32deae,_0x3c566f)=>{const _0x136d6c=_0x2d0749;if(_0x136d6c('0x163')==='hGWxk'){const _0xc8f6b=_0x32deae[_0x136d6c('0x145')],_0x47a760=_0x3c566f['priority'];if(_0xc8f6b!==_0x47a760)return _0x47a760-_0xc8f6b;return _0x32deae-_0x3c566f;}else{function _0x5bef90(){const _0x4c6da0=_0x136d6c;_0x31bab1=_0x28c599[_0x4c6da0('0xb2')](_0x5304a1['$1']),_0x3968a7=_0x1a3922(_0x21a997['$2']);}}});},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x1e4')]=function(_0x5707d7){const _0x411fc0=_0x413554;return _0x5707d7[_0x411fc0('0x19c')][_0x411fc0('0x56')](/<PASSIVE STACKABLE>/i);},Game_BattlerBase[_0x413554('0x130')]['convertPassiveStates']=function(){const _0x11730a=_0x413554,_0x120cb0=[];for(const _0x232838 of this[_0x11730a('0x57')][_0x11730a('0x297')]){const _0x5e37bd=$dataStates[_0x232838];if(!_0x5e37bd)continue;if(!this[_0x11730a('0x1c9')](_0x5e37bd))continue;_0x120cb0[_0x11730a('0x2a8')](_0x5e37bd);}return _0x120cb0;},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x1c9')]=function(_0x12d376){const _0x14d053=_0x413554;if(!this[_0x14d053('0xd0')](_0x12d376))return![];if(!this['meetsPassiveStateConditionJS'](_0x12d376))return![];if(!this[_0x14d053('0x166')](_0x12d376))return![];return!![];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0xd0')]=function(_0x3d8706){const _0x2ce3e7=_0x413554,_0x1a36d8=_0x3d8706[_0x2ce3e7('0x19c')];if(_0x1a36d8['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2ce3e7('0x284')===_0x2ce3e7('0xf8')){function _0x14d2b3(){const _0x5cd5bf=_0x2ce3e7;_0x29e8bc[_0x5cd5bf('0x130')][_0x5cd5bf('0x266')][_0x5cd5bf('0x24d')](this,_0x505637,_0x563519,0x0,0x0),_0x32d75a[_0x5cd5bf('0x130')][_0x5cd5bf('0x188')]['call'](this,_0x302040,_0x1858c2,0x0,0x0);}}else{const _0x5eff3e=JSON[_0x2ce3e7('0x1b4')]('['+RegExp['$1'][_0x2ce3e7('0x56')](/\d+/g)+']');for(const _0x13d85d of _0x5eff3e){if(!$gameSwitches[_0x2ce3e7('0x27e')](_0x13d85d))return![];}return!![];}}if(_0x1a36d8[_0x2ce3e7('0x56')](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2ce3e7('0x171')!==_0x2ce3e7('0x171')){function _0x6f3fe8(){const _0xa63497=_0x2ce3e7;this[_0xa63497('0xfe')](_0x5112c5['shift']());}}else{const _0x36aefe=JSON[_0x2ce3e7('0x1b4')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1a46d6 of _0x36aefe){if(_0x2ce3e7('0x82')===_0x2ce3e7('0x82')){if(!$gameSwitches['value'](_0x1a46d6))return![];}else{function _0xe3cc48(){this['onAddState'](_0x3e31c9);;}}}return!![];}}if(_0x1a36d8['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c2295=JSON[_0x2ce3e7('0x1b4')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x10ba77 of _0x5c2295){if($gameSwitches[_0x2ce3e7('0x27e')](_0x10ba77))return!![];}return![];}if(_0x1a36d8[_0x2ce3e7('0x56')](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4aa4d1=JSON['parse']('['+RegExp['$1'][_0x2ce3e7('0x56')](/\d+/g)+']');for(const _0x5d1aa7 of _0x4aa4d1){if(!$gameSwitches[_0x2ce3e7('0x27e')](_0x5d1aa7))return!![];}return![];}if(_0x1a36d8[_0x2ce3e7('0x56')](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('sutUO'!=='meYTB'){const _0x1a8c20=JSON[_0x2ce3e7('0x1b4')]('['+RegExp['$1'][_0x2ce3e7('0x56')](/\d+/g)+']');for(const _0x4d93ac of _0x1a8c20){if(!$gameSwitches[_0x2ce3e7('0x27e')](_0x4d93ac))return!![];}return![];}else{function _0x123c32(){const _0x2db1a8=_0x2ce3e7;if(!this[_0x2db1a8('0x18f')][_0x2db1a8('0x255')](_0x34a2cc))return![];}}}if(_0x1a36d8[_0x2ce3e7('0x56')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a078a=JSON[_0x2ce3e7('0x1b4')]('['+RegExp['$1'][_0x2ce3e7('0x56')](/\d+/g)+']');for(const _0x56af0d of _0x1a078a){if($gameSwitches[_0x2ce3e7('0x27e')](_0x56af0d))return![];}return!![];}return!![];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x23b')]=function(_0x1d9c26){const _0x1f8a8f=_0x413554,_0x4ce3c5=VisuMZ[_0x1f8a8f('0x1ea')][_0x1f8a8f('0x93')];if(_0x4ce3c5[_0x1d9c26['id']]&&!_0x4ce3c5[_0x1d9c26['id']]['call'](this,_0x1d9c26))return![];return!![];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x166')]=function(_0x23fab6){const _0x4f2395=_0x413554;return VisuMZ['SkillsStatesCore'][_0x4f2395('0x19d')][_0x4f2395('0x7b')][_0x4f2395('0xfa')][_0x4f2395('0x24d')](this,_0x23fab6);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x297')]=function(){const _0xd6fd95=_0x413554;if(this[_0xd6fd95('0x214')](_0xd6fd95('0x297')))return this[_0xd6fd95('0x26e')]();return this[_0xd6fd95('0x57')][_0xd6fd95('0x297')]=[],this[_0xd6fd95('0x1a1')](),this[_0xd6fd95('0x46')](),this['addPassiveStatesByPluginParameters'](),this[_0xd6fd95('0x26e')]();},Game_BattlerBase[_0x413554('0x130')]['addPassiveStatesFromOtherPlugins']=function(){const _0x3800f3=_0x413554;if(Imported[_0x3800f3('0xb9')])this[_0x3800f3('0x4e')]();},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x144')]=function(){return[];},Game_BattlerBase['prototype'][_0x413554('0x46')]=function(){const _0x24d223=_0x413554,_0x5dc62e=this['passiveStateObjects']();for(const _0x5a3fea of _0x5dc62e){if(!_0x5a3fea)continue;const _0x57634a=_0x5a3fea[_0x24d223('0x19c')][_0x24d223('0x56')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x57634a){if('JTqLb'!=='vlwEk')for(const _0x351008 of _0x57634a){_0x351008[_0x24d223('0x56')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x44bcc2=RegExp['$1'];if(_0x44bcc2[_0x24d223('0x56')](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x19efd7=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x24d223('0x57')][_0x24d223('0x297')]=this[_0x24d223('0x57')][_0x24d223('0x297')]['concat'](_0x19efd7);}else{const _0x4a7db2=_0x44bcc2[_0x24d223('0x24f')](',');for(const _0x3c681f of _0x4a7db2){const _0x38353=DataManager['getStateIdWithName'](_0x3c681f);if(_0x38353)this[_0x24d223('0x57')][_0x24d223('0x297')]['push'](_0x38353);}}}else{function _0x3a9380(){const _0x2019c0=_0x24d223;_0x1225a8['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0xce264c=_0x513b70[_0x2019c0('0x81')](_0x3b661f(_0x2c1aa0['$1'])['toUpperCase']()),_0x5b99cd=_0x14ad40(_0x4b33a0['$2']);_0xce264c>=0x0&&(_0x49f8a3[_0x2019c0('0x198')](_0xce264c,_0x5b99cd),this[_0x2019c0('0x1f3')](_0x1e3e03));}}}}},Game_BattlerBase[_0x413554('0x130')]['addPassiveStatesByPluginParameters']=function(){const _0x2d5759=_0x413554,_0x58bbe4=VisuMZ['SkillsStatesCore'][_0x2d5759('0x19d')]['PassiveStates'][_0x2d5759('0x26c')];this[_0x2d5759('0x57')][_0x2d5759('0x297')]=this[_0x2d5759('0x57')]['passiveStates'][_0x2d5759('0x158')](_0x58bbe4);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x208')]=function(_0x58d35e){const _0x50f9b3=_0x413554;if(typeof _0x58d35e!==_0x50f9b3('0x83'))_0x58d35e=_0x58d35e['id'];return this[_0x50f9b3('0x1e5')][_0x58d35e]||0x0;},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x231')]=function(_0x27599e,_0x1cb3ef){const _0x4dd17e=_0x413554;if(typeof _0x27599e!==_0x4dd17e('0x83'))_0x27599e=_0x27599e['id'];if(this[_0x4dd17e('0x40')](_0x27599e)){if(_0x4dd17e('0x1aa')==='EoYYa'){const _0x294ed5=DataManager['stateMaximumTurns'](_0x27599e);this[_0x4dd17e('0x1e5')][_0x27599e]=_0x1cb3ef[_0x4dd17e('0x29b')](0x0,_0x294ed5);if(this[_0x4dd17e('0x1e5')][_0x27599e]<=0x0)this['removeState'](_0x27599e);}else{function _0xafc12c(){return!![];}}}},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x244')]=function(_0x54a9b8,_0xcd6919){const _0x5bd5a4=_0x413554;if(typeof _0x54a9b8!==_0x5bd5a4('0x83'))_0x54a9b8=_0x54a9b8['id'];this['isStateAffected'](_0x54a9b8)&&(_0xcd6919+=this[_0x5bd5a4('0x208')](_0x54a9b8),this[_0x5bd5a4('0x231')](_0x54a9b8,_0xcd6919));},VisuMZ[_0x413554('0x1ea')][_0x413554('0x16b')]=Game_BattlerBase[_0x413554('0x130')]['eraseBuff'],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x1e2')]=function(_0x490c4d){const _0x83d4c8=_0x413554,_0x12efb9=this['_buffs'][_0x490c4d];VisuMZ[_0x83d4c8('0x1ea')][_0x83d4c8('0x16b')][_0x83d4c8('0x24d')](this,_0x490c4d);if(_0x12efb9>0x0)this[_0x83d4c8('0x1b9')](_0x490c4d);if(_0x12efb9<0x0)this['onEraseDebuff'](_0x490c4d);},VisuMZ[_0x413554('0x1ea')]['Game_BattlerBase_increaseBuff']=Game_BattlerBase['prototype'][_0x413554('0x33')],Game_BattlerBase['prototype'][_0x413554('0x33')]=function(_0x3e3f66){const _0x464e2e=_0x413554;VisuMZ[_0x464e2e('0x1ea')][_0x464e2e('0xb7')][_0x464e2e('0x24d')](this,_0x3e3f66);if(!this[_0x464e2e('0x220')](_0x3e3f66))this['eraseBuff'](_0x3e3f66);},VisuMZ['SkillsStatesCore'][_0x413554('0x4b')]=Game_BattlerBase['prototype'][_0x413554('0x1a9')],Game_BattlerBase['prototype'][_0x413554('0x1a9')]=function(_0x2f53d8){const _0x496f36=_0x413554;VisuMZ[_0x496f36('0x1ea')]['Game_BattlerBase_decreaseBuff'][_0x496f36('0x24d')](this,_0x2f53d8);if(!this[_0x496f36('0x220')](_0x2f53d8))this[_0x496f36('0x1e2')](_0x2f53d8);},Game_BattlerBase['prototype'][_0x413554('0x1b9')]=function(_0x4246c5){},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x2f')]=function(_0x5a940a){},Game_BattlerBase[_0x413554('0x130')]['isMaxBuffAffected']=function(_0x37f969){const _0x5c25e5=_0x413554;return this[_0x5c25e5('0x262')][_0x37f969]===VisuMZ[_0x5c25e5('0x1ea')]['Settings'][_0x5c25e5('0x1dc')][_0x5c25e5('0x6c')];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x293')]=function(_0x5094c0){const _0xa831c=_0x413554;return this[_0xa831c('0x262')][_0x5094c0]===-VisuMZ['SkillsStatesCore']['Settings'][_0xa831c('0x1dc')][_0xa831c('0x1b7')];},VisuMZ[_0x413554('0x1ea')][_0x413554('0x7')]=Game_BattlerBase[_0x413554('0x130')][_0x413554('0x27f')],Game_BattlerBase[_0x413554('0x130')][_0x413554('0x27f')]=function(_0x1d7b6c,_0xf80652){const _0x447f3a=_0x413554;return _0x1d7b6c=_0x1d7b6c[_0x447f3a('0x29b')](-0x2,0x2),VisuMZ[_0x447f3a('0x1ea')][_0x447f3a('0x7')][_0x447f3a('0x24d')](this,_0x1d7b6c,_0xf80652);},Game_BattlerBase[_0x413554('0x130')]['paramBuffRate']=function(_0x262d5f){const _0x6a8451=_0x413554,_0x4cfc15=this[_0x6a8451('0x262')][_0x262d5f];return VisuMZ['SkillsStatesCore'][_0x6a8451('0x19d')][_0x6a8451('0x1dc')][_0x6a8451('0x1d1')]['call'](this,_0x262d5f,_0x4cfc15);},Game_BattlerBase['prototype'][_0x413554('0x268')]=function(_0x4354ad){const _0x1c3ebc=_0x413554;return this[_0x1c3ebc('0x19')][_0x4354ad]||0x0;},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x16f')]=function(_0x4646d9){const _0x257962=_0x413554;return this[_0x257962('0x268')](_0x4646d9);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x23e')]=function(_0x32445c,_0x43e64b){const _0x5748fa=_0x413554;if(this[_0x5748fa('0x1d5')](_0x32445c)){if(_0x5748fa('0x133')===_0x5748fa('0x13')){function _0x6c0030(){const _0x4a09e4=_0x5748fa;_0xdd6927[_0x4a09e4('0x1ea')][_0x4a09e4('0x17f')][_0x4a09e4('0x24d')](this,_0x281423,_0x15bb17),this[_0x4a09e4('0x1d5')](_0x1ffbec)&&this[_0x4a09e4('0x292')](_0x1b4f23,_0x4465c1);}}else{const _0x36246c=VisuMZ[_0x5748fa('0x1ea')][_0x5748fa('0x19d')][_0x5748fa('0x1dc')]['MaxTurns'];this[_0x5748fa('0x19')][_0x32445c]=_0x43e64b[_0x5748fa('0x29b')](0x0,_0x36246c);}}},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x198')]=function(_0x112bac,_0x594822){const _0x3d1494=_0x413554;this[_0x3d1494('0x1d5')](_0x112bac)&&(_0x594822+=this[_0x3d1494('0x268')](stateId),this[_0x3d1494('0x231')](_0x112bac,_0x594822));},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x151')]=function(_0x2bd139,_0x4c59cb){const _0x2dbbca=_0x413554;if(this[_0x2dbbca('0x21')](_0x2bd139)){const _0x5c3fd4=VisuMZ[_0x2dbbca('0x1ea')][_0x2dbbca('0x19d')][_0x2dbbca('0x1dc')][_0x2dbbca('0xd7')];this[_0x2dbbca('0x19')][_0x2bd139]=_0x4c59cb['clamp'](0x0,_0x5c3fd4);}},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x251')]=function(_0x3d7599,_0x5b1689){const _0x378477=_0x413554;this[_0x378477('0x21')](_0x3d7599)&&(_0x5b1689+=this['buffTurns'](stateId),this[_0x378477('0x231')](_0x3d7599,_0x5b1689));},Game_BattlerBase['prototype'][_0x413554('0x63')]=function(_0x5584b0){const _0x1c70df=_0x413554;if(typeof _0x5584b0!==_0x1c70df('0x83'))_0x5584b0=_0x5584b0['id'];return this['_stateData']=this[_0x1c70df('0x3b')]||{},this['_stateData'][_0x5584b0]=this[_0x1c70df('0x3b')][_0x5584b0]||{},this[_0x1c70df('0x3b')][_0x5584b0];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x1b8')]=function(_0x1c0873,_0x2c312e){if(typeof _0x1c0873!=='number')_0x1c0873=_0x1c0873['id'];const _0x22170b=this['stateData'](_0x1c0873);return _0x22170b[_0x2c312e];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x120')]=function(_0x19b1c4,_0x4400de,_0x11b7ee){const _0x6282b1=_0x413554;if(typeof _0x19b1c4!==_0x6282b1('0x83'))_0x19b1c4=_0x19b1c4['id'];const _0x4626f2=this[_0x6282b1('0x63')](_0x19b1c4);_0x4626f2[_0x4400de]=_0x11b7ee;},Game_BattlerBase['prototype']['clearStateData']=function(_0xb36ce0){const _0x5c426a=_0x413554;if(typeof _0xb36ce0!==_0x5c426a('0x83'))_0xb36ce0=_0xb36ce0['id'];this[_0x5c426a('0x3b')]=this[_0x5c426a('0x3b')]||{},this['_stateData'][_0xb36ce0]={};},Game_BattlerBase['prototype'][_0x413554('0x2b1')]=function(_0x41721c){const _0x2f4092=_0x413554;if(typeof _0x41721c!=='number')_0x41721c=_0x41721c['id'];this[_0x2f4092('0x62')]=this['_stateDisplay']||{};if(this['_stateDisplay'][_0x41721c]===undefined){if('vAYDl'!=='vIUJw')this['_stateDisplay'][_0x41721c]='';else{function _0x1ff967(){const _0x7bdd7f=_0x2f4092;if(typeof _0x5aabfc!==_0x7bdd7f('0x83'))_0x51e9f8=_0x4b0a2e['id'];this['_stateData']=this['_stateData']||{},this[_0x7bdd7f('0x3b')][_0x19b0f3]={};}}}return this['_stateDisplay'][_0x41721c];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x25b')]=function(_0x382f76,_0x21ea36){const _0x3bbda4=_0x413554;if(typeof _0x382f76!==_0x3bbda4('0x83'))_0x382f76=_0x382f76['id'];this[_0x3bbda4('0x62')]=this[_0x3bbda4('0x62')]||{},this[_0x3bbda4('0x62')][_0x382f76]=_0x21ea36;},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x27')]=function(_0x1570dd){const _0x220df8=_0x413554;if(typeof _0x1570dd!==_0x220df8('0x83'))_0x1570dd=_0x1570dd['id'];this[_0x220df8('0x62')]=this['_stateDisplay']||{},this[_0x220df8('0x62')][_0x1570dd]='';},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x27b')]=function(_0x366ecd){const _0x2a1fc1=_0x413554;if(typeof _0x366ecd!==_0x2a1fc1('0x83'))_0x366ecd=_0x366ecd['id'];this[_0x2a1fc1('0x7a')]=this['_stateOrigin']||{},this[_0x2a1fc1('0x7a')][_0x366ecd]=this[_0x2a1fc1('0x7a')][_0x366ecd]||_0x2a1fc1('0xa5');const _0x546b1b=this[_0x2a1fc1('0x7a')][_0x366ecd];return this[_0x2a1fc1('0x189')](_0x546b1b);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0xe4')]=function(_0x32acf7,_0x5519bb){const _0x13108f=_0x413554;this['_stateOrigin']=this[_0x13108f('0x7a')]||{};const _0x13627f=_0x5519bb?this[_0x13108f('0x92')](_0x5519bb):this[_0x13108f('0x48')]();this[_0x13108f('0x7a')][_0x32acf7]=_0x13627f;},Game_BattlerBase['prototype'][_0x413554('0xf1')]=function(_0xdbed05){const _0x4665e1=_0x413554;this['_stateOrigin']=this[_0x4665e1('0x7a')]||{},delete this[_0x4665e1('0x7a')][_0xdbed05];},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x48')]=function(){const _0x4cd359=_0x413554,_0x4c18e4=this[_0x4cd359('0xf9')]();return this[_0x4cd359('0x92')](_0x4c18e4);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0xf9')]=function(){const _0x34c8af=_0x413554;if($gameParty['inBattle']()){if(BattleManager[_0x34c8af('0x19f')])return BattleManager[_0x34c8af('0x19f')];else{if(BattleManager[_0x34c8af('0x238')]){if('qhqXB'!==_0x34c8af('0x1d'))return BattleManager['_currentActor'];else{function _0x59da9e(){const _0x321c03=_0x34c8af,_0x30110b=_0x26559e[_0x321c03('0x1b4')]('['+_0x5b419e['$1'][_0x321c03('0x56')](/\d+/g)+']');for(const _0x30cb8a of _0x30110b){if(_0x44410e[_0x321c03('0x27e')](_0x30cb8a))return![];}return!![];}}}}}else{const _0x565aae=SceneManager[_0x34c8af('0x258')];if(![Scene_Map,Scene_Item][_0x34c8af('0x14')](_0x565aae[_0x34c8af('0x3e')]))return $gameParty[_0x34c8af('0xa8')]();}return this;},Game_BattlerBase['prototype'][_0x413554('0x92')]=function(_0x11bd31){const _0x4b000c=_0x413554;if(!_0x11bd31)return _0x4b000c('0xa5');if(_0x11bd31[_0x4b000c('0x1bc')]()){if(_0x4b000c('0xb1')!==_0x4b000c('0x1b3'))return _0x4b000c('0x1a5')[_0x4b000c('0x1f5')](_0x11bd31[_0x4b000c('0x165')]());else{function _0x1e794c(){const _0x7c1f6a=_0x4b000c;if(!this[_0x7c1f6a('0x4a')](_0x4ae0ff))return![];return!![];}}}else{const _0x626fd2='<enemy-%1>'[_0x4b000c('0x1f5')](_0x11bd31[_0x4b000c('0xee')]()),_0x58b250=_0x4b000c('0x1e8')[_0x4b000c('0x1f5')](_0x11bd31[_0x4b000c('0x1a8')]()),_0x382448=_0x4b000c('0xa2')['format']($gameTroop['getCurrentTroopUniqueID']());return _0x4b000c('0x17e')[_0x4b000c('0x1f5')](_0x626fd2,_0x58b250,_0x382448);}return _0x4b000c('0xa5');},Game_BattlerBase[_0x413554('0x130')]['getStateOriginByKey']=function(_0xe2701b){const _0x4dca6b=_0x413554;if(_0xe2701b===_0x4dca6b('0xa5')){if(_0x4dca6b('0x1d9')!==_0x4dca6b('0x45'))return this;else{function _0x88b106(){return _0x34740e['uiHelpPosition'];}}}else{if(_0xe2701b[_0x4dca6b('0x56')](/<actor-(\d+)>/i)){if(_0x4dca6b('0x154')!=='raJfi'){function _0x2c906a(){const _0x1cb162=_0x4dca6b;this[_0x1cb162('0x266')](_0x287ba4,_0x4d4eb9,_0x3bed6f,_0x2f2ed2);}}else return $gameActors[_0x4dca6b('0x1a6')](Number(RegExp['$1']));}else{if($gameParty['inBattle']()&&_0xe2701b[_0x4dca6b('0x56')](/<troop-(\d+)>/i)){const _0x29a038=Number(RegExp['$1']);if(_0x29a038===$gameTroop[_0x4dca6b('0xdf')]()){if(_0x4dca6b('0x26f')==='QskYH'){function _0x23b322(){const _0x12a04d=_0x4dca6b,_0x2df8ab=_0x2794b1[_0x12a04d('0x288')][_0x12a04d('0x24d')](_0x442263,_0x57c082);return _0x3cdb60[_0x12a04d('0x43')]['call'](_0x3bb882,_0x16ecb4,_0x2df8ab,_0x348e8c);}}else{if(_0xe2701b['match'](/<member-(\d+)>/i)){if(_0x4dca6b('0x2b')!==_0x4dca6b('0x2b')){function _0x1b83bf(){const _0x46847f=_0x4dca6b,_0x2ce965=new _0x431dc7(0x0,0x0,_0x1e409f[_0x46847f('0x229')],_0x995d93[_0x46847f('0x19a')]);this['_commandNameWindow']=new _0x2b625d(_0x2ce965),this[_0x46847f('0x152')][_0x46847f('0xe1')]=0x0,this[_0x46847f('0x225')](this[_0x46847f('0x152')]),this['updateCommandNameWindow']();}}else return $gameTroop[_0x4dca6b('0x96')]()[Number(RegExp['$1'])];}}}}if(_0xe2701b['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x413554('0x1ea')][_0x413554('0x227')]=Game_Battler[_0x413554('0x130')]['addState'],Game_Battler[_0x413554('0x130')][_0x413554('0x34')]=function(_0x5f288f){const _0x3302d4=_0x413554;VisuMZ['SkillsStatesCore'][_0x3302d4('0x227')]['call'](this,_0x5f288f);if(this[_0x3302d4('0x31')]($dataStates[_0x5f288f])){this['onAddState'](_0x5f288f);;}},Game_Battler[_0x413554('0x130')][_0x413554('0x191')]=function(_0xd42cd){const _0x4de6af=_0x413554;this[_0x4de6af('0xe4')](_0xd42cd),this[_0x4de6af('0xbd')](_0xd42cd),this[_0x4de6af('0x24e')](_0xd42cd),this[_0x4de6af('0x5b')](_0xd42cd);},Game_Battler[_0x413554('0x130')][_0x413554('0x280')]=function(_0x3e5f70){const _0x5d4767=_0x413554;Game_BattlerBase['prototype'][_0x5d4767('0x280')]['call'](this,_0x3e5f70),this[_0x5d4767('0x13f')](_0x3e5f70),this[_0x5d4767('0x77')](_0x3e5f70);},Game_Battler[_0x413554('0x130')][_0x413554('0x2a2')]=function(_0x568a4e){const _0x4b22ec=_0x413554;for(const _0x48fb36 of this[_0x4b22ec('0x290')]()){if('mAlYG'!=='mAlYG'){function _0x2be219(){const _0x56fd66=_0x4b22ec;if(this[_0x56fd66('0x10c')](_0x4d9754)){const _0x3f1620=this[_0x56fd66('0x262')][_0x431f4d];this[_0x56fd66('0x21a')](_0x5e5f20);if(_0x3f1620>0x0)this[_0x56fd66('0xb5')](_0x1e85f3);if(_0x3f1620<0x0)this['onExpireDebuff'](_0x2c5b18);}}}else this['isStateExpired'](_0x48fb36['id'])&&_0x48fb36[_0x4b22ec('0x222')]===_0x568a4e&&(this['removeState'](_0x48fb36['id']),this['onExpireState'](_0x48fb36['id']),this[_0x4b22ec('0x5f')](_0x48fb36['id']));}},Game_Battler[_0x413554('0x130')]['onExpireState']=function(_0x391428){const _0x4f46fe=_0x413554;this[_0x4f46fe('0x15b')](_0x391428);},Game_Battler[_0x413554('0x130')][_0x413554('0x24e')]=function(_0x4177ee){const _0x11284e=_0x413554,_0x4018dc=VisuMZ['SkillsStatesCore']['stateAddJS'];if(_0x4018dc[_0x4177ee])_0x4018dc[_0x4177ee][_0x11284e('0x24d')](this,_0x4177ee);},Game_Battler['prototype'][_0x413554('0x13f')]=function(_0x4e8bed){const _0x30d551=_0x413554,_0x502cf2=VisuMZ[_0x30d551('0x1ea')][_0x30d551('0x134')];if(_0x502cf2[_0x4e8bed])_0x502cf2[_0x4e8bed]['call'](this,_0x4e8bed);},Game_Battler['prototype'][_0x413554('0x15b')]=function(_0x4a0a44){const _0x39341d=_0x413554,_0x46cf3f=VisuMZ[_0x39341d('0x1ea')][_0x39341d('0x9')];if(_0x46cf3f[_0x4a0a44])_0x46cf3f[_0x4a0a44][_0x39341d('0x24d')](this,_0x4a0a44);},Game_Battler[_0x413554('0x130')]['onAddStateGlobalJS']=function(_0x51543c){const _0x16d2b7=_0x413554;try{if(_0x16d2b7('0x193')===_0x16d2b7('0x193'))VisuMZ[_0x16d2b7('0x1ea')][_0x16d2b7('0x19d')][_0x16d2b7('0x4')][_0x16d2b7('0x101')][_0x16d2b7('0x24d')](this,_0x51543c);else{function _0x162396(){const _0x27a591=_0x16d2b7,_0x1d6dab=_0x2f55cc[_0x27a591('0x1ea')][_0x27a591('0x1ca')]['call'](this);return _0x1d6dab[_0x27a591('0x29b')](0x0,0x1);}}}catch(_0xb9aecb){if($gameTemp[_0x16d2b7('0x1ec')]())console['log'](_0xb9aecb);}},Game_Battler['prototype'][_0x413554('0x77')]=function(_0xe4bec0){const _0x4d1152=_0x413554;try{if(_0x4d1152('0x9c')===_0x4d1152('0x298')){function _0x656cab(){const _0x4f84cd=_0x4d1152;if(_0x5c7890[_0x4f84cd('0x27e')](_0x444c4f))return!![];}}else VisuMZ['SkillsStatesCore']['Settings'][_0x4d1152('0x4')][_0x4d1152('0x87')][_0x4d1152('0x24d')](this,_0xe4bec0);}catch(_0x4b184e){if($gameTemp['isPlaytest']())console['log'](_0x4b184e);}},Game_Battler[_0x413554('0x130')][_0x413554('0x5f')]=function(_0x1a2ed9){const _0x231e71=_0x413554;try{VisuMZ['SkillsStatesCore']['Settings'][_0x231e71('0x4')][_0x231e71('0x253')]['call'](this,_0x1a2ed9);}catch(_0x1e00f7){if($gameTemp[_0x231e71('0x1ec')]())console[_0x231e71('0xc0')](_0x1e00f7);}},Game_Battler[_0x413554('0x130')][_0x413554('0x7c')]=function(_0x2f7915){const _0x20be1b=_0x413554;return _0x2f7915=_0x2f7915[_0x20be1b('0x20c')]()[_0x20be1b('0x1c4')](),this[_0x20be1b('0x290')]()[_0x20be1b('0x25d')](_0x3ba8f5=>_0x3ba8f5['categories'][_0x20be1b('0x14')](_0x2f7915));},Game_Battler[_0x413554('0x130')][_0x413554('0x21c')]=function(_0x140470,_0x5e83db){const _0x357261=_0x413554;_0x140470=_0x140470[_0x357261('0x20c')]()[_0x357261('0x1c4')](),_0x5e83db=_0x5e83db||0x0;const _0x5d0855=this['statesByCategory'](_0x140470),_0x173226=[];for(const _0x4a7df0 of _0x5d0855){if(!_0x4a7df0)continue;if(_0x5e83db<=0x0)return;_0x173226[_0x357261('0x2a8')](_0x4a7df0['id']),this[_0x357261('0x1bb')]['success']=!![],_0x5e83db--;}while(_0x173226[_0x357261('0x86')]>0x0){this[_0x357261('0xfe')](_0x173226['shift']());}},Game_Battler['prototype'][_0x413554('0x3a')]=function(_0x2684da){const _0x20c99b=_0x413554;_0x2684da=_0x2684da[_0x20c99b('0x20c')]()[_0x20c99b('0x1c4')]();const _0x25fc97=this[_0x20c99b('0x7c')](_0x2684da),_0x2e0b3f=[];for(const _0x22c1fc of _0x25fc97){if(_0x20c99b('0x20e')===_0x20c99b('0x20e')){if(!_0x22c1fc)continue;_0x2e0b3f['push'](_0x22c1fc['id']),this['_result'][_0x20c99b('0x1af')]=!![];}else{function _0x3b4de1(){const _0x42f2e2=_0x20c99b,_0x40655d=_0x4774f7['parse']('['+_0x3a8391['$1'][_0x42f2e2('0x56')](/\d+/g)+']');for(const _0x52f19e of _0x40655d){if(_0x1b3ccf['value'](_0x52f19e))return!![];}return![];}}}while(_0x2e0b3f[_0x20c99b('0x86')]>0x0){if('xIEnh'!=='ctDqd')this['removeState'](_0x2e0b3f[_0x20c99b('0x17b')]());else{function _0x48a77b(){const _0x5e005c=_0x20c99b;return _0x268072=_0x5ecb92['clamp'](-0x2,0x2),_0x456834[_0x5e005c('0x1ea')][_0x5e005c('0x7')]['call'](this,_0x4d5cad,_0x355ddf);}}}},VisuMZ[_0x413554('0x1ea')][_0x413554('0x17f')]=Game_Battler[_0x413554('0x130')][_0x413554('0x1d3')],Game_Battler[_0x413554('0x130')]['addBuff']=function(_0x341a9a,_0x272683){const _0x1eb76b=_0x413554;VisuMZ[_0x1eb76b('0x1ea')]['Game_Battler_addBuff']['call'](this,_0x341a9a,_0x272683);if(this['isBuffAffected'](_0x341a9a)){if(_0x1eb76b('0xa6')!==_0x1eb76b('0x141'))this['onAddBuff'](_0x341a9a,_0x272683);else{function _0x3261b0(){const _0x513007=_0x1eb76b;return this[_0x513007('0x124')];}}}},VisuMZ[_0x413554('0x1ea')][_0x413554('0x295')]=Game_Battler[_0x413554('0x130')][_0x413554('0xb4')],Game_Battler[_0x413554('0x130')]['addDebuff']=function(_0x8810a8,_0x3a3beb){const _0x47d93f=_0x413554;VisuMZ[_0x47d93f('0x1ea')][_0x47d93f('0x295')][_0x47d93f('0x24d')](this,_0x8810a8,_0x3a3beb),this[_0x47d93f('0x21')](_0x8810a8)&&this['onAddDebuff'](_0x8810a8,_0x3a3beb);},Game_Battler[_0x413554('0x130')][_0x413554('0xde')]=function(){const _0xd70fe9=_0x413554;for(let _0x3ee5b9=0x0;_0x3ee5b9<this[_0xd70fe9('0x11')]();_0x3ee5b9++){if(this[_0xd70fe9('0x10c')](_0x3ee5b9)){const _0xedad5c=this[_0xd70fe9('0x262')][_0x3ee5b9];this[_0xd70fe9('0x21a')](_0x3ee5b9);if(_0xedad5c>0x0)this['onExpireBuff'](_0x3ee5b9);if(_0xedad5c<0x0)this[_0xd70fe9('0x13a')](_0x3ee5b9);}}},Game_Battler[_0x413554('0x130')]['onAddBuff']=function(_0x4400c2,_0x14757c){const _0x3296a1=_0x413554;this[_0x3296a1('0x19e')](_0x4400c2,_0x14757c);},Game_Battler['prototype'][_0x413554('0x73')]=function(_0x53f8c5,_0x1d2b38){const _0x46f805=_0x413554;this[_0x46f805('0x1cd')](_0x53f8c5,_0x1d2b38);},Game_Battler[_0x413554('0x130')][_0x413554('0x1b9')]=function(_0x42f282){const _0x3ad8b0=_0x413554;Game_BattlerBase[_0x3ad8b0('0x130')][_0x3ad8b0('0x1b9')]['call'](this,_0x42f282),this[_0x3ad8b0('0x9f')](_0x42f282);},Game_Battler[_0x413554('0x130')][_0x413554('0x2f')]=function(_0x3896f6){const _0x32f876=_0x413554;Game_BattlerBase['prototype']['onEraseDebuff'][_0x32f876('0x24d')](this,_0x3896f6),this['onEraseDebuffGlobalJS'](_0x3896f6);},Game_Battler['prototype'][_0x413554('0xb5')]=function(_0x55a398){const _0x5e0b99=_0x413554;this[_0x5e0b99('0x195')](_0x55a398);},Game_Battler[_0x413554('0x130')][_0x413554('0x13a')]=function(_0x2e578c){const _0x47a5f7=_0x413554;this[_0x47a5f7('0x89')](_0x2e578c);},Game_Battler['prototype'][_0x413554('0x19e')]=function(_0x4f34f1,_0x10d3a0){const _0x35d960=_0x413554;VisuMZ['SkillsStatesCore'][_0x35d960('0x19d')][_0x35d960('0x1dc')][_0x35d960('0x18a')][_0x35d960('0x24d')](this,_0x4f34f1,_0x10d3a0);},Game_Battler[_0x413554('0x130')][_0x413554('0x1cd')]=function(_0x324746,_0x261851){const _0x180437=_0x413554;VisuMZ[_0x180437('0x1ea')][_0x180437('0x19d')][_0x180437('0x1dc')]['onAddDebuffJS']['call'](this,_0x324746,_0x261851);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x9f')]=function(_0x36b3a3){const _0x4559e7=_0x413554;VisuMZ[_0x4559e7('0x1ea')][_0x4559e7('0x19d')][_0x4559e7('0x1dc')][_0x4559e7('0x18')][_0x4559e7('0x24d')](this,_0x36b3a3);},Game_BattlerBase[_0x413554('0x130')][_0x413554('0x72')]=function(_0x3efb0d){const _0x5e8851=_0x413554;VisuMZ[_0x5e8851('0x1ea')][_0x5e8851('0x19d')][_0x5e8851('0x1dc')][_0x5e8851('0x13e')]['call'](this,_0x3efb0d);},Game_Battler[_0x413554('0x130')][_0x413554('0x195')]=function(_0x198cd2){const _0x25128e=_0x413554;VisuMZ[_0x25128e('0x1ea')][_0x25128e('0x19d')]['Buffs'][_0x25128e('0xb0')]['call'](this,_0x198cd2);},Game_Battler[_0x413554('0x130')][_0x413554('0x89')]=function(_0x138d09){const _0x5dda8c=_0x413554;VisuMZ[_0x5dda8c('0x1ea')][_0x5dda8c('0x19d')][_0x5dda8c('0x1dc')][_0x5dda8c('0x172')][_0x5dda8c('0x24d')](this,_0x138d09);},Game_Battler[_0x413554('0x130')][_0x413554('0xbd')]=function(_0x40119c){const _0x2e1f4e=_0x413554,_0xb38835=VisuMZ[_0x2e1f4e('0x1ea')],_0x6b76fd=[_0x2e1f4e('0xd4'),_0x2e1f4e('0x219'),_0x2e1f4e('0x115'),_0x2e1f4e('0x1c6'),'stateTpSlipDamageJS',_0x2e1f4e('0x289')];for(const _0x4e2237 of _0x6b76fd){if(_0xb38835[_0x4e2237][_0x40119c]){if(_0x2e1f4e('0x265')===_0x2e1f4e('0x265'))_0xb38835[_0x4e2237][_0x40119c][_0x2e1f4e('0x24d')](this,_0x40119c);else{function _0x2f0dc7(){const _0x3cc519=_0x2e1f4e;return this[_0x3cc519('0x31')](_0xb2ffeb[_0x4eb053]);}}}}},VisuMZ[_0x413554('0x1ea')][_0x413554('0x103')]=Game_Battler[_0x413554('0x130')][_0x413554('0x24b')],Game_Battler[_0x413554('0x130')][_0x413554('0x24b')]=function(){const _0x498306=_0x413554;VisuMZ[_0x498306('0x1ea')][_0x498306('0x103')]['call'](this),this['setPassiveStateSlipDamageJS'](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x413554('0x130')][_0x413554('0x126')]=function(){const _0x287779=_0x413554;for(const _0xfab6f4 of this['passiveStates']()){if(_0x287779('0x15c')!==_0x287779('0x246')){if(!_0xfab6f4)continue;this[_0x287779('0xbd')](_0xfab6f4['id']);}else{function _0x566b87(){const _0x51a7d6=_0x287779;this[_0x51a7d6('0x73')](_0x33889f,_0x19f628);}}}},Game_Battler['prototype'][_0x413554('0x8')]=function(){const _0x38a1ab=_0x413554;if(!this['isAlive']())return;const _0x326718=this[_0x38a1ab('0x290')]();for(const _0x257805 of _0x326718){if(_0x38a1ab('0x14f')!==_0x38a1ab('0x294')){if(!_0x257805)continue;this[_0x38a1ab('0x143')](_0x257805);}else{function _0x24aadd(){const _0x15f0fc=_0x38a1ab;this[_0x15f0fc('0x157')](_0x53aac3,_0x88fc7a,_0x100ea7,_0x288dd6),_0x205ef4++,_0xa99c1b%0x2===0x0?(_0x1e19bf=_0x2f0de2,_0x2ea4d8+=_0x859794):_0x52412c+=_0x31b566+0x18;}}}},Game_Battler['prototype'][_0x413554('0x143')]=function(_0x4a1f4c){const _0x47c5c5=_0x413554,_0x4618ed=this[_0x47c5c5('0x1b8')](_0x4a1f4c['id'],_0x47c5c5('0x6e'))||0x0,_0x54de95=-this[_0x47c5c5('0x28e')](),_0x1158f0=Math[_0x47c5c5('0x1c2')](_0x4618ed,_0x54de95);if(_0x1158f0!==0x0)this[_0x47c5c5('0x178')](_0x1158f0);const _0x2b870f=this['getStateData'](_0x4a1f4c['id'],_0x47c5c5('0x2e'))||0x0;if(_0x2b870f!==0x0)this[_0x47c5c5('0x51')](_0x2b870f);const _0x100dbc=this[_0x47c5c5('0x1b8')](_0x4a1f4c['id'],'slipTp')||0x0;if(_0x100dbc!==0x0)this[_0x47c5c5('0x173')](_0x2b870f);},VisuMZ['SkillsStatesCore'][_0x413554('0x286')]=Game_Actor['prototype'][_0x413554('0x26')],Game_Actor[_0x413554('0x130')][_0x413554('0x26')]=function(){const _0x2dabff=_0x413554,_0x219deb=VisuMZ[_0x2dabff('0x1ea')][_0x2dabff('0x286')][_0x2dabff('0x24d')](this),_0x3f8e9a=VisuMZ[_0x2dabff('0x1ea')]['Settings']['Skills'];let _0x37b09b=_0x3f8e9a[_0x2dabff('0x16c')];return $gameParty[_0x2dabff('0x1b1')]()&&(_0x37b09b=_0x37b09b[_0x2dabff('0x158')](_0x3f8e9a[_0x2dabff('0xd6')])),_0x219deb[_0x2dabff('0x25d')](_0x369592=>!_0x37b09b['includes'](_0x369592));},Game_Actor['prototype'][_0x413554('0xf5')]=function(){const _0x9a7533=_0x413554;return this[_0x9a7533('0x235')]()[_0x9a7533('0x25d')](_0x3167ec=>this[_0x9a7533('0x1e7')](_0x3167ec));},Game_Actor[_0x413554('0x130')][_0x413554('0x1e7')]=function(_0x4b854e){const _0x1d5ab5=_0x413554;if(!this[_0x1d5ab5('0x11f')](_0x4b854e))return![];const _0x5b40b=this[_0x1d5ab5('0x26')](),_0x3d763c=DataManager[_0x1d5ab5('0x1e')](_0x4b854e),_0x19959b=_0x5b40b[_0x1d5ab5('0x25d')](_0xf893be=>_0x3d763c['includes'](_0xf893be));return _0x19959b['length']>0x0;},Game_Actor[_0x413554('0x130')][_0x413554('0x144')]=function(){const _0x19ced9=_0x413554;let _0x3f629f=[this[_0x19ced9('0x1a6')](),this[_0x19ced9('0x65')]()];_0x3f629f=_0x3f629f[_0x19ced9('0x158')](this[_0x19ced9('0x200')]()[_0x19ced9('0x25d')](_0x31d05a=>_0x31d05a));for(const _0xa51f88 of this[_0x19ced9('0x39')]){const _0x1bfd1c=$dataSkills[_0xa51f88];if(_0x1bfd1c)_0x3f629f[_0x19ced9('0x2a8')](_0x1bfd1c);}return _0x3f629f;},Game_Actor[_0x413554('0x130')][_0x413554('0x272')]=function(){const _0x17748f=_0x413554;Game_Battler[_0x17748f('0x130')][_0x17748f('0x272')][_0x17748f('0x24d')](this);const _0x2d04db=VisuMZ[_0x17748f('0x1ea')][_0x17748f('0x19d')][_0x17748f('0x7b')][_0x17748f('0xf0')];this[_0x17748f('0x57')][_0x17748f('0x297')]=this[_0x17748f('0x57')][_0x17748f('0x297')]['concat'](_0x2d04db);},VisuMZ[_0x413554('0x1ea')][_0x413554('0xce')]=Game_Actor['prototype']['learnSkill'],Game_Actor[_0x413554('0x130')][_0x413554('0x136')]=function(_0x381102){const _0x3911d6=_0x413554;VisuMZ[_0x3911d6('0x1ea')][_0x3911d6('0xce')][_0x3911d6('0x24d')](this,_0x381102),this[_0x3911d6('0x57')]={};},VisuMZ[_0x413554('0x1ea')][_0x413554('0x177')]=Game_Actor[_0x413554('0x130')]['forgetSkill'],Game_Actor[_0x413554('0x130')][_0x413554('0xfc')]=function(_0x551980){const _0x23d88a=_0x413554;VisuMZ[_0x23d88a('0x1ea')]['Game_Actor_forgetSkill'][_0x23d88a('0x24d')](this,_0x551980),this[_0x23d88a('0x57')]={};},Game_Enemy[_0x413554('0x130')][_0x413554('0x144')]=function(){const _0x38c16a=_0x413554;let _0x26e058=[this[_0x38c16a('0x1da')]()];return _0x26e058[_0x38c16a('0x158')](this[_0x38c16a('0x235')]());},Game_Enemy[_0x413554('0x130')][_0x413554('0x272')]=function(){const _0x4d6c7d=_0x413554;Game_Battler['prototype']['addPassiveStatesByPluginParameters']['call'](this);const _0x583684=VisuMZ['SkillsStatesCore'][_0x4d6c7d('0x19d')][_0x4d6c7d('0x7b')][_0x4d6c7d('0xfd')];this[_0x4d6c7d('0x57')][_0x4d6c7d('0x297')]=this['_cache'][_0x4d6c7d('0x297')][_0x4d6c7d('0x158')](_0x583684);},Game_Enemy[_0x413554('0x130')]['skills']=function(){const _0x284f70=_0x413554,_0x13ad57=[];for(const _0xf9cd63 of this[_0x284f70('0x1da')]()[_0x284f70('0xe9')]){const _0xc844f8=$dataSkills[_0xf9cd63[_0x284f70('0x2ae')]];if(_0xc844f8&&!_0x13ad57['includes'](_0xc844f8))_0x13ad57[_0x284f70('0x2a8')](_0xc844f8);}return _0x13ad57;},Game_Enemy[_0x413554('0x130')]['meetsStateCondition']=function(_0x34dbcf){const _0x550d72=_0x413554;return this[_0x550d72('0x31')]($dataStates[_0x34dbcf]);},VisuMZ[_0x413554('0x1ea')]['Game_Unit_isAllDead']=Game_Unit[_0x413554('0x130')][_0x413554('0x1dd')],Game_Unit[_0x413554('0x130')]['isAllDead']=function(){const _0x105147=_0x413554;if(this[_0x105147('0x105')]())return!![];return VisuMZ['SkillsStatesCore'][_0x105147('0x9a')][_0x105147('0x24d')](this);},Game_Unit[_0x413554('0x130')][_0x413554('0x105')]=function(){const _0x57ecd5=_0x413554,_0x1395f4=this[_0x57ecd5('0x8d')]();for(const _0x46e601 of _0x1395f4){if(!_0x46e601[_0x57ecd5('0x35')]())return![];}return!![];},VisuMZ[_0x413554('0x1ea')][_0x413554('0x2ac')]=Game_Troop[_0x413554('0x130')][_0x413554('0x20')],Game_Troop[_0x413554('0x130')][_0x413554('0x20')]=function(_0x5612ac){const _0x57b651=_0x413554;VisuMZ[_0x57b651('0x1ea')][_0x57b651('0x2ac')][_0x57b651('0x24d')](this,_0x5612ac),this['makeCurrentTroopUniqueID']();},Game_Troop[_0x413554('0x130')]['makeCurrentTroopUniqueID']=function(){const _0x3aa259=_0x413554;this['_currentTroopUniqueID']=Graphics[_0x3aa259('0x1ef')];},Game_Troop[_0x413554('0x130')][_0x413554('0xdf')]=function(){const _0x51e121=_0x413554;return this[_0x51e121('0x102')]=this['_currentTroopUniqueID']||Graphics[_0x51e121('0x1ef')],this[_0x51e121('0x102')];},Scene_Skill[_0x413554('0x130')][_0x413554('0xb')]=function(){const _0x2e848c=_0x413554;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x2e848c('0x1ce')];else{if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x2e848c('0x1fe')===_0x2e848c('0x1e0')){function _0x1c92e8(){const _0x5ac89c=_0x2e848c,_0x34cab3=_0x3175db['parse']('['+_0x1fdc08['$1'][_0x5ac89c('0x56')](/\d+/g)+']');for(const _0x42a638 of _0x34cab3){if(_0x36254a[_0x5ac89c('0x27e')](_0x42a638))return!![];}return![];}}else return this[_0x2e848c('0x180')]()[_0x2e848c('0x56')](/LOWER/i);}else Scene_ItemBase[_0x2e848c('0x130')][_0x2e848c('0x2a4')][_0x2e848c('0x24d')](this);}},Scene_Skill['prototype'][_0x413554('0x2a4')]=function(){const _0x5b804c=_0x413554;if(ConfigManager[_0x5b804c('0x11e')]&&ConfigManager[_0x5b804c('0xcb')]!==undefined)return ConfigManager[_0x5b804c('0xcb')];else return this[_0x5b804c('0x107')]()?this[_0x5b804c('0x180')]()[_0x5b804c('0x56')](/RIGHT/i):Scene_ItemBase[_0x5b804c('0x130')]['isRightInputMode']['call'](this);},Scene_Skill[_0x413554('0x130')][_0x413554('0x180')]=function(){const _0x5be72d=_0x413554;return VisuMZ[_0x5be72d('0x1ea')][_0x5be72d('0x19d')][_0x5be72d('0xaa')][_0x5be72d('0x2d')];},Scene_Skill['prototype'][_0x413554('0x26d')]=function(){const _0x49d135=_0x413554;return this[_0x49d135('0x10a')]&&this[_0x49d135('0x10a')][_0x49d135('0x26d')]();},Scene_Skill['prototype'][_0x413554('0x107')]=function(){const _0x4e6562=_0x413554;return VisuMZ[_0x4e6562('0x1ea')][_0x4e6562('0x19d')][_0x4e6562('0xaa')][_0x4e6562('0x1b6')];},VisuMZ['SkillsStatesCore'][_0x413554('0x122')]=Scene_Skill['prototype']['helpWindowRect'],Scene_Skill[_0x413554('0x130')][_0x413554('0xc5')]=function(){const _0x3fc71e=_0x413554;if(this[_0x3fc71e('0x107')]()){if(_0x3fc71e('0x150')===_0x3fc71e('0x55')){function _0x365b57(){const _0x156e80=_0x3fc71e;if(!_0x50a827[_0x156e80('0x27e')](_0x326117))return![];}}else return this['helpWindowRectSkillsStatesCore']();}else return VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x3fc71e('0x24d')](this);},Scene_Skill[_0x413554('0x130')]['helpWindowRectSkillsStatesCore']=function(){const _0x273638=_0x413554,_0x3e642e=0x0,_0x33411f=this[_0x273638('0x1d7')](),_0x225143=Graphics[_0x273638('0xd2')],_0x49ac37=this[_0x273638('0xc6')]();return new Rectangle(_0x3e642e,_0x33411f,_0x225143,_0x49ac37);},VisuMZ[_0x413554('0x1ea')]['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x413554('0x130')][_0x413554('0x211')],Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x423388=_0x413554;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['skillTypeWindowRectSkillsStatesCore']();else{if(_0x423388('0x21d')===_0x423388('0x5d')){function _0xad8faa(){const _0x60a07d=_0x423388;_0x300038[_0x60a07d('0x151')](_0x22d0d9,_0x10a243),this[_0x60a07d('0x1f3')](_0x544b43);}}else return VisuMZ['SkillsStatesCore']['Scene_Skill_skillTypeWindowRect']['call'](this);}},Scene_Skill[_0x413554('0x130')]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x4d19e5=_0x413554,_0x3450e9=this['mainCommandWidth'](),_0x12393f=this[_0x4d19e5('0x202')](0x3,!![]),_0x8bf881=this['isRightInputMode']()?Graphics[_0x4d19e5('0xd2')]-_0x3450e9:0x0,_0x547344=this[_0x4d19e5('0x22e')]();return new Rectangle(_0x8bf881,_0x547344,_0x3450e9,_0x12393f);},VisuMZ[_0x413554('0x1ea')]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x413554('0x130')][_0x413554('0x1ab')],Scene_Skill['prototype'][_0x413554('0x1ab')]=function(){const _0x5afc40=_0x413554;if(this[_0x5afc40('0x107')]())return this['statusWindowRectSkillsStatesCore']();else{if(_0x5afc40('0x270')==='uUVeB'){function _0x461801(){const _0x581374=_0x5afc40,_0x638b37=_0x2ab4fe['note'];return _0x638b37[_0x581374('0x56')](/<REAPPLY RULES:[ ](.*)>/i)?_0x289aa3(_0x3e72fb['$1']):_0x5cee06[_0x581374('0x1ea')][_0x581374('0x19d')][_0x581374('0x4')][_0x581374('0xf2')];}}else return VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect'][_0x5afc40('0x24d')](this);}},Scene_Skill[_0x413554('0x130')][_0x413554('0xbe')]=function(){const _0x3d47c8=_0x413554,_0x507645=Graphics[_0x3d47c8('0xd2')]-this['mainCommandWidth'](),_0x10239c=this[_0x3d47c8('0x26a')][_0x3d47c8('0x19a')],_0x21e5f7=this[_0x3d47c8('0x2a4')]()?0x0:Graphics[_0x3d47c8('0xd2')]-_0x507645,_0x5ab651=this[_0x3d47c8('0x22e')]();return new Rectangle(_0x21e5f7,_0x5ab651,_0x507645,_0x10239c);},VisuMZ[_0x413554('0x1ea')]['Scene_Skill_createItemWindow']=Scene_Skill[_0x413554('0x130')][_0x413554('0x88')],Scene_Skill[_0x413554('0x130')][_0x413554('0x88')]=function(){const _0x1e60fe=_0x413554;VisuMZ[_0x1e60fe('0x1ea')][_0x1e60fe('0x168')][_0x1e60fe('0x24d')](this),this['allowCreateShopStatusWindow']()&&this['createShopStatusWindow']();},VisuMZ[_0x413554('0x1ea')][_0x413554('0x21b')]=Scene_Skill[_0x413554('0x130')][_0x413554('0xc3')],Scene_Skill['prototype'][_0x413554('0xc3')]=function(){const _0x5bfd73=_0x413554;if(this[_0x5bfd73('0x107')]())return this[_0x5bfd73('0x1ed')]();else{if(_0x5bfd73('0x1f4')!==_0x5bfd73('0x1f4')){function _0x162ab2(){const _0x25e4df=_0x5bfd73,_0x436d80=this['_buffs'][_0x33bc4d];return _0x52ce42[_0x25e4df('0x1ea')][_0x25e4df('0x19d')]['Buffs'][_0x25e4df('0x1d1')][_0x25e4df('0x24d')](this,_0xbffd4e,_0x436d80);}}else{const _0x39371e=VisuMZ['SkillsStatesCore']['Scene_Skill_itemWindowRect'][_0x5bfd73('0x24d')](this);return this[_0x5bfd73('0x26b')]()&&this['adjustItemWidthByShopStatus']()&&(_0x39371e[_0x5bfd73('0x229')]-=this[_0x5bfd73('0x283')]()),_0x39371e;}}},Scene_Skill['prototype']['itemWindowRectSkillsStatesCore']=function(){const _0x4a00ac=_0x413554,_0xed0c76=Graphics[_0x4a00ac('0xd2')]-this[_0x4a00ac('0x283')](),_0x206654=this[_0x4a00ac('0x28b')]()-this['_statusWindow']['height'],_0x10a0ee=this[_0x4a00ac('0x2a4')]()?Graphics['boxWidth']-_0xed0c76:0x0,_0x58f085=this[_0x4a00ac('0x132')]['y']+this[_0x4a00ac('0x132')]['height'];return new Rectangle(_0x10a0ee,_0x58f085,_0xed0c76,_0x206654);},Scene_Skill['prototype']['allowCreateShopStatusWindow']=function(){const _0x197169=_0x413554;if(!Imported[_0x197169('0x60')]){if(_0x197169('0x1ba')!==_0x197169('0x259'))return![];else{function _0x1c0684(){const _0x3d8bb3=_0x197169;this[_0x3d8bb3('0xe4')](_0x3dc034),this['onAddStateMakeCustomSlipValues'](_0x4fe077),this[_0x3d8bb3('0x24e')](_0x1f167d),this[_0x3d8bb3('0x5b')](_0xe934e6);}}}else return this[_0x197169('0x107')]()?!![]:VisuMZ[_0x197169('0x1ea')][_0x197169('0x19d')][_0x197169('0xaa')][_0x197169('0x1f8')];},Scene_Skill[_0x413554('0x130')]['adjustItemWidthByShopStatus']=function(){const _0x5ea110=_0x413554;return VisuMZ[_0x5ea110('0x1ea')][_0x5ea110('0x19d')]['Skills'][_0x5ea110('0x170')];},Scene_Skill[_0x413554('0x130')][_0x413554('0x1c')]=function(){const _0x1b7c59=_0x413554,_0x397288=this[_0x1b7c59('0x54')]();this[_0x1b7c59('0xdc')]=new Window_ShopStatus(_0x397288),this['addWindow'](this[_0x1b7c59('0xdc')]),this[_0x1b7c59('0x22c')]['setStatusWindow'](this['_shopStatusWindow']);},Scene_Skill[_0x413554('0x130')][_0x413554('0x54')]=function(){const _0x214d1b=_0x413554;return this[_0x214d1b('0x107')]()?this[_0x214d1b('0x1fb')]():VisuMZ[_0x214d1b('0x1ea')][_0x214d1b('0x19d')]['Skills'][_0x214d1b('0x1c0')][_0x214d1b('0x24d')](this);},Scene_Skill[_0x413554('0x130')][_0x413554('0x1fb')]=function(){const _0x1b36c4=_0x413554,_0xc6e79d=this[_0x1b36c4('0x283')](),_0x3d0770=this[_0x1b36c4('0x22c')]['height'],_0x4f48c1=this[_0x1b36c4('0x2a4')]()?0x0:Graphics[_0x1b36c4('0xd2')]-this[_0x1b36c4('0x283')](),_0x4c22b8=this[_0x1b36c4('0x22c')]['y'];return new Rectangle(_0x4f48c1,_0x4c22b8,_0xc6e79d,_0x3d0770);},Scene_Skill[_0x413554('0x130')][_0x413554('0x283')]=function(){const _0x560618=_0x413554;if(Imported[_0x560618('0x60')]){if('OeueU'!==_0x560618('0x38')){function _0x5d71a9(){const _0x43fb9e=_0x560618,_0x2378fb=_0x12eb40['parse']('['+_0x3eff2c['$1'][_0x43fb9e('0x56')](/\d+/g)+']');for(const _0x2d3c30 of _0x2378fb){if(!_0xef6744['value'](_0x2d3c30))return!![];}return![];}}else return Scene_Shop[_0x560618('0x130')][_0x560618('0x1cf')]();}else{if('eIhHN'===_0x560618('0x138')){function _0xcf7eb4(){const _0x135937=_0x560618;this['_statusWindow'][_0x135937('0x1bd')](this['itemAt'](0x0));}}else return 0x0;}},Scene_Skill[_0x413554('0x130')][_0x413554('0x1c3')]=function(){const _0x730be9=_0x413554;return this[_0x730be9('0x26a')]&&this[_0x730be9('0x26a')][_0x730be9('0x97')]?TextManager[_0x730be9('0x237')]:'';},VisuMZ[_0x413554('0x1ea')][_0x413554('0xe0')]=Sprite_Gauge[_0x413554('0x130')]['initMembers'],Sprite_Gauge[_0x413554('0x130')][_0x413554('0x179')]=function(){const _0x4650f8=_0x413554;VisuMZ['SkillsStatesCore'][_0x4650f8('0xe0')][_0x4650f8('0x24d')](this),this['_costSettings']=null;},VisuMZ['SkillsStatesCore'][_0x413554('0x2a9')]=Sprite_Gauge[_0x413554('0x130')][_0x413554('0x20')],Sprite_Gauge[_0x413554('0x130')][_0x413554('0x20')]=function(_0x1f87a3,_0x2188d1){const _0x122287=_0x413554;this['setupSkillsStatesCore'](_0x1f87a3,_0x2188d1),_0x2188d1=_0x2188d1[_0x122287('0x17d')](),VisuMZ[_0x122287('0x1ea')][_0x122287('0x2a9')][_0x122287('0x24d')](this,_0x1f87a3,_0x2188d1);},Sprite_Gauge[_0x413554('0x130')]['setupSkillsStatesCore']=function(_0x38dcda,_0x48c8cc){const _0x1776da=_0x413554,_0x3a901d=VisuMZ[_0x1776da('0x1ea')][_0x1776da('0x19d')]['Costs']['filter'](_0x455a35=>_0x455a35[_0x1776da('0x80')][_0x1776da('0x20c')]()===_0x48c8cc[_0x1776da('0x20c')]());_0x3a901d[_0x1776da('0x86')]>=0x1?this[_0x1776da('0x1c8')]=_0x3a901d[0x0]:this[_0x1776da('0x1c8')]=null;},VisuMZ[_0x413554('0x1ea')][_0x413554('0x261')]=Sprite_Gauge[_0x413554('0x130')][_0x413554('0x192')],Sprite_Gauge['prototype']['currentValue']=function(){const _0x1a3704=_0x413554;return this[_0x1a3704('0xbc')]&&this[_0x1a3704('0x1c8')]?this[_0x1a3704('0x1cb')]():VisuMZ['SkillsStatesCore']['Sprite_Gauge_currentValue'][_0x1a3704('0x24d')](this);},Sprite_Gauge['prototype'][_0x413554('0x1cb')]=function(){const _0x56470c=_0x413554;return this['_costSettings'][_0x56470c('0x11c')][_0x56470c('0x24d')](this[_0x56470c('0xbc')]);},VisuMZ['SkillsStatesCore'][_0x413554('0xae')]=Sprite_Gauge['prototype'][_0x413554('0x142')],Sprite_Gauge[_0x413554('0x130')][_0x413554('0x142')]=function(){const _0x52ad48=_0x413554;return this[_0x52ad48('0xbc')]&&this[_0x52ad48('0x1c8')]?this[_0x52ad48('0x2a5')]():VisuMZ[_0x52ad48('0x1ea')]['Sprite_Gauge_currentMaxValue'][_0x52ad48('0x24d')](this);},Sprite_Gauge[_0x413554('0x130')][_0x413554('0x2a5')]=function(){const _0x2e526=_0x413554;return this['_costSettings'][_0x2e526('0x66')][_0x2e526('0x24d')](this[_0x2e526('0xbc')]);},VisuMZ[_0x413554('0x1ea')][_0x413554('0x1ca')]=Sprite_Gauge['prototype'][_0x413554('0x127')],Sprite_Gauge[_0x413554('0x130')][_0x413554('0x127')]=function(){const _0x49bd36=_0x413554,_0x26ba25=VisuMZ[_0x49bd36('0x1ea')][_0x49bd36('0x1ca')][_0x49bd36('0x24d')](this);return _0x26ba25[_0x49bd36('0x29b')](0x0,0x1);},VisuMZ[_0x413554('0x1ea')][_0x413554('0x24c')]=Sprite_Gauge[_0x413554('0x130')]['redraw'],Sprite_Gauge[_0x413554('0x130')]['redraw']=function(){const _0x329890=_0x413554;this['_battler']&&this[_0x329890('0x1c8')]?(this[_0x329890('0x14d')][_0x329890('0x23')](),this['redrawSkillsStatesCore']()):VisuMZ[_0x329890('0x1ea')][_0x329890('0x24c')][_0x329890('0x24d')](this);},Sprite_Gauge[_0x413554('0x130')]['currentDisplayedValue']=function(){const _0x2f337a=_0x413554;let _0x200483=this[_0x2f337a('0x192')]();return Imported[_0x2f337a('0x19b')]&&this[_0x2f337a('0x28d')]()&&(_0x200483=VisuMZ['GroupDigits'](_0x200483)),_0x200483;},Sprite_Gauge[_0x413554('0x130')][_0x413554('0x2a0')]=function(){const _0x3c570a=_0x413554;this[_0x3c570a('0x1c8')][_0x3c570a('0x1f2')][_0x3c570a('0x24d')](this);},Sprite_Gauge[_0x413554('0x130')][_0x413554('0x1de')]=function(_0x22b261,_0x3ef93e,_0x100a19,_0x688ccf,_0x3fdb91,_0x429448){const _0x10a635=_0x413554,_0x385787=this[_0x10a635('0x127')](),_0x1d1060=Math['floor']((_0x3fdb91-0x2)*_0x385787),_0x57fbe2=_0x429448-0x2,_0x14787f=this['gaugeBackColor']();this['bitmap'][_0x10a635('0x16a')](_0x100a19,_0x688ccf,_0x3fdb91,_0x429448,_0x14787f),this[_0x10a635('0x14d')][_0x10a635('0x6')](_0x100a19+0x1,_0x688ccf+0x1,_0x1d1060,_0x57fbe2,_0x22b261,_0x3ef93e);},VisuMZ[_0x413554('0x1ea')][_0x413554('0x30')]=Sprite_StateIcon[_0x413554('0x130')][_0x413554('0x12e')],Sprite_StateIcon[_0x413554('0x130')][_0x413554('0x12e')]=function(){const _0x1ed827=_0x413554;VisuMZ[_0x1ed827('0x1ea')][_0x1ed827('0x30')][_0x1ed827('0x24d')](this),this[_0x1ed827('0xcc')]();},Sprite_StateIcon[_0x413554('0x130')][_0x413554('0xcc')]=function(){const _0x3386e6=_0x413554,_0xbe0390=Window_Base[_0x3386e6('0x130')][_0x3386e6('0x25')]();this[_0x3386e6('0x1be')]=new Sprite(),this[_0x3386e6('0x1be')][_0x3386e6('0x14d')]=new Bitmap(ImageManager[_0x3386e6('0x245')],_0xbe0390),this[_0x3386e6('0x1be')][_0x3386e6('0x17c')]['x']=this[_0x3386e6('0x17c')]['x'],this[_0x3386e6('0x1be')][_0x3386e6('0x17c')]['y']=this[_0x3386e6('0x17c')]['y'],this['addChild'](this['_turnDisplaySprite']),this[_0x3386e6('0x3c')]=this[_0x3386e6('0x1be')]['bitmap'];},VisuMZ[_0x413554('0x1ea')][_0x413554('0x1fc')]=Sprite_StateIcon[_0x413554('0x130')][_0x413554('0xf6')],Sprite_StateIcon[_0x413554('0x130')][_0x413554('0xf6')]=function(){const _0x28b1b6=_0x413554;VisuMZ[_0x28b1b6('0x1ea')][_0x28b1b6('0x1fc')][_0x28b1b6('0x24d')](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0x413554('0x130')][_0x413554('0x187')]=function(_0x279482,_0x38c6b2,_0x5362dd,_0x233bf0,_0x13ec5f){const _0x25fff8=_0x413554;this[_0x25fff8('0x3c')][_0x25fff8('0x187')](_0x279482,_0x38c6b2,_0x5362dd,_0x233bf0,this['contents'][_0x25fff8('0x19a')],_0x13ec5f);},Sprite_StateIcon['prototype'][_0x413554('0x10e')]=function(){const _0x448d53=_0x413554;this[_0x448d53('0x7d')](),this[_0x448d53('0x3c')]['clear']();const _0x5dc5d8=this[_0x448d53('0xbc')];if(!_0x5dc5d8)return;const _0x46b616=_0x5dc5d8['states']()[_0x448d53('0x25d')](_0x3c2c21=>_0x3c2c21[_0x448d53('0xbb')]>0x0),_0x975a6e=[...Array(0x8)[_0x448d53('0x8e')]()][_0x448d53('0x25d')](_0x17e7cc=>_0x5dc5d8[_0x448d53('0xb6')](_0x17e7cc)!==0x0),_0x569eda=this[_0x448d53('0x156')],_0x5dfeae=_0x46b616[_0x569eda];if(_0x5dfeae)Window_Base['prototype']['drawActorStateTurns'][_0x448d53('0x24d')](this,_0x5dc5d8,_0x5dfeae,0x0,0x0),Window_Base[_0x448d53('0x130')][_0x448d53('0x188')][_0x448d53('0x24d')](this,_0x5dc5d8,_0x5dfeae,0x0,0x0);else{const _0x113149=_0x975a6e[_0x569eda-_0x46b616[_0x448d53('0x86')]];if(!_0x113149)return;Window_Base[_0x448d53('0x130')]['drawActorBuffTurns'][_0x448d53('0x24d')](this,_0x5dc5d8,_0x113149,0x0,0x0),Window_Base[_0x448d53('0x130')][_0x448d53('0x1a3')][_0x448d53('0x24d')](this,_0x5dc5d8,_0x113149,0x0,0x0);}},Sprite_StateIcon[_0x413554('0x130')][_0x413554('0x7d')]=function(){const _0x39faf7=_0x413554;this[_0x39faf7('0x3c')][_0x39faf7('0x267')]=$gameSystem[_0x39faf7('0xfb')](),this['contents']['fontSize']=$gameSystem[_0x39faf7('0x28a')](),this['resetTextColor']();},Sprite_StateIcon[_0x413554('0x130')][_0x413554('0x291')]=function(){const _0x50abfb=_0x413554;this[_0x50abfb('0x174')](ColorManager[_0x50abfb('0x2aa')]()),this[_0x50abfb('0x12')](ColorManager['outlineColor']());},Sprite_StateIcon[_0x413554('0x130')]['changeTextColor']=function(_0x4a99e7){const _0x2275f3=_0x413554;this['contents'][_0x2275f3('0x2c')]=_0x4a99e7;},Sprite_StateIcon['prototype'][_0x413554('0x12')]=function(_0x209d59){const _0xd2c605=_0x413554;this[_0xd2c605('0x3c')][_0xd2c605('0x249')]=_0x209d59;},Window_Base['prototype'][_0x413554('0x2a7')]=function(_0x393909,_0x4fc3e6,_0x49d72e,_0x239547,_0x5e83f4){const _0x5ed7ef=_0x413554,_0x1f324a=this['createAllSkillCostText'](_0x393909,_0x4fc3e6),_0x447d31=this[_0x5ed7ef('0x21f')](_0x1f324a,_0x49d72e,_0x239547,_0x5e83f4),_0x3e0a73=_0x49d72e+_0x5e83f4-_0x447d31[_0x5ed7ef('0x229')];this[_0x5ed7ef('0x5a')](_0x1f324a,_0x3e0a73,_0x239547,_0x5e83f4),this[_0x5ed7ef('0x7d')]();},Window_Base['prototype'][_0x413554('0xac')]=function(_0x326d47,_0x2d7006){const _0x1ec47b=_0x413554;let _0x5cbac7='';for(settings of VisuMZ[_0x1ec47b('0x1ea')]['Settings'][_0x1ec47b('0xa0')]){if(!this[_0x1ec47b('0x236')](_0x326d47,_0x2d7006,settings))continue;if(_0x5cbac7[_0x1ec47b('0x86')]>0x0)_0x5cbac7+=this[_0x1ec47b('0x278')]();_0x5cbac7+=this[_0x1ec47b('0x95')](_0x326d47,_0x2d7006,settings);}_0x5cbac7=this[_0x1ec47b('0xcf')](_0x326d47,_0x2d7006,_0x5cbac7);if(_0x2d7006[_0x1ec47b('0x19c')][_0x1ec47b('0x56')](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x5cbac7[_0x1ec47b('0x86')]>0x0)_0x5cbac7+=this[_0x1ec47b('0x278')]();_0x5cbac7+=String(RegExp['$1']);}return _0x5cbac7;},Window_Base[_0x413554('0x130')][_0x413554('0xcf')]=function(_0xc00572,_0x293e42,_0x3b4cae){return _0x3b4cae;},Window_Base['prototype'][_0x413554('0x236')]=function(_0x163755,_0x5ef2e5,_0x3a618e){const _0x12de5b=_0x413554,_0x3df688=_0x3a618e[_0x12de5b('0x288')][_0x12de5b('0x24d')](_0x163755,_0x5ef2e5);return _0x3a618e[_0x12de5b('0x22a')][_0x12de5b('0x24d')](_0x163755,_0x5ef2e5,_0x3df688,_0x3a618e);},Window_Base[_0x413554('0x130')][_0x413554('0x95')]=function(_0x4b24cd,_0x52f3e7,_0x31f0ca){const _0xfd176=_0x413554,_0x546dd3=_0x31f0ca['CalcJS']['call'](_0x4b24cd,_0x52f3e7);return _0x31f0ca[_0xfd176('0x43')][_0xfd176('0x24d')](_0x4b24cd,_0x52f3e7,_0x546dd3,_0x31f0ca);},Window_Base[_0x413554('0x130')][_0x413554('0x278')]=function(){return'\x20';},Window_Base['prototype'][_0x413554('0x70')]=function(_0x3ced11,_0x4ad5fd,_0x488f31,_0x324a6e){const _0x52beb9=_0x413554;if(!_0x3ced11)return;VisuMZ[_0x52beb9('0x1ea')][_0x52beb9('0x218')]['call'](this,_0x3ced11,_0x4ad5fd,_0x488f31,_0x324a6e),this[_0x52beb9('0x1f6')](_0x3ced11,_0x4ad5fd,_0x488f31,_0x324a6e);},Window_Base['prototype'][_0x413554('0x1f6')]=function(_0xe8ebd,_0x519de4,_0x441815,_0x38df0c){const _0x43cead=_0x413554;_0x38df0c=_0x38df0c||0x90;const _0x3eecda=ImageManager[_0x43cead('0x245')],_0x140a39=_0xe8ebd[_0x43cead('0x23f')]()[_0x43cead('0x2a1')](0x0,Math[_0x43cead('0x14b')](_0x38df0c/_0x3eecda)),_0x3bcab3=_0xe8ebd[_0x43cead('0x290')]()[_0x43cead('0x25d')](_0x1a9815=>_0x1a9815[_0x43cead('0xbb')]>0x0),_0x4bc729=[...Array(0x8)[_0x43cead('0x8e')]()][_0x43cead('0x25d')](_0x8c38ee=>_0xe8ebd[_0x43cead('0xb6')](_0x8c38ee)!==0x0),_0x461464=[];let _0x491745=_0x519de4;for(let _0x2cde1c=0x0;_0x2cde1c<_0x140a39[_0x43cead('0x86')];_0x2cde1c++){if(_0x43cead('0x4f')!==_0x43cead('0x4f')){function _0x2076a4(){const _0xde2ff2=_0x43cead;return _0x357af8[_0xde2ff2('0x1ea')]['Settings']['Skills'][_0xde2ff2('0x1b6')];}}else{this[_0x43cead('0x7d')]();const _0x494515=_0x3bcab3[_0x2cde1c];if(_0x494515){if(!_0x461464[_0x43cead('0x14')](_0x494515)){if(_0x43cead('0x201')===_0x43cead('0x22f')){function _0x13a711(){return _0x30b713['_currentActor'];}}else this['drawActorStateTurns'](_0xe8ebd,_0x494515,_0x491745,_0x441815);}this['drawActorStateData'](_0xe8ebd,_0x494515,_0x491745,_0x441815),_0x461464['push'](_0x494515);}else{const _0x4634f5=_0x4bc729[_0x2cde1c-_0x3bcab3['length']];this['drawActorBuffTurns'](_0xe8ebd,_0x4634f5,_0x491745,_0x441815),this[_0x43cead('0x1a3')](_0xe8ebd,_0x4634f5,_0x491745,_0x441815);}_0x491745+=_0x3eecda;}}},Window_Base[_0x413554('0x130')][_0x413554('0x266')]=function(_0x41caa7,_0x2804fe,_0x5b2b48,_0x19b66f){const _0x2f76fc=_0x413554;if(!VisuMZ[_0x2f76fc('0x1ea')][_0x2f76fc('0x19d')][_0x2f76fc('0x4')][_0x2f76fc('0x14e')])return;if(!_0x41caa7[_0x2f76fc('0x40')](_0x2804fe['id']))return;if(_0x2804fe['autoRemovalTiming']===0x0)return;if(_0x2804fe[_0x2f76fc('0x19c')][_0x2f76fc('0x56')](/<HIDE STATE TURNS>/i))return;const _0x39ea67=_0x41caa7[_0x2f76fc('0x208')](_0x2804fe['id']),_0x1d2f96=ImageManager[_0x2f76fc('0x245')],_0x4fc853=ColorManager[_0x2f76fc('0xdb')](_0x2804fe);this[_0x2f76fc('0x174')](_0x4fc853),this[_0x2f76fc('0x12')]('rgba(0,\x200,\x200,\x201)'),this[_0x2f76fc('0x3c')]['fontBold']=!![],this['contents'][_0x2f76fc('0x17a')]=VisuMZ[_0x2f76fc('0x1ea')][_0x2f76fc('0x19d')][_0x2f76fc('0x4')][_0x2f76fc('0x24')],_0x5b2b48+=VisuMZ[_0x2f76fc('0x1ea')][_0x2f76fc('0x19d')][_0x2f76fc('0x4')][_0x2f76fc('0x11d')],_0x19b66f+=VisuMZ[_0x2f76fc('0x1ea')][_0x2f76fc('0x19d')][_0x2f76fc('0x4')][_0x2f76fc('0x135')],this['drawText'](_0x39ea67,_0x5b2b48,_0x19b66f,_0x1d2f96,'right'),this[_0x2f76fc('0x3c')][_0x2f76fc('0x1eb')]=![],this[_0x2f76fc('0x7d')]();},Window_Base['prototype']['drawActorStateData']=function(_0xd46551,_0x61481c,_0x42c2d4,_0x469f46){const _0x354597=_0x413554;if(!VisuMZ['SkillsStatesCore'][_0x354597('0x19d')][_0x354597('0x4')][_0x354597('0x1f')])return;const _0x50ec5e=ImageManager[_0x354597('0x245')],_0xb4d9ef=ImageManager['iconHeight']/0x2,_0x247a5d=ColorManager[_0x354597('0x2aa')]();this[_0x354597('0x174')](_0x247a5d),this[_0x354597('0x12')](_0x354597('0x3f')),this[_0x354597('0x3c')][_0x354597('0x1eb')]=!![],this[_0x354597('0x3c')]['fontSize']=VisuMZ[_0x354597('0x1ea')][_0x354597('0x19d')][_0x354597('0x4')][_0x354597('0x106')],_0x42c2d4+=VisuMZ[_0x354597('0x1ea')][_0x354597('0x19d')][_0x354597('0x4')][_0x354597('0x21e')],_0x469f46+=VisuMZ['SkillsStatesCore'][_0x354597('0x19d')][_0x354597('0x4')][_0x354597('0x1e6')];const _0xa9688a=String(_0xd46551[_0x354597('0x2b1')](_0x61481c['id']));this['drawText'](_0xa9688a,_0x42c2d4,_0x469f46,_0x50ec5e,_0x354597('0x217')),this[_0x354597('0x3c')][_0x354597('0x1eb')]=![],this[_0x354597('0x7d')]();},Window_Base[_0x413554('0x130')][_0x413554('0x1f1')]=function(_0xf1aaea,_0x37e99c,_0x511d5b,_0x5b1478){const _0x22269c=_0x413554;if(!VisuMZ[_0x22269c('0x1ea')][_0x22269c('0x19d')][_0x22269c('0x1dc')][_0x22269c('0x14e')])return;const _0x51ac64=_0xf1aaea[_0x22269c('0xb6')](_0x37e99c);if(_0x51ac64===0x0)return;const _0x455241=_0xf1aaea['buffTurns'](_0x37e99c),_0x5ae205=ImageManager['iconWidth'],_0x46c198=_0x51ac64>0x0?ColorManager[_0x22269c('0x169')]():ColorManager[_0x22269c('0x53')]();this[_0x22269c('0x174')](_0x46c198),this[_0x22269c('0x12')](_0x22269c('0x3f')),this['contents'][_0x22269c('0x1eb')]=!![],this[_0x22269c('0x3c')][_0x22269c('0x17a')]=VisuMZ[_0x22269c('0x1ea')][_0x22269c('0x19d')]['Buffs'][_0x22269c('0x24')],_0x511d5b+=VisuMZ['SkillsStatesCore'][_0x22269c('0x19d')][_0x22269c('0x1dc')][_0x22269c('0x11d')],_0x5b1478+=VisuMZ[_0x22269c('0x1ea')][_0x22269c('0x19d')]['Buffs'][_0x22269c('0x135')],this['drawText'](_0x455241,_0x511d5b,_0x5b1478,_0x5ae205,_0x22269c('0xad')),this[_0x22269c('0x3c')][_0x22269c('0x1eb')]=![],this[_0x22269c('0x7d')]();},Window_Base[_0x413554('0x130')][_0x413554('0x1a3')]=function(_0x5b4158,_0x1d3cb1,_0x5d209f,_0x5e9d59){const _0x133f62=_0x413554;if(!VisuMZ[_0x133f62('0x1ea')]['Settings'][_0x133f62('0x1dc')][_0x133f62('0x1f')])return;const _0x4c7b03=_0x5b4158[_0x133f62('0x125')](_0x1d3cb1),_0x5cd931=_0x5b4158[_0x133f62('0xb6')](_0x1d3cb1),_0x30e9bf=ImageManager[_0x133f62('0x245')],_0x2ef2ac=ImageManager[_0x133f62('0x8f')]/0x2,_0x56e861=_0x5cd931>0x0?ColorManager[_0x133f62('0x169')]():ColorManager[_0x133f62('0x53')]();this['changeTextColor'](_0x56e861),this[_0x133f62('0x12')]('rgba(0,\x200,\x200,\x201)'),this[_0x133f62('0x3c')]['fontBold']=!![],this[_0x133f62('0x3c')][_0x133f62('0x17a')]=VisuMZ['SkillsStatesCore'][_0x133f62('0x19d')][_0x133f62('0x1dc')][_0x133f62('0x106')],_0x5d209f+=VisuMZ['SkillsStatesCore'][_0x133f62('0x19d')][_0x133f62('0x1dc')]['DataOffsetX'],_0x5e9d59+=VisuMZ['SkillsStatesCore'][_0x133f62('0x19d')][_0x133f62('0x1dc')][_0x133f62('0x1e6')];const _0x320064='%1%'[_0x133f62('0x1f5')](Math[_0x133f62('0xf7')](_0x4c7b03*0x64));this[_0x133f62('0x187')](_0x320064,_0x5d209f,_0x5e9d59,_0x30e9bf,'center'),this[_0x133f62('0x3c')][_0x133f62('0x1eb')]=![],this[_0x133f62('0x7d')]();},VisuMZ[_0x413554('0x1ea')]['Window_StatusBase_placeGauge']=Window_StatusBase['prototype']['placeGauge'],Window_StatusBase[_0x413554('0x130')][_0x413554('0xa7')]=function(_0x29eb8f,_0x3d296b,_0x1a1863,_0x58aad5){if(_0x29eb8f['isActor']())_0x3d296b=this['convertGaugeTypeSkillsStatesCore'](_0x29eb8f,_0x3d296b);this['placeExactGauge'](_0x29eb8f,_0x3d296b,_0x1a1863,_0x58aad5);},Window_StatusBase[_0x413554('0x130')][_0x413554('0x49')]=function(_0x3bdf24,_0x52277e,_0x22ba43,_0x1136fe){const _0x11774f=_0x413554;if([_0x11774f('0x75'),_0x11774f('0x1cc')]['includes'](_0x52277e['toLowerCase']()))return;VisuMZ[_0x11774f('0x1ea')][_0x11774f('0x23c')][_0x11774f('0x24d')](this,_0x3bdf24,_0x52277e,_0x22ba43,_0x1136fe);},Window_StatusBase[_0x413554('0x130')][_0x413554('0x29e')]=function(_0x3d4040,_0x692342){const _0x14dd29=_0x413554,_0x5e7acf=_0x3d4040['currentClass']()['note'];if(_0x692342==='hp'&&_0x5e7acf[_0x14dd29('0x56')](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x692342==='mp'&&_0x5e7acf[_0x14dd29('0x56')](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x14dd29('0xc7')===_0x14dd29('0x20b')){function _0x47f8d2(){const _0x12bf61=_0x14dd29;let _0x4be215=this[_0x12bf61('0x192')]();return _0x49f21e['VisuMZ_0_CoreEngine']&&this[_0x12bf61('0x28d')]()&&(_0x4be215=_0x5da327[_0x12bf61('0x28f')](_0x4be215)),_0x4be215;}}else return String(RegExp['$1']);}else{if(_0x692342==='tp'&&_0x5e7acf['match'](/<REPLACE TP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x14dd29('0x1b0')!==_0x14dd29('0xb8'))return _0x692342;else{function _0x59ff43(){const _0x764447=_0x14dd29;return this[_0x764447('0xbc')]&&this[_0x764447('0x1c8')]?this[_0x764447('0x1cb')]():_0x20fe3e['SkillsStatesCore'][_0x764447('0x261')]['call'](this);}}}}}},VisuMZ[_0x413554('0x1ea')]['Window_StatusBase_drawActorIcons']=Window_StatusBase['prototype'][_0x413554('0x70')],Window_StatusBase['prototype'][_0x413554('0x70')]=function(_0x1424d5,_0x177f1a,_0x2122a8,_0x44de9f){const _0x29bde2=_0x413554;if(!_0x1424d5)return;Window_Base[_0x29bde2('0x130')][_0x29bde2('0x70')]['call'](this,_0x1424d5,_0x177f1a,_0x2122a8,_0x44de9f);},VisuMZ[_0x413554('0x1ea')][_0x413554('0x10b')]=Window_SkillType[_0x413554('0x130')][_0x413554('0x29a')],Window_SkillType[_0x413554('0x130')][_0x413554('0x29a')]=function(_0x5b47df){const _0x3eb34f=_0x413554;VisuMZ['SkillsStatesCore'][_0x3eb34f('0x10b')][_0x3eb34f('0x24d')](this,_0x5b47df),this[_0x3eb34f('0x1e9')](_0x5b47df);},Window_SkillType[_0x413554('0x130')][_0x413554('0x1e9')]=function(_0x15addf){const _0x714ec7=_0x413554,_0x35c22e=new Rectangle(0x0,0x0,_0x15addf['width'],_0x15addf[_0x714ec7('0x19a')]);this['_commandNameWindow']=new Window_Base(_0x35c22e),this[_0x714ec7('0x152')][_0x714ec7('0xe1')]=0x0,this['addChild'](this[_0x714ec7('0x152')]),this[_0x714ec7('0x99')]();},Window_SkillType[_0x413554('0x130')]['callUpdateHelp']=function(){const _0x4cd02f=_0x413554;Window_Command[_0x4cd02f('0x130')]['callUpdateHelp'][_0x4cd02f('0x24d')](this);if(this['_commandNameWindow'])this[_0x4cd02f('0x99')]();},Window_SkillType[_0x413554('0x130')][_0x413554('0x99')]=function(){const _0x2058c0=_0x413554,_0x4e9bc6=this[_0x2058c0('0x152')];_0x4e9bc6['contents'][_0x2058c0('0x23')]();const _0x26df4e=this[_0x2058c0('0x71')](this[_0x2058c0('0x1a8')]());if(_0x26df4e===_0x2058c0('0x23a')&&this['maxItems']()>0x0){const _0x272665=this[_0x2058c0('0x140')](this[_0x2058c0('0x1a8')]());let _0x2418a4=this[_0x2058c0('0xf3')](this['index']());_0x2418a4=_0x2418a4[_0x2058c0('0x1a0')](/\\I\[(\d+)\]/gi,''),_0x4e9bc6[_0x2058c0('0x7d')](),this['commandNameWindowDrawBackground'](_0x2418a4,_0x272665),this[_0x2058c0('0x12c')](_0x2418a4,_0x272665),this['commandNameWindowCenter'](_0x2418a4,_0x272665);}},Window_SkillType[_0x413554('0x130')]['commandNameWindowDrawBackground']=function(_0x42c1be,_0x1f72d3){},Window_SkillType[_0x413554('0x130')][_0x413554('0x12c')]=function(_0x462413,_0x41f501){const _0x569c5b=_0x413554,_0x3c3c9e=this[_0x569c5b('0x152')];_0x3c3c9e[_0x569c5b('0x187')](_0x462413,0x0,_0x41f501['y'],_0x3c3c9e['innerWidth'],_0x569c5b('0x217'));},Window_SkillType[_0x413554('0x130')][_0x413554('0x37')]=function(_0x44741c,_0x488d70){const _0x40929f=_0x413554,_0x339170=this[_0x40929f('0x152')],_0x34c0af=$gameSystem[_0x40929f('0x232')](),_0x20da4c=_0x488d70['x']+Math[_0x40929f('0x14b')](_0x488d70[_0x40929f('0x229')]/0x2)+_0x34c0af;_0x339170['x']=_0x339170[_0x40929f('0x229')]/-0x2+_0x20da4c,_0x339170['y']=Math[_0x40929f('0x14b')](_0x488d70[_0x40929f('0x19a')]/0x2);},Window_SkillType[_0x413554('0x130')][_0x413554('0x26d')]=function(){const _0x17b4c9=_0x413554;return Imported[_0x17b4c9('0x19b')]&&Window_Command['prototype'][_0x17b4c9('0x26d')][_0x17b4c9('0x24d')](this);},Window_SkillType[_0x413554('0x130')][_0x413554('0x61')]=function(){const _0x432895=_0x413554;if(!this[_0x432895('0x18f')])return;const _0x59875e=this[_0x432895('0x18f')][_0x432895('0x26')]();for(const _0x3cdb5c of _0x59875e){const _0x5e35c7=this[_0x432895('0x162')](_0x3cdb5c);this[_0x432895('0x205')](_0x5e35c7,_0x432895('0x78'),!![],_0x3cdb5c);}},Window_SkillType[_0x413554('0x130')][_0x413554('0x162')]=function(_0x5e96bb){const _0x39d2f3=_0x413554;let _0x1a007b=$dataSystem[_0x39d2f3('0x26')][_0x5e96bb];if(_0x1a007b[_0x39d2f3('0x56')](/\\I\[(\d+)\]/i))return _0x1a007b;if(this['commandStyle']()===_0x39d2f3('0x160'))return _0x1a007b;const _0x426f67=VisuMZ['SkillsStatesCore']['Settings'][_0x39d2f3('0xaa')],_0x5b6996=$dataSystem[_0x39d2f3('0xf4')][_0x39d2f3('0x14')](_0x5e96bb),_0x5e98fa=_0x5b6996?_0x426f67[_0x39d2f3('0x18e')]:_0x426f67[_0x39d2f3('0x248')];return'\x5cI[%1]%2'[_0x39d2f3('0x1f5')](_0x5e98fa,_0x1a007b);},Window_SkillType['prototype'][_0x413554('0x27c')]=function(){const _0x582ffd=_0x413554;return VisuMZ[_0x582ffd('0x1ea')]['Settings']['Skills']['CmdTextAlign'];},Window_SkillType[_0x413554('0x130')][_0x413554('0x12a')]=function(_0x1224bc){const _0x5317cf=_0x413554,_0x5bc07d=this[_0x5317cf('0x71')](_0x1224bc);if(_0x5bc07d==='iconText'){if(_0x5317cf('0x58')!==_0x5317cf('0x175'))this[_0x5317cf('0xca')](_0x1224bc);else{function _0x343a74(){const _0x3e8c03=_0x5317cf;_0x1c8525[_0x3e8c03('0x1ea')]['Game_Battler_addState'][_0x3e8c03('0x24d')](this,_0x4edc02);if(this['hasState'](_0x472966[_0x4f048c])){this[_0x3e8c03('0x191')](_0x43a7af);;}}}}else{if(_0x5bc07d==='icon'){if(_0x5317cf('0x153')!==_0x5317cf('0x153')){function _0x391422(){const _0x56d17b=_0x5317cf,_0x1406fc=_0x3649b9['parse']('['+_0x4ec7c4['$1'][_0x56d17b('0x56')](/\d+/g)+']');for(const _0xcb5e7a of _0x1406fc){if(!this[_0x56d17b('0x18f')][_0x56d17b('0x271')](_0xcb5e7a))return!![];}return![];}}else this[_0x5317cf('0x117')](_0x1224bc);}else{if(_0x5317cf('0x44')!==_0x5317cf('0x85'))Window_Command['prototype'][_0x5317cf('0x12a')][_0x5317cf('0x24d')](this,_0x1224bc);else{function _0x5b1b74(){const _0xa49e10=_0x5317cf,_0x426eac=_0x3dec22['parse']('['+_0x51c60f['$1'][_0xa49e10('0x56')](/\d+/g)+']');for(const _0x5c47e5 of _0x426eac){if(!this['_actor'][_0xa49e10('0x255')](_0x5c47e5))return!![];}return![];}}}}},Window_SkillType[_0x413554('0x130')][_0x413554('0xd1')]=function(){const _0x6de306=_0x413554;return VisuMZ[_0x6de306('0x1ea')]['Settings']['Skills'][_0x6de306('0x164')];},Window_SkillType[_0x413554('0x130')]['commandStyleCheck']=function(_0x58cee6){const _0x15dcf8=_0x413554;if(_0x58cee6<0x0)return _0x15dcf8('0x160');const _0x124b81=this['commandStyle']();if(_0x124b81!==_0x15dcf8('0x76'))return _0x124b81;else{if(this[_0x15dcf8('0x16d')]()>0x0){const _0x16c6a1=this[_0x15dcf8('0xf3')](_0x58cee6);if(_0x16c6a1['match'](/\\I\[(\d+)\]/i)){const _0x7b1430=this[_0x15dcf8('0x140')](_0x58cee6),_0x3c35cb=this[_0x15dcf8('0x21f')](_0x16c6a1)['width'];return _0x3c35cb<=_0x7b1430[_0x15dcf8('0x229')]?_0x15dcf8('0x25a'):_0x15dcf8('0x23a');}}}return _0x15dcf8('0x160');},Window_SkillType[_0x413554('0x130')][_0x413554('0xca')]=function(_0x4798f4){const _0x50a992=_0x413554,_0x55bfca=this[_0x50a992('0x140')](_0x4798f4),_0x57fe95=this[_0x50a992('0xf3')](_0x4798f4),_0x31d227=this[_0x50a992('0x21f')](_0x57fe95)[_0x50a992('0x229')];this[_0x50a992('0x184')](this[_0x50a992('0xc2')](_0x4798f4));const _0x3dee41=this['itemTextAlign']();if(_0x3dee41===_0x50a992('0xad')){if(_0x50a992('0xe5')!==_0x50a992('0x15f'))this[_0x50a992('0x5a')](_0x57fe95,_0x55bfca['x']+_0x55bfca[_0x50a992('0x229')]-_0x31d227,_0x55bfca['y'],_0x31d227);else{function _0x446fcb(){const _0x420396=_0x50a992;this[_0x420396('0x7d')]();const _0x43efc7=_0x35eea9[_0x407ffd];if(_0x43efc7)!_0x54ecb9[_0x420396('0x14')](_0x43efc7)&&this[_0x420396('0x266')](_0x323b51,_0x43efc7,_0x1ac3be,_0x1c2bcd),this[_0x420396('0x188')](_0x312c2f,_0x43efc7,_0x3055c3,_0x5d3e8c),_0x5d1a6f[_0x420396('0x2a8')](_0x43efc7);else{const _0x37a1e0=_0x1a9931[_0x430782-_0x31f442[_0x420396('0x86')]];this['drawActorBuffTurns'](_0x59923b,_0x37a1e0,_0x1438d8,_0x67919),this['drawActorBuffRates'](_0x3ccf47,_0x37a1e0,_0x53a6dc,_0x1b6ffa);}_0x3a384b+=_0xffae7d;}}}else{if(_0x3dee41===_0x50a992('0x217')){const _0x5c2367=_0x55bfca['x']+Math[_0x50a992('0x14b')]((_0x55bfca[_0x50a992('0x229')]-_0x31d227)/0x2);this['drawTextEx'](_0x57fe95,_0x5c2367,_0x55bfca['y'],_0x31d227);}else this[_0x50a992('0x5a')](_0x57fe95,_0x55bfca['x'],_0x55bfca['y'],_0x31d227);}},Window_SkillType['prototype']['drawItemStyleIcon']=function(_0x5d079d){const _0x48f81d=_0x413554;this[_0x48f81d('0xf3')](_0x5d079d)[_0x48f81d('0x56')](/\\I\[(\d+)\]/i);const _0x32e68f=Number(RegExp['$1'])||0x0,_0x478799=this['itemLineRect'](_0x5d079d),_0x2f1705=_0x478799['x']+Math['floor']((_0x478799[_0x48f81d('0x229')]-ImageManager[_0x48f81d('0x245')])/0x2),_0x4e0d5c=_0x478799['y']+(_0x478799[_0x48f81d('0x19a')]-ImageManager[_0x48f81d('0x8f')])/0x2;this[_0x48f81d('0x287')](_0x32e68f,_0x2f1705,_0x4e0d5c);},VisuMZ[_0x413554('0x1ea')][_0x413554('0x146')]=Window_SkillStatus['prototype'][_0x413554('0xc8')],Window_SkillStatus['prototype'][_0x413554('0xc8')]=function(){const _0x165786=_0x413554;VisuMZ['SkillsStatesCore'][_0x165786('0x146')][_0x165786('0x24d')](this);if(this['_actor'])this[_0x165786('0x16e')]();},Window_SkillStatus['prototype'][_0x413554('0x16e')]=function(){const _0x1d8d56=_0x413554;if(!Imported[_0x1d8d56('0x19b')])return;if(!Imported[_0x1d8d56('0x84')])return;const _0x39d613=this[_0x1d8d56('0x1db')]();let _0x39b588=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x4468c5=this[_0x1d8d56('0x260')]-_0x39b588-0x2;if(_0x4468c5>=0x12c){const _0xeee2fe=VisuMZ[_0x1d8d56('0x275')]['Settings']['Param']['DisplayedParams'],_0x959db1=Math[_0x1d8d56('0x14b')](_0x4468c5/0x2)-0x18;let _0x27fb69=_0x39b588,_0x486a69=Math[_0x1d8d56('0x14b')]((this[_0x1d8d56('0x282')]-Math[_0x1d8d56('0xef')](_0xeee2fe['length']/0x2)*_0x39d613)/0x2),_0x656eac=0x0;for(const _0xeaa2db of _0xeee2fe){this[_0x1d8d56('0x157')](_0x27fb69,_0x486a69,_0x959db1,_0xeaa2db),_0x656eac++;if(_0x656eac%0x2===0x0)_0x27fb69=_0x39b588,_0x486a69+=_0x39d613;else{if(_0x1d8d56('0x59')===_0x1d8d56('0x1')){function _0x47f5af(){const _0xa4ffda=_0x1d8d56;this[_0xa4ffda('0xfe')](_0x4e589c['id']),this[_0xa4ffda('0x28')](_0x2b6c70['id']),this[_0xa4ffda('0x5f')](_0x347af0['id']);}}else _0x27fb69+=_0x959db1+0x18;}}}this[_0x1d8d56('0x7d')]();},Window_SkillStatus[_0x413554('0x130')][_0x413554('0x157')]=function(_0x487620,_0xfbf95a,_0x5794ee,_0x5ea3c8){const _0x2a371a=_0x413554,_0x50354d=this[_0x2a371a('0x1db')]();this[_0x2a371a('0x7d')](),this[_0x2a371a('0x3d')](_0x487620,_0xfbf95a,_0x5794ee,_0x5ea3c8,!![]),this[_0x2a371a('0x291')](),this[_0x2a371a('0x3c')][_0x2a371a('0x17a')]-=0x8;const _0x124647=this['_actor']['paramValueByName'](_0x5ea3c8,!![]);this[_0x2a371a('0x3c')]['drawText'](_0x124647,_0x487620,_0xfbf95a,_0x5794ee,_0x50354d,_0x2a371a('0xad'));},VisuMZ[_0x413554('0x1ea')][_0x413554('0x41')]=Window_SkillList[_0x413554('0x130')]['includes'],Window_SkillList[_0x413554('0x130')][_0x413554('0x14')]=function(_0x3a7ec6){const _0x4f93ea=_0x413554;return this[_0x4f93ea('0x109')](_0x3a7ec6);},VisuMZ[_0x413554('0x1ea')][_0x413554('0xed')]=Window_SkillList[_0x413554('0x130')][_0x413554('0x108')],Window_SkillList[_0x413554('0x130')][_0x413554('0x108')]=function(){const _0x381271=_0x413554;return SceneManager[_0x381271('0x258')][_0x381271('0x3e')]===Scene_Battle?VisuMZ[_0x381271('0x1ea')][_0x381271('0xed')]['call'](this):VisuMZ[_0x381271('0x1ea')][_0x381271('0x19d')][_0x381271('0xaa')][_0x381271('0xec')];},VisuMZ[_0x413554('0x1ea')][_0x413554('0x1a2')]=Window_SkillList[_0x413554('0x130')][_0x413554('0x242')],Window_SkillList[_0x413554('0x130')][_0x413554('0x242')]=function(_0x154f78){const _0xa5dce2=_0x413554,_0x45d186=this[_0xa5dce2('0x18f')]!==_0x154f78;VisuMZ[_0xa5dce2('0x1ea')][_0xa5dce2('0x1a2')][_0xa5dce2('0x24d')](this,_0x154f78),_0x45d186&&(this[_0xa5dce2('0x132')]&&this[_0xa5dce2('0x132')][_0xa5dce2('0x3e')]===Window_ShopStatus&&this['_statusWindow'][_0xa5dce2('0x1bd')](this[_0xa5dce2('0x12f')](0x0)));},Window_SkillList['prototype'][_0x413554('0x230')]=function(_0x544954){const _0x20d3b0=_0x413554;if(this[_0x20d3b0('0xf')]===_0x544954)return;this['_stypeId']=_0x544954,this[_0x20d3b0('0xc8')](),this[_0x20d3b0('0x254')](0x0,0x0);if(this['_statusWindow']&&this['_statusWindow'][_0x20d3b0('0x3e')]===Window_ShopStatus){if('ODtiX'===_0x20d3b0('0x121')){function _0xb8d48b(){const _0x2961c1=_0x20d3b0,_0x52653e=this[_0x2961c1('0x71')](_0x415c04);if(_0x52653e==='iconText')this[_0x2961c1('0xca')](_0x3b91d2);else _0x52653e===_0x2961c1('0x23a')?this[_0x2961c1('0x117')](_0x239ead):_0x83bfe[_0x2961c1('0x130')][_0x2961c1('0x12a')][_0x2961c1('0x24d')](this,_0x16c5c7);}}else this[_0x20d3b0('0x132')][_0x20d3b0('0x1bd')](this['itemAt'](0x0));}},Window_SkillList[_0x413554('0x130')][_0x413554('0x109')]=function(_0x1fc859){const _0x2ec23f=_0x413554;if(!_0x1fc859)return VisuMZ[_0x2ec23f('0x1ea')][_0x2ec23f('0x41')][_0x2ec23f('0x24d')](this,_0x1fc859);if(!this['checkSkillTypeMatch'](_0x1fc859))return![];if(!this[_0x2ec23f('0x233')](_0x1fc859))return![];if(!this[_0x2ec23f('0x1c1')](_0x1fc859))return![];return!![];},Window_SkillList[_0x413554('0x130')][_0x413554('0x10f')]=function(_0x451b8a){const _0x352b80=_0x413554;return DataManager['getSkillTypes'](_0x451b8a)[_0x352b80('0x14')](this[_0x352b80('0xf')]);},Window_SkillList['prototype'][_0x413554('0x233')]=function(_0x3ec1cd){const _0x4b4927=_0x413554;if(!this['checkShowHideBattleNotetags'](_0x3ec1cd))return![];if(!this[_0x4b4927('0x36')](_0x3ec1cd))return![];if(!this[_0x4b4927('0x273')](_0x3ec1cd))return![];return!![];},Window_SkillList[_0x413554('0x130')][_0x413554('0x12d')]=function(_0x1af50d){const _0x1ca7ea=_0x413554,_0x3e8594=_0x1af50d[_0x1ca7ea('0x19c')];if(_0x3e8594[_0x1ca7ea('0x56')](/<HIDE IN BATTLE>/i)&&$gameParty[_0x1ca7ea('0x1b1')]())return![];else{if(_0x3e8594[_0x1ca7ea('0x56')](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x1ca7ea('0x1b1')]()){if(_0x1ca7ea('0x29d')!==_0x1ca7ea('0x29d')){function _0x3313ae(){const _0x5b5161=_0x1ca7ea;_0x557d2b[_0x5b5161('0x130')]['callUpdateHelp']['call'](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();}}else return![];}else return!![];}},Window_SkillList[_0x413554('0x130')][_0x413554('0x36')]=function(_0x1701b0){const _0x42a564=_0x413554,_0x3a8f30=_0x1701b0[_0x42a564('0x19c')];if(_0x3a8f30[_0x42a564('0x56')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x42a564('0x252')===_0x42a564('0x183')){function _0x29f85c(){const _0xa489b=_0x42a564;this[_0xa489b('0x247')](_0x55695a['id'])&&_0x2a4ea7['autoRemovalTiming']===_0x5a9aae&&(this[_0xa489b('0xfe')](_0x2c98ea['id']),this[_0xa489b('0x28')](_0x316910['id']),this[_0xa489b('0x5f')](_0x4d0475['id']));}}else{const _0x3f40a5=JSON[_0x42a564('0x1b4')]('['+RegExp['$1'][_0x42a564('0x56')](/\d+/g)+']');for(const _0xadd3cc of _0x3f40a5){if(_0x42a564('0x2b4')!==_0x42a564('0x2b4')){function _0x4e3939(){const _0x1199c0=_0x42a564;this[_0x1199c0('0x3c')][_0x1199c0('0x267')]=_0x2cfbda['mainFontFace'](),this[_0x1199c0('0x3c')][_0x1199c0('0x17a')]=_0x1f866a['mainFontSize'](),this[_0x1199c0('0x291')]();}}else{if(!$gameSwitches[_0x42a564('0x27e')](_0xadd3cc))return![];}}return!![];}}if(_0x3a8f30['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1259b6=JSON['parse']('['+RegExp['$1'][_0x42a564('0x56')](/\d+/g)+']');for(const _0x526e90 of _0x1259b6){if(_0x42a564('0x2a6')!=='jOrwJ'){if(!$gameSwitches[_0x42a564('0x27e')](_0x526e90))return![];}else{function _0x18aafb(){const _0x5dc690=_0x42a564,_0x28c12e=this[_0x5dc690('0x140')](_0x3ab98c),_0x35ce10=this[_0x5dc690('0xf3')](_0x352059),_0x58eab2=this[_0x5dc690('0x21f')](_0x35ce10)[_0x5dc690('0x229')];this[_0x5dc690('0x184')](this[_0x5dc690('0xc2')](_0x3b9cea));const _0x448364=this[_0x5dc690('0x27c')]();if(_0x448364===_0x5dc690('0xad'))this[_0x5dc690('0x5a')](_0x35ce10,_0x28c12e['x']+_0x28c12e['width']-_0x58eab2,_0x28c12e['y'],_0x58eab2);else{if(_0x448364===_0x5dc690('0x217')){const _0x3290ab=_0x28c12e['x']+_0x5b763a['floor']((_0x28c12e[_0x5dc690('0x229')]-_0x58eab2)/0x2);this['drawTextEx'](_0x35ce10,_0x3290ab,_0x28c12e['y'],_0x58eab2);}else this[_0x5dc690('0x5a')](_0x35ce10,_0x28c12e['x'],_0x28c12e['y'],_0x58eab2);}}}}return!![];}if(_0x3a8f30[_0x42a564('0x56')](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2aaec2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1806c5 of _0x2aaec2){if(_0x42a564('0x8b')===_0x42a564('0x8b')){if($gameSwitches[_0x42a564('0x27e')](_0x1806c5))return!![];}else{function _0x2e66d3(){const _0x4405bc=_0x42a564;if(_0x167fd1['length']>0x0)_0x4f80e4+=this[_0x4405bc('0x278')]();_0x1dcdf9+=_0x205de0(_0x32b8ef['$1']);}}}return![];}if(_0x3a8f30['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3574e9=JSON[_0x42a564('0x1b4')]('['+RegExp['$1'][_0x42a564('0x56')](/\d+/g)+']');for(const _0x27133f of _0x3574e9){if(!$gameSwitches[_0x42a564('0x27e')](_0x27133f))return!![];}return![];}if(_0x3a8f30[_0x42a564('0x56')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x57e34a=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xf8ddca of _0x57e34a){if(!$gameSwitches[_0x42a564('0x27e')](_0xf8ddca))return!![];}return![];}if(_0x3a8f30[_0x42a564('0x56')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x42a564('0x23d')!==_0x42a564('0x228')){const _0x191cfc=JSON[_0x42a564('0x1b4')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x426486 of _0x191cfc){if($gameSwitches[_0x42a564('0x27e')](_0x426486))return![];}return!![];}else{function _0x14611f(){return'iconText';}}}return!![];},Window_SkillList[_0x413554('0x130')][_0x413554('0x273')]=function(_0x16e131){const _0x5de838=_0x413554,_0x29e9f7=_0x16e131[_0x5de838('0x19c')];if(_0x29e9f7['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('lGnIQ'!==_0x5de838('0x129')){function _0x3a872c(){const _0x5af942=_0x5de838;if(this['isBuffAffected'](_0x7ca110)){const _0x186fa3=_0xcd9283[_0x5af942('0x1ea')][_0x5af942('0x19d')]['Buffs'][_0x5af942('0xd7')];this[_0x5af942('0x19')][_0x202b4]=_0xc1c4c3[_0x5af942('0x29b')](0x0,_0x186fa3);}}}else{const _0x36df6d=JSON['parse']('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x5b433d of _0x36df6d){if(!this[_0x5de838('0x18f')][_0x5de838('0x271')](_0x5b433d))return![];}return!![];}}else{if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5d9e66=RegExp['$1']['split'](',');for(const _0x93de46 of _0x5d9e66){const _0x59b877=DataManager[_0x5de838('0x119')](_0x59b877);if(!_0x59b877)continue;if(!this['_actor']['isLearnedSkill'](_0x59b877))return![];}return!![];}}if(_0x29e9f7['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x501ede=JSON[_0x5de838('0x1b4')]('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x2ffcf4 of _0x501ede){if(!this['_actor'][_0x5de838('0x271')](_0x2ffcf4))return![];}return!![];}else{if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x5de838('0x94')!==_0x5de838('0x199')){const _0x29d086=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x2c3e53 of _0x29d086){if(_0x5de838('0x139')!=='TxAOk'){const _0x2e4ab5=DataManager[_0x5de838('0x119')](_0x2e4ab5);if(!_0x2e4ab5)continue;if(!this['_actor']['isLearnedSkill'](_0x2e4ab5))return![];}else{function _0x166990(){const _0x4283d2=_0x5de838;this[_0x4283d2('0x102')]=_0x57c61a[_0x4283d2('0x1ef')];}}}return!![];}else{function _0x4b3d31(){const _0x3c8a12=_0x5de838;if(_0x2fed9d[_0x3c8a12('0x27e')](_0x3381fe))return![];}}}}if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ctfoJ'===_0x5de838('0x264')){const _0x46628e=JSON['parse']('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x2f7692 of _0x46628e){if(this['_actor'][_0x5de838('0x271')](_0x2f7692))return!![];}return![];}else{function _0x24a8ef(){const _0x3fc571=_0x5de838;if(!this[_0x3fc571('0x12d')](_0x5c71ae))return![];if(!this[_0x3fc571('0x36')](_0x2776ee))return![];if(!this[_0x3fc571('0x273')](_0x4b9b3a))return![];return!![];}}}else{if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('TPHuo'!==_0x5de838('0x1bf')){const _0x57862b=RegExp['$1']['split'](',');for(const _0x46d7cf of _0x57862b){const _0x2c79db=DataManager[_0x5de838('0x119')](_0x2c79db);if(!_0x2c79db)continue;if(this[_0x5de838('0x18f')][_0x5de838('0x271')](_0x2c79db))return!![];}return![];}else{function _0x39482f(){const _0x37c204=_0x5de838;this[_0x37c204('0x132')]=_0x333776,this[_0x37c204('0x14a')]();}}}}if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x52d0c0=JSON['parse']('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x4f0099 of _0x52d0c0){if(!this['_actor'][_0x5de838('0x271')](_0x4f0099))return!![];}return![];}else{if(_0x29e9f7['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('acTdR'!==_0x5de838('0x131')){function _0x50530e(){const _0x3d77d6=_0x5de838;this[_0x3d77d6('0x132')]['setItem'](this['itemAt'](0x0));}}else{const _0x2dc2cd=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x4b0ed3 of _0x2dc2cd){const _0x24f69e=DataManager[_0x5de838('0x119')](_0x24f69e);if(!_0x24f69e)continue;if(!this[_0x5de838('0x18f')]['isLearnedSkill'](_0x24f69e))return!![];}return![];}}}if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5de838('0xa3')==='rmDOj'){function _0x640e30(){const _0x273234=_0x5de838,_0x1e5619=_0x4a8964(_0x57de60['$1']),_0x48ec71='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x273234('0x1f5')](_0x1e5619);_0x50c26d[_0x273234('0x1ea')][_0x273234('0x5e')][_0x3034f6['id']]=new _0x2f56e0('skill',_0x48ec71);}}else{const _0x13e61c=JSON[_0x5de838('0x1b4')]('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x3eda5e of _0x13e61c){if(!this[_0x5de838('0x18f')][_0x5de838('0x271')](_0x3eda5e))return!![];}return![];}}else{if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x250c29=RegExp['$1']['split'](',');for(const _0x47bc16 of _0x250c29){if('GuoTD'!==_0x5de838('0x276')){const _0x40e4b1=DataManager[_0x5de838('0x119')](_0x40e4b1);if(!_0x40e4b1)continue;if(!this[_0x5de838('0x18f')]['isLearnedSkill'](_0x40e4b1))return!![];}else{function _0x406f8e(){this['drawItemStyleIcon'](_0x271a24);}}}return![];}}if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b2dcc=JSON[_0x5de838('0x1b4')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2b372f of _0x1b2dcc){if(this[_0x5de838('0x18f')][_0x5de838('0x271')](_0x2b372f))return![];}return!![];}else{if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x5de838('0x269')!==_0x5de838('0x269')){function _0x8bd2e0(){const _0x24573b=_0x5de838,_0xbdc174=_0x56702e[_0x24573b('0x1b4')]('['+_0x406880['$1'][_0x24573b('0x56')](/\d+/g)+']');for(const _0x521b57 of _0xbdc174){if(!this[_0x24573b('0x18f')][_0x24573b('0x271')](_0x521b57))return![];}return!![];}}else{const _0x572064=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x141602 of _0x572064){if(_0x5de838('0x16')!=='FoGvp'){const _0x3ff391=DataManager['getSkillIdWithName'](_0x3ff391);if(!_0x3ff391)continue;if(this[_0x5de838('0x18f')]['isLearnedSkill'](_0x3ff391))return![];}else{function _0x31dbd4(){const _0x2b5380=_0x5de838;return this[_0x2b5380('0x186')]();}}}return!![];}}}if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x278ea5=JSON[_0x5de838('0x1b4')]('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0xfd1697 of _0x278ea5){if(!this[_0x5de838('0x18f')]['hasSkill'](_0xfd1697))return![];}return!![];}else{if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2e02ec=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x351bd8 of _0x2e02ec){const _0xa62930=DataManager[_0x5de838('0x119')](_0xa62930);if(!_0xa62930)continue;if(!this['_actor'][_0x5de838('0x255')](_0xa62930))return![];}return!![];}}if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5de838('0x194')!=='cRqXT'){const _0x1b5245=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x16786a of _0x1b5245){if(!this[_0x5de838('0x18f')][_0x5de838('0x255')](_0x16786a))return![];}return!![];}else{function _0x257052(){const _0x5e60ed=_0x5de838;_0x3d6ca3['SkillsStatesCore'][_0x5e60ed('0x19d')][_0x5e60ed('0x1dc')][_0x5e60ed('0x18a')][_0x5e60ed('0x24d')](this,_0x2c2286,_0xe7ecff);}}}else{if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x5de838('0x1b')!=='mWAsC'){function _0x3c6ce7(){const _0x36e2bc=_0x562b43['parse']('['+_0x309b7d['$1']['match'](/\d+/g)+']');for(const _0x2ee971 of _0x36e2bc){if(_0x1b5d47['value'](_0x2ee971))return![];}return!![];}}else{const _0x2ae520=RegExp['$1']['split'](',');for(const _0x355e32 of _0x2ae520){const _0x48dad0=DataManager[_0x5de838('0x119')](_0x48dad0);if(!_0x48dad0)continue;if(!this[_0x5de838('0x18f')][_0x5de838('0x255')](_0x48dad0))return![];}return!![];}}}if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x264c22=JSON[_0x5de838('0x1b4')]('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x55796d of _0x264c22){if(_0x5de838('0x1e1')!==_0x5de838('0x9d')){if(this[_0x5de838('0x18f')]['hasSkill'](_0x55796d))return!![];}else{function _0x3469f(){const _0x2ff2e5=_0x5de838;_0x48536b['SkillsStatesCore'][_0x2ff2e5('0xce')][_0x2ff2e5('0x24d')](this,_0xf7f26f),this[_0x2ff2e5('0x57')]={};}}}return![];}else{if(_0x29e9f7[_0x5de838('0x56')](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x5de838('0x1ae')!==_0x5de838('0x1ae')){function _0x1d7ec7(){const _0x3a5dcd=_0x5de838;if(!_0x133789['SkillsStatesCore']['Settings'][_0x3a5dcd('0x4')]['ShowTurns'])return;if(!_0x5d37f9[_0x3a5dcd('0x40')](_0x577b89['id']))return;if(_0x3234d8['autoRemovalTiming']===0x0)return;if(_0x1b9fac[_0x3a5dcd('0x19c')][_0x3a5dcd('0x56')](/<HIDE STATE TURNS>/i))return;const _0x1d92a6=_0x1293d3[_0x3a5dcd('0x208')](_0x59f37d['id']),_0x33319d=_0x16ad73[_0x3a5dcd('0x245')],_0x49f776=_0x16ab7b[_0x3a5dcd('0xdb')](_0x347955);this[_0x3a5dcd('0x174')](_0x49f776),this[_0x3a5dcd('0x12')]('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x3a5dcd('0x1eb')]=!![],this['contents'][_0x3a5dcd('0x17a')]=_0x2d74e3[_0x3a5dcd('0x1ea')][_0x3a5dcd('0x19d')][_0x3a5dcd('0x4')][_0x3a5dcd('0x24')],_0x2d0f67+=_0x8d39b['SkillsStatesCore'][_0x3a5dcd('0x19d')][_0x3a5dcd('0x4')][_0x3a5dcd('0x11d')],_0x2145ae+=_0x38c3a1[_0x3a5dcd('0x1ea')][_0x3a5dcd('0x19d')]['States'][_0x3a5dcd('0x135')],this['drawText'](_0x1d92a6,_0x155bf8,_0x4b068c,_0x33319d,_0x3a5dcd('0xad')),this['contents'][_0x3a5dcd('0x1eb')]=![],this['resetFontSettings']();}}else{const _0x5473ac=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x256928 of _0x5473ac){const _0x126f68=DataManager[_0x5de838('0x119')](_0x126f68);if(!_0x126f68)continue;if(this[_0x5de838('0x18f')]['hasSkill'](_0x126f68))return!![];}return![];}}}if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f1e36=JSON[_0x5de838('0x1b4')]('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x421635 of _0x3f1e36){if(!this[_0x5de838('0x18f')][_0x5de838('0x255')](_0x421635))return!![];}return![];}else{if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x5de838('0x296')!==_0x5de838('0xe3')){const _0x557c23=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x13a10c of _0x557c23){if('SNSig'==='SNSig'){const _0x37f7b7=DataManager[_0x5de838('0x119')](_0x37f7b7);if(!_0x37f7b7)continue;if(!this[_0x5de838('0x18f')][_0x5de838('0x255')](_0x37f7b7))return!![];}else{function _0x222963(){const _0x37275d=_0x5de838;if(_0x32b398['VisuMZ_1_ElementStatusCore'])this[_0x37275d('0x4e')]();}}}return![];}else{function _0x2296c8(){const _0x1d0e14=_0x5de838;if(_0x36845a['Name']['toUpperCase']()==='TP')return _0x547041[_0x1d0e14('0x288')]['call'](this,_0x58f63b);}}}}if(_0x29e9f7['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x107162=JSON['parse']('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x2bfd9f of _0x107162){if(!this[_0x5de838('0x18f')][_0x5de838('0x255')](_0x2bfd9f))return!![];}return![];}else{if(_0x29e9f7['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4b83dc=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x4f701d of _0x4b83dc){if(_0x5de838('0x1ac')==='xtbSr'){const _0x381aa7=DataManager['getSkillIdWithName'](_0x381aa7);if(!_0x381aa7)continue;if(!this[_0x5de838('0x18f')][_0x5de838('0x255')](_0x381aa7))return!![];}else{function _0x119a4a(){const _0x395776=_0x5de838,_0x5d7f57=this[_0x395776('0x152')];_0x5d7f57[_0x395776('0x187')](_0x7aa48f,0x0,_0x15167c['y'],_0x5d7f57['innerWidth'],_0x395776('0x217'));}}}return![];}}if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c3157=JSON[_0x5de838('0x1b4')]('['+RegExp['$1'][_0x5de838('0x56')](/\d+/g)+']');for(const _0x3e2309 of _0x3c3157){if(_0x5de838('0x257')===_0x5de838('0x213')){function _0x1e8d91(){const _0x204525=_0x5de838,_0x42a558=_0x4b7037['SkillsStatesCore'][_0x204525('0x9')];if(_0x42a558[_0x1dc623])_0x42a558[_0xaa2dc2][_0x204525('0x24d')](this,_0x23626f);}}else{if(this['_actor']['hasSkill'](_0x3e2309))return![];}}return!![];}else{if(_0x29e9f7[_0x5de838('0x56')](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x212df9=RegExp['$1'][_0x5de838('0x24f')](',');for(const _0x52bda6 of _0x212df9){const _0x5db075=DataManager[_0x5de838('0x119')](_0x5db075);if(!_0x5db075)continue;if(this['_actor']['hasSkill'](_0x5db075))return![];}return!![];}}return!![];},Window_SkillList[_0x413554('0x130')]['checkShowHideJS']=function(_0x279e85){const _0x286a75=_0x413554,_0xb242bb=_0x279e85['note'],_0x374253=VisuMZ[_0x286a75('0x1ea')][_0x286a75('0x5e')];if(_0x374253[_0x279e85['id']]){if(_0x286a75('0x6d')!==_0x286a75('0x15'))return _0x374253[_0x279e85['id']][_0x286a75('0x24d')](this,_0x279e85);else{function _0x3a4ac9(){const _0x136673=_0x286a75,_0x17f461=_0x48652b[_0x136673('0x1b4')]('['+_0x5370e2['$1'][_0x136673('0x56')](/\d+/g)+']');for(const _0x27e98e of _0x17f461){if(!_0x4bd346[_0x136673('0x27e')](_0x27e98e))return![];}return!![];}}}else return!![];},Window_SkillList[_0x413554('0x130')][_0x413554('0x2a7')]=function(_0x316a98,_0x3215b0,_0x5c32cb,_0x40b9f6){const _0x59ee59=_0x413554;Window_Base[_0x59ee59('0x130')][_0x59ee59('0x2a7')]['call'](this,this[_0x59ee59('0x18f')],_0x316a98,_0x3215b0,_0x5c32cb,_0x40b9f6);},Window_SkillList['prototype'][_0x413554('0xd8')]=function(_0x24bc2e){const _0x16ce94=_0x413554;this['_statusWindow']=_0x24bc2e,this[_0x16ce94('0x14a')]();},VisuMZ[_0x413554('0x1ea')]['Window_SkillList_updateHelp']=Window_SkillList[_0x413554('0x130')][_0x413554('0x281')],Window_SkillList[_0x413554('0x130')][_0x413554('0x281')]=function(){const _0x1a3a93=_0x413554;VisuMZ[_0x1a3a93('0x1ea')]['Window_SkillList_updateHelp']['call'](this),this[_0x1a3a93('0x132')]&&this['_statusWindow'][_0x1a3a93('0x3e')]===Window_ShopStatus&&this['_statusWindow'][_0x1a3a93('0x1bd')](this[_0x1a3a93('0x8c')]());};