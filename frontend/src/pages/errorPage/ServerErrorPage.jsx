import { Link } from "react-router-dom";
import "./ErrorPage.css";

export default function ServerErrorPage() {
  return (
    <main className="error-page error-page--server">
      <section className="error-page__card" role="alert" aria-live="polite">
        <h1 className="error-page__title">
          <span className="error-page__code">5xx</span> 문제가 발생했어요
        </h1>
        <p className="error-page__desc">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 강호형 떄문입니다.
        </p>
        <div className="error-page__actions">
          <Link className="error-page__btn" to="/home">
            홈으로
          </Link>
          <button
            className="error-page__btn"
            onClick={() => window.location.reload()}
          >
            새로고침
          </button>
        </div>
      </section>
    </main>
  );
}
