import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
}); 

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
}); 

export const fetchUserById = createAsyncThunk('auth/fetchUserById', async (userId) => {
    const { data } = await axios.get(`/user/${userId}`);
    return data;
});

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ userId, formData }) => {
        const response = await axios.patch(`/user/update/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);

const initialState = {
    data: null,
    status: 'loading',
    // Можно добавить еще одно состояние для хранения данных пользователя по ID
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'null';
            state.status = 'null'
            state.userData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
                state.userData = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.userData = action.payload;
            })
            .addCase(fetchUserById.rejected, (state) => {
                state.status = 'error';
                state.userData = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
            // Обновляем данные пользователя после успешного запроса
            state.userData = action.payload;
        });
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;