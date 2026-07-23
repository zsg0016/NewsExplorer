import "./Footer.css";
import { Link } from "react-router-dom";
import GITHUB_IMAGE from "../../images/github-icon.svg";
import LINKEDIN_IMAGE from "../../images/linkedin-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2026 Supersite, Powered by News API</p>
      <ul className="footer__list">
        <li className="footer__list-item home-tripleten">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link
            to={"https://tripleten.com/"}
            className="footer__link"
            target="_blank"
          >
            TripleTen
          </Link>
        </li>
        <li className="footer__list-item">
          <Link
            className="footer__link-icon"
            to={"https://github.com/zsg0016"}
            target="_blank"
          >
            <img src={GITHUB_IMAGE} alt="GitHub" />
          </Link>
          <Link
            className="footer__link-icon"
            to={"https://www.linkedin.com/in/zachary-guidry-832b31180"}
            target="_blank"
          >
            <img src={LINKEDIN_IMAGE} alt="LinkedIn" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
