export function openBIOS() {
  const win = document.createElement("div");
  win.style.position = "fixed";
  win.style.top = "0";
  win.style.left = "0";
  win.style.width = "100vw";
  win.style.height = "100vh";
  win.style.backgroundColor = "black";
  win.style.color = "#0f0";
  win.style.fontFamily = "monospace";
  win.style.fontSize = "14px";
  win.style.padding = "20px";
  win.style.overflowY = "auto";
  win.style.zIndex = "9999";

  win.innerText = `
Phoenix BIOS Version 1.0.0

Press DEL to enter setup
Loading OS...
Checking memory...
Memory test passed
Detecting drives...
No errors detected
Booting...
  `;

  document.body.appendChild(win);

  window.addEventListener("keydown", () => {
    document.body.removeChild(win);
  }, { once: true });
}
