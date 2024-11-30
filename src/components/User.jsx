import userImage from "./images/user.png";
import Context from "../Context";
import { useContext } from "react";
import "./style.css";
function User({ title, conversationId, latestmessages ,conversationImage}) {
  const { setConversationchoose } = useContext(Context);
  
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
    </div>
  );
}

export default User;
