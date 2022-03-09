//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [QuestSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Quest_Journal_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A quest journal is a very important tool provided by game developers for the
 * players. It lists various quests, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a quest journal system into your RPG Maker MZ game. You
 * can set up how the quest journal appears, move its windows around and/or
 * reshape them to fit your game.
 *
 * You can adjust the quest's title, display a difficulty level, remind the
 * player who the quest is from, where that quest is from, various dynamic
 * descriptions explaining the quest, a list of objectives to make, a list of
 * rewards that will be given to the player once the quest is complete, and any
 * subtext footnotes and quotes you may wish to insert into each quest.
 *
 * *NOTE*
 *
 * Keep in mind that while this plugin does enable a quest journal system into
 * your game, this plugin will NOT automate it. If you have a quest enabled, it
 * is still up to you to add the quest properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what quests have been
 * handed down to him or her.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Unlimited quest categories.
 * * Unlimited quest slots.
 * * Full control over what appears in the quest journal system and how it
 *   appears in-game.
 * * Update quest descriptions, objectives, rewards, subtexts, etc. mid-game
 *   through the use of Plugin Commands.
 * * A dedicated quest menu that's accessible from the Main Menu or by
 *   Plugin Command call.
 * * A quest tracker that appears in the map scene to keep the player updated
 *   on how far they are progressing in their current quest.
 * * Options for the player to show/hide the quest tracker and reposition its
 *   location on the screen.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Explanation - Categories and Quests
 * ============================================================================
 *
 * The following is an explanation on the differences between Categories and
 * Quests for the usage of this plugin.
 *
 * ---
 *
 * Categories
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Plugin Parameters > Categories > Category Name:
 *
 * This is the category's name. It appears however you type it using text
 * codes, allowing you to color-code it if needed.
 *
 * ---
 *
 * Plugin Parameters > Categories > Quests:
 * 
 * These contain the quests that are listed under this category. Enter in as
 * many as needed/desired.
 *
 * ---
 *
 * Quests
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Plugin Parameters > General > Log Window > Quest Log
 *
 * This determines how the template used by the quest logs to parse information
 * regarding the quests themselves. By default, they are formatted like such:
 *
 * ---
 *
 * \{[[Title]]\}
 * \c[4]Level:\c[0] [[Difficulty]]
 * \c[4]From:\c[0] [[From]]
 * \c[4]Location:\c[0] [[Location]]
 * 
 * \c[4]Description:\c[0]
 * [[Description]]
 * 
 * \c[4]Objectives:\c[0]
 * [[Objectives]]
 * 
 * \c[4]Rewards:\c[0]
 * [[Rewards]]
 * 
 * [[Subtext]]
 * 
 * [[Quote]]
 *
 * ---
 * 
 * Each [[Marker]] is to be replaced by the quest date related to them.
 *
 * - [[Title]] - Inserts the title of the quest.
 *
 * - [[Difficulty]] - Inserts the quest difficulty text.
 *
 * - [[From]] - Inserts the quest origin text.
 *
 * - [[Location]] - Inserts the quest location text.
 *
 * - [[Description]] - Inserts the currently active quest description.
 *   - The quest description can change depending on which Description ID
 *     is currently active for that quest.
 *
 * - [[Objectives]] - Inserts a list of the visible quest objectives.
 *   - The quest objectives visible to the player will be determined by
 *     the quest's Visible Objectives settings and any Plugin Commands
 *     used to alter which objectives are visible and what state they are
 *     currently in (known, completed, failed).
 *
 * - [[Rewards]] - Inserts a list of visible quest rewards.
 *   - The quest rewards visible to the player will be determined by the
 *     quest's Visible Rewards settings and any Plugin Commands used to
 *     alter which rewards are visible and what state they are currently
 *     in (known, claimed, denied).
 *
 * - [[Subtext]] - Inserts the currently active quest subtext.
 *   - The quest subtext can change depending on which Subtext ID is
 *     currently active for that quest.
 *
 * - [[Quote]] - Inserts the currently active quest quote.
 *   - The quest quote can change depending on which Quote ID is
 *     currently active for that quest.
 *
 * ---
 *
 * Each of the following aspects of the quests can be changed through the usage
 * of Plugin Commands:
 *
 * - Description
 * - Objectives
 * - Rewards
 * - Subtext
 * - Quote
 *
 * The following are the Plugin Commands that can change them:
 *
 * - Quest: Description Change
 * - Quest: Objectives Change
 * - Quest: Rewards Change
 * - Quest: Subtext Change
 * - Quest: Quote Change
 *
 * ---
 *
 * More information will be explained in their respective Plugin Parameter
 * sections further down in the help file.
 *
 * ============================================================================
 * Control Variable and Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Control Variable event commands and/or Conditional
 * Branch event commands with the Quest Journal System plugin, you can insert
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * These are new JavaScript functions added through this plugin and will not
 * work without it.
 * 
 * ---
 * 
 * === Control Variable Script Functions ===
 * 
 * These are newly added JavaScript functions that return a numeric value.
 * The functions are best used with the Control Variable script input field.
 * 
 * ---
 * 
 * totalQuestsAvailable()
 * 
 * - Returns the total number of quests available for the player.
 * 
 * ---
 * 
 * totalQuestsCompleted()
 * 
 * - Returns the total number of quests completed by the player.
 * 
 * ---
 * 
 * totalQuestsFailed()
 * 
 * - Returns the total number of quests failed by the player.
 * 
 * ---
 * 
 * totalQuestsRevealed()
 * 
 * - Returns the total number of quests visible to the player.
 * 
 * ---
 * 
 * totalQuestsInGame()
 * 
 * - Returns the total number of quests available in-game.
 * 
 * ---
 * 
 * getQuestDescriptionIndex(questKey)
 * 
 * - Returns the select quest's current description index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestDescriptionIndex('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestObjectives(questKey)
 * 
 * - Returns the total number of visible quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalQuestObjectives(questKey)
 * 
 * - Returns the total number of quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestRewards(questKey)
 * 
 * - Returns the total number of visible quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestRewards('Welcome')
 * 
 * ---
 * 
 * totalQuestRewards(questKey)
 * 
 * - Returns the total number of quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestRewards('Welcome')
 * 
 * ---
 * 
 * getQuestSubtextIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestSubtextIndex('Welcome')
 * 
 * ---
 * 
 * getQuestQuoteIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestQuoteIndex('Welcome')
 * 
 * ---
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * isQuestObjectiveCompleted(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is completed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveCompleted('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveFailed(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is failed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveFailed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveUncleared(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is uncleared.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveUncleared('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardClaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is claimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardClaimed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardDenied(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is denied.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardDenied('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardUnclaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is unclaimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardUnclaimed('Welcome', 1)
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
 * ---
 * 
 * === Action Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Use: +x>
 * <Variable id On Use: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Whenever any actor uses this specific skill or item, increase or decrease
 *   the target variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Enemy Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Death: +x>
 * <Variable id On Death: -x>
 *
 * - Used for: Enemy Notetags
 * - Whenever this specific enemy dies, increase or decrease the target
 *   variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Item Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Gain: +x>
 * <Variable id On Gain: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party gains the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 * 
 * ---
 *
 * <Variable id On Lose: +x>
 * <Variable id On Lose: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party loses the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * <Track With Variable id>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever there is a change made to the specific item, weapon, or armor,
 *   set the value of the target variable to the number of items owned.
 * - Replace 'id' with the Variable ID you wish to alter.
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
 * === Quest Plugin Commands ===
 * 
 * ---
 *
 * Quest: Add/Complete/Fail/Remove
 * - Adds quest(s) to be known/completed/failed.
 * - Or removes them.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Status:
 *   - Change the status to this.
 *     - Add to Known
 *     - Add to Completed
 *     - Add to Failed
 *     - Remove from All
 *
 * ---
 *
 * Quest: Description Change
 * - Changes the description of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Description ID:
 *   - Change the description of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Objectives Change
 * - Changes the objective(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Objective ID(s):
 *   - Select the objective ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the objective(s) to this.
 *     - Show Objective(s)
 *     - Complete Objective(s)
 *     - Fail Objective(s)
 *     - Remove Objective(s)
 *
 * ---
 *
 * Quest: Quote Change
 * - Changes the quote of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the quote of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Rewards Change
 * - Changes the reward(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Reward ID(s):
 *   - Select the reward ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the reward(s) to this.
 *     - Show Reward(s)
 *     - Claim Reward(s)
 *     - Deny Reward(s)
 *     - Remove Reward(s)
 *
 * ---
 *
 * Quest: Subtext Change
 * - Changes the subtext of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the subtext of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Tracker Plugin Commands ===
 * 
 * ---
 *
 * Tracker: Change Quest
 * - Changes the tracked quest.
 *
 *   Quest Key:
 *   - Insert the quest key here.
 *
 * ---
 *
 * Tracker: Refresh Window
 * - Refreshes the quest tracker window.
 *
 * ---
 *
 * Tracker: Show/Hide Window
 * - Can forcefully hide window.
 * - Showing will depend on the player's Options setting.
 *
 *   Show/Hide?:
 *   - Shows/hides the tracker window on the map.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Call Scene_Quest
 * - Opens Scene_Quest for the player.
 * - Does not work in battle.
 *
 * ---
 *
 * System: Enable Quests in Menu?
 * - Enables/disables quest menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables quest menu inside the main menu.
 *
 * ---
 *
 * System: Show Quests in Menu?
 * - Shows/hides quest menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides quest menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings determine various aspects of the Quest System plugin
 * from the quests that appear at the start of the game to how it's displayed
 * inside menus.
 *
 * ---
 *
 * Starting Quests
 * 
 *   Known Quests:
 *   - Which quests are known at the start of the game?
 *   - Insert their keys here.
 * 
 *   Completed Quests:
 *   - Which quests are completed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Failed Quests:
 *   - Which quests are failed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Tracked Quest:
 *   - Which quest is tracked at the start of the game?
 *
 * ---
 *
 * Scene_Quest
 *
 * ---
 * 
 * Scene_Quest > Background Settings:
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
 * Scene_Quest > Vocab
 *
 * ---
 * 
 * Scene_Quest > Vocab > Command Window
 * 
 *   Command: Known:
 *   - Text used to display known quests.
 *
 *   Command: Completed:
 *   - Text used to display completed quests.
 * 
 *   Command: Failed:
 *   - Text used to display failed quests.
 *
 * ---
 *
 * Scene_Quest > Vocab > Label Window
 * 
 *   Empty Title:
 *   - Text displayed in the Label Window when no quest is selected.
 *
 * ---
 *
 * Scene_Quest > Vocab > List Window
 * 
 *   Open Categories:
 *   - Text format for an open category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   Closed Categories:
 *   - Text format for a closed category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   No Quest Listed:
 *   - Text when no quest is listed.
 * 
 *   Tracked Quest:
 *   - Text format for a tracked quest.
 *   - %1 - Tracked Quest's Name
 *
 * ---
 *
 * Scene_Quest > Vocab > Log Window
 * 
 *   Empty Message:
 *   - Text displayed when no quest is selected.
 *
 *     JS: On Load:
 *     - Runs code upon making the empty message.
 *     - Useful for setting up variables.
 * 
 *   Quest Log:
 *   - Text format for Quest Log Window.
 *   - Instructions:
 *     - Insert the [[Keyword]] marks in the text where you want certain parts
 *       of the quest to appear.
 *
 *       - [[Title]] - Inserts the title of the quest.
 *
 *       - [[Difficulty]] - Inserts the quest difficulty text.
 *
 *       - [[From]] - Inserts the quest origin text.
 *
 *       - [[Location]] - Inserts the quest location text.
 *
 *       - [[Description]] - Inserts the currently active quest description.
 *         - The quest description can change depending on which Description ID
 *           is currently active for that quest.
 *
 *       - [[Objectives]] - Inserts a list of the visible quest objectives.
 *         - The quest objectives visible to the player will be determined by
 *           the quest's Visible Objectives settings and any Plugin Commands
 *           used to alter which objectives are visible and what state they are
 *           currently in (known, completed, failed).
 *
 *       - [[Rewards]] - Inserts a list of visible quest rewards.
 *         - The quest rewards visible to the player will be determined by the
 *           quest's Visible Rewards settings and any Plugin Commands used to
 *           alter which rewards are visible and what state they are currently
 *           in (known, claimed, denied).
 *
 *       - [[Subtext]] - Inserts the currently active quest subtext.
 *         - The quest subtext can change depending on which Subtext ID is
 *           currently active for that quest.
 *
 *       - [[Quote]] - Inserts the currently active quest quote.
 *         - The quest quote can change depending on which Quote ID is
 *           currently active for that quest.
 * 
 *   Objective (Known):
 *   - Text format for known objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Done):
 *   - Text format for complete objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Failed):
 *   - Text format for failed objectives.
 *   - %1 - Objective Text
 * 
 *   Reward (Known):
 *   - Text format for normal rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Claimed):
 *   - Text format for claimed rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Denied):
 *   - Text format for denied rewards.
 *   - %1 - Reward Text
 *
 * ---
 *
 * Scene_Quest > Vocab > Button Assist Window
 * 
 *   Scroll Up/Down:
 *   - Text for Page Up/Down to scroll log window.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Tracker:
 *   - Text for tracking quests.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Expand:
 *   - Text for expanding categories.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Collapse:
 *   - Text for collapsing categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Scene_Quest > Icons
 * 
 *   Icon: Known:
 *   - Icon used for this command.
 * 
 *   Icon: Completed:
 *   - Icon used for this command.
 * 
 *   Icon: Failed:
 *   - Icon used for this command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Category Settings
 * ============================================================================
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - This category's name.
 *   - You may use text codes.
 * 
 *   Quests:
 *   - A list of quests listed under this category.
 *   - Quests will be listed in the same order as this parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Settings
 * ============================================================================
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Quest
 * 
 *   Quest ID Key:
 *   - This quest's identification key. Quests require unique keys for the
 *     plugin to differentiate them.
 *   - It is VERY important that you keep this key unique from other quests in
 *     order for the Quest System to operate properly in your game.
 *
 * ---
 *
 * Header
 * 
 *   Title:
 *   - The quest of the title. This is what appears in-game.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Title]] marker.
 * 
 *   Difficulty:
 *   - Difficulty level for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Difficulty]] marker.
 * 
 *   From:
 *   - Insert the name of the one who issued this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[From]] marker.
 * 
 *   Location:
 *   - Insert location name where this quest was issued.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Location]] marker.
 * 
 *   Description:
 *   - Type out the description(s) used for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Description]] marker.
 *   - The displayed description will depend on the Description ID set through
 *     Plugin Command.
 *   - If no Description ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * Lists
 * 
 *   Objectives List:
 *   - The objectives to be completed for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Objectives]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the objectives.
 *    - This can be done thorugh the Visible Objectives parameter or through
 *      Plugin Commands.
 * 
 *   Visible Objectives:
 *   - The objectives that are visible from the start.
 * 
 *   Rewards List:
 *   - The reward list for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Rewards]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the rewards.
 *    - This can be done thorugh the Visible Rewards parameter or through
 *      Plugin Commands.
 * 
 *   Visible Rewards:
 *   - The rewards that are visible from the start.
 *
 * ---
 *
 * Footer
 * 
 *   Subtext:
 *   - Subtext to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Subtext]] marker.
 *   - The displayed description will depend on the Subtext ID set through
 *     Plugin Command.
 *   - If no Subtext ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 * 
 *   Quotes:
 *   - Quotes to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Quote]] marker.
 *   - The displayed description will depend on the Quote ID set through
 *     Plugin Command.
 *   - If no Quote ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Load:
 *   - Runs code upon loading the quest in Scene_Quest.
 *   - Useful for setting up variables.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Tracker Settings
 * ============================================================================
 *
 * The Quest Tracker Window is a window that appears on the map scene to
 * display the objectives (and other desired information) of the currently
 * tracked quest decided by the player.
 *
 * ---
 *
 * General
 *
 *   Tracker Format:
 *   - Text format for Quest Tracker Window.
 *   - Read help file for instructions.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Add Show Tracker?:
 *   - Add the 'Show Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Position Tracker?:
 *   - Add the 'Position Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *     Option OFF:
 *     - Text displayed when the option is OFF.
 * 
 *     Option ON:
 *     - Text displayed when the option is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Quest' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Quest' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Quest' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Quest.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you control the various windows that appear in the
 * Scene_Quest menu and the Quest Tracker Window that appears in Scene_Map.
 *
 * ---
 *
 * Command Window
 * 
 *   Show Failed Quests?:
 *   - Show/hide Failed Quests in the command window.
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Quest Label
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Log Window
 * 
 *   PageUp/Down Speed:
 *   - Scroll speed for PageUp/Down.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   EXPERIMENTAL:
 * 
 *     Automatic Word Wrap?:
 *     - Enables/disables automatic word wrap.
 *     - Requires VisuMZ_1_MessageCore!
 *     - This feature is experimental. Word Wrap does not worth perfectly
 *       with the Log Window, although it performs well enough. This feature
 *       will be updated and completed at a later point in the future. Use it
 *       at your own discretion.
 *
 * ---
 *
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Tracker Window
 * 
 *   Window Scale:
 *   - How much do you want to scale the Tracker Window's size by?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * JavaScript Functions
 * ============================================================================
 *
 * These are some new JavaScript functions that you can use for the
 * 'JS: On Load' Plugin Parameter found in the Quest settings.
 *
 * Using these require you to have an adequate understanding of how JavaScript
 * works in order to successfully use it.
 *
 * ---
 *
 * $gameSystem.setQuestStatus(key, status)
 * - Changes the quest's completion status.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestStatus('exampleName', 'completed')
 *
 * ---
 *
 * $gameSystem.setQuestDescription(key, id)
 * - Changes the quest's description.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with description ID to use.
 *
 * Example: $gameSystem.setQuestDescription('exampleName', 2)
 *
 * ---
 *
 * $gameSystem.setQuestObjectives(key, ids, status)
 * - Changes the quest's objectives.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestDescription('exampleName', [1, 2, 3], 'failed')
 *
 * ---
 *
 * $gameSystem.setQuestRewards(key, ids, status)
 * - Changes the quest's rewards.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'claimed'
 *   - 'denied'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestRewards('exampleName', [1, 3, 5], 'claimed')
 *
 * ---
 *
 * $gameSystem.setQuestSubtext(key, id)
 * - Changes the quest's subtext.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with subtext ID to use.
 *
 * Example: $gameSystem.questSubtext('exampleName', 3)
 *
 * ---
 *
 * $gameSystem.setQuestQuote(key, id)
 * - Changes the quest's quote.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with quote ID to use.
 *
 * Example: $gameSystem.setQuestQuote('exampleName', 4)
 *
 * ---
 *
 * DISCLAIMER:
 *
 * Keep in mind that VisuStella is NOT responsible for your proficiency (or
 * otherwise) of JavaScript.
 *
 * If you get any errors with the custom code, it is up to YOU to fix it.
 * 
 * If you do not understand how any of this section works, do not be afraid.
 * It's not the end of the world.
 * 
 * You can still change the status of the quests and its objectives through the
 * usage of Plugin Commands.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.10: December 11, 2020
 * * Bugs Fixed!
 * ** Quest tracking should now automatically remove itself once a quest is
 *    dubbed complete, failed, or removed. Fix made by Yanfly.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixed!
 * ** The Button Assist Window will now properly display the text for expanding
 *    and collapsing quest categories. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 1, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Updates!
 * ** When multiple parallel events are occuring, they will no longer cause lag
 *    by inducing multiple refreshes at a time. Update by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Quest Tracker Settings > Tracker Format
 * **** Text format for Quest Tracker Window. This lets you customize the text
 *      that appears in the Quest Tracker instead of just having the title and
 *      the objectives.
 * 
 * Version 1.06: October 25, 2020
 * * Feature Update!
 * ** If Message Core is not detected, <ColorLock> and </ColorLock> notetags
 *    will be automatically removed. Added by Arisu.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** "Control Variable and Conditional Branch Usage" section added for those
 *    who wish to gather data for the script input fields of the mentioned
 *    event commands.
 * 
 * Version 1.04: October 4, 2020
 * * Bug Fixes!
 * ** Quest Tracker window refreshes should no longer cause infinite loops when
 *    used with specific script calls. Fix made by Yanfly.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** For all the new features!
 * * New Features!
 * ** New notetags added by Olivia!
 * ** <Variable id On Death: +x> and <Variable id On Death: -x> for enemies.
 * ** <Variable id On Gain: +x> and <Variable id On Gain: -x> for items,
 *    weapons, and armors.
 * ** <Variable id On Lose: +x> and <Variable id On Lose: -x> for items,
 *    weapons, and armors.
 * ** <Track With Variable id> for items, weapons, and armors.
 * ** <Variable id On Use: +x> and <Variable id On Use: -x> for items & skills.
 * 
 * Version 1.02: September 13, 2020
 * * Bugs Fixed!:
 * ** Quest Tracker Window should no longer flicker.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixed!
 * ** Disabled track windows no longer appear on the screen for one frame after
 *    leaving a menu of any sort. Fix made by Yanfly.
 * ** Viewing the failed quests no longer crash the game. Fix made by Yanfly.
 * * Feature Update!
 * ** The following Plugin Commands will now automatically update the tracker
 *    if needed. Feature update by Yanfly.
 * *** Quest: Add/Complete/Fail/Remove
 * *** Quest: Description Change
 * *** Quest: Objectives Change
 * *** Quest: Quote Change
 * *** Quest: Rewards Change
 * *** Quest: Subtext Change
 *
 * Version 1.00: August 31, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSet
 * @text Quest: Add/Complete/Fail/Remove
 * @desc Adds quest(s) to be known/completed/failed.
 * Or removes them.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Add to Known
 * @value known
 * @option Add to Completed
 * @value completed
 * @option Add to Failed
 * @value failed
 * @option Remove from All
 * @value remove
 * @desc Change the status to this.
 * @default known
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestDescription
 * @text Quest: Description Change
 * @desc Changes the description of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Description ID
 * @desc Change the description of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestObjectives
 * @text Quest: Objectives Change
 * @desc Changes the objective(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Objective ID(s)
 * @type string[]
 * @desc Select the objective ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Objective(s)
 * @value show
 * @option Complete Objective(s)
 * @value complete
 * @option Fail Objective(s)
 * @value fail
 * @option Remove Objective(s)
 * @value remove
 * @desc Change the status of the objective(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestQuote
 * @text Quest: Quote Change
 * @desc Changes the quote of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Quote ID
 * @desc Change the quote of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestRewards
 * @text Quest: Rewards Change
 * @desc Changes the reward(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Reward ID(s)
 * @type string[]
 * @desc Select the reward ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Reward(s)
 * @value show
 * @option Claim Reward(s)
 * @value claim
 * @option Deny Reward(s)
 * @value deny
 * @option Remove Reward(s)
 * @value remove
 * @desc Change the status of the reward(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSubtext
 * @text Quest: Subtext Change
 * @desc Changes the subtext of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Subtext ID
 * @desc Change the subtext of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerChangeQuest
 * @text Tracker: Change Quest
 * @desc Changes the tracked quest.
 *
 * @arg Key:str
 * @text Quest Key
 * @desc Insert the quest key here.
 * @default Example
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerRefreshWindow
 * @text Tracker: Refresh Window
 * @desc Refreshes the quest tracker window.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerShowHide
 * @text Tracker: Show/Hide Window
 * @desc Can forcefully hide window.
 * Showing will depend on the player's Options setting.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Shows/hides the tracker window on the map.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemCallSceneQuest
 * @text System: Call Scene_Quest
 * @desc Opens Scene_Quest for the player.
 * Does not work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableQuestMenu
 * @text System: Enable Quests in Menu?
 * @desc Enables/disables quest menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowQuestMenu
 * @text System: Show Quests in Menu?
 * @desc Shows/hides quest menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides quest menu inside the main menu.
 * @default true
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
 * @param QuestSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings for the Quest System.
 * @default {"StartingQuests":"","KnownQuests:arraystr":"[\"Welcome\",\"Example\",\"Plugin_Tutorial_Title\",\"Plugin_Tutorial_Difficulty\",\"Plugin_Tutorial_From\",\"Plugin_Tutorial_Description\",\"Plugin_Tutorial_Objectives\",\"Plugin_Tutorial_Rewards\",\"Plugin_Tutorial_Subtext\",\"Plugin_Tutorial_Quote\",\"Challenge_Plugin_Variables\",\"Challenge_Plugin_Switches\"]","CompletedQuests:arraystr":"[]","FailedQuests:arraystr":"[]","TrackedQuest:str":"Welcome","SceneQuest":"","Vocab":"","VocabCommandWindow":"","CommandWindow_Known_Text:str":"Available","CommandWindow_Completed_Text:str":"Completed","CommandWindow_Failed_Text:str":"Failed","VocabLabelWindow":"","EmptyTitleLabel:str":"\\i[186]Quest Journal","VocabListWindow":"","ListWindowCategoryOpenFmt:str":"- %1(%2)","ListWindowCategoryCloseFmt:str":"+ %1(%2)","NoQuestListed:str":"(No Quests Listed)","ListWindowTrackedQuest:str":"\\c[17]%1\\c[0]","VocabLogWindow":"","LogEmpty:json":"\"\\\\c[5]Main Quests\\\\c[0] are quests that must be\\ncompleted in order to progress further\\ninto the game's story.\\n\\n\\\\c[6]Side Quests\\\\c[0] are optional quests that can\\nbe completed at your discretion. Upon\\ncompleting a side quest, you can receive\\nuseful rewards that may assist you on\\nyour journey.\"","OnLoadQuestJS:func":"\"// Insert JavaScript code here.\"","LogFmt:json":"\"\\\\{[[Title]]\\\\}\\n\\\\c[4]Level:\\\\c[0] [[Difficulty]]\\n\\\\c[4]From:\\\\c[0] [[From]]\\n\\\\c[4]Location:\\\\c[0] [[Location]]\\n\\n\\\\c[4]Description:\\\\c[0]\\n[[Description]]\\n\\n\\\\c[4]Objectives:\\\\c[0]\\n[[Objectives]]\\n\\n\\\\c[4]Rewards:\\\\c[0]\\n[[Rewards]]\\n\\n[[Subtext]]\\n\\n[[Quote]]\"","Objective_Normal_Fmt:str":"◎%1","Objective_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Objective_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","Reward_Normal_Fmt:str":"◎%1","Reward_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Reward_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","ButtonAssistWindow":"","ButtonAssistPageUpDown:str":"Scroll Up/Down","questButtonAssistActive:str":"Track","ButtonAssistExpand:str":"Expand","ButtonAssistCollapse:str":"Collapse","CommandWindowIcons":"","CommandWindow_Known_Icon:num":"193","CommandWindow_Completed_Icon:num":"192","CommandWindow_Failed_Icon:num":"194"}
 *
 * @param Categories:arraystruct
 * @text Quest Categories
 * @type struct<Category>[]
 * @desc A list of categories and their quests.
 * @default ["{\"CategoryName:str\":\"\\\\C[5]Main Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Welcome\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Welcome Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Thank you for using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplugin made by \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThis is an example quest to demonstrate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhow the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] works. It functions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nprimarily as a log book for the various\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nadventures inside your game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Take a look at the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] menu.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]tracked quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to something else.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[186]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] for your game!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[84]Helping support \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Example\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Example Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is where the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoes. Type in whatever text you need\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere in order to explain to the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nabout the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Describe each of the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere for the player.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can have multiple quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nout at once.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe objectives you want visible from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe very beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Here, you can list all the rewards the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngame will give the player upon the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncompletion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list the rewards however you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlike, but do keep it concise.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list multiple rewards, too.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards you want visible from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvery beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]. It is used as extra\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ntext that you may want to place on your\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest journal that differs from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"We learn by example and by direct\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nexperience because there are real limits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto the adequacy of verbal instruction.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Malcolm Gladwell\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[6]Side Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Title\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Titles\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is listed in three\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndifferent places in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Scene\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n1. The top of the screen.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n2. The top of the quest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n3. The quest list on the side.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nBe sure to put some thought in deciding\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyour titles as they are there to convey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwhat the quest is all about.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the title through the quest's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can use icons in the quest title by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[x]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] text code. Keep in mind\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthat the icon will be removed from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A good title is the title of a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsuccessful book.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Raymond Chandler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Difficulty\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Difficulty\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nconvey what kinds of expectations they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nshould have regarding challenge.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThese can range from star ratings like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nLevel ranges like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Level 20+\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the difficulty through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's difficulty is often used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrelay the expected level of conflict a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer may face.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A pessimist sees the difficulty in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nevery opportunity; an optimist sees the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nopportunity in every difficulty.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Winston Churchill\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_From\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]From\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Explaining which \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] the quest is from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan help remind the player its origin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nand also help save the player some time\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nin trying to find that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] again when\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoing to claim the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" text through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Use the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] as a means to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstreamline your player's experience.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"More important than the quest for\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncertainty is the quest for clarity.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Francois Gautier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Description\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Descriptions\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Insert the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe displayed \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndepend on the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] that is\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncurrently active for the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is the updated quest description. This\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan only be seen when it is Description ID #2.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Description ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Descriptions are valuable tools that can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbe used to help remind the player the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npurpose of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description begins in the writer's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nimagination but should finish in the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nreader's.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Stephen King\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Objectives\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Objectives\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are used to streamline\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe goals the player needs to achieve in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\norder to make progress.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Completed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Failed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] objectives from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nobjectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nObjectives \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Completed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Failed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Treat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] like a set of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ninstructions or outline for the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto follow in order to get the desired\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresult both of you want.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"People with objectives succeed because\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthey know where they're going.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Earl Nightingale\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Objectives';\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [5], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [6], 'complete');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [7], 'fail');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Rewards\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Rewards\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are the goodies that are\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npromised to be given to the player upon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe completion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Claimed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Denied\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] rewardsfrom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nRewards \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Claimed Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Denied Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Rewards are incentives for the player to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncomplete them, especially quests of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhigher difficulty levels.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Reward the behavior you want repeated.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Larry Winget\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Rewards';\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [4], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [5], 'claim');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [6], 'deny');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Subtext\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Subtexts\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] section can be used in a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnumber of ways, from hints to summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto warnings.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], you can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchange the text displayed in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtext ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Subtext ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can serve as hints, summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwarnings, reminders, you name it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"After all, reminding a player to do\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsomething only means you want them to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsucceed at it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A discerning eye needs only a hint, and\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nunderstatement leaves the imagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nfree to build its own elaborations.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Russell Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Quote\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Quotes\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to reference specific\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlines of dialogue that could help the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer understand what's needed to be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nOr they could just be \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] made by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\njust about anyone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]descriptions and quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], the quest quotes can also be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchanged to display something else based\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\non the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quote ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Quote ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Quote Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"How you want to use them is up to you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You miss 100% of the shots you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndon't take.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Micahel Scott\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If at first you don't succeed, then\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nskydiving definitely isn't for you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Steven Wright\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[2]Challenge Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Variables\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Variables\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game variables are set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nup to automatically equal the number of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nof the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]first item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] in the inventory.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will automatically set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nitself to completed if the variable's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvalue is determined to be over 10.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Obtain \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\v[1]/10x First Database Item!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst value = $gameParty.numItems($dataItems[1])\\\\\\\\\\\\\\\\nconst status = value >= 10 ? 'completed' : 'known';\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Variables';\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameVariables.setValue(1, value);\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [1], status)\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Switches\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Switches\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]ON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change Switch 1's ON/OFF status.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"View this quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Switches';\\\\\\\\\\\\\\\\nconst id = $gameSwitches.value(1) ? 2 : 1;\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameSystem.setQuestDescription(key, id)\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param Tracker:struct
 * @text Quest Tracker Settings
 * @type struct<Tracker>
 * @desc Setup how all the quest tracker works.
 * @default {"General":"","TrackerFmt:json":"\"\\\\{[[Title]]\\\\}\\n[[Objectives]]\"","Options":"","AdjustRect:eval":"true","AddShowOption:eval":"true","ShowName:str":"Show Quest Tracker","AddPositionOption:eval":"true","PositionName:str":"Quest Tracker Position","PositionOff:str":"←","PositionOn:str":"→"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Set up the main menu defaults.
 * @default {"Name:str":"Quest","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Quest.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Setup how all the windows appear in-game.
 * @default {"CommandWindow":"","ShowFailed:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CommandWindow_BgType:num":"0","CommandWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","QuestLabel":"","QuestLabel_BgType:num":"0","QuestLabel_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","LogWindow":"","LogWindow_Auto_WordWrap:eval":"false","LogWindow_ScrollSpeed:num":"0.20","LogWindow_BgType:num":"0","LogWindow_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","TrackerWindow":"","TrackerWindow_Scale:num":"0.50","TrackerWindow_BgType:num":"0","TrackerWindow_Rect:func":"\"const ww = 560;\\nconst wh = Graphics.height / Window_QuestTracker.scale;\\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\\nconst wy = this.buttonAreaHeight() + 8;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param StartingQuests
 * @text Starting Quests
 *
 * @param KnownQuests:arraystr
 * @text Known Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are known at the start of the game?
 * Insert their keys here.
 * @default ["Welcome","Example","Plugin_Tutorial_Title","Plugin_Tutorial_Difficulty","Plugin_Tutorial_From","Plugin_Tutorial_Description","Plugin_Tutorial_Objectives","Plugin_Tutorial_Rewards","Plugin_Tutorial_Subtext","Plugin_Tutorial_Quote","Challenge_Plugin_Variables","Challenge_Plugin_Switches"]
 *
 * @param CompletedQuests:arraystr
 * @text Completed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are completed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param FailedQuests:arraystr
 * @text Failed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are failed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param TrackedQuest:str
 * @text Tracked Quest
 * @parent StartingQuests
 * @desc Which quest is tracked at the start of the game?
 * @default Welcome
 *
 * @param SceneQuest
 * @text Scene_Quest
 *
 * @param Vocab
 * @parent SceneQuest
 *
 * @param VocabCommandWindow
 * @text Command Window
 * @parent Vocab
 *
 * @param CommandWindow_Known_Text:str
 * @text Command: Known
 * @parent VocabCommandWindow
 * @desc Text used to display known quests.
 * @default Available
 *
 * @param CommandWindow_Completed_Text:str
 * @text Command: Completed
 * @parent VocabCommandWindow
 * @desc Text used to display completed quests.
 * @default Completed
 *
 * @param CommandWindow_Failed_Text:str
 * @text Command: Failed
 * @parent VocabCommandWindow
 * @desc Text used to display failed quests.
 * @default Failed
 *
 * @param VocabLabelWindow
 * @text Label Window
 * @parent Vocab
 *
 * @param EmptyTitleLabel:str
 * @text Empty Title
 * @parent VocabLabelWindow
 * @desc Text displayed in the Label Window when no quest is selected.
 * @default \i[186]Quest Journal
 *
 * @param VocabListWindow
 * @text List Window
 * @parent Vocab
 *
 * @param ListWindowCategoryOpenFmt:str
 * @text Open Categories
 * @parent VocabListWindow
 * @desc Text format for an open category.
 * %1 - Category Name, %2 - Quest Amount
 * @default - %1(%2)
 *
 * @param ListWindowCategoryCloseFmt:str
 * @text Closed Categories
 * @parent VocabListWindow
 * @desc Text format for a closed category.
 * %1 - Category Name, %2 - Quest Amount
 * @default + %1(%2)
 *
 * @param NoQuestListed:str
 * @text No Quest Listed
 * @parent VocabListWindow
 * @desc Text when no quest is listed.
 * @default (No Quests Listed)
 *
 * @param ListWindowTrackedQuest:str
 * @text Tracked Quest
 * @parent VocabListWindow
 * @desc Text format for a tracked quest.
 * %1 - Tracked Quest's Name
 * @default \c[17]%1\c[0]
 *
 * @param VocabLogWindow
 * @text Log Window
 * @parent Vocab
 *
 * @param LogEmpty:json
 * @text Empty Message
 * @parent VocabLogWindow
 * @type note
 * @desc Text displayed when no quest is selected.
 * @default "\\c[5]Main Quests\\c[0] are quests that must be\ncompleted in order to progress further\ninto the game's story.\n\n\\c[6]Side Quests\\c[0] are optional quests that can\nbe completed at your discretion. Upon\ncompleting a side quest, you can receive\nuseful rewards that may assist you on\nyour journey."
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent LogEmpty:json
 * @type note
 * @desc Runs code upon making the empty message.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 * @param LogFmt:json
 * @text Quest Log
 * @parent VocabLogWindow
 * @type note
 * @desc Text format for Quest Log Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n\\c[4]Level:\\c[0] [[Difficulty]]\n\\c[4]From:\\c[0] [[From]]\n\\c[4]Location:\\c[0] [[Location]]\n\n\\c[4]Description:\\c[0]\n[[Description]]\n\n\\c[4]Objectives:\\c[0]\n[[Objectives]]\n\n\\c[4]Rewards:\\c[0]\n[[Rewards]]\n\n[[Subtext]]\n\n[[Quote]]"
 *
 * @param Objective_Normal_Fmt:str
 * @text Objective (Known)
 * @parent LogFmt:json
 * @desc Text format for known objectives.
 * %1 - Objective Text
 * @default ◎%1
 *
 * @param Objective_Completed_Fmt:str
 * @text Objective (Done)
 * @parent LogFmt:json
 * @desc Text format for complete objectives.
 * %1 - Objective Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Objective_Failed_Fmt:str
 * @text Objective (Failed)
 * @parent LogFmt:json
 * @desc Text format for failed objectives.
 * %1 - Objective Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param Reward_Normal_Fmt:str
 * @text Reward (Known)
 * @parent LogFmt:json
 * @desc Text format for normal rewards.
 * %1 - Reward Text
 * @default ◎%1
 *
 * @param Reward_Completed_Fmt:str
 * @text Reward (Claimed)
 * @parent LogFmt:json
 * @desc Text format for claimed rewards.
 * %1 - Reward Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Reward_Failed_Fmt:str
 * @text Reward (Denied)
 * @parent LogFmt:json
 * @desc Text format for denied rewards.
 * %1 - Reward Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param ButtonAssistWindow
 * @text Button Assist Window
 * @parent Vocab
 *
 * @param ButtonAssistPageUpDown:str
 * @text Scroll Up/Down
 * @parent ButtonAssistWindow
 * @desc Text for Page Up/Down to scroll log window.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll Up/Down
 *
 * @param questButtonAssistActive:str
 * @text Tracker
 * @parent ButtonAssistWindow
 * @desc Text for tracking quests.
 * Requires VisuMZ_0_CoreEngine!
 * @default Track
 *
 * @param ButtonAssistExpand:str
 * @text Expand
 * @parent ButtonAssistWindow
 * @desc Text for expanding categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param ButtonAssistCollapse:str
 * @text Collapse
 * @parent ButtonAssistWindow
 * @desc Text for collapsing categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param CommandWindowIcons
 * @text Icons
 * @parent SceneQuest
 *
 * @param CommandWindow_Known_Icon:num
 * @text Icon: Known
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 193
 *
 * @param CommandWindow_Completed_Icon:num
 * @text Icon: Completed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 192
 *
 * @param CommandWindow_Failed_Icon:num
 * @text Icon: Failed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 194
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param CategoryName:str
 * @text Category Name
 * @desc This category's name.
 * You may use text codes.
 * @default Untitled
 *
 * @param Quests:arraystruct
 * @text Quests
 * @type struct<Quest>[]
 * @desc A list of quests listed under this category.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Individual Quest Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Key:str
 * @text Quest ID Key
 * @desc This quest's identification key. Quests require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Header
 *
 * @param Title:str
 * @text Title
 * @parent Header
 * @desc The quest of the title. This is what appears in-game.
 * You may use text codes.
 * @default \i[87]Untitled Quest
 *
 * @param Difficulty:str
 * @text Difficulty
 * @parent Header
 * @desc Difficulty level for this quest.
 * You may use text codes.
 * @default Easy Peasy
 *
 * @param From:str
 * @text From
 * @parent Header
 * @desc Insert the name of the one who issued this quest.
 * You may use text codes.
 * @default NPC Name
 *
 * @param Location:str
 * @text Location
 * @parent Header
 * @desc Insert location name where this quest was issued.
 * You may use text codes.
 * @default Location Name
 *
 * @param Description:arrayjson
 * @text Description
 * @parent Header
 * @type note[]
 * @desc Type out the description(s) used for this quest.
 * You may use text codes.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Lists
 *
 * @param Objectives:arrayjson
 * @text Objectives List
 * @parent Lists
 * @type note[]
 * @desc The objectives to be completed for this quest.
 * You may use text codes.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleObjectives:arraynum
 * @text Visible Objectives
 * @parent Objectives:arrayjson
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards:arrayjson
 * @text Rewards List
 * @parent Lists
 * @type note[]
 * @desc The reward list for this quest.
 * You may use text codes.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleRewards:arraynum
 * @text Visible Rewards
 * @parent Rewards:arrayjson
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Footer
 *
 * @param Subtext:arrayjson
 * @text Subtext
 * @parent Footer
 * @type note[]
 * @desc Subtext to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"This is a \\\\c[4]subtext\\\\c[0]. It is used as extra\\ntext that you may want to place on your\\nquest journal that differs from the\\n\\\\c[4]description\\\\c[0].\""]
 *
 * @param Quotes:arrayjson
 * @text Quotes
 * @parent Footer
 * @type note[]
 * @desc Quotes to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"Insert the quotes of NPC's here.\""]
 *
 * @param JavaScript
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent JavaScript
 * @type note
 * @desc Runs code upon loading the quest in Scene_Quest.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Tracker Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tracker:
 *
 * @param General
 *
 * @param TrackerFmt:json
 * @text Tracker Format
 * @parent General
 * @type note
 * @desc Text format for Quest Tracker Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n[[Objectives]]"
 *
 * @param Options
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
 * @param AddShowOption:eval
 * @text Add Show Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Tracker' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Quest Tracker
 *
 * @param AddPositionOption:eval
 * @text Add Position Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Position Tracker' option to the Options menu?
 * @default true
 *
 * @param PositionName:str
 * @text Option Name
 * @parent AddPositionOption:eval
 * @desc Command name of the option.
 * @default Quest Tracker Position
 *
 * @param PositionOff:str
 * @text Option OFF
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is OFF.
 * @default ←
 *
 * @param PositionOn:str
 * @text Option ON
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is ON.
 * @default →
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Quest' option in the Main Menu.
 * @default Quest
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Quest' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Quest' option to the Main Menu by default?
 * @default true
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param ShowFailed:eval
 * @text Show Failed Quests?
 * @parent CommandWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show/hide Failed Quests in the command window.
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent CommandWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent CommandWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CommandWindow_BgType:num
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
 * @param CommandWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param QuestLabel
 * @text Quest Label
 *
 * @param QuestLabel_BgType:num
 * @text Background Type
 * @parent QuestLabel
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
 * @param QuestLabel_Rect:func
 * @text JS: X, Y, W, H
 * @parent QuestLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, false);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindow
 * @text Log Window
 *
 * @param LogWindow_ScrollSpeed:num
 * @text PageUp/Down Speed
 * @parent LogWindow
 * @desc Scroll speed for PageUp/Down.
 * @default 0.20
 *
 * @param LogWindow_BgType:num
 * @text Background Type
 * @parent LogWindow
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
 * @param LogWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent LogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindowExperimental
 * @text EXPERIMENTAL
 * @parent LogWindow
 *
 * @param LogWindow_Auto_WordWrap:eval
 * @text Automatic Word Wrap?
 * @parent LogWindowExperimental
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables automatic word wrap.
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindow_BgType:num
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
 * @param ListWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param TrackerWindow
 * @text Tracker Window
 *
 * @param TrackerWindow_Scale:num
 * @text Window Scale
 * @parent TrackerWindow
 * @desc How much do you want to scale the Tracker Window's size by?
 * @default 0.50
 *
 * @param TrackerWindow_BgType:num
 * @text Background Type
 * @parent TrackerWindow
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
 * @param TrackerWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent TrackerWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 560;\nconst wh = Graphics.height / Window_QuestTracker.scale;\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\nconst wy = this.buttonAreaHeight() + 8;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x228b=['STRUCT','isQuestCompleted','tgltP','onDatabaseLoaded','ConvertParams','noQuestsLabel','rewardsDenied','JSON','origin','completed','addQuestSystemquestTrackerShowCommand','mwSDs','text','VisuMZ_1_MainMenuCore','Rewards','_scrollY','questRewardsClaimed','isQuestCommandEnabled','name','makeData','QuestLabel_BgType','CommandWindow_Failed_Text','remove','cursorPageup','lFsmB','<WORDWRAP>%1','questRewardsNormalFmt','itemTextAlign','requestRefresh','setQuestSubtext','makeQuestList','left','ARRAYNUM','questsFailed','createQuestRewards','Objective_Completed_Fmt','scaleSprite','setValue','SystemEnableQuestMenu','VisibleObjectives','contents','Window','OuyaL','iconWidth','questObjectivesCompleted','addNewState','commandWindowRect','exit','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_scrollBaseX','setQuestObjectives','_commandWindow','Subtext','ciSsQ','join','ShowFailed','QuestObjectives','AddShowOption','addQuestSystemquestTrackerPositionCommand','createCustomBackgroundImages','setQuestDescription','questCompletedCmd','drawItemStyleIcon','ARRAYSTR','dEWVB','EmptyTitleLabel','questButtonAssistActive','TrackerFmt','qEmCd','enabled','createBackground','round','questObjectiveNormalFmt','WordWrap','useItem','concat','jNVuU','LogFmt','opacity','isQuestFailed','setQuestForQuestTrackerWindow','isPressed','BgFilename1','TrackerShowHide','denied','ListWindow_Rect','applyWordWrapEntry','makeCommandList','categoryList','rewards','YAzqT','objectivesCompleted','isSceneMap','Key','Show','refreshQuestTrackerWindow','addQuestCommandAutomatically','deathStateId','questTrackerPosOn','push','_listWindow','clamp','Window_Options_statusText','CompletedQuests','IucVR','QuestQuote','Quests','FEBTp','EtdqB','xdamz','process_VisuMZ_QuestSystem_Data','questObjectivesFailed','twvpz','setLabelWindow','setQuest','ButtonAssistPageUpDown','deactivate','addLoadListener','KMyUk','ToeVc','AddPositionOption','tqWCN','boxWidth','PositionName','known','innerWidth','openness','isFailedQuestsVisible','defaultQuestTrackerFmt','index','initQuestSystem','_commandNameWindow','isFailedQuestsEnabled','addNoQuestsListedCommand','PositionOn','isCurrentCategoryOpen','commandNameWindowCenter','Tracker','activate','xUsPx','CategoryName','createCommandWindow','WHJTq','format','setListWindow','bind','isQuestKnown','currentExt','BgFilename2','updateDelayRefresh','noQuestsListed','unshift','mZvTT','Status','_quests','isCategoryOpen','commandName','bitmap','Description','visibilityLevel','addCategoryCommand','_questTrackerRefresh','ListWindow_BgType','eVWWE','Reward_Completed_Fmt','VhZES','ConfigManager_makeData','height','ROlDS','onListQuest','Game_BattlerBase_addNewState','_backSprite1','uiInputPosition','textSizeEx','addCompletedQuestsCommand','_categoryStatus','onListCategory','uiMenuStyle','initCategories','TLhZg','doesCategoryHaveQuestsAvailable','resetFontSettings','constructor','maxItems','Difficulty','gxcsp','applyData','questTrackerPosition','max','Game_Party_gainItem','shown','Tdcpp','show','createQuestObjectives','createContents','HiXMr','QuestSubtext','Achfj','center','replace','maxCommands','OnLoadQuestJS','xAzVk','_doodadEditorMode','gainItem','loadTitle1','_scrollX','CommandWindow_Known_Text','buttonAssistText1','getConfigValue','Categories','loadTitle2','setBackgroundType','Title','version','LogWindow_Rect','questLogWindowRect','commandQuest','questJournalSystemGainItem','clear','questTrackerPosOff','ARRAYEVAL','Scene_Menu_createCommandWindow','claimed','commandSymbol','QuestOrder','note','claim','Game_Actor_tradeItemWithParty','omdzs','createQuestQuote','FailedQuests','Name','openCloseCurrentCategory','questRewardsClaimedFmt','questsCompleted','rWgWI','parse','questButtonAssistCollapse','QuestDescription','setLogWindow','QuestSystem','TargetIDs','PositionOff','isKnownQuestsEnabled','_tradeItemWithParty','Enable','drawItem','isActor','TrackerWindow_Rect','changePaintOpacity','commandNameWindowDrawText','questCategoryOpenedFmt','setTrackedQuest','ShowMainMenu','addCommand','iconHeight','isDead','addChild','isCompletedQuestsEnabled','pagedown','drawTextEx','NXIFB','isRightInputMode','DzJkM','Window_Options_addGeneralOptions','popScene','Game_Map_requestRefresh','commandStyleCheck','removed','lineHeight','setQuestStatus','ConfigManager_applyData','currentQuest','questSubtext','width','questObjectiveClearedFmt','_delayDraw','amYBX','ListWindowTrackedQuest','questFailedCmd','Objectives','quest','Reward_Normal_Fmt','LrBmv','Scene_Boot_onDatabaseLoaded','scale','setQuestQuote','ListWindowCategoryCloseFmt','questLabelWindowRect','finalizeWordWrapSupport','category','SystemShowQuestMenu','onCommandOk','makeDeepCopy','itemLineRect','Window_MenuCommand_addOriginalCommands','Settings','questJournalSystemUseItem','filter','return\x200','szkJM','addQuestCommand','_backSprite2','LogWindow_ScrollSpeed','Vgmin','right','questCommandName','noMessageCoreRemoveEscapeCodes','questData','LineBreakSpace','questRewardsDenied','Game_Map_refresh','dScHo','create','_isRefreshingQuestTrackerWindow','questObjectiveFailedFmt','processWheelScroll','questQuote','trackedQuest','_labelWindow','auto','DICMP','questButtonAssistExpand','updateLogWindow','smoothSelect','isOkEnabled','zEaRJ','drawIcon','questCategoryClosedFmt','numItems','KfAxx','iconText','drawItemStyleIconText','Scene_Map_createSpriteset','objectives','_textHeight','questLogFmt','applyWordWrap','questObjectives','_questTrackerWindow','questTrackerFmt','tracked','currentCategory','includes','TjWhI','_scene','map','CmdTextAlign','createCommandNameWindow','questListWindowRect','Keys','_hasDiedBefore','Location','inBattle','_quest','npdaX','ButtonAssistCollapse','quotes','initialize','FyKrp','VisuMZ_1_MessageCore','Game_System_initialize','activeBgType','subtext','_logWindow','aptiX','QuestLabel_Rect','deselect','\x5cI[%1]%2','IeRgP','NYKFK','VisibleRewards','QuestData','MainMenu','commandNameWindowDrawBackground','Objective_Failed_Fmt','updatePageUpDownScroll','updateVisibility','_scrollBaseY','joinQuestEntries','_categoryFilter','AdjustRect','FUNC','cYiCc','wordWrapSupport','update','totalCommands','TrackedQuest','ShowName','JuUGf','callUpdateHelp','isAlive','questTrackerWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SFjBs','getBackgroundOpacity','setQuestRewards','questFailedIcon','SystemCallSceneQuest','addQuestSystemCommands','createQuestSubtext','questsKnown','ARRAYJSON','getQuestLogFmt','TzWhz','questTrackerShow','toUpperCase','scrollBlockWidth','questButtonAssistPageUpDn','questCompletedIcon','failed','contentsHeight','\x0a\x5c{[[Title]]\x5c}\x0a[[Objectives]]\x0a','CommandWindow_Completed_Icon','nxBCb','questDescription','value','prototype','description','isQuestTrackerVisible','buttonAssistText4','registerCommand','QuestRewards','ccvRP','itemPadding','updateCommandNameWindow','addFailedQuestsCommand','isEnemy','ARRAYSTRUCT','isQuestCommandVisible','CommandWindow_Completed_Text','Reward_Failed_Fmt','createQuestDescription','baseTextRect','CommandWindow_Rect','innerHeight','scrollBlockHeight','showTracker','createSpriteset','pageup','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','OQeqz','QdWwj','floor','sort','getEmptyLogFmt','addOriginalCommands','questRewards','isCommandEnabled','updateScrollBase','refresh','smoothScrollDown','windowPadding','statusText','adjustSprite','setHandler','createQuestText','match','questKnownIcon','questEmptyText','LogWindow_BgType','mainCommandWidth','setQuestTrackerVisible','tradeItemWithParty','NoQuestListed','setCategoryFilter','addKnownQuestsCommand','isquestMenuShown','ListWindowCategoryOpenFmt','updateLabelWindow','createEmptyText','addWindow','convertLineBreaksForWordWrap','addGeneralOptions','commandStyle','CommandWindow_BgType','WHgdt','Scene_Options_maxCommands','BpGJS','onListCancel','KnownQuests','objectivesFailed','questRewardsDeniedFmt','Quotes','General','createQuestListWindow','length','LogEmpty','questTrackedQuestFmt','helpAreaHeight','AhqKW','icon','IQYXY','parameters','TrackerRefreshWindow','SnapshotOpacity','cancel','TargetID','currentSymbol','BgSettings','questKnownCmd','isquestMenuEnabled','createQuestLogWindow','rewardsClaimed','WzwgK','Game_Battler_useItem','TrackerWindow_BgType','call','createQuestTrackerWindow','trim','QuestSet'];(function(_0x48216b,_0x579d96){const _0x228b4f=function(_0x554a39){while(--_0x554a39){_0x48216b['push'](_0x48216b['shift']());}};_0x228b4f(++_0x579d96);}(_0x228b,0x10b));const _0x554a=function(_0x48216b,_0x579d96){_0x48216b=_0x48216b-0x16b;let _0x228b4f=_0x228b[_0x48216b];return _0x228b4f;};const _0x3f33dd=_0x554a;var label=_0x3f33dd(0x351),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3f33dd(0x18b)](function(_0x1fd045){const _0x3ac1a9=_0x3f33dd;return _0x1fd045['status']&&_0x1fd045[_0x3ac1a9(0x203)][_0x3ac1a9(0x1b8)]('['+label+']');})[0x0];VisuMZ[label][_0x3f33dd(0x189)]=VisuMZ[label][_0x3f33dd(0x189)]||{},VisuMZ[_0x3f33dd(0x264)]=function(_0x3d2530,_0x3fe6bb){const _0x2e8234=_0x3f33dd;for(const _0xaf45ba in _0x3fe6bb){if(_0x2e8234(0x2d9)!==_0x2e8234(0x1c8)){if(_0xaf45ba[_0x2e8234(0x22a)](/(.*):(.*)/i)){const _0x414389=String(RegExp['$1']),_0x2316c5=String(RegExp['$2'])[_0x2e8234(0x1f7)]()[_0x2e8234(0x25e)]();let _0x518f72,_0x5ba1b6,_0x101542;switch(_0x2316c5){case'NUM':_0x518f72=_0x3fe6bb[_0xaf45ba]!==''?Number(_0x3fe6bb[_0xaf45ba]):0x0;break;case _0x2e8234(0x280):_0x5ba1b6=_0x3fe6bb[_0xaf45ba]!==''?JSON[_0x2e8234(0x34d)](_0x3fe6bb[_0xaf45ba]):[],_0x518f72=_0x5ba1b6[_0x2e8234(0x1bb)](_0x13ab39=>Number(_0x13ab39));break;case'EVAL':_0x518f72=_0x3fe6bb[_0xaf45ba]!==''?eval(_0x3fe6bb[_0xaf45ba]):null;break;case _0x2e8234(0x33d):_0x5ba1b6=_0x3fe6bb[_0xaf45ba]!==''?JSON['parse'](_0x3fe6bb[_0xaf45ba]):[],_0x518f72=_0x5ba1b6[_0x2e8234(0x1bb)](_0x58b69b=>eval(_0x58b69b));break;case _0x2e8234(0x267):_0x518f72=_0x3fe6bb[_0xaf45ba]!==''?JSON['parse'](_0x3fe6bb[_0xaf45ba]):'';break;case _0x2e8234(0x1f3):_0x5ba1b6=_0x3fe6bb[_0xaf45ba]!==''?JSON[_0x2e8234(0x34d)](_0x3fe6bb[_0xaf45ba]):[],_0x518f72=_0x5ba1b6[_0x2e8234(0x1bb)](_0x4ad5f7=>JSON[_0x2e8234(0x34d)](_0x4ad5f7));break;case _0x2e8234(0x1df):_0x518f72=_0x3fe6bb[_0xaf45ba]!==''?new Function(JSON['parse'](_0x3fe6bb[_0xaf45ba])):new Function(_0x2e8234(0x18c));break;case'ARRAYFUNC':_0x5ba1b6=_0x3fe6bb[_0xaf45ba]!==''?JSON[_0x2e8234(0x34d)](_0x3fe6bb[_0xaf45ba]):[],_0x518f72=_0x5ba1b6[_0x2e8234(0x1bb)](_0x3e3352=>new Function(JSON['parse'](_0x3e3352)));break;case'STR':_0x518f72=_0x3fe6bb[_0xaf45ba]!==''?String(_0x3fe6bb[_0xaf45ba]):'';break;case _0x2e8234(0x29f):_0x5ba1b6=_0x3fe6bb[_0xaf45ba]!==''?JSON[_0x2e8234(0x34d)](_0x3fe6bb[_0xaf45ba]):[],_0x518f72=_0x5ba1b6[_0x2e8234(0x1bb)](_0x5b9d9c=>String(_0x5b9d9c));break;case _0x2e8234(0x260):_0x101542=_0x3fe6bb[_0xaf45ba]!==''?JSON[_0x2e8234(0x34d)](_0x3fe6bb[_0xaf45ba]):{},_0x518f72=VisuMZ[_0x2e8234(0x264)]({},_0x101542);break;case _0x2e8234(0x20d):_0x5ba1b6=_0x3fe6bb[_0xaf45ba]!==''?JSON[_0x2e8234(0x34d)](_0x3fe6bb[_0xaf45ba]):[],_0x518f72=_0x5ba1b6[_0x2e8234(0x1bb)](_0xd0e2e1=>VisuMZ[_0x2e8234(0x264)]({},JSON[_0x2e8234(0x34d)](_0xd0e2e1)));break;default:continue;}_0x3d2530[_0x414389]=_0x518f72;}}else{function _0x3b18c5(){const _0x5dba04=_0x2e8234;_0x3dd4a2=_0x75b302['toUpperCase']()[_0x5dba04(0x25e)]();const _0x5dfaea=_0x54f481[_0x5dba04(0x17a)](_0x7f556e);if(!_0x5dfaea)return![];_0x127c22[_0x5dba04(0x220)](_0x4dd289);const _0xff013a=_0x441510['questData']()[_0x5dba04(0x2b9)];if(!_0xff013a[_0x3227a7])return![];return _0xff013a[_0x47017d][_0x5dba04(0x1b8)](_0x425f4f);}}}return _0x3d2530;},(_0x3a527c=>{const _0x141662=_0x3f33dd,_0x162263=_0x3a527c[_0x141662(0x272)];for(const _0x1ec63f of dependencies){if('DzJkM'===_0x141662(0x368)){if(!Imported[_0x1ec63f]){alert(_0x141662(0x219)[_0x141662(0x2ef)](_0x162263,_0x1ec63f)),SceneManager[_0x141662(0x28f)]();break;}}else{function _0x4f03cb(){const _0x5976a7=_0x141662;_0xeb3207[_0x5976a7(0x351)][_0x5976a7(0x189)][_0x5976a7(0x245)][_0x5976a7(0x329)]();let _0xe2bb=this[_0x5976a7(0x21e)]();return _0xe2bb=_0x206489[_0x5976a7(0x351)][_0x5976a7(0x1b2)](_0xe2bb),_0xe2bb=_0x154abc['QuestSystem'][_0x5976a7(0x182)](_0xe2bb),_0xe2bb;}}}const _0x2870f4=_0x3a527c[_0x141662(0x203)];if(_0x2870f4['match'](/\[Version[ ](.*?)\]/i)){const _0x48240e=Number(RegExp['$1']);_0x48240e!==VisuMZ[label][_0x141662(0x336)]&&(alert(_0x141662(0x290)[_0x141662(0x2ef)](_0x162263,_0x48240e)),SceneManager['exit']());}if(_0x2870f4['match'](/\[Tier[ ](\d+)\]/i)){if('OuyaL'!==_0x141662(0x28a)){function _0x10be68(){const _0x26f035=_0x141662;this[_0x26f035(0x29a)]();}}else{const _0x2fd219=Number(RegExp['$1']);_0x2fd219<tier?(alert(_0x141662(0x1ea)[_0x141662(0x2ef)](_0x162263,_0x2fd219,tier)),SceneManager[_0x141662(0x28f)]()):tier=Math[_0x141662(0x31c)](_0x2fd219,tier);}}VisuMZ[_0x141662(0x264)](VisuMZ[label][_0x141662(0x189)],_0x3a527c[_0x141662(0x24e)]);})(pluginData),PluginManager[_0x3f33dd(0x206)](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x25f),_0x13f07c=>{const _0x18c246=_0x3f33dd;VisuMZ[_0x18c246(0x264)](_0x13f07c,_0x13f07c);const _0xadcbde=_0x13f07c[_0x18c246(0x1bf)],_0x16c30d=_0x13f07c['Status'];for(const _0x957b5d of _0xadcbde){if(_0x18c246(0x2f8)===_0x18c246(0x2f8))$gameSystem['setQuestStatus'](_0x957b5d,_0x16c30d);else{function _0x3d0b10(){const _0x129173=_0x18c246;if(!_0x5e6d43[_0x129173(0x2bc)]())return;_0x52cab3['_scene'][_0x129173(0x2bf)]();}}}SceneManager[_0x18c246(0x2bc)]()&&SceneManager[_0x18c246(0x1ba)][_0x18c246(0x2bf)]();}),PluginManager[_0x3f33dd(0x206)](pluginData['name'],_0x3f33dd(0x34f),_0x434b4e=>{const _0x381f59=_0x3f33dd;VisuMZ['ConvertParams'](_0x434b4e,_0x434b4e);const _0x1dba3c=_0x434b4e['Keys'],_0xe80b4b=_0x434b4e[_0x381f59(0x252)];for(const _0x53548e of _0x1dba3c){$gameSystem[_0x381f59(0x29c)](_0x53548e,_0xe80b4b);}SceneManager[_0x381f59(0x2bc)]()&&SceneManager[_0x381f59(0x1ba)][_0x381f59(0x2bf)]();}),PluginManager[_0x3f33dd(0x206)](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x298),_0x1077af=>{const _0x972e3d=_0x3f33dd;VisuMZ[_0x972e3d(0x264)](_0x1077af,_0x1077af);const _0x153a73=_0x1077af['Keys'],_0x4c3f17=_0x1077af[_0x972e3d(0x352)],_0x16aa52=_0x1077af[_0x972e3d(0x2f9)];for(const _0x2071ac of _0x153a73){if(_0x972e3d(0x325)!==_0x972e3d(0x1e0))$gameSystem[_0x972e3d(0x292)](_0x2071ac,_0x4c3f17,_0x16aa52);else{function _0x3bb2a4(){const _0x262f6e=_0x972e3d;return _0x2f8f91[_0x262f6e(0x234)]();}}}if(SceneManager[_0x972e3d(0x2bc)]()){if(_0x972e3d(0x191)!==_0x972e3d(0x366))SceneManager[_0x972e3d(0x1ba)]['refreshQuestTrackerWindow']();else{function _0x1a81c3(){const _0x2e5273=_0x972e3d;_0x24272e['QuestSystem'][_0x2e5273(0x17d)][_0x2e5273(0x25c)](this),this[_0x2e5273(0x2ce)]();}}}}),PluginManager[_0x3f33dd(0x206)](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x2c9),_0x68bf78=>{const _0x244e5f=_0x3f33dd;VisuMZ[_0x244e5f(0x264)](_0x68bf78,_0x68bf78);const _0x4541e5=_0x68bf78['Keys'],_0x3c24dc=_0x68bf78['TargetID'];for(const _0x50fee1 of _0x4541e5){$gameSystem[_0x244e5f(0x17f)](_0x50fee1,_0x3c24dc);}SceneManager[_0x244e5f(0x2bc)]()&&SceneManager[_0x244e5f(0x1ba)][_0x244e5f(0x2bf)]();}),PluginManager['registerCommand'](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x207),_0x169ab9=>{const _0x197c38=_0x3f33dd;VisuMZ['ConvertParams'](_0x169ab9,_0x169ab9);const _0xd194bb=_0x169ab9[_0x197c38(0x1bf)],_0x31aa54=_0x169ab9[_0x197c38(0x352)],_0x4ec3a4=_0x169ab9[_0x197c38(0x2f9)];for(const _0x9aef3c of _0xd194bb){$gameSystem[_0x197c38(0x1ed)](_0x9aef3c,_0x31aa54,_0x4ec3a4);}SceneManager[_0x197c38(0x2bc)]()&&SceneManager[_0x197c38(0x1ba)]['refreshQuestTrackerWindow']();}),PluginManager[_0x3f33dd(0x206)](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x324),_0x360ac8=>{const _0x357f8a=_0x3f33dd;VisuMZ['ConvertParams'](_0x360ac8,_0x360ac8);const _0x7b42da=_0x360ac8[_0x357f8a(0x1bf)],_0x623047=_0x360ac8[_0x357f8a(0x252)];for(const _0x5b0ee0 of _0x7b42da){$gameSystem[_0x357f8a(0x27d)](_0x5b0ee0,_0x623047);}if(SceneManager['isSceneMap']()){if(_0x357f8a(0x21b)!=='HpWdY')SceneManager[_0x357f8a(0x1ba)]['refreshQuestTrackerWindow']();else{function _0x1adeb7(){const _0x5c22e5=_0x357f8a;this[_0x5c22e5(0x2c4)]=_0x43e972,this['callUpdateHelp']();}}}}),PluginManager[_0x3f33dd(0x206)](pluginData['name'],'TrackerChangeQuest',_0x176262=>{const _0x136716=_0x3f33dd;VisuMZ[_0x136716(0x264)](_0x176262,_0x176262);const _0x51a0d8=_0x176262[_0x136716(0x2bd)];$gameSystem[_0x136716(0x35d)](_0x51a0d8);if(SceneManager[_0x136716(0x2bc)]()){if(_0x136716(0x1d3)===_0x136716(0x1d3))SceneManager[_0x136716(0x1ba)][_0x136716(0x2bf)]();else{function _0x508f7b(){const _0x1c80de=_0x136716;_0x156834=_0x1e27a0[_0x1c80de(0x1f7)]()[_0x1c80de(0x25e)]();const _0x568477=_0x32ab81['quest'](_0x5dd862);if(!_0x568477)return-0x1;_0xf0cef0[_0x1c80de(0x1b3)](_0x400bb4);const _0x1ae87a=_0x23bef2[_0x1c80de(0x195)]()['objectives']||{};if(!_0x1ae87a[_0x3838da])return 0x0;return _0x1ae87a[_0x116255][_0x1c80de(0x247)];}}}}),PluginManager['registerCommand'](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x24f),_0x45c178=>{const _0x41ac35=_0x3f33dd;if(!SceneManager[_0x41ac35(0x2bc)]())return;SceneManager[_0x41ac35(0x1ba)]['refreshQuestTrackerWindow']();}),PluginManager['registerCommand'](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x2b3),_0xce0e8c=>{const _0x237d43=_0x3f33dd;VisuMZ[_0x237d43(0x264)](_0xce0e8c,_0xce0e8c),$gameSystem[_0x237d43(0x22f)](_0xce0e8c['Show']),SceneManager[_0x237d43(0x2bc)]()&&SceneManager[_0x237d43(0x1ba)]['refreshQuestTrackerWindow']();}),PluginManager[_0x3f33dd(0x206)](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x1ef),_0x76810d=>{const _0x4d0751=_0x3f33dd;if($gameParty[_0x4d0751(0x1c2)]())return;SceneManager['push'](Scene_Quest);}),PluginManager['registerCommand'](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x286),_0x45f899=>{const _0x3fa392=_0x3f33dd;VisuMZ['ConvertParams'](_0x45f899,_0x45f899),$gameSystem[_0x3fa392(0x195)]()[_0x3fa392(0x2a5)]=_0x45f899[_0x3fa392(0x356)];}),PluginManager['registerCommand'](pluginData[_0x3f33dd(0x272)],_0x3f33dd(0x184),_0x4fc2d7=>{const _0x105973=_0x3f33dd;VisuMZ[_0x105973(0x264)](_0x4fc2d7,_0x4fc2d7),$gameSystem[_0x105973(0x195)]()[_0x105973(0x31e)]=_0x4fc2d7[_0x105973(0x2be)];}),VisuMZ['QuestSystem'][_0x3f33dd(0x17d)]=Scene_Boot[_0x3f33dd(0x202)][_0x3f33dd(0x263)],Scene_Boot['prototype'][_0x3f33dd(0x263)]=function(){const _0x27c282=_0x3f33dd;VisuMZ[_0x27c282(0x351)][_0x27c282(0x17d)][_0x27c282(0x25c)](this),this[_0x27c282(0x2ce)]();},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x341)]=[],VisuMZ['QuestSystem'][_0x3f33dd(0x1d5)]={},Scene_Boot['prototype'][_0x3f33dd(0x2ce)]=function(){const _0x1212a7=_0x3f33dd;for(const _0x50729c of VisuMZ[_0x1212a7(0x351)]['Settings'][_0x1212a7(0x332)]){if(!_0x50729c)continue;for(const _0x5a2d26 of _0x50729c['Quests']){if(_0x1212a7(0x1d2)!==_0x1212a7(0x23d)){if(!_0x5a2d26)continue;_0x5a2d26['category']=_0x50729c,_0x5a2d26[_0x1212a7(0x2fe)][_0x1212a7(0x2f7)](''),_0x5a2d26[_0x1212a7(0x179)][_0x1212a7(0x2f7)](''),_0x5a2d26[_0x1212a7(0x26e)]['unshift'](''),_0x5a2d26['Subtext']['unshift'](''),_0x5a2d26[_0x1212a7(0x244)][_0x1212a7(0x2f7)]('');const _0x31b866=_0x5a2d26['Key'][_0x1212a7(0x1f7)]()['trim']();VisuMZ['QuestSystem'][_0x1212a7(0x341)]['push'](_0x31b866),VisuMZ['QuestSystem'][_0x1212a7(0x1d5)][_0x31b866]=_0x5a2d26;}else{function _0x384424(){const _0x4a2f9c=_0x1212a7;_0x46680c[_0x4a2f9c(0x202)][_0x4a2f9c(0x357)][_0x4a2f9c(0x25c)](this,_0x172272);}}}}},ConfigManager[_0x3f33dd(0x1f6)]=!![],ConfigManager[_0x3f33dd(0x31b)]=!![],VisuMZ['QuestSystem']['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager[_0x3f33dd(0x273)]=function(){const _0x4c31ce=_0x3f33dd,_0x7a1224=VisuMZ[_0x4c31ce(0x351)][_0x4c31ce(0x306)][_0x4c31ce(0x25c)](this);return _0x7a1224[_0x4c31ce(0x1f6)]=this[_0x4c31ce(0x1f6)],_0x7a1224[_0x4c31ce(0x31b)]=this[_0x4c31ce(0x31b)],_0x7a1224;},VisuMZ[_0x3f33dd(0x351)]['ConfigManager_applyData']=ConfigManager['applyData'],ConfigManager[_0x3f33dd(0x31a)]=function(_0x25863a){const _0x2e4e0d=_0x3f33dd;VisuMZ[_0x2e4e0d(0x351)][_0x2e4e0d(0x170)][_0x2e4e0d(0x25c)](this,_0x25863a);if('questTrackerShow'in _0x25863a)this['questTrackerShow']=_0x25863a[_0x2e4e0d(0x1f6)];else{if(_0x2e4e0d(0x2a4)!==_0x2e4e0d(0x2a4)){function _0x2185b2(){const _0xe8301e=_0x2e4e0d;for(const _0x174c32 of _0x34864d){_0x174c32[_0xe8301e(0x22a)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0xd62877=_0xe77bc9(_0x4b69e0['$1']),_0x388239=_0x14d41b(_0x545870['$2']),_0x2d24b4=_0xeabdf4[_0xe8301e(0x201)](_0xd62877);_0x54dfaa[_0xe8301e(0x285)](_0xd62877,_0x2d24b4+_0x388239);}}}else this[_0x2e4e0d(0x1f6)]=!![];}if(_0x2e4e0d(0x31b)in _0x25863a)this['questTrackerPosition']=_0x25863a['questTrackerPosition'];else{if(_0x2e4e0d(0x21a)===_0x2e4e0d(0x1ff)){function _0x5d3c7f(){const _0x3a909a=_0x2e4e0d;this[_0x3a909a(0x31b)]=_0x8e5114[_0x3a909a(0x31b)];}}else this[_0x2e4e0d(0x31b)]=!![];}},ImageManager[_0x3f33dd(0x22b)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)]['CommandWindow_Known_Icon'],ImageManager['questCompletedIcon']=VisuMZ['QuestSystem']['Settings'][_0x3f33dd(0x245)][_0x3f33dd(0x1fe)],ImageManager[_0x3f33dd(0x1ee)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)]['CommandWindow_Failed_Icon'],TextManager[_0x3f33dd(0x193)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x1d6)][_0x3f33dd(0x348)],TextManager['questKnownCmd']=VisuMZ[_0x3f33dd(0x351)]['Settings'][_0x3f33dd(0x245)][_0x3f33dd(0x32f)],TextManager[_0x3f33dd(0x29d)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['General'][_0x3f33dd(0x20f)],TextManager[_0x3f33dd(0x178)]=VisuMZ['QuestSystem'][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x275)],TextManager[_0x3f33dd(0x35c)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x235)],TextManager[_0x3f33dd(0x1a9)]=VisuMZ['QuestSystem'][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x180)],TextManager[_0x3f33dd(0x265)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['General'][_0x3f33dd(0x2a1)],TextManager[_0x3f33dd(0x2f6)]=VisuMZ['QuestSystem']['Settings'][_0x3f33dd(0x245)][_0x3f33dd(0x231)],TextManager['questLogFmt']=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x2ad)],TextManager['questEmptyText']=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['General'][_0x3f33dd(0x248)],TextManager[_0x3f33dd(0x2a8)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)]['Objective_Normal_Fmt'],TextManager[_0x3f33dd(0x174)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x283)],TextManager[_0x3f33dd(0x19c)]=VisuMZ['QuestSystem']['Settings'][_0x3f33dd(0x245)][_0x3f33dd(0x1d8)],TextManager[_0x3f33dd(0x27a)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x17b)],TextManager['questRewardsClaimedFmt']=VisuMZ['QuestSystem'][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x304)],TextManager[_0x3f33dd(0x243)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x210)],TextManager[_0x3f33dd(0x1f9)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['General'][_0x3f33dd(0x2d3)],TextManager['questButtonAssistActive']=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['General'][_0x3f33dd(0x2a2)],TextManager['questButtonAssistExpand']=VisuMZ['QuestSystem'][_0x3f33dd(0x189)]['General']['ButtonAssistExpand'],TextManager[_0x3f33dd(0x34e)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x245)][_0x3f33dd(0x1c5)],TextManager[_0x3f33dd(0x2e0)]=_0x3f33dd(0x1fd),TextManager[_0x3f33dd(0x1b5)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x2e9)][_0x3f33dd(0x2a3)]||TextManager[_0x3f33dd(0x2e0)],TextManager[_0x3f33dd(0x249)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['General'][_0x3f33dd(0x177)],TextManager[_0x3f33dd(0x1f6)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['Tracker'][_0x3f33dd(0x1e5)],TextManager['questTrackerPosition']=VisuMZ['QuestSystem'][_0x3f33dd(0x189)][_0x3f33dd(0x2e9)][_0x3f33dd(0x2db)],TextManager[_0x3f33dd(0x33c)]=VisuMZ['QuestSystem'][_0x3f33dd(0x189)][_0x3f33dd(0x2e9)][_0x3f33dd(0x353)],TextManager[_0x3f33dd(0x2c2)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x2e9)][_0x3f33dd(0x2e6)],SceneManager[_0x3f33dd(0x2bc)]=function(){const _0xac95c8=_0x3f33dd;return this[_0xac95c8(0x1ba)]&&this[_0xac95c8(0x1ba)][_0xac95c8(0x316)]===Scene_Map;},VisuMZ['QuestSystem'][_0x3f33dd(0x1ca)]=Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x1c7)],Game_System['prototype'][_0x3f33dd(0x1c7)]=function(){const _0x5d4481=_0x3f33dd;VisuMZ[_0x5d4481(0x351)][_0x5d4481(0x1ca)]['call'](this),this[_0x5d4481(0x2e2)]();},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x2e2)]=function(){const _0x5d1848=_0x3f33dd,_0x458402=VisuMZ['QuestSystem'][_0x5d1848(0x189)][_0x5d1848(0x245)],_0x1b77f9=VisuMZ[_0x5d1848(0x351)][_0x5d1848(0x189)][_0x5d1848(0x1d6)];this['_quests']={'shown':_0x1b77f9[_0x5d1848(0x35e)],'enabled':_0x1b77f9['EnableMainMenu'],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0x458402[_0x5d1848(0x1e4)]['toUpperCase']()[_0x5d1848(0x25e)](),'showTracker':!![]};for(const _0x561aa9 of _0x458402[_0x5d1848(0x241)]){this[_0x5d1848(0x16f)](_0x561aa9,_0x5d1848(0x2dc));}for(const _0x1d9116 of _0x458402[_0x5d1848(0x2c7)]){this[_0x5d1848(0x16f)](_0x1d9116,_0x5d1848(0x269));}for(const _0x5d4bc3 of _0x458402[_0x5d1848(0x347)]){this['setQuestStatus'](_0x5d4bc3,_0x5d1848(0x1fb));}},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x17a)]=function(_0x2ebc97){const _0x3d5c2b=_0x3f33dd;return _0x2ebc97=_0x2ebc97[_0x3d5c2b(0x1f7)]()[_0x3d5c2b(0x25e)](),VisuMZ[_0x3d5c2b(0x351)]['QuestData'][_0x2ebc97];},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x195)]=function(){const _0x1b98c8=_0x3f33dd;if(this[_0x1b98c8(0x2fa)]===undefined)this[_0x1b98c8(0x2e2)]();return this[_0x1b98c8(0x2fa)];},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x234)]=function(){const _0x63d4b1=_0x3f33dd;return this[_0x63d4b1(0x195)]()['shown'];},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x256)]=function(){const _0x247e82=_0x3f33dd;return this['questData']()[_0x247e82(0x2a5)];},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x16f)]=function(_0x3d9d83,_0x5c6640){const _0x3f8e3b=_0x3f33dd;_0x3d9d83=_0x3d9d83[_0x3f8e3b(0x1f7)]()[_0x3f8e3b(0x25e)]();if(!VisuMZ[_0x3f8e3b(0x351)][_0x3f8e3b(0x1d5)][_0x3d9d83])return;const _0x44df33=this['questData']();_0x44df33[_0x3f8e3b(0x2dc)]=_0x44df33[_0x3f8e3b(0x2dc)]||[],_0x44df33[_0x3f8e3b(0x269)]=_0x44df33[_0x3f8e3b(0x269)]||[],_0x44df33[_0x3f8e3b(0x1fb)]=_0x44df33[_0x3f8e3b(0x1fb)]||[],_0x44df33[_0x3f8e3b(0x2dc)][_0x3f8e3b(0x276)](_0x3d9d83),_0x44df33[_0x3f8e3b(0x269)]['remove'](_0x3d9d83),_0x44df33[_0x3f8e3b(0x1fb)][_0x3f8e3b(0x276)](_0x3d9d83);if(_0x5c6640!==_0x3f8e3b(0x276))_0x44df33[_0x5c6640][_0x3f8e3b(0x2c3)](_0x3d9d83);if(_0x3d9d83===_0x44df33[_0x3f8e3b(0x1b6)][_0x3f8e3b(0x1f7)]()[_0x3f8e3b(0x25e)]()){if(_0x3f8e3b(0x308)!==_0x3f8e3b(0x1ce)){if(_0x5c6640!=='known'){if('HiXMr'!==_0x3f8e3b(0x323)){function _0xca7d5f(){const _0x3b1dc7=_0x3f8e3b,_0xb8e482=this['commandWindowRect'](),_0x4e340e=new _0x514836(_0xb8e482);_0x4e340e[_0x3b1dc7(0x228)](_0x3b1dc7(0x2dc),this['onCommandOk'][_0x3b1dc7(0x2f1)](this)),_0x4e340e[_0x3b1dc7(0x228)](_0x3b1dc7(0x269),this[_0x3b1dc7(0x185)][_0x3b1dc7(0x2f1)](this)),_0x4e340e['setHandler'](_0x3b1dc7(0x1fb),this[_0x3b1dc7(0x185)][_0x3b1dc7(0x2f1)](this)),_0x4e340e[_0x3b1dc7(0x228)](_0x3b1dc7(0x251),this[_0x3b1dc7(0x36a)][_0x3b1dc7(0x2f1)](this)),this['addWindow'](_0x4e340e),this[_0x3b1dc7(0x293)]=_0x4e340e,_0x4e340e[_0x3b1dc7(0x334)](_0x6067eb[_0x3b1dc7(0x351)][_0x3b1dc7(0x189)][_0x3b1dc7(0x289)][_0x3b1dc7(0x23c)]);}}else this['setTrackedQuest']('');}}else{function _0x2d673e(){const _0x286bff=_0x3f8e3b,_0x30b2bd=this[_0x286bff(0x195)]();return _0x30b2bd[_0x286bff(0x269)]=_0x30b2bd[_0x286bff(0x269)]||[],_0xfa8dcd=_0x203a1d['toUpperCase']()[_0x286bff(0x25e)](),_0x30b2bd[_0x286bff(0x269)][_0x286bff(0x1b8)](_0x26d8f1);}}}},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x1f2)]=function(){const _0x2b2f50=_0x3f33dd,_0xfba621=this[_0x2b2f50(0x195)]();return _0xfba621['known']=_0xfba621['known']||[],_0xfba621[_0x2b2f50(0x2dc)][_0x2b2f50(0x1bb)](_0x51feb1=>this[_0x2b2f50(0x17a)](_0x51feb1))[_0x2b2f50(0x276)](null);},Game_System[_0x3f33dd(0x202)]['isQuestKnown']=function(_0x1b3fe3){const _0x4297bd=_0x3f33dd,_0x53880b=this[_0x4297bd(0x195)]();return _0x53880b['known']=_0x53880b[_0x4297bd(0x2dc)]||[],_0x1b3fe3=_0x1b3fe3['toUpperCase']()[_0x4297bd(0x25e)](),_0x53880b['known'][_0x4297bd(0x1b8)](_0x1b3fe3);},Game_System['prototype'][_0x3f33dd(0x34b)]=function(){const _0x42697a=_0x3f33dd,_0x325e2b=this['questData']();return _0x325e2b[_0x42697a(0x269)]=_0x325e2b[_0x42697a(0x269)]||[],_0x325e2b[_0x42697a(0x269)][_0x42697a(0x1bb)](_0x1f9439=>this[_0x42697a(0x17a)](_0x1f9439))[_0x42697a(0x276)](null);},Game_System['prototype'][_0x3f33dd(0x261)]=function(_0x2b13a8){const _0x3f9d71=_0x3f33dd,_0x338ff2=this[_0x3f9d71(0x195)]();return _0x338ff2[_0x3f9d71(0x269)]=_0x338ff2[_0x3f9d71(0x269)]||[],_0x2b13a8=_0x2b13a8[_0x3f9d71(0x1f7)]()['trim'](),_0x338ff2['completed'][_0x3f9d71(0x1b8)](_0x2b13a8);},Game_System[_0x3f33dd(0x202)]['questsFailed']=function(){const _0x3f5925=_0x3f33dd,_0x163f9f=this['questData']();return _0x163f9f[_0x3f5925(0x1fb)]=_0x163f9f[_0x3f5925(0x1fb)]||[],_0x163f9f[_0x3f5925(0x1fb)][_0x3f5925(0x1bb)](_0x117af4=>this[_0x3f5925(0x17a)](_0x117af4))[_0x3f5925(0x276)](null);},Game_System['prototype'][_0x3f33dd(0x2af)]=function(_0xc2ceb){const _0x4f748e=_0x3f33dd,_0x5e8043=this[_0x4f748e(0x195)]();return _0x5e8043['failed']=_0x5e8043[_0x4f748e(0x1fb)]||[],_0xc2ceb=_0xc2ceb[_0x4f748e(0x1f7)]()[_0x4f748e(0x25e)](),_0x5e8043['failed'][_0x4f748e(0x1b8)](_0xc2ceb);},Game_System['prototype'][_0x3f33dd(0x200)]=function(_0x235b50){const _0x361aa4=_0x3f33dd;_0x235b50=_0x235b50[_0x361aa4(0x1f7)]()[_0x361aa4(0x25e)]();const _0x399868=this[_0x361aa4(0x17a)](_0x235b50);if(!_0x399868)return'';const _0x546f75=this[_0x361aa4(0x195)]()[_0x361aa4(0x203)];_0x546f75[_0x235b50]=_0x546f75[_0x235b50]||0x1;const _0x31e34b=_0x546f75[_0x235b50];return _0x399868[_0x361aa4(0x2fe)][_0x31e34b]||'';},Game_System[_0x3f33dd(0x202)]['setQuestDescription']=function(_0x1635af,_0x36d9b2){const _0x294c55=_0x3f33dd;_0x1635af=_0x1635af['toUpperCase']()[_0x294c55(0x25e)]();const _0x29537b=this[_0x294c55(0x17a)](_0x1635af);if(!_0x29537b)return'';const _0x3fc26e=this[_0x294c55(0x195)]()[_0x294c55(0x203)];_0x3fc26e[_0x1635af]=_0x36d9b2;},Game_System[_0x3f33dd(0x202)]['questObjectives']=function(_0x5a5f3b){const _0x494f45=_0x3f33dd;_0x5a5f3b=_0x5a5f3b[_0x494f45(0x1f7)]()[_0x494f45(0x25e)]();const _0x5360e7=this['quest'](_0x5a5f3b);if(!_0x5360e7)return'';const _0x53e4b2=this['questData']();_0x53e4b2[_0x494f45(0x1af)]=_0x53e4b2[_0x494f45(0x1af)]||{};if(!_0x53e4b2[_0x494f45(0x1af)][_0x5a5f3b]){if(_0x494f45(0x1f5)!==_0x494f45(0x1f5)){function _0x4255fc(){const _0x449e2b=_0x494f45,_0x46a156=this[_0x449e2b(0x2e3)];_0x46a156['drawText'](_0xc5cd8d,0x0,_0x5582bc['y'],_0x46a156[_0x449e2b(0x2dd)],'center');}}else _0x53e4b2['objectives'][_0x5a5f3b]=JsonEx[_0x494f45(0x186)](_0x5360e7[_0x494f45(0x287)]);}return _0x53e4b2[_0x494f45(0x1af)][_0x5a5f3b][_0x494f45(0x21d)]((_0x236b5e,_0x57bad9)=>_0x236b5e-_0x57bad9);},Game_System['prototype'][_0x3f33dd(0x292)]=function(_0x5dc091,_0x14b62,_0x304840){const _0x3e44df=_0x3f33dd;_0x5dc091=_0x5dc091[_0x3e44df(0x1f7)]()[_0x3e44df(0x25e)]();const _0x44d10c=this[_0x3e44df(0x17a)](_0x5dc091);if(!_0x44d10c)return'';const _0x487a6c=this['questData']();_0x487a6c[_0x3e44df(0x1af)]=_0x487a6c[_0x3e44df(0x1af)]||{};!_0x487a6c[_0x3e44df(0x1af)][_0x5dc091]&&(_0x487a6c[_0x3e44df(0x1af)][_0x5dc091]=JsonEx[_0x3e44df(0x186)](_0x44d10c[_0x3e44df(0x287)]));_0x487a6c[_0x3e44df(0x1af)][_0x5dc091]=_0x487a6c[_0x3e44df(0x1af)][_0x5dc091]||[],_0x487a6c[_0x3e44df(0x2bb)][_0x5dc091]=_0x487a6c[_0x3e44df(0x2bb)][_0x5dc091]||[],_0x487a6c[_0x3e44df(0x242)][_0x5dc091]=_0x487a6c[_0x3e44df(0x242)][_0x5dc091]||[];for(const _0x5b988b of _0x14b62){_0x487a6c[_0x3e44df(0x1af)][_0x5dc091][_0x3e44df(0x276)](_0x5b988b),_0x487a6c['objectivesCompleted'][_0x5dc091]['remove'](_0x5b988b),_0x487a6c[_0x3e44df(0x242)][_0x5dc091][_0x3e44df(0x276)](_0x5b988b);switch(_0x304840){case _0x3e44df(0x320):case _0x3e44df(0x2dc):_0x487a6c[_0x3e44df(0x1af)][_0x5dc091]['push'](_0x5b988b);break;case'complete':case _0x3e44df(0x269):_0x487a6c['objectivesCompleted'][_0x5dc091][_0x3e44df(0x2c3)](_0x5b988b);break;case'fail':case _0x3e44df(0x1fb):_0x487a6c['objectivesFailed'][_0x5dc091][_0x3e44df(0x2c3)](_0x5b988b);break;case _0x3e44df(0x276):case'removed':break;}}},Game_System['prototype'][_0x3f33dd(0x28c)]=function(_0x35cb8c){const _0x42396a=_0x3f33dd;_0x35cb8c=_0x35cb8c[_0x42396a(0x1f7)]()[_0x42396a(0x25e)]();const _0x12702b=this['quest'](_0x35cb8c);if(!_0x12702b)return'';const _0x4bc2d3=this[_0x42396a(0x195)]();return _0x4bc2d3['objectivesCompleted']=_0x4bc2d3[_0x42396a(0x2bb)]||{},_0x4bc2d3[_0x42396a(0x2bb)][_0x35cb8c]=_0x4bc2d3[_0x42396a(0x2bb)][_0x35cb8c]||[],_0x4bc2d3[_0x42396a(0x2bb)][_0x35cb8c]['sort']((_0x170ef6,_0x224cdf)=>_0x170ef6-_0x224cdf);},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x2cf)]=function(_0x37f09c){const _0x2c4606=_0x3f33dd;_0x37f09c=_0x37f09c['toUpperCase']()['trim']();const _0x3a660b=this['quest'](_0x37f09c);if(!_0x3a660b)return'';const _0x477ab6=this[_0x2c4606(0x195)]();return _0x477ab6[_0x2c4606(0x242)]=_0x477ab6['objectivesFailed']||{},_0x477ab6[_0x2c4606(0x242)][_0x37f09c]=_0x477ab6['objectivesFailed'][_0x37f09c]||[],_0x477ab6[_0x2c4606(0x242)][_0x37f09c]['sort']((_0x438f7a,_0x231baa)=>_0x438f7a-_0x231baa);},Game_System['prototype'][_0x3f33dd(0x220)]=function(_0x1dc867){const _0x461108=_0x3f33dd;_0x1dc867=_0x1dc867[_0x461108(0x1f7)]()[_0x461108(0x25e)]();const _0x216e72=this[_0x461108(0x17a)](_0x1dc867);if(!_0x216e72)return'';const _0x2532a6=this[_0x461108(0x195)]();_0x2532a6[_0x461108(0x2b9)]=_0x2532a6[_0x461108(0x2b9)]||{};if(!_0x2532a6[_0x461108(0x2b9)][_0x1dc867]){if('EIHsF'!=='EIHsF'){function _0x1053a0(){const _0x4cef89=_0x461108;for(const _0x886ef8 of _0x30be55){_0x886ef8[_0x4cef89(0x22a)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x50bf33=_0x275e8d(_0x4701d8['$1']),_0x10ca94=_0x8644f4(_0x2b37dd['$2'])*_0x16421b,_0xb84f1e=_0x926e9f[_0x4cef89(0x201)](_0x50bf33);_0x5971e2[_0x4cef89(0x285)](_0x50bf33,_0xb84f1e+_0x10ca94);}}}else _0x2532a6[_0x461108(0x2b9)][_0x1dc867]=JsonEx['makeDeepCopy'](_0x216e72['VisibleRewards']);}return _0x2532a6[_0x461108(0x2b9)][_0x1dc867][_0x461108(0x21d)]((_0x93e185,_0xf02f99)=>_0x93e185-_0xf02f99);},Game_System[_0x3f33dd(0x202)]['setQuestRewards']=function(_0x242269,_0x3cd48c,_0x49efee){const _0x24f5ac=_0x3f33dd;_0x242269=_0x242269['toUpperCase']()[_0x24f5ac(0x25e)]();const _0x26fe1d=this[_0x24f5ac(0x17a)](_0x242269);if(!_0x26fe1d)return'';const _0x327f89=this[_0x24f5ac(0x195)]();_0x327f89[_0x24f5ac(0x2b9)]=_0x327f89[_0x24f5ac(0x2b9)]||{};!_0x327f89[_0x24f5ac(0x2b9)][_0x242269]&&(_0x327f89[_0x24f5ac(0x2b9)][_0x242269]=JsonEx[_0x24f5ac(0x186)](_0x26fe1d[_0x24f5ac(0x1d4)]));_0x327f89[_0x24f5ac(0x2b9)][_0x242269]=_0x327f89['rewards'][_0x242269]||[],_0x327f89[_0x24f5ac(0x258)][_0x242269]=_0x327f89['rewardsClaimed'][_0x242269]||[],_0x327f89[_0x24f5ac(0x266)][_0x242269]=_0x327f89[_0x24f5ac(0x266)][_0x242269]||[];for(const _0x4418fb of _0x3cd48c){_0x327f89[_0x24f5ac(0x2b9)][_0x242269][_0x24f5ac(0x276)](_0x4418fb),_0x327f89[_0x24f5ac(0x258)][_0x242269][_0x24f5ac(0x276)](_0x4418fb),_0x327f89[_0x24f5ac(0x266)][_0x242269][_0x24f5ac(0x276)](_0x4418fb);switch(_0x49efee){case'show':case'known':_0x327f89['rewards'][_0x242269]['push'](_0x4418fb);break;case _0x24f5ac(0x343):case _0x24f5ac(0x33f):_0x327f89[_0x24f5ac(0x258)][_0x242269][_0x24f5ac(0x2c3)](_0x4418fb);break;case'deny':case _0x24f5ac(0x2b4):_0x327f89[_0x24f5ac(0x266)][_0x242269][_0x24f5ac(0x2c3)](_0x4418fb);break;case'remove':case _0x24f5ac(0x16d):break;}}},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x270)]=function(_0x4fbe7c){const _0x532333=_0x3f33dd;_0x4fbe7c=_0x4fbe7c['toUpperCase']()['trim']();const _0x59f6c5=this[_0x532333(0x17a)](_0x4fbe7c);if(!_0x59f6c5)return'';const _0xf303a5=this['questData']();return _0xf303a5[_0x532333(0x258)]=_0xf303a5[_0x532333(0x258)]||{},_0xf303a5[_0x532333(0x258)][_0x4fbe7c]=_0xf303a5[_0x532333(0x258)][_0x4fbe7c]||[],_0xf303a5[_0x532333(0x258)][_0x4fbe7c]['sort']((_0x5eef87,_0x1e7188)=>_0x5eef87-_0x1e7188);},Game_System['prototype'][_0x3f33dd(0x197)]=function(_0x5ef07f){const _0x3a14e6=_0x3f33dd;_0x5ef07f=_0x5ef07f[_0x3a14e6(0x1f7)]()[_0x3a14e6(0x25e)]();const _0x471bc7=this[_0x3a14e6(0x17a)](_0x5ef07f);if(!_0x471bc7)return'';const _0x37178f=this[_0x3a14e6(0x195)]();return _0x37178f[_0x3a14e6(0x266)]=_0x37178f[_0x3a14e6(0x266)]||{},_0x37178f[_0x3a14e6(0x266)][_0x5ef07f]=_0x37178f[_0x3a14e6(0x266)][_0x5ef07f]||[],_0x37178f['rewardsDenied'][_0x5ef07f][_0x3a14e6(0x21d)]((_0x17bd68,_0x3afdb1)=>_0x17bd68-_0x3afdb1);},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x172)]=function(_0x3a2d5f){const _0x123198=_0x3f33dd;_0x3a2d5f=_0x3a2d5f[_0x123198(0x1f7)]()['trim']();const _0x33e3a8=this['quest'](_0x3a2d5f);if(!_0x33e3a8)return'';const _0x23d2b4=this[_0x123198(0x195)]()['subtext'];_0x23d2b4[_0x3a2d5f]=_0x23d2b4[_0x3a2d5f]||0x1;const _0x1645fe=_0x23d2b4[_0x3a2d5f];return _0x33e3a8[_0x123198(0x294)][_0x1645fe]||'';},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x27d)]=function(_0x9b3e0d,_0x57d49a){const _0x2fae24=_0x3f33dd;_0x9b3e0d=_0x9b3e0d[_0x2fae24(0x1f7)]()[_0x2fae24(0x25e)]();const _0x4f0b87=this['quest'](_0x9b3e0d);if(!_0x4f0b87)return'';const _0x4bc182=this['questData']()[_0x2fae24(0x1cc)];_0x4bc182[_0x9b3e0d]=_0x57d49a;},Game_System[_0x3f33dd(0x202)]['questQuote']=function(_0x25fd89){const _0x5994b1=_0x3f33dd;_0x25fd89=_0x25fd89[_0x5994b1(0x1f7)]()[_0x5994b1(0x25e)]();const _0x505163=this[_0x5994b1(0x17a)](_0x25fd89);if(!_0x505163)return'';const _0x44f3ea=this[_0x5994b1(0x195)]()[_0x5994b1(0x1c6)];_0x44f3ea[_0x25fd89]=_0x44f3ea[_0x25fd89]||0x1;const _0x5ce531=_0x44f3ea[_0x25fd89];return _0x505163[_0x5994b1(0x244)][_0x5ce531]||'';},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x17f)]=function(_0x5e4865,_0x103f68){const _0x48fe5d=_0x3f33dd;_0x5e4865=_0x5e4865[_0x48fe5d(0x1f7)]()[_0x48fe5d(0x25e)]();const _0x2bd7cd=this['quest'](_0x5e4865);if(!_0x2bd7cd)return'';const _0x4d6e6b=this[_0x48fe5d(0x195)]()[_0x48fe5d(0x1c6)];_0x4d6e6b[_0x5e4865]=_0x103f68;},Game_System[_0x3f33dd(0x202)]['trackedQuest']=function(){const _0x48ffe2=_0x3f33dd,_0x70274f=this[_0x48ffe2(0x195)]();return this[_0x48ffe2(0x17a)](_0x70274f[_0x48ffe2(0x1b6)]);},Game_System['prototype'][_0x3f33dd(0x35d)]=function(_0x5d5aef,_0x2ae40b){const _0x2bd4fb=_0x3f33dd,_0x1bc15d=this[_0x2bd4fb(0x195)]();if(_0x2ae40b&&_0x1bc15d[_0x2bd4fb(0x1b6)]===_0x5d5aef)_0x5d5aef='';_0x1bc15d['tracked']=_0x5d5aef,SceneManager[_0x2bd4fb(0x2bc)]()&&SceneManager[_0x2bd4fb(0x1ba)]['setQuestForQuestTrackerWindow'](_0x5d5aef);},Game_System[_0x3f33dd(0x202)][_0x3f33dd(0x204)]=function(){const _0x31309a=_0x3f33dd,_0x40a00f=this['questData']();return _0x40a00f[_0x31309a(0x216)];},Game_System[_0x3f33dd(0x202)]['setQuestTrackerVisible']=function(_0x54c0fe){const _0x118ded=_0x3f33dd,_0x4bbe14=this[_0x118ded(0x195)]();_0x4bbe14['showTracker']=_0x54c0fe;},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x30a)]=Game_BattlerBase[_0x3f33dd(0x202)][_0x3f33dd(0x28d)],Game_BattlerBase[_0x3f33dd(0x202)][_0x3f33dd(0x28d)]=function(_0x1b8aa0){const _0x3f9459=_0x3f33dd,_0x57074a=this[_0x3f9459(0x1e8)]();VisuMZ[_0x3f9459(0x351)][_0x3f9459(0x30a)][_0x3f9459(0x25c)](this,_0x1b8aa0),this['questJournalSystemAddDeath'](_0x1b8aa0,_0x57074a);},Game_BattlerBase[_0x3f33dd(0x202)]['questJournalSystemAddDeath']=function(_0x5e82e8,_0xbba2e6){const _0x451293=_0x3f33dd;if(_0x5e82e8!==this[_0x451293(0x2c1)]())return;if(!this[_0x451293(0x20c)]())return;if(!_0xbba2e6)return;if(!this[_0x451293(0x361)]())return;if(this[_0x451293(0x1c0)])return;this['_hasDiedBefore']=!![];const _0x27622f=this['enemy']()['note'],_0x61fb44=_0x27622f['match'](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);if(_0x61fb44)for(const _0x3da550 of _0x61fb44){if(_0x451293(0x1e6)!==_0x451293(0x1e6)){function _0x31bf58(){const _0x106a96=_0x451293;this[_0x106a96(0x26a)]();}}else{_0x3da550[_0x451293(0x22a)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0x561884=Number(RegExp['$1']),_0x450076=Number(RegExp['$2']),_0x59f0bb=$gameVariables['value'](_0x561884);$gameVariables['setValue'](_0x561884,_0x59f0bb+_0x450076);}}},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x25a)]=Game_Battler[_0x3f33dd(0x202)][_0x3f33dd(0x2aa)],Game_Battler[_0x3f33dd(0x202)]['useItem']=function(_0x314ea9){const _0x4d3aeb=_0x3f33dd;VisuMZ[_0x4d3aeb(0x351)][_0x4d3aeb(0x25a)][_0x4d3aeb(0x25c)](this,_0x314ea9),this[_0x4d3aeb(0x18a)](_0x314ea9);},Game_Battler['prototype'][_0x3f33dd(0x18a)]=function(_0x3f7a7b){const _0x8dcffc=_0x3f33dd;if(!_0x3f7a7b)return;if(!this[_0x8dcffc(0x358)]())return;const _0x304cb3=_0x3f7a7b[_0x8dcffc(0x342)],_0x23fd85=_0x304cb3[_0x8dcffc(0x22a)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);if(_0x23fd85){if(_0x8dcffc(0x313)!=='BdYtE')for(const _0x180abd of _0x23fd85){if(_0x8dcffc(0x2eb)===_0x8dcffc(0x24b)){function _0x3addd2(){const _0x229a30=_0x8dcffc,_0x21afa9=this[_0x229a30(0x2c4)][_0x229a30(0x171)](),_0x4cd3cd=_0x21afa9['Key'][_0x229a30(0x1f7)]()[_0x229a30(0x25e)]();_0x465ec6[_0x229a30(0x35d)](_0x4cd3cd,!![]),this['_listWindow'][_0x229a30(0x223)](),this[_0x229a30(0x2c4)][_0x229a30(0x2ea)]();}}else{_0x180abd['match'](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0x4be2f5=Number(RegExp['$1']),_0x2d759b=Number(RegExp['$2']),_0x1e5a29=$gameVariables[_0x8dcffc(0x201)](_0x4be2f5);$gameVariables[_0x8dcffc(0x285)](_0x4be2f5,_0x1e5a29+_0x2d759b);}}else{function _0x552345(){const _0x213b88=_0x8dcffc;return _0x33e29f[_0x213b88(0x195)]()[_0x213b88(0x1fb)][_0x213b88(0x247)];}}}},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x344)]=Game_Actor[_0x3f33dd(0x202)]['tradeItemWithParty'],Game_Actor[_0x3f33dd(0x202)][_0x3f33dd(0x230)]=function(_0xda4c08,_0x42e87d){const _0x1be705=_0x3f33dd;$gameTemp[_0x1be705(0x355)]=!![];const _0x3c4505=VisuMZ[_0x1be705(0x351)]['Game_Actor_tradeItemWithParty']['call'](this,_0xda4c08,_0x42e87d);return $gameTemp['_tradeItemWithParty']=undefined,_0x3c4505;},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x31d)]=Game_Party[_0x3f33dd(0x202)][_0x3f33dd(0x32c)],Game_Party[_0x3f33dd(0x202)][_0x3f33dd(0x32c)]=function(_0x1e56d8,_0xe70eb9,_0x287588){const _0x4b1909=_0x3f33dd;VisuMZ[_0x4b1909(0x351)][_0x4b1909(0x31d)][_0x4b1909(0x25c)](this,_0x1e56d8,_0xe70eb9,_0x287588),this[_0x4b1909(0x33a)](_0x1e56d8,_0xe70eb9);},Game_Party['prototype'][_0x3f33dd(0x33a)]=function(_0x56fab4,_0x558971){const _0x4e12ec=_0x3f33dd;if(!_0x56fab4)return;if($gameTemp[_0x4e12ec(0x355)])return;const _0x5beea3=_0x56fab4[_0x4e12ec(0x342)];if(_0x558971>0x0){const _0x3bbf4a=_0x5beea3['match'](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);if(_0x3bbf4a)for(const _0x3c6310 of _0x3bbf4a){_0x3c6310['match'](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x24ea22=Number(RegExp['$1']),_0x26be2c=Number(RegExp['$2'])*_0x558971,_0x1822f9=$gameVariables[_0x4e12ec(0x201)](_0x24ea22);$gameVariables['setValue'](_0x24ea22,_0x1822f9+_0x26be2c);}}else{if(_0x558971<0x0){if(_0x4e12ec(0x17c)===_0x4e12ec(0x2cd)){function _0x111a73(){const _0x3c1aee=_0x4e12ec;_0x5793c9[_0x3c1aee(0x355)]=!![];const _0x11ce59=_0x21c673[_0x3c1aee(0x351)][_0x3c1aee(0x344)][_0x3c1aee(0x25c)](this,_0x326700,_0x390c3e);return _0x1f8a40[_0x3c1aee(0x355)]=_0x545ce1,_0x11ce59;}}else{const _0x2f79a=_0x5beea3['match'](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);if(_0x2f79a)for(const _0x1c365e of _0x2f79a){if(_0x4e12ec(0x34c)!==_0x4e12ec(0x34c)){function _0x518b99(){const _0xf3de24=_0x4e12ec;_0x112bad=_0x145e4e[_0xf3de24(0x31c)](_0x128fd4,_0x86e8a6);}}else{_0x1c365e[_0x4e12ec(0x22a)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x2b81b3=Number(RegExp['$1']),_0x1b657b=Number(RegExp['$2'])*_0x558971,_0x3f6e08=$gameVariables['value'](_0x2b81b3);$gameVariables['setValue'](_0x2b81b3,_0x3f6e08+_0x1b657b);}}}}}const _0x497957=_0x5beea3[_0x4e12ec(0x22a)](/<TRACK WITH VARIABLE (\d+)>/gi);if(_0x497957){if(_0x4e12ec(0x2d6)!==_0x4e12ec(0x32a))for(const _0x594859 of _0x497957){_0x594859[_0x4e12ec(0x22a)](/<TRACK WITH VARIABLE (\d+)>/i);const _0x112e6e=Number(RegExp['$1']),_0x4988ab=$gameParty[_0x4e12ec(0x1aa)](_0x56fab4);$gameVariables[_0x4e12ec(0x285)](_0x112e6e,_0x4988ab);}else{function _0x5ce38f(){const _0x42e4f5=_0x4e12ec;return _0x5c6db3[_0x42e4f5(0x202)][_0x42e4f5(0x367)]['call'](this);}}}},VisuMZ[_0x3f33dd(0x351)]['Game_Map_requestRefresh']=Game_Map['prototype'][_0x3f33dd(0x27c)],Game_Map[_0x3f33dd(0x202)][_0x3f33dd(0x27c)]=function(){const _0x3d5865=_0x3f33dd;VisuMZ[_0x3d5865(0x351)][_0x3d5865(0x16b)]['call'](this);if(SceneManager[_0x3d5865(0x2bc)]()&&!this[_0x3d5865(0x19b)]){if('IAVPy'!==_0x3d5865(0x2a0))this['_isRefreshingQuestTrackerWindow']=!![];else{function _0x42fa0a(){return _0x17770a;}}}},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x198)]=Game_Map['prototype'][_0x3f33dd(0x223)],Game_Map[_0x3f33dd(0x202)][_0x3f33dd(0x223)]=function(){const _0x5aa4f5=_0x3f33dd;VisuMZ['QuestSystem'][_0x5aa4f5(0x198)][_0x5aa4f5(0x25c)](this),SceneManager[_0x5aa4f5(0x2bc)]()&&this[_0x5aa4f5(0x19b)]&&(SceneManager['_scene'][_0x5aa4f5(0x2bf)](),this[_0x5aa4f5(0x19b)]=![]);},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x1ae)]=Scene_Map[_0x3f33dd(0x202)][_0x3f33dd(0x217)],Scene_Map[_0x3f33dd(0x202)][_0x3f33dd(0x217)]=function(){const _0x2061d9=_0x3f33dd;VisuMZ['QuestSystem']['Scene_Map_createSpriteset'][_0x2061d9(0x25c)](this),this[_0x2061d9(0x25d)]();},Scene_Map['prototype'][_0x3f33dd(0x25d)]=function(){const _0x26ed42=_0x3f33dd;if(!SceneManager[_0x26ed42(0x2bc)]())return;const _0xe6e6f7=this[_0x26ed42(0x1e9)](),_0x11cd85=new Window_QuestTracker(_0xe6e6f7);this[_0x26ed42(0x362)](_0x11cd85),this[_0x26ed42(0x1b4)]=_0x11cd85;},Scene_Map['prototype']['questTrackerOnRight']=function(){const _0x4a69e6=_0x3f33dd;return ConfigManager[_0x4a69e6(0x31b)];},Scene_Map[_0x3f33dd(0x202)][_0x3f33dd(0x1e9)]=function(){const _0x16c21d=_0x3f33dd;return VisuMZ['QuestSystem'][_0x16c21d(0x189)][_0x16c21d(0x289)][_0x16c21d(0x359)][_0x16c21d(0x25c)](this);},Scene_Map[_0x3f33dd(0x202)][_0x3f33dd(0x2bf)]=function(){const _0x36eda9=_0x3f33dd;if(!this[_0x36eda9(0x1b4)])return;this[_0x36eda9(0x1b4)]['refresh']();},Scene_Map[_0x3f33dd(0x202)][_0x3f33dd(0x2b0)]=function(_0xdc6e92){const _0x271602=_0x3f33dd;if(!this['_questTrackerWindow'])return;_0xdc6e92=_0xdc6e92[_0x271602(0x1f7)]()[_0x271602(0x25e)]();const _0xd26a83=$gameSystem['quest'](_0xdc6e92);this[_0x271602(0x1b4)]['setQuest'](_0xd26a83);},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x33e)]=Scene_Menu[_0x3f33dd(0x202)]['createCommandWindow'],Scene_Menu[_0x3f33dd(0x202)][_0x3f33dd(0x2ed)]=function(){const _0x41a510=_0x3f33dd;VisuMZ[_0x41a510(0x351)][_0x41a510(0x33e)]['call'](this),this['_commandWindow'][_0x41a510(0x228)](_0x41a510(0x17a),this['commandQuest'][_0x41a510(0x2f1)](this));},Scene_Menu[_0x3f33dd(0x202)][_0x3f33dd(0x339)]=function(){const _0x4df32f=_0x3f33dd;SceneManager[_0x4df32f(0x2c3)](Scene_Quest);},VisuMZ[_0x3f33dd(0x351)]['Scene_Options_maxCommands']=Scene_Options[_0x3f33dd(0x202)]['maxCommands'],Scene_Options['prototype'][_0x3f33dd(0x328)]=function(){const _0x1360da=_0x3f33dd;let _0x267c4b=VisuMZ[_0x1360da(0x351)][_0x1360da(0x23e)][_0x1360da(0x25c)](this);if(VisuMZ[_0x1360da(0x351)]['Settings']['Tracker'][_0x1360da(0x1de)]){if(VisuMZ[_0x1360da(0x351)][_0x1360da(0x189)][_0x1360da(0x2e9)][_0x1360da(0x299)])_0x267c4b++;if(VisuMZ[_0x1360da(0x351)][_0x1360da(0x189)]['Tracker'][_0x1360da(0x2d8)])_0x267c4b++;}return _0x267c4b;};function Scene_Quest(){const _0x4bde38=_0x3f33dd;this[_0x4bde38(0x1c7)](...arguments);}Scene_Quest['prototype']=Object['create'](Scene_MenuBase[_0x3f33dd(0x202)]),Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x316)]=Scene_Quest,Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x1c7)]=function(){const _0x2952aa=_0x3f33dd;Scene_MenuBase['prototype'][_0x2952aa(0x1c7)]['call'](this);},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x24a)]=function(){return 0x0;},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x367)]=function(){const _0x3d9d6a=_0x3f33dd;if(ConfigManager[_0x3d9d6a(0x311)]&&ConfigManager[_0x3d9d6a(0x30c)]!==undefined){if('mwuyS'===_0x3d9d6a(0x305)){function _0x441a94(){const _0x42d1f1=_0x3d9d6a;_0x5132b5=_0x42d1f1(0x1d1)[_0x42d1f1(0x2ef)](_0x43be4d,_0x1016fc);}}else return ConfigManager[_0x3d9d6a(0x30c)];}else return ConfigManager[_0x3d9d6a(0x311)]===![]?![]:Scene_MenuBase[_0x3d9d6a(0x202)]['isRightInputMode'][_0x3d9d6a(0x25c)](this);},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x22e)]=function(){const _0x1cc7a6=_0x3f33dd;return(Graphics['boxWidth']-0x230)[_0x1cc7a6(0x2c5)](0xf0,Math['floor'](Graphics[_0x1cc7a6(0x2da)]/0x2));},Scene_Quest['prototype']['create']=function(){const _0x12be0c=_0x3f33dd;Scene_MenuBase[_0x12be0c(0x202)][_0x12be0c(0x19a)][_0x12be0c(0x25c)](this),this['createCommandWindow'](),this['createQuestLabelWindow'](),this['createQuestLogWindow'](),this[_0x12be0c(0x246)]();},Scene_Quest[_0x3f33dd(0x202)]['createCommandWindow']=function(){const _0x3b7dca=_0x3f33dd,_0x3bc432=this['commandWindowRect'](),_0x1f2d35=new Window_QuestCommand(_0x3bc432);_0x1f2d35[_0x3b7dca(0x228)](_0x3b7dca(0x2dc),this[_0x3b7dca(0x185)][_0x3b7dca(0x2f1)](this)),_0x1f2d35[_0x3b7dca(0x228)](_0x3b7dca(0x269),this[_0x3b7dca(0x185)][_0x3b7dca(0x2f1)](this)),_0x1f2d35[_0x3b7dca(0x228)](_0x3b7dca(0x1fb),this['onCommandOk'][_0x3b7dca(0x2f1)](this)),_0x1f2d35['setHandler']('cancel',this[_0x3b7dca(0x36a)][_0x3b7dca(0x2f1)](this)),this[_0x3b7dca(0x238)](_0x1f2d35),this[_0x3b7dca(0x293)]=_0x1f2d35,_0x1f2d35[_0x3b7dca(0x334)](VisuMZ[_0x3b7dca(0x351)][_0x3b7dca(0x189)][_0x3b7dca(0x289)][_0x3b7dca(0x23c)]);},Scene_Quest['prototype'][_0x3f33dd(0x28e)]=function(){const _0x376061=_0x3f33dd;return VisuMZ[_0x376061(0x351)][_0x376061(0x189)][_0x376061(0x289)][_0x376061(0x213)][_0x376061(0x25c)](this);},Scene_Quest['prototype']['createQuestLabelWindow']=function(){const _0x28fa4f=_0x3f33dd,_0x7da509=this[_0x28fa4f(0x181)](),_0x5d7700=new Window_Base(_0x7da509);this['addWindow'](_0x5d7700),this[_0x28fa4f(0x1a0)]=_0x5d7700,_0x5d7700['setBackgroundType'](VisuMZ[_0x28fa4f(0x351)][_0x28fa4f(0x189)]['Window'][_0x28fa4f(0x274)]);},Scene_Quest['prototype'][_0x3f33dd(0x181)]=function(){const _0x58e222=_0x3f33dd;return VisuMZ[_0x58e222(0x351)][_0x58e222(0x189)][_0x58e222(0x289)][_0x58e222(0x1cf)][_0x58e222(0x25c)](this);},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x257)]=function(){const _0x31d6b5=_0x3f33dd,_0x5135be=this[_0x31d6b5(0x338)](),_0x51f6fa=new Window_QuestLog(_0x5135be);this['addWindow'](_0x51f6fa),this['_logWindow']=_0x51f6fa,_0x51f6fa[_0x31d6b5(0x334)](VisuMZ[_0x31d6b5(0x351)][_0x31d6b5(0x189)][_0x31d6b5(0x289)][_0x31d6b5(0x22d)]);},Scene_Quest['prototype'][_0x3f33dd(0x338)]=function(){const _0x374ba0=_0x3f33dd;return VisuMZ[_0x374ba0(0x351)][_0x374ba0(0x189)][_0x374ba0(0x289)][_0x374ba0(0x337)][_0x374ba0(0x25c)](this);},Scene_Quest['prototype'][_0x3f33dd(0x246)]=function(){const _0x2350f3=_0x3f33dd,_0x18a0a8=this[_0x2350f3(0x1be)](),_0x1c8be6=new Window_QuestList(_0x18a0a8);_0x1c8be6[_0x2350f3(0x228)](_0x2350f3(0x183),this[_0x2350f3(0x310)]['bind'](this)),_0x1c8be6['setHandler'](_0x2350f3(0x17a),this[_0x2350f3(0x309)]['bind'](this)),_0x1c8be6[_0x2350f3(0x228)]('cancel',this['onListCancel'][_0x2350f3(0x2f1)](this)),this['addWindow'](_0x1c8be6),this[_0x2350f3(0x2c4)]=_0x1c8be6,_0x1c8be6[_0x2350f3(0x334)](VisuMZ[_0x2350f3(0x351)][_0x2350f3(0x189)][_0x2350f3(0x289)][_0x2350f3(0x302)]),this['_commandWindow'][_0x2350f3(0x2f0)](this['_listWindow']),this[_0x2350f3(0x2c4)]['setLabelWindow'](this[_0x2350f3(0x1a0)]),this['_listWindow'][_0x2350f3(0x350)](this['_logWindow']);},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x1be)]=function(){const _0x1f9513=_0x3f33dd;return VisuMZ['QuestSystem'][_0x1f9513(0x189)][_0x1f9513(0x289)][_0x1f9513(0x2b5)][_0x1f9513(0x25c)](this);},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x185)]=function(){const _0x43ec57=_0x3f33dd;this[_0x43ec57(0x2c4)][_0x43ec57(0x2ea)](),this[_0x43ec57(0x2c4)][_0x43ec57(0x1a5)](0x0);},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x310)]=function(){const _0x6ec88d=_0x3f33dd;this[_0x6ec88d(0x2c4)][_0x6ec88d(0x349)](),this['_listWindow'][_0x6ec88d(0x2ea)]();},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x309)]=function(){const _0x3c0e38=_0x3f33dd,_0x4467e8=this[_0x3c0e38(0x2c4)][_0x3c0e38(0x171)](),_0x35f529=_0x4467e8['Key']['toUpperCase']()[_0x3c0e38(0x25e)]();$gameSystem[_0x3c0e38(0x35d)](_0x35f529,!![]),this[_0x3c0e38(0x2c4)][_0x3c0e38(0x223)](),this[_0x3c0e38(0x2c4)][_0x3c0e38(0x2ea)]();},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x240)]=function(){const _0x283ebd=_0x3f33dd;this[_0x283ebd(0x2c4)][_0x283ebd(0x1d0)](),this[_0x283ebd(0x293)][_0x283ebd(0x2ea)]();},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x330)]=function(){const _0x3788c9=_0x3f33dd;return TextManager[_0x3788c9(0x1f9)];},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x205)]=function(){const _0x5ab212=_0x3f33dd;if(this[_0x5ab212(0x2c4)]&&this[_0x5ab212(0x2c4)]['active']){if('dhhVv'!==_0x5ab212(0x23f)){if(this[_0x5ab212(0x2c4)][_0x5ab212(0x171)]())return this[_0x5ab212(0x2c4)][_0x5ab212(0x1a6)]()?TextManager[_0x5ab212(0x2a2)]:'';else{if(this[_0x5ab212(0x2c4)][_0x5ab212(0x2e7)]()){if(_0x5ab212(0x2ee)!==_0x5ab212(0x2ee)){function _0x531035(){const _0x4b4421=_0x5ab212,_0x3c180a=this['currentQuest'](),_0x4a33f7=this['_logWindow'];_0x4a33f7[_0x4b4421(0x2d2)](_0x3c180a);}}else return TextManager['questButtonAssistCollapse'];}else return TextManager[_0x5ab212(0x1a3)];}}else{function _0x1b7cb5(){_0x22dd8e['push'](_0x582a95);}}}return Scene_MenuBase[_0x5ab212(0x202)][_0x5ab212(0x205)]['call'](this);},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x2a6)]=function(){const _0x4a2cb2=_0x3f33dd;Scene_MenuBase[_0x4a2cb2(0x202)]['createBackground'][_0x4a2cb2(0x25c)](this),this['setBackgroundOpacity'](this[_0x4a2cb2(0x1ec)]()),this['createCustomBackgroundImages']();},Scene_Quest[_0x3f33dd(0x202)]['getBackgroundOpacity']=function(){const _0x306fd0=_0x3f33dd;return VisuMZ['QuestSystem'][_0x306fd0(0x189)]['BgSettings'][_0x306fd0(0x250)];},Scene_Quest['prototype'][_0x3f33dd(0x29b)]=function(){const _0x41484b=_0x3f33dd,_0x34ac0e={'BgFilename1':VisuMZ[_0x41484b(0x351)][_0x41484b(0x189)][_0x41484b(0x254)]['BgFilename1'],'BgFilename2':VisuMZ[_0x41484b(0x351)]['Settings'][_0x41484b(0x254)][_0x41484b(0x2f4)]};if(_0x34ac0e&&(_0x34ac0e[_0x41484b(0x2b2)]!==''||_0x34ac0e[_0x41484b(0x2f4)]!=='')){if('twvpz'!==_0x41484b(0x2d0)){function _0x3a1b51(){const _0x2b2b87=_0x41484b;this[_0x2b2b87(0x30b)]=new _0x15726d(_0xde6767['loadTitle1'](_0x42d424[_0x2b2b87(0x2b2)])),this[_0x2b2b87(0x18f)]=new _0x200d4c(_0x407b4c[_0x2b2b87(0x333)](_0x59b81e['BgFilename2'])),this[_0x2b2b87(0x362)](this[_0x2b2b87(0x30b)]),this[_0x2b2b87(0x362)](this[_0x2b2b87(0x18f)]),this['_backSprite1'][_0x2b2b87(0x2fd)][_0x2b2b87(0x2d5)](this[_0x2b2b87(0x227)]['bind'](this,this[_0x2b2b87(0x30b)])),this['_backSprite2']['bitmap'][_0x2b2b87(0x2d5)](this[_0x2b2b87(0x227)][_0x2b2b87(0x2f1)](this,this[_0x2b2b87(0x18f)]));}}else this[_0x41484b(0x30b)]=new Sprite(ImageManager[_0x41484b(0x32d)](_0x34ac0e[_0x41484b(0x2b2)])),this[_0x41484b(0x18f)]=new Sprite(ImageManager[_0x41484b(0x333)](_0x34ac0e[_0x41484b(0x2f4)])),this[_0x41484b(0x362)](this['_backSprite1']),this[_0x41484b(0x362)](this['_backSprite2']),this[_0x41484b(0x30b)][_0x41484b(0x2fd)][_0x41484b(0x2d5)](this['adjustSprite']['bind'](this,this[_0x41484b(0x30b)])),this[_0x41484b(0x18f)][_0x41484b(0x2fd)][_0x41484b(0x2d5)](this[_0x41484b(0x227)][_0x41484b(0x2f1)](this,this[_0x41484b(0x18f)]));}},Scene_Quest[_0x3f33dd(0x202)][_0x3f33dd(0x227)]=function(_0x8e3479){const _0x350f98=_0x3f33dd;this[_0x350f98(0x284)](_0x8e3479),this['centerSprite'](_0x8e3479);},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x188)]=Window_MenuCommand[_0x3f33dd(0x202)][_0x3f33dd(0x21f)],Window_MenuCommand['prototype']['addOriginalCommands']=function(){const _0x23e471=_0x3f33dd;VisuMZ['QuestSystem'][_0x23e471(0x188)][_0x23e471(0x25c)](this),this[_0x23e471(0x18e)]();},Window_MenuCommand[_0x3f33dd(0x202)][_0x3f33dd(0x18e)]=function(){const _0x39049c=_0x3f33dd;if(!this[_0x39049c(0x2c0)]())return;if(!this[_0x39049c(0x20e)]())return;const _0x81c9fa=TextManager[_0x39049c(0x193)],_0x5f35dc=this['isQuestCommandEnabled']();this['addCommand'](_0x81c9fa,_0x39049c(0x17a),_0x5f35dc);},Window_MenuCommand[_0x3f33dd(0x202)]['addQuestCommandAutomatically']=function(){const _0x44b637=_0x3f33dd;return Imported[_0x44b637(0x26d)]?![]:!![];},Window_MenuCommand['prototype'][_0x3f33dd(0x20e)]=function(){const _0x4d9436=_0x3f33dd;return $gameSystem[_0x4d9436(0x234)]();},Window_MenuCommand['prototype'][_0x3f33dd(0x271)]=function(){const _0x365de7=_0x3f33dd;return $gameSystem[_0x365de7(0x256)]();},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x369)]=Window_Options[_0x3f33dd(0x202)][_0x3f33dd(0x23a)],Window_Options[_0x3f33dd(0x202)]['addGeneralOptions']=function(){const _0x5bcb75=_0x3f33dd;VisuMZ['QuestSystem'][_0x5bcb75(0x369)][_0x5bcb75(0x25c)](this),this[_0x5bcb75(0x1f0)]();},Window_Options[_0x3f33dd(0x202)][_0x3f33dd(0x1f0)]=function(){const _0x621196=_0x3f33dd;VisuMZ[_0x621196(0x351)][_0x621196(0x189)][_0x621196(0x2e9)]['AddShowOption']&&this[_0x621196(0x26a)](),VisuMZ[_0x621196(0x351)][_0x621196(0x189)][_0x621196(0x2e9)][_0x621196(0x2d8)]&&this[_0x621196(0x29a)]();},Window_Options[_0x3f33dd(0x202)][_0x3f33dd(0x26a)]=function(){const _0x431fef=_0x3f33dd,_0x574ba3=TextManager[_0x431fef(0x1f6)],_0x4aa651=_0x431fef(0x1f6);this[_0x431fef(0x35f)](_0x574ba3,_0x4aa651);},Window_Options[_0x3f33dd(0x202)][_0x3f33dd(0x29a)]=function(){const _0x50e5d5=_0x3f33dd,_0x5e0ee1=TextManager[_0x50e5d5(0x31b)],_0x4ad001='questTrackerPosition';this[_0x50e5d5(0x35f)](_0x5e0ee1,_0x4ad001);},VisuMZ['QuestSystem']['Window_Options_statusText']=Window_Options[_0x3f33dd(0x202)][_0x3f33dd(0x226)],Window_Options[_0x3f33dd(0x202)]['statusText']=function(_0x45e643){const _0x17b09f=_0x3f33dd,_0x38968f=this[_0x17b09f(0x340)](_0x45e643);if(_0x38968f===_0x17b09f(0x31b)){if('szkJM'!==_0x17b09f(0x18d)){function _0x252566(){const _0x55dc97=_0x17b09f,_0x21513f=this[_0x55dc97(0x195)]();return _0x21513f[_0x55dc97(0x2dc)]=_0x21513f[_0x55dc97(0x2dc)]||[],_0x21513f[_0x55dc97(0x2dc)][_0x55dc97(0x1bb)](_0x5d06cd=>this[_0x55dc97(0x17a)](_0x5d06cd))[_0x55dc97(0x276)](null);}}else{const _0x12d7bb=this[_0x17b09f(0x331)](_0x38968f);return _0x12d7bb?TextManager[_0x17b09f(0x2c2)]:TextManager[_0x17b09f(0x33c)];}}return VisuMZ[_0x17b09f(0x351)][_0x17b09f(0x2c6)][_0x17b09f(0x25c)](this,_0x45e643);};function Window_QuestCommand(){const _0x1cd769=_0x3f33dd;this[_0x1cd769(0x1c7)](...arguments);}Window_QuestCommand['prototype']=Object['create'](Window_Command[_0x3f33dd(0x202)]),Window_QuestCommand['prototype']['constructor']=Window_QuestCommand,Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x1c7)]=function(_0x6989f6){const _0x46de55=_0x3f33dd;Window_Command[_0x46de55(0x202)][_0x46de55(0x1c7)][_0x46de55(0x25c)](this,_0x6989f6),this['createCommandNameWindow'](_0x6989f6);},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x1bd)]=function(_0x9dced9){const _0x14f4b4=_0x3f33dd,_0x450be2=new Rectangle(0x0,0x0,_0x9dced9['width'],_0x9dced9[_0x14f4b4(0x307)]);this['_commandNameWindow']=new Window_Base(_0x450be2),this[_0x14f4b4(0x2e3)][_0x14f4b4(0x2ae)]=0x0,this[_0x14f4b4(0x362)](this[_0x14f4b4(0x2e3)]),this[_0x14f4b4(0x20a)]();},Window_QuestCommand['prototype'][_0x3f33dd(0x1e7)]=function(){const _0x5b7831=_0x3f33dd;Window_Command[_0x5b7831(0x202)][_0x5b7831(0x1e7)][_0x5b7831(0x25c)](this);if(this[_0x5b7831(0x2e3)])this['updateCommandNameWindow']();if(this['_listWindow'])this[_0x5b7831(0x2c4)][_0x5b7831(0x232)](this[_0x5b7831(0x253)]());},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x20a)]=function(){const _0x10caa3=_0x3f33dd,_0x4f1582=this[_0x10caa3(0x2e3)];_0x4f1582[_0x10caa3(0x288)][_0x10caa3(0x33b)]();const _0x4517be=this['commandStyleCheck'](this[_0x10caa3(0x2e1)]());if(_0x4517be===_0x10caa3(0x24c)){const _0x926bd=this[_0x10caa3(0x187)](this['index']());let _0x50502a=this[_0x10caa3(0x2fc)](this[_0x10caa3(0x2e1)]());_0x50502a=_0x50502a[_0x10caa3(0x327)](/\\I\[(\d+)\]/gi,''),_0x4f1582['resetFontSettings'](),this[_0x10caa3(0x1d7)](_0x50502a,_0x926bd),this[_0x10caa3(0x35b)](_0x50502a,_0x926bd),this[_0x10caa3(0x2e8)](_0x50502a,_0x926bd);}},Window_QuestCommand[_0x3f33dd(0x202)]['commandNameWindowDrawBackground']=function(_0x3aac47,_0x360af5){},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x35b)]=function(_0x497fc4,_0x232db3){const _0x17a323=_0x3f33dd,_0x39eb8b=this[_0x17a323(0x2e3)];_0x39eb8b['drawText'](_0x497fc4,0x0,_0x232db3['y'],_0x39eb8b[_0x17a323(0x2dd)],'center');},Window_QuestCommand[_0x3f33dd(0x202)]['commandNameWindowCenter']=function(_0x3049f4,_0x41682a){const _0x53f29b=_0x3f33dd,_0x287b41=this[_0x53f29b(0x2e3)],_0x98642=$gameSystem[_0x53f29b(0x225)](),_0x539e55=_0x41682a['x']+Math['floor'](_0x41682a['width']/0x2)+_0x98642;_0x287b41['x']=_0x287b41[_0x53f29b(0x173)]/-0x2+_0x539e55,_0x287b41['y']=Math['floor'](_0x41682a[_0x53f29b(0x307)]/0x2);},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x2b7)]=function(){const _0x548879=_0x3f33dd;this[_0x548879(0x233)](),this[_0x548879(0x30e)](),this[_0x548879(0x20b)]();},Window_QuestCommand['prototype'][_0x3f33dd(0x233)]=function(){const _0x445099=_0x3f33dd,_0x3c2f8b=_0x445099(0x2dc),_0x354fdc=ImageManager[_0x445099(0x22b)];let _0x29c545=TextManager[_0x445099(0x255)];if(_0x354fdc>0x0&&this[_0x445099(0x23b)]()!=='text'){if(_0x445099(0x1b9)===_0x445099(0x1a2)){function _0x477560(){const _0x140a65=_0x445099;_0x1d3701['QuestSystem'][_0x140a65(0x16b)][_0x140a65(0x25c)](this),_0x36bdf5['isSceneMap']()&&!this[_0x140a65(0x19b)]&&(this[_0x140a65(0x19b)]=!![]);}}else _0x29c545=_0x445099(0x1d1)[_0x445099(0x2ef)](_0x354fdc,_0x29c545);}const _0x1e92a5=this[_0x445099(0x354)]();this['addCommand'](_0x29c545,_0x3c2f8b,_0x1e92a5);},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x354)]=function(){const _0x3db91a=_0x3f33dd;return $gameSystem[_0x3db91a(0x1f2)]()[_0x3db91a(0x247)]>0x0;},Window_QuestCommand['prototype'][_0x3f33dd(0x30e)]=function(){const _0x1190e9=_0x3f33dd,_0x60a2a3=_0x1190e9(0x269),_0x3f2bee=ImageManager[_0x1190e9(0x1fa)];let _0x1502af=TextManager['questCompletedCmd'];_0x3f2bee>0x0&&this[_0x1190e9(0x23b)]()!==_0x1190e9(0x26c)&&(_0x1502af=_0x1190e9(0x1d1)['format'](_0x3f2bee,_0x1502af));const _0xe2abab=this[_0x1190e9(0x363)]();this[_0x1190e9(0x35f)](_0x1502af,_0x60a2a3,_0xe2abab);},Window_QuestCommand['prototype'][_0x3f33dd(0x363)]=function(){const _0xd33d15=_0x3f33dd;return $gameSystem[_0xd33d15(0x34b)]()[_0xd33d15(0x247)]>0x0;},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x20b)]=function(){const _0x10d20a=_0x3f33dd;if(!this['isFailedQuestsVisible']())return;const _0x85de01=_0x10d20a(0x1fb),_0x2ce635=ImageManager[_0x10d20a(0x1ee)];let _0x581846=TextManager[_0x10d20a(0x178)];_0x2ce635>0x0&&this[_0x10d20a(0x23b)]()!==_0x10d20a(0x26c)&&(_0x581846=_0x10d20a(0x1d1)[_0x10d20a(0x2ef)](_0x2ce635,_0x581846));const _0x465ccc=this[_0x10d20a(0x2e4)]();this[_0x10d20a(0x35f)](_0x581846,_0x85de01,_0x465ccc);},Window_QuestCommand['prototype'][_0x3f33dd(0x2df)]=function(){const _0x5cea27=_0x3f33dd;return VisuMZ[_0x5cea27(0x351)][_0x5cea27(0x189)][_0x5cea27(0x289)][_0x5cea27(0x297)];},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x2e4)]=function(){const _0x1c3005=_0x3f33dd;return $gameSystem[_0x1c3005(0x281)]()[_0x1c3005(0x247)]>0x0;},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x1e3)]=function(){const _0x5b7aa3=_0x3f33dd;return this[_0x5b7aa3(0x2df)]()?0x3:0x2;},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x27b)]=function(){const _0x3e2562=_0x3f33dd;return VisuMZ[_0x3e2562(0x351)][_0x3e2562(0x189)][_0x3e2562(0x289)][_0x3e2562(0x1bc)];},Window_QuestCommand['prototype'][_0x3f33dd(0x357)]=function(_0x1e902a){const _0x118631=_0x3f33dd,_0x21db95=this[_0x118631(0x16c)](_0x1e902a);if(_0x21db95===_0x118631(0x1ac)){if(_0x118631(0x208)!==_0x118631(0x208)){function _0x54af2a(){const _0x1e23df=_0x118631;_0x4f1380=_0x982981['toUpperCase']()[_0x1e23df(0x25e)]();const _0x489708=this[_0x1e23df(0x17a)](_0x365ee1);if(!_0x489708)return'';const _0x5345b1=this[_0x1e23df(0x195)]()['quotes'];_0x5345b1[_0x41180f]=_0x2d48ac;}}else this[_0x118631(0x1ad)](_0x1e902a);}else _0x21db95===_0x118631(0x24c)?this[_0x118631(0x29e)](_0x1e902a):Window_HorzCommand[_0x118631(0x202)][_0x118631(0x357)][_0x118631(0x25c)](this,_0x1e902a);},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x23b)]=function(){const _0x13b7ef=_0x3f33dd;return VisuMZ[_0x13b7ef(0x351)][_0x13b7ef(0x189)]['Window']['CmdStyle'];},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x16c)]=function(_0x629401){const _0x2ec03f=_0x3f33dd;if(_0x629401<0x0)return _0x2ec03f(0x26c);const _0x55b099=this['commandStyle']();if(_0x55b099!==_0x2ec03f(0x1a1))return _0x55b099;else{if(this[_0x2ec03f(0x317)]()>0x0){const _0x3c739a=this[_0x2ec03f(0x2fc)](_0x629401);if(_0x3c739a[_0x2ec03f(0x22a)](/\\I\[(\d+)\]/i)){const _0x1a58db=this[_0x2ec03f(0x187)](_0x629401),_0x46f5fb=this[_0x2ec03f(0x30d)](_0x3c739a)[_0x2ec03f(0x173)];if(_0x46f5fb<=_0x1a58db['width']){if(_0x2ec03f(0x1c4)!==_0x2ec03f(0x1c4)){function _0x4a3dbf(){return _0x29eae9()+_0x5363d7()+_0x478772();}}else return _0x2ec03f(0x1ac);}else return'icon';}}}return'text';},Window_QuestCommand['prototype']['drawItemStyleIconText']=function(_0x390ee6){const _0x5d81b0=_0x3f33dd,_0x416ddf=this[_0x5d81b0(0x187)](_0x390ee6),_0x5cc0bb=this[_0x5d81b0(0x2fc)](_0x390ee6),_0x4cdceb=this['textSizeEx'](_0x5cc0bb)[_0x5d81b0(0x173)];this[_0x5d81b0(0x35a)](this['isCommandEnabled'](_0x390ee6));const _0x35fe62=this['itemTextAlign']();if(_0x35fe62===_0x5d81b0(0x192))this[_0x5d81b0(0x365)](_0x5cc0bb,_0x416ddf['x']+_0x416ddf['width']-_0x4cdceb,_0x416ddf['y'],_0x4cdceb);else{if(_0x35fe62===_0x5d81b0(0x326)){const _0x26c16f=_0x416ddf['x']+Math['floor']((_0x416ddf[_0x5d81b0(0x173)]-_0x4cdceb)/0x2);this['drawTextEx'](_0x5cc0bb,_0x26c16f,_0x416ddf['y'],_0x4cdceb);}else{if(_0x5d81b0(0x24d)===_0x5d81b0(0x2d7)){function _0x1f12a4(){const _0x440989=_0x5d81b0,_0x316611=_0x432616[_0x440989(0x1f6)],_0x508d1a=_0x440989(0x1f6);this[_0x440989(0x35f)](_0x316611,_0x508d1a);}}else this[_0x5d81b0(0x365)](_0x5cc0bb,_0x416ddf['x'],_0x416ddf['y'],_0x4cdceb);}}},Window_QuestCommand[_0x3f33dd(0x202)][_0x3f33dd(0x29e)]=function(_0x494a1a){const _0x2b3d96=_0x3f33dd;this[_0x2b3d96(0x2fc)](_0x494a1a)['match'](/\\I\[(\d+)\]/i);const _0x3cca77=Number(RegExp['$1'])||0x0,_0x715326=this[_0x2b3d96(0x187)](_0x494a1a),_0x103c6e=_0x715326['x']+Math[_0x2b3d96(0x21c)]((_0x715326[_0x2b3d96(0x173)]-ImageManager[_0x2b3d96(0x28b)])/0x2),_0x2694ec=_0x715326['y']+(_0x715326[_0x2b3d96(0x307)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x3cca77,_0x103c6e,_0x2694ec);},Window_QuestCommand['prototype'][_0x3f33dd(0x2f0)]=function(_0x328dab){const _0x4b90ca=_0x3f33dd;this[_0x4b90ca(0x2c4)]=_0x328dab,this[_0x4b90ca(0x1e7)]();};function Window_QuestList(){const _0x514d53=_0x3f33dd;this[_0x514d53(0x1c7)](...arguments);}Window_QuestList['categoryList']=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x332)],Window_QuestList[_0x3f33dd(0x202)]=Object['create'](Window_Command['prototype']),Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x316)]=Window_QuestList,Window_QuestList['prototype'][_0x3f33dd(0x1c7)]=function(_0x51536b){const _0x7878b6=_0x3f33dd;this[_0x7878b6(0x312)](),Window_Command[_0x7878b6(0x202)][_0x7878b6(0x1c7)]['call'](this,_0x51536b),this['createCommandNameWindow'](_0x51536b),this[_0x7878b6(0x2d4)](),this['deselect']();},Window_QuestList['prototype']['initCategories']=function(){const _0x4b35b0=_0x3f33dd;this[_0x4b35b0(0x30f)]={};for(const _0xc45c68 of VisuMZ[_0x4b35b0(0x351)][_0x4b35b0(0x189)][_0x4b35b0(0x332)]){this[_0x4b35b0(0x30f)][_0xc45c68[_0x4b35b0(0x2ec)]]=!![];}this['_categoryFilter']='known';},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x232)]=function(_0x59857b){const _0x27f46f=_0x3f33dd;if(this['_categoryFilter']===_0x59857b)return;this['_categoryFilter']=_0x59857b,this[_0x27f46f(0x223)]();},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x349)]=function(){const _0x2f2db9=_0x3f33dd,_0x594b3a=this['currentCategory']();this[_0x2f2db9(0x30f)][_0x594b3a[_0x2f2db9(0x2ec)]]=!this[_0x2f2db9(0x30f)][_0x594b3a[_0x2f2db9(0x2ec)]],this['refresh'](),this[_0x2f2db9(0x1e7)]();},Window_QuestList['prototype'][_0x3f33dd(0x2e7)]=function(){const _0x1edb2a=_0x3f33dd,_0x5990f2=this[_0x1edb2a(0x1b7)]();return _0x5990f2&&this[_0x1edb2a(0x30f)][_0x5990f2['CategoryName']];},Window_QuestList['prototype']['createCommandNameWindow']=function(_0x399d38){const _0x5e9837=_0x3f33dd,_0xbee012=new Rectangle(0x0,0x0,_0x399d38[_0x5e9837(0x173)],_0x399d38[_0x5e9837(0x307)]);this['_commandNameWindow']=new Window_Base(_0xbee012),this[_0x5e9837(0x2e3)][_0x5e9837(0x2ae)]=0x0,this[_0x5e9837(0x362)](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x1e7)]=function(){const _0x38c220=_0x3f33dd;Window_Command[_0x38c220(0x202)][_0x38c220(0x1e7)][_0x38c220(0x25c)](this);if(this[_0x38c220(0x2e3)])this[_0x38c220(0x20a)]();if(this[_0x38c220(0x1a0)])this['updateLabelWindow']();if(this[_0x38c220(0x1cd)])this[_0x38c220(0x1a4)]();},Window_QuestList['prototype'][_0x3f33dd(0x20a)]=function(){const _0x48db6c=_0x3f33dd,_0xb79056=this[_0x48db6c(0x2e3)];_0xb79056[_0x48db6c(0x288)][_0x48db6c(0x33b)]();const _0x266d6e=this[_0x48db6c(0x16c)](this[_0x48db6c(0x2e1)]());if(_0x266d6e===_0x48db6c(0x24c)){const _0x405888=this[_0x48db6c(0x187)](this[_0x48db6c(0x2e1)]());let _0x4b95c7=this[_0x48db6c(0x2fc)](this[_0x48db6c(0x2e1)]());_0x4b95c7=_0x4b95c7[_0x48db6c(0x327)](/\\I\[(\d+)\]/gi,''),_0xb79056[_0x48db6c(0x315)](),this['commandNameWindowDrawBackground'](_0x4b95c7,_0x405888),this['commandNameWindowDrawText'](_0x4b95c7,_0x405888),this[_0x48db6c(0x2e8)](_0x4b95c7,_0x405888);}},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x1d7)]=function(_0x47fe62,_0x3e76c6){},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x35b)]=function(_0x344139,_0x44159c){const _0x20b5a7=_0x3f33dd,_0x5ac13d=this[_0x20b5a7(0x2e3)];_0x5ac13d['drawText'](_0x344139,0x0,_0x44159c['y'],_0x5ac13d[_0x20b5a7(0x2dd)],_0x20b5a7(0x326));},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x2e8)]=function(_0x388321,_0x366018){const _0x5c2fbe=_0x3f33dd,_0xcccdba=this['_commandNameWindow'],_0x360a07=$gameSystem[_0x5c2fbe(0x225)](),_0x1fbb1f=_0x366018['x']+Math[_0x5c2fbe(0x21c)](_0x366018[_0x5c2fbe(0x173)]/0x2)+_0x360a07;_0xcccdba['x']=_0xcccdba[_0x5c2fbe(0x173)]/-0x2+_0x1fbb1f,_0xcccdba['y']=Math[_0x5c2fbe(0x21c)](_0x366018[_0x5c2fbe(0x307)]/0x2);},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x2b7)]=function(){const _0x1fbca9=_0x3f33dd;for(const _0x187557 of Window_QuestList[_0x1fbca9(0x2b8)]){if(!_0x187557)continue;if(!this[_0x1fbca9(0x314)](_0x187557))continue;this[_0x1fbca9(0x300)](_0x187557),this['makeQuestList'](_0x187557);}if(this['_list'][_0x1fbca9(0x247)]<=0x0){if(_0x1fbca9(0x303)!==_0x1fbca9(0x303)){function _0x1c387f(){return _0x2507c1['questsKnown']()['length']>0x0;}}else this[_0x1fbca9(0x2e5)]();}},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x2e5)]=function(){const _0x3e255e=_0x3f33dd;this[_0x3e255e(0x35f)](TextManager[_0x3e255e(0x2f6)],_0x3e255e(0x251),![]);},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x314)]=function(_0x14426f){const _0x37faab=_0x3f33dd;for(const _0x52222 of _0x14426f[_0x37faab(0x2ca)]){if(!_0x52222)continue;switch(this['_categoryFilter']){case _0x37faab(0x2dc):if($gameSystem[_0x37faab(0x2f2)](_0x52222[_0x37faab(0x2bd)]))return!![];break;case _0x37faab(0x269):if($gameSystem[_0x37faab(0x261)](_0x52222[_0x37faab(0x2bd)]))return!![];break;case _0x37faab(0x1fb):if($gameSystem[_0x37faab(0x2af)](_0x52222[_0x37faab(0x2bd)]))return!![];break;}}return![];},Window_QuestList['prototype'][_0x3f33dd(0x300)]=function(_0x32ce35){const _0x227a3d=_0x3f33dd,_0x4e7f8e=this[_0x227a3d(0x2fb)](_0x32ce35)?TextManager[_0x227a3d(0x35c)]:TextManager[_0x227a3d(0x1a9)],_0x13bea3=this['getTotalCategoryQuests'](_0x32ce35)['length'],_0x7a21d6=_0x4e7f8e[_0x227a3d(0x2ef)](_0x32ce35[_0x227a3d(0x2ec)],_0x13bea3);this[_0x227a3d(0x35f)](_0x7a21d6,_0x227a3d(0x183),!![],_0x32ce35);},Window_QuestList['prototype']['getTotalCategoryQuests']=function(_0x27b823){const _0x1c5836=_0x3f33dd;switch(this['_categoryFilter']){case _0x1c5836(0x2dc):return $gameSystem[_0x1c5836(0x1f2)]()[_0x1c5836(0x18b)](_0x42c670=>_0x42c670[_0x1c5836(0x183)]===_0x27b823);break;case _0x1c5836(0x269):return $gameSystem[_0x1c5836(0x34b)]()['filter'](_0x4541b0=>_0x4541b0['category']===_0x27b823);break;case _0x1c5836(0x1fb):return $gameSystem[_0x1c5836(0x281)]()[_0x1c5836(0x18b)](_0x5c0b50=>_0x5c0b50[_0x1c5836(0x183)]===_0x27b823);break;}return[];},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x27e)]=function(_0x467f84){const _0x34139b=_0x3f33dd;if(!this[_0x34139b(0x2fb)](_0x467f84))return;for(const _0xff24a2 of _0x467f84[_0x34139b(0x2ca)]){if(_0x34139b(0x278)===_0x34139b(0x199)){function _0x37ecc9(){const _0x36a9fd=_0x34139b,_0x413432=this[_0x36a9fd(0x2ff)]();this[_0x36a9fd(0x2de)]=_0x413432;}}else{if(!_0xff24a2)continue;switch(this[_0x34139b(0x1dd)]){case _0x34139b(0x2dc):if($gameSystem[_0x34139b(0x2f2)](_0xff24a2[_0x34139b(0x2bd)]))this[_0x34139b(0x18e)](_0xff24a2);break;case'completed':if($gameSystem[_0x34139b(0x261)](_0xff24a2[_0x34139b(0x2bd)]))this[_0x34139b(0x18e)](_0xff24a2);break;case'failed':if($gameSystem['isQuestFailed'](_0xff24a2[_0x34139b(0x2bd)]))this[_0x34139b(0x18e)](_0xff24a2);break;}}}},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x2fb)]=function(_0x3bef6f){const _0x4558c7=_0x3f33dd;return this[_0x4558c7(0x30f)][_0x3bef6f[_0x4558c7(0x2ec)]];},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x18e)]=function(_0x2677a6){const _0x33ee9c=_0x3f33dd;let _0x1e313a=_0x2677a6[_0x33ee9c(0x335)];_0x2677a6===$gameSystem[_0x33ee9c(0x19f)]()&&(_0x1e313a=TextManager[_0x33ee9c(0x249)][_0x33ee9c(0x2ef)](_0x1e313a)),this[_0x33ee9c(0x35f)](_0x1e313a,_0x33ee9c(0x17a),!![],_0x2677a6);},Window_QuestList[_0x3f33dd(0x202)]['itemTextAlign']=function(){const _0x1de7a9=_0x3f33dd;return _0x1de7a9(0x27f);},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x357)]=function(_0x592f05){const _0x5b3e06=_0x3f33dd,_0x1f1c11=this[_0x5b3e06(0x16c)](_0x592f05);if(_0x1f1c11===_0x5b3e06(0x1ac))this[_0x5b3e06(0x1ad)](_0x592f05);else{if(_0x1f1c11==='icon')this[_0x5b3e06(0x29e)](_0x592f05);else{if('avvIQ'!==_0x5b3e06(0x259))Window_HorzCommand[_0x5b3e06(0x202)][_0x5b3e06(0x357)][_0x5b3e06(0x25c)](this,_0x592f05);else{function _0x3bfe1d(){const _0xd5e442=_0x5b3e06;_0x34df13=_0x4ecca9['toUpperCase']()[_0xd5e442(0x25e)]();const _0x47f878=this['quest'](_0x4dbc0d);if(!_0x47f878)return'';const _0x1d52ec=this[_0xd5e442(0x195)]()[_0xd5e442(0x1c6)];_0x1d52ec[_0x405313]=_0x1d52ec[_0x17e6dd]||0x1;const _0x30d2b3=_0x1d52ec[_0x26a0e0];return _0x47f878['Quotes'][_0x30d2b3]||'';}}}}},Window_QuestList['prototype'][_0x3f33dd(0x23b)]=function(){const _0x30c7a4=_0x3f33dd;return _0x30c7a4(0x1ac);},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x16c)]=function(_0x2ff6ba){const _0x3d8039=_0x3f33dd;if(_0x2ff6ba<0x0)return _0x3d8039(0x26c);const _0x3677b6=this[_0x3d8039(0x23b)]();if(_0x3677b6!==_0x3d8039(0x1a1))return _0x3677b6;else{if(this[_0x3d8039(0x317)]()>0x0){const _0xb29b64=this[_0x3d8039(0x2fc)](_0x2ff6ba);if(_0xb29b64[_0x3d8039(0x22a)](/\\I\[(\d+)\]/i)){if(_0x3d8039(0x26b)===_0x3d8039(0x262)){function _0x46b402(){const _0x15eee3=_0x3d8039;if(!_0x36e9f4[_0x15eee3(0x1e1)])return _0x25b04b;if(!_0x3e5794[_0x15eee3(0x1c9)])return _0x30f390;return _0x36b5da=_0x15eee3(0x279)[_0x15eee3(0x2ef)](_0x4c3762),_0x593d58;}}else{const _0x4b99b2=this['itemLineRect'](_0x2ff6ba),_0x4fd548=this[_0x3d8039(0x30d)](_0xb29b64)[_0x3d8039(0x173)];if(_0x4fd548<=_0x4b99b2[_0x3d8039(0x173)]){if(_0x3d8039(0x1ab)==='KfAxx')return'iconText';else{function _0x2e3a3e(){const _0x443185=_0x3d8039,_0x4c4a93=this[_0x443185(0x181)](),_0x79f51f=new _0x337d14(_0x4c4a93);this[_0x443185(0x238)](_0x79f51f),this[_0x443185(0x1a0)]=_0x79f51f,_0x79f51f[_0x443185(0x334)](_0x269949[_0x443185(0x351)][_0x443185(0x189)][_0x443185(0x289)][_0x443185(0x274)]);}}}else{if(_0x3d8039(0x31f)!=='snnNM')return'icon';else{function _0x16136a(){const _0x56972f=_0x3d8039;return _0x13180f[_0x56972f(0x1a3)];}}}}}}}return _0x3d8039(0x26c);},Window_QuestList[_0x3f33dd(0x202)]['drawItemStyleIconText']=function(_0x4517c3){const _0x1e723b=_0x3f33dd,_0x1b7ebd=this['itemLineRect'](_0x4517c3),_0x252012=this[_0x1e723b(0x2fc)](_0x4517c3),_0x2a3c23=this[_0x1e723b(0x30d)](_0x252012)[_0x1e723b(0x173)];this[_0x1e723b(0x35a)](this[_0x1e723b(0x221)](_0x4517c3));const _0x418c23=this[_0x1e723b(0x27b)]();if(_0x418c23===_0x1e723b(0x192))this[_0x1e723b(0x365)](_0x252012,_0x1b7ebd['x']+_0x1b7ebd[_0x1e723b(0x173)]-_0x2a3c23,_0x1b7ebd['y'],_0x2a3c23);else{if(_0x418c23==='center'){const _0x317e1e=_0x1b7ebd['x']+Math['floor']((_0x1b7ebd[_0x1e723b(0x173)]-_0x2a3c23)/0x2);this[_0x1e723b(0x365)](_0x252012,_0x317e1e,_0x1b7ebd['y'],_0x2a3c23);}else{if('euAxO'===_0x1e723b(0x2cc)){function _0x5b6f35(){const _0x60db8a=_0x1e723b;if(_0x5d0365['QuestSystem'][_0x60db8a(0x189)][_0x60db8a(0x2e9)][_0x60db8a(0x299)])_0x3f7def++;if(_0x3095b4['QuestSystem'][_0x60db8a(0x189)][_0x60db8a(0x2e9)][_0x60db8a(0x2d8)])_0x18ef7b++;}}else this[_0x1e723b(0x365)](_0x252012,_0x1b7ebd['x'],_0x1b7ebd['y'],_0x2a3c23);}}},Window_QuestList['prototype'][_0x3f33dd(0x29e)]=function(_0x4f830d){const _0x1ac77c=_0x3f33dd;this[_0x1ac77c(0x2fc)](_0x4f830d)[_0x1ac77c(0x22a)](/\\I\[(\d+)\]/i);const _0x4175f3=Number(RegExp['$1'])||0x0,_0x393d9a=this[_0x1ac77c(0x187)](_0x4f830d),_0x15101b=_0x393d9a['x']+Math[_0x1ac77c(0x21c)]((_0x393d9a[_0x1ac77c(0x173)]-ImageManager[_0x1ac77c(0x28b)])/0x2),_0x229dd6=_0x393d9a['y']+(_0x393d9a[_0x1ac77c(0x307)]-ImageManager[_0x1ac77c(0x360)])/0x2;this[_0x1ac77c(0x1a8)](_0x4175f3,_0x15101b,_0x229dd6);},Window_QuestList['prototype'][_0x3f33dd(0x1b7)]=function(){const _0x3b81fb=_0x3f33dd;return this[_0x3b81fb(0x253)]()===_0x3b81fb(0x183)?this[_0x3b81fb(0x2f3)]():null;},Window_QuestList[_0x3f33dd(0x202)]['currentQuest']=function(){const _0x524593=_0x3f33dd;return this['currentSymbol']()===_0x524593(0x17a)?this[_0x524593(0x2f3)]():null;},Window_QuestList[_0x3f33dd(0x202)]['setLabelWindow']=function(_0x29eba0){const _0x350011=_0x3f33dd;this[_0x350011(0x1a0)]=_0x29eba0,this['callUpdateHelp']();},Window_QuestList['prototype'][_0x3f33dd(0x236)]=function(){const _0x43ed85=_0x3f33dd,_0x3ffa15=this['currentQuest'](),_0x5ef20b=this[_0x43ed85(0x1a0)];_0x5ef20b[_0x43ed85(0x288)][_0x43ed85(0x33b)]();const _0x250d40=_0x3ffa15?_0x3ffa15[_0x43ed85(0x335)]:TextManager[_0x43ed85(0x265)],_0x565307=_0x5ef20b[_0x43ed85(0x30d)](_0x250d40)['width'],_0x26b268=_0x5ef20b[_0x43ed85(0x209)]()+Math[_0x43ed85(0x2a7)]((_0x5ef20b[_0x43ed85(0x2dd)]-_0x565307)/0x2);_0x5ef20b['drawTextEx'](_0x250d40,_0x26b268,0x0,_0x5ef20b[_0x43ed85(0x2dd)]);},Window_QuestList['prototype'][_0x3f33dd(0x350)]=function(_0x24e44f){const _0x584f1d=_0x3f33dd;this[_0x584f1d(0x1cd)]=_0x24e44f,this[_0x584f1d(0x1e7)]();},Window_QuestList['prototype'][_0x3f33dd(0x1a4)]=function(){const _0x550f5c=_0x3f33dd,_0xdc40f=this['currentQuest'](),_0x32266b=this[_0x550f5c(0x1cd)];_0x32266b[_0x550f5c(0x2d2)](_0xdc40f);},Window_QuestList[_0x3f33dd(0x202)]['cursorPagedown']=function(){},Window_QuestList['prototype'][_0x3f33dd(0x277)]=function(){},Window_QuestList[_0x3f33dd(0x202)][_0x3f33dd(0x1a6)]=function(){const _0x59f449=_0x3f33dd;if(this[_0x59f449(0x171)]()){if(_0x59f449(0x295)!==_0x59f449(0x319))return this[_0x59f449(0x1dd)]==='known';else{function _0x223d6e(){const _0x15edf7=_0x59f449;return this[_0x15edf7(0x195)]()[_0x15edf7(0x2a5)];}}}else{if(_0x59f449(0x2ba)===_0x59f449(0x2ba))return Window_Command[_0x59f449(0x202)]['isOkEnabled'][_0x59f449(0x25c)](this);else{function _0x5c56f7(){const _0x4c2ff3=_0x59f449;return _0xc210e1[_0x4c2ff3(0x281)]()[_0x4c2ff3(0x247)]>0x0;}}}};function Window_QuestLog(){const _0x309d35=_0x3f33dd;this[_0x309d35(0x1c7)](...arguments);}Window_QuestLog[_0x3f33dd(0x1e1)]=VisuMZ['QuestSystem']['Settings'][_0x3f33dd(0x289)]['LogWindow_Auto_WordWrap'],Window_QuestLog['scrollSpeed']=VisuMZ['QuestSystem'][_0x3f33dd(0x189)][_0x3f33dd(0x289)][_0x3f33dd(0x190)],Window_QuestLog['prototype']=Object[_0x3f33dd(0x19a)](Window_Scrollable[_0x3f33dd(0x202)]),Window_QuestLog['prototype']['constructor']=Window_QuestLog,Window_QuestLog[_0x3f33dd(0x175)]=0x19,Window_QuestLog[_0x3f33dd(0x202)]['initialize']=function(_0x3ecc8a){const _0x212d46=_0x3f33dd;this[_0x212d46(0x1b0)]=0x0,this[_0x212d46(0x175)]=0x0,Window_Scrollable['prototype'][_0x212d46(0x1c7)][_0x212d46(0x25c)](this,_0x3ecc8a),this[_0x212d46(0x1c3)]=null,this[_0x212d46(0x223)]();},Window_QuestLog[_0x3f33dd(0x202)]['contentsHeight']=function(){const _0x42e8fd=_0x3f33dd;return Math[_0x42e8fd(0x31c)](this[_0x42e8fd(0x214)],this[_0x42e8fd(0x1b0)]);},Window_QuestLog['prototype']['overallHeight']=function(){return this['contentsHeight']();},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x1e2)]=function(){const _0x20d936=_0x3f33dd;Window_Scrollable['prototype'][_0x20d936(0x1e2)][_0x20d936(0x25c)](this),this[_0x20d936(0x2f5)]();},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x2f5)]=function(){const _0x23eb71=_0x3f33dd;if(this['_delayDraw']--===0x0)this[_0x23eb71(0x223)]();},Window_QuestLog['prototype']['updateOrigin']=function(){const _0x2d60e0=_0x3f33dd,_0x117662=this[_0x2d60e0(0x1f8)]()||0x1,_0x48d501=this[_0x2d60e0(0x215)]()||0x1,_0xab501e=this[_0x2d60e0(0x32e)]-this['_scrollX']%_0x117662,_0x4898ca=this[_0x2d60e0(0x26f)]-this[_0x2d60e0(0x26f)]%_0x48d501;if(_0xab501e!==this[_0x2d60e0(0x291)]||_0x4898ca!==this[_0x2d60e0(0x1db)]){if(_0x2d60e0(0x1a7)===_0x2d60e0(0x1a7))this[_0x2d60e0(0x222)](_0xab501e,_0x4898ca),this['paint']();else{function _0x28fb6f(){const _0x3a90cc=_0x2d60e0;_0x5159c1=_0x8ec273['toUpperCase']()['trim']();const _0x2bdc08=_0x16596b[_0x3a90cc(0x17a)](_0x60a9c4);return _0x2bdc08?_0x2bdc08[_0x3a90cc(0x26e)][_0x3a90cc(0x247)]-0x1:0x0;}}}this[_0x2d60e0(0x268)]['x']=this[_0x2d60e0(0x32e)],this['origin']['y']=this[_0x2d60e0(0x26f)];},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x19d)]=function(){const _0x1d841a=_0x3f33dd;Window_Scrollable[_0x1d841a(0x202)]['processWheelScroll'][_0x1d841a(0x25c)](this),this['updatePageUpDownScroll']();},Window_QuestLog['prototype'][_0x3f33dd(0x1d9)]=function(){const _0x12238e=_0x3f33dd;Input[_0x12238e(0x2b1)](_0x12238e(0x364))&&this[_0x12238e(0x224)](Window_QuestLog['scrollSpeed']),Input[_0x12238e(0x2b1)](_0x12238e(0x218))&&this['smoothScrollUp'](Window_QuestLog['scrollSpeed']);},Window_QuestLog[_0x3f33dd(0x202)]['setQuest']=function(_0x11719d){const _0x56bf1c=_0x3f33dd;if(this['_quest']===_0x11719d)return;this[_0x56bf1c(0x1c3)]=_0x11719d,this[_0x56bf1c(0x175)]=Window_QuestLog[_0x56bf1c(0x175)];},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x223)]=function(){const _0x2b9803=_0x3f33dd;this['contents']['clear']();const _0x17b164=this[_0x2b9803(0x212)](),_0x310c3a=this[_0x2b9803(0x1c3)]?this['createQuestText']():this[_0x2b9803(0x237)](),_0x2798a7=this[_0x2b9803(0x30d)](_0x310c3a['trim']());this[_0x2b9803(0x1b0)]=_0x2798a7[_0x2b9803(0x307)],this['constructor']===Window_QuestLog&&(this[_0x2b9803(0x1b0)]+=this['lineHeight'](),Window_QuestLog['wordWrapSupport']&&(this[_0x2b9803(0x1b0)]+=this[_0x2b9803(0x16e)]()*0x4)),this[_0x2b9803(0x322)](),this[_0x2b9803(0x365)](_0x310c3a,_0x17b164['x'],_0x17b164['y'],_0x17b164[_0x2b9803(0x173)]),this[_0x2b9803(0x26f)]=0x0,this[_0x2b9803(0x268)]['y']=0x0;},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x237)]=function(){const _0x14804d=_0x3f33dd;VisuMZ[_0x14804d(0x351)][_0x14804d(0x189)][_0x14804d(0x245)][_0x14804d(0x329)]();let _0x11ae0c=this['getEmptyLogFmt']();return _0x11ae0c=VisuMZ[_0x14804d(0x351)][_0x14804d(0x1b2)](_0x11ae0c),_0x11ae0c=VisuMZ[_0x14804d(0x351)][_0x14804d(0x182)](_0x11ae0c),_0x11ae0c;},Window_QuestLog[_0x3f33dd(0x202)]['getEmptyLogFmt']=function(){const _0x1adf8b=_0x3f33dd;return TextManager[_0x1adf8b(0x22c)];},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x229)]=function(){const _0x639386=_0x3f33dd,_0x2f7234=this[_0x639386(0x1c3)],_0x139759=_0x2f7234[_0x639386(0x2bd)][_0x639386(0x1f7)]()[_0x639386(0x25e)]();if(_0x2f7234[_0x639386(0x329)])_0x2f7234['OnLoadQuestJS'][_0x639386(0x25c)](this);let _0x57fee8=this[_0x639386(0x1f4)]();return _0x57fee8=VisuMZ[_0x639386(0x351)][_0x639386(0x239)](_0x57fee8),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[TITLE\]\]/gi,_0x2f7234[_0x639386(0x335)]['replace'](/\\I\[(\d+)\]/gi,'')[_0x639386(0x25e)]()),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[DIFFICULTY\]\]/gi,_0x2f7234[_0x639386(0x318)][_0x639386(0x25e)]()),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[FROM\]\]/gi,_0x2f7234['From'][_0x639386(0x25e)]()),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[LOCATION\]\]/gi,_0x2f7234[_0x639386(0x1c1)][_0x639386(0x25e)]()),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[DESCRIPTION\]\]/gi,this[_0x639386(0x211)](_0x139759)),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[OBJECTIVES\]\]/gi,this[_0x639386(0x321)](_0x2f7234,_0x139759)),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[REWARDS\]\]/gi,this[_0x639386(0x282)](_0x2f7234,_0x139759)),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[SUBTEXT\]\]/gi,this[_0x639386(0x1f1)](_0x139759)),_0x57fee8=_0x57fee8[_0x639386(0x327)](/\[\[QUOTE\]\]/gi,this['createQuestQuote'](_0x139759)),_0x57fee8=VisuMZ[_0x639386(0x351)][_0x639386(0x182)](_0x57fee8),_0x57fee8=VisuMZ['QuestSystem'][_0x639386(0x194)](_0x57fee8),_0x57fee8[_0x639386(0x25e)]();},Window_QuestLog[_0x3f33dd(0x202)]['getQuestLogFmt']=function(){const _0xe8e274=_0x3f33dd;return TextManager[_0xe8e274(0x1b1)];},Window_QuestLog[_0x3f33dd(0x202)]['createQuestDescription']=function(_0x5eb078){const _0x11a1b1=_0x3f33dd;let _0x5bf12f=$gameSystem[_0x11a1b1(0x200)](_0x5eb078);return _0x5bf12f=VisuMZ[_0x11a1b1(0x351)]['finalizeWordWrapSupport'](_0x5bf12f),_0x5bf12f[_0x11a1b1(0x25e)]();},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x321)]=function(_0x2d3cd6,_0x2624f7){const _0x16fd4d=_0x3f33dd,_0x129ae6=[],_0x202177=$gameSystem['questObjectives'](_0x2624f7),_0x587609=$gameSystem['questObjectivesCompleted'](_0x2624f7),_0x4c501c=$gameSystem[_0x16fd4d(0x2cf)](_0x2624f7),_0x2857bf=_0x202177[_0x16fd4d(0x2ab)](_0x587609)[_0x16fd4d(0x2ab)](_0x4c501c)['sort']((_0xa8640e,_0x48df81)=>_0xa8640e-_0x48df81);for(const _0x5cd1b6 of _0x2857bf){if(!_0x2d3cd6[_0x16fd4d(0x179)][_0x5cd1b6])continue;const _0x46a2de=_0x2d3cd6['Objectives'][_0x5cd1b6];let _0x2b2bf4=TextManager['questObjectiveNormalFmt'];if(_0x587609['includes'](_0x5cd1b6))_0x2b2bf4=TextManager[_0x16fd4d(0x174)];if(_0x4c501c[_0x16fd4d(0x1b8)](_0x5cd1b6))_0x2b2bf4=TextManager[_0x16fd4d(0x19c)];_0x129ae6[_0x16fd4d(0x2c3)](VisuMZ[_0x16fd4d(0x351)]['applyWordWrapEntry'](_0x2b2bf4['format'](_0x46a2de)[_0x16fd4d(0x25e)]()));}let _0x450e84=VisuMZ[_0x16fd4d(0x351)][_0x16fd4d(0x1dc)](_0x129ae6);return _0x450e84;},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x282)]=function(_0x31d1e3,_0x221ba2){const _0x378944=_0x3f33dd,_0x2d2c24=[],_0x1b5af4=$gameSystem[_0x378944(0x220)](_0x221ba2),_0x589486=$gameSystem['questRewardsClaimed'](_0x221ba2),_0x7f4f36=$gameSystem[_0x378944(0x197)](_0x221ba2),_0x10520c=_0x1b5af4[_0x378944(0x2ab)](_0x589486)[_0x378944(0x2ab)](_0x7f4f36)[_0x378944(0x21d)]((_0x1e96ee,_0x9ec814)=>_0x1e96ee-_0x9ec814);for(const _0x619f04 of _0x10520c){if(!_0x31d1e3[_0x378944(0x26e)][_0x619f04])continue;const _0x4fd8b5=_0x31d1e3['Rewards'][_0x619f04];let _0x273781=TextManager[_0x378944(0x27a)];if(_0x589486[_0x378944(0x1b8)](_0x619f04))_0x273781=TextManager[_0x378944(0x34a)];if(_0x7f4f36[_0x378944(0x1b8)](_0x619f04))_0x273781=TextManager['questRewardsDeniedFmt'];_0x2d2c24['push'](VisuMZ[_0x378944(0x351)]['applyWordWrapEntry'](_0x273781['format'](_0x4fd8b5)[_0x378944(0x25e)]()));}let _0x54e7a0=VisuMZ[_0x378944(0x351)][_0x378944(0x1dc)](_0x2d2c24);return _0x54e7a0;},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x1f1)]=function(_0x59b819){const _0x34ef35=_0x3f33dd;let _0x174dc3=$gameSystem[_0x34ef35(0x172)](_0x59b819);return _0x174dc3=VisuMZ[_0x34ef35(0x351)][_0x34ef35(0x182)](_0x174dc3),_0x174dc3['trim']();},Window_QuestLog[_0x3f33dd(0x202)][_0x3f33dd(0x346)]=function(_0x2fcb4c){const _0x63c3ef=_0x3f33dd;let _0x117a36=$gameSystem['questQuote'](_0x2fcb4c);return _0x117a36=VisuMZ[_0x63c3ef(0x351)][_0x63c3ef(0x182)](_0x117a36),_0x117a36[_0x63c3ef(0x25e)]();};function Window_QuestTracker(){const _0x42921b=_0x3f33dd;this[_0x42921b(0x1c7)](...arguments);}Window_QuestTracker[_0x3f33dd(0x202)]=Object[_0x3f33dd(0x19a)](Window_QuestLog[_0x3f33dd(0x202)]),Window_QuestTracker[_0x3f33dd(0x202)]['constructor']=Window_QuestTracker,Window_QuestTracker[_0x3f33dd(0x17e)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)]['Window']['TrackerWindow_Scale'],Window_QuestTracker[_0x3f33dd(0x1cb)]=VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x189)][_0x3f33dd(0x289)][_0x3f33dd(0x25b)],Window_QuestTracker[_0x3f33dd(0x202)]['initialize']=function(_0x526097){const _0x485958=_0x3f33dd;Window_QuestLog[_0x485958(0x202)][_0x485958(0x1c7)][_0x485958(0x25c)](this,_0x526097),this[_0x485958(0x2d2)]($gameSystem['trackedQuest']()),this['scale']['x']=this[_0x485958(0x17e)]['y']=Window_QuestTracker[_0x485958(0x17e)],this[_0x485958(0x1da)]();},Window_QuestTracker['prototype']['contentsHeight']=function(){const _0x47000e=_0x3f33dd;return this[_0x47000e(0x1b0)]||0x0;},Window_QuestTracker[_0x3f33dd(0x202)][_0x3f33dd(0x21e)]=function(){return'';},Window_QuestTracker[_0x3f33dd(0x202)]['getQuestLogFmt']=function(){const _0x3bba9c=_0x3f33dd;return TextManager[_0x3bba9c(0x1b5)];},Window_QuestTracker[_0x3f33dd(0x202)][_0x3f33dd(0x322)]=function(){const _0x1183ea=_0x3f33dd;this['height']=this[_0x1183ea(0x1fc)]()+$gameSystem[_0x1183ea(0x225)]()*0x2,Window_QuestLog['prototype']['createContents'][_0x1183ea(0x25c)](this);},Window_QuestTracker[_0x3f33dd(0x202)][_0x3f33dd(0x2d2)]=function(_0xbe815c){const _0x39dc77=_0x3f33dd;if(this[_0x39dc77(0x1c3)]===_0xbe815c)return;this[_0x39dc77(0x1c3)]=_0xbe815c,this[_0x39dc77(0x223)]();},Window_QuestTracker[_0x3f33dd(0x202)][_0x3f33dd(0x223)]=function(){const _0x4b7442=_0x3f33dd;if($gameTemp['_questTrackerRefresh'])return;$gameTemp[_0x4b7442(0x301)]=!![],Window_QuestLog[_0x4b7442(0x202)][_0x4b7442(0x223)][_0x4b7442(0x25c)](this),this[_0x4b7442(0x334)](this[_0x4b7442(0x1c3)]?Window_QuestTracker[_0x4b7442(0x1cb)]:0x2),$gameTemp[_0x4b7442(0x301)]=![];},Window_QuestTracker[_0x3f33dd(0x202)][_0x3f33dd(0x1e2)]=function(){const _0x43d1eb=_0x3f33dd;Window_QuestLog[_0x43d1eb(0x202)][_0x43d1eb(0x1e2)][_0x43d1eb(0x25c)](this),this[_0x43d1eb(0x1da)]();},Window_QuestTracker[_0x3f33dd(0x202)][_0x3f33dd(0x1da)]=function(){const _0x5efa67=_0x3f33dd,_0x5b0f4a=this[_0x5efa67(0x2ff)]();this['openness']=_0x5b0f4a;},Window_QuestTracker[_0x3f33dd(0x202)][_0x3f33dd(0x2ff)]=function(){const _0x2dc296=_0x3f33dd;if(!ConfigManager[_0x2dc296(0x1f6)])return 0x0;if($gameTemp[_0x2dc296(0x32b)]){if(_0x2dc296(0x2c8)!==_0x2dc296(0x2c8)){function _0x251ddc(){const _0x505ba9=_0x2dc296;_0x154587['prototype'][_0x505ba9(0x1e2)][_0x505ba9(0x25c)](this),this[_0x505ba9(0x2f5)]();}}else return 0x0;}const _0x298358=SceneManager[_0x2dc296(0x1ba)];if(_0x298358&&_0x298358['_messageWindow']){if(_0x2dc296(0x2cb)===_0x2dc296(0x176)){function _0x1406cf(){return _0x39fc04;}}else{if(_0x298358['_messageWindow']['openness']>0x0)return 0x0;}}if(!this[_0x2dc296(0x1c3)])return 0x0;return $gameSystem[_0x2dc296(0x204)]()?0xff:0x0;},VisuMZ['QuestSystem'][_0x3f33dd(0x182)]=function(_0x3d9416){const _0x207552=_0x3f33dd;if(!Window_QuestLog[_0x207552(0x1e1)])return _0x3d9416;if(!Imported['VisuMZ_1_MessageCore'])return _0x3d9416;return _0x3d9416=_0x207552(0x279)[_0x207552(0x2ef)](_0x3d9416),_0x3d9416;},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x194)]=function(_0x44544b){const _0x5cca77=_0x3f33dd;if(Imported[_0x5cca77(0x1c9)])return _0x44544b;return _0x44544b=_0x44544b[_0x5cca77(0x327)](/<COLORLOCK>/gi,''),_0x44544b=_0x44544b['replace'](/<\/COLORLOCK>/gi,''),_0x44544b;},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x1b2)]=function(_0x5c93e1){const _0x467b3c=_0x3f33dd;if(!Window_QuestLog[_0x467b3c(0x1e1)]){if('nQYDq'===_0x467b3c(0x2ac)){function _0x1907bd(){const _0x5cd181=_0x467b3c,_0x4ffeca=this[_0x5cd181(0x1be)](),_0x5779bc=new _0x34cb0b(_0x4ffeca);_0x5779bc['setHandler'](_0x5cd181(0x183),this[_0x5cd181(0x310)]['bind'](this)),_0x5779bc[_0x5cd181(0x228)](_0x5cd181(0x17a),this[_0x5cd181(0x309)][_0x5cd181(0x2f1)](this)),_0x5779bc['setHandler']('cancel',this[_0x5cd181(0x240)][_0x5cd181(0x2f1)](this)),this[_0x5cd181(0x238)](_0x5779bc),this[_0x5cd181(0x2c4)]=_0x5779bc,_0x5779bc[_0x5cd181(0x334)](_0x1a8f5d['QuestSystem'][_0x5cd181(0x189)][_0x5cd181(0x289)][_0x5cd181(0x302)]),this['_commandWindow']['setListWindow'](this[_0x5cd181(0x2c4)]),this[_0x5cd181(0x2c4)][_0x5cd181(0x2d1)](this[_0x5cd181(0x1a0)]),this[_0x5cd181(0x2c4)][_0x5cd181(0x350)](this['_logWindow']);}}else return _0x5c93e1['replace'](/<(?:BR|LINEBREAK)>/gi,'');}if(!Imported[_0x467b3c(0x1c9)]){if(_0x467b3c(0x345)===_0x467b3c(0x345))return _0x5c93e1[_0x467b3c(0x327)](/<(?:BR|LINEBREAK)>/gi,'');else{function _0x284538(){const _0x352591=_0x467b3c;return _0x2bb3c3=_0x5d37cd['toUpperCase']()[_0x352591(0x25e)](),_0x5e9486[_0x352591(0x351)][_0x352591(0x1d5)][_0x3a2b67];}}}if(VisuMZ['MessageCore'][_0x467b3c(0x189)][_0x467b3c(0x2a9)][_0x467b3c(0x196)])_0x5c93e1=_0x5c93e1[_0x467b3c(0x327)](/[\n\r]+/g,'\x1bWrapBreak[0]');else{if(_0x467b3c(0x1eb)!==_0x467b3c(0x1eb)){function _0x1aa2c6(){_0x24cf26['_scene']['refreshQuestTrackerWindow']();}}else _0x5c93e1=_0x5c93e1[_0x467b3c(0x327)](/[\n\r]+/g,'');}return _0x5c93e1;},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x239)]=function(_0x3ae3fd){const _0x54e658=_0x3f33dd;if(!Window_QuestLog[_0x54e658(0x1e1)])return _0x3ae3fd;if(!Imported[_0x54e658(0x1c9)])return _0x3ae3fd;return _0x3ae3fd[_0x54e658(0x25e)]()[_0x54e658(0x327)](/[\n\r]/g,'<BR>');},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x2b6)]=function(_0x319be7){const _0x52fc04=_0x3f33dd;if(!Window_QuestLog['wordWrapSupport'])return _0x319be7;if(!Imported['VisuMZ_1_MessageCore'])return _0x319be7;return VisuMZ['QuestSystem'][_0x52fc04(0x1b2)](_0x319be7[_0x52fc04(0x25e)]());},VisuMZ[_0x3f33dd(0x351)][_0x3f33dd(0x1dc)]=function(_0x23f264){const _0x54adb=_0x3f33dd;if(!Window_QuestLog['wordWrapSupport'])return _0x23f264['join']('\x0a')[_0x54adb(0x25e)]();if(!Imported[_0x54adb(0x1c9)])return _0x23f264[_0x54adb(0x296)]('\x0a')['trim']();return _0x23f264['join']('<BR>')[_0x54adb(0x25e)]();},totalQuestsAvailable=function(){const _0xb8adf5=_0x3f33dd;return $gameSystem['questData']()[_0xb8adf5(0x2dc)][_0xb8adf5(0x247)];},totalQuestsCompleted=function(){const _0x7a8a=_0x3f33dd;return $gameSystem[_0x7a8a(0x195)]()[_0x7a8a(0x269)][_0x7a8a(0x247)];},totalQuestsFailed=function(){const _0x41c6c9=_0x3f33dd;return $gameSystem[_0x41c6c9(0x195)]()[_0x41c6c9(0x1fb)][_0x41c6c9(0x247)];},totalQuestsRevealed=function(){return totalQuestsAvailable()+totalQuestsCompleted()+totalQuestsFailed();},totalQuestsInGame=function(){const _0x186ed6=_0x3f33dd;return VisuMZ[_0x186ed6(0x351)][_0x186ed6(0x341)][_0x186ed6(0x247)];},getQuestDescriptionIndex=function(_0x29aba1){const _0x5be9a4=_0x3f33dd;_0x29aba1=_0x29aba1['toUpperCase']()[_0x5be9a4(0x25e)]();const _0x11e8f1=$gameSystem[_0x5be9a4(0x17a)](_0x29aba1);if(!_0x11e8f1)return-0x1;$gameSystem[_0x5be9a4(0x200)](_0x29aba1);const _0x5cf7e4=$gameSystem['questData']()[_0x5be9a4(0x203)];return _0x5cf7e4[_0x29aba1]||0x0;},totalVisibleQuestObjectives=function(_0x228149){const _0x27c471=_0x3f33dd;_0x228149=_0x228149[_0x27c471(0x1f7)]()[_0x27c471(0x25e)]();const _0x4940e6=$gameSystem[_0x27c471(0x17a)](_0x228149);if(!_0x4940e6)return-0x1;$gameSystem[_0x27c471(0x1b3)](_0x228149);const _0x3e577f=$gameSystem[_0x27c471(0x195)]()[_0x27c471(0x1af)]||{};if(!_0x3e577f[_0x228149])return 0x0;return _0x3e577f[_0x228149][_0x27c471(0x247)];},totalQuestObjectives=function(_0x113ced){const _0x7e6ea5=_0x3f33dd;_0x113ced=_0x113ced[_0x7e6ea5(0x1f7)]()[_0x7e6ea5(0x25e)]();const _0x23cf46=$gameSystem[_0x7e6ea5(0x17a)](_0x113ced);return _0x23cf46?_0x23cf46[_0x7e6ea5(0x179)]['length']-0x1:0x0;},totalVisibleQuestRewards=function(_0x57cc27){const _0x46e1ca=_0x3f33dd;_0x57cc27=_0x57cc27[_0x46e1ca(0x1f7)]()[_0x46e1ca(0x25e)]();const _0x2a993a=$gameSystem[_0x46e1ca(0x17a)](_0x57cc27);if(!_0x2a993a)return-0x1;$gameSystem[_0x46e1ca(0x220)](_0x57cc27);const _0x31f148=$gameSystem[_0x46e1ca(0x195)]()['rewards']||{};if(!_0x31f148[_0x57cc27])return 0x0;return _0x31f148[_0x57cc27]['length'];},totalQuestRewards=function(_0x591882){const _0x1fc29d=_0x3f33dd;_0x591882=_0x591882['toUpperCase']()[_0x1fc29d(0x25e)]();const _0x53121d=$gameSystem[_0x1fc29d(0x17a)](_0x591882);return _0x53121d?_0x53121d[_0x1fc29d(0x26e)]['length']-0x1:0x0;},getQuestSubtextIndex=function(_0xec040c){const _0x10fcb9=_0x3f33dd;_0xec040c=_0xec040c[_0x10fcb9(0x1f7)]()[_0x10fcb9(0x25e)]();const _0x4948a3=$gameSystem[_0x10fcb9(0x17a)](_0xec040c);if(!_0x4948a3)return-0x1;$gameSystem[_0x10fcb9(0x172)](_0xec040c);const _0x20fa7f=$gameSystem[_0x10fcb9(0x195)]()[_0x10fcb9(0x1cc)];return _0x20fa7f[_0xec040c]||0x0;},getQuestQuoteIndex=function(_0x53bf86){const _0x6b744b=_0x3f33dd;_0x53bf86=_0x53bf86[_0x6b744b(0x1f7)]()[_0x6b744b(0x25e)]();const _0x4201e7=$gameSystem[_0x6b744b(0x17a)](_0x53bf86);if(!_0x4201e7)return-0x1;$gameSystem[_0x6b744b(0x19e)](_0x53bf86);const _0x52e367=$gameSystem[_0x6b744b(0x195)]()[_0x6b744b(0x1c6)];return _0x52e367[_0x53bf86]||0x0;},isQuestObjectiveCompleted=function(_0x2cbfc7,_0x2be850){const _0x478ad0=_0x3f33dd;_0x2cbfc7=_0x2cbfc7['toUpperCase']()[_0x478ad0(0x25e)]();const _0x54dec3=$gameSystem[_0x478ad0(0x17a)](_0x2cbfc7);if(!_0x54dec3)return![];$gameSystem[_0x478ad0(0x1b3)](_0x2cbfc7);const _0x3f8359=$gameSystem['questData']()['objectivesCompleted'];if(!_0x3f8359[_0x2cbfc7])return![];return _0x3f8359[_0x2cbfc7]['includes'](_0x2be850);},isQuestObjectiveFailed=function(_0x4e6ca3,_0x20e76c){const _0x30b2df=_0x3f33dd;_0x4e6ca3=_0x4e6ca3[_0x30b2df(0x1f7)]()['trim']();const _0x3059fc=$gameSystem[_0x30b2df(0x17a)](_0x4e6ca3);if(!_0x3059fc)return![];$gameSystem[_0x30b2df(0x1b3)](_0x4e6ca3);const _0x1b5415=$gameSystem[_0x30b2df(0x195)]()['objectivesFailed'];if(!_0x1b5415[_0x4e6ca3])return![];return _0x1b5415[_0x4e6ca3][_0x30b2df(0x1b8)](_0x20e76c);},isQuestObjectiveUncleared=function(_0x56ad91,_0x27ffe0){const _0x45c624=_0x3f33dd;_0x56ad91=_0x56ad91[_0x45c624(0x1f7)]()[_0x45c624(0x25e)]();const _0xc297f3=$gameSystem[_0x45c624(0x17a)](_0x56ad91);if(!_0xc297f3)return![];$gameSystem[_0x45c624(0x1b3)](_0x56ad91);const _0x3ee502=$gameSystem[_0x45c624(0x195)]()[_0x45c624(0x1af)];if(!_0x3ee502[_0x56ad91])return![];return _0x3ee502[_0x56ad91][_0x45c624(0x1b8)](_0x27ffe0);},isQuestRewardClaimed=function(_0x324cdf,_0x1b96ea){const _0x3f2da5=_0x3f33dd;_0x324cdf=_0x324cdf[_0x3f2da5(0x1f7)]()[_0x3f2da5(0x25e)]();const _0x362040=$gameSystem['quest'](_0x324cdf);if(!_0x362040)return![];$gameSystem['questRewards'](_0x324cdf);const _0x398eb1=$gameSystem['questData']()[_0x3f2da5(0x258)];if(!_0x398eb1[_0x324cdf])return![];return _0x398eb1[_0x324cdf]['includes'](_0x1b96ea);},isQuestRewardDenied=function(_0xdeb107,_0x4bafb3){const _0x52fd2a=_0x3f33dd;_0xdeb107=_0xdeb107[_0x52fd2a(0x1f7)]()['trim']();const _0x16cdc7=$gameSystem[_0x52fd2a(0x17a)](_0xdeb107);if(!_0x16cdc7)return![];$gameSystem[_0x52fd2a(0x220)](_0xdeb107);const _0x2a7888=$gameSystem[_0x52fd2a(0x195)]()[_0x52fd2a(0x266)];if(!_0x2a7888[_0xdeb107])return![];return _0x2a7888[_0xdeb107][_0x52fd2a(0x1b8)](_0x4bafb3);},isQuestRewardUnclaimed=function(_0x5dab47,_0x2df772){const _0x5cb28a=_0x3f33dd;_0x5dab47=_0x5dab47[_0x5cb28a(0x1f7)]()[_0x5cb28a(0x25e)]();const _0x51fdf4=$gameSystem[_0x5cb28a(0x17a)](_0x5dab47);if(!_0x51fdf4)return![];$gameSystem[_0x5cb28a(0x220)](_0x5dab47);const _0x5162fb=$gameSystem['questData']()['rewards'];if(!_0x5162fb[_0x5dab47])return![];return _0x5162fb[_0x5dab47][_0x5cb28a(0x1b8)](_0x2df772);};