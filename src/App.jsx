import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorSignUp from "./pages/DoctorSignUp";
import DoctorLogin from "./pages/DoctorLogin";
import PatientSignUp from "./pages/PatientSignUp";
import PatientLogin from "./pages/PatientLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ConsultationForm from "./pages/ConsultationForm";
import PrescriptionPage from "./pages/PrescriptionPage";
import DoctorProfile from "./pages/DoctorProfile";
import PrescriptionCompletedPage from "./pages/PrescriptionCompletedPage ";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientLogin />} />
        <Route path="/doctorSignup" element={<DoctorSignUp />} />
        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path="/patientSignup" element={<PatientSignUp />} />
        <Route path="/patientLogin" element={<PatientLogin />} />
        <Route path="/doctorProfile" element={<DoctorProfile />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />
        <Route path="/consultation/:doctorId" element={<ConsultationForm />} />
        <Route path="/prescription/:id" element={<PrescriptionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
