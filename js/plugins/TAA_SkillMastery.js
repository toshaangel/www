//=============================================================================
// TAA_SkillMastery.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.skm = {};
TAA.skm.Version = "1.2.1";
TAA.skm.PluginName = "TAA_SkillMastery";
TAA.skm.alias = {};

/*:
 * @target MV MZ
 * 
 * @plugindesc [1.2.1] Skill Mastery
 * @author T. A. A. (taaspider)
 * @url http://taaspider.itch.io/ 
 * 
 * 
 * @help
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Any plugins developed by taaspider are free for use for both commercial and 
 * noncommercial RPG Maker games, unless specified otherwise. Just remember to
 * credit "Taaspider".
 * 
 * Redistribution of parts or the whole of taaspider plugins is forbidden, unless
 * it comes from the official website: http://taaspider.itch.io. You are allowed 
 * to edit and change the plugin code for your own use, but you're definitely not 
 * allowed to sell or reuse any part of the code as your own. Although not 
 * required to use my plugins, a free copy of your game would be nice!
 * 
 * If you enjoy my work, consider offering a donation when downloading my plugins, 
 * or offering a monthly pledge to my Patreon account. It would be of great help!
 * Also, follow me on facebook to get firsthand news on my activities!
 *  Facebook: https://www.facebook.com/taaspider 
 *  Patreon: https://www.patreon.com/taaspider
 * 
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * WARNING: This plugin requires RPG Maker MV 1.5.0 or above! Please make sure 
 * your RPG Maker MV software is up to date before using this plugin.
 * You don't need any specific version if you're using MZ.
 * 
 * -----------------------------------------------------------------------------
 * 
 * This plugin provides functions to add levels and specific level settings to
 * skills. Its goal is to allow a sense of skill mastery, meaning that as a
 * character uses a skill he may slowly get better at using it. What "getting 
 * better" means is completely up to the developer: the skill can get stronger,
 * require less MP to cast, add a state with a critical blow, boost party morale
 * increasing defense, and so on. The plugin includes damage modifiers and custom
 * effects that can be applied to specific skill levels, increasing the fealing
 * of getting more powerful as skill mastery grows!
 * 
 * The plugin's main features are:
 *   - Loading skill level data through a JSON file, making it easier to configure
 * and evolve level data throughout the game development;
 *   - If you're not comfortable working with JSON files, you can also configure
 * skill level data through the Plugin Manager;
 *   - Provides not only formulas for level variations, but also allow more refined
 * control of each skill aspect for each new level;
 *   - Allows TP Gain to be affected by skill levels;
 *   - Skill descriptions can change as it levels up;
 *   - Have specific effects (like applying a state) change as the skill levels up;
 *   - Make as so skill levels can have specific requirements that must be met
 * before skill XP can be gained to achieve the next level (or prevent a character
 * to learn it in the first place);
 *   - Allow skills to gain xp only when a character survives battles, or only when 
 * battles are won;
 *   - Define a list of skills that can't be leveled, like the default Attack and
 * Guard skills;
 * 
 * =============================================================================
 * Datasource Config
 * =============================================================================
 * 
 * The plugin presents two options to input skill level data into your game: a 
 * JSON file or through the Plugin Manager.
 * 
 * When using a JSON File, place it into your game's data folder and configure
 * the Plugin Manager as to how it should be read and which object represents
 * what. In this case, the parameter Plugin Manager Skills should be ignored.
 * 
 * When using the Plugin Manager as input, ignore the parameter JSON Config and
 * focus on the Plugin Manager Skills parameter.
 * 
 * The following section describes the JSON file setup, but the same structure
 * can be found in the Plugin Manager Skills parameter.
 * 
 * =============================================================================
 * Instructions - Setting Up skill level JSON File
 * =============================================================================
 * 
 * Your skill level JSON file must have the following structure:
 *  [
 *      {
 *          "id": <skill id>,
 *          "xpType": 1,
 *          "default": {
 *              "mpCost": <cost>,
 *              "tpCost": <cost>,
 *              "tpGain": <gain>,
 *              "damage": "<damage formula>",
 *              "req": "<requirements, if any>",
 *              "descr": "<skill description>",
 *              "dmgMods": ["<damage modifier tags here>", "<dmgMods>", ...]
 *              "customEffect": ["<effects tags here>", "<effect>", ...]
 *          },
 *          "formulas": {
 *              "mpCost": "<cost formula>",
 *              "tpCost": "<cost formula>",
 *              "tpGain": "<gain formula>",
 *              "xp": "<xp formula>"
 *          },
 *          "levels": [
 *              {
 *                  "mpCost": <cost>,
 *                  "tpCost": <cost>
 *                  "tpGain": <gain>,
 *                  "damage": "<damage formula>",
 *                  "req": "<requirements, if any>",
 *                  "descr": "<skill description>",
 *                  "dmgMods": ["<damage modifier tags here>", "<dmgMods>", ...]
 *                  "customEffect": ["<effects tags here>", "<effect>", ...]
 *              },
 *              {
 *                  "mpCost": <cost>,
 *                  ...
 *              }
 *          ]
 *      },
 *      {
 *          "id": <skill id>,
 *          ...
 *      }
 *  ]
 * 
 * Tag names can be customized with the plugin parameters, so feel free
 * to change them to your liking. But please keep the structure described 
 * above otherwise it won't work.
 * 
 * "xpType" must be used to identify how the skill gains xp. There are
 * three possible values:
 *  - 1: Skill uses
 *  - 2: Battles won
 *  - 3: Battles survived
 * 
 * If no value is provided, the plugin will assume "Skill uses" as default.
 * 
 * The "default" tag includes what are the default values if no level specific
 * data is found (so if these are set, you probably won't need to define
 * data for the skill's first level). The plugin will always search first for
 * specific level data, then defaults, and if none are found it will use
 * the values set through RPG Maker's interface.
 * 
 * The "formulas" array is optional, and must be used only if you want to
 * set formulas for MP and TP cost, TP gain or a custom XP curve formula.
 * If setting a formula, the word "level" will be replaced by the plugin with
 * the current skill level.
 * 
 * The "levels" array is used to include specific changes introduced by each
 * level. You don't need to defined all tags for each level if their values
 * are not changed. For example, if MP cost remains constant until level 5,
 * you can omit the mpCost tag from levels 1 to 4 and use it only on the default
 * array, or defined it only on levels 1 and 5.
 * 
 * The "requirements" tag work different than the others, as it is cumulative. 
 * So a higher level requirement is the sum of all previous level requirements.
 * That is to prevent inconsistencies if a character tries to learn a skill
 * at a higher level without meeting the requirements for its weaker versions.
 * 
 * The "levels" array must list level object in order. If you want to skip
 * changes on a level, simply replace the object with "null" or an empty object
 * "{}", like the example below:
 * 
 *  "levels": [
 *      null,
 *      {
 *          "mpCost": <cost>
 *      },
 *      {},
 *      {
 *          "tpCost": <cost>
 *      }
 *  ]
 * 
 * If a skill has no data defined in the JSON file, skill levels will be
 * disabled (the skill will always be listed as being at the starting level).
 * 
 * The tags "dmgMods" and "customEffects" are arrays of specific plugin code
 * that allows you to program damage modifiers and special custom effects for
 * each level. For a list of supported tags, please refer to the proper 
 * section below.
 * 
 * ============================================================================
 * Plugin Manager as source
 * ============================================================================
 * 
 * Configuring skills through the plugin manager follows a similar structure as
 * doing that from a JSON file. The same options are applied, but a few details
 * are handled differently:
 *  - Whenever MP Cost, TP Cost or TP Gain are set as -1, the value is ignored
 *    by the plugin;
 *  - Blank descriptions, requirements, or damage formulas on a specific skill
 *    level won't override the previous level value, contrary to what happens
 *    when using a JSON file;
 * 
 * Just keep those rules in mind and follow the parameter windows. Remember that
 * a parameter set in one level overwrites the value set in a previous level,
 * but Custom Effects and Damage Modifiers must be set for each level for it to
 * take effect (those two are not incremental like the rest).
 * 
 * ============================================================================
 * Skill Requirements
 * ============================================================================
 * 
 * Skill requirements are treated as eval statements. To make use of the user's
 * data (be it an enemy or an actor), use the suffix "a". For example, to define
 * a requirement where agility is higher than 80, use:
 *      a.agi > 80
 * 
 * You can add more conditions with && (and) or || (or). For example: a skill
 * level that requires agility higher than 80, and also have the skill with id
 * 10 already learned:
 *      a.agi > 80 && a.hasSkill(10)
 * 
 * If you want to set a requirement for having a skill at a specific level,
 * just use the function hasSkill with two parameters, being the first the skill
 * id and the second the required level:
 *      a.agi>80 && a.hasSkill(10, 2)
 * 
 * ============================================================================
 * Damage Modifiers
 * ============================================================================
 * 
 * Damage Modifiers are special codes that changes the skill damage formula.
 * Any specific skill can have multiple modifiers. If a level specific modifier
 * is set, it replaces any previous modifiers for the skill. This makes it
 * easier to manage damage progression from one level to another.
 * 
 * Currently, the following modifiers are supported:
 * 
 * CRITICAL: <TYPE>
 *  Replace <TYPE> with one of the options below:
 *      - 0 or NORMAL: Fall back to MVs default critical hit formula;
 *      - 1, NEVER or DISABLE: Remove any chance of the skill resulting in
 *          a critical hit;
 *      - 2, ALWAYS, ENABLE or FORCE: Force critical hits on all skill uses;
 *  Examples:
 *      CRITICAL: 0
 *      CRITICAL: ENABLE
 *      CRITICAL: NEVER
 * 
 * DAMAGE MOD: <mod>
 * DAMAGE MODIFIER: <mod>
 *  Use one of "<mod>" formats to change the skill damage formula:
 *      - <oper> x, <oper> x%: Replace <oper> by +, -, * or /. This will apply the
 *          specified operand to add, remove, multiply or divide the damage
 *          formula result by the specified number;
 *      Examples:
 *          DAMAGE MOD: +10
 *          DAMAGE MOD: *2
 *          DAMAGE MOD: -5
 *          DAMAGE MODIFIER: +2%
 *          DAMAGE MODIFIER: *10%
 *      - EVAL <expression>: Applies an eval to <expression> to append a 
 *          clause to the damage formula results;
 *      Examples:
 *          DAMAGE MOD: EVAL * (a.hp/a.mhp)
 *          DAMAGE MOD: EVAL + (a.mp/5)
 * 
 * Despite all examples being listed in upper case, the plugin is case 
 * insensitive.
 * 
 * ============================================================================
 * Custom Effects
 * ============================================================================
 * 
 * While damage modifiers are applied before the skill is performed, changing
 * the damage output, custom effects are applied AFTER the skill use.
 * 
 * Currently, the following tags are supported:
 * 
 * ADD STATE: <state> <who> <intensity>
 * ADD STATE: <state> <who> IF VAR <var ID> <operand> <value> THEN <intensity>
 * ADD STATE: <state> <who> IF VARIABLE <var ID> <operand> <value> THEN <intensity>
 * ADD STATE: <state> <who> IF SW <switch ID> <true|false> THEN <intensity>
 * ADD STATE: <state> <who> IF SWITCH <switch ID> <true|false> THEN <intensity>
 * ADD STATE: <state> <who> EVAL: <eval clause>
 * REMOVE STATE: <state> <who> <intensity>
 * REMOVE STATE: <state> <who> IF VAR <var ID> <operand> <value> THEN <intensity>
 * REMOVE STATE: <state> <who> IF VARIABLE <var ID> <operand> <value> THEN <intensity>
 * REMOVE STATE: <state> <who> IF SW <switch ID> <true|false> THEN <intensity>
 * REMOVE STATE: <state> <who> IF SWITCH <switch ID> <true|false> THEN <intensity>
 * REMOVE STATE: <state> <who> EVAL: <eval clause>
 *  Use this effect to add or remove a state effect after the skill is used.
 *  Replace <state> with the state ID or state name enclosed in double quotes,
 *  while <who> must be replaced by one of the following clauses, specifying
 *  who will be affected:
 *      - USER: Affects the skill user;
 *      - PARTY: Affects the user's whole party (or troop, if used by an enemy);
 *      - TARGET, or TARGETS: Affects the skill target, be it one or many;
 *      - DEAD ALLIES: Affects all KOed party, or troop, members;
 *      - DEAD ENEMIES: Affects all KOed enemies, or party members;
 *      - ALIVE ALLIES: Affects all alive party, or troop, members;
 *      - ALIVE ENEMIES: Affects all alive enemies, or party members;
 *      - PARTY BUT USER: Affects the whole party, except the user;
 *      - ENEMIES BUT TARGET: Affects all enemies, except the skill targets; 
 *  <intensity> is optional. It works much like in the editor, as percentage. If
 *  omitted, the plugin will assume 100% intensity.
 *  IF conditions can be used to test for one variable value or a switch state.
 *  You can set an intensity with "THEN <intensity>", but if omitted the plugin
 *  will assume 100% intensity again. <operand> can be any of the following:
 *      >   >=  <   <=  ==  !=  <>
 *  Finally, the "EVAL" condition lets you go crazy. You just need to make sure
 *  your code will return a number, which represents state intensity. You can
 *  reference a as the user and b as the target. Check below for examples.
 *      Examples:
 *          ADD STATE: 10 USER
 *          REMOVE STATE: "Poison" ALIVE ALLIES
 *          ADD STATE: "Bleed" ENEMIES BUT TARGET
 *          REMOVE STATE: 15 PARTY
 *          ADD STATE: 15 TARGET 50
 *          ADD STATE: 15 TARGET IF VARIABLE 1 > 5 THEN 100
 *          REMOVE STATE: 15 USER IF SWITCH 1 true
 *          ADD STATE: 62 TARGET EVAL: (a.mat > b.mdf) ? 100 : 0
 *          ADD STATE: 55 USER EVAL: (a.hp / a.mhp) * 100 
 * 
 * SWITCH n: <action>
 * SWITCH n - m: <action>
 * SWITCH n to m: <action>
 *  Changes one or a series of switches states (replace n and m to specify your
 *  range). The tag <action> can be replaced with one of the following effects:
 *      - on: Set the switch to TRUE;
 *      - off: Set the switch to FALSE;
 *      - toggle: Toggle switch value;
 *      - switch x: Copy switch x value;
 *      Examples:
 *          SWITCH 1: on
 *          SWITCH 5 - 10: off
 *          SWITCH 2 - 4: toggle
 *          SWITCH 10: switch 1
 * 
 * SWITCH n: EVAL <expression>
 * SWITCH n - m: EVAL <expression>
 *  Changes one or a series o switches states (replace n and m to specify your
 *  range) according to the result of an eval operation. The tag <expression>
 *  must be replaced with a script that returns true or false, or integers (where
 *  anything greater than zero will become true, and less or equal to zero false).
 *      Examples:
 *          SWITCH 1: EVAL a.hp/a.mhp > 0.5
 *          SWITCH 2 - 8: EVAL a.hasSkill(4, 5) && a.mp > 150
 * 
 * VAR x <action>
 * VAR x - y <action>
 * VARIABLE x <action>
 * VARIABLE x to y <action>
 *  Changes one or a series of variable values (replace x and y to specify your
 *  range). The tag <action> can be replaced with one of the following effects:
 *      - = N: Sets the variable or range to value N. You can also set to the same
 *          value of the variable N using "= v[N]" instead;
 *      - += N: Add N to the value of the variable. You can also add the value of
 *          the variable N using "+= v[N]" instead;
 *      - -= N: Subtract N from the value of the variable. You can also subtract
 *          the value of the variable N using "-= v[N]" instead;
 *      - *= N: Multiply the variable's value by N. You can also multiply by the
 *          the value of the variable N using "*= v[N]" instead;
 *      - /= N: Divide the variable's value by N. You can also divide by the value
 *          of the variable N using "/= v[N]" instead;
 *      - %= N: Replace the variable's value by the rest of the division of its
 *          current value by N. You may also use "%= v[N]" to divide by the value
 *          of the variable N;
 *      Examples:
 *          VAR 1 = 10
 *          VARIABLE 7 += v[8]
 *          VAR 2 - 7 *= 2
 *          VAR 1 to 4 /= 3
 * 
 * VAR x: EVAL <expression>
 * VAR x - y: EVAL <expression>
 * VARIABLE x: EVAL <expression>
 * VARIABLE x - y: EVAL <expression>
 *  Changes one or a series of variable values (replace x and y to specify your 
 *  range) according to the result of an eval operation. The tag <expression>
 *  must be replaced with a script that returns integers greater or equal to zero.
 *      Examples:
 *          VAR 1: EVAL Math.floor((a.hp / a.mhp) * 100)
 *          VARIABLE 6 - 11: EVAL Math.round(a.mp / a.hp)
 *          VARIABLE 3: EVAL $gameVariables.value(1) + a.hp
 * 
 * EVAL: <eval clause>
 *  Runs an eval on the <eval clause>. You can access the skill user data using the 
 *  object "a" (a.hp, a.mp, a.hasSkill(<skillId>), a.actorId(), ...).
 *      Examples:
 *          EVAL: $gameVariables.setValue(1, a.actorId())
 *          EVAL: a.hp > 100 ? $gameVariables.setValue(1, a.hp) : $gameVariables.setValue(1, 100)
 *          EVAL: $gameVariables.setValue(1, Math.min(100, a.hp))
 * 
 * COMMON EVENT: N
 *  Call common event of number N. One important limitation though, is that a multiple
 *  Common Event calls as custom effects of the same skill is not currently supported.
 *  If you try to insert two or more COMMON EVENT effect, only the last one will be run.
 *  You can have one for each level, but not more than one by level.
 *      Examples:
 *          COMMON EVENT: 10
 * 
 * SUMMON: E[id]
 * SUMMON: E[id,n]
 * SUMMON: E[id], R[rn], LV[l1]
 * SUMMON: E[id,n], R[rn], LV[l1,l2]
 * SUMMON: E[id,n], R[rn], LV[+|-l1,+|-l2]
 * SUMMON: E[id,n], R[rn], LV[+|-l1%,+|-l2%]
 *  Integrates with TAA_EnemyReinforcement and summons enemy reinforcements. Has no effect if
 *  the skill is performed by a party member. Has three possible tags. The first is mandatory,
 *  and should always appear after the ':', specifying the enemy ID to be summoned (E), 
 *  optionally including the number of times the enemy must be called separated by a comma.
 *  The other two tags (R and LV) can be place in any order, but appear one time only.
 *  R must be a number between 0 and 100, and represents the probability of the summoning
 *  being successful. The greater the number, the higher the probability of success. If the
 *  tag is not present, a 100% chance is assumed.
 *  LV can be used to determine a specific level, or level range for the summoned enemies.
 *  YEP_EnemyLevels must be enabled for it to work, otherwise it will be ignored. If a plain
 *  number is specified without being preceded by an operand, the absolute number is used
 *  as wither the lower or upper level boundary. If the operand is in place, the level is
 *  calculated relative to the level of the one using the skill. For example, if the tag is
 *  specified as LV[-5,-2] and the enemy issuing the skill is at level 7, it means that the 
 *  summoned enemy will have a level somewhere 2 and 5, five to two levels below the skill
 *  user level. Alternatively, if the % symbol is present, level range is calculated as
 *  an additional percentage to the skill user level. For example, a tag of LV[-30%,+10%] 
 *  with an enemy of level 10 using the skill results in a summoned reinforcement with level
 *  between 7 and 11, 30% less to 10% over the skill user level.
 *  If a single number is used with the LV tag, be it with ot without an operand, the
 *  summoned enemy will have the exact resulting value as its level.
 * 
 * ON CRITICAL
 *  Add this clause to the start of any of the previous custom effect tags so that
 *  it will only take effect if the skill has landed a critical hit.
 *      Examples:
 *          ON CRITICAL ADD STATE: 5 USER
 *          ON CRITICAL SWITCH 3: on
 *          ON CRITICAL VAR 7 += 1
 *          ON CRITICAL COMMON EVENT: 2
 * 
 * ============================================================================
 * Note Tags
 * ============================================================================
 * 
 * Note tags can be applied to classes, actors or enemies to define starting
 * skill levels. You can set it one at a time using the full tag, or enclose
 * a list of skills between skill mastery tags:
 * 
 * <TAA_SKM: S[1], L[1], X[10]>
 * 
 * or
 * 
 * <TAA_SKM>
 * S[1], L[1]
 * S[2], L[2], X[11]
 * </TAA_SKM>
 * 
 * You can also specify an interval for L and X, like this:
 * 
 * <TAA_SKM: S[1], L[1,3], X[0,5]>
 * 
 * or
 * 
 * <TAA_SKM>
 * S[1], L[1,3], X[0,5]
 * </TAA_SKM>
 * 
 * "S" stands for skill, so the number inside the square brackets must be a
 * valid skill id. "L" means level, and defines the starting level. "X" is xp
 * and is an optional tag. It defines that the skill starts with an amount of
 * xp already gained. This allows you to setup enemies and make it more likely
 * that their skills can level up during battle, or that a playable character
 * included to the party have a skill halfway to the next level.
 * 
 * If you specify an interval for L or X instead of a fixed number, the plugin
 * will calculate a random number inside the interval. This way you can have,
 * for example, enemies in a troop with random experience in the same skill,
 * so that each one may level up at different times. The goal here is to
 * create a layer of unpredictability and make things a bit more interesting
 * to the player!
 * 
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * $gameSystem.getSkillMpCost(skillId, level)
 *  Based on a skill ID and level, returns the skill MP cost. If level is
 *  omitted, returns the cost for the skill's first level.
 * 
 * $gameSystem.getSkillTpCost(skillId, level)
 *  Based on a skill ID and level, returns the skill TP cost. If level is
 *  omitted, returns the cost for the skill's first level.
 * 
 * $gameSystem.getSkillTpGain(skillId, level)
 *  Based on a skill ID and level, returns the skill base TP gain. If level is
 *  omitted, returns the base gain for the skill's first level.
 * 
 * $gameSystem.getSkillDescription(skillId, level)
 *  Based on a skill ID and level, returns the skill's description. If level is
 *  omitted, returns the description for the skill's first level.
 * 
 * $gameSystem.getDamageFormula(skillId, level)
 *  Based on a skill ID and level, returns the skill's damage formula as text.
 *  If level is omitted, returns de formula for the skill's first level.
 * 
 * $gameSystem.actorMeetsRequirements(skillId, level, actorId)
 *  Checks if the actor meets the specific requirements to the referenced
 *  skill at the specified level. If level is undefined or out of the allowed
 *  level range, returns analysis for the skill's first level.
 * 
 * $gameSystem.getSkillXpType(skillId)
 *  Based on a skill ID, returns the XP type for the skill: 1 for skill uses, 
 *  2 for battles won and 3 for battles survived.
 * 
 * $gameSystem.getSkillLevel(skillId, actorId)
 *  Based on the skill and actor IDs, returns the skill level. If the actor
 *  doesn't know the skill, returns 0.
 * 
 * $gameSystem.learnSkill(actorId, skillId, customLevel, customXp)
 *  Teaches an actor the referenced skill. You can use parameters customLevel
 *  and customXp to start the skill at a specific level, and/or halfway to the
 *  next level. These two can be ignored if you wish the actor to learn the
 *  skill at its initial level and with no previous experience.
 * 
 * $gameSystem.getSkillProgression(actorId, skillId)
 *  Returns a number between 0 and 1, where 1 means the next level has been
 *  achieved (or the maximum level has been reached).
 * 
 * $gameSystem.isSkillKnown(actorId, skillId)
 *  Returns true if the actor knows the skill, or false if he doesn't.
 * 
 * $gameSystem.hasSkill(actorId, skillId, skillLevel)
 *  Return true if actor has skill with level greater or equal to skillLevel. If
 *  skillLevel is omitted, return true if has skill with level greater or equal to
 *  minimum level.
 * 
 * $gameSystem.getCurrentSkillXp(actorId, skillId)
 *  Returns the current XP for the skill.
 * 
 * $gameSystem.getSkillXpToNextLevel(actorId, skillId)
 *  Returns how much XP the actor must gain to reach the next skill level.
 * 
 * $gameSystem.getSkillUses(actorId, skillId)
 *  Returns the number of times the skill has been used by the actor.
 * 
 * $gameSystem.gainSkillXp(actorId, skillId, xp)
 *  Adds the specified amount of XP to actor skill.
 * 
 * $gameSystem.setSkillLevel(actorId, skillId, level)
 *  Set skill level for actor capped at the maximum allowed value.
 *  
 * ============================================================================
 * Plugin Commands (MV)
 * ============================================================================
 * 
 * SKM learnSkill <actorId> <skillId> <level>
 *  Teach skill referenced by skillId to actor. The third parameter defines at
 *  which level the skill will be learned. If the level parameter is left blank,
 *  the skill will be learned at the initial level.
 * 
 * SKM learnMultiSkill <actorId> <skillId_1> <skillId_2> ... <skillId_N>
 *  Teaches a number of specified skills to actor at the initial level.
 * 
 * SKM gainXp <actorId> <skillId> <xpAmount>
 *  Increases skill XP for actor (as long as requirements for the next level are
 *  met).
 * 
 * SKM setLevel <actorId> <skillId> <level>
 *  Set skill level to a specified value, capped inside the minimum and maximum
 *  range.
 *  
 * ============================================================================
 * Plugin Commands (MZ)
 * ============================================================================
 * 
 * Learn Skill
 *  Teach a new skill to an actor setting its initial level and XP. Using the
 *  engine default command to add a skill will still work with the skill being
 *  added at the minimum level.
 * 
 * Learn Multiple Skills
 *  Teach a set of skills to an actor at the same time. All skills will be added
 *  at their initial levels.
 * 
 * Gain Skill XP
 *  Increase experience for an actor skill. The amount of experience gained can
 *  be determined by a flat value (parameter XP) or through a variable (parameter
 *  XP from Variable). If XP from Variable is set to a valid variable, its value
 *  is used. Otherwise the flat XP value is applied.
 * 
 * Change Level
 *  Change an actor skill level. The amount of levels to change can be specified
 *  either by a flat value (Level Change) or through a valid variable (Level Change
 *  from Var).
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.0:
 *  - Initial release
 * Version 1.0.1:
 *  - Included new custom effects:
 *      * EVAL clause
 *      * Setting variables with eval clauses
 *      * Setting switches with eval clauses
 *  - Included the option to use intervals for level and xp note tags;
 * Version 1.0.2:
 *  - Few minor bug fixes
 *  - Change in terms of use
 * Version 1.1.0:
 *  - Fixed a bug when skill level was not initialized on database. Using the skill
 *    would cause the game to crash;
 *  - Updates custom effect for Add/Remove state:
 *      * Changed function used to apply/remove state, so that state resistance and
 *        intensity are considered. Previously states were added and removed always
 *        with 100% chance;
 *      * Added option to define how likely the state will be applied/removed, 
 *        much like what we have in the editor;
 *      * Added options to create conditions before applying/removing states.
 *        There's three options: check value of one variable; test one switch;
 *        or go wild with an eval clause;
 *  - Added custom effect integrated with TAA_EnemyReinforcements, allowing skill
 *    levels to change reinforcement summoning behavior.
 *  - Added a new plugin parameter that allows you to disable EnemyReinforcements note
 *    tags and use only custom effect for skill levels. If the parameter is disabled, tags
 *    included in a skill are always processed, regardless of the skill level. Otherwise,
 *    only custom effect SUMMON clauses are considered;
 * Version 1.1.1:
 *  - Added support to variables within the SUMMON custom effect clause;
 * Version 1.2.0:
 *  - Added MZ compatibility;
 *  - Added a new parameter to specify a list of skills which should not be leveled
 *    (like, for example, default attack and guard skills). This prevents this skills
 *    from triggering level up animations and having a level added to their names on
 *    the skill list;
 * Version 1.2.1:
 *  - Fixed a bug that causes the equip scene to crash on MZ;
 * 
 * ============================================================================
 * End of Help
 * ============================================================================
 * 
 * =================================================================================
 * Commands (MZ)
 * =================================================================================
 * 
 * @command learnSkill
 * @text Learn Skill
 * @desc Have an actor learn a new skill.
 * 
 * @arg actor
 * @text Actor ID
 * @type actor
 * @default 
 * @desc Actor who will learn the new skill.
 * 
 * @arg skill
 * @text New Skill
 * @type skill
 * @default 
 * @desc Skill that's going to be learned.
 * 
 * @arg level
 * @text Starting Level
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * @desc Skill starting level after being learned.
 * 
 * @arg xp
 * @text Initial Experience
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc Define a starting experience value for the new skill. The value will be limited to the next level value.
 * 
 * @command learnMultiSkill
 * @text Learn Multiple Skills
 * @desc Learn multiple skills with one plugin command by referencing a list of skill IDs.
 * 
 * @arg actor
 * @text Actor ID
 * @type actor
 * @default
 * @desc Actor who will learn the skills from the list.
 * 
 * @arg skillList
 * @text Skill List
 * @type skill[]
 * @default []
 * @desc Comma separated list of skill IDs (or variable tags) for the actor to learn. All will be learned at the initial level.
 * 
 * @command gainXp
 * @text Gain Skill XP
 * @desc Gain skill experience.
 * 
 * @arg actor
 * @text Actor
 * @type actor
 * @default
 * @desc Actor for which to increase skill experience.
 * 
 * @arg skill
 * @text Skill
 * @type skill
 * @default
 * @desc Skill for which to increase mastery experience.
 * 
 * @arg xp
 * @text XP
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * @desc Amount of XP to gain (if no variable is selected). If the xp exceeds the next level threshold the skill will level up.
 * 
 * @arg xpVar
 * @text XP from Variable
 * @type variable
 * @default
 * @desc Variable from which to read the amount of XP to gain.
 * 
 * @command changeLevel
 * @text Change Level
 * @desc Change actor skill level.
 * 
 * @arg actor
 * @text Actor
 * @type actor
 * @default
 * @desc Actor for which to increase skill experience.
 * 
 * @arg skill
 * @text Skill
 * @type skill
 * @default
 * @desc Skill for which to increase mastery experience.
 * 
 * @arg operation
 * @text Operation
 * @type select
 * @option =
 * @option +
 * @option -
 * @default +
 * @desc Which operation to apply with the level change.
 * 
 * @arg value
 * @text Level Change
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * @desc Value to apply to skill level according to the selected operation (if value variable is not set).
 * 
 * @arg valueVar
 * @text Level Change from Var
 * @type variable
 * @default
 * @desc Variable from which to read the value to apply to skill level according to the selected operation.
 * 
 * =================================================================================
 * Parameters
 * =================================================================================
 * 
 * @param ---DataSource Config---
 * @default
 * 
 * @param Source Type
 * @parent ---DataSource Config---
 * @text DataSource Type
 * @type combo
 * @option JSON File
 * @option Plugin Manager
 * @default JSON File
 * @desc Select the source type from where book data will be loaded into the game.
 * 
 * @param Plugin Manager Skills
 * @parent ---DataSource Config---
 * @type struct<PmSkills>[]
 * @default []
 * @desc Configure skill changes by level using the Plugin Manager.
 * 
 * @param JSON Config
 * @parent ---DataSource Config---
 * @type struct<JsonConfig>
 * @default {"File":"SkillLevels.json","ID Object":"id","Default Object":"default","Level Array Object":"levels","MP Cost Object":"mpCost","TP Cost Object":"tpCost","TP Gain Object":"tpGain","Damage Formula Object":"damage","Requirements Object":"req","Description Object":"descr","Custom Effects Object":"customEffects","Damage Modifiers Object":"dmgMods","EXP Type Object":"xpType","Formula Array Object":"formulas","EXP Formula Object":"xp"}
 * @desc Configure properties when using a JSON file as a datasource.
 * 
 * @param ---Default Global Config---
 * @default
 * 
 * @param Minimum Level
 * @parent ---Default Global Config---
 * @type number
 * @min 0
 * @max 9999
 * @default 1
 * @desc Minimum starting level for any skill.
 * 
 * @param Maximum Level
 * @parent ---Default Global Config---
 * @type number
 * @min 1
 * @max 9999
 * @default 5
 * @desc Maximum level any skill can reach.
 * 
 * @param Unleveled Skills
 * @parent ---Default Global Config---
 * @type skill[]
 * @default []
 * @desc List of skills that don't have levels and should not level up.
 * 
 * @param Skill Name Display
 * @parent ---Default Global Config---
 * @type text
 * @default %1 Lv%2
 * @desc How do we display skill name? 
 * %1 - Skill Name  %2 - Skill Level
 * 
 * @param Default EXP Formula
 * @parent ---Default Global Config---
 * @type text
 * @default level * 15 + 5
 * @desc Default leveling formula.
 * 
 * @param Show Level up Animation
 * @parent ---Default Global Config---
 * @type combo
 * @option None
 * @option Actors Only
 * @option Enemies Only
 * @option Always
 * @default Always
 * @desc Enable/disable animation on skill level up.
 * 
 * @param Level up Animation
 * @parent ---Default Global Config---
 * @type animation
 * @require 1
 * @default 51
 * @desc Animation id to play at skill level up.
 * 
 * @param Level up Message
 * @parent ---Default Global Config---
 * @type text
 * @default %1 leveled up!
 * @desc Text to be displayed on skill level up. Leave it blank to not show any messages. %1 - Skill Name %2 - Actor/Enemy name
 * 
 * @param Enemy Level up Message
 * @parent ---Default Global Config---
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 * @desc Should we show skill level up messages for enemies?
 * 
 * @param Disable ER Tags
 * @parent ---Default Global Config---
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 * @desc If enabled, TAA_EnemyReinforcements will work only when tags are added as skill level custom effects.
 * 
 * @param ---Gauge Config---
 * @default
 * 
 * @param Show Mastery Gauge
 * @parent ---Gauge Config---
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 * @desc Show gauge for mastery progress?
 * 
 * @param Default Gauge Color 1
 * @parent ---Gauge Config---
 * @type number
 * @min 0
 * @max 31
 * @default 12
 * @desc Default primary gauge color, in case no specific level color has been set.
 * 
 * @param Default Gauge Color 2
 * @parent ---Gauge Config---
 * @type number
 * @min 0
 * @max 31
 * @default 4
 * @desc Default secondary gauge color, in case no specific level color has been set.
 * 
 * @param Custom Gauge Colors
 * @parent ---Gauge Config---
 * @type struct<GaugeLevelConfig>[]
 * @default []
 * @desc List of custom gauge colors by skill level.
 * 
 * @param Gauge Type
 * @parent ---Gauge Config---
 * @type combo
 * @option Vertical
 * @option Horizontal
 * @default Vertical
 * @desc Should the gauge be vertical or horizontal?
 * 
 * @param Gauge Height
 * @parent ---Gauge Config---
 * @type number
 * @min 0
 * @max 32
 * @default 32
 * @desc Mastery gauge height.
 * 
 * @param Gauge Width
 * @parent ---Gauge Config---
 * @type number
 * @min 0
 * @max 9999
 * @default 5
 * @desc Mastery gauge width.
 * 
 * @param Gauge Outline
 * @parent ---Gauge Config---
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 * @desc Draw gauge outline?
 * 
 * @param Lock Gauge on Requirements
 * @parent ---Gauge Config---
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 * @desc Defines if we should highlight a locked gauged when requirements for the next level of a skill are not met.
 * 
 * @param Locked Gauge Border Color
 * @parent ---Gauge Config---
 * @type number
 * @min 0
 * @max 31
 * @default 10
 * @desc Color to be used at the border of a locked progression gauge.
 * 
 */

