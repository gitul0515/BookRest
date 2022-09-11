import { getCurrentTime } from '../scripts/utils/date.js';

export const initialData = [
  {
    title: '사피엔스',
    id: '89349724679788934972464',
    authors: ['유발 하라리'],
    publisher: '김영사',
    datetime: '2015-11-24T00:00:00.000+09:00',
    thumbnail:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20220411162844',
    rating: '7',
    notes: [
      {
        id: '1',
        content: '집중하는 삶이 최선의 삶이다.',
        createdAt: getCurrentTime(),
        page: 56,
        readCount: 0,
        isFavorite: false,
        comments: ['멋진 글귀네요'],
        bookId: '89349724679788934972464',
        title: '사피엔스',
        authors: ['유발 하라리'],
        thumbnail:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20220411162844',
      },
      {
        id: '2',
        content: '강렬한 집중, 최고의 성과',
        createdAt: getCurrentTime(),
        page: 137,
        readCount: 0,
        isFavorite: false,
        comments: [],
        title: '사피엔스',
        authors: ['유발 하라리'],
        thumbnail:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20220411162844',
      },
    ],
  },
];
