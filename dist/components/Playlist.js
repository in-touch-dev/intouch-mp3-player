import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

require('../scss/App.scss');

var React = require('react');

var Icon = require('../icons/PlayerIcons');

var Player = require('./Player');

var Playlist =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Playlist, _React$Component);

  function Playlist(props) {
    var _this;

    _classCallCheck(this, Playlist);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Playlist).call(this, props));

    _this.viewPlaylistBox = function (evt) {
      evt.preventDefault();
      if (!_this.state.viewPlaylist) _this.setState({
        viewPlaylist: true
      });else _this.setState({
        viewPlaylist: false
      });
    };

    _this.setActiveTrack = function (track) {
      if (track.src === _this.state.activeTrack) {
        return;
      }

      if (window.audio && window.audio.active) {
        window.audio.active.pause();
      }

      _this.setState({
        activeTrack: track,
        showPlaylistBody: false
      });
    };

    _this.state = {
      currentIndex: _this.props.currentIndex || 0,
      activeTrack: _this.props.tracks[_this.props.currentIndex || 0]
    };
    return _this;
  }

  _createClass(Playlist, [{
    key: "playlistContent",
    value: function playlistContent() {
      var _this2 = this;

      var playlist = this.props.tracks.map(function (track, key) {
        return React.createElement("button", {
          className: "mp3-player-playlist-track-button",
          key: key,
          onClick: function onClick() {
            return _this2.setActiveTrack(track);
          }
        }, track.name, React.createElement("span", {
          className: "mp3-player-playlist-track-time"
        }, "0:00"));
      });
      return playlist;
    }
  }, {
    key: "playlistClickHandler",
    value: function playlistClickHandler(evt, overide) {
      this.setState({
        showPlaylistBody: typeof overide !== "undefined" ? overide : !this.state.showPlaylistBody
      });
    }
  }, {
    key: "playlistBody",
    value: function playlistBody() {
      var _this3 = this;

      if (this.state.hidePlaylist) {
        return;
      }

      ;
      var showPlaylist = this.state.showPlaylistBody ? "playlist" : "";
      return React.createElement("div", {
        className: "mp3-player-playlist-container ".concat(showPlaylist)
      }, React.createElement("div", {
        className: "mp3-player-playlist-header"
      }, React.createElement("button", {
        className: "mp3-player-playlist-close",
        onClick: function onClick(evt) {
          return _this3.playlistClickHandler(evt);
        }
      }, React.createElement(Icon, {
        iconName: "close",
        fill: "white"
      }))), React.createElement("div", {
        className: "mp3-player-playlist-content"
      }, this.playlistContent()));
    }
  }, {
    key: "skipHandler",
    value: function skipHandler(evt, type) {
      var newIndex = type === 'next' ? this.state.currentIndex + 1 : this.state.currentIndex - 1;

      if (typeof this.props.tracks[newIndex] !== "undefined") {
        this.setState({
          currentIndex: newIndex,
          activeTrack: this.props.tracks[newIndex]
        });
        return;
      }

      ;
      console.error("no song to play!");
    }
  }, {
    key: "togglePlaylist",
    value: function togglePlaylist(condition) {
      var state = {
        hidePlaylist: condition
      };

      if (condition) {
        state.showPlaylistBody = false;
      }

      this.setState(state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement("div", {
        className: "playlist-wrap"
      }, React.createElement(Player, {
        activeTrack: this.state.activeTrack,
        hasPlaylist: true,
        playlistClickHandler: function playlistClickHandler(evt) {
          return _this4.playlistClickHandler(evt);
        },
        skipHandler: function skipHandler(evt, type) {
          return _this4.skipHandler(evt, type);
        },
        togglePlaylist: function togglePlaylist(condition) {
          return _this4.togglePlaylist(condition);
        }
      }), this.playlistBody());
    }
  }]);

  return Playlist;
}(React.Component);

;
module.exports = {
  Playlist: Playlist
};