import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, User, sanitizePhoneNumber } from '@shared/index';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { UserAuthorization, UserLogout } from './types';

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: ErrorResponse }>(
  '/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<User>('/users/currentUser');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  },
);

// export const fetchUser = createAsyncThunk<User, string, { rejectValue: ErrorResponse }>(
//   'user/fetchUser',
//   async (userId, thunkAPI) => {
//     try {
//       const response = await axiosPrivate.get<User>(`/users/${userId}`);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         // Return the error message as part of the rejection
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         // Handle unexpected errors
//         return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
//       }
//     }
//   },
// );

export const updateCurrentUser = createAsyncThunk<User, User, { rejectValue: ErrorResponse }>(
  '/updateCurrentUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosPrivate.put<User>('/users/currentUser', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  },
);

// export const registerUser = createAsyncThunk<User, UserRegisterDTO, { rejectValue: ErrorResponse }>(
//   '/registerUser',
//   async (userData, thunkAPI) => {
//     try {
//       const response = await axiosPrivate.post<User>(`/register`, userData);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
//       }
//     }
//   },
// );

// export const loginUser = createAsyncThunk<
//   UserAuthorization,
//   UserLoginDTO,
//   { rejectValue: ErrorResponse }
// >('/loginUser', async (userData, thunkAPI) => {
//   try {
//     const response = await axiosPrivate.post<UserAuthorization>(
//       `/auth/login`,
//       { ...sanitizedUser(userData), context: 'ADMIN'},
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//     } else {
//       return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
//     }
//   }
// });

export const logout = createAsyncThunk<
  { message: string },
  UserLogout,
  { rejectValue: ErrorResponse }
>('/logout', async (data, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<{ message: string }>(`/auth/logout`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

// export const fetchUsers = createAsyncThunk<
//   PaginationResponse<User>, // Тип возвращаемого значения
//   PaginationRequestQuery, // Тип аргумента
//   { rejectValue: ErrorResponse } // Тип возвращаемого ошибки
// >('user/fetchUsers', async (params, thunkAPI) => {
//   try {
//     const queryString = new URLSearchParams({
//       page: String(params.pageNumber || 1),
//       limit: String(params.limit || 10),
//       search: params.search || '',
//       sort: params.sort || '',
//       order: params.order || 'asc',
//       excludeRequesterId: 'true',
//     }).toString();

//     const response = await axiosPrivate.get<PaginationResponse<User>>(`/users?${queryString}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//     } else {
//       return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
//     }
//   }
// });

export const getVerificationCode = createAsyncThunk<
  User,
  { phoneNumber: string },
  { rejectValue: ErrorResponse }
>('/generateCode', async (body, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<User>(`/auth/generateCode`, {
      phoneNumber: sanitizePhoneNumber(body.phoneNumber),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const verifyByCode = createAsyncThunk<
  UserAuthorization,
  { code: string; phoneNumber: string },
  { rejectValue: ErrorResponse }
>('/verifyByCode', async (body, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<UserAuthorization>(`/auth/verify`, {
      phoneNumber: sanitizePhoneNumber(body.phoneNumber),
      code: body.code,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