//=============================================================================
// JSON File Configuration
//=============================================================================
 /*~struct~JsonConfig:
 * @param File
 * @type text
 * @default SkillLevels.json
 * @desc Skill Level JSON file on the data folder.
 * 
 * @param ID Object
 * @type text
 * @default id
 * @desc Object for the skill ID (default: id)
 * 
 * @param Default Object
 * @type text
 * @default default
 * @desc Reference to the 'default' object with the default structure for the skill data. (default: default)
 * 
 * @param Level Array Object
 * @type text
 * @default levels
 * @desc Object referencing the array with level specific data. (default: levels)
 * 
 * @param MP Cost Object
 * @type text
 * @default mpCost
 * @desc Object referencing the skill MP Cost. (default: mpCost)
 * 
 * @param TP Cost Object
 * @type text
 * @default tpCost
 * @desc Object referencing the skill TP Cost. (default: tpCost)
 * 
 * @param TP Gain Object
 * @type text
 * @default tpGain
 * @desc Object referencing the skill TP Gain. (default: tpGain)
 * 
 * @param Scope Object
 * @type text
 * @default scope
 * @desc Object referencing the skill scope. (default: scope)
 * 
 * @param Damage Formula Object
 * @type text
 * @default damage
 * @desc Object referencing the skill damage formula. (default: damage)
 * 
 * @param Requirements Object
 * @type text
 * @default req
 * @desc Object referencing the skill requirements. This is an eval. (default: req)
 * 
 * @param Description Object
 * @type text
 * @default descr
 * @desc Object referencing the skill description. (default: descr)
 * 
 * @param Custom Effects Object
 * @type note
 * @default customEffects
 * @desc Object referencing the skill custom effects. (default: customEffects)
 * 
 * @param Damage Modifiers Object
 * @type note
 * @default dmgMods
 * @desc Object referencing the skill damage modifiers. (default: dmgMods)
 * 
 * @param EXP Type Object
 * @type text
 * @default xpType
 * @desc Object defining the type of XP used when leveling up.
 * 
 * @param Formula Array Object
 * @type text
 * @default formulas
 * @desc Optional array containing formula objects for each parameters.
 * 
 * @param EXP Formula Object
 * @type text
 * @default xp
 * @desc Object referencing the formula that defines how much XP is needed to level up.
 * 
 */

