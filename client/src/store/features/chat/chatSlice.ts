import { CHAT_TYPES } from '@/constants/constants';
import { ChatTypes, IChatDetails, IDirectMessage } from '@/typings/typings';
import { createSlice } from '@reduxjs/toolkit';

export interface ChartState {
  chosenChatDetails: IChatDetails | null;
  messages: IDirectMessage[];
  chatType: ChatTypes;
}

export const initialState: ChartState = {
  chosenChatDetails: null,
  messages: [],
  chatType: CHAT_TYPES.DIRECT,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChosenChatDetails: (state, action) => {
      state.chosenChatDetails = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setChatType: (state, action) => {
      state.chatType = action.payload;
    }
  },
  extraReducers: () => { },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
