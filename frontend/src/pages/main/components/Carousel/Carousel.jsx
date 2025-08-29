import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_SERVER_HOST } from "../../../../api/DevimApi";
import "./Carousel.css";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const cacheRef = useRef([]);

  // 1. API에서 이미지 목록 가져오기
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_SERVER_HOST}/api/v1/main-images`);
        // filePath 값을 전체 URL 경로로 변환
        const imagePaths = response.data.map(item => `${API_SERVER_HOST}${item.filePath}`);
        setImages(imagePaths);
      } catch (error) {
        console.error("캐러셀 이미지를 불러오는 데 실패했습니다:", error);
        setImages([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // 2. 가져온 이미지 캐시 저장
  useEffect(() => {
    if (images.length === 0) return;
    cacheRef.current = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, [images]);

  // 3. 이미지 자동 슬라이드
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (loading) {
    return <div className="carousel">로딩 중...</div>;
  }

  if (images.length === 0) {
    return <div className="carousel">표시할 이미지가 없습니다.</div>;
  }

  return (
    <div className="carousel">
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`carousel-image-${index}`}
            className="carousel__image"
          />
        ))}
      </div>

      <div className="carousel__indicators">
        {images.map((e, i) => {
          return (
            <button
              key={i}
              className={`carousel__indicator ${
                currentIndex === i ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(i)}
            >
              <span className="carousel__icon">
                {currentIndex === i ? "■" : "□"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}