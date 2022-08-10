import React from 'react';
import { Avatar, Card, List, Tabs } from 'antd';
import styles from './styles.module.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Meta } = Card;
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];
export default function Friend() {
  return (
    <div className={styles['grid']}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bạn bè" key="1">
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Yêu cầu kết bạn" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}
