import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserDetailPage.css";

// 간단한 목업 조회
function getMockUser(userNo) {
  return {
    userNo,
    id: `user${userNo}`,
    password: "********",
    name: `사용자 ${userNo}`,
    createdDate: "2025-08-01",
    delete_flag: user.delete_flag, // 0 or 1
  };
}

export default function UserDetailPage() {
  const { userNo } = useParams();
  const navigate = useNavigate();
  const user = useMemo(() => getMockUser(Number(userNo)), [userNo]);

  const [form, setForm] = useState({
    id: user.id,
    password: "",
    name: user.name,
    createdDate: user.createdDate,
    active: user.active ? "Y" : "N",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    console.log("SAVE USER", { userNo, ...form });
    alert("수정내용 저장(목업)");
  };

  const onDelete = () => {
    if (!window.confirm("정말 계정을 삭제하시겠습니까?")) return;
    console.log("DELETE USER", userNo);
    alert("계정 삭제(목업)");
    navigate("/admin/users");
  };

  return (
    <div className="admin-user-detail">
      <div className="admin-user-detail__panel">
        <div className="admin-user-detail__avatar" aria-label="profile" />

        <div className="admin-user-detail__form">
          <label className="admin-user-detail__label">ID</label>
          <input
            className="admin-user-detail__input"
            name="id"
            value={form.id}
            onChange={onChange}
            placeholder="Value"
          />

          <label className="admin-user-detail__label">PW</label>
          <input
            className="admin-user-detail__input"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Value"
          />

          <label className="admin-user-detail__label">이름</label>
          <input
            className="admin-user-detail__input"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Value"
          />

          <label className="admin-user-detail__label">계정 생성일</label>
          <input
            className="admin-user-detail__input"
            name="createdDate"
            value={form.createdDate}
            onChange={onChange}
            placeholder="YYYY-MM-DD"
          />

          <label className="admin-user-detail__label">계정 활성 여부</label>
          <select
            className="admin-user-detail__input"
            name="delete_flag"
            value={form.delete_flag}
            onChange={onChange}
          >
            <option value="Y">Y</option>
            <option value="N">N</option>
          </select>
        </div>

        <div className="admin-user-detail__actions">
          <button className="btn btn--primary" onClick={onSave}>
            수정내용 저장
          </button>
          <button className="btn" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
          <button className="btn btn--danger" onClick={onDelete}>
            계정 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
