import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBarHeader from '../../Components/NavBarHeader';

export default function Home(props: any) {
  const [current, setCurrent] = useState('mail');
  const user = useSelector((state) => state.login.user);
  console.log(user.avatar.viewUrl, 'user');
  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const onSearch = (value: string) => console.log(value);
  return (
    <>
      <NavBarHeader />
    </>
  );
}
