import React, { useEffect } from 'react'
import styled from "styled-components";
import { useFormik } from 'formik';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:96vh
`;

const FORM = styled.form`
  display:flex;
  width:50%;
  flex-direction:column;
  padding:10px
`;

const INPUT = styled.input`
  padding:8px;
  margin: 6px
`;

const TEXTAREA = styled.textarea`
  padding:8px;
  margin: 6px
`;

const BUTTON = styled.button`
  padding:8px;
  margin: 6px
`;

const NewProduct = () => {
  const auth = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [productSave,setProductSave] = useState(false);

  useEffect(() => {
    const isSigned = ()=>{
      return auth.success === false? nav('/login'):null;
    }
    isSigned();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 
  

  const productForm = useFormik({
    initialValues: {
      title: '',
      desc: '',
      img: '',
      category: '',
      size: '',
      color: '',
      price: 0
    },
    validate: (data) => {
      let errors = {};
      if (!data.title) {
        errors.title = 'Title is required';
      }
      if (!data.desc) {
        errors.desc = 'Description is required';
      }
      if (!data.img) {
        errors.img = 'Image is required';
      }
      if (!data.category) {
        errors.category = 'Catagory is required';
      }
      if (!data.size) {
        errors.size = 'Size is required';
      }
      if (!data.color) {
        errors.color = 'Color is required';
      }
      if (!data.price) {
        errors.price = 'Price is required';
      }
      return errors;
    },
    onSubmit: (data) => {
      const accessToken = auth.userInfo.accessToken;
      console.log(auth);
      axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'token': accessToken
        }
      })
        .then(function (response) {
          if(response.data){
            setProductSave(true);
            productForm.resetForm();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  const isFormFieldValid = (name) => !!(productForm.touched[name] && productForm.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small style={{ color: 'tomato' }}>{productForm.errors[name]}</small>;
  };

  return (
    <Container>
      <Link to="/">Home</Link>
      <FORM onSubmit={productForm.handleSubmit}>
        <INPUT type="text" name='title' value={productForm.values.title} onChange={productForm.handleChange} placeholder='title' />
        {getFormErrorMessage('title')}
        <TEXTAREA name='desc' value={productForm.values.desc} onChange={productForm.handleChange} placeholder='desc'></TEXTAREA>
        {getFormErrorMessage('desc')}
        <INPUT type="text" name='img' value={productForm.values.img} onChange={productForm.handleChange} placeholder='image URL' />
        {getFormErrorMessage('img')}
        <INPUT type="text" name='category' value={productForm.values.category} onChange={productForm.handleChange} placeholder='catagory' />
        {getFormErrorMessage('category')}
        <INPUT type="text" name='size' value={productForm.values.size} onChange={productForm.handleChange} placeholder='size' />
        {getFormErrorMessage('size')}
        <INPUT type="text" name='color' value={productForm.values.color} onChange={productForm.handleChange} placeholder='color' />
        {getFormErrorMessage('color')}
        <INPUT type="number" name='price' value={productForm.values.price} onChange={productForm.handleChange} placeholder='price' />
        {getFormErrorMessage('price')}
        <BUTTON type="submit">Add Product</BUTTON>
      </FORM>
      {productSave && <span style={{background:'seagreen',color:'white',padding:'10px'}}>Product Added Successfully</span>}
    </Container>
  )
}

export default NewProduct;
