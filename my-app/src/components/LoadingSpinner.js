// src/components/LoadingSpinner.js

import React, { useEffect } from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {

  // Inject animation only once
  useEffect(() => {

    if (!document.getElementById("loading-spinner-animation")) {

      const style = document.createElement("style");

      style.id = "loading-spinner-animation";

      style.innerHTML = `
        @keyframes spinnerRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `;

      document.head.appendChild(style);
    }

  }, []);

  const styles = {

    container: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px", width: "100%", minHeight: "200px", },

    spinner: { width: "60px", height: "60px", border: "6px solid #f3f3f3", borderTop: "6px solid #ec4899", borderRadius: "50%", animation: "spinnerRotate 1s linear infinite", marginBottom: "20px",},

    text: { fontSize: "18px", color: "#555", fontWeight: "500", letterSpacing: "0.5px", },

  };

  return (

    <div style={styles.container}>

      <div style={styles.spinner}></div>

      <p style={styles.text}>
        {message}
      </p>

    </div>

  );

};

export default LoadingSpinner;