//=============================================================================
// Plugin Manager Skills
//=============================================================================
 /*~struct~PmSkills:
  * 
  * @param Skill ID
  * @type number
  * @min 1
  * @max 9999
  * @default 
  * @desc Skill ID for the current config.
  * 
  * @param XP Type
  * @type select
  * @option Skill Uses
  * @value 1
  * @option Battles Won
  * @value 2
  * @option Battles Survived
  * @value 3
  * @default 1
  * @desc How will the user gain experience with this skill?
  * 
  * @param Formulas
  * @type struct<SkillFormulas>
  * @default
  * @desc Formulas to config skill numeric parameters. Don't recommend setting both formulas and specific level values.
  * 
  * @param Default Skill Parameters
  * @type struct<SkillData>
  * @default 
  * @desc Default skill data if no level specific settings are enabled.
  * 
  * @param Level Specific Data
  * @type struct<SkillData>[]
  * @desc Level specific data. Apart from damage mods and custom effects, all other params of one level replaces the previous.
  * 
  */
 
//=============================================================================
// Gauge Level Configuration
//=============================================================================
 /*~struct~SkillData:
  * 
  * @param MP Cost
  * @type number
  * @min -1
  * @max 9999
  * @default -1
  * @desc Skill MP cost. Set -1 if you don't want to define a value.
  * 
  * @param TP Cost
  * @type number
  * @min -1
  * @max 9999
  * @default -1
  * @desc Skill TP cost. Set -1 if you don't want to define a value.
  * 
  * @param TP Gain
  * @type number
  * @min -1
  * @max 9999
  * @default -1
  * @desc Skill TP gain config. Set -1 if you don't want to define a value.
  * 
  * @param Scope
  * @type select
  * @option Disable
  * @value -1
  * @option None
  * @value 0
  * @option 1 Enemy
  * @value 1
  * @option All Enemies
  * @value 2
  * @option 1 Random Enemy
  * @value 3
  * @option 2 Random Enemies
  * @value 4
  * @option 3 Random Enemies
  * @value 5
  * @option 4 Random Enemies
  * @value 6
  * @option 1 Ally
  * @value 7
  * @option All Allies
  * @value 8
  * @option 1 Ally (Dead)
  * @value 9
  * @option All Allies (Dead)
  * @value 10
  * @option The User
  * @value 11
  * @default -1
  * @desc Customize skill scope by skill level. Disable if you don't want to define a value.
  * 
  * @param Damage Formula
  * @type text
  * @desc Skill damage formula (it's an eval, a=user and b=target).
  * 
  * @param Skill Requirements
  * @type text
  * @desc Requirements to learn a skill or unlock progress to level.
  * 
  * @param Description
  * @type note
  * @desc Skill description. Set it only if you want to overwrite last level/default description.
  * 
  * @param Damage Modifiers
  * @type text[]
  * @desc List of damage modifiers enabled. Only effective for current level if set.
  * 
  * @param Custom Effects
  * @type text[]
  * @desc List of custom effects enabled. Only effective for current level if set.
  * 
  */

//=============================================================================
// Skill Level Formula Configuration
//=============================================================================
 /*~struct~SkillFormulas:
  * 
  * @param EXP Formula
  * @type text
  * @desc Formula to calculate skill level up. Uses plugin default if left blank. (it's an eval)
  * 
  * @param MP Cost
  * @type text
  * @desc Formula to calculate skill MP Cost. Is referred to only if specific values are not set. (it's an eval)
  * 
  * @param TP Cost
  * @type text
  * @desc Formula to calculate skill TP Cost. Is referred to only if specific values are not set. (it's an eval)
  * 
  * @param TP Gain
  * @type text
  * @desc Formula to calculate skill TP Gain. Is referred to only if specific values are not set. (it's an eval)
  * 
  */

//=============================================================================
// Gauge Level Configuration
//=============================================================================
 /*~struct~GaugeLevelConfig:
  * 
  * @param Level
  * @type number
  * @min 0
  * @max 9999
  * @desc Level affected by this color settings.
  * 
  * @param Color 1
  * @type number
  * @min 0
  * @max 31
  * @default 12
  * @desc Primary gauge color.
  * 
  * @param Color 2
  * @type number
  * @min 0
  * @max 31
  * @default 4
  * @desc Secondary gauge color.
  * 
  */

//=============================================================================
// Local Functions
//=============================================================================

TAA.skm.functions = TAA.skm.functions || {};
TAA.skm.functions.prepareUnleveledList = function(params){
    var list = params ? JSON.parse(params) : [];
    var result = [];
    if(!list || list.length <= 0) return result;
    for(var i=0; i<list.length; i++){
        if(!isNaN(list[i])){
            result.push(parseInt(list[i]));
        }
    }
    return result;
};

//=============================================================================
// Parameters Setup
//=============================================================================

TAA.skm.Parameters = TAA.skm.Parameters || {};
var Parameters = PluginManager.parameters(TAA.skm.PluginName);

TAA.skm.Parameters.SourceType = Parameters['Source Type'];
TAA.skm.Parameters.JsonConfig = JSON.parse(Parameters['JSON Config']);
TAA.skm.Parameters.PMSkills = JSON.parse(Parameters['Plugin Manager Skills']);

TAA.skm.Parameters.MinLevel = parseInt(Parameters['Minimum Level']);
TAA.skm.Parameters.MaxLevel = parseInt(Parameters['Maximum Level']);
TAA.skm.Parameters.Unleveled = TAA.skm.functions.prepareUnleveledList(Parameters['Unleveled Skills']);
TAA.skm.Parameters.SkillName = Parameters['Skill Name Display'];
TAA.skm.Parameters.XPFormula = Parameters['Default EXP Formula'];

TAA.skm.Parameters.LvlUpAnimConfig = Parameters['Show Level up Animation'];
TAA.skm.Parameters.LvlUpAnimation = parseInt(Parameters['Level up Animation']);
TAA.skm.Parameters.LvlUpMsg = Parameters['Level up Message'] || "";
TAA.skm.Parameters.EnemyLvlUpMsg = JSON.parse(Parameters['Enemy Level up Message']) == true;
TAA.skm.Parameters.ERTag = Parameters['Disable ER Tags'] === 'true';

TAA.skm.Parameters.ShowGauge = JSON.parse(Parameters['Show Mastery Gauge']);
TAA.skm.Parameters.GaugeColor1 = parseInt(Parameters['Default Gauge Color 1']);
TAA.skm.Parameters.GaugeColor2 = parseInt(Parameters['Default Gauge Color 2']);
TAA.skm.Parameters.CustomGaugeColors = JSON.parse(Parameters['Custom Gauge Colors']);
TAA.skm.Parameters.GaugeType = Parameters['Gauge Type'] || 'Vertical';
TAA.skm.Parameters.GaugeHeight = parseInt(Parameters['Gauge Height']);
TAA.skm.Parameters.GaugeWidth = parseInt(Parameters['Gauge Width']);
TAA.skm.Parameters.GaugeOutline = JSON.parse(Parameters['Gauge Outline']);
TAA.skm.Parameters.LockGaugeOnReqs = JSON.parse(Parameters['Lock Gauge on Requirements']);
TAA.skm.Parameters.LockedGaugeColor = parseInt(Parameters['Locked Gauge Border Color']);

//=============================================================================
// DataManager
//=============================================================================

TAA.skm.alias.DataManager = TAA.skm.alias.DataManager || {};
TAA.skm.alias.DataManager.createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function(){
    TAA.skm.alias.DataManager.createGameObjects.call(this);
    SkillManager.initialize();
};

