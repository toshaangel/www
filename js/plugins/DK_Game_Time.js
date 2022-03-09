/*
Title: Game Time
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 2.5.1
Release: 04.01.2022
First release: 26.10.2015
*/

/*ru
Название: Время
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 2.5.1
Релиз: 04.01.2022
Первый релиз: 26.10.2015
*/

/*:
 * @plugindesc v.2.5.1 [MV|MZ] Time system.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Game_Time
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 2.5.1
 Release: 04.01.2022
 First release: 26.10.2015

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Date and time format (time window)
 ###=========================================================================
 %A - AM/PM
 %a - am/pm
 %: - flashing colon ":"
 %season - Season name
 %YY - Year (last 2 digits)
 %YYYY - Year (full)
 %MMMM - Month name
 %MM - Month (0 is substituted at the beginning if month < 10)
 %M - Month
 %DP - Day period name
 %DD - Day (0 is substituted at the beginning if day < 10)
 %D - Day
 %dddd - Day week name
 %dd - Day week short name
 %HH - Hour (0 is substituted at the beginning if hour < 10)
 %H - Hour
 %hh - Hour in 12 hour format (0 is substituted at the beginning if hour < 10)
 %h - Hour in 12 hour format
 %mm - Minutes (0 is substituted at the beginning if minutes < 10)
 %m - Minutes
 %SS - Seconds (0 is substituted at the beginning if minutes < 10)
 %S - Seconds

 ###=========================================================================
 ## Special message symbols
 ###=========================================================================
 1. Show time/date: \DT[format]
 format - Format of time and/or date
 Example1: \DT[%HH:%mm]
 Example2: \DT[%DD %MM %YYYY]
 Example3: \DT[%season]

 ###=========================================================================
 ## Items, Weapons, Armors, Skills
 ###=========================================================================
 You can set rules of use for items and skills using notes.
 Add a note <useGTime: condition> to specify the rule of use.
 P.S. The note is evaluated using Javascript.
 For example, you can make an item that can only be used on weekends.
 To do this, write the following note:
 <useGTime: $gameTime.isDayOff()>

 Example2: You need a skill that can only be used at night:
 <useGTime: dayPeriod == Game_Time.NIGHT>

 Example3: You need an item that can be used on a specific day,
 which is stored in a variable:
 <useGTime: day == $gameVariables.value(ID)>
 where ID is the number of the variable.

 Attention! Do not use the symbols ">" and "> =" in the conditions !!!
 If you need to write, for example, hour >= 12, then write the condition in
 reverse order: 12 <= hour

 ###=========================================================================
 ## Plugin commands (RPG Maker MV)
 ###=========================================================================
 1. Save time: SaveGameTime slot
 slot - Slot number. Calculated with Javascript.
 Example: SaveGameTime 1
 Example: SaveGameTime $gameVariables.value(1)

 2. Load time: LoadGameTime slot
 slot - Slot number. Calculated with Javascript.
 Example: LoadGameTime 1
 Example: LoadGameTime $gameVariables.value(1)

 3. Set time speed: SetGameTimeSpeed speed
 speed - Speed (in range 1 - 240). Calculated with Javascript.
 Example: SetGameTimeSpeed 1
 Example: SetGameTimeSpeed $gameVariables.value(1)

 4. Set time speed ratio: SetGameTimeSpeedRatio speedRatio
 speedRatio - Speed ratio (starting at 1). Calculated with Javascript.
 Example: SetGameTimeSpeedRatio 1
 Example: SetGameTimeSpeedRatio $gameVariables.value(1)

 5. Set parameter: GameTimeSet type value
 type - Parameter (sec, min, hour, day, month, year)
 value - Parameter value. Calculated with Javascript.
 Example: GameTimeSet sec 10
 Example: GameTimeSet min 15
 Example: GameTimeSet hour $gameVariables.value(1)

 6. Set all parameters: GameTimeSetAll sec min hour day month year
 sec - Seconds (starting at 0)
 min - Minutes (starting at 0)
 hour - Hour (starting at 0)
 day - Day (starting at 1)
 month - Month (starting at 0, 0 - January, 11 - December)
 year - Year (starting at 0)
 Example: GameTimeSetAll 0 0 10 1 0 2021

 7. Add parameter: GameTimeAdd type value
 type - Parameter (sec, min, hour, day, month, year)
 value - Parameter value. Calculated with Javascript.
 Example: GameTimeAdd sec 5
 Example: GameTimeAdd min 10
 Example: GameTimeAdd hour $gameVariables.value(1)

 8. Subtract parameter: GameTimeRem type value
 type - Parameter (sec, min, hour, day, month, year)
 value - Parameter value. Calculated with Javascript.
 Example: GameTimeRem sec 5
 Example: GameTimeRem min 10
 Example: GameTimeRem hour $gameVariables.value(1)

 9. Pause time: PauseGameTime duration
 duration - Pause duration in frames (-1 for unlimited pause). Calculated with Javascript.
 Example: PauseGameTime -1
 Example: PauseGameTime 60
 Example: PauseGameTime $gameVariables.value(1)

 10. Resume time: ResumeGameTime

 11. Show time window: ShowGameTimeWindow

 12. Hide time window (also blocks the window visibility button): HideGameTimeWindow

 13. Set time window visibility: SetGameTimeWindowVisible visible
 visible - Window visibility (true/false)
 Example: SetGameTimeWindowVisible true
 Example: SetGameTimeWindowVisible false

 14. Stop the execution of an event for a while: GameTimeEventWait type value
 type - Parameter (sec, min, hour, day, month, year)
 value - Parameter value. Calculated with Javascript.
 Example: GameTimeEventWait min 5
 Example: GameTimeEventWait hour 1
 Example: GameTimeEventWait sec $gameVariables.value(1)

 15. Change switch over time:
 GameTimeChangeSwitch switch switchValue type value
 switch - Switch. Calculated with Javascript.
 switchValue - Switch state (true, false)
 type - Parameter (sec, min, hour, day, month, year)
 value - Parameter value. Calculated with Javascript.
 Example1: GameTimeChangeSwitch 1 true min 5
 Example2: GameTimeChangeSwitch $gameVariables.value(1) false hour $gameVariables.value(2)

 16. Change self switch over time:
 GameTimeChangeSelfSwitch eventId switch switchValue type value
 eventId - Event ID. -1 for current event. Calculated with Javascript.
 switch - Switch (A, B, C, D)
 switchValue - Switch state (true, false)
 type - Parameter (sec, min, hour, day, month, year)
 value - Parameter value. Calculated with Javascript.
 Example1: GameTimeChangeSelfSwitch -1 A true min 5
 Example2: GameTimeChangeSelfSwitch $gameVariables.value(1) B false hour $gameVariables.value(2)

 17. Change variable over time:
 GameTimeChangeVariable variable variableValue type value
 variable - Variable. Calculated with Javascript.
 variableValue - Variable value. Calculated with Javascript.
 type - Parameter (sec, min, hour, day, month, year)
 value - Parameter value. Calculated with Javascript.
 Example1: GameTimeChangeVariable 1 100 min 5
 Example2: GameTimeChangeVariable $gameVariables.value(1) $gameVariables.value(2) hour $gameVariables.value(3)

 18. Set button availability on map:
 SetGameTimeMapButtonEnabled enabled
 enabled - Button enabled (true, false)
 Example: SetGameTimeMapButtonEnabled false

 19. Remove change timer*
 * - created with commands GameTimeChangeSwitch, GameTimeChangeSelfSwitch, GameTimeChangeVariable or script calls
 RemoveGameTimeChangeTimer ID
 ID - Timer id. Calculated with Javascript. Leave blank to use the variable from the plugin settings.
 Example1: RemoveGameTimeChangeTimer
 Example2: RemoveGameTimeChangeTimer 1
 Example3: RemoveGameTimeChangeTimer $gameVariables.value(1)

 ###===========================================================================
 ## Script calls
 ###===========================================================================
 You can create Game_Time type objects for their own needs

 Constructor of Game_Time supports multiple parameter options:
 1. Without parameters (it will be created based on current system time)
 Example: var gameTime = new Game_Time();

 2. With 1 parameter (object of Game_Time)
 Example: var gameTime = new Game_Time($gameTime);
 Example: var gameTime = new Game_Time(new Date());
 Example: var gameTime = new Game_Time({
    sec: 0, min: 0, hour: 0,
    day: 1, month: 0, year: 0
  });

 # Get time and date #
 $gameTime.ms - get milliseconds
 $gameTime.sec - get seconds
 $gameTime.min - get minutes
 $gameTime.hour - get hour
 $gameTime.day - get day
 $gameTime.dayPeriod - get day period (0 - morning, 1 - day, 2 - evening, 3 - night) (depends on period settings)
 $gameTime.dayWeek - get day week (0 - monday, 6 - sunday)
 $gameTime.dayYear - get day of the year
 $gameTime.week - get week number
 $gameTime.month - get month (0 - january, 11 - december)
 $gameTime.year - get year
 $gameTime.season - get season (0 - winter, 1 - spring, 2 - summer, 3 - autumn)
 $gameTime.date - get date (day, month, year)
 $gameTime.time - get time (ms, sec, min, hour)
 $gameTime.speed - get speed
 $gameTime.speedRatio - get speed ratio

 # Set time and date #
 $gameTime.year = year - set year
 $gameTime.month = month - set month (starting at 0)
 $gameTime.day = day - set day (starting at 1)
 $gameTime.hour = hour - set hour (starting at 0)
 $gameTime.min = min - set minutes (starting at 0)
 $gameTime.sec = sec - set seconds (starting at 0)
 $gameTime.ms = ms - set milliseconds (starting at 0)
 $gameTime.speed = speed - set speed (starting at 1)
 $gameTime.speedRatio = speedRatio - set speed ratio (starting at 1)

 # Add time and date #
 $gameTime.addMs(value = 1) - add milliseconds. Default 1.
 $gameTime.addSec(value = 1) - add seconds. Default 1.
 $gameTime.addMin(value = 1) - add minutes. Default 1.
 $gameTime.addHour(value = 1) - add hour. Default 1.
 $gameTime.addDay(value = 1) - add day. Default 1.
 $gameTime.addMonth(value = 1) - add month. Default 1.
 $gameTime.addYear(value = 1) - add year. Default 1.
 Chaining is supported. Example:
 $gameTime.addDay(1).addHour(1).addMin(10)

 # Subtract time and date #
 $gameTime.remSec(value = 1) - subtract seconds. Default 1.
 $gameTime.remMin(value = 1) - subtract minutes. Default 1.
 $gameTime.remHour(value = 1) - subtract hour. Default 1.
 $gameTime.remDay(value = 1) - subtract day. Default 1.
 $gameTime.remMonth(value = 1) - subtract month. Default 1.
 $gameTime.remYear(value = 1) - subtract year. Default 1.
 Chaining is supported. Example:
 $gameTime.remDay(1).remHour(1).remMin(10)

 # Comparison methods #
 1. gameTime > otherGameTime
 1.1. Compare date and time
 more(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.more(otherGameTime, false)
 1.2. Compare only date
 moreDate(otherGameTime)
 otherGameTime - object of Game_Time
 Example: $gameTime.moreDate(otherGameTime, false)
 1.3. Compare only time
 moreTime(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.moreTime(otherGameTime, false)

 2. gameTime < otherGameTime
 2.1. Compare date and time
 less(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.less(otherGameTime, true)
 2.2. Compare only date
 lessDate(otherGameTime)
 otherGameTime - object of Game_Time
 Example: $gameTime.lessDate(otherGameTime)
 2.3. Compare only time
 lessTime(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.lessTime(otherGameTime, true)

 3. gameTime >= otherGameTime
 3.1. Compare date and time
 moreEquals(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.moreEquals(otherGameTime, false)
 3.2. Compare only date
 moreEqualsDate(otherGameTime)
 otherGameTime - object of Game_Time
 Example: $gameTime.moreEqualsDate(otherGameTime)
 3.3. Compare only time
 moreEqualsTime(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.moreEqualsTime(otherGameTime, false)

 4. gameTime <= otherGameTime
 4.1. Compare date and time
 lessEquals(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.lessEquals(otherGameTime, true)
 4.2. Compare only date
 lessEqualsDate(otherGameTime)
 otherGameTime - object of Game_Time
 Example: $gameTime.lessEqualsDate(otherGameTime)
 4.3. Compare only time
 lessEqualsTime(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.lessEqualsTime(otherGameTime, true)

 5. gameTime == otherGameTime
 5.1. Compare date and time
 equals(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.equals(otherGameTime, false)
 5.2. Compare only date
 equalsDate(otherGameTime)
 otherGameTime - object of Game_Time
 Example: $gameTime.equalsDate(otherGameTime)
 5.3. Compare only time
 equalsTime(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.equalsTime(otherGameTime, false)

 6. Define sort order
 6.1. Compare date and time
 compareTo(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.compareTo(otherGameTime, true)
 6.2. Compare only date
 compareToDate(otherGameTime)
 otherGameTime - object of Game_Time
 Example: $gameTime.compareToDate(otherGameTime)
 6.3. Compare only time
 compareToTime(otherGameTime, blockSeconds = false)
 otherGameTime - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.compareToTime(otherGameTime, true)

 7. Range check
 7.1. Compare date and time
 inRange(gameTime1, gameTime2, blockSeconds = false)
 gameTime1 - object of Game_Time
 gameTime2 - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.inRange(gameTime1, gameTime2, true)
 7.2. Compare only date
 inRangeDate(gameTime1, gameTime2)
 gameTime1 - object of Game_Time
 gameTime2 - object of Game_Time
 Example: $gameTime.inRangeDate(gameTime1, gameTime2)
 7.3. Compare only time
 inRangeTime(gameTime1, gameTime2, blockSeconds = false)
 gameTime1 - object of Game_Time
 gameTime2 - object of Game_Time
 blockSeconds - block seconds comparison (true/false)
 Example: $gameTime.inRangeTime(gameTime1, gameTime2, true)

 8. Formatted string
 format(formatString)
 Use special symbols from the "Date and time format" section
 Example: $gameTime.format("%HH:%mm")

 # Other functions #
 clone() - clone an object
 copyFrom(object) - Copy data from an object (Game_Time, Object or Date)
 pause(duration = -1) - Stop time. Pause duration in frames. -1 for unlimited pause
 resume() - Resume time
 print() - Print time and date to console
 setTime(object) - Set time (ms, sec, min, hour)
 setDate(object) - Set date (day, dayWeek, month, year)
 isUpdated() - Returns true if the time is updated
 isPaused() - Returns true if time is paused
 isRealTimeUsed() - Returns true if real time is used
 isLeapYear() - Leap year
 isDayOff() - Day off
 add(type, value) - Add parameter (sec, min, hour, day, month, year)
 rem(type, value) - Subtract parameter (sec, min, hour, day, month, year)
 getDayPeriod() - Day period (name, startHour, endHour)
 getDaysInMonth() - Days in current month
 getDaysInYear() - Days in current year
 getDayStart() - Returns start of the day
 getDayEnd() - Returns end of the day
 getFirstDay() - Returns first day of the month
 getLastDay() - Returns last day of the month
 toDate() - Returns a Date object
 useRealTime(use = true) - Use real time

 # Static methods #
 Game_Time.checkVersion(version) - Check Game_Time plugin version
 Game_Time.getMillisecondsInSecond() - Milliseconds in one second
 Game_Time.getSecondsInMinute() - Seconds in one minute
 Game_Time.getMinutesInHour() - Minutes in one hour
 Game_Time.getHoursInDay() - Hours in one hour
 Game_Time.getDayPeriod(hour) - Day period
 Game_Time.getDaysInWeek() - Days in one week
 Game_Time.getDaysInMonth(month, year) - Days in a month
 Game_Time.getDaysInYear(year) - Days in a year
 Game_Time.getMonthsInYear() - Months in a year
 Game_Time.getDaysDifference(gameTime1, gameTime2 = $gameTime) - Difference in days between 2 dates
 Game_Time.isDayOff(dayWeek) - Day off
 Game_Time.isLeapYear(year) - Leap year
 Game_Time.save(slot, gameTime = $gameTime) - Save Game_Time object to slot
 Game_Time.load(slot) - Load Game_Time object from slot
 Game_Time.addTimer(gameTime, action) - Add a timer. When $gameTime >= gameTime, action will be executed
 Game_Time.remTimer(id) - Remove timer

 # Static properties #
 Game_Time.months - Number of days in each month
 Game_Time.window - Get time window (if exists)
 Game_Time.frameDuration - Frame duration

 # Static constants #
 Game_Time.DAY_PERIODS - Day periods
 Game_Time.MORNING - Morning (day period)
 Game_Time.DAY - Day (day period)
 Game_Time.EVENING - Evening (day period)
 Game_Time.NIGHT - Night (day period)
 Game_Time.MONDAY - Monday (day week)
 Game_Time.TUESDAY - Tuesday (day week)
 Game_Time.WEDNESDAY - Wednesday (day week)
 Game_Time.THURSDAY - Thursday (day week)
 Game_Time.FRIDAY - Friday (day week)
 Game_Time.SATURDAY - Saturday (day week)
 Game_Time.SUNDAY - Sunday (day week)
 Game_Time.JANUARY - January (month)
 Game_Time.FEBRUARY - February (month)
 Game_Time.MARCH - March (month)
 Game_Time.APRIL - April (month)
 Game_Time.MAY - May (month)
 Game_Time.JUNE - June (month)
 Game_Time.JULE - Jule (month)
 Game_Time.AUGUST - August (month)
 Game_Time.SEPTEMBER - September (month)
 Game_Time.OCTOBER - October (month)
 Game_Time.NOVEMBER - November (month)
 Game_Time.DECEMBER - December (month)
 Game_Time.WINTER - Winter (season)
 Game_Time.SPRING - Spring (season)
 Game_Time.SUMMER - Summer (season)
 Game_Time.AUTUMN - Autumn (season)

 Example1: $gameTime.dayPeriod == Game_Time.MORNING
 Example2: $gameTime.month == Game_Time.JUNE
 Example3: $gameTime.season == Game_Time.WINTER

 ###===========================================================================
 ## See also
 ###===========================================================================
 1. Mouse System (https://dk-plugins.ru/mouse-system/)
 Allows you to change the mouse cursor, activate events by clicking, hovering, etc.

 2. Video Player (https://dk-plugins.ru/video-player/)
 Adds video to the title screen, credits, the layers on the map and other.

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins



 * @command SaveGameTime
 * @desc Save time
 *
 * @arg slot
 * @text Slot number
 * @desc Slot number
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command LoadGameTime
 * @desc Load time
 *
 * @arg slot
 * @text Slot number
 * @desc Slot number
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command SetGameTimeSpeed
 * @desc Set time speed
 *
 * @arg speed
 * @text Speed
 * @desc Speed. Calculated with Javascript.
 * @type combo
 * @option 60
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 60

 * @command SetGameTimeSpeedRatio
 * @desc Set time speed ratio
 *
 * @arg speedRatio
 * @text Speed ratio
 * @desc Speed ratio. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option 2
 * @option 3
 * @option 5
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeSet
 * @desc Set parameter
 *
 * @arg type
 * @text Parameter
 * @desc Parameter
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hour
 * @value hour
 * @option Day
 * @value day
 * @option Month
 * @value month
 * @option Year
 * @value year
 * @default day
 *
 * @arg value
 * @text Value
 * @desc Value. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeSetAll
 * @desc Set all parameters
 *
 * @arg sec
 * @text Seconds
 * @desc Seconds. Calculated with Javascript.
 * @type combo
 * @option $gameTime.sec
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.sec
 *
 * @arg min
 * @text Minutes
 * @desc Minutes. Calculated with Javascript.
 * @type combo
 * @option $gameTime.min
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.min
 *
 * @arg hour
 * @text Hour
 * @desc Hour. Calculated with Javascript.
 * @type combo
 * @option $gameTime.hour
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.hour
 *
 * @arg day
 * @text Day
 * @desc Day. Calculated with Javascript.
 * @type combo
 * @option $gameTime.day
 * @option $gameVariables.value(ID)
 * @option 1
 * @default $gameTime.day
 *
 * @arg month
 * @text Month
 * @desc Month. Calculated with Javascript.
 * @type combo
 * @option $gameTime.month
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.month
 *
 * @arg year
 * @text Year
 * @desc Year. Calculated with Javascript.
 * @type combo
 * @option $gameTime.year
 * @option $gameVariables.value(ID)
 * @default $gameTime.year

 * @command GameTimeAdd
 * @desc Add parameter
 *
 * @arg type
 * @text Parameter
 * @desc Parameter
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hour
 * @value hour
 * @option Day
 * @value day
 * @option Month
 * @value month
 * @option Year
 * @value year
 * @default day
 *
 * @arg value
 * @text Value
 * @desc Value. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeRem
 * @desc Subtract parameter
 *
 * @arg type
 * @text Parameter
 * @desc Parameter
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hour
 * @value hour
 * @option Day
 * @value day
 * @option Month
 * @value month
 * @option Year
 * @value year
 * @default day
 *
 * @arg value
 * @text Value
 * @desc Value. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command PauseGameTime
 * @desc Pause time
 *
 * @arg duration
 * @text Pause duration
 * @desc Pause duration in frames (-1 for unlimited pause). Calculated with Javascript.
 * @type combo
 * @option -1
 * $gameVariables.value(ID)
 * @default -1

 * @command ResumeGameTime
 * @desc Resume time

 * @command ShowGameTimeWindow
 * @desc Show time window

 * @command HideGameTimeWindow
 * @desc Hide time window (also blocks the window visibility button)

 * @command SetGameTimeWindowVisible
 * @desc Set time window visibility
 *
 * @arg visible
 * @text Window visibility
 * @desc Window visibility
 * @type boolean
 * @default false

 * @command SetGameTimeMapButtonEnabled
 * @desc Set button availability on map
 *
 * @arg enabled
 * @text Button enabled
 * @desc Button enabled
 * @type boolean
 * @default true

 * @command GameTimeEventWait
 * @desc Stop the execution of an event for a while
 *
 * @arg type
 * @text Parameter
 * @desc Parameter
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hours
 * @value hour
 * @option Days
 * @value day
 * @option Months
 * @value month
 * @option Years
 * @value year
 * @default min
 *
 * @arg value
 * @text Value
 * @desc value. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeChangeSwitch
 * @desc Change switch over time
 *
 * @arg switch
 * @text Switch
 * @desc Switch. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg switchValue
 * @text Switch state
 * @desc Switch state
 * @type boolean
 * @default true
 *
 * @arg type
 * @text Parameter
 * @desc Parameter
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hours
 * @value hour
 * @option Days
 * @value day
 * @option Months
 * @value month
 * @option Years
 * @value year
 * @default min
 *
 * @arg value
 * @text Value
 * @desc Value. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeChangeSelfSwitch
 * @desc Change self switch over time
 *
 * @arg eventId
 * @text Event ID
 * @desc Event ID. -1 for current event. Calculated with Javascript.
 * @type combo
 * @option -1
 * @option $gameVariables.value(ID)
 * @default -1
 *
 * @arg switch
 * @text Switch
 * @desc Switch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @default A
 *
 * @arg switchValue
 * @text Switch state
 * @desc Switch state
 * @type boolean
 * @default true
 *
 * @arg type
 * @text Parameter
 * @desc Parameter
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hours
 * @value hour
 * @option Days
 * @value day
 * @option Months
 * @value month
 * @option Years
 * @value year
 * @default min
 *
 * @arg value
 * @text Value
 * @desc Value. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeChangeVariable
 * @desc Change variable over time
 *
 * @arg variable
 * @text Variable
 * @desc Variable. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg variableValue
 * @text Variable value
 * @desc Variable value. Calculated with Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0
 *
 * @arg type
 * @text Parameter
 * @desc Parameter
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hours
 * @value hour
 * @option Days
 * @value day
 * @option Months
 * @value month
 * @option Years
 * @value year
 * @default min
 *
 * @arg value
 * @text Value
 * @desc Value. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command RemoveGameTimeChangeTimer
 * @desc Remove change timer
 *
 * @arg id
 * @text Timer id
 * @desc Timer id. Calculated with Javascript. Use 0 to use a variable from the plugin settings.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0



 * @param Date Settings
 * @text Date settings
 * @default ---------------------------------

 * @param morningPeriod
 * @text Morning period
 * @parent Date Settings
 * @desc Morning period
 * @type struct<DayPeriod>
 * @default {"name":"Morning","startHour":"6","endHour":"12"}

 * @param dayPeriod
 * @text Day period
 * @parent Date Settings
 * @desc Day period
 * @type struct<DayPeriod>
 * @default {"name":"Day","startHour":"12","endHour":"18"}

 * @param eveningPeriod
 * @text Evening period
 * @parent Date Settings
 * @desc Evening period
 * @type struct<DayPeriod>
 * @default {"name":"Evening","startHour":"18","endHour":"23"}

 * @param nightPeriod
 * @text Night period
 * @parent Date Settings
 * @desc Night period
 * @type struct<DayPeriod>
 * @default {"name":"Night","startHour":"23","endHour":"6"}

 * @param daysWeek
 * @text Days of the week
 * @parent Date Settings
 * @desc Days of the week
 * @type struct<DayWeek>[]
 * @default ["{\"name\":\"Monday\",\"shortName\":\"Mon\",\"dayOff\":\"false\"}","{\"name\":\"Tuesday\",\"shortName\":\"Tue\",\"dayOff\":\"false\"}","{\"name\":\"Wednesday\",\"shortName\":\"Wed\",\"dayOff\":\"false\"}","{\"name\":\"Thursday\",\"shortName\":\"Thu\",\"dayOff\":\"false\"}","{\"name\":\"Friday\",\"shortName\":\"Fri\",\"dayOff\":\"false\"}","{\"name\":\"Saturday\",\"shortName\":\"Sat\",\"dayOff\":\"true\"}","{\"name\":\"Sunday\",\"shortName\":\"Sun\",\"dayOff\":\"true\"}"]

 * @param months
 * @text Months
 * @parent Date Settings
 * @desc Months
 * @type string[]
 * @default ["January","February","March","April","May","June","July","August","September","October","November","December"]

 * @param seasons
 * @text Seasons
 * @parent Date Settings
 * @desc Seasons
 * @type string[]
 * @default ["Winter","Spring","Summer","Autumn"]

 * @param Time Settings
 * @text Time settings
 * @default ---------------------------------

 * @param pauseWhenMessage
 * @text Pause during messages
 * @parent Time Settings
 * @desc Stop time update during a message on the screen ?
 * @type boolean
 * @default true

 * @param useRealTime
 * @text Real time
 * @parent Time Settings
 * @desc Use real time ?
 * @type boolean
 * @default false

 * @param startTime
 * @text Start time
 * @parent Time Settings
 * @desc Start time (if not using real time)
 * @type struct<StartTime>
 * @default {"sec":"0","min":"0","hour":"12","day":"14","month":"10","year":"2020"}

 * @param timeSpeed
 * @text Time speed
 * @parent startTime
 * @desc Time speed (if not using real time)
 * @type number
 * @min 1
 * @max 60
 * @default 1

 * @param Windows Settings
 * @text Windows settings
 * @default ---------------------------------

 * @param mapWindow
 * @text Window on the map
 * @parent Windows Settings
 * @type struct<Window>
 * @default {"x":"0","y":"0","width":"240","opacity":"255","backOpacity":"192","frameOpacity":"255","skin":"{\"folder\":\"\",\"filename\":\"\",\"x\":\"\",\"y\":\"\"}","lineHeight":"Window_Base.prototype.lineHeight.apply(this, arguments)","contents":"[\"{\\\"text\\\":\\\"%D %MMMM %YYYY\\\",\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"0\\\",\\\"color\\\":\\\"#ffffff\\\",\\\"align\\\":\\\"center\\\"}\",\"{\\\"text\\\":\\\"%HH%:%mm, %dddd\\\",\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"0\\\",\\\"color\\\":\\\"#ffffff\\\",\\\"align\\\":\\\"center\\\"}\"]","font":"{\"fontFace\":\"default\",\"fontItalic\":\"false\",\"fontSize\":\"26\"}"}

 * @param showMapWindowOnStart
 * @text Window at game start
 * @parent mapWindow
 * @desc Display a window at the start of the game ?
 * @type boolean
 * @default true

 * @param mapWindowButton
 * @text Window visibility button
 * @parent mapWindow
 * @desc Window visibility button
 * @type combo
 * @option
 * @option control

 * @param Other Settings
 * @text Other settings
 * @default ---------------------------------

 * @param variables
 * @text Variables
 * @parent Other Settings
 * @desc Variables in which the current time will be written
 * @type struct<Variables>
 * @default {"sec":"0","min":"0","hour":"0","day":"0","dayWeek":"0","month":"0","year":"0","season":"0"}

 * @param switches
 * @text Switches
 * @parent Other Settings
 * @desc Switches that turn on when conditions are met and turn off when they are not met
 * @type struct<Switch>[]
 * @default []

 * @param timerVariableId
 * @text Timer variable id
 * @parent Other Settings
 * @desc Timer variable id. This variable stores the timer id created through the plugin commands or script calls.
 * @type variable
 * @default 0

 * @param Hotkeys
 * @default ---------------------------------

 * @param pauseKeyCode
 * @text Pause key code
 * @parent Hotkeys
 * @desc Pause key code. 49 - Key "1". Leave blank to not use.
 * @type combo
 * @option
 * @option 49

 * @param resumeKeyCode
 * @text Resume key code
 * @parent Hotkeys
 * @desc Resume key code. 50 - Key "2". Leave blank to not use.
 * @type combo
 * @option
 * @option 50

 * @param acceleratedFlowKeyCode
 * @text Accelerated flow key code
 * @parent Hotkeys
 * @desc Accelerated flow key code. 51 - Key "3". Leave blank to not use.
 * @type combo
 * @option
 * @option 51

 * @param acceleratedFlowRatio
 * @text Accelerated flow ratio
 * @parent acceleratedFlowKeyCode
 * @desc Accelerated flow ratio
 * @type number
 * @decimals 2
 * @min 1.00
 * @default 2.00

 * @param fastFlowKeyCode
 * @text Fast flow key code
 * @parent Hotkeys
 * @desc Fast flow key code. 52 - Key "4". Leave blank to not use.
 * @type combo
 * @option
 * @option 52

 * @param fastFlowRatio
 * @text Fast flow ratio
 * @parent fastFlowKeyCode
 * @desc Fast flow ratio
 * @type number
 * @decimals 2
 * @min 1.00
 * @default 3.00

*/

