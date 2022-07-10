import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

dateSchema.safeParse(new Date("1/12/22")); // success: true
dateSchema.safeParse("2022-01-12T00:00:00.000Z"); // success: true

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  address: z.string().min(1),
  phone: z.string().regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
    message: "input valid phone number",
  }),
  date_of_birth: dateSchema,
});

type signupSchemaType = z.infer<typeof signupSchema>;

const signup = async (data: signupSchemaType) => {
  const uri = process.env.REACT_APP_API + `/api/users`;
  const resp = await axios.post(uri, data);
  return resp.data;
};

type Props = {};

const SignupForm = (props: Props) => {
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors , isSubmitting },
  } = useForm<signupSchemaType>({ resolver: zodResolver(signupSchema) });

  const navigate = useNavigate();

  const mutateSignup = useMutation(signup, {
    onSuccess() {
      navigate("/login");
    },
  });

  useEffect(() => {
    const password = getValues("password");
    const confirmPassword = getValues("confirmPassword");

    if (password !== confirmPassword)
      setError("confirmPassword", { message: "password do not match" });
  }, [getValues, setError]);

  const onValidSubmit = (data: signupSchemaType) => {
    mutateSignup.mutate(data);
  };
  return (
    <Form className="bg-light p-2 rounded" onSubmit={handleSubmit(onValidSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>email</Form.Label>
        <Form.Control type="email" placeholder="Email..." {...register("email")} />
        <p className="text-danger">{errors.email?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>name</Form.Label>
        <Form.Control placeholder="Name..." {...register("name")} />
        <p className="text-danger">{errors.name?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>password</Form.Label>
        <Form.Control type="password" placeholder="password..." {...register("password")} />
        <p className="text-danger">{errors.password?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>confirm password</Form.Label>
        <Form.Control
          type="password"
          placeholder="confirm password..."
          {...register("confirmPassword")}
        />
        <p className="text-danger">{errors.confirmPassword?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>address</Form.Label>
        <Form.Control placeholder="Address..." {...register("address")} />
        <p className="text-danger">{errors.address?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>phone</Form.Label>
        <Form.Control type="phone" placeholder="phone..." {...register("phone")} />
        <p className="text-danger">{errors.phone?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Birth date</Form.Label>
        <Form.Control type="Date" placeholder="phone..." {...register("date_of_birth")} />
        <p className="text-danger">{errors.date_of_birth?.message}</p>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
export default SignupForm;
