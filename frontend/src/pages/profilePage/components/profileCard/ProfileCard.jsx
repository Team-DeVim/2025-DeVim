import { useState, useRef, useEffect } from "react";
import "./ProfileCard.css";
import { useNavigate } from "react-router";
import androidProfile from "./profileImage/androidProfile.png";
import { DEFAULT_PROFILE, thumbnailUrl, updateUserName, uploadProfileImage } from "../../../../api/DevimApi";


const ProfileCard = ({ accountInfo }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(androidProfile);
  const fileInputRef = useRef();
  const controllerRef = useRef(null);
  const [nameError, setNameError] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // ★ 업로드 대상 파일
  const [uploading, setUploading] = useState(false); // ★ 업로드 상태
  const objectUrlRef = useRef(null);       // ★ preview URL revoke 용

  // accountInfo
  const userNo = accountInfo?.userNo ?? -1;
  const [name, setName] = useState(accountInfo?.name ?? "알 수 없음");
  const id = accountInfo?.id ?? "unknown";
  const createdDt = accountInfo?.createdDt ?? new Date();;


  // 날짜 포멧터
  function formatDate(iso, tz = "Asia/Seoul") {
    if (!iso) return "";
    const d = new Date(iso);
    const y = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, year: "numeric" }).format(d);
    const m = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, month: "2-digit" }).format(d);
    const day = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, day: "2-digit" }).format(d);
    return `${y}-${m}-${day}`;
  }

  /* 이름변경시 */
  const validateName = (value) => {
    const gapValue = value.trim();
    const koreanRegex = /^[가-힣]{2,7}$/;
    const englishRegex = /^[a-zA-Z]{3,14}$/;

    if (!gapValue) {
      setNameError("이름: 필수 입력입니다.");
    } else if (!(koreanRegex.test(gapValue) || englishRegex.test(gapValue))) {
      setNameError(
        "이름: 한글, 영문 최대 7글자까지 입력 가능합니다.(특수기호, 공백 사용 불가)"
      );
    } else {
      setNameError("");
    }
    setName(value);
  };

  /* 프로필 파일 클릭시 첨부 */
  const handleProfileClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreview(imageURL);
    }
  };

  // 저장하기 -> 서버 업로드
  const handleSave = async () => {
    if (nameError) {
      alert(nameError);
      return;
    }


    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setUploading(true);
    setError("");

    // 실행할 작업들 구성
    const ops = [];
    if (selectedFile instanceof File) {
      ops.push({
        label: "프로필 이미지",
        promise: uploadProfileImage(userNo, selectedFile, controller.signal),
      });
    }
    if (name && String(name).trim().length > 0) {
      ops.push({
        label: "이름",
        promise: updateUserName(userNo, name, controller.signal),
      });
    }

    if (ops.length === 0) {
      setUploading(false);
      alert("변경할 내용이 없습니다.");
      return;
    }

    try {
      // 각 작업의 성공/실패를 개별 집계
      const settled = await Promise.allSettled(
        ops.map(({ promise }) => promise)
      );

      const failed = settled
        .map((r, i) => ({ r, label: ops[i].label }))
        .filter(({ r }) => r.status === "rejected" || r.value === false);

      if (failed.length === 0) {
        alert("프로필이 저장되었습니다."); // 모두 성공
      } else if (failed.length === ops.length) {
        setError("저장에 실패했습니다. 잠시 후 다시 시도해 주세요."); // 전부 실패
      } else {
        const names = failed.map((f) => f.label).join(", ");
        setError(`일부 항목 저장 실패: ${names}`);
        alert("일부 항목만 저장되었습니다.");
      }
    } catch (e) {
      if (e?.code === "ERR_CANCELED" || e?.name === "CanceledError") return;
      console.error(e);
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  /*취소하기*/
  const handleCancle = () => {
    navigate("/main");
  };

  // 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);


  return (
    <div className="profileCard">
      <div className="profileCard__group">
        <div className="profileCard__photo" onClick={handleProfileClick}>
          <img
            src={
              thumbnailUrl(userNo, 360, 360)}
            alt="프로필이미지"
            onError={(e) => { e.currentTarget.src = DEFAULT_PROFILE; }}
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

            <input type="text" value={id} readOnly />
          </div>
          <div className="profileCard__user-date">
            <p>
              계정 생성일 <i class="fa-solid fa-lock"></i>
            </p>
            <input type="text" value={formatDate(createdDt)} readOnly />
          </div>
          <div className="profileCard__sc">
            <button
              className="profileCard__save"
              onClick={handleSave}
              disabled={uploading}>
              {uploading ? "저장 중..." : "저장하기"}
            </button>
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
