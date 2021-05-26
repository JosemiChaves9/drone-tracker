import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BaseLayout } from '../../components/BaseLayout';
import { useForm } from 'react-hook-form';
import type { NewAddress } from '../../types';
import { ApiService } from '../../services/ApiService';
import { useState } from 'react';
import opencage from 'opencage-api-client';

export const DroneControl = () => {
  const { register, handleSubmit } = useForm<NewAddress>();
  const [fromAddress, setFromAddress] = useState<any[]>();
  const [toAddress, setToAddress] = useState<any[]>();

  // Create POST request, sending drone name, and coordinates, this request will generate the route, generate movement id (random id)
  // Create service, startDroneMovement(droneId, startPos, endPos), susbcribeToDroneMovement(droneId, callback())

  console.log(fromAddress);
  const geocode = async (query: string, setStateFn: (param: any) => void) => {
    opencage
      .geocode({ q: query, key: process.env.REACT_APP_OPENCAGE_API_KEY })
      .then((data) => {
        setStateFn(data.result);
      })
      .catch((error) => {
        console.log('error', error.message);
      });
  };

  const onClickOnSend = (data: NewAddress) => {
    ApiService.newAddress(data).then((res) => {
      console.log(res);
    });
  };

  return (
    <BaseLayout>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <h6 className='m-0 font-weight-bold text-primary'>Drone Control</h6>
        </div>
        <div className='card-body'>
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
                <option value='1MZ50'>1MZ50</option>
              </select>
            </div>
            <div className='form-group'>
              <h5>New direction</h5>
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
              {/* <datalist id='addressFrom'>
                {fromAddress?.map((street) => {
                  return <option value={street.formatted} />;
                })}
              </datalist> */}
            </div>

            <div className='form-group'>
              <h5>New direction</h5>
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
                {toAddress?.map((street) => {
                  return <option value={street.formatted} />;
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
