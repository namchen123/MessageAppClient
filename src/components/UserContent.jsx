import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import Context from "../Context";

function UserContent() {
  const { messages, newmessage, conversationchoose, setMessages } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const { decode } = useContext(Context);
  const [scrollHeight, setScrollHeight] = useState(0);
  // useEffect(
  //   () =>
  //     async function fetchmessage() {
  //       try {
  //         const res = await fetch(
  //           "https://localhost:7289/api/Conversations/1/messages"
  //         );
  //         if (!res.ok) {
  //           throw new Error("Failed to fetch messages");
  //         }
  //         const data = await res.json();
  //         setMessages(data); // Cập nhật trạng thái tin nhắn
  //         console.log("Fetched messages:", data);
  //       } catch (error) {
  //         console.error("Error fetching messages:", error);
  //       }
  //       fetchmessage();
  //     },
  //   []
  // );

  // Hàm gọi API để lấy tin nhắn ban đầu
  // const fetchMessages = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://localhost:7289/api/Conversations/1/messages"
  //     );
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch messages");
  //     }
  //     const data = await res.json();
  //     setMessages(data); // Cập nhật trạng thái tin nhắn
  //     const token = sessionStorage.getItem("token");
  //     setDecode(jwtDecode(token));
  //     console.log(decode); // Giải mã token
  //     console.log("Fetched messages:", data);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };

  // Gọi API để lấy tin nhắn ban đầu khi component mount
  //fetchMessages();
  const scrollRef = useRef(null);
  useEffect(() => {
    // Cuộn về cuối khi component được render lần đầu
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    setScrollHeight(scrollRef.current.scrollHeight)
  }, [conversationchoose, newmessage]);

  useEffect(()=> {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollHeight;
    setScrollHeight(scrollRef.current.scrollHeight);
  },[messages])

  function handleScroll() {
    async function fetchpagination() {
      try {
        setIsLoading(true);

        console.log("data:", conversationchoose, messages.length);
        const res = await fetch(
          `https://localhost:7289/api/Conversations/${conversationchoose}/messageswithpagination?skipcount=${messages.length}`
        );
        const data = await res.json();
        setMessages((nextmessages) => [...data, ...nextmessages]);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (scrollRef.current.scrollTop == 0) {
      fetchpagination();
    }
  }
  console.log(messages);
  // Dọn dẹp kết nối khi component unmount

  return (
    <div
      className="content overflow-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span class="visually-hidden d-flex">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
      {messages.map((mess, index) => (
        <Message
          key={index}
          sender={mess}
          senderid={mess.senderId}
          nameid={decode.nameid}
          content={mess.content}
        />
      ))}
    </div>
  );
}

export default UserContent;
