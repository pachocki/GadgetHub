import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import PrimaryButton from "@/components/PrimaryButton";
import { mongooseConnect } from "@/lib/mongoseConnect";
import { Product } from "@/models/Product";
import { useContext, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 5rem 1rem 2rem 1rem;
  @media (max-width: 680px) {
    padding: 5rem 0.5rem 2rem 0.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: normal;
  font-weight: bold;
  @media (max-width: 1300px) {
    font-size: 1.8rem;
  }
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.5fr 2fr;
  gap: 10px;
  object-fit: contain;
  justify-content: between;
  padding-bottom: 4rem;
  @media (max-width: 1300px) {
    padding-bottom: 2rem;
  }
  @media (max-width: 980px) {
    padding-bottom: 2rem;
    grid-template-columns: 2fr 0.5fr;
  }
  @media (max-width: 680px) {
    display: flex;
    flex-direction: column;
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  object-fit: cover;
  @media (max-width: 680px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ImageCol = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
  background: #fff;
  object-fit: contain;
  border-radius: 10px;
  @media (max-width: 680px) {
    width: 48%;
    height: 130px;
    object-fit:fill;
  }

`;

const Image = styled.img`
  width: 100%;
  height: 60vh;
  background: #fff;
  object-fit: contain;
  border-radius: 10px;
  @media (max-width: 680px) {
    height: 40vh;
  }
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ isColumn }) => (isColumn ? "1rem" : "0")};
  padding-top: 10px;
`;

const DescriptionBox = styled.div`
  margin: 0rem 1rem;

  @media (max-width: 680px) {
    &:second-child {
      display: none;
    }
    margin: 0rem 0.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  @media (max-width: 1300px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const TableText = styled.td`
  font-size: 1.6rem;
  line-height: 1.6;
  @media (max-width: 1300px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ProductPage = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const handleClick = () => {
    const currentIndex = product.images.indexOf(currentImage);
    const nextIndex =
      currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
    setCurrentImage(product.images[nextIndex]);
  };

  const propertyOrder = [
    "Processor",
    "Graphics",
    "RAM",
    "Storage",
    "Display",
    "Battery",
    "Camera",
    "Frequency Response",
    "Impedance",
    "Sensivity",
    "Color",
  ];

  const { addToCart } = useContext(CartContext);
  function addProduct() {
    addToCart(product._id);
  }

  return (
    <Layout>
      <Container>
        <TopContainer>
          <div>
            <Image onClick={handleClick} src={currentImage} alt="product" />
          </div>
          <ImageBox>
            {product.images.slice(0, 2).map((image, index) => (
              <ImageCol
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </ImageBox>

          <DescriptionContainer
            isColumn={
              product.properties && Object.keys(product.properties).length > 1
            }
          >
            <DescriptionBox>
              <Title>{product.title}</Title>
              <Description>{product.shortDescription}</Description>
            </DescriptionBox>
            <DescriptionBox>
              {product.properties &&
                Object.keys(product.properties).length > 0 && (
                  <div>
                    <Title>Specification</Title>
                    <table>
                      <tbody>
                        {propertyOrder.map((key) => {
                          if (key in product.properties) {
                            return (
                              <tr key={key}>
                                <TableText>{key}:</TableText>
                                <TableText>{product.properties[key]}</TableText>
                              </tr>
                            );
                          }
                          return null;
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
            </DescriptionBox>
            <DescriptionBox>
              <PrimaryButton
                backgroundColor=" #eb9800"
                textColor="black"
                onClick={addProduct}
              >
                <AiOutlineShoppingCart />
                Buy
              </PrimaryButton>
            </DescriptionBox>
          </DescriptionContainer>
        </TopContainer>
        <DescriptionBox>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
        </DescriptionBox>
      </Container>
    </Layout>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id).populate("category");

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
