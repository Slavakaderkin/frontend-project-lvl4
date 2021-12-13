import { createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';

import { fetchData } from '../../services/index.js';

const DEFAULT_CHANNEL_ID = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannelId(state, action) {
      return {
        ...state,
        currentChannelId: action.payload,
      };
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
    removeChannel(state, action) {
      const { id: deleteId } = action.payload;
      return {
        byId: _.omit(state.byId, deleteId),
        allIds: state.allIds.filter((id) => deleteId !== id),
        currentChannelId: DEFAULT_CHANNEL_ID,
      };
    },
    changeName(state, action) {
      const { channel } = action.payload;
      const { currentChannelId, allIds } = state;
      return {
        byId: {
          ...state.byId,
          [channel.id]: channel,
        },
        allIds,
        currentChannelId,
      };
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

export const {
  setCurrentChannelId,
  addChannel,
  removeChannel,
  changeName,
} = actions;

export default reducer;
