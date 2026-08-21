const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.hidden = isOpen;
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const tabs = [...document.querySelectorAll('.tab')];
const panels = [...document.querySelectorAll('[data-panel]')];
const pricingSection = document.querySelector('#pricing');

function activateTab(activeTab) {
  tabs.forEach(tab => {
    const selected = tab === activeTab;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
  panels.forEach(panel => {
    panel.hidden = panel.dataset.panel !== activeTab.dataset.tab;
  });
  if (pricingSection) pricingSection.hidden = activeTab.dataset.tab !== 'digital';
}

function activateTabByName(tabName) {
  const tab = tabs.find(item => item.dataset.tab === tabName);
  if (tab) activateTab(tab);
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  activateTab(tab);
  const hash = tab.dataset.tab === 'digital' ? '#products' : '#services';
  window.history.replaceState(null, '', hash);
}));

document.querySelectorAll('[data-open-tab]').forEach(link => {
  link.addEventListener('click', () => activateTabByName(link.dataset.openTab));
});

function activateTabFromHash() {
  if (window.location.hash === '#products' || window.location.hash === '#pricing') {
    activateTabByName('digital');
    const target = window.location.hash === '#pricing' ? pricingSection : document.querySelector('#products');
    window.requestAnimationFrame(() => target?.scrollIntoView({ block: 'start' }));
  }
}

activateTabFromHash();
window.addEventListener('hashchange', activateTabFromHash);

const designCategories = {
  web: {
    title: 'Веб-дизайн',
    time: 'от 2 недель',
    items: [
      ['Лендинг', 'от 40 000 ₽'],
      ['Лонгрид', 'от 40 000 ₽'],
      ['Многостраничный сайт', 'от 60 000 ₽'],
      ['Интернет-магазин', 'от 50 000 ₽']
    ],
    includes: ['Структура и пользовательские сценарии', 'Визуальная концепция', 'Макеты для desktop и mobile']
  },
  graphics: {
    title: 'Графический дизайн',
    time: 'от 5 дней',
    items: [
      ['Логотип', 'от 25 000 ₽'],
      ['Маскот', 'от 20 000 ₽'],
      ['Стикерпак', 'от 12 000 ₽'],
      ['Комплект материалов', 'от 18 000 ₽']
    ],
    includes: ['Концепция и визуальное направление', 'Подготовка файлов к использованию', 'Правила применения материалов']
  },
  redesign: {
    title: 'Редизайн',
    time: 'от 2 недель',
    items: [
      ['Редизайн лендинга', 'от 30 000 ₽'],
      ['Редизайн сайта', 'от 45 000 ₽'],
      ['Редизайн интерфейса', 'от 35 000 ₽'],
      ['Визуальный аудит', 'от 15 000 ₽']
    ],
    includes: ['Аудит существующего решения', 'Новая визуальная концепция', 'Обновлённые макеты без потери узнаваемости']
  },
  identity: {
    title: 'Айдентика',
    time: 'от 3 недель',
    items: [
      ['Логотип и знак', 'от 30 000 ₽'],
      ['Визуальная система', 'от 55 000 ₽'],
      ['Гайдлайн', 'от 25 000 ₽'],
      ['Бренд-пакет', 'от 70 000 ₽']
    ],
    includes: ['Логотип и набор носителей', 'Фирменные цвета и типографика', 'Правила применения айдентики']
  }
};

const serviceCards = [...document.querySelectorAll('[data-card]')];
const priceGrid = document.querySelector('.price-grid');
const boardTitle = document.querySelector('#board-title');
const boardIncludes = document.querySelector('#board-includes');
const selectedPrice = document.querySelector('#selected-price');
const selectedTime = document.querySelector('#selected-time');
const serviceSelect = document.querySelector('#service-select');

function choosePrice(button) {
  priceGrid?.querySelectorAll('button').forEach(item => item.classList.toggle('is-selected', item === button));
  if (selectedPrice) selectedPrice.textContent = button.dataset.price;
  if (serviceSelect) {
    const optionExists = [...serviceSelect.options].some(option => option.value === button.dataset.service);
    if (!optionExists) serviceSelect.add(new Option(button.dataset.service, button.dataset.service));
    serviceSelect.value = button.dataset.service;
  }
}

function bindPriceButtons() {
  priceGrid?.querySelectorAll('button').forEach(button => button.addEventListener('click', () => choosePrice(button)));
}

