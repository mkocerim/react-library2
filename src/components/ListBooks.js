import React, { useEffect, useState } from "react";
import axios from "axios";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    // fetch("http://localhost:3004/books",{method:"get "});
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        console.log(res);
        setBooks(res.data)
      })
      .catch((err) => console.log("catch blog",err));
  }, []);

  if(books ===null){
    return(
        <div>
            <h1>LOADING...</h1>
        </div>
    )
  }

  return (
    <div className="container my-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>            
            <th scope="col">Category</th>
            <th scope="col">ISBN</th>

          </tr>
        </thead>
        <tbody>
            {
                books.map((book)=>{
                    
                    return(
                        <tr>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>Kategory</td>
                        <td>{book.isbn}</td>
                      </tr>
                    
                    );
                })
            }
         
    
     
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
