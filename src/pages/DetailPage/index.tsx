import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import FileListItem from "./FileListItem";
import DescItem from "./DescriptionItem";
import DownloadButton from "./DownloadButton";
import Loading from "components/Loading";
import NotFound from "components/Notfound";

import * as S from "pages/DetailPage/styles";
import { Detail } from "types/detail";
import { createDate, isPast } from "utils/date";
import { convertFileUnit } from "utils/convertFileUnit";

const DetailPage = () => {
  const [detail, setDetail] = useState<Detail | undefined>(undefined);
  const [expired, setExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { key } = useParams();

  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  const URL = `${PROXY}/homeworks/links`;

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      const res = await axios.get<Detail[]>(URL);
      const det = res.data.find(detail => detail.key === key);
      setDetail(det);
      setLoading(false);
    };

    initPage();
  }, [key]);

  useEffect(() => {
    if (detail) {
      setExpired(isPast(detail.expires_at * 1000));
    }
  }, [detail]);

  if (loading) {
    return <Loading />;
  }

  if (detail) {
    return (
      <>
        <S.Header>
          <S.LinkInfo>
            <S.Title>{detail.sent?.subject || "제목없음"}</S.Title>
            <S.Url>
              {window.location.host}/{key}
            </S.Url>
          </S.LinkInfo>
          <DownloadButton expired={expired} />
        </S.Header>
        <S.Article>
          <S.Description>
            <S.Texts>
              <DescItem
                title="링크 생성일"
                text={createDate(detail.created_at)}
              />
              {detail.sent?.content && (
                <DescItem title="메세지" text={detail.sent.content} />
              )}
              <DescItem title="다운로드 횟수" text={detail.download_count} />
            </S.Texts>
            <S.LinkImage>
              <S.Image />
            </S.LinkImage>
          </S.Description>
          <S.ListSummary>
            <div>총 {detail.files.length}개의 파일</div>
            <div>
              {convertFileUnit(
                detail.files.reduce((result, current) => {
                  return result + current.size;
                }, 0),
              )}
            </div>
          </S.ListSummary>
          <S.FileList>
            {expired ? (
              <S.ExpiredWarning>만료된 링크입니다.</S.ExpiredWarning>
            ) : (
              detail.files.map(({ key, name, size, thumbnailUrl }) => (
                <FileListItem
                  key={key}
                  name={name}
                  size={size}
                  thumbnailUrl={thumbnailUrl}
                />
              ))
            )}
          </S.FileList>
        </S.Article>
      </>
    );
  }

  return <NotFound />;
};

export default DetailPage;
