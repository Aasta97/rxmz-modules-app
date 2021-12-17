import React from 'react';

import GlobalStyle from "./global";
import Routes from './routes';

function App() {
  return (
    <>
      <style type="text/css">
        {`
        .panel {
          border-radius: 3px;
          padding: 10px;
          background-color: #eee;
          box-shadow: 1px 1px 5px #999;
        }
        `}
      </style>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
