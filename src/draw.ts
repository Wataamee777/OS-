import { createWindow } from "./window";

export function openDrawing() {
  const win = createWindow("お絵描き", 600, 400);
  const content = win.querySelector(".window-content")!;
  content.innerHTML = `
    <canvas id="draw-canvas" width="580" height="350" style="border:1px solid #ccc; background:white;"></canvas>
    <br/>
    <button id="clear-btn">クリア</button>
  `;

  const canvas = content.querySelector("#draw-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  let drawing = false;

  canvas.onmousedown = () => { drawing = true; };
  canvas.onmouseup = () => { drawing = false; ctx.beginPath(); };
  canvas.onmouseleave = () => { drawing = false; ctx.beginPath(); };
  canvas.onmousemove = (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  content.querySelector("#clear-btn")!.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
