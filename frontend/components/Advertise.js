import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1rem;
  gap: 10px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;
const ImageWrapper = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-template-columns:1fr 1fr;
  gap: 0.2rem;
  img {
    width: 100%;
    border-radius: 10px;
  }
`;
const Advertise = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src="/advertise1.png" alt="advertive" />
        <img src="/advertise2.png" alt="advertive" />
      </ImageWrapper>
    </Wrapper>
  );
};

export default Advertise;
