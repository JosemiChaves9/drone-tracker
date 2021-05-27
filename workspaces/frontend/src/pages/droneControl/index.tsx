import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BaseLayout } from '../../components/BaseLayout';
import { useForm } from 'react-hook-form';
import type { NewDelivery } from '../../types';
import { ApiService } from '../../services/ApiService';
import { useEffect, useState } from 'react';
import opencage from 'opencage-api-client';

export const DroneControl = () => {
  const { register, handleSubmit } = useForm<NewDelivery>();
  const [fromAddress, setFromAddress] = useState<any[]>();
  const [toAddress, setToAddress] = useState<any[]>();
  const [drones, setDrones] = useState<any[]>([]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getDrones().then((res) => setDrones(res));
  }, []);

  // ? how to type setState?
  const geocode = (query: string, setState: any) => {
    if (query.length > 5) {
      opencage
        .geocode({ q: query, key: process.env.REACT_APP_OPENCAGE_API_KEY })
        .then((data) => {
          setState(data.results);
        });
    } else {
      return;
    }
  };

  const onClickOnSend = (data: NewDelivery) => {
    console.log(data);
    ApiService.newDelivery(data).then((res) => {
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(res.err);
      }
    });
  };

  return (
    <BaseLayout>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <h6 className='m-0 font-weight-bold text-primary'>Drone Control</h6>
        </div>
        <div className='card-body'>
          {success && (
            <div className='alert alert-success' role='alert'>
              New delivery on the way!
            </div>
          )}
          {error && (
            <div className='alert alert-danger' role='alert'>
              There was an error:
            </div>
          )}
          <form className='user' onSubmit={handleSubmit(onClickOnSend)}>
            <div className='form-group'>
              <h5>Drone name</h5>
              <select
                className='form-control'
                {...register('droneName', { required: true })}
                defaultValue='placeholder'>
                <option value='placeholder' disabled>
                  Select a drone
                </option>
                {drones?.map((drone) => {
                  return (
                    <option value={drone.name} key={drone.id}>
                      {drone.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-group'>
              <h5>From:</h5>
              <input
                type='text'
                className='form-control'
                placeholder='Address from'
                {...register('addressFrom', { required: true })}
                onChange={(event) =>
                  geocode(event.target.value, setFromAddress)
                }
                list='addressFrom'
              />
              <datalist id='addressFrom'>
                {fromAddress?.map((street, idx) => {
                  return <option value={street.formatted} key={idx} />;
                })}
              </datalist>
            </div>

            <div className='form-group'>
              <h5>To:</h5>
              <input
                type='text'
                className='form-control'
                placeholder='Address to'
                {...register('addressTo', { required: true })}
                onChange={(event) => geocode(event.target.value, setToAddress)}
                list='addressTo 
                '
              />
              <datalist
                id='addressTo 
              '>
                {toAddress?.map((street, idx) => {
                  return <option value={street.formatted} key={idx} />;
                })}
              </datalist>
            </div>

            <button className='btn btn-success btn-icon-split'>
              <span className='icon text-white-50'>
                <FontAwesomeIcon icon={faLocationArrow} />
              </span>
              <span className='text'>Send to new location</span>
            </button>
          </form>
        </div>
      </div>{' '}
    </BaseLayout>
  );
};
