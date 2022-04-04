import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import style from '../css/Main.module.css';
import useModal from '../Hooks/useModal';
import { openDetailModal } from '../store/global';
import LetterDetail from './LetterDetail';

function LetterList() {
  const letterList = useSelector((state) => state.letter.letters);
  const dispatch = useDispatch();
  return (
    <>
      <Row gutter={[20, 20]} align="center" sm={12}>
        {letterList.map((letter) => (
          <Col lg={12} xs={22}>
            <Card bordered={false} hoverable className={style.card} onClick={() => dispatch(openDetailModal())}><Meta title={letter.createAt} description={letter.title} /></Card>
          </Col>
        ))}
      </Row>
      <LetterDetail />
    </>

  );
}

export default LetterList;
