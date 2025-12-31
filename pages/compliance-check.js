import { useState } from "react";

export default function ComplianceCheck() {
  const [answers, setAnswers] = useState({
    cipc: "",
    bank: "",
    sars: "",
    tax: "",
    records: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const compliant = [];
  const missing = [];

  if (showResults) {
    answers.cipc === "yes"
      ? compliant.push("CIPC registration")
      : missing.push("Register with CIPC");

    answers.bank === "yes"
      ? compliant.push("Business bank account")
      : missing.push("Open a business bank account");

    answers.sars === "yes"
      ? compliant.push("SARS registration")
      : missing.push("Register with SARS");

    answers.tax === "yes"
      ? compliant.push("Tax submissions")
      : missing.push("Submit tax returns (even nil returns)");

    answers.records === "yes"
      ? compliant.push("Basic bookkeeping")
      : missing.push("Set up basic bookkeeping");
  }

  const submitEmail = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers,
          compliant,
          missing,
        }),
      });

      if (res.ok) {
        setEmailSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>BizAid Compliance Check</h1>
      <p>Answer a few questions to see if your business is compliant.</p>

      {!showResults && (
        <form onSubmit={handleSubmit}>
          {[
            ["cipc", "Are you registered with CIPC?"],
            ["bank", "Do you have a business bank account?"],
            ["sars", "Are you registered with SARS?"],
            ["tax", "Do you submit tax returns (even nil returns)?"],
            ["records", "Do you keep records of income & expenses?"],
          ].map(([key, label]) => (
            <div key={key}>
              <p><strong>{label}</strong></p>
              <label>
                <input
                  type="radio"
                  name={key}
                  value="yes"
                  onChange={() => handleChange(key, "yes")}
                  required
                />{" "}
                Yes
              </label>{" "}
              <label>
                <input
                  type="radio"
                  name={key}
                  value="no"
                  onChange={() => handleChange(key, "no")}
                />{" "}
                No
              </label>
            </div>
          ))}

          <br />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Check My Compliance
          </button>
        </form>
      )}

      {showResults && (
        <div>
          <h2>
            {missing.length === 0
              ? "🎉 You are compliant"
              : "❌ You are not compliant yet"}
          </h2>

          <h3 style={{ color: "green" }}>✅ You are compliant with:</h3>
          <ul>
            {compliant.length ? compliant.map((i, idx) => <li key={idx}>{i}</li>) : <li>None yet</li>}
          </ul>

          <h3 style={{ color: "red" }}>❌ You still need to:</h3>
          <ul>
            {missing.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>

          <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "30px" }}>
            <h3>Next step</h3>
            <p>Get your personalised compliance plan by email.</p>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "10px", width: "100%", maxWidth: "300px" }}
            />

            <br /><br />

            <button
              disabled={!email || loading}
              onClick={submitEmail}
              style={{ padding: "10px 20px" }}
            >
              {loading ? "Sending..." : "Get My Compliance Plan"}
            </button>

            {emailSubmitted && (
              <p style={{ color: "green", marginTop: "10px" }}>
                ✅ Success! Check your email soon.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
