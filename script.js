const book = document.querySelector(".book");

window.addEventListener("deviceorientation", (e) => {
  const x = e.gamma || 0; // 左右
  const y = e.beta || 0;  // 前後

  const rotateY = x * 0.2;
  const rotateX = y * 0.1;

  book.style.transform = `
    rotateX(${-rotateX}deg)
    rotateY(${rotateY}deg)
  `;
});