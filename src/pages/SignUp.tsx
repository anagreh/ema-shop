import { Container } from "react-bootstrap";
import SignupForm from "../components/SignupForm";

type Props = {};
const SignUp = (props: Props) => {
  return (
    <Container className="rounded mt-3">
      <h1>Sign Up</h1>
      <SignupForm />
    </Container>
  );
};
export default SignUp;