function renderCategory(categoryKey) {
  const category = designCategories[categoryKey];
  if (!category || !priceGrid) return;

  serviceCards.forEach(card => {
    const selected = card.dataset.card === categoryKey;
    card.classList.toggle('is-selected', selected);
    card.setAttribute('aria-pressed', String(selected));
  });

  boardTitle.textContent = category.title;
  selectedTime.textContent = category.time;
  priceGrid.innerHTML = category.items.map((item, index) => `
    <button type="button" class="${index === 0 ? 'is-selected' : ''}" data-service="${item[0]}" data-price="${item[1]}">
      <span>${String(index + 1).padStart(2, '0')}</span><b>${item[0]}</b><small>${item[1].replace(' ₽', '')}</small>
    </button>
  `).join('');
  boardIncludes.innerHTML = category.includes.map(item => `<li>${item}</li>`).join('');
  bindPriceButtons();
  choosePrice(priceGrid.querySelector('button'));
}

function revealMobileDetails(card) {
  if (!window.matchMedia('(max-width: 720px)').matches) return;
  const board = card.closest('.service-layout')?.querySelector('.price-board');
  window.requestAnimationFrame(() => board?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    renderCategory(card.dataset.card);
    revealMobileDetails(card);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      renderCategory(card.dataset.card);
    }
  });
});

bindPriceButtons();
priceGrid?.querySelector('button')?.classList.add('is-selected');

const digitalCategories = {
  platform: {
    title: 'Веб-платформа',
    text: 'Рабочее пространство для заявок, клиентов, объектов и контроля процессов.',
    price: 'офис и диспетчеры',
    time: 'веб-приложение',
    includes: ['Единая очередь заявок', 'Клиенты, объекты и договоры', 'Роли, сроки и аналитика'],
    formValue: 'Веб-платформа Higezstar'
  },
  mobile: {
    title: 'Мобильное приложение',
    text: 'Инструмент для сотрудников, которые выполняют задачи на объектах и в дороге.',
    price: 'выездная команда',
    time: 'iOS и Android',
    includes: ['Мобильные задания', 'Маршруты и геозоны', 'Фото, чек-листы и отчёты'],
    formValue: 'Мобильное приложение Higezstar'
  },
  cabinet: {
    title: 'Личный кабинет',
    text: 'Отдельное пространство, где клиент создаёт обращения и видит ход работы.',
    price: 'клиенты компании',
    time: 'веб-интерфейс',
    includes: ['Создание и история обращений', 'Статусы и уведомления', 'Документы и обратная связь'],
    formValue: 'Личный кабинет Higezstar'
  },
  integrations: {
    title: 'Интеграции',
    text: 'Связываем продукты Higezstar с системами, которые уже используются в компании.',
    price: 'ИТ и автоматизация',
    time: 'API и обмен данными',
    includes: ['Импорт и синхронизация данных', 'Связь с учётными системами', 'Автоматические сценарии'],
    formValue: 'Интеграции Higezstar'
  }
};

const digitalCards = [...document.querySelectorAll('[data-digital-card]')];
const digitalBoardTitle = document.querySelector('#digital-board-title');
const digitalBoardText = document.querySelector('#digital-board-text');
const digitalBoardPrice = document.querySelector('#digital-board-price');
const digitalBoardTime = document.querySelector('#digital-board-time');
const digitalBoardIncludes = document.querySelector('#digital-board-includes');

function renderDigitalCategory(categoryKey) {
  const category = digitalCategories[categoryKey];
  if (!category) return;

  digitalCards.forEach(card => {
    const selected = card.dataset.digitalCard === categoryKey;
    card.classList.toggle('is-selected', selected);
    card.setAttribute('aria-pressed', String(selected));
  });

  digitalBoardTitle.textContent = category.title;
  digitalBoardText.textContent = category.text;
  digitalBoardPrice.textContent = category.price;
  digitalBoardTime.textContent = category.time;
  digitalBoardIncludes.innerHTML = category.includes.map(item => `<li>${item}</li>`).join('');

  if (serviceSelect) {
    const optionExists = [...serviceSelect.options].some(option => option.value === category.formValue);
    if (!optionExists) serviceSelect.add(new Option(category.formValue, category.formValue));
    serviceSelect.value = category.formValue;
  }
}

digitalCards.forEach(card => {
  card.addEventListener('click', () => {
    renderDigitalCategory(card.dataset.digitalCard);
    revealMobileDetails(card);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      renderDigitalCategory(card.dataset.digitalCard);
    }
  });
});

const tariffPeriodButtons = [...document.querySelectorAll('[data-period]')];
const tariffPriceValues = [...document.querySelectorAll('.tariff-card__price strong')];
const tariffPeriodLabels = [...document.querySelectorAll('.tariff-card__period')];

