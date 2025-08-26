import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

// User Controller prefix
export const USER_PREFIX = `${API_SERVER_HOST}/api/v1/users`;

// Board Controller prefix
export const BOARD_PREFIX = `${API_SERVER_HOST}/api/v1/boards`;

// Comment Controller prefix
export const COMMENT_PREFIX = `${API_SERVER_HOST}/api/v1/comments`;


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

// 유저 생성 ( 회원 가입 )
export const postUserRegister = async (registerObj) => {
    const res = await axios.post(`${USER_PREFIX}`, registerObj);
    return res.data;
};

// profilePage__MyArticle__내 글 리스트 요청
export async function getMypostList(userNo, page = 1, size = 5, signal) {
    const params = {
        page: Number(page),
        size: Number(size),
    };
    try {
        const { data } = await axios.get(`${USER_PREFIX}/${encodeURIComponent(userNo)}/posts`,
            { params, signal });
        return data;
    } catch (err) {
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
            throw err;
        }
        throw err;
    }
}

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