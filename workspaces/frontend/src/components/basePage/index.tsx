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
            <a className='nav-link' href='index.html'>
              <FontAwesomeIcon icon={faMapMarkedAlt} />
              <span className='pl-2'>Overview</span>
            </a>
          </li>

          <hr className='sidebar-divider my-2' />

          <div className='sidebar-heading'>Filter</div>

          <li className='nav-item'>
            <a className='nav-link collapsed' href='#'>
              <FontAwesomeIcon icon={faBuilding} />
              <span className='pl-2'>Bases</span>
            </a>
          </li>

          <li className='nav-item'>
            <a className='nav-link collapsed' href='#'>
              <FontAwesomeIcon icon={faPaperPlane} />
              <span className='pl-2'>Drones</span>
            </a>
          </li>

          <hr className='sidebar-divider my-2' />

          <div className='sidebar-heading'>Control</div>

          <li className='nav-item'>
            <a className='nav-link collapsed' href='#'>
              <FontAwesomeIcon icon={faGamepad} />

              <span className='pl-2'>Drone Control</span>
            </a>
          </li>

          <hr className='sidebar-divider my-2' />
          <div className='sidebar-heading'>Add</div>

          <li className='nav-item'>
            <a className='nav-link' href='charts.html'>
              <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className='pl-2'> New drone </span>
            </a>
          </li>

          <li className='nav-item'>
            <a className='nav-link' href='tables.html'>
              <FontAwesomeIcon icon={faBuilding} className='mr-2' />
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className='pl-2'> New Base</span>
            </a>
          </li>
        </ul>
        <div id='content-wrapper' className='d-flex flex-column'>
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
                  <a
                    className='dropdown-item d-flex align-items-center'
                    href='#'>
                    <div className='mr-3'>
                      <div className='icon-circle bg-primary'>
                        <FontAwesomeIcon icon={faFileAlt} />{' '}
                      </div>
                    </div>
                  </a>
                  <a
                    className='dropdown-item d-flex align-items-center'
                    href='#'>
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
          <div className='container-fluid'>
            <div>{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
