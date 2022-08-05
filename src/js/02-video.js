import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';

const refs = {
  iframe: document.querySelector('#vimeo-player'),
};

const player = createPlayer(refs.iframe);
setStartPlaybackTime(readPlaybackCurrentTime());
player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

// -----------FUNCTIONS----------------------

function createPlayer(element, opts = {}) {
  return new VimeoPlayer(element, opts);
}

function createPlaybackCurrentTime(newCurrentPlaybackTime) {
  localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, newCurrentPlaybackTime);
}

function readPlaybackCurrentTime() {
  return localStorage.getItem(VIDEOPLAYER_CURRENT_TIME) || 0;
}

function setStartPlaybackTime(newStartPlaybackTime) {
  player.setCurrentTime(newStartPlaybackTime);
}

// -----------EVENT HANDLERS----------------------
function onPlayerTimeUpdate({ seconds }) {
  createPlaybackCurrentTime(seconds);
}
