import React from "react";
import styled, { keyframes } from "styled-components";

import colors from "styles/colors";

const Loading = () => {
  return (
    <Loader>
      <Ring></Ring>
    </Loader>
  );
};

const load = keyframes`
  0% {
    background: ${colors.teal100}
  }
   
  10% {
    background: ${colors.teal500};
  }
  
  40% {
    background: ${colors.teal100};
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 72px;
`;

const Ring = styled.div`
  animation: ${load} 2000ms 300ms infinite ease-out;
  position: relative;
  margin: 0 auto;

  &,
  &::before,
  &::after {
    background: #eee;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  &::before,
  &::after {
    content: " ";
    position: absolute;
    top: 0;
  }

  &::before {
    animation: ${load} 2000ms 150ms infinite ease-out;
    left: -60px;
  }

  &::after {
    animation: ${load} 2000ms 450ms infinite ease-out;
    right: -60px;
  }
`;

export default Loading;
