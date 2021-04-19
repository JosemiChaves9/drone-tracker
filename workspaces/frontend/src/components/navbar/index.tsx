import {
  faBell,
  faDonate,
  faEnvelope,
  faFileAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavBar = () => {
  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      <form className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search'></form>

      <ul className='navbar-nav ml-auto'>
        <li className='nav-item dropdown no-arrow mx-1'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='alertsDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'>
            <FontAwesomeIcon icon={faBell} />
            <span className='badge badge-danger badge-counter'>3+</span>
          </a>
          <div
            className='dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in'
            aria-labelledby='alertsDropdown'>
            <h6 className='dropdown-header'>Alerts Center</h6>
            <a className='dropdown-item d-flex align-items-center' href='#'>
              <div className='mr-3'>
                <div className='icon-circle bg-primary'>
                  <FontAwesomeIcon icon={faFileAlt} />{' '}
                </div>
              </div>
            </a>
            <a className='dropdown-item d-flex align-items-center' href='#'>
              <div className='mr-3'>
                <div className='icon-circle bg-success'>
                  <FontAwesomeIcon icon={faDonate} />{' '}
                </div>
              </div>
            </a>
          </div>
        </li>

        <li className='nav-item dropdown no-arrow mx-1'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='messagesDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'>
            <FontAwesomeIcon icon={faEnvelope} />{' '}
            <span className='badge badge-danger badge-counter'>7</span>
          </a>
        </li>

        <div className='topbar-divider d-none d-sm-block'></div>

        <li className='nav-item dropdown no-arrow'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='userDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'>
            <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
              Douglas McGee
            </span>
            <FontAwesomeIcon icon={faUser} />{' '}
          </a>
        </li>
      </ul>
    </nav>
  );
};
