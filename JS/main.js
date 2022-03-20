const nav = document.querySelector('.footer__nav');
nav.addEventListener('click', e => {
  console.log(e.target.id);
});


const body = document.querySelector('body');

// 정렬 버튼
const sortBtn = document.querySelector('.sort-btn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');

sortBtn.addEventListener('click', () => {
  showModal();
});
document.addEventListener('click', e => {
  if (e.target.className === 'modal show') {
    removeModal();
  }
})

function showModal() {
  modal.classList.add('show');
  modalContent.classList.add('move-up');
}
function removeModal() {
  modal.classList.remove('show');
  modalContent.classList.remove('move-up');
}

// 미완성: book-item을 기준에 따라 정렬한다.
modalContent.addEventListener('click', e => {
  const { target } = e;
  if (target.nodeName !== 'BUTTON') return;
  switch (target.dataset.sortBy) {
    case 'new':
      console.log('new');
      break;
    case 'old':
      console.log('old');
      break;
    case 'title':
      console.log('title');
      break;
    case 'title-reverse':
      console.log('title-reverse');
      break;
    case 'high-score':
      console.log('high-score');
      break;
    case 'low-score':
      console.log('low-score');
      break;
    default:
      throw new Error('invalid value');
  }
  sortBtn.textContent = target.textContent;
  removeModal();
});

const bookItems = [...document.querySelectorAll('.book-item')];

