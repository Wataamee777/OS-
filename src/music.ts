import { createWindow } from "./window";

export function openMusicPlayer() {
  const win = createWindow("音楽プレイヤー", 400, 150);
  const content = win.querySelector(".window-content")!;
  content.innerHTML = `
    <audio id="audio-player" controls style="width: 100%;">
      <source src="assets/music.mp3" type="audio/mpeg">
      お使いのブラウザはaudio要素に対応していません。
    </audio>
  `;
}
