
export const toggleKeyboard = (isShownKeyboard) => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_KEYBOARD", isShownKeyboard });
  };
};

