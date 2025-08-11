import './Carousel.css';

export default function Carousel() {
    return (
        <div className="carousel">
            <div className="carousel__image">회전목마 이미지</div>

            <div className="carousel__indicators">
                <div className="carousel__indicator"><span className="carousel__icon">●</span></div>
                <div className="carousel__indicator"><span className="carousel__icon">○</span></div>
                <div className="carousel__indicator"><span className="carousel__icon">○</span></div>
                <div className="carousel__indicator"><span className="carousel__icon">○</span></div>
            </div>
        </div>
    );
}
