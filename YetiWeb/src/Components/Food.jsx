import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import AddCategory, { Additems } from "./ModalCategory";
import userLogin from "../context/UserLogin";
import Delete from "./Delete";
import CategoryEdit, {ItemEdit} from "./Edit";

function Food() {
  const [nodata, setnodata] = useState(true);
  const [noItemdata, setnoItemdata] = useState(true);
  const [categorydata, setcategorydata] = useState(null);
  const { LoginToken, Categorynewdata, itemnewdata } = useContext(userLogin);
  const [itemdata, setitemdata] = useState(null);

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
  }, [Categorynewdata]);

  useEffect(() => {
    fetch("https://localhost:7041/api/FoodItem", Requestoptions)
      .then((response) => response.json())
      .then((data) => {
        setitemdata(data.result);
        if (data.result && data.result.length > 0) {
          setnoItemdata(false);
        }
      });
  }, [itemnewdata]);

  return (
    <>
      <div className="d-flex justify-content-between m-5">
        <h2>Food Menu</h2>{console.log(itemdata)}
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
                    <Additems
                      category={category.categoryName}
                      id={category.id}
                    ></Additems>
                    <CategoryEdit
                      category={category.categoryName}
                      id={category.id}
                    ></CategoryEdit>
                    <Delete
                      category={category.categoryName}
                      id={category.id}
                    ></Delete>
                  </div>
                </Card.Body>
                <p
                  className="mx-3 w-50 fw-light"
                  style={{ textAlign: "justify" }}
                >
                  {category.categoryDescription}
                </p>
                <hr />
                <div className="d-flex w-100 p-2 flex-wrap">
                  {noItemdata ? (
                    <div
                      className="text-center"
                      style={{ marginTop: "1%", marginBottom: "1%" }}
                    >
                      <span className="material-symbols-outlined">info</span>
                      <h5 className="card-title">No Data Found</h5>
                      <p className="card-text">Add Food Item.</p>
                    </div>
                  ) : (
                    itemdata  &&
                    itemdata.map((item) => (
                        (item.categoryId == category.id) &&
                      <div className="card mx-4 mb-4 rounded-3 w-25 " key={item.id}>
                        <img
                          src={item.imageUrl}
                          className="card-img-top"
                          style={{ width: "auto", height: "65%" }}
                          alt="..."
                        />
                        <div className="card-body">

                          
                          <h4 className="card-text fw-bold mb-2">
                            {item.foodName}
                          </h4>
                          <p
                            className="card-text fw-normal"
                            style={{ textAlign: "justify" }}
                          >
                            {item.foodDescription}
                          </p>
                          <p className="card-text fw-normal">
                            Price: Rs.{item.foodPrice}
                          </p>
                        </div>
                        <div>
                          <ItemEdit></ItemEdit>
                          <Delete></Delete>
                        </div>
                      </div>
                    ))
                  )}
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
