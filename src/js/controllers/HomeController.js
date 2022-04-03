import HomeSearchTabView from "../views/HomeSearchTabView.js";
import HomeSearchPageView from "../views/HomeSearchPageView.js";

export default {
  init() {
    HomeSearchTabView.setup(document.querySelector('.home__tab--search'))
      .on('@click', () => this.onClick());
    HomeSearchPageView.setup(document.querySelector('.home__page--search'));
  },

  onClick() {
    HomeSearchPageView.show();
  }
}
