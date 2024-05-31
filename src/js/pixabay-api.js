'use strict';

import axios from 'axios';

const API_KEY = '23963114-6d0d5d874ae460d9125bacd21';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;

export async function fetchImages(query, resetPage = false) {
  if (resetPage) {
    page = 1;
  }

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }

    page += 1;
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return { hits: [], totalHits: 0 };
  }
}