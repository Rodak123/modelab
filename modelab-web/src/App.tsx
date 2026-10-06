import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './frontend/routers/Router';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
