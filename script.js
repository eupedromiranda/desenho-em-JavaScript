const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let painting = false;
let brushColor = '#000000';
let brushSize = 5;

function startPosition(e) {
  painting = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
  brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});