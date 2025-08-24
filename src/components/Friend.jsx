import "./style.css";
import userImage from "./images/user.png";
import { useContext, useEffect, useState } from "react";
import Context from "../Context";
import FriendRequests from "./FriendRequests";
import EachFriend from "./EachFriend";

function Friend() {
  const { decode } = useContext(Context);
  const [friendList, setFriendList] = useState([]);
  const [frienndrequests, setFriendRequests] = useState([]);
  const [invitationlist, setInvitationlist] = useState(false);

  async function fetchfriends() {
      try {
        const res = await fetch(
          `https://localhost:7289/api/Users/friends/${decode.nameid}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
        );
        const data = await res.json();
        console.log("friends", data);
        setFriendList(data);
      } catch (error) {
        console.log(error);
      }
    }
  useEffect(() => {
    fetchfriends();
  }, [invitationlist]);

  useEffect(() => {
    async function fetchfriendrequests() {
      try {
        const res = await fetch(
          `https://localhost:7289/api/Users/friend-requests/received/${decode.nameid}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
        );
        const data = await res.json();
        console.log("requests", data);
        setFriendRequests(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchfriendrequests()
  }, [invitationlist]);

  return (
    <>
      <div class="col-3 h-100">
        <div class="form-control d-flex border-0">
          <input
            class="form-control rounded-end-0"
            type="text"
            placeholder="Tìm kiếm"
          />
          <button class="btn btn-primary rounded-start-0" title="Tìm kiếm">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div class="scrollBar">
          <div
            onClick={() => setInvitationlist(false)}
            class="item d-flex rounded-1"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style={{ width: "80px", height: "80px" }}
            >
              <i style={{ size: "10xs" }} class="fa-solid fa-users fa-3x"></i>
            </div>

            <div class="d-flex align-items-center">
              <p class="UserName fs-5 fw-bold mb-0">Danh sách bạn bè</p>
            </div>
            <div class="overlay"></div>
          </div>
          <div
            onClick={() => setInvitationlist(true)}
            class="item d-flex rounded-1"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style={{ width: "80px", height: "80px" }}
            >
              <i class="fa-solid fa-user-plus fa-3x"></i>
            </div>

            <div class="d-flex align-items-center">
              <p class="UserName fs-5 fw-bold mb-0">Lời mời kết bạn</p>
            </div>
            <div class="overlay"></div>
          </div>
        </div>
      </div>
      <div class="message col-9 border-start p-3 h-100 bg-dark-subtle">
        <div class="bg-white h-100">
          {invitationlist ? (
            <div class="overflow-y-auto" style={{ height: "600px" }}>
              {frienndrequests.map((fr) => (
                <FriendRequests key={fr.index} receiverId={fr.userId} avatarUrl={fr.avatarUrl} username={fr.username} />
              ))}
            </div>
          ) : (
            <>
              <div class="form-control d-flex border-0">
                <input
                  class="form-control rounded-end-0"
                  type="text"
                  placeholder="Tìm kiếm bạn bè"
                />
                <button
                  class="btn btn-primary rounded-start-0"
                  title="Tìm kiếm"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div class="overflow-y-auto" style={{ height: "600px" }}>
                {friendList.map((fr) => (
                  <EachFriend key={fr.index} fr={fr} fetchfriends={fetchfriends}/>                 
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Friend;
