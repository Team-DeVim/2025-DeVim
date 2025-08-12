import { useNavigate } from "react-router";
import "./SignUp.css";
import { useEffect, useState } from "react";
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>;

export default function SignUp() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("id");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({ id: false, password: false });

	useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_APP_KEY"); // 카카오 개발자 콘솔에서 발급받은 앱 키
    }
  }, []);

  /*카카오 로그인 버튼*/
  const handleLoginTypeChange = (type) => {
		setActiveTab(type);
  };
	
	/*카카오 로그인  08.12 미구현*/
	
	// const kakaoLogin = () =>{
	// 	window.Kakao.Auth.login({
  //     success: function (authObj) {
  //       console.log("카카오 로그인 성공", authObj);
  //       window.Kakao.API.request({
  //         url: "/v2/user/me",
  //         success: function (res) {
  //           console.log("사용자 정보", res);
  //           // 여기서 서버에 사용자 정보 전달해서 회원가입 or 로그인 처리
  //         },
  //         fail: function (error) {
  //           console.error("사용자 정보 요청 실패", error);
  //         },
  //       });
  //     },
  //     fail: function (err) {
  //       console.error("카카오 로그인 실패", err);
  //     },
  //   });
	// }
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

  // 메인으로
  const main = () => {
    navigate("/main");
  };

  // 회원가입창으로
  const register = () => {
    navigate("/Register");
  };

  // 비밀번호 찾기
  const passwordFind = () => {};
  return (
    <div className="loginContainer">
      <div className="logoWrapper">
        <button className="logo_Devim" onClick={main}>
          DeVim
        </button>
        <span className="logoHoverText">메인으로</span>
      </div>
      로그인
      <div className="">
        <div className="login_MenuType">
          <button
            onClick={() => setActiveTab("id")}
            className={activeTab === "id" ? "active" : ""}
          >
            ID/이메일
          </button>
          <button
            onClick={() => handleLoginTypeChange("kakao")}
            className={activeTab === "kakao" ? "active" : ""}
          >
            카카오 로그인
          </button>
        </div>
      </div>
      <div className="loginBackGround">
        <div className="loginForm">
          <input
            className="input_id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onFocus={() => setIsFocused({ ...isFocused, id: true })}
            onBlur={() => setIsFocused({ ...isFocused, id: false })}
            placeholder={activeTab == "kakao" ? "카카오아이디" : "아이디"}
          />
          <input
            className="input_password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsFocused({ ...isFocused, password: true })}
            onBlur={() => setIsFocused({ ...isFocused, password: false })}
            placeholder="비밀번호"
          />
        </div>
        <button
          className={`loginButton ${activeTab === "kakao" ? "kakao" : ""}`}
        >
          {activeTab === "kakao" ? "카카오 로그인" : "로그인"}
        </button>

        <div className="loginOptions">
          <button onClick={passwordFind}>비밀번호 찾기</button>
          <button onClick={register}>회원가입</button>
        </div>
      </div>
    </div>
  );
}