/*:ru
 * @plugindesc v.2.5.1 [MV|MZ] Система времени.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Game_Time
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 2.5.1
 Релиз: 04.01.2022
 Первый релиз: 26.10.2015

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Формат даты и времени (окно времени)
 ###=========================================================================
 %A - AM/PM
 %a - am/pm
 %: - мигающее двоеточее ":"
 %season - Название сезона
 %YY - Год (последние 2 цифры)
 %YYYY - Год (полностью)
 %MMMM - Название месяца
 %MM - Месяц (подставляется 0 в начало, если месяц < 10)
 %M - Месяц
 %DP - Период дня
 %DD - День (подставляется 0 в начало, если день < 10)
 %D - День
 %dddd - Название дня недели
 %dd - Короткое название дня недели
 %HH - Час (подставляется 0 в начало, если час < 10)
 %H - Час
 %hh - Час в 12 часовом формате (подставляется 0 в начало, если час < 10)
 %h - Час в 12 часовом формате
 %mm - Минуты (подставляется 0 в начало, если минуты < 10)
 %m - Минуты
 %SS - Секунды (подставляется 0 в начало, если минуты < 10)
 %S - Секунды

 ###=========================================================================
 ## Специальные символы сообщений
 ###=========================================================================
 1. Показать время/дату: \DT[format]
 format - Формат времени и/или даты
 Пример1: \DT[%HH:%mm]
 Пример2: \DT[%DD %MM %YYYY]
 Пример3: \DT[%season]

 ###=========================================================================
 ## Вещи, Оружие, Броня, Навыки
 ###=========================================================================
 Вы можете задавать условия использования вещам и навыкам, используя заметки.
 Пропишите заметку <useGTime: condition>, чтобы задать условия использования.
 P.S. Заметка вычисляется с помощью Javascript.
 Например, вы можете сделать предмет, который можно использовать только по выходным.
 Для этого пропишите следующую заметку:
 <useGTime: $gameTime.isDayOff()>

 Пример2: Вам необходим навык, который можно использовать только ночью:
 <useGTime: dayPeriod == Game_Time.NIGHT>

 Пример3: Вам необходим предмет, который можно использовать в определенный день,
 который сохранен в переменной:
 <useGTime: day == $gameVariables.value(ID)>
 где ID - номер переменной.

 Внимание! Не используйте в условиях символы ">" и ">=" !!!
 Если Вам необходимо прописать, например, hour >= 12, то запишите условие в
 обратном порядке: 12 <= hour

 ###=========================================================================
 ## Команды плагина (RPG Maker MV)
 ###=========================================================================
 1. Сохранить время: SaveGameTime slot
 slot - Номер слота. Вычисляется с помощью Javascript.
 Пример1: SaveGameTime 1
 Пример2: SaveGameTime $gameVariables.value(1)

 2. Загрузить время: LoadGameTime slot
 slot - Номер слота. Вычисляется с помощью Javascript.
 Пример: LoadGameTime 1
 Пример: LoadGameTime $gameVariables.value(1)

 3. Установить скорость времени: SetGameTimeSpeed speed
 speed - Скорость (от 1 до 240). Вычисляется с помощью Javascript.
 Пример: SetGameTimeSpeed 1
 Пример: SetGameTimeSpeed $gameVariables.value(1)

 4. Установить коэффициент скорости времени: SetGameTimeSpeedRatio speedRatio
 speedRatio - Коэффициент скорости (начиная с 1). Вычисляется с помощью Javascript.
 Пример: SetGameTimeSpeedRatio 1
 Пример: SetGameTimeSpeedRatio $gameVariables.value(1)

 5. Установить параметр: GameTimeSet type value
 type - Параметр (sec, min, hour, day, month, year)
 value - Значение параметра. Вычисляется с помощью Javascript.
 Пример: SetGameTime sec 10
 Пример: SetGameTime min 15
 Пример: SetGameTime hour $gameVariables.value(1)

 6. Установить все параметры: GameTimeSetAll sec min hour day month year
 sec - Секунды (начиная с 0)
 min - Минуты (начиная с 0)
 hour - Час (начиная с 0)
 day - День (начиная с 1)
 month - Месяц (начиная с 0, 0 - Январь, 11 - Декабрь)
 year - Год (начиная с 0)
 Пример: SetGameTime 0 0 10 1 0 2021

 7. Прибавить параметр: GameTimeAdd type value
 type - Параметр (sec, min, hour, day, month, year)
 value - Значение параметра. Вычисляется с помощью Javascript.
 Пример: GameTimeAdd sec 5
 Пример: GameTimeAdd min 10
 Пример: GameTimeAdd hour $gameVariables.value(1)

 8. Отнять параметр: GameTimeRem type value
 type - Параметр (sec, min, hour, day, month, year)
 value - Значение параметра. Вычисляется с помощью Javascript.
 Пример: GameTimeRem sec 5
 Пример: GameTimeRem min 10
 Пример: GameTimeRem hour $gameVariables.value(1)

 9. Остановить время: PauseGameTime duration
 duration - Длительность паузы в кадрах (-1 для неограниченной паузы). Вычисляется с помощью Javascript.
 Пример: PauseGameTime -1
 Пример: PauseGameTime 60
 Пример: PauseGameTime $gameVariables.value(1)

 10. Возобновить время: ResumeGameTime

 11. Показать окно времени: ShowGameTimeWindow

 12. Скрыть окно времени (также блокирует клавишу видимости окна): HideGameTimeWindow

 13. Установить видимость окна времени: SetGameTimeWindowVisible visible
 visible - Видимость окна (true/false)
 Пример: SetGameTimeWindowVisible true
 Пример: SetGameTimeWindowVisible false

 14. Остановить выполнение события на время: GameTimeEventWait type value
 type - Параметр (sec, min, hour, day, month, year)
 value - Значение параметра. Вычисляется с помощью Javascript.
 Пример: GameTimeEventWait min 5
 Пример: GameTimeEventWait hour 1
 Пример: GameTimeEventWait sec $gameVariables.value(1)

 15. Изменить переключатель через время:
 GameTimeChangeSwitch switch switchValue type value
 switch - Номер переключателя. Вычисляется с помощью Javascript.
 switchValue - Состояние переключателя (true, false)
 type - Параметр (sec, min, hour, day, month, year)
 value - Значение параметра. Вычисляется с помощью Javascript.
 Пример: GameTimeChangeSwitch 1 true min 5
 Пример: GameTimeChangeSwitch $gameVariables.value(1) false hour $gameVariables.value(2)

 16. Изменить локальный переключатель через время:
 GameTimeChangeSelfSwitch eventId switch switchValue type value
 eventId - Номер события. -1 для текущего события. Вычисляется с помощью Javascript.
 switch - Переключатель (A, B, C, D)
 switchValue - Состояние переключателя (true, false)
 type - Параметр (sec, min, hour, day, month, year)
 value - Значение параметра. Вычисляется с помощью Javascript.
 Пример1: GameTimeChangeSelfSwitch -1 A true min 5
 Пример2: GameTimeChangeSelfSwitch $gameVariables.value(1) B false hour $gameVariables.value(2)

 17. Изменить переменную через время:
 GameTimeChangeVariable variable variableValue type value
 variable - Переменная. Вычисляется с помощью Javascript.
 variableValue - Значение переменной. Вычисляется с помощью Javascript.
 type - Параметр (sec, min, hour, day, month, year)
 value - Значение параметра. Вычисляется с помощью Javascript.
 Пример1: GameTimeChangeVariable 1 100 min 5
 Пример2: GameTimeChangeVariable $gameVariables.value(1) $gameVariables.value(2) hour $gameVariables.value(3)

 18. Установить доступность кнопки на карте:
 SetGameTimeMapButtonEnabled enabled
 enabled - Кнопка включена (true, false)
 Пример: SetGameTimeMapButtonEnabled false

 19. Удалить таймер изменения*
 * - созданные с помощью команд GameTimeChangeSwitch, GameTimeChangeSelfSwitch, GameTimeChangeVariable или вызовами скриптов
 RemoveGameTimeChangeTimer ID
 ID - Номер таймера. Вычисляется с помощью Javascript. Оставьте пустым, чтобы использовать переменную из настроек плагина.
 Пример1: RemoveGameTimeChangeTimer
 Пример2: RemoveGameTimeChangeTimer 1
 Пример3: RemoveGameTimeChangeTimer $gameVariables.value(1)

 ###===========================================================================
 ## Вызовы скриптов
 ###===========================================================================
 Вы можете создавать объекты типа Game_Time для собственных нужд

 Конструктор Game_Time поддерживает несколько вариантов параметров:
 1. Без параметров (будет создано по текущему системному времени)
 Пример: var gameTime = new Game_Time();

 2. С 1 параметром (объект Game_Time или объект Date, или Объект)
 Пример: var gameTime = new Game_Time($gameTime);
 Пример: var gameTime = new Game_Time(new Date());
 Пример: var gameTime = new Game_Time({
    sec: 0, min: 0, hour: 0,
    day: 1, month: 0, year: 0
  });

 # Получить время и дату #
 $gameTime.ms - получить миллисекунды
 $gameTime.sec - получить секунды
 $gameTime.min - получить минуты
 $gameTime.hour - получить час
 $gameTime.day - получить день
 $gameTime.dayPeriod - получить период дня (0 - утро, 1 - день, 2 - вечер, 3 - ночь) (зависит от настроек периодов)
 $gameTime.dayWeek - получить день недели (0 - понедельник, 6 - воскресенье)
 $gameTime.dayYear - получить день в году
 $gameTime.week - получить номер недели
 $gameTime.month - получить месяц (0 - январь, 11 - декабрь)
 $gameTime.year - получить год
 $gameTime.season - получить сезон (0 - зима, 1 - весна, 2 - лето, 3 - осень)
 $gameTime.date - получить дату (день, месяц, год)
 $gameTime.time - получить время (миллисекунды, секунды, минуты, час)
 $gameTime.speed - получить скорость времени
 $gameTime.speedRatio - получить коэффициент скорости времени

 # Установить время и дату #
 $gameTime.year = year - установить год
 $gameTime.month = month - установить месяц (начиная с 0)
 $gameTime.day = day - установить день (начиная с 1)
 $gameTime.hour = hour - установить час (начиная с 0)
 $gameTime.min = min - установить минуты (начиная с 0)
 $gameTime.sec = sec - установить секунды (начиная с 0)
 $gameTime.ms = ms - установить миллисекунды (начиная с 0)
 $gameTime.speed = speed - установить скорость (начиная с 1)
 $gameTime.speedRatio = speedRatio - установить коэффициент скорости времени (начиная с 1)

 # Добавить время и дату #
 $gameTime.addMs(value = 1) - добавить миллисекунды. По умолчанию 1.
 $gameTime.addSec(value = 1) - добавить секунды. По умолчанию 1.
 $gameTime.addMin(value = 1) - добавить минуты. По умолчанию 1.
 $gameTime.addHour(value = 1) - добавить час. По умолчанию 1.
 $gameTime.addDay(value = 1) - добавить день. По умолчанию 1.
 $gameTime.addMonth(value = 1) - добавить месяц. По умолчанию 1.
 $gameTime.addYear(value = 1) - добавить год. По умолчанию 1.
 Поддерживается вызов цепочкой. Пример:
 $gameTime.addDay(1).addHour(1).addMin(10)

 # Отнять время и дату #
 $gameTime.remSec(value = 1) - отнять секунды. По умолчанию 1.
 $gameTime.remMin(value = 1) - отнять минуты. По умолчанию 1.
 $gameTime.remHour(value = 1) - отнять час. По умолчанию 1.
 $gameTime.remDay(value = 1) - отнять день. По умолчанию 1.
 $gameTime.remMonth(value = 1) - отнять месяц. По умолчанию 1.
 $gameTime.remYear(value = 1) - отнять год. По умолчанию 1.
 Поддерживается вызов цепочкой. Пример:
 $gameTime.remDay(1).remHour(1).remMin(10)

 # Методы сравнения #
 1. gameTime > otherGameTime
 1.1. Сравнить дату и время
 more(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.more(otherGameTime, false)
 1.2. Сравнить только дату
 moreDate(otherGameTime)
 otherGameTime - объект Game_Time
 Пример: $gameTime.moreDate(otherGameTime)
 1.3. Сравнить только время
 moreTime(otherGameTime, false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.moreTime(otherGameTime, false)

 2. gameTime < otherGameTime
 2.1. Сравнить дату и время
 less(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.less(otherGameTime, true)
 2.2. Сравнить только дату
 lessDate(otherGameTime)
 otherGameTime - объект Game_Time
 Пример: $gameTime.lessDate(otherGameTime)
 2.3. Сравнить только время
 lessTime(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.lessTime(otherGameTime, false)

 3. gameTime >= otherGameTime
 3.1. Сравнить дату и время
 moreEquals(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.moreEquals(otherGameTime, false)
 3.2. Сравнить только дату
 moreEqualsDate(otherGameTime)
 otherGameTime - объект Game_Time
 Пример: $gameTime.moreEqualsDate(otherGameTime)
 3.3. Сравнить только время
 moreEqualsTime(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.moreEqualsTime(otherGameTime, false)

 4. gameTime <= otherGameTime
 4.1. Сравнить дату и время
 lessEquals(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.lessEquals(otherGameTime, true)
 4.2. Сравнить только дату
 lessEqualsDate(otherGameTime)
 otherGameTime - объект Game_Time
 Пример: $gameTime.lessEqualsDate(otherGameTime)
 4.3. Сравнить только время
 lessEqualsTime(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.lessEqualsTime(otherGameTime, true)

 5. gameTime == otherGameTime
 5.1. Сравнить дату и время
 equals(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.equals(otherGameTime, false)
 5.2. Сравнить только дату:
 equalsDate(otherGameTime)
 otherGameTime - объект Game_Time
 Пример: $gameTime.equalsDate(otherGameTime)
 5.3. Сравнить только время:
 equalsTime(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.equalsTime(otherGameTime, false)

 6. Определить порядок сортировки
 6.1. Сравнить дату и время
 compareTo(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.compareTo(otherGameTime, true)
 6.2. Сравнить только дату
 compareToDate(otherGameTime)
 otherGameTime - объект Game_Time
 Пример: $gameTime.compareToDate(otherGameTime)
 6.3. Сравнить только время
 compareToTime(otherGameTime, blockSeconds = false)
 otherGameTime - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.compareToTime(otherGameTime, true)

 7. Проверка диапазона
 7.1. Сравнить дату и время
 inRange(gameTime1, gameTime2, blockSeconds = false)
 gameTime1 - объект Game_Time
 gameTime2 - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.inRange(gameTime1, gameTime2, true)
 7.2. Сравнить только дату
 inRangeDate(gameTime1, gameTime2)
 gameTime1 - объект Game_Time
 gameTime2 - объект Game_Time
 Пример: $gameTime.inRangeDate(gameTime1, gameTime2)
 7.3. Сравнить только время
 inRangeTime(gameTime1, gameTime2, blockSeconds = false)
 gameTime1 - объект Game_Time
 gameTime2 - объект Game_Time
 blockSeconds - блокировать сравнение секунд (true/false)
 Пример: $gameTime.inRangeTime(gameTime1, gameTime2, true)

 8. Форматированная строка
 format(formatString)
 Используйте специальные символы из раздела "Формат даты и времени"
 Пример: $gameTime.format("%HH:%mm")

 # Остальные функции #
 clone() - Клонировать объект
 copyFrom(object) - Копировать данные из объекта (Game_Time, Object или Date)
 pause(duration = -1) - Остановить время. Длительность паузы в кадрах. -1 для неограниченной паузы
 resume() - Возобновить время
 print() - Вывести время и дату в консоль
 setTime(object) - Установить время (ms, sec, min, hour)
 setDate(object) - Установить дату (day, dayWeek, month, year)
 isUpdated() - Возвращает true, если время обновляется
 isPaused() - Возвращает true, если время остановлено
 isRealTimeUsed() - Возвращает true, если используется реальное время
 isLeapYear() - Високосный год
 isDayOff() - Выходной
 add(type, value) - Добавить параметр (sec, min, hour, day, month, year)
 rem(type, value) - Отнять параметр (sec, min, hour, day, month, year)
 getDayPeriod() - Период дня (name, startHour, endHour)
 getDaysInMonth() - Количество дней в месяце
 getDaysInYear() - Количество дней в году
 getDayStart() - Возвращает начало дня
 getDayEnd() - Возвращает конец дня
 getFirstDay() - Возвращает первый день месяца
 getLastDay() - Возвращает последний день месяца
 toDate() - Возвращает объект Date
 useRealTime(use = true) - Использовать реальное время

 # Статические методы #
 Game_Time.checkVersion(version) - Проверить версию плагина Game_Time
 Game_Time.getMillisecondsInSecond() - Количество миллисекунд в секунде
 Game_Time.getSecondsInMinute() - Количество секунд в одном минуте
 Game_Time.getMinutesInHour() - Количество минут в одном часе
 Game_Time.getHoursInDay() - Количество часов в одном дне
 Game_Time.getDayPeriod(hour) - Период дня
 Game_Time.getDaysInWeek() - Количество дней в неделе
 Game_Time.getDaysInMonth(month, year) - Количество дней в месяце
 Game_Time.getDaysInYear(year) - Количество дней в году
 Game_Time.getMonthsInYear() - Количество месяцев в году
 Game_Time.getDaysDifference(gameTime1, gameTime2 = $gameTime) - Разница в днях между 2 датами
 Game_Time.isDayOff(dayWeek) - Выходной день
 Game_Time.isLeapYear(year) - Високосный год
 Game_Time.save(slot, gameTime = $gameTime) - Сохранить объект Game_Time в слот
 Game_Time.load(slot) - Загрузить объект Game_Time из слота
 Game_Time.addTimer(gameTime, action) - Добавить таймер. Когда $gameTime будет >= gameTime, то выполнится действие action
 Game_Time.remTimer(id) - Удалить таймер

 # Статические свойства #
 Game_Time.months - Количество дней в каждом месяце
 Game_Time.window - Получить окно времени
 Game_Time.frameDuration - Длительность кадра

 # Статические константы #
 Game_Time.DAY_PERIODS - Периоды дня
 Game_Time.MORNING - Утро (период)
 Game_Time.DAY - День (период)
 Game_Time.EVENING - Вечер (период)
 Game_Time.NIGHT - Ночь (период)
 Game_Time.MONDAY - Понедельник (день недели)
 Game_Time.TUESDAY - Вторник (день недели)
 Game_Time.WEDNESDAY - Среда (день недели)
 Game_Time.THURSDAY - Четверг (день недели)
 Game_Time.FRIDAY - Пятница (день недели)
 Game_Time.SATURDAY - Суббота (день недели)
 Game_Time.SUNDAY - Воскресенье (день недели)
 Game_Time.JANUARY - Январь (month)
 Game_Time.FEBRUARY - Февраль (month)
 Game_Time.MARCH - Март (month)
 Game_Time.APRIL - Апрель (month)
 Game_Time.MAY - Май (month)
 Game_Time.JUNE - Июнь (month)
 Game_Time.JULE - Июль (month)
 Game_Time.AUGUST - Август (month)
 Game_Time.SEPTEMBER - Сентябрь (month)
 Game_Time.OCTOBER - Октябрь (month)
 Game_Time.NOVEMBER - Ноябрь (month)
 Game_Time.DECEMBER - Декабрь (month)
 Game_Time.WINTER - Зима (season)
 Game_Time.SPRING - Весна (season)
 Game_Time.SUMMER - Лето (season)
 Game_Time.AUTUMN - Осень (season)

 Пример1: $gameTime.dayPeriod == Game_Time.MORNING
 Пример2: $gameTime.month == Game_Time.JUNE
 Пример3: $gameTime.season == Game_Time.WINTER

 ###=========================================================================
 ## Смотрите также
 ###=========================================================================
 1. Система Мыши (https://dk-plugins.ru/mouse-system/)
 Позволяет изменять курсор мыши, активировать события нажатием, наведением и др.

 2. Видео плеер (https://dk-plugins.ru/video-player/)
 Добавляет видео перед титульным экраном, титры, слои на карте и другое.

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins



 * @command SaveGameTime
 * @desc Сохранить время
 *
 * @arg slot
 * @text Номер слота
 * @desc Номер слота. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command LoadGameTime
 * @desc Загрузить время
 *
 * @arg slot
 * @text Номер слота
 * @desc Номер слота. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command SetGameTimeSpeed
 * @desc Установить скорость времени
 *
 * @arg speed
 * @text Скорость
 * @desc Скорость. Вычисляется с помощью Javascript.
 * @type combo
 * @option 60
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 60

 * @command SetGameTimeSpeedRatio
 * @desc Установить коэффициент скорости времени
 *
 * @arg speedRatio
 * @text Коэффициент скорости
 * @desc Коэффициент скорости. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option 2
 * @option 3
 * @option 5
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeSet
 * @desc Установить параметр
 *
 * @arg type
 * @text Параметр
 * @desc Параметр
 * @type select
 * @option Секунды
 * @value sec
 * @option Минуты
 * @value min
 * @option Час
 * @value hour
 * @option День
 * @value day
 * @option Месяц
 * @value month
 * @option Год
 * @value year
 * @default day
 *
 * @arg value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeSetAll
 * @desc Установить все параметры
 *
 * @arg sec
 * @text Секунды
 * @desc Секунды. Вычисляется с помощью Javascript.
 * @type combo
 * @option $gameTime.sec
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.sec
 *
 * @arg min
 * @text Минуты
 * @desc Минуты. Вычисляется с помощью Javascript.
 * @type combo
 * @option $gameTime.min
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.min
 *
 * @arg hour
 * @text Час
 * @desc Час. Вычисляется с помощью Javascript.
 * @type combo
 * @option $gameTime.hour
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.hour
 *
 * @arg day
 * @text День
 * @desc День. Вычисляется с помощью Javascript.
 * @type combo
 * @option $gameTime.day
 * @option $gameVariables.value(ID)
 * @option 1
 * @default $gameTime.day
 *
 * @arg month
 * @text Месяц
 * @desc Месяц. Вычисляется с помощью Javascript.
 * @type combo
 * @option $gameTime.month
 * @option $gameVariables.value(ID)
 * @option 0
 * @default $gameTime.month
 *
 * @arg year
 * @text Год
 * @desc Год. Вычисляется с помощью Javascript.
 * @type combo
 * @option $gameTime.year
 * @option $gameVariables.value(ID)
 * @default $gameTime.year

 * @command GameTimeAdd
 * @desc Прибавить параметр
 *
 * @arg type
 * @text Параметр
 * @desc Параметр
 * @type select
 * @option Секунды
 * @value sec
 * @option Минуты
 * @value min
 * @option Час
 * @value hour
 * @option День
 * @value day
 * @option Месяц
 * @value month
 * @option Год
 * @value year
 * @default day
 *
 * @arg value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeRem
 * @desc Отнять параметр
 *
 * @arg type
 * @text Параметр
 * @desc Параметр
 * @type select
 * @option Секунды
 * @value sec
 * @option Минуты
 * @value min
 * @option Час
 * @value hour
 * @option День
 * @value day
 * @option Месяц
 * @value month
 * @option Год
 * @value year
 * @default day
 *
 * @arg value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command PauseGameTime
 * @desc Остановить время
 *
 * @arg duration
 * @text Длительность паузы
 * @desc Длительность паузы в кадрах (-1 для неограниченной паузы). Вычисляется с помощью Javascript.
 * @type combo
 * @option -1
 * @option $gameVariables.value(ID)
 * @default -1

 * @command ResumeGameTime
 * @desc Возобновить время

 * @command ShowGameTimeWindow
 * @desc Показать окно времени

 * @command HideGameTimeWindow
 * @desc Скрыть окно времени (также блокирует клавишу видимости окна)

 * @command SetGameTimeWindowVisible
 * @desc Установить видимость окна времени
 *
 * @arg visible
 * @text Видимость окна
 * @desc Видимость окна
 * @type boolean
 * @default false

 * @command SetGameTimeMapButtonEnabled
 * @desc Установить доступность кнопки на карте
 *
 * @arg enabled
 * @text Кнопка включена
 * @desc Кнопка включена
 * @type boolean
 * @default true

 * @command GameTimeEventWait
 * @desc Остановить выполнение события на время
 *
 * @arg type
 * @text Параметр
 * @desc Параметр
 * @type select
 * @option Секунды
 * @value sec
 * @option Минуты
 * @value min
 * @option Часы
 * @value hour
 * @option Дни
 * @value day
 * @option Месяцы
 * @value month
 * @option Годы
 * @value year
 * @default min
 *
 * @arg value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeChangeSwitch
 * @desc Включить переключатель через время
 *
 * @arg switch
 * @text Переключатель
 * @desc Переключатель. Вычисляется с помощью Javascript.
 * @type combo
 * @option 11
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg switchValue
 * @text Состояние переключателя
 * @desc Состояние переключателя
 * @type boolean
 * @default true
 *
 * @arg type
 * @text Параметр
 * @desc Параметр
 * @type select
 * @option Секунды
 * @value sec
 * @option Минуты
 * @value min
 * @option Часы
 * @value hour
 * @option Дни
 * @value day
 * @option Месяцы
 * @value month
 * @option Годы
 * @value year
 * @default min
 *
 * @arg value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeChangeSelfSwitch
 * @desc Включить локальный переключатель через время
 *
 * @arg eventId
 * @text Номер события
 * @desc Номер события. -1 для текущего события. Вычисляется с помощью Javascript.
 * @type combo
 * @option -1
 * @option $gameVariables.value(ID)
 * @default -1
 *
 * @arg switch
 * @text Переключатель
 * @desc Переключатель
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @default A
 *
 * @arg switchValue
 * @text Состояние переключателя
 * @desc Состояние переключателя
 * @type boolean
 * @default true
 *
 * @arg type
 * @text Параметр
 * @desc Параметр
 * @type select
 * @option Секунды
 * @value sec
 * @option Минуты
 * @value min
 * @option Часы
 * @value hour
 * @option Дни
 * @value day
 * @option Месяцы
 * @value month
 * @option Годы
 * @value year
 * @default min
 *
 * @arg value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command GameTimeChangeVariable
 * @desc Изменить переменную через время
 *
 * @arg variable
 * @text Переменная
 * @desc Переменная. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg variableValue
 * @text Значение переменной
 * @desc Значение переменной. Вычисляется с помощью Javascript.
 * @default 0
 *
 * @arg type
 * @text Параметр
 * @desc Параметр
 * @type select
 * @option Секунды
 * @value sec
 * @option Минуты
 * @value min
 * @option Часы
 * @value hour
 * @option Дни
 * @value day
 * @option Месяцы
 * @value month
 * @option Годы
 * @value year
 * @default min
 *
 * @arg value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command RemoveGameTimeChangeTimer
 * @desc Удалить таймер изменения
 *
 * @arg id
 * @text Номер таймера
 * @desc Номер таймера. Вычисляется с помощью Javascript. Используйте 0, чтобы использовать переменную из настроек плагина.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0



 * @param Date Settings
 * @text Настройки даты
 * @default ---------------------------------

 * @param morningPeriod
 * @text Период дня "Утро"
 * @parent Date Settings
 * @desc Период дня "Утро"
 * @type struct<DayPeriod>
 * @default {"name":"Утро","startHour":"6","endHour":"12"}

 * @param dayPeriod
 * @text Период дня "День"
 * @parent Date Settings
 * @desc Период дня "День"
 * @type struct<DayPeriod>
 * @default {"name":"День","startHour":"12","endHour":"18"}

 * @param eveningPeriod
 * @text Период дня "Вечер"
 * @parent Date Settings
 * @desc Период дня "Вечер"
 * @type struct<DayPeriod>
 * @default {"name":"Вечер","startHour":"18","endHour":"23"}

 * @param nightPeriod
 * @text Период дня "Ночь"
 * @parent Date Settings
 * @desc Период дня "Ночь"
 * @type struct<DayPeriod>
 * @default {"name":"Ночь","startHour":"23","endHour":"6"}

 * @param daysWeek
 * @text Дни недели
 * @parent Date Settings
 * @desc Дни недели
 * @type struct<DayWeek>[]
 * @default ["{\"name\":\"Понедельник\",\"shortName\":\"Пн\",\"dayOff\":\"false\"}","{\"name\":\"Вторник\",\"shortName\":\"Вт\",\"dayOff\":\"false\"}","{\"name\":\"Среда\",\"shortName\":\"Ср\",\"dayOff\":\"false\"}","{\"name\":\"Четверг\",\"shortName\":\"Чт\",\"dayOff\":\"false\"}","{\"name\":\"Пятница\",\"shortName\":\"Пт\",\"dayOff\":\"false\"}","{\"name\":\"Суббота\",\"shortName\":\"Сб\",\"dayOff\":\"true\"}","{\"name\":\"Воскресенье\",\"shortName\":\"Вс\",\"dayOff\":\"true\"}"]

 * @param months
 * @text Месяцы
 * @parent Date Settings
 * @desc Месяцы
 * @type string[]
 * @default ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]

 * @param seasons
 * @text Сезоны
 * @parent Date Settings
 * @desc Сезоны
 * @type string[]
 * @default ["Зима","Весна","Лето","Осень"]

 * @param Time Settings
 * @text Настройки времени
 * @default ---------------------------------

 * @param pauseWhenMessage
 * @text Пауза во время сообщений
 * @parent Time Settings
 * @desc Останавливать время при сообщении на экране ?
 * @type boolean
 * @default true

 * @param useRealTime
 * @text Реальное время
 * @parent Time Settings
 * @desc Использовать реальное время ?
 * @type boolean
 * @default false

 * @param startTime
 * @text Начальное время
 * @parent Time Settings
 * @desc Начальное время, если не используется реальное время
 * @type struct<StartTime>
 * @default {"sec":"0","min":"0","hour":"12","day":"14","month":"10","year":"2020"}

 * @param timeSpeed
 * @text Скорость времени
 * @parent startTime
 * @desc Скорость течения времени (если не используется реальное время)
 * @type number
 * @min 1
 * @max 60
 * @default 1

 * @param Windows Settings
 * @text Настройка окон
 * @default ---------------------------------

 * @param mapWindow
 * @text Окно на карте
 * @parent Windows Settings
 * @type struct<Window>
 * @default {"x":"0","y":"0","width":"240","opacity":"255","backOpacity":"192","frameOpacity":"255","skin":"{\"folder\":\"\",\"filename\":\"\",\"x\":\"\",\"y\":\"\"}","lineHeight":"Window_Base.prototype.lineHeight.apply(this, arguments)","contents":"[\"{\\\"text\\\":\\\"%D %MMMM %YYYY\\\",\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"0\\\",\\\"color\\\":\\\"#ffffff\\\",\\\"align\\\":\\\"center\\\"}\",\"{\\\"text\\\":\\\"%HH%:%mm, %dddd\\\",\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"0\\\",\\\"color\\\":\\\"#ffffff\\\",\\\"align\\\":\\\"center\\\"}\"]","font":"{\"fontFace\":\"default\",\"fontItalic\":\"false\",\"fontSize\":\"26\"}"}

 * @param showMapWindowOnStart
 * @text Окно на старте игры
 * @parent mapWindow
 * @desc Отображать окно на старте игры ?
 * @type boolean
 * @default true

 * @param mapWindowButton
 * @text Клавиша видимости окна
 * @parent mapWindow
 * @desc Клавиша видимости окна
 * @type combo
 * @option
 * @option control

 * @param Other Settings
 * @text Остальные настройки
 * @default ---------------------------------

 * @param variables
 * @text Переменные
 * @parent Other Settings
 * @desc Переменные, в которые будет записываться текущее время
 * @type struct<Variables>
 * @default {"sec":"0","min":"0","hour":"0","day":"0","dayWeek":"0","month":"0","year":"0","season":"0"}

 * @param switches
 * @text Переключатели
 * @parent Other Settings
 * @desc Переключатели, которые включаются при выполнении условий и выключаются, когда они не соблюдаются
 * @type struct<Switch>[]
 * @default []

 * @param timerVariableId
 * @text Переменная таймера
 * @parent Other Settings
 * @desc Переменная таймера. Сюда сохраняется номер таймера, созданного через команды плагина или вызовы скриптов.
 * @type variable
 * @default 0

 * @param Hotkeys
 * @text Горячие клавиши
 * @default ---------------------------------

 * @param pauseKeyCode
 * @text Код клавиши паузы
 * @parent Hotkeys
 * @desc Код клавиши паузы. 49 - Клавиша "1". Оставьте пустым, чтобы не использовать.
 * @type combo
 * @option
 * @option 49

 * @param resumeKeyCode
 * @text Код клавиши продолжения
 * @parent Hotkeys
 * @desc Код клавиши продолжения. 50 - Клавиша "2". Оставьте пустым, чтобы не использовать.
 * @type combo
 * @option
 * @option 50

 * @param acceleratedFlowKeyCode
 * @text Код клавиши ускоренного течения
 * @parent Hotkeys
 * @desc Код клавиши ускоренного течения. 51 - Клавиша "3". Оставьте пустым, чтобы не использовать.
 * @type combo
 * @option
 * @option 51

 * @param acceleratedFlowRatio
 * @text Коэффициент ускоренного течения
 * @parent acceleratedFlowKeyCode
 * @desc Коэффициент ускоренного течения
 * @type number
 * @decimals 2
 * @min 1.00
 * @default 2.00

 * @param fastFlowKeyCode
 * @text Код клавиши быстрого течения
 * @parent Hotkeys
 * @desc Код клавиши быстрого течения. 52 - Клавиша "4". Оставьте пустым, чтобы не использовать.
 * @type combo
 * @option
 * @option 52

 * @param fastFlowRatio
 * @text Коэффициент быстрого течения
 * @parent fastFlowKeyCode
 * @desc Коэффициент быстрого течения
 * @type number
 * @decimals 2
 * @min 1.00
 * @default 3.00

*/

