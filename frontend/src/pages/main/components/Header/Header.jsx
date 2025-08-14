import { useNavigate } from "react-router";
import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


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

	// 검색 기능
	const handleSearch=()=>{
		const query = document.getElementById("searchInput").ariaValueMax.trim();
		if(query) {
			navigate(`/search?qurty=${encodeURIComponent(query)}`);
		} else {
			alert("검색어 입력해주세요.");
		}
	}


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
          />
          <i
            class="fa-solid fa-magnifying-glass search-icon"
            onClick={handleSearch}
          ></i>
        </div>
        <div className="header__auth">
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
