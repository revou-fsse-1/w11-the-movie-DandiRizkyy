// 1. ambil data dari API
// 2. render UI element
// 3. update method untuk API

// mendapatkan data dari API dengan endpoint currentWatch
async function fetchCurrentWatch() {
  try {
    const response = await fetch("http://localhost:3000/currentWatch/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// menampilkan data dari API ke halaman moviepage bagian Currently Watching
async function displayResultCurrentWatch() {
  const resultElement = document.getElementById("currently");
  const data = await fetchCurrentWatch();
  const listItems = data
    .map((items) => {
      return `
        <div>
        <a href="moviepagedetail.html?id=${items.id}">
        <img src="${items.image}" class="object-fill h-52 w-auto rounded-2xl"/>
        </a>
        </div>
        `;
    })
    .join("");
  resultElement.innerHTML = listItems;
}

displayResultCurrentWatch();

//mendapatkan data dari ID API dengan resources endpoint movies
async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/movies/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// menampilkan data ke halaman moviepagedetail dari ID yang telah di GET dari page sebelumnya
async function displayMovieDetails() {
  const urlSource = new URLSearchParams(window.location.search);
  const id = urlSource.get("id");
  const resultElement = document.getElementById("movie-details");
  const data = await fetchMovieDetails(id);
  resultElement.innerHTML = `
  <div class="flex flex-col">
  <h2 class="font-bold text-4xl">${data.title}</h2>
  <img src="${data.image}" class="object-fill h-52 w-36 rounded-2xl mt-5"/>
  <p>${data.synopsis}</p>
  <iframe width="853" height="480" src="${data.trailer}"></iframe>
  <div>
  `;
}
displayMovieDetails();

// mendapatkan data dari API dengan endpoint isSuggested
async function fetchSuggested() {
  try {
    const response = await fetch("http://localhost:3000/isSuggested");
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// menampilkan data dari API ke halaman moviepage bagian Suggested To Watch
async function displayResultSuggested() {
  const resultElement = document.getElementById("suggested");
  const data = await fetchSuggested();
  const listItems = data
    .map((items) => {
      return `
          <div class="flex">
          <a href="moviepagedetail.html?id=${items.id}">
          <img src="${items.image}" class="object-fill h-52 w-auto rounded-2xl"/>
          </a>
          </div>
          `;
    })
    .join("");
  resultElement.innerHTML = listItems;
}

displayResultSuggested();

// mendapatkan data dari API dengan endpoint isPrevious
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/isPrevious/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// menampilkan data dari API ke halaman moviepage
async function displayResultPrevious() {
  const resultElement = document.getElementById("grid-content");
  const data = await fetchData();
  console.log(data);
  const listItems = data
    .map((items) => {
      return `
      <div>
      <a href="moviepagedetail.html?id=${items.id}">
      <img src="${items.image}" class="object-fill h-52 w-36 rounded-2xl"/>
      </a>
      </div>
      `;
    })
    .join("");
  resultElement.innerHTML = listItems;
}

displayResultPrevious();

// mendapatkan data dari API dengan endpoint watchlist
async function fetchWatchlist() {
  try {
    const response = await fetch("http://localhost:3000/watchlist/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// menampilkan data dari API ke halaman watchlist
async function displayResultWatchlist() {
  const resultElement = document.getElementById("grid-content-watchlist");
  const watchlist = await fetchWatchlist();
  const moviePromises = watchlist.map((watchlistItems) =>
    fetchMovieDetails(watchlistItems.movieId)
  );

  const movies = await Promise.all(moviePromises);
  const listItems = movies
    .map((movie) => {
      return `
 <div>
 <a href="moviepagedetail.html?id=${movie.id}">
 <img src="${movie.image}" class="object-fill h-52 w-36 rounded-2xl"/>
 </a>
 </div>
 `;
    })
    .join("");
  resultElement.innerHTML = listItems;
}

displayResultWatchlist();

// mengambil id button #add-watchlist yang nantinya digunakan untuk menambahkan movie ke watchlist
const addWatchlistButton = document.getElementById("add-watchlist");
addWatchlistButton.addEventListener("click", () => {
  const urlSource = new URLSearchParams(window.location.search);
  const id = urlSource.get("id");
  fetch("http://localhost:3000/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieId: id,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Movie successfully added to your watchlist!");
      } else {
        alert("Failed to add the movie, please try again.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
