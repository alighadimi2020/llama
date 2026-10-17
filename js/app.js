(function () {
  "use strict";
  var M = window.MENU, app = document.getElementById("app");
  var cat = function (id) { return M.CATEGORIES.filter(function (c) { return c.id === id; })[0]; };
  var fmt = function (n) { return Number(n).toLocaleString("fa-IR", { useGrouping: false }); };
  var img = function (src, alt, eager) {
    return '<img src="' + src + '" alt="' + alt + '" ' +
      (eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"') + '>';
  };
  var svg = function (d) {
    return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  };
  var BACK = svg("M9 5l7 7-7 7"), HOME = svg("M4 11l8-7 8 7M6 10v10h12V10");

  /* Missing photos never show a broken icon: the image is removed and its frame collapses or falls back to green. */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t.tagName !== "IMG") return;
    var f = t.closest(".ph"); if (f) f.classList.add("is-empty");
    t.remove();
  }, true);

  function bar(back, en, fa) {
    return '<header class="bar"><a class="bar__btn" href="' + back + '" aria-label="بازگشت">' + BACK + '</a>' +
      '<span class="bar__title"><b>' + en + '</b> ' + fa + '</span>' +
      '<a class="bar__btn" href="#/" aria-label="منوی اصلی">' + HOME + '</a></header>';
  }

  function homeView() {
    var card = function (href, en, fa, src) {
      return '<a class="entry ph" href="' + href + '">' + img(src, fa + " — LLAMA CAFE", true) +
        '<span class="entry__txt"><span class="entry__en">' + en + '</span><span class="entry__fa">' + fa + '</span></span></a>';
    };
    return '<section class="home">' +
      '<svg class="home__leaf" viewBox="0 0 120 160" aria-hidden="true"><g fill="none" stroke="#B89455" stroke-width="1.2" stroke-linecap="round"><path d="M60 158C60 110 62 60 90 6"/><path d="M61 120c-22-4-34-18-36-34 20 2 34 14 36 34zM63 92c20-6 30-20 30-36-20 4-30 16-30 36zM68 62c-16-8-24-20-24-34 16 6 24 18 24 34z"/></g></svg>' +
      '<header class="home__brand"><img class="home__logo" src="./logo.png" alt="LLAMA CAFE"><i class="rule"></i></header>' +
      '<nav class="home__cards" aria-label="منو">' +
      card("#/fast-food", "FAST FOOD", "فست فود", M.HERO.fastFood) +
      card("#/cafe", "CAFE", "کافه", M.HERO.cafe) + '</nav></section>';
  }

  function cafeView() {
    var cards = M.CATEGORIES.filter(function (c) { return c.section === "cafe"; }).map(function (c) {
      return '<a class="tile ph" href="#/cafe/' + c.id + '">' + img(c.image, c.fa + " — LLAMA CAFE") +
        '<span class="tile__txt"><span class="tile__en">' + c.en + '</span><span class="tile__fa">' + c.fa + '</span></span>' +
        '<span class="tile__go" aria-hidden="true">' + BACK + '</span></a>';
    }).join("");
    return bar("#/", "CAFE", "کافه") +
      '<section class="pad"><div class="head"><h1 class="head__en">Cafe Menu</h1><p class="head__fa">یک دسته را انتخاب کنید</p><i class="rule"></i></div>' +
      '<div class="tiles">' + cards + '</div></section>';
  }

  function row(p) {
    return '<li class="item">' +
      (p.showImage ? '<span class="thumb ph">' + img(p.image, p.nameFa) + '</span>' : "") +
      '<div class="item__txt"><span class="item__fa">' + p.nameFa + '</span>' +
      (p.nameEn ? '<span class="item__en">' + p.nameEn + '</span>' : "") +
      (p.descriptionFa ? '<span class="item__desc">' + p.descriptionFa + '</span>' : "") + '</div>' +
      (p.price != null ? '<span class="item__dots"></span><span class="item__price">' + fmt(p.price) + '</span>' : "") + '</li>';
  }

  function listView(c) {
    var cafe = c.section === "cafe";
    var items = M.PRODUCTS.filter(function (p) { return p.category === c.id; });
    var chips = cafe ? '<nav class="chips" aria-label="دسته‌ها">' +
      M.CATEGORIES.filter(function (x) { return x.section === "cafe"; }).map(function (x) {
        return '<a class="chip' + (x.id === c.id ? ' is-on" aria-current="page' : "") + '" href="#/cafe/' + x.id + '">' + x.fa + '</a>';
      }).join("") + '</nav>' : "";
    return bar(cafe ? "#/cafe" : "#/", cafe ? "CAFE" : "FAST FOOD", cafe ? "کافه" : "فست فود") + chips +
      '<div class="banner ph">' + img(c.image, c.fa + " — LLAMA CAFE", true) + '</div>' +
      '<section class="pad"><div class="head"><h1 class="head__en">' + c.en + '</h1><p class="head__fa">' + c.fa + '</p><i class="rule"></i></div>' +
      (items.length ? '<ul class="items">' + items.map(row).join("") + '</ul>'
        : '<p class="empty">منوی این بخش به‌زودی اضافه می‌شود.</p>') + '</section>';
  }

  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/"), a = parts[0], b = parts[1];
    var c = a === "cafe" ? (b ? cat(b) : null) : cat(a), html, home = false, title = "LLAMA CAFE | منو";
    if (a === "cafe" && !b) { html = cafeView(); title = "کافه | LLAMA CAFE"; }
    else if (c) { html = listView(c); title = c.fa + " | LLAMA CAFE"; }
    else { html = homeView(); home = true; }
    document.body.classList.toggle("is-home", home);
    document.title = title;
    app.innerHTML = html;
    window.scrollTo(0, 0);
    var on = app.querySelector(".chip.is-on");
    if (on) on.scrollIntoView({ inline: "center", block: "nearest" });
  }

  window.addEventListener("hashchange", route);
  route();
})();
