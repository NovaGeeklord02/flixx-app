const global = {
  currentPage: window.location.pathname,
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



async function FetchfromDMTB(endpoint) {
  API_KEY = '26dfc1054fa8edb91389180f69e91e58'
  API_URL = 'https://api.themoviedb.org/3/'

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
  const data = await response.json();
  return data;

};


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
      DisplayPopMovies();
      break;
    case '/index.html':
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
      console.log('Search Details');
      break;
  }
  highlight();
}

init();
