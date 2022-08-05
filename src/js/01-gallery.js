// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';

import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const refs = {
  gallery: document.querySelector('div.gallery'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);

refs.gallery.innerHTML = galleryMarkup;

const modalOptions = {
  captionsData: 'alt',
  captionDelay: 250,
};

const modal = createModal('.gallery a', modalOptions);

//--------------FUNCTIONS------------------------

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}"  />
        </a>
        `;
    })
    .join('');
}

function createModal(node, opts) {
  return new SimpleLightbox(node, opts);
}
