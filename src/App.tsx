import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesProvider } from './app/router/routesProvider';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesProvider />
    </BrowserRouter>
  );
};

export default App;