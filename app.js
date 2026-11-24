// Telegram SDK визначає WebApp і в звичайному браузері; platform "unknown" = відкрито не в Telegram
const tg = window.Telegram?.WebApp?.platform && window.Telegram.WebApp.platform !== 'unknown' ? window.Telegram.WebApp : null;

const CATS = [
  ['all', 'Усі'], ['top', 'Верх'], ['bottom', 'Низ'], ['shoes', 'Взуття'], ['acc', 'Аксесуари'],
];
const catName = Object.fromEntries(CATS);

const CLOTH = ['XS', 'S', 'M', 'L', 'XL'];
const PRODUCTS = [
  { id: 1, brand: 'Acne Studios', name: 'Худі з нашивкою Face', cat: 'top', kind: 'hoodie', tone: 'dark', price: 11900, isNew: true,
    sizes: CLOTH, stock: ['S', 'M', 'L'],
    desc: 'Худі вільного крою з фірмовою нашивкою Face на грудях. Щільний футер, м’який начос усередині.',
    facts: ['100% органічна бавовна', 'Оригінал, бирки та пакування', 'Посадка: оверсайз'] },
  { id: 2, brand: 'Stone Island', name: 'Світшот з патчем Compass', cat: 'top', kind: 'sweat', tone: 'dark', price: 9800,
    sizes: CLOTH, stock: ['M', 'L', 'XL'],
    desc: 'Класичний світшот із круглим коміром і знімним патчем Compass на рукаві.',
    facts: ['Бавовняний футер, фарбування готового виробу', 'Знімний патч на ґудзиках', 'Посадка: стандартна'] },
  { id: 3, brand: 'Carhartt WIP', name: 'Куртка Detroit', cat: 'top', kind: 'jacket', tone: 'dark', price: 8400, isNew: true,
    sizes: CLOTH, stock: ['S', 'M', 'L', 'XL'],
    desc: 'Робоча куртка з органічного деніму Dearborn, вельветовий комір і утеплена підкладка.',
    facts: ['Органічний денім 340 г/м²', 'Вельветовий комір', 'Утеплена підкладка'] },
  { id: 4, brand: 'Stüssy', name: 'Футболка Basic Stüssy', cat: 'top', kind: 'tee', tone: 'light', price: 2300,
    sizes: CLOTH, stock: ['S', 'M', 'L', 'XL'],
    desc: 'Базова футболка з класичним підписом Stüssy на грудях і великим принтом на спині.',
    facts: ['100% бавовна', 'Шовкографія', 'Посадка: стандартна'] },
  { id: 5, brand: 'Rick Owens DRKSHDW', name: 'Лонгслів Level', cat: 'top', kind: 'longsleeve', tone: 'dark', price: 7600,
    sizes: CLOTH, stock: ['M', 'L'],
    desc: 'Подовжений лонгслів із тонкого джерсі. Мінімалізм і фірмовий силует бренду.',
    facts: ['100% бавовна', 'Подовжена спинка', 'Виготовлено в Італії'] },
  { id: 6, brand: 'Carhartt WIP', name: 'Штани Single Knee', cat: 'bottom', kind: 'pants', tone: 'dark', price: 4600, isNew: true,
    sizes: ['28', '30', '32', '34', '36'], stock: ['30', '32', '34'],
    desc: 'Робочі штани з канваса Dearborn з посиленими колінами та кишенею для інструментів.',
    facts: ['Органічна бавовна 340 г/м²', 'Посилені коліна', 'Пряма посадка'] },
  { id: 7, brand: 'Acne Studios', name: 'Джинси 1996', cat: 'bottom', kind: 'pants', tone: 'light', price: 12400,
    sizes: ['28', '30', '32', '34'], stock: ['30', '32'],
    desc: 'Вільні джинси з високою посадкою та прямими штанинами у вінтажному світлому відтінку.',
    facts: ['100% бавовна', 'Ефект вінтажного прання', 'Посадка: вільна'] },
  { id: 8, brand: 'Nike', name: 'Джогери Tech Fleece', cat: 'bottom', kind: 'pants', tone: 'dark', price: 4200,
    sizes: CLOTH, stock: ['S', 'M', 'L', 'XL'],
    desc: 'Легкі теплі джогери з фірмового флісу Tech Fleece зі звуженим низом.',
    facts: ['Бавовна та поліестер', 'Кишеня на блискавці', 'Звужений крій'] },
  { id: 9, brand: 'Stüssy', name: 'Шорти Nylon Water', cat: 'bottom', kind: 'shorts', tone: 'dark', price: 3900,
    sizes: ['S', 'M', 'L', 'XL'], stock: ['M', 'L'],
    desc: 'Нейлонові шорти з сітчастою підкладкою та вишитим логотипом. Висихають за лічені хвилини.',
    facts: ['100% нейлон', 'Сітчаста підкладка', 'Пояс на гумці зі шнурком'] },
  { id: 10, brand: 'New Balance', name: 'Кросівки 2002R', cat: 'shoes', kind: 'sneaker', tone: 'light', price: 6900, isNew: true,
    sizes: ['40', '41', '42', '43', '44', '45'], stock: ['41', '42', '43', '44'],
    desc: 'Кросівки в стилі ретрораннінгу із замші та сітки на амортизувальній підошві ABZORB.',
    facts: ['Замша та сітка', 'Амортизація ABZORB і N-ergy', 'Повномірні'] },
  { id: 11, brand: 'Salomon', name: 'Кросівки XT-6', cat: 'shoes', kind: 'sneaker', tone: 'dark', price: 8200,
    sizes: ['40', '41', '42', '43', '44', '45'], stock: ['40', '42', '43', '45'],
    desc: 'Трейлові кросівки зі швидкою шнурівкою Quicklace і чіпкою підошвою Contagrip.',
    facts: ['Шнурівка Quicklace', 'Підошва Contagrip', 'Повномірні'] },
  { id: 12, brand: 'Nike', name: 'Кросівки Air Force 1 ’07', cat: 'shoes', kind: 'sneaker', tone: 'light', price: 4900,
    sizes: ['39', '40', '41', '42', '43', '44', '45'], stock: ['40', '41', '42', '43', '44'],
    desc: 'Класичні білі кросівки з натуральної шкіри з повітряною подушкою Air у підошві.',
    facts: ['Натуральна шкіра', 'Технологія Nike Air', 'Повномірні'] },
  { id: 13, brand: 'Maison Margiela', name: 'Кеди Replica', cat: 'shoes', kind: 'sneaker', tone: 'light', price: 16500,
    sizes: ['40', '41', '42', '43', '44'], stock: ['41', '42', '43'],
    desc: 'Низькі кеди за мотивами тренувальних кросівок 70-х: замша, шкіра та фірмові чотири стібки.',
    facts: ['Шкіра та замша', 'Каучукова підошва', 'Виготовлено в Італії'] },
  { id: 14, brand: 'Stüssy', name: 'Кепка Basic Stock Low Pro', cat: 'acc', kind: 'cap', tone: 'dark', price: 2100,
    sizes: ['Універсальний'], stock: ['Універсальний'],
    desc: 'Низька шестиклинка з вишитим логотипом Stock і регулятором ззаду.',
    facts: ['100% бавовна', 'Металева пряжка', 'Обхват 54–60 см'] },
  { id: 15, brand: 'Arc’teryx', name: 'Сумка Mantis 2', cat: 'acc', kind: 'bag', tone: 'dark', price: 2900, isNew: true,
    sizes: ['Універсальний'], stock: ['Універсальний'],
    desc: 'Компактна поясна сумка, яку можна носити через плече. Два відділення на блискавках.',
    facts: ['Об’єм 2 л', 'Водовідштовхувальна тканина', 'Ремінь регулюється'] },
  { id: 16, brand: 'Nike', name: 'Шкарпетки Everyday Plus, 3 пари', cat: 'acc', kind: 'socks', tone: 'light', price: 900,
    sizes: ['38–42', '42–46'], stock: ['38–42', '42–46'],
    desc: 'Набір високих шкарпеток із м’якою підошвою та підтримкою склепіння стопи.',
    facts: ['Три пари в наборі', 'Технологія Dri-FIT', 'Посилена підошва'] },
];
const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort((a, b) => a.localeCompare(b));

