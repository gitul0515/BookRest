import { DAUM_API_URL, DAUM_API_KEY, DAUM_API_SEARCH_OPTION } from './api-config.js';

export default async function searchBook(text) {
  const res = await fetch(`${DAUM_API_URL}${DAUM_API_SEARCH_OPTION}&query=${text}`, {
    headers: {
      Authorization: `KakaoAK ${DAUM_API_KEY}`,
    }
  });
  const json = await res.json();
  return json;
}
