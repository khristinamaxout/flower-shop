import{e as l,h as m,j as f,k as T,l as k,m as Y,f as v,n as I,b as A,o as W,p as P,q as F,t as U,w as J,u as K,v as y,x as q,y as $,z as H,A as Q,r as C,B as X,C as Z,D as ee,E as te,F as L,G as ie,H as ae,I as se}from"./order-jjY6qviq.js";function ne(){return`
    <header class="header" role="banner">
      <div class="container header__inner">
        <a href="#" class="header__logo" aria-label="${l.name} — на главную">
          Flora <span>Atelier</span>
        </a>

        <nav class="header__nav" aria-label="Основная навигация">
          <a href="#catalog">Каталог</a>
          <a href="#scenarios">Поводы</a>
          <a href="#delivery">Доставка</a>
          <a href="#gallery">Работы</a>
          <a href="#reviews">Отзывы</a>
          <a href="#about">О нас</a>
        </nav>

        <div class="header__actions">
          <a href="${l.phoneLink}" class="header__phone">${l.phone}</a>
          <a href="#catalog" class="btn btn--primary btn--sm header__cta">Заказать</a>
          <button class="header__burger" aria-label="Открыть меню" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        <a href="#catalog">Каталог</a>
        <a href="#gift-finder">Подобрать подарок</a>
        <a href="#bestsellers">Хиты продаж</a>
        <a href="#scenarios">По поводу</a>
        <a href="#delivery">Доставка</a>
        <a href="#gallery">Наши работы</a>
        <a href="#reviews">Отзывы</a>
      </nav>
      <div class="mobile-menu__contact">
        <a href="${l.phoneLink}" class="mobile-menu__phone">${l.phone}</a>
        <a href="${l.telegram}" class="btn btn--secondary btn--full" target="_blank" rel="noopener">Telegram</a>
      </div>
    </div>
  `}function le(){const e=document.querySelector(".header__burger"),t=document.getElementById("mobile-menu");if(!e||!t)return;const i=a=>{e.classList.toggle("is-active",a),t.classList.toggle("is-open",a),t.setAttribute("aria-hidden",!a),e.setAttribute("aria-expanded",a),document.body.classList.toggle("menu-open",a)};e.addEventListener("click",()=>{i(!t.classList.contains("is-open"))}),t.querySelectorAll("a").forEach(a=>{a.addEventListener("click",()=>i(!1))})}function re(){return`
    <section class="hero pattern-bg pattern-bg--hero pattern-parallax" aria-label="Главный экран">
      <div class="hero__media is-revealed">
        <img
          ${m(f.hero,"Премиальный букет — Flora Atelier, доставка цветов по Саратову",1920,1280,{eager:!0,className:"hero__img"})}
        >
      </div>

      <div class="container hero__content">
        <p class="hero__location mobile-anim" data-delay="0">Саратов · доставка ежедневно</p>
        <h1 class="hero__title display-title mobile-anim" data-delay="1">
          Цветы,<br>которые говорят<br><em>за вас.</em>
        </h1>
        <p class="hero__subtitle mobile-anim" data-delay="2">
          Букеты и подарки с доставкой по Саратову
        </p>
        <div class="hero__actions mobile-anim" data-delay="3">
          <a href="#catalog" class="btn btn--primary btn--lg">Выбрать букет</a>
          <a href="#gift-finder" class="btn btn--secondary btn--lg">Подобрать подарок</a>
        </div>
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span>Листайте</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>
  `}const oe=["category-card--featured","","category-card--wide","","category-card--tall","","category-card--wide",""];function de(){return`
    <section class="section pattern-bg pattern-bg--section" id="catalog" aria-labelledby="catalog-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Каталог</p>
          <h2 class="section-title" id="catalog-title">Выберите направление</h2>
          <p class="section-subtitle">Не каталог ради каталога — путь к&nbsp;идеальному подарку</p>
        </header>

        <div class="categories-editorial categories-scroll">
          ${T.map((e,t)=>`
            <a href="#bestsellers" class="category-card ${oe[t]||""} mobile-slide-in" data-category="${e.id}" style="--anim-delay: ${t*.08}s">
              <div class="category-card__image">
                <img ${m(e.image,e.alt,400,533)}>
              </div>
              <div class="category-card__overlay">
                <span class="category-card__name">${e.name}</span>
              </div>
              <span class="category-card__arrow" aria-hidden="true">→</span>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `}function ce(e){document.querySelectorAll(".category-card").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const a=t.dataset.category;e&&e(a)})})}const M=["recipient","occasion","budget"],ue=["Для кого","Повод","Бюджет"];function ge(){return`
    <section class="section section--alt gift-finder-section" id="gift-finder" aria-labelledby="gift-finder-title">
      <div class="container">
        <div class="gift-finder-section__layout">
          <header class="section-header reveal">
            <p class="section-label">Помощник</p>
            <h2 class="section-title" id="gift-finder-title">Не знаете, что подарить?</h2>
            <p class="section-subtitle">
              Подберём цветы и подарок под человека, повод и ваш бюджет.
            </p>
          </header>

          <div class="gift-finder reveal" id="gift-finder-widget">
            <div class="gift-finder__steps" role="tablist" aria-label="Шаги подбора">
              ${ue.map((e,t)=>`
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
                <a href="#bestsellers" class="btn btn--ghost">Смотреть все хиты →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function me(){const e=document.getElementById("gift-finder-widget");if(!e)return;const t=document.getElementById("gift-finder-wizard"),i=document.getElementById("gift-finder-results"),a=document.getElementById("gift-finder-question"),s=document.getElementById("gift-finder-options"),n=document.getElementById("gift-finder-results-grid"),o=e.querySelectorAll(".gift-finder__step-indicator"),u=document.getElementById("gift-finder-reset"),r={recipient:null,occasion:null,budget:null};let d=0;const S={recipient:"Для кого выбираете?",occasion:"Какой повод?",budget:"Какой бюджет?"};function w(c){return c==="budget"?k.budget:k[c]}function z(){o.forEach((c,b)=>{c.classList.remove("is-active","is-done"),b<d&&c.classList.add("is-done"),b===d&&c.classList.add("is-active")})}function B(){const c=M[d];a.textContent=S[c];const b=w(c);s.innerHTML=b.map(p=>`
      <button
        class="gift-finder__option ${r[c]===p.id?"is-selected":""}"
        data-value="${p.id}"
        type="button"
      >${p.label}</button>
    `).join(""),s.querySelectorAll(".gift-finder__option").forEach(p=>{p.addEventListener("click",()=>D(c,p.dataset.value))}),z()}function D(c,b){r[c]=b,d<M.length-1?(d++,B()):N()}function N(){t.style.display="none",i.classList.add("is-visible"),o.forEach(g=>g.classList.add("is-done"));const c=k.budget.find(g=>g.id===r.budget),b=(c==null?void 0:c.max)??1/0,p=Y({recipient:r.recipient,occasion:r.occasion,budget:b});if(p.length===0){n.innerHTML=`
        <div class="gift-finder__empty">
          <p>Точного совпадения нет — но мы подберём идеальный вариант.</p>
          <a href="${l.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
        </div>
      `;return}n.innerHTML=p.slice(0,3).map(g=>`
      <article class="product-card">
        <div class="product-card__image">
          <img ${m(g.image,g.alt,400,500)}>
        </div>
        <div class="product-card__info">
          <h4 class="product-card__name">${g.name}</h4>
          <p class="product-card__desc">${g.description}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${v(g.price)}</span>
            <button class="btn btn--primary btn--sm" data-order-id="${g.id}">Заказать</button>
          </div>
        </div>
      </article>
    `).join("")}function V(){r.recipient=null,r.occasion=null,r.budget=null,d=0,t.style.display="",i.classList.remove("is-visible"),B()}u==null||u.addEventListener("click",V),B()}function pe(e,t={}){const{title:i="Выбирают чаще всего",subtitle:a="Когда не знаете с чего начать — начните с проверенного",id:s="bestsellers",showAllLink:n=!1,emptyMessage:o=null}=t,u=e.length?e.map((r,d)=>O(r,d)).join(""):R(o);return`
    <section class="section" id="${s}" aria-labelledby="${s}-title">
      <div class="container">
        <header class="section-header section-header__row reveal">
          <div>
            <p class="section-label">Хиты продаж</p>
            <h2 class="section-title" id="${s}-title">${i}</h2>
            ${a?`<p class="section-subtitle" id="${s}-subtitle" style="margin-top: 1rem;">${a}</p>`:""}
          </div>
          ${n?'<a href="#catalog" class="btn btn--ghost">Весь каталог →</a>':""}
        </header>

        <div class="products-editorial" id="${s}-grid">
          ${u}
        </div>
      </div>
    </section>
  `}function be(e){return!e||!A[e]?"":`<span class="product-card__badge product-card__badge--${e}">${A[e]}</span>`}function fe(e){return e.addOns?`
    <div class="product-card__addons">
      <p class="product-card__addons-label">Добавить к заказу</p>
      <div class="product-card__addons-list">
        ${W.slice(0,4).map(t=>`
          <button
            class="product-card__addon"
            type="button"
            data-addon-id="${t.id}"
            data-addon-name="${t.name}"
            data-addon-price="${t.price}"
            data-product-id="${e.id}"
            aria-label="Добавить ${t.name}"
          >+ ${t.name}</button>
        `).join("")}
      </div>
    </div>
  `:""}function O(e,t=0){const i=t*.07,a=e.oldPrice?`<span class="product-card__price-old">${v(e.oldPrice)}</span><span class="product-card__price">${v(e.price)}</span>`:`<span class="product-card__price">${v(e.price)}</span>`,s=e.emotional?`<p class="product-card__emotional">${e.emotional}</p>`:"";return`
    <article class="product-card mobile-slide-up image-reveal" data-product-id="${e.id}" style="--anim-delay: ${i}s">
      <div class="product-card__image">
        ${be(e.badge)}
        <img ${m(e.image,e.alt,400,500)}>
      </div>
      <div class="product-card__info">
        <h3 class="product-card__name">${e.name}</h3>
        ${s}
        <p class="product-card__desc">${e.description}</p>
        ${fe(e)}
        <div class="product-card__footer">
          <div class="product-card__pricing">${a}</div>
          <button class="btn btn--primary btn--sm" data-order-id="${e.id}">Заказать</button>
        </div>
      </div>
    </article>
  `}function R(e){return`
    <div class="products-empty">
      <p>${e||"В этой категории скоро появятся позиции — позвоните, подберём индивидуально."}</p>
    </div>
  `}function ve(){const e=I(8);return pe(e,{title:"Выбирают чаще всего",subtitle:"Когда не знаете с чего начать — начните с проверенного",id:"bestsellers"})}function E(e,t,i=null){const a=document.getElementById(e);a&&(a.innerHTML=t.length?t.map((s,n)=>O(s,n)).join(""):R(i),window.initScrollAnimations&&window.initScrollAnimations(a))}function he(){return`
    <section class="section" id="scenarios" aria-labelledby="scenarios-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Сценарии</p>
          <h2 class="section-title" id="scenarios-title">Цветы для каждого момента</h2>
          <p class="section-subtitle">Выберите ситуацию — покажем подходящие букеты и композиции</p>
        </header>

        <div class="scenarios-grid">
          ${P.map((e,t)=>`
            <button
              class="scenario-card mobile-slide-in"
              data-scenario-id="${e.id}"
              type="button"
              aria-label="Подборка: ${e.title}"
              style="--anim-delay: ${t*.1}s"
            >
              <div class="scenario-card__image">
                <img ${m(e.image,e.alt,400,500)}>
              </div>
              <div class="scenario-card__overlay">
                <span class="scenario-card__title">${e.title}</span>
                <span class="scenario-card__hint">Смотреть подборку</span>
              </div>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `}function _e(e){document.querySelectorAll(".scenario-card").forEach(t=>{t.addEventListener("click",()=>{e(t.dataset.scenarioId)})})}function ye(){return`
    <section class="section" id="budget" aria-labelledby="budget-title">
      <div class="container">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Бюджет</p>
          <h2 class="section-title" id="budget-title">Выберите по бюджету</h2>
          <p class="section-subtitle">Подберём букет и подарок в нужном диапазоне</p>
        </header>

        <div class="budget-grid">
          ${F.map((e,t)=>`
            <button
              class="budget-card mobile-slide-up"
              data-budget-max="${e.max}"
              data-budget-id="${e.id}"
              type="button"
              style="--anim-delay: ${t*.08}s"
            >
              <span class="budget-card__label">${e.label}</span>
              <span class="budget-card__hint">Смотреть подборку →</span>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `}function $e(e){document.querySelectorAll(".budget-card").forEach(t=>{t.addEventListener("click",()=>{e(Number(t.dataset.budgetMax),t.dataset.budgetId)})})}function we(){return`
    <section class="section section--alt" id="gift-builder" aria-labelledby="gift-builder-title">
      <div class="container">
        <div class="gift-builder">
          <div class="gift-builder__visual reveal" id="gift-builder-visual">
            ${[{id:"bouquet",label:"Букет",image:f.giftBuilder.bouquet,alt:"Букет",price:2500},{id:"balloon",label:"Шар",image:f.giftBuilder.balloons,alt:"Воздушные шары",price:500},{id:"toy",label:"Игрушка",image:f.giftBuilder.toy,alt:"Мягкая игрушка",price:890},{id:"card",label:"Открытка",image:f.giftBuilder.card,alt:"Авторская открытка",price:350},{id:"souvenir",label:"Сувенир",image:f.giftBuilder.souvenir,alt:"Сувенир",price:650}].map((t,i)=>`
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
                  <img ${m(t.image,t.alt,80,80)}>
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
              Выберите элементы — <strong>от ${v(2500)}</strong>
            </p>
            <button class="btn btn--primary btn--lg btn--pulse" id="gift-builder-order" type="button" disabled>
              Собрать подарок
            </button>
          </div>
        </div>
      </div>
    </section>
  `}function Ee(e){var o;const t=document.getElementById("gift-builder-visual"),i=document.getElementById("gift-builder-total"),a=document.getElementById("gift-builder-order");if(!t||!i||!a)return;const s=new Set(["bouquet"]);function n(){t.querySelectorAll(".gift-builder__item").forEach(d=>{const S=d.dataset.builderId,w=s.has(S);d.classList.toggle("is-selected",w),d.setAttribute("aria-pressed",w)});let u=0;const r=[];t.querySelectorAll(".gift-builder__item.is-selected").forEach(d=>{u+=Number(d.dataset.builderPrice),r.push(d.querySelector(".gift-builder__item-label").textContent)}),i.innerHTML=r.length>0?`Ваш набор: <strong>${r.join(" + ")}</strong> — <strong>${v(u)}</strong>`:`Выберите элементы — <strong>от ${v(2500)}</strong>`,a.disabled=s.size===0}t.querySelectorAll(".gift-builder__item").forEach(u=>{u.addEventListener("click",()=>{const r=u.dataset.builderId;r!=="bouquet"&&(s.has(r)?s.delete(r):s.add(r),n())})}),a.addEventListener("click",()=>{const u=[];let r=0;t.querySelectorAll(".gift-builder__item.is-selected").forEach(d=>{r+=Number(d.dataset.builderPrice),u.push(d.querySelector(".gift-builder__item-label").textContent)}),e(u.join(" + "),r)}),(o=t.querySelector('.gift-builder__item[data-builder-id="bouquet"]'))==null||o.classList.add("is-selected"),n()}function xe(){const{title:e,subtitle:t,image:i,alt:a,cta:s}=U;return`
    <section class="section section--alt" id="seasonal" aria-labelledby="seasonal-title">
      <div class="container">
        <div class="seasonal-block reveal">
          <div class="seasonal-block__media">
            <img ${m(i,a,800,600)}>
          </div>
          <div class="seasonal-block__content">
            <p class="section-label">Коллекция сезона</p>
            <h2 class="seasonal-block__title" id="seasonal-title">${e}</h2>
            <p class="seasonal-block__subtitle">${t}</p>
            <button class="btn btn--primary btn--lg" id="seasonal-cta" type="button">${s}</button>
          </div>
        </div>
      </div>
    </section>
  `}function Le(e){var t;(t=document.getElementById("seasonal-cta"))==null||t.addEventListener("click",e)}function Se(){return`
    <section class="section section--alt" id="about" aria-labelledby="why-us-title">
      <div class="container container--narrow">
        <header class="section-header section-header--center reveal">
          <p class="section-label">Почему мы</p>
          <h2 class="section-title" id="why-us-title">Почему нас выбирают</h2>
        </header>

        <div class="why-grid">
          ${J.map((e,t)=>`
            <div class="why-item reveal reveal-delay-${t%3+1}">
              <h3 class="why-item__title">${e.title}</h3>
              <p class="why-item__desc">${e.description}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `}const Be=f.gallery;function ke(){const e=K.map((i,a)=>({...i,image:Be[a]||i.image})),t=["gallery__item--wide","","gallery__item--tall","","gallery__item--wide","","gallery__item--tall",""];return`
    <section class="section" id="gallery" aria-labelledby="gallery-title">
      <div class="container">
        <header class="section-header section-header__row reveal">
          <div>
            <p class="section-label">Портфолио</p>
            <h2 class="section-title" id="gallery-title">Букеты, которые мы уже создали</h2>
            <p class="section-subtitle" style="margin-top: 1rem;">Каждая работа — авторская композиция нашего ателье</p>
          </div>
        </header>

        <div class="gallery gallery--editorial reveal">
          ${e.map((i,a)=>`
            <figure class="gallery__item ${t[a]||""} mobile-scale-in" style="--anim-delay: ${a*.08}s">
              <img ${m(i.image,i.alt,600,750)}>
            </figure>
          `).join("")}
        </div>

        <div style="text-align: center; margin-top: 3rem;" class="reveal">
          <button class="btn btn--secondary" id="gallery-more">Посмотреть все работы</button>
        </div>
      </div>
    </section>
  `}function Ie(e){var t;(t=document.getElementById("gallery-more"))==null||t.addEventListener("click",e)}function qe(e){return Array.from({length:5},(t,i)=>`<span class="review-card__star${i<e?" is-filled":""}" aria-hidden="true">★</span>`).join("")}function Ae(){const e=q[0],t=q.slice(1);return`
    <section class="section section--alt" id="reviews" aria-labelledby="reviews-title">
      <div class="container">
        <header class="section-header reveal">
          <p class="section-label">Отзывы</p>
          <h2 class="section-title" id="reviews-title">Нас рекомендуют</h2>
          <div class="reviews-aggregate">
            <div class="reviews-aggregate__stars" aria-label="Рейтинг ${y.rating} из 5">
              ${qe(Math.round(y.rating))}
            </div>
            <p class="reviews-aggregate__score">
              <strong>${y.rating}</strong> · ${y.count} отзывов
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
  `}function Ce(){return`
    <section class="section" id="delivery" aria-labelledby="delivery-title">
      <div class="container container--narrow">
        <header class="section-header reveal">
          <p class="section-label">Доставка</p>
          <h2 class="section-title" id="delivery-title">Доставка цветов в Саратове</h2>
          <p class="section-subtitle" style="margin-top: 1rem;">Просто, быстро и в удобное для вас время</p>
        </header>

        <div class="delivery-grid reveal">
          ${[{label:"Куда доставляем",text:$.areas},{label:"Сроки",text:$.timing},{label:"Стоимость",text:$.cost},{label:"Срочная доставка",text:$.express},{label:"Как оформить",text:$.howTo},{label:"Самовывоз",text:`${l.address}. ${l.hours}.`}].map(t=>`
            <div class="delivery-item">
              <h3 class="delivery-item__label">${t.label}</h3>
              <p class="delivery-item__text">${t.text}</p>
            </div>
          `).join("")}
        </div>

        <div style="margin-top: 3rem; text-align: center;" class="reveal">
          <a href="${l.phoneLink}" class="btn btn--primary btn--lg">Заказать доставку</a>
        </div>
      </div>
    </section>
  `}function Me(){return`
    <section class="final-cta" aria-labelledby="final-cta-title">
      <div class="final-cta__bg" aria-hidden="true">
        <img ${m(f.ctaBg,"",1920,1080)}>
      </div>
      <div class="container final-cta__content">
        <h2 class="final-cta__title display-title reveal" id="final-cta-title">
          Повод найдётся.<br>Цветы — тоже.
        </h2>
        <div class="final-cta__actions reveal reveal-delay-1">
          <a href="#catalog" class="btn btn--primary btn--lg btn--pulse">Выбрать букет</a>
          <a href="${l.phoneLink}" class="btn btn--secondary btn--lg">Связаться с флористом</a>
        </div>
      </div>
    </section>
  `}function je(){const e=new Date().getFullYear();return`
    <footer class="footer pattern-bg pattern-bg--footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand">Flora Atelier</div>
            <p class="footer__tagline">Цветы в Саратове — букеты, которые хочется подарить</p>
            <div class="footer__social">
              <a href="${l.telegram}" target="_blank" rel="noopener" aria-label="Telegram">TG</a>
              <a href="${l.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
              <a href="${l.vk}" target="_blank" rel="noopener" aria-label="ВКонтакте">VK</a>
            </div>
          </div>

          <div>
            <h3 class="footer__heading">Контакты</h3>
            <div class="footer__links">
              <a href="${l.phoneLink}">${l.phone}</a>
              <a href="${l.telegram}" target="_blank" rel="noopener">Telegram</a>
              <a href="${l.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>

          <div>
            <h3 class="footer__heading">Магазин</h3>
            <div class="footer__links">
              <span>${l.address}</span>
              <span>${l.hours}</span>
            </div>
          </div>

          <div>
            <h3 class="footer__heading">Информация</h3>
            <div class="footer__links">
              <a href="#delivery">Доставка</a>
              <a href="#catalog">Каталог</a>
              <a href="/flower-shop/admin.html">Админ-панель</a>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <span>&copy; ${e} Flora Atelier. Цветочный магазин Саратов.</span>
          <span>Купить цветы с доставкой по Саратову</span>
        </div>
      </div>
    </footer>
  `}function Te(){return`
    <div class="mobile-bar" id="mobile-bar" role="navigation" aria-label="Быстрый заказ">
      <a href="#catalog" class="btn btn--primary btn--full mobile-bar__cta">Выбрать букет</a>
    </div>
  `}function Pe(){const e=document.getElementById("mobile-bar"),t=document.querySelector(".hero");if(!e||!t)return;new IntersectionObserver(([a])=>{e.classList.toggle("is-visible",!a.isIntersecting)},{threshold:0,rootMargin:"0px"}).observe(t)}const Fe=[{text:"Когда хочется сказать больше, чем помещается в сообщении.",context:"Букеты для особых моментов"},{text:"Просто так — иногда лучший повод.",context:"Без повода"},{text:"Для человека, которого хочется удивить.",context:"Сюрприз"}];function He(){return`
    <section class="section section--alt emotional-commerce" aria-label="Эмоциональные сценарии">
      <div class="container">
        <div class="emotional-commerce__grid">
          ${Fe.map((e,t)=>`
            <blockquote class="emotional-quote reveal reveal-delay-${t+1}">
              <p class="emotional-quote__text">${e.text}</p>
              <footer class="emotional-quote__context">${e.context}</footer>
            </blockquote>
          `).join("")}
        </div>
      </div>
    </section>
  `}function Oe(){const e=document.querySelectorAll(".reveal");if(!e.length)return;const t=window.matchMedia("(max-width: 1023px)").matches,i=new IntersectionObserver(a=>{a.forEach(s=>{s.isIntersecting&&(s.target.classList.add("is-visible"),i.unobserve(s.target))})},{threshold:t?.05:.12,rootMargin:t?"0px 0px 0px 0px":"0px 0px -40px 0px"});e.forEach(a=>i.observe(a)),setTimeout(()=>{e.forEach(a=>a.classList.add("is-visible"))},3e3)}function j(e=document){const t=e.querySelectorAll(".mobile-slide-in, .mobile-slide-up, .mobile-scale-in, .mobile-anim, .image-reveal");if(!t.length)return;const i=new IntersectionObserver(a=>{a.forEach(s=>{s.isIntersecting&&(s.target.classList.add("is-animated"),i.unobserve(s.target))})},{threshold:.08,rootMargin:"0px 0px -5% 0px"});t.forEach(a=>{a.classList.contains("is-animated")||i.observe(a)}),setTimeout(()=>{t.forEach(a=>a.classList.add("is-animated"))},2500)}function Re(){document.querySelectorAll(".hero .mobile-anim").forEach(a=>{const s=parseInt(a.dataset.delay||"0",10);setTimeout(()=>a.classList.add("is-animated"),200+s*120)});const t=document.querySelector(".hero__img");t&&setTimeout(()=>t.classList.add("hero__img--loaded"),80);const i=document.querySelector(".hero__media");i&&i.classList.add("is-revealed")}function Ge(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__img"),t=document.querySelectorAll(".pattern-parallax");let i=!1;window.addEventListener("scroll",()=>{i||(requestAnimationFrame(()=>{var n;const a=window.scrollY,s=((n=document.querySelector(".hero"))==null?void 0:n.offsetHeight)||0;if(e&&a<s){const o=1+a*8e-5;e.style.transform=`translateY(${a*.15}px) scale(${Math.min(o,1.04)})`}t.forEach(o=>{o.style.setProperty("--pattern-y",`${a*.03}px`)}),i=!1}),i=!0)},{passive:!0})}function ze(){const e=document.querySelector(".header");if(!e)return;const t=()=>{e.classList.toggle("is-scrolled",window.scrollY>40)};window.addEventListener("scroll",t,{passive:!0}),t()}function De(){document.addEventListener("click",e=>{const t=e.target.closest('a[href^="#"]');if(!t)return;const i=t.getAttribute("href");if(i==="#")return;const a=document.querySelector(i);if(!a)return;e.preventDefault();const s=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))||72,n=a.getBoundingClientRect().top+window.scrollY-s;window.scrollTo({top:n,behavior:"smooth"})})}function Ne(){const e={"@context":"https://schema.org","@graph":[...H.slice(0,8).map(i=>({"@type":"Product",name:i.name,description:i.description,image:i.image,offers:{"@type":"Offer",price:i.price,priceCurrency:"RUB",availability:"https://schema.org/InStock",seller:{"@type":"Florist",name:l.name}}})),{"@type":"AggregateRating",itemReviewed:{"@type":"Florist",name:l.name},ratingValue:y.rating,reviewCount:y.count,bestRating:5},...q.map(i=>({"@type":"Review",author:{"@type":"Person",name:i.name},reviewRating:{"@type":"Rating",ratingValue:i.rating,bestRating:5},reviewBody:i.text,datePublished:i.date,itemReviewed:{"@type":"Florist",name:l.name}}))]},t=document.createElement("script");t.type="application/ld+json",t.textContent=JSON.stringify(e),document.head.appendChild(t)}const h=Q(),_=new Map;function Ve(){document.addEventListener("click",e=>{const t=e.target.closest("[data-addon-id]");if(t){const s=t.dataset.productId,n=t.dataset.addonName;t.classList.toggle("is-selected"),_.has(s)||_.set(s,new Set);const o=_.get(s);t.classList.contains("is-selected")?o.add(n):o.delete(n);return}const i=e.target.closest("[data-order-id]");if(!i)return;const a=X(i.dataset.orderId);if(a){const s=_.has(a.id)?[..._.get(a.id)]:[];Z(a.name,s),_.delete(a.id)}})}function x(e){const t=document.getElementById(e);t&&setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},100)}function Ye(e){const t=P.find(s=>s.id===e);if(!t)return;const i=ie(t.tags),a=L(i);h.open(t.title,a)}function We(e){const t=T.find(o=>o.id===e),i=te(e),a=document.getElementById("bestsellers-title"),s=document.getElementById("bestsellers-subtitle");if(a&&t&&(a.textContent=t.name),i.length===0){s&&(s.textContent="Скоро появится — позвоните, подберём индивидуально"),E("bestsellers-grid",[],"В этой категории пока нет позиций. Позвоните — флорист подберёт идеальный вариант."),x("bestsellers"),h.open((t==null?void 0:t.name)||"Каталог",`<div class="gift-finder__empty">
        <p>В категории «${t==null?void 0:t.name}» скоро появятся позиции.</p>
        <a href="${l.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
      </div>`);return}s&&(s.textContent=`${i.length} ${G(i.length,"позиция","позиции","позиций")} в категории`),E("bestsellers-grid",i),x("bestsellers");const n=L(i);h.open((t==null?void 0:t.name)||"Каталог",n)}function Ue(e,t){const i=F.find(o=>o.id===t),a=ae(e),s=document.getElementById("bestsellers-title"),n=document.getElementById("bestsellers-subtitle");s&&(s.textContent=`Букеты ${(i==null?void 0:i.label)||""}`),n&&(n.textContent=a.length?`${a.length} ${G(a.length,"вариант","варианта","вариантов")} в бюджете`:"Позвоните — подберём индивидуально"),E("bestsellers-grid",a.length?a:[]),x("bestsellers"),a.length?h.open(`Букеты ${i==null?void 0:i.label}`,L(a)):h.open(`Букеты ${i==null?void 0:i.label}`,`<div class="gift-finder__empty">
        <p>Точного совпадения нет — но мы подберём идеальный вариант в вашем бюджете.</p>
        <a href="${l.phoneLink}" class="btn btn--primary" style="margin-top: 1rem;">Связаться с флористом</a>
      </div>`)}function Je(){const e=se();h.open("Сейчас в цвету",L(e.length?e:I(6))),x("bestsellers"),E("bestsellers-grid",e.length?e:I(6));const t=document.getElementById("bestsellers-title"),i=document.getElementById("bestsellers-subtitle");t&&(t.textContent="Сейчас в цвету"),i&&(i.textContent="Сезонная коллекция — свежие композиции этого месяца")}function G(e,t,i,a){const s=e%10,n=e%100;return n>=11&&n<=19?a:s===1?t:s>=2&&s<=4?i:a}function Ke(){h.open("Букеты, которые мы уже создали",`
    <p style="color: var(--color-text-muted); margin-bottom: 1.5rem; font-size: 0.875rem;">
      Примеры реальных композиций нашего ателье. Для заказа похожего букета свяжитесь с флористом.
    </p>
    <div class="modal-products">
      ${H.slice(0,6).map(e=>`
        <div class="modal-product">
          <div class="modal-product__image">
            <img ${m(e.image,e.alt,72,90)}>
          </div>
          <div class="modal-product__info">
            <div class="modal-product__name">${e.name}</div>
            <div class="modal-product__desc">${e.description}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `)}function Qe(){const e=document.getElementById("app");e.innerHTML=`
    ${ne()}
    <main id="main">
      ${re()}
      ${de()}
      ${ve()}
      ${ge()}
      ${He()}
      ${he()}
      ${ye()}
      ${we()}
      ${xe()}
      ${ke()}
      ${Ae()}
      ${Se()}
      ${Ce()}
      ${Me()}
    </main>
    ${je()}
    ${Te()}
  `,le(),me(),ce(We),_e(Ye),$e(Ue),Ee(ee),Le(Je),Ie(Ke),Ve(),Pe(),Oe(),j(),Re(),Ge(),ze(),De(),Ne(),window.initScrollAnimations=j,window.addEventListener("storage",()=>C()),window.addEventListener("products-updated",()=>C())}document.addEventListener("DOMContentLoaded",Qe);
