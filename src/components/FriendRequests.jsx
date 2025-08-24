import "./style.css";
import userImage from "./images/user.png";
import { useContext, useState } from "react";
import Context from "../Context";

function FriendRequests({ receiverId, avatarUrl, username }) {
  const { decode } = useContext(Context);
  const [accepted, setAccepted] = useState(false);
  const [denied, setDenied] = useState(false);
  async function AcceptFriend() {
    try {
      const res = await fetch(
        `https://localhost:7289/api/Friendships/acceptfriend`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          },
          body: JSON.stringify({
            userId: decode.nameid,
            receiverId,
            senderId: decode.nameid,
          }), // Chuyển đổi dữ liệu thành chuỗi JSON
        }
      );
      const data = await res.json();
      console.log(data);
      setAccepted(true);
    } catch (error) {}
  }

  return (
    <div class="item1 d-flex rounded-1 border-bottom">
      <div
        class="d-flex justify-content-center align-items-center"
        style={{ width: "80px", height: "80px" }}
      >
        <img
          class="rounded-2"
          src={avatarUrl ? avatarUrl : userImage}
          style={{ width: "50px", height: "50px" }}
          alt=""
        />
      </div>
      <div class="d-flex align-items-center">
        <p class="UserName fs-5 fw-bold mb-0">{username}</p>
      </div>
      <div class="d-flex w-100 justify-content-end">
        <div className="d-flex flex-column mt-1">
          {accepted ? (
            <p>Đã chấp nhận kết bạn</p>
          ) : (
            <>
              <button onClick={AcceptFriend} className="btn btn-primary">Chấp nhận</button>
              <button className="btn btn-danger">Từ chối</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
