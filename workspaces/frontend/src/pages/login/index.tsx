import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../components/context';
import { ApiService } from '../../services/ApiService';
import type {
  ApiErrorResponse,
  ApiUserLoginResponse,
  LoginUser,
} from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginUser>();
  const [success, setSuccess] = useState<null | string>(null);
  const [err, setErr] = useState<null | string>(null);
  const { changeLogged } = useContext(UserContext);
  // eslint-disable-next-line
  const [usertoken, setUsertoken] = useLocalStorage<string>('usertoken');

  const onClickOnLogin = (data: LoginUser) => {
    setSuccess(null);
    setErr(null);
    ApiService.loginUser(data)
      .then((res) => {
        if (res.ok) {
          const response = res as ApiUserLoginResponse;
          setUsertoken(response.usertoken);
          setSuccess('Correct!');
          changeLogged();
        } else {
          const error = res as ApiErrorResponse;
          setErr(error.err);
        }
      })
      .catch(() => setErr('Something went wrong, check your credentials'));
  };

  return (
    <>
      {success && <Redirect to='/' />}
      <div className='bg-gradient-primary'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-10 col-lg-12 col-md-9'>
              <div className='card o-hidden border-0 shadow-lg my-5'>
                <div className='card-body p-0'>
                  <div className='row'>
                    <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>

                    <div className='col-lg-6'>
                      <div className='p-5'>
                        <div className='text-center'>
                          <h1 className='h4 text-gray-900 mb-4'>
                            Welcome Back!
                          </h1>
                        </div>
                        {err && (
                          <div className='alert alert-danger text-center'>
                            {err}
                          </div>
                        )}

                        <form
                          className='user'
                          onSubmit={handleSubmit(onClickOnLogin)}>
                          <div className='form-group'>
                            <input
                              type='email'
                              className='form-control form-control-user'
                              id='exampleInputEmail'
                              aria-describedby='emailHelp'
                              placeholder='Enter Email Address...'
                              {...register('email', { required: true })}
                            />
                          </div>
                          <div className='form-group'>
                            <input
                              type='password'
                              className='form-control form-control-user'
                              id='exampleInputPassword'
                              placeholder='Password'
                              {...register('password', { required: true })}
                            />
                          </div>
                          <div className='form-group'>
                            <div className='custom-control custom-checkbox small'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customCheck'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='customCheck'>
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <button className='btn btn-primary btn-user btn-block'>
                            Login
                          </button>
                        </form>
                        <hr />
                        <div className='text-center'>
                          <Link className='small' to='/passwordRecovery'>
                            Forgot Password?
                          </Link>
                        </div>
                        <div className='text-center'>
                          <Link className='small' to='/signup'>
                            Create an Account!
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
