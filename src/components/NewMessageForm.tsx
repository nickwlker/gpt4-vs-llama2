import React, { memo, useContext, useRef } from "react";
import "./NewMessageForm.css";
import { AppContext } from "../AppContext";
import { AVATAR_USER, MessageType, SENT_MESSAGE } from "./Message";

type NewMessageFormComponentProps = {
  isDisabled: boolean;
  pushMessage: (newMessage: MessageType) => void;
};

export const NewMessageFormComponent = memo(
  ({ isDisabled, pushMessage }: NewMessageFormComponentProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const submitMessage = (message: string) =>
      pushMessage({
        message,
        avatar: AVATAR_USER,
        type: SENT_MESSAGE,
      });

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputRef?.current && inputRef.current.value !== "") {
        submitMessage(inputRef.current.value);
        inputRef.current.value = "";
      }
    };

    return (
      <div className="NewMessageForm-Container">
        <form className="NewMessageForm-Form" onSubmit={onFormSubmit}>
          <input
            ref={inputRef}
            autoComplete="off"
            name="message"
            className={`NewMessageForm-Input ${isDisabled ? "Disabled" : ""}`}
            placeholder="Write your message here..."
            autoFocus
            disabled={isDisabled}
          />
          <button
            type="submit"
            className={`NewMessageForm-Submit ${isDisabled ? "Disabled" : ""}`}
            disabled={isDisabled}
          >
            ⤴
          </button>
        </form>
      </div>
    );
  }
);

export const NewMessageForm = () => {
  const { messages, pushMessage } = useContext(AppContext);
  const isDisabled = messages?.length > 0;
  return (
    <NewMessageFormComponent
      isDisabled={isDisabled}
      pushMessage={pushMessage}
    />
  );
};
