import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spin } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import styles from '../Signup/styles.module.css';
import * as LoginActions from './actions';
import IloginState from '../../Models/login';
// import {fa} from '@fortawesome/free-solid-svg-icons
export interface ILogin {
  email: string;
  password: string;
}
function Login() {
  const { state: stateLocation }: { state: { prePath: string } } = useLocation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: ILogin) => {
    const { email, password } = data;
    dispatch(LoginActions.login({ email, password }));
  };
  const login = useSelector((state: { login: IloginState }) => state.login);
  const { requesting, success } = login;
  if (success) {
    return <Redirect to={stateLocation?.prePath ?? '/'}></Redirect>;
  }
  return (
    <div className={styles['contentBx']}>
      <div className={styles['formBx']}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['inputBx']}>
            <span>Email</span>
            <input type="text" {...register('email', { required: true })} />
            {errors.email && <span className={styles['error']}>This field is required</span>}
          </div>
          <div className={styles['inputBx']}>
            <span>Password</span>
            <input type="password" {...register('password', { required: true })} />
            {errors.password && <span className={styles['error']}>This field is required</span>}
          </div>
          <div className={styles['remember']}>
            <label>
              <input type="checkbox" {...register('remember')} />
              Remember me
            </label>
          </div>
          <div className={styles['inputBx']}>
            <Spin size="large" delay={500} spinning={requesting}>
              <input type="submit" value="Sign in" name="" />
            </Spin>
          </div>
          <div className={styles['inputBx']}>
            <p>
              Don't have an account?
              <Link to="/auth/signup">Sign up</Link>
            </p>
          </div>
        </form>
        <h3>Login with social media</h3>
        <ul className={styles['sci']}>
          <li>
            <FontAwesomeIcon icon={faFacebook} />
          </li>
          <li>
            <FontAwesomeIcon icon={faInstagram} />
          </li>
          <li>
            <FontAwesomeIcon icon={faTwitter} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
