import React, { useRef, useEffect } from 'react';
import {
  Form,
  Card,
  Container,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

const LoginPage = () => {
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
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
              />
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
              />
              <Form.Control.Feedback type="invalid">не правильный логин или пароль</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Войти</Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          <Card.Link as={Link} to="/signup">Зарегистрироваться</Card.Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
