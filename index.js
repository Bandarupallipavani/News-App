const apiKey = 'API_KEY';
const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

async function fetchNews(query= 'latest') {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        if (data.articles) {
            displayNews(data.articles)
        } else {
            newsContainer.innerHTML = '<p>No news found in your search</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error fetching news</p>';
    }

}

function displayNews(articles) {
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        newsCard.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available'}</p>
        <a href="${article.url}" target="_blank">..Read More</a>
    `;
     newsContainer.appendChild(newsCard);
    });
}
searchBtn.addEventListener('click', (event) => {
    const query = searchInput.value.trim();
    if (query) {
        fetchNews(query);
    }
});

fetchNews();
