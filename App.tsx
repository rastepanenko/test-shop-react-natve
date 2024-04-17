import { RecoilRoot } from 'recoil';
import { Navigation } from './src/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Text } from 'react-native';

export default function AppRecoilWrapper() {
  return (
    <React.Suspense fallback={<Text>Loading</Text>}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.Suspense>
  );
}

export function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Navigation />
    </SafeAreaProvider>
  );
}
