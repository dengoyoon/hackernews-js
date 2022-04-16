const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const root = document.getElementById('root');
const ul = document.createElement('ul');

root.appendChild(ul);

newsFeed.forEach(feed => {
    const li = document.createElement('li');
    li.innerHTML = feed.title;
    ul.appendChild(li);
});