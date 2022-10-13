import React, { useContext } from 'react';
import { CallContext } from '../../Context/CallContext';
import styles from './styles.module.css';
const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(CallContext);

  return (
    <div>
      {stream && <video playsInline muted ref={myVideo} autoPlay className={styles.video} />}
      {callAccepted && !callEnded && (
        <video playsInline ref={userVideo} autoPlay className={styles.video} />
      )}
    </div>
  );
};

export default VideoPlayer;
