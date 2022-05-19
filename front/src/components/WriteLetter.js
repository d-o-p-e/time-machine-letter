import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Input, Checkbox, Col, Row, DatePicker, TimePicker, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { usePostLetterMutation } from '../service/Letter';
import { closeWriteModal, openPreviewModal } from '../store/global';
import LetterPreviewModal from './LetterPreviewModal';
import { setSingleLetter } from '../store/letter';
import { convertSendDate } from '../utils/converter';

const { TextArea } = Input;

function WriteLetter() {
  const modalVisible = useSelector((state) => state.global.writeModal);
  const dispatch = useDispatch();
  const { handleSubmit, control, getValues, reset } = useForm();
  const [postLetter, result] = usePostLetterMutation();
  const formRef = useRef();
  const onSubmit = (data) => {
    const sendData = convertSendDate(data);
    postLetter(sendData);
    console.log(sendData);
  };
  useEffect(() => {
    if (result.isSuccess) {
      alert('메세지 보내기 성공');
      reset();
      dispatch(closeWriteModal());
    } else if (result.isError) {
      alert(result.error);
    }
  }, [result]);

  return (

    <Modal
      title="편지 작성"
      visible={modalVisible}
      onCancel={() => dispatch(closeWriteModal())}
      footer={[
        <Button type="info" onClick={() => { dispatch(setSingleLetter(convertSendDate(getValues()))); dispatch(openPreviewModal()); }}>
          미리보기
        </Button>,
        <LetterPreviewModal />,
        <Button type="primary" onClick={() => { formRef.current.submit(); }}>
          발송
        </Button>,
        <Button type="danger" onClick={() => dispatch(closeWriteModal())}>
          close
        </Button>]}
    >
      <Form onFinish={handleSubmit(onSubmit)} ref={formRef}>
        <Row justify="center">
          <Col>
            <Controller
              control={control}
              name="antdDatePicker"
              defaultValue={moment()}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}

                />
              )}
            />
            <Controller
              control={control}
              name="antdTimePicker"
              defaultValue={moment()}
              render={({ field: { onChange, onBlur, value } }) => (
                <TimePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="letterFrom"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input addonBefore="발신인" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Password placeholder=" password" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input placeholder="편지 제목" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextArea rows={8} placeholder="편지 본문" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="letterTo"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input addonBefore="수신인" style={{ marginTop: '20px' }} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
      </Form>
    </Modal>

  );
}

export default WriteLetter;
