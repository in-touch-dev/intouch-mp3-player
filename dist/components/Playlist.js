import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from "react";
import Icon from "../icons/PlayerIcons";
import "../scss/app.css";
import Player from "./Player";

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

      _this.setState({
        activeTrack: track,
        showPlaylistBody: false
      });
    };

    _this.state = {
      currentIndex: _this.props.currentIndex || 0,
      activeTrack: _this.props.tracks[_this.props.currentIndex || 0],
      isMobile: false
    };
    return _this;
  }

  _createClass(Playlist, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        activeTrack: newProps.tracks[newProps.currentIndex || 0],
        currentIndex: newProps.currentIndex || 0
      }, function () {});
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var bp;

      if (this.props.opts) {
        bp = this.props.opts.breakpoint ? Math.abs(this.props.opts.breakpoint.maxWidth + (this.props.opts.offset && this.props.opts.offset.left ? this.props.opts.offset.left : 0) + (this.props.opts.offset && this.props.opts.offset.right ? this.props.opts.offset.right : 0)) : 768;
      } else {
        bp = 768;
      }

      this.breakpoint = window.matchMedia("(max-width: ".concat(bp, "px)"));

      var breakpointHandler = function breakpointHandler() {
        _this2.setState({
          isMobile: _this2.breakpoint.matches
        });
      };

      this.breakpoint.addListener(breakpointHandler);
      breakpointHandler();
    }
  }, {
    key: "playlistContent",
    value: function playlistContent() {
      var _this3 = this;

      var playlist = this.props.tracks.map(function (track, key) {
        return React.createElement("button", {
          className: "mp3-player-playlist-track-button",
          key: key,
          onClick: function onClick() {
            return _this3.setActiveTrack(track);
          }
        }, track.name);
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
      var _this4 = this;

      if (this.state.hidePlaylist) {
        return;
      }

      var showPlaylist = this.state.showPlaylistBody ? "playlist" : "";
      var isMobile = this.state.isMobile ? 'is-mobile' : '';
      var styleOffsetOverides = Object.assign({}, {
        left: 0,
        right: 0
      }, this.props.opts && this.props.opts.offset);
      styleOffsetOverides.left = "".concat(styleOffsetOverides.left, "px");
      styleOffsetOverides.right = "".concat(styleOffsetOverides.right, "px");
      return React.createElement("div", {
        className: "mp3-player-playlist-container ".concat(showPlaylist, " ").concat(isMobile),
        style: this.state.isMobile ? styleOffsetOverides : {}
      }, React.createElement("div", {
        className: "mp3-player-playlist-header"
      }, React.createElement("button", {
        className: "mp3-player-playlist-close",
        onClick: function onClick(evt) {
          return _this4.playlistClickHandler(evt);
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
      var newIndex = type === "next" ? this.state.currentIndex + 1 : this.state.currentIndex - 1;

      if (typeof this.props.tracks[newIndex] !== "undefined") {
        this.setState({
          currentIndex: newIndex,
          activeTrack: this.props.tracks[newIndex]
        });
        return;
      }

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
      var _this5 = this;

      return React.createElement("div", {
        className: this.state.isMobile ? "playlist-wrap is-mobile" : "playlist-wrap"
      }, React.createElement(Player, {
        activeTrack: this.state.activeTrack,
        hasPlaylist: true,
        playlistClickHandler: function playlistClickHandler(evt) {
          return _this5.playlistClickHandler(evt);
        },
        skipHandler: function skipHandler(evt, type) {
          return _this5.skipHandler(evt, type);
        },
        togglePlaylist: function togglePlaylist(condition) {
          return _this5.togglePlaylist(condition);
        },
        isMobile: this.state.isMobile,
        opts: this.props.opts,
        onClose: this.props.onClose
      }), this.playlistBody());
    }
  }]);

  return Playlist;
}(React.Component);

export { Playlist as default };