import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import styled from "styled-components";


// Styled component for the container
const Container = styled.div`

  margin: 3rem 1rem 1rem 1rem;
  border-top: 1px solid #000;
  
`;
// Styled component for the card
const Card = styled.div`
  width: 100%;
  height: 450px;
  padding-bottom: 20px;
  border-radius: 10px;
  display: grid;
  grid-templates-rows: 1fr 1fr;
  gap: 1rem;
  align-items: center;

  justify-content: space-around;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 997px) {
    gap:0.5rem;
    h2{
      font-size:1.4rem;
    }

  }
`;

// Styled component for the Title
const Title = styled.h2`
  font-size: 2rem;
  margin: 2rem 1rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size:1.8rem;
    margin:1rem;

  }
`;
// Styled component for the Link
const Link = styled.span`
  text-decoration: underline;
`;


// Data for the swiper
const swiperData = [
  {
    img: "./samsung.webp",
    title: "Big Samsung Promotion Week",
    description:
      "Discover incredible discounts on a wide range of Samsung products!",
  },
  {
    img: "/logitech.webp",
    title: "Logitech G PRO 2X Lightspeed",
    description: "Get the new Logitech G PRO 2X Lightspeed gaming mouse",
  },
  {
    img: "/games.webp",
    title: "Get two games as a gift",
    description: "Grab your favorite games as a gift with your purchase",
  },
  {
    img: "/endorfy.webp",
    title: "New Endorfy Arx 700 cases",
    description: "Check out the latest Endorfy Arx 700 computer cases",
  },
  {
    img: "/sony.webp",
    title: "Get Sony Ht-A300 soundbar for 1 zł",
    description:
      "Purchase selected products and get the Sony Ht-A300 soundbar for only 1 zł",
  },

  {
    img: "/office.webp",
    title: "Microsoft Office products on sale",
    description: "Promotion on Microsoft Office products",
  },
];
export default function Discound() {
  return (
    <Container>
      <Title>Special Ofer</Title>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          280: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          740: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {swiperData.map((item, index) => (
          <SwiperSlide key={index}>
            <Card>
              
              <img src={item.img} alt="Slide" />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Link>Read More</Link>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
