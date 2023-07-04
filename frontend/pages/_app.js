import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  body {
    margin: 0;
    padding:0;
    font-family:"Roboto",sans-serif;
    max-width:1444px; 
    margin:auto;
    position:relative;
    background-color:#f9f9f9;
  }
  a{
    color:white;
    text-decoration:none;
  }
  h1,h2,h3,h4,h5,h6,p{
    margin: 0;
    padding:0;
  }
  /* Hide the default scrollbar */
  scrollbar-width: thin;
  scrollbar-color: white orange;

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: orange;
    border-radius: 10px;
   
  }
  .swiper {
    width: 100%;
    height: 100%;
    margin-bottom:2rem;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    border-radius:10px;
    overflow:hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-wrapper{
    margin-bottom: 2rem;
  }
  .swiper-pagination-bullet-active{
    background:orange;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
