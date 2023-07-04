import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor || "#eb8400"};
  color: ${(props) => props.textColor || "white"};
  width: ${(props) => props.width || "100px"};
  height: 35px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  font-weight: bold;
  transition: transform 0.3s ease-in-out;
  display: ${(props) => props.display || ""};
  cursor: pointer;
  margin:${(props) => props.margin || ""};
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 992px) {
    font-size:0.8rem;
    height:28px;
    width:80px;
  }
  
`;

const PrimaryButton = ({
  backgroundColor,
  textColor,
  children,
  ...restProps
}) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      textColor={textColor}
      {...restProps}
    >
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