if(TAA.skm.Parameters.SourceType === 'JSON File'){
    var file = TAA.skm.Parameters.JsonConfig['File'] || 'SkillLevels.json';
    DataManager._databaseFiles.push({ name: '$dataSkillLevels', src: file });

    TAA.skm.alias.DataManager.loadDataFile = DataManager.loadDataFile;
    DataManager.loadDataFile = function(name, src){
        var file = TAA.skm.Parameters.JsonConfig['File'] || 'SkillLevels.json';
        file = 'Test_' + file;
        if(src === file)
            src = TAA.skm.Parameters.JsonConfig['File'] || 'SkillLevels.json';
        TAA.skm.alias.DataManager.loadDataFile.call(this, name, src);
    }
}

var $dataSkillLevels = $dataSkillLevels || [];

//=============================================================================
// Skill Manager
//=============================================================================

function SkillManager() {
    throw new Error('This is a static class');
}

/**
 * Initializes Skill Manager
 * 
 * @static
 * @method initialize
 */
SkillManager.initialize = function(){
    if(TAA.skm.Parameters.SourceType === 'JSON File')
        this.initByJson();
    else
        this.initByPluginManager();
    
    this.customizeDataSkill();
};

/**
 * Initializes Skill Manager through a JSON file
 * 
 * @static
 * @method initByJson
 */
SkillManager.initByJson = function(){
    this._defaultDataObject = TAA.skm.Parameters.JsonConfig['Default Object'] || "default";
    this._descriptionObject = TAA.skm.Parameters.JsonConfig['Description Object'] || "descr";
    this._damageFormulaObject = TAA.skm.Parameters.JsonConfig['Damage Formula Object'] || "damage";
    this._idObject = TAA.skm.Parameters.JsonConfig['ID Object'] || "id";
    this._levelArrayObject = TAA.skm.Parameters.JsonConfig['Level Array Object'] || "levels";
    this._reqObject = TAA.skm.Parameters.JsonConfig['Requirements Object'] || "req";
    this._mpCostObject = TAA.skm.Parameters.JsonConfig['MP Cost Object'] || "mpCost";
    this._tpCostObject = TAA.skm.Parameters.JsonConfig['TP Cost Object'] || "tpCost";
    this._tpGainObject = TAA.skm.Parameters.JsonConfig['TP Gain Object'] || "tpGain";
    this._scopeObject = TAA.skm.Parameters.JsonConfig['Scope Object'] || "scope";
    this._xpTypeObject = TAA.skm.Parameters.JsonConfig['EXP Type Object'] || "xpType";
    this._customEffectsObject = TAA.skm.Parameters.JsonConfig['Custom Effects Object'] || "customEffects";
    this._damageModifiersObject = TAA.skm.Parameters.JsonConfig['Damage Modifiers Object'] || "dmgMods";
    this._xpFormulaObject = TAA.skm.Parameters.JsonConfig['EXP Formula Object'] || "xp";
    this._formulaArrayObject = TAA.skm.Parameters.JsonConfig['Formula Array Object'] || "formulas";

    this.reorderDataSkillLevels();
};

/**
 * Initializes Skill Manager through Plugin Manager skills
 * 
 * @static
 * @method initByPluginManager
 */
SkillManager.initByPluginManager = function(){
    this._defaultDataObject = "Default Skill Parameters";
    this._descriptionObject = "Description";
    this._damageFormulaObject = "Damage Formula";
    this._idObject = "Skill ID";
    this._levelArrayObject = "Level Specific Data";
    this._reqObject = "Skill Requirements";
    this._mpCostObject = "MP Cost";
    this._tpCostObject = "TP Cost";
    this._tpGainObject = "TP Gain";
    this._scopeObject = "Scope";
    this._xpTypeObject = "XP Type";
    this._customEffectsObject = "Custom Effects";
    this._damageModifiersObject = "Damage Modifiers";
    this._xpFormulaObject = "EXP Formula";
    this._formulaArrayObject = "Formulas";
    
    for(var i=0; i < TAA.skm.Parameters.PMSkills.length; i++){
        var skmData = this.parsePMSkillItem(JSON.parse(TAA.skm.Parameters.PMSkills[i]));
        var id = skmData[this._idObject];
        if($dataSkillLevels[id] !== undefined)
            console.error("Duplicated ID: " + id + ". Keeping the first entry.");
        else
            $dataSkillLevels[id] = skmData;
    }
};

/**
 * Auxiliary function to parse Plugin Manager skills
 * 
 * @static
 * @method parsePMSkillItem
 */
SkillManager.parsePMSkillItem = function(item){
    var skillData = {};
    skillData[this._idObject] = parseInt(item[this._idObject]);
    skillData[this._xpTypeObject] = (item[this._xpTypeObject] !== undefined) ? parseInt(item[this._xpTypeObject]) : 1;
    var formulas = [];
    if(item[this._formulaArrayObject] !== undefined && item[this._formulaArrayObject] !== "")
        formulas = JSON.parse(item[this._formulaArrayObject]);

    for(var f in formulas){
        var str = formulas[f];
        if(str !== undefined && str !== ""){
            skillData[this._formulaArrayObject] = skillData[this._formulaArrayObject] || {};
            skillData[this._formulaArrayObject][f] = str;
        }
    }
    var defaults = (item[this._defaultDataObject] !== undefined) ? JSON.parse(item[this._defaultDataObject]) : undefined;
    if(defaults !== undefined)
        this.parseSkillObjectGroup(defaults, this._defaultDataObject, skillData, false);
    var levels = (item[this._levelArrayObject] !== undefined) ? JSON.parse(item[this._levelArrayObject]) : [];
    if(levels !== undefined && levels !== []){
        for(var i=0; i < levels.length; i++){
            this.parseSkillObjectGroup(JSON.parse(levels[i]), this._levelArrayObject, skillData, true);
        }
    }

    return skillData;
};

/**
 * Auxiliary function to parse Plugin Manager skills
 * 
 * @static
 * @method parseSkillObjectGroup
 */
SkillManager.parseSkillObjectGroup = function(obj, key, skillData, isArray){
    if(isArray) skillData[key] = skillData[key] || [];
    var newObj = {};
    for(var k in obj){
        if(obj[k] === "" || obj[k] === undefined) continue;
        if(k === "MP Cost" || k === "TP Cost" || k === "TP Gain"){
            if(parseInt(obj[k]) >= 0){
                newObj[k] = parseInt(obj[k]);
            }
        }
        else if(k === "Scope"){
            if(obj[k] !== undefined && !isNaN(obj[k])) newObj[k] = obj[k];
        }
        else if(k === "Damage Formula" || k === "Skill Requirements"){
            newObj[k] = obj[k];
        }
        else if(k === "Description"){
            newObj[k] = JSON.parse(obj[k]);
        }
        else if(obj[k] !== undefined && JSON.parse(obj[k]) !== []){
            newObj[k] =  newObj[k] || [];
            newObj[k] = JSON.parse(obj[k]);
        }
    }
    if(isArray) skillData[key].push(newObj);
    else skillData[key] = newObj;

    return skillData;
}

/**
 * Auxiliary function to reorder skills loaded through a JSON file
 * 
 * @static
 * @method reorderDataSkillLevels
 */
SkillManager.reorderDataSkillLevels = function(){
    var orderedArray = [];
    if($dataSkillLevels === undefined || $dataSkillLevels === null || $dataSkillLevels.length === 0)
        return;
    
    for(var i=0; i< $dataSkillLevels.length; i++){
        if($dataSkillLevels[i] !== undefined && $dataSkillLevels[i][this._idObject] !== undefined){
            var id = $dataSkillLevels[i][this._idObject];

            if(orderedArray[id] !== undefined) 
                console.error("Duplicated ID: " + id + ". Keeping the first entry.");
            else
                orderedArray[id] = $dataSkillLevels[i];   
        }
    }
    $dataSkillLevels = orderedArray.slice();
};

/**
 * Adds custom functions to skill objects to allow ease of access to leveled data
 * 
 * @static
 * @method customizeDataSkill
 */
SkillManager.customizeDataSkill = function(){
    if($dataSkills === undefined || $dataSkills === null || $dataSkills.length === 0)
        return;
    for(var i=1; i < $dataSkills.length; i++){
        var skill = $dataSkills[i];

        // Custom MP Cost
        skill.leveledMpCost = function(level) {
            return SkillManager.getMpCost(this, level);
        };
        // Custom TP Cost
        skill.leveledTpCost = function(level) {
            return SkillManager.getTpCost(this, level);
        };
        // Custom TP Gain
        skill.leveledTpGain = function(level) {
            return SkillManager.getTpGain(this, level);
        };
        // Custom Skill Scope
        skill.leveledScope = function(level) {
            return SkillManager.getScope(this, level);
        };
        // Custom Description
        skill.leveledDescription = function(level) {
            return SkillManager.getDescription(this, level);
        };
        // Custom damage formula
        skill.leveledDamage = function(level){
            return SkillManager.getDamageFormula(this, level);
        };
        // Custom requirement
        skill.requirement = function(level, subject) {
            return SkillManager.requirementsMet(this, level, subject);
        };
        // Custom effects tags
        skill.customEffects = function(subject){
            return SkillManager.getModifiers(this, subject, 'customEffects');
        };
        // Damage modifiers
        skill.damageMods = function(subject){
            return SkillManager.getModifiers(this, subject, 'damageModifiers');
        };

        $dataSkills[i] = skill;
    }
};

/**
 * Returns MP Cost for a specified level
 * 
 * @static
 * @method getMpCost
 */
SkillManager.getMpCost = function(skill, level){
    var id = this.getSkillId(skill);
    if(id === undefined) return skill.mpCost;

    var cost = undefined;
    if(level === undefined)
        cost = this.getDefault(id, 'mpCost');
    else
        cost = this.getParamByLevel(id, level, 'mpCost');
    
    if(cost !== undefined && cost >= 0)
        return cost;
    else
        return skill.mpCost;
};

/**
 * Returns TP Cost for a specified level
 * 
 * @static
 * @method getTpCost
 */
SkillManager.getTpCost = function(skill, level){
    var id = this.getSkillId(skill);
    if(id === undefined) return skill.tpCost;

    var cost = undefined;
    if(level === undefined)
        cost = this.getDefault(id, 'tpCost');
    else
        cost = this.getParamByLevel(id, level, 'tpCost');
    
    if(cost !== undefined && cost >= 0)
        return cost;
    else
        return skill.tpCost;
};

/**
 * Returns TP Gain for a specified level
 * 
 * @static
 * @method getTpGain
 */
SkillManager.getTpGain = function(skill, level){
    var id = this.getSkillId(skill);
    if(id === undefined) return skill.tpGain;

    var cost = undefined;
    if(level === undefined)
        cost = this.getDefault(id, 'tpGain');
    else
        cost = this.getParamByLevel(id, level, 'tpGain');
    
    if(cost !== undefined && cost >= 0)
        return cost;
    else
        return skill.tpGain;
};

/**
 * 
 * @static
 * @method getScope 
 */
SkillManager.getScope = function(skill, level){
    var id = this.getSkillId(skill);
    if(id === undefined) return skill.scope;

    var scope = undefined;
    if(level === undefined)
        scope = this.getDefault(id, 'scope');
    else
        scope = this.getParamByLevel(id, level, 'scope');

    if(scope !== undefined && scope >= 0)
        return scope;
    else
        return skill.scope;
};

/**
 * Returns skill description for a specified level
 * 
 * @static
 * @method getDescription
 */
SkillManager.getDescription = function(skill, level){
    var id = this.getSkillId(skill);
    if(id === undefined) return skill.description;

    var text = undefined;
    if(level === undefined)
        text = this.getDefault(id, 'description');
    else
        text = this.getParamByLevel(id, level, 'description');
    
    if(text !== undefined && text !== "")
        return text;
    else
        return skill.description;
};

/**
 * Returns skill damage formula for a specified level
 * 
 * @static
 * @method getDamageFormula
 */
SkillManager.getDamageFormula = function(skill, level){
    var id = this.getSkillId(skill);
    if(id === undefined) return skill.damage.formula;

    var formula = undefined;
    if(level === undefined)
        formula = this.getDefault(id, 'damage');
    else
        formula = this.getParamByLevel(id, level, 'damage');
    
    if(formula !== undefined && formula !== "")
        return formula;
    else
        return skill.damage.formula;
};

/**
 * Auxiliary function used to get special params from skill by level
 * 
 * @static
 * @method getCodeData
 */
SkillManager.getCodeData = function(skill, subject, level, type){
    var code = undefined;
    var a = subject;
    var id = this.getSkillId(skill);
    if(level === undefined)
        level = TAA.skm.Parameters.MinLevel;
    if(id === undefined) return code;
    if(a._skillMastery[id] === undefined && type !== 'requirements') return code;

    code = this.getParamByLevel(id, level, type);
    return code;
};

/**
 * Checks if skill requirements are met for a specified skill and level
 * 
 * @static
 * @method requirementsMet
 */
SkillManager.requirementsMet = function(skill, level, subject){
    var code = undefined;
    var a = subject;
    
    code = this.getCodeData(skill, subject, level, 'requirements');
    if(code === undefined || code === "")
        return true;
    
    try{
        var evalCode = eval(code);
        return evalCode;
    }
    catch(e){
        return true;
    }
};

/**
 * Return skill modifiers, like damage modifiers and custom effects
 * 
 * @static
 * @method getModifiers
 */
SkillManager.getModifiers = function(skill, subject, type){
    var id = this.getSkillId(skill);
    if(id === undefined || subject._skillMastery[id] === undefined) return "";

    var level = subject._skillMastery[id].level;
    var code = this.getCodeData(skill, subject, level, type);
    return code || "";
};

/**
 * Returns a skill ID
 * 
 * @static
 * @method getSkillId
 */
SkillManager.getSkillId = function(skill){
    if(skill === undefined) return undefined;
    return skill.id;
};

/**
 * Returns skill parameters set in the default object
 * 
 * @static
 * @method getDefault
 */
SkillManager.getDefault = function(id, option){
    if($dataSkillLevels[id] === undefined) return undefined;
    if($dataSkillLevels[id][this._defaultDataObject] === undefined) return undefined;
    switch(option){
        case "mpCost":
            return $dataSkillLevels[id][this._defaultDataObject][this._mpCostObject];
            break;
        case "tpCost":
            return $dataSkillLevels[id][this._defaultDataObject][this._tpCostObject];
            break;
        case "tpGain":
            return $dataSkillLevels[id][this._defaultDataObject][this._tpGainObject];
            break;
        case "scope":
            return $dataSkillLevels[id][this._defaultDataObject][this._scopeObject];
            break;
        case "description":
            return $dataSkillLevels[id][this._defaultDataObject][this._descriptionObject];
            break;
        case "requirements":
            return $dataSkillLevels[id][this._defaultDataObject][this._reqObject];
            break;
        case "customEffects":
            return $dataSkillLevels[id][this._defaultDataObject][this._customEffectsObject];
            break;
        case "damageModifiers":
            return $dataSkillLevels[id][this._defaultDataObject][this._damageModifiersObject];
            break;
        case "damage":
            return $dataSkillLevels[id][this._defaultDataObject][this._damageFormulaObject];
        default:
            return undefined;
    }
};

