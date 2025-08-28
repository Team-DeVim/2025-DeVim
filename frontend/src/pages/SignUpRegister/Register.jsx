import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { signUp } from "../../api/DevimApi";

export default function Register() {
  const navigate = useNavigate();

  //[id, password, name, birth, gender, foreigner, phone]
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birth, setBirth] = useState("");
  const [birthFormatted, setBirthFormatted] = useState(""); // "YYYY년 MM월 DD일"
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  //Error 메세지 [id, password, name, birth, gender, foreigner, phone]
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // 메인으로 가기
  const main = () => {
    navigate("/main");
  };

  // 아이디 체크
  const validateId = (value) => {
    const specialText = /[!@#$%^&*(),.?":{}|<>]/; // 특수문자 정규식표현 제한
    if (!value) { // if 으로 조건 실행
      setIdError("아이디: 필수 입력해주세요.");
    } else if (specialText.test(value)) { // 그게 아니면 밑 코드 실행
      setIdError("아이디: 특수문자를 입력할 수 없습니다.");
    } else {
      setUsername("");
    }
    setUsername(value);
  };

  // 비밀번호 체크
  const validatePassword = (value) => {
    const specialText = /[!@#$%^&*(),.?":{}|<>]/g; // 특수문자 정규식표현 제한
    const matches = value.match(specialText);
    const count = matches ? matches.length : 0;

    if (!value) {
      setPasswordError("비밀번호: 필수 입력해주세요.");
    } else if (count < 1 || count > 2) {
      setPasswordError("비밀번호: 특수문자를 1~2개 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  // 이름 체크
  const validateName = (value) => {
    const gapValue = value.trim();
    const koreanRegex = /^[가-힣]{2,3}$/;
    const englishRegex = /^[a-zA-Z]{3,8}$/;

    if (!gapValue) {
      setNameError("이름: 필수 입력입니다.");
    } else if (!(koreanRegex.test(gapValue) || englishRegex.test(gapValue))) {
      setNameError(
        "이름: 한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)"
      );
    } else {
      setNameError("");
    }
    setName(value);
  };

  // // 생년월일 자동포맷체크
  // const formatBirthDate = (value) => {
  //   const onlyNumber = value.replace(/\D/g, "").slice(0, 8);

  //   if (onlyNumber.length !== 8) return value;

  //   const year = onlyNumber.slice(0, 4);
  //   const month = onlyNumber.slice(4, 6);
  //   const day = onlyNumber.slice(6, 8);

  //   return `${year}년 ${month}월 ${day}일`;
  // };

  // // 생년월일 체크
  // const validateBirth = (value) => {
  //   if (!value) {
  //     setBirthError("생년월일: 필수 입력입니다.");
  //     setBirth("");
  //     return;
  //   }

  //   const date = new Date(value);
  //   if (isNaN(date.getTime())) {
  //     setBirthError("유효한 날짜를 선택해주세요.");
  //     setBirth("");
  //     return;
  //   }

  //   // 오늘 날짜보다 미래 선택 방지
  //   const today = new Date();
  //   if (date > today) {
  //     setBirthError("미래 날짜는 선택할 수 없습니다.");
  //     setBirth("");
  //     return;
  //   }

  //   setBirthError("");
  //   setBirth(value); // YYYY-MM-DD 형식 그대로 저장
  //   setBirthFormatted(formatBirthDate(value.replace(/-/g, ""))); // YYYY년 MM월 DD일 포맷 저장
  // };

  // // 성별 선택
  // const handleGenderSelect = (selected) => {
  //   setGender(selected);
  // };

  // // 핸드폰 체크
  // const validatePhone = (value) => {
  //   const onlyNumber = value.replace(/\s+/g, "");
  //   let formatted = value;
  //   if (onlyNumber.length === 11) {
  //     formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(
  //       3,
  //       7
  //     )}-${onlyNumber.slice(7)}`;
  //   }

  //   const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;

  //   if (!onlyNumber) {
  //     setPhoneError("휴대전화번호: 필수 입력입니다.");
  //   } else if (!phoneRegex.test(onlyNumber)) {
  //     setPhoneError(
  //       "휴대전화번호: 형식이 올바르지 않습니다. 예: 010-1234-5678"
  //     );
  //   } else {
  //     setPhoneError("");
  //   }

  //   setPhone(formatted);
  // };
  // // 핸드폰 자동포맷체크
  // const handlePhoneChange = (e) => {
  //   const raw = e.target.value;
  //   const formatted = raw.replace(/\D/g, "");

  //   setPhone(formatted);
  //   validatePhone(formatted);
  // };

  // 백엔드 API 호출 함수
  // const sendRegisterRequest = async (userData) => {
  //   try {
  //     const response = await fetch("/api/users/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       // 회원가입 성공
  //       alert(`회원가입이 완료되었습니다!\n환영합니다, ${result.name}님!`);
  //       navigate("/login"); // 로그인 페이지로 이동
  //     } else {
  //       // 회원가입 실패
  //       throw new Error(result.message || "회원가입에 실패했습니다.");
  //     }
  //   } catch (error) {
  //     console.error("회원가입 오류:", error);
  //     throw error;
  //   }
  // };

  //인증요청
  const handleCheckRequest = async () => {
    // 입력값이 없거나, 공백이 있을때
    if (
      !username.trim() ||
      !password.trim() ||
      !name.trim()
    ) {
      setSubmitError("나머지 정보를 입력해주세요");
      return;
    }

    // 에러가 1개라도 존재하면 메세지 출력
    if (idError || passwordError || nameError || birthError || phoneError) {
      setSubmitError("필수입력 혹은 입력값이 잘못되었습니다.");
      return;
    }

    // 모든 값에 에러가 없으면 에러메세지 초기화하고 전송 진행
    setSubmitError("");

    if (loading) return;
    setErr("");
    setLoading(true);

    try {
      await signUp({ username, password, name });
      alert("회원가입이 완료되었습니다. 로그인해주세요!");
      navigate("/login"); // ✅ 회원가입 후 로그인 페이지로 리다이렉트
    } catch (e) {
      setErr("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }

  };

  /*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

  return (
    <div className="register">
      <div>
        <div className="register__logo-group">
          <button className="register__logo" onClick={main}>
            DeVim
          </button>
          <span className="register__logo-hover-text">메인으로</span>
        </div>
        &#32;회원가입
        <div className="register__user-info">
          <div className="register__group--id">
            <i className="register__icon fa-solid fa-envelope"></i>
            <input
              className="register__input--id"
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => validateId(e.target.value)}
            />
            <div className="register__suffix--email">@naver.com</div>
          </div>
          {idError && <p className="register__error-message">{idError}</p>}
          <div className="register__group--password">
            <i className="register__icon fa-solid fa-lock"></i>
            <input
              className="register__input--password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
            />
          </div>

          {passwordError && (
            <p className="register__error-message">{passwordError}</p>
          )}

          <div className="register__group--name">
            <i className="register__icon fa-solid fa-user"></i>
            <input
              type="text"
              className="register__input--name"
              placeholder="이름"
              value={name}
              onChange={(e) => validateName(e.target.value)}
            />
          </div>
          {/* 
          <div className="register__group--birth">
            <i className="register__icon fa-solid fa-calendar-days"></i>
            <input
              type="date"
              className="register__input--birth"
              placeholder="생년월일(예 : 19990310)"
              value={birth}
              onChange={(e) => validateBirth(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          {nameError && <p className="register__error-message">{nameError}</p>}

          {birthError && (
            <p className="register__error-message">{birthError}</p>
          )}

          <div className="register__form-section">
            <div className="register__group--gender">
              <div className="register__gender-options">
                <button
                  className={`register__gender-button ${
                    gender === "남자" ? "register__gender-button--selected" : ""
                  }`}
                  onClick={() => handleGenderSelect("남자")}
                >
                  남자
                </button>

                <button
                  className={`register__gender-button ${
                    gender === "여자" ? "register__gender-button--selected" : ""
                  }`}
                  onClick={() => handleGenderSelect("여자")}
                >
                  여자
                </button>
              </div>
            </div>

            <br />

            <div className="register__group--phone">
              <i className="register__icon fa-solid fa-square-phone"></i>
              <input
                type="text"
                className="register__input--phone"
                placeholder="핸드폰번호"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={13}
              />
            </div>

            {phoneError && (
              <p className="register__error-message">{phoneError}</p>
            )} */}

          <button
            className="register__submit-button"
            type="submit"
            onClick={handleCheckRequest}
          >
            회원가입
          </button>

          {submitError && (
            <p
              className="register__error-message"
              style={{ marginTop: "8px" }}
            >
              {submitError}
            </p>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
}
