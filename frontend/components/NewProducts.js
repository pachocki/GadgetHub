import styled from "styled-components";
import ProductsGrid from "./ProductsGrid";
import ProductCard from "./ProductCard";

const Title = styled.h2`
  font-size: 2rem;
  margin: 2rem 1rem;
  font-weight: normal;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size:1.8rem;
    margin:1rem;

  }
`;

const Container = styled.div`
  margin: 0 1rem;
`;

export default function NewProducts({ products }) {
  return (
    <Container>
      <Title>New Arivals</Title>
      <ProductsGrid scrollable={true}>
        {products?.length > 0 &&
          products
            .slice(0, 4)
            .map((product) => <ProductCard key={product._id} {...product} />)}
      </ProductsGrid>
    </Container>
  );
}
