"use strict";
const findMovieBtn = document.getElementById("movie-btn");
const movieBody = document.getElementById("movie-res");
let randomMovie = Math.floor(Math.random() * 600);

//if you want to use this please request an api key from https://www.themoviedb.org/ AND make a var called let apiKey ='KeyID'
let url = `https://api.themoviedb.org/3/movie/${randomMovie}?api_key=${apiKey}`;
//when pushing to git, hide key in folder

function createMovieElement(item, typeOfElement) {
  let createditem = document.createElement(typeOfElement);
  if (typeOfElement === "img") {
    createditem.src = `https://image.tmdb.org/t/p/w500/${item}`;
    createditem.alt = `Movie Cover`;
    createditem.id = `Movie-image`;
    movieBody.appendChild(createditem);
  } else {
    createditem.innerText = item;

    if (createditem.innerText.length > 60) {
      createditem.id = `long-description`;
    } else {
      createditem.id = `${item}-created`;
    }
    movieBody.appendChild(createditem);
  }
}

function createNonMovieElement(text, typeOfElement) {
  let textToDoc = document.createElement(typeOfElement);
  textToDoc.innerText = text;
  textToDoc.id = "non-JSON-text";
  movieBody.appendChild(textToDoc);
}

async function getMovie() {
  const res = await fetch(url);
  const movie = await res.json();
  console.log(movie);
  createMovieElement(movie.poster_path, "img");
  createMovieElement(movie.original_title, "h2");
  createMovieElement(movie.overview, "p");
  if (movie.genres) {
    createNonMovieElement("Genres:", "p");
    movie.genres.forEach((element) => {
      createMovieElement(element.name, "p");
    });
  }
}

findMovieBtn.onclick = getMovie;
