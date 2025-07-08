import init, { run_command } from "../public/dist/rust_terminal.js";

let zIndex = 10;
const desktop = document.getElementById("desktop")!;
const startButton = document.getElementById("start-button")!;
const startMenu = document.getElementById("start-menu")!;

startButton.onclick = () => {
  if (startMenu.style.display === "none") {
    startMenu.style.display = "block";
  } else {
    startMenu.style.display = "none";
  }
};

document.addEventListener("click", (e) => {
  if (!startMenu.contains(e.target as Node) && e.target !== startButton) {
    startMenu.style.display = "none";
  }
});

function createWindow(title: string, width = 400, height = 300): HTMLDivElement {
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

// ターミナル起動
export function openTerminal() {
  createTerminalWindow();
  startMenu.style.display = "none";
}

async function createTerminalWindow() {
  await init();
  const win = createWindow("ターミナル", 600, 400);
  const content = win.querySelector(".window-content")!;
  content.innerHTML = `
    <div id="output" style="font-family: monospace; white-space: pre-wrap; height: 85%; overflow-y: auto; background: black; padding: 10px; color: #0f0;"></div>
    <input id="command-input" type="text" style="width: 100%; box-sizing: border-box; font-family: monospace;" autofocus />
  `;

  const input = content.querySelector("#command-input") as HTMLInputElement;
  const output = content.querySelector("#output") as HTMLDivElement;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim();
      if (!cmd) return;
      if (cmd === "clear") {
        output.innerHTML = "";
        input.value = "";
        return;
      }
      const res = run_command(cmd);
      output.innerHTML += `> ${cmd}\n${res}\n`;
      output.scrollTop = output.scrollHeight;
      input.value = "";
    }
  });
}

// ブラウザ起動
export function openBrowser() {
  const win = createWindow("仮想ブラウザ", 700, 500);
  const content = win.querySelector(".window-content")!;
  content.innerHTML = `
    <div>
      <input type="text" id="browser-url" placeholder="https://example.com" style="width: 80%;" />
      <button id="open-url-btn">開く</button>
    </div>
    <iframe id="browser-frame" src="" style="width: 100%; height: 90%; border: none; margin-top: 10px;"></iframe>
  `;

  const input = content.querySelector("#browser-url") as HTMLInputElement;
  const iframe = content.querySelector("#browser-frame") as HTMLIFrameElement;
  const btn = content.querySelector("#open-url-btn") as HTMLButtonElement;

  btn.onclick = () => {
    let url = input.value.trim();
    if (!url.startsWith("https://")) {
      alert("安全のため、https:// で始まるURLのみ開けます");
      return;
    }
    iframe.src = url;
  };
}
import { openWallpaperChanger } from "./wallpaper";

document.querySelector("#start-menu ul")!.innerHTML += `
  <li onclick="openWallpaperChanger()">壁紙変更</li>
`;

(window as any).openWallpaperChanger = openWallpaperChanger;
