import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

const PatientSignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      profilePicture: "",
      name: "",
      age: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      surgeryHistory: "",
      illnessHistory: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .positive("Age must be greater than 0")
        .required("Age is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      surgeryHistory: Yup.string().required("Surgery history is required"),
      illnessHistory: Yup.string().required("Illness history is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);

      try {
        const res = await Axios.post("/patients/register", {
          profilePicture: "profileImage",
          name: values.name,
          age: values.age,
          email: values.email,
          phone: values.phone,
          password: values.password,
          surgeryHistory: values.surgeryHistory,
          illnessHistory: values.illnessHistory,
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
          type="file"
          name="profilePicture"
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.touched.profilePicture && formik.errors.profilePicture && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.profilePicture}</p>
        )}
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
          type="number"
          name="age"
          placeholder="Age"
          {...formik.getFieldProps("age")}
          className="mt-2 w-full p-2 border rounded"
        />
        {formik.touched.age && formik.errors.age && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.age}</p>
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
        <textarea
          name="surgeryHistory"
          placeholder="History of Surgery"
          {...formik.getFieldProps("surgeryHistory")}
          className="mt-2 w-full p-2 border rounded"
        ></textarea>
        {formik.touched.surgeryHistory && formik.errors.surgeryHistory && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.surgeryHistory}</p>
        )}
        <textarea
          name="illnessHistory"
          placeholder="History of Illness (comma-separated)"
          {...formik.getFieldProps("illnessHistory")}
          className="mt-2 w-full p-2 border rounded"
        ></textarea>
        {formik.touched.illnessHistory && formik.errors.illnessHistory && (
          <p className="text-red-500 text-sm ms-1">{formik.errors.illnessHistory}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
        <p className="text-center mt-2">
          Already have an account?
          <Link to="/" className="text-blue-600">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PatientSignUp;
