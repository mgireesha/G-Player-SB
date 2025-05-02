import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { CustomThemeProvider } from './ThemeProvider';

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <CustomThemeProvider >
            <App />
          </CustomThemeProvider>
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
