import { useNavigate } from "react-router";
import "./SignUp.css";
import { useEffect, useState } from "react";
import { fetchMyInfo, login } from "../../api/DevimApi";
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>;

export default function SignUp() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("id");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({ id: false, password: false });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");


  const loginClick = async () => {
    if (loading) return;
    setErr("");
    setLoading(true);
    try {
      await login(id, password);    // 토큰 발급 및 저장
      navigate("/main");      // ✅ 로그인 성공 후 /main 으로 이동
    } catch (e) {
      setErr("로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_APP_KEY"); // 카카오 개발자 콘솔에서 발급받은 앱 키
    }
  }, []);

  /*카카오 로그인 버튼*/
  const handleLoginTypeChange = (type) => {
    setActiveTab(type);
  };

  /*카카오 로그인  08.12 미구현 / 8.15 */

  const kakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            console.log("사용자 정보", res);
            // 여기서 서버에 사용자 정보 전달해서 회원가입 or 로그인 처리
          },
          fail: function (error) {
            console.error("사용자 정보 요청 실패", error);
          },
        });
      },
      fail: function (err) {
        console.error("카카오 로그인 실패", err);
      },
    });
  }
  /*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

  // 메인으로
  const main = () => {
    navigate("/main");
  };

  // 회원가입창으로
  const register = () => {
    navigate("/Register");
  };

  return (
    <>
      <div className="signup">
        <div className="signup__logo-group">
          <button className="signup__logo" onClick={main}>
            DeVim
          </button>
          <span className="signup__logo-hover-text">메인으로</span>
        </div>
        &#32;로그인
        <div className="signup__menu">
          <div className="signup__menu-type">
            <button
              onClick={() => setActiveTab("id")}
              className={"signup__menu-button"}
            >
              ID/이메일
            </button>
          </div>
        </div>
        <div className="signup__background">
          <div className="signup__form">
            <input
              className="signup__input signup__input--id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, id: true })}
              onBlur={() => setIsFocused({ ...isFocused, id: false })}
              placeholder="아이디"
            />
            <input
              className="signup__input signup__input--password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, password: true })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
              placeholder="비밀번호"
            />
          </div>

          <button className="signup__login-button" onClick={loginClick} disabled={loading}>
            로그인
          </button>
          <button
            className="signup__kakaologin-button"
            type="submit"
            onClick={kakaoLogin}
          >
            카카오 로그인
          </button>

          <div className="signup__join">
            <button onClick={register}>회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
}
