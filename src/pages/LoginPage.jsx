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

import useAuth from '../hooks/auth.jsx';
import routes from '../routes.js';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Короткое имя')
    .max(20, 'Длинное имя')
    .required('Имя обязательно'),
  password: Yup.string()
    .min(4, 'Короткий пароль')
    .required('Пароль обязателен'),
});

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const inputRef = useRef();
  const feedback = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn(data);
        history.push('/');
      } catch (e) {
        setAuthFailed(true);
        inputRef.current.select();
        feedback.current.innerHTML = `${e.message}`;
      }
    },
  });

  useEffect(() => inputRef.current.focus(), []);

  return (
    <Container className="justify-content-center d-flex align-content-center flex-wrap h-100 lg">
      <Card style={{ width: '30rem' }}>
        <Card.Header as="h3">Войти</Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit} className="pt-3 pb-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Имя</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
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
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                id="password"
                required
                isInvalid={authFailed || (formik.touched.password && formik.errors.password)}
                isValid={formik.touched.password && !formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2" disabled={formik.isSubmitting}>Войти</Button>
          </Form>
          <Card.Text ref={feedback} className="text-danger" />
        </Card.Body>
        <Card.Footer className="text-center">
          <Card.Link as={Link} to="/signup">Зарегистрироваться</Card.Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