// Силуети у viewBox 200×250: нейтральні заглушки замість фото
const SHAPES = {
  tee: 'M58 52 L84 40 Q100 56 116 40 L142 52 L178 90 L156 112 L142 98 L142 222 L58 222 L58 98 L44 112 L22 90 Z',
  longsleeve: 'M56 54 L84 42 Q100 58 116 42 L144 54 L184 170 L164 176 L144 106 L144 222 L56 222 L56 106 L36 176 L16 170 Z',
  sweat: 'M54 62 L84 50 Q100 66 116 50 L146 62 L184 170 L164 176 L144 112 L144 206 L56 206 L56 112 L36 176 L16 170 Z',
  hoodie: 'M50 74 L76 62 Q74 30 100 28 Q126 30 124 62 L150 74 L186 176 L166 182 L148 122 L148 210 L52 210 L52 122 L34 182 L14 176 Z',
  jacket: 'M50 66 L82 50 L100 70 L118 50 L150 66 L186 168 L166 174 L148 116 L148 200 L52 200 L52 116 L34 174 L14 168 Z',
  pants: 'M62 28 L138 28 L150 226 L112 226 L100 96 L88 226 L50 226 Z',
  shorts: 'M56 70 L144 70 L156 170 L110 170 L100 112 L90 170 L44 170 Z',
  sneaker: 'M22 160 L26 118 Q56 116 78 94 L104 88 Q124 118 162 126 Q184 130 182 160 Z',
  cap: 'M48 146 Q46 76 104 74 Q158 76 158 146 Z M126 140 L194 146 L190 158 L124 154 Z',
  bag: 'M30 120 L170 120 Q176 160 150 176 L50 176 Q24 160 30 120 Z M40 128 L20 70 L30 66 L52 124 Z M160 124 L180 70 L170 66 L148 124 Z',
  socks: 'M78 28 L116 28 L116 146 L152 170 Q168 184 152 200 L96 200 Q72 198 76 176 Z',
};
// Деталі, що видно лише на силуетах певного типу
const DETAILS = {
  jacket: '<line x1="100" y1="70" x2="100" y2="200"/><path d="M82 50 L100 70 L118 50"/>',
  hoodie: '<path d="M76 62 Q100 80 124 62"/><path d="M72 160 L128 160 L134 192 L66 192 Z"/>',
  sneaker: '<line x1="22" y1="148" x2="182" y2="148"/><path d="M84 104 L118 120"/>',
  pants: '<line x1="100" y1="28" x2="100" y2="96"/><line x1="62" y1="44" x2="138" y2="44"/>',
  bag: '<line x1="40" y1="146" x2="160" y2="146"/>',
};

