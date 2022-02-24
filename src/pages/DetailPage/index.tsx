import React from "react";
import { useState, useEffect } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import fileSize from "filesize";
import { addYears, format, isPast } from "date-fns";
import axios from "axios";

import FileListItem from "./FileListItem";

import * as S from "pages/DetailPage/styles";
import { Detail } from "types/detail";

const DetailPage: FC = () => {
  const [detail, setDetail] = useState<Detail | undefined>(undefined);
  const [expired, setExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { key } = useParams();

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      const res = await axios.get<Detail[]>("/homeworks/links");
      const det = res.data.find(detail => detail.key === key);
      setDetail(det);
      setLoading(false);
    };

    initPage();
  }, [key]);

  useEffect(() => {
    if (detail) {
      setExpired(isPast(addYears(detail.expires_at, 52)));
    }
  }, [detail]);

  const handleClick = () => {
    if (detail && !expired) {
      alert("다운로드 되었습니다.");
    } else if (detail && expired) {
      alert("만료된 링크입니다.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !detail) {
    return <div>Item not found.</div>;
  }

  if (!loading && detail) {
    return (
      <>
        <S.Header>
          <S.LinkInfo>
            <S.Title>{detail.sent?.subject || "제목없음"}</S.Title>
            <S.Url>localhost:3000/{key}</S.Url>
          </S.LinkInfo>
          <S.DownloadButton onClick={handleClick} expired={!expired}>
            <img
              referrerPolicy="no-referrer"
              src={!expired ? "/svgs/forbidden.svg" : "/svgs/download.svg"}
              alt=""
            />
            {!expired ? "만료" : "받기"}
          </S.DownloadButton>
        </S.Header>
        <S.Article>
          <S.Description>
            <S.Texts>
              <S.Top>링크 생성일</S.Top>
              <S.Bottom>
                {format(
                  addYears(detail.created_at, 52),
                  "yyyy년 MM월 dd일 HH:mm xxx",
                )}
              </S.Bottom>
              {detail.sent?.content && (
                <>
                  <S.Top>메세지</S.Top>
                  <S.Bottom>{detail.sent.content}</S.Bottom>
                </>
              )}
              <S.Top>다운로드 횟수</S.Top>
              <S.Bottom>{detail.download_count}</S.Bottom>
            </S.Texts>
            <S.LinkImage>
              <S.Image />
            </S.LinkImage>
          </S.Description>
          <S.ListSummary>
            <div>총 {detail.files.length}개의 파일</div>
            <div>
              {fileSize(
                detail.files.reduce((result, current) => {
                  return result + current.size;
                }, 0),
              )}
            </div>
          </S.ListSummary>
          <S.FileList>
            {!expired ? (
              <S.ExpiredWarning>만료된 링크입니다.</S.ExpiredWarning>
            ) : (
              detail.files.map(({ key, name, size }) => (
                <FileListItem key={key} name={name} size={size} />
              ))
            )}
          </S.FileList>
        </S.Article>
      </>
    );
  }

  return <div>Something went wrong. Please try again later.</div>;
};

export default DetailPage;
