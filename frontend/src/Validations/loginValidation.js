import * as Yup from "yup";

// Function to convert email to lowercase
const formatEmail = (value) => value.toLowerCase();

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .transform((value) => formatEmail(value)) // Convert email to lowercase
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
