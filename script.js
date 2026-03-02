// === Pixel Bintang Background ===
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let stars = Array(200).fill().map(() => ({
  x: Math.random() * w,
  y: Math.random() * h,
  size: Math.random() * 1.5 + 0.5,
  speed: Math.random() * 0.5 + 0.2
}));

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff11";
  for (let s of stars) {
    ctx.fillRect(s.x, s.y, s.size, s.size);
    s.y += s.speed;
    if (s.y > h) s.y = 0;
  }
  requestAnimationFrame(drawStars);
}
drawStars();

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// === Suara klik jika diaktifkan ===
const sound = document.getElementById("click-sound");
document.querySelectorAll(".links a").forEach(link => {
  link.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play();
  });
});