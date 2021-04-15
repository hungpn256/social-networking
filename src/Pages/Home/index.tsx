import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import Article from '../../Components/Article/Article';
import PostArticle from '../../Components/PostArticle';
import FollowFriends from '../../Components/FollowFriends';
const colArticle = {
  sm: 24,
  md: 14,
  xl: 8,
};
const colSliderLeft = {
  sm: 0,
  md: 0,
  xl: 8,
};
const colSliderRight = {
  sm: 0,
  md: 10,
  xl: 8,
};
const Home = () => {
  return (
    <div style={{ background: '#f5f5f5' }}>
      <Row>
        <Col {...colSliderLeft}>
          <Card>slider</Card>
        </Col>
        <Col {...colArticle}>
          <PostArticle />
        </Col>
        <Col {...colSliderRight}>
          <Card>
            <FollowFriends />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
