// ========================================
// 🎮 GAMEMAKER V2 - COMPLETE SCRIPT V4
// ========================================

let selectedObject = null;
let objectCount = 0;

let isPlaying = false;
let isPaused = false;

let controlMode = "Player";

let touchDirection = null;
let keys = {};

const gameArea = document.getElementById("gameArea");

// ========================================
// ❤️ PLAYER
// ========================================

let playerHP = 100;
let stamina = 100;
let isBlocking = false;

// ========================================
// 🪙 SCORE
// ========================================

let coins = 0;
let score = 0;

// ========================================
// 🌟 LEVEL
// ========================================

let level = 1;


// ========================================
// ⏸️ PAUSE CHECK
// ========================================

function gamePaused(){

  return isPaused === true;

}


// ========================================
// ⏸️ BREAK / RESUME
// ========================================

function togglePause(){

  isPaused = !isPaused;

  const btn =
    document.getElementById("pauseBtn");

  const status =
    document.getElementById("status");


  if(isPaused){

    if(btn){
      btn.innerText =
        "▶️ Resume";
    }

    if(status){
      status.innerText =
        "⏸️ GAME PAUSED";
    }

  }else{

    if(btn){
      btn.innerText =
        "⏸️ Break";
    }

    if(status){

      if(isPlaying){

        status.innerText =
          "▶ Play Mode";

      }else{

        status.innerText =
          "Editor Mode";

      }

    }

  }

}


// ========================================
// 🎮 CREATE OBJECT
// ========================================

function createObject(
  name,
  emoji,
  color
){

  objectCount++;

  const obj =
    document.createElement("div");

  obj.className =
    "object";

  obj.innerText =
    emoji;

  obj.dataset.name =
    name + objectCount;

  obj.dataset.emoji =
    emoji;

  obj.dataset.color =
    color;

  obj.style.left =
    "100px";

  obj.style.top =
    "100px";

  obj.style.width =
    "60px";

  obj.style.height =
    "60px";

  obj.style.backgroundColor =
    color;


  // Enemy data

  if(name === "Enemy"){

    obj.dataset.hp =
      "100";

    obj.dataset.maxHp =
      "100";

    obj.dataset.enemyType =
      "Normal";

    obj.dataset.attacking =
      "false";

    createEnemyHealthBar(obj);

  }


  gameArea.appendChild(obj);

  selectObject(obj);

  makeDraggable(obj);

  return obj;

}


// ========================================
// ❤️ ENEMY HEALTH BAR
// ========================================

