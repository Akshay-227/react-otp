import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combineOtp = newOtp.join("");
    if (combineOtp.length === length) {
      onOtpSubmit(combineOtp);
    }

    const nextEmptyIndex = newOtp.indexOf("");
    if (value && nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    const backspaceKey = "Backspace";
    if (e.key === backspaceKey && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((val, index) => (
        <input
          ref={(input) => (inputRefs.current[index] = input)}
          className="otpInput"
          key={index}
          type="text"
          value={val}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
