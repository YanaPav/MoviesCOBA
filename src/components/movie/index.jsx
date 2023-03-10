import React, { useEffect, useState } from "react";
import "./style.css";
import Check from "../check/index";
import { useMovieCart } from "../../context";

const Movie = ({ id, title, posterURL, genre, imdbId }) => {
  const { movieCart, setCart } = useMovieCart();
  const [isSelect, setIsSelected] = useState(() => {
    return movieCart.some(
      (checkedMovie) =>
        checkedMovie.imdbId === imdbId && checkedMovie.title === title
    );
  });

  const handleOnCheck = () => {
    setIsSelected(!isSelect);

    setCart({
      id: id,
      imdbId: imdbId,
      isSelect: !isSelect,
      title: title,
      genre: genre,
      posterURL: posterURL,
    });
  };

  return (
    <div id={"movie_" + id} className="movie-box">
      <div className="col-2">
        <img alt={title} src={posterURL} />
      </div>
      <div className="col-6">
        <label className="movie-title">{title}</label>
      </div>
      <div className="movie-button">
        <Check checked={isSelect} onCheck={handleOnCheck} />
      </div>
    </div>
  );
};

export default Movie;
