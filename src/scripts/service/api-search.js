import { DAUM_API_URL, DAUM_API_KEY, DAUM_API_SEARCH_OPTION } from './api-config.js';

export async function fetchBookData(word, page) {
  const res = await fetch(`${DAUM_API_URL}?sort=accuracy&page=${page}&size=20&query=${word}`, {
    headers: {
      Authorization: `KakaoAK ${DAUM_API_KEY}`,
    },
  });
  const json = await res.json();
  return json;
}
