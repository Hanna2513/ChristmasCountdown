// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvHfn7RT8g_BGm-RCQipsAnJ8-1vlH-Mc",
    authDomain: "christmas-countdown-fa1a0.firebaseapp.com",
    databaseURL: "https://christmas-countdown-fa1a0-default-rtdb.firebaseio.com",
    projectId: "christmas-countdown-fa1a0",
    storageBucket: "christmas-countdown-fa1a0.firebasestorage.app",
    messagingSenderId: "241407518474",
    appId: "1:241407518474:web:bcb883ba7f82ee3cb3bcf3",
    measurementId: "G-BRSJM585YM"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Function to set up candle clicks
export function setupCandleClicks() {
    const candleClicksRef = ref(database, 'candleClicks');
    onValue(candleClicksRef, (snapshot) => {
        const totalClicks = snapshot.val() || 0;
        document.getElementById('clickCounter').innerText = `Candle lit count: ${totalClicks}`;
    });

    document.getElementById('candle').addEventListener('click', () => {
        runTransaction(candleClicksRef, (currentClicks) => {
            return (currentClicks || 0) + 1;
        });
    });
}

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
