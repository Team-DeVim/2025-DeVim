import "./BannerModify.css";
import BannerHead from "./components/BannerHead/BannerHead";
import BannerBody from "./components/BannerBody/BannerBody";
import { useEffect, useState } from "react";
import axios from "axios";

const BannerModify = () => {
  const [bannerItems, setBannerItems] = useState([]);

  /*배너순서 변경*/
  const moveBanner = (priority, direction) => {
    // priority 우선순위, direction (up, down)을 인자로 받음
    console.log(priority);
    const currentIndex = bannerItems.findIndex((item) => item.priority === priority);
    // bannerItems 배열에서 item.priority가 인자 priority와 일치하는 첫번째 항목 인덱스를 찾음
    // 반환값: 일치하는 항목의 인덱스(0 기반), 못찾으면 -1 을 반환
    console.log(currentIndex);

    if (
      (direction === "up" && currentIndex === 0) ||
      // up인데 인덱스가 최상단이면(0 이므로) 함수 종료
      (direction === "down" && currentIndex === bannerItems.length - 1)
      // down인데 인덱스가 최하단이면(length-1 이므로) 함수종료
    ) {
      return;
    }
   
    const newItems = [...bannerItems];
    // bannerItems 배열을 새롭게 newItem으로 배열객체를 만듦
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    // 교환 대상의 인덱스를 계산. up이면 한칸 위로 올라가니까 (-1), down이면 한칸 아래로 내려가니까 (+1)
    [newItems[currentIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[currentIndex],];
    // 배열 비구조화 할당을 이용한 스왑. 왼쪽은 [x, y] ,오른쪽은 [a, b] 형태로 한줄로 교환함
    newItems.map((item, index) => {item.priority = index + 1;});
    // newItem을 반복하면서 각 priority 의 배열의 순서를 index + 1 로 재할당
    console.log(newItems);
    setBannerItems(newItems);
    // 배열 레퍼런스가 바뀌고 리렌더링, 내부객체가 변경된 상태로 저장
  };


  /*선택 파일 미리보기 + 파일보관(서버업로드x)*/
  const handleImageUpload = async (e, priority) => {
	// 화살표함수로 선언. e는  input change 이벤트객체. priority 는 어떤 배너를 수정할지 식별하는 값.
	const file = e.target.files[0];
    	// e.taget.files 사용자가 선택한 파일목록을 담고있는 file 객체
	if (!file) return;
	// 파일이 없다면 함수종료

	const previewUrl = URL.createObjectURL(file);
	// 브라우저의 메모리 내에서 선택한 파일 임시 URL 생성
	const uploadedImage = await uploadImageToServer(file);
	// 서버에 업로드후 서버가 반환한 파일 경로를 문자열로 받음. uploadedImage의 변수에 저장함
    console.log("업로드된 이미지", uploadedImage.split("."));
    console.log("썸네일 이미지 경로",`${uploadedImage.split(".")[0]}_thumb.${uploadedImage.split(".")[1]}` );

    setBannerItems((prev) =>
      prev.map((item) =>
        item.priority === priority
          ? {
              ...item,
              imageName: file.name,
              file,
              previewUrl,
              filePath: uploadedImage,
              thumbnailPath: `${uploadedImage.split(".")[0]}_thumb.${
                uploadedImage.split(".")[1]
              }`,
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
    const lastPriority = bannerItems.length === 0 ? 1 : bannerItems.length + 1;
    setBannerItems((prev) => [
      ...prev,
      {
        imageName: "",
        thumbnailPath: "",
        filePath: "",
        previewUrl: "",
        file: null,
        priority: lastPriority,
      },
    ]);
  };

  /* 저장시 PUT 요청으로 보냄 */
  const changeToSave = async () => {
    try {
      // 1 새로 선택한 파일만 업로드
      const itemToUpload = bannerItems.map((i) => {
        return {
          priority: i.priority,
          filePath: i.filePath,
          thumbnailPath: i.thumbnailPath,
        };
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
