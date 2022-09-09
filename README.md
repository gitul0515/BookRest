# 북레스트(Bookrest)
독서 관리를 도와주는 웹 & 모바일용 서비스입니다.  
바닐라 JAVASCRIPT로 SPA를 구현한 개인 프로젝트입니다. 
 
배포 링크: https://gilded-swan-949a8c.netlify.app

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6155ee2-1000-4269-b5c3-fb132d3146e7/deploy-status)](https://app.netlify.com/sites/gilded-swan-949a8c/deploys)

<div style="display: flex">
<img src="https://user-images.githubusercontent.com/80658269/189397171-e7f1db90-96a8-4c1b-90e3-5e1bb86e8a46.png" width="30%" height="400px"  />
<img src="https://user-images.githubusercontent.com/80658269/189398771-c23e2e1e-114f-4fa0-8d72-0b7d2ec8fce8.png" width="30%" height="400px"  />
</div>


## No 프레임워크, No 라이브러리
바닐라 JAVASCRIPT만으로 SPA를 구현했습니다.  
React, Vue 등 프론트엔드 라이브러리의 핵심 기능을 구현하면서  
근본적인 원리를 파악하기 위해 노력했습니다.  
그 결과는 아래와 같습니다.  


### 1. 동적 라우팅 
history API를 사용하여 동적 라우팅을 구현했습니다.  
* pushState 및 replaceState 함수로 url을 변경하고  
  변경된 url을 감지하여 화면을 갱신
* popstate 이벤트를 통해 url의 변경을 감지. 뒤로가기 구현
* url이 동적으로 바뀌는 페이지의 라우팅 구현

https://user-images.githubusercontent.com/80658269/189402529-e32d5962-e75f-4c8f-b6bf-7dbff96b5332.mp4

## 2. 상태 기반 렌더링

부모 컴포넌트의 상태(state)가 변경되면,  
필요에 따라 자식 컴포넌트의 상태를 변경하고,  
자식 컴포넌트가 리렌더링되도록 구현했습니다.  

예를 들어보겠습니다.  
책을 검색할 수 있는 페이지입니다.  
상위 컴포넌트는 HomePage이고, 하위 컴포넌트는 SearchList입니다.  

<img src="https://user-images.githubusercontent.com/80658269/189397171-e7f1db90-96a8-4c1b-90e3-5e1bb86e8a46.png" width="30%" height="400px"  />


HomePage에서 책을 검색한 뒤(외부 API 사용),  
검색 결과를 바탕으로 HomePage의 상태를 변경합니다. 

```javascript
  async onSearch({ searchWord, page }) {
    const data = await searchBooks(searchWord, page);
    HomePage.setState({
      ...HomePage.state,
      searchResult: {
        searchWord,
        page,
        books: [...HomePage.state.searchResult.books, ...data.documents],
        isEndPage: data.meta['is_end'],
      },
    });
  },

```

그리고 하부 컴포넌트인 SearchList로 변경된 상태를 전달합니다.   

```javascript
HomePage.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
    SearchList.setState(this.state.searchResult);
  }
};

```

SearchList는 자신의 상태를 변경한 후, 리렌더링을 자동으로 수행합니다. 

```javascript
SearchList.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
    this.render();
  }
};

SearchList.render = function () {
  if (!this.state.books.length) {
    this.element.innerHTML = this.getNoResultHtml();
    return;
  }
  this.element.innerHTML = this.getListHtml(this.state.books); 
  this.setObserverTarget();
};
```

이처럼 완전히 동일하지는 않지만,  
React의 '상태 기반 렌더링'을 JS로 구현하기 위해 노력했습니다. 

## 컴포넌트 재사용 







개발 기간: 22.03.25 ~ 22.05.10  
리팩토링 기간: 22.06.25 ~ 





