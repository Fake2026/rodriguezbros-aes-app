import React, { useState } from "react";
import CryptoJS from "crypto-js";

function App() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [result, setResult] = useState("");

  const encryptMessage = (message, password) => {
    return CryptoJS.AES.encrypt(message, password).toString();
  };

  const decryptMessage = (ciphertext, password) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, password);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) throw new Error("Empty result");
      return decrypted;
    } catch (error) {
      return "❌ Incorrect password or corrupted data.";
    }
  };

  const handleRun = () => {
    if (!text || !password) {
      alert("Please fill out both fields.");
      return;
    }

    const output =
      mode === "encrypt"
        ? encryptMessage(text, password)
        : decryptMessage(text, password);

    setResult(output);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#1e1e2f",
        padding: "30px",
        borderRadius: "12px",
        color: "#f9f9f9",
        boxShadow: "0 0 30px rgba(0,0,0,0.3)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#00e676" }}>RodriguezBros 🔐 AES Encryptor</h1>

      <p style={{ textAlign: "center", fontStyle: "italic", marginBottom: "20px" }}>
        Secure your secrets with style.
      </p>

      <input
        placeholder="Enter message or encrypted text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "16px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
        <button
          onClick={() => setMode("encrypt")}
          style={{
            marginRight: "12px",
            backgroundColor: mode === "encrypt" ? "#00c853" : "#555",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Encrypt
        </button>
        <button
          onClick={() => setMode("decrypt")}
          style={{
            backgroundColor: mode === "decrypt" ? "#2962ff" : "#555",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Decrypt
        </button>
      </div>

      <button
        onClick={handleRun}
        style={{
          padding: "12px",
          width: "100%",
          backgroundColor: "#ff9100",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Run
      </button>

      {result && (
        <div
          style={{
            marginTop: "24px",
            background: "#333",
            padding: "16px",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <h3>Result:</h3>
          <p style={{ wordBreak: "break-word" }}>{result}</p>
        </div>
      )}

      <footer style={{ textAlign: "center", marginTop: "30px", fontSize: "0.9em", opacity: 0.6 }}>
        &copy; 2025 RodriguezBros • Built with 🔐 & ❤️
      </footer>
    </div>
  );
}

export default App;
