import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spin } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ip } from '../../configs/ip';
import styles from '../Signup/styles.module.css';
import queryString from 'query-string';

export interface ILogin {
  email: string;
  password: string;
}
function ConfirmPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { token } = queryString.parse(location.search);
  const onSubmit = async (data: { password: string; rePassword: string }) => {
    try {
      setLoading(true);
      const { password, rePassword } = data;
      if (password === rePassword) {
        await axios.post(`${ip}/auth/confirm-password`, { password, token });
        toast.success('change password success');
        history.replace('/auth/login');
      } else {
        toast.error('password not match');
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles['contentBx']}>
      <div className={styles['formBx']}>
        <h2>Confirm password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['inputBx']}>
            <span>Password</span>
            <input type="password" {...register('password', { required: true })} />
            {errors.password && <span className={styles['error']}>This field is required</span>}
          </div>
          <div className={styles['inputBx']}>
            <span>Re-Password</span>
            <input type="password" {...register('rePassword', { required: true })} />
            {errors.rePassword && <span className={styles['error']}>This field is required</span>}
          </div>

          <div className={styles['inputBx']}>
            <Spin size="large" delay={500} spinning={loading}>
              <input type="submit" value="Submit" name="" />
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

export default ConfirmPassword;
