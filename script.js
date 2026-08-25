// ========================================
// 🎮 GAMEMAKER V2 - COMPLETE SCRIPT
// ========================================

let selectedObject = null;
let objectCount = 0;

let isPlaying = false;
let controlMode = "Player";

let touchDirection = null;
let keys = {};

const gameArea = document.getElementById("gameArea");

// ========================================
// ❤️ PLAYER VARIABLES
// ========================================

let playerHP = 100;
let stamina = 100;
let isBlocking = false;

// ========================================
// 🪙 COINS + SCORE
// ========================================

let coins = 0;
let score = 0;


// ========================================
// 🎮 CREATE OBJECT
// ========================================

function createObject(name, emoji, color){

  objectCount++;

  const obj = document.createElement("div");

  obj.className = "object";
  obj.innerText = emoji;

  obj.dataset.name = name + objectCount;
  obj.dataset.emoji = emoji;
  obj.dataset.color = color;

  if(name === "Enemy"){
    obj.dataset.hp = "100";
    obj.dataset.attacking = "false";
  }

  obj.style.left = "100px";
  obj.style.top = "100px";
  obj.style.width = "60px";
  obj.style.height = "60px";
  obj.style.backgroundColor = color;

  gameArea.appendChild(obj);

  // Enemy HP bar
  if(name === "Enemy"){
    createEnemyHealthBar(obj);
  }

  selectObject(obj);
  makeDraggable(obj);
}


// ========================================
// ❤️ CREATE ENEMY HP BAR
// ========================================

function createEnemyHealthBar(enemy){

  const hpBar = document.createElement("div");
  hpBar.className = "enemyHealthBar";

  const hpFill = document.createElement("div");
  hpFill.className = "enemyHealthFill";

  hpFill.style.width = "100%";

  hpBar.appendChild(hpFill);
  enemy.appendChild(hpBar);
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

  if(!obj) return;

  if(selectedObject){
    selectedObject.classList.remove("selected");
  }

  selectedObject = obj;

  obj.classList.add("selected");

  const nameBox =
    document.getElementById("selectedName");

  if(nameBox){
    nameBox.innerText =
      obj.dataset.name;
  }

  updateProperties();
}


// ========================================
// ⚙️ UPDATE PROPERTIES
// ========================================

function updateProperties(){

  if(!selectedObject) return;

  const name =
    document.getElementById("objName");

  const x =
    document.getElementById("objX");

  const y =
    document.getElementById("objY");

  const w =
    document.getElementById("objW");

  const h =
    document.getElementById("objH");


  if(name){
    name.value =
      selectedObject.dataset.name || "";
  }

  if(x){
    x.value =
      parseInt(selectedObject.style.left) || 0;
  }

  if(y){
    y.value =
      parseInt(selectedObject.style.top) || 0;
  }

  if(w){
    w.value =
      selectedObject.offsetWidth || 60;
  }

  if(h){
    h.value =
      selectedObject.offsetHeight || 60;
  }

}


// ========================================
// ✅ APPLY PROPERTIES
// ========================================

function applyProperties(){

  if(!selectedObject){

    alert("Select an object first!");

    return;
  }

  const name =
    document.getElementById("objName").value.trim();

  const x =
    document.getElementById("objX").value;

  const y =
    document.getElementById("objY").value;

  const w =
    document.getElementById("objW").value;

  const h =
    document.getElementById("objH").value;


  if(name){

    selectedObject.dataset.name =
      name;

  }


  selectedObject.style.left =
    (parseInt(x) || 0) + "px";

  selectedObject.style.top =
    (parseInt(y) || 0) + "px";

  selectedObject.style.width =
    (parseInt(w) || 60) + "px";

  selectedObject.style.height =
    (parseInt(h) || 60) + "px";


  const selectedName =
    document.getElementById("selectedName");

  if(selectedName){

    selectedName.innerText =
      selectedObject.dataset.name;

  }

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
        e.clientX - rect.left;

      offsetY =
        e.clientY - rect.top;

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

      if(!dragging || isPlaying){
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

    alert("Select an object first!");

    return;
  }

  selectedObject.remove();

  selectedObject = null;

  const selectedName =
    document.getElementById("selectedName");

  if(selectedName){

    selectedName.innerText =
      "Nothing Selected";

  }

}


