'use strict';

import { fetchImages } from './js/pixabay-api';
import {
  renderImages,
  showError,
  clearGallery,
  showLoader,
  hideLoader,
  initializeLightbox,
  refreshLightbox,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollPage
} from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const loadMoreButton = document.getElementById('load-more');
const loadingText = document.getElementById('loading-text');

document.querySelector('#load-more').textContent = 'Load more';

let currentQuery = '';
let totalHits = 0; 
let loadedHits = 0; 

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  currentQuery = searchInput.value.trim();

  if (!currentQuery) {
    showError('Please enter a search term');
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  loadingText.style.display = 'block'; 

  try {
    const data = await fetchImages(currentQuery, true);
    totalHits = data.totalHits; 
    loadedHits = data.hits.length; 

    if (loadedHits === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderImages(data.hits);
      refreshLightbox();
      if (loadedHits < totalHits) { 
        showLoadMoreButton();
      }
    }
  } catch (error) {
    showError('An error occurred while fetching images');
    console.error(error);
  } finally {
    hideLoader();
    loadingText.style.display = 'none'; 
  }
}

async function handleLoadMore() {
  showLoader();
  loadMoreButton.style.display = 'none'; 
  loadingText.style.display = 'block'; 

  try {
    const data = await fetchImages(currentQuery);
    loadedHits += data.hits.length;

    if (loadedHits >= totalHits) {
      showError("We're sorry, but you've reached the end of search results.");
      hideLoadMoreButton();
    } else {
      renderImages(data.hits);
      refreshLightbox();
      scrollPage();
      if (loadedHits < totalHits) { 
        showLoadMoreButton();
      }
    }
  } catch (error) {
    showError('An error occurred while fetching images');
    console.error(error);
  } finally {
    hideLoader();
    loadingText.style.display = 'none'; 
  }
}

document.addEventListener('DOMContentLoaded', smoothScroll);

function smoothScroll() {
  const galleryItemHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth' 
  });
}