function createEnemyHealthBar(enemy){

  const oldBar =
    enemy.querySelector(
      ".enemyHealthBar"
    );

  if(oldBar){

    oldBar.remove();

  }


  const hpBar =
    document.createElement("div");

  hpBar.className =
    "enemyHealthBar";


  const hpFill =
    document.createElement("div");

  hpFill.className =
    "enemyHealthFill";

  hpFill.style.width =
    "100%";


  hpBar.appendChild(
    hpFill
  );

  enemy.appendChild(
    hpBar
  );

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
// 👹 NORMAL ENEMY
// ========================================

function addEnemy(){

  const enemy =
    createObject(
      "Enemy",
      "👹",
      "#dc2626"
    );


  if(enemy){

    enemy.dataset.hp =
      "100";

    enemy.dataset.maxHp =
      "100";

    enemy.dataset.enemyType =
      "Normal";

    positionEnemy(enemy);

    updateEnemyHealthBar(enemy);

  }

}


// ========================================
// 👺 STRONG ENEMY
// ========================================

function addStrongEnemy(){

  objectCount++;

  const enemy =
    document.createElement("div");

  enemy.className =
    "object";

  enemy.innerText =
    "👺";


  enemy.dataset.name =
    "Enemy" + objectCount;

  enemy.dataset.emoji =
    "👺";

  enemy.dataset.color =
    "#ea580c";

  enemy.dataset.hp =
    "200";

  enemy.dataset.maxHp =
    "200";

  enemy.dataset.enemyType =
    "Strong";

  enemy.dataset.attacking =
    "false";


  enemy.style.left =
    "250px";

  enemy.style.top =
    "100px";

  enemy.style.width =
    "60px";

  enemy.style.height =
    "60px";

  enemy.style.backgroundColor =
    "#ea580c";


  gameArea.appendChild(enemy);

  createEnemyHealthBar(enemy);

  makeDraggable(enemy);

  selectObject(enemy);

  updateEnemyHealthBar(enemy);

}


// ========================================
// 💀 BOSS
// ========================================

function addBossEnemy(){

  objectCount++;

  const boss =
    document.createElement("div");

  boss.className =
    "object";

  boss.innerText =
    "💀";


  boss.dataset.name =
    "Enemy" + objectCount;

  boss.dataset.emoji =
    "💀";

  boss.dataset.color =
    "#7e22ce";

  boss.dataset.hp =
    "500";

  boss.dataset.maxHp =
    "500";

  boss.dataset.enemyType =
    "Boss";

  boss.dataset.attacking =
    "false";


  boss.style.left =
    "300px";

  boss.style.top =
    "120px";

  boss.style.width =
    "90px";

  boss.style.height =
    "90px";

  boss.style.backgroundColor =
    "#7e22ce";


  gameArea.appendChild(boss);

  createEnemyHealthBar(boss);

  makeDraggable(boss);

  selectObject(boss);

  updateEnemyHealthBar(boss);

}


// ========================================
// 📍 ENEMY POSITION
// ========================================

function positionEnemy(enemy){

  let x =
    100 +
    Math.random() *
    Math.max(
      50,
      gameArea.clientWidth - 200
    );


  let y =
    50 +
    Math.random() *
    Math.max(
      50,
      gameArea.clientHeight - 150
    );


  enemy.style.left =
    Math.max(
      0,
      Math.min(
        x,
        gameArea.clientWidth -
        enemy.offsetWidth
      )
    ) + "px";


  enemy.style.top =
    Math.max(
      0,
      Math.min(
        y,
        gameArea.clientHeight -
        enemy.offsetHeight
      )
    ) + "px";

}


// ========================================
// ❤️ UPDATE ENEMY HP
// ========================================

function updateEnemyHealthBar(enemy){

  if(!enemy) return;


  let hp =
    parseInt(
      enemy.dataset.hp
    );


  let maxHp =
    parseInt(
      enemy.dataset.maxHp
    );


  if(isNaN(hp))
    hp = 100;


  if(isNaN(maxHp))
    maxHp = 100;


  const fill =
    enemy.querySelector(
      ".enemyHealthFill"
    );


  if(fill){

    const percent =
      Math.max(
        0,
        Math.min(
          100,
          (hp / maxHp) * 100
        )
      );


    fill.style.width =
      percent + "%";

  }

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

  if(!obj) return;


  if(selectedObject){

    selectedObject.classList.remove(
      "selected"
    );

  }


  selectedObject =
    obj;


  obj.classList.add(
    "selected"
  );


  const selectedName =
    document.getElementById(
      "selectedName"
    );


  if(selectedName){

    selectedName.innerText =
      obj.dataset.name;

  }


  updateProperties();

}


// ========================================
// ⚙️ PROPERTIES
// ========================================

function updateProperties(){

  if(!selectedObject) return;


  const objName =
    document.getElementById(
      "objName"
    );

  const objX =
    document.getElementById(
      "objX"
    );

  const objY =
    document.getElementById(
      "objY"
    );

  const objW =
    document.getElementById(
      "objW"
    );

  const objH =
    document.getElementById(
      "objH"
    );


  if(objName){

    objName.value =
      selectedObject.dataset.name;

  }


  if(objX){

    objX.value =
      parseInt(
        selectedObject.style.left
      ) || 0;

  }


  if(objY){

    objY.value =
      parseInt(
        selectedObject.style.top
      ) || 0;

  }


  if(objW){

    objW.value =
      selectedObject.offsetWidth;

  }


  if(objH){

    objH.value =
      selectedObject.offsetHeight;

  }

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


  const x =
    document.getElementById(
      "objX"
    ).value;


  const y =
    document.getElementById(
      "objY"
    ).value;


  const w =
    document.getElementById(
      "objW"
    ).value;


  const h =
    document.getElementById(
      "objH"
    ).value;


  if(name){

    selectedObject.dataset.name =
      name;

  }


  selectedObject.style.left =
    (parseInt(x) || 0) +
    "px";


  selectedObject.style.top =
    (parseInt(y) || 0) +
    "px";


  selectedObject.style.width =
    (parseInt(w) || 60) +
    "px";


  selectedObject.style.height =
    (parseInt(h) || 60) +
    "px";


  const selectedName =
    document.getElementById(
      "selectedName"
    );


  if(selectedName){

    selectedName.innerText =
      selectedObject.dataset.name;

  }

}


// ========================================
// 🖱️ DRAG
// ========================================

function makeDraggable(obj){

  let dragging =
    false;

  let offsetX =
    0;

  let offsetY =
    0;


  obj.addEventListener(
    "pointerdown",
    function(e){

      if(isPlaying) return;

      if(gamePaused()) return;


      dragging =
        true;


      const rect =
        obj.getBoundingClientRect();


      offsetX =
        e.clientX -
        rect.left;


      offsetY =
        e.clientY -
        rect.top;


      selectObject(obj);


      try{

        obj.setPointerCapture(
          e.pointerId
        );

      }catch(error){}

    }
  );


  obj.addEventListener(
    "pointermove",
    function(e){

      if(
        !dragging ||
        isPlaying ||
        gamePaused()
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


      x =
        Math.max(
          0,
          Math.min(
            x,
            gameArea.clientWidth -
            obj.offsetWidth
          )
        );


      y =
        Math.max(
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

      dragging =
        false;

    }
  );


  obj.addEventListener(
    "pointercancel",
    function(){

      dragging =
        false;

    }
  );

}


// ========================================
// 🗑️ DELETE
// ========================================

function deleteObject(){

  if(!selectedObject){

    alert(
      "Select an object first!"
    );

    return;

  }


  selectedObject.remove();

  selectedObject =
    null;


  const selectedName =
    document.getElementById(
      "selectedName"
    );


  if(selectedName){

    selectedName.innerText =
      "Nothing Selected";

  }

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


  gameArea.innerHTML =
    "";


  selectedObject =
    null;

  objectCount =
    0;


  playerHP =
    100;

  stamina =
    100;

  isBlocking =
    false;

  coins =
    0;

  score =
    0;

  level =
    1;

  isPlaying =
    false;

  isPaused =
    false;


  updateHPUI();

  updateStaminaUI();

  updateStatsUI();

  updateLevelUI();

  updateBlockButton();


  const pauseBtn =
    document.getElementById(
      "pauseBtn"
    );


  if(pauseBtn){

    pauseBtn.innerText =
      "⏸️ Break";

  }


  const selectedName =
    document.getElementById(
      "selectedName"
    );


  if(selectedName){

    selectedName.innerText =
      "Nothing Selected";

  }


  const status =
    document.getElementById(
      "status"
    );


  if(status){

    status.innerText =
      "Editor Mode";

  }

}


// ========================================
// ▶️ PLAY
// ========================================

function playGame(){

  if(gamePaused()){

    return;

  }


  isPlaying =
    !isPlaying;


  const status =
    document.getElementById(
      "status"
    );


  if(status){

    if(isPlaying){

      status.innerText =
        "▶ Play Mode";

    }else{

      status.innerText =
        "Editor Mode";

    }

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


  if(!input){

    return;

  }


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
    selectedObject.dataset.emoji ||
    "⬛";

}


// ========================================
// 💾 SAVE PROJECT
// ========================================

function saveProject(){

  const objects =
    [];


  [
    ...gameArea.children
  ].forEach(
    function(obj){

      objects.push({

        name:
          obj.dataset.name,

        emoji:
          obj.dataset.emoji ||
          "⬛",

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
          "",

        hp:
          obj.dataset.hp ||
          null,

        maxHp:
          obj.dataset.maxHp ||
          null,

        enemyType:
          obj.dataset.enemyType ||
          null

      });

    }
  );


  const project = {

    version:
      4,

    objects:
      objects,

    playerHP:
      playerHP,

    stamina:
      stamina,

    coins:
      coins,

    score:
      score,

    level:
      level

  };


  try{

    localStorage.setItem(
      "GameMakerV2Project",
      JSON.stringify(project)
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


    playerHP =
      typeof project.playerHP ===
      "number"
      ? project.playerHP
      : 100;


    stamina =
      typeof project.stamina ===
      "number"
      ? project.stamina
      : 100;


    coins =
      typeof project.coins ===
      "number"
      ? project.coins
      : 0;


    score =
      typeof project.score ===
      "number"
      ? project.score
      : 0;


    level =
      typeof project.level ===
      "number"
      ? project.level
      : 1;


    (
      project.objects || []
    ).forEach(
      function(data){

        objectCount++;


        const obj =
          document.createElement(
            "div"
          );


        obj.className =
          "object";


        obj.dataset.name =
          data.name ||
          "Object" +
          objectCount;


        obj.dataset.emoji =
          data.emoji ||
          "⬛";


        obj.dataset.color =
          data.color ||
          "#64748b";


        obj.dataset.hp =
          data.hp ||
          "";


        obj.dataset.maxHp =
          data.maxHp ||
          "";


        obj.dataset.enemyType =
          data.enemyType ||
          "";


        obj.dataset.attacking =
          "false";


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


        if(
          obj.dataset.name.startsWith(
            "Enemy"
          )
        ){

          if(!obj.dataset.hp){

            obj.dataset.hp =
              "100";

          }


          if(!obj.dataset.maxHp){

            obj.dataset.maxHp =
              obj.dataset.hp;

          }


          createEnemyHealthBar(
            obj
          );


          updateEnemyHealthBar(
            obj
          );

        }


        gameArea.appendChild(
          obj
        );


        makeDraggable(
          obj
        );

      }
    );


    updateHPUI();

    updateStaminaUI();

    updateStatsUI();

    updateLevelUI();

    updateBlockButton();


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
    ] =
      true;

  }
);


document.addEventListener(
  "keyup",
  function(e){

    keys[
      e.key.toLowerCase()
    ] =
      false;

  }
);


// ========================================
// 📱 TOUCH
// ========================================

function touchMove(direction){

  if(gamePaused()) return;

  touchDirection =
    direction;

}


function stopTouch(){

  touchDirection =
    null;

}


// ========================================
// 🔄 CONTROL
// ========================================

function switchControl(){

  if(gamePaused()) return;


  if(
    controlMode ===
    "Player"
  ){

    controlMode =
      "Enemy";

  }else{

    controlMode =
      "Player";

  }


  const button =
    document.getElementById(
      "controlButton"
    );


  if(button){

    button.innerText =
      "🔄 Control: " +
      controlMode;

  }

}


// ========================================
// 🎮 MOVE PLAYER
// ========================================

function movePlayer(direction){

  if(!isPlaying) return;

  if(gamePaused()) return;


  const player =
    getPlayer();


  if(!player) return;


  let x =
    parseFloat(
      player.style.left
    ) || 0;


  let y =
    parseFloat(
      player.style.top
    ) || 0;


  const speed =
    20;


  if(direction === "left")
    x -= speed;


  if(direction === "right")
    x += speed;


  if(direction === "up")
    y -= speed;


  if(direction === "down")
    y += speed;


  x =
    Math.max(
      0,
      Math.min(
        x,
        gameArea.clientWidth -
        player.offsetWidth
      )
    );


  y =
    Math.max(
      0,
      Math.min(
        y,
        gameArea.clientHeight -
        player.offsetHeight
      )
    );


  player.style.left =
    x + "px";


  player.style.top =
    y + "px";

}


// ========================================
// 🎮 GAME LOOP
// ========================================

function gameLoop(){

  if(
    isPlaying &&
    !gamePaused()
  ){

    const controlledObject =
      [
        ...gameArea.children
      ].find(
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
        parseFloat(
          controlledObject.style.left
        ) || 0;


      let y =
        parseFloat(
          controlledObject.style.top
        ) || 0;


      const speed =
        4;


      if(
        keys["a"] ||
        keys["arrowleft"] ||
        touchDirection ===
        "left"
      ){

        x -= speed;

      }


      if(
        keys["d"] ||
        keys["arrowright"] ||
        touchDirection ===
        "right"
      ){

        x += speed;

      }


      if(
        keys["w"] ||
        keys["arrowup"] ||
        touchDirection ===
        "up"
      ){

        y -= speed;

      }


      if(
        keys["s"] ||
        keys["arrowdown"] ||
        touchDirection ===
        "down"
      ){

        y += speed;

      }


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
// 👤 GET PLAYER
// ========================================

function getPlayer(){

  return [
    ...gameArea.children
  ].find(
    function(obj){

      return (
        obj.dataset.name &&
        obj.dataset.name.startsWith(
          "Player"
        )
      );

    }
  );

}


// ========================================
// 👹 ENEMY AI
// ========================================

function enemyAI(enemy){

  if(!isPlaying) return;

  if(gamePaused()) return;


  const player =
    getPlayer();


  if(!player)
    return;


  let enemyX =
    parseFloat(
      enemy.style.left
    ) || 0;


  let enemyY =
    parseFloat(
      enemy.style.top
    ) || 0;


  const playerX =
    parseFloat(
      player.style.left
    ) || 0;


  const playerY =
    parseFloat(
      player.style.top
    ) || 0;


  const dx =
    playerX -
    enemyX;


  const dy =
    playerY -
    enemyY;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  let speed =
    1.2;


  if(
    enemy.dataset.enemyType ===
    "Strong"
  ){

    speed =
      1.5;

  }


  if(
    enemy.dataset.enemyType ===
    "Boss"
  ){

    speed =
      1.8;

  }


  if(distance > 65){

    if(Math.abs(dx) > 4){

      enemyX +=
        dx > 0
        ? speed
        : -speed;

    }


    if(Math.abs(dy) > 4){

      enemyY +=
        dy > 0
        ? speed
        : -speed;

    }


    enemyX =
      Math.max(
        0,
        Math.min(
          enemyX,
          gameArea.clientWidth -
          enemy.offsetWidth
        )
      );


    enemyY =
      Math.max(
        0,
        Math.min(
          enemyY,
          gameArea.clientHeight -
          enemy.offsetHeight
        )
      );


    enemy.style.left =
      enemyX + "px";


    enemy.style.top =
      enemyY + "px";

  }

}


// ========================================
// 🔄 AI LOOP
// ========================================

setInterval(
  function(){

    if(!isPlaying)
      return;


    if(gamePaused())
      return;


    document
      .querySelectorAll(
        ".object"
      )
      .forEach(
        function(enemy){

          if(
            enemy.dataset.name &&
            enemy.dataset.name.startsWith(
              "Enemy"
            )
          ){

            enemyAI(enemy);

          }

        }
      );

  },
  30
);


// ========================================
// ❤️ PLAYER HP UI
// ========================================

function updateHPUI(){

  const text =
    document.getElementById(
      "playerHP"
    );


  const fill =
    document.getElementById(
      "playerHealthFill"
    );


  if(text){

    text.innerText =
      "❤️ " +
      Math.round(playerHP) +
      " HP";

  }


  if(fill){

    fill.style.width =
      Math.max(
        0,
        playerHP
      ) + "%";


    if(playerHP <= 20){

      fill.style.background =
        "#ef4444";

    }else if(playerHP <= 50){

      fill.style.background =
        "#f97316";

    }else{

      fill.style.background =
        "#22c55e";

    }

  }

}


// ========================================
// ⚡ STAMINA UI
// ========================================

function updateStaminaUI(){

  const fill =
    document.getElementById(
      "staminaFill"
    );


  const text =
    document.getElementById(
      "staminaText"
    );


  if(fill){

    fill.style.width =
      Math.max(
        0,
        stamina
      ) + "%";


    if(stamina <= 20){

      fill.style.background =
        "#ef4444";

    }else if(stamina <= 50){

      fill.style.background =
        "#f97316";

    }else{

      fill.style.background =
        "#3b82f6";

    }

  }


  if(text){

    text.innerText =
      "⚡ Stamina: " +
      Math.round(stamina);

  }

}


// ========================================
// 🪙 STATS
// ========================================

function updateStatsUI(){

  const coinCount =
    document.getElementById(
      "coinCount"
    );


  const scoreCount =
    document.getElementById(
      "scoreCount"
    );


  if(coinCount){

    coinCount.textContent =
      coins;

  }


  if(scoreCount){

    scoreCount.textContent =
      score;

  }

}


// ========================================
// 🌟 LEVEL UI
// ========================================

function updateLevelUI(){

  const levelCount =
    document.getElementById(
      "levelCount"
    );


  if(levelCount){

    levelCount.textContent =
      level;

  }

}


// ========================================
// ❤️ DAMAGE PLAYER
// ========================================

function damagePlayer(amount){

  if(gamePaused())
    return;


  if(playerHP <= 0)
    return;


  if(isBlocking){

    amount =
      2;

  }


  playerHP -=
    amount;


  if(playerHP < 0){

    playerHP =
      0;

  }


  updateHPUI();


  if(playerHP <= 0){

    isPlaying =
      false;


    isBlocking =
      false;


    const status =
      document.getElementById(
        "status"
      );


    if(status){

      status.innerText =
        "💀 Player Defeated";

    }


    updateBlockButton();

  }

}


// ========================================
// 👹 ENEMY ATTACK
// ========================================

function enemyAttack(enemy){

  if(!isPlaying)
    return;


  if(gamePaused())
    return;


  const player =
    getPlayer();


  if(!player)
    return;


  const enemyX =
    parseFloat(
      enemy.style.left
    ) || 0;


  const enemyY =
    parseFloat(
      enemy.style.top
    ) || 0;


  const playerX =
    parseFloat(
      player.style.left
    ) || 0;


  const playerY =
    parseFloat(
      player.style.top
    ) || 0;


  const dx =
    enemyX -
    playerX;


  const dy =
    enemyY -
    playerY;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  if(distance <= 75){

    if(
      enemy.dataset.attacking ===
      "true"
    ){

      return;

    }


    enemy.dataset.attacking =
      "true";


    let damage =
      5;


    if(
      enemy.dataset.enemyType ===
      "Strong"
    ){

      damage =
        8;

    }


    if(
      enemy.dataset.enemyType ===
      "Boss"
    ){

      damage =
        12;

    }


    showHitEffect(
      playerX + 20,
      playerY - 20,
      "💢"
    );


    damagePlayer(
      damage
    );


    setTimeout(
      function(){

        if(enemy){

          enemy.dataset.attacking =
            "false";

        }

      },
      1000
    );

  }

}


// ========================================
// ⚔️ ENEMY ATTACK LOOP
// ========================================

setInterval(
  function(){

    if(!isPlaying)
      return;


    if(gamePaused())
      return;


    document
      .querySelectorAll(
        ".object"
      )
      .forEach(
        function(enemy){

          if(
            enemy.dataset.name &&
            enemy.dataset.name.startsWith(
              "Enemy"
            )
          ){

            enemyAttack(enemy);

          }

        }
      );

  },
  100
);


// ========================================
// 💢 HIT EFFECT
// ========================================

function showHitEffect(
  x,
  y,
  symbol
){

  if(gamePaused())
    return;


  const hit =
    document.createElement(
      "div"
    );


  hit.className =
    "hitEffect";


  hit.innerText =
    symbol || "💥";


  hit.style.left =
    x + "px";


  hit.style.top =
    y + "px";


  gameArea.appendChild(
    hit
  );


  setTimeout(
    function(){

      if(hit){

        hit.remove();

      }

    },
    500
  );

}


// ========================================
// ⚔️ PLAYER ATTACK
// ========================================

function playerAttack(){

  if(!isPlaying)
    return;


  if(gamePaused())
    return;


  const player =
    getPlayer();


  if(!player)
    return;


  const playerX =
    parseFloat(
      player.style.left
    ) || 0;


  const playerY =
    parseFloat(
      player.style.top
    ) || 0;


  let hitEnemy =
    null;


  let closestDistance =
    Infinity;


  document
    .querySelectorAll(
      ".object"
    )
    .forEach(
      function(enemy){

        if(
          !enemy.dataset.name ||
          !enemy.dataset.name.startsWith(
            "Enemy"
          )
        ){

          return;

        }


        const enemyX =
          parseFloat(
            enemy.style.left
          ) || 0;


        const enemyY =
          parseFloat(
            enemy.style.top
          ) || 0;


        const dx =
          enemyX -
          playerX;


        const dy =
          enemyY -
          playerY;


        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if(
          distance <= 100 &&
          distance <
          closestDistance
        ){

          closestDistance =
            distance;


          hitEnemy =
            enemy;

        }

      }
    );


  if(!hitEnemy){

    showHitEffect(
      playerX + 20,
      playerY - 10,
      "❌"
    );

    return;

  }


  let hp =
    parseInt(
      hitEnemy.dataset.hp
    );


  let maxHp =
    parseInt(
      hitEnemy.dataset.maxHp
    );


  if(isNaN(hp))
    hp = 100;


  if(isNaN(maxHp))
    maxHp = 100;


  // ⚔️ PLAYER DAMAGE

  let damage =
    20;


  if(
    hitEnemy.dataset.enemyType ===
    "Strong"
  ){

    damage =
      25;

  }


  if(
    hitEnemy.dataset.enemyType ===
    "Boss"
  ){

    damage =
      30;

  }


  hp -=
    damage;


  if(hp < 0)
    hp = 0;


  hitEnemy.dataset.hp =
    hp;


  updateEnemyHealthBar(
    hitEnemy
  );


  const enemyX =
    parseFloat(
      hitEnemy.style.left
    ) || 0;


  const enemyY =
    parseFloat(
      hitEnemy.style.top
    ) || 0;


  showHitEffect(
    enemyX + 15,
    enemyY - 15,
    "⚔️"
  );


  // 💀 DEAD

  if(hp <= 0){

    let rewardCoins =
      10;


    let rewardScore =
      100;


    if(
      hitEnemy.dataset.enemyType ===
      "Strong"
    ){

      rewardCoins =
        25;


      rewardScore =
        250;

    }


    if(
      hitEnemy.dataset.enemyType ===
      "Boss"
    ){

      rewardCoins =
        100;


      rewardScore =
        1000;

    }


    coins +=
      rewardCoins;


    score +=
      rewardScore;


    updateStatsUI();


    showHitEffect(
      enemyX + 15,
      enemyY - 20,
      "💀"
    );


    setTimeout(
      function(){

        if(hitEnemy){

          hitEnemy.remove();

        }

      },
      300
    );

  }

}


// ========================================
// 🛡️ BLOCK
// ========================================

function toggleBlock(){

  if(gamePaused())
    return;


  if(!isPlaying)
    return;


  if(stamina <= 0){

    isBlocking =
      false;


    updateBlockButton();

    return;

  }


  isBlocking =
    !isBlocking;


  updateBlockButton();

}


// ========================================
// 🛡️ BLOCK UI
// ========================================

function updateBlockButton(){

  const button =
    document.getElementById(
      "blockButton"
    );


  if(!button)
    return;


  button.innerText =
    isBlocking
    ? "🛡️ Block ON"
    : "🛡️ Block OFF";

}


// ========================================
// ⚡ STAMINA
// ========================================

setInterval(
  function(){

    if(gamePaused())
      return;


    if(isBlocking){

      stamina -=
        5;


      if(stamina <= 0){

        stamina =
          0;


        isBlocking =
          false;


        updateBlockButton();

      }

    }else{

      stamina +=
        2;


      if(stamina > 100){

        stamina =
          100;

      }

    }


    updateStaminaUI();

  },
  500
);


// ========================================
// 🎁 REWARD
// ========================================

function addReward(){

  if(gamePaused())
    return;


  coins +=
    10;


  score +=
    100;


  updateStatsUI();

}


// ========================================
// 📈 NEXT LEVEL
// ========================================

function startNextLevel(){

  if(gamePaused())
    return;


  level++;


  updateLevelUI();


  score +=
    500;


  updateStatsUI();


  // Normal enemy

  addEnemy();


  // Strong enemy from level 2

  if(level >= 2){

    addStrongEnemy();

  }


  // Boss from level 3

  if(level >= 3){

    addBossEnemy();

  }


  alert(
    "🌟 Level " +
    level +
    " Started!"
  );

}


// ========================================
// 🔄 RESPAWN
// ========================================

function respawnEnemy(type){

  if(gamePaused())
    return;


  if(type === "Normal"){

    addEnemy();

  }


  if(type === "Strong"){

    addStrongEnemy();

  }


  if(type === "Boss"){

    addBossEnemy();

  }

}


// ========================================
// 🚀 START ENGINE
// ========================================

loadProject();

updateHPUI();

updateStaminaUI();

updateStatsUI();

updateLevelUI();

updateBlockButton();

gameLoop();
