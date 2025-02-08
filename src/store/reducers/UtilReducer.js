const INITIAL_STATE = {
  isShownKeyboard: false

};

export const UtilReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_KEYBOARD":
      return {
        ...state,
        isShownKeyboard: action.isShownKeyboard,
      };
    default:
      return state;
  }
};
