import { Button, Col, Modal, Row, Table } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { useState } from 'react';
import style from '../css/Main.module.css';

function LetterDetail() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (

    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="2022-03-18"
        visible={isModalVisible}
        footer={[
          <Button type="info">
            미리보기
          </Button>,
          <Button type="success">
            수정
          </Button>,
          <Button type="danger">
            삭제
          </Button>]}
      >
        <div style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
          <Countdown title="개봉까지 남은시간" value={deadline} />
          <hr />
          <div style={{ padding: '10px' }}>
            <h1>제목입니다</h1>
          </div>
          <div style={{ padding: '10px' }}>
            <p>{'1.\n2.\n3.\n4.\n'}</p>
          </div>
        </div>
        <hr />
        <div style={{ textAlign: 'end' }}>

          <p>발신자: 나</p>
          <p>수신자: 너</p>
        </div>
      </Modal>
    </>
  );
}

export default LetterDetail;