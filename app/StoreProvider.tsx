'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactNode } from 'react';
import ApartsProvider from './ApartsProvider';

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ApartsProvider>
        {children}
      </ApartsProvider>
    </Provider>
  );
}