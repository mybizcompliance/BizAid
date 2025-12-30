export default function Home() {
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>BizAid</h1>
      <p>
        Welcome to BizAid. Check if your business is compliant in under 2 minutes.
      </p>

      <a href="/compliance-check">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Start Compliance Check
        </button>
      </a>
    </div>
  );
}
