import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import AddCategory from "./ModalCategory";
import userLogin from "../context/UserLogin";

function Food() {
  const [nodata, setnodata] = useState(true);
  const [categorydata, setcategorydata] = useState(null);
  const { LoginToken, newdata } = useContext(userLogin);
  
  const Requestoptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + LoginToken,
    },
  };

  useEffect(() => {
    fetch("https://localhost:7041/api/Category/", Requestoptions)
      .then((response) => response.json())
      .then((data) => {
        setcategorydata(data.result);
        if (data.result && data.result.length > 0) {
          setnodata(false);
        }
      });
  }, [newdata]);

  return (
    <>
      <div className="d-flex justify-content-between m-5">
        <h2>Food Menu</h2>
        <AddCategory></AddCategory>
      </div>
      <div className="card m-5 " style={{ minHeight: "70%" }}>
        <div className="card-body">
          {nodata ? (
            <div className="text-center" style={{ marginTop: "15%" }}>
              <span className="material-symbols-outlined">info</span>
              <h5 className="card-title">No Data Found</h5>
              <p className="card-text">
                Add category list to add your food menu.
              </p>
            </div>
          ) : (
            categorydata &&
            categorydata.map((category) => (
              <Card key={category.id} className="mb-3">
                <Card.Body className="d-flex justify-content-between">
                  <h3>{category.categoryName}</h3>
                  <div>
                    <span
                      className="material-symbols-outlined mx-5"
                      style={{ cursor: "pointer" }}
                    >
                      add
                    </span>
                    <span
                      className="material-symbols-outlined pointer"
                      style={{ cursor: "pointer" }}
                    >
                      delete
                    </span>
                  </div>
                </Card.Body>
                <p
                  className="mx-3 w-50 fw-light"
                  style={{ textAlign: "justify" }}
                >
                  {category.categoryDescription}
                </p>
                <hr />
                <div className="d-flex w-50 p-2 ">
                  <div className="card mx-3" style={{ width: "18 rem" }}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div>
                  <div className="card" style={{ width: "18 rem" }}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Food;
