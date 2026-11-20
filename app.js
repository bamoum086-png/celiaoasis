(function () {
  var S = window.STORE, P = S.PRODUCTS;
  var byId = {}; P.forEach(function (p) { byId[p.id] = p; });
  var cart = load();
  var cur = "all";
  var $ = function (id) { return document.getElementById(id); };
  var waBase = "https://wa.me/" + S.WHATSAPP + "?text=";

  $("addr").textContent = S.ADDRESS;
  $("tel").textContent = S.PHONE_DISPLAY; $("tel").href = "tel:" + S.PHONE_DISPLAY;
  $("wa").href = waBase + encodeURIComponent("السلام، بغيت نسول على منتوج من المتجر ديال سيليا أوازيس");

  function load() { try { return JSON.parse(localStorage.getItem("co_cart") || "{}"); } catch (e) { return {}; } }
  function save() { try { localStorage.setItem("co_cart", JSON.stringify(cart)); } catch (e) {} }
  function img(p) { return "img/" + p.id + ".jpg"; }
  function money(n) { return n.toLocaleString("fr-MA") + " درهم"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // الأصناف
  var cats = [{ id: "all", name: "الكل", icon: "⭐" }].concat(S.CATEGORIES);
  $("cats").innerHTML = cats.map(function (c) {
    return '<button data-c="' + c.id + '"' + (c.id === cur ? ' class="on"' : "") + ">" + c.icon + " " + c.name + "</button>";
  }).join("");
  $("cats").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    cur = b.dataset.c; $("q").value = "";
    [].forEach.call($("cats").children, function (x) { x.classList.toggle("on", x === b); });
    render();
    var t = cur === "all" ? $("list") : document.getElementById("sec-" + cur);
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: "smooth" });
  });
  $("q").addEventListener("input", render);

  function card(p) {
    var q = cart[p.id] || 0;
    return '<div class="card"><div class="ph">' +
      '<img loading="lazy" src="' + img(p) + '" alt="' + esc(p.name) + '" onerror="this.outerHTML=\'<span class=noimg>📦</span>\'">' +
      (p.top ? '<span class="top">مطلوب</span>' : "") + "</div>" +
      '<div class="in"><div class="nm">' + esc(p.name) + "</div>" +
      (p.price != null ? '<div class="pr">' + p.price + " <small>درهم" + (p.unit ? " / " + esc(p.unit) : "") + "</small></div>" + (p.note ? '<div class="note">' + esc(p.note) + "</div>" : "") : '<div class="ask">💬 الثمن كنعطيوه ليك فالتيليفون</div>') +
      (q ? '<div class="qty"><button data-a="inc" data-id="' + p.id + '">+</button><span>' + q + '</span><button data-a="dec" data-id="' + p.id + '">−</button></div>'
         : '<button class="add" data-a="inc" data-id="' + p.id + '">' + "زيد للطلب" + "</button>") +
      "</div></div>";
  }

  function render() {
    var q = $("q").value.trim();
    var html = "", n = 0;
    var list = cur === "all" ? S.CATEGORIES : S.CATEGORIES.filter(function (c) { return c.id === cur; });
    if (q) list = S.CATEGORIES;
    list.forEach(function (c) {
      var items = P.filter(function (p) { return p.cat === c.id && (!q || p.name.indexOf(q) > -1); });
      if (!items.length) return;
      n += items.length;
      html += '<h2 id="sec-' + c.id + '">' + c.icon + " " + c.name + '</h2><div class="grid">' + items.map(card).join("") + "</div>";
    });
    $("list").innerHTML = html;
    $("empty").style.display = n ? "none" : "block";
    bar();
  }

  function totals() {
    var cnt = 0, sum = 0, ask = 0;
    Object.keys(cart).forEach(function (id) {
      var p = byId[id]; if (!p) { delete cart[id]; return; }
      cnt += cart[id];
      if (p.price != null) sum += p.price * cart[id]; else ask++;
    });
    return { cnt: cnt, sum: sum, ask: ask };
  }
  function bar() {
    var t = totals();
    $("bar").classList.toggle("show", t.cnt > 0);
    $("cnt").textContent = t.cnt;
    $("sum").textContent = t.sum ? money(t.sum) : "";
  }
  function change(id, d) {
    cart[id] = (cart[id] || 0) + d;
    if (cart[id] <= 0) delete cart[id];
    save(); render();
    if ($("sheet").classList.contains("show")) openCart();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]"); if (!b) return;
    change(b.dataset.id, b.dataset.a === "inc" ? 1 : -1);
  });

  // السلة والاستمارة
  var form = { name: "", phone: "", city: "", address: "", note: "" };
  function openCart() {
    var t = totals();
    if (!t.cnt) { closeCart(); return; }
    var lines = Object.keys(cart).map(function (id) {
      var p = byId[id];
      return '<div class="line"><img src="' + img(p) + '" alt="" onerror="this.style.visibility=\'hidden\'"><div class="t">' + esc(p.name) +
        "<small>" + (p.price != null ? money(p.price * cart[id]) : "الثمن فالتيليفون") + "</small></div>" +
        '<div class="qty"><button data-a="inc" data-id="' + id + '">+</button><span>' + cart[id] + '</span><button data-a="dec" data-id="' + id + '">−</button></div></div>';
    }).join("");
    $("panel").innerHTML =
      '<h3>🛒 الطلب ديالك <button class="x" id="x">×</button></h3>' + lines +
      '<div class="total"><span>المجموع</span><span>' + (t.sum ? money(t.sum) : "—") + "</span></div>" +
      '<p class="note">' + (t.ask ? "كاين " + t.ask + " منتوج بلا ثمن هنا: غادي نعطيوك الثمن ديالو فالتيليفون. " : "") + "ثمن التوصيل كنأكدوه معاك فالتيليفون.</p>" +
      '<form id="f" novalidate>' +
      '<label for="name">السمية الكاملة</label><input id="name" autocomplete="name" required>' +
      '<label for="phone">رقم التيليفون</label><input id="phone" type="tel" inputmode="tel" placeholder="06XXXXXXXX" autocomplete="tel" required><div class="err" id="perr">كتب رقم صحيح بحال 0612345678</div>' +
      '<label for="city">المدينة</label><input id="city" autocomplete="address-level2" required>' +
      '<label for="address">العنوان (الحي، الدوار…)</label><input id="address" autocomplete="street-address">' +
      '<label for="note">ملاحظة (اختياري)</label><textarea id="note" rows="2" placeholder="مثلا: الوقت المناسب باش نعيطو ليك"></textarea>' +
      '<input class="hp" id="website" tabindex="-1" autocomplete="off">' +
      '<div class="err" id="ferr">عمّر السمية والتيليفون والمدينة عافاك</div>' +
      '<button class="send" id="send" type="submit">✅ أكّد الطلب</button></form>';
    ["name", "phone", "city", "address", "note"].forEach(function (k) {
      var el = $(k); el.value = form[k]; el.addEventListener("input", function () { form[k] = el.value; });
    });
    $("x").onclick = closeCart;
    $("f").onsubmit = submit;
    $("sheet").classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeCart() { $("sheet").classList.remove("show"); document.body.style.overflow = ""; }
  $("openCart").onclick = openCart;
  $("sheet").addEventListener("click", function (e) { if (e.target.id === "sheet") closeCart(); });

  function normPhone(v) {
    v = v.replace(/[\s.\-]/g, "").replace(/^\+?212/, "0").replace(/^00212/, "0");
    return /^0[5-7]\d{8}$/.test(v) ? v : "";
  }

  function submit(e) {
    e.preventDefault();
    var phone = normPhone(form.phone);
    $("perr").style.display = form.phone && !phone ? "block" : "none";
    var okF = form.name.trim() && phone && form.city.trim();
    $("ferr").style.display = okF ? "none" : "block";
    if (!okF) return;
    var t = totals();
    var items = Object.keys(cart).map(function (id) {
      var p = byId[id];
      return p.name + " × " + cart[id] + (p.unit ? " " + p.unit.replace(/^ال/, "") : "") + (p.price != null ? " = " + p.price * cart[id] + " د" : " (الثمن فالتيليفون)");
    });
    var noprice = Object.keys(cart).filter(function (id) { return byId[id].price == null; }).map(function (id) { return byId[id].name + " × " + cart[id]; });
    var params = new URLSearchParams(location.search);
    var data = new URLSearchParams({
      name: form.name.trim(), phone: phone, city: form.city.trim(), address: form.address.trim(), note: form.note.trim(),
      items: items.join(" | "), qty: t.cnt, total: t.sum, noprice: noprice.join(" | "),
      source: [params.get("utm_source"), params.get("utm_campaign"), params.get("utm_content")].filter(Boolean).join(" / ") || document.referrer || "direct",
      website: $("website").value
    });
    $("send").disabled = true; $("send").textContent = "كنصيفطو…";
    var noSheet = !S.SHEET_URL || S.SHEET_URL.indexOf("http") !== 0;
    var done = function () { success(items, t, phone, noSheet); };
    if (noSheet) { done(); return; }
    fetch(S.SHEET_URL, { method: "POST", mode: "no-cors", body: data }).then(done, done);
    try { if (window.fbq) fbq("track", "Purchase", { value: t.sum, currency: "MAD" }); } catch (x) {}
  }

  function success(items, t, phone, noSheet) {
    var msg = "السلام، درت طلب من المتجر ديال سيليا أوازيس:\n" + items.join("\n") +
      (t.sum ? "\nالمجموع: " + t.sum + " درهم" : "") + "\nالسمية: " + form.name.trim() + "\nالتيليفون: " + phone + "\nالمدينة: " + form.city.trim();
    var wa = '<a target="_blank" rel="noopener" href="' + waBase + encodeURIComponent(msg) + '">';
    $("panel").innerHTML = noSheet
      ? '<div class="ok"><div class="big">📲</div><h3>باقي خطوة وحدة</h3><p>كليكي على الزر الأخضر باش يوصلنا الطلب فالواتساب، ونعيطو ليك نأكدو.</p>' + wa + '💬 صيفط الطلب فالواتساب</a>' +
        '<button class="send" id="again" style="background:#151515">رجع للمتجر</button></div>'
      : '<div class="ok"><div class="big">✅</div><h3>توصلنا بالطلب ديالك!</h3>' +
      "<p>شكرا " + esc(form.name.trim()) + ". غادي نعيطو ليك فـ <b>" + esc(phone) + "</b> باش نأكدو الطلب وثمن التوصيل.</p>" +
      wa + '💬 بغيتي تزرب؟ صيفط الطلب فالواتساب</a>' +
      '<button class="send" id="again" style="background:#151515">رجع للمتجر</button></div>';
    cart = {}; save(); render();
    $("again").onclick = closeCart;
  }

  render();
})();
