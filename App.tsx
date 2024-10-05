import React from 'react';
import { PostList } from './src/screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PostList />
    </SafeAreaProvider>
  );
}


export default App;
