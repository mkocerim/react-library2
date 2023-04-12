import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";

const EditCategory = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { categoryId } = useParams();
  const [allCategories, setAllCategories] = useState(null);

  console.log("categoryId", categoryId);
  //üstteki ve alttaki gösterimler tamamen aynidir
  const params = useParams();
  console.log(params.categoryId);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/categories/`)
      .then((res) => {
        console.log(res.data);

        setAllCategories(res.data);

        const myCategory = res.data.find(
          (item) => item.id == params.categoryId
        );

        setCategory(myCategory);
        setNewCategoryName(res.data.name);
      })
      .catch((err) => {
        console.log("editCategoryErr", err);
      });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    if (newCategoryName === "") {
      alert("Category Name can`t be empty ");
      return;
    }
  };

  if (allCategories === null) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="my-5 container">
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50 my-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
