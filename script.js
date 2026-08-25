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
    document.getElementById("obj
