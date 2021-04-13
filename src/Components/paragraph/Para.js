import { Typography, Switch, Image } from 'antd';
import React, { useEffect, useState } from 'react';

export default function Para() {
  const [ellipsis, setEllipsis] = React.useState(true);
  const { Paragraph } = Typography;
  return (
    <div style={{ margin: 16 }}>
      <Paragraph
        ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}
        style={{ fontSize: 14 }}
      >
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>
      <Image.PreviewGroup>
        <Image
          style={{ aspectRatio: 1 / 1 }}
          src={
            'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/67906894_2517475325139482_4944660539235106816_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=2Is_rYUKT1QAX8uwfn0&_nc_ht=scontent.fhan2-1.fna&oh=c94d7944bcc6891ac334a1ed3e752e3f&oe=6099D45D'
          }
        ></Image>
      </Image.PreviewGroup>
    </div>
  );
}
