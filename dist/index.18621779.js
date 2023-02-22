const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const adventurer = document.querySelector(".adventurer");
const form = document.getElementById("input_form");
const input_form = document.getElementById("command");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let scale = 0.1;
let objects = [];
let keyMap = {};
function Start() {
    timer = setInterval(Update, 1000 / 60); //The game state will update 60 times per second - at this rate, the update of what is happening will seem very smooth
}
function Stop() {
    clearInterval(timer); //Stopping the update
}
function Update() {
    if (keyMap[37]) // left
    objects[0].changeDirection(1);
    if (keyMap[39]) // right
    objects[0].changeDirection(-1);
    if (keyMap[38]) // up
    objects[0].changeSpeed(1);
    if (keyMap[40]) // down
    objects[0].changeSpeed(-1);
    for(let i = 0; i < objects.length; i++)objects[i].Update();
    Draw();
}
function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clearing the canvas from the previous frame
    let object;
    for(let i = 0; i < objects.length; i++){
        object = objects[i];
        drawImage(ctx, document.getElementById(object.imageId), object.x, object.y, 0.5 - object.dir);
    }
}
function KeyDown(e) {
    keyMap[e.keyCode] = true;
}
function KeyUp(e) {
    keyMap[e.keyCode] = false;
}
function drawImage(ctx, img, x, y, angle) {
    ctx.save();
    ctx.translate(x + img.width / 2, y + img.height / 2);
    ctx.rotate(angle * Math.PI);
    ctx.translate(-x - img.width / 2, -y - img.height / 2);
    ctx.drawImage(img, x, y, img.width, img.height);
    ctx.restore();
}
function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
const openTutorial = ()=>{
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeTutorial = ()=>{
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
const receiveCommand = (e)=>{
    e.preventDefault();
    console.log("e: " + e);
    let str = input_form.value;
    input_form.value = null;
    console.log("str: " + str);
    if (str == "restart") {
        localStorage.clear();
        main();
    } else if (str == "stop") Stop();
    else if (str == "start") Start();
};
const initializeData = ()=>{
    console.log("Welcome to the sky!");
    if (!localStorage.getItem("playing")) {
        localStorage.setItem("characterHealth", 10);
        localStorage.setItem("characterAttack", 2);
        localStorage.setItem("characterDefense", 2);
        localStorage.setItem("stage", 1);
        localStorage.setItem("playing", "true");
    }
    form.addEventListener("submit", (event)=>receiveCommand(event));
    window.addEventListener("resize", Resize);
    window.addEventListener("keydown", function(e) {
        KeyDown(e);
    });
    window.addEventListener("keyup", function(e) {
        KeyUp(e);
    });
    objects[0] = new AirPlane("f-14", window.innerWidth / 2, window.innerHeight / 2); //An array of game objects
};
function main() {
    initializeData();
    Resize();
    Start();
}
main(); // switch (e.keyCode) {
 //     case 37: //Left
 //         objects[0].changeDirection(1)
 //         console.log("left");
 //         break;
 //     case 39: //Right
 //         objects[0].changeDirection(-1)
 //         console.log("right");
 //         break;
 //     case 38: //Up
 //         objects[0].changeSpeed(1)
 //         console.log("up");
 //         break;
 //     case 40: //Down
 //         objects[0].changeSpeed(-1)
 //         console.log("down");
 //         break;
 //     case 32: //Space
 //         break;
 //     case 27: //Esc
 //         break;
 // }

//# sourceMappingURL=index.18621779.js.map
