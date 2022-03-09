
     var GGZiron = GGZiron || {};
     GGZiron.Core = GGZiron.Core || {};
     if (!GGZiron.Core.JSONParseWithErrorMessage)
	     GGZiron.Core.JSONParseWithErrorMessage = function(stringToParse, errorMessage){
		 //used to show helpful messages when JSON parse fails. 
             try{
		         return JSON.parse(stringToParse);
	         } catch(e){
		         throw new Error(errorMessage);
	         }
	     };
		 
// =====================================================================================================================================
//                                                          Sprite_ClickableGGZExetended
// =====================================================================================================================================
  
GGZiron.Core.ClicableExtended = function () {
     this.initialize(...arguments);
};

GGZiron.Core.ClicableExtended.prototype = Object.create(Sprite_Clickable.prototype);
GGZiron.Core.ClicableExtended.prototype.constructor = GGZiron.Core.ClicableExtended;

GGZiron.Core.ClicableExtended.prototype.update = function(){
	 Sprite_Clickable.prototype.update.call(this);
};

GGZiron.Core.ClicableExtended.prototype.initialize = function(){
	 Sprite_Clickable.prototype.initialize.call(this, ...arguments);
	 this._held = false;
};

GGZiron.Core.ClicableExtended.prototype.processTouch = function() {
     if (this.isClickEnabled()) {
         if (this.isBeingTouched()) {
             if (!this._hovered && TouchInput.isHovered()) {
                 this._hovered = true;
                 this.onMouseEnter();
             }
			 if (this._held) this.onHold();
             if (TouchInput.isTriggered()) {
                 this._pressed = true;
				 this._held = true;
                 this.onPress();
             }
         } else {
             if (this._hovered) this.onMouseExit();
			 this.releaseIfShould();
             this._pressed = false;
             this._hovered = false;
         }
         if (this._pressed && TouchInput.isReleased()) {
			 this._held = false;
             this._pressed = false;
             this.onClick();
         }
     } else {
		 this.releaseIfShould();
         this._pressed = false;
         this._hovered = false;
     }
};

GGZiron.Core.ClicableExtended.prototype.releaseIfShould = function(){
	 if (this._held){
	     this._held = false;
	     this.onLeaveWhilePress();
	 }
};

GGZiron.Core.ClicableExtended.prototype.onHold = function(){};

GGZiron.Core.ClicableExtended.prototype.onLeaveWhilePress = function(){};		 

