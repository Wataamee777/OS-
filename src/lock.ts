export function openLockScreen() {
  const lockDiv = document.createElement("div");
  lockDiv.id = "lock-screen";
  lockDiv.style.position = "fixed";
  lockDiv.style.top = "0";
  lockDiv.style.left = "0";
  lockDiv.style.width = "100vw";
  lockDiv.style.height = "100vh";
  lockDiv.style.backgroundColor = "rgba(0,0,0,0.85)";
  lockDiv.style.color = "white";
  lockDiv.style.display = "flex";
  lockDiv.style.flexDirection = "column";
  lockDiv.style.justifyContent = "center";
  lockDiv.style.alignItems = "center";
  lockDiv.style.zIndex = "9999";

  lockDiv.innerHTML = `
    <h1>ロック中</h1>
    <input type="password" id="lock-password" placeholder="パスワード入力" style="padding: 10px; font-size: 18px;" />
    <button id="unlock-btn" style="margin-top: 10px; padding: 10px 20px;">解除</button>
    <p id="lock-message" style="color: red; margin-top: 10px;"></p>
  `;

  document.body.appendChild(lockDiv);

  const pwdInput = lockDiv.querySelector("#lock-password") as HTMLInputElement;
  const unlockBtn = lockDiv.querySelector("#unlock-btn") as HTMLButtonElement;
  const msg = lockDiv.querySelector("#lock-message") as HTMLParagraphElement;

  const correctPassword = "1234";

  unlockBtn.onclick = () => {
    if (pwdInput.value === correctPassword) {
      document.body.removeChild(lockDiv);
    } else {
      msg.textContent = "パスワードが違います！";
      pwdInput.value = "";
    }
  };
}
