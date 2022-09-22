import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spin } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ip } from '../../configs/ip';
import styles from '../Signup/styles.module.css';
export interface ILogin {
  email: string;
  password: string;
}
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: ILogin) => {
    try {
      setLoading(true);
      const { email } = data;
      await axios.post(`${ip}/auth/send-email-forgot-password`, { email });
      toast.success('Please check your email for confirmation');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles['contentBx']}>
      <div className={styles['formBx']}>
        <h2>Forgot password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['inputBx']}>
            <span>Email</span>
            <input type="text" {...register('email', { required: true })} />
            {errors.email && <span className={styles['error']}>This field is required</span>}
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

export default ForgotPassword;
