const { stores, brand } = window.LIZA_DATA;
const $ = selector => document.querySelector(selector);
const createEmptyState = () => ({ storeId: null, items: {}, selections: {}, when: "", note: "" });
const emptyState = createEmptyState();
let state;
try { state = { ...createEmptyState(), ...JSON.parse(localStorage.getItem("liza-express") || "{}") }; }
catch { state = createEmptyState(); }
state.items ||= {};
state.selections ||= {};
if (state.storeId && !stores.some(store => store.id === state.storeId)) state = createEmptyState();

let view = { page: "home", storeId: null };
let activeCategory = "all";
let filtersOpen = localStorage.getItem("liza-filters-open") === "true";
let lockedScrollY = null;
const save = () => localStorage.setItem("liza-express", JSON.stringify(state));
const storeById = id => stores.find(store => store.id === id);
const activeStore = () => storeById(state.storeId);
const count = () => Object.values(state.items).reduce((sum, quantity) => sum + quantity, 0);
const itemById = (store, id) => store?.items.find(item => item.id === id);
const hasOptions = item => Boolean(item?.choice || item?.extras || item?.textChoice);
const photoStyle = path => {
  const optimizedPath = path?.replace(/\.png$/i, ".webp");
  return optimizedPath ? ` style="background-image:url('${optimizedPath}');background-size:cover;background-position:center"` : "";
};

function logo() {
  return `<div class="logo"><div class="logo-mark">🛵</div><div>${brand}<small>משלוחים של אהבה בלבד</small></div></div>`;
}

function shell(content, cart = true, nav = false) {
  return `<div class="app-shell"><header class="topbar">${logo()}<button class="profile-btn" onclick="openProfile()" aria-label="הפרופיל של ליזה"><img src="assets/liza-profile.webp" alt=""></button></header>${content}${cart && count() ? cartBar() : ""}${nav && !count() ? bottomNav() : ""}</div>`;
}

function bottomNav() {
  return `<nav class="bottom-nav" aria-label="ניווט ראשי"><button class="nav-item active" onclick="goHome()"><i>◉</i>גילוי</button><button class="nav-item" onclick="goHome()"><i>🍴</i>חנויות</button><button class="nav-item" onclick="goHome()"><i>🔎</i>חיפוש</button><button class="nav-item" onclick="openProfile()"><i>👤</i>פרופיל</button></nav>`;
}

function cartBar() {
  return `<div class="cart-bar"><button class="cart-btn" onclick="checkout()"><span>לראות מה בחרתי</span><span class="cart-count">${count()}</span></button></div>`;
}

function renderHome(category = activeCategory) {
  activeCategory = category;
  view = { page: "home", storeId: null };
  const visibleStores = category === "all" ? stores : stores.filter(store => store.categories?.includes(category));
  const cards = visibleStores.map(store => `
    <article class="store-card" onclick="openStore('${store.id}')" tabindex="0" onkeydown="if(event.key==='Enter')openStore('${store.id}')">
      <div class="store-cover cover-${store.image}"${photoStyle(store.cover)}><span class="store-badge">${store.emoji} ${store.eta}</span></div>
      <div class="store-body">
        <div class="store-title"><h3>${store.name}</h3><b>על חשבון הבית</b></div>
        <p>${store.tagline}</p><div class="store-meta"><span>★ 9.9</span><span>${store.items.length} אפשרויות</span></div>
      </div>
    </article>`).join("");
  $("#app").innerHTML = shell(`
    <section class="hero"><span class="eyebrow">משלוח אל · ליזה 🎂</span><h1>ליזה, מה בא לך<br>להזמין היום?</h1><div class="search-pill"><span>⌕</span>חיפוש בליזה אקספרס</div></section>
    <div class="filter-tools"><button class="filter-toggle" aria-expanded="${filtersOpen}" onclick="toggleFilters()"><span>⚙️ ${category === "all" ? "סינון חנויות" : `מסונן · ${{ love: "אהבה", food: "אוכל", experiences: "חוויות" }[category]}`}</span><b>${filtersOpen ? "הסתרה ↑" : "הצגה ↓"}</b></button></div>
    ${filtersOpen ? `<div class="category-row" aria-label="סינון חנויות"><button class="category ${category === "all" ? "active" : ""}" aria-pressed="${category === "all"}" onclick="filterStores('all')"><i>🎁</i>הכול</button><button class="category ${category === "love" ? "active" : ""}" aria-pressed="${category === "love"}" onclick="filterStores('love')"><i>💘</i>אהבה</button><button class="category ${category === "food" ? "active" : ""}" aria-pressed="${category === "food"}" onclick="filterStores('food')"><i>🍽️</i>אוכל</button><button class="category ${category === "experiences" ? "active" : ""}" aria-pressed="${category === "experiences"}" onclick="filterStores('experiences')"><i>✨</i>חוויות</button></div>` : ""}
    <div class="section-head"><h2>החנויות שלך</h2><span>${visibleStores.length} מקומות</span></div><section class="store-list">${cards || `<div class="empty"><div class="big">🎁</div><p>עוד לא שמנו כאן חנויות, אבל הן בדרך.</p></div>`}</section>`, true, true);
}

