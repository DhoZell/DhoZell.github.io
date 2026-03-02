document.addEventListener("DOMContentLoaded", () => {

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

  const sound = document.getElementById("click-sound");

  const ewalletInfo = {
    "dana":  { nomor: "085143279837", nama: "DhooZell" },
    "gopay": { nomor: "085143279837", nama: "DhooZell" },
    "ovo":   { nomor: "085143279837 ", nama: "DhooZell" },
  };

  const bankOptions = {
    BCA:     { norek: "1234567890", atas: "DhooZell" },
    BRI:     { norek: "0987654321", atas: "DhooZell" },
    Mandiri: { norek: "1122334455", atas: "DhooZell" },
    BNI:     { norek: "5566778899", atas: "DhooZell" },
    BSI:     { norek: "6677889900", atas: "DhooZell" },
  };

  function buatPopup(judul, isiHTML) {
    const existing = document.getElementById("pay-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "pay-modal";
    modal.style.cssText = `
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #0d0d1a;
      border: 2px solid #00ff88;
      border-radius: 12px;
      padding: 24px;
      z-index: 9999;
      min-width: 290px;
      text-align: center;
      font-family: monospace;
      color: white;
      box-shadow: 0 0 30px #00ff8844;
    `;

    modal.innerHTML = `
      <h3 style="margin-bottom:16px;color:#00ff88;letter-spacing:2px">${judul}</h3>
      ${isiHTML}
      <button onclick="document.getElementById('pay-modal').remove()" style="
        margin-top:16px;
        padding:10px 24px;
        background:#ff4466;
        border:none;
        border-radius:8px;
        color:white;
        cursor:pointer;
        font-family:monospace;
        font-size:13px;
      ">TUTUP</button>
    `;

    document.body.appendChild(modal);
  }

  window.copyTeks = function(teks, label) {
    navigator.clipboard.writeText(teks).then(() => {
      const toast = document.createElement("div");
      toast.textContent = `${label} berhasil dicopy!`;
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #00ff88;
        color: #000;
        padding: 10px 20px;
        border-radius: 8px;
        font-family: monospace;
        font-weight: bold;
        z-index: 99999;
        font-size: 13px;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    });
  }

  document.querySelectorAll(".links a").forEach(link => {
    const clone = link.cloneNode(true);
    clone.querySelectorAll("i").forEach(i => i.remove());
    const text = clone.textContent.trim().toLowerCase();

    link.addEventListener("click", () => {
      if (sound) { sound.currentTime = 0; sound.play(); }
    });

    if (ewalletInfo[text]) {
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const info = ewalletInfo[text];
        buatPopup(text.toUpperCase(), `
          <p style="font-size:18px;margin:8px 0">${info.nomor}</p>
          <p style="color:#aaa;margin-bottom:12px">a/n ${info.nama}</p>
          <button onclick="copyTeks('${info.nomor}','Nomor ${text}')" style="
            padding:10px 20px;
            background:#00ff88;
            border:none;
            border-radius:8px;
            color:#000;
            cursor:pointer;
            font-family:monospace;
            font-weight:bold;
          ">COPY NOMOR</button>
        `);
      });
    }

    if (text === "bank") {
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        let isi = "";
        for (const [bank, info] of Object.entries(bankOptions)) {
          isi += `
            <div onclick="copyTeks('${info.norek}','${bank} ${info.norek}')" style="
              margin:8px 0;
              padding:12px;
              background:#1a1a2e;
              border:1px solid #333;
              border-radius:8px;
              cursor:pointer;
            " onmouseover="this.style.borderColor='#00ff88';this.style.background='#0f2d1f'"
               onmouseout="this.style.borderColor='#333';this.style.background='#1a1a2e'">
              <b>${bank}</b><br>
              <small style="color:#aaa">${info.norek} a/n ${info.atas}</small><br>
              <small style="color:#555">klik untuk copy</small>
            </div>
          `;
        }
        buatPopup("PILIH BANK", isi);
      });
    }

    if (text === "pulsa") {
      link.href = "https://wa.me/+6287738441668?text=Halo+kak+mau+bayar+via+Pulsa";
      link.target = "_blank";
    }
  });

});