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

document.querySelector('#load-more').textContent = 'Load more';

let currentQuery = '';

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
  
  try {
    const data = await fetchImages(currentQuery, true);
    if (data.hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderImages(data.hits);
      showLoadMoreButton();
      refreshLightbox();
    }
  } catch (error) {
    showError('An error occurred while fetching images');
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  showLoader();

  try {
    const data = await fetchImages(currentQuery);
    if (data.hits.length === 0) {
      showError("We're sorry, but you've reached the end of search results.");
      hideLoadMoreButton();
    } else {
      renderImages(data.hits);
      refreshLightbox();
      scrollPage();
      smoothScroll();
    }
  } catch (error) {
    showError('An error occurred while fetching images');
    console.error(error);
  } finally {
    hideLoader();
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