function setTariffPeriod(period) {
  tariffPeriodButtons.forEach(button => {
    const active = button.dataset.period === period;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  tariffPriceValues.forEach(value => {
    value.textContent = period === '6' ? value.dataset.price6 : value.dataset.price12;
  });

  tariffPeriodLabels.forEach(label => {
    label.textContent = `при оплате за ${period} месяцев`;
  });
}

tariffPeriodButtons.forEach(button => {
  button.addEventListener('click', () => setTariffPeriod(button.dataset.period));
});

const tariffRail = document.querySelector('.tariff-grid');
const tariffCardsRail = tariffRail ? [...tariffRail.querySelectorAll('.tariff-card')] : [];
const tariffCurrent = document.querySelector('#tariff-current');
const tariffProgress = document.querySelector('#tariff-progress');
const tariffPrevButton = document.querySelector('.tariff-side-arrow--prev');
const tariffNextButton = document.querySelector('.tariff-side-arrow--next');
let tariffActiveIndex = 0;
let tariffAnimationFrame = 0;

function tariffStepSize() {
  const firstCard = tariffCardsRail[0];
  if (!tariffRail || !firstCard) return 0;
  const gap = Number.parseFloat(getComputedStyle(tariffRail).gap) || 0;
  return firstCard.getBoundingClientRect().width + gap;
}

function paintTariffDepth() {
  if (!tariffRail || !tariffCardsRail.length) return;
  const step = tariffStepSize() || 1;
  const rawIndex = tariffRail.scrollLeft / step;
  const nearestIndex = Math.max(0, Math.min(tariffCardsRail.length - 1, Math.round(rawIndex)));

  tariffCardsRail.forEach((card, index) => {
    const distance = index - rawIndex;
    const absoluteDistance = Math.min(Math.abs(distance), 2.4);
    card.style.setProperty('--tilt', `${Math.max(-4.5, Math.min(4.5, distance * -2.2))}deg`);
    card.style.setProperty('--card-scale', String(1 - absoluteDistance * .025));
    card.style.setProperty('--card-opacity', String(1 - absoluteDistance * .12));
    card.style.setProperty('--lift', `${absoluteDistance * 7}px`);
    card.classList.toggle('is-current', index === nearestIndex);
  });

  if (nearestIndex !== tariffActiveIndex) {
    tariffCardsRail[tariffActiveIndex]?.classList.remove('is-focus-pop');
    tariffActiveIndex = nearestIndex;
    const activeCard = tariffCardsRail[tariffActiveIndex];
    activeCard?.classList.remove('is-focus-pop');
    void activeCard?.offsetWidth;
    activeCard?.classList.add('is-focus-pop');
  }

  if (tariffCurrent) tariffCurrent.textContent = String(nearestIndex + 1).padStart(2, '0');
  if (tariffProgress) tariffProgress.style.transform = `scaleX(${(nearestIndex + 1) / tariffCardsRail.length})`;
  if (tariffPrevButton) tariffPrevButton.disabled = nearestIndex === 0;
  if (tariffNextButton) tariffNextButton.disabled = nearestIndex === tariffCardsRail.length - 1;
}

function animateTariffTo(index) {
  if (!tariffRail || !tariffCardsRail.length) return;
  const nextIndex = Math.max(0, Math.min(tariffCardsRail.length - 1, index));
  const start = tariffRail.scrollLeft;
  const finish = Math.min(nextIndex * tariffStepSize(), tariffRail.scrollWidth - tariffRail.clientWidth);
  const distance = finish - start;
  const duration = 340;
  const startedAt = performance.now();
  cancelAnimationFrame(tariffAnimationFrame);
  tariffRail.classList.add('is-animating');

  const frame = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    tariffRail.scrollLeft = start + distance * eased;
    paintTariffDepth();
    if (progress < 1) {
      tariffAnimationFrame = requestAnimationFrame(frame);
    } else {
      tariffRail.classList.remove('is-animating');
      paintTariffDepth();
    }
  };
  tariffAnimationFrame = requestAnimationFrame(frame);
}

document.querySelectorAll('[data-tariff-scroll]').forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.dataset.tariffScroll === 'next' ? 1 : -1;
    animateTariffTo(tariffActiveIndex + direction);
  });
});

