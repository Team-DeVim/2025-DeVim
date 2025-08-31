import React, { useState } from "react";
import "./ContentBox.css";
import DOMPurify from "dompurify";
import { DEFAULT_PROFILE, thumbnailUrl, api, BOARD_PREFIX, postLike } from "../../../../api/DevimApi";
import { useNavigate } from "react-router-dom";


export default function ContentBox({ data, isLogin = false, accountInfo }) {
  // 받은 상세글 정보 변수화
  const boardNo = data.boardNo;
  const writerUserNo = data?.writerUserNo ?? 0;
  const loginUserNo = accountInfo?.userNo ?? -1;
  const boardTypeNo = data.boardTypeNo;
  const title = data.title;
  const boardContent = data.boardContent;
  const writerName = data.writerName;
  const createdDt = data.createdDt;
  // let likeCount = data.likeCount;

  // 좋아요 상태
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  // 게시글 삭제/수정 기능 상태
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(boardContent);
  const navigate = useNavigate();

  // 좋아요 토글
  const handleToggleLike = async () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    if (liking) return;

    const controller = new AbortController();
    setLiking(true);

    try {
      await postLike(boardNo, controller.signal);
      if (liked === true) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLiked(prev => !prev);
    } catch (e) {
      if (e.name !== "CanceledError" && e.code !== "ERR_CANCELED") {
        alert("잠시 후 다시 눌러주세요.");
      }
    } finally {
      setLiking(false);
    }
  };

  // 시간 포메터
  const formatTimeAgo = (iso) => {
    if (!iso) return "알수없음";
    const created = new Date(iso);
    const now = new Date();
    const diffMs = now - created;
    if (Number.isNaN(diffMs)) return "";
    const min = Math.floor(diffMs / (1000 * 60) - 60 * 9);
    if (min < 1) return "방금 전";
    if (min < 60) return `${min}분 전`;
    const hour = Math.floor(min / 60);
    if (hour < 24) return `${hour}시간 전`;
    const day = Math.floor(hour / 24);
    return `${day}일 전`;
  };

  // DELETE /api/v1/boards/{boardNo} : 게시물 삭제
  const handleDeleteBoard = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    try {
      await api.delete(`${BOARD_PREFIX}/${encodeURIComponent(boardNo)}`);
      alert("게시글이 삭제되었습니다.");
      // 삭제 후 이전 페이지로 이동
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // PATCH /api/v1/boards/{boardNo} : 게시물 수정
  const handleUpdateBoard = async () => {
    const trimmedTitle = (editTitle ?? "").trim();
    const trimmedContent = (editContent ?? "").trim();
    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 입력하세요.");
      return;
    }
    try {
      await api.patch(`${BOARD_PREFIX}/${encodeURIComponent(boardNo)}`, {
        boardTypeNo: Number(boardTypeNo),
        title: trimmedTitle,
        boardContent: trimmedContent,
      });
      alert("게시글이 수정되었습니다.");
      setEditing(false);
      // 수정 후 새로고침으로 최신 내용 반영
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <section className="contentBox">
      {/* 상단 */}
      <div className="contentBox__top">
        <div className="contentBox__profile">
          <img
            className="contentBox__avatar"
            src={
              thumbnailUrl(writerUserNo, 30, 30)}
            alt="프로필이미지"
            onError={(e) => { e.currentTarget.src = DEFAULT_PROFILE; }}
          />
          <div className="contentBox__nameTime">
            <div className="contentBox__name">{writerName ?? "알 수 없음"}</div>
            <div className="contentBox__time">{formatTimeAgo(createdDt)}</div>
          </div>
        </div>

        {writerUserNo === loginUserNo || accountInfo?.roleList?.some(r => r.role === "ROLE_ADMIN") ? (
          <div className="contentBox__actions">
            <>
              <button
                type="button"
                className="contentBox__action"
                onClick={async () => {
                  if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
                  try {
                    await api.delete(
                      `${BOARD_PREFIX}/${encodeURIComponent(boardNo)}`
                    );
                    alert("게시글이 삭제되었습니다.");
                    navigate(-1);
                  } catch (e) {
                    console.error(e);
                    alert("게시글 삭제에 실패했습니다.");
                  }
                }}
              >
                삭제하기
              </button>
              <span className="contentBox__sep">|</span>
              <button
                type="button"
                className="contentBox__action"
                onClick={() => {
                  // EditorPage로 이동 + 현재 글 데이터 전달
                  navigate(`/editorPage?mode=edit&boardNo=${boardNo}`, {
                    state: { board: data },
                  });
                }}
              >
                수정하기
              </button>
            </>
          </div>
        ) : (<></>)}
      </div>

      {/* 제목 및 본문 */}
      {editing ? (
        <div className="contentBox__edit">
          <input
            type="text"
            className="contentBox__titleInput"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          <textarea
            className="contentBox__textarea"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={8}
            placeholder="내용을 입력하세요"
          />
          <div className="contentBox__editActions">
            <button
              type="button"
              className="contentBox__action"
              onClick={handleUpdateBoard}
            >
              저장
            </button>
            <span className="contentBox__sep">|</span>
            <button
              type="button"
              className="contentBox__action"
              onClick={() => {
                setEditTitle(title);
                setEditContent(boardContent);
                setEditing(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 제목 */}
          <h2 className="contentBox__title" title={title}>
            {title}
          </h2>
          {/* 본문 */}
          <article
            className="contentBox__body"
            aria-label="게시글 본문"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(boardContent, {
                ALLOWED_TAGS: [
                  "p",
                  "br",
                  "b",
                  "i",
                  "u",
                  "strong",
                  "em",
                  "ul",
                  "ol",
                  "li",
                  "a",
                ],
                ALLOWED_ATTR: ["href", "target", "rel"],
              }),
            }}
          />
        </>
      )}

      {/* 하단: 태그(좌) · 동그란 좋아요(가운데) · 기타 메타(우) */}
      <div className="contentBox__tagsRow">
        <div className="contentBox__tags">
          {/* 태그가 있다면 표시하는 부분 */}
        </div>

        <div className="contentBox__likeWrap">
          <button
            type="button"
            className={`contentBox__likeCircle ${liked ? "is-liked" : ""}`}
            aria-pressed={liked ? "true" : "false"}
            onClick={handleToggleLike}
            aria-label="좋아요"
            title="좋아요"
          >
            <span className="contentBox__likeIcon">❤</span>
          </button>
          <div className="contentBox__likeNum">{likeCount}</div>
        </div>

        <div className="contentBox__metaRight">
          <span className="contentBox__comment">
            댓글 {data.commentCount ?? 0}
          </span>
        </div>
      </div>
    </section>
  );
}
