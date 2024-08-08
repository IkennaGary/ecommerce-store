import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CodeInput from "../../../components/CodeInput";
import CountdownTimer from "../../../utils/CountdownTImer";
import toast from "react-hot-toast";

const VerifyCode = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [code, setCode] = useState("");
  const [isCountingdown, setIsCountingdown] = useState(true);
  const navigate = useNavigate();
  const { email } = useParams();

  const handleComplete = (code) => {
    setCode(code);
  };

  const handleResendCode = () => {
    setIsCountingdown(true);
    toast.success(`Verification code sent to ${email}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/change-password/${email}`);
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
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              <CodeInput
                length={6}
                onComplete={handleComplete}
                setIsDisabled={setIsDisabled}
              />
            </div>
            <div className=" text-right mt-3 text-gray-800 font-subHeading2">
              <span className="font-light text-xs">
                {isCountingdown ? (
                  "Resend code in"
                ) : (
                  <button
                    className="text-secondary font-subHeading2"
                    onClick={handleResendCode}
                  >
                    Resend code
                  </button>
                )}
              </span>{" "}
              {isCountingdown && (
                <CountdownTimer
                  initialMinutes={1}
                  initialSeconds={0}
                  setIsCountingdown={setIsCountingdown}
                />
              )}
            </div>
            <button
              type="submit"
              disabled={isDisabled}
              className="mt-5 w-full h-10 bg-secondary flex justify-center items-center rounded-full text-background text-sm disabled:bg-orange-200 disabled:cursor-auto"
            >
              Continue
            </button>
          </form>
          <div>
            <p className="mt-5 text-green-800 font-light text-xs">
              <span className="text-green-800 font-subHeading2">
                <Link to="/">Back to log in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
