import React from "react";
import { Link } from "react-router-dom";
import "./NoticeSection.css";

export default function NoticeSection({ data }) {
  const noticeList = data
  return (
    <section className="noticeSection">
      <ul className="noticeSection__list">
        {noticeList.map((n) => (
          <li key={n.boardNo} className="noticeSection__item">
            <Link className="noticeSection__link" to={`/notice/${n.boardNo}`}>
              <span className="noticeSection__badge">{"공지사항"}</span>
              <span className="noticeSection__text">{n.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

