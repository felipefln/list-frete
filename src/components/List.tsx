import React from "react";
import styled from "styled-components";
import Card from "./Card";

interface IMessage {
  content: string;
  timestamp: string;
}

interface IListProps {
  messages: IMessage[];
}

const ContainerList = styled.div``;

const TitleList = styled.p`
  color: #4d4d4d;
  font-size: 20px;
  font-weight: 700;
  padding: 20px 20px 0px 20px;
`;

const BodyList = styled.div`
  margin: 5%;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
`;

const List: React.FC<IListProps> = ({ messages }) => {
  return (
    <ContainerList>
      <TitleList>Mensagens Enviadas</TitleList>
      <BodyList>
        {messages.map((message, index) =>
          <Card
            key={index}
            content={message.content}
            timestamp={message.timestamp}
          />
        )}
      </BodyList>
    </ContainerList>
  );
};

export default List;
