import { openAiService } from "../../services/openAiService.js";

export const getAvailableModels = () => {
  return async (dispatch) => {
    try {
      const models = await openAiService.getAvailableModels();
      dispatch({ type: "AVAILABLE_MODELS", models });
    } catch (error) {
      throw error
    }
  };
};

export const askAiQuestion = () => {
  return async (dispatch) => {
    try {
      const aiAnswer = await openAiService.askAiQuestion();
      dispatch({ type: "AI_ANSWERS", aiAnswer });
    } catch (error) {
      throw error
    }
  };
};