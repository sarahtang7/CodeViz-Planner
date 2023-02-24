//const { imp_canvas } = require('canvas');

// open canvas in default browser
const { exec } = require('child_process');
const filePath = './canvas.html';
exec(`open ${filePath}`);

const canvasAPI = require('canvas')
const ctx = canvasAPI.getContext('2d');
ctx.fillStyle = 'red';
ctx.strokeStyle = 'black';

let circleX = 200;
let circleY = 200;
let circleRadius = 50;
let circleFill = 'red';

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = circleFill;
    ctx.fill();
    ctx.stroke();
}

function moveCircle(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (
      mouseX > circleX - circleRadius &&
      mouseX < circleX + circleRadius &&
      mouseY > circleY - circleRadius &&
      mouseY < circleY + circleRadius
    ) {
      circleX = mouseX;
      circleY = mouseY;
    }
}

canvas.addEventListener('mousemove', moveCircle);
drawCircle();