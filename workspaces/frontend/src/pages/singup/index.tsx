import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Router, useHistory } from 'react-router-dom';
import { UserContext } from '../../components/context';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ApiService } from '../../services/ApiService';
import type {
  ApiGenericResponse,
  ApiUserCreationResponse,
  NewUser,
} from '../../types';

export const Singup = () => {
  const history = useHistory();
  const { changeLogged } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // eslint-disable-next-line
  const [usertoken, setUsertoken] = useLocalStorage('usertoken');
  const { register, handleSubmit } = useForm<NewUser>();

  const onClickOnSignup = (data: NewUser) => {
    setErrorMessage('');
    setSuccessMessage('');
    const { password, passwordCheck } = data;

    if (password !== passwordCheck) {
      setErrorMessage("¡Password don't match!");
    }

    ApiService.createNewUser(data).then((res) => {
      if (res.ok) {
        const response = res as ApiUserCreationResponse;
        setSuccessMessage('User Created!');
        setUsertoken(response.usertoken);
        history.push('/');
        changeLogged();
      } else {
        const error = res as ApiGenericResponse;
        setErrorMessage(error.err);
      }
    });
  };

  return (
    <div className='bg-gradient-primary'>
      <div className='container py-5'>
        <div className='card o-hidden border-0 shadow-lg '>
          <div className='card-body p-0'>
            <div className='row'>
              <div className='col-lg-5 d-none d-lg-block bg-register-image'></div>
              <div className='col-lg-7'>
                <div className='p-5'>
                  <div className='text-center'>
                    <h1 className='h4 text-gray-900 mb-4'>
                      Create an Account!
                    </h1>
                    {errorMessage && (
                      <h6 className='alert-danger rounded p-3'>
                        {errorMessage}
                      </h6>
                    )}
                    {successMessage && (
                      <h6 className='alert-success rounded p-3'>
                        {successMessage}
                      </h6>
                    )}
                  </div>
                  <form
                    className='user'
                    onSubmit={handleSubmit(onClickOnSignup)}>
                    <div className='form-group row'>
                      <div className='col-sm-6 mb-3 mb-sm-0'>
                        <input
                          className='form-control form-control-user'
                          placeholder='First Name'
                          {...register('firstname', { required: true })}
                        />
                      </div>
                      <div className='col-sm-6'>
                        <input
                          className='form-control form-control-user'
                          placeholder='Last Name'
                          {...register('lastname', { required: true })}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <input
                        type='email'
                        className='form-control form-control-user'
                        placeholder='Email Address'
                        {...register('email', { required: true })}
                      />
                    </div>
                    <div className='form-group row'>
                      <div className='col-sm-6 mb-3 mb-sm-0'>
                        <input
                          type='password'
                          className='form-control form-control-user'
                          placeholder='Password'
                          {...register('password', { required: true })}
                        />
                      </div>
                      <div className='col-sm-6'>
                        <input
                          type='password'
                          className='form-control form-control-user'
                          placeholder='Repeat Password'
                          {...register('passwordCheck', { required: true })}
                        />
                      </div>
                    </div>
                    <button className='btn btn-primary btn-user btn-block'>
                      Register Account
                    </button>
                    <hr />
                  </form>
                  <div className='text-center'>
                    <Link className='small' to='/passwordRecovery'>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className='text-center'>
                    <Link className='small' to='/login'>
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