/*~struct~DayPeriod:

 * @param name
 * @desc Name

 * @param startHour
 * @text Start hour
 * @desc Start hour
 * @type number
 * @min 0
 * @max 23
 * @default 0

 * @param endHour
 * @text End hour
 * @desc End hour (The hour itself is out of bounds)
 * @type number
 * @min 0
 * @max 23
 * @default 0

*/

/*~struct~DayPeriod:ru

 * @param name
 * @text Название
 * @desc Название

 * @param startHour
 * @text Час начала
 * @desc Час начала
 * @type number
 * @min 0
 * @max 23
 * @default 0

 * @param endHour
 * @text Час окончания
 * @desc Час окончания (Сам час не входит в границы)
 * @type number
 * @min 0
 * @max 23
 * @default 0

*/

/*~struct~DayWeek:

 * @param name
 * @text Name
 * @desc Day week name
 * @type combo
 * @option Monday
 * @option Tuesday
 * @option Wednesday
 * @option Thursday
 * @option Friday
 * @option Saturday
 * @option Sunday

 * @param shortName
 * @text Short name
 * @desc Day week short name
 * @type combo
 * @option Mon
 * @option Tue
 * @option Wed
 * @option Thu
 * @option Fri
 * @option Sat
 * @option Sun

 * @param dayOff
 * @text Day off
 * @desc Is it a day off ?
 * @type boolean
 * @default false

*/

