import { useEffect, useState, useRef } from "react";

const NORMAL = {
  age: [20, 60], height: [150, 190], weight: [50, 90],
  ap_hi: [90, 120], ap_lo: [60, 80],
};

const LABELS = {
  age: "Age", height: "Height", weight: "Weight",
  ap_hi: "Systolic BP", ap_lo: "Diastolic BP",
  cholesterol: "Cholesterol", gluc: "Glucose",
  smoke: "Smoking", alco: "Alcohol", active: "Active"
};

const UNITS = {
  age: "yrs", height: "cm", weight: "kg",
  ap_hi: "mmHg", ap_lo: "mmHg",
};

const recommendations = {
  high: [
    { icon: "🥗", title: "Heart-Healthy Diet", desc: "Reduce sodium, saturated fats. Eat more fruits, vegetables, and whole grains." },
    { icon: "🏃", title: "Daily Exercise", desc: "Aim for 150 minutes of moderate activity per week. Start with 20-minute walks." },
    { icon: "🚭", title: "Quit Smoking", desc: "Smoking cessation reduces heart risk by 50% within one year." },
    { icon: "👨‍⚕️", title: "See a Doctor", desc: "Consult a cardiologist for a comprehensive cardiac evaluation immediately." },
    { icon: "💊", title: "Monitor BP Daily", desc: "Track blood pressure every day and keep records to share with your doctor." },
  ],
  low: [
    { icon: "✅", title: "Keep It Up!", desc: "Your current lifestyle is protecting your heart. Maintain these healthy habits." },
    { icon: "🏃", title: "Stay Active", desc: "Continue regular physical activity to keep your cardiovascular system strong." },
    { icon: "🥗", title: "Balanced Diet", desc: "Maintain a diet rich in fruits, vegetables, lean proteins, and whole grains." },
    { icon: "🩺", title: "Annual Checkups", desc: "Schedule yearly health screenings to monitor blood pressure and cholesterol." },
  ]
};

function CircularProgress({ pct, color, size = 140 }) {
  const [animated, setAnimated] = useState(0);
  const r = 52;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(pct), 300);
    return () => clearTimeout(timer);
  }, [pct]);

  const offset = circ - (animated / 100) * circ;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDF2F7" strokeWidth="10" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
    </svg>
  );
}

