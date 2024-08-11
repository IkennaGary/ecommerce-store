import Api from "./Api";

const Services = {
  getCurrentUser() {
    return Api().get("/user/current-user");
  },
};

export default Services;
