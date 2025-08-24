import { useEffect, useState } from "react";
import userImage from "./images/user.png";

function CallingPopup({ callStatus, receiverId, handleCancelCall }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          `https://localhost:7289/api/Users/${receiverId}`
        );
        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);
  return (
    <div
      className="position-fixed bottom-0 end-0 m-4 p-3 bg-white border rounded shadow d-flex align-items-center"
      style={{ zIndex: 1055, width: "300px" }}
    >
      <img
        src={userInfo.avatarUrl ? userInfo.avatarUrl : userImage}
        className="rounded-circle me-3"
        alt="Avatar"
        width="50"
        height="50"
      />
      <div className="flex-grow-1">
        <div className="fw-bold">{userInfo.username}</div>
        {callStatus == "idle" ? (
          <>
            <div className="text-muted small">Đang gọi...</div>
            <div className="mt-2 d-flex gap-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={handleCancelCall}
              >
                ❌ Hủy cuộc gọi
              </button>
            </div>
          </>
        ) : (
          <div className="text-muted small">Từ chối</div>
        )}
      </div>
    </div>
  );
}

export default CallingPopup;
