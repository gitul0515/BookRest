import { API_KEY } from './config.js';

export async function searchBooks(searchWord, page) {
  const res = await fetch(
    `https://dapi.kakao.com/v3/search/book?sort=accuracy&page=${page}&size=10&query=${searchWord}`,
    {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    },
  );
  return res.json();
}
