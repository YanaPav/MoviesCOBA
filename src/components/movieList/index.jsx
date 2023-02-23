import React, { useEffect, useState } from "react";
import "./style.css";
import { getMovieList, getMovieListFromSeveralGenres } from "../../movies.js";
import { SearchBar } from "../searchBar/index";
import Movie from "../movie/index";

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (genre.includes(",")) {
      getMovieListFromSeveralGenres(genre, setMovies);
    } else getMovieList(genre, setMovies);
  }, [genre]);

  const handlerFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  const filtredMovies = movies?.filter(({ title }) =>
    title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="movie-list-box">
      {filtredMovies && (
        <SearchBar value={filter} onChange={handlerFilterChange} />
      )}
      {filtredMovies ? (
        filtredMovies.map((movie) => (
          <Movie
            key={genre + "_" + movie.imdbId}
            id={movie.id}
            title={movie.title}
            posterURL={movie.posterURL}
            genre={genre}
            imdbId={movie.imdbId}
          />
        ))
      ) : (
        <p>Sorry, no movie is now available in this category.</p>
      )}
    </div>
  );
};

export default MovieList;
