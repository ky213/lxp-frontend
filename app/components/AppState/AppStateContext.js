import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const AppStateContext = createContext();

export const AppStateProvider = ({ reducer, initialState, children }) => (
  <AppStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppStateContext.Provider>
);

AppStateProvider.propTypes = {
  /**
   * @return {React.Node}
   */
  children: PropTypes.node.isRequired,

  /**
   * Object containing initial state value.
   */
  initialState: PropTypes.shape({}).isRequired,

  /**
   *
   * @param {object} state
   * @param {object} action
   */
  reducer: PropTypes.func.isRequired
};

export const useAppState = () => useContext(AppStateContext);