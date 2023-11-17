/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
 *
 */

/*:
 * @plugindesc (v.1.0)[PRO] Ambient Sound
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/ambient-sound
 *
 * @help
 * You can create sound points on the map that will be played at
 * a certain interval and only at a specified distance from the player.
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * Script Calls:
 *
 * - Create ambient sound point on Map
 *  setAmbientInterval(ID, "FILE_NAME", X, Y, T1, T2, DISTANCE)
 *  
 *   * ID - unique ID (it is needed so that you can delete this sound point)
 *   * FILE_NAME - SE sound file name
 *   * X, Y - map coordinates
 *   * T1, T2 - The time (in SECONDS) after which the sound will be repeated.
 *      A random number is selected between T1 and T2
 *   * DISTANCE - the minimum distance to the player at which the
 *      sound point will be activated
 *
 *   Example: setAmbientInterval(1, "Miss", 10, 20, 1, 3, 5);
 * 
 * - Create ambient sound point on Event (links to event)
 *  setAmbientIntervalEv(ID, "FILE_NAME", EVENT_ID, T1, T2, DISTANCE)
 *
 *  * EVENT_ID - event Id on map to link sound point.
 *  All other arguments is same
 *
 *   Example: setAmbientIntervalEv(2, "Equip1", 8, 1, 3, 3);
 *
 * - Create looped ambient sound on Map
 *  setAmbientLoop(ID, "FILE_NAME", X, Y, DISTANCE, LOOP_REPEAT_TIME)
 *
 *  * LOOP_REPEAT_TIME - the time (in MILLISECONDS) after which the sound
 *    will be played again (while the previous one does not stop)
 *    All other arguments is same
 *
 *   Example: setAmbientLoop(3, "Waterfall", 10, 20, 5, 150);
 *
 * - Create looped ambient sound point on Event (links to event)
 *   setAmbientLoopEv(ID, "FILE_NAME", EVENT_ID, DISTANCE, LOOP_REPEAT_TIME)
 *
 *
 * - Clear ambient sound point
 *   clearAmbientSound(ID)
 *
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
  *
 * 

 * @param volumeMod
 * @text Volume Multiplier
 * @type number
 * @default 100
 * @min 1
 * @desc Ambient sounds volume multiplier in %. 100 = 100%
 * 
 * @param resetOnMapChange
 * @text Auto Clear
 * @type boolean
 * @default false
 * @on Clear
 * @off Keep
 * @desc Clear all sound points when map is changes?
 * 
 * 
 * 
 */

