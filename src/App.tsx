import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { ThemeStorage } from './contexts/ThemeContext';
import { Container } from './components/Container/Container';
import { TransactionStorage } from './contexts/TransactionContext';

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
