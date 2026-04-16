import { useState, useEffect } from "react";

const riskFactors = [
  { icon: "🫀", title: "High Blood Pressure", normal: "< 120/80 mmHg", danger: "> 140/90 mmHg", color: "#E53E3E", bg: "linear-gradient(135deg, #FFF5F5, #FED7D7)", border: "#FC8181", desc: "Hypertension forces your heart to work harder, damaging arteries over time." },
  { icon: "🧪", title: "Cholesterol", normal: "< 200 mg/dL", danger: "> 240 mg/dL", color: "#D69E2E", bg: "linear-gradient(135deg, #FFFFF0, #FEFCBF)", border: "#ECC94B", desc: "High LDL cholesterol builds plaque in arteries, restricting blood flow." },
  { icon: "🚬", title: "Smoking", normal: "Non-smoker", danger: "Any tobacco use", color: "#C05621", bg: "linear-gradient(135deg, #FFFAF0, #FEEBC8)", border: "#FBD38D", desc: "Smoking damages blood vessels and dramatically increases clot risk." },
  { icon: "⚖️", title: "Obesity", normal: "BMI 18.5–24.9", danger: "BMI > 30", color: "#2B6CB0", bg: "linear-gradient(135deg, #EBF8FF, #BEE3F8)", border: "#63B3ED", desc: "Excess weight strains the heart and promotes high blood pressure." },
  { icon: "🍬", title: "Diabetes / Glucose", normal: "70–99 mg/dL", danger: "> 126 mg/dL", color: "#6B46C1", bg: "linear-gradient(135deg, #FAF5FF, #E9D8FD)", border: "#B794F4", desc: "High blood sugar damages blood vessels and nerves controlling the heart." },
  { icon: "🏃", title: "Physical Inactivity", normal: "150 min/week", danger: "< 60 min/week", color: "#276749", bg: "linear-gradient(135deg, #F0FFF4, #C6F6D5)", border: "#68D391", desc: "Sedentary lifestyle weakens the heart muscle and promotes weight gain." },
];

const stats = [
  { val: "17.9M", label: "Deaths/year globally", icon: "💔" },
  { val: "80%", label: "Cases preventable", icon: "🛡️" },
  { val: "73%", label: "Model accuracy", icon: "🤖" },
  { val: "11", label: "Risk factors analyzed", icon: "🔬" },
];

