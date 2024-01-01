const global = {
    currentPage: window.location.pathname,
}

// console.log(global.currentPage);

async function DisplayPopMovies(){
    const data = await FetchfromDMTB('movie/popular')
    const dataArray = await data.results
    console.log(dataArray);
    
    dataArray.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${movie.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
           : `<img
           src="../images/no-image.jpg"
           class="card-img-top"
           alt="${movie.title}"
         />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>`

        document.querySelector('#popular-movies').appendChild(div);
    })
}


async function FetchfromDMTB(endpoint){
    API_KEY = '26dfc1054fa8edb91389180f69e91e58'
    API_URL = 'https://api.themoviedb.org/3/'

    const response = await fetch (`${API_URL}${endpoint}?api_key=${API_KEY}`)
    const data = await response.json();
    return data;

};


// Highlight page
function highlight(){
    const links = document.querySelectorAll('.nav-link')
    links.forEach((item) => {
        if (item.getAttribute('href') === global.currentPage) {
            item.classList.add('active')
        }
    })
}


function init(){
    switch (global.currentPage) {
        case '/':
            DisplayPopMovies();
            break;
        case '/index.html':
            DisplayPopMovies();
            break;
        case '/shows.html':
            console.log('TV Show');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/search.html':
            console.log('Search Details'); 
            break;       
    }
    highlight();
}

init();
