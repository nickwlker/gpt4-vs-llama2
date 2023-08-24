import { createContext } from 'react';
import { MessageType } from './components/Message';
import { MODEL_LLAMA2 } from './components/Switcher';

export const AppContext = createContext({
    messages: [] as MessageType[],
    pushMessage: (message: MessageType) => {},
    firstMessageModel: MODEL_LLAMA2,
    setFirstMessageModel: (model: string) => {},
    isLoading: false,
});
