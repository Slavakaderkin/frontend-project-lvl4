/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';

import { fetchData } from '../../services/index.js';
import { removeChannel } from './channelsSlice.js';

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
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.byId = _.keyBy(messages, 'id');
        state.allIds = messages.map(({ id }) => id);
      })
      .addCase(removeChannel, (state, action) => {
        const { id: channelId } = action.payload;
        const messagesIds = state.allIds.map((id) => state.byId[id])
          .filter((msg) => msg.channelId === channelId)
          .map(({ id }) => id);
        state = {
          byId: _.omit(state.byId, messagesIds),
          allIds: _.remove(state.allIds, (id) => messagesIds.includes(id)),
        };
      });
  },
});

const { actions, reducer } = messagesSlice;

export const { addMessage } = actions;

export default reducer;
