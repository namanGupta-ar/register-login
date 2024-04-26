import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'https://api.realworld.io/api/';


export const userRegister = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(`${apiUrl}users`, {
        user: userData,
      });
      return response.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(`${apiUrl}users/login`, {
        user: userData,
      });
      return response.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('accessToken');
});

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem('accessToken') ?? '';
      const response = await axios.get(`${apiUrl}/user`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);
