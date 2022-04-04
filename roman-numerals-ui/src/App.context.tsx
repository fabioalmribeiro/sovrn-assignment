import React from 'react';

export interface AppContextProps {
  type: 'roman' | 'arabic',
  setType: Function
}

const AppContext = React.createContext<Partial<AppContextProps>>({
  type: 'roman',
  setType: () => {}
});

export default AppContext;
