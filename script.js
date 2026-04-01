const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let painting = false;
let brushColor = '#000000';
let brushSize = 5;
let mode = 'brush';

const brushBtn = document.getElementById('brush');
const eraserBtn = document.getElementById('eraser');

brushBtn.classList.add('active');

brushBtn.addEventListener('click', () => {
  mode = 'brush';
  brushBtn.classList.add('active');
  eraserBtn.classList.remove('active');
});

eraserBtn.addEventListener('click', () => {
  mode = 'eraser';
  eraserBtn.classList.add('active');
  brushBtn.classList.remove('active');
});

function startPosition(e) {
  painting = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (mode === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = brushColor;
  }

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

document.addEventListener('mouseup', finishedPosition);
document.addEventListener('mouseleave', finishedPosition);

document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
  brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = Number(e.target.value);
});

document.getElementById('save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'meu-desenho.png';
  link.href = canvas.toDataURL();
  link.click();
});
