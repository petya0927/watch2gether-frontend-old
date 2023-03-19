import { configureStore } from '@reduxjs/toolkit';
import userNameSlice from './store/userNameSlice';
import avatarSlice from './store/avatarSlice';

export default configureStore({
  reducer: {
    userName: userNameSlice,
    avatar: avatarSlice,
  }
});