import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../../Components/Article';
import { ip } from '../../configs/ip';

export default function ArticleDetail() {
  const { _id } = useParams() as any;
  const [article, setArticle] = useState();
  useEffect(() => {
    getArticle();
  }, [_id]);

  const getArticle = async () => {
    try {
      const res = await axios.get(`${ip}/post/detail/${_id}`);
      setArticle(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ margin: '0 auto', maxWidth: '1000px' }}>
      {article && <Article article={article} />}
    </div>
  );
}
