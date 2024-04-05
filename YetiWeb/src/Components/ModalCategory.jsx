import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import userLogin from "../context/UserLogin";

function AddCategory() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { LoginToken, setnewdata } = useContext(userLogin);
  const [CategoryName, setCategoryName] = useState("");
  const [Description, setDescription] = useState("");

  async function AddCategory() {
    const data = {
      categoryName: CategoryName.trim(),
      categoryDescription: Description.trim(),
    };
    const Requestoptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + LoginToken,
      },
      body: JSON.stringify(data),
    };
    const Fetch = await fetch(
      "https://localhost:7041/api/Category",
      Requestoptions
    );
    const jasonData = await Fetch.json();
    if (jasonData.isSuccess == true) {
      setnewdata((newdata) => !newdata);
    }

    handleClose();
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Food Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Food Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example: Pizza"
                autoFocus
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly."
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function Additems(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { LoginToken } = useContext(userLogin);
  const [foodname, setfoodname] = useState(null);
  const [foodDescrption, setfoodDescription] = useState(null);
  const [foodprice, setfoodprice] = useState(null);
  const [foodimg, setfoodimg] = useState(null);

  async function AddItem() {
    const formData = new FormData();
    formData.append('FoodName', foodname.trim());
    formData.append("FoodDescription", foodDescrption.trim());
    formData.append("FoodPrice", foodprice);
    formData.append("FoodImage", foodimg);

    const Requestoptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + LoginToken,
      },
      body: formData,
    };
    const Fetch = await fetch(
      "https://localhost:7041/api/FoodItem",
      Requestoptions
    );
    const jasonData = await Fetch.json();
    console.log(jasonData);
    if (jasonData.isSuccess == true) {
      console.log(jasonData);
    }

    handleClose();
  }

  return (
    <>
      <span
        className="material-symbols-outlined mx-5"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        add
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Food Items In {props.category} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Margherita"
                autoFocus
                onChange={(e) => {
                  setfoodname(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Food Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Margherita pizza features a bubbly crust, crushed San Marzano tomato sauce, fresh mozzarella and basil, a drizzle of olive oil, and a sprinkle of salt."
                onChange={(e) => {
                  setfoodDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Price (Rs.)</Form.Label>
              <Form.Control
                type="Number"
                placeholder="736"
                autoFocus
                onChange={(e) => {
                  setfoodprice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="File"
                autoFocus
                onChange={(e) => {
                  setfoodimg(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddCategory;
