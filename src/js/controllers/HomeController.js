import HomeSearchTabView from "../views/HomeSearchTabView.js";
import HomeSearchPageView from "../views/HomeSearchPageView.js";
import searchBook from "../service/api-search.js";

export default {
  init() {
    HomeSearchTabView.setup(document.querySelector('.home__tab--search'))
      .on('@click', () => this.onClick());
    HomeSearchPageView.setup(document.querySelector('.home__page--search'))
      .on('@submit', e => this.onSubmit(e.detail.text));
  },

  onClick() {
    HomeSearchPageView.show();
  },

  onSubmit(text) {
    searchBook(text)
      .then(data => HomeSearchPageView.render(data.documents));
  }
}
