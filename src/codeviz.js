//const { imp_canvas } = require('canvas');

// open canvas in default browser
const { exec } = require('child_process');
const filePath = './canvas.html';
exec(`open ${filePath}`);

const canvasAPI = require('canvas')
const ctx = canvasAPI.getContext('2d');
ctx.fillStyle = 'red';
ctx.strokeStyle = 'black';

// create draggable circle
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

    // make circle resizeable
    const distance = Math.sqrt(Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2));
    if (distance <= circleRadius) {
      canvas.style.cursor = 'move';
    } else if (distance > circleRadius && distance < circleRadius + 10) {
      canvas.style.cursor = 'nesw-resize';
    } else {
      canvas.style.cursor = 'default';
    }

    // if previous circle was moved, add a new circle
    if (Math.abs(circleX - 200) > 10 || Math.abs(circleY - 200) > 10) {
      const newCircleX = 200;
      const newCircleY = 200;
      const newCircleRadius = 50;
      const newCircleFill = 'red';
      drawCircle(newCircleX, newCircleY, newCircleRadius, newCircleFill);
    }
}

function resizeCircle(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const distance = Math.sqrt(Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2));

  if (distance > circleRadius && distance < circleRadius + 10) {
    circleRadius = distance;
    drawCircle();
  }
}

canvas.addEventListener('mousemove', moveCircle);

canvas.addEventListener('mousedown', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const distance = Math.sqrt(Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2));

  if (distance > circleRadius && distance < circleRadius + 10) {
    canvas.addEventListener('mousemove', resizeCircle);
  }
});

canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', resizeCircle);
});

drawCircle();