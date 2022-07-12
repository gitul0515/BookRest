import { getItem, setItem } from '../../utils/storage.js';
import { initialData } from '../../../data/dummy.js';

export const BOOK_MODEL_DATA_KEY = 'bookModelDataKey';

export default {
  books: getItem(BOOK_MODEL_DATA_KEY, initialData),

  getBooks() {
    return this.books;
  },

  getBook(id) {
    return this.books.find((book) => book.id === id);
  },

  setBooks(nextBooks) {
    if (this.books !== nextBooks) {
      this.books = nextBooks;
    }
  },

  searchBooks(query) {
    return this.books.filter((book) => book.title.includes(query));
  },

  sortBooks(by) {
    const books = [...this.books];
    switch (by) {
      case 'title':
        return books.sort((a, b) => a['title'].localeCompare(b['title']));
      case 'title-reverse':
        return books.sort((a, b) => b['title'].localeCompare(a['title']));
      case 'high-rating':
        return books.sort((a, b) => b['rating'].localeCompare(a['rating']));
      case 'low-rating':
        return books.sort((a, b) => a['rating'].localeCompare(b['rating']));
      default:
        break;
    }
  },

  addBook(newItem) {
    const id = newItem.isbn.replace(' ', '');
    return new Promise((result, reject) => {
      setTimeout(() => {
        if (this.isDuplicate(id)) {
          reject(new Error('DUPLICATE_ID'));
          return;
        }
        const nextBooks = [
          ...this.books,
          {
            ...newItem,
            id,
            rating: '8',
            notes: [],
          },
        ];
        this.setBooks(nextBooks);
        setItem(BOOK_MODEL_DATA_KEY, this.books);
        result(this.books);
      });
    });
  },

  isDuplicate(id) {
    return this.books.some((book) => book.id === id);
  },

  getNoteList() {
    return this.books.reduce((acc, book) => {
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
    setItem(BOOK_MODEL_DATA_KEY, this.books);
  },

  getNote(id) {
    let result;
    this.books.forEach(({ notes }) => {
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
        setItem(BOOK_MODEL_DATA_KEY, this.books);
        res(this.getNoteList());
      });
    });
  },

  toggleFavorite(id) {
    return new Promise((res) => {
      setTimeout(() => {
        const note = this.getNote(id);
        note.isFavorite = !note.isFavorite;
        setItem(BOOK_MODEL_DATA_KEY, this.books);
        res(this.books);
      });
    });
  },

  initReadCount(id) {
    return new Promise((res) => {
      setTimeout(() => {
        const note = this.getNote(id);
        note.readCount = 0;
        setItem(BOOK_MODEL_DATA_KEY, this.books);
        res(this.getNoteList());
      });
    });
  },

  removeNote(id) {
    return new Promise((res) => {
      this.books.forEach(({ notes }) => {
        if (notes.length) {
          notes.forEach((note, index) => {
            if (note.id === id) {
              notes.splice(index, 1);
            }
          });
        }
      });
      setItem(BOOK_MODEL_DATA_KEY, this.books);
      res(this.getNoteList());
    });
  },

  getNumberOfBooks() {
    return this.books.length;
  },

  getNumberOfNotes() {
    let result = 0;
    this.books.forEach(({ notes }) => {
      result += notes.length;
    });
    return result;
  },
};
