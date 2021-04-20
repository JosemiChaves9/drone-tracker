import { Link } from 'react-router-dom';
import './index.scss';

export const Page404 = () => {
  return (
    <div id='layoutError'>
      <div id='layoutError_content'>
        <main>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-6'>
                <div className='text-center mt-4'>
                  <img
                    className='mb-4 img-error'
                    src='error-404-monochrome.svg'
                  />
                  <p className='lead'>
                    This requested URL was not found on this server.
                  </p>
                  <Link to='/'>
                    <i className='fas fa-arrow-left mr-1'></i>
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id='layoutError_footer'>
        <footer className='py-4 bg-light mt-auto'>
          <div className='container-fluid'>
            <div className='small'>
              <div className='text-muted'>Copyright &copy; DroneTracker</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
