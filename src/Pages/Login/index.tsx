import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './styles.module.css';
// import {fa} from '@fortawesome/free-solid-svg-icons
function Login() {
  return (
    <div className={styles['contentBx']}>
      <div className={styles['formBx']}>
        <h2>Login</h2>
        <form>
          <div className={styles['inputBx']}>
            <span>Username</span>
            <input type="text" name="" />
          </div>
          <div className={styles['inputBx']}>
            <span>Password</span>
            <input type="password" name="" />
          </div>
          <div className={styles['remember']}>
            <label>
              <input type="checkbox" name="" />
              Remember me
            </label>
          </div>
          <div className={styles['inputBx']}>
            <input type="submit" value="Sign in" name="" />
          </div>
          <div className={styles['inputBx']}>
            <p>
              Don't have an account?
              <a href="/auth/signup">Sign up</a>
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
