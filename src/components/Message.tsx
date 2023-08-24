import React, { memo } from "react";
import "./Message.css";
import GPT4Image from "../imgs/gpt4.svg";
import Llama2Image from "../imgs/llama2.jpeg";
import UserImage from "../imgs/user.jpg";

export const SENT_MESSAGE = "SENT";
export const RECEIVED_MESSAGE = "RECEIVED";

export const AVATAR_USER = "USER";
export const AVATAR_GPT = "GPT4";
export const AVATAR_LLAMA = "LLAMA2";

export type MessageType = {
  message: string;
  type: string;
  avatar: string;
};

export const Message = memo(({ message, type, avatar }: MessageType) => (
  <div
    className={`Message-Wrapper ${
      type === SENT_MESSAGE ? "Message-Wrapper-Sent" : "Message-Wrapper-Right"
    }`}
  >
    <div
      style={{
        backgroundImage: `url(${
          avatar === AVATAR_GPT
            ? GPT4Image
            : avatar === AVATAR_LLAMA
            ? Llama2Image
            : UserImage
        })`,
      }}
      className={`Message-Avatar ${
        type === RECEIVED_MESSAGE
          ? "Message-Avatar-Left"
          : "Message-Avatar-Right"
      }
        `}
    />
    <div
      className={`Message ${
        type === SENT_MESSAGE ? "Message-Sent" : "Message-Received"
      }`}
    >
      {message}
    </div>
  </div>
));
