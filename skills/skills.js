window.onload = function () {
  const skills = [
    "Python", "JavaScript", "C++", "HTML", "CSS",
    "React", "Node.js", "SQL", "Git", "Docker",
    "Algorithms", "Maths", "Physics", "AI/ML", "Tailwind"
  ];

  const canvas = document.getElementById("spiralCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const a = 10; 
  const b = 0.35; 
  const circleRadius = 30; 
  const animationDuration = 1000; 
  const animationDelay = 200; 
  const drawnCircles = [];

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawCircle(x, y, scale, fillColor) {
    ctx.beginPath();
    ctx.arc(x, y, circleRadius * scale, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  function drawText(text, x, y, scale) {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${14 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  function animateCircle(skill, index) {
    const theta = index * 0.4; 
    const r = a + 3 * b * theta * 100; 
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);

    let startTimestamp = null;

    function animate(timestamp) {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
      const scale = progress;

      clearCanvas();
      drawnCircles.forEach((item) => {
        drawCircle(item.x, item.y, 1, "#00FFCC");
        drawText(item.skill, item.x, item.y, 1);
      });

      drawCircle(x, y, scale, "#00FFCC");
      drawText(skill, x, y, scale);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        drawnCircles.push({ x, y, skill });
      }
    }

    requestAnimationFrame(animate);
  }

  function animateSpiral() {
    let i = 0;
    function next() {
      if (i < skills.length) {
        animateCircle(skills[i], i);
        i++;
        setTimeout(next, animationDelay);
      }
    }
    next();
  }

  animateSpiral();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearCanvas();
    drawnCircles.length = 0;
    animateSpiral();
  });
};
