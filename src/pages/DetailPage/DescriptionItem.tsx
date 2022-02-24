import React from "react";
import * as S from "pages/DetailPage/styles";

const DescItem = ({
  title,
  text,
}: {
  title: string;
  text: string | number;
}) => {
  return (
    <>
      <S.Top>{title}</S.Top>
      <S.Bottom>{text}</S.Bottom>
    </>
  );
};

export default DescItem;
