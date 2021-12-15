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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { hideModal } from '../../store/slices/modalSlice.js';
import useSocket from '../../hooks/socket.jsx';

const RenameChannel = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(hideModal());

  const channelsNames = useSelector((state) => state.channels.allIds
    .map((id) => state.channels.byId[id])
    .map((channel) => channel.name));

  const currentChannel = useSelector((state) => state.modal.extra);

  const isOpened = useSelector((state) => state.modal.type !== null);

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: Yup.object({
      name: Yup
        .string(t('errors.string'))
        .required(t('errors.empty'))
        .min(2, t('errors.channelTitleLength'))
        .max(20, t('errors.channelTitleLength'))
        .notOneOf(channelsNames, t('errors.channelTitleUniq')),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const channel = { ...currentChannel, ...values };
        await socket.renameChannel(channel);
        formik.resetForm();
        handleClose();
        toast.success(t('modal.successRenamed'));
      } catch (err) {
        toast.error(err.message);
        throw err;
      }
    },
  });

  const input = useRef();

  useEffect(() => {
    input.current.select();
  }, []);

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename')}</Modal.Title>
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
          <Button className="mt-4 mr-2" type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modal.renameButton')}</Button>
          <Button className="mt-4" variant="secondary" onClick={handleClose}>{t('modal.closeButton')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
