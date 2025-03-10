import React, { useState, useEffect, useRef } from "react";
import "../assets/css/login.css"; // For consistent styling
import "../assets/css/OTPInput.css"; //  A separate CSS file for OTP specific styling

function OTPInput({ length, onOTPComplete }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current.length !== length) {
      inputRefs.current = Array(length)
        .fill(null)
        .map(() => React.createRef());
    }
  }, [length]);

  useEffect(() => {
    // Call onOTPComplete when OTP is complete
    if (!otp.includes("") && onOTPComplete) {
      onOTPComplete(otp.join(""));
    }
  }, [otp, onOTPComplete]);

  const handleChange = (index, event) => {
    const value = event.target.value;

    // Only allow numeric input
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if a digit is entered
    if (value && index < length - 1 && inputRefs.current[index + 1].current) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1].current) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  return (
    <div className="otp-input-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className="otp-input"
          value={digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          ref={inputRefs.current[index]}
        />
      ))}
    </div>
  );
}

export default OTPInput;
