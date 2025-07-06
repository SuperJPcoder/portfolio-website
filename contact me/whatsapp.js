function redirectToContact() {
    window.location.href = "contact.html";
}

const cursor = document.querySelector('.custom-cursor');
let cursorVisible = false; // Cursor starts hidden

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    if (!cursorVisible) {
        cursor.style.opacity = '1';
        cursorVisible = true;
    }

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});