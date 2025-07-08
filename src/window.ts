let zIndex = 10;
const desktop = document.getElementById("desktop")!;

export function createWindow(title: string, width = 400, height = 300): HTMLDivElement {
  const win = document.createElement("div");
  win.classList.add("window");
  win.style.width = width + "px";
  win.style.height = height + "px";
  win.style.top = "50px";
  win.style.left = "50px";
  win.style.zIndex = (++zIndex).toString();

  const header = document.createElement("div");
  header.classList.add("window-header");
  header.textContent = title;

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.textContent = "×";
  closeBtn.onclick = () => win.remove();

  header.appendChild(closeBtn);
  win.appendChild(header);

  const content = document.createElement("div");
  content.classList.add("window-content");
  win.appendChild(content);

  desktop.appendChild(win);

  // ドラッグ処理
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = (++zIndex).toString();
  });
  document.addEventListener("mouseup", () => (isDragging = false));
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      win.style.left = e.clientX - offsetX + "px";
      win.style.top = e.clientY - offsetY + "px";
    }
  });

  return win;
}
