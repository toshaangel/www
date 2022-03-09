/*:
 * @plugindesc Дополнительный скрипт для упрвления движения мышкой
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/mobile-controls
 *
 * @help
 * 
 *  Вызов скрипта:
 * 
 * 
 * SetMoveByTouch(true|false) - включить или отключить движение по нажатию мышки
 * 
 * По умолчанию отключено
 * 
 */

(function(){
    
    window.SetMoveByTouch = function(state) {
        $gameSystem._MC_moveByMouse = state;
    };

    //@[ALIAS]
    var _alias_Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function () {
        if($gameSystem._MC_moveByMouse == true)
            _alias_Scene_Map_processMapTouch.call(this);
    };

})();