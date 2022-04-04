import React from 'react';

export interface AppContextProps {
  mode: 'roman' | 'arabic',
  setMode: Function
}

const AppContext = React.createContext<Partial<AppContextProps>>({
  mode: 'roman',
  setMode: () => {}
});

export default AppContext;
