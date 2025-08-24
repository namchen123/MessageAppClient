import { useEffect, useRef, useState } from "react";
import Content from "./Content";
import RightMenu from "./RightMenu";
import SideBar from "./SideBar";
import Friend from "./Friend";
import "./style.css";
import video from "./images/hero-light-lg.webm";

import { jwtDecode } from "jwt-decode";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Context from "../Context";
<<<<<<< HEAD
function Main() {
=======
import CallPopup from "./InComingCallPopup";
import CallingPopup from "./CallingPopup";
import InComingCallPopup from "./InComingCallPopup";
import CallScreen from "./CallScreen";
function Main({ friend, decode, setDecode }) {
  const scrollRef = useRef(null);
  const messageRefs = useRef(new Map());

  const [messages, setMessages] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const [searchmessage, setSearchMessage] = useState(false);
>>>>>>> ead7d2b (lastversion)
  const [conversationchoose, setConversationchoose] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
<<<<<<< HEAD
=======
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [thisconversation, setThisConversation] = useState({});
  const [post, setPost] = useState(null);
  const [connection, setConnection] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [conversationtype, setConversationType] = useState("");
  const [incomingCall, setIncomingCall] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState("idle");
  const [callingId, setCallingId] = useState(null);
  const [peerconnection, setPeerConnection] = useState(null);
  const peerConnectionRef = useRef(null);
  const [accepted, setAccepted] = useState(false);
  const [newcheck,setNewcheck] = useState(false);
>>>>>>> ead7d2b (lastversion)

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       setDecode(decoded);
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   } else {
  //     console.log("No token found in sessionStorage");
  //   }
  // }, []);

  // useEffect(() => {
  //   async function fetchconversations() {
  //     try {
  //       setIsLoading(true); // Bắt đầu tải
  //       const res = await fetch(
  //         `https://localhost:7289/getconversationbyuserid/${decode.nameid}`
  //       );
  //       const data = await res.json();
  //       data.forEach((conv) => {
  //         const { conversationMembers } = conv;
  //         for (let index = 0; index < conversationMembers.length; index++) {
  //           const member = conversationMembers[index];
  //           if (member.userId != decode.nameid) {
  //             console.log("Id hien tai", decode.nameid);
  //             conv.title = member.user.username;
  //             break;
  //           }
  //         }
  //       });
  //       setConversations(data);
  //     } catch (e) {
  //       console.error("Error fetching conversations:", e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchconversations();
  // }, [decode]);

  const iceCandidateBuffer = [];
  useEffect(() => {
    // Tạo kết nối SignalR
    if (!decode) return;
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

        newConnection.onreconnected(async () => {
          try {
            await newConnection.invoke(
              "RegisterUser",
              decode.nameid.toString()
            );
            console.log("Re-registered user after reconnect:", decode.nameid);
          } catch (err) {
            console.error("Failed to re-register user:", err);
          }
        });

        newConnection.on("UserStatusChanged", (userId, isOnline) => {
          setOnlineUsers((prevUsers) => {
            const updatedUsers = new Set(prevUsers);
            if (isOnline) {
              updatedUsers.add(userId);
            } else {
              updatedUsers.delete(userId);
            }
            return updatedUsers;
          });
        });

        newConnection.on("OnlineUsers", (users) => {
          setOnlineUsers(new Set(users));
        });

        newConnection.on("ReceiveOffer", async (fromUserId, offer) => {
          console.log("Nhận offer từ", fromUserId);
          setCallingId(fromUserId)
          setIncomingCall({
            from: fromUserId,
            offer: JSON.parse(offer),
          });
          const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
          });
          peerConnectionRef.current = peer;

          // Thêm track local stream
          localStreamRef.current
            .getTracks()
            .forEach((track) => peer.addTrack(track, localStreamRef.current));

          // Thiết lập WebRTC remote description
        });

        newConnection.on("CallRejected", (requesterId) => {
          console.log("Từ chối từ", requesterId);
          setCallStatus("rejected");
          
          setTimeout(() => {
            setIsCalling(false);
            setCallStatus("idle");
          }, 3000);
          // Thiết lập WebRTC remote description
        });

        newConnection.on("CallCanceled", (requesterId) => {
          console.log("Hủy từ", requesterId);
          setIncomingCall(null);
          localVideoRef.current = null;
          localStreamRef.current.getTracks().forEach((track) => track.stop());
          localStreamRef.current = null;
          setIsCalling(false);
          // Thiết lập WebRTC remote description
        });

        newConnection.on("ReceiveAnswer", async (fromUserId, answer) => {
          console.log("Nhận answer từ", fromUserId);
          const currentPeer = peerConnectionRef.current;
          if (!currentPeer) {
            console.warn("PeerConnection chưa được tạo khi nhận answer");
            return;
          }

          try {
            const remoteDesc = new RTCSessionDescription(JSON.parse(answer));
            await currentPeer.setRemoteDescription(remoteDesc);
            onRemoteDescriptionSet()
            setAccepted(true);

            console.log("✅ SetRemoteDescription thành công");
            console.log("local", localVideoRef.current.srcObject);
            console.log("remote", remoteVideoRef.current.srcObject);
          } catch (error) {
            console.error("❌ Lỗi xử lý answer:", error);
          }
          // Thiết lập WebRTC remote description
        });

        newConnection.on(
          "ReceiveIceCandidate",
          async (fromUserId, candidate) => {
            console.log("Nhận ICE từ", fromUserId);
            const currentPeer = peerConnectionRef.current;
            const iceCandidate = new RTCIceCandidate(JSON.parse(candidate));
            if (currentPeer.remoteDescription) {
              // remoteDescription đã có, add ngay
              try {
                await currentPeer.addIceCandidate(iceCandidate);
                console.log("Added ICE candidate ngay");
              } catch (e) {
                console.error("Error adding ICE candidate", e);
              }
            } else {
              // remoteDescription chưa có, đệm candidate lại
              iceCandidateBuffer.push(iceCandidate);
              console.log("Buffer ICE candidate vì chưa có remoteDescription");
            }
            // Thêm ICE candidate vào peer connection
          }
        );
      })
      .catch((err) => console.error("Kết nối SignalR thất bại:", err));

    setConnection(newConnection);

    return () => {
      if (newConnection) newConnection.stop();
    };
  }, [decode]);

  async function onRemoteDescriptionSet() {
    const currentPeer = peerConnectionRef.current;
    if (!currentPeer) {
      console.log("NULL");
      return;
    }

    for (const candidate of iceCandidateBuffer) {
      try {
        await currentPeer.addIceCandidate(candidate);
        console.log("Added ICE candidate từ buffer");
      } catch (e) {
        console.error("Error adding ICE candidate từ buffer", e);
      }
    }
    iceCandidateBuffer.length = 0; // Clear buffer
  }

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current) {
      console.log("Video element đã sẵn sàng.");
    }
  }, [localVideoRef]);

  useEffect(() => {
    if (peerconnection !== null) {
      console.log("PeerConnection đã sẵn sàng", peerconnection);
      peerConnectionRef.current = peerconnection;
    }
  }, [peerconnection]);

  async function SendOffer() {
    if (!decode) return;
    setCallingId(receiverId);
    // if (!localVideoRef.current) {
    //   console.warn("localVideoRef chưa sẵn sàng");
    //   return;
    // }
    setIsCalling(true);
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream;
    localStreamRef.current = localStream;
    console.log("localVideoRef:", localVideoRef.current);

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peer.ontrack = (event) => {
      console.log("Nhận stream từ remote peer");
      remoteVideoRef.current.srcObject = event.streams[0];
      
    };

    localStream.getTracks().forEach((track) => {
      peer.addTrack(track, localStream);
    });

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        connection.invoke(
          "SendIceCandidateToUser",
          receiverId.toString(),
          decode.nameid.toString(),
          JSON.stringify(event.candidate)
        );
      }
    };

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    console.log("peer", peer);
    setPeerConnection(peer);
    try {
      await connection.invoke(
        "SendOfferToUser",
        receiverId.toString(),
        decode.nameid.toString(),
        JSON.stringify(offer)
      );
      console.log("send success");
      
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAccept() {
    try {
      setIsCalling(true);
      // Lấy local stream hoặc dùng lại nếu có sẵn (có thể lưu localStream trong state)
      //const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === "videoinput");

      // Tìm thiết bị OBS Virtual Camera
      const obsCam = videoDevices.find((d) => d.label.includes("OBS"));

      const localStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: obsCam.deviceId },
        audio: false, // hoặc false nếu không cần mic
      });

      localStream
        .getTracks()
        .forEach((track) =>
          peerConnectionRef.current.addTrack(track, localStream)
        );

      localVideoRef.current.srcObject = localStream;
      localStreamRef.current = localStream;

      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          console.log("stream",event.streams[0])
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(incomingCall.offer)
      );
      onRemoteDescriptionSet()
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      
      setPeerConnection(peerConnectionRef.current); // lưu peerConnection
      
      
      await connection.invoke(
        "SendAnswerToUser",
        incomingCall.from,
        decode.nameid.toString(),
        JSON.stringify(answer)
      );

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          connection.invoke(
            "SendIceCandidateToUser",
            incomingCall.from,
            decode.nameid.toString(),
            JSON.stringify(event.candidate)
          );
        }
      };

      setAccepted(true);
      setIncomingCall(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDecline() {
    try {
      await connection.invoke(
        "RejectCall",
        decode.nameid.toString(),
        incomingCall.from.toString()
      );
      console.log("reject success");

      setIncomingCall(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCancelCall() {
    console.log(callingId)
    try {
      await connection.invoke(
        "CancelCall",
        decode.nameid.toString(),
        callingId.toString()
      );
      console.log("cancel success");
      setIsCalling(false);

      localVideoRef.current = null;
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    } catch (error) {
      console.log(error);
    }
  }

  async function initialize() {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
<<<<<<< HEAD
          setDecode(decoded);
  
=======

>>>>>>> ead7d2b (lastversion)
          // Fetch conversations ngay sau khi decode
          setIsLoading(true);
          const res = await fetch(
            `https://localhost:7289/getconversationbyuserid/${decoded.nameid}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
          );
          const data = await res.json();
          data.forEach((conv) => {
            const { conversationMembers } = conv;
<<<<<<< HEAD
            for (let index = 0; index < conversationMembers.length; index++) {
              const member = conversationMembers[index];
              if (member.userId != decoded.nameid) {
                conv.title = member.user.username;
                conv.avatarUrl = member.user.avatarUrl;
                break;
=======
            // console.log("nhóm", conv)
            if (conversationMembers.length > 2) {
              // Lấy danh sách tên các thành viên ngoại trừ bạn (decoded.nameid)
              const memberNames = conversationMembers
                .filter((member) => member.userId != decoded.nameid) // Loại bạn khỏi danh sách
                .map((member) => member.user.username); // Lấy tên người dùng

              // Gán tiêu đề theo định dạng yêu cầu
              conv.title = `Nhóm của bạn, ${memberNames.join(", ")}`;
              conv.avatarUrl = conv.groupAvatar || null; // Sử dụng avatar nhóm nếu có
            } else {
              // Với cuộc trò chuyện 1-1, thiết lập tiêu đề dựa trên thành viên khác
              for (let index = 0; index < conversationMembers.length; index++) {
                const member = conversationMembers[index];
                if (member.userId != decoded.nameid) {
                  conv.title = member.user.username;
                  conv.avatarUrl = member.user.avatarUrl;
                  break;
                }
>>>>>>> ead7d2b (lastversion)
              }
            }
          });
          setConversations(data);
        } catch (error) {
          console.error("Error during initialization:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No token found in sessionStorage");
      }
    }
<<<<<<< HEAD
  
    initialize();
  }, []);

  console.log(decode)
=======
  useEffect(() => {

    initialize();
  }, []);

  async function fetchpagination() {
    try {
      setIsLoading2(true);
      console.log("data:", conversationchoose, messages.length);
      const res = await fetch(
        `https://localhost:7289/api/Conversations/${conversationchoose}/messageswithpagination?skipcount=${messages.length}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
      );
      const data = await res.json();
      setMessages((nextmessages) => [...data, ...nextmessages]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  }

  function scrollToMessage(targetMessageId) {
    setTimeout(() => {
      const messageElement = messageRefs.current.get(targetMessageId);
      console.log(messageElement.offsetTop);
      if (messageElement && scrollRef.current) {
        const topPosition =
          messageElement.offsetTop - scrollRef.current.offsetTop; // Lấy vị trí từ trên xuống
        scrollRef.current.scrollTo({
          top: topPosition,
          behavior: "smooth", // Cuộn mượt
        });
      }
    }, 100);
  }

  async function waitForMessageLengthChange(initialLength) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(
          new Error(
            "Timeout: messages.length không thay đổi sau một khoảng thời gian."
          )
        );
      }, 5000); // Giới hạn thời gian chờ là 5 giây

      const interval = setInterval(() => {
        if (messages.length > initialLength) {
          clearInterval(interval); // Dừng kiểm tra khi messages.length thay đổi
          clearTimeout(timeout); // Xóa timeout
          resolve(); // Kết thúc Promise
        }
      }, 100); // Kiểm tra mỗi 100ms
    });
  }

  const [targetMessageId, setTargetMessageId] = useState(0);

  async function findAndScrollToMessage(targetMessageId) {
    setTargetMessageId(targetMessageId);
    let messageExists = messages.some(
      (msg) => msg.messageId === targetMessageId
    );
    if (messageExists == false) {
      fetchpagination();
    } else {
      scrollToMessage(targetMessageId);
    }
  }
  useEffect(() => {
    if (
      targetMessageId &&
      messages.some((msg) => msg.messageId === targetMessageId)
    ) {
      console.log("Tin nhắn đã được tìm thấy.");
      scrollToMessage(targetMessageId); // Cuộn đến tin nhắn khi tìm thấy
      setTargetMessageId(null); // Xóa ID để tránh cuộn lại nhiều lần
    } else if (targetMessageId) {
      console.log("Tin nhắn chưa có, tiếp tục fetch...");
      fetchpagination(); // Fetch thêm tin nhắn nếu chưa tìm thấy
    }
  }, [messages]);
  console.log(decode);
