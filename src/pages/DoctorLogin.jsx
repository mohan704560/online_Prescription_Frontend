import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

const DoctorLogin = () => {
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
      try {
        const res = await Axios.post("/doctors/login", {
          email: values.email,
          password: values.password,
        });

        console.log("res :>> ", res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/doctorDashboard");
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
          className="w-full p-2 border rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className="mt-2 w-full p-2 border rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.password}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-center mt-2">
          New here?{" "}
          <Link to="/doctorSignup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default DoctorLogin;
