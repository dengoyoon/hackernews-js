const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const getData = (url) => {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);

const container = document.getElementById('root');
const ul = document.createElement('ul');
const content = document.createElement('div');

container.appendChild(ul);
container.appendChild(content);

window.addEventListener('hashchange', function(){
    // 앵커태그의 해시가 변경되었을때 이벤트가 발생한다.
    // 해시를 CONTENT_URL의 id란에 넣고 API를 호출해야함
    // 해시를 주소에서 가져와야 하는데 주소 맨끝에 해시가 붙어있으니까 코드는 다음과 같다
    const id = location.hash.substring(1);

    const newsContent = getData(CONTENT_URL.replace('@id', id));

    const title = document.createElement('h1');
    title.innerHTML = newsContent.title;
    content.appendChild(title);
});

newsFeed.forEach(feed => {
    // HTML의 구조를 직관적으로 코드상에서 파악하기 위해 가급적이면 DOM API를 사용하지 않는다.
    // const li = document.createElement('li');
    // const a = document.createElement('a');
    // a.innerHTML = `${feed.title} (${feed.comments_count})`;
    // a.href = `#${feed.id}`;
    // li.appendChild(a);
    // ul.appendChild(li);
    // a.addEventListener('click', function(){}); //이렇게하면 여러개의 앵커태그에 맞춰서 등록하기가 어렵다

    const feedHead = `<li><a href = #${feed.id}>${feed.title} (${feed.comments_count})</a></li>`;
    // div는 innerHTML을 사용하려고 임시로 만든 태그임 
    // 따라서 태그의 depth가 깊어지게 하지 않기 위해서 div.children[0] 혹은 div.firstElementChild 라고 추가해야함
    const div = document.createElement('div');
    div.innerHTML = feedHead;
    ul.appendChild(div.firstElementChild);
});