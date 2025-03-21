import * as Yup from "yup";

const signupValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export default signupValidationSchema;
