import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";



// Styled component for Footer
const StyledFooter = styled.div`
  max-width: 1440px;
  background-color: black;
  margin: 5rem 1rem 0 1rem;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  color: white;
  @media (max-width: 500px) {
    margin: 5rem 0rem 0 0rem;
  }
  
`;
const TopFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f9f9f9;
  p {
    cursor: pointer;
  }
  @media (max-width: 1050px) {
    h2 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
    padding-bottom: 5px;
  }
  @media (max-width: 500px) {
    display:none;
  }
`;
const Title = styled.h2`
  color: white;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 780px) {
    padding-bottom: 10px;
  }
`;

const Newsletter = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const Input = styled.input`
  padding: 0.5rem;

  background-color: #f9f9f9;
  width: 80%;
`;
const BottomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  @media (max-width: 780px) {
    padding: 1rem 0;
  }
`;
const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 780px) {
    font-size: 1.2rem;
  }
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;
const IconsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 2rem;
  @media (max-width: 780px) {
    font-size: 1.6rem;
  }
`;
const CopyWright = styled.span`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #ffffff42;
  @media (max-width: 780px) {
    font-size: 0.8rem;
  }
`;
const Footer = () => {
  return (
    <StyledFooter>
      <TopFooter>
        <Column>
          <Title>Information</Title>
          <p>ABOUT</p>
          <p>ADVERTISE</p>
          <p>CONTACT</p>
          <p>CAREERS</p>
        </Column>
        <Column>
          <Title>Information</Title>
          <p>PRIVACY</p>
          <p>COOKIES</p>
          <p>TERMS</p>
          <p>AFFILIATE DISCLOSURE</p>
        </Column>
        <Column>
          <Title>Sign up for our newsletter</Title>
          <Newsletter>
            <Input type="text" placeholder="Email" />
            <PrimaryButton>Sign</PrimaryButton>
          </Newsletter>
        </Column>
      </TopFooter>
      <BottomFooter>
        <Logo href={"/"}>
          {" "}
          <Image src="/logo.png" alt="Picture of the author" />
          GadgetHub
        </Logo>

        <IconsWrapper>
          <FaFacebook /> <FaInstagram /> <FaTwitter />
        </IconsWrapper>
      </BottomFooter>
      <CopyWright>GadgetHub 2023 ©</CopyWright>
    </StyledFooter>
  );
};

export default Footer;
