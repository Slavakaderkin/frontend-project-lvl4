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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.byId = _.keyBy(channels, 'id');
      state.allIds = channels.map(({ id }) => id);
      state.currentChannelId = currentChannelId;
    });
  },
});

const { actions, reducer } = channelsSlice;

export const { setCurrentChannelId } = actions;
export default reducer;
