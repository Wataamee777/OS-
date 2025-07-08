import { openTerminal } from "./terminal";
import { openBrowser } from "./browser";
import { openWallpaperChanger } from "./wallpaper";
import { openMusicPlayer } from "./music";
import { openFileManager } from "./filemanager";
import { openCalendar } from "./calendar";
import { openDrawing } from "./draw";
import { openLockScreen } from "./lock";
import { openBIOS } from "./bios";

const startButton = document.getElementById("start-button")!;
const startMenu = document.getElementById("start-menu")!;
const desktop = document.getElementById("desktop")!;

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

startMenu.querySelector("ul")!.innerHTML = `
  <li onclick="openTerminal()">ターミナル</li>
  <li onclick="openBrowser()">ブラウザ</li>
  <li onclick="openWallpaperChanger()">壁紙変更</li>
  <li onclick="openMusicPlayer()">音楽プレイヤー</li>
  <li onclick="openFileManager()">ファイルマネージャー</li>
  <li onclick="openCalendar()">カレンダー</li>
  <li onclick="openDrawing()">お絵描き</li>
  <li onclick="openLockScreen()">ロック画面</li>
  <li onclick="openBIOS()">BIOS</li>
`;

// グローバルに展開してonclickから呼べるようにする
(window as any).openTerminal = openTerminal;
(window as any).openBrowser = openBrowser;
(window as any).openWallpaperChanger = openWallpaperChanger;
(window as any).openMusicPlayer = openMusicPlayer;
(window as any).openFileManager = openFileManager;
(window as any).openCalendar = openCalendar;
(window as any).openDrawing = openDrawing;
(window as any).openLockScreen = openLockScreen;
(window as any).openBIOS = openBIOS;
