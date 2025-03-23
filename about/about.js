// List of rotating traits
const traitsList = ["polite", "humble", "considerate", "helpful", "modest", "mannered", "cultured"];
let traitIndex = 0;

// Rotate traits every 1 second
setInterval(() => {
    document.getElementById('traits').innerText = traitsList[traitIndex];
    traitIndex = (traitIndex + 1) % traitsList.length;
}, 1000);

// Show spacebar navigation text after 3 seconds
setTimeout(() => {
    document.getElementById('spacebar-text').classList.remove('hidden');
}, 3000);

// Initial animation to show the name tracing and transition
window.onload = () => {
    setTimeout(() => {
        document.querySelector('.name-animation').style.display = 'none';
        document.querySelector('.container').classList.add('show');
    }, 3200);
};

// Listen for SPACEBAR key to return to navigation screen
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        navigateToHome();
    }
});

function navigateToHome() {
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(-20px)';
    setTimeout(() => {
        window.location.href = '../landing/landing.html';
    }, 600);
}
