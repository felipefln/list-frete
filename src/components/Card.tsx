import { format } from "date-fns";
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  overflow-y: auto;
`;

const CardContent = styled.p`
  font-size: 16px;
  color: #555;
`;

const CardDateHour = styled.span`
  font-size: 12px;
  color: #999999;
`;

interface CardProps {
  timestamp: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ timestamp, content }) => {
  const date = new Date(timestamp);
  const dateAndHour = format(date, "dd/MM/yyyy - HH:mm");

  return (
    <CardContainer>
      <CardContent>
        {content}
      </CardContent>
      <CardDateHour>
        {dateAndHour}
      </CardDateHour>
    </CardContainer>
  );
};

export default Card;
