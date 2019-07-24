import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from "react";
import Icon from "../icons/PlayerIcons";
import audioMp3 from "../audio/belle.mp3";
import { getDuration } from "../helpers/playerHelper";

var Player =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Player, _React$Component);

  function Player() {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this));

    _this.playPauseAudio = function (evt) {
      evt.preventDefault();
      var audioElement = document.querySelector(".audio-file");
      var time = getDuration(audioElement.duration);
      console.log(time);

      _this.setState({
        trackDuration: time
      });

      if (!_this.state.track) {
        _this.track = _this.audioCtx.createMediaElementSource(audioElement);

        _this.setState({
          track: true
        });
      }

      _this.track.connect(_this.gainNode).connect(_this.audioCtx.destination);

      if (_this.audioCtx.state === 'suspended') {
        _this.audioCtx.resume();
      }

      if (!_this.state.isPlaying) {
        audioElement.play();

        _this.setState({
          isPlaying: true
        });
      } else {
        audioElement.pause();

        _this.setState({
          isPlaying: false
        });
      } // this.setState({
      //   isPlaying: true
      // })

    };

    _this.changeVolume = function (evt) {
      evt.preventDefault();
      var volumeControl = document.querySelector('[data-action="volume"]');
      _this.gainNode.gain.value = volumeControl.value;
    };

    _this.muteSound = function (evt) {
      evt.preventDefault();

      _this.setState({
        volumeLevel: _this.gainNode.gain.value
      });

      _this.gainNode.gain.value = 0;

      if (_this.state.volumeLevel) {
        _this.gainNode.gain.value = _this.state.volumeLevel;
      }
    };

    _this.state = {
      isPlaying: false,
      track: false,
      volumeLevel: '',
      trackDuration: ''
    };
    var audioCtx = window.AudioContext || window.webkitAudioContext;

    if (audioCtx) {
      _this.audioCtx = new audioCtx();
      _this.gainNode = _this.audioCtx.createGain();
    } else {
      throw new Error("This environment does not support the web audio API.");
    }

    return _this;
  }

  _createClass(Player, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        className: "container"
      }, React.createElement("audio", {
        className: "audio-file",
        src: audioMp3,
        crossOrigin: "anonymous"
      }), React.createElement("div", {
        className: "current-track"
      }), React.createElement("div", {
        className: "track-container"
      }, React.createElement("div", {
        className: "control-buttons"
      }, React.createElement("button", {
        className: "tape-controls-backward"
      }, React.createElement(Icon, {
        iconName: "backward"
      })), React.createElement("button", {
        className: "tape-controls-play",
        onClick: function onClick(evt) {
          return _this2.playPauseAudio(evt);
        }
      }, !this.state.isPlaying ? React.createElement("span", {
        className: "play-button"
      }, React.createElement(Icon, {
        iconName: "play"
      })) : React.createElement(Icon, {
        iconName: "pause"
      })), React.createElement("button", {
        className: "tape-controls-forward"
      }, React.createElement(Icon, {
        iconName: "forward"
      }))), React.createElement("div", {
        className: "control-track"
      }, React.createElement("span", null, "0:00 "), React.createElement("input", {
        type: "range",
        min: "0",
        max: "20"
      }), this.state.trackDuration ? React.createElement("span", null, this.state.trackDuration) : React.createElement("span", null, "0.00"))), React.createElement("div", {
        className: "volume-container"
      }, React.createElement("div", {
        className: "menu-buttons"
      }, React.createElement("button", {
        className: "playlist-control"
      }, React.createElement(Icon, {
        iconName: "playlist",
        fill: "white",
        width: "28px"
      })), React.createElement("button", {
        className: "playlist-control"
      }, React.createElement(Icon, {
        iconName: "hide",
        fill: "white",
        width: "28px"
      }))), React.createElement("div", {
        className: "volume-slider"
      }, React.createElement("button", {
        className: "tape-controls-mute",
        onClick: function onClick(evt) {
          return _this2.muteSound(evt);
        }
      }, React.createElement(Icon, {
        iconName: "mute"
      })), React.createElement("input", {
        type: "range",
        id: "volume",
        className: "control-volume",
        min: "0",
        max: "2",
        list: "gain-vals",
        step: "0.01",
        "data-action": "volume",
        onInput: function onInput(evt) {
          return _this2.changeVolume(evt);
        }
      }), React.createElement("datalist", {
        id: "gain-vals"
      }, React.createElement("option", {
        value: "0",
        label: "min"
      }), React.createElement("option", {
        value: "2",
        label: "max"
      })))));
    }
  }]);

  return Player;
}(React.Component);

export default Player;