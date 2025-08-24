import "./style.css";
import userImage from "./images/user.png";
import UserHeader from "./UserHeader";
import UserContent from "./UserContent";
import { useContext, useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { jwtDecode } from "jwt-decode";
import Context from "../Context";
<<<<<<< HEAD
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
=======

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

function Content({ connection, setConnection, setThisConversation }) {
  const { messages, setMessages } = useContext(Context);
  const {
    isLoading2,
    setIsLoading2,
    scrollRef,
    messageRefs,
    fetchpagination,
    findAndScrollToMessage,
    targetMessageId
  } = useContext(Context);
  const [files, setFiles] = useState([]);
  const [newmessage, setnewMessage] = useState({});
  const [message, setMessage] = useState("");
  const [newuser, setNewUser] = useState({});

  const { receiverId, setReceiverId, onlineUsers, setOnlineUsers } =
    useContext(Context);
  const {
    conversationchoose,
    post,
    setPost,
    conversations,
    setConversations,
    conversationtype,
    setConversationType,
    setIsCalling,
    setCallingId,
    setPeerConnection,
    SendOffer,
  } = useContext(Context);
  const { decode, user, setUser, searchmessage, setSearchMessage } =
    useContext(Context);
  const [conversationtitle, setConversationTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);

  const conversationRef = useRef(conversationchoose);

  useEffect(() => {
    conversationRef.current = conversationchoose;
    console.log("📌 conversationchoose đã cập nhật:", conversationchoose);
  }, [conversationchoose]);
>>>>>>> ead7d2b (lastversion)
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


  const updateConversation = (conversationId, newMessage) => {
    setConversations((prev) => {
      return prev
        .map((conv) =>
          conv.conversationId === conversationId
            ? { ...conv, messages: [newMessage, ...conv.messages.slice(1)] } // Cập nhật tin nhắn mới nhất
            : conv
        )
        .sort((a, b) => {
          const timeA = new Date(a.messages[0]?.sentAt || 0).getTime();
          const timeB = new Date(b.messages[0]?.sentAt || 0).getTime();
          return timeB - timeA; // Sắp xếp mới nhất lên đầu
        });
    });
  };

  const fetchPresignedUrl = async (fileKey) => {
    console.log("file", fileKey);
    try {
      const response = await fetch(
        `https://localhost:7289/api/Conversations/get-presigned-url?key=${fileKey}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Giả sử API trả về JSON có dạng { url: "presignedUrl" }
      return data.url;
    } catch (error) {
      console.error("Error fetching pre-signed URL:", error);
      return null;
    }
  };

  const loadFileWithPresignedUrl = async (messagesList) => {
    if (messagesList && messagesList.length > 0) {
      for (const message of messagesList) {
        if (message.files && message.files.length > 0) {
          for (const file of message.files) {
            const presignedUrl = await fetchPresignedUrl(file.fileName); // Chờ lấy presigned URL
            file.filePath = presignedUrl; // Cập nhật filePath
          }
        }
      }
      // Nếu bạn cần làm gì với messagesList sau khi cập nhật filePath
      console.log(messagesList);
      setMessages([...messagesList]);
    }
  };

  useEffect(() => {
    // Fetch tin nhắn ban đầu từ API
    async function fetchmessage() {
      setIsLoaded(true);
>>>>>>> ead7d2b (lastversion)
      try {
        const res = await fetch(
          `https://localhost:7289/api/Conversations/${conversationchoose}/messages`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
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
<<<<<<< HEAD
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
=======
      setIsLoaded(false);
    }
    fetchmessage();
  }, [conversationchoose]);

  useEffect(() => {
    connection.on(
      "ReceiveMessage",
      async (conversationId, message, nameid, messageId) => {
        const res = await fetch(`https://localhost:7289/api/Users/${nameid}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
        const userData = await res.json();
        updateConversation(conversationId, {
          conversationId: conversationId,
          content: message,
          senderId: nameid,
          sender: userData,
          sentAt: new Date().toISOString(),
        });
        // setPost({conversationId: conversationId, content: message, senderId: nameid, sender: userData,sentAt: new Date().toISOString() });
        console.log(userData);
        console.log("conversationchoose", conversationRef.current);
        console.log("conversationid", conversationId);
        if (conversationRef.current == conversationId) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              messageId: messageId,
              conversationId: conversationId,
              content: message,
              senderId: nameid,
              sender: userData,
              sentAt: new Date().toISOString(),
            },
          ]);
        }
      }
    );

    connection.on(
      "ReceiveFile",
      async (conversationId, filename, fileurl, filetype, timestamp, nameid) => {
        const res = await fetch(`https://localhost:7289/api/Users/${nameid}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
        const userData = await res.json();
        if (conversationRef.current == conversationId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: "",
            senderId: nameid,
            sender: userData,
            files: [
              {
                fileName: filename,
                filePath: fileurl,
                fileType: filetype,
                timeStamp: timestamp,
              }, // Chỉ thêm file mới
            ],
          },
        ]);
      }
      }
    );

    connection.on(
      "ReceiveGroupFile",
      async (filename, fileurl, filetype, timestamp, groupname, nameid) => {
        const res = await fetch(`https://localhost:7289/api/Users/${nameid}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
        const userData = await res.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: "",
            senderId: nameid,
            groupname,
            sender: userData,
            files: [
              {
                fileName: filename,
                filePath: fileurl,
                fileType: filetype,
                timeStamp: timestamp,
              }, // Chỉ thêm file mới
            ],
          },
        ]);
      }
    );
>>>>>>> ead7d2b (lastversion)

    

    // Lắng nghe tin nhắn nhóm
    connection.on(
      "ReceiveGroupMessage",
      async (message, senderId, groupName) => {
        const res = await fetch(`https://localhost:7289/api/Users/${senderId}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
        const userData = await res.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: message, senderId, groupName, sender: userData },
        ]);
      }
    );

    connection.on("Recall", async (nameid, messageId) => {
      const res = await fetch(`https://localhost:7289/api/Users/${nameid}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
      const userData = await res.json();
      console.log("Recall");
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId ? { ...msg, recall: true } : msg
        )
      );
    });

    connection.on("RecallGroup", async (nameid, messageId,groupname) => {
      const res = await fetch(`https://localhost:7289/api/Users/${nameid}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
      const userData = await res.json();
      console.log("Recall");
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId ? { ...msg, recall: true } : msg
        )
      );
    });

    return () => {
      connection.off("ReceiveMessage");
      connection.off("ReceiveFile");
      connection.off("Recall");
      connection.off("ReceiveGroupMessage");
      connection.off("ReceiveGroupFile");
      connection.off("RecallGroup");
    };
  }, []);