//--------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc Creates game timer. Version 1.2.0.
 * @author GGZiron
 
 * @help -------------------------------------------------------------------------
 
 *                          GGZiron's Time System
 *
 * -------------------------------------------------------------------------   
 *                               Introduction
 * -------------------------------------------------------------------------
 * The idea to create timer was given to me by JacSkulls, but I had a thing 
 * for timers too, and for awhile, I wanted to create one, even if it's just 
 * for my own personal satisfaction. I write for hobby, and sometimes want to 
 * do time calculation between timers of different (fictional) cultures. 
 * Which is why my timer haves some features that could be seen as odd. 
 * For example,it allows setting how many hours a day can have and how many 
 * seconds a minute have. From all time units, only the seconds are allowed 
 * to be decimals (although when requested via the proper method, they would 
 * be rounded), which is exactly because I need time conversion between timers 
 * from different cultures. My timer system still relies on heavy eventing to 
 * achieve things like in-day tints or rains according the season. But that 
 * also means more freedoms for you, to set it as you want. You should look on 
 * my demo project how I achieve things, using the timer. Setting events to 
 * react according my timer data could require you to be able to write simple 
 * comparison and logical operators. You can see more about them here: 
 * https://www.w3schools.com/js/js_comparisons.asp
 *
 * -------------------------------------------------------------------------
 *                                  Features
 * -------------------------------------------------------------------------
 *  My timer have plenty of features. The object that handles the graphics is 
 *  named Graphic Module, and without creating one, timer values would not be 
 *  displayed to the player in any way. So, my timer is complex and 
 *  configurable timing system, which haves the following features:
 * 
 * - Create configurable timer, via plugin command with long list of 
 *   parameters. You can do many things with it: fully customizing it, 
 *   setting triggers that to activate common events as parallel events or as
 *   autorun, only single execution per trigger activation. You also can make
 *   more than one timer and put relationship between them, so when the one 
 *   goes, the other goes too.
 * 
 * - Create configurable graphic module, to display the timer. That one is 
 *   done via plugin command, with overwhelming list of parameters. 
 *   Fortunately, they have default value, so if you want to test it first, 
 *   you do not need to input anything given that the needed files are there.
 *   For the default graphics of the module, you should thank JacSkulls from 
 *   RPG Maker forums. He provided them for me. Thank you, Jac!
 *
 * - Create months. Here, month is not just set of days. It have base days, 
 *   but also rules which could add-subtract days. Default months don’t have 
 *   such rules, excluding February, which have according the Gregorian 
 *   calendar.
 *
 * - Create triggers, that upon time period change (second, minute, hour,
 *   part of the day, day, month, season, year) would activate common event
 *   as autorun or parallel process, depending how you set it, and the 
 *   ability to turn game switch
 *
 * - Script call, but via plugin command. Yes, that's possible. It have one 
 *   single parameter, multi text, and it will be evaluated (like the 
 *   script call text). There, you can use shorter version for some script 
 *   calls, but as con, it executes on different context (not within event
 *   interpreter), some interpreter based methods will not work.
 *
 * -------------------------------------------------------------------------
 *                            Last Update Notes
 * -------------------------------------------------------------------------
 *  Version: 1.2.0
 *  What's new in this version: 
 *  - Changed the code structure, to be more humble with the name space
 *   (everything is assosiated with GGZiron class.
 *  
 *  - Fixed some bugs.
 *
 *  - Now the pluggin commands are bit more user friendly. Before all fields
 *    were text fields. Now I use numbers, booleans, select fields,structures, 
 *    which are more intuitive and self-explanatory. 
 *
 *  - In result of my changes, projects set to work with my previous version
 *    would need adapting to this version. The digital clock add-on needs to
 *    be updated to latest version too, to work with the new timer.
 *
 *  - The Plugin Command for creating months is removed. Now months are 
 *    not created separately, but together with the timer.
 *
 *  - Default values set on all structures to make it much easier.  
 * -------------------------------------------------------------------------
 *                                  Terms of use :
 * -------------------------------------------------------------------------
 * That plugin comes with graphical assets too, so there are two terms of use: 
 * one for the plugin, other for the graphical sets. They are independent of  
 * each other. That means if you use only the graphical assets, but not the 
 * plugin, you have to follow only the graphical assets terms. If you are 
 * using only the plugin, you have to follow only the plugin terms. If you use 
 * both, you have to follow both terms.
 *
 * Plugin Terms:
 * Author: GGZiron
 * 
 * Terms: Free for any projects, Commercial and Non-Commercial. You have to 
 * credit the author. My plugin comes with no warranty it will work, and by 
 * using it, you agree you are using it on your own risk. You can modify my 
 * plugin for own use, but if you publish modification, you must add link to 
 * my original script in RPG Maker forums or Itch.io.
 *  
 * Update: Some of the graphic assets are made by me too. As long you are 
 * using them with the Time System and you follow the terms above, no need 
 * of additional crediting. But if you are going to use for something else 
 * that is not connected with my Time System, you have to credit me. 
 * The very graphic folders contain information which resource from whom
 * is provided.
 *
 * Optional: Would like you to pm me if you publish game with my plugin. 
 * If project is commercial, would like free copy of your game. But for set 
 * of reasons, I keep those as optional, you can ignore them. 
 * 
 * Can find me on:
 * - Discord: GGZiron#8943. 
 * - Discord server dedicated on my script and plugins: 
 *   https://discord.gg/26uQSPkJ
 * - On the RPG Maker Forums: 
 *   https://forums.rpgmakerweb.com/index.php?members/ggziron.94433/
 *
 * Graphical assets terms:
 * Artist: JacSkulls
 * Terms: Free for any projects, Commercial and Non-Commercial. 
 * You have to credit the artist.
 *
 * You can find the artist on:
 * - RPG Maker Forums:
 *   https://forums.rpgmakerweb.com/index.php?members/jacskulls.160333/
 * - Devian Art: https://www.deviantart.com/jacskulls
 * - Discord: JacSkulls#2137
 * - You also can join his Discord server: https://discord.gg/CnDdX4NX
 *
 * -------------------------------------------------------------------------
 *                                Questions
 * -------------------------------------------------------------------------
 *
 * GGZIRON answers:
 *
 * Q: If I change the script, can I claim it as mine?
 * A: No, you can’t. You can claim credits only upon the very changes you make.
 *
 * Q: If I only want the pictures, do I HAVE to use the plugin?
 * A: No, you don’t have to. But you still have to follow the terms of the
 *    artists(JacSkulls, but few are mine).
 *
 * Q: If I have an issue with your Script, can I complain to you?
 * A: You can give me feedback, yes. I am open for troubleshooting too. Just 
 * be nice.
 *
 * Q: Will the plugin get future updates?
 * A: I plan to do that, yes. Will try to make it easier for work and
 * will try to add new features. But when? Cannot tell. 
 *
 * Q: Can it work for MV?
 * A: Probably can, if the registered plugin commands are removed from the
 * code and one sets timers only via script calls. But didn’t test myself,
 * can’t guarantee it would work even then. And the ammount of code writing
 * for script calls make it worthless.
 *
 * Q: If I have any questions, can I ask you?
 * A: You can. But better post them in the script thread, instead using PM.
 * I might reply a PM, but I might not, depending on the circumstances.
 *
 * JacSkulls Answers
 *
 * Q: If I edit the Art/Picture, can I claim it as mine?
 * A: Yes and no. Yes, you can claim it as yours if you manage to edit it to
 * your view. No, because you still have to credit me. :P Sorry! You can't
 * get rid of me that easily! And hey! At least it's free! :D
 *
 * Q: Do I HAVE to use your picture for the game?
 * A: Not at all! You can create your own and set it up to your view! Simply
 * read the Manual and change the picture the way you want. Must replace the
 * Original Picture with your New Picture. However, the Pixel Sizes matters
 * or it MIGHT rotate wrong! See GGZiron's Manual!
 *
 * Q: Can I ask you to draw something for me?
 * A: Depends! I'm still learning many styles of arts so I can't make any
 * promises to create something from your perspective! Currently, trying
 * to draw Anime type but have a feeling it will take me some time before I
 * can perfect the art! But also, keep in mind, I may not have time as well!
 * Don't worry, I'm brutally honest and I ALWAYS want to see what new things
 * you'll come up with! So don't give up hope and keep up the good work!
 * Your dreams matters!
 *
 * Q: If I have issues with your Art style, can I complain to you?
 * A: PLEASE DO! No, seriously. Please tell me! The more complaints I get on
 * my art, the better I'll become! A lot of time, a Rookie Artist can not see
 * their flaws because they got better than before! And that doesn't mean they
 * officially became the best! Yes, I'll say things like "Oh that? I purposely
 * made it bigger to demonstrate this or that!" But depending, I'll also ask
 * things like "Okay, can you explain to me why it's too big or small?"
 * The reason for asking these questions is for the purpose of correcting my
 * mistakes and getting better! I'll say it once more! PLEASE TELL ME!
 *
 * Q: If I have any questions, can I ask you?
 * A: You just did! :D But in all seriousness, feel free to ask me anything!
 * But always remember, I have my life to live so I may not get to you right
 * away. Like you, I'm human. I make mistakes like everyone else but I always
 * try my best to make sure to help when I can.
 *
 * -------------------------------------------------------------------------
 *                             Plugin Parameters
 * -------------------------------------------------------------------------
 * 
 * The plugin have only one paremeter: FPS.
 * This parameter doesn't set the game's frame per second, but lets my time
 * sistem to how many frames are in one real second. 
 * Do not change, unless the frames per second the game work is changed too,
 * via other plugin.
 *
 * -------------------------------------------------------------------------
 *                                  Timer
 * -------------------------------------------------------------------------
 * There is plugin command “Create Timer”, associated with my script. It has
 * many parameters needed to set it, but they have default values.
 *
 * - Name: Must be unique for every timer. Timer with same name as previous 
 *   timer will replace it.
 *
 * - Months: Data structure that contain all the months. It have default
 *   value that you can use as reference. Do not leave the month structure
 *   empty. Unlike previous version, empty input will not generate default
 *   months, but will crash the game.
 * 
 * - Seasons: Use the default value as reference. If you do not want to
 *   have seasons, you can delete all season inputs. But do not clear
 *   the season data structure itself, or that will crash the game. The
 *   starting date of season needs to be in valid month, and within 
 *   the base days of that said month (on default settings, 29 February
 *   would be illegal start of month).
 *	 
 * - Speed: determines how fast clock will go. Set to 1 if you want close 
 *   to real-life clock speed, set to 60 if you want one in-game minute to 
 *   be equal to one real life second. Can be decimal too. The speed is 
 *   actually timer seconds per real second rate(given that the game runs
 *   with 60 fps without lags). Set to 10, and you get ten timer seconds 
 *   for one real second. The value of the second is updated according the 
 *   refresh rate.
 *
 * - In-Day Periods: When setting this plugin, that how I named the parts
 *   of the day (Morning, Noon, Evening etc). If none set, timer will assign
 *   one empty, and it will never change. Refer to default value how to set
 *   one. Not providing inputs would create one single day period with 
 *   empty string for name. You can provide empty input, but do not clear
 *   the data structure itself.
 *
 * - Seasonal Influence: Set of rules, that influence the In-Day periods
 *   length according the current season. For reference how it works,
 *   look the default value. You can provide empty input, but do not 
 *   clear the data structure itself. 
 *
 * - Refresh Rate: Determines how often per real second the timer updates 
 *   its value. The value represent per how many frames the timer will 
 *   update, as the FPS is 60 (unless it lags). Smaller number, faster 
 *   refresh rate. Faster refresh rate goes for smoother timer (how smooth 
 *   it will look to the player depends from the Graphic Module’s refresh 
 *   rate too). But faster refresh rate increases the lag factor. Not that 
 *   I noticed any lag even with refresh rate of 1 (every frame), but things 
 *   might pile up if there are other things with big lag factor in your
 *   project. You must provide 1 or bigger. If you don’t, will be set to 30.
 *
 * - Hours per day: Usually they are 24. Unless you create something unique.
 *
 * - Minutes per hour.
 *
 * - Seconds per minute.
 *
 * - Weekdays: Now they are data structure, and you set as many week days
 *   as you want, and set week day full and short name. Those names are not
 *   used in my Graphics, they are for organisation and your own use with
 *   script calls. The week length is determined by how many days you set.
 *   Use default data as reference, if you need anything changed.
 *             
 * - Starting Year: All parameters with starting in their name, serve as
 *   starting point, but pivot point too(you can set date earlier
 *   than the starting.
 *
 * - Starting Month
 *
 * - Starting week day: While my timer try to keep week days correct to days,
 *   it will ask you for the week day, which it lock to initial date.
 *
 * - Starting Day
 *
 * - Starting Hour
 *
 * - Starting Minute
 *
 * - Starting Second
 *
 * - paused : Set to true, if you want the timer to be paused upon creation.
 *            Default value is false
 *
 * -------------------------------------------------------------------------
 *                  Script calls related with a timer
 * -------------------------------------------------------------------------
 *  Timer can be accessed two ways. If from normal script call:
 *
 *  var timer = GGZiron.TimeSystem.geTimer(timerName);
 *  Example: var timer = GGZiron.TimeSystem.geTimer("GGTimer");
 *  
 *  From my plugin command for scritp calls:
 *  var timer = getTimer(timerName);
 *  Example:  var timer = getTimer("GGTimer");
 *
 *  Once you get access to the timer, you can call the following methods: 
 *  The parameters, which are in bold font, you must replace with actual 
 *  value.
 *
 *  timer.getStartingYear(); //returns the starting year.
 *  timer.getCurrentYear(); //Returns the current year.
 *  timer.getStartingMonth(); //Return the starting month, as number.
 *  timer.getCurrentMonth(); //Return the current month, as number.
 *
 *  timer.getCurrentMonthAsObject(); 
 *  Returns the current month, as object. Use that way if you need to 
 *  access the current month’s methods.
 *
 *  timer.getStartingMonthAsObject();
 *  Returns the starting month, as object.
 *
 *  timer.getMonthAsObject(monthId);
 *  For month, provide the desired month’s number, and it will 
 *  return that same month as object.
 *
 *
 *  timer.getDaysPerMonthInYear( monthId, year );
 *  Returns how many days a month in given year have. Useful for date 
 *  validation. Normally months have same number of days any year, but
 *  that not so for February (on default calendar)
 *
 * timer.getDaysPerCurrentMonth();
 * Works similar like the script call above, but does not expect month
 * and year input, and returns for how many days the current month 
 * have in the current year.
 *
 * timer.getCurrentMonthName(); //Returns the current month’s name.
 * timer.getStartingDay() //Returns the starting day of the month.
 * timer.getCurrentDay(); //Returns the current day of the month.
 * timer.getCurrentWeekDay(); //Returns the current week day as number.
 * timer.getCurrentWeekDayName();
 * Returns the current week day as name (string).
 *
 * timer.getCurrentWeekDayShortName();
 * Returns the short name of the current week day. 
 *
 * timer.getCurrentHour(); //Returns the current hour.
 * timer.getCurrentMinute(); //Returns the current minute.
 * timer.getCurrentSecond();
 * Returns the current second, rounded to the lower whole number(floored)
 *
 * timer.getSecondsPerMinute(); //Returns how many seconds a minute have.
 * timer.getMinutesPerHour(); //Returns how many minutes a hour have
 * timer.getHoursPerDay(); //Returns how many hours a day have.
 * timer.getDaysPerWeek(); //Returns how many days a week have.
 *
 * timer.getMonthsPerYear(); //Returns how many months a year have.
 * timer.getCurrentSeason();
 * Returns the current season number(starting from 1). Keep in mind,
 * seasons are sorted by starting date, not by the order you input
 * them in the timer.
 *
 * timer.getCurrentSeasonName();
 * Returns the name of the current season.
 *
 * timer.getSpeed();
 * Returns the game seconds per real seconds rate.
 *
 * timer.getInDayTimeAsString() 
 * //Return hour, minutes and seconds as one string.
 *
 * timer.getInDayPeriod();
 * Returns the current in Day period as id (starting from 1).
 *
 * timer.getInDayPeriodName(): 
 * Returns the current in Day period as name.
 *
 * timer.addChild(otherTimer);
 * The other timer becomes child of the current. While I did wrote 
 * code that tries to protect from some incorrect actions, avoid to 
 * add relationship between two timers that are already in the same
 * relationship tree (avoid adding parent as child, child as parent, 
 * brother or cousin as children, grandparent as children and such things. 
 * There could be something I did not predicted, and that could bring to
 * infinite recursions and the game will freeze. 
 * That is useful, when you want two timers to have different values, but 
 * to run together. Timers within same relationship tree move together, 
 * and only the root(the parent of all timers in the tree) can be paused, 
 * the others move together with the root. The parameter otherTimer must 
 * be replaced with timer object, not timer name.
 * With version 1.2.0, you can do this via plugin command, but the script
 * call still is valid option.
 *
 * timer.addParent(otherTimer);
 * Same as addChild(), but here you add parent to current timer.
 *
 * timer.removeChild(otherTimer);
 * If the otherTimer provided is child of the current, it will be removed. 
 * The removed child timer speed is set to value, that depends of the 
 * parentRate (happens just before the child to be removed from the parent).
 * With version 1.2.0, you can do this via plugin command, but the script
 * call still is valid option.
 *
 * timer.removeParent(); 
 * Same as removeChild(), but here removes the if the provided timer is 
 * parent of the current.
 *
 * timer.setTimerPause(value); 
 * The provided value must be either true or false. If true, timer is paused. 
 * If false, it works. Useful if you want to set the pause depending a 
 * switch value. Will not work, if the accessed timer have parent. Pause 
 * the parent instead. That so for all pause related methods.
 *
 * timer.findRootTimer();
 * In relationship tree, from any timer, that method would return the root
 * timer.
 *
 * timer.switchTimerPause();
 * If timer is paused, it will resume. If it works, it will be paused. 
 * Imagine on/off button of remote control.
 *
 * timer.pause(); //Pauses the timer. If was paused, it stays paused.
 * timer.resume(); //Resumes the timer. If it was working, it keeps working
 * timer.setSpeed(speed); //Sets the seconds to real seconds rate.
 *
 * timer.addSeconds(seconds, ?instantUpdate);
 * Add as many seconds, as provided. Decimal values allowed too.
 * The parameter ?instantUpdate is optional, expects true or false value, 
 * assumes true if not provided. If true, the timer will update instantly 
 * the graphic module with which is associated. That is needed for elements 
 * that normally update gradually, like the sliders in default graphic module.
 *
 * timer.addMinutes(minutes, ?instantUpdate);
 * Add as many minutes, as provided. Decimal values would be floored.
 *
 * timer.addHours(hours, ?instantUpdate);
 * Add as many hours, as provided. Decimal values would be floored.
 * For ?instantUpdate, see timer.addSeconds.
 *
 * timer.addDays(days, ?instantUpdate);
 * Add as many days as provided. Decimal values would be floored. 
 * For ?instantUpdate, see timer.addSeconds.
 *
 * timer.addDaysSetTime(days, hour, minute, second,?instantUpdate);
 * Add as many days, then it set the time. Useful for inn sleeps or for time 
 * jumps that are based on number of days. Hour, minute and second must be 
 * valid. In standard timer, valid minute and second are in the range of 
 * 0 – 59, valid hour is in the range 0 – 23. For ?instantUpdate, see 
 * timer.addSeconds.
 *
 * timer.setDateAndTime(year, monthID, day, hour, minute, second,  
 * ?instantUpdate);
 * 
 * Sets the date, if valid(crashes, if not). It calculates how many days 
 * passed between current date and new date, to set properly the week day, 
 * and the children/parent timers. Sets the in-day time too. If no values 
 * provided, all will assume 0. But if provided, values must be valid.
 * For ?instantUpdate, see timer.addSeconds.
 *
 * timer.setTime(hour, minute, second, ?instantUpdate);
 * Sets the in-day time. If no values provided, all will assume 0. 
 * But if provided, values must be valid. For ?instantUpdate, see 
 * timer.addSeconds.
 *
 * timer.setDate(year, monthID, day,?instantUpdate);
 * Sets the date, if valid(crashes, if not). It calculates how many days 
 * passed between current date and new date, to set properly the week day, 
 * and the children/parent timers. For ?instantUpdate, see timer.addSeconds.
 * 
 * timer.calculatePassedDays(year, monthID, day);
 * Returns how many days passed from starting date (which serves as pivot 
 * point too) and the provided date. My timer system use that function for 
 * several other methods, but if you think you might need it too, it is 
 * there. If no year, month and day provided, assume current year, month
 * and day.
 *
 * timer.extractTimeValue(year, monthID, day, hour, minute, second);
 * Returns a really large number. Each of the parameters, if you do not 
 * provide, it will be assumed the current value of it(current hour, minute, 
 * second, etc). Useful if you want to check if now is later or earlier than 
 * then, or than given date, without writing complex condition branch that
 * checks all values individually. All the methods with extract in their 
 * names provide value, but only values extracted from same method name are 
 * meant to be compared between each other.
 *
 * timer.extractTimeValueVersionTwo(year, monthID, day, hour, minute, second);
 * Another way to extract time value. Values extracted this way are not meant
 * to be compared with values extracted the way above. Returns smaller numbers,
 * based on passed days since starting date. Changing starting date midpoint 
 * would invalidate values extracted via this method.
 *
 * timer.extractInDayValue(hour, minute, second);
 * Returns in-day value. Useful to say if today is later than given hour, 
 * minute and second, or earlier. If hour, minute and second are not provided, 
 * it will assume the current values.
 *
 * timer.extractInYearValue(monthID, day, hour, minute, second);
 * Returns big number which represents in-year value (date plus in-day). 
 * Useful to say if now is later than given date, or earlier.
 *
 * timer.extractInDateValue(monthID, day);
 * Works similar as the above method, but the number is much smaller and 
 * in-day time value not taken into account.
 * 
 * -------------------------------------------------------------------------
 *                                  Months
 * -------------------------------------------------------------------------
 * Months are now created together with the timer, they are not seperate
 * objects anymore. Now they are data structure coming with the timer.
 *
 * You can set the name and the length of each month individually.
 * The total days of the months determines the year's length.
 *
 * Each Month have Extra day rules, which now are intuitive to
 * fill data structures. If many rules apply at same year, they
 * are applied at same time. Using negative value of one
 * rule can negate positive value of other rule. 
 *
 * Script calls connected with months.
 *
 * Let say you have month object that is named month:
 *
 * month.getBaseDays();
 * Returns the base days of the month. A default February would return 28, 
 * as the 29 th is not base. month. 
 * 
 * month.daysPerMonth(year); 
 * How many days the month will have
 * 
 * month.getMonthName();
 * How many days the month will have in the given year.
 *
 * month.getMonthName();
 * Returns the month name.
 *
 * month.value();
 * A number, bigger or equal to the max days of a month. It just adds all 
 * possible positive extra days to the base days.
 *
 * -------------------------------------------------------------------------
 *                                 Seasons
 * -------------------------------------------------------------------------
 * You create them with the timer, they are one of its parameter, but seasons
 * are objects, and they have this method:
 *
 * season. getName();
 * The name of the season.
 *
 * Nothing too much about them, you get the current season via the timer, if
 * you need it. By themselves, seasons will do nothing. If you want seasons 
 * to affect somehow the gameplay, you should extract current season into 
 * variable, and make it so game behaves accordingly the current season.
 *
 * -------------------------------------------------------------------------
 *               Plugin Command: Timer Command
 * -------------------------------------------------------------------------
 * This plugin command tries to make somewhat easier to use time progression
 * commands. Thougth, it have its limitations compared to script call
 * approach, in some situations might be handy.
 *
 * It have the following parameters:
 *
 * - Timer's Name: Used to find the timer, from which you are going to
 *   extract value. Incorect name lead to crash, but if you provide empty
 *   string for name, it will return the first timer. That behaivior is set
 *   so for those who are not going to make more than one timer, so they
 *   will not need to bother with timer names every time.
 *
 * - Command: Select between large list of timer related command you want
 *   to execute. They all have list of parameters. Provide the parameters
 *   in the same order they are required. All of the parameters input are 
 *   numbers ,One of them is the optional ?instantUpdate, which expects 
 *   boolean true or false value. Since parameters are numbers, you
 *   can set 1 or ignore for true, set 0 for false. If you input invalid 
 *   command, error message will appear.
 *   
 * - Parameters: Array of data structure: parameter. Provide them in the
 *   same order they are required. If no parameter is required, do not 
 *   provide. Every parameter have 3 fields: raw value, variable and
 *   source. The source is select button, via which you can
 *   choice if you are going to use raw value or variable value.
 *   By defailt, it is raw value(you do not need to change it
 *   unless you need to use variable value for parameter).
 *   In Raw Value field you input the value you want to provide,
 *   if you are going to use Raw Value. It will be ignored if you
 *   set the source to variable.
 *   The Variable selects Game Variable, which value you are going
 *   to pass as parameter. If the source is Raw Value, the Variable
 *   will be ignored. If you input invalid parameters structure, error
 *   message will appear.
 *
 *   You can look in the demo project how I set that, or experiment yourself
 *   until you figure it out.
 *
 * -------------------------------------------------------------------------
 *               Plugin Command: Module Command
 * -------------------------------------------------------------------------
 * Works same way as "Plugin Command: Timer Command", but here the commands
 * are module related. The parameters work same way.
 * 
 * -------------------------------------------------------------------------
 *               Plugin Command: Extract Timer Data To Variable
 * -------------------------------------------------------------------------
 * Easy way to extract Timer data into variable. You have to do that
 * every time you are going to use them in condition branch or for other
 * purposes. Failing to do that may result to using outdated time values,
 * that are not anymore accurate. 
 *
 * This plugin command comes with version 1.2.0. Before that this data could
 * be extracted only via script calls(the script calls are still available,
 * and can be seen in the "Script calls related with a timer" section).
 *
 * It have the following parameters:
 *
 * - Timer's Name: Used to find the timer, from which you are going to
 *   extract value. Incorect name lead to crash, but if you provide empty
 *   string for name, it will return the first timer. That behaivior is set
 *   so for those who are not going to make more than one timer, so they
 *   will not need to bother with timer names every time.
 *
 * - Timer's Data: Large selection, where you select what timer data you
 *   need to extract. Some require parameters, which you will provide
 *   in the next parameter. The very selection lists the parameter names
 *   and the order, in which they are expected
 *
 * - Parameters: Work same way as "Plugin Command: Timer Command"
 *
 * - Variable: Select the game variable, where you want the extracted
 *   value to be stored. 
 *
 * After executing this pluggin command, the extracted value will be
 * stored in the desired Game Variable, so you can use it in your own
 * Event's code.
 *
 * -------------------------------------------------------------------------
 *               Plugin Command: Extract Module Data To Switch
 * -------------------------------------------------------------------------
 * Works on similar way as "Plugin Command: Extract Timer Data To Variable",
 * but here the extracted data is module related, and since all data fields
 * that I give option to be extracted this way, can return either true or
 * false, here the value is stored in switch (when value is true, switch will
 * be On. When value is false, switch will be Off).
 *
 * If you try to extract data for graphic module isHidden, it will return
 * true if is hidden, and false if is not hidden*. 
 * *Note: even when not hidden, possible not to be visible for other reasons.
 * One of them is, if it is destroyed, and yet another: if detached. My 
 * system detaches modules when player is not on Scene Map.
 *
 * -------------------------------------------------------------------------
 *                               Triggers
 * -------------------------------------------------------------------------
 * Triggers are useful tool to activate common event, or game switch (or both) 
 * upon activation. You can create trigger using the Plugin Command.
 * Triggers have seven parameters:
 *
 * - Timer’s name: The name of the timer, to which it would be added. 
 *   Incorect name lead to crash, but if you provide empty
 *   string for name, it will return the first timer. That behaivior is set
 *   so for those who are not going to make more than one timer, so they
 *   will not need to bother with timer names every time.
 *
 * - Trigger type: Selection between seven valid values
 *
 *     - If 'Second Trigger', it gets activated when game second changes its
 *       value. If repeatable, it will activate after every game second. Unless
 *       time runs very slow, not recommended to use that trigger  type. Can
 *       create too big lag factor. 
 *     - If 'Minute Trigger', it gets activated when game minute changes its
 *       value. If speed is such that per one real second pass one or more in 
 *       game minute, such trigger could create some lag factor too, as it will
 *       run at  least once every second.
 *     - If 'Hour Trigger', it gets activated when game hour change its value. 
 *     - If 'In-Day Period Trigger', it gets activated when in-game period
 *       changes its value. 
 *     - If 'Day Trigger', it gets activated when game day changes its value. 
 *     - If 'Month Trigger', it gets activated when game month changes its 
 *       value.
 *     - If 'Season Trigger', it gets activated when game season changes its
 *       value. 
 *     - If 'Year Trigger', it gets activated when game year changes its value.
 *
 * - Common Event Id: common event that will run upon trigger activation. The 
 *   triggers themselves have no condition, other than a given time value to 
 *   change, so if you need more conditions, you have to put them in the 
 *   common event condition branch. Ignores the common event trigger. It runs
 *   only once per trigger activation, as autorun or parallel.
 *
 * - Switch Id: Game switch with the given id will be turned on. Is up to you, 
 *   the game developer, how to use that. But, can be used for parallel event 
 *   that have switch id as trigger. Only that my timer trigger would not 
 *   deactivate the switch, you have to deactivate it inside the parallel
 *   process, if you need it deactivated. Of course, switch can be used for 
 *   something too (to mark that somewhere something already happened, for
 *   example). Set to None(0), if you don’t care about game switches.
 *
 * - Repeatable: True or false. If true, it will keep triggering every time
 *   the given time value changes. If false, once is triggered, it will be
 *   removed. Those that are repeatable can be removed only via script call 
 *   or plugin command, but you would need to provide the triggers’ name. 
 *   Assumed true, if not provided.
 *
 * - Name: Trigger name, needed to remove a trigger, if you want to remove 
 *   it later. The plugin command for remove trigger would ask for the name 
 *   of the trigger which you want to remove.
 *
 * Other useful notes: The change margin doesn’t matter. You may leap five 
 * years ahead using setDate(), but your repeatable day trigger would 
 * activate only once.
 *
 * Value seemingly being the same will still activate the trigger. Means if 
 * you leap 24 hours ahead, displayed hour will be same, but that will be 
 * considered an hour change, and hour triggers would activate.
 *
 * For season change and in-day period change, trigger is activated only 
 * when the value is different. Means if you jumped exactly 24 hours ahead
 * and land in same in-day period, the in-day period trigger would not
 * activate. If you jump 3 years from current date, and land on exactly 
 * the same season, the season trigger would not activate.
 *
 * There is a plugin command to remove trigger. Repeatable triggers could be 
 * removed only by doing it this way.
 *
 * For Timer name, you have to provide the timer, within which it will look 
 * for the trigger. Same as with Inserting Trigger, invalid name will lead
 * to crash, but if is empty string for name, will get the first timer.
 * 
 * For trigger name, you type the name of trigger you want 
 * to be removed. The same name you used when setting the trigger. If there
 * are more triggers than one with the same name, all would be removed. If 
 * you put in no trigger name, it would delete all unnamed triggers. Here, 
 * names should not be inside quotations (unless you set them with quotations, 
 * for some reason). Just as in the picture above.
 *
 * -------------------------------------------------------------------------
 *                    Graphic Module Analogue Clock
 * -------------------------------------------------------------------------
 * The purpose of the graphic module is to display a timer. Without it, the 
 * timer provides only logics that can be accessed via script calls, but the 
 * player will see nothing. My default script has only one graphic module type 
 * that imitates pocket clock. Each module instance can have own graphics, 
 * which gives you the ability to create more modules, each with own specific
 * design. Keep in mind the module is resource demanding (especially if higher 
 * refresh rate), so maybe not wise to make too many of them (if more than one,
 * ever). 
 *
 * The graphic module haves its limitations. For example, you cannot make
 * it display full year, only the last two digits. I might, or might not, 
 * add additional graphic modules that display things differently. If the
 * timer’s set of parameters doesn’t seem big enough, then perhaps the graphic
 * module it will. And based on feedbacks, I might extend it even further in 
 * newer versions. Graphic module can be accessed via scritp call too:
 *
 * let module = getModule(name)
 * Short version, working only within my plugin command, that allows
 * to write script call.
 *
 * let module = GGZiron.TimeSystem.getModule(name)
 * The full version, working everywhere.
 *
 * The module offers the following methods:
 *
 * module.show();
 * Make module visible. If was minimized though, only the min-max icon would 
 * appear. Useful to show it again after cut scene, in which you hid it.
 *
 * module.hide();
 * Fully hides a graphic module. Even the min-max icon goes. Used when you
 * want to fully hide a timer for a cut scene, or when the timer shouldn’t be
 * displayed for the player.
 *
 * module.minimize();
 * Minimizes graphic module. Player can maximize it again, when clicking on
 * Min/Max button.
 *
 * module.maximize();
 * Maximises(shows) graphic module. Player can manimize it again, when
 * clicking on Min/Max button.
 *
 * module.destroy();
 * Destroys all the graphical assets that the module uses. For the player,
 * it might look like you just hid it. Not sure if you should ever use this.
 *
 * module.rebuild();
 * Does the opposite of destroy. A module stores its initializing arguments, 
 * and using them, it generates new graphical assets, and appears again
 * (unless is set to be hidden).
 *
 * module.isHidden();
 * Returns true if the module is hidden, false if is not. Module that is 
 * minimized via the Minimize icon are not considered hidden, as they are
 * still within player’s control to hide and show. Truly hidden module is
 * not within player’s direct control to show or hide.
 *
 * module.isMinimized(); //Returns true if module is minimized.
 * module.setSliders(); //Instantly set all sliders to their actual position.
 *
 * module.isDestroyed(); //Returns true if module is currently destroyed.
 *
 * module.getTimerName(); 
 * Returns the name of the timer, which the module currently serves.
 *
 * module.setRefreshRate(refreshRate)
 * Sets new refresh rate for the module.
 *
 * module.setTimer(timer);
 * The module will start to serve the provided timer (you need to provide
 * it as object).
 *
 * module.setTimerByName (timerName);
 * Works same as the method above, but here expects the timer’s name.
 *
 * Parameters when creating graphic module:
 *
 * - Timer Name: the name of the timer, with which you are going to pair the 
 *   module. If none, the module would not display.
 *
 * - Module Name: The module’s name. Needed if you want to access the module 
 *   later, so you can call its methods.
 *
 * - Z Index: In case you need to spawn more graphic modules at once (like 
 *   I do in the demo), and want one to be above another, set it with higher
 *   Z index. If you don’t plan to spawn more than one or don’t care about
 *   who’s above who, just leave it with default value.
 *
 * - Refresh Rate: Determines how often the graphic module would do full 
 *   refresh. The mouse support part is done every frame regardless this 
 *   option. The value determines per how many frames to wait for a refresh.
 *   Smaller value, more refreshes, smoother timer, but increased lag factor.
 *   The graphic module generates bigger lag factor than the timer, when
 *   refreshes too often. Module should not refresh more often than the timer, 
 *   as many refreshes would go for waste (as the timer would update less 
 *   frequently). It affects the sliders speed too (they receive their sliding
 *   ticks more frequently).
 *
 * - Clock Body: A structure, where you select the picture file, also
 *   the x and y coordinates. Those X and Y coordinates are the screen's
 *   x and y.
 *
 * - Clock Smallhand File: Allows you to select file, the clock's small
 *   hand. No coordinates input, the small hang file shares same
 *   coordinates with the clock body.
 *
 * - Clock Bighand File: Allows you to select file, the clock's big
 *   hand. No coordinates input, the small hang file shares same
 *   coordinates with the clock body.
 *
 * - Month Border File: Is not just the border, is the background of 
 *   the month slider. No coordinates input, the border file shares same
 *   coordinates with the months slider.
 *
 * - Week Border File: In default, I use the same file as the month border, 
 *   but it is not mandatory. Background for the week’s slider. No 
 *   coordinates input, the border file shares same coordinates with the 
 *   weekday slider.
 *
 * - Digits Border File: For all the digit sliders. If there is demand for
 *   it, might extend the parameter list so every single digit slider can 
 *   have it’s own background. No coordinates input, the border file shares 
 *   same coordinates as the given digit slider.
 *  
 * - AM/PM Border File: The module shows if it is AM or PM, and that graphic
 *   is the background for it. By default, it uses the same background the
 *   digits have. No coordinates input, the border file shares 
 *   same coordinates as the AM/PM slider.
 *
 * - Months: A structure, where you provide picture file, names, stacked one 
 *   upon another, used as month slider. See the default. The shown portion 
 *   of that picture is determined by two factors. Factor one: The graphics
 *   total height. Factor Two: The timer’s months per year. Divides height
 *   on months per year, and receive how much of it to show. And which part
 *   to show depends of the current month. So, if you create own month slider
 *   file, spread the month names evenly, with the first on the top.
 *   The month object also expects coordinates input, as those coordinates
 *   are relative to the clock (their x0 y0 are the Clock's body x and y).
 *
 * - Week Days: Work same like the months, but shows week days. 
 *   Here, Factor Two is the week's length.
 *
 * - Digits Year One: A digit slider, slowing the senior digit of the current
 *   year (As the module is designed to show only the last two digits of the
 *   current year. In 2031, that would be 3). Expects coordinates, that
 *   are relative to the clock's coordinates.
 *
 * - Digits Year Two File: A digit slider, showing the junior digit of the 
 *   current year. In 2021, that would be 1. Expects coordinates, that
 *   are relative to the clock's coordinates.
 *
 * - Digits Day One: Shows the senior digit for the current month day.
 *   The module is not designed to support timers that have more than
 *   99 days. The default graphic I use for Day one file is different
 *   from other digit sliders, at it have only digits from 0 to 3, as
 *   on default timer a month never reaches 40 days. The Factor Two here
 *   comes from another parameter, that you need to provided → Day One
 *   Scroller Length. Expects coordinates, that are relative to the
 *   clock's coordinates.
 *
 * - Digits Day Two: Shows the junior digit of the current month
 *   day. Expects coordinates, that are relative to the clock's 
 *   coordinates.
 *
 * - AM/PM: The AM/PM slider. Expects coordinates, that are relative
 *   to the clock's coordinates.
 *
 * - MinMax: Used for minimize – maximize icon. Expects coordinates, 
 *   that are relative to the clock's coordinates.
 *
 * - Day One Scroller Length – The Day One is the only digit that have
 *   different length than 10, and the module expect to receive it as
 *   parameter. By default, is 4 (for 0, 1, 2 and 3). All other digit
 *   sliders are hard coded to have length of 10.
 *
 *   Hour Hand laps Per Day: By default, they are two. An hour hand
 *   must make two spins before a day passes. That parameter serves
 *   two purposes: to calculate the rotation’s degree, and for the
 *   AM/PM bar’s scroller length.
 *
 *   Minutes Hand Laps Per Hour: How many the minute hand will spin
 *   per hour. Used for the minute hand rotation degree.
 *
 *   Slider Speed: How fast the slider moves, once a value changes.
 *   Some of the timer functions, like set date, set the slider
 *   instantly, but on normal time flow the slide is gradual.
 *   That speed determines to move the sliders with how many pixels
 *   per tick, but the refresh rate determines how frequent will
 *   get refreshing ticks.
 *
 * - Sound Data For MinMax: A structure of data, that expects 
 *   you to select the sound file, then set the volume, 
 *   the pitch and the pan. 
 *
 * - Hide Module: If set to true, the digital clock will be
 *   hidden after created.
 *
 * As you see, quite big parameter lists. But the MZ intuitive plugin
 * commands capabilities and the default values, you don’t need to
 * change anything, for a module to work (given the default graphic
 * files are on the needed folder). So, while giving you the freedom
 * to change almost anything, you don’t have to even touch it, for it
 * to work. 
 * -------------------------------------------------------------------------
 *                  Plugin Command: Pair Two Timers
 * -------------------------------------------------------------------------
 *
 * This plugin command allows to set parent/child relationship between two
 * timers. That feature previously been supported only via script call.
 * 
 * It expects two parameters:
 *
 * - Parent Timer Name: The name of the parent timer.
 * - Child Timer Name: The name of the child timer.
 *
 * If you do not provide correct timer name either for child or for parent
 * timer, the game will crash with error message. Here empty string will
 * not be assumed to be the first timer, as in other plugin commands.
 
 * The two timers become paired, and the child timer now will get its 
 * ticks from the parent timer. Once two timers are paired, only
 * the parents timer speed matters, as the child's speed get locked
 * on certain rate (that rate is calculated when pairing).
 * 
 * If the two timer's speed cannot devide on each other, they form
 * decimal rate. If devision cannot form accurate decimal, then 
 * the two timers will not run too accurate to each other. 
 *
 * Do not try to pair timers that are already in same relationship tree.
 * There is code that tries to detect that, but don't push it.
 * -------------------------------------------------------------------------
 *                Plugin Command: Disconnect Paired Timers
 * -------------------------------------------------------------------------
 * It expects two parameters:
 *
 * - Parent Timer Name: The name of the parent timer.
 * - Child Timer Name: The name of the child timer.
 * 
 * The two timers if paired, will not be paired anymore. Wrong names provided
 * goes to error message. If timers you try to disconnect are not paired(or
 * you confused which is the parent and which is the child), nothing will
 * happen. 
 *
 * Once two timers are disconnected, the child start getting own ticks, and
 * again using own speed instead the rate compared to parent's speed.
 * 
 * -------------------------------------------------------------------------
 *                      Plugin Command: Script Call
 * -------------------------------------------------------------------------
 * There is plugin command that is associated with my plugin and is named
 * Script Call. Have only one parameter that is multiline text. Inside it,
 * you can type script call just like the normal script call, only 
 * that here some timer related calls have shorter version. 
 *
 * The short version provided bellow work only with my
 * Plugin Command: Script Call
 * 
 * Short version: getTimer(name);
 * Full version:  GGZiron.TimeSystem.getTimer(name);
 * //Returns timer with the given name.
 *
 * Short version: getModule(name);
 * Full version:  GGZiron.TimeSystem.getModule(name);
 * //Returns module with the given name.
 *
 * Short version: setVariable(id, value);
 * Full version:  $gameVariables.setValue(id, value);
 * //Assigns the given value to Game Variable with the given id.
 *
 * Short version: getVariable(id);
 * Full version:  $gameVariables.value(id);
 * //Returns the value of game variable with the given id.
 *
 * Short version: setSwitch(id, value);
 * Full version:  $gameSwitches.setValue(id, value);
 * //Assigns the given value to Game Switch with the given id.
 *
 * Short version: getSwitch(id);
 * Full version:  $gameSwitches.value(id);
 * //Returns the value of game switch with the given id.
 *
 * My script call command is made to save typing for operations involving
 * my timer system. If you prefer to use the normal script call instead,
 * you can just use the longer version. If you want to set condition branch,
 * you can use only the normal script call, engine does not allow plugin
 * commands for script condition branch. If you see the field for script
 * call too small, you can always extract time values to a game variable,
 * or conditional checks to Game Switch, and use that variable or switch in
 * the condition branch.
 *
 * -------------------------------------------------------------------------
 *
 * -------------------------------------------------------------------------
 * If you have some scripting knowledge, and temped to look the code, go ahead.
 * But know functions and methods that I did not provide here, especially those
 * starting with underscore character _, aren’t meant to be used outside my
 * engine’s code. Using them in script call might break the component they are
 * associated with, and there forth everything could go wrong.
 *
 * -------------------------------------------------------------------------
 *                          Possible Wrongdoings
 * -------------------------------------------------------------------------
 *
 * While doing my demo project, encountered several “bugs” that weren’t
 * actually the script fault, but how I set it. Decided to list those, because
 * they puzzled me for a little, and I am the creator of that plugin. So, big
 * chance someone else to be puzzled as well.
 *
 * * Problem: Problem: When creating module, it tells me I just created module
 *   with this name. Creating module with same name will simply replace the
 *   first, but not before the first one already loaded its graphics. If they
 *   are not loaded, the error message is given. But when look in the event
 *   editor, I did it only once.
 * * Reason: The event was autorun, and I forgot to disable the page that
 *   creates the module. So, while is set only once, it runs many times, and
 *   indeed tries to set module with same name again! I edited the plugin error
 *   message to hint about that possibility.
 *
 * * Problem: When jumping one day forward in time, the relative clock (in the
 *   ForestOnline Demo) would point different values, depending if I jumped
 *   from yesterday night, or yesterday morning. That was not acceptable
 *   behavior. 
 * * Reason: I did not pause the time when preparing to jump one day
 *   forward. In result, very possible until the “sleep” even occur, the day
 *   to pass naturally. Then, adding one day would go total of two days ahead
 *   (say it should land on 3rd day, but landed on 4th day instead), and I
 *   failed to notice it. So, the relative clock actually show correct value,
 *   I indeed jumped further in time than intended.
 *
 * * Problem: I expect in 6:30 AM to come the morning, but it doesn’t. So,
 *   is bug!!
 * * Reason: I totally forgot about the seasonal influence, and that the
 *   season was winter. In winter, morning start one hour later. If you don’t
 *   want seasonal influences, you can always remove them. But if you have
 *   them, must keep in mind things behave differently according the season.
 *
 * * Problem: When I deploy the game, the clocks are not there!!
 * * Reason: If you marked the checkbox that tells the program to not include
 *   the unused files, it has no way to know that the files associated with
 *   my clock are not needed. For this one, cannot say for sure if it is not
 *   my plugin fault. Could be it. But for now, you will have either to
 *   manually exclude the unneeded files, or manually to add files associated
 *   with my clock after you deploy the project.
 *
 * I am far from saying that my Time System doesn’t have real bugs, just
 * listing situations which looks like bug, but are actually not.
 *
 * -------------------------------------------------------------------------
 *                                Feedbacks
 * -------------------------------------------------------------------------
 *
 * I would like to hear what you think about my plugin. Can it be improved,
 * does it need more features? Are there bugs you encountered? Does it slow
 * your game, and when? Having incompatibility with other plugins? The last
 * one I can't promise to address, but might do it, if I feel like it (depends
 * how popular is the other plugin, and how much time I have, and if I am able
 * to do it at all).
 *
 * -------------------------------------------------------------------------
 *                            End of help file
 * -------------------------------------------------------------------------
 
 * @param fps
 * @text FPS
 * @type number
 * @desc Do not change value unless you know what you are doing!! Will affect clock's speed.
 * @default 60
 
 * @command createTimer
 * @text Create Timer
 * @desc Creates an active timer.
 *       Be careful with those, making more could cause severe lag.
 
 * @arg timerName
 * @text Timer Name
 * @desc Used to orginize the timers, and to access a timer.
 * @default GGTimer
 
 * @arg months
 * @type struct<month>[]
 * @text Months
 * @desc Months objects carry through, so replace rule is valid even if you create through two different plugin commands.
 * @default ["{\"monthName\":\"January\",\"baseDays\":\"31\",\"extraDayRules\":\"\"}","{\"monthName\":\"February\",\"baseDays\":\"28\",\"extraDayRules\":\"[\\\"{\\\\\\\"onHowManyYears\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"howManyDaysToAdd\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"onHowManyYears\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"howManyDaysToAdd\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"onHowManyYears\\\\\\\":\\\\\\\"400\\\\\\\",\\\\\\\"howManyDaysToAdd\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\"}","{\"monthName\":\"March\",\"baseDays\":\"31\",\"extraDayRules\":\"\"}","{\"monthName\":\"April\",\"baseDays\":\"30\",\"extraDayRules\":\"\"}","{\"monthName\":\"May\",\"baseDays\":\"31\",\"extraDayRules\":\"\"}","{\"monthName\":\"June\",\"baseDays\":\"30\",\"extraDayRules\":\"\"}","{\"monthName\":\"July\",\"baseDays\":\"31\",\"extraDayRules\":\"\"}","{\"monthName\":\"August\",\"baseDays\":\"31\",\"extraDayRules\":\"\"}","{\"monthName\":\"September\",\"baseDays\":\"30\",\"extraDayRules\":\"\"}","{\"monthName\":\"October\",\"baseDays\":\"31\",\"extraDayRules\":\"\"}","{\"monthName\":\"November\",\"baseDays\":\"30\",\"extraDayRules\":\"\"}","{\"monthName\":\"December\",\"baseDays\":\"31\",\"extraDayRules\":\"\"}"] 
 
 * @arg seasons
 * @type struct<season>[]
 * @text Seasons
 * @desc Set the seasons!
 * @default ["{\"seasonName\":\"Spring\",\"startingMonth\":\"3\",\"startingDay\":\"20\"}","{\"seasonName\":\"Summer\",\"startingMonth\":\"6\",\"startingDay\":\"21\"}","{\"seasonName\":\"Autumn\",\"startingMonth\":\"9\",\"startingDay\":\"23\"}","{\"seasonName\":\"Winter\",\"startingMonth\":\"12\",\"startingDay\":\"21\"}"]
 
 * @arg inDayPeriods
 * @type struct<inDayPeriods>[]
 * @text In Day Periods
 * @desc Adds in day periods. Look the manual for more information.
 * @default ["{\"name\":\"Midnight\",\"startingHour\":\"0\",\"startingMinute\":\"0\",\"startingSecond\":\"0\"}","{\"name\":\"Early Morning\",\"startingHour\":\"5\",\"startingMinute\":\"30\",\"startingSecond\":\"0\"}","{\"name\":\"Morning\",\"startingHour\":\"6\",\"startingMinute\":\"30\",\"startingSecond\":\"0\"}","{\"name\":\"Noon\",\"startingHour\":\"12\",\"startingMinute\":\"0\",\"startingSecond\":\"0\"}","{\"name\":\"Afternoon\",\"startingHour\":\"13\",\"startingMinute\":\"0\",\"startingSecond\":\"0\"}","{\"name\":\"Sunset\",\"startingHour\":\"19\",\"startingMinute\":\"10\",\"startingSecond\":\"0\"}","{\"name\":\"Evening\",\"startingHour\":\"20\",\"startingMinute\":\"0\",\"startingSecond\":\"0\"}"]
 
 * @arg seasonalInfluence
 * @type struct<seasonalInfluenceSeason>[]
 * @text Seasonsal Influence
 * @desc Each season can modify the in day period. Look the manual for more information.
 * @default ["{\"seasonName\":\"Spring\",\"influences\":\"[\\\"{\\\\\\\"inDayPeriodName\\\\\\\":\\\\\\\"Sunset\\\\\\\",\\\\\\\"startingHourInfluence\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"startingMinuteInfluence\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startingSecondInfluence\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"inDayPeriodName\\\\\\\":\\\\\\\"Evening\\\\\\\",\\\\\\\"startingHourInfluence\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"startingMinuteInfluence\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startingSecondInfluence\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}","{\"seasonName\":\"Summer\",\"influences\":\"[\\\"{\\\\\\\"inDayPeriodName\\\\\\\":\\\\\\\"Sunset\\\\\\\",\\\\\\\"startingHourInfluence\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"startingMinuteInfluence\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startingSecondInfluence\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"inDayPeriodName\\\\\\\":\\\\\\\"Evening\\\\\\\",\\\\\\\"startingHourInfluence\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"startingMinuteInfluence\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startingSecondInfluence\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}","{\"seasonName\":\"Winter\",\"influences\":\"[\\\"{\\\\\\\"inDayPeriodName\\\\\\\":\\\\\\\"Morning\\\\\\\",\\\\\\\"startingHourInfluence\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"startingMinuteInfluence\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startingSecondInfluence\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"inDayPeriodName\\\\\\\":\\\\\\\"Sunset\\\\\\\",\\\\\\\"startingHourInfluence\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"startingMinuteInfluence\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startingSecondInfluence\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}"]
 
 * @arg speed
 * @type number
 * @decimals 8
 * @text Speed
 * @desc Determines time speed.
 * @default 75
 * @min 1
 
 * @arg timerRefreshRate
 * @type number
 * @text Refresh Rate
 * @desc How many frames to wait before to refresh the timer. Less frames for smoother time counting, but bigger lag factor.
 * @default 5
 * @min 1
 
 * @arg hoursPerDay
 * @type number
 * @text Hours Per Day
 * @desc How many hours the day have.
 * @default 24
 * @min 1
 
 * @arg minutesPerHour
 * @type number
 * @text Minutes Per Hour
 * @desc How many minutes an hour have.
 * @default 60
 * @min 1
 
 * @arg secondsPerMinute
 * @type number
 * @text Seconds Per Minute
 * @desc How many seconds an minute have.
 * @default 60
 * @min 1
 
 * @arg weekDays
 * @type struct<weekDay>[]
 * @text Week Days
 * @desc Put the week days in the correct orday. The number of week days determine the week length.
 * @default ["{\"fullName\":\"Monday\",\"shortName\":\"Mon\"}","{\"fullName\":\"Tuesday\",\"shortName\":\"Tues\"}","{\"fullName\":\"Wednesday\",\"shortName\":\"Wed\"}","{\"fullName\":\"Thursday\",\"shortName\":\"Thur\"}","{\"fullName\":\"Friday\",\"shortName\":\"Fri\"}","{\"fullName\":\"Saturday\",\"shortName\":\"Sat\"}","{\"fullName\":\"Sunday\",\"shortName\":\"Sun\"}"]
 
 * @arg  startingYear
 * @type number
 * @text Starting Year
 * @desc The starting year. Used as pivot point.
 * @default 2020

 * @arg  startingMonth
 * @type number
 * @text Starting Month
 * @desc The starting month. Used as pivot point.
 * @default 1
 * @min 1
 
 * @arg  startingWeekDay
 * @type number
 * @text Starting Week Day
 * @desc The starting week day index (index starting from 1, not from 0).
 *       If real week starts Monday, 3 would produce Wednesday.
 * @default 3
 * @min 1

 * @arg  startingDay
 * @type number
 * @text Starting Day
 * @desc The first day. Used as pivot point.
 * @default 1
 * @min 1
 
 * @arg  startingHour
 * @type number
 * @text Starting Hour
 * @desc Initial hour.
 * @default 6
 * @min 1
 
 * @arg  startingMinute
 * @type number
 * @text Starting Minute
 * @desc Initial minute.
 * @default 0
 * @min 1

 * @arg  startingSecond
 * @type number
 * @text Starting Second
 * @desc Initial second.
 * @default 0
 * @min 1
 
 * @arg  paused
 * @type boolean
 * @text Paused
 * @desc Determines if the timer will be active or paused upon creation. 
 * @default false
 
 * @command createGraphicModuleAnalogClock
 * @text Create Graphic Module Type Analog Clock
 * @desc Creates Graphic module, which show a clock and date
 * according active timer's data.
 
 * @arg timerName
 * @text Timer Name
 * @desc Input the name of timer you created, so the module can pair with it.
 * @default GGTimer
 
 * @arg moduleName
 * @text Module Name
 * @desc Name of the module. Will be needed to access it later.
 * @default PocketClock
 
 * @arg zIndex
 * @text Z Index
 * @type number
 * @desc If you plan to spawn more modules at once and want one to be above other, set it with higher Z.
 * @default 0
 
 * @arg moduleRefreshRate
 * @text Refresh Rate
 * @type number
 * @desc How many frames to wait for refresh. Less frames, smoother visuals, bigger lag factor. 
 * @default 30    

 * @arg clockBody
 * @text Clock Body
 * @type struct<graphicObject>
 * @desc The main graphic, used to create a clock. Uses Real X and Y coordinates.
 * @default {"file":"PocketClock/Clock","xCord":"640","yCord":"2"}
 
 * @arg smallHandFile
 * @text Clock Small Hand File
 * @type file
 * @dir img/
 * @desc The picture for the small hand, which will point the current hour.
 * @default PocketClock/Smallhand
 
 * @arg bigHandFile
 * @text Clock Big Hand File
 * @type file
 * @dir img/
 * @desc The picture for the big hand, which will point the current minute. X and Y are relative to Clock Body.
 * @default PocketClock/Bighand
 
 * @arg monthBorderFile
 * @text Month Border File
 * @type file
 * @dir img/
 * @desc The graphic that will serve as month frame. X and Y are relative to Clock Body.
 * @default PocketClock/MonthsBorder
	 
 * @arg weekBorderFile
 * @text Week Border File
 * @type file
 * @dir img/
 * @desc The graphic that will serve as week frame. X and Y are relative to Clock Body.
 * @default PocketClock/MonthsBorder 
	 
 * @arg digitsBorderFile
 * @text Digits Border File
 * @type file
 * @dir img/
 * @desc The graphic that will serve as digits frame. X and Y are relative to Clock Body.
 * @default PocketClock/NumbersBorder

 * @arg amPmBorderFile
 * @text Am/Pm Border File
 * @type file
 * @dir img/
 * @desc The graphic that will serve as Am/Pm frame. X and Y are relative to Clock Body.
 * @default PocketClock/AmPmBorder
 
 * @arg months
 * @text Months
 * @type struct<graphicObject>
 * @desc The graphic that will show the months within the month scroller. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/Months","xCord":"47","yCord":"33"}
 
 * @arg weekDays
 * @text Week Days
 * @type struct<graphicObject>
 * @desc The graphic that will show the week day within the Week Day scroller. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/WeekDays","xCord":"38","yCord":"45"}

 * @arg digitsYearOne
 * @text Digits Year One
 * @type struct<graphicObject>
 * @desc The graphic that will show the first digit of the current year. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/Numbers","xCord":"38","yCord":"70"}
	
 * @arg digitisYearTwo
 * @text Digits Year Two
 * @type struct<graphicObject>
 * @desc The graphic that will show the second digit of the current year. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/Numbers","xCord":"47","yCord":"70"}		

 * @arg digitsDayOne
 * @text Digits Day One
 * @type struct<graphicObject>
 * @desc The graphic that will show the first digit of the current day of the month. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/Numbers0to3","xCord":"66","yCord":"45"}
    
 * @arg digitsDayTwo
 * @type struct<graphicObject>
 * @text Digits Day Two
 * @desc The graphic that will show the second digit of the current day of the month. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/Numbers","xCord":"75","yCord":"45"}	
	
 * @arg amPm
 * @text Am/Pm
 * @type struct<graphicObject>
 * @desc The graphic that will show the Am/Pm on the slider. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/AmPm","xCord":"62","yCord":"70"}
 
 * @arg minMax
 * @text MinMax
 * @type struct<graphicObject>
 * @desc The graphic that will show the + and - icons. X and Y are relative to Clock Body.
 * @default {"file":"PocketClock/+-","xCord":"103","yCord":"1"}
 
 * @arg dayOneScrollerLenght
 * @text Day One Scroller Lenght
 * @desc How many possible digits for day one. Originaly, they are 4 -> 0, 1, 2, 3
 * @default 4
 
 * @arg dayTwoScrollerLenght
 * @text Day One Scroller Lenght
 * @desc How many possible digits for day two. Unless there is fictional month with less than 10 days, 10 is good.
 * @default 10
 
 * @arg hourHandLapsPerDay
 * @text Hour Hand Laps Per Day
 * @desc How many spins the arrow hand should do within one day. Also determines Am/Pm scroller length.
 * @default 2
 
 * @arg minuteHandLapsPerDay
 * @text Minute Hand Laps Per Day
 * @desc How many spins the arrow hand should do within one day.
 * @default 1
 
 * @arg sliderSpeed
 * @text Slider Speed
 * @desc Determines the sliders speed, but the refresh rate is factor too.
 * @default 1
 
 * @arg minMaxButtonSoundData
 * @text Sound Data For Min Max Button
 * @type struct<soundObject>
 * @desc Set the sound data for Min Max Button
 * @default {"fileName":"Cursor3","soundVolume":"70","soundPitch":"100","soundPan":"0"}
 
 * @arg hideModule
 * @type boolean
 * @text Hide Module
 * @desc Hides module upon creation, if set to true.
 * @default false
 
 * @command timerCommand
 * @text Timer Command
 * @desc Offers couple of commands related to a timer. If parameters required, provide in same order.
 
 * @arg timerName
 * @text Timer's Name
 * @desc The name of the timer, with which this gonna work. If the timer is only one, you can keep empty.
 *
 * @arg command
 * @text Command
 * @desc Select the desired command. Don't forget to provide parameters in the correct order.
 * @type select
 * @option Set Speed (parameters: speed)
 * @value setSpeed
 * @option Pause Timer
 * @value pause
 * @option Resume Timer
 * @value resume
 * @option Switch Timer Pause
 * @value switchTimerPause
 * @option Add Seconds (parameters: seconds, ?instantUpdate)
 * @value addSeconds
 * @option Add Minutes (parameters: minutes, ?instantUpdate)
 * @value addMinutes
 * @option Add Hours (parameters: hours, ?instantUpdate);
 * @value addHours
 * @option Add Days(parameters: days, ?instantUpdate);
 * @value addDays
 * @option Add Days Set Time(parameters: days, hour, minute, second, ?instantUpdate)
 * @value addDaysSetTime
 * @option Set Date And Time(parameters: year, monthID, day, hour, minute, second, ?instantUpdate)
 * @value setDateAndTime
 * @option Set Time(parameters: hour, minute, second, ?instantUpdate )
 * @value setTime
 * @option Set Date(parameters: year, monthID, day, ?instantUpdate)
 * @value setDate
 * @default setDateAndTime
 
 * @arg parameters
 * @text Parameters
 * @type struct<parameter>[]
 * @desc Provide in same order. If there is ?instantUpdate param, can be ignored, or set 0 if false.
 * @default [] 
 
 * @command moduleCommand
 * @text Module Command
 * @desc Offers couple of commands related to module. If parameters required, provide in same order.
 
 * @arg moduleName
 * @text Module's Name
 * @desc The name of the module, with which this gonna work. If the module is only one, you can keep empty.
 
 * @arg command
 * @text Command
 * @desc Select the desired command. Don't forget to provide parameters in the correct order.
 * @type select
 * @option Show Module
 * @value show
 * @option Hide Module
 * @value hide
 * @option Toogle Visibility
 * @value toogleVisibility
 * @option Minimize
 * @value minimize
 * @option Maximise
 * @value maximise
 * @option Set Refresh Rate (parameters: Refresh Rate)
 * @value setRefreshRate
 * @option Destroy
 * @value destroy
 * @option Rebuild
 * @value rebuild
 * @default show
 
 * @arg parameters
 * @text Parameters
 * @type struct<parameter>[]
 * @desc Provide in same order.
 * @default []
 
 * @command extractTimerDataToVariable
 * @text Extract Timer Data To Variable
 * @desc Extracts timer data to variable, which later you can use for your own logics.
 
 * @arg timerName
 * @text Timer's Name
 * @desc The timer, from which you will extract data. If the timer is only one, you can keep empty.
 * @default GGTimer
 
 * @arg timerData
 * @text Timer's Data
 * @desc The data, which you want extracted. If parameters required, provide them in same order.
 * @type select 
 * @option Get Current Year
 * @value getCurrentYear
 * @option Get Current Month
 * @value getCurrentMonth
 * @option Get Current Month As Object
 * @value getCurrentMonthAsObject
 * @option Get Starting Month As Object
 * @value getStartingMonthAsObject
 * @option Get Month As Object(parameters: monthId)
 * @value getMonthAsObject_Prm
 * @option Get Days Per Month In Year(parameters: monthID, year)
 * @value getDaysPerMonthInYear_Prm
 * @option Get Days Per Current Month
 * @value getDaysPerCurrentMonth
 * @option Get Current Month Name
 * @value getCurrentMonthName
 * @option Get Current Day
 * @value getCurrentDay
 * @option Get Current Weekday
 * @value getCurrentWeekDay
 * @option Get Get Current Weekday Name
 * @value getCurrentWeekDayName
 * @option Get Get Current Weekday Short Name
 * @value getCurrentWeekDayShortName
 * @option Get Current Hour
 * @value getCurrentHour
 * @option Get Current Minute
 * @value getCurrentMinute
 * @option Get Current Second
 * @value getCurrentSecond
 * @option Get Current Season Name
 * @value getCurrentSeasonName
 * @option Get Current Season ID
 * @value getCurrentSeason
 * @option Get Speed
 * @value getSpeed
 * @option Get In Day Time As String
 * @value getInDayTimeAsString
 * @option Get In Day Period ID
 * @value getInDayPeriod
 * @option Get In Day Period Name
 * @value getInDayPeriodName
 * @option Calculate Passed Days(parameters: year, monthID, day);
 * @value calculatePassedDays_Prm
 * @option Extract Time Value(parameters: currentTime)
 * @value extractTimeValue
 * @option Extract Time Value Version Two(parameters: currentTime)
 * @value extractTimeValueVersionTwo
 * @option Extract In Day Value(parameters: currentTime)
 * @value extractInDayValue
 * @option Extract In Year Value(parameters: currentTime)
 * @value extractInYearValue
 * @option Extract In Date Value(parameters: currentDate)
 * @value extractInDateValue
 * @option Extract Time Value(parameters: year, monthID, day, hour, minute, second)
 * @value extractTimeValue_Prm
 * @option Extract Time Value Version Two(parameters: year, monthID, day, hour, minute, second)
 * @value extractTimeValueVersionTwo_Prm
 * @option Extract In Day Value(parameters: hour, minute, second)
 * @value extractInDayValue_Prm
 * @option Extract In Year Value(parameters: monthID, day, hour, minute, second)
 * @value extractInYearValue_Prm
 * @option Extract In Date Value(parameters: monthID, day)
 * @value  extractInDayValue_Prm
 * @default getCurrentHour
 
 * @arg parameters
 * @text Parameters
 * @desc Needed if the timer data you selected requires parameters. Provide them in same order.
 * @type struct<parameter>[]
 * @default []

 * @arg variableId
 * @text Variable
 * @desc The Variable ID will store the extracted data.
 * @type variable
 * @default 1
 
 * @command extractModuleDataToSwitch
 * @text Extract Module Data To Switch
 * @desc Extracts module data to Game Switch, which later you can use for your own logics.
 
 * @arg moduleName
 * @text Module's Name
 * @desc The name of the module, with which this gonna work. If the module is only one, you can keep empty.
 
 * @arg moduleData
 * @text Module's Data
 * @desc The data, which you want extracted.
 * @type select
 * @option Is Hidden?
 * @value isHidden
 * @option Is Minimized?
 * @value isMinimized
 * @option Is Destroyed?
 * @value isDestroyed
 * @default isHidden

 * @arg switchId
 * @text Switch
 * @desc The Switch ID will store the extracted data.
 * @type switch
 * @default 1
 
 * @command insertTrigger
 * @text Insert Trigger
 * @desc Insert trigger to given timer.
 
 * @arg timerName
 * @text Timer's Name
 * @desc The timer, to which you are going to add this trigger. If no timer found, will crash.
 * @default GGTimer
 
 * @arg triggerType
 * @text Trigger Type
 * @type select 
 * @desc See the manual for more info how triggers types work. Default value 4 sets it to activate once per in-game day.
 * @option Second Trigger (not recomended)
 * @value 0
 * @option Minute Trigger
 * @value 1
 * @option Hour Trigger
 * @value 2
 * @option In-Day Period Trigger
 * @value 3
 * @option Day Trigger
 * @value 4
 * @option Month Trigger
 * @value 5
 * @option Season Trigger
 * @value 6
 * @option Year Trigger
 * @value 7
 * @default 4
 
 * @arg commonEventID
 * @text Common Event ID
 * @type common_event
 * @desc The common event, which you want to run upon trigger activation. Make it 0, if you do not want common event to run.
 * @default 1
 
 * @arg eventType
 * @text Event Type
 * @type select 
 * @desc Select between autorun and parallel type of event.
 * @option autorun
 * @value 0
 * @option parallel
 * @value 1
 * @default autorun
 
 * @arg switchId
 * @text Switch
 * @type switch
 * @desc Switch with provided id gets On. Keep 0, if you do not want to activate switch.
 * @default 0
 
 * @arg repeatable
 * @text Repeatable
 * @type boolean
 * @desc If true, it repeats. If false(or any other value), gets deleted after first use.
 * @default true
 
 * @arg triggerName
 * @text Trigger Name
 * @desc If you want to delete a trigger later, you will need it's name. Good to remove repeatable trigger.
 * @default dayTrigger
 
 * @command removeTrigger
 * @text Remove Trigger
 * @desc Remove trigger. Not providing name would attempt to delete unnamed triggers. 
 
 * @arg timerName
 * @text Timer Name
 * @desc The name of the timer, from which you want to remove trigger.
 * @default 
 
 * @arg triggerName
 * @text Trigger Name
 * @desc The name of the trigger you want to remove.
 * @default 
 
 * @command pairTwoTimers
 * @text Pair Two Timers
 * @desc One of the timer becomes child to the other. The rate becomes fixed (according their rate during pairing).
 
 * @arg parentTimerName
 * @text Parent Timer Name
 * @desc Provide valid timer name. This timer will serve like parent clock.
 
 * @arg childTimerName
 * @text Child Timer Name
 * @desc Provide valid timer name. This timer will be the child.
 
 * @command disconectPairedTimers
 * @text Disconnect Paired Timers
 * @desc Two paired timers will be disconected. If wrong names provided, will crash. If timers not paired, no changes.
 
 * @arg parentTimerName
 * @text Parent Timer Name
 * @desc Provide valid timer name. 
 
 * @arg childTimerName
 * @text Child Timer Name
 * @desc Provide valid timer name. 
 
 * @command timerScriptCall
 * @text Timer Script Call
 * @desc Type the timer related script calls here.

 * @arg scriptCall
 * @text Script Call
 * @type multiline_string
 
 */
/*~struct~parameter:

 * @param rawValue
 * @text Raw Value
 * @desc The parameter will have the value provided here, if source is "Raw Value".
 * @type number
 * @default 0
 * @min -99999
 
 * @param variableId
 * @text Variable
 * @desc The parameter will get value of the Game Variable provided here.
 * @type variable
 * @default 1
 * @min 1
 
 * @param source
 * @text Source
 * @desc Which data source to use? The other one will be ignored. 
 * @type select
 * @option Raw Value
 * @option Variable
 * @default Raw Value
 
 */
/*~struct~month:
 
 * @param monthName
 * @text Month Name
 * @desc The name of the month. There should not be
 *       two months with same name.
 * @default January
 
 * @param baseDays
 * @text Base Days
 * @desc The Base number of days a month have. The extra
 *       days are not included here.
 * @default 31
 
 * @param extraDayRules
 * @type struct<extraDayRules>[]
 * @text Extra Day Rules
 * @desc Set rules for extra day.
  
 */
/*~struct~season:
 
 * @param seasonName
 * @text Season Name
 * @desc The name of the season. 
 
 * @param startingMonth
 * @text Starting Month
 * @desc The number of the starting month (in standard year January would be 1, December would be 12).
 * @type number
 * @default 1
 * @min 1
 
 * @param startingDay
 * @text Starting Day
 * @desc Season's starting day cannot exeed the selected month's base days.
 * @type number
 * @default 1
 * @min 1
 
 */
/*~struct~extraDayRules:

 * @param onHowManyYears
 * @text On How Many Years
 * @desc On how many years this rule apply? 
 * @type number
 * @default 4
 * @min 2
 
 * @param howManyDaysToAdd
 * @text How Many Days To Add
 * @desc Rule with negative day value cancels rule with same positive day value, if both rules apply in same year.
 * @type number
 * @default 1
 * @min -9999999999
 
 */
/*~struct~inDayPeriods:
 
 * @param name
 * @text Name
 * @desc The name of the day-phase. Example: Morning
 
 * @param startingHour
 * @text Starting Hour
 * @type number
 * @desc The starting hour.
 * @min 0
 * @default 0
 
 * @param startingMinute
 * @text Starting Minute
 * @type number
 * @desc The starting minute.
 * @min 0
 * @default 0
 
 * @param startingSecond
 * @text Starting Second
 * @type number
 * @desc The starting second.
 * @min 0
 * @default 0
 
 */
/*~struct~seasonalInfluenceSeason:

 * @param seasonName
 * @text Season Name
 * @desc Must be actual season name given in your settings, to recognize it.
 
 * @param influences
 * @text Influences
 * @type struct<seasonalInfluence>[]
 * @desc Set all influences, assosiated with this season
 
 */
/*~struct~seasonalInfluence:
 
 * @param inDayPeriodName
 * @text In-Day Period Name
 * @desc Must be actual in-day period name given in your settings, to recognize it.
 
 * @param startingHourInfluence
 * @text Starting Hour Influence
 * @type number
 * @desc How much will move the starting hour. Negative value to start earlier, positive value to start later.
 * @default 0
 * @min -99999
 
 * @param startingMinuteInfluence
 * @text Starting Minute Influence
 * @type number
 * @desc How much will move the starting minute. Negative value to start earlier minute, positive value to start later minute.
 * @default 0
 * @min -99999
 
 * @param startingSecondInfluence
 * @text Starting Second Influence
 * @type number
 * @desc How much will move the starting second. Negative value to start earlier second, positive value to start later second.
 * @default 0
 * @min -99999
 
 */
/*~struct~weekDay:

 * @param fullName
 * @text Week Day Name Full
 * @desc Full name of the week day.
 
 * @param shortName
 * @text Week Day Name Short
 * @desc Short name of the week day.
 
 */
/*~struct~graphicObject:

 * @param file
 * @type file
 * @dir img/
 * @text Graphic File
 * @desc Select the graphic file for the current item
 
 * @param xCord
 * @type number
 * @text X Coordinate
 * @desc The X coordinate of the current item
 * @min -99999
 
 * @param yCord
 * @type number
 * @text Y Coordinate
 * @desc The Y coordinate of the current item
 * @min -99999
 
 */
/*~struct~soundObject:

 * @param fileName
 * @text File Name
 * @type file
 * @dir audio/se
 * @desc Determines the sound pitch on button click.
 * @default Cursor3 
 
 * @param soundVolume
 * @text Sound Volume
 * @desc Determines the button volume.
 * @default 70
 
 * @param soundPitch
 * @text Sound Pitch
 * @desc Determines the sound pitch on button click.
 * @default 100
 
 * @param soundPan
 * @text Sound Pan
 * @desc Determines the sound pan on button click.
 * @default 0

*/
// ==================================================================================================================================
//                                                      Timer Constructor
// ==================================================================================================================================
GGZiron.TimeSystem = function(){this.initialize(...arguments);};
//And also, container for static members

// ==================================================================================================================================
//                                                      Plugin Name
// ==================================================================================================================================
GGZiron.TimeSystem.PLUGIN_NAME = "GGZironTimeSystem";
GGZiron.TimeSystem.PluginVersion = '1.2.0'
GGZiron.TimeSystem.FPS = parseInt(PluginManager.parameters(GGZiron.TimeSystem.PLUGIN_NAME).fps) || 60;
// ==================================================================================================================================
//                                                      Method, supporting plugin command
// ==================================================================================================================================
GGZiron.TimeSystem.convertStringToArr = function(label, string){
	 const returnArr = [];
	 while(true){
	 let match = label.exec(string);
		 if (match && match[1]){
		     let subArr = match[1].split(',').map((s)=>s.trim());
		     returnArr.push(subArr);
			 string = string.replace(label, "");
		 } else break;
	 }
	 return returnArr;
};

GGZiron.TimeSystem.makeSoundData = function(aOUnparsed){
	 try{
		 const obj = {}
	     const aO = JSON.parse(aOUnparsed);
	     if (!aO.fileName.trim()) return obj; 
	     obj.name = aO.fileName.trim();
	     obj.volume = (parseInt(aO.soundVolume) || 70);
	     obj.pitch = (parseInt(aO.soundPitch) || 50);
	     obj.pan = (parseInt(aO.soundPan) || 0);
	     return obj;
	 } catch(e){
		 return {};
	 }

};

GGZiron.TimeSystem.createMonth = function(monthData){
	 const monthName = '' + monthData.monthName.trim();
	 const baseDays = parseInt(monthData.baseDays);
	 const extraDaysRules = monthData.extraDayRules ? JSON.parse(monthData.extraDayRules).map(rule => JSON.parse(rule)) : [];
     extraDaysRules.forEach(function(rule){
	     rule.onHowManyYears = parseInt(rule.onHowManyYears) || 1;
	     rule.howManyDaysToAdd = parseInt(rule.howManyDaysToAdd) || 0;
	 });
	 return new GGZiron.TimeSystem.Month(monthName, baseDays, (extraDaysRules.length === 0) ? undefined : extraDaysRules );
};

GGZiron.TimeSystem.seasonalInfluencesSet = function(s){
	 s.influences = JSON.parse(s.influences).map(influence => JSON.parse(influence));
	 s.influences.forEach(i => {
	     i.inDayPeriodName = i.inDayPeriodName.trim();
	     i.startingHourInfluence = parseInt(i.startingHourInfluence) || 0;
	     i.startingMinuteInfluence = parseInt(i.startingMinuteInfluence) || 0;
	     i.startingSecondInfluence = parseInt(i.startingSecondInfluence) || 0;
	});	
};

GGZiron.TimeSystem.graphicObjectAssist = function(gOUnparsed){
	try{
	     let gO = JSON.parse(gOUnparsed);
	     gO.file = 'img/' + gO.file.trim() + '.png';
	     gO.xCord = parseInt(gO.xCord) || 0;
	     gO.yCord = parseInt(gO.yCord) || 0;
	     return gO;
	} catch(e){
		console.log('GGZiron Time System: Upon creation of graphic module, one of the graphic assets couldn\'t be interpreted');
	    return {};
	}
};

GGZiron.TimeSystem.proccessModuleComandParameters = function(params){
     try{	
	     return params
	         .map(param => JSON.parse(param))
		     .map(param => (param.source.trim().toLowerCase() ==='variable') ? 
		         $gameVariables.value(parseInt(param.variableId)): 
		         parseInt(param.rawValue) || 0);
	 } catch (e){
		 throw new Error('GGZiron Time System -> Corupted parameter data provided, when trying to execute Plugin Command.');
	 }
};

// ==================================================================================================================================
//                                                      Plugin Commands
// ==================================================================================================================================
PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "createTimer", 
    function(args){
         const timerName = args.timerName.trim();
	     var speed = parseFloat(args.speed);
	     if (Number.isNaN(speed)) speed = 1;
         const months = GGZiron.Core.JSONParseWithErrorMessage(args.months, 'GGZTimer: Incorect month data provided, when creating new timer!')
		    .map(month => GGZiron.TimeSystem.createMonth(JSON.parse(month))); 
		 if (months.length === 0) throw new Error('GGZTimer: Create at least one month in the month data!');
		 const seasons =  (!!args.seasons.trim()) ?
     		 GGZiron.Core.JSONParseWithErrorMessage(args.seasons, 'GGZTimer: Incorect season data provideed when creating new timer!!')
		     .map(JSON.parse) : [];
		 seasons.forEach(function(season){
			 season.seasonName = season.seasonName.trim();
			 season.startingMonth = parseInt(season.startingMonth) || 1; 
			 season.startingDay = parseInt(season.startingDay) || 1;
		 });
		 const inDayPeriods = (!!args.inDayPeriods.trim()) ? 
		     GGZiron.Core.JSONParseWithErrorMessage(args.inDayPeriods, 'GGZTimer: Incorect day periords data provided when creating new timer!!')
			 .map(JSON.parse) : [];
		 inDayPeriods.forEach(period => {
			 period.name = period.name.trim(); 
			 period.startingHour = parseInt(period.startingHour) || 0;
			 period.startingMinute = parseInt(period.startingMinute) || 0;
			 period.startingSecond = parseInt(period.startingSecond) || 0;
		 });
		 const seasonalInfluence = (!!args.seasonalInfluence.trim()) ? 
		     GGZiron.Core.JSONParseWithErrorMessage(args.seasonalInfluence, 'GGZTimer: Incorect seasonal influence data provided when creating new timer!!')
			 .map(JSON.parse) : [];
			 
		 seasonalInfluence.forEach(GGZiron.TimeSystem.seasonalInfluencesSet);
		 const refreshRate = (parseInt(args.timerRefreshRate) || GGZiron.TimeSystem.FPS);
	     var hoursPerDay = parseInt(args.hoursPerDay);
	     if (Number.isNaN(hoursPerDay) || hoursPerDay < 1) hoursPerDay = 1; 
	     var minutesPerHour = parseInt(args.minutesPerHour);
	     if (Number.isNaN(minutesPerHour) || minutesPerHour < 1) minutesPerHour = 1;
	     var secondsPerMinute = parseInt(args.secondsPerMinute);
	     if (Number.isNaN(secondsPerMinute) || secondsPerMinute < 1) secondsPerMinute = 1;
	     const weekDays = GGZiron.Core.JSONParseWithErrorMessage(args.weekDays, 'GGZTimer: Incorect week days data provided when creating new timer!!')
		    .map(JSON.parse);
		 weekDays.forEach(weekDay => {
		     weekDay.fullName = weekDay.fullName.trim(); 
			 weekDay.shortName = weekDay.shortName.trim();
		 });
		 if (weekDays.length === 0) weekDays.push({fullName: "", shortName: ""});
	     var startingYear = (parseInt(args.startingYear) || 0);
	     var startingMonth = (parseInt(args.startingMonth) || 1);
	     var startingWeekDay = (parseInt(args.startingWeekDay) || 1);
	     var startingDay = (parseInt(args.startingDay) || 1);
	     var startingHour = (parseInt(args.startingHour) || 0);
	     var startingMinute = (parseInt(args.startingMinute) || 0);
	     var startingSecond = (parseInt(args.startingSecond) || 0);
	     var paused = args.paused.trim().toLowerCase == "true";
         new GGZiron.TimeSystem(timerName, (months.length === 0) ? undefined : months, seasons, inDayPeriods, seasonalInfluence,
		     weekDays, hoursPerDay, minutesPerHour, secondsPerMinute, speed, 
			 refreshRate, startingMonth, startingDay, startingYear, startingHour, startingMinute, startingSecond, 
			 startingWeekDay, paused	  
	     );
     }
);

PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "createGraphicModuleAnalogClock", 
     function(args){
	     const timerName = args.timerName.trim();
	     const name = args.moduleName.trim();
	     const clockBody = GGZiron.TimeSystem.graphicObjectAssist(args.clockBody);
	     const smallHandFile = 'img/' + args.smallHandFile.trim() + '.png';
	     const bigHandFile = 'img/' + args.bigHandFile.trim() + '.png';
	     const monthBorderFile = 'img/' + args.monthBorderFile.trim() + '.png';
	     const weekBorderFile = 'img/' + args.weekBorderFile.trim() + '.png';
	     const digitsBorderFile = 'img/' + args.digitsBorderFile.trim() + '.png';
	     const amPmBorderFile = 'img/' + args.amPmBorderFile.trim() + '.png';
	     const months = GGZiron.TimeSystem.graphicObjectAssist(args.months);
	     const weekDays = GGZiron.TimeSystem.graphicObjectAssist(args.weekDays);
	     const digitsYearOne = GGZiron.TimeSystem.graphicObjectAssist(args.digitsYearOne);
	     const digitisYearTwo = GGZiron.TimeSystem.graphicObjectAssist(args.digitisYearTwo);
	     const digitsDayOne = GGZiron.TimeSystem.graphicObjectAssist(args.digitsDayOne);
	     const digitsDayTwo = GGZiron.TimeSystem.graphicObjectAssist(args.digitsDayTwo);
	     const amPm = GGZiron.TimeSystem.graphicObjectAssist(args.amPm);
	     const minMax = GGZiron.TimeSystem.graphicObjectAssist(args.minMax);
		 const zIndex = (parseInt(args.zIndex) || 0);
		 const refreshRate = (parseInt(args.moduleRefreshRate) || 30);
	     const dayOneScrollerLenght = (parseInt(args.dayOneScrollerLenght) || 4);
	     const dayTwoScrollerLenght = (parseInt(args.dayTwoScrollerLenght) || 10);
	     const hourHandLapsPerDay = (parseInt(args.hourHandLapsPerDay) || 2);
	     const minuteHandLapsPerDay = (parseInt(args.minuteHandLapsPerDay) || 1);
	     const sliderSpeed = (parseInt(args.sliderSpeed) || 2);
		 const plusMinusSound = GGZiron.TimeSystem.makeSoundData(args.minMaxButtonSoundData);
	     const module = new GGZiron.TimeSystem.Module_AnalogueClock(
	         timerName, name, zIndex, refreshRate, clockBody, smallHandFile, bigHandFile, monthBorderFile, weekBorderFile,
	         digitsBorderFile, amPmBorderFile, months, weekDays, digitsYearOne, digitisYearTwo,
	         digitsDayOne, digitsDayTwo, amPm, minMax, dayOneScrollerLenght, dayTwoScrollerLenght, 
			 hourHandLapsPerDay, minuteHandLapsPerDay, sliderSpeed, plusMinusSound
	    );
		 if (args.hideModule.trim().toLowerCase() == 'true') module.hide();
     }
);

 PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "timerCommand", 
     function(args){
		 var timerName = args.timerName.trim();
	     const timer = (timerName === "") ? Object.values(GGZiron.TimeSystem._timers)[0] : GGZiron.TimeSystem.getTimer(timerName);
		 if (!timer) throw new Error(`GGZironTimeSystem -> Timer Command -> Failed to find timer with name ${timerName}`);
		 var parameters = [];
		 var command = args.command.trim();
		 try{ 
			 parameters.push(...JSON.parse(args.parameters));
		  	 parameters = GGZiron.TimeSystem.proccessModuleComandParameters(parameters);
		 } catch(e){};
		 if (!timer[command]) throw new Error(`GGZironTimeSystem -> Timer Command -> Invalid Timer Data Requested! Check your plugin command, and do a valid selection.`);
		 timer[command](...parameters);
     }
);

 PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "moduleCommand", 
     function(args){
		 var moduleName = args.moduleName.trim();
	     const module = (moduleName === "") ? Object.values(GGZiron.TimeSystem._modules)[0] : GGZiron.TimeSystem.getModule(moduleName);
		 if (!module) throw new Error(`GGZironTimeSystem -> Module Command -> Failed to find module with name ${moduleName}`);
		 var parameters = [];
		 var command = args.command.trim();
		 try{ 
			 parameters.push(...JSON.parse(args.parameters));
		  	 parameters = GGZiron.TimeSystem.proccessModuleComandParameters(parameters);
		 } catch(e){};
		 if (!module[command]) throw new Error(`GGZironTimeSystem -> Module Command -> Invalid Module Data Requested! Check your plugin command, and do a valid selection.`);
		 module[command](...parameters);
     }
);

 PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "extractTimerDataToVariable", 
     function(args){
		 var variableId = parseInt(args.variableId) || 0;
		 var timerName = args.timerName.trim();
	     const timer = (timerName === "") ? Object.values(GGZiron.TimeSystem._timers)[0] : GGZiron.TimeSystem.getTimer(timerName);
		 if (!timer) throw new Error(`GGZironTimeSystem -> Extract Timer Data To Variable -> Failed to find timer with name ${timerName}`);
		 var parameters = [];
		 var timerData = args.timerData.trim();
		 if (timerData.indexOf('_Prm') >= 0){
			 timerData =  timerData.slice(0, timerData.indexOf('_Prm'));
			 try{ 
			    parameters.push(...JSON.parse(args.parameters));
				parameters = GGZiron.TimeSystem.proccessModuleComandParameters(parameters);
			 } catch(e){};
		 }
		 if (!timer[timerData]) throw new Error(`GGZironTimeSystem -> Extract Timer Data To Variable -> Invalid Timer Data Requested! Check your plugin command, and do a valid selection.`);
		 const value = timer[timerData](...parameters);
		 $gameVariables.setValue(variableId, value);
     }
);

 PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "extractModuleDataToSwitch", 
     function(args){
		 var switchId = parseInt(args.switchId) || 0;
		 var moduleName = args.moduleName.trim();
	     const module = (moduleName === "") ? Object.values(GGZiron.TimeSystem._modules)[0] : GGZiron.TimeSystem.getModule(moduleName);
		 if (!module) throw new Error(`GGZironTimeSystem -> Extract Module Data To Switch-> Failed to find timer with name ${moduleName}`);
		 var parameters = [];
		 var moduleData = args.moduleData.trim();
		 if (moduleData.indexOf('_Prm') >= 0){
			 moduleData =  moduleData.slice(0, moduleData.indexOf('_Prm'));
			 try{ 
			    parameters.push(...JSON.parse(args.parameters));
				parameters = GGZiron.TimeSystem.proccessModuleComandParameters(parameters);
			 } catch(e){};
		 }
		 if (!module[moduleData]) throw new Error(`GGZironTimeSystem -> Extract Module Data To Switch-> Invalid Module Data Requested! Check your plugin command, and do a valid selection.`);
		 const value = module[moduleData](...parameters);
		 $gameSwitches.setValue(switchId, value);
     }
);

PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "insertTrigger", 
     function(args){
		 const timerName = args.timerName.trim();
		 const timer = (timerName === "") ? Object.values(GGZiron.TimeSystem._timers)[0] : GGZiron.TimeSystem.getTimer(timerName);
         if (!timer) throw new Error(`GGZironTimeSystem -> Insert Trigger -> No timer with the given name "${timerName}" is found`);
		 const triggerType = parseInt(args.triggerType);
		 if (isNaN(triggerType)) 
		     throw new Error(`GGZironTimeSystem -> Insert Trigger -> The provided trigger type ${args.triggerType} is not a number`);
		 if (triggerType  < 0 || triggerType > 7) 
		     throw new Error(`GGZironTimeSystem -> Insert Trigger -> Invalid trigger type ${args.triggerType} provided`);
		 const commonEventId = (parseInt(args.commonEventID) || 0);
		 const eventType = parseInt(args.eventType);
		 const switchId = (parseInt(args.switchId) || 0);
		 const repeatable = args.repeatable.trim().toLowerCase() === "true";
		 const triggerName = args.triggerName.trim();
		 const trigger = {
			 commonEventId: commonEventId, eventType: eventType, switchId: switchId, 
		     repeatable: repeatable, name: triggerName
		 };
		 timer._registerTrigger(trigger, triggerType);
		
     }
);

PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "removeTrigger", 
     function(args){
		 const timerName = args.timerName.trim(); 
		 const timer = (timerName === "") ? Object.values(GGZiron.TimeSystem._timers)[0] : GGZiron.TimeSystem.getTimer(timerName);
         if (!timer) throw new Error ("GGZironTimeSystem -> Remove Trigger -> No timer with the given name is found");
         const triggerName = args.triggerName.trim();
		 timer._removeTrigger(triggerName);
     }
);

PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "pairTwoTimers", 
     function(args){
		 const parentTimerName = args.parentTimerName.trim(); 
		 const parentTimer = GGZiron.TimeSystem.getTimer(parentTimerName);
		 const childTimerName = args.childTimerName.trim(); 
		 const childTimer = GGZiron.TimeSystem.getTimer(childTimerName);
		 if (!parentTimer) throw new Error (`GGZironTimeSystem -> Pair Two Timers -> No timer with the name ${parentTimerName} is found!`);
		 if (!childTimer) throw new Error  (`GGZironTimeSystem -> Pair Two Timers -> No timer with the name ${childTimerName} is found!`);
         parentTimer.addChild(childTimer);
     }
);

PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "disconectPairedTimers", 
     function(args){
		 const parentTimerName = args.parentTimerName.trim(); 
		 const parentTimer = GGZiron.TimeSystem.getTimer(parentTimerName);
		 const childTimerName = args.childTimerName.trim(); 
		 const childTimer = GGZiron.TimeSystem.getTimer(childTimerName);
		 if (!parentTimer) throw new Error (`GGZironTimeSystem -> Disconect Paired Timers -> No timer with the name ${parentTimerName} is found!`);
		 if (!childTimer) throw new Error  (`GGZironTimeSystem -> Disconect Paired Timers -> No timer with the name ${childTimerName} is found!`);
         parentTimer.removeChild(childTimer);
     }
);

