const form = document.querySelector('.img-upload__form');
const fileFild = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');


const showModul = () => {
  overlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};


fileFild.addEventListener('change', showModul);
