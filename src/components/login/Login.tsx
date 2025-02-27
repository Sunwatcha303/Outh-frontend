import { AxiosResponse } from "axios";
import axiosInstant from "../../utils/axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response: AxiosResponse = await axiosInstant.get("/v1/users/login");
      if (response) {
        const { data } = response.data;
        window.location.href = data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const authentication = async () => {
      try {
        const response: AxiosResponse = await axiosInstant.get(
          "/v1/users/authentication",
          { withCredentials: true }
        );
        if (response) {
          Cookies.set("token", response.data.data);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      authentication();
    } else {
      navigate("/login");
    }
  }, [navigate, token]);
  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Google</button>
    </div>
  );
};

export default Login;
