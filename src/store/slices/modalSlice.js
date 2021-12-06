import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    extra: {},
  },
  reducers: {
    showModal(state, action) {
      return action.payload;
    },
    hideModal() {
      return {
        type: null,
        extra: {},
      };
    },
  },
});

const { actions, reducer } = modalSlice;

export const { showModal, hideModal } = actions;

export default reducer;
