import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, PaginationResponse, STORAGE_KEYS, User } from '@shared/index';
import { FETCH_STATUS } from '@shared/types/fetch-status';
import {
  updateCurrentUser,
  fetchCurrentUser,
  // loginUser,
  logoutUser,
  // loginByCode,
  verifyByCode,
  getVerificationCode,
  // registerUser,
  // fetchUsers,
  // fetchUser,
} from './actions';
import { UserAuthorization } from './types';

export type UserState = {
  currentUser: User | null;
  currentUserStatus: FETCH_STATUS;
  currentUserError: ErrorResponse | null;
  updateCurrentUserStatus: FETCH_STATUS;
  updateCurrentUserError: ErrorResponse | null;
  logoutStatus: FETCH_STATUS;
  logoutError: ErrorResponse | null;
  getVerificationCodeStatus: FETCH_STATUS;
  getVerificationCodeError: ErrorResponse | null;
  verifyByCodeStatus: FETCH_STATUS;
  verifyByCodeError: ErrorResponse | null;
};

const initialState: UserState = {
  currentUser: null,
  currentUserStatus: FETCH_STATUS.IDLE,
  currentUserError: null,
  updateCurrentUserStatus: FETCH_STATUS.IDLE,
  updateCurrentUserError: null,
  logoutStatus: FETCH_STATUS.IDLE,
  logoutError: null,
  getVerificationCodeStatus: FETCH_STATUS.IDLE,
  getVerificationCodeError: null,
  verifyByCodeStatus: FETCH_STATUS.IDLE,
  verifyByCodeError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setLoginStatus: (state, action: PayloadAction<FETCH_STATUS>) => {
    //   state.loginStatus = action.payload;
    // },
    // setLogoutStatus: (state, action: PayloadAction<FETCH_STATUS>) => {
    //   state.logoutStatus = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.currentUserStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUserStatus = FETCH_STATUS.SUCCESS;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.currentUserStatus = FETCH_STATUS.ERROR;
        state.currentUserError = action.payload ?? {
          message: 'Failed to fetch user information',
        };
      })
      // .addCase(fetchUser.pending, (state) => {
      //   state.fetchUserStatus = FETCH_STATUS.LOADING;
      // })
      // .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
      //   state.fetchUserStatus = FETCH_STATUS.SUCCESS;
      //   state.user = action.payload;
      // })
      // .addCase(fetchUser.rejected, (state, action) => {
      //   state.fetchUserStatus = FETCH_STATUS.ERROR;
      //   state.fetchUserError = action.payload ?? {
      //     message: 'Failed to fetch user information',
      //   };
      // })
      .addCase(updateCurrentUser.pending, (state) => {
        state.updateCurrentUserStatus = FETCH_STATUS.LOADING;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.updateCurrentUserStatus = FETCH_STATUS.SUCCESS;
        state.currentUser = action.payload;
        state.updateCurrentUserStatus = FETCH_STATUS.IDLE;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.updateCurrentUserStatus = FETCH_STATUS.ERROR;
        state.updateCurrentUserError = action.payload ?? {
          message: 'Failed to fetch user information',
        };
      })

      .addCase(verifyByCode.pending, (state) => {
        state.verifyByCodeStatus = FETCH_STATUS.LOADING;
      })
      .addCase(verifyByCode.fulfilled, (state, action: PayloadAction<UserAuthorization>) => {
        state.verifyByCodeStatus = FETCH_STATUS.SUCCESS;
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
      })
      .addCase(verifyByCode.rejected, (state, action) => {
        state.verifyByCodeStatus = FETCH_STATUS.ERROR;
        state.verifyByCodeError = action.payload ?? {
          message: 'Failed to fetch user information',
        };
      })

      // .addCase(registerUser.pending, (state) => {
      //   state.registerUserStatus = FETCH_STATUS.LOADING;
      // })
      // .addCase(registerUser.fulfilled, (state) => {
      //   state.registerUserStatus = FETCH_STATUS.SUCCESS;
      // })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.registerUserStatus = FETCH_STATUS.ERROR;
      //   state.registerUserError = action.payload ?? { message: 'Failed to register user' };
      // })
      // .addCase(loginUser.pending, (state) => {
      //   state.loginStatus = FETCH_STATUS.LOADING;
      // })
      // .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserAuthorization>) => {
      //   state.loginStatus = FETCH_STATUS.SUCCESS;

      //   localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
      //   localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.loginStatus = FETCH_STATUS.ERROR;
      //   state.loginError = action.payload ?? { message: 'Failed to login user' };
      // })
      .addCase(logoutUser.pending, (state) => {
        state.logoutStatus = FETCH_STATUS.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutStatus = FETCH_STATUS.SUCCESS;
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutStatus = FETCH_STATUS.ERROR;
        state.logoutError = action.payload ?? { message: 'Failed to logout user' };
      })
      .addCase(getVerificationCode.pending, (state) => {
        state.getVerificationCodeStatus = FETCH_STATUS.LOADING;
      })
      .addCase(getVerificationCode.fulfilled, (state, action) => {
        state.getVerificationCodeStatus = FETCH_STATUS.SUCCESS;

        // localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
        // localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
      })
      .addCase(getVerificationCode.rejected, (state, action) => {
        state.getVerificationCodeStatus = FETCH_STATUS.ERROR;
        state.getVerificationCodeError = action.payload ?? { message: 'Failed to logout user' };
      });

    // .addCase(fetchUsers.pending, (state) => {
    //   state.fetchUsersStatus = FETCH_STATUS.LOADING;
    // })
    // .addCase(fetchUsers.fulfilled, (state, action) => {
    //   state.fetchUsersStatus = FETCH_STATUS.SUCCESS;
    //   state.users = {
    //     items: action.payload.items,
    //     pageNumber: action.payload.pageNumber,
    //     limit: action.payload.limit,
    //     totalItems: action.payload.totalItems,
    //     totalPages: action.payload.totalPages,
    //   };
    // })
    // .addCase(fetchUsers.rejected, (state, action) => {
    //   state.fetchUsersStatus = FETCH_STATUS.ERROR;
    //   state.fetchUsersError = action.payload ?? { message: 'Failed to fetch users' };
    // });
  },
});

// export const { setLoginStatus, setLogoutStatus } = userSlice.actions;