function BarCompare({ name, value, unit }) {
  const [w, setW] = useState(0);
  const range = NORMAL[name];
  if (!range) return null;

  const max = range[1] * 1.4;
  const pct = Math.min((value / max) * 100, 100);
  const normalStartPct = (range[0] / max) * 100;
  const normalEndPct = (range[1] / max) * 100;
  const isNormal = value >= range[0] && value <= range[1];

  useEffect(() => {
    const t = setTimeout(() => setW(pct), 200);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#2D3748" }}>{LABELS[name]}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 700, fontSize: "14px" }}>{value} {unit || UNITS[name]}</span>
          <span style={{
            fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "50px",
            background: isNormal ? "#F0FFF4" : "#FFF5F5",
            color: isNormal ? "#276749" : "#C53030",
            border: `1px solid ${isNormal ? "#9AE6B4" : "#FEB2B2"}`
          }}>{isNormal ? "Normal" : "Abnormal"}</span>
        </div>
      </div>
      <div style={{ position: "relative", height: "10px", background: "#EDF2F7", borderRadius: "50px", overflow: "hidden" }}>
        {/* Normal zone */}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${normalStartPct}%`, width: `${normalEndPct - normalStartPct}%`,
          background: "rgba(72,187,120,0.25)"
        }} />
        {/* Value bar */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0,
          width: `${w}%`, borderRadius: "50px",
          background: isNormal ? "#48BB78" : "#E53E3E",
          transition: "width 1s cubic-bezier(0.4,0,0.2,1)"
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#A0AEC0", marginTop: "3px" }}>
        <span>0</span>
        <span style={{ color: "#48BB78" }}>Normal: {range[0]}–{range[1]}</span>
        <span>{Math.round(max)}</span>
      </div>
    </div>
  );
}

export default function Dashboard({ result, formData, onBack, onHome }) {
  const isHigh = result?.prediction === 1;
  const prob = result?.probability ?? 0;
  const risk = result?.risk ?? "Unknown";
  const printRef = useRef();

  const riskColor = prob < 35 ? "#276749" : prob < 60 ? "#D69E2E" : "#C53030";
  const riskBg = prob < 35 ? "#F0FFF4" : prob < 60 ? "#FFFFF0" : "#FFF5F5";
  const riskBorder = prob < 35 ? "#9AE6B4" : prob < 60 ? "#ECC94B" : "#FEB2B2";
  const riskLabel = prob < 35 ? "Low Risk" : prob < 60 ? "Moderate Risk" : "High Risk";
  const riskEmoji = prob < 35 ? "✅" : prob < 60 ? "⚠️" : "🚨";

  const abnormal = Object.entries(formData || {}).filter(([k, v]) => {
    if (NORMAL[k]) return v < NORMAL[k][0] || v > NORMAL[k][1];
    if (k === "smoke" || k === "alco") return v === 1;
    if (k === "active") return v === 0;
    if (k === "cholesterol" || k === "gluc") return v > 1;
    return false;
  });

  const handlePrint = () => window.print();

  return (
    <div style={{ minHeight: "100vh", background: "#F7FAFC" }} ref={printRef}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1A202C, #2D3748)",
        padding: "24px 5%", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={onBack} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px"
          }}>← Redo</button>
          <div>
            <h1 style={{ fontFamily: "Sora,sans-serif", color: "#fff", fontSize: "20px", fontWeight: 700 }}>
              Your Risk Dashboard
            </h1>
            <p style={{ color: "#718096", fontSize: "13px" }}>Powered by Gradient Boosting · 73.37% accuracy</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handlePrint} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: "#E2E8F0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px"
          }}>📄 Download Report</button>
          <button onClick={onHome} style={{
            background: "#E53E3E", border: "none", color: "#fff",
            padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600
          }}>🏠 Home</button>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 5% 60px" }}>

        {/* Main Result Card */}
        <div className="fade-up" style={{
          background: "#fff", borderRadius: "20px", padding: "36px",
          border: `2px solid ${riskBorder}`, marginBottom: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap"
        }}>
          {/* Circular gauge */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <CircularProgress pct={prob} color={riskColor} size={140} />
            <div style={{
              position: "absolute", inset: 0, display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontFamily: "Sora,sans-serif", fontSize: "28px", fontWeight: 800, color: riskColor }}>{prob}%</span>
              <span style={{ fontSize: "11px", color: "#718096", marginTop: "2px" }}>Risk Score</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: riskBg, color: riskColor, border: `1.5px solid ${riskBorder}`,
              borderRadius: "50px", padding: "6px 18px", marginBottom: "12px",
              fontWeight: 700, fontSize: "15px"
            }}>
              <span>{riskEmoji}</span> {riskLabel}
            </div>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "26px", fontWeight: 800, color: "#1A202C", marginBottom: "8px" }}>
              {isHigh ? "Cardiovascular Risk Detected" : "You're in Good Shape!"}
            </h2>
            <p style={{ color: "#718096", fontSize: "14px", lineHeight: 1.7 }}>
              {isHigh
                ? "Our model detected indicators associated with cardiovascular disease. Please consult a healthcare professional for proper diagnosis and guidance."
                : "Your health indicators suggest a low risk of cardiovascular disease. Keep maintaining your healthy lifestyle habits!"}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="fade-up-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Risk Score", value: `${prob}%`, color: riskColor },
            { label: "BMI", value: (formData?.weight / ((formData?.height / 100) ** 2)).toFixed(1), color: "#2B6CB0" },
            { label: "Systolic BP", value: `${formData?.ap_hi} mmHg`, color: formData?.ap_hi > 140 ? "#C53030" : "#276749" },
            { label: "Diastolic BP", value: `${formData?.ap_lo} mmHg`, color: formData?.ap_lo > 90 ? "#C53030" : "#276749" },
          ].map(s => (
            <div key={s.label} style={{
              background: "#fff", borderRadius: "14px", padding: "20px",
              border: "1px solid #E2E8F0", textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}>
              <div style={{ fontSize: "12px", color: "#718096", marginBottom: "6px" }}>{s.label}</div>
              <div style={{ fontFamily: "Sora,sans-serif", fontSize: "22px", fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Charts: Input vs Normal */}
        <div className="fade-up-3" style={{
          background: "#fff", borderRadius: "16px", padding: "28px",
          border: "1px solid #E2E8F0", marginBottom: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: "17px", fontWeight: 700, marginBottom: "20px", color: "#1A202C" }}>
            📊 Your Values vs Normal Ranges
          </h3>
          {Object.entries(NORMAL).map(([key]) => formData?.[key] !== undefined && (
            <BarCompare key={key} name={key} value={formData[key]} />
          ))}
        </div>

        {/* Abnormal Values — Insights */}
        {abnormal.length > 0 && (
          <div className="fade-up-4" style={{
            background: "#FFF5F5", borderRadius: "16px", padding: "28px",
            border: "1px solid #FEB2B2", marginBottom: "24px"
          }}>
            <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: "17px", fontWeight: 700, marginBottom: "16px", color: "#C53030" }}>
              🧠 Why This Prediction Was Made
            </h3>
            <p style={{ color: "#718096", fontSize: "13px", marginBottom: "16px" }}>
              These factors in your profile contributed to the risk assessment:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {abnormal.map(([key, val]) => (
                <div key={key} style={{
                  background: "#fff", border: "1px solid #FEB2B2", borderRadius: "10px",
                  padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px"
                }}>
                  <span style={{ color: "#E53E3E", fontWeight: 700, fontSize: "16px" }}>⚠</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: "#C53030" }}>{LABELS[key] || key}</div>
                    <div style={{ fontSize: "12px", color: "#718096" }}>
                      {typeof val === "number" && NORMAL[key]
                        ? `${val} ${UNITS[key] || ""} (normal: ${NORMAL[key][0]}–${NORMAL[key][1]})`
                        : key === "smoke" ? "Smoker" : key === "alco" ? "Alcohol use" : key === "active" ? "Inactive" : `Level ${val}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="fade-up-5" style={{
          background: "#fff", borderRadius: "16px", padding: "28px",
          border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: "17px", fontWeight: 700, marginBottom: "20px", color: "#1A202C" }}>
            💡 Personalized Recommendations
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {(isHigh ? recommendations.high : recommendations.low).map(rec => (
              <div key={rec.title} style={{
                background: "#F7FAFC", borderRadius: "12px", padding: "16px",
                border: "1px solid #E2E8F0", display: "flex", gap: "12px", alignItems: "flex-start"
              }}>
                <span style={{ fontSize: "24px", flexShrink: 0 }}>{rec.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#1A202C", marginBottom: "4px" }}>{rec.title}</div>
                  <div style={{ fontSize: "12px", color: "#718096", lineHeight: 1.6 }}>{rec.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: "24px", background: "#EDF2F7", borderRadius: "12px",
          padding: "16px 20px", fontSize: "12px", color: "#718096", textAlign: "center"
        }}>
          ⚠️ This tool is for educational purposes only. It is not a medical diagnosis.
          Always consult a qualified healthcare professional for medical advice.
        </div>
      </div>
    </div>
  );
}