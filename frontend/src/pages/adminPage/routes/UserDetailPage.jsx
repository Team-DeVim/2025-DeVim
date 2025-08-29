// src/pages/adminPage/routes/UserDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api/DevimApi";
import "./UserDetailPage.css";

const PATH = {
  detail: (userNo) => `/api/v1/users/${encodeURIComponent(userNo)}`,
  update: (userNo) => `/api/v1/users/${encodeURIComponent(userNo)}`,
  logicalDelete: (userNo) => `/api/v1/users/${encodeURIComponent(userNo)}`,
  forceDelete: (userNo) => `/api/v1/users/${encodeURIComponent(userNo)}/force`,
  reactivate: (userNo) =>
    `/api/v1/users/${encodeURIComponent(userNo)}/reactivate`,
};

const API_BASE =
  (typeof window !== "undefined" && window?.__API_BASE__) ||
  (api?.defaults?.baseURL ? api.defaults.baseURL.replace(/\/$/, "") : "") ||
  (import.meta?.env?.VITE_API_BASE
    ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
    : "");

function mapUser(raw) {
  const df = raw.deleteFlag ?? raw.delete_flag;
  const active = df === 0 || df === false;
  if (!raw) return null;
  return {
    userNo: raw.userNo,
    loginId: raw.id,
    name: raw.name ?? "",
    createdAt: (raw.createdDt || "").slice(0, 10),
    active: !(raw.deleteFlag ?? false),
    social: !!raw.social,
    avatar: raw.profileImagePath || null,
    roles: Array.isArray(raw.roleList) ? raw.roleList.map((r) => r.role) : [],
    __raw: raw,
  };
}

function buildUpdatePayload(u) {
  return { name: u.name };
}

export default function UserDetailPage() {
  const { userNo } = useParams();
  const nav = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  /** 상세 조회 */
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const { data } = await api.get(PATH.detail(userNo), {
          signal: ac.signal,
        });
        const u = mapUser(data);
        setUser(u);
        setForm({ name: u?.name ?? "" });
      } catch (e) {
        if (e?.name !== "CanceledError") {
          console.error(e);
          alert("유저 정보를 불러오지 못했습니다.");
        }
      }
    })();
    return () => ac.abort();
  }, [userNo]);

  if (!user) return <div className="admin-users__panel">로딩중…</div>;

  const onSave = async () => {
    try {
      setBusy(true);
      const payload = buildUpdatePayload({ ...user, ...form });
      await api.patch(PATH.update(user.userNo), payload);
      const fresh = await api.get(PATH.detail(user.userNo));
      setUser(mapUser(fresh.data));
      setEditing(false);
      alert("저장했습니다.");
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    } finally {
      setBusy(false);
    }
  };

  const onLogicalDelete = async () => {
    if (!confirm("해당 사용자를 비활성 하시겠습니까?")) return;
    try {
      setBusy(true);
      await api.delete(PATH.logicalDelete(user.userNo));
      setUser((prev) => (prev ? { ...prev, active: false } : prev));
      alert("비활성 완료");
    } catch (e) {
      console.error(e);
      alert("비활성 실패");
    } finally {
      setBusy(false);
    }
  };

  const onReactivate = async () => {
    if (!confirm("해당 사용자를 다시 활성화하시겠습니까?")) return;
    try {
      setBusy(true);

      const res = await api.patch(
        `/api/v1/users/${encodeURIComponent(user.userNo)}/reactivate`
      );

      if (res.status >= 200 && res.status < 300) {
        try {
          const { data } = await api.get(
            `/api/v1/users/${encodeURIComponent(user.userNo)}`
          );
          setUser(mapUser(data));
        } catch {
          setUser((prev) => (prev ? { ...prev, active: true } : prev));
        }

        alert("활성화 완료");
      }
    } catch (e) {
      console.error(e);
      alert(`활성화 실패: ${e?.response?.status ?? ""} ${e?.message ?? ""}`);
    } finally {
      setBusy(false);
    }
  };

  const onForceDelete = async () => {
    if (!confirm("해당 사용자를 삭제하시겠습니까?")) return;
    try {
      setBusy(true);
      await api.delete(PATH.forceDelete(user.userNo));
      alert("삭제 완료");
      nav("/adminPage/users");
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    } finally {
      setBusy(false);
    }
  };

  const active = user.active;

  return (
    <div className="admin-user-detail admin-user-detail--full admin-user-detail--stack">
      <div className="admin-user-detail__left">
        <img
          className="admin-user-detail__avatar"
          src={
            user?.userNo
              ? `${API_BASE}/api/v1/users/${encodeURIComponent(
                  user.userNo
                )}/thumbnail?width=120&height=120&cb=${Date.now()}`
              : "/placeholder.png"
          }
          alt="프로필 이미지"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />
        <div className="admin-user-detail__meta">
          <div>
            <strong>번호</strong> {user.userNo}
          </div>
          <div>
            <strong>ID</strong> {user.loginId}
          </div>

          {!editing ? (
            <div>
              <strong>이름</strong> {user.name}
            </div>
          ) : (
            <>
              <label>이름</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
              />
            </>
          )}

          <div>
            <strong>가입일</strong> {user.createdAt}
          </div>
          <div>
            <strong>활성</strong> {active ? "Y(활성)" : "N(비활성)"}
          </div>
          <div>
            <strong>Social</strong> {user.social ? "Y" : "N"}
          </div>
          {!!user.roles?.length && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <strong>권한</strong>
              {user.roles.map((r, idx) => (
                <span
                  key={idx}
                  className={`tag tag--${String(r).toLowerCase()}`}
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="admin-user-detail__actions">
        {!editing ? (
          <button onClick={() => setEditing(true)}>수정</button>
        ) : (
          <>
            <button onClick={onSave} disabled={busy}>
              저장
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setForm({ name: user.name });
              }}
            >
              취소
            </button>
          </>
        )}
        <button onClick={() => nav(-1)}>뒤로</button>
        {active ? (
          <button disabled={busy || !active} onClick={onLogicalDelete}>
            비활성화
          </button>
        ) : (
          <button disabled={busy} onClick={onReactivate}>
            활성화
          </button>
        )}
        <button disabled={busy} className="danger" onClick={onForceDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}
