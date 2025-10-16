(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const u="c319be1dedee44ec809073fe58487ba0",m="https://api.spoonacular.com";async function N(e,t={}){const{diet:s,cuisine:a,maxReadyTime:n,number:i=12}=t,r=new URLSearchParams({apiKey:u,query:e,number:i,addRecipeInformation:!0,fillIngredients:!0});s&&r.append("diet",s),a&&r.append("cuisine",a),n&&r.append("maxReadyTime",n);const d=await fetch(`${m}/recipes/complexSearch?${r}`);if(!d.ok)throw new Error("Failed to fetch recipes");return(await d.json()).results}async function A(e=6){const t=new URLSearchParams({apiKey:u,number:e}),s=await fetch(`${m}/recipes/random?${t}`);if(!s.ok)throw new Error("Failed to fetch random recipes");return(await s.json()).recipes}async function F(e){const t=new URLSearchParams({apiKey:u,includeNutrition:!0}),s=await fetch(`${m}/recipes/${e}/information?${t}`);if(!s.ok)throw new Error("Failed to fetch recipe details");return await s.json()}async function g(e,t=3){const s=new URLSearchParams({apiKey:u,type:e,number:t,addRecipeInformation:!0}),a=await fetch(`${m}/recipes/complexSearch?${s}`);if(!a.ok)throw new Error(`Failed to fetch ${e} recipes`);return(await a.json()).results}function S(e){const t=document.createElement("div");t.className="recipe-card";const s=e.readyInMinutes||"N/A",a=e.servings||"N/A";return t.innerHTML=`
    <img src="${e.image}" alt="${e.title}" class="recipe-card-image" loading="lazy">
    <div class="recipe-card-content">
      <h3 class="recipe-card-title">${e.title}</h3>
      <div class="recipe-card-meta">
        <span class="meta-item">⏱️ ${s} min</span>
        <span class="meta-item">👥 ${a} servings</span>
      </div>
    </div>
  `,t.addEventListener("click",()=>{window.location.hash=`/recipe/${e.id}`}),t}function E(){const e=document.createElement("div");return e.className="recipe-card skeleton",e.innerHTML=`
    <div class="skeleton-image"></div>
    <div class="recipe-card-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-meta"></div>
    </div>
  `,e}async function B(e){e.innerHTML=`
    <div class="hero">
      <div class="container">
        <h1 class="hero-title">Discover Amazing Recipes</h1>
        <p class="hero-subtitle">Find, save, and plan delicious meals for every occasion</p>
        <div class="hero-search">
          <input type="text" id="hero-search-input" placeholder="Search for recipes..." class="search-input">
          <button id="hero-search-btn" class="btn btn-primary">Search</button>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Featured Recipes</h2>
        <div id="featured-recipes" class="recipe-grid"></div>
      </div>
    </section>
  `;const t=e.querySelector("#hero-search-input"),s=e.querySelector("#hero-search-btn"),a=()=>{const n=t.value.trim();n&&(window.location.hash=`/browse?q=${encodeURIComponent(n)}`)};s.addEventListener("click",a),t.addEventListener("keypress",n=>{n.key==="Enter"&&a()}),await x()}async function x(){const e=document.getElementById("featured-recipes");for(let t=0;t<6;t++)e.appendChild(E());try{const t=await A(6);e.innerHTML="",t.forEach(s=>{e.appendChild(S(s))})}catch{e.innerHTML=`
      <div class="error-message">
        <p>Failed to load recipes. Please check your API key and try again.</p>
      </div>
    `}}async function D(e){const s=new URLSearchParams(window.location.hash.split("?")[1]).get("q")||"";e.innerHTML=`
    <div class="section">
      <div class="container">
        <h1>Browse Recipes</h1>

        <div class="search-section">
          <div class="search-bar">
            <input type="text" id="search-input" placeholder="Search recipes..." class="search-input" value="${s}">
            <button id="search-btn" class="btn btn-primary">Search</button>
          </div>

          <div class="filters">
            <select id="diet-filter" class="filter-select">
              <option value="">All Diets</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Keto</option>
              <option value="paleo">Paleo</option>
            </select>

            <select id="cuisine-filter" class="filter-select">
              <option value="">All Cuisines</option>
              <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
              <option value="mexican">Mexican</option>
              <option value="indian">Indian</option>
              <option value="japanese">Japanese</option>
              <option value="mediterranean">Mediterranean</option>
            </select>

            <select id="time-filter" class="filter-select">
              <option value="">Any Time</option>
              <option value="15">Under 15 min</option>
              <option value="30">Under 30 min</option>
              <option value="60">Under 1 hour</option>
            </select>
          </div>
        </div>

        <div id="results" class="recipe-grid"></div>
      </div>
    </div>
  `;const a=e.querySelector("#search-input"),n=e.querySelector("#search-btn"),i=e.querySelector("#diet-filter"),r=e.querySelector("#cuisine-filter"),d=e.querySelector("#time-filter"),c=e.querySelector("#results"),o=async()=>{const f=a.value.trim()||"popular",I=i.value,C=r.value,H=d.value;c.innerHTML="";for(let l=0;l<12;l++)c.appendChild(E());try{const l=await N(f,{diet:I,cuisine:C,maxReadyTime:H,number:12});if(c.innerHTML="",l.length===0){c.innerHTML='<p class="no-results">No recipes found. Try different filters.</p>';return}l.forEach(q=>{c.appendChild(S(q))})}catch{c.innerHTML='<div class="error-message"><p>Failed to load recipes. Please try again.</p></div>'}};n.addEventListener("click",o),a.addEventListener("keypress",f=>{f.key==="Enter"&&o()}),i.addEventListener("change",o),r.addEventListener("change",o),d.addEventListener("change",o),s&&o()}const L="feast_together_saved_recipes",w="feast_together_saved_meal_plans";function O(e){const t=h();return t.find(s=>s.id===e.id)?!1:(t.push(e),localStorage.setItem(L,JSON.stringify(t)),!0)}function T(e){const s=h().filter(a=>a.id!==e);localStorage.setItem(L,JSON.stringify(s))}function h(){const e=localStorage.getItem(L);return e?JSON.parse(e):[]}function _(e){return h().some(s=>s.id===e)}function z(e){const t=$(),s={id:Date.now(),...e,savedAt:new Date().toISOString()};return t.push(s),localStorage.setItem(w,JSON.stringify(t)),!0}function U(e){const s=$().filter(a=>a.id!==e);localStorage.setItem(w,JSON.stringify(s))}function $(){const e=localStorage.getItem(w);return e?JSON.parse(e):[]}function p(e,t="success"){const s=document.querySelector(".toast");s&&s.remove();const a=document.createElement("div");a.className=`toast toast-${t}`,a.textContent=e,document.body.appendChild(a),setTimeout(()=>{a.classList.add("show")},10),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>{a.remove()},300)},3e3)}async function K(e,t){e.innerHTML=`
    <div class="container">
      <div class="loading">Loading recipe details...</div>
    </div>
  `;try{const s=await F(t),a=_(s.id);e.innerHTML=`
      <div class="recipe-detail">
        <div class="container">
          <button class="btn-back" onclick="history.back()">← Back</button>

          <div class="recipe-header">
            <div class="recipe-header-content">
              <h1 class="recipe-title">${s.title}</h1>
              <div class="recipe-meta">
                <span class="meta-item">⏱️ ${s.readyInMinutes} minutes</span>
                <span class="meta-item">👥 ${s.servings} servings</span>
                ${s.vegetarian?'<span class="meta-badge">🌱 Vegetarian</span>':""}
                ${s.vegan?'<span class="meta-badge">🌿 Vegan</span>':""}
                ${s.glutenFree?'<span class="meta-badge">🌾 Gluten Free</span>':""}
              </div>
              <button id="save-btn" class="btn ${a?"btn-secondary":"btn-primary"}">
                ${a?"❤️ Saved":"🤍 Save Recipe"}
              </button>
            </div>
            <img src="${s.image}" alt="${s.title}" class="recipe-image">
          </div>

          <div class="recipe-content">
            <div class="recipe-section">
              <h2>Ingredients</h2>
              <ul class="ingredients-list">
                ${s.extendedIngredients.map(r=>`
                  <li>${r.original}</li>
                `).join("")}
              </ul>
            </div>

            <div class="recipe-section">
              <h2>Instructions</h2>
              <div class="instructions">
                ${s.instructions?s.instructions:"<p>No instructions available.</p>"}
              </div>
            </div>

            ${s.nutrition?`
              <div class="recipe-section">
                <h2>Nutrition (per serving)</h2>
                <div class="nutrition-grid">
                  ${s.nutrition.nutrients.slice(0,8).map(r=>`
                    <div class="nutrition-item">
                      <span class="nutrition-label">${r.name}</span>
                      <span class="nutrition-value">${Math.round(r.amount)}${r.unit}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `;const n=e.querySelector("#save-btn");let i=a;n.addEventListener("click",()=>{i?(T(s.id),n.className="btn btn-primary",n.textContent="🤍 Save Recipe",p("Recipe removed from saved","info"),i=!1):(O(s),n.className="btn btn-secondary",n.textContent="❤️ Saved",p("Recipe saved successfully!","success"),i=!0)})}catch{e.innerHTML=`
      <div class="container">
        <div class="error-message">
          <p>Failed to load recipe details. Please try again.</p>
          <button class="btn btn-primary" onclick="history.back()">Go Back</button>
        </div>
      </div>
    `}}let v=null;async function G(e){e.innerHTML=`
    <div class="section">
      <div class="container">
        <h1>3-Course Meal Planner</h1>
        <p class="subtitle">Generate a complete meal with appetizer, main course, and dessert</p>

        <div class="meal-plan-actions">
          <button id="generate-plan-btn" class="btn btn-primary">Generate Meal Plan</button>
          <button id="save-plan-btn" class="btn btn-secondary" style="display: none;">Save This Meal Plan</button>
        </div>

        <div id="meal-plan-content"></div>
      </div>
    </div>
  `;const t=e.querySelector("#generate-plan-btn"),s=e.querySelector("#save-plan-btn"),a=e.querySelector("#meal-plan-content");t.addEventListener("click",async()=>{t.disabled=!0,t.textContent="Generating...",s.style.display="none",a.innerHTML=`
      <div class="meal-plan-loading">
        <div class="loading">Creating your perfect 3-course meal...</div>
      </div>
    `;try{const[n,i,r]=await Promise.all([g("appetizer",1),g("main course",1),g("dessert",1)]);v={appetizer:n[0],main:i[0],dessert:r[0],generatedAt:new Date().toISOString()},j(a,v),s.style.display="inline-block"}catch{a.innerHTML=`
        <div class="error-message">
          <p>Failed to generate meal plan. Please try again.</p>
        </div>
      `}finally{t.disabled=!1,t.textContent="Generate New Meal Plan"}}),s.addEventListener("click",()=>{v&&(z(v),p("Meal plan saved successfully!","success"))})}function j(e,t){e.innerHTML=`
    <div class="meal-plan">
      ${y("Appetizer",t.appetizer)}
      ${y("Main Course",t.main)}
      ${y("Dessert",t.dessert)}
    </div>
  `}function y(e,t){return t?`
    <div class="course-card">
      <h3 class="course-title">${e}</h3>
      <div class="course-content" onclick="window.location.hash='/recipe/${t.id}'">
        <img src="${t.image}" alt="${t.title}" class="course-image">
        <div class="course-info">
          <h4>${t.title}</h4>
          <div class="course-meta">
            <span>⏱️ ${t.readyInMinutes} min</span>
            <span>👥 ${t.servings} servings</span>
          </div>
        </div>
      </div>
    </div>
  `:""}function J(e){e.innerHTML=`
    <div class="section">
      <div class="container">
        <h1>Saved Items</h1>

        <div class="tabs">
          <button class="tab-btn active" data-tab="recipes">Saved Recipes</button>
          <button class="tab-btn" data-tab="meal-plans">Saved Meal Plans</button>
        </div>

        <div class="tab-content">
          <div id="recipes-tab" class="tab-pane active"></div>
          <div id="meal-plans-tab" class="tab-pane"></div>
        </div>
      </div>
    </div>
  `;const t=e.querySelectorAll(".tab-btn"),s=e.querySelector("#recipes-tab"),a=e.querySelector("#meal-plans-tab");t.forEach(n=>{n.addEventListener("click",()=>{t.forEach(r=>r.classList.remove("active")),n.classList.add("active");const i=n.dataset.tab;s.classList.toggle("active",i==="recipes"),a.classList.toggle("active",i==="meal-plans")})}),k(s),P(a)}function k(e){const t=h();if(t.length===0){e.innerHTML='<p class="empty-message">No saved recipes yet. Start browsing to save your favorites!</p>';return}e.innerHTML='<div class="recipe-grid"></div>';const s=e.querySelector(".recipe-grid");t.forEach(a=>{const n=S(a),i=document.createElement("button");i.className="delete-btn",i.textContent="×",i.onclick=r=>{r.stopPropagation(),T(a.id),p("Recipe removed from saved","info"),k(e)},n.appendChild(i),s.appendChild(n)})}function P(e){const t=$();if(t.length===0){e.innerHTML='<p class="empty-message">No saved meal plans yet. Generate a meal plan to save it!</p>';return}e.innerHTML='<div class="saved-plans"></div>';const s=e.querySelector(".saved-plans");t.forEach(a=>{const n=document.createElement("div");n.className="saved-plan-card";const i=new Date(a.savedAt).toLocaleDateString();n.innerHTML=`
      <div class="saved-plan-header">
        <h3>Meal Plan - ${i}</h3>
        <button class="delete-btn" data-id="${a.id}">×</button>
      </div>
      <div class="saved-plan-courses">
        ${b("Appetizer",a.appetizer)}
        ${b("Main Course",a.main)}
        ${b("Dessert",a.dessert)}
      </div>
    `;const r=n.querySelector(".delete-btn");r.onclick=()=>{U(a.id),p("Meal plan removed","info"),P(e)},s.appendChild(n)})}function b(e,t){return t?`
    <div class="mini-course" onclick="window.location.hash='/recipe/${t.id}'">
      <img src="${t.image}" alt="${t.title}">
      <div>
        <strong>${e}</strong>
        <p>${t.title}</p>
      </div>
    </div>
  `:""}function R(){const e=window.location.hash.slice(1)||"/",t=document.getElementById("main-content");if(e==="/"||e==="")B(t);else if(e.startsWith("/browse"))D(t);else if(e.startsWith("/recipe/")){const s=e.split("/")[2];K(t,s)}else e==="/meal-plan"?G(t):e==="/saved"?J(t):t.innerHTML='<div class="container"><h1>404 - Page Not Found</h1></div>'}function V(){const e=document.getElementById("header");e.innerHTML=`
    <header class="header">
      <div class="container">
        <nav class="nav">
          <a href="#/" class="logo">🍽️ Feast Together</a>
          <button class="menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul class="nav-links">
            <li><a href="#/" class="nav-link">Home</a></li>
            <li><a href="#/browse" class="nav-link">Browse Recipes</a></li>
            <li><a href="#/meal-plan" class="nav-link">Meal Planner</a></li>
            <li><a href="#/saved" class="nav-link">Saved</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;const t=e.querySelector(".menu-toggle"),s=e.querySelector(".nav-links");t.addEventListener("click",()=>{s.classList.toggle("active")}),window.addEventListener("hashchange",()=>{s.classList.remove("active"),M()}),M()}function M(){const e=window.location.hash||"#/";document.querySelectorAll(".nav-link").forEach(s=>{s.classList.remove("active"),s.getAttribute("href")===e&&s.classList.add("active")})}document.querySelector("#app").innerHTML=`
  <div id="header"></div>
  <main id="main-content"></main>
`;V();R();window.addEventListener("hashchange",R);
