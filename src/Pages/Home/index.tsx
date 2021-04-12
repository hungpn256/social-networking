import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBarHeader from '../../Components/NavBarHeader';
import Page from './page/index';

export default function Home(props: any) {
  const [current, setCurrent] = useState('mail');
  const user = useSelector((state) => state.login.user);

  const onSearch = (value: string) => console.log(value);
  return (
    <>
      <NavBarHeader />
      <Page user={user} />
    </>
  );
}
