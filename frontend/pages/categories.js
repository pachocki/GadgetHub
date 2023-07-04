import { fetchData } from "@/Hook/FetchData";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductsGrid from "@/components/ProductsGrid";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 5rem 1rem 2rem 1rem;
  min-height: 100vh;
`;
const Title = styled.h2`
  font-size: 2rem;
  margin: 2rem 0;
  font-weight: normal;
  font-weight: bold;
  @media (max-width: 400px) {
    font-size: 1.6rem;
  }
`;

const Categories = ({ products }) => {
  // Group products by category
  const groupedProducts = {};

  products.forEach((product) => {
    const categoryName = product.category.name;
    if (!groupedProducts[categoryName]) {
      groupedProducts[categoryName] = [];
    }
    groupedProducts[categoryName].push(product);
  });

  return (
    <Layout>
      <Container>
        <Title>Products by categories</Title>
        {Object.entries(groupedProducts).map(
          ([categoryName, categoryProducts]) => (
            <div key={categoryName}>
              <Title>{categoryName}</Title>
              <ProductsGrid scrollable={true}>
                {categoryProducts.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </ProductsGrid>
            </div>
          )
        )}
      </Container>
    </Layout>
  );
};

export default Categories;

export async function getServerSideProps() {
  // Fetch data from the server using fetchData function
  const data = await fetchData();
// Pass the fetched data as props to the component
  return {
    props: data,
  };
}
