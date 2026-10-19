(() => {
  const params = new URLSearchParams(location.search);
  const course = params.get("course") || localStorage.getItem("uchqun_selected_course") || "frontend";
  const module = params.get("module") || (course === "backend" ? "python" : "html");
  localStorage.setItem("uchqun_selected_course", course);
  const backend = course === "backend";
  document.querySelectorAll(".dropdown-box span").forEach(el => el.textContent = backend ? "Backend Dasturlash" : "Frontend Dasturlash");
  const title = document.querySelector(".topics-header-section h2");
  const desc = document.querySelector(".topics-header-section p");
  const moduleNames = backend
    ? {python:"Python asoslari", django:"Django asoslari", api:"REST API va ma'lumotlar bazasi"}
    : {html:"HTML moduli mavzulari", css:"CSS moduli mavzulari", js:"JavaScript moduli mavzulari"};
  const moduleTitle = moduleNames[module] || (backend ? "Backend moduli mavzulari" : "Frontend moduli mavzulari");
  if (title) title.textContent = moduleTitle;
  if (desc) desc.textContent = backend
    ? "Backend dasturlash bo'yicha mavzularni ketma-ket o'rganing."
    : "Boshlang'ich veb-texnologiya asoslarini mustahkamlang.";

  if (backend) {
    const topics = module === "django"
      ? ["Django bilan tanishuv", "Loyiha va app tuzilishi", "Models va ORM", "Admin panel", "URL va Views", "Django REST Framework"]
      : module === "api"
      ? ["HTTP va REST API", "Serializerlar", "CRUD endpointlar", "Autentifikatsiya", "Ruxsatlar va validatsiya", "API testlash"]
      : ["Python bilan tanishuv", "O'zgaruvchilar va ma'lumot turlari", "Shart operatorlari", "Sikllar", "Funksiyalar", "List va Dictionary"];
    const cards = [...document.querySelectorAll(".topic-card")];
    cards.forEach((card, i) => {
      const heading = card.querySelector(".topic-info h4");
      if (heading && topics[i]) heading.textContent = topics[i];
      else if (heading) card.style.display = "none";
      const badge = card.querySelector(".status-badge");
      if (badge && badge.textContent.trim() === "TUGALLANGAN") badge.textContent = "O'RGANILMAGAN";
    });
  }

  const searchInput = document.querySelector(".search-box input");
  const topicCards = [...document.querySelectorAll(".topic-card")];
  if (searchInput) searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    topicCards.forEach(card => {
      const h = card.querySelector(".topic-info h4");
      card.style.display = h && h.textContent.toLowerCase().includes(q) ? "flex" : "none";
    });
  });
  topicCards.forEach(card => card.addEventListener("click", () => {
    const badge = card.querySelector(".status-badge");
    if (badge && (badge.classList.contains("locked") || badge.textContent.trim() === "YOPIQ")) {
      alert("Ushbu mavzu hozircha yopiq! Avval oldingi mavzularni yakunlang."); return;
    }
    const heading = card.querySelector(".topic-info h4");
    location.href = "../post/index.html?course=" + course + "&module=" + module + "&topic=" + encodeURIComponent(heading?.textContent.trim() || "");
  }));
  const notifBtn = document.querySelector(".notif-btn");
  if (notifBtn) notifBtn.addEventListener("click", () => alert("Sizda yangi bildirishnomalar mavjud emas."));
})();
