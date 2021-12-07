import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';

import useAuth from '../hooks/auth.jsx';
import useSocket from '../hooks/socket.jsx';

const Chat = () => {
  const auth = useAuth();
  const socket = useSocket();

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = useSelector((state) => {
    const { allIds, byId } = state.messages;
    return allIds.map((id) => byId[id])
      .filter((msg) => msg.channelId === currentChannelId);
  });

  const renderMessages = () => (
    <div className="mt-3 ml-3 mr-4 overflow-auto">
      {currentChannelMessages.map((msg) => (
        <p key={msg.id}>
          <span className="font-weight-bold">{`${msg.author}: `}</span>
          {msg.text}
        </p>
      ))}
    </div>
  );

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: Yup.object({
      text: Yup
        .string('Сообщение должно быть строкой')
        .required('Сообщение не должно быть пустым'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const msg = {
        ...values,
        channelId: currentChannelId,
        author: auth.user.usernname,
        createAt: Date.now(),
      };

      await socket.sendMessage(msg);

      formik.resetForm();
    },
  });

  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, [currentChannelId]);

  return (
    <main className="col-10 d-flex flex-column flex-fill justify-content-end">
      {renderMessages()}
      <Form className="m-3" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            placeholder="Сообщение..."
            name="text"
            ref={input}
            aria-label="message"
            aria-describedby="basic-addon2"
            value={formik.values.text}
            onChange={formik.handleChange}
            isInvalid={formik.errors.text}
          />
          <Button variant="outline-primary" id="button-addon2">
            Отправить
          </Button>
          <Form.Control.Feedback type="invalid">{formik.errors.text}</Form.Control.Feedback>
        </InputGroup>
      </Form>
    </main>
  );
};

export default Chat;
