import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faPaperPlane,
  faGamepad,
  faPlusCircle,
  faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
  return (
    <>
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
    </>
  );
};
