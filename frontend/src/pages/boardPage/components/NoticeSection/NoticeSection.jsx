import React from "react";
import { Link } from "react-router-dom";
import "./NoticeSection.css";

// 파일 내부 mock
const noticeList = [
  { id: 1, tag: "공지사항", text: "공지사항 내용" },
  { id: 2, tag: "공지사항", text: "공지사항 내용" },
  { id: 3, tag: "공지사항", text: "공지사항 내용" },
];

export default function NoticeSection() {
  return (
    <section className="noticeSection">
      <ul className="noticeSection__list">
        {noticeList.map((n) => (
          <li key={n.id} className="noticeSection__item">
            <Link className="noticeSection__link" to={`/notice/${n.id}`}>
              <span className="noticeSection__badge">{n.tag}</span>
              <span className="noticeSection__text">{n.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

