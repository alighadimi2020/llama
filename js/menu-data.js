/* LLAMA CAFE menu data. Edit here only; the layout reads from this file.
   price: number as printed on the original menu (null = hide price).
   showImage: set true on a product to show its photo (default false). */
window.MENU = {
  CATEGORIES: [
    { id: "fast-food", section: "fast-food", en: "FAST FOOD", fa: "فست فود", image: "assets/images/fast-food-category.jpg" },
    { id: "coffee", section: "cafe", en: "COFFEE", fa: "قهوه", image: "assets/images/coffee-category.jpg" },
    { id: "ice-coffee", section: "cafe", en: "ICE COFFEE", fa: "قهوه سرد", image: "assets/images/iced-coffee-category.jpg" },
    { id: "special", section: "cafe", en: "SPECIAL", fa: "نوشیدنی‌های ویژه", image: "assets/images/special-drinks-category.jpg" },
    { id: "tea", section: "cafe", en: "TEA", fa: "چای", image: "assets/images/tea-category.jpg" }
  ],
  HERO: { cafe: "assets/images/cafe-hero.jpg", fastFood: "assets/images/fast-food-category.jpg" },
  PRODUCTS: (function () {
    const p = (id, nameFa, nameEn, price, category, image) => ({
      id, nameFa, nameEn, descriptionFa: "", price, category,
      image: "assets/images/" + (image || id) + ".jpg", showImage: false
    });
    return [
      p("espresso", "اسپرسو", "Espresso", 150, "coffee"),
      p("americano", "امریکانو", "Americano", 150, "coffee"),
      p("cappuccino", "کاپوچینو", "Cappuccino", 180, "coffee"),
      p("latte", "لاته", "Latte", 210, "coffee"),
      p("caramel-macchiato", "کارامل ماکیاتو", "Caramel Macchiato", 240, "coffee"),
      p("mocha", "موکا", "Mocha", 240, "coffee"),
      p("hazelnut-latte", "لاته فندق", "Hazelnut Latte", 230, "coffee"),

      p("iced-americano", "آیس امریکانو", "Iced Americano", 160, "ice-coffee"),
      p("iced-latte", "آیس لاته", "Iced Latte", 220, "ice-coffee"),
      p("iced-caramel", "آیس کارامل", "Iced Caramel", 250, "ice-coffee", "iced-caramel-macchiato"),
      p("iced-mocha", "آیس موکا", "Iced Mocha", 250, "ice-coffee"),
      p("iced-matcha-mento", "آیس ماچا منتو", "", 270, "ice-coffee"),
      p("iced-matcha-berry", "آیس ماچا بری", "Iced Matcha Berry", 280, "ice-coffee"),
      p("iced-matcha-vanilla", "آیس ماچا وانیل", "Iced Matcha Vanilla", 280, "ice-coffee"),
      p("iced-hazelnut-latte", "آیس لاته فندق", "Iced Hazelnut Latte", 240, "ice-coffee"),

      p("matcha", "ماچا", "Matcha", 230, "special", "matcha-latte"),
      p("matcha-mento", "ماچا منتو", "", 260, "special"),
      p("matcha-berry", "ماچا بری", "Matcha Berry", 270, "special"),
      p("matcha-vanilla", "ماچا وانیل", "Matcha Vanilla", 270, "special"),
      p("hot-chocolate", "هات چاکلت", "Hot Chocolate", 190, "special"),
      p("white-chocolate", "وانت چاکلت", "", 180, "special"),
      p("pink-chocolate", "پینک چاکلت", "Pink Chocolate", 180, "special"),

      p("plain-tea", "چای ساده", "Tea", 60, "tea", "black-tea"),
      p("karak-tea", "چای کرک", "Karak Tea", 190, "tea"),
      p("chai-masala", "چای ماسالا", "Chai Masala", 190, "tea")
      /* Fast food: no verified items yet. Add with category "fast-food". */
    ];
  })()
};
