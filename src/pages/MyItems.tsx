import axios from "axios";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import ItemCard from "../components/ItemCard";


export type Item = {
  _id:string
  user_id: string;
  name: string;
  description: string;
  price: string;
  imgs: string[];
  stock: number;
};

const fetchItems = async () => {
  const uri = process.env.REACT_APP_API + "/api/items/my-items";
  const res = await axios.get(uri , {headers:{ Authorization: "Bearer " + localStorage.getItem("jwtToken") }});

  return res.data;
};



type Props = {};
const MyItems = (props: Props) => {
  const [items, setItems] = useState<Item[]>([]);

  const delItem = (id : string) => {
    setItems(items => items.filter((item) => item._id !== id))
  }

  useQuery("items", fetchItems,{onSuccess(data){
    setItems(data)
  }});

  return (
    <Container>
      <Row  className='pt-3'>
        {items.map((item) => {
          return (
            <Col md={4} lg={3} className="mb-2" key={item._id}>
              <ItemCard item={item} variant='delete' delItem={delItem}/>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MyItems