import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Header from "./components/header/index";
import MovieList from "./components/movieList/index";
import Menu from "./components/menu/index";
import tabList from "./genre.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCartContext } from "./context";
import "./style.css";

const CHACKED_MOVIES_KEY = "checked movies";

const App = () => {
  const [movieCart, setMovieCart] = useState(() => {
    try {
      const checkedMovies = localStorage.getItem(CHACKED_MOVIES_KEY);
      return JSON.parse(checkedMovies) || [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CHACKED_MOVIES_KEY, JSON.stringify(movieCart));
  }, [movieCart]);

  const setCart = (item) => {
    if (item.isSelect) {
      const result = [...movieCart, item];
      setMovieCart(result);
    } else {
      const result = movieCart.filter(
        (movie) => movie.imdbId !== item.imdbId && movie.title !== item.title
      );
      setMovieCart(result);
    }
  };

  return (
    <MovieCartContext.Provider value={{ movieCart, setCart }}>
      <Header count={movieCart ? movieCart.length : 0} />
      <BrowserRouter>
        <Menu tabList={tabList} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={"/" + tabList[0].tabName} />}
          />
          {tabList.map(({ tabName, id }) => (
            <Route
              key={"link_" + id}
              path={"/" + tabName}
              element={<MovieList genre={tabName} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </MovieCartContext.Provider>
  );
};

render(<App />, document.querySelector("#app"));
