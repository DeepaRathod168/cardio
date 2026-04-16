import { useState } from "react";
import axios from "axios";

const fields = [
  {
    group: "Personal Info",
    icon: "👤",
    inputs: [
      { name: "age", label: "Age", type: "slider", min: 10, max: 100, unit: "years", normal: "20–60 years", tip: "Your current age in years" },
      { name: "gender", label: "Gender", type: "toggle", options: [{ value: 2, label: "Male", icon: "♂" }, { value: 1, label: "Female", icon: "♀" }], tip: "Biological sex at birth" },
      { name: "height", label: "Height", type: "slider", min: 100, max: 220, unit: "cm", normal: "150–190 cm", tip: "Your height in centimeters" },
      { name: "weight", label: "Weight", type: "slider", min: 30, max: 200, unit: "kg", normal: "50–90 kg", tip: "Your weight in kilograms" },
    ]
  },
  {
    group: "Blood Pressure",
    icon: "🩺",
    inputs: [
      { name: "ap_hi", label: "Systolic BP", type: "slider", min: 60, max: 240, unit: "mmHg", normal: "90–120", danger: "> 140", tip: "Upper blood pressure number" },
      { name: "ap_lo", label: "Diastolic BP", type: "slider", min: 40, max: 160, unit: "mmHg", normal: "60–80", danger: "> 90", tip: "Lower blood pressure number" },
    ]
  },
  {
    group: "Lab Results",
    icon: "🧪",
    inputs: [
      {
        name: "cholesterol", label: "Cholesterol Level", type: "select3",
        options: [{ value: 1, label: "Normal", sub: "< 200 mg/dL", color: "#276749", bg: "#F0FFF4", border: "#9AE6B4" },
          { value: 2, label: "Above Normal", sub: "200–239 mg/dL", color: "#D69E2E", bg: "#FFFFF0", border: "#ECC94B" },
          { value: 3, label: "High", sub: "≥ 240 mg/dL", color: "#C53030", bg: "#FFF5F5", border: "#FEB2B2" }],
        tip: "Total cholesterol level from blood test"
      },
      {
        name: "gluc", label: "Glucose Level", type: "select3",
        options: [{ value: 1, label: "Normal", sub: "70–99 mg/dL", color: "#276749", bg: "#F0FFF4", border: "#9AE6B4" },
          { value: 2, label: "Above Normal", sub: "100–125 mg/dL", color: "#D69E2E", bg: "#FFFFF0", border: "#ECC94B" },
          { value: 3, label: "High", sub: "≥ 126 mg/dL", color: "#C53030", bg: "#FFF5F5", border: "#FEB2B2" }],
        tip: "Fasting blood glucose level"
      },
    ]
  },
  {
    group: "Lifestyle",
    icon: "🏃",
    inputs: [
      { name: "smoke", label: "Smoking", type: "yesno", tip: "Do you currently smoke tobacco?" },
      { name: "alco", label: "Alcohol Use", type: "yesno", tip: "Do you consume alcohol regularly?" },
      { name: "active", label: "Physically Active", type: "yesno", defaultYes: true, tip: "Do you exercise at least 3x per week?" },
    ]
  }
];

const defaults = { age: 45, gender: 1, height: 165, weight: 70, ap_hi: 120, ap_lo: 80, cholesterol: 1, gluc: 1, smoke: 0, alco: 0, active: 1 };

