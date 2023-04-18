import React, { useEffect } from "react";
import Header from "../components/Header";
import AddCategoryForm from "../components/AddCategoryForm";

const AddCategory = (props) => {
  useEffect(() => {
    document.title = "BookShelf-AddCategory";
  }, []);
  return (
    <>
      <Header />
      <AddCategoryForm />
    </>
  );
};

export default AddCategory;
