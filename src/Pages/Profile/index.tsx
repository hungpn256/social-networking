import React from 'react';
import { useSelector } from 'react-redux';
import Page from './page/index';

export default function Profile(props: any) {
  const user = useSelector((state) => state.login.user);
  return (
    <>
      <Page user={user} />
    </>
  );
}