PluginManager.registerCommand(GGZiron.TimeSystem.PLUGIN_NAME, "timerScriptCall", 
     function(args){
	     const getTimer = function(name){
	         return GGZiron.TimeSystem.getTimer(name);
         }
         const getModule = function(name){
	         return GGZiron.TimeSystem.getModule(name);
         }
	     const setVariable = function(id, value){
		     $gameVariables.setValue(id, value)
	     }
	     const getVariable = function(id){
		     return $gameVariables.value(id);
	     }
	     const setSwitch = function(id, value){
		     $gameSwitches.setValue(id, value);
	     }
	     const getSwitch = function(id){
		     return $gameSwitches.value(id);
	     }
	     eval(args.scriptCall);
     }
);

// ==================================================================================================================================
//                                                      Static members
// ==================================================================================================================================

GGZiron.TimeSystem._timers = {};
GGZiron.TimeSystem._modules = {};
GGZiron.TimeSystem._triggeredAutorunEvents = [];
GGZiron.TimeSystem._triggeredParallelEvents = [];
//Should be avoided to be used directly. Replacing existing timer with
//assigned Graphical module would lead to undestroyed graphics.


GGZiron.TimeSystem.timers = function(){
	 return Object.values(GGZiron.TimeSystem._timers);
};

GGZiron.TimeSystem.modules = function(){
	 return Object.values(GGZiron.TimeSystem._modules);
};

GGZiron.TimeSystem.addModule = function(module){
	 if (GGZiron.TimeSystem._modules[module.name] && module !== GGZiron.TimeSystem._modules[module.name] ){
		 if  (!GGZiron.TimeSystem._modules[module.name].isLoaded()) 
		     throw new Error(
			 `GGZironTimeSystem -> Attempt to replace Graphic module ${module.name} with module of same name, when the first didn't load yet.` +
			 `If you didn't  do so, check if the event that sets the graphic module is autorun or parallel, and if you deactivate it properly.`);
	     GGZiron.TimeSystem._modules[module.name].destroy();
	 }
	 GGZiron.TimeSystem._modules[module.name] = module;
}

GGZiron.TimeSystem.addTimer = function(timer){
	 GGZiron.TimeSystem._timers[timer.name] = timer;
};

GGZiron.TimeSystem.getTimer = function(name){
	 return GGZiron.TimeSystem._timers[name];
};

GGZiron.TimeSystem.getModule = function(name){
	 return GGZiron.TimeSystem._modules[name];
};

GGZiron.TimeSystem.months = {};


GGZiron.TimeSystem.updateTimers = function(){
     GGZiron.TimeSystem.timers().forEach(timer=>timer.update());
};

GGZiron.TimeSystem.updateModules = function(){
     GGZiron.TimeSystem.modules().forEach(module=>module.update());
};

GGZiron.TimeSystem.removeTimer = function(timer){
	 GGZiron.TimeSystem._timers[timer.name].destroyModule();
	 GGZiron.TimeSystem._timers[timer.name] = undefined;
};

GGZiron.TimeSystem.removeTimerByName = function(name){
	 GGZiron.TimeSystem._timers[name].destroyModule();
	 GGZiron.TimeSystem._timers[name] = undefined;
};

GGZiron.TimeSystem.attachModules = function(){
	 GGZiron.TimeSystem.modules().forEach(module=>module.attach());
};

GGZiron.TimeSystem.detachModules = function(){
	 GGZiron.TimeSystem.modules().forEach(module=>module.detach());
};

GGZiron.TimeSystem.destroyModules = function(){
 	 GGZiron.TimeSystem.modules().forEach(module=>module.destroy());
};

GGZiron.TimeSystem.rebuildModules = function(){
	 GGZiron.TimeSystem.modules().forEach(module=>module.rebuild());
};


// ==================================================================================================================================
//                                                      Prototype members
// ==================================================================================================================================
//                                                         Initializer
// ==================================================================================================================================

GGZiron.TimeSystem.prototype.initialize = function(name, months, seasons, inDayPeriods, seasonalInfluence, weekDays, hoursPerDay = 24, 
     minutsPerHour = 60, secondsPerMinute = 60, speed = Math.floor(600/7), refreshRate, startingMonth = 1, startingDay = 1,
	 startingYear = 2020, startingHour = 6, startingMinute = 0, startingSecond = 0, startingWeekDay = 3, paused = false){
	 this._name = name;
	 this._seasonalInfluence = seasonalInfluence || [];
	 this._months = months;
	 this._weekDays = weekDays;
	 this._hoursPerDay = hoursPerDay; this._minutsPerHour = minutsPerHour; this._secondsPerMinute = secondsPerMinute;
	 this._daysPerWeek = this._weekDays.length;
	 this._speed = speed/GGZiron.TimeSystem.FPS; this._frameCounter = 0;
	 this._refreshRate = parseInt(refreshRate);  
	 if (this._refreshRate < 1 || isNaN(this._refreshRate)) this._refreshRate = 30;
	 this._startingYear = startingYear; this._startingMonth = startingMonth; this._startingDay = startingDay;
	 this._startingHour = startingHour; this._startingMinute = startingMinute; this._startingSecond = startingSecond;
	 this._startingWeekDay = startingWeekDay; this._currentWeekDay = startingWeekDay;
	 this._currentYear = startingYear;  this._currentMonth = startingMonth;  this._currentDay = startingDay;
	 this._currentHour = startingHour;  this._currentMinute = startingMinute; this._currentSecond = startingSecond;
	 this._validateStartingValues();
	 this._timerPaused = paused;
	 this._maxMonthValue = this._months.reduce((acc, month) =>(acc < month.value()) ? month.value() : acc, 0);
	 this._yearValue = this._months.reduce((acc, month)=>acc + month.value(), 0);
	 this._initializeSeasons(seasons);
	 this._initializeinDayPeriods(inDayPeriods);
	 this._children = []
	 this._parentName = null;
	 this._parentTimeRate = null;
	 this._triggers = [];
	 this._clearTriggers();
	 GGZiron.TimeSystem.addTimer(this);
};


GGZiron.TimeSystem.prototype._validateStartingValues = function(){
	if (this.getDaysPerCurrentMonth() < this.getCurrentDay() || this.getCurrentDay() < 1) 
	     throw new Error(`Incorect Starting Day ${this.getCurrentDay()} when creating timer`);
	if (this.getCurrentMonth() < 1 || this.getCurrentMonth() > this.getMonthsPerYear()) 
	     throw new Error(`Incorect Starting Month  ${this.getCurrentDay()}when creating timer`);
	if (this.getCurrentWeekDay() < 1 || this.getCurrentWeekDay() > this.getDaysPerWeek()) 
	     throw new Error(`Incorect Starting Week Day ${this.getCurrentWeekDay()} when creating timer`);
};

GGZiron.TimeSystem.prototype._clearTriggers = function(){
	 this._triggers = [[], [], [], [], [], [], [], []];	
};

GGZiron.TimeSystem.prototype._initializeSeasons = function(seasonsArray){
	this._seasons = [];
	 if (seasonsArray === undefined || seasonsArray.length === 0) 
		 seasonsArray = [{seasonName: '', startingMonth: 1, startingDay: 1}];
	 seasonsArray = seasonsArray.filter((season)=> !!season);
	 seasonsArray.sort((sOne, sTwo)=> (sOne.startingMonth === sTwo.startingMonth) ? 
	                                   sOne.startingDay - sTwo.startingDay : sOne.startingMonth - sTwo.startingMonth);
	 //Removing the empty entries, then sorting the season by starting date.
	 seasonsArray.forEach(function(s){ //validating the input data.
		 let sm = s.startingMonth;
		 let sd = s.startingDay;
		 if (sm < 1 || sm > this.getMonthsPerYear()) throw new Error(`GGZironTimeSystem -> initializeSeasons -> Incorect starting month! ${sm}`);
		 if (sd < 1) throw new Error(`GGZironTimeSystem -> initializeSeasons -> Incorect starting day ${sd}! Must be with value 1 or higher.`);
		 if (sd > this._months[sm - 1].getBaseDays()) 
			 throw new Error(`GGZironTimeSystem -> initializeSeasons -> Incorect starting day ${sd}! The given starting month doesn't have as many base days.`);	 
	 }, this);
	 for ( let index in seasonsArray){
		 let nextIndex = (seasonsArray[ parseInt(index) + 1]) ? parseInt(index) + 1 : 0;
		 let name = seasonsArray[index].seasonName;
		 let month = seasonsArray[index].startingMonth;
		 let day = seasonsArray[index].startingDay;
		 this._seasons.push(new GGZiron.TimeSystem.Season(name, month, day) );
	 }
	 this._setCurrentSeason(true);
};

GGZiron.TimeSystem.prototype._initializeinDayPeriods = function(periodsArray){
	 if (!periodsArray || periodsArray.length === 0) 
		 periodsArray = [{name: "", startingHour: 0, startingMinute: 0, startingSecond: 0}];
	 periodsArray.sort(function(periodOne, periodTwo){
		 var perOneValue, perTwoValue;
		 try{
		     perOneValue = this.extractInDayValue(periodOne.startingHour, periodOne.startingMinute, periodOne.startingSecond);
		     perTwoValue = this.extractInDayValue(periodTwo.startingHour, periodTwo.startingMinute, periodTwo.startingSecond);
		 } catch (e){
			 throw new Error(`Incorrect in-day period data for timer '${this.name}'. Usually happens if you provided in-day period with more hour than day have, more minutes than hour have or more seconds than minute have.  `);
		 }
		 return perOneValue - perTwoValue;
	 }.bind(this));
	 this._inDayPeriods = [];
	 periodsArray.forEach(function(period){
		 this._inDayPeriods.push(new GGZiron.TimeSystem.InDay(period.name, period.startingHour, period.startingMinute, period.startingSecond, this));
	 }, this);
      this._determineInDayPeriod();	  
	 this._sortInDayPeriods();
};

GGZiron.TimeSystem.prototype.subObjectsRecoverProto = function(){//used when restoring from save data.
	 this._months.forEach(month=> month.__proto__ = GGZiron.TimeSystem.Month.prototype);
	 this._inDayPeriods.forEach(inDay => inDay.__proto__ = GGZiron.TimeSystem.InDay.prototype);
	 this._seasons.forEach(season => season.__proto__ = GGZiron.TimeSystem.Season.prototype); 
};

// ==================================================================================================================================
//                                                          Setter
// ==================================================================================================================================
Object.defineProperty(GGZiron.TimeSystem.prototype, "name", {
	 get: function() {
         return this._name;
     },
});

// ==================================================================================================================================
//                                                          Getters
// ==================================================================================================================================
GGZiron.TimeSystem.prototype.getStartingYear = function(){
	 return this._startingYear;
};

GGZiron.TimeSystem.prototype.getCurrentYear = function(){
     return this._currentYear;
};

GGZiron.TimeSystem.prototype.getStartingMonth = function(){
     return this._startingMonth;
};

GGZiron.TimeSystem.prototype.getCurrentMonthAsObject = function(){
     return this._months[this._currentMonth - 1];
};

GGZiron.TimeSystem.prototype.getMonthAsObject = function(month){
     return this._months[month - 1];
};

GGZiron.TimeSystem.prototype.getStartingMonthAsObject = function(){
     return this._months[this._startingMonth - 1];
};

GGZiron.TimeSystem.prototype.getDaysPerMonthInYear = function(month, year){
	const monthObj = this._months[month - 1];
	return monthObj.daysPerMonth(year);
};

GGZiron.TimeSystem.prototype.getDaysPerCurrentMonth = function(){
	const monthObj = this.getCurrentMonthAsObject();
	return monthObj.daysPerMonth(this.getCurrentYear());
};

GGZiron.TimeSystem.prototype.getCurrentMonth = function(){
     return this._currentMonth;
};

GGZiron.TimeSystem.prototype.getCurrentMonthName = function(){
     return this._months[this._currentMonth - 1].getMonthName();
};

GGZiron.TimeSystem.prototype.getCurrentDay = function(){
     return this._currentDay;
};

GGZiron.TimeSystem.prototype.getStartingDay = function(){
     return this._startingDay;
};

GGZiron.TimeSystem.prototype.getCurrentWeekDay = function(){
     return this._currentWeekDay;
};

GGZiron.TimeSystem.prototype.getCurrentWeekDayName = function(){
     return this._weekDays[this._currentWeekDay - 1].fullName;
};

GGZiron.TimeSystem.prototype.getCurrentWeekDayShortName = function(){
     return this._weekDays[this._currentWeekDay - 1].shortName;
};

GGZiron.TimeSystem.prototype.getCurrentHour = function(){
     return this._currentHour;
};

GGZiron.TimeSystem.prototype.getCurrentMinute = function(){
     return this._currentMinute;
};

GGZiron.TimeSystem.prototype.getCurrentSecond = function(){
     return Math.floor(this._currentSecond);
};

GGZiron.TimeSystem.prototype.getSecondsPerMinute = function(){
     return this._secondsPerMinute;
};

GGZiron.TimeSystem.prototype.getMinutesPerHour = function(){
     return this._minutsPerHour;
};

GGZiron.TimeSystem.prototype.getHoursPerDay = function(){
     return this._hoursPerDay;
};

GGZiron.TimeSystem.prototype.getDaysPerWeek = function(){
     return this._daysPerWeek;
};

