import { API_END_POINT, API_KEY } from './config.js';

export async function searchBooks(searchWord, page) {
  const res = await fetch(
    `${API_END_POINT}?sort=accuracy&page=${page}&size=10&query=${searchWord}`,
    {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    },
  );
  return res.json();
}
