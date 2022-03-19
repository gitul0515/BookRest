const sortBtn = document.querySelector('.sort-btn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');

sortBtn.addEventListener('click', () => {
  modal.classList.add('show');
  modalContent.classList.add('move-up');
});

document.addEventListener('click', event => {
  const { target } = event;
  if (target.className === 'modal show') {
    modal.classList.remove('show');
    modalContent.classList.remove('move-up');
  }
})