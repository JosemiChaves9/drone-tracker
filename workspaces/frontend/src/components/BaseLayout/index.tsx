import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faPaperPlane,
  faGamepad,
  faPlusCircle,
  faMapMarkedAlt,
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
              <span className='pl-2'>Home</span>
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
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item '>
                <Link className='nav-link' to='/signup'>
                  <span className='mr-2 text-gray-600 small'>Signup</span>
                </Link>
              </li>
              <li className='nav-item '>
                <Link className='nav-link' to='/login'>
                  <span className='mr-2 text-gray-600 small'>Login</span>
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
