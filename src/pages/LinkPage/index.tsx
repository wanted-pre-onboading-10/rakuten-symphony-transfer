import React, { useEffect, useState } from "react";
import type { FC } from "react";
import Avatar from "components/Avatar";
import styled from "styled-components";
import colors from "styles/colors";
import axios from "axios";
import { addComma } from "utils/convert";
import { expireDate } from "utils/date";
import { convertFileUnit } from "utils/convertFileUnit";
import { useLocation, useNavigate } from "react-router-dom";

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
  // useEffect(() => {
  //   axios.get("/homeworks/links").then(res => {
  //     res.data.map((items: ItemsType, idx: number) => {
  //       console.log(items);
  //     });
  //   });
  // }, []);
  // async function getUsers() {
  //   const response = await axios.get("/homeworks/links");
  //   return response.data;
  // }
  const [items, setItems] = useState<ItemsType>([]);
  const navigate = useNavigate();
  const URL = window.location.href;

  useEffect(() => {
    axios.get("/homeworks/links").then(response => {
      setItems(response.data);
    });
  }, []);

  const clickHandler = (key: string): void => {
    navigate(`/${key}`);
  };
  const setCurUrl = (key: string, expires_at: number): string => {
    return expireDate(expires_at) === "만료됨" ? "만료됨" : URL + key;
  };
  const checkIsValid = (expires_at: number): boolean => {
    return expireDate(expires_at) !== "만료됨" ? true : false;
  };

  return (
    <>
      <Title>마이 링크</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell>파일개수</TableCell>
            <TableCell>크기</TableCell>
            <TableCell>유효기간</TableCell>
            <TableCell>받은사람</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 구조 분해 할당 예정 */}
          {items.map((item: ItemObjectType, idx: number) => {
            const isValid = checkIsValid(item.expires_at);
            return (
              <TableRow
                key={idx}
                onClick={() => {
                  isValid ? clickHandler(item.key) : null;
                }}>
                <TableCell>
                  <LinkInfo>
                    <LinkImage>
                      <img
                        referrerPolicy="no-referrer"
                        src={item.thumbnailUrl}
                        alt=""
                      />
                    </LinkImage>
                    <LinkTexts>
                      <LinkTitle>{item.summary}</LinkTitle>
                      <LinkUrl
                        isValid={isValid}
                        onClick={event => {
                          event.stopPropagation();
                        }}>
                        {setCurUrl(item.key, item.expires_at)}
                      </LinkUrl>
                    </LinkTexts>
                  </LinkInfo>
                  <span />
                </TableCell>
                <TableCell>
                  <span>파일개수</span>
                  <span>{addComma(item.count)}</span>
                </TableCell>
                <TableCell>
                  <span>파일사이즈</span>
                  <span>{convertFileUnit(item.size)}</span>
                </TableCell>
                <TableCell>
                  <span>유효기간</span>
                  <span>{expireDate(item.expires_at)}</span>
                </TableCell>
                <TableCell>
                  <span>받은사람</span>
                  <LinkReceivers>
                    {!item.sent
                      ? null
                      : item.sent.emails.map((email: string, idx: number) => (
                          <Avatar key={idx} text={email} />
                        ))}
                  </LinkReceivers>
                </TableCell>
              </TableRow>
            );
          })}
          {/* 삭제 예정 */}
          <TableRow
            onClick={() => {
              checkIsValid(1645923723) ? clickHandler("7725NJHW") : null;
            }}>
            <TableCell>
              <LinkInfo>
                <LinkImage>
                  <img
                    referrerPolicy="no-referrer"
                    src="/svgs/default.svg"
                    alt=""
                  />
                </LinkImage>
                <LinkTexts>
                  <LinkTitle>로고파일</LinkTitle>
                  <LinkUrl
                    isValid={checkIsValid(1645923723)}
                    onClick={event => {
                      event.stopPropagation();
                      navigator.clipboard.writeText(
                        setCurUrl("7725NJHW", 1645923723),
                      );
                      alert(
                        `${setCurUrl(
                          "7725NJHW",
                          1645923723,
                        )}주소가 복사되었습니다.`,
                      );
                    }}>
                    {setCurUrl("7725NJHW", 1645923723)}
                  </LinkUrl>
                </LinkTexts>
              </LinkInfo>
              <span />
            </TableCell>
            <TableCell>
              <span>파일개수</span>
              <span>1</span>
            </TableCell>
            <TableCell>
              <span>파일사이즈</span>
              <span>10.86KB</span>
            </TableCell>
            <TableCell>
              <span>유효기간</span>
              <span>48시간 00분</span>
            </TableCell>
            <TableCell>
              <span>받은사람</span>
              <LinkReceivers>
                <Avatar text="recruit@estmob.com" />
              </LinkReceivers>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default LinkPage;

const Title = styled.h2`
  color: ${colors.grey700};
  letter-spacing: -0.62px;
  word-break: keep-all;
  margin: 0;
`;

const Table = styled.table`
  margin-top: 24px;
  margin-bottom: 102px;
  width: 100%;
  display: table;
  position: relative;
  text-align: left;
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
  border-spacing: 0px;
  color: ${colors.grey600};
`;

const TableHead = styled.thead`
  font-weight: 600;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableBody = styled.tbody`
  font-weight: 400;
  cursor: pointer;

  tr {
    @media (max-width: 768px) {
      float: left;
      width: calc(100% - 40px);
      position: relative;
      box-shadow: 0 2px 17px 0 rgba(0, 0, 0, 0.07);
      margin-bottom: 30px;
      background-color: ${colors.white};
      border-radius: 4px;
      padding: 0px 20px 20px 20px;
    }
  }

  th {
    font-size: 14px;

    & > span:first-child {
      display: none;
    }

    @media (max-width: 768px) {
      width: 100%;
      border-bottom: none;
      padding: 20px 0;
      border-top: 1px solid;
      border-color: ${colors.grey200};
      display: flex;
      justify-content: space-between;

      & > span:first-child {
        display: inline-block;
      }
      & > *:last-child {
        display: inline-block;
      }
      &:first-child {
        border-top: none;
      }
    }
  }
`;

const TableRow = styled.tr`
  color: inherit;
  display: table-row;
  vertical-align: middle;
  outline: 0px;
  font-weight: inherit;
  font-size: inherit;
`;

const TableCell = styled.th`
  font-weight: inherit;
  font-size: inherit;
  font-size: 12px;
  line-height: 24px;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid ${colors.grey300};
  text-align: left;
  padding: 16px;
`;

const LinkInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LinkImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 4px;
  }
`;

const LinkTexts = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  & > * {
    margin: 0;
  }
`;

const LinkTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.grey700};
`;

const LinkUrl = styled.p<{ isValid: boolean }>`
  text-decoration: ${props => (props.isValid ? "underline" : "none")};

  :hover {
    color: ${colors.teal700};
  }
`;

const LinkReceivers = styled.div`
  display: flex;

  & > * + * {
    margin-left: 8px;
  }
`;
