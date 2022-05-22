import { getItem, setItem } from '../../utils/storage.js';
import { getCurrentTime } from '../../utils/date.js';
const BOOK_MODEL_DATA_KEY = 'bookModelDataKey';

const data = getItem(BOOK_MODEL_DATA_KEY, [
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
      },
      {
        id: '2',
        content: '강렬한 집중, 최고의 성과',
        createdAt: getCurrentTime(),
        page: 137,
        readCount: 0,
        isFavorite: false,
      },
    ],
  },
]);

export default {
  state: data,

  setState(nextState) {
    this.state = nextState;
  },

  get totalNumberOfBooks() {
    return this.state.length;
  },

  get totalNumberOfNotes() {
    let result = 0;
    this.state.forEach((book) => {
      result += book.notes.length;
    });
    return result;
  },

  list() {
    return new Promise((res) => {
      setTimeout(() => {
        res(this.state);
      });
    });
  },

  getBook(id) {
    return this.state.find((book) => book.id === id);
  },

  search(query) {
    return Promise.resolve(this.state.filter((book) => book.title.includes(query)));
  },

  addBook(newItem) {
    const id = newItem.isbn.replace(' ', '');
    return new Promise((result, reject) => {
      setTimeout(() => {
        if (this.isDuplicate(id)) {
          reject(new Error('DUPLICATE_ID'));
          return;
        }
        const nextState = [
          ...this.state,
          {
            ...newItem,
            id,
            rating: '8',
            notes: [],
          },
        ];
        this.setState(nextState);
        setItem(BOOK_MODEL_DATA_KEY, this.state);
        result(this.state);
      });
    });
  },

  isDuplicate(id) {
    return this.state.some((book) => book.id === id);
  },

  getSortedList(sortBy) {
    switch (sortBy) {
      case 'title':
        return Promise.resolve(this.state.sort((a, b) => a['title'].localeCompare(b['title'])));
      case 'title-reverse':
        return Promise.resolve(this.state.sort((a, b) => b['title'].localeCompare(a['title'])));
      case 'high-rating':
        return Promise.resolve(this.state.sort((a, b) => b['rating'].localeCompare(a['rating'])));
      case 'low-rating':
        return Promise.resolve(this.state.sort((a, b) => a['rating'].localeCompare(b['rating'])));
      default:
        break;
    }
  },

  getNoteList() {
    return this.state.reduce((acc, book) => {
      const { notes, title, authors, thumbnail, id } = book;
      if (notes.length) {
        notes.forEach((note) => {
          acc.push({
            ...note,
            title,
            authors,
            thumbnail,
            bookId: id,
          });
        });
      }
      return acc;
    }, []);
  },

  addNote(id, newNote) {
    const book = this.getBook(id);
    book.notes.push(newNote);
    setItem(BOOK_MODEL_DATA_KEY, this.state);
  },

  getNote(id) {
    let result;
    this.state.forEach(({ notes }) => {
      if (notes.length) {
        notes.forEach((note) => {
          if (note.id === id) {
            result = note;
          }
        });
      }
    });
    return result;
  },

  addReadCount(id) {
    return new Promise((res) => {
      setTimeout(() => {
        const note = this.getNote(id);
        note.readCount += 1;
        setItem(BOOK_MODEL_DATA_KEY, this.state);
        res(this.getNoteList());
      });
    });
  },

  toggleFavorite(id) {
    return new Promise((res) => {
      setTimeout(() => {
        const note = this.getNote(id);
        note.isFavorite = !note.isFavorite;
        setItem(BOOK_MODEL_DATA_KEY, this.state);
        res(this.state);
      });
    });
  },

  initReadCount(id) {
    return new Promise((res) => {
      setTimeout(() => {
        const note = this.getNote(id);
        note.readCount = 0;
        setItem(BOOK_MODEL_DATA_KEY, this.state);
        res(this.getNoteList());
      });
    });
  },

  removeNote(id) {
    return new Promise((res) => {
      this.state.forEach(({ notes }) => {
        if (notes.length) {
          notes.forEach((note, index) => {
            if (note.id === id) {
              notes.splice(index, 1);
            }
          });
        }
      });
      setItem(BOOK_MODEL_DATA_KEY, this.state);
      res(this.getNoteList());
    });
  },
};
