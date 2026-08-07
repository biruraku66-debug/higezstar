const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.querySelector('.mobile-menu');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));mobileMenu.hidden=open;});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false')}));

const tabs=document.querySelectorAll('.tab');
const panels=document.querySelectorAll('[data-panel]');
tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>{t.classList.toggle('is-active',t===tab);t.setAttribute('aria-selected',String(t===tab))});panels.forEach(p=>p.hidden=p.dataset.panel!==tab.dataset.tab)}));

document.querySelectorAll('.price-grid button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.price-grid button').forEach(x=>x.style.background='');btn.style.background='#3478ff';btn.style.color='#fff';document.querySelector('#selected-price').textContent=btn.dataset.price;const select=document.querySelector('#service-select');select.value=btn.dataset.service;}));

const steps=[
 {n:'01',title:'Определяем задачу',text:'Фиксируем цель, аудиторию, ограничения и критерии результата. После встречи у вас остаётся понятное описание задачи.',result:'Бриф и карта задачи',time:'1–2 дня'},
 {n:'02',title:'Собираем структуру',text:'Прорабатываем логику страницы, пользовательские сценарии и приоритеты контента до визуального дизайна.',result:'Прототип и структура',time:'2–4 дня'},
 {n:'03',title:'Создаём визуальную систему',text:'Определяем композицию, типографику, цвет, графику и собираем ключевые экраны в едином стиле.',result:'Дизайн-концепция',time:'4–7 дней'},
 {n:'04',title:'Готовим к запуску',text:'Делаем адаптивы, проверяем состояния элементов и передаём аккуратно организованные материалы для разработки.',result:'Desktop + mobile макеты',time:'2–5 дней'}
];
let stepIndex=0;
const nextStep=document.querySelector('.next-step');
nextStep?.addEventListener('click',()=>{stepIndex=(stepIndex+1)%steps.length;const s=steps[stepIndex];document.querySelector('#step-number').textContent=s.n;document.querySelector('#step-title').textContent=s.title;document.querySelector('#step-text').textContent=s.text;document.querySelector('#step-result').textContent=s.result;document.querySelector('#step-time').textContent=s.time;document.querySelector('#step-progress').style.width=`${(stepIndex+1)*25}%`;});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const form=document.querySelector('#lead-form');
form?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent(`Заявка Higezstar: ${data.get('service')}`);const body=encodeURIComponent(`Имя: ${data.get('name')}\nКомпания: ${data.get('company')||'—'}\nEmail: ${data.get('email')}\nУслуга: ${data.get('service')}\nСроки: ${data.get('deadline')||'—'}\n\nО задаче:\n${data.get('message')}`);document.querySelector('.form-status').textContent='Открываю письмо в вашем почтовом приложении…';window.location.href=`mailto:soldatkinadp@yandex.ru?subject=${subject}&body=${body}`;});

// =========================================================
// MOBILE — отдельная логика, не вмешивается в desktop.
// =========================================================
const mMenuButton=document.querySelector('.m-menu-button');
const mMenu=document.querySelector('.m-menu');
mMenuButton?.addEventListener('click',()=>{
  const open=mMenuButton.getAttribute('aria-expanded')==='true';
  mMenuButton.setAttribute('aria-expanded',String(!open));
  mMenu.hidden=open;
});
mMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mMenu.hidden=true;
  mMenuButton?.setAttribute('aria-expanded','false');
}));

const mTabs=[...document.querySelectorAll('.m-tab')];
const mPanels=[...document.querySelectorAll('[data-m-panel]')];
const mPriceTitle=document.querySelector('#m-price-title');
const mPriceKicker=document.querySelector('#m-price-kicker');
const mPriceMain=document.querySelector('#m-price-main');
const mPriceOptions=document.querySelector('#m-price-options');
const mPriceTerm=document.querySelector('#m-price-term');
const mPriceResult=document.querySelector('#m-price-result');
const mPriceList=document.querySelector('#m-price-list');
const mServiceSelect=document.querySelector('#m-service-select');

const mobilePriceData={
  design:{
    kicker:'Подробнее',title:'Веб-дизайн',main:'от 40 000 ₽',term:'от 2 недель',result:'desktop + mobile',
    options:[['01','Лендинг','от 40 000 ₽'],['02','Лонгрид','от 40 000 ₽'],['03','Многостраничный сайт','от 60 000 ₽'],['04','Интернет-магазин','от 50 000 ₽']],
    list:['Структура и пользовательские сценарии','Визуальная концепция','Макеты для desktop и mobile']
  },
  digital:{
    kicker:'Настройка под ключ',title:'Цифровые сервисы',main:'от 25 000 ₽',term:'от 5 дней',result:'готовая система',
    options:[['01','Таск-менеджеры','от 25 000 ₽'],['02','CRM и формы','от 30 000 ₽'],['03','Базы знаний','от 20 000 ₽'],['04','Автоматизация','от 35 000 ₽']],
    list:['Подбор подходящего инструмента','Настройка доступов и структуры','Передача и инструкция команде']
  }
};

function bindMobilePriceButtons(){
  mPriceOptions?.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
    mPriceOptions.querySelectorAll('button').forEach(x=>x.classList.remove('is-active'));
    btn.classList.add('is-active');
    mPriceMain.textContent=btn.dataset.mPrice;
    if(mServiceSelect){
      const service=btn.dataset.mService;
      const existing=[...mServiceSelect.options].find(o=>o.textContent===service);
      if(existing) mServiceSelect.value=service;
      else mServiceSelect.value='Цифровой сервис';
    }
  }));
}

function renderMobilePricing(type){
  const d=mobilePriceData[type];
  if(!d||!mPriceOptions)return;
  mPriceKicker.textContent=d.kicker;
  mPriceTitle.textContent=d.title;
  mPriceMain.textContent=d.main;
  mPriceTerm.textContent=d.term;
  mPriceResult.textContent=d.result;
  mPriceOptions.innerHTML=d.options.map((o,i)=>`<button type="button" class="${i===0?'is-active':''}" data-m-service="${o[1]}" data-m-price="${o[2]}"><span>${o[0]}</span>${o[1]}</button>`).join('');
  mPriceList.innerHTML=d.list.map(x=>`<li>${x}</li>`).join('');
  bindMobilePriceButtons();
}

mTabs.forEach(tab=>tab.addEventListener('click',()=>{
  const type=tab.dataset.mTab;
  mTabs.forEach(t=>{const active=t===tab;t.classList.toggle('is-active',active);t.setAttribute('aria-selected',String(active));});
  mPanels.forEach(p=>p.hidden=p.dataset.mPanel!==type);
  renderMobilePricing(type);
}));
bindMobilePriceButtons();

const mForm=document.querySelector('#m-lead-form');
mForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(mForm);
  const subject=encodeURIComponent(`Заявка Higezstar: ${data.get('service')}`);
  const body=encodeURIComponent(`Имя: ${data.get('name')}\nКомпания: ${data.get('company')||'—'}\nEmail: ${data.get('email')}\nУслуга: ${data.get('service')}\n\nО задаче:\n${data.get('message')}`);
  const status=mForm.querySelector('.m-form-status');
  if(status)status.textContent='Открываю письмо в почтовом приложении…';
  window.location.href=`mailto:soldatkinadp@yandex.ru?subject=${subject}&body=${body}`;
});
