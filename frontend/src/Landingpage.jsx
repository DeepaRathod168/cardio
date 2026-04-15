import { useState } from "react";

const riskFactors = [
  {
    icon: "🫀",
    title: "High Blood Pressure",
    normal: "< 120/80 mmHg",
    danger: "> 140/90 mmHg",
    color: "#E53E3E",
    bg: "#FFF5F5",
    border: "#FEB2B2",
    desc: "Hypertension forces your heart to work harder, damaging arteries over time.",
  },
  {
    icon: "🧪",
    title: "Cholesterol",
    normal: "< 200 mg/dL",
    danger: "> 240 mg/dL",
    color: "#D69E2E",
    bg: "#FFFFF0",
    border: "#FAF089",
    desc: "High LDL cholesterol builds plaque in arteries, restricting blood flow.",
  },
  {
    icon: "🚬",
    title: "Smoking",
    normal: "Non-smoker",
    danger: "Any tobacco use",
    color: "#744210",
    bg: "#FFFAF0",
    border: "#FBD38D",
    desc: "Smoking damages blood vessels and dramatically increases clot risk.",
  },
  {
    icon: "⚖️",
    title: "Obesity",
    normal: "BMI 18.5–24.9",
    danger: "BMI > 30",
    color: "#2B6CB0",
    bg: "#EBF8FF",
    border: "#BEE3F8",
    desc: "Excess weight strains the heart and promotes high blood pressure.",
  },
  {
    icon: "🍬",
    title: "Diabetes / Glucose",
    normal: "70–99 mg/dL",
    danger: "> 126 mg/dL",
    color: "#6B46C1",
    bg: "#FAF5FF",
    border: "#D6BCFA",
    desc: "High blood sugar damages blood vessels and nerves controlling the heart.",
  },
  {
    icon: "🏃",
    title: "Physical Inactivity",
    normal: "150 min/week",
    danger: "< 60 min/week",
    color: "#276749",
    bg: "#F0FFF4",
    border: "#9AE6B4",
    desc: "Sedentary lifestyle weakens the heart muscle and promotes weight gain.",
  },
];

const riskLevels = [
  { label: "Low", color: "#276749", bg: "#C6F6D5", pct: 20 },
  { label: "Moderate", color: "#D69E2E", bg: "#FEFCBF", pct: 50 },
  { label: "High", color: "#C05621", bg: "#FEEBC8", pct: 75 },
  { label: "Critical", color: "#C53030", bg: "#FED7D7", pct: 95 },
];

