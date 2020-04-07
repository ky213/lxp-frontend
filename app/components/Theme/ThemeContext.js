import React, { createContext, useContext, useReducer } from 'react';

export const ThemeContext = createContext();
const { Provider, Consumer } = ThemeContext;

export { Provider, Consumer };

