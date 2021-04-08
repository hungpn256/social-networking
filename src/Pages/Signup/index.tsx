import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import * as LoginActions from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
// import {fa} from '@fortawesome/free-solid-svg-icons
export interface ISignup {
  username: string;
  password: string;
}
function Signup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: ISignup) => {
    console.log(data);
  };
  // const login = useSelector((state) => state.login);
  // const { requesting, success } = login;
  // if (success) {
  //   return <Redirect to="/"></Redirect>;
  // }
  // console.log(login, 'login');
  return (
    <div className={styles['contentBx']}>
      <div className={styles['formBx']}>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['wrapper-name']}>
            <div className={styles['inputBx']} style={{ width: '50%', marginRight: 10 }}>
              <span>First name</span>
              <input
                // style={{ width: '50%' }}
                type="text"
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <span className={styles['error']}>This field is required</span>}
            </div>
            <div className={styles['inputBx']} style={{ width: '50%' }}>
              <span>Last name</span>
              <input type="text" {...register('lastName', { required: true })} />
              {errors.lastName && <span className={styles['error']}>This field is required</span>}
            </div>
          </div>

          <div className={styles['inputBx']}>
            <span>Email</span>
            <input type="text" {...register('email', { required: true })} />
            {errors.email && <span className={styles['error']}>This field is required</span>}
          </div>
          <div className={styles['inputBx']}>
            <span>Số điên thoại</span>
            <input type="text" {...register('phoneNumber', { required: true })} />
            {errors.phoneNumber && <span className={styles['error']}>This field is required</span>}
          </div>
          <div className={styles['wrapper-name']}>
            <div className={styles['inputBx']} style={{ width: '50%', marginRight: 10 }}>
              <span>Password</span>
              <input
                // style={{ width: '50%' }}
                type="password"
                {...register('password', { required: true })}
              />
              {errors.password && <span className={styles['error']}>This field is required</span>}
            </div>
            <div className={styles['inputBx']} style={{ width: '50%' }}>
              <span>Enter password</span>
              <input type="password" {...register('EPassword', { required: true })} />
              {errors.EPassword && <span className={styles['error']}>This field is required</span>}
            </div>
          </div>
          <div className={styles['inputBx']}>
            <Spin spinning={false}>
              <input type="submit" value="Sign in" name="" />
            </Spin>
          </div>
          <div className={styles['inputBx']}>
            <p>
              Have an account?
              <Link to="/auth/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
