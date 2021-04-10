const playPauseBtn = document.querySelector('.playpause');
const stopBtn = document.querySelector('.stop');
const rwdBtn = document.querySelector('.rwd');
const fwdBtn = document.querySelector('.fwd');
const timeLabel = document.querySelector('.time');
const player = document.querySelector('video');
const videoControls = document.querySelector('.controls');
const progressBar = document.getElementById('progress-bar');
const captions = document.querySelector('tracks');
const CCBtn = document.querySelector('#captions');

player.addEventListener('load', function() {
    var tracks = player.textTracks[0];
    tracks.mode = 'showing';


})

CCBtn.addEventListener('click', function() {

    console.log('CC toggle clicked')
    if (player.textTracks[0].mode === 'showing') {
        player.textTracks[0].mode = 'hidden';
    } else {
        player.textTracks[0].mode = 'showing'
    }

})




player.removeAttribute('controls');


//create play control functionality
playPauseBtn.onclick = function() {
    if (player.paused) {
        player.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        player.pause();
        playPauseBtn.textContent = 'Play';
    }
};




stopBtn.onclick = function() {
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = 'Play';
};

rwdBtn.onclick = function() {
    player.currentTime -= 3;
};

fwdBtn.onclick = function() {
    player.currentTime += 3;
    if (player.currentTime >= player.duration || player.paused) {
        player.pause();
        player.currentTime = 0;
        playPauseBtn.textContent = 'Play';
    }
};
//mute
mute.addEventListener('click', function(e) {
    player.muted = !player.muted;
    changeButtonState('mute');
});


player.ontimeupdate = function() {
    let minutes = Math.floor(player.currentTime / 60);
    let seconds = Math.floor(player.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
        minuteValue = "0" + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = "0" + seconds;
    } else {
        secondValue = seconds;
    }

    mediaTime = minuteValue + ":" + secondValue;
    timeLabel.textContent = mediaTime;
};

const transcriptControl = document.querySelector('.Toggle');
const transcript = document.querySelector('.transcript');


transcriptControl.addEventListener('click', function() {

    console.log('she works');
    transcript.classList.toggle('selected');
});

// Display the user defined video controls
videoControls.setAttribute('data-state', 'visible');

var supportsProgress = (document.createElement('progress').max !== undefined);
if (!supportsProgress) progress.setAttribute('data-state', 'fake');


//volume
var checkVolume = function(dir) {
    if (dir) {
        var currentVolume = Math.floor(player.volume * 10) / 10;
        if (dir === '+') {
            if (currentVolume < 1) player.volume += 0.1;
        } else if (dir === '-') {
            if (currentVolume > 0) player.volume -= 0.1;
        }
        // If the volume has been turned off, also set it as muted
        // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
        if (currentVolume <= 0) player.muted = true;
        else player.muted = false;
    }
    changeButtonState('mute');
}
var alterVolume = function(dir) {
    checkVolume(dir);
}

volinc.addEventListener('click', function(e) {
    alterVolume('+');
});
voldec.addEventListener('click', function(e) {
    alterVolume('-');
});

player.addEventListener('volumechange', function() {
    checkVolume();
}, false);


var changeButtonState = function(type) {

    // Mute button
    if (type == 'mute') {
        mute.setAttribute('data-state', player.muted ? 'unmute' : 'mute');
    }
}

const videoContainer = document.querySelector('.player')
const fullscreen = document.querySelector('#fs');
var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

if (!fullScreenEnabled) {
    fullscreen.style.display = 'none';
}

fullscreen.addEventListener('click', function(e) {
    handleFullscreen();
});

var handleFullscreen = function() {
    if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        setFullscreenData(false);
    } else {
        if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
        else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
        else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
        else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
        setFullscreenData(true);
    }
}

var isFullScreen = function() {
    return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

var setFullscreenData = function(state) {
    videoContainer.setAttribute('data-fullscreen', !!state);
}

document.addEventListener('fullscreenchange', function(e) {
    setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
});
document.addEventListener('webkitfullscreenchange', function() {
    setFullscreenData(!!document.webkitIsFullScreen);
});
document.addEventListener('mozfullscreenchange', function() {
    setFullscreenData(!!document.mozFullScreen);
});
document.addEventListener('msfullscreenchange', function() {
    setFullscreenData(!!document.msFullscreenElement);
});

//progress bar
player.addEventListener('loadedmetadata', function() {
    progress.setAttribute('max', player.duration);
});

player.addEventListener('timeupdate', function() {
    if (!progress.getAttribute('max')) progress.setAttribute('max', player.duration);
    progress.value = player.currentTime;
    progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
});