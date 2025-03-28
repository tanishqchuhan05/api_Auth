import * as Yup from "yup";

// Function to capitalize the first letter of each word in the username
const formatUsername = (value) => {
  if (!value) return "";
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Function to convert email to lowercase
const formatEmail = (value) => value.toLowerCase();

const signupValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Must be at least 3 characters")
    .transform((value) => formatUsername(value)) // Apply transformation
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email format")
    .transform((value) => formatEmail(value)) // Convert email to lowercase
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default signupValidationSchema;
