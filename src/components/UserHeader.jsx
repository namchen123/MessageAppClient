import { useContext } from "react";
import userImage from "./images/user.png";
import Context from "../Context";
function UserHeader() {
  const {user} = useContext(Context)
  return (
    <div className="head d-flex rounded-1 border-bottom">
      <img
        className="rounded-2"
        src={userImage}
        style={{ width: 50, height: 50 }}
        alt=""
      />
      <div>
        <p className="UserName fs-5 fw-bold mt-2 mb-0">{user}</p>
      </div>
    </div>
  );
}

export default UserHeader;
