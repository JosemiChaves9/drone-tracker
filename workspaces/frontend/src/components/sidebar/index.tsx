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
          <a className='nav-link collapsed' href='#'>
            <FontAwesomeIcon icon={faCog} />
            <span> Components</span>
          </a>
        </li>

        <li className='nav-item'>
          <a className='nav-link collapsed' href='#'>
            <FontAwesomeIcon icon={faWrench} />
            <span> Utilities</span>
          </a>
        </li>

        <hr className='sidebar-divider' />

        <div className='sidebar-heading'>Addons</div>

        <li className='nav-item'>
          <a className='nav-link collapsed' href='#'>
            <FontAwesomeIcon icon={faFolder} />
            <span> Pages</span>
          </a>
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
