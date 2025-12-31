import { useState } from "react";

export default function ComplianceCheck() {
  const [answers, setAnswers] = useState({});

  function handleChange(question, value) {
    setAnswers({ ...answers, [question]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("User answers:", answers);
    alert("Compliance check submitted! (Results coming next)");
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Business Compliance Check</h1>
      <p>
        Answer a few quick questions to see if your business is compliant with
        key South African requirements.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Question 1 */}
        <label>
          <strong>Is your business officially registered?</strong>
          <select
            onChange={(e) =>
              handleChange("registered", e.target.value)
            }
            required
          >
            <option value="">Select one</option>
            <option value="yes">Yes, fully registered</option>
            <option value="no">No, not registered</option>
            <option value="progress">Registration in progress</option>
          </select>
        </label>

        <br /><br />

        {/* Question 2 */}
        <label>
          <strong>What type of business do you operate?</strong>
          <select
            onChange={(e) =>
              handleChange("businessType", e.target.value)
            }
            required
          >
            <option value="">Select one</option>
            <option value="sole">Sole Proprietor</option>
            <option value="pty">Private Company (Pty Ltd)</option>
            <option value="partnership">Partnership</option>
            <option value="npo">Non-Profit Organisation</option>
            <option value="unsure">Not sure</option>
          </select>
        </label>

        <br /><br />

        {/* Question 3 */}
        <label>
          <strong>Do you have employees?</strong>
          <select
            onChange={(e) =>
              handleChange("employees", e.target.value)
            }
            required
          >
            <option value="">Select one</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <br /><br />

        {/* Question 4 */}
        <label>
          <strong>Is your business registered with SARS?</strong>
          <select
            onChange={(e) =>
              handleChange("sars", e.target.value)
            }
            required
          >
            <option value="">Select one</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Not sure</option>
          </select>
        </label>

        <br /><br />

        {/* Question 5 */}
        <label>
          <strong>Do you submit your tax returns on time?</strong>
          <select
            onChange={(e) =>
              handleChange("taxReturns", e.target.value)
            }
            required
          >
            <option value="">Select one</option>
            <option value="yes">Yes, always</option>
            <option value="sometimes">Sometimes late</option>
            <option value="no">No</option>
          </select>
        </label>

        <br /><br />

        <button type="submit">
          View My Compliance Results
        </button>
      </form>
    </div>
  );
}