<<<<<<< HEAD
=======
  // useEffect(() => {
  //   // Tạo kết nối SignalR
  //   const newConnection = new HubConnectionBuilder()
  //     .withUrl("https://localhost:7289/chathub", {
  //       accessTokenFactory: () => decode.nameid.toString(),
  //     }) // URL của SignalR Hub
  //     .withAutomaticReconnect()
  //     .build();

  //   // Bắt đầu kết nối
  //   newConnection
  //     .start()
  //     .then(() => {
  //       console.log("Kết nối SignalR thành công!");

  //       newConnection.onreconnected(async () => {
  //         try {
  //           await newConnection.invoke(
  //             "RegisterUser",
  //             decode.nameid.toString()
  //           );
  //           console.log("Re-registered user after reconnect:", decode.nameid);
  //         } catch (err) {
  //           console.error("Failed to re-register user:", err);
  //         }
  //       });

  //       newConnection.on("UserStatusChanged", (userId, isOnline) => {
  //         setOnlineUsers((prevUsers) => {
  //           const updatedUsers = new Set(prevUsers);
  //           if (isOnline) {
  //             updatedUsers.add(userId);
  //           } else {
  //             updatedUsers.delete(userId);
  //           }
  //           return updatedUsers;
  //         });
  //       });

  //       newConnection.on("OnlineUsers", (users) => {
  //         setOnlineUsers(new Set(users));
  //       });

  //       newConnection.on(
  //         "ReceiveMessage",
  //         async (conversationId, message, nameid, messageId) => {
  //           const res = await fetch(
  //             `https://localhost:7289/api/Users/${nameid}`
  //           );
  //           const userData = await res.json();
  //           updateConversation(conversationId, {
  //             conversationId: conversationId,
  //             content: message,
  //             senderId: nameid,
  //             sender: userData,
  //             sentAt: new Date().toISOString(),
  //           });
  //           // setPost({conversationId: conversationId, content: message, senderId: nameid, sender: userData,sentAt: new Date().toISOString() });
  //           console.log(userData);
  //           console.log("conversationchoose", conversationRef.current);
  //           console.log("conversationid", conversationId);
  //           if (conversationRef.current == conversationId) {
  //             setMessages((prevMessages) => [
  //               ...prevMessages,
  //               {
  //                 messageId: messageId,
  //                 conversationId: conversationId,
  //                 content: message,
  //                 senderId: nameid,
  //                 sender: userData,
  //                 sentAt: new Date().toISOString(),
  //               },
  //             ]);
  //           }
  //         }
  //       );

  //       newConnection.on(
  //         "ReceiveFile",
  //         async (filename, fileurl, filetype, timestamp, nameid) => {
  //           const res = await fetch(
  //             `https://localhost:7289/api/Users/${nameid}`
  //           );
  //           const userData = await res.json();
  //           setMessages((prevMessages) => [
  //             ...prevMessages,
  //             {
  //               content: "",
  //               senderId: nameid,
  //               sender: userData,
  //               files: [
  //                 {
  //                   fileName: filename,
  //                   filePath: fileurl,
  //                   fileType: filetype,
  //                   timeStamp: timestamp,
  //                 }, // Chỉ thêm file mới
  //               ],
  //             },
  //           ]);
  //         }
  //       );

  //       newConnection.on("Recall", async (nameid, messageId) => {
  //         const res = await fetch(`https://localhost:7289/api/Users/${nameid}`);
  //         const userData = await res.json();
  //         console.log("Recall");
  //         setMessages((prev) =>
  //           prev.map((msg) =>
  //             msg.messageId === messageId ? { ...msg, recall: true } : msg
  //           )
  //         );
  //       });

  //       // Lắng nghe tin nhắn nhóm
  //       newConnection.on(
  //         "ReceiveGroupMessage",
  //         async (message, senderId, groupName) => {
  //           const res = await fetch(
  //             `https://localhost:7289/api/Users/${senderId}`
  //           );
  //           const userData = await res.json();
  //           setMessages((prevMessages) => [
  //             ...prevMessages,
  //             { content: message, senderId, groupName, sender: userData },
  //           ]);
  //         }
  //       );
  //     })
  //     .catch((err) => console.error("Kết nối SignalR thất bại:", err));

  //   setConnection(newConnection);

  //   return () => {
  //     if (newConnection) newConnection.stop();
  //   };
  // }, []);
