import axios from "axios";
import { Container, Image } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Item  } from "./Home";

const fetchItem = async (id: string | undefined) => {
  
  const uri = process.env.REACT_APP_API + "/api/items/" + id;
  console.log(uri);
  const res = await axios.get(uri);

  return res.data;
};

type Props = {};

const ItemPage = (props: Props) => {
  const { id } = useParams();

  const { data: item } = useQuery<Item>("item", () => fetchItem(id));

  console.log(item);
  
  if (item === undefined)
    return (
      <Container>
        <h2>No item with id = {id} found</h2>
      </Container>
    );

  return (
    <Container>
      <div  className="d-flex justify-content-center flex-column">
        <Image src={item.imgs[0]} style={{maxHeight: '400px', flexGrow:0 , objectFit:'cover'}} />
        <div className="d-flex justify-content-between flex-column flex-md-row mt-3">
          <h1>{item.name}</h1>
          <p className="text-3">price: ${item.price}</p>
        </div>
        <p>{item.description}</p>
      </div>
    </Container>
  );
};
export default ItemPage;