function filterStores(category) {
  renderHome(category);
  document.querySelector(".category-row")?.scrollIntoView({ block: "start" });
}

function toggleFilters() {
  const previousScroll = window.scrollY;
  filtersOpen = !filtersOpen;
  localStorage.setItem("liza-filters-open", String(filtersOpen));
  renderHome();
  scrollTo(0, previousScroll);
}

function openStore(id, preserveScroll = false) {
  const previousScroll = preserveScroll ? window.scrollY : 0;
  view = { page: "store", storeId: id };
  const store = storeById(id);
  const items = store.items.map(item => {
    const quantity = state.storeId === id ? (state.items[item.id] || 0) : 0;
    const optionTag = hasOptions(item) ? `<span class="option-tag">לבחירה</span>` : "";
    return `<article class="item">
      <div class="food-img img-${item.image}"${photoStyle(item.photo)} role="img" aria-label="${item.name}"><span class="item-emoji">${item.emoji || store.emoji}</span></div>
      <div class="item-content"><h3>${item.name}</h3><p>${item.description}</p><div class="item-flags"><span class="free">על חשבון הבית</span>${optionTag}</div>
      ${quantity ? qtyControl(item.id, quantity) : `<button class="add" aria-label="הוספת ${escapeHtml(item.name)}" onclick="startAdd('${id}','${item.id}')">+ להוסיף</button>`}</div>
    </article>`;
  }).join("");
  $("#app").innerHTML = shell(`
    <div class="restaurant-hero cover-${store.image}"${photoStyle(store.cover)}><button class="back" onclick="goHome()" aria-label="חזרה לחנויות">←</button><div class="favorite">♡</div></div>
    <section class="restaurant-info"><h1>${store.name}</h1><p>${store.tagline}</p><div class="info-chips"><span class="info-chip">★ 9.9</span><span class="info-chip">${store.eta}</span><span class="info-chip">על חשבון הבית</span></div></section>
    <div class="menu-title">התפריט של ליזה</div><section class="menu">${items}</section>`);
  scrollTo(0, previousScroll);
}

function qtyControl(id, quantity) {
  return `<div class="qty"><button aria-label="להפחית" onclick="changeQty('${id}',-1)">−</button><b>${quantity}</b><button aria-label="להוסיף" onclick="changeQty('${id}',1)">+</button></div>`;
}

function startAdd(storeId, itemId) {
  if (state.storeId && state.storeId !== storeId && count()) return confirmReplace(storeId, itemId);
  const item = itemById(storeById(storeId), itemId);
  if (hasOptions(item)) return openCustomizer(storeId, itemId, "add");
  addItem(storeId, itemId);
}

function addItem(storeId, itemId) {
  state.storeId = storeId;
  state.items[itemId] = (state.items[itemId] || 0) + 1;
  save();
  openStore(storeId, true);
  toast("נוסף לעגלה. בחירה מעולה 😌");
}

function changeQty(id, delta) {
  state.items[id] = (state.items[id] || 0) + delta;
  if (state.items[id] <= 0) {
    delete state.items[id];
    delete state.selections[id];
  }
  if (!count()) state.storeId = null;
  save();
  view.page === "checkout" ? renderCheckout() : (view.storeId ? openStore(view.storeId, true) : renderHome());
}

function confirmReplace(storeId, itemId) {
  const oldStore = activeStore();
  const nextStore = storeById(storeId);
  $("#modal-root").innerHTML = `<div class="modal-back" role="dialog" aria-modal="true"><div class="modal"><h2>להחליף חנות?</h2><p>העגלה שלך כרגע מ־<b>${oldStore.name}</b>. כדי להוסיף מ־<b>${nextStore.name}</b>, צריך לרוקן אותה קודם.</p><div class="modal-actions"><button class="danger" onclick="replaceCart('${storeId}','${itemId}')">כן, להחליף עגלה</button><button class="secondary" onclick="closeModal()">לא, לשמור את הבחירות</button></div></div></div>`;
  lockPageScroll();
}

function replaceCart(storeId, itemId) {
  state = { ...createEmptyState(), storeId };
  save();
  closeModal();
  const item = itemById(storeById(storeId), itemId);
  if (hasOptions(item)) openCustomizer(storeId, itemId, "add");
  else addItem(storeId, itemId);
}

