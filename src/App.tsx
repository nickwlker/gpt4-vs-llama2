import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { ChatContainer } from "./components/ChatContainer";
import { MODEL_LLAMA2, Switcher } from "./components/Switcher";
import { NewMessageForm } from "./components/NewMessageForm";
import { AppContext } from "./AppContext";
import { MessageType } from "./components/Message";
import {
  getApiModel,
  getApiResponse,
  getLastMessage,
  getNextAvatar,
  getNextType,
} from "./helpers";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [firstMessageModel, setFirstMessageModel] =
    useState<string>(MODEL_LLAMA2);
  const pushMessage = useCallback(
    (newMessage: MessageType) =>
      setMessages((oldMessages) => [...oldMessages, newMessage]),
    []
  );

  const getNewResponse = useCallback(
    async (apiModel: string, lastMessage: MessageType) => {
      setIsLoading(true);
      const apiResponse = await getApiResponse(apiModel, lastMessage.message);
      if (apiResponse) {
        pushMessage({
          message: apiResponse,
          avatar: getNextAvatar(messages, firstMessageModel),
          type: getNextType(messages),
        });
      }
      setIsLoading(false);
    },
    [messages, firstMessageModel, pushMessage]
  );

  useEffect(() => {
    const lastMessage = getLastMessage(messages);
    const apiModel = getApiModel(messages, firstMessageModel);

    if (lastMessage && apiModel && !isLoading) {
      getNewResponse(apiModel, lastMessage);
    }
  }, [messages, firstMessageModel, isLoading, getNewResponse]);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          messages,
          pushMessage,
          firstMessageModel,
          setFirstMessageModel,
          isLoading,
        }}
      >
        <Switcher />
        <ChatContainer />
        <NewMessageForm />
        <button
          onClick={() => window.location.reload()}
          className={`App-Button ${
            messages.length > 0 ? "Active" : "Disabled"
          }`}
          disabled={messages.length === 0}
        >
          Stop and reset
        </button>
      </AppContext.Provider>
    </div>
  );
}

export default App;
