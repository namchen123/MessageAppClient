import { useContext, useEffect, useState } from "react";
import userImage from "./images/user.png";
import "./style.css";
import Context from "../Context";
import User from "./User";
function ListUser() {
  const { conversations, setConversations } = useContext(Context);
  const { decode } = useContext(Context);
  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    console.log("Updated conversations:", conversations);
  }, [conversations]);

  return (
    <div className="h-100 overflow-y-auto">
      {conversations.map((conv, index) => (
        <User
          key={index}
          title={conv.title}
          conversationId={conv.conversationId}
          latestmessages={conv.messages}
          conversationImage={conv.avatarUrl}
        />
      ))}
    </div>
  );
}

export default ListUser;
