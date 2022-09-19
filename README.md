# 북레스트(Bookrest)
독서 관리를 도와주는 웹 & 모바일용 서비스입니다.  
바닐라 JAVASCRIPT로 SPA를 구현한 개인 프로젝트입니다. 
 
배포 링크: https://gilded-swan-949a8c.netlify.app

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6155ee2-1000-4269-b5c3-fb132d3146e7/deploy-status)](https://app.netlify.com/sites/gilded-swan-949a8c/deploys)

<div style="display: flex">
<img src="https://user-images.githubusercontent.com/80658269/189397171-e7f1db90-96a8-4c1b-90e3-5e1bb86e8a46.png" width="30%" height="400px"  />
<img src="https://user-images.githubusercontent.com/80658269/189398771-c23e2e1e-114f-4fa0-8d72-0b7d2ec8fce8.png" width="30%" height="400px"  />
</div>


## 바닐라 JAVASCRIPT만으로 SPA를 구현 
프론트엔드 프레임워크의 핵심 기능을 구현하면서 동작 원리 이해  

### 1. History API를 활용한 동적 라우팅
 
* pushState 및 replaceState 함수로 url을 변경하고  
  변경된 url을 감지하여 화면을 갱신
* popstate 이벤트를 통해 url의 변경을 감지. 뒤로가기 구현
* url이 동적으로 바뀌는 페이지의 라우팅 구현

https://user-images.githubusercontent.com/80658269/189402529-e32d5962-e75f-4c8f-b6bf-7dbff96b5332.mp4

### 2. 상태 기반 렌더링
상태를 갖는 컴포넌트, 상태 변경에 따른 리렌더링 

예) HomePage에서는 책을 검색할 수 있습니다.  
상위 컴포넌트는 HomePage이고, 하위 컴포넌트는 SearchList입니다.  

<img src="https://user-images.githubusercontent.com/80658269/191048081-c3f153e5-fb0e-48de-bf27-a5b386554c3d.png" width="30%" height="400px"  />

1. HomePage에서 카카오 API를 통해 책을 검색한 후,  
   그 결과를 setState 함수를 호출하면서 넘겨줍니다. 

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

2. HomePage의 setState에서는 자신의 상태를 변경합니다.  
   그리고 하부 컴포넌트인 SearchList의 setState를 호출합니다. 

```javascript
HomePage.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
    SearchList.setState(this.state.searchResult);
  }
};

```

3. SearchList의 setState에서는 자신의 상태를 변경한 후,  
   render 함수를 호출해 렌더링을 수행합니다. 

```javascript
SearchList.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
    this.render();
  }
};
```

4. 렌더링은 SearchList의 상태를 기반으로 이루어집니다. 

```javascript
SearchList.render = function () {
  if (!this.state.books.length) {
    this.element.innerHTML = this.getNoResult();
    return;
  }
  this.element.innerHTML = this.getListHtml(this.state.books); 
  this.setObserverTarget();
};
```


## MVC 디자인 패턴을 적용하여 설계 및 구현  

![image](https://user-images.githubusercontent.com/80658269/191050276-2d21dcd7-e015-40b4-be96-23e6376d092c.png)


## 구현 기능 

- 카카오 API를 통해 **책 검색 및 조회**  
  IntersectionObserver를 통해 무한스크롤 구현  
     
- 책을 **등록**할 수 있고 **정렬, 필터링, 삭제** 기능  
- 책에 대한 **노트 작성, 등록 및 삭제** 기능  

아래는 시연 영상입니다. 

https://user-images.githubusercontent.com/80658269/191052065-c43ff96a-a02f-4487-b637-1196aeb4bc72.mp4


