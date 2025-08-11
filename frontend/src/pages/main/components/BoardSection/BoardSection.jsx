import './BoardSection.css';

export default function BoardSection({ title = '제목' }) {
    return (
        <section className="board">
            <h2 className="board__title">{title}</h2>
            <div className="board__list">
                {/* 리스트 아이템은 페이지/데이터 연동 시 채움 */}
            </div>
        </section>
    );
}
