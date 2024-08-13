import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
`;

const HeaderImage = styled.img`
  max-width: 95%;
  height: auto;
  display: block;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderImage src={Logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;
