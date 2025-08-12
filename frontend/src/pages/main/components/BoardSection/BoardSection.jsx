import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './BoardSection.css';

const BOARD_TYPE = { FREE: 1, QNA: 2 };

const DATA = {
  users: [
    { user_no: 1, name: '관리자', delete_flag: 0 },
    { user_no: 2, name: '준',     delete_flag: 0 },
    { user_no: 3, name: '미래',   delete_flag: 0 },
    { user_no: 4, name: '리오',   delete_flag: 0 }
  ],
  boards: [
    { board_no: 101, board_type_no: 1, title: 'React 19 마이그레이션 정리',  board_content: '...', writer: 2, createdDate: '2025-08-10T12:20:00Z', like_count: 42, delete_flag: 0 },
    { board_no: 102, board_type_no: 1, title: 'Vite 설정과 코드 스플리팅',   board_content: '...', writer: 4, createdDate: '2025-08-07T10:05:00Z', like_count: 12, delete_flag: 0 },
    { board_no: 103, board_type_no: 1, title: 'Oracle 커넥션 풀 튜닝 팁',     board_content: '...', writer: 3, createdDate: '2025-08-06T02:50:00Z', like_count: 31, delete_flag: 0 },
    { board_no: 103, board_type_no: 1, title: '오늘뭐먹을까요',     board_content: '...', writer: 3, createdDate: '2025-08-06T02:50:00Z', like_count: 300, delete_flag: 0 },
    { board_no: 201, board_type_no: 2, title: 'Spring Security 토큰 만료?',  board_content: '...', writer: 2, createdDate: '2025-08-09T07:10:00Z', like_count: 30, delete_flag: 0 },
    { board_no: 201, board_type_no: 2, title: 'Security 고수?',  board_content: '...', writer: 2, createdDate: '2025-08-09T07:10:00Z', like_count: 36, delete_flag: 0 },
    { board_no: 202, board_type_no: 2, title: 'JPA 지연로딩 N+1 해결',        board_content: '...', writer: 3, createdDate: '2025-08-08T15:30:00Z', like_count: 55, delete_flag: 0 },
    { board_no: 203, board_type_no: 2, title: 'RTK Query 캐싱 패턴',          board_content: '...', writer: 4, createdDate: '2025-08-05T09:40:00Z', like_count: 18, delete_flag: 0 }
  ],
  comments: [
    { comment_no: 5001, board_no: 101, delete_flag: 0 },
    { comment_no: 5002, board_no: 101, delete_flag: 0 },
    { comment_no: 5003, board_no: 202, delete_flag: 0 },
    { comment_no: 5004, board_no: 202, delete_flag: 0 },
    { comment_no: 5005, board_no: 203, delete_flag: 0 }
  ]
};

function formatDate(iso) {
  try {
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return iso;
  }
}

/**
 * props:
 * - title: 섹션 제목
 * - mode : 'popular' | 'free' | 'qna'
 *   - popular: like_count desc (자유+QnA 전체)
 *   - free/qna: createdDate desc
 * - pageSize: 노출 개수 (기본 4)
 */
export default function BoardSection({
  title = '게시판',
  mode = 'free', 
  pageSize = 4
}) {
  // 유저/댓글 맵
  const userMap = useMemo(() => {
    const map = new Map();
    DATA.users.filter(u => u.delete_flag === 0)
      .forEach(u => map.set(u.user_no, u.name || '알 수 없음'));
    return map;
  }, []);

  const commentCountMap = useMemo(() => {
    const map = new Map();
    DATA.comments.filter(c => c.delete_flag === 0)
      .forEach(c => map.set(c.board_no, (map.get(c.board_no) || 0) + 1));
    return map;
  }, []);

  // 모드별 고정 정렬
  // 최신순
  const filteredSorted = useMemo(() => {
    const base = DATA.boards.filter(b => b.delete_flag === 0);
    if (mode === 'free') {
      return base
        .filter(b => b.board_type_no === BOARD_TYPE.FREE)
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }
    if (mode === 'qna') {
      return base
        .filter(b => b.board_type_no === BOARD_TYPE.QNA)
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }
    // 인기글
    return base
      .filter(b => b.board_type_no === BOARD_TYPE.FREE || b.board_type_no === BOARD_TYPE.QNA)
      .sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
  }, [mode]);

  const visibleItems = useMemo(
    () => filteredSorted.slice(0, pageSize),
    [filteredSorted, pageSize]
  );

  return (
    <section className="board">
      <div className="board__header">
        <h2 className="board__title">{title}</h2>
      </div>

      {visibleItems.length === 0 ? (
        <div className="board__empty">게시글이 없습니다.</div>
      ) : (
        <ul className="board__list">
          {visibleItems.map(post => {
            const author = userMap.get(post.writer) || '알 수 없음';
            const commentsCnt = commentCountMap.get(post.board_no) || 0;

            return (
              <li key={post.board_no} className="board__item">
                <Link to={`/board/${post.board_no}`} className="board__item-link">
                  <span className="board__item-title" title={post.title}>
                    {post.title}
                  </span>
                  <span className="board__item-meta">
                    <span className="board__item-author">{author}</span>
                    <span className="board__item-sep">·</span>
                    <time className="board__item-date" dateTime={post.createdDate}>
                      {formatDate(post.createdDate)}
                    </time>
                  </span>
                </Link>
                <div className="board__item-stats" aria-label="post stats">
                  <span className="stat">추천 {post.like_count ?? 0}</span>
                  <span className="stat">댓글 {commentsCnt}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
