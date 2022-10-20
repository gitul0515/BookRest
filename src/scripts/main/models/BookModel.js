import { getItem, setItem } from '../../utils/storage.js';
import { removeSpace } from '/src/scripts/utils/format.js';

export const BOOK_MODEL_DATA_KEY = 'bookModelDataKey';

export default {
  books: getItem(BOOK_MODEL_DATA_KEY, []),

  getAllBooks() {
    return [...this.books];
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

  addBook(newBook) {
    const id = removeSpace(newBook.isbn);
    return new Promise((result, reject) => {
      setTimeout(() => {
        if (this.isDuplicate(id)) {
          reject(new Error('DUPLICATE_ID'));
          return;
        }
        this.setBooks([
          ...this.books,
          {
            ...newBook,
            id,
            rating: '7',
            notes: [],
          },
        ]);
        setItem(BOOK_MODEL_DATA_KEY, this.books);
        result(this.books);
      });
    });
  },

  isDuplicate(id) {
    return this.books.some((book) => book.id === id);
  },

  deleteBook(id) {
    const newBooks = this.books.filter((book) => book.id !== id);
    this.setBooks(newBooks);
    setItem(BOOK_MODEL_DATA_KEY, this.books);
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

  addNote(id, newNote) {
    const book = this.getBook(id);
    book.notes.push(newNote);
    setItem(BOOK_MODEL_DATA_KEY, this.books);
  },

  deleteNote(id, bookId) {
    const book = this.getBook(bookId);
    book.notes = book.notes.filter((note) => note.id !== id);
    setItem(BOOK_MODEL_DATA_KEY, this.books);
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