/*:ru
 * @plugindesc (v.1.0)[PRO] Ambient Sound (Окружающий звук)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/ambient-sound
 *
 * @help
 * Плагин позволяет создавать точки-источники звука на карте.
 * Данные точки могут быть зацикленны или вопроизводится в определённом
 * интервале. Также могут менять свою громкость в зависимости от
 * расстояния до слушателя (игрока) и активироваться на определённом
 * расстоянии от слушателя.
 * 
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * Вызовы скриптов:
 *
 * - Создать источник звука
 *  setAmbientInterval(ID, "ИМЯ_ФАЙЛА", X, Y, T1, T2, DISTANCE)
 *  
 *   * ID - уникальный идентификатор (нужен чтобы можно было удалить данную точку)
 *   * ИМЯ_ФАЙЛА - имя SE файла звука
 *   * X, Y - координаты на карте
 *   * T1, T2 - Интервал (в секундах) повторения воспроизведения
 *      Случайное число будет выбранно между T1 и T2
 *   * DISTANCE - минимальное расстояние до игрока на котором звук будет активирован
 *
 *   Пример: setAmbientInterval(1, "Miss", 10, 20, 1, 3, 5);
 * 
 * - Создать источник звука (привязать к событию)
 *  setAmbientIntervalEv(ID, "ИМЯ_ФАЙЛА", EVENT_ID, T1, T2, DISTANCE)
 *
 *  * EVENT_ID - номер события на карте к которому привязывается звук
 *  Остальные аргументы аналогичны
 *
 *   Пример: setAmbientIntervalEv(2, "Equip1", 8, 1, 3, 3);
 *
 * - Создать зацикленный источник звука в точке карты
 *  setAmbientLoop(ID, "ИМЯ_ФАЙЛА", X, Y, DISTANCE, LOOP_REPEAT_TIME)
 *
 *  * LOOP_REPEAT_TIME - время (в миллисекундах) через которое звук будет
 * повторятся, т.е. запускаться снова (накладывается на предыдущий)
 *    Остальные аргументы аналогичны
 *
 *   Пример: setAmbientLoop(3, "Waterfall", 10, 20, 5, 150);
 *
 * - Создать зацикленный источник звука с привязкой к событию
 *   setAmbientLoopEv(ID, "ИМЯ_ФАЙЛА", EVENT_ID, DISTANCE, LOOP_REPEAT_TIME)
 *  Остальные аргументы аналогичны (см. выше)
 *
 * - Удалить точку источник звука
 *   clearAmbientSound(ID)
 *
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty
 *      https://boosty.to/kagedesu
 * 
 * YouTube канал:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * Плагин сделан благодаря тем людям, которые меня поддерживают
 * 
 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial
 *
 * Вы можете использовать плагин в коммерческих проектах на
 * условии, что этот плагин был приобретён Вами на законных
 * основаниях (путём покупки плагина или подписки на
 * https://boosty.to/kagedesu)
 * 
 * 
 * @param volumeMod
 * @text Модификатор громкости
 * @type number
 * @default 100
 * @min 1
 * @desc Модификатор громкости для источников звука в %. 100 = 100%
 * 
 * @param resetOnMapChange
 * @text Авто очистка
 * @type boolean
 * @default false
 * @on Очистить
 * @off Оставить
 * @desc Очистить все источники звука при смене карты?
 * 
 * 
 */

// Generated by CoffeeScript 2.6.1
var Imported;

Imported = Imported || {};

Imported.PKD_AmbientSound = true;

window.PKD_AmbientSound = {};

PKD_AmbientSound.version = 100;

// * Параметры
PKD_AmbientSound.IsAutoClear = function() {
  return this._ppIsAutoClear;
};

PKD_AmbientSound.VolumeMod = function() {
  return this._volumeMod;
};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Load Parameters
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _, parameters;
  //@[DEFINES]
  _ = PKD_AmbientSound;
  parameters = PluginManager.parameters('PKD_AmbientSound');
  if (parameters.resetOnMapChange != null) {
    _._ppIsAutoClear = eval(parameters.resetOnMapChange);
  } else {
    _._ppIsAutoClear = false;
  }
  if (parameters.volumeMod != null) {
    _._volumeMod = parseInt(parameters.volumeMod) / 100;
  } else {
    _._volumeMod = 1;
  }
})();

// ■ END LibraryName.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ CORE.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  if (Array.prototype.delte == null) {
    Array.prototype.delete = function() {
      var L, a, ax, what;
      what = void 0;
      a = arguments;
      L = a.length;
      ax = void 0;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
  }
})();

