//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.12] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  visible = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
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
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
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
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
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
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
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
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
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
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
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
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
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
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
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
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
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
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x5bd1=['drawItemEffectsHpDamage','money','prepare','isRepeated','_dummyWindow','consumable','drawNewLabelIcon','KoTkh','Scene_Shop_create','loadCharacter','MP\x20DAMAGE','onActorChange','equip2','SUCCESS\x20RATE','lqllJ','FUNC','LabelSelfGainTP','LEifh','bRJAl','Blacklist','Scene_Load_reloadMapIfUpdated','getItemSpeedText','buttonAssistText1','aXbUy','value1','_equips','processShiftRemoveShortcut','getInputButtonString','NoChangeMarker','numberWindowRectItemsEquipsCore','JlsLv','isMainMenuCoreMenuImageOptionAvailable','isClicked','TMNWs','clearNewItem','0000','maxItems','Parse_Notetags_EnableJS','TIZIO','isNwY','Whitelist','BorderRegExp','_newLabelOpacityChange','HIT\x20TYPE','drawItemRepeats','FHVyN','XFDMZ','ToobH','values','Jumab','Scene_Equip_onActorChange','MaxItems','isDualWield','getItemDamageAmountLabel','Window_ItemCategory_setItemWindow','onTouchSelectModernControls','LabelApply','drawRemoveItem','Scene_Equip_onSlotOk','PaWiz','buttonAssistRemove','helpAreaTop','ARRAYSTRUCT','makeItemData','scope','_bypassNewLabel','qwjGv','parameters','\x5cI[%1]%2','DamageType%1','flatHP','LabelRecoverHP','helpAreaHeight','createSellWindow','setCategory','_buyWindow','members','dataId','DrawBackRect','onSlotCancel','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','selfTP','paramValueFontSize','getItemDamageElementText','GGLQb','getItemHitTypeLabel','currentEquippedItem','ElementWeapon','hideNewLabelSprites','equips','zouKE','getItemEffectsRemovedStatesBuffsText','nYsjG','DrawEquipData','New','MzUFp','CONSUMABLE','DLFrR','uiHelpPosition','VVfgE','JWSSu','ehSHx','LKrAp','gaugeBackColor','paramValueByName','_doubleTouch','filter','xBdbD','AmMVC','optKeyItemsNumber','OhzNm','drawItemQuantity','FadeSpeed','nfYKr','isOptimizeCommandEnabled','AWizS','IDnhg','FontFace','LabelConsume','tbzIX','pRjIb','move','buttonAssistKey1','numberWindowRect','XgVeW','KRlja','DQpGM','drawCurrencyValue','flatMP','REMOVED\x20EFFECTS','tpGain','onTouchCancel','onBuyCancel','damageColor','drawItemName','VisuMZ_1_BattleCore','CmdTextAlign','mainAreaTop','iconHeight','getItemDamageElementLabel','getItemOccasionText','CFeNb','Scene_ItemBase_activateItemWindow','paramPlus','smoothSelect','changeEquipById','HkKBd','weaponTypes','Ctzei','LabelRepeats','createItemWindow','powerUpColor','categoryList','revertGlobalNamespaceVariables','Step2Start','uiMenuStyle','Width','ANTcj','createStatusWindow','isClearEquipOk','100%','value2','IAywl','drawUpdatedBeforeParamValue','update','AGI','EquipParams','Categories','categoryNameWindowCenter','+%1','paramId','oWaDx','?????','LabelRecoverMP','qcRxs','getItemsEquipsCoreBackColor1','Scene_Item_createItemWindow','ItemQuantityFmt','SgcZi','drawItemScope','_itemData','drawItemOccasion','HmEjF','hideDisabledCommands','price','QUycN','isOptimizeCommandAdded','QVpAh','yyJCe','JSON','Scene_Equip_commandEquip','CoreEngine','geUpdatedLayoutStatusWidth','isClearCommandEnabled','updateCategoryNameWindow','MultiplierStandard','#%1','sellWindowRectItemsEquipsCore','DEF','FadeLimit','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','cOCbZ','JMDmB','_list','nonRemovableEtypes','_tempActorA','UEkeH','EquipScene','MHbkP','isItem','calcWindowHeight','_purchaseOnly','Window_Selectable_setHelpWindowItem','drawPossession','drawItemEffectsAddedStatesBuffs','XDOBz','addClearCommand','zlbND','meetsItemConditionsJS','categoryWindowRect','QkMul','isCommandEnabled','statusWindowRect','drawing','_scene','bkBbG','MaxMP','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','_slotId','MFNnj','REPEAT','getMenuImage','active','acXae','length','dWMvH','%1-%2','EAOoT','ItemScene','fontFace','visible','FxiNN','FieldUsable','SpeedNeg999','EnableLayout','optimize','uiInputPosition','buyWindowRectItemsEquipsCore','CuLeH','cursorUp','processHandling','drawItemEffectsHpRecovery','DrawIcons','atypeId','Window_EquipItem_includes','makeDeepCopy','Consumable','itemWindowRectItemsEquipsCore','formula','ATK','getItemEffectsHpDamageLabel','newLabelEnabled','createCategoryWindow','drawParamsItemsEquipsCore','otVcz','JDquX','Scene_Shop_activateSellWindow','updateCommandNameWindow','getItemConsumableLabel','_shopStatusMenuMode','dvcMq','getItemSuccessRateText','addItemCategory','_newLabelOpacityUpperLimit','equipTypes','buttonAssistText2','icon','ItemQuantityFontSize','createCategoryNameWindow','commandSellItemsEquipsCore','CzLsr','isClearCommandAdded','commandWindowRect','item-%1','isDrawItemNumber','drawItemStyleIconText','initNewItemsList','MAT','DWgEN','jDUOc','ARRAYNUM','nonOptimizeEtypes','A%1','EFFECT_ADD_STATE','Scene_Shop_onSellOk','NTbPn','isOptimizeEquipOk','auto','drawItemCustomEntryLine','drawItemStyleIcon','+%1%','contentsBack','process_VisuMZ_ItemsEquipsCore_Notetags','STR','resetFontSettings','Yrzpq','buttonAssistItemListRequirement','Scene_Shop_statusWindowRect','reloadMapIfUpdated','goldWindowRectItemsEquipsCore','rateMP','uRyEg','effects','_goods','isUseItemsEquipsCoreUpdatedLayout','isOpen','buffIconIndex','getItemEffectsTpRecoveryText','commandBuyItemsEquipsCore','ShopMenuStatusStandard','createNewLabelSprite','isEnabled','atk','drawNewLabelText','ParamChangeFontSize','postCreateItemsEquipsCore','max','TP\x20DAMAGE','Game_Actor_changeEquip','armorTypes','pMRdY','Step3Start','BackRectColor','caCCk','bestEquipItem','playCursorSound','getItemEffectsAddedStatesBuffsText','(%1)','refreshCursor','itemLineRect','CLUNo','casjy','isBuyCommandEnabled','MRBQr','ARRAYJSON','Speed2000','setShopStatusWindowMode','TEfLa','ceil','iconWidth','down','buyWindowRect','Scene_Shop_commandSell','item','baere','whHTX','postCreateCategoryWindowItemsEquipsCore','getItemEffectsMpDamageLabel','ItemsEquipsCore','NNolu','prepareNewEquipSlotsOnLoad','EFFECT_REMOVE_STATE','xhlBi','addChild','replace','textWidth','ParseAllNotetags','buttonAssistText3','YzzCt','JOokL','Scene_Equip_itemWindowRect','activateItemWindow','_resetFontColor','commandBuy','placeNewLabel','category','eQixg','CmdCancelRename','isEquipCommandAdded','itemPadding','fontSize','drawItemCost','addSellCommand','activate','map','EquipAdjustHpMp','_slotWindow','_newItemsList','Game_Actor_discardEquip','Game_BattlerBase_meetsItemConditions','addWindow','JaSSg','prepareRefreshItemsEquipsCoreLayout','CmdHideDisabled','CmdIconEquip','IxziX','ObUiM','EFFECT_ADD_DEBUFF','prepareItemCustomData','prepareNextScene','left','RegExp','aNOlm','HbUPC','mainCommandWidth','categoryStyle','fontSizeRatio','text','playOkSound','_goodsCount','uLckl','getItemSuccessRateLabel','updatedLayoutStyle','drawItemEffects','rvQkb','Window_ShopBuy_price','LabelDamageMP','buy','onCategoryCancelItemsEquipsCore','NrZKX','drawUpdatedParamValueDiff','LabelDamageHP','mainFontSize','placeItemNewLabel','nextActor','gainItem','getItemDamageAmountLabelOriginal','gvWke','name','previousActor','(+%1)','checkItemConditionsSwitchNotetags','innerWidth','AllItems','actor','LOlCb','oJUkz','ZdjHN','index','isHoverEnabled','mFLNQ','helpWindowRect','note','drawItemEffectsTpDamage','canEquip','gkGeR','deactivate','fill','Step3End','drawItemConsumable','speed','makeCommandList','HP\x20RECOVERY','version','PBiPy','refreshItemsEquipsCoreNoMenuImage','deselect','textColor','mainAreaBottom','GHEJz','ScYkl','CannotEquipMarker','nsGMR','drawEquipData','SpeedNeg2000','select','itemAt','itemDataFontSize','OriZJ','Scene_Boot_onDatabaseLoaded','drawUpdatedAfterParamValue','possession','ExtDisplayedParams','cursorPageup','wtypeId','param','IconSet','sWJcD','armor-%1','SPEED','hitIndex','gFtcP','AlwaysUsable','commandWindowRectItemsEquipsCore','PASOs','OvXlq','contents','floor','ejcqh','zAScs','fVVaI','mmp','drawItemDarkRect','postCreateItemWindowModernControls','damage','bitmap','owFBd','onSlotOk','updateHelp','nzHho','Window_EquipCommand_initialize','getItemHitTypeText','SpeedNeg1999','cVUJJ','systemColor','OffsetY','goldWindowRect','ElementNone','MaxArmors','RegularItems','cursorRight','createBitmap','getNextAvailableEtypeId','createSlotWindow','pnWdF','convertInitEquipsToItems','currentExt','SFbBc','drawItemEffectsSelfTpGain','QgkKX','Scene_Shop_onBuyCancel','ParseWeaponNotetags','getDamageStyle','gOMEb','cOIxR','drawIcon','kXYsy','sellPriceRate','onTouchSelectModern','mnHbS','getItemEffectsMpDamageText','UDjJx','Step2End','Window_ItemList_drawItem','RemoveEquipText','GoCPR','DrawItemData','HP\x20DAMAGE','BuyPriceJS','isUseParamNamesWithIcons','Scene_Shop_numberWindowRect','ndHqU','fWYXB','split','ScopeAlliesButUser','AsXoR','updateNewLabelOpacity','paramPlusItemsEquipsCoreCustomJS','commandNameWindowCenter','MWdWJ','hide','RemoveEquipIcon','isSellCommandEnabled','OBzTK','_buyWindowLastIndex','JEkyG','Scene_Equip_onSlotCancel','width','setHandler','ShiftShortcutKey','maxVisibleItems','params','getItemEffectsHpDamageText','processTouchModernControls','changePaintOpacity','addCancelCommand','FBmHk','getItemSpeedLabel','addState','playEquip','ywfRk','_commandWindow','Scene_Item_create','getMatchingInitEquip','KQgbl','aXOtG','_categoryNameWindow','Window_Selectable_initialize','OVeBv','_shopStatusMenuAlly','EFFECT_REMOVE_DEBUFF','OTfNa','Game_Actor_tradeItemWithParty','Parse_Notetags_EquipSlots','NPpnt','Game_Actor_forceChangeEquip','Window_ItemList_colSpacing','maxItemAmount','CjLWD','_categoryWindow','pagedown','drawItemNumber','CommandAddOptimize','checkShiftRemoveShortcut','setHp','buttonAssistLargeIncrement','etypeId','QUANTITY','Parse_Notetags_ParamJS','gRmXN','VisuMZ_1_MainMenuCore','currentSymbol','smallParamFontSize','optimizeEquipments','isTriggered','mNsxd','isShowNew','ShopScene','cnuDX','shouldCommandWindowExist','Scene_Shop_sellingPrice','tradeItemWithParty','refresh','setItem','initNewLabelSprites','srsGe','VJtzH','postCreateSellWindowItemsEquipsCore','categoryStyleCheck','Game_BattlerBase_param','isEquipItem','cursorPagedown','Scene_Shop_sellWindowRect','\x5cI[%1]','categoryNameWindowDrawBackground','isArmor','setHelpWindowItem','Scene_Item_categoryWindowRect','loadPicture','removeStateBuffChanges','isUseModernControls','vBXPa','determineBaseSellingPrice','Scene_Shop_commandWindowRect','XZvVm','buttonAssistKey3','drawText','OkaEq','qRwsu','AllArmors','Oztdr','iconText','VYsOi','nPmjs','Scene_Shop_onCategoryCancel','ScopeRandomEnemies','commandStyle','opacity','rhYsg','isHandled','isNewItem','helpWindowRectItemsEquipsCore','_actor','_item','Game_Party_gainItem','getItemRepeatsText','buttonAssistKey2','Igyyf','allowCreateStatusWindow','successRate','SellPriceRate','qxOea','ParseClassNotetags','scrollTo','Qnmho','LabelElement','TextAlign','removeBuff','gxvRY','isBottomHelpMode','getItemEffectsRemovedStatesBuffsLabel','createCommandNameWindow','call','armor','_data','pctBF','Parse_Notetags_Prices','mainAreaHeight','HsLoF','Window_ShopSell_isEnabled','popScene','tKFrz','clearNewLabelFromItem','onDatabaseLoaded','xxmOz','onBuyCancelItemsEquipsCore','NUM','JHaIi','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Scene_Shop_categoryWindowRect','BgxMw','updateMoneyAmount','_category','swRaq','LabelRecoverTP','mqNYL','StatusWindow','bOmKP','commandSell','GalqL','USER\x20TP\x20GAIN','AlreadyEquipMarker','ARRAYEVAL','process_VisuMZ_ItemsEquipsCore_RegExp','defaultItemMax','paramJS','NonRemoveETypes','gainTP','ConvertParams','changeTextColor','Parse_Notetags_ParamValues','playBuzzerSound','modifiedBuyPriceItemsEquipsCore','setItemWindow','UMYQG','List','IncludeShopItem','itemEnableJS','puLfd','ADDED\x20EFFECTS','setupItemDamageTempActors','zhRGL','Nonconsumable','getInputMultiButtonStrings','categoryWindowRectItemsEquipsCore','textSizeEx','itemTextAlign','W%1','ydqEk','FontSize','buttonAssistSlotWindowShift','actorParams','pwlAu','constructor','isOpenAndActive','isEquipCommandEnabled','MaxHP','CmdIconClear','RqPdG','loadFaceImages','Scene_Shop_goldWindowRect','LabelRemove','UZeWT','BBsGi','onCategoryOk','hitType','ListWindowCols','whnkx','allowCommandWindowCursorUp','UbhpM','paintOpacity','_newLabelOpacity','isPressed','isHovered','slotWindowRect','njLJW','getItemEffectsMpRecoveryLabel','XMetF','isEquipChangeOk','versionId','drawItemKeyData','DQDGr','show','_sellWindow','getItemDamageAmountText','HitType%1','isGoodShown','itypeId','equipAdjustHpMp','onSellOkItemsEquipsCore','cursorDown','Step1Start','QryJu','EFLLS','initialize','getItemEffectsHpRecoveryLabel','elements','Window_ShopBuy_refresh','CPDbA','sell','normalColor','numItems','windowPadding','Scene_Shop_buyWindowRect','ParseItemNotetags','Scene_Equip_create','process_VisuMZ_ItemsEquipsCore_EquipSlots','forceChangeEquip','refreshActorEquipSlotsIfUpdated','callUpdateHelp','commandStyleCheck','occasion','fillRect','jeFtt','SellPriceJS','clearEquipments','Veppw','drawActorParamDifference','isPageChangeRequested','lineHeight','×%1','Scene_Item_itemWindowRect','create','isShiftRemoveShortcutEnabled','drawItemEffectsTpRecovery','NeverUsable','CmdStyle','getTextColor','shift','GFjIa','mhp','addInnerChild','FjUrQ','_itemWindow','wfcHv','isCursorMovable','drawItemCustomEntries','right','_resetFontSize','_handlers','Window_ShopCommand_initialize','colSpacing','MenuPortraits','isRightInputMode','itemWindowRect','activateSellWindow','LUAXH','sellWindowRect','Window_ItemCategory_initialize','TMEmb','LabelHitType','drawItemHitType','\x5cb%1\x5cb','onTouchSelect','sPVSw','rLWZN','Parse_Notetags_Category','JmtoB','categoryNameWindowDrawText','izxvR','bind','cursorLeft','clear','KWJsM','format','equipSlots','pageup','_calculatingJSParameters','drawTextEx','commandEquip','changeEquip','EFFECT_RECOVER_MP','discardEquip','LabelSpeed','rEGzR','Translucent','drawParamName','removeState','categories','setStatusWindow','HjMIM','drawItemEffectsMpRecovery','yDprV','EcMhl','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','LabelSuccessRate','yPPRF','onSlotOkAutoSelect','_statusWindow','LayoutStyle','Window_ItemList_maxCols','getItemEffectsAddedStatesBuffsLabel','jHwgJ','repeats','ParamValueFontSize','NgvMh','onTouchOk','drawItemDamageElement','description','MANUAL','Scene_Equip_slotWindowRect','YDNyp','addOptimizeCommand','getItemDamageAmountTextOriginal','clamp','uVojU','meetsItemConditions','LUK','TP\x20RECOVERY','adjustHiddenShownGoods','ElOyI','ssaHv','CmdIconOptimize','buttonAssistCategory','Scene_Equip_createSlotWindow','CmdIconBuy','Param','isWeapon','Damage\x20Formula\x20Error\x20for\x20%1','hideAdditionalSprites','aalri','PbgkU','setNewItem','VisuMZ_0_CoreEngine','rateHP','drawItemDamage','getItemEffectsMpRecoveryText','registerCommand','isCancelled','Window_EquipItem_isEnabled','wWQTA','postCreateSlotWindowItemsEquipsCore','Window_Selectable_refresh','Scene_Equip_commandWindowRect','XbaeA','onSellOk','sellingPrice','statusWindowRectItemsEquipsCore','equip','MP\x20RECOVERY','characterName','Scene_Shop_commandBuy','queCt','Speed0','getItemScopeText','CmdIconCancel','getItemEffectsTpDamageLabel','toUpperCase','round','includes','KeyItems','parse','addBuyCommand','mmHKP','Settings','setObject','splice','HiddenItemB','changeBuff','setTopRow','Window_EquipStatus_refresh','getItemDamageAmountTextBattleCore','elementId','canConsumeItem','Qgqbi','Text','processCursorSpecialCheckModernControls','BatchShop','fyKZN','%1%','MaxWeapons','commandNameWindowDrawText','isKeyItem','paramchangeTextColor','getItemEffectsHpRecoveryText','boxWidth','getItemEffectsTpDamageText','exit','prototype','categoryItemTypes','EFFECT_RECOVER_HP','ItemMenuStatusRect','Parse_Notetags_Batch','ConvertNumberToString','_newLabelSprites','DrawParamJS','ParseArmorNotetags','processCursorHomeEndTrigger','BattleUsable','match','drawItemSpeed','slotWindowRectItemsEquipsCore','processCursorMoveModernControls','indexOf','_numberWindow','IPXth','_tempActorB','lZigw','yWzuG','_commandNameWindow','BAMQO','MlNfS','adjustItemWidthByStatus','Occasion%1','onSellCancel','HiddenItemA','addCommand','cDCIc','DMhBl','JRqvv','currentClass','Window_Selectable_update','type','maxCols','Speed1','commandNameWindowDrawBackground','ZYtaw','StatusWindowWidth','VvSRY','ahQvP','commandName','push','log','dOSNT','getItemQuantityText','STRUCT','getColor','xZbfW','lkCXz','meetsItemConditionsNotetags','drawItemActorMenuImage','statusWidth','loadSystem','value','kLuZC','drawItemEffectsRemovedStatesBuffs','Scene_Shop_onSellCancel','Step1End','isPlaytest','Game_Actor_paramPlus','resetTextColor','YkCov','DrawFaceJS','drawItemEffectsMpDamage','EFFECT_GAIN_TP','ShowShopStatus','canShiftRemoveEquipment','return\x200','KmcqO','Ywkru','CommandAddClear','AllWeapons','cancel','drawItem','hpRate','suiBo','weapon-%1','processCursorMove','getItemsEquipsCoreBackColor2','_tempActor','releaseUnequippableItems','Icon','powerDownColor','mainFontFace','cnSVu','addStateBuffChanges','getItemEffectsSelfTpGainLabel','onCategoryCancel','ScopeRandomAllies','Window_ItemList_updateHelp','getItemConsumableText','height','status','getItemRepeatsLabel','limitedPageUpDownSceneCheck','iconIndex','asIlo','lktZc','center','drawItemDamageAmount','trim','_customItemInfo'];(function(_0x132eea,_0x5bd111){const _0x4ed4e4=function(_0x3d130b){while(--_0x3d130b){_0x132eea['push'](_0x132eea['shift']());}};_0x4ed4e4(++_0x5bd111);}(_0x5bd1,0x11d));const _0x4ed4=function(_0x132eea,_0x5bd111){_0x132eea=_0x132eea-0x0;let _0x4ed4e4=_0x5bd1[_0x132eea];return _0x4ed4e4;};const _0x44d0c2=_0x4ed4;var label=_0x44d0c2('0x49'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x44d0c2('0x373')](function(_0x1c71b9){const _0x42cc38=_0x44d0c2;return _0x1c71b9[_0x42cc38('0x2ff')]&&_0x1c71b9[_0x42cc38('0x251')][_0x42cc38('0x284')]('['+label+']');})[0x0];VisuMZ[label][_0x44d0c2('0x289')]=VisuMZ[label][_0x44d0c2('0x289')]||{},VisuMZ['ConvertParams']=function(_0xf52985,_0xbb87b8){const _0x38bdae=_0x44d0c2;for(const _0x4b3a5d in _0xbb87b8){if(_0x38bdae('0x17b')!==_0x38bdae('0x17b')){function _0x4f7998(){const _0x9dc837=_0x38bdae;_0x6b795e[_0x9dc837('0x49')][_0x9dc837('0x33f')]['call'](this,_0x252d74),_0x2135d6[_0x9dc837('0x130')]=this;}}else{if(_0x4b3a5d['match'](/(.*):(.*)/i)){const _0x50f572=String(RegExp['$1']),_0x4539bc=String(RegExp['$2'])[_0x38bdae('0x282')]()[_0x38bdae('0x307')]();let _0x16ba24,_0x565459,_0x282a63;switch(_0x4539bc){case _0x38bdae('0x191'):_0x16ba24=_0xbb87b8[_0x4b3a5d]!==''?Number(_0xbb87b8[_0x4b3a5d]):0x0;break;case _0x38bdae('0x5'):_0x565459=_0xbb87b8[_0x4b3a5d]!==''?JSON[_0x38bdae('0x286')](_0xbb87b8[_0x4b3a5d]):[],_0x16ba24=_0x565459[_0x38bdae('0x63')](_0x1aad05=>Number(_0x1aad05));break;case'EVAL':_0x16ba24=_0xbb87b8[_0x4b3a5d]!==''?eval(_0xbb87b8[_0x4b3a5d]):null;break;case _0x38bdae('0x1a1'):_0x565459=_0xbb87b8[_0x4b3a5d]!==''?JSON['parse'](_0xbb87b8[_0x4b3a5d]):[],_0x16ba24=_0x565459[_0x38bdae('0x63')](_0x2746a3=>eval(_0x2746a3));break;case _0x38bdae('0x3c6'):_0x16ba24=_0xbb87b8[_0x4b3a5d]!==''?JSON['parse'](_0xbb87b8[_0x4b3a5d]):'';break;case _0x38bdae('0x3b'):_0x565459=_0xbb87b8[_0x4b3a5d]!==''?JSON[_0x38bdae('0x286')](_0xbb87b8[_0x4b3a5d]):[],_0x16ba24=_0x565459['map'](_0x5223ae=>JSON['parse'](_0x5223ae));break;case _0x38bdae('0x318'):_0x16ba24=_0xbb87b8[_0x4b3a5d]!==''?new Function(JSON[_0x38bdae('0x286')](_0xbb87b8[_0x4b3a5d])):new Function(_0x38bdae('0x2e6'));break;case'ARRAYFUNC':_0x565459=_0xbb87b8[_0x4b3a5d]!==''?JSON['parse'](_0xbb87b8[_0x4b3a5d]):[],_0x16ba24=_0x565459['map'](_0x2df0fa=>new Function(JSON['parse'](_0x2df0fa)));break;case _0x38bdae('0x12'):_0x16ba24=_0xbb87b8[_0x4b3a5d]!==''?String(_0xbb87b8[_0x4b3a5d]):'';break;case'ARRAYSTR':_0x565459=_0xbb87b8[_0x4b3a5d]!==''?JSON[_0x38bdae('0x286')](_0xbb87b8[_0x4b3a5d]):[],_0x16ba24=_0x565459[_0x38bdae('0x63')](_0xa57cfb=>String(_0xa57cfb));break;case _0x38bdae('0x2d0'):_0x282a63=_0xbb87b8[_0x4b3a5d]!==''?JSON[_0x38bdae('0x286')](_0xbb87b8[_0x4b3a5d]):{},_0xf52985[_0x50f572]={},VisuMZ['ConvertParams'](_0xf52985[_0x50f572],_0x282a63);continue;case _0x38bdae('0x347'):_0x565459=_0xbb87b8[_0x4b3a5d]!==''?JSON[_0x38bdae('0x286')](_0xbb87b8[_0x4b3a5d]):[],_0x16ba24=_0x565459[_0x38bdae('0x63')](_0x282faf=>VisuMZ[_0x38bdae('0x1a7')]({},JSON['parse'](_0x282faf)));break;default:continue;}_0xf52985[_0x50f572]=_0x16ba24;}}}return _0xf52985;},(_0x36c8f1=>{const _0x158f15=_0x44d0c2,_0x81cfbd=_0x36c8f1[_0x158f15('0x8f')];for(const _0x1a4fd8 of dependencies){if(!Imported[_0x1a4fd8]){if('psviT'!=='psviT'){function _0x327799(){return![];}}else{alert(_0x158f15('0x193')[_0x158f15('0x22f')](_0x81cfbd,_0x1a4fd8)),SceneManager[_0x158f15('0x2a0')]();break;}}}const _0x5a0489=_0x36c8f1[_0x158f15('0x251')];if(_0x5a0489['match'](/\[Version[ ](.*?)\]/i)){const _0x172858=Number(RegExp['$1']);_0x172858!==VisuMZ[label][_0x158f15('0xa8')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x158f15('0x22f')](_0x81cfbd,_0x172858)),SceneManager[_0x158f15('0x2a0')]());}if(_0x5a0489[_0x158f15('0x2ac')](/\[Tier[ ](\d+)\]/i)){const _0x2c3e28=Number(RegExp['$1']);if(_0x2c3e28<tier)alert(_0x158f15('0x243')[_0x158f15('0x22f')](_0x81cfbd,_0x2c3e28,tier)),SceneManager['exit']();else{if(_0x158f15('0x19c')!==_0x158f15('0x271'))tier=Math[_0x158f15('0x29')](_0x2c3e28,tier);else{function _0x176ab0(){const _0x4c3bc7=_0x158f15;if(_0x2e36e1[_0x4c3bc7('0x49')]['Settings'][_0x4c3bc7('0x19b')][_0x4c3bc7('0x357')]===![])return;_0x137e83=_0x4cad4d['max'](_0x16bcfe||0x1,0x1);while(_0x8c7722--){_0x390b3c=_0x4c4488||this[_0x4c3bc7('0x202')](),this[_0x4c3bc7('0x10')]['paintOpacity']=0xa0;const _0x2c3d22=_0x539cac[_0x4c3bc7('0x3b8')]();this[_0x4c3bc7('0x10')][_0x4c3bc7('0x1fb')](_0xc0f2e3+0x1,_0x2eca2d+0x1,_0x5b2917-0x2,_0x4d90ea-0x2,_0x2c3d22),this[_0x4c3bc7('0x10')][_0x4c3bc7('0x1d1')]=0xff;}}}}}VisuMZ[_0x158f15('0x1a7')](VisuMZ[label][_0x158f15('0x289')],_0x36c8f1[_0x158f15('0x34c')]);})(pluginData),PluginManager[_0x44d0c2('0x26e')](pluginData['name'],_0x44d0c2('0x296'),_0x42f87b=>{const _0x26e7c1=_0x44d0c2;VisuMZ[_0x26e7c1('0x1a7')](_0x42f87b,_0x42f87b);const _0x3341b3=[],_0x3a4bdd=_0x42f87b[_0x26e7c1('0x31c')][_0x26e7c1('0x63')](_0x3fa4ee=>_0x3fa4ee[_0x26e7c1('0x282')]()[_0x26e7c1('0x307')]()),_0x247e6a=_0x42f87b[_0x26e7c1('0x331')][_0x26e7c1('0x63')](_0x54ab2f=>_0x54ab2f[_0x26e7c1('0x282')]()[_0x26e7c1('0x307')]()),_0x38e025=_0x42f87b[_0x26e7c1('0x2dc')]>=_0x42f87b['Step1Start']?_0x42f87b[_0x26e7c1('0x1e6')]:_0x42f87b[_0x26e7c1('0x2dc')],_0x60936e=_0x42f87b[_0x26e7c1('0x2dc')]>=_0x42f87b[_0x26e7c1('0x1e6')]?_0x42f87b['Step1End']:_0x42f87b[_0x26e7c1('0x1e6')],_0x43ea47=Array(_0x60936e-_0x38e025+0x1)[_0x26e7c1('0xa2')]()[_0x26e7c1('0x63')]((_0x15cb6a,_0x41948a)=>_0x38e025+_0x41948a);for(const _0x583e62 of _0x43ea47){if('AXJEU'!=='clvYD'){const _0x246ae2=$dataItems[_0x583e62];if(!_0x246ae2)continue;if(!VisuMZ['ItemsEquipsCore'][_0x26e7c1('0x1af')](_0x246ae2,_0x3a4bdd,_0x247e6a))continue;_0x3341b3[_0x26e7c1('0x2cc')]([0x0,_0x583e62,0x0,_0x246ae2['price']]);}else{function _0x311eff(){return _0x317f37[_0x2f90c8];}}}const _0x890718=_0x42f87b[_0x26e7c1('0xf7')]>=_0x42f87b[_0x26e7c1('0x3a3')]?_0x42f87b[_0x26e7c1('0x3a3')]:_0x42f87b[_0x26e7c1('0xf7')],_0x155795=_0x42f87b[_0x26e7c1('0xf7')]>=_0x42f87b['Step2Start']?_0x42f87b[_0x26e7c1('0xf7')]:_0x42f87b[_0x26e7c1('0x3a3')],_0x4e7803=Array(_0x155795-_0x890718+0x1)[_0x26e7c1('0xa2')]()[_0x26e7c1('0x63')]((_0x664ee6,_0x4fe931)=>_0x890718+_0x4fe931);for(const _0x10f55f of _0x4e7803){const _0x258242=$dataWeapons[_0x10f55f];if(!_0x258242)continue;if(!VisuMZ[_0x26e7c1('0x49')][_0x26e7c1('0x1af')](_0x258242,_0x3a4bdd,_0x247e6a))continue;_0x3341b3['push']([0x1,_0x10f55f,0x0,_0x258242[_0x26e7c1('0x3c1')]]);}const _0x484e1c=_0x42f87b['Step3End']>=_0x42f87b[_0x26e7c1('0x2e')]?_0x42f87b[_0x26e7c1('0x2e')]:_0x42f87b[_0x26e7c1('0xa3')],_0x72367b=_0x42f87b[_0x26e7c1('0xa3')]>=_0x42f87b['Step3Start']?_0x42f87b[_0x26e7c1('0xa3')]:_0x42f87b['Step3Start'],_0x5e8727=Array(_0x72367b-_0x484e1c+0x1)[_0x26e7c1('0xa2')]()['map']((_0x526b82,_0x5b9545)=>_0x484e1c+_0x5b9545);for(const _0x4e36c8 of _0x5e8727){const _0x133188=$dataArmors[_0x4e36c8];if(!_0x133188)continue;if(!VisuMZ['ItemsEquipsCore'][_0x26e7c1('0x1af')](_0x133188,_0x3a4bdd,_0x247e6a))continue;_0x3341b3[_0x26e7c1('0x2cc')]([0x2,_0x4e36c8,0x0,_0x133188['price']]);}SceneManager[_0x26e7c1('0x2cc')](Scene_Shop),SceneManager[_0x26e7c1('0x72')](_0x3341b3,_0x42f87b['PurchaseOnly']);}),VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x1af')]=function(_0x12ec28,_0x12a073,_0x307eaa){const _0x2777cc=_0x44d0c2;if(_0x12ec28[_0x2777cc('0x8f')][_0x2777cc('0x307')]()==='')return![];if(_0x12ec28[_0x2777cc('0x8f')][_0x2777cc('0x2ac')](/-----/i))return![];const _0x27c488=_0x12ec28[_0x2777cc('0x23d')];if(_0x12a073[_0x2777cc('0x3f3')]>0x0)for(const _0x219370 of _0x12a073){if(_0x2777cc('0x2e7')===_0x2777cc('0x15d')){function _0x263e01(){const _0x3a50be=_0x2777cc;return _0x3ceffd['ItemsEquipsCore'][_0x3a50be('0x289')][_0x3a50be('0x142')][_0x3a50be('0x177')];}}else{if(!_0x219370)continue;if(_0x27c488[_0x2777cc('0x284')](_0x219370))return![];}}if(_0x307eaa[_0x2777cc('0x3f3')]>0x0){for(const _0x39e447 of _0x307eaa){if('kXYsy'===_0x2777cc('0xf1')){if(!_0x39e447)continue;if(_0x27c488[_0x2777cc('0x284')](_0x39e447))return!![];}else{function _0x3f4d8d(){const _0x81c074=_0x2777cc;this[_0x81c074('0x22c')](_0x5e7b48['isTriggered']('left'));}}}return![];}return!![];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0xb8')]=Scene_Boot[_0x44d0c2('0x2a1')][_0x44d0c2('0x18e')],Scene_Boot['prototype'][_0x44d0c2('0x18e')]=function(){const _0x3b3773=_0x44d0c2;this[_0x3b3773('0x1a2')](),VisuMZ[_0x3b3773('0x49')][_0x3b3773('0xb8')][_0x3b3773('0x183')](this),this[_0x3b3773('0x11')]();},Scene_Boot['prototype'][_0x44d0c2('0x1a2')]=function(){const _0x3eaf91=_0x44d0c2;VisuMZ[_0x3eaf91('0x49')][_0x3eaf91('0x74')]={},VisuMZ[_0x3eaf91('0x49')][_0x3eaf91('0x74')][_0x3eaf91('0x3af')]=[],VisuMZ['ItemsEquipsCore'][_0x3eaf91('0x74')][_0x3eaf91('0x332')]=[];const _0x47a2d0=[_0x3eaf91('0x1c3'),_0x3eaf91('0x3eb'),_0x3eaf91('0x40c'),_0x3eaf91('0x3cf'),_0x3eaf91('0x2'),'MDF',_0x3eaf91('0x3ae'),_0x3eaf91('0x25a')];for(const _0x893bef of _0x47a2d0){if('RZIBm'===_0x3eaf91('0x1e8')){function _0x3321f6(){const _0x5ae596=_0x3eaf91;_0x32537e[_0x5ae596('0x49')][_0x5ae596('0x2a9')][_0x5ae596('0x183')](this,_0x501ccd),_0x16357c[_0x5ae596('0x49')][_0x5ae596('0x2a5')](_0x4d4bd0,_0x55b109);}}else{const _0x5834b7=_0x3eaf91('0x359')['format'](_0x893bef);VisuMZ[_0x3eaf91('0x49')]['RegExp'][_0x3eaf91('0x3af')][_0x3eaf91('0x2cc')](new RegExp(_0x5834b7,'i'));const _0x75c9e7=_0x3eaf91('0x223')['format'](_0x893bef);VisuMZ['ItemsEquipsCore'][_0x3eaf91('0x74')][_0x3eaf91('0x332')][_0x3eaf91('0x2cc')](new RegExp(_0x75c9e7,'g'));}}},Scene_Boot[_0x44d0c2('0x2a1')][_0x44d0c2('0x11')]=function(){const _0x2d3be7=_0x44d0c2;if(VisuMZ[_0x2d3be7('0x51')])return;this[_0x2d3be7('0x1f5')]();const _0x50b8b8=[$dataItems,$dataWeapons,$dataArmors];for(const _0x5105be of _0x50b8b8){for(const _0x525f80 of _0x5105be){if(!_0x525f80)continue;VisuMZ[_0x2d3be7('0x49')][_0x2d3be7('0x227')](_0x525f80,_0x5105be),VisuMZ['ItemsEquipsCore'][_0x2d3be7('0x187')](_0x525f80,_0x5105be),VisuMZ['ItemsEquipsCore'][_0x2d3be7('0x1a9')](_0x525f80,_0x5105be),VisuMZ[_0x2d3be7('0x49')][_0x2d3be7('0x139')](_0x525f80,_0x5105be),VisuMZ[_0x2d3be7('0x49')][_0x2d3be7('0x32e')](_0x525f80,_0x5105be);}}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0xd339da=_0x44d0c2;for(const _0x2f03ec of $dataClasses){if(!_0x2f03ec)continue;VisuMZ[_0xd339da('0x49')][_0xd339da('0x12a')](_0x2f03ec);}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x179')]=VisuMZ[_0x44d0c2('0x179')],VisuMZ['ParseClassNotetags']=function(_0x5c56ce){const _0x5bcedc=_0x44d0c2;VisuMZ[_0x5bcedc('0x49')][_0x5bcedc('0x179')][_0x5bcedc('0x183')](this,_0x5c56ce),VisuMZ[_0x5bcedc('0x49')][_0x5bcedc('0x12a')](_0x5c56ce);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x1f3')]=VisuMZ[_0x44d0c2('0x1f3')],VisuMZ['ParseItemNotetags']=function(_0xcf10b){const _0x46b7c7=_0x44d0c2;VisuMZ[_0x46b7c7('0x49')]['ParseItemNotetags'][_0x46b7c7('0x183')](this,_0xcf10b),VisuMZ['ItemsEquipsCore'][_0x46b7c7('0x2a5')](_0xcf10b,$dataItems);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0xec')]=VisuMZ[_0x44d0c2('0xec')],VisuMZ[_0x44d0c2('0xec')]=function(_0xf17c1f){const _0x4ac375=_0x44d0c2;VisuMZ[_0x4ac375('0x49')][_0x4ac375('0xec')][_0x4ac375('0x183')](this,_0xf17c1f),VisuMZ[_0x4ac375('0x49')][_0x4ac375('0x2a5')](_0xf17c1f,$dataWeapons);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x2a9')]=VisuMZ[_0x44d0c2('0x2a9')],VisuMZ[_0x44d0c2('0x2a9')]=function(_0x3e173e){const _0x14ecde=_0x44d0c2;VisuMZ['ItemsEquipsCore']['ParseArmorNotetags'][_0x14ecde('0x183')](this,_0x3e173e),VisuMZ[_0x14ecde('0x49')][_0x14ecde('0x2a5')](_0x3e173e,$dataArmors);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x12a')]=function(_0x49330e){const _0x53148c=_0x44d0c2;_0x49330e[_0x53148c('0x230')]=[];if(_0x49330e[_0x53148c('0x9d')][_0x53148c('0x2ac')](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if(_0x53148c('0xa')!==_0x53148c('0xa')){function _0x2984a6(){const _0x12f7b9=_0x53148c;return!_0x3f3c4d&&this[_0x12f7b9('0x3d5')]()[_0x12f7b9('0x284')](this[_0x12f7b9('0x137')]())?![]:_0x5cba91[_0x12f7b9('0x49')][_0x12f7b9('0x270')][_0x12f7b9('0x183')](this,_0x2f629e);}}else{const _0x2a02d5=String(RegExp['$1'])[_0x53148c('0x102')](/[\r\n]+/);for(const _0x41c7fa of _0x2a02d5){const _0x5c0fe5=$dataSystem[_0x53148c('0x41b')]['indexOf'](_0x41c7fa[_0x53148c('0x307')]());if(_0x5c0fe5>0x0)_0x49330e[_0x53148c('0x230')][_0x53148c('0x2cc')](_0x5c0fe5);}}}else for(const _0x33ff88 of $dataSystem[_0x53148c('0x41b')]){const _0x42b44f=$dataSystem['equipTypes'][_0x53148c('0x2b0')](_0x33ff88[_0x53148c('0x307')]());if(_0x42b44f>0x0)_0x49330e[_0x53148c('0x230')][_0x53148c('0x2cc')](_0x42b44f);}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x2a5')]=function(_0x4d343f,_0x225217){const _0x3d007d=_0x44d0c2;VisuMZ['ItemsEquipsCore'][_0x3d007d('0x227')](_0x4d343f,_0x225217),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x4d343f,_0x225217),VisuMZ['ItemsEquipsCore'][_0x3d007d('0x1a9')](_0x4d343f,_0x225217),VisuMZ['ItemsEquipsCore'][_0x3d007d('0x139')](_0x4d343f,_0x225217),VisuMZ[_0x3d007d('0x49')]['Parse_Notetags_EnableJS'](_0x4d343f,_0x225217);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x227')]=function(_0x2ac074,_0x56a429){const _0x16c4c5=_0x44d0c2;_0x2ac074[_0x16c4c5('0x23d')]=[];const _0x731b25=_0x2ac074[_0x16c4c5('0x9d')],_0x5571f1=_0x731b25[_0x16c4c5('0x2ac')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x5571f1)for(const _0x438c74 of _0x5571f1){if(_0x16c4c5('0x160')==='RiOuu'){function _0x22a76(){const _0x769d44=_0x16c4c5;if(_0x4da55c===_0x38da4f)return;if(_0x6fad21[_0x769d44('0x9d')][_0x769d44('0x2ac')](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x1bd34c=_0x435f13(_0x47c873['$1']),_0x364b35=(_0x3a8f71===_0x5af353?_0x769d44('0x1ba'):'A%1')[_0x769d44('0x22f')](_0x5bffcd['id']),_0x2f81a3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'[_0x769d44('0x22f')](_0x1bd34c);for(let _0x457c7b=0x0;_0x457c7b<0x8;_0x457c7b++){if(_0x1bd34c[_0x769d44('0x2ac')](_0x16573b[_0x769d44('0x49')][_0x769d44('0x74')][_0x769d44('0x332')][_0x457c7b])){const _0x31ed6d=_0x769d44('0x3f5')[_0x769d44('0x22f')](_0x364b35,_0x457c7b);_0x33b625[_0x769d44('0x49')][_0x769d44('0x1a4')][_0x31ed6d]=new _0x2750c3('item','paramId',_0x2f81a3);}}}}}else{_0x438c74[_0x16c4c5('0x2ac')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3ff5ba=String(RegExp['$1'])['toUpperCase']()[_0x16c4c5('0x307')]()[_0x16c4c5('0x102')](',');for(const _0x2ba1d6 of _0x3ff5ba){_0x2ac074[_0x16c4c5('0x23d')][_0x16c4c5('0x2cc')](_0x2ba1d6[_0x16c4c5('0x307')]());}}}if(_0x731b25[_0x16c4c5('0x2ac')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if('JoyqT'!==_0x16c4c5('0x163')){const _0x3d7d62=RegExp['$1'][_0x16c4c5('0x102')](/[\r\n]+/);for(const _0x19508a of _0x3d7d62){_0x2ac074[_0x16c4c5('0x23d')]['push'](_0x19508a[_0x16c4c5('0x282')]()[_0x16c4c5('0x307')]());}}else{function _0x22c7a9(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x187')]=function(_0x371ed9,_0x156086){const _0x29e60f=_0x44d0c2;_0x371ed9[_0x29e60f('0x9d')][_0x29e60f('0x2ac')](/<PRICE:[ ](\d+)>/i)&&(_0x371ed9['price']=Number(RegExp['$1']));},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x1a9')]=function(_0xd48ee3,_0x2938d8){const _0x28c6cc=_0x44d0c2;if(_0x2938d8===$dataItems)return;for(let _0x53628e=0x0;_0x53628e<0x8;_0x53628e++){const _0x1f0c9b=VisuMZ[_0x28c6cc('0x49')][_0x28c6cc('0x74')][_0x28c6cc('0x3af')][_0x53628e];_0xd48ee3[_0x28c6cc('0x9d')][_0x28c6cc('0x2ac')](_0x1f0c9b)&&(_0xd48ee3[_0x28c6cc('0x114')][_0x53628e]=parseInt(RegExp['$1']));}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x1a4')]={},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x139')]=function(_0x34ae16,_0x3936f8){const _0xbe3c1c=_0x44d0c2;if(_0x3936f8===$dataItems)return;if(_0x34ae16['note']['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0xbe3c1c('0x365')!==_0xbe3c1c('0x365')){function _0x3eddf7(){const _0x54524e=_0xbe3c1c,_0x322015=_0x4b97c9[_0x54524e('0x1a0')];this[_0x54524e('0x15f')](_0x322015,_0x480192,_0xec682d,_0x11cb65,'center');}}else{const _0x261521=String(RegExp['$1']),_0x1c9c1a=(_0x3936f8===$dataWeapons?_0xbe3c1c('0x1ba'):_0xbe3c1c('0x7'))[_0xbe3c1c('0x22f')](_0x34ae16['id']),_0x50ac14=_0xbe3c1c('0x3ec')[_0xbe3c1c('0x22f')](_0x261521);for(let _0x170447=0x0;_0x170447<0x8;_0x170447++){if(_0x261521[_0xbe3c1c('0x2ac')](VisuMZ[_0xbe3c1c('0x49')][_0xbe3c1c('0x74')][_0xbe3c1c('0x332')][_0x170447])){if('Cblcr'!=='Cblcr'){function _0x33aab3(){const _0x3e5724=_0xbe3c1c;return _0x3e581d[_0x3e5724('0x49')]['Settings'][_0x3e5724('0x3f7')][_0x3e5724('0x3fd')];}}else{const _0x3b4ff4=_0xbe3c1c('0x3f5')['format'](_0x1c9c1a,_0x170447);VisuMZ[_0xbe3c1c('0x49')][_0xbe3c1c('0x1a4')][_0x3b4ff4]=new Function('item','paramId',_0x50ac14);}}}}}},VisuMZ[_0x44d0c2('0x49')]['itemEnableJS']={},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x32e')]=function(_0x1503cf,_0x37ab8d){const _0x2c4a8c=_0x44d0c2;if(_0x37ab8d!==$dataItems)return;if(_0x1503cf[_0x2c4a8c('0x9d')][_0x2c4a8c('0x2ac')](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x17ce77=String(RegExp['$1']),_0x10da5e=_0x2c4a8c('0x3d1')[_0x2c4a8c('0x22f')](_0x17ce77);VisuMZ[_0x2c4a8c('0x49')]['itemEnableJS'][_0x1503cf['id']]=new Function(_0x2c4a8c('0x44'),_0x10da5e);}},DataManager[_0x44d0c2('0x29b')]=function(_0x8153fd){const _0x292691=_0x44d0c2;return this['isItem'](_0x8153fd)&&_0x8153fd[_0x292691('0x1e2')]===0x2;},DataManager['maxItemAmount']=function(_0x1eaa32){const _0x9aca66=_0x44d0c2;if(!_0x1eaa32){if(_0x9aca66('0x3f6')===_0x9aca66('0x86')){function _0x132630(){const _0x49265c=_0x9aca66;return _0x30e695[_0x49265c('0x1b6')]('up',_0x49265c('0x41'));}}else return 0x63;}else{if(_0x1eaa32[_0x9aca66('0x9d')][_0x9aca66('0x2ac')](/<MAX:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x9aca66('0x1c9')===_0x9aca66('0x11d')){function _0x16f17c(){const _0x56eb62=_0x9aca66;_0x19c845[_0x56eb62('0x49')][_0x56eb62('0x11f')][_0x56eb62('0x183')](this),this['isUseModernControls']()&&this[_0x56eb62('0x1cb')]();}}else return this[_0x9aca66('0x1a3')](_0x1eaa32);}}},DataManager[_0x44d0c2('0x1a3')]=function(_0x1fc0e6){const _0x1dcdd0=_0x44d0c2;if(this['isItem'](_0x1fc0e6)){if(_0x1dcdd0('0x174')!=='PjYPl')return VisuMZ[_0x1dcdd0('0x49')]['Settings'][_0x1dcdd0('0x3f7')]['MaxItems'];else{function _0x3c1101(){const _0x184f43=_0x1dcdd0;if(_0x10ea45[_0x184f43('0x3a4')]&&_0x174875['uiHelpPosition']!==_0x2e8fdf)return _0x2b0c9[_0x184f43('0x36b')];else{if(this[_0x184f43('0x1d')]())return this[_0x184f43('0x7f')]()['match'](/LOWER/i);else _0x2a3b7d[_0x184f43('0x2a1')][_0x184f43('0x21a')][_0x184f43('0x183')](this);}}}}else{if(this[_0x1dcdd0('0x264')](_0x1fc0e6)){if(_0x1dcdd0('0xaf')!=='ScYkl'){function _0x28bea9(){const _0x356073=_0x1dcdd0;return _0x1b70f9[_0x356073('0x1b6')](_0x356073('0x73'),_0x356073('0x214'));}}else return VisuMZ[_0x1dcdd0('0x49')][_0x1dcdd0('0x289')]['ItemScene'][_0x1dcdd0('0x299')];}else{if(this[_0x1dcdd0('0x154')](_0x1fc0e6))return VisuMZ[_0x1dcdd0('0x49')][_0x1dcdd0('0x289')][_0x1dcdd0('0x3f7')][_0x1dcdd0('0xdf')];}}},ColorManager['getItemColor']=function(_0x48836d){const _0x405794=_0x44d0c2;if(!_0x48836d){if('JdLcX'!==_0x405794('0x13a'))return this[_0x405794('0x1ef')]();else{function _0x2da2b8(){const _0xedb1e3=_0x405794;_0x12d730[_0xedb1e3('0x49')][_0xedb1e3('0x397')]['call'](this),this['_itemWindow'][_0xedb1e3('0x1f8')]();}}}else{if(_0x48836d[_0x405794('0x9d')][_0x405794('0x2ac')](/<COLOR:[ ](\d+)>/i))return this[_0x405794('0xac')](Number(RegExp['$1'])['clamp'](0x0,0x1f));else return _0x48836d[_0x405794('0x9d')]['match'](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x405794('0x1ef')]();}},ColorManager['getColor']=function(_0x28ce95){const _0x129d2d=_0x44d0c2;return _0x28ce95=String(_0x28ce95),_0x28ce95['match'](/#(.*)/i)?_0x129d2d('0x3cd')[_0x129d2d('0x22f')](String(RegExp['$1'])):this[_0x129d2d('0xac')](Number(_0x28ce95));},Game_Temp['prototype'][_0x44d0c2('0x40e')]=function(){const _0x15c144=_0x44d0c2;if(this[_0x15c144('0x34a')])return![];return VisuMZ[_0x15c144('0x49')][_0x15c144('0x289')]['New']['Enable'];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x289')][_0x44d0c2('0x19b')][_0x44d0c2('0x3cc')],VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x14e')]=Game_BattlerBase[_0x44d0c2('0x2a1')][_0x44d0c2('0xbe')],Game_BattlerBase[_0x44d0c2('0x2a1')][_0x44d0c2('0xbe')]=function(_0x46b52c){const _0x185f71=_0x44d0c2;return this[_0x185f71('0x416')]?this[_0x185f71('0x126')]?VisuMZ[_0x185f71('0x22')]:0x1:VisuMZ[_0x185f71('0x49')][_0x185f71('0x14e')]['call'](this,_0x46b52c);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x68')]=Game_BattlerBase[_0x44d0c2('0x2a1')][_0x44d0c2('0x259')],Game_BattlerBase[_0x44d0c2('0x2a1')][_0x44d0c2('0x259')]=function(_0xad40b1){const _0x1c0d34=_0x44d0c2;if(!_0xad40b1)return![];if(!VisuMZ[_0x1c0d34('0x49')][_0x1c0d34('0x68')][_0x1c0d34('0x183')](this,_0xad40b1))return![];if(!this['meetsItemConditionsNotetags'](_0xad40b1))return![];if(!this[_0x1c0d34('0x3e3')](_0xad40b1))return![];return!![];},Game_BattlerBase[_0x44d0c2('0x2a1')][_0x44d0c2('0x2d4')]=function(_0x5426d0){const _0x467df9=_0x44d0c2;if(!this[_0x467df9('0x92')](_0x5426d0))return![];return!![];},Game_BattlerBase['prototype'][_0x44d0c2('0x92')]=function(_0x2146e1){const _0x3bf13c=_0x44d0c2,_0x4c6d6d=_0x2146e1[_0x3bf13c('0x9d')];if(_0x4c6d6d['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x572191=JSON[_0x3bf13c('0x286')]('['+RegExp['$1'][_0x3bf13c('0x2ac')](/\d+/g)+']');for(const _0x4d1749 of _0x572191){if(!$gameSwitches[_0x3bf13c('0x2d8')](_0x4d1749))return![];}return!![];}if(_0x4c6d6d[_0x3bf13c('0x2ac')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x297d63=JSON['parse']('['+RegExp['$1'][_0x3bf13c('0x2ac')](/\d+/g)+']');for(const _0x20f099 of _0x297d63){if(!$gameSwitches[_0x3bf13c('0x2d8')](_0x20f099))return![];}return!![];}if(_0x4c6d6d['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd2efb=JSON[_0x3bf13c('0x286')]('['+RegExp['$1'][_0x3bf13c('0x2ac')](/\d+/g)+']');for(const _0x583503 of _0xd2efb){if($gameSwitches['value'](_0x583503))return!![];}return![];}if(_0x4c6d6d[_0x3bf13c('0x2ac')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b5bba=JSON[_0x3bf13c('0x286')]('['+RegExp['$1'][_0x3bf13c('0x2ac')](/\d+/g)+']');for(const _0x4e2dfd of _0x5b5bba){if(_0x3bf13c('0x1d8')!==_0x3bf13c('0x1d8')){function _0x58d279(){const _0x41e2e5=_0x3bf13c;if(_0x13727f[_0x41e2e5('0x2d8')](_0x229bc7))return![];}}else{if(!$gameSwitches[_0x3bf13c('0x2d8')](_0x4e2dfd))return!![];}}return![];}if(_0x4c6d6d[_0x3bf13c('0x2ac')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5cec52=JSON[_0x3bf13c('0x286')]('['+RegExp['$1'][_0x3bf13c('0x2ac')](/\d+/g)+']');for(const _0x364027 of _0x5cec52){if(_0x3bf13c('0x3d3')===_0x3bf13c('0x3d3')){if(!$gameSwitches[_0x3bf13c('0x2d8')](_0x364027))return!![];}else{function _0x5d726e(){const _0x53079a=_0x3bf13c,_0x7e6cb=this['getNextAvailableEtypeId'](_0x3b8c58);if(_0x7e6cb<0x0)return;const _0x1a3770=_0x1c3e35===0x1?_0x1c55a5[_0x5b858f]:_0x3f6c1c[_0x4649d2];this[_0x53079a('0x235')](_0x7e6cb,_0x1a3770);}}}return![];}if(_0x4c6d6d[_0x3bf13c('0x2ac')](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f85d8=JSON[_0x3bf13c('0x286')]('['+RegExp['$1'][_0x3bf13c('0x2ac')](/\d+/g)+']');for(const _0x3b2635 of _0x1f85d8){if($gameSwitches[_0x3bf13c('0x2d8')](_0x3b2635))return![];}return!![];}return!![];},Game_BattlerBase['prototype']['meetsItemConditionsJS']=function(_0x367f29){const _0x1d1760=_0x44d0c2,_0x5556c7=_0x367f29[_0x1d1760('0x9d')],_0x3ca841=VisuMZ[_0x1d1760('0x49')][_0x1d1760('0x1b0')];if(_0x3ca841[_0x367f29['id']])return _0x3ca841[_0x367f29['id']]['call'](this,_0x367f29);else{if(_0x1d1760('0x76')==='LHBhU'){function _0x370a26(){const _0x1a5c8f=_0x1d1760,_0x534a69=this[_0x1a5c8f('0x27f')]();return this[_0x1a5c8f('0x1db')](_0x534a69,_0x5e2799,_0x1329c1,_0x51df7,![],_0x1a5c8f('0x305')),this['drawItemDarkRect'](_0x227486,_0xd42a53,_0x2cd14c),this['resetFontSettings'](),!![];}}else return!![];}},Game_Actor['prototype']['initEquips']=function(_0x2b5098){const _0x211efc=_0x44d0c2;_0x2b5098=this['convertInitEquipsToItems'](_0x2b5098);const _0x3e039b=this[_0x211efc('0x230')]();this['_equips']=[];for(let _0x398788=0x0;_0x398788<_0x3e039b[_0x211efc('0x3f3')];_0x398788++){if('RuGlR'!==_0x211efc('0x20f'))this['_equips'][_0x398788]=new Game_Item();else{function _0x496d59(){const _0x21f50f=_0x211efc;this[_0x21f50f('0x15f')](_0x11d901[_0x21f50f('0xbe')](_0x17c5ec),_0xe27af2+_0x4ebd54,_0xfb5633,_0x4e4a83);}}}for(let _0xaaca9b=0x0;_0xaaca9b<_0x3e039b['length'];_0xaaca9b++){if(_0x211efc('0x3a6')===_0x211efc('0x3a6')){const _0x345a6f=_0x3e039b[_0xaaca9b],_0x2d4540=this['getMatchingInitEquip'](_0x2b5098,_0x345a6f);if(this[_0x211efc('0x9f')](_0x2d4540))this[_0x211efc('0x322')][_0xaaca9b][_0x211efc('0x28a')](_0x2d4540);}else{function _0x4e2ee4(){const _0x406dab=_0x211efc;_0xfde2d7+='%1'[_0x406dab('0x22f')](this[_0x406dab('0x3bd')][_0x406dab('0x35a')]);}}}this[_0x211efc('0x2f3')](!![]),this[_0x211efc('0x147')]();},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0xe6')]=function(_0x524955){const _0x184476=_0x44d0c2,_0x1b8774=[];for(let _0x26157e=0x0;_0x26157e<_0x524955[_0x184476('0x3f3')];_0x26157e++){if(_0x184476('0x226')===_0x184476('0xc7')){function _0x7fc1e9(){const _0x250482=_0x184476,_0x2690e1=_0x59c552(_0xb10c64['$1']),_0x46b4ab=_0x250482('0x3d1')[_0x250482('0x22f')](_0x2690e1);_0x1bc58c[_0x250482('0x49')]['itemEnableJS'][_0x3d9e2f['id']]=new _0x1ac1fa(_0x250482('0x44'),_0x46b4ab);}}else{const _0x57a699=_0x524955[_0x26157e];if(_0x57a699<=0x0)continue;const _0xfe3a4d=$dataSystem[_0x184476('0x41b')][_0x26157e+0x1];_0xfe3a4d===$dataSystem[_0x184476('0x41b')][0x1]||_0x26157e===0x1&&this[_0x184476('0x33d')]()?_0x1b8774[_0x184476('0x2cc')]($dataWeapons[_0x57a699]):_0x1b8774[_0x184476('0x2cc')]($dataArmors[_0x57a699]);}}return _0x1b8774;},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x120')]=function(_0x4c4ca9,_0x2ad94e){const _0x5814e7=_0x44d0c2;for(const _0x379416 of _0x4c4ca9){if(_0x5814e7('0x100')==='ndHqU'){if(!_0x379416)continue;if(_0x379416[_0x5814e7('0x137')]===_0x2ad94e)return _0x4c4ca9[_0x5814e7('0x28b')](_0x4c4ca9['indexOf'](_0x379416),0x1),_0x379416;}else{function _0xe47d9b(){const _0x413fca=_0x5814e7;_0x51916d=_0x88b501[_0x413fca('0x29')](_0x167efb,_0x54438b);}}}return null;},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x230')]=function(){const _0x183fc3=_0x44d0c2,_0xd7a36d=JsonEx['makeDeepCopy'](this[_0x183fc3('0x2c1')]()[_0x183fc3('0x230')]);if(_0xd7a36d[_0x183fc3('0x3f3')]>=0x2&&this[_0x183fc3('0x33d')]())_0xd7a36d[0x1]=0x1;return _0xd7a36d;},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x4b')]=function(){const _0x3d7250=_0x44d0c2,_0x4038ca=this[_0x3d7250('0x230')]();for(let _0x445562=0x0;_0x445562<_0x4038ca[_0x3d7250('0x3f3')];_0x445562++){if(_0x3d7250('0x36d')!=='JWSSu'){function _0x5a614e(){return this['isEquipChangeOk'](_0x1b9217);}}else{if(!this['_equips'][_0x445562])this[_0x3d7250('0x322')][_0x445562]=new Game_Item();}}this['releaseUnequippableItems'](![]),this[_0x3d7250('0x147')]();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x2b')]=Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x235')],Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x235')]=function(_0x3357c3,_0x4df408){const _0x4366dd=_0x44d0c2;if(this[_0x4366dd('0x2f2')]){const _0x599d8d=JsonEx[_0x4366dd('0x408')](this);_0x599d8d[_0x4366dd('0x2f2')]=!![],VisuMZ[_0x4366dd('0x49')]['Game_Actor_changeEquip'][_0x4366dd('0x183')](this,_0x3357c3,_0x4df408),this[_0x4366dd('0x1e3')](_0x599d8d);}else VisuMZ['ItemsEquipsCore']['Game_Actor_changeEquip'][_0x4366dd('0x183')](this,_0x3357c3,_0x4df408);},VisuMZ[_0x44d0c2('0x49')]['Game_Actor_forceChangeEquip']=Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x1f6')],Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x1f6')]=function(_0x393aad,_0x7a5c78){const _0x24e7d3=_0x44d0c2;if(this['_tempActor']){const _0x195bfa=JsonEx[_0x24e7d3('0x408')](this);_0x195bfa[_0x24e7d3('0x2f2')]=!![],VisuMZ[_0x24e7d3('0x49')][_0x24e7d3('0x12c')]['call'](this,_0x393aad,_0x7a5c78),this[_0x24e7d3('0x1e3')](_0x195bfa);}else{if(_0x24e7d3('0xc4')!==_0x24e7d3('0x27d'))VisuMZ[_0x24e7d3('0x49')][_0x24e7d3('0x12c')]['call'](this,_0x393aad,_0x7a5c78);else{function _0x4b3ecc(){const _0x3a1373=_0x24e7d3,_0x34cdba=this['commandStyle'](),_0x25bfa=_0x1ece08[_0x3a1373('0x49')][_0x3a1373('0x289')]['ShopScene']['CmdIconSell'],_0x2f9728=_0x34cdba===_0x3a1373('0x7a')?_0x59c2e5[_0x3a1373('0x1ee')]:_0x3a1373('0x34d')['format'](_0x25bfa,_0x1bd43a[_0x3a1373('0x1ee')]),_0xa39f81=this[_0x3a1373('0x10b')]();if(this[_0x3a1373('0x3c0')]()&&!_0xa39f81)return;this[_0x3a1373('0x2bd')](_0x2f9728,_0x3a1373('0x1ee'),_0xa39f81);}}}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x67')]=Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x237')],Game_Actor['prototype']['discardEquip']=function(_0x2c23b9){const _0x4945fa=_0x44d0c2;if(!this[_0x4945fa('0x2f2')]){if(_0x4945fa('0x220')!==_0x4945fa('0x220')){function _0x45a867(){const _0x209b17=_0x4945fa;_0x45bafb[_0x209b17('0x2a1')][_0x209b17('0x1c6')][_0x209b17('0x183')](this);for(const _0x193536 of _0x610874[_0x209b17('0x355')]()){_0x3c2cd7[_0x209b17('0x312')](_0x193536[_0x209b17('0x27b')]());}}}else{const _0x10a934=JsonEx[_0x4945fa('0x408')](this);_0x10a934[_0x4945fa('0x2f2')]=!![],VisuMZ[_0x4945fa('0x49')]['Game_Actor_discardEquip'][_0x4945fa('0x183')](this,_0x2c23b9),this[_0x4945fa('0x1e3')](_0x10a934);}}else VisuMZ['ItemsEquipsCore'][_0x4945fa('0x67')][_0x4945fa('0x183')](this,_0x2c23b9);},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x2f3')]=function(_0x33f2a7){const _0x47aabe=_0x44d0c2;for(;;){const _0x55fa73=this[_0x47aabe('0x230')](),_0x580753=this[_0x47aabe('0x362')]();let _0x44215b=![];for(let _0x57ed45=0x0;_0x57ed45<_0x580753[_0x47aabe('0x3f3')];_0x57ed45++){if('GalqL'!==_0x47aabe('0x19e')){function _0x354aa9(){return![];}}else{const _0x206c90=_0x580753[_0x57ed45];if(_0x206c90&&(!this[_0x47aabe('0x9f')](_0x206c90)||_0x206c90['etypeId']!==_0x55fa73[_0x57ed45])){!_0x33f2a7&&this[_0x47aabe('0x146')](null,_0x206c90);if(!this[_0x47aabe('0x2f2')]){const _0x1ede6f=JsonEx[_0x47aabe('0x408')](this);_0x1ede6f['_tempActor']=!![],this['_equips'][_0x57ed45][_0x47aabe('0x28a')](null),this[_0x47aabe('0x1e3')](_0x1ede6f);}else this[_0x47aabe('0x322')][_0x57ed45][_0x47aabe('0x28a')](null);_0x44215b=!![];}}}if(!_0x44215b){if(_0x47aabe('0x337')==='XFDMZ')break;else{function _0x1664b7(){const _0x7684c4=_0x47aabe;return this[_0x7684c4('0x1d')]()?this[_0x7684c4('0x16e')]():_0x53539e[_0x7684c4('0x2a1')][_0x7684c4('0x9c')][_0x7684c4('0x183')](this);}}}}},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e3')]=function(_0x181930){const _0xc2a3ef=_0x44d0c2;if(this[_0xc2a3ef('0x2f2')])return;if(!VisuMZ[_0xc2a3ef('0x49')]['Settings'][_0xc2a3ef('0x3d8')][_0xc2a3ef('0x64')])return;const _0xa9a947=Math[_0xc2a3ef('0x283')](_0x181930[_0xc2a3ef('0x2ed')]()*this[_0xc2a3ef('0x20d')]),_0x451f54=Math[_0xc2a3ef('0x283')](_0x181930['mpRate']()*this[_0xc2a3ef('0xce')]);if(this['hp']>0x0)this[_0xc2a3ef('0x135')](_0xa9a947);if(this['mp']>0x0)this['setMp'](_0x451f54);},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x1fe')]=function(){const _0x33bd55=_0x44d0c2,_0x7801e4=this[_0x33bd55('0x230')]()[_0x33bd55('0x3f3')];for(let _0x1b162a=0x0;_0x1b162a<_0x7801e4;_0x1b162a++){if(this[_0x33bd55('0x3a8')](_0x1b162a))this[_0x33bd55('0x235')](_0x1b162a,null);}},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x3a8')]=function(_0x5f19a8){const _0x809924=_0x44d0c2;if(this[_0x809924('0x3d5')]()[_0x809924('0x284')](this[_0x809924('0x230')]()[_0x5f19a8])){if('CPDbA'===_0x809924('0x1ed'))return![];else{function _0x4ba7b6(){this['playCursorSound']();}}}else return this[_0x809924('0x1d9')](_0x5f19a8);},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x3d5')]=function(){const _0x5af214=_0x44d0c2;return VisuMZ['ItemsEquipsCore'][_0x5af214('0x289')]['EquipScene'][_0x5af214('0x1a5')];},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x13e')]=function(){const _0xbf902c=_0x44d0c2,_0x35904c=this[_0xbf902c('0x230')]()[_0xbf902c('0x3f3')];for(let _0x1d622b=0x0;_0x1d622b<_0x35904c;_0x1d622b++){if(this[_0xbf902c('0xb')](_0x1d622b))this['changeEquip'](_0x1d622b,null);}for(let _0x48b2d9=0x0;_0x48b2d9<_0x35904c;_0x48b2d9++){if(this[_0xbf902c('0xb')](_0x48b2d9))this[_0xbf902c('0x235')](_0x48b2d9,this[_0xbf902c('0x31')](_0x48b2d9));}},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0xb')]=function(_0x4dfda7){const _0x2aa712=_0x44d0c2;if(this[_0x2aa712('0x6')]()['includes'](this[_0x2aa712('0x230')]()[_0x4dfda7])){if(_0x2aa712('0x36f')!==_0x2aa712('0x36f')){function _0xcf1652(){const _0x28421c=_0x2aa712;_0x30ee98=_0x28421c('0x2ef')['format'](_0x3a83d7['id']);}}else return![];}else{if(_0x2aa712('0x9b')!=='DXzhb')return this['isEquipChangeOk'](_0x4dfda7);else{function _0x22d3cd(){const _0x168dc3=_0x2aa712;if(!this[_0x168dc3('0x14f')]()&&!_0x1cc87e[_0x168dc3('0x3da')](this[_0x168dc3('0x170')]))return;const _0x505a64=this[_0x168dc3('0x93')]-this[_0x168dc3('0x5e')]()-_0x5d1796,_0x24c935=this['textWidth']('0000');this[_0x168dc3('0x1a8')](_0x220bb3[_0x168dc3('0xdb')]()),this[_0x168dc3('0x15f')](_0x323306[_0x168dc3('0xba')],_0x2988db+this['itemPadding'](),_0x2d5b0a,_0x505a64-_0x24c935),this[_0x168dc3('0x2df')](),this[_0x168dc3('0x132')](this[_0x168dc3('0x170')],_0x2ebeff,_0x84d81,_0x505a64);}}}},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x6')]=function(){const _0x16cb1b=_0x44d0c2;return VisuMZ[_0x16cb1b('0x49')][_0x16cb1b('0x289')][_0x16cb1b('0x3d8')]['NonOptimizeETypes'];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x129')]=Game_Actor['prototype'][_0x44d0c2('0x146')],Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x146')]=function(_0x48427e,_0x414933){const _0x39f2ee=_0x44d0c2;$gameTemp['_bypassNewLabel']=!![];const _0x7657da=VisuMZ[_0x39f2ee('0x49')][_0x39f2ee('0x129')]['call'](this,_0x48427e,_0x414933);return $gameTemp['_bypassNewLabel']=![],_0x7657da;},Game_Actor['prototype'][_0x44d0c2('0x39a')]=function(_0x4425ee,_0x3dc88f){const _0x11034c=_0x44d0c2,_0x4b83e2=this[_0x11034c('0xe3')](_0x4425ee);if(_0x4b83e2<0x0)return;const _0x23dd49=_0x4425ee===0x1?$dataWeapons[_0x3dc88f]:$dataArmors[_0x3dc88f];this['changeEquip'](_0x4b83e2,_0x23dd49);},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0xe3')]=function(_0x4fe01e){const _0x530416=_0x44d0c2;let _0x564dfc=0x0;const _0x270be2=this[_0x530416('0x230')](),_0x4fef6a=this['equips']();for(let _0x9de0a8=0x0;_0x9de0a8<_0x270be2['length'];_0x9de0a8++){if(_0x270be2[_0x9de0a8]===_0x4fe01e){if('MJMtA'!=='TluDD'){_0x564dfc=_0x9de0a8;if(!_0x4fef6a[_0x9de0a8])return _0x564dfc;}else{function _0x3799a1(){const _0x219896=_0x530416,_0xb11755=this[_0x219896('0x21a')]()?this[_0x219896('0x77')]():0x0,_0x3784ab=this[_0x219896('0x392')](),_0x59de9e=_0x22ecfe[_0x219896('0x29e')]-this[_0x219896('0x77')](),_0x47045f=this[_0x219896('0x3db')](0x1,!![]);return new _0x4537fb(_0xb11755,_0x3784ab,_0x59de9e,_0x47045f);}}}}return _0x564dfc;},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x2de')]=Game_Actor[_0x44d0c2('0x2a1')]['paramPlus'],Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x398')]=function(_0x27258f){const _0x5a3355=_0x44d0c2;let _0x219175=VisuMZ[_0x5a3355('0x49')][_0x5a3355('0x2de')][_0x5a3355('0x183')](this,_0x27258f);for(const _0x56b0cb of this['equips']()){if(_0x5a3355('0x32f')===_0x5a3355('0x32f')){if(_0x56b0cb)_0x219175+=this['paramPlusItemsEquipsCoreCustomJS'](_0x56b0cb,_0x27258f);}else{function _0x1a692e(){const _0x5576ed=_0x5a3355;_0x522af3[_0x5576ed('0x30c')]('pagedown')&&!_0xe6e274[_0x5576ed('0x1d3')]('shift')&&this[_0x5576ed('0xe1')](_0x3b40dc[_0x5576ed('0x13f')](_0x5576ed('0x131'))),_0x3a3e58[_0x5576ed('0x30c')](_0x5576ed('0x231'))&&!_0x4e3d8b[_0x5576ed('0x1d3')]('shift')&&this[_0x5576ed('0x22c')](_0x8210ec[_0x5576ed('0x13f')]('pageup'));}}}return _0x219175;},Game_Actor[_0x44d0c2('0x2a1')][_0x44d0c2('0x106')]=function(_0x109e1a,_0x26b8dc){const _0x25fe72=_0x44d0c2;if(this[_0x25fe72('0x232')])return 0x0;const _0x1dacc9=(DataManager['isWeapon'](_0x109e1a)?_0x25fe72('0x1ba'):_0x25fe72('0x7'))[_0x25fe72('0x22f')](_0x109e1a['id']),_0x171b4e='%1-%2'[_0x25fe72('0x22f')](_0x1dacc9,_0x26b8dc);if(VisuMZ[_0x25fe72('0x49')][_0x25fe72('0x1a4')][_0x171b4e]){if('SUdym'!==_0x25fe72('0x2e0')){this[_0x25fe72('0x232')]=!![];const _0x39c242=VisuMZ['ItemsEquipsCore'][_0x25fe72('0x1a4')][_0x171b4e]['call'](this,_0x109e1a,_0x26b8dc);return this['_calculatingJSParameters']=![],_0x39c242;}else{function _0x1582a3(){const _0xd930c1=_0x25fe72,_0x18cf2d=this[_0xd930c1('0x21a')]()?0x0:_0x42f0dc[_0xd930c1('0x29e')]-this[_0xd930c1('0x2d6')](),_0x2dae5d=this[_0xd930c1('0x392')](),_0x162491=this[_0xd930c1('0x2d6')](),_0x2debcf=this[_0xd930c1('0x188')]();return new _0x36526d(_0x18cf2d,_0x2dae5d,_0x162491,_0x2debcf);}}}else{if('rTDoC'!=='zTuWz')return 0x0;else{function _0x5bcd91(){const _0x20ee19=_0x25fe72;return _0x57deb2[_0x20ee19('0x49')][_0x20ee19('0x289')][_0x20ee19('0x142')][_0x20ee19('0x3fd')];}}}},Game_Actor['prototype'][_0x44d0c2('0x3d')]=function(_0x570c01){const _0x3b9d4a=_0x44d0c2;this[_0x3b9d4a('0x416')]=!![],this[_0x3b9d4a('0x126')]=_0x570c01;},VisuMZ[_0x44d0c2('0x49')]['Game_Party_initialize']=Game_Party['prototype'][_0x44d0c2('0x1e9')],Game_Party[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')]=function(){const _0x1b8002=_0x44d0c2;VisuMZ[_0x1b8002('0x49')]['Game_Party_initialize']['call'](this),this['initNewItemsList']();},Game_Party[_0x44d0c2('0x2a1')][_0x44d0c2('0x1')]=function(){this['_newItemsList']=[];},Game_Party[_0x44d0c2('0x2a1')][_0x44d0c2('0x16d')]=function(_0xa0e450){const _0x2767a3=_0x44d0c2;if(!$gameTemp[_0x2767a3('0x40e')]())return![];if(this[_0x2767a3('0x66')]===undefined)this[_0x2767a3('0x1')]();let _0x2193e5='';if(DataManager[_0x2767a3('0x3da')](_0xa0e450))_0x2193e5='item-%1'['format'](_0xa0e450['id']);else{if(DataManager[_0x2767a3('0x264')](_0xa0e450))_0x2193e5=_0x2767a3('0x2ef')[_0x2767a3('0x22f')](_0xa0e450['id']);else{if(DataManager['isArmor'](_0xa0e450))_0x2193e5=_0x2767a3('0xc1')[_0x2767a3('0x22f')](_0xa0e450['id']);else{if('oFudp'===_0x2767a3('0x30')){function _0x1e3c78(){const _0x27ad4e=_0x2767a3;return this[_0x27ad4e('0x1d')]()?this[_0x27ad4e('0x1b7')]():_0x53c750[_0x27ad4e('0x49')][_0x27ad4e('0x194')]['call'](this);}}else return;}}}return this['_newItemsList'][_0x2767a3('0x284')](_0x2193e5);},Game_Party[_0x44d0c2('0x2a1')][_0x44d0c2('0x269')]=function(_0x5bb45c){const _0x11e0d1=_0x44d0c2;if(!$gameTemp[_0x11e0d1('0x40e')]())return;if(this['_newItemsList']===undefined)this['initNewItemsList']();let _0x389703='';if(DataManager[_0x11e0d1('0x3da')](_0x5bb45c)){if(_0x11e0d1('0x2d9')===_0x11e0d1('0xda')){function _0x396648(){const _0x103d3c=_0x11e0d1;this[_0x103d3c('0xe1')](_0x2057b6[_0x103d3c('0x13f')](_0x103d3c('0x131')));}}else _0x389703=_0x11e0d1('0x424')[_0x11e0d1('0x22f')](_0x5bb45c['id']);}else{if(DataManager[_0x11e0d1('0x264')](_0x5bb45c))_0x389703=_0x11e0d1('0x2ef')[_0x11e0d1('0x22f')](_0x5bb45c['id']);else{if(DataManager[_0x11e0d1('0x154')](_0x5bb45c)){if(_0x11e0d1('0xe5')!==_0x11e0d1('0xe5')){function _0x2ee7d1(){const _0x46c06f=_0x11e0d1;if(!this[_0x46c06f('0x422')]())return;const _0x3a61c2=this[_0x46c06f('0x169')](),_0x5be388=_0x544750[_0x46c06f('0x49')][_0x46c06f('0x289')][_0x46c06f('0x3d8')][_0x46c06f('0x1c4')],_0x36df0a=_0x3a61c2===_0x46c06f('0x7a')?_0x1b7438['clear']:_0x46c06f('0x34d')['format'](_0x5be388,_0x756adf[_0x46c06f('0x22d')]),_0x136798=this['isClearCommandEnabled']();this['addCommand'](_0x36df0a,'clear',_0x136798);}}else _0x389703='armor-%1'[_0x11e0d1('0x22f')](_0x5bb45c['id']);}else return;}}if(!this[_0x11e0d1('0x66')]['includes'](_0x389703))this[_0x11e0d1('0x66')][_0x11e0d1('0x2cc')](_0x389703);},Game_Party[_0x44d0c2('0x2a1')][_0x44d0c2('0x32b')]=function(_0x53e0c6){const _0x6df481=_0x44d0c2;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x6df481('0x66')]===undefined)this[_0x6df481('0x1')]();let _0x422fac='';if(DataManager[_0x6df481('0x3da')](_0x53e0c6))_0x422fac=_0x6df481('0x424')['format'](_0x53e0c6['id']);else{if(DataManager[_0x6df481('0x264')](_0x53e0c6))_0x422fac=_0x6df481('0x2ef')[_0x6df481('0x22f')](_0x53e0c6['id']);else{if(DataManager[_0x6df481('0x154')](_0x53e0c6))_0x422fac=_0x6df481('0xc1')[_0x6df481('0x22f')](_0x53e0c6['id']);else return;}}if(this[_0x6df481('0x66')][_0x6df481('0x284')](_0x422fac)){if(_0x6df481('0x31b')!==_0x6df481('0x2d2'))this[_0x6df481('0x66')]['splice'](this[_0x6df481('0x66')][_0x6df481('0x2b0')](_0x422fac),0x1);else{function _0xf66084(){const _0x5ad42a=_0x6df481;_0x5d9137=_0x5ad42a('0xc1')[_0x5ad42a('0x22f')](_0x1110c6['id']);}}}},VisuMZ[_0x44d0c2('0x49')]['Game_Party_gainItem']=Game_Party[_0x44d0c2('0x2a1')][_0x44d0c2('0x8c')],Game_Party[_0x44d0c2('0x2a1')]['gainItem']=function(_0x50832e,_0x2e3034,_0x1f9767){const _0x89911e=_0x44d0c2,_0x10ea9c=this[_0x89911e('0x1f0')](_0x50832e);VisuMZ[_0x89911e('0x49')][_0x89911e('0x171')][_0x89911e('0x183')](this,_0x50832e,_0x2e3034,_0x1f9767);if(this[_0x89911e('0x1f0')](_0x50832e)>_0x10ea9c)this[_0x89911e('0x269')](_0x50832e);},Game_Party[_0x44d0c2('0x2a1')]['maxItems']=function(_0x4478e8){const _0x13e23d=_0x44d0c2;return DataManager[_0x13e23d('0x12e')](_0x4478e8);},VisuMZ['ItemsEquipsCore']['Scene_ItemBase_activateItemWindow']=Scene_ItemBase[_0x44d0c2('0x2a1')]['activateItemWindow'],Scene_ItemBase[_0x44d0c2('0x2a1')][_0x44d0c2('0x56')]=function(){const _0x28f428=_0x44d0c2;VisuMZ[_0x28f428('0x49')][_0x28f428('0x397')][_0x28f428('0x183')](this),this[_0x28f428('0x210')]['callUpdateHelp']();},Scene_Item['prototype'][_0x44d0c2('0x180')]=function(){const _0x3a9aa0=_0x44d0c2;if(ConfigManager[_0x3a9aa0('0x3a4')]&&ConfigManager[_0x3a9aa0('0x36b')]!==undefined)return ConfigManager[_0x3a9aa0('0x36b')];else{if(this[_0x3a9aa0('0x1d')]()){if('gTMQJ'===_0x3a9aa0('0x186')){function _0x1b8589(){return!this['_purchaseOnly'];}}else return this[_0x3a9aa0('0x7f')]()[_0x3a9aa0('0x2ac')](/LOWER/i);}else{if(_0x3a9aa0('0x377')!==_0x3a9aa0('0x2b7'))Scene_ItemBase[_0x3a9aa0('0x2a1')][_0x3a9aa0('0x21a')][_0x3a9aa0('0x183')](this);else{function _0x2f01de(){const _0x491b82=_0x3a9aa0;_0x2e26ed[_0x491b82('0x49')]['Scene_Shop_activateSellWindow'][_0x491b82('0x183')](this),this[_0x491b82('0x1d')]()&&this[_0x491b82('0x247')][_0x491b82('0x1dd')]();}}}}},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x21a')]=function(){const _0x1ec68d=_0x44d0c2;if(ConfigManager[_0x1ec68d('0x3a4')]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x1ec68d('0x3ff')];else{if(this[_0x1ec68d('0x1d')]()){if(_0x1ec68d('0x2c0')==='JRqvv')return this[_0x1ec68d('0x7f')]()[_0x1ec68d('0x2ac')](/RIGHT/i);else{function _0x1500b8(){const _0x4be799=_0x1ec68d;this[_0x4be799('0x402')](_0x388e51['isTriggered']('up'));}}}else Scene_ItemBase[_0x1ec68d('0x2a1')][_0x1ec68d('0x21a')][_0x1ec68d('0x183')](this);}},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x7f')]=function(){const _0x14ef37=_0x44d0c2;return VisuMZ[_0x14ef37('0x49')][_0x14ef37('0x289')][_0x14ef37('0x3f7')]['LayoutStyle'];},Scene_Item[_0x44d0c2('0x2a1')]['isUseModernControls']=function(){const _0x587f42=_0x44d0c2;return this['_categoryWindow']&&this[_0x587f42('0x130')][_0x587f42('0x159')]();},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x1d')]=function(){const _0x40401a=_0x44d0c2;return VisuMZ['ItemsEquipsCore'][_0x40401a('0x289')][_0x40401a('0x3f7')][_0x40401a('0x3fd')];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x11f')]=Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x205')],Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x205')]=function(){const _0x5a1133=_0x44d0c2;VisuMZ[_0x5a1133('0x49')]['Scene_Item_create']['call'](this),this[_0x5a1133('0x159')]()&&this['onCategoryOk']();},Scene_Item['prototype'][_0x44d0c2('0x9c')]=function(){const _0x209c5f=_0x44d0c2;if(this[_0x209c5f('0x1d')]())return this['helpWindowRectItemsEquipsCore']();else{if(_0x209c5f('0x122')===_0x209c5f('0x2b5')){function _0x84a305(){const _0x2431ba=_0x209c5f;return this[_0x2431ba('0x7f')]()['match'](/RIGHT/i);}}else return Scene_ItemBase[_0x209c5f('0x2a1')][_0x209c5f('0x9c')][_0x209c5f('0x183')](this);}},Scene_Item[_0x44d0c2('0x2a1')]['helpWindowRectItemsEquipsCore']=function(){const _0x4ef4ca=_0x44d0c2,_0x36885d=0x0,_0xd488fe=this['helpAreaTop'](),_0x268d46=Graphics[_0x4ef4ca('0x29e')],_0x20e46d=this[_0x4ef4ca('0x351')]();return new Rectangle(_0x36885d,_0xd488fe,_0x268d46,_0x20e46d);},VisuMZ[_0x44d0c2('0x49')]['Scene_Item_createCategoryWindow']=Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x40f')],Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x40f')]=function(){const _0x376999=_0x44d0c2;VisuMZ['ItemsEquipsCore']['Scene_Item_createCategoryWindow'][_0x376999('0x183')](this);if(this[_0x376999('0x159')]()){if(_0x376999('0x1dc')!==_0x376999('0x1dc')){function _0x2579c5(){const _0x2b60a3=_0x376999;this[_0x2b60a3('0x1cb')]();}}else this[_0x376999('0x47')]();}},Scene_Item[_0x44d0c2('0x2a1')]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x366ef8=_0x44d0c2;delete this[_0x366ef8('0x130')][_0x366ef8('0x216')]['ok'],delete this['_categoryWindow'][_0x366ef8('0x216')][_0x366ef8('0x2eb')];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x156')]=Scene_Item['prototype']['categoryWindowRect'],Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x3e4')]=function(){const _0x426cdb=_0x44d0c2;if(this[_0x426cdb('0x1d')]())return this[_0x426cdb('0x1b7')]();else{if(_0x426cdb('0x228')===_0x426cdb('0x228'))return VisuMZ[_0x426cdb('0x49')]['Scene_Item_categoryWindowRect'][_0x426cdb('0x183')](this);else{function _0x32e4b2(){const _0x1b42de=_0x426cdb;_0x6f10df['prototype'][_0x1b42de('0x1e9')][_0x1b42de('0x183')](this),this['createBitmap']();}}}},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x1b7')]=function(){const _0x4558c2=_0x44d0c2,_0x4e8108=0x0,_0x213af7=this['mainAreaTop'](),_0x353b37=Graphics['boxWidth'],_0xe752f9=this[_0x4558c2('0x3db')](0x1,!![]);return new Rectangle(_0x4e8108,_0x213af7,_0x353b37,_0xe752f9);},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x3b9')]=Scene_Item['prototype'][_0x44d0c2('0x39f')],Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x39f')]=function(){const _0x4d3f9f=_0x44d0c2;VisuMZ[_0x4d3f9f('0x49')][_0x4d3f9f('0x3b9')][_0x4d3f9f('0x183')](this);this['isUseModernControls']()&&this[_0x4d3f9f('0xd0')]();if(this[_0x4d3f9f('0x175')]()){if(_0x4d3f9f('0xf4')!==_0x4d3f9f('0x6e'))this[_0x4d3f9f('0x3a7')]();else{function _0x52f044(){const _0x2b9c0d=_0x4d3f9f;_0x209cbe[_0x2b9c0d('0x26a')]?(_0x9381ef=this[_0x2b9c0d('0x16f')][_0x2b9c0d('0x371')](_0x198441,![]),_0x5ac51b=this[_0x2b9c0d('0x2f2')][_0x2b9c0d('0x371')](_0x26ef27,![]),_0x5703f2=_0x525bc2(this[_0x2b9c0d('0x16f')][_0x2b9c0d('0x371')](_0x30ae7a,!![]))['match'](/([%％])/i)):(_0x35048d=this[_0x2b9c0d('0x16f')][_0x2b9c0d('0xbe')](_0x511b2d),_0x417a36=this[_0x2b9c0d('0x2f2')]['param'](_0x3c4667),_0x4c5225=_0x5b6b59%0x1!==0x0||_0x2b085b%0x1!==0x0);const _0x2ca86e=_0x4d840a,_0x2a3f81=_0x3e6abf,_0x1e64e3=_0x2a3f81-_0x2ca86e;let _0x14bd26=_0x1e64e3;if(_0x53e96d)_0x14bd26=_0x1f3b98[_0x2b9c0d('0x283')](_0x1e64e3*0x64)+'%';_0x1e64e3!==0x0&&(this[_0x2b9c0d('0x1a8')](_0x570a4[_0x2b9c0d('0x29c')](_0x1e64e3)),_0x14bd26=(_0x1e64e3>0x0?'(+%1)':_0x2b9c0d('0x34'))['format'](_0x14bd26),this[_0x2b9c0d('0x15f')](_0x14bd26,_0x2c7df6+_0x29b5fb,_0x537684,_0x3f4868,_0x2b9c0d('0x73')));}}}},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x204')]=Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x21b')],Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x21b')]=function(){const _0x512e96=_0x44d0c2;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['itemWindowRectItemsEquipsCore']();else{if(_0x512e96('0x2f7')===_0x512e96('0x3c2')){function _0xe8f9b8(){const _0x47c7ea=_0x512e96,_0x17faad=this[_0x47c7ea('0x99')]();return _0x295a9f[_0x47c7ea('0x1d3')](_0x47c7ea('0x20b'))?this['cursorPagedown']():this['cursorDown'](_0x30217b[_0x47c7ea('0x13f')](_0x47c7ea('0x41'))),this[_0x47c7ea('0x99')]()!==_0x17faad&&this[_0x47c7ea('0x32')](),!![];}}else{const _0x57b696=VisuMZ[_0x512e96('0x49')][_0x512e96('0x204')][_0x512e96('0x183')](this);return this[_0x512e96('0x175')]()&&this[_0x512e96('0x2b9')]()&&(_0x57b696[_0x512e96('0x110')]-=this[_0x512e96('0x2d6')]()),_0x57b696;}}},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x40a')]=function(){const _0x4af4a3=_0x44d0c2,_0x11f144=this[_0x4af4a3('0x21a')]()?this[_0x4af4a3('0x2d6')]():0x0,_0x5132fb=this['_categoryWindow']['y']+this[_0x4af4a3('0x130')][_0x4af4a3('0x2fe')],_0x49238d=Graphics[_0x4af4a3('0x29e')]-this[_0x4af4a3('0x2d6')](),_0xeb3c92=this[_0x4af4a3('0xad')]()-_0x5132fb;return new Rectangle(_0x11f144,_0x5132fb,_0x49238d,_0xeb3c92);},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0xd0')]=function(){const _0x4137ee=_0x44d0c2;this[_0x4137ee('0x210')][_0x4137ee('0x111')](_0x4137ee('0x2eb'),this[_0x4137ee('0x18b')][_0x4137ee('0x22b')](this));},Scene_Item['prototype'][_0x44d0c2('0x175')]=function(){const _0x1b61f2=_0x44d0c2;if(this[_0x1b61f2('0x1d')]()){if(_0x1b61f2('0x2b4')!==_0x1b61f2('0x1d0'))return!![];else{function _0x5c0234(){return this['helpWindowRectItemsEquipsCore']();}}}else return VisuMZ[_0x1b61f2('0x49')][_0x1b61f2('0x289')][_0x1b61f2('0x3f7')][_0x1b61f2('0x2e4')];},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x2b9')]=function(){const _0x13acc7=_0x44d0c2;return VisuMZ[_0x13acc7('0x49')]['Settings'][_0x13acc7('0x3f7')]['ItemSceneAdjustItemList'];},Scene_Item[_0x44d0c2('0x2a1')]['createStatusWindow']=function(){const _0x508193=_0x44d0c2,_0x403331=this[_0x508193('0x3e7')]();this[_0x508193('0x247')]=new Window_ShopStatus(_0x403331),this[_0x508193('0x69')](this['_statusWindow']),this['_itemWindow'][_0x508193('0x23e')](this[_0x508193('0x247')]);},Scene_Item['prototype'][_0x44d0c2('0x3e7')]=function(){const _0x234770=_0x44d0c2;if(this[_0x234770('0x1d')]())return this[_0x234770('0x278')]();else{if('lBnLU'===_0x234770('0x16b')){function _0x301886(){const _0x1d6bde=_0x234770;this[_0x1d6bde('0x2a7')]={},this['_newLabelOpacity']=0xff,this[_0x1d6bde('0x333')]=_0x3ba5af['ItemsEquipsCore'][_0x1d6bde('0x289')][_0x1d6bde('0x367')][_0x1d6bde('0x379')],this[_0x1d6bde('0x41a')]=_0x344d26['ItemsEquipsCore'][_0x1d6bde('0x289')][_0x1d6bde('0x367')][_0x1d6bde('0x3d0')];}}else return VisuMZ[_0x234770('0x49')][_0x234770('0x289')][_0x234770('0x3f7')][_0x234770('0x2a4')][_0x234770('0x183')](this);}},Scene_Item['prototype'][_0x44d0c2('0x278')]=function(){const _0x4120e7=_0x44d0c2,_0x53a2e2=this[_0x4120e7('0x2d6')](),_0x4d5e70=this[_0x4120e7('0x210')][_0x4120e7('0x2fe')],_0x57fa04=this['isRightInputMode']()?0x0:Graphics[_0x4120e7('0x29e')]-this['statusWidth'](),_0x3cf542=this[_0x4120e7('0x210')]['y'];return new Rectangle(_0x57fa04,_0x3cf542,_0x53a2e2,_0x4d5e70);},Scene_Item[_0x44d0c2('0x2a1')]['statusWidth']=function(){const _0x541f37=_0x44d0c2;return Scene_Shop[_0x541f37('0x2a1')][_0x541f37('0x2d6')]();},Scene_Item['prototype'][_0x44d0c2('0x15')]=function(){const _0x4f1632=_0x44d0c2;if(!this[_0x4f1632('0x7f')]())return![];if(!this[_0x4f1632('0x159')]())return![];if(!this[_0x4f1632('0x210')])return![];if(!this[_0x4f1632('0x210')][_0x4f1632('0x3f1')])return![];return this[_0x4f1632('0x7f')]()&&this[_0x4f1632('0x159')]();},Scene_Item[_0x44d0c2('0x2a1')][_0x44d0c2('0x383')]=function(){const _0x304c6b=_0x44d0c2;if(this[_0x304c6b('0x15')]()){if(_0x304c6b('0x125')!=='vRmxt')return this[_0x304c6b('0x210')][_0x304c6b('0x2c4')]()===0x1?TextManager[_0x304c6b('0x1b6')]('left',_0x304c6b('0x214')):TextManager['getInputMultiButtonStrings'](_0x304c6b('0x231'),_0x304c6b('0x131'));else{function _0x146fcf(){const _0x41b6dd=_0x304c6b;_0x16284f[_0x41b6dd('0x110')]-=this[_0x41b6dd('0x2d6')]();}}}return Scene_ItemBase[_0x304c6b('0x2a1')][_0x304c6b('0x383')][_0x304c6b('0x183')](this);},Scene_Item[_0x44d0c2('0x2a1')]['buttonAssistText1']=function(){const _0x336f2e=_0x44d0c2;if(this['buttonAssistItemListRequirement']()){if(_0x336f2e('0x2c7')!==_0x336f2e('0x35d'))return VisuMZ[_0x336f2e('0x49')][_0x336f2e('0x289')][_0x336f2e('0x3f7')]['buttonAssistCategory'];else{function _0x711dc6(){const _0x6aebb=_0x336f2e;if(_0x4710bc)_0x319847+=this[_0x6aebb('0x106')](_0x4778bc,_0x3ff132);}}}return Scene_ItemBase['prototype'][_0x336f2e('0x31f')][_0x336f2e('0x183')](this);},Scene_Equip['prototype'][_0x44d0c2('0x180')]=function(){const _0x4a123a=_0x44d0c2;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x4a123a('0x36b')]!==undefined)return ConfigManager[_0x4a123a('0x36b')];else{if(this[_0x4a123a('0x1d')]())return this[_0x4a123a('0x7f')]()[_0x4a123a('0x2ac')](/LOWER/i);else Scene_MenuBase[_0x4a123a('0x2a1')]['isRightInputMode'][_0x4a123a('0x183')](this);}},Scene_Equip['prototype']['isRightInputMode']=function(){const _0x3c331f=_0x44d0c2;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x3c331f('0x3ff')]!==undefined){if(_0x3c331f('0x387')===_0x3c331f('0x387'))return ConfigManager[_0x3c331f('0x3ff')];else{function _0x47ef2b(){const _0xc1098c=_0x3c331f;this[_0xc1098c('0x196')](),_0x59879a[_0xc1098c('0x49')][_0xc1098c('0x1ec')][_0xc1098c('0x183')](this);}}}else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x3c331f('0x239')!=='fZXks')return this['updatedLayoutStyle']()[_0x3c331f('0x2ac')](/RIGHT/i);else{function _0x555cd6(){const _0xed59c0=_0x3c331f;_0x2c7d92[_0xed59c0('0x49')][_0xed59c0('0x217')][_0xed59c0('0x183')](this,_0x5f0b25),this[_0xed59c0('0x182')](_0x1c2b45);}}}else Scene_MenuBase[_0x3c331f('0x2a1')][_0x3c331f('0x21a')]['call'](this);}},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x7f')]=function(){const _0x10181c=_0x44d0c2;return VisuMZ['ItemsEquipsCore'][_0x10181c('0x289')]['EquipScene']['LayoutStyle'];},Scene_Equip[_0x44d0c2('0x2a1')]['isUseModernControls']=function(){const _0x2d2acf=_0x44d0c2;return this['_commandWindow']&&this[_0x2d2acf('0x11e')][_0x2d2acf('0x159')]();},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x1d')]=function(){const _0x1a3d0b=_0x44d0c2;return VisuMZ[_0x1a3d0b('0x49')][_0x1a3d0b('0x289')]['EquipScene'][_0x1a3d0b('0x3fd')];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x1f4')]=Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x205')],Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x205')]=function(){const _0x1489dd=_0x44d0c2;VisuMZ[_0x1489dd('0x49')][_0x1489dd('0x1f4')][_0x1489dd('0x183')](this);if(this['isUseModernControls']()){if(_0x1489dd('0x330')===_0x1489dd('0xef')){function _0x1c826e(){const _0x132ce8=_0x1489dd;return _0xf011f0[_0x132ce8('0x49')][_0x132ce8('0x289')][_0x132ce8('0x19b')][_0x132ce8('0x3a5')];}}else this[_0x1489dd('0x234')]();}},Scene_Equip['prototype'][_0x44d0c2('0x9c')]=function(){const _0x6876e0=_0x44d0c2;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x6876e0('0x3f2')!==_0x6876e0('0x3f2')){function _0x3dc5da(){const _0x256980=_0x6876e0;this['drawTextEx'](_0x43c719,_0x33c38f['x']+_0x29e657[_0x256980('0x110')]-_0x55ba54,_0x3a0f17['y'],_0x1292fe);}}else return this[_0x6876e0('0x16e')]();}else{if(_0x6876e0('0x25d')!==_0x6876e0('0x25d')){function _0x2ae5c0(){const _0x5f1e0f=_0x6876e0;if(!this[_0x5f1e0f('0x212')]())return![];if(_0x5863b0[_0x5f1e0f('0x3e9')][_0x5f1e0f('0x1c0')]!==_0x31712f)return![];return _0x3df210[_0x5f1e0f('0x13f')](_0x5f1e0f('0x41'))&&(this['playCursorSound'](),_0x1b8571[_0x5f1e0f('0x3e9')][_0x5f1e0f('0x234')](),_0x32a084[_0x5f1e0f('0x3e9')][_0x5f1e0f('0x65')][_0x5f1e0f('0x399')](-0x1)),![];}}else return Scene_MenuBase[_0x6876e0('0x2a1')][_0x6876e0('0x9c')][_0x6876e0('0x183')](this);}},Scene_Equip[_0x44d0c2('0x2a1')]['helpWindowRectItemsEquipsCore']=function(){const _0x17234c=_0x44d0c2,_0x27f81d=0x0,_0x9f0399=this[_0x17234c('0x346')](),_0x22d1dc=Graphics[_0x17234c('0x29e')],_0x4e447c=this[_0x17234c('0x351')]();return new Rectangle(_0x27f81d,_0x9f0399,_0x22d1dc,_0x4e447c);},VisuMZ[_0x44d0c2('0x49')]['Scene_Equip_statusWindowRect']=Scene_Equip['prototype'][_0x44d0c2('0x3e7')],Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x3e7')]=function(){const _0x120b2e=_0x44d0c2;return this[_0x120b2e('0x1d')]()?this[_0x120b2e('0x278')]():VisuMZ[_0x120b2e('0x49')]['Scene_Equip_statusWindowRect']['call'](this);},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x278')]=function(){const _0x50d51b=_0x44d0c2,_0x337a9c=this[_0x50d51b('0x21a')]()?0x0:Graphics['boxWidth']-this[_0x50d51b('0x2d6')](),_0x5f48ae=this['mainAreaTop'](),_0x162f9e=this[_0x50d51b('0x2d6')](),_0x2aaf93=this[_0x50d51b('0x188')]();return new Rectangle(_0x337a9c,_0x5f48ae,_0x162f9e,_0x2aaf93);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x274')]=Scene_Equip[_0x44d0c2('0x2a1')]['commandWindowRect'],Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x423')]=function(){const _0x2256a2=_0x44d0c2;if(this[_0x2256a2('0x1d')]()){if(_0x2256a2('0x386')!=='KRlja'){function _0x240d66(){const _0x554fd5=_0x2256a2;return this[_0x554fd5('0x256')]();}}else return this[_0x2256a2('0xc6')]();}else{if(_0x2256a2('0xf6')!==_0x2256a2('0xf6')){function _0x584e58(){const _0x2ba9ad=_0x2256a2;_0x3009be[_0x2ba9ad('0x49')][_0x2ba9ad('0x12c')][_0x2ba9ad('0x183')](this,_0x883ad0,_0x3b4252);}}else return VisuMZ[_0x2256a2('0x49')][_0x2256a2('0x274')][_0x2256a2('0x183')](this);}},Scene_Equip['prototype']['shouldCommandWindowExist']=function(){const _0x1af040=_0x44d0c2,_0x35fec9=VisuMZ[_0x1af040('0x49')][_0x1af040('0x289')]['EquipScene'];return _0x35fec9[_0x1af040('0x133')]||_0x35fec9[_0x1af040('0x2e9')];},Scene_Equip[_0x44d0c2('0x2a1')]['commandWindowRectItemsEquipsCore']=function(){const _0x9f92b3=_0x44d0c2,_0x3fe07b=this[_0x9f92b3('0x144')](),_0x1e6d95=this['isRightInputMode']()?this[_0x9f92b3('0x2d6')]():0x0,_0x591b6a=this[_0x9f92b3('0x392')](),_0x115b2d=Graphics[_0x9f92b3('0x29e')]-this['statusWidth'](),_0x2a20a8=_0x3fe07b?this[_0x9f92b3('0x3db')](0x1,!![]):0x0;return new Rectangle(_0x1e6d95,_0x591b6a,_0x115b2d,_0x2a20a8);},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x261')]=Scene_Equip['prototype'][_0x44d0c2('0xe4')],Scene_Equip['prototype'][_0x44d0c2('0xe4')]=function(){const _0x1ea4f6=_0x44d0c2;VisuMZ['ItemsEquipsCore'][_0x1ea4f6('0x261')]['call'](this),this['isUseModernControls']()&&this[_0x1ea4f6('0x272')]();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x253')]=Scene_Equip['prototype']['slotWindowRect'],Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x1d5')]=function(){const _0x103c6f=_0x44d0c2;if(this[_0x103c6f('0x1d')]()){if(_0x103c6f('0x6a')!=='CbdaJ')return this[_0x103c6f('0x2ae')]();else{function _0x10478c(){const _0x205db4=_0x103c6f;_0x2b3ba0[_0x205db4('0x109')]();}}}else return VisuMZ[_0x103c6f('0x49')]['Scene_Equip_slotWindowRect']['call'](this);},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x2ae')]=function(){const _0x5ac822=_0x44d0c2,_0x226a46=this['commandWindowRect'](),_0x60dd35=this[_0x5ac822('0x21a')]()?this[_0x5ac822('0x2d6')]():0x0,_0x21751c=_0x226a46['y']+_0x226a46[_0x5ac822('0x2fe')],_0x2ea686=Graphics['boxWidth']-this['statusWidth'](),_0x57248f=this[_0x5ac822('0x188')]()-_0x226a46['height'];return new Rectangle(_0x60dd35,_0x21751c,_0x2ea686,_0x57248f);},VisuMZ['ItemsEquipsCore']['Scene_Equip_itemWindowRect']=Scene_Equip['prototype']['itemWindowRect'],Scene_Equip['prototype'][_0x44d0c2('0x21b')]=function(){const _0x5e0ecb=_0x44d0c2;if(this[_0x5e0ecb('0x1d')]())return this[_0x5e0ecb('0x1d5')]();else{if(_0x5e0ecb('0x36e')===_0x5e0ecb('0x36e'))return VisuMZ['ItemsEquipsCore'][_0x5e0ecb('0x55')][_0x5e0ecb('0x183')](this);else{function _0x24c920(){const _0x7b8959=_0x5e0ecb,_0x632b54=_0x48750a[_0x7b8959('0x49')][_0x7b8959('0x289')]['StatusWindow'];let _0x11f5d2=_0x632b54[_0x7b8959('0x2f')]!==_0x5eacdf?_0x632b54[_0x7b8959('0x2f')]:0x13;return _0x597c6a[_0x7b8959('0x2d1')](_0x11f5d2);}}}},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x2d6')]=function(){const _0x3f8d78=_0x44d0c2;return this[_0x3f8d78('0x1d')]()?this[_0x3f8d78('0x3c9')]():VisuMZ[_0x3f8d78('0x49')][_0x3f8d78('0x289')][_0x3f8d78('0x3d8')][_0x3f8d78('0x2c8')];},Scene_Equip[_0x44d0c2('0x2a1')]['geUpdatedLayoutStatusWidth']=function(){const _0x4b9eb2=_0x44d0c2;return Math['floor'](Graphics[_0x4b9eb2('0x29e')]/0x2);},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x272')]=function(){const _0x3b9c8a=_0x44d0c2;this[_0x3b9c8a('0x65')]['setHandler'](_0x3b9c8a('0x2eb'),this[_0x3b9c8a('0x18b')][_0x3b9c8a('0x22b')](this)),this[_0x3b9c8a('0x65')]['setHandler'](_0x3b9c8a('0x131'),this[_0x3b9c8a('0x8b')][_0x3b9c8a('0x22b')](this)),this['_slotWindow'][_0x3b9c8a('0x111')](_0x3b9c8a('0x231'),this[_0x3b9c8a('0x90')][_0x3b9c8a('0x22b')](this));},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x3c7')]=Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x234')],Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x234')]=function(){const _0x1020fc=_0x44d0c2;this[_0x1020fc('0x159')]()&&(this['_commandWindow']['deselect'](),this[_0x1020fc('0x11e')][_0x1020fc('0xa1')]()),VisuMZ[_0x1020fc('0x49')][_0x1020fc('0x3c7')][_0x1020fc('0x183')](this);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x343')]=Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0xd4')],Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0xd4')]=function(){const _0x29f3e0=_0x44d0c2;this[_0x29f3e0('0x65')][_0x29f3e0('0x99')]()>=0x0?(VisuMZ[_0x29f3e0('0x49')][_0x29f3e0('0x343')][_0x29f3e0('0x183')](this),this['onSlotOkAutoSelect']()):(this['_slotWindow'][_0x29f3e0('0x399')](0x0),this[_0x29f3e0('0x65')][_0x29f3e0('0x62')]());},Scene_Equip[_0x44d0c2('0x2a1')]['onSlotOkAutoSelect']=function(){const _0x31e5be=_0x44d0c2,_0x40e847=this['_slotWindow']['item'](),_0x116607=this[_0x31e5be('0x210')][_0x31e5be('0x185')][_0x31e5be('0x2b0')](_0x40e847),_0x56a05f=Math[_0x31e5be('0xca')](this['_itemWindow'][_0x31e5be('0x113')]()/0x2)-0x1;this[_0x31e5be('0x210')][_0x31e5be('0x399')](_0x116607>=0x0?_0x116607:0x0),this[_0x31e5be('0x210')][_0x31e5be('0x28e')](this[_0x31e5be('0x210')][_0x31e5be('0x99')]()-_0x56a05f);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x10f')]=Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x358')],Scene_Equip[_0x44d0c2('0x2a1')]['onSlotCancel']=function(){const _0x5276d3=_0x44d0c2;VisuMZ[_0x5276d3('0x49')][_0x5276d3('0x10f')]['call'](this),this['isUseModernControls']()&&(this[_0x5276d3('0x11e')][_0x5276d3('0x399')](0x0),this[_0x5276d3('0x65')][_0x5276d3('0xa1')]());},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x33b')]=Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x314')],Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x314')]=function(){const _0x805ab5=_0x44d0c2;VisuMZ['ItemsEquipsCore'][_0x805ab5('0x33b')][_0x805ab5('0x183')](this);if(this[_0x805ab5('0x159')]()){if('vVoWh'==='vVoWh')this['_commandWindow'][_0x805ab5('0xa1')](),this['_commandWindow'][_0x805ab5('0xab')](),this[_0x805ab5('0x65')][_0x805ab5('0x399')](0x0),this['_slotWindow'][_0x805ab5('0x62')]();else{function _0x4616a9(){const _0x2c98d4=_0x805ab5;this[_0x2c98d4('0x22c')](_0x54b1cb[_0x2c98d4('0x13f')](_0x2c98d4('0x73')));}}}},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x1bd')]=function(){const _0xb2a33b=_0x44d0c2;if(!this[_0xb2a33b('0x65')])return![];if(!this[_0xb2a33b('0x65')]['active'])return![];return this[_0xb2a33b('0x65')][_0xb2a33b('0x206')]();},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x15e')]=function(){const _0x493bc4=_0x44d0c2;if(this[_0x493bc4('0x1bd')]()){if(_0x493bc4('0x24e')===_0x493bc4('0x18c')){function _0x24cbe3(){const _0x42bdd5=_0x493bc4,_0x1fc09d=_0x7d4b59['CannotEquipMarker'];this[_0x42bdd5('0x15f')](_0x1fc09d,_0x504635,_0x4361e3,_0x27fdbc,_0x42bdd5('0x305'));}}else return TextManager[_0x493bc4('0x324')](_0x493bc4('0x20b'));}return Scene_MenuBase[_0x493bc4('0x2a1')]['buttonAssistKey3'][_0x493bc4('0x183')](this);},Scene_Equip[_0x44d0c2('0x2a1')][_0x44d0c2('0x52')]=function(){const _0x238669=_0x44d0c2;if(this[_0x238669('0x1bd')]())return VisuMZ['ItemsEquipsCore'][_0x238669('0x289')]['EquipScene'][_0x238669('0x345')];return Scene_MenuBase[_0x238669('0x2a1')]['buttonAssistText3'][_0x238669('0x183')](this);},Scene_Equip[_0x44d0c2('0x2a1')]['buttonAssistOffset3']=function(){const _0x584510=_0x44d0c2;if(this[_0x584510('0x1bd')]()){if('RYVIR'==='norTj'){function _0x12bfc3(){const _0x1eef8c=_0x584510;this[_0x1eef8c('0x11e')][_0x1eef8c('0xab')](),this[_0x1eef8c('0x11e')]['deactivate']();}}else return this['_buttonAssistWindow']['width']/0x5/-0x3;}return Scene_MenuBase[_0x584510('0x2a1')]['buttonAssistOffset3'][_0x584510('0x183')](this);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x31d')]=Scene_Load[_0x44d0c2('0x2a1')][_0x44d0c2('0x17')],Scene_Load[_0x44d0c2('0x2a1')][_0x44d0c2('0x17')]=function(){const _0x42f9a9=_0x44d0c2;VisuMZ[_0x42f9a9('0x49')][_0x42f9a9('0x31d')][_0x42f9a9('0x183')](this),this[_0x42f9a9('0x1f7')]();},Scene_Load[_0x44d0c2('0x2a1')][_0x44d0c2('0x1f7')]=function(){const _0x109fc0=_0x44d0c2;if($gameSystem['versionId']()!==$dataSystem[_0x109fc0('0x1da')])for(const _0x442a00 of $gameActors[_0x109fc0('0x185')]){if('GFjIa'!==_0x109fc0('0x20c')){function _0x2363b0(){const _0x1b1637=_0x109fc0;_0x21564b['prototype'][_0x1b1637('0x147')][_0x1b1637('0x183')](this),this[_0x1b1637('0x35')]();}}else{if(_0x442a00)_0x442a00[_0x109fc0('0x4b')]();}}},Scene_Shop[_0x44d0c2('0x2a1')]['isBottomHelpMode']=function(){const _0x586c7a=_0x44d0c2;if(ConfigManager[_0x586c7a('0x3a4')]&&ConfigManager[_0x586c7a('0x36b')]!==undefined)return ConfigManager[_0x586c7a('0x36b')];else{if(this[_0x586c7a('0x1d')]())return this[_0x586c7a('0x7f')]()[_0x586c7a('0x2ac')](/LOWER/i);else{if(_0x586c7a('0x3ab')===_0x586c7a('0x21d')){function _0x147b3f(){const _0x25de12=_0x586c7a;this[_0x25de12('0x1a8')](_0x5756fc[_0x25de12('0x29c')](_0x10b8d1)),_0x179c17=(_0x371fba>0x0?'(+%1)':_0x25de12('0x34'))['format'](_0x810eca),this[_0x25de12('0x15f')](_0x513d23,_0x5104df+_0x8a2491,_0x540914,_0x612891,_0x25de12('0x73'));}}else Scene_MenuBase[_0x586c7a('0x2a1')][_0x586c7a('0x21a')][_0x586c7a('0x183')](this);}}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x21a')]=function(){const _0x4aff79=_0x44d0c2;if(ConfigManager[_0x4aff79('0x3a4')]&&ConfigManager[_0x4aff79('0x3ff')]!==undefined){if(_0x4aff79('0x165')!==_0x4aff79('0x165')){function _0x58a257(){const _0x511da8=_0x4aff79;return _0x462022[_0x511da8('0x49')][_0x511da8('0x274')][_0x511da8('0x183')](this);}}else return ConfigManager[_0x4aff79('0x3ff')];}else{if(this[_0x4aff79('0x1d')]()){if('rvQkb'!==_0x4aff79('0x81')){function _0x37abe0(){const _0x2f26ca=_0x4aff79,_0x151326=_0x2f26ca('0x3ef');if(this['_customItemInfo'][_0x151326])return this[_0x2f26ca('0x308')][_0x151326];const _0x3f84a3=_0x2f26ca('0x203');return _0x3f84a3[_0x2f26ca('0x22f')](this[_0x2f26ca('0x170')][_0x2f26ca('0x24c')]);}}else return this[_0x4aff79('0x7f')]()[_0x4aff79('0x2ac')](/RIGHT/i);}else Scene_MenuBase[_0x4aff79('0x2a1')]['isRightInputMode'][_0x4aff79('0x183')](this);}},Scene_Shop[_0x44d0c2('0x2a1')]['updatedLayoutStyle']=function(){const _0x4b0863=_0x44d0c2;return VisuMZ[_0x4b0863('0x49')]['Settings'][_0x4b0863('0x142')][_0x4b0863('0x248')];},Scene_Shop['prototype'][_0x44d0c2('0x159')]=function(){const _0x57d91f=_0x44d0c2;return this[_0x57d91f('0x130')]&&this['_categoryWindow']['isUseModernControls']();},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x1d')]=function(){const _0x3e7cc9=_0x44d0c2;return VisuMZ['ItemsEquipsCore'][_0x3e7cc9('0x289')][_0x3e7cc9('0x142')][_0x3e7cc9('0x3fd')];},VisuMZ['ItemsEquipsCore']['Scene_Shop_prepare']=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x30b')],Scene_Shop['prototype'][_0x44d0c2('0x30b')]=function(_0x20e7da,_0x1d3700){const _0x559210=_0x44d0c2;_0x20e7da=JsonEx['makeDeepCopy'](_0x20e7da),VisuMZ[_0x559210('0x49')]['Scene_Shop_prepare'][_0x559210('0x183')](this,_0x20e7da,_0x1d3700),this[_0x559210('0x25c')]();},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x25c')]=function(){const _0x236c2b=_0x44d0c2;this[_0x236c2b('0x7c')]=0x0;for(const _0x19aa2a of this[_0x236c2b('0x1c')]){if('Qoixh'===_0x236c2b('0x12b')){function _0x5d6bd5(){const _0x20984e=_0x236c2b;_0x2110ee[_0x20984e('0x49')]['RegExp']={},_0x12272c[_0x20984e('0x49')]['RegExp']['EquipParams']=[],_0x1d6bff['ItemsEquipsCore'][_0x20984e('0x74')][_0x20984e('0x332')]=[];const _0x5dda8d=[_0x20984e('0x1c3'),_0x20984e('0x3eb'),_0x20984e('0x40c'),'DEF',_0x20984e('0x2'),'MDF','AGI',_0x20984e('0x25a')];for(const _0x45fd30 of _0x5dda8d){const _0x3cdeb=_0x20984e('0x359')[_0x20984e('0x22f')](_0x45fd30);_0x3b5b06['ItemsEquipsCore'][_0x20984e('0x74')][_0x20984e('0x3af')]['push'](new _0x41c9c6(_0x3cdeb,'i'));const _0x4228b9='\x5cb%1\x5cb'[_0x20984e('0x22f')](_0x45fd30);_0x48b92a[_0x20984e('0x49')][_0x20984e('0x74')]['BorderRegExp'][_0x20984e('0x2cc')](new _0x2d3765(_0x4228b9,'g'));}}}else{if(this[_0x236c2b('0x1e1')](_0x19aa2a)){if(_0x236c2b('0x36a')==='Nyibl'){function _0x3211d0(){const _0x3ce6b8=_0x236c2b;_0xdeaa02[_0x3ce6b8('0x49')][_0x3ce6b8('0x21f')][_0x3ce6b8('0x183')](this,_0x287597),this[_0x3ce6b8('0x41f')](_0x434e8d);}}else this[_0x236c2b('0x7c')]++;}else _0x19aa2a[0x0]=-0x1;}}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e1')]=function(_0x2cd356){const _0x1b2c6e=_0x44d0c2;if(_0x2cd356[0x0]>0x2||_0x2cd356[0x0]<0x0)return![];const _0x275482=[$dataItems,$dataWeapons,$dataArmors][_0x2cd356[0x0]][_0x2cd356[0x1]];if(!_0x275482)return![];const _0x7d0e66=_0x275482[_0x1b2c6e('0x9d')]||'';if(_0x7d0e66[_0x1b2c6e('0x2ac')](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3aeb79=JSON[_0x1b2c6e('0x286')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5b30bd of _0x3aeb79){if('fHjaw'!=='VYwaz'){if(!$gameSwitches[_0x1b2c6e('0x2d8')](_0x5b30bd))return![];}else{function _0x1b3ff3(){const _0x57a764=_0x1b2c6e;if(!_0xa92d40)return 0x0;const _0x16b63d=_0x4244a9['ItemsEquipsCore']['Window_ShopBuy_price'][_0x57a764('0x183')](this,_0x282037);return this['modifiedBuyPriceItemsEquipsCore'](_0x295232,_0x16b63d);}}}return!![];}if(_0x7d0e66[_0x1b2c6e('0x2ac')](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x67b60f=JSON[_0x1b2c6e('0x286')]('['+RegExp['$1'][_0x1b2c6e('0x2ac')](/\d+/g)+']');for(const _0x4ec2b2 of _0x67b60f){if(!$gameSwitches[_0x1b2c6e('0x2d8')](_0x4ec2b2))return![];}return!![];}if(_0x7d0e66[_0x1b2c6e('0x2ac')](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1b2c6e('0x46')!==_0x1b2c6e('0x38')){const _0x33e62c=JSON[_0x1b2c6e('0x286')]('['+RegExp['$1'][_0x1b2c6e('0x2ac')](/\d+/g)+']');for(const _0x5a1fb of _0x33e62c){if($gameSwitches[_0x1b2c6e('0x2d8')](_0x5a1fb))return!![];}return![];}else{function _0x2d1b8f(){const _0x2c6e59=_0x1b2c6e;for(const _0x35327f of _0x1d042d){_0x35327f[_0x2c6e59('0x2ac')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3fbbff=_0x466aac(_0x3bd9eb['$1'])[_0x2c6e59('0x282')]()[_0x2c6e59('0x307')]()[_0x2c6e59('0x102')](',');for(const _0x4e83f7 of _0x3fbbff){_0x416e93[_0x2c6e59('0x23d')][_0x2c6e59('0x2cc')](_0x4e83f7['trim']());}}}}}if(_0x7d0e66[_0x1b2c6e('0x2ac')](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13d622=JSON[_0x1b2c6e('0x286')]('['+RegExp['$1'][_0x1b2c6e('0x2ac')](/\d+/g)+']');for(const _0x4cc830 of _0x13d622){if(!$gameSwitches[_0x1b2c6e('0x2d8')](_0x4cc830))return!![];}return![];}if(_0x7d0e66[_0x1b2c6e('0x2ac')](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d72f8=JSON[_0x1b2c6e('0x286')]('['+RegExp['$1'][_0x1b2c6e('0x2ac')](/\d+/g)+']');for(const _0x4c0f79 of _0x5d72f8){if(!$gameSwitches['value'](_0x4c0f79))return!![];}return![];}if(_0x7d0e66[_0x1b2c6e('0x2ac')](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x218f6b=JSON[_0x1b2c6e('0x286')]('['+RegExp['$1'][_0x1b2c6e('0x2ac')](/\d+/g)+']');for(const _0x2b34db of _0x218f6b){if($gameSwitches[_0x1b2c6e('0x2d8')](_0x2b34db))return![];}return!![];}return!![];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x311')]=Scene_Shop['prototype'][_0x44d0c2('0x205')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x205')]=function(){const _0x2b4797=_0x44d0c2;VisuMZ[_0x2b4797('0x49')][_0x2b4797('0x311')][_0x2b4797('0x183')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x2b4797('0x28')]();},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x28')]=function(){const _0x3f73d7=_0x44d0c2;this['_dummyWindow'][_0x3f73d7('0x109')](),this[_0x3f73d7('0x354')]['show'](),this[_0x3f73d7('0x354')][_0x3f73d7('0xab')](),this[_0x3f73d7('0x247')]['show']();},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x9c')]=function(){const _0x4a570d=_0x44d0c2;if(this[_0x4a570d('0x1d')]()){if('tzUTU'!=='tzUTU'){function _0xddbd09(){const _0x3bb931=_0x4a570d;let _0x43b362=0x0;const _0x459d59=this[_0x3bb931('0x230')](),_0x2a6bcd=this['equips']();for(let _0x54e719=0x0;_0x54e719<_0x459d59['length'];_0x54e719++){if(_0x459d59[_0x54e719]===_0x117692){_0x43b362=_0x54e719;if(!_0x2a6bcd[_0x54e719])return _0x43b362;}}return _0x43b362;}}else return this['helpWindowRectItemsEquipsCore']();}else return Scene_MenuBase[_0x4a570d('0x2a1')][_0x4a570d('0x9c')]['call'](this);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x16e')]=function(){const _0x40be2c=_0x44d0c2,_0xe419fb=0x0,_0x5dba7d=this[_0x40be2c('0x346')](),_0x35dda9=Graphics[_0x40be2c('0x29e')],_0x446600=this[_0x40be2c('0x351')]();return new Rectangle(_0xe419fb,_0x5dba7d,_0x35dda9,_0x446600);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x1c7')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0xdd')],Scene_Shop[_0x44d0c2('0x2a1')]['goldWindowRect']=function(){const _0x435a02=_0x44d0c2;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x435a02('0x18')]():VisuMZ[_0x435a02('0x49')]['Scene_Shop_goldWindowRect']['call'](this);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x18')]=function(){const _0xdab11c=_0x44d0c2,_0x204cd6=this[_0xdab11c('0x77')](),_0x4b34e3=this[_0xdab11c('0x3db')](0x1,!![]),_0x9ee777=this[_0xdab11c('0x21a')]()?0x0:Graphics[_0xdab11c('0x29e')]-_0x204cd6,_0x22f5b3=this[_0xdab11c('0x392')]();return new Rectangle(_0x9ee777,_0x22f5b3,_0x204cd6,_0x4b34e3);},VisuMZ[_0x44d0c2('0x49')]['Scene_Shop_commandWindowRect']=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x423')],Scene_Shop['prototype'][_0x44d0c2('0x423')]=function(){const _0x3ae796=_0x44d0c2;if(this[_0x3ae796('0x1d')]()){if(_0x3ae796('0x1b1')===_0x3ae796('0x1b1'))return this['commandWindowRectItemsEquipsCore']();else{function _0x347b0e(){const _0x26354d=_0x3ae796;_0x3fe3e1[_0x26354d('0x49')][_0x26354d('0x289')][_0x26354d('0x19b')]['DrawEquipData'][_0x26354d('0x183')](this);}}}else return VisuMZ[_0x3ae796('0x49')]['Scene_Shop_commandWindowRect'][_0x3ae796('0x183')](this);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0xc6')]=function(){const _0x16173b=_0x44d0c2,_0x1701b3=this[_0x16173b('0x21a')]()?this[_0x16173b('0x77')]():0x0,_0xca6c51=this[_0x16173b('0x392')](),_0x351905=Graphics[_0x16173b('0x29e')]-this[_0x16173b('0x77')](),_0x1b7ef0=this[_0x16173b('0x3db')](0x1,!![]);return new Rectangle(_0x1701b3,_0xca6c51,_0x351905,_0x1b7ef0);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0xff')]=Scene_Shop['prototype'][_0x44d0c2('0x384')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x384')]=function(){const _0x10eb68=_0x44d0c2;if(this[_0x10eb68('0x1d')]())return this[_0x10eb68('0x326')]();else{if(_0x10eb68('0x39b')===_0x10eb68('0x14')){function _0x5a254a(){const _0x5e7737=_0x10eb68;return _0x45f6d2[_0x5e7737('0x49')]['Settings'][_0x5e7737('0x3f7')][_0x5e7737('0x2e4')];}}else return VisuMZ[_0x10eb68('0x49')][_0x10eb68('0xff')][_0x10eb68('0x183')](this);}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x326')]=function(){const _0x464e35=_0x44d0c2,_0x442494=this[_0x464e35('0x11e')]['y']+this[_0x464e35('0x11e')][_0x464e35('0x2fe')],_0xc9db86=Graphics[_0x464e35('0x29e')]-this['statusWidth'](),_0x1b04da=this[_0x464e35('0x21a')]()?Graphics[_0x464e35('0x29e')]-_0xc9db86:0x0,_0x54d12f=this[_0x464e35('0x188')]()-this[_0x464e35('0x11e')]['height'];return new Rectangle(_0x1b04da,_0x442494,_0xc9db86,_0x54d12f);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x16')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x3e7')],Scene_Shop['prototype'][_0x44d0c2('0x3e7')]=function(){const _0x233a5f=_0x44d0c2;if(this[_0x233a5f('0x1d')]()){if('PbgkU'===_0x233a5f('0x268'))return this[_0x233a5f('0x278')]();else{function _0x40b123(){const _0x4f1a4f=_0x233a5f;return _0xfe6314['getInputMultiButtonStrings'](_0x4f1a4f('0x73'),'right');}}}else{if(_0x233a5f('0x375')!==_0x233a5f('0x375')){function _0x228341(){const _0x55a468=_0x233a5f;_0x51d900[_0x55a468('0x2a1')][_0x55a468('0x1f8')][_0x55a468('0x183')](this);if(this[_0x55a468('0x2b6')])this[_0x55a468('0x414')]();}}else return VisuMZ['ItemsEquipsCore']['Scene_Shop_statusWindowRect'][_0x233a5f('0x183')](this);}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x278')]=function(){const _0xef8e48=_0x44d0c2,_0x3d8373=this['statusWidth'](),_0x13a969=this[_0xef8e48('0x188')]()-this[_0xef8e48('0x11e')][_0xef8e48('0x2fe')],_0x37365c=this['isRightInputMode']()?0x0:Graphics[_0xef8e48('0x29e')]-_0x3d8373,_0x1a65c5=this[_0xef8e48('0x11e')]['y']+this[_0xef8e48('0x11e')][_0xef8e48('0x2fe')];return new Rectangle(_0x37365c,_0x1a65c5,_0x3d8373,_0x13a969);},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x1f2')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x42')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x42')]=function(){const _0x46e5d2=_0x44d0c2;return this[_0x46e5d2('0x1d')]()?this[_0x46e5d2('0x400')]():VisuMZ['ItemsEquipsCore'][_0x46e5d2('0x1f2')][_0x46e5d2('0x183')](this);},Scene_Shop['prototype'][_0x44d0c2('0x400')]=function(){const _0x2c2978=_0x44d0c2,_0x3e3c8f=this[_0x2c2978('0x11e')]['y']+this[_0x2c2978('0x11e')][_0x2c2978('0x2fe')],_0x178938=Graphics['boxWidth']-this['statusWidth'](),_0x5ecb5f=this[_0x2c2978('0x188')]()-this['_commandWindow'][_0x2c2978('0x2fe')],_0x52949d=this[_0x2c2978('0x21a')]()?Graphics['boxWidth']-_0x178938:0x0;return new Rectangle(_0x52949d,_0x3e3c8f,_0x178938,_0x5ecb5f);},VisuMZ[_0x44d0c2('0x49')]['Scene_Shop_createCategoryWindow']=Scene_Shop['prototype'][_0x44d0c2('0x40f')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x40f')]=function(){const _0x426cf5=_0x44d0c2;VisuMZ['ItemsEquipsCore']['Scene_Shop_createCategoryWindow'][_0x426cf5('0x183')](this);if(this[_0x426cf5('0x159')]()){if('CuLeH'===_0x426cf5('0x401'))this[_0x426cf5('0x47')]();else{function _0x410934(){const _0xa48ae1=_0x426cf5;return _0x5a97b5[_0xa48ae1('0x49')][_0xa48ae1('0x289')][_0xa48ae1('0x142')][_0xa48ae1('0x136')];}}}},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x194')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x3e4')],Scene_Shop['prototype'][_0x44d0c2('0x3e4')]=function(){const _0x3b7f59=_0x44d0c2;if(this[_0x3b7f59('0x1d')]())return this[_0x3b7f59('0x1b7')]();else{if(_0x3b7f59('0x7d')!==_0x3b7f59('0x275'))return VisuMZ[_0x3b7f59('0x49')][_0x3b7f59('0x194')][_0x3b7f59('0x183')](this);else{function _0x1ee543(){const _0x4dff38=_0x3b7f59;return _0x46e395[_0x4dff38('0x49')][_0x4dff38('0x12d')][_0x4dff38('0x183')](this);}}}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x1b7')]=function(){const _0x502b6e=_0x44d0c2,_0x2cf97e=this[_0x502b6e('0x11e')]['y'],_0xac3945=this[_0x502b6e('0x11e')][_0x502b6e('0x110')],_0x30629e=this[_0x502b6e('0x3db')](0x1,!![]),_0x335246=this[_0x502b6e('0x21a')]()?Graphics[_0x502b6e('0x29e')]-_0xac3945:0x0;return new Rectangle(_0x335246,_0x2cf97e,_0xac3945,_0x30629e);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x47')]=function(){const _0x170895=_0x44d0c2;delete this['_categoryWindow']['_handlers']['ok'],delete this[_0x170895('0x130')]['_handlers']['cancel'];},VisuMZ['ItemsEquipsCore']['Scene_Shop_createSellWindow']=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x352')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x352')]=function(){const _0x5e1273=_0x44d0c2;VisuMZ[_0x5e1273('0x49')]['Scene_Shop_createSellWindow']['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5e1273('0x14c')]();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x151')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x21e')],Scene_Shop['prototype'][_0x44d0c2('0x21e')]=function(){const _0x891e1f=_0x44d0c2;return this[_0x891e1f('0x1d')]()?this[_0x891e1f('0x3ce')]():VisuMZ['ItemsEquipsCore']['Scene_Shop_sellWindowRect']['call'](this);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x3ce')]=function(){const _0x23104b=_0x44d0c2,_0x5d0a07=this[_0x23104b('0x130')]['y']+this[_0x23104b('0x130')]['height'],_0x2c2e68=Graphics['boxWidth']-this[_0x23104b('0x2d6')](),_0xbaa801=this[_0x23104b('0x188')]()-this[_0x23104b('0x130')][_0x23104b('0x2fe')],_0x299b37=this[_0x23104b('0x21a')]()?Graphics[_0x23104b('0x29e')]-_0x2c2e68:0x0;return new Rectangle(_0x299b37,_0x5d0a07,_0x2c2e68,_0xbaa801);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x14c')]=function(){const _0x50c557=_0x44d0c2;this[_0x50c557('0x1de')]['setStatusWindow'](this[_0x50c557('0x247')]);},Scene_Shop[_0x44d0c2('0x2a1')]['statusWidth']=function(){const _0x34bc8d=_0x44d0c2;return VisuMZ[_0x34bc8d('0x49')][_0x34bc8d('0x289')][_0x34bc8d('0x19b')][_0x34bc8d('0x3a5')];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x413')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x21c')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x21c')]=function(){const _0x13f728=_0x44d0c2;VisuMZ[_0x13f728('0x49')][_0x13f728('0x413')][_0x13f728('0x183')](this),this[_0x13f728('0x1d')]()&&this[_0x13f728('0x247')][_0x13f728('0x1dd')]();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x27c')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x58')],Scene_Shop['prototype'][_0x44d0c2('0x58')]=function(){const _0x444e46=_0x44d0c2;VisuMZ[_0x444e46('0x49')][_0x444e46('0x27c')][_0x444e46('0x183')](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x444e46('0x363')===_0x444e46('0x128')){function _0xc13ac(){const _0x175b3d=_0x444e46;this['cursorDown'](_0x49705e[_0x175b3d('0x13f')](_0x175b3d('0x41')));}}else this[_0x444e46('0x21')]();}},Scene_Shop[_0x44d0c2('0x2a1')]['commandBuyItemsEquipsCore']=function(){const _0x30a67e=_0x44d0c2;this[_0x30a67e('0x10d')]=this[_0x30a67e('0x10d')]||0x0,this[_0x30a67e('0x354')][_0x30a67e('0x399')](this['_buyWindowLastIndex']);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x43')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x19d')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x19d')]=function(){const _0x2f8af5=_0x44d0c2;VisuMZ[_0x2f8af5('0x49')][_0x2f8af5('0x43')][_0x2f8af5('0x183')](this);if(this[_0x2f8af5('0x1d')]()){if(_0x2f8af5('0x2bf')!==_0x2f8af5('0x2bf')){function _0x261e7b(){const _0x3d895a=_0x2f8af5;_0x1daf4c[_0x3d895a('0x49')]['Scene_Shop_onCategoryCancel'][_0x3d895a('0x183')](this),this[_0x3d895a('0x1d')]()&&this['onCategoryCancelItemsEquipsCore']();}}else this[_0x2f8af5('0x420')]();}if(this['isUseModernControls']()){if('HIeyQ'!=='HIeyQ'){function _0x8f8ced(){const _0x1a2dfb=_0x2f8af5;_0x44894a[_0x1a2dfb('0x49')]['Scene_Equip_onSlotOk'][_0x1a2dfb('0x183')](this),this[_0x1a2dfb('0x246')]();}}else this[_0x2f8af5('0x130')][_0x2f8af5('0x399')](0x0),this[_0x2f8af5('0x1cb')]();}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x420')]=function(){const _0x4e6c19=_0x44d0c2;this[_0x4e6c19('0x354')]['hide'](),this['_commandWindow'][_0x4e6c19('0x109')]();},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0xeb')]=Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x38d')],Scene_Shop['prototype'][_0x44d0c2('0x38d')]=function(){const _0x4c9ff5=_0x44d0c2;VisuMZ['ItemsEquipsCore']['Scene_Shop_onBuyCancel'][_0x4c9ff5('0x183')](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x4c9ff5('0x412')===_0x4c9ff5('0x412'))this[_0x4c9ff5('0x190')]();else{function _0x19e7e4(){const _0xd3e477=_0x4c9ff5;_0x5dbdbd=_0xd3e477('0x2ef')[_0xd3e477('0x22f')](_0x124d00['id']);}}}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x190')]=function(){const _0x263a89=_0x44d0c2;this[_0x263a89('0x10d')]=this[_0x263a89('0x354')][_0x263a89('0x99')](),this[_0x263a89('0x354')][_0x263a89('0x1dd')](),this[_0x263a89('0x354')][_0x263a89('0xab')](),this['_buyWindow']['smoothScrollTo'](0x0,0x0),this['_statusWindow']['show'](),this[_0x263a89('0x30d')][_0x263a89('0x109')]();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x167')]=Scene_Shop['prototype'][_0x44d0c2('0x2fa')],Scene_Shop[_0x44d0c2('0x2a1')]['onCategoryCancel']=function(){const _0x2464bb=_0x44d0c2;VisuMZ[_0x2464bb('0x49')][_0x2464bb('0x167')][_0x2464bb('0x183')](this);if(this[_0x2464bb('0x1d')]()){if(_0x2464bb('0x17f')!=='gxvRY'){function _0x21d83a(){return;}}else this[_0x2464bb('0x85')]();}},Scene_Shop['prototype'][_0x44d0c2('0x85')]=function(){const _0xb72eac=_0x44d0c2;this[_0xb72eac('0x354')][_0xb72eac('0x1dd')](),this[_0xb72eac('0x11e')][_0xb72eac('0x1dd')]();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x9')]=Scene_Shop['prototype'][_0x44d0c2('0x276')],Scene_Shop['prototype']['onSellOk']=function(){const _0x2c6d92=_0x44d0c2;VisuMZ[_0x2c6d92('0x49')][_0x2c6d92('0x9')][_0x2c6d92('0x183')](this),this[_0x2c6d92('0x1d')]()&&this[_0x2c6d92('0x1e4')]();},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e4')]=function(){const _0x2534c9=_0x44d0c2;this[_0x2534c9('0x130')][_0x2534c9('0x1dd')]();},VisuMZ[_0x44d0c2('0x49')]['Scene_Shop_onSellCancel']=Scene_Shop[_0x44d0c2('0x2a1')]['onSellCancel'],Scene_Shop['prototype'][_0x44d0c2('0x2bb')]=function(){const _0x3b5cd0=_0x44d0c2;VisuMZ[_0x3b5cd0('0x49')]['Scene_Shop_onSellCancel'][_0x3b5cd0('0x183')](this);this[_0x3b5cd0('0x159')]()&&this['onCategoryCancel']();if(this[_0x3b5cd0('0x1d')]()){if(_0x3b5cd0('0xfa')===_0x3b5cd0('0xfa'))this[_0x3b5cd0('0x30d')]['hide']();else{function _0x53ca8c(){const _0x4f0cf0=_0x3b5cd0;this[_0x4f0cf0('0x7c')]++;}}}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x145')]=Scene_Shop['prototype'][_0x44d0c2('0x277')],Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x277')]=function(){const _0x421cd7=_0x44d0c2;let _0x24605f=this[_0x421cd7('0x15b')]();const _0x1238b8=this['_item'];return _0x24605f=VisuMZ['ItemsEquipsCore']['Settings'][_0x421cd7('0x142')][_0x421cd7('0x1fd')][_0x421cd7('0x183')](this,_0x1238b8,_0x24605f),_0x24605f;},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x15b')]=function(){const _0xd4be41=_0x44d0c2;if(!this[_0xd4be41('0x170')]){if(_0xd4be41('0x327')===_0xd4be41('0x14b')){function _0x5041a3(){const _0x40652c=_0xd4be41,_0x2f9c46=_0x2c8e0d['ItemsEquipsCore'][_0x40652c('0x289')][_0x40652c('0x19b')][_0x40652c('0x350')];return _0x2f9c46[_0x40652c('0x22f')](_0x368379['hp']);}}else return 0x0;}else{if(this['_item']['note'][_0xd4be41('0x2ac')](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0xd4be41('0x23f')!==_0xd4be41('0x23f')){function _0xf7f732(){const _0x5eb210=_0xd4be41;return'%1%'[_0x5eb210('0x22f')](_0x154cb5[_0x5eb210('0x283')](_0x2e2365*0x64));}}else{const _0x4f159e=String(RegExp['$1']);let _0x173eaa=this['_item'],_0x1c04cb=_0x173eaa['price']*this['sellPriceRate']();try{eval(_0x4f159e);}catch(_0x2209c7){if($gameTemp['isPlaytest']())console[_0xd4be41('0x2cd')](_0x2209c7);}if(isNaN(_0x1c04cb))_0x1c04cb=0x0;return Math[_0xd4be41('0xca')](_0x1c04cb);}}else{if(this[_0xd4be41('0x170')][_0xd4be41('0x9d')][_0xd4be41('0x2ac')](/<SELL PRICE:[ ](\d+)>/i)){if('whnkx'===_0xd4be41('0x1ce'))return parseInt(RegExp['$1']);else{function _0x1e263c(){const _0x4746ee=_0xd4be41;_0x41a127+=_0x4746ee('0x152')['format'](_0x25b9b8),_0x58a1dc++;if(_0x4cf788>=_0x5fde41)return _0x10b24a;}}}else{if(_0xd4be41('0x22e')===_0xd4be41('0x22e'))return Math[_0xd4be41('0xca')](this['_item'][_0xd4be41('0x3c1')]*this[_0xd4be41('0xf2')]());else{function _0x27735e(){const _0x76ea3=_0xd4be41;let _0x3fdbfe=this[_0x76ea3('0x15b')]();const _0x2613e8=this[_0x76ea3('0x170')];return _0x3fdbfe=_0x2d8956[_0x76ea3('0x49')][_0x76ea3('0x289')][_0x76ea3('0x142')][_0x76ea3('0x1fd')]['call'](this,_0x2613e8,_0x3fdbfe),_0x3fdbfe;}}}}}},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0xf2')]=function(){const _0x3abb67=_0x44d0c2;return VisuMZ[_0x3abb67('0x49')]['Settings'][_0x3abb67('0x142')][_0x3abb67('0x177')];},Scene_Shop['prototype'][_0x44d0c2('0x15')]=function(){const _0x21fdb2=_0x44d0c2;if(!this[_0x21fdb2('0x7f')]())return![];if(!this[_0x21fdb2('0x159')]())return![];if(!this['_sellWindow'])return![];if(!this['_sellWindow'][_0x21fdb2('0x3f1')])return![];return this[_0x21fdb2('0x7f')]()&&this[_0x21fdb2('0x159')]();},Scene_Shop[_0x44d0c2('0x2a1')]['buttonAssistKey1']=function(){const _0x26e32c=_0x44d0c2;if(this[_0x26e32c('0x15')]()){if(this['_sellWindow']['maxCols']()===0x1){if(_0x26e32c('0x3d9')===_0x26e32c('0x3b4')){function _0x1db609(){const _0x4e4ef3=_0x26e32c;if(!this[_0x4e4ef3('0x14f')]())return![];const _0x30a03c=_0x25707f[_0x4e4ef3('0x41b')][this[_0x4e4ef3('0x170')][_0x4e4ef3('0x137')]];return this[_0x4e4ef3('0x1db')](_0x30a03c,_0x5913de,_0x45a0f7,_0x55b99d,!![]),this[_0x4e4ef3('0xcf')](_0x428900,_0x25ad96,_0x57d228),this[_0x4e4ef3('0x13')](),!![];}}else return TextManager['getInputMultiButtonStrings'](_0x26e32c('0x73'),_0x26e32c('0x214'));}else{if(_0x26e32c('0x411')===_0x26e32c('0x245')){function _0x1ed69d(){const _0x174eb6=_0x26e32c;_0x58ac5d['prototype']['refresh'][_0x174eb6('0x183')](this),this['refreshCursor']();}}else return TextManager[_0x26e32c('0x1b6')](_0x26e32c('0x231'),_0x26e32c('0x131'));}}else{if(this[_0x26e32c('0x2b1')]&&this[_0x26e32c('0x2b1')]['active']){if('fgaCg'===_0x26e32c('0x37a')){function _0x3d31e2(){const _0x1a8377=_0x26e32c;return _0x244f54[_0x1a8377('0x49')][_0x1a8377('0x289')][_0x1a8377('0x19b')][_0x1a8377('0x341')];}}else return TextManager[_0x26e32c('0x1b6')](_0x26e32c('0x73'),'right');}}return Scene_MenuBase['prototype']['buttonAssistKey1'][_0x26e32c('0x183')](this);},Scene_Shop['prototype'][_0x44d0c2('0x173')]=function(){const _0x1095ab=_0x44d0c2;if(this[_0x1095ab('0x2b1')]&&this[_0x1095ab('0x2b1')][_0x1095ab('0x3f1')]){if(_0x1095ab('0x1c5')!=='CdJdG')return TextManager[_0x1095ab('0x1b6')]('up',_0x1095ab('0x41'));else{function _0x588b65(){const _0xc9c7af=_0x1095ab;this[_0xc9c7af('0x47')]();}}}return Scene_MenuBase[_0x1095ab('0x2a1')][_0x1095ab('0x173')][_0x1095ab('0x183')](this);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x31f')]=function(){const _0x2ed4d1=_0x44d0c2;if(this[_0x2ed4d1('0x15')]()){if('YXGxm'!==_0x2ed4d1('0x24b'))return VisuMZ[_0x2ed4d1('0x49')][_0x2ed4d1('0x289')][_0x2ed4d1('0x3f7')][_0x2ed4d1('0x260')];else{function _0x5c2d74(){const _0x2dc54=_0x2ed4d1;_0x11b871[_0x2dc54('0x49')][_0x2dc54('0x2db')]['call'](this),this[_0x2dc54('0x159')]()&&this[_0x2dc54('0x2fa')](),this[_0x2dc54('0x1d')]()&&this[_0x2dc54('0x30d')][_0x2dc54('0x109')]();}}}else{if(this[_0x2ed4d1('0x2b1')]&&this[_0x2ed4d1('0x2b1')]['active']){if(_0x2ed4d1('0x1fc')===_0x2ed4d1('0x1fc'))return VisuMZ[_0x2ed4d1('0x49')][_0x2ed4d1('0x289')][_0x2ed4d1('0x142')]['buttonAssistSmallIncrement'];else{function _0x4b98d6(){const _0xed0ed2=_0x2ed4d1;this['_customItemInfo']={};if(!this['_item'])return;const _0x586860=this[_0xed0ed2('0x170')][_0xed0ed2('0x9d')];if(_0x586860[_0xed0ed2('0x2ac')](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x52332e=_0x27082a(_0x2ded32['$1'])[_0xed0ed2('0x102')](/[\r\n]+/);for(const _0x10efc7 of _0x52332e){if(_0x10efc7[_0xed0ed2('0x2ac')](/(.*):[ ](.*)/i)){const _0x5e746d=_0x2a112f(_0x31672['$1'])[_0xed0ed2('0x282')]()[_0xed0ed2('0x307')](),_0x5d4d95=_0x43e306(_0x4fc0d6['$2'])[_0xed0ed2('0x307')]();this[_0xed0ed2('0x308')][_0x5e746d]=_0x5d4d95;}}}}}}}return Scene_MenuBase[_0x2ed4d1('0x2a1')][_0x2ed4d1('0x31f')]['call'](this);},Scene_Shop[_0x44d0c2('0x2a1')][_0x44d0c2('0x41c')]=function(){const _0x1ba8a9=_0x44d0c2;if(this[_0x1ba8a9('0x2b1')]&&this['_numberWindow'][_0x1ba8a9('0x3f1')])return VisuMZ[_0x1ba8a9('0x49')][_0x1ba8a9('0x289')][_0x1ba8a9('0x142')][_0x1ba8a9('0x136')];return Scene_MenuBase[_0x1ba8a9('0x2a1')][_0x1ba8a9('0x41c')]['call'](this);};function Sprite_NewLabel(){this['initialize'](...arguments);}Sprite_NewLabel[_0x44d0c2('0x2a1')]=Object[_0x44d0c2('0x205')](Sprite[_0x44d0c2('0x2a1')]),Sprite_NewLabel[_0x44d0c2('0x2a1')][_0x44d0c2('0x1c0')]=Sprite_NewLabel,Sprite_NewLabel[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')]=function(){const _0x2450ee=_0x44d0c2;Sprite[_0x2450ee('0x2a1')][_0x2450ee('0x1e9')]['call'](this),this[_0x2450ee('0xe2')]();},Sprite_NewLabel[_0x44d0c2('0x2a1')][_0x44d0c2('0xe2')]=function(){const _0xb9e8a0=_0x44d0c2,_0x288b10=ImageManager[_0xb9e8a0('0x40')],_0xef1c00=ImageManager['iconHeight'];this[_0xb9e8a0('0xd2')]=new Bitmap(_0x288b10,_0xef1c00),this[_0xb9e8a0('0x30f')](),this['drawNewLabelText']();},Sprite_NewLabel[_0x44d0c2('0x2a1')]['drawNewLabelIcon']=function(){const _0x45f145=_0x44d0c2,_0x592ebd=VisuMZ[_0x45f145('0x49')][_0x45f145('0x289')][_0x45f145('0x367')][_0x45f145('0x2f4')];if(_0x592ebd<=0x0)return;const _0x594cd4=ImageManager[_0x45f145('0x2d7')](_0x45f145('0xbf')),_0x1331ad=ImageManager[_0x45f145('0x40')],_0x5d30f8=ImageManager[_0x45f145('0x393')],_0x401977=_0x592ebd%0x10*_0x1331ad,_0x110ceb=Math[_0x45f145('0xca')](_0x592ebd/0x10)*_0x5d30f8;this['bitmap']['blt'](_0x594cd4,_0x401977,_0x110ceb,_0x1331ad,_0x5d30f8,0x0,0x0);},Sprite_NewLabel[_0x44d0c2('0x2a1')][_0x44d0c2('0x26')]=function(){const _0x35b87b=_0x44d0c2,_0x41fcf5=VisuMZ['ItemsEquipsCore'][_0x35b87b('0x289')][_0x35b87b('0x367')],_0x3a7566=_0x41fcf5[_0x35b87b('0x294')];if(_0x3a7566==='')return;const _0x3c81bb=ImageManager[_0x35b87b('0x40')],_0x2fe031=ImageManager[_0x35b87b('0x393')];this[_0x35b87b('0xd2')]['fontFace']=_0x41fcf5[_0x35b87b('0x37e')]||$gameSystem[_0x35b87b('0x2f6')](),this[_0x35b87b('0xd2')]['textColor']=this[_0x35b87b('0x20a')](),this[_0x35b87b('0xd2')][_0x35b87b('0x5f')]=_0x41fcf5['FontSize'],this[_0x35b87b('0xd2')][_0x35b87b('0x15f')](_0x3a7566,0x0,_0x2fe031/0x2,_0x3c81bb,_0x2fe031/0x2,_0x35b87b('0x305'));},Sprite_NewLabel['prototype'][_0x44d0c2('0x20a')]=function(){const _0xf9a2db=_0x44d0c2,_0x1b0d95=VisuMZ[_0xf9a2db('0x49')]['Settings'][_0xf9a2db('0x367')]['FontColor'];return _0x1b0d95[_0xf9a2db('0x2ac')](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0xf9a2db('0xac')](_0x1b0d95);},Window_Base[_0x44d0c2('0x2a1')][_0x44d0c2('0x38f')]=function(_0x1ee1c2,_0x6fcd3e,_0x3fd9bf,_0x40d620){const _0x828e59=_0x44d0c2;if(_0x1ee1c2){const _0x3f0ca0=_0x3fd9bf+(this['lineHeight']()-ImageManager[_0x828e59('0x393')])/0x2,_0x431d03=ImageManager[_0x828e59('0x40')]+0x4,_0x1ae029=Math[_0x828e59('0x29')](0x0,_0x40d620-_0x431d03);this[_0x828e59('0x1a8')](ColorManager['getItemColor'](_0x1ee1c2)),this[_0x828e59('0xf0')](_0x1ee1c2[_0x828e59('0x302')],_0x6fcd3e,_0x3f0ca0),this[_0x828e59('0x15f')](_0x1ee1c2[_0x828e59('0x8f')],_0x6fcd3e+_0x431d03,_0x3fd9bf,_0x1ae029),this[_0x828e59('0x2df')]();}},Window_Base[_0x44d0c2('0x2a1')][_0x44d0c2('0x132')]=function(_0x30d144,_0x1a22e1,_0x5e185f,_0x2e79ed){const _0x3fc5b8=_0x44d0c2;if(this[_0x3fc5b8('0x425')](_0x30d144)){this[_0x3fc5b8('0x13')]();const _0x39669d=VisuMZ[_0x3fc5b8('0x49')][_0x3fc5b8('0x289')][_0x3fc5b8('0x3f7')],_0x4060d6=_0x39669d[_0x3fc5b8('0x3ba')],_0x49a4c8=_0x4060d6[_0x3fc5b8('0x22f')]($gameParty[_0x3fc5b8('0x1f0')](_0x30d144));this[_0x3fc5b8('0xc9')][_0x3fc5b8('0x5f')]=_0x39669d[_0x3fc5b8('0x41e')],this[_0x3fc5b8('0x15f')](_0x49a4c8,_0x1a22e1,_0x5e185f,_0x2e79ed,_0x3fc5b8('0x214')),this[_0x3fc5b8('0x13')]();}},Window_Base[_0x44d0c2('0x2a1')][_0x44d0c2('0x425')]=function(_0x343018){const _0x41899a=_0x44d0c2;if(DataManager[_0x41899a('0x29b')](_0x343018))return $dataSystem[_0x41899a('0x376')];return!![];},Window_Base[_0x44d0c2('0x2a1')][_0x44d0c2('0xcf')]=function(_0x1dfff9,_0x3f2bc6,_0xaf8b63,_0x743cc1,_0x13cf48){const _0x150e35=_0x44d0c2;_0x13cf48=Math[_0x150e35('0x29')](_0x13cf48||0x1,0x1);while(_0x13cf48--){_0x743cc1=_0x743cc1||this['lineHeight'](),this['contentsBack'][_0x150e35('0x1d1')]=0xa0;const _0x1888d2=ColorManager[_0x150e35('0x370')]();this[_0x150e35('0x10')][_0x150e35('0x1fb')](_0x1dfff9+0x1,_0x3f2bc6+0x1,_0xaf8b63-0x2,_0x743cc1-0x2,_0x1888d2),this[_0x150e35('0x10')]['paintOpacity']=0xff;}},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x124')]=Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')],Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')]=function(_0x6fccd0){const _0x15bf17=_0x44d0c2;this[_0x15bf17('0x149')](),VisuMZ[_0x15bf17('0x49')][_0x15bf17('0x124')][_0x15bf17('0x183')](this,_0x6fccd0);},Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x149')]=function(){const _0x27f766=_0x44d0c2;this[_0x27f766('0x2a7')]={},this[_0x27f766('0x1d2')]=0xff,this[_0x27f766('0x333')]=VisuMZ[_0x27f766('0x49')][_0x27f766('0x289')][_0x27f766('0x367')][_0x27f766('0x379')],this[_0x27f766('0x41a')]=VisuMZ['ItemsEquipsCore'][_0x27f766('0x289')][_0x27f766('0x367')][_0x27f766('0x3d0')];},Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x141')]=function(){return![];},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x3dd')]=Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x155')],Window_Selectable['prototype']['setHelpWindowItem']=function(_0x195747){const _0x7dcd6d=_0x44d0c2;VisuMZ[_0x7dcd6d('0x49')][_0x7dcd6d('0x3dd')][_0x7dcd6d('0x183')](this,_0x195747);if(this[_0x7dcd6d('0x141')]())this[_0x7dcd6d('0x18d')](_0x195747);},Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x18d')]=function(_0x3b40eb){const _0x285a39=_0x44d0c2;if(!_0x3b40eb)return;$gameParty[_0x285a39('0x32b')](_0x3b40eb);let _0x5b2e8b='';if(DataManager[_0x285a39('0x3da')](_0x3b40eb))_0x5b2e8b=_0x285a39('0x424')[_0x285a39('0x22f')](_0x3b40eb['id']);else{if(DataManager['isWeapon'](_0x3b40eb)){if(_0x285a39('0x192')===_0x285a39('0x192'))_0x5b2e8b='weapon-%1'['format'](_0x3b40eb['id']);else{function _0x51a3ef(){this['playCursorSound']();}}}else{if(DataManager[_0x285a39('0x154')](_0x3b40eb))_0x5b2e8b=_0x285a39('0xc1')[_0x285a39('0x22f')](_0x3b40eb['id']);else{if(_0x285a39('0x2ca')===_0x285a39('0x4d')){function _0x27c512(){const _0x2f47eb=_0x285a39,_0x282bad=_0x1ae135[_0x2f47eb('0x49')][_0x2f47eb('0x289')][_0x2f47eb('0x367')],_0x41ac31=_0x282bad['Text'];if(_0x41ac31==='')return;const _0x9b4d09=_0x4f789c[_0x2f47eb('0x40')],_0x1885f0=_0x1029e6['iconHeight'];this[_0x2f47eb('0xd2')][_0x2f47eb('0x3f8')]=_0x282bad['FontFace']||_0x446dff[_0x2f47eb('0x2f6')](),this[_0x2f47eb('0xd2')][_0x2f47eb('0xac')]=this[_0x2f47eb('0x20a')](),this[_0x2f47eb('0xd2')][_0x2f47eb('0x5f')]=_0x282bad[_0x2f47eb('0x1bc')],this['bitmap'][_0x2f47eb('0x15f')](_0x41ac31,0x0,_0x1885f0/0x2,_0x9b4d09,_0x1885f0/0x2,_0x2f47eb('0x305'));}}else return;}}}const _0x581e1f=this['_newLabelSprites'][_0x5b2e8b];if(_0x581e1f)_0x581e1f['hide']();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x273')]=Window_Selectable['prototype'][_0x44d0c2('0x147')],Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x147')]=function(){const _0x3ae552=_0x44d0c2;this['hideNewLabelSprites'](),VisuMZ[_0x3ae552('0x49')]['Window_Selectable_refresh'][_0x3ae552('0x183')](this);},Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x361')]=function(){const _0x2eb33b=_0x44d0c2;for(const _0x431d7b of Object['values'](this['_newLabelSprites'])){if(_0x2eb33b('0x288')!==_0x2eb33b('0x45'))_0x431d7b['hide']();else{function _0xa6cbf3(){const _0x1153af=_0x2eb33b,_0x9dcd2c=_0x12f7d4[_0x1153af('0x286')]('['+_0x16d8d5['$1'][_0x1153af('0x2ac')](/\d+/g)+']');for(const _0x447064 of _0x9dcd2c){if(_0x2990f[_0x1153af('0x2d8')](_0x447064))return![];}return!![];}}}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x2c2')]=Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x3ad')],Window_Selectable['prototype'][_0x44d0c2('0x3ad')]=function(){const _0x3ea41d=_0x44d0c2;this['updateNewLabelOpacity'](),VisuMZ[_0x3ea41d('0x49')][_0x3ea41d('0x2c2')][_0x3ea41d('0x183')](this);},Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x105')]=function(){const _0x18a66e=_0x44d0c2;if(!this[_0x18a66e('0x141')]())return;const _0x317d9e=this[_0x18a66e('0x41a')];this[_0x18a66e('0x1d2')]+=this[_0x18a66e('0x333')];(this[_0x18a66e('0x1d2')]>=_0x317d9e||this[_0x18a66e('0x1d2')]<=0x0)&&(this['_newLabelOpacityChange']*=-0x1);this[_0x18a66e('0x1d2')]=this[_0x18a66e('0x1d2')][_0x18a66e('0x257')](0x0,_0x317d9e);for(const _0x2aa318 of Object[_0x18a66e('0x339')](this[_0x18a66e('0x2a7')])){_0x2aa318[_0x18a66e('0x16a')]=this[_0x18a66e('0x1d2')];}},Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x23')]=function(_0x38f667){const _0x561031=_0x44d0c2,_0x324d38=this[_0x561031('0x2a7')];if(_0x324d38[_0x38f667]){if('rfkAY'!==_0x561031('0x2d'))return _0x324d38[_0x38f667];else{function _0x496e78(){return this['slotWindowRect']();}}}else{if(_0x561031('0x3d7')!==_0x561031('0x2d3')){const _0x56e3e3=new Sprite_NewLabel();return _0x324d38[_0x38f667]=_0x56e3e3,this[_0x561031('0x20e')](_0x56e3e3),_0x56e3e3;}else{function _0xa153db(){_0x544c68['ItemsEquipsCore']['Window_ItemList_drawItem']['call'](this,_0x27cbde),this['placeItemNewLabel'](_0x189bcf);}}}},Window_Selectable[_0x44d0c2('0x2a1')][_0x44d0c2('0x59')]=function(_0x2b7208,_0x51f8f4,_0x5de204){const _0x4f8744=_0x44d0c2;let _0x2ee01f='';if(DataManager['isItem'](_0x2b7208))_0x2ee01f='item-%1'[_0x4f8744('0x22f')](_0x2b7208['id']);else{if(DataManager[_0x4f8744('0x264')](_0x2b7208))_0x2ee01f=_0x4f8744('0x2ef')[_0x4f8744('0x22f')](_0x2b7208['id']);else{if(DataManager[_0x4f8744('0x154')](_0x2b7208))_0x2ee01f='armor-%1'[_0x4f8744('0x22f')](_0x2b7208['id']);else{if(_0x4f8744('0x3e5')===_0x4f8744('0x3e5'))return;else{function _0x57c27d(){const _0xef5d29=_0x4f8744;if(!_0x280ddc[_0xef5d29('0x2d8')](_0x90bf1f))return![];}}}}}const _0x4918ca=this['createNewLabelSprite'](_0x2ee01f);_0x4918ca[_0x4f8744('0x382')](_0x51f8f4,_0x5de204),_0x4918ca['show'](),_0x4918ca[_0x4f8744('0x16a')]=this[_0x4f8744('0x1d2')];},Window_ItemCategory[_0x44d0c2('0x3a1')]=VisuMZ['ItemsEquipsCore'][_0x44d0c2('0x289')]['Categories'][_0x44d0c2('0x1ae')],Window_ItemCategory[_0x44d0c2('0x2a2')]=[_0x44d0c2('0x2bc'),'HiddenItemB',_0x44d0c2('0x1b5'),_0x44d0c2('0x409'),_0x44d0c2('0xc5'),_0x44d0c2('0x2ab'),'FieldUsable',_0x44d0c2('0x208')],VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x21f')]=Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')],Window_ItemCategory[_0x44d0c2('0x2a1')]['initialize']=function(_0x5ac8c1){const _0xd05dd2=_0x44d0c2;VisuMZ[_0xd05dd2('0x49')][_0xd05dd2('0x21f')]['call'](this,_0x5ac8c1),this[_0xd05dd2('0x41f')](_0x5ac8c1);},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x41f')]=function(_0x4b6d1e){const _0x14d527=_0x44d0c2,_0xd06eba=new Rectangle(0x0,0x0,_0x4b6d1e[_0x14d527('0x110')],_0x4b6d1e[_0x14d527('0x2fe')]);this[_0x14d527('0x123')]=new Window_Base(_0xd06eba),this[_0x14d527('0x123')]['opacity']=0x0,this[_0x14d527('0x4e')](this['_categoryNameWindow']),this[_0x14d527('0x3cb')]();},Window_ItemCategory[_0x44d0c2('0x2a1')]['isUseModernControls']=function(){const _0x5b08f0=_0x44d0c2;return Imported[_0x5b08f0('0x26a')]&&Window_HorzCommand['prototype'][_0x5b08f0('0x159')][_0x5b08f0('0x183')](this);},Window_ItemCategory[_0x44d0c2('0x2a1')]['processCursorHomeEndTrigger']=function(){},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x7b')]=function(){const _0x527bda=_0x44d0c2;if(!this['isUseModernControls']())Window_HorzCommand[_0x527bda('0x2a1')]['playOkSound'][_0x527bda('0x183')](this);},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x2c4')]=function(){const _0x5542af=_0x44d0c2;return this[_0x5542af('0x3d4')]?this[_0x5542af('0x32d')]():0x4;},Window_ItemCategory['prototype'][_0x44d0c2('0x3ad')]=function(){const _0xfd5d0f=_0x44d0c2;Window_HorzCommand[_0xfd5d0f('0x2a1')][_0xfd5d0f('0x3ad')][_0xfd5d0f('0x183')](this);if(this[_0xfd5d0f('0x210')]){if(_0xfd5d0f('0xee')==='ClXLF'){function _0x5b9425(){const _0x1ca2cc=_0xfd5d0f;if(_0x474300>=0x0)_0x1bfc20===this[_0x1ca2cc('0x99')]()&&(this[_0x1ca2cc('0x372')]=!![]),this[_0x1ca2cc('0x62')](),this['select'](_0x18de99);else _0x4d96be['hitIndex']()>=0x0&&(this['deactivate'](),this['deselect']());}}else this[_0xfd5d0f('0x210')][_0xfd5d0f('0x353')](this[_0xfd5d0f('0xe7')]());}},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x2af')]=function(){const _0x203470=_0x44d0c2;if(this[_0x203470('0x212')]()){const _0x311cf0=this['index']();if(this[_0x203470('0x210')]&&this[_0x203470('0x210')][_0x203470('0x2c4')]()<=0x1){if(_0x203470('0x310')!=='SaWTg')Input[_0x203470('0x30c')](_0x203470('0x214'))&&this[_0x203470('0xe1')](Input['isTriggered'](_0x203470('0x214'))),Input[_0x203470('0x30c')](_0x203470('0x73'))&&this[_0x203470('0x22c')](Input[_0x203470('0x13f')](_0x203470('0x73')));else{function _0x220902(){const _0x4a8915=_0x203470;_0x4e4603=_0x3fc48a||this[_0x4a8915('0x202')](),this['contentsBack'][_0x4a8915('0x1d1')]=0xa0;const _0xfaa693=_0x4e4051['getItemsEquipsCoreBackColor1']();this[_0x4a8915('0x10')][_0x4a8915('0x1fb')](_0xb6daa4+0x1,_0x3851ac+0x1,_0x18fabe-0x2,_0x2a3693-0x2,_0xfaa693),this[_0x4a8915('0x10')][_0x4a8915('0x1d1')]=0xff;}}}else{if(this[_0x203470('0x210')]&&this['_itemWindow'][_0x203470('0x2c4')]()>0x1){Input[_0x203470('0x30c')]('pagedown')&&!Input['isPressed'](_0x203470('0x20b'))&&this[_0x203470('0xe1')](Input[_0x203470('0x13f')]('pagedown'));if(Input[_0x203470('0x30c')](_0x203470('0x231'))&&!Input[_0x203470('0x1d3')](_0x203470('0x20b'))){if(_0x203470('0x258')!==_0x203470('0x32a'))this[_0x203470('0x22c')](Input['isTriggered']('pageup'));else{function _0x1239bd(){_0x1589bb(_0x48353b);}}}}}this[_0x203470('0x99')]()!==_0x311cf0&&this['playCursorSound']();}},Window_ItemCategory[_0x44d0c2('0x2a1')]['processHandling']=function(){const _0x14153b=_0x44d0c2;if(this[_0x14153b('0x159')]())return;Window_HorzCommand[_0x14153b('0x2a1')][_0x14153b('0x403')]['call'](this);},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x9a')]=function(){const _0x129b6f=_0x44d0c2;if(this[_0x129b6f('0x159')]())return![];else{if('kJdMc'!=='aYDId')return Window_HorzCommand['prototype'][_0x129b6f('0x9a')][_0x129b6f('0x183')](this);else{function _0x3acd89(){this['onTouchSelectModernControls'](![]);}}}},Window_ItemCategory[_0x44d0c2('0x2a1')]['processTouchModernControls']=function(){const _0x4cb657=_0x44d0c2;if(this[_0x4cb657('0x1c1')]()){if(_0x4cb657('0x8e')!==_0x4cb657('0x15a')){TouchInput['isTriggered']()&&this[_0x4cb657('0x224')](!![]);if(TouchInput[_0x4cb657('0x329')]()){if(_0x4cb657('0x3')===_0x4cb657('0x3'))this[_0x4cb657('0x24f')]();else{function _0xc6e15c(){const _0x23de3c=_0x4cb657;this[_0x23de3c('0xf0')](_0x5b541c,_0x4e936c['x'],_0x40ad18['y']+0x2);}}}else{if(TouchInput[_0x4cb657('0x26f')]()){if(_0x4cb657('0x1ff')!=='Veppw'){function _0x5617c6(){const _0x221fb6=_0x4cb657;_0x5473e5=_0x5448e5['makeDeepCopy'](_0x59e748),_0x49306a[_0x221fb6('0x49')]['Scene_Shop_prepare']['call'](this,_0x23605b,_0x275076),this[_0x221fb6('0x25c')]();}}else this[_0x4cb657('0x38c')]();}}}else{function _0x40b051(){const _0x5c1fa2=_0x4cb657;if(!_0x515b65[_0x5c1fa2('0x2d8')](_0x8b89fb))return!![];}}}},Window_ItemCategory[_0x44d0c2('0x2a1')]['onTouchSelect']=function(_0x5a2183){const _0x45d8f4=_0x44d0c2;this[_0x45d8f4('0x159')]()?this[_0x45d8f4('0xf3')](!![]):Window_HorzCommand[_0x45d8f4('0x2a1')][_0x45d8f4('0x224')][_0x45d8f4('0x183')](this,_0x5a2183);},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0xf3')]=function(_0x434512){const _0x1a6554=_0x44d0c2;this[_0x1a6554('0x372')]=![];if(this[_0x1a6554('0x212')]()){if(_0x1a6554('0x1ad')!==_0x1a6554('0x1ad')){function _0x9ada6b(){return![];}}else{const _0x35c67f=this[_0x1a6554('0x99')](),_0x3fc99b=this[_0x1a6554('0xc3')]();if(_0x3fc99b>=0x0&&_0x3fc99b!==this['index']()){if(_0x1a6554('0x178')===_0x1a6554('0x178'))this[_0x1a6554('0xb4')](_0x3fc99b);else{function _0x1dd55b(){const _0x4f4e3d=_0x1a6554,_0x3f794c=0x0,_0x252857=this[_0x4f4e3d('0x346')](),_0x57f773=_0x27a03f[_0x4f4e3d('0x29e')],_0x3318db=this[_0x4f4e3d('0x351')]();return new _0x3439ac(_0x3f794c,_0x252857,_0x57f773,_0x3318db);}}}_0x434512&&this[_0x1a6554('0x99')]()!==_0x35c67f&&this[_0x1a6554('0x32')]();}}},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0xa6')]=function(){const _0x1f9f5b=_0x44d0c2;for(const _0x3670ac of Window_ItemCategory[_0x1f9f5b('0x3a1')]){if(_0x1f9f5b('0x2b2')===_0x1f9f5b('0x2b2'))this[_0x1f9f5b('0x419')](_0x3670ac);else{function _0x30b54e(){const _0x52c8f6=_0x1f9f5b;return this[_0x52c8f6('0x1b7')]();}}}this[_0x1f9f5b('0xb4')](this[_0x1f9f5b('0x99')]());},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x419')]=function(_0x1e9fab){const _0x215995=_0x44d0c2,_0x38b94e=_0x1e9fab['Type'],_0x5a6ecd=_0x1e9fab[_0x215995('0x2f4')],_0x3f91bf=_0x1e9fab['SwitchID']||0x0;if(_0x3f91bf>0x0&&!$gameSwitches[_0x215995('0x2d8')](_0x3f91bf))return;let _0x3a54af='',_0x3be420=_0x215995('0x5a'),_0x279610=_0x38b94e;if(_0x38b94e[_0x215995('0x2ac')](/Category:(.*)/i))_0x3a54af=String(RegExp['$1'])[_0x215995('0x307')]();else{if(Window_ItemCategory[_0x215995('0x2a2')][_0x215995('0x284')](_0x38b94e)){if(_0x215995('0x385')===_0x215995('0x374')){function _0x140aac(){const _0x28c06a=_0x215995,_0x1b40ef=_0x28c06a('0x19f');if(this[_0x28c06a('0x308')][_0x1b40ef])return this[_0x28c06a('0x308')][_0x1b40ef];let _0x38b970='';return this[_0x28c06a('0x3bd')][_0x28c06a('0x35a')]>0x0?_0x38b970+=_0x28c06a('0x3b2')['format'](this[_0x28c06a('0x3bd')]['selfTP']):_0x38b970+='%1'[_0x28c06a('0x22f')](this['_itemData'][_0x28c06a('0x35a')]),_0x38b970;}}else _0x3a54af=VisuMZ[_0x215995('0x49')][_0x215995('0x289')][_0x215995('0x3b0')][_0x38b94e];}else{if([_0x215995('0x94'),'RegularItems']['includes'](_0x38b94e))_0x3a54af=TextManager[_0x215995('0x44')];else{if(_0x38b94e===_0x215995('0x285'))_0x3a54af=TextManager['keyItem'];else{if(_0x38b94e===_0x215995('0x2ea'))_0x3a54af=TextManager['weapon'];else{if(_0x38b94e===_0x215995('0x162'))_0x3a54af=TextManager[_0x215995('0x184')];else{if(_0x38b94e['match'](/WTYPE:(\d+)/i)){if(_0x215995('0x242')!==_0x215995('0x143'))_0x3a54af=$dataSystem[_0x215995('0x39c')][Number(RegExp['$1'])]||'';else{function _0x38c5ae(){const _0x595cf7=_0x215995;return this[_0x595cf7('0x1de')][_0x595cf7('0x2c4')]()===0x1?_0x5b0561[_0x595cf7('0x1b6')](_0x595cf7('0x73'),_0x595cf7('0x214')):_0x1121f7[_0x595cf7('0x1b6')]('pageup',_0x595cf7('0x131'));}}}else{if(_0x38b94e['match'](/ATYPE:(\d+)/i)){if(_0x215995('0x225')!==_0x215995('0x225')){function _0x1f9d39(){const _0x221ef4=_0x215995,_0x416580=_0x221ef4('0x2a');if(this[_0x221ef4('0x3bd')][_0x221ef4('0x1a6')]>=0x0&&!this[_0x221ef4('0x308')][_0x416580])return![];const _0x432973=this[_0x221ef4('0x281')]();this['drawItemKeyData'](_0x432973,_0x51fdb4,_0x212e54,_0x184fdd,!![]);const _0x251bdd=this[_0x221ef4('0x29f')]();return this[_0x221ef4('0x1a8')](_0x1dedbd[_0x221ef4('0x2f5')]()),this[_0x221ef4('0x1db')](_0x251bdd,_0x16e9d9,_0x37b68f,_0x1c6ce0,![],'right'),this['drawItemDarkRect'](_0xf1d692,_0x544d88,_0x373376),this[_0x221ef4('0x13')](),!![];}}else _0x3a54af=$dataSystem[_0x215995('0x2c')][Number(RegExp['$1'])]||'';}else _0x38b94e[_0x215995('0x2ac')](/ETYPE:(\d+)/i)&&(_0x3a54af=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}if(_0x5a6ecd>0x0&&this[_0x215995('0x78')]()!==_0x215995('0x7a')){if(_0x215995('0x2e8')===_0x215995('0x2e8'))_0x3a54af=_0x215995('0x34d')['format'](_0x5a6ecd,_0x3a54af);else{function _0x56e9fb(){const _0x47f09b=_0x215995,_0x59b1fc=_0x2bfc88['prototype'][_0x47f09b('0x1f')](0x1,_0x5cd55a);if(_0x59b1fc>0x0){_0x2a2bc6+='\x5cI[%1]'[_0x47f09b('0x22f')](_0x59b1fc),_0x76f8c4++;if(_0x41305b>=_0x3dc804)return _0x33a81f;}}}}this[_0x215995('0x2bd')](_0x3a54af,_0x3be420,!![],_0x279610);},Window_ItemCategory['prototype'][_0x44d0c2('0x1b9')]=function(){const _0x4ec893=_0x44d0c2;return VisuMZ[_0x4ec893('0x49')][_0x4ec893('0x289')][_0x4ec893('0x3b0')][_0x4ec893('0x17d')];},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x2ec')]=function(_0x1ed98d){const _0x3d4f58=_0x44d0c2,_0x70d568=this['categoryStyleCheck'](_0x1ed98d);if(_0x70d568==='iconText')this[_0x3d4f58('0x0')](_0x1ed98d);else{if(_0x70d568===_0x3d4f58('0x41d'))this['drawItemStyleIcon'](_0x1ed98d);else{if(_0x3d4f58('0x5b')!==_0x3d4f58('0x5b')){function _0x4ef661(){return _0x15e592['uiHelpPosition'];}}else Window_HorzCommand['prototype'][_0x3d4f58('0x2ec')][_0x3d4f58('0x183')](this,_0x1ed98d);}}},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x78')]=function(){const _0x1d5793=_0x44d0c2;return VisuMZ[_0x1d5793('0x49')]['Settings'][_0x1d5793('0x3b0')]['Style'];},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x14d')]=function(_0x637bd9){const _0x29a643=_0x44d0c2;if(_0x637bd9<0x0)return _0x29a643('0x7a');const _0xb1b1c1=this[_0x29a643('0x78')]();if(_0xb1b1c1!==_0x29a643('0xc'))return _0xb1b1c1;else{const _0x1eccb1=this['commandName'](_0x637bd9);if(_0x1eccb1[_0x29a643('0x2ac')](/\\I\[(\d+)\]/i)){if(_0x29a643('0xc8')!==_0x29a643('0xd6')){const _0x470d93=this[_0x29a643('0x36')](_0x637bd9),_0x5aff50=this[_0x29a643('0x1b8')](_0x1eccb1)[_0x29a643('0x110')];if(_0x5aff50<=_0x470d93[_0x29a643('0x110')]){if('LfxCT'!==_0x29a643('0x6f'))return _0x29a643('0x164');else{function _0x28dbcd(){const _0xcae77f=_0x29a643;this[_0xcae77f('0x32')]();}}}else{if(_0x29a643('0x101')===_0x29a643('0x1bb')){function _0x13a4bf(){_0x15a10a['isTriggered']('pagedown')&&this['cursorPagedown'](),_0x1492ff['isTriggered']('pageup')&&this['cursorPageup']();}}else return'icon';}}else{function _0x3c2c39(){const _0x1323cb=_0x29a643;this[_0x1323cb('0x85')]();}}}else{if(_0x29a643('0x3e')!==_0x29a643('0x3e')){function _0x3252f6(){const _0x143c7c=_0x29a643;if(this[_0x143c7c('0x13c')]()===_0x143c7c('0x279'))_0x1451a6[_0x143c7c('0x2a1')][_0x143c7c('0x7b')][_0x143c7c('0x183')](this);}}else return _0x29a643('0x7a');}}},Window_ItemCategory['prototype'][_0x44d0c2('0x0')]=function(_0x130ac7){const _0x3b86a4=_0x44d0c2,_0x454e63=this[_0x3b86a4('0x36')](_0x130ac7),_0x797cbf=this[_0x3b86a4('0x2cb')](_0x130ac7),_0x3a3c5a=this[_0x3b86a4('0x1b8')](_0x797cbf)['width'];this[_0x3b86a4('0x117')](this[_0x3b86a4('0x3e6')](_0x130ac7));const _0x5b0037=this['itemTextAlign']();if(_0x5b0037===_0x3b86a4('0x214'))this['drawTextEx'](_0x797cbf,_0x454e63['x']+_0x454e63[_0x3b86a4('0x110')]-_0x3a3c5a,_0x454e63['y'],_0x3a3c5a);else{if(_0x5b0037===_0x3b86a4('0x305')){const _0x4cd700=_0x454e63['x']+Math[_0x3b86a4('0xca')]((_0x454e63[_0x3b86a4('0x110')]-_0x3a3c5a)/0x2);this[_0x3b86a4('0x233')](_0x797cbf,_0x4cd700,_0x454e63['y'],_0x3a3c5a);}else{if(_0x3b86a4('0x344')===_0x3b86a4('0x344'))this[_0x3b86a4('0x233')](_0x797cbf,_0x454e63['x'],_0x454e63['y'],_0x3a3c5a);else{function _0x1ce8f5(){const _0x2e1c34=_0x3b86a4;this[_0x2e1c34('0x38c')]();}}}}},Window_ItemCategory['prototype'][_0x44d0c2('0xe')]=function(_0x57695a){const _0x14bcf2=_0x44d0c2,_0x44cc69=this[_0x14bcf2('0x2cb')](_0x57695a);if(_0x44cc69[_0x14bcf2('0x2ac')](/\\I\[(\d+)\]/i)){const _0x5be84f=Number(RegExp['$1'])||0x0,_0x3c90ca=this[_0x14bcf2('0x36')](_0x57695a),_0x2d1fb0=_0x3c90ca['x']+Math['floor']((_0x3c90ca[_0x14bcf2('0x110')]-ImageManager['iconWidth'])/0x2),_0x4d6f17=_0x3c90ca['y']+(_0x3c90ca[_0x14bcf2('0x2fe')]-ImageManager[_0x14bcf2('0x393')])/0x2;this[_0x14bcf2('0xf0')](_0x5be84f,_0x2d1fb0,_0x4d6f17);}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x33f')]=Window_ItemCategory[_0x44d0c2('0x2a1')]['setItemWindow'],Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x1ac')]=function(_0x2c8b6c){const _0x212a52=_0x44d0c2;VisuMZ[_0x212a52('0x49')][_0x212a52('0x33f')]['call'](this,_0x2c8b6c),_0x2c8b6c[_0x212a52('0x130')]=this;},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x1f8')]=function(){const _0x340462=_0x44d0c2;Window_HorzCommand['prototype']['callUpdateHelp'][_0x340462('0x183')](this);if(this[_0x340462('0x123')])this[_0x340462('0x3cb')]();},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x3cb')]=function(){const _0x512944=_0x44d0c2,_0x328807=this['_categoryNameWindow'];_0x328807[_0x512944('0xc9')][_0x512944('0x22d')]();const _0x294814=this[_0x512944('0x14d')](this[_0x512944('0x99')]());if(_0x294814==='icon'){if('Jksvf'==='NQEas'){function _0x19b88e(){if(_0xcb59f6[_0x3ba771]===_0x2c88b6){_0x4c28b8=_0x42f8e8;if(!_0x4e0e50[_0x42e02b])return _0x2b1e81;}}}else{const _0x377660=this[_0x512944('0x36')](this[_0x512944('0x99')]());let _0x35196e=this['commandName'](this[_0x512944('0x99')]());_0x35196e=_0x35196e[_0x512944('0x4f')](/\\I\[(\d+)\]/gi,''),_0x328807[_0x512944('0x13')](),this['categoryNameWindowDrawBackground'](_0x35196e,_0x377660),this['categoryNameWindowDrawText'](_0x35196e,_0x377660),this[_0x512944('0x3b1')](_0x35196e,_0x377660);}}},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x153')]=function(_0x3391ae,_0x262fc1){},Window_ItemCategory[_0x44d0c2('0x2a1')][_0x44d0c2('0x229')]=function(_0x45c481,_0x3ca487){const _0x31befc=_0x44d0c2,_0x14acbb=this['_categoryNameWindow'];_0x14acbb[_0x31befc('0x15f')](_0x45c481,0x0,_0x3ca487['y'],_0x14acbb[_0x31befc('0x93')],'center');},Window_ItemCategory[_0x44d0c2('0x2a1')]['categoryNameWindowCenter']=function(_0x3430d6,_0x5580e7){const _0x132799=_0x44d0c2,_0x2fb868=this[_0x132799('0x123')],_0xa063c2=$gameSystem[_0x132799('0x1f1')](),_0x101008=_0x5580e7['x']+Math[_0x132799('0xca')](_0x5580e7[_0x132799('0x110')]/0x2)+_0xa063c2;_0x2fb868['x']=_0x2fb868[_0x132799('0x110')]/-0x2+_0x101008,_0x2fb868['y']=Math[_0x132799('0xca')](_0x5580e7[_0x132799('0x2fe')]/0x2);},Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x2af')]=function(){const _0x5a42dc=_0x44d0c2;if(this[_0x5a42dc('0x212')]()){const _0x1fa689=this['index']();if(this[_0x5a42dc('0x2c4')]()<=0x1){if(_0x5a42dc('0x34b')===_0x5a42dc('0x2be')){function _0x47100d(){const _0x495f40=_0x5a42dc;_0x58a5dc=_0x495f40('0x34d')[_0x495f40('0x22f')](_0x4a8aca,_0x137e3a);}}else!this[_0x5a42dc('0x16c')](_0x5a42dc('0x131'))&&Input[_0x5a42dc('0x13f')](_0x5a42dc('0x131'))&&this[_0x5a42dc('0x150')](),!this['isHandled'](_0x5a42dc('0x231'))&&Input[_0x5a42dc('0x13f')](_0x5a42dc('0x231'))&&this[_0x5a42dc('0xbc')]();}else{if(this[_0x5a42dc('0x2c4')]()>0x1){if(_0x5a42dc('0x189')===_0x5a42dc('0x3a')){function _0x4d2239(){const _0x3f3a87=_0x5a42dc;this[_0x3f3a87('0x2e5')](this['index']())?(this[_0x3f3a87('0x323')](),this[_0x3f3a87('0xd5')]()):this[_0x3f3a87('0x1aa')]();}}else{Input['isRepeated'](_0x5a42dc('0x214'))&&this[_0x5a42dc('0xe1')](Input[_0x5a42dc('0x13f')](_0x5a42dc('0x214')));if(Input[_0x5a42dc('0x30c')](_0x5a42dc('0x73'))){if(_0x5a42dc('0x98')!==_0x5a42dc('0x53'))this[_0x5a42dc('0x22c')](Input[_0x5a42dc('0x13f')](_0x5a42dc('0x73')));else{function _0x324233(){const _0x18f091=_0x5a42dc;_0x1b8762['categories'][_0x18f091('0x2cc')](_0x50b804[_0x18f091('0x307')]());}}}if(this['limitedPageUpDownSceneCheck']()){if(Input['isTriggered'](_0x5a42dc('0x131'))&&Input['isPressed'](_0x5a42dc('0x20b'))){if('ToobH'===_0x5a42dc('0x338'))this[_0x5a42dc('0x150')]();else{function _0x5c5d14(){const _0x7eec78=_0x5a42dc;return _0xc53306[_0x7eec78('0x26a')]&&_0x51ba7b[_0x7eec78('0x2a1')]['isUseModernControls']['call'](this);}}}Input['isTriggered'](_0x5a42dc('0x231'))&&Input[_0x5a42dc('0x1d3')](_0x5a42dc('0x20b'))&&this['cursorPageup']();}else{if(_0x5a42dc('0x3d2')!==_0x5a42dc('0x3d2')){function _0x359d10(){this['processCursorHomeEndTrigger']();}}else{if(Input[_0x5a42dc('0x13f')](_0x5a42dc('0x131'))){if('jUZYf'!==_0x5a42dc('0x37c'))this['cursorPagedown']();else{function _0x2e9407(){const _0x6aa2fa=_0x5a42dc,_0x31df54=new _0x3be984();return _0x1d22c0[_0x3d5c7d]=_0x31df54,this[_0x6aa2fa('0x20e')](_0x31df54),_0x31df54;}}}if(Input[_0x5a42dc('0x13f')](_0x5a42dc('0x231'))){if(_0x5a42dc('0x320')===_0x5a42dc('0x320'))this[_0x5a42dc('0xbc')]();else{function _0x4748f2(){const _0x26633e=_0x5a42dc,_0xd8ff87=this[_0x26633e('0x5e')]();let _0x2e42a3=0x0,_0x73572e=0x0,_0x5d167e='';if(this[_0x26633e('0x2f2')]){_0x37f9a1['VisuMZ_0_CoreEngine']?(_0x2e42a3=this[_0x26633e('0x16f')][_0x26633e('0x371')](_0x4be024,![]),_0x73572e=this[_0x26633e('0x2f2')][_0x26633e('0x371')](_0x5213f0,![]),_0x5d167e=this[_0x26633e('0x2f2')][_0x26633e('0x371')](_0x14be85,!![])):(_0x2e42a3=this[_0x26633e('0x16f')][_0x26633e('0xbe')](_0x44ca9b),_0x73572e=this[_0x26633e('0x2f2')][_0x26633e('0xbe')](_0x4fb9f4),_0x5d167e=this[_0x26633e('0x2f2')][_0x26633e('0xbe')](_0x4e4daa));const _0x527c71=_0x2e42a3,_0x35de89=_0x73572e;_0x26538b=_0x35de89-_0x527c71,this[_0x26633e('0x1a8')](_0x17ccc3[_0x26633e('0x29c')](_0x3a6ae6)),this[_0x26633e('0x15f')](_0x5d167e,_0x34675e,_0x58ad1e,_0x271058-_0xd8ff87,_0x26633e('0x214'));}}}}}}}}}if(Input['isRepeated'](_0x5a42dc('0x41'))){if(Input['isPressed'](_0x5a42dc('0x20b')))this[_0x5a42dc('0x150')]();else{if(_0x5a42dc('0xe8')===_0x5a42dc('0xe8'))this[_0x5a42dc('0x1e5')](Input['isTriggered'](_0x5a42dc('0x41')));else{function _0x26755a(){const _0x4563a9=_0x5a42dc;return this[_0x4563a9('0x16e')]();}}}}if(Input['isRepeated']('up')){if(_0x5a42dc('0x1e7')!==_0x5a42dc('0x1e7')){function _0x15037f(){const _0x47526c=_0x5a42dc;_0x1628a5=_0x47526c('0x424')['format'](_0x5e480f['id']);}}else Input[_0x5a42dc('0x1d3')](_0x5a42dc('0x20b'))?this[_0x5a42dc('0xbc')]():this['cursorUp'](Input[_0x5a42dc('0x13f')]('up'));}Imported[_0x5a42dc('0x26a')]&&this[_0x5a42dc('0x2aa')](),this[_0x5a42dc('0x99')]()!==_0x1fa689&&this[_0x5a42dc('0x32')]();}},Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x301')]=function(){const _0x485f4b=_0x44d0c2,_0x57d32c=SceneManager[_0x485f4b('0x3e9')],_0x5cd235=[Scene_Item,Scene_Shop];return _0x5cd235[_0x485f4b('0x284')](_0x57d32c['constructor']);},Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x62')]=function(){const _0x441e40=_0x44d0c2;Window_Selectable['prototype'][_0x441e40('0x62')]['call'](this),this[_0x441e40('0x130')]&&this['_categoryWindow']['isUseModernControls']()&&this[_0x441e40('0x130')][_0x441e40('0x62')]();},Window_ItemList['prototype'][_0x44d0c2('0xa1')]=function(){const _0xbfb885=_0x44d0c2;Window_Selectable[_0xbfb885('0x2a1')][_0xbfb885('0xa1')][_0xbfb885('0x183')](this),this['_categoryWindow']&&this[_0xbfb885('0x130')][_0xbfb885('0x159')]()&&this[_0xbfb885('0x130')][_0xbfb885('0xa1')]();},Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x353')]=function(_0x4f401e){const _0x294e53=_0x44d0c2;this[_0x294e53('0x197')]!==_0x4f401e&&(this[_0x294e53('0x197')]=_0x4f401e,this[_0x294e53('0x147')](),this[_0x294e53('0x130')]&&this[_0x294e53('0x130')][_0x294e53('0x159')]()?this[_0x294e53('0x399')](0x0):this[_0x294e53('0x17a')](0x0,0x0));},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x249')]=Window_ItemList['prototype'][_0x44d0c2('0x2c4')],Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x2c4')]=function(){const _0x469218=_0x44d0c2;if(SceneManager[_0x469218('0x3e9')][_0x469218('0x1c0')]===Scene_Battle){if('XDOBz'!==_0x469218('0x3e0')){function _0x5eb170(){const _0xf697c1=_0x469218;this[_0xf697c1('0x224')](!![]);}}else return VisuMZ[_0x469218('0x49')][_0x469218('0x249')][_0x469218('0x183')](this);}else{if(SceneManager[_0x469218('0x3e9')][_0x469218('0x1c0')]===Scene_Map)return VisuMZ[_0x469218('0x49')][_0x469218('0x249')][_0x469218('0x183')](this);else{if(_0x469218('0x1b4')!==_0x469218('0x1b4')){function _0x284d51(){const _0x1265d6=_0x469218,_0x26b758=_0x3dce04['$1'][_0x1265d6('0x102')](/[\r\n]+/);for(const _0xbff65d of _0x26b758){_0x24d953[_0x1265d6('0x23d')][_0x1265d6('0x2cc')](_0xbff65d[_0x1265d6('0x282')]()['trim']());}}}else return VisuMZ[_0x469218('0x49')][_0x469218('0x289')][_0x469218('0x3f7')][_0x469218('0x1cd')];}}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x12d')]=Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x218')],Window_ItemList['prototype']['colSpacing']=function(){const _0x483cb3=_0x44d0c2;return this[_0x483cb3('0x2c4')]()<=0x1?Window_Selectable[_0x483cb3('0x2a1')][_0x483cb3('0x218')][_0x483cb3('0x183')](this):VisuMZ[_0x483cb3('0x49')][_0x483cb3('0x12d')][_0x483cb3('0x183')](this);},Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x284')]=function(_0x3c8ce8){const _0x41f03b=_0x44d0c2;switch(this[_0x41f03b('0x197')]){case _0x41f03b('0x94'):return DataManager['isItem'](_0x3c8ce8);case _0x41f03b('0xe0'):return DataManager[_0x41f03b('0x3da')](_0x3c8ce8)&&_0x3c8ce8[_0x41f03b('0x1e2')]===0x1;case _0x41f03b('0x285'):return DataManager['isItem'](_0x3c8ce8)&&_0x3c8ce8[_0x41f03b('0x1e2')]===0x2;case _0x41f03b('0x2bc'):return DataManager[_0x41f03b('0x3da')](_0x3c8ce8)&&_0x3c8ce8[_0x41f03b('0x1e2')]===0x3;case _0x41f03b('0x28c'):return DataManager['isItem'](_0x3c8ce8)&&_0x3c8ce8['itypeId']===0x4;case _0x41f03b('0x409'):return DataManager['isItem'](_0x3c8ce8)&&_0x3c8ce8['consumable'];case _0x41f03b('0x1b5'):return DataManager[_0x41f03b('0x3da')](_0x3c8ce8)&&!_0x3c8ce8[_0x41f03b('0x30e')];case'AlwaysUsable':return DataManager[_0x41f03b('0x3da')](_0x3c8ce8)&&[0x0]['includes'](_0x3c8ce8['occasion']);case _0x41f03b('0x2ab'):return DataManager[_0x41f03b('0x3da')](_0x3c8ce8)&&[0x0,0x1][_0x41f03b('0x284')](_0x3c8ce8[_0x41f03b('0x1fa')]);case _0x41f03b('0x3fb'):return DataManager['isItem'](_0x3c8ce8)&&[0x0,0x2]['includes'](_0x3c8ce8[_0x41f03b('0x1fa')]);case _0x41f03b('0x208'):return DataManager['isItem'](_0x3c8ce8)&&[0x3][_0x41f03b('0x284')](_0x3c8ce8[_0x41f03b('0x1fa')]);case _0x41f03b('0x2ea'):return DataManager[_0x41f03b('0x264')](_0x3c8ce8);case _0x41f03b('0x162'):return DataManager[_0x41f03b('0x154')](_0x3c8ce8);default:if(this[_0x41f03b('0x197')][_0x41f03b('0x2ac')](/WTYPE:(\d+)/i))return DataManager[_0x41f03b('0x264')](_0x3c8ce8)&&_0x3c8ce8[_0x41f03b('0xbd')]===Number(RegExp['$1']);else{if(this[_0x41f03b('0x197')][_0x41f03b('0x2ac')](/WTYPE:(.*)/i)){const _0x33075f=$dataSystem[_0x41f03b('0x39c')][_0x41f03b('0x2b0')](String(RegExp['$1'])[_0x41f03b('0x307')]());return DataManager[_0x41f03b('0x264')](_0x3c8ce8)&&_0x3c8ce8['wtypeId']===_0x33075f;}else{if(this[_0x41f03b('0x197')][_0x41f03b('0x2ac')](/ATYPE:(\d+)/i)){if(_0x41f03b('0x75')===_0x41f03b('0x19a')){function _0x1b667e(){const _0x19f666=_0x41f03b;_0x36ab3b[_0x19f666('0x312')](_0x1eaba4[_0x19f666('0x27b')]());}}else return DataManager['isArmor'](_0x3c8ce8)&&_0x3c8ce8[_0x41f03b('0x406')]===Number(RegExp['$1']);}else{if(this['_category'][_0x41f03b('0x2ac')](/ATYPE:(.*)/i)){const _0x3cf28d=$dataSystem[_0x41f03b('0x2c')][_0x41f03b('0x2b0')](String(RegExp['$1'])[_0x41f03b('0x307')]());return DataManager[_0x41f03b('0x154')](_0x3c8ce8)&&_0x3c8ce8['atypeId']===_0x3cf28d;}else{if(this[_0x41f03b('0x197')][_0x41f03b('0x2ac')](/ETYPE:(\d+)/i))return!!_0x3c8ce8&&_0x3c8ce8['etypeId']===Number(RegExp['$1']);else{if(this[_0x41f03b('0x197')][_0x41f03b('0x2ac')](/ETYPE:(.*)/i)){if(_0x41f03b('0x198')===_0x41f03b('0x37d')){function _0xb855b8(){const _0x258697=_0x41f03b,_0x1227b6=0x0,_0x52a028=this['helpAreaTop'](),_0xb518d7=_0x1227c1['boxWidth'],_0x45cf62=this[_0x258697('0x351')]();return new _0x5796ce(_0x1227b6,_0x52a028,_0xb518d7,_0x45cf62);}}else{const _0x3ec7b1=$dataSystem['equipTypes'][_0x41f03b('0x2b0')](String(RegExp['$1'])['trim']());return DataManager[_0x41f03b('0x154')](_0x3c8ce8)&&_0x3c8ce8['etypeId']===_0x3ec7b1;}}else{if(this[_0x41f03b('0x197')][_0x41f03b('0x2ac')](/Category:(.*)/i))return!!_0x3c8ce8&&_0x3c8ce8[_0x41f03b('0x23d')][_0x41f03b('0x284')](String(RegExp['$1'])['toUpperCase']()[_0x41f03b('0x307')]());}}}}}}}return![];},Window_ItemList[_0x44d0c2('0x2a1')]['isShowNew']=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x44d0c2('0xf8')]=Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x2ec')],Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x2ec')]=function(_0x121164){const _0xb8a058=_0x44d0c2;VisuMZ[_0xb8a058('0x49')][_0xb8a058('0xf8')][_0xb8a058('0x183')](this,_0x121164),this[_0xb8a058('0x8a')](_0x121164);},Window_ItemList[_0x44d0c2('0x2a1')]['drawItemNumber']=function(_0x2a5178,_0x399f97,_0x1e0080,_0x48de2c){const _0x3fec6d=_0x44d0c2;Window_Selectable[_0x3fec6d('0x2a1')][_0x3fec6d('0x132')][_0x3fec6d('0x183')](this,_0x2a5178,_0x399f97,_0x1e0080,_0x48de2c);},Window_ItemList['prototype'][_0x44d0c2('0x8a')]=function(_0x1baa67){const _0x386450=_0x44d0c2,_0x191cd8=this['itemAt'](_0x1baa67);if(!_0x191cd8||!this[_0x386450('0x141')]())return;if(!$gameParty['isNewItem'](_0x191cd8))return;const _0x19175a=this[_0x386450('0x36')](_0x1baa67),_0x397f52=_0x19175a['x'],_0x2c7d89=_0x19175a['y']+(this[_0x386450('0x202')]()-ImageManager[_0x386450('0x393')])/0x2,_0x194429=VisuMZ[_0x386450('0x49')][_0x386450('0x289')][_0x386450('0x367')]['OffsetX'],_0x1d8ff9=VisuMZ[_0x386450('0x49')]['Settings'][_0x386450('0x367')][_0x386450('0xdc')];this['placeNewLabel'](_0x191cd8,_0x397f52+_0x194429,_0x2c7d89+_0x1d8ff9);},Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0x23e')]=function(_0x4e64a7){const _0x2edc54=_0x44d0c2;this['_statusWindow']=_0x4e64a7,this[_0x2edc54('0x1f8')]();},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x2fc')]=Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0xd5')],Window_ItemList[_0x44d0c2('0x2a1')][_0x44d0c2('0xd5')]=function(){const _0xff7e15=_0x44d0c2;VisuMZ[_0xff7e15('0x49')][_0xff7e15('0x2fc')][_0xff7e15('0x183')](this),this[_0xff7e15('0x247')]&&this[_0xff7e15('0x247')][_0xff7e15('0x1c0')]===Window_ShopStatus&&this['_statusWindow'][_0xff7e15('0x148')](this[_0xff7e15('0x44')]());},Window_EventItem[_0x44d0c2('0x2a1')][_0x44d0c2('0x141')]=function(){return![];},Window_EquipStatus[_0x44d0c2('0x2a1')]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x2ff305=_0x44d0c2;return VisuMZ[_0x2ff305('0x49')][_0x2ff305('0x289')]['EquipScene'][_0x2ff305('0x3fd')];},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x28f')]=Window_EquipStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x147')],Window_EquipStatus['prototype'][_0x44d0c2('0x147')]=function(){const _0x1b67e3=_0x44d0c2;this[_0x1b67e3('0x266')](),this['resetFontSettings']();if(this[_0x1b67e3('0x16f')])this['_actor'][_0x1b67e3('0x147')]();if(this[_0x1b67e3('0x1d')]()){if(_0x1b67e3('0x10e')!==_0x1b67e3('0xcc'))this[_0x1b67e3('0x6b')]();else{function _0x538980(){const _0x546bb6=_0x1b67e3;_0x327d90[_0x546bb6('0x49')][_0x546bb6('0xd7')][_0x546bb6('0x183')](this,_0x811977),this[_0x546bb6('0x182')](_0x153720);}}}else VisuMZ[_0x1b67e3('0x49')][_0x1b67e3('0x28f')][_0x1b67e3('0x183')](this);},Window_EquipStatus[_0x44d0c2('0x2a1')]['prepareRefreshItemsEquipsCoreLayout']=function(){const _0x3a53bf=_0x44d0c2;this[_0x3a53bf('0xc9')][_0x3a53bf('0x22d')]();if(!this['_actor'])return;if(this[_0x3a53bf('0x328')]()){const _0x9e0f09=ImageManager[_0x3a53bf('0x157')](this[_0x3a53bf('0x16f')][_0x3a53bf('0x3f0')]());_0x9e0f09['addLoadListener'](this['onMenuImageLoad']['bind'](this));}else this[_0x3a53bf('0xaa')]();},Window_EquipStatus[_0x44d0c2('0x2a1')]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0xb6d29c=_0x44d0c2;return Imported[_0xb6d29c('0x13b')]&&this[_0xb6d29c('0x16f')]['getMenuImage']()!==''&&VisuMZ[_0xb6d29c('0x49')][_0xb6d29c('0x289')][_0xb6d29c('0x3d8')][_0xb6d29c('0x219')];},Window_EquipStatus[_0x44d0c2('0x2a1')]['onMenuImageLoad']=function(){const _0x4a5906=_0x44d0c2;VisuMZ[_0x4a5906('0x49')][_0x4a5906('0x289')][_0x4a5906('0x3d8')]['DrawPortraitJS'][_0x4a5906('0x183')](this),this[_0x4a5906('0x410')]();},Window_EquipStatus[_0x44d0c2('0x2a1')]['refreshItemsEquipsCoreNoMenuImage']=function(){const _0x5d1bc7=_0x44d0c2;VisuMZ[_0x5d1bc7('0x49')][_0x5d1bc7('0x289')][_0x5d1bc7('0x3d8')][_0x5d1bc7('0x2e1')][_0x5d1bc7('0x183')](this),this[_0x5d1bc7('0x410')]();},Window_EquipStatus['prototype'][_0x44d0c2('0x410')]=function(){const _0x34800a=_0x44d0c2;this[_0x34800a('0x13')](),VisuMZ[_0x34800a('0x49')][_0x34800a('0x289')]['EquipScene'][_0x34800a('0x2a8')][_0x34800a('0x183')](this);},Window_EquipStatus['prototype'][_0x44d0c2('0x2d5')]=function(_0x133b82,_0x309f7f,_0x5abecb,_0x39f560,_0x260ef6){const _0x3854bb=_0x44d0c2,_0x1c9b31=ImageManager[_0x3854bb('0x157')](_0x133b82[_0x3854bb('0x3f0')]()),_0x2a5047=this[_0x3854bb('0x93')]-_0x1c9b31['width'];_0x309f7f+=_0x2a5047/0x2;if(_0x2a5047<0x0)_0x39f560-=_0x2a5047;Window_StatusBase[_0x3854bb('0x2a1')][_0x3854bb('0x2d5')][_0x3854bb('0x183')](this,_0x133b82,_0x309f7f,_0x5abecb,_0x39f560,_0x260ef6);},Window_EquipStatus[_0x44d0c2('0x2a1')]['actorParams']=function(){const _0x4fdf95=_0x44d0c2;if(Imported[_0x4fdf95('0x26a')]){if('ZpsHb'!==_0x4fdf95('0xae'))return VisuMZ[_0x4fdf95('0x3c8')][_0x4fdf95('0x289')][_0x4fdf95('0x263')]['ExtDisplayedParams'];else{function _0x282f2b(){const _0x1ec882=_0x4fdf95,_0x27d659=_0x68ff3[_0x1ec882('0x286')]('['+_0x1fc082['$1'][_0x1ec882('0x2ac')](/\d+/g)+']');for(const _0x56e146 of _0x27d659){if(_0x36789e[_0x1ec882('0x2d8')](_0x56e146))return![];}}}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus['prototype'][_0x44d0c2('0x35b')]=function(){const _0x222814=_0x44d0c2;return VisuMZ[_0x222814('0x49')][_0x222814('0x289')][_0x222814('0x3d8')][_0x222814('0x24d')];},Window_EquipStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0xfe')]=function(){const _0x2d76ec=_0x44d0c2;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x2d76ec('0x3c8')]['Settings'][_0x2d76ec('0x263')][_0x2d76ec('0x405')];},Window_EquipStatus['prototype']['drawUpdatedParamName']=function(_0x2534a7,_0x2072ee,_0x12955c,_0x1c0d58){const _0x7a5d8=_0x44d0c2,_0x3f4770=this['itemPadding']();if(Imported['VisuMZ_0_CoreEngine']){if(_0x7a5d8('0x4')!==_0x7a5d8('0x36c'))this['drawParamText'](_0x2072ee+_0x3f4770,_0x12955c,_0x1c0d58,_0x2534a7,![]);else{function _0x3fefc6(){const _0x5cd44b=_0x7a5d8;return _0xcc4edb['ItemsEquipsCore']['Settings'][_0x5cd44b('0x3d8')][_0x5cd44b('0x133')];}}}else{if(_0x7a5d8('0x3ee')===_0x7a5d8('0xa0')){function _0xae135c(){const _0x3077eb=_0x7a5d8;this['commandName'](_0x551b27)['match'](/\\I\[(\d+)\]/i);const _0x23a9a7=_0x1c4c47(_0x4d7a82['$1'])||0x0,_0x3859b9=this[_0x3077eb('0x36')](_0x4e15cb),_0x309611=_0x3859b9['x']+_0x2a4d23['floor']((_0x3859b9[_0x3077eb('0x110')]-_0x77ab7c['iconWidth'])/0x2),_0x465e28=_0x3859b9['y']+(_0x3859b9['height']-_0x4fe1a3[_0x3077eb('0x393')])/0x2;this['drawIcon'](_0x23a9a7,_0x309611,_0x465e28);}}else this[_0x7a5d8('0x15f')](TextManager['param'](_0x2534a7),_0x2072ee+_0x3f4770,_0x12955c,_0x1c0d58);}},Window_EquipStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x3ac')]=function(_0x5e2aef,_0x3dd178,_0x2ae8d5,_0x284403){const _0x14dfa3=_0x44d0c2,_0x5a5c3c=this[_0x14dfa3('0x5e')]();let _0x4de69a=0x0;Imported[_0x14dfa3('0x26a')]?_0x4de69a=this['_actor'][_0x14dfa3('0x371')](_0x5e2aef,!![]):_0x4de69a=this[_0x14dfa3('0x16f')][_0x14dfa3('0xbe')](_0x5e2aef);const _0x26660d=_0x4de69a;this['drawText'](_0x4de69a,_0x3dd178,_0x2ae8d5,_0x284403-_0x5a5c3c,'right');},Window_EquipStatus['prototype'][_0x44d0c2('0xb9')]=function(_0x10d934,_0x104675,_0x496a21,_0x3c5d01){const _0x5c7703=_0x44d0c2,_0x1337f1=this[_0x5c7703('0x5e')]();let _0x1e4a3f=0x0,_0x7b665d=0x0,_0x4f103e='';if(this[_0x5c7703('0x2f2')]){if(_0x5c7703('0x161')===_0x5c7703('0x161')){if(Imported[_0x5c7703('0x26a')])_0x1e4a3f=this[_0x5c7703('0x16f')][_0x5c7703('0x371')](_0x10d934,![]),_0x7b665d=this[_0x5c7703('0x2f2')]['paramValueByName'](_0x10d934,![]),_0x4f103e=this[_0x5c7703('0x2f2')]['paramValueByName'](_0x10d934,!![]);else{if('dWMvH'!==_0x5c7703('0x3f4')){function _0x4a1b40(){const _0x3ba110=_0x5c7703;this[_0x3ba110('0x416')]=!![],this[_0x3ba110('0x126')]=_0x4a96e4;}}else _0x1e4a3f=this['_actor'][_0x5c7703('0xbe')](_0x10d934),_0x7b665d=this[_0x5c7703('0x2f2')][_0x5c7703('0xbe')](_0x10d934),_0x4f103e=this['_tempActor'][_0x5c7703('0xbe')](_0x10d934);}const _0x3db7f5=_0x1e4a3f,_0x18a9fc=_0x7b665d;diffValue=_0x18a9fc-_0x3db7f5,this[_0x5c7703('0x1a8')](ColorManager[_0x5c7703('0x29c')](diffValue)),this['drawText'](_0x4f103e,_0x104675,_0x496a21,_0x3c5d01-_0x1337f1,_0x5c7703('0x214'));}else{function _0x2a5efe(){const _0x205244=_0x5c7703;return _0x2f87a2[_0x205244('0x49')][_0x205244('0x289')][_0x205244('0x19b')]['ElementNone'];}}}},Window_EquipStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x87')]=function(_0x56ced0,_0x3be832,_0x25e6ca,_0x33bc06){const _0x386e4b=_0x44d0c2,_0x16dcc3=this[_0x386e4b('0x5e')]();let _0x375f7c=0x0,_0x10d3fc=0x0,_0x9ed19=![];if(this[_0x386e4b('0x2f2')]){if(Imported['VisuMZ_0_CoreEngine']){if(_0x386e4b('0x3ea')===_0x386e4b('0x3ea'))_0x375f7c=this['_actor'][_0x386e4b('0x371')](_0x56ced0,![]),_0x10d3fc=this['_tempActor'][_0x386e4b('0x371')](_0x56ced0,![]),_0x9ed19=String(this[_0x386e4b('0x16f')]['paramValueByName'](_0x56ced0,!![]))[_0x386e4b('0x2ac')](/([%％])/i);else{function _0x3972b7(){const _0x5981f8=_0x386e4b;this[_0x5981f8('0x247')]=_0x311959,this['callUpdateHelp']();}}}else{if('LoQuj'!==_0x386e4b('0x381'))_0x375f7c=this[_0x386e4b('0x16f')][_0x386e4b('0xbe')](_0x56ced0),_0x10d3fc=this['_tempActor'][_0x386e4b('0xbe')](_0x56ced0),_0x9ed19=_0x375f7c%0x1!==0x0||_0x10d3fc%0x1!==0x0;else{function _0x52d954(){const _0xbf120f=_0x386e4b;return _0x1b1232[_0xbf120f('0x49')][_0xbf120f('0x289')][_0xbf120f('0x19b')][_0xbf120f('0x17c')];}}}const _0x1e70dd=_0x375f7c,_0x4c03e3=_0x10d3fc,_0x4811de=_0x4c03e3-_0x1e70dd;let _0x16bf67=_0x4811de;if(_0x9ed19)_0x16bf67=Math[_0x386e4b('0x283')](_0x4811de*0x64)+'%';_0x4811de!==0x0&&(this[_0x386e4b('0x1a8')](ColorManager[_0x386e4b('0x29c')](_0x4811de)),_0x16bf67=(_0x4811de>0x0?_0x386e4b('0x91'):'(%1)')[_0x386e4b('0x22f')](_0x16bf67),this[_0x386e4b('0x15f')](_0x16bf67,_0x3be832+_0x16dcc3,_0x25e6ca,_0x33bc06,_0x386e4b('0x73')));}},Window_EquipStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0xcf')]=function(_0x41e5ec,_0x13d2ff,_0x2f206b,_0x4dbee9,_0x2a770a){const _0x475c63=_0x44d0c2;if(VisuMZ[_0x475c63('0x49')][_0x475c63('0x289')][_0x475c63('0x3d8')][_0x475c63('0x357')]===![])return;_0x2a770a=Math[_0x475c63('0x29')](_0x2a770a||0x1,0x1);while(_0x2a770a--){_0x4dbee9=_0x4dbee9||this[_0x475c63('0x202')](),this[_0x475c63('0xc9')][_0x475c63('0x1d1')]=0xa0;const _0x34a2c3=ColorManager['getItemsEquipsCoreBackColor2']();this[_0x475c63('0xc9')][_0x475c63('0x1fb')](_0x41e5ec+0x1,_0x13d2ff+0x1,_0x2f206b-0x2,_0x4dbee9-0x2,_0x34a2c3),this[_0x475c63('0xc9')][_0x475c63('0x1d1')]=0xff;}},ColorManager[_0x44d0c2('0x2f1')]=function(){const _0x9f7a23=_0x44d0c2,_0x538d31=VisuMZ[_0x9f7a23('0x49')][_0x9f7a23('0x289')]['EquipScene'];let _0x2e522e=_0x538d31[_0x9f7a23('0x2f')]!==undefined?_0x538d31['BackRectColor']:0x13;return ColorManager[_0x9f7a23('0x2d1')](_0x2e522e);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0xd7')]=Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')],Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')]=function(_0x512d77){const _0x1625f5=_0x44d0c2;VisuMZ[_0x1625f5('0x49')]['Window_EquipCommand_initialize']['call'](this,_0x512d77),this[_0x1625f5('0x182')](_0x512d77);},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x182')]=function(_0x31e9bb){const _0x2c6e3b=_0x44d0c2,_0x3fbaa2=new Rectangle(0x0,0x0,_0x31e9bb[_0x2c6e3b('0x110')],_0x31e9bb[_0x2c6e3b('0x2fe')]);this['_commandNameWindow']=new Window_Base(_0x3fbaa2),this[_0x2c6e3b('0x2b6')]['opacity']=0x0,this[_0x2c6e3b('0x4e')](this[_0x2c6e3b('0x2b6')]),this[_0x2c6e3b('0x414')]();},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1f8')]=function(){const _0x2eabaf=_0x44d0c2;Window_HorzCommand[_0x2eabaf('0x2a1')][_0x2eabaf('0x1f8')][_0x2eabaf('0x183')](this);if(this[_0x2eabaf('0x2b6')])this[_0x2eabaf('0x414')]();},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x414')]=function(){const _0x3f2bca=_0x44d0c2,_0x4bf0e8=this[_0x3f2bca('0x2b6')];_0x4bf0e8[_0x3f2bca('0xc9')]['clear']();const _0x79b71f=this['commandStyleCheck'](this[_0x3f2bca('0x99')]());if(_0x79b71f==='icon'){const _0x5cec55=this[_0x3f2bca('0x36')](this[_0x3f2bca('0x99')]());let _0x59c535=this[_0x3f2bca('0x2cb')](this[_0x3f2bca('0x99')]());_0x59c535=_0x59c535['replace'](/\\I\[(\d+)\]/gi,''),_0x4bf0e8[_0x3f2bca('0x13')](),this[_0x3f2bca('0x2c6')](_0x59c535,_0x5cec55),this[_0x3f2bca('0x29a')](_0x59c535,_0x5cec55),this[_0x3f2bca('0x107')](_0x59c535,_0x5cec55);}},Window_EquipCommand[_0x44d0c2('0x2a1')]['commandNameWindowDrawBackground']=function(_0x5a24ca,_0x51bb02){},Window_EquipCommand[_0x44d0c2('0x2a1')]['commandNameWindowDrawText']=function(_0x39e1b8,_0x5dc49d){const _0x2ea7e8=_0x44d0c2,_0x19ba94=this[_0x2ea7e8('0x2b6')];_0x19ba94[_0x2ea7e8('0x15f')](_0x39e1b8,0x0,_0x5dc49d['y'],_0x19ba94[_0x2ea7e8('0x93')],'center');},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x107')]=function(_0x3ca23d,_0x59df38){const _0x217d12=_0x44d0c2,_0x3780ae=this['_commandNameWindow'],_0x5f1c53=$gameSystem['windowPadding'](),_0x4d0a4b=_0x59df38['x']+Math[_0x217d12('0xca')](_0x59df38[_0x217d12('0x110')]/0x2)+_0x5f1c53;_0x3780ae['x']=_0x3780ae[_0x217d12('0x110')]/-0x2+_0x4d0a4b,_0x3780ae['y']=Math[_0x217d12('0xca')](_0x59df38[_0x217d12('0x2fe')]/0x2);},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x159')]=function(){const _0xc4744a=_0x44d0c2;return Imported[_0xc4744a('0x26a')]&&Window_HorzCommand[_0xc4744a('0x2a1')]['isUseModernControls'][_0xc4744a('0x183')](this);},Window_EquipCommand['prototype'][_0x44d0c2('0x7b')]=function(){const _0x1f11d1=_0x44d0c2;if(this[_0x1f11d1('0x13c')]()===_0x1f11d1('0x279'))Window_HorzCommand['prototype']['playOkSound']['call'](this);},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x2af')]=function(){const _0x1c5569=_0x44d0c2;!this['processCursorSpecialCheckModernControls']()&&Window_HorzCommand['prototype'][_0x1c5569('0x2af')][_0x1c5569('0x183')](this);},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x295')]=function(){const _0xb58799=_0x44d0c2;if(!this[_0xb58799('0x212')]())return![];if(SceneManager['_scene']['constructor']!==Scene_Equip)return![];return Input[_0xb58799('0x13f')]('down')&&(this[_0xb58799('0x32')](),SceneManager[_0xb58799('0x3e9')]['commandEquip'](),SceneManager[_0xb58799('0x3e9')]['_slotWindow'][_0xb58799('0x399')](-0x1)),![];},Window_EquipCommand['prototype'][_0x44d0c2('0x2c4')]=function(){return this['_list']?this['_list']['length']:0x3;},Window_EquipCommand['prototype'][_0x44d0c2('0x116')]=function(){const _0x54d0ae=_0x44d0c2;if(this[_0x54d0ae('0x1e')]()&&this['visible']&&SceneManager[_0x54d0ae('0x3e9')][_0x54d0ae('0x1c0')]===Scene_Equip){if(_0x54d0ae('0xcd')===_0x54d0ae('0x368')){function _0xf98761(){const _0x4204c3=_0x54d0ae;return this[_0x4204c3('0x1d')]()?this[_0x4204c3('0x16e')]():_0x1ad493[_0x4204c3('0x2a1')]['helpWindowRect'][_0x4204c3('0x183')](this);}}else{if(this[_0x54d0ae('0x9a')]()&&TouchInput[_0x54d0ae('0x1d4')]())this[_0x54d0ae('0x340')](![]);else TouchInput[_0x54d0ae('0x13f')]()&&this[_0x54d0ae('0x340')](!![]);if(TouchInput[_0x54d0ae('0x329')]()){if(_0x54d0ae('0x211')!==_0x54d0ae('0x211')){function _0x5bc700(){const _0x5e699f=_0x54d0ae;return this[_0x5e699f('0x1d')]()?this[_0x5e699f('0x326')]():_0x377b53[_0x5e699f('0x49')][_0x5e699f('0xff')][_0x5e699f('0x183')](this);}}else this['onTouchOk']();}else TouchInput[_0x54d0ae('0x26f')]()&&this['onTouchCancel']();}}},Window_EquipCommand[_0x44d0c2('0x2a1')]['onTouchSelectModernControls']=function(_0x2bb0b2){const _0x39c5bc=_0x44d0c2;this[_0x39c5bc('0x372')]=![];const _0x437865=this['index'](),_0x3cadb0=this[_0x39c5bc('0xc3')](),_0x2d9753=SceneManager[_0x39c5bc('0x3e9')][_0x39c5bc('0x65')];if(_0x2d9753[_0x39c5bc('0x1e')]()&&_0x2d9753[_0x39c5bc('0x3f9')]){if(_0x3cadb0>=0x0){if(_0x3cadb0===this[_0x39c5bc('0x99')]()){if(_0x39c5bc('0x2c9')==='XvkIE'){function _0x1ce905(){const _0x3f0e17=_0x39c5bc;_0x39a7f7[_0x3f0e17('0x49')]['Window_Selectable_setHelpWindowItem']['call'](this,_0x23be3);if(this[_0x3f0e17('0x141')]())this[_0x3f0e17('0x18d')](_0x343d12);}}else this[_0x39c5bc('0x372')]=!![];}this['activate'](),this[_0x39c5bc('0xb4')](_0x3cadb0);}else _0x2d9753['hitIndex']()>=0x0&&(this[_0x39c5bc('0xa1')](),this['deselect']());}_0x2bb0b2&&this['index']()!==_0x437865&&this['playCursorSound']();},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0xa6')]=function(){const _0xeb2db4=_0x44d0c2;this['addEquipCommand'](),this['addOptimizeCommand'](),this[_0xeb2db4('0x3e1')]();},Window_EquipCommand[_0x44d0c2('0x2a1')]['refresh']=function(){const _0x2a873e=_0x44d0c2;Window_HorzCommand[_0x2a873e('0x2a1')][_0x2a873e('0x147')][_0x2a873e('0x183')](this),this[_0x2a873e('0x35')]();},Window_EquipCommand['prototype']['addEquipCommand']=function(){const _0xcbdc11=_0x44d0c2;if(!this[_0xcbdc11('0x5d')]())return;const _0x1d6220=this[_0xcbdc11('0x169')](),_0x5a3c59=VisuMZ[_0xcbdc11('0x49')]['Settings'][_0xcbdc11('0x3d8')][_0xcbdc11('0x6d')],_0x424168=_0x1d6220==='text'?TextManager['equip2']:_0xcbdc11('0x34d')[_0xcbdc11('0x22f')](_0x5a3c59,TextManager[_0xcbdc11('0x315')]),_0xbc7d66=this[_0xcbdc11('0x1c2')]();this[_0xcbdc11('0x2bd')](_0x424168,_0xcbdc11('0x279'),_0xbc7d66);},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x5d')]=function(){const _0x175182=_0x44d0c2;return!this[_0x175182('0x159')]();},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1c2')]=function(){return!![];},Window_EquipCommand['prototype'][_0x44d0c2('0x255')]=function(){const _0x1fcb9e=_0x44d0c2;if(!this[_0x1fcb9e('0x3c3')]())return;const _0x1ea543=this[_0x1fcb9e('0x169')](),_0x165da2=VisuMZ['ItemsEquipsCore'][_0x1fcb9e('0x289')]['EquipScene'][_0x1fcb9e('0x25f')],_0x3cee02=_0x1ea543===_0x1fcb9e('0x7a')?TextManager[_0x1fcb9e('0x3fe')]:_0x1fcb9e('0x34d')[_0x1fcb9e('0x22f')](_0x165da2,TextManager[_0x1fcb9e('0x3fe')]),_0x29ebc9=this[_0x1fcb9e('0x37b')]();this[_0x1fcb9e('0x2bd')](_0x3cee02,_0x1fcb9e('0x3fe'),_0x29ebc9);},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x3c3')]=function(){const _0x4179ce=_0x44d0c2;return VisuMZ[_0x4179ce('0x49')][_0x4179ce('0x289')][_0x4179ce('0x3d8')][_0x4179ce('0x133')];},Window_EquipCommand[_0x44d0c2('0x2a1')]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x3e1')]=function(){const _0x54b91e=_0x44d0c2;if(!this[_0x54b91e('0x422')]())return;const _0x3106f8=this[_0x54b91e('0x169')](),_0x4f29dc=VisuMZ[_0x54b91e('0x49')][_0x54b91e('0x289')][_0x54b91e('0x3d8')][_0x54b91e('0x1c4')],_0x18c070=_0x3106f8==='text'?TextManager['clear']:_0x54b91e('0x34d')[_0x54b91e('0x22f')](_0x4f29dc,TextManager[_0x54b91e('0x22d')]),_0x262c0d=this[_0x54b91e('0x3ca')]();this[_0x54b91e('0x2bd')](_0x18c070,'clear',_0x262c0d);},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x422')]=function(){const _0x2cd012=_0x44d0c2;return VisuMZ[_0x2cd012('0x49')]['Settings'][_0x2cd012('0x3d8')][_0x2cd012('0x2e9')];},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x3ca')]=function(){return!![];},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1b9')]=function(){const _0x4fb654=_0x44d0c2;return VisuMZ['ItemsEquipsCore'][_0x4fb654('0x289')][_0x4fb654('0x3d8')][_0x4fb654('0x391')];},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x2ec')]=function(_0x5eebfd){const _0x13473f=_0x44d0c2,_0x1854f2=this['commandStyleCheck'](_0x5eebfd);if(_0x1854f2===_0x13473f('0x164'))this['drawItemStyleIconText'](_0x5eebfd);else{if(_0x1854f2===_0x13473f('0x41d'))this[_0x13473f('0xe')](_0x5eebfd);else{if(_0x13473f('0x37')!=='CLUNo'){function _0x2219c8(){const _0x2e2dcb=_0x13473f;return this[_0x2e2dcb('0x1d')]()?this[_0x2e2dcb('0x278')]():_0x503011[_0x2e2dcb('0x49')][_0x2e2dcb('0x289')]['ItemScene'][_0x2e2dcb('0x2a4')]['call'](this);}}else Window_HorzCommand['prototype'][_0x13473f('0x2ec')][_0x13473f('0x183')](this,_0x5eebfd);}}},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x169')]=function(){const _0x48b1b4=_0x44d0c2;return VisuMZ['ItemsEquipsCore'][_0x48b1b4('0x289')][_0x48b1b4('0x3d8')][_0x48b1b4('0x209')];},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1f9')]=function(_0x697362){const _0x1ca7f0=_0x44d0c2;if(_0x697362<0x0)return'text';const _0xfb0881=this['commandStyle']();if(_0xfb0881!=='auto'){if('uNuZj'===_0x1ca7f0('0x14a')){function _0x17a0e0(){const _0x381a09=_0x1ca7f0;return _0x488b65['ItemsEquipsCore']['Settings'][_0x381a09('0x142')]['CmdHideDisabled'];}}else return _0xfb0881;}else{if(this[_0x1ca7f0('0x32d')]()>0x0){if(_0x1ca7f0('0x140')===_0x1ca7f0('0x33a')){function _0x3d033e(){const _0x503417=_0x1ca7f0;return _0x3bdc65===null&&this[_0x503417('0x3d5')]()['includes'](this[_0x503417('0x137')]())?this[_0x503417('0x185')]['length']>0x0?![]:!![]:_0xff3423[_0x503417('0x49')][_0x503417('0x407')][_0x503417('0x183')](this,_0x42423e);}}else{const _0x264c7f=this[_0x1ca7f0('0x2cb')](_0x697362);if(_0x264c7f[_0x1ca7f0('0x2ac')](/\\I\[(\d+)\]/i)){const _0x51d8aa=this[_0x1ca7f0('0x36')](_0x697362),_0x182e88=this[_0x1ca7f0('0x1b8')](_0x264c7f)[_0x1ca7f0('0x110')];return _0x182e88<=_0x51d8aa[_0x1ca7f0('0x110')]?_0x1ca7f0('0x164'):_0x1ca7f0('0x41d');}}}}return'text';},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x0')]=function(_0x5ed6a3){const _0x45a5c7=_0x44d0c2,_0x48eef5=this['itemLineRect'](_0x5ed6a3),_0xd9346d=this[_0x45a5c7('0x2cb')](_0x5ed6a3),_0x36fd80=this[_0x45a5c7('0x1b8')](_0xd9346d)[_0x45a5c7('0x110')];this[_0x45a5c7('0x117')](this[_0x45a5c7('0x3e6')](_0x5ed6a3));const _0x522ccd=this['itemTextAlign']();if(_0x522ccd==='right'){if(_0x45a5c7('0x18f')===_0x45a5c7('0x18f'))this['drawTextEx'](_0xd9346d,_0x48eef5['x']+_0x48eef5['width']-_0x36fd80,_0x48eef5['y'],_0x36fd80);else{function _0x1e33df(){const _0x4afc33=_0x45a5c7,_0x4c5791=this['_commandNameWindow'],_0x250532=_0x13cfe0[_0x4afc33('0x1f1')](),_0x7844ff=_0x35539a['x']+_0x4b6ec2[_0x4afc33('0xca')](_0x4394e7[_0x4afc33('0x110')]/0x2)+_0x250532;_0x4c5791['x']=_0x4c5791[_0x4afc33('0x110')]/-0x2+_0x7844ff,_0x4c5791['y']=_0x3b07f0[_0x4afc33('0xca')](_0x16b19d[_0x4afc33('0x2fe')]/0x2);}}}else{if(_0x522ccd===_0x45a5c7('0x305')){const _0x279929=_0x48eef5['x']+Math['floor']((_0x48eef5[_0x45a5c7('0x110')]-_0x36fd80)/0x2);this[_0x45a5c7('0x233')](_0xd9346d,_0x279929,_0x48eef5['y'],_0x36fd80);}else this['drawTextEx'](_0xd9346d,_0x48eef5['x'],_0x48eef5['y'],_0x36fd80);}},Window_EquipCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0xe')]=function(_0x43edec){const _0x10fbdb=_0x44d0c2;this[_0x10fbdb('0x2cb')](_0x43edec)[_0x10fbdb('0x2ac')](/\\I\[(\d+)\]/i);const _0x2b4fd3=Number(RegExp['$1'])||0x0,_0x322c95=this[_0x10fbdb('0x36')](_0x43edec),_0x294c0a=_0x322c95['x']+Math[_0x10fbdb('0xca')]((_0x322c95[_0x10fbdb('0x110')]-ImageManager['iconWidth'])/0x2),_0x28ecf7=_0x322c95['y']+(_0x322c95['height']-ImageManager[_0x10fbdb('0x393')])/0x2;this['drawIcon'](_0x2b4fd3,_0x294c0a,_0x28ecf7);},Window_EquipSlot['prototype']['isUseModernControls']=function(){const _0x529f36=_0x44d0c2;return Imported[_0x529f36('0x26a')]&&Window_HorzCommand[_0x529f36('0x2a1')][_0x529f36('0x159')][_0x529f36('0x183')](this);},Window_EquipSlot[_0x44d0c2('0x2a1')][_0x44d0c2('0x62')]=function(){const _0x3d8960=_0x44d0c2;Window_StatusBase[_0x3d8960('0x2a1')][_0x3d8960('0x62')][_0x3d8960('0x183')](this),this[_0x3d8960('0x1f8')]();},Window_EquipSlot[_0x44d0c2('0x2a1')][_0x44d0c2('0x2f0')]=function(){const _0x69b538=_0x44d0c2;Window_StatusBase['prototype'][_0x69b538('0x2f0')]['call'](this),this[_0x69b538('0x134')]();},Window_EquipSlot[_0x44d0c2('0x2a1')]['checkShiftRemoveShortcut']=function(){const _0x44fe84=_0x44d0c2;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x44fe84('0x13f')](_0x44fe84('0x20b'))&&this['item']()){if('sgLaC'!==_0x44fe84('0x4a')){const _0x24e217=SceneManager[_0x44fe84('0x3e9')][_0x44fe84('0x16f')];if(_0x24e217){if(this[_0x44fe84('0x2e5')](this[_0x44fe84('0x99')]())){if(_0x44fe84('0x241')!=='yDprV'){function _0xbf6afd(){return!![];}}else this[_0x44fe84('0x323')](),this[_0x44fe84('0xd5')]();}else this[_0x44fe84('0x1aa')]();}}else{function _0x27890b(){const _0xa098bf=_0x44fe84;if(this[_0xa098bf('0x3da')](_0x34df57))return _0x47f52a[_0xa098bf('0x49')][_0xa098bf('0x289')][_0xa098bf('0x3f7')][_0xa098bf('0x33c')];else{if(this[_0xa098bf('0x264')](_0x298509))return _0x92c49f[_0xa098bf('0x49')][_0xa098bf('0x289')]['ItemScene'][_0xa098bf('0x299')];else{if(this[_0xa098bf('0x154')](_0x9b6746))return _0x40c938[_0xa098bf('0x49')][_0xa098bf('0x289')][_0xa098bf('0x3f7')]['MaxArmors'];}}}}}},Window_EquipSlot[_0x44d0c2('0x2a1')][_0x44d0c2('0x2e5')]=function(_0x40bfae){const _0x5d86e1=_0x44d0c2,_0x203a00=SceneManager[_0x5d86e1('0x3e9')]['_actor'];if(!_0x203a00)return;if(!_0x203a00[_0x5d86e1('0x1d9')](this['index']()))return![];const _0x3d7251=_0x203a00['equipSlots']()[this['index']()];if(_0x203a00[_0x5d86e1('0x3d5')]()[_0x5d86e1('0x284')](_0x3d7251))return![];return!![];;},Window_EquipSlot[_0x44d0c2('0x2a1')][_0x44d0c2('0x323')]=function(){const _0x512c2b=_0x44d0c2;SoundManager[_0x512c2b('0x11c')]();const _0x4bb19f=SceneManager[_0x512c2b('0x3e9')]['_actor'];_0x4bb19f[_0x512c2b('0x235')](this[_0x512c2b('0x99')](),null),this['refresh'](),this[_0x512c2b('0x210')]['refresh']();},Window_EquipSlot[_0x44d0c2('0x2a1')]['isShiftRemoveShortcutEnabled']=function(){const _0x4a9e70=_0x44d0c2;if(!this[_0x4a9e70('0x3f1')])return![];if(!VisuMZ[_0x4a9e70('0x49')][_0x4a9e70('0x289')][_0x4a9e70('0x3d8')][_0x4a9e70('0x112')])return![];return!![];},Window_EquipSlot[_0x44d0c2('0x2a1')][_0x44d0c2('0x2af')]=function(){const _0x2ac2d4=_0x44d0c2;if(!this['processCursorSpecialCheckModernControls']()){if(_0x2ac2d4('0x297')!==_0x2ac2d4('0x22a'))Window_StatusBase[_0x2ac2d4('0x2a1')][_0x2ac2d4('0x2af')][_0x2ac2d4('0x183')](this);else{function _0x361ba3(){const _0x5bbf13=_0x2ac2d4;return _0x8c9e57[_0x5bbf13('0x49')][_0x5bbf13('0x15c')][_0x5bbf13('0x183')](this);}}}},Window_EquipSlot[_0x44d0c2('0x2a1')]['processCursorSpecialCheckModernControls']=function(){const _0x40a476=_0x44d0c2;if(!this[_0x40a476('0x212')]())return![];if(SceneManager[_0x40a476('0x3e9')][_0x40a476('0x1c0')]!==Scene_Equip)return![];if(this[_0x40a476('0x1cf')]())return this[_0x40a476('0x32')](),Input['clear'](),SceneManager[_0x40a476('0x3e9')]['onSlotCancel'](),![];else{if(Input['isRepeated'](_0x40a476('0x41'))){if(_0x40a476('0x254')===_0x40a476('0x380')){function _0x4e80d2(){const _0x553be9=_0x40a476;return this[_0x553be9('0x3d5')]()[_0x553be9('0x284')](this[_0x553be9('0x230')]()[_0x282913])?![]:this['isEquipChangeOk'](_0x202894);}}else{const _0x5384f9=this[_0x40a476('0x99')]();if(Input['isPressed'](_0x40a476('0x20b'))){if(_0x40a476('0xd3')===_0x40a476('0xd3'))this[_0x40a476('0x150')]();else{function _0x435b41(){const _0x2dc118=_0x40a476;return _0x20be39['ItemsEquipsCore'][_0x2dc118('0x289')]['ItemScene'][_0x2dc118('0x33c')];}}}else this[_0x40a476('0x1e5')](Input[_0x40a476('0x13f')](_0x40a476('0x41')));if(this[_0x40a476('0x99')]()!==_0x5384f9){if(_0x40a476('0x121')===_0x40a476('0x121'))this[_0x40a476('0x32')]();else{function _0x1421d7(){const _0x14d052=_0x40a476,_0x307168=_0x3864d6(_0xa6920d['$1'])[_0x14d052('0x102')](/[\r\n]+/);for(const _0x230941 of _0x307168){const _0x457f49=_0x529362[_0x14d052('0x41b')][_0x14d052('0x2b0')](_0x230941[_0x14d052('0x307')]());if(_0x457f49>0x0)_0x3596ad[_0x14d052('0x230')][_0x14d052('0x2cc')](_0x457f49);}}}}return!![];}}else{if(this['isShiftShortcutKeyForRemove']()&&Input['isTriggered'](_0x40a476('0x20b')))return!![];}}return![];},Window_EquipSlot[_0x44d0c2('0x2a1')][_0x44d0c2('0x1cf')]=function(){const _0x4a3bdd=_0x44d0c2;if(this['index']()!==0x0)return![];const _0x54684b=VisuMZ[_0x4a3bdd('0x49')][_0x4a3bdd('0x289')][_0x4a3bdd('0x3d8')];if(!_0x54684b[_0x4a3bdd('0x133')]&&!_0x54684b['CommandAddClear'])return![];return Input[_0x4a3bdd('0x13f')]('up');},Window_EquipSlot[_0x44d0c2('0x2a1')]['isShiftShortcutKeyForRemove']=function(){const _0x2382a1=_0x44d0c2;return VisuMZ[_0x2382a1('0x49')][_0x2382a1('0x289')][_0x2382a1('0x3d8')]['ShiftShortcutKey'];},Window_EquipSlot[_0x44d0c2('0x2a1')][_0x44d0c2('0x116')]=function(){const _0x192d73=_0x44d0c2;if(this[_0x192d73('0x1e')]()&&this['visible']&&SceneManager[_0x192d73('0x3e9')][_0x192d73('0x1c0')]===Scene_Equip){if(this[_0x192d73('0x9a')]()&&TouchInput[_0x192d73('0x1d4')]())this[_0x192d73('0x340')](![]);else{if(TouchInput['isTriggered']()){if(_0x192d73('0x303')==='asIlo')this[_0x192d73('0x340')](!![]);else{function _0x56ae1c(){const _0x4586f2=_0x192d73;this[_0x4586f2('0x0')](_0x28248e);}}}}if(TouchInput[_0x192d73('0x329')]())this['onTouchOk']();else{if(TouchInput[_0x192d73('0x26f')]()){if(_0x192d73('0x2b8')!=='MlNfS'){function _0x1397df(){const _0x2ddd29=_0x192d73;return _0x5848bc['ItemsEquipsCore'][_0x2ddd29('0x289')]['StatusWindow']['ElementWeapon'];}}else this[_0x192d73('0x38c')]();}}}},Window_EquipSlot[_0x44d0c2('0x2a1')]['onTouchSelectModernControls']=function(_0x32eac9){const _0x4948af=_0x44d0c2;this[_0x4948af('0x372')]=![];const _0x3106c5=this[_0x4948af('0x99')](),_0x3db55f=this['hitIndex'](),_0x5574b6=SceneManager['_scene']['_commandWindow'];if(_0x5574b6[_0x4948af('0x1e')]()&&_0x5574b6['visible']){if(_0x4948af('0x96')!==_0x4948af('0x96')){function _0x38984e(){const _0x321a2b=_0x4948af;return!!_0x3bee01&&_0x138f9e[_0x321a2b('0x23d')][_0x321a2b('0x284')](_0x403654(_0xd6c0e3['$1'])['toUpperCase']()['trim']());}}else{if(_0x3db55f>=0x0)_0x3db55f===this[_0x4948af('0x99')]()&&(this[_0x4948af('0x372')]=!![]),this['activate'](),this[_0x4948af('0xb4')](_0x3db55f);else _0x5574b6['hitIndex']()>=0x0&&(this[_0x4948af('0xa1')](),this[_0x4948af('0xab')]());}}_0x32eac9&&this[_0x4948af('0x99')]()!==_0x3106c5&&this[_0x4948af('0x32')]();},VisuMZ['ItemsEquipsCore']['Window_EquipItem_includes']=Window_EquipItem[_0x44d0c2('0x2a1')][_0x44d0c2('0x284')],Window_EquipItem['prototype']['includes']=function(_0x1ae518){const _0x7e7979=_0x44d0c2;return _0x1ae518===null&&this[_0x7e7979('0x3d5')]()[_0x7e7979('0x284')](this['etypeId']())?this[_0x7e7979('0x185')][_0x7e7979('0x3f3')]>0x0?![]:!![]:VisuMZ[_0x7e7979('0x49')][_0x7e7979('0x407')][_0x7e7979('0x183')](this,_0x1ae518);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x270')]=Window_EquipItem['prototype'][_0x44d0c2('0x24')],Window_EquipItem[_0x44d0c2('0x2a1')][_0x44d0c2('0x24')]=function(_0xfae962){const _0x34743a=_0x44d0c2;return!_0xfae962&&this['nonRemovableEtypes']()[_0x34743a('0x284')](this[_0x34743a('0x137')]())?![]:VisuMZ[_0x34743a('0x49')]['Window_EquipItem_isEnabled'][_0x34743a('0x183')](this,_0xfae962);},Window_EquipItem[_0x44d0c2('0x2a1')][_0x44d0c2('0x3d5')]=function(){const _0xe8ac58=_0x44d0c2;return VisuMZ[_0xe8ac58('0x49')]['Settings']['EquipScene']['NonRemoveETypes'];},Window_EquipItem[_0x44d0c2('0x2a1')][_0x44d0c2('0x2ec')]=function(_0x422239){const _0x47a7d3=_0x44d0c2,_0x53383b=this['itemAt'](_0x422239);if(_0x53383b){if('thTVZ'!==_0x47a7d3('0x10c'))Window_ItemList[_0x47a7d3('0x2a1')][_0x47a7d3('0x2ec')][_0x47a7d3('0x183')](this,_0x422239);else{function _0x447193(){const _0x72dec9=_0x47a7d3,_0xb4b56='%1-%2'['format'](_0x408ea0,_0x198749);_0xced68c['ItemsEquipsCore'][_0x72dec9('0x1a4')][_0xb4b56]=new _0x16947e(_0x72dec9('0x44'),_0x72dec9('0x3b3'),_0x49cf2a);}}}else{if('Qgqbi'===_0x47a7d3('0x293'))this[_0x47a7d3('0x342')](_0x422239);else{function _0x5e1d88(){const _0x3865ef=_0x47a7d3;for(const _0x3cade2 of _0x1d8689[_0x3865ef('0x185')]){if(_0x3cade2)_0x3cade2['prepareNewEquipSlotsOnLoad']();}}}}},Window_EquipItem[_0x44d0c2('0x2a1')][_0x44d0c2('0x342')]=function(_0x1838c5){const _0x43e935=_0x44d0c2;this[_0x43e935('0x117')](this[_0x43e935('0x24')](null));const _0x3bb6f2=VisuMZ[_0x43e935('0x49')][_0x43e935('0x289')][_0x43e935('0x3d8')],_0x4cd3e3=this[_0x43e935('0x36')](_0x1838c5),_0x262006=_0x4cd3e3['y']+(this[_0x43e935('0x202')]()-ImageManager['iconHeight'])/0x2,_0x27ff3a=ImageManager[_0x43e935('0x40')]+0x4,_0x173dfd=Math[_0x43e935('0x29')](0x0,_0x4cd3e3[_0x43e935('0x110')]-_0x27ff3a);this[_0x43e935('0x2df')](),this[_0x43e935('0xf0')](_0x3bb6f2[_0x43e935('0x10a')],_0x4cd3e3['x'],_0x262006),this[_0x43e935('0x15f')](_0x3bb6f2[_0x43e935('0xf9')],_0x4cd3e3['x']+_0x27ff3a,_0x4cd3e3['y'],_0x173dfd),this[_0x43e935('0x117')](!![]);},Window_EquipItem[_0x44d0c2('0x2a1')][_0x44d0c2('0xd5')]=function(){const _0x11d1da=_0x44d0c2;Window_ItemList[_0x11d1da('0x2a1')][_0x11d1da('0xd5')][_0x11d1da('0x183')](this);if(this[_0x11d1da('0x16f')]&&this['_statusWindow']&&this[_0x11d1da('0x3ed')]>=0x0){const _0x40eac9=JsonEx[_0x11d1da('0x408')](this[_0x11d1da('0x16f')]);_0x40eac9[_0x11d1da('0x2f2')]=!![],_0x40eac9[_0x11d1da('0x1f6')](this[_0x11d1da('0x3ed')],this['item']()),this[_0x11d1da('0x247')]['setTempActor'](_0x40eac9);}},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x217')]=Window_ShopCommand[_0x44d0c2('0x2a1')]['initialize'],Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1e9')]=function(_0x448e53){const _0x412dcb=_0x44d0c2;VisuMZ[_0x412dcb('0x49')][_0x412dcb('0x217')][_0x412dcb('0x183')](this,_0x448e53),this[_0x412dcb('0x182')](_0x448e53);},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x182')]=function(_0x382947){const _0x170b24=_0x44d0c2,_0x34ead2=new Rectangle(0x0,0x0,_0x382947[_0x170b24('0x110')],_0x382947[_0x170b24('0x2fe')]);this['_commandNameWindow']=new Window_Base(_0x34ead2),this[_0x170b24('0x2b6')][_0x170b24('0x16a')]=0x0,this[_0x170b24('0x4e')](this['_commandNameWindow']),this[_0x170b24('0x414')]();},Window_ShopCommand['prototype'][_0x44d0c2('0x1f8')]=function(){const _0x53b62e=_0x44d0c2;Window_HorzCommand[_0x53b62e('0x2a1')][_0x53b62e('0x1f8')][_0x53b62e('0x183')](this);if(this[_0x53b62e('0x2b6')])this[_0x53b62e('0x414')]();},Window_ShopCommand['prototype'][_0x44d0c2('0x414')]=function(){const _0x2cb7ec=_0x44d0c2,_0xcb0e16=this[_0x2cb7ec('0x2b6')];_0xcb0e16[_0x2cb7ec('0xc9')]['clear']();const _0x4d0bd6=this['commandStyleCheck'](this['index']());if(_0x4d0bd6===_0x2cb7ec('0x41d')){const _0x49bc03=this[_0x2cb7ec('0x36')](this[_0x2cb7ec('0x99')]());let _0x19362c=this[_0x2cb7ec('0x2cb')](this['index']());_0x19362c=_0x19362c[_0x2cb7ec('0x4f')](/\\I\[(\d+)\]/gi,''),_0xcb0e16[_0x2cb7ec('0x13')](),this[_0x2cb7ec('0x2c6')](_0x19362c,_0x49bc03),this[_0x2cb7ec('0x29a')](_0x19362c,_0x49bc03),this['commandNameWindowCenter'](_0x19362c,_0x49bc03);}},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x2c6')]=function(_0x42ecae,_0x5e30bd){},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x29a')]=function(_0x815031,_0x12f419){const _0x51c05c=_0x44d0c2,_0x5add2e=this['_commandNameWindow'];_0x5add2e[_0x51c05c('0x15f')](_0x815031,0x0,_0x12f419['y'],_0x5add2e[_0x51c05c('0x93')],_0x51c05c('0x305'));},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x107')]=function(_0x57e683,_0x30d547){const _0x90141f=_0x44d0c2,_0x4c3619=this[_0x90141f('0x2b6')],_0x4eb4fe=$gameSystem[_0x90141f('0x1f1')](),_0x5e68ad=_0x30d547['x']+Math['floor'](_0x30d547[_0x90141f('0x110')]/0x2)+_0x4eb4fe;_0x4c3619['x']=_0x4c3619['width']/-0x2+_0x5e68ad,_0x4c3619['y']=Math['floor'](_0x30d547[_0x90141f('0x2fe')]/0x2);},Window_ShopCommand[_0x44d0c2('0x2a1')]['maxCols']=function(){const _0x203fdb=_0x44d0c2;return this['_list']?this[_0x203fdb('0x3d4')][_0x203fdb('0x3f3')]:0x3;},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x3c0')]=function(){const _0x9387f2=_0x44d0c2;return VisuMZ[_0x9387f2('0x49')][_0x9387f2('0x289')][_0x9387f2('0x142')][_0x9387f2('0x6c')];},Window_ShopCommand[_0x44d0c2('0x2a1')]['makeCommandList']=function(){const _0x3f79f5=_0x44d0c2;this[_0x3f79f5('0x287')](),this[_0x3f79f5('0x61')](),this['addCancelCommand']();},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x147')]=function(){const _0x193c00=_0x44d0c2;Window_HorzCommand['prototype'][_0x193c00('0x147')][_0x193c00('0x183')](this),this[_0x193c00('0x35')]();},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x287')]=function(){const _0x29702d=_0x44d0c2,_0x44bec3=this[_0x29702d('0x169')](),_0x4a8271=VisuMZ[_0x29702d('0x49')][_0x29702d('0x289')][_0x29702d('0x142')][_0x29702d('0x262')],_0x5c7cad=_0x44bec3===_0x29702d('0x7a')?TextManager[_0x29702d('0x84')]:'\x5cI[%1]%2'[_0x29702d('0x22f')](_0x4a8271,TextManager['buy']),_0x5e85eb=this[_0x29702d('0x39')]();if(this[_0x29702d('0x3c0')]()&&!_0x5e85eb)return;this['addCommand'](_0x5c7cad,_0x29702d('0x84'),_0x5e85eb);},Window_ShopCommand['prototype'][_0x44d0c2('0x39')]=function(){const _0x8d9d79=_0x44d0c2;return SceneManager['_scene'][_0x8d9d79('0x1c0')]===Scene_Shop?SceneManager['_scene'][_0x8d9d79('0x7c')]>0x0:!![];},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x61')]=function(){const _0x8ae8ad=_0x44d0c2,_0x41f2e6=this[_0x8ae8ad('0x169')](),_0x6febca=VisuMZ[_0x8ae8ad('0x49')][_0x8ae8ad('0x289')]['ShopScene']['CmdIconSell'],_0x32bafa=_0x41f2e6===_0x8ae8ad('0x7a')?TextManager[_0x8ae8ad('0x1ee')]:_0x8ae8ad('0x34d')[_0x8ae8ad('0x22f')](_0x6febca,TextManager[_0x8ae8ad('0x1ee')]),_0x2b022c=this['isSellCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x2b022c)return;this[_0x8ae8ad('0x2bd')](_0x32bafa,'sell',_0x2b022c);},Window_ShopCommand['prototype']['isSellCommandEnabled']=function(){const _0x3976c5=_0x44d0c2;return!this[_0x3976c5('0x3dc')];},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x118')]=function(){const _0x258c64=_0x44d0c2,_0x53c5a7=this[_0x258c64('0x169')](),_0x35d13b=VisuMZ[_0x258c64('0x49')][_0x258c64('0x289')]['ShopScene'][_0x258c64('0x280')],_0x30a162=VisuMZ[_0x258c64('0x49')]['Settings']['ShopScene'][_0x258c64('0x5c')],_0x462882=_0x53c5a7===_0x258c64('0x7a')?_0x30a162:_0x258c64('0x34d')[_0x258c64('0x22f')](_0x35d13b,_0x30a162);this['addCommand'](_0x462882,_0x258c64('0x2eb'));},Window_ShopCommand['prototype'][_0x44d0c2('0x1b9')]=function(){const _0x448d0b=_0x44d0c2;return VisuMZ[_0x448d0b('0x49')][_0x448d0b('0x289')][_0x448d0b('0x142')][_0x448d0b('0x391')];},Window_ShopCommand[_0x44d0c2('0x2a1')]['drawItem']=function(_0x382341){const _0x152ff0=_0x44d0c2,_0x7f2105=this[_0x152ff0('0x1f9')](_0x382341);if(_0x7f2105===_0x152ff0('0x164')){if('UTmQc'!==_0x152ff0('0x304'))this[_0x152ff0('0x0')](_0x382341);else{function _0x114d18(){const _0x5b7e46=_0x152ff0;if(this[_0x5b7e46('0x159')]())return;_0x2e732e[_0x5b7e46('0x2a1')][_0x5b7e46('0x403')][_0x5b7e46('0x183')](this);}}}else _0x7f2105==='icon'?this['drawItemStyleIcon'](_0x382341):Window_HorzCommand[_0x152ff0('0x2a1')][_0x152ff0('0x2ec')][_0x152ff0('0x183')](this,_0x382341);},Window_ShopCommand[_0x44d0c2('0x2a1')]['commandStyle']=function(){const _0x582f76=_0x44d0c2;return VisuMZ[_0x582f76('0x49')][_0x582f76('0x289')][_0x582f76('0x142')]['CmdStyle'];},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0x1f9')]=function(_0x3cd5d1){const _0x4732fe=_0x44d0c2;if(_0x3cd5d1<0x0)return'text';const _0x427f0d=this[_0x4732fe('0x169')]();if(_0x427f0d!==_0x4732fe('0xc'))return _0x427f0d;else{if(this[_0x4732fe('0x32d')]()>0x0){const _0x4add48=this[_0x4732fe('0x2cb')](_0x3cd5d1);if(_0x4add48[_0x4732fe('0x2ac')](/\\I\[(\d+)\]/i)){if('JOokL'===_0x4732fe('0x54')){const _0xbabda=this[_0x4732fe('0x36')](_0x3cd5d1),_0x45e9ce=this[_0x4732fe('0x1b8')](_0x4add48)[_0x4732fe('0x110')];if(_0x45e9ce<=_0xbabda[_0x4732fe('0x110')])return _0x4732fe('0x164');else{if('ZRZjx'!==_0x4732fe('0x108'))return _0x4732fe('0x41d');else{function _0x329aac(){const _0x1be82d=_0x4732fe;if(this[_0x1be82d('0x1bd')]())return _0x160170[_0x1be82d('0x324')]('shift');return _0x5acb8f['prototype'][_0x1be82d('0x15e')]['call'](this);}}}}else{function _0x12d189(){const _0x1797ef=_0x4732fe;!this['processCursorSpecialCheckModernControls']()&&_0x49ee80[_0x1797ef('0x2a1')]['processCursorMoveModernControls'][_0x1797ef('0x183')](this);}}}}}return _0x4732fe('0x7a');},Window_ShopCommand['prototype'][_0x44d0c2('0x0')]=function(_0x2127d3){const _0x5bfb48=_0x44d0c2,_0x3c70be=this[_0x5bfb48('0x36')](_0x2127d3),_0x314be2=this[_0x5bfb48('0x2cb')](_0x2127d3),_0x243dbf=this[_0x5bfb48('0x1b8')](_0x314be2)['width'];this['changePaintOpacity'](this[_0x5bfb48('0x3e6')](_0x2127d3));const _0x14730d=this['itemTextAlign']();if(_0x14730d===_0x5bfb48('0x214'))this[_0x5bfb48('0x233')](_0x314be2,_0x3c70be['x']+_0x3c70be[_0x5bfb48('0x110')]-_0x243dbf,_0x3c70be['y'],_0x243dbf);else{if(_0x14730d==='center'){if(_0x5bfb48('0x3fa')!==_0x5bfb48('0x3fa')){function _0x1a3fd9(){const _0x3773dc=_0x5bfb48;return _0x5c1477[_0x3773dc('0x49')][_0x3773dc('0x289')][_0x3773dc('0x19b')][_0x3773dc('0x27')];}}else{const _0x330bd5=_0x3c70be['x']+Math['floor']((_0x3c70be[_0x5bfb48('0x110')]-_0x243dbf)/0x2);this['drawTextEx'](_0x314be2,_0x330bd5,_0x3c70be['y'],_0x243dbf);}}else{if(_0x5bfb48('0xc0')!==_0x5bfb48('0xc0')){function _0x48dcc0(){const _0x3c9253=_0x5bfb48;if(!this[_0x3c9253('0x348')]())return _0x19b6ea;if(this[_0x3c9253('0x404')](_0x57b57c,_0x38afb3,_0x18e03a))_0xc1d72c+=this[_0x3c9253('0x202')]();if(this[_0x3c9253('0x240')](_0x13d315,_0x5b2bc1,_0x1185a7))_0x302de3+=this[_0x3c9253('0x202')]();if(this[_0x3c9253('0x207')](_0x4226f9,_0x501817,_0x5c6489))_0x4e5fd8+=this[_0x3c9253('0x202')]();if(this['drawItemEffectsHpDamage'](_0x21d6e6,_0x3b72a5,_0x258bc4))_0x172cf0+=this[_0x3c9253('0x202')]();if(this[_0x3c9253('0x2e2')](_0x2f4830,_0x2160f0,_0x53595b))_0x179479+=this['lineHeight']();if(this[_0x3c9253('0x9e')](_0x5cf83f,_0x5642b7,_0x4b1637))_0x1fa8e2+=this[_0x3c9253('0x202')]();if(this['drawItemEffectsSelfTpGain'](_0x13c908,_0xf16a1c,_0x5927e2))_0x42e1d7+=this[_0x3c9253('0x202')]();if(this[_0x3c9253('0x3df')](_0x3c5d2f,_0x54e4ea,_0x1b9084))_0x2e237f+=this['lineHeight']();if(this[_0x3c9253('0x2da')](_0x2ec5e9,_0x1484d0,_0x38f938))_0x4f7037+=this[_0x3c9253('0x202')]();return this[_0x3c9253('0x13')](),_0x2619bf;}}else this[_0x5bfb48('0x233')](_0x314be2,_0x3c70be['x'],_0x3c70be['y'],_0x243dbf);}}},Window_ShopCommand[_0x44d0c2('0x2a1')][_0x44d0c2('0xe')]=function(_0x5abbf1){const _0x3ee36b=_0x44d0c2;this[_0x3ee36b('0x2cb')](_0x5abbf1)['match'](/\\I\[(\d+)\]/i);const _0x450ce2=Number(RegExp['$1'])||0x0,_0x1a6adf=this[_0x3ee36b('0x36')](_0x5abbf1),_0x5eeff0=_0x1a6adf['x']+Math['floor']((_0x1a6adf[_0x3ee36b('0x110')]-ImageManager[_0x3ee36b('0x40')])/0x2),_0x4e0fc8=_0x1a6adf['y']+(_0x1a6adf[_0x3ee36b('0x2fe')]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x450ce2,_0x5eeff0,_0x4e0fc8);},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x1ec')]=Window_ShopBuy[_0x44d0c2('0x2a1')]['refresh'],Window_ShopBuy['prototype'][_0x44d0c2('0x147')]=function(){const _0x303e8b=_0x44d0c2;this[_0x303e8b('0x196')](),VisuMZ[_0x303e8b('0x49')][_0x303e8b('0x1ec')][_0x303e8b('0x183')](this);},Window_ShopBuy[_0x44d0c2('0x2a1')][_0x44d0c2('0x196')]=function(){const _0x3819aa=_0x44d0c2;SceneManager[_0x3819aa('0x3e9')][_0x3819aa('0x1c0')]===Scene_Shop&&(this['_money']=SceneManager[_0x3819aa('0x3e9')][_0x3819aa('0x30a')]());},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x82')]=Window_ShopBuy[_0x44d0c2('0x2a1')][_0x44d0c2('0x3c1')],Window_ShopBuy[_0x44d0c2('0x2a1')][_0x44d0c2('0x3c1')]=function(_0x33abb7){const _0x60d220=_0x44d0c2;if(!_0x33abb7)return 0x0;const _0x463cef=VisuMZ[_0x60d220('0x49')][_0x60d220('0x82')][_0x60d220('0x183')](this,_0x33abb7);return this[_0x60d220('0x1ab')](_0x33abb7,_0x463cef);},Window_ShopBuy[_0x44d0c2('0x2a1')][_0x44d0c2('0x1ab')]=function(_0x2ced23,_0x2e74dc){const _0x5c0f7a=_0x44d0c2,_0x78991a=_0x2ced23[_0x5c0f7a('0x9d')];if(_0x78991a[_0x5c0f7a('0x2ac')](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x583ad6=String(RegExp['$1']);try{eval(_0x583ad6);}catch(_0x3e1ec8){if($gameTemp[_0x5c0f7a('0x2dd')]())console[_0x5c0f7a('0x2cd')](_0x3e1ec8);}}_0x2e74dc=VisuMZ[_0x5c0f7a('0x49')]['Settings'][_0x5c0f7a('0x142')][_0x5c0f7a('0xfd')][_0x5c0f7a('0x183')](this,_0x2ced23,_0x2e74dc);if(isNaN(_0x2e74dc))_0x2e74dc=0x0;return Math[_0x5c0f7a('0xca')](_0x2e74dc);},Window_ShopBuy[_0x44d0c2('0x2a1')]['drawItem']=function(_0x3cdfca){const _0x226d21=_0x44d0c2;this[_0x226d21('0x13')]();const _0xd81239=this[_0x226d21('0xb5')](_0x3cdfca),_0x269c43=this[_0x226d21('0x36')](_0x3cdfca),_0x5f3bad=_0x269c43[_0x226d21('0x110')];this['changePaintOpacity'](this['isEnabled'](_0xd81239)),this[_0x226d21('0x38f')](_0xd81239,_0x269c43['x'],_0x269c43['y'],_0x5f3bad),this[_0x226d21('0x60')](_0xd81239,_0x269c43),this[_0x226d21('0x117')](!![]);},Window_ShopBuy['prototype'][_0x44d0c2('0x60')]=function(_0x1443cb,_0x5adf92){const _0x59a9b4=_0x44d0c2,_0x403982=this[_0x59a9b4('0x3c1')](_0x1443cb);this[_0x59a9b4('0x388')](_0x403982,TextManager['currencyUnit'],_0x5adf92['x'],_0x5adf92['y'],_0x5adf92[_0x59a9b4('0x110')]);},Window_ShopSell[_0x44d0c2('0x2a1')]['maxCols']=function(){const _0x2bcaf5=_0x44d0c2;return SceneManager[_0x2bcaf5('0x3e9')][_0x2bcaf5('0x1d')]()?0x1:0x2;},VisuMZ[_0x44d0c2('0x49')][_0x44d0c2('0x18a')]=Window_ShopSell[_0x44d0c2('0x2a1')][_0x44d0c2('0x24')],Window_ShopSell[_0x44d0c2('0x2a1')][_0x44d0c2('0x24')]=function(_0x66bad2){const _0x3a34fc=_0x44d0c2;if(!_0x66bad2)return![];const _0x3c14bd=_0x66bad2['note'];if(_0x3c14bd[_0x3a34fc('0x2ac')](/<CANNOT SELL>/i))return![];if(_0x3c14bd['match'](/<CAN SELL>/i))return!![];if(_0x3c14bd[_0x3a34fc('0x2ac')](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3a34fc('0x317')===_0x3a34fc('0x421')){function _0x2a3b31(){_0x5004cd=_0x7b516e;if(!_0x973eb1[_0x39c071])return _0x26fa4d;}}else{const _0x569a22=JSON[_0x3a34fc('0x286')]('['+RegExp['$1'][_0x3a34fc('0x2ac')](/\d+/g)+']');for(const _0x2f3f42 of _0x569a22){if(!$gameSwitches[_0x3a34fc('0x2d8')](_0x2f3f42))return![];}}}if(_0x3c14bd[_0x3a34fc('0x2ac')](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x50a04e=JSON[_0x3a34fc('0x286')]('['+RegExp['$1'][_0x3a34fc('0x2ac')](/\d+/g)+']');for(const _0x46e6e0 of _0x50a04e){if(!$gameSwitches['value'](_0x46e6e0))return![];}}if(_0x3c14bd[_0x3a34fc('0x2ac')](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3a34fc('0x104')!==_0x3a34fc('0x104')){function _0x49d61b(){const _0x1c1e40=_0x3a34fc;this[_0x1c1e40('0x1db')](_0x10666a,_0x3f6316,_0x1177fa,_0xa1df2,!![]),this['drawItemKeyData'](_0xbc2760,_0x366c5f,_0x49d0ac,_0x37d91f,![],_0x1c1e40('0x214')),this[_0x1c1e40('0xcf')](_0x2faad7,_0x3cf981,_0x37662c),this['resetFontSettings']();}}else{const _0x43d529=JSON['parse']('['+RegExp['$1'][_0x3a34fc('0x2ac')](/\d+/g)+']');for(const _0x245cc0 of _0x43d529){if($gameSwitches[_0x3a34fc('0x2d8')](_0x245cc0))return![];}}}return VisuMZ['ItemsEquipsCore'][_0x3a34fc('0x18a')][_0x3a34fc('0x183')](this,_0x66bad2);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x201')]=function(){return![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x1c6')]=function(){const _0x238cb3=_0x44d0c2;Window_StatusBase[_0x238cb3('0x2a1')][_0x238cb3('0x1c6')]['call'](this);for(const _0x1596e2 of $gameParty[_0x238cb3('0x355')]()){ImageManager[_0x238cb3('0x312')](_0x1596e2[_0x238cb3('0x27b')]());}},Window_ShopStatus[_0x44d0c2('0x2a1')]['translucentOpacity']=function(){const _0x3ea92b=_0x44d0c2;return VisuMZ[_0x3ea92b('0x49')]['Settings']['StatusWindow'][_0x3ea92b('0x23a')];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x147')]=function(){const _0x4847d1=_0x44d0c2;this[_0x4847d1('0xc9')][_0x4847d1('0x22d')](),this['contentsBack'][_0x4847d1('0x22d')]();if(this[_0x4847d1('0x170')]){this[_0x4847d1('0x13')](),this[_0x4847d1('0x117')](!![]),this[_0x4847d1('0x71')]();if(this[_0x4847d1('0x14f')]())this[_0x4847d1('0xb2')]();else{if(_0x4847d1('0x195')==='BgxMw')this['drawItemData']();else{function _0x3bb944(){const _0x4dcef6=_0x4847d1,_0x1c1d8f=_0xf0006b[_0x4dcef6('0x95')](0x1);this[_0x4dcef6('0x3d6')]=_0x356338[_0x4dcef6('0x408')](_0x1c1d8f),this['_tempActorB']=_0x513730[_0x4dcef6('0x408')](_0x1c1d8f);}}}}},Window_ShopStatus['prototype'][_0x44d0c2('0x3de')]=function(_0x12a1b8,_0x5db56c){const _0x221a3c=_0x44d0c2;if(!this[_0x221a3c('0x14f')]()&&!DataManager['isItem'](this['_item']))return;const _0x3c7ae1=this[_0x221a3c('0x93')]-this['itemPadding']()-_0x12a1b8,_0x14d62a=this[_0x221a3c('0x50')](_0x221a3c('0x32c'));this[_0x221a3c('0x1a8')](ColorManager[_0x221a3c('0xdb')]()),this['drawText'](TextManager[_0x221a3c('0xba')],_0x12a1b8+this[_0x221a3c('0x5e')](),_0x5db56c,_0x3c7ae1-_0x14d62a),this['resetTextColor'](),this['drawItemNumber'](this['_item'],_0x12a1b8,_0x5db56c,_0x3c7ae1);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0xcf')]=function(_0x4a6650,_0x3d6d4f,_0x3d0487,_0x162fab,_0x443c13){const _0xd526b1=_0x44d0c2;if(VisuMZ['ItemsEquipsCore'][_0xd526b1('0x289')][_0xd526b1('0x19b')][_0xd526b1('0x357')]===![])return;_0x443c13=Math[_0xd526b1('0x29')](_0x443c13||0x1,0x1);while(_0x443c13--){_0x162fab=_0x162fab||this[_0xd526b1('0x202')](),this[_0xd526b1('0x10')][_0xd526b1('0x1d1')]=0xa0;const _0xe45791=ColorManager[_0xd526b1('0x3b8')]();this[_0xd526b1('0x10')]['fillRect'](_0x4a6650+0x1,_0x3d6d4f+0x1,_0x3d0487-0x2,_0x162fab-0x2,_0xe45791),this[_0xd526b1('0x10')][_0xd526b1('0x1d1')]=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x1267cd=_0x44d0c2,_0x550c4e=VisuMZ['ItemsEquipsCore'][_0x1267cd('0x289')][_0x1267cd('0x19b')];let _0x305a82=_0x550c4e[_0x1267cd('0x2f')]!==undefined?_0x550c4e[_0x1267cd('0x2f')]:0x13;return ColorManager['getColor'](_0x305a82);},Window_ShopStatus['prototype'][_0x44d0c2('0xb2')]=function(){const _0x5d2b24=_0x44d0c2;VisuMZ[_0x5d2b24('0x49')]['Settings']['StatusWindow'][_0x5d2b24('0x366')][_0x5d2b24('0x183')](this);},Window_ShopStatus[_0x44d0c2('0x2a1')]['drawItemEquipType']=function(_0x2fca3d,_0x113171,_0x208ca1){const _0x4d5330=_0x44d0c2;if(!this[_0x4d5330('0x14f')]())return![];const _0x3d6caa=$dataSystem[_0x4d5330('0x41b')][this[_0x4d5330('0x170')][_0x4d5330('0x137')]];return this[_0x4d5330('0x1db')](_0x3d6caa,_0x2fca3d,_0x113171,_0x208ca1,!![]),this['drawItemDarkRect'](_0x2fca3d,_0x113171,_0x208ca1),this[_0x4d5330('0x13')](),!![];},Window_ShopStatus['prototype']['getItemQuantityText']=function(){const _0x27893=_0x44d0c2,_0x2e5164=VisuMZ[_0x27893('0x49')][_0x27893('0x289')][_0x27893('0x3f7')][_0x27893('0x3ba')];return _0x2e5164[_0x27893('0x22f')]($gameParty[_0x27893('0x1f0')](this[_0x27893('0x170')]));},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x1be')]=function(){const _0x492041=_0x44d0c2;return Imported[_0x492041('0x26a')]?VisuMZ[_0x492041('0x3c8')][_0x492041('0x289')][_0x492041('0x263')][_0x492041('0xbb')]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x13d')]=function(){const _0x23a3ac=_0x44d0c2;return VisuMZ[_0x23a3ac('0x49')][_0x23a3ac('0x289')][_0x23a3ac('0x19b')][_0x23a3ac('0x27')];},Window_ShopStatus['prototype'][_0x44d0c2('0x23b')]=function(_0x5c86c2,_0x128f13,_0x4fe4c7,_0x292f80){const _0x1e8e79=_0x44d0c2;this['resetFontSettings'](),this[_0x1e8e79('0xc9')][_0x1e8e79('0x5f')]=this['smallParamFontSize']();let _0x273c7d=this[_0x1e8e79('0x50')](TextManager[_0x1e8e79('0xbe')](_0x5c86c2))+0x4+_0x128f13;if(Imported['VisuMZ_0_CoreEngine'])this['drawParamText'](_0x128f13,_0x4fe4c7,_0x292f80,_0x5c86c2,!![]),VisuMZ['CoreEngine'][_0x1e8e79('0x289')][_0x1e8e79('0x263')][_0x1e8e79('0x405')]&&(_0x273c7d+=ImageManager['iconWidth']+0x4);else{if(_0x1e8e79('0x31a')!==_0x1e8e79('0x31a')){function _0x4ae38c(){const _0x4434cb=_0x1e8e79;return _0x4434cb('0x41d');}}else this[_0x1e8e79('0x1a8')](ColorManager[_0x1e8e79('0xdb')]()),this[_0x1e8e79('0x15f')](TextManager[_0x1e8e79('0xbe')](_0x5c86c2),_0x128f13,_0x4fe4c7,_0x292f80);}return this[_0x1e8e79('0x13')](),_0x273c7d;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x200')]=function(_0x282c2e,_0x4dce09,_0x27802f,_0x261a92,_0x3b559d){const _0x370412=_0x44d0c2;_0x27802f+=this[_0x370412('0x5e')](),_0x3b559d-=this[_0x370412('0x5e')]()*0x2;const _0x47b08a=VisuMZ['ItemsEquipsCore'][_0x370412('0x289')][_0x370412('0x19b')];this['contents'][_0x370412('0x5f')]=_0x47b08a[_0x370412('0x27')],this['changePaintOpacity'](_0x282c2e[_0x370412('0x9f')](this[_0x370412('0x170')]));if(_0x282c2e['isEquipped'](this[_0x370412('0x170')])){if(_0x370412('0x2ee')!==_0x370412('0x2ee')){function _0x5a54ec(){const _0x3e1c67=_0x370412;return _0x58ad6e['ItemsEquipsCore']['Settings'][_0x3e1c67('0x3d8')][_0x3e1c67('0x345')];}}else{const _0x472aa6=_0x47b08a['AlreadyEquipMarker'];this[_0x370412('0x15f')](_0x472aa6,_0x27802f,_0x261a92,_0x3b559d,'center');}}else{if(_0x282c2e['canEquip'](this['_item'])){const _0xf3ffab=this[_0x370412('0x35f')](_0x282c2e,this[_0x370412('0x170')]['etypeId']),_0x479054=JsonEx['makeDeepCopy'](_0x282c2e);_0x479054[_0x370412('0x2f2')]=!![];const _0x6ebcfe=_0x479054[_0x370412('0x230')]()['indexOf'](this['_item'][_0x370412('0x137')]);if(_0x6ebcfe>=0x0)_0x479054[_0x370412('0x1f6')](_0x6ebcfe,this['_item']);let _0x4b1b76=0x0,_0x1b7db5=0x0,_0xd993c1=0x0;if(Imported[_0x370412('0x26a')]){if(_0x370412('0xcb')===_0x370412('0x39d')){function _0x149514(){const _0x1c0d78=_0x370412;return _0x1c0d78('0x3a9');}}else _0x4b1b76=_0x479054[_0x370412('0x371')](_0x4dce09),_0x1b7db5=_0x4b1b76-_0x282c2e['paramValueByName'](_0x4dce09),this[_0x370412('0x1a8')](ColorManager[_0x370412('0x29c')](_0x1b7db5)),_0xd993c1=(_0x1b7db5>=0x0?'+':'')+VisuMZ[_0x370412('0x2a6')](_0x1b7db5,0x0);}else{if(_0x370412('0x1d6')!==_0x370412('0x1d6')){function _0x3b1242(){const _0x2836df=_0x370412,_0x10ced4=this[_0x2836df('0x1f9')](_0x49cf1c);if(_0x10ced4==='iconText')this[_0x2836df('0x0')](_0x21310c);else _0x10ced4===_0x2836df('0x41d')?this[_0x2836df('0xe')](_0x2ff0b6):_0xdf9c00[_0x2836df('0x2a1')][_0x2836df('0x2ec')][_0x2836df('0x183')](this,_0x406422);}}else _0x4b1b76=_0x479054[_0x370412('0xbe')](_0x4dce09),_0x1b7db5=_0x4b1b76-_0x282c2e[_0x370412('0xbe')](_0x4dce09),this[_0x370412('0x1a8')](ColorManager[_0x370412('0x29c')](_0x1b7db5)),_0xd993c1=(_0x1b7db5>=0x0?'+':'')+_0x1b7db5;}if(_0xd993c1==='+0')_0xd993c1=_0x47b08a[_0x370412('0x325')];this[_0x370412('0x15f')](_0xd993c1,_0x27802f,_0x261a92,_0x3b559d,_0x370412('0x305'));}else{const _0x4d951a=_0x47b08a[_0x370412('0xb0')];this[_0x370412('0x15f')](_0x4d951a,_0x27802f,_0x261a92,_0x3b559d,_0x370412('0x305'));}}this[_0x370412('0x13')](),this[_0x370412('0x117')](!![]);},Window_ShopStatus[_0x44d0c2('0x2a1')]['drawItemData']=function(){const _0x9446a0=_0x44d0c2;VisuMZ[_0x9446a0('0x49')][_0x9446a0('0x289')][_0x9446a0('0x19b')][_0x9446a0('0xfb')][_0x9446a0('0x183')](this);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x71')]=function(){const _0x25fc7b=_0x44d0c2;this['_customItemInfo']={};if(!this['_item'])return;const _0x1cd30b=this['_item'][_0x25fc7b('0x9d')];if(_0x1cd30b['match'](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x212627=String(RegExp['$1'])[_0x25fc7b('0x102')](/[\r\n]+/);for(const _0x1fbeb2 of _0x212627){if('QhUde'!==_0x25fc7b('0x12f')){if(_0x1fbeb2[_0x25fc7b('0x2ac')](/(.*):[ ](.*)/i)){const _0x43d461=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x36b008=String(RegExp['$2'])[_0x25fc7b('0x307')]();this['_customItemInfo'][_0x43d461]=_0x36b008;}}else{function _0x1851d2(){return this['_data']['length']>0x0?![]:!![];}}}}},Window_ShopStatus['prototype']['itemDataFontSize']=function(){const _0x56dad4=_0x44d0c2;return Math[_0x56dad4('0x29')](0x1,$gameSystem[_0x56dad4('0x89')]()-0x4);},Window_ShopStatus[_0x44d0c2('0x2a1')]['resetFontSettings']=function(){const _0x40cd1e=_0x44d0c2;Window_StatusBase[_0x40cd1e('0x2a1')][_0x40cd1e('0x13')][_0x40cd1e('0x183')](this),this['contents'][_0x40cd1e('0x5f')]=this['_resetFontSize']||this['contents'][_0x40cd1e('0x5f')],this[_0x40cd1e('0xc9')][_0x40cd1e('0xac')]=this[_0x40cd1e('0x57')]||this[_0x40cd1e('0xc9')][_0x40cd1e('0xac')];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x79')]=function(){const _0x162e7d=_0x44d0c2;return this[_0x162e7d('0xc9')][_0x162e7d('0x5f')]/$gameSystem[_0x162e7d('0x89')]();},Window_ShopStatus['prototype'][_0x44d0c2('0xf0')]=function(_0x4afcd6,_0x3fd342,_0x280e8e){const _0x204f2d=_0x44d0c2,_0x5f0a93=ImageManager[_0x204f2d('0x2d7')](_0x204f2d('0xbf')),_0x1fd144=ImageManager[_0x204f2d('0x40')],_0x233768=ImageManager['iconHeight'],_0x50cb0b=_0x4afcd6%0x10*_0x1fd144,_0x5a232a=Math[_0x204f2d('0xca')](_0x4afcd6/0x10)*_0x233768,_0x5b8937=Math['ceil'](_0x1fd144*this[_0x204f2d('0x79')]()),_0x34a163=Math[_0x204f2d('0x3f')](_0x233768*this[_0x204f2d('0x79')]());this[_0x204f2d('0xc9')]['blt'](_0x5f0a93,_0x50cb0b,_0x5a232a,_0x1fd144,_0x233768,_0x3fd342,_0x280e8e,_0x5b8937,_0x34a163);},Window_ShopStatus['prototype']['processDrawIcon']=function(_0x5087b1,_0x597e7c){const _0x9d3a17=_0x44d0c2;_0x597e7c[_0x9d3a17('0x3e8')]&&this[_0x9d3a17('0xf0')](_0x5087b1,_0x597e7c['x'],_0x597e7c['y']+0x2);_0x597e7c['x']+=Math['ceil'](ImageManager[_0x9d3a17('0x40')]*this[_0x9d3a17('0x79')]());if(this[_0x9d3a17('0x79')]()===0x1)_0x597e7c['x']+=0x4;},Window_ShopStatus[_0x44d0c2('0x2a1')]['drawItemKeyData']=function(_0x2ccd76,_0x145bd8,_0x1db370,_0x481a76,_0x2dc0bd,_0x38c4b5){const _0x2a881a=_0x44d0c2;_0x2ccd76=_0x2ccd76||'',_0x38c4b5=_0x38c4b5||_0x2a881a('0x73'),this['_resetFontSize']=this[_0x2a881a('0xb6')](),this[_0x2a881a('0x57')]=_0x2dc0bd?ColorManager[_0x2a881a('0xdb')]():this[_0x2a881a('0xc9')]['textColor'],_0x145bd8+=this['itemPadding'](),_0x481a76-=this['itemPadding']()*0x2;const _0x1eadcc=this[_0x2a881a('0x1b8')](_0x2ccd76);if(_0x38c4b5===_0x2a881a('0x305'))_0x145bd8=_0x145bd8+Math[_0x2a881a('0xca')]((_0x481a76-_0x1eadcc[_0x2a881a('0x110')])/0x2);else _0x38c4b5===_0x2a881a('0x214')&&(_0x145bd8=_0x145bd8+_0x481a76-_0x1eadcc[_0x2a881a('0x110')]);_0x1db370+=(this[_0x2a881a('0x202')]()-_0x1eadcc[_0x2a881a('0x2fe')])/0x2,this[_0x2a881a('0x233')](_0x2ccd76,_0x145bd8,_0x1db370,_0x481a76),this[_0x2a881a('0x215')]=undefined,this[_0x2a881a('0x57')]=undefined,this['resetFontSettings']();},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0xa4')]=function(_0x2dec3b,_0x13c37b,_0x1f4c4e){const _0x13ed90=_0x44d0c2;if(!DataManager[_0x13ed90('0x3da')](this[_0x13ed90('0x170')]))return![];const _0x35a3ae=this[_0x13ed90('0x415')]();this[_0x13ed90('0x1db')](_0x35a3ae,_0x2dec3b,_0x13c37b,_0x1f4c4e,!![]);const _0x170cd4=this[_0x13ed90('0x2fd')]();return this[_0x13ed90('0x1db')](_0x170cd4,_0x2dec3b,_0x13c37b,_0x1f4c4e,![],_0x13ed90('0x214')),this[_0x13ed90('0xcf')](_0x2dec3b,_0x13c37b,_0x1f4c4e),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x44d0c2('0x415')]=function(){const _0x540ed8=_0x44d0c2;return VisuMZ[_0x540ed8('0x49')][_0x540ed8('0x289')][_0x540ed8('0x19b')][_0x540ed8('0x37f')];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x2fd')]=function(){const _0x1d8e8c=_0x44d0c2,_0x4685e6=_0x1d8e8c('0x369');if(this[_0x1d8e8c('0x308')][_0x4685e6])return this[_0x1d8e8c('0x308')][_0x4685e6];if(this[_0x1d8e8c('0x292')]()){if(_0x1d8e8c('0x3c5')===_0x1d8e8c('0x3bf')){function _0x2f8ce2(){const _0x315419=_0x1d8e8c;return _0xefa049[_0x315419('0x49')][_0x315419('0x289')][_0x315419('0x142')][_0x315419('0x391')];}}else return VisuMZ['ItemsEquipsCore'][_0x1d8e8c('0x289')][_0x1d8e8c('0x19b')][_0x1d8e8c('0x409')];}else return VisuMZ[_0x1d8e8c('0x49')][_0x1d8e8c('0x289')][_0x1d8e8c('0x19b')]['NotConsumable'];},Window_ShopStatus[_0x44d0c2('0x2a1')]['canConsumeItem']=function(){const _0x3667fe=_0x44d0c2;return VisuMZ['CoreEngine']&&VisuMZ['CoreEngine'][_0x3667fe('0x289')]['QoL']['KeyItemProtect']&&DataManager[_0x3667fe('0x29b')](this[_0x3667fe('0x170')])?![]:this['_item'][_0x3667fe('0x30e')];},Window_ShopStatus['prototype'][_0x44d0c2('0x378')]=function(_0x406c48,_0x35ace9,_0x2fe0f2){const _0x1938be=_0x44d0c2;if(!this[_0x1938be('0x14f')]()&&!DataManager[_0x1938be('0x3da')](this[_0x1938be('0x170')]))return![];if(DataManager[_0x1938be('0x29b')](this['_item'])&&!$dataSystem['optKeyItemsNumber']){const _0x1e5a1b=TextManager['keyItem'];this[_0x1938be('0x1db')](_0x1e5a1b,_0x406c48,_0x35ace9,_0x2fe0f2,!![],_0x1938be('0x305'));}else{if(_0x1938be('0x3e2')===_0x1938be('0x3b7')){function _0x288c5c(){const _0x525995=_0x1938be;return _0x40e376[_0x525995('0x49')][_0x525995('0x289')]['StatusWindow'][_0x525995('0x221')];}}else{const _0x223dc3=TextManager['possession'];this[_0x1938be('0x1db')](_0x223dc3,_0x406c48,_0x35ace9,_0x2fe0f2,!![]);const _0x22069c=this[_0x1938be('0x2cf')]();this[_0x1938be('0x1db')](_0x22069c,_0x406c48,_0x35ace9,_0x2fe0f2,![],_0x1938be('0x214'));}}return this[_0x1938be('0xcf')](_0x406c48,_0x35ace9,_0x2fe0f2),this[_0x1938be('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x2cf')]=function(){const _0x285044=_0x44d0c2,_0x5c5854=_0x285044('0x138');if(this[_0x285044('0x308')][_0x5c5854])return this[_0x285044('0x308')][_0x5c5854];const _0x3d80fa=VisuMZ[_0x285044('0x49')]['Settings'][_0x285044('0x3f7')][_0x285044('0x3ba')];return _0x3d80fa[_0x285044('0x22f')]($gameParty[_0x285044('0x1f0')](this[_0x285044('0x170')]));},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x3be')]=function(_0x4f29b3,_0x5ea621,_0x597617){const _0x2f3981=_0x44d0c2,_0x20ded7=this[_0x2f3981('0x395')]();return this['drawItemKeyData'](_0x20ded7,_0x4f29b3,_0x5ea621,_0x597617,![],'center'),this[_0x2f3981('0xcf')](_0x4f29b3,_0x5ea621,_0x597617),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x395')]=function(){const _0x703884=_0x44d0c2,_0x1e970a='OCCASION';if(this['_customItemInfo'][_0x1e970a])return this[_0x703884('0x308')][_0x1e970a];const _0x337c04=VisuMZ[_0x703884('0x49')]['Settings']['StatusWindow'],_0x2730c8=_0x703884('0x2ba')['format'](this[_0x703884('0x170')][_0x703884('0x1fa')]);return _0x337c04[_0x2730c8];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x3bc')]=function(_0x1769f2,_0x3688f6,_0x2f61e8){const _0xb7745a=_0x44d0c2,_0x3ddfcf=this['getItemScopeText']();return this[_0xb7745a('0x1db')](_0x3ddfcf,_0x1769f2,_0x3688f6,_0x2f61e8,![],_0xb7745a('0x305')),this[_0xb7745a('0xcf')](_0x1769f2,_0x3688f6,_0x2f61e8),this[_0xb7745a('0x13')](),!![];},Window_ShopStatus['prototype'][_0x44d0c2('0x27f')]=function(){const _0x19a2c0=_0x44d0c2,_0x7f4dce='SCOPE';if(this[_0x19a2c0('0x308')][_0x7f4dce])return this['_customItemInfo'][_0x7f4dce];const _0x2738a6=VisuMZ[_0x19a2c0('0x49')]['Settings']['StatusWindow'];if(Imported[_0x19a2c0('0x390')]){const _0x1786ef=this[_0x19a2c0('0x170')][_0x19a2c0('0x9d')];if(_0x1786ef['match'](/<TARGET:[ ](.*)>/i)){const _0xefe3d1=String(RegExp['$1']);if(_0xefe3d1[_0x19a2c0('0x2ac')](/(\d+) RANDOM ANY/i))return _0x2738a6['ScopeRandomAny'][_0x19a2c0('0x22f')](Number(RegExp['$1']));else{if(_0xefe3d1['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x2738a6[_0x19a2c0('0x168')][_0x19a2c0('0x22f')](Number(RegExp['$1']));else{if(_0xefe3d1['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if(_0x19a2c0('0x166')!==_0x19a2c0('0x166')){function _0x32fb5c(){const _0x506bd4=_0x19a2c0;_0x4269e6=_0x5079df[_0x506bd4('0x49')][_0x506bd4('0x289')][_0x506bd4('0x3b0')][_0x4099c];}}else return _0x2738a6[_0x19a2c0('0x2fb')][_0x19a2c0('0x22f')](Number(RegExp['$1']));}else{if(_0xefe3d1[_0x19a2c0('0x2ac')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if('dwIJk'==='dwIJk')return _0x2738a6[_0x19a2c0('0x103')];else{function _0x561d6b(){const _0x3c65e4=_0x19a2c0;return _0x66222c[_0x3c65e4('0x12e')](_0x4a3035);}}}}}}}}const _0x122fed='Scope%1'[_0x19a2c0('0x22f')](this['_item'][_0x19a2c0('0x349')]);return _0x2738a6[_0x122fed];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x2ad')]=function(_0x304abd,_0x20243d,_0x357869){const _0x103bd4=_0x44d0c2,_0x884b=this[_0x103bd4('0x11a')]();this[_0x103bd4('0x1db')](_0x884b,_0x304abd,_0x20243d,_0x357869,!![]);const _0x5f4c98=this['getItemSpeedText']();return this[_0x103bd4('0x1db')](_0x5f4c98,_0x304abd,_0x20243d,_0x357869,![],_0x103bd4('0x214')),this[_0x103bd4('0xcf')](_0x304abd,_0x20243d,_0x357869),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x11a')]=function(){const _0x5e106b=_0x44d0c2;return VisuMZ[_0x5e106b('0x49')][_0x5e106b('0x289')][_0x5e106b('0x19b')][_0x5e106b('0x238')];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x31e')]=function(){const _0x5a101b=_0x44d0c2,_0x2d193f=_0x5a101b('0xc2');if(this[_0x5a101b('0x308')][_0x2d193f])return this[_0x5a101b('0x308')][_0x2d193f];const _0x1758a1=this[_0x5a101b('0x170')][_0x5a101b('0xa5')];if(_0x1758a1>=0x7d0){if(_0x5a101b('0x267')!==_0x5a101b('0x267')){function _0x2523f9(){const _0x39311d=_0x5a101b;if(!this[_0x39311d('0x322')][_0x4d02cf])this[_0x39311d('0x322')][_0x2c1a83]=new _0x552a73();}}else return VisuMZ[_0x5a101b('0x49')][_0x5a101b('0x289')][_0x5a101b('0x19b')][_0x5a101b('0x3c')];}else{if(_0x1758a1>=0x3e8)return VisuMZ[_0x5a101b('0x49')]['Settings']['StatusWindow']['Speed1000'];else{if(_0x1758a1>0x0)return VisuMZ[_0x5a101b('0x49')][_0x5a101b('0x289')]['StatusWindow'][_0x5a101b('0x2c5')];else{if(_0x1758a1===0x0)return VisuMZ[_0x5a101b('0x49')][_0x5a101b('0x289')][_0x5a101b('0x19b')][_0x5a101b('0x27e')];else{if(_0x1758a1>-0x3e8){if(_0x5a101b('0x417')==='dvcMq')return VisuMZ[_0x5a101b('0x49')][_0x5a101b('0x289')][_0x5a101b('0x19b')][_0x5a101b('0x3fc')];else{function _0x58d1d4(){const _0x3b75cb=_0x5a101b;this[_0x3b75cb('0x150')]();}}}else{if(_0x1758a1>-0x7d0)return VisuMZ[_0x5a101b('0x49')][_0x5a101b('0x289')][_0x5a101b('0x19b')][_0x5a101b('0xd9')];else return _0x1758a1<=-0x7d0?VisuMZ[_0x5a101b('0x49')][_0x5a101b('0x289')][_0x5a101b('0x19b')][_0x5a101b('0xb3')]:_0x5a101b('0x3b5');}}}}}},Window_ShopStatus[_0x44d0c2('0x2a1')]['drawItemSuccessRate']=function(_0x570b3a,_0x3f1ff0,_0x404ab0){const _0x4c47f0=_0x44d0c2,_0x4a5533=this[_0x4c47f0('0x7e')]();this[_0x4c47f0('0x1db')](_0x4a5533,_0x570b3a,_0x3f1ff0,_0x404ab0,!![]);const _0x4d4363=this['getItemSuccessRateText']();return this[_0x4c47f0('0x1db')](_0x4d4363,_0x570b3a,_0x3f1ff0,_0x404ab0,![],_0x4c47f0('0x214')),this[_0x4c47f0('0xcf')](_0x570b3a,_0x3f1ff0,_0x404ab0),this[_0x4c47f0('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x7e')]=function(){const _0x4202f4=_0x44d0c2;return VisuMZ[_0x4202f4('0x49')]['Settings'][_0x4202f4('0x19b')][_0x4202f4('0x244')];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x418')]=function(){const _0x1a9c96=_0x44d0c2,_0x311118=_0x1a9c96('0x316');if(this[_0x1a9c96('0x308')][_0x311118])return this['_customItemInfo'][_0x311118];if(Imported[_0x1a9c96('0x390')]){const _0x340248=this[_0x1a9c96('0x170')][_0x1a9c96('0x9d')];if(_0x340248[_0x1a9c96('0x2ac')](/<ALWAYS HIT>/i))return _0x1a9c96('0x3a9');else{if(_0x340248['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x1a9c96('0xea')!==_0x1a9c96('0xa9'))return _0x1a9c96('0x298')[_0x1a9c96('0x22f')](Number(RegExp['$1']));else{function _0x46bbe4(){const _0x566c44=_0x1a9c96;this[_0x566c44('0xc9')][_0x566c44('0x22d')](),this[_0x566c44('0x10')][_0x566c44('0x22d')](),this[_0x566c44('0x170')]&&(this[_0x566c44('0x13')](),this[_0x566c44('0x117')](!![]),this[_0x566c44('0x71')](),this[_0x566c44('0x14f')]()?this[_0x566c44('0xb2')]():this['drawItemData']());}}}}}return _0x1a9c96('0x298')[_0x1a9c96('0x22f')](this['_item'][_0x1a9c96('0x176')]);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x335')]=function(_0x1b23d5,_0x1bdda4,_0x2f8c0d){const _0x410b0d=_0x44d0c2,_0x3d6658=this[_0x410b0d('0x300')]();this[_0x410b0d('0x1db')](_0x3d6658,_0x1b23d5,_0x1bdda4,_0x2f8c0d,!![]);const _0x3eef72=this[_0x410b0d('0x172')]();return this[_0x410b0d('0x1db')](_0x3eef72,_0x1b23d5,_0x1bdda4,_0x2f8c0d,![],_0x410b0d('0x214')),this[_0x410b0d('0xcf')](_0x1b23d5,_0x1bdda4,_0x2f8c0d),this[_0x410b0d('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x300')]=function(){const _0x28cb48=_0x44d0c2;return VisuMZ[_0x28cb48('0x49')][_0x28cb48('0x289')][_0x28cb48('0x19b')][_0x28cb48('0x39e')];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x172')]=function(){const _0x328d1a=_0x44d0c2,_0x1555a2=_0x328d1a('0x3ef');if(this[_0x328d1a('0x308')][_0x1555a2])return this['_customItemInfo'][_0x1555a2];const _0x44e4a1='×%1';return _0x44e4a1['format'](this[_0x328d1a('0x170')][_0x328d1a('0x24c')]);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x222')]=function(_0x4edc14,_0x11850f,_0x18ae3e){const _0x10f8cb=_0x44d0c2,_0xf32752=this[_0x10f8cb('0x35e')]();this[_0x10f8cb('0x1db')](_0xf32752,_0x4edc14,_0x11850f,_0x18ae3e,!![]);const _0x11f353=this[_0x10f8cb('0xd8')]();return this['drawItemKeyData'](_0x11f353,_0x4edc14,_0x11850f,_0x18ae3e,![],'right'),this[_0x10f8cb('0xcf')](_0x4edc14,_0x11850f,_0x18ae3e),this[_0x10f8cb('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x35e')]=function(){const _0x4e7b6a=_0x44d0c2;return VisuMZ[_0x4e7b6a('0x49')][_0x4e7b6a('0x289')][_0x4e7b6a('0x19b')][_0x4e7b6a('0x221')];},Window_ShopStatus[_0x44d0c2('0x2a1')]['getItemHitTypeText']=function(){const _0x5290b8=_0x44d0c2,_0x28e35d=_0x5290b8('0x334');if(this['_customItemInfo'][_0x28e35d])return this[_0x5290b8('0x308')][_0x28e35d];const _0x108c3c=VisuMZ['ItemsEquipsCore'][_0x5290b8('0x289')]['StatusWindow'],_0x361afb=_0x5290b8('0x1e0')[_0x5290b8('0x22f')](this[_0x5290b8('0x170')][_0x5290b8('0x1cc')]);return _0x108c3c[_0x361afb];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x26c')]=function(_0x5a20fe,_0x3fe3f2,_0xaf82){const _0x58299b=_0x44d0c2;if(this[_0x58299b('0x170')][_0x58299b('0xd1')][_0x58299b('0x2c3')]<=0x0)return _0x3fe3f2;if(this[_0x58299b('0x250')](_0x5a20fe,_0x3fe3f2,_0xaf82))_0x3fe3f2+=this['lineHeight']();if(this[_0x58299b('0x306')](_0x5a20fe,_0x3fe3f2,_0xaf82))_0x3fe3f2+=this[_0x58299b('0x202')]();return this[_0x58299b('0x13')](),_0x3fe3f2;},Window_ShopStatus[_0x44d0c2('0x2a1')]['drawItemDamageElement']=function(_0x2fb574,_0x121309,_0x2c7646){const _0xad041c=_0x44d0c2,_0x561f61=this['getItemDamageElementLabel']();this[_0xad041c('0x1db')](_0x561f61,_0x2fb574,_0x121309,_0x2c7646,!![]);const _0x467b9e=this[_0xad041c('0x35c')]();return this[_0xad041c('0x1db')](_0x467b9e,_0x2fb574,_0x121309,_0x2c7646,![],'right'),this[_0xad041c('0xcf')](_0x2fb574,_0x121309,_0x2c7646),this[_0xad041c('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x394')]=function(){const _0x59ef6c=_0x44d0c2;return VisuMZ[_0x59ef6c('0x49')][_0x59ef6c('0x289')]['StatusWindow']['LabelElement'];},Window_ShopStatus['prototype'][_0x44d0c2('0x35c')]=function(){const _0x49f1a5=_0x44d0c2,_0x2b9f8d='ELEMENT';if(this[_0x49f1a5('0x308')][_0x2b9f8d])return this[_0x49f1a5('0x308')][_0x2b9f8d];if(this[_0x49f1a5('0x170')][_0x49f1a5('0xd1')][_0x49f1a5('0x291')]<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x49f1a5('0x289')]['StatusWindow'][_0x49f1a5('0x360')];else{if(this['_item']['damage'][_0x49f1a5('0x291')]===0x0){if(_0x49f1a5('0xb1')!=='nsGMR'){function _0x4a6fc(){const _0x5b513e=_0x49f1a5;if(this['index']()!==0x0)return![];const _0x5c3f4a=_0x439926[_0x5b513e('0x49')][_0x5b513e('0x289')][_0x5b513e('0x3d8')];if(!_0x5c3f4a['CommandAddOptimize']&&!_0x5c3f4a['CommandAddClear'])return![];return _0x30b2ee[_0x5b513e('0x13f')]('up');}}else return VisuMZ[_0x49f1a5('0x49')][_0x49f1a5('0x289')][_0x49f1a5('0x19b')][_0x49f1a5('0xde')];}else{if(_0x49f1a5('0x2ce')!==_0x49f1a5('0x2ce')){function _0x24afad(){const _0x3f83e2=_0x49f1a5;_0x5b32e1[_0x3f83e2('0x2a1')][_0x3f83e2('0x3ad')]['call'](this),this['_itemWindow']&&this[_0x3f83e2('0x210')]['setCategory'](this[_0x3f83e2('0xe7')]());}}else return $dataSystem[_0x49f1a5('0x1eb')][this['_item'][_0x49f1a5('0xd1')][_0x49f1a5('0x291')]];}}},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x306')]=function(_0x105ed2,_0xc8af97,_0x34eb86){const _0x206dae=_0x44d0c2,_0x2641d1=this[_0x206dae('0x33e')]();this[_0x206dae('0x1db')](_0x2641d1,_0x105ed2,_0xc8af97,_0x34eb86,!![]),this[_0x206dae('0x1b3')]();const _0x5268e1=this[_0x206dae('0x1df')](),_0x5e6b00=ColorManager[_0x206dae('0x38e')]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x206dae('0x170')][_0x206dae('0xd1')][_0x206dae('0x2c3')]]);return this['changeTextColor'](_0x5e6b00),this[_0x206dae('0x1db')](_0x5268e1,_0x105ed2,_0xc8af97,_0x34eb86,![],_0x206dae('0x214')),this['drawItemDarkRect'](_0x105ed2,_0xc8af97,_0x34eb86),this[_0x206dae('0x13')](),!![];},Window_ShopStatus['prototype'][_0x44d0c2('0x33e')]=function(){const _0x5e9ff0=_0x44d0c2;return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x5e9ff0('0xed')](this[_0x5e9ff0('0x170')])!==_0x5e9ff0('0x252')?this['getItemDamageAmountLabelBattleCore']():this[_0x5e9ff0('0x8d')]();},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x8d')]=function(){const _0x4a4139=_0x44d0c2,_0x833f28=VisuMZ[_0x4a4139('0x49')]['Settings'][_0x4a4139('0x19b')],_0x46003d=_0x4a4139('0x34e')['format'](this[_0x4a4139('0x170')]['damage']['type']),_0x325e38=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x4a4139('0xd1')][_0x4a4139('0x2c3')]];return _0x833f28[_0x46003d]['format'](_0x325e38);},Window_ShopStatus['prototype'][_0x44d0c2('0x1b3')]=function(){const _0x187075=_0x44d0c2,_0x2ef36b=$gameActors[_0x187075('0x95')](0x1);this[_0x187075('0x3d6')]=JsonEx[_0x187075('0x408')](_0x2ef36b),this[_0x187075('0x2b3')]=JsonEx[_0x187075('0x408')](_0x2ef36b);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x1df')]=function(){const _0x127979=_0x44d0c2,_0xd12c39='DAMAGE\x20MULTIPLIER';if(this[_0x127979('0x308')][_0xd12c39])return this[_0x127979('0x308')][_0xd12c39];return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x127979('0xed')](this[_0x127979('0x170')])!==_0x127979('0x252')?this[_0x127979('0x290')]():this[_0x127979('0x256')]();},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x256')]=function(){const _0x54a2c8=_0x44d0c2;window['a']=this['_tempActorA'],window['b']=this[_0x54a2c8('0x2b3')],this[_0x54a2c8('0x3d6')]['setShopStatusWindowMode'](!![]),this[_0x54a2c8('0x2b3')][_0x54a2c8('0x3d')]([0x3,0x4][_0x54a2c8('0x284')](this[_0x54a2c8('0x170')]['damage'][_0x54a2c8('0x2c3')]));let _0x43f0a4=this[_0x54a2c8('0x170')][_0x54a2c8('0xd1')][_0x54a2c8('0x40b')];try{const _0x3fc458=Math['max'](eval(_0x43f0a4),0x0)/window['a'][_0x54a2c8('0x25')];return this[_0x54a2c8('0x3a2')](),isNaN(_0x3fc458)?_0x54a2c8('0x3b5'):'%1%'['format'](Math[_0x54a2c8('0x283')](_0x3fc458*0x64));}catch(_0x5a20e9){if($gameTemp[_0x54a2c8('0x2dd')]()){if(_0x54a2c8('0x25e')!=='ssaHv'){function _0x17bfa4(){const _0xf42e43=_0x54a2c8;_0x3df6cc[_0xf42e43('0x2a1')][_0xf42e43('0xa1')]['call'](this),this[_0xf42e43('0x130')]&&this[_0xf42e43('0x130')]['isUseModernControls']()&&this[_0xf42e43('0x130')][_0xf42e43('0xa1')]();}}else console[_0x54a2c8('0x2cd')](_0x54a2c8('0x265')['format'](this[_0x54a2c8('0x170')][_0x54a2c8('0x8f')])),console[_0x54a2c8('0x2cd')](_0x5a20e9);}return this[_0x54a2c8('0x3a2')](),_0x54a2c8('0x3b5');}},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x3a2')]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus['prototype'][_0x44d0c2('0x80')]=function(_0x1da439,_0x55aa4c,_0x105141){const _0x46296f=_0x44d0c2;if(!this[_0x46296f('0x348')]())return _0x55aa4c;if(this[_0x46296f('0x404')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();if(this['drawItemEffectsMpRecovery'](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();if(this[_0x46296f('0x207')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this['lineHeight']();if(this[_0x46296f('0x309')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();if(this[_0x46296f('0x2e2')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();if(this[_0x46296f('0x9e')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();if(this[_0x46296f('0xe9')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();if(this[_0x46296f('0x3df')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();if(this[_0x46296f('0x2da')](_0x1da439,_0x55aa4c,_0x105141))_0x55aa4c+=this[_0x46296f('0x202')]();return this[_0x46296f('0x13')](),_0x55aa4c;},Window_ShopStatus[_0x44d0c2('0x2a1')]['makeItemData']=function(){const _0x51b48b=_0x44d0c2;let _0x223213=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0xbb571f of this[_0x51b48b('0x170')][_0x51b48b('0x1b')]){if(_0x51b48b('0x1bf')===_0x51b48b('0x1bf'))switch(_0xbb571f['code']){case Game_Action[_0x51b48b('0x2a3')]:this['_itemData']['rateHP']+=_0xbb571f[_0x51b48b('0x321')],this[_0x51b48b('0x3bd')][_0x51b48b('0x34f')]+=_0xbb571f[_0x51b48b('0x3aa')],_0x223213=!![];break;case Game_Action[_0x51b48b('0x236')]:this[_0x51b48b('0x3bd')][_0x51b48b('0x19')]+=_0xbb571f['value1'],this['_itemData'][_0x51b48b('0x389')]+=_0xbb571f[_0x51b48b('0x3aa')],_0x223213=!![];break;case Game_Action[_0x51b48b('0x2e3')]:this['_itemData'][_0x51b48b('0x1a6')]+=_0xbb571f[_0x51b48b('0x321')],_0x223213=!![];break;case Game_Action[_0x51b48b('0x8')]:this[_0x51b48b('0x3bd')]['addState'][_0x51b48b('0x2cc')](_0xbb571f[_0x51b48b('0x356')]),_0x223213=!![];break;case Game_Action[_0x51b48b('0x4c')]:this['_itemData'][_0x51b48b('0x23c')][_0x51b48b('0x2cc')](_0xbb571f[_0x51b48b('0x356')]),this[_0x51b48b('0x3bd')][_0x51b48b('0x158')]=!![],_0x223213=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this[_0x51b48b('0x3bd')][_0x51b48b('0x28d')][_0xbb571f[_0x51b48b('0x356')]]+=0x1,_0x223213=!![];break;case Game_Action[_0x51b48b('0x70')]:this[_0x51b48b('0x3bd')][_0x51b48b('0x28d')][_0xbb571f['dataId']]-=0x1,_0x223213=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x51b48b('0x3bd')]['removeBuff'][_0x51b48b('0x2cc')](_0xbb571f[_0x51b48b('0x356')]),this[_0x51b48b('0x3bd')][_0x51b48b('0x158')]=!![],_0x223213=!![];break;case Game_Action[_0x51b48b('0x127')]:this[_0x51b48b('0x3bd')]['removeDebuff'][_0x51b48b('0x2cc')](_0xbb571f[_0x51b48b('0x356')]),this['_itemData'][_0x51b48b('0x158')]=!![],_0x223213=!![];break;}else{function _0x16a1ad(){const _0x458d6c=_0x51b48b;if(this[_0x458d6c('0xb')](_0x2ba89a))this[_0x458d6c('0x235')](_0x1b47e0,null);}}}if(this[_0x51b48b('0x3bd')][_0x51b48b('0x11b')][_0x51b48b('0x3f3')]>0x0)this[_0x51b48b('0x3bd')]['addStateBuffChanges']=!![];for(let _0x1d4eed=0x0;_0x1d4eed<this[_0x51b48b('0x3bd')][_0x51b48b('0x28d')][_0x51b48b('0x3f3')];_0x1d4eed++){if(this[_0x51b48b('0x3bd')][_0x51b48b('0x28d')][_0x1d4eed]!==0x0)this[_0x51b48b('0x3bd')][_0x51b48b('0x2f8')]=!![];}this[_0x51b48b('0x170')][_0x51b48b('0x38b')]!==0x0&&(this[_0x51b48b('0x3bd')][_0x51b48b('0x35a')]=this[_0x51b48b('0x170')][_0x51b48b('0x38b')],_0x223213=!![]);const _0x138bd2=[_0x51b48b('0xa7'),_0x51b48b('0x27a'),'TP\x20RECOVERY',_0x51b48b('0xfc'),'MP\x20DAMAGE',_0x51b48b('0x2a'),'USER\x20TP\x20GAIN',_0x51b48b('0x1b2'),'REMOVED\x20EFFECTS'];for(const _0x28b786 of _0x138bd2){if(this[_0x51b48b('0x308')][_0x28b786]){_0x223213=!![];break;}}return _0x223213;},Window_ShopStatus[_0x44d0c2('0x2a1')]['drawItemEffectsHpRecovery']=function(_0x1b4d71,_0x277616,_0x5b9817){const _0x53a648=_0x44d0c2,_0x209fda='HP\x20RECOVERY';if(this[_0x53a648('0x3bd')]['rateHP']<=0x0&&this[_0x53a648('0x3bd')][_0x53a648('0x34f')]<=0x0&&!this[_0x53a648('0x308')][_0x209fda])return![];const _0x4ef2b3=this[_0x53a648('0x1ea')]();this[_0x53a648('0x1db')](_0x4ef2b3,_0x1b4d71,_0x277616,_0x5b9817,!![]);const _0x52995d=this['getItemEffectsHpRecoveryText']();return this['changeTextColor'](ColorManager[_0x53a648('0x38e')](0x1)),this[_0x53a648('0x1db')](_0x52995d,_0x1b4d71,_0x277616,_0x5b9817,![],_0x53a648('0x214')),this[_0x53a648('0xcf')](_0x1b4d71,_0x277616,_0x5b9817),this[_0x53a648('0x13')](),!![];},Window_ShopStatus['prototype'][_0x44d0c2('0x1ea')]=function(){const _0x3aef84=_0x44d0c2,_0x4f71a7=VisuMZ['ItemsEquipsCore'][_0x3aef84('0x289')][_0x3aef84('0x19b')]['LabelRecoverHP'];return _0x4f71a7[_0x3aef84('0x22f')](TextManager['hp']);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x29d')]=function(){const _0x3187f4=_0x44d0c2,_0x26d616=_0x3187f4('0xa7');if(this[_0x3187f4('0x308')][_0x26d616])return this[_0x3187f4('0x308')][_0x26d616];let _0x1e56d1='';if(this['_itemData'][_0x3187f4('0x26b')]>0x0)_0x1e56d1+='+%1%'[_0x3187f4('0x22f')](Math[_0x3187f4('0xca')](this[_0x3187f4('0x3bd')][_0x3187f4('0x26b')]*0x64));if(this['_itemData'][_0x3187f4('0x26b')]>0x0&&this[_0x3187f4('0x3bd')][_0x3187f4('0x34f')]>0x0)_0x1e56d1+='\x20';if(this[_0x3187f4('0x3bd')][_0x3187f4('0x34f')]>0x0)_0x1e56d1+='+%1'[_0x3187f4('0x22f')](this[_0x3187f4('0x3bd')][_0x3187f4('0x34f')]);return _0x1e56d1;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x240')]=function(_0x117ffc,_0x206a08,_0x2efd1c){const _0xc297b4=_0x44d0c2,_0x55846c='MP\x20RECOVERY';if(this[_0xc297b4('0x3bd')][_0xc297b4('0x19')]<=0x0&&this[_0xc297b4('0x3bd')]['flatMP']<=0x0&&!this['_customItemInfo'][_0x55846c])return![];const _0x4b10e1=this[_0xc297b4('0x1d7')]();this['drawItemKeyData'](_0x4b10e1,_0x117ffc,_0x206a08,_0x2efd1c,!![]);const _0x21c591=this[_0xc297b4('0x26d')]();return this[_0xc297b4('0x1a8')](ColorManager[_0xc297b4('0x38e')](0x3)),this[_0xc297b4('0x1db')](_0x21c591,_0x117ffc,_0x206a08,_0x2efd1c,![],_0xc297b4('0x214')),this['drawItemDarkRect'](_0x117ffc,_0x206a08,_0x2efd1c),this[_0xc297b4('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x1d7')]=function(){const _0x11f900=_0x44d0c2,_0xa2cc9f=VisuMZ[_0x11f900('0x49')][_0x11f900('0x289')][_0x11f900('0x19b')][_0x11f900('0x3b6')];return _0xa2cc9f[_0x11f900('0x22f')](TextManager['mp']);},Window_ShopStatus['prototype'][_0x44d0c2('0x26d')]=function(){const _0x2e23f7=_0x44d0c2,_0x3436b9=_0x2e23f7('0x27a');if(this[_0x2e23f7('0x308')][_0x3436b9])return this[_0x2e23f7('0x308')][_0x3436b9];let _0x514002='';if(this[_0x2e23f7('0x3bd')][_0x2e23f7('0x19')]>0x0)_0x514002+=_0x2e23f7('0xf')['format'](Math[_0x2e23f7('0xca')](this[_0x2e23f7('0x3bd')]['rateMP']*0x64));if(this[_0x2e23f7('0x3bd')][_0x2e23f7('0x19')]>0x0&&this[_0x2e23f7('0x3bd')]['flatMP']>0x0)_0x514002+='\x20';if(this[_0x2e23f7('0x3bd')][_0x2e23f7('0x389')]>0x0)_0x514002+=_0x2e23f7('0x3b2')['format'](this['_itemData'][_0x2e23f7('0x389')]);return _0x514002;},Window_ShopStatus['prototype'][_0x44d0c2('0x207')]=function(_0x5c813e,_0x4de719,_0x43e455){const _0x1b282b=_0x44d0c2,_0x47b432='TP\x20RECOVERY';if(this[_0x1b282b('0x3bd')][_0x1b282b('0x1a6')]<=0x0&&!this['_customItemInfo'][_0x47b432])return![];const _0x7bc282=this['getItemEffectsTpRecoveryLabel']();this[_0x1b282b('0x1db')](_0x7bc282,_0x5c813e,_0x4de719,_0x43e455,!![]);const _0x1324e2=this[_0x1b282b('0x20')]();return this[_0x1b282b('0x1a8')](ColorManager[_0x1b282b('0x3a0')]()),this[_0x1b282b('0x1db')](_0x1324e2,_0x5c813e,_0x4de719,_0x43e455,![],_0x1b282b('0x214')),this[_0x1b282b('0xcf')](_0x5c813e,_0x4de719,_0x43e455),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')]['getItemEffectsTpRecoveryLabel']=function(){const _0x745205=_0x44d0c2,_0x18b738=VisuMZ[_0x745205('0x49')][_0x745205('0x289')][_0x745205('0x19b')][_0x745205('0x199')];return _0x18b738[_0x745205('0x22f')](TextManager['tp']);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x20')]=function(){const _0x1dcd41=_0x44d0c2,_0x27e182=_0x1dcd41('0x25b');if(this['_customItemInfo'][_0x27e182])return this[_0x1dcd41('0x308')][_0x27e182];let _0x5953ca='';return _0x5953ca+=_0x1dcd41('0x3b2')[_0x1dcd41('0x22f')](this[_0x1dcd41('0x3bd')][_0x1dcd41('0x1a6')]),_0x5953ca;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0xe9')]=function(_0x405f5f,_0x5d235d,_0x10ff7c){const _0x5f2bbb=_0x44d0c2,_0x1d4fa6='USER\x20TP\x20GAIN';if(this['_itemData']['selfTP']===0x0&&!this[_0x5f2bbb('0x308')][_0x1d4fa6])return![];const _0x4e8779=this[_0x5f2bbb('0x2f9')]();this['drawItemKeyData'](_0x4e8779,_0x405f5f,_0x5d235d,_0x10ff7c,!![]);const _0x580282=this['getItemEffectsSelfTpGainText']();return this['_itemData'][_0x5f2bbb('0x35a')]>0x0?this['changeTextColor'](ColorManager[_0x5f2bbb('0x3a0')]()):this[_0x5f2bbb('0x1a8')](ColorManager[_0x5f2bbb('0x2f5')]()),this[_0x5f2bbb('0x1db')](_0x580282,_0x405f5f,_0x5d235d,_0x10ff7c,![],_0x5f2bbb('0x214')),this['drawItemDarkRect'](_0x405f5f,_0x5d235d,_0x10ff7c),this[_0x5f2bbb('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x2f9')]=function(){const _0x3835f4=_0x44d0c2,_0x509842=VisuMZ['ItemsEquipsCore'][_0x3835f4('0x289')][_0x3835f4('0x19b')][_0x3835f4('0x319')];return _0x509842[_0x3835f4('0x22f')](TextManager['tp']);},Window_ShopStatus[_0x44d0c2('0x2a1')]['getItemEffectsSelfTpGainText']=function(){const _0x50970c=_0x44d0c2,_0x37ed28=_0x50970c('0x19f');if(this[_0x50970c('0x308')][_0x37ed28])return this['_customItemInfo'][_0x37ed28];let _0x2b4d11='';return this[_0x50970c('0x3bd')][_0x50970c('0x35a')]>0x0?_0x2b4d11+=_0x50970c('0x3b2')[_0x50970c('0x22f')](this[_0x50970c('0x3bd')][_0x50970c('0x35a')]):_0x2b4d11+='%1'[_0x50970c('0x22f')](this[_0x50970c('0x3bd')]['selfTP']),_0x2b4d11;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x309')]=function(_0x3d1f23,_0x134c96,_0x3b0d41){const _0x2c93b8=_0x44d0c2,_0x39cc93=_0x2c93b8('0xfc');if(this[_0x2c93b8('0x3bd')][_0x2c93b8('0x26b')]>=0x0&&this['_itemData'][_0x2c93b8('0x34f')]>=0x0&&!this['_customItemInfo'][_0x39cc93])return![];const _0x16520b=this[_0x2c93b8('0x40d')]();this[_0x2c93b8('0x1db')](_0x16520b,_0x3d1f23,_0x134c96,_0x3b0d41,!![]);const _0x3acde1=this['getItemEffectsHpDamageText']();return this[_0x2c93b8('0x1a8')](ColorManager['damageColor'](0x0)),this[_0x2c93b8('0x1db')](_0x3acde1,_0x3d1f23,_0x134c96,_0x3b0d41,![],_0x2c93b8('0x214')),this[_0x2c93b8('0xcf')](_0x3d1f23,_0x134c96,_0x3b0d41),this[_0x2c93b8('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')]['getItemEffectsHpDamageLabel']=function(){const _0x2f1102=_0x44d0c2,_0x425fd4=VisuMZ[_0x2f1102('0x49')]['Settings'][_0x2f1102('0x19b')][_0x2f1102('0x88')];return _0x425fd4[_0x2f1102('0x22f')](TextManager['hp']);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x115')]=function(){const _0xd7f0b2=_0x44d0c2,_0x4fe7c1=_0xd7f0b2('0xfc');if(this[_0xd7f0b2('0x308')][_0x4fe7c1])return this[_0xd7f0b2('0x308')][_0x4fe7c1];let _0x12e436='';if(this['_itemData']['rateHP']<0x0)_0x12e436+=_0xd7f0b2('0x298')['format'](Math['floor'](this[_0xd7f0b2('0x3bd')][_0xd7f0b2('0x26b')]*0x64));if(this['_itemData'][_0xd7f0b2('0x26b')]<0x0&&this[_0xd7f0b2('0x3bd')][_0xd7f0b2('0x34f')]<0x0)_0x12e436+='\x20';if(this[_0xd7f0b2('0x3bd')]['flatHP']<0x0)_0x12e436+='%1'[_0xd7f0b2('0x22f')](this[_0xd7f0b2('0x3bd')][_0xd7f0b2('0x34f')]);return _0x12e436;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x2e2')]=function(_0x361809,_0x15e1d8,_0x31b066){const _0x10831c=_0x44d0c2,_0x5df1f1=_0x10831c('0x313');if(this[_0x10831c('0x3bd')][_0x10831c('0x19')]>=0x0&&this[_0x10831c('0x3bd')][_0x10831c('0x389')]>=0x0&&!this[_0x10831c('0x308')][_0x5df1f1])return![];const _0x26750a=this['getItemEffectsMpDamageLabel']();this['drawItemKeyData'](_0x26750a,_0x361809,_0x15e1d8,_0x31b066,!![]);const _0x587272=this[_0x10831c('0xf5')]();return this[_0x10831c('0x1a8')](ColorManager[_0x10831c('0x38e')](0x2)),this['drawItemKeyData'](_0x587272,_0x361809,_0x15e1d8,_0x31b066,![],_0x10831c('0x214')),this[_0x10831c('0xcf')](_0x361809,_0x15e1d8,_0x31b066),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x44d0c2('0x48')]=function(){const _0x1aeeb0=_0x44d0c2,_0xd1e92e=VisuMZ[_0x1aeeb0('0x49')][_0x1aeeb0('0x289')][_0x1aeeb0('0x19b')][_0x1aeeb0('0x83')];return _0xd1e92e[_0x1aeeb0('0x22f')](TextManager['mp']);},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0xf5')]=function(){const _0x503d48=_0x44d0c2,_0x42069f=_0x503d48('0x313');if(this[_0x503d48('0x308')][_0x42069f])return this[_0x503d48('0x308')][_0x42069f];let _0x21a7e8='';if(this[_0x503d48('0x3bd')]['rateMP']<0x0)_0x21a7e8+='%1%'[_0x503d48('0x22f')](Math[_0x503d48('0xca')](this[_0x503d48('0x3bd')][_0x503d48('0x19')]*0x64));if(this['_itemData']['rateMP']<0x0&&this[_0x503d48('0x3bd')][_0x503d48('0x389')]<0x0)_0x21a7e8+='\x20';if(this[_0x503d48('0x3bd')][_0x503d48('0x389')]<0x0)_0x21a7e8+='%1'['format'](this[_0x503d48('0x3bd')][_0x503d48('0x389')]);return _0x21a7e8;},Window_ShopStatus[_0x44d0c2('0x2a1')]['drawItemEffectsTpDamage']=function(_0x411d97,_0x2779c,_0x4f35be){const _0x2c2b98=_0x44d0c2,_0x250520=_0x2c2b98('0x2a');if(this[_0x2c2b98('0x3bd')][_0x2c2b98('0x1a6')]>=0x0&&!this[_0x2c2b98('0x308')][_0x250520])return![];const _0x14f90c=this[_0x2c2b98('0x281')]();this[_0x2c2b98('0x1db')](_0x14f90c,_0x411d97,_0x2779c,_0x4f35be,!![]);const _0xaadcd0=this[_0x2c2b98('0x29f')]();return this['changeTextColor'](ColorManager[_0x2c2b98('0x2f5')]()),this['drawItemKeyData'](_0xaadcd0,_0x411d97,_0x2779c,_0x4f35be,![],_0x2c2b98('0x214')),this[_0x2c2b98('0xcf')](_0x411d97,_0x2779c,_0x4f35be),this[_0x2c2b98('0x13')](),!![];},Window_ShopStatus[_0x44d0c2('0x2a1')]['getItemEffectsTpDamageLabel']=function(){const _0x314049=_0x44d0c2,_0x406a91=VisuMZ['ItemsEquipsCore'][_0x314049('0x289')][_0x314049('0x19b')]['LabelDamageTP'];return _0x406a91['format'](TextManager['tp']);},Window_ShopStatus[_0x44d0c2('0x2a1')]['getItemEffectsTpDamageText']=function(){const _0x537c7c=_0x44d0c2,_0x386112=_0x537c7c('0x2a');if(this['_customItemInfo'][_0x386112])return this[_0x537c7c('0x308')][_0x386112];let _0x539c7f='';return _0x539c7f+='%1'[_0x537c7c('0x22f')](this[_0x537c7c('0x3bd')]['gainTP']),_0x539c7f;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x3df')]=function(_0x33c511,_0x527e4f,_0x55b8cf){const _0x44b259=_0x44d0c2,_0x1ab85f=_0x44b259('0x1b2');if(!this[_0x44b259('0x3bd')][_0x44b259('0x2f8')]&&!this[_0x44b259('0x308')][_0x1ab85f])return![];const _0x19abd2=this[_0x44b259('0x24a')]();this['drawItemKeyData'](_0x19abd2,_0x33c511,_0x527e4f,_0x55b8cf,!![]);const _0x168539=this[_0x44b259('0x33')]();return this[_0x44b259('0x1db')](_0x168539,_0x33c511,_0x527e4f,_0x55b8cf,![],_0x44b259('0x214')),this['drawItemDarkRect'](_0x33c511,_0x527e4f,_0x55b8cf),this[_0x44b259('0x13')](),!![];},Window_ShopStatus['prototype'][_0x44d0c2('0x24a')]=function(){const _0x1e8192=_0x44d0c2;return VisuMZ[_0x1e8192('0x49')][_0x1e8192('0x289')][_0x1e8192('0x19b')][_0x1e8192('0x341')];},Window_ShopStatus['prototype'][_0x44d0c2('0x33')]=function(){const _0x525c48=_0x44d0c2,_0x508deb=_0x525c48('0x1b2');if(this[_0x525c48('0x308')][_0x508deb])return this[_0x525c48('0x308')][_0x508deb];let _0x10ae30='',_0x51e2a5=0x0;const _0x10a282=0x8;for(const _0xb951c5 of this[_0x525c48('0x3bd')][_0x525c48('0x11b')]){if(_0x525c48('0x97')==='OTRIL'){function _0x4fcea5(){const _0x58e45c=_0x525c48,_0xc23630=_0x17500b['parse']('['+_0x18fcc9['$1'][_0x58e45c('0x2ac')](/\d+/g)+']');for(const _0x1c9e63 of _0xc23630){if(!_0x4cc9cb[_0x58e45c('0x2d8')](_0x1c9e63))return![];}return!![];}}else{const _0x2944a3=$dataStates[_0xb951c5];if(_0x2944a3&&_0x2944a3[_0x525c48('0x302')]>0x0){_0x10ae30+=_0x525c48('0x152')[_0x525c48('0x22f')](_0x2944a3[_0x525c48('0x302')]),_0x51e2a5++;if(_0x51e2a5>=_0x10a282)return _0x10ae30;}}}for(let _0x1cede4=0x0;_0x1cede4<this['_itemData'][_0x525c48('0x28d')][_0x525c48('0x3f3')];_0x1cede4++){const _0x4009d9=this[_0x525c48('0x3bd')][_0x525c48('0x28d')][_0x1cede4],_0x502108=Game_BattlerBase['prototype'][_0x525c48('0x1f')](_0x4009d9,_0x1cede4);if(_0x502108>0x0){if('fHCuB'!==_0x525c48('0x3c4')){_0x10ae30+='\x5cI[%1]'[_0x525c48('0x22f')](_0x502108),_0x51e2a5++;if(_0x51e2a5>=_0x10a282)return _0x10ae30;}else{function _0x489218(){const _0x1a3022=_0x525c48;if(!this[_0x1a3022('0x5d')]())return;const _0x24493a=this[_0x1a3022('0x169')](),_0x230055=_0x119712[_0x1a3022('0x49')]['Settings'][_0x1a3022('0x3d8')][_0x1a3022('0x6d')],_0x1f6622=_0x24493a===_0x1a3022('0x7a')?_0x8eb845[_0x1a3022('0x315')]:_0x1a3022('0x34d')[_0x1a3022('0x22f')](_0x230055,_0x73faf1['equip2']),_0x345aaa=this[_0x1a3022('0x1c2')]();this['addCommand'](_0x1f6622,_0x1a3022('0x279'),_0x345aaa);}}}}return _0x10ae30;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x2da')]=function(_0x258faa,_0x27ebdc,_0x4096f6){const _0x3ed97c=_0x44d0c2,_0x2ffa14=_0x3ed97c('0x38a');if(!this[_0x3ed97c('0x3bd')][_0x3ed97c('0x158')]&&!this[_0x3ed97c('0x308')][_0x2ffa14])return![];const _0xa3d50=this[_0x3ed97c('0x181')]();this['drawItemKeyData'](_0xa3d50,_0x258faa,_0x27ebdc,_0x4096f6,!![]);const _0xac5ce7=this[_0x3ed97c('0x364')]();return this[_0x3ed97c('0x1db')](_0xac5ce7,_0x258faa,_0x27ebdc,_0x4096f6,![],_0x3ed97c('0x214')),this['drawItemDarkRect'](_0x258faa,_0x27ebdc,_0x4096f6),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x44d0c2('0x181')]=function(){const _0x3e3272=_0x44d0c2;return VisuMZ[_0x3e3272('0x49')][_0x3e3272('0x289')][_0x3e3272('0x19b')][_0x3e3272('0x1c8')];},Window_ShopStatus['prototype'][_0x44d0c2('0x364')]=function(){const _0x1836ae=_0x44d0c2,_0x2c63ec=_0x1836ae('0x38a');if(this[_0x1836ae('0x308')][_0x2c63ec])return this[_0x1836ae('0x308')][_0x2c63ec];let _0x3fc336='',_0x310324=0x0;const _0x539aa4=VisuMZ[_0x1836ae('0x49')][_0x1836ae('0x289')][_0x1836ae('0x19b')]['MaxIcons'];for(const _0x509ae3 of this[_0x1836ae('0x3bd')][_0x1836ae('0x23c')]){if(_0x1836ae('0x1a')===_0x1836ae('0x336')){function _0x250a4a(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}else{const _0x5568ac=$dataStates[_0x509ae3];if(_0x5568ac&&_0x5568ac[_0x1836ae('0x302')]>0x0){_0x3fc336+=_0x1836ae('0x152')[_0x1836ae('0x22f')](_0x5568ac[_0x1836ae('0x302')]),_0x310324++;if(_0x310324>=_0x539aa4)return _0x3fc336;}}}for(let _0x1b7110=0x0;_0x1b7110<this['_itemData'][_0x1836ae('0x17e')][_0x1836ae('0x3f3')];_0x1b7110++){if(_0x1836ae('0x3bb')===_0x1836ae('0x396')){function _0xdc78ce(){const _0xae9f4b=_0x1836ae;this[_0xae9f4b('0x65')][_0xae9f4b('0x99')]()>=0x0?(_0xb38ed8['ItemsEquipsCore']['Scene_Equip_onSlotOk'][_0xae9f4b('0x183')](this),this[_0xae9f4b('0x246')]()):(this[_0xae9f4b('0x65')][_0xae9f4b('0x399')](0x0),this['_slotWindow'][_0xae9f4b('0x62')]());}}else{const _0x953497=Game_BattlerBase[_0x1836ae('0x2a1')][_0x1836ae('0x1f')](0x1,_0x1b7110);if(_0x953497>0x0){_0x3fc336+=_0x1836ae('0x152')[_0x1836ae('0x22f')](_0x953497),_0x310324++;if(_0x310324>=_0x539aa4)return _0x3fc336;}}}for(let _0xe0f3d0=0x0;_0xe0f3d0<this[_0x1836ae('0x3bd')]['removeDebuff'][_0x1836ae('0x3f3')];_0xe0f3d0++){const _0x1fa176=Game_BattlerBase[_0x1836ae('0x2a1')][_0x1836ae('0x1f')](-0x1,_0xe0f3d0);if(_0x1fa176>0x0){_0x3fc336+=_0x1836ae('0x152')[_0x1836ae('0x22f')](_0x1fa176),_0x310324++;if(_0x310324>=_0x539aa4)return _0x3fc336;}}return _0x3fc336;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0x213')]=function(_0x143c67,_0x1b4be3,_0x4223e9){const _0x3b7b1a=_0x44d0c2;if(this['_item']['note'][_0x3b7b1a('0x2ac')](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if('FBmHk'!==_0x3b7b1a('0x119')){function _0x2a4ebc(){const _0x2d614e=_0x3b7b1a;if(_0x17a3d0)_0x154f8e[_0x2d614e('0x4b')]();}}else{const _0x2c64be=String(RegExp['$1'])[_0x3b7b1a('0x102')](/[\r\n]+/);for(const _0x32ee12 of _0x2c64be){if(_0x3b7b1a('0x1ca')===_0x3b7b1a('0x1ca')){if(_0x32ee12[_0x3b7b1a('0x2ac')](/(.*):[ ](.*)/i)){if('OriZJ'!==_0x3b7b1a('0xb7')){function _0x372cb5(){const _0x52a798=_0x3b7b1a;_0x3c0fb7[_0x52a798('0x49')]['Scene_Equip_onSlotCancel']['call'](this),this[_0x52a798('0x159')]()&&(this[_0x52a798('0x11e')]['smoothSelect'](0x0),this[_0x52a798('0x65')][_0x52a798('0xa1')]());}}else{const _0xb10eda=String(RegExp['$1'])[_0x3b7b1a('0x307')](),_0x42b806=String(RegExp['$2'])[_0x3b7b1a('0x307')]();this[_0x3b7b1a('0xd')](_0xb10eda,_0x42b806,_0x143c67,_0x1b4be3,_0x4223e9),_0x1b4be3+=this[_0x3b7b1a('0x202')]();}}}else{function _0x38555d(){const _0x1476f9=_0x3b7b1a,_0x386340=_0x3f7170[_0x1476f9('0x39c')][_0x1476f9('0x2b0')](_0x1bd426(_0x2989ec['$1'])[_0x1476f9('0x307')]());return _0x51ab32[_0x1476f9('0x264')](_0x4220c6)&&_0x432057['wtypeId']===_0x386340;}}}}}return this['resetFontSettings'](),_0x1b4be3;},Window_ShopStatus[_0x44d0c2('0x2a1')][_0x44d0c2('0xd')]=function(_0x7c1559,_0x5d7a69,_0x44cd8a,_0x38cc64,_0x3efe1a){const _0x24035f=_0x44d0c2;this['drawItemKeyData'](_0x7c1559,_0x44cd8a,_0x38cc64,_0x3efe1a,!![]),this[_0x24035f('0x1db')](_0x5d7a69,_0x44cd8a,_0x38cc64,_0x3efe1a,![],'right'),this['drawItemDarkRect'](_0x44cd8a,_0x38cc64,_0x3efe1a),this[_0x24035f('0x13')]();};