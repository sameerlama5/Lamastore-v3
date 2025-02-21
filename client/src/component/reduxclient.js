'use client';
import { persistor, store } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
        <PersistGate
         loading={<div>Loading...</div>}
          persistor={persistor}>
 {children}
        </PersistGate>
    </Provider>
  );
}
