const { default: AsyncStorage } = require('@react-native-async-storage/async-storage');
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const loadUserFromStorage = async () => {
    try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (e) {
        return null;
    }
};

export const fetchAddress = createAsyncThunk('auth/fetchAddress', async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
    };

    return { position };
});

// Khởi tạo state
const initialState = {
    user: null,
    status: 'idle',
    position: {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUserAction: (state, action) => {
            state.user = action.payload;
            AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logoutAction: (state, action) => {
            state.user = null;
            AsyncStorage.removeItem('userInfo');
        },
        setUserAction: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchAddress.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.position = action.payload.position;
                state.status = 'idle';
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.status = 'error';
                state.error =
                    'There was a problem getting your address. Make sure to fill this field!';
            }),
});

export const { loginUserAction, logoutUserAction, setUserAction } = authSlice.actions;

export const authReducer = authSlice.reducer;

// Tải người dùng
export const loadUser = () => async (dispatch) => {
    const userInfo = await loadUserFromStorage();
    if (userInfo) {
        dispatch(setUserAction(userInfo));
    }
};
