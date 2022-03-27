import { Home, Note, Book, Calendar, NotFound } from './components.js';

const root = document.getElementById('root');
const navigation = document.getElementById('nav');

const routes = [
  { path: '/', component: Home },
  { path: '/note', component: Note },
  { path: '/book', component: Book },
  { path: '/calendar', component: Calendar },
];

const render = async path => {
  try {
    const component = routes.find(route => route.path === path)?.component || NotFound;
    root.replaceChildren(await component());
  } catch (err) {
    console.error(err);
  }
};

navigation.onclick = e => {
  if (!e.target.matches('.nav__tab-item > a')) return;
  e.preventDefault();
  const path = e.target.getAttribute('href');
  render(path);
};

window.addEventListener('DOMContentLoaded', () => render('/'));
