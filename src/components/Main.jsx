import { useEffect, useState } from "react";
import Content from "./Content";
import RightMenu from "./RightMenu";
import SideBar from "./SideBar";
import "./style.css";

import { jwtDecode } from "jwt-decode";
import Context from "../Context";
function Main() {
  const [conversationchoose, setConversationchoose] = useState(null);
  const [decode, setDecode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

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

  useEffect(() => {
    async function initialize() {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setDecode(decoded);
  
          // Fetch conversations ngay sau khi decode
          setIsLoading(true);
          const res = await fetch(
            `https://localhost:7289/getconversationbyuserid/${decoded.nameid}`
          );
          const data = await res.json();
          data.forEach((conv) => {
            const { conversationMembers } = conv;
            for (let index = 0; index < conversationMembers.length; index++) {
              const member = conversationMembers[index];
              if (member.userId != decoded.nameid) {
                conv.title = member.user.username;
                conv.avatarUrl = member.user.avatarUrl;
                break;
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
  
    initialize();
  }, []);

  console.log(decode)

  if (isLoading || !decode) {
    return <div>Loading...</div>;
  }

  return (
    <Context.Provider value={{conversations, setConversations , decode , isLoading, setIsLoading, conversationchoose, setConversationchoose}}>
      <div className="main row h-100">
        <SideBar />
        <Content />
        <RightMenu />
      </div>
    </Context.Provider>
  );
}

export default Main;
