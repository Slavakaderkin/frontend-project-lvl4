/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';

import { fetchData } from '../../services/index.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
    addChannel(state, action) {
      const { channel } = action.payload;
      const newState = {
        byId: {
          ...state.byId,
          [channel.id]: channel,
        },
        allIds: [...state.allIds, channel.id],
      };

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      const byId = _.keyBy(channels, 'id');
      const allIds = channels.map(({ id }) => id);
      return {
        ...state,
        byId,
        allIds,
        currentChannelId,
      };
    });
  },
});

const { actions, reducer } = channelsSlice;

export const { setCurrentChannelId, addChannel } = actions;
export default reducer;
