import { Typography, Switch, Image, Avatar, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LazyLoad from 'react-lazyload';
export default function Para({ article, user }) {
  const [ellipsis, setEllipsis] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const { Paragraph } = Typography;
  return (
    <LazyLoad offset={100} height={100} style={{ background: '#f5f5f5' }}>
      <Card
        loading={loading}
        style={{
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: 10,
        }}
      >
        <div style={{ display: 'flex' }}>
          <div>
            <Avatar
              style={{ marginLeft: 15, marginTop: 10, height: 45, width: '45px' }}
              icon={<UserOutlined />}
              src={user?.avatar?.viewUrl ?? ''}
            />
          </div>

          <div style={{ marginTop: 9, marginLeft: 10 }}>
            <h3 style={{ fontWeight: 600, fontSize: 13, marginBottom: 0, color: 'black' }}>
              {user.name.firstName + ' ' + user.name.lastName}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h5 style={{ margin: 0, marginRight: 4, fontSize: 12 }}>36m</h5>
              <FontAwesomeIcon icon={faGlobeAmericas} />
            </div>
          </div>
        </div>
        <div style={{ margin: 16 }}>
          <Paragraph
            ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}
            style={{ fontSize: 14 }}
          >
            {article.text}
          </Paragraph>
          {article.imgs[0]?.viewUrl && (
            <Image.PreviewGroup>
              <Image
                width="100%"
                style={{ aspectRatio: 1 / 1, maxWidth: '100%' }}
                src={article.imgs[0]?.viewUrl.replace(/=s220*/, '')}
              ></Image>
            </Image.PreviewGroup>
          )}
        </div>
      </Card>
      <Image
        style={{ display: 'none' }}
        src={
          'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/67906894_2517475325139482_4944660539235106816_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=2Is_rYUKT1QAX8uwfn0&_nc_ht=scontent.fhan2-1.fna&oh=c94d7944bcc6891ac334a1ed3e752e3f&oe=6099D45D'
        }
        onLoad={() => setLoading(false)}
      ></Image>
    </LazyLoad>
  );
}
