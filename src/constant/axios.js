import Axios from "axios";

 let user = JSON.parse(localStorage.getItem('user'))

const instance = Axios.create({
  baseURL: "https://c-mediate-backend.herokuapp.com/api",
  headers: {
    authorization: `Bearer ${user ? user.token : ""}`,
  },
});

export default instance;
 