export default function LandingPage({ onStart }) {
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", width: "100vw", overflowX: "hidden" }}>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(10,15,30,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        padding: "0 6%", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "70px",
        transition: "all 0.3s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #E53E3E, #FC8181)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(229,62,62,0.4)" }}>❤️</div>
          <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", letterSpacing: "-0.5px" }}>Cardio<span style={{ color: "#FC8181" }}>Check</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="#risk-factors" style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500, textDecoration: "none", padding: "8px 16px", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#fff"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.6)"}>Risk Factors</a>
          <button onClick={onStart} style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "Sora,sans-serif", boxShadow: "0 4px 20px rgba(229,62,62,0.4)", transition: "all 0.2s" }} onMouseOver={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 8px 28px rgba(229,62,62,0.5)"; }} onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(229,62,62,0.4)"; }}>Check Your Risk →</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", width: "100%", background: "linear-gradient(135deg, #0A0F1E 0%, #0D1B2A 40%, #1A0A0A 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 6% 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(229,62,62,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(66,153,225,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(229,62,62,0.12)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: "50px", padding: "8px 20px", marginBottom: "28px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E53E3E", display: "inline-block", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
          <span style={{ color: "#FC8181", fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px" }}>AI-Powered Heart Risk Detection</span>
        </div>

        <h1 className="fade-up-2" style={{ fontFamily: "Sora,sans-serif", fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, textAlign: "center", marginBottom: "24px", letterSpacing: "-2px", maxWidth: "900px" }}>
          Predict & Prevent<br />
          <span style={{ background: "linear-gradient(135deg, #FC8181, #E53E3E, #C53030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Heart Disease</span>{" "}
          <span style={{ display: "inline-block", animation: "heartbeat 1.5s ease infinite" }}>❤️</span>
          <br />Early
        </h1>

        <p className="fade-up-3" style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(16px,2vw,20px)", maxWidth: "620px", margin: "0 auto 44px", lineHeight: 1.75, textAlign: "center" }}>
          Cardiovascular disease is the world's <strong style={{ color: "rgba(255,255,255,0.8)" }}>#1 killer</strong> — yet <strong style={{ color: "#68D391" }}>80% of cases are preventable</strong>. Get your AI risk assessment in under 2 minutes.
        </p>

        <div className="fade-up-4" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "72px" }}>
          <button onClick={onStart} style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", color: "#fff", border: "none", padding: "18px 48px", borderRadius: "50px", fontWeight: 800, fontSize: "17px", cursor: "pointer", fontFamily: "Sora,sans-serif", boxShadow: "0 8px 40px rgba(229,62,62,0.45)", transition: "all 0.25s" }} onMouseOver={e => { e.target.style.transform = "translateY(-3px) scale(1.02)"; e.target.style.boxShadow = "0 16px 48px rgba(229,62,62,0.55)"; }} onMouseOut={e => { e.target.style.transform = "translateY(0) scale(1)"; e.target.style.boxShadow = "0 8px 40px rgba(229,62,62,0.45)"; }}>❤️ Check Your Risk — Free</button>
          <a href="#risk-factors" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)", padding: "18px 36px", borderRadius: "50px", fontWeight: 600, fontSize: "16px", cursor: "pointer", textDecoration: "none", transition: "all 0.2s", display: "inline-flex", alignItems: "center", backdropFilter: "blur(10px)" }} onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>Learn More ↓</a>
        </div>

        <div className="fade-up-5" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", maxWidth: "800px", width: "100%" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ flex: "1", minWidth: "160px", padding: "28px 24px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{s.icon}</div>
              <div style={{ fontFamily: "Sora,sans-serif", fontSize: "28px", fontWeight: 900, color: "#FC8181", marginBottom: "4px" }}>{s.val}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", animation: "bounce 2s ease infinite" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "2px" }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </section>

      {/* Risk Meter */}
      <section style={{ padding: "80px 6%", width: "100%", background: "linear-gradient(180deg, #0D1B2A 0%, #0F172A 100%)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", marginBottom: "12px", letterSpacing: "-1px" }}>How Risk Is <span style={{ color: "#FC8181" }}>Measured</span></h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px" }}>Our AI evaluates multiple health factors to place you on this risk scale</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px", backdropFilter: "blur(20px)" }}>
            <div style={{ height: "16px", borderRadius: "50px", marginBottom: "24px", background: "linear-gradient(90deg, #48BB78 0%, #ECC94B 40%, #ED8936 70%, #E53E3E 100%)", boxShadow: "0 4px 20px rgba(229,62,62,0.3)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {[{ label: "Low Risk", range: "0–35%", color: "#48BB78", bg: "rgba(72,187,120,0.1)", border: "rgba(72,187,120,0.3)" }, { label: "Moderate", range: "35–55%", color: "#ECC94B", bg: "rgba(236,201,75,0.1)", border: "rgba(236,201,75,0.3)" }, { label: "High Risk", range: "55–75%", color: "#ED8936", bg: "rgba(237,137,54,0.1)", border: "rgba(237,137,54,0.3)" }, { label: "Critical", range: "75–100%", color: "#E53E3E", bg: "rgba(229,62,62,0.1)", border: "rgba(229,62,62,0.3)" }].map(r => (
                <div key={r.label} style={{ background: r.bg, border: `1px solid ${r.border}`, borderRadius: "14px", padding: "16px", textAlign: "center" }}>
                  <div style={{ color: r.color, fontWeight: 800, fontSize: "15px", fontFamily: "Sora,sans-serif", marginBottom: "4px" }}>{r.label}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{r.range}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Factor Cards */}
      <section id="risk-factors" style={{ padding: "80px 6% 100px", background: "#0A0F1E", width: "100%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ display: "inline-block", background: "rgba(229,62,62,0.1)", border: "1px solid rgba(229,62,62,0.25)", borderRadius: "50px", padding: "6px 18px", marginBottom: "16px" }}>
              <span style={{ color: "#FC8181", fontSize: "13px", fontWeight: 600 }}>⚕️ Medical Awareness</span>
            </div>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#fff", marginBottom: "12px", letterSpacing: "-1px" }}>Know Your <span style={{ color: "#FC8181" }}>Risk Factors</span></h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>Understanding these factors helps you take preventive action today</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
            {riskFactors.map((rf, i) => (
              <div key={rf.title} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ background: hovered === i ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${hovered === i ? rf.border + "80" : "rgba(255,255,255,0.08)"}`, borderRadius: "20px", padding: "28px", transition: "all 0.3s ease", transform: hovered === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered === i ? `0 20px 60px rgba(0,0,0,0.3)` : "none", cursor: "default", backdropFilter: "blur(10px)" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: rf.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", marginBottom: "16px", border: `1px solid ${rf.border}40` }}>{rf.icon}</div>
                <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>{rf.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>{rf.desc}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(72,187,120,0.1)", color: "#68D391", border: "1px solid rgba(72,187,120,0.3)", borderRadius: "50px", padding: "5px 14px", fontSize: "12px", fontWeight: 600 }}>✅ {rf.normal}</span>
                  <span style={{ background: "rgba(229,62,62,0.1)", color: "#FC8181", border: "1px solid rgba(229,62,62,0.3)", borderRadius: "50px", padding: "5px 14px", fontSize: "12px", fontWeight: 600 }}>⚠️ {rf.danger}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "72px", textAlign: "center", background: "linear-gradient(135deg, rgba(229,62,62,0.1), rgba(197,48,48,0.05))", border: "1px solid rgba(229,62,62,0.2)", borderRadius: "28px", padding: "56px 40px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>❤️</div>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#fff", marginBottom: "12px", letterSpacing: "-0.5px" }}>Ready to Check Your Heart Health?</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", marginBottom: "32px", maxWidth: "480px", margin: "0 auto 32px" }}>Takes less than 2 minutes · AI-powered · No account required</p>
            <button onClick={onStart} style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", color: "#fff", border: "none", padding: "20px 56px", borderRadius: "50px", fontWeight: 800, fontSize: "18px", cursor: "pointer", fontFamily: "Sora,sans-serif", boxShadow: "0 8px 40px rgba(229,62,62,0.4)", transition: "all 0.25s" }} onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 16px 50px rgba(229,62,62,0.55)"; }} onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 40px rgba(229,62,62,0.4)"; }}>Get My Free Risk Assessment →</button>
          </div>
        </div>
      </section>

      <footer style={{ background: "#060A14", padding: "28px 6%", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>❤️</span>
          <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>CardioCheck</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", textAlign: "center" }}>For educational purposes only · Always consult a doctor · Built with Gradient Boosting ML</p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>© 2026 CardioCheck</p>
      </footer>

      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.2); } 28% { transform: scale(1); } 42% { transform: scale(1.15); } 56% { transform: scale(1); } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
      `}</style>
    </div>
  );
}