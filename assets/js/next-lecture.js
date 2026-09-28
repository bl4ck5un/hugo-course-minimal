(() => {
  "use strict";
  const button = document.getElementById("next-lecture-button");
  if (!button) return;
  const lectures = Array.from(document.querySelectorAll("[data-lecture-date]"))
    .filter(item => !item.dataset.noClass && /^\d{4}-\d{2}-\d{2}$/.test(item.dataset.lectureDate))
    .sort((a, b) => a.dataset.lectureDate.localeCompare(b.dataset.lectureDate));

  function update() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: button.dataset.timeZone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    const value = type => parts.find(part => part.type === type).value;
    const today = `${value("year")}-${value("month")}-${value("day")}`;
    const time = `${value("hour")}:${value("minute")}`;
    const endTime = button.dataset.endTime || "24:00";
    const completed = item => item.dataset.lectureDate < today ||
      (item.dataset.lectureDate === today && time >= endTime);
    lectures.forEach(item => {
      item.classList.toggle("lecture-completed", completed(item));
    });
    // Keep today's lecture available until class ends in the course timezone.
    const next = lectures.find(item => !completed(item));
    button.hidden = !next;
    if (!next) return;
    button.href = `#${next.id}`;
    button.querySelector("[data-next-lecture-label]").textContent = `Next lecture · L${next.dataset.lectureNumber}`;
    button.title = next.querySelector("h4").textContent;
  }

  button.addEventListener("click", event => {
    update();
    if (button.hidden) return;
    const target = document.getElementById(button.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    target.focus({preventScroll: true});
    target.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start"});
    history.replaceState(null, "", button.hash);
  });
  update();
  window.addEventListener("pageshow", update);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) update(); });
  setInterval(update, 60000);
})();
