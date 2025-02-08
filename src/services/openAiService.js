import { httpService } from "./httpService";


const askAiQuestion = async (data) => {
  try {
    const response = await httpService.post("openAi/ask-ai/", data);
    return response
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
};
const getAvailableModels = async () => {
  try {
    const response = await httpService.get("openAi/models/");
    return response
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
};

const consoleBackend = async (text) => {
  try {
    const response = await httpService.post("openAi/console/", {text});
    return response
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
};

export const openAiService = {
  askAiQuestion,
  getAvailableModels,
  consoleBackend
}
