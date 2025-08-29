
import { Link, useNavigate, useSearchParams } from "react-router";
import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeSwitch from '../../../../components/common/ThemeSwitch';
import { useState } from "react";
import { createSearchParams } from "react-router-dom";
import { getToken } from "../../../../api/DevimApi";


export default function Header() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const isLogin = !!getToken();

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
    navigate("/login");
  };

  // 게시판 이동
  const toFree = {
    pathname: "/boardPage",
    search: `?${createSearchParams({
      page: "1",
      size: "7",
      boardTypeNo: "1",
    })}`,
  };

  const toQna = {
    pathname: "/boardPage",
    search: `?${createSearchParams({
      page: "1",
      size: "7",
      boardTypeNo: "2",
    })}`,
  };


  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__logo" onClick={main}>
          DeVim
        </div>


        <nav className="header__menu">
          <Link to={toFree}>자유게시판</Link>
          <Link to={toQna}>Q&A 게시판</Link>
        </nav>
        <div className="header__search">
          <input
            type="text"
            className="header__search--input"
            placeholder="검색어를 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <i
            class="fa-solid fa-magnifying-glass search-icon"
            onClick={handleSearch}
          ></i>
        </div>
        <div className="header__auth">
          <ThemeSwitch className="btn" name={"Switch Theme"} />
          {isLogin ? (
            <div>
              <nav className="head__auth--login">
                <Link to="/editorPage" reloadDocument>글쓰기</Link>
                <Link to="/profilePage" reloadDocument>마이페이지</Link>
              </nav>
            </div>
          ) : (
            <div>
              <button className="btn btn--sign" onClick={signUp}>
                로그인
              </button>
              <button className="btn btn--register" onClick={register}>
                회원가입
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