/*~struct~DayWeek:ru

 * @param name
 * @text Название
 * @desc Название дня недели
 * @type combo
 * @option Понедельник
 * @option Вторник
 * @option Среда
 * @option Четверг
 * @option Пятница
 * @option Суббота
 * @option Воскресенье

 * @param shortName
 * @text Сокращенное название
 * @desc Сокращенное название дня недели
 * @type combo
 * @option Пн
 * @option Вт
 * @option Ср
 * @option Чт
 * @option Пт
 * @option Сб
 * @option Вс

 * @param dayOff
 * @text Выходной
 * @desc Это выходной день ?
 * @type boolean
 * @default false

*/

/*~struct~StartTime:

 * @param sec
 * @text Seconds
 * @desc Seconds at the start of the game
 * @type number
 * @min 0
 * @default 0

 * @param min
 * @text Minutes
 * @desc Minutes at the start of the game
 * @type number
 * @min 0
 * @default 0

 * @param hour
 * @text Hour
 * @desc Hour at the start of the game
 * @type number
 * @min 0
 * @default 0

 * @param day
 * @text Day
 * @desc Day at the start of the game
 * @type number
 * @min 1
 * @default 1

 * @param month
 * @text Month
 * @desc Month at the start of the game
 * @type number
 * @min 0
 * @default 0

 * @param year
 * @text Year
 * @desc Year at the start of the game
 * @type number
 * @min 0
 * @default 2021

*/