/**
 * Returns skill parameters by level
 * 
 * @static
 * @method getParamByLevel
 */
SkillManager.getParamByLevel = function(id, level, option){
    var skillData = $dataSkillLevels[id];
    if(skillData === undefined) return undefined;
    var cost;
    var text;
        
    if(skillData[this._levelArrayObject] === undefined || skillData[this._levelArrayObject].length === 0)
        return this.getDefault(id, option);
    switch(option){
        case 'mpCost':
            if(skillData[this._formulaArrayObject] !== undefined && skillData[this._formulaArrayObject][this._mpCostObject] !== undefined){
                cost = this.getParamByFormula(skillData, level, this._mpCostObject);
                if(cost !== undefined) return cost;
            }

            cost = this.getParamFromLevelArray(skillData, level, this._mpCostObject);
            if(cost === undefined) cost = this.getDefault(id, option);
            return cost;
            break;
        case 'tpCost':
            if(skillData[this._formulaArrayObject] !== undefined && skillData[this._formulaArrayObject][this._tpCostObject] !== undefined){
                cost = this.getParamByFormula(skillData, level, this._tpCostObject);
                if(cost !== undefined) return cost;
            }

            cost = this.getParamFromLevelArray(skillData, level, this._tpCostObject);
            if(cost === undefined) cost = this.getDefault(id, option);
            return cost;
            break;
        case 'tpGain':
            if(skillData[this._formulaArrayObject] !== undefined && skillData[this._formulaArrayObject][this._tpGainObject] !== undefined){
                cost = this.getParamByFormula(skillData, level, this._tpGainObject);
                if(cost !== undefined) return cost;
            }

            cost = this.getParamFromLevelArray(skillData, level, this._tpGainObject);
            if(cost === undefined) cost = this.getDefault(id, option);
            return cost;
            break;
        case 'scope':
            var scope = this.getParamFromLevelArray(skillData, level, this._scopeObject);
            if(scope === undefined) scope = this.getDefault(id, option);
            return scope;
            break;
        case 'description':
            text = this.getParamFromLevelArray(skillData, level, this._descriptionObject);
            if(text === undefined) text = this.getDefault(id, option);
            return text;
            break;
        case 'requirements':
            var count = TAA.skm.Parameters.MinLevel;
            var tmp;
            text = "";
            while(count <= level){
                tmp = undefined;
                tmp = this.getParamFromLevelArray(skillData, count, this._reqObject);
                if(tmp !== undefined && tmp !== ""){
                    if(text !== undefined && text !== "") text += " && ";
                    text += tmp;
                }
                count++;
            }
            tmp = undefined;
            tmp = this.getDefault(id, option);
            if(tmp !== undefined && tmp !== ""){
                if(text !== "") text += " && ";
                text += tmp;
            }
            if(text === undefined || text === "") text = true;
            return text;
            break;
        case 'customEffects':
            text = this.getParamFromLevelArray(skillData, level, this._customEffectsObject);
            if(text === undefined) text = this.getDefault(id, option);
            return text;
            break;
        case 'damageModifiers':
            text = this.getParamFromLevelArray(skillData, level, this._damageModifiersObject);
            if(text === undefined) text = this.getDefault(id, option);
            return text;
            break;
        case "damage":
            text = this.getParamFromLevelArray(skillData, level, this._damageFormulaObject);
            if(text === undefined) text = this.getDefault(id, option);
            return text;
            break;
        default:
            return this.getDefault(skillData, object);
    }
};

/**
 * Returns skill parameters defined through formulas
 * 
 * @static
 * @method getParamByFormula
 */
SkillManager.getParamByFormula = function(skillData, level, param){
    if(skillData[this._formulaArrayObject][param] === undefined) return undefined;

    var expression = skillData[this._formulaArrayObject][param].replace(/level/g, level);
    return eval(expression);
};

/**
 * Returns skill XP formula
 * 
 * @static
 * @method getXpFormula
 */
SkillManager.getXpFormula = function(skillData){
    if(skillData === undefined || skillData[this._formulaArrayObject] == undefined || skillData[this._formulaArrayObject].length <= 0 || skillData[this._formulaArrayObject][this._xpFormulaObject] === undefined) 
        return TAA.skm.Parameters.XPFormula;
    return skillData[this._formulaArrayObject][this._xpFormulaObject];
};

/**
 * Returns skill parameter from level array
 * 
 * @static
 * @method getParamFromLevelArray
 */
SkillManager.getParamFromLevelArray = function(skillData, level, param){
    var i = 0;
    var result = undefined;
    while(i < skillData[this._levelArrayObject].length && i <= level){
        if(skillData[this._levelArrayObject][i] !== undefined && skillData[this._levelArrayObject][i] !== null && skillData[this._levelArrayObject][i] !== {} && skillData[this._levelArrayObject][i][param] !== undefined)
            result = skillData[this._levelArrayObject][i][param];
        i++;
    }
    return result;
};

/**
 * Returns default mastery object for a skill
 * 
 * @static
 * @method getDefaultMasteryObject
 */
SkillManager.getDefaultMasteryObject = function(skillId){
    var obj = {};
    obj.level = TAA.skm.Parameters.MinLevel;
    obj.xp = 0;
    obj.uses = 0;
    obj.timesUsed = 0;
    if($dataSkillLevels[skillId] === undefined || $dataSkillLevels[skillId][this._xpTypeObject] === undefined) 
        obj.xpType = 1;
    else
        obj.xpType = $dataSkillLevels[skillId][this._xpTypeObject];
    return obj;
};

/**
 * Increases Skill Mastery by the specified amount
 * 
 * @static
 * @method increaseSkillMastery
 */
SkillManager.increaseSkillMastery = function(skillId, masteryObj, xp){
    if(masteryObj.level === TAA.skm.Parameters.MaxLevel || TAA.skm.Parameters.Unleveled.contains(skillId)) 
        return masteryObj.level;

    var skillData = $dataSkillLevels[skillId];
    var level = masteryObj.level;
    xp += masteryObj.xp;

    var txtFormula = this.getXpFormula(skillData);
    var xpFormula = txtFormula.replace(/level/g, level);
    while(eval(xpFormula) <= xp && level < TAA.skm.Parameters.MaxLevel){
        level++;
        xpFormula = txtFormula.replace(/level/g, level);
    }
    if(level > TAA.skm.Parameters.MaxLevel)
        level = TAA.skm.Parameters.MaxLevel;
    return level;
};

/**
 * Forces skill to the specified value
 * 
 * @static
 * @method setSkillLevel
 */
SkillManager.setSkillLevel = function(skillId, masteryObj, level){
    if(level > TAA.skm.Parameters.MaxLevel)
        masteryObj.level = TAA.skm.Parameters.MaxLevel;
    else if(level < TAA.skm.Parameters.MinLevel)
        masteryObj.level = TAA.skm.Parameters.MinLevel;
    else
        masteryObj.level = level;
        
    return masteryObj;
};

/**
 * Increases skill level
 * 
 * @static
 * @method increaseSkillLevel
 */
SkillManager.increaseSkillLevel = function(skillId, masteryObj, level){
    if(skillId && TAA.skm.Parameters.Unleveled.contains(skillId)) return masteryObj;
    var currentLvl = masteryObj.level;
    var newLvl = Math.max(TAA.skm.Parameters.MinLevel, Math.min(currentLvl + level, TAA.skm.Parameters.MaxLevel));

    if(currentLvl !== newLvl)
        masteryObj.level = newLvl;
        
    return masteryObj;
};

/**
 * Decreases skill level
 * 
 * @static
 * @method decreaseSkillLevel
 */
SkillManager.decreaseSkillLevel = function(skillId, masteryObj, level){
    if(TAA.skm.Parameters.Unleveled.contains(skillId)) return masteryObj;
    var currentLvl = masteryObj.level;
    var newLvl = Math.max(TAA.skm.Parameters.MinLevel, Math.min(currentLvl - level, TAA.skm.Parameters.MaxLevel));

    if(currentLvl !== newLvl)
        masteryObj.level = newLvl;
        
    return masteryObj;
};

/**
 * Returns how much XP is required to reach the next level
 * 
 * @static
 * @method getXpForLevel
 */
