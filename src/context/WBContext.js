import { createContext, useReducer } from "react";

export const WBContext = createContext();

const initialState = {
  isLogin: false,
  cart: [],
  user: null,
};

const arraysMatch = function (arr1, arr2) {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  // Otherwise, return true
  return true;
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const isInCart = state.cart.find((product) => {
        const matchedArray = arraysMatch(
          product.toppings,
          action.payload.toppings
        );
        return product.id === action.payload.id && matchedArray;
      });
      const subTotal = action.payload.quantity * action.payload.initialPrice;
      console.log(subTotal);

      if (isInCart) {
        const inCart = state.cart.map((product) => {
          const matchedArray = arraysMatch(
            product.toppings,
            action.payload.toppings
          );
          if (product.id === action.payload.id && matchedArray) {
            return {
              ...product,
              quantity: product.quantity + 1,
              subTotal: (product.quantity + 1) * product.initialPrice,
            };
          } else {
            return product;
          }
        });
        return {
          ...state,
          cart: inCart,
        };
      }

      const newCart = [...state.cart, { ...action.payload }];
      return {
        ...state,
        cart: newCart,
      };
    case "SAVE_CART":
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log(state.cart);

      return state;
    case "DECREASE_CART":
      return {
        ...state,
        cart: state.cart.map((item) => {
          const matchedArray = arraysMatch(
            item.toppings,
            action.payload.toppings
          );
          if (item.id === action.payload.id && matchedArray) {
            return {
              ...item,
              quantity: item.quantity - 1,
              subTotal: (item.quantity - 1) * item.initialPrice,
            };
          } else {
            return item;
          }
        }),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item !== action.payload),
      };
    case "RESET_CART":
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    case "UPDATE_CART":
      const cartData = localStorage.getItem("cart");
      if (!cartData) {
        return state;
      }
      return { ...state, cart: JSON.parse(cartData) };
    case "GET_TOTAL_CART":
      if (state.cart.length > 0) {
        let subtotal = 0,
          quantity = 0,
          total = 0;
        state.cart.map((item) => {
          subtotal += +item.price;
          quantity += +item.quantity;
          total += +item.price * +item.quantity;
        });
        return {
          ...state,
          totalCart: { subtotal, quantity, total },
        };
      } else {
        return {
          ...state,
          totalCart: initialState.totalCart,
        };
      }
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
      localStorage.removeItem("token");

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
