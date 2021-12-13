import React, { useRef, useEffect, useState } from 'react';
import {
  Form,
  Card,
  Container,
  Button,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/auth.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef();
  const feedback = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, t('errors.nameLength'))
        .max(20, t('errors.nameLength'))
        .required(t('errors.empty')),
      password: Yup.string()
        .min(4, t('errors.passLength'))
        .required(t('errors.empty')),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn(data);
        history.push('/');
      } catch (e) {
        if (e.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          feedback.current.innerHTML = t('errors.auth');
        }
        throw e;
      }
    },
  });

  useEffect(() => inputRef.current.focus(), []);

  return (
    <Container className="justify-content-center d-flex align-content-center flex-wrap h-100 lg">
      <Card style={{ width: '30rem' }}>
        <Card.Header as="h3">{t('login.formTitle')}</Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit} className="pt-3 pb-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">{t('login.nameLabel')}</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                name="username"
                id="username"
                required
                ref={inputRef}
                isInvalid={authFailed || (formik.touched.username && formik.errors.username)}
                isValid={formik.touched.username && !formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">{t('login.passwordLabel')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                id="password"
                required
                isInvalid={authFailed || (formik.touched.password && formik.errors.password)}
                isValid={formik.touched.password && !formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2" disabled={formik.isSubmitting}>{t('login.sendButton')}</Button>
          </Form>
          <Card.Text ref={feedback} className="text-danger" />
        </Card.Body>
        <Card.Footer className="text-center">
          <Card.Link as={Link} to="/signup">{t('login.signUpLink')}</Card.Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