SkillManager.getXpForLevel = function(skillId, level){
    var skillData = $dataSkillLevels[skillId];
    var xpFormula = this.getXpFormula(skillData).replace(/level/g, level);
    return eval(xpFormula);
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.skillLevelUpMsg = function(text){
    this._logWindow.addText(text);
};

TAA.skm.alias.BattleManager = TAA.skm.alias.BattleManager || {};
TAA.skm.alias.BattleManager.gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function(){
    TAA.skm.alias.BattleManager.gainRewards.call(this);
    this.gainSkillMastery();
};

BattleManager.gainSkillMastery = function(){
    $gameParty.battleMembers().forEach(function(actor){
        var isAlive = actor.isAlive();
        for(var i=0; i < actor.skills().length; i++){
            var skillId = actor.skills()[i].id;
            if(actor._skillMastery[skillId] === null || actor._skillMastery[skillId] === undefined){
                actor.skillLevel(skillId);
            }
            switch(actor._skillMastery[skillId].xpType){
                case 3:
                    if(!isAlive) continue;
                case 2:
                    actor.gainSkillXp(skillId, 1);
                    break;
                default:
                    continue;
            }
        }
    });
};

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.getSkillMpCost = function(skillId, level){
    if(level === undefined || level < TAA.skm.Parameters.MinLevel)
        level = TAA.skm.Parameters.MinLevel;
    
    return SkillManager.getMpCost($dataSkills[skillId], level);
};

Game_System.prototype.getSkillTpCost = function(skillId, level){
    if(level === undefined || level < TAA.skm.Parameters.MinLevel)
        level = TAA.skm.Parameters.MinLevel;
    
    return SkillManager.getTpCost($dataSkills[skillId], level);
};

Game_System.prototype.getSkillTpGain = function(skillId, level){
    if(level === undefined || level < TAA.skm.Parameters.MinLevel)
        level = TAA.skm.Parameters.MinLevel;
    
    return SkillManager.getTpGain($dataSkills[skillId], level);
};

Game_System.prototype.getSkillDescription = function(skillId, level){
    if(level === undefined || level < TAA.skm.Parameters.MinLevel)
        level = TAA.skm.Parameters.MinLevel;
    
    return SkillManager.getDescription($dataSkills[skillId], level);
};

Game_System.prototype.getDamageFormula = function(skillId, level){
    if(level === undefined || level < TAA.skm.Parameters.MinLevel)
        level = TAA.skm.Parameters.MinLevel;
    
    return SkillManager.getDamageFormula($dataSkills[skillId], level);
};

Game_System.prototype.actorMeetsRequirements = function(skillId, level, actorId){
    if(level === undefined || level < TAA.skm.Parameters.MinLevel)
        level = TAA.skm.Parameters.MinLevel;
    
    var subject = $gameActors.actor(actorId);
    return SkillManager.requirementsMet($dataSkills[skillId], level, subject);
};

Game_System.prototype.getSkillXpType = function(skillId){
    if($dataSkillLevels[skillId] === undefined) return 1;
    var type = $dataSkillLevels[skillId][SkillManager._xpTypeObject] || 1;
    return type;
};

Game_System.prototype.getSkillLevel = function(skillId, actorId){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return 0;
    return subject.getSkillLevel(skillId);
};

Game_System.prototype.learnSkill = function(actorId, skillId, customLevel, customXp){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return false;
    return subject.learnSkill(skillId, customXp, customLevel);
};

Game_System.prototype.gainSkillXp = function(actorId, skillId, xp){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return false;
    subject.gainSkillXp(skillId, xp);
};

Game_System.prototype.getSkillProgression = function(actorId, skillId){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return false;
    return subject.skillProgression(skillId);
};

Game_System.prototype.isSkillKnown = function(actorId, skillId){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return false;
    return subject.isSkillKnown(skillId);
};

Game_System.prototype.hasSkill = function(actorId, skillId, skillLevel){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return false;
    return subject.hasSkill(skillId, skillLevel);
};

Game_System.prototype.getCurrentSkillXp = function(actorId, skillId){
    var subject = $gameActors.actor(actorId);
    var skill = $dataSkills[skillId];
    var skm = subject._skillMastery[skillId];
    if(skm === undefined) return 0;
    return skm.xp;
};

Game_System.prototype.getSkillXpToNextLevel = function(actorId, skillId){
    var subject = $gameActors.actor(actorId);
    var skill = $dataSkills[skillId];
    var skm = subject._skillMastery[skillId];
    if(skm === undefined) return 0;
    var requiredXp = SkillManager.getXpForLevel(skillId, skm.level);
    if(requiredXp === undefined || requiredXp === 0) return 0;
    return requiredXp - skm.xp;
};

Game_System.prototype.getSkillUses = function(actorId, skillId){
    var subject = $gameActors.actor(actorId);
    var skill = $dataSkills[skillId];
    var skm = subject._skillMastery[skillId];
    if(skm === undefined) return 0;
    return skm.timesUsed;
};

Game_System.prototype.gainSkillXp = function(actorId, skillId, xp){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return;
    return subject.gainSkillXp(skillId, xp);
};

Game_System.prototype.setSkillLevel = function(actorId, skillId, level){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return;
    if(level === undefined || level < TAA.skm.Parameters.MinLevel) return;
    subject.setSkillLevel(skillId, level);
};

Game_System.prototype.increaseSkillLevel = function(actorId, skillId, level){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return;
    if(level === undefined || level < TAA.skm.Parameters.MinLevel) return;
    subject.increaseSkillLevel(skillId, level);
};

Game_System.prototype.decreaseSkillLevel = function(actorId, skillId, level){
    var subject = $gameActors.actor(actorId);
    if(subject === undefined) return;
    if(level === undefined || level < TAA.skm.Parameters.MinLevel) return;
    subject.decreaseSkillLevel(skillId, level);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

TAA.skm.alias.Game_Interpreter = TAA.skm.alias.Game_Interpreter || {};
TAA.skm.alias.Game_Interpreter.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    TAA.skm.alias.Game_Interpreter.pluginCommand.call(this, command, args);
    if(command.toLowerCase() === 'skm'){
        if(args[0].toLowerCase() === 'learnskill'){
            var actor = (!isNaN(args[1])) ? parseInt(args[1]) : undefined;
            if(actor === undefined) return;
            var skill = (!isNaN(args[2])) ? parseInt(args[2]) : undefined;
            if(skill === undefined) return;
            var level = (!isNaN(args[3])) ? parseInt(args[3]) : undefined;
            var xp = (!isNaN(args[4])) ? parseInt(args[4]) : undefined;
            $gameSystem.learnSkill(actor, skill, level, xp);
        }
        else if(args[0].toLowerCase() === 'learnmultiskill'){
            var size = args.length;
            var actor = (!isNaN(args[1])) ? parseInt(args[1]) : undefined;
            if(actor === undefined) return;
            var i = 2;
            while(i < size){
                var skill = (!isNaN(args[i])) ? parseInt(args[i]) : undefined;
                if(skill !== undefined) $gameSystem.learnSkill(actor, skill);
                i++;
            }
        }
        else if(args[0].toLowerCase() === 'gainxp'){
            var actor = (!isNaN(args[1])) ? parseInt(args[1]) : undefined;
            if(actor === undefined) return;
            var skill = (!isNaN(args[2])) ? parseInt(args[2]) : undefined;
            if(skill === undefined) return;
            var xp = (!isNaN(args[3])) ? parseInt(args[3]) : undefined;
            if(xp === undefined || xp <= 0) return;
            $gameSystem.gainSkillXp(actor, skill, xp);
        }
        else if(agrs[0].toLowerCase() === 'setlevel'){
            var actor = (!isNaN(args[1])) ? parseInt(args[1]) : undefined;
            if(actor === undefined) return;
            var skill = (!isNaN(args[2])) ? parseInt(args[2]) : undefined;
            if(skill === undefined) return;
            var level = (!isNaN(args[3])) ? parseInt(args[3]) : undefined;
            $gameSystem.setSkillLevel(actor, skill, level);
        }
    }
};

//=============================================================================
// Plugin Commands (MZ)
//=============================================================================

if(Utils.RPGMAKER_NAME === 'MZ'){
    PluginManager.registerCommand(TAA.skm.PluginName, 'learnSkill', args => {
        const actor = parseInt(args.actor);
        const skill = parseInt(args.skill);
        if(isNaN(actor) || isNaN(skill)) return;

        var level = parseInt(args.level);
        var xp = parseInt(args.xp);
        if(isNaN(level) || level < TAA.skm.Parameters.MinLevel) level = TAA.skm.Parameters.MinLevel;
        else if(level > TAA.skm.Parameters.MaxLevel) level = TAA.skm.Parameters.MaxLevel;
        if(isNaN(xp) || xp < 0) xp = 0;

        $gameSystem.learnSkill(actor, skill, level, xp);
    });

    PluginManager.registerCommand(TAA.skm.PluginName, 'learnMultiSkill', args => {
        const actor = parseInt(args.actor);
        var skillList = (args.skillList) ? JSON.parse(args.skillList) : [];
        if(skillList.length <= 0 || isNaN(actor)) return;
        for(var i=0; i < skillList.length; i++){
            var skill = parseInt(skillList[i]);
            if(!isNaN(skill)) $gameSystem.learnSkill(actor, skill);
        }
    });

    PluginManager.registerCommand(TAA.skm.PluginName, 'gainXp', args => {
        const actor = parseInt(args.actor);
        const skill = parseInt(args.skill);
        if(isNaN(actor) || isNaN(skill)) return;

        var xp = !isNaN(args.xpVar) && args.xpVar > 0 ? $gameVariables.value(args.xpVar) : parseInt(args.xp);
        if(isNaN(xp) || xp <= 0) return;
        
        $gameSystem.gainSkillXp(actor, skill, xp);
    });

    PluginManager.registerCommand(TAA.skm.PluginName, 'changeLevel', args => {
        const actor = parseInt(args.actor);
        const skill = parseInt(args.skill);
        const operation = args.operation;
        if(isNaN(actor) || isNaN(skill) || !['=', '+', '-'].contains(operation)) return;
        
        var level = !isNaN(args.valueVar) && args.valueVar > 0 ? $gameVariables.value(args.valueVar) : parseInt(args.value);
        switch(operation){
            case '=':
                $gameSystem.setSkillLevel(actor, skill, level); 
                break;
            case '+':
                $gameSystem.increaseSkillLevel(actor, skill, level);
                break;
            case '-':
                $gameSystem.decreaseSkillLevel(actor, skill, level);
                break;
        }
    });
}

//=============================================================================
// Game_BattlerBase
//=============================================================================

TAA.skm.alias.GameBattlerBase = TAA.skm.alias.GameBattlerBase || {};
TAA.skm.alias.GameBattlerBase.initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function(){
    TAA.skm.alias.GameBattlerBase.initMembers.call(this);
    this._skillMastery = [];
    this._skillUses = [];
};

Game_BattlerBase.prototype.getSkillLevel = function(skillId){
    if(!this.isSkillKnown(skillId))
        return -1;
    else
        return this._skillMastery[skillId].level;
};

Game_BattlerBase.prototype.skillLevel = function(skillId){
    if(this._skillMastery === undefined) this._skillMastery = [];
    if(!this.isSkillKnown(skillId)) {
        this._skillMastery[skillId] = SkillManager.getDefaultMasteryObject(skillId);
    }
    return this._skillMastery[skillId].level;
};

Game_BattlerBase.prototype.learnSkill = function(skillId, customXp, customLevel){
    if(skillId === undefined || skillId <= 0) return false;
    var level = TAA.skm.Parameters.MinLevel;
    if(customLevel !== undefined)
        level = customLevel;
    
    if(!$dataSkills[skillId].requirement(level, this))
        return false;
    
    this.setSkillLevel(skillId, level);
    if(customXp === undefined || isNaN(customXp) || customXp <= 0)
        return true;
    return this.gainSkillXp(skillId, customXp);
};

Game_BattlerBase.prototype.gainSkillXp = function(skillId, xp){
    if(xp === undefined || isNaN(xp) || xp < 0 || skillId === undefined || skillId <= 0 ||TAA.skm.Parameters.Unleveled.contains(skillId))
        return false;
    
    var level;
    if(this.isSkillKnown(skillId))
        level = Math.min(this._skillMastery[skillId].level, TAA.skm.Parameters.MaxLevel);
    else
        return false;

    if(!$dataSkills[skillId].requirement(level, this))
        return false;
    
    var level = SkillManager.increaseSkillMastery(skillId, this._skillMastery[skillId], xp);
    if(level === undefined) return false;
    if(this._skillMastery[skillId].level < level){
        this._skillMastery[skillId].level = level;
        this._skillMastery[skillId].xp = 0;
    }
    else    
        this._skillMastery[skillId].xp += xp;
    this._skillMastery[skillId].uses = 0;
    return true;
};

Game_BattlerBase.prototype.increaseSkillUseCount = function(skillId, timesUsed){
    this._skillMastery[skillId].timesUsed += timesUsed;
    if(this._skillMastery[skillId].xpType !== undefined && this._skillMastery[skillId].xpType === 1 && !TAA.skm.Parameters.Unleveled.contains(skillId)){
        return this.gainSkillXp(skillId, timesUsed);
    }
    else
        return true;
};

Game_BattlerBase.prototype.setSkillLevel = function(skillId, level){
    if(!this.isSkillKnown(skillId))
        this.skillLevel(skillId);
    this._skillMastery[skillId] = SkillManager.setSkillLevel(skillId, this._skillMastery[skillId], level);
};

Game_BattlerBase.prototype.increaseSkillLevel = function(skillId, level){
    if(!this.isSkillKnown(skillId))
        this.skillLevel(skillId);
    this._skillMastery[skillId] = SkillManager.increaseSkillLevel(skillId, this._skillMastery[skillId], level);
};

Game_BattlerBase.prototype.decreaseSkillLevel = function(skillId, level){
    if(!this.isSkillKnown(skillId))
        this.skillLevel(skillId);
    this._skillMastery[skillId] = SkillManager.decreaseSkillLevel(skillId, this._skillMastery[skillId], level);
};

Game_BattlerBase.prototype.setSkillXp = function(skillId, xp){
    if(TAA.skm.Parameters.Unleveled.contains(skillId)) return;
    var level = this.getSkillLevel(skillId);
    if(level < 0) return;
    var formula = SkillManager.getXpFormula($dataSkillLevels[skillId]);
    if(!SkillManager.requirementsMet($dataSkills[skillId], level, this)){
        this._skillMastery[skillId].xp = 0;
    }
    else{
        // Ensures xp is always set below the threshold for the next level
        if(formula && xp >= eval(formula)){
            xp = eval(formula + "-1");
        }
        this._skillMastery[skillId].xp = xp;
    }
};

Game_BattlerBase.prototype.skillProgression = function(skillId){
    if(!this.isSkillKnown(skillId)) return 0;
    if(this.isMaxLevelSkill(skillId)) return 1;
    var requiredXp = SkillManager.getXpForLevel(skillId, this._skillMastery[skillId].level);
    if(requiredXp === 0) return 1;
    var prog = this._skillMastery[skillId].xp / requiredXp;
    prog = (prog > 1) ? 1 : prog;
    return Math.min(prog, 1);
};

Game_BattlerBase.prototype.isMaxLevelSkill = function(skillId){
    if(!this.isSkillKnown(skillId))
        return false;
    return this._skillMastery[skillId].level === TAA.skm.Parameters.MaxLevel;
};

Game_BattlerBase.prototype.isSkillKnown = function(skillId){
    if(this._skillMastery[skillId] === undefined || this._skillMastery[skillId] === null)
        return false;
    return true;
};

TAA.skm.alias.GameBattlerBase.skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill){
    if(skill.leveledMpCost === undefined)
        return TAA.skm.alias.GameBattlerBase.skillMpCost.call(this, skill);
    if(!this.isSkillKnown(skill.id))
        this.skillLevel(skill.id);
    return skill.leveledMpCost(this._skillMastery[skill.id].level);
};

TAA.skm.alias.GameBattlerBase.skillTpCost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill){
    if(skill.leveledTpCost === undefined)
        return TAA.skm.alias.GameBattlerBase.skillTpCost.call(this, skill);
    if(!this.isSkillKnown(skill.id))
        this.skillLevel(skill.id);
    return skill.leveledTpCost(this._skillMastery[skill.id].level);
};

TAA.skm.alias.GameBattlerBase.paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill){
    TAA.skm.alias.GameBattlerBase.paySkillCost.call(this, skill);
    if(!this.isSkillKnown(skill.id)) {
        this._skillMastery[skill.id] = SkillManager.getDefaultMasteryObject(skill.id);
    }
    if($gameParty.inBattle())
        this._skillMastery[skill.id].uses++;
        if(!this._skillUses.contains(skill.id))
            this._skillUses.push(skill.id);
};

Game_BattlerBase.prototype.parseSkillMasteryTags = function(notes){
    if(notes === undefined || notes.length <= 0) return;
    
    var regexArray = [
        /<TAA_SKM:\s*S\[(\d+)\][,]?\s+L\[(\d+\s*(?:,\s*\d+)?)\](?:,\s*X\[(\d+\s*(?:,\s*\d+)?)?\])?\s*>/i,
        /<TAA_SKM>/i,
        /<\/TAA_SKM>/i,
        /\s*S\[(\d+)\][,]?\s+L\[(\d+\s*(?:,\s*\d+)?)\](?:,\s*X\[(\d+\s*(?:,\s*\d+)?)?\])?\s*/i
    ];
    var insideTags = false;
    for(var i=0; i< notes.length; i++){
        var skillArray = [];
        var line = notes[i];
        if(line.match(regexArray[1])){
            insideTags = true;
        }
        else if(line.match(regexArray[2])){
            insideTags = false;
        }
        else if(insideTags && line.match(regexArray[3])){
            skillArray = this.extractSkillMasteryFromTags(line, RegExp);
        }
        else if(line.match(regexArray[0])){
            skillArray = this.extractSkillMasteryFromTags(line, RegExp);
        }
        
        if(skillArray.length > 0){
            this.setSkillLevel(skillArray[0], skillArray[1]);
            if(skillArray[2] > 0){
                this.setSkillXp(skillArray[0], skillArray[2]);
            }
        }
    }
};

Game_BattlerBase.prototype.extractSkillMasteryFromTags = function(line, exp){
    var result = [];
    var lvl = TAA.skm.Parameters.MinLevel;
    var xp = 0;
    var skillId = exp.$1;
    var lvlStr = exp.$2;
    var xpStr = exp.$3;
    if(lvlStr.match(/^(\d+)\s*,\s*(\d+)\s*$/i)){
        lvl = this.getRandomParamByRange(RegExp.$1, RegExp.$2, TAA.skm.Parameters.MinLevel, TAA.skm.Parameters.MaxLevel);
    }
    else lvl = Math.max(parseInt(lvlStr), TAA.skm.Parameters.MinLevel) <= TAA.skm.Parameters.MaxLevel ? Math.max(parseInt(lvlStr), TAA.skm.Parameters.MinLevel) : TAA.skm.Parameters.MaxLevel;

    if(xpStr.match(/^(\d+)\s*,\s*(\d+)\s*$/i)){
        xp = this.getRandomParamByRange(RegExp.$1, RegExp.$2, 0, SkillManager.getXpForLevel(parseInt(skillId), lvl));
    }
    else xp = parseInt(xpStr);

    result = [parseInt(skillId), lvl, xp];
    if(result[2] === undefined || isNaN(result[2])) result[2] = 0;
    
    return result;
};

Game_BattlerBase.prototype.getRandomParamByRange = function(lowerRange, upperRange, min, max){
    var a = Math.max(lowerRange, min) <= max ? Math.max(lowerRange, min) : max;
    var b = Math.min(upperRange, max) >= min ? Math.min(upperRange, max) : min;
    if(a <= b) return Math.floor(Math.random() * (b - a) + a);
    else return Math.floor(Math.random() * (a - b) + b);
};

//=============================================================================
// Game_Battler
//=============================================================================

TAA.skm.alias.GameBattler = TAA.skm.alias.GameBattler || {};
TAA.skm.alias.GameBattler.onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function(){
    TAA.skm.alias.GameBattler.onAllActionsEnd.call(this);
    this.processSkillUses();
    this.resetSkillUseCounter();
};

Game_Battler.prototype.processSkillUses = function(){
    for(var i=0; i < this._skillUses.length; i++){
        var id = this._skillUses[i];
        var previousLevel = this._skillMastery[id].level;

        if(this.increaseSkillUseCount(id, this._skillMastery[id].uses)){
            var newLevel = this._skillMastery[id].level;
            if(newLevel > previousLevel){
                var playAnim = false;
                var mirror = false;
                switch(TAA.skm.Parameters.LvlUpAnimConfig){
                    case "Actors Only":
                        if(this.isActor())
                            playAnim = true;
                        break;
                    case "Enemies Only":
                        if(this.isEnemy()){
                            playAnim = true;
                            mirror = true;
                        }
                        break;
                    case "Always":
                        playAnim = true;
                        break;
                    default:
                        playAnim = false;
                }
                if(playAnim && TAA.skm.Parameters.LvlUpAnimation > 0){
                    if(Utils.RPGMAKER_NAME === 'MZ')
                        $gameTemp.requestAnimation([this], TAA.skm.Parameters.LvlUpAnimation, mirror);
                    else
                        this.startAnimation(TAA.skm.Parameters.LvlUpAnimation, mirror);
                    // show text on level up?
                    if(TAA.skm.Parameters.LvlUpMsg !== "" && (this.isActor() || (this.isEnemy() && TAA.skm.Parameters.EnemyLvlUpMsg))){
                        var text = this.prepareSkillLvlUpText(id);
                        BattleManager.skillLevelUpMsg(text);
                    }
                }
            }
        }
        if(this._skillMastery[id].uses > 0) this._skillMastery[id].uses = 0;
    }
    this.resetSkillUseCounter();
};

