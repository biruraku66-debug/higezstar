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
