import { useContext, useEffect, useRef } from "react";
import userImage from "./images/user.png";
import Context from "../Context";
function UserHeader() {
<<<<<<< HEAD
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
=======
  const {
    user,
    searchmessage,
    setSearchMessage,
    connection,
    decode,
    receiverId,
    setIsCalling,
    setCallingId,
    setPeerConnection,
    SendOffer
  } = useContext(Context);

  

  return (
    <div className="head d-flex justify-content-between rounded-1 border-bottom">
      <div className="d-flex">
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
      <div className="mt-2">
        <button className="btn btn-outline-primary" onClick={SendOffer}>
          <i class="fa-solid fa-phone"></i>
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setSearchMessage(!searchmessage)}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
>>>>>>> ead7d2b (lastversion)
      </div>
    </div>
  );
}

export default UserHeader;
