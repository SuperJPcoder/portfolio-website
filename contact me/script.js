(function () {
  var svg = document.getElementById("canvas");
  var width = window.innerWidth,
    height = window.innerHeight;
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  function createCircle(cx, cy, r, fill, delay) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", 0);
    circle.setAttribute("fill", fill);
    circle.setAttribute("opacity", "0.8");
    circle.style.filter = "blur(4px)";
    svg.appendChild(circle);
    setTimeout(function () {
      circle.setAttribute("r", r);
      circle.style.transition = "r 0.8s ease-in-out, opacity 1.5s";
      circle.style.opacity = "0.4";
    }, delay);
    return circle;
  }

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getDistinctPoints(existingPoints, minDist, maxWidth, maxHeight) {
    var point;
    var tooClose;
    do {
      point = {
        x: randomBetween(0, maxWidth),
        y: randomBetween(0, maxHeight)
      };
      tooClose = existingPoints.some(function (p) {
        var dist = Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2));
        return dist < minDist;
      });
    } while (tooClose);
    return point;
  }

  var point1 = {
    x: randomBetween(0, width * 0.33),
    y: randomBetween(height * 0.2, height * 0.8),
  };
  var point2 = {
    x: randomBetween(width * 0.66, width),
    y: randomBetween(height * 0.2, height * 0.8),
  };

  var circle1 = createCircle(point1.x, point1.y, 5, "white", 500);
  var circle2 = createCircle(point2.x, point2.y, 5, "white", 1000);

  var colors = [ 
    "#0077B5", // LinkedIn  
    "#FF69B4", // Instagram 
    "#32CD32", // GitHub 
    "#8A2BE2", // Discord 
    "#FFA500", // Email 
    "#90EE90", // WhatsApp  
    "#1E90FF"  // X (Twitter)  
  ];

  var platforms = [
    "LinkedIn",
    "Instagram",
    "GitHub",
    "Discord",
    "Email",
    "WhatsApp",
    "X"
  ];

  var platformLinks = [
    "https://www.linkedin.com/in/priyank-jhaveri7",
    "https://www.instagram.com/priyanksjhaveri",
    "https://github.com/SuperJPcoder",
    "https://discord.gg/1333468244094488636",
    "gmail.html",
    "whatsapp.html",
    "https://x.com/DekiSugiGenius"
  ];

  var usedPoints = [point1, point2];

  for (var i = 0; i < 7; i++) {
    (function (index) {
      var cp1 = getDistinctPoints(usedPoints, 80, width / 2, height);
      usedPoints.push(cp1);
      var cp2 = getDistinctPoints(usedPoints, 80, width, height);
      usedPoints.push(cp2);

      var d =
        "M" +
        point1.x +
        " " +
        point1.y +
        " C" +
        cp1.x +
        " " +
        cp1.y +
        ", " +
        cp2.x +
        " " +
        cp2.y +
        ", " +
        point2.x +
        " " +
        point2.y;

      var link = document.createElementNS("http://www.w3.org/2000/svg", "a");
      link.setAttribute("href", platformLinks[index]);
      link.setAttribute("target", "_blank");

      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", colors[i]);
      path.setAttribute("stroke-width", 2);
      path.style.strokeDasharray = path.getTotalLength();
      path.style.strokeDashoffset = path.getTotalLength();
      path.style.filter = "drop-shadow(0 0 8px " + colors[i] + ")";
      link.appendChild(path);

      var hoverPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hoverPath.setAttribute("d", d);
      hoverPath.setAttribute("fill", "none");
      hoverPath.setAttribute("stroke", "transparent");
      hoverPath.setAttribute("stroke-width", 20);
      link.appendChild(hoverPath);

      svg.appendChild(link);

      setTimeout(function () {
        path.style.transition = "stroke-dashoffset 3s ease-in-out";
        path.style.strokeDashoffset = "0";
      }, 1200 + i * 300);

      hoverPath.addEventListener("mouseover", function (evt) {
        var hoverBox = document.getElementById("hoverBox");
        hoverBox.innerHTML =
          '<a href="' + platformLinks[index] + '" target="_blank">' + platforms[index] + "</a>";
        hoverBox.style.display = "block";
        hoverBox.style.left = evt.clientX + 10 + "px";
        hoverBox.style.top = evt.clientY + 10 + "px";
      });
      hoverPath.addEventListener("mouseout", function () {
        var hoverBox = document.getElementById("hoverBox");
        hoverBox.style.display = "none";
      });
    })(i);
  }
})();
