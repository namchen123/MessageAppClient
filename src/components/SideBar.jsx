import ListUser from "./ListUser"
import SearchBar from "./SearchBar"

<<<<<<< HEAD
function SideBar() {
    return (
        <div className="col-3 h-100">
            <SearchBar />
            <ListUser />
        </div>
    )
=======
function SideBar({connection, setConnection}) {
  const { search, setSearch ,decode, conversationchoose} = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [userFounded, setUserFounded] = useState([]);

  useEffect(() => {
    
    async function fetchuserbyname() {
      console.log('adasd',sessionStorage.getItem("token"))
      try {
        const res = await fetch(
          `https://localhost:7289/api/Users/GetUserByName/${search}?userId=${decode.nameid}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
        );
        const data = await res.json();
        setUserFounded(data);
        console.log("Dữ liệu tìm được:", data);
      } catch (error) {
        console.log(error);
      } 
    }
    fetchuserbyname();
  }, [search]);


  return (
    <div className="col-3 h-100">
      <SearchBar />
      {userFounded.length > 0 ? (
        <div className="h-100 overflow-y-auto">
          {userFounded.map((user, index) => (
            <UserFound
              key={index}
              title={user.username}
              conversationImage={user.avatarUrl}
              userId = {user.userId}
            />
          ))}
        </div>
      ) : (
        <ListUser connection={connection} setConnection={setConnection}/>
      )}
    </div>
  );
>>>>>>> ead7d2b (lastversion)
}

export default SideBar
