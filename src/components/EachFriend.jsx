import userImage from "./images/user.png";

function EachFriend({fr,fetchfriends}) {

    async function deletefriend() {
        console.log(fr)
        const id = fr.friendshipUserId1Navigations[0].id
        try {
        const res = await fetch(
            `https://localhost:7289/api/Friendships/${id}`,{
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                  }
            }
        );
        fetchfriends()
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div class="item1 d-flex rounded-1 border-bottom">
      <div
        class="d-flex justify-content-center align-items-center"
        style={{ width: "80px", height: "80px" }}
      >
        <img
          class="rounded-2"
          src={fr.avatarUrl ? fr.avatarUrl : userImage}
          style={{ width: "50px", height: "50px" }}
          alt=""
        />
      </div>
      <div class="d-flex align-items-center">
        <p class="UserName fs-5 fw-bold mb-0">{fr.username}</p>
      </div>
      <div class="d-flex w-100 justify-content-end dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            <button class="dropdown-item">Nhắn tin</button>
          </li>
          <li>
            <button onClick={deletefriend} class="dropdown-item">Xóa kết bạn</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EachFriend;
