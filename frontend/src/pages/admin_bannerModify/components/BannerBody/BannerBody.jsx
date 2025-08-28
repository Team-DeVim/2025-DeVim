import { useEffect, useState } from "react";
import "./BannerBody.css";

function BannerBody({
  bannerItems,
  moveBanner,
  deleteBanner,
  handleImageUpload,
}) {
  return (
    <tbody
      className="banner_body__form"
      style={{
        marginTop: "10px",
      }}
    >
      {bannerItems.map((item, index) => {
        return (
          <tr
            key={item.priority}
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <td className="banner_image__controls">
              <label
                htmlFor={`bannerUpload-${item.priority}`}
                className="banner_image__upload_btn"
              >
                선택
              </label>
              <input
                type="file"
                id={`bannerUpload-${item.priority}`}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
									handleImageUpload(e, item.priority);
								}}
              />
              <button
                className="banner_image__delete_btn"
                onClick={() => deleteBanner(item.priority)}
                disabled={bannerItems.length === 1}
              >
                삭제
              </button>
            </td>
            {/* <form action="banner_save"> */}
              <td className="banner_number">{index + 1}</td>
              <td className="banner_image">
                <div className="banner_image__banner">
                  {item.previewUrl ? (
                    <img src={item.previewUrl} alt="배너사진" />
                  ) : item.thumbnailPath ? (
                    <img
                      src={`http://localhost:8080${item.thumbnailPath}`}
                      alt="배너사진"
                    />
                  ) : (
                    <span className="no_image">이미지 없음</span>
                  )}
                </div>
              </td>
              <td className="banner_image__name">
                {item.imageName || "이미지를 선택하세요"}
              </td>
            {/* </form> */}
            <td>
              <div className="banner_image__button">
                <button onClick={() => moveBanner(item.priority, "up")}>
                  ▲
                </button>
                <button onClick={() => moveBanner(item.priority, "down")}>
                  ▼
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default BannerBody;
