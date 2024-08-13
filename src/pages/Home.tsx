import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

const HomeContainer = styled.div`background-color: #ffffff;`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
      <TextInput />
    </HomeContainer>
  );
};

export default Home;
