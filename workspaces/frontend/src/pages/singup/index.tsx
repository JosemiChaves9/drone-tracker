import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ApiService } from '../../services/apiService';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck: string;
};

export const Singup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { register, handleSubmit } = useForm<Inputs>();

  const onClickOnSignup = (data: Inputs) => {
    setErrorMessage('');
    setSuccessMessage('');
    const { password, passwordCheck } = data;

    if (password !== passwordCheck) {
      setErrorMessage('¡Las contraseñas no coinciden!');
    }

    ApiService.createNewUser(data).then((res) => {
      res.ok ? setSuccessMessage('User Created!') : setErrorMessage(res.err);
      localStorage.setItem('usertoken', res.usertoken);
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
                          {...register('firstName', { required: true })}
                        />
                      </div>
                      <div className='col-sm-6'>
                        <input
                          className='form-control form-control-user'
                          placeholder='Last Name'
                          {...register('lastName', { required: true })}
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
