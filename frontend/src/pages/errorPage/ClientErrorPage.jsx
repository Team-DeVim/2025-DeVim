import { Link } from "react-router-dom";
import "./ErrorPage.css";

export default function ClientErrorPage() {
  return (
    <main className="error-page error-page--client">
      <section className="error-page__card" role="alert" aria-live="polite">
        <h1 className="error-page__title">
          <span className="error-page__code">4xx</span> 요청을 처리할 수 없어요
        </h1>
        <p className="error-page__desc">
          입력 값이나 요청을 다시 한 번 확인해 주세요.
        </p>
        <div className="error-page__actions">
          <button
            className="error-page__btn"
            onClick={() => window.history.back()}
          >
            이전 페이지
          </button>
          <Link className="error-page__btn" to="/main">
            홈으로
          </Link>
        </div>
      </section>
    </main>
  );
}
