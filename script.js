const container = document.getElementById("container");
const viewer = document.getElementById("viewer");
const imgs = container.querySelectorAll("img");

let startX = 0;
let offsetX = 0;
let dragging = false;

let imgW = 0;
let spacing = 0;
let maxOffset = 0;
let minOffset = 0;

function updateValues() {
  imgW = imgs[0].clientWidth;
  spacing = parseInt(getComputedStyle(imgs[0]).marginLeft) + parseInt(getComputedStyle(imgs[0]).marginRight);
  const totalWidth = imgs.length * (imgW + spacing);
  const viewerWidth = viewer.clientWidth;

  // 右端に来たとき、左の画像は半分見切れるように調整
  minOffset = Math.min(viewerWidth - totalWidth + (imgW/2 + spacing/2), 0);
  maxOffset = 0;
}

window.addEventListener("resize", () => {
  updateValues();
  offsetX = Math.max(minOffset, Math.min(maxOffset, offsetX));
  container.style.transform = `translateX(${offsetX}px)`;
});

updateValues();

// ============================
// ドラッグ
// ============================
container.addEventListener("touchstart", e => {
  dragging = true;
  startX = e.touches[0].clientX;
  container.style.transition = "none";
});

container.addEventListener("touchmove", e => {
  if(!dragging) return;
  const dx = e.touches[0].clientX - startX;
  offsetX += dx;

  offsetX = Math.max(minOffset, Math.min(maxOffset, offsetX));

  container.style.transform = `translateX(${offsetX}px)`;
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", e => {
  dragging = false;
  container.style.transition = "transform 0.2s ease";
});