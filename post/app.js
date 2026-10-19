(() => {
  const params = new URLSearchParams(location.search);
  const course = params.get("course") || localStorage.getItem("uchqun_selected_course") || "frontend";
  const backend = course === "backend";
  const module = params.get("module") || (backend ? "python" : "html");
  const topic = params.get("topic");
  document.querySelectorAll(".dropdown-box span").forEach(el => el.textContent = backend ? "Backend Dasturlash" : "Frontend Dasturlash");
  const crumb = document.querySelector(".breadcrumb");
  if (crumb && backend) {
    const spans = crumb.querySelectorAll("span");
    if (spans[0]) spans[0].textContent = module === "django" ? "Django moduli" : module === "api" ? "REST API moduli" : "Python moduli";
    if (spans[1]) spans[1].textContent = topic || "Backend darsi";
    const heading = document.querySelector(".pres-title-box h3");
    if (heading) heading.textContent = "Dars prezentatsiyasi: " + (topic || "Backend asoslari");
    const slideHeading = document.querySelector(".slide-content h2");
    if (slideHeading) slideHeading.textContent = topic || "Backend dasturlash asoslari";
    const slideText = document.querySelector(".slide-content p");
    if (slideText) slideText.textContent = "Ushbu darsda " + (topic || "backend dasturlash") + " mavzusining asosiy tushunchalari va amaliy qo'llanilishi bilan tanishasiz.";
    document.querySelectorAll(".test-btn").forEach(btn => btn.dataset.course = course);
  } else if (topic) {
    const spans = document.querySelectorAll(".breadcrumb span");
    if (spans[1]) spans[1].textContent = topic;
  }
  document.querySelectorAll(".test-btn").forEach((btn, index) => btn.addEventListener("click", () => {
    location.href = "../test/index.html?course=" + course + "&module=" + module + "&question=" + (index + 1);
  }));
  const uploadTaskBtn = document.getElementById("uploadTaskBtn");
  if (uploadTaskBtn) uploadTaskBtn.addEventListener("click", () => alert("Topshiriq yuklash formasi keyingi bosqichda ulanadi."));
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const slideContainer = document.querySelector(".slide-container");
  if (fullscreenBtn && slideContainer) fullscreenBtn.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) await slideContainer.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) { alert("To'liq ekran rejimini yoqib bo'lmadi: " + err.message); }
  });
})();
