import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
// Styled component for the logo
const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: black;
`;
// Wrapper for the header
const Wrapper = styled.div`
  font-size: 1.6rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin: 0 1rem;
`;
// Styled component for the header
const StyledHeader = styled.header`
  max-width: 1420px;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  position: fixed;
  width: 96%;
  padding: 10px 1rem;
  background: #f9f9f9;
  z-index: 100;

  @media (max-width: 768px) {
    height: auto;
    padding: 1rem;
  }
`;
// Styled component for the navigation menu
const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
// Styled component for the navigation link wrapper
const NavLinkWrapper = styled(Link)`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  width: 100%;
  &:hover {
    opacity: 0.2;
  }
`;
// Styled component for the image
const Image = styled.img`
  width: 30px;
  height: 30px;
`;
// Styled component for the shopping cart icon
const StyledBacket = styled(AiOutlineShoppingCart)`
  color: orange;
`;
// Styled component for the items counter in the cart
const Items = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 100%;
  position: absolute;
  background: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 2px;
  top: -12px;

  p {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    position: relative;
  }
`;
// Styled component for the hamburger menu icon
const HamburgerMenu = styled(AiOutlineMenu)`
  display: none;
  color: black;
  font-size: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Styled component for the hamburger menu box
const HamburgerBox = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;

// Keyframe animation for fading in
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled component for the mobile menu
const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    position: fixed;
    background: #f9f9f9;
    height: 25vh;
    top: 3rem;
    gap: 1rem;
    border-radius: 0 0 10px 10px;
    border-bottom: 1px solid #000;
    animation: ${fadeIn} 0.3s ease-in-out;
  }
`;

const Header = () => {
  //Cart Context
  const { cartProducts } = useContext(CartContext);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Wrapper>
      <StyledHeader>
        <Logo href={"/"}>
          <Image src="/logo.png" alt="Picture of the author" />
          GadgetHub
        </Logo>
        <HamburgerBox>
          <NavLinkWrapper href={"/cart"}>
            <StyledBacket />
            <Items>
              <p>{cartProducts.length}</p>
            </Items>
          </NavLinkWrapper>
          <HamburgerMenu onClick={toggleMenu} />
        </HamburgerBox>

        <Nav>
          <NavLinkWrapper href={"/"}>Home</NavLinkWrapper>
          <NavLinkWrapper href={"/products"}>Products</NavLinkWrapper>
          <NavLinkWrapper href={"/categories"}>Categories</NavLinkWrapper>
          <NavLinkWrapper href={"/cart"}>
            <p>Cart</p> <StyledBacket />
            <Items>
              <p>{cartProducts.length}</p>
            </Items>
          </NavLinkWrapper>
        </Nav>
      </StyledHeader>

      {isMenuOpen && (
        <MobileMenu>
          <NavLinkWrapper href={"/"}>Home</NavLinkWrapper>
          <NavLinkWrapper href={"/products"}>Products</NavLinkWrapper>
          <NavLinkWrapper href={"/categories"}>Categories</NavLinkWrapper>
          <NavLinkWrapper href={"/cart"}>
            <p>Cart</p> <StyledBacket />
            <Items>
              <p>{cartProducts.length}</p>
            </Items>
          </NavLinkWrapper>
        </MobileMenu>
      )}
    </Wrapper>
  );
};

export default Header;
