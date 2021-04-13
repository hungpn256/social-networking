import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as profileActions from './../Profile/actions';
const Home = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
  const onChange = (e) => {
    const file = e.target.files[0];
    console.log(e, 'e');
    console.log(file, 'file');
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImageUrl('');
    }
  };
  const submit = (e) => {
    if (!image) {
      alert('chon file');
      return;
    }
    dispatch(profileActions.changeAvatar(image));
  };
  return (
    <>
      <input
        type="file"
        alt=""
        id="fileList"
        onChange={onChange}
        style={{ display: 'none' }}
      ></input>
      <label htmlFor="fileList">sdsd</label>
      {imageUrl !== '' && <img src={imageUrl} alt="" style={{ width: 200, height: 200 }}></img>}
      <button onClick={submit}>submit</button>
    </>
  );
};
export default Home;
