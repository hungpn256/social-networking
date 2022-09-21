import { Col, Divider, Image, Row, Tabs } from 'antd';
import usePhotos from '../../../../Hook/usePhotos';
import IUser from '../../../../Models/user';
import styles from './styles.module.css';

export default function Photos({ userProfile }: { userProfile: IUser | null }) {
  const { files } = usePhotos(userProfile?._id);
  const photos = files.filter((i) => i.typeMedia === 'IMAGE');
  const video = files.filter((i) => i.typeMedia === 'VIDEO');
  return (
    <div className={styles['grid']}>
      <div className={styles['name']}>Photos 's {userProfile?.firstName}</div>
      <Divider orientation="left"></Divider>
      <Tabs type="card">
        <Tabs.TabPane tab="Photos" key="item-1">
          <Row gutter={8}>
            {photos.map((i) => {
              return (
                <Col className="gutter-row" span={6}>
                  <div className={styles['image-wrapper']}>
                    <Image src={i.url} className={styles['image']} />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Video" key="item-2">
          <Row gutter={8}>
            {video.map((i) => {
              return (
                <Col className="gutter-row" span={6}>
                  <div className={styles['image-wrapper']}>
                    <video className={styles['image']} controls>
                      <source src={i.url} />
                    </video>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
