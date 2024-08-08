import { Link } from "react-router-dom";
import SuccessImg from "../../../assets/images/success-tick.gif";

const RecoverySuccess = () => {
  return (
    <div className="w-full h-screen bg-contain flex justify-end md:p-3 md:bg-[url('assets/images/authBg.jpg')]">
      <div className="w-full bg-white p-10 h-full flex flex-col justify-center items-center text-center md:max-w-xl md:rounded-xl md:p-0">
        <div className="max-w-sm">
          <div className="mb-10">
            <div className="flex items-center justify-center mb-10">
              <img src={SuccessImg} alt="success-gif" className="w-1/2" />
            </div>
            <p className="text-green-800 font-light text-sm">
              You have successfully reset your password, click on{" "}
              <span className="font-subHeading2">"Go to Log in"</span> to log
              in.
            </p>
          </div>
          <Link
            to="/"
            className="mt-5 w-full h-10 bg-secondary flex justify-center items-center rounded-full text-background text-sm"
          >
            Go to Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecoverySuccess;
