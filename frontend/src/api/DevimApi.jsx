import axios from "axios";
import { useNavigate } from "react-router";

export const API_SERVER_HOST = 'http://localhost:8080';

// User Controller prefix
export const USER_PREFIX = `${API_SERVER_HOST}/api/v1/users`;

// Board Controller prefix
export const BOARD_PREFIX = `${API_SERVER_HOST}/api/v1/boards`;

// Comment Controller prefix
export const COMMENT_PREFIX = `${API_SERVER_HOST}/api/v1/comments`;

// 로그인 api

// ===== 설정 =====
const TOKEN_KEY = "auth/bearer";

const toBearer = (token) => {
    if (!token) return null;
    return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
};

export function setToken(token /* "Bearer xxx" or "xxx" */) {
    const bearer = toBearer(token);
    if (bearer) sessionStorage.setItem(TOKEN_KEY, bearer);
    else sessionStorage.removeItem(TOKEN_KEY);
}

export function clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY); // 없으면 null
}

// ===== axios 인스턴스 =====
export const api = axios.create({
    baseURL: API_SERVER_HOST,
    // 헤더 방식이므로 withCredentials 불필요(쿠키 미사용)
});

// 요청마다 Authorization 자동 부착
api.interceptors.request.use((cfg) => {
    const bearerToken = getToken();
    if (bearerToken) {
        cfg.headers = cfg.headers ?? {};
        cfg.headers.Authorization = bearerToken;
    }
    return cfg;
});

// 401 처리: 토큰 제거 + 전역 이벤트 + /login 이동(폴백)
/*
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const navigate = useNavigate();
        if (err?.response?.status === 401) {
            clearToken();
            alert("로그인 오류!");
            navigate("/login");
            return Promise.reject(err);
        }
        if (err?.response?.status === 403) {
            alert("로그인이 필요한 서비스입니다.");
            clearToken();
            navigate("/login");
            return Promise.reject(err);
        }
    }
);
*/
// ----------------------------------------------------

