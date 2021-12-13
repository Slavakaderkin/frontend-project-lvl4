import React from 'react';

import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import { Provider } from 'react-redux';
import AuthProvider from './components/AuthProvider.jsx';
import SocketProvider from './components/SocketProvider.jsx';
import App from './App.jsx';

import store from './store';
import resources from './locales';

const init = () => {
  const i18nInstance = i18n.createInstance();

  i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: true,
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <AuthProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
