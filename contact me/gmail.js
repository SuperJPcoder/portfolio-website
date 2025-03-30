function openEmail(email) {
    window.location.href = email;
  }
  
  document.querySelectorAll(".email-box").forEach(function (box) {
    box.addEventListener("mouseover", function () {
      box.style.transform = "translateY(-10px) scale(1.05)";
      box.style.boxShadow = "0 15px 45px rgba(255, 255, 255, 0.7)";
    });
  
    box.addEventListener("mouseout", function () {
      box.style.transform = "translateY(0) scale(1)";
      box.style.boxShadow = "0 5px 20px rgba(255, 255, 255, 0.2)";
    });
  });
  const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});