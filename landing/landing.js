const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const axisLength = Math.max(canvas.width, canvas.height) * 0.5;
const vectorLength = axisLength * 0.35;
let theta = 0;
let frames = 240;
let gridSize = axisLength / 4;
let state = 'axes';
let axisProgress = 0;
let gridProgress = 0;
let tracedPoints = [];
let rotationCount = 0;
let eraseTrace = false;
let labelsShown = { about: false, projects: false, skills: false, contact: false };
let loadingText = document.getElementById('loading-text');
let quadrantLabels = {
  about: document.getElementById('about'),
  projects: document.getElementById('projects'),
  skills: document.getElementById('skills'),
  contact: document.getElementById('contact')
};
let showClickText = false;
let isNavigating = false;
let quadrantStopped = null;
let continueButton = document.getElementById('continue-btn');

function typeLoadingText(text, speed) {
  let index = 0;
  function type() {
    if (index < text.length) {
      loadingText.innerHTML += text[index];
      index++;
      setTimeout(type, speed);
    }
  }
  type();
}

function drawDot() {
  ctx.fillStyle = '#00ffcc';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
  ctx.fill();
}

function drawAxes(progress) {
  ctx.strokeStyle = '#00ffcc';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - axisLength * progress, centerY);
  ctx.lineTo(centerX + axisLength * progress, centerY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - axisLength * progress);
  ctx.lineTo(centerX, centerY + axisLength * progress);
  ctx.stroke();
}

function drawGrid(progress) {
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 6; i++) {
    const offset = gridSize * i * progress;
    ctx.beginPath();
    ctx.moveTo(0, centerY - offset);
    ctx.lineTo(canvas.width, centerY - offset);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, centerY + offset);
    ctx.lineTo(canvas.width, centerY + offset);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX - offset, 0);
    ctx.lineTo(centerX - offset, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX + offset, 0);
    ctx.lineTo(centerX + offset, canvas.height);
    ctx.stroke();
  }
}

function drawVector(theta) {
  const x = vectorLength * Math.cos(theta);
  const y = vectorLength * Math.sin(theta);
  if (!eraseTrace) {
    tracedPoints.push({ x: centerX + x, y: centerY - y });
  } else {
    if (tracedPoints.length > 0) {
      tracedPoints.shift();
    }
  }
  ctx.strokeStyle = '#00ffcc';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + x, centerY - y);
  ctx.stroke();
  drawTrace();
  const earlyOffset = 1.22;
  if (theta >= Math.PI / 2 - earlyOffset && !labelsShown.about) {
    quadrantLabels.about.classList.remove('hidden');
    labelsShown.about = true;
  }
  if (theta >= Math.PI - earlyOffset && !labelsShown.projects) {
    quadrantLabels.projects.classList.remove('hidden');
    labelsShown.projects = true;
  }
  if (theta >= (3 * Math.PI) / 2 - earlyOffset && !labelsShown.skills) {
    quadrantLabels.skills.classList.remove('hidden');
    labelsShown.skills = true;
  }
  if (theta >= 2 * Math.PI - earlyOffset && !labelsShown.contact) {
    quadrantLabels.contact.classList.remove('hidden');
    labelsShown.contact = true;
  }
}

function drawTrace() {
  if (tracedPoints.length > 1) {
    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < tracedPoints.length; i++) {
      const point = tracedPoints[i];
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.stroke();
  }
}

function updateText(theta) {
  const eulerText = document.getElementById('euler-text');
  const latexString = `e^{i${theta.toFixed(2)}}`;
  katex.render(latexString, eulerText, {
    throwOnError: false
  });
}

