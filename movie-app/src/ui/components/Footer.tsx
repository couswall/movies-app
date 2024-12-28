import { Link } from 'react-router-dom';
import './styles/Footer.css';
import { NAVBAR } from './constants';

export const Footer = () => {
  return (
    <footer className="footer-section py-3 bg-black" data-bs-theme="dark">
      <div className="container">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
              <Link className="nav-link text-muted" to={'/'}>{NAVBAR.HOME}</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link text-muted" to={'/movies'}>{NAVBAR.MOVIES}</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link text-muted" to={'/tv'}>{NAVBAR.TV_SHOWS}</Link>
          </li>
        </ul>
        <p className="text-center text-muted">
          {'© 2025 Company, Inc'}
        </p>
      </div>
    </footer>
  )
}
