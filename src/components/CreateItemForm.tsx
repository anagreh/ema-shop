import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(3),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  description: z.string().min(1),
  stock: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  imgs: z.string().url(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const postItem = async (item: FormSchemaType) => {

  const resp = await axios.post(process.env.REACT_APP_API + `/api/items`, item, {
    headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
  });

  return resp.data;
};

type Props = {};

const CreateItemForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

  const navigate = useNavigate();
  const mutateItem = useMutation(postItem, { onSuccess: (data) => navigate("./" + data._id) });

  const onSubmit = (data: FormSchemaType) => {
    mutateItem.mutate(data);
  };

  return (
    <Form className="bg-light p-2 rounded" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Item Name</Form.Label>
        <Form.Control placeholder="Item Name" {...register("name")} />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Item Price</Form.Label>
        <Form.Control type="number" placeholder="Item Price" {...register("price")} />
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="textarea" placeholder="Item Description" {...register("description")} />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" placeholder="Stock" {...register("stock")} />
        {errors.stock && <p className="text-danger">{errors.stock.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Img</Form.Label>
        <Form.Control
          placeholder="Img Url"
          {...register("imgs")}
        />
        {errors.imgs && <p className="text-danger">{errors.imgs.message}</p>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateItemForm;