GGZiron.TimeSystem.prototype.getMonthsPerYear = function(){
     return this._months.length;
};

GGZiron.TimeSystem.prototype.getCurrentSeason = function(){
	 return this._currentSeason;
};

GGZiron.TimeSystem.prototype.getCurrentSeasonName = function(){
	 return this._seasons[this.getCurrentSeason() - 1].getName();
};

GGZiron.TimeSystem.prototype.getInDayPeriod = function(){
	 return this._inDayPeriodsRange.current;
};

GGZiron.TimeSystem.prototype.getInDayPeriodName = function(){
	return this._inDayPeriods[this.getInDayPeriod() - 1].getName();
};

GGZiron.TimeSystem.prototype.getSpeed = function(){
	 if (this._parentName && this._parentTimeRate){ 
		 var parent = GGZiron.TimeSystem.getTimer(this._parentName);
         return parent.getSpeed() * (this._parentTimeRate || 1);
	 }
	 else return this._speed * GGZiron.TimeSystem.FPS;
};

GGZiron.TimeSystem.prototype._getSpeed = function(){
	 if (this._parentName && this._parentTimeRate){ 
		 var parent = GGZiron.TimeSystem.getTimer(this._parentName);
         return parent._getSpeed() * this._parentTimeRate;
	 }
	 else return this._speed;
};

GGZiron.TimeSystem.prototype.getInDayTimeAsString = function(showSeconds = true){
	 const h = this.getCurrentHour();
	 const m = this.getCurrentMinute();
	 const s = this.getCurrentSecond();
	 var timeStr = `${(h > 9) ? "" : 0}${h}:${(m > 9) ? "" : 0}${m}`;
	 if (showSeconds) timeStr += `:${(s > 9) ? "" : 0}${s}`;
     return timeStr;
};

// ==================================================================================================================================
//                                                     Support for Seasons
// ==================================================================================================================================
GGZiron.TimeSystem.prototype._setCurrentSeason = function(initializer = false){
	 const seasonOldValue = this._currentSeason
	 this._currentSeason = null;
	 for (const index in this._seasons){
		 const revIndex = this._seasons.length - parseInt(index) - 1;
		 if (this._seasons[revIndex]._isActiveForDate(this.getCurrentMonth(), this.getCurrentDay())){
		     this._currentSeason = revIndex + 1; break;
		 }
	 }
	 if (!this._currentSeason) this._currentSeason = this._seasons.length; 
	 //If none is active, the last is active(activated last year, and not overwriten.
	 if (seasonOldValue != this._currentSeason && !initializer){
	     this._executeTriggers(6);
		 this._updateModulesValue('onSeasonChange');
	     this._sortInDayPeriods();
	 }
};
// ==================================================================================================================================
//                                                     Support for In Day Periods
// ==================================================================================================================================

GGZiron.TimeSystem.prototype._determineInDayPeriod = function(){
	 this._inDayPeriodsRange = {};
	 if (this._inDayPeriods.length === 1) return;
	 for (let reverseIndex = this._inDayPeriods.length - 1; reverseIndex >= 0; reverseIndex--){
		 if (this._inDayPeriods[reverseIndex]._isActive(this)){
			 this._inDayPeriodsRange.current = reverseIndex + 1;
			 break;
		 }
	 }
	 if (!this._inDayPeriodsRange.current) this._inDayPeriodsRange.current = this._inDayPeriods.length;
	 this._inDayPeriodsRange.previous = (this._inDayPeriodsRange.current - 1 || this._inDayPeriods.length);
	 this._inDayPeriodsRange.next = (this._inDayPeriodsRange.current === this._inDayPeriods.length) ? 1 : 
	                                                                      this._inDayPeriodsRange.current + 1;
     																		  
};

GGZiron.TimeSystem.prototype._determineInDayPeriodsIfShould = function(){
	 if (this._inDayPeriods.length === 1) return;
	 let currenTimeValue = this._inDayPeriods[this._inDayPeriodsRange.current - 1].getTimeValue(this);
	 let previousTimeValue = this._inDayPeriods[this._inDayPeriodsRange.previous - 1].getTimeValue(this);
	 let nextTimeValue = this._inDayPeriods[this._inDayPeriodsRange.next - 1].getTimeValue(this);
	 const inDayValue = this.extractInDayValue();
	 var flag = false;
	 if (this._inDayPeriods[this._inDayPeriodsRange.current - 1].getCurrentlySetSeason() !== this.getCurrentSeason())
		 var flag = true;
	 else if (currenTimeValue < nextTimeValue){
		 if (inDayValue < currenTimeValue ||
	         inDayValue >= nextTimeValue) flag = true;
	    }
	 else if(currenTimeValue > nextTimeValue){
         if (inDayValue < currenTimeValue &&
	         inDayValue >= nextTimeValue) flag = true;
	 }		 
     if (flag) {
	     const oldDayPeriod = this._inDayPeriodsRange.current;
	     this._determineInDayPeriod();
         if (oldDayPeriod != this._inDayPeriodsRange.current) {
			 this._executeTriggers(3);
			 this._updateModulesValue('onInDayPeriodChange');
		 }
	 }
};

GGZiron.TimeSystem.prototype._sortInDayPeriods = function(){
	 this._inDayPeriods.sort(function(periodOne, periodTwo){ return periodOne.getTimeValue - periodTwo.getTimeValue;});
};

// ==================================================================================================================================
//                                                   Triggers
//  0 -> Activates every second, 1 -> Activates every minute, 2 -> Activates every hour,   3 ->In-day period changes,
//  4 -> Activates every day,    5 -> Activates every month,  6 -> Activates every season, 7 -> Activates every year.
// ==================================================================================================================================
GGZiron.TimeSystem.prototype._registerTrigger = function(trigger, triggerType){
	 this._triggers[triggerType].push(trigger);
};

GGZiron.TimeSystem.prototype._executeTriggers = function(registerId){			 
	 this._triggers[registerId].forEach((trigger)=>{
		 if(trigger.eventType === 1) {
			 event = new Game_CommonEvent(trigger.commonEventId);
			 if (event){
				 event._interpreter = new Game_Interpreter();
				 event._interpreter.setup(event.list());
				 event.update = function(){ //Overwriting the update for Parallel events that are created here.
					 if (this._interpreter) {
                         if (!this._interpreter.isRunning()) {
                             this._interpreter = null;
							 return;
                         }
                         this._interpreter.update();
                     }
				 }
				 event.trigger = 0;
				 GGZiron.TimeSystem._triggeredParallelEvents.push(event);
			 }
			 
		 }
		 else GGZiron.TimeSystem._triggeredAutorunEvents.push(trigger.commonEventId);  
		 if (trigger.switchId) $gameSwitches.setValue(trigger.switchId, 1);
     }, this);
	 this._triggers[registerId] = this._triggers[registerId].filter((trigger) => trigger.repeatable);
};

GGZiron.TimeSystem.prototype._removeTrigger = function(name){ 
	 this._triggers.forEach(
		function(register, index, obj){
		     obj[index] = register.filter((trigger) => trigger.name !== name);
		 }
	 );
};
// ==================================================================================================================================
//                                                  Set relationship between timers
// ==================================================================================================================================

GGZiron.TimeSystem.prototype.addChild = function(timer){
	 if (this === timer) throw new Error(`GGZironTimeSystem -> AddChild -> Timer ${timer.name} cannot become child of itself`);
	 if (this._isRelative(timer)) throw new Error(`GGZironTimeSystem -> AddChild -> Timer ${timer.name} already is on the tree`);
	 const children = this._children;
	 children.push(timer.name);
     let previousParent = timer._parentName;
     timer._parentName = this.name;;
     if (previousParent){
	     previousParent = GGZiron.TimeSystem.getTimer(previousParent);
		 previousParent._children.splice(previousParent._children.indexOf(timer.name), 1);
	 }
     timer._parentTimeRate = (timer._speed * GGZiron.TimeSystem.FPS)/this.getSpeed();	 
};

GGZiron.TimeSystem.prototype.addParent = function(timer){
     timer.addChild(this);
};

GGZiron.TimeSystem.prototype.removeChild = function(childTimer){
	 const children = this._children;
	 if (children.includes(childTimer.name)){
         childTimer._parentName = null;
		 childTimer._parentTimeRate = null; 
		 children.splice(children.indexOf(childTimer.name), 1);        		 
	 }
};

GGZiron.TimeSystem.prototype.removeParent = function(){
	 if (this._parentName){
	     timer = GGZiron.TimeSystem.getTimer(this._parentName);
 	     timer.removeChild(this);
	 }
};

GGZiron.TimeSystem.prototype.findRootTimer = function(){
	var rootTimer = this;
	parentName = this._parentName;
     while(parentName){
		 rootTimer = GGZiron.TimeSystem.getTimer(parentName);
		 parentName = rootTimer._parentName;
	 }
	 return rootTimer;
};

GGZiron.TimeSystem.prototype._isRelative = function(timer){
     const rootTimer = this.findRootTimer();
	 if (rootTimer === timer) return true;
	 const children = rootTimer._children;
	 while (children.length > 0){
		 let childName = children.pop();
		 let childTimer = GGZiron.TimeSystem.getTimer(childName);
		 if (childTimer === timer) return true;
		 children.push(...childTimer._children);
	 }
	 return false;
};

GGZiron.TimeSystem.prototype._applyFunctionForChildren = function (f){
	 this._children.forEach(
	      function(childTimerName){
			  const timer = GGZiron.TimeSystem.getTimer(childTimerName);
			  if (timer) f.call(this, timer);
		  }, this
     );
};

GGZiron.TimeSystem.prototype._updateRelatives = function(passedSeconds , instantUpdate = false){
	 if(this._parentName) GGZiron.TimeSystem.getTimer(this._parentName)._addSecondsFromRelative(passedSeconds/this._parentTimeRate, this, instantUpdate);
	 this._applyFunctionForChildren(function(child){child._addSecondsFromRelative(passedSeconds * child._parentTimeRate, this, instantUpdate)});
};

// ==================================================================================================================================
//                                                          Update
// ==================================================================================================================================

GGZiron.TimeSystem.prototype.update = function(){
	 if (!(this._timerPaused || this._parentName || $gameMessage.isBusy() || $gameScreen.brightness() < 255)) 
		 this.tickClock();
};

// ==================================================================================================================================
//                                                      Time Management
// ==================================================================================================================================

GGZiron.TimeSystem.prototype.setTimerPause = function(value){
     this._timerPaused = (value) ? value : !this._timerPaused;
};

GGZiron.TimeSystem.prototype.pause = function(){
     this._timerPaused = true;
};

GGZiron.TimeSystem.prototype.resume = function(){
     this._timerPaused = false;
};

GGZiron.TimeSystem.prototype.switchTimerPause = function(){
     this._timerPaused = !this._timerPaused;
};

GGZiron.TimeSystem.prototype.setSpeed = function(speed = 1){
     this._speed = speed/GGZiron.TimeSystem.FPS;	
};

GGZiron.TimeSystem.prototype.tickClock = function(){
	 this._applyFunctionForChildren(function(timer){timer.tickClock();});
     if (!(++this._frameCounter % this._refreshRate)){
	     this._addSeconds();
	     this._frameCounter = 0;
     }
};

GGZiron.TimeSystem.prototype._addSeconds = function(seconds = this._getSpeed() * this._refreshRate){
	 const oldCurrentSecond = this._currentSecond;
	 this._currentSecond += seconds;
     if (this._currentSecond >= this._secondsPerMinute || this._currentSecond < 0){
	 	 let minutesCount = Math.floor(this._currentSecond/this._secondsPerMinute);
		 this._currentSecond -= this._secondsPerMinute * minutesCount;
		 this._addMinutes(minutesCount);
	 }
	 if (Math.floor(oldCurrentSecond + seconds) != Math.floor(this._currentSecond)){
		 this._executeTriggers(0);
		 this._updateModulesValue('onSecondChange');
	     this._determineInDayPeriodsIfShould();
	 }
};

GGZiron.TimeSystem.prototype.addSeconds = function(seconds, instantUpdate = true){
	 if (isNaN(seconds)) return;
	 this._addSeconds(seconds);
	 this._updateRelatives(seconds, instantUpdate);
};

GGZiron.TimeSystem.prototype._addSecondsFromRelative = function(seconds, benefactor, instantUpdate = true){
	 if (this._parentName && this._parentName !== benefactor.name)
		 GGZiron.TimeSystem.getTimer(this._parentName)._addSecondsFromRelative(seconds, this, instantUpdate);
     this._applyFunctionForChildren( function(child){if (child !== benefactor) child._addSecondsFromRelative(child._parentTimeRate * seconds, this, instantUpdate);});
	 this._addSeconds(seconds);
	 if (instantUpdate) this.moduleInstantUpdate();
};

GGZiron.TimeSystem.prototype._addMinutes = function(minutesCount){
	 this._currentMinute += minutesCount;
	 if (this._currentMinute >= this._minutsPerHour || this._currentMinute < 0){
		 var hoursCount = Math.floor(this._currentMinute / this._minutsPerHour);
		 this._currentMinute -= this._minutsPerHour * hoursCount;
		 this._addHours(hoursCount);
	 }
	 if (minutesCount) { 
	     this._executeTriggers(1);
		 this._updateModulesValue('onMinuteChange');
	 } 
};

GGZiron.TimeSystem.prototype.addMinutes = function(minutesCount, instantUpdate = true){
	 if (isNaN(minutesCount)) return;
	 minutesCount = Math.floor(minutesCount);
	 const passedSeconds = minutesCount * this.getSecondsPerMinute();
	 this._addSeconds(passedSeconds);
	 this._updateRelatives(passedSeconds, instantUpdate);
};

GGZiron.TimeSystem.prototype._addHours = function(hoursCount){
	 this._currentHour += hoursCount;
	 if (this._currentHour >= this._hoursPerDay || this._currentHour < 0){
	     var daysCount = Math.floor(this._currentHour / this._hoursPerDay);
	     this._currentHour -= this._hoursPerDay * daysCount;
	     this._addDays(daysCount);
	 }	
     if (hoursCount) { 
	     this._executeTriggers(2);
		 this._updateModulesValue('onHourChange');
	 }
};

GGZiron.TimeSystem.prototype.addHours = function(hoursCount, instantUpdate = true){
	 if (isNaN(hoursCount)) return;
	 hoursCount = Math.floor(hoursCount);
	 const passedSeconds = hoursCount * this.getMinutesPerHour() * this.getSecondsPerMinute();
	 this._addSeconds(passedSeconds);
	 this._updateRelatives(passedSeconds, instantUpdate);
};

GGZiron.TimeSystem.prototype.addDays = function(daysCount, instantUpdate = true){
	 if (isNaN(daysCount)) return;
	 daysCount = Math.floor(daysCount);
	 const passedSeconds = daysCount * this.getHoursPerDay() * this.getMinutesPerHour() * this.getSecondsPerMinute();
	 this._addSeconds(passedSeconds);
	 this._updateRelatives(passedSeconds, instantUpdate);
};

GGZiron.TimeSystem.prototype._accelerateWhenTooManyDays = function(daysCount){
	 while (Math.abs(daysCount) > this._fiveYearsDays){ 
		 // this loop purpose is to accelerate the work with really big numbers.
		 var yearsCount = Math.floor(daysCount/this._fiveYearsDays) * 5;
		 var currentPassedDays = this.calculatePassedDays();
		 this._addYears(yearsCount);
         daysCount += currentPassedDays - this.calculatePassedDays();
         // Even if not too apparent, the code reduces the abs of the big number.
         // If daysCount was less than the actual days per 5 years leap, it would
         // go negative (or positive when traveling back in time), and the code
         // in _addDays() would act as if should travel as many days back, as it surpassed
         // the desired date.		 
	 }
	 return daysCount;
};

GGZiron.TimeSystem.prototype._addDays = function(daysCount){
	 if (isNaN(daysCount)) return;
	 const year = this.getCurrentYear();
	 this._manageWeekDay(daysCount);
	 if (this._fiveYearsDays === undefined)
         this._fiveYearsDays = this.calculatePassedDays(this.getStartingYear() +  5, this.getStartingMonth(), this.getStartingDay());
	 this._currentDay += this._accelerateWhenTooManyDays(daysCount);;
	 var month = this._months[this._currentMonth - 1];
	 var daysPerMonth = month.daysPerMonth(this._currentYear)
	 var monthChangeFlag = false;
	 while (this._currentDay > daysPerMonth){
		 monthChangeFlag = true;
		 this._currentDay -= daysPerMonth;
		 this._currentMonth++;
		 if (this._currentMonth > this.getMonthsPerYear()) {
		     this._currentMonth = 1;
		     this._addYears(1);
		 }
		 month = this._months[this._currentMonth - 1];
		 daysPerMonth = month.daysPerMonth(this._currentYear);
	 }			 	 
	 while(this._currentDay < 1){ 
	     monthChangeFlag = true;
		 this._currentMonth--;
		 if (this._currentMonth < 1) {
		     this._currentMonth = this.getMonthsPerYear();
		     this._addYears(-1);
		 }
		 month = this._months[this._currentMonth - 1];
		 this._currentDay += month.daysPerMonth(this._currentYear);
	 }
	 if (year != this.getCurrentYear) {
		 this._executeTriggers(7);
		 this._updateModulesValue('onYearChange');
	 }
	 this._setCurrentSeason();
	 if (monthChangeFlag) {
		 this._executeTriggers(5);
		 this._updateModulesValue('onMonthChange');
	 }
	 if (Math.abs(daysCount) >= 1) {
		 this._executeTriggers(4);
		 this._updateModulesValue('onDayChange');
	 }
};

GGZiron.TimeSystem.prototype._manageWeekDay = function(daysPassed){
	 this._currentWeekDay += daysPassed;
	 if (this._currentWeekDay <= 0){
		 let timesLess = Math.floor(Math.abs(this._currentWeekDay / this.getDaysPerWeek())) + 1;
		 this._currentWeekDay += this.getDaysPerWeek() * timesLess;
	 }
	 if (this._currentWeekDay > this.getDaysPerWeek()){
	     this._currentWeekDay = this._currentWeekDay % this.getDaysPerWeek();
         if (this._currentWeekDay === 0) this._currentWeekDay = 7;		 
	 } 
};

GGZiron.TimeSystem.prototype._addYears = function(yearsCount){
	 this._currentYear += yearsCount;
};

GGZiron.TimeSystem.prototype.setDateAndTime = function(year, month, day, hour, minute, second, instantUpdate = true){
     this.setDate(year, month, day, instantUpdate);
	 this.setTime(hour, minute, second, instantUpdate);
};

GGZiron.TimeSystem.prototype.addDaysSetTime = function(daysCount, hour, minute, second, instantUpdate = true){
	 if (isNaN(daysCount)) throw new Error("GGZiron->TimeSystem->addDaysSetTime->Incorrect value for days count provided.");
	 this._addDays(Math.floor(daysCount));
	 var passedSeconds = daysCount * this.getHoursPerDay() * this.getMinutesPerHour() * this.getSecondsPerMinute();
	 this._updateRelatives(passedSeconds, instantUpdate);
	 this.setTime(hour, minute, second, instantUpdate);
};

GGZiron.TimeSystem.prototype.setTime = function(hour = 0, minute = 0, second = 0, instantUpdate = true){
	 if (hour < 0) hour = 0; if (minute < 0) minute = 0; if (second < 0) second = 0;
	 var inDayValueBefore = this.extractInDayValue();
	 const oldHour = this.getCurrentHour();
	 const oldMinute = this.getCurrentMinute();
	 const oldSecond = this.getCurrentSecond();
	 this._currentHour =  Math.floor((hour < this.getHoursPerDay()) ? hour : this.getHoursPerDay() - 1);
	 this._currentMinute = Math.floor((minute < this.getMinutesPerHour()) ? minute : this.getMinutesPerHour() - 1);
	 this._currentSecond = (second < this.getSecondsPerMinute()) ? second : this.getSecondsPerMinute() - 1;
	 this._determineInDayPeriodsIfShould(true);
	 if (oldHour !=  this.getCurrentHour())    this._executeTriggers(2);
	 if (oldMinute != this.getCurrentMinute()) this._executeTriggers(1);
	 if (oldSecond != this.getCurrentSecond()) this._executeTriggers(0);
	 const secondsDifference = this.extractInDayValue() - inDayValueBefore;
	 this._updateRelatives(secondsDifference, instantUpdate);
	 if (instantUpdate) this.moduleInstantUpdate();
	 else this._updateModulesValue('onChangeAll');
};

GGZiron.TimeSystem.prototype.setDate = function(year, month = 1, day = 1, instantUpdate = true){
	 if (isNaN(year))  throw new Error(`GGZiron Time System -> Set Date -> Invalid provided year: ${year}.`);
	 if ( (month < 1 || month > this.getMonthsPerYear()) || isNaN(month)) 
	     throw new Error(`GGZiron Time System -> Set Date -> Invalid provided month: ${month}.`);
	 if ((day < 1 || day > this._months[month - 1].daysPerMonth(year)) || isNaN(day)) 
	     throw new Error(`GGZiron Time System -> Set Date -> Invalid provided day ${day}.`);
	 const passedDaysBefore = this.calculatePassedDays();
	 const yearOld = this._currentYear; this._currentYear = year;  
	 const monthOld = this._currentMonth; this._currentMonth = month;
	 const dayOld = this._currentDay; this._currentDay = day; 
	 this._setCurrentSeason();
	 if (yearOld != this._currentYear)  { this._executeTriggers(7); this._executeTriggers(5); this._executeTriggers(4);}
	 else if (monthOld != this._currentMonth) {this._executeTriggers(5); this._executeTriggers(4);}
	 else if (dayOld != this._currentDay)  this._executeTriggers(4);
	 const passedDays = this.calculatePassedDays() - passedDaysBefore;
	 const passedSeconds = passedDays * this.getHoursPerDay() * this.getMinutesPerHour() * this.getSecondsPerMinute();
	 this._manageWeekDay(passedDays);
	 this._updateRelatives(passedSeconds, instantUpdate);
	 if (instantUpdate) this.moduleInstantUpdate();
	 else this._updateModulesValue('onChangeAll');
};

