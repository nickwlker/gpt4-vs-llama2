import { getModelOutput } from "./getModelOutput";

export const getGpt4Response = async (
  inputText: string
): Promise<string | undefined> => {
  if (inputText?.length) {
    const result = await getModelOutput({
      inputText,
      userId: "openai",
      appId: "chat-completion",
      modelId: "GPT-4",
      modelVersionId: "ad16eda6ac054796bf9f348ab6733c72",
    });
    return result;
  }

  return undefined;
};
