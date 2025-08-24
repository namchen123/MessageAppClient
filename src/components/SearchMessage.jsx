import { useContext, useEffect, useState } from "react";
import FindMessages from "./FindMessages";
import Context from "../Context";

function SearchMessage() {
  const[searchMessage, setSearchMessage] = useState("");
  const[listmessages, setListMessages] = useState([]);
  const { conversationchoose} = useContext(Context);
  useEffect(function() {
    async function fetchFindMessages() {
      console.log(conversationchoose)
      console.log(searchMessage)
      const res = await fetch("https://localhost:7289/api/Conversations/find",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          },
          body: JSON.stringify({
            conversationId: conversationchoose, 
            message: searchMessage,
          }),
        }
      )
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData)
        console.log(`Lỗi: ${errorData.message || "s"}`);
        setListMessages([])
        return;
      }
      const data = await res.json()
      console.log(data)
      setListMessages(data)
    }
    if(searchMessage!=""){
      fetchFindMessages()
    } else{
      setListMessages([])
    }
  },[searchMessage])
  return (
    <>
      <div className="d-flex form-control h-25">
        <button class="btn rounded-start-0">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          onChange={(e)=>setSearchMessage(e.target.value)}
          value={searchMessage}
          class="form-control rounded-end-0"
          type="text"
          placeholder="Tìm kiếm"
        />
      </div>
      <div className="w-100 overflow-auto" style={{height:"569px"}}>
      {listmessages==[] ? "" : listmessages.map((message, index) => (
        <FindMessages
          messageId={message.messageId}
          senderId={message.senderId}
          content={message.content}
          sentAt={message.sentAt.split("T")[0]}
        />
      ))}
      </div>
    </>
  );
}

export default SearchMessage;
