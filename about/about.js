const traitsList = ["polite", "humble", "considerate", "helpful", "cultured"];
let traitIndex = 0;
const containerElement = document.getElementById("traits-container");
const traitsElement = document.getElementById("traits");
const cursor = document.querySelector('.custom-cursor');
const video = document.getElementById("intro-video");
const skipButton = document.getElementById("skip-button");
const backButton = document.getElementById("back-button");

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});

setInterval(() => {
    containerElement.classList.add("flip");
    setTimeout(() => {
        traitIndex = (traitIndex + 1) % traitsList.length;
        traitsElement.innerText = traitsList[traitIndex];
        containerElement.classList.remove("flip");
    }, 300);
}, 2000);

function playVideo() {
    video.play().catch(() => {
        document.addEventListener('click', () => {
            video.play();
        }, { once: true });
    });
}

// Skip button functionality
skipButton.addEventListener("click", () => {
    video.pause();
    video.currentTime = video.duration;
    video.dispatchEvent(new Event("ended"));
});

// Hide skip and show back after video
video.onended = () => {
    document.querySelector(".video-container").style.display = "none";
    const container = document.querySelector(".container");
    container.classList.remove("hidden");
    setTimeout(() => {
        container.classList.add("show");
        skipButton.classList.add("hidden");
        backButton.classList.remove("hidden");
    }, 100);
};

// Ensure video plays properly on mobile and desktop
playVideo();

// Fallback to show content if video doesn't load after 5 seconds
setTimeout(() => {
    if (video.readyState < 3 || video.ended) {
        video.pause();
        video.dispatchEvent(new Event("ended"));
    }
}, 5000);

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  document.querySelector('.custom-cursor').style.display = 'none';
}
