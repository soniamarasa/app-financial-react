import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { ThemeStorage } from './contexts/ThemeContext';
import { Container } from './components/Container/Container';
import { TransactionStorage } from './contexts/TransactionContext';
import { ToastContextProvider } from './contexts/ToastContext';

import './theme/theme.scss'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
import { CategoryStorage } from './contexts/CategoryContext';
// import 'primeflex/primeflex.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeStorage>
          <TransactionStorage>
            <CategoryStorage>
              
              <ToastContextProvider>
                <Container />
              </ToastContextProvider>
            </CategoryStorage>
          </TransactionStorage>
        </ThemeStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
