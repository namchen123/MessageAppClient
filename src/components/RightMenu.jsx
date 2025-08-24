<<<<<<< HEAD
import userImage from "./images/user.png";

function RightMenu() {
    return (
        <div class="col-3 border-start p-0 h-100">
            <div class="h-100">
                <div class="head d-flex justify-content-center align-content-center border-bottom"><p class="m-2 fs-5">Thông tin</p></div>
                <div class="d-flex rounded-1 d-flex flex-column align-items-center">
                    <img class="rounded-2" src={userImage} style={{ width: "80px", height: "80px" }} alt=""/>
                    <div>
                        <p class="UserName fs-5 fw-bold mt-2 mb-0">Nick</p>
                    </div>
                </div>
            </div>
=======
import { useContext, useEffect, useState } from "react";
import userImage from "./images/user.png";
import Context from "../Context";
import SearchMessage from "./SearchMessage";
import ListGroup from "./ListGroup";
import ListGroup2 from "./ListGroup2";

function RightMenu({ thisconversation, setThisConversation }) {
  const { decode, searchmessage, conversationchoose,setConversationchoose,setMessages, receiverId,initialize} =
    useContext(Context);
  const { conversationtype, setConversationType } = useContext(Context);
  const [receiver, setReceiver] = useState({});
  const [listuser, setListUser] = useState([]);
  useEffect(() => {
    console.log("sadasd", thisconversation);
    if (thisconversation && thisconversation.conversationMembers) {
      // Duyệt qua các thành viên và cập nhật title và avatarUrl
      let updatedConversation = { ...thisconversation }; // Sao chép thisconversation hiện tại

      if (thisconversation.conversationMembers.length <= 2) {
        for (
          let i = 0;
          i < updatedConversation.conversationMembers.length;
          i++
        ) {
          const member = updatedConversation.conversationMembers[i];
          if (member.userId != decode.nameid) {
            const newTitle = member.user.username;
            console.log("avatar", member.user.username);
            const newAvatarUrl = member.user.avatarUrl || userImage;

            // Kiểm tra nếu title hoặc avatarUrl thay đổi thì mới cập nhật
            if (
              updatedConversation.title !== newTitle ||
              updatedConversation.avatarUrl !== newAvatarUrl
            ) {
              updatedConversation.title = newTitle;
              updatedConversation.avatarUrl = newAvatarUrl;
              // Cập nhật lại thisconversation
              setThisConversation(updatedConversation);
            }
            break; // Dừng vòng lặp sau khi tìm thấy thành viên không phải là bạn
          }
        }
      }
    } else {
      console.warn(
        "thisconversation or thisconversation.conversationMembers is not a valid array"
      );
    }
  }, [thisconversation]);
  console.log(conversationtype);

  const [isFriend, setIsFriend] = useState(false);
  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(
          `https://localhost:7289/api/Users/is-friend?userId1=${decode.nameid}&userId2=${receiverId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setIsFriend(data.isFriend);
      } catch (error) {
        console.log(error);
      }
    }
    check();
  }, [thisconversation]);

  const [friendRequest, setFriendRequest] = useState(false);
  const [senderId, setSenderId] = useState(0);
  useEffect(() => {
    async function checkInvitation() {
      try {
        const res = await fetch(
          `https://localhost:7289/api/Users/is-invitation?userId1=${decode.nameid}&userId2=${receiverId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.isFriend) {
          setFriendRequest(true);
          setSenderId(data.senderId);
        } else {
          setFriendRequest(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkInvitation();
  }, [thisconversation]);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          `https://localhost:7289/api/Users/${receiverId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setReceiver(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    console.log("sss", receiverId);
    console.log("sss1", conversationtype);
  }, [receiverId]);

  async function sendFriendRequest() {
    try {
      const res = await fetch(`https://localhost:7289/api/Users/send-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: decode.nameid,
          receiverId,
          senderId: decode.nameid,
        }), // Chuyển đổi dữ liệu thành chuỗi JSON
      });
      const data = await res.json();
      console.log(data);
      setSenderId(decode.nameid);
      setFriendRequest(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function acceptfriend() {
    try {
      const res = await fetch(
        `https://localhost:7289/api/Friendships/acceptfriend`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: decode.nameid,
            receiverId,
            senderId: decode.nameid,
          }), // Chuyển đổi dữ liệu thành chuỗi JSON
        }
      );
      const data = await res.json();
      console.log(data);
      setIsFriend(true);
    } catch (error) {
      console.log(error);
    }
  }
  const [users, setUsers] = useState([]);
  async function fetchusers() {
    const res = await fetch(
      `https://localhost:7289/api/Users/getUsersExcept/${decode.nameid}?conversationId=${conversationchoose}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setUsers(data);
  }

  function handleFetch() {
    fetchusers();
  }

  async function handleAddUser() {
    console.log(listuser);
    try {
      const res = await fetch(
        `https://localhost:7289/api/Users/addUsers?conversationId=${conversationchoose}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(listuser),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed with status " + res.status);
      }

      const responseText = await res.text(); // hoặc res.json() nếu API trả về JSON
      console.log(responseText);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleLeaveGroup() {
    try {
      const res = await fetch(
        `https://localhost:7289/api/ConversationMembers/deleteMember/${decode.nameid}/${conversationchoose}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(listuser),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed with status " + res.status);
      }

      const responseText = await res.text(); // hoặc res.json() nếu API trả về JSON
      console.log(responseText);
      setConversationchoose(null);
      setMessages([]);
      initialize();
      alert("Rời nhóm thành công");
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  console.log(isFriend);
  console.log("request", friendRequest);
  return (
    <div class="col-3 border-start p-0 h-100">
      <div class="h-100">
        <div class="head d-flex justify-content-center align-content-center border-bottom">
          {!searchmessage ? (
            <p class="m-2 fs-5">Thông tin</p>
          ) : (
            <p class="m-2 fs-5">Tìm kiếm trong cuộc trò chuyện</p>
          )}
        </div>
        <div className="h-75">
          {!searchmessage ? (
            <div class="d-flex rounded-1 d-flex flex-column align-items-center">
              <img
                class="rounded-3"
                src={
                  thisconversation.avatarUrl
                    ? thisconversation.avatarUrl
                    : userImage
                }
                style={{ width: "80px", height: "80px" }}
                alt=""
              />
              <div>
                <p class="UserName fs-5 fw-bold mt-2 mb-0">
                  {receiver.username}
                </p>
              </div>
              {conversationtype === "Group Conversation" ? (
                <>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={handleFetch}
                      className="btn btn-info rounded-5"
                      data-bs-toggle="modal"
                      data-bs-target="#addmodal"
                    >
                      <i className="fa-solid fa-user-plus"></i>
                    </button>
                    <button
                      onClick={handleLeaveGroup}
                      className="btn btn-info rounded-5"
                    >
                      <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                  </div>
                  <div
                    class="modal fade"
                    id="addmodal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Thêm người vào nhóm
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <Context.Provider value={{ listuser, setListUser }}>
                            <ListGroup2 users={users} />
                          </Context.Provider>
                        </div>
                        <div class="modal-footer">
                          <button
                            onClick={handleAddUser}
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Thêm vào nhóm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : receiverId > 0 ? (
                <div className="d-flex">
                  {isFriend ? (
                    <p className="UserName fs-6 fw-light mt-2 mb-0">
                      Các bạn đã là bạn bè
                    </p>
                  ) : friendRequest ? (
                    senderId === decode.nameid ? (
                      <p className="UserName fs-6 fw-light mt-2 mb-0">
                        Đã gửi yêu cầu kết bạn
                      </p>
                    ) : (
                      <>
                        <p className="UserName fs-6 fw-light mt-2 mb-0">
                          Bạn có yêu cầu kết bạn với người này
                        </p>
                        <button
                          className="btn btn-light mx-1"
                          onClick={acceptfriend}
                        >
                          Chấp nhận
                        </button>
                      </>
                    )
                  ) : (
                    <>
                      <p className="UserName fs-6 fw-light mt-2 mb-0">
                        Người dùng này chưa kết bạn
                      </p>
                      <button
                        onClick={sendFriendRequest}
                        className="btn btn-light mx-1"
                      >
                        Kết bạn
                      </button>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div class="d-flex rounded-1 d-flex flex-column align-items-center">
              <SearchMessage />
            </div>
          )}
>>>>>>> ead7d2b (lastversion)
        </div>
    )
}

export default RightMenu
