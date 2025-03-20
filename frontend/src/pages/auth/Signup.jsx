import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Must be at least 3 characters").required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
        const response = await axios.post("http://localhost:7001/api/auth/register", {
            ...values,
            role: "user" // Ensure role is included
        });

        alert(response.data.message);
        navigate("/login");
    } catch (error) {
        setErrors({ general: error.response?.data?.message || "Registration failed" });
    }
    setSubmitting(false);
};



  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center text-primary mb-4">Sign Up</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && <p className="text-danger text-center">{errors.general}</p>}

              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" placeholder="Enter username" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>

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
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              {/* Already have an account? */}
              <p className="text-center mt-3">
                Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
