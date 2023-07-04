import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";
import Discound from "@/components/Discound";
import Advertise from "@/components/Advertise";
import MobileSection from "../components/MobileSection";
import LaptopSection from "@/components/LaptopSection";
import { fetchData } from "@/Hook/FetchData";

export default function Home({ featuredProduct, products, categories }) {
  return (
    <>
      <Layout>
        <Hero product={featuredProduct} />
        <NewProducts products={products} />
        <Discound />
        <MobileSection categories={categories} products={products} />
        <Advertise />
        <LaptopSection categories={categories} products={products} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
   // Fetch data from the server using fetchData function
  const data = await fetchData();

  return {
    props: data,
  };
}
