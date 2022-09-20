import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../index_Reducer';
import Page from './page/index';

export default function Profile(props: any) {
  const user = useSelector((state: RootState) => state.login.user);
  return <>{user && <Page />}</>;
}
