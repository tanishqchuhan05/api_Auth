import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../Services/userService";
import signupValidationSchema from "../../Validations/signupValidation";
import ROLES from "../../utils/roles";
import { APP_ROUTES } from "../../utils/appRoutes"; // Import Routes

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await userService.register({ ...values, role: ROLES.USER });
      alert("Registration successful!");
      navigate(APP_ROUTES.LOGIN); // Use APP_ROUTES instead of hardcoded path
    } catch (error) {
      setErrors({ general: error });
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center text-primary mb-4">Sign Up</h2>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && <p className="text-danger text-center">{errors.general}</p>}

              <div className="mb-3">
                <label className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" placeholder="Enter username" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <Field type={passwordVisible ? "text" : "password"} name="password" className="form-control" placeholder="Enter password" />
                  <span
                    className="input-group-text bg-transparent border-0 position-absolute top-50 end-0 translate-middle-y"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to={APP_ROUTES.LOGIN} className="text-decoration-none">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
