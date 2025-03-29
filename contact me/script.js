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
  
    // Updated Logic: Place dots in the leftmost and rightmost thirds
    var point1 = {
      x: randomBetween(0, width * 0.33), // Leftmost 1/3 of the screen
      y: randomBetween(height * 0.2, height * 0.8),
    };
    var point2 = {
      x: randomBetween(width * 0.66, width), // Rightmost 1/3 of the screen
      y: randomBetween(height * 0.2, height * 0.8),
    };
  
    var circle1 = createCircle(point1.x, point1.y, 5, "white", 500);
    var circle2 = createCircle(point2.x, point2.y, 5, "white", 1000);
  
    var colors = ["#FF5733", "#00FF7F", "#1E90FF", "#FFD700", "#DA70D6", "#FF4500"];
    var platforms = ["LinkedIn", "Instagram", "GitHub", "Discord", "Email", "WhatsApp"];
    var platformLinks = [
      "https://www.linkedin.com/in/priyank-jhaveri7",
      "https://www.instagram.com/priyanksjhaveri",
      "https://github.com/SuperJPcoder",
      "https://discord.gg/1333468244094488636",
      "mailto:priyanksjhaveri@gmail.com",
      "whatsapp.html",
    ];
  
    for (var i = 0; i < 6; i++) {
      (function (index) {
        var cp1 = {
          x: randomBetween(point1.x, (point1.x + point2.x) / 2),
          y: randomBetween(0, height),
        };
        var cp2 = {
          x: randomBetween((point1.x + point2.x) / 2, point2.x),
          y: randomBetween(0, height),
        };
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
  
        // Invisible hover path to increase hover detection
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