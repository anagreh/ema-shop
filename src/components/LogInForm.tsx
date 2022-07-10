import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const login = async (data: LoginSchemaType) => {
  const uri = process.env.REACT_APP_API + `/auth/login`;
  const resp = await axios.post(uri, data);
  return resp.data;
};

type Props = {};

const LogInForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutateLogin = useMutation(login, {
    onSuccess(data) {
      localStorage.setItem("jwtToken", data.token);
      queryClient.fetchQuery("user");
      navigate("/");
    },
    onError() {
      setError("wrong email or password");
    },
  });

  const onValidSubmit = (data: LoginSchemaType) => {
    mutateLogin.mutate(data);
  };

  return (
    <Form className="bg-light p-2 rounded" onSubmit={handleSubmit(onValidSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password")} />
        <p className="text-danger">{errors.password?.message}</p>
      </Form.Group>
      <p className="text-danger">{error}</p>
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
export default LogInForm;
