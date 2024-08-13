import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import styled from "styled-components";
import Button from "./Button";
import { db } from "../firebase";
import List from "./List";

interface Message {
  content: string;
  email?: string;
  timestamp: string;
}

const Container = styled.div`
  position: relative;
  margin: 20px 0;
`;

const InputField = styled.input`
  width: 363px;
  height: 56px;
  padding: 10px;
  padding-top: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  outline: none;

  &:focus {
    border-color: #66afe9;
  }
`;

const Label =
  styled.label <
  { isLabelActive: boolean } >
  `
  position: absolute;
  top: ${({ isLabelActive }) => (isLabelActive ? "55px" : "50%")};
  left: ${({ isLabelActive }) => (isLabelActive ? "35px" : "10px")};
  transform: translateY(-50%);
  font-size: ${({ isLabelActive }) => (isLabelActive ? "12px" : "16px")};
  color: #999;
  pointer-events: none;
  transition: all 0.2s ease;
`;

const TitleText = styled.p`
  color: #4d4d4d;
  font-size: 20px;
  font-weight: 600;
`;

const ContainerInput = styled.div`margin: 5%;`;

const ContainerList = styled.div`
  background-color: #f2f2f2;
  height: 65vh;
`;

const TextInput: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [msgs, setMsgs] = useState<Message[]>([]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(!!inputValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const isLabelActive = isFocused || !!inputValue;
  const isButtonDisabled = inputValue.trim() === "";

  const addToMessage = async (content: any) => {
    const timestamp = new Date().toISOString();
    try {
      await addDoc(collection(db, "messages"), {
        content: content,
        timestamp: timestamp
      });
      console.log("Mensagem adicionada com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar mensagem: ", e);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const messagesList: Message[] = querySnapshot.docs.map(
        (doc: DocumentData) => doc.data() as Message
      );
      setMsgs(messagesList);
    };

    fetchMessages();
  }, []);

  return (
    <Container>
      <ContainerInput>
        <TitleText>Digite um texto abaixo:</TitleText>
        <InputField
          type="text"
          placeholder={isFocused ? "" : "Digite um texto*"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputValue}
          onChange={handleChange}
          aria-label="Campo de Input"
        />
        <Label isLabelActive={isLabelActive}>
          {isFocused && "Mensagem*"}
        </Label>
        <Button
          handleOnClick={() => addToMessage(inputValue)}
          disabled={isButtonDisabled}
        />
      </ContainerInput>
      <ContainerList>
        <List messages={msgs} />
      </ContainerList>
    </Container>
  );
};

export default TextInput;
