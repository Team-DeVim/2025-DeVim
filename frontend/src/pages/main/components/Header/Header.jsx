import { useNavigate } from "react-router";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  // 메인으로
  const main = () => {
    navigate("/main");
  };
  // 회원가입
  const register = () => {
    navigate("/Register");
  };
  // 로그인
  const signUp = () => {
    navigate("/SignUp");
  };

  return (
    <header className="header">
      <div className="nav">
        <div className="logo" onClick={main}>
          DeVim
        </div>

        <nav className="menu">
          <a href="#">Q&A 게시판</a>
          <a href="#">게시판</a>
        </nav>

        <input
          type="text"
          className="search"
          placeholder="검색어를 입력해주세요"
        />

        <div className="auth">
          <button className="btn btn--sign" onClick={signUp}>
            로그인
          </button>
          <button className="btn btn--register" onClick={register}>
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}
