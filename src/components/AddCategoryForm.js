import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const { categoriesState } = useSelector((state) => state);

  useEffect(() => {
    document.title = "BookShelf-Add Category";
  }, []);

  console.log("categoriesState", categoriesState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    if (categoryName === "") {
      alert("Category Name can't be  empty");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    );
    console.log("hasCategory", hasCategory);

    if (hasCategory !== undefined) {
      alert("There is the Category");
      return;
    }
    const newCategory = {
      id: new Date().getTime(),
      name:
        categoryName[0].toUpperCase() + categoryName.toLowerCase().substring(1),
    };
    axios
      .post(" http://localhost:3004/categories", newCategory)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "ADD_CATEGORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => {
        console.log("addCategoryErr", err);
      });
  };

  return (
    <div className="my-5 container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Category Name
          </label>
          <input
            value={categoryName}
            onChange={(event) => {
              setCategoryName(event.target.value);
            }}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCategoryForm;