GGZiron.TimeSystem.prototype._updateModulesValue = function(updateMethodName){
	 const gms = GGZiron.TimeSystem.modules().filter(module=>module.getTimerName() === this.name);
	 gms.forEach(module=>module[updateMethodName]());
};

GGZiron.TimeSystem.prototype.moduleInstantUpdate = function(){
	 const gms = GGZiron.TimeSystem.modules().filter(module=>module.getTimerName() === this.name);
	 gms.forEach(module=>module.instantUpdate());
};

GGZiron.TimeSystem.prototype.calculatePassedDays = function(year, month, day){
	 if (!day) day = this.getCurrentDay();
	 if (!month) month = this.getCurrentMonth();
	 if (!year) year = this.getCurrentYear(); 
	 var isDateEarlierThanStarting = this.extractTimeValue(year, month, day) < this.extractTimeValue(this._startingYear, this._startingMonth, this._startingDay);
	 if (isDateEarlierThanStarting)
		 return -this._months.reduce((sum, mon)=>sum + mon._daysBetweenDates(
	         year, month, day, 
		     this._startingYear, this._startingMonth, this._startingDay, this._months.indexOf(mon) + 1),
		     0
	     );
     else
	     return this._months.reduce((sum, mon)=>sum + mon._daysBetweenDates(
	         this._startingYear, this._startingMonth, this._startingDay, 
		     year, month, day, this._months.indexOf(mon) + 1),
		      0
	     );
};

GGZiron.TimeSystem.prototype.extractTimeValue = function(year, month, day, hour, minute, second){
	 if (isNaN(year)) year = this.getCurrentYear();
     const inYearValue = this.extractInYearValue(month, day, hour, minute, second);
	 return year * this._yearValue * this.getHoursPerDay() * this.getMinutesPerHour() * this.getSecondsPerMinute() + inYearValue;
};

GGZiron.TimeSystem.prototype.extractShorterTimeValue = function(year, month, day, hour, minute, second){
     const inDayValue = this.extractInDayValue(hour, minute, second);
	 if (isNaN(day)) day = this.getCurrentDay();
	 if (isNaN(month)) month = this.getCurrentMonth();
	 if (isNaN(year)) year = this.getCurrentYear();
	 if ( month < 1 || month > this.getMonthsPerYear()) 
	     throw new Error (`GGZiron Time System -> extractShorterTimeValue -> Invalid provided month ${month}.`);
	 if (day < 1 || day > this._months[month - 1].value()) 
	     throw new Error(`GGZiron Time System -> extractShorterTimeValue -> Invalid provided day ${day}.`);	 
	 const daysPassed = this.calculatePassedDays(year, month, day);
	 return daysPassed * this.getHoursPerDay() * this.getMinutesPerHour() * this.getSecondsPerMinute() + inDayValue;
};

GGZiron.TimeSystem.prototype.extractInDayValue = function(hour, minute, second){
	 if (isNaN(second)) second = this.getCurrentSecond();
	 if (isNaN(minute)) minute = this.getCurrentMinute();
	 if (isNaN(hour))   hour = this.getCurrentHour();
	 if (second < 0 || second >= this.getSecondsPerMinute()) 
	     throw new Error(`GGZiron Time System -> extractInDayValue -> Invalid provided second ${second}.`);
	 if (minute < 0 || minute >= this.getMinutesPerHour()) 
	     throw new Error(`GGZiron Time System -> extractInDayValue -> Invalid provided minute ${minute}.`);
	 if (hour < 0 || hour >= this.getHoursPerDay()) 
	     throw new Error(`GGZiron Time System -> extractInDayValue -> Invalid provided hour ${hour}.`);
	 return ((hour * this.getMinutesPerHour() + minute) * this.getSecondsPerMinute()) + second;
};

GGZiron.TimeSystem.prototype.extractInYearValue = function(month, day, hour, minute, second){
	 const inDayValue = this.extractInDayValue(hour, minute, second);
	 if (isNaN(day)) day = this.getCurrentDay();
	 if (isNaN(month)) month = this.getCurrentMonth();
	 if ( month < 1 || month > this.getMonthsPerYear()) 
	     throw new Error(`GGZiron Time System -> extractInYearValue -> Invalid provided month ${month}.`);
     if (day < 1 || day > this._months[month - 1].value()) 
	     throw new Error(`GGZiron Time System -> extractInYearValue -> Invalid provided day ${day}.`);	 
     return month * this._maxMonthValue * this.getHoursPerDay() * this.getMinutesPerHour() * this.getSecondsPerMinute() + inDayValue; 	 
};

GGZiron.TimeSystem.prototype.extractDateValue = function(month, day){
	 if (isNaN(day)) day = this.getCurrentDay();
	 if (isNaN(month)) month = this.getCurrentMonth();
	 if ( month < 1 || month > this.getMonthsPerYear()) 
	     throw new Error(`GGZiron Time System -> extractDateValue -> Invalid provided month ${month}.`);
     if (day < 1 || day > this._months[month - 1].value()) 
	     throw new Error(`GGZiron Time System -> extractDateValue -> Invalid provided day ${day}.`);			 
     return month * this._maxMonthValue + day; 	 
};
// ==================================================================================================================================
//                                                      Constructor: Month                          
// ==================================================================================================================================
GGZiron.TimeSystem.Month = function(){
	 this.initialize(...arguments);
};

GGZiron.TimeSystem.Month.prototype.initialize = function(name, days, extraDayRules){
	 this._name = name;
	 this._days = days;
	 this._extraDayRules = extraDayRules;
};

GGZiron.TimeSystem.Month.prototype.getBaseDays = function(){
	 return this._days;
};

GGZiron.TimeSystem.Month.prototype.daysPerMonth = function(currentYear){
	 var extraDay = 0;
	 if (this._extraDayRules){
	     var extraDay = 0;
	     for(const rule of this._extraDayRules){
	         if (currentYear % rule.onHowManyYears === 0) extraDay += rule.howManyDaysToAdd;
	     }
	 }
	 return this._days + extraDay;
};

GGZiron.TimeSystem.Month.prototype.getMonthName = function(){
	 return this._name;
};

GGZiron.TimeSystem.Month.prototype._daysBetweenDates = function(startingYear, startingMonth, startingDay, toYear, toMonth, toDay, monthId){
	 //Always uses starting year, month and day as pivot to calculate how many days passed.
	 //months do not store their position in the data container, which is why it must be provided via monthId.
	
     if (monthId < startingMonth) startingYear++;
     if (monthId > toMonth) toYear--;
  
     var passedDays = (startingMonth === monthId) ? startingDay - 1 : 0;
     if (toMonth === monthId){
	     let monthDays = this.daysPerMonth(toYear);
	     passedDays += (monthDays - toDay + 1) 
     }
     var extraDays = 0;
     if (this._extraDayRules){
         for(const rule of this._extraDayRules){
	         let firstOfExtra = (startingYear % rule.onHowManyYears === 0) ? startingYear : startingYear + (rule.onHowManyYears - startingYear % rule.onHowManyYears);
		     if (firstOfExtra <= toYear){
		         let yearsDifference = toYear - firstOfExtra;
	             let extra = ((yearsDifference + 1)* rule.howManyDaysToAdd)/rule.onHowManyYears;
		         extraDays += (extra < 0)  ? Math.floor(extra) : Math.ceil(extra);  
		     }
	     }
     }
     var yearsDifference = toYear - startingYear;
     return this._days * (yearsDifference + 1) + extraDays - passedDays;
};

GGZiron.TimeSystem.Month.prototype.value = function(){
	//The goal is to return value equal or bigger number than the max days.
	//For the purpose of that function, it doesn't hurt if is actually bigger.
    var ed = (this._extraDayRules) ? 
	         this._extraDayRules.reduce((acc, rule)=> acc + (rule.howManyDaysToAdd > 0 ? rule.howManyDaysToAdd : 0) ,0) : 0;
	//ed takes only the positive values of extra day rules. This way, for default feb it would be 2.
	return this._days + ed;
};

// ==================================================================================================================================
//                                                      Constructor: Season                         
// ==================================================================================================================================
GGZiron.TimeSystem.Season = function(){
	 this.initialize(...arguments);
};

GGZiron.TimeSystem.Season.prototype.initialize = function(name, month, day){
	 this._name = name;
	 this._startingMonth = month;
	 this._startingDay = day;
};

GGZiron.TimeSystem.Season.prototype.getName = function(){
	 return this._name;
};

GGZiron.TimeSystem.Season.prototype._isActiveForDate = function(month, day){
	 if (month >= this._startingMonth){
		 if (!(month === this._startingMonth && day < this._startingDay))
		     return true;
	 }
	 return false;
};

// ==================================================================================================================================
//                                                      Constructor: In Day Periords                         
// ==================================================================================================================================
GGZiron.TimeSystem.InDay = function(){
	 this.initialize(...arguments);
};

GGZiron.TimeSystem.InDay.prototype.initialize = function(name, startingHour, startingMinute, startingSecond, timer){
	 this._name = name;
	 this._startingHourBase = startingHour;
	 this._startingMinuteBase = startingMinute;
	 this._startingSecondBase = startingSecond;
	 this._setTimeValue(timer);
};

GGZiron.TimeSystem.InDay.prototype.getName = function(){
	 return this._name;
};

GGZiron.TimeSystem.InDay.prototype.getCurrentlySetSeason = function(){
	 return this._timerCurrentSeason;
};

GGZiron.TimeSystem.InDay.prototype._setTimeValue = function(timer){
	 this._timerCurrentSeason = timer.getCurrentSeason();
	 this._startingHourCurrent   = this._startingHourBase;
	 this._startingMinuteCurrent = this._startingMinuteBase;
	 this._startingSecondCurrent = this._startingSecondBase;
	 const seasonName = timer.getCurrentSeasonName().toLowerCase();
	 let influences = [];
	 let seasons = timer._seasonalInfluence.filter(function(influence){
	     const seasonName = timer.getCurrentSeasonName().toLowerCase();
		 return seasonName === influence.seasonName.toLowerCase();
	 });
	 for (season of timer._seasonalInfluence){
		 if (seasonName === season.seasonName.toLowerCase()){
			 influences.push(...season.influences);
		 };
	 }
	 influences = influences.filter(function(i){
		 return i.inDayPeriodName.toLowerCase() === this._name.toLowerCase();
	 }, this);
	 if (influences.length > 0){
		 const influence = influences[influences.length - 1]; //if many apply, input mistake. Takes only the last one.
		 this._startingHourCurrent   += influence.startingHourInfluence;
		 this._startingMinuteCurrent += influence.startingMinuteInfluence;
		 this._startingSecondCurrent += influence.startingSecondInfluence;
	 }
	 try {
	     this._timeValue = timer.extractInDayValue(this._startingHourCurrent, this._startingMinuteCurrent, this._startingSecondCurrent); 
	 } catch(e){
		 throw new Error
		 ("GGZironTimer -> InDayPeriod -> Invalid time value provided in starting time or after applying seasonal influence. That leads to this error: " + e);
	 }
};

GGZiron.TimeSystem.InDay.prototype._isActive = function(timer){
	 return this.getTimeValue(timer) <= timer.extractInDayValue();
};

GGZiron.TimeSystem.InDay.prototype.getTimeValue = function(timer){
	 if (!timer) throw new Error ("GGZironTimeSystemInDay -> getTimeValue -> Invalid timer object provided!");
	 if (this._timerCurrentSeason !== timer.getCurrentSeason()) this._setTimeValue(timer);
	 return this._timeValue; 
};


// ==================================================================================================================================
//                                                      Input Control
//                                                     Static Members
// ==================================================================================================================================
GGZiron.TimeSystem.InputControl = {_moduleLockedToMouse: false, _buttonBlockClick: false};
//Whatever modify that to true, must ensure it will eventually
//go back to false.

// ==================================================================================================================================
//                                                         Scene_Map
// ==================================================================================================================================
GGZiron.TimeSystem.SceneMapUpdate      = Scene_Map.prototype.update;
GGZiron.TimeSystem.SceneMapTerminate   = Scene_Map.prototype.terminate;
GGZiron.TimeSystem.isAnyButtonPressed  = Scene_Map.prototype.isAnyButtonPressed;
GGZiron.TimeSystem.createSpriteset     = Scene_Map.prototype.createSpriteset;
GGZiron.TimeSystem.boardForAllTimers   = new Sprite();
GGZiron.TimeSystem.boardForAllTimers.sortableChildren = true;

Scene_Map.prototype.update = function() {
     GGZiron.TimeSystem.updateTimers(); //updates all timers
     GGZiron.TimeSystem.updateModules();
     GGZiron.TimeSystem.SceneMapUpdate.call(this, ...arguments);
};

GGZiron.TimeSystem.SceneMapCreateDisplayObjects = Scene_Map.prototype.createDisplayObjects
Scene_Map.prototype.createDisplayObjects = function() {
     GGZiron.TimeSystem.SceneMapCreateDisplayObjects.call(this, ...arguments);
};

Scene_Map.prototype.createSpriteset = function() {
     GGZiron.TimeSystem.createSpriteset.call(this, ...arguments);
	 this.addChild(GGZiron.TimeSystem.boardForAllTimers);
};

Scene_Map.prototype.terminate = function() {
	 this.removeChild(GGZiron.TimeSystem.boardForAllTimers);
     GGZiron.TimeSystem.SceneMapTerminate.call(this, ...arguments);
};

Scene_Map.prototype.isAnyButtonPressed = function() {
     return GGZiron.TimeSystem.isAnyButtonPressed.call(this) || GGZiron.TimeSystem.InputControl._moduleLockedToMouse || 
	                                                           GGZiron.TimeSystem.InputControl._buttonBlockClick;
};

// ==================================================================================================================================
//                                                        Game Map
// ==================================================================================================================================
GGZiron.TimeSystem.Game_MapSetupAutorunCommonEvent = Game_Map.prototype.setupAutorunCommonEvent;
GGZiron.TimeSystem.Game_MapUpdateEvents            = Game_Map.prototype.updateEvents;

Game_Map.prototype.setupAutorunCommonEvent = function() {
	 const originalResult = GGZiron.TimeSystem.Game_MapSetupAutorunCommonEvent.call(this, ...arguments);
	 for (const commonEvent of $dataCommonEvents) {
		 if (!commonEvent) continue;
		 const tce = GGZiron.TimeSystem._triggeredAutorunEvents;
		 if (tce.includes(commonEvent.id)) {
			 tce.splice(tce.indexOf(commonEvent.id), 1);
             this._interpreter.setup(commonEvent.list);
             return true;
         }
	 }
	 return originalResult;
};

Game_Map.prototype.updateEvents = function() {
	 const commonEvents = GGZiron.TimeSystem._triggeredParallelEvents
	 GGZiron.TimeSystem.Game_MapUpdateEvents.call(this, ...arguments);
	 commonEvents.forEach((commonEvent)=> commonEvent.update());
	 GGZiron.TimeSystem._triggeredParallelEvents  = commonEvents.filter((event)=> !!event._interpreter);
};
// ==================================================================================================================================
//                                                        Data Manager
// ==================================================================================================================================

GGZiron.TimeSystem.makeSaveContents = DataManager.makeSaveContents;
GGZiron.TimeSystem.extractSaveContents = DataManager.extractSaveContents;
GGZiron.TimeSystem.setupNewGame = DataManager.setupNewGame;
GGZiron.TimeSystem.saveGame = DataManager.saveGame;

DataManager.saveGame = function() {
	 var graphicModules = GGZiron.TimeSystem.modules();
  	 var go = graphicModules.map(
	     function(module){
		     var go = module._go;
		     module._go = undefined;	  
		     return go;
	     }
	 );
     var retValue = GGZiron.TimeSystem.saveGame.call(this, ...arguments);
	 for (index in graphicModules){
		 graphicModules[index]._go = go[index];
	 }
	 return retValue;
};

DataManager.makeSaveContents = function() {
     const contents = GGZiron.TimeSystem.makeSaveContents.call(this, ...arguments);
	 contents.GGZTimer  = {};
	 contents.GGZTimer.parallelEvents = GGZiron.TimeSystem._triggeredParallelEvents.
	                         filter((event)=>!!event && event._interpreter).
							 map(function(event){return {id: event._commonEventId, index: event._interpreter._index}; });
     contents.GGZTimer.triggeredAutorunEvents = GGZiron.TimeSystem._triggeredAutorunEvents;							 
	 contents.GGZTimer.timers = GGZiron.TimeSystem._timers;
	 contents.GGZTimer.modules = GGZiron.TimeSystem._modules;
	 contents.GGZTimer.months = GGZiron.TimeSystem.months;
     return contents;
};

DataManager.extractSaveContents = function(contents) {
     GGZiron.TimeSystem.extractSaveContents.call(this, ...arguments);
	 if (contents.GGZTimer) {
		 GGZiron.TimeSystem._triggeredParallelEvents = contents.GGZTimer.parallelEvents.
	         map(function(obj){
			     const event = new Game_CommonEvent(obj.id);
			     event._interpreter = new Game_Interpreter();
			     event._interpreter.setup(event.list());
			     event._interpreter._index = obj.index;
			     event.update = function(){
				     if (this._interpreter) {
                         if (!this._interpreter.isRunning()) {
                             this._interpreter = null;
						     return;
                         }
                     this._interpreter.update();
                 }
			 }
			 event.trigger = 0;
			 return event;
		 });
	     GGZiron.TimeSystem._triggeredAutorunEvents = contents.GGZTimer.triggeredAutorunEvents;
	     GGZiron.TimeSystem.months = contents.GGZTimer.months;
	     GGZiron.TimeSystem.destroyModules();
	     GGZiron.TimeSystem._timers = contents.GGZTimer.timers;
		 Object.values(GGZiron.TimeSystem._timers).forEach(timer =>{
		     timer.__proto__ = GGZiron.TimeSystem.prototype;
		     timer.subObjectsRecoverProto();
	     });
	     GGZiron.TimeSystem._modules = contents.GGZTimer.modules;
		 Object.values(GGZiron.TimeSystem._modules).forEach(
		     module =>{module.__proto__ = GGZiron.TimeSystem.objTypes[module._protObj]; module._destroyed = true;}
		 ); 
	     GGZiron.TimeSystem.rebuildModules();
	 } else GGZiron.TimeSystem.setupTimerMembers();
};

GGZiron.TimeSystem.setupTimerMembers = function(){
	 GGZiron.TimeSystem._triggeredAutorunEvents = [];
     GGZiron.TimeSystem._triggeredParallelEvents = [];
	 GGZiron.TimeSystem.destroyModules();
	 GGZiron.TimeSystem._modules = {};
	 GGZiron.TimeSystem._timers = {};
	 GGZiron.TimeSystem.months = {};
};

DataManager.setupNewGame = function() {
     GGZiron.TimeSystem.setupTimerMembers();
	 GGZiron.TimeSystem.setupNewGame.call(this, ...arguments);
};
// =====================================================================================================================================
//                                                         GGZiron.TimeSystem.Clickable_Sprite
// =====================================================================================================================================

GGZiron.TimeSystem.Clickable_Sprite = function() {
     this.initialize(...arguments);
};

GGZiron.TimeSystem.Clickable_Sprite.prototype = Object.create(GGZiron.Core.ClicableExtended.prototype);
GGZiron.TimeSystem.Clickable_Sprite.prototype.constructor = GGZiron.TimeSystem.Clickable_Sprite;

GGZiron.TimeSystem.Clickable_Sprite.prototype.initialize = function(module){
	 GGZiron.Core.ClicableExtended.prototype.initialize.call(this);
	 this._module = module;
};

GGZiron.TimeSystem.Clickable_Sprite.prototype.getModule = function(){
	 return this._module;
};

GGZiron.TimeSystem.Clickable_Sprite.prototype.onMouseEnter = function(){
	 GGZiron.TimeSystem.InputControl._buttonBlockClick = true;
};

GGZiron.TimeSystem.Clickable_Sprite.prototype.onMouseExit = function(){
	 GGZiron.TimeSystem.InputControl._buttonBlockClick = false;
};

GGZiron.TimeSystem.Clickable_Sprite.prototype.onLeaveWhilePress = function(){
	 this.onClick();
};

// =====================================================================================================================================
//                                                  GGZiron.TimeSystem.Dragable_Sprite
// =====================================================================================================================================

GGZiron.TimeSystem.Dragable_Sprite = function() {
     this.initialize(...arguments);
};

GGZiron.TimeSystem.Dragable_Sprite.prototype = Object.create(GGZiron.Core.ClicableExtended.prototype);
GGZiron.TimeSystem.Dragable_Sprite.prototype.constructor = GGZiron.TimeSystem.Dragable_Sprite;

GGZiron.TimeSystem.Dragable_Sprite.prototype.initialize = function(module){
	 GGZiron.Core.ClicableExtended.prototype.initialize.call(this);
	 this._module = module;
};

