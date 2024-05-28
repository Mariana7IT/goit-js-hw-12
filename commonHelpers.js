import{i as d,s as h}from"./assets/vendor-5c957d73.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const m="23963114-6d0d5d874ae460d9125bacd21",p="https://pixabay.com/api/";function g(n){const o=`${p}?key=${m}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(o).then(e=>{if(!e.ok)throw new Error(`Error: ${e.statusText}`);return e.json()}).then(e=>e.hits).catch(e=>(console.log("Fetch error:",e),[]))}let l;document.querySelector(".container");const c=document.querySelector(".gallery"),u=document.getElementById("loader");function y(n){const o=n.map(e=>`<li class="gallery-item">
      <a class="gallery-link" href="${e.webformatURL}">
        <img 
          class="gallery-image" 
          width="360"
          src="${e.largeImageURL}" 
          alt="${e.tags}" 
        />
      </a>
      <ul class='description'>
  <li class="info-title"><strong>Likes</strong><span class="info-text"> ${e.likes}</span></li>
  <li class="info-title"><strong>Views</strong><span class="info-text"> ${e.views}</span></li>
  <li class="info-title"><strong>Comments</strong><span class="info-text"> ${e.comments}</span></li>
  <li class="info-title"><strong>Downloads</strong><span class="info-text"> ${e.downloads}</span></li>
</ul>
    </li>`).join("");c.innerHTML=o}function i(n){d.error({title:"Error",message:n})}function L(){c.innerHTML=""}function b(){u.style.display="block"}function w(){u.style.display="none"}function f(){l=new h(".gallery a",{captionsData:"alt",captionDelay:250})}function x(){l?l.refresh():f()}const $=document.querySelector(".form"),q=document.querySelector(".search-input");document.querySelector(".loader");$.addEventListener("submit",E);function E(n){n.preventDefault();const o=q.value.trim();if(!o){i("Please enter a search term");return}L(),b(),g(o).then(e=>{e.length===0?i("Sorry, there are no images matching your search query. Please try again!"):(y(e),f(),x())}).catch(e=>{i("An error occured while fetching images"),console.error(e)}).finally(()=>{w()})}
//# sourceMappingURL=commonHelpers.js.map
