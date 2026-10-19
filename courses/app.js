// Kurs tanlash: tanlangan kursni saqlab, tegishli dashboardga o'tkazadi.
document.querySelectorAll(".start-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const course = button.dataset.course;
    if (!["frontend", "backend"].includes(course)) return;
    localStorage.setItem("uchqun_selected_course", course);
    window.location.href = "../dashboard/index.html?course=" + encodeURIComponent(course);
  });
});

const notifBtn = document.getElementById("notifBtn");
if (notifBtn) notifBtn.addEventListener("click", () => alert("Sizda yangi bildirishnomalar yo'q."));
