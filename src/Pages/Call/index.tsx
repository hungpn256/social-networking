import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../App';
import styles from './styles.module.css';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';
import { RootState } from '../../index_Reducer';
import { PhoneFilled } from '@ant-design/icons';
import { ICall } from '../../Models/chat';
import axios from 'axios';
import { ip } from '../../configs/ip';

interface Params {
  id: string;
}

export default function Call() {
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef();

  const { id } = useParams() as Params;
  const [stream, setStream] = useState<MediaStream>();
  const { user } = useSelector((state: RootState) => state.login);
  const { socket } = useContext(SocketContext);
  const [call, setCall] = useState<ICall | null>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [peers, setPeers] = useState<any[]>([]);

  const callUser = (id: string) => {
    if (socket) {
      const isHost = call?.createdBy._id === user?._id;
      const peer = new Peer({ initiator: isHost, trickle: false, stream });

      peer.on('signal', (data: any) => {
        socket.emit('join', { signal: data, callId: id });
      });

      peer.on('stream', (currentStream: any) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });
      if (!isHost && call) {
        console.log(
          '🚀 ~ file: index.tsx ~ line 49 ~ callUser ~ call.participants',
          call.participants
        );
        const length = call.participants.length;
        const signal = call.participants[0].signal;
        console.log('🚀 ~ file: index.tsx ~ line 54 ~ callUser ~ signal', signal);
        peer.signal(signal);
      } else {
        socket.on('user-join-call', ({ call }: { call: ICall }) => {
          console.log('🚀 ~ file: index.tsx ~ line 54 ~ socket.on ~ call', call);
          const length = call.participants.length;
          const signal = call.participants[length - 1].signal;
          console.log('🚀 ~ file: index.tsx ~ line 50 ~ socket.on ~ signal', signal);
          peer.signal(signal);
          setPeers([peer]);
        });
      }
      connectionRef.current = peer;
    }
  };

  useEffect(() => {
    if (id && socket && stream) {
      initData();
      socket.on('call-end', () => {
        console.log("🚀 ~ file: index.tsx ~ line 71 ~ socket.on ~ 'call-end'", 'call-end');
        window.close();
      });
    }
  }, [id, socket, stream]);

  useEffect(() => {
    if (call) {
      callUser(id);
    }
  }, [call]);

  const initData = async () => {
    const res = await axios.get(`${ip}/call/${id}`);
    const call = res.data.call as ICall;
    setCall(call);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);

      myVideo.current.srcObject = currentStream;
    });
  }, []);
  return (
    <div className={styles['container']}>
      <video playsInline ref={userVideo} autoPlay className={styles['video']} />
      <div className={styles['controller']}>
        <div className={styles['icon']}>
          <PhoneFilled style={{ color: '#ffffff', fontSize: 20 }} />
        </div>
      </div>
      <div className={styles['my-video']}>
        {stream && <video playsInline muted ref={myVideo} autoPlay className={styles['video']} />}
      </div>
    </div>
  );
}
