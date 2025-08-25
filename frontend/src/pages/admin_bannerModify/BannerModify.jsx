import "./BannerModify.css";
import BannerHead from "./components/BannerHead/BannerHead";
import BannerBody from "./components/BannerBody/BannerBody";
import { useEffect, useState } from "react";

const BannerModify = () => {
  const [bannerItems, setBannerItems] = useState([
    { priority: 1, filePath: "", imageSrc: "" },
  ]);

  const moveBanner = (itemId, direction) => {
    const currentIndex = bannerItems.findIndex(
      (item) => item.priority === itemId
    );
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === bannerItems.length - 1)
    ) {
      return;
    }

    const newItems = [...bannerItems];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    [newItems[currentIndex], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[currentIndex],
    ];
    setBannerItems(newItems);
  };

  const deleteBanner = (itemId) => {
    if (bannerItems.length > 1) {
      setBannerItems((prev) => prev.filter((item) => item.priority !== itemId));
    }
  };

  const handleImageUpload = (e, itemId) => {
    // itemId 매개변수 추가
    const file = e.target.files[0];
    if (file) {
      console.log("업로드된 이미지", file.name);
      setBannerItems((prev) =>
        prev.map((item) =>
          item.priority === itemId
            ? {
                ...item,
                imageName: file.name,
                imageSrc: URL.createObjectURL(file),
              }
            : item
        )
      );
    }
  };

  const addNewBanner = () => {
    const newPriority =
      Math.max(...bannerItems.map((item) => item.priority)) + 1;
    console.log(newPriority);
    setBannerItems((prev) => [
      ...prev,
      { priority: newPriority, imageName: "", imageSrc: "" },
    ]);
  };

  const changeToSave = () => {
    alert("변경사항이 저장되었습니다.");
  };

  return (
    <div className="banner_modify__form">
      <table className="banner_modify__table">
        <BannerHead />
        <BannerBody
          bannerItems={bannerItems}
          moveBanner={moveBanner}
          deleteBanner={deleteBanner}
          handleImageUpload={handleImageUpload}
        />
      </table>

      <div className="banner_image__add">
        <button className="banner_image__addbox" onClick={addNewBanner}>
          +
        </button>
      </div>
      <div className="banner_modify__saveform">
        <button
          className="banner_modify__save"
          type="submit"
          onClick={changeToSave}
        >
          변경 사항 저장
        </button>
      </div>
    </div>
  );
};

export default BannerModify;
