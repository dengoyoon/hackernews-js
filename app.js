const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const container = document.getElementById('root');

const store = {
    currentPage : 1
};

const getData = (url) => {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

const displayNewsFeed = () => {
    const newsFeeds = getData(NEWS_URL);

    //이와 같이 반복문을 사용해서 HTML을 문자열을 사용해서 구현할때는 배열을 활용하는게 기본적이다.
    const newsList = ["<ul>"];
    const maxPageNumber = newsFeeds.length / 10;
    for (let i = (store.currentPage - 1) * 10 ; i < store.currentPage * 10 ; i++) {
        newsList.push(`<li><a href = #/detail/${newsFeeds[i].id}>${newsFeeds[i].title} (${newsFeeds[i].comments_count})</a></li>`);
    }
    newsList.push("</ul>");

    newsList.push(`
        <div>
            <a href="#/page/${store.currentPage - 1 > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
            <a href="#/page/${store.currentPage + 1 > maxPageNumber ? maxPageNumber : store.currentPage + 1 }">다음 페이지</a>
        </div>
    `);

    container.innerHTML = newsList.join('');
}

const displayNewsDetail = () => {
    // 앵커태그의 해시가 변경되었을때 이벤트가 발생한다.
    // 해시를 CONTENT_URL의 id란에 넣고 API를 호출해야함
    // 해시를 주소에서 가져와야 하는데 주소 맨끝에 해시가 붙어있으니까 코드는 다음과 같다
    const id = location.hash.substring(9);

    const newsContent = getData(CONTENT_URL.replace('@id', id));

    container.innerHTML = `
        <h1>${newsContent.title}</h1>
        <div>
            <a href = "#/page/${store.currentPage}">목록으로</a>
        </div>
    `;
}

const router = () => {
    const routePath = location.hash;
    if (routePath == '') {
        // #만 있으면 그냥 빈 문자열 ''로 나온다.
        displayNewsFeed();
    } else if (routePath.indexOf('/page') >= 0) {
        store.currentPage = Number(routePath.substring(7));
        displayNewsFeed();
    } else {
        displayNewsDetail();
    }
}

window.addEventListener('hashchange', router);

router();

