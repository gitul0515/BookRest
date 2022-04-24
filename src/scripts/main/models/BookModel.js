import { getItem, setItem } from '../../utils/storage.js';
const BOOK_MODEL_DATA_KEY = 'bookModelDataKey';

const data = getItem(BOOK_MODEL_DATA_KEY, [
  {
    title: '사피엔스',
    authors: ['유발 하라리'],
    publisher: '김영사',
    datetime: '2015-11-24T00:00:00.000+09:00',
    isbn: '89349724679788934972464',
    thumbnail:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20220411162844',
    rating: '7',
    notes: [
      {
        id: '1',
        content: '집중하는 삶이 최선의 삶이다.',
        createdAt: '2022. 4. 20. 오후 3:17:28',
        page: 56,
        readCount: 0,
        isFavorite: false,
      },
      {
        id: '2',
        content: '강렬한 집중, 최고의 성과',
        createdAt: '2022. 4. 21. 오후 3:17:28',
        page: 137,
        readCount: 0,
        isFavorite: false,
      },
    ],
  },
]);

export default {
  data,

  list() {
    return new Promise((res) => {
      setTimeout(() => {
        res(this.data);
      }, 0);
    });
  },

  search(query) {
    return Promise.resolve(
      this.data.filter((book) => book.title.includes(query))
    );
  },

  add(newItem) {
    return new Promise((res) => {
      setTimeout(() => {
        this.data = [
          ...this.data,
          {
            ...newItem,
            isbn: this.data.isbn.replace(' ', ''),
            rating: '8',
            notes: [],
          },
        ];
        setItem(BOOK_MODEL_DATA_KEY, this.data);
        res(this.data);
      }, 200);
    });
  },

  getSortedList(sortBy) {
    switch (sortBy) {
      case 'title':
        return Promise.resolve(
          this.data.sort((a, b) => a['title'].localeCompare(b['title']))
        );
      case 'title-reverse':
        return Promise.resolve(
          this.data.sort((a, b) => b['title'].localeCompare(a['title']))
        );
      case 'high-rating':
        return Promise.resolve(
          this.data.sort((a, b) => b['rating'].localeCompare(a['rating']))
        );
      case 'low-rating':
        return Promise.resolve(
          this.data.sort((a, b) => a['rating'].localeCompare(b['rating']))
        );
      default:
        break;
    }
  },

  getNoteList() {
    return this.data.reduce((acc, book) => {
      const { notes, title, authors, thumbnail, isbn } = book;
      if (notes.length) {
        notes.forEach((note) => {
          acc.push({
            ...note,
            title,
            authors,
            thumbnail,
            bookId: isbn,
          });
        });
      }
      return acc;
    }, []);
  },
};
