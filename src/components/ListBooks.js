import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";

const ListBooks = (props) => {
  const { categoriesState, booksState } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("categoriesState", categoriesState);
  console.log("booksState", booksState);

  // const [books, setBooks] = useState(null);
  // const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(null);
  const [silinecekKitapIsmi, setSilinecekKitapIsmi] = useState("");
  useEffect(() => {
    // fetch("http://localhost:3004/books",{method:"get "});
    // axios
    //   .get("http://localhost:3004/books")
    //   .then((resBook) => {
    //     console.log(resBook);
    //     setBooks(resBook.data);
    //     //   axios
    //     //     .get("http://localhost:3004/categories")
    //     //     .then((resCat) => {
    //     //       console.log(resCat);
    //     //       setTimeout(() => {
    //     //         setCategories(resCat.data);
    //     //       }, 1000);
    //     //     })
    //     //     .catch((errCat) => console.log("Categories catch blog", errCat));
    //     //
    //   })
    //   .catch((errBook) => console.log("Book catch blog", errBook));
  }, [didUpdate]);

  const deleteBook = (id) => {
    console.log(`http://localhost:3004/books/${id}`);

    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log("delete res", res);
        dispatch({ type: "DELETE_BOOK", paylaod: id });

        setDidUpdate(!didUpdate);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  if (booksState.success !== true || categoriesState.success !== true) {
    return <Loading />;
  }

  return (
    <div className="container my-5">
      <div className="my-3 d-flex justify-content-end">
        <Link to="/add-book" className="btn btn-primary">
          AddBook
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th className="text-center" scope="col">
              ISBN
            </th>
            <th>Duty</th>
          </tr>
        </thead>
        <tbody>
          {booksState.books.map((book) => {
            const category = categoriesState.categories.find(
              (cat) => cat.id === book.categoryId
            );

            return (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{category.name}</td>
                <td className="text-center">
                  {book.isbn === "" ? "-" : book.isbn}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSilinecekKitap(book.id);
                        setSilinecekKitapIsmi(book.name);
                      }}
                      type="button"
                      className="btn btn-outline-danger btn-sm "
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit-book/${book.id}`}
                      className="btn btn-outline-secondary mx-1"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal === true && (
        <Modal
          expl={`"${silinecekKitapIsmi}"are you  sure to delete ?`}
          title={silinecekKitapIsmi}
          onConfirm={() => deleteBook(silinecekKitap)}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ListBooks;