function openCustomizer(storeId, itemId, mode = "add") {
  const item = itemById(storeById(storeId), itemId);
  const selected = state.selections[itemId] || { choice: "", extras: [], text: "" };
  const choice = item.choice ? `<fieldset class="option-group"><legend>${item.choice.label}${item.choice.required ? `<em>חובה</em>` : ""}</legend>${item.choice.values.map((value, index) => `<label class="option-row"><span>${value}</span><input type="radio" name="custom-choice" value="${escapeHtml(value)}" ${selected.choice === value ? "checked" : ""}></label>`).join("")}</fieldset>` : "";
  const textChoice = item.textChoice ? `<div class="option-group"><label class="custom-label" for="custom-text">${item.textChoice.label}${item.textChoice.required ? `<em>חובה</em>` : ""}</label><input class="custom-input" id="custom-text" value="${escapeHtml(selected.text || "")}" placeholder="${escapeHtml(item.textChoice.placeholder || "")}"></div>` : "";
  const extras = item.extras ? `<fieldset class="option-group"><legend>${item.extras.label}${item.extras.required ? `<em>חובה · אפשר לבחור כמה</em>` : `<small>אופציונלי</small>`}</legend>${item.extras.values.map(value => `<label class="option-row"><span>${value}</span><input type="checkbox" name="custom-extra" value="${escapeHtml(value)}" ${(selected.extras || []).includes(value) ? "checked" : ""}></label>`).join("")}</fieldset>` : "";
  $("#modal-root").innerHTML = `<div class="modal-back customizer-back" role="dialog" aria-modal="true"><div class="modal customizer"><button class="modal-close" onclick="closeModal()" aria-label="סגירה">×</button><div class="customizer-head"><span>${item.emoji || "🎁"}</span><div><h2>${item.name}</h2><p>${item.description}</p></div></div><div class="customizer-body">${choice}${textChoice}${extras}<p id="option-error" class="option-error" role="alert"></p></div><button class="custom-submit" onclick="saveCustomization('${storeId}','${itemId}','${mode}')">${mode === "edit" ? "שמירת שינויים" : "הוספה להזמנה"}</button></div></div>`;
  lockPageScroll();
}

function saveCustomization(storeId, itemId, mode) {
  const item = itemById(storeById(storeId), itemId);
  const choice = document.querySelector('input[name="custom-choice"]:checked')?.value || "";
  const text = $("#custom-text")?.value.trim() || "";
  const extras = [...document.querySelectorAll('input[name="custom-extra"]:checked')].map(input => input.value);
  const missing = (item.choice?.required && !choice) || (item.textChoice?.required && !text) || (item.extras?.required && !extras.length);
  if (missing) {
    $("#option-error").textContent = "צריך לבחור לפחות אפשרות חובה אחת לפני שממשיכים.";
    return;
  }
  state.storeId = storeId;
  state.selections[itemId] = { choice, text, extras };
  if (mode !== "edit") state.items[itemId] = (state.items[itemId] || 0) + 1;
  save();
  closeModal();
  if (mode === "edit") renderCheckout();
  else { openStore(storeId, true); toast("נוסף לעגלה עם כל הבחירות ✨"); }
}

function lockPageScroll() {
  if (lockedScrollY !== null) return;
  lockedScrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  $("#modal-root").innerHTML = "";
  if (lockedScrollY === null) return;
  const restoreScrollY = lockedScrollY;
  lockedScrollY = null;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  scrollTo(0, restoreScrollY);
}
function checkout() { if (count()) { view = { page: "checkout", storeId: state.storeId }; renderCheckout(); scrollTo(0, 0); } }

function selectionLines(itemId) {
  const selected = state.selections[itemId];
  if (!selected) return [];
  const lines = [];
  if (selected.choice) lines.push(selected.choice);
  if (selected.text) lines.push(selected.text);
  if (selected.extras?.length) lines.push(selected.extras.join(", "));
  return lines;
}

function message() {
  const store = activeStore();
  const lines = Object.entries(state.items).flatMap(([id, quantity]) => {
    const item = itemById(store, id);
    if (!item) return [];
    const result = [`• ${item.name} × ${quantity}`];
    selectionLines(id).forEach(line => result.push(`  ↳ ${line}`));
    return result;
  });
  return `${store.recipient.greeting} הזמנתי ממך דרך ליזה אקספרס 🎂\n\n${store.name}\n${lines.join("\n")}${state.when ? `\n\nמתי בא לי: ${state.when}` : ""}${state.note ? `\nהערה: ${state.note}` : ""}\n\nתודה, ליזה 🤍`;
}

