import axios from "axios";
import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { Item } from "../pages/Home";

const deleteItem = async (id: string) => {
  const uri = process.env.REACT_APP_API + "/api/items/" + id;
  const res = await axios.delete(uri, {
    headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
  });

  return res.data;
};

type Props = {
  variant?: "def" | "delete";
  item: Item;
  delItem?: (id: string) => void
};

const ItemCard = ({ item, variant = "def" ,delItem }: Props) => {


  const imgSrc =
    item.imgs.length === 0
      ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png"
      : item.imgs[0];

  return (
    <Card className="mx-auto">
      <Card.Img
        className="mx-auto img-thumbnail"
        src={imgSrc}
        width="auto"
        height="auto"
        alt={"product"}
      />
      <Card.Body className="text-center mx-auto">
        <div>
          <Card.Title className="card-title font-weight-bold">{item.name}</Card.Title>
          <Card.Text className="card-text">${item.price}</Card.Text>
          <Link to={`items/${item._id}`} className="btn details px-auto">
            view details
          </Link>
          <br />
        </div>
        {variant === "delete" && delItem && <Confirmation  item={item} delItem={delItem}/>}
      </Card.Body>
    </Card>
  );
};

type ConfirmationProps = {
  item: Item;
  delItem: (id: string) => void

};
function Confirmation({item, delItem}: ConfirmationProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mutateDelete = useMutation(deleteItem ,{onSuccess() {
    delItem(item._id)
    handleClose()
    
  },});

  const handleDelete = () => {
    mutateDelete.mutate(item._id);

  }

  return (
    <>
      <svg
        role={"button"}
        onClick={handleShow}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash text-danger"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path
          fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete item, {item.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemCard;
