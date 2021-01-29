{
  /* <li class="gallery__item">
    <a
        class="gallery__link"
        href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
    >
        <img
            class="gallery__image"
            src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
            data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
            alt="Tulips"
        />
    </a>
</li> */
}

import gallery__items from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const bigImgRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector('[data-action="close-lightbox"]');

const markupItem = (item, index) => {
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

const markupItemsArr = gallery__items.map((item, idx) => markupItem(item, idx));
galleryRef.append(...markupItemsArr);

const updateBigImg = smallImg => {
  bigImgRef.src = smallImg.dataset.source;
  bigImgRef.alt = smallImg.alt;
  bigImgRef.setAttribute('data-index', smallImg.dataset.index);
};
const handelMarkupItem = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  modalRef.classList.add('is-open');
  updateBigImg(event.target);
};
const closeModal = () => {
  modalRef.classList.remove('is-open');
  bigImgRef.src = '';
};

const handelCloseModal = event => {
  if (event.target.nodeName === 'IMG') return;
  closeModal();
};

const moveRight = () => {
  const nextIndex = Number(bigImgRef.dataset.index) + 1;
  const stringDataIndex = `[data-index='${nextIndex}']`;
  const nextImg = document.querySelector(stringDataIndex);
  console.log(nextImg);
  //   updateBigImg();
};
const handelCloseModalByEsc = event => {
  console.log(event.code);

  if (event.code === 'Escape') closeModal();
  if (event.code === 'ArrowRight') moveRight();
  if (event.code === 'ArrowLeft') moveLeft();

  console.log(event.code);
};

galleryRef.addEventListener('click', handelMarkupItem);
modalRef.addEventListener('click', handelCloseModal);
window.addEventListener('keydown', handelCloseModalByEsc);
