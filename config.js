// إعدادات متجر سيليا أوازيس — كل تبديل هنا (الأثمنة، المنتوجات، الرابط ديال الشيت)
window.STORE = {
  // رابط Apps Script ديال شيت الطلبات (Deploy ← Web app)
  SHEET_URL: "__SHEET_URL__",
  WHATSAPP: "212698723448",
  PHONE_DISPLAY: "0698723448",
  ADDRESS: "تنغير - شارع محمد الخامس",
  CATEGORIES: [
    { id: "incub", name: "الفقاسات والتفقيس", icon: "🥚" },
    { id: "water", name: "الشرابات والوكالات", icon: "💧" },
    { id: "heat", name: "التسخين والتهوية", icon: "🔥" },
    { id: "feed", name: "الأعلاف", icon: "🌾" },
    { id: "tools", name: "ماتيريال الكوري", icon: "🧰" },
    { id: "birds", name: "الحمام والطيور", icon: "🕊️" },
    { id: "cats", name: "القطط", icon: "🐱" }
  ],
  // price: null = الثمن كيتعطى فالتيليفون / الواتساب
  PRODUCTS: [
    { id: "p11", cat: "incub", name: "فقاسة 64 بيضة", price: 1250, top: true },
    { id: "p12", cat: "incub", name: "فقاسة 36 بيضة", price: 950, top: true },
    { id: "p14", cat: "incub", name: "فقاسات الأمان — جميع الأحجام", price: null, top: true },
    { id: "p00", cat: "incub", name: "مقياس الحرارة للفقاسة", price: 190 },
    { id: "p01", cat: "incub", name: "جهاز الرطوبة", price: 70 },
    { id: "p29", cat: "incub", name: "مقياس الرطوبة والحرارة مع الساعة", price: 75 },
    { id: "p31", cat: "incub", name: "مقياس الحرارة (جهاز)", price: 90 },
    { id: "p24", cat: "incub", name: "مقياس الحرارة", price: 30 },
    { id: "p39", cat: "incub", name: "جهاز التحكم ZL-7918A", price: null },
    { id: "p34", cat: "incub", name: "محرك الفقاسة", price: 180 },
    { id: "p04", cat: "incub", name: "الريزيستونس", price: null },
    { id: "p05", cat: "incub", name: "بلاطو التفقيس 88 بيضة", price: 30 },
    { id: "p28", cat: "incub", name: "بلاطو بيض بلاستيك", price: 13 },
    { id: "p18", cat: "incub", name: "صندوق التفقيس", price: 50 },

    { id: "p08", cat: "water", name: "الشرابات أوطوماتيك", price: 7, top: true },
    { id: "p26", cat: "water", name: "شرابة أوطوماتيك 2 متر", price: 200 },
    { id: "p23", cat: "water", name: "شرابة 6 لتر", price: 48 },
    { id: "p42", cat: "water", name: "الشرابة 7 لتر", price: null },
    { id: "p32", cat: "water", name: "وكالة 8 كيلو", price: 80, top: true },
    { id: "p37", cat: "water", name: "وكالة 10 كيلو سطل", price: 75 },
    { id: "p41", cat: "water", name: "الوكالات والشرابات", price: null },
    { id: "p30", cat: "water", name: "الفلوتور (عوامة الشرابة)", price: 28 },
    { id: "p38", cat: "water", name: "رابط الأنابيب", price: null },

    { id: "p25", cat: "heat", name: "مصباح التسخين", price: 60, top: true },
    { id: "p33", cat: "heat", name: "الشوفو الصغير", price: 120 },
    { id: "p17", cat: "heat", name: "الشوفاج التركي", price: 500 },
    { id: "p06", cat: "heat", name: "سخان كهربائي فوري", price: 250 },
    { id: "p03", cat: "heat", name: "مروحة التهوية 15 سنتم", price: 180 },
    { id: "p19", cat: "heat", name: "رشاشات تركية", price: 35 },
    { id: "p36", cat: "heat", name: "فلطاج الحضانة", price: 13 },

    { id: "p45", cat: "feed", name: "علف بيض الدجاج", price: null, top: true },
    { id: "p46", cat: "feed", name: "الديماراج", price: null },
    { id: "p47", cat: "feed", name: "الكروكيت", price: null },
    { id: "p48", cat: "feed", name: "الرياشة", price: null },
    { id: "p40", cat: "feed", name: "الأزولا", price: null },
    { id: "p54", cat: "feed", name: "شعير", price: null },
    { id: "p55", cat: "feed", name: "نخالة", price: null },

    { id: "p02", cat: "tools", name: "ميزان 50 كيلو", price: 50 },
    { id: "p07", cat: "tools", name: "صندوق نقل الدجاج", price: 250 },
    { id: "p13", cat: "tools", name: "put", price: 6 },
    { id: "p15", cat: "tools", name: "diana", price: 11 },

    { id: "p20", cat: "birds", name: "قفص الحمام", price: 200 },
    { id: "p27", cat: "birds", name: "قفص الطيور", price: 110 },
    { id: "p44", cat: "birds", name: "شرابة الحمام", price: null },
    { id: "p21", cat: "birds", name: "صفارة الحمام", price: 20 },
    { id: "p22", cat: "birds", name: "حلقات رجلين الحمام", price: 2 },
    { id: "p51", cat: "birds", name: "ميلونج الحمام", price: null },
    { id: "p49", cat: "birds", name: "ميلونج الطيور (ليزانسيبارابل)", price: null },
    { id: "p53", cat: "birds", name: "ماكلة الكالوبسيت", price: null },
    { id: "p50", cat: "birds", name: "زوان باشنا", price: null },
    { id: "p52", cat: "birds", name: "زوان الطويل", price: null },

    { id: "p10", cat: "cats", name: "بيت القطط", price: 110 },
    { id: "p09", cat: "cats", name: "قفص نقل القطط", price: 75 },
    { id: "p16", cat: "cats", name: "رضاعة صغار القطط", price: 40 },
    { id: "p35", cat: "cats", name: "قلادة القطط (طوق العنق)", price: 14 },
    { id: "p43", cat: "cats", name: "ماكلة القطط المفضلة", price: null }
  ]
};
