import { getGpt4Response } from "./api/chatGpt";
import { getLlama2Response } from "./api/llama2";
import {
  AVATAR_GPT,
  AVATAR_LLAMA,
  AVATAR_USER,
  MessageType,
  RECEIVED_MESSAGE,
  SENT_MESSAGE,
} from "./components/Message";
import { MODEL_GPT4, MODEL_LLAMA2 } from "./components/Switcher";

export const getLastMessage = (
  messages: MessageType[]
): MessageType | undefined => messages[messages.length - 1] || undefined;

export const getNextAvatar = (
  messages: MessageType[],
  defaultAvatar: string
): string => {
  const lastMessage = getLastMessage(messages);
  return lastMessage?.avatar === AVATAR_LLAMA
    ? AVATAR_GPT
    : lastMessage?.avatar === AVATAR_GPT
    ? AVATAR_LLAMA
    : defaultAvatar;
};

export const getNextType = (messages: MessageType[]): string => {
  const lastMessage = getLastMessage(messages);
  return lastMessage?.type === SENT_MESSAGE ? RECEIVED_MESSAGE : SENT_MESSAGE;
};

export const getApiModel = (
  messages: MessageType[],
  defaultModel: string
): string | undefined => {
  const lastMessage = getLastMessage(messages);
  let apiModel: string | undefined;
  if (lastMessage?.avatar === AVATAR_LLAMA) {
    apiModel = MODEL_GPT4;
  }

  if (lastMessage?.avatar === AVATAR_GPT) {
    apiModel = MODEL_LLAMA2;
  }

  if (lastMessage?.avatar === AVATAR_USER) {
    apiModel = defaultModel;
  }
  return apiModel;
};

export const getApiResponse = async (
  model: string | undefined,
  message: string
): Promise<string | undefined> => {
  if (model === MODEL_GPT4) {
    const apiResponse = await getGpt4Response(message);
    return apiResponse;
  }
  if (model === MODEL_LLAMA2) {
    const apiResponse = await getLlama2Response(message);
    return apiResponse;
  }
  return undefined;
};
