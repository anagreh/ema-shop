import axios from "axios";
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
  const uri = process.env.REACT_APP_API + "/api/items";
  const res = await axios.get(uri);

  return res.data;
};

type Props = {};
const Home = (props: Props) => {

  const {isLoading,data:items} = useQuery<Item[]>("items", fetchItems);

  return (
    <Container>
      <Row className='pt-3'>
        {isLoading && <p className="text-light">Loading ...</p>}
        {items && items.map((item) => {
          return (
            <Col md={4} lg={3} className="mb-2" key={item._id}>
              <ItemCard item={item}/>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Home;