Game_Battler.prototype.prepareSkillLvlUpText = function(skillId){
    if(skillId === undefined || skillId <= 0 || $dataSkills[skillId] === undefined) return "";
    var text = TAA.skm.Parameters.LvlUpMsg.replace(/%1/g, $dataSkills[skillId].name);
    text = text.replace(/%2/g, this.name());
    return text || "";
};

Game_Battler.prototype.resetSkillUseCounter = function(){
    this._skillUses = [];
};


//=============================================================================
// Game_Actor
//=============================================================================

TAA.skm.alias.GameActor = TAA.skm.alias.GameActor || {};
TAA.skm.alias.GameActor.setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId){
    TAA.skm.alias.GameActor.setup.call(this, actorId);
    this.initStartingSkills();
};

Game_Actor.prototype.initStartingSkills = function(){
    var notes = $dataActors[this._actorId].note.split(/[\r\n]+/);
    this.parseSkillMasteryTags(notes);
};

TAA.skm.alias.GameActor.learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId, customXp, customLevel){
    Game_BattlerBase.prototype.learnSkill.call(this, skillId, customXp, customLevel);
    TAA.skm.alias.GameActor.learnSkill.call(this, skillId);
};

TAA.skm.alias.GameActor.hasSkill = Game_Actor.prototype.hasSkill;
Game_Actor.prototype.hasSkill = function(skillId, skillLevel){
    var hasSkill = TAA.skm.alias.GameActor.hasSkill.call(this, skillId);

    if((skillLevel === undefined && skillLevel < TAA.skm.Parameters.MinLevel) || hasSkill === false || isNaN(skillLevel))
        return hasSkill;

    if(this.skillLevel(skillId) >= skillLevel)
        return true;
    else
        return false;
};

//=============================================================================
// Game_Enemy
//=============================================================================

TAA.skm.alias.GameEnemy = TAA.skm.alias.GameEnemy || {};
TAA.skm.alias.GameEnemy.setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y){
    TAA.skm.alias.GameEnemy.setup.call(this, enemyId, x, y);
    this.initStartingSkills();
};

Game_Enemy.prototype.initStartingSkills = function(){
    var notes = $dataEnemies[this._enemyId].note.split(/[\r\n]+/);
    this.parseSkillMasteryTags(notes);
};

TAA.skm.alias.GameEnemy.hasSkill = Game_Enemy.prototype.hasSkill;
Game_Enemy.prototype.hasSkill = function(skillId, skillLevel){
    var hasSkill = false;
    if(skillId === undefined || skillId <= 0) return false;
    for(var i=0; i < this._actions.length; i++){
        var item = this._actions[i]._item;
        if(item !== undefined && item._dataClass === "skill" && item._itemId === skillId){
            hasSkill = true;
            break;
        }
    }
    if(hasSkill === true){
        return (this.skillLevel(skillId) >= skillLevel);
    }
    return false;
};

//=============================================================================
// Game_Action
//=============================================================================

TAA.skm.alias.GameAction = TAA.skm.alias.GameAction || {};
TAA.skm.alias.GameAction.initialize = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
    TAA.skm.alias.GameAction.initialize.call(this, subject, forcing);
    this._skmCriticalModifier = undefined;
    this._skmIsCritical = false;
};

TAA.skm.alias.GameAction.apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target){
    this.applySkillModifiers(0, true, target);
    TAA.skm.alias.GameAction.apply.call(this, target);
    this.applyCustomSkillEffects(target);
    this.clearModifiers();
};

TAA.skm.alias.GameAction.itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target){
    var result = TAA.skm.alias.GameAction.itemCri.call(this, target);
    switch(this._skmCriticalModifier){
        case 'force':
        case 'always':
        case 'enable':
        case '2':
            result = 1;
            break;
        case 'never':
        case 'disable':
        case '1':
            result = 0;
            break;
        default:
            // no action
    }
    return result;
};

TAA.skm.alias.GameAction.makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical){
    this._skmIsCritical = critical;
    var value = TAA.skm.alias.GameAction.makeDamageValue.call(this, target, critical);
    value = this.applySkillModifiers(value, undefined, target);
    return value;
};

TAA.skm.alias.GameAction.evalDamageFormula = Game_Action.prototype.evalDamageFormula;
Game_Action.prototype.evalDamageFormula = function(target){
    if(this.item().leveledDamage === undefined)
        return TAA.skm.alias.GameAction.evalDamageFormula.call(this, target);
    try{
        var item = this.item();
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        var value = Math.max(eval(item.leveledDamage(a.skillLevel(item.id))), 0) * sign;
        if(isNaN(value)) value = 0;
        return value;
    } catch(e) {
        return 0;
    }
};

TAA.skm.alias.GameAction.applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target){
    var skill = this.item();
    if(skill.leveledTpGain === undefined || skill.id === undefined)
        TAA.skm.alias.GameAction.applyItemUserEffect.call(this, target);
    else{
        var level = this.subject().skillLevel(skill.id);
        var value = Math.floor(skill.leveledTpGain(level) * this.subject().tcr);
        this.subject().gainSilentTp(value);
    }
};

Game_Action.prototype.applyCustomSkillEffects = function(target){
    var skill = this.item();
    var mods = $dataSkills[skill.id].customEffects(this.subject());
    if(mods !== undefined && mods !== [])
        this.processCustomEffects(mods, target);
};

Game_Action.prototype.applySkillModifiers = function(value, critical, target){
    var skill = this.item();
    var mods = $dataSkills[skill.id].damageMods(this.subject());
    
    if(mods !== undefined && mods !== []){
        if(critical){
            return this.processDamageModifiers(0, mods, target);
        }
        value = this.processDamageModifiers(value, mods, target);
    }        

    return value;
};

Game_Action.prototype.processDamageModifiers = function(value, mods, target){
    var a = this.subject();
    var b = target;
    var skill = this.item();
    for(var i=0; i< mods.length; i++){
        if(mods[i].match(/CRITICAL:\s*(0|1|2|FORCE|ALWAYS|ENABLE|NEVER|DISABLE|NORMAL)/i)){
            this._skmCriticalModifier = String(RegExp.$1).toLowerCase();
            return value;
        }
        else if(mods[i].match(/DAMAGE MOD(?:IFIER)?:\s*([\*\+\-\/][0-9]+%|[\*\+\-\/][0-9]+|EVAL\s+.*)/i)){
            var m = String(RegExp.$1);
            var modString = "";
            if(m.match(/^EVAL\s+(.*)/i)){
                modString += String(RegExp.$1);
            }
            else if(m.match(/([\*\+\-\/])([0-9]+)(%)?/i)){
                modString += "value " + RegExp.$1 + " ";
                var modifier = parseInt(RegExp.$2);
                if(RegExp.$3 === '%'){
                    if(RegExp.$1 === '*' || RegExp.$1 === '/')
                        modifier /= 100;
                    else if(RegExp.$1 === '+' || RegExp.$1 === '-')
                        modifier = (modifier/100) * value;
                }
                modString += modifier;
            }

            if(modString !== ""){
                try{
                    value = eval(modString);
                }
                catch(e){
                    console.error("Failed to eval clause: '" + modString + "'");
                }
            }
        }
    }
    return value;
};

