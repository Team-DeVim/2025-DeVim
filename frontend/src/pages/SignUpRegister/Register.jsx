import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Register() {
  const navigate = useNavigate();

  //[id, password, name, birth, gender, foreigner, phone]
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
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

  // 메인으로 가기
  const main = () => {
    navigate("/main");
  };

  // 아이디 체크
  const validateId = (value) => {
    const specialText = /[!@#$%^&*(),.?":{}|<>]/;
    if (!value) {
      setIdError("아이디: 필수 입력해주세요.");
    } else if (specialText.test(value)) {
      setIdError("아이디: 특수문자를 입력할 수 없습니다.");
    } else {
      setIdError("");
    }
    setid(value);
  };

  // 비밀번호 체크
  const validatePassword = (value) => {
    const specialText = /[!@#$%^&*(),.?":{}|<>]/g;
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
    const nameRegex = /^[a-zA-Z가-힣]{2,5}$/;
    if (!gapValue) {
      setNameError("이름: 필수 입력입니다.");
    } else if (!nameRegex.test(value)) {
      setNameError(
        "이름: 한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)"
      );
    } else {
      setNameError("");
    }
    setName(value);
  };

  // 생년월일 자동포맷체크
  const formatBirthDate = (value) => {
    const onlyNumber = value.replace(/\D/g, "").slice(0, 8);

    if (onlyNumber.length !== 8) return value;

    const year = onlyNumber.slice(0, 4);
    const month = onlyNumber.slice(4, 6);
    const day = onlyNumber.slice(6, 8);

    return `${year}년 ${month}월 ${day}일`;
  };

  // 생년월일 체크
  const validateBirth = (value) => {
    if (!value) {
      setBirthError("생년월일: 필수 입력입니다.");
      setBirth("");
      return;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      setBirthError("유효한 날짜를 선택해주세요.");
      setBirth("");
      return;
    }

    // 오늘 날짜보다 미래 선택 방지
    const today = new Date();
    if (date > today) {
      setBirthError("미래 날짜는 선택할 수 없습니다.");
      setBirth("");
      return;
    }

    setBirthError("");
    setBirth(value); // YYYY-MM-DD 형식 그대로 저장
    setBirthFormatted(formatBirthDate(value.replace(/-/g, ""))); // YYYY년 MM월 DD일 포맷 저장
  };

  // 성별 선택
  const handleGenderSelect = (selected) => {
    setGender(selected);
  };

  // 핸드폰 체크
  const validatePhone = (value) => {
    const onlyNumber = value.replace(/\s+/g, "");
    let formatted = value;
    if (onlyNumber.length === 11) {
      formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(
        3,
        7
      )}-${onlyNumber.slice(7)}`;
    }

    const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;

    if (!onlyNumber) {
      setPhoneError("휴대전화번호: 필수 입력입니다.");
    } else if (!phoneRegex.test(onlyNumber)) {
      setPhoneError(
        "휴대전화번호: 형식이 올바르지 않습니다. 예: 010-1234-5678"
      );
    } else {
      setPhoneError("");
    }

    setPhone(formatted);
  };
  // 핸드폰 자동포맷체크
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const formatted = raw.replace(/\D/g, "");

    setPhone(formatted);
    validatePhone(formatted);
  };
  //인증요청
  const handleCheckRequest = () => {
    // 입력값이 없거나, 공백이 있을때
    if (
      !id.trim() ||
      !password.trim() ||
      !name.trim() ||
      !birth.trim() ||
      !gender ||
      !phone.trim()
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

    // 실제 전송 로직 (예: API 호출)
    //sendCheckRequest();
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
        회원가입
        <div className="register__user-info">
          <div className="register__group--id">
            <i className="register__icon fa-solid fa-envelope"></i>
            <input
              className="register__input--id"
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => validateId(e.target.value)}
            />
            <div className="register__suffix--email">@naver.com</div>
          </div>

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

          {idError && <p className="register__error-message">{idError}</p>}
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
            )}

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
    </div>
  );
}
