import ThemeSwitch from '../../../../components/common/ThemeSwitch';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="nav">
                <div className="logo">DeVim</div>

                <nav className="menu">
                    <a href="#">Home</a>
                    <a href="#">게시판</a>
                </nav>

                <input type="text" className="search" placeholder="검색어를 입력해주세요" />

                <div className="auth">
                    <ThemeSwitch className="btn" name={"Switch Theme"} />
                    <button className="btn btn--sign">로그인</button>
                    <button className="btn btn--register">회원가입</button>
                </div>
            </div>
        </header>
    );
}
