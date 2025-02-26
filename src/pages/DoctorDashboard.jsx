import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../axios";

const DoctorDashboard = () => {
  const [consultations, setConsultations] = useState([]);

  const fetchConsultations = async () => {
    try {
      const response = await Axios.get("/consultation/getConsultations");
      console.log("response", response);
      setConsultations(response.data.consultations);
    } catch (error) {
      console.error("Error fetching consultations", error);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Patient Consultations</h2>
      <PatientCard consultations={consultations} />
    </div>
  );
};

const PatientCard = ({ consultations }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {consultations.map((consultation) => (
        <div
          key={consultation._id}
          className="p-4 bg-white shadow-lg rounded-lg"
        >
          <p className="text-end">
            <span
              className="text-sm font-semibold px-2 py-1 rounded-lg"
              style={
                consultation.status === "incomplete"
                  ? { backgroundColor: "gray" }
                  : { backgroundColor: "#bcf5bc" }
              }
            >
              {consultation.status}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Patient Name: {consultation.patientId.name}
          </p>

          <p className="text-gray-600">
            Previous Illness: {consultation.patientId.illnessHistory}
          </p>
          <p className="text-gray-600">
            Previous Surgery: {consultation.patientId.surgeryHistory}
          </p>
          <p className="text-gray-600">
            Illness: {consultation.currentIllness}
          </p>
          <p className="text-gray-600">
            Recent Surgery: {consultation.recentSurgery || "N/A"}
          </p>
          <p className="text-gray-600">Diabetes: {consultation.diabetes}</p>
          <p className="text-gray-600">
            Allergies: {consultation.allergies || "None"}
          </p>
          <p className="text-gray-600">
            Others: {consultation.others || "N/A"}
          </p>
          <button
            onClick={() => navigate(`/prescription/${consultation._id}`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Write Prescription
          </button>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboard;
