import Main from "../components/Main";
import Header from "../components/Header";
import "../components/style.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Context from "../Context";

function AppPage() {
  let navigate = useNavigate();
  const { isLoggedIn } = useContext(Context);
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  
  return (
    <div className="h-100">
      <Header />
      <Main />
    </div>
  );
}

export default AppPage;
