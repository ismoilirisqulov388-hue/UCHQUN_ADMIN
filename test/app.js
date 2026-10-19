(() => {
  const params = new URLSearchParams(location.search);
  const course = params.get("course") || localStorage.getItem("uchqun_selected_course") || "frontend";
  const question = Math.max(1, Number(params.get("question")) || 1);
  if (course === "backend") {
    const category = document.querySelector(".category-title");
    const heading = document.querySelector(".question-card h2");
    if (category) category.textContent = "BACKEND ASOSLARI";
    if (heading) heading.textContent = "Django loyihasida ma'lumotlar bazasi modellari qaysi vazifani bajaradi?";
    const options = document.querySelectorAll(".option-text");
    ["Sahifa ranglarini belgilaydi", "Ma'lumotlar tuzilishini va jadvallar bilan bog'lanishni ifodalaydi", "Brauzerni yangilaydi", "Rasm o'lchamini o'zgartiradi"].forEach((t,i)=>{if(options[i]) options[i].textContent=t;});
  }
  const counter = document.querySelector(".question-counter");
  if (counter) counter.textContent = "Savol: " + question + " / 10";
  const optionItems = [...document.querySelectorAll(".option-item")];
  optionItems.forEach(item => item.addEventListener("click", () => {
    optionItems.forEach(opt => {
      opt.classList.remove("selected");
      opt.querySelector(".option-letter")?.classList.remove("orange");
    });
    item.classList.add("selected");
    item.querySelector(".option-letter")?.classList.add("orange");
    const input = item.querySelector("input"); if (input) input.checked = true;
  }));
  const go = n => {
    if (n < 1) return;
    if (n > 10) { alert("Test yakunlandi!"); location.href = "../dashboard/index.html?course=" + course; return; }
    location.href = "index.html?course=" + course + "&module=" + (params.get("module") || "") + "&question=" + n;
  };
  document.getElementById("nextBtn")?.addEventListener("click", () => go(question + 1));
  document.getElementById("prevBtn")?.addEventListener("click", () => go(question - 1));
  document.getElementById("skipBtn")?.addEventListener("click", () => go(question + 1));
})();
