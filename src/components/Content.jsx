import "./style.css";
import userImage from "./images/user.png";
import UserHeader from "./UserHeader";
import UserContent from "./UserContent";
import { useContext, useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { jwtDecode } from "jwt-decode";
import Context from "../Context";
function Content() {
  const [messages, setMessages] = useState([]);
  const [newmessage, setnewMessage] = useState({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [connection, setConnection] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const { conversationchoose } = useContext(Context);
  console.log("choose", conversationchoose);
  const { decode } = useContext(Context);
  // useEffect(() => {
  //   const newConnection = new HubConnectionBuilder()
  //     .withUrl("https://localhost:7289/chathub")
  //     .withAutomaticReconnect()
  //     .build();
  //   setConnection(newConnection);
  // }, []);

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then(() => {
  //         console.log("Connected to SignalR hub");
  //       })
  //       .catch((e) => console.log("Connection failed: ", e));
  //   }
  // }, [connection]);

  useEffect(() => {
    // Fetch tin nhắn ban đầu từ API
    async function fetchmessage() {
      try {
        const res = await fetch(
          `https://localhost:7289/api/Conversations/${conversationchoose}/messages`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await res.json();
        setMessages(data);
        setnewMessage(null);
        const token = sessionStorage.getItem("token");

        console.log("Fetched messages:", data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchmessage();
  }, [conversationchoose]);
  useEffect(() => {
    // Tạo kết nối SignalR
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7289/chathub", {
        accessTokenFactory: () => decode.nameid.toString(),
      }) // URL của SignalR Hub
      .withAutomaticReconnect()
      .build();

    // Bắt đầu kết nối
    newConnection
      .start()
      .then(() => {
        console.log("Kết nối SignalR thành công!");
        newConnection.on("ReceiveMessage", (message, nameid) => {
          console.log(message, nameid);
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: message, senderId: nameid },
          ]);
          setnewMessage({message,nameid})
        });
      })
      .catch((err) => console.error("Kết nối SignalR thất bại:", err));

    setConnection(newConnection);

    return () => {
      // Đóng kết nối khi component bị huỷ
      if (newConnection) newConnection.stop();
    };
  }, []);


  useEffect(() => {
    async function fetchconversation() {
      try {
        const res = await fetch(
          `https://localhost:7289/getconversation/${conversationchoose}`
        );
        const data = await res.json();
        console.log("Fetch conversation:", data);
        const { conversationMembers } = data;
        for (let index = 0; index < conversationMembers.length; index++) {
          const member = conversationMembers[index];
          if (member.userId != decode.nameid) {
            setUser(member.user.username);
            setReceiverId(member.userId);
          }
        }
      } catch (e) {
        console.log("Error find conversation", e);
      }
    }
    fetchconversation();
  }, [decode, conversationchoose]);

  async function handleSendMessage() {
    try {
      if (connection && message) {
        const res = await fetch(
          "https://localhost:7289/api/Conversations/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: message,
              senderId: decode.nameid,
              receiverId: receiverId,
              conversationId: conversationchoose,
            }),
          }
        );
        try {
          await connection.invoke(
            "SendMessageToUser",
            receiverId.toString(),
            message,
            decode.nameid.toString()
          );
          console.log("Message sent successfully!");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setMessage("");
  }

  // if (connection && message) {
  //   try {
  //     const res = await fetch(
  //       "https://localhost:7289/api/Conversations/send",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           content: message,
  //         }),
  //       }
  //     );
  //     if (!res.ok) {
  //       alert("");
  //     }
  //     const data = await res.json();
  //     await connection.send("SendMessage", user, message);

  //     setMessage("");
  //   } catch (e) {
  //     console.error("Sending message failed: ", e);
  //   }
  // }

  return (
    <Context.Provider
      value={{
        messages,
        setMessages,
        message,
        setMessage,
        connection,
        setConnection,
        decode,
        user,
        newmessage,
        conversationchoose
      }}
    >
      <div className="message col-6 border-start p-0 h-100">
        <UserHeader />
        <UserContent />
        <div className="send form-control d-flex rounded-0">
          <input
            className="form-control rounded-end-0"
            type="text"
            placeholder="Nhập tin nhắn"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="btn btn-primary rounded-start-0"
          >
            <i className="fa-solid fa-paper-plane" />
          </button>
        </div>
      </div>
    </Context.Provider>
  );
}

export default Content;
