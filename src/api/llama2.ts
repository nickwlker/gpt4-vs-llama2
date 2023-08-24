import { getModelOutput } from "./getModelOutput";

export const getLlama2Response = async (
  inputText: string
): Promise<string | undefined> => {
  if (inputText?.length) {
    const result = await getModelOutput({
      inputText,
      userId: "meta",
      appId: "Llama-2",
      modelId: "llama2-70b-chat",
      modelVersionId: "6c27e86364ba461d98de95cddc559cb3",
    });
    return result;
  }

  return undefined;
};
