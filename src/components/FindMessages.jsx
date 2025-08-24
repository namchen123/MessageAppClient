import { useContext, useEffect, useState } from "react";
import "./style.css";
import Context from "../Context";


function FindMessages({messageId, senderId, content, sentAt }) {
    const [username, setUsername] = useState("");
    const {findAndScrollToMessage} = useContext(Context)
    useEffect(function(){
        async function fetchuser() {
            const res = await fetch(`https://localhost:7289/api/Users/${senderId}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          })
            const data = await res.json()
            setUsername(data.username);
        }
        fetchuser();
    },[])
    function handleClick() {
      findAndScrollToMessage(messageId)
    }
  return (
    <div className="item w-100 d-flex flex-column border-bottom " onClick={handleClick}>
      <div className="d-flex justify-content-between mb-1">
        <p className="m-0 opacity-75">{username}</p>
        <p className="m-0 opacity-75" style={{ width: "100px" }}>
          {sentAt}
        </p>
      </div>
      <p className="">{content}</p>
      <div className="overlay"></div>
    </div>
  );
}

export default FindMessages;
