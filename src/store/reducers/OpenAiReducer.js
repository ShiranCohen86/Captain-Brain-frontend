const INITIAL_STATE = {
  availableModels: [],
  aiAnswer: {}

};

export const OpenAiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AVAILABLE_MODELS":
      return {
        ...state,
        availableModels: action.models,
      };
    case "AI_ANSWERS":
      return {
        ...state,
        aiAnswer: action.aiAnswer,
      };
    default:
      return state;
  }
};
