import { Typography, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

export default function Para() {
  const [ellipsis, setEllipsis] = React.useState(true);
  const { Paragraph } = Typography;
  return (
    <div>
      <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>
    </div>
  );
}
