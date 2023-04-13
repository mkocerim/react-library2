import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";

const EditBook = (props) => {
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log("categoriesState", categoriesState);
  console.log("booksState", booksState);
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  console.log("params", params);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(booksState.books, params.bookId);
    const searchedBook = booksState.books.find(
      (item) => item.id == params.bookId
    );

    if (searchedBook === undefined) {
      navigate("/");
      return;
    }

    setBookname(searchedBook.name);
    setAuthor(searchedBook.author);
    setCategory(searchedBook.categoryId);
    setIsbn(searchedBook.isbn);

    // axios
    //   .get(`http://localhost:3004/books/${params.bookId}`)
    //   .then((res) => {
    //     console.log("res.data", res.data);
    //     setBookname(res.data.name);
    //     setAuthor(res.data.author);
    //     setCategory(res.data.categoryId);
    //     setIsbn(res.data.isbn);
    //     // axios
    //     //   .get("http://localhost:3004/categories")
    //     //   .then((res) => {
    //     //     setCategories(res.data);
    //     //   })
    //     //   .catch((err) => {
    //     //     console.log("cateories error", err);
    //     //   });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    document.title = `BookShelf-EditBook-${searchedBook.name}`;
  }, [params.bookId, booksState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const editBook = () => {
    if (bookname === "" || author === "" || category === "") {
      alert("Book's name, author or category can't be empty");
      return;
    }
    const updatedBook = {
      id: params.bookId,
      name: bookname,
      author: author,
      categoryId: category,
      isbn: isbn,
    };
    console.log("updatedBook", updatedBook);

    axios
      .put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
      .then((res) => {
        console.log(res);
        dispatch({ type: "EDIT_BOOK", payload: updatedBook });
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => {
        console.log("edit error", err);
      });
  };

  if (categoriesState.success !== true || booksState.success !== true) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Book's Name"
                value={bookname}
                onChange={(event) => setBookname(event.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col my-3">
              <input
                type="text"
                className="form-control"
                placeholder="ISBN"
                value={isbn}
                onChange={(event) => setIsbn(event.target.value)}
              />
            </div>
            <div className="col my-3">
              <select
                className="form-select"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value={""}>Category Select</option>
                {categoriesState.categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary w-50 mx-2">
              Save
            </button>
            <button type="submit" className="btn btn-danger w-50 mx-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showModal === true && (
        <Modal
          title={`"${bookname}" named book will update`}
          explanation="Confirm to save"
          onCancel={() => setShowModal(false)}
          onConfirm={() => editBook()}
        />
      )}
    </div>
  );
};
export default EditBook;
