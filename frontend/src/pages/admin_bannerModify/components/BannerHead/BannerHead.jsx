import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./BannerHead.css";

export default function BannerHead() {
  return (
    <thead className="banner_head__form" >
      <tr>
				<th></th>
        <th>순서</th>
        <th>이미지</th>
        <th>파일명</th>
        <th>순서변경</th>
      </tr>
    </thead>
  );
}