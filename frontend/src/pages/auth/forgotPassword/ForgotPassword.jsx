import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send email with verification code
    toast.success("Code has been sent to your email");
    // Redirect to verify code page
    Navigate("/verify-code");
  };
  return (
    <div className="w-full h-screen bg-contain flex justify-end md:p-3 md:bg-[url('assets/images/authBg.jpg')]">
      <div className="w-full bg-background p-10 h-full flex flex-col justify-center items-center text-center md:max-w-xl md:rounded-xl md:p-0">
        <div className="max-w-sm">
          <div className="mb-10">
            <h1 className=" text-2xl font-subHeading2 text-green-800 mb-2 md:text-3xl">
              Forgot password?
            </h1>
            <p className="text-green-800 font-light text-sm">
              No worries, we'll send a code to your email to verify your
              account.
            </p>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 border border-green-800 rounded-full p-4 mb-2 bg-background text-green-800 text-xs outline-none"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full h-10 bg-secondary flex justify-center items-center rounded-full text-background text-sm"
            >
              Reset Password
            </button>
          </form>
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

export default ForgotPassword;
