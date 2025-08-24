import { useContext, useEffect, useState } from "react"
import Context from "../Context";
import User from "./User";
import UserCheck from "./UserCheck";
import NewContext from "../NewContext";

function ListGroup2({users, resetcheck, setResetCheck}) {
    const [isLoading, setIsLoading] = useState(true);
    const {listuser, setListUser} = useContext(Context);
    const {decode} = useContext(Context)
    useEffect(
      function () {
        if (resetcheck) {
          setListUser([parseInt(decode.nameid)]);
          setResetCheck(!resetcheck);
        }
      },
      [resetcheck]
    );

    function handleAddUser(userid) {
      setListUser([...listuser,userid])
    }

    function handleDeleteUser(userid){
      setListUser(listuser.filter(user => user !== userid))
    }
    console.log("listuser",listuser)

    return (
        <div>
            {users.map((user, index) => (
            <UserCheck
              key={index}
              title={user.username}
              conversationImage={user.avatarUrl}
              userId = {user.userId}
              handleAddUser = {handleAddUser}
              resetcheck= {resetcheck}
              setResetCheck={setResetCheck}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </div>
    )
}

export default ListGroup2
