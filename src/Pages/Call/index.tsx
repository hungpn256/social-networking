import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../App';
import styles from './styles.module.css';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';
import { RootState } from '../../index_Reducer';

interface Params {
  id: string;
}

export default function Call() {
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef();

  const { id } = useParams() as Params;
  console.log('🚀 ~ file: index.tsx ~ line 19 ~ Call ~  useParams()', useParams());
  const [stream, setStream] = useState<MediaStream>();
  const { user } = useSelector((state: RootState) => state.login);
  const { socket } = useContext(SocketContext);
  const [callAccepted, setCallAccepted] = useState(false);

  const callUser = (id: string) => {
    if (socket) {
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on('signal', (data: any) => {
        socket.emit('call-conversation', { conversationId: id, signalData: data, from: user!._id });
      });

      peer.on('stream', (currentStream: any) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });

      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);

        peer.signal(signal);
      });

      connectionRef.current = peer;
    }
  };

  useEffect(() => {
    if (id && socket) {
      callUser(id);
    }
  }, [id, socket]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);

      myVideo.current.srcObject = currentStream;
    });
  }, []);
  return (
    <div className={styles['container']}>
      {stream && <video playsInline muted ref={myVideo} autoPlay className={styles['my-video']} />}
    </div>
  );
}
