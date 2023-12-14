"use strict";
const findMovieBtn = document.getElementById("movie-btn");
const movieBody = document.getElementById("movie-res");

//if you want to use this please request an api key from https://www.themoviedb.org/ AND make a var called let apiKey ='KeyID'
let randomMovie = Math.floor(Math.random() * 600);
let url = `https://api.themoviedb.org/3/movie/${randomMovie}?api_key=${apiKey}`;
//when pushing to git, hide key in folder

function createMovieElement(
  item,
  typeOfElement,
  elID = `${item}-created`,
  elClassName = "default"
) {
  let createditem = document.createElement(typeOfElement);
  if (typeOfElement === "img") {
    createditem.src = `https://image.tmdb.org/t/p/w500/${item}`;
    createditem.alt = `Movie Cover`;
    createditem.id = `Movie-image`;
    createditem.className = "img-rounded";
    movieBody.appendChild(createditem);
  } else {
    createditem.innerText = item;

    if (createditem.innerText.length > 60) {
      createditem.id = `long-description`;
    } else {
      createditem.id = elID;
    }
    createditem.className = elClassName;
    movieBody.appendChild(createditem);
  }
}

function createNonMovieElement(text, typeOfElement) {
  let textToDoc = document.createElement(typeOfElement);
  textToDoc.innerText = text;
  textToDoc.id = "non-JSON-text";
  movieBody.appendChild(textToDoc);
}

function collapseButton() {
  const collapseBtn = document.createElement("button");
  collapseBtn.dataset.toggle = "collapse";
  collapseBtn.dataset.target = "#itemsToCollapse";
  collapseBtn.innerText = "Genres";
  movieBody.appendChild(collapseBtn);
}

function clearAll() {
  movieBody.replaceChildren();

  findMovieBtn.classList = "btn btn-primary btn-block active";
}

function startOver() {
  const startOverbtn = document.createElement("button");
  startOverbtn.className = "btn btn-primary btn-block";
  startOverbtn.innerText = "Try again?";
  movieBody.appendChild(startOverbtn);

  startOverbtn.addEventListener("click", function () {
    clearAll();
    getMovie();
  });
}

async function getMovie() {
  const res = await fetch(url);
  const movie = await res.json();

  createMovieElement(movie.poster_path, "img");
  createMovieElement(movie.original_title, "h2");
  createMovieElement(movie.overview, "p");
  if (movie.genres) {
    collapseButton();
    let collapseDiv = document.createElement("div");
    collapseDiv.id = "itemsToCollapse";
    collapseDiv.className = "collapse";
    movieBody.appendChild(collapseDiv);
    movie.genres.forEach((element) => {
      collapseDiv.innerText += ` ${element.name}`;
      // createMovieElement(element.name, "p");
    });
  }
  findMovieBtn.classList = "btn btn-primary btn-block disabled";
  startOver();
}

findMovieBtn.addEventListener("click", getMovie, { once: true });
