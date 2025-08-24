import { useEffect, useState } from "react";
import userImage from "./images/user.png";


function InComingCallPopup({ call, onAccept, onDecline }) {
    const [userInfo,setUserInfo] = useState({});

    useEffect(()=>{
        async function getUser() {
            try {
                const res = await fetch(`https://localhost:7289/api/Users/${call.from}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
                const data = await res.json()
                setUserInfo(data)
            } catch (error) {
                console.log(error)   
            }
        }
        getUser()
    },[])

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
        <div className="text-muted small">Đang gọi đến...</div>
        <div className="mt-2 d-flex gap-2">
          <button className="btn btn-success btn-sm" onClick={onAccept}>
            ✅ Đồng ý
          </button>
          <button className="btn btn-danger btn-sm" onClick={onDecline}>
            ❌ Từ chối
          </button>
        </div>
      </div>
    </div>
  );
}

export default InComingCallPopup;
