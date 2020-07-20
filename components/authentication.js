import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect, useReducer } from 'react';

const AuthenticationStateContext = React.createContext();
const AuthenticationDispatchContext = React.createContext();

const initialState = {
  isLoading: false,
  errors: null,
  user: null,
  access: null,
  refresh: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, isLoading: true, errors: null };

    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
        isLoading: false,
        errors: action.payload.error,
      };

    case 'LOAD_DATA_USER_TO_STORAGE':
      return { ...state, ...action.payload };

    case 'LOGOUT':
      return initialState;

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const useAuthenticationState = () => {
  const context = useContext(AuthenticationStateContext);
  if (context === undefined) {
    throw new Error(
      'useAuthenticationState must be used within a AuthenticationProvider',
    );
  }
  return context;
};

export const useAuthenticationDispatch = () => {
  const context = useContext(AuthenticationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useAuthenticationDispatch must be used within a AuthenticationProvider',
    );
  }
  return context;
};
export default function AuthenticationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadDataToStorage = async () => {
    const token = await AsyncStorage.getItem('@token');

    try {
      if (token) {
        const user = await AsyncStorage.getItem('@user');
        const refresh = await AsyncStorage.getItem('@refreshToken');
        dispatch({
          type: 'LOAD_DATA_USER_TO_STORAGE',
          payload: { user: JSON.parse(user), refresh, access: token },
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadDataToStorage();
  }, []);

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthenticationDispatchContext.Provider>
    </AuthenticationStateContext.Provider>
  );
}
