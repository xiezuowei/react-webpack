import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './global';


const store = configureStore({
    reducer: {
        // 这里添加reducerSlice
        global: globalReducer
    }
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;