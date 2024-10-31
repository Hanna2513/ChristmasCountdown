const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');

/* Set background music volume */
backgroundMusic.volume = 0.2; // Set to 20%

/* Play music by default */
backgroundMusic.play();

/* Mute Button Functionality */
muteButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        muteButton.innerText = '🔊 Mute Music';
    } else {
        backgroundMusic.pause();
        muteButton.innerText = '🔇 Unmute Music';
    }
});

/* Check if the countdown has already ended by looking at localStorage */
if (localStorage.getItem('countdownEnded') === 'true') {
    // Redirect immediately to the video page if countdown has ended before
    window.location.href = "celebration.html";
}

/* Trigger Redirect when Countdown is 0 */
function checkCountdown() {
    const countdownElement = document.querySelector('.countdown-timer');

    if (countdownElement && countdownElement.innerText === '00:00:00:00') {
        localStorage.setItem('countdownEnded', 'true'); // Store that the countdown has ended
        window.location.href = "celebration.html"; // Redirect to the new page
        clearInterval(countdownInterval); // Stop checking once redirected
    }
}

const countdownInterval = setInterval(checkCountdown, 1000); // Check every second
