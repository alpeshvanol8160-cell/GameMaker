// ========================================
// 🎮 GAMEMAKER V2 - MAIN SCRIPT
// ========================================

let selectedObject = null;
let objectCount = 0;

let isPlaying = false;

let controlMode = "Player";

let touchDirection = null;

let keys = {};

const gameArea = document.getElementById("gameArea");


// ========================================
// 🎮 CREATE OBJECT
// ========================================

function createObject(name, emoji, color){

  objectCount++;

  const obj = document.createElement("div");

  obj.className = "object";

  obj.innerText = emoji;

  obj.dataset.name =
    name + objectCount;

  obj.dataset.emoji =
    emoji;

  obj.dataset.color =
    color;

  obj.style.left = "100px";

  obj.style.top = "100px";

  obj.style.width = "60px";

  obj.style.height = "60px";

  obj.style.backgroundColor =
    color;

  gameArea.appendChild(obj);

  selectObject(obj);

  makeDraggable(obj);

}


// ========================================
// 🧙 PLAYER
// ========================================

function addPlayer(){

  createObject(
    "Player",
    "🧙",
    "#2563eb"
  );

}


// ========================================
// 👹 ENEMY
// ========================================

function addEnemy(){

  createObject(
    "Enemy",
    "👹",
    "#dc2626"
  );

}


// ========================================
// ⬛ OBJECT
// ========================================

function addObject(){

  createObject(
    "Object",
    "⬛",
    "#64748b"
  );

}


// ========================================
// 🎯 SELECT OBJECT
// ========================================

function selectObject(obj){

  if(selectedObject){

    selectedObject.classList.remove(
      "selected"
    );

  }

  selectedObject = obj;

  obj.classList.add(
    "selected"
  );

  document.getElementById(
    "selectedName"
  ).innerText =
    obj.dataset.name;

  updateProperties();

}


// ========================================
// ⚙️ UPDATE PROPERTIES
// ========================================

function updateProperties(){

  if(!selectedObject) return;


  document.getElementById(
    "objName"
  ).value =
    selectedObject.dataset.name;


  document.getElementById(
    "objX"
  ).value =
    parseInt(
      selectedObject.style.left
    ) || 0;


  document.getElementById(
    "objY"
  ).value =
    parseInt(
      selectedObject.style.top
    ) || 0;


  document.getElementById(
    "objW"
  ).value =
    selectedObject.offsetWidth;


  document.getElementById(
    "objH"
  ).value =
    selectedObject.offsetHeight;

}


// ========================================
// ✅ APPLY PROPERTIES
// ========================================

function applyProperties(){

  if(!selectedObject){

    alert(
      "Select an object first!"
    );

    return;

  }


  const name =
    document.getElementById(
      "objName"
    ).value.trim();


  if(name){

    selectedObject.dataset.name =
      name;

  }


  selectedObject.style.left =
    document.getElementById(
      "objX"
    ).value + "px";


  selectedObject.style.top =
    document.getElementById(
      "objY"
    ).value + "px";


  selectedObject.style.width =
    document.getElementById(
      "objW"
    ).value + "px";


  selectedObject.style.height =
    document.getElementById(
      "objH"
    ).value + "px";


  document.getElementById(
    "selectedName"
  ).innerText =
    selectedObject.dataset.name;

}


// ========================================
// 🖱️ DRAG OBJECT
// ========================================

function makeDraggable(obj){

  let dragging = false;

  let offsetX = 0;

  let offsetY = 0;


  obj.addEventListener(
    "pointerdown",
    function(e){

      if(isPlaying) return;


      dragging = true;


      const rect =
        obj.getBoundingClientRect();


      offsetX =
        e.clientX -
        rect.left;


      offsetY =
        e.clientY -
        rect.top;


      selectObject(obj);


      obj.setPointerCapture(
        e.pointerId
      );

    }
  );


  obj.addEventListener(
    "pointermove",
    function(e){

      if(
        !dragging ||
        isPlaying
      ){

        return;

      }


      const area =
        gameArea.getBoundingClientRect();


      let x =
        e.clientX -
        area.left -
        offsetX;


      let y =
        e.clientY -
        area.top -
        offsetY;


      x = Math.max(
        0,
        Math.min(
          x,
          gameArea.clientWidth -
          obj.offsetWidth
        )
      );


      y = Math.max(
        0,
        Math.min(
          y,
          gameArea.clientHeight -
          obj.offsetHeight
        )
      );


      obj.style.left =
        x + "px";


      obj.style.top =
        y + "px";


      updateProperties();

    }
  );


  obj.addEventListener(
    "pointerup",
    function(){

      dragging = false;

    }
  );


  obj.addEventListener(
    "pointercancel",
    function(){

      dragging = false;

    }
  );

}


