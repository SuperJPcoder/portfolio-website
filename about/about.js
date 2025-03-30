const traitsList = ["polite", "humble", "considerate", "helpful", "modest", "mannered", "cultured"];
let traitIndex = 0;
const containerElement = document.getElementById("traits-container");
const traitsElement = document.getElementById("traits");
const cursor = document.querySelector('.custom-cursor');

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

const video = document.getElementById("intro-video");
video.onended = () => {
  document.querySelector(".video-container").style.display = "none";
  const container = document.querySelector(".container");
  container.classList.remove("hidden");
  setTimeout(() => {
    container.classList.add("show");
  }, 100);
};
