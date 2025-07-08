import { createWindow } from "./window";

export function openCalendar() {
  const win = createWindow("カレンダー", 400, 300);
  const content = win.querySelector(".window-content")!;
  content.innerHTML = `<div id="calendar"></div>`;

  const calendar = content.querySelector("#calendar")!;
  calendar.style.fontFamily = "sans-serif";
  calendar.style.userSelect = "none";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekDay = firstDay.getDay();

  let html = `<h3>${year}年 ${month + 1}月</h3>`;
  html += "<table style='width: 100%; border-collapse: collapse; text-align: center;'>";
  html += "<tr><th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th></tr><tr>";

  for (let i = 0; i < startWeekDay; i++) {
    html += "<td></td>";
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const isToday = d === now.getDate();
    html += `<td style="padding:5px; ${isToday ? "background:#0078d7; color:white;" : ""}">${d}</td>`;
    if ((d + startWeekDay) % 7 === 0 && d !== lastDay.getDate()) {
      html += "</tr><tr>";
    }
  }

  html += "</tr></table>";

  calendar.innerHTML = html;
}