function art(p, view = 0) {
  const fill = p.tone === 'dark' ? '#0a0a0a' : '#ffffff';
  const ink = p.tone === 'dark' ? '#ffffff' : '#0a0a0a';
  const stroke = p.tone === 'light' ? ' stroke="#0a0a0a" stroke-width="2.5"' : '';
  let body;
  if (view === 2) {
    // крупний план фактури: рядки стібків
    const lines = Array.from({ length: 12 }, (_, i) => `<line x1="-20" y1="${i * 24}" x2="220" y2="${i * 24 + 60}"/>`).join('');
    body = `<rect width="200" height="250" fill="${fill}"/><g stroke="${ink}" stroke-width="1.5" stroke-dasharray="6 5" opacity=".7">${lines}</g>`;
  } else {
    body = `<path d="${SHAPES[p.kind]}" fill="${fill}"${stroke} stroke-linejoin="miter"/>`
      + (view === 0 && DETAILS[p.kind] ? `<g fill="none" stroke="${ink}" stroke-width="2" opacity=".55">${DETAILS[p.kind]}</g>` : '');
    if (view === 1) body = `<g transform="translate(200 0) scale(-1 1)">${body}</g>`;
  }
  return `<svg class="art" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${body}</svg>`;
}

const state = { cat: 'all', brand: 'all', q: '', sort: 'default', cart: [], product: null, size: null };
const $ = (s) => document.querySelector(s);
const uah = (n) => n.toLocaleString('uk-UA') + ' ₴';
const esc = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const plural = (n, [one, few, many]) => {
  const m10 = n % 10, m100 = n % 100;
  return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
};
const haptic = (t) => tg?.HapticFeedback?.[t === 'ok' ? 'notificationOccurred' : 'impactOccurred'](t === 'ok' ? 'success' : t);
// Плавна зміна суми
function countTo(el, from, to) {
  if (from === to) { el.textContent = uah(to); return; }
  const t0 = performance.now(), dur = 380;
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur), e = 1 - (1 - k) ** 3;
    el.textContent = uah(Math.round(from + (to - from) * e));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Каталог ---------- */
