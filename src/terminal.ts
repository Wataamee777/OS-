import init, { run_command } from "../public/dist/rust_terminal.js";
import { createWindow } from "./window";

export async function openTerminal() {
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
