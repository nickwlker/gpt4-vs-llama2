import React, { useContext, useEffect, useRef } from "react";
import {
  Message,
} from "./Message";
import "./ChatContainer.css";
import { AppContext } from "../AppContext";
import { getNextAvatar, getNextType } from "../helpers";

export const ChatContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { messages, isLoading, firstMessageModel } = useContext(AppContext);
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div ref={containerRef} className="ChatContainer">
      {messages?.length ? (
        messages.map(({ message, type, avatar }, index) => (
          <Message
            key={`${index}-${message}`}
            message={message}
            type={type}
            avatar={avatar}
          />
        ))
      ) : (
        <div className="No-Messages">There's no messages yet</div>
      )}
      {isLoading && lastMessage && (
        <Message
          message="..."
          type={getNextType(messages)}
          avatar={getNextAvatar(messages, firstMessageModel)}
        />
      )}
    </div>
  );
};
