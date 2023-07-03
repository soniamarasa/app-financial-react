import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { ThemeStorage } from './contexts/ThemeContext';
import { Container } from './components/Container/Container';
import { TransactionStorage } from './contexts/TransactionContext';

import './theme/theme.css'; // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
// import 'primeflex/primeflex.css';   

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeStorage>
          <TransactionStorage>
            <Container />
          </TransactionStorage>
        </ThemeStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
