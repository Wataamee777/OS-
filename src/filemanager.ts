import { createWindow } from "./window";

export function openFileManager() {
  const win = createWindow("ファイルマネージャー", 500, 400);
  const content = win.querySelector(".window-content")!;
  content.innerHTML = `
    <p>今のところローカルストレージ内のファイル一覧（仮）</p>
    <ul id="file-list"></ul>
    <input type="file" id="file-input" multiple />
  `;

  const fileList = content.querySelector("#file-list")!;
  const fileInput = content.querySelector("#file-input") as HTMLInputElement;

  fileInput.onchange = () => {
    if (!fileInput.files) return;
    fileList.innerHTML = "";
    for (const file of Array.from(fileInput.files)) {
      const li = document.createElement("li");
      li.textContent = file.name;
      fileList.appendChild(li);
    }
  };
}
