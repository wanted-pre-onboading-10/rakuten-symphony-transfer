import React from "react";
import styled from "styled-components";

import { convertFileUnit } from "utils/convertFileUnit";
import { isSvgLink, getSvgFileName } from "utils/svg";

const FileListItem = ({
  name,
  size,
  thumbnailUrl,
}: {
  name: string;
  size: number;
  thumbnailUrl: string;
}) => {
  const fetchesSvg = isSvgLink(thumbnailUrl);
  const imageUrl = fetchesSvg
    ? "/svgs/" + getSvgFileName(thumbnailUrl)
    : thumbnailUrl;

  return (
    <FileListItemLi>
      <FileItemInfo>
        <FileImg url={imageUrl} />
        <span>{name}</span>
      </FileItemInfo>
      <FileItemSize>{convertFileUnit(size)}</FileItemSize>
    </FileListItemLi>
  );
};

const FileListItemLi = styled.li`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileItemInfo = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  align-items: center;
`;

const FileImg = styled.span<{ url: string }>`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  display: inline-block;
  background-image: ${({ url }) => `url(${url})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const FileItemSize = styled.div``;

export default FileListItem;
