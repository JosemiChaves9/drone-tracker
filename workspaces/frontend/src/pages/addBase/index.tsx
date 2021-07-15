import { BaseLayout } from '../../components/BaseLayout';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ApiService } from '../../services/ApiService';

export const NewBase = () => {
  const { handleSubmit, register } = useForm();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onClickOnAdd = (data: {
    baseName: string;
    baseStreetName: string;
    baseBuildingNumber: string;
    baseCity: string;
    baseCityPostalcode: string;
  }) => {
    ApiService.newBase(data).then(
      (res) => {
        if (res.ok) {
          setSuccess(`Base ${data.baseName} created!`);
        } else {
          setError('There was an erro');
        }
      },
      () => {
        setError('That was an internal error, contact with customer support.');
      }
    );
  };
  return (
    <BaseLayout>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <h6 className='m-0 font-weight-bold text-primary'>Add a new base</h6>
        </div>
        <div className='card-body'>
          {success && (
            <div className='alert alert-success' role='alert'>
              {success}
            </div>
          )}
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}
          <form className='user' onSubmit={handleSubmit(onClickOnAdd)}>
            <div className='form-group'>
              <h5>Base name:</h5>
              <input
                type='text'
                className='form-control'
                {...register('baseName', { required: true })}
                placeholder='What is the name of your new base?'
              />
            </div>
            <div className='form-group'>
              <h5>Street name:</h5>
              <input
                type='text'
                className='form-control'
                {...register('baseStreetName', { required: true })}
                placeholder='Name of the street where the base is located'
              />
            </div>
            <div className='form-group'>
              <h5>Number of the building:</h5>
              <input
                type='text'
                className='form-control'
                {...register('baseBuildingNumber', { required: true })}
                placeholder='Number of the building where the base is:'
              />
            </div>
            <div className='form-group'>
              <h5>City:</h5>
              <input
                type='text'
                className='form-control'
                {...register('baseCity', { required: true })}
                placeholder='City where the base is located'
              />
            </div>
            <div className='form-group'>
              <h5>Postal code:</h5>
              <input
                type='text'
                className='form-control'
                {...register('baseCityPostalcode', { required: true })}
                placeholder='Postalcode of the city where the base is located'
              />
            </div>

            <button className='btn btn-success btn-icon-split'>
              <span className='icon text-white-50'>
                <FontAwesomeIcon icon={faPlusCircle} />
              </span>
              <span className='text'>Add base</span>
            </button>
          </form>
        </div>
      </div>{' '}
    </BaseLayout>
  );
};