function visible() {
  const q = state.q.trim().toLowerCase();
  const list = PRODUCTS.filter((p) =>
    (state.cat === 'all' || p.cat === state.cat) &&
    (state.brand === 'all' || p.brand === state.brand) &&
    (!q || `${p.brand} ${p.name} ${catName[p.cat]} ${p.desc}`.toLowerCase().includes(q)));
  const by = { asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price, new: (a, b) => !!b.isNew - !!a.isNew }[state.sort];
  return by ? list.sort(by) : list;
}

function renderChips() {
  $('#chips').innerHTML = CATS.map(([id, label]) => {
    const n = id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === id).length;
    return `<button class="chip" role="tab" data-cat="${id}" aria-selected="${state.cat === id}">${label}<sup>${n}</sup></button>`;
  }).join('');
}

function renderGrid() {
  const list = visible();
  $('#resultCount').textContent = `${list.length} ${plural(list.length, ['товар', 'товари', 'товарів'])}`;
  $('#grid').innerHTML = list.length ? list.map((p, i) => `
    <button class="card" data-id="${p.id}" style="animation-delay:${Math.min(i, 8) * 40}ms" aria-label="${esc(p.brand)}, ${esc(p.name)}, ${uah(p.price)}">
      <div class="card-img">${p.isNew ? '<span class="badge">НОВЕ</span>' : ''}${art(p)}</div>
      <p class="card-brand">${esc(p.brand)}</p>
      <p class="card-name">${esc(p.name)}</p>
      <div class="card-price">${uah(p.price)}</div>
      <div class="card-sizes">${p.stock.join(' · ')}</div>
    </button>`).join('') : `
    <div class="empty">
      <svg><use href="#star"/></svg>
      <h3>Нічого не знайдено</h3>
      <p>${state.q ? `За запитом «${esc(state.q)}» товарів немає.` : 'За цими фільтрами поки порожньо.'} Спробуйте інше слово, бренд або категорію.</p>
      <button class="btn" id="resetFilters">Скинути фільтри</button>
    </div>`;
}

function setCat(cat) {
  if (state.cat === cat) return;
  state.cat = cat;
  renderChips();
  renderGrid();
  haptic('light');
}

/* ---------- Шторки ---------- */
const stack = [];
function openSheet(el) {
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add('open'));
  $('#scrim').classList.add('on');
  document.body.classList.add('locked');
  stack.push(el);
  tg?.BackButton.show();
  el.querySelector('.close').focus({ preventScroll: true });
}
function closeSheet() {
  const el = stack.pop();
  if (!el) return;
  el.classList.remove('open');
  setTimeout(() => { if (!el.classList.contains('open')) el.hidden = true; }, 320);
  if (!stack.length) {
    $('#scrim').classList.remove('on');
    document.body.classList.remove('locked');
    tg?.BackButton.hide();
  }
}
function closeAll() { while (stack.length) closeSheet(); }

