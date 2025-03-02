document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    menuBtn.addEventListener("click", () => {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && event.target !== menuBtn) {
            menu.style.display = "none";
        }
    });


    document.getElementById("clear-history").addEventListener("click", () => {
        alert("DESIGN ASSIGNMENT PROJECT\nCALCULATOR DESIGN:\nDesigning a calculator similar to google calculator");
    });
});
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  } 

  document.getElementById("toggle-theme").addEventListener("click", function () {
    let themeStyle = document.getElementById("theme-style");

    if (!themeStyle) {
        console.error("Theme link element not found!");
        return;
    }

    let currentTheme = themeStyle.getAttribute("href");


    if (currentTheme.includes("light-theme.css")) {
        themeStyle.setAttribute("href", "css/dark-theme.css");
        localStorage.setItem("theme", "dark");
    } else {
        themeStyle.setAttribute("href", "css/light-theme.css");
        localStorage.setItem("theme", "light");
    }

    console.log("Theme switched to:", themeStyle.getAttribute("href"));
});


window.onload = function () {
    let themeStyle = document.getElementById("theme-style");
    let savedTheme = localStorage.getItem("theme") || "light"; 

    if (!themeStyle) {
        console.error("Theme link element not found on page load!");
        return;
    }

    themeStyle.setAttribute("href", `css/${savedTheme}-theme.css`);
    console.log("Loaded theme:", themeStyle.getAttribute("href"));
};

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }



  var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
} 