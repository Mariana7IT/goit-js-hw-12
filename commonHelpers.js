import{a as I,i as v,s as S}from"./assets/vendor-da73009b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const M="23963114-6d0d5d874ae460d9125bacd21",q="https://pixabay.com/api/";let f=1;async function m(e,o=!1){o&&(f=1);const r=`${q}?key=${M}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${f}`;try{const s=await I.get(r);if(s.status!==200)throw new Error(`Error: ${s.statusText}`);return f+=1,s.data}catch(s){return console.error("Fetch error:",s),{hits:[],totalHits:0}}}let y;document.querySelector(".container");const h=document.querySelector(".gallery"),g=document.getElementById("loader"),p=document.getElementById("load-more");function L(e){const o=e.map(r=>`<li class="gallery-item">
      <a class="gallery-link" href="${r.webformatURL}">
        <img 
          class="gallery-image" 
          width="360"
          src="${r.largeImageURL}" 
          alt="${r.tags}" 
        />
      </a>
      <ul class='description'>
        <li class="info-title"><strong>Likes</strong><span class="info-text"> ${r.likes}</span></li>
        <li class="info-title"><strong>Views</strong><span class="info-text"> ${r.views}</span></li>
        <li class="info-title"><strong>Comments</strong><span class="info-text"> ${r.comments}</span></li>
        <li class="info-title"><strong>Downloads</strong><span class="info-text"> ${r.downloads}</span></li>
      </ul>
    </li>`).join("");h.insertAdjacentHTML("beforeend",o)}function l(e){v.error({title:"Error",message:e})}function H(){h.innerHTML=""}function w(){g.style.display="block"}function b(){g.style.display="none"}function x(){p.style.display="block"}function E(){p.style.display="none"}function P(){y=new S(".gallery a",{captionsData:"alt",captionDelay:250})}function B(){y?y.refresh():P()}function C(){const{height:e}=h.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}const O=document.querySelector(".form"),A=document.querySelector(".search-input"),$=document.getElementById("load-more"),c=document.getElementById("loading-text");document.querySelector("#load-more").textContent="Load more";let a="",d=0,i=0;O.addEventListener("submit",R);$.addEventListener("click",k);async function R(e){if(e.preventDefault(),a=A.value.trim(),!a){l("Please enter a search term");return}H(),E(),w(),c.style.display="block";try{const o=await m(a,!0);d=o.totalHits,i=o.hits.length,i===0?l("Sorry, there are no images matching your search query. Please try again!"):(L(o.hits),B(),i<d&&x())}catch(o){l("An error occurred while fetching images"),console.error(o)}finally{b(),c.style.display="none"}}async function k(){w(),$.style.display="none",c.style.display="block";try{const e=await m(a);i+=e.hits.length,i>=d?(l("We're sorry, but you've reached the end of search results."),E()):(L(e.hits),B(),C(),i<d&&x())}catch(e){l("An error occurred while fetching images"),console.error(e)}finally{b(),c.style.display="none"}}document.addEventListener("DOMContentLoaded",D);function D(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
