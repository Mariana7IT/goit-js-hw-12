'use strict';

import { fetchImages } from './js/pixabay-api';
import { renderImages, showError, clearGallery, showLoader, hideLoader, initializeLightbox, refreshLightbox } from './js/render-functions';


const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const span = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    showError('Please enter a search term');
    return;
    }
    clearGallery();
    showLoader();

  fetchImages(query)
    .then(images => {
      if (images.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else {
          renderImages(images);
          initializeLightbox();
          refreshLightbox();
      }
    })
    .catch(error => {
      showError('An error occured while fetching images');
      console.error(error);
    })
      .finally(() => {
          hideLoader();
      });

}

