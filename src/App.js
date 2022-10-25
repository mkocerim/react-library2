import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

import { useDispatch } from "react-redux";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  //categories
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get(" http://localhost:3004/categories")
      .then((res) => {
        dispatch({
          type: "FETCH_CATEGORIES_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_CATEGORIES_FAIL",
          payload: "There is an error when cateories pulled ",
        });
      });
    //books
    dispatch({ type: "FETCH_BOOKS_START" });
    axios.get("http://localhost:3004/books").then((res) => {
      dispatch({
        type: "FETCH_BOOKS_SUCCESS",
        payload: res.data,
      }).catch((err) => {
        dispatch({
          type: "FETCH_BOOKS_FAIL",
          payload: "There is an error when books pulled",
        });
      });
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/add-category" />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
