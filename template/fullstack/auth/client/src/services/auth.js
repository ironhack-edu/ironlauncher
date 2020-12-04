import axios from "axios";

const authService = axios.create({
  baseUrl: REACT_APP_SERVER_URL,
});

export function signup(credentials) {
  return authService
    .post("/signup")
    .then((res) => {
      return {
        status: true,
        data: res.data,
      };
    })
    .catch((err) => {
      console.log(err.response);
      return {
        status: false,
        message: err.response.data.errorMessage,
      };
    });
}
