import React from "react";
import { motion } from "framer-motion";

const HRGradient = () => {
  return (
    <motion.div
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{
        position: "absolute",
        bottom: "-310px",
        left: 0,
        width: "100%",
        height: "300px",
        filter: "blur(100px)",
        background: "linear-gradient(270deg, #FFA897, #E4B8FF, #FFE2C6)",
        backgroundSize: "400% 400%",
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
    </motion.div>
  );
};

export default HRGradient;