/* ---------- Картка товару ---------- */
function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  state.product = p;
  state.size = p.stock.length === 1 && p.sizes.length === 1 ? p.stock[0] : null;
  const views = [0, 1, 2];
  $('#productBody').innerHTML = `
    <div class="gallery">
      <div class="slides" id="slides">${views.map((v) => `<div class="slide">${art(p, v)}</div>`).join('')}</div>
      <span class="counter" id="counter">1 / ${views.length}</span>
    </div>
    <div class="thumbs">${views.map((v) => `<button class="thumb" data-slide="${v}" aria-label="Фото ${v + 1}" aria-current="${v === 0}">${art(p, v)}</button>`).join('')}</div>
    <div class="p-info">
      <div class="p-cat">${esc(p.brand)} · ${catName[p.cat]}${p.isNew ? ' · Новинка' : ''}</div>
      <h2 class="p-name" id="pName">${esc(p.name)}</h2>
      <div class="p-price">${uah(p.price)}</div>
      <p class="p-desc">${esc(p.desc)}</p>
      <ul class="p-list">${p.facts.map((f) => `<li><svg class="ico"><use href="#star"/></svg>${esc(f)}</li>`).join('')}</ul>
      <div class="label"><span>Розмір</span><span>${p.stock.length < p.sizes.length ? 'Закреслені — немає в наявності' : 'Усі розміри в наявності'}</span></div>
      <div class="sizes" id="sizes">${p.sizes.map((s) => `<button class="size" data-size="${s}" aria-pressed="${state.size === s}" ${p.stock.includes(s) ? '' : 'disabled'}>${s}</button>`).join('')}</div>
      <p class="hint" id="sizeHint"></p>
    </div>
    <div class="sticky-cta"><button class="btn" id="addToCart">Додати в кошик · ${uah(p.price)}</button></div>`;
  $('#productBody').scrollTop = 0;
  $('#slides').addEventListener('scroll', (e) => {
    const i = Math.round(e.target.scrollLeft / e.target.clientWidth);
    $('#counter').textContent = `${i + 1} / ${views.length}`;
    document.querySelectorAll('.thumb').forEach((t, k) => t.setAttribute('aria-current', k === i));
  }, { passive: true });
  openSheet($('#productSheet'));
}

function addToCart() {
  const p = state.product, btn = $('#addToCart');
  if (btn.disabled) return;
  if (!state.size) {
    $('#sizeHint').textContent = 'Оберіть розмір, щоб додати товар у кошик';
    const s = $('#sizes');
    s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake');
    haptic('heavy');
    return;
  }
  const line = state.cart.find((l) => l.id === p.id && l.size === state.size);
  if (line) line.qty++; else state.cart.push({ id: p.id, size: state.size, qty: 1 });
  updateCartCount(true);
  haptic('ok');
  toast(`Додано: ${p.brand}, ${state.size}`);
  // коротке підтвердження на кнопці, потім шторка закривається
  btn.disabled = true;
  btn.classList.add('added');
  btn.innerHTML = '<svg class="ico spin"><use href="#star"/></svg>Додано в кошик';
  setTimeout(() => { if (stack.at(-1) === $('#productSheet')) closeSheet(); }, 550);
}

/* ---------- Кошик ---------- */
const DELIVERY = 120, FREE_FROM = 3000;
let shownTotal = 0;

