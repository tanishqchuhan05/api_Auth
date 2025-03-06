import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("http://localhost:7001/api/auth/login", values);
      alert(response.data.message);
      localStorage.setItem("token", response.data.data.token); // Store token in localStorage
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      setErrors({ general: error.response?.data?.message || "Login failed" });
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && <p className="text-danger text-center">{errors.general}</p>}

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Don't have an account? */}
              <p className="text-center mt-3">
                Don't have an account? <Link to="/" className="text-decoration-none">Sign Up</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
