const getMovieList = (genre, setMovies) => {
  return fetch("https://api.sampleapis.com/movies/" + genre)
    .then((resp) => {
      switch (resp.status) {
        case 200:
          return resp.json();
        default:
          return null;
      }
    })
    .then((data) => {
      if (data) {
        setMovies(data);
      } else setMovies(null);
    })
    .catch((error) => {
      alert("Server communication error. Please, check internet connection.");
    });
};

const getMovieListFromSeveralGenres = (genres, setMovies) => {
  const genresArr = genres.split(", ");

  let moviesListsArr = [];

  genresArr.forEach((genre) => {
    fetch("https://api.sampleapis.com/movies/" + genre)
      .then((resp) => {
        switch (resp.status) {
          case 200:
            return resp.json();
          default:
            return null;
        }
      })
      .then((data) => {
        if (data) {
          moviesListsArr.push(data);
        } else {
          setMovies(null);
        }

        if (moviesListsArr.length === genresArr.length) {
          const finishArr = moviesListsArr[0].filter((firstMovie) => {
            const index = moviesListsArr[1].findIndex(
              (movie) => movie.title === firstMovie.title
            );
            return index === -1 ? false : true;
          });

          setMovies(finishArr);
        }
      })

      .catch((error) => {
        alert("Server communication error. Please, check internet connection.");
      });
  });
};

export { getMovieList, getMovieListFromSeveralGenres };
