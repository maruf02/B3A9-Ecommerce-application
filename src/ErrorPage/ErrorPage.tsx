import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen   -mt-20 -mb-32 bg-gradient-to-r from-[#00736E] to-[#6A00C9]">
      <section className="error-container pt-[15%]">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <h2 className="text-3xl lg:text-6xl font-bold uppercase text-[#ff0000] italic">
          ==Looks Like You Are Lost IN==
        </h2>
      </div>
      <div className="link-container mt-10">
        <Link to="/">
          <button className="btn   btn-secondary w-[300px] uppercase text-[#009999] text-3xl font-semibold">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
