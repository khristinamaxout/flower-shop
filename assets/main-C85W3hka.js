import{e as n,i as f,h as v,j as M,k as F,l as P,f as b,b as x,m as E,n as Y,o as j,p as C,q as _,t as S,u as L,v as U,w as J,r as I,x as T,y as K,z as Q,A as W,B as X,C as Z,D as ee,E as te}from"./order-8aow55j7.js";const ie=`<svg class="header__logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
  <g stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 24V14c0-3 2.5-5.5 5.5-5.5"/>
    <path d="M14 8.5c-1.5-2.5-4.5-3.5-7-1.5"/>
    <path d="M14 8.5c1.5-2.5 4.5-3.5 7-1.5"/>
    <circle cx="14" cy="6" r="2" fill="#FFFFFF" stroke="none"/>
    <path d="M11.5 4c-.8-1.2-2-1.8-3.2-1"/>
    <path d="M16.5 4c.8-1.2 2-1.8 3.2-1"/>
  </g>
</svg>`;function ae(){return`
    <header class="header" role="banner">
      <div class="container header__inner">
        <a href="#" class="header__logo" aria-label="${n.name} — на главную">
          <span class="header__logo-badge">
            ${ie}
            <span class="header__logo-text">${n.logoLine}</span>
          </span>
          <span class="header__logo-name">${n.name}</span>
        </a>

        <nav class="header__nav" aria-label="Основная навигация">
          <a href="#catalog">Букеты</a>
          <a href="#catalog">Композиции</a>
          <a href="#gifts">Подарки</a>
          <a href="#plants">Растения</a>
          <a href="#scenarios">Поводы</a>
          <a href="#delivery">Доставка</a>
        </nav>

        <div class="header__actions">
          <a href="${n.phoneLink}" class="header__phone" aria-label="Позвонить">${n.phone}</a>
          <a href="#catalog" class="btn btn--primary btn--sm header__cta">Заказать</a>
          <a href="#catalog" class="header__cart" aria-label="Заказать">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L5 3H2"/></svg>
          </a>
          <button class="header__burger" aria-label="Открыть меню" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        <a href="#catalog">Букеты</a>
        <a href="#collections">Коллекции</a>
        <a href="#gift-finder">Подобрать подарок</a>
        <a href="#scenarios">Поводы</a>
        <a href="#plants">Растения</a>
        <a href="#gifts">Подарки</a>
        <a href="#delivery">Доставка</a>
        <a href="#reviews">Отзывы</a>
      </nav>
      <div class="mobile-menu__contact">
        <a href="${n.phoneLink}" class="mobile-menu__phone">${n.phone}</a>
        <div class="mobile-menu__social">
          <a href="${n.telegram}" class="social-pill" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="${n.vk}" class="social-pill" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
        </div>
      </div>
    </div>
  `}function se(){const e=document.querySelector(".header__burger"),t=document.getElementById("mobile-menu");if(!e||!t)return;const i=a=>{e.classList.toggle("is-active",a),t.classList.toggle("is-open",a),t.setAttribute("aria-hidden",!a),e.setAttribute("aria-expanded",a),document.body.classList.toggle("menu-open",a)};e.addEventListener("click",()=>i(!t.classList.contains("is-open"))),t.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>i(!1)))}function ne(){return`
    <section class="hero hero--poppy" aria-label="Главный экран">
      <div class="hero__split">
        <div class="hero__panel mobile-anim" data-delay="0">
          <p class="hero__eyebrow">${n.name} · Саратов</p>
          <h1 class="hero__title display-title">
            Цветы,<br>которые<br>говорят за&nbsp;вас.
          </h1>
          <p class="hero__subtitle">
            Букеты и подарки с доставкой по Саратову
          </p>
          <div class="hero__actions">
            <a href="#catalog" class="btn btn--primary btn--lg">Выбрать букет</a>
            <a href="#gift-finder" class="btn btn--hero-outline btn--lg">Подобрать подарок</a>
          </div>
        </div>
        <div class="hero__photo mobile-anim" data-delay="1">
          <img
            ${f(v.hero,"Авторский букет — Flora Atelier, доставка по Саратову",1200,900,{eager:!0,className:"hero__img"})}
          >
        </div>
      </div>
    </section>
  `}const re={featured:"category-card--featured",wide:"category-card--wide",tall:"category-card--tall"};function le(){return`
    <section class="section pattern-bg pattern-bg--section" id="catalog" aria-labelledby="catalog-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Каталог</p>
          <h2 class="section-title" id="catalog-title">Выберите направление</h2>
          <p class="section-subtitle">Букеты, композиции и всё, что превращает цветы в настоящий подарок</p>
        </header>
        <div class="categories-editorial categories-scroll">
          ${M.map((e,t)=>`
            <a href="#products" class="category-card ${re[e.size]||""} mobile-slide-in" data-category="${e.id}" style="--anim-delay:${t*.07}s">
              <div class="category-card__image">
                <img ${f(e.image,e.alt,400,533)}>
              </div>
              <div class="category-card__overlay">
                <span class="category-card__name">${e.name}</span>
                <span class="category-card__hint">Смотреть</span>
              </div>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `}function oe(e){document.querySelectorAll(".category-card").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault(),e==null||e(t.dataset.category)})})}const ce=["collection-card--large","","collection-card--tall","collection-card--wide","","collection-card--tall"];function de(){return`
    <section class="section section--alt" id="collections" aria-labelledby="collections-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Коллекции</p>
          <h2 class="section-title" id="collections-title">Найдите свой букет</h2>
        </header>
        <div class="collections-editorial collections-scroll">
          ${F.map((e,t)=>`
            <button type="button" class="collection-card ${ce[t]||""} mobile-slide-in" data-collection="${e.id}" data-filter="${e.filter}" style="--anim-delay:${t*.08}s">
              <div class="collection-card__image">
                <img ${f(e.image,e.alt,500,650)}>
              </div>
              <div class="collection-card__content">
                <h3 class="collection-card__title">${e.title}</h3>
                <p class="collection-card__subtitle">${e.subtitle}</p>
                <span class="collection-card__link">Подробнее →</span>
              </div>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `}function ue(e){document.querySelectorAll(".collection-card").forEach(t=>{t.addEventListener("click",()=>e==null?void 0:e(t.dataset.collection,t.dataset.filter))})}function pe(e,t={}){const{title:i="Выбирают чаще всего",subtitle:a="Каждый букет — маленькая история",id:s="products",emptyMessage:r=null}=t,o=e.length?e.map((u,l)=>H(u,l)).join(""):`<div class="products-empty"><p>${r||"Скоро появятся новые позиции — позвоните, подберём индивидуально."}</p></div>`;return`
    <section class="section" id="${s}" aria-labelledby="${s}-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Каталог</p>
          <h2 class="section-title" id="${s}-title">${i}</h2>
          <p class="section-subtitle" id="${s}-subtitle">${a}</p>
        </header>
        <div class="products-editorial" id="${s}-grid">${o}</div>
      </div>
    </section>
  `}function fe(e){return!e||!x[e]?"":`<span class="product-card__badge product-card__badge--${e}">${x[e]}</span>`}function H(e,t=0){const i=t*.06,a=e.oldPrice?`<span class="product-card__price-old">${b(e.oldPrice)}</span><span class="product-card__price">${b(e.price)}</span>`:`<span class="product-card__price">${b(e.price)}</span>`;return`
    <article class="product-card mobile-slide-up image-reveal" data-product-id="${e.id}" style="--anim-delay:${i}s">
      <button type="button" class="product-card__link" data-open-product="${e.id}" aria-label="Подробнее о ${e.name}">
        <div class="product-card__image">
          ${fe(e.badge)}
          <img ${f(e.image,e.alt,400,500)}>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__name">${e.name}</h3>
          ${e.tagline?`<p class="product-card__tagline">${e.tagline}</p>`:""}
          <div class="product-card__footer">
            <div class="product-card__pricing">${a}</div>
            <span class="product-card__more">Подробнее →</span>
          </div>
        </div>
      </button>
    </article>
  `}function ge(){return pe(P(8),{title:"Выбирают чаще всего",subtitle:"Каждый букет — маленькая история",id:"products"})}function R(e,t,i=null){var s;const a=document.getElementById(e);a&&(a.innerHTML=t.length?t.map((r,o)=>H(r,o)).join(""):`<div class="products-empty"><p>${i||"В этой подборке пока нет позиций."}</p></div>`,(s=window.initScrollAnimations)==null||s.call(window,a))}function me(e){document.addEventListener("click",t=>{const i=t.target.closest("[data-open-product]");i&&(t.preventDefault(),e==null||e(i.dataset.openProduct))})}const q=["recipient","occasion","budget"],ve=["Для кого","Повод","Бюджет"];function be(){return`
    <section class="section section--alt gift-finder-section" id="gift-finder" aria-labelledby="gift-finder-title">
      <div class="container">
        <div class="gift-finder-section__layout">
          <header class="section-header reveal">
            <p class="section-label">Помощник</p>
            <h2 class="section-title" id="gift-finder-title">Не знаете, что подарить?</h2>
            <p class="section-subtitle">
              Поможем выбрать цветы под человека, повод и ваш бюджет.
            </p>
          </header>

          <div class="gift-finder reveal" id="gift-finder-widget">
            <div class="gift-finder__steps" role="tablist" aria-label="Шаги подбора">
              ${ve.map((e,t)=>`
                <div class="gift-finder__step-indicator ${t===0?"is-active":""}" data-step-index="${t}">
                  <span class="gift-finder__step-num">${t+1}</span>
                  <span>${e}</span>
                </div>
              `).join("")}
            </div>

            <div class="gift-finder__wizard" id="gift-finder-wizard">
              <h3 class="gift-finder__question" id="gift-finder-question"></h3>
              <div class="gift-finder__options" id="gift-finder-options" role="group"></div>
            </div>

            <div class="gift-finder__results" id="gift-finder-results">
              <h3 class="gift-finder__question">Вам подойдёт</h3>
              <div class="gift-finder__results-grid" id="gift-finder-results-grid"></div>
              <div class="gift-finder__actions">
                <button class="btn btn--secondary" id="gift-finder-reset">Начать заново</button>
                <a href="#products" class="btn btn--ghost">Посмотреть варианты →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function he(){const e=document.getElementById("gift-finder-widget");if(!e)return;const t=document.getElementById("gift-finder-wizard"),i=document.getElementById("gift-finder-results"),a=document.getElementById("gift-finder-question"),s=document.getElementById("gift-finder-options"),r=document.getElementById("gift-finder-results-grid"),o=e.querySelectorAll(".gift-finder__step-indicator"),u=document.getElementById("gift-finder-reset"),l={recipient:null,occasion:null,budget:null};let d=0;const $={recipient:"Для кого выбираете?",occasion:"Какой повод?",budget:"Какой бюджет?"};function y(c){return c==="budget"?E.budget:E[c]}function O(){o.forEach((c,m)=>{c.classList.remove("is-active","is-done"),m<d&&c.classList.add("is-done"),m===d&&c.classList.add("is-active")})}function w(){const c=q[d];a.textContent=$[c];const m=y(c);s.innerHTML=m.map(g=>`
      <button
        class="gift-finder__option ${l[c]===g.id?"is-selected":""}"
        data-value="${g.id}"
        type="button"
      >${g.label}</button>
    `).join(""),s.querySelectorAll(".gift-finder__option").forEach(g=>{g.addEventListener("click",()=>z(c,g.dataset.value))}),O()}function z(c,m){l[c]=m,d<q.length-1?(d++,w()):N()}function N(){t.style.display="none",i.classList.add("is-visible"),o.forEach(p=>p.classList.add("is-done"));const c=E.budget.find(p=>p.id===l.budget),m=(c==null?void 0:c.max)??1/0,g=Y({recipient:l.recipient,occasion:l.occasion,budget:m});if(g.length===0){r.innerHTML=`
        <div class="gift-finder__empty">
          <p>Точного совпадения нет — но мы подберём идеальный вариант.</p>
          <a href="${n.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
        </div>
      `;return}r.innerHTML=g.slice(0,3).map(p=>`
      <article class="product-card">
        <div class="product-card__image">
          <img ${f(p.image,p.alt,400,500)}>
        </div>
        <div class="product-card__info">
          <h4 class="product-card__name">${p.name}</h4>
          <p class="product-card__desc">${p.description}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${b(p.price)}</span>
            <button class="btn btn--primary btn--sm" data-order-id="${p.id}">Заказать</button>
          </div>
        </div>
      </article>
    `).join("")}function V(){l.recipient=null,l.occasion=null,l.budget=null,d=0,t.style.display="",i.classList.remove("is-visible"),w()}u==null||u.addEventListener("click",V),w()}function _e(){return`
    <section class="section" id="scenarios" aria-labelledby="scenarios-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Поводы</p>
          <h2 class="section-title" id="scenarios-title">Иногда цветы говорят лучше слов</h2>
        </header>
        <div class="scenarios-editorial">
          ${j.map((e,t)=>`
            <button type="button" class="scenario-card mobile-slide-in" data-scenario-id="${e.id}" style="--anim-delay:${t*.08}s">
              <div class="scenario-card__image">
                <img ${f(e.image,e.alt,400,500)}>
              </div>
              <div class="scenario-card__content">
                <h3 class="scenario-card__title">${e.title}</h3>
                <p class="scenario-card__phrase">${e.phrase}</p>
              </div>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `}function ye(e){document.querySelectorAll(".scenario-card").forEach(t=>{t.addEventListener("click",()=>e==null?void 0:e(t.dataset.scenarioId))})}function $e(){return`
    <section class="section section--alt" id="gift-builder" aria-labelledby="gift-builder-title">
      <div class="container">
        <div class="gift-builder">
          <div class="gift-builder__visual reveal" id="gift-builder-visual">
            ${[{id:"bouquet",label:"Букет",image:v.giftBuilder.bouquet,alt:"Букет",price:2500},{id:"balloon",label:"Шар",image:v.giftBuilder.balloon,alt:"Воздушные шары",price:500},{id:"toy",label:"Игрушка",image:v.giftBuilder.toy,alt:"Мягкая игрушка",price:890},{id:"card",label:"Открытка",image:v.giftBuilder.card,alt:"Авторская открытка",price:350},{id:"souvenir",label:"Сувенир",image:v.giftBuilder.souvenir,alt:"Сувенир",price:650}].map((t,i)=>`
              ${i>0?'<span class="gift-builder__plus mobile-anim" data-delay="'+i+'" aria-hidden="true">+</span>':""}
              <button
                class="gift-builder__item mobile-anim is-selectable"
                data-delay="${i}"
                data-builder-id="${t.id}"
                data-builder-price="${t.price}"
                type="button"
                aria-pressed="false"
              >
                <div class="gift-builder__item-icon">
                  <img ${f(t.image,t.alt,80,80)}>
                </div>
                <span class="gift-builder__item-label">${t.label}</span>
              </button>
            `).join("")}
          </div>

          <div class="gift-builder__content reveal reveal-delay-2">
            <p class="section-label">Персональный подарок</p>
            <h2 class="section-title" id="gift-builder-title">Соберите подарок</h2>
            <p class="section-subtitle" style="margin: 1rem 0 1.5rem;">
              Объедините букет, шары, игрушку и открытку в один продуманный комплект.
            </p>
            <p class="gift-builder__total" id="gift-builder-total" aria-live="polite">
              Выберите элементы — <strong>от ${b(2500)}</strong>
            </p>
            <button class="btn btn--primary btn--lg btn--pulse" id="gift-builder-order" type="button" disabled>
              Собрать подарок
            </button>
          </div>
        </div>
      </div>
    </section>
  `}function we(e){var o;const t=document.getElementById("gift-builder-visual"),i=document.getElementById("gift-builder-total"),a=document.getElementById("gift-builder-order");if(!t||!i||!a)return;const s=new Set(["bouquet"]);function r(){t.querySelectorAll(".gift-builder__item").forEach(d=>{const $=d.dataset.builderId,y=s.has($);d.classList.toggle("is-selected",y),d.setAttribute("aria-pressed",y)});let u=0;const l=[];t.querySelectorAll(".gift-builder__item.is-selected").forEach(d=>{u+=Number(d.dataset.builderPrice),l.push(d.querySelector(".gift-builder__item-label").textContent)}),i.innerHTML=l.length>0?`Ваш набор: <strong>${l.join(" + ")}</strong> — <strong>${b(u)}</strong>`:`Выберите элементы — <strong>от ${b(2500)}</strong>`,a.disabled=s.size===0}t.querySelectorAll(".gift-builder__item").forEach(u=>{u.addEventListener("click",()=>{const l=u.dataset.builderId;l!=="bouquet"&&(s.has(l)?s.delete(l):s.add(l),r())})}),a.addEventListener("click",()=>{const u=[];let l=0;t.querySelectorAll(".gift-builder__item.is-selected").forEach(d=>{l+=Number(d.dataset.builderPrice),u.push(d.querySelector(".gift-builder__item-label").textContent)}),e(u.join(" + "),l)}),(o=t.querySelector('.gift-builder__item[data-builder-id="bouquet"]'))==null||o.classList.add("is-selected"),r()}function Ee(){return`
    <section class="section plants-block" id="plants" aria-labelledby="plants-title">
      <div class="container">
        <div class="plants-block__layout reveal">
          <div class="plants-block__media image-reveal">
            <img ${f(v.plants,"Комнатные растения — Flora Atelier, Саратов",1200,900)}>
          </div>
          <div class="plants-block__content">
            <p class="section-label">Растения</p>
            <h2 class="section-title" id="plants-title">Цветы, которые остаются с&nbsp;вами</h2>
            <p class="section-subtitle">Комнатные растения в керамике — подарок, который будет радовать месяцами</p>
            <a href="#products" class="btn btn--primary btn--lg" data-category-link="potted">Смотреть растения</a>
          </div>
        </div>
      </div>
    </section>
  `}function Le(e){var t;(t=document.querySelector('[data-category-link="potted"]'))==null||t.addEventListener("click",i=>{i.preventDefault(),e==null||e("potted")})}const Se=["gift-item--wide","","gift-item--tall","","gift-item--wide",""];function Be(){return`
    <section class="section section--alt" id="gifts" aria-labelledby="gifts-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Подарки</p>
          <h2 class="section-title" id="gifts-title">Добавьте к букету что-то ещё</h2>
          <p class="section-subtitle">Игрушки, шары, свечи, сувениры — соберите идеальный подарок</p>
        </header>
        <div class="gifts-editorial">
          ${C.map((e,t)=>`
            <a href="#gift-builder" class="gift-item ${Se[t]||""} mobile-scale-in" style="--anim-delay:${t*.07}s">
              <div class="gift-item__image">
                <img ${f(e.image,e.alt,400,500)}>
              </div>
              <span class="gift-item__name">${e.name}</span>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `}function xe(e){return Array.from({length:5},(t,i)=>`<span class="review-card__star${i<e?" is-filled":""}" aria-hidden="true">★</span>`).join("")}function Ie(){const e=S[0],t=S.slice(1);return`
    <section class="section section--alt" id="reviews" aria-labelledby="reviews-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Отзывы</p>
          <h2 class="section-title" id="reviews-title">Нас рекомендуют</h2>
          <div class="reviews-aggregate">
            <div class="reviews-aggregate__stars" aria-label="Рейтинг ${_.rating} из 5">
              ${xe(Math.round(_.rating))}
            </div>
            <p class="reviews-aggregate__score">
              <strong>${_.rating}</strong> · ${_.count} отзывов
            </p>
          </div>
        </header>

        <div class="reviews-editorial">
          <blockquote class="review-featured reveal">
            <p class="review-featured__text">«${e.text}»</p>
            <footer class="review-featured__footer">
              <cite class="review-featured__name">${e.name}</cite>
              <time datetime="${e.date}">${e.date}</time>
            </footer>
          </blockquote>

          <div class="reviews-grid">
            ${t.map((i,a)=>`
              <blockquote class="review-card review-card--compact reveal reveal-delay-${a%3+1}">
                <p class="review-card__text">«${i.text}»</p>
                <footer class="review-card__footer">
                  <cite class="review-card__name">${i.name}</cite>
                  <time class="review-card__date" datetime="${i.date}">${i.date}</time>
                </footer>
              </blockquote>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `}function qe(){return`
    <section class="section section--alt" id="delivery" aria-labelledby="delivery-title">
      <div class="container container--narrow">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Доставка</p>
          <h2 class="section-title" id="delivery-title">${L.headline}</h2>
          <p class="section-subtitle">${L.subline}</p>
        </header>
        <div class="delivery-highlight reveal">
          ${L.items.map(e=>`
            <div class="delivery-highlight__item">
              <span class="delivery-highlight__label">${e.label}</span>
              <p class="delivery-highlight__text">${e.text}</p>
            </div>
          `).join("")}
        </div>
        <div class="delivery-cta reveal">
          <a href="${n.phoneLink}" class="btn btn--primary btn--lg">Оформить заказ</a>
        </div>
      </div>
    </section>
  `}function ke(){const e=v.social,t=["social-item--wide","","social-item--tall","","social-item--wide",""];return`
    <section class="section" id="social" aria-labelledby="social-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Соцсети</p>
          <h2 class="section-title" id="social-title">Больше красоты — в&nbsp;наших соцсетях</h2>
        </header>
        <div class="social-collage reveal">
          ${e.map((i,a)=>`
            <figure class="social-item ${t[a]||""} mobile-scale-in" style="--anim-delay:${a*.06}s">
              <img ${f(i,`Flora Atelier — работа флориста ${a+1}`,600,600)}>
            </figure>
          `).join("")}
        </div>
        <div class="social-cta reveal">
          <a href="${n.instagram}" class="btn btn--secondary" target="_blank" rel="noopener">Смотреть больше</a>
        </div>
      </div>
    </section>
  `}function Ae(){const e=new Date().getFullYear();return`
    <footer class="footer pattern-bg pattern-bg--footer" role="contentinfo">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand-block">
            <div class="footer__logo">${n.logoLine} · ${n.name}</div>
            <p class="footer__tagline">${n.tagline}</p>
          </div>
          <nav class="footer__nav" aria-label="Навигация в подвале">
            <a href="#catalog">Букеты</a>
            <a href="#gifts">Подарки</a>
            <a href="#delivery">Доставка</a>
            <a href="#reviews">Отзывы</a>
            <a href="/flower-shop/admin.html">Админ-панель</a>
          </nav>
          <div class="footer__contact">
            <a href="${n.phoneLink}" class="footer__phone">${n.phone}</a>
            <p class="footer__city">${n.address}</p>
            <div class="footer__social" aria-label="Социальные сети">
              <a href="${n.telegram}" class="social-pill social-pill--footer" target="_blank" rel="noopener noreferrer" title="Telegram — ${n.name}">
                <span class="social-pill__icon" aria-hidden="true">TG</span>
                <span>Telegram</span>
              </a>
              <a href="${n.vk}" class="social-pill social-pill--footer" target="_blank" rel="noopener noreferrer" title="ВКонтакте — ${n.name}">
                <span class="social-pill__icon" aria-hidden="true">VK</span>
                <span>ВКонтакте</span>
              </a>
              <a href="${n.instagram}" class="social-pill social-pill--footer" target="_blank" rel="noopener noreferrer" title="Instagram — ${n.name}">
                <span class="social-pill__icon" aria-hidden="true">IG</span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>&copy; ${e} ${n.name}. Демонстрационный сайт.</span>
          <span>Цветы с доставкой по Саратову</span>
        </div>
      </div>
    </footer>
  `}function Me(){return`
    <div class="mobile-bar" id="mobile-bar" role="navigation" aria-label="Быстрый заказ">
      <a href="#catalog" class="btn btn--primary btn--full mobile-bar__cta">Выбрать букет</a>
    </div>
  `}function Fe(){const e=document.getElementById("mobile-bar"),t=document.querySelector(".hero");if(!e||!t)return;new IntersectionObserver(([a])=>e.classList.toggle("is-visible",!a.isIntersecting),{threshold:0}).observe(t)}function Pe(){const e=document.querySelectorAll(".reveal");if(!e.length)return;const t=window.matchMedia("(max-width: 1023px)").matches,i=new IntersectionObserver(a=>{a.forEach(s=>{s.isIntersecting&&(s.target.classList.add("is-visible"),i.unobserve(s.target))})},{threshold:t?.05:.12,rootMargin:t?"0px 0px 0px 0px":"0px 0px -40px 0px"});e.forEach(a=>i.observe(a)),setTimeout(()=>{e.forEach(a=>a.classList.add("is-visible"))},3e3)}function k(e=document){const t=e.querySelectorAll(".mobile-slide-in, .mobile-slide-up, .mobile-scale-in, .mobile-anim, .image-reveal");if(!t.length)return;const i=new IntersectionObserver(a=>{a.forEach(s=>{s.isIntersecting&&(s.target.classList.add("is-animated"),i.unobserve(s.target))})},{threshold:.08,rootMargin:"0px 0px -5% 0px"});t.forEach(a=>{a.classList.contains("is-animated")||i.observe(a)}),setTimeout(()=>{t.forEach(a=>a.classList.add("is-animated"))},2500)}function je(){document.querySelectorAll(".hero .mobile-anim").forEach(a=>{const s=parseInt(a.dataset.delay||"0",10);setTimeout(()=>a.classList.add("is-animated"),200+s*120)});const t=document.querySelector(".hero__img");t&&setTimeout(()=>t.classList.add("hero__img--loaded"),80);const i=document.querySelector(".hero__media");i&&i.classList.add("is-revealed")}function Te(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__img"),t=document.querySelectorAll(".pattern-parallax");let i=!1;window.addEventListener("scroll",()=>{i||(requestAnimationFrame(()=>{var r;const a=window.scrollY,s=((r=document.querySelector(".hero"))==null?void 0:r.offsetHeight)||0;if(e&&a<s){const o=1+a*8e-5;e.style.transform=`translateY(${a*.15}px) scale(${Math.min(o,1.04)})`}t.forEach(o=>{o.style.setProperty("--pattern-y",`${a*.03}px`)}),i=!1}),i=!0)},{passive:!0})}function He(){const e=document.querySelector(".header");if(!e)return;const t=()=>{e.classList.toggle("is-scrolled",window.scrollY>40)};window.addEventListener("scroll",t,{passive:!0}),t()}function Re(){document.addEventListener("click",e=>{const t=e.target.closest('a[href^="#"]');if(!t)return;const i=t.getAttribute("href");if(i==="#")return;const a=document.querySelector(i);if(!a)return;e.preventDefault();const s=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))||72,r=a.getBoundingClientRect().top+window.scrollY-s;window.scrollTo({top:r,behavior:"smooth"})})}function De(){const e={"@context":"https://schema.org","@graph":[...U.slice(0,8).map(i=>({"@type":"Product",name:i.name,description:i.description,image:i.image,offers:{"@type":"Offer",price:i.price,priceCurrency:"RUB",availability:"https://schema.org/InStock",seller:{"@type":"Florist",name:n.name}}})),{"@type":"AggregateRating",itemReviewed:{"@type":"Florist",name:n.name},ratingValue:_.rating,reviewCount:_.count,bestRating:5},...S.map(i=>({"@type":"Review",author:{"@type":"Person",name:i.name},reviewRating:{"@type":"Rating",ratingValue:i.rating,bestRating:5},reviewBody:i.text,datePublished:i.date,itemReviewed:{"@type":"Florist",name:n.name}}))]},t=document.createElement("script");t.type="application/ld+json",t.textContent=JSON.stringify(e),document.head.appendChild(t)}const B=J(),h=new Map;function D(e){var t;(t=document.getElementById(e))==null||t.scrollIntoView({behavior:"smooth",block:"start"})}function G(e){const t=T(e);t&&B.open(t.name,Q(t))}function Ge(){document.addEventListener("click",e=>{const t=e.target.closest("[data-open-product]");if(t){e.preventDefault(),G(t.dataset.openProduct);return}const i=e.target.closest("[data-addon-name]");if(i){const r=i.dataset.productId;i.classList.toggle("is-selected"),h.has(r)||h.set(r,new Set);const o=h.get(r);i.classList.contains("is-selected")?o.add(i.dataset.addonName):o.delete(i.dataset.addonName);return}const a=e.target.closest("[data-order-id]");if(!a)return;const s=T(a.dataset.orderId);if(s){const r=h.has(s.id)?[...h.get(s.id)]:[];K(s.name,r),h.delete(s.id),B.close()}})}function A(e){const t=M.find(r=>r.id===e),i=X(e),a=document.getElementById("products-title"),s=document.getElementById("products-subtitle");a&&t&&(a.textContent=t.name),s&&(s.textContent=i.length?`${i.length} позиций`:"Позвоните — подберём индивидуально"),R("products-grid",i,"В этой категории скоро появятся позиции."),D("products")}function Oe(e,t){const i=F.find(o=>o.filter===t||o.id===e),a=Z(t||(i==null?void 0:i.filter)),s=document.getElementById("products-title"),r=document.getElementById("products-subtitle");s&&i&&(s.textContent=i.title),r&&i&&(r.textContent=i.subtitle),R("products-grid",a.length?a:P(6)),D("products")}function ze(e){const t=j.find(a=>a.id===e);if(!t)return;const i=ee(t.tags);B.open(t.title,te(i))}function Ne(){const e=document.getElementById("app");e.innerHTML=`
    ${ae()}
    <main id="main">
      ${ne()}
      ${le()}
      ${de()}
      ${ge()}
      ${be()}
      ${_e()}
      ${$e()}
      ${Ee()}
      ${Be()}
      ${qe()}
      ${Ie()}
      ${ke()}
    </main>
    ${Ae()}
    ${Me()}
  `,se(),he(),me(G),oe(A),ue(Oe),ye(ze),we(W),Le(A),Ge(),Fe(),Pe(),k(),je(),Te(),He(),Re(),De(),window.initScrollAnimations=k,window.addEventListener("storage",()=>I()),window.addEventListener("products-updated",()=>I())}document.addEventListener("DOMContentLoaded",Ne);
