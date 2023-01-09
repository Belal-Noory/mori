import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const Product = () => {
  const { id } = useParams();
  
  const [Product, setProduct] = useState({});

  useEffect(() => {
    const url = "http://localhost:5000/api/products/find/"+id;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container>
      <Navbar />
      {Product? 
      <Wrapper>
        <ImgContainer>
          <Image src={Product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{Product.title}</Title>
          <Desc>{Product.desc}</Desc>
          <Price>$ {Product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color={Product.color} />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                  <FilterSizeOption>{Product.size}</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
        </InfoContainer>
      </Wrapper>:<h1>Loading</h1>}
    </Container>
  );
};

export default Product;
