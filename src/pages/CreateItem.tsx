import { Container } from "react-bootstrap";
import CreateItemForm from "../components/CreateItemForm";



type Props = {};

const CreateItem = (props: Props) => {
  return (
    <Container className="rounded mt-3 col-12 col-md-10">

      <CreateItemForm></CreateItemForm>
    </Container>
  );
};

export default CreateItem;
