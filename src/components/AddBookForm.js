import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AddBookForm = (props) => {
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  console.log("AddBookForm categoriesState", categoriesState);
  const navigate = useNavigate();
  // const [categories, setCategories] = useState(null);
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3004/categories")
  //     .then((res) => {
  //       console.log(res);
  //       setCategories(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("name",bookname)
    // console.log("author",author)
    // console.log("ISBN", isbn)
    // console.log("Category",category)
    if (bookname === "" || author === "" || category === "") {
      alert("Bookname, Author and Category can't be empty ");
      return;
    }
    const newBook = {
      id: new Date().getTime(),
      name: bookname,
      author: author,
      isbn: isbn,
      categoryId: category,
    };

    axios
      .post("http://localhost:3004/books", newBook)
      .then((res) => {
        console.log("Book add response", res);

        dispatch({ type: "ADD_BOOK", payload: newBook });

        setBookname("");
        setAuthor("");
        setIsbn("");
        setCategory("");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (categoriesState.success !== true) {
    return <Loading />;
  }

  return (
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
              <option value={""} selected>
                Category Select
              </option>
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
          <button type="submit" className="btn btn-primary w-50 ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
