import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/appRoutes"; 
import { loginValidationSchema } from "../../Validations/loginValidation"; 
import ROLES from "../../utils/roles"; 
import { loginUser } from "../../Services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await loginUser(values); // Call the API function

      localStorage.setItem("token", data.token);
      localStorage.setItem("adminName", data.user.username);
      localStorage.setItem("role", data.user.role);

      // Navigate based on role
      const dashboardRoute =
        data.user.role === ROLES.SUPER_ADMIN
          ? APP_ROUTES.ADMIN_DASHBOARD
          : APP_ROUTES.USER_DASHBOARD;
      navigate(dashboardRoute);
    } catch (error) {
      setErrors({ general: error });
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && <p className="text-danger text-center">{errors.general}</p>}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

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
                    <i className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to={APP_ROUTES.HOME} className="text-decoration-none">
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
