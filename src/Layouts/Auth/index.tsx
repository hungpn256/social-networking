import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styles from './styles.module.css';
function Auth({ routes, children }) {
  return (
    <div className={styles['Login']}>
      <div className={styles['WrapperApp']}>
        <div className={styles['App']}>
          <section className={styles['AppLogin']}>
            <div className={styles['imgBx']}>
              <img src="https://dulichviet.com.vn/images/bandidau/du-lich-nuoc-ngoai.png" alt="" />
            </div>
            <div style={{ width: '100%', zIndex: 2 }}>
              <Route path="/auth" exact>
                <Redirect to="/auth/login"></Redirect>
              </Route>
              {routes.map((route: any) => {
                return <Route path={route.path} component={route.component}></Route>;
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Auth;
