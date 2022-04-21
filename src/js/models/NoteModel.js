const data = [
  {
    id: '1',
    bookId: '8934972467 9788934972464',
    content: '집중하는 삶이 최선의 삶이다.',
    createdAt: '2022. 4. 20. 오후 3:17:28',
    page: 56,
    readCount: 0,
    isFavorite: false,
  },
  {
    id: '2',
    bookId: '8934972467 9788934972464',
    content: '강렬한 집중, 최고의 성과',
    createdAt: '2022. 4. 21. 오후 3:17:28',
    page: 137,
    readCount: 0,
    isFavorite: false,
  },
];

export default {
  data,

  getList() {
    return Promise.resolve(this.data);
  },
};
