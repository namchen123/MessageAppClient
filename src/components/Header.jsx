import "./style.css";
import userImage from "./images/user.png";
import Context from "../Context"
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
function Header() {
  const {isLoggedIn, setIsLoggedIn} = useContext(Context);
  let navigate = useNavigate();

  function Logout() {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate(-1)
  }

  return (
    <div id="header" class="border-bottom d-flex justify-content-between">
      <div className="mt-auto mb-auto">
        <button className="btn btn-primary" onClick={()=>Logout()}>Đăng xuất</button>
      </div>
      
      <div class="d-flex rounded-1">
        <img
          class="rounded-2"
          src={userImage}
          style={{ width: "70px", height: "70px" }}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
