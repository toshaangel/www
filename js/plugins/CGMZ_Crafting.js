/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/crafting/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Adds a crafting system to your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.1.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: Adds a crafting system to your game that works well with CGMZ
 * Professions. It can handle item requirements (consumed on craft), tool
 * requirements (not consumed on craft), products (produced on craft success)
 * and fail products (produced on craft fail). Recipes can be discovered by 
 * using an item or via plugin command.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Recipes have 4 categories of items associated with them: "Products", "Fail
 * Products", "Tools", and "Ingredients".
 * - Products are items that are received by the player directly into the
 *   inventory on a successful craft.
 * - Fail Products are items that are received by the player directly into the
 *   inventory on a failed craft. These do not show up on the crafting window
 *   and is an optional parameter.
 * - Tools are items that are required to craft the recipe, but which are NOT
 *   consumed on craft.
 * - Ingredients are items that are required to craft the recipe, and are
 *   consumed on craft.
 *
 * NOTE TAGS:
 * You can make items that, when used, will cause a recipe to be learned.
 * To do so, put the following tag in its notebox:
 * <cgmzrecipe:RecipeName>
 * And replace RecipeName with the name of the recipe.
 *
 * You can make weapons or armors that, when equipped, will add to a recipe
 * success chance. To do so, put the following note tags in the equip notebox:
 * <cgmzrecipetype:RecipeName>
 * <cgmzrecipebonus:BonusAmount>
 *
 * Note: When typing a recipe name in your note tag, it is CASE SENSITIVE
 *       which means that "Cooking" is not the same as "cOOking"
 *
 * PLUGIN COMMANDS:
 * This plugin supports the following commands:
 * Discover: Discovers (or undiscovers) the given recipe by name
 * Call Scene: Calls the crafting scene. Specify a profession type (case
 *             sensitive) to only include certain recipes in the scene.
 * Reinitialize: Reinitializes crafting data as if you had started a new game.
 *
 * The JS to call the scene is: SceneManager.push(CGMZ_Scene_Crafting);
 * You can also prepare the crafting scene to show only certain recipes with:
 * SceneManager.prepareNextScene(type);
 *
 * Update History:
 * Version 1.0.0 - Initial Release
 *
 * Version 1.0.1:
 * Made it easier to select items/armors/weapons for crafting recipes
 * Fixed crash if recipe had no toast SE but Toast Manager was imported
 *
 * Version 1.0.2:
 * Added option to hide the percentage text on the progress window
 * Made the recipe list refresh after every craft
 *
 * Version 1.0.3:
 * Added option to show the current supply of ingredients in craft window
 *
 * Version 1.0.4:
 * Rearranged the recipe parameter to show the name first
 *
 * Version 1.1.0:
 * Added ability to make the windows transparent
 * Added ability to use your own background image for the scene
 * Added option to close crafting scene on profession level up
 * Added ability to increase success chance by profession level
 * Added ability to increase success change by equipment
 * Added ability to use gold as ingredient, tool, fail product, or product
 *
 * @command discover
 * @text Discover
 * @desc Discover (or undiscover) a recipe
 *
 * @arg name
 * @type text
 * @text Recipe Name
 * @desc The name of the recipe to discover
 * @default
 *
 * @arg discover
 * @type boolean
 * @text Discover
 * @desc Whether to discover or undiscover the recipe
 * @default true
 *
 * @command callScene
 * @text Call Scene
 * @desc Calls the crafting scene
 *
 * @arg type
 * @type text
 * @text Type
 * @desc The type of recipes to include. Leave this as "all" to include all discovered recipes
 * @default all
 *
 * @command reinitialize
 * @text Reinitialize
 * @desc Resets all crafting data. Use for saved games to recognize changed data
 *
 * @arg reinitialize
 * @type boolean
 * @text Reinitialize
 * @desc Resets all crafting data as if you started a new game. No functionality if false.
 * @default true
 *
 * @param Recipes
 * @type struct<Recipe>[]
 * @default []
 * @desc Set up different recipes here
 *
 * @param Window Options
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc Whether the crafting windows are transparent or not
 * @default false
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param ScrollSpeed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the recipe window display scrolls (if needed)
 * Default: 1
 * @default 1
 *
 * @param ScrollWait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * Default: 300
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Show Ingredient Amount
 * @parent Window Options
 * @type boolean
 * @default true
 * @desc Show the current amount of ingredients the player has?
 *
 * @param Success Rate Text
 * @parent Window Options
 * @desc Text to show to describe the success rate of a recipe
 * @default Success Rate
 *
 * @param Times Crafted Text
 * @parent Window Options
 * @desc Text to show to describe the amount of times a recipe has been crafted
 * @default Times Crafted
 *
 * @param Description Text
 * @parent Window Options
 * @desc Text to show to describe the description field of a recipe
 * @default Description
 *
 * @param Experience Text
 * @parent Window Options
 * @desc Text to show to describe the experience gained for crafting the recipe (Requires CGMZ Professions)
 * @default Exp Gain
 *
 * @param Level Requirement Text
 * @parent Window Options
 * @desc Text to show to describe the level required to craft the recipe (Requires CGMZ Professions)
 * @default Level Req
 *
 * @param Level Abbreviation Text
 * @parent Window Options
 * @desc Text to abbreviate level requirement to (Requires CGMZ Professions)
 * @default Lv.
 *
 * @param Produces Text
 * @parent Window Options
 * @desc Text to show to describe the product items that a craft produces
 * @default Produces
 *
 * @param Tools Text
 * @parent Window Options
 * @desc Text to show to describe the tool items that a craft requires
 * @default Tools Needed
 *
 * @param Ingredients Text
 * @parent Window Options
 * @desc Text to show to describe the ingredient items that a craft requires
 * @default Ingredient List
 *
 * @param Progress Text
 * @parent Window Options
 * @desc Text to show to describe the progress of the currently crafting recipe
 * @default Progress
 *
 * @param Success Text
 * @parent Window Options
 * @desc Text to show to describe a successful craft
 * @default Craft Success!
 *
 * @param Failure Text
 * @parent Window Options
 * @desc Text to show to describe a failed craft
 * @default Craft Failed!
 *
 * @param Progress Color1
 * @parent Window Options
 * @desc First color of the progress bar using Windowskin colors
 * @min 0
 * @max 31
 * @default 28
 *
 * @param Progress Color2
 * @parent Window Options
 * @desc Second color of the progress bar using Windowskin colors
 * @min 0
 * @max 31
 * @default 29
 *
 * @param Success Color
 * @parent Window Options
 * @desc Color of the Successful Craft Text using Windowskin colors
 * @min 0
 * @max 31
 * @default 29
 *
 * @param Failure Color
 * @parent Window Options
 * @desc Color of the Failure Craft Text using Windowskin colors
 * @min 0
 * @max 31
 * @default 18
 *
 * @param Show Progress Percentage
 * @parent Window Options
 * @desc Whether to show the progress % text or not
 * @type boolean
 * @default true
 *
 * @param Other CGMZ Plugin Options
 *
 * @param Show Learn Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon learning a new recipe (requires CGMZ ToastManager)
 *
 * @param Toast Text
 * @parent Other CGMZ Plugin Options
 * @default Learned Recipe: 
 * @desc Text to describe a recently learned recipe in the toast window (requires CGMZ ToastManager)
 *
 * @param Always Award Exp
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Award exp even on recipe failure? (requires CGMZ Professions)
 *
 * @param Always Show Recipes
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show recipes even if profession level not high enough? (requires CGMZ Professions)
 *
 * @param Close On Level Up
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @desc Close the crafting scene on profession level up?
 * @default false
