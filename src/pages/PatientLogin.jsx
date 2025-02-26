import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);

      try {
        const res = await Axios.post("/patients/login", {
          email: values.email,
          password: values.password,
        });

        console.log("res :>> ", res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/patientDashboard");
      } catch (e) {
        console.log("e.message :>> ", e.message);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className="mb-2 w-full p-2 border rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className="mb-4 w-full p-2 border rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-center mt-2">
          New here?{" "}
          <Link to="/patientSignup" className="text-blue-600">
            Create new Account
          </Link>
        </p>

        <p className="text-center mt-2">
          Are you a doctor?{" "}
          <Link to="/doctorLogin" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PatientLogin;
