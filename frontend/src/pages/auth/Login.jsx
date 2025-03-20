import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://localhost:7001/api/auth/login",
        values
      );

      // console.log("🔑 Token received:", response.data.token); // Log received token

      if (!response.data.token) {
        throw new Error("No token received from server.");
      }

      localStorage.setItem("token", response.data.token); // Store token
      localStorage.setItem("adminName", response.data.user.username);

      // ✅ Ensure `user` exists before accessing `role`
      if (response.data.user && response.data.user.role) {
        localStorage.setItem("role", response.data.user.role);
        console.log(
          "✅ Token & Role saved:",
          localStorage.getItem("token"),
          localStorage.getItem("role")
        );

        //navigate("/admindashboard"); // Redirect after login
        if (response.data.user.role === "superAdmin") {
          navigate("/admindashboard");
        } else {
          navigate("/userdashboard");
        }
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      setErrors({ general: error.response?.data?.message || "Login failed" });
    }
    setSubmitting(false);
  };

  // Immediately check if token exists
  //console.log("🛠️ Token in localStorage after login:", localStorage.getItem("token"));

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <h2 className="text-center text-primary mb-4">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && (
                <p className="text-danger text-center">{errors.general}</p>
              )}

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Password */}
              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <span
                    className="input-group-text bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`fa ${
                        passwordVisible ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Don't have an account? */}
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/" className="text-decoration-none">
                  Sign Up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
