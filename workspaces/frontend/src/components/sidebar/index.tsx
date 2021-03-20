import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faCog,
  faWrench,
  faFolder,
  faChartArea,
  faTable,
} from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
  return (
    <>
      <ul
        className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
        id='accordionSidebar'>
        <img src='/drone-tracker-logo.png' alt='' className='m-2 my-4' />

        <hr className='sidebar-divider my-0' />

        <li className='nav-item active'>
          <a className='nav-link' href='index.html'>
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span> Dashboard</span>
          </a>
        </li>

        <hr className='sidebar-divider' />

        <div className='sidebar-heading'>Interface</div>

        <li className='nav-item'>
          <a
            className='nav-link collapsed'
            href='#'
            data-toggle='collapse'
            data-target='#collapseTwo'
            aria-expanded='true'
            aria-controls='collapseTwo'>
            <FontAwesomeIcon icon={faCog} />
            <span> Components</span>
          </a>
          <div
            id='collapseTwo'
            className='collapse'
            aria-labelledby='headingTwo'
            data-parent='#accordionSidebar'>
            <div className='bg-white py-2 collapse-inner rounded'>
              <h6 className='collapse-header'>Custom Components:</h6>
              <a className='collapse-item' href='buttons.html'>
                Buttons
              </a>
              <a className='collapse-item' href='cards.html'>
                Cards
              </a>
            </div>
          </div>
        </li>

        <li className='nav-item'>
          <a
            className='nav-link collapsed'
            href='#'
            data-toggle='collapse'
            data-target='#collapseUtilities'
            aria-expanded='true'
            aria-controls='collapseUtilities'>
            <FontAwesomeIcon icon={faWrench} />
            <span> Utilities</span>
          </a>
          <div
            id='collapseUtilities'
            className='collapse'
            aria-labelledby='headingUtilities'
            data-parent='#accordionSidebar'>
            <div className='bg-white py-2 collapse-inner rounded'>
              <h6 className='collapse-header'>Custom Utilities:</h6>
              <a className='collapse-item' href='utilities-color.html'>
                Colors
              </a>
              <a className='collapse-item' href='utilities-border.html'>
                Borders
              </a>
              <a className='collapse-item' href='utilities-animation.html'>
                Animations
              </a>
              <a className='collapse-item' href='utilities-other.html'>
                Other
              </a>
            </div>
          </div>
        </li>

        <hr className='sidebar-divider' />

        <div className='sidebar-heading'>Addons</div>

        <li className='nav-item'>
          <a
            className='nav-link collapsed'
            href='#'
            data-toggle='collapse'
            data-target='#collapsePages'
            aria-expanded='true'
            aria-controls='collapsePages'>
            <FontAwesomeIcon icon={faFolder} />
            <span> Pages</span>
          </a>
          <div
            id='collapsePages'
            className='collapse'
            aria-labelledby='headingPages'
            data-parent='#accordionSidebar'>
            <div className='bg-white py-2 collapse-inner rounded'>
              <h6 className='collapse-header'>Login Screens:</h6>
              <a className='collapse-item' href='login.html'>
                Login
              </a>
              <a className='collapse-item' href='register.html'>
                Register
              </a>
              <a className='collapse-item' href='forgot-password.html'>
                Forgot Password
              </a>
              <div className='collapse-divider'></div>
              <h6 className='collapse-header'>Other Pages:</h6>
              <a className='collapse-item' href='404.html'>
                404 Page
              </a>
              <a className='collapse-item' href='blank.html'>
                Blank Page
              </a>
            </div>
          </div>
        </li>

        <li className='nav-item'>
          <a className='nav-link' href='charts.html'>
            <FontAwesomeIcon icon={faChartArea} />
            <span> Charts</span>
          </a>
        </li>

        <li className='nav-item'>
          <a className='nav-link' href='tables.html'>
            <FontAwesomeIcon icon={faTable} />
            <span> Tables</span>
          </a>
        </li>
      </ul>
    </>
  );
};
