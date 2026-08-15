const briefViews=[...document.querySelectorAll('[data-brief-view]')],briefStepNode=document.querySelector('#brief-step'),briefCounter=document.querySelector('#brief-counter'),briefProgress=document.querySelector('#brief-progress'),briefBack=document.querySelector('#brief-back'),briefNext=document.querySelector('#brief-next'),briefStatus=document.querySelector('#brief-status'),briefForm=document.querySelector('#brief-form');
const choice=(id,title,options,hint='',multiple=false,optional=false)=>({id,title,options,hint,multiple,optional,type:'choice'});
const fields=(id,title,fieldList,hint='')=>({id,title,fields:fieldList,hint,type:'fields'});
const serviceStep=choice('service','Что нужно сделать?',['Веб-дизайн','Графический дизайн','Айдентика','Редизайн','Цифровой сервис','Пока не уверен'],'Выберите ближайший вариант. Если сомневаетесь — можно выбрать «Пока не уверен».');
const branches={
  'Веб-дизайн':[
    choice('websiteType','Какой сайт нужен?',['Лендинг','Многостраничный сайт','Интернет-магазин','Лонгрид','Другой формат','Пока не уверен']),
    {id:'websiteState',title:'Сайт уже существует?',hint:'Если сайт уже работает, пришлите ссылку — так мы быстрее поймём объём обновления.',type:'website-state',options:['Да, его нужно обновить','Нет, делаем с нуля','Есть только наброски / прототип']}
  ],
  'Графический дизайн':[
    choice('graphicsType','Что нужно оформить?',['Посты / карточки для соцсетей','Баннеры / реклама','Плакаты / афиши','Полиграфия','Презентация','Мерч','Другое'],'Можно выбрать несколько вариантов.',true),
    choice('graphicsUsage','Где это будет использоваться?',['Соцсети','Сайт','Реклама','Печать','Мероприятие','В нескольких местах']),
    choice('graphicsStyle','Есть ли стиль, которого нужно придерживаться?',['Да, есть фирменный стиль','Есть отдельные материалы, но системы нет','Нет, можно предложить направление'])
  ],
  'Айдентика':[
    choice('identityType','Что нужно разработать?',['Только логотип','Логотип + базовая визуальная система','Полная айдентика','Пока не понимаю объём']),
    choice('identityState','Проект уже существует?',['Да, бренд уже работает','Только запускаемся','Это личный проект']),
    choice('identityKeep','Что обязательно нужно сохранить?',['Название','Существующий логотип / знак','Определённые цвета','Какой-то символ / образ','Ничего — начинаем с чистого листа'],'Можно выбрать несколько вариантов.',true)
  ],
  'Редизайн':[
    choice('redesignType','Что переделываем?',['Сайт','Логотип / айдентику','Графические материалы','Интерфейс / приложение','Несколько вещей сразу']),
    choice('redesignProblem','Что сейчас больше всего не устраивает?',['Выглядит устаревшим','Выглядит несобранно','Не соответствует проекту / бренду','Неудобно пользоваться','Плохо работает на мобильных','Просто хочется освежить','Сложно сказать — хочу взгляд со стороны'],'Можно выбрать несколько вариантов.',true),
    choice('redesignKeep','Что точно нужно сохранить?',['Логотип','Цвета','Структуру / расположение','Контент','Узнаваемость текущего дизайна','Ничего обязательного'],'',true)
  ],
  'Цифровой сервис':[
    choice('digitalProduct','Что это за продукт?',['Веб-сервис','Мобильное приложение','Личный кабинет','Внутренний сервис для сотрудников','Другое','Пока не уверен']),
    choice('digitalStage','На каком этапе проект?',['Пока только идея','Есть описание / техническое задание','Есть прототип','Продукт уже работает и нужен редизайн']),
    choice('digitalUsers','Кто будет им пользоваться?',['Клиенты','Сотрудники компании','Партнёры','Несколько типов пользователей','Пока не знаю'])
  ]
};
const common=[
  fields('project','Расскажите немного о проекте',[{id:'projectDescription',label:'Что вы делаете, продаёте или запускаете?',type:'textarea',required:true,placeholder:'Например: запускаем небольшую кофейню в Петербурге, сейчас есть только название и логотип…'}],'Двух-трёх предложений достаточно.'),
  choice('existingAssets','Что у вас уже есть?',['Логотип','Фирменный стиль','Тексты','Фото / видео','Сайт','Макеты / прототипы','Презентация / материалы о проекте','Ничего — начинаем с нуля'],'Можно выбрать несколько вариантов.',true),
  fields('references','Покажите, что вам нравится',[
    {id:'likes',label:'Ссылки или короткий комментарий',type:'textarea',placeholder:'Сайты, бренды, Pinterest, Behance или просто описание.'},
    {id:'dislikes',label:'А что точно не нравится?',type:'textarea',placeholder:'Например: слишком минималистично, много чёрного, корпоративный стиль…'},
    {id:'mustHave',label:'Что мне обязательно нужно учесть?',type:'textarea',placeholder:'Цвет, важный элемент, мероприятие или другое ограничение.'}
  ],'Все поля на этом экране необязательные.'),
  {id:'deadline',title:'Когда нужен результат?',type:'deadline',options:['Как можно скорее','Есть конкретная дата','Жёсткого дедлайна нет']},
  choice('budget','Ориентир по бюджету',['До 30 000 ₽','30–60 000 ₽','60–100 000 ₽','100 000 ₽ +','Пока не знаю'],'Необязательный вопрос — можно пропустить.',false,true),
  fields('contact','Как с вами связаться?',[
    {id:'name',label:'Имя',type:'text',required:true,autocomplete:'name',placeholder:'Как к вам обращаться'},
    {id:'contact',label:'Telegram или email',type:'text',required:true,placeholder:'@username или name@example.com'},
    {id:'consent',label:'Я согласен на обработку персональных данных',type:'checkbox',required:true}
  ])
];
const help=[
  fields('helpStory','Расскажите, что происходит',[{id:'helpDescription',label:'Можно своими словами и без терминов',type:'textarea',required:true,placeholder:'Например: запускаем новый проект, пока есть только идея и название и совершенно не понимаем, с чего начать…'}],'Что вы хотите запустить, изменить или оформить?'),
  choice('helpState','Проект уже существует?',['Только запускается','Уже работает, но хочется что-то изменить','Есть только идея / наброски','Сложно ответить']),
  choice('helpProblem','Что сейчас больше всего мешает?',['Не знаю, с чего начать','Всё выглядит несобранно','Нужно нормально представить проект','Есть идея, но нет визуального оформления','Есть дизайн, но он уже не нравится','Нужно подготовиться к запуску','Сложно сформулировать — хочу обсудить']),
  choice('helpAssets','Что уже есть?',['Название','Логотип','Фирменный стиль','Тексты','Фото / видео','Сайт / приложение','Какие-то старые макеты','Пока ничего'],'Можно выбрать несколько вариантов.',true),
  fields('helpReferences','Есть что-то, что нравится визуально?',[
    {id:'helpLikes',label:'Ссылки или комментарий',type:'textarea',placeholder:'Если есть — пришлите ссылки или опишите. Если нет — спокойно пропускайте.'},
    {id:'helpDislikes',label:'Есть что-то, чего точно не хочется?',type:'textarea',placeholder:'Необязательное поле'}
  ],'Этот экран можно пропустить.'),
  {id:'helpDeadline',title:'Когда хотелось бы получить результат?',type:'deadline',options:['Как можно скорее','Есть конкретная дата','Срок пока не принципиален']},
  common[4],common[5]
];
const labels={service:'Услуга',websiteType:'Формат сайта',websiteState:'Состояние сайта',currentWebsite:'Текущий сайт',websiteIssue:'Что не устраивает',graphicsType:'Что оформить',graphicsUsage:'Где использовать',graphicsStyle:'Фирменный стиль',identityType:'Объём айдентики',identityState:'Состояние проекта',identityKeep:'Что сохранить',redesignType:'Что переделать',redesignProblem:'Проблема',redesignKeep:'Что сохранить',digitalProduct:'Тип продукта',digitalStage:'Этап продукта',digitalUsers:'Пользователи',projectDescription:'О проекте',existingAssets:'Что уже есть',likes:'Что нравится',dislikes:'Что не нравится',mustHave:'Что учесть',deadline:'Срок',deadlineDate:'Дата',budget:'Бюджет',helpDescription:'Описание задачи',helpState:'Состояние проекта',helpProblem:'Что мешает',helpAssets:'Что уже есть',helpLikes:'Что нравится',helpDislikes:'Что не хочется',helpDeadline:'Срок',helpDeadlineDate:'Дата',name:'Имя',contact:'Контакт'};
const briefState={mode:null,index:0,flow:[],answers:{}};
let briefSubmitting=false;
function showView(name){briefViews.forEach(view=>{view.hidden=view.dataset.briefView!==name})}
function serviceFlow(service){return[serviceStep,...(branches[service]||[]),...common]}
function startBrief(mode){briefState.mode=mode;briefState.index=0;briefState.answers={};briefState.flow=mode==='help'?help:[serviceStep,...common];showView('wizard');renderStep();document.querySelector('#request')?.scrollIntoView({behavior:'smooth',block:'start'})}
function resetBrief(){briefState.mode=null;briefState.index=0;briefState.flow=[];briefState.answers={};showView('start')}
const isSelected=(value,answer,multiple)=>multiple?Array.isArray(answer)&&answer.includes(value):answer===value;
const esc=(value='')=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function optionGrid(step,answer=briefState.answers[step.id]){return`<div class="brief-options${step.multiple?' is-multiple':''}">${step.options.map(option=>`<button type="button" class="brief-option${isSelected(option,answer,step.multiple)?' is-selected':''}" data-answer-value="${esc(option)}">${option}</button>`).join('')}</div>`}
function fieldMarkup(field){const value=briefState.answers[field.id]??'';if(field.type==='checkbox')return`<label class="brief-field brief-consent"><input class="brief-checkbox" type="checkbox" data-field-id="${field.id}" ${value?'checked':''}><span>${field.label}</span></label>`;const attrs=`class="brief-control" data-field-id="${field.id}" placeholder="${esc(field.placeholder||'')}" ${field.autocomplete?`autocomplete="${field.autocomplete}"`:''}`;const control=field.type==='textarea'?`<textarea ${attrs}>${esc(value)}</textarea>`:`<input ${attrs} type="${field.type||'text'}" value="${esc(value)}">`;return`<label class="brief-field"><span>${field.label}${field.required?' *':''}</span>${control}</label>`}
function specialMarkup(step){if(step.type==='website-state'){const show=briefState.answers.websiteState==='Да, его нужно обновить',issue={id:'websiteIssue',options:['Внешний вид','Неудобно пользоваться','Сложно понять, что мы предлагаем','Плохо выглядит на телефоне','Хочется полностью обновить','Не знаю — хочу услышать ваше мнение']};return`${optionGrid(step)}<div class="brief-inline-extra" ${show?'':'hidden'}>${fieldMarkup({id:'currentWebsite',label:'Ссылка на текущий сайт',type:'url',required:true,placeholder:'https://…'})}<p class="brief-step-hint">Что в нём сейчас больше всего не устраивает?</p>${optionGrid(issue,briefState.answers.websiteIssue)}</div>`}if(step.type==='deadline'){const dateId=step.id==='helpDeadline'?'helpDeadlineDate':'deadlineDate',show=briefState.answers[step.id]==='Есть конкретная дата';return`${optionGrid(step)}<div class="brief-inline-extra" ${show?'':'hidden'}>${fieldMarkup({id:dateId,label:'Выберите дату',type:'date',required:true})}</div>`}return''}
function renderStep(){const step=briefState.flow[briefState.index];if(!step||!briefStepNode)return;briefStatus.textContent='';briefCounter.textContent=`${briefState.index+1} / ${briefState.flow.length}`;briefProgress.style.width=`${(briefState.index+1)/briefState.flow.length*100}%`;briefBack.disabled=false;briefBack.textContent=briefState.index===0?'К выбору':'Назад';briefNext.textContent=briefState.index===briefState.flow.length-1?'Отправить задачу →':'Дальше →';let body='';if(step.type==='choice')body=optionGrid(step);if(step.type==='fields')body=`<div class="brief-fields">${step.fields.map(fieldMarkup).join('')}</div>`;if(step.type==='website-state'||step.type==='deadline')body=specialMarkup(step);briefStepNode.innerHTML=`<p class="brief-step-kicker">Короткий бриф</p><h3>${step.title}</h3>${step.hint?`<p class="brief-step-hint">${step.hint}</p>`:'<div class="brief-step-hint"></div>'}${body}`;bindStep(step)}
function choose(step,value){if(step.multiple){const current=Array.isArray(briefState.answers[step.id])?[...briefState.answers[step.id]]:[];briefState.answers[step.id]=current.includes(value)?current.filter(item=>item!==value):[...current,value]}else briefState.answers[step.id]=value;if(step.id==='service'&&value!=='Пока не уверен'){briefState.flow=serviceFlow(value);briefCounter.textContent=`1 / ${briefState.flow.length}`;briefProgress.style.width=`${100/briefState.flow.length}%`}if(step.type==='website-state'||step.type==='deadline'){renderStep();return}briefStepNode.querySelectorAll('[data-answer-value]').forEach(button=>button.classList.toggle('is-selected',isSelected(button.dataset.answerValue,briefState.answers[step.id],step.multiple)))}
function bindStep(step){briefStepNode.querySelectorAll('[data-answer-value]').forEach(button=>button.addEventListener('click',()=>{const nested=button.closest('.brief-inline-extra')&&step.type==='website-state';if(nested){briefState.answers.websiteIssue=button.dataset.answerValue;button.closest('.brief-options').querySelectorAll('.brief-option').forEach(item=>item.classList.toggle('is-selected',item===button))}else choose(step,button.dataset.answerValue)}));briefStepNode.querySelectorAll('[data-field-id]').forEach(control=>control.addEventListener(control.type==='checkbox'?'change':'input',()=>{briefState.answers[control.dataset.fieldId]=control.type==='checkbox'?control.checked:control.value}))}
function valid(step){if(step.optional)return true;if(step.type==='choice'){const answer=briefState.answers[step.id];return step.multiple?Array.isArray(answer)&&answer.length>0:Boolean(answer)}if(step.type==='fields')return step.fields.every(field=>!field.required||Boolean(briefState.answers[field.id]));if(step.type==='website-state'){if(!briefState.answers.websiteState)return false;return briefState.answers.websiteState!=='Да, его нужно обновить'||Boolean(briefState.answers.currentWebsite&&briefState.answers.websiteIssue)}if(step.type==='deadline'){if(!briefState.answers[step.id])return false;if(briefState.answers[step.id]==='Есть конкретная дата'){const id=step.id==='helpDeadline'?'helpDeadlineDate':'deadlineDate';return Boolean(briefState.answers[id])}}return true}
async function submitBrief(){
  if(briefSubmitting)return;
  const service=briefState.mode==='help'?'Нужна помощь с определением задачи':briefState.answers.service;
  const lines=Object.entries(briefState.answers)
    .filter(([key,value])=>key!=='consent'&&value!==''&&value!==false&&value!=null)
    .map(([key,value])=>`${labels[key]||key}: ${Array.isArray(value)?value.join(', '):value}`);
  const contact=String(briefState.answers.contact||'').trim();
  const payload={
    _subject:`Новая заявка Higezstar: ${service}`,
    Источник:'https://higezstar.ru/',
    Имя:briefState.answers.name||'—',
    Контакт:contact||'—',
    Услуга:service,
    Ответы:lines.join('\n')
  };
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)){
    payload.email=contact;
    payload._replyto=contact;
  }
  briefSubmitting=true;
  briefNext.disabled=true;
  briefNext.textContent='Отправляем…';
  briefStatus.textContent='Отправляем заявку…';
  try{
    await fetch('https://script.google.com/macros/s/AKfycbw3WHCF2tJXs6ai7AqPW1y4wrnAHGhvWm_vzhIzCAcI3o1-3bx6Jx65YErxZo97pQuT/exec',{
      method:'POST',
      mode:'no-cors',
      headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
      body:new URLSearchParams({payload:JSON.stringify(payload)}),
      keepalive:true
    });
    briefStatus.textContent='';
    showView('success');
  }catch(error){
    briefStatus.textContent='Не получилось отправить заявку. Проверьте интернет и попробуйте ещё раз или напишите на soldatkinadp@yandex.ru.';
  }finally{
    briefSubmitting=false;
    briefNext.disabled=false;
    if(!document.querySelector('[data-brief-view="success"]:not([hidden])'))briefNext.textContent='Отправить задачу →';
  }
}
document.querySelectorAll('[data-brief-mode]').forEach(button=>button.addEventListener('click',()=>startBrief(button.dataset.briefMode)));document.querySelectorAll('[data-brief-close]').forEach(button=>button.addEventListener('click',resetBrief));briefBack?.addEventListener('click',()=>{if(briefState.index===0){resetBrief();return}briefState.index--;renderStep()});briefNext?.addEventListener('click',()=>{const step=briefState.flow[briefState.index];if(!valid(step)){briefStatus.textContent='Выберите вариант или заполните обязательное поле.';return}if(step.id==='service'&&briefState.answers.service==='Пока не уверен'){startBrief('help');return}if(briefState.index===briefState.flow.length-1){submitBrief();return}briefState.index++;renderStep();document.querySelector('.brief-wizard')?.scrollIntoView({behavior:'smooth',block:'start'})});briefForm?.addEventListener('submit',event=>event.preventDefault());

