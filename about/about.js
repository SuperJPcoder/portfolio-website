const traitsList = ["polite", "humble", "considerate", "helpful", "modest", "mannered", "cultured"];
let traitIndex = 0;
setInterval(() => {
  document.getElementById('traits').innerText = traitsList[traitIndex];
  traitIndex = (traitIndex + 1) % traitsList.length;
}, 1000);

window.onload = () => {
  setTimeout(() => {
    document.querySelector('.name-animation').style.display = 'none';
    document.querySelector('.container').classList.add('show');
  }, 3200);
};
