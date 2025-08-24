import userImage from "./images/user.png";
import Context from "../Context";
import { useContext, useEffect, useState } from "react";
import "./style.css";
function UserCheck({
  title,
  conversationId,
  latestmessages,
  conversationImage,
  userId,
  handleAddUser,
  resetcheck,
  setResetCheck,
  handleDeleteUser,
}) {
  const { setConversationchoose, decode, setReceiverId, setUser } =
    useContext(Context);
  const [choose, setChoose] = useState(null);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    async function findconversation() {
      try {
        const res = await fetch(
          `https://localhost:7289/getconversationbyuserid/${decode.nameid}/${userId}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
        );
        if (!res.ok) {
          setChoose(0);
        }
        const data = await res.json();

        setChoose(data.conversationId);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    findconversation();
  }, []);
  console.log(choose);

  function handleCheck() {
    if (check == false) {
      setCheck(!check);
      handleAddUser(userId);
    } else if (check == true) {
      setCheck(!check);
      handleDeleteUser(userId);
    }
  }

  useEffect(
    function () {
      if (resetcheck) {
        setCheck(false);
        setResetCheck(!resetcheck);
      }
    },
    [resetcheck]
  );

  return (
    <div className="item d-flex rounded-1" onClick={handleCheck}>
      <input type="checkbox" checked={check} name="" id="" />
      <img
        className="mt-2"
        src={conversationImage ? conversationImage : userImage}
        style={{ width: "60px", height: "60px", borderRadius: "60px" }}
        alt=""
      />
      <div className="m mx-2">
        <p className="UserName fs-5 fw-bold mt-2 mb-0">{title}</p>
        {choose ? (
          <p>
            {latestmessages && latestmessages.length > 0
              ? latestmessages[0].content
              : ""}
          </p>
        ) : (
          <p>Người dùng này chưa được kết nối</p>
        )}
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default UserCheck;
