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


function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
} 

document.addEventListener("DOMContentLoaded", function () {
  const output = document.querySelector(".calculator__output");
  const buttons = document.querySelectorAll(".calculator__key, .calculator__top, .calculator__menu");
  let currentInput = "";
  let angleMode = "rad"; 
  let isError = false; 
  let parenthesisStack = []; 

  const operators = ["+", "-", "×", "÷", "%", "^"];
  const MAX_INPUT_LENGTH = 20;

  
  function factorial(n) {
      return n === 0 ? 1 : n * factorial(n - 1);
  }


  function toRadians(degrees) {
      return degrees * (Math.PI / 180);
  }


  function evaluateExpression(expression) {
      try {
   
          expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
          expression = expression.replace(/π/g, Math.PI);
          expression = expression.replace(/e/g, Math.E);

       
          expression = expression.replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");

          expression = expression.replace(/(\d+)!/g, "factorial($1)");

         
          expression = expression.replace(/sin\(([^)]+)\)/g, (match, angle) => {
              const radians = angleMode === "deg" ? toRadians(parseFloat(angle)) : parseFloat(angle);
              return `Math.sin(${radians})`;
          });
          expression = expression.replace(/cos\(([^)]+)\)/g, (match, angle) => {
              const radians = angleMode === "deg" ? toRadians(parseFloat(angle)) : parseFloat(angle);
              return `Math.cos(${radians})`;
          });
          expression = expression.replace(/tan\(([^)]+)\)/g, (match, angle) => {
              const radians = angleMode === "deg" ? toRadians(parseFloat(angle)) : parseFloat(angle);
              return `Math.tan(${radians})`;
          });

        
          expression = expression.replace(/ln\(([^)]+)\)/g, "Math.log($1)");
          expression = expression.replace(/log\(([^)]+)\)/g, "Math.log10($1)");

          let result = eval(expression);
          return Number.isFinite(result) ? result : "Error";
      } catch {
          return "Error";
      }
  }


  function adjustFontSize() {
      const maxWidth = output.clientWidth; 
      const maxFontSize = 48; 
      const minFontSize = 24; 
      const baseLength = 10; 

      const inputLength = output.textContent.length;
      const fontSize = Math.max(minFontSize, maxFontSize - (inputLength - baseLength) * 2);

      output.style.fontSize = `${fontSize}px`;
  }

  buttons.forEach(button => {
      button.addEventListener("click", () => {
          const action = button.dataset.action;
          const value = button.textContent.trim();

        
          if (button.classList.contains("ignore-input") || action === "toggle-angle-mode") {
              return;
          }

          if (isError && !["clear", "delete", "calculate"].includes(action)) {
              currentInput = "";
              isError = false;
          }

         
          if (action === "clear") {
              currentInput = "";
              output.textContent = "0";
              isError = false;
              parenthesisStack = [];
              adjustFontSize();
              return;
          }

      
          if (action === "delete") {
              const lastChar = currentInput.slice(-1); 
              if (lastChar === "(") {
                  parenthesisStack.pop(); 
              } else if (lastChar === ")") {
                  parenthesisStack.push("("); 
              }
              currentInput = currentInput.slice(0, -1); 
              output.textContent = currentInput || "0";
              isError = false;
              adjustFontSize(); 
          }

       
          if (action === "calculate") {
          
              if (parenthesisStack.length > 0) {
                  output.textContent = "Error";
                  isError = true;
                  adjustFontSize();
                  return;
              }
              let result = evaluateExpression(currentInput);
              output.textContent = result;
              currentInput = result.toString();
              isError = result === "Error"; 
              adjustFontSize();
              return;
          }

       
          if (value === "-") {
           
              if (currentInput === "" || operators.includes(currentInput.slice(-1))) {
                  currentInput += "-";
                  output.textContent = currentInput;
              }
            
              else if (!operators.includes(currentInput.slice(-1))) {
                  currentInput += "-";
                  output.textContent = currentInput;
              }
              adjustFontSize();
              return;
          }

          if (operators.includes(value)) {
              if (currentInput === "" || operators.includes(currentInput.slice(-1))) return;
          }

      
          if (action === "sin" || action === "cos" || action === "tan" || action === "ln" || action === "log") {
              if (currentInput.length + action.length + 1 <= MAX_INPUT_LENGTH) {
                  currentInput += `${action}(`; 
                  parenthesisStack.push("("); 
                  output.textContent = currentInput;
              }
              adjustFontSize();
              return;
          }

        
          if (action === "sqrt") {
              if (currentInput.length + "Math.sqrt(".length <= MAX_INPUT_LENGTH) {
                  currentInput += "√";
                  parenthesisStack.push("(");
                  output.textContent = currentInput;
              }
              adjustFontSize();
              return;
          }

          if (action === "factorial") {
              if (currentInput.length + 1 <= MAX_INPUT_LENGTH) {
                  currentInput += "!";
                  output.textContent = currentInput;
              }
              adjustFontSize();
              return;
          }

 
          if (value === "(") {
              if (currentInput.length + 1 <= MAX_INPUT_LENGTH) {
                  currentInput += value;
                  parenthesisStack.push("(");
                  output.textContent = currentInput;
              }
              adjustFontSize();
              return;
          }

   
          if (value === ")") {
              if (parenthesisStack.length > 0 && currentInput.length + 1 <= MAX_INPUT_LENGTH) {
                  currentInput += value;
                  parenthesisStack.pop(); 
                  output.textContent = currentInput;
              } else {
          
                  console.log("No matching open parenthesis!");
              }
              adjustFontSize();
              return;
          }

     
          if (value && currentInput.length + 1 <= MAX_INPUT_LENGTH) {
              currentInput += value;
              output.textContent = currentInput;
              adjustFontSize();
          }
      });
  });


  const radDegButton = document.querySelector(".calculator__menu[data-action='toggle-angle-mode']");
  radDegButton.addEventListener("click", () => {
      angleMode = angleMode === "rad" ? "deg" : "rad"; 
      radDegButton.textContent = angleMode.toUpperCase(); 
  });
});