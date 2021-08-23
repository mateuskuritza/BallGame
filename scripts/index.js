const screenWidth = window.innerWidth * 0.95;
const screenHeight = window.innerHeight * 0.85;

const pointsContainer = document.querySelector("#points");
const canvas = document.querySelector("#canvas");
canvas.width = screenWidth;
canvas.height = screenHeight;
const context = canvas.getContext("2d");

let player = new Player();
let game = new Game(player);

let enemies = [];
let friends = [];
let rescuedFriends = 0;

function onMouseMove(event) {
    player.moveTo(event.clientX, event.clientY);
}

game.start();