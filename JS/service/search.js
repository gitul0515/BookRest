import { DAUM_API_URL, DAUM_API_KEY } from './config.js';

fetch(`https://dapi.kakao.com/v3/search/book?sort=accuracy&page=1&size=10&query=%EC%82%AC%ED%94%BC%EC%97%94%EC%8A%A4`, {
  headers: {
    Authorization: 'KakaoAK c563bb5b0a0e4238e0584599a290debc',
  }
})
.then(response => response.json())
.then(console.log);