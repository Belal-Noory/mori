import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Product from "./Product";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
  const [Products, setProducts] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [catagory, setCatagory] = useState('');

  const handleChange = (event) => {
    setCatagory(event.target.value);
  };

  useEffect(() => {
    const url = "http://localhost:5000/api/products";

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
        const distictFilter = [...new Set(response.data.map(prod => prod.category))];
        setCatagories(distictFilter);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">کتگوری</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={catagory}
            label="Catagory"
            onChange={handleChange}
            defaultValue=""
          >
            <MenuItem value="">
              <em>همه</em>
            </MenuItem>
            {catagories.map((item,index)=>(
              <MenuItem value={item} key={index}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <Container>
        {
          catagory?
          Products.filter(prod => prod.category === catagory).map(item=>(
            <Product item={item} key={item._id} />
          )):
          Products.map((item) => (
            <Product item={item} key={item._id} />
          ))
        }
      </Container>
    </>
  );
};

export default Products;
