const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const adventurer = document.querySelector(".adventurer");
// const form = document.getElementById("input_form");
// const input_form = document.getElementById("command");
const buttonStartStop = document.getElementById("buttonOnOff");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let scale = 0.1;
let objects = [];
let keyMap = {};
let isRunning;
function Start() {
    isRunning = true;
    timer = setInterval(Update, 1000 / 60); //The game state will update 60 times per second - at this rate, the update of what is happening will seem very smooth
}
function Stop() {
    isRunning = false;
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
    if (keyMap[190] || keyMap[96]) // period
    objects[0].fireGun("red");
    if (keyMap[65]) // left
    objects[1].changeDirection(1);
    if (keyMap[68]) // right
    objects[1].changeDirection(-1);
    if (keyMap[87]) // up
    objects[1].changeSpeed(1);
    if (keyMap[83]) // down
    objects[1].changeSpeed(-1);
    if (keyMap[32]) // spacebar
    objects[1].fireGun("green");
    // Update canvas
    for(let i = 0; i < objects.length; i++)objects[i].Update();
    Draw();
}
function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clearing the canvas from the previous frame
    let object;
    for(let i = 0; i < objects.length; i++)// object = objects[i]
    if (objects[i].imageId) {
        img = document.getElementById(objects[i].imageId);
        ctx.save();
        ctx.translate(objects[i].x + img.width / 2, objects[i].y + img.height / 2);
        ctx.rotate((0.5 - objects[i].dir) * Math.PI);
        ctx.translate(-objects[i].x - img.width / 2, -objects[i].y - img.height / 2);
        ctx.drawImage(img, Math.floor(objects[i].x), Math.floor(objects[i].y), img.width, img.height);
        ctx.restore();
    // drawImage(ctx,
    //     document.getElementById(object.imageId),
    //     object.x,
    //     object.y,
    //     1 / 2 - object.dir)
    } else objects[i].Draw();
}
function KeyDown(e) {
    keyMap[e.keyCode] = true;
// console.log(e.keyCode);
}
function KeyUp(e) {
    keyMap[e.keyCode] = false;
}
// function drawImage(ctx, img, x, y, angle) {
//     ctx.save();
//     ctx.translate(x + img.width / 2, y + img.height / 2);
//     ctx.rotate(angle * Math.PI);
//     ctx.translate(- x - img.width / 2, - y - img.height / 2);
//     ctx.drawImage(img, x, y, img.width, img.height);
//     ctx.restore();
// }
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
const turnOnOff = (e)=>{
    e.preventDefault();
    if (isRunning) {
        Stop();
        buttonStartStop.innerText = "Start";
    } else {
        Start();
        buttonStartStop.innerText = "Stop";
    }
};
const initializeData = ()=>{
    console.log("Welcome to the sky!");
    buttonStartStop.addEventListener("click", (event)=>turnOnOff(event));
    window.addEventListener("resize", Resize);
    window.addEventListener("keydown", function(e) {
        KeyDown(e);
    });
    window.addEventListener("keyup", function(e) {
        KeyUp(e);
    });
    objects[0] = new AirPlane("f-14", window.innerWidth / 2, window.innerHeight / 2);
    objects[1] = new AirPlane("mig29", window.innerWidth / 2 + 50, window.innerHeight / 2 + 50);
};
function main() {
    initializeData();
    Resize();
    Start();
}
main();

//# sourceMappingURL=index.18621779.js.map
