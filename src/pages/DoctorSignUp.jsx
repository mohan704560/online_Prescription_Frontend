import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

const DoctorSignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      profilePicture: "",
      name: "",
      specialty: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      experience: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      specialty: Yup.string().required("Specialty is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),

      experience: Yup.number()
        .positive("Experience must be greater than 0")
        .required("Experience is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await Axios.post("/doctors/register", {
          profilePicture: "profileImage",
          name: values.name,
          specialty: values.specialty,
          email: values.email,
          phone: values.phone,
          password: values.password,
          yearsOfExperience: values.experience,
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
          type="file"
          name="profilePicture"
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          {...formik.getFieldProps("name")}
          className="mt-2 w-full p-2 border rounded"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.name}</p>
        )}
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          {...formik.getFieldProps("specialty")}
          className="mt-2 w-full p-2 border rounded"
        />
        {formik.touched.specialty && formik.errors.specialty && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.specialty}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className="mt-2 w-full p-2 border rounded"
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          {...formik.getFieldProps("confirmPassword")}
          className="mt-2 w-full p-2 border rounded"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm ms-1">
            {formik.errors.confirmPassword}
          </p>
        )}

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          {...formik.getFieldProps("phone")}
          className="mt-2 w-full p-2 border rounded"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.phone}</p>
        )}
        <input
          type="number"
          step="0.1"
          name="experience"
          placeholder="Years of Experience"
          {...formik.getFieldProps("experience")}
          className="mt-2 w-full p-2 border rounded"
        />
        {formik.touched.experience && formik.errors.experience && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.experience}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Sign Up
        </button>

        <p className="text-center mt-2">
          Already have an account?
          <Link to="/doctorLogin" className="text-blue-600">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default DoctorSignUp;
