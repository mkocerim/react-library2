import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListCategories = () => {
  const { categoriesState } = useSelector((state) => state);

  console.log("categoriesState", categoriesState);

  useEffect(() => {
    document.title = "BookShelf - Categories";
  }, []);

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
                        // setShowModal(true);
                        // setSilinecekKitap(book.id);
                        // setSilinecekKitapIsmi(book.name);
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
      {/* {showModal === true && (
        <Modal
          expl={`"${silinecekKitapIsmi}"are you  sure to delete ?`}
          title={silinecekKitapIsmi}
          onConfirm={() => deleteBook(silinecekKitap)}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      )} */}
    </div>
  );
};

export default ListCategories;
