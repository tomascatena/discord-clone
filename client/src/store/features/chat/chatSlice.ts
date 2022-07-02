import { ChatTypes, IChatDetails } from '../../../typings/typings';
import { createSlice } from '@reduxjs/toolkit';

export interface ChartState {
  chosenChatDetails: IChatDetails | null;
  messages: string[];
  chatType: ChatTypes;
}

export const initialState: ChartState = {
  chosenChatDetails: null,
  messages: [],
  chatType: 'direct',
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
