import { createContext, useEffect, useState } from "react";

// Create a new context for the cart data
export const CartContext = createContext({});
// Cart Context Provider component
export function CartContextProvider({ children }) {
  // Use local storage if available, otherwise create a fallback object
  const ls =
    typeof window !== "undefined"
      ? window.localStorage
      : {
          getItem: () => null,
          setItem: () => {},
        };
  // State to store the cart products
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  // Effect to update local storage when cartProducts change
  useEffect(() => {
    // Save cartProducts to local storage as JSON
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Function to add a product to the cart
  function addToCart(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }
  // Function to remove a product to the cart
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((val, index) => index !== pos);
      }
      return prev;
    });
  }
  // Function to clear the cart
  function clearCart() {
    setCartProducts([]);
  }
  // Provide the cart data and functions through the CartContext.Provider
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