if (tariffRail) {
  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let paintFrame = 0;

  tariffRail.addEventListener('scroll', () => {
    cancelAnimationFrame(paintFrame);
    paintFrame = requestAnimationFrame(paintTariffDepth);
  }, { passive: true });

  tariffRail.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.target.closest('a, button, summary, details')) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartScroll = tariffRail.scrollLeft;
    tariffRail.classList.add('is-dragging');
    tariffRail.setPointerCapture(event.pointerId);
  });

  tariffRail.addEventListener('pointermove', event => {
    if (!dragging) return;
    tariffRail.scrollLeft = dragStartScroll - (event.clientX - dragStartX) * 1.08;
  });

  const finishTariffDrag = event => {
    if (!dragging) return;
    dragging = false;
    tariffRail.classList.remove('is-dragging');
    if (tariffRail.hasPointerCapture(event.pointerId)) tariffRail.releasePointerCapture(event.pointerId);
    animateTariffTo(Math.round(tariffRail.scrollLeft / (tariffStepSize() || 1)));
  };

  tariffRail.addEventListener('pointerup', finishTariffDrag);
  tariffRail.addEventListener('pointercancel', finishTariffDrag);
  paintTariffDepth();
}

document.querySelectorAll('[data-tariff-request]').forEach(link => {
  link.addEventListener('click', () => {
    const plan = `Цифровой сервис — тариф «${link.dataset.tariffRequest}»`;
    if (!serviceSelect) return;
    const optionExists = [...serviceSelect.options].some(option => option.value === plan);
    if (!optionExists) serviceSelect.add(new Option(plan, plan));
    serviceSelect.value = plan;
  });
});

const steps = [
  {
    n: '01',
    title: 'Определяем задачу',
    text: 'Фиксируем цель, аудиторию, ограничения и критерии результата. После встречи у вас остаётся понятное описание задачи.',
    result: 'Бриф и карта задачи',
    time: '1–2 дня'
  },
  {
    n: '02',
    title: 'Собираем структуру',
    text: 'Прорабатываем логику страниц, пользовательские сценарии и приоритеты контента до визуального дизайна.',
    result: 'Прототип и структура',
    time: '2–4 дня'
  },
  {
    n: '03',
    title: 'Создаём дизайн',
    text: 'Определяем композицию, типографику, цвет и графику. Собираем ключевые экраны в едином визуальном языке.',
    result: 'Концепция и макеты',
    time: '4–7 дней'
  },
  {
    n: '04',
    title: 'Готовим к запуску',
    text: 'Делаем адаптивы, проверяем состояния элементов и передаём аккуратно организованные материалы для разработки.',
    result: 'Адаптивы и передача',
    time: '2–5 дней'
  }
];

let stepIndex = 0;
const nextStep = document.querySelector('.next-step');
const processNodes = [...document.querySelectorAll('[data-process-step]')];

function renderProcessStep(index) {
  const step = steps[index];
  const processSection = document.querySelector('.process-v16');
  if (processSection) processSection.dataset.activeStep = String(index);
  const current = document.querySelector('#process-step-current');
  const title = document.querySelector('#step-title');
  const text = document.querySelector('#step-text');
  const result = document.querySelector('#step-result');
  const time = document.querySelector('#step-time');

  if (current) current.textContent = step.n;
  if (title) title.textContent = step.title;
  if (text) text.textContent = step.text;
  if (result) result.textContent = step.result;
  if (time) time.textContent = step.time;

  processNodes.forEach((node, nodeIndex) => {
    const active = nodeIndex === index;
    node.classList.toggle('is-active', active);
    node.setAttribute('aria-current', active ? 'step' : 'false');
  });

  if (nextStep) nextStep.textContent = index === steps.length - 1 ? 'Сначала' : 'Следующий этап';
}

processNodes.forEach((node, index) => node.addEventListener('click', () => {
  stepIndex = index;
  renderProcessStep(stepIndex);
}));

nextStep?.addEventListener('click', () => {
  stepIndex = (stepIndex + 1) % steps.length;
  renderProcessStep(stepIndex);
});

renderProcessStep(stepIndex);

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('is-visible'));
}

const form = document.querySelector('#lead-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Заявка Higezstar: ${data.get('service')}`);
  const body = encodeURIComponent(
    `Имя: ${data.get('name')}\n` +
    `Компания: ${data.get('company') || '—'}\n` +
    `Email: ${data.get('email')}\n` +
    `Услуга: ${data.get('service')}\n` +
    `Сроки: ${data.get('deadline') || '—'}\n\n` +
    `О задаче:\n${data.get('message')}`
  );
  document.querySelector('.form-status').textContent = 'Открываю письмо в вашем почтовом приложении…';
  window.location.href = `mailto:soldatkinadp@yandex.ru?subject=${subject}&body=${body}`;
});

// iOS browsers use WebKit and can render transparent WebM with a black canvas.
// The class activates the PNG fallback without affecting desktop animation.
(() => {
  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) document.documentElement.classList.add('ios-webkit');
})();
