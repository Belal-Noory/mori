import styled from "styled-components";
import { mobile } from "../responsive";
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top:8px
`;

const Success = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:10px;
    color:white;
    background:seagreen;
    margin-top:8px
`;

const Register = () => {
  const [loading,setLoading] = useState(false);
  const [registerd,setRegisterd] = useState(false);

  const regForm = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email:'',
      password:''
    },
    validate: (data) => {
      let errors = {};
      if (!data.fname) {
        errors.fname = 'First name is required';
      }

      if (!data.lname) {
        errors.lname = 'Last name is required';
      }

      if (!data.email) {
        errors.email = 'Email is required';
      }

      if (!data.password) {
        errors.password = 'Password is required';
      }
      return errors;
    },
    onSubmit: (data) => {
      setLoading(true);
      axios.post('http://localhost:5000/api/auth/register', {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password
      })
      .then(function (response) {
        setLoading(false);
        setRegisterd(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

      regForm.resetForm();
    }
  });

  const isFormFieldValid = (name) => !!(regForm.touched[name] && regForm.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small style={{ color: 'tomato', display:'block' }}>{regForm.errors[name]}</small>;
  };

  return (
    <Container>
      <Wrapper>
        <Title>برای اینکه بتوانید ازسیستمما استعفاده کنید لطفآیک اونت برتان بسازید.</Title>
        <Form onSubmit={regForm.handleSubmit}>
          <Input type="text" name="fname" value={regForm.values.fname} onChange={regForm.handleChange} placeholder="نام" />
          {getFormErrorMessage('fname')}
          <Input type="text" name="lname" value={regForm.values.lname} onChange={regForm.handleChange} placeholder="تخلص" />
          {getFormErrorMessage('lname')}
          <Input type="email" name="email" value={regForm.values.email} onChange={regForm.handleChange} placeholder="ایمیل" />
          {getFormErrorMessage('email')}
          <Input type="password" name="password" value={regForm.values.password} onChange={regForm.handleChange} placeholder="رمز" />
          {getFormErrorMessage('password')}
          <Button type="submit" disabled={loading}>ساختن اکونت</Button>
        </Form>
        {registerd && <Success><span>تبریک اکونت شما موفقانه ساخته شد </span> <Link to="/login">وارد شدن به سیستم</Link></Success>}
      </Wrapper>
    </Container>
  );
};

export default Register;
