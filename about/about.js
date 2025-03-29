const traitsList = ["polite", "humble", "considerate", "helpful", "modest", "mannered", "cultured"];
let traitIndex = 0;
setInterval(() => {
  document.getElementById('traits').innerText = traitsList[traitIndex];
  traitIndex = (traitIndex + 1) % traitsList.length;
}, 1000);

const video = document.getElementById('intro-video');
video.onended = () => {
  document.querySelector('.video-container').style.display = 'none';
  const container = document.querySelector('.container');
  container.classList.remove('hidden');
  setTimeout(() => {
    container.classList.add('show');
  }, 100); 
};
