import Main from "../components/Main";
import Header from "../components/Header";
import "../components/style.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Context from "../Context";
import { jwtDecode } from "jwt-decode";

function AppPage() {
  let navigate = useNavigate();
  const [friend, setFriend] = useState(false);
  const [decode, setDecode] = useState(null);
  const { isLoggedIn } = useContext(Context);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    } else if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(token);
      setDecode(decoded);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="h-100">
      <Header decode={decode} setFriend={setFriend} />
      <Main decode={decode} setDecode={setDecode} friend={friend} />
    </div>
  );
}

export default AppPage;