*/
/*~struct~Recipe:
 * @param Name
 * @type text
 * @desc The name of the recipe.
 *
 * @param Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by crafting the recipe
 *
 * @param Fail Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by a failed craft of this recipe
 *
 * @param Ingredients
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are consumed on craft
 *
 * @param Tools
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are not consumed on craft
 * 
 * @param Discovered
 * @type boolean
 * @default false
 * @desc Determine whether the recipe is discovered at the beginning of the game.
 * 
 * @param Icon
 * @type number
 * @default 0
 * @min -1
 * @max 99999
 * @desc Icon index to use for the recipe
 *
 * @param Description
 * @type note
 * @default ""
 * @desc Recipe description
 *
 * @param Success Rate
 * @type number
 * @min 1
 * @max 100
 * @default 100
 * @desc The % chance that the craft will succeed.
 *
 * @param Time
 * @type number
 * @min 1
 * @default 120
 * @desc The time (in frames, 60f = 1sec) it takes to craft the recipe
 *
 * @param Success Rate Per Level
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The change (additive) in % chance that the craft will succeed per level beyond the level requirement. (Requires CGMZ Professions)
 *
 * @param Experience
 * @type number
 * @min 1
 * @default 1
 * @desc The amount of experience to award for crafting this recipe (Requires CGMZ Professions)
 *
 * @param Profession
 * @type text
 * @desc The profession name which the recipe belongs to if using CGMZ Professions. The type of recipe if not using CGMZ Professions.
 *
 * @param Level Requirement
 * @type number
 * @default 1
 * @min 0
 * @desc Profession level required to craft (Requires CGMZ Professions)
 *
 * @param Craft Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting the recipe
 *
 * @param Fail Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting fails
 *
 * @param Success Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting succeeds
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for the recipe (Requires CGMZ ToastManager)
 */
 /*~struct~Item:
 * @param Item
 * @type item
 * @default 0
 * @desc The item to use. If you set this, do not set armor/weapon.
 *
 * @param Weapon
 * @type weapon
 * @default 0
 * @desc The weapon to use. If you set this, do not set armor/item.
 *
 * @param Armor
 * @type armor
 * @default 0
 * @desc The item to use. If you set this, do not set item/weapon.
 *
 * @param Gold
 * @type boolean
 * @default false
 * @desc True to set a gold amount.
 * 
 * @param Amount
 * @type number
 * @default 1
 * @desc The amount of this item needed
 */
