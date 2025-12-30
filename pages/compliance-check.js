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

  const handleChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
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
      ? compliant.push("Record keeping")
      : missing.push("Set up basic bookkeeping");
  }

  const status =
    missing.length === 0
      ? "You are mostly compliant 🎉"
      : missing.length <= 2
      ? "You are partially compliant"
      : "You are not compliant yet";

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>BizAid Compliance Check</h1>
      <p>Answer a few questions to see if your business is compliant.</p>

      {!showResults && (
        <>
          <Question
            label="Are you registered with CIPC?"
            onChange={(v) => handleChange("cipc", v)}
          />
          <Question
            label="Do you have a business bank account?"
            onChange={(v) => handleChange("bank", v)}
          />
          <Question
            label="Are you registered with SARS?"
            onChange={(v) => handleChange("sars", v)}
          />
          <Question
            label="Do you submit tax returns (even nil returns)?"
            onChange={(v) => handleChange("tax", v)}
          />
          <Question
            label="Do you keep records of income & expenses?"
            onChange={(v) => handleChange("records", v)}
          />

          <button
            onClick={() => setShowResults(true)}
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            Check My Compliance
          </button>
        </>
      )}

      {showResults && (
        <>
          <h2>{status}</h2>

          <h3>✅ You are compliant with:</h3>
          <ul>
            {compliant.length > 0 ? (
              compliant.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>None yet</li>
            )}
          </ul>

          <h3>❌ You still need to:</h3>
          <ul>
            {missing.length > 0 ? (
              missing.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>Nothing — great job!</li>
            )}
          </ul>

          <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #ddd" }}>
            <strong>Next step:</strong>
            <p>
              BizAid can guide you step-by-step to fix these items.
            </p>
            <button style={{ padding: "10px 20px" }}>
              Get My Compliance Plan
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Question({ label, onChange }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <p>{label}</p>
      <label>
        <input
          type="radio"
          name={label}
          onChange={() => onChange("yes")}
        />{" "}
        Yes
      </label>{" "}
      <label>
        <input
          type="radio"
          name={label}
          onChange={() => onChange("no")}
        />{" "}
        No
      </label>
    </div>
  );
}