Game_Action.prototype.processCustomEffects = function(mods, target){
    var a = this.subject();
    var b = target;
    var skill = this.item();
    for(var i=0; i< mods.length; i++){
        if(mods[i].match(/(ON CRITICAL)?\s*(ADD|REMOVE) STATE:\s*([0-9]+|\".*\")\s*(USER|PARTY|TARGET[Ss]?|(?:DEAD|ALIVE)\s*(?:ALLIES|ENEMIES)|PARTY BUT USER|ENEMIES BUT TARGET)\s*([0-9]+|IF VAR(?:IABLE)? [0-9]+ (?:>|>=|<|<=|==|!=|<>) [0-9]+\s*(?:THEN [0-9]+)?|IF SW(?:ITCH)? [0-9]+ (?:true|false)\s*(?:THEN [0-9]+)?|EVAL: .*)?/i)){
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var operation = RegExp.$2;
            var state = isNaN(RegExp.$3) ? TAA.util.getStateIdByName(RegExp.$3) : parseInt(RegExp.$3);
            var affected = this.customEffectsTargets(RegExp.$4, target);
            var intensity = 1;
            if(RegExp.$5 !== undefined && RegExp.$5 !== ""){
                if(!isNaN(RegExp.$5)){
                    intensity = (parseInt(RegExp.$5)/100).toFixed(2);
                }
                else{
                    var conditional = RegExp.$5;
                    if(conditional.match(/IF VAR(?:IABLE)? ([0-9]+) (>|>=|<|<=|==|!=|<>) ([0-9]+)\s*(?:THEN ([0-9]+))?/i)){
                        var varId = RegExp.$1;
                        var op = RegExp.$2;
                        var value = RegExp.$3;
                        if(eval("$gameVariables.value(" + varId + ") " + op + " value")){
                            if(!isNaN(RegExp.$4) && RegExp.$4 !== "")
                                intensity = (parseInt(RegExp.$5)/100).toFixed(2);
                        }
                        else continue;
                    }
                    else if(conditional.match(/IF SW(?:ITCH)? ([0-9]+) (true|false)\s*(?:THEN ([0-9]+))?/i)){
                        var swId = RegExp.$1;
                        var value = RegExp.$2;
                        if(eval("$gameSwitches.value(" + swId + ") === value")){
                            if(!isNaN(RegExp.$3) && RegExp.$3 !== "")
                                intensity = (parseInt(RegExp.$3)/100).toFixed(2);
                        }
                        else continue;
                    }
                    else if(conditional.match(/EVAL: (.*)/i)){
                        if(RegExp.$1 !== undefined && RegExp.$1 !== ""){
                            var tmp = eval(RegExp.$1);
                            if(!isNaN(tmp) && tmp >= 0)
                                intensity = (parseInt(tmp)/100).toFixed(2);
                        }
                    }
                }
            }
            var effect = {"code":21,"dataId":state,"value1":intensity,"value2":0};
            if(affected !== undefined && affected.length > 0 && !isNaN(state) && state > 0){
                if(operation.toUpperCase() === 'ADD'){
                    for(var i=0; i < affected.length; i++){
                        if(affected[i].addState !== undefined)
                            this.itemEffectAddState(affected[i], effect);
                        else{
                            console.error("processCustomEffects: Failed to determine affected");
                            console.error(affected[i]);
                        }
                    }
                }
                else if(operation.toUpperCase() === 'REMOVE'){
                    for(var i=0; i < affected.length; i++){
                        if(affected[i].removeState !== undefined)
                            affected[i].removeState(state);
                        else{
                            console.error("processCustomEffects: Failed to determine affected");
                            console.error(affected[i]);
                        }
                    }
                }
            }
        }
        else if(mods[i].match(/(ON CRITICAL)?\s*SWITCH ([0-9]+|[0-9]+ \- [0-9]+|[0-9]+ to [0-9]+)\s*:\s*(on|off|true|false|toggle|switch [0-9]+)/i)){
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var sw = String(RegExp.$2);
            var operation = String(RegExp.$3);
            if(sw.match(/([0-9]+) (?:\-|to) ([0-9]+)/i)){
                var lowerRange = parseInt(RegExp.$1);
                var upperRange = parseInt(RegExp.$2);
                $gameSwitches.setValueOnRange(lowerRange, upperRange, operation);
            }
            else{
                var op = $gameSwitches.convertOperationToEval('sw', operation);
                try{
                    $gameSwitches.setValue(sw, eval(op));
                } catch(e){
                    console.error("Failed to eval sentence: " + op);
                }
            }
        }
        else if(mods[i].match(/(ON CRITICAL)?\s*SWITCH\s+([0-9]+|[0-9]+ \- [0-9]+|[0-9]+ to [0-9]+)\s*:\s*EVAL\s+(.*)/i)){
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var sw = String(RegExp.$2);
            var evalClause = eval(RegExp.$3);
            if(typeof evalClause !== "boolean"){
                if(isNaN(evalClause)){
                    continue;
                }
                else{
                    evalClause = evalClause > 0 ? true : false;
                }
            }
            if(sw.match(/([0-9]+) (?:\-|to) ([0-9]+)/i)){
                var lowerRange = parseInt(RegExp.$1);
                var upperRange = parseInt(RegExp.$2);
                $gameSwitches.setValueOnRange(lowerRange, upperRange, operation);
            }
            else{
                $gameSwitches.setValue(sw, evalClause);
            }
        }
        else if(mods[i].match(/(ON CRITICAL)?\s*(?:VAR|VARIABLE)\s+([0-9]+|[0-9]+ \- [0-9]+|[0-9]+ to [0-9]+)\s*(=|\+=|\-=|\*=|\/=|%=)\s*([0-9]+|v\[[0-9]+\])/i)){
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var vr = RegExp.$2;
            var operator = RegExp.$3;
            var value = RegExp.$4;
            if(vr.match(/([0-9]+) (?:\-|to) ([0-9]+)/i)){
                var lowerRange = RegExp.$1;
                var upperRange = RegExp.$2;
                $gameVariables.setValueOnRange(lowerRange, upperRange, operator, value);
            }
            else{
                var intValue = $gameVariables.getIdFromReference(value);
                $gameVariables.evalOperator(parseInt(vr), operator, intValue);
            }
        }
        else if(mods[i].match(/(ON CRITICAL)?\s*(?:VAR|VARIABLE)\s+([0-9]+|[0-9]+ \- [0-9]+|[0-9]+ to [0-9]+)\s*:\s*EVAL\s+(.*)/i)){
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var vr = String(RegExp.$2);
            var evalClause = eval(RegExp.$3);
            if(isNaN(evalClause)) evalClause = 0;
            if(vr.match(/([0-9]+) (?:\-|to) ([0-9]+)/i)){
                var lowerRange = RegExp.$1;
                var upperRange = RegExp.$2;
                $gameVariables.setValueOnRange(lowerRange, upperRange, "=", evalClause);
            }
            else{
                $gameVariables.evalOperator(parseInt(vr), "=", evalClause);
            }
        }
        else if(mods[i].match(/(ON CRITICAL)?\s*EVAL:\s*(.*)/i)){
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var evalStr = RegExp.$2;
            eval(evalStr);
        }
        else if(mods[i].match(/(ON CRITICAL)?\s*COMMON EVENT\s*:\s*([0-9]+)/i)){
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var event = RegExp.$2;
            $gameTemp.reserveCommonEvent(event);
            $gameTroop._interpreter.setupReservedCommonEvent();
        }
        else if(mods[i].match(/(ON CRITICAL)?\s*SUMMON: e\[(v?[0-9]+)(?:,\s*(v?[0-9]+))?\]\s*(?:,\s*r\[v?[0-9]{1,3}\]|,\s*lv\[(?:\+|\-|v)?[0-9]+%?(?:,\s*(?:\+|\-|v)?[0-9]+%?)?\])*/i)){
            if(TAA.enr === undefined || TAA.enr === {} || a.isActor() || SceneManager._scene.addReinforcement === undefined) continue; // if TAA_EnemyReinforcements is not enabled, or subject is an actor, or is not battle scene
            if(RegExp.$1.toLowerCase() === "on critical" && !this._skmIsCritical)
                continue;
            var enemyId = RegExp.$2;
            var qtt = RegExp.$3;
            if(enemyId.match(/v([0-9]+)/i))
                enemyId = $gameVariables.value(RegExp.$1);
            else
                enemyId = parseInt(enemyId);
            if(qtt !== undefined && qtt.match(/v([0-9]+)/i))
                qtt = $gameVariables.value(RegExp.$1);
            else if(qtt !== '' && !isNaN(qtt))
                qtt = parseInt(qtt);
            if(isNaN(qtt) || qtt === '')
                qtt = 1;
            if(isNaN(enemyId) || enemyId < 1) continue;
            var r = 100;
            if(mods[i].match(/r\[(v?)([0-9]+)\]/i)){
                if(['v', 'V'].contains(RegExp.$1))
                    r = $gameVariables.value(RegExp.$2);
                else
                    r = parseInt(RegExp.$2);
            }
            var lowerLevel = 0;
            var upperLevel = 0;
            if(mods[i].match(/lv\[(\+|\-)?(v)?([0-9]+)(%)?(?:,\s*(\+|\-)?(v)?([0-9]+)(%)?)?\]/i)){
                
                var lowerSign = RegExp.$1;
                if(['v', 'V'].contains(RegExp.$2))
                    var lowerValue = $gameVariables.value(RegExp.$3);
                else
                    var lowerValue = parseInt(RegExp.$3);
                var lowerPercent = RegExp.$4;
                var upperSign = RegExp.$5;
                if(['v', 'V'].contains(RegExp.$6))
                    var upperValue = $gameVariables.value(RegExp.$7);
                else
                    var upperValue = parseInt(RegExp.$7);
                var upperPercent = RegExp.$8;
                var subjectLevel = a._level;
                if(!isNaN(lowerValue)){
                    if(lowerSign === '+' || lowerSign === '-'){
                        if(lowerPercent === '%')
                            lowerLevel = Math.max(1, Math.round(eval(subjectLevel + lowerSign + "(" + lowerValue + "/100)*" + subjectLevel)));
                        else
                            lowerLevel = Math.max(1, eval(subjectLevel + lowerSign + lowerValue));
                    }
                    else
                        lowerLevel = lowerValue;
                    if(!isNaN(upperValue)){
                        if(upperSign === '+' || upperSign === '-' ){
                            if(upperPercent === '%')
                                upperLevel = Math.max(lowerLevel, Math.round(eval(subjectLevel + upperSign + "(" + upperValue + "/100)*" + subjectLevel)));
                            else
                                upperLevel = Math.max(lowerLevel, eval(subjectLevel + upperSign + upperValue));
                        }
                        else
                            upperLevel = upperValue;
                    }
                }
            }
            var realCalls = $gameTroop.getAnsweredCalls();
            while(qtt > 0){
                if($gameTroop.availableReinforcementSlotsCount() > 0){
                    var randomValue = Math.random() * 100;
                    if( r >= randomValue){
                        SceneManager._scene.addReinforcement(enemyId, lowerLevel, upperLevel);
                        realCalls[enemyId] = realCalls[enemyId] || 0;
                        realCalls[enemyId]++;
                    }
                    qtt--;
                }
                else qtt = 0;
            }
            $gameTroop.saveAnsweredCalls(realCalls);
            if(realCalls !== {}) this.makeSuccess(target);
        }
    }
};

if(TAA.enr !== undefined && TAA.enr !== {}){
    TAA.skm.alias.GameAction.processReinforcementCalls = Game_Action.prototype.processReinforcementCalls;
    Game_Action.prototype.processReinforcementCalls = function(target){
        if(TAA.skm.Parameters.ERTag === false){
            TAA.skm.alias.GameAction.processReinforcementCalls.call(this, target);
        }
    };
}

Game_Action.prototype.customEffectsTargets = function(text, target){
    var targets = [];
    var allyGroup;
    var enemyGroup;
    var party;
    var id;
    if(this.subject().isActor()){
        allyGroup = $gameParty;
        enemyGroup = $gameTroop;
    }
    else if(this.subject().isEnemy()){
        allyGroup = $gameTroop;
        enemyGroup = $gameParty;
    }
    switch(text.toUpperCase()){
        case 'USER':
            targets.push(this.subject());
            break;
        case 'PARTY':
            if(this.subject().isActor()){
                targets = $gameParty.battleMembers().slice();
            }
            else if(this.subject().isEnemy()){
                targets = $gameTroop._enemies.slice();
            }
            break;
        case 'TARGET':
        case 'TARGETS':
            if(Array.isArray(target))
                targets = target;
            else
                targets.push(target);
            break;
        case 'ALIVE ALLIES':
            if(allyGroup !== undefined){
                targets = allyGroup.aliveMembers().slice();
            }
            break;
        case 'DEAD ALLIES':
            if(allyGroup !== undefined){
                targets = allyGroup.deadMembers().slice();
            }
            break;
        case 'ALIVE ENEMIES':
            if(enemyGroup !== undefined){
                targets = enemyGroup.aliveMembers().slice();
            }
            break;
        case 'DEAD ENEMIES':
            if(enemyGroup !== undefined){
                targets = enemyGroup.deadMembers().slice();
            }
            break;
        case 'PARTY BUT USER':
            if(this.subject().isActor()){
                party = allyGroup.battleMembers();
                id = this.subject().actorId();
            }
            else{
                party = allyGroup._enemies;
                id = this.subject().enemyId();
            }
        case 'ENEMIES BUT TARGET':
            if(party === undefined){
                if(target.isActor()){
                    party = enemyGroup.battleMembers();
                    id = target.actorId();
                }
                else{
                    party = enemyGroup._enemies;
                    id = this.subject().enemyId();
                }
            }
            for(var i=0; i < party.length; i++){
                if(id !== party[i]){
                    if(this.subject().isActor())
                        targets.push($gameActors.actor(party[i]));
                    else
                        targets.push($dataEnemies[party[i]]);
                }
            }
            break;
        default:
            console.error("customEffectsTargets: Failed to identify custom effects targets. Check your custom effects syntax.");
    }
    return targets;
};

Game_Action.prototype.clearModifiers = function(){
    this._skmCriticalModifier = undefined;
    this._skmIsCritical = false;
};

TAA.skm.alias.GameAction.checkItemScope = Game_Action.prototype.checkItemScope;
Game_Action.prototype.checkItemScope = function(list){
    var skillId = this.item().id;
    if(this.subject()._skillMastery === undefined || this.subject()._skillMastery[skillId] === undefined || this.item().leveledScope === undefined)
        return TAA.skm.alias.GameAction.checkItemScope.call(this, list);
    
    var skillLevel = this.subject()._skillMastery[skillId].level;
    return list.contains(this.item().leveledScope(skillLevel));
};

//=============================================================================
// Game_Switches
//=============================================================================

TAA.skm.alias.GameSwitches = TAA.skm.alias.GameSwitches || {};
Game_Switches.prototype.setValueOnRange = function(lowerRange, upperRange, operation){
    var op = this.convertOperationToEval('sw', operation);
    var sw = lowerRange;
    while(sw <= upperRange){
        try{
            $gameSwitches.setValue(sw, eval(op));
        } catch(e){
            console.error("Failed to eval sentence: " + op);
        }
        
        sw++;
    }
};

Game_Switches.prototype.convertOperationToEval = function(swVarName, operation){
    var op = 'false';
    switch(String(operation)){
        case 'on':
        case 'true':
            op = 'true';
            break;
        case 'off':
        case 'false':
            op = 'false';
            break;
        case 'toggle':
            op = "!$gameSwitches.value(" + swVarName + ")";
            break;
        default:
            if(String(operation).match(/switch ([0-9]+)/i))
                op = "$gameSwitches.value(" + RegExp.$1 + ")";
            else
                op = "$gameSwitches.value(" + swVarName + ")";
    }
    
    return op;
};

//=============================================================================
// Game_Variables
//=============================================================================

TAA.skm.alias.GameVariables = TAA.skm.alias.GameVariables || {};
Game_Variables.prototype.setValueOnRange = function(lowerRange, upperRange, operator, value){
    var intValue = this.getIdFromReference(value);
    
    for(var i=lowerRange; i <= upperRange; i++){
        this.evalOperator(i, operator, intValue);
    }
};

Game_Variables.prototype.getIdFromReference = function(value){
    var intValue;
    if(isNaN(value) && value.match(/v\[([0-9]+)\]/i))
        intValue = parseInt(RegExp.$1);
    else
        intValue = parseInt(value);
    return intValue;
};

Game_Variables.prototype.evalOperator = function(id, operator, intValue){
    if(operator === '='){
        $gameVariables.setValue(id, intValue);
    }
    else{
        var operStr = $gameVariables.value(id) + " " + operator.replace(/=/, '') + " " + intValue;
        try{
            $gameVariables.setValue(id, eval(operStr));
        } catch(e){
            console.error("Failed to eval sentence: " + operStr);
        }
    }
};

//=============================================================================
// Window_Base
//=============================================================================

TAA.skm.alias.WindowBase = TAA.skm.alias.WindowBase || {};
TAA.skm.alias.WindowBase.drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width){
    var drawSKMGauge = true;
    if((TAA.skm.Parameters.ShowGauge !== undefined && TAA.skm.Parameters.ShowGauge === false) || (DataManager.isSkill(item) && TAA.skm.Parameters.Unleveled.contains(item.id)))
        drawSKMGauge = false;
    if(drawSKMGauge && DataManager.isSkill(item)){
        var isVertical = (TAA.skm.Parameters.GaugeType === 'Vertical') ? true : false;
        this.drawSKMGauge(item, x, y, width, isVertical);
        if(isVertical === true){
            var gWidth = !isNaN(TAA.skm.Parameters.GaugeWidth) ? TAA.skm.Parameters.GaugeWidth : 6;
            x += gWidth + 3;
        }
        
        width = width || 312;
        if (item) {
            if(Utils.RPGMAKER_NAME === 'MZ')
                var iconBoxWidth = ImageManager.iconWidth + 4;
            else
                var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            var name = this.setupSkillMasteryName(item.name, this._actor.skillLevel(item.id));
            this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    }
    else
        TAA.skm.alias.WindowBase.drawItemName.call(this, item, x, y, width);
};

Window_Base.prototype.drawSKMGauge = function(item, x, y, width, isVertical){
    var gX = x;
    var gY = y;
    var colors = this.getSKMGaugeColors(item);
    if(Utils.RPGMAKER_NAME === 'MZ'){
        var color1 = ColorManager.textColor(colors[0]);
        var color2 = ColorManager.textColor(colors[1]);
        var iconWidth = ImageManager.iconWidth;
    }
    else{
        var color1 = this.textColor(colors[0]);
        var color2 = this.textColor(colors[1]);
        var iconWidth = Window_Base._iconWidth;
    }
    var gHeight = !isNaN(TAA.skm.Parameters.GaugeHeight) ? TAA.skm.Parameters.GaugeHeight : 32;
    var gWidth = !isNaN(TAA.skm.Parameters.GaugeWidth) ? TAA.skm.Parameters.GaugeWidth : 6;
    
    if(this.lineHeight() > gHeight && isVertical){
        var round = Math.floor((this.lineHeight() - gHeight)/2);
        gY += round;
    }
    if(isVertical === false) {
        gWidth = width - iconWidth - 5;
        gX = x + iconWidth + 5;
        gY = y + this.lineHeight() - gHeight;
    }

    if(TAA.skm.Parameters.LockGaugeOnReqs === true && !SkillManager.requirementsMet(item, this._actor.skillLevel(item.id), this._actor))
        return this.drawLockedSKMGauge(item, gX, gY, gWidth, gHeight, isVertical);
    var backColor;
    if(Utils.RPGMAKER_NAME === 'MZ')
        backColor = ColorManager.gaugeBackColor();
    else
        backColor = this.gaugeBackColor();
    this.contents.fillRect(gX, gY, gWidth, gHeight, backColor);
    var masteryRate = this._actor.skillProgression(item.id);
    var rate = 0;
    if(TAA.skm.Parameters.GaugeOutline === true){
        gWidth -= 4;
        gHeight -= 4; 
    }
    if(isVertical === true){
        rate = Math.floor(gHeight * masteryRate);
        gY += gHeight - rate;
        gHeight = rate;
    }
    else{
        rate = Math.floor(gWidth * masteryRate);
        gWidth = rate;
    }
    
    if(TAA.skm.Parameters.GaugeOutline === true){
        gX += 2;
        gY += 2;
    }
    
    this.contents.gradientFillRect(gX, gY, gWidth, gHeight, color1, color2, isVertical);
};

Window_Base.prototype.getSKMGaugeColors = function(skill){
    var skillLevel = this._actor.getSkillLevel(skill.id);
    var color1 = !isNaN(TAA.skm.Parameters.GaugeColor1) ? TAA.skm.Parameters.GaugeColor1 : 12;
    var color2 = !isNaN(TAA.skm.Parameters.GaugeColor2) ? TAA.skm.Parameters.GaugeColor2 : 4;
    if(TAA.skm.Parameters.CustomGaugeColors !== undefined && TAA.skm.Parameters.CustomGaugeColors !== []){
        var i = 0;
        while(i < TAA.skm.Parameters.CustomGaugeColors.length){
            var custom = JSON.parse(TAA.skm.Parameters.CustomGaugeColors[i++]);
            if(parseInt(custom['Level']) === skillLevel){
                color1 = parseInt(custom['Color 1']);
                color2 = parseInt(custom['Color 2']);
                i += TAA.skm.Parameters.CustomGaugeColors.length;
            }
        }
    }
    return [color1, color2];
};

Window_Base.prototype.drawLockedSKMGauge = function(item, x, y, width, height, isVertical){
    var lockColor;
    if(!isNaN(TAA.skm.Parameters.LockedGaugeColor)){
        if(Utils.RPGMAKER_NAME === 'MZ')
            lockColor = ColorManager.textColor(TAA.skm.Parameters.LockedGaugeColor);
        else
            lockColor = this.textColor(TAA.skm.Parameters.LockedGaugeColor);
    }
    else{
        if(Utils.RPGMAKER_NAME === 'MZ')
            lockColor = ColorManager.textColor(10);
        else
            lockColor = this.textColor(10);
    }
    var backColor;
    if(Utils.RPGMAKER_NAME === 'MZ')
        backColor = ColorManager.gaugeBackColor();
    else
        backColor = this.gaugeBackColor();
    this.contents.fillRect(x, y, width, height, lockColor);
    this.contents.fillRect(x+2, y+2, width-4, height-4, backColor);
};

Window_Base.prototype.setupSkillMasteryName = function(name, level){
    if(TAA.skm.Parameters.SkillName === undefined || TAA.skm.Parameters.SkillName === "") return name;
    var result = TAA.skm.Parameters.SkillName.replace(/%1/g, name);
    return result.replace(/%2/g, level);
};

//=============================================================================
// TAA.util
//=============================================================================

TAA.util = TAA.util || {};
if(TAA.util.getStateIdByName === undefined){
    TAA.util.getStateIdByName = function(stateName){
        var i = 0;
        while(i < $dataStates.length){
            if($dataStates[i].name === stateName)
                return i;
            i++;
        }
        return 0;
    }
}