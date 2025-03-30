function redirectToContact() {
    window.location.href = "contact.html";
}
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});