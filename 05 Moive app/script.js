const mainEl = document.querySelector("main");
const apikey = "7f892db17123b0f41de97b678f673660";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");

fetchPopularMovies();

formEl.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchTerm = inputEl.value;
	if (searchTerm) {
		fetchSearchMovies(searchTerm);
	}
});

const posterURL = `https://image.tmdb.org/t/p/original/`;
async function fetchPopularMovies() {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=7f892db17123b0f41de97b678f673660`
	);
	const resJson = await res.json();
	// console.log(resJson);
	loadCells(resJson.results);
}

async function fetchSearchMovies(searchTerm) {
	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=7f892db17123b0f41de97b678f673660&query=${searchTerm}&include_adult=false`
	);
	const resJson = await res.json();
	// console.log(resJson);
	loadCells(resJson.results);
}

function loadCells(moviesArr) {
	// console.log(moviesArr);

	if (moviesArr) {
		mainEl.innerHTML = "";
		moviesArr.forEach((movie) => {
			const cellEl = document.createElement("div");
			cellEl.classList.add("cell");

			let ratingClass = "rating";

			if (movie.vote_average >= 8) {
				ratingClass = "rating red";
			} else if (movie.vote_average < 8 && movie.vote_average >= 6.5) {
				ratingClass = "rating yellow";
			} else if (movie.vote_average < 6.5) {
				ratingClass = "rating green";
			}

			cellEl.innerHTML = `
          <div class="poster-container">
          <img
            src="${posterURL + movie.poster_path}"
            alt="${movie.title}"
          />

          <div class="overview-container">
          <p>${movie.overview}</p>
         </div>
         </div>

        <div class="cell-details">
          <h4 class="cell-name">${movie.title}</h4>
          <div class='${ratingClass}'>${movie.vote_average}</div>
        </div>

      `;
			// console.log(movie.overview);

			mainEl.appendChild(cellEl);
		});
	}
}

{
	/* <div class="cell">
<div class="poster-container">
  <img
    src="${posterURL + movie.poster_path}"
    alt="${movie.title}"
  />
  <div class="overview-container">
    <h5>${movie.overview}</h5>
  </div>
</div>
<div class="cell-details">
  <h4 class="cell-name">${movie.title}</h4>
  <div class="rating">${movie.vote_average}</div>
</div>
</div> */
}
