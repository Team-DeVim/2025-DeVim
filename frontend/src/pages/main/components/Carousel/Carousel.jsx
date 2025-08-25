import { useEffect, useRef, useState } from "react";
import "./Carousel.css";
import image1 from "./CarouselImages/image1.jpg";
import image2 from "./CarouselImages/image2.jpg";
import image3 from "./CarouselImages/image3.jpg";
import image4 from "./CarouselImages/image4.jpg";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cacheRef = useRef([]);
	const images = [image1, image2, image3, image4];

  // 이미지 캐시저장
  useEffect(() => {
    cacheRef.current = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);
	// 이미지 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



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
            슬라이드이미지={`carousel-${index}`}
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
