import React, {useEffect} from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import { useFormik } from 'formik';
import { loginUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const nav = useNavigate();
  
  useEffect(() => {
    const isSigned = ()=>{
      return auth.success === true? nav('/'):null;
    }
    isSigned();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.success])
  

  const loginForm = useFormik({
    initialValues: {
      username: 'admin@gmail.com',
      password: 'admin12345'
    },
    validate: (data) => {
      let errors = {};
      if (!data.username) {
        errors.username = 'Name is required';
      }

      if (!data.password) {
        errors.username = 'Password is required';
      }
      return errors;
    },
    onSubmit: (data) => {
      dispatch(loginUser(data));  
      loginForm.resetForm();
    }
  });

  const isFormFieldValid = (name) => !!(loginForm.touched[name] && loginForm.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small style={{ color: 'tomato' }}>{loginForm.errors[name]}</small>;
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={loginForm.handleSubmit}>
          <Input name="username" value={loginForm.values.username} onChange={loginForm.handleChange} placeholder="ایمیل" />
          {getFormErrorMessage('username')}
          <Input type="password" name="password" value={loginForm.values.password} onChange={loginForm.handleChange} placeholder="رمز ورورد" />
          {getFormErrorMessage('password')}
          <Button type='submit'>وارد شدن</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
