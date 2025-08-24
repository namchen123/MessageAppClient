import userImage from "./images/user.png";
import Context from "../Context";
import { useContext } from "react";
import "./style.css";
<<<<<<< HEAD
function User({ title, conversationId, latestmessages ,conversationImage}) {
  const { setConversationchoose } = useContext(Context);
  
=======
function User({ title, conversationId, latestmessages ,conversationImage,isOnline}) {
  const { setConversationchoose ,conversationchoose, post} = useContext(Context);
  // const [newmessage, setNewmessage] = useState(latestmessages && latestmessages.length > 0 ? latestmessages[0].content : "")
  // useEffect(function(){
  //   if(post){
  //     if(post.conversationId==conversationId){
  //       setNewmessage(post.content)
  //       console.log("new message", newmessage)
  //     }
  //   }
    
  // },[post])
  useEffect(function(){
    console.log("conversationchoose",conversationchoose)
  },[conversationchoose])


>>>>>>> ead7d2b (lastversion)
  return (
    <div
      className="item d-flex rounded-1"
      onClick={() => setConversationchoose(conversationId)}
    >
      <img
        className="mt-2"
        src={conversationImage ? conversationImage : userImage}
        style={{ width: "60px", height: "60px" , borderRadius: "60px"}}
        alt=""
      />
      <div className="m mx-2">
        <p className="UserName fs-5 fw-bold mt-2 mb-0">{title}</p>
        <p>{latestmessages.length ? latestmessages[0].content : ""}</p>
      </div>
      <div className="overlay"></div>
      <span style={{ color: isOnline ? "green" : "gray" }}>
              {isOnline ? "🟢 Online" : "⚪ Offline"}
      </span>
    </div>
  );
}

export default User;
