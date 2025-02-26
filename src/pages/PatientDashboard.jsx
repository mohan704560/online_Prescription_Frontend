import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../axios";
import ProfileImage from "../assets/profile.png";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await Axios.get("/doctors/getAllDoctors");
      setDoctors([...response.data.data]);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleConsult = (doctorId) => {
    navigate(`/consultation/${doctorId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="p-4 shadow-lg rounded-2xl bg-white border border-gray-200"
        >
          <img
            src={ProfileImage}
            alt={doctor.name}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => handleConsult(doctor._id)}
            >
              Consult
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientDashboard;
