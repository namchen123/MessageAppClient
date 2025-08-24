import "./style.css";
import userImage from "./images/user.png";
<<<<<<< HEAD
import Context from "../Context"
import { useContext } from "react";
=======
import Context from "../Context";
import { useContext, useEffect, useState } from "react";
>>>>>>> ead7d2b (lastversion)
import { Navigate, useNavigate } from "react-router";
function Header({ setFriend ,decode}) {
  const { isLoggedIn, setIsLoggedIn} = useContext(Context);
  const [open,setOpen] = useState(false);
  const [userinfo,setUserinfo] = useState([]);
  const [name, setName] = useState("")
  const [birth, setBirth] = useState('')
  let navigate = useNavigate();

  async function getUserInfor() {
      const res = await fetch(`https://localhost:7289/api/Users/${decode.nameid}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
      const data = await res.json();
      setBirth(data.birthDate ? data.birthDate.substring(0, 10): '')
      setName(data.username)
      setUserinfo(data)
      console.log("sdasd",data);
    }
    async function getPrivacy() {
      const res = await fetch(`https://localhost:7289/api/Users/getPrivacy/${decode.nameid}`,
          {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
          });
      const data = await res.json();
      setOpen(data)
      console.log("dhsadbadsj",data)
    }
  useEffect(() => {
    if(!decode) return 
    getUserInfor()
    getPrivacy()
  },[decode])

  async function setPrivacy() {
    try {
      const res = await fetch(`https://localhost:7289/api/Users/${decode.nameid}/setPrivacy`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
      });
      const data = await res.json();
    } catch (error) {
      console.log(error)
    }
    setOpen(!open)
  }

  async function setBirthdate(e) {
    try {
      const res = await fetch(`https://localhost:7289/api/Users/${decode.nameid}/setBirth?date=${e.target.value}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
      });
      const data = await res.text();
      setBirth(e.target.value);
    } catch (error) {
      console.log(error)
    }
    getUserInfor()
  }

  async function setnewname() {
    try {
      const res = await fetch(`https://localhost:7289/api/Users/${decode.nameid}/setName?name=${name}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
      });
      const data = await res.text();
      getUserInfor()
    } catch (error) {
      console.log(error)
    }
  }

  function Logout() {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate(-1);
  }

  return (
    <div id="header" class="border-bottom d-flex justify-content-between">
      <div className="mt-auto mb-auto">
        <button className="btn btn-primary" onClick={() => Logout()}>
          Đăng xuất
        </button>
      </div>

      <div class="d-flex rounded-1 d-flex justify-content-end align-items-center">
        <div class="btn-group">
          <button
            onClick={() => setFriend(false)}
            class="btn btn-primary"
            title="Tin nhắn"
          >
            <i class="fa-solid fa-message"></i>
          </button>
          <button
            onClick={() => setFriend(true)}
            class="btn btn-primary"
            title="Danh sách bạn bè"
          >
            <i class="fa-solid fa-address-book"></i>
          </button>
        </div>
        <button className="p-0 border-0 m-0" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          <img
            class="rounded-2"
            src={userImage}
            style={{ width: "70px", height: "70px" }}
            alt=""
          />
        </button>
        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin tài khoản</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <label for="Ten" className="form-label">Tên</label>
                <input className="form-control" type="text" onChange={e => setName(e.target.value)} value={name} name="Ten"/>
                <button className="btn btn-primary" onClick={setnewname}>Đổi tên</button>
              </div>
              <div class="mb-3">
                <label for="ngaySinh" class="form-label">Ngày sinh</label>
                <input onChange={setBirthdate} type="date" value={birth} class="form-control" id="ngaySinh" name="ngaySinh" />
              </div>
              <div class="form-check form-switch">
                <input onChange={setPrivacy} checked={open} class="form-check-input" type="checkbox" value="" id="checkNativeSwitch" />
                <label class="form-check-label" for="checkNativeSwitch">
                  Chỉ nhận tin nhắn từ bạn bè
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Header;
