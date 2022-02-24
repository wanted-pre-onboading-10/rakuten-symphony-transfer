import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import colors from "styles/colors";

function NotFound() {
  const navigate = useNavigate();
  const goToMain = () => navigate("/");

  return (
    <Container>
      <MainImage src="/404.gif" />
      <DescriptionBox>
        <Description>요청한 페이지를 찾을수 없습니다</Description>
        <Description>입력한 주소를 다시 한 번 확인해주세요</Description>
      </DescriptionBox>
      <LinkButton onClick={goToMain}>메인으로 이동</LinkButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const MainImage = styled.img`
  max-width: 280px;
  width: 100%;
`;

const DescriptionBox = styled.div`
  margin-bottom: 40px;
`;

const Description = styled.p`
  margin: 0 0 5px 0;
  color: ${colors.grey600};
  font-size: 12px;
`;

const LinkButton = styled.button`
  padding: 0 20px;
  height: 40px;
  border: 1px solid ${colors.pink500};
  color: ${colors.pink500};
  background-color: ${colors.white};
  cursor: pointer;
`;

export default NotFound;
