import { BaseLayout } from '../../components/BaseLayout';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationArrow,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ApiBase } from '../../types';
import { useEffect } from 'react';
import { ApiService } from '../../services/ApiService';

export const AddDrone = () => {
  const { handleSubmit, register } = useForm();
  const [bases, setBases] = useState<ApiBase[]>();
  const [selectedBase, setSelectedBase] = useState<ApiBase>();

  useEffect(() => {
    ApiService.getBases().then((bases) => {
      setBases(bases);
    });
  }, []);

  const onClickOnAdd = (data: { droneName: string; baseName: string }) => {
    const base = bases?.find((base) => base.name === data.baseName);
  };
  return (
    <BaseLayout>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <h6 className='m-0 font-weight-bold text-primary'>Add a new drone</h6>
        </div>
        <div className='card-body'>
          <form className='user' onSubmit={handleSubmit(onClickOnAdd)}>
            <div className='form-group'>
              <h5>Drone name</h5>
              <input
                type='text'
                className='form-control'
                {...register('droneName', { required: true })}
              />
            </div>
            <div className='form-group'>
              <h5>In which base is this drone?</h5>

              <select
                className='form-control'
                defaultValue='placeholder'
                {...register('baseName', { required: true })}>
                <option value='placeholder' disabled className='disabled'>
                  Base name
                </option>
                {bases?.map((base) => {
                  return (
                    <option value={base.name} key={base.id}>
                      {base.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className='btn btn-success btn-icon-split'>
              <span className='icon text-white-50'>
                <FontAwesomeIcon icon={faPlusCircle} />
              </span>
              <span className='text'>Add drone</span>
            </button>
          </form>
        </div>
      </div>{' '}
    </BaseLayout>
  );
};
