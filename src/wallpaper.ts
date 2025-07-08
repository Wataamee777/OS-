export function openWallpaperChanger() {
  const win = createWindow("壁紙変更", 400, 200);
  const content = win.querySelector(".window-content")!;
  content.innerHTML = `
    <input type="file" id="wallpaper-file" accept="image/*" />
    <p>選んだ画像を壁紙に設定します</p>
  `;

  const input = content.querySelector("#wallpaper-file") as HTMLInputElement;
  input.onchange = () => {
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      localStorage.setItem("wallpaper", url);
      (document.getElementById("desktop") as HTMLElement).style.backgroundImage = `url(${url})`;
    };
    reader.readAsDataURL(file);
  };

  // 既存の壁紙があれば読み込み
  const saved = localStorage.getItem("wallpaper");
  if (saved) {
    (document.getElementById("desktop") as HTMLElement).style.backgroundImage = `url(${saved})`;
  }
}
