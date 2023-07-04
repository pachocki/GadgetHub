import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  // Styles for the container component
  display: grid;
  grid-template-columns: 1.8fr 0.2fr;
  gap: 40px;
  padding-top: 5rem;
  margin: 1rem;
  height: 100%;
  @media (max-width: 1330px) {
    gap: 5px;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1.8fr 1fr;
  }
  @media (max-width: 769px) {
    display: flex;
    flex-direction: column;
  }
`;
const SuccessContainer = styled.div`
  // Styles for the success container
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const BoxProducts = styled.div`
  // Styles for the box products
  background-color: #fff;
  border-radius: 10px;
  padding: ${(props) => props.padding || "2rem 1rem;"};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  @media (max-width: 470px) {
    padding: 2rem 1rem;
  }
`;
const Title = styled.h2`
  // Styles for the title
  font-size: 1.6rem;
  @media (max-width: 1050px) {
    font-size: 1.4rem;
  }
  @media (max-width: 769px) {
    font-size: 1.6rem;
  }
  @media (max-width: 550px) {
    font-size: 1.2rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;
const TitleSummary = styled.h2`
  // Styles for the title summary
  font-size: 2rem;
  @media (max-width: 1000px) {
    font-size: 1.6rem;
  }
`;

const FormBox = styled.div`
  // Styles for the form
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem 0;
  @media (max-width: 769px) {
    padding: 1rem 0;
  }
`;
const Label = styled.label`
  // Styles for the labels
  font-size: 1.6rem;
  font-weight: bold;
  padding-left: 3px;
  @media (max-width: 769px) {
    font-size: 1.4rem;
  }
`;
const Input = styled.input`
  // Styles for the inputs
  font-size: 1.2rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #dddddd;
`;
const Image = styled.img`
  // Styles for the images
  width: 120px;
  height: 120px;
  object-fit: contain;
  @media (max-width: 1200px) {
    width: 80px;
    height: 80px;
  }
`;

const Table = styled.table`
  // Styles for the table
  width: 100%;
  height: 100%;
  text-align: left;
  margin: 2rem 0;
`;
const Th = styled.th`
  font-size: 2rem;
  @media (max-width: 1200px) {
    font-size: 1.6rem;
  }
  @media (max-width: 769px) {
    font-size: 1.4rem;
  }
`;
const Td = styled.td`
  height:20vh;
  }
`;

const BoxRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: bold;

  h2 {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: ${({ alignItems }) => alignItems || "flex-start"};
    gap: 5px;
  }
`;
const BoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: ${(props) => props.align || ""};
  margin-top: ${(props) => props.margin || ""};
`;

const Quantity = styled.h2`
  width: 50px;
  @media (max-width: 992px) {
    width: 80px;
  }
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 2rem;
  h3 {
    font-size: 2rem;
  }
  span {
    font-size: 2rem;
    font-weight: bold;
  }
  @media (max-width: 769px) {
    h3 {
      font-size: 1.6rem;
    }
    span {
      font-size: 1.6rem;
    }
  }
`;

const TotalRow = styled.tr`
  border-top: 1px solid gray;
`;

const CartPage = () => {
  // Context for accessing cart data
  const { cartProducts, addToCart, removeProduct, clearCart } =
    useContext(CartContext);

  // States for form
  const [products, setCartProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setCartProducts(response.data);
      });
    } else {
      setCartProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  //Add product function
  function addProducts(id) {
    addToCart(id);
  }
  //Remove product function
  function removeProducts(id) {
    removeProduct(id);
  }
  // Back to home and clear local storage
  function BackHome() {
    localStorage.clear();
    window.location.href = "/";
  }

  //Go to Stripe payment
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      street,
      code,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  if (isSuccess) {
    return (
      <>
        <Header />
        <SuccessContainer>
          <BoxProducts padding="2rem 4rem">
            <BoxCol align="center">
              <h2>Thanks for your order!</h2>
              <p>We will email you when your order will be sent.</p>
              <BoxRow alignItems="center">
                {products?.map((product) => (
                  <BoxCol margin="2rem;" align="center" key={product._id}>
                    <Image src={product.images[0]} alt="" />
                    <Title> {product.title}</Title>
                  </BoxCol>
                ))}
              </BoxRow>
              <PrimaryButton margin="2rem 0;" onClick={BackHome}>
                Back
              </PrimaryButton>
            </BoxCol>
          </BoxProducts>
        </SuccessContainer>
      </>
    );
  }

  return (
    <div>
      <Header />
      <Container>
        <BoxProducts>
          {!cartProducts?.length ? (
            <BoxCol>
              <Title>Your Cart is Empty</Title>
              <PrimaryButton margin="2rem 0;" onClick={BackHome}>
                Back
              </PrimaryButton>
            </BoxCol>
          ) : (
            <TitleSummary>Cart</TitleSummary>
          )}

          {products?.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <Th>Product</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <Td>
                      <BoxRow>
                        <Image src={product.images[1]} alt="" />
                        <Title> {product.title}</Title>
                      </BoxRow>
                    </Td>
                    <Td>
                      <BoxRow>
                        <PrimaryButton
                          width="50px"
                          backgroundColor="black"
                          onClick={() => removeProducts(product._id)}
                        >
                          -
                        </PrimaryButton>

                        <Quantity>
                          {" "}
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </Quantity>

                        <PrimaryButton
                          width="50px"
                          backgroundColor="black"
                          onClick={() => addProducts(product._id)}
                        >
                          +
                        </PrimaryButton>
                      </BoxRow>
                    </Td>
                    <Td>
                      <Title>
                        {" "}
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                        $
                      </Title>
                    </Td>
                  </tr>
                ))}
                <TotalRow>
                  <Total>
                    <h3>Total</h3>
                    <span> {total} $</span>
                  </Total>
                </TotalRow>
              </tbody>
            </Table>
          )}
        </BoxProducts>
        {cartProducts?.length > 0 ? (
          <BoxProducts>
            <TitleSummary>Order information</TitleSummary>
            <FormBox>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Label>Email</Label>
              <Input
                type="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <BoxRow>
                <BoxCol>
                  <Label>City</Label>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </BoxCol>
                <BoxCol>
                  <Label>Postal Code</Label>
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </BoxCol>
              </BoxRow>
              <Label>Street Address</Label>
              <Input
                type="text"
                placeholder="Adress"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <Label>Country</Label>
              <Input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <PrimaryButton
                display="block"
                width="100%"
                margin="1rem 0"
                onClick={goToPayment}
              >
                Checkout
              </PrimaryButton>
            </FormBox>
          </BoxProducts>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default CartPage;