// ========================================
// 🗑️ DELETE OBJECT
// ========================================

function deleteObject(){

  if(!selectedObject){

    alert(
      "Select an object first!"
    );

    return;

  }


  selectedObject.remove();

  selectedObject = null;


  document.getElementById(
    "selectedName"
  ).innerText =
    "Nothing Selected";

}


// ========================================
// 🆕 NEW PROJECT
// ========================================

function newProject(){

  if(
    !confirm(
      "Create a new project?"
    )
  ){

    return;

  }


  gameArea.innerHTML = "";

  selectedObject = null;

  objectCount = 0;


  document.getElementById(
    "selectedName"
  ).innerText =
    "Nothing Selected";

}


// ========================================
// ▶️ PLAY MODE
// ========================================

function playGame(){

  isPlaying =
    !isPlaying;


  const status =
    document.getElementById(
      "status"
    );


  if(isPlaying){

    status.innerText =
      "▶ Play Mode";


  }else{

    status.innerText =
      "Editor Mode";

  }

}


// ========================================
// 🖼️ APPLY IMAGE
// ========================================

function applyImage(){

  if(!selectedObject){

    alert(
      "Select an object first!"
    );

    return;

  }


  const input =
    document.getElementById(
      "objImage"
    );


  const file =
    input.files[0];


  if(!file){

    alert(
      "Please select an image!"
    );

    return;

  }


  const reader =
    new FileReader();


  reader.onload =
    function(e){

      selectedObject.style.backgroundImage =
        `url("${e.target.result}")`;


      selectedObject.style.backgroundSize =
        "cover";


      selectedObject.style.backgroundPosition =
        "center";


      selectedObject.style.backgroundRepeat =
        "no-repeat";


      selectedObject.innerText =
        "";

    };


  reader.readAsDataURL(file);

}


// ========================================
// ❌ REMOVE IMAGE
// ========================================

function removeImage(){

  if(!selectedObject){

    alert(
      "Select an object first!"
    );

    return;

  }


  selectedObject.style.backgroundImage =
    "none";


  selectedObject.innerText =
    selectedObject.dataset.emoji || "⬛";

}


// ========================================
// 💾 SAVE PROJECT
// ========================================

function saveProject(){

  const objects = [];


  [...gameArea.children].forEach(
    function(obj){

      objects.push({

        name:
          obj.dataset.name,

        emoji:
          obj.dataset.emoji ||
          obj.innerText,

        color:
          obj.dataset.color ||
          obj.style.backgroundColor,

        x:
          parseInt(
            obj.style.left
          ) || 0,

        y:
          parseInt(
            obj.style.top
          ) || 0,

        width:
          obj.offsetWidth,

        height:
          obj.offsetHeight,

        image:
          obj.style.backgroundImage ||
          ""

      });

    }
  );


  const project = {

    version: 1,

    objects: objects

  };


  try{

    localStorage.setItem(
      "GameMakerV2Project",
      JSON.stringify(
        project
      )
    );


    alert(
      "💾 Project Saved!"
    );


  }catch(error){

    alert(
      "⚠️ Storage full. Try smaller images."
    );

  }

}


// ========================================
// 📂 LOAD PROJECT
// ========================================

function loadProject(){

  const saved =
    localStorage.getItem(
      "GameMakerV2Project"
    );


  if(!saved){

    return;

  }


  try{

    const project =
      JSON.parse(saved);


    gameArea.innerHTML =
      "";


    selectedObject =
      null;


    objectCount =
      0;


    project.objects.forEach(
      function(data){

        objectCount++;


        const obj =
          document.createElement(
            "div"
          );


        obj.className =
          "object";


        obj.dataset.name =
          data.name;


        obj.dataset.emoji =
          data.emoji ||
          "⬛";


        obj.dataset.color =
          data.color ||
          "#64748b";


        obj.innerText =
          data.emoji ||
          "⬛";


        obj.style.left =
          (data.x || 0) +
          "px";


        obj.style.top =
          (data.y || 0) +
          "px";


        obj.style.width =
          (data.width || 60) +
          "px";


        obj.style.height =
          (data.height || 60) +
          "px";


        obj.style.backgroundColor =
          data.color ||
          "#64748b";


        if(data.image){

          obj.style.backgroundImage =
            data.image;


          obj.style.backgroundSize =
            "cover";


          obj.style.backgroundPosition =
            "center";


          obj.style.backgroundRepeat =
            "no-repeat";


          obj.innerText =
            "";

        }


        gameArea.appendChild(
          obj
        );


        makeDraggable(
          obj
        );

      }
    );


    document.getElementById(
      "selectedName"
    ).innerText =
      "Nothing Selected";


  }catch(error){

    console.error(
      "Load error:",
      error
    );

    alert(
      "⚠️ Project could not be loaded."
    );

  }

}


