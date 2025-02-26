import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "../assets/qrcode.jpg";
import Axios from "../axios";

const ConsultationForm = () => {
  const { doctorId } = useParams();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentIllness: "",
    recentSurgery: "",
    diabetes: "",
    allergies: "",
    others: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data", formData);
    try {
      const res = await Axios.post("/consultation/create", {
        ...formData,
        doctorId: doctorId,
      });
      alert("Consulation is Booked successfully.");
      navigate("/patientDashboard");
    } catch (e) {
      console.log("e.message :>> ", e.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Consultation Form
      </h2>
      {step === 1 && (
        <div>
          <label className="block mb-2">Current Illness History:</label>
          <textarea
            name="currentIllness"
            value={formData.currentIllness}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <label className="block mb-2">Recent Surgery (Time Span):</label>
          <input
            type="text"
            name="recentSurgery"
            value={formData.recentSurgery}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label className="block mb-2">Diabetes:</label>
          <div className="mb-4">
            <input
              type="radio"
              name="diabetes"
              value="Diabetic"
              onChange={handleChange}
            />{" "}
            Diabetic
            <input
              type="radio"
              name="diabetes"
              value="Non-Diabetic"
              onChange={handleChange}
              className="ml-4"
            />{" "}
            Non-Diabetic
          </div>
          <label className="block mb-2">Allergies:</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <label className="block mb-2">Others:</label>
          <input
            type="text"
            name="others"
            value={formData.others}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleBack}
            className="bg-gray-400 text-white px-4 py-2 rounded mr-4"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <p className="mb-4">Scan the QR code to make the payment:</p>
          <img src={QRCode} alt="QR Code" className="w-40 mx-auto mb-4" />
          <label className="block mb-2">Transaction ID:</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleBack}
            className="bg-gray-400 text-white px-4 py-2 rounded mr-4"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultationForm;
