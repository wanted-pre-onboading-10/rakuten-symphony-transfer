import React from "react";
import * as S from "pages/DetailPage/styles";

const DownloadButton = ({ expired }: { expired: boolean }) => {
  const handleClick = () => {
    if (!expired) {
      alert("만료된 링크입니다.");
    } else {
      alert("다운로드 되었습니다.");
    }
  };

  return (
    <S.DownloadButton onClick={handleClick} expired={expired}>
      <img
        referrerPolicy="no-referrer"
        src={expired ? "/svgs/forbidden.svg" : "/svgs/download.svg"}
        alt=""
      />
      {expired ? "만료" : "받기"}
    </S.DownloadButton>
  );
};

export default DownloadButton;
