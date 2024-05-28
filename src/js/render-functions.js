
'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;
const container = document.querySelector('.container');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');


export function renderImages(images) {

  const imageMarkup = images
    .map(
      img => `<li class="gallery-item">
      <a class="gallery-link" href="${img.webformatURL}">
        <img 
          class="gallery-image" 
          width="360"
          src="${img.largeImageURL}" 
          alt="${img.tags}" 
        />
      </a>
      <ul class='description'>
  <li class="info-title"><strong>Likes</strong><span class="info-text"> ${img.likes}</span></li>
  <li class="info-title"><strong>Views</strong><span class="info-text"> ${img.views}</span></li>
  <li class="info-title"><strong>Comments</strong><span class="info-text"> ${img.comments}</span></li>
  <li class="info-title"><strong>Downloads</strong><span class="info-text"> ${img.downloads}</span></li>
</ul>
    </li>`
    )
    .join('');
    
    gallery.innerHTML = imageMarkup;
}


export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function initializeLightbox() {
  lightbox = new simpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    initializeLightbox();
  }
}