function toggleTrace() {
  eraseTrace = rotationCount % 2 !== 0;
  if (!eraseTrace) {
    tracedPoints = [];
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (state === 'axes') {
    drawDot();
    drawAxes(axisProgress);
    axisProgress += 0.02;
    if (axisProgress >= 1) {
      state = 'grid';
    }
  } else if (state === 'grid') {
    drawDot();
    drawAxes(1);
    drawGrid(gridProgress);
    gridProgress += 0.02;
    if (gridProgress >= 1) {
      state = 'vector';
    }
  } else if (state === 'vector') {
    drawAxes(1);
    drawGrid(1);
    drawVector(theta);
    updateText(theta);
    theta += (2 * Math.PI) / frames;
    if (theta >= 2 * Math.PI * (rotationCount + 1)) {
      rotationCount++;
      toggleTrace();
      if (rotationCount === 1 && !showClickText) {
        showClickText = true;
        setTimeout(() => {
          typeLoadingText('PRESS SPACEBAR TO NAVIGATE', 40);
        }, 500);
      }
    }
  }
  if (state !== 'end') {
    requestAnimationFrame(animate);
  }
}

setTimeout(() => {
  animate();
}, 500);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (!isNavigating) {
      let quadrant = getQuadrant(theta);
      stopZoomFadeRedirect(quadrant);
    } else {
      resetNavigation();
    }
  }
});

function getQuadrant(angle) {
  const modAngle = angle % (2 * Math.PI);
  if (modAngle >= 0 && modAngle < Math.PI / 2) return 'about';
  if (modAngle >= Math.PI / 2 && modAngle < Math.PI) return 'projects';
  if (modAngle >= Math.PI && modAngle < (3 * Math.PI) / 2) return 'skills';
  if (modAngle >= (3 * Math.PI) / 2 && modAngle < 2 * Math.PI) return 'contact';
  return null;
}

function stopZoomFadeRedirect(quadrant) {
  if (!quadrant || isNavigating) return;
  isNavigating = true;
  quadrantStopped = quadrant;
  fadeOutAllQuadrants();
  canvas.style.transition = 'transform 1.5s ease-in-out, opacity 1.5s ease-in-out';
  document.getElementById('euler-text').style.transition = 'opacity 0.5s ease-in-out';
  document.getElementById('loading-text').style.transition = 'opacity 0.5s ease-in-out';
  document.getElementById('euler-text').style.opacity = 0;
  document.getElementById('loading-text').style.opacity = 0;
  let offsetX = 0,
    offsetY = 0;
  if (quadrant === 'about') {
    offsetX = -centerX / 2;
    offsetY = centerY / 2;
  } else if (quadrant === 'projects') {
    offsetX = centerX / 2;
    offsetY = centerY / 2;
  } else if (quadrant === 'skills') {
    offsetX = centerX / 2;
    offsetY = -centerY / 2;
  } else if (quadrant === 'contact') {
    offsetX = -centerX / 2;
    offsetY = -centerY / 2;
  }
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.8)`;
  canvas.style.opacity = 0;
  setTimeout(() => {
    redirectToPage(quadrant);
  }, 1500);
}

function fadeOutAllQuadrants() {
  Object.keys(quadrantLabels).forEach((key) => {
    quadrantLabels[key].style.transition = 'opacity 0.8s ease-in-out';
    quadrantLabels[key].style.opacity = 0;
  });
}

function redirectToPage(quadrant) {
  if (quadrant === 'about') {
    window.location.href = '../about/about.html';
  } else if (quadrant === 'projects') {
    window.location.href = '../projects/projects.html';
  } else if (quadrant === 'skills') {
    window.location.href = '../skills/skills.html';
  } else if (quadrant === 'contact') {
    window.location.href = '../contact me/contact.html';
  }
}

function resetNavigation() {
  continueButton.classList.add('hidden');
  canvas.style.transition = 'opacity 1s ease-in-out, transform 1.5s ease-in-out';
  canvas.style.opacity = 1;
  canvas.style.transform = 'translate(0, 0) scale(1)';
  document.getElementById('euler-text').style.opacity = 1;
  document.getElementById('loading-text').style.opacity = 0.8;
  showAllQuadrants();
  setTimeout(() => {
    isNavigating = false;
  }, 1500);
}

function showAllQuadrants() {
  Object.keys(quadrantLabels).forEach((key) => {
    quadrantLabels[key].style.transition = 'opacity 0.8s ease-in-out';
    quadrantLabels[key].style.opacity = 0.9;
  });
}