function updateCartCount(bump) {
  const n = state.cart.reduce((s, l) => s + l.qty, 0);
  $('#cartCount').textContent = n;
  $('#cartOpen').setAttribute('aria-label', `Відкрити кошик, ${n} ${plural(n, ['товар', 'товари', 'товарів'])}`);
  if (bump) { const b = $('#cartOpen'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
}

function totals() {
  const sub = state.cart.reduce((s, l) => s + PRODUCTS.find((p) => p.id === l.id).price * l.qty, 0);
  const ship = sub === 0 || sub >= FREE_FROM ? 0 : DELIVERY;
  return { sub, ship, total: sub + ship };
}

function renderCart(animate) {
  const body = $('#cartBody');
  const n = state.cart.reduce((s, l) => s + l.qty, 0);
  if (!state.cart.length) {
    shownTotal = 0;
    body.innerHTML = `
      <div class="c-head"><h2 id="cartTitle">Кошик</h2></div>
      <div class="c-empty">
        <svg><use href="#star"/></svg>
        <h3>Кошик порожній</h3>
        <p>Оберіть щось у каталозі — тут з’явиться ваше замовлення.</p>
        <button class="btn" data-go-catalog>До каталогу</button>
      </div>`;
    return;
  }
  const { sub, ship, total } = totals();
  body.innerHTML = `
    <div class="c-head"><h2 id="cartTitle">Кошик</h2><p>${n} ${plural(n, ['товар', 'товари', 'товарів'])}</p></div>
    <div class="c-list${animate ? '' : ' still'}">${state.cart.map((l, i) => {
      const p = PRODUCTS.find((x) => x.id === l.id);
      return `<div class="c-item" style="animation-delay:${i * 50}ms">
        <div class="thumbart">${art(p)}</div>
        <div>
          <div class="c-top">
            <div><p class="card-brand">${esc(p.brand)}</p><p class="c-name">${esc(p.name)}</p><p class="c-meta">Розмір: ${l.size} · ${uah(p.price)}</p></div>
            <button class="c-remove" data-remove="${i}" aria-label="Видалити ${esc(p.name)}">Видалити</button>
          </div>
          <div class="c-bottom">
            <div class="qty">
              <button data-dec="${i}" aria-label="Зменшити кількість" ${l.qty === 1 ? 'disabled' : ''}>−</button>
              <output aria-live="polite">${l.qty}</output>
              <button data-inc="${i}" aria-label="Збільшити кількість" ${l.qty >= 9 ? 'disabled' : ''}>+</button>
            </div>
            <span class="c-line">${uah(p.price * l.qty)}</span>
          </div>
        </div>
      </div>`;
    }).join('')}</div>
    <div class="summary">
      <div class="row"><span>Товари</span><span>${uah(sub)}</span></div>
      <div class="row"><span>Доставка</span><span>${ship ? uah(ship) : 'Безкоштовно'}</span></div>
      <div class="row total"><span>Разом</span><span id="totalNum"></span></div>
      ${ship ? `<p class="ship-note">До безкоштовної доставки ще ${uah(FREE_FROM - sub)}</p>` : ''}
    </div>
    <div class="sticky-cta"><button class="btn" id="checkout">Оформити замовлення · ${uah(total)}</button></div>`;
  countTo($('#totalNum'), animate ? total : shownTotal, total);
  shownTotal = total;
}

function checkout() {
  const { total } = totals();
  const no = 'JS-' + String(Math.floor(1000 + Math.random() * 9000));
  $('#cartBody').innerHTML = `
    <div class="done">
      <svg class="star-burst"><use href="#star"/></svg>
      <h3>Замовлення прийнято</h3>
      <div class="order-no">№ ${no}</div>
      <p>Дякуємо! Сума замовлення — ${uah(total)}. У справжньому магазині менеджер JASST STORE зв’язався б з вами для підтвердження доставки.</p>
      <button class="btn" data-go-catalog data-clear>Повернутися до каталогу</button>
      <p class="demo-note">Це демонстрація: оплата не списується, а замовлення нікуди не надсилається.</p>
    </div>`;
  haptic('ok');
}

function toast(text) {
  const t = $('#toast');
  t.innerHTML = `<svg class="ico"><use href="#star"/></svg>${esc(text)}`;
  t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 1900);
}

function goCatalog() {
  closeAll();
  $('#catalog').scrollIntoView({ behavior: 'smooth' });
}

/* ---------- Випадні списки ---------- */
// Нативний <select> лишається джерелом значення і подій change; поверх нього — стилізована кнопка та список
function enhanceSelect(sel) {
  const wrap = sel.parentElement, n = sel.options.length;
  sel.hidden = true;
  wrap.classList.add('dd');
  wrap.insertAdjacentHTML('beforeend', `
    <button type="button" class="dd-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${sel.id}-list" aria-label="${wrap.dataset.label}"></button>
    <ul class="dd-list" id="${sel.id}-list" role="listbox" hidden>${[...sel.options].map((o, i) =>
      `<li role="option" id="${sel.id}-o${i}" data-i="${i}">${esc(o.text)}</li>`).join('')}</ul>`);
  const btn = wrap.querySelector('.dd-btn'), list = wrap.querySelector('.dd-list');
  let active = 0;
  const sync = () => {
    btn.textContent = sel.selectedOptions[0].text;
    [...list.children].forEach((li, i) => li.setAttribute('aria-selected', i === sel.selectedIndex));
  };
  const setActive = (i) => {
    active = (i + n) % n;
    [...list.children].forEach((li, k) => li.classList.toggle('active', k === active));
    // прокручуємо лише сам список, не сторінку
    const li = list.children[active];
    if (li.offsetTop < list.scrollTop) list.scrollTop = li.offsetTop;
    else if (li.offsetTop + li.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = li.offsetTop + li.offsetHeight - list.clientHeight;
    btn.setAttribute('aria-activedescendant', `${sel.id}-o${active}`);
  };
  const open = () => { list.hidden = false; wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); setActive(sel.selectedIndex); list.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  const close = () => { list.hidden = true; wrap.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.removeAttribute('aria-activedescendant'); };
  const pick = (i) => {
    close();
    btn.focus();
    if (sel.selectedIndex === i) return;
    sel.selectedIndex = i;
    sel.dispatchEvent(new Event('change'));
  };
  btn.addEventListener('click', () => (list.hidden ? open() : close()));
  list.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) pick(+li.dataset.i); });
  list.addEventListener('mousemove', (e) => { const li = e.target.closest('li'); if (li && +li.dataset.i !== active) setActive(+li.dataset.i); });
  btn.addEventListener('keydown', (e) => {
    const k = e.key;
    if (list.hidden) { if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); open(); } return; }
    if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); setActive(active + (k === 'ArrowDown' ? 1 : -1)); }
    else if (k === 'Enter' || k === ' ') { e.preventDefault(); pick(active); }
    else if (k === 'Escape') { e.stopPropagation(); close(); }
    else if (k === 'Tab') close();
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });
  sel.addEventListener('change', sync);
  sync();
}

