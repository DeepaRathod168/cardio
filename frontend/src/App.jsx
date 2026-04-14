import { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    age: "", gender: "1", height: "", weight: "",
    ap_hi: "", ap_lo: "", cholesterol: "1",
    gluc: "1", smoke: "0", alco: "0", active: "1",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, parseFloat(v)])
      );
      const res = await axios.post("http://127.0.0.1:5000/predict", payload);
      setResult(res.data);
    } catch (err) {
      setError("Prediction failed. Make sure backend is running.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: "8px",
    border: "1px solid #334155", background: "#1e293b",
    color: "#f1f5f9", fontSize: "14px", boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", marginBottom: "6px",
    fontSize: "13px", color: "#94a3b8", fontWeight: "500",
  };

  const fields = [
    { name: "age", label: "Age (years)", placeholder: "e.g. 50" },
    { name: "height", label: "Height (cm)", placeholder: "e.g. 170" },
    { name: "weight", label: "Weight (kg)", placeholder: "e.g. 70" },
    { name: "ap_hi", label: "Systolic BP (ap_hi)", placeholder: "e.g. 120" },
    { name: "ap_lo", label: "Diastolic BP (ap_lo)", placeholder: "e.g. 80" },
  ];

  const selects = [
    {
      name: "gender", label: "Gender",
      options: [{ value: "1", label: "Female" }, { value: "2", label: "Male" }]
    },
    {
      name: "cholesterol", label: "Cholesterol",
      options: [
        { value: "1", label: "Normal" },
        { value: "2", label: "Above Normal" },
        { value: "3", label: "Well Above Normal" }
      ]
    },
    {
      name: "gluc", label: "Glucose",
      options: [
        { value: "1", label: "Normal" },
        { value: "2", label: "Above Normal" },
        { value: "3", label: "Well Above Normal" }
      ]
    },
    {
      name: "smoke", label: "Smoker",
      options: [{ value: "0", label: "No" }, { value: "1", label: "Yes" }]
    },
    {
      name: "alco", label: "Alcohol",
      options: [{ value: "0", label: "No" }, { value: "1", label: "Yes" }]
    },
    {
      name: "active", label: "Physically Active",
      options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }]
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>❤️</div>
          <h1 style={{ color: "#f1f5f9", fontSize: "26px", fontWeight: "600", margin: "0 0 8px" }}>
            Cardiovascular Disease Predictor
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Enter patient details to predict cardiovascular disease risk
          </p>
        </div>

        {/* Form Card */}
        <div style={{ background: "#1e293b", borderRadius: "16px", padding: "32px", border: "1px solid #334155" }}>

          {/* Number Inputs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {fields.map((f) => (
              <div key={f.name}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type="number"
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          {/* Dropdowns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
            {selects.map((s) => (
              <div key={s.name}>
                <label style={labelStyle}>{s.label}</label>
                <select
                  name={s.name}
                  value={form[s.name]}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  {s.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "14px", borderRadius: "10px",
              background: loading ? "#334155" : "#3b82f6",
              color: "#fff", fontSize: "16px", fontWeight: "600",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Analyzing..." : "Predict Risk"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            marginTop: "20px", padding: "16px",
            background: "#450a0a", borderRadius: "10px",
            border: "1px solid #7f1d1d", color: "#fca5a5",
            fontSize: "14px"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{
            marginTop: "24px", padding: "28px",
            borderRadius: "16px", textAlign: "center",
            background: result.prediction === 1 ? "#450a0a" : "#052e16",
            border: `1px solid ${result.prediction === 1 ? "#7f1d1d" : "#14532d"}`,
          }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>
              {result.prediction === 1 ? "⚠️" : "✅"}
            </div>
            <h2 style={{
              fontSize: "24px", fontWeight: "700", margin: "0 0 8px",
              color: result.prediction === 1 ? "#fca5a5" : "#86efac",
            }}>
              {result.risk}
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", margin: "0 0 16px" }}>
              Cardiovascular disease probability
            </p>
            <div style={{
              display: "inline-block", padding: "10px 28px",
              borderRadius: "999px",
              background: result.prediction === 1 ? "#7f1d1d" : "#14532d",
              color: "#fff", fontSize: "22px", fontWeight: "700",
            }}>
              {result.probability}%
            </div>
            <p style={{ color: "#64748b", fontSize: "12px", marginTop: "16px" }}>
              Powered by Gradient Boosting · 73.37% accuracy
            </p>
          </div>
        )}

      </div>
    </div>
  );
}