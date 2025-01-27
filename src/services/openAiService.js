import { httpService } from "./httpService";


const askAiQuestion = async (data) => {
  try {
    const response = await httpService.post("chatgpt/ask-ai", data);
    return response
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
};
const getAvailableModels = async () => {
  try {
    const response = await httpService.get("chatgpt/models/");
    return response
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
};

export const openAiService = {
  askAiQuestion,
  getAvailableModels
}