// ■ END CORE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ API.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  window.setAmbientLoop = function(id, seFilename, x, y, distance, loopInterval) {
    var e;
    try {
      return $gameMap.amsRegisterSoundPoint({id, seFilename, x, y, distance, loopInterval});
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.setAmbientLoopEv = function(id, seFilename, eventId, distance, loopInterval) {
    var e;
    try {
      return $gameMap.amsRegisterSoundPoint({id, seFilename, eventId, distance, loopInterval});
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.setAmbientInterval = function(id, seFilename, x, y, a, b, distance) {
    var e;
    try {
      return $gameMap.amsRegisterSoundPoint({id, seFilename, x, y, a, b, distance});
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.setAmbientIntervalEv = function(id, seFilename, eventId, a, b, distance) {
    var e;
    try {
      return $gameMap.amsRegisterSoundPoint({id, seFilename, eventId, a, b, distance});
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.clearAmbientSound = function(id) {
    var e;
    try {
      return $gameMap.amsClearSoundPoint(id);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END LibraryName.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AudioManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AudioManager;
  _.amsInitLoopBuffers = function(id) {
    if (this._seLoopBuffers == null) {
      this._seLoopBuffers = {};
    }
    if (id == null) {
      return;
    }
    if (this._seLoopBuffers[id] == null) {
      this._seLoopBuffers[id] = [];
    }
  };
  _.amsPushToLoopBuffers = function(id, buffer) {
    this.amsInitLoopBuffers(id);
    this._seLoopBuffers[id] = this._seLoopBuffers[id].filter(function(buffer) {
      return buffer.isPlaying();
    });
    this._seLoopBuffers[id].push(buffer);
  };
  _.amsResumeBuffers = function() {
    var i, id, j, k, keys, len, len1, ref;
    this.amsInitLoopBuffers();
    keys = Object.keys(this._seLoopBuffers);
    for (j = 0, len = keys.length; j < len; j++) {
      id = keys[j];
      ref = this._seLoopBuffers[id];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        i = ref[k];
        if (i.__oldVolume != null) {
          i.volume = i.__oldVolume;
        }
      }
    }
  };
  _.amsPauseBuffers = function() {
    var i, id, j, k, keys, len, len1, ref;
    this.amsInitLoopBuffers();
    keys = Object.keys(this._seLoopBuffers);
    for (j = 0, len = keys.length; j < len; j++) {
      id = keys[j];
      ref = this._seLoopBuffers[id];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        i = ref[k];
        i.__oldVolume = i.volume;
        i.volume = 0;
      }
    }
  };
  _.amsRemoveLoopBuffers = function(id) {
    var i, j, len, ref;
    this.amsInitLoopBuffers(id);
    ref = this._seLoopBuffers[id];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.stop();
    }
    this._seLoopBuffers[id] = [];
  };
  _.amsPlaySeLoop = function(id, se, point) {
    if (Utils.RPGMAKER_NAME.contains("MV")) {
      this.amsPlaySeLoop_MV(...arguments);
    } else {
      this.amsPlaySeLoop_MZ(...arguments);
    }
  };
  _.amsPlaySeLoop_MV = function(id, se, point) {
    var buffer, e;
    try {
      if (se == null) {
        return;
      }
      if (se.name == null) {
        return;
      }
      if (se.name === "") {
        return;
      }
      this._seBuffers = this._seBuffers.filter(function(audio) {
        return audio.isPlaying();
      });
      buffer = this.createBuffer('se', se.name);
      this.updateSeParameters(buffer, se);
      buffer.play(false); // false - loop
      this._seBuffers.push(buffer);
      return this.amsPushToLoopBuffers(id, buffer);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.amsPlaySeLoop_MZ = function(id, se, point) {
    var buffer, e, latestBuffers, sameInSameFrame;
    try {
      if (se == null) {
        return;
      }
      if (se.name == null) {
        return;
      }
      if (se.name === "") {
        return;
      }
      latestBuffers = this._seBuffers.filter(function(buffer) {
        return buffer.frameCount === Graphics.frameCount;
      });
      sameInSameFrame = latestBuffers.find(function(buffer) {
        return buffer.name === se.name;
      });
      if (sameInSameFrame != null) {
        return;
      }
      buffer = this.createBuffer('se/', se.name);
      this.updateSeParameters(buffer, se);
      buffer.play(false); // false - loop
      this._seBuffers.push(buffer);
      this.amsPushToLoopBuffers(id, buffer);
      return this.cleanupSe();
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.amsUpdateLoopBuffersParameters = function(id, volume) {
    var buffer, j, len, ref, results;
    this.amsInitLoopBuffers(id);
    ref = this._seLoopBuffers[id];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      buffer = ref[j];
      results.push(this.amsUpdateLoopBufferVolume(buffer, volume));
    }
    return results;
  };
  _.amsUpdateLoopBufferVolume = function(buffer, volume) {
    if (buffer == null) {
      return;
    }
    buffer.volume = this._seVolume * (volume || 0) / 10000;
    buffer.volume *= PKD_AmbientSound.VolumeMod();
  };
})();

// ■ END AudioManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this.amsInitialize();
  };
  
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    this.amsLoadAllSounds();
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  _.amsInitialize = function() {
    if (this.amsPoints == null) {
      return this.amsPoints = {};
    }
  };
  _.amsInitializeForMap = function() {
    this.amsInitialize();
    if (this.amsPoints[this.mapId()] == null) {
      this.amsPoints[this.mapId()] = [];
    }
  };
  _.amsLoadAllSounds = function() {
    this.amsClearAllLoopedSounds();
    if (PKD_AmbientSound.IsAutoClear()) {
      // * RESET
      this.amsPoints = {};
    }
    this.amsInitializeForMap();
    AudioManager.amsResumeBuffers();
  };
  _.amsCurrentMapSounds = function() {
    this.amsInitializeForMap();
    return this.amsPoints[this.mapId()];
  };
  _.amsClearAllLoopedSounds = function() {
    var data, i, len, ref;
    this.amsLoopRefreshTimer = 6; // * 6 for first pass
    ref = this.amsCurrentMapSounds();
    for (i = 0, len = ref.length; i < len; i++) {
      data = ref[i];
      if (data == null) {
        continue;
      }
      AudioManager.amsRemoveLoopBuffers(data.id);
    }
  };
  _.amsPauseAllLoopedSounds = function() {
    return AudioManager.amsPauseBuffers();
  };
  // * data {
  // id
  // seFilename
  // x, y || eventId
  // distance
  // a, b || loopInterval
  //  * }
  _.amsRegisterSoundPoint = function(data) {
    this.amsInitializeForMap();
    this.amsClearSoundPoint(data.id);
    // * создаём SE объект
    data.se = {
      name: data.seFilename,
      pan: 0,
      pitch: 100,
      volume: 0 // * изначально нет громкости
    };
    data.isInterval = (data.a != null) && (data.b != null);
    if (data.isInterval === true) {
      this._amsResetSoundPointIntervalTimer(data); // * иначе это loop
    } else {
      data.currentReplayTick = data.loopInterval + 1; // * for first pass
    }
    this.amsPoints[this.mapId()].push(data);
  };
  // * Удаляет точку звука по ID (ищет на всех картах)
  _.amsClearSoundPoint = function(id) {
    var i, item, len, mapId, ref, resultItem, resultMapId;
    resultMapId = null;
    for (mapId in this.amsPoints) {
      ref = this.amsPoints[mapId];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if ((item != null) && item.id === id) {
          resultMapId = mapId;
          resultItem = item;
          break;
        }
      }
    }
    if (resultMapId != null) {
      this.amsPoints[resultMapId].delete(resultItem);
      this.amsTurnOffLoopedSoundPoint(id);
    }
  };
  _._amsResetSoundPointIntervalTimer = function(data) {
    data.currentIntervalTimer = 0;
    data.nextIntervalTime = Math.randomInt(Math.abs(data.a - data.b)) + data.a;
    data.nextIntervalTime *= 60; // * from seconds to frames
  };
  _.amsUpdateSounds = function() {
    this.amsUpdateIntervalSoundPoints();
    return this.amsUpdateLoopedSoundPoints();
  };
  _.amsUpdateIntervalSoundPoints = function() {
    var data, i, len, ref, x, y;
    ref = this.amsPoints[this.mapId()];
    for (i = 0, len = ref.length; i < len; i++) {
      data = ref[i];
      if (data == null) {
        continue;
      }
      if (!data.isInterval) {
        continue;
      }
      ({x, y} = this._amsGetSoundPointProperSource(data));
      if (this.amsIsInProperDistanceRange(data.distance, x, y)) {
        this.amsUpdateIntervalSoundPointsInDistance(data);
      }
    }
  };
  _._amsGetSoundPointProperSource = function(data) {
    if (data.eventId != null) {
      return $gameMap.event(data.eventId);
    } else {
      return data;
    }
  };
  _.amsIsInProperDistanceRange = function(distance, x, y) {
    return this._amsGetSoundPointSourceDistance(x, y) <= distance;
  };
  _._amsGetSoundPointSourceDistance = function(x, y) {
    return this.distance($gamePlayer.x, $gamePlayer.y, x, y);
  };
  _.amsUpdateIntervalSoundPointsInDistance = function(data) {
    var dist, volume, x, y;
    data.currentIntervalTimer++;
    if (data.currentIntervalTimer >= data.nextIntervalTime) {
      this._amsResetSoundPointIntervalTimer(data);
      ({x, y} = this._amsGetSoundPointProperSource(data));
      dist = this._amsGetSoundPointSourceDistance(x, y);
      volume = this.amsGetProperVolumeForSoundPoint(dist, data.distance);
      this.amsPlaySoundIntervalOnce(data.se, {x, y}, volume);
    }
  };
  // * Получить уровень звука для точки в зависимости от расстояния от 1 до 100
  _.amsGetProperVolumeForSoundPoint = function(distance, maxDistance) {
    var volume;
    if (distance <= 2 && maxDistance > 4) {
      return 100;
    } else {
      volume = 100 - ((distance / maxDistance) * 100);
      if (volume < 20) {
        return 20;
      } else {
        return volume;
      }
    }
  };
  // * Воспроизводится один раз, для интервалов
  _.amsPlaySoundIntervalOnce = function(se, point, volume) {
    var sound;
    if (se == null) {
      return;
    }
    //"PLAY INTERVAL WITH VOLUME".p(volume)
    sound = {
      name: se.name,
      pan: 0,
      pitch: 100,
      volume: volume
    };
    AudioManager.playStaticSe(sound);
  };
  _.amsUpdateLoopedSoundPoints = function() {
    var data, i, len, ref, x, y;
    ref = this.amsPoints[this.mapId()];
    for (i = 0, len = ref.length; i < len; i++) {
      data = ref[i];
      if (data == null) {
        continue;
      }
      if (data.isInterval) {
        continue;
      }
      ({x, y} = this._amsGetSoundPointProperSource(data));
      if (this.amsIsInProperDistanceRange(data.distance, x, y)) {
        this.amsUpdateLoopSoundPointInDistance(data);
      } else {
        this.amsTurnOffLoopedSoundPoint(data.id);
      }
    }
  };
  _.amsUpdateLoopSoundPointInDistance = function(data) {
    var dist, volume, x, y;
    data.currentReplayTick++;
    this.amsLoopRefreshTimer++;
    if (this.amsLoopRefreshTimer < 5) {
      return;
    } else {
      this.amsLoopRefreshTimer = 0;
      ({x, y} = this._amsGetSoundPointProperSource(data));
      dist = this._amsGetSoundPointSourceDistance(x, y);
      volume = this.amsGetProperVolumeForSoundPoint(dist, data.distance);
      this.amsPlayLoopSound(data, {x, y}, volume);
    }
  };
  _.amsPlayLoopSound = function(data, point, volume) {
    var currentReplayTick, id, loopInterval, se;
    ({id, se, loopInterval, currentReplayTick} = data);
    if (currentReplayTick > loopInterval) {
      data.currentReplayTick = 0;
      AudioManager.amsPlaySeLoop(id, se, point);
    }
    AudioManager.amsUpdateLoopBuffersParameters(id, volume);
  };
  _.amsTurnOffLoopedSoundPoint = function(id) {
    return AudioManager.amsRemoveLoopBuffers(id);
  };
  // * MAP SCENE ===================================
  _.amsOnMapLoaded = function() {
    return this.amsInitializeForMap();
  };
  _.amsUpdate = function() {
    return this.amsUpdateSounds();
  };
  _.amsOnMapStop = function() {
    this.amsPauseAllLoopedSounds();
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, ALIAS__stop, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    $gameMap.amsOnMapLoaded();
    ALIAS__onMapLoaded.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    $gameMap.amsUpdate();
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    $gameMap.amsOnMapStop();
    ALIAS__stop.call(this);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_AmbientSound builded by PKD PluginBuilder 2.0 - 11.03.2022