/*~struct~StartTime:ru

 * @param sec
 * @text Секунды
 * @desc Секунды в начале игры
 * @type number
 * @min 0
 * @default 0

 * @param min
 * @text Минуты
 * @desc Минуты в начале игры
 * @type number
 * @min 0
 * @default 0

 * @param hour
 * @text Час
 * @desc Час в начале игры игры
 * @type number
 * @min 0
 * @default 0

 * @param day
 * @text День
 * @desc День в начале игры игры
 * @type number
 * @min 1
 * @default 1

 * @param month
 * @text Месяц
 * @desc Месяц в начале игры игры
 * @type number
 * @min 1
 * @default 1

 * @param year
 * @text Год
 * @desc Год в начале игры игры
 * @type number
 * @min 0
 * @default 2021

*/

/*~struct~Variables:

 * @param sec
 * @text Seconds
 * @desc The variable to which the current seconds will be written
 * @type variable
 * @default 0

 * @param min
 * @text Minutes
 * @desc The variable to which the current minutes will be written
 * @type variable
 * @default 0

 * @param hour
 * @text Hour
 * @desc The variable to which the current hour will be written
 * @type variable
 * @default 0

 * @param day
 * @text Day
 * @desc The variable to which the current day will be written
 * @type variable
 * @default 0

 * @param dayWeek
 * @text Day week
 * @desc The variable to which the current day week will be written
 * @type variable
 * @default 0

 * @param month
 * @text Month
 * @desc The variable to which the current month will be written
 * @type variable
 * @default 0

 * @param year
 * @text Year
 * @desc The variable to which the current year will be written
 * @type variable
 * @default 0

 * @param season
 * @text Season
 * @desc The variable to which the current season will be written
 * @type variable
 * @default 0

*/

/*~struct~Variables:ru

 * @param seconds
 * @text Секунды
 * @desc Переменная, в которую будут записываться текущие секунды
 * @type variable
 * @default 0

 * @param minutes
 * @text Минуты
 * @desc Переменная, в которую будут записываться текущие минуты
 * @type variable
 * @default 0

 * @param hour
 * @text Час
 * @desc Переменная, в которую будет записываться текущий час
 * @type variable
 * @default 0

 * @param days
 * @text День
 * @desc Переменная, в которую будет записываться текущий день
 * @type variable
 * @default 0

 * @param dayWeek
 * @text День недели
 * @desc Переменная, в которую будет записываться текущий день недели
 * @type variable
 * @default 0

 * @param month
 * @text Месяц
 * @desc Переменная, в которую будет записываться текущий месяц
 * @type variable
 * @default 0

 * @param year
 * @text Год
 * @desc Переменная, в которую будет записываться текущий год
 * @type variable
 * @default 0

 */

/*~struct~Switch:

 * @param switch
 * @text Switch
 * @desc Switch
 * @type switch
 * @default 0

 * @param conditions
 * @text Conditions
 * @desc Conditions for enabling switch
 * @type struct<SwitchCondition>[]
 * @default []

*/

/*~struct~Switch:ru

 * @param switch
 * @text Переключатель
 * @desc Переключатель
 * @type switch
 * @default 0

 * @param conditions
 * @text Условия
 * @desc Условия для включения переключателя
 * @type struct<SwitchCondition>[]
 * @default []

*/

/*~struct~SwitchCondition:

 * @param type
 * @text Condition type
 * @desc Condition type
 * @type select
 * @option Seconds
 * @value sec
 * @option Minutes
 * @value min
 * @option Hour
 * @value hour
 * @option Day
 * @value day
 * @option Day week
 * @value dayWeek
 * @option Month
 * @value month
 * @option Year
 * @value year
 * @option Season
 * @value season
 * @default hour

 * @param operator
 * @text Comparison operator
 * @desc Comparison operator
 * @type select
 * @option =
 * @value ==
 * @option ≠
 * @value !=
 * @option >
 * @option ≥
 * @value >=
 * @option <
 * @option ≤
 * @value <=
 * @default ==

 * @param value
 * @text Value
 * @desc Value. Calculated with JavaScript.
 * @default 0

*/

/*~struct~SwitchCondition:ru

 * @param type
 * @text Тип условия
 * @desc Тип условия
 * @type select
 * @option Секунда
 * @value sec
 * @option Минута
 * @value min
 * @option Час
 * @value hour
 * @option День
 * @value day
 * @option День недели
 * @value dayWeek
 * @option Месяц
 * @value month
 * @option Год
 * @value year
 * @option Сезон
 * @value season
 * @default hour

 * @param operator
 * @text Оператор сравнения
 * @desc Оператор сравнения
 * @type select
 * @option =
 * @value ==
 * @option ≠
 * @value !=
 * @option >
 * @option ≥
 * @value >=
 * @option <
 * @option ≤
 * @value <=
 * @default ==

 * @param value
 * @text Значение
 * @desc Значение. Вычисляется с помощью Javascript.
 * @default 0

*/

/*~struct~Window:

 * @param x
 * @text The X coordinate
 * @desc The X coordinate. Calculated with Javascript.
 * @default 0

 * @param y
 * @text The Y coordinate
 * @desc The Y coordinate. Calculated with Javascript.
 * @default 0

 * @param width
 * @text Window width
 * @desc Window width. Calculated with Javascript.
 * @type combo
 * @option 240
 * @default 240

 * @param opacity
 * @text Opacity
 * @desc Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param backOpacity
 * @text Background opacity
 * @desc Background opacity
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param frameOpacity
 * @text Frame opacity
 * @desc Frame opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param skin
 * @text Skin
 * @desc Skin
 * @type struct<WindowSkin>
 * @default {"folder":"","filename":"","x":"","y":""}

 * @param lineHeight
 * @text Line height
 * @desc Line height. Calculated with Javascript.
 * @type combo
 * @option Window_Base.prototype.lineHeight.apply(this, arguments)
 * @option 32
 * @option 28
 * @option 24
 * @default Window_Base.prototype.lineHeight.apply(this, arguments)

 * @param contents
 * @text Contents
 * @desc Contents
 * @type struct<Content>[]
 * @default ["{\"text\":\"%D %MMMM %YYYY\",\"x\":\"0\",\"y\":\"0\",\"color\":\"#ffffff\",\"align\":\"center\"}","{\"text\":\"%HH%:%mm, %dddd\",\"x\":\"0\",\"y\":\"0\",\"color\":\"#ffffff\",\"align\":\"center\"}"]

 * @param font
 * @text Font
 * @desc Font face, italic, size
 * @type struct<Font>
 * @default {"fontFace":"default","fontItalic":"false","fontSize":"26"}

*/

/*~struct~Window:ru

 * @param x
 * @text Координата X
 * @desc Координата X. Вычисляется с помощью Javascript.
 * @default 0

 * @param y
 * @text Координата Y
 * @desc Координата Y. Вычисляется с помощью Javascript.
 * @default 0

 * @param width
 * @text Ширина окна
 * @desc Ширина окна. Вычисляется с помощью Javascript.
 * @type combo
 * @option 240
 * @default 240

 * @param opacity
 * @text Прозрачность
 * @desc Прозрачность
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param backOpacity
 * @text Прозрачность заднего фона
 * @desc Прозрачность заднего фона
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param frameOpacity
 * @text Прозрачность рамки
 * @desc Прозрачность рамки
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param skin
 * @text Обложка
 * @desc Обложка
 * @type struct<WindowSkin>
 * @default {"folder":"","filename":"","x":"","y":""}

 * @param lineHeight
 * @text Высота строки
 * @desc Высота строки. Вычисляется с помощью Javascript.
 * @type combo
 * @option Window_Base.prototype.lineHeight.apply(this, arguments)
 * @option 32
 * @option 28
 * @option 24
 * @default Window_Base.prototype.lineHeight.apply(this, arguments)

 * @param contents
 * @text Контент
 * @desc Контент
 * @type struct<Content>[]
 * @default ["{\"text\":\"%D %MMMM %YYYY\",\"x\":\"0\",\"y\":\"0\",\"color\":\"#ffffff\",\"align\":\"center\"}","{\"text\":\"%HH%:%mm, %dddd\",\"x\":\"0\",\"y\":\"0\",\"color\":\"#ffffff\",\"align\":\"center\"}"]

 * @param font
 * @text Шрифт текста
 * @desc Название шрифта, курсив, размер текста
 * @type struct<Font>
 * @default {"fontFace":"default","fontItalic":"false","fontSize":"26"}

*/

/*~struct~WindowSkin:

 * @param folder
 * @text Folder
 * @desc Folder
 * @default img/system/

 * @param filename
 * @text Filename
 * @desc Filename

 * @param x
 * @text The X coordinate
 * @desc The X coordinate. Calculated with Javascript.
 * @default 0

 * @param y
 * @text The Y coordinate
 * @desc The Y coordinate. Calculated with Javascript.
 * @default 0

*/

/*~struct~WindowSkin:ru

 * @param folder
 * @text Папка
 * @desc Папка
 * @default img/system/

 * @param filename
 * @text Название файла
 * @desc Название файла

 * @param x
 * @text Координата X
 * @desc Координата X. Вычисляется с помощью Javascript.
 * @default 0

 * @param y
 * @text Координата Y
 * @desc Координата Y. Вычисляется с помощью Javascript.
 * @default 0

*/

/*~struct~Content:

 * @param text
 * @text String text
 * @desc String text

 * @param x
 * @text The X coordinate
 * @desc The X coordinate
 * @type number
 * @default 0

 * @param y
 * @text The Y coordinate
 * @desc The Y coordinate
 * @type number
 * @default 0

 * @param color
 * @text Text color
 * @desc Text color in hex format
 * @default #ffffff

 * @param align
 * @text Text align
 * @desc Text align
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center

*/

/*~struct~Content:ru

 * @param text
 * @text Текст строки
 * @desc Текст строки

 * @param x
 * @text Координата X
 * @desc Координата X
 * @type number
 * @default 0

 * @param y
 * @text Координата Y
 * @desc Координата Y
 * @type number
 * @default 0

 * @param color
 * @text Цвет текста
 * @desc Цвет в hex формате
 * @default #ffffff

 * @param align
 * @text Выравнивание текста
 * @desc Выравнивание текста
 * @type select
 * @option По левому краю
 * @value left
 * @option По центру
 * @value center
 * @option По правому краю
 * @value right
 * @default center

*/

/*~struct~Font:

 * @param fontFace
 * @text Font face
 * @desc Font face
 * @type combo
 * @option default
 * @default default

 * @param fontItalic
 * @text Font italic
 * @desc Font italic
 * @type boolean
 * @default false

 * @param fontSize
 * @text Font size
 * @desc Font size
 * @type number
 * @min 0
 * @default 26

*/

/*~struct~Font:ru

 * @param fontFace
 * @text Название шрифта
 * @desc Название шрифта
 * @type combo
 * @option default
 * @default default

 * @param fontItalic
 * @text Курсив шрифта
 * @desc Курсив шрифта
 * @type boolean
 * @default false

 * @param fontSize
 * @text Размер шрифта
 * @desc Размер шрифта
 * @type number
 * @min 0
 * @default 26

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Game_Time'] = '2.5.1';

/**
 * @global
 * @type {Game_Time}
 */
var $gameTime = null;

//===========================================================================
// initialize parameters
//===========================================================================

const GameTimeParams = (function() {

    function parse(string) {
        try {
            return JSON.parse(string, function(key, value) {
                if (typeof string === 'number' || typeof string === 'boolean') {
                    return string;
                }

                try {
                    if (Array.isArray(value)) {
                        return value.map(val => parse(val));
                    }

                    return parse(value);
                } catch (e) {
                    return value;
                }
            });
        } catch(e) {
            return string;
        }
    }

    const parameters = PluginManager.parameters('DK_Game_Time');

    return Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = parse(value);

        return acc;
    }, {});

})();

GameTimeParams.blinkSpeed = 30;

//===========================================================================
// initialize plugin commands
//===========================================================================

const GameTime_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    GameTime_Game_Interpreter_pluginCommand.apply(this, arguments);

    switch (command) {
        case 'SaveGameTime': {
            Game_Time.save(Number(args[0]));
            break;
        }
        case 'LoadGameTime': {
            const slot = Number(args[0]);
            const gameTime = Game_Time.load(slot);
            gameTime && $gameTime.copyFrom(gameTime);
            break;
        }
        case 'SetGameTimeSpeed': {
            $gameTime.speed = eval(args[0]);
            break;
        }
        case 'SetGameTimeSpeedRatio': {
            $gameTime.speedRatio = eval(args[0]);
            break;
        }
        case 'GameTimeSet': {
            $gameTime[args[0]] = eval(args[1]);
            break;
        }
        case 'GameTimeSetAll': {
            $gameTime.copyFrom({
                sec: Number(args[0]),
                min: Number(args[1]),
                hour: Number(args[2]),
                day: Number(args[3]),
                month: Number(args[4]),
                year: Number(args[5]),
            })
            break;
        }
        case 'GameTimeAdd': {
            $gameTime.add(args[0], eval(args[1]));
            break;
        }
        case 'GameTimeRem': {
            $gameTime.rem(args[0], eval(args[1]));
            break;
        }
        case 'PauseGameTime': {
            $gameTime.pause(Number(args[0]) || -1);
            break;
        }
        case 'ResumeGameTime': {
            $gameTime.resume();
            break;
        }
        case 'ShowGameTimeWindow': {
            $gameSystem.setGameTimeWindowVisible(true);

            const window = Game_Time.window;
            window && window.show();
            break;
        }
        case 'HideGameTimeWindow': {
            $gameSystem.setGameTimeWindowVisible(false);

            const window = Game_Time.window;
            window && window.hide();
            break;
        }
        case 'SetGameTimeWindowVisible': {
            const visible = args[0] === 'true';
            const window = Game_Time.window;

            $gameSystem.setGameTimeWindowVisible(visible);

            if (window) {
                window.visible = visible;
            }
            break;
        }
        case 'SetGameTimeMapButtonEnabled': {
            $gameSystem.setGameTimeMapButtonEnabled(args[0] === 'true');
            break;
        }
        case 'GameTimeEventWait': {
            this.waitGameTime($gameTime.clone().add(args[0], eval(args[1])));
            break;
        }
        case 'GameTimeChangeSwitch': {
            Game_Time.addTimer($gameTime.clone().add(args[2], eval(args[3])), {
                type: 'switch',
                params: [eval(args[0]), args[1] === 'true']
            });
            break;
        }
        case 'GameTimeChangeSelfSwitch': {
            let eventId = eval(args[0]);

            if (eventId === -1) {
                eventId = this.eventId();
            }

            Game_Time.addTimer($gameTime.clone().add(args[3], eval(args[4])), {
                type: 'selfSwitch',
                params: [[$gameMap.mapId(), eventId, args[1]], eval(args[2])]
            });
            break;
        }
        case 'GameTimeChangeVariable': {
            Game_Time.addTimer($gameTime.clone().add(args[2], eval(args[3])), {
                type: 'variable',
                params: [eval(args[0]), eval(args[1])]
            });
            break;
        }
        case 'RemoveGameTimeChangeTimer': {
            const arg = args[0];
            const id = (arg ?
                eval(arg) :
                $gameVariables.value(GameTimeParams.timerVariableId));

            Game_Time.remTimer(id);
            break;
        }
    }
};

if (Utils.RPGMAKER_NAME === 'MZ') {

    PluginManager.registerCommand('DK_Game_Time', 'SaveGameTime', (args) => {
        Game_Time.save(Number(args.slot));
    });

    PluginManager.registerCommand('DK_Game_Time', 'LoadGameTime', (args) => {
        const slot = Number(args.slot);
        const gameTime = Game_Time.load(slot);
        gameTime && $gameTime.copyFrom(gameTime);
    });

    PluginManager.registerCommand('DK_Game_Time', 'SetGameTimeSpeed', (args) => {
        $gameTime.speed = eval(args.speed);
    });

    PluginManager.registerCommand('DK_Game_Time', 'SetGameTimeSpeedRatio', (args) => {
        $gameTime.speedRatio = eval(args.speedRatio);
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeSet', (args) => {
        $gameTime[args.type] = eval(args.value);
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeSetAll', (args) => {
        $gameTime.copyFrom({
            sec: eval(args.sec),
            min: eval(args.min),
            hour: eval(args.hour),
            day: eval(args.day),
            month: eval(args.month),
            year: eval(args.year)
        });
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeAdd', (args) => {
        $gameTime.add(args.type, eval(args.value));
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeRem', (args) => {
        $gameTime.rem(args.type, eval(args.value));
    });

    PluginManager.registerCommand('DK_Game_Time', 'PauseGameTime', (args) => {
        $gameTime.pause(Number(args.duration) || -1);
    });

    PluginManager.registerCommand('DK_Game_Time', 'ResumeGameTime', () => {
        $gameTime.resume();
    });

    PluginManager.registerCommand('DK_Game_Time', 'ShowGameTimeWindow', () => {
        $gameSystem.setGameTimeWindowVisible(true);

        const window = Game_Time.window;
        window && window.show();
    });

    PluginManager.registerCommand('DK_Game_Time', 'HideGameTimeWindow', () => {
        $gameSystem.setGameTimeWindowVisible(false);

        const window = Game_Time.window;
        window && window.hide();
    });

    PluginManager.registerCommand('DK_Game_Time', 'SetGameTimeWindowVisible', (args) => {
        const visible = args.visible === 'true';
        const window = Game_Time.window;

        $gameSystem.setGameTimeWindowVisible(visible);

        if (window) {
            window.visible = visible;
        }
    });

    PluginManager.registerCommand('DK_Game_Time', 'SetGameTimeMapButtonEnabled', (args) => {
        $gameSystem.setGameTimeMapButtonEnabled(args.enabled === 'true');
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeEventWait', function(args) {
        this.waitGameTime($gameTime.clone().add(args.type, eval(args.value)));
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeChangeSwitch', (args) => {
        Game_Time.addTimer($gameTime.clone().add(args.type, eval(args.value)), {
            type: 'switch',
            params: [eval(args.switch), eval(args.switchState)]
        });
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeChangeSelfSwitch', function(args) {
        let eventId = eval(args.eventId);

        if (eventId === -1) {
            eventId = this.eventId();
        }

        Game_Time.addTimer($gameTime.clone().add(args.type, eval(args.value)), {
            type: 'selfSwitch',
            params: [[$gameMap.mapId(), eventId, args.switch], eval(args.switchValue)]
        });
    });

    PluginManager.registerCommand('DK_Game_Time', 'GameTimeChangeVariable', (args) => {
        Game_Time.addTimer($gameTime.clone().add(args.type, eval(args.value)), {
            type: 'variable',
            params: [eval(args.variable), eval(args.variableValue)]
        });
    });

    PluginManager.registerCommand('DK_Game_Time', 'RemoveGameTimeChangeTimer', (args) => {
        const arg = args.id;
        const id = (arg === '0' ?
            $gameVariables.value(GameTimeParams.timerVariableId) :
            eval(arg));
        Game_Time.remTimer(id);
    });

}

