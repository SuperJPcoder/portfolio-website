const traitsList = ["polite", "humble", "considerate", "helpful", "modest", "mannered", "cultured"];
let traitIndex = 0;
const containerElement = document.getElementById("traits-container");
const traitsElement = document.getElementById("traits");
const cursor = document.querySelector('.custom-cursor');
const video = document.getElementById("intro-video");

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

// Ensure video plays properly on mobile and desktop
playVideo();

video.onended = () => {
    document.querySelector(".video-container").style.display = "none";
    const container = document.querySelector(".container");
    container.classList.remove("hidden");
    setTimeout(() => {
        container.classList.add("show");
    }, 100);
};

// Fallback to show content if video doesn't load after 5 seconds
setTimeout(() => {
    if (video.readyState < 3 || video.ended) {
        document.querySelector(".video-container").style.display = "none";
        const container = document.querySelector(".container");
        container.classList.remove("hidden");
        setTimeout(() => {
            container.classList.add("show");
        }, 100);
    }
}, 5000);
