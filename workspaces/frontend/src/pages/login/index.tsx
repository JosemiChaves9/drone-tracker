import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ApiService } from '../../services/apiService';

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onClickOnLogin = (data: Inputs) => {
    console.log(data);
    ApiService.loginUser(data).then();
  };
  return (
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
                        <h1 className='h4 text-gray-900 mb-4'>Welcome Back!</h1>
                      </div>
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
  );
};