export default function InputForm({ onBack, onResult }) {
  const [form, setForm] = useState(defaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const set = (name, val) => setForm(f => ({ ...f, [name]: val }));

  const bmi = form.weight / ((form.height / 100) ** 2);
  const bmiLabel = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  const bmiColor = bmi < 18.5 ? "#2B6CB0" : bmi < 25 ? "#276749" : bmi < 30 ? "#D69E2E" : "#C53030";

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", form);
      onResult(res.data, form);
    } catch (e) {
      setError("Could not connect to backend. Please ensure the Flask server is running on port 5000.");
    }
    setLoading(false);
  };

  const renderInput = (inp) => {
    if (inp.type === "slider") return (
      <div key={inp.name} style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label style={{ fontWeight: 600, fontSize: "14px", color: "#2D3748", display: "flex", alignItems: "center", gap: "6px" }}>
            {inp.label}
            <span style={{ cursor: "help", color: "#A0AEC0", fontSize: "12px" }}
              onMouseEnter={() => setTooltip(inp.name)}
              onMouseLeave={() => setTooltip(null)}>ⓘ</span>
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{
              fontFamily: "Sora,sans-serif", fontWeight: 700, fontSize: "20px", color: "#1A202C"
            }}>{form[inp.name]}</span>
            <span style={{ color: "#718096", fontSize: "13px" }}>{inp.unit}</span>
          </div>
        </div>
        {tooltip === inp.name && (
          <div style={{
            background: "#1A202C", color: "#E2E8F0", borderRadius: "8px",
            padding: "8px 12px", fontSize: "12px", marginBottom: "8px",
            animation: "fadeIn 0.2s ease"
          }}>{inp.tip}{inp.normal && <><br /><span style={{ color: "#68D391" }}>Normal: {inp.normal}</span></>}</div>
        )}
        <input type="range" min={inp.min} max={inp.max} value={form[inp.name]}
          onChange={e => set(inp.name, Number(e.target.value))}
          style={{ width: "100%", accentColor: "#E53E3E", height: "6px", cursor: "pointer" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#A0AEC0", marginTop: "4px" }}>
          <span>{inp.min}{inp.unit}</span>
          {inp.normal && <span style={{ color: "#48BB78", fontWeight: 500 }}>Normal: {inp.normal}</span>}
          <span>{inp.max}{inp.unit}</span>
        </div>
      </div>
    );

    if (inp.type === "toggle") return (
      <div key={inp.name} style={{ marginBottom: "24px" }}>
        <label style={{ fontWeight: 600, fontSize: "14px", color: "#2D3748", display: "block", marginBottom: "10px" }}>{inp.label}</label>
        <div style={{ display: "flex", gap: "12px" }}>
          {inp.options.map(opt => (
            <button key={opt.value} onClick={() => set(inp.name, opt.value)} style={{
              flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid",
              borderColor: form[inp.name] === opt.value ? "#E53E3E" : "#E2E8F0",
              background: form[inp.name] === opt.value ? "#FFF5F5" : "#fff",
              color: form[inp.name] === opt.value ? "#C53030" : "#4A5568",
              fontWeight: 600, fontSize: "15px", cursor: "pointer", transition: "all 0.2s"
            }}>
              <div style={{ fontSize: "20px" }}>{opt.icon}</div>
              <div style={{ fontSize: "13px", marginTop: "4px" }}>{opt.label}</div>
            </button>
          ))}
        </div>
      </div>
    );

    if (inp.type === "select3") return (
      <div key={inp.name} style={{ marginBottom: "24px" }}>
        <label style={{ fontWeight: 600, fontSize: "14px", color: "#2D3748", display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          {inp.label}
          <span style={{ cursor: "help", color: "#A0AEC0", fontSize: "12px" }}
            onMouseEnter={() => setTooltip(inp.name)}
            onMouseLeave={() => setTooltip(null)}>ⓘ</span>
        </label>
        {tooltip === inp.name && (
          <div style={{ background: "#1A202C", color: "#E2E8F0", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", marginBottom: "8px" }}>{inp.tip}</div>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          {inp.options.map(opt => (
            <button key={opt.value} onClick={() => set(inp.name, opt.value)} style={{
              flex: 1, padding: "12px 8px", borderRadius: "12px",
              border: `2px solid ${form[inp.name] === opt.value ? opt.border : "#E2E8F0"}`,
              background: form[inp.name] === opt.value ? opt.bg : "#fff",
              color: form[inp.name] === opt.value ? opt.color : "#4A5568",
              fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textAlign: "center"
            }}>
              <div style={{ fontSize: "13px", fontWeight: 700 }}>{opt.label}</div>
              <div style={{ fontSize: "11px", marginTop: "3px", opacity: 0.8 }}>{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>
    );

    if (inp.type === "yesno") return (
      <div key={inp.name} style={{ marginBottom: "24px" }}>
        <label style={{ fontWeight: 600, fontSize: "14px", color: "#2D3748", display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          {inp.label}
          <span style={{ cursor: "help", color: "#A0AEC0", fontSize: "12px" }}
            onMouseEnter={() => setTooltip(inp.name)}
            onMouseLeave={() => setTooltip(null)}>ⓘ</span>
        </label>
        {tooltip === inp.name && (
          <div style={{ background: "#1A202C", color: "#E2E8F0", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", marginBottom: "8px" }}>{inp.tip}</div>
        )}
        <div style={{ display: "flex", gap: "12px" }}>
          {[{ val: 1, label: "Yes", color: inp.name === "active" ? "#276749" : "#C53030", bg: inp.name === "active" ? "#F0FFF4" : "#FFF5F5", border: inp.name === "active" ? "#9AE6B4" : "#FEB2B2" },
          { val: 0, label: "No", color: inp.name === "active" ? "#C53030" : "#276749", bg: inp.name === "active" ? "#FFF5F5" : "#F0FFF4", border: inp.name === "active" ? "#FEB2B2" : "#9AE6B4" }].map(opt => (
            <button key={opt.val} onClick={() => set(inp.name, opt.val)} style={{
              flex: 1, padding: "12px", borderRadius: "12px",
              border: `2px solid ${form[inp.name] === opt.val ? opt.border : "#E2E8F0"}`,
              background: form[inp.name] === opt.val ? opt.bg : "#fff",
              color: form[inp.name] === opt.val ? opt.color : "#4A5568",
              fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "all 0.2s"
            }}>{opt.label}</button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7FAFC" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1A202C, #2D3748)",
        padding: "24px 5%", display: "flex", alignItems: "center", gap: "16px"
      }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px"
        }}>← Back</button>
        <div>
          <h1 style={{ fontFamily: "Sora,sans-serif", color: "#fff", fontSize: "20px", fontWeight: 700 }}>
            Health Assessment Form
          </h1>
          <p style={{ color: "#718096", fontSize: "13px" }}>Fill in your details for an accurate risk prediction</p>
        </div>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 5% 60px" }}>
        {/* BMI Live Card */}
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "20px 24px",
          border: "1.5px solid #E2E8F0", marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div>
            <div style={{ fontSize: "13px", color: "#718096", marginBottom: "4px" }}>Live BMI Calculator</div>
            <div style={{ fontFamily: "Sora,sans-serif", fontSize: "28px", fontWeight: 800, color: bmiColor }}>
              {bmi.toFixed(1)}
            </div>
          </div>
          <div style={{
            background: bmiColor + "20", color: bmiColor, border: `1.5px solid ${bmiColor}40`,
            borderRadius: "50px", padding: "8px 20px", fontWeight: 700, fontSize: "15px"
          }}>{bmiLabel}</div>
        </div>

        {/* Form Groups */}
        {fields.map((group) => (
          <div key={group.group} style={{
            background: "#fff", borderRadius: "16px", padding: "24px",
            border: "1px solid #E2E8F0", marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <h3 style={{
              fontFamily: "Sora,sans-serif", fontSize: "16px", fontWeight: 700,
              color: "#1A202C", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px",
              paddingBottom: "12px", borderBottom: "1px solid #EDF2F7"
            }}>
              <span>{group.icon}</span> {group.group}
            </h3>
            {group.inputs.map(renderInput)}
          </div>
        ))}

        {/* Error */}
        {error && (
          <div style={{
            background: "#FFF5F5", border: "1px solid #FEB2B2", borderRadius: "12px",
            padding: "16px 20px", color: "#C53030", fontSize: "14px", marginBottom: "20px"
          }}>⚠️ {error}</div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading} style={{
          width: "100%", padding: "18px", borderRadius: "14px",
          background: loading ? "#CBD5E0" : "linear-gradient(135deg, #E53E3E, #C53030)",
          color: "#fff", fontSize: "17px", fontWeight: 700,
          border: "none", cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "Sora,sans-serif", boxShadow: loading ? "none" : "0 8px 32px rgba(229,62,62,0.35)",
          transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px"
        }}>
          {loading ? (
            <>
              <span style={{ width: "20px", height: "20px", border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
              Analyzing your health data...
            </>
          ) : "❤️ Get My Risk Prediction"}
        </button>
        <p style={{ textAlign: "center", color: "#A0AEC0", fontSize: "12px", marginTop: "12px" }}>
          Your data is processed locally and never stored
        </p>
      </div>
    </div>
  );
}