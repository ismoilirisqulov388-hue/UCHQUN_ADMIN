(() => {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("course");
  if (["frontend", "backend"].includes(fromUrl)) {
    localStorage.setItem("uchqun_selected_course", fromUrl);
  }
  const course = localStorage.getItem("uchqun_selected_course") || "frontend";
  const isBackend = course === "backend";

  const courseLabel = isBackend ? "Backend Dasturlash" : "Frontend Dasturlash";
  document.querySelectorAll(".dropdown-box span").forEach(el => el.textContent = courseLabel);
  const heading = document.querySelector(".modules-header h3");
  const intro = document.querySelector(".modules-header p");
  if (heading) heading.textContent = isBackend ? "Backend moduli mavzulari" : "Frontend moduli mavzulari";
  if (intro) intro.textContent = isBackend
    ? "Server, API va ma'lumotlar bazasi bilan ishlashni bosqichma-bosqich o'rganing."
    : "Siz ushbu bosqichda quyidagi modullarni o'zlashtirishingiz lozim.";

  const modules = isBackend ? [
    ["Python asoslari", "12 dars", "24 mavzu", "100%", "TUGALLANDI", "completed"],
    ["Django asoslari", "18 dars", "36 mavzu", "65%", "FAOLLASHGAN", "active-card"],
    ["REST API va ma'lumotlar bazasi", "24 dars", "48 mavzu", "15%", "FAOLLASHGAN", "active-card"]
  ] : [
    ["HTML Asoslari", "12 dars", "24 mavzu", "100%", "TUGALLANDI", "completed"],
    ["CSS Visual Dizayn", "18 dars", "36 mavzu", "65%", "FAOLLASHGAN", "active-card"],
    ["JavaScript Dasturlash", "24 dars", "48 mavzu", "15%", "FAOLLASHGAN", "active-card"]
  ];
  document.querySelectorAll(".module-card").forEach((card, i) => {
    const item = modules[i];
    if (!item) return;
    const title = card.querySelector("h4");
    if (title) title.textContent = item[0];
    const badge = card.querySelector(".badge");
    if (badge) { badge.textContent = item[4]; badge.className = "badge " + item[5]; }
    const stats = card.querySelectorAll(".card-stats span");
    if (stats[0]) stats[0].innerHTML = '<i class="fa-solid fa-book"></i> ' + item[1];
    if (stats[1]) stats[1].innerHTML = '<i class="fa-solid fa-hashtag"></i> ' + item[2];
    const percent = card.querySelector(".percent");
    if (percent) percent.textContent = item[3];
    const fill = card.querySelector(".progress-fill");
    if (fill) fill.style.width = item[3];
    const btn = card.querySelector(".card-btn");
    if (btn) btn.dataset.module = isBackend ? ["python", "django", "api"][i] : ["html", "css", "js"][i];
  });

  document.querySelectorAll(".card-btn").forEach(button => button.addEventListener("click", () => {
    const module = button.dataset.module || (isBackend ? "python" : "html");
    window.location.href = "../topic/index.html?course=" + course + "&module=" + module;
  }));
  const uploadBtn = document.querySelector(".upload-btn");
  if (uploadBtn) uploadBtn.addEventListener("click", () => alert("Topshiriq yuklash bo'limi keyingi bosqichda ulanadi."));
  const notifBtn = document.querySelector(".notif-btn");
  if (notifBtn) notifBtn.addEventListener("click", () => alert("Sizda yangi bildirishnomalar mavjud emas."));
  document.querySelectorAll(".sidebar-menu .menu-item").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const text = item.querySelector("span")?.textContent.trim();
      if (text === "Mening darslarim") window.location.href = "../dashboard/index.html?course=" + course;
      else if (text === "Topshiriqlar") alert("Topshiriqlar bo'limi hali ulanmagan.");
      else if (text === "Reyting") alert("Reyting bo'limi hali ulanmagan.");
      else if (text === "Muloqot markazi") alert("Muloqot markazi hali ulanmagan.");
      else if (text === "Mening profilim") alert("Profil bo'limi hali ulanmagan.");
    });
  });
})();