// ========================================
// ⌨️ KEYBOARD
// ========================================

document.addEventListener(
  "keydown",
  function(e){

    keys[
      e.key.toLowerCase()
    ] = true;

  }
);


document.addEventListener(
  "keyup",
  function(e){

    keys[
      e.key.toLowerCase()
    ] = false;

  }
);


// ========================================
// 📱 TOUCH CONTROL
// ========================================

function touchMove(direction){

  touchDirection =
    direction;

}


function stopTouch(){

  touchDirection =
    null;

}


// ========================================
// 🔄 SWITCH PLAYER / ENEMY
// ========================================

function switchControl(){

  if(controlMode === "Player"){

    controlMode =
      "Enemy";

  }else{

    controlMode =
      "Player";

  }


  document.getElementById(
    "controlButton"
  ).innerText =
    "🔄 Control: " +
    controlMode;

}


// ========================================
// 🎮 GAME LOOP
// ========================================

function gameLoop(){

  if(isPlaying){

    const controlledObject =
      [...gameArea.children].find(
        function(obj){

          return (
            obj.dataset.name &&
            obj.dataset.name.startsWith(
              controlMode
            )
          );

        }
      );


    if(controlledObject){

      let x =
        parseInt(
          controlledObject.style.left
        ) || 0;


      let y =
        parseInt(
          controlledObject.style.top
        ) || 0;


      const speed =
        4;


      // LEFT
      if(
        keys["a"] ||
        keys["arrowleft"] ||
        touchDirection === "left"
      ){

        x -= speed;

      }


      // RIGHT
      if(
        keys["d"] ||
        keys["arrowright"] ||
        touchDirection === "right"
      ){

        x += speed;

      }


      // UP
      if(
        keys["w"] ||
        keys["arrowup"] ||
        touchDirection === "up"
      ){

        y -= speed;

      }


      // DOWN
      if(
        keys["s"] ||
        keys["arrowdown"] ||
        touchDirection === "down"
      ){

        y += speed;

      }


      // KEEP INSIDE GAME AREA

      x =
        Math.max(
          0,
          Math.min(
            x,
            gameArea.clientWidth -
            controlledObject.offsetWidth
          )
        );


      y =
        Math.max(
          0,
          Math.min(
            y,
            gameArea.clientHeight -
            controlledObject.offsetHeight
          )
        );


      controlledObject.style.left =
        x + "px";


      controlledObject.style.top =
        y + "px";

    }

  }


  requestAnimationFrame(
    gameLoop
  );

}


// ========================================
// 🚀 START ENGINE
// ========================================

loadProject();

gameLoop();

// ========================================
// 👹 ENEMY AI
// ========================================

function enemyAI(enemy){

  if(!isPlaying) return;

  const player =
    [...gameArea.children].find(function(obj){

      return (
        obj.dataset.name &&
        obj.dataset.name.startsWith("Player")
      );

    });

  if(!player) return;


  let enemyX =
    parseFloat(enemy.style.left) || 0;

  let enemyY =
    parseFloat(enemy.style.top) || 0;


  let playerX =
    parseFloat(player.style.left) || 0;

  let playerY =
    parseFloat(player.style.top) || 0;


  const speed = 1.2;


  // ➡️ Move Right
  if(enemyX < playerX - 5){
    enemyX += speed;
  }


  // ⬅️ Move Left
  if(enemyX > playerX + 5){
    enemyX -= speed;
  }


  // ⬇️ Move Down
  if(enemyY < playerY - 5){
    enemyY += speed;
  }


  // ⬆️ Move Up
  if(enemyY > playerY + 5){
    enemyY -= speed;
  }


  enemy.style.left =
    enemyX + "px";

  enemy.style.top =
    enemyY + "px";
}


// ========================================
// 🔄 ENEMY AI LOOP
// ========================================

setInterval(function(){

  document
    .querySelectorAll(".object")
    .forEach(function(enemy){

      if(
        enemy.dataset.name &&
        enemy.dataset.name.startsWith("Enemy")
      ){

        enemyAI(enemy);

      }

    });

}, 30);