/* ---------- Події ---------- */
$('#brand').innerHTML = '<option value="all">Усі бренди</option>' + BRANDS.map((b) => `<option>${esc(b)}</option>`).join('');
enhanceSelect($('#brand'));
enhanceSelect($('#sort'));
$('#marquee').innerHTML = [0, 1].map(() => `<span>${BRANDS.map((b) => `${esc(b)}<svg class="ico"><use href="#star"/></svg>`).join('')}</span>`).join('');

$('#chips').addEventListener('click', (e) => { const c = e.target.closest('[data-cat]'); if (c) setCat(c.dataset.cat); });
$('#sort').addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });
$('#brand').addEventListener('change', (e) => { state.brand = e.target.value; renderGrid(); haptic('light'); });
$('#search').addEventListener('input', (e) => {
  state.q = e.target.value;
  $('#searchClear').hidden = !state.q;
  renderGrid();
});
$('#searchClear').addEventListener('click', () => {
  $('#search').value = ''; state.q = ''; $('#searchClear').hidden = true; renderGrid(); $('#search').focus();
});
$('#grid').addEventListener('click', (e) => {
  if (e.target.closest('#resetFilters')) {
    state.q = ''; state.cat = 'all'; state.brand = 'all';
    $('#search').value = ''; $('#searchClear').hidden = true;
    $('#brand').value = 'all'; $('#brand').dispatchEvent(new Event('change'));
    renderChips(); toast('Фільтри скинуто');
    return;
  }
  const card = e.target.closest('[data-id]');
  if (card) openProduct(+card.dataset.id);
});
$('#heroCta').addEventListener('click', () => { setCat('all'); goCatalog(); });
$('#cartOpen').addEventListener('click', () => { renderCart(true); openSheet($('#cartSheet')); });
$('#scrim').addEventListener('click', closeAll);
document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', closeSheet));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

$('#productBody').addEventListener('click', (e) => {
  const size = e.target.closest('[data-size]');
  if (size && !size.disabled) {
    state.size = size.dataset.size;
    document.querySelectorAll('.size').forEach((b) => b.setAttribute('aria-pressed', b === size));
    $('#sizeHint').textContent = '';
    haptic('light');
  }
  const th = e.target.closest('[data-slide]');
  if (th) { const s = $('#slides'); s.scrollTo({ left: s.clientWidth * +th.dataset.slide, behavior: 'smooth' }); }
  if (e.target.closest('#addToCart')) addToCart();
});

$('#cartBody').addEventListener('click', (e) => {
  const t = e.target.closest('button');
  if (!t) return;
  const d = t.dataset;
  if (d.inc) state.cart[+d.inc].qty++;
  else if (d.dec) state.cart[+d.dec].qty--;
  else if (d.remove) { const l = state.cart.splice(+d.remove, 1)[0]; toast(`Видалено: ${PRODUCTS.find((p) => p.id === l.id).name}`); }
  else if (t.id === 'checkout') return checkout();
  else if ('goCatalog' in d) {
    if ('clear' in d) { state.cart = []; updateCartCount(); }
    return goCatalog();
  } else return;
  haptic('light');
  updateCartCount();
  renderCart();
});

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.('#ffffff');
  tg.setBackgroundColor?.('#ffffff');
  tg.BackButton.onClick(closeSheet);
}

renderChips();
renderGrid();