//===========================================================================
// Game_Interpreter
//===========================================================================

Game_Interpreter.prototype.waitGameTime = function(gameTime) {
    this._waitGameTime = gameTime;
    this.setWaitMode('gameTime');
};

const GameTime_Game_Interpreter_updateWaitMode =
    Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === 'gameTime') {
        const waiting = $gameTime.less(this._waitGameTime);

        if (!waiting) {
            this._waitMode = '';
            delete this._waitGameTime;
        }

        return waiting;
    }

    return GameTime_Game_Interpreter_updateWaitMode.apply(this, arguments);
};

//===========================================================================
// Game_System
//===========================================================================

Game_System.prototype.isGameTimeWindowVisible = function() {
    if (this._gameTimeWindowVisible === undefined) {
        this._gameTimeWindowVisible = GameTimeParams.showMapWindowOnStart;
    }

    return this._gameTimeWindowVisible;
};

Game_System.prototype.setGameTimeWindowVisible = function(visible) {
    this._gameTimeWindowVisible = visible;
};

Game_System.prototype.isGameTimeMapButtonEnabled = function() {
    if (this._gameTimeMapButtonEnabled === undefined) {
        this._gameTimeMapButtonEnabled = true;
    }

    return this._gameTimeMapButtonEnabled;
};

Game_System.prototype.setGameTimeMapButtonEnabled = function(enabled) {
    this._gameTimeMapButtonEnabled = enabled;
};

//===========================================================================
// Game_BattlerBase
//===========================================================================

const GameTime_Game_BattlerBase_meetsUsableItemConditions =
    Game_BattlerBase.prototype.meetsUsableItemConditions;
Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
    if (!GameTime_Game_BattlerBase_meetsUsableItemConditions.apply(this, arguments)) {
        return false;
    }

    if (item.meta.useGTime) {
        try {
            const { sec, min, hour, day, dayWeek, dayPeriod, month, year, season } = $gameTime;
            return eval(item.meta.useGTime);
        } catch (e) {
            let type;

            if (DataManager.isItem(item)) {
                type = 'item';
            } else if (DataManager.isWeapon(item)) {
                type = 'weapon';
            } else if (DataManager.isArmor(item)) {
                type = 'armor';
            } else if (DataManager.isSkill(item)) {
                type = 'skill';
            }

            console.error(
                `Failed to execute note formula useGTime for type = ${type} id = ${item.id}.`);

            return false;
        }
    }

    return true;
};

//===========================================================================
// Game_Time
//===========================================================================

class Game_Time {

    constructor() {
        this.initialize.apply(this, arguments);
    }

    // initialize methods

    /**
     * @param {Game_Time | Date} [object=new Date()] - Game_Time or Date
     */
    initialize(object = new Date()) {
        this.copyFrom(object);
    }

    // A methods

    /**
     * @param {String} type - Parameter type
     * @param {Number} value - Added value
     * @return {Game_Time}
     */
    add(type, value) {
        switch (type) {
            case 'sec':
                return this.addSec(value);
            case 'min':
                return this.addMin(value);
            case 'hour':
                return this.addHour(value);
            case 'day':
                return this.addDay(value);
            case 'month':
                return this.addMonth(value);
            case 'year':
                return this.addYear(value);
            default:
                console.error('Game_Time:add unknown type!');
                break;
        }

        return this;
    }

    /**
     * @param {Number} [value=1] - Milliseconds
     * @return {Game_Time}
     */
    addMs(value = 1) {
        if (value <= 0) {
            return this;
        }

        const millisecondsInSecond = Game_Time.getMillisecondsInSecond();
        const newValue = this._ms + value;

        this._ms = newValue % millisecondsInSecond;

        return this.addSec(Math.floor(newValue / millisecondsInSecond));
    }

    /**
     * @param {Number} [value=1] - Seconds
     * @return {Game_Time}
     */
    addSec(value = 1) {
        if (value <= 0) {
            return this;
        }

        const secondsInMinute = Game_Time.getSecondsInMinute();
        const newValue = this._sec + value;

        this._sec = newValue % secondsInMinute;

        return this.addMin(Math.floor(newValue / secondsInMinute));
    }

    /**
     * @param {Number} [value=1] - Minutes
     * @return {Game_Time}
     */
    addMin(value = 1) {
        if (value <= 0) {
            return this;
        }

        const minutesInHour = Game_Time.getMinutesInHour();
        const newValue = this._min + value;

        this._min = newValue % minutesInHour;

        return this.addHour(Math.floor(newValue / minutesInHour));
    }

    /**
     * @param {Number} [value=1] - Hours
     * @return {Game_Time}
     */
    addHour(value = 1) {
        if (value <= 0) {
            return this;
        }

        const hoursInDay = Game_Time.getHoursInDay();
        const newValue = this._hour + value;

        this._hour = newValue % hoursInDay;

        return this.addDay(Math.floor(newValue / hoursInDay));
    }

    /**
     * @param {Number} [value=1] - Days
     * @return {Game_Time}
     */
    addDay(value = 1) {
        if (value <= 0) {
            return this;
        }

        const daysInMonth = this.getDaysInMonth() + 1;

        if (this._day + value < daysInMonth) {
            this._day += value;
        } else {
            this._day++;

            if (this._day === daysInMonth) {
                this._day = 1;

                this.addMonth(1);
            }

            this.addDay(value - 1);
        }

        delete this._dayWeek;

        return this;
    }

    /**
     * @param {Number} [value=1] - Months
     * @return {Game_Time}
     */
    addMonth(value = 1) {
        if (value <= 0) {
            return this;
        }

        const monthsInYear = Game_Time.getMonthsInYear();

        if (this._month + value < monthsInYear) {
            this._month += value;
        } else {
            this._month++;

            if (this._month === monthsInYear) {
                this._month = 0;

                this.addYear(1);
            }

            this.addMonth(value - 1);
        }

        delete this._dayWeek;

        return this;
    }

    /**
     * @param {Number} [value=1] - Years
     * @return {Game_Time}
     */
    addYear(value = 1) {
        if (value > 0) {
            this._year += value;
            this.day = this.day; // suddenly the number of days in a month has decreased (February)

            delete this._dayWeek;
        }

        return this;
    }

    // C methods

    /**
     * @return {Game_Time}
     */
    clone() {
        const time = new Game_Time(this);

        if (this.isPaused()) {
            time.pause(this._remainingPauseTime);
        }

        time.useRealTime(this.isRealTimeUsed());

        return time;
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false]
     * @return {Number}
     */
    compareTo(gameTime, blockSeconds = false) {
        const compareDate = this.compareToDate(gameTime);

        if (compareDate === 0) {
            return this.compareToTime(gameTime, blockSeconds);
        }

        return compareDate;
    }

    /**
     * @param {Game_Time} gameTime
     * @return {Number}
     */
    compareToDate(gameTime) {
        if (this.year > gameTime.year) {
            return 1;
        } else if (this.year < gameTime.year) {
            return -1;
        }

        if (this.month > gameTime.month) {
            return 1;
        } else if (this.month < gameTime.month) {
            return -1;
        }

        if (this.day > gameTime.day) {
            return 1;
        } else if (this.day < gameTime.day) {
            return -1;
        }

        return 0;
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false]
     * @return {Number}
     */
    compareToTime(gameTime, blockSeconds = false) {
        if (this.hour > gameTime.hour) {
            return 1;
        } else if (this.hour < gameTime.hour) {
            return -1;
        }

        if (this.min > gameTime.min) {
            return 1;
        } else if (this.min < gameTime.min) {
            return -1;
        }

        if (!blockSeconds) {
            if (this.sec > gameTime.sec) {
                return 1;
            } else if (this.sec < gameTime.sec) {
                return -1;
            }
        }

        return 0;
    }

    /**
     * @param {Game_Time | Date | Number} object - Game_Time or Date or timestamp
     * @return {Game_Time}
     */
    copyFrom(object) {
        let date = object;

        if (Number.isFinite(date)) {
            date = new Date(date);
        }

        if (date instanceof Date) {
            date = {
                ms: date.getMilliseconds(),
                sec: date.getSeconds(),
                min: date.getMinutes(),
                hour: date.getHours(),
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
            };
        }

        // restore from save
        if (date.hasOwnProperty('@')) {
            this.useRealTime(date._useRealTime);

            date = {
                ms: date._ms,
                sec: date._sec,
                min: date._min,
                hour: date._hour,
                day: date._day,
                month: date._month,
                year: date._year,
                speed: date._speed,
                speedRatio: date._speedRatio,
                _remainingPauseTime: date._remainingPauseTime
            };
        }

        this.year = date.year || 0;
        this.month = date.month || 0;
        this.day = date.day || 1;
        this.hour = date.hour || 0;
        this.min = date.min || 0;
        this.sec = date.sec || 0;
        this.ms = date.ms || 0;
        this.speed = date.speed || GameTimeParams.timeSpeed;
        this.speedRatio = date.speedRatio || 1;

        if (Number.isFinite(date._remainingPauseTime) && date._remainingPauseTime !== 0) {
            this.pause(date._remainingPauseTime);
        }

        return this;
    }

    // E methods

    /**
     * @param {Game_Time} time - Game_Time object
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    equals(time, blockSeconds = false) {
        return this.equalsDate(time) && this.equalsTime(time, blockSeconds);
    }

    /**
     * @param {Game_Time} gameTime - Game_Time object
     * @return {Boolean}
     */
    equalsDate(gameTime) {
        return this._year === gameTime.year &&
            this._month === gameTime.month &&
            this._day === gameTime.day;
    }

    /**
     * @param {Game_Time} gameTime - Game_Time object
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    equalsTime(gameTime, blockSeconds = false) {
        const result = this._hour === gameTime.hour && this._min === gameTime.min;
        return blockSeconds ?
            result : result && this._sec === gameTime.sec;
    }

    // D methods

    /**
     * @param {Game_Time} gameTime
     * @return {{ ms: Number, sec: Number, min: Number, hour: Number, day: Number, month: Number, year: Number }}
     */
    diff(gameTime) {
        return {
            ms: this.ms - gameTime.ms,
            sec: this.sec - gameTime.sec,
            min: this.min - gameTime.min,
            hour: this.hour - gameTime.hour,
            day: this.day - gameTime.day,
            month: this.month - gameTime.month,
            year: this.year - gameTime.year
        };
    }

    // F methods

    /**
     * @param {String} string
     * @return {String}
     */
    format(string) {
        return new Game_Time.Format(this).get(string);
    }

    // G methods

    /**
     * @return {{ name: String, startHour: Number, endHour: Number }}
     */
    getDayPeriod() {
        return Game_Time.getDayPeriod(this._hour);
    }

    /**
     * @return {Number}
     */
    getDaysInMonth() {
        return Game_Time.getDaysInMonth(this._month, this._year);
    }

    /**
     * @return {Number}
     */
    getDaysInYear() {
        return Game_Time.getDaysInYear(this._year);
    }

    /**
     * @return {Game_Time}
     */
    getDayStart() {
        return this.clone().setTime({
            ms: 0,
            sec: 0,
            min: 0,
            hour: 0
        });
    }

    /**
     * @return {Game_Time}
     */
    getDayEnd() {
        return this.clone().setTime({
            ms: Game_Time.getMillisecondsInSecond() - 1,
            sec: Game_Time.getSecondsInMinute() - 1,
            min: Game_Time.getMinutesInHour() - 1,
            hour: Game_Time.getHoursInDay() - 1
        });
    }

    /**
     * @return {Game_Time}
     */
    getFirstDay() {
        const clone = this.clone();

        if (this.day === 1) {
            return clone;
        }

        return clone.setDate({ day: 1 });
    }

    /**
     * @return {Game_Time}
     */
    getLastDay() {
        const clone = this.clone();
        const lastDay = this.getDaysInMonth();

        if (this.day === lastDay) {
            return clone;
        }

        return clone.setDate({ day: lastDay });
    }

    // I methods

    /**
     * @return {Boolean}
     */
    isDayOff() {
        return Game_Time.isDayOff(this._dayWeek);
    }

    /**
     * @param {Game_Time} gameTime1
     * @param {Game_Time} gameTime2
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    inRange(gameTime1, gameTime2, blockSeconds = false) {
        return !this.less(gameTime1, blockSeconds) && !this.more(gameTime2, blockSeconds);
    }

    /**
     * @param {Game_Time} gameTime1
     * @param {Game_Time} gameTime2
     * @return {Boolean}
     */
    inRangeDate(gameTime1, gameTime2) {
        return this.moreEqualsDate(gameTime1) && this.lessEqualsDate(gameTime2);
    }

    /**
     * @param {Game_Time} gameTime1
     * @param {Game_Time} gameTime2
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    inRangeTime(gameTime1, gameTime2, blockSeconds = false) {
        return this.moreEqualsTime(gameTime1) && this.lessEqualsTime(gameTime2, blockSeconds);
    }

    /**
     * @return {Boolean}
     */
    isLeapYear() {
        return Game_Time.isLeapYear(this._year);
    }

    /**
     * @return {Boolean}
     */
    isUpdated() {
        return !this.isPaused();
    }

    /**
     * @return {Boolean}
     */
    isPaused() {
        return this._remainingPauseTime > 0 || this._remainingPauseTime === -1;
    }

    /**
     * @return {Boolean}
     */
    isRealTimeUsed() {
        return this._useRealTime;
    }

    // L methods

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    less(gameTime, blockSeconds = false) {
        return this.lessDate(gameTime) ||
            this.equalsDate(gameTime) && this.lessTime(gameTime, blockSeconds);
    }

