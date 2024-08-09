import axios from "axios";

const BASEURL = "http://localhost:5000/api/";

const Api = () => {
  return axios.create({
    baseURL: BASEURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to headers if available
    },
    // withCredentials: true, // Enable cookies for cross-origin requests
  });
};

export default Api;
