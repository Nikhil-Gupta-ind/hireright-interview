import React from "react";

const HRGradient = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "-310px",
        left: 0,
        width: "100%",
        height: "300px",
        filter: "blur(100px)",
        background: "linear-gradient(270deg, #FFA897, #E4B8FF, #FFE2C6)",
        pointerEvents: "none", // important: don’t block UI interactions
        zIndex: 0
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          height: "44px",
          borderRadius: "400px",
          background: "linear-gradient(90deg, #FFA897, #E4B8FF, #FFE2C6)",
        }}
      />
    </div>
  );
};

export default HRGradient;
