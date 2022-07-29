/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/encyclopedia/
 * @target MZ
 * @plugindesc Creates an encyclopedia scene for your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.2.1
 * ----------------------------------------------------------------------------
 * Description: This plugin creates a powerful encyclopedia for your game,
 * with default categories including bestiary, items, armors, weapons, skills,
 * and states. It can also handle as many custom categories as desired with
 * their own custom entries.
 * ----------------------------------------------------------------------------
 * Documentation:
 * To easily call the encyclopedia from the main menu, use CGMZ Menu Command 
 * Window and use the following script in its parameters:
 * SceneManager.push(CGMZ_Scene_Encyclopedia);
 * 
 * This plugin supports the following Plugin Commands:
 * Discover Enemy: This command discovers the enemy with the ID provided
 * Discover Item: This command discovers the item with the ID provided
 * Discover Weapon: This command discovers the weapon with the ID provided
 * Discover Armor: This command discovers the armor with the ID provided
 * Discover Skill: This command discovers the skill with the ID provided
 * Discover State: This command discovers the state with the ID provided
 * Discover Custom: This command discovers the custom entry with the ID and 
 * symbol provided
 *
 * Call Scene: This command will call the encyclopedia scene.
 *
 * Reinitialize: This command reinitializes ALL encyclopedia data as if you
 * had started a new game.
 *
 * Custom categories must be manually tracked. Default categories (bestiary,
 * item, weapon, armor, skill, state) will all be automatically tracked if
 * included except for some uncommon circumstances.
 *
 * This plugin supports the following notetags:
 * <cgmzdesc:[description]> - Puts a "note" in the encyclopedia display page
 *
 * <cgmzencyclopediahide> - Does not include the item in the encyclopedia
 *
 * Large Icon Multiplier Option Help:
 * This option changes the size of the icon displayed by default for items,
 * armors, weapons, states, and skills. It displaces text to the right based
 * on its height. Here are some common multiplier sizes that play nice with
 * text:
 * Lines displaced: 1, use multiplier size: 1.1
 * Lines displaced: 2, use multiplier size: 2.2
 * Lines displaced: 3, use multiplier size: 3.3
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1.0:
 * - Added additional checks during battle to discover enemies
 *
 * 1.1.1:
 * - Fixed totals window being too large in some cases
 * - Fixed list window items having no padding
 * - Fixed bug with the list window not scrolling up after cancel
 *
 * 1.1.2:
 * - This plugin now initiates a check for CGMZ Achievements after discovery
 *
 * 1.1.3:
 * - Fixed a bug with TP Gain effects being drawn over Item descriptions
 * - Whitespace is now trimmed from the currency unit for the heading in bestiary
 *
 * 1.2.0:
 * - New entries and custom data are now automatically recognized in saved games
 * - Added ability to use text codes in descriptions, categories, and item lists
 * - Added option to change label text color
 * - Added option to change text alignment of totals window
 * - Added option to customize category window height and column count
 * - Added plugin command to discover multiple entries at once
 * - Fixed bug with custom image size being incorrect for first draw
 * - Fixed display bug for items with learn skill effects
 * - Fixed display bug with Drop Item Double party effects
 * - Compatibility for VS Core (fix for weird window spacing)
 *
 * 1.2.1:
 * - Fixed bug with columns for other horizontal command windows
 * 
 * 1.2.2:
 * - Fixed bug with Include Categories (when set to OFF only) behaving weirdly.
 *
 * @command DiscoverEnemy
 * @text Discover Enemy
 * @desc Discovers an enemy manually in the encyclopedia
 *
 * @arg id
 * @type enemy
 * @desc The id number of the enemy to discover
 * @default 1
 *
 * @command DiscoverItem
 * @text Discover Item
 * @desc Discovers an item manually in the encyclopedia
 *
 * @arg id
 * @type item
 * @desc The id number of the item to discover
 * @default 1
 *
 * @command DiscoverArmor
 * @text Discover Armor
 * @desc Discovers an armor manually in the encyclopedia
 *
 * @arg id
 * @type armor
 * @desc The id number of the armor to discover
 * @default 1
 *
 * @command DiscoverWeapon
 * @text Discover Weapon
 * @desc Discovers a weapon manually in the encyclopedia
 *
 * @arg id
 * @type weapon
 * @desc The id number of the weapon to discover
 * @default 1
 *
 * @command DiscoverSkill
 * @text Discover Skill
 * @desc Discovers a skill manually in the encyclopedia
 *
 * @arg id
 * @type skill
 * @desc The id number of the skill to discover
 * @default 1
 *
 * @command DiscoverState
 * @text Discover State
 * @desc Discovers a state manually in the encyclopedia
 *
 * @arg id
 * @type state
 * @desc The id number of the state to discover
 * @default 1
 *
 * @command Discover Batch
 * @desc Discovers multiple entries.
 *
 * @arg enemies
 * @type enemy[]
 * @desc The id number of the enemies to discover
 * @default []
 *
 * @arg items
 * @type item[]
 * @desc The id number of the items to discover
 * @default []
 *
 * @arg weapons
 * @type weapon[]
 * @desc The id number of the weapons to discover
 * @default []
 *
 * @arg armors
 * @type armor[]
 * @desc The id number of the armors to discover
 * @default []
 *
 * @arg skills
 * @type skill[]
 * @desc The id number of the skills to discover
 * @default []
 *
 * @arg states
 * @type state[]
 * @desc The id number of the states to discover
 * @default []
 *
 * @command DiscoverCustom
 * @text Discover Custom
 * @desc Discovers a custom entry in the encyclopedia
 *
 * @arg id
 * @type number
 * @desc The id number of the entry to discover
 * @default 1
 *
 * @arg symbol
 * @desc The Category Symbol of the entry to discover
 * @default 
 *
 * @command Call Scene
 * @desc Calls the Encyclopedia Scene
 *
 * @command Reinitialize
 * @desc Resets all of the encyclopedia data. Use for saved games to recognize modified data
 *
 * @param Category Options
 * 
 * @param Include Bestiary
 * @type boolean
 * @desc Determines if the scene should include the bestiary part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Items
 * @type boolean
 * @desc Determines if the scene should include the items part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Armors
 * @type boolean
 * @desc Determines if the scene should include the armors part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Weapons
 * @type boolean
 * @desc Determines if the scene should include the weapons part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Skills
 * @type boolean
 * @desc Determines if the scene should include the skills part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include States
 * @type boolean
 * @desc Determines if the scene should include the states part of the encyclopedia
 * @default true
 * @parent Category Options
 *
 * @param Categories
 * @type struct<Category>[]
 * @default ["{\"Category Name\":\"Bestiary\",\"Category Symbol\":\"bestiary\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Bestiary\"}","{\"Category Name\":\"Items\",\"Category Symbol\":\"items\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Items\"}","{\"Category Name\":\"Armors\",\"Category Symbol\":\"armors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Armors\"}","{\"Category Name\":\"Weapons\",\"Category Symbol\":\"weapons\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Weapons\"}","{\"Category Name\":\"Skills\",\"Category Symbol\":\"skills\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Skills\"}","{\"Category Name\":\"States\",\"Category Symbol\":\"states\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"States\"}"]
 * @desc Categories for the encyclopedia to select from in the encyclopedia scene.
 * @parent Category Options
 *
 * @param Custom Entry Options
 *
 * @param Custom Entries
 * @parent Custom Entry Options
 * @type struct<Custom>[]
 * @default []
 * @desc Custom entries not already covered in the encyclopedia
 *
 * @param Encyclopedia Scene Options
 *
 * @param Unknown Entry
 * @desc Text to put in the list window for an unknown entry
 * @default ? ? ? ? ?
 * @parent Encyclopedia Scene Options
 *
 * @param Unknown Entry Display
 * @desc Text to put in the display window for an unknown entry
 * @default This has not yet been discovered.
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Text
 * @desc Text to put for the total completion %
 * @default Total:
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Rounding
 * @desc How many decimals to round to.
 * @type number
 * @min 1
 * @default 2
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the totals window
 * @default left
 *
 * @param List Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the list window
 * @default left
 *
 * @param List Window Enable Text Codes
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc Allow text codes in the list window? This will no longer automatically shrink text to fit
 * @default false
 *
 * @param Number Entries
 * @type boolean
 * @desc Number each entry in the list window?
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Categories Per Line
 * @type number
 * @min 1
 * @desc Amount of categories to display per line
 * @default 4
 * @parent Encyclopedia Scene Options
 *
 * @param Category Lines
 * @type number
 * @min 1
 * @desc Amount of lines to show before scrolling in category window
 * @default 1
 * @parent Encyclopedia Scene Options
 *
 * @param Display Window Options
 *
 * @param Strip Newlines In Description
 * @type boolean
 * @desc Replace newlines with a space in the description of items/etc?
 * @default true
 * @parent Display Window Options
 *
 * @param Scroll Wait
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Speed
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * @default 1
 *
 * @param Scroll Deceleration
 * @parent Display Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Display Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Large Icon Multiplier
 * @desc Determines the factor to increase the icon size by for a large icon
 * @type number
 * @decimals 1
 * @min 0.1
 * @default 3.3
 * @parent Display Window Options
 *
 * @param Text Options
 *
 * @param Label Color
 * @type number
 * @desc The color of the label / header text
 * @default 1
 * @min 0
 * @parent Text Options
 *
 * @param Yes Text
 * @desc Word to use for a yes answer
 * @default Yes
 * @parent Text Options
 *
 * @param No Text
 * @desc Word to use for a no answer
 * @default No
 * @parent Text Options
 *
 * @param Price Text
 * @desc Text to show when describing the price
 * @default Price:
 * @parent Text Options
 *
 * @param No Price Text
 * @desc Text to show when describing the price when the item is unsellable
 * @default Not for sale
 * @parent Text Options
 *
 * @param Key Item Text
 * @desc Text to show when describing a key item or not key item
 * @default Key Item:
 * @parent Text Options
 *
 * @param Possession Text
 * @desc Text to show when describing how many of an item the player has
 * @default Possession:
 * @parent Text Options
 *
 * @param Equip Type Text
 * @desc Text to show when describing what slot the equipment goes in (equip type)
 * @default Equip Slot:
 * @parent Text Options
 *
 * @param Armor Type Text
 * @desc Text to show when describing what type of armor it is (armor type)
 * @default Armor Type:
 * @parent Text Options
 *
 * @param No Armor Type Text
 * @desc Text to show when armor has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Weapon Type Text
 * @desc Text to show when describing what type of weapon it is (weapon type)
 * @default Weapon Type:
 * @parent Text Options
 *
 * @param No Weapon Type Text
 * @desc Text to show when weapon has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Skill Type Text
 * @desc Text to show when describing what type of skill it is (skill type)
 * @default Skill Type:
 * @parent Text Options
 *
 * @param No Skill Type Text
 * @desc Text to show when skill has no type in database
 * @default Basic
 * @parent Text Options
 *
 * @param Drops Text
 * @desc Text to show when describing rewards from an enemy
 * @default Drops:
 * @parent Text Options
 *
 * @param Show Drop Chances
 * @desc Determine whether drop chances are shown in the encyclopedia
 * @type boolean
 * @default true
 * @parent Text Options
 *
 * @param Drop Chance Text
 * @desc Text to show when describing drop chance for an item
 * @default Chance:
 * @parent Text Options
 *
 * @param Sketch Text
 * @desc Text to show when describing a sketch for an item
 * @default Sketch:
 * @parent Text Options
 *
 * @param Note Text
 * @desc Text to describe what is found in meta notes
 * @default Note:
 * @parent Text Options
 *
 * @param Success Rate Text
 * @desc Text to describe success rate of an item
 * @default Success Rate:
 * @parent Text Options
 *
 * @param Consumable Text
 * @desc Text to describe whether an item is consumable
 * @default Consumable:
 * @parent Text Options
 *
 * @param Effects Text
 * @desc Text to describe effects
 * @default Item Effects:
 * @parent Text Options
 *
 * @param HP Effect Text
 * @desc Text to describe when an item has an HP effect
 * @default HP Effect:
 * @parent Text Options
 *
 * @param MP Effect Text
 * @desc Text to describe when an item has an MP effect
 * @default MP Effect:
 * @parent Text Options
 *
 * @param TP Effect Text
 * @desc Text to describe when an item has a TP effect
 * @default TP Effect:
 * @parent Text Options
 *
 * @param Add State Text
 * @desc Text to describe when an item has an add state effect
 * @default Causes:
 * @parent Text Options
 *
 * @param Remove State Text
 * @desc Text to describe when an item has a remove state effect
 * @default Cures:
 * @parent Text Options
 *
 * @param Add Buff Text
 * @desc Text to describe when an item has a buff effect
 * @default Buffs:
 * @parent Text Options
 *
 * @param Add Debuff Text
 * @desc Text to describe when an item has a debuff effect
 * @default Debuffs:
 * @parent Text Options
 *
 * @param Remove Buff Text
 * @desc Text to describe when an item removes a buff effect
 * @default Remove Buffs:
 * @parent Text Options
 *
 * @param Remove Debuff Text
 * @desc Text to describe when an item removes a debuff effect
 * @default Clear Debuffs:
 * @parent Text Options
 *
 * @param Grow Text
 * @desc Text to describe when an item has a grow effect
 * @default Trains:
 * @parent Text Options
 *
 * @param Learn Spell Text
 * @desc Text to describe when an item has a learn skill effect
 * @default Teaches:
 * @parent Text Options
 *
 * @param Party Ability Text
 * @desc Text to describe when an armor or weapon has a party ability trait
 * @default Special Effect:
 * @parent Text Options
 *
 * @param Half Encounter Text
 * @desc Text to describe party ability half encounter
 * @default Half Encounter Rate
 * @parent Text Options
 *
 * @param No Encounter Text
 * @desc Text to describe party ability no encounter
 * @default No Encounters
 * @parent Text Options
 *
 * @param Cancel Surprise Text
 * @desc Text to describe party ability cancel surprise
 * @default Cancel Surprise
 * @parent Text Options
 *
 * @param Raise Preemptive Text
 * @desc Text to describe party ability raise preemptive
 * @default Raise Preemptive
 * @parent Text Options
 *
 * @param Gold Double Text
 * @desc Text to describe party ability gold double
 * @default 2x Gold Drops
 * @parent Text Options
 *
 * @param Drop Item Double Text
 * @desc Text to describe party ability drop item double
 * @default 2x Item Drops
 * @parent Text Options
 *
 * @param Description Text
 * @desc Text to describe item description
 * @default Description:
 * @parent Text Options
 *
 * @param Element Text
 * @desc Text to describe attack element trait
 * @default Element:
 * @parent Text Options
 *
 * @param Attack Speed Text
 * @desc Text to describe attack speed trait
 * @default Speed Effect:
 * @parent Text Options
 *
 * @param Attack Times Text
 * @desc Text to describe attack times + trait
 * @default Additional Attacks:
 * @parent Text Options
 *
 * @param Attack State Text
 * @desc Text to describe attack apply state trait
 * @default Applies:
 * @parent Text Options
 *
 * @param MP Cost Text
 * @desc Text to describe MP Cost
 * @default MP Cost:
 * @parent Text Options
 *
 * @param TP Cost Text
 * @desc Text to describe TP Cost
 * @default TP Cost:
 * @parent Text Options
 *
 * @param User TP Gain Text
 * @desc Text to describe user TP Gain
 * @default User TP Gain:
 * @parent Text Options
 *
 * @param Battle Removal Text
 * @desc Text to describe state removal after battle property
 * @default Removed after battle:
 * @parent Text Options
 *
 * @param Walking Removal Text
 * @desc Text to describe state removal after walking property
 * @default Removed after walking:
 * @parent Text Options
 *
 * @param Damage Removal Text
 * @desc Text to describe state removal after damage property
 * @default Removed after damage:
 * @parent Text Options
 *
 * @param Duration Text
 * @desc Text to describe state auto-removal duration
 * @default Duration:
 * @parent Text Options
 *
 * @param Infinite Text
 * @desc Text to describe when state not automatically removed after some number of turns
 * @default Infinite
 * @parent Text Options
 *
 * @param Turns Text
 * @desc Text to describe turns in battle
 * @default Turns
 * @parent Text Options
 *
 * @param Seal Skill Types Text
 * @desc Text to describe trait that seals skill types
 * @default Locks:
 * @parent Text Options
 *
 * @param Add Skill Types Text
 * @desc Text to describe trait that adds skill types
 * @default Unlocks:
 * @parent Text Options
 *
 * @param Seal Skill Text
 * @desc Text to describe trait that seals skills
 * @default Locks:
 * @parent Text Options
 *
 * @param Add Skill Text
 * @desc Text to describe trait that adds skills
 * @default Grants:
 * @parent Text Options
 *
 * @param State Resist Text
 * @desc Text to describe trait that resists states
 * @default Resists:
 * @parent Text Options
 *
 * @param Learn Skill Text
 * @desc Text to describe effect that learns a skill
 * @default Learns:
 * @parent Text Options
*/
/*~struct~Category:
 * @param Category Name
 * @desc Text to show for category name in total window
 * 
 * @param Category Symbol
 * @desc Internal recognition of category, see documentation for help
 *
 * @param Category Display Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to show up in category window
 * 
 * @param Category Enable Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to be enabled and selectable
 *
 * @param Command Text
 * @desc Text to show for category in command window
 */
 /*~struct~Requirements:
 * @param Item
 * @type item
 * 
 * @param Switch
 * @type switch
 */
  /*~struct~Custom:
 * @param Name
 * @desc The entry name.
 * 
 * @param Category Symbol
 * @desc Category this entry belongs to.
 *
 * @param Description
 * @type note
 * @desc Description to display for the entry.
 * 
 * @param Sketch
 * @dir img/
 * @type file
 * @desc image to show at bottom of entry.
 */
var Imported = Imported || {};
Imported.CGMZ_Encyclopedia = true;
var CGMZ = CGMZ || {};
CGMZ.Encyclopedia = CGMZ.Encyclopedia || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Encyclopedia and Bestiary"] = "1.2.2";
CGMZ.Encyclopedia.parameters = PluginManager.parameters('CGMZ_Encyclopedia');
CGMZ.Encyclopedia.IncludeBestiary = (CGMZ.Encyclopedia.parameters["Include Bestiary"] === "true");
CGMZ.Encyclopedia.IncludeItems = (CGMZ.Encyclopedia.parameters["Include Items"] === "true");
CGMZ.Encyclopedia.IncludeArmors = (CGMZ.Encyclopedia.parameters["Include Armors"] === "true");
CGMZ.Encyclopedia.IncludeWeapons = (CGMZ.Encyclopedia.parameters["Include Weapons"] === "true");
CGMZ.Encyclopedia.IncludeSkills = (CGMZ.Encyclopedia.parameters["Include Skills"] === "true");
CGMZ.Encyclopedia.IncludeStates = (CGMZ.Encyclopedia.parameters["Include States"] === "true");
CGMZ.Encyclopedia.NumberEntries = (CGMZ.Encyclopedia.parameters["Number Entries"] === "true");
CGMZ.Encyclopedia.ShowDropChances = (CGMZ.Encyclopedia.parameters["Show Drop Chances"] === "true");
CGMZ.Encyclopedia.UnknownEntry = CGMZ.Encyclopedia.parameters["Unknown Entry"];
CGMZ.Encyclopedia.UnknownEntryDisplay = CGMZ.Encyclopedia.parameters["Unknown Entry Display"];
CGMZ.Encyclopedia.TotalText = CGMZ.Encyclopedia.parameters["Total Window Text"];
CGMZ.Encyclopedia.PriceText = CGMZ.Encyclopedia.parameters["Price Text"];
CGMZ.Encyclopedia.NoPriceText = CGMZ.Encyclopedia.parameters["No Price Text"];
CGMZ.Encyclopedia.KeyItemText = CGMZ.Encyclopedia.parameters["Key Item Text"];
CGMZ.Encyclopedia.PossessionText = CGMZ.Encyclopedia.parameters["Possession Text"];
CGMZ.Encyclopedia.EquipTypeText = CGMZ.Encyclopedia.parameters["Equip Type Text"];
CGMZ.Encyclopedia.ArmorTypeText = CGMZ.Encyclopedia.parameters["Armor Type Text"];
CGMZ.Encyclopedia.NoArmorTypeText = CGMZ.Encyclopedia.parameters["No Armor Type Text"];
CGMZ.Encyclopedia.WeaponTypeText = CGMZ.Encyclopedia.parameters["Weapon Type Text"];
CGMZ.Encyclopedia.NoWeaponTypeText = CGMZ.Encyclopedia.parameters["No Weapon Type Text"];
CGMZ.Encyclopedia.SkillTypeText = CGMZ.Encyclopedia.parameters["Skill Type Text"];
CGMZ.Encyclopedia.NoSkillTypeText = CGMZ.Encyclopedia.parameters["No Skill Type Text"];
CGMZ.Encyclopedia.DropsText = CGMZ.Encyclopedia.parameters["Drops Text"];
CGMZ.Encyclopedia.DropChanceText = CGMZ.Encyclopedia.parameters["Drop Chance Text"];
CGMZ.Encyclopedia.SketchText = CGMZ.Encyclopedia.parameters["Sketch Text"];
CGMZ.Encyclopedia.NoteText = CGMZ.Encyclopedia.parameters["Note Text"];
CGMZ.Encyclopedia.SuccessRateText = CGMZ.Encyclopedia.parameters["Success Rate Text"];
CGMZ.Encyclopedia.ConsumableText = CGMZ.Encyclopedia.parameters["Consumable Text"];
CGMZ.Encyclopedia.EffectsText = CGMZ.Encyclopedia.parameters["Effects Text"];
CGMZ.Encyclopedia.HPEffectText = CGMZ.Encyclopedia.parameters["HP Effect Text"];
CGMZ.Encyclopedia.MPEffectText = CGMZ.Encyclopedia.parameters["MP Effect Text"];
CGMZ.Encyclopedia.TPEffectText = CGMZ.Encyclopedia.parameters["TP Effect Text"];
CGMZ.Encyclopedia.AddStateText = CGMZ.Encyclopedia.parameters["Add State Text"];
CGMZ.Encyclopedia.RemoveStateText = CGMZ.Encyclopedia.parameters["Remove State Text"];
CGMZ.Encyclopedia.AddBuffText = CGMZ.Encyclopedia.parameters["Add Buff Text"];
CGMZ.Encyclopedia.AddDebuffText = CGMZ.Encyclopedia.parameters["Add Debuff Text"];
CGMZ.Encyclopedia.BuffRemovalText = CGMZ.Encyclopedia.parameters["Remove Buff Text"];
CGMZ.Encyclopedia.DebuffRemovalText = CGMZ.Encyclopedia.parameters["Remove Debuff Text"];
CGMZ.Encyclopedia.GrowText = CGMZ.Encyclopedia.parameters["Grow Text"];
CGMZ.Encyclopedia.LearnSkillText = CGMZ.Encyclopedia.parameters["Learn Skill Text"];
CGMZ.Encyclopedia.PartyAbilityText = CGMZ.Encyclopedia.parameters["Party Ability Text"];
CGMZ.Encyclopedia.HalfEncounterText = CGMZ.Encyclopedia.parameters["Half Encounter Text"];
CGMZ.Encyclopedia.NoEncounterText = CGMZ.Encyclopedia.parameters["No Encounter Text"];
CGMZ.Encyclopedia.CancelSurpriseText = CGMZ.Encyclopedia.parameters["Cancel Surprise Text"];
CGMZ.Encyclopedia.RaisePreemptiveText = CGMZ.Encyclopedia.parameters["Raise Preemptive Text"];
CGMZ.Encyclopedia.GoldDoubleText = CGMZ.Encyclopedia.parameters["Gold Double Text"];
CGMZ.Encyclopedia.DropItemDoubleText = CGMZ.Encyclopedia.parameters["Drop Item Double Text"];
CGMZ.Encyclopedia.DescriptionText = CGMZ.Encyclopedia.parameters["Description Text"];
CGMZ.Encyclopedia.ElementText = CGMZ.Encyclopedia.parameters["Element Text"];
CGMZ.Encyclopedia.AttackSpeedText = CGMZ.Encyclopedia.parameters["Attack Speed Text"];
CGMZ.Encyclopedia.AttackTimesText = CGMZ.Encyclopedia.parameters["Attack Times Text"];
CGMZ.Encyclopedia.AttackStateText = CGMZ.Encyclopedia.parameters["Attack State Text"];
CGMZ.Encyclopedia.MPCostText = CGMZ.Encyclopedia.parameters["MP Cost Text"];
CGMZ.Encyclopedia.TPCostText = CGMZ.Encyclopedia.parameters["TP Cost Text"];
CGMZ.Encyclopedia.UserTPGainText = CGMZ.Encyclopedia.parameters["User TP Gain Text"];
CGMZ.Encyclopedia.BattleRemovalText = CGMZ.Encyclopedia.parameters["Battle Removal Text"];
CGMZ.Encyclopedia.WalkingRemovalText = CGMZ.Encyclopedia.parameters["Walking Removal Text"];
CGMZ.Encyclopedia.DamageRemovalText = CGMZ.Encyclopedia.parameters["Damage Removal Text"];
CGMZ.Encyclopedia.DurationText = CGMZ.Encyclopedia.parameters["Duration Text"];
CGMZ.Encyclopedia.InfiniteText = CGMZ.Encyclopedia.parameters["Infinite Text"];
CGMZ.Encyclopedia.TurnsText = CGMZ.Encyclopedia.parameters["Turns Text"];
CGMZ.Encyclopedia.SealSkillTypesText = CGMZ.Encyclopedia.parameters["Seal Skill Types Text"];
CGMZ.Encyclopedia.AddSkillTypesText = CGMZ.Encyclopedia.parameters["Add Skill Types Text"];
CGMZ.Encyclopedia.SealSkillText = CGMZ.Encyclopedia.parameters["Seal Skill Text"];
CGMZ.Encyclopedia.AddSkillText = CGMZ.Encyclopedia.parameters["Add Skill Text"];
CGMZ.Encyclopedia.StateResistText = CGMZ.Encyclopedia.parameters["State Resist Text"];
CGMZ.Encyclopedia.YesText = CGMZ.Encyclopedia.parameters["Yes Text"];
CGMZ.Encyclopedia.NoText = CGMZ.Encyclopedia.parameters["No Text"];
CGMZ.Encyclopedia.DecimalSpots = Number(CGMZ.Encyclopedia.parameters["Total Window Rounding"]);
CGMZ.Encyclopedia.ScrollWait = Number(CGMZ.Encyclopedia.parameters["Scroll Wait"]);
CGMZ.Encyclopedia.ScrollSpeed = Number(CGMZ.Encyclopedia.parameters["Scroll Speed"]);
CGMZ.Encyclopedia.ScrollDeceleration = parseFloat(CGMZ.Encyclopedia.parameters["Scroll Deceleration"]);
CGMZ.Encyclopedia.AutoScroll = (CGMZ.Encyclopedia.parameters["Auto Scroll"] === "true");
CGMZ.Encyclopedia.LargeIconMultiplier = parseFloat(CGMZ.Encyclopedia.parameters["Large Icon Multiplier"]);
CGMZ.Encyclopedia.CategoriesPerLine = Number(CGMZ.Encyclopedia.parameters["Categories Per Line"]);
CGMZ.Encyclopedia.CategoryLines = Number(CGMZ.Encyclopedia.parameters["Category Lines"]);
CGMZ.Encyclopedia.LabelColor = Number(CGMZ.Encyclopedia.parameters["Label Color"]);
CGMZ.Encyclopedia.TotalWindowAlignment = CGMZ.Encyclopedia.parameters["Total Window Alignment"];
CGMZ.Encyclopedia.ListWindowTextAlignment = CGMZ.Encyclopedia.parameters["List Window Alignment"];
CGMZ.Encyclopedia.ListWindowEnableTextCodes = (CGMZ.Encyclopedia.parameters["List Window Enable Text Codes"] === 'true');
CGMZ.Encyclopedia.StripNewlinesInDescription = (CGMZ.Encyclopedia.parameters["Strip Newlines In Description"] === 'true');
CGMZ.Encyclopedia.Categories = JSON.parse(CGMZ.Encyclopedia.parameters["Categories"]);
CGMZ.Encyclopedia.CustomEntries = JSON.parse(CGMZ.Encyclopedia.parameters["Custom Entries"]);
//=============================================================================
// CGMZ_EncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the id and discovery of built-in encyclopedia classes
// such as enemies or items. Not for custom category data.
//=============================================================================
function CGMZ_EncyclopediaData(id, index) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_EncyclopediaData.prototype.initialize = function(id, index) {
	this._id = id;
	this._index = index;
	this._discovered = false;
};
//=============================================================================
// CGMZ_CustomEncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the data of custom entries in the encyclopedia
//=============================================================================
function CGMZ_CustomEncyclopediaData(id, data) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_CustomEncyclopediaData.prototype.initialize = function(id, data) {
	this._id = id+1;
	this._index = id+1;
	this._discovered = false;
	this._name = data.Name;
	this._sketch = (data.Sketch == "") ? null : "img/" + data.Sketch;
	this._description = JSON.parse(data.Description);
};
//=============================================================================
// CGMZ_Encyclopedia
//-----------------------------------------------------------------------------
// Store and manage encyclopedia data.
//=============================================================================
function CGMZ_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Encyclopedia
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initialize = function() {
	this._bestiary = [];
	this._items = [];
	this._armors = [];
	this._weapons = [];
	this._skills = [];
	this._states = [];
	this.initializeData(this._bestiary, $dataEnemies.length-1, 'bestiary'); // -1 because $data are not
	this.initializeData(this._items, $dataItems.length-1, 'items');        // 0-indexed, but have null
	this.initializeData(this._armors, $dataArmors.length-1, 'armors');    // for first value instead
	this.initializeData(this._weapons, $dataWeapons.length-1, 'weapons');
	this.initializeData(this._skills, $dataSkills.length-1, 'skills');
	this.initializeData(this._states, $dataStates.length-1, 'states');
	this._totalDiscovered = 0;
	this._bestiaryDiscovered = 0;
	this._itemsDiscovered = 0;
	this._armorsDiscovered = 0;
	this._weaponsDiscovered = 0;
	this._skillsDiscovered = 0;
	this._statesDiscovered = 0;
	this._customData = {};
	this._customDiscovered = {};
	this.initializeCustomData();
};
//-----------------------------------------------------------------------------
// Initialize any encyclopedia data array to all undiscovered.
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initializeData = function(array, length, symbol) {
	let gameData = null;
	switch(symbol) {
		case 'bestiary':
			if(!CGMZ.Encyclopedia.IncludeBestiary) return;
			gameData = $dataEnemies;
			break;
		case 'items':
			if(!CGMZ.Encyclopedia.IncludeItems) return;
			gameData = $dataItems;
			break;
		case 'armors':
			if(!CGMZ.Encyclopedia.IncludeArmors) return;
			gameData = $dataArmors;
			break;
		case 'weapons':
			if(!CGMZ.Encyclopedia.IncludeWeapons) return;
			gameData = $dataWeapons;
			break;
		case 'skills':
			if(!CGMZ.Encyclopedia.IncludeSkills) return;
			gameData = $dataSkills;
			break;
		case 'states':
			if(!CGMZ.Encyclopedia.IncludeStates) return;
			gameData = $dataStates;
	}
	let index = 1;
	for(let i = 0; i < length; i++) {
		if(gameData[i+1] && gameData[i+1].meta && gameData[i+1].meta.cgmzencyclopediahide) continue;
		const data = new CGMZ_EncyclopediaData(i+1, index); // i+1 because $data are not 0-indexed
		if(!array.find(entry => entry._id === data._id)) array.push(data);
		index++;
	}
};
//-----------------------------------------------------------------------------
// Initialize custom data
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initializeCustomData = function() {
	for(const customData of CGMZ.Encyclopedia.CustomEntries) {
		let data = JSON.parse(customData);
		let symbol = data["Category Symbol"];
		if(!this._customData.hasOwnProperty(symbol)) {
			this._customData[symbol] = [];
			this._customDiscovered[symbol] = 0;
		}
		let newObj = new CGMZ_CustomEncyclopediaData(this._customData[symbol].length, data);
		if(!this._customData[symbol].find(obj => obj._name === newObj._name)) {
			this._customData[symbol].push(newObj);
		}
	}
	this._totalEntries = this.calculateTotalEntries();
};
//-----------------------------------------------------------------------------
// Calculate total amount of entries
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.calculateTotalEntries = function() {
	let total = 0;
	if(CGMZ.Encyclopedia.IncludeBestiary) total += this._bestiary.length;
	if(CGMZ.Encyclopedia.IncludeItems) total += this._items.length;
	if(CGMZ.Encyclopedia.IncludeArmors) total += this._armors.length;
	if(CGMZ.Encyclopedia.IncludeWeapons) total += this._weapons.length;
	if(CGMZ.Encyclopedia.IncludeSkills) total += this._skills.length;
	if(CGMZ.Encyclopedia.IncludeStates) total += this._states.length;
	for(const symbol of Object.keys(this._customData)) {
		total += this._customData[symbol].length;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Processing a (potential) new discovery
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.processDiscovery = function(symbol, id) {
	symbol = symbol.toLowerCase();
	const dataArray = this.getEncyclopediaData(symbol);
	if(dataArray.length < 1) return;
	const dataObject = this.getEncyclopediaObject(dataArray, Number(id));
	if(dataObject && !dataObject._discovered) { // Actually is new discovery
		this._totalDiscovered++;
		switch(symbol) {
			case 'bestiary': this._bestiaryDiscovered++; break;
			case 'items': this._itemsDiscovered++; break;
			case 'armors': this._armorsDiscovered++; break;
			case 'weapons': this._weaponsDiscovered++; break;
			case 'skills': this._skillsDiscovered++; break;
			case 'states': this._statesDiscovered++; break;
			default: this._customDiscovered[symbol]++;
		}
		dataObject._discovered = true;
		if(Imported.CGMZ_Achievements) {
			$cgmz.checkAchievementEncyclopediaCriteria();
		}
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object from Array
// Possible that arrays are not in order of the ID, in this case it will find proper ID.
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getEncyclopediaObject = function(array, id) {
	return array.find(obj => obj._id === id);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getAmountDiscovered = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalDiscovered;
		case 'bestiary': return this._bestiaryDiscovered;
		case 'items': return this._itemsDiscovered;
		case 'armors': return this._armorsDiscovered;
		case 'weapons': return this._weaponsDiscovered;
		case 'skills': return this._skillsDiscovered;
		case 'states': return this._statesDiscovered;
		default: return (this._customDiscovered[symbol] || this._customDiscovered[symbol] === 0) ? this._customDiscovered[symbol] : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getAmountEntries = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalEntries;
		case 'bestiary': return this._bestiary.length;
		case 'items': return this._items.length;
		case 'armors': return this._armors.length;
		case 'weapons': return this._weapons.length;
		case 'skills': return this._skills.length;
		case 'states': return this._states.length;
		default: return (this._customData[symbol]) ? this._customData[symbol].length : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data
// Returns data array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getEncyclopediaData = function(symbol) {
	switch(symbol) {
		case 'bestiary': return this._bestiary;
		case 'items': return this._items;
		case 'armors': return this._armors;
		case 'weapons': return this._weapons;
		case 'skills': return this._skills;
		case 'states': return this._states;
		default: return (this._customData[symbol]) ? this._customData[symbol] : [];
	}
};
//-----------------------------------------------------------------------------
// Discover troop enemies
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverTroop = function(troopId) {
	if(!CGMZ.Encyclopedia.IncludeBestiary) return;
	const troop = $dataTroops[troopId];
	for(const member of troop.members) {
		if ($dataEnemies[member.enemyId]) {
			this.processDiscovery('bestiary', member.enemyId);
		}
	}
};
//-----------------------------------------------------------------------------
// Discover items, weapons, or armors
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverItem = function(id, symbol) {
	switch(symbol) {
		case 'item':
			if(!CGMZ.Encyclopedia.IncludeItems) return;
			this.processDiscovery('items', id);
			break;
		case 'weapon':
			if(!CGMZ.Encyclopedia.IncludeWeapons) return;
			this.processDiscovery('weapons', id);
			break;
		case 'armor':
			if(!CGMZ.Encyclopedia.IncludeArmors) return;
			this.processDiscovery('armors', id);
	}
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverSkill = function(id) {
	if(!CGMZ.Encyclopedia.IncludeSkills) return;
	this.processDiscovery('skills', id);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverState = function(id) {
	if(!CGMZ.Encyclopedia.IncludeStates) return;
	this.processDiscovery('states', id);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handling for encyclopedia plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Encyclopedia_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Reinitialize", this.pluginCommandEncyclopediaReinitialize);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Call Scene", this.pluginCommandEncyclopediaCallScene);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverEnemy", this.pluginCommandEncyclopediaDiscoverEnemy);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverItem", this.pluginCommandEncyclopediaDiscoverItem);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverArmor", this.pluginCommandEncyclopediaDiscoverArmor);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverWeapon", this.pluginCommandEncyclopediaDiscoverWeapon);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverSkill", this.pluginCommandEncyclopediaDiscoverSkill);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverState", this.pluginCommandEncyclopediaDiscoverState);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverCustom", this.pluginCommandEncyclopediaDiscoverCustom);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Discover Batch", this.pluginCommandEncyclopediaDiscoverBatch);
};
//-----------------------------------------------------------------------------
// Reinitialize the encyclopedia data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaReinitialize = function() {
	$cgmz.initializeEncyclopediaData(true);
};
//-----------------------------------------------------------------------------
// Call the Encyclopedia Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaCallScene = function() {
	SceneManager.push(CGMZ_Scene_Encyclopedia);
};
//-----------------------------------------------------------------------------
// Discover an enemy
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverEnemy = function(args) {
	$cgmz.encyclopediaDiscovery("bestiary", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover an item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverItem = function(args) {
	$cgmz.encyclopediaDiscovery("items", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover an armor
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverArmor = function(args) {
	$cgmz.encyclopediaDiscovery("armors", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a weapon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverWeapon = function(args) {
	$cgmz.encyclopediaDiscovery("weapons", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a skill
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverSkill = function(args) {
	$cgmz.encyclopediaDiscovery("skills", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a state
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverState = function(args) {
	$cgmz.encyclopediaDiscovery("states", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a custom entry
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverCustom = function(args) {
	$cgmz.encyclopediaDiscovery(args.symbol, Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover multiple entries
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverBatch = function(args) {
	for(const enemyId of JSON.parse(args.enemies)) {
		$cgmz.encyclopediaDiscovery("bestiary", Number(enemyId));
	}
	for(const itemId of JSON.parse(args.items)) {
		$cgmz.encyclopediaDiscovery("items", Number(itemId));
	}
	for(const weaponId of JSON.parse(args.weapons)) {
		$cgmz.encyclopediaDiscovery("weapons", Number(weaponId));
	}
	for(const armorId of JSON.parse(args.armors)) {
		$cgmz.encyclopediaDiscovery("armors", Number(armorId));
	}
	for(const skillId of JSON.parse(args.skills)) {
		$cgmz.encyclopediaDiscovery("skills", Number(skillId));
	}
	for(const stateId of JSON.parse(args.states)) {
		$cgmz.encyclopediaDiscovery("states", Number(stateId));
	}
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage encyclopedia data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize encyclopedia data
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Encyclopedia_createPluginData.call(this);
	this.initializeEncyclopediaData(false);
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeEncyclopediaData = function(reinitialize) {
	if(!this._encyclopedia || reinitialize) {
		this.setupEncyclopediaVariables();
	}
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupEncyclopediaVariables = function() {
	this._encyclopedia = new CGMZ_Encyclopedia();
};
//-----------------------------------------------------------------------------
// Check for new data after game load
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Encyclopedia_CGMZCore_onAfterLoad.call(this);
	this._encyclopedia.initializeData(this._encyclopedia._bestiary, $dataEnemies.length-1, 'bestiary'); // -1 because $data are not
	this._encyclopedia.initializeData(this._encyclopedia._items, $dataItems.length-1, 'items');        // 0-indexed, but have null
	this._encyclopedia.initializeData(this._encyclopedia._armors, $dataArmors.length-1, 'armors');    // for first value instead
	this._encyclopedia.initializeData(this._encyclopedia._weapons, $dataWeapons.length-1, 'weapons');
	this._encyclopedia.initializeData(this._encyclopedia._skills, $dataSkills.length-1, 'skills');
	this._encyclopedia.initializeData(this._encyclopedia._states, $dataStates.length-1, 'states');
	this._encyclopedia.initializeCustomData();
};
//-----------------------------------------------------------------------------
// Discover encyclopedia entry manually
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.encyclopediaDiscovery = function(symbol, id) {
	this._encyclopedia.processDiscovery(symbol, id);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaDiscovered = function(symbol) {
	return this._encyclopedia.getAmountDiscovered(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaEntries = function(symbol) {
	return this._encyclopedia.getAmountEntries(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data Array
// Returns proper array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaData = function(symbol) {
	return this._encyclopedia.getEncyclopediaData(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object
// Returns data object from array
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaObject = function(symbol, id) {
	const array = this._encyclopedia.getEncyclopediaData(symbol);
	return this._encyclopedia.getEncyclopediaObject(array, id);
};
//-----------------------------------------------------------------------------
// Discover enemies from a troop
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverTroop = function(troopId) {
	this._encyclopedia.discoverTroop(troopId);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, and armors (symbol = "item", "weapon", "armor")
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverItem = function(id, symbol) {
	this._encyclopedia.discoverItem(id, symbol);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverSkill = function(skillId) {
	this._encyclopedia.discoverSkill(skillId);
};
//-----------------------------------------------------------------------------
// Discover states
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverState = function(stateId) {
	this._encyclopedia.discoverState(stateId);
};
//-----------------------------------------------------------------------------
// Get total discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaTotalPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('total') / this._encyclopedia.getAmountEntries('total');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get bestiary discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaBestiaryPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('bestiary') / this._encyclopedia.getAmountEntries('bestiary');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get items discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaItemsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('items') / this._encyclopedia.getAmountEntries('items');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get weapons discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaWeaponsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('weapons') / this._encyclopedia.getAmountEntries('weapons');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get armors discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaArmorsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('armors') / this._encyclopedia.getAmountEntries('armors');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get skills discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaSkillsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('skills') / this._encyclopedia.getAmountEntries('skills');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get states discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaStatesPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('states') / this._encyclopedia.getAmountEntries('states');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get custom discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaCustomPercent = function(symbol) {
	let percentage = this._encyclopedia.getAmountDiscovered(symbol) / this._encyclopedia.getAmountEntries(symbol);
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//=============================================================================
// CGMZ_Scene_Encyclopedia
//-----------------------------------------------------------------------------
// Handle the encyclopedia scene
//=============================================================================
function CGMZ_Scene_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Encyclopedia.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Encyclopedia.prototype.constructor = CGMZ_Scene_Encyclopedia;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create encyclopedia windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCategoryWindow();
	this.createTotalsWindow();
	this.createListWindow();
	this.createDummyWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create encyclopedia category window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createCategoryWindow = function() {
    this._categoryWindow = new CGMZ_Window_EncyclopediaCategory(this.categoryWindowRect());
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Category Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.buttonAreaBottom();
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(CGMZ.Encyclopedia.CategoryLines, true);
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create Totals Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createTotalsWindow = function() {
    this._totalsWindow = new CGMZ_Window_EncyclopediaTotals(this.totalsWindowRect());
	this._categoryWindow.setTotalWindow(this._totalsWindow);
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Totals Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.totalsWindowRect = function() {
    const x = 0;
	const y = Graphics.boxHeight - this.calcWindowHeight(2, false);
	const width = Graphics.boxWidth/3;
	const height = this.calcWindowHeight(2, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create List Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createListWindow = function() {
    this._listWindow = new CGMZ_Window_EncyclopediaList(this.listWindowRect());
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// List Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.listWindowRect = function() {
	const width = this._totalsWindow.width;
	const height = Graphics.boxHeight - (this._categoryWindow.y + this._categoryWindow.height) - this._totalsWindow.height;
	const y = this._categoryWindow.y + this._categoryWindow.height;
	const x = 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create Dummy Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createDummyWindow = function() {
    this._dummyWindow = new Window_Base(this.displayWindowRect());
    this.addWindow(this._dummyWindow);
};
//-----------------------------------------------------------------------------
// Create Display Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createDisplayWindow = function() {
    this._displayWindow = new CGMZ_Window_EncyclopediaDisplay(this.displayWindowRect());
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.hide();
	this._displayWindow.deactivate();
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Display window (and dummy window) rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.displayWindowRect = function() {
    const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - x;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On category OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onCategoryOk = function() {
	this._dummyWindow.hide();
	this._displayWindow.show();
    this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
	this._listWindow.ensureCursorVisible(true);
};
//-----------------------------------------------------------------------------
// On list cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onListCancel = function() {
	this._dummyWindow.show();
	this._displayWindow.hide();
    this._categoryWindow.activate();
	this._listWindow.select(0);
	this._listWindow.ensureCursorVisible(true);
	this._listWindow.deactivate();
	this._listWindow.deselect();
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onDisplayCancel = function() {
    this._displayWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMZ_Window_EncyclopediaCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaCategory(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_EncyclopediaCategory.prototype.constructor = CGMZ_Window_EncyclopediaCategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.maxCols = function() {
    return CGMZ.Encyclopedia.CategoriesPerLine;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.makeCommandList = function() {
	for(const category of CGMZ.Encyclopedia.Categories) {
		const categoryData = JSON.parse(category);
		if(this.canShowCommand(categoryData)) {
			const name = categoryData["Command Text"];
			const symbol = categoryData["Category Symbol"];
			const ext = categoryData["Category Name"];
			this.addCommand(name, symbol, this.enableEncyclopediaCommand(categoryData), ext);
		}
	}
};
//-----------------------------------------------------------------------------
// Can Show Category?
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.canShowCommand = function(categoryData) {
	switch(categoryData["Category Symbol"]) {
		case 'bestiary': if(!CGMZ.Encyclopedia.IncludeBestiary) return false; break;
		case 'items': if(!CGMZ.Encyclopedia.IncludeItems) return false; break;
		case 'armors': if(!CGMZ.Encyclopedia.IncludeArmors) return false; break;
		case 'weapons': if(!CGMZ.Encyclopedia.IncludeWeapons) return false; break;
		case 'skills': if(!CGMZ.Encyclopedia.IncludeSkills) return false; break;
		case 'states': if(!CGMZ.Encyclopedia.IncludeStates) return false;
	}
	const showReqs = JSON.parse(categoryData["Category Display Requirements"]);
	const itemID = Number(showReqs["Item"]);
	const switchID = Number(showReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && $gameSwitches.value(switchID) != true) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Command Enabled?
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.enableEncyclopediaCommand = function(categoryData) {
	const enableReqs = JSON.parse(categoryData["Category Enable Requirements"]);
	const itemID = Number(enableReqs["Item"]);
	const switchID = Number(enableReqs["Switch"]);
	if(itemID && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID && !$gameSwitches.value(switchID)) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, this.itemTextAlign());
};
//-----------------------------------------------------------------------------
// Set total (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.setTotalWindow = function(totalWindow) {
	this._totalWindow = totalWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
	if(this._totalWindow) {
		this._totalWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMZ_Window_EncyclopediaTotals
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaTotals(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaTotals.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_EncyclopediaTotals.prototype.constructor = CGMZ_Window_EncyclopediaTotals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this._symbol = null;
	this._name = null;
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.setItem = function(data) {
	if(this._name === data.ext) return;
	this._symbol = data.symbol;
	this._name = data.ext;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.refresh = function() {
	this.contents.clear();
	this.drawSpecificCompletion(this._symbol, this._name);
	this.drawTotalCompletion();
};
//-----------------------------------------------------------------------------
// Draw overall completion %
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.drawTotalCompletion = function() {
	const totalDiscovered = $cgmz.getEncyclopediaDiscovered('total');
	const totalEntries = $cgmz.getEncyclopediaEntries('total');
	const completion = Number((totalDiscovered/totalEntries)*100).toFixed(CGMZ.Encyclopedia.DecimalSpots);
	const string = "\\c[" + CGMZ.Encyclopedia.LabelColor + "]" + CGMZ.Encyclopedia.TotalText + "\\c[0]" + completion + "%";
	this.CGMZ_drawTextLine(string, 0, this.lineHeight(), this.contents.width, CGMZ.Encyclopedia.TotalWindowAlignment);
};
//-----------------------------------------------------------------------------
// Draw specific category completion
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.drawSpecificCompletion = function(symbol, name) {
	const discovered = $cgmz.getEncyclopediaDiscovered(symbol);
	const entries = $cgmz.getEncyclopediaEntries(symbol);
	const completion = Number((discovered/entries)*100).toFixed(CGMZ.Encyclopedia.DecimalSpots);
	const string = "\\c[" + CGMZ.Encyclopedia.LabelColor + "]" + name + ": \\c[0]" + completion + "%";
	this.CGMZ_drawTextLine(string, 0, 0, this.contents.width, CGMZ.Encyclopedia.TotalWindowAlignment);
};
//=============================================================================
// CGMZ_Window_EncyclopediaList
//-----------------------------------------------------------------------------
// Selectable window for choosing an entry in a list.
//=============================================================================
function CGMZ_Window_EncyclopediaList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_EncyclopediaList.prototype.constructor = CGMZ_Window_EncyclopediaList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._symbol = null;
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.setItem = function(data) {
	if(this._symbol === data.symbol) return;
	this._symbol = data.symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.makeItemList = function() {
    this._data = $cgmz.getEncyclopediaData(this._symbol);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const number = CGMZ.Encyclopedia.NumberEntries ? item._index + ". " : "";
	const name = item._discovered ? this.getItemName(this._symbol, item._id) : CGMZ.Encyclopedia.UnknownEntry;
	this.changePaintOpacity(this.isEnabled(item));
	if(CGMZ.Encyclopedia.ListWindowEnableTextCodes) {
		this.CGMZ_drawTextLine(number + name, rect.x, rect.y, rect.width, CGMZ.Encyclopedia.ListWindowTextAlignment);
	} else {
		this.drawText(number + name, rect.x, rect.y, rect.width, CGMZ.Encyclopedia.ListWindowTextAlignment);
	}
};
//-----------------------------------------------------------------------------
// Determine if item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.isEnabled = function(item) {
    return item._discovered;
};
//-----------------------------------------------------------------------------
// Get the name of the object
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.getItemName = function(symbol, id) {
    switch(symbol) {
		case 'bestiary': return $dataEnemies[id].name;
		case 'items': return $dataItems[id].name;
		case 'armors': return $dataArmors[id].name;
		case 'weapons': return $dataWeapons[id].name;
		case 'skills': return $dataSkills[id].name;
		case 'states': return $dataStates[id].name;
		default: const obj = $cgmz.getEncyclopediaObject(symbol, id);
				 return (obj) ? obj._name : CGMZ.Encyclopedia.UnknownEntry;
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this.updateHelp();
	}
};
//-----------------------------------------------------------------------------
// Update display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.updateHelp = function() {
    this._displayWindow.setItem(this.item(), this._symbol);
};
//=============================================================================
// CGMZ_Window_EncyclopediaDisplay
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaDisplay(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_EncyclopediaDisplay.prototype.constructor = CGMZ_Window_EncyclopediaDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Encyclopedia.ScrollWait, CGMZ.Encyclopedia.ScrollSpeed, CGMZ.Encyclopedia.AutoScroll, CGMZ.Encyclopedia.ScrollDeceleration);
	this._data = null;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this._largeIconWidth = ImageManager.iconWidth*CGMZ.Encyclopedia.LargeIconMultiplier;
	this._largeIconHeight = ImageManager.iconHeight*CGMZ.Encyclopedia.LargeIconMultiplier;
	this.createContents();
	this.createBattlerSprite(rect);
};
//-----------------------------------------------------------------------------
// Create the battler sprite
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.createBattlerSprite = function(rect) {
	this._battlerSprite = new Sprite();
	this._battlerSprite.anchor.x = 0.5;
	this._battlerSpritePreloaded = false;
	this.addInnerChild(this._battlerSprite);
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.setItem = function(item, symbol) {
	if(!item || this._data === item) return;
	this._data = item;
	this._symbol = symbol;
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.refresh = function() {
	this.setupWindowForNewEntry();
	if(this._data) this.drawEncyclopediaEntry();
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEntry = function() {
	this._battlerSprite.hide();
	if(!this._data._discovered) {
		this.drawUnknownItem();
	}
	else {
		switch(this._symbol) {
			case 'bestiary': this.drawBestiary(); break;
			case 'items': this.drawItem(); break;
			case 'armors': this.drawArmor(); break;
			case 'weapons':	this.drawWeapon(); break;
			case 'skills': this.drawSkill(); break;
			case 'states': this.drawState(); break;
			default: this.drawCustom();
		}
	}
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawUnknownItem = function() {
	this.drawText(CGMZ.Encyclopedia.UnknownEntryDisplay, 0, 0, this.contents.width, 'center');
	this._neededHeight = this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Bestiary Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawBestiary = function() {
	const enemy = $dataEnemies[this._data._id];
	this.drawEncyclopediaName(enemy.name);
	this.drawEncyclopediaStats(enemy.params, this.lineHeight());
	this.drawLabel(CGMZ.Encyclopedia.DropsText, 0, this.lineHeight()*5, "center");
	this.drawEncyclopediaBestiaryRewards(enemy.exp, enemy.gold);
	let y = this.drawEncyclopediaBestiaryDrops(enemy.dropItems);
	y = this.drawEncyclopediaMeta(enemy.meta.cgmzdesc, y);
	this.drawEncyclopediaBestiarySketch(enemy.battlerHue, enemy.battlerName, y);
};
//-----------------------------------------------------------------------------
// Draw Item Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawItem = function() {
	const item = $dataItems[this._data._id];
	this.drawEncyclopediaName(item.name);
	this.drawEncyclopediaLargeIcon(item.iconIndex);
	this.drawEncyclopediaPrice(item.price);
	this.drawEncyclopediaKeyItem(item.itypeId);
	this.drawEncyclopediaPossession($gameParty.numItems(item));
	this.drawEncyclopediaSuccessRate(item.successRate);
	this.drawEncyclopediaConsumable(item.consumable);
	let y = this.drawUserTPGain(item.tpGain, this.lineHeight()*6);
	y = this.drawEncyclopediaEffects(item.effects, y);
	y = this.drawEncyclopediaDescription(item.description, y);
	y = this.drawEncyclopediaMeta(item.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Armor Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawArmor = function() {
	const armor = $dataArmors[this._data._id];
	this.drawEncyclopediaName(armor.name);
	this.drawEncyclopediaLargeIcon(armor.iconIndex);
	this.drawEncyclopediaPrice(armor.price);
	this.drawEncyclopediaType($dataSystem.equipTypes[armor.etypeId], 'equip', this.lineHeight()*2);
	this.drawEncyclopediaPossession($gameParty.numItems(armor));
	this.drawEncyclopediaType($dataSystem.armorTypes[armor.atypeId], 'armor', this.lineHeight()*4);
	this.drawEncyclopediaStats(armor.params, this.lineHeight()*5, true);
	let y = this.drawEncyclopediaTrait(armor.traits, this.lineHeight()*9);
	y = this.drawEncyclopediaDescription(armor.description, y);
	y = this.drawEncyclopediaMeta(armor.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Weapon Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawWeapon = function() {
	const weapon = $dataWeapons[this._data._id];
	this.drawEncyclopediaName(weapon.name);
	this.drawEncyclopediaLargeIcon(weapon.iconIndex);
	this.drawEncyclopediaPrice(weapon.price);
	this.drawEncyclopediaType($dataSystem.equipTypes[weapon.etypeId], 'equip', this.lineHeight()*2);
	this.drawEncyclopediaPossession($gameParty.numItems(weapon));
	this.drawEncyclopediaType($dataSystem.weaponTypes[weapon.wtypeId], 'weapon', this.lineHeight()*4);
	this.drawEncyclopediaStats(weapon.params, this.lineHeight()*5, true);
	let y = this.drawEncyclopediaTrait(weapon.traits, this.lineHeight()*9);
	y = this.drawEncyclopediaDescription(weapon.description, y);
	y = this.drawEncyclopediaMeta(weapon.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Skill Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawSkill = function() {
	const skill = $dataSkills[this._data._id];
	this.drawEncyclopediaName(skill.name);
	this.drawEncyclopediaLargeIcon(skill.iconIndex);
	this.drawEncyclopediaType($dataSystem.skillTypes[skill.stypeId], 'skill', this.lineHeight());
	this.drawSkillCosts(skill.mpCost, skill.tpCost);
	this.drawEncyclopediaSuccessRate(skill.successRate);
	let y = this.drawUserTPGain(skill.tpGain, this.lineHeight()*5);
	y = this.drawEncyclopediaEffects(skill.effects, y);
	y = this.drawEncyclopediaDescription(skill.description, y);
	y = this.drawEncyclopediaMeta(skill.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw State Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawState = function() {
	const state = $dataStates[this._data._id];
	this.drawEncyclopediaName(state.name);
	this.drawEncyclopediaLargeIcon(state.iconIndex);
	this.drawStateDuration(state.autoRemovalTiming, state.minTurns, state.maxTurns);
	this.drawStateRemoval(state.removeAtBattleEnd, CGMZ.Encyclopedia.BattleRemovalText, this.lineHeight()*2);
	this.drawStateRemoval(state.removeByWalking, CGMZ.Encyclopedia.WalkingRemovalText, this.lineHeight()*3);
	this.drawStateRemoval(state.removeByDamage, CGMZ.Encyclopedia.DamageRemovalText, this.lineHeight()*4);
	let y = this.drawEncyclopediaTrait(state.traits, this.lineHeight()*5);
	y = this.drawEncyclopediaMeta(state.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Custom Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustom = function() {
	this.drawEncyclopediaName(this._data._name);
	let y = this.drawCustomDescription(this._data._description);
	if(this._data._sketch) {
		this.drawCustomBitmap(this._data._sketch, y);
	} else {
		this._neededHeight = y;
	}
};
//-----------------------------------------------------------------------------
// Draw Name - Always used for all categories
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaName = function(name) {
	this.contents.fontBold = true;
	this.CGMZ_drawTextLine(name, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draws a standard Encyclopedia line - used for all categories
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStandardLine = function(label, descriptor, x, y, width) {
	this.drawLabel(label, x, y);
	x += this.textWidth(label);
	this.drawText(descriptor, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw label / header text
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawLabel = function(label, x, y, alignment = "left") {
	this.changeTextColor(ColorManager.textColor(CGMZ.Encyclopedia.LabelColor));
	this.drawText(label, x, y, this.contents.width - x, alignment);
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Draws text array with descriptor in first line.
// Makes sure to have enough space for each item.
// Returns y-value of line below lowest line drawn.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawTextArray = function(y, label, array, separator = " ") {
	this.drawLabel(label, 0, y);
	const xOffset = this.textWidth(label);
	const string = array.join(separator);
	const outputHeight = this.CGMZ_drawText(string, 0, xOffset, y, this.contents.width);
	return y + outputHeight;
};
//-----------------------------------------------------------------------------
// Draw Items (skill, state, etc) - Draws skills with icon with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawItemNames = function(label, x, y, width, itemIds, symbol) {
	const itemStrings = [];
	for(const itemId of itemIds) {
		const item = (symbol === 'skill') ? $dataSkills[itemId] : $dataStates[itemId];
		const stringRepresentation = "\\i[" + item.iconIndex + "]" + item.name;
		itemStrings.push(stringRepresentation);
	}
	this.drawLabel(label, x, y);
	const xOffset = x + this.textWidth(label)
	const string = itemStrings.join(", ");
	const outputHeight = this.CGMZ_drawText(string, x, xOffset, y, width);
	return y + outputHeight;
};
//-----------------------------------------------------------------------------
// Draw Large icon - Always used for item, armor, weapon, skill, state.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaLargeIcon = function(iconIndex) {
	const bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = iconIndex % 16 * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
	const dw = this._largeIconWidth;
	const dh = this._largeIconHeight;
	const x = 0;
	const y = this.lineHeight();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw Price - Always used for item, armor, weapon
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPrice = function(price) {
	const y = this.lineHeight();
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	const descriptor = (price == 0) ? CGMZ.Encyclopedia.NoPriceText : $cgmzTemp.numberSplit(price) + " " + TextManager.currencyUnit;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.PriceText, descriptor, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Key item - Always used for item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaKeyItem = function(itype) {
	const y = this.lineHeight()*2;
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	const descriptor = (itype == 2) ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.KeyItemText, descriptor, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Type - Always used for armor, weapon, skill
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaType = function(typeName, typeSymbol, y) {
	let descriptor = CGMZ.Encyclopedia.EquipTypeText;
	switch(typeSymbol) {
		case 'armor':
			descriptor = CGMZ.Encyclopedia.ArmorTypeText;
			if(!typeName) typeName = CGMZ.Encyclopedia.NoArmorTypeText;
			break;
		case 'weapon':
			descriptor = CGMZ.Encyclopedia.WeaponTypeText;
			if(!typeName) typeName = CGMZ.Encyclopedia.NoWeaponTypeText;
			break;
		case 'skill':
			descriptor = CGMZ.Encyclopedia.SkillTypeText;
			if(!typeName) typeName = CGMZ.Encyclopedia.NoSkillTypeText;
	}
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	this.drawEncyclopediaStandardLine(descriptor, typeName, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Possession - Always used for item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPossession = function(amount) {
	const y = this.lineHeight()*3;
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	const descriptor = $cgmzTemp.numberSplit(amount);
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.PossessionText, descriptor, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Stats - Always used by armors and bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStats = function(params, yStart, useSign = false) {
	const width = this.contents.width / 2; // 2 column display
	for(let i = 0; i < 8; i++) {
		const y = this.lineHeight()*(Math.trunc(i/2));
		const x = (i%2 == 0) ? 0 : width;
		const descriptor1 = TextManager.param(i) + ": ";
		const descriptor2 = $cgmzTemp.numberSplit(params[i]);
		const sign = (useSign && params[i] > 0) ? "+" : "";
		this.drawEncyclopediaStandardLine(descriptor1, sign + descriptor2, x, yStart + y, width*(1+i%2));
	}
};
//-----------------------------------------------------------------------------
// Draw exp and gold of an enemy - Always used by the Bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryRewards = function(exp, gold) {
	let y = this.lineHeight()*6;
	let descriptor1 = TextManager.basic(8) + ": "; // full EXP string (not abbr)
	let descriptor2 = $cgmzTemp.numberSplit(exp);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, 0, y, this.contents.width);
	y += this.lineHeight();
	descriptor1 = (TextManager.currencyUnit).trim() + ": ";
	descriptor2 = $cgmzTemp.numberSplit(gold);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, 0, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// Returns y-value of line past last drop.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryDrops = function(drops) {
	const width = this.contents.width / 2;
	let y = this.lineHeight()*8;
	for(const drop of drops) {
		if(drop.kind === 0) continue;
		let item = null;
		switch(drop.kind) {
			case 1: item = $dataItems[drop.dataId]; break;
			case 2: item = $dataWeapons[drop.dataId]; break;
			case 3: item = $dataArmors[drop.dataId];
		}
		let x = 0;
		this.drawItemName(item, x, y, width);
		if(CGMZ.Encyclopedia.ShowDropChances) {
			x = width;
			this.drawLabel(CGMZ.Encyclopedia.DropChanceText, x, y);
			x += this.textWidth(CGMZ.Encyclopedia.DropChanceText);
			const descriptor = ((1/drop.denominator)*100).toFixed(2) + "%";
			this.drawText(descriptor, x, y, this.contents.width, 'left');
		}
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draws meta note if applicable. Returns y-value past last line.
// <cgmzdesc:Description Here>
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaMeta = function(meta, y) {
	if(!meta) return y;
	this.drawLabel(CGMZ.Encyclopedia.NoteText, 0, y);
	const xOffset = this.textWidth(CGMZ.Encyclopedia.NoteText);
	const outputHeight = this.CGMZ_drawText(meta, 0, xOffset, y, this.contents.width, 'left');
	return outputHeight + y;
};
//-----------------------------------------------------------------------------
// Draws description if applicable. Returns y-value past last line.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaDescription = function(description, y) {
	if(!description) return y;
	this.drawLabel(CGMZ.Encyclopedia.DescriptionText, 0, y);
	if(CGMZ.Encyclopedia.StripNewlinesInDescription) {
		description = description.replace(/(\r\n|\n|\r)/gm, " ");
	}
	const xOffset = this.textWidth(CGMZ.Encyclopedia.DescriptionText);
	const outputHeight = this.CGMZ_drawText(description, 0, xOffset, y, this.contents.width, 'left');
	return outputHeight + y;
};
//-----------------------------------------------------------------------------
// Draws success rate of an item - used for item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaSuccessRate = function(rate) {
	const y = this.lineHeight()*4;
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.SuccessRateText, rate + "%", x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws whether item is consumed on use - used for item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaConsumable = function(consumable) {
	const y = this.lineHeight()*5;
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	const descriptor = consumable ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.ConsumableText, descriptor, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws item effects as needed - used for item entries
// Returns y value after drawing the last effect
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEffects = function(effects, y) {
	if(effects.length < 1) return y;
	const tracker = this.populateEffectTracker(effects);
	if(!(tracker.HPv1 || tracker.HPv2 || tracker.MPv1 || tracker.MPv2 || tracker.TP ||  tracker.ADDSTATE.length > 0 ||
	     tracker.REMOVESTATE.length > 0 || tracker.BUFFS.length > 0 || tracker.DEBUFFS.length > 0 || tracker.REMOVEDBUFFS.length > 0 ||
		 tracker.REMOVEDDEBUFFS.length > 0 || tracker.GROW.length > 0 || tracker.LEARNS.length > 0)) {
			return y;
	}
	this.drawLabel(CGMZ.Encyclopedia.EffectsText, 0, y, "center");
	y += this.lineHeight();
	const x = 0;
	const width = this.contents.width;
	let descriptor1 = "";
	let descriptor2 = "";
	let sign = "";
	if(tracker.HPv1 || tracker.HPv2) {
		descriptor1 = CGMZ.Encyclopedia.HPEffectText;
		if(tracker.HPv1 > 100) tracker.HPv1 = 100;
		if(tracker.HPv1 < -100) tracker.HPv1 = -100;
		if(tracker.HPv1 && tracker.HPv2) {
			sign = (tracker.HPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.HPv1 + "% " + sign + $cgmzTemp.numberSplit(Math.abs(tracker.HPv2));
		}
		else if(tracker.HPv1) {
			descriptor2 = tracker.HPv1 + "%";
			if(tracker.HPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmzTemp.numberSplit(tracker.HPv2);
			if(tracker.HPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.MPv1 || tracker.MPv2) {
		descriptor1 = CGMZ.Encyclopedia.MPEffectText;
		if(tracker.MPv1 > 100) tracker.MPv1 = 100;
		if(tracker.MPv1 < -100) tracker.MPv1 = -100;
		if(tracker.MPv1 && tracker.MPv2) {
			sign = (tracker.MPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.MPv1 + "% " + sign + $cgmzTemp.numberSplit(Math.abs(tracker.MPv2));
		}
		else if(tracker.MPv1) {
			descriptor2 = tracker.MPv1 + "%";
			if(tracker.MPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmzTemp.numberSplit(tracker.MPv2);
			if(tracker.MPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.TP != 0) {
		descriptor1 = CGMZ.Encyclopedia.TPEffectText;
		descriptor2 = $cgmzTemp.numberSplit(tracker.TP);
		if(tracker.TP > 0) descriptor2 = "+" + descriptor2;
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.ADDSTATE.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.AddStateText, x, y, width, tracker.ADDSTATE, 'state');
	}
	if(tracker.REMOVESTATE.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.RemoveStateText, x, y, width, tracker.REMOVESTATE, 'state');
	}
	if(tracker.BUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.AddBuffText, x, y, width, tracker.BUFFS);
	}
	if(tracker.DEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.AddDebuffText, x, y, width, tracker.DEBUFFS);
	}
	if(tracker.REMOVEDBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.BuffRemovalText, x, y, width, tracker.REMOVEDBUFFS);
	}
	if(tracker.REMOVEDDEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.DebuffRemovalText, x, y, width, tracker.REMOVEDDEBUFFS);
	}
	if(tracker.GROW.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.GrowText, x, y, width, tracker.GROW);
	}
	if(tracker.LEARNS.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.LearnSkillText, x, y, width, tracker.LEARNS, 'skill');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Returns a tracker object of all item effects
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.populateEffectTracker = function(effects) {
	let tracker = {"HPv1": 0, "HPv2": 0, "MPv1": 0, "MPv2": 0, "TP": 0, "ADDSTATE": [], "REMOVESTATE": [], "BUFFS": [], "DEBUFFS": [],
				   "REMOVEDBUFFS": [], "REMOVEDDEBUFFS": [], "GROW": [], "LEARNS": []};
	for(const effect of effects) {
		switch(effect.code) {
			// HP Effect
			case 11: tracker.HPv1 += effect.value1*100;
			         tracker.HPv2 += effect.value2; break;
			// MP Effect
			case 12: tracker.MPv1 += effect.value1*100;
					 tracker.MPv2 += effect.value2; break;
			// TP Effect
			case 13: tracker.TP += effect.value1; break;
			// Add State effect
			case 21: if(effect.dataId) tracker.ADDSTATE.push(effect.dataId);
					 break;
			// Remove State effect
			case 22: if(effect.dataId) tracker.REMOVESTATE.push(effect.dataId);
					 break;
			// Add buff effect
			case 31: tracker.BUFFS.push(effect.dataId); break;
			// Add debuff effect
			case 32: tracker.DEBUFFS.push(effect.dataId); break;
			// Remove buff effect
			case 33: tracker.REMOVEDBUFFS.push(effect.dataId); break;
			// Remove debuff effect
			case 34: tracker.REMOVEDDEBUFFS.push(effect.dataId); break;
			// Grow effect
			case 42: tracker.GROW.push(effect.dataId); break;
			// Learn Skill effect
			case 43: tracker.LEARNS.push(effect.dataId);
		}
	}
	return tracker;
};
//-----------------------------------------------------------------------------
// Draw Buff Parameters - Draws buffs/debuffs with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawBuffParameters = function(label, x, y, width, buffArray) {
	this.drawLabel(label, x, y);
	const xOffset = x + this.textWidth(label);
	const string = buffArray.map(buffId => TextManager.param(buffId)).join(", ");
	const outputHeight = this.CGMZ_drawText(string, x, xOffset, y, width);
	return y + outputHeight;
};
//-----------------------------------------------------------------------------
// Draw Trait - draws a trait such as attack element or party ability
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaTrait = function(traits, y) {
	if(traits.length < 1) return y;
	const tracker = this.populateTraitTracker(traits);
	if(!(tracker.ATKSPEED || tracker.ATKTIMES || tracker.ATKELEMENT.length > 0 || tracker.ATKSTATES.length > 0 ||
	     tracker.PARTYABILITY.length > 0 || tracker.ADDSKILLTYPES.length > 0 || tracker.SEALSKILLTYPES.length > 0 || 
		 tracker.ADDSKILLS.length > 0 || tracker.SEALSKILLS.length > 0 || tracker.STATERESIST.length > 0)) {
		return y;
	}
	if(tracker.ATKSPEED) {
		this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.AttackSpeedText, tracker.ATKSPEED, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKTIMES) {
		this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.AttackTimesText, tracker.ATKTIMES, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKELEMENT.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.ElementText, tracker.ATKELEMENT, ", ");
	}
	if(tracker.ATKSTATES.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.AttackStateText, 0, y, this.contents.width, tracker.ATKSTATES, 'state');
	}
	if(tracker.PARTYABILITY.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.PartyAbilityText, tracker.PARTYABILITY, ", ");
	}
	if(tracker.SEALSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.SealSkillTypesText, tracker.SEALSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.AddSkillTypesText, tracker.ADDSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLS.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.AddSkillText, 0, y, this.contents.width, tracker.ADDSKILLS, 'skill');
	}
	if(tracker.SEALSKILLS.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.SealSkillText, 0, y, this.contents.width, tracker.SEALSKILLS, 'skill');
	}
	if(tracker.STATERESIST.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.StateResistText, 0, y, this.contents.width, tracker.STATERESIST, 'state');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Returns a tracker object of all traits on an object
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.populateTraitTracker = function(traits) {
	const tracker = {"ATKSPEED": 0, "ATKTIMES": 0, "ATKELEMENT": [], "ATKSTATES": [], "PARTYABILITY": [],
				   "ADDSKILLTYPES": [], "SEALSKILLTYPES": [], "ADDSKILLS": [], "SEALSKILLS": [], "STATERESIST": []}
	for(const trait of traits) {
		switch(trait.code) {
			// Attack Element
			case 31: tracker.ATKELEMENT.push($dataSystem["elements"][trait.dataId]); break;
			// Attack State
			case 32: tracker.ATKSTATES.push(trait.dataId); break;
			// Attack Speed
			case 33: tracker.ATKSPEED += trait.value; break;
			// Attack Times
			case 34: tracker.ATKTIMES += trait.value; break;
			// Add Skill Type
			case 41: tracker.ADDSKILLTYPES.push($dataSystem.skillTypes[trait.dataId]); break;
			// Seal Skill Type
			case 42: tracker.SEALSKILLTYPES.push($dataSystem.skillTypes[trait.dataId]); break;
			// Add Skill
			case 43: tracker.ADDSKILLS.push(trait.dataId); break;
			// Seal Skill
			case 44: tracker.SEALSKILLS.push(trait.dataId); break;
			// State Resist
			case 14: tracker.STATERESIST.push(trait.dataId); break;
			// party ability
			case 64:
				switch(trait.dataId) {
					case 0: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.HalfEncounterText); break;
					case 1: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.NoEncounterText); break; break;
					case 3: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.RaisePreemptiveText); break;
					case 4: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.GoldDoubleText); break;
					case 5: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.DropItemDoubleText);
				}
		}
	}
	return tracker;
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawSkillCosts = function(mpCost, tpCost) {
	let y = this.lineHeight()*2;
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	const descriptor1 = $cgmzTemp.numberSplit(mpCost);
	const descriptor2 = $cgmzTemp.numberSplit(tpCost);
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.MPCostText, descriptor1, x, y, this.contents.width);
	y += this.lineHeight();
	x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.TPCostText, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill/item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawUserTPGain = function(tpGain, y) {
	if(!tpGain) return y;
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	const descriptor = $cgmzTemp.numberSplit(tpGain);
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.UserTPGainText, descriptor, x, y, this.contents.width);
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw generic state removal - Always used state entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawStateRemoval = function(removed, descriptor, y) {
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	const descriptor2 = (removed) ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw auto removal - Always used state entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawStateDuration = function(auto, min, max) {
	const y = this.lineHeight();
	const x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor = "";
	if(auto) {
		descriptor = (min == max) ? min + " " + CGMZ.Encyclopedia.TurnsText : min + " - " + max + " " + CGMZ.Encyclopedia.TurnsText;
	} else {
		descriptor =  CGMZ.Encyclopedia.InfiniteText;
	}
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.DurationText, descriptor, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws custom description. Some additional parsing required.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustomDescription = function(description) {
	const y = this.lineHeight();
	this.drawLabel(CGMZ.Encyclopedia.DescriptionText, 0, y);
	const xOffset = this.textWidth(CGMZ.Encyclopedia.DescriptionText);
	const outputHeight = this.CGMZ_drawText(description, 0, xOffset, y, this.contents.width, 'left');
	return outputHeight + y;
};
//-----------------------------------------------------------------------------
// Draw enemy image as sprite - Always used by Bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiarySketch = function(battlerHue, battlerName, y) {
	this.drawLabel(CGMZ.Encyclopedia.SketchText, 0, y);
	if ($gameSystem.isSideView()) {
		this._battlerSprite.bitmap = ImageManager.loadSvEnemy(battlerName);
	} else {
		this._battlerSprite.bitmap = ImageManager.loadEnemy(battlerName);
	}
	this._battlerSpritePreloaded = this._battlerSprite.bitmap.isReady();
	this._battlerSprite.bitmap.addLoadListener(this.displayBitmap.bind(this, y, battlerHue));
};
//-----------------------------------------------------------------------------
// Draws custom sketch image as sprite.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustomBitmap = function(bitmap, y) {
	if(!bitmap) return y;
	this.drawLabel(CGMZ.Encyclopedia.SketchText, 0, y);
	const folder = bitmap.substring(0, bitmap.lastIndexOf('/') + 1);
	const filename = bitmap.substring(bitmap.lastIndexOf('/') + 1);
	this._battlerSprite.bitmap = ImageManager.loadBitmap(folder, filename);
	this._battlerSpritePreloaded = this._battlerSprite.bitmap.isReady();
	this._battlerSprite.bitmap.addLoadListener(this.displayBitmap.bind(this, y, 0));
};
//-----------------------------------------------------------------------------
// Draws custom sketch image as sprite.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.displayBitmap = function(y, hue) {
	y += this.lineHeight();
	let scale = 1;
	if(this._battlerSprite.width > this.contents.width) {
		scale = this.contents.width / this._battlerSprite.width;
	}
	this._battlerSprite.scale.x = scale;
	this._battlerSprite.scale.y = scale;
	this._battlerSprite.y = y;
	this._battlerSprite.x = this.contents.width / 2;
	this._battlerSprite.setHue(hue);
	this._battlerSprite.show();
	y += this._battlerSprite.height * scale;
	y += $gameSystem.windowPadding() * 2 * !this._battlerSpritePreloaded;
	this._neededHeight = y;
	this.checkForScroll();
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Discover enemies automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when battle starts
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    alias_CGMZ_Encyclopedia_BattleManager_setup.call(this, troopId, canEscape, canLose);
	$cgmz.EncyclopediaDiscoverTroop(troopId);
};
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when a turn starts
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    alias_CGMZ_Encyclopedia_BattleManager_startTurn.call(this);
	$gameTroop.members().forEach((enemy) => {
		$cgmz.encyclopediaDiscovery("bestiary", enemy._enemyId);
	});
};
//-----------------------------------------------------------------------------
// Alias. Discover enemies when they are the target of an attack or they attack
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
	alias_CGMZ_Encyclopedia_BattleManager_invokeAction.call(this, subject, target);
	if(target.isEnemy()) {
		$cgmz.encyclopediaDiscovery("bestiary", target._enemyId);
	} else if(subject.isEnemy()) {
		$cgmz.encyclopediaDiscovery("bestiary", subject._enemyId);
	}
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Discover items, weapons, armors automatically.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover items, weapons, armors when party gains them.
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMZ_Encyclopedia_GameParty_gainItem.call(this, item, amount, includeEquip);
    if (DataManager.isItem(item)) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "item");
    } else if (DataManager.isWeapon(item)) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "weapon");
    } else if (DataManager.isArmor(item)) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "armor");
    }
};
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Discover skills automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover skills when actor learns skill.
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    alias_CGMZ_Encyclopedia_GameActor_learnSkill.call(this, skillId);
	$cgmz.EncyclopediaDiscoverSkill(skillId);
};
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Discover states automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover state when actor or enemy afflicted with one
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
	alias_CGMZ_Encyclopedia_GameBattler_addState.call(this, stateId);
    if(this.isStateAddable(stateId)) {
        $cgmz.EncyclopediaDiscoverState(stateId);
    }
};