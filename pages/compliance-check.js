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

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>BizAid Compliance Check</h1>
      <p>Answer a few questions to see if your business is compliant.</p>

      {!showResults && (
        <form onSubmit={handleSubmit}>
          <p><strong>Are you registered with CIPC?</strong></p>
          <label>
            <input
              type="radio"
              name="cipc"
              value="yes"
              onChange={() => handleChange("cipc", "yes")}
              required
            />{" "}
            Yes
          </label>{" "}
          <label>
            <input
              type="radio"
              name="cipc"
              value="no"
              onChange={() => handleChange("cipc", "no")}
            />{" "}
            No
          </label>

          <p><strong>Do you have a business bank account?</strong></p>
          <label>
            <input
              type="radio"
              name="bank"
              value="yes"
              onChange={() => handleChange("bank", "yes")}
              required
            />{" "}
            Yes
          </label>{" "}
          <label>
            <input
              type="radio"
              name="bank"
              value="no"
              onChange={() => handleChange("bank", "no")}
            />{" "}
            No
          </label>

          <p><strong>Are you registered with SARS?</strong></p>
          <label>
            <input
              type="radio"
              name="sars"
              value="yes"
              onChange={() => handleChange("sars", "yes")}
              required
            />{" "}
            Yes
          </label>{" "}
          <label>
            <input
              type="radio"
              name="sars"
              value="no"
              onChange={() => handleChange("sars", "no")}
            />{" "}
            No
          </label>

          <p><strong>Do you submit tax returns (even nil returns)?</strong></p>
          <label>
            <input
              type="radio"
              name="tax"
              value="yes"
              onChange={() => handleChange("tax", "yes")}
              required
            />{" "}
            Yes
          </label>{" "}
          <label>
            <input
              type="radio"
              name="tax"
              value="no"
              onChange={() => handleChange("tax", "no")}
            />{" "}
            No
          </label>

          <p><strong>Do you keep records of income & expenses?</strong></p>
          <label>
            <input
              type="radio"
              name="records"
              value="yes"
              onChange={() => handleChange("records", "yes")}
              required
            />{" "}
            Yes
          </label>{" "}
          <label>
            <input
              type="radio"
              name="records"
              value="no"
              onChange={() => handleChange("records", "no")}
            />{" "}
            No
          </label>

          <br /><br />

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
            {compliant.length > 0 ? (
              compliant.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>None yet</li>
            )}
          </ul>

          <h3 style={{ color: "red" }}>❌ You still need to:</h3>
          <ul>
            {missing.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginTop: "30px",
            }}
          >
            <h3>Next step:</h3>
            <p>
              BizAid can guide you step-by-step to fix these items.
            </p>

            <hr style={{ margin: "20px 0" }} />

            <h4>Get your compliance plan by email</h4>
            <p>
              Enter your email and BizAid will send you a personalised compliance plan.
            </p>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                maxWidth: "300px",
                marginBottom: "10px",
              }}
            />

            <br />

            <button
              disabled={!email}
              onClick={() => setEmailSubmitted(true)}
              style={{
                padding: "10px 20px",
                opacity: email ? 1 : 0.5,
                cursor: email ? "pointer" : "not-allowed",
              }}
            >
              Get My Compliance Plan
            </button>

            {emailSubmitted && (
              <p style={{ color: "green", marginTop: "10px" }}>
                ✅ Thanks! Your compliance plan will be sent to {email}.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