>>>>>>> ead7d2b (lastversion)

  

  if (isLoading || !decode) {
    return <div>Loading...</div>;
  }

  return (
<<<<<<< HEAD
    <Context.Provider value={{conversations, setConversations , decode , isLoading, setIsLoading, conversationchoose, setConversationchoose}}>
      <div className="main row h-100">
        <SideBar />
        <Content />
        <RightMenu />
=======
    <Context.Provider
      value={{
        scrollRef,
        messageRefs,
        isLoading2,
        setIsLoading2,
        messages,
        setMessages,
        conversations,
        setConversations,
        decode,
        setDecode,
        isLoading,
        setIsLoading,
        conversationchoose,
        setConversationchoose,
        search,
        setSearch,
        receiverId,
        setReceiverId,
        user,
        setUser,
        searchmessage,
        setSearchMessage,
        post,
        setPost,
        fetchpagination,
        findAndScrollToMessage,
        onlineUsers,
        setOnlineUsers,
        conversationtype,
        setConversationType,
        setIsCalling,
        setCallingId,
        setPeerConnection,
        SendOffer,
        targetMessageId,
        initialize
      }}
    >
      <div className="main row h-100">
        {friend ? (
          <Friend />
        ) : (
          <>
            <SideBar connection={connection} setConnection={setConnection} />
            <Content
              connection={connection}
              setConnection={setConnection}
              setThisConversation={setThisConversation}
            />
            <RightMenu
              thisconversation={thisconversation}
              setThisConversation={setThisConversation}
            />
          </>
        )}
        {incomingCall && (
          <InComingCallPopup
            call={incomingCall}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}
        {isCalling && (
          <CallingPopup
            callStatus={callStatus}
            receiverId={receiverId}
            handleCancelCall={handleCancelCall}
          />
        )}
        {isCalling && (
          <CallScreen
            localVideoRef={localVideoRef}
            remoteVideoRef={remoteVideoRef}
            handleCancelCall={handleCancelCall}
          />
        )}
>>>>>>> ead7d2b (lastversion)
      </div>
    </Context.Provider>
  );
}

export default Main;
