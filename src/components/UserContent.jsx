import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import Context from "../Context";

function UserContent() {
<<<<<<< HEAD
  const { messages, newmessage, conversationchoose, setMessages } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
=======
  const { messages, newmessage, conversationchoose, setMessages , targetMessageId}=useContext(Context);
  const { isLoading2, setIsLoading2 } = useContext(Context);
>>>>>>> ead7d2b (lastversion)
  const { decode } = useContext(Context);
  const [scrollHeight, setScrollHeight] = useState(0);
  const { messageRefs, fetchpagination, findAndScrollToMessage, isPrivacy } =
    useContext(Context);
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
<<<<<<< HEAD
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

=======
  const { scrollRef } = useContext(Context);

  async function fetchPagination() {
    try {
      setIsLoading2(true);

      const prevScrollHeight = scrollRef.current.scrollHeight;
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
      setTimeout(() => {
        if (scrollRef.current) {
          // Điều chỉnh vị trí cuộn để giữ nguyên vị trí cũ
          scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight - prevScrollHeight;
        }
      }, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  }

  function handleScroll() {
    if (scrollRef.current.scrollTop == 0) {
      if (scrollRef.current.clientHeight != scrollRef.current.scrollHeight) {
        fetchPagination();
      }
    }
  }

  useEffect(
    function () {
      console.log(messages);
    },
    [messages]
  );
  console.log('fsafasf',targetMessageId)
  console.log(messages);
  // Dọn dẹp kết nối khi component unmount
>>>>>>> ead7d2b (lastversion)
  return (
    <div
      className="content overflow-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {isPrivacy ? (
        <div className="d-flex justify-content-center">
          <p>
            Người dùng này không cho phép nhắn tin với người lạ, hãy kết bạn
          </p>
        </div>
      ) : (
        ""
      )}
      {isLoading2 ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span class="visually-hidden d-flex">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
<<<<<<< HEAD
      {messages.map((mess, index) => (
        <Message
          key={index}
          sender={mess}
          senderid={mess.senderId}
          nameid={decode.nameid}
          content={mess.content}
        />
      ))}
=======
      {messages.length > 0
        ? messages.map((mess, index) => {
            // Kiểm tra xem tin nhắn trước đó có cùng người gửi không
            const showAvatar =
              index === 0 || messages[index - 1].senderId !== mess.senderId;

            return (
              
              <div
                key={`${mess.messageId}-${index}`}
                ref={(el) => {
                  if (el) messageRefs.current.set(mess.messageId, el);
                }}
              >
                <Message
                  messageId={mess.messageId}
                  conversationchoose={conversationchoose}
                  key={index}
                  sender={mess.sender}
                  senderid={mess.senderId}
                  nameid={decode.nameid}
                  files={mess.files}
                  recall={mess.recall}
                  content={mess.content}
                  className="fade-in"
                  showAvatar={showAvatar} // Truyền giá trị này vào component Message
                  highlight={mess.messageId == targetMessageId ? true : false}
                />
              </div>
            );
          })
        : ""}
>>>>>>> ead7d2b (lastversion)
    </div>
  );
}

export default UserContent;
