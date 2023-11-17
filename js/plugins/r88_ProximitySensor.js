/*:
@target MZ
@plugindesc Calculates proximity and line of sight.
@author reflector88
@url https://reflector88.itch.io/
@help 

"Proximity Sensor 1.0"
This plugin activates a switch/self-switch when an event is in proximity to
the player. This is useful for roaming enemies, stealth sequences, and traps.
Also has options for direction and line of sight.

____________________________________________________________________________
CONFIGURATION
1. Open the event commands window and select "Plugin Command"

2. Select the type of proximity you want to use:
    "in All Directions" - Checks in every direction.
    "in Direction Facing" - Checks only the direction the event is facing.
    "in Orthogonal Directions" - Checks only in a cross shape.

3. Set Operator and Distance to determine the event's sight range
    (i.e. "less than 3" checks if the player is less than 3 tiles away)

4. Set the Switch and/or Self-Switch to activate when event is in proximity.

5. Set Region ID and/or Terrain Tag to denote obstacles in the map editor.

__________________________________________________________________________
TROUBLESHOOTING: 
1. The plugin command only checks once, so if you want your event to
continuously check, you will have to set the event page to "Parallel Process"

2. Also note that the plugin only turns the switch ON. It will not
automatically turn the switch OFF if you exit proximity, so you need to do
that manually
____________________________________________________________________________

TERMS OF USE
This plugin is free to use in both commercial and non-commercial projects,
though please credit me.


@param Obstacle Region ID
@type number
@desc Regions with this ID will block line of sight.
@default 1

@param Obstacle Terrain Tag
@type number
@desc Terrain with this tag will block line of sight.
@default 1

@command Basic
@text in All Directions
@desc Checks if this event is in proximity of the player.

    @arg Operator
    @type select
    @option less than @option less than or equal to @option equals @option greater than or equal to @option greater than
    @default less than or equal to
    @desc The comparison operator.

    @arg Distance
    @type number
    @default 3
    @desc The distance to be compared with the player's proximity to this event.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is turned ON if the proximity condition is fulfilled.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is turned ON if the proximity condition is fulfilled.

@command Direction
@text in Direction Facing
@desc Checks if this event is facing and in proximity of the player.

    @arg Operator
    @type select
    @option less than @option less than or equal to @option equals @option greater than or equal to @option greater than
    @default less than or equal to
    @desc The comparison operator.

    @arg Distance
    @type number
    @default 3
    @desc The distance to be compared with the player's proximity to this event.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is turned ON if the proximity condition is fulfilled.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is turned ON if the proximity condition is fulfilled.

@command Orthogonal
@text in Orthogonal Directions
@desc Checks if this event is in proximity of and in line with the player.

    @arg Operator
    @type select
    @option less than @option less than or equal to @option equals @option greater than or equal to @option greater than
    @default less than or equal to
    @desc The comparison operator.

    @arg Distance
    @type number
    @default 3
    @desc The distance to be compared with the player's proximity to this event.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is turned ON if the proximity condition is fulfilled.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is turned ON if the proximity condition is fulfilled.
*/

(() => {
    'use strict';
    const parameters = PluginManager.parameters('r88_ProximitySensor');
    const regionId = parameters["Obstacle Region ID"];
    const terrainTag = parameters["Obstacle Terrain Tag"];

    function isProx(args) {
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;
        const operator = args['Operator'];
        const distance = args['Distance'];
        const proximity = (Math.sqrt(Math.pow(eventX - playerX, 2) +
            Math.pow(eventY - playerY, 2)));

        switch (operator) {
            case 'less than': return proximity < distance;
            case 'less than or equal to': return proximity <= distance;
            case 'equals': return proximity === distance;
            case 'greater than or equal to': return proximity >= distance;
            case 'greater than': return proximity > distance;
            default: return false;
        }
    }

    function isFacing() {
        const dir = $gameMap.event(this._eventId).direction();
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;

        if (dir == 2 && eventY < playerY || dir == 8 && eventY > playerY
            || dir == 4 && eventX > playerX || dir == 6 && eventX < playerX) {
            return true;
        } else {
            return false;
        }
    }

    function isOrthogonal() {
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;

        return playerX === eventX || playerY === eventY;
    }

    // Bresenham Algorithm for line of sight calculation
    function inLineOfSight() {      
        const tileCoords = [];
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;
        const distanceX = Math.abs(playerX - eventX);
        const distanceY = Math.abs(playerY - eventY);
        const incrementX = (eventX < playerX) ? 1 : -1;
        const incrementY = (eventY < playerY) ? 1 : -1;
        let tileX = eventX;
        let tileY = eventY;
        let error = distanceX - distanceY;

        while (tileX !== playerX || tileY !== playerY) {
            tileCoords.push([tileX, tileY]);

            const error2 = 2 * error;
            if (error2 > -distanceY) {
                error -= distanceY;
                tileX += incrementX;
            }
            if (error2 < distanceX) {
                error += distanceX;
                tileY += incrementY;
            }
        }

        for (let i = 0; i < tileCoords.length; i++) {
            if ($gameMap.regionId(tileCoords[i][0], tileCoords[i][1]) == regionId ||
                $gameMap.terrainTag(tileCoords[i][0], tileCoords[i][1]) == terrainTag) 
                return false;
        }
        return true;

    }

    function flipSwitch(args) {
        if (inLineOfSight.call(this)) {
            if (args['Self-Switch'] !== '0') {
                $gameSelfSwitches.setValue([this._mapId, this._eventId,
                args['Self-Switch']], true);
            }
            $gameSwitches.setValue(args['Switch'], true);
        }
    }

    // User-defined plugin commands
    function basicProx(args) {
        if (isProx.call(this, args)) {
            flipSwitch.call(this, args);
        }
    }

    function directionProx(args) {
        if (isProx.call(this, args) && isFacing.call(this)) {
            flipSwitch.call(this, args);
        }
    }

    function orthogonalProx(args) {
        if (isProx.call(this, args) && isOrthogonal.call(this)) {
            flipSwitch.call(this, args);
        }
    }

    PluginManager.registerCommand("r88_ProximitySensor", "Basic", basicProx);
    PluginManager.registerCommand("r88_ProximitySensor", "Direction", directionProx);
    PluginManager.registerCommand("r88_ProximitySensor", "Orthogonal", orthogonalProx);

})();