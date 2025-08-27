import "./BannerModify.css";
import BannerHead from "./components/BannerHead/BannerHead";
import BannerBody from "./components/BannerBody/BannerBody";
import { useEffect, useState } from "react";
import axios from "axios";

const BannerModify = () => {
  const [bannerItems, setBannerItems] = useState([]);

  /*배너순서 변경*/
  const moveBanner = (priority, direction) => {
		console.log(priority); // == 3

    const currentIndex = bannerItems.findIndex(
      (item) => item.priority === priority
    );

		console.log(currentIndex); // == 2
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === bannerItems.length - 1)
    ) {
      return;
    }
    const newItems = [...bannerItems];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    [newItems[currentIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[currentIndex]];
		newItems.map((item, index)=>{
			item.priority = index+1;
		});

		console.log(newItems);
    setBannerItems(newItems);
  };

	// /*DB에 있는 배너 불러오기*/
	// useEffect(()=>{
	// 	const fetchBanners = async ()=>{
	// 		try{
	// 			const res = await axios.get("http://localhost:8080/api/v1/main-images");
	// 			setBannerItems(res.data);
	// 		} catch (e) {
	// 			console.error("배너 로딩 실패", e);
	// 		}
	// 	};
	// 	fetchBanners();
	// },[]);


  /*선택 파일 미리보기 + 파일보관(서버업로드x)*/
  const handleImageUpload = async (e, priority) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
		const uploadedImage = await uploadImageToServer(file);

    console.log("업로드된 이미지", uploadedImage.split("."));
		console.log("썸네일 이미지 경로", `${uploadedImage.split(".")[0]}_thumb.${uploadedImage.split(".")[1]}`);
		
	
    setBannerItems((prev) =>
      prev.map((item) =>
        item.priority === priority
          ? {
              ...item,
              imageName: file.name,
              file,
              previewUrl,
              filePath: uploadedImage,
              thumbnailPath: `${uploadedImage.split(".")[0]}_thumb.${uploadedImage.split(".")[1]}`,
            }
          : item
      )
    );
  };

  /* 파일을 서버로 업로드 API */
  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // 백엔드에서 @RequestBody("file")로

    const response = await axios.post(
      "http://localhost:8080/api/v1/main-images/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // { filePath: "...", thumbnailPath: "..." }
    return response.data;
  };

  /* 배너를 추가하는 기능 */
  const addNewBanner = () => {
		const lastPriority = bannerItems.length === 0 ? 1 : bannerItems.length+1;
    setBannerItems((prev) => [
      ...prev, {
        imageName: "",
        thumbnailPath: "",
        filePath: "",
        previewUrl: "",
        file: null,
        priority: lastPriority,
      }
    ]);
  };

  /* 저장시 PUT 요청으로 보냄 */
  const changeToSave = async () => {
    try {
      // 1 새로 선택한 파일만 업로드
      const itemToUpload = bannerItems.map((i) => {
        return {priority: i.priority, filePath: i.filePath, thumbnailPath: i.thumbnailPath};
      });

      await axios.put("http://localhost:8080/api/v1/main-images", itemToUpload);

      // 4) 미리보기 정리 및 파일 포인터 제거
      // mergedItems.forEach((item) => {
      //   if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      // });

      // setBannerItems(
      //   mergedItems.map((item) => ({
      //     ...item,
      //     // imageName은 유지 (원하시면 여기서 서버 파일명으로 갱신 가능)
      //   }))
      // );

      alert("변경사항이 저장되었습니다.");
    } catch (error) {
      console.log("저장실패", error);
      alert("저장중 오류발생");
    }
  };

  /* 삭제버튼시 */
  const deleteBanner = (itemId) => {
    setBannerItems((prev) => {
      if (prev.length === 1) {
        // 배너가 1개일 경우: 이미지만 초기화
        const target = prev[0];
        if (target.previewUrl) URL.revokeObjectURL(target.previewUrl);
        return [
          {
            ...target,
            imageName: "",
            filePath: "",
            thumbnailPath: "",
            previewUrl: "",
            file: null,
          },
        ];
      }
      // 배너가 2개 이상일 경우: 항목 삭제
      const target = prev.find((i) => i.priority === itemId);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      const next = prev.filter((item) => item.priority !== itemId);
      return next;
    });
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