// Login
export async function login(username, password, signal) {
    const body = new URLSearchParams();
    body.set("username", username);
    body.set("password", password);

    const res = await api.post("/login", body, {
        signal,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    // 헤더에서 토큰 획득("Bearer xxx")
    const auth = res.headers?.authorization;
    if (!auth) {
        throw new Error("Authorization header missing. Ensure Access-Control-Expose-Headers: Authorization is set on server.");
    }
    setToken(auth);
    return true;
}

// 로그아웃
export function logout() {
    clearToken();
    window.location.reload();
}

// 회원가입
export async function signUp({ username, password, name }, signal) {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    form.append("name", name);

    const res = await api.post("/sign-up", form, {
        signal,
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
}


//USER
// 유저 정보 불러오기 (리스트)
export const getUserList = async (page = 0, size = 20, signal) => {
    const res = await axios.get(`${USER_PREFIX}`, {
        params: {
            page: Math.max(0, Number(page) || 0),
            size: Math.max(1, Number(size) || 20),
        },
        signal
    });
    return res.data;
};

// 토큰을 통한 내 정보 조회
export async function fetchMyInfo(signal) {
    const res = await api.get(`${USER_PREFIX}/me`, { signal });
    return res.data;
}


// profilePage__MyArticle__내 글 리스트 요청
export async function getMypostList(userNo, page = 1, size = 5, signal) {
    const params = {
        page: Number(page),
        size: Number(size),
    };
    try {
        const { data } = await api.get(`${USER_PREFIX}/${encodeURIComponent(userNo)}/posts`,
            { params, signal });
        return data;
    } catch (err) {
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
            throw err;
        }
        throw err;
    }
}

// profilePage__MyArticle__내 글 리스트 요청
export async function getMycommentList(userNo, page = 1, size = 5, signal) {
    const params = {
        page: Number(page),
        size: Number(size),
    };
    try {
        const { data } = await api.get(`${USER_PREFIX}/${encodeURIComponent(userNo)}/comments`,
            { params, signal });
        return data;
    } catch (err) {
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
            throw err;
        }
        throw err;
    }
}

// 유저 프로필 불러오기
/** 썸네일 URL*/
export function thumbnailUrl(userNo, width = 30, height = 30) {
    const params = new URLSearchParams({
        width: String(width),
        height: String(height),
        cb: Date.now().toString()
    });

    return `${USER_PREFIX}/${encodeURIComponent(userNo)}/thumbnail?${params.toString()}`;
}

// 디폴트 이미지
export const DEFAULT_PROFILE = "/img/default_profile.png";

//BOARD

//mainPage__인기글,자유게시판,Q&A게시판 글 4개
// 인기글 ( 상위 4개 )
export const popularPostList = async (signal) => {
    const res = await axios.get(`${BOARD_PREFIX}/popular`, { signal });
    return res.data;
};

// 자유게시판글 (상위 4개)
export const commonPostList = async (boardTypeNo = 1, limit = 4, signal) => {
    const params = {
        boardTypeNo: Number(boardTypeNo),
        limit: Number(limit),
    };
    const res = await axios.get(`${BOARD_PREFIX}/recent`, {
        params,
        signal,
    });
    return res.data;
};

// Q&A 게시판 글 ( 상위 4개 )
export const questionPostList = async (boardTypeNo = 2, limit = 4, signal) => {
    const params = {
        boardTypeNo: Number(boardTypeNo),
        limit: Number(limit),
    };
    const res = await axios.get(`${BOARD_PREFIX}/recent`, {
        params,
        signal,
    });
    return res.data;
};

//boardPage__공지사항글 3개
export const noticePostList = async (boardTypeNo = 3, limit = 3, signal) => {
    const params = {
        boardTypeNo: Number(boardTypeNo),
        limit: Number(limit),
    };
    const res = await axios.get(`${BOARD_PREFIX}/recent`, {
        params,
        signal,
    });
    return res.data;
};

//boardPage__글 데이터 7개 ( 페이징 기법 적용 )
export const pagingPostList = async (page = 1, size = 7, boardTypeNo, signal) => {
    const params = {
        page: Number(page),
        size: Number(size),
        boardTypeNo: Number(boardTypeNo)
    };
    const res = await axios.get(`${BOARD_PREFIX}`, {
        params,
        signal
    });
    return res.data;
};

//detailPage__글 상세보기
export async function getDetailPost(boardNo, signal) {
    if (boardNo == null || Number.isNaN(Number(boardNo))) {
        throw new Error("Invalid boardNo");
    }
    try {
        const { data } = await axios.get(`${BOARD_PREFIX}/${encodeURIComponent(boardNo)}`, {
            signal,
        });
        return data;
    } catch (err) {
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
            throw err;
        }
        throw err;
    }
}

// EditorPage__게시글 작성
export async function createBoard({ boardTypeNo, title, boardContent }, signal) {
    const post = {
        boardTypeNo: Number(boardTypeNo),
        title: String(title).trim(),
        boardContent: String(boardContent).trim(),
    };

    const res = await api.post(`${BOARD_PREFIX}`, post, { signal });

    return res.data;
}




//COMMENT
// detailPage_상세글 댓글리스트
export async function getCommentList(page = 1, size = 9999, boardNo, signal) {
    if (boardNo == null || Number.isNaN(Number(boardNo))) {
        throw new Error("Invalid boardNo");
    }
    const params = {
        boardNo,
        page,
        size,
    }
    const { data } = await axios.get(`${COMMENT_PREFIX}`, { params, signal })
    const list = Array.isArray(data?.dtoList) ? data.dtoList : [];
    const commentData = list.map((c) => ({
        commentNo: c.commentNo,
        boardNo: c.boardNo,
        commentContent: c.commentContent ?? "",
        writerName: c.writerName ?? "알 수 없음",
        createdDt: c.createdDt ?? null,
        deleteFlag: !!c.deleteFlag,
    }));

    return commentData;
}

// detailPage_댓글 생성
export async function createComment(boardNo, content, signal) {
    const body = {
        boardNo,
        commentContent: content.trim(),
    };

    const res = await api.post(`${COMMENT_PREFIX}`, body, { signal });
    return res.data;
}