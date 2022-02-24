import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import Container from "components/Container";
import DetailPage from "pages/DetailPage";
import LinkPage from "pages/LinkPage";
import NotFound from "components/Notfound";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Routes>
          <Route path="/" element={<LinkPage />} />
          <Route path="/:key" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
