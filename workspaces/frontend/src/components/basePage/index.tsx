import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faPaperPlane,
  faGamepad,
  faPlusCircle,
  faMapMarkedAlt,
  faBell,
  faFileAlt,
  faDonate,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const BaseLayout = (props: any) => {
  return (
    <>
      <div id='wrapper'>
        <ul
          className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
          id='accordionSidebar'>
          <img src='/drone-tracker-logo.png' alt='' className='m-2 my-4' />

          <hr className='sidebar-divider my-2' />

          <li className='nav-item active'>
            <Link className='nav-link' to='/'>
              <FontAwesomeIcon icon={faMapMarkedAlt} />
              <span className='pl-2'>Overview</span>
            </Link>
          </li>

          <hr className='sidebar-divider my-2' />

          <div className='sidebar-heading'>Filter</div>

          <li className='nav-item'>
            <Link className='nav-link collapsed' to='/bases'>
              <FontAwesomeIcon icon={faBuilding} />
              <span className='pl-2'>Bases</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link collapsed' to='/drones'>
              <FontAwesomeIcon icon={faPaperPlane} />
              <span className='pl-2'>Drones</span>
            </Link>
          </li>

          <hr className='sidebar-divider my-2' />

          <div className='sidebar-heading'>Control</div>

          <li className='nav-item'>
            <Link className='nav-link collapsed' to='/drone-control'>
              <FontAwesomeIcon icon={faGamepad} />

              <span className='pl-2'>Drone Control</span>
            </Link>
          </li>

          <hr className='sidebar-divider my-2' />
          <div className='sidebar-heading'>Add</div>

          <li className='nav-item'>
            <Link className='nav-link' to='/add-drone'>
              <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className='pl-2'> New drone </span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link' to='/add-base'>
              <FontAwesomeIcon icon={faBuilding} className='mr-2' />
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className='pl-2'> New Base</span>
            </Link>
          </li>
        </ul>

        <div id='content-wrapper' className='d-flex flex-column'>
          <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
            <form className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search'></form>

            <ul className='navbar-nav ml-auto'>
              <li className='nav-item dropdown no-arrow mx-1'>
                <Link
                  className='nav-link dropdown-toggle'
                  to='#'
                  id='alertsDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <FontAwesomeIcon icon={faBell} />
                  <span className='badge badge-danger badge-counter'>3+</span>
                </Link>
                <div
                  className='dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in'
                  aria-labelledby='alertsDropdown'>
                  <Link
                    className='dropdown-item d-flex align-items-center'
                    to='#'>
                    <div className='mr-3'>
                      <div className='icon-circle bg-primary'>
                        <FontAwesomeIcon icon={faFileAlt} />{' '}
                      </div>
                    </div>
                  </Link>
                  <Link
                    className='dropdown-item d-flex align-items-center'
                    to='#'>
                    <div className='mr-3'>
                      <div className='icon-circle bg-success'>
                        <FontAwesomeIcon icon={faDonate} />{' '}
                      </div>
                    </div>
                  </Link>
                </div>
              </li>

              <li className='nav-item dropdown no-arrow mx-1'>
                <Link
                  className='nav-link dropdown-toggle'
                  to='#'
                  id='messagesDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <FontAwesomeIcon icon={faEnvelope} />{' '}
                  <span className='badge badge-danger badge-counter'>7</span>
                </Link>
              </li>

              <div className='topbar-divider d-none d-sm-block'></div>

              <li className='nav-item dropdown no-arrow'>
                <Link
                  className='nav-link dropdown-toggle'
                  to='#'
                  id='userDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
                    User Name
                  </span>
                  <FontAwesomeIcon icon={faUser} />{' '}
                </Link>
              </li>
            </ul>
          </nav>
          <div className='container-fluid'>
            <div>{props.children}</div>
          </div>
        </div>
      </div>
      {/*  */};
    </>
  );
};
