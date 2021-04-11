import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router';

const NotFound = () => {
  const history = useHistory();
  return (
    <div style={{ textAlign: 'center', color: 'red', fontSize: 30 }}>
      {' '}
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.push('/');
            }}
          >
            Back Home
          </Button>
        }
      />
      ,
    </div>
  );
};

export default NotFound;
