import React from "react";
import ProductCard from "@/components/ProductCard";
import ProductsGrid from "@/components/ProductsGrid";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  margin: 2rem 1rem;
  font-weight: normal;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 1rem;
  }
`;
const Container = styled.div`
  margin: 2rem 1rem 0 1rem;
`;

const CategoryProducts = ({ category, products, filterCategories }) => {
  // Filter the products based on the category and filterCategories
  const filteredProducts = products?.filter(
    (product) =>
      product.category &&
      product.category.name === category.name &&
      (filterCategories.includes(category.name) ||
        filterCategories.length === 0)
  );

  return (
    <Container>
      {/* Render the title and products grid if there are filtered products */}
      {filteredProducts?.length > 0 && (
        <>
          <Title>{category.name}</Title>
          <ProductsGrid scrollable={true}>
            {/* Render each product card */}
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </ProductsGrid>
        </>
      )}
    </Container>
  );
};

export default CategoryProducts;
