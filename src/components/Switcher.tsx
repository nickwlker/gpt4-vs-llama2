import React, { memo, useContext } from "react";
import "./Switcher.css";
import { AppContext } from "../AppContext";

export const MODEL_LLAMA2 = "LLAMA2";
export const MODEL_GPT4 = "GPT4";

type SwitcherComponentProps = {
  isDisabled: boolean;
  firstMessageModel: string;
  setFirstMessageModel: (newValue: string) => void;
};

const SwitcherComponent = memo(
  ({
    isDisabled,
    firstMessageModel,
    setFirstMessageModel,
  }: SwitcherComponentProps) => (
    <div className="Switcher">
      <button
        disabled={isDisabled}
        onClick={() => setFirstMessageModel(MODEL_GPT4)}
        className={`Switcher-Item ${
          firstMessageModel === MODEL_GPT4 ? "Active" : ""
        }`}
      >
        GPT-4
      </button>
      <button
        disabled={isDisabled}
        onClick={() => setFirstMessageModel(MODEL_LLAMA2)}
        className={`Switcher-Item ${
          firstMessageModel === MODEL_LLAMA2 ? "Active" : ""
        }`}
      >
        Llama2
      </button>
    </div>
  )
);

export const Switcher = () => {
  const { firstMessageModel, setFirstMessageModel, messages } =
    useContext(AppContext);
  const isDisabled = messages.length > 0;
  return (
    <SwitcherComponent
      isDisabled={isDisabled}
      firstMessageModel={firstMessageModel}
      setFirstMessageModel={setFirstMessageModel}
    />
  );
};
