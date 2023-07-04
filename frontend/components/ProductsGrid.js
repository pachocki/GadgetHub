import styled, { css } from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  max-width: 1444px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 660px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }

  ${({ scrollable }) =>
    scrollable &&
    css`
      @media (max-width: 768px) {
        overflow-x: scroll;
        white-space: nowrap;
        display: flex;
        padding-bottom: 10px;
      }
    `}
`;

export default function ProductsGrid({ children, scrollable }) {
  return (
    <StyledProductsGrid scrollable={scrollable}>{children}</StyledProductsGrid>
  );
}
