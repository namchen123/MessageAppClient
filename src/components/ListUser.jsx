import { useContext, useEffect, useState } from "react";
import userImage from "./images/user.png";
import "./style.css";
import Context from "../Context";
import User from "./User";
import { HubConnectionBuilder } from "@microsoft/signalr";

function ListUser({connection,setConnection}) {
  const { conversations, setConversations } = useContext(Context);
  const { decode } = useContext(Context);
  const { isLoading, setIsLoading, onlineUsers, setOnlineUsers } = useContext(Context);
  
  
  console.log(conversations)

  return (
    <div className="overflow-auto" style={{height: '82.5%'}}>
      {conversations.map((conv) => {
        const memberIds = conv.conversationMembers.map(member => Number(member.userId)); // Ép kiểu thành số
        const partnerId = memberIds.find(id => id !== Number(decode.nameid)); // Lấy ID của người còn lại
        const isOnline = onlineUsers.has(partnerId.toString());
        

        return (
          <User
            key={conv.conversationId} 
            title={conv.conversationName ? conv.conversationName : conv.title}
            conversationId={conv.conversationId}
            latestmessages={conv.messages}
            conversationImage={conv.avatarUrl}
            isOnline={isOnline} // Thêm trạng thái online vào User component
          />
        );
      })}
    </div>
  );
}

export default ListUser;