var Imported = Imported || {};
Imported.CGMZ_Crafting = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Crafting"] = "1.1.0";
CGMZ.Crafting = CGMZ.Crafting || {};
CGMZ.Crafting.parameters = PluginManager.parameters('CGMZ_Crafting');
CGMZ.Crafting.Recipes = JSON.parse(CGMZ.Crafting.parameters["Recipes"]);
CGMZ.Crafting.SceneBackgroundImage = CGMZ.Crafting.parameters["Background Image"] || "";
CGMZ.Crafting.DescriptionText = CGMZ.Crafting.parameters["Description Text"] || "Description";
CGMZ.Crafting.SuccessRateText = CGMZ.Crafting.parameters["Success Rate Text"] || "Success Rate";
CGMZ.Crafting.TimesCraftedText = CGMZ.Crafting.parameters["Times Crafted Text"] || "Times Crafted";
CGMZ.Crafting.ExpText = CGMZ.Crafting.parameters["Experience Text"] || "Exp Gain";
CGMZ.Crafting.LevelReqText = CGMZ.Crafting.parameters["Level Requirement Text"] || "Level Req";
CGMZ.Crafting.LevelAbbrText = CGMZ.Crafting.parameters["Level Abbreviation Text"] || "Lv.";
CGMZ.Crafting.ProduceText = CGMZ.Crafting.parameters["Produces Text"] || "Produces";
CGMZ.Crafting.IngredientsText = CGMZ.Crafting.parameters["Ingredients Text"] || "Ingredient List";
CGMZ.Crafting.ToolsText = CGMZ.Crafting.parameters["Tools Text"] || "Tools Needed";
CGMZ.Crafting.ProgressText = CGMZ.Crafting.parameters["Progress Text"] || "Progress";
CGMZ.Crafting.SuccessText = CGMZ.Crafting.parameters["Success Text"] || "Craft Success!";
CGMZ.Crafting.FailureText = CGMZ.Crafting.parameters["Failure Text"] || "Craft Failed!";
CGMZ.Crafting.ScrollSpeed = Number(CGMZ.Crafting.parameters["ScrollSpeed"]) || 1;
CGMZ.Crafting.ScrollWait = Number(CGMZ.Crafting.parameters["ScrollWait"]) || 300;
CGMZ.Crafting.ScrollDeceleration = parseFloat(CGMZ.Crafting.parameters["Scroll Deceleration"]) || 0.92;
CGMZ.Crafting.AutoScroll = (CGMZ.Crafting.parameters["Auto Scroll"] === "true");
CGMZ.Crafting.ProgressColor1 = Number(CGMZ.Crafting.parameters["Progress Color1"]) || 28;
CGMZ.Crafting.ProgressColor2 = Number(CGMZ.Crafting.parameters["Progress Color2"]) || 29;
CGMZ.Crafting.FailureColor = Number(CGMZ.Crafting.parameters["Failure Color"]) || 18;
CGMZ.Crafting.SuccessColor = Number(CGMZ.Crafting.parameters["Success Color"]) || 29;
CGMZ.Crafting.ToastText = CGMZ.Crafting.parameters["Toast Text"] || "Learned Recipe: ";
CGMZ.Crafting.ShowLearnToast = (CGMZ.Crafting.parameters["Show Learn Toast"] === "true");
CGMZ.Crafting.AlwaysAwardExp = (CGMZ.Crafting.parameters["Always Award Exp"] === "true");
CGMZ.Crafting.AlwaysShowRecipes = (CGMZ.Crafting.parameters["Always Show Recipes"] === "true");
CGMZ.Crafting.ShowProgressPercentage = (CGMZ.Crafting.parameters["Show Progress Percentage"] === "true");
CGMZ.Crafting.ShowIngredientAmount = (CGMZ.Crafting.parameters["Show Ingredient Amount"] === "true");
CGMZ.Crafting.WindowTransparency = (CGMZ.Crafting.parameters["Transparent Windows"] === "true");
CGMZ.Crafting.PopSceneOnLevel = (CGMZ.Crafting.parameters["Close On Level Up"] === "true");
//=============================================================================
// CGMZ_Recipe
//-----------------------------------------------------------------------------
// Store and manage recipe data
//=============================================================================
function CGMZ_Recipe() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.initialize = function(recipe) {
	this._name = recipe.Name;
	this._discovered = (recipe.Discovered === 'true') ? true : false;
	this._experience = Number(recipe.Experience);
	this._successRate = Number(recipe["Success Rate"]);
	this._time = Number(recipe.Time);
	this._profession = recipe.Profession;
	this._levelRequirement = Number(recipe["Level Requirement"]);
	this._addedSuccessPerLevel = Number(recipe["Success Rate Per Level"]);
	this._iconIndex = Number(recipe.Icon);
	this._description = JSON.parse(recipe.Description.replace(/\\n/g, " \\\\n "));
	this._toastSE = recipe["Toast Sound Effect"];
	this._craftSE = {name: recipe["Craft Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._failSE = {name: recipe["Fail Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._successSE = {name: recipe["Success Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._timesCrafted = 0;
	this._products = [];
	this._failProducts = [];
	this._ingredients = [];
	this._tools = [];
	this.setupArray(this._products, JSON.parse(recipe.Products));
	this.setupArray(this._ingredients, JSON.parse(recipe.Ingredients));
	this.setupArray(this._tools, JSON.parse(recipe.Tools));
	this.setupArray(this._failProducts, JSON.parse(recipe["Fail Products"]));
};
//-----------------------------------------------------------------------------
// Set up the arrays for items associated with the recipe.
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setupArray = function(array, recipeArray) {
	if(recipeArray.length === 0) return;
	for(let i = 0; i < recipeArray.length; i++) {
		var item = JSON.parse(recipeArray[i]);
		if(Number(item.Item) !== 0) {
			item.ID = Number(item.Item);
			item.Type = "item";
		} else if(Number(item.Weapon) !== 0) {
			item.ID = Number(item.Weapon);
			item.Type = "weapon";
		} else if(Number(item.Armor) !== 0) {
			item.ID = Number(item.Armor);
			item.Type = "armor";
		} else {
			item.ID = 0;
			item.Type = "currency";
		}
		item.Amount = Number(item.Amount);
		array.push(item);
	}
};
//-----------------------------------------------------------------------------
// Change discovered status of a recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
};
//-----------------------------------------------------------------------------
// Set up learn toast (Requires CGMZ ToastManager)
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setupLearnToast = function() {
	var toast = {};
	toast.CGMZRecipeToast = true;
	toast.name = this._name;
	toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Perform the craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.doCraft = function(success) {
	this.takeItems(this._ingredients);
	if(Imported.CGMZ_Professions) this.awardExp(success);
	if(success) {
		this._timesCrafted++;
		this.giveItems(this._products);
	}
	else {
		this.giveItems(this._failProducts);
	}
};
//-----------------------------------------------------------------------------
// Check if recipe can be crafted
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.canCraft = function() {
	if(!this.meetsLevelRequirements()) return false;
	if(!this.hasItemsNeeded()) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check if profession level requirements are met
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.meetsLevelRequirements = function() {
	if(!Imported.CGMZ_Professions) return true;
	let profession = $cgmz.getProfession(this._profession);
	if(profession) {
		return this._levelRequirement <= profession._level;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if player has the items required to craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.hasItemsNeeded = function() {
	for(let i = 0; i < this._tools.length; i++) {
		if(this._tools[i].Type === 'currency') {
			if($gameParty.gold() < this._tools[i].Amount) return false;
		} else {
			var item = $cgmzTemp.lookupItem(this._tools[i].Type, this._tools[i].ID);
			if(item) {
				if($gameParty.numItems(item) < this._tools[i].Amount) return false;
			}
		}
	}
	for(let i = 0; i < this._ingredients.length; i++) {
		if(this._ingredients[i].Type === 'currency') {
			if($gameParty.gold() < this._ingredients[i].Amount) return false;
		} else {
			var item = $cgmzTemp.lookupItem(this._ingredients[i].Type, this._ingredients[i].ID);
			if(item) {
				if($gameParty.numItems(item) < this._ingredients[i].Amount) return false;
			}
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Take away ingredients needed to craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.takeItems = function(itemArray) {
	for(let i = 0; i < itemArray.length; i++) {
		if(itemArray[i].Type === 'currency') {
			$gameParty.loseGold(itemArray[i].Amount);
		} else {
			var item = $cgmzTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
			if(item) {
				$gameParty.loseItem(item, itemArray[i].Amount, false);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Give item products generated from craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.giveItems = function(itemArray) {
	for(let i = 0; i < itemArray.length; i++) {
		if(itemArray[i].Type === 'currency') {
			$gameParty.gainGold(itemArray[i].Amount);
		} else {
			var item = $cgmzTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
			if(item) {
				$gameParty.gainItem(item, itemArray[i].Amount, false);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Learn a recipe and show toast if applicable
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.learn = function() {
	this.changeDiscoveredStatus(true);
	if(CGMZ.Crafting.ShowLearnToast && Imported.CGMZ_ToastManager) this.setupLearnToast();
};
//-----------------------------------------------------------------------------
// Award profession Exp if applicable
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.awardExp = function(success) {
	if(success || CGMZ.Crafting.AlwaysAwardExp) {
		$cgmz.changeProfessionExp(this._profession, "+", this._experience);
	}
};
//-----------------------------------------------------------------------------
// Calculate the success rate of the recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.calculateSuccessRate = function() {
	let successRate = this._successRate;
	if(Imported.CGMZ_Professions) {
		const profession = $cgmz.getProfession(this._profession);
		if(profession) {
			successRate += this._addedSuccessPerLevel * (profession._level - this._levelRequirement);
		}
		for(const actor of $gameParty.members()) {
			for(const equip of actor.equips()) {
				if(equip && equip.meta && equip.meta.cgmzrecipetype === this._profession) {
					successRate += Number(equip.meta.cgmzrecipebonus) || 0;
				}
			}
		}
	}
	return Math.max(0.0, Math.min(successRate, 100.0));
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage recipe data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize recipe data
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Crafting_createPluginData.call(this);
	this.initializeRecipeData(false);
};
//-----------------------------------------------------------------------------
// Initialize recipe data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeRecipeData = function(reinitialize) {
	if(!this._recipes || reinitialize) {
		this.setupRecipeVariables();
	}
	for(let i = 0; i < CGMZ.Crafting.Recipes.length; i++) {
		var recipe = new CGMZ_Recipe(JSON.parse(CGMZ.Crafting.Recipes[i]));
		if(!this.getRecipe(recipe._name)) this._recipes.push(recipe);
	}
};
//-----------------------------------------------------------------------------
// Initialize recipe variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupRecipeVariables = function() {
	this._recipes = [];
};
//-----------------------------------------------------------------------------
// Returns array of all recipes
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllRecipes = function() {
	return this._recipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredRecipes = function() {
	let discoveredRecipes = [];
	for(let i = 0; i < this._recipes.length; i++) {
		if(this._recipes[i]._discovered) discoveredRecipes.push(this._recipes[i]);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes of certain type (profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredRecipesOfType = function(type) {
	let discoveredRecipes = [];
	for(let i = 0; i < this._recipes.length; i++) {
		if(this._recipes[i]._discovered && this._recipes[i]._profession === type) discoveredRecipes.push(this._recipes[i]);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Get recipe by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getRecipe = function(name) {
	for(let i = 0; i < this._recipes.length; i++) {
		if(name === this._recipes[i]._name) return this._recipes[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a recipe
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverRecipe = function(name, discovered) {
	let recipe = this.getRecipe(name);
	if(recipe) {
		(discovered === "true") ? discovered = true : discovered = false;
		(discovered) ? recipe.learn() : recipe.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Check if Item has a recipe learn property attached to it
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkItemForRecipe = function(item) {
	if(item) {
		if(item.meta && item.meta.cgmzrecipe){
			this.discoverRecipe(item.meta.cgmzrecipe, "true");
		}
	}
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Adds plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Crafting_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Crafting", "discover", this.pluginCommandCraftingDiscover);
	PluginManager.registerCommand("CGMZ_Crafting", "callScene", this.pluginCommandCraftingCallScene);
	PluginManager.registerCommand("CGMZ_Crafting", "reinitialize", this.pluginCommandCraftingReinitialize);
};
//-----------------------------------------------------------------------------
// Reinitialize the crafting data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingReinitialize = function(args) {
	if(args.reinitialize === "true") {
		$cgmz.initializeRecipeData(true);
	}
};
//-----------------------------------------------------------------------------
// Discover a recipe by name
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingDiscover = function(args) {
	$cgmz.discoverRecipe(args.name, args.discover);
};
//-----------------------------------------------------------------------------
// Call the crafting scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingCallScene = function(args) {
	SceneManager.push(CGMZ_Scene_Crafting);
	SceneManager.prepareNextScene(args.type);
};
//=============================================================================
// CGMZ_Scene_Crafting
//-----------------------------------------------------------------------------
// Handle the crafting scene
//=============================================================================
function CGMZ_Scene_Crafting(craftType) {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Crafting.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Crafting.prototype.constructor = CGMZ_Scene_Crafting;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.initialize = function(craftType) {
	if(craftType) {
		this._craftType = craftType;
	} else {
		this._craftType = "all";
	}
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.prepare = function(craftType = null) {
	if(craftType) {
		this._craftType = craftType;
	} else {
		this._craftType = "all";
	}
};
//-----------------------------------------------------------------------------
// Create crafting windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createListWindow();
	this.createDisplayWindow();
	this.createProgressWindow();
};
//-----------------------------------------------------------------------------
// Update scene - check for pop on level up
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
	if(this._progressWindow && this._progressWindow.isPopRequested()) {
		this.popScene();
	}
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_RecipeList(rect, this._craftType);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get the list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.listWindowRect = function() {
	const x = 0;
	const y = this.mainAreaTop();
	const height = Graphics.boxHeight - y;
	const width = Graphics.boxWidth / 3;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
    this._displayWindow = new CGMZ_Window_RecipeDisplay(rect);
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.setHandler('ok', this.onDisplayOk.bind(this));
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get the display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.displayWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const height = this._listWindow.height - this.calcWindowHeight(1, false);
	const width = Graphics.boxWidth - this._listWindow.width;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createProgressWindow = function() {
	const rect = this.progressWindowRect();
    this._progressWindow = new CGMZ_Window_RecipeProgress(rect);
	this._listWindow.setProgressWindow(this._progressWindow);
	this._displayWindow.setProgressWindow(this._progressWindow);
	this._progressWindow.setDisplayWindow(this._displayWindow);
	this._progressWindow.setListWindow(this._listWindow);
    this.addWindow(this._progressWindow);
};
//-----------------------------------------------------------------------------
// Get rectangle for progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.progressWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._displayWindow.y + this._displayWindow.height;
	const height = this.calcWindowHeight(1, false);
	const width = this._displayWindow.width;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On Display Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onDisplayCancel = function() {
	if(!this._progressWindow.isCrafting()) {
		this._displayWindow.deactivate();
		this._listWindow.activate();
	}
};
//-----------------------------------------------------------------------------
// On Display Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onDisplayOk = function() {
	if(!this._progressWindow.isCrafting()) {
		if(this._displayWindow.canCraft()) {
			this._progressWindow.startCraft();
		}
		else {
			SoundManager.playBuzzer();
		}
	}
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.Crafting.SceneBackgroundImage) {
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadPicture(CGMZ.Crafting.SceneBackgroundImage);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_RecipeList
//-----------------------------------------------------------------------------
// Selectable window for choosing a recipe in a list.
//=============================================================================
function CGMZ_Window_RecipeList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_RecipeList.prototype.constructor = CGMZ_Window_RecipeList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.initialize = function(rect, craftType) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._craftType = craftType;
	this._data = [];
	this.refresh();
	this.select(0);
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.makeItemList = function() {
	let list = [];
	if(this._craftType === "all") {
		list = $cgmz.getAllDiscoveredRecipes();
	}
	else {
		list = $cgmz.getDiscoveredRecipesOfType(this._craftType);
	}
	this._data = list.filter(this.includeRecipeInList);
};
//-----------------------------------------------------------------------------
// Determine if recipe should be included based on profession level
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.includeRecipeInList = function(recipe) {
	if(CGMZ.Crafting.AlwaysShowRecipes) return true;
	return recipe.meetsLevelRequirements();
	
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.drawItem = function(index) {
    const item = this._data[index];
    let rect = this.itemRectWithPadding(index);
	let iconBoxWidth = 0;
	if(item._iconIndex >= 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y + 4);
		iconBoxWidth = ImageManager.iconWidth + 4;
	}
	this.changePaintOpacity(item.canCraft());
    this.drawText(item._name, rect.x + iconBoxWidth, rect.y, rect.width, 'left');
	this.changePaintOpacity(1);
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set progress window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setProgressWindow = function(progressWindow) {
    this._progressWindow = progressWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
	if(this.active && this._progressWindow) {
		this._progressWindow.setItem(this.item());
	}
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.requestRefresh = function() {
    this.refresh();
};
//=============================================================================
// CGMZ_Window_RecipeDisplay
//-----------------------------------------------------------------------------
// Window displaying recipe information
//=============================================================================
function CGMZ_Window_RecipeDisplay() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_RecipeDisplay.prototype.constructor = CGMZ_Window_RecipeDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 4 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Crafting.ScrollWait, CGMZ.Crafting.ScrollSpeed, CGMZ.Crafting.AutoScroll, CGMZ.Crafting.ScrollDeceleration);
	this._recipe = null;
	this._largeIconWidth = ImageManager.iconWidth*2.2;
	this._largeIconHeight = ImageManager.iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this.deactivate();
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.processHandling = function() {
	if(!this._progressWindow || !this._progressWindow.isCrafting()) {
		CGMZ_Window_Scrollable.prototype.processHandling.call(this);
	}
    if (this.isActive()) {
        if (this.isOkEnabled() && (Input.isRepeated('ok') || TouchInput.isRepeated())) {
            this.processOk();
		}
    }
};
//-----------------------------------------------------------------------------
// Process Ok
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.processOk = function() {
    this.updateInputData();
    this.callOkHandler();
};
//-----------------------------------------------------------------------------
// Call Ok Handler
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.callOkHandler = function() {
    this.callHandler('ok');
};
//-----------------------------------------------------------------------------
// Check if ok handling exists
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.isOkEnabled = function() {
    return this.isHandled('ok');
};
//-----------------------------------------------------------------------------
// Set progress window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.setProgressWindow = function(progressWindow) {
    this._progressWindow = progressWindow;
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.requestRefresh = function() {
	const tempScrollMode = this._scrollMode;
	const tempScrollTimer = this._scrollTimer;
	const tempY = this.origin.y;
    this.refresh();
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
	this._scrollMode = tempScrollMode;
	this._scrollTimer = tempScrollTimer;
	this.origin.y = tempY;
};
//-----------------------------------------------------------------------------
// Determine if the recipe shown can be crafted
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.canCraft = function() {
	if(this._recipe) {
		return this._recipe.canCraft();
	}
	return false;
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.setItem = function(recipe) {
	this._recipe = recipe;
	this.refresh();
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.refresh = function() {
	if(!this._recipe) return;
	this.setupWindowForNewEntry();
	this._neededHeight = 0;
	const recipe = this._recipe;
	const width = this.contents.width;
	this.drawRecipeName(recipe._name);
	let firstLineX = 0;
	if(recipe._iconIndex > 0) {
		this.drawLargeIcon(recipe._iconIndex);
		firstLineX = this._largeIconWidth + 2
	}
	let y = this.lineHeight();
	this.drawRecipeStandardLine(CGMZ.Crafting.TimesCraftedText + ": ", this._recipe._timesCrafted, firstLineX, y, width);
	y += this.lineHeight();
	this.drawRecipeStandardLine(CGMZ.Crafting.SuccessRateText + ": ", this._recipe.calculateSuccessRate() + "%", firstLineX, y, width);
	y += this.lineHeight();
	if(Imported.CGMZ_Professions) {
		this.drawRecipeStandardLine(CGMZ.Crafting.ExpText + ": ", this._recipe._experience, 0, y, width);
		y += this.lineHeight();
		this.drawRecipeStandardLine(CGMZ.Crafting.LevelReqText + ": ", this._recipe._profession + " " + CGMZ.Crafting.LevelAbbrText + " " + this._recipe._levelRequirement, 0, y, width);
		y += this.lineHeight();
	}
	y = this.drawRecipeDescription(recipe._description, y);
	let showAmounts = false;
	let isProduct = true;
	y = this.drawRecipeItems(CGMZ.Crafting.ProduceText, recipe._products, y, width, isProduct, showAmounts);
	isProduct = false;
	y = this.drawRecipeItems(CGMZ.Crafting.ToolsText, recipe._tools, y, width, isProduct, showAmounts);
	showAmounts = true;
	y = this.drawRecipeItems(CGMZ.Crafting.IngredientsText, recipe._ingredients, y, width, isProduct, showAmounts);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Name of recipe
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeName = function(name) {
	this.contents.fontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draw recipe description - returns y-value of line below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeDescription = function(description, yVal) {
	const descriptor1 = CGMZ.Crafting.DescriptionText + ": ";
	const descriptor2 = description.split(" ");
	let x = 0;
	let y = yVal;
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor1, x, y, this.contents.width, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(ColorManager.normalColor());
	for(let i = 0; i < descriptor2.length; i++) {
		if(descriptor2[i] === "") continue;
		if(descriptor2[i] === '\\n') {
			y += this.lineHeight();
			x = 0;
			continue;
		}
		var tempWidth = this.textWidth(descriptor2[i] + " ");
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(descriptor2[i] + " ", x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws a standard line (blue system text: white text)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeStandardLine = function(descriptor1, descriptor2, x, y, width) {
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor1, x, y, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(descriptor2, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw large icon
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawLargeIcon = function(iconIndex) {
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
// Draw regular icon
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawIcon = function(iconIndex, x, y) {
    const bitmap = this._iconBitmap;
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = iconIndex % 16 * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
//-----------------------------------------------------------------------------
// Draw Item Lists
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeItems = function(descriptorText, itemArray, yVal, width, product, showAmount) {
	if(itemArray.length === 0) return yVal;
	let y = yVal;
	let x = 0;
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptorText, x, y, width, 'center');
	this.changeTextColor(ColorManager.normalColor());
	for(let i = 0; i < itemArray.length; i++) {
		if(itemArray[i].Type === 'currency') {
			y += this.lineHeight();
			let currentSupply = $gameParty.gold();
			let amount = itemArray[i].Amount + TextManager.currencyUnit;
			if(!product && itemArray[i].Amount > currentSupply) {
				this.changePaintOpacity(false);
			} else {
				this.changePaintOpacity(true);
			}
			let currentAmount = "";
			if(showAmount && CGMZ.Crafting.ShowIngredientAmount) {
				currentAmount = " (" + currentSupply + ")";
			}
			let totalWidth = this.textWidth(amount) + this.textWidth(currentAmount);
			x = (width-totalWidth)/2;
			this.drawText(amount, x, y, width-x, 'left');
			x += this.textWidth(amount);
			this.drawText(currentAmount, x, y, width-x, 'left');
			this.changePaintOpacity(true);
		} else {
			let item = $cgmzTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
			if(item) {
				y += this.lineHeight();
				let currentSupply = $gameParty.numItems(item);
				let amount = itemArray[i].Amount + "x ";
				let name = item.name;
				let iconIndex = item.iconIndex;
				if(!product && itemArray[i].Amount > currentSupply) {
					this.changePaintOpacity(false);
				} else {
					this.changePaintOpacity(true);
				}
				let currentAmount = "";
				if(showAmount && CGMZ.Crafting.ShowIngredientAmount) {
					currentAmount = " (" + currentSupply + ")";
				}
				let totalWidth = this.textWidth(amount) + this.textWidth(name) + ImageManager.iconWidth + this.textWidth(currentAmount);
				x = (width-totalWidth)/2;
				this.drawText(amount, x, y, width-x, 'left');
				x += this.textWidth(amount);
				this.drawIcon(iconIndex, x, y);
				x += ImageManager.iconWidth;
				this.drawText(name, x, y, width-x, 'left');
				x += this.textWidth(name);
				this.drawText(currentAmount, x, y, width-x, 'left');
				this.changePaintOpacity(true);
			}
		}
	}
	return y + this.lineHeight();
};
//=============================================================================
// CGMZ_Window_RecipeProgress
//-----------------------------------------------------------------------------
// Window displaying crafting progress
//=============================================================================
function CGMZ_Window_RecipeProgress() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeProgress.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_RecipeProgress.prototype.constructor = CGMZ_Window_RecipeProgress;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this._recipe = null;
	this._isCrafting = false;
	this._timeCrafting = 0;
	this._craftingSuccess = null;
	this._justFinishedCraft = false;
	this._requestPopScene = false;
	this._professionLevel = 0;
	this.refresh(0);
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Determine if the crafting scene should pop after level up
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.isPopRequested = function() {
	return this._requestPopScene;
};
//-----------------------------------------------------------------------------
// Determine if the recipe can be crafted still
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.canCraft = function() {
	if(this._recipe) {
		return this._recipe.canCraft();
	}
	return false;
};
//-----------------------------------------------------------------------------
// Determine if crafting is currently taking place
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.isCrafting = function() {
	return this._isCrafting;
};
//-----------------------------------------------------------------------------
// Determine if crafting just finished
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.justFinishedCrafting = function() {
	return this._justFinishedCraft;
};
//-----------------------------------------------------------------------------
// Start the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.startCraft = function() {
	if(this._recipe) {
		this._timeCrafting = 0;
		AudioManager.playStaticSe(this._recipe._craftSE);
		if(Imported.CGMZ_Professions && CGMZ.Crafting.PopSceneOnLevel) {
			const profession = $cgmz.getProfession(this._recipe._profession);
			if(profession) {
				this._professionLevel = profession._level;
			}
		}
		if(this._recipe.calculateSuccessRate()/100.0 > Math.random()) {
			this._craftingSuccess = true;
			this._timeNeededForCraft = this._recipe._time;
		}
		else {
			this._craftingSuccess = false;
			this._timeNeededForCraft = Math.max(Math.random()*this._recipe._time, this._recipe._time/2);
		}
		this._justFinishedCraft = false;
		this._recipe.doCraft(this._craftingSuccess);
		this._isCrafting = true;
	}
};
//-----------------------------------------------------------------------------
// Stop the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.stopCraft = function() {
	this._timeCrafting = 0;
	this._isCrafting = false;
	this._justFinishedCraft = true;
	this.checkOtherWindowsForRefresh();
	this.refresh(0);
	if(this._craftingSuccess) {
		AudioManager.playStaticSe(this._recipe._successSE);
	}
	else {
		AudioManager.playStaticSe(this._recipe._failSE);
	}
	if(Imported.CGMZ_Professions && CGMZ.Crafting.PopSceneOnLevel) {
		const profession = $cgmz.getProfession(this._recipe._profession);
		if(profession && profession._level > this._professionLevel) {
			this._requestPopScene = true;
		}
	}
};
//-----------------------------------------------------------------------------
// Update the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if(this.isCrafting()) {
		this._timeCrafting++;
		this.refresh(this._timeCrafting/this._recipe._time);
		if(this._timeCrafting >= this._timeNeededForCraft){
			this.stopCraft();
		}
	}
	else if(this.justFinishedCrafting()) {
		this._timeCrafting++;
		if(this._timeCrafting >= 60){
			this._timeCrafting = 0;
			this._justFinishedCraft = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.setItem = function(recipe) {
	this._recipe = recipe;
	this.refresh(0);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.refresh = function(rate) {
	this.contents.clear();
	const width = this.contents.width;
	if(this.justFinishedCrafting()) {
		if(this._craftingSuccess) {
			var descriptor = CGMZ.Crafting.SuccessText;
			var color = ColorManager.textColor(CGMZ.Crafting.SuccessColor);
		}
		else {
			var descriptor = CGMZ.Crafting.FailureText;
			var color = ColorManager.textColor(CGMZ.Crafting.FailureColor);
		}
		this.changeTextColor(color);
		this.drawText(descriptor, 0, 0, width, 'center');
		this.changeTextColor(ColorManager.normalColor());
	}
	else {
		this.changeTextColor(ColorManager.systemColor());
		var descriptor = CGMZ.Crafting.ProgressText + ": "
		this.drawText(descriptor, 0, 0, width, 'left');
		this.changeTextColor(ColorManager.normalColor());
		var color1 = ColorManager.textColor(CGMZ.Crafting.ProgressColor1);
		var color2 = ColorManager.textColor(CGMZ.Crafting.ProgressColor2);
		var x = this.textWidth(descriptor);
		let rect = new Rectangle(x, 0, width-x, this.lineHeight());
		this.CGMZ_drawGauge(rect, rate, color1, color2);
		if(CGMZ.Crafting.ShowProgressPercentage) {
			this.drawText((rate*100).toFixed(2) + " %", x, 0, width-x, 'center');
		}
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.setListWindow = function(listWindow) {
    this._listWindow = listWindow;
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.checkOtherWindowsForRefresh = function() {
    if(this._listWindow) this._listWindow.requestRefresh();
	if(this._displayWindow) this._displayWindow.requestRefresh();
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMZ Recipe Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMZ_ToastManager) {
const alias_CGMZ_Crafting_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_Crafting_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMZRecipeToast')) {
		this.drawText(CGMZ.Crafting.ToastText, 0, 0, this.contents.width, 'center');
		this.drawText(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Use recipe item processing
//=============================================================================
//-----------------------------------------------------------------------------
// Item use may cause learning of a recipe
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	alias_CGMZ_Crafting_useItem.call(this, item);
	if (DataManager.isItem(item)) {
        $cgmz.checkItemForRecipe(item);
    }
};