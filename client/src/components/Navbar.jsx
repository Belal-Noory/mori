import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from "../features/auth/authSlice";
import LoginIcon from '@mui/icons-material/Login';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration:'none' }}><Logo>Online Store.</Logo></Link>
        </Left>
        <Right>
          {auth.success ?
            <>
              <MenuItem style={{ display: 'flex', alignItems: 'center', columnGap: '5px', textDecoration:'none' }}>
                  <Avatar>{auth.userInfo.fname.toString().charAt(0) + auth.userInfo.lname.toString().charAt(0)}</Avatar>
                  {auth.userInfo.fname + " " + auth.userInfo.lname}
              </MenuItem>
              <MenuItem>
                <Link to="/product/new">
                  <IconButton aria-label="Add Product" color="primary">
                    <AddIcon />
                  </IconButton>
                </Link>
              </MenuItem>
              <MenuItem>
                <IconButton aria-label="Logout" color="warning" onClick={() => logout()}>
                  <LogoutIcon />
                </IconButton>
              </MenuItem>
            </> : (
              <><MenuItem>
                <Link to="/register">
                  <Fab variant="extended">
                    <AddCircleIcon />
                      ساختن اکونت
                  </Fab>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login">
                  <Fab variant="extended">
                    <LoginIcon />
                      وارد شدن
                  </Fab>
                </Link>
              </MenuItem></>
            )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