>>>>>>> ead7d2b (lastversion)

  useEffect(() => {
    async function fetchconversation() {
      try {
        const res = await fetch(
          `https://localhost:7289/getconversation/${conversationchoose}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
        );
        const data = await res.json();
        console.log("Fetch conversation:", data);
        const { conversationMembers } = data;
<<<<<<< HEAD
        for (let index = 0; index < conversationMembers.length; index++) {
          const member = conversationMembers[index];
          if (member.userId != decode.nameid) {
            setUser(member.user.username);
            setReceiverId(member.userId);
=======
        setConversationTitle(data.title);
        setConversationType(data.title);
        if (data.title === "Group Conversation") {
          connection
            .invoke("JoinGroup", data.conversationId) // conversation.id đại diện cho ID của nhóm
            .then(() => console.log(`Đã tham gia nhóm: ${data.conversationId}`))
            .catch((err) => console.error("Lỗi khi tham gia nhóm:", err));
        }
        for (let index = 0; index < conversationMembers.length; index++) {
          const member = conversationMembers[index];
          if (member.userId != decode.nameid) {
            if (data.title === "Group Conversation") {
              setReceiverId(0);
              setUser(data.conversationName)
            } else {
              setUser(member.user.username);
              setReceiverId(member.userId);
            }
>>>>>>> ead7d2b (lastversion)
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
              "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
              content: message,
              senderId: decode.nameid,
              receiverId: receiverId,
              conversationId: conversationchoose,
            }),
          }
        );
<<<<<<< HEAD
        try {
          await connection.invoke(
            "SendMessageToUser",
            receiverId.toString(),
            message,
            decode.nameid.toString()
          );
          console.log("Message sent successfully!");
=======
        const data = await res.json();

        try {
          if (conversationtitle === "Direct Conversation") {
            await connection.invoke(
              "SendMessageToUser",
              conversationchoose,
              receiverId.toString(),
              message,
              decode.nameid.toString(),
              data.messageId
            );
            console.log("Message sent successfully!");
          } else if (conversationtitle === "Group Conversation") {
            await connection.invoke(
              "SendMessageToGroup",
              conversationchoose,
              decode.nameid.toString(),
              message
            );
            console.log("Message sent successfully!");
          }
>>>>>>> ead7d2b (lastversion)
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setMessage("");
  }

<<<<<<< HEAD
=======
  const handleSendFile = async (file) => {
    console.log("File nhận được trong handleSendFile:", file);

    // Khởi tạo S3 Client

    // Đọc nội dung file bằng FileReader
    const reader = new FileReader();
    reader.onloadend = async () => {
      const fileContent = reader.result;
      const fileName = file.name;

      const uploadParams = {
        Bucket: "messageappbucket",
        Key: file.name,
        Body: fileContent,
        ContentType: file.type,
      };

      const command = new PutObjectCommand(uploadParams);

      const response = await fetch(
        "https://localhost:7289/api/Files/generate-presigned-url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${sessionStorage.getItem("token")}`},
          body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        }
      );
      console.log(response);
      const data = await response.json();
      const { uploadUrl, fileKey, timestamp } = data;
      console.log(timestamp);
      // 2️⃣ Upload file trực tiếp lên S3 bằng Pre-Signed URL
      await fetch(uploadUrl, {
        method: "PUT",
        body: fileContent,
        headers: { "Content-Type": file.type },
      });
      // Gửi file lên csdl
      try {
        console.log("file type", file.type);
        const res = await fetch(
          "https://localhost:7289/api/Conversations/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
              content: "",
              senderId: decode.nameid,
              receiverId: receiverId,
              filetype: file.type,
              filename: `${timestamp}_${file.name}`,
              conversationId: conversationchoose,
            }),
          }
        );
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error.message);
      }
      // try {
      //   const response = await s3.send(command);
      //   console.log(response);
      //   console.log("Tệp đã được tải lên thành công.");
      // } catch (err) {
      //   console.error("Lỗi khi tải lên tệp:", err);
      // }

      try {
        if (conversationtitle === "Direct Conversation") {
          await connection.invoke(
            "SendFileToUser",
            conversationchoose,
            receiverId.toString(),
            file.name,
            `https://${uploadParams.Bucket}.s3.amazonaws.com/${fileKey}`,
            file.type,
            timestamp,
            decode.nameid.toString()
          );
          console.log("File sent successfully!");
        } else if (conversationtitle === "Group Conversation") {
          await connection.invoke(
            "SendFileToGroup",
            conversationchoose,
            file.name,
            `https://${uploadParams.Bucket}.s3.amazonaws.com/${fileKey}`,
            file.type,
            timestamp,
            decode.nameid.toString()
          );
        }
      } catch (error) {
        console.log("Lỗi gửi file", error);
      }
    };

    reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
  };

  async function Recall(messageId) {
    try {
      if (
        conversationtitle === "Direct Conversation"
      ) {
        console.log(
          "Sending RecallMessage with",
          messageId,
          receiverId.toString(),
          decode.nameid.toString()
        );
        await connection.invoke(
          "RecallMessage",
          messageId,
          receiverId.toString(),
          decode.nameid.toString()
        );
      } else if(conversationtitle === "Group Conversation") {
        await connection.invoke(
          "RecallGroupMessage",
          conversationchoose,
          messageId,
          decode.nameid.toString()
        );
      }
      const res = await fetch(`https://localhost:7289/api/Conversations/Recall?messageid=${messageId}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
      const data = await res.json();
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function checkPrivacy() {
      if (conversationtype == "Direct Conversation" || receiverId > 0) {
        try {
          const res = await fetch(
            `https://localhost:7289/api/Users/getPrivacyWith/${receiverId}/${decode.nameid}`,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }

          );
          const data = await res.json();
          setIsPrivacy(data);
          console.log("dnsajdas", data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    if(conversationtype!="Group Conversation"){
      checkPrivacy();
    }
  }, [conversationchoose, receiverId]);

>>>>>>> ead7d2b (lastversion)
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
        isLoading2,
        setIsLoading2,
        scrollRef,
        messageRefs,
        messages,
        setMessages,
        message,
        setMessage,
        connection,
        setConnection,
        decode,
        user,
        newmessage,
<<<<<<< HEAD
        conversationchoose
=======
        conversationchoose,
        searchmessage,
        setSearchMessage,
        fetchpagination,
        Recall,
        isPrivacy,
        receiverId,
        setIsCalling,
        setCallingId,
        setPeerConnection,
        SendOffer,
        targetMessageId
>>>>>>> ead7d2b (lastversion)
      }}
    >
      <div className="message col-6 border-start p-0 h-100">
        <UserHeader />

        <UserContent />
<<<<<<< HEAD
        <div className="send form-control d-flex rounded-0">
=======

        <div className="send form-control d-flex rounded-0 g-2">
          <div class="file-upload">
            <input
              onChange={(e) => {
                const file = e.target.files[0]; // Lấy file từ sự kiện
                console.log("Chọn tệp:", file); // Kiểm tra xem có tệp nào được chọn
                handleSendFile(file);
                e.target.value = "";
              }}
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              disabled={isPrivacy}
            />
            <label
              className="d-flex form-control btn btn-outline-dark"
              htmlFor="fileInput"
              class="upload-icon"
            >
              <i class="fa-solid fa-file"></i>
            </label>
          </div>
>>>>>>> ead7d2b (lastversion)
          <input
            className="form-control rounded-end-0"
            type="text"
            placeholder="Nhập tin nhắn"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isPrivacy}
          />
          <button
            onClick={handleSendMessage}
            className="btn btn-primary rounded-start-0"
            disabled={isPrivacy}
          >
            <i className="fa-solid fa-paper-plane" />
          </button>
        </div>
      </div>
    </Context.Provider>
  );
}

export default Content;
