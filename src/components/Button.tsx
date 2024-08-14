import styled from "styled-components";

interface IButton {
  disabled: boolean;
  handleOnClick: any;
}

const StyledButton =
  styled.button <
  { disabled: boolean } >
  `
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#28a745")};
  color: white;
  font-size: 20px;
  font-weight: 700;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;
  width: 358px;
  margin-top: 20px;
  height: 70px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#218838")};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#1e7e34")};
  }

  &:focus {
    outline: none;
  }
`;

export default function Button({ disabled, handleOnClick }: IButton) {
  return (
    <StyledButton disabled={disabled} onClick={handleOnClick}>
      Enviar
    </StyledButton>
  );
}
