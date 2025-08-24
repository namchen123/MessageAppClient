import { useContext, useEffect, useState } from "react";
import Context from "../Context";

function UserRegister() {
  const {
    setUser,
    userName,
    setUserName,
    email,
    setEmail,
    data,
    setData,
    shouldSkipEffect,
    setShouldSkipEffect,
  } = useContext(Context);

  console.log(data);
  function handleSubmit(e) {
    async function getUser() {
      const res = await fetch(
        `https://localhost:7289/api/Users/FindUser/${userName}/${email}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          }
      );
      const data = await res.text();
      setData(data);
    }
    setShouldSkipEffect(false);
    getUser();
    e.preventDefault();
  }

  

  return (
    <div>
      <form
        className="w-25 m-auto d-flex flex-column p-2 shadow rounded border-1"
        action=""
      >
        <label>Tên người dùng</label>
        <input
          className="form-control"
          type="text"
          placeholder="Tên người dùng"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          className="form-control"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className="mt-2 btn btn-primary"
          type="submit"
        >
          Tiếp tục
        </button>
      </form>
    </div>
  );
}

export default UserRegister;
