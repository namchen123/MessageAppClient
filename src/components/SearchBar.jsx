function SearchBar() {
<<<<<<< HEAD
    return (
=======
  const { decode, search, setSearch } = useContext(Context);
  const [listuser, setListUser] = useState([parseInt(decode.nameid)]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [resetcheck, setResetCheck] = useState(false);
  const [conversationName, setConversationname] = useState("");
  async function fetchusers() {
    setIsLoading(true);
    const res = await fetch(
      `https://localhost:7289/api/Users/getUsers/${decode.nameid}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
    );
    const data = await res.json();
    console.log(data);
    setUsers(data);
    setIsLoading(false);
  }

  function handleFetch() {
    fetchusers();
  }

  async function handleCreateGroup() {
    console.log(JSON.stringify(listuser));
    console.log(Array.isArray(listuser));
    try {
      const res = await fetch(
        `https://localhost:7289/api/Conversations/createGroupConversation?name=${conversationName !== "" ? conversationName : null}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
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

  return (
    <NewContext.Provider value={{ listuser, setListUser }}>
      <div className="d-flex" style={{height: '7.5%'}}>
>>>>>>> ead7d2b (lastversion)
        <div class="form-control d-flex border-0">
            <input class="form-control rounded-end-0" type="text" placeholder="Tìm kiếm" />
            <button class="btn btn-primary rounded-start-0"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
<<<<<<< HEAD
    )
=======
        <button
          onClick={handleFetch}
          className="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i class="fa-solid fa-user-plus"></i>
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Tạo nhóm
                </h1>
                <button
                  onClick={()=>setConversationname("")}
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <input
                  value={conversationName}
                  onChange={(e) => setConversationname(e.target.value)}
                  type="text"
                  class="form-control rounded-end-0"
                  placeholder="Nhập tên nhóm"
                />
                <ListGroup
                  users={users}
                  resetcheck={resetcheck}
                  setResetCheck={setResetCheck}
                />
              </div>
              <div class="modal-footer">
                <button
                  onClick={() => setResetCheck(true)}
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleCreateGroup}
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Tạo nhóm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewContext.Provider>
  );
>>>>>>> ead7d2b (lastversion)
}

export default SearchBar
