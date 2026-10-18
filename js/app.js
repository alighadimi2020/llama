/* فقط نمایش/مخفی کردن صفحه‌ها بر اساس آدرس (#/cafe/coffee ...).
   همه محتوا در index.html است؛ برای تغییر متن‌ها همان‌جا را ویرایش کنید. */
(function () {
  "use strict";
  var views = document.querySelectorAll(".view");

  /* عکس‌هایی که فایلشان نیست: عکس حذف می‌شود و قاب سبز یا جمع می‌شود */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t.tagName !== "IMG") return;
    var f = t.closest(".ph"); if (f) f.classList.add("is-empty");
    t.remove();
  }, true);

  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    var id = parts[0] === "cafe" ? (parts[1] ? "cafe/" + parts[1] : "cafe") : parts[0];
    var target = null;
    Array.prototype.forEach.call(views, function (v) { if (v.id === id) target = v; });
    if (!target) target = document.getElementById("home");
    Array.prototype.forEach.call(views, function (v) { v.hidden = v !== target; });
    document.body.classList.toggle("is-home", target.hasAttribute("data-home"));
    document.title = target.getAttribute("data-title");
    window.scrollTo(0, 0);
    var on = target.querySelector(".chip.is-on");
    if (on) on.scrollIntoView({ inline: "center", block: "nearest" });
  }
  window.addEventListener("hashchange", route);
  route();
})();
