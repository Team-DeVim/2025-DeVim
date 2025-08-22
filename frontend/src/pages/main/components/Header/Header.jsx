
import { useNavigate } from "react-router";
import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeSwitch from '../../../../components/common/ThemeSwitch';
import { useState } from "react";


export default function Header() {
  const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");

  // 메인으로
  const main = () => {
    navigate("/main");
  };
  // 회원가입
  const register = () => {
    navigate("/Register");
  };
	// 게시판 검색기능
	 const handleSearch = () => {
     if (keyword.trim()) {
       navigate(`/boardPage?search=${encodeURIComponent(keyword)}`);
     }
   };
	 const handleKeyPress = (e) => {
     if (e.key === "Enter") {
       handleSearch();
     }
   };

  // 로그인
  const signUp = () => {
    navigate("/SignUp");
  };



  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__logo" onClick={main}>
          DeVim
        </div>


        <nav className="header__menu">
          <a href="#">자유게시판</a>
          <a href="#">Q&A 게시판</a>
        </nav>
        <div className="header__search">
          <input
            type="text"
            className="header__search--input"
            placeholder="검색어를 입력해주세요"
						value={keyword}
						onChange={(e)=>setKeyword(e.target.value)}
						onKeyPress={handleKeyPress}
          />
          <i
            class="fa-solid fa-magnifying-glass search-icon"
            onClick={handleSearch}
          ></i>
        </div>
        <div className="header__auth">
          <ThemeSwitch className="btn" name={"Switch Theme"} />
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
