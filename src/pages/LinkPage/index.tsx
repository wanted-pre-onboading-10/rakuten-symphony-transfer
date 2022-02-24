import React, { useEffect, useState } from "react";
import type { FC } from "react";
import Avatar from "components/Avatar";
import axios from "axios";
import { addComma } from "utils/convert";
import { expireDate } from "utils/date";
import { convertFileUnit } from "utils/convertFileUnit";
import { useLocation, useNavigate } from "react-router-dom";

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
    console.log("렌더링이 되었습니다.");
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

  return (
    <>
      <button
        onClick={() => {
          setItems([
            ...items,
            {
              created_at: 1641860565,
              key: "15PMXQPE",
              expires_at: 1645923723,
              download_count: 0,
              count: 1,
              size: 11117,
              summary: "유효기간이 만료되지 않은 경우 테스트",
              thumbnailUrl:
                "https://storage-fe.fastraffic.io/homeworks/thumbnails/15PMXQPE/1641860565.png",
              files: [
                {
                  key: "662f2b22920a10dbb4cbd819d6f0786937208.jpg",
                  thumbnailUrl:
                    "https://storage-fe.fastraffic.io/homeworks/thumbnails/15PMXQPE/662f2b22920a10dbb4cbd819d6f0786937208.png",
                  name: "fab-lentz-mRMQwK513hY-unsplash.jpg",
                  size: 115916,
                },
              ],
              sent: {
                subject: "로고파일",
                content: "로고파일 전달 드립니다.",
                emails: [
                  "recruit@estmob.com",
                  "taeheekeim@gmail.com",
                  "campuslife@daum.net",
                ],
              },
            },
          ]);
        }}></button>
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
                <S.TableCell>
                  <S.LinkInfo>
                    <S.LinkImage>
                      <img
                        referrerPolicy="no-referrer"
                        src={item.thumbnailUrl}
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
                </S.TableCell>
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
          {/* 삭제 예정 */}
        </S.TableBody>
      </S.Table>
    </>
  );
};

export default LinkPage;
