import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';
import { getAuthHeader } from '../helpers/index.js';

// eslint-disable-next-line import/prefer-default-export
export const fetchData = createAsyncThunk(
  'data/fetchStatus',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    console.log(response.data);

    return response.data;
  },
);
