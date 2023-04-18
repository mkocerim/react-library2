import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
const ListCategories = () => {
  const { categoriesState, booksState } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("booksState", booksState);

  const [silinecekCategoryName, setSilinecekCategoryName] = useState("");
  const [silinecekCategory, setSilinecekCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    document.title = "BookShelf - Categories";
  }, []);

  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "DELETE_CATEGORY", payload: id });

        const booksHasCategory = booksState.books.filter(
          (item) => item.categoryId == id
        );
        console.log("booksHasCategory", booksHasCategory);
        booksHasCategory.map((item) =>
          dispatch({ type: "DELETE_BOOK", payload: item.id })
        );
      })
      .catch((err) => console.log("deleteCategoryErr", err));

    // dispatch({ type: "DELETE_BOOK", payload: booksState.id });
  };

  if (categoriesState.success !== true) {
    return <Loading />;
  }

  return (
    <div className="container my-5">
      <div className="my-3 d-flex justfiy-content-between">
        <Link to="/add-category" className="btn btn-primary">
          AddCategory
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category Name</th>

            <th className="text-center" scope="col">
              Duty
            </th>
          </tr>
        </thead>
        <tbody>
          {categoriesState.categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.name}</td>

                <td>
                  <div className="btn-group d-flex" role="group">
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSilinecekCategory(category.id);
                        setSilinecekCategoryName(category.name);
                      }}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>

                    <Link
                      to={`/edit-category/${category.id}`}
                      className="btn btn-outline-secondary mx-1 "
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
      {showDeleteModal === true && (
        <Modal
          expl={`"${silinecekCategoryName}" are you  sure to delete ?`}
          title={`"${silinecekCategoryName}"`}
          onConfirm={() => deleteCategory(silinecekCategory)}
          onCancel={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ListCategories;
