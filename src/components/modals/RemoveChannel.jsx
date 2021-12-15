import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { hideModal } from '../../store/slices/modalSlice.js';
import useSocket from '../../hooks/socket.jsx';

const RemoveChannel = () => {
  const [removing, setRemoving] = useState(false);
  const socket = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(hideModal());

  const channel = useSelector((state) => state.modal.extra);

  const isOpened = useSelector((state) => state.modal.type !== null);

  const handleRemove = (c) => async (e) => {
    try {
      e.preventDefault();
      setRemoving(true);
      await socket.deleteChannel(c);
      setRemoving(false);
      handleClose();
      toast.success(t('modal.successRemoved'));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modal.confirmation', { channel })}</p>
        <Button className="mt-4 mr-2" type="submit" variant="primary" disabled={removing} onClick={handleRemove(channel)}>{t('modal.removeButton')}</Button>
        <Button className="mt-4" variant="secondary" onClick={handleClose}>{t('modal.closeButton')}</Button>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
