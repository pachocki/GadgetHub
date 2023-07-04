import { fetchData } from "@/Hook/FetchData";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductsGrid from "@/components/ProductsGrid";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 5rem 1rem 2rem 1rem;
  min-height:100vh;
`;
const Title = styled.h2`
  font-size: 2rem;
  margin: 2rem 1rem;
  font-weight: normal;
  font-weight: bold;
`;
const Products = ({ products }) => {

  return (
    <Layout>
      <Container>
        <Title>All Products</Title>
        <ProductsGrid scrollable={false}>
          {products?.length > 0 &&
            products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
        </ProductsGrid>
      </Container>
    </Layout>
  );
};

export default Products;
 // Fetch data from the server using fetchData function
export async function getServerSideProps() {
  const data = await fetchData();

  return {
    props: data,
  };
}
