const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu.hidden = open;
});

mobileMenu?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const serviceData = {
  design: {
    kicker: 'Наши решения',
    title: 'Создаём понятный<br>и узнаваемый образ',
    desc: 'Фиксируем цену после короткого брифа и собираем решение, которое можно реально использовать.',
    cards: [
      { n: '01', title: 'Веб-дизайн', text: 'Лендинги, корпоративные сайты и дизайн интерфейсов.', cls: 'card-white rotate-left' },
      { n: '02', title: 'Графический дизайн', text: 'Материалы для понятной и цельной коммуникации.', cls: 'card-mint rotate-right' },
      { n: '03', title: 'Редизайн', text: 'Пересобираем продукт без потери узнаваемости.', cls: 'card-red rotate-left-small' },
      { n: '04', title: 'Айдентика', text: 'Логотип, визуальная система и правила применения.', cls: 'card-blue rotate-right-small' }
    ],
    boardKicker: 'подробнее',
    boardTitle: 'Веб-дизайн',
    boardButtons: [
      { n: '01', service: 'Лендинг', price: 'от 40 000 ₽', label: 'Лендинг', small: 'от 40 000' },
      { n: '02', service: 'Лонгрид', price: 'от 40 000 ₽', label: 'Лонгрид', small: 'от 40 000' },
      { n: '03', service: 'Многостраничный сайт', price: 'от 60 000 ₽', label: 'Многостраничный сайт', small: 'от 60 000' },
      { n: '04', service: 'Интернет-магазин', price: 'от 50 000 ₽', label: 'Интернет-магазин', small: 'от 50 000' }
    ],
    meta: [
      { label: 'стоимость', value: 'от 40 000 ₽' },
      { label: 'срок', value: 'от 2 недель' }
    ],
    list: [
      'Структура и пользовательские сценарии',
      'Визуальная концепция',
      'Макеты для desktop и mobile'
    ],
    cta: null
  },
  digital: {
    kicker: 'Цифровые сервисы',
    title: 'Помогаем внедрять<br>готовые инструменты',
    desc: 'Подбираем сервис под конкретную задачу, настраиваем доступ и объясняем команде, как им пользоваться.',
    cards: [
      { n: '01', title: 'Таск-менеджеры', text: 'Структура задач, роли, этапы и контроль процесса.', cls: 'card-white rotate-left' },
      { n: '02', title: 'CRM и формы', text: 'Сбор и обработка заявок без ручной каши.', cls: 'card-mint rotate-right' },
      { n: '03', title: 'Базы знаний', text: 'Единое пространство для инструкций и материалов.', cls: 'card-red rotate-left-small' },
      { n: '04', title: 'Автоматизация', text: 'Настройка интеграций и логики внутри сервиса.', cls: 'card-blue rotate-right-small' }
    ],
    boardKicker: 'настройка под ключ',
    boardTitle: 'Цифровые продукты',
    boardButtons: [
      { n: '01', service: 'Таск-менеджеры', price: 'от 25 000 ₽', label: 'Таск-менеджеры', small: 'структура задач и ролей' },
      { n: '02', service: 'CRM и формы', price: 'от 30 000 ₽', label: 'CRM и формы', small: 'сбор и обработка заявок' },
      { n: '03', service: 'Базы знаний', price: 'от 20 000 ₽', label: 'Базы знаний', small: 'единое пространство команды' },
      { n: '04', service: 'Автоматизация', price: 'от 35 000 ₽', label: 'Автоматизация', small: 'интеграции и сценарии' }
    ],
    meta: [
      { label: 'стоимость', value: 'от 25 000 ₽' },
      { label: 'срок', value: 'от 5 дней' }
    ],
    list: [
      'Подбор подходящего инструмента',
      'Настройка доступов и структуры',
      'Короткая передача и инструкция команде'
    ],
    cta: 'Подобрать решение'
  }
};

const servicesKicker = document.querySelector('#services-kicker');
const servicesTitle = document.querySelector('#services-title');
const servicesDesc = document.querySelector('#services-desc');
const servicesCards = document.querySelector('#services-cards');
const boardKicker = document.querySelector('#board-kicker');
const boardTitle = document.querySelector('#board-title');
const priceGrid = document.querySelector('#price-grid');
const boardMeta = document.querySelector('#board-meta');
const boardList = document.querySelector('#board-list');
const boardCta = document.querySelector('#board-cta');
const select = document.querySelector('#service-select');

