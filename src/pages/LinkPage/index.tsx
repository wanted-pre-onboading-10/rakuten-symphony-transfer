import React, { useEffect, useState } from "react";
import type { FC } from "react";
import Avatar from "components/Avatar";
import axios from "axios";
import { addComma } from "utils/convert";
import { expireDate } from "utils/date";
import { convertFileUnit } from "utils/convertFileUnit";
import { useNavigate } from "react-router-dom";
import { isSvgLink, getSvgFileName } from "utils/svg";

import * as S from "pages/LinkPage/styles";

type ItemsType = ItemObjectType[];

type ItemObjectType = {
  created_at: number;
  key: string;
  expires_at: number;
  download_count: number;
  count: number;
  size: number;
  summary: string;
  thumbnailUrl: string;
  files: FileType[];
  sent?: SentType;
};

type FileType = {
  key: string;
  thumbnailUrl: string;
  name: string;
  size: number;
};

type SentType = {
  subject: string;
  content: string;
  emails: string[];
};

const LinkPage: FC = () => {
  const [items, setItems] = useState<ItemsType>([]);
  const navigate = useNavigate();
  const URL = window.location.href;

  useEffect(() => {
    axios.get("/homeworks/links").then(response => {
      setItems(response.data);
    });
  }, []);

  const movePage = (key: string): void => {
    navigate(`/${key}`);
  };

  const checkIsValid = (expires_at: number): boolean => {
    return expireDate(expires_at) !== "만료됨" ? true : false;
  };

  const setCurUrl = (key: string): string => {
    return URL + key;
  };

  const copyClipboard = (URLkey: string | false) => {
    if (URLkey) {
      navigator.clipboard.writeText(URLkey);
      alert(`${URLkey}주소가 복사되었습니다.`);
    }
  };

  const setFileName = (thumbnailUrl: string) => {
    const fetchesSvg = isSvgLink(thumbnailUrl);
    const imageUrl = fetchesSvg
      ? "/svgs/" + getSvgFileName(thumbnailUrl)
      : thumbnailUrl;
    return imageUrl;
  };
  return (
    <>
      <S.Title>마이 링크</S.Title>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableCell>제목</S.TableCell>
            <S.TableCell>파일개수</S.TableCell>
            <S.TableCell>크기</S.TableCell>
            <S.TableCell>유효기간</S.TableCell>
            <S.TableCell>받은사람</S.TableCell>
          </S.TableRow>
        </S.TableHead>
        <S.TableBody>
          {items.map((item: ItemObjectType, idx: number) => {
            const isValid = checkIsValid(item.expires_at);
            const URLkey = isValid && setCurUrl(item.key);
            return (
              <S.TableRow
                key={idx}
                onClick={() => {
                  isValid && movePage(item.key);
                }}>
                <S.TitleTableCell>
                  <S.LinkInfo>
                    <S.LinkImage>
                      <img
                        referrerPolicy="no-referrer"
                        src={setFileName(item.thumbnailUrl)}
                        alt=""
                      />
                    </S.LinkImage>
                    <S.LinkTexts>
                      <S.LinkTitle>{item.summary}</S.LinkTitle>
                      <S.LinkUrl
                        isValid={isValid}
                        onClick={event => {
                          event.stopPropagation();
                          isValid && copyClipboard(URLkey);
                        }}>
                        {isValid ? URLkey : "만료됨"}
                      </S.LinkUrl>
                    </S.LinkTexts>
                  </S.LinkInfo>
                  <span />
                </S.TitleTableCell>
                <S.TableCell>
                  <span>파일개수</span>
                  <span>{addComma(item.count)}</span>
                </S.TableCell>
                <S.TableCell>
                  <span>파일사이즈</span>
                  <span>{convertFileUnit(item.size)}</span>
                </S.TableCell>
                <S.TableCell>
                  <span>유효기간</span>
                  <span>{expireDate(item.expires_at)}</span>
                </S.TableCell>
                <S.TableCell>
                  <span>받은사람</span>
                  <S.LinkReceivers>
                    {!!item.sent &&
                      item.sent.emails.map((email: string, idx: number) => (
                        <Avatar key={idx} text={email} />
                      ))}
                  </S.LinkReceivers>
                </S.TableCell>
              </S.TableRow>
            );
          })}
        </S.TableBody>
      </S.Table>
    </>
  );
};

export default LinkPage;
