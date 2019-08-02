import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var React = require('react');

var Icon = require('../icons/PlayerIcons');

var formatTime = require("../helpers/playerHelper");

var Howl = require('howler');

require('../scss/App.scss');

var Player =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Player, _React$Component);

  function Player(props) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, props));

    _this.setProgressIndicator = function (val) {
      return _this.progressRef.current.querySelector(".progress").style.marginLeft = "".concat(val, "px");
    };

    _this.changeVolume = function (evt) {
      if (!_this.sound) {
        return;
      }

      evt.preventDefault();
      var volumeControl = document.querySelector('[data-action="volume"]');

      if (volumeControl) {
        _this.sound.volume(volumeControl.value);

        _this.setState({
          volumeLevel: volumeControl.value
        });
      }
    };

    _this.muteSound = function (evt) {
      if (!_this.sound) {
        return;
      }

      evt.preventDefault();
      _this.isMuted = !_this.isMuted;

      _this.sound.mute(_this.isMuted);

      var volumeControl = document.querySelector('[data-action="volume"]');

      if (volumeControl) {
        _this.setState({
          volumeLevel: _this.isMuted ? 0 : volumeControl.value
        });
      }
    };

    _this.state = _this.defaultState();
    _this.progressRef = React.createRef();
    return _this;
  }

  _createClass(Player, [{
    key: "defaultState",
    value: function defaultState() {
      return JSON.parse(JSON.stringify({
        isPlaying: false,
        track: false,
        trackDuration: 0,
        currentTime: 0,
        isHidden: false,
        volumeLevel: 1,
        currentIndex: 1
      }));
    }
  }, {
    key: "reset",
    value: function reset() {
      if (!this.sound) {
        return;
      }

      ;
      this.stopPlayLoop();
      this.sound.pause();
      this.sound = null;
      window.audio.active = null;
      this.setProgressIndicator(0);
      this.setState(this.defaultState());
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      this.props.activeTrack.src !== nextProps.activeTrack.src && this.reset();
      return true;
    }
  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      if (this.sound && this.state.isPaused) {
        this.sound.play();
        this.setState({
          isPaused: false,
          isPlaying: true
        });
        return;
      }

      this.sound = new Howl({
        src: [this.props.activeTrack.src]
      });
      window.audio = {
        active: this.sound
      };
      this.sound.once("load", function () {
        _this2.sound.on("end", function (evt) {
          _this2.stopPlayLoop();

          _this2.setProgressIndicator(_this2.progressRef.current.clientWidth);

          _this2.setState({
            currentTime: _this2.state.trackDuration,
            isPlaying: false,
            isPaused: true
          });
        });

        _this2.sound.on("play", function (evt) {
          _this2.setState({
            trackDuration: _this2.sound._duration,
            isPlaying: true,
            isPaused: false
          }, function () {
            return _this2.playLoop();
          });
        });

        _this2.sound.play();
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      this.sound.pause();
      this.stopPlayLoop();
      this.setState({
        isPlaying: false,
        isPaused: true
      });
    }
  }, {
    key: "stopPlayLoop",
    value: function stopPlayLoop() {
      clearInterval(this.loop);
      this.loop = 0;
    }
  }, {
    key: "playPause",
    value: function playPause() {
      var _this3 = this;

      if (!this.state.isPlaying) {
        return React.createElement("button", {
          className: "mp3-player-tape-controls-play",
          onClick: function onClick() {
            return _this3.play();
          }
        }, React.createElement("span", {
          className: "mp3-player-play-button"
        }, React.createElement(Icon, {
          iconName: "play"
        })));
      }

      return React.createElement("button", {
        className: "mp3-player-tape-controls-play",
        onClick: function onClick() {
          return _this3.pause();
        }
      }, React.createElement(Icon, {
        iconName: "pause"
      }));
    }
  }, {
    key: "playLoop",
    value: function playLoop() {
      var _this4 = this;

      this.loop = setInterval(function () {
        var progressIndicator = _this4.sound.seek() / _this4.state.trackDuration * _this4.progressRef.current.clientWidth;

        _this4.setState({
          currentTime: _this4.sound.seek(),
          progressIndicator: progressIndicator
        }, function () {
          return _this4.setProgressIndicator(progressIndicator);
        });
      }, 500);
    }
  }, {
    key: "progressClicked",
    value: function progressClicked(evt) {
      var _this5 = this;

      if (!this.sound) {
        return;
      }

      this.pause();
      this.movementX = (evt.pageX || evt.clientX) - evt.currentTarget.getBoundingClientRect().left;
      this.setState({
        currentTime: this.movementX / this.progressRef.current.clientWidth * this.state.trackDuration,
        progressIndicator: this.movementX
      }, function () {
        _this5.setProgressIndicator(_this5.state.progressIndicator);

        _this5.sound.seek(_this5.state.currentTime);

        _this5.play();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var trackDuration = formatTime(this.state.trackDuration);
      var currentTime = formatTime(this.state.currentTime);
      var hideMp3 = this.state.isHidden ? "hidden" : "";
      return React.createElement("div", {
        className: "mp3-player-container ".concat(hideMp3)
      }, React.createElement("div", {
        className: "mp3-player-current-track"
      }, React.createElement("div", {
        className: "mp3-player-current-img"
      }, React.createElement("img", {
        src: this.props.activeTrack.img,
        alt: "podcast"
      })), React.createElement("div", {
        className: "mp3-player-current-title"
      }, React.createElement("p", {
        className: "mp3-player-current-name"
      }, this.props.activeTrack.name), React.createElement("p", {
        className: "mp3-player-current-copy"
      }, this.props.activeTrack.desc))), React.createElement("div", {
        className: "mp3-player-track-container"
      }, React.createElement("div", {
        className: "mp3-player-control-buttons"
      }, this.props.hasPlaylist && React.createElement("button", {
        className: "mp3-player-tape-controls-backward",
        onClick: function onClick(evt) {
          return _this6.props.skipHandler(evt, 'prev');
        }
      }, React.createElement(Icon, {
        iconName: "backward"
      })), this.playPause(), this.props.hasPlaylist && React.createElement("button", {
        className: "mp3-player-tape-controls-forward",
        onClick: function onClick(evt) {
          return _this6.props.skipHandler(evt, 'next');
        }
      }, React.createElement(Icon, {
        iconName: "forward"
      }))), React.createElement("div", {
        className: "mp3-player-control-track"
      }, React.createElement("span", {
        className: "mp3-player-track-elapsed"
      }, currentTime), React.createElement("a", {
        href: "#",
        ref: this.progressRef,
        className: "progress-bar-wrap",
        onClick: function onClick(evt) {
          return _this6.progressClicked(evt);
        }
      }, React.createElement("div", {
        className: "progress"
      })), React.createElement("span", {
        className: "mp3-player-track-remaining"
      }, trackDuration))), React.createElement("div", {
        className: "mp3-player-volume-container"
      }, React.createElement("div", {
        className: "mp3-player-menu-buttons"
      }, this.props.hasPlaylist && React.createElement("button", {
        className: "mp3-player-playlist-control",
        onClick: this.props.playlistClickHandler
      }, React.createElement(Icon, {
        iconName: "playlist",
        fill: "white"
      })), React.createElement("button", {
        className: "mp3-player-hide-control",
        onClick: function onClick() {
          _this6.setState({
            isHidden: _this6.state.isHidden ? false : true
          }, function () {
            return _this6.props.togglePlaylist(_this6.state.isHidden);
          });
        }
      }, React.createElement(Icon, {
        iconName: "hide",
        fill: "white"
      }))), React.createElement("div", {
        className: "mp3-player-volume-slider"
      }, React.createElement("button", {
        className: "mp3-player-tape-controls-mute",
        onClick: function onClick(evt) {
          return _this6.muteSound(evt);
        }
      }, React.createElement(Icon, {
        iconName: !this.state.volumeLevel ? "mute" : "volume"
      })), React.createElement("input", {
        type: "range",
        id: "volume",
        className: "mp3-player-volume-input",
        min: "0",
        max: "2",
        list: "gain-vals",
        step: "0.01",
        "data-action": "volume",
        onInput: function onInput(evt) {
          return _this6.changeVolume(evt);
        }
      }))));
    }
  }]);

  return Player;
}(React.Component);

module.exports = {
  Player: Player
};