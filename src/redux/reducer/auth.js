// Fungsi untuk parse JWT token
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
};

// Action Types
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// Initial State - modifikasi untuk memuat token dari localStorage jika ada
const initialState = {
  isLoggedIn: !!localStorage.getItem('token'), // Cek apakah token ada di localStorage
  user: null,
  isAdmin: false,
};

// Reducer Function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // Simpan token di localStorage
      localStorage.setItem('token', action.payload);

      // Decode token untuk menentukan isAdmin
      const decodedToken = parseJwt(action.payload);
      const isAdmin = decodedToken.role === 1;

      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isAdmin: isAdmin,
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');

      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isAdmin: false,
      };
    default:
      return state;
  }
};


// Action Creators
export const loginUser = (token) => ({
  type: LOGIN_USER,
  payload: token,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  
});
export const getToken = () => {
  return localStorage.getItem('token'); 
};

export default authReducer;
