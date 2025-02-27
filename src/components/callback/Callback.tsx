import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstant from "../../utils/axios";
import Cookies from "js-cookie";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const authCode = searchParams.get("code");

  useEffect(() => {
    const oAuth = async () => {
      try {
        if (authCode) {
          const response: AxiosResponse = await axiosInstant.post(
            "/v1/users/oauth",
            {
              code: authCode,
            }
          );
          if (response) {
            const { data } = response;
            Cookies.set("token", data.data);
            navigate("/");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    oAuth();
  }, [authCode, navigate]);

  return <div></div>;
};

export default Callback;
