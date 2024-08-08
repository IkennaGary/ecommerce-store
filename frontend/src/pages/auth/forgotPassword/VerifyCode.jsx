import CodeInput from "../../../components/CodeInput";
import { Link } from "react-router-dom";
import { useState } from "react";

const VerifyCode = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [code, setCode] = useState("");
  const handleComplete = (code) => {
    setCode(code);
    setIsDisabled(false);
  };

  return (
    <div className="w-full h-screen bg-contain flex justify-end md:p-3 md:bg-[url('assets/images/authBg.jpg')]">
      <div className="w-full bg-background p-10 h-full flex flex-col justify-center items-center text-center md:max-w-xl md:rounded-xl md:p-0">
        <div className="max-w-sm">
          <div className="mb-10">
            <h1 className=" text-2xl font-subHeading2 text-green-800 mb-2 md:text-3xl">
              Verify Email
            </h1>
            <p className="text-green-800 font-light text-sm">
              Input the verification code sent to your email address
            </p>
          </div>
          <form className="w-full">
            <div className="w-full">
              <CodeInput length={6} onComplete={handleComplete} />
            </div>
            <button
              type="submit"
              disabled={isDisabled}
              className="mt-5 w-full h-10 bg-secondary flex justify-center items-center rounded-full text-background text-sm disabled:bg-orange-300 disabled:cursor-auto"
            >
              Continue
            </button>
          </form>
          <div>
            <p className="mt-5 text-green-800 font-light text-xs">
              Didn't receive email?{" "}
              <span className="text-secondary font-subHeading2">
                Click here
              </span>
            </p>
          </div>
          <div>
            <p className="mt-5 text-green-800 font-light text-xs">
              <span className="text-green-800 font-subHeading2">
                <Link to="/login">Back to log in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
