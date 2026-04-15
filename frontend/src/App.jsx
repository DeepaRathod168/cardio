import { useState } from "react";
import LandingPage from "./components/LandingPage";
import InputForm from "./components/InputForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);

  const goToForm = () => setPage("form");
  const goToLanding = () => setPage("landing");

  const handleResult = (data, inputs) => {
    setResult(data);
    setFormData(inputs);
    setPage("dashboard");
  };

  return (
    <div className="app-root">
      {page === "landing" && <LandingPage onStart={goToForm} />}
      {page === "form" && <InputForm onBack={goToLanding} onResult={handleResult} />}
      {page === "dashboard" && (
        <Dashboard result={result} formData={formData} onBack={goToForm} onHome={goToLanding} />
      )}
    </div>
  );
}