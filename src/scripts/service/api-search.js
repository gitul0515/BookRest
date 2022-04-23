import { DAUM_API_URL, DAUM_API_KEY, DAUM_API_SEARCH_OPTION } from './api-config.js';

export async function fetchBookData(query) {
  const res = await fetch(`${DAUM_API_URL}${DAUM_API_SEARCH_OPTION}&query=${query}`, {
    headers: {
      Authorization: `KakaoAK ${DAUM_API_KEY}`,
    }
  });
  const json = await res.json();
  return json;
}
