import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../axios";

const PrescriptionCompletedPage = () => {
  const { id } = useParams();
  const [care, setCare] = useState("");
  const [medicines, setMedicines] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!care) {
      alert("Care to be taken is required");
      return;
    }
    try {
      const res = await Axios.post(`/consultation/prescriptions`, {
        consultationId: id,
        care,
        medicines,
      });
      alert("Prescription saved successfully");
      navigate("/doctorDashboard");
    } catch (error) {
      console.error("Error saving prescription", error);
      alert("Failed to save prescription");
    }
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get(`/consultation/prescription/${id}`);
      setCare(response.data.consultation.prescription.care);
      setMedicines(response.data.consultation.prescription.medicines);
    } catch (error) {
      console.error("Error fetching consultations", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Write Prescription</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">
            Care to be Taken *
          </label>
          <textarea
            value={care}
            onChange={(e) => setCare(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Medicines</label>
          <textarea
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Save Prescription
        </button>
      </form>
    </div>
  );
};

export default PrescriptionCompletedPage;