function renderCheckout() {
  const store = activeStore();
  if (!store) return renderHome();
  const rows = Object.entries(state.items).map(([id, quantity]) => {
    const item = itemById(store, id);
    if (!item) return "";
    const selected = selectionLines(id);
    return `<div class="summary-row"><div class="summary-copy"><b>${item.name}</b><small>על חשבון הבית</small>${selected.length ? `<div class="selected-options">${selected.map(line => `<span>${escapeHtml(line)}</span>`).join("")}</div><button class="edit-options" onclick="openCustomizer('${store.id}','${id}','edit')">עריכת בחירות</button>` : ""}</div>${qtyControl(id, quantity)}</div>`;
  }).join("");
  const hasPhone = /^\d{8,15}$/.test(store.recipient.phone);
  const whatsappControl = hasPhone
    ? `<a id="wa-button" class="wa-btn" href="${escapeHtml(whatsappUrl())}" target="_blank" rel="noopener" onclick="completeOrder()">להזמין בוואטסאפ</a>`
    : `<button id="wa-button" class="wa-btn" disabled>להזמין בוואטסאפ</button>`;
  $("#app").innerHTML = shell(`<section class="page-head"><button class="back" onclick="openStore('${store.id}')">→ חזרה לתפריט</button><h1>כמעט אצלך 🎁</h1><p>רק נסגור מתי, מה, ולמי מגיע הקרדיט.</p></section><section class="checkout"><div class="summary">${rows}</div><div class="recipient"><span>💌</span><div><small>ההזמנה תיפתח אצל</small><b>${store.recipient.name} · ${store.name}</b></div></div><div class="field"><label for="when">מתי בא לך?</label><input id="when" placeholder="למשל: מחר ב־10:30" value="${escapeHtml(state.when)}" oninput="updateField('when',this.value)"></div><div class="field"><label for="note">הערה קטנה (או דרישה של דיווה)</label><textarea id="note" placeholder="כל פרט שיעזור להכין את ההפתעה..." oninput="updateField('note',this.value)">${escapeHtml(state.note)}</textarea></div><div class="field"><label>כך תיראה ההודעה</label><div id="preview" class="preview">${escapeHtml(message())}</div></div>${whatsappControl}<p class="hint">${hasPhone ? "ייפתח צ׳אט מוכן. ההודעה תישלח רק אחרי שתלחצי ״שליחה״ בוואטסאפ." : "עדיין לא הוגדר מספר לחנות הזאת. אפשר לראות את ההודעה, אבל כפתור הוואטסאפ מחכה למספר אמיתי."}</p></section>`, false);
}

function openProfile() {
  view = { page: "profile", storeId: null };
  $("#app").innerHTML = shell(`<section class="profile-page"><button class="back" onclick="goHome()">→ חזרה לחנויות</button><div class="profile-hero"><img src="assets/liza-profile.webp" alt="ליזה נהנית ממשהו טעים"><span class="profile-crown">👑</span></div><div class="profile-card"><span class="eyebrow">הלקוחה היחידה והכי חשובה</span><h1>ליזה</h1><p>חובבת אוכל, הפתעות ואנשים שמוכנים לבצע את ההזמנות שלה בלי יותר מדי שאלות.</p><div class="profile-stats"><div><b>${stores.length}</b><small>חנויות אישיות</small></div><div><b>${stores.reduce((sum, store) => sum + store.items.length, 0)}</b><small>פינוקים לבחירה</small></div><div><b>∞</b><small>על חשבון הבית</small></div></div></div><div class="profile-note">🎂 כאן אין הרשמה, אין תשלום ואין אותיות קטנות. רק אנשים שאוהבים אותך.</div></section>`, false, true);
  scrollTo(0, 0);
}

function whatsappUrl() {
  const store = activeStore();
  if (!/^\d{8,15}$/.test(store?.recipient.phone)) return "";
  return `https://wa.me/${store.recipient.phone}?text=${encodeURIComponent(message().normalize("NFC"))}`;
}

function updateField(key, value) {
  state[key] = value;
  save();
  $("#preview").textContent = message();
  const button = $("#wa-button");
  if (button?.tagName === "A") button.href = whatsappUrl();
}

function openWhatsApp() { const url = whatsappUrl(); if (url) window.open(url, "_blank", "noopener"); }
function completeOrder() {
  setTimeout(() => {
    state = createEmptyState();
    save();
    renderHome();
    scrollTo(0, 0);
  }, 180);
}
function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
function goHome() { renderHome(); scrollTo(0, 0); }
function toast(text) { const element = $("#toast"); element.textContent = text; element.classList.add("show"); setTimeout(() => element.classList.remove("show"), 1800); }

window.addEventListener("popstate", renderHome);
save();
renderHome();
