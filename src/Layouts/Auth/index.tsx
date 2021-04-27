import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styles from './styles.module.css';
import authBackground from '../../Assets/authBackground.jpg';
function Auth({ routes }) {
  return (
    <div className={styles['Login']}>
      <div className={styles['WrapperApp']}>
        <div className={styles['App']}>
          <section className={styles['AppLogin']}>
            <div className={styles['imgBx']}>
              <img src={authBackground} alt="" />
            </div>
            <div style={{ width: '100%', zIndex: 2 }}>
              <Route path="/auth" exact>
                <Redirect to="/auth/login"></Redirect>
              </Route>
              {routes.map((route: any, index: number) => {
                return (
                  <Route
                    key={index + Math.random()}
                    path={route.path}
                    component={route.component}
                  ></Route>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Auth;
