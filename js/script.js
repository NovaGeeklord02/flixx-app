// API reference link
// https://developer.themoviedb.org/reference/search-movie


const global = {
  currentPage: window.location.pathname,
  search : {
    term : '',
    type : '',
    page : 1,
    totalPage : 1,
  }
}

// console.log(global.currentPage);


async function DisplayPopMovies() {
  const data = await FetchfromDMTB('movie/popular')
  const dataArray = await data.results
  // console.log(dataArray);

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





async function DisplayPopTV() {
  const data = await FetchfromDMTB('tv/popular');
  const dataArray = await data.results
  // console.log(dataArray);

  dataArray.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<div class="card">
        <a href="tv-details.html?id=${show.id}">
          <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Aired: ${show.first_air_date}</small>
          </p>
        </div>
      </div>
        `
    document.querySelector('#popular-shows').appendChild(div)
  })
}




async function DisplayMovieDetails() {
  const movieID = await document.location.search.split('=')[1];

  const movie = await FetchfromDMTB(`movie/${movieID}`)
  console.log(movie);
  const div = document.createElement('div')
  div.innerHTML = `<div class="details-top">
    <div>
      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)}
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
      <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
       ${movie.production_companies
      .map((comp) => `<span>${comp.name}</span>`).join(', ')
    }
    </div>
  </div>
    `
  document.querySelector('#movie-details').appendChild(div);
}



async function DisplayTVShowDetails() {
  const ShowID = await document.location.search.split('=')[1];

  const show = await FetchfromDMTB(`tv/${ShowID}`)
  console.log(show);
  const div = document.createElement('div')
  div.innerHTML = `<div class="details-top">
  <div>
    <img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)}
    </p>
    <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
  <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
  <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
  <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
     ${show.production_companies
      .map((comp) => `<span>${comp.name}</span>`).join(', ')
    }
  </div>
</div>
  `
  document.querySelector('#show-details').appendChild(div);
}




async function DisplaySlider(){
  const data = await FetchfromDMTB('movie/now_playing')
  const dataArray = data.results
  // console.log(dataArray);

  dataArray.forEach((movie) => {
    const div = document.createElement('div')
    div.classList.add('swiper-slide')
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
  </a>
  <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)}
  </h4>
    `
    document.querySelector('.swiper-wrapper').appendChild(div)
  })
  initSwiper();
}





function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}





async function search(){
  const querystring = document.location.search;
  const urlparams = new URLSearchParams(querystring);

  global.search.type = urlparams.get('type')
  global.search.term = urlparams.get('search-term')
  // console.log(global.search.term);
  const data = await fetchSearchData();
  const dataArray = await data.results;
  console.log(data);
}





async function FetchfromDMTB(endpoint) {
  API_KEY = '26dfc1054fa8edb91389180f69e91e58'
  API_URL = 'https://api.themoviedb.org/3/'

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
  const data = await response.json();
  return data;

};





async function fetchSearchData() {
  const API_KEY = '26dfc1054fa8edb91389180f69e91e58';
  const API_URL = 'https://api.themoviedb.org/3/';
  const queryParams = 'include_adult=false&language=en-US&page=1';

    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&query=${global.search.term}`);
    const data = await response.json();
    return data;
  
}






// Highlight page
function highlight() {
  const links = document.querySelectorAll('.nav-link')
  links.forEach((item) => {
    if (item.getAttribute('href') === global.currentPage) {
      item.classList.add('active')
    }
  })
}




function init() {
  switch (global.currentPage) {
    case '/':
      DisplaySlider();
      DisplayPopMovies();
      break;
    case '/index.html':
      DisplaySlider();
      DisplayPopMovies();
      break;
    case '/shows.html':
      DisplayPopTV();
      break;
    case '/tv-details.html':
      DisplayTVShowDetails();
      break;
    case '/movie-details.html':
      DisplayMovieDetails();
      break;
    case '/search.html':
      search();
      break;
  }
  highlight();
}

init();
