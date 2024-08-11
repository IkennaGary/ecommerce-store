// src/CodeInput.js
import React, { useRef, useState } from "react";

const CodeInput = ({ length, onComplete, setIsDisabled }) => {
  const [code, setCode] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newCode = [...code];

    // Ensure only digits are allowed
    newCode[index] = value;
    setCode(newCode);

    // Move to next input field if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Trigger onComplete if all fields are filled
    if (newCode.every((char) => char !== "")) {
      onComplete(newCode.join(""));
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // if (/^[0-9]?$/.test(value)) {
    // }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const newCode = pasteData.split("").slice(0, length);
    setCode(newCode);

    newCode.forEach((char, index) => {
      if (index < length) {
        inputRefs.current[index].value = char;
        if (index === length - 1) {
          inputRefs.current[index].focus();
        }
      }
    });

    // Move focus to last field and trigger onComplete if all fields are filled
    if (newCode.length === length) {
      onComplete(newCode.join(""));
      setIsDisabled(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex space-x-2 justify-between">
      {code.map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          className="w-12 h-12 text-center border rounded focus:outline-none focus:border-green-800 focus:ring-1 focus:ring-green-800"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : null} // Only handle paste on the first input
        />
      ))}
    </div>
  );
};

export default CodeInput;
