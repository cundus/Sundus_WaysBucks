import { createContext, useReducer } from "react";

export const WBContext = createContext();

const initialState = {
  isLogin: false,
  carts: [],
  user: null,
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      const addedCarts = [...state.carts];
      addedCarts.push(action.payload);
      return {
        ...state,
        carts: [...addedCarts],
      };

    case "REMOVE_CART":
      return {
        ...state,
        carts: state.carts.filter(
          (product) => product.id !== action.payload.id
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        carts: [],
      };

    case "LOGIN":
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        isLogin: false,
        user: action.payload,
      };
    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("userlogin");
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    default:
      throw new Error("unknown cases");
  }
};

export const WBContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <WBContext.Provider value={{ state, dispatch }}>
      {children}
    </WBContext.Provider>
  );
};
