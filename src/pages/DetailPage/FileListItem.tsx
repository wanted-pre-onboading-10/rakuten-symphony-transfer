import React from "react";
import styled from "styled-components";
import fileSize from "filesize";

const FileListItem = ({ name, size }: { name: string; size: number }) => {
  return (
    <FileListItemLi>
      <FileItemInfo>
        <FileImg />
        <span>{name}</span>
      </FileItemInfo>
      <FileItemSize>{fileSize(size)}</FileItemSize>
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

const FileImg = styled.span`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  display: inline-block;
  background-image: url(/svgs/default.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const FileItemSize = styled.div``;

export default FileListItem;
