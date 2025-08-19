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
