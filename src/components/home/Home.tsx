import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  email: string;
  name: string;
  picture: string;
  exp: number;
}

const Home = () => {
  const token = Cookies.get("token");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    return;
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          Cookies.remove("token");
          navigate("/login");
          return;
        }

        setEmail(decodedToken.email);
        setName(decodedToken.name);
        setImgUrl(decodedToken.picture || null);
      } catch (error) {
        console.error("Error decoding the token", error);
        setError("Invalid token. Please log in again.");
      }
    } else {
      navigate("/login");
      return;
    }
  }, [navigate, token]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>Hello {name}</h1>
          <div>
            {imgUrl ? (
              <img src={imgUrl} alt="profile" />
            ) : (
              <p>No profile image available</p>
            )}
            <p>{email}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
