import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

// User Controller prefix
const USER_PREFIX = `${API_SERVER_HOST}/api/v1/users`;

// Board Controller prefix
const BOARD_PREFIX = `${API_SERVER_HOST}/api/v1/boards`;

// Comment Controller prefix
const COMMENT_PREFIX = `${API_SERVER_HOST}/api/v1/comments`;


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

//BOARD

//mainPage--인기글,자유게시판,Q&A게시판 글 4개
// 인기글 ( 상위 4개 )
export const popularPostList = async () => {
    const res = await axios.get(`${BOARD_PREFIX}/popular`);
    return res.data;
};

// 자유게시판글 ( 상위 4개 )
export const commenPostList = async () => {
    const res = await axios.get(`${BOARD_PREFIX}/commen`);
    return res.data;
};

// 자유게시판글 ( 상위 4개 )
export const qeustionPostList = async () => {
    const res = await axios.get(`${BOARD_PREFIX}/qeustion`);
    return res.data;
};

//boardPage--공지사항글 3개
export const noticePostList = async () => {
    const res = await axios.get(`${BOARD_PREFIX}/notice`);
    return res.data;
};

//boardPage--글 데이터 7개 ( 페이징 기법 적용 )
export const mainPostList = async (page = 1, size = 7, boardTypeNo) => {
    const res = await axios.get(`${BOARD_PREFIX}`, {
        params: { page, size, boardTypeNo }
    });
    return res.data;
};

//


//COMMENT
