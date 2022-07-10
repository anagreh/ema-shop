import { Container } from "react-bootstrap";
import LogInForm from "../components/LogInForm";

type Props = {};
const LogIn = (props: Props) => {
  return (
    <Container className="rounded mt-3 col-12 col-md-6">
      <h1>Log In</h1>

      <LogInForm />
    </Container>
  );
};
export default LogIn;
