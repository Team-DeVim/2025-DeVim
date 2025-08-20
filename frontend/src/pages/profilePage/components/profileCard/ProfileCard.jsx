import { useState, useRef } from "react";
import "./ProfileCard.css";
import { useNavigate } from "react-router";
import androidProfile from "./profileImage/androidProfile.png"; 


const ProfileCard = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("안드로이드");
	const [preview, setPreview] = useState(androidProfile);
	const fileInputRef = useRef();
	
	const [nameError, setNameError] = useState("");

	/* 이름변경시 */
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

/* 프로필 파일 클릭시 첨부 */
const handleProfileClick = ()=>{
	fileInputRef.current.click();
}
 const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

/*취소하기*/
const handleCancle = ()=>{
	navigate("/main");
};

  return (
    <div className="profileCard">
      <div className="profileCard__group">
        <div className="profileCard__photo" onClick={handleProfileClick}>
          <img
            src={preview || "/profileCard/androidProfile.png"}
            alt="프로필 사진"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div className="profileCard__user-info">
          <div className="profileCard__user-name">
            <p>
              이름 <i class="fa-solid fa-lock-open"></i>
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => validateName(e.target.value)}
            />
          </div>
          <div className="profileCard__user-id">
            <p>
              ID <i class="fa-solid fa-lock"></i>
            </p>

            <input type="text" value="android" readOnly />
          </div>
          <div className="profileCard__user-date">
            <p>
              계정 생성일 <i class="fa-solid fa-lock"></i>
            </p>
            <input type="text" value="계정생성일 DATE" readOnly />
          </div>
          <div className="profileCard__sc">
            <button className="profileCard__save">저장하기</button>
            <button className="profileCard__cancle" onClick={handleCancle}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
