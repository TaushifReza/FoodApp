import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import userLogin from "../context/UserLogin";

function AddCategory() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { LoginToken,setnewdata} = useContext(userLogin);
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
      if(jasonData.isSuccess == true){
        setnewdata(newdata => !newdata)
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCategory;
