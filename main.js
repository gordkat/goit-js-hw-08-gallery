import gallery__items from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const bigImgRef = document.querySelector('.lightbox__image');

const createMarkupItem = (item, index) => {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');
  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.setAttribute('href', item.original);
  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.setAttribute('src', item.preview);
  imgRef.setAttribute('data-source', item.original);
  imgRef.setAttribute('alt', item.description);
  imgRef.setAttribute('data-index', index);
  itemRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);
  return itemRef;
};

const markupItemsArr = gallery__items.map((item, idx) =>
  createMarkupItem(item, idx),
);

galleryRef.append(...markupItemsArr);

const updateBigImg = smallImg => {
  bigImgRef.src = smallImg.dataset.source;
  bigImgRef.alt = smallImg.alt;
  bigImgRef.setAttribute('data-index', smallImg.dataset.index);
};

const closeModal = () => {
  modalRef.classList.remove('is-open');
  bigImgRef.src = '';
  window.removeEventListener('keydown', handelByKeydown);
};

const handelCloseModal = event => {
  if (event.target.nodeName === 'IMG') return;
  closeModal();
};

const moveRight = () => {
  const nextIndex = Number(bigImgRef.dataset.index) + 1;
  if (nextIndex >= gallery__items.length) return;
  const stringDataIndex = `[data-index='${nextIndex}']`;
  const nextImg = document.querySelector(stringDataIndex);
  updateBigImg(nextImg);
};

const moveLeft = () => {
  const prevIndex = Number(bigImgRef.dataset.index) - 1;
  if (prevIndex < 0) return;
  const stringDataIndex = `[data-index='${prevIndex}']`;
  const prevImg = document.querySelector(stringDataIndex);
  updateBigImg(prevImg);
};

const handelByKeydown = event => {
  console.log(event.code);
  if (event.code === 'Escape') closeModal();
  if (event.code === 'ArrowRight') moveRight();
  if (event.code === 'ArrowLeft') moveLeft();
};

const handelOpenModal = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  modalRef.classList.add('is-open');
  updateBigImg(event.target);
  window.addEventListener('keydown', handelByKeydown);
};

galleryRef.addEventListener('click', handelOpenModal);
modalRef.addEventListener('click', handelCloseModal);
