const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const container = document.getElementById('root');

const getData = (url) => {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

const displayNewsFeed = () => {
    const newsFeeds = getData(NEWS_URL);

    //이와 같이 반복문을 사용해서 HTML을 문자열을 사용해서 구현할때는 배열을 활용하는게 기본적이다.
    const newsList = ["<ul>"];
    newsFeeds.forEach(feed => {
        // HTML의 구조를 직관적으로 코드상에서 파악하기 위해 가급적이면 DOM API를 사용하지 않는다.
        newsList.push(`<li><a href = #${feed.id}>${feed.title} (${feed.comments_count})</a></li>`);
    });
    newsList.push("</ul>");

    container.innerHTML = newsList.join('');
}

const displayNewsDetail = () => {
    // 앵커태그의 해시가 변경되었을때 이벤트가 발생한다.
    // 해시를 CONTENT_URL의 id란에 넣고 API를 호출해야함
    // 해시를 주소에서 가져와야 하는데 주소 맨끝에 해시가 붙어있으니까 코드는 다음과 같다
    const id = location.hash.substring(1);

    const newsContent = getData(CONTENT_URL.replace('@id', id));

    container.innerHTML = `
        <h1>${newsContent.title}</h1>
        <div>
            <a href = "#">목록으로</a>
        </div>
    `;
}

const router = () => {
    const routePath = location.hash;
    if (routePath == '') {
        // #만 있으면 그냥 빈 문자열 ''로 나온다.
        displayNewsFeed();
    } else {
        displayNewsDetail();
    }
}

window.addEventListener('hashchange', router);

router();

