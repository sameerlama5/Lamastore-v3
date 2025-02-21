import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as default storage
import { combineReducers } from 'redux';
import authReducer from './slice/user';

// Redux Persist Configuration
const persistConfig = {
    key: 'root', // Key to persist data
    storage,     // Storage mechanism (localStorage in this case)
    whitelist: ['auth'], // Reducers to persist
};

// Combine Reducers
const rootReducer = combineReducers({
    auth: authReducer,
});

// Create a Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Needed for Redux Persist to handle non-serializable actions
        }),
});

// Create Persistor
export const persistor = persistStore(store);
