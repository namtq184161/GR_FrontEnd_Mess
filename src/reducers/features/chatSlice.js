import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  error: '',
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
};

export const getConversations = createAsyncThunk(
  'conversation/all',
  async (loginToken, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllConversations`,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createOrOpenConversation = createAsyncThunk(
  'conversation/createOrOpen',
  async (values, { rejectWithValue }) => {
    try {
      const { loginToken, receiverId } = values;

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/conversation`,
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getMessages = createAsyncThunk(
  'conversation/messages',
  async (values, { rejectWithValue }) => {
    try {
      const { loginToken, converId } = values;

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/messages/${converId}`,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = 'success';
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(createOrOpenConversation.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createOrOpenConversation.fulfilled, (state, action) => {
        state.status = 'success';
        state.activeConversation = action.payload;
      })
      .addCase(createOrOpenConversation.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(getMessages.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = 'success';
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
