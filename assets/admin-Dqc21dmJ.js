import{r as v,c as g,b as $,f as b,i as _,a as y,d as E,s as u,g as P}from"./order-jjY6qviq.js";const f="/flower-shop/";let d=v(),s=null;function p(e){return e?e.startsWith("http")||e.startsWith("/")?e:`${f}images/${e}`:""}function k(e){const t=e.image||"";if(t.includes("/images/")){const n=t.split("/images/").pop();return p(n)}return t}function I(e){const n=(e.image||"").match(/images\/([^/?#]+)/);return n?n[1]:"bouquet-01.webp"}function o(e){let t=document.querySelector(".admin-toast");t||(t=document.createElement("div"),t.className="admin-toast",document.body.appendChild(t)),t.textContent=e,t.classList.add("is-visible"),setTimeout(()=>t.classList.remove("is-visible"),2600)}function L(){const e=d.filter(a=>a.available!==!1).length,t=d.filter(a=>a.bestseller).length,n=d.filter(a=>a.seasonal).length;return`
    <div class="admin__stats">
      <div class="stat-card"><div class="stat-card__label">Всего</div><div class="stat-card__value">${d.length}</div></div>
      <div class="stat-card"><div class="stat-card__label">Активных</div><div class="stat-card__value">${e}</div></div>
      <div class="stat-card"><div class="stat-card__label">Хиты</div><div class="stat-card__value">${t}</div></div>
      <div class="stat-card"><div class="stat-card__label">Сезон</div><div class="stat-card__value">${n}</div></div>
    </div>
  `}function w(){return`
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
        ${d.map(e=>{var i;const t=((i=g.find(l=>l.id===e.category))==null?void 0:i.label)||e.category,n=e.available===!1?'<span class="badge-pill badge-pill--off">Скрыт</span>':'<span class="badge-pill">Активен</span>',a=e.badge?`<span class="badge-pill">${$[e.badge]||e.badge}</span>`:"";return`
              <tr>
                <td><img class="products-table__thumb" src="${k(e)}" alt=""></td>
                <td>
                  <div class="products-table__name">${e.name}</div>
                  ${a}
                </td>
                <td>${t}</td>
                <td class="products-table__price">${b(e.price)}${e.oldPrice?` <s>${b(e.oldPrice)}</s>`:""}</td>
                <td>${n}</td>
                <td>
                  <button class="btn btn--secondary btn--sm" data-edit="${e.id}">Изменить</button>
                  <button class="btn btn--danger btn--sm" data-delete="${e.id}">Удалить</button>
                </td>
              </tr>
            `}).join("")}
      </tbody>
    </table>
  `}function x(e=null){const t=e||{name:"",price:"",oldPrice:"",description:"",emotional:"",category:"bouquets",badge:"",image:"bouquet-01.webp",bestseller:!1,seasonal:!1,available:!0,addOns:!0},n=e?I(e):t.image;return`
    <form class="admin-form" id="product-form">
      <h2 class="admin-form__title">${s?"Редактировать товар":"Добавить товар"}</h2>
      <div class="form-grid">
        <div class="form-field">
          <label for="name">Название</label>
          <input id="name" name="name" required value="${t.name||""}">
        </div>
        <div class="form-field">
          <label for="category">Категория</label>
          <select id="category" name="category">
            ${g.map(a=>`<option value="${a.id}" ${t.category===a.id?"selected":""}>${a.label}</option>`).join("")}
          </select>
        </div>
        <div class="form-field">
          <label for="price">Цена (₽)</label>
          <input id="price" name="price" type="number" min="0" required value="${t.price??""}">
        </div>
        <div class="form-field">
          <label for="oldPrice">Старая цена (₽)</label>
          <input id="oldPrice" name="oldPrice" type="number" min="0" value="${t.oldPrice??""}">
        </div>
        <div class="form-field form-grid__full">
          <label for="description">Описание</label>
          <textarea id="description" name="description">${t.description||""}</textarea>
        </div>
        <div class="form-field form-grid__full">
          <label for="emotional">Эмоциональный текст</label>
          <textarea id="emotional" name="emotional">${t.emotional||""}</textarea>
        </div>
        <div class="form-field">
          <label for="image">Фотография</label>
          <select id="image" name="image">
            ${_.map(a=>`<option value="${a}" ${n===a?"selected":""}>${a}</option>`).join("")}
          </select>
        </div>
        <div class="form-field">
          <label for="badge">Badge</label>
          <select id="badge" name="badge">
            ${y.map(a=>`<option value="${a.id}" ${(t.badge||"")===a.id?"selected":""}>${a.label}</option>`).join("")}
          </select>
        </div>
        <div class="form-field form-grid__full form-checks">
          <label><input type="checkbox" name="bestseller" ${t.bestseller?"checked":""}> Хит продаж</label>
          <label><input type="checkbox" name="seasonal" ${t.seasonal?"checked":""}> Сезонный</label>
          <label><input type="checkbox" name="available" ${t.available!==!1?"checked":""}> Показывать на сайте</label>
          <label><input type="checkbox" name="addOns" ${t.addOns?"checked":""}> Доп. товары</label>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn--primary">${s?"Сохранить":"Добавить"}</button>
        ${s?'<button type="button" class="btn btn--secondary" id="cancel-edit">Отмена</button>':""}
      </div>
    </form>
  `}function r(){const e=document.getElementById("admin-app");e.innerHTML=`
    <div class="admin">
      <header class="admin__header">
        <h1 class="admin__title">Flora Atelier — админ</h1>
        <div class="admin__actions">
          <a href="${f}" class="btn btn--secondary">← На сайт</a>
          <button class="btn btn--secondary" id="reset-data">Сбросить данные</button>
          <button class="btn btn--primary" id="add-new">+ Товар</button>
        </div>
      </header>
      <main class="admin__main">
        ${L()}
        ${w()}
        ${x(s?d.find(t=>t.id===s):null)}
      </main>
    </div>
  `,q()}function q(){var e,t,n,a;(e=document.getElementById("add-new"))==null||e.addEventListener("click",()=>{var i;s=null,r(),(i=document.getElementById("product-form"))==null||i.scrollIntoView({behavior:"smooth"})}),(t=document.getElementById("cancel-edit"))==null||t.addEventListener("click",()=>{s=null,r()}),(n=document.getElementById("reset-data"))==null||n.addEventListener("click",()=>{confirm("Вернуть каталог к исходным данным?")&&(E(),d=v(),s=null,r(),o("Данные сброшены"))}),document.querySelectorAll("[data-edit]").forEach(i=>{i.addEventListener("click",()=>{var l;s=i.dataset.edit,r(),(l=document.getElementById("product-form"))==null||l.scrollIntoView({behavior:"smooth"})})}),document.querySelectorAll("[data-delete]").forEach(i=>{i.addEventListener("click",()=>{confirm("Удалить этот товар?")&&(d=d.filter(l=>l.id!==i.dataset.delete),u(d),s===i.dataset.delete&&(s=null),r(),o("Товар удалён"))})}),(a=document.getElementById("product-form"))==null||a.addEventListener("submit",i=>{i.preventDefault();const l=new FormData(i.target),h=l.get("image"),m={name:l.get("name").trim(),price:Number(l.get("price")),oldPrice:l.get("oldPrice")?Number(l.get("oldPrice")):null,description:l.get("description").trim(),emotional:l.get("emotional").trim(),category:l.get("category"),badge:l.get("badge")||null,image:p(h),alt:`${l.get("name")} — Flora Atelier`,bestseller:l.get("bestseller")==="on",seasonal:l.get("seasonal")==="on",available:l.get("available")==="on",addOns:l.get("addOns")==="on",tags:[],recipient:[],occasion:[],budget:Number(l.get("price"))};s?(d=d.map(c=>c.id===s?{...c,...m}:c),o("Товар обновлён")):(d=[...d,{id:P(d),...m}],o("Товар добавлен")),u(d),s=null,r()})}r();