function renderCards(cards) {
  servicesCards.innerHTML = cards.map(card => `
    <article class="service-card ${card.cls}">
      <span>${card.n}</span>
      <h3>${card.title}</h3>
      <p>${card.text}</p>
    </article>
  `).join('');
}

function renderBoardButtons(buttons, meta) {
  priceGrid.innerHTML = buttons.map((button, index) => `
    <button type="button" class="${index === 0 ? 'is-active' : ''}" data-service="${button.service}" data-price="${button.price}">
      <span>${button.n}</span>
      <b>${button.label}</b>
      <small>${button.small}</small>
    </button>
  `).join('');

  boardMeta.innerHTML = meta.map(item => `
    <div>
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join('');

  priceGrid.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      priceGrid.querySelectorAll('button').forEach((x) => x.classList.remove('is-active'));
      btn.classList.add('is-active');
      const priceValue = btn.dataset.price;
      const metaPrice = boardMeta.querySelector('strong');
      if (metaPrice) metaPrice.textContent = priceValue;
      if (select) select.value = btn.dataset.service;
    });
  });
}

function renderServices(type) {
  const data = serviceData[type];
  servicesKicker.textContent = data.kicker;
  servicesTitle.innerHTML = data.title;
  servicesDesc.textContent = data.desc;
  boardKicker.textContent = data.boardKicker;
  boardTitle.textContent = data.boardTitle;
  renderCards(data.cards);
  renderBoardButtons(data.boardButtons, data.meta);
  boardList.innerHTML = data.list.map(item => `<li>${item}</li>`).join('');

  if (data.cta) {
    boardCta.textContent = data.cta;
    boardCta.classList.remove('is-hidden');
  } else {
    boardCta.classList.add('is-hidden');
  }
}

const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    renderServices(tab.dataset.tab);
  });
});

renderServices('design');

const steps = [
  { n:'01', title:'Определяем задачу', text:'Фиксируем цель, аудиторию, ограничения и критерии результата. После встречи у вас остаётся понятное описание задачи.', result:'Бриф и карта задачи', time:'1–2 дня' },
  { n:'02', title:'Собираем структуру', text:'Прорабатываем логику страницы, пользовательские сценарии и приоритеты контента до визуального дизайна.', result:'Прототип и структура', time:'2–4 дня' },
  { n:'03', title:'Создаём визуальную систему', text:'Определяем композицию, типографику, цвет, графику и собираем ключевые экраны в едином стиле.', result:'Дизайн-концепция', time:'4–7 дней' },
  { n:'04', title:'Готовим к запуску', text:'Делаем адаптивы, проверяем состояния элементов и передаём аккуратно организованные материалы для разработки.', result:'Desktop + mobile макеты', time:'2–5 дней' }
];

let stepIndex = 0;
const nextStep = document.querySelector('.next-step');
nextStep?.addEventListener('click', () => {
  stepIndex = (stepIndex + 1) % steps.length;
  const s = steps[stepIndex];
  document.querySelector('#step-number').textContent = s.n;
  document.querySelector('#step-title').textContent = s.title;
  document.querySelector('#step-text').textContent = s.text;
  document.querySelector('#step-result').textContent = s.result;
  document.querySelector('#step-time').textContent = s.time;
  document.querySelector('#step-progress').style.width = `${(stepIndex + 1) * 25}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const form = document.querySelector('#lead-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Заявка Higezstar: ${data.get('service')}`);
  const body = encodeURIComponent(
    `Имя: ${data.get('name')}\nКомпания: ${data.get('company') || '—'}\nEmail: ${data.get('email')}\nУслуга: ${data.get('service')}\nСроки: ${data.get('deadline') || '—'}\n\nО задаче:\n${data.get('message')}`
  );
  document.querySelector('.form-status').textContent = 'Открываю письмо в вашем почтовом приложении…';
  window.location.href = `mailto:soldatkinadp@yandex.ru?subject=${subject}&body=${body}`;
});
