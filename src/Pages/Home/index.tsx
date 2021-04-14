import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import Article from '../../Components/Article/Article';
import PostArticle from '../../Components/PostArticle';
const colArticle = {
  sm: 24,
  md: 12,
  xl: 8,
};
const colSlider = {
  sm: 0,
  md: 4,
  xl: 8,
};
const Home = () => {
  return (
    <div style={{ background: '#f5f5f5' }}>
      <Row>
        <Col {...colSlider}>
          <Card>slider</Card>
        </Col>
        <Col {...colArticle}>
          <PostArticle />
          <Article />
          <Article />
          <Article />
          <Article />
        </Col>
        <Col {...colSlider}>
          <Card>slider</Card>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
