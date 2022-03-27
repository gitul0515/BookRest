const searchForm = document.querySelector('.search-form');
const searchFormInput = document.querySelector('.search-form__input');
const searchList = document.querySelector('.search__list');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = searchFormInput.value;
  fetch(`https://dapi.kakao.com/v3/search/book?sort=accuracy&page=1&size=10&query=${text}`, {
    headers: {
      Authorization: 'KakaoAK c563bb5b0a0e4238e0584599a290debc',
    }
  })
  .then(response => response.json())
  .then(result => result.documents.forEach(item => {
    console.log(item.title);
  }))
});

