import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../axios";
import profileImage from "../assets/profile.png";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  const fetchDoctor = async () => {
    try {
      const response = await Axios.get("doctors/profile");
      console.log("response.data.data", response.data);
      setDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor data", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  if (!doctor) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        {doctor.profilePicture && (
          <img
            src={doctor.profilePicture || profileImage}
            alt="Doctor Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
        )}
        <h2 className="text-2xl font-bold mt-4">{doctor.name}</h2>
        <p className="text-gray-600 text-lg">{doctor.specialty}</p>
        <p className="text-gray-500">
          Years of Experience: {doctor.yearsOfExperience}
        </p>
        <p className="text-gray-500">Email: {doctor.email}</p>
        <p className="text-gray-500">Phone: {doctor.phone}</p>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/doctorDashboard")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Create Prescription
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
