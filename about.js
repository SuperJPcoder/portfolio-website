// Show spacebar navigation text after 3 seconds
setTimeout(() => {
    document.getElementById('spacebar-text').classList.remove('hidden');
}, 3000);

// Initial animation to show the name tracing and transition
window.onload = () => {
    setTimeout(() => {
        document.querySelector('.name-animation').style.display = 'none';
        document.querySelector('.container').classList.add('show');
    }, 3200); // Slightly increased delay to sync transition
};

// Listen for SPACEBAR key to return to navigation screen
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        navigateToHome();
    }
});

function navigateToHome() {
    // Smooth transition effect before leaving the page
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(-20px)';

    setTimeout(() => {
        window.location.href = 'landing.html'; // Return to rotating vector page
    }, 600);
}
