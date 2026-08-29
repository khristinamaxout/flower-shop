import{r as f,c as g,b as $,f as p,a as w,d as _,s as u,g as y}from"./order-8aow55j7.js";const k=["pink-01.webp","pink-02.webp","pink-03.webp","edit-01.webp","edit-02.webp","edit-03.webp","kraft-01.webp","kraft-02.webp","kraft-03.webp","kraft-04.webp","kraft-05.webp","kraft-06.webp","vase-01.webp","vase-02.webp","vase-03.webp","vase-04.webp","vase-05.webp","vase-06.webp","gift-01.webp","gift-02.webp","gift-03.webp","gift-04.webp","gift-05.webp","gift-06.webp","cat-01.webp","cat-02.webp","cat-03.webp","cat-04.webp","cat-05.webp","bouquet-summer-evening.webp","hero-clean.webp","gen-balloons.webp","gen-teddy.webp","gen-postcard.webp","gen-souvenir.webp","gen-painting.webp","gen-sweets.webp"],v="/flower-shop/";let l=f(),n=null;function b(t){return t?t.startsWith("http")||t.startsWith("/")?t:`${v}references/items/${t}`:""}function E(t){const e=t.image||"";if(e.includes("/references/items/")){const s=e.split("/references/items/").pop();return b(s)}if(e.includes("/images/")){const s=e.split("/images/").pop();return b(s)}return e}function P(t){const s=(t.image||"").match(/(?:references\/items|images)\/([^/?#]+)/);return s?s[1]:"pink-01.webp"}function r(t){let e=document.querySelector(".admin-toast");e||(e=document.createElement("div"),e.className="admin-toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("is-visible"),setTimeout(()=>e.classList.remove("is-visible"),2600)}function I(){const t=l.filter(i=>i.available!==!1).length,e=l.filter(i=>i.bestseller).length,s=l.filter(i=>i.seasonal).length;return`
    <div class="admin__stats">
      <div class="stat-card"><div class="stat-card__label">Всего</div><div class="stat-card__value">${l.length}</div></div>
      <div class="stat-card"><div class="stat-card__label">Активных</div><div class="stat-card__value">${t}</div></div>
      <div class="stat-card"><div class="stat-card__label">Хиты</div><div class="stat-card__value">${e}</div></div>
      <div class="stat-card"><div class="stat-card__label">Сезон</div><div class="stat-card__value">${s}</div></div>
    </div>
  `}function L(){return`
    <table class="products-table">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${l.map(t=>{var d;const e=((d=g.find(a=>a.id===t.category))==null?void 0:d.label)||t.category,s=t.available===!1?'<span class="badge-pill badge-pill--off">Скрыт</span>':'<span class="badge-pill">Активен</span>',i=t.badge?`<span class="badge-pill">${$[t.badge]||t.badge}</span>`:"";return`
              <tr>
                <td><img class="products-table__thumb" src="${E(t)}" alt=""></td>
                <td>
                  <div class="products-table__name">${t.name}</div>
                  ${i}
                </td>
                <td>${e}</td>
                <td class="products-table__price">${p(t.price)}${t.oldPrice?` <s>${p(t.oldPrice)}</s>`:""}</td>
                <td>${s}</td>
                <td>
                  <button class="btn btn--secondary btn--sm" data-edit="${t.id}">Изменить</button>
                  <button class="btn btn--danger btn--sm" data-delete="${t.id}">Удалить</button>
                </td>
              </tr>
            `}).join("")}
      </tbody>
    </table>
  `}function q(t=null){const e=t||{name:"",price:"",oldPrice:"",description:"",emotional:"",category:"bouquets",badge:"",image:"bouquet-01.webp",seasonal:!1,available:!0,addOns:!0},s=t?P(t):e.image;return`
    <form class="admin-form" id="product-form">
      <h2 class="admin-form__title">${n?"Редактировать товар":"Добавить товар"}</h2>
      <div class="form-grid">
        <div class="form-field">
          <label for="name">Название</label>
          <input id="name" name="name" required value="${e.name||""}">
        </div>
        <div class="form-field">
          <label for="category">Категория</label>
          <select id="category" name="category">
            ${g.map(i=>`<option value="${i.id}" ${e.category===i.id?"selected":""}>${i.label}</option>`).join("")}
          </select>
        </div>
        <div class="form-field">
          <label for="price">Цена (₽)</label>
          <input id="price" name="price" type="number" min="0" required value="${e.price??""}">
        </div>
        <div class="form-field">
          <label for="oldPrice">Старая цена (₽)</label>
          <input id="oldPrice" name="oldPrice" type="number" min="0" value="${e.oldPrice??""}">
        </div>
        <div class="form-field form-grid__full">
          <label for="tagline">Короткое описание</label>
          <input id="tagline" name="tagline" value="${e.tagline||""}">
        </div>
        <div class="form-field form-grid__full">
          <label for="description">Полное описание</label>
          <textarea id="description" name="description">${e.description||""}</textarea>
        </div>
        <div class="form-field form-grid__full">
          <label for="emotional">Эмоциональный текст</label>
          <textarea id="emotional" name="emotional">${e.emotional||""}</textarea>
        </div>
        <div class="form-field">
          <label for="size">Размер</label>
          <input id="size" name="size" value="${e.size||""}" placeholder="Средний · ~45 см">
        </div>
        <div class="form-field">
          <label for="composition">Состав</label>
          <input id="composition" name="composition" value="${e.composition||""}" placeholder="Розы, эвкалипт, зелень">
        </div>
        <div class="form-field">
          <label for="image">Фотография</label>
          <select id="image" name="image">
            ${k.map(i=>`<option value="${i}" ${s===i?"selected":""}>${i}</option>`).join("")}
          </select>
        </div>
        <div class="form-field">
          <label for="badge">Метка</label>
          <select id="badge" name="badge">
            ${w.map(i=>`<option value="${i.id}" ${(e.badge||"")===i.id?"selected":""}>${i.label}</option>`).join("")}
          </select>
        </div>
        <div class="form-field form-grid__full form-checks">
          <label><input type="checkbox" name="seasonal" ${e.seasonal?"checked":""}> Сезонный</label>
          <label><input type="checkbox" name="available" ${e.available!==!1?"checked":""}> Показывать на сайте</label>
          <label><input type="checkbox" name="addOns" ${e.addOns?"checked":""}> Доп. товары</label>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn--primary">${n?"Сохранить":"Добавить"}</button>
        ${n?'<button type="button" class="btn btn--secondary" id="cancel-edit">Отмена</button>':""}
      </div>
    </form>
  `}function o(){const t=document.getElementById("admin-app");t.innerHTML=`
    <div class="admin">
      <header class="admin__header">
        <h1 class="admin__title">Flora Atelier — админ</h1>
        <div class="admin__actions">
          <a href="${v}" class="btn btn--secondary">← На сайт</a>
          <button class="btn btn--secondary" id="reset-data">Сбросить данные</button>
          <button class="btn btn--primary" id="add-new">+ Товар</button>
        </div>
      </header>
      <main class="admin__main">
        ${I()}
        ${L()}
        ${q(n?l.find(e=>e.id===n):null)}
      </main>
    </div>
  `,x()}function x(){var t,e,s,i;(t=document.getElementById("add-new"))==null||t.addEventListener("click",()=>{var d;n=null,o(),(d=document.getElementById("product-form"))==null||d.scrollIntoView({behavior:"smooth"})}),(e=document.getElementById("cancel-edit"))==null||e.addEventListener("click",()=>{n=null,o()}),(s=document.getElementById("reset-data"))==null||s.addEventListener("click",()=>{confirm("Вернуть каталог к исходным данным?")&&(_(),l=f(),n=null,o(),r("Данные сброшены"))}),document.querySelectorAll("[data-edit]").forEach(d=>{d.addEventListener("click",()=>{var a;n=d.dataset.edit,o(),(a=document.getElementById("product-form"))==null||a.scrollIntoView({behavior:"smooth"})})}),document.querySelectorAll("[data-delete]").forEach(d=>{d.addEventListener("click",()=>{confirm("Удалить этот товар?")&&(l=l.filter(a=>a.id!==d.dataset.delete),u(l),n===d.dataset.delete&&(n=null),o(),r("Товар удалён"))})}),(i=document.getElementById("product-form"))==null||i.addEventListener("submit",d=>{d.preventDefault();const a=new FormData(d.target),h=a.get("image"),m={name:a.get("name").trim(),price:Number(a.get("price")),oldPrice:a.get("oldPrice")?Number(a.get("oldPrice")):null,tagline:a.get("tagline").trim(),description:a.get("description").trim(),emotional:a.get("emotional").trim(),size:a.get("size").trim(),composition:a.get("composition").trim(),category:a.get("category"),badge:a.get("badge")||null,image:b(h),alt:`${a.get("name")} — Flora Atelier`,bestseller:a.get("badge")==="hit",seasonal:a.get("seasonal")==="on",available:a.get("available")==="on",addOns:a.get("addOns")==="on",tags:[],recipient:[],occasion:[],budget:Number(a.get("price"))};n?(l=l.map(c=>c.id===n?{...c,...m}:c),r("Товар обновлён")):(l=[...l,{id:y(l),...m}],r("Товар добавлен")),u(l),n=null,o()})}o();
