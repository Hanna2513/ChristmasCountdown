// Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Reference to audio element and control buttons
const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const muteButton = document.getElementById('muteButton');
const candle = document.getElementById('candle');
const clickCounter = document.getElementById('clickCounter');
const notification = document.getElementById('notification');

// Playlist Array
const playlist = [
    "dth.mp3",  // Replace with your first audio file path
    "song2.mp3",  // Replace with your second audio file path
    "song3.mp3"   // Replace with your third audio file path
];

let currentTrack = 0;

// Load and play the initial track
audioPlayer.src = playlist[currentTrack];
audioPlayer.volume = 0.2;
audioPlayer.play();

// Function to play the next track
function playNextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    audioPlayer.src = playlist[currentTrack];
    audioPlayer.play();
}

// Function to play the previous track
function playPreviousTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    audioPlayer.src = playlist[currentTrack];
    audioPlayer.play();
}

// Toggle play/pause
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerText = "⏸️ Pause";
    } else {
        audioPlayer.pause();
        playPauseButton.innerText = "▶️ Play";
    }
}

// Toggle mute/unmute
function toggleMute() {
    audioPlayer.muted = !audioPlayer.muted;
    muteButton.innerText = audioPlayer.muted ? "🔇 Unmute Playlist" : "🔊 Mute Playlist";
}

// Auto play next track on end
audioPlayer.addEventListener('ended', playNextTrack);

// Event listeners for playlist controls
document.getElementById('nextButton').addEventListener('click', playNextTrack);
document.getElementById('prevButton').addEventListener('click', playPreviousTrack);
playPauseButton.addEventListener('click', togglePlayPause);
muteButton.addEventListener('click', toggleMute);

// Paths for candle images (ensure these images are in the correct directory)
const candleUnlit = 'unlitcandle.png';
const candleLit = 'litcandle.png';

// Initialize click counter
let totalClicks = localStorage.getItem('totalClicks') ? parseInt(localStorage.getItem('totalClicks')) : 0;
clickCounter.innerText = `Candle lit count: ${totalClicks}`;

// Check last click date to enforce daily click restriction
const today = new Date().toISOString().slice(0, 10);
const lastClickDate = localStorage.getItem('lastClickDate');

// Function to light the candle
function lightCandle() {
    if (lastClickDate === today) {
        alert("You can only light the candle once per day. Come back tomorrow!");
        return;
    }

    // Increase the click counter and store it
    totalClicks++;
    localStorage.setItem('totalClicks', totalClicks);
    clickCounter.innerText = `Candle lit count: ${totalClicks}`;

    // Update the last click date
    localStorage.setItem('lastClickDate', today);

    // Change the candle image to the lit candle
    candle.src = candleLit;

    // Show the notification
    notification.innerText = "You lit the candle! 🎉";
    notification.style.display = "block";

    // Fade out notification after 3 seconds
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Attach event listener to the candle image
candle.addEventListener('click', () => {
    candle.style.opacity = 0;
    setTimeout(() => {
        lightCandle();
        candle.style.opacity = 1;
    }, 500);
});

// Display lit candle image if already clicked today
if (lastClickDate === today) {
    candle.src = candleLit;
}
