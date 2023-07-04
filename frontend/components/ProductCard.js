import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #ffff;
  padding: 1rem 0 2px 0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 0 5px orange;
  }
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    display: inline-flex;
    overflow: initial;

    img {
      width: 200px;
      height: 200px;
    }
  }
  
`;
const BottomWrapper = styled.div`
  width: 97%;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0rem;
  border-radius: 10px;
  color: black;
`;
const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  width: 90%;
  padding: 1.6rem 1rem 0 1rem;
  align-items: center;
  span {
    font-weight: bold;
    font-size: 1.4rem;
  }
  @media (max-width: 1100px) {
    font-size: 1.2rem;
    padding: 1rem 5px;
  }
`;
const Title = styled.span`
  padding: 0 1rem;
  font-weight: bold;
  font-size: 1.3rem;
  @media (max-width: 1100px) {
    font-size: 1.1rem;
    padding: 0 5px;
  }
`;
const ImageBox = styled(Link)``;
const ProductCard = ({
  _id,
  title,
  description,
  price,
  images,
  properties,
}) => {
  const uri = "/product/" + _id;
  const { addToCart } = useContext(CartContext);
  function addProduct() {
    console.log("Product ID:", _id);
    addToCart(_id);
  }

  return (
    <Card>
      <ImageBox href={uri}>
        <img src={images[0]} alt="images" />
      </ImageBox>
      <BottomWrapper>
        <Title>{title}</Title>

        <InfoBox>
          <span>{price + "$"}</span>
          <PrimaryButton
            backgroundColor=" #eb9800"
            textColor="black"
            onClick={addProduct}
          >
            <AiOutlineShoppingCart />
            Buy
          </PrimaryButton>
        </InfoBox>
      </BottomWrapper>
    </Card>
  );
};

export default ProductCard;
