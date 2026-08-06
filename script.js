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

function activateTab(activeTab) {
  tabs.forEach(tab => {
    const selected = tab === activeTab;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
  panels.forEach(panel => {
    panel.hidden = panel.dataset.panel !== activeTab.dataset.tab;
  });
}

tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));

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
  access: {
    title: 'Доступ к сервисам',
    text: 'Подбираем готовый продукт и предоставляем доступ без затрат на собственную разработку.',
    price: 'от 5 000 ₽ / мес',
    time: 'от 1 дня',
    includes: ['Подбор сервиса под задачу', 'Оформление доступа', 'Короткая инструкция для команды'],
    formValue: 'Доступ к цифровому сервису'
  },
  setup: {
    title: 'Настройка',
    text: 'Переносим реальные процессы компании в выбранный сервис и убираем лишние функции.',
    price: 'от 15 000 ₽',
    time: 'от 3 дней',
    includes: ['Структура задач и ролей', 'Настройка полей и сценариев', 'Тестирование рабочего процесса'],
    formValue: 'Настройка цифрового сервиса'
  },
  launch: {
    title: 'Внедрение',
    text: 'Подключаем команду, переносим необходимые данные и сопровождаем первые рабочие сценарии.',
    price: 'от 25 000 ₽',
    time: 'от 1 недели',
    includes: ['Подключение сотрудников', 'Перенос исходных данных', 'Обучение и запуск'],
    formValue: 'Внедрение цифрового сервиса'
  },
  support: {
    title: 'Поддержка',
    text: 'Остаёмся на связи после запуска, исправляем настройки и развиваем решение вместе с компанией.',
    price: 'от 8 000 ₽ / мес',
    time: 'ежемесячно',
    includes: ['Ответы на вопросы команды', 'Корректировка настроек', 'Развитие рабочих сценариев'],
    formValue: 'Поддержка цифрового сервиса'
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
    title: 'Создаём визуальную систему',
    text: 'Определяем композицию, типографику, цвет и графику. Собираем ключевые экраны в едином стиле.',
    result: 'Дизайн-концепция',
    time: '4–7 дней'
  },
  {
    n: '04',
    title: 'Готовим к запуску',
    text: 'Делаем адаптивы, проверяем состояния элементов и передаём аккуратно организованные материалы для разработки.',
    result: 'Desktop + mobile макеты',
    time: '2–5 дней'
  }
];

let stepIndex = 0;
const nextStep = document.querySelector('.next-step');

function renderStep(index) {
  const step = steps[index];
  document.querySelector('#step-number').textContent = step.n;
  document.querySelector('#step-title').textContent = step.title;
  document.querySelector('#step-text').textContent = step.text;
  document.querySelector('#step-result').textContent = step.result;
  document.querySelector('#step-time').textContent = step.time;
  document.querySelector('#step-progress').style.width = `${(index + 1) * 25}%`;
  nextStep.textContent = index === steps.length - 1 ? 'Сначала' : 'Следующий этап';
}

nextStep?.addEventListener('click', () => {
  stepIndex = (stepIndex + 1) % steps.length;
  renderStep(stepIndex);
});

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