export default function LandingPage({ onStart }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#F7FAFC" }}>
      {/* Navbar */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #E2E8F0",
        padding: "0 5%", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "64px",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 12px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>❤️</span>
          <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 700, fontSize: "18px", color: "#1A202C" }}>
            CardioCheck
          </span>
        </div>
        <button onClick={onStart} style={{
          background: "#E53E3E", color: "#fff", border: "none",
          padding: "10px 24px", borderRadius: "50px", fontWeight: 600,
          fontSize: "14px", cursor: "pointer", fontFamily: "Sora,sans-serif",
          transition: "all 0.2s", letterSpacing: "0.3px"
        }}
          onMouseOver={e => e.target.style.background = "#C53030"}
          onMouseOut={e => e.target.style.background = "#E53E3E"}
        >
          Check Your Risk →
        </button>
      </nav>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1A202C 0%, #2D3748 50%, #1A365D 100%)",
        padding: "80px 5% 100px", position: "relative", overflow: "hidden"
      }}>
        {/* Background decorations */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "rgba(229,62,62,0.08)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "10%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(66,153,225,0.06)", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)",
            borderRadius: "50px", padding: "6px 18px", marginBottom: "24px"
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E53E3E", animation: "pulse-ring 2s infinite", display: "inline-block" }} />
            <span style={{ color: "#FEB2B2", fontSize: "13px", fontWeight: 500 }}>AI-Powered Heart Risk Detection</span>
          </div>

          <h1 className="fade-up-2" style={{
            fontFamily: "Sora,sans-serif", fontSize: "clamp(32px,5vw,56px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "20px"
          }}>
            Predict & Prevent<br />
            <span style={{ color: "#FC8181" }}>Heart Disease</span> Early ❤️
          </h1>

          <p className="fade-up-3" style={{
            color: "#A0AEC0", fontSize: "18px", maxWidth: "600px",
            margin: "0 auto 36px", lineHeight: 1.7
          }}>
            Cardiovascular disease is the world's #1 killer — yet 80% of cases are preventable.
            Enter your health data and get an instant AI risk assessment in seconds.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onStart} style={{
              background: "#E53E3E", color: "#fff", border: "none",
              padding: "16px 40px", borderRadius: "50px", fontWeight: 700,
              fontSize: "16px", cursor: "pointer", fontFamily: "Sora,sans-serif",
              boxShadow: "0 8px 32px rgba(229,62,62,0.4)", transition: "all 0.2s",
              animation: "pulse-ring 3s infinite"
            }}
              onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(229,62,62,0.5)"; }}
              onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(229,62,62,0.4)"; }}
            >
              Check Your Risk Now →
            </button>
            <a href="#risk-factors" style={{
              background: "rgba(255,255,255,0.08)", color: "#E2E8F0",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "16px 32px", borderRadius: "50px", fontWeight: 500,
              fontSize: "15px", cursor: "pointer", textDecoration: "none",
              transition: "all 0.2s", display: "inline-block"
            }}>
              Learn More ↓
            </a>
          </div>

          {/* Stats row */}
          <div className="fade-up-5" style={{
            display: "flex", gap: "40px", justifyContent: "center",
            marginTop: "60px", flexWrap: "wrap"
          }}>
            {[["17.9M", "Deaths/year globally"], ["80%", "Cases preventable"], ["73%", "Model accuracy"], ["11", "Risk factors analyzed"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Sora,sans-serif", fontSize: "28px", fontWeight: 800, color: "#FC8181" }}>{val}</div>
                <div style={{ color: "#718096", fontSize: "13px", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Meter */}
      <section style={{ padding: "60px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "22px", fontWeight: 700, textAlign: "center", marginBottom: "8px", color: "#1A202C" }}>
            How Risk Is Measured
          </h2>
          <p style={{ textAlign: "center", color: "#718096", marginBottom: "32px", fontSize: "15px" }}>
            Our AI evaluates multiple health factors to place you on this scale
          </p>
          <div style={{ background: "#F7FAFC", borderRadius: "16px", padding: "32px" }}>
            <div style={{ display: "flex", height: "20px", borderRadius: "50px", overflow: "hidden", marginBottom: "12px" }}>
              {[["#48BB78", "33%"], ["#ECC94B", "25%"], ["#ED8936", "22%"], ["#E53E3E", "20%"]].map(([color, width], i) => (
                <div key={i} style={{ background: color, width, transition: "all 0.3s" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {riskLevels.map(({ label, color, bg, pct }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{
                    background: bg, color, border: `1px solid ${color}`,
                    borderRadius: "50px", padding: "4px 14px",
                    fontSize: "13px", fontWeight: 600, marginBottom: "4px"
                  }}>{label}</div>
                  <div style={{ fontSize: "12px", color: "#718096" }}>~{pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Factor Cards */}
      <section id="risk-factors" style={{ padding: "60px 5% 80px", background: "#F7FAFC" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "8px" }}>
            Know Your Risk Factors
          </h2>
          <p style={{ textAlign: "center", color: "#718096", marginBottom: "48px", fontSize: "15px" }}>
            Understanding these factors helps you take preventive action today
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {riskFactors.map((rf, i) => (
              <div key={rf.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === i ? rf.bg : "#fff",
                  border: `1.5px solid ${hovered === i ? rf.border : "#E2E8F0"}`,
                  borderRadius: "16px", padding: "24px",
                  transition: "all 0.25s ease",
                  transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hovered === i ? "0 12px 40px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
                  cursor: "default"
                }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{rf.icon}</div>
                <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: "17px", fontWeight: 700, color: "#1A202C", marginBottom: "8px" }}>
                  {rf.title}
                </h3>
                <p style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                  {rf.desc}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{
                    background: "#F0FFF4", color: "#276749", border: "1px solid #9AE6B4",
                    borderRadius: "50px", padding: "4px 12px", fontSize: "12px", fontWeight: 600
                  }}>✅ Normal: {rf.normal}</span>
                  <span style={{
                    background: "#FFF5F5", color: "#C53030", border: "1px solid #FEB2B2",
                    borderRadius: "50px", padding: "4px 12px", fontSize: "12px", fontWeight: 600
                  }}>⚠️ Danger: {rf.danger}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <button onClick={onStart} style={{
              background: "linear-gradient(135deg, #E53E3E, #C53030)",
              color: "#fff", border: "none", padding: "18px 48px",
              borderRadius: "50px", fontWeight: 700, fontSize: "17px",
              cursor: "pointer", fontFamily: "Sora,sans-serif",
              boxShadow: "0 8px 32px rgba(229,62,62,0.35)", transition: "all 0.2s"
            }}
              onMouseOver={e => e.target.style.transform = "translateY(-3px)"}
              onMouseOut={e => e.target.style.transform = "translateY(0)"}
            >
              ❤️ Check Your Risk Now — It's Free
            </button>
            <p style={{ color: "#A0AEC0", fontSize: "13px", marginTop: "12px" }}>
              Takes less than 2 minutes · No account required
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1A202C", padding: "24px 5%", textAlign: "center" }}>
        <p style={{ color: "#4A5568", fontSize: "13px" }}>
          ❤️ CardioCheck · Built with Gradient Boosting ML · For educational purposes only · Always consult a doctor
        </p>
      </footer>
    </div>
  );
}