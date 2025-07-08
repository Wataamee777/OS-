import { createWindow } from "./window";

export function openBrowser() {
  const win = createWindow("ブラウザ", 700, 500);
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
      alert("安全のためhttps://から始まるURLのみ開けます");
      return;
    }
    iframe.src = url;
  };
}
