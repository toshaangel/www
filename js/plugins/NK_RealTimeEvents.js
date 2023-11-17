/*:
 * @author Nico Kobayashi
 * @version 1.2
 * @date 14.06.2020
 * @plugindesc This plugin allows you to set time based events in your game.
 * Can be used for a real time day night cycle or seasonal events.
 *
 * @param === General ===
 * @default
 *
 * @param Day
 * @parent === General ===
 * @desc The ID of the variable in which the day is saved.
 * Default is 1
 * @type variable
 * @default 1
 *
 * @param Month
 * @parent === General ===
 * @desc The ID of the variable in which the month is saved. 
 * Default is 2
 * @type variable
 * @default 2
 *
 * @param Year
 * @parent === General ===
 * @desc The ID of the variable in which the year is saved. 
 * Default is 3
 * @type variable
 * @default 3
 *
 * @param Hour
 * @parent === General ===
 * @desc The ID of the variable in which the hour is saved. 
 * Default is 4
 * @type variable
 * @default 4
 *
 * @param Minute
 * @parent === General ===
 * @desc The ID of the variable in which the minute is saved. 
 * Default is 5
 * @type variable
 * @default 5
 *
 * @param Day Name
 * @parent === General ===
 * @desc The ID of the variable in which the day name is saved.
 * Default is 6
 * @type variable
 * @default 6
 *
 * @param Month Name
 * @parent === General ===
 * @desc The ID of the variable in which the month name is saved.
 * Default is 7
 * @type variable
 * @default 7
 *
 * @param Interval
 * @parent === General ===
 * @desc Iterval in which the data is written into the variables.
 * Default is 5000 (every 5 seconds).
 * @type number
 * @min 1
 * @default 5000
 *
 * @param Freeze Time Switch
 * @parent === General ===
 * @desc Turn on to freeze the current time.
 * Default is 1
 * @type switch
 * @default 1
 *
 * @param === Vocabulary ===
 * @default
 *
 * @param Month Names
 * @parent === Vocabulary ===
 * @type text[]
 * @desc Enter month names here.
 * @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 *
 * @param Day Names
 * @parent === Vocabulary ===
 * @type text[]
 * @desc Enter Day names here (for JavaScript the first day of a week is Sunday).
 * @max 7
 * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 *
 * @help Free for commercial and non-commercial use. 
 * Please credit "Nico Kobayashi" or "小林にこ".
 *------------------------------------------------------------------------
 *Version History
 *------------------------------------------------------------------------
 *
 *1.2
 *NEW:
 *• added a variable for month names and day names.
 *• added possibility to freeze the current time.
 *• removed possibility to get the month name instead of a number.
 *BUG FIXES:
 *•Game don't crash anymore if you set the interval under 500.
 *1.1
 *• added possibility to get the month name instead of a number.
 *• Added possibility to rename the months.
 *• Added easier variable selection.
 *1.0 
 *• Release
 */
 
//=======================================================
// Parameters
//=======================================================

 var parameters = PluginManager.parameters('NK_RealTimeEvents');
 //General
 var dayID = Number(parameters['Day']);
 var monthID = Number(parameters['Month']);
 var yearID = Number(parameters['Year']);
 var hourID = Number(parameters['Hour']);
 var minuteID = Number(parameters['Minute']);
 var daynameID = Number(parameters['Day Name']);
 var monthnameID = Number(parameters['Month Name']);
 var inter = Number(parameters['Interval'] || 5000);
 var freeze = String(parameters['Freeze Time Switch']);
 // Vocabulary
 var monthnames = JSON.parse(parameters['Month Names']);
 var daynames = JSON.parse(parameters['Day Names']);

 
//=======================================================
// Errors
//=======================================================
 
 if (monthnames.length > 12) {
	 alert("NK_RealTimeEvents: Please don't enter more than 12 months.")
	 window.close() 
 }

if (daynames.length > 7) {
	alert("NK_RealTimeEvents: Please don't enter more than 7 days.")
	window.close()
}

//=======================================================
// Handle game boot
//=======================================================

(function(alias) {
	Scene_Boot.prototype.start = function() {
		alias.apply(this, arguments);
		startNKRLE();
	};
})(Scene_Boot.prototype.start);

//=======================================================
// Set Variables
//=======================================================

function startNKRLE() {
	window.setInterval(function time() {
		var today = new Date();
		if ($gameSwitches.value(freeze) === false) {
			$gameVariables.setValue(dayID, today.getDate());
			$gameVariables.setValue(monthID, today.getMonth()+1);
			$gameVariables.setValue(yearID, today.getFullYear());
			$gameVariables.setValue(hourID, today.getHours());
			$gameVariables.setValue(minuteID, today.getMinutes());
			$gameVariables.setValue(monthnameID, monthnames[today.getMonth()]);
			$gameVariables.setValue(daynameID, daynames[today.getDay()]);
		}

	}, inter);
}










