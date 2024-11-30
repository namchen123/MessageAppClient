import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Context from "../Context";
function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
        navigate("/app");
    }
  }, [isLoggedIn, navigate, ]);

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("https://localhost:7289/api/Accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // Truyền username từ state
          password, // Truyền password từ state
        }),
      });

      if (!res.ok) {
        // Nếu API trả lỗi
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.message || "Đăng nhập không thành công"}`);
        return;
      }

      const data = await res.json();

      if (!data.token) {
        alert("Token không tồn tại trong phản hồi từ server.");
        return;
      }

      // Lưu token vào sessionStorage
      sessionStorage.setItem("token", data.token);

      // Chuyển hướng người dùng tới trang "app"
      setIsLoggedIn(true);
    } catch (error) {
      // Xử lý lỗi kết nối
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      alert("Đã xảy ra lỗi kết nối, vui lòng thử lại.");
    }
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="w-25 m-auto d-flex flex-column p-2 shadow rounded border-1"
    >
      <div className="form-group">
        <label>Tài khoản</label>
        <input
          className="form-control"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <span className="text-danger"></span>
      </div>
      <div className="form-group mt-2">
        <label>Mật khẩu</label>
        <input
          type="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
        />
        <span className="text-danger"></span>
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Login
      </button>
      <div className="d-flex justify-content-end mt-2">
        <a>Chưa có tài khoản, đăng kí ngay</a>
      </div>
    </form>
  );
}

export default LoginPage;
