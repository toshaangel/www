//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.28;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.28] [SkillsStatesCore]
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
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
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
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
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
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
 * - This allows this state to be added to an already dead battler, too.
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
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
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
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
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
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
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
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
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
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
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
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
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
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
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
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
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
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
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
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
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
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
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

function _0x54d5(_0x1fccf6,_0x16d9c9){const _0x519834=_0x5198();return _0x54d5=function(_0x54d5e2,_0x5773da){_0x54d5e2=_0x54d5e2-0x72;let _0x148938=_0x519834[_0x54d5e2];return _0x148938;},_0x54d5(_0x1fccf6,_0x16d9c9);}function _0x5198(){const _0x576437=['Sprite_StateIcon_updateFrame','nsIEy','increaseBuff','getStateRetainType','ReapplyRules','setStateRetainType','removeOtherStatesOfSameCategory','split','placeGauge','actor','onRemoveState','textSizeEx','MAXMP','onEraseDebuffJS','isAlive','vNbZD','regenerateAllSkillsStatesCore','qXrdk','initMembers','debuffColor','iyeay','paySkillCost','setupSkillsStatesCore','onEraseBuffJS','ceil','WbMga','pkdrH','DataFontSize','onEraseStateCustomJS','APxAO','drawActorIcons','buffIconIndex','updateStatesActionEnd','getStypeIdWithName','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Window_SkillList_updateHelp','PAuxO','clearStateDisplay','zCuMY','aFXOT','tcWPy','GnUlU','enemy','placeExactGauge','recoverAll','aIdnN','gaugeLineHeight','initMembersSkillsStatesCore','WhAZX','NibLT','#%1','onExpireState','ShowJS','makeCommandName','tpCost','Window_StatusBase_drawActorIcons','EnableLayout','checkShowHideJS','44MjoEqD','checkCacheKey','meetsSkillConditionsEnableJS','tyVRf','VisuMZ_0_CoreEngine','skillEnableJS','clearStateRetainType','<enemy-%1>','setStateDisplay','Game_BattlerBase_initMembers','Isupe','ParseAllNotetags','4010100BzawnG','max','fyMBF','auto','_tempBattler','jfBIV','restriction','drawItemStyleIconText','uiInputPosition','buffColor','_battler','URTzc','ColorPositive','QEwPO','OeHLJ','Parse_Notetags_Skill_Cost','Game_Action_testApply','_stateTurns','_cache','skillTypes','clamp','Game_BattlerBase_die','recover\x20all','outlineColor','IMngx','khXYh','RHfzL','nXITI','stateTpSlipDamageJS','actions','ParseStateNotetags','contents','checkSkillTypeMatch','pksjF','BattleManager_endAction','_scene','Sprite_Gauge_currentValue','updatedLayoutStyle','Game_BattlerBase_recoverAll','wRtOR','laLRb','3462956wGxTCZ','_stypeId','ARRAYJSON','log','bUZXa','isStateAddable','_stateDisplay','Name','_itemWindow','klLkZ','ColorDebuff','ParseClassIDs','onDatabaseLoaded','_classIDs','zrQlS','Param','_costSettings','resetFontSettings','skillCostSeparator','Skills','maxSlipDamage','description','makeResistedStateCategories','GroupDigits','Game_BattlerBase_eraseState','return\x200','getStateReapplyRulings','_stateMaxTurns','CheckIncompatibleStates','THnrH','testApply','drawExtendedSkillsStatesCoreStatus','CheckVisibleSwitchNotetags','aNzEg','format','isBuffOrDebuffAffected','mainFontSize','ActionEndUpdate','SkillConditionJS','stateMaximumTurns','callUpdateHelp','XELyt','Game_Battler_addDebuff','PassiveStates','MaxTurns','gradientFillRect','state','process_VisuMZ_SkillsStatesCore_Skill_Notetags','GmqUm','applyStateTurnManipulationEffects','addChild','getStateOriginByKey','commandName','enemyId','reset','IconStypeNorm','updateCommandNameWindow','NUM','meetsSkillConditionsGlobalJS','_stateData','helpWindowRect','_currentActor','wpxcE','isBuffExpired','skill','CheckVisibleBattleNotetags','push','Parse_Notetags_State_SlipEffectJS','addBuff','%1\x20%2\x20%3','drawIcon','gQlSw','TowZN','NsWRq','HCRSd','ZQtGh','stateExpireJS','lqOKr','<actor-%1>','MDF','paramValueByName','XQiQA','drawActorIconsAllTurnCounters','dnElY','CmdTextAlign','applySkillsStatesCoreEffects','Xaxmr','addPassiveStatesFromOtherPlugins','allowCreateShopStatusWindow','FbAOe','bRNrH','removeStatesByCategoryAll','dABph','stateColor','SkillSceneStatusBgType','totalStateCategoryAffected','AeFGO','onAddStateJS','drawFullGauge','ShowShopStatus','wucWq','IuBgO','applyItemUserEffect','Game_BattlerBase_resetStateCounts','getCurrentStateOriginKey','createSkillCostText','hasStateCategory','QqWwp','convertPassiveStates','icon','gaugeRate','fontSize','onAddStateGlobalJS','canPaySkillCost','Scene_Boot_onDatabaseLoaded','fontBold','keys','18dmMuwi','isUseModernControls','stateMpSlipHealJS','SkillsStatesCore','Game_Battler_regenerateAll','bGvYL','learnSkill','isBuffPrevented','rnsjX','Game_BattlerBase_eraseBuff','isAllDead','slipHp','makeCurrentTroopUniqueID','rAwzC','NEGATIVE','ignore','iconHeight','stateTurns','Buffs','Sprite_Gauge_initMembers','myutI','KZBxb','getStateDisplay','GaugeMaxJS','itemLineRect','drawItemStyleIcon','stateId','drawSkillCost','priority','onEraseStateGlobalJS','Settings','meetsPassiveStateConditionSwitches','itemTextAlign','FUNC','onAddBuffJS','STR','addStateTurns','stateCategoriesResisted','canClearState','aXMBh','Window_SkillList_setActor','TLkpy','createShopStatusWindow','isLearnedSkill','allIcons','AGI','filter','HoZGd','onEraseDebuffGlobalJS','CqEEY','NGVFF','clearStatesWithStateRetain','DataOffsetX','addDebuffTurns','meetsPassiveStateGlobalConditionJS','DisplayedParams','commandNameWindowDrawText','setStateTurns','wtAGY','item','refresh','redrawSkillsStatesCore','_stateIDs','Sprite_StateIcon_loadBitmap','BlBmV','eaCVk','_checkingVisuMzPassiveStateObjects','success','Sprite_Gauge_setup','checkShowHideNotetags','constructor','_actor','XEtGK','Game_BattlerBase_meetsSkillConditions','stepsForTurn','clearStates','mainFontFace','itemWindowRectSkillsStatesCore','traitsSet','stateTpSlipHealJS','helpAreaTop','Game_Troop_setup','addState','note','iconIndex','EVscJ','isStateCategoryResisted','zdLVE','shift','createPassiveStatesCache','process_VisuMZ_SkillsStatesCore_Notetags','_animationIndex','eraseBuff','textColor','length','testSkillStatesCoreNotetags','currentClass','isStateExpired','gVeLy','Parse_Notetags_State_Category','commandStyle','DZNNj','_result','onEraseStateJS','903110iifeSZ','clear','bAHZK','GzEHE','isStateCategoryAffected','ParseSkillNotetags','drawActorBuffTurns','meetsPassiveStateConditionClasses','addDebuff','anchor','currentDisplayedValue','CanPayJS','Window_SkillType_initialize','isPartyAllAffectedByGroupDefeatStates','Game_Actor_skillTypes','decreaseBuff','Window_SkillList_drawItem','getSkillIdWithName','includes','normalColor','_checkingTraitsSetSkillsStatesCore','VisuMZ_1_MainMenuCore','onAddStateCustomJS','width','action','Enemy','onAddStateMakeCustomSlipValues','okqox','Game_BattlerBase_overwriteBuffTurns','_stored_state-%1-color','EVAL','_stateOrigin','VAWTB','onExpireStateCustomJS','skillTypeWindowRect','wxKEV','makeSuccess','DataOffsetY','ListWindowCols','UzCrr','toLowerCase','checkSkillConditionsSwitchNotetags','applyDebuffTurnManipulationEffects','isGroupDefeatStateAffected','DYghk','Game_BattlerBase_isStateResist','isStateResist','clearStateData','alterSkillName','drawExtendedParameter','boxWidth','Game_Battler_addState','addPassiveStatesByNotetag','match','forgetSkill','heal','setItem','NQQFu','Window_SkillStatus_refresh','DkayL','ALL','GaugeDrawJS','_commandNameWindow','_shopStatusWindow','parse','traitObjects','groupDefeat','gNhjU','LSPqv','stateData','WMDqW','Game_BattlerBase_buffIconIndex','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','maxItems','drawActorStateData','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','magicSkills','_skillTypeWindow','DHZXT','gainMp','Game_Actor_learnSkill','ConvertParams','rgba(0,\x200,\x200,\x201)','add','getStateData','kZAOD','AUKQN','Parse_Notetags_State_ApplyRemoveLeaveJS','Scene_Skill_skillTypeWindowRect','indexOf','Scene_Skill_itemWindowRect','HaGLG','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','States','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','ColorBuff','DEF','skorJ','onAddState','oKdVm','Parse_Notetags_State_PassiveJS','<member-%1>','clearStateOrigin','height','addPassiveStates','updateTurnDisplaySprite','ATK','value','SkillSceneAdjustSkillList','Window_SkillList_includes','eTanV','stypeId','_stateSteps','BattleHiddenSkillTypes','updateVisibility','mainAreaHeight','DjkJA','buttonAssistSwitch','map','itemAt','TextJS','stateEraseJS','paramBuffRate','yYhFQ','version','uiHelpPosition','skillTpCost','onExpireDebuffGlobalJS','getStateIdWithName','onEraseBuffGlobalJS','onAddDebuff','_stored_debuffColor','LCnPN','RKeTh','text','buffLength','isBuffAffected','fontFace','stateHpSlipDamageJS','5sBRCSr','KhynK','TurnOffsetX','PRAXH','PqNfT','createAllSkillCostText','zmpEX','dQvdG','isActor','floor','passiveStates','onExpireBuff','PaBPB','MultiplierJS','LUK','states','LMqGP','onEraseDebuff','multiclasses','LYuCC','tRaFf','Sprite_Gauge_gaugeRate','yGgOg','makeAdditionalSkillCostText','sort','vqPZP','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','helpWindowRectSkillsStatesCore','gGfXQ','onAddDebuffGlobalJS','skillMpCost','ItGua','MAT','Game_BattlerBase_skillMpCost','drawParamText','getClassIdWithName','Scene_Skill_helpWindowRect','isCommandEnabled','nXhke','opacity','changeTextColor','baGih','Game_BattlerBase_traitsSet','FIXyY','onExpireStateJS','actorId','isStateRemoved','totalStateCategory','convertTargetToStateOriginKey','Game_Battler_isStateAddable','hxdtF','convertGaugeTypeSkillsStatesCore','drawItem','inBattle','olWZa','_statusWindow','scrollTo','ShowTurns','uAijQ','skillVisibleJS','statesByCategory','setBuffTurns','removeBuffsAuto','includesSkillsStatesCore','PassiveConditionJS','_currentTroopUniqueID','POMmW','KQgPA','hUMXt','recalculateSlipDamageJS','center','drawText','commandNameWindowCenter','JSON','removeBuff','uiMenuStyle','iconWidth','stateHpSlipHealJS','buff','updateFrame','Game_BattlerBase_states','_lastStatesActionEndFrameCount','WYGWN','gainSilentTp','UQtfF','none','bnkKK','Scene_Skill_statusWindowRect','setDebuffTurns','isSkillUsableForAutoBattle','IxTCJ','_buffs','redraw','kuQjG','isStateRestrict','buffTurns','eraseState','_buffTurns','stateAddJS','LayoutStyle','_colorCache','slipTp','isRightInputMode','setActor','remove','setup','Window_StatusBase_placeGauge','onRegenerateCustomStateDamageOverTime','getCurrentTroopUniqueID','_skillIDs','DVZRa','NomFx','_states','YIjJG','VisuMZ_2_ClassChangeSystem','shopStatusWidth','drawActorBuffRates','_hidden','ttKnz','CcNgx','toUpperCase','xaKDr','kHHvc','wJSrX','pZzpG','passiveStateObjects','itemWindowRect','categories','mainAreaTop','autoRemovalTiming','CalcJS','kCrUC','jNbey','updateStateTurns','calcWindowHeight','qyaeO','helpAreaHeight','resetTextColor','overwriteBuffTurns','Global','call','iconText','setStatusWindow','createTurnDisplaySprite','kKMNz','getCurrentStateActiveUser','checkSkillConditionsNotetags','ANY','wGUng','commandNameWindowDrawBackground','skillTypeWindowRectSkillsStatesCore','parameters','mainCommandWidth','setBackgroundType','isStateAffected','changeOutlineColor','onExpireStateGlobalJS','damage','smFcf','_stored_buffColor','_passiveStateResults','getSkillTypes','bitmap','adjustItemWidthByShopStatus','currentValue','maxCols','WlsMR','trim','shopStatusWindowRectSkillsStatesCore','equips','user','Window_SkillList_maxCols','process_VisuMZ_SkillsStatesCore_State_Notetags','onEraseBuff','lNkSX','gainHp','QiqkZ','_stypeIDs','yZHlq','Lzcbl','8188624bAylGi','fYVha','QiPPz','_stateRetainType','fillRect','resetStateCounts','NRBAW','isSkillHidden','number','25218KEiHqh','onAddBuff','setPassiveStateSlipDamageJS','3805690agqsHh','die','right','addWindow','ARRAYFUNC','statusWidth','uiTGC','yJlfN','drawActorStateTurns','isSkillTypeMatchForUse','ARRAYEVAL','ajwgP','HSnRm','TurnOffsetY','getStateOrigin','aIuQG','test','CdAcN','drawTextEx','addBuffTurns','DJbUt','Hqupq','Game_BattlerBase_clearStates','LrtnJ','_subject','ChBfT','oFJUs','KxaOT','prototype','gaugeBackColor','meetsPassiveStateConditionJS','skills','nDqYG','Actor','Sprite_Gauge_redraw','lineHeight','getColor','2HDwTlB','eYIlY','stateMpSlipDamageJS','colSpacing','isUseSkillsStatesCoreUpdatedLayout','debuffTurns','StackDebuffMax','HvPjr','concat','currentMaxValueSkillsStatesCore','QYjKl','_tempActor','VisuMZ_1_ElementStatusCore','DOOQe','aliveMembers','menuActor','applyBuffTurnManipulationEffects','currentValueSkillsStatesCore','hasState','loadBitmap','eTMjZ','SPXaP','1052682meduDl','removeStatesByCategory','statusWindowRect','currentMaxValue','hide','untitled','updateHelp','slipMp','Dcpkb','changePaintOpacity','exit','meetsSkillConditions','isPassiveStateStackable','TurnFontSize','shopStatusWindowRect','onExpireDebuffJS','yZCFt','greater','%1%','ctUiV','ShowData','STRUCT','Costs','Game_Battler_addBuff','isPlaytest','fHFIp','gtdFk','death','_categoryWindow','meetsPassiveStateConditions','uAOis','Game_Actor_forgetSkill','mIyHx','CheckVisibleSkillNotetags','isBottomHelpMode','CBexq','getColorDataFromPluginParameters','onExpireDebuff','status','onExpireBuffJS','retrieveStateColor','endAction','addCommand','windowPadding','name','replace','POSITIVE','createCommandNameWindow','initialize','statePassiveConditionJS','hasSkill','Game_BattlerBase_skillTpCost','removeState','_checkingPassiveStates','setStypeId','MDacT','buttonAssistText1','Parse_Notetags_Skill_JS','usableSkills','commandStyleCheck','VisuMZ_1_ItemsEquipsCore','441UnImlx','<troop-%1>','removeStatesAuto','Game_Action_applyItemUserEffect','addPassiveStatesByPluginParameters','\x5cI[%1]%2','HwvSj','regenerateAll','tearj','_turnDisplaySprite','index','skillId','qSmAm','onAddDebuffJS','isDebuffAffected','ejxwi','frameCount','innerWidth','Scene_Skill_createItemWindow'];_0x5198=function(){return _0x576437;};return _0x5198();}const _0x13e91f=_0x54d5;(function(_0x53b63f,_0x3e59c7){const _0x1be32b=_0x54d5,_0x4b7471=_0x53b63f();while(!![]){try{const _0x108c35=parseInt(_0x1be32b(0xad))/0x1+-parseInt(_0x1be32b(0x21d))/0x2*(-parseInt(_0x1be32b(0x233))/0x3)+-parseInt(_0x1be32b(0x2f2))/0x4*(parseInt(_0x1be32b(0x138))/0x5)+parseInt(_0x1be32b(0x1f5))/0x6*(-parseInt(_0x1be32b(0x270))/0x7)+parseInt(_0x1be32b(0x1ec))/0x8+parseInt(_0x1be32b(0x367))/0x9*(parseInt(_0x1be32b(0x1f8))/0xa)+parseInt(_0x1be32b(0x2bd))/0xb*(-parseInt(_0x1be32b(0x2c9))/0xc);if(_0x108c35===_0x3e59c7)break;else _0x4b7471['push'](_0x4b7471['shift']());}catch(_0x228415){_0x4b7471['push'](_0x4b7471['shift']());}}}(_0x5198,0x8b864));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x13e91f(0x73)](function(_0x369800){const _0x4716a0=_0x13e91f;return _0x369800[_0x4716a0(0x259)]&&_0x369800[_0x4716a0(0x307)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x13e91f(0x385)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x13e91f(0xfe)]=function(_0x7544d6,_0x55cffb){const _0x4e107e=_0x13e91f;for(const _0x19dcb5 in _0x55cffb){if(_0x4e107e(0xf0)!==_0x4e107e(0xf0))_0x38fa9c[_0x4e107e(0x36a)][_0x4e107e(0x37a)]['call'](this),this[_0x4e107e(0x302)]=null;else{if(_0x19dcb5[_0x4e107e(0xe2)](/(.*):(.*)/i)){if(_0x4e107e(0x345)!==_0x4e107e(0x345)){_0x292de5[_0x4e107e(0x214)][_0x4e107e(0x274)][_0x4e107e(0x1c4)](this);const _0x25cc95=_0x2827ff[_0x4e107e(0x36a)][_0x4e107e(0x385)]['PassiveStates'][_0x4e107e(0xc6)];this[_0x4e107e(0x2db)][_0x4e107e(0x142)]=this[_0x4e107e(0x2db)][_0x4e107e(0x142)][_0x4e107e(0x225)](_0x25cc95);}else{const _0x57c640=String(RegExp['$1']),_0x44a775=String(RegExp['$2'])[_0x4e107e(0x1b0)]()[_0x4e107e(0x1df)]();let _0xa9221b,_0x222e31,_0x56ec21;switch(_0x44a775){case _0x4e107e(0x32b):_0xa9221b=_0x55cffb[_0x19dcb5]!==''?Number(_0x55cffb[_0x19dcb5]):0x0;break;case'ARRAYNUM':_0x222e31=_0x55cffb[_0x19dcb5]!==''?JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5]):[],_0xa9221b=_0x222e31[_0x4e107e(0x123)](_0x1cb131=>Number(_0x1cb131));break;case _0x4e107e(0xcb):_0xa9221b=_0x55cffb[_0x19dcb5]!==''?eval(_0x55cffb[_0x19dcb5]):null;break;case _0x4e107e(0x202):_0x222e31=_0x55cffb[_0x19dcb5]!==''?JSON['parse'](_0x55cffb[_0x19dcb5]):[],_0xa9221b=_0x222e31[_0x4e107e(0x123)](_0x145121=>eval(_0x145121));break;case _0x4e107e(0x181):_0xa9221b=_0x55cffb[_0x19dcb5]!==''?JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5]):'';break;case _0x4e107e(0x2f4):_0x222e31=_0x55cffb[_0x19dcb5]!==''?JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5]):[],_0xa9221b=_0x222e31['map'](_0x1ca124=>JSON[_0x4e107e(0xed)](_0x1ca124));break;case _0x4e107e(0x388):_0xa9221b=_0x55cffb[_0x19dcb5]!==''?new Function(JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5])):new Function(_0x4e107e(0x30b));break;case _0x4e107e(0x1fc):_0x222e31=_0x55cffb[_0x19dcb5]!==''?JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5]):[],_0xa9221b=_0x222e31['map'](_0x1711a9=>new Function(JSON[_0x4e107e(0xed)](_0x1711a9)));break;case _0x4e107e(0x38a):_0xa9221b=_0x55cffb[_0x19dcb5]!==''?String(_0x55cffb[_0x19dcb5]):'';break;case'ARRAYSTR':_0x222e31=_0x55cffb[_0x19dcb5]!==''?JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5]):[],_0xa9221b=_0x222e31[_0x4e107e(0x123)](_0x42c4d7=>String(_0x42c4d7));break;case _0x4e107e(0x248):_0x56ec21=_0x55cffb[_0x19dcb5]!==''?JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5]):{},_0x7544d6[_0x57c640]={},VisuMZ[_0x4e107e(0xfe)](_0x7544d6[_0x57c640],_0x56ec21);continue;case'ARRAYSTRUCT':_0x222e31=_0x55cffb[_0x19dcb5]!==''?JSON[_0x4e107e(0xed)](_0x55cffb[_0x19dcb5]):[],_0xa9221b=_0x222e31['map'](_0x31a798=>VisuMZ[_0x4e107e(0xfe)]({},JSON[_0x4e107e(0xed)](_0x31a798)));break;default:continue;}_0x7544d6[_0x57c640]=_0xa9221b;}}}}return _0x7544d6;},(_0x19458d=>{const _0x5f10ec=_0x13e91f,_0x47e08e=_0x19458d['name'];for(const _0x17f6ad of dependencies){if(_0x5f10ec(0x8d)!==_0x5f10ec(0x8d)){if(!_0x30e37e['value'](_0x874bf2))return!![];}else{if(!Imported[_0x17f6ad]){if(_0x5f10ec(0x253)===_0x5f10ec(0x139))return![];else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x47e08e,_0x17f6ad)),SceneManager[_0x5f10ec(0x23d)]();break;}}}}const _0x497bca=_0x19458d['description'];if(_0x497bca[_0x5f10ec(0xe2)](/\[Version[ ](.*?)\]/i)){if(_0x5f10ec(0x30f)===_0x5f10ec(0x30f)){const _0x56e7ee=Number(RegExp['$1']);_0x56e7ee!==VisuMZ[label][_0x5f10ec(0x129)]&&(alert(_0x5f10ec(0x109)['format'](_0x47e08e,_0x56e7ee)),SceneManager['exit']());}else this[_0x5f10ec(0x302)]=null;}if(_0x497bca[_0x5f10ec(0xe2)](/\[Tier[ ](\d+)\]/i)){if(_0x5f10ec(0x2d6)!==_0x5f10ec(0x74)){const _0x174977=Number(RegExp['$1']);_0x174977<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5f10ec(0x314)](_0x47e08e,_0x174977,tier)),SceneManager[_0x5f10ec(0x23d)]()):tier=Math[_0x5f10ec(0x2ca)](_0x174977,tier);}else{if(_0x551a5b[_0x5f10ec(0x24b)]())_0x542acc[_0x5f10ec(0x2f5)](_0x44606a);}}VisuMZ[_0x5f10ec(0xfe)](VisuMZ[label][_0x5f10ec(0x385)],_0x19458d[_0x5f10ec(0x1cf)]);})(pluginData),VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x364)]=Scene_Boot[_0x13e91f(0x214)][_0x13e91f(0x2fe)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x52c454=_0x13e91f;VisuMZ[_0x52c454(0x36a)][_0x52c454(0x364)][_0x52c454(0x1c4)](this),this[_0x52c454(0x9f)](),VisuMZ['SkillsStatesCore'][_0x52c454(0x30e)]();},Scene_Boot[_0x13e91f(0x214)][_0x13e91f(0x9f)]=function(){const _0x502e90=_0x13e91f;if(VisuMZ[_0x502e90(0x2c8)])return;this[_0x502e90(0x321)](),this[_0x502e90(0x1e4)]();},Scene_Boot[_0x13e91f(0x214)]['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x5e8daa=_0x13e91f;for(const _0x1f1749 of $dataSkills){if(!_0x1f1749)continue;VisuMZ[_0x5e8daa(0x36a)]['Parse_Notetags_Skill_Cost'](_0x1f1749),VisuMZ[_0x5e8daa(0x36a)][_0x5e8daa(0x26c)](_0x1f1749);}},Scene_Boot['prototype'][_0x13e91f(0x1e4)]=function(){const _0x47bed5=_0x13e91f;for(const _0x4a16c2 of $dataStates){if(_0x47bed5(0x34e)===_0x47bed5(0x34e)){if(!_0x4a16c2)continue;VisuMZ[_0x47bed5(0x36a)][_0x47bed5(0xa8)](_0x4a16c2),VisuMZ[_0x47bed5(0x36a)]['Parse_Notetags_State_PassiveJS'](_0x4a16c2),VisuMZ[_0x47bed5(0x36a)][_0x47bed5(0x335)](_0x4a16c2),VisuMZ[_0x47bed5(0x36a)][_0x47bed5(0x104)](_0x4a16c2);}else _0x23f1bf[_0x47bed5(0x36a)][_0x47bed5(0x385)][_0x47bed5(0x10a)][_0x47bed5(0x164)]['call'](this,_0x188224);}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0xb2)]=VisuMZ[_0x13e91f(0xb2)],VisuMZ[_0x13e91f(0xb2)]=function(_0x43e524){const _0xa4144d=_0x13e91f;VisuMZ[_0xa4144d(0x36a)][_0xa4144d(0xb2)][_0xa4144d(0x1c4)](this,_0x43e524),VisuMZ['SkillsStatesCore'][_0xa4144d(0x2d8)](_0x43e524),VisuMZ[_0xa4144d(0x36a)][_0xa4144d(0x26c)](_0x43e524);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x2e7)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x13e91f(0x2e7)]=function(_0x1bb056){const _0x2baeca=_0x13e91f;VisuMZ[_0x2baeca(0x36a)][_0x2baeca(0x2e7)][_0x2baeca(0x1c4)](this,_0x1bb056),VisuMZ[_0x2baeca(0x36a)][_0x2baeca(0xa8)](_0x1bb056),VisuMZ[_0x2baeca(0x36a)][_0x2baeca(0x111)](_0x1bb056),VisuMZ[_0x2baeca(0x36a)][_0x2baeca(0x335)](_0x1bb056),VisuMZ[_0x2baeca(0x36a)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x1bb056);},VisuMZ[_0x13e91f(0x36a)]['Parse_Notetags_Skill_Cost']=function(_0x52e2cd){const _0x41d608=_0x13e91f,_0x57a3b1=_0x52e2cd['note'];_0x57a3b1[_0x41d608(0xe2)](/<MP COST:[ ](\d+)>/i)&&('qyaeO'===_0x41d608(0x1bf)?_0x52e2cd['mpCost']=Number(RegExp['$1']):this[_0x41d608(0x1ef)]=''),_0x57a3b1[_0x41d608(0xe2)](/<TP COST:[ ](\d+)>/i)&&(_0x52e2cd[_0x41d608(0x2b9)]=Number(RegExp['$1']));},VisuMZ['SkillsStatesCore']['skillEnableJS']={},VisuMZ['SkillsStatesCore'][_0x13e91f(0x173)]={},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x26c)]=function(_0xd568ca){const _0x3939fc=_0x13e91f,_0x2b2b2f=_0xd568ca['note'];if(_0x2b2b2f[_0x3939fc(0xe2)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){if(_0x3939fc(0x33d)!==_0x3939fc(0x20f)){const _0x475a57=String(RegExp['$1']),_0x1f78d5=_0x3939fc(0xf5)[_0x3939fc(0x314)](_0x475a57);VisuMZ[_0x3939fc(0x36a)][_0x3939fc(0x2c2)][_0xd568ca['id']]=new Function(_0x3939fc(0x332),_0x1f78d5);}else return'icon';}if(_0x2b2b2f[_0x3939fc(0xe2)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x1a7f55=String(RegExp['$1']),_0x1a9cf6=_0x3939fc(0x2a5)[_0x3939fc(0x314)](_0x1a7f55);VisuMZ[_0x3939fc(0x36a)][_0x3939fc(0x173)][_0xd568ca['id']]=new Function(_0x3939fc(0x332),_0x1a9cf6);}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0xa8)]=function(_0x225804){const _0x513cda=_0x13e91f;_0x225804[_0x513cda(0x1b7)]=[_0x513cda(0xe9),_0x513cda(0x1cb)];const _0x442e50=_0x225804[_0x513cda(0x98)],_0x5945b7=_0x442e50[_0x513cda(0xe2)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x5945b7)for(const _0x56f67f of _0x5945b7){_0x56f67f[_0x513cda(0xe2)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xe331d8=String(RegExp['$1'])[_0x513cda(0x1b0)]()[_0x513cda(0x1df)]()[_0x513cda(0x28a)](',');for(const _0x385452 of _0xe331d8){_0x225804[_0x513cda(0x1b7)][_0x513cda(0x334)](_0x385452['trim']());}}if(_0x442e50[_0x513cda(0xe2)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x3317f4=RegExp['$1']['split'](/[\r\n]+/);for(const _0x4fc72b of _0x3317f4){_0x513cda(0x27f)==='JgrxF'?(_0x34557d+=this['buffTurns'](_0x41c360),this[_0x513cda(0x7e)](_0x38bd2e,_0xca79e8)):_0x225804[_0x513cda(0x1b7)][_0x513cda(0x334)](_0x4fc72b[_0x513cda(0x1b0)]()['trim']());}}_0x442e50[_0x513cda(0xe2)](/<POSITIVE STATE>/i)&&_0x225804[_0x513cda(0x1b7)][_0x513cda(0x334)](_0x513cda(0x261)),_0x442e50[_0x513cda(0xe2)](/<NEGATIVE STATE>/i)&&_0x225804['categories'][_0x513cda(0x334)](_0x513cda(0x375));},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x264)]={},VisuMZ[_0x13e91f(0x36a)]['Parse_Notetags_State_PassiveJS']=function(_0x283f3f){const _0xbe67c6=_0x13e91f,_0x2e50fb=_0x283f3f[_0xbe67c6(0x98)];if(_0x2e50fb['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x5f4f58=String(RegExp['$1']),_0xc3a886=_0xbe67c6(0xf8)[_0xbe67c6(0x314)](_0x5f4f58);VisuMZ['SkillsStatesCore'][_0xbe67c6(0x264)][_0x283f3f['id']]=new Function(_0xbe67c6(0x320),_0xc3a886);}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x137)]={},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x185)]={},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x21f)]={},VisuMZ[_0x13e91f(0x36a)]['stateMpSlipHealJS']={},VisuMZ['SkillsStatesCore'][_0x13e91f(0x2e5)]={},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x94)]={},VisuMZ['SkillsStatesCore'][_0x13e91f(0x335)]=function(_0x40bff0){const _0x397402=_0x13e91f,_0x560a2c=_0x40bff0['note'],_0x21090b=_0x397402(0x10b);if(_0x560a2c[_0x397402(0xe2)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x942f45=String(RegExp['$1']),_0x5b39f1=_0x21090b[_0x397402(0x314)](_0x942f45,_0x397402(0x1d5),-0x1,'slipHp');VisuMZ[_0x397402(0x36a)][_0x397402(0x137)][_0x40bff0['id']]=new Function(_0x397402(0x381),_0x5b39f1);}else{if(_0x560a2c[_0x397402(0xe2)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0xbaa1ac=String(RegExp['$1']),_0x3afb19=_0x21090b[_0x397402(0x314)](_0xbaa1ac,'heal',0x1,_0x397402(0x372));VisuMZ[_0x397402(0x36a)][_0x397402(0x185)][_0x40bff0['id']]=new Function(_0x397402(0x381),_0x3afb19);}}if(_0x560a2c[_0x397402(0xe2)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x5caab1=String(RegExp['$1']),_0x599125=_0x21090b[_0x397402(0x314)](_0x5caab1,_0x397402(0x1d5),-0x1,_0x397402(0x23a));VisuMZ[_0x397402(0x36a)][_0x397402(0x21f)][_0x40bff0['id']]=new Function(_0x397402(0x381),_0x599125);}else{if(_0x560a2c['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if('ZAbxZ'!==_0x397402(0x1fe)){const _0x387d48=String(RegExp['$1']),_0x5432b3=_0x21090b['format'](_0x387d48,_0x397402(0xe4),0x1,_0x397402(0x23a));VisuMZ[_0x397402(0x36a)][_0x397402(0x369)][_0x40bff0['id']]=new Function(_0x397402(0x381),_0x5432b3);}else return!this[_0x397402(0xdb)](_0xf2b427)&&!this['isStateRestrict'](_0x2a3037)&&!this['_result'][_0x397402(0x166)](_0xdef9b4);}}if(_0x560a2c[_0x397402(0xe2)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x321210=String(RegExp['$1']),_0x351d4=_0x21090b[_0x397402(0x314)](_0x321210,'damage',-0x1,_0x397402(0x19d));VisuMZ[_0x397402(0x36a)][_0x397402(0x2e5)][_0x40bff0['id']]=new Function(_0x397402(0x381),_0x351d4);}else{if(_0x560a2c['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x397402(0x33c)!==_0x397402(0x86)){const _0x1171fb=String(RegExp['$1']),_0x196cde=_0x21090b['format'](_0x1171fb,_0x397402(0xe4),0x1,_0x397402(0x19d));VisuMZ['SkillsStatesCore'][_0x397402(0x94)][_0x40bff0['id']]=new Function(_0x397402(0x381),_0x196cde);}else{const _0x4406b4=_0x3dc2b8[_0x397402(0xed)]('['+_0x76614f['$1'][_0x397402(0xe2)](/\d+/g)+']');for(const _0x14704e of _0x4406b4){if(!_0x2bd1c4[_0x397402(0x118)](_0x14704e))return!![];}return![];}}}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x19a)]={},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x126)]={},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x33e)]={},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x104)]=function(_0x2d3078){const _0x28cba5=_0x13e91f,_0x2e1366=_0x2d3078[_0x28cba5(0x98)],_0x2d7094=_0x28cba5(0x152);if(_0x2e1366[_0x28cba5(0xe2)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x45156a=String(RegExp['$1']),_0x42909c=_0x2d7094[_0x28cba5(0x314)](_0x45156a);VisuMZ[_0x28cba5(0x36a)][_0x28cba5(0x19a)][_0x2d3078['id']]=new Function(_0x28cba5(0x381),_0x42909c);}if(_0x2e1366['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x19adc5=String(RegExp['$1']),_0x40275c=_0x2d7094[_0x28cba5(0x314)](_0x19adc5);VisuMZ['SkillsStatesCore'][_0x28cba5(0x126)][_0x2d3078['id']]=new Function(_0x28cba5(0x381),_0x40275c);}if(_0x2e1366[_0x28cba5(0xe2)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if(_0x28cba5(0x2e1)===_0x28cba5(0x2e1)){const _0x261c73=String(RegExp['$1']),_0x11f088=_0x2d7094['format'](_0x261c73);VisuMZ[_0x28cba5(0x36a)]['stateExpireJS'][_0x2d3078['id']]=new Function('stateId',_0x11f088);}else{const _0x30aba0=_0x2c661a[_0x28cba5(0x98)],_0x55e7e0=_0x27e57a[_0x28cba5(0x36a)][_0x28cba5(0x2c2)];return _0x55e7e0[_0x2f2d35['id']]?_0x55e7e0[_0x10fcfc['id']][_0x28cba5(0x1c4)](this,_0x30313f):!![];}}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x30e)]=function(){const _0x1ef089=_0x13e91f;if(!VisuMZ[_0x1ef089(0x36a)][_0x1ef089(0x385)][_0x1ef089(0x10a)]['ActionEndUpdate'])return;for(const _0x141cb8 of $dataStates){if(!_0x141cb8)continue;_0x141cb8[_0x1ef089(0x2cf)]===0x4&&_0x141cb8['autoRemovalTiming']===0x1&&(_0x141cb8[_0x1ef089(0x1b9)]=0x2);}},DataManager[_0x13e91f(0x15b)]=function(_0x2fb72d){const _0x4c12f7=_0x13e91f;_0x2fb72d=_0x2fb72d['toUpperCase']()[_0x4c12f7(0x1df)](),this[_0x4c12f7(0x2ff)]=this[_0x4c12f7(0x2ff)]||{};if(this[_0x4c12f7(0x2ff)][_0x2fb72d])return this[_0x4c12f7(0x2ff)][_0x2fb72d];for(const _0x29b9e1 of $dataClasses){if(_0x4c12f7(0x17c)!==_0x4c12f7(0x17c)){if(!_0x34aa[_0x4c12f7(0x265)](_0x26c0b1))return![];}else{if(!_0x29b9e1)continue;let _0x29c78f=_0x29b9e1['name'];_0x29c78f=_0x29c78f[_0x4c12f7(0x260)](/\x1I\[(\d+)\]/gi,''),_0x29c78f=_0x29c78f[_0x4c12f7(0x260)](/\\I\[(\d+)\]/gi,''),this[_0x4c12f7(0x2ff)][_0x29c78f[_0x4c12f7(0x1b0)]()[_0x4c12f7(0x1df)]()]=_0x29b9e1['id'];}}return this[_0x4c12f7(0x2ff)][_0x2fb72d]||0x0;},DataManager[_0x13e91f(0x1d9)]=function(_0x4453d2){const _0x35df6d=_0x13e91f;this['_stypeIDs']=this[_0x35df6d(0x1e9)]||{};if(this[_0x35df6d(0x1e9)][_0x4453d2['id']])return this[_0x35df6d(0x1e9)][_0x4453d2['id']];this['_stypeIDs'][_0x4453d2['id']]=[_0x4453d2[_0x35df6d(0x11c)]];if(_0x4453d2[_0x35df6d(0x98)][_0x35df6d(0xe2)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x31d2bd=JSON[_0x35df6d(0xed)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x35df6d(0x1e9)][_0x4453d2['id']]=this[_0x35df6d(0x1e9)][_0x4453d2['id']][_0x35df6d(0x225)](_0x31d2bd);}else{if(_0x4453d2['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x4fc0da=RegExp['$1']['split'](',');for(const _0x1fc3ea of _0x4fc0da){const _0x383192=DataManager[_0x35df6d(0x2a4)](_0x1fc3ea);if(_0x383192)this[_0x35df6d(0x1e9)][_0x4453d2['id']]['push'](_0x383192);}}}return this[_0x35df6d(0x1e9)][_0x4453d2['id']];},DataManager['getStypeIdWithName']=function(_0x2976eb){const _0x49f1f7=_0x13e91f;_0x2976eb=_0x2976eb[_0x49f1f7(0x1b0)]()['trim'](),this[_0x49f1f7(0x1e9)]=this[_0x49f1f7(0x1e9)]||{};if(this['_stypeIDs'][_0x2976eb])return this['_stypeIDs'][_0x2976eb];for(let _0xc9e212=0x1;_0xc9e212<0x64;_0xc9e212++){if(!$dataSystem['skillTypes'][_0xc9e212])continue;let _0x3cbe0e=$dataSystem[_0x49f1f7(0x2dc)][_0xc9e212][_0x49f1f7(0x1b0)]()[_0x49f1f7(0x1df)]();_0x3cbe0e=_0x3cbe0e[_0x49f1f7(0x260)](/\x1I\[(\d+)\]/gi,''),_0x3cbe0e=_0x3cbe0e['replace'](/\\I\[(\d+)\]/gi,''),this[_0x49f1f7(0x1e9)][_0x3cbe0e]=_0xc9e212;}return this[_0x49f1f7(0x1e9)][_0x2976eb]||0x0;},DataManager['getSkillIdWithName']=function(_0x45c796){const _0x4c5003=_0x13e91f;_0x45c796=_0x45c796['toUpperCase']()[_0x4c5003(0x1df)](),this[_0x4c5003(0x1a5)]=this[_0x4c5003(0x1a5)]||{};if(this['_skillIDs'][_0x45c796])return this['_skillIDs'][_0x45c796];for(const _0x19b183 of $dataSkills){if(!_0x19b183)continue;this[_0x4c5003(0x1a5)][_0x19b183[_0x4c5003(0x25f)][_0x4c5003(0x1b0)]()[_0x4c5003(0x1df)]()]=_0x19b183['id'];}return this[_0x4c5003(0x1a5)][_0x45c796]||0x0;},DataManager[_0x13e91f(0x12d)]=function(_0x56f2a9){const _0x1a29ec=_0x13e91f;_0x56f2a9=_0x56f2a9['toUpperCase']()[_0x1a29ec(0x1df)](),this[_0x1a29ec(0x83)]=this[_0x1a29ec(0x83)]||{};if(this[_0x1a29ec(0x83)][_0x56f2a9])return this['_stateIDs'][_0x56f2a9];for(const _0x23bad0 of $dataStates){if(!_0x23bad0)continue;this['_stateIDs'][_0x23bad0[_0x1a29ec(0x25f)]['toUpperCase']()['trim']()]=_0x23bad0['id'];}return this[_0x1a29ec(0x83)][_0x56f2a9]||0x0;},DataManager[_0x13e91f(0x319)]=function(_0x970da8){const _0x349a92=_0x13e91f;this[_0x349a92(0x30d)]=this['_stateMaxTurns']||{};if(this[_0x349a92(0x30d)][_0x970da8])return this['_stateMaxTurns'][_0x970da8];return $dataStates[_0x970da8][_0x349a92(0x98)][_0x349a92(0xe2)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x349a92(0x30d)][_0x970da8]=Number(RegExp['$1']):this['_stateMaxTurns'][_0x970da8]=VisuMZ[_0x349a92(0x36a)]['Settings'][_0x349a92(0x10a)][_0x349a92(0x31e)],this[_0x349a92(0x30d)][_0x970da8];},ColorManager['getColorDataFromPluginParameters']=function(_0x326c24,_0x2b3355){const _0x2b9738=_0x13e91f;return _0x2b3355=String(_0x2b3355),this[_0x2b9738(0x19c)]=this[_0x2b9738(0x19c)]||{},_0x2b3355[_0x2b9738(0xe2)](/#(.*)/i)?this[_0x2b9738(0x19c)][_0x326c24]='#%1'[_0x2b9738(0x314)](String(RegExp['$1'])):this[_0x2b9738(0x19c)][_0x326c24]=this[_0x2b9738(0xa2)](Number(_0x2b3355)),this[_0x2b9738(0x19c)][_0x326c24];},ColorManager[_0x13e91f(0x21c)]=function(_0x4acfcb){const _0x10faf6=_0x13e91f;_0x4acfcb=String(_0x4acfcb);if(_0x4acfcb[_0x10faf6(0xe2)](/#(.*)/i)){if('QqWwp'===_0x10faf6(0x35d))return _0x10faf6(0x2b5)[_0x10faf6(0x314)](String(RegExp['$1']));else{_0x158176['SkillsStatesCore'][_0x10faf6(0xe7)]['call'](this);if(this['_actor'])this[_0x10faf6(0x311)]();}}else{if(_0x10faf6(0x2b0)===_0x10faf6(0x2b0))return this[_0x10faf6(0xa2)](Number(_0x4acfcb));else{const _0x3b718d=this[_0x10faf6(0x22b)]();for(const _0x1c673a of _0x3b718d){if(!_0x1c673a[_0x10faf6(0xd8)]())return![];}return!![];}}},ColorManager[_0x13e91f(0x34f)]=function(_0x530d8d){const _0x27cc02=_0x13e91f;if(typeof _0x530d8d===_0x27cc02(0x1f4))_0x530d8d=$dataStates[_0x530d8d];const _0x54ca1e=_0x27cc02(0xca)[_0x27cc02(0x314)](_0x530d8d['id']);this[_0x27cc02(0x19c)]=this['_colorCache']||{};if(this[_0x27cc02(0x19c)][_0x54ca1e])return this[_0x27cc02(0x19c)][_0x54ca1e];const _0x767840=this[_0x27cc02(0x25b)](_0x530d8d);return this['getColorDataFromPluginParameters'](_0x54ca1e,_0x767840);},ColorManager[_0x13e91f(0x25b)]=function(_0x591b99){const _0x364057=_0x13e91f,_0x346921=_0x591b99[_0x364057(0x98)];if(_0x346921['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x346921[_0x364057(0xe2)](/<POSITIVE STATE>/i))return VisuMZ[_0x364057(0x36a)][_0x364057(0x385)][_0x364057(0x10a)][_0x364057(0x2d5)];else{if(_0x346921[_0x364057(0xe2)](/<NEGATIVE STATE>/i)){if(_0x364057(0x2a7)!==_0x364057(0x2a7)){const _0x3fb45d=this[_0x364057(0xeb)],_0x440ac1=_0x4b5f35[_0x364057(0x25e)](),_0x4d6e07=_0x36c6d1['x']+_0x3468a1[_0x364057(0x141)](_0x17a414[_0x364057(0xc4)]/0x2)+_0x440ac1;_0x3fb45d['x']=_0x3fb45d[_0x364057(0xc4)]/-0x2+_0x4d6e07,_0x3fb45d['y']=_0x5473ef[_0x364057(0x141)](_0x506f47[_0x364057(0x114)]/0x2);}else return VisuMZ['SkillsStatesCore'][_0x364057(0x385)][_0x364057(0x10a)]['ColorNegative'];}else{if(_0x364057(0x1b1)===_0x364057(0x1b1))return VisuMZ[_0x364057(0x36a)][_0x364057(0x385)][_0x364057(0x10a)]['ColorNeutral'];else _0x96c844[_0xd89f73][_0x53764c]&&_0x59233c[_0x1ae3a8][_0x4721c1][_0x364057(0x1c4)](this,_0x3e5fb6);}}}},ColorManager[_0x13e91f(0x2d2)]=function(){const _0xcfe498=_0x13e91f,_0x8eee4f=_0xcfe498(0x1d7);this[_0xcfe498(0x19c)]=this['_colorCache']||{};if(this[_0xcfe498(0x19c)][_0x8eee4f])return this[_0xcfe498(0x19c)][_0x8eee4f];const _0x1a75ae=VisuMZ[_0xcfe498(0x36a)][_0xcfe498(0x385)]['Buffs'][_0xcfe498(0x10c)];return this[_0xcfe498(0x257)](_0x8eee4f,_0x1a75ae);},ColorManager['debuffColor']=function(){const _0xbcb47c=_0x13e91f,_0x331e6d=_0xbcb47c(0x130);this[_0xbcb47c(0x19c)]=this[_0xbcb47c(0x19c)]||{};if(this['_colorCache'][_0x331e6d])return this[_0xbcb47c(0x19c)][_0x331e6d];const _0x140a7c=VisuMZ[_0xbcb47c(0x36a)][_0xbcb47c(0x385)][_0xbcb47c(0x379)][_0xbcb47c(0x2fc)];return this[_0xbcb47c(0x257)](_0x331e6d,_0x140a7c);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x2eb)]=BattleManager[_0x13e91f(0x25c)],BattleManager[_0x13e91f(0x25c)]=function(){const _0x41c439=_0x13e91f;this[_0x41c439(0x2a3)](),VisuMZ[_0x41c439(0x36a)][_0x41c439(0x2eb)][_0x41c439(0x1c4)](this);},BattleManager['updateStatesActionEnd']=function(){const _0x16a664=_0x13e91f,_0x507c29=VisuMZ['SkillsStatesCore'][_0x16a664(0x385)][_0x16a664(0x10a)];if(!_0x507c29)return;if(_0x507c29[_0x16a664(0x317)]===![])return;if(!this[_0x16a664(0x210)])return;this['_subject'][_0x16a664(0x2a3)]();},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x2a3)]=function(){const _0x4e280e=_0x13e91f;if(BattleManager['_phase']!==_0x4e280e(0xc5))return;if(this['_lastStatesActionEndFrameCount']===Graphics[_0x4e280e(0x280)])return;this[_0x4e280e(0x189)]=Graphics['frameCount'];for(const _0x260c2b of this[_0x4e280e(0x1a8)]){const _0x526b87=$dataStates[_0x260c2b];if(!_0x526b87)continue;if(_0x526b87[_0x4e280e(0x1b9)]!==0x1)continue;if(this[_0x4e280e(0x2da)][_0x260c2b]>0x0){if('qSmAm'!==_0x4e280e(0x27c))return this[_0x4e280e(0xa2)](_0x5cb38f(_0x23f61e));else this[_0x4e280e(0x2da)][_0x260c2b]--;}}this[_0x4e280e(0x272)](0x1);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x1bd)]=function(){const _0x5928a3=_0x13e91f,_0x23aa91=VisuMZ[_0x5928a3(0x36a)][_0x5928a3(0x385)]['States'];for(const _0x1629a4 of this[_0x5928a3(0x1a8)]){const _0x45b063=$dataStates[_0x1629a4];if(_0x23aa91&&_0x23aa91['ActionEndUpdate']!==![]){if(_0x45b063&&_0x45b063[_0x5928a3(0x1b9)]===0x1)continue;}this[_0x5928a3(0x2da)][_0x1629a4]>0x0&&this['_stateTurns'][_0x1629a4]--;}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x273)]=Game_Action[_0x13e91f(0x214)]['applyItemUserEffect'],Game_Action[_0x13e91f(0x214)][_0x13e91f(0x358)]=function(_0x52d32f){const _0x5ac683=_0x13e91f;VisuMZ[_0x5ac683(0x36a)][_0x5ac683(0x273)]['call'](this,_0x52d32f),this[_0x5ac683(0x347)](_0x52d32f);},Game_Action['prototype'][_0x13e91f(0x347)]=function(_0x4bf707){const _0x4ec838=_0x13e91f;this['applyStateCategoryRemovalEffects'](_0x4bf707),this[_0x4ec838(0x323)](_0x4bf707),this[_0x4ec838(0x22d)](_0x4bf707),this[_0x4ec838(0xd7)](_0x4bf707);},VisuMZ[_0x13e91f(0x36a)]['Game_Action_testApply']=Game_Action['prototype'][_0x13e91f(0x310)],Game_Action[_0x13e91f(0x214)][_0x13e91f(0x310)]=function(_0x1d3baf){const _0x504320=_0x13e91f;if(this[_0x504320(0xa4)](_0x1d3baf)){if(_0x504320(0x11b)!==_0x504320(0x357))return!![];else{const _0x508527=this[_0x504320(0x193)][_0x5ba1f1];return _0x5e5e2e['SkillsStatesCore'][_0x504320(0x385)][_0x504320(0x379)][_0x504320(0x145)]['call'](this,_0x221b60,_0x508527);}}return VisuMZ['SkillsStatesCore'][_0x504320(0x2d9)]['call'](this,_0x1d3baf);},Game_Action[_0x13e91f(0x214)][_0x13e91f(0xa4)]=function(_0x33a2d2){const _0x1e1ac5=_0x13e91f,_0x9c7aad=this[_0x1e1ac5(0x80)]()[_0x1e1ac5(0x98)];if(_0x9c7aad[_0x1e1ac5(0xe2)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x6efc5d=String(RegExp['$1']);if(_0x33a2d2[_0x1e1ac5(0xb1)](_0x6efc5d))return!![];}if(_0x9c7aad[_0x1e1ac5(0xe2)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x1bfeb0=Number(RegExp['$1']);if(_0x33a2d2['isStateAffected'](_0x1bfeb0))return!![];}else{if(_0x9c7aad[_0x1e1ac5(0xe2)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x1e1ac5(0x313)!==_0x1e1ac5(0x313))return _0x12f68d[_0x1e1ac5(0x214)][_0x1e1ac5(0x19e)][_0x1e1ac5(0x1c4)](this);else{const _0x5b8b61=DataManager[_0x1e1ac5(0x12d)](RegExp['$1']);if(_0x33a2d2[_0x1e1ac5(0x1d2)](_0x5b8b61))return!![];}}}return![];},Game_Action['prototype']['applyStateCategoryRemovalEffects']=function(_0x1e78e8){const _0x3cc5ba=_0x13e91f;if(_0x1e78e8[_0x3cc5ba(0x147)]()[_0x3cc5ba(0xa3)]<=0x0)return;const _0x37c76e=this[_0x3cc5ba(0x80)]()['note'];{if('NGVFF'!==_0x3cc5ba(0x77))return _0x18f12b;else{const _0x51e346=_0x37c76e[_0x3cc5ba(0xe2)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x51e346)for(const _0x368b27 of _0x51e346){if(_0x3cc5ba(0x1ae)!==_0x3cc5ba(0x1ae)){const _0xd640e6=_0x12de3b[_0x3cc5ba(0x2ec)];if(![_0x203a04,_0x13692e][_0x3cc5ba(0xbf)](_0xd640e6[_0x3cc5ba(0x8b)]))return _0xd092fb['menuActor']();}else{_0x368b27[_0x3cc5ba(0xe2)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x39e8a2=String(RegExp['$1']);_0x1e78e8['removeStatesByCategoryAll'](_0x39e8a2);}}}}{if('hrYed'!==_0x3cc5ba(0x1ff)){const _0x5a5d35=_0x37c76e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x5a5d35)for(const _0x139af3 of _0x5a5d35){_0x139af3[_0x3cc5ba(0xe2)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x1de6ed=String(RegExp['$1']),_0x443350=Number(RegExp['$2']);_0x1e78e8[_0x3cc5ba(0x234)](_0x1de6ed,_0x443350);}}else{if(!_0x58e480[_0x3cc5ba(0x265)](_0x22c6db))return!![];}}},Game_Action['prototype'][_0x13e91f(0x323)]=function(_0x449ba4){const _0x2c2416=_0x13e91f,_0x30dc80=this['item']()[_0x2c2416(0x98)],_0x51ff7d=_0x30dc80[_0x2c2416(0xe2)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x51ff7d){if('quLfU'!=='quLfU'){if(!_0x30806a[_0x2c2416(0x392)](_0x2998f0))return![];}else for(const _0xc50e9d of _0x51ff7d){let _0x8f05b6=0x0,_0x30a930=0x0;if(_0xc50e9d['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x2c2416(0xf3)===_0x2c2416(0xf3))_0x8f05b6=Number(RegExp['$1']),_0x30a930=Number(RegExp['$2']);else return this[_0x2c2416(0x351)](_0x14a984)>0x0;}else{if(_0xc50e9d[_0x2c2416(0xe2)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if(_0x2c2416(0x1a6)!==_0x2c2416(0x1a6)){const _0x2d9648=_0x51e10f[_0x2c2416(0x36a)]['Settings']['States'];if(!_0x2d9648)return;if(_0x2d9648[_0x2c2416(0x317)]===![])return;if(!this[_0x2c2416(0x210)])return;this['_subject']['updateStatesActionEnd']();}else _0x8f05b6=DataManager[_0x2c2416(0x12d)](RegExp['$1']),_0x30a930=Number(RegExp['$2']);}}_0x449ba4['setStateTurns'](_0x8f05b6,_0x30a930),this['makeSuccess'](_0x449ba4);}}const _0x29a843=_0x30dc80[_0x2c2416(0xe2)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x29a843)for(const _0x35d3ee of _0x29a843){if(_0x2c2416(0x211)===_0x2c2416(0x2fb)){if(!_0x2b416f['value'](_0x351db9))return!![];}else{let _0x58cc10=0x0,_0x3b10c8=0x0;if(_0x35d3ee['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x2c2416(0x227)!==_0x2c2416(0x227)){if(!_0x504ac5)return;_0x330301[_0x2c2416(0x214)]['drawActorIcons'][_0x2c2416(0x1c4)](this,_0x250812,_0x47bd83,_0x2b3298,_0x1a2d62);}else _0x58cc10=Number(RegExp['$1']),_0x3b10c8=Number(RegExp['$2']);}else _0x35d3ee[_0x2c2416(0xe2)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x58cc10=DataManager[_0x2c2416(0x12d)](RegExp['$1']),_0x3b10c8=Number(RegExp['$2']));_0x449ba4[_0x2c2416(0x38b)](_0x58cc10,_0x3b10c8),this['makeSuccess'](_0x449ba4);}}},Game_Action['prototype'][_0x13e91f(0x22d)]=function(_0x46f320){const _0x40ba9e=_0x13e91f,_0xa9c7a8=['MAXHP',_0x40ba9e(0x28f),_0x40ba9e(0x117),'DEF',_0x40ba9e(0x158),_0x40ba9e(0x341),_0x40ba9e(0x72),_0x40ba9e(0x146)],_0x199d4d=this[_0x40ba9e(0x80)]()[_0x40ba9e(0x98)],_0x4fe048=_0x199d4d['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x4fe048){if(_0x40ba9e(0x1a9)!==_0x40ba9e(0x284))for(const _0xfb02bd of _0x4fe048){_0xfb02bd[_0x40ba9e(0xe2)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4a0c81=_0xa9c7a8[_0x40ba9e(0x106)](String(RegExp['$1'])['toUpperCase']()),_0xb3cc49=Number(RegExp['$2']);_0x4a0c81>=0x0&&(_0x46f320[_0x40ba9e(0x175)](_0x4a0c81,_0xb3cc49),this[_0x40ba9e(0xd1)](_0x46f320));}else return _0xddb8e9;}const _0x21280c=_0x199d4d[_0x40ba9e(0xe2)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x21280c)for(const _0x5aa1b8 of _0x4fe048){_0x5aa1b8[_0x40ba9e(0xe2)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x52d339=_0xa9c7a8['indexOf'](String(RegExp['$1'])[_0x40ba9e(0x1b0)]()),_0x5474e3=Number(RegExp['$2']);_0x52d339>=0x0&&(_0x46f320['addBuffTurns'](_0x52d339,_0x5474e3),this[_0x40ba9e(0xd1)](_0x46f320));}},Game_Action[_0x13e91f(0x214)]['applyDebuffTurnManipulationEffects']=function(_0x227be4){const _0x4f51bf=_0x13e91f,_0x4c4452=['MAXHP','MAXMP',_0x4f51bf(0x117),_0x4f51bf(0x10d),_0x4f51bf(0x158),_0x4f51bf(0x341),'AGI',_0x4f51bf(0x146)],_0x69b20a=this[_0x4f51bf(0x80)]()[_0x4f51bf(0x98)],_0x252f36=_0x69b20a[_0x4f51bf(0xe2)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x252f36){if(_0x4f51bf(0x18a)===_0x4f51bf(0x17b)){if(!_0x56f88e[_0x4f51bf(0xd8)]())return![];}else for(const _0x502a3b of _0x252f36){if('ejppJ'!=='ejppJ')return this['statusWindowRectSkillsStatesCore']();else{_0x502a3b[_0x4f51bf(0xe2)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0xa927e7=_0x4c4452[_0x4f51bf(0x106)](String(RegExp['$1'])[_0x4f51bf(0x1b0)]()),_0x48f317=Number(RegExp['$2']);_0xa927e7>=0x0&&(_0x4f51bf(0x14c)===_0x4f51bf(0xd4)?_0x4d3081['categories']['push'](_0x43fb25[_0x4f51bf(0x1df)]()):(_0x227be4[_0x4f51bf(0x190)](_0xa927e7,_0x48f317),this[_0x4f51bf(0xd1)](_0x227be4)));}}}const _0x3f4a07=_0x69b20a[_0x4f51bf(0xe2)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3f4a07){if(_0x4f51bf(0x14b)!==_0x4f51bf(0x14b))_0x2474fe[_0x4f51bf(0x36a)][_0x4f51bf(0x385)]['Buffs'][_0x4f51bf(0x25a)][_0x4f51bf(0x1c4)](this,_0x241885);else for(const _0xd158f3 of _0x252f36){_0xd158f3[_0x4f51bf(0xe2)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0xbb002b=_0x4c4452[_0x4f51bf(0x106)](String(RegExp['$1'])['toUpperCase']()),_0x237f4b=Number(RegExp['$2']);_0xbb002b>=0x0&&(_0x227be4[_0x4f51bf(0x7a)](_0xbb002b,_0x237f4b),this[_0x4f51bf(0xd1)](_0x227be4));}}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x2c6)]=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x295)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x295)]=function(){const _0x5ecee=_0x13e91f;this[_0x5ecee(0x2db)]={},this[_0x5ecee(0x2b2)](),VisuMZ[_0x5ecee(0x36a)][_0x5ecee(0x2c6)][_0x5ecee(0x1c4)](this);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2b2)]=function(){const _0x103293=_0x13e91f;this['_stateRetainType']='',this[_0x103293(0x32d)]={},this['_stateDisplay']={},this[_0x103293(0xcc)]={};},Game_BattlerBase[_0x13e91f(0x214)]['checkCacheKey']=function(_0x4d0dc2){const _0x353e79=_0x13e91f;return this[_0x353e79(0x2db)]=this['_cache']||{},this[_0x353e79(0x2db)][_0x4d0dc2]!==undefined;},VisuMZ[_0x13e91f(0x36a)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x13e91f(0x214)]['refresh'],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x81)]=function(){const _0x88d96e=_0x13e91f;this['_cache']={},VisuMZ[_0x88d96e(0x36a)]['Game_BattlerBase_refresh'][_0x88d96e(0x1c4)](this);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x30a)]=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x198)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x198)]=function(_0x30b6df){const _0x160c5a=_0x13e91f;let _0x37ee89=this[_0x160c5a(0x1d2)](_0x30b6df);VisuMZ[_0x160c5a(0x36a)][_0x160c5a(0x30a)][_0x160c5a(0x1c4)](this,_0x30b6df);if(_0x37ee89&&!this[_0x160c5a(0x1d2)](_0x30b6df))this[_0x160c5a(0x28d)](_0x30b6df);},Game_BattlerBase['prototype']['onRemoveState']=function(_0x311272){const _0x22ed01=_0x13e91f;this[_0x22ed01(0xdc)](_0x311272),this['clearStateDisplay'](_0x311272),this[_0x22ed01(0x113)](_0x311272);},VisuMZ['SkillsStatesCore'][_0x13e91f(0x359)]=Game_BattlerBase['prototype'][_0x13e91f(0x1f1)],Game_BattlerBase[_0x13e91f(0x214)]['resetStateCounts']=function(_0x4bd7b4){const _0x3f7e4d=_0x13e91f,_0x304b8c=$dataStates[_0x4bd7b4],_0x47bf5e=this['stateTurns'](_0x4bd7b4),_0x523093=this[_0x3f7e4d(0x30c)](_0x304b8c)[_0x3f7e4d(0xd5)]()['trim']();switch(_0x523093){case'ignore':if(_0x47bf5e<=0x0)VisuMZ[_0x3f7e4d(0x36a)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x4bd7b4);break;case _0x3f7e4d(0x328):VisuMZ[_0x3f7e4d(0x36a)][_0x3f7e4d(0x359)][_0x3f7e4d(0x1c4)](this,_0x4bd7b4);break;case _0x3f7e4d(0x244):VisuMZ[_0x3f7e4d(0x36a)][_0x3f7e4d(0x359)][_0x3f7e4d(0x1c4)](this,_0x4bd7b4),this[_0x3f7e4d(0x2da)][_0x4bd7b4]=Math[_0x3f7e4d(0x2ca)](this[_0x3f7e4d(0x2da)][_0x4bd7b4],_0x47bf5e);break;case _0x3f7e4d(0x100):VisuMZ[_0x3f7e4d(0x36a)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x4bd7b4),this[_0x3f7e4d(0x2da)][_0x4bd7b4]+=_0x47bf5e;break;default:VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x3f7e4d(0x1c4)](this,_0x4bd7b4);break;}},Game_BattlerBase[_0x13e91f(0x214)]['getStateReapplyRulings']=function(_0x428e9c){const _0x2b6238=_0x13e91f,_0x4672ce=_0x428e9c['note'];if(_0x4672ce[_0x2b6238(0xe2)](/<REAPPLY RULES:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2b6238(0x13c)!==_0x2b6238(0x2d4))return VisuMZ['SkillsStatesCore'][_0x2b6238(0x385)][_0x2b6238(0x10a)][_0x2b6238(0x287)];else{if(_0x2c601f[_0x2b6238(0x140)]())_0x4221aa=this['convertGaugeTypeSkillsStatesCore'](_0x4a380a,_0x1a449a);this['placeExactGauge'](_0x664c47,_0x22797c,_0x1b8a06,_0x44a112);}}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0xc9)]=Game_BattlerBase['prototype'][_0x13e91f(0x1c2)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x1c2)]=function(_0x151c2c,_0x413194){const _0x148abc=_0x13e91f,_0x1ceeea=VisuMZ[_0x148abc(0x36a)]['Settings']['Buffs'][_0x148abc(0x287)],_0x39432e=this['buffTurns'](_0x151c2c);switch(_0x1ceeea){case _0x148abc(0x376):if(_0x39432e<=0x0)this[_0x148abc(0x199)][_0x151c2c]=_0x413194;break;case _0x148abc(0x328):this[_0x148abc(0x199)][_0x151c2c]=_0x413194;break;case _0x148abc(0x244):this[_0x148abc(0x199)][_0x151c2c]=Math[_0x148abc(0x2ca)](_0x39432e,_0x413194);break;case _0x148abc(0x100):this['_buffTurns'][_0x151c2c]+=_0x413194;break;default:VisuMZ['SkillsStatesCore'][_0x148abc(0xc9)][_0x148abc(0x1c4)](this,_0x151c2c,_0x413194);break;}const _0x368a1d=VisuMZ[_0x148abc(0x36a)][_0x148abc(0x385)][_0x148abc(0x379)]['MaxTurns'];this[_0x148abc(0x199)][_0x151c2c]=this[_0x148abc(0x199)][_0x151c2c][_0x148abc(0x2dd)](0x0,_0x368a1d);},Game_BattlerBase['prototype']['isGroupDefeatStateAffected']=function(){const _0xcae666=_0x13e91f;if(this['_cache'][_0xcae666(0xef)]!==undefined)return this[_0xcae666(0x2db)][_0xcae666(0xef)];this[_0xcae666(0x2db)][_0xcae666(0xef)]=![];const _0x26670f=this[_0xcae666(0x147)]();for(const _0x271ac1 of _0x26670f){if(!_0x271ac1)continue;if(_0x271ac1[_0xcae666(0x98)][_0xcae666(0xe2)](/<GROUP DEFEAT>/i)){if('hxdtF'===_0xcae666(0x16a)){this[_0xcae666(0x2db)][_0xcae666(0xef)]=!![];break;}else{const _0x366d10=_0x4c700a[_0xcae666(0xed)]('['+_0x4e0261['$1']['match'](/\d+/g)+']');for(const _0x286de1 of _0x366d10){if(_0xd2d715[_0xcae666(0x118)](_0x286de1))return![];}return!![];}}}return this[_0xcae666(0x2db)][_0xcae666(0xef)];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x20e)]=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x90)],Game_BattlerBase['prototype'][_0x13e91f(0x90)]=function(){const _0x3afb06=_0x13e91f;if(this['getStateRetainType']()!==''){if('EWAod'===_0x3afb06(0xe8))return _0x3d9d35[_0x3afb06(0x1d9)](_0x1cb85e)[_0x3afb06(0xbf)](this[_0x3afb06(0x2f3)]);else this[_0x3afb06(0x78)]();}else VisuMZ[_0x3afb06(0x36a)][_0x3afb06(0x20e)]['call'](this),this[_0x3afb06(0x2b2)]();},Game_Actor[_0x13e91f(0x214)]['clearStates']=function(){const _0x1cc9fb=_0x13e91f;this[_0x1cc9fb(0x11d)]=this['_stateSteps']||{},Game_Battler[_0x1cc9fb(0x214)]['clearStates']['call'](this);},Game_BattlerBase['prototype'][_0x13e91f(0x78)]=function(){const _0x3903f4=_0x13e91f,_0x2a7a43=this[_0x3903f4(0x147)]();for(const _0x5c586c of _0x2a7a43){if(_0x5c586c&&this[_0x3903f4(0x38d)](_0x5c586c))this[_0x3903f4(0x198)](_0x5c586c['id']);}this['_cache']={};},Game_BattlerBase['prototype'][_0x13e91f(0x38d)]=function(_0x46c417){const _0x4a93d9=_0x13e91f,_0x5618a2=this[_0x4a93d9(0x286)]();if(_0x5618a2!==''){const _0x591753=_0x46c417[_0x4a93d9(0x98)];if(_0x5618a2===_0x4a93d9(0x24e)&&_0x591753[_0x4a93d9(0xe2)](/<NO DEATH CLEAR>/i))return![];if(_0x5618a2===_0x4a93d9(0x2df)&&_0x591753[_0x4a93d9(0xe2)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x4a93d9(0x1d2)](_0x46c417['id']);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x286)]=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x288)]=function(_0x5c2740){const _0x25c823=_0x13e91f;this[_0x25c823(0x1ef)]=_0x5c2740;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2c3)]=function(){const _0x78707b=_0x13e91f;this[_0x78707b(0x1ef)]='';},VisuMZ['SkillsStatesCore'][_0x13e91f(0x2de)]=Game_BattlerBase[_0x13e91f(0x214)]['die'],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x1f9)]=function(){const _0x158115=_0x13e91f;this[_0x158115(0x288)](_0x158115(0x24e)),VisuMZ['SkillsStatesCore']['Game_BattlerBase_die'][_0x158115(0x1c4)](this),this[_0x158115(0x2c3)]();},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x2ef)]=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2af)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2af)]=function(){const _0x3bb84=_0x13e91f;this['setStateRetainType']('recover\x20all'),VisuMZ[_0x3bb84(0x36a)][_0x3bb84(0x2ef)][_0x3bb84(0x1c4)](this),this[_0x3bb84(0x2c3)]();},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x363)]=function(_0x2ab595){const _0x581df7=_0x13e91f;for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x581df7(0x249)]){const _0x2e9c8c=settings[_0x581df7(0x1ba)]['call'](this,_0x2ab595);if(!settings[_0x581df7(0xb8)][_0x581df7(0x1c4)](this,_0x2ab595,_0x2e9c8c))return![];}return!![];},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x298)]=function(_0xa1aba7){const _0x4a5a33=_0x13e91f;for(settings of VisuMZ[_0x4a5a33(0x36a)]['Settings'][_0x4a5a33(0x249)]){if(_0x4a5a33(0x23b)!==_0x4a5a33(0x23b)){const _0x41a226=_0x2171d3[_0x4a5a33(0xed)]('['+_0x381ae3['$1']['match'](/\d+/g)+']');for(const _0x4e8108 of _0x41a226){if(_0x3abedd[_0x4a5a33(0x392)](_0x4e8108))return!![];}return![];}else{const _0x4c4186=settings[_0x4a5a33(0x1ba)][_0x4a5a33(0x1c4)](this,_0xa1aba7);settings['PayJS'][_0x4a5a33(0x1c4)](this,_0xa1aba7,_0x4c4186);}}},VisuMZ['SkillsStatesCore'][_0x13e91f(0x8e)]=Game_BattlerBase[_0x13e91f(0x214)]['meetsSkillConditions'],Game_BattlerBase['prototype'][_0x13e91f(0x23e)]=function(_0x5d299a){const _0x20d291=_0x13e91f;if(!_0x5d299a)return![];if(!VisuMZ['SkillsStatesCore'][_0x20d291(0x8e)]['call'](this,_0x5d299a))return![];if(!this[_0x20d291(0x1ca)](_0x5d299a))return![];if(!this[_0x20d291(0x2bf)](_0x5d299a))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x5d299a))return![];return!![];},Game_BattlerBase[_0x13e91f(0x214)]['checkSkillConditionsNotetags']=function(_0x5b0402){const _0x1f1691=_0x13e91f;if(!this[_0x1f1691(0xd6)](_0x5b0402))return![];return!![];},Game_BattlerBase[_0x13e91f(0x214)]['checkSkillConditionsSwitchNotetags']=function(_0x3a7841){const _0x5387dc=_0x13e91f,_0x4e9fd3=_0x3a7841[_0x5387dc(0x98)];if(_0x4e9fd3[_0x5387dc(0xe2)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5387dc(0x2f0)===_0x5387dc(0x2f0)){const _0x5763e0=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x38f5fe of _0x5763e0){if(!$gameSwitches[_0x5387dc(0x118)](_0x38f5fe))return![];}return!![];}else{for(_0x2857f9 of _0x4742ab[_0x5387dc(0x36a)]['Settings'][_0x5387dc(0x249)]){if(_0x32747f[_0x5387dc(0x2f9)][_0x5387dc(0x1b0)]()==='TP')return _0x583674[_0x5387dc(0x1ba)]['call'](this,_0x1fbb51);}return _0x33edc6[_0x5387dc(0x36a)][_0x5387dc(0x266)]['call'](this,_0x5db26);}}if(_0x4e9fd3[_0x5387dc(0xe2)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53d147=JSON[_0x5387dc(0xed)]('['+RegExp['$1'][_0x5387dc(0xe2)](/\d+/g)+']');for(const _0x3deb69 of _0x53d147){if(!$gameSwitches[_0x5387dc(0x118)](_0x3deb69))return![];}return!![];}if(_0x4e9fd3[_0x5387dc(0xe2)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e7a27=JSON[_0x5387dc(0xed)]('['+RegExp['$1'][_0x5387dc(0xe2)](/\d+/g)+']');for(const _0x9ea376 of _0x5e7a27){if('bWpoE'!==_0x5387dc(0x2f6)){if($gameSwitches[_0x5387dc(0x118)](_0x9ea376))return!![];}else{const _0x4ee1db=_0x39cc07['CalcJS'][_0x5387dc(0x1c4)](this,_0x14cfbc);if(!_0x331087[_0x5387dc(0xb8)][_0x5387dc(0x1c4)](this,_0x90d98c,_0x4ee1db))return![];}}return![];}if(_0x4e9fd3['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5caf03=JSON[_0x5387dc(0xed)]('['+RegExp['$1'][_0x5387dc(0xe2)](/\d+/g)+']');for(const _0x4a57be of _0x5caf03){if(!$gameSwitches['value'](_0x4a57be))return!![];}return![];}if(_0x4e9fd3[_0x5387dc(0xe2)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5387dc(0x29d)!==_0x5387dc(0x278)){const _0x16b831=JSON[_0x5387dc(0xed)]('['+RegExp['$1'][_0x5387dc(0xe2)](/\d+/g)+']');for(const _0x1227dd of _0x16b831){if(!$gameSwitches[_0x5387dc(0x118)](_0x1227dd))return!![];}return![];}else this['_stateTurns'][_0x58bd29]--;}if(_0x4e9fd3['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5387dc(0x356)===_0x5387dc(0x1b3)){const _0x2868c8=this['mainCommandWidth'](),_0x5f156d=this[_0x5387dc(0x1be)](0x3,!![]),_0x10eb65=this[_0x5387dc(0x19e)]()?_0x3db17d[_0x5387dc(0xdf)]-_0x2868c8:0x0,_0x18dccf=this['mainAreaTop']();return new _0x1a31d8(_0x10eb65,_0x18dccf,_0x2868c8,_0x5f156d);}else{const _0x3c20fa=JSON['parse']('['+RegExp['$1'][_0x5387dc(0xe2)](/\d+/g)+']');for(const _0x23f788 of _0x3c20fa){if(_0x5387dc(0x1c8)===_0x5387dc(0xb0)){const _0x375800=_0x2c1fae[_0x5387dc(0xed)]('['+_0x550f2e['$1'][_0x5387dc(0xe2)](/\d+/g)+']');for(const _0x4bc0f0 of _0x375800){if(!_0x424280[_0x5387dc(0x118)](_0x4bc0f0))return!![];}return![];}else{if($gameSwitches[_0x5387dc(0x118)](_0x23f788))return![];}}return!![];}}return!![];},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2bf)]=function(_0x3a5938){const _0x5a36fe=_0x13e91f,_0x1c7f7d=_0x3a5938['note'],_0x3acbd8=VisuMZ[_0x5a36fe(0x36a)]['skillEnableJS'];return _0x3acbd8[_0x3a5938['id']]?'zRbhy'==='zRbhy'?_0x3acbd8[_0x3a5938['id']][_0x5a36fe(0x1c4)](this,_0x3a5938):_0x49c9d2[_0x5a36fe(0x2ec)][_0x5a36fe(0x8b)]===_0x25793f?_0x61af9e[_0x5a36fe(0x36a)]['Window_SkillList_maxCols'][_0x5a36fe(0x1c4)](this):_0x774601['SkillsStatesCore'][_0x5a36fe(0x385)]['Skills']['ListWindowCols']:!![];},Game_BattlerBase['prototype'][_0x13e91f(0x32c)]=function(_0x577a15){const _0x345143=_0x13e91f;return VisuMZ[_0x345143(0x36a)][_0x345143(0x385)]['Skills'][_0x345143(0x318)][_0x345143(0x1c4)](this,_0x577a15);},VisuMZ[_0x13e91f(0x36a)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x156)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x156)]=function(_0x4e0f35){const _0x38e3dc=_0x13e91f;for(settings of VisuMZ[_0x38e3dc(0x36a)][_0x38e3dc(0x385)][_0x38e3dc(0x249)]){if(settings['Name']['toUpperCase']()==='MP'){if(_0x38e3dc(0x246)!==_0x38e3dc(0x246))_0x17b946+=this[_0x38e3dc(0x197)](_0x1c6782),this[_0x38e3dc(0x7e)](_0x58a77d,_0x14d029);else return settings['CalcJS'][_0x38e3dc(0x1c4)](this,_0x4e0f35);}}return VisuMZ[_0x38e3dc(0x36a)][_0x38e3dc(0x159)][_0x38e3dc(0x1c4)](this,_0x4e0f35);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x266)]=Game_BattlerBase['prototype'][_0x13e91f(0x12b)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x12b)]=function(_0x32195d){const _0x27c264=_0x13e91f;for(settings of VisuMZ['SkillsStatesCore'][_0x27c264(0x385)][_0x27c264(0x249)]){if(_0x27c264(0x29c)===_0x27c264(0x121)){if(_0x1a29e2[_0x27c264(0x118)](_0x3caf9d))return!![];}else{if(settings[_0x27c264(0x2f9)][_0x27c264(0x1b0)]()==='TP'){if(_0x27c264(0x34c)!==_0x27c264(0x34c)){this[_0x27c264(0x303)](),this[_0x27c264(0x2e8)][_0x27c264(0xae)]();const _0x377a8b=this[_0x27c264(0x2d3)];if(!_0x377a8b)return;const _0x553642=_0x377a8b[_0x27c264(0x147)]()[_0x27c264(0x73)](_0x3e0011=>_0x3e0011[_0x27c264(0x99)]>0x0),_0x4078dd=[..._0x2080da(0x8)[_0x27c264(0x366)]()][_0x27c264(0x73)](_0x42149d=>_0x377a8b[_0x27c264(0x186)](_0x42149d)!==0x0),_0x352172=this[_0x27c264(0xa0)],_0x701531=_0x553642[_0x352172];if(_0x701531)_0x3867e1[_0x27c264(0x214)][_0x27c264(0x200)][_0x27c264(0x1c4)](this,_0x377a8b,_0x701531,0x0,0x0),_0x13cc6b[_0x27c264(0x214)][_0x27c264(0xf7)][_0x27c264(0x1c4)](this,_0x377a8b,_0x701531,0x0,0x0);else{const _0x192c71=_0x4078dd[_0x352172-_0x553642[_0x27c264(0xa3)]];if(_0x192c71===_0x42b046)return;_0x7cc60b[_0x27c264(0x214)][_0x27c264(0xb3)]['call'](this,_0x377a8b,_0x192c71,0x0,0x0),_0x2fc73a['prototype']['drawActorBuffRates']['call'](this,_0x377a8b,_0x192c71,0x0,0x0);}}else return settings[_0x27c264(0x1ba)][_0x27c264(0x1c4)](this,_0x32195d);}}}return VisuMZ[_0x27c264(0x36a)][_0x27c264(0x266)][_0x27c264(0x1c4)](this,_0x32195d);},Game_BattlerBase['prototype'][_0x13e91f(0x22f)]=function(_0x34d63a){const _0x4805a8=_0x13e91f;if(typeof _0x34d63a===_0x4805a8(0x1f4))_0x34d63a=$dataStates[_0x34d63a];return this['states']()[_0x4805a8(0xbf)](_0x34d63a);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x188)]=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x147)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x147)]=function(){const _0x4c422b=_0x13e91f;let _0x5cb930=VisuMZ['SkillsStatesCore'][_0x4c422b(0x188)]['call'](this);if($gameTemp[_0x4c422b(0x268)])return _0x5cb930;return $gameTemp[_0x4c422b(0x268)]=!![],this[_0x4c422b(0x115)](_0x5cb930),$gameTemp[_0x4c422b(0x268)]=undefined,_0x5cb930;},Game_BattlerBase[_0x13e91f(0x214)]['addPassiveStates']=function(_0x2e6a1d){const _0x259dca=_0x13e91f,_0x2aee7a=this[_0x259dca(0x142)]();for(state of _0x2aee7a){if('jukvQ'===_0x259dca(0x209)){this[_0x259dca(0xcc)]=this['_stateOrigin']||{};const _0x503e56=_0x467172?this['convertTargetToStateOriginKey'](_0x66041f):this['getCurrentStateOriginKey']();this[_0x259dca(0xcc)][_0x48e484]=_0x503e56;}else{if(!state)continue;if(!this[_0x259dca(0x23f)](state)&&_0x2e6a1d[_0x259dca(0xbf)](state))continue;_0x2e6a1d[_0x259dca(0x334)](state);}}_0x2aee7a['length']>0x0&&_0x2e6a1d[_0x259dca(0x150)]((_0x3617e8,_0x238d2c)=>{const _0x460f97=_0x259dca,_0x59bcd2=_0x3617e8[_0x460f97(0x383)],_0x59d138=_0x238d2c[_0x460f97(0x383)];if(_0x59bcd2!==_0x59d138){if(_0x460f97(0x243)!==_0x460f97(0x37b))return _0x59d138-_0x59bcd2;else{const _0x212fec=_0x2766a0[_0x460f97(0x12d)](_0x33ce47['$1']);if(_0x50b05b[_0x460f97(0x1d2)](_0x212fec))return!![];}}return _0x3617e8-_0x238d2c;});},Game_BattlerBase['prototype']['isPassiveStateStackable']=function(_0x2a516f){const _0x2f2486=_0x13e91f;return _0x2a516f[_0x2f2486(0x98)][_0x2f2486(0xe2)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x13e91f(0x36a)]['Game_BattlerBase_traitsSet']=Game_BattlerBase['prototype'][_0x13e91f(0x93)],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x93)]=function(_0x249ca4){const _0x3581f0=_0x13e91f;this[_0x3581f0(0xc1)]=!![];let _0xa91d61=VisuMZ[_0x3581f0(0x36a)][_0x3581f0(0x162)][_0x3581f0(0x1c4)](this,_0x249ca4);return this[_0x3581f0(0xc1)]=undefined,_0xa91d61;},Game_BattlerBase['prototype'][_0x13e91f(0x35e)]=function(){const _0x5dabcc=_0x13e91f;let _0x3a7a28=[];this[_0x5dabcc(0x1d8)]=this[_0x5dabcc(0x1d8)]||{};for(;;){if('SRfoH'!==_0x5dabcc(0x13f)){_0x3a7a28=[];let _0x3ad56=!![];for(const _0x1638a4 of this[_0x5dabcc(0x2db)]['passiveStates']){if(_0x5dabcc(0x36f)!==_0x5dabcc(0x36f)){const _0x17c21c=this[_0x5dabcc(0x2b1)]();this['resetFontSettings'](),this['drawParamText'](_0x252545,_0x278748,_0x44e824,_0x54d6ce,!![]),this['resetTextColor'](),this[_0x5dabcc(0x2e8)][_0x5dabcc(0x361)]-=0x8;const _0x186bbc=this[_0x5dabcc(0x8c)][_0x5dabcc(0x342)](_0x27b92a,!![]);this['contents'][_0x5dabcc(0x17f)](_0x186bbc,_0x227649,_0x1edd04,_0x2872cd,_0x17c21c,_0x5dabcc(0x1fa));}else{const _0x89fd4b=$dataStates[_0x1638a4];if(!_0x89fd4b)continue;let _0x46c967=this[_0x5dabcc(0x250)](_0x89fd4b);this[_0x5dabcc(0x1d8)][_0x1638a4]!==_0x46c967&&(_0x3ad56=![],this['_passiveStateResults'][_0x1638a4]=_0x46c967);if(!_0x46c967)continue;_0x3a7a28[_0x5dabcc(0x334)](_0x89fd4b);}}if(_0x3ad56){if(_0x5dabcc(0x1de)===_0x5dabcc(0x2d7))_0x2c3230['SkillsStatesCore'][_0x5dabcc(0x385)][_0x5dabcc(0x379)][_0x5dabcc(0x29a)][_0x5dabcc(0x1c4)](this,_0x501628);else break;}else{if('bAHZK'===_0x5dabcc(0xaf)){if(!this[_0x5dabcc(0xc1)])this['refresh']();this['createPassiveStatesCache']();}else{if(!_0x205001['SkillsStatesCore'][_0x5dabcc(0x385)]['Buffs']['ShowTurns'])return;const _0x16758a=_0x486eb5[_0x5dabcc(0x186)](_0x228c69);if(_0x16758a===0x0)return;const _0x1a28ce=_0x3053bb[_0x5dabcc(0x197)](_0x3ae594),_0x53d72c=_0x51d7f2[_0x5dabcc(0x184)],_0x21db9e=_0x16758a>0x0?_0x2a78f3[_0x5dabcc(0x2d2)]():_0x11aad2[_0x5dabcc(0x296)]();this[_0x5dabcc(0x160)](_0x21db9e),this[_0x5dabcc(0x1d3)]('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x5dabcc(0x365)]=!![],this['contents'][_0x5dabcc(0x361)]=_0x41bc33['SkillsStatesCore']['Settings'][_0x5dabcc(0x379)]['TurnFontSize'],_0xe49717+=_0x301a1b['SkillsStatesCore']['Settings'][_0x5dabcc(0x379)][_0x5dabcc(0x13a)],_0x2e6fe+=_0x29efcf['SkillsStatesCore'][_0x5dabcc(0x385)][_0x5dabcc(0x379)][_0x5dabcc(0x205)],this[_0x5dabcc(0x17f)](_0x1a28ce,_0x17831f,_0x4e92de,_0x53d72c,_0x5dabcc(0x1fa)),this[_0x5dabcc(0x2e8)]['fontBold']=![],this[_0x5dabcc(0x303)]();}}}else{const _0x342f5b=_0x4e10ef(_0x71a8d9['$1'])[_0x5dabcc(0x28a)](',')[_0x5dabcc(0x123)](_0x46c611=>_0x46c611[_0x5dabcc(0x1df)]()),_0x14c679=_0x5bafeb[_0x5dabcc(0x36a)][_0x5dabcc(0x2fd)](_0x342f5b);return _0x14c679['includes'](this['currentClass']());}}return _0x3a7a28;},Game_BattlerBase['prototype'][_0x13e91f(0x250)]=function(_0x598183){const _0x1fb424=_0x13e91f;if(!this[_0x1fb424(0xb4)](_0x598183))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x598183))return![];if(!this[_0x1fb424(0x216)](_0x598183))return![];if(!this['meetsPassiveStateGlobalConditionJS'](_0x598183))return![];return!![];},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0xb4)]=function(_0x5a3009){return!![];},Game_Actor[_0x13e91f(0x214)][_0x13e91f(0xb4)]=function(_0x149915){const _0x53f331=_0x13e91f,_0x2b38c7=_0x149915[_0x53f331(0x98)];if(_0x2b38c7[_0x53f331(0xe2)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x205e8b=String(RegExp['$1'])['split'](',')[_0x53f331(0x123)](_0xf165a=>_0xf165a['trim']()),_0x3cc6a9=VisuMZ[_0x53f331(0x36a)][_0x53f331(0x2fd)](_0x205e8b);return _0x3cc6a9[_0x53f331(0xbf)](this[_0x53f331(0xa5)]());}if(_0x2b38c7[_0x53f331(0xe2)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x45354b=String(RegExp['$1'])[_0x53f331(0x28a)](',')[_0x53f331(0x123)](_0x3539a1=>_0x3539a1[_0x53f331(0x1df)]()),_0x5c3320=VisuMZ[_0x53f331(0x36a)][_0x53f331(0x2fd)](_0x45354b);let _0x38aa65=[this[_0x53f331(0xa5)]()];if(Imported[_0x53f331(0x1aa)]&&this['multiclasses']){if('YhCgO'===_0x53f331(0x154)){const _0x5e87e8=_0x4a404b[_0x53f331(0x98)];return _0x5e87e8['match'](/<REAPPLY RULES:[ ](.*)>/i)?_0x200d1f(_0x1a6dda['$1']):_0x1625ce[_0x53f331(0x36a)][_0x53f331(0x385)][_0x53f331(0x10a)]['ReapplyRules'];}else _0x38aa65=this['multiclasses']();}return _0x5c3320[_0x53f331(0x73)](_0x530400=>_0x38aa65['includes'](_0x530400))['length']>0x0;}return Game_BattlerBase[_0x53f331(0x214)]['meetsPassiveStateConditionClasses']['call'](this,_0x149915);},VisuMZ[_0x13e91f(0x36a)]['ParseClassIDs']=function(_0x2f6dd8){const _0x5d6f59=_0x13e91f,_0x147cac=[];for(let _0xba365e of _0x2f6dd8){_0xba365e=(String(_0xba365e)||'')[_0x5d6f59(0x1df)]();const _0x2a5c87=/^\d+$/[_0x5d6f59(0x208)](_0xba365e);_0x2a5c87?_0x147cac[_0x5d6f59(0x334)](Number(_0xba365e)):_0x147cac[_0x5d6f59(0x334)](DataManager[_0x5d6f59(0x15b)](_0xba365e));}return _0x147cac[_0x5d6f59(0x123)](_0x5832b3=>$dataClasses[Number(_0x5832b3)])['remove'](null);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x386)]=function(_0x157860){const _0x385a48=_0x13e91f,_0x2aad58=_0x157860[_0x385a48(0x98)];if(_0x2aad58[_0x385a48(0xe2)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c94e4=JSON[_0x385a48(0xed)]('['+RegExp['$1'][_0x385a48(0xe2)](/\d+/g)+']');for(const _0x585845 of _0x3c94e4){if(_0x385a48(0x110)!==_0x385a48(0x7f)){if(!$gameSwitches[_0x385a48(0x118)](_0x585845))return![];}else this[_0x385a48(0x391)]();}return!![];}if(_0x2aad58[_0x385a48(0xe2)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b6b7a=JSON['parse']('['+RegExp['$1'][_0x385a48(0xe2)](/\d+/g)+']');for(const _0x32024b of _0x2b6b7a){if(!$gameSwitches[_0x385a48(0x118)](_0x32024b))return![];}return!![];}if(_0x2aad58['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x385a48(0x26a)!=='MDacT')return _0x346661(_0xbfe6c1['$1']);else{const _0xec76d2=JSON[_0x385a48(0xed)]('['+RegExp['$1'][_0x385a48(0xe2)](/\d+/g)+']');for(const _0x553002 of _0xec76d2){if(_0x385a48(0x13e)!=='YKtuO'){if($gameSwitches[_0x385a48(0x118)](_0x553002))return!![];}else return _0x52d6ec[_0x385a48(0x36a)][_0x385a48(0x385)][_0x385a48(0x305)][_0x385a48(0x2bb)];}return![];}}if(_0x2aad58['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x385a48(0xf1)!==_0x385a48(0xf1)){const _0x559a8a=_0x217751(_0x4ec87e['$1']),_0x297204=_0x15385f[_0x385a48(0x314)](_0x559a8a,_0x385a48(0xe4),0x1,_0x385a48(0x23a));_0x234af5[_0x385a48(0x36a)][_0x385a48(0x369)][_0x36b1bb['id']]=new _0x466cf2(_0x385a48(0x381),_0x297204);}else{const _0x16a2c6=JSON[_0x385a48(0xed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x47d88a of _0x16a2c6){if(_0x385a48(0x1bc)!==_0x385a48(0x1bc)){const _0x6e1772=_0x3e4324(_0x442b47['$1']),_0x33d8f3=_0x385a48(0xf8)['format'](_0x6e1772);_0x4679f1[_0x385a48(0x36a)][_0x385a48(0x264)][_0x1ef1d9['id']]=new _0x24b505(_0x385a48(0x320),_0x33d8f3);}else{if(!$gameSwitches[_0x385a48(0x118)](_0x47d88a))return!![];}}return![];}}if(_0x2aad58[_0x385a48(0xe2)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x459f16=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x197a48 of _0x459f16){if(!$gameSwitches['value'](_0x197a48))return!![];}return![];}if(_0x2aad58['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x385a48(0x76)!==_0x385a48(0x76)){const _0x2c868a=_0x25b8e5[_0x385a48(0xed)]('['+_0x1202de['$1'][_0x385a48(0xe2)](/\d+/g)+']');for(const _0x1cdd66 of _0x2c868a){if(_0x103cf1['value'](_0x1cdd66))return!![];}return![];}else{const _0x29edfa=JSON[_0x385a48(0xed)]('['+RegExp['$1'][_0x385a48(0xe2)](/\d+/g)+']');for(const _0x53b2b7 of _0x29edfa){if(_0x385a48(0x132)!=='RKeTh')this[_0x385a48(0x1ef)]='',this[_0x385a48(0x32d)]={},this[_0x385a48(0x2f8)]={},this[_0x385a48(0xcc)]={};else{if($gameSwitches[_0x385a48(0x118)](_0x53b2b7))return![];}}return!![];}}return!![];},Game_BattlerBase[_0x13e91f(0x214)]['meetsPassiveStateConditionJS']=function(_0x2b8a72){const _0x23dd4c=_0x13e91f,_0x167571=VisuMZ[_0x23dd4c(0x36a)][_0x23dd4c(0x264)];if(_0x167571[_0x2b8a72['id']]&&!_0x167571[_0x2b8a72['id']]['call'](this,_0x2b8a72))return![];return!![];},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x7b)]=function(_0x2811f6){const _0x2426b0=_0x13e91f;return VisuMZ['SkillsStatesCore'][_0x2426b0(0x385)]['PassiveStates'][_0x2426b0(0x178)][_0x2426b0(0x1c4)](this,_0x2811f6);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x142)]=function(){const _0x1c02bd=_0x13e91f;if(this[_0x1c02bd(0x2be)](_0x1c02bd(0x142)))return this[_0x1c02bd(0x35e)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x1c02bd(0x87)]=!![],this[_0x1c02bd(0x9e)](),this[_0x1c02bd(0x87)]=undefined,this[_0x1c02bd(0x35e)]();},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x9e)]=function(){const _0x2241a7=_0x13e91f;this[_0x2241a7(0x87)]=!![],this[_0x2241a7(0x2db)][_0x2241a7(0x142)]=[],this[_0x2241a7(0x349)](),this[_0x2241a7(0xe1)](),this[_0x2241a7(0x274)](),this[_0x2241a7(0x87)]=undefined;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x349)]=function(){const _0x13f8e7=_0x13e91f;if(Imported[_0x13f8e7(0x229)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x13e91f(0x214)]['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x13e91f(0x214)]['addPassiveStatesByNotetag']=function(){const _0x12265c=_0x13e91f,_0x3f3916=this[_0x12265c(0x1b5)]();for(const _0x1b4cc4 of _0x3f3916){if(_0x12265c(0x1ed)!==_0x12265c(0x1ed))this[_0x12265c(0x16f)][_0x12265c(0xe5)](this[_0x12265c(0x80)]());else{if(!_0x1b4cc4)continue;const _0x571134=_0x1b4cc4[_0x12265c(0x98)][_0x12265c(0xe2)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x571134)for(const _0x414c69 of _0x571134){_0x414c69['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x3c6138=RegExp['$1'];if(_0x3c6138['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x5dfdc6=JSON['parse']('['+RegExp['$1'][_0x12265c(0xe2)](/\d+/g)+']');this[_0x12265c(0x2db)][_0x12265c(0x142)]=this[_0x12265c(0x2db)]['passiveStates'][_0x12265c(0x225)](_0x5dfdc6);}else{const _0x24c1f8=_0x3c6138[_0x12265c(0x28a)](',');for(const _0x44934d of _0x24c1f8){if(_0x12265c(0x213)===_0x12265c(0x213)){const _0x3dfe6f=DataManager[_0x12265c(0x12d)](_0x44934d);if(_0x3dfe6f)this[_0x12265c(0x2db)][_0x12265c(0x142)][_0x12265c(0x334)](_0x3dfe6f);}else{if(!this[_0x12265c(0xc1)])this['refresh']();this[_0x12265c(0x9e)]();}}}}}}},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x274)]=function(){const _0x13a463=_0x13e91f,_0x42adb3=VisuMZ[_0x13a463(0x36a)]['Settings']['PassiveStates']['Global'];this['_cache'][_0x13a463(0x142)]=this[_0x13a463(0x2db)][_0x13a463(0x142)]['concat'](_0x42adb3);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x378)]=function(_0x17672f){const _0x4512f6=_0x13e91f;if(typeof _0x17672f!=='number')_0x17672f=_0x17672f['id'];return this[_0x4512f6(0x2da)][_0x17672f]||0x0;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x7e)]=function(_0x2ed656,_0x37b57d){const _0x4ade88=_0x13e91f;if(typeof _0x2ed656!==_0x4ade88(0x1f4))_0x2ed656=_0x2ed656['id'];if(this[_0x4ade88(0x1d2)](_0x2ed656)){if(_0x4ade88(0x352)!==_0x4ade88(0x352))return _0x1dffb4=_0xa362ac[_0x4ade88(0x2dd)](-0x2,0x2),_0x3dd35c[_0x4ade88(0x36a)]['Game_BattlerBase_buffIconIndex'][_0x4ade88(0x1c4)](this,_0x2fdbea,_0x304967);else{const _0x5b5a47=DataManager[_0x4ade88(0x319)](_0x2ed656);this[_0x4ade88(0x2da)][_0x2ed656]=_0x37b57d[_0x4ade88(0x2dd)](0x0,_0x5b5a47);if(this[_0x4ade88(0x2da)][_0x2ed656]<=0x0)this['removeState'](_0x2ed656);}}},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x38b)]=function(_0x4766a1,_0x5b0682){const _0x2a1d16=_0x13e91f;if(typeof _0x4766a1!==_0x2a1d16(0x1f4))_0x4766a1=_0x4766a1['id'];this['isStateAffected'](_0x4766a1)&&(_0x5b0682+=this[_0x2a1d16(0x378)](_0x4766a1),this[_0x2a1d16(0x7e)](_0x4766a1,_0x5b0682));},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x370)]=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0xa1)],Game_BattlerBase[_0x13e91f(0x214)]['eraseBuff']=function(_0x4ddbf4){const _0x2570b5=_0x13e91f,_0x598d00=this[_0x2570b5(0x193)][_0x4ddbf4];VisuMZ[_0x2570b5(0x36a)][_0x2570b5(0x370)]['call'](this,_0x4ddbf4);if(_0x598d00>0x0)this[_0x2570b5(0x1e5)](_0x4ddbf4);if(_0x598d00<0x0)this['onEraseDebuff'](_0x4ddbf4);},VisuMZ[_0x13e91f(0x36a)]['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x285)],Game_BattlerBase['prototype'][_0x13e91f(0x285)]=function(_0x1ee005){const _0x347b7a=_0x13e91f;VisuMZ[_0x347b7a(0x36a)]['Game_BattlerBase_increaseBuff'][_0x347b7a(0x1c4)](this,_0x1ee005);if(!this[_0x347b7a(0x315)](_0x1ee005))this[_0x347b7a(0xa1)](_0x1ee005);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_decreaseBuff']=Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0xbc)],Game_BattlerBase[_0x13e91f(0x214)]['decreaseBuff']=function(_0x439b95){const _0x27f566=_0x13e91f;VisuMZ[_0x27f566(0x36a)]['Game_BattlerBase_decreaseBuff'][_0x27f566(0x1c4)](this,_0x439b95);if(!this[_0x27f566(0x315)](_0x439b95))this[_0x27f566(0xa1)](_0x439b95);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x1e5)]=function(_0x305127){},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x149)]=function(_0x4dfe3d){},Game_BattlerBase[_0x13e91f(0x214)]['isMaxBuffAffected']=function(_0x1619ce){const _0x49869e=_0x13e91f;return this[_0x49869e(0x193)][_0x1619ce]===VisuMZ[_0x49869e(0x36a)]['Settings'][_0x49869e(0x379)]['StackBuffMax'];},Game_BattlerBase[_0x13e91f(0x214)]['isMaxDebuffAffected']=function(_0x32b70b){const _0x5413e=_0x13e91f;return this[_0x5413e(0x193)][_0x32b70b]===-VisuMZ[_0x5413e(0x36a)][_0x5413e(0x385)][_0x5413e(0x379)][_0x5413e(0x223)];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0xf4)]=Game_BattlerBase[_0x13e91f(0x214)]['buffIconIndex'],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2a2)]=function(_0xdeb09d,_0x4780b2){const _0x4f76a3=_0x13e91f;return _0xdeb09d=_0xdeb09d[_0x4f76a3(0x2dd)](-0x2,0x2),VisuMZ[_0x4f76a3(0x36a)][_0x4f76a3(0xf4)][_0x4f76a3(0x1c4)](this,_0xdeb09d,_0x4780b2);},Game_BattlerBase[_0x13e91f(0x214)]['paramBuffRate']=function(_0x47bc66){const _0x43d7a8=_0x13e91f,_0x442c5d=this[_0x43d7a8(0x193)][_0x47bc66];return VisuMZ[_0x43d7a8(0x36a)][_0x43d7a8(0x385)]['Buffs'][_0x43d7a8(0x145)][_0x43d7a8(0x1c4)](this,_0x47bc66,_0x442c5d);},Game_BattlerBase[_0x13e91f(0x214)]['buffTurns']=function(_0x468269){const _0x51b712=_0x13e91f;return this[_0x51b712(0x199)][_0x468269]||0x0;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x222)]=function(_0x470b47){const _0x427d41=_0x13e91f;return this[_0x427d41(0x197)](_0x470b47);},Game_BattlerBase['prototype'][_0x13e91f(0x175)]=function(_0x2d4be7,_0x32de6e){const _0x55612b=_0x13e91f;if(this[_0x55612b(0x135)](_0x2d4be7)){if('aFXOT'!==_0x55612b(0x2aa)){const _0x5c0728=_0xd04b0a[_0x55612b(0x36a)]['Settings'][_0x55612b(0x31d)][_0x55612b(0x1c3)];this[_0x55612b(0x2db)][_0x55612b(0x142)]=this[_0x55612b(0x2db)]['passiveStates'][_0x55612b(0x225)](_0x5c0728);}else{const _0x4bd281=VisuMZ[_0x55612b(0x36a)][_0x55612b(0x385)][_0x55612b(0x379)][_0x55612b(0x31e)];this[_0x55612b(0x199)][_0x2d4be7]=_0x32de6e[_0x55612b(0x2dd)](0x0,_0x4bd281);}}},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x20b)]=function(_0x1f9e3a,_0x32d9ba){const _0x3d6579=_0x13e91f;this['isBuffAffected'](_0x1f9e3a)&&(_0x32d9ba+=this[_0x3d6579(0x197)](stateId),this['setStateTurns'](_0x1f9e3a,_0x32d9ba));},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x190)]=function(_0x25e477,_0x5ce40f){const _0x20751f=_0x13e91f;if(this[_0x20751f(0x27e)](_0x25e477)){const _0x17bb68=VisuMZ[_0x20751f(0x36a)][_0x20751f(0x385)][_0x20751f(0x379)][_0x20751f(0x31e)];this[_0x20751f(0x199)][_0x25e477]=_0x5ce40f[_0x20751f(0x2dd)](0x0,_0x17bb68);}},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x7a)]=function(_0x1137f3,_0xe36168){const _0x1388d6=_0x13e91f;if(this[_0x1388d6(0x27e)](_0x1137f3)){if(_0x1388d6(0x2c0)===_0x1388d6(0x2c0))_0xe36168+=this[_0x1388d6(0x197)](stateId),this[_0x1388d6(0x7e)](_0x1137f3,_0xe36168);else{const _0x3a9e60=_0x3d05ec[_0x1388d6(0xed)]('['+_0x41adf2['$1'][_0x1388d6(0xe2)](/\d+/g)+']');for(const _0x2268e6 of _0x3a9e60){if(!_0x24afaf[_0x1388d6(0x392)](_0x2268e6))return![];}return!![];}}},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0xf2)]=function(_0x39b328){const _0x3c479b=_0x13e91f;if(typeof _0x39b328!=='number')_0x39b328=_0x39b328['id'];return this[_0x3c479b(0x32d)]=this[_0x3c479b(0x32d)]||{},this['_stateData'][_0x39b328]=this[_0x3c479b(0x32d)][_0x39b328]||{},this[_0x3c479b(0x32d)][_0x39b328];},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x101)]=function(_0x2a2f39,_0xddf51f){const _0x50fcab=_0x13e91f;if(typeof _0x2a2f39!=='number')_0x2a2f39=_0x2a2f39['id'];const _0x68f1c8=this[_0x50fcab(0xf2)](_0x2a2f39);return _0x68f1c8[_0xddf51f];},Game_BattlerBase[_0x13e91f(0x214)]['setStateData']=function(_0x3ad24d,_0x1a70fe,_0x34e054){if(typeof _0x3ad24d!=='number')_0x3ad24d=_0x3ad24d['id'];const _0x2cee18=this['stateData'](_0x3ad24d);_0x2cee18[_0x1a70fe]=_0x34e054;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0xdc)]=function(_0x257381){const _0x45c348=_0x13e91f;if(typeof _0x257381!==_0x45c348(0x1f4))_0x257381=_0x257381['id'];this[_0x45c348(0x32d)]=this['_stateData']||{},this[_0x45c348(0x32d)][_0x257381]={};},Game_BattlerBase[_0x13e91f(0x214)]['getStateDisplay']=function(_0x4f9529){const _0x482a73=_0x13e91f;if(typeof _0x4f9529!==_0x482a73(0x1f4))_0x4f9529=_0x4f9529['id'];return this[_0x482a73(0x2f8)]=this[_0x482a73(0x2f8)]||{},this[_0x482a73(0x2f8)][_0x4f9529]===undefined&&(this[_0x482a73(0x2f8)][_0x4f9529]=''),this[_0x482a73(0x2f8)][_0x4f9529];},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2c5)]=function(_0x205259,_0x40866a){const _0x47874d=_0x13e91f;if(typeof _0x205259!=='number')_0x205259=_0x205259['id'];this[_0x47874d(0x2f8)]=this[_0x47874d(0x2f8)]||{},this[_0x47874d(0x2f8)][_0x205259]=_0x40866a;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x2a8)]=function(_0x2fd971){const _0x2a08bb=_0x13e91f;if(typeof _0x2fd971!==_0x2a08bb(0x1f4))_0x2fd971=_0x2fd971['id'];this['_stateDisplay']=this[_0x2a08bb(0x2f8)]||{},this[_0x2a08bb(0x2f8)][_0x2fd971]='';},Game_BattlerBase['prototype'][_0x13e91f(0x206)]=function(_0x4c6fef){const _0x12daf2=_0x13e91f;if(typeof _0x4c6fef!==_0x12daf2(0x1f4))_0x4c6fef=_0x4c6fef['id'];this['_stateOrigin']=this[_0x12daf2(0xcc)]||{},this[_0x12daf2(0xcc)][_0x4c6fef]=this['_stateOrigin'][_0x4c6fef]||_0x12daf2(0x1e2);const _0x347155=this[_0x12daf2(0xcc)][_0x4c6fef];return this['getStateOriginByKey'](_0x347155);},Game_BattlerBase['prototype']['setStateOrigin']=function(_0x519597,_0x36ad7b){const _0x4072e4=_0x13e91f;this[_0x4072e4(0xcc)]=this[_0x4072e4(0xcc)]||{};const _0x5a865d=_0x36ad7b?this[_0x4072e4(0x168)](_0x36ad7b):this[_0x4072e4(0x35a)]();this[_0x4072e4(0xcc)][_0x519597]=_0x5a865d;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x113)]=function(_0x2fac06){const _0x375051=_0x13e91f;this['_stateOrigin']=this[_0x375051(0xcc)]||{},delete this[_0x375051(0xcc)][_0x2fac06];},Game_BattlerBase[_0x13e91f(0x214)]['getCurrentStateOriginKey']=function(){const _0x204a84=_0x13e91f,_0x37f335=this[_0x204a84(0x1c9)]();return this[_0x204a84(0x168)](_0x37f335);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x1c9)]=function(){const _0x316f17=_0x13e91f;if($gameParty[_0x316f17(0x16d)]()){if(BattleManager['_subject']){if('plPKP'==='plPKP')return BattleManager[_0x316f17(0x210)];else{const _0x5f02fc=_0x25cdad['SkillsStatesCore'][_0x316f17(0x264)];if(_0x5f02fc[_0x46c91f['id']]&&!_0x5f02fc[_0x3d108b['id']]['call'](this,_0x4e1811))return![];return!![];}}else{if(BattleManager[_0x316f17(0x32f)])return BattleManager[_0x316f17(0x32f)];}}else{const _0x53d9b1=SceneManager[_0x316f17(0x2ec)];if(![Scene_Map,Scene_Item]['includes'](_0x53d9b1['constructor']))return $gameParty[_0x316f17(0x22c)]();}return this;},Game_BattlerBase['prototype'][_0x13e91f(0x168)]=function(_0x575cd1){const _0x5db803=_0x13e91f;if(!_0x575cd1)return _0x5db803(0x1e2);if(_0x575cd1[_0x5db803(0x140)]())return _0x5db803(0x340)[_0x5db803(0x314)](_0x575cd1[_0x5db803(0x165)]());else{if('nJIGB'===_0x5db803(0x1f2))_0x33e3e8[_0x5db803(0x214)][_0x5db803(0x16c)]['call'](this,_0x1e165a);else{const _0x4a0167=_0x5db803(0x2c4)[_0x5db803(0x314)](_0x575cd1[_0x5db803(0x327)]()),_0x3f15ac=_0x5db803(0x112)[_0x5db803(0x314)](_0x575cd1['index']()),_0x49c300=_0x5db803(0x271)[_0x5db803(0x314)]($gameTroop[_0x5db803(0x1a4)]());return _0x5db803(0x337)[_0x5db803(0x314)](_0x4a0167,_0x3f15ac,_0x49c300);}}return _0x5db803(0x1e2);},Game_BattlerBase['prototype'][_0x13e91f(0x325)]=function(_0x2da446){const _0x4ba9a4=_0x13e91f;if(_0x2da446===_0x4ba9a4(0x1e2))return this;else{if(_0x2da446[_0x4ba9a4(0xe2)](/<actor-(\d+)>/i)){if(_0x4ba9a4(0x24d)!==_0x4ba9a4(0x24d)){const _0x4fa576=_0x4a756d[_0x4ba9a4(0xed)]('['+_0x1b26cf['$1'][_0x4ba9a4(0xe2)](/\d+/g)+']');for(const _0x407417 of _0x4fa576){if(!_0x22551b['hasSkill'](_0x407417))return!![];}return![];}else return $gameActors[_0x4ba9a4(0x28c)](Number(RegExp['$1']));}else{if($gameParty[_0x4ba9a4(0x16d)]()&&_0x2da446['match'](/<troop-(\d+)>/i)){if(_0x4ba9a4(0x224)!==_0x4ba9a4(0x224)){if(this[_0x4ba9a4(0x228)]||this['_tempBattler'])return;const _0x164bfa=_0x2b2881[_0x4ba9a4(0x36a)][_0x4ba9a4(0x126)];if(_0x164bfa[_0x448722])_0x164bfa[_0x586efe][_0x4ba9a4(0x1c4)](this,_0xf41c89);}else{const _0x1addb4=Number(RegExp['$1']);if(_0x1addb4===$gameTroop[_0x4ba9a4(0x1a4)]()){if('lqOKr'===_0x4ba9a4(0x33f)){if(_0x2da446['match'](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}else{const _0x16df17=_0x22d7b5['SkillsStatesCore'],_0x1513a6=['stateHpSlipDamageJS',_0x4ba9a4(0x185),_0x4ba9a4(0x21f),_0x4ba9a4(0x369),_0x4ba9a4(0x2e5),_0x4ba9a4(0x94)];for(const _0x5f11dc of _0x1513a6){_0x16df17[_0x5f11dc][_0x344291]&&_0x16df17[_0x5f11dc][_0xe343db][_0x4ba9a4(0x1c4)](this,_0x5eb5c0);}}}}}if(_0x2da446[_0x4ba9a4(0xe2)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0xe0)]=Game_Battler['prototype'][_0x13e91f(0x97)],Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x97)]=function(_0x2ea0fe){const _0x429da4=_0x13e91f,_0x2b055e=this[_0x429da4(0x2f7)](_0x2ea0fe);VisuMZ[_0x429da4(0x36a)][_0x429da4(0xe0)][_0x429da4(0x1c4)](this,_0x2ea0fe);if(_0x2b055e&&this[_0x429da4(0x22f)]($dataStates[_0x2ea0fe])){if(_0x429da4(0x2ce)!=='jfBIV')return _0x1580ec['SkillsStatesCore'][_0x429da4(0x385)]['PassiveStates']['PassiveConditionJS'][_0x429da4(0x1c4)](this,_0xc1014);else{this[_0x429da4(0x10f)](_0x2ea0fe);;}}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x169)]=Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x2f7)],Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x2f7)]=function(_0x46908d){const _0x3b469f=_0x13e91f,_0x4bde45=$dataStates[_0x46908d];if(_0x4bde45&&_0x4bde45[_0x3b469f(0x98)]['match'](/<NO DEATH CLEAR>/i)){if('JOrgm'===_0x3b469f(0xc8)){const _0x588908=_0x49e399(_0x2abc71['$1']),_0x521177=_0xdc1ad[_0x3b469f(0x314)](_0x588908);_0x211302[_0x3b469f(0x36a)][_0x3b469f(0x126)][_0x562e42['id']]=new _0x4dad6b(_0x3b469f(0x381),_0x521177);}else return!this['isStateResist'](_0x46908d)&&!this[_0x3b469f(0x196)](_0x46908d)&&!this[_0x3b469f(0xab)][_0x3b469f(0x166)](_0x46908d);}return VisuMZ['SkillsStatesCore'][_0x3b469f(0x169)][_0x3b469f(0x1c4)](this,_0x46908d);},Game_Battler['prototype']['onAddState']=function(_0x485847){const _0x2bbd1e=_0x13e91f;this['setStateOrigin'](_0x485847),this[_0x2bbd1e(0x289)](_0x485847),this[_0x2bbd1e(0xc7)](_0x485847),this[_0x2bbd1e(0xc3)](_0x485847),this[_0x2bbd1e(0x362)](_0x485847);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x28d)]=function(_0x1a6176){const _0x9936c0=_0x13e91f;Game_BattlerBase[_0x9936c0(0x214)][_0x9936c0(0x28d)][_0x9936c0(0x1c4)](this,_0x1a6176),this[_0x9936c0(0x29f)](_0x1a6176),this[_0x9936c0(0x384)](_0x1a6176);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x272)]=function(_0x39e7aa){const _0x51398a=_0x13e91f;for(const _0x488b6e of this[_0x51398a(0x147)]()){this[_0x51398a(0xa6)](_0x488b6e['id'])&&_0x488b6e['autoRemovalTiming']===_0x39e7aa&&(_0x51398a(0x103)===_0x51398a(0x103)?(this[_0x51398a(0x267)](_0x488b6e['id']),this[_0x51398a(0x2b6)](_0x488b6e['id']),this[_0x51398a(0x1d4)](_0x488b6e['id'])):this[_0x51398a(0x2da)][_0x188b18]--);}},Game_Battler['prototype']['onExpireState']=function(_0x36de69){const _0x2a1817=_0x13e91f;this[_0x2a1817(0xce)](_0x36de69);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0xc3)]=function(_0x9e305b){const _0x16b5ae=_0x13e91f;if(this[_0x16b5ae(0x228)]||this[_0x16b5ae(0x2cd)])return;const _0x106b20=VisuMZ[_0x16b5ae(0x36a)][_0x16b5ae(0x19a)];if(_0x106b20[_0x9e305b])_0x106b20[_0x9e305b]['call'](this,_0x9e305b);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x29f)]=function(_0x1cf33a){const _0x2108c2=_0x13e91f;if(this[_0x2108c2(0x228)]||this[_0x2108c2(0x2cd)])return;const _0x54fc94=VisuMZ[_0x2108c2(0x36a)]['stateEraseJS'];if(_0x54fc94[_0x1cf33a])_0x54fc94[_0x1cf33a][_0x2108c2(0x1c4)](this,_0x1cf33a);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0xce)]=function(_0x141e30){const _0x4b2967=_0x13e91f;if(this['_tempActor']||this[_0x4b2967(0x2cd)])return;const _0x5614c9=VisuMZ[_0x4b2967(0x36a)][_0x4b2967(0x33e)];if(_0x5614c9[_0x141e30])_0x5614c9[_0x141e30]['call'](this,_0x141e30);},Game_Battler['prototype']['onAddStateGlobalJS']=function(_0x16f697){const _0x1bb017=_0x13e91f;if(this['_tempActor']||this[_0x1bb017(0x2cd)])return;try{VisuMZ[_0x1bb017(0x36a)]['Settings'][_0x1bb017(0x10a)][_0x1bb017(0x353)][_0x1bb017(0x1c4)](this,_0x16f697);}catch(_0x743ffb){if(_0x1bb017(0x292)!=='rxABg'){if($gameTemp[_0x1bb017(0x24b)]())console[_0x1bb017(0x2f5)](_0x743ffb);}else this[_0x1bb017(0xde)](_0x4ce75c,_0x245199,_0x22b82c,_0x153792),_0x130b1b++,_0x386a1b%0x2===0x0?(_0x57e26b=_0x2f344e,_0x19f3b9+=_0x416730):_0x40f1ea+=_0x382f34+0x18;}},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x384)]=function(_0x3f75b1){const _0x480b97=_0x13e91f;if(this['_tempActor']||this[_0x480b97(0x2cd)])return;try{VisuMZ[_0x480b97(0x36a)][_0x480b97(0x385)][_0x480b97(0x10a)][_0x480b97(0xac)]['call'](this,_0x3f75b1);}catch(_0x27dae2){if($gameTemp[_0x480b97(0x24b)]())console[_0x480b97(0x2f5)](_0x27dae2);}},Game_Battler[_0x13e91f(0x214)]['onExpireStateGlobalJS']=function(_0x1dbcb3){const _0x54b7f6=_0x13e91f;if(this[_0x54b7f6(0x228)]||this[_0x54b7f6(0x2cd)])return;try{_0x54b7f6(0x204)!==_0x54b7f6(0x204)?(this['applyStateCategoryRemovalEffects'](_0x54fd6f),this[_0x54b7f6(0x323)](_0x4eb6ec),this[_0x54b7f6(0x22d)](_0x530b01),this['applyDebuffTurnManipulationEffects'](_0x3dcfd9)):VisuMZ[_0x54b7f6(0x36a)][_0x54b7f6(0x385)][_0x54b7f6(0x10a)]['onExpireStateJS'][_0x54b7f6(0x1c4)](this,_0x1dbcb3);}catch(_0x97a80d){if(_0x54b7f6(0x2a9)===_0x54b7f6(0x102))this[_0x54b7f6(0x2e8)]['fontFace']=_0x40702c[_0x54b7f6(0x91)](),this[_0x54b7f6(0x2e8)][_0x54b7f6(0x361)]=_0x301446[_0x54b7f6(0x316)](),this[_0x54b7f6(0x1c1)]();else{if($gameTemp[_0x54b7f6(0x24b)]())console[_0x54b7f6(0x2f5)](_0x97a80d);}}},Game_Battler['prototype'][_0x13e91f(0x174)]=function(_0x377cdc){const _0x49630a=_0x13e91f;return _0x377cdc=_0x377cdc['toUpperCase']()[_0x49630a(0x1df)](),this['states']()[_0x49630a(0x73)](_0x4749e4=>_0x4749e4[_0x49630a(0x1b7)][_0x49630a(0xbf)](_0x377cdc));},Game_Battler['prototype'][_0x13e91f(0x234)]=function(_0x101899,_0x150291){const _0x2e2abc=_0x13e91f;_0x101899=_0x101899[_0x2e2abc(0x1b0)]()[_0x2e2abc(0x1df)](),_0x150291=_0x150291||0x0;const _0x26ce1e=this['statesByCategory'](_0x101899),_0x373eeb=[];for(const _0x592162 of _0x26ce1e){if(_0x2e2abc(0x2ac)==='QGbTa')_0x536c9f+=_0x5d569b+0x18;else{if(!_0x592162)continue;if(_0x150291<=0x0)return;_0x373eeb[_0x2e2abc(0x334)](_0x592162['id']),this[_0x2e2abc(0xab)][_0x2e2abc(0x88)]=!![],_0x150291--;}}while(_0x373eeb[_0x2e2abc(0xa3)]>0x0){this[_0x2e2abc(0x267)](_0x373eeb[_0x2e2abc(0x9d)]());}},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x34d)]=function(_0x58450f,_0x556ff8){const _0x7dfe43=_0x13e91f;_0x58450f=_0x58450f[_0x7dfe43(0x1b0)]()[_0x7dfe43(0x1df)](),_0x556ff8=_0x556ff8||[];const _0x4d8770=this[_0x7dfe43(0x174)](_0x58450f),_0x1fcd36=[];for(const _0x92a46e of _0x4d8770){if('DZNNj'===_0x7dfe43(0xaa)){if(!_0x92a46e)continue;if(_0x556ff8['includes'](_0x92a46e))continue;_0x1fcd36[_0x7dfe43(0x334)](_0x92a46e['id']),this[_0x7dfe43(0xab)][_0x7dfe43(0x88)]=!![];}else{if(_0x3bcaeb[_0x7dfe43(0x24b)]())_0xd45ef6[_0x7dfe43(0x2f5)](_0x3d3774);}}while(_0x1fcd36[_0x7dfe43(0xa3)]>0x0){if(_0x7dfe43(0x322)!==_0x7dfe43(0x322)){const _0x480edc=this[_0x7dfe43(0x326)](_0x4f0ae5);if(_0x480edc[_0x7dfe43(0xe2)](/\\I\[(\d+)\]/i)){const _0x6072fe=this[_0x7dfe43(0x37f)](_0x4b858b),_0x42edbd=this[_0x7dfe43(0x28e)](_0x480edc)[_0x7dfe43(0xc4)];return _0x42edbd<=_0x6072fe[_0x7dfe43(0xc4)]?'iconText':'icon';}}else this[_0x7dfe43(0x267)](_0x1fcd36['shift']());}},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0xb1)]=function(_0xc31a70){const _0x8ffbeb=_0x13e91f;return this[_0x8ffbeb(0x351)](_0xc31a70)>0x0;},Game_Battler['prototype'][_0x13e91f(0x35c)]=function(_0x52ebca){const _0x15e457=_0x13e91f;return this[_0x15e457(0x167)](_0x52ebca)>0x0;},Game_Battler['prototype']['totalStateCategoryAffected']=function(_0x53b4e0){const _0x2553aa=_0x13e91f,_0x1b9c33=this[_0x2553aa(0x174)](_0x53b4e0)[_0x2553aa(0x73)](_0x2c5d46=>this['isStateAffected'](_0x2c5d46['id']));return _0x1b9c33[_0x2553aa(0xa3)];},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x167)]=function(_0x3d0e0a){const _0x6ee1c6=_0x13e91f,_0x39205a=this[_0x6ee1c6(0x174)](_0x3d0e0a);return _0x39205a['length'];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0xda)]=Game_BattlerBase[_0x13e91f(0x214)]['isStateResist'],Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0xdb)]=function(_0x599bb6){const _0x4ce1b3=_0x13e91f,_0x4c7663=$dataStates[_0x599bb6];if(_0x4c7663&&_0x4c7663[_0x4ce1b3(0x1b7)][_0x4ce1b3(0xa3)]>0x0){if(_0x4ce1b3(0x1b2)===_0x4ce1b3(0x1b2))for(const _0x534b19 of _0x4c7663['categories']){if(this[_0x4ce1b3(0x9b)](_0x534b19))return!![];}else _0xbd1ff0[_0x4ce1b3(0x25f)]=_0x5636db[_0x4ce1b3(0x25f)][_0x4ce1b3(0x260)](/\\V\[(\d+)\]/gi,(_0x39a194,_0x42af01)=>_0x2d5dcb[_0x4ce1b3(0x118)](_0x25d181(_0x42af01)));}return VisuMZ[_0x4ce1b3(0x36a)][_0x4ce1b3(0xda)][_0x4ce1b3(0x1c4)](this,_0x599bb6);},Game_BattlerBase[_0x13e91f(0x214)]['isStateCategoryResisted']=function(_0x19a321){const _0x402d52=_0x13e91f;let _0x24fe36=_0x402d52(0x38c);if(this['checkCacheKey'](_0x24fe36))return this[_0x402d52(0x2db)][_0x24fe36]['includes'](_0x19a321);return this[_0x402d52(0x2db)][_0x24fe36]=this[_0x402d52(0x308)](),this['_cache'][_0x24fe36][_0x402d52(0xbf)](_0x19a321);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x308)]=function(){const _0x49a8c0=_0x13e91f,_0x5c3a2f=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x51320a=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x1234a2=[];for(const _0x45e68c of this[_0x49a8c0(0xee)]()){if(!_0x45e68c)continue;const _0x23982a=_0x45e68c['note'],_0x39424c=_0x23982a[_0x49a8c0(0xe2)](_0x5c3a2f);if(_0x39424c)for(const _0x4f7ce7 of _0x39424c){if(_0x49a8c0(0x1cc)===_0x49a8c0(0x1cc)){_0x4f7ce7[_0x49a8c0(0xe2)](_0x5c3a2f);const _0x5a4a02=String(RegExp['$1'])[_0x49a8c0(0x28a)](',')[_0x49a8c0(0x123)](_0x7c6b85=>String(_0x7c6b85)[_0x49a8c0(0x1b0)]()['trim']());_0x1234a2=_0x1234a2['concat'](_0x5a4a02);}else return this[_0x49a8c0(0x199)][_0x1e812c]||0x0;}if(_0x23982a[_0x49a8c0(0xe2)](_0x51320a)){const _0xdd34c2=String(RegExp['$1'])[_0x49a8c0(0x28a)](/[\r\n]+/)[_0x49a8c0(0x123)](_0x28a713=>String(_0x28a713)[_0x49a8c0(0x1b0)]()['trim']());_0x1234a2=_0x1234a2[_0x49a8c0(0x225)](_0xdd34c2);}}return _0x1234a2;},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x289)]=function(_0x4cf7d0){const _0x7cb351=_0x13e91f,_0x148806=$dataStates[_0x4cf7d0];if(!_0x148806)return;const _0x11847c=_0x148806[_0x7cb351(0x98)]||'',_0x5e268d=_0x11847c[_0x7cb351(0xe2)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x5e268d){const _0x5c1dec=[_0x148806];for(const _0xed610b of _0x5e268d){_0xed610b['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x322b10=String(RegExp['$1']);this[_0x7cb351(0x34d)](_0x322b10,_0x5c1dec);}}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x24a)]=Game_Battler['prototype'][_0x13e91f(0x336)],Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x336)]=function(_0x49b1af,_0x56b826){const _0x368716=_0x13e91f;VisuMZ[_0x368716(0x36a)]['Game_Battler_addBuff']['call'](this,_0x49b1af,_0x56b826),this[_0x368716(0x135)](_0x49b1af)&&('LCnPN'===_0x368716(0x131)?this[_0x368716(0x1f6)](_0x49b1af,_0x56b826):(this['recalculateSlipDamageJS'](),_0x328385[_0x368716(0x36a)][_0x368716(0x36b)]['call'](this),this[_0x368716(0x1f7)](),this[_0x368716(0x293)]()));},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x36e)]=function(_0x220d7f){},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x31c)]=Game_Battler[_0x13e91f(0x214)]['addDebuff'],Game_Battler[_0x13e91f(0x214)][_0x13e91f(0xb5)]=function(_0x81576a,_0x1ada0e){const _0x13ba2a=_0x13e91f;VisuMZ[_0x13ba2a(0x36a)]['Game_Battler_addDebuff'][_0x13ba2a(0x1c4)](this,_0x81576a,_0x1ada0e),this[_0x13ba2a(0x27e)](_0x81576a)&&this[_0x13ba2a(0x12f)](_0x81576a,_0x1ada0e);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x176)]=function(){const _0x210fdd=_0x13e91f;for(let _0x4ac1f0=0x0;_0x4ac1f0<this[_0x210fdd(0x134)]();_0x4ac1f0++){if(this[_0x210fdd(0x331)](_0x4ac1f0)){const _0x1cbd74=this[_0x210fdd(0x193)][_0x4ac1f0];this['removeBuff'](_0x4ac1f0);if(_0x1cbd74>0x0)this['onExpireBuff'](_0x4ac1f0);if(_0x1cbd74<0x0)this[_0x210fdd(0x258)](_0x4ac1f0);}}},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x1f6)]=function(_0x1566e5,_0x1c7e95){this['onAddBuffGlobalJS'](_0x1566e5,_0x1c7e95);},Game_Battler['prototype'][_0x13e91f(0x12f)]=function(_0x307655,_0x514301){const _0x2db7a6=_0x13e91f;this[_0x2db7a6(0x155)](_0x307655,_0x514301);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x1e5)]=function(_0x6758e7){const _0x5e08e9=_0x13e91f;Game_BattlerBase[_0x5e08e9(0x214)][_0x5e08e9(0x1e5)][_0x5e08e9(0x1c4)](this,_0x6758e7),this[_0x5e08e9(0x12e)](_0x6758e7);},Game_Battler['prototype'][_0x13e91f(0x149)]=function(_0x2130b3){const _0x416bbb=_0x13e91f;Game_BattlerBase[_0x416bbb(0x214)]['onEraseDebuff'][_0x416bbb(0x1c4)](this,_0x2130b3),this[_0x416bbb(0x75)](_0x2130b3);},Game_Battler[_0x13e91f(0x214)]['onExpireBuff']=function(_0x18a3fa){this['onExpireBuffGlobalJS'](_0x18a3fa);},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x258)]=function(_0x58c53f){const _0x203958=_0x13e91f;this[_0x203958(0x12c)](_0x58c53f);},Game_Battler[_0x13e91f(0x214)]['onAddBuffGlobalJS']=function(_0x4dbbbc,_0x3feac8){const _0x1dd449=_0x13e91f;VisuMZ[_0x1dd449(0x36a)][_0x1dd449(0x385)][_0x1dd449(0x379)][_0x1dd449(0x389)][_0x1dd449(0x1c4)](this,_0x4dbbbc,_0x3feac8);},Game_Battler[_0x13e91f(0x214)]['onAddDebuffGlobalJS']=function(_0x10f01a,_0x3d941b){const _0x3d0688=_0x13e91f;VisuMZ[_0x3d0688(0x36a)][_0x3d0688(0x385)][_0x3d0688(0x379)][_0x3d0688(0x27d)][_0x3d0688(0x1c4)](this,_0x10f01a,_0x3d941b);},Game_BattlerBase[_0x13e91f(0x214)][_0x13e91f(0x12e)]=function(_0x4e1100){const _0xb30d93=_0x13e91f;VisuMZ[_0xb30d93(0x36a)][_0xb30d93(0x385)][_0xb30d93(0x379)][_0xb30d93(0x29a)][_0xb30d93(0x1c4)](this,_0x4e1100);},Game_BattlerBase['prototype'][_0x13e91f(0x75)]=function(_0x2df19b){const _0x1f84c4=_0x13e91f;VisuMZ[_0x1f84c4(0x36a)][_0x1f84c4(0x385)][_0x1f84c4(0x379)][_0x1f84c4(0x290)]['call'](this,_0x2df19b);},Game_Battler[_0x13e91f(0x214)]['onExpireBuffGlobalJS']=function(_0x398072){const _0x1cc782=_0x13e91f;VisuMZ[_0x1cc782(0x36a)][_0x1cc782(0x385)][_0x1cc782(0x379)][_0x1cc782(0x25a)][_0x1cc782(0x1c4)](this,_0x398072);},Game_Battler[_0x13e91f(0x214)]['onExpireDebuffGlobalJS']=function(_0x1cbdb2){const _0x29bc91=_0x13e91f;VisuMZ[_0x29bc91(0x36a)][_0x29bc91(0x385)][_0x29bc91(0x379)][_0x29bc91(0x242)]['call'](this,_0x1cbdb2);},Game_Battler['prototype'][_0x13e91f(0xc7)]=function(_0x41fdf7){const _0x18a702=_0x13e91f,_0x49344c=VisuMZ[_0x18a702(0x36a)],_0x736ea4=['stateHpSlipDamageJS',_0x18a702(0x185),_0x18a702(0x21f),_0x18a702(0x369),_0x18a702(0x2e5),'stateTpSlipHealJS'];for(const _0x3395e3 of _0x736ea4){if(_0x18a702(0x24c)!==_0x18a702(0x218))_0x49344c[_0x3395e3][_0x41fdf7]&&_0x49344c[_0x3395e3][_0x41fdf7][_0x18a702(0x1c4)](this,_0x41fdf7);else return!![];}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x36b)]=Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x277)],Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x277)]=function(){const _0x3eda22=_0x13e91f;this[_0x3eda22(0x17d)](),VisuMZ[_0x3eda22(0x36a)][_0x3eda22(0x36b)]['call'](this),this[_0x3eda22(0x1f7)](),this[_0x3eda22(0x293)]();},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x1f7)]=function(){const _0x420ea2=_0x13e91f;for(const _0x343e54 of this[_0x420ea2(0x142)]()){if(_0x420ea2(0xcd)!==_0x420ea2(0xcd)){const _0x55d763=_0x331bcf['CoreEngine'][_0x420ea2(0x385)][_0x420ea2(0x301)][_0x420ea2(0x7c)],_0x1172e1=_0x5b2b32[_0x420ea2(0x141)](_0x333fab/0x2)-0x18;let _0x34883d=_0x2ab5b3,_0x2a510c=_0x556d68[_0x420ea2(0x141)]((this['innerHeight']-_0x1d5325[_0x420ea2(0x29b)](_0x55d763['length']/0x2)*_0x46aef0)/0x2),_0x30eb2c=0x0;for(const _0x541a03 of _0x55d763){this[_0x420ea2(0xde)](_0x34883d,_0x2a510c,_0x1172e1,_0x541a03),_0x30eb2c++,_0x30eb2c%0x2===0x0?(_0x34883d=_0xf3a1cc,_0x2a510c+=_0x45338f):_0x34883d+=_0x1172e1+0x18;}}else{if(!_0x343e54)continue;this[_0x420ea2(0xc7)](_0x343e54['id']);}}},Game_Battler['prototype'][_0x13e91f(0x17d)]=function(){const _0x45f8b6=_0x13e91f;for(const _0x599763 of this['states']()){if(!_0x599763)continue;_0x599763[_0x45f8b6(0x98)]['match'](/<JS SLIP REFRESH>/i)&&this[_0x45f8b6(0xc7)](_0x599763['id']);}},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x293)]=function(){const _0x3227b7=_0x13e91f;if(!this[_0x3227b7(0x291)]())return;const _0x936fc8=this[_0x3227b7(0x147)]();for(const _0x512ee2 of _0x936fc8){if(!_0x512ee2)continue;this[_0x3227b7(0x1a3)](_0x512ee2);}},Game_Battler[_0x13e91f(0x214)][_0x13e91f(0x1a3)]=function(_0x336790){const _0x1787e5=_0x13e91f,_0x5af6b6=this['getStateData'](_0x336790['id'],_0x1787e5(0x372))||0x0,_0x1d84f8=-this[_0x1787e5(0x306)](),_0x130a99=Math['max'](_0x5af6b6,_0x1d84f8);if(_0x130a99!==0x0)this[_0x1787e5(0x1e7)](_0x130a99);const _0x2a170f=this['getStateData'](_0x336790['id'],_0x1787e5(0x23a))||0x0;if(_0x2a170f!==0x0)this[_0x1787e5(0xfc)](_0x2a170f);const _0x405587=this[_0x1787e5(0x101)](_0x336790['id'],_0x1787e5(0x19d))||0x0;if(_0x405587!==0x0)this[_0x1787e5(0x18b)](_0x405587);},VisuMZ['SkillsStatesCore'][_0x13e91f(0xbb)]=Game_Actor[_0x13e91f(0x214)]['skillTypes'],Game_Actor['prototype'][_0x13e91f(0x2dc)]=function(){const _0xf1cc70=_0x13e91f,_0x497c5b=VisuMZ[_0xf1cc70(0x36a)]['Game_Actor_skillTypes'][_0xf1cc70(0x1c4)](this),_0x51cb5e=VisuMZ['SkillsStatesCore'][_0xf1cc70(0x385)]['Skills'];let _0x205617=_0x51cb5e['HiddenSkillTypes'];return $gameParty[_0xf1cc70(0x16d)]()&&(_0x205617=_0x205617[_0xf1cc70(0x225)](_0x51cb5e[_0xf1cc70(0x11e)])),_0x497c5b['filter'](_0x143343=>!_0x205617[_0xf1cc70(0xbf)](_0x143343));},Game_Actor['prototype'][_0x13e91f(0x26d)]=function(){const _0x2c8fe5=_0x13e91f;return this[_0x2c8fe5(0x217)]()[_0x2c8fe5(0x73)](_0x20ecf7=>this[_0x2c8fe5(0x191)](_0x20ecf7));},Game_Actor[_0x13e91f(0x214)][_0x13e91f(0x191)]=function(_0x1c1688){const _0x11b8c3=_0x13e91f;if(!this['canUse'](_0x1c1688))return![];if(!_0x1c1688)return![];if(!this['isSkillTypeMatchForUse'](_0x1c1688))return![];if(this[_0x11b8c3(0x1f3)](_0x1c1688))return![];return!![];},Game_Actor['prototype'][_0x13e91f(0x201)]=function(_0x2493d7){const _0x40f006=_0x13e91f,_0x575f9a=this['skillTypes'](),_0x1a05ca=DataManager[_0x40f006(0x1d9)](_0x2493d7),_0x49ca81=_0x575f9a[_0x40f006(0x73)](_0x417ccc=>_0x1a05ca[_0x40f006(0xbf)](_0x417ccc));return _0x49ca81[_0x40f006(0xa3)]>0x0;},Game_Actor['prototype'][_0x13e91f(0x1f3)]=function(_0x515dff){const _0x27600e=_0x13e91f;if(!VisuMZ['SkillsStatesCore']['CheckVisibleBattleNotetags'](this,_0x515dff))return!![];if(!VisuMZ[_0x27600e(0x36a)]['CheckVisibleSwitchNotetags'](this,_0x515dff))return!![];if(!VisuMZ['SkillsStatesCore'][_0x27600e(0x254)](this,_0x515dff))return!![];return![];},Game_Actor[_0x13e91f(0x214)][_0x13e91f(0x1b5)]=function(){const _0x21543e=_0x13e91f;let _0x2e4e36=[this['actor'](),this['currentClass']()];_0x2e4e36=_0x2e4e36['concat'](this[_0x21543e(0x1e1)]()['filter'](_0x18d85d=>_0x18d85d));for(const _0x1a2953 of this['_skills']){if('rAwzC'===_0x21543e(0x374)){const _0x45e709=$dataSkills[_0x1a2953];if(_0x45e709)_0x2e4e36['push'](_0x45e709);}else return this['_buffs'][_0x3ba269]===_0x3f5d4c['SkillsStatesCore'][_0x21543e(0x385)][_0x21543e(0x379)]['StackBuffMax'];}return _0x2e4e36;},Game_Actor[_0x13e91f(0x214)]['addPassiveStatesByPluginParameters']=function(){const _0x49ff12=_0x13e91f;Game_Battler['prototype'][_0x49ff12(0x274)][_0x49ff12(0x1c4)](this);const _0x5a6b64=VisuMZ[_0x49ff12(0x36a)][_0x49ff12(0x385)][_0x49ff12(0x31d)][_0x49ff12(0x219)];this[_0x49ff12(0x2db)][_0x49ff12(0x142)]=this[_0x49ff12(0x2db)][_0x49ff12(0x142)][_0x49ff12(0x225)](_0x5a6b64);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0xfd)]=Game_Actor['prototype'][_0x13e91f(0x36d)],Game_Actor['prototype'][_0x13e91f(0x36d)]=function(_0x13f49f){const _0x8ebc29=_0x13e91f;VisuMZ['SkillsStatesCore']['Game_Actor_learnSkill'][_0x8ebc29(0x1c4)](this,_0x13f49f),this[_0x8ebc29(0x2db)]={};},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x252)]=Game_Actor[_0x13e91f(0x214)][_0x13e91f(0xe3)],Game_Actor[_0x13e91f(0x214)][_0x13e91f(0xe3)]=function(_0x45e136){const _0x514be4=_0x13e91f;VisuMZ[_0x514be4(0x36a)]['Game_Actor_forgetSkill']['call'](this,_0x45e136),this[_0x514be4(0x2db)]={};},Game_Actor['prototype'][_0x13e91f(0x8f)]=function(){const _0x211c9d=_0x13e91f;return VisuMZ[_0x211c9d(0x36a)]['Settings'][_0x211c9d(0x10a)]['TurnEndOnMap']??0x14;},Game_Enemy[_0x13e91f(0x214)]['passiveStateObjects']=function(){const _0x3a435d=_0x13e91f;let _0x16dcdb=[this[_0x3a435d(0x2ad)]()];return _0x16dcdb[_0x3a435d(0x225)](this[_0x3a435d(0x217)]());},Game_Enemy[_0x13e91f(0x214)][_0x13e91f(0x274)]=function(){const _0x342230=_0x13e91f;Game_Battler['prototype'][_0x342230(0x274)][_0x342230(0x1c4)](this);const _0x5b1017=VisuMZ[_0x342230(0x36a)]['Settings'][_0x342230(0x31d)][_0x342230(0xc6)];this[_0x342230(0x2db)][_0x342230(0x142)]=this[_0x342230(0x2db)]['passiveStates']['concat'](_0x5b1017);},Game_Enemy[_0x13e91f(0x214)][_0x13e91f(0x217)]=function(){const _0xaffdf1=_0x13e91f,_0x64fc3a=[];for(const _0x2a4fe4 of this[_0xaffdf1(0x2ad)]()[_0xaffdf1(0x2e6)]){if(_0xaffdf1(0x2e3)!==_0xaffdf1(0x17a)){const _0x2a2847=$dataSkills[_0x2a4fe4[_0xaffdf1(0x27b)]];if(_0x2a2847&&!_0x64fc3a['includes'](_0x2a2847))_0x64fc3a[_0xaffdf1(0x334)](_0x2a2847);}else{_0x227d96[_0xaffdf1(0xe2)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x1a89e8=_0x4d8eee(_0x15a14d['$1'])[_0xaffdf1(0x1b0)]()[_0xaffdf1(0x1df)]()[_0xaffdf1(0x28a)](',');for(const _0x405998 of _0x1a89e8){_0x6814c2[_0xaffdf1(0x1b7)][_0xaffdf1(0x334)](_0x405998['trim']());}}}return _0x64fc3a;},Game_Enemy['prototype']['meetsStateCondition']=function(_0x251b0f){const _0x9cad98=_0x13e91f;return this[_0x9cad98(0x22f)]($dataStates[_0x251b0f]);},VisuMZ['SkillsStatesCore']['Game_Unit_isAllDead']=Game_Unit['prototype'][_0x13e91f(0x371)],Game_Unit[_0x13e91f(0x214)][_0x13e91f(0x371)]=function(){const _0x1e879f=_0x13e91f;if(this[_0x1e879f(0xba)]())return!![];return VisuMZ[_0x1e879f(0x36a)]['Game_Unit_isAllDead']['call'](this);},Game_Unit[_0x13e91f(0x214)][_0x13e91f(0xba)]=function(){const _0x322f4e=_0x13e91f,_0x1e2c54=this['aliveMembers']();for(const _0xc06bd4 of _0x1e2c54){if(!_0xc06bd4[_0x322f4e(0xd8)]())return![];}return!![];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x96)]=Game_Troop[_0x13e91f(0x214)][_0x13e91f(0x1a1)],Game_Troop[_0x13e91f(0x214)]['setup']=function(_0x2f2b7f){const _0x39175f=_0x13e91f;VisuMZ[_0x39175f(0x36a)][_0x39175f(0x96)][_0x39175f(0x1c4)](this,_0x2f2b7f),this[_0x39175f(0x373)]();},Game_Troop['prototype'][_0x13e91f(0x373)]=function(){const _0x17c41c=_0x13e91f;this[_0x17c41c(0x179)]=Graphics[_0x17c41c(0x280)];},Game_Troop['prototype'][_0x13e91f(0x1a4)]=function(){const _0x301b9e=_0x13e91f;return this[_0x301b9e(0x179)]=this[_0x301b9e(0x179)]||Graphics[_0x301b9e(0x280)],this['_currentTroopUniqueID'];},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x255)]=function(){const _0x33494d=_0x13e91f;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x33494d(0x12a)]!==undefined)return ConfigManager[_0x33494d(0x12a)];else{if(this[_0x33494d(0x221)]())return this[_0x33494d(0x2ee)]()[_0x33494d(0xe2)](/LOWER/i);else _0x33494d(0x21e)!==_0x33494d(0x85)?Scene_ItemBase[_0x33494d(0x214)][_0x33494d(0x19e)]['call'](this):(_0x4efd66=![],this[_0x33494d(0x1d8)][_0x2c62b3]=_0x50c7fd);}},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x19e)]=function(){const _0x186b51=_0x13e91f;if(ConfigManager[_0x186b51(0x183)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager['uiInputPosition'];else return this[_0x186b51(0x221)]()?this[_0x186b51(0x2ee)]()[_0x186b51(0xe2)](/RIGHT/i):Scene_ItemBase[_0x186b51(0x214)][_0x186b51(0x19e)][_0x186b51(0x1c4)](this);},Scene_Skill['prototype']['updatedLayoutStyle']=function(){const _0xc50e0b=_0x13e91f;return VisuMZ['SkillsStatesCore'][_0xc50e0b(0x385)]['Skills'][_0xc50e0b(0x19b)];},Scene_Skill['prototype'][_0x13e91f(0x368)]=function(){const _0x13810a=_0x13e91f;return this[_0x13810a(0x24f)]&&this[_0x13810a(0x24f)][_0x13810a(0x368)]();},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x221)]=function(){const _0x32f10d=_0x13e91f;return VisuMZ[_0x32f10d(0x36a)][_0x32f10d(0x385)][_0x32f10d(0x305)][_0x32f10d(0x2bb)];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x15c)]=Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x32e)],Scene_Skill['prototype'][_0x13e91f(0x32e)]=function(){const _0x5ccda5=_0x13e91f;if(this[_0x5ccda5(0x221)]())return this[_0x5ccda5(0x153)]();else{if(_0x5ccda5(0x192)===_0x5ccda5(0x232)){if(_0x1c62f2['length']>0x0)_0x3bbd55+=this[_0x5ccda5(0x304)]();_0x149077+=_0x3ef8db(_0x18e892['$1']);}else return VisuMZ[_0x5ccda5(0x36a)][_0x5ccda5(0x15c)][_0x5ccda5(0x1c4)](this);}},Scene_Skill['prototype']['helpWindowRectSkillsStatesCore']=function(){const _0x4c7c91=_0x13e91f,_0x3d0931=0x0,_0x23fbb6=this[_0x4c7c91(0x95)](),_0x799020=Graphics[_0x4c7c91(0xdf)],_0x18a17a=this[_0x4c7c91(0x1c0)]();return new Rectangle(_0x3d0931,_0x23fbb6,_0x799020,_0x18a17a);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x105)]=Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0xcf)],Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0xcf)]=function(){const _0x53b322=_0x13e91f;return this[_0x53b322(0x221)]()?this[_0x53b322(0x1ce)]():VisuMZ['SkillsStatesCore'][_0x53b322(0x105)][_0x53b322(0x1c4)](this);},Scene_Skill[_0x13e91f(0x214)]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x1cb6e8=_0x13e91f,_0x24ba08=this[_0x1cb6e8(0x1d0)](),_0x3488d3=this['calcWindowHeight'](0x3,!![]),_0x2d5cc7=this[_0x1cb6e8(0x19e)]()?Graphics[_0x1cb6e8(0xdf)]-_0x24ba08:0x0,_0x488919=this[_0x1cb6e8(0x1b8)]();return new Rectangle(_0x2d5cc7,_0x488919,_0x24ba08,_0x3488d3);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x18f)]=Scene_Skill[_0x13e91f(0x214)]['statusWindowRect'],Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x235)]=function(){const _0x16f706=_0x13e91f;if(this[_0x16f706(0x221)]()){if(_0x16f706(0x37c)===_0x16f706(0x37c))return this['statusWindowRectSkillsStatesCore']();else _0x915c0e['SkillsStatesCore'][_0x16f706(0x84)][_0x16f706(0x1c4)](this),this[_0x16f706(0x1c7)]();}else return VisuMZ[_0x16f706(0x36a)][_0x16f706(0x18f)][_0x16f706(0x1c4)](this);},Scene_Skill[_0x13e91f(0x214)]['statusWindowRectSkillsStatesCore']=function(){const _0x5157ad=_0x13e91f,_0x3c94cd=Graphics[_0x5157ad(0xdf)]-this[_0x5157ad(0x1d0)](),_0x8d7064=this[_0x5157ad(0xfa)][_0x5157ad(0x114)],_0x7db4d6=this[_0x5157ad(0x19e)]()?0x0:Graphics['boxWidth']-_0x3c94cd,_0x357744=this[_0x5157ad(0x1b8)]();return new Rectangle(_0x7db4d6,_0x357744,_0x3c94cd,_0x8d7064);},VisuMZ['SkillsStatesCore']['Scene_Skill_createItemWindow']=Scene_Skill[_0x13e91f(0x214)]['createItemWindow'],Scene_Skill['prototype']['createItemWindow']=function(){const _0x1c0dad=_0x13e91f;VisuMZ[_0x1c0dad(0x36a)][_0x1c0dad(0x282)][_0x1c0dad(0x1c4)](this),this['allowCreateShopStatusWindow']()&&this[_0x1c0dad(0x391)]();},VisuMZ[_0x13e91f(0x36a)]['Scene_Skill_itemWindowRect']=Scene_Skill['prototype'][_0x13e91f(0x1b6)],Scene_Skill[_0x13e91f(0x214)]['itemWindowRect']=function(){const _0x5b0cf3=_0x13e91f;if(this[_0x5b0cf3(0x221)]()){if(_0x5b0cf3(0x2a0)===_0x5b0cf3(0x207))_0x38ab9b[_0x5b0cf3(0x175)](_0x4c5561,_0x5d968c),this[_0x5b0cf3(0xd1)](_0x21dcad);else return this[_0x5b0cf3(0x92)]();}else{if(_0x5b0cf3(0x1a7)==='DXlXh')_0x591cbb[_0x5b0cf3(0x214)][_0x5b0cf3(0x28d)][_0x5b0cf3(0x1c4)](this,_0x32114e),this['onEraseStateCustomJS'](_0x43247f),this[_0x5b0cf3(0x384)](_0x57fa63);else{const _0x3e32b0=VisuMZ['SkillsStatesCore'][_0x5b0cf3(0x107)][_0x5b0cf3(0x1c4)](this);if(this['allowCreateShopStatusWindow']()&&this[_0x5b0cf3(0x1db)]()){if('sQxaU'!==_0x5b0cf3(0x1bb))_0x3e32b0[_0x5b0cf3(0xc4)]-=this['shopStatusWidth']();else{const _0x355df1=_0xbd32d8[_0x5b0cf3(0xed)]('['+_0x45df28['$1']['match'](/\d+/g)+']');for(const _0x3d4085 of _0x355df1){if(!_0x5a6bd7[_0x5b0cf3(0x265)](_0x3d4085))return!![];}return![];}}return _0x3e32b0;}}},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x92)]=function(){const _0xdbeb50=_0x13e91f,_0xd429d9=Graphics[_0xdbeb50(0xdf)]-this[_0xdbeb50(0x1ab)](),_0x183526=this[_0xdbeb50(0x120)]()-this['_statusWindow']['height'],_0x6cc667=this[_0xdbeb50(0x19e)]()?Graphics['boxWidth']-_0xd429d9:0x0,_0x2e8a83=this[_0xdbeb50(0x16f)]['y']+this[_0xdbeb50(0x16f)][_0xdbeb50(0x114)];return new Rectangle(_0x6cc667,_0x2e8a83,_0xd429d9,_0x183526);},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x34a)]=function(){const _0x34061c=_0x13e91f;if(!Imported[_0x34061c(0x26f)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:_0x34061c(0x2e2)!==_0x34061c(0x2e2)?_0x1db71f[_0x34061c(0x36a)][_0x34061c(0x385)][_0x34061c(0x305)][_0x34061c(0xd3)]:VisuMZ['SkillsStatesCore'][_0x34061c(0x385)][_0x34061c(0x305)][_0x34061c(0x355)];},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x1db)]=function(){const _0x909078=_0x13e91f;return VisuMZ[_0x909078(0x36a)]['Settings'][_0x909078(0x305)][_0x909078(0x119)];},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x391)]=function(){const _0x244211=_0x13e91f,_0x53a2eb=this[_0x244211(0x241)]();this[_0x244211(0xec)]=new Window_ShopStatus(_0x53a2eb),this[_0x244211(0x1fb)](this[_0x244211(0xec)]),this[_0x244211(0x2fa)][_0x244211(0x1c6)](this[_0x244211(0xec)]);const _0x14a149=VisuMZ[_0x244211(0x36a)]['Settings'][_0x244211(0x305)][_0x244211(0x350)];this[_0x244211(0xec)][_0x244211(0x1d1)](_0x14a149||0x0);},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x241)]=function(){const _0x3472da=_0x13e91f;if(this[_0x3472da(0x221)]()){if(_0x3472da(0x1e8)!==_0x3472da(0x2b3))return this[_0x3472da(0x1e0)]();else{const _0x415354=_0x43a22e[_0x3472da(0x98)],_0x8d1b33=_0xf9d426[_0x3472da(0x36a)][_0x3472da(0x173)];return _0x8d1b33[_0x3fdcbc['id']]?_0x8d1b33[_0x5643f0['id']][_0x3472da(0x1c4)](this,_0x485c04):!![];}}else return VisuMZ[_0x3472da(0x36a)][_0x3472da(0x385)]['Skills']['SkillMenuStatusRect'][_0x3472da(0x1c4)](this);},Scene_Skill[_0x13e91f(0x214)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x3f6e19=_0x13e91f,_0x5ee874=this[_0x3f6e19(0x1ab)](),_0x2b7cbc=this['_itemWindow'][_0x3f6e19(0x114)],_0x37835e=this['isRightInputMode']()?0x0:Graphics[_0x3f6e19(0xdf)]-this['shopStatusWidth'](),_0x24f4b3=this[_0x3f6e19(0x2fa)]['y'];return new Rectangle(_0x37835e,_0x24f4b3,_0x5ee874,_0x2b7cbc);},Scene_Skill['prototype']['shopStatusWidth']=function(){const _0x5e8c95=_0x13e91f;return Imported[_0x5e8c95(0x26f)]?_0x5e8c95(0x15e)==='nXhke'?Scene_Shop[_0x5e8c95(0x214)][_0x5e8c95(0x1fd)]():this[_0x5e8c95(0x22e)]():0x0;},Scene_Skill[_0x13e91f(0x214)][_0x13e91f(0x26b)]=function(){const _0x328410=_0x13e91f;if(this[_0x328410(0xfa)]&&this[_0x328410(0xfa)]['active']){if(_0x328410(0xe6)===_0x328410(0x151))_0x5ceec8[_0x328410(0xc4)]-=this[_0x328410(0x1ab)]();else return TextManager[_0x328410(0x122)];}else{if('lZJHP'===_0x328410(0x108)){let _0x43f676=0x0,_0x2b495f=0x0;if(_0x5c933d['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x43f676=_0x205888(_0x1cf39a['$1']),_0x2b495f=_0x3ba4f2(_0x20d5bd['$2']);else _0x409279[_0x328410(0xe2)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x43f676=_0x44d0f2[_0x328410(0x12d)](_0x363c18['$1']),_0x2b495f=_0x199bac(_0x56f1e3['$2']));_0xb79e7a[_0x328410(0x7e)](_0x43f676,_0x2b495f),this[_0x328410(0xd1)](_0x56c8cb);}else return'';}},VisuMZ[_0x13e91f(0x36a)]['Sprite_Gauge_initMembers']=Sprite_Gauge['prototype'][_0x13e91f(0x295)],Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x295)]=function(){const _0x1c5540=_0x13e91f;VisuMZ[_0x1c5540(0x36a)]['Sprite_Gauge_initMembers'][_0x1c5540(0x1c4)](this),this[_0x1c5540(0x302)]=null;},VisuMZ['SkillsStatesCore'][_0x13e91f(0x89)]=Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x1a1)],Sprite_Gauge['prototype'][_0x13e91f(0x1a1)]=function(_0x27b53f,_0x5eb4cd){const _0x9f51f2=_0x13e91f;this[_0x9f51f2(0x299)](_0x27b53f,_0x5eb4cd),_0x5eb4cd=_0x5eb4cd[_0x9f51f2(0xd5)](),VisuMZ[_0x9f51f2(0x36a)][_0x9f51f2(0x89)][_0x9f51f2(0x1c4)](this,_0x27b53f,_0x5eb4cd);},Sprite_Gauge[_0x13e91f(0x214)]['setupSkillsStatesCore']=function(_0x57ec5e,_0x1547dc){const _0x5990f3=_0x13e91f,_0x267103=VisuMZ['SkillsStatesCore'][_0x5990f3(0x385)][_0x5990f3(0x249)]['filter'](_0x5d3449=>_0x5d3449[_0x5990f3(0x2f9)]['toUpperCase']()===_0x1547dc['toUpperCase']());_0x267103['length']>=0x1?this[_0x5990f3(0x302)]=_0x267103[0x0]:this[_0x5990f3(0x302)]=null;},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x2ed)]=Sprite_Gauge['prototype'][_0x13e91f(0x1dc)],Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x1dc)]=function(){const _0x516634=_0x13e91f;return this[_0x516634(0x2d3)]&&this[_0x516634(0x302)]?this['currentValueSkillsStatesCore']():_0x516634(0x2ab)===_0x516634(0x9c)?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x516634(0x36a)][_0x516634(0x2ed)][_0x516634(0x1c4)](this);},Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x22e)]=function(){const _0x13c4a2=_0x13e91f;return this[_0x13c4a2(0x302)]['GaugeCurrentJS'][_0x13c4a2(0x1c4)](this[_0x13c4a2(0x2d3)]);},VisuMZ[_0x13e91f(0x36a)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x236)],Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x236)]=function(){const _0x44edb5=_0x13e91f;if(this[_0x44edb5(0x2d3)]&&this[_0x44edb5(0x302)]){if(_0x44edb5(0x330)!=='wpxcE'){this[_0x44edb5(0x1e9)]=this[_0x44edb5(0x1e9)]||{};if(this[_0x44edb5(0x1e9)][_0x13f2e1['id']])return this[_0x44edb5(0x1e9)][_0xfc4433['id']];this[_0x44edb5(0x1e9)][_0x2377b0['id']]=[_0x2cf428[_0x44edb5(0x11c)]];if(_0x58077a[_0x44edb5(0x98)][_0x44edb5(0xe2)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x449fc4=_0x5f0d69[_0x44edb5(0xed)]('['+_0x512e28['$1']['match'](/\d+/g)+']');this['_stypeIDs'][_0x4b36e3['id']]=this[_0x44edb5(0x1e9)][_0x4c5a5e['id']][_0x44edb5(0x225)](_0x449fc4);}else{if(_0x3b06fb[_0x44edb5(0x98)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x4e48d8=_0x4e763e['$1'][_0x44edb5(0x28a)](',');for(const _0x48941a of _0x4e48d8){const _0x39c433=_0x1b63f1[_0x44edb5(0x2a4)](_0x48941a);if(_0x39c433)this[_0x44edb5(0x1e9)][_0x4e6845['id']][_0x44edb5(0x334)](_0x39c433);}}}return this[_0x44edb5(0x1e9)][_0x33b063['id']];}else return this[_0x44edb5(0x226)]();}else return VisuMZ[_0x44edb5(0x36a)]['Sprite_Gauge_currentMaxValue'][_0x44edb5(0x1c4)](this);},Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x226)]=function(){const _0x356209=_0x13e91f;return this[_0x356209(0x302)][_0x356209(0x37e)][_0x356209(0x1c4)](this['_battler']);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x14d)]=Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x360)],Sprite_Gauge[_0x13e91f(0x214)]['gaugeRate']=function(){const _0x47b160=_0x13e91f,_0x286cf4=VisuMZ[_0x47b160(0x36a)][_0x47b160(0x14d)][_0x47b160(0x1c4)](this);return _0x286cf4['clamp'](0x0,0x1);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x21a)]=Sprite_Gauge['prototype']['redraw'],Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x194)]=function(){const _0x37f5da=_0x13e91f;if(this[_0x37f5da(0x2d3)]&&this[_0x37f5da(0x302)]){if(_0x37f5da(0x276)===_0x37f5da(0x276))this[_0x37f5da(0x1da)]['clear'](),this['redrawSkillsStatesCore']();else{if(typeof _0x286c97!==_0x37f5da(0x1f4))_0x14be71=_0x5b2fd4['id'];const _0x1e42b2=this['stateData'](_0x4372cd);return _0x1e42b2[_0x472a14];}}else _0x37f5da(0x251)!==_0x37f5da(0x2c7)?VisuMZ[_0x37f5da(0x36a)][_0x37f5da(0x21a)][_0x37f5da(0x1c4)](this):this[_0x37f5da(0x1ef)]=_0x46de97;},Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0xb7)]=function(){const _0x21416f=_0x13e91f;let _0x8f55a9=this['currentValue']();return Imported[_0x21416f(0x2c1)]&&this['useDigitGrouping']()&&(_0x8f55a9=VisuMZ[_0x21416f(0x309)](_0x8f55a9)),_0x8f55a9;},Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x82)]=function(){const _0x2100fb=_0x13e91f;this[_0x2100fb(0x302)][_0x2100fb(0xea)]['call'](this);},Sprite_Gauge[_0x13e91f(0x214)][_0x13e91f(0x354)]=function(_0x364814,_0x24c73d,_0x1149e6,_0x47d53b,_0x19d6e2,_0x56b994){const _0x1d240c=_0x13e91f,_0x42b142=this[_0x1d240c(0x360)](),_0x396f01=Math['floor']((_0x19d6e2-0x2)*_0x42b142),_0x5e770f=_0x56b994-0x2,_0xdf6df9=this[_0x1d240c(0x215)]();this['bitmap'][_0x1d240c(0x1f0)](_0x1149e6,_0x47d53b,_0x19d6e2,_0x56b994,_0xdf6df9),this[_0x1d240c(0x1da)][_0x1d240c(0x31f)](_0x1149e6+0x1,_0x47d53b+0x1,_0x396f01,_0x5e770f,_0x364814,_0x24c73d);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x84)]=Sprite_StateIcon[_0x13e91f(0x214)]['loadBitmap'],Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x230)]=function(){const _0x2f8e7c=_0x13e91f;VisuMZ[_0x2f8e7c(0x36a)][_0x2f8e7c(0x84)]['call'](this),this[_0x2f8e7c(0x1c7)]();},Sprite_StateIcon[_0x13e91f(0x214)]['createTurnDisplaySprite']=function(){const _0x5adf58=_0x13e91f,_0x149e2a=Window_Base['prototype'][_0x5adf58(0x21b)]();this['_turnDisplaySprite']=new Sprite(),this['_turnDisplaySprite'][_0x5adf58(0x1da)]=new Bitmap(ImageManager[_0x5adf58(0x184)],_0x149e2a),this[_0x5adf58(0x279)][_0x5adf58(0xb6)]['x']=this[_0x5adf58(0xb6)]['x'],this['_turnDisplaySprite'][_0x5adf58(0xb6)]['y']=this[_0x5adf58(0xb6)]['y'],this['addChild'](this['_turnDisplaySprite']),this[_0x5adf58(0x2e8)]=this[_0x5adf58(0x279)][_0x5adf58(0x1da)];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x283)]=Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x187)],Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x187)]=function(){const _0x18e485=_0x13e91f;VisuMZ[_0x18e485(0x36a)]['Sprite_StateIcon_updateFrame'][_0x18e485(0x1c4)](this),this[_0x18e485(0x116)]();},Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x17f)]=function(_0x1a98c0,_0x55ed75,_0x1f1467,_0x1fe536,_0xcfa989){const _0x3fb4f0=_0x13e91f;this[_0x3fb4f0(0x2e8)]['drawText'](_0x1a98c0,_0x55ed75,_0x1f1467,_0x1fe536,this['contents'][_0x3fb4f0(0x114)],_0xcfa989);},Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x116)]=function(){const _0x342517=_0x13e91f;this[_0x342517(0x303)](),this[_0x342517(0x2e8)]['clear']();const _0x437b58=this[_0x342517(0x2d3)];if(!_0x437b58)return;const _0x16dd00=_0x437b58[_0x342517(0x147)]()[_0x342517(0x73)](_0x189adc=>_0x189adc['iconIndex']>0x0),_0x5356d4=[...Array(0x8)[_0x342517(0x366)]()][_0x342517(0x73)](_0x4cd64f=>_0x437b58[_0x342517(0x186)](_0x4cd64f)!==0x0),_0x24f83d=this[_0x342517(0xa0)],_0x55155a=_0x16dd00[_0x24f83d];if(_0x55155a)Window_Base[_0x342517(0x214)][_0x342517(0x200)][_0x342517(0x1c4)](this,_0x437b58,_0x55155a,0x0,0x0),Window_Base[_0x342517(0x214)][_0x342517(0xf7)][_0x342517(0x1c4)](this,_0x437b58,_0x55155a,0x0,0x0);else{const _0x40d90f=_0x5356d4[_0x24f83d-_0x16dd00[_0x342517(0xa3)]];if(_0x40d90f===undefined)return;Window_Base[_0x342517(0x214)][_0x342517(0xb3)][_0x342517(0x1c4)](this,_0x437b58,_0x40d90f,0x0,0x0),Window_Base['prototype'][_0x342517(0x1ac)][_0x342517(0x1c4)](this,_0x437b58,_0x40d90f,0x0,0x0);}},Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x303)]=function(){const _0x31b03a=_0x13e91f;this[_0x31b03a(0x2e8)][_0x31b03a(0x136)]=$gameSystem[_0x31b03a(0x91)](),this[_0x31b03a(0x2e8)][_0x31b03a(0x361)]=$gameSystem[_0x31b03a(0x316)](),this[_0x31b03a(0x1c1)]();},Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x1c1)]=function(){const _0x5b003a=_0x13e91f;this[_0x5b003a(0x160)](ColorManager[_0x5b003a(0xc0)]()),this['changeOutlineColor'](ColorManager[_0x5b003a(0x2e0)]());},Sprite_StateIcon['prototype'][_0x13e91f(0x160)]=function(_0x146261){const _0x433fb2=_0x13e91f;this['contents'][_0x433fb2(0xa2)]=_0x146261;},Sprite_StateIcon[_0x13e91f(0x214)][_0x13e91f(0x1d3)]=function(_0x375e42){const _0x5c461e=_0x13e91f;this[_0x5c461e(0x2e8)][_0x5c461e(0x2e0)]=_0x375e42;},Sprite_StateIcon['prototype'][_0x13e91f(0x237)]=function(){const _0x24d032=_0x13e91f;this[_0x24d032(0x1ad)]=!![],this[_0x24d032(0x11f)]();},Window_Base[_0x13e91f(0x214)][_0x13e91f(0x382)]=function(_0x2212ee,_0x22bb6b,_0x42d214,_0x5aaf58,_0x4e2645){const _0x524eee=_0x13e91f,_0x5cdf13=this[_0x524eee(0x13d)](_0x2212ee,_0x22bb6b),_0x3198d3=this[_0x524eee(0x28e)](_0x5cdf13,_0x42d214,_0x5aaf58,_0x4e2645),_0x5b4b7c=_0x42d214+_0x4e2645-_0x3198d3['width'];this['drawTextEx'](_0x5cdf13,_0x5b4b7c,_0x5aaf58,_0x4e2645),this[_0x524eee(0x303)]();},Window_Base[_0x13e91f(0x214)][_0x13e91f(0x13d)]=function(_0x447fd3,_0x1e6806){const _0x179fae=_0x13e91f;let _0x5b3357='';for(settings of VisuMZ[_0x179fae(0x36a)]['Settings'][_0x179fae(0x249)]){if(!this['isSkillCostShown'](_0x447fd3,_0x1e6806,settings))continue;if(_0x5b3357[_0x179fae(0xa3)]>0x0)_0x5b3357+=this[_0x179fae(0x304)]();_0x5b3357+=this[_0x179fae(0x35b)](_0x447fd3,_0x1e6806,settings);}_0x5b3357=this['makeAdditionalSkillCostText'](_0x447fd3,_0x1e6806,_0x5b3357);if(_0x1e6806[_0x179fae(0x98)]['match'](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x179fae(0x300)!==_0x179fae(0x34b)){if(_0x5b3357[_0x179fae(0xa3)]>0x0)_0x5b3357+=this[_0x179fae(0x304)]();_0x5b3357+=String(RegExp['$1']);}else _0x5ad27e[_0x179fae(0x36a)][_0x179fae(0x385)][_0x179fae(0x10a)]['onEraseStateJS'][_0x179fae(0x1c4)](this,_0x42f6a2);}return _0x5b3357;},Window_Base[_0x13e91f(0x214)][_0x13e91f(0x14f)]=function(_0x4886dd,_0x520c8c,_0x55e544){return _0x55e544;},Window_Base[_0x13e91f(0x214)]['isSkillCostShown']=function(_0x3f2951,_0x3e7aea,_0x46fd37){const _0x5bc6d0=_0x13e91f,_0x2d3e27=_0x46fd37['CalcJS'][_0x5bc6d0(0x1c4)](_0x3f2951,_0x3e7aea);return _0x46fd37[_0x5bc6d0(0x2b7)][_0x5bc6d0(0x1c4)](_0x3f2951,_0x3e7aea,_0x2d3e27,_0x46fd37);},Window_Base[_0x13e91f(0x214)]['createSkillCostText']=function(_0x2c93d3,_0x417066,_0x1cb100){const _0x301043=_0x13e91f,_0x5ece5c=_0x1cb100[_0x301043(0x1ba)][_0x301043(0x1c4)](_0x2c93d3,_0x417066);return _0x1cb100[_0x301043(0x125)]['call'](_0x2c93d3,_0x417066,_0x5ece5c,_0x1cb100);},Window_Base[_0x13e91f(0x214)][_0x13e91f(0x304)]=function(){return'\x20';},Window_Base['prototype'][_0x13e91f(0x2a1)]=function(_0x179933,_0x19eaf7,_0x16a294,_0x5c0fc4){const _0x3c66a7=_0x13e91f;if(!_0x179933)return;VisuMZ[_0x3c66a7(0x36a)][_0x3c66a7(0x2ba)][_0x3c66a7(0x1c4)](this,_0x179933,_0x19eaf7,_0x16a294,_0x5c0fc4),this[_0x3c66a7(0x344)](_0x179933,_0x19eaf7,_0x16a294,_0x5c0fc4);},Window_Base[_0x13e91f(0x214)][_0x13e91f(0x344)]=function(_0x349074,_0x1deedc,_0x3044d4,_0x363dc2){const _0x5ed401=_0x13e91f;_0x363dc2=_0x363dc2||0x90;const _0x56c099=ImageManager[_0x5ed401(0x184)],_0x12f260=_0x349074[_0x5ed401(0x393)]()['slice'](0x0,Math['floor'](_0x363dc2/_0x56c099)),_0x430e98=_0x349074[_0x5ed401(0x147)]()[_0x5ed401(0x73)](_0x43813d=>_0x43813d['iconIndex']>0x0),_0x37fc76=[...Array(0x8)['keys']()][_0x5ed401(0x73)](_0x1d7f16=>_0x349074[_0x5ed401(0x186)](_0x1d7f16)!==0x0),_0x263650=[];let _0xedc486=_0x1deedc;for(let _0x2231b1=0x0;_0x2231b1<_0x12f260['length'];_0x2231b1++){this['resetFontSettings']();const _0x54969a=_0x430e98[_0x2231b1];if(_0x54969a)_0x5ed401(0x16e)!==_0x5ed401(0x2ea)?(!_0x263650[_0x5ed401(0xbf)](_0x54969a)&&this[_0x5ed401(0x200)](_0x349074,_0x54969a,_0xedc486,_0x3044d4),this['drawActorStateData'](_0x349074,_0x54969a,_0xedc486,_0x3044d4),_0x263650[_0x5ed401(0x334)](_0x54969a)):_0x55773e[_0x2636a6][_0x234de3]['call'](this,_0x16c38e);else{const _0x4243a9=_0x37fc76[_0x2231b1-_0x430e98[_0x5ed401(0xa3)]];this[_0x5ed401(0xb3)](_0x349074,_0x4243a9,_0xedc486,_0x3044d4),this[_0x5ed401(0x1ac)](_0x349074,_0x4243a9,_0xedc486,_0x3044d4);}_0xedc486+=_0x56c099;}},Window_Base[_0x13e91f(0x214)][_0x13e91f(0x200)]=function(_0x1525a7,_0xd0cceb,_0x87aa60,_0x1b72c0){const _0x2598da=_0x13e91f;if(!VisuMZ[_0x2598da(0x36a)]['Settings'][_0x2598da(0x10a)][_0x2598da(0x171)])return;if(!_0x1525a7['isStateAffected'](_0xd0cceb['id']))return;if(_0xd0cceb[_0x2598da(0x1b9)]===0x0)return;if(_0xd0cceb[_0x2598da(0x98)][_0x2598da(0xe2)](/<HIDE STATE TURNS>/i))return;const _0x3fa577=_0x1525a7[_0x2598da(0x378)](_0xd0cceb['id']),_0x49c3c3=ImageManager['iconWidth'],_0xb16a71=ColorManager[_0x2598da(0x34f)](_0xd0cceb);this[_0x2598da(0x160)](_0xb16a71),this[_0x2598da(0x1d3)](_0x2598da(0xff)),this[_0x2598da(0x2e8)][_0x2598da(0x365)]=!![],this['contents'][_0x2598da(0x361)]=VisuMZ[_0x2598da(0x36a)]['Settings'][_0x2598da(0x10a)][_0x2598da(0x240)],_0x87aa60+=VisuMZ[_0x2598da(0x36a)][_0x2598da(0x385)][_0x2598da(0x10a)]['TurnOffsetX'],_0x1b72c0+=VisuMZ[_0x2598da(0x36a)]['Settings'][_0x2598da(0x10a)][_0x2598da(0x205)],this[_0x2598da(0x17f)](_0x3fa577,_0x87aa60,_0x1b72c0,_0x49c3c3,_0x2598da(0x1fa)),this[_0x2598da(0x2e8)][_0x2598da(0x365)]=![],this[_0x2598da(0x303)]();},Window_Base[_0x13e91f(0x214)][_0x13e91f(0xf7)]=function(_0x5eb5c6,_0x382d3c,_0x5b76f2,_0x59d7c5){const _0x55890d=_0x13e91f;if(!VisuMZ[_0x55890d(0x36a)][_0x55890d(0x385)][_0x55890d(0x10a)][_0x55890d(0x247)])return;const _0x34f743=ImageManager[_0x55890d(0x184)],_0x641cc7=ImageManager[_0x55890d(0x377)]/0x2,_0x5751cc=ColorManager[_0x55890d(0xc0)]();this[_0x55890d(0x160)](_0x5751cc),this[_0x55890d(0x1d3)](_0x55890d(0xff)),this['contents'][_0x55890d(0x365)]=!![],this[_0x55890d(0x2e8)][_0x55890d(0x361)]=VisuMZ[_0x55890d(0x36a)][_0x55890d(0x385)][_0x55890d(0x10a)][_0x55890d(0x29e)],_0x5b76f2+=VisuMZ[_0x55890d(0x36a)]['Settings']['States']['DataOffsetX'],_0x59d7c5+=VisuMZ[_0x55890d(0x36a)][_0x55890d(0x385)][_0x55890d(0x10a)][_0x55890d(0xd2)];const _0x355299=String(_0x5eb5c6[_0x55890d(0x37d)](_0x382d3c['id']));this[_0x55890d(0x17f)](_0x355299,_0x5b76f2,_0x59d7c5,_0x34f743,_0x55890d(0x17e)),this[_0x55890d(0x2e8)]['fontBold']=![],this[_0x55890d(0x303)]();},Window_Base['prototype']['drawActorBuffTurns']=function(_0x1eb431,_0x12aa91,_0x2deb74,_0x3f7760){const _0x28660f=_0x13e91f;if(!VisuMZ[_0x28660f(0x36a)][_0x28660f(0x385)][_0x28660f(0x379)][_0x28660f(0x171)])return;const _0xd97573=_0x1eb431[_0x28660f(0x186)](_0x12aa91);if(_0xd97573===0x0)return;const _0x6d0e2b=_0x1eb431['buffTurns'](_0x12aa91),_0x3685a1=ImageManager[_0x28660f(0x184)],_0x1ede05=_0xd97573>0x0?ColorManager[_0x28660f(0x2d2)]():ColorManager[_0x28660f(0x296)]();this['changeTextColor'](_0x1ede05),this['changeOutlineColor'](_0x28660f(0xff)),this[_0x28660f(0x2e8)][_0x28660f(0x365)]=!![],this['contents'][_0x28660f(0x361)]=VisuMZ[_0x28660f(0x36a)][_0x28660f(0x385)][_0x28660f(0x379)][_0x28660f(0x240)],_0x2deb74+=VisuMZ[_0x28660f(0x36a)]['Settings'][_0x28660f(0x379)][_0x28660f(0x13a)],_0x3f7760+=VisuMZ[_0x28660f(0x36a)][_0x28660f(0x385)][_0x28660f(0x379)][_0x28660f(0x205)],this[_0x28660f(0x17f)](_0x6d0e2b,_0x2deb74,_0x3f7760,_0x3685a1,'right'),this[_0x28660f(0x2e8)][_0x28660f(0x365)]=![],this[_0x28660f(0x303)]();},Window_Base[_0x13e91f(0x214)][_0x13e91f(0x1ac)]=function(_0x2cfdd8,_0x257b21,_0x5d2225,_0x16edf8){const _0xd6b3ad=_0x13e91f;if(!VisuMZ['SkillsStatesCore'][_0xd6b3ad(0x385)]['Buffs'][_0xd6b3ad(0x247)])return;const _0x18f222=_0x2cfdd8[_0xd6b3ad(0x127)](_0x257b21),_0x3d68dc=_0x2cfdd8['buff'](_0x257b21),_0x134615=ImageManager[_0xd6b3ad(0x184)],_0x26a1ca=ImageManager[_0xd6b3ad(0x377)]/0x2,_0x402859=_0x3d68dc>0x0?ColorManager['buffColor']():ColorManager[_0xd6b3ad(0x296)]();this['changeTextColor'](_0x402859),this[_0xd6b3ad(0x1d3)](_0xd6b3ad(0xff)),this[_0xd6b3ad(0x2e8)][_0xd6b3ad(0x365)]=!![],this['contents'][_0xd6b3ad(0x361)]=VisuMZ[_0xd6b3ad(0x36a)][_0xd6b3ad(0x385)][_0xd6b3ad(0x379)]['DataFontSize'],_0x5d2225+=VisuMZ[_0xd6b3ad(0x36a)][_0xd6b3ad(0x385)]['Buffs'][_0xd6b3ad(0x79)],_0x16edf8+=VisuMZ[_0xd6b3ad(0x36a)]['Settings'][_0xd6b3ad(0x379)][_0xd6b3ad(0xd2)];const _0x408618=_0xd6b3ad(0x245)[_0xd6b3ad(0x314)](Math['round'](_0x18f222*0x64));this[_0xd6b3ad(0x17f)](_0x408618,_0x5d2225,_0x16edf8,_0x134615,_0xd6b3ad(0x17e)),this[_0xd6b3ad(0x2e8)]['fontBold']=![],this[_0xd6b3ad(0x303)]();},VisuMZ['SkillsStatesCore'][_0x13e91f(0x1a2)]=Window_StatusBase[_0x13e91f(0x214)][_0x13e91f(0x28b)],Window_StatusBase[_0x13e91f(0x214)]['placeGauge']=function(_0x3fb485,_0x442336,_0x25ea87,_0x723f51){const _0x52cba1=_0x13e91f;if(_0x3fb485['isActor']())_0x442336=this['convertGaugeTypeSkillsStatesCore'](_0x3fb485,_0x442336);this[_0x52cba1(0x2ae)](_0x3fb485,_0x442336,_0x25ea87,_0x723f51);},Window_StatusBase[_0x13e91f(0x214)][_0x13e91f(0x2ae)]=function(_0x2fbd7c,_0x384879,_0x4a3008,_0x1dd99a){const _0x201d5a=_0x13e91f;if([_0x201d5a(0x18d),_0x201d5a(0x238)][_0x201d5a(0xbf)](_0x384879[_0x201d5a(0xd5)]()))return;VisuMZ[_0x201d5a(0x36a)][_0x201d5a(0x1a2)][_0x201d5a(0x1c4)](this,_0x2fbd7c,_0x384879,_0x4a3008,_0x1dd99a);},Window_StatusBase[_0x13e91f(0x214)][_0x13e91f(0x16b)]=function(_0x4186f0,_0x1c0ea1){const _0x18a699=_0x13e91f,_0x533b3a=_0x4186f0['currentClass']()[_0x18a699(0x98)];if(_0x1c0ea1==='hp'&&_0x533b3a[_0x18a699(0xe2)](/<REPLACE HP GAUGE:[ ](.*)>/i)){if('OpVmF'!=='OpVmF'){if(!_0x44c786[_0x18a699(0x36a)][_0x18a699(0x385)][_0x18a699(0x10a)]['ShowData'])return;const _0xafc787=_0x10ea93['iconWidth'],_0xca0aaf=_0x4649f0['iconHeight']/0x2,_0x5b9230=_0x1bc77e[_0x18a699(0xc0)]();this[_0x18a699(0x160)](_0x5b9230),this['changeOutlineColor'](_0x18a699(0xff)),this[_0x18a699(0x2e8)][_0x18a699(0x365)]=!![],this[_0x18a699(0x2e8)][_0x18a699(0x361)]=_0x1708d7[_0x18a699(0x36a)][_0x18a699(0x385)][_0x18a699(0x10a)]['DataFontSize'],_0x52e824+=_0x30291a[_0x18a699(0x36a)][_0x18a699(0x385)][_0x18a699(0x10a)][_0x18a699(0x79)],_0x457d2e+=_0x4ce5e5['SkillsStatesCore'][_0x18a699(0x385)]['States'][_0x18a699(0xd2)];const _0x4b1e1c=_0x5e4d3b(_0x1a386e['getStateDisplay'](_0x4cc642['id']));this['drawText'](_0x4b1e1c,_0x2e6a24,_0x126273,_0xafc787,_0x18a699(0x17e)),this[_0x18a699(0x2e8)][_0x18a699(0x365)]=![],this[_0x18a699(0x303)]();}else return String(RegExp['$1']);}else{if(_0x1c0ea1==='mp'&&_0x533b3a[_0x18a699(0xe2)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1c0ea1==='tp'&&_0x533b3a[_0x18a699(0xe2)](/<REPLACE TP GAUGE:[ ](.*)>/i)){if(_0x18a699(0x195)!=='smLNJ')return String(RegExp['$1']);else _0x5c99b9[_0x18a699(0x36a)][_0x18a699(0x364)]['call'](this),this[_0x18a699(0x9f)](),_0x769459['SkillsStatesCore'][_0x18a699(0x30e)]();}else return _0x1c0ea1;}}},VisuMZ['SkillsStatesCore'][_0x13e91f(0x2ba)]=Window_StatusBase[_0x13e91f(0x214)][_0x13e91f(0x2a1)],Window_StatusBase[_0x13e91f(0x214)][_0x13e91f(0x2a1)]=function(_0x14a246,_0x53fd24,_0x50a25e,_0x1d22c5){const _0x5f1581=_0x13e91f;if(!_0x14a246)return;Window_Base[_0x5f1581(0x214)][_0x5f1581(0x2a1)][_0x5f1581(0x1c4)](this,_0x14a246,_0x53fd24,_0x50a25e,_0x1d22c5);},VisuMZ[_0x13e91f(0x36a)]['Window_SkillType_initialize']=Window_SkillType[_0x13e91f(0x214)]['initialize'],Window_SkillType['prototype'][_0x13e91f(0x263)]=function(_0x362560){const _0x49b403=_0x13e91f;VisuMZ[_0x49b403(0x36a)][_0x49b403(0xb9)][_0x49b403(0x1c4)](this,_0x362560),this['createCommandNameWindow'](_0x362560);},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x262)]=function(_0x4d80cc){const _0xcc9b49=_0x13e91f,_0x49a364=new Rectangle(0x0,0x0,_0x4d80cc[_0xcc9b49(0xc4)],_0x4d80cc[_0xcc9b49(0x114)]);this['_commandNameWindow']=new Window_Base(_0x49a364),this[_0xcc9b49(0xeb)][_0xcc9b49(0x15f)]=0x0,this[_0xcc9b49(0x324)](this[_0xcc9b49(0xeb)]),this[_0xcc9b49(0x32a)]();},Window_SkillType['prototype'][_0x13e91f(0x31a)]=function(){const _0x581a98=_0x13e91f;Window_Command[_0x581a98(0x214)][_0x581a98(0x31a)][_0x581a98(0x1c4)](this);if(this[_0x581a98(0xeb)])this[_0x581a98(0x32a)]();},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x32a)]=function(){const _0x33c785=_0x13e91f,_0x1b3e52=this[_0x33c785(0xeb)];_0x1b3e52[_0x33c785(0x2e8)][_0x33c785(0xae)]();const _0x34148e=this['commandStyleCheck'](this['index']());if(_0x34148e==='icon'&&this[_0x33c785(0xf6)]()>0x0){const _0x2deae2=this[_0x33c785(0x37f)](this[_0x33c785(0x27a)]());let _0x4a6f53=this[_0x33c785(0x326)](this['index']());_0x4a6f53=_0x4a6f53[_0x33c785(0x260)](/\\I\[(\d+)\]/gi,''),_0x1b3e52[_0x33c785(0x303)](),this[_0x33c785(0x1cd)](_0x4a6f53,_0x2deae2),this[_0x33c785(0x7d)](_0x4a6f53,_0x2deae2),this[_0x33c785(0x180)](_0x4a6f53,_0x2deae2);}},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x1cd)]=function(_0x340fcf,_0x32a9aa){},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x7d)]=function(_0x77d473,_0x39e1e2){const _0x4baba9=_0x13e91f,_0x268ada=this['_commandNameWindow'];_0x268ada[_0x4baba9(0x17f)](_0x77d473,0x0,_0x39e1e2['y'],_0x268ada[_0x4baba9(0x281)],_0x4baba9(0x17e));},Window_SkillType[_0x13e91f(0x214)]['commandNameWindowCenter']=function(_0x54ccd2,_0x560fe3){const _0x1a8008=_0x13e91f,_0x29fea1=this[_0x1a8008(0xeb)],_0x12b491=$gameSystem[_0x1a8008(0x25e)](),_0x4f630a=_0x560fe3['x']+Math[_0x1a8008(0x141)](_0x560fe3['width']/0x2)+_0x12b491;_0x29fea1['x']=_0x29fea1['width']/-0x2+_0x4f630a,_0x29fea1['y']=Math[_0x1a8008(0x141)](_0x560fe3[_0x1a8008(0x114)]/0x2);},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x368)]=function(){const _0x36861a=_0x13e91f;return Imported['VisuMZ_0_CoreEngine']&&Window_Command['prototype'][_0x36861a(0x368)][_0x36861a(0x1c4)](this);},Window_SkillType['prototype']['makeCommandList']=function(){const _0x23fa06=_0x13e91f;if(!this[_0x23fa06(0x8c)])return;const _0x564cc4=this['_actor'][_0x23fa06(0x2dc)]();for(const _0x1fbce8 of _0x564cc4){if(_0x23fa06(0x20d)!==_0x23fa06(0x20d)){if(!_0x28271b[_0x23fa06(0x392)](_0x126ee8))return!![];}else{const _0x2dd3e7=this[_0x23fa06(0x2b8)](_0x1fbce8);this[_0x23fa06(0x25d)](_0x2dd3e7,_0x23fa06(0x332),!![],_0x1fbce8);}}},Window_SkillType[_0x13e91f(0x214)]['makeCommandName']=function(_0x3558b3){const _0xd23e86=_0x13e91f;let _0x37689f=$dataSystem[_0xd23e86(0x2dc)][_0x3558b3];if(_0x37689f[_0xd23e86(0xe2)](/\\I\[(\d+)\]/i))return _0x37689f;if(this[_0xd23e86(0xa9)]()==='text')return _0x37689f;const _0x1ea787=VisuMZ[_0xd23e86(0x36a)][_0xd23e86(0x385)][_0xd23e86(0x305)],_0x115dd7=$dataSystem['magicSkills']['includes'](_0x3558b3),_0x42916b=_0x115dd7?_0x1ea787['IconStypeMagic']:_0x1ea787['IconStypeNorm'];return _0xd23e86(0x275)['format'](_0x42916b,_0x37689f);},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x387)]=function(){const _0x22b2b4=_0x13e91f;return VisuMZ[_0x22b2b4(0x36a)][_0x22b2b4(0x385)][_0x22b2b4(0x305)][_0x22b2b4(0x346)];},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x16c)]=function(_0x12c56b){const _0xbfeffa=_0x13e91f,_0x48dd36=this[_0xbfeffa(0x26e)](_0x12c56b);if(_0x48dd36==='iconText')_0xbfeffa(0x9a)!==_0xbfeffa(0x9a)?_0x551db4=this[_0xbfeffa(0x14a)]():this[_0xbfeffa(0x2d0)](_0x12c56b);else{if(_0x48dd36===_0xbfeffa(0x35f))this[_0xbfeffa(0x380)](_0x12c56b);else{if(_0xbfeffa(0x163)!=='FIXyY'){if(!this[_0xbfeffa(0x8c)])return;const _0x316beb=this['_actor'][_0xbfeffa(0x2dc)]();for(const _0x103df9 of _0x316beb){const _0x312728=this['makeCommandName'](_0x103df9);this[_0xbfeffa(0x25d)](_0x312728,_0xbfeffa(0x332),!![],_0x103df9);}}else Window_Command[_0xbfeffa(0x214)]['drawItem'][_0xbfeffa(0x1c4)](this,_0x12c56b);}}},Window_SkillType[_0x13e91f(0x214)]['commandStyle']=function(){const _0x28c86a=_0x13e91f;return VisuMZ[_0x28c86a(0x36a)][_0x28c86a(0x385)][_0x28c86a(0x305)]['CmdStyle'];},Window_SkillType[_0x13e91f(0x214)][_0x13e91f(0x26e)]=function(_0x31aff4){const _0x21c250=_0x13e91f;if(_0x31aff4<0x0)return'text';const _0x45b356=this['commandStyle']();if(_0x45b356!==_0x21c250(0x2cc)){if('qXrdk'!==_0x21c250(0x294)){const _0x3e458b=_0x60000c[_0x21c250(0xed)]('['+_0x5a738a['$1'][_0x21c250(0xe2)](/\d+/g)+']');this[_0x21c250(0x1e9)][_0x2fbefe['id']]=this[_0x21c250(0x1e9)][_0x4c83ba['id']]['concat'](_0x3e458b);}else return _0x45b356;}else{if(this[_0x21c250(0xf6)]()>0x0){const _0x42694d=this[_0x21c250(0x326)](_0x31aff4);if(_0x42694d[_0x21c250(0xe2)](/\\I\[(\d+)\]/i)){if(_0x21c250(0x172)===_0x21c250(0x36c))return!![];else{const _0x4258e4=this[_0x21c250(0x37f)](_0x31aff4),_0x17fbc2=this[_0x21c250(0x28e)](_0x42694d)[_0x21c250(0xc4)];return _0x17fbc2<=_0x4258e4[_0x21c250(0xc4)]?_0x21c250(0x1c5):_0x21c250(0x35f);}}}}return _0x21c250(0x133);},Window_SkillType[_0x13e91f(0x214)]['drawItemStyleIconText']=function(_0x32b93f){const _0x570735=_0x13e91f,_0x295508=this['itemLineRect'](_0x32b93f),_0x800e9=this[_0x570735(0x326)](_0x32b93f),_0x29e0f8=this[_0x570735(0x28e)](_0x800e9)['width'];this[_0x570735(0x23c)](this[_0x570735(0x15d)](_0x32b93f));const _0x352d2d=this[_0x570735(0x387)]();if(_0x352d2d===_0x570735(0x1fa))_0x570735(0x212)!==_0x570735(0x212)?_0x5c58ba=_0x1ec031[_0x570735(0x2ca)](_0xf4c85d,_0x33526b):this[_0x570735(0x20a)](_0x800e9,_0x295508['x']+_0x295508[_0x570735(0xc4)]-_0x29e0f8,_0x295508['y'],_0x29e0f8);else{if(_0x352d2d===_0x570735(0x17e)){const _0x28813d=_0x295508['x']+Math[_0x570735(0x141)]((_0x295508[_0x570735(0xc4)]-_0x29e0f8)/0x2);this[_0x570735(0x20a)](_0x800e9,_0x28813d,_0x295508['y'],_0x29e0f8);}else this[_0x570735(0x20a)](_0x800e9,_0x295508['x'],_0x295508['y'],_0x29e0f8);}},Window_SkillType[_0x13e91f(0x214)]['drawItemStyleIcon']=function(_0x3fa7b3){const _0x4f0941=_0x13e91f;this['commandName'](_0x3fa7b3)[_0x4f0941(0xe2)](/\\I\[(\d+)\]/i);const _0x279850=Number(RegExp['$1'])||0x0,_0x45fe40=this[_0x4f0941(0x37f)](_0x3fa7b3),_0x33b8b4=_0x45fe40['x']+Math[_0x4f0941(0x141)]((_0x45fe40[_0x4f0941(0xc4)]-ImageManager[_0x4f0941(0x184)])/0x2),_0xfa4215=_0x45fe40['y']+(_0x45fe40[_0x4f0941(0x114)]-ImageManager[_0x4f0941(0x377)])/0x2;this[_0x4f0941(0x338)](_0x279850,_0x33b8b4,_0xfa4215);},VisuMZ[_0x13e91f(0x36a)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x13e91f(0x214)][_0x13e91f(0x81)],Window_SkillStatus[_0x13e91f(0x214)][_0x13e91f(0x81)]=function(){const _0x3f704d=_0x13e91f;VisuMZ[_0x3f704d(0x36a)]['Window_SkillStatus_refresh']['call'](this);if(this['_actor'])this[_0x3f704d(0x311)]();},Window_SkillStatus[_0x13e91f(0x214)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x47cd95=_0x13e91f;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x47cd95(0xc2)])return;const _0x3e8561=this['gaugeLineHeight']();let _0x11a427=this[_0x47cd95(0x220)]()/0x2+0xb4+0xb4+0xb4,_0x34ef4e=this['innerWidth']-_0x11a427-0x2;if(_0x34ef4e>=0x12c){if(_0x47cd95(0x148)!==_0x47cd95(0x148)){this[_0x47cd95(0x10f)](_0x56702a);;}else{const _0x121669=VisuMZ['CoreEngine'][_0x47cd95(0x385)][_0x47cd95(0x301)][_0x47cd95(0x7c)],_0x2b4883=Math['floor'](_0x34ef4e/0x2)-0x18;let _0x4f4e55=_0x11a427,_0x2f5a5a=Math[_0x47cd95(0x141)]((this['innerHeight']-Math[_0x47cd95(0x29b)](_0x121669[_0x47cd95(0xa3)]/0x2)*_0x3e8561)/0x2),_0xf2ecd7=0x0;for(const _0x19e5dd of _0x121669){this[_0x47cd95(0xde)](_0x4f4e55,_0x2f5a5a,_0x2b4883,_0x19e5dd),_0xf2ecd7++,_0xf2ecd7%0x2===0x0?(_0x4f4e55=_0x11a427,_0x2f5a5a+=_0x3e8561):_0x4f4e55+=_0x2b4883+0x18;}}}this[_0x47cd95(0x303)]();},Window_SkillStatus[_0x13e91f(0x214)]['drawExtendedParameter']=function(_0x24f344,_0x2286aa,_0x26dabf,_0x1c45d6){const _0x12e422=_0x13e91f,_0x420c82=this[_0x12e422(0x2b1)]();this[_0x12e422(0x303)](),this[_0x12e422(0x15a)](_0x24f344,_0x2286aa,_0x26dabf,_0x1c45d6,!![]),this[_0x12e422(0x1c1)](),this[_0x12e422(0x2e8)][_0x12e422(0x361)]-=0x8;const _0x3617cf=this[_0x12e422(0x8c)]['paramValueByName'](_0x1c45d6,!![]);this[_0x12e422(0x2e8)][_0x12e422(0x17f)](_0x3617cf,_0x24f344,_0x2286aa,_0x26dabf,_0x420c82,'right');},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x11a)]=Window_SkillList['prototype']['includes'],Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0xbf)]=function(_0x4da3ea){const _0x35ebb4=_0x13e91f;return this[_0x35ebb4(0x177)](_0x4da3ea);},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x1e3)]=Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x1dd)],Window_SkillList[_0x13e91f(0x214)]['maxCols']=function(){const _0xc85de=_0x13e91f;return SceneManager[_0xc85de(0x2ec)][_0xc85de(0x8b)]===Scene_Battle?VisuMZ['SkillsStatesCore'][_0xc85de(0x1e3)][_0xc85de(0x1c4)](this):VisuMZ[_0xc85de(0x36a)]['Settings'][_0xc85de(0x305)][_0xc85de(0xd3)];},VisuMZ['SkillsStatesCore'][_0x13e91f(0x38f)]=Window_SkillList['prototype'][_0x13e91f(0x19f)],Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x19f)]=function(_0x3203f1){const _0x244dee=_0x13e91f,_0x1162ef=this['_actor']!==_0x3203f1;VisuMZ[_0x244dee(0x36a)][_0x244dee(0x38f)][_0x244dee(0x1c4)](this,_0x3203f1),_0x1162ef&&(_0x244dee(0x18e)!==_0x244dee(0x22a)?this[_0x244dee(0x16f)]&&this[_0x244dee(0x16f)]['constructor']===Window_ShopStatus&&this[_0x244dee(0x16f)][_0x244dee(0xe5)](this[_0x244dee(0x124)](0x0)):(_0x519683[_0x244dee(0x36a)]['Game_Actor_learnSkill']['call'](this,_0x402e6a),this[_0x244dee(0x2db)]={}));},Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x269)]=function(_0x1aab08){const _0x571077=_0x13e91f;if(this[_0x571077(0x2f3)]===_0x1aab08)return;this[_0x571077(0x2f3)]=_0x1aab08,this[_0x571077(0x81)](),this[_0x571077(0x170)](0x0,0x0),this['_statusWindow']&&this[_0x571077(0x16f)]['constructor']===Window_ShopStatus&&this['_statusWindow'][_0x571077(0xe5)](this[_0x571077(0x124)](0x0));},Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x177)]=function(_0x35264e){const _0x3823f4=_0x13e91f;if(!_0x35264e)return VisuMZ['SkillsStatesCore'][_0x3823f4(0x11a)]['call'](this,_0x35264e);if(!this[_0x3823f4(0x2e9)](_0x35264e))return![];if(!this[_0x3823f4(0x8a)](_0x35264e))return![];if(!this['checkShowHideJS'](_0x35264e))return![];return!![];},Window_SkillList[_0x13e91f(0x214)]['checkSkillTypeMatch']=function(_0xfad084){const _0x99cf08=_0x13e91f;return DataManager[_0x99cf08(0x1d9)](_0xfad084)[_0x99cf08(0xbf)](this[_0x99cf08(0x2f3)]);},Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x8a)]=function(_0x584cc1){const _0xcabcab=_0x13e91f;if(!VisuMZ[_0xcabcab(0x36a)]['CheckVisibleBattleNotetags'](this[_0xcabcab(0x8c)],_0x584cc1))return![];if(!VisuMZ[_0xcabcab(0x36a)]['CheckVisibleSwitchNotetags'](this[_0xcabcab(0x8c)],_0x584cc1))return![];if(!VisuMZ[_0xcabcab(0x36a)][_0xcabcab(0x254)](this[_0xcabcab(0x8c)],_0x584cc1))return![];return!![];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x333)]=function(_0x266e1d,_0x30b311){const _0x4e3c68=_0x13e91f,_0x3c4876=_0x30b311[_0x4e3c68(0x98)];if(_0x3c4876[_0x4e3c68(0xe2)](/<HIDE IN BATTLE>/i)&&$gameParty['inBattle']()){if(_0x4e3c68(0x10e)!==_0x4e3c68(0x10e))this[_0x4e3c68(0xcc)]=this[_0x4e3c68(0xcc)]||{},delete this[_0x4e3c68(0xcc)][_0x56ce78];else return![];}else{if(_0x3c4876[_0x4e3c68(0xe2)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']())return'AYVTK'!=='agpAG'?![]:_0x14019a-_0x491f8b;else{if(_0x4e3c68(0x348)!==_0x4e3c68(0x348))this[_0x4e3c68(0x2db)]={},this[_0x4e3c68(0x2b2)](),_0x3e8908['SkillsStatesCore'][_0x4e3c68(0x2c6)]['call'](this);else return!![];}}},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x312)]=function(_0x569741,_0x355f0d){const _0x4dbca7=_0x13e91f,_0x313081=_0x355f0d['note'];if(_0x313081[_0x4dbca7(0xe2)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2cf3c7=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x11b87a of _0x2cf3c7){if(!$gameSwitches[_0x4dbca7(0x118)](_0x11b87a))return![];}return!![];}if(_0x313081['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x61fb99=JSON[_0x4dbca7(0xed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x592339 of _0x61fb99){if(!$gameSwitches[_0x4dbca7(0x118)](_0x592339))return![];}return!![];}if(_0x313081['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x50c565=JSON['parse']('['+RegExp['$1'][_0x4dbca7(0xe2)](/\d+/g)+']');for(const _0x3e9c75 of _0x50c565){if($gameSwitches[_0x4dbca7(0x118)](_0x3e9c75))return!![];}return![];}if(_0x313081[_0x4dbca7(0xe2)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4dbca7(0x38e)===_0x4dbca7(0x33b))_0x4704fc[_0x4dbca7(0x36a)][_0x4dbca7(0x385)][_0x4dbca7(0x379)][_0x4dbca7(0x290)][_0x4dbca7(0x1c4)](this,_0x2281e6);else{const _0x3838b5=JSON[_0x4dbca7(0xed)]('['+RegExp['$1'][_0x4dbca7(0xe2)](/\d+/g)+']');for(const _0x3c6685 of _0x3838b5){if(!$gameSwitches[_0x4dbca7(0x118)](_0x3c6685))return!![];}return![];}}if(_0x313081[_0x4dbca7(0xe2)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xbfad8=JSON[_0x4dbca7(0xed)]('['+RegExp['$1'][_0x4dbca7(0xe2)](/\d+/g)+']');for(const _0x47adb1 of _0xbfad8){if('yVwIo'!==_0x4dbca7(0x157)){if(!$gameSwitches['value'](_0x47adb1))return!![];}else return[];}return![];}if(_0x313081['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x597635=JSON[_0x4dbca7(0xed)]('['+RegExp['$1'][_0x4dbca7(0xe2)](/\d+/g)+']');for(const _0x328d69 of _0x597635){if($gameSwitches['value'](_0x328d69))return![];}return!![];}return!![];},VisuMZ[_0x13e91f(0x36a)][_0x13e91f(0x254)]=function(_0xd60fa8,_0x5d9c14){const _0x14542f=_0x13e91f,_0x2a39ac=_0x5d9c14[_0x14542f(0x98)];if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd19b6f=JSON[_0x14542f(0xed)]('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x2b64e1 of _0xd19b6f){if(!_0xd60fa8[_0x14542f(0x392)](_0x2b64e1))return![];}return!![];}else{if(_0x2a39ac['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x14542f(0xfb)==='DHZXT'){const _0x31e9f5=RegExp['$1']['split'](',');for(const _0x481473 of _0x31e9f5){const _0xd46dce=DataManager[_0x14542f(0xbe)](_0x481473);if(!_0xd46dce)continue;if(!_0xd60fa8['isLearnedSkill'](_0xd46dce))return![];}return!![];}else{if(!_0x433338[_0x14542f(0x118)](_0x4b266f))return![];}}}if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xdd2c86=JSON[_0x14542f(0xed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1616d4 of _0xdd2c86){if(_0x14542f(0x20c)===_0x14542f(0x1af))return _0x503ec3['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x14542f(0x1c4)](this);else{if(!_0xd60fa8['isLearnedSkill'](_0x1616d4))return![];}}return!![];}else{if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x540dcd=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x218e87 of _0x540dcd){const _0x1e5d78=DataManager[_0x14542f(0xbe)](_0x218e87);if(!_0x1e5d78)continue;if(!_0xd60fa8[_0x14542f(0x392)](_0x1e5d78))return![];}return!![];}}if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x14542f(0x1b4)===_0x14542f(0x1b4)){const _0x7475c7=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xee319c of _0x7475c7){if(_0xd60fa8[_0x14542f(0x392)](_0xee319c))return!![];}return![];}else{let _0x12c6de=_0x2aa4f1['skillTypes'][_0xd91c44];if(_0x12c6de['match'](/\\I\[(\d+)\]/i))return _0x12c6de;if(this[_0x14542f(0xa9)]()===_0x14542f(0x133))return _0x12c6de;const _0x14fef=_0x22aceb['SkillsStatesCore'][_0x14542f(0x385)][_0x14542f(0x305)],_0x36bda5=_0x3044c4[_0x14542f(0xf9)][_0x14542f(0xbf)](_0x28911f),_0x48620a=_0x36bda5?_0x14fef['IconStypeMagic']:_0x14fef[_0x14542f(0x329)];return _0x14542f(0x275)[_0x14542f(0x314)](_0x48620a,_0x12c6de);}}else{if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x14542f(0x1ee)===_0x14542f(0x1ee)){const _0x304f79=RegExp['$1']['split'](',');for(const _0x28fde6 of _0x304f79){if(_0x14542f(0x297)===_0x14542f(0x297)){const _0x54aef2=DataManager[_0x14542f(0xbe)](_0x28fde6);if(!_0x54aef2)continue;if(_0xd60fa8[_0x14542f(0x392)](_0x54aef2))return!![];}else _0x545193['addBuffTurns'](_0x659bf9,_0xb7fa9a),this[_0x14542f(0xd1)](_0xd5ce70);}return![];}else for(let _0x193816=0x0;_0x193816<this[_0x14542f(0x134)]();_0x193816++){if(this[_0x14542f(0x331)](_0x193816)){const _0xcc95fa=this[_0x14542f(0x193)][_0x193816];this[_0x14542f(0x182)](_0x193816);if(_0xcc95fa>0x0)this[_0x14542f(0x143)](_0x193816);if(_0xcc95fa<0x0)this[_0x14542f(0x258)](_0x193816);}}}}if(_0x2a39ac['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x14542f(0x390)!==_0x14542f(0x390))_0x580db5=_0x5bf646[_0x14542f(0x12d)](_0x2eca24['$1']),_0x553af5=_0x201c2e(_0x1bc55['$2']);else{const _0x979d35=JSON['parse']('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x2c1e76 of _0x979d35){if(!_0xd60fa8[_0x14542f(0x392)](_0x2c1e76))return!![];}return![];}}else{if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x42a123=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x22c1ba of _0x42a123){if(_0x14542f(0x343)===_0x14542f(0x13b))return this[_0x14542f(0x179)]=this['_currentTroopUniqueID']||_0x2481b6[_0x14542f(0x280)],this['_currentTroopUniqueID'];else{const _0x358538=DataManager['getSkillIdWithName'](_0x22c1ba);if(!_0x358538)continue;if(!_0xd60fa8[_0x14542f(0x392)](_0x358538))return!![];}}return![];}}if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x14542f(0xd0)!==_0x14542f(0x2e4)){const _0x2c02a4=JSON[_0x14542f(0xed)]('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x148bc6 of _0x2c02a4){if(_0x14542f(0x231)!==_0x14542f(0x231))_0x10ee04[_0x14542f(0x36a)][_0x14542f(0x24a)][_0x14542f(0x1c4)](this,_0x1fd23e,_0x52d6e9),this[_0x14542f(0x135)](_0x58c8f3)&&this['onAddBuff'](_0x35ed5a,_0x30bd8f);else{if(!_0xd60fa8[_0x14542f(0x392)](_0x148bc6))return!![];}}return![];}else{if(_0x906548[_0x14542f(0x183)]&&_0x4d41c6['uiHelpPosition']!==_0x38817f)return _0x1d0808[_0x14542f(0x12a)];else{if(this[_0x14542f(0x221)]())return this[_0x14542f(0x2ee)]()[_0x14542f(0xe2)](/LOWER/i);else _0x21e12b[_0x14542f(0x214)][_0x14542f(0x19e)]['call'](this);}}}else{if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x866aee=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x25e640 of _0x866aee){const _0x17b53d=DataManager[_0x14542f(0xbe)](_0x25e640);if(!_0x17b53d)continue;if(!_0xd60fa8['isLearnedSkill'](_0x17b53d))return!![];}return![];}}if(_0x2a39ac['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e53c6=JSON[_0x14542f(0xed)]('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x80a151 of _0x5e53c6){if(_0xd60fa8['isLearnedSkill'](_0x80a151))return![];}return!![];}else{if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4bad5e=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x1c9301 of _0x4bad5e){const _0x2206ed=DataManager['getSkillIdWithName'](_0x1c9301);if(!_0x2206ed)continue;if(_0xd60fa8[_0x14542f(0x392)](_0x2206ed))return![];}return!![];}}if(_0x2a39ac['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59ccf9=JSON[_0x14542f(0xed)]('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x41dc7e of _0x59ccf9){if('KgsdS'!==_0x14542f(0x14e)){if(!_0xd60fa8[_0x14542f(0x265)](_0x41dc7e))return![];}else{if(_0x142ecc['uiMenuStyle']&&_0x5b6949[_0x14542f(0x2d1)]!==_0x3804e0)return _0x11a829[_0x14542f(0x2d1)];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x14542f(0x2ee)]()[_0x14542f(0xe2)](/RIGHT/i):_0x28e25e[_0x14542f(0x214)][_0x14542f(0x19e)]['call'](this);}}return!![];}else{if(_0x2a39ac['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x49c9f8=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x195aff of _0x49c9f8){if('pfbtY'===_0x14542f(0x2b4)){const _0x5d2d1e=_0x32de40[_0x14542f(0x36a)][_0x14542f(0x385)][_0x14542f(0x379)][_0x14542f(0x31e)];this[_0x14542f(0x199)][_0x3d88e4]=_0x175c70['clamp'](0x0,_0x5d2d1e);}else{const _0x3e4045=DataManager[_0x14542f(0xbe)](_0x195aff);if(!_0x3e4045)continue;if(!_0xd60fa8[_0x14542f(0x265)](_0x3e4045))return![];}}return!![];}}if(_0x2a39ac['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('tPLIz'===_0x14542f(0x2f1))return _0x3b5079[_0x14542f(0x36a)][_0x14542f(0x385)]['States'][_0x14542f(0x287)];else{const _0x1785a2=JSON[_0x14542f(0xed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1905ef of _0x1785a2){if(!_0xd60fa8[_0x14542f(0x265)](_0x1905ef))return![];}return!![];}}else{if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1bf368=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x5b5a56 of _0x1bf368){const _0x548dcd=DataManager['getSkillIdWithName'](_0x5b5a56);if(!_0x548dcd)continue;if(!_0xd60fa8[_0x14542f(0x265)](_0x548dcd))return![];}return!![];}}if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x14542f(0x18c)===_0x14542f(0x18c)){const _0x2f0c79=JSON[_0x14542f(0xed)]('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x5ac664 of _0x2f0c79){if(_0x14542f(0x1ea)===_0x14542f(0x1ea)){if(_0xd60fa8['hasSkill'](_0x5ac664))return!![];}else this['drawItemStyleIcon'](_0x56ba55);}return![];}else{const _0x109a3e=_0x51f5bf['parse']('['+_0x25389f['$1']['match'](/\d+/g)+']');for(const _0x1d7ed2 of _0x109a3e){if(!_0x509526['value'](_0x1d7ed2))return![];}return!![];}}else{if(_0x2a39ac[_0x14542f(0xe2)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x14542f(0x2cb)!==_0x14542f(0x2cb))return _0x463dc1;else{const _0x21ce2d=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x38ff24 of _0x21ce2d){const _0x32be63=DataManager[_0x14542f(0xbe)](_0x38ff24);if(!_0x32be63)continue;if(_0xd60fa8[_0x14542f(0x265)](_0x32be63))return!![];}return![];}}}if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17d8e0=JSON['parse']('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x19145c of _0x17d8e0){if(!_0xd60fa8[_0x14542f(0x265)](_0x19145c))return!![];}return![];}else{if(_0x2a39ac['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x14542f(0x1e6)!==_0x14542f(0x144)){const _0x593953=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0xd59d13 of _0x593953){const _0x3f2ff4=DataManager[_0x14542f(0xbe)](_0xd59d13);if(!_0x3f2ff4)continue;if(!_0xd60fa8[_0x14542f(0x265)](_0x3f2ff4))return!![];}return![];}else{const _0xf23e16=_0x57b486(_0x16efe9['$1']),_0x11ee39=_0x5adeb6[_0x14542f(0x314)](_0xf23e16,'damage',-0x1,_0x14542f(0x19d));_0x5b75e6[_0x14542f(0x36a)][_0x14542f(0x2e5)][_0x2f6de6['id']]=new _0x4fbf98(_0x14542f(0x381),_0x11ee39);}}}if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ca952=JSON[_0x14542f(0xed)]('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x597244 of _0x3ca952){if(!_0xd60fa8[_0x14542f(0x265)](_0x597244))return!![];}return![];}else{if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x14542f(0x339)===_0x14542f(0x128))_0x101e26[_0x14542f(0x36a)][_0x14542f(0x96)]['call'](this,_0x76110b),this['makeCurrentTroopUniqueID']();else{const _0x1c2c65=RegExp['$1']['split'](',');for(const _0x4ef7d1 of _0x1c2c65){const _0x3b7896=DataManager['getSkillIdWithName'](_0x4ef7d1);if(!_0x3b7896)continue;if(!_0xd60fa8[_0x14542f(0x265)](_0x3b7896))return!![];}return![];}}}if(_0x2a39ac[_0x14542f(0xe2)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x14542f(0x256)===_0x14542f(0x256)){const _0x13baae=JSON[_0x14542f(0xed)]('['+RegExp['$1'][_0x14542f(0xe2)](/\d+/g)+']');for(const _0x4efa6c of _0x13baae){if(_0x14542f(0x161)!==_0x14542f(0x33a)){if(_0xd60fa8[_0x14542f(0x265)](_0x4efa6c))return![];}else{_0x47e5bb[_0x14542f(0xe2)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x20429e=_0x558520[_0x14542f(0x106)](_0x1d5dcf(_0x4e7513['$1'])['toUpperCase']()),_0x17cd7f=_0x4ce410(_0x4b7d35['$2']);_0x20429e>=0x0&&(_0xe5ea94[_0x14542f(0x190)](_0x20429e,_0x17cd7f),this[_0x14542f(0xd1)](_0x21778a));}}return!![];}else{const _0x2df761=[];for(let _0x45c217 of _0x5a19b9){_0x45c217=(_0x214780(_0x45c217)||'')[_0x14542f(0x1df)]();const _0x5a6509=/^\d+$/['test'](_0x45c217);_0x5a6509?_0x2df761[_0x14542f(0x334)](_0x3ce0bc(_0x45c217)):_0x2df761[_0x14542f(0x334)](_0x16bc2b['getClassIdWithName'](_0x45c217));}return _0x2df761[_0x14542f(0x123)](_0x902f19=>_0x51a4ae[_0x11d5ce(_0x902f19)])[_0x14542f(0x1a0)](null);}}else{if(_0x2a39ac['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4ac57f=RegExp['$1'][_0x14542f(0x28a)](',');for(const _0x477ead of _0x4ac57f){if(_0x14542f(0x31b)!==_0x14542f(0x31b))return this[_0x14542f(0x302)][_0x14542f(0x37e)]['call'](this[_0x14542f(0x2d3)]);else{const _0x1b71da=DataManager[_0x14542f(0xbe)](_0x477ead);if(!_0x1b71da)continue;if(_0xd60fa8['hasSkill'](_0x1b71da))return![];}}return!![];}}return!![];},Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x2bc)]=function(_0x29edf1){const _0x2c8323=_0x13e91f,_0x49385b=_0x29edf1[_0x2c8323(0x98)],_0x7691ad=VisuMZ['SkillsStatesCore'][_0x2c8323(0x173)];return _0x7691ad[_0x29edf1['id']]?_0x7691ad[_0x29edf1['id']][_0x2c8323(0x1c4)](this,_0x29edf1):!![];},VisuMZ['SkillsStatesCore'][_0x13e91f(0xbd)]=Window_SkillList[_0x13e91f(0x214)]['drawItem'],Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x16c)]=function(_0x1ebb36){const _0x591184=_0x13e91f,_0x4f8b5f=this[_0x591184(0x124)](_0x1ebb36),_0x20af4c=_0x4f8b5f[_0x591184(0x25f)];if(_0x4f8b5f)this[_0x591184(0xdd)](_0x4f8b5f);VisuMZ[_0x591184(0x36a)]['Window_SkillList_drawItem'][_0x591184(0x1c4)](this,_0x1ebb36);if(_0x4f8b5f)_0x4f8b5f[_0x591184(0x25f)]=_0x20af4c;},Window_SkillList[_0x13e91f(0x214)]['alterSkillName']=function(_0x4707b0){const _0x7bee43=_0x13e91f;if(_0x4707b0&&_0x4707b0[_0x7bee43(0x98)]['match'](/<LIST NAME:[ ](.*)>/i)){if(_0x7bee43(0xd9)===_0x7bee43(0x1eb))this[_0x7bee43(0x267)](_0x5dbcba['shift']());else{_0x4707b0[_0x7bee43(0x25f)]=String(RegExp['$1'])[_0x7bee43(0x1df)]();for(;;){if(_0x7bee43(0x203)!==_0x7bee43(0x203)){if(!_0x5bb5df['value'](_0x24a1ce))return![];}else{if(_0x4707b0[_0x7bee43(0x25f)][_0x7bee43(0xe2)](/\\V\[(\d+)\]/gi))_0x4707b0[_0x7bee43(0x25f)]=_0x4707b0['name'][_0x7bee43(0x260)](/\\V\[(\d+)\]/gi,(_0x537743,_0x1fd1af)=>$gameVariables[_0x7bee43(0x118)](parseInt(_0x1fd1af)));else{if('gVeLy'===_0x7bee43(0xa7))break;else return this[_0x7bee43(0x197)](_0x4963db);}}}}}},Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x382)]=function(_0x56c62f,_0x58159d,_0x5b2761,_0x4c22e7){const _0x5064db=_0x13e91f;Window_Base[_0x5064db(0x214)][_0x5064db(0x382)][_0x5064db(0x1c4)](this,this[_0x5064db(0x8c)],_0x56c62f,_0x58159d,_0x5b2761,_0x4c22e7);},Window_SkillList['prototype'][_0x13e91f(0x1c6)]=function(_0x2d0d33){const _0x5edc54=_0x13e91f;this[_0x5edc54(0x16f)]=_0x2d0d33,this[_0x5edc54(0x31a)]();},VisuMZ['SkillsStatesCore'][_0x13e91f(0x2a6)]=Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x239)],Window_SkillList[_0x13e91f(0x214)][_0x13e91f(0x239)]=function(){const _0x26444e=_0x13e91f;VisuMZ[_0x26444e(0x36a)]['Window_SkillList_updateHelp'][_0x26444e(0x1c4)](this),this['_statusWindow']&&this['_statusWindow']['constructor']===Window_ShopStatus&&('LKoEM'===_0x26444e(0x1d6)?(_0x5b4ea9[_0x26444e(0x36a)][_0x26444e(0x20e)][_0x26444e(0x1c4)](this),this[_0x26444e(0x2b2)]()):this[_0x26444e(0x16f)][_0x26444e(0xe5)](this[_0x26444e(0x80)]()));};