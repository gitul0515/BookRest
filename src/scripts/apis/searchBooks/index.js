export async function searchBooks(searchWord, page) {
  const res = await fetch(
    `https://dapi.kakao.com/v3/search/book?sort=accuracy&page=${page}&size=10&query=${searchWord}`,
    {
      headers: {
        Authorization: `KakaoAK ${MY_API_KEY}`,
      },
    },
  );
  return res.json();
}