GGZiron.TimeSystem.Dragable_Sprite.prototype.update = function(){
	 Sprite_Clickable.prototype.update.call(this, ...arguments);
     this.processTouch();
     if (this._isLocked) {
		 if (GGZiron.TimeSystem.InputControl._moduleLockedToMouse !== this._module.name){
		     this._isLocked = false; return;
		 }
		 if (TouchInput.isReleased()) {
			 this._isLocked = false;
			 GGZiron.TimeSystem.InputControl._moduleLockedToMouse = false;
			 return;
		 }
		 this.drag();
	 }
};

GGZiron.TimeSystem.Dragable_Sprite.prototype.drag = function(){
	     if (this._isLocked && TouchInput.isMoved()){
		     this._module.x = TouchInput.x - this._lockXOffset;
		     this._module.y = TouchInput.y - this._lockYOffset;
		     if (this._module.x < -this.width/2) 
				 this._module.x = Math.floor(-this._module.width/2);
		     if (this._module.x > Graphics.width - this._module.width/2) 
				 this._module.x = Math.floor(Graphics.width - this._module.width/2);
		     if (this._module.y < -this._module.height/2) 
				 this._module.y = Math.floor(-this._module.height/2);
		     if (this._module.y > Graphics.height - this._module.height/2) 
				 this._module.y = Math.floor(Graphics.height - this._module.height/2);
	     }	
}

GGZiron.TimeSystem.Dragable_Sprite.prototype.onPress = function(){
	 if (GGZiron.TimeSystem.InputControl._buttonBlockClick) return;
     this._lockXOffset = TouchInput.x - this._module.x; this._lockYOffset = TouchInput.y - this._module.y;
	 GGZiron.TimeSystem.InputControl._moduleLockedToMouse = this._module.name;
	 this._isLocked = true;
};

GGZiron.TimeSystem.Dragable_Sprite.prototype.getModule = function(){
	 return this._module;
};

// ==================================================================================================================================
//                                                      Graphic Modules
// ==================================================================================================================================
// ==================================================================================================================================
//                                               Graphic Modules Analogue Clock
//                                                         The default
// ==================================================================================================================================
GGZiron.TimeSystem.Module_AnalogueClock = function(){ //The constructor
     this._setup(...arguments);
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._setup = function(timerName, name, zIndex, refreshRate,  
     _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, dayOneScrollerLenght,
	 dayTwoScrollerLenght, hourHandLapsPerDay, minuteHandLapsPerHour, sliderSpeed, plusMinusSoundEffect){
	 this._args = arguments;
	 if (this._isHidden    === undefined) this._isHidden = false;
     if (this._isMinimized === undefined) this._isMinimized = false;
     this._destroyed = false;
	 this._initialized = undefined;
     this._timerName = timerName;
     this.name = name;
	 this._refreshRate = refreshRate;
	 this._plusMinusSoundEffect = plusMinusSoundEffect;
	 this._hourHandLapsPerDay = hourHandLapsPerDay;
	 this._minuteHandLapsPerHour = minuteHandLapsPerHour;
	 this._dayOneScrollerLenght = dayOneScrollerLenght;
	 this._dayTwoScrollerLenght = dayTwoScrollerLenght;
	 this.sliderSpeed = sliderSpeed;
	 this._initializeGraphicalObjects(...arguments);
	 this._ticksUntilRefresh = isNaN(refreshRate) ? 1 : refreshRate; 
     GGZiron.TimeSystem.addModule(this);
	 this._temporaryHidden = false;//used for when fading
	 this._go.mainBoard.hide();//Not using the module's hide method, so to not change this.isHidden. That is temporary hide.
	 this._protObj = 'GGZiron.TimeSystem.Module_AnalogueClock.prototype';
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._initializeGraphicalObjects = function(
     timerName, name, zIndex, refreshRate, clockBodyFile, smallHandFile, bigHandFile, monthBorderFile, weekBorderFile,
	 digitsBorderFile, amPmBorderFile, monthFile, weekDaysFile, digitsYearOneFile, digitsYearTwoFile,
	 digitsDayOneFile, digitsDayTwoFile, amPmFile, minMaxFile)
{
	 this._go = {} //GO -> Graphical Objects
     this._go._bitmaps = {}; //Will hold all bitmaps   
     this._initializeMainGraphicalObjects(clockBodyFile, zIndex, minMaxFile);
	 this._initializeSliders(
	     monthFile, weekDaysFile, digitsYearOneFile, digitsYearTwoFile, 
		 digitsDayOneFile,digitsDayTwoFile, amPmFile
	 );
	 this._initializeSliderBorders(monthBorderFile, weekBorderFile, digitsBorderFile, amPmBorderFile);
	 this._initializeHands(smallHandFile, bigHandFile);
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._initializeMainGraphicalObjects = function(clockBodyFile, zIndex, minMaxFile){
	 const go = this._go;
	 go.mainBoard = new Sprite;
     go.mainBoard.x = clockBodyFile.xCord;
     go.mainBoard.y = clockBodyFile.yCord;
	 go.mainBoard.zIndex = zIndex;
     go.clock = this._makeSpriteElement(clockBodyFile.file, new GGZiron.TimeSystem.Dragable_Sprite(this));
     go.mainBoard.addChild(go.clock);
     this._initializeMinMaxButton(minMaxFile);
     go.mainBoard.addChild(go.minMax);
	 go.sliderFrame = new Sprite();
     go.clock.addChild(go.sliderFrame);
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._initializeMinMaxButton = function(minMaxFile){
	 const go = this._go;
	 go.minMax = this._makeSpriteElement(minMaxFile.file, new GGZiron.TimeSystem.Clickable_Sprite(this)); 
     go.minMax.x = minMaxFile.xCord; this._go.minMax.y = minMaxFile.yCord;
	 go.minMax.onClick = function(){
		 const module = this.getModule();
         if (module._isMinimized) module.maximize();
		 else module.minimize();
		 GGZiron.TimeSystem.InputControl._buttonBlockClick = false;
		 if (module._plusMinusSoundEffect) 
		     AudioManager.playSe(module._plusMinusSoundEffect);
	 }; 
	 go.minMax.onPress = function(){
		 GGZiron.TimeSystem.InputControl._buttonBlockClick = true;
	 }; 
	 go.minMax.onLeaveWhilePress = function(){
		 GGZiron.TimeSystem.InputControl._buttonBlockClick = false;
	 };
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._initializeSliders = function(
         monthFile, weekDaysFile, digitsYearOneFile, digitsYearTwoFile, 
		 digitsDayOneFile, digitsDayTwoFile, amPmFile){
	 const go = this._go;
     go._sliders = []; //Will hold all sliders.
	 go.displayMonths = this._makeTilingElement(monthFile.file, function(timer){return timer.getCurrentMonth() - 1;});
     go._sliders.push(go.displayMonths);
	 go.sliderFrame.addChild(go.displayMonths);
     go.weekDayDisplay = this._makeTilingElement(weekDaysFile.file, function(timer){return timer.getCurrentWeekDay() - 1;});
     go._sliders.push(go.weekDayDisplay);
	 go.sliderFrame.addChild(go.weekDayDisplay);
     go.dayOneDisplay = this._makeTilingElement(digitsDayOneFile.file, function(timer){return Math.floor(timer.getCurrentDay() / 10);});
     go._sliders.push(go.dayOneDisplay);
	 go.sliderFrame.addChild(go.dayOneDisplay);
     go.dayTwoDisplay = this._makeTilingElement(digitsDayTwoFile.file, function(timer){return timer.getCurrentDay() % 10;} );
     go._sliders.push(go.dayTwoDisplay);
	 go.sliderFrame.addChild(go.dayTwoDisplay);
     go.yearOneDisplay = this._makeTilingElement(digitsYearOneFile.file, function(timer){return Math.floor(((timer.getCurrentYear() % 100) / 10));});
     go._sliders.push(go.yearOneDisplay);
	 go.sliderFrame.addChild(go.yearOneDisplay);
     go.yearTwoDisplay = this._makeTilingElement(digitsYearTwoFile.file, function(timer){return timer.getCurrentYear() % 10;});
     go._sliders.push(go.yearTwoDisplay);
	 go.sliderFrame.addChild(go.yearTwoDisplay);
     go.amPmDisplay = this._makeTilingElement(amPmFile.file, 
                             function(timer){
								 return Math.floor(timer.getCurrentHour() / (timer.getHoursPerDay() / this._hourHandLapsPerDay));
							 });
     go._sliders.push(go.amPmDisplay);
	 go.sliderFrame.addChild(go.amPmDisplay);
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._initializeSliderBorders = function(monthBorderFile, weekBorderFile, digitsBorderFile, amPmBorderFile){
	 const go = this._go;
     go.monthBorder = this._makeSpriteElement(monthBorderFile);
	 go.displayMonths.addChild(go.monthBorder);
	 go.weekDayBorder = this._makeSpriteElement(weekBorderFile);
	 go.weekDayDisplay.addChild(go.weekDayBorder);
	 go.dayOneBorder = this._makeSpriteElement(digitsBorderFile); 
	 go.dayOneDisplay.addChild(go.dayOneBorder);
	 go.dayTwoBorder = this._makeSpriteElement(digitsBorderFile);

	 go.dayTwoDisplay.addChild(go.dayTwoBorder);
	 go.yearOneBorder = this._makeSpriteElement(digitsBorderFile);
	 go.yearOneDisplay.addChild(go.yearOneBorder);
	 go.yearTwoBorder = this._makeSpriteElement(digitsBorderFile);
	 go.yearTwoDisplay.addChild(go.yearTwoBorder);
	 go.amPmBorder = this._makeSpriteElement(amPmBorderFile);
	 go.amPmDisplay.addChild(go.amPmBorder); 
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._initializeHands = function(smallHandFile, bigHandFile){
	 const go = this._go;
     go.hourHand = this._makeSpriteElement(smallHandFile);
	 go.hourHand.isHand = true;
     go.clock.addChild(go.hourHand);
     go.minuteHand = this._makeSpriteElement(bigHandFile);
	 go.minuteHand.isHand = true;
     go.clock.addChild(go.minuteHand);
};


Object.defineProperty(GGZiron.TimeSystem.Module_AnalogueClock.prototype, "x", {
	 get: function() {
         return this._go.mainBoard.x;
     },
	 set: function(x) {
         this._go.mainBoard.x = x;
     },
});

Object.defineProperty(GGZiron.TimeSystem.Module_AnalogueClock.prototype, "y", {
	 get: function() {
         return this._go.mainBoard.y;
     },
	 set: function(y) {
         this._go.mainBoard.y = y;
     },
});

Object.defineProperty(GGZiron.TimeSystem.Module_AnalogueClock.prototype, "width", {
	 get: function() {
         return this._go.clock.width;
     },
});

Object.defineProperty(GGZiron.TimeSystem.Module_AnalogueClock.prototype, "height", {
	 get: function() {
         return this._go.clock.height;
     },
});

GGZiron.TimeSystem.Module_AnalogueClock.prototype.minimize = function(){
     this._isMinimized = true;
	 this._moveElementFrame(this._go.minMax, 'x', 1);
	 this._go.clock.hide();
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.maximize = function(){
     this._isMinimized = false;
	 this._moveElementFrame(this._go.minMax, 'x', 0);
	 this._go.clock.show()
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.show = function(){
     this._ticksUntilRefresh = 0;
	 this._go.mainBoard.show();
	 this._isHidden = false;
	 if (this._isMinimized) this._go.clock.hide();
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.hide = function(){
	 this._go.mainBoard.hide();
	 this._isHidden = true;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.toogleVisibility = function(){
	 (!!this._isHidden) ? this.show() : this.hide();
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.isHidden = function(){
	 return this._isHidden;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.isMinimized = function(){
	 return this._isMinimized;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.isDestroyed = function(){
     return this._destroyed;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.attach = function(){
     if (this._destroyed) return;
	 GGZiron.TimeSystem.boardForAllTimers.addChild(this._go.mainBoard);
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.detach = function(){
     if (this._destroyed) return;
	 GGZiron.TimeSystem.boardForAllTimers.removeChild(this._go.mainBoard);
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._makeSpriteElement = function(name, sprite = new Sprite){
     var filename = name ? name : '';
     if (!this._go._bitmaps[filename]) this._go._bitmaps[filename] = filename ? Bitmap.load(filename) : new Bitmap(1, 1);
     sprite.bitmap = this._go._bitmaps[filename];
     return sprite;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._makeTilingElement = function(name, callBackFunction){
     var sprite = new TilingSprite;
     var filename = name ? name : '';
     if (!this._go._bitmaps[filename]) this._go._bitmaps[filename] = filename ? Bitmap.load(filename) : new Bitmap(1, 1);
     sprite.bitmap = this._go._bitmaps[filename];
     sprite.findIndex = name ? callBackFunction : () => 0;
     return sprite;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._setTilingElementDimensions = function(sprite, elementsCount, borderSprite){
	 sprite.sliderElements = Math.floor(elementsCount);
	 sprite.width = borderSprite.bitmap.width; 
	 sprite.height = borderSprite.bitmap.height;
     sprite.slidingPixels = Math.floor(sprite.bitmap.height / elementsCount);	 
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.setSliders = function(){
	 const timer = GGZiron.TimeSystem.getTimer(this._timerName);
     for (const slider of this._go._sliders){
	     this._setSlider(slider, timer);
     }
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._setSlider = function(slider, timer){
     slider.slidingIndex = slider.findIndex.call(this, timer);
     slider.origin.y = slider.finalSlidingPoint = slider.slidingIndex * slider.height;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._updateSlider = function(slider, timer){
     //different from set, this one does it gradually.
     var currentIndex = slider.slidingIndex % slider.sliderElements;
     if (currentIndex != slider.findIndex.call(this, timer)) {
	     slider.slidingIndex++;
		 if (slider.slidingIndex > slider.sliderElements - 1){
			 slider.slidingIndex = 0;
			 slider.origin.y = slider.origin.y % slider.bitmap.height - slider.bitmap.height;
		 }
	     slider.finalSlidingPoint = (slider.slidingIndex * slider.slidingPixels);
     }
	   
     if (slider.origin.y < slider.finalSlidingPoint) slider.origin.y += this.sliderSpeed;
     if (slider.origin.y > slider.finalSlidingPoint) slider.origin.y = slider.finalSlidingPoint;
};
  
GGZiron.TimeSystem.Module_AnalogueClock.prototype._setDimensionsAndLocations = function(timer, _, _, _, 
     _, _, _, _, _, _,
	 _, _, monthFile, weekDaysFile, digitsYearOneFile, digitsYearTwoFile,
	 digitsDayOneFile, digitsDayTwoFile, amPmFile)
{
	 const go = this._go;
     go.displayMonths.x = monthFile.xCord; go.displayMonths.y = monthFile.yCord;
     this._setTilingElementDimensions(go.displayMonths, 
	                                  timer.getMonthsPerYear(), 
									  go.monthBorder);
     go.weekDayDisplay.x = weekDaysFile.xCord; go.weekDayDisplay.y = weekDaysFile.yCord;
     this._setTilingElementDimensions(go.weekDayDisplay, 
	                                  timer.getDaysPerWeek(), 
	                                  go.weekDayBorder);
     go.dayOneDisplay.x = digitsDayOneFile.xCord; go.dayOneDisplay.y = digitsDayOneFile.yCord;  
     this._setTilingElementDimensions(go.dayOneDisplay, 
	                                  this._dayOneScrollerLenght, 
									  go.dayOneBorder);
     go.dayTwoDisplay.x = digitsDayTwoFile.xCord; go.dayTwoDisplay.y = digitsDayTwoFile.yCord;
     this._setTilingElementDimensions(go.dayTwoDisplay, 
	                                  this._dayTwoScrollerLenght, 
	                                  go.dayTwoBorder);
     go.yearOneDisplay.x = digitsYearOneFile.xCord; go.yearOneDisplay.y = digitsYearOneFile.yCord;
     this._setTilingElementDimensions(go.yearOneDisplay, 10, go.yearOneBorder);																	
     go.yearTwoDisplay.x = digitsYearTwoFile.xCord; go.yearTwoDisplay.y = digitsYearTwoFile.yCord;
	 this._setTilingElementDimensions(go.yearTwoDisplay, 10, go.yearTwoBorder);
     go.amPmDisplay.x = amPmFile.xCord; go.amPmDisplay.y = amPmFile.yCord;
	 this._setTilingElementDimensions(go.amPmDisplay, this._hourHandLapsPerDay, go.amPmBorder);
	 go.minMax.width = go.minMax.bitmap.width/2; go.minMax.height = go.minMax.bitmap.height;
	 go.minMax.sliderElements = Math.round(go.minMax.bitmap.width/go.minMax.width);
     this.setSliders();
     this.attach();
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.isLoaded = function(){
	var spr = this._go.mainBoard;
	var quele = [];
	quele.push(...spr.children);
	while(quele.length > 0){
		spr = quele.pop();
		if (spr.bitmap && !spr.bitmap.isReady()) return false;
		quele.push(...spr.children);
	}
	return true;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._moveElementFrame = function(element, propertyLetter, value){
	 var x = 0; var y = 0;
	 switch(propertyLetter){
		 case 'x': x = value; break;
		 case 'y': y = value;
	 }
	 element.setFrame(x * element._frame.width, y * element._frame.height, element._frame.width, element._frame.height);
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.updateFadingVisibility = function(){
     let isFaded = $gameScreen.brightness() < 255;
	 if (isFaded && !this.isHidden() && !this._temporaryHidden) {
		 this._go.mainBoard.hide();
		 this._temporaryHidden = true;
	 }
	 else if (!isFaded && !this.isHidden() && this._temporaryHidden) {
		 this._go.mainBoard.show();	
		 this._temporaryHidden = false;
	 }
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._initialiseIfLoaded = function(timer){
	 this._GGZDegree = Math.PI / 180;
     this._degreesPerMinute = 360/timer.getMinutesPerHour() * this._minuteHandLapsPerHour;	
     this._degreesPerHour = (360/timer.getHoursPerDay() ) * this._hourHandLapsPerDay;
     if (this.isLoaded()) {
		 this._setDimensionsAndLocations(timer, ...this._args);
	     if (this._isMinimized) this._go.minMax.origin.x += this._go.minMax.bitmap.width/2;
		 this._setHandsRotationPoint();
		 this._initialized = true;
		 if (!this._isHidden) this.show();
		 this._refreshHands(timer);
		 return true;
	 } 
	 else return false;  
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.update = function(){
     this.updateFadingVisibility();
     if (--this._ticksUntilRefresh > 0) return;
	 this._ticksUntilRefresh = isNaN(this._refreshRate) ? 10 : this._refreshRate;
     const timer = GGZiron.TimeSystem.getTimer(this._timerName);	
     if (this._destroyed || !timer) return;
     if (this._initialized === undefined)
	     if (!this._initialiseIfLoaded(timer)) 
		     return;
     if (this._handsNeedRefresh) this._refreshHands(timer);
	 for(const slider of this._go._sliders){
	     this._updateSlider(slider, timer);
     }
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._refreshHands = function(timer){
	 var second = timer.getCurrentSecond();
     var minute = timer.getCurrentMinute();
     var hour = timer.getCurrentHour();
	 this._minutesOffset = this._GGZDegree * second * (this._degreesPerMinute/timer.getSecondsPerMinute());
     this._hoursOffset = this._GGZDegree * minute * (this._degreesPerHour/timer.getMinutesPerHour());
     this._go.minuteHand.rotation = this._GGZDegree * minute * this._degreesPerMinute + this._minutesOffset;
     this._go.hourHand.rotation = this._GGZDegree * hour * this._degreesPerHour + this._GGZDegree + this._hoursOffset;
	 this._handsNeedRefresh = false;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onChangeAll = function(){
	 this._handsNeedRefresh = true;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onSecondChange = function(){
	 this._handsNeedRefresh = true;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onMinuteChange = function(){
	 this._handsNeedRefresh = true;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onHourChange = function(){
	 this._handsNeedRefresh = true;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onInDayPeriodChange = function(){
	 //...
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onDayChange = function(){
	 //...
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onMonthChange = function(){
	 //...
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onSeasonChange = function(){
	 //...
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.onYearChange = function(){
	  //...
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.instantUpdate = function(){
	 this._handsNeedRefresh = true;
	 this.setSliders();
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype._setHandsRotationPoint = function(){
	 for(let hand of this._go.clock.children.filter((child)=>child.isHand)){
	     hand.pivot.x = hand.bitmap.width/2;
	     hand.pivot.y = hand.height/2;
	     hand.x += hand.pivot.x;
	     hand.y += hand.pivot.y; 
     }
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.rebuild = function(){
	 if (!this._destroyed) this.destroy();
     this._setup(...Object.values(this._args));
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.destroy = function(){
     this._initialized = undefined;
     this.detach();
     Object.keys(this._go._bitmaps).forEach(name =>this._go._bitmaps[name].destroy());
     this._go.mainBoard.destroy();
     this._go = undefined;  
     this._destroyed = true;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.setRefreshRate = function(refreshRate){
	 this._refreshRate = refreshRate;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.getTimerName = function(){
	 return this._timerName;
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.setTimer = function(timer){
     this.setTimerByName(timer.getTimerName());  
};

GGZiron.TimeSystem.Module_AnalogueClock.prototype.setTimerByName = function(timerName){
	 const oldTimerName = this._timerName;
     this._timerName = timerName;
	 if (oldTimerName !== this._timerName) this.setSliders();
};

GGZiron.TimeSystem.objTypes = {};
GGZiron.TimeSystem.objTypes['GGZiron.TimeSystem.Module_AnalogueClock.prototype'] = GGZiron.TimeSystem.Module_AnalogueClock.prototype;
// ==================================================================================================================================
//                                               Graphic Modules 0 ends here                                                        
// ==================================================================================================================================
// ==================================================================================================================================
//                                                       End of File                                                       
// ==================================================================================================================================