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
import { toast } from 'react-toastify';

import useAuth from '../hooks/auth.jsx';
import routes from '../routes.js';

const SignupPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, t('errors.nameLength'))
        .max(20, t('errors.nameLength'))
        .required(t('errors.empty')),
      password: Yup.string()
        .min(6, t('errors.passLength'))
        .required(t('errors.empty')),
      passwordConfirmation: Yup.string()
        .required(t('errors.empty'))
        .oneOf([Yup.ref('password')], t('errors.passConfirmation')),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.signupPath(), values);
        auth.logIn(data);
        history.push('/');
      } catch (e) {
        if (e.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          toast.error(t('errors.conflict'));
        }
        throw e;
      }
    },
  });

  useEffect(() => inputRef.current.focus(), []);

  return (
    <Container className="justify-content-center d-flex align-content-center flex-wrap h-100 lg">
      <Card style={{ width: '30rem' }}>
        <Card.Header as="h3">{t('signup.formTitle')}</Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit} className="pt-3 pb-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">{t('signup.nameLabel')}</Form.Label>
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
              <Form.Label htmlFor="password">{t('signup.passwordLabel')}</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label htmlFor="passwordConfirmation">{t('signup.passwordConfirmationLabel')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
                name="passwordConfirmation"
                id="passwordConfirmation"
                required
                isInvalid={formik.touched.passwordConfirmation
                  && formik.errors.passwordConfirmation}
                isValid={formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2" disabled={formik.isSubmitting}>{t('signup.sendButton')}</Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          <Card.Link as={Link} to="/login">{t('signup.loginLink')}</Card.Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SignupPage;
