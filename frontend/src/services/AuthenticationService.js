import Api from "./Api";

const Services = {
  login(formData) {
    return Api().post("/auth/signin", formData);
  },
  requestForgotPasswordCode(formData) {
    return Api().post("/auth/forgetPassword/send-code", formData);
  },
  verifyForgotPasswordCode(formData) {
    return Api().post("/auth/forgetPassword/verify-email", formData);
  },
  changePassword(formData) {
    return Api().post("/auth/changePassword", formData);
  },
};

export default Services;
