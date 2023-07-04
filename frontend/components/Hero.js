"use client";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import PrimaryButton from "./PrimaryButton";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { useRouter } from "next/router";

// Styled component for the Container
const Container = styled.div`
  margin: 6rem 1rem 0 1rem;
  @media (max-width: 600px) {
    margin: 4rem 0.5rem 0 0.5rem;
  }
`;

// Styled component for wrapper
const Wrapper = styled.div`
  max-width: 1444px;
  margin: auto;
  height: 60vh;
  background: black;
  border-radius: 20px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  overflow: hidden;

  @media (max-width: 992px) {
    height: 440px;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;

// Styled component for Box
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin: 4rem;
  @media (max-width: 992px) {
    margin: 1.5rem;
  }
  @media (max-width: 600px) {
    margin: 1rem;
  }
`;

// Styled component for the title
const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 3rem;
  font-weight: normal;
  @media (max-width: 1050px) {
    font-size: 2rem;
  }
  @media (max-width: 700px) {
    font-size: 1.6rem;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

// Styled component for the subtitle
const Subtitle = styled.h2`
  font-size: 2.6rem;
  font-weight: bold;
  @media (max-width: 1050px) {
    font-size: 2.1rem;
  }
  @media (max-width: 700px) {
    font-size: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
  @media (max-width: 380px) {
    font-size: 2rem;
  }
`;
// Styled component for the description
const Description = styled.p`
  font-size: 1.6rem;
  font-weight: normal;

  @media (max-width: 1050px) {
    font-size: 1.2rem;
  }
  @media (max-width: 700px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
  @media (max-width: 380px) {
    font-size: 1rem;
  }
`;
// Styled component for the button wrapper
const BtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  @media (max-width: 600px) {
    padding-top: 10px;
  }
`;
// Styled component for the images
const Image = styled.img`
  width: 100%;
  height: 100%;
  @media (max-width: 600px) {
    height: 40vh;
  }
`;
const Hero = ({ product }) => {
  //Router
  const router = useRouter();
  //Context
  const { addToCart } = useContext(CartContext);
  function addProduct() {
    addToCart(product?._id);
  }
  //Send to product
  const handleClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Box>
          <Title>Pro anywhere</Title>
          <Subtitle>{product?.title}</Subtitle>
          <Description>Mover. Maker. Boundary breaker.</Description>
          <BtnWrapper>
            <PrimaryButton
              backgroundColor="#f4f4f2;"
              textColor="#000"
              onClick={handleClick}
            >
              Read more
            </PrimaryButton>
            <PrimaryButton
              backgroundColor="#eb9800"
              textColor="#000"
              onClick={addProduct}
            >
              <AiOutlineShoppingCart />
              Buy
            </PrimaryButton>
          </BtnWrapper>
        </Box>
        <Image src="/macbook-pro.png" alt="Picture of the author" />
      </Wrapper>
    </Container>
  );
};

export default Hero;
