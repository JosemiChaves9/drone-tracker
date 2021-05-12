import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { BaseLayout } from '../../components/BaseLayout';
import { ApiService } from '../../services/ApiService';

export const DronesView = () => {
  const [drones, setDrones] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    ApiService.getDrones().then(
      (drones) => {
        setDrones(drones);
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

        {drones.map((drone: any) => {
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
                    <li key={drone.address}>To: {drone.address}</li>
                    <li key={drone.battery}>Battery: {drone.battery}%</li>
                    <li key={drone.speed}>Speed: {drone.speed} km/h</li>
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
