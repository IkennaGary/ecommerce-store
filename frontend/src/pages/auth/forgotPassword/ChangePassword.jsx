import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmType, setPasswordConfirmType] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const formData = {
      newPassword: password,
      email,
    };
    navigate("/recovery-success");
  };

  return (
    <div className="w-full h-screen bg-contain flex justify-end md:p-3 md:bg-[url('assets/images/authBg.jpg')]">
      <div className="w-full bg-background p-10 h-full flex flex-col justify-center items-center text-center md:max-w-xl md:rounded-xl md:p-0">
        <div className="max-w-sm">
          <div className="mb-10">
            <h1 className=" text-2xl font-subHeading2 text-green-800 mb-2 md:text-3xl">
              Change your password
            </h1>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full relative text-green-800 ">
              <input
                type={passwordType}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 relative border border-green-800 rounded-full p-4 mb-2 bg-background text-green-800 text-xs outline-none"
                placeholder="Enter your new password"
              />
              {passwordType === "password" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 absolute right-3 top-3 cursor-pointer"
                  onClick={() => setPasswordType("text")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 absolute right-3 top-3 cursor-pointer"
                  onClick={() => setPasswordType("password")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
            <div className="w-full relative text-green-800 ">
              <input
                type={passwordConfirmType}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-10 border border-green-800 rounded-full p-4 mb-2 bg-background text-green-800 text-xs outline-none"
                placeholder="Confirm password"
              />
              {passwordConfirmType === "password" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 absolute right-3 top-3 cursor-pointer"
                  onClick={() => setPasswordConfirmType("text")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 absolute right-3 top-3 cursor-pointer"
                  onClick={() => setPasswordConfirmType("password")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
            <button
              type="submit"
              className="mt-5 w-full h-10 bg-secondary flex justify-center items-center rounded-full text-background text-sm"
            >
              Change Password
            </button>
          </form>
          <div>
            <p className="mt-5 text-green-800 font-light text-xs">
              <span className="text-green-800 font-subHeading2">
                <Link to="/">Back to login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
