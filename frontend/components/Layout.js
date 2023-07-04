import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
//Styled Container
const Container =styled.div`
min-height:100vh;
height:100%;


`

const Layout = ({children}) => {
    return (
        <Container>
          <Head />
          <Header />
          {children}
          <Footer/>
        </Container>
    );
}

export default Layout;