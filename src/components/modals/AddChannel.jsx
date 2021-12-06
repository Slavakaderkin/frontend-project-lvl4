import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Form,
  Button,
} from 'react-bootstrap';
import * as Yup from 'yup';

import { hideModal } from '../../store/slices/modalSlice.js';
import useSocket from '../../hooks/socket.jsx';

const AddChannel = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideModal());

  const channelsNames = useSelector((state) => state.channels.allIds
    .map((id) => state.channels.byId[id])
    .map((channel) => channel.name));

  const isOpened = useSelector((state) => state.modal.type !== null);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string('Имя канала должно быть строкой')
        .required('Имя канала не должно быть пустым')
        .min(2, 'Имя канала не должно быть меньше двух символов')
        .max(20, 'Имя канала не должно быть больше двадцати символов')
        .notOneOf(channelsNames, 'Имя канала должно быть уникальным'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const channel = { ...values };
      await socket.createChannel(channel);
      formik.resetForm();
      handleClose();
    },
  });

  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.errors.name}
              name="name"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </FormGroup>
          <Button className="mt-4 mr-2" type="submit" variant="primary" disabled={formik.isSubmitting}>Добавить</Button>
          <Button className="mt-4" variant="secondary" onClick={handleClose}>Закрыть</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