// ========================================
// 🆕 NEW PROJECT
// ========================================

function newProject(){

  if(!confirm("Create a new project?")){
    return;
  }

  gameArea.innerHTML = "";

  selectedObject = null;

  objectCount = 0;

  playerHP = 100;
  stamina = 100;
  isBlocking = false;

  coins = 0;
  score = 0;

  updateHPUI();
  updateStaminaUI();
  updateStatsUI();

  const selectedName =
    document.getElementById("selectedName");

  if(selectedName){
    selectedName.innerText =
      "Nothing Selected";
  }

  const status =
    document.getElementById("status");

  if(status){
    status.innerText =
      "Editor Mode";
  }

  isPlaying = false;

  updateBlockButton();
}


// ========================================
// ▶️ PLAY MODE
// ========================================

function playGame(){

  isPlaying = !isPlaying;

  const status =
    document.getElementById("status");

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

    alert("Select an object first!");

    return;
  }

  const input =
    document.getElementById("objImage");

  const file =
    input.files[0];

  if(!file){

    alert("Please select an image!");

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

      selectedObject.innerText = "";

    };


  reader.readAsDataURL(file);

}


// ========================================
// ❌ REMOVE IMAGE
// ========================================

function removeImage(){

  if(!selectedObject){

    alert("Select an object first!");

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

  const objects = [];


  [...gameArea.children].forEach(
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
          parseInt(obj.style.left) || 0,

        y:
          parseInt(obj.style.top) || 0,

        width:
          obj.offsetWidth,

        height:
          obj.offsetHeight,

        image:
          obj.style.backgroundImage ||
          "",

        hp:
          obj.dataset.hp || null

      });

    }
  );


  const project = {

    version: 2,

    objects: objects,

    playerHP:
      playerHP,

    stamina:
      stamina,

    coins:
      coins,

    score:
      score

  };


  try{

    localStorage.setItem(
      "GameMakerV2Project",
      JSON.stringify(project)
    );

    alert("💾 Project Saved!");

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


    gameArea.innerHTML = "";

    selectedObject = null;

    objectCount = 0;


    playerHP =
      typeof project.playerHP === "number"
      ? project.playerHP
      : 100;

    stamina =
      typeof project.stamina === "number"
      ? project.stamina
      : 100;

    coins =
      typeof project.coins === "number"
      ? project.coins
      : 0;

    score =
      typeof project.score === "number"
      ? project.score
      : 0;


    (project.objects || []).forEach(
      function(data){

        objectCount++;

        const obj =
          document.createElement("div");

        obj.className =
          "object";

        obj.dataset.name =
          data.name || "Object" + objectCount;

        obj.dataset.emoji =
          data.emoji || "⬛";

        obj.dataset.color =
          data.color || "#64748b";

        obj.dataset.hp =
          data.hp || "";

        obj.dataset.attacking =
          "false";

        obj.innerText =
          data.emoji || "⬛";

        obj.style.left =
          (data.x || 0) + "px";

        obj.style.top =
          (data.y || 0) + "px";

        obj.style.width =
          (data.width || 60) + "px";

        obj.style.height =
          (data.height || 60) + "px";

        obj.style.backgroundColor =
          data.color || "#64748b";


        if(data.image){

          obj.style.backgroundImage =
            data.image;

          obj.style.backgroundSize =
            "cover";

          obj.style.backgroundPosition =
            "center";

          obj.style.backgroundRepeat =
            "no-repeat";

          obj.innerText = "";

        }


        if(
          obj.dataset.name.startsWith("Enemy")
        ){

          if(!obj.dataset.hp){

            obj.dataset.hp = "100";

          }

          createEnemyHealthBar(obj);

        }


        gameArea.appendChild(obj);

        makeDraggable(obj);

      }
    );


    updateHPUI();
    updateStaminaUI();
    updateStatsUI();


    const selectedName =
      document.getElementById("selectedName");

    if(selectedName){

      selectedName.innerText =
        "Nothing Selected";

    }


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
// 🔄 SWITCH CONTROL
// ========================================

function switchControl(){

  if(controlMode === "Player"){

    controlMode =
      "Enemy";

  }else{

    controlMode =
      "Player";

  }


  const button =
    document.getElementById("controlButton");


  if(button){

    button.innerText =
      "🔄 Control: " +
      controlMode;

  }

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
        parseFloat(
          controlledObject.style.left
        ) || 0;

      let y =
        parseFloat(
          controlledObject.style.top
        ) || 0;


      const speed = 4;


      if(
        keys["a"] ||
        keys["arrowleft"] ||
        touchDirection === "left"
      ){

        x -= speed;

      }


      if(
        keys["d"] ||
        keys["arrowright"] ||
        touchDirection === "right"
      ){

        x += speed;

      }


      if(
        keys["w"] ||
        keys["arrowup"] ||
        touchDirection === "up"
      ){

        y -= speed;

      }


      if(
        keys["s"] ||
        keys["arrowdown"] ||
        touchDirection === "down"
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


  requestAnimationFrame(gameLoop);

}


// ========================================
// 👹 FIND PLAYER
// ========================================

function getPlayer(){

  return [...gameArea.children].find(
    function(obj){

      return (
        obj.dataset.name &&
        obj.dataset.name.startsWith("Player")
      );

    }
  );

}


// ========================================
// 👹 ENEMY AI
// ========================================

function enemyAI(enemy){

  if(!isPlaying) return;

  const player =
    getPlayer();

  if(!player) return;


  let enemyX =
    parseFloat(enemy.style.left) || 0;

  let enemyY =
    parseFloat(enemy.style.top) || 0;

  const playerX =
    parseFloat(player.style.left) || 0;

  const playerY =
    parseFloat(player.style.top) || 0;


  const dx =
    playerX - enemyX;

  const dy =
    playerY - enemyY;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  const speed = 1.2;


  // Stop when close enough

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


    enemy.style.left =
      enemyX + "px";

    enemy.style.top =
      enemyY + "px";

  }

}


// ========================================
// 🔄 ENEMY AI LOOP
// ========================================

setInterval(
  function(){

    if(!isPlaying) return;

    document
      .querySelectorAll(".object")
      .forEach(
        function(enemy){

          if(
            enemy.dataset.name &&
            enemy.dataset.name.startsWith("Enemy")
          ){

            enemyAI(enemy);

          }

        }
      );

  },
  30
);


// ========================================
// ❤️ UPDATE PLAYER HP
// ========================================

function updateHPUI(){

  const hpText =
    document.getElementById("playerHP");

  const hpFill =
    document.getElementById(
      "playerHealthFill"
    );


  if(hpText){

    hpText.innerText =
      "❤️ " +
      Math.round(playerHP) +
      " HP";

  }


  if(hpFill){

    hpFill.style.width =
      Math.max(0, playerHP) +
      "%";


    if(playerHP <= 20){

      hpFill.style.background =
        "#ef4444";

    }else if(playerHP <= 50){

      hpFill.style.background =
        "#f97316";

    }else{

      hpFill.style.background =
        "#22c55e";

    }

  }

}


// ========================================
// ⚡ UPDATE STAMINA
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
      Math.max(0, stamina) +
      "%";


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
// 🪙 UPDATE COINS + SCORE
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
// 🎁 REWARD
// ========================================

function addReward(){

  coins += 10;

  score += 100;

  updateStatsUI();

}


// ========================================
// ❤️ PLAYER DAMAGE
// ========================================

function damagePlayer(amount){

  if(playerHP <= 0){
    return;
  }


  if(isBlocking){

    amount = 2;

  }


  playerHP -= amount;


  if(playerHP < 0){

    playerHP = 0;

  }


  updateHPUI();


  if(playerHP <= 0){

    isPlaying = false;

    isBlocking = false;

    const status =
      document.getElementById("status");

    if(status){

      status.innerText =
        "💀 Player Defeated";

    }

    updateBlockButton();

  }

}


// ========================================
// ⚔️ ENEMY ATTACK
// ========================================

function enemyAttack(enemy){

  if(!isPlaying) return;

  const player =
    getPlayer();

  if(!player) return;


  const enemyX =
    parseFloat(enemy.style.left) || 0;

  const enemyY =
    parseFloat(enemy.style.top) || 0;

  const playerX =
    parseFloat(player.style.left) || 0;

  const playerY =
    parseFloat(player.style.top) || 0;


  const dx =
    enemyX - playerX;

  const dy =
    enemyY - playerY;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  if(distance <= 75){

    if(
      enemy.dataset.attacking === "true"
    ){

      return;

    }


    enemy.dataset.attacking =
      "true";


    showHitEffect(
      playerX + 20,
      playerY - 20,
      "💢"
    );


    damagePlayer(5);


    setTimeout(
      function(){

        enemy.dataset.attacking =
          "false";

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

    if(!isPlaying) return;

    document
      .querySelectorAll(".object")
      .forEach(
        function(enemy){

          if(
            enemy.dataset.name &&
            enemy.dataset.name.startsWith("Enemy")
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

function showHitEffect(x, y, symbol){

  const hit =
    document.createElement("div");

  hit.className =
    "hitEffect";

  hit.innerText =
    symbol || "💥";

  hit.style.left =
    x + "px";

  hit.style.top =
    y + "px";


  gameArea.appendChild(hit);


  setTimeout(
    function(){

      hit.remove();

    },
    500
  );

}


// ========================================
// 🛡️ BLOCK
// ========================================

function toggleBlock(){

  if(stamina <= 0){

    isBlocking = false;

    updateBlockButton();

    return;

  }


  isBlocking =
    !isBlocking;


  updateBlockButton();

}


// ========================================
// 🛡️ BLOCK BUTTON UI
// ========================================

function updateBlockButton(){

  const button =
    document.getElementById(
      "blockButton"
    );


  if(!button) return;


  button.innerText =
    isBlocking
    ? "🛡️ Block ON"
    : "🛡️ Block OFF";

}


// ========================================
// ⚡ STAMINA SYSTEM
// ========================================

setInterval(
  function(){

    if(isBlocking){

      stamina -= 5;


      if(stamina <= 0){

        stamina = 0;

        isBlocking = false;

        updateBlockButton();

      }

    }else{

      stamina += 2;


      if(stamina > 100){

        stamina = 100;

      }

    }


    updateStaminaUI();

  },
  500
);


// ========================================
// ⚔️ PLAYER ATTACK
// ========================================

function playerAttack(){

  if(!isPlaying){

    return;

  }


  const player =
    getPlayer();


  if(!player){

    return;

  }


  const playerX =
    parseFloat(player.style.left) || 0;

  const playerY =
    parseFloat(player.style.top) || 0;


  let hitEnemy = null;

  let closestDistance =
    Infinity;


  document
    .querySelectorAll(".object")
    .forEach(
      function(enemy){

        if(
          !enemy.dataset.name ||
          !enemy.dataset.name.startsWith("Enemy")
        ){

          return;

        }


        const enemyX =
          parseFloat(enemy.style.left) || 0;

        const enemyY =
          parseFloat(enemy.style.top) || 0;


        const dx =
          enemyX - playerX;

        const dy =
          enemyY - playerY;


        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if(
          distance <= 95 &&
          distance < closestDistance
        ){

          closestDistance =
            distance;

          hitEnemy =
            enemy;

        }

      }
    );


  // ❌ Enemy not in range

  if(!hitEnemy){

    showHitEffect(
      playerX + 20,
      playerY - 10,
      "❌"
    );

    return;

  }


  // ❤️ Enemy HP

  let hp =
    parseInt(
      hitEnemy.dataset.hp
    );


  if(isNaN(hp)){

    hp = 100;

  }


  hp -= 20;


  if(hp < 0){

    hp = 0;

  }


  hitEnemy.dataset.hp =
    hp;


  // ❤️ Update enemy HP bar

  const hpFill =
    hitEnemy.querySelector(
      ".enemyHealthFill"
    );


  if(hpFill){

    hpFill.style.width =
      hp + "%";

  }


  // 💥 Hit effect

  const enemyX =
    parseFloat(hitEnemy.style.left) || 0;

  const enemyY =
    parseFloat(hitEnemy.style.top) || 0;


  showHitEffect(
    enemyX + 15,
    enemyY - 15,
    "⚔️"
  );


  // 💀 Enemy defeated

  if(hp <= 0){

    coins += 10;

    score += 100;

    updateStatsUI();


    showHitEffect(
      enemyX + 10,
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
// 🚀 START ENGINE
// ========================================

loadProject();

updateHPUI();

updateStaminaUI();

updateStatsUI();

updateBlockButton();

gameLoop();
