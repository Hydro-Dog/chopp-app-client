import { createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS } from '@shared/index';
import { ErrorResponse, ClientAppConfig } from '@shared/types';
import { fetchClientAppConfig } from './actions';

export type ClientAppConfigState = {
  clientAppConfig?: ClientAppConfig;
  fetchClientAppConfigStatus: FETCH_STATUS;
  fetchClientAppConfigError?: ErrorResponse;
};

const initialState: ClientAppConfigState = {
  clientAppConfig: undefined,
  fetchClientAppConfigStatus: FETCH_STATUS.IDLE,
  fetchClientAppConfigError: undefined,
};

export const clientAppConfigSlice = createSlice({
  name: 'clientAppConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientAppConfig.pending, (state) => {
        state.fetchClientAppConfigStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchClientAppConfig.fulfilled, (state, action) => {
        state.fetchClientAppConfigStatus = FETCH_STATUS.SUCCESS;
        state.clientAppConfig = action.payload;
      })
      .addCase(fetchClientAppConfig.rejected, (state, action) => {
        state.fetchClientAppConfigStatus = FETCH_STATUS.ERROR;
        state.fetchClientAppConfigError = action.payload ?? {
          message: 'Unknown error',
        };
      });
  },
});
