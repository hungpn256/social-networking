import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as signUpActions from './actions';
import styles from './styles.module.css';
import ISignUpState from '../../Models/signUp';
import { toast } from 'react-toastify';
export interface ISignup {
  email: string;
  password: string;
  EPassword?: string;
  gender: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}
function Signup(props: any) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signUp = useSelector((state: { signUp: ISignUpState }) => state.signUp);
  const { requesting, success } = signUp;
  const onSubmit = (data: ISignup) => {
    const { password, EPassword } = data;
    if (password === EPassword) {
      data.EPassword = undefined;
      dispatch(signUpActions.signUp(data));
    } else {
      toast.error('password does not match');
    }
  };
  useEffect(() => {
    return () => {
      dispatch(signUpActions.clearState());
    };
  }, [dispatch]);
  if (success) {
    return <Redirect to="/auth/login" />;
  }
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
            <span>Phone Number</span>
            <input type="text" {...register('phoneNumber', { required: true })} />
            {errors.phoneNumber && <span className={styles['error']}>This field is required</span>}
          </div>
          <div className={styles['inputBx']}>
            <span>Gender</span>
            <select className={styles['select-gender']} {...register('gender', { required: true })}>
              <option value={0}>Male</option>
              <option value={1}>Female</option>
              <option value={2}>Other</option>
            </select>
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
              <span>Re-Password</span>
              <input type="password" {...register('EPassword', { required: true })} />
              {errors.EPassword && <span className={styles['error']}>This field is required</span>}
            </div>
          </div>
          <div className={styles['inputBx']}>
            <Spin delay={500} spinning={requesting}>
              <input type="submit" value="Sign up" name="" />
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
