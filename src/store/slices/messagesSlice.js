/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';

import { fetchData } from '../../services/index.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addMessage(state, action) {
      const { msg } = action.payload;
      state.byId[msg.id] = msg;
      state.allIds.push(msg.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      state.byId = _.keyBy(messages, 'id');
      state.allIds = messages.map(({ id }) => id);
    });
  },
});

const { actions, reducer } = messagesSlice;

export const { addMessage } = actions;

export default reducer;
