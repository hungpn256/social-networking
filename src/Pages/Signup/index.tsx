import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
// import {fa} from '@fortawesome/free-solid-svg-icons
function Signup() {
  return (
    <div className={styles['contentBx']}>
      <div className={styles['formBx']}>
        <h2>Signup</h2>
        <form>
          <div className={styles['inputBx']}>
            <span>First name</span>
            <input type="text" name="" />
          </div>
          <div className={styles['inputBx']}>
            <span>Last Name</span>
            <input type="text" name="" />
          </div>
          <div className={styles['inputBx']}>
            <span>Username</span>
            <input type="text" name="" />
          </div>
          <div className={styles['inputBx']}>
            <span>Password</span>
            <input type="password" name="" />
          </div>
          <div className={styles['inputBx']}>
            <input type="submit" value="Sign in" name="" />
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