    /**
     * @param {Game_Time} gameTime
     * @return {Boolean}
     */
    lessDate(gameTime) {
        return this._year < gameTime.year ||
            this._month < gameTime.month ||
            this._day < gameTime.day;
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    lessTime(gameTime, blockSeconds = false) {
        if (this._hour < gameTime.hour || this._min < gameTime.min) {
            return true;
        }

        if (!blockSeconds) {
            return this._sec < gameTime.sec;
        }

        return false;
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    lessEquals(gameTime, blockSeconds = false) {
        return !this.more(gameTime, blockSeconds);
    }

    /**
     * @param {Game_Time} gameTime
     * @return {Boolean}
     */
    lessEqualsDate(gameTime) {
        return !this.moreDate(gameTime);
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    lessEqualsTime(gameTime, blockSeconds = false) {
        return !this.moreTime(gameTime, blockSeconds);
    }

    // M methods

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    more(gameTime, blockSeconds = false) {
        return this.moreDate(gameTime) ||
            this.equalsDate(gameTime) && this.moreTime(gameTime, blockSeconds);
    }

    /**
     * @param {Game_Time} gameTime
     * @return {Boolean}
     */
    moreDate(gameTime) {
        return this._year > gameTime.year ||
            this._month > gameTime.month ||
            this._day > gameTime.day;
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    moreTime(gameTime, blockSeconds = false) {
        if (this._hour > gameTime.hour || this._min > gameTime.min) {
            return true;
        }

        if (!blockSeconds) {
            return this._sec > gameTime.sec;
        }

        return false;
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    moreEquals(gameTime, blockSeconds = false) {
        return !this.less(gameTime, blockSeconds);
    }

    /**
     * @param {Game_Time} gameTime
     * @return {Boolean}
     */
    moreEqualsDate(gameTime) {
        return !this.lessDate(gameTime);
    }

    /**
     * @param {Game_Time} gameTime
     * @param {Boolean} [blockSeconds=false] - Blocks seconds comparison
     * @return {Boolean}
     */
    moreEqualsTime(gameTime, blockSeconds = false) {
        return !this.lessTime(gameTime, blockSeconds);
    }

    // P methods

    /**
     * @param {Number} [duration=-1] - Pause duration
     */
    pause(duration = -1) {
        this._remainingPauseTime = duration;
    }

    print() {
        console.log(
            'ms: %1, sec: %2, min: %3, hour: %4, day: %5, dayWeek: %6, month: %7, year: %8, speed: %9'
                .format(this.ms, this.sec, this.min, this.hour, this.day, this.dayWeek, this.month, this.year, this.speed)
                    + ', speedRatio: %1'.format(this.speedRatio));
    }

    // R methods

    /**
     * @param {String} type - Parameter type
     * @param {Number} value - Removed value
     * @return {Game_Time}
     */
    rem(type, value) {
        switch (type) {
            case 'sec':
                return this.remSec(value);
            case 'min':
                return this.remMin(value);
            case 'hour':
                return this.remHour(value);
            case 'day':
                return this.remDay(value);
            case 'month':
                return this.remMonth(value);
            case 'year':
                return this.remYear(value);
            default:
                console.error('Game_Time:rem unknown type!');
                break;
        }

        return this;
    }

    /**
     * @param {Number} [value=1] - Seconds
     * @return {Game_Time}
     */
    remSec(value = 1) {
        if (value <= 0) {
            return this;
        }

        if (value > this.sec) {
            const secondsInMinute = Game_Time.getSecondsInMinute();
            const nowValue = this.sec;

            this.sec = ((secondsInMinute + nowValue) - value % secondsInMinute) % secondsInMinute;

            this.remMin(Math.floor((secondsInMinute - nowValue + value) / secondsInMinute));
        } else {
            this.sec -= value;
        }

        return this;
    }

    /**
     * @param {Number} [value=1] - Minutes
     * @return {Game_Time}
     */
    remMin(value = 1) {
        if (value <= 0) {
            return this;
        }

        if (value > this.min) {
            const minutesInHour = Game_Time.getMinutesInHour();
            const nowValue = this.min;

            this.min = ((minutesInHour + nowValue) - value % minutesInHour) % minutesInHour;

            this.remHour(Math.floor((minutesInHour - nowValue + value) / minutesInHour));
        } else {
            this.min -= value;
        }

        return this;
    }

    /**
     * @param {Number} [value=1] - Hours
     * @return {Game_Time}
     */
    remHour(value = 1) {
        if (value <= 0) {
            return this;
        }

        if (value > this.hour) {
            const hoursInDay = Game_Time.getHoursInDay();
            const nowValue = this.hour;

            this.hour = ((hoursInDay + nowValue) - value % hoursInDay) % hoursInDay;

            this.remDay(Math.floor(hoursInDay - nowValue + value) / hoursInDay);
        } else {
            this.hour -= value;
        }

        return this;
    }

    /**
     * @param {Number} [value=1] - Days
     * @return {Game_Time}
     */
    remDay(value = 1) {
        if (value <= 0) {
            return this;
        }

        if (value >= this._day) {
            if (this._day === 1) {
                this.remMonth(1);

                this._day = this.getDaysInMonth();
                this.remDay(value - 1);
            } else {
                this._day--;
                this.remDay(value - 1);
            }
        } else {
            this._day -= value;
        }

        delete this._dayWeek;

        return this;
    }

    /**
     * @param {Number} [value=1] - Months
     * @return {Game_Time}
     */
    remMonth(value = 1) {
        if (value <= 0) {
            return this;
        }

        if (value > this._month) {
            const monthsInYear = Game_Time.getMonthsInYear();
            const nowValue = this._month;

            this._month = ((monthsInYear + nowValue) - value % monthsInYear) % monthsInYear;

            this.remYear(
                Math.floor((monthsInYear - nowValue + value) / monthsInYear));
        } else {
            this._month -= value;
        }

        delete this._dayWeek;

        return this;
    }

    /**
     * @param {Number} [value=1] - Years
     * @return {Game_Time}
     */
    remYear(value = 1) {
        if (value > 0) {
            this._year -= value;
            this.day = this.day; // suddenly the number of days in a month has decreased (February)

            delete this._dayWeek;
        }

        return this;
    }

    resume() {
        delete this._remainingPauseTime;
    }

    // S methods

    /**
     * @param {Game_Time | Object} date
     * @return {Game_Time}
     */
    setDate(date) {
        if (Number.isFinite(date.year)) {
            this.year = date.year;
        }

        if (Number.isFinite(date.month)) {
            this.month = date.month;
        }

        if (Number.isFinite(date.day)) {
            this.day = date.day;
        }

        return this;
    }

    /**
     * @param {Game_Time | Object} time
     * @return {Game_Time}
     */
    setTime(time) {
        if (Number.isFinite(time.hour)) {
            this.hour = time.hour;
        }

        if (Number.isFinite(time.min)) {
            this.min = time.min;
        }

        if (Number.isFinite(time.sec)) {
            this.sec = time.sec;
        }

        if (Number.isFinite(time.ms)) {
            this.ms = time.ms;
        }

        return this;
    }

    // T methods

    /**
     * @return {Date}
     */
    toDate() {
        return new Date(
            this.year,
            this.month,
            this.day,
            this.hour,
            this.min,
            this.sec,
            this.ms);
    }

    // U methods

    update() {
        if (!this.isUpdated()) {
            if (this.isPaused()) {
                this.updatePause();
            }

            return;
        }

        if (this.isRealTimeUsed()) {
            this.updateRealTime();
        } else {
            this.addMs(Game_Time.frameDuration * this.speed * this.speedRatio);
        }
    }

    updateRealTime() {
        this.copyFrom(new Date());
    }

    /**
     * @param {Boolean} [use=true]
     */
    useRealTime(use = true) {
        this._useRealTime = use;
    }

    updatePause() {
        if (this._remainingPauseTime > 0) {
            this._remainingPauseTime--;
        }
    }

    // static methods

    /**
     * @static
     */
    static initialize() {
        if (this._initialized) {
            return;
        }

        if (Imported['DKTools_Localization']) {
            DKTools.Localization.addChangeLocaleListener((prevLocale, locale) => {
                const window = this.window;
                window && window.onChangeLocale(prevLocale, locale);
            });
        }

        this._slots = {};
        this._timers = [];
        this._timerId = 1;
        this._initialized = true;
        this._updateVariables = Object.values(GameTimeParams.variables).some(variableId => variableId > 0);

        this._initializeHotkeys();
        this._checkDayPeriods();
    }

    /**
     * @private
     * @static
     */
    static _initializeHotkeys() {
        Input.keyMapper[GameTimeParams.pauseKeyCode] = 'gameTimePause';
        Input.keyMapper[GameTimeParams.resumeKeyCode] = 'gameTimeResume';
        Input.keyMapper[GameTimeParams.acceleratedFlowKeyCode] = 'gameTimeAcceleratedFlow';
        Input.keyMapper[GameTimeParams.fastFlowKeyCode] = 'gameTimeFastFlow';
    }

    /**
     * @private
     * @static
     */
    static _checkDayPeriods() {
        for (let hour = 0; hour < Game_Time.getHoursInDay(); hour++) {
            if (!Game_Time.getDayPeriod(hour)) {
                throw new Error(
                    `Could not determine the period of the day for the hour = ${hour}. Check plugin settings!`);
            }
        }
    }

    /**
     * @static
     * @param {string} version
     * @return {Boolean}
     */
    static checkVersion(version) {
        const array1 = Imported['DK_Game_Time'].split('.');
        const array2 = version.split('.');

        for (let i = 0; i < array1.length; i++) {
            const v1 = parseInt(array1[i]);
            const v2 = parseInt(array2[i]);

            if (v1 > v2) {
                return true;
            } else if (v1 < v2) {
                return false;
            }
        }

        return true;
    }

    /**
     * @static
     * @return {Number}
     */
    static getMillisecondsInSecond() {
        return 1000;
    }

    /**
     * @static
     * @return {Number}
     */
    static getSecondsInMinute() {
        return 60;
    }

    /**
     * @static
     * @return {Number}
     */
    static getMinutesInHour() {
        return 60;
    }

    /**
     * @static
     * @return {Number}
     */
    static getHoursInDay() {
        return 24;
    }

    /**
     * @static
     * @param {Number} hour
     * @return {{ name: String, startHour: Number, endHour: Number }}
     */
    static getDayPeriod(hour) {
        return Game_Time.DAY_PERIODS.find((period) => {
            const startHour = period.startHour;
            const endHour = period.endHour;

            if (endHour > startHour) {
                return hour >= startHour && hour < endHour;
            } else {
                return hour >= startHour || hour < endHour;
            }
        });
    }

    /**
     * @static
     * @return {Number}
     */
    static getDaysInWeek() {
        return 7;
    }

    /**
     * @static
     * @param {Number} month - Month
     * @param {Number} year - Year
     * @return {Number}
     */
    static getDaysInMonth(month, year) {
        const days = this.months[month];

        // February
        if (month === 1 && this.isLeapYear(year)) {
            return days + 1;
        }

        return days;
    }

    /**
     * @static
     * @param {Number} year - Year
     * @return {Number}
     */
    static getDaysInYear(year) {
        if (this._daysInYear === undefined) {
            this._daysInYear = this.months.reduce(
                (sum, days) => sum + days, 0);
        }

        if (this.isLeapYear(year)) {
            return this._daysInYear + 1;
        }

        return this._daysInYear;
    }

    /**
     * @static
     * @return {Number}
     */
    static getMonthsInYear() {
        return 12;
    }

    /**
     * @static
     * @param {Game_Time} gameTime1 - Game_Time object
     * @param {Game_Time} [gameTime2=$gameTime] - Game_Time object
     * @return {Number}
     */
    static getDaysDifference(gameTime1, gameTime2 = $gameTime) {
        const stamp1 = gameTime1.toDate().getTime();
        const stamp2 = gameTime2.toDate().getTime();
        const diff = Math.abs(stamp1 - stamp2);

        return Math.floor(diff /
            (this.getMillisecondsInSecond() *
                this.getSecondsInMinute() *
                this.getMinutesInHour() *
                this.getHoursInDay()));
    }

    /**
     * @static
     * @param {Number} dayWeek - Day week
     * @return {Boolean}
     */
    static isDayOff(dayWeek) {
        return GameTimeParams.daysWeek[dayWeek].dayOff;
    }

    /**
     * @static
     * @param {Number} year - Year
     * @return {Boolean}
     */
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * @static
     * @return {{ gameTime: Game_Time, slots: Object }}
     */
    static makeSaveContents() {
        return {
            slots: this._slots,
            timers: this._timers,
            timerId: this._timerId
        };
    }

    /**
     * @static
     */
    static extractSaveContents(data) {
        this._slots = data.slots || {};
        this._timres = data.timers || [];
        this._timerId = data.timerId || 1;
    }

    /**
     * @static
     * @param {Number} slot
     * @param {Game_Time} [gameTime=$gameTime]
     */
    static save(slot, gameTime = $gameTime) {
        this._slots[slot] = gameTime.clone();
    }

    /**
     * @static
     * @param {Number} slot
     * @return {Boolean}
     */
    static load(slot) {
        return this._slots[slot] || null;
    }

    /**
     * @static
     * @param {Game_Time} gameTime
     * @param {Object} action
     * @return {Number}
     */
    static addTimer(gameTime, action) {
        const id = this._timerId++;

        this._timers.push({ id, gameTime, action });

        if (GameTimeParams.timerVariableId > 0) {
            $gameVariables.setValue(GameTimeParams.timerVariableId, id);
        }

        return id;
    }

    /**
     * @static
     * @param {Number} id
     */
    static remTimer(id) {
        // No splice this._timers!

        const timer = this._timers.find(timer => timer.id === id);

        if (timer) {
            timer.removed = true;
        }
    }

    /**
     * @static
     */
    static update() {
        this.updateMain();
        this.updateVariables();
        this.updateSwitches();
        this.updateTimers();
    }

    /**
     * @static
     */
    static updateMain() {
        $gameTime.update();
    }

    /**
     * @static
     */
    static updateVariables() {
        this._updateVariables && Object.entries(GameTimeParams.variables)
                                        .forEach(([key, variableId]) => {
            if (variableId > 0) {
                $gameVariables.setValue(variableId, $gameTime[key]);
            }
        });
    }

    /**
     * @static
     */
    static updateSwitches() {
        GameTimeParams.switches.forEach((data) => {
            if (data.switch > 0) {
                const enabled = data.conditions.every((condition) =>
                    eval(`$gameTime['${condition.type}'] ${condition.operator} ${condition.value}`));

                $gameSwitches.setValue(data.switch, enabled);
            }
        });
    }

    /**
     * @static
     */
    static updateTimers() {
        this._timers = this._timers.filter((timer) => {
            if (timer.removed) {
                return false;
            }

            if ($gameTime.moreEquals(timer.gameTime)) {
                switch (timer.action.type) {
                    case 'switch':
                        $gameSwitches.setValue(...timer.action.params);
                        break;
                    case 'selfSwitch':
                        $gameSelfSwitches.setValue(...timer.action.params);
                        break;
                    case 'variable':
                        $gameVariables.setValue(...timer.action.params);
                        break;
                    case 'script':
                        eval(timer.action.params);
                        break;
                }

                return false;
            }

            return true;
        });
    }

    // static properties

    /**
     * @static
     * @return {Number[]}
     */
    static get months() {
        return [
            31, // January
            28, // February
            31, // March
            30, // April
            31, // May
            30, // June
            31, // July
            31, // August
            30, // September
            31, // October
            30, // November
            31  // December
        ];
    }

    /**
     * @static
     * @return {Window_GameTime | null}
     */
    static get window() {
        return SceneManager._scene._gameTimeWindow || null;
    }

    /**
     * @static
     * @return {Number}
     */
    static get frameDuration() {
        if (this._frameDuration === undefined) {
            this._frameDuration = this.getMillisecondsInSecond() / 60; // milliseconds / frames
        }

        return this._frameDuration;
    }

    // static constants

    // day period constants

    /**
     * @static
     * @return {{ name: String, startHour: Number, endHour: Number }[]}
     */
    static get DAY_PERIODS() {
        return [
            GameTimeParams.morningPeriod,
            GameTimeParams.dayPeriod,
            GameTimeParams.eveningPeriod,
            GameTimeParams.nightPeriod];
    }

    /**
     * @static
     * @return {Number}
     */
    static get MORNING() {
        return 0;
    }

    /**
     * @static
     * @return {Number}
     */
    static get DAY() {
        return 1;
    }

    /**
     * @static
     * @return {Number}
     */
    static get EVENING() {
        return 2;
    }

    /**
     * @static
     * @return {Number}
     */
    static get NIGHT() {
        return 3;
    }

    // day week constants

    /**
     * @static
     * @return {Number}
     */
    static get MONDAY() {
        return 0;
    }

    /**
     * @static
     * @return {Number}
     */
    static get TUESDAY() {
        return 1;
    }

    /**
     * @static
     * @return {Number}
     */
    static get WEDNESDAY() {
        return 2;
    }

    /**
     * @static
     * @return {Number}
     */
    static get THURSDAY() {
        return 3;
    }

    /**
     * @static
     * @return {Number}
     */
    static get FRIDAY() {
        return 4;
    }

    /**
     * @static
     * @return {Number}
     */
    static get SATURDAY() {
        return 5;
    }

    /**
     * @static
     * @return {Number}
     */
    static get SUNDAY() {
        return 6;
    }

    // month constants

    /**
     * @static
     * @return {Number}
     */
    static get JANUARY() {
        return 0;
    }

    /**
     * @static
     * @return {Number}
     */
    static get FEBRUARY() {
        return 1;
    }

    /**
     * @static
     * @return {Number}
     */
    static get MARCH() {
        return 2;
    }

    /**
     * @static
     * @return {Number}
     */
    static get APRIL() {
        return 3;
    }

    /**
     * @static
     * @return {Number}
     */
    static get MAY() {
        return 4;
    }

    /**
     * @static
     * @return {Number}
     */
    static get JUNE() {
        return 5;
    }

    /**
     * @static
     * @return {Number}
     */
    static get JULE() {
        return 6;
    }

    /**
     * @static
     * @return {Number}
     */
    static get AUGUST() {
        return 7;
    }

    /**
     * @static
     * @return {Number}
     */
    static get SEPTEMBER() {
        return 8;
    }

    /**
     * @static
     * @return {Number}
     */
    static get OCTOBER() {
        return 9;
    }

    /**
     * @static
     * @return {Number}
     */
    static get NOVEMBER() {
        return 10;
    }

    /**
     * @static
     * @return {Number}
     */
    static get DECEMBER() {
        return 11;
    }

    // season constants

    /**
     * @static
     * @return {Number}
     */
    static get WINTER() {
        return 0;
    }

    /**
     * @static
     * @return {Number}
     */
    static get SPRING() {
        return 1;
    }

    /**
     * @static
     * @return {Number}
     */
    static get SUMMER() {
        return 2;
    }

    /**
     * @static
     * @return {Number}
     */
    static get AUTUMN() {
        return 3;
    }

    // properties

    /**
     * @return {Number}
     */
    get sec() {
        return this._sec;
    }

    /**
     * @param {Number} value
     */
    set sec(value) {
        this._sec = value.clamp(0, Game_Time.getSecondsInMinute() - 1);
    }

    /**
     * @return {Number}
     */
    get min() {
        return this._min;
    }

    /**
     * @param {Number} value
     */
    set min(value) {
        this._min = value.clamp(0, Game_Time.getMinutesInHour() - 1);
    }

    /**
     * @return {Number}
     */
    get hour() {
        return this._hour;
    }

    /**
     * @param {Number} value
     */
    set hour(value) {
        this._hour = value.clamp(0, Game_Time.getHoursInDay() - 1);
    }

    /**
     * @return {Number}
     */
    get day() {
        return this._day;
    }

    /**
     * @param {Number} value
     */
    set day(value) {
        this._day = value.clamp(1, this.getDaysInMonth());
        delete this._dayWeek;
    }

    /**
     * @return {Number}
     */
    get dayPeriod() {
        return Game_Time.DAY_PERIODS.indexOf(this.getDayPeriod());
    }

    /**
     * @return {Number}
     */
    get dayWeek() {
        if (this._dayWeek === undefined) {
            const daysInWeek = Game_Time.getDaysInWeek();

            this._dayWeek = (this.toDate().getDay() + daysInWeek - 1) % daysInWeek;
        }

        return this._dayWeek;
    }

    /**
     * @return {Number}
     */
    get dayYear() {
        const month = this.month;
        const year = this.year;
        let days = 0;

        for (let i = 0; i < month; i++) {
            days += Game_Time.getDaysInMonth(i, year);
        }

        return days + this.day;
    }

    /**
     * @return {Number}
     */
    get week() {
        return Math.ceil(this.dayYear / Game_Time.getDaysInWeek());
    }

    /**
     * @return {Number}
     */
    get month() {
        return this._month;
    }

    /**
     * @param {Number} value
     */
    set month(value) {
        this._month = value.clamp(0, Game_Time.getMonthsInYear() - 1);

        // checks day initialized
        if (this._day > 0) {
            // if day = 31 and 30 days in month... (February)
            this._day = this._day.clamp(1, this.getDaysInMonth());
        }

        delete this._dayWeek;
    }

    /**
     * @return {Number}
     */
    get year() {
        return this._year;
    }

    /**
     * @param {Number} value
     */
    set year(value) {
        this._year = value;
        delete this._dayWeek;
    }

    /**
     * @return {Number}
     */
    get speed() {
        return this._speed;
    }

    /**
     * @param {Number} value
     */
    set speed(value) {
        this._speed = value.clamp(1, 60);
    }

    /**
     * @return {Number}
     */
    get speedRatio() {
        return this._speedRatio || 1;
    }

    /**
     * @param {Number} value
     */
    set speedRatio(value) {
        this._speedRatio = value;
    }

    /**
     * @return {Number}
     */
    get ms() {
        return Math.floor(this._ms) || 0;
    }

    /**
     * @param {Number} value
     */
    set ms(value) {
        this._ms = value.clamp(0, 1000);
    }

    /**
     * @return {Number}
     */
    get season() {
        const month = this._month;

        if (month < 2 || month > 10) {
            return 0;
        }

        if (month > 1 && month < 5) {
            return 1;
        }

        if (month > 4 && month < 8) {
            return 2;
        }

        return 3;
    }

    /**
     * @return {{ day: Number, month: Number, year: Number }}
     */
    get date() {
        return {
            year: this.year,
            month: this.month,
            day: this.day
        };
    }

    /**
     * @return {{ ms: Number, sec: Number, min: Number, hour: Number }}
     */
    get time() {
        return {
            hour: this.hour,
            min: this.min,
            sec: this.sec,
            ms: this.ms
        };
    }

}

//===========================================================================
// Game_Time.Format
//===========================================================================

Game_Time.Format = class {

    constructor() {
        this.initialize.apply(this, arguments);
    }

    // initialize methods

    initialize(gameTime = $gameTime) {
        this._gameTime = gameTime;
    }

    // F methods

    get(string) {
        if (!string) {
            return '';
        }

        let text = string;

        text = text.replace(/%season/g, () => this.getSeasonName());
        text = text.replace(/%A/g, () => this.getAmPm());
        text = text.replace(/%a/g, () => this.getAmPm(true));
        text = text.replace(/%:/g, () => this.getBlink());

        text = text.replace(/%YYYY/g, () => this.getYear());
        text = text.replace(/%YY/g, () => this.getYear(true));

        text = text.replace(/%MMMM/g, () => this.getMonthName());
        text = text.replace(/%MM/g, () => this.getMonth());
        text = text.replace(/%M/g, () => this.getMonth(true));

        text = text.replace(/%DP/g, () => this.getDayPeriodName());
        text = text.replace(/%DD/g, () => this.getDay());
        text = text.replace(/%D/g, () => this.getDay(true));
        text = text.replace(/%dddd/g, () => this.getDayWeekName());
        text = text.replace(/%dd/g, () => this.getDayWeekShortName());

        text = text.replace(/%HH/g, () => this.getHours());
        text = text.replace(/%H/g, () => this.getHours(true));
        text = text.replace(/%hh/g, () => this.getHours(true, true));
        text = text.replace(/%h/g, () => this.getHours(false, true));

        text = text.replace(/%mm/g, () => this.getMinutes());
        text = text.replace(/%m/g, () => this.getMinutes(true));

        text = text.replace(/%SS/g, () => this.getSeconds());
        text = text.replace(/%S/g, () => this.getSeconds(true));

        return text;
    }

    // G methods

    getSeconds(short = false) {
        return short ?
            this._gameTime.sec : this._gameTime.sec.padZero(2);
    }

    getMinutes(short = false) {
        return short ?
            this._gameTime.min : this._gameTime.min.padZero(2);
    }

    getHours(short = false, ampm = false) {
        let hour = this._gameTime.hour;

        if (ampm) {
            if (hour > 12 && hour <= 23) {
                hour -= 12;
            } else if (hour === 0) {
                hour += 12;
            }
        }

        return short ?
            hour : hour.padZero(2);
    }

    getDay(short = false) {
        return short ?
            this._gameTime.day : this._gameTime.day.padZero(2);
    }

    getDayWeekName() {
        const dayWeekName = GameTimeParams.daysWeek[this._gameTime.dayWeek].name;
        return Imported['DKTools_Localization'] ?
            DKTools.Localization.getText(dayWeekName) : dayWeekName;
    }

    getDayWeekShortName() {
        const dayWeekShortName = GameTimeParams.daysWeek[this._gameTime.dayWeek].shortName;
        return Imported['DKTools_Localization'] ?
            DKTools.Localization.getText(dayWeekShortName) : dayWeekShortName;
    }

    getDayPeriodName() {
        const period = this._gameTime.getDayPeriod();
        return Imported['DKTools_Localization'] ?
            DKTools.Localization.getText(period.name) : period.name;
    }

    getMonth(short = false) {
        const month = this._gameTime.month + 1;
        return short ?
            month : month.padZero(2);
    }

    getMonthName() {
        const monthName = GameTimeParams.months[this._gameTime.month];
        return Imported['DKTools_Localization'] ?
            DKTools.Localization.getText(monthName) : monthName;
    }

    getYear(short = false) {
        return (this._gameTime.year < 100 || !short) ?
            this._gameTime.year : this._gameTime.year % 100;
    }

    getBlink() {
        return ':';
    }

    getAmPm(lowerCase = false) {
        const hour = this._gameTime.hour;
        let result = 'PM';

        if (hour < 12) {
            result = 'AM';
        }

        return lowerCase ?
            result.toLowerCase() : result;
    }

    getSeasonName() {
        const seasonName = GameTimeParams.seasons[this._gameTime.season];
        return Imported['DKTools_Localization'] ?
            DKTools.Localization.getText(seasonName) : seasonName;
    }

};

//===========================================================================
// Hack for JsonEx encode/decode. Makes visibility for Game_Time class in window
//===========================================================================

window.Game_Time = Game_Time;

//===========================================================================
// Window_GameTime
//===========================================================================

class Window_GameTime extends Window_Base {

    initialize(rect, options, gameTime = $gameTime) {
        this._options = options;

        if (rect.height === 0) {
            rect.height = this.fittingHeight(options.contents.length);
        }

        if (Utils.RPGMAKER_NAME === 'MV') {
            super.initialize(rect.x, rect.y, rect.width, rect.height);
        } else {
            super.initialize(rect);
        }

        if (options.hasOwnProperty('opacity')) {
            this.opacity = eval(options.opacity);
        }

        if (options.hasOwnProperty('backOpacity')) {
            this.backOpacity = eval(options.backOpacity);
        }

        if (options.hasOwnProperty('frameOpacity')) {
            if (Utils.RPGMAKER_NAME === 'MV') {
                this._windowFrameSprite.opacity = eval(options.frameOpacity);
            } else {
                this._frameSprite.opacity = eval(options.frameOpacity);
            }
        }

        if (options.skin && options.skin.folder && options.skin.filename) {
            this._skin = new Sprite(
                ImageManager.loadBitmap(options.skin.folder, options.skin.filename));

            this._skin.move(eval(options.skin.x) || 0, eval(options.skin.y) || 0);

            this.addChild(this._skin);
        }

        this._gameTime = gameTime;
        this._gameTimeClone = gameTime.clone();
        this._showSeconds = options.contents.some(content =>
            content.text.includes('%SS') || content.text.includes('%S'));
        this._blinkCount = 0;

        this.refresh();
    }

    lineHeight() {
        return eval(this._options.lineHeight)
            || super.lineHeight.apply(this, arguments);
    }

    defaultFontFace() {
        return Utils.RPGMAKER_NAME === 'MV' ?
            'GameFont' : $gameSystem.mainFontFace();
    }

    defaultFont() {
        return {
            fontFace: this.defaultFontFace(),
            fontItalic: false,
            fontBold: false,
            fontSize: $gameSystem.mainFontSize()
        };
    }

    onChangeLocale(prevLocale, locale) {
        this.refresh();
    }

    // get methods

    getBlink() {
        if (SceneManager._nextScene != null || !(SceneManager._scene instanceof Scene_Map)) {
            return ':';
        }

        if (GameTimeParams.pauseWhenMessage && this._gameTime === $gameTime && $gameMessage.isBusy()) {
            return ':';
        }

        if (GameTimeParams.blinkSpeed === 0) {
            return ':';
        }

        if (!this._gameTime.isUpdated()) {
            return ':';
        }

        if (this._blinkCount % GameTimeParams.blinkSpeed >= GameTimeParams.blinkSpeed / 2) {
            return ':';
        }

        return ' ';
    }

    getContentText(content) {
        return this._gameTime.format(
            content.text.replace(/%:/g, this.getBlink.bind(this)));
    }

    // draw methods

    drawAll() {
        const lineHeight = this.lineHeight();
        let y = 0;

        this._options.contents.forEach((content) => {
            this.drawContent(content, y, lineHeight);
            y += lineHeight;
        });
    }

    drawContent(content, y, lineHeight) {
        const text = this.getContentText(content);
        const offsetX = eval(content.x) || 0;
        const offsetY = eval(content.y) || 0;
        const align = content.align || 'center';
        const font = this._options.font || this.defaultFont();

        this.contents.fontFace = font.fontFace === 'default' ?
            this.defaultFontFace() : font.fontFace;
        this.contents.fontItalic = font.fontItalic;
        this.contents.fontSize = font.fontSize;

        this.contents.drawText(
            text,
            offsetX,
            y + offsetY,
            this.contents.width,
            lineHeight,
            align);
    }

    refresh() {
        this.contents.clear();
        this.drawAll();
    }

    // update methods

    needsUpdateBlink() {
        if (GameTimeParams.blinkSpeed === 0 || !(SceneManager._scene instanceof Scene_Map)) {
            return false;
        }

        if (GameTimeParams.pauseWhenMessage && this._gameTime === $gameTime && $gameMessage.isBusy() && this._lastBlink === ':') {
            return false;
        }

        const blink = this.getBlink();

        if (this._lastBlink !== blink) {
            this._lastBlink = blink;

            return true;
        }

        return false;
    }

    update() {
        super.update.apply(this, arguments);

        if (!this.visible) {
            return;
        }

        this._blinkCount++;

        if (!this._gameTime.equals(this._gameTimeClone, !this._showSeconds) || this.needsUpdateBlink()) {
            this._gameTimeClone = this._gameTime.clone();
            this.refresh();
        }
    }

}

//===========================================================================
// Window_Base
//===========================================================================

const Game_Time_Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = Game_Time_Window_Base_convertEscapeCharacters.apply(this, arguments);

    text = text.replace(/\x1bDT\[(.+)\]/gi, function() {
        return eval(`$gameTime.format('${arguments[1]}')`);
    });

    return text;
};

//===========================================================================
// Scene_Boot
//===========================================================================

const GameTime_Scene_Boot_initialize =
    Scene_Boot.prototype.initialize;
Scene_Boot.prototype.initialize = function() {
    GameTime_Scene_Boot_initialize.apply(this, arguments);
    Game_Time.initialize();
};

//===========================================================================
// Scene_Map
//===========================================================================

const GameTime_Scene_Map_createAllWindows =
    Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    GameTime_Scene_Map_createAllWindows.apply(this, arguments);
	this.createGameTimeWindow();
};

Scene_Map.prototype.createGameTimeWindow = function(options = GameTimeParams.mapWindow) {
    this._gameTimeWindow = new Window_GameTime(
        this.gameTimeWindowRect(options), options);

	this.updateGameTimeWindowVisibility();

    this.addWindow(this._gameTimeWindow);
};

Scene_Map.prototype.gameTimeWindowRect = function(options = GameTimeParams.mapWindow) {
    const x = eval(options.x) || 0;
    const y = eval(options.y) || 0;
    const width = eval(options.width) || 240;
    const height = 0;

    return new Rectangle(x, y, width, height);
};

const GameTime_Scene_Map_updateMain =
    Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
    GameTime_Scene_Map_updateMain.apply(this, arguments);

    if (this.isGameTimeUpdated()) {
        this.updateGameTime();
    }
};

Scene_Map.prototype.isGameTimeUpdated = function() {
    return !GameTimeParams.pauseWhenMessage || !$gameMessage.isBusy();
};

Scene_Map.prototype.updateGameTime = function() {
    Game_Time.update();
};

Scene_Map.prototype.updateGameTimeWindowVisibility = function() {
    this._gameTimeWindow.visible = $gameSystem.isGameTimeWindowVisible();

    if (GameTimeParams.mapWindowButton) {
        if ($gameSystem.isGameTimeMapButtonEnabled() && Input.isTriggered(GameTimeParams.mapWindowButton)) {
            $gameSystem.setGameTimeWindowVisible(!$gameSystem.isGameTimeWindowVisible());
        }
    }
};

Scene_Map.prototype.updateGameTimeHotkeys = function() {
    if (Input.isTriggered('gameTimePause')) {
        $gameTime.pause();
    } else if (Input.isTriggered('gameTimeResume')) {
        $gameTime.speedRatio = 1;
        $gameTime.resume();
    } else if (Input.isTriggered('gameTimeAcceleratedFlow')) {
        $gameTime.speedRatio = GameTimeParams.acceleratedFlowRatio;
        $gameTime.resume();
    } else if (Input.isTriggered('gameTimeFastFlow')) {
        $gameTime.speedRatio = GameTimeParams.fastFlowRatio;
        $gameTime.resume();
    }
};

const GameTime_Scene_Map_update =
    Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    GameTime_Scene_Map_update.apply(this, arguments);
    this.updateGameTimeWindowVisibility();
    this.updateGameTimeHotkeys();
};

//=============================================================================
// DataManager
//=============================================================================

const GameTime_DataManager_createGameObjects =
    DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    GameTime_DataManager_createGameObjects.apply(this, arguments);
    $gameTime = new Game_Time(GameTimeParams.startTime);
    $gameTime.useRealTime(GameTimeParams.useRealTime);
};

const GameTime_DataManager_makeSaveContents =
    DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = GameTime_DataManager_makeSaveContents.apply(this, arguments);

    contents.gameTime       = $gameTime;
    contents.gameTimeExtra  = Game_Time.makeSaveContents();

    return contents;
};

const GameTime_DataManager_extractSaveContents =
    DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    GameTime_DataManager_extractSaveContents.apply(this, arguments);

    contents.gameTime       && $gameTime.copyFrom(contents.gameTime);
    contents.gameTimeExtra  && Game_Time.extractSaveContents(contents.gameTimeExtra);
};
