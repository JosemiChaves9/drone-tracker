import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { BaseLayout } from '../../components/BaseLayout';
import { ApiService } from '../../services/apiService';

export const DronesView = () => {
  const [res, setRes] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    ApiService.getDrones().then(
      (res) => {
        setRes(res);
      },
      (rej) => {
        if (rej.status === 401) {
          setErr('ERR_USER_NOT_LOGGED');
        }
      }
    );
  }, []);

  return (
    <BaseLayout>
      <div className='row'>
        {err && (
          <>
            <Redirect to='/login' />
          </>
        )}

        {res.map((drone: any) => {
          return (
            <div className='col-12 col-lg-6'>
              <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                  <h6 className='m-0 font-weight-bold text-primary'>
                    Drone: {drone.name}
                  </h6>
                </div>
                <div className='card-body'>
                  <ul>
                    <li key={drone.from}>From: {drone.from}</li>
                    <li onLoad={() => console.log('loading')}>
                      To: {drone.address}
                    </li>
                    <li>Battery: {drone.battery}%</li>
                    <li>Speed: {drone.speed} km/h</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BaseLayout>
  );
};
