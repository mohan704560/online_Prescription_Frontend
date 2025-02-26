import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PrescriptionPage = () => {
  const { id } = useParams();
  const [care, setCare] = useState("");
  const [medicines, setMedicines] = useState("");
  const navigate = useNavigate();
  const [prescriptionData, setPrescriptionData] = useState(null);

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
      console.log("res", res.data);
      fetchPrescription();
      alert("Prescription saved successfully");
    } catch (error) {
      console.error("Error saving prescription", error);
      alert("Failed to save prescription");
    }
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get(`/consultation/prescription/${id}`);
      setCare(response.data.consultation.prescription?.care);
      setMedicines(response.data.consultation.prescription?.medicines);
    } catch (error) {
      console.error("Error fetching consultations", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await Axios.get(`/consultation/prescription/${id}`);
      console.log("response.data.consultation", response.data.consultation);
      setPrescriptionData(response.data.consultation);
    } catch (e) {}
  };

  const generatePDF = async () => {
    const input = document.getElementById("prescription-content");
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
        pdf.save("prescription.pdf");
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

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
        <button
          type="button"
          onClick={() => navigate("/doctorDashboard")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Back
        </button>
      </form>

      {prescriptionData && (
        <>
          <div
            id="prescription-content"
            style={{
              marginTop: "20px",
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Medical Prescription
            </h3>
            <hr style={{ margin: "10px 0" }} />
            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ fontWeight: "bold" }}>Doctor Details:</h4>
              <p>
                <strong>Name:</strong> {prescriptionData.doctorId.name}
              </p>
              <p>
                <strong>Specialty:</strong>{" "}
                {prescriptionData.doctorId.spacialty}
              </p>
              <p>
                <strong>Email:</strong> {prescriptionData.doctorId.email}
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ fontWeight: "bold" }}>Patient Details:</h4>
              <p>
                <strong>Name:</strong>
                {prescriptionData.patientId.name}
              </p>
              <p>
                <strong>Age:</strong> {prescriptionData.patientId.age}
              </p>
              <p>
                <strong>Email:</strong> {prescriptionData.patientId.email}
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: "bold" }}>Prescription Details:</h4>
              <p>
                <strong>Care:</strong> {prescriptionData.prescription.care}
              </p>
              <p>
                <strong>Medicines:</strong>{" "}
                {prescriptionData.prescription.medicines || "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
          >
            Download PDF
          </button>
        </>
      )}
    </div>
  );
};

export default PrescriptionPage;
