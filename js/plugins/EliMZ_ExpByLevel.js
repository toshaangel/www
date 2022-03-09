//==========================================================================
// EliMZ_ExpByLevel.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc Actor gains exp according to their level.
@author Hakuen Studio | v2.1.1
@url https://hakuenstudio.itch.io/

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

After setting an experience value for the enemy, this enemy will give that 
same amount of experience, and there is no way to change that.
This plugin aims to implement a system where the actor will gain experience 
according to the difference in level between him and the enemy. 
No enemy level plugin is required.

============================================================================
Features
============================================================================

● Adds a new method of obtaining experience according to the actor's level.

============================================================================
How to use
============================================================================

As long as the actor is below or at the same level as an enemy, he will 
gain the full value of that enemy's experience.
However, at each level higher than the enemy, the experience gained will 
be reduced according to a percentage value defined in the plugin 
parameters.

See the example below where an enemy has 100 Exp defined in the database:

Percentage in the parameters = 10%.
Enemy level 5 = 100 Exp
Actor level 5 = Will get 100 Exp (100%)
Actor level 7 = You are two levels above the enemy, so you will only earn 
80% of the experience value of that enemy, which in this case would be 80.

You can set the level of enemies with the following note:
<EnLevel: 10>
Or if you want to change the value during the game:
<EnLevel: \v[id]>

If you don't set a level for the enemy, it will always give full exp.

NOTE¹: If you are using Eli Enemy Class, you can ignore these note tags as 
they will take the ones from the Enemy Class Plugin.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

============================================================================
Update log
============================================================================
Version 2.1.1 - 02/19/2021
- Fixed a bug that is letting the exp numbers to be decimals.
Version 2.1.0 - 02/19/2021
- Add compatibility with Eli Enemy Class(To get the level from the enemy).
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
Version 1.0.0 - 24/11/2020
- Plugin release!

@param percent
@text Exp Difference %
@type number
@min 0
@max 100
@desc How much experience the actor will fail to gain for each level more than the enemy(by percent).
@default 10

*/

"use strict"

var Eli = Eli || {};
var Imported = Imported || {};
Imported.Eli_ExpByLevel = true;

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const url = String(document.currentScript._url);
        const start = url.indexOf('Eli');
        const end = url.length - 3;
        const pluginName = url.substring(start, end);

        return pluginName;
    })();
    const requiredVersion = ['3','0','0']
    const updateWarning = `${pluginName} needs an updated version of EliMZ_Book.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    };
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook();
            Eli.alert = true;
        }
    };

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook();
            Eli.alert = true;
        }
    };
    
    if(!Imported.Eli_Book) needInstallBook();
    if(Eli.Book.Version < requiredVersion) needUpdateBook();
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.ExpByLevel = {

    parameters: EliPluginManager.createParameters() || {},
    alias: this.alias || {},
    lastExp: [],

    param(){
        return this.parameters;
    },

    percent(){
        return this.param().percent;
    },

    getLastExp(){
        return this.lastExp;
    },

    setActorLastExp(actorId, exp){
        this.lastExp[actorId] = exp;
    },

    getActorLastExp(actorId){
        return this.lastExp[actorId];
    },

    getEnemyLevel(enemy){
        if(Imported.Eli_EnemyClass){
            return enemy._level

        }else{
            const meta = enemy.enemy().meta

            if(meta.hasOwnProperty('EnLevel')){
                return +EliBook.convertEscapeVariablesOnly(meta.EnLevel)
            }else{
                return 1000
            }
        }
    },

    makeExpForEachActor(){
        const enemies = $gameTroop.members();
        const party = $gameParty.allMembers();
        const percent = this.percent();
    
        for(const member of party){
            let exp = 0;
    
            for(const enemy of enemies){

                const enemyLevel = this.getEnemyLevel(enemy)
                
                if(member._level > enemyLevel){
                    const difference = member._level - enemyLevel;
                    const totalPercent = Math.min(difference * percent, 100);
                    const newExp = enemy.exp() - EliBook.ruleOf3(100, enemy.exp(), totalPercent);
    
                    exp += Math.max(0, ~~(newExp));
                }else{
                    exp += enemy.exp()
                }
            }
            this.setActorLastExp(member._actorId, exp);
        }
    },

};

const Plugin = Eli.ExpByLevel;
const Alias = Eli.ExpByLevel.alias;

/* ========================================================================== */
/*                                   MANAGER                                  */
/* ========================================================================== */

Alias.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    Alias.BattleManager_makeRewards.call(this);
    Plugin.makeExpForEachActor();
};

// Overwrite
BattleManager.gainExp = function() {
    for(const actor of $gameParty.allMembers()){
        const exp = Plugin.getActorLastExp(actor._actorId);
        actor.gainExp(exp);
    }
};

// Overwrite
BattleManager.displayExp = function() {
    const actors = $gameParty.battleMembers();

    for (const actor of actors){
        const exp = Plugin.getActorLastExp(actor._actorId);

        if(exp){
            const text = `${actor.name()} получает ${exp} Exp!`
            $gameMessage.add("\\." + text);
        }
    